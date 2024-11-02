import { Router } from "express";
import { getUsers, getUser, createUser, deleteUser, updateUser } from "../controllers/user.controller.js";

const router = Router()

router.get('/users', getUsers)

router.get('/users/:userid', getUser)

router.post("/users", createUser)

router.delete('/users/:userid', deleteUser)

router.put('/users/:userid', updateUser)

export default router