import React, { useEffect, useState } from 'react';
import { getIssue } from '../common/api/github/repo';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface IssueDetailProps {
  open: boolean;
  issueNum: number;
  path: string;
}

const IssueDetail = ({ open, issueNum, path }: IssueDetailProps) => {
  const [issue, setIssue] = useState<any>();

  const fetchIssue = async () => {
    const res = await getIssue(issueNum, path);

    setIssue(res);
  };

  useEffect(() => {
    fetchIssue();
  }, []);

  console.log(issue);

  return (
    <div>
      {open && (
        <div style={{ border: '1px solid blue' }}>
          <ReactMarkdown
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
            {issue.body}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default IssueDetail;
