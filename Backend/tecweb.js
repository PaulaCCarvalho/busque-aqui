var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('jsonwebtoken');

var mysql = require("mysql2");
const dotenv = require('dotenv');
dotenv.config();
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
});

app.use(cors());
app.use(express.json());

// GET → utilizado para realizar uma consulta no banco de dados, deve retornar dados armazenados no banco.
// POST → utilizado para enviar informações para o banco de dados.
// PUT → utilizado para realizar alterações no banco de dados.
// DELETE → utilizado para remover informações no banco de dados.

// CÓDIGO DE STATUS
// 200 → OK
// 201 → Recurso criado
// 204 → Recurso removido com sucesso
// 304 → Dado não modificado desde a última versão em cache
// 400 → Requisção inválida(Bad request)
// 401 → Requisição requer autorização
// 403 → Acesso nõ permitido(Forbidden)
// 404 → Recurso não encontrado(Not Found)
// 500 → Erro interno no servidor


app.post('/login', (req, resp) =>{
    var user = req.body;

    connection.query("SELECT * FROM cadastro WHERE email = ? AND senha = ?", [user.email, user.senha], (err, result) => {
        
        var usuario = result[0];

        if(result.length == 0){
            resp.status(401);
            resp.send({token: null, usuario: usuario, sucess: false});
        }else{
            console.log('!!!!valido!!!!')

            let token = jwt.sign({id: usuario.email}, 'busqueAqui', {expiresIn: 6000});
            resp.status(200);
            console.log(usuario.email, usuario);
            resp.send({token: token, usuario: usuario, success: true});
            
        }
    })
})

verifica_token = (req, resp, next) =>{
    var token = req.headers['x-access-token'];
    console.log(req.headers);
    if(!token){
        console.log("Token nulo")
        return resp.status(401).end();
    }

    jwt.verify(token, 'busqueAqui', (err, decoded) => {
        if(err){
            return resp.status(401).end();
        }

        req.usuario = decoded.id;
        next();
    });
}

app.post("/profissional",  (req, resp) =>{
    const {email,senha,nome,profissao,categoria,endereco,bairro,num_endereco,cidade,cep,estado,descricao,telefone} = req.body;
    console.log(email,senha,nome,profissao,categoria,endereco,bairro,num_endereco,cidade,cep,estado,descricao,telefone);

    var sql = "INSERT INTO perfil(profissao,categoria,endereco,bairro,num_endereco,cidade,cep,estado,descricao,telefone) VALUES (?,?,?,?,?,?,?,?,?,?)";
    connection.query(sql, [profissao,categoria,endereco,bairro,num_endereco,cidade,cep,estado,descricao,telefone], function (err, result) {

        if(!err){
            
            sql = "INSERT INTO cadastro(email, senha, nome, perfil) VALUES (?,?,?,?)";
            connection.query(sql,[email,senha,nome,result.insertId], function(err, result){
                if(err){
                    console.log(err);
                    resp.status(500).end();
                }else{
                    resp.status(200);
                    resp.json(result);
                }
            });
        }else{
            console.log(err);
            resp.status(500).end();
        }
    });
});

app.get("/profissional/:profissionalId", verifica_token, (req, resp) => {
    var profissionalId = req.params.profissionalId;
    console.log("GET - ProfissionalId: " + profissionalId);

    connection.query("SELECT iduser,nome,email, profissao, categoria, endereco, num_endereco, bairro, cidade, estado, cep, telefone, descricao, (SELECT avg(classificacao) from feedback where iduser = profissional ) AS 'classificacao' FROM cadastro JOIN perfil ON cadastro.perfil= idperfil WHERE iduser = ? AND perfil IS NOT NULL", [profissionalId], (err, result) => {

        if(err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result);
        }
    });
});

app.put("/profissional/:profissionalId", verifica_token, (req, resp) => {
    var profissionalId = req.params.profissionalId;
    const {email,senha,nome,profissao,categoria,endereco,bairro,num_endereco,cidade,cep,estado,descricao,telefone} = req.body;
    console.log("PUT - ProfissionalId: " + profissionalId);

    var sql = "UPDATE perfil SET profissao = ?,categoria = ?,endereco = ?, bairro = ?,num_endereco = ?, cidade = ?, cep = ?, estado = ?, descricao = ?, telefone = ? WHERE (SELECT perfil FROM cadastro WHERE iduser = ?) = idperfil";

    connection.query(sql, [profissao,categoria,endereco,bairro,num_endereco,cidade,cep,estado,descricao,telefone,profissionalId], (err, result) => {
        if(err){
            console.log(err);
            resp.status(500).end();
        }else{
            connection.query("UPDATE cadastro SET senha = ?, nome = ? WHERE iduser = ?", [senha,nome,profissionalId], (err, result) => {
                if(err){
                    console.log(err);
                    resp.status(500).end();
                }else{
                    resp.status(200);
                    resp.json(result);
                }
            });
        }
    });

});

