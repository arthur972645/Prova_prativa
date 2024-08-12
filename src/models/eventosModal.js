import conn from  "../config/conn.js"

const tablePalestrante = /*sql*/`
    CREATE TABLE IF NOT EXISTS  eventosTabela(
        
    )
`;

conn.query(tablePalestrante, (err) =>{
    if(err){
        console.error (err)
        return
    }
    console.log("Tabela [eventosTabela] criada com sucesso")
})