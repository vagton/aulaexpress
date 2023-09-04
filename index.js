const express = require('express');
const app = express();

const port = 3000;

const db = require("./models")
//db.sequelize.sync();

// para rodar e matar o banco de dados
/*
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
*/

/*
app.get('/', (req, res) => {  // aero function
    res.send('Exemplo de CRUD!');
});

// Create Read Update Delete

// read
app.get('/users', (req, res) => { 
    res.send('Lista de usuários!');
});

app.get('/users/:id', (req, res) => { 
    res.send(`Usuário ${req.params.id} retornado`);
});

// create
app.post('/users', (req, res) => { 
    res.status(201).send('Usuário criado com sucesso!');
});

// update
app.put('/users/:id', (req, res) => { 
    res.send(`Usuário ${req.params.id} retornado`);
});

// delete
app.delete('/users/:id', (req, res) => { 
    res.send(`Usuário ${req.params.id} deletado`);
});

app.delete('/users', (req, res) => { 
    res.send(`Usuários deletados`);
});
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/user.routes')(app)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
