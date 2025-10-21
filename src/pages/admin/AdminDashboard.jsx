// src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { useArticles } from '../../hooks/useArticles';
import { useComments } from '../../hooks/useComments';
import { useContacts } from '../../hooks/useContacts';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './AdminDashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const { getArticles } = useArticles();
  const { getAllComments } = useComments();
  const { getContacts } = useContacts();

  const [stats, setStats] = useState({ articles: 0, comments: 0, contacts: 0 });
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchStats = async () => {
      const articles = await getArticles();
      const comments = await getAllComments();
      const contacts = await getContacts();
      setStats({ articles: articles.length, comments: comments.length, contacts: contacts.length });
      processChartData(articles);
    };
    fetchStats();
  }, []);

  const processChartData = (articles) => {
    const monthlyData = {};
    articles.forEach(article => {
      const month = new Date(article.createdAt.seconds * 1000).toLocaleString('default', { month: 'short' });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    const labels = Object.keys(monthlyData);
    const data = Object.values(monthlyData);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Articles Created',
          data,
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
        },
      ],
    });
  };

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h2>{stats.articles}</h2>
          <p>Articles</p>
        </div>
        <div className={styles.statCard}>
          <h2>{stats.comments}</h2>
          <p>Comments</p>
        </div>
        <div className={styles.statCard}>
          <h2>{stats.contacts}</h2>
          <p>Contacts</p>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
