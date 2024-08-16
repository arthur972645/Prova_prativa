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
    const {titulo, diaDoEvento, palestrante_id} = request.body
  
    
    if(!titulo){
        response.status(400).json({message: "O titulo é obrigatorio"})
        return
    }
    if(!diaDoEvento){
        response.status(400).json({message: "O dia do evento é obrigatorio"})
        return
    }

    if(!palestrante_id){
        response.status(400).json({message: "O id do palestrante é obrigatorio"})
        return
    }
    const evento_id = uuidv4()


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

export const editarEvento = async (request, response) => {
    const { id } = request.params

    try{
        const { titulo, diaDoEvento } = request.body
        if (!titulo) {
            response.status(400).json({ message: "O titulo é obrigatório" });
            return;
          }
          if (!diaDoEvento) {
            response.status(400).json({ message: "O diaDoEvento é obrigatório" });
            return;
          }

          const checkSql = /*sql*/ `SELECT * FROM eventosTabela WHERE ?? = ?`;
          const checkData = ["evento_id", id];

          conn.query(checkSql, checkData, (err, data) => {
            if(err){
                response.status(500).json({err: "Erro ao buscar evento"})
                return
            }
            if(data.length === 0 ){
                response.status(404).json({err: "Evento não encontrado"})
                return
            }

            const updateSql = /*sql*/ `UPDATE eventosTabela SET ? WHERE ?? = ?`;
            const updateData = [
                {titulo, diaDoEvento},
                "evento_id",
                id
            ]
            conn.query(updateSql, updateData,(err) => {
                if(err){
                    console.error(err)
                    response.status(500).json({err: "Erro ao atualizar evento"})
                    return
                }
                response.status(200).json({message: "Evento atualizado"})
            })
          })
    } catch(error){
        console.error(error)
        response.status(error.status || 500).json({message: error.message || "Erro interno no servidor"});
      }
}

export const deletarEvento = (request, response) => {
    const { id } = request.params
    
    const deleteSql = /*sql*/` delete from eventosTabela where ?? = ?`
    const insertData = ["evento_id", id]

    conn.query(deleteSql, insertData, (err, data) => {
        if(err){
            console.error(err);
            response.status(500).json({ message: "Erro ao deletar Evento" });
            return
        }
        if(data.length === 0) {
            response.status(404).json({ messagae: "Evento não encontrado" });
            return;
          }

          response.status(200).json({messagae: "Evento selecionado foi deletado"})
    })
}