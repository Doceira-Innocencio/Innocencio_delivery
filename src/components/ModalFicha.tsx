import { useState } from "react";
import FichaEncomenda from "./Elements/FichaEncomenda";
import Modal from "./Elements/Modal";
import { Printer, X } from "phosphor-react";

export default function ModalFicha() {
  const [modalState, setModalState] = useState(true);

  function onRequestClose() {
    setModalState(false);
  }

  return (
    <Modal isOpen={modalState} onRequestClose={onRequestClose}>
      <div className="fichaContainer">
        <FichaEncomenda />
      </div>
      <div className="fichaActions">
        <button>
          Imprimir <Printer />
        </button>
        <button>
          Fechar <X color="red" />
        </button>
      </div>
    </Modal>
  );
}
