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
      .subscribe( data => {
        this.users = data;
      });
  };
   
  user: User = new User();
  createUser(): void {
    this.userService.createUser(this.user)
        .subscribe( data => {
          //alert("User created successfully.");
           this.users = data;
           this.user = new User();
        });

  };
    
  deleteUser(user: User): void {
    this.userService.deleteUser(user)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };
    
  getUserById(user: User): void {
    this.userService.getUserById(user)
      .subscribe( data => {
        this.user = data;
      })
  };
    
  updateUser(user: User): void {
    this.userService.updateUser(user)
      .subscribe( data => {
        this.users = data;
        this.user = new User();
      })
  };

}
