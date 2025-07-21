import Router from "express";
import {
getUser, createUser, updateUser, deleteUser, addNotification, getNotifications
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get('/:userId', getUser);
userRouter.post('/', createUser);
userRouter.put('/:userId', updateUser);
userRouter.delete('/:userId', deleteUser);
userRouter.post('/notifications', addNotification);
userRouter.get('/:userId/notifications', getNotifications);
 

export default userRouter;
