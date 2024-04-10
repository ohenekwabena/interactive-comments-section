import { styled } from "styled-components";
import { Root, Portal, Overlay, Content } from "@radix-ui/react-dialog";
import UnstyledButton from "./UnstyledButton";
function DeleteComment({ id, setConfirmDelete, confirmDelete }) {
  function cancelDelete() {
    setConfirmDelete(false);
  }

  return (
    <Root open={confirmDelete} onOpenChange={cancelDelete}>
      <Portal>
        <ModalWrapper>
          <ModalContent>
            <h2>Delete comment</h2>
            <p>Are you sure you want to delete this comment?This will remove the comment and can't be undone.</p>
            <Actions>
              <CancelButton onClick={cancelDelete}>No, cancel</CancelButton>
              <DeleteButton>Yes, delete</DeleteButton>
            </Actions>
          </ModalContent>
        </ModalWrapper>
      </Portal>
    </Root>
  );
}

const ModalWrapper = styled(Overlay)`
  background: rgba(0 0 0 / 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
`;

const ModalContent = styled(Content)`
  max-width: 380px;
  background: white;
  padding: 30px;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & h2 {
    font-size: clamp(1.2rem, 0.9vw + 0.9rem, 1.5rem);
    color: var(--dark-blue);
    font-weight: 500;
  }

  & p {
    color: var(--grayish-blue);
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled(UnstyledButton)`
  color: var(--white);
  padding: clamp(0.5rem, 0.8vw + 0.3rem, 0.75rem) clamp(1rem, 2.6vw + 0.2rem, 1.875rem);
  border-radius: 0.5rem;
  font-size: clamp(0.75rem, 0.8vw + 0.5rem, 1rem);
  font-family: "Rubik";
  text-transform: uppercase;
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  background: var(--soft-red);
`;

const CancelButton = styled(Button)`
  background: var(--grayish-blue);
`;
export default DeleteComment;
