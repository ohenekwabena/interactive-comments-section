import { styled } from "styled-components";
import Comments from "./components/Comments";
import CommentProvider from "./components/CommentsProvider";
import AddComment from "./components/AddComment";

function App() {
  return (
    <CommentProvider>
      <Wrapper>
        <MaxWidthWrapper>
          <Comments />
          <AddComment />
        </MaxWidthWrapper>
      </Wrapper>
    </CommentProvider>
  );
}

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  min-height: 100dvh;
  padding: 1rem;
  background-color: var(--very-light-gray);
`;

const MaxWidthWrapper = styled.div`
  max-width: 700px;
`;

export default App;
