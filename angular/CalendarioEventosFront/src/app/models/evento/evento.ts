import { TipoEvento } from "./tipo-evento";

export class Evento {
    id!: number;
    nome!: string;
    data!: string;
    cep!: number;
    rua!: string;
    numero!: number;
    bairro!: string;
    cidade!: string;
    publico_alvo!: string;
    tipos_evento!: TipoEvento[];
    valor_entrada!: number;
    descricao!: string;
    banner!: number;
    data_adicao!: string;
    usuario!: string;
}
