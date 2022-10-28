import express from "express"
import { deleteItem, getItemById, getItems, saveItem, updateItem } from "../controllers/ItemController.js";


const router = express.Router();

router.get('/items', getItems);
router.get('/items/:id', getItemById);
router.post('/items', saveItem);
router.patch('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

export default router;



