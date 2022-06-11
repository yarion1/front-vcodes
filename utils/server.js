const express = require('express')

const app = express()

const baseDir = `${__dirname}/build/`
app.use(express.static(`${baseDir}`));
app.get('*', (req,res) => res.sendFile('index.html' , { root : baseDir }))

const port = 3000;

app.listen(port, () => console.log(`Cliente rodando em http://localhost:${port}`));