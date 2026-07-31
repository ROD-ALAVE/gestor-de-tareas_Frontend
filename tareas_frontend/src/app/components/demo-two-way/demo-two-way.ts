import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-demo-two-way',
  imports: [FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './demo-two-way.html',
  styleUrl: './demo-two-way.css',
})
export class DemoTwoWay {

  nombre: string = 'Juan';

  cambiarNombre() {
    this.nombre = 'María';
  }
}
/**
 *    por defecto, desde codigo es Juan
 *    por defecto, al presionar el boton, cambia a María
 *    al escribir en el input, cambia el valor de nombre
 *   
 * 
 */