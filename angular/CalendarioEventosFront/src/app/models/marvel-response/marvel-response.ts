import { MarvelResponseData } from 'src/app/models/marvel-response-data/marvel-response-data';

export class MarvelResponse {
    code!: number;
    status!: string;
    copyright!: string;
    attributionText!: string;
    attributionHTML!: string;
    etag!: string;
    data!: MarvelResponseData;
}
