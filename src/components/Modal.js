import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./modal.css";
import Button from "@material-ui/core/Button";
import propTypes from "prop-types";
import { Typography } from "@material-ui/core";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function Caixa({ data, isOpen, setIsOpen }) {
  const [client, setClient] = useState(data);

  useEffect(() => {
    setClient(data);
  }, [data]);

  function closeModal() {
    setClient(data);
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        closeModal();
      }}
      contentLabel="Example Modal"
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <h2 style={{ textAlign: "center" }}>Dados do Cliente</h2>
      <hr />
      <div>
        <Typography>Nome: {client.nome_client}</Typography>
        <hr />
        <Typography>Cpf: {client.cpf_client}</Typography>
        <hr />
        <Typography>E-mail: {client.email_client}</Typography>
        <hr />
        <Typography>Telefone: {client.telefone_client}</Typography>
        <hr />
        <Typography>Endereco: {client.endereco_client}</Typography>
        <hr />
      </div>
      <Button
        size="small"
        color="secondary"
        onClick={() => {
          closeModal();
        }}
      >
        Sair
      </Button>
    </Modal>
  );
}

export default Caixa;

Caixa.defaultProps = {
  data: {},
  isOpen: false,
};
Caixa.propTypes = {
  isOpen: propTypes.bool.isRequired,
  setIsOpen: propTypes.func.isRequired,
  data: propTypes.object.isRequired,
};
