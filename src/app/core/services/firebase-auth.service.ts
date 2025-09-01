import { Injectable, inject, signal, computed } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  
  private user = signal<User | null>(null);
  private loading = signal(false);

  currentUser = this.user.asReadonly();
  isLoading = this.loading.asReadonly();
  isAuthenticated = computed(() => !!this.user());

  constructor() {
    console.log('FirebaseAuthService constructor - Auth instance:', this.auth);
    console.log('Auth app config:', this.auth?.app?.options);
    this.initAuthStateListener();
  }

  private initAuthStateListener() {
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);
    });
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<void> {
    this.loading.set(true);
    try {
      console.log('Attempting Firebase signin with email:', email);
      console.log('Auth instance before signin:', this.auth);
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Firebase signin successful:', result);
    } catch (error) {
      console.error('Firebase signin error:', error);
      throw error;
    } finally {
      this.loading.set(false);
    }
  }

  async login(email: string, password: string): Promise<void> {
    return this.signInWithEmailAndPassword(email, password);
  }

  async register(email: string, password: string): Promise<void> {
    this.loading.set(true);
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } finally {
      this.loading.set(false);
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}