import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';
import IssueList from '../components/IssueList';
import { parseQueryString } from '../lib/utils/parseQueryString';

const Issues = () => {
  const { search } = useLocation();

  const res = parseQueryString(search);

  if (!res) return <div>404</div>;

  return (
    <MainStyle>
      <IssueList owner={res.owner} repo={res.repo} />
    </MainStyle>
  );
};

const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Issues;
