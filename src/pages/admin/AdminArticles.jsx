// src/pages/admin/AdminArticles.jsx
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useArticles } from '../../hooks/useArticles';
import QuillEditor from '../../components/admin/QuillEditor';
import styles from './AdminArticles.module.css';
import { useAuth } from '../../contexts/AuthContext';

const AdminArticles = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);
  const [image, setImage] = useState(null);
  const { addArticle, loading, error } = useArticles();
  const { currentUser } = useAuth();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setImage(acceptedFiles[0]);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const articleData = {
      title,
      excerpt,
      content,
      slug,
      tags: tags.split(',').map(tag => tag.trim()),
      featured,
      published,
      author: currentUser.displayName,
      views: 0
    };
    await addArticle(articleData, image);
    // Reset form
    setTitle('');
    setExcerpt('');
    setContent('');
    setTags('');
    setFeatured(false);
    setPublished(false);
    setImage(null);
  };

  return (
    <div className={styles.container}>
      <h1>Manage Articles</h1>
      <div className={styles.editorContainer}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Article Title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Article Excerpt"
            className={styles.textarea}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            className={styles.input}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <div className={styles.checkboxGroup}>
            <label>
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
              Featured
            </label>
            <label>
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              Published
            </label>
          </div>

          <div {...getRootProps({ className: styles.dropzone })}>
            <input {...getInputProps()} />
            {image ? <p>{image.name}</p> : <p>Drag 'n' drop an image here, or click to select one</p>}
          </div>

          <QuillEditor value={content} onChange={setContent} />

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Saving...' : 'Save Article'}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminArticles;
