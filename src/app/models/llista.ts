import { Universidad } from './universidad';
import { Usuario } from './usuario';

export interface Llista {
    _id: string;
    usuario: Usuario;
    idEntitat?: Universidad[]; 
    etiquetes?: string[];
}

export interface CreateLlistaDTO {
    usuario: string;
    idEntitat: string[];
  }