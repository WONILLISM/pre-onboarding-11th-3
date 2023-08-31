import { useInfiniteQuery } from 'react-query';
import { styled } from 'styled-components';

import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { getIssueList } from '../../../lib/api/github';
import { Issue } from '../../../types/GitHub';

import IssueItem from './IssueItem';

interface IssueListProps {
  owner: string;
  repo: string;
}

const IssueList = ({ owner, repo }: IssueListProps) => {
  const { data, fetchNextPage, status } = useInfiniteQuery({
    queryKey: [owner, repo],
    queryFn: ({ pageParam = 1 }) =>
      getIssueList(owner, repo, { page: pageParam, per_page: 5 }),

    getNextPageParam: (lastPage, allPosts) => {
      return allPosts.length + 1;
    },

    refetchOnWindowFocus: false,
  });

  const { setTarget } = useInfiniteScroll({ fetchNextPage });

  return (
    <IssueListStyle>
      {data &&
        data.pages.map((page) =>
          page.map((item: Issue) => <IssueItem key={item.id} issue={item} />),
        )}
      <div ref={setTarget} />
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
