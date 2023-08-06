import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UserService } from './users.service';
import { CountryService } from './country.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  let countryService: CountryService;

  const mockUsers = [
    // ... mock user data here
  ];

  const mockCountryData = {
    
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [HttpClientTestingModule],
      providers: [UserService, CountryService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    countryService = TestBed.inject(CountryService);

    spyOn(userService, 'getUsers').and.returnValue(of(mockUsers));
    spyOn(countryService, 'getCountry').and.returnValue(of([mockCountryData]));

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users and user card data', () => {
    component.ngOnInit();
    expect(userService.getUsers).toHaveBeenCalled();
    expect(countryService.getCountry).toHaveBeenCalled();
    // You can add more expectations based on your component behavior
  });

  it('should unsubscribe onDestroy', () => {
    const ngOnDestroySpy = spyOn(component, 'ngOnDestroy').and.callThrough();
    const subscriptionSpy = jasmine.createSpyObj('subscription', [
      'unsubscribe',
    ]);

    // Replace 'users$' and any other subscriptions with the mock subscriptionSpy
    component.users$ = subscriptionSpy as any;

    component.ngOnDestroy();

    expect(ngOnDestroySpy).toHaveBeenCalled();
    expect(subscriptionSpy.unsubscribe).toHaveBeenCalled();
  });
});
