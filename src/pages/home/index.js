import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Modaladcionar from "../../components/Modal.add";
import Api from "../../services/api";
import { getToken, logout } from "../../services/auth";
import Caixa from "../../components/Modal";
import LinearProgress from "@material-ui/core/LinearProgress";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="Center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Vcodes
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const classes = useStyles();

  const [clientes, setClientes] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClientes() {
      const response = await Api.get("/api/clientes");

      setClientes(response.data);
      setLoading(false);
    }
    loadClientes();
    setShow(false);
    setSelectedClient({});
  }, []);

  useEffect(() => {
    console.log(selectedClient);
    console.log(show);
  }, [selectedClient, show]);

  async function openModal(client, status) {
    setSelectedClient(client);
    setShow(status);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Vcodes
          </Typography>
         <div style={{width:'100%', height:'100%'}}>
          <Button
            size="small"
            color="secondary"
            button
            onClick={confirmSair}
            style={{
              backgroundColor: "red",
              color: "white",
            }}
          >
            Logout
          </Button>
         </div>
          <Modaladcionar />
        </Toolbar>
      </AppBar>
      <main>
        {loading ? (
          <LinearProgress style={{ width: "50%", margin: "20px auto" }} />
        ) : (
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {clientes.map((card, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.nome_client}
                      </Typography>
                      <Typography>Cpf: {card.cpf_client}</Typography>
                      <Typography>Email: {card.email_client}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                          openModal(card, true);
                        }}
                      >
                        Ver mais
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Caixa data={selectedClient} isOpen={show} setIsOpen={setShow} />
          </Container>
        )}
      </main>

      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Vcodes
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Vcodes
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
async function confirmSair() {
  if (window.confirm("deseja realmente sair?")) {
    const response = await Api.get("/api/usuarios/destroytoken", {
      headers: { token: getToken() },
    });
    if (response.status === 200) {
      logout();
      window.location.href = "/";
    } else {
      alert("nao foi dessa vez");
    }
  }
}
