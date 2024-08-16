import { request, response } from "express";
import conn from  "../config/conn.js"

const tableFeadback = /*sql*/`
    CREATE TABLE IF NOT EXISTS  FeadbackEvento(
        participante_id varchar(60) not null,
        evento_id varchar(255) not null,
        nota varchar(255) not null,
        comentario varchar(500) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )
`;
conn.query(tableFeadback, (err) =>{
    if(err){
        console.error (err)
        return
    }
    console.log("Tabela [FeadbackEvento] criada com sucesso")
})

