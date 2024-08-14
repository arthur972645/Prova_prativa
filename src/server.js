import express from  'express'
import path from 'node:path'

//Importando a conexeção
import conn from "./config/conn.js"

//Importar os modulos(taelas)
import "./models/palestranteModal.js"
import "./models/eventosModal.js"
import "./models/participanteModal.js"


//importar as rotas
import palestranteRoutes from "./routes/palestranteRoutes.js"
import eventoRoutes from "./routes/eventosRoutes.js"
import participantesRoutes from "./routes/participantesRoutes.js"

const PORT = process.env.PORT
const app = express()

app.use(express.json());
//Utilizar rotas
app.use("/eventosPalestrante", palestranteRoutes)
app.use("/eventos", eventoRoutes)
app.use("/eventosParticipante", participantesRoutes)

app.use((request, response) => {
    response.status(404).json({message: "Recurso não encontrado"})
})
app.listen(PORT, () => {
    console.log("Servidor rodando na porta: "+PORT)
})