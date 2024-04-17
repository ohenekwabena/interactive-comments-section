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
  background-color: var(--very-light-gray);
`;

const MaxWidthWrapper = styled.div`
  position: relative;
  padding: 1rem;
  max-width: 700px;
  height: 100dvh;
  display: grid;
  place-content: center;
`;

export default App;
