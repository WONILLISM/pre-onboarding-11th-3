import { RouterProvider, createBrowserRouter } from 'react-router-dom';

<<<<<<< HEAD
import MainLayout from './layouts/MainLayout';
import Issues from './pages/Issues';
import IssueDetail from './pages/IssueDetail';

const router = createBrowserRouter([
  {
=======
import MainLayout from './layouts/MainLayout/MainLayout';
import Issues from './pages/Issues';
import IssueDetail from './pages/IssueDetail';
import { createGlobalStyle } from 'styled-components';

const router = createBrowserRouter([
  {
    path: '/',
>>>>>>> 7-feat-add-github-context
    element: <MainLayout />,
    children: [
      { path: '/', element: <Issues /> },
      { path: '/:id', element: <IssueDetail /> },
    ],
  },
]);

<<<<<<< HEAD
const App = () => <RouterProvider router={router} />;
=======
const App = () => (
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>
);

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  a{
    text-decoration: none;
    color: inherit;
  }

  ul, li, ol {
    margin:0;
    padding:0;
    list-style:none;
    list-style-type:none;
  }

  html, body {
    margin: 0;
    padding: 0;

    width: 100%;
    height: 100%;
    color: #EFF4F4;
    background-color:#022534;
  }
`;
>>>>>>> 7-feat-add-github-context

export default App;
