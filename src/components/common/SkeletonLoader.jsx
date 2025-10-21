// src/components/common/SkeletonLoader.jsx
import styles from './SkeletonLoader.module.css';

const SkeletonLoader = ({ type = 'card' }) => {
  return (
    <div className={`${styles.skeleton} ${styles[type]}`}></div>
  );
};

export default SkeletonLoader;
