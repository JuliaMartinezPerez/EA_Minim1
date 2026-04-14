import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Llista, CreateLlistaDTO } from '../models/llista';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LlistaService {
  private baseUrl = environment.apiUrl;
  private apiUrl = this.baseUrl +'/llistes';

  constructor(private http: HttpClient) { }

  getLlistes(): Observable<Llista[]> {
    return this.http.get<Llista[]>(this.apiUrl);
  }

  getLlista(id: string): Observable<Llista> {
      return this.http.get<Llista>(`${this.apiUrl}/${id}`);
    }
  
    createLlista(llista: CreateLlistaDTO): Observable<Llista> {
      return this.http.post<Llista>(this.apiUrl, llista);
    }
  
  updateLlista(id: string, llista: Llista): Observable<Llista> {
    return this.http.patch<Llista>(`${this.apiUrl}/${id}`, llista);
  }
  
  deleteLlista(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
