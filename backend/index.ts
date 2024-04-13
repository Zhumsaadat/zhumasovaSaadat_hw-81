import express from "express";
import cors from "cors";
import mongoDb from './mongoDb';
import { shortUrlWithoutId } from './types';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());


app.get('/:shortUrl', async (req, res, next) => {
    try{
        const db = mongoDb.getDb();
        const result = await db.collection('shortUrl').findOne({shortUrl: req.params.shortUrl});

        if(!result) {
            return res.status(404).send({error: 'Not found'});
        }

        return res.send(result);
    } catch (e) {
        next(e);
    }
});

app.post('/originalUrl', async (req, res, next) => {
    console.log(req.body)

    try {
        if (!req.body.originalUrl) {
            return res.status(422).send({error: 'Field is required'})
        }
        const rondomUrl = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let uniqueId = '';
            const idLength = Math.floor(Math.random() * 2) + 6;

            for (let i = 0; i < idLength; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                uniqueId += characters[randomIndex];
            }
            return uniqueId
        }


        const shortUrlData : shortUrlWithoutId = {
            shortUrl: rondomUrl(),
            originalUrl: req.body.originalUrl,
        };

        const db = mongoDb.getDb();
        await db.collection('originalUrl').insertOne(shortUrlData);

        return res.send(shortUrlData);
    } catch (e) {
        next(e);
    }
})



const run = async () => {
    await mongoDb.connect();

    app.listen(port, () => {
        console.log(`Port: ${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

void run();
