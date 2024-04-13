import express from 'express';
import ShortUrl from '../models/ShortUrl';
import { ShortUrls } from '../types';

const shortUrlRouter = express.Router()

shortUrlRouter.get ('/', async (req,res, next) => {
    try {
        const shortUrl = await ShortUrl.find();

        res.send(shortUrl);
    }catch (e) {
        next(e);
    }
});

shortUrlRouter.get('/:shortUrl', async (req, res, next) => {
    try {
        const shortUrl: ShortUrls  | null = await ShortUrl.findOne({shortUrl: req.params.shortUrl});

        if (!shortUrl) return res.status(404).send({error: 'Not found'});

        return res.redirect(301, shortUrl.originalUrl);
    } catch (e) {
        next(e);
    }
});

shortUrlRouter.post('/', async (req, res, next) => {
    console.log(req.body)

    try {
        const { originalUrl } = req.body;
        console.log(originalUrl)
        if (!originalUrl) {
            return res.status(422).send({error: 'Field is required'})
        }
        const randomUrl = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let uniqueId = '';
            const idLength = Math.floor(Math.random() * 2) + 6;

            for (let i = 0; i < idLength; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                uniqueId += characters[randomIndex];
            }
            return uniqueId
        }


        const shortUrlData = {
            shortUrl: randomUrl(),
            originalUrl: originalUrl,
        };

        const shortUrl = new ShortUrl(shortUrlData);
        await shortUrl.save();
        console.log(shortUrl)

        return res.send(shortUrl);
    } catch (e) {
        next(e);
    }
});

export default shortUrlRouter;