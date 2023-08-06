export interface UserCard {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  phone: string;
  dateOfBirth: string;
  address: {
    country: string;
    flag: string;
    city: string;
    street: string;
    currency: string;
  };
}
