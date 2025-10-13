import express from 'express'
import {AiGeneratorForRecomand} from '../controllers/aiGenerator.js'

const router = express.Router()
router.post('/question', AiGeneratorForRecomand)
export default router;
