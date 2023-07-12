import axios from 'axios';
import { useEffect } from 'react';

function App() {
  const getData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_GITHUB_API_URL}/repos/facebook/react/issues`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    console.log(response);
  };

  useEffect(() => {
    getData();
  });
  return <></>;
}

export default App;
