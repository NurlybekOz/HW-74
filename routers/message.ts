import express from "express";
const messageRouter = express.Router();
import fileDb from "../fileDb";
import {MessageWithoutDate} from "../types";


messageRouter.get('/messages', async (req, res) => {
    const messages = await fileDb.getAllMessages()
    res.send(messages);
});
messageRouter.post('/create', async (req, res) => {
    const newMessage: MessageWithoutDate = {
        message: req.body.message,
    }
    const savedNewMessage = await fileDb.addNewMessage(newMessage);
    res.send(savedNewMessage);
});
messageRouter.get('*', (req, res) => {
    res.status(404).send('Not Found');
})

export default messageRouter;
