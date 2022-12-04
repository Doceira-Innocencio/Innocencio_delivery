import { ReactNode } from "react";
import ReactModal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void | any;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onRequestClose,
  children,
}: ModalProps) {
  return (
    <ReactModal
      bodyOpenClassName={"bodyOpenClass"}
      className={{
        base: "modal",
        afterOpen: "modalAfterOpen",
        beforeClose: "modalBeforeClose",
      }}
      overlayClassName={{
        base: "overlay",
        afterOpen: "overlayAfterOpen",
        beforeClose: "overlayBeforeClose",
      }}
      closeTimeoutMS={300}
      isOpen={isOpen}
    >
      {children}
    </ReactModal>
  );
}
