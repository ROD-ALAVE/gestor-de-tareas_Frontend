import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tarea } from "./components/tarea/tarea";
import { DemoTwoWay } from './components/demo-two-way/demo-two-way';
import { Cursoangular } from './components/cursoangular/cursoangular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Tarea,DemoTwoWay,Cursoangular  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tareas_frontend');
}
