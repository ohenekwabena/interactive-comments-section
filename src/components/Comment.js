import { useState } from "react";
import styled from "styled-components";
import Plus from "../../images/icon-plus.svg";
import Minus from "../../images/icon-minus.svg";
import ReplyIcon from "../../images/icon-reply.svg";
import CommentReplies from "./CommentReplies";
import AddComment from "./AddComment";
import UnstyledButton from "./UnstyledButton";

function Comment({ id, content, createdAt, score, user, replies, replyingTo }) {
  const [replying, setReplying] = useState(false);
  const forwardedParentId = id;
  return (
    <>
      <div>
        <Wrapper>
          <Head>
            <Avatar src={user?.image.png} alt="" />
            <Name>{user?.username}</Name>
            <Duration>{createdAt}</Duration>
          </Head>
          <Content>
            {replyingTo && <ReplyingTo>{`@${replyingTo}`}</ReplyingTo>} {content}
          </Content>
          <Rating>
            <UnstyledButton>
              <img src={Plus} alt="" />
            </UnstyledButton>
            <p>{score}</p>
            <UnstyledButton>
              <img src={Minus} alt="" />
            </UnstyledButton>
          </Rating>
          <Reply onClick={() => setReplying(!replying)}>
            <img src={ReplyIcon} alt="" />
            <p>Reply</p>
          </Reply>
        </Wrapper>
        {replying && <AddComment isReplying={setReplying} username={user.username} parentId={id} replying={replying} />}
      </div>
      {replies && (
        <CommentReplies>
          {replies.map(({ id, content, createdAt, score, user, replies, replyingTo }) => (
            <Comment
              key={id}
              id={forwardedParentId}
              content={content}
              createdAt={createdAt}
              score={score}
              user={user}
              replies={replies}
              replyingTo={replyingTo}
            />
          ))}
        </CommentReplies>
      )}
    </>
  );
}

const Wrapper = styled.article`
  display: grid;
  margin-top: 1rem;
  grid-template: 40px 1fr 40px / auto 1fr auto;
  row-gap: 0.75rem;
  padding: 1rem;
  font-family: "Rubik";
  background: var(--white);
  border-radius: 0.6rem;

  @media (min-width: 29.688rem) {
    grid-template: auto 1fr / 40px 1fr auto;
    column-gap: 1rem;
  }
`;

const Head = styled.div`
  grid-row: 1;
  grid-column: 1 / 3;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 29.688rem) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
`;

const Name = styled.p`
  color: var(--grayish-blue);
  font-weight: 700;
`;
const Duration = styled.p`
  color: var(--grayish-blue);
  min-width: fit-content;
`;

const Content = styled.p`
  grid-row: 2 / 3;
  grid-column: 1 / -1;
  color: var(--grayish-blue);

  @media (min-width: 29.688rem) {
    grid-column: 2 / -1;
    grid-row: 2 / 3;
  }
`;

const Rating = styled.div`
  grid-row: 3;
  grid-column: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.875rem;
  padding: 0 0.75rem;
  border-radius: 8px;
  min-height: 100px;
  color: var(--light-grayish-blue);
  background-color: var(--very-light-gray);
  font-weight: 600;

  & p {
    color: var(--moderate-blue);
  }

  & ${UnstyledButton} {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  @media (min-width: 29.688rem) {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0.75rem 0;
  }
`;

const Reply = styled.span`
  grid-row: 3;
  grid-column: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  /* padding: 1rem 0; */
  color: var(--moderate-blue);
  font-weight: 600;
  cursor: pointer;

  @media (min-width: 29.688rem) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
`;

const ReplyingTo = styled.span`
  color: var(--moderate-blue);
  font-weight: 700;
`;

export function Avatar({ src, alt }) {
  return <AvatarImg src={src} alt={alt} />;
}

const AvatarImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
`;

export default Comment;
