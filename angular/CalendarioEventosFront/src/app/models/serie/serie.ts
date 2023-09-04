import { SerieItem } from 'src/app/models/serie-item/serie-item';

export class Serie {
    available!: number;
    collectionURI!: string;
    items!: SerieItem[];
    returned!: number;
}
