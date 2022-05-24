export interface recordType {
  url_value: string,
  access_count: number,
  short_url: string,
  expiration_time: number;
}

export interface records {
  shorturl?: recordType[]
}