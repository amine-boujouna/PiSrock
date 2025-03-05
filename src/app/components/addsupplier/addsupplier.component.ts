import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierComponent } from '../supplier/supplier.component';
import { SupplierService } from 'src/app/service/supplier.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { ReactiveFormsModule } from '@angular/forms';  // Importer ReactiveFormsModule

@Component({
  selector: 'app-addsupplier',
  imports: [ReactiveFormsModule],
  templateUrl: './addsupplier.component.html',
  styleUrl: './addsupplier.component.scss'
})
export class AddsupplierComponent {
  fournisseurForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddsupplierComponent>,  
    private fournisseurService: SupplierService  // Injecter le service pour ajouter un fournisseur
  ) {
    this.fournisseurForm = this.fb.group({
      nom: ['', Validators.required],
      contact: ['', Validators.required],
      livraisonsReussies: [0, [Validators.required, Validators.min(0)]],
      totalCommandes: [0, [Validators.required, Validators.min(0)]],
      disponibilite: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      prixMoyen: [0, [Validators.required, Validators.min(0)]],
      score: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.fournisseurForm.invalid) {
      return;
    }

    const fournisseurData: Fournisseur = this.fournisseurForm.value;

    this.fournisseurService.addFournisseur(fournisseurData).subscribe({
      next: (savedFournisseur) => {
        this.dialogRef.close(savedFournisseur); 
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du fournisseur', err);
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close();  // Ferme le modal sans rien faire
  }

}
