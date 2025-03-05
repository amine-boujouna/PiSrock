import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/Produit';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/produits';  

  constructor(private http: HttpClient) {}

  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit);
  }
    getproduitbyid(id: number): Observable<Produit> {
      return this.http.get<Produit>(`${this.apiUrl}/${id}`);
    }

  getProduitsByFournisseur(fournisseurId: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/fournisseur/${fournisseurId}`);
  }
}
