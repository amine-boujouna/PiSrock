import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Commande } from '../models/Commande';
import { ProductService } from './product.service';
import { Produit } from '../models/Produit';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiUrl = 'http://localhost:8080/api/commandes';

  constructor(private http: HttpClient,private produitservice:ProductService) {}


  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.apiUrl);
  }

 
  getCommandeById(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.apiUrl}/commande/${id}`);
  }

 
   
  creerCommande(commande: Commande, idp: number): Observable<Commande> {
    return this.http.post<Commande>(`${this.apiUrl}/commande/${idp}`, commande);
  }
  
  

  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
