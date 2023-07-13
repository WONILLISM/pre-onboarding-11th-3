import { useContext } from 'react';
import IssueItem from './IssueItem';
import { styled } from 'styled-components';
import { GitHubStateContext } from '../common/context/GitHubContext';
import useInfiniteScroll from '../common/hook/useInfiniteScroll';
import { GitHubState } from '../common/interface/GitHub';
import useGithubAPI from '../common/hook/useGitHubAPI';
import Loading from './Loading';

const IssueList = () => {
  const { loading, error, issues } =
    useContext<GitHubState>(GitHubStateContext);

  const { fetchIssues } = useGithubAPI('facebook', 'react');
  const { setTarget } = useInfiniteScroll({
    fetchNextPage: fetchIssues,
  });

  if (error) {
    return <div>error: {error}</div>;
  }

  return (
    <IssueListStyle>
      {issues.map((issue, idx) => (
        <>
          <IssueItem key={idx} issue={issue} />
          {(idx + 1) % 5 === 0 && <div>광고</div>}
        </>
      ))}
      {loading ? <Loading /> : <div ref={setTarget} />}
    </IssueListStyle>
  );
};

const IssueListStyle = styled.article`
  max-width: 640px;
  width: 100%;
  height: 800px;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
`;

export default IssueList;