app.delete("/profissional/:profissionalId", verifica_token, (req, resp) => {
    var profissionalId = req.params.profissionalId;
    console.log("DELETE - ProfissionalId: " + profissionalId);

    var sql = "DELETE FROM perfil WHERE (select perfil from cadastro where iduser = ?) = idperfil";

    connection.query(sql, [profissionalId], (err, result) => {
        if (!err){
            sql = "DELETE FROM feedback WHERE profissional = ?";
            connection.query(sql, [profissionalId], (err,result) => {
            if(err){
                console.log(err);
                resp.status(500).end();
            }else{
                sql = "DELETE FROM cadastro WHERE iduser = ? AND perfil IS NOT NULL";
                connection.query(sql, [profissionalId], (err,result) => {
                if(err){
                    console.log(err);
                    resp.status(500).end();
                }else{
                    resp.status(200);
                    resp.json(result);
                }
                });
            }
            }); 
        }else{
            console.log(err);
            resp.status(500).end();
        }
    });
});

app.get("/profissional", verifica_token, (req, resp) => {
    console.log("GET -  Profissional: " );

    connection.query("SELECT iduser,nome, profissao, cidade, estado, telefone, categoria,(SELECT avg(classificacao) from feedback where iduser = profissional ) AS 'classificacao' FROM cadastro JOIN perfil ON cadastro.perfil = idperfil WHERE perfil IS NOT NULL ", (err, result) => {

        if(err){
            console.log(err);
            resp.status(500).end();                     
        }else{
            resp.status(200);
            resp.json(result);
        }
    });
});

app.post("/profissional-busca", verifica_token, (req, resp) => {

    const {profissao,categoria,cidade,estado} = req.body;
    console.log("POST -  ProfissionalBusca: " + profissao,categoria,cidade,estado);

     connection.query("SELECT iduser,nome, profissao, cidade, estado, categoria, (SELECT avg(classificacao) from feedback where iduser = profissional ) AS 'classificacao' FROM cadastro JOIN perfil ON cadastro.perfil = idperfil WHERE perfil IS NOT NULL AND profissao=? AND categoria=? AND cidade=? AND estado=? ",[profissao,categoria,cidade,estado], (err, result) => {

        if(err){
            console.log(err);
            resp.status(500).end();                     
        }else{
            resp.status(200);
            resp.json(result);
        }
    });
});


app.post("/user", (req, resp) =>{
    const {email, senha, nome} = req.body;
    console.log(email, senha, nome);

    connection.query("INSERT INTO cadastro(email, senha, nome) VALUES (?,?,?)", [email,senha, nome], (err, result) => {
        if(err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result);
        }
    });
});

app.get("/user/:Iduser", verifica_token, (req, resp) => {
    var Iduser = req.params.Iduser;
    console.log("GET - Iduser: " + Iduser);

    connection.query("SELECT nome, email FROM cadastro WHERE iduser = ? AND perfil IS NULL", [Iduser], (err, result) => {

        if(err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result);
        }
    });

});

app.put("/user/:Iduser", verifica_token, (req, resp) => {
    var Iduser = req.params.Iduser;
    const {email, senha, nome} = req.body;
    console.log("PUT - Iduser: " + Iduser);

    connection.query("UPDATE cadastro SET senha = ?, nome = ? WHERE iduser = ? AND perfil IS NULL", [senha, nome, Iduser], (err, result) => {
        if(err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result);
        }
    });
});


app.delete("/user/:Iduser", verifica_token, (req, resp) => {
    var Iduser = req.params.Iduser;
    console.log("DELETE - Iduser: " + Iduser);

    connection.query("DELETE FROM cadastro WHERE iduser = ? AND perfil IS NULL", [Iduser], (err, result) => {
        if(err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result);
        }
    });
});

app.post("/classificacao", verifica_token, (req,resp) => {
    const {email, comentario, profissional, classificacao} = req.body;
    console.log(email, comentario, profissional, classificacao);

    connection.query("INSERT INTO feedback VALUES (DEFAULT,?,?,?,?)", [email,comentario, profissional,classificacao], (err, result) => {
        if(err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result);
        }
    });
});

app.get("/feedback/:IdProfissional", verifica_token, (req, resp) => { 
    console.log("GET - num: " + req.params.num);

    connection.query("SELECT email, comentario, profissional, classificacao FROM feedback WHERE profissional = ?", [req.params.IdProfissional], (err, result) => {

        if(err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result);
        }
    });

});
app.put("/classificacao/:Id", verifica_token, (req, resp) => {
    var Id = req.params.Id;
    var idfeed = req.body;
    console.log("PUT - Id: " + Id);

    connection.query("UPDATE feedback SET ? WHERE idfeed = ? ", [idfeed, Id], (err, result) => {
        if(err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result);
        }
    });

});
app.delete("/classificacao/:Id", verifica_token, (req, resp) => {
    var Id = req.params.Id;
    console.log("DELETE - Id: " + Id);

    connection.query("DELETE FROM feedback WHERE idfeed = ?", [Id], (err, result) => {
        if(err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result);
        }
    });
});

app.get("/classificacao/:IdProfissional", verifica_token, (req, resp) => { 
    console.log("GET - num: " + req.params.num);

    connection.query("SELECT avg(classificacao) FROM feedback WHERE profissional = ?", [req.params.IdProfissional], (err, result) => {

        if(err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result);
        }
    });

});
app.listen(3000, function(){
    console.log('Aplicação web rodando na porta 3000!');
});
