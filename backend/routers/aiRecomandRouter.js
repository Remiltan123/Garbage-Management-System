import {express} from 'express'
import {AiGeneratorForRecomand} from '../controllers/aiGenerator'

const router = express.Router()
router.post('/question', AiGeneratorForRecomand)
export default router;
