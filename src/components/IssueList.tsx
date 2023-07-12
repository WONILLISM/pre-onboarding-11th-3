import { useEffect, useState } from 'react';

import { getIssues } from '../common/api/github/repo';

import IssueItem from './IssueItem';

interface IssueListProps {
  path: string;
}

const IssueList = ({ path }: IssueListProps) => {
  const [issues, setIssues] = useState<any>();

  const fetchIssues = async () => {
    const queries = 'sort=comments';
    const res = await getIssues(path, queries);

    setIssues(res);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div>
      {issues &&
        issues.map((issue: any) => (
          <IssueItem key={issue.id} issue={issue} path={path} />
        ))}
    </div>
  );
};

export default IssueList;
