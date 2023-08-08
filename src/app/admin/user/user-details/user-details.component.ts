import { HttpStatusCode } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription, forkJoin, iif } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Gender } from '../../models/gender.enum';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { RoleSerivce } from '../../services/role.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  user!: User;
  user$!: Subscription;
  activatedRoute$!: Subscription;

  userForm!: FormGroup;
  isLoading: boolean = false;
  roleList: Role[] = [];
  gender = Gender;
  selectedRole!: Role;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService,
    private roleService: RoleSerivce, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute$ = this.activatedRoute.params.pipe(
      switchMap(({ id }) => {
        return forkJoin({
          user: this.userService.getUserById(id),
          roles: this.roleService.getAllRoles()
        })
      })
    ).subscribe({
      next: ({ user, roles }) => {
        this.user = user;
        this.roleList = roles;
        this.initForm();
        this.isLoading = false;
      }
    })
  }

  initForm() {
    this.userForm = this.fb.group(
      {
        name: ['',
          {
            validators: [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(60)
            ],
            asyncValidators: [
              // createCheckUserExistsValidator(this.user, this.userService)
            ],
            updateOn: 'blur'
          }
        ],
        email: ['',
          {
            validators: [
              Validators.required,
              Validators.pattern(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}\w*$/),
              Validators.maxLength(80)
            ],
          }
        ],
        telephone: ['', Validators.required],
        gender: ['', Validators.required],
        roles: [null, Validators.required],
      }
    );

    this.userForm.patchValue({
      ...this.user,
      roles: this.user?.roles
    });
  }

  createOrUpdateUser(): void {
    this.user$ = iif(() => this.user.id == 0,
      this.userService.addUser(this.userForm.value),
      this.userService.updateUser(this.user.id, this.userForm.value)
    ).subscribe({
      next: ({ status }) => {
        const notiMessage = status == HttpStatusCode.Created ? "Succssfully created" : "Successfully updated";
        this.messageService.add({ severity: 'success', summary: 'Success', detail: notiMessage });
      },
      error: (error: Error) => {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: "Something went wrong" });
      },
      complete: () => { this.router.navigate(['..'], { relativeTo: this.activatedRoute }) }
    });
  }

  isFormInvalid(formControlName: string) {
    return this.f[formControlName].invalid && (this.f[formControlName].dirty || this.f[formControlName].touched);
  }

  hasError(formControlName: string, errorName: string) {
    return this.f[formControlName].hasError(errorName);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  ngOnDestroy(): void {
    this.activatedRoute$?.unsubscribe();
    this.user$?.unsubscribe();
  }

}
