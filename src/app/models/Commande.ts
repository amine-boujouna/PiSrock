import { Produit } from './Produit';
import { Fournisseur } from './Fournisseur';
import { ProduitCommande } from './ProduitCommande';

export enum StatutCommande {
  EN_ATTENTE = 'EN_ATTENTE',
  EN_COURS='EN_COURS',
  LIVRE = 'LIVRE'
  
  
}

// Interface pour la commande
export interface Commande {
  id?: number;
  date: string; // Assurez-vous que c'est au format ISO si vous utilisez des chaînes
  statut: StatutCommande; // Utilisation de l'enum
  montantTotal: number;
  quantiteCommandee: number;
  produitId: number ; // Permet d'accepter undefined
}
