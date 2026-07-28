import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tarea } from "./components/tarea/tarea";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Tarea],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tareas_frontend');
}
