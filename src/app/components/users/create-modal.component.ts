import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-edit-users',
  template:
    '<app-register [redirect]="false" (createUser)="onCreate($event)">' +
    '</app-register>'
})
export class CreateModalComponent {

  @Output() createUser: EventEmitter<any> = new EventEmitter<any>();
  public onCreate($event: any): void {
    this.createUser.emit($event);
  }
}
