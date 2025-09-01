import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc, query, where, orderBy, limit } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore = inject(Firestore);
  private loading = signal(false);

  isLoading = this.loading.asReadonly();

  async create(collectionName: string, data: any): Promise<string> {
    this.loading.set(true);
    try {
      const docRef = await addDoc(collection(this.firestore, collectionName), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } finally {
      this.loading.set(false);
    }
  }

  async read(collectionName: string, docId: string): Promise<any> {
    this.loading.set(true);
    try {
      const docRef = doc(this.firestore, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return { id: docSnap.id, ...(data || {}) };
      }
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  async update(collectionName: string, docId: string, data: any): Promise<void> {
    this.loading.set(true);
    try {
      const docRef = doc(this.firestore, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });
    } finally {
      this.loading.set(false);
    }
  }

  async delete(collectionName: string, docId: string): Promise<void> {
    this.loading.set(true);
    try {
      const docRef = doc(this.firestore, collectionName, docId);
      await deleteDoc(docRef);
    } finally {
      this.loading.set(false);
    }
  }

  async getAll(collectionName: string): Promise<any[]> {
    this.loading.set(true);
    try {
      const querySnapshot = await getDocs(collection(this.firestore, collectionName));
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { id: doc.id, ...(data || {}) };
      });
    } finally {
      this.loading.set(false);
    }
  }

  async queryCollection(
    collectionName: string,
    conditions: { field: string; operator: any; value: any }[] = [],
    orderByField?: string,
    orderDirection: 'asc' | 'desc' = 'asc',
    limitCount?: number
  ): Promise<any[]> {
    this.loading.set(true);
    try {
      let q = collection(this.firestore, collectionName);
      let queryRef: any = q;

      // Apply where conditions
      conditions.forEach(condition => {
        queryRef = query(queryRef, where(condition.field, condition.operator, condition.value));
      });

      // Apply ordering
      if (orderByField) {
        queryRef = query(queryRef, orderBy(orderByField, orderDirection));
      }

      // Apply limit
      if (limitCount) {
        queryRef = query(queryRef, limit(limitCount));
      }

      const querySnapshot = await getDocs(queryRef);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { id: doc.id, ...(data || {}) };
      });
    } finally {
      this.loading.set(false);
    }
  }
}