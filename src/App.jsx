import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import AdminLayout from './components/AdminLayout';

// Public pages
import Home from './pages/Home';
import Article from './pages/Article';
import Category from './pages/Category';
import Search from './pages/Search';
import Contact from './pages/Contact';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminArticles from './pages/admin/AdminArticles';
import AdminContacts from './pages/admin/AdminContacts';
import AdminComments from './pages/admin/AdminComments';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminNewsletter from './pages/admin/AdminNewsletter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'article/:slug', element: <Article /> },
      { path: 'category/:category', element: <Category /> },
      { path: 'search', element: <Search /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'articles', element: <AdminArticles /> },
      { path: 'contacts', element: <AdminContacts /> },
      { path: 'comments', element: <AdminComments /> },
      { path: 'analytics', element: <AdminAnalytics /> },
      { path: 'newsletter', element: <AdminNewsletter /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
