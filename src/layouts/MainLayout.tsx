import { Outlet } from 'react-router-dom';
import { GitHubProvider } from '../common/context/GitHubContext';

const MainLayout = () => {
  return (
    <GitHubProvider>
      <Outlet />
    </GitHubProvider>
  );
};

export default MainLayout;
