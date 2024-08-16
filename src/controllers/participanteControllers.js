import conn from "../config/conn.js"; //Importando a conexeção com o banco de dados
import { v4 as uuidv4 } from "uuid"; //Gera Ids unicos para cada ususarios
import { request, response } from "express";


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

    const id = uuidv4()
    
    const checkSql = /*sql*/` SELECT * FROM participante WHERE ?? = ?`
    const checkSqlData = ["email", email]

    conn.query(checkSql, checkSqlData, (err, data) => {
        if(err){
            response.status(500).json({message: "Erro ao buscar participante"})
            return
        }
        if(data.length > 0){
            response.status(409).json({message: "Participante ja cadastrado"})
            return
        }

        const insertSql = /*sql*/ ` INSERT INTO participante (??, ??, ??) VALUES (?,?,?)`
        const insertData = ["participante_id", "nome", "email", id, nome, email];

        conn.query(insertSql, insertData, (err) => {
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao cadastrar participante"})
                return
            }
            response.status(201).json({message: "Participante cadastrado com sucesso"})
        })
    })
}

export const enviarFeedback = ( request, response ) => {
    const { participante_id,evento_id, nota, comentario } = request.body
    
    if(!participante_id){
        response.status(400).json({message: "O participante_id é obrigatorio"})
        return
    }
    if(!evento_id){
        response.status(400).json({message: "O evento_id é obrigatorio"})
        return
    }

    if(!nota){
        response.status(400).json({message: "A nota do evento é obrigatorio"})
        return
    }
    if(!comentario){
        response.status(400).json({message: "O comentario do evento é obrigatorio"})
        return
    }
   
    const insertSql = /*sql*/ ` INSERT INTO FeadbackEvento (??, ??, ??, ??) VALUES (?,?,?,?)`
    const insertData = ["participante_id", "evento_id", "nota", "comentario",participante_id ,evento_id, nota, comentario]

    conn.query(insertSql, insertData, (err) => {
        if(err){
            console.error(err)
            response.status(500).json({err: "Erro ao cadastrar feedback de um evento"})
            return
        }
        response.status(201).json({message: "Feedbck do evento feito com sucesso"})
      
    })
}

    