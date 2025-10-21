import {ApplicationRef, createComponent, EnvironmentInjector, Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-angular';
import {ConfirmModalComponent} from '../../shared/ui/modals/ConfirmModal.component';

// Tipos y estructura de datos para las alertas
export type AlertDisplay = 'modal' | 'toast';
export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
  type: AlertType;
  title: string;
  message: string;
  icon: any;
  display: AlertDisplay;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);
  public alert$: Observable<Alert | null> = this.alertSubject.asObservable();
  private toastTimeout: any;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  // --- Métodos para Alertas Modales (Normal) ---

  success(title: string, message: string): void {
    this.showAlert({ type: 'success', title, message, icon: CheckCircle2, display: 'modal' });
  }

  error(title: string, message: string): void {
    this.showAlert({ type: 'error', title, message, icon: XCircle, display: 'modal' });
  }

  warning(title: string, message: string): void {
    this.showAlert({ type: 'warning', title, message, icon: AlertTriangle, display: 'modal' });
  }

  info(title: string, message: string): void {
    this.showAlert({ type: 'info', title, message, icon: Info, display: 'modal' });
  }

  // --- Métodos para Alertas Toast (Mixin) ---

  toastSuccess(message: string): void {
    this.showToast({ type: 'success', title: 'Éxito', message, icon: CheckCircle2, display: 'toast'});
  }

  toastError(message: string): void {
    this.showToast({ type: 'error', title: 'Error', message, icon: XCircle, display: 'toast'});
  }

  toastInfo(message: string): void {
    this.showToast({ type: 'info', title: 'Información', message, icon: Info, display: 'toast'});
  }

  confirm(title: string, message: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      // 1. Crea una instancia del componente del modal
      const componentRef = createComponent(ConfirmModalComponent, {
        environmentInjector: this.injector
      });

      // 2. Le pasa el título y el mensaje
      componentRef.instance.title = title;
      componentRef.instance.message = message;

      // 3. Lo añade al DOM de la aplicación
      document.body.appendChild(componentRef.location.nativeElement);
      this.appRef.attachView(componentRef.hostView);

      // 4. Se suscribe al evento 'result' del modal
      const sub = componentRef.instance.result.subscribe(result => {
        sub.unsubscribe();
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy(); // Destruye el componente para limpiar la memoria
        resolve(result); // Devuelve 'true' o 'false'
      });
    });
  }

  // --- Métodos Privados ---

  private showAlert(alert: Alert): void {
    this.alertSubject.next(alert);
  }

  private showToast(alert: Alert): void {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.alertSubject.next(alert);

    this.toastTimeout = setTimeout(() => {
      this.hide();
      this.toastTimeout = null;
    }, 3000);
  }

  hide(): void {
    this.alertSubject.next(null);
  }


}
