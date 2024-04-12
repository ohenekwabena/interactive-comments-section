import { useContext } from "react";
import { styled } from "styled-components";
import { CommentContext } from "./CommentsProvider";
import Comment from "./Comment";
function Comments() {
  const { comments } = useContext(CommentContext);

  const sortedComments = comments.sort((a, b) => b.score - a.score);
  return (
    <Wrapper>
      {sortedComments &&
        sortedComments.length > 0 &&
        sortedComments.map(({ id, content, createdAt, score, user, replies }) => (
          <Comment
            key={id}
            actualId={id}
            parentId={null}
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
