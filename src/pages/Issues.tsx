import { styled } from 'styled-components';
import IssueList from '../components/IssueList';
import { useLocation, useParams } from 'react-router-dom';

const Issues = () => {
  const location = useLocation();
  console.log(location);

  return <MainStyle>{/* <IssueList /> */}</MainStyle>;
};

const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Issues;
