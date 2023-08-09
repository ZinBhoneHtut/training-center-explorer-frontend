import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { remove as _remove } from 'lodash';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ColumnItem } from '../../models/column-item.model';
import { EMPTY, catchError, filter, switchMap } from 'rxjs';

const columns: ColumnItem[] = [
  { header: 'No.', field: 'no', isForzenColumn: true },
  { header: 'Name', field: 'name', style: 'min-width: 150px' },
  { header: 'Gender', field: 'gender' },
  { header: 'Telephone', field: 'telephone' },
  { header: 'Email', field: 'email' },
  { header: 'Role', field: 'roles', style: 'min-width: 150px' },
  { header: 'Created Date', field: 'createdDate', style: 'min-width: 150px' }
]

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  userList: User[] = [];
  loading: boolean = true;
  columns = columns;

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
      message: 'Are you sure to delete?',
      target: event.target as EventTarget,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sure',
      acceptButtonStyleClass: 'p-button-primary',
      accept: () => {
        this.userService.deleteUser(userId).pipe(
          filter((reponse: HttpResponse<Object>) => reponse.ok),
          switchMap(() => this.userService.getAllUser()),
          catchError((error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user' });
            return EMPTY;
          })
        ).subscribe((userList: User[]) => {
            this.userList = userList;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is deleted' });
        });
      }
    });
  }

  ngOnDestroy(): void {
  }

}
