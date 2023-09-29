import { Evento } from "../evento/evento";

export class ResponsePagination {
    count!: number;
    next!: string;
    previous!: string;
    results!: Evento[];
}
