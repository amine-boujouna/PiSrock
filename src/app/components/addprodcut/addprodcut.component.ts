import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Produit } from 'src/app/models/Produit';
import { ProductService } from 'src/app/service/product.service';
import { ProductComponent } from '../product/product.component';
import { SupplierComponent } from '../supplier/supplier.component';
import { SupplierService } from 'src/app/service/supplier.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addprodcut',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './addprodcut.component.html',
  styleUrl: './addprodcut.component.scss'
})
export class AddprodcutComponent {

  produitForm: FormGroup;
  fournisseurs: any[] = [];  // Liste des fournisseurs

  constructor(
    private formBuilder: FormBuilder,
    private produitService: ProductService,
    private fournisseurService: SupplierService,  // Injectez le service fournisseur
    private dialogRef: MatDialogRef<AddprodcutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loadFournisseurs();  // Charger les fournisseurs

    this.produitForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      quantiteEnStock: ['', [Validators.required]],
      seuilMin: ['', [Validators.required]],
      seuilMax: ['', [Validators.required]],
      fournisseur: ['', [Validators.required]]  
    });

    if (this.data?.id) {
      this.produitForm.patchValue(this.data);
    }
  }

  loadFournisseurs(): void {
    this.fournisseurService.getAllFournisseurs().subscribe((fournisseurs) => {
      this.fournisseurs = fournisseurs;
      console.log(fournisseurs);
    });
  }

  onSubmit(): void {
    if (this.produitForm.valid) {
      if (this.data?.id) {
        this.updateProduit();
      } else {
        this.addProduit();
      }
    }
  }
  

  addProduit(): void {
    const produitWithFournisseur = { ...this.produitForm.value };
    
    produitWithFournisseur.fournisseur = { id: produitWithFournisseur.fournisseur };

    this.produitService.addProduit(produitWithFournisseur).subscribe(
      (response) => {
        console.log('Produit ajouté avec succès:', response);
        this.dialogRef.close(response);  
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit:', error);
      }
    );
  }

  updateProduit(): void {
    this.produitService.updateProduit(this.data.id, this.produitForm.value).subscribe(() => {
      this.dialogRef.close(true);  
    });
  }

  closeDialog(): void {
    this.dialogRef.close();  
  }
}
