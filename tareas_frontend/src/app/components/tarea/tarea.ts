
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Tarea as TareaModel } from '../../models/tarea.model';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [CommonModule],
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
      categoria: 'estudio'
    },
    {
      id: 2,
      titulo: 'Hacer ejercicio',
      descripcion: 'Rutina de 30 min',
      completada: true,
      prioridad: 'media',
      categoria: 'deporte'
    },
    {
      id: 3,
      titulo: 'Revisar correos',
      descripcion: 'Responder correos pendientes',
      completada: false,
      prioridad: 'baja',
      categoria: 'trabajo'
    }
  ];

  cambiarEstado(): void {
    //this.completar.emit(this.tarea.id);
  }

  eliminarTarea(): void {
    //this.eliminar.emit(this.tarea.id);
  }
}
