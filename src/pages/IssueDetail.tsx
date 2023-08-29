import { useLocation } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { styled } from 'styled-components';
import { Issue } from '../types/GitHub';

const Markdown = ({ issue }: { issue: Issue }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[remarkGfm, rehypeRaw]}
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          if (inline) {
            return (
              <span
                style={{
                  background: '#333333',
                  color: '#ffffff',
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
  );
};

const IssueDetail = () => {
  const { state: issue } = useLocation();

  if (!issue) {
    return <div>error</div>;
  }

  return (
    <IssuDetailStyle>
      <IssueDetailWrapper>
        <IssueItemStyle>
          <TitleArea>
            <img
              style={{ borderRadius: '50%' }}
              src={issue.user.avatar_url}
              width="78px"
              height="78px"
              alt="profile"
            />

            <span className="issue-number">#{issue.number}</span>
            <span className="title">{issue.title}</span>
          </TitleArea>

          <ContentsArea>
            <CommentsArea>Comments: {issue.comments}</CommentsArea>
            <AuthorArea>
              <span>Author: {issue.user.login}</span>
              <span>Created At: {issue.created_at}</span>
            </AuthorArea>
          </ContentsArea>
        </IssueItemStyle>
        <Markdown issue={issue} />
      </IssueDetailWrapper>
    </IssuDetailStyle>
  );
};

const IssuDetailStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IssueDetailWrapper = styled.div`
  width: 100%;
  max-width: 640px;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  & .issue-number {
    color: #df9d8b;
    font-size: 20px;
  }
  & .title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    font-size: 16px;
    letter-spacing: 0.04em;
  }
`;

const AuthorArea = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  font-size: 14px;
`;

const ContentsArea = styled.div`
  width: 100%;
  display: flex;
`;

const CommentsArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px 0px;
  font-size: 16px;
  font-weight: 700;
`;

const IssueItemStyle = styled.article`
  width: 100%;
  border-radius: 1em;
  background-color: #08546c;
  padding: 1em;

  display: flex;
  flex-direction: column;
`;

export default IssueDetail;
