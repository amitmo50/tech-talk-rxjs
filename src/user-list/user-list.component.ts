import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  flatMap,
  map,
  mergeMap,
  Observable,
  of,
  scan,
  Subject,
  switchMap,
  takeUntil,
  tap,
  zip,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { UserService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { CountryService } from './country.service';
import { UserCard } from './user-card.config';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, UserCardComponent],
  providers: [UserService, CountryService],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users$!: Observable<any[]>;

  private onDestroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.users$ = this.getUsersCardDataObservable();
  }

  private getUsersCardDataObservable(): Observable<UserCard[]> {
    return this.userService.getUsers().pipe(
      takeUntil(this.onDestroy$),
      switchMap((users: any[]) => this.getUsersObservable(users)),
      mergeMap((users: any[]) => users),
      scan((acc: UserCard[], user: UserCard) => {
        acc = [...acc, user];
        return acc;
      }, [])
    );
  }

  private getUsersObservable(users: UserCard[]): Observable<any> {
    return zip(users.map((user: any) => this.handleUserData(user))).pipe(
      takeUntil(this.onDestroy$)
    );
  }

  private handleUserData(user: any): Observable<any> {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      address,
      date_of_birth,
      avatar,
    } = user;
    const { country, city, street_name } = address;
    return this.countryService.getCountry(country).pipe(
      takeUntil(this.onDestroy$),
      map((countryData: { [key: string]: any }) => ({
        firstName: first_name,
        lastName: last_name,
        email,
        phone: phone_number,
        dateOfBirth: date_of_birth,
        image: avatar,
        address: {
          country,
          flag: countryData[0].flag,
          city: city,
          street: street_name,
          currency: Object.keys(countryData[0].currencies)[0],
          languages: Object.values(countryData[0].languages),
        },
      }))
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
