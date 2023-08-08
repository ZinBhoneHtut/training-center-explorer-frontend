import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { remove as _remove } from 'lodash';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  userList: User[] = [];
  loading: boolean = true;

  constructor(private userService: UserService, private confirmationService: ConfirmationService, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((_userList: User[]) => {
      this.userList = _userList;
      this.loading = false;
    })
  }

  deleteUser(event: Event, userId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure to delete this record?',
      target: event.target as EventTarget,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sure',
      acceptButtonStyleClass: 'p-button-primary',
      accept: () => {
        this.userService.deleteUser(userId).subscribe((reponse: HttpResponse<Object>) => {
          if (reponse.ok) {
            _remove(this.userList, user => user.id === userId);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record is deleted' });
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
  }

}
