import * as Styled from "./index.style.ts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: Props) => {
  if (!isOpen) return null;

  return (
    <Styled.Overlay onClick={onClose}>
      <Styled.Dialog onClick={(e) => e.stopPropagation()}>
        <Styled.Header>
          <Styled.Title>{title}</Styled.Title>
          <Styled.CloseBtn onClick={onClose} aria-label="Fechar">✕</Styled.CloseBtn>
        </Styled.Header>
        <Styled.Body>{children}</Styled.Body>
      </Styled.Dialog>
    </Styled.Overlay>
  );
};

export default Modal;
