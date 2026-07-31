export interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  duracionHoras: number;
  nivel: 'básico' | 'intermedio' | 'avanzado';
}