import { useEffect, useState } from 'react';

import { getRepository } from '../common/api/github/repo';
import IssueList from '../components/IssueList';

const PATH = '/facebook/react';

const Issues = () => {
  const [repo, setRepo] = useState<any>();

  const fetchRepository = async () => {
    const res = await getRepository(PATH);

    setRepo(res);
  };

  useEffect(() => {
    fetchRepository();
  }, []);
  return (
    <div>
      <div>{repo && repo.full_name}</div>
      <IssueList path={PATH} />
    </div>
  );
};

export default Issues;
