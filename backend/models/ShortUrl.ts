import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ShortUrlSchema = new Schema ({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl:{
        type: String,
    },
},{ collection: 'shortUrl' }
);

const ShortUrl = mongoose.model('shortUrl', ShortUrlSchema);

export default ShortUrl;
