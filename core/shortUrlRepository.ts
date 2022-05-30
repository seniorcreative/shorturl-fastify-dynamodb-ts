import { ShortUrl } from "../model/shorturl";

export interface ShortUrlRepository {
    getAll(): Promise<ShortUrl[]>,
    get(id: string): Promise<ShortUrl>,
    createOrUpdate(shortUrl: ShortUrl): Promise<void>
}