import { Router } from "express";
import { deleteUser, deleteUsers, getUsers, updateRole } from "../controllers/users.controller.js";

const router = Router ()

router.get("/", getUsers)

router.delete("/", deleteUsers)

router.post("/:userId", updateRole)

router.delete ("/delete/:userId", deleteUser)

export default router