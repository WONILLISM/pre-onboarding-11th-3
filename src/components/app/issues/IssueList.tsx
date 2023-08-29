import { styled } from 'styled-components';
import { useQuery } from 'react-query';

import IssueItem from './IssueItem';
import { getIssueList } from '../../../lib/api/github';

interface IssueListProps {
  owner: string;
  repo: string;
}

const IssueList = ({ owner, repo }: IssueListProps) => {
  const { data: issues } = useQuery({
    queryKey: [owner, repo],
    queryFn: () => getIssueList(owner, repo),
  });

  return (
    <IssueListStyle>
      {issues && issues.map((item) => <IssueItem key={item.id} issue={item} />)}
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
