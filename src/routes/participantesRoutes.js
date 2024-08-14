import { Router } from "express";

//importar os controllers dos palestrantes
import { criarParticipante} from "../controllers/participanteControllers.js"

//importar os helpers

const router = Router()

//localhost:33/envento/
router.post("/participantes/register",criarParticipante )

export default router