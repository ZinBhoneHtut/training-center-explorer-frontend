import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { remove as _remove, assign as _assign } from 'lodash';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ColumnItem } from '../../models/column-item.model';
import { EMPTY, Subscription, catchError, filter, switchMap } from 'rxjs';
import { DEFAULT_QUERY_CRITERIA, ROWS_OPTIONS } from '../../models/query-criteria.model';
import { TableLazyLoadEvent } from 'primeng/table';

const columns: ColumnItem[] = [
  { header: 'No.', field: 'no', isForzenColumn: true, style: 'min-width: 80px', sort: true },
  { header: 'Name', field: 'name', style: 'min-width: 150px', sort: true },
  { header: 'Gender', field: 'gender', style: 'min-width: 100px', sort: true },
  { header: 'Telephone', field: 'telephone', style: 'min-width: 120px', sort: true },
  { header: 'Email', field: 'email', sort: true },
  { header: 'Role', field: 'roles', style: 'min-width: 150px;', sort: false },
  { header: 'Created Date', field: 'createdDate', style: 'min-width: 150px', sort: true }
]

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  userList: User[] = [];
  loading: boolean = true;
  columns = [...columns];
  rows: number = 10;
  totalRecords: number = 0;
  rowOptions = ROWS_OPTIONS;
  user$!: Subscription;
  deleteUser$!: Subscription;

  queryCriteria = DEFAULT_QUERY_CRITERIA;

  constructor(private userService: UserService, private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void { }

  deleteUser(event: Event, userId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure to delete?',
      target: event.target as EventTarget,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sure',
      acceptButtonStyleClass: 'p-button-primary',
      accept: () => {
        this.deleteUser$ = this.userService.deleteUser(userId).pipe(
          filter((reponse: HttpResponse<Object>) => reponse.ok),
          switchMap(() => this.userService.getAllUser(this.queryCriteria)),
          catchError((error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete user' });
            return EMPTY;
          })
        ).subscribe(resopnse => {
          this.userList = resopnse.data;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is deleted' });
        });
      }
    });
  }

  nextPage(event: TableLazyLoadEvent) {
    const {
      first: page = 0,
      rows: size,
      sortField,
      sortOrder
    } = event;

    _assign(this.queryCriteria, {
      page: page / 10,
      size,
      sortField,
      sortOrder: sortOrder == -1 ? 'desc' : 'asc'
    });

    this.user$ = this.userService.getAllUser(this.queryCriteria).subscribe({
      next: (response) => {
        this.totalRecords = response.recordsTotal;
        this.userList = response.data;
        this.loading = false;
      }
    })
    console.log(event);
  }

  ngOnDestroy(): void {
    this.user$?.unsubscribe();
    this.deleteUser$?.unsubscribe();
  }

}
