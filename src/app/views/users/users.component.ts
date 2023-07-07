import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../models/user.model";
import {ApiService} from "../../services/api.service";
import {NzModalService} from 'ng-zorro-antd/modal';
import {EditModalComponent} from "../../components/users/edit-modal.component";
import {CreateModalComponent} from "../../components/users/create-modal.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('usersTable') usersTable: ElementRef | undefined;
  protected readonly faTrash = faTrash;
  protected readonly faEdit = faEdit;
  protected readonly faPlus = faPlus;
  public users: User[] = [];
  public user: User | undefined;

  constructor(private modalService: NzModalService) {
    let user = localStorage.getItem('user');
    this.user = user ? JSON.parse(user) : undefined;
  }

  ngOnInit() {
    ApiService.get('users').then(result => {
      this.users = result.data.data;
    });
  }

  delete(id: number | undefined) {
    const modal = this.modalService.confirm({
      nzTitle: 'Deseja realmente excluir este usuário?',
      nzContent: 'Ao excluir este usuário, todos os dados relacionados a ele serão excluídos também.',
      nzOkText: 'Sim',
      nzCancelText: 'Não',
      nzOkDanger: true,
      nzOnOk: () => {
        ApiService.delete('users', id).then(result => {
          if (result.data.success) {
            this.users = this.users.filter(user => user.id !== id);
          }
        }).catch(error => {
          ApiService.catch(error);
        });
      }
    });
  }

  edit(id: number | undefined) {
    const user = this.users.find(user => user.id === id);
    const modal = this.modalService.create({
        nzTitle: 'Editar usuário',
        nzContent: EditModalComponent,
        nzComponentParams: {
          user: user
        },
        nzClosable: true,
        nzFooter: []
      }
    );
  }

  create() {
    const modal = this.modalService.create({
        nzTitle: 'Criando um novo usuário',
        nzContent: CreateModalComponent,
        nzClosable: true,
        nzFooter: []
      }
    );
  }
}
