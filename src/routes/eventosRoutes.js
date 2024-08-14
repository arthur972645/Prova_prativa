import { Router } from "express";

//importar os controllers dos palestrantes
import { criarEvento, getAllEventos } from "../controllers/eventoControllers.js"

//importar os helpers

const router = Router()

//localhost:33/envento/
router.post("/criarEvento",criarEvento )
router.get("/getAllEventos", getAllEventos)

export default router