import { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { CommentContext } from "./CommentsProvider";
import Comment from "./Comment";

function Comments() {
  const { comments } = useContext(CommentContext);
  const commentRef = useRef(null);

  // useEffect(() => {
  //   if (!hasScrolled) window.scroll({ top: 0, behavior: "smooth" });
  //   commentRef.current.scrollIntoView({ behavior: "smooth" });
  //   setHasScrolled(true);
  //   console.log(commentRef.current);
  // }, [comments]);

  useEffect(() => {
    if (comments.length > 0) {
      const lastComment = document.querySelector("#comments-wrapper > :last-child");
      lastComment?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [comments]);

  const sortedComments = comments.sort((a, b) => b.score - a.score);
  return (
    <Wrapper ref={commentRef} id="comments-wrapper">
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
  height: 60dvh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 29.688rem) {
    height: 75dvh;
  }
`;

export default Comments;
