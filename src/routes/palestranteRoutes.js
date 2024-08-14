import { Router } from "express";

//importar os controllers dos palestrantes
import { register, getAllPalestrantes } from "../controllers/palestranteControllers.js"

//importar os helpers

const router = Router()

//localhost:33/envento/
router.post("/register",register )
router.get("/getallpalestrante", getAllPalestrantes)

export default router