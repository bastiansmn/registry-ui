import {Injectable} from '@angular/core';
import {ModelSubject} from "../declaration/behavior-model";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertShown$ = new ModelSubject<boolean>(false);
  message$ = new ModelSubject<string>('');

  constructor(private messageService: MessageService) {}

  show(args: { severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string }) {
    this.messageService.add(args);
  }

  hide() {
    this.alertShown$.next(false);
  }
}
