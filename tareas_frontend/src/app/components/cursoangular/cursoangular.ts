import { Component } from '@angular/core';
import { Curso } from '../../models/curso.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursoangular',
  imports: [CommonModule],
  templateUrl: './cursoangular.html',
  styleUrl: './cursoangular.css',
})
export class Cursoangular {
  public cursos: Curso[] = [
  {
    id: '1',
    titulo: 'Fundamentos de Angular',
    descripcion: 'Aprende los conceptos básicos de Angular: componentes, módulos, data binding y directivas.',
    duracionHoras: 12,
    nivel: 'básico'
  },
  {
    id: '2',
    titulo: 'RxJS y Programación Reactiva',
    descripcion: 'Domina Observables, operadores y patrones reactivos para manejar flujos de datos asíncronos.',
    duracionHoras: 18,
    nivel: 'intermedio'
  },
  {
    id: '3',
    titulo: 'Gestión de Estado con NgRx',
    descripcion: 'Implementa arquitectura Redux en Angular usando Store, Effects, Actions y Selectors.',
    duracionHoras: 20,
    nivel: 'avanzado'
  },
  {
    id: '4',
    titulo: 'Angular Signals',
    descripcion: 'Explora el nuevo sistema de reactividad de Angular basado en signals para un rendimiento óptimo.',
    duracionHoras: 10,
    nivel: 'intermedio'
  },
  {
    id: '5',
    titulo: 'Arquitectura Smart/Dumb Components',
    descripcion: 'Diseña componentes escalables separando lógica de presentación siguiendo buenas prácticas.',
    duracionHoras: 15,
    nivel: 'avanzado'
  }
];

}
