import { useContext } from "react";
import { styled } from "styled-components";
import { CommentContext } from "./CommentsProvider";
import Comment from "./Comment";
function Comments() {
  const { comments } = useContext(CommentContext);

  return (
    <Wrapper>
      {comments &&
        comments.length > 0 &&
        comments.map(({ id, content, createdAt, score, user, replies }) => (
          <Comment
            key={id}
            id={id}
            content={content}
            createdAt={createdAt}
            score={score}
            user={user}
            replies={replies}
          />
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-bottom: 1rem;
`;
export default Comments;
