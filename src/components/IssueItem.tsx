import { useState } from 'react';
<<<<<<< HEAD
=======
import { Issue } from '../common/interface/GitHub';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
>>>>>>> 7-feat-add-github-context

interface IssueItemProps {
  issue: Issue;
}

const IssueItem = ({ issue }: IssueItemProps) => {
  const navigate = useNavigate();
  const handleClickItem = () => {
    navigate(`${issue.number}`);
  };
  return (
<<<<<<< HEAD
    <div onClick={handleOpen} style={{ border: '1px solid black' }}>
      <div>
        #{issue.number} {issue.title}
      </div>
      <div>{issue.comments}</div>
      <div>작성자: {issue.user.login}</div>
      <div>작성일: {issue.created_at}</div>
    </div>
=======
    <IssueItemStyle onClick={handleClickItem}>
      <TitleArea>
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
>>>>>>> 7-feat-add-github-context
  );
};

const TitleArea = styled.div`
  display: flex;
  align-items: center;

  & .issue-number {
    color: #df9d8b;
    font-size: 20px;
  }
  & .title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 8px;
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
  cursor: pointer;
  width: 100%;
  border-radius: 1em;
  background-color: #08546c;
  padding: 1em;

  display: flex;
  flex-direction: column;
`;

export default IssueItem;
