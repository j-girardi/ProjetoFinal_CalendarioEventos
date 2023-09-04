import { Character } from 'src/app/models/character/character';

export class MarvelResponseData {
    offset!: number;
    limit!: number;
    total!: number;
    count!: number;
    results!: Character[];
}
