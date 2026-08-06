import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
//import { Tarea } from '../tarea';
import type { Tarea as TareaModel } from '../../../models/tarea.model';

@Component({
  selector: 'app-reg-tarea',
  imports: [
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
  templateUrl: './reg-tarea.html',
  styleUrl: './reg-tarea.css',
})
export class RegTarea implements OnInit {
  @Input() tareaEditar?: TareaModel | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<TareaModel>();
  tareaForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.tareaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3),
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      descripcion: ['', Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)],
      categoria: ['personal'],
      prioridad: ['media'],
      fecha_vencimiento: [null],
      completada: [false]
    });
  }
  ngOnInit(): void {
    if (this.tareaEditar) {
      // Cargar datos de la tarea en el formulario
      this.tareaForm.patchValue({
        titulo: this.tareaEditar.titulo,
        descripcion: this.tareaEditar.descripcion,
        categoria: this.tareaEditar.categoria,
        prioridad: this.tareaEditar.prioridad,
        fecha_vencimiento: this.tareaEditar.fecha_vencimiento ? new Date(this.tareaEditar.fecha_vencimiento) : null,
        completada: this.tareaEditar.completada
      });
    }
  }

  cancelar() {
    this.cerrar.emit();
  }

  guardarTarea() {
    this.submitted = true;

    if (this.tareaForm.invalid) return;

    const tareaData: TareaModel = {
      ...this.tareaForm.value,
      fecha_vencimiento: this.tareaForm.value.fecha_vencimiento
        ? this.formatDate(this.tareaForm.value.fecha_vencimiento)
        : null
    };
    console.log('Crear:', tareaData);
    this.guardar.emit(tareaData);
    this.cancelar();
  }

  getTituloErrorMessage(): string | null {
    const control = this.tareaForm.get('titulo');

    if (!control || !control.errors) {
      return null;
    }

    if ((control.touched || control.dirty || this.submitted) && control.errors['required']) {
      return 'El título es obligatorio.';
    }

    if ((control.touched || control.dirty || this.submitted) && control.errors['minlength']) {
      return 'El título debe tener al menos 3 caracteres.';
    }

    if ((control.touched || control.dirty || this.submitted) && control.errors['pattern']) {
      return 'El título solo puede contener letras y espacios.';
    }

    return null;
  }
  getDescripcionErrorMessage(): string | null {
    const control = this.tareaForm.get('descripcion');

    if (!control || !control.errors) {
      return null;
    }

    if ((control.touched || control.dirty || this.submitted) && control.errors['pattern']) {
      return 'La descripción solo puede contener letras y espacios.';
    }

    return null;
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


}
