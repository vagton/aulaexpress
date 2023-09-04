const db = require('../models');
const User = db.users;

const Op = db.Sequelize.Op;

// create
// findAll
// findOne
// update
// delete
// deleteAll

exports.create = (req, res) => {
    // criar um usuário
    // console.log(req.body);
    if(!req.body.name){
        res.status(400).send({
            message: 'Name is required!'
        });
        return;
    }

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    User.create(user)
    .then(data => {
        res
        .status(201)
        .send(data)
    })
    .catch( err => {
        res
        .status(500)
        .send({
            message: err.message || 'Algum erro ocorreu enquanto criavamos o usuário'
        })
    })
}

exports.findAll = (req, res) => {
    // busca todos os usuários
    const name  = req.query.name;
    let condition = name ? { name: { [Op.like]: `%${name}%` } } : null
    User.findAll( { where: condition })
    .then(data =>{
            res
                .status(200)
                .send({
                    count: data.length,
                    data: data
                })
    })
    .catch( err => {
        res
            .status(500)
            .send({
                message: err.message || "Algum erro ocorreu enquanto recuperamos os usuários"
            })
    })
}

exports.findOne = (req, res) => {
    // busca usuário por id
    const id = req.params.id;
    User.findByPk(id)
    .then(data => {
        res
            .status(200)
            .send(data);
    })
    .catch (err => {
        res
        .status(500)
        .send({
            message: "Error ao buscar usuário com id: " + id
        });
    })
    
}

exports.update = (req, res) => {
    // atualiza uma usuário 
    const id = req.params.id;
    let body = req.body;
    
    User.update(body, {
            where: { id: id }
        }).then(occ =>{
          if (occ == 1) {
            res
                .send({
                    message: "O usuário foi atualizado com sucesso."
                })
            return;
        } 

        res.send({
            message: `Não foi possível atualizar o usuário. O id ${id} não foi encontrado.`
        })
    })
    
}

exports.delete = (req, res) => {
    // deleta um usuário
    const id = req.params.id;

    User.destroy({
      where: { id: id }
    })
      .then(occ => {
        if (occ == 1) {
          //res.status(204).send(); // Excluído com sucesso
          res
          .send({
              message: "O usuário foi deletado com sucesso."
          });
          return;
        } 
        //else {
          //res.status(404).json({ error: `Usuário com o ID ${id} não encontrado.` });
        //}
        res.send({
            message: `Não foi possivel deletar o usuário. O id ${id} não foi encontrado.`
        })
    })
    .catch( err => {
        res 
        .status(500)
        .send({
            message: `Não foi possivel deletar o usuário com id: ${id}`
        })
    })
    //  .catch(error => {
    //    console.error('Erro ao excluir usuário:', error);
    //    res.status(500).json({ error: 'Erro interno do servidor.' });
    //});
}

exports.deleteAll = (req, res) => {
    // deleta todos os usuários
    User.destroy({ 
        where: {},
        truncate: false
    })
    .then(count => {
        res.send({
            message: `${count} usuários foram removidos.`
        })
        .catch( err => {
            res 
            .status(500)
            .send({
                message: "Não foi possível deletar os usuários."
            })
        })
        //if (occ > 0) {
        //res.status(204).send(); // Excluído com sucesso
        //} 
        //else {
        //res.status(404).json({ error: 'Não foram encontrados usuários para excluir.' });
        //}
    })
    //.catch(error => {
    //      console.error('Erro ao excluir todos os usuários:', error);
    //      res.status(500).json({ error: 'Erro interno do servidor.' });
    //});
  
}