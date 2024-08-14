import conn from  "../config/conn.js"

const tablePalestrante = /*sql*/`
    CREATE TABLE IF NOT EXISTS  eventosTabela(
        evento_id varchar(60) primary key,
        titulo varchar(255) not null,
        diaDoEvento datetime,
        palestrante_id varchar(60) not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp,
        FOREIGN KEY (palestrante_id) REFERENCES palestrante(palestrante_id)
    )
`;
conn.query(tablePalestrante, (err) =>{
    if(err){
        console.error (err)
        return
    }
    console.log("Tabela [eventosTabela] criada com sucesso")
})