
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Tarea as TareaModel } from '../../models/tarea.model';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule],
  templateUrl: './tarea.html',
  styleUrls: ['./tarea.css'],
})
export class Tarea {
  tareas: TareaModel[] = [
    {
      id: 1,
      titulo: 'Estudiar Angular',
      descripcion: 'Repasar componentes y servicios',
      completada: false,
      prioridad: 'alta',
      fecha_vencimiento: '2024-06-30',
      categoria: 'estudio'
    },
    {
      id: 2,
      titulo: 'Hacer ejercicio',
      descripcion: 'Rutina de 30 min',
      completada: true,
      prioridad: 'media',
      fecha_vencimiento: '2024-06-25',
      categoria: 'deporte'
    },
    {
      id: 3,
      titulo: 'Revisar correos',
      descripcion: 'Responder correos pendientes',
      completada: false,
      prioridad: 'baja',
      fecha_vencimiento: '2024-06-28',
      categoria: 'trabajo'
    }
  ];
  displayedColumns: string[] = ['estado', 'titulo', 'descripcion', 'categoria', 'prioridad', 'vencimiento', 'acciones'];

  cambiarEstado(tarea: TareaModel): void {
  tarea.completada = !tarea.completada;
}

eliminarTarea(tarea: TareaModel): void {
  this.tareas = this.tareas.filter(t => t.id !== tarea.id);
}
}
