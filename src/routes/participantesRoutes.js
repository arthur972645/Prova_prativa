import { Router } from "express";

//importar os controllers dos palestrantes
import { criarParticipante, enviarFeedback} from "../controllers/participanteControllers.js"



const router = Router()


router.post("/register",criarParticipante )
router.post("/registerFeedback", enviarFeedback)

export default router