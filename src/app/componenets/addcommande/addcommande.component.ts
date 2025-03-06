import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommandeService } from 'src/app/service/commande.service';
import { Produit } from 'src/app/models/Produit';
import { Commande } from 'src/app/models/Commande';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupplierService } from 'src/app/service/supplier.service';
import { ProductService } from 'src/app/service/product.service';
// add-commande.component.ts
import { StatutCommande } from '../../models/Commande';  // Assurez-vous que le chemin d'importation est correct

@Component({
  selector: 'app-addcommande',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './addcommande.component.html',
  styleUrls: ['./addcommande.component.scss']
})
export class AddcommandeComponent {
  commande: Commande = {
    id: undefined,
    date: new Date().toISOString(),
    statut: StatutCommande.EN_ATTENTE,
    quantiteCommandee: 0,
    montantTotal: 0,
    produitId: 0
  };
  
  produit: Produit;

  constructor(
    public dialogRef: MatDialogRef<AddcommandeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { produit: Produit },
    private commandeService: CommandeService
  ) {
    if (this.data.produit && this.data.produit.id) {
      this.commande.produitId = this.data.produit.id;
      this.produit = this.data.produit; // Initialiser la variable produit
    } else {
      console.error('Produit ID ou produit manquant');
    }
    console.log('Produit ID initialisé:', this.commande.produitId);
    console.log('Produit:', this.produit);
  }


  calculateMontantTotal() {
    if (this.commande.quantiteCommandee > 0 && this.produit && this.produit.prix > 0) {
      let montant = this.commande.quantiteCommandee * this.produit.prix;
  
      // Appliquer la réduction selon la quantité commandée
      if (this.commande.quantiteCommandee >= 50) {
        montant *= 0.8; // Réduction de 20%
      } else if (this.commande.quantiteCommandee >= 10) {
        montant *= 0.85; // Réduction de 15%
      } else if (this.commande.quantiteCommandee > 5) {
        montant *= 0.9; // Réduction de 10%
      }
  
      this.commande.montantTotal = montant;
    } else {
      console.error('Prix ou quantité invalides pour calculer le montant total');
    }
  }
  
  
  submitCommande() {
    // Vérifier que la quantité, le montant total et l'ID du produit sont valides
    if (
      this.commande.quantiteCommandee <= 0 ||
      this.commande.montantTotal <= 0 ||
      !this.commande.produitId
    ) {
      console.error('Quantité, montant total, ou ID produit manquant ou invalide');
      return;
    }

    // Si tout est valide, soumettre la commande
    this.commandeService.creerCommande(this.commande, this.commande.produitId!)
  .subscribe(
    (createdCommande) => {
      console.log('Commande créée:', createdCommande);
      this.dialogRef.close(createdCommande);
    },
    (error) => {
      console.error('Erreur lors de la création de la commande:', error);
      alert("Erreur: " + error.message); // Affiche l'erreur pour plus de visibilité
    }
  );

  }

  cancel() {
    this.dialogRef.close();
  }
}
