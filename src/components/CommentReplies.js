import { styled } from "styled-components";
import { LayoutGroup } from "framer-motion";

export default function CommentReplies({ children }) {
  return (
    <LayoutGroup>
      <Wrapper>{children}</Wrapper>
    </LayoutGroup>
  );
}

const Wrapper = styled.section`
  padding-left: clamp(1rem, 1.7vw + 0.5rem, 2rem);
  border-left: 2px solid var(--light-gray);
  margin-left: clamp(0rem, 3.3vw - 1rem, 2rem);
`;
