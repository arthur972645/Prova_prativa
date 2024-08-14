import conn from "../config/conn.js"; //Importando a conexeção com o banco de dados
import { v4 as uuidv4 } from "uuid"; //Gera Ids unicos para cada ususarios
import jwt from "jsonwebtoken"; // Importando a biblioteca que permite a manipulação de tokens
import bcrypt from "bcrypt";
import { request, response } from "express";

//importação de helpers
import createUserToken from "../helpers/createUserToken.js"
import getToken from "../helpers/getToken.js"
import getUserByToken from "../helpers/get-user-by-token.js";

export const criarParticipante = async (request, response) => {
    const { nome, email } = request.body

    if(!nome){
        response.status(400).json({message: "O nome é obrigatorio"})
        return
    }
    if(!email){
        response.status(400).json({message: "O email é obrigatorio"})
        return
    }

    const participante_id = uuidv4()
    
    const checkSql = /*sql*/` SELECT * FROM participante WHERE ?? = ? AND ?? = ?`
    const checkSqlData = ["nome",nome,"email", email]

    conn.query(checkSql, checkSqlData, (err, data) => {
        if(err){
            response.status(500).json({message: "Erro ao buscar participante"})
            return
        }
        if(data.length > 0){
            response.status(409).json({message: "Participante ja cdastrado"})
            return
        }

        const insertSql = /*sql*/ ` INSERT INTO eventosTabela (??, ??, ??) VALUES (?,?,?)`
        const insertData = ["participante_id", "nome", "email",participante_id, nome, email]

        conn.query(insertSql, insertData, (err, data) => {
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao cadastrar participante"})
                return
            }
            response.status(201).json({message: "Evento cadastrado com sucesso"})
        })
    })
}