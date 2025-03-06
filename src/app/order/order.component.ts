import { Component } from '@angular/core';
import { CommandeService } from '../service/commande.service';
import { Commande } from '../models/Commande';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Ajout de FormsModule

@Component({
  selector: 'app-order',
  imports: [FormsModule,CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  commandes: Commande[] = [];

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.commandeService.getCommandes().subscribe(
      (data: Commande[]) => {
        this.commandes = data;
        console.log('Commandes chargées:', this.commandes);
      },
      error => {
        console.error('Erreur lors du chargement des commandes:', error);
      }
    );
  }
}
