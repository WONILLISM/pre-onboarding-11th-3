import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const IssueDetail = () => {
  const { state: issue } = useLocation();

  console.log(issue);

  if (!issue) {
    return <div>error</div>;
  }

  // useEffect(() => {}, []);

  return <div>{issue.body}</div>;
};

export default IssueDetail;
