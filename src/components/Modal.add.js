import { useState } from "react";
import Modal from "react-modal";
import "./modal.css";
import Button from "@material-ui/core/Button";
import { Grid, TextField } from "@material-ui/core";
import Api from '../services/api'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function Caixa() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [numero, setNumero] = useState("");
  const [endereco, setEndereco] = useState("");

  async function handleSubmit() {
    const data = {
      nome_client: nome,
      email_client: email,
      cpf_client: cpf,
      telefone_client: numero,
      endereco_client: endereco,
    };
    console.log(data)

    if(nome!==''&&email!==''&&cpf!==''&&numero!==''&&endereco!==''){
        const response = await Api.post('/api/clientes',data);

        if(response.status===200){
          window.location.href='/home'
        }else{
          alert('Erro ao cadastrar o usuário!');
        }
      }else{
        alert('Por favor, preencha todos os dados!');
      }

  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="Container">
      <Button
        size="small"
        color="primary"
        style={{
          marginLeft:'10px',
          color: "black",
          backgroundColor: "#FFF",
          position:"block"
        }}
        onClick={openModal}
      >
        Novo
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <h2 style={{ textAlign: "center" }}>Cadastro de Usuarios</h2>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nome"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            autoFocus
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="CPF"
            name="CPF"
            label="CPF"
            fullWidth
            variant="standard"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Telefone"
            fullWidth
            variant="standard"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Endereco"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </Grid>

        <Button size="small" color="secondary" onClick={closeModal}>
          Sair
        </Button>
        <Button size="small" color="primary" onClick={handleSubmit}>
          Adcionar
        </Button>
      </Modal>
    </div>
  );
}

export default Caixa;
