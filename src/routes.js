import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ListPage from './pages/ListPage';
import AdminPage from './pages/AdminPage';
import ShowPage from './pages/ShowPage';
import NotFoundPage from './pages/NotFoundPage';


const routes = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/blog',
    element: <ListPage />
  },
  {
    path: '/admin',
    element: <AdminPage />,
    auth: true
  },
  {
    path: '/blog/create',
    element: <CreatePage />,
    auth: true
  },
  {
    path: '/blog/:id/edit',
    element: <EditPage />,
    auth: true
  },
  {
    path: '/blog/:id',
    element: <ShowPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

export default routes;