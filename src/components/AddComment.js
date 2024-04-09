import { Avatar } from "./Comment.js";
import { DATA as userData } from "../data.js";
import { styled } from "styled-components";
import UnstyledButton from "./UnstyledButton.js";
import { useContext, useState } from "react";
import { CommentContext } from "./CommentsProvider";
function AddComment({ username, isReplying, parentId, replying }) {
  const { addComment } = useContext(CommentContext);
  const [userComment, setUserComment] = useState("");

  console.log(parentId);
  function postComment() {
    if (replying) {
      addComment(userComment, parentId, username);
      isReplying(false);
      setUserComment("");
      return;
    }
    addComment(userComment, null, username);
    setUserComment("");
  }

  return (
    <Wrapper>
      <ReplyAvatar src={userData[0].currentUser.image.png} alt="" />
      <ReplyText placeholder="Add a comment..." onChange={(e) => setUserComment(e.target.value)}></ReplyText>
      <Button onClick={postComment}>Send</Button>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  align-items: end;
  grid-template: auto auto / auto 1fr auto;
  gap: 1rem;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  background-color: var(--white);
  border-radius: 0.6rem;

  @media (min-width: 29.688rem) {
    grid-template: auto 1fr / auto 1fr auto;
  }
`;

const ReplyText = styled.textarea`
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  height: 100px;
  resize: none;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--light-gray);
  font-family: "Rubik";
  font-size: 1rem;
  color: var(--grayish-blue);

  &::placeholder {
    font-size: 1rem;
  }

  @media (min-width: 29.688rem) {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
  }
`;

const ReplyAvatar = styled(Avatar)`
  grid-column: 1 / 2;
  grid-row: 2 / 3;

  @media (min-width: 29.688rem) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
`;

const Button = styled(UnstyledButton)`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  background: var(--moderate-blue);
  color: var(--white);
  padding: 0.5rem 1.4rem;
  border-radius: 0.5rem;
  font-family: "Rubik";
  text-transform: uppercase;
  cursor: pointer;

  @media (min-width: 29.688rem) {
    grid-column: 3 / 4;
    grid-row: 1 /2;
    transform: translateY(2px);
  }
`;

export default AddComment;