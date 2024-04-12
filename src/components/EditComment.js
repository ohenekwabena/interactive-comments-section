import { useContext, useState } from "react";
import { ReplyText } from "./AddComment";
import { styled } from "styled-components";
import { CommentContext } from "./CommentsProvider";
import UnstyledButton from "./UnstyledButton";

function EditComment({ id, replyingTo, setIsEditing }) {
  const { comments, editComment } = useContext(CommentContext);

  let selectedComment;

  for (const element of comments) {
    if (element.id === id) {
      selectedComment = element;
      break;
    }
    if (element.replies.length > 0) {
      for (const reply of element.replies) {
        if (reply.id === id) {
          selectedComment = reply;
          break;
        }
      }
    }
  }

  const INITIAL_COMMENT = selectedComment.content;
  const [editedComment, setEditedComment] = useState(INITIAL_COMMENT);

  function updatedComment() {
    editComment(id, editedComment);
    setEditedComment("");
    setIsEditing(false);
  }

  return (
    <Wrapper>
      <ReplyText value={editedComment} onChange={(e) => setEditedComment(e.target.value)}></ReplyText>
      <Button onClick={updatedComment}>Update</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template: 1fr auto/ 1fr auto;
  gap: 1rem;

  & ${ReplyText} {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    min-height: 150px;
  }
`;

const Button = styled(UnstyledButton)`
  background: var(--moderate-blue);
  color: var(--white);
  padding: 0.5rem 1.4rem;
  border-radius: 0.5rem;
  font-family: "Rubik";
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background: var(--light-grayish-blue);
  }

  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;

export default EditComment;
