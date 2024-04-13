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
        if (!originalUrl) {
            return res.status(422).send({error: 'Field is required'})
        }
        const randomUrl = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let uniqueUrl = '';
            const urlLength = Math.floor(Math.random() * 2) + 6;

            for (let i = 0; i < urlLength; i++) {
                const randomUrl = Math.floor(Math.random() * characters.length);
                uniqueUrl += characters[randomUrl];
            }
            return uniqueUrl
        };
        let shortRandomUrl = randomUrl();

        while (await ShortUrl.findOne({shortRandomUrl})){
            shortRandomUrl = randomUrl();
        }

        const shortUrlData = {
            shortUrl: shortRandomUrl,
            originalUrl: originalUrl,
        };

        const shortUrl = new ShortUrl(shortUrlData);
        await shortUrl.save();

        return res.send(shortUrl);
    } catch (e) {
        next(e);
    }
});

export default shortUrlRouter;