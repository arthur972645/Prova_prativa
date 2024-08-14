import conn from "../config/conn.js"; //Importando a conexeção com o banco de dados
import { v4 as uuidv4 } from "uuid"; //Gera Ids unicos para cada ususarios
import jwt from "jsonwebtoken"; // Importando a biblioteca que permite a manipulação de tokens
import bcrypt from "bcrypt";
import { request, response } from "express";

//importação de helpers
import createUserToken from "../helpers/createUserToken.js"
import getToken from "../helpers/getToken.js"
import getUserByToken from "../helpers/get-user-by-token.js";

export const criarEvento = async (request, response) => {
    const {titulo, diaDoEvento} = request.body

    const token = getToken(request);
    const user = await getUserByToken(token);
  
    
    if(!titulo){
        response.status(400).json({message: "O titulo é obrigatorio"})
        return
    }
    if(!diaDoEvento){
        response.status(400).json({message: "O dia do evento é obrigatorio"})
        return
    }

    const evento_id = uuidv4()
    const palestrante_id = user.palestrante_id


    const checkSql = /*sql*/` SELECT * FROM eventosTabela WHERE ?? = ? AND ?? = ?`
    const checkSqlData = ["titulo",titulo,"diaDoEvento", diaDoEvento]

    conn.query(checkSql, checkSqlData, (err, data) => {
        if(err){
            response.status(500).json({message: "Erro ao busca evento"})
            return console.log(err)
        }
        if(data.length > 0) {
            response.status(409).json({message: "Evento ja cadastrado na base de dados"})
            return console.log(err)
        }


        const insertSql = /*sql*/ ` INSERT INTO eventosTabela (??, ??, ??, ??) VALUES (?,?,?,?)`
        const insertData = ["evento_id", "titulo", "diaDoEvento", "palestrante_id",evento_id,titulo, diaDoEvento, palestrante_id]
        conn.query(insertSql, insertData, (err, data) => {
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao cadastrar evento"})
                return
            } 
            response.status(201).json({message: "Evento cadastrado com sucerro"})
            
            
        })

    })
}
export const getAllEventos = async (request, response) => {
    const sql = /*sql*/` SELECT * FROM eventosTabela`
    const sqlPalestrante = /*sql*/ `SELECT * FROM palestrante`

    conn.query(sql, sqlPalestrante, (err,data) => {
        if(err){
            console.error(err)
            response.status(500).json({msg: "Erro ao listar evento"})
            return
        }
        response.status(200).json(data)
    })
}   