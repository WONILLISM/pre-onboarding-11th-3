import { useContext } from 'react';

import { GitHubContext, GitHubState } from '../common/context/GitHubContext';

const IssueList = () => {
  const { issues, loading, error }: GitHubState = useContext(GitHubContext);

  if (loading) {
    return <div>Loading ... </div>;
  }

  if (error) {
    return <div>error: {error}</div>;
  }

  return <div></div>;
};

export default IssueList;
