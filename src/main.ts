import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, UserListComponent],
  template: `
    <h1>{{name}}!</h1>
    <app-user-list></app-user-list>
  `,
})
export class App {
  name = 'Tech Talk Exercise';
}

bootstrapApplication(App);
