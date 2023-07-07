import {Component} from '@angular/core';

@Component({
  selector: 'app-edit-users',
  template:
    '<app-register [redirect]="false" [refresh]="true">' +
    '</app-register>'
})
export class CreateModalComponent {
}
