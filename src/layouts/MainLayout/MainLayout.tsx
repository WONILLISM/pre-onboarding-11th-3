import { Outlet } from 'react-router-dom';
import { GitHubProvider } from '../../common/context/GitHubContext';
import MainHeader from './MainHeader';

const MainLayout = () => {
  return (
    <GitHubProvider>
      <MainHeader />
      <Outlet />
    </GitHubProvider>
  );
};

export default MainLayout;
