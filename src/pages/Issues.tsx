import { styled } from 'styled-components';
import IssueList from '../components/IssueList';

const Issues = () => {
<<<<<<< HEAD
  return <IssueList />;
=======
  return (
    <MainStyle>
      <IssueList />
    </MainStyle>
  );
>>>>>>> 7-feat-add-github-context
};

const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Issues;
