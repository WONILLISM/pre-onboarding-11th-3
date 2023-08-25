import { useContext, useEffect } from 'react';
import { styled } from 'styled-components';
import { GitHubStateContext } from '../../common/context/GitHubContext';
import { GitHubState } from '../../common/interface/GitHub';
import useGithubAPI from '../../common/hook/useGitHubAPI';
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
