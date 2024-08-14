import conn from "../config/conn.js"; //Importando a conexeção com o banco de dados
import { v4 as uuidv4 } from "uuid"; //Gera Ids unicos para cada ususarios
import jwt from "jsonwebtoken"; // Importando a biblioteca que permite a manipulação de tokens
import bcrypt from "bcrypt";
import { request, response } from "express";

//importação de helpers
import createUserToken from "../helpers/createUserToken.js"
import getToken from "../helpers/getToken.js"
import getUserByToken from "../helpers/get-user-by-token.js";

//CRIAR UM PALESTRANTE:
export const register =(request, response) => {
    const { nome, expertise, email } = request.body;

    const checkEmailSql = /*sql*/`SELECT * FROM palestrante WHERE ?? = ?`
    const checkEmailData = ["email", email]

    conn.query(checkEmailSql, checkEmailData, async(err, data) => {
        if(err){
            console.log(err)
            response.status(500).json({err: "Não foi possivel buscar usuario"})
            return
        }
        if(data.length > 0 ){
            response.status(409).json({err: "Email ja esta em uso"})
            return
        }

        const id = uuidv4();

        const insertSql = /*sql*/`INSERT INTO palestrante (??, ??, ??, ??) values (?, ?, ?, ?)`

        const insertDta = [
            "palestrante_id",
            "nome",
            "expertise",
            "email",
            id,
            nome,
            expertise,
            email
        ];

        conn.query(insertSql, insertDta, (err) => {
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao cadastrar palestrante"})
                return
            }

            const palestranteSql = /*sql*/` SELECT * FROM palestrante WHERE ?? = ?`
            const palestranteData = ["palestrante_id", id]

            conn.query(palestranteSql, palestranteData, async(err, data) => {
                if(err){
                    console.error(err)
                    response.status(500).json({err: "Erro ao selecionar palestrante"})
                    return
                }
                const palestrante = data[0]
                try{
                    await createUserToken(palestrante, request, response)
                } catch (error) {
                    console.error(err)
                }
            })
        })
    })
}

//mostrar todos os palestrantes
export const getAllPalestrantes = async (request, response) => {
    const sql = /*sql*/` SELECT * FROM palestrante`

    conn.query(sql,(err,data) => {
        if(err){
            console.error(err)
            response.status(500).json({msg: "Erro ao listar palestrantes"})
            return
        }
        response.status(200).json(data)
    })
}   