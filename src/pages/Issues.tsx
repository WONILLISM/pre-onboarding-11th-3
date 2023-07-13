import IssueList from '../components/IssueList';
import useGitHubQuery from '../common/hook/useGitHubQuery';

const PATH = '/facebook/react';

const Issues = () => {
  const { isLoading, error, data } = useGitHubQuery<any>(`/repos${PATH}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div>{data.full_name}</div>
      <IssueList path={PATH} />
    </div>
  );
};

export default Issues;
