import { Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/service/product.service';
import { AddprodcutComponent } from '../addprodcut/addprodcut.component';
import { MatDialog } from '@angular/material/dialog';
import { Produit } from 'src/app/models/Produit';
import { PanierService } from 'src/app/service/panier-service.service';
import { Router } from '@angular/router';
import { CommandeService } from 'src/app/service/commande.service';
import { Commande } from 'src/app/models/Commande';
import { FormsModule } from '@angular/forms'; // ✅ Ajout de FormsModule
import { AddcommandeComponent } from 'src/app/componenets/addcommande/addcommande.component';


@Component({
  selector: 'app-product',
  imports: [CommonModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  produits: Produit[] = [];  // Liste des produits disponibles
  @ViewChild(AddcommandeComponent) addCommandeComponent!: AddcommandeComponent;


  constructor(private produitService: ProductService,private commandeService: CommandeService,private router: Router,public dialog: MatDialog,private panierService :PanierService) {}


  ngOnInit(): void {
    this.loadProduits();  

  }
  openAddCommandeDialog(produit: Produit) {
    if (produit && produit.id) {
      console.log('Produit ID:', produit.id);  // Vérifiez l'ID récupéré
      const dialogRef = this.dialog.open(AddcommandeComponent, {
        data: { produit: produit }  // Passez l'objet complet produit
      });
  
      dialogRef.afterClosed().subscribe((commande: Commande) => {
        if (commande) {
          console.log('Commande ajoutée:', commande);
          // Traitez la commande ici
        }
      });
    } else {
      console.log('Produit ou ID manquant:', produit);
    }
  }
  
  
  
  
  
  
  loadProduits(): void {
    this.produitService.getAllProduits().subscribe(
      (produits: Produit[]) => {
        console.log("Produits:", JSON.stringify(produits, null, 2));  
        this.produits = produits;  
      },
      error => {
        console.error('Erreur lors du chargement des produits', error); 
      }
    );
  }
  openAjouterCommandeDialog(): void {
    const dialogRef = this.dialog.open(AddcommandeComponent, {
      width: '500px',
      data: {}  // Tu peux passer des données ici si nécessaire
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le dialog a été fermé');
    });
  }
 
  deleteProduit(id: number): void {
    this.produitService.deleteProduit(id).subscribe(() => {
      this.loadProduits(); 
    });
  }
  openModal(): void {
    const dialogRef = this.dialog.open(AddprodcutComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le modal a été fermé');
      if (result) {
        this.produits.push(result);
      }
    });
  }
  onProduitAdded(isAdded: boolean): void {
    if (isAdded) {
      this.loadProduits(); 
    }
  }
  ajouterAuPanier(produit: Produit): void {
    this.panierService.ajouterAuPanier(produit);
    alert(`${produit.nom} ajouté au panier!`);
  }
  goToPanier() {
    this.router.navigate(['/panier']);  // Navigation vers la route '/panier'
  }
 
  
}
