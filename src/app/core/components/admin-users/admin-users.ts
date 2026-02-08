import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'admin-users',
  standalone: true, // Assure-toi qu'il est bien standalone si tu ne l'as pas mis
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.html',
})
export class AdminUsers implements OnInit {
  users: any[] = [];
  newUsername: string = '';
  newPassword: string = ''; // Pour capturer le mot de passe à la création

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.authService.getUsers();
  }

  onAddUser() {
    // Vérification que les deux champs sont remplis
    if (this.newUsername.trim() && this.newPassword.trim()) {
      this.authService.addUser(this.newUsername, this.newPassword);
      this.newUsername = '';
      this.newPassword = ''; // On vide les champs
      this.loadUsers();
    } else {
      alert("Veuillez saisir un nom ET un mot de passe.");
    }
  }

  onToggleBlock(userId: number) {
    this.authService.toggleBlockUser(userId);
    this.loadUsers();
  }

  onResetPassword(userId: number) {
    // On demande à l'admin de saisir le nouveau mot de passe
    const mdpSaisi = prompt('Entrez le nouveau mot de passe pour cet utilisateur :');
    
    // Si l'admin a saisi quelque chose (pas annulé et pas vide)
    if (mdpSaisi !== null && mdpSaisi.trim() !== '') {
      this.authService.resetPassword(userId, mdpSaisi);
      alert('Mot de passe mis à jour avec succès !');
      this.loadUsers();
    }
  }

  onDelete(userId: number) {
    if (confirm('Supprimer définitivement cet utilisateur ?')) {
      this.authService.deleteUser(userId);
      this.loadUsers();
    }
  }
}
