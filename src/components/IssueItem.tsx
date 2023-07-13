import { useState } from 'react';

interface IssueItemProps {
  issue: any;
  path: string;
}

const IssueItem = ({ issue, path }: IssueItemProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div onClick={handleOpen} style={{ border: '1px solid black' }}>
      <div>
        #{issue.number} {issue.title}
      </div>
      <div>{issue.comments}</div>
      <div>작성자: {issue.user.login}</div>
      <div>작성일: {issue.created_at}</div>
    </div>
  );
};

export default IssueItem;
