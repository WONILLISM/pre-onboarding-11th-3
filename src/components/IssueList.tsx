import IssueItem from './IssueItem';
import useGitHubQuery from '../common/hook/useGitHubQuery';

interface IssueListProps {
  path: string;
}

const IssueList = ({ path }: IssueListProps) => {
  const { isLoading, error, data } = useGitHubQuery<any>(
    `/repos${path}/issues?sort=comments`,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {data.map((issue: any) => (
        <IssueItem key={issue.id} issue={issue} path={path} />
      ))}
    </div>
  );
};

export default IssueList;
