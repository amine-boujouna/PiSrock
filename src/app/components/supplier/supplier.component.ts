import { Component, OnInit } from '@angular/core';
import { Fournisseur } from 'src/app/models/Fournisseur';
import { SupplierService } from 'src/app/service/supplier.service';
import { CommonModule } from '@angular/common'; 
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AddsupplierComponent } from '../addsupplier/addsupplier.component';
import { MatDialog } from '@angular/material/dialog';
import { EditProjectComponent } from '../project/edit-project/edit-project.component';
import { EditfournissuerComponent } from 'src/app/componenets/editfournissuer/editfournissuer.component';

@Component({
  selector: 'app-supplier',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss',

})

export class SupplierComponent implements OnInit{
  fournisseur: any;
  fournisseurs: any[] = [];
  totalFournisseurs: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pages: number[] = [];
  fournisseurForm!: FormGroup;

  constructor(private fournisseurService: SupplierService, private fb: FormBuilder,private modalService: NgbModal,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadFournisseurs();

    this.fournisseurService.supplierAdded$.subscribe(() => {
      this.loadFournisseurs();
    });
    
    this.fournisseurForm = this.fb.group({
      nom: ['', Validators.required],
      contact: ['', Validators.required],
      livraisonsReussies: [0, [Validators.required, Validators.min(0)]],
      totalCommandes: [0, [Validators.required, Validators.min(0)]],
      disponibilite: [1.0, [Validators.required, Validators.min(0), Validators.max(1)]], // Entre 0 et 1
      prixMoyen: [0.0, [Validators.required, Validators.min(0)]],
      score: [0.0, [Validators.required, Validators.min(0), Validators.max(5)]], // Exemple : score sur 5
    });
    
  }
  onFournisseurAdded(fournisseur: Fournisseur): void {
    this.fournisseurs.push(fournisseur);  // Ajouter le fournisseur à la liste
  }

  openModal(): void {
    const dialogRef = this.dialog.open(AddsupplierComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Fournisseur ajouté:', result);
        // Vous pouvez maintenant mettre à jour la liste des fournisseurs
        this.onFournisseurAdded(result);

      }
    });
  }

  

  





  loadFournisseurs(): void {
    this.fournisseurService.getAllFournisseurs().subscribe(
      (data) => {
        this.fournisseurs = data;
        this.totalFournisseurs = data.length;
        this.calculatePagination();  // Calculer la pagination après avoir récupéré les fournisseurs
      },
      (error) => {
        console.error('Erreur lors du chargement des fournisseurs', error);
      }
    );
  }

  // Fonction pour obtenir les fournisseurs de la page actuelle
  getPaginatedFournisseurs(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.fournisseurs.slice(startIndex, endIndex);
  }

  // Calcul des pages à afficher
  calculatePagination(): void {
    const totalPages = Math.ceil(this.totalFournisseurs / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  // Changer de page
  changePage(page: number): void {
    this.currentPage = page;
    this.calculatePagination();
  }

  deleteFournisseur(id: number): void {
    this.fournisseurService.deleteFournisseur(id).subscribe({
      next: () => {
        // Après la suppression, filtrez la liste des fournisseurs pour enlever celui supprimé
        this.fournisseurs = this.fournisseurs.filter(f => f.id !== id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du fournisseur', err);
      }
    });
  }

  openEditFournisseurDialog(fournisseur: Fournisseur): void {
    const dialogRef = this.dialog.open(EditfournissuerComponent, {
      data: { fournisseur }  // Passer le fournisseur à éditer dans le dialog
    });

    dialogRef.afterClosed().subscribe((updatedFournisseur: Fournisseur) => {
      if (updatedFournisseur) {
        // Mettre à jour le fournisseur dans la liste après la fermeture du dialog
        const index = this.fournisseurs.findIndex(f => f.id === updatedFournisseur.id);
        if (index !== -1) {
          this.fournisseurs[index] = updatedFournisseur;
        }
      }
    });
  }

 
 

}
