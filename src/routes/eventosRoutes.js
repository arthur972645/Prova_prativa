import { Router } from "express";

//importar os controllers dos palestrantes
import { criarEvento, getAllEventos, editarEvento, deletarEvento } from "../controllers/eventoControllers.js"

//importar os helpers

const router = Router()

//localhost:33/envento/
router.post("/criarEvento",criarEvento )
router.get("/getAllEventos", getAllEventos)
router.put("/editarEvento/:id", editarEvento)
router.delete("/deletarEvento/:id", deletarEvento)

export default router