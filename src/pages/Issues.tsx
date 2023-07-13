import { styled } from 'styled-components';
import IssueList from '../components/IssueList';

const Issues = () => {
  return (
    <MainStyle>
      <IssueList />
    </MainStyle>
  );
};

const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Issues;
