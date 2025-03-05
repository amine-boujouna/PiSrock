export interface Produit {
    id?: number;                  
    nom: string;                    
    prix: number;                  
    quantiteDerniereCommande: number;  
    quantiteEnStock: number;        
    seuilMin: number;               
    seuilMax: number;              
    fournisseurId: string | null;  // Utilisez 'null' ou un identifiant de fournisseur
    quantiteCommandee: number;

}
  