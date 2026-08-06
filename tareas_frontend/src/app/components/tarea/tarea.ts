import { Component, OnInit, signal } from '@angular/core';
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
import { RegTarea } from './reg-tarea/reg-tarea';
import { TareaService } from '../../services/tarea.service';

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
    MatSlideToggleModule, RegTarea
  ],
  templateUrl: './tarea.html',
  styleUrls: ['./tarea.css'],
})
export class Tarea implements OnInit {
  displayedColumns: string[] = ['estado', 'titulo', 'descripcion', 'categoria', 'prioridad', 'vencimiento', 'acciones'];
  signalreg = signal(false);
  mostrarModal = false;
  tareaEditando: TareaModel | null = null;
  submitted = false;

  cargando = signal(false);
  error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService
  ) { }

  ngOnInit(): void {
    this.cargarTareas();
  }

  // Getter para usar el signal del servicio directo en el template
  get tareas() {
    return this.tareaService.tareas;
  }

  cargarTareas(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.tareaService.getTareas().subscribe({
      next: () => {
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set('No se pudieron cargar las tareas');
        this.cargando.set(false);
        console.error('Error cargando tareas:', err);
      }
    });
  }

  abrirComp() {
    this.signalreg.set(!this.signalreg());
  }

  cerrarComp() {
    this.signalreg.set(false);
  }

  onGuardarTarea(tarea: TareaModel): void {
    this.cargando.set(true);
    this.error.set(null);

    this.tareaService.createTarea(tarea).subscribe({
      next: () => {
        this.cargando.set(false);
        this.cargarTareas(); // Recargar para actualizar la lista
        this.cerrarComp();
      },
      error: (err) => {
        this.cargando.set(false);
        console.error('Error creando tarea', err);
        this.error.set('No se pudo crear la tarea');
      }
    });
  }

  editarTarea(tarea: TareaModel): void {
    // Abrir el componente reg-tarea con los datos de la tarea
    this.tareaEditando = tarea;
    this.signalreg.set(true);
  }

  cambiarEstado(tarea: TareaModel): void {
    // Usar toggleCompletada del servicio
    this.tareaService.toggleCompletada(tarea.id!, !tarea.completada).subscribe({
      next: () => {
        // El servicio ya actualiza el signal internamente
        // Pero recargamos por si acaso
        this.cargarTareas();
      },
      error: (err) => {
        console.error('Error actualizando estado', err);
        this.error.set('No se pudo actualizar el estado');
      }
    });
  }

  eliminarTarea(tarea: TareaModel): void {
    if (confirm(`¿Estás seguro de eliminar la tarea "${tarea.titulo}"?`)) {
      this.cargando.set(true);
      this.error.set(null);

      this.tareaService.deleteTarea(tarea.id!).subscribe({
        next: () => {
          this.cargando.set(false);
          // El servicio ya actualiza el signal internamente con filter
          // Pero recargamos para asegurar consistencia
          this.cargarTareas();
        },
        error: (err) => {
          this.cargando.set(false);
          console.error('Error eliminando tarea', err);
          this.error.set('No se pudo eliminar la tarea');
        }
      });
    }
  }
}