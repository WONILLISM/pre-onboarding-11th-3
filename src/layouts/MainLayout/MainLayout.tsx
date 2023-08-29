import { Outlet } from 'react-router-dom';
import MainHeader from './MainHeader';
import { styled } from 'styled-components';

const MainLayout = () => {
  return (
    <main>
      <MainHeader />
      <MainLayoutStyle>
        <Outlet />
      </MainLayoutStyle>
    </main>
  );
};

const MainLayoutStyle = styled.main`
  position: relative;
  top: 120px;
`;

export default MainLayout;
