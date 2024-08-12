//Função responsavel para criar ostoken dos usuarios

import jwt from "jsonwebtoken";

//função assincrona para a criação do token
const createUserToken = async (palestrante, request, response) => {
  //criar token do usuario, onde no token vai ter o nome e o id do usuario
  //o jwt.sing cria o token
  const token = jwt.sign(
    {
      nome: palestrante.nome,
      id: palestrante.palestrante_id,
    },
    //Chave que vai autentificar o token
    "PROVAPRATICALINDA" //senha
  );
  //Retornar o token
  response.status(200).json({
    message: "Você está logado!",
    token: token,
    palestranteID: palestrante.palestrante_id,
  });
};

export default createUserToken;
