import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { UserService } from './user.service';

@Component({
    templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {

    constructor(private router: Router, private userService: UserService) {

    }

    users: User[];
    ngOnInit() {
        this.userService.getUsers()
            .subscribe(data => {
                this.users = data;
            });
    };

    user: User = new User();
    createUser(): void {
        this.userService.createUser(this.user)
            .subscribe(data => {
                this.users = this.users.concat(data);
                this.user = new User();
            });

    };

    deleteUser(user: User): void {
        this.userService.deleteUser(user)
            .subscribe(data => {
                this.users = this.users.filter(u => u !== user);
            })
    };

    editUserById(user: User): void {
        this.userService.getUserById(user)
            .subscribe(data => {
                this.user = data;
            })
    };

    updateUser(user: User): void {
        this.userService.updateUser(user)
            .subscribe(data => {
                this.users.forEach((t, i) => {
                    if (t.userId === data.userId) { this.users[i] = data; }
                });

                this.user = new User();
            })
    };

    getUserByFirstName(firstName: string): void {

        this.userService.getUsers()
            .subscribe(data => {
                this.users = data;
                this.users.forEach((t, i) => {
                    if (t.firstName === firstName) { this.users = this.users.filter(u => u == t); }
                })
            });


    };

    sortListByParameter(param: string): void {

        if (param === "firstName") {
            this.users = this.users.sort((a, b) => a.firstName.localeCompare(b.firstName));
        } else if (param === "lastName") {
            this.users = this.users.sort((a, b) => a.lastName.localeCompare(b.lastName));
        } else if (param === "employeeId") {
            this.users = this.users.sort((a, b) => a.employeeId.localeCompare(b.employeeId));
        }

    };
    
}
