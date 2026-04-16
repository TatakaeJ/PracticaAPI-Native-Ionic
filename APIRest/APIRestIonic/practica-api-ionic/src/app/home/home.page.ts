import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class HomePage {
  
  usuarios: any[] = []
  usuariosFiltrados: any[] = []
  busqueda: string = ""
  cargando: boolean = true
  error: string | null = null

  constructor() {}

  obtenerUsuario() {  
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => {
      if (!res.ok) {
        throw new Error("Error al consultar la API")
      }
      return res.json()
    })
    .then(data => {
      this.usuarios = data
      this.cargando = false
    })
    .catch(err => {
      this.error = err.mesaage
      this.cargando = false
    })
  }

  actualizarUsuario(id: number) {
    this.usuarios = this.usuarios.map(u => {
      if (u.id === id) {
        return {...u, name: u.name + "(Actualizado)"}
      }
      return u
    })
  }

  filtrarUsuarios() {
    this.usuariosFiltrados = this.usuarios.filter(u =>
      u.name.toLowerCase().includes(this.busqueda.toLowerCase())
    )
  }
}
