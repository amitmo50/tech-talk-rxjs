// user-card.component.ts
import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserCard } from '../user-card.config';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() user!: UserCard;
}
