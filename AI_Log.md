# AI_Log_Minim1

## 1
### Pregunta: Quin codi o dubte has plantejat a la IA?

Error en crear llista degut als diferents tipats (id string vs usuario)

### Prompt: El text literal que has enviat a l'assistent.

i cant create a llista: {my code}

### Incoherències: Què t'ha donat la IA que no encaixava (ex: rutes mal definides, llibreries que no fem servir)?

✔️ 1. Crea un DTO clar per crear la llista
interface CreateLlistaDTO {
  usuario: string;
  idEntitat: string[];
}

I usa això:

const payload: CreateLlistaDTO = {
  usuario: this.usuarioSeleccionat._id,
  idEntitat: [uni._id]
};

✔️ 2. CORREGEIX el service
createLlista(llista: CreateLlistaDTO): Observable<Llista> {
  return this.http.post<Llista>(this.apiUrl, llista);
}

✔️ 3. Update també amb IDs (IMPORTANT)

Abans de fer PATCH:

const updatePayload = {
  usuario: this.llistaActual.usuario._id,
  idEntitat: this.llistaActual.idEntitat?.map(u => u._id)
};

### Solució: Quins canvis manuals has fet per adaptar el codi a l'arquitectura del projecte?

No he tingut temps a fer canvis, no sé si el fix ha funcionat
