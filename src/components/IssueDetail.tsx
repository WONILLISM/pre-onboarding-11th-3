import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import useGitHubQuery from '../common/hook/useGitHubQuery';

interface IssueDetailProps {
  open: boolean;
  issueNum: number;
  path: string;
}

const IssueDetail = ({ open, issueNum, path }: IssueDetailProps) => {
  const { isLoading, error, data } = useGitHubQuery<any>(
    `/repos${path}/issues/${issueNum}`,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            {data.body}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default IssueDetail;
