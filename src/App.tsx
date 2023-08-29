import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createGlobalStyle } from 'styled-components';

import MainLayout from './components/layout/MainLayout';

import Issues from './pages/Issues';
import IssueDetail from './pages/IssueDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/issues',
        element: <Issues />,
        children: [{ path: ':id', element: <IssueDetail /> }],
      },
    ],
  },
]);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GlobalStyle />
    <RouterProvider router={router} />
  </QueryClientProvider>
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

    scrollbar-width: thin;
    scrollbar-color: black white; 

    width: 100%;
    height: 100%;
    color: #EFF4F4;
    background-color:#022534;
  }
`;

export default App;
