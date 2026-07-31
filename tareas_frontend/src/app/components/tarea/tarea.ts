
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Tarea as TareaModel } from '../../models/tarea.model';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
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

  tareaForm: FormGroup;
  mostrarModal = false;
  tareaEditando: TareaModel | null = null;

  constructor(private fb: FormBuilder) {
    this.tareaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      descripcion: [''],
      categoria: ['personal'],
      prioridad: ['media'],
      fecha_vencimiento: [null],
      completada: [false]
    });
  }

  abrirModal(tarea?: TareaModel) {
    this.tareaEditando = tarea || null;

    if (tarea) {
      // Editar: cargar datos
      this.tareaForm.patchValue({
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
        categoria: tarea.categoria,
        prioridad: tarea.prioridad,
        fecha_vencimiento: tarea.fecha_vencimiento ? new Date(tarea.fecha_vencimiento) : null,
        completada: tarea.completada
      });
    } else {
      // Nueva: resetear
      this.tareaForm.reset({
        titulo: '',
        descripcion: '',
        categoria: 'personal',
        prioridad: 'media',
        fecha_vencimiento: null,
        completada: false
      });
    }

    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.tareaEditando = null;
    this.tareaForm.reset();
  }

  guardarTarea() {
    if (this.tareaForm.invalid) return;

    const tareaData: TareaModel = {
      ...this.tareaForm.value,
      fecha_vencimiento: this.tareaForm.value.fecha_vencimiento
        ? this.formatDate(this.tareaForm.value.fecha_vencimiento)
        : null
    };

    if (this.tareaEditando) {
      // Actualizar tarea existente
      tareaData.id = this.tareaEditando.id;
      console.log('Actualizar:', tareaData);
      // this.tareasService.actualizar(tareaData);
    } else {
      // Crear nueva tarea
      console.log('Crear:', tareaData);
      // this.tareasService.crear(tareaData);
    }

    this.cerrarModal();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  cambiarEstado(tarea: TareaModel): void {
    tarea.completada = !tarea.completada;
  }

  eliminarTarea(tarea: TareaModel): void {
    this.tareas = this.tareas.filter(t => t.id !== tarea.id);
  }
}
