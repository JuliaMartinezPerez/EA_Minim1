import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../models/usuario';
import { LlistaService } from '../../services/llista-service';
import { Llista, CreateLlistaDTO } from '../../models/llista';
import { Navbar } from '../navbar/navbar';
import { Universidad } from '../../models/universidad';
import { UniversidadService } from '../../services/universidad-service';

@Component({
  selector: 'app-llista-favorits',
  standalone: true,
  imports: [Navbar, CommonModule, RouterModule],
  templateUrl: './llista-favorits.html',
})
export class LlistaFavorits implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSeleccionat: Usuario | null = null;
  llistaActual: Llista | null = null;
  universidades: Universidad[] = [];

  constructor(
    private llistaService: LlistaService,
    private usuarioService: UsuarioService,
    private universidadService: UniversidadService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.usuarioService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      this.cdr.detectChanges();
    });
    this.universidadService.getUniversidades().subscribe((universidades) => {
      this.universidades = universidades;
      this.cdr.detectChanges();
    });
  }

  onUserChange(event: any) {
    const usuarioId = event.target.value;
    const usuario = this.usuarios.find((u) => u._id === usuarioId);
    if (usuario) {
      this.onSelectUser(usuario);
    }
  }

  onSelectUser(usuario: Usuario) {
    this.usuarioSeleccionat = usuario;
    //canvia la llista segons l'usuari seleccionat
    if (usuario.llista) {
      this.llistaService.getLlista(usuario._id).subscribe((llista) => {
        this.llistaActual = llista;
        this.cdr.detectChanges();
      });
    } else {
      this.llistaActual = null;
    }
  }

  addFavorit(uni: Universidad) {
    if (!this.usuarioSeleccionat) {
      alert('Si us plau, selecciona un usuari primer.');
      return;
    }
  
    //mira si l'usuari seleccionat té una llista, si no en té, en crea una nova amb la universitat seleccionada
    if (!this.llistaActual) {
      const payload: CreateLlistaDTO = {
        usuario: this.usuarioSeleccionat._id,
        idEntitat: [uni._id]
      };
      
      this.llistaService.createLlista(payload as any).subscribe({
        next: (createdLlista) => {
          this.llistaActual = createdLlista;
          if (this.usuarioSeleccionat) {
            this.usuarioSeleccionat.llista = createdLlista;
          }
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error creant llista:', err)
      });
      return;
    }
  
    //si la llista ja existeix, mira si la uni esta a la llista
    const exists = this.llistaActual.idEntitat?.some(item => item._id === uni._id);
    if (exists) {
      alert('Aquesta universitat ja és als favorits.');
      return;
    }
  
    const updatePayload = {
      usuario: this.llistaActual.usuario._id,
      idEntitat: this.llistaActual.idEntitat?.map(u => u._id)
    };
  
    this.llistaService.updateLlista(this.llistaActual._id, updatePayload as any).subscribe({
      next: () => {
        alert('Universitat afegida correctament');
        this.onSelectUser(this.usuarioSeleccionat!); //faig aixo per tornar a aconseguir la llista del servidor
        this.cdr.detectChanges();
      },
      error: (err) => alert('Error afegint favorit:'+ err)
    });
  }

  eliminarFavorit(uni: Universidad) {
    if (!this.llistaActual || !this.llistaActual.idEntitat) return;
  
    this.llistaActual.idEntitat = this.llistaActual.idEntitat.filter(
      (item) => item._id !== uni._id
    );
  
    this.llistaService.updateLlista(this.llistaActual._id, this.llistaActual).subscribe({
      next: () => {
        alert('Universitat eliminada');
        this.cdr.detectChanges();
      },
      error: (err) => alert('Error eliminant:' + err)
    });
  }
}