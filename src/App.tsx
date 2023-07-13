import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Issues from './pages/Issues';
import IssueDetail from './pages/IssueDetail';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Issues /> },
      { path: '/:id', element: <IssueDetail /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
