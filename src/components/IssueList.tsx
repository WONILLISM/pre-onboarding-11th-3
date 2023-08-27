import { styled } from 'styled-components';

const IssueList = () => {
  // const { setTarget } = useInfiniteScroll({
  //   fetchNextPage: fetchIssues,
  //   threshold: 1.0,
  // });

  return <IssueListStyle></IssueListStyle>;
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
