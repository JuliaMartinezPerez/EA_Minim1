import { Universidad } from "./universidad";
import { Llista } from "./llista";

export interface Usuario {
    _id: string;
    nombre: string;
    email: string;
    password: string;
    rol: 'admin' | 'user';
    universidad?: Universidad;
    activo: boolean;
    llista?: Llista;
}
