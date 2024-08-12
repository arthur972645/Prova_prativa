import { Router } from "express";

//importar os controllers dos palestrantes
import { register, getAllParticipantes } from "../controllers/palestranteControllers.js"

//importar os helpers

const router = Router()

//localhost:33/envento/
router.post("/register",register )
router.get("/getallpalestrante", getAllParticipantes)

export default router