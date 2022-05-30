export interface ShortUrl {
  short_url_key: string,
  url_value: string,
  access_count: number,
  short_url: string,
  expiration_time: number;
}

export interface ShortUrls {
  shorturl?: ShortUrl[] | undefined
}