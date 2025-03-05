
// update-fournisseur-dialog.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { SupplierService } from 'src/app/service/supplier.service';
import { ReactiveFormsModule } from '@angular/forms';  // Importez ReactiveFormsModule ici

@Component({
  selector: 'app-editfournissuer',
  imports: [ReactiveFormsModule],
  templateUrl: './editfournissuer.component.html',
  styleUrl: './editfournissuer.component.scss'
})
export class EditfournissuerComponent implements OnInit {

  fournisseurForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fournisseurService: SupplierService,
    public dialogRef: MatDialogRef<EditfournissuerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (!this.data || !this.data.fournisseur) {
      console.error("Aucune donnée de fournisseur reçue !");
      return;
    }

    this.fournisseurForm = this.fb.group({
      nom: [this.data.fournisseur.nom || '', Validators.required],
      contact: [this.data.fournisseur.contact || '', Validators.required],
      livraisonsReussies: [this.data.fournisseur.livraisonsReussies || 0, Validators.required],
      totalCommandes: [this.data.fournisseur.totalCommandes || 0, Validators.required],
      disponibilite: [this.data.fournisseur.disponibilite || 1.0, [Validators.required, Validators.min(0), Validators.max(100)]],
      prixMoyen: [this.data.fournisseur.prixMoyen || 0.0, Validators.required],
      score: [this.data.fournisseur.score || 0.0, [Validators.required, Validators.min(0), Validators.max(5)]]
    });
  }

  onSubmit(): void {
    if (this.fournisseurForm.valid) {
      const updatedFournisseur: Fournisseur = this.fournisseurForm.value;
      this.fournisseurService.updateFournisseur(this.data.fournisseur.id, updatedFournisseur).subscribe({
        next: (response) => {
          console.log('Mise à jour réussie', response);
          this.dialogRef.close(response);  // Ferme le modal après la mise à jour
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour', err);
        }
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}