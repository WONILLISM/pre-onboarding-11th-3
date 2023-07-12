import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const Issues = () => {
  const [data, setdata] = useState<any>();
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

    setdata(response.data);
    // console.log(response.data[0].body);
  };

  console.log(data);

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {data &&
        data.map((item: any, itemIdx: number) => (
          <>
            <h1>{itemIdx}</h1>
            <ReactMarkdown
              key={itemIdx}
              rehypePlugins={[remarkGfm, rehypeRaw]}
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');

                  if (inline) {
                    return (
                      <span
                        style={{
                          background: '#f0f0f0',
                          padding: '1px 15px',
                          borderRadius: '5px',
                        }}
                        {...props}
                      >
                        {children}
                      </span>
                    );
                  }

                  if (match) {
                    return (
                      <SyntaxHighlighter
                        {...props}
                        style={nord}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    );
                  } else {
                    return (
                      <SyntaxHighlighter
                        {...props}
                        style={nord}
                        language={'textile'}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    );
                  }
                },
              }}
            >
              {item.body}
            </ReactMarkdown>
          </>
        ))}
    </div>
  );
};

export default Issues;
