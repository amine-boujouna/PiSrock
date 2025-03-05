import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component'; // Assure-toi que le chemin du composant est correct

@NgModule({
  declarations: [SupplierComponent],
  imports: [CommonModule],
  exports: [SupplierComponent], // Exporte le composant pour qu'il soit accessible ailleurs
})
export class SupplierModule {}
