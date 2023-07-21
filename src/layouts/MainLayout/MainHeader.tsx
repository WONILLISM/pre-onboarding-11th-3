import { useContext, useEffect } from 'react';
import { styled } from 'styled-components';
import { GitHubStateContext } from '../../common/context/GitHubContext';
import { GitHubState } from '../../common/interface/GitHub';
import useGithubAPI from '../../common/hook/useGitHubAPI';

const MainHeader = () => {
  const { loading, error, repository } =
    useContext<GitHubState>(GitHubStateContext);
  const { fetchRepository } = useGithubAPI('facebook', 'react');

  useEffect(() => {
    fetchRepository();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error:{error}</div>;
  }

  if (!repository) {
    return <div>404</div>;
  }

  return <HeaderStyle>{repository.full_name}</HeaderStyle>;
};

const HeaderStyle = styled.header`
  padding: 20px;
  font-size: 32px;
  display: flex;
  justify-content: center;
`;

export default MainHeader;
