import { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { CommentContext } from "./CommentsProvider";
import Comment from "./Comment";
function Comments() {
  const { comments } = useContext(CommentContext);
  const [hasScrolled, setHasScrolled] = useState(false);
  const commentRef = useRef(null);

  useEffect(() => {
    if (!hasScrolled) window.scroll({ top: 0, behavior: "smooth" });
    commentRef.current.scrollIntoView({ behavior: "smooth" });
    setHasScrolled(true);
  }, [comments]);

  const sortedComments = comments.sort((a, b) => b.score - a.score);
  return (
    <Wrapper ref={commentRef}>
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
  height: 80dvh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Comments;
