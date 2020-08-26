import { Injectable } from '@angular/core';
import { Dispatchlog } from '../models/dipatchlog';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DispatchlogService {
  dispatchLogs$: AngularFirestoreCollection<Dispatchlog>;

  constructor(private afs: AngularFirestore) {
    this.dispatchLogs$ = this.afs.collection<Dispatchlog>('dispatchlogs');
  }

  getDispatchLogs(): Observable<Dispatchlog[]> {
    return this.dispatchLogs$.valueChanges();
  }
  addLog(record: Dispatchlog): void {
    record.$key = this.afs.createId();
    this.dispatchLogs$.doc(record.$key).set(record);
  }
  editLog(record: Dispatchlog): void {
    this.dispatchLogs$.doc(record.$key).update(record);
  }

  delete(record: Dispatchlog): void {
    this.dispatchLogs$.doc(record.$key).delete();
  }
}
