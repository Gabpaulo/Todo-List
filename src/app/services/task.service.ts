import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private collectionName = 'tasks';

  constructor(private firestore: AngularFirestore) {}

  getTasks(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' });
  }

  addTask(task: any): Promise<any> {
    return this.firestore.collection(this.collectionName).add(task);
  }

  updateTask(id: string, task: any): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(task);
  }

  deleteTask(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
