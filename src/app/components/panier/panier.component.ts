import { Component } from '@angular/core';
import { Produit } from 'src/app/models/Produit';
import { PanierService } from 'src/app/service/panier-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss'
})
export class PanierComponent {
  produitsDansLePanier: Produit[] = []; // Liste des produits dans le panier

  constructor(private panierService: PanierService) {}

  ngOnInit(): void {
    this.produitsDansLePanier = this.panierService.obtenirPanier();
  }

  // Supprimer un produit du panier
  supprimerDuPanier(produitId: number): void {
    this.panierService.supprimerDuPanier(produitId);
    this.produitsDansLePanier = this.panierService.obtenirPanier(); // Mettre à jour l'affichage
  }
}
