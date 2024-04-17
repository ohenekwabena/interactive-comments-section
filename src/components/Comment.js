import { DATA } from "../data.js";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Plus from "../../images/icon-plus.svg";
import Minus from "../../images/icon-minus.svg";
import ReplyIcon from "../../images/icon-reply.svg";
import Edit from "../../images/icon-edit.svg";
import Delete from "../../images/icon-delete.svg";
import CommentReplies from "./CommentReplies";
import AddComment from "./AddComment";
import UnstyledButton from "./UnstyledButton";
import EditComment from "./EditComment.js";
import DeleteComment from "./DeleteComment.js";
import { CommentContext } from "./CommentsProvider.js";

function Comment({ actualId, parentId, content, createdAt, score, user, replies, replyingTo }) {
  const [replying, setReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const forwardedParentId = parentId === null ? actualId : parentId;
  const currentUsername = DATA[0].currentUser.username;
  const { changeScore, updateTimeSincePosted } = useContext(CommentContext);

  const timeSincePosted = updateTimeSincePosted(createdAt);

  const commentRef = useRef(null);

  useEffect(() => {
    if (!hasScrolled) window.scroll({ top: 0, behavior: "smooth" });

    commentRef.current.scrollIntoView({ behavior: "smooth" });
    setHasScrolled(true);
  }, [content, isEditing, replying]);

  return (
    <>
      <div>
        <Wrapper ref={commentRef}>
          <Head>
            <Avatar src={user?.image.png} alt="" />
            <Name>{user?.username}</Name>
            {currentUsername === user.username && <Verified>you</Verified>}
            <Duration>{timeSincePosted}</Duration>
          </Head>
          <Content>
            {isEditing ? (
              <EditComment id={actualId} replyingTo={replyingTo} setIsEditing={setIsEditing} />
            ) : (
              <p>
                {replyingTo && <ReplyingTo>@{replyingTo}</ReplyingTo>} {content}
              </p>
            )}
          </Content>
          <Rating>
            <UnstyledButton onClick={() => changeScore(actualId, "up")}>
              <img src={Plus} alt="" />
            </UnstyledButton>
            <p>{score}</p>
            <UnstyledButton onClick={() => changeScore(actualId, "down")}>
              <img src={Minus} alt="" />
            </UnstyledButton>
          </Rating>
          <CurrentUserActions>
            {user.username === currentUsername ? (
              <>
                <DeleteButton onClick={() => setConfirmDelete(true)}>
                  <img src={Delete} alt="" />
                  <p>Delete</p>
                </DeleteButton>
                <EditButton onClick={() => setIsEditing(!isEditing)}>
                  <img src={Edit} alt="" />
                  <p>Edit</p>
                </EditButton>
              </>
            ) : (
              <Reply onClick={() => setReplying(!replying)}>
                <img src={ReplyIcon} alt="" />
                <p>Reply</p>
              </Reply>
            )}
          </CurrentUserActions>
        </Wrapper>
        {replying && (
          <AddComment
            isReplying={setReplying}
            username={user.username}
            parentId={forwardedParentId}
            replying={replying}
          />
        )}
      </div>
      {replies && (
        <CommentReplies>
          {replies.map(({ id, content, createdAt, score, user, replies, replyingTo }) => (
            <Comment
              key={id}
              actualId={id}
              parentId={forwardedParentId}
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

      <DeleteComment id={actualId} setConfirmDelete={setConfirmDelete} confirmDelete={confirmDelete} />
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
  grid-column: 1 / 4;
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
  /* min-width: fit-content; */
  display: flex;
  flex-wrap: wrap;
`;

const Content = styled.div`
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
  gap: 1rem;
  padding: 0 0.75rem;
  border-radius: 8px;
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
    /* margin: 0.75rem 0; */
    height: 100px;
  }
`;

const Reply = styled(UnstyledButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--moderate-blue);
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: var(--light-grayish-blue);
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

const CurrentUserActions = styled.div`
  grid-row: 3;
  grid-column: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (min-width: 29.688rem) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
`;

const DeleteButton = styled(UnstyledButton)`
  color: var(--soft-red);
  font-weight: 700;
  background-color: white;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  & img {
    transform: translateY(-1px);
  }

  &:hover,
  &:focus,
  img:hover,
  img:focus {
    color: var(--pale-red);
  }

  @media (min-width: 29.688rem) and (max-width: 35.75rem) {
    & p {
      display: none;
    }
    margin-right: 0.5rem;
    margin-left: 4rem;
  }
`;

const EditButton = styled(UnstyledButton)`
  color: var(--moderate-blue);
  font-weight: 700;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--light-grayish-blue);
    filter: brightness(0.8);
  }

  @media (min-width: 29.688rem) and (max-width: 35.75rem) {
    & p {
      display: none;
    }
    margin-right: 0.5rem;
  }
`;

const Verified = styled.span`
  background-color: var(--moderate-blue);
  color: var(--white);
  padding: 0 0.45rem;
  font-size: 0.75rem;
  border-radius: 2px;
`;
export default Comment;
