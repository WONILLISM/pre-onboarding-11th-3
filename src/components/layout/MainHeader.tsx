import { styled } from 'styled-components';

import SearchBar from '../SearchBar';

const MainHeader = () => {
  return (
    <HeaderStyle>
      <SearchBar />
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  position: fixed;
  z-index: 99;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
`;

export default MainHeader;
