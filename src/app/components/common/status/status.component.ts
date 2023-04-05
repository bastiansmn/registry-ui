import {Component, Input} from '@angular/core';
import {Status} from "../../../enum/status.enum";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

  @Input() status!: Status;

  Status = Status;

}
