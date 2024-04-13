export interface OriginalUrl {
    originalUrl: string;
}

export interface shortUrlWithoutId {
    shortUrl: string;
    originalUrl:string;
}

export interface shortUrlWithId extends shortUrlWithoutId {
    id: string;
}