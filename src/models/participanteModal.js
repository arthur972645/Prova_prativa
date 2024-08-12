import conn from  "../config/conn.js"

const tablePalestrante = /*sql*/`
    CREATE TABLE IF NOT EXISTS  participante(
        
    )
`;

conn.query(tablePalestrante, (err) =>{
    if(err){
        console.error (err)
        return
    }
    console.log("Tabela [participante] criada com sucesso")
})