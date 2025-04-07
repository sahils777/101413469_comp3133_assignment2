export interface LoginResponse {
    login: {
      token: string;
      user: {
        _id: string;
        email: string;
        role?: string;
      };
    };
  }

  export interface AuthToken {
    token: string;
    expiresIn: number;
  }

  export interface User {
    _id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: 'Admin' | 'Manager' | 'User';
    createdAt?: Date;
  }

  export interface LoginInput {
    email: string;
    password: string;
  }

  export interface SignupInput extends LoginInput {
    firstName: string;
    lastName: string;
  }
