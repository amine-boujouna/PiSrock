import { Injectable } from '@angular/core';
import { Produit } from 'src/app/models/Produit'; // Assurez-vous que le modèle Produit est correct

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private panier: Produit[] = [];

  constructor() {}

  // Ajouter un produit au panier
  ajouterAuPanier(produit: Produit): void {
    this.panier.push(produit);
  }

  // Supprimer un produit du panier
  supprimerDuPanier(produitId: number): void {
    this.panier = this.panier.filter(produit => produit.id !== produitId);
  }

  // Récupérer tous les produits du panier
  obtenirPanier(): Produit[] {
    return this.panier;
  }
}
