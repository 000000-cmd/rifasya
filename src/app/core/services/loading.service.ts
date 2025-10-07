import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public readonly isLoading$ = this.isLoadingSubject.asObservable();

  private messageSubject = new BehaviorSubject<string>('');
  public readonly message$ = this.messageSubject.asObservable();

  /** Muestra el spinner con un mensaje opcional. */
  show(message: string = ''): void {
    this.messageSubject.next(message);
    this.isLoadingSubject.next(true);
  }

  /** Oculta el spinner. */
  hide(): void {
    this.messageSubject.next('');
    this.isLoadingSubject.next(false);
  }
}
