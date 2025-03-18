import {promises as fs} from 'fs';
import {Message, MessageWithoutDate} from "./types";
import path from "node:path";

const pathMessages = './messages';
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const files = await fs.readdir(pathMessages);
            data = [];


            for (const file of files) {
                const filePath = path.join(pathMessages, file);
                const content = await fs.readFile(filePath, 'utf-8');

                const datetime = file.replace('.txt', '');

                data.push({
                    datetime: datetime,
                    message: content
                });
            }

            data.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());

        } catch (e) {
            data = [];
            console.error(e);
        }
    },

    async getAllMessages() {
        await this.init();
        return data.slice(-5);
    },

    async addNewMessage(messageToAdd: MessageWithoutDate) {
        const datetime = new Date().toISOString();
        const newMessage = {
            datetime,
            ...messageToAdd
        };

        const fileName = `${datetime}.txt`;
        const filePath = path.join(pathMessages, fileName);

        await fs.writeFile(filePath, messageToAdd.message);

        data.push(newMessage);

        return newMessage;
    },
};

export default fileDb;