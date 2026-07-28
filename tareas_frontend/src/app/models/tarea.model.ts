export type PrioridadTarea = 'baja' | 'media' | 'alta';
export type CategoriaTarea = 'estudio' | 'deporte' | 'trabajo' | 'personal';

export interface Tarea {
  id?: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
  fecha_vencimiento?: string | null;
  prioridad: PrioridadTarea;
  categoria: CategoriaTarea;
}

