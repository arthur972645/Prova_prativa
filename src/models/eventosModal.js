import { request, response } from "express";
import conn from  "../config/conn.js"

const tableEventos = /*sql*/`
    CREATE TABLE IF NOT EXISTS  eventosTabela(
        evento_id varchar(60) primary key,
        titulo varchar(255) not null,
        diaDoEvento DATE,
        palestrante_id varchar(500) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp
    )
`;
conn.query(tableEventos, (err) =>{
    if(err){
        console.error (err)
        return
    }
    console.log("Tabela [eventosTabela] criada com sucesso")
})

