import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Tarea } from '../models/tarea.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8000/api/tareas'; // ajusta tu endpoint

  // Estado reactivo con signals
  private _tareas = signal<Tarea[]>([]);
  tareas = this._tareas.asReadonly();

  // GET: obtener todas las tareas
  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl).pipe(
      tap(tareas => this._tareas.set(tareas))
    );
  }

  // GET: obtener una tarea por id
  getTarea(id: number): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.apiUrl}/${id}`);
  }

  // POST: crear una nueva tarea
  createTarea(tarea: Tarea): Observable<Tarea> {
    console.log(tarea);
    return this.http.post<Tarea>(this.apiUrl, tarea);
    // return this.http.post<Tarea>(this.apiUrl, tarea).pipe(
    //   tap(nueva => this._tareas.update(tareas => [...tareas, nueva]))
    // );
  }

  // PUT: actualizar una tarea existente
  updateTarea(id: number, tarea: Partial<Tarea>): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tarea).pipe(
      tap(actualizada => {
        this._tareas.update(tareas =>
          tareas.map(t => (t.id === id ? actualizada : t))
        );
      })
    );
  }

  // PATCH: actualizar solo el estado "completada"
  toggleCompletada(id: number, completada: boolean): Observable<Tarea> {
    return this.http.patch<Tarea>(`${this.apiUrl}/${id}`, { completada }).pipe(
      tap(actualizada => {
        this._tareas.update(tareas =>
          tareas.map(t => (t.id === id ? actualizada : t))
        );
      })
    );
  }

  // DELETE: eliminar una tarea
  deleteTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this._tareas.update(tareas => tareas.filter(t => t.id !== id));
      })
    );
  }

  // Bonus: filtrar por categoría o prioridad usando query params
  filtrarTareas(filtros: { categoria?: string; prioridad?: string }): Observable<Tarea[]> {
    let params = new HttpParams();
    if (filtros.categoria) params = params.set('categoria', filtros.categoria);
    if (filtros.prioridad) params = params.set('prioridad', filtros.prioridad);

    return this.http.get<Tarea[]>(this.apiUrl, { params }).pipe(
      tap(tareas => this._tareas.set(tareas))
    );
  }
}
