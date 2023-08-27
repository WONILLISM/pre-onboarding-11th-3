import { styled } from 'styled-components';

import SearchBar from '../../components/SearchBar';

const MainHeader = () => {
  return (
    <HeaderStyle>
      <SearchBar />
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export default MainHeader;
