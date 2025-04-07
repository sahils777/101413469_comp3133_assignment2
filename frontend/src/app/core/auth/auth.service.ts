import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';
import { Observable, map, catchError, of } from 'rxjs';
import { gql } from 'apollo-angular';

interface LoginResponse {
  login: {
    token: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  private readonly LOGIN_QUERY = gql`
    query Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `;

  private readonly SIGNUP_MUTATION = gql`
    mutation Signup($username: String!, $email: String!, $password: String!) {
      signup(username: $username, email: $email, password: $password)
    }
  `;

  constructor(
    private graphql: GraphqlService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<boolean> {
    return this.graphql.query<LoginResponse>(
      this.LOGIN_QUERY,
      { email, password }
    ).pipe(
      map(result => {
        const token = result.login?.token;
        if (!token) throw new Error('Invalid login response');
        this.setToken(token);
        return true;
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return of(false);
      })
    );
  }

  signup(user: any): Observable<any> {
    const { firstName, lastName, email, password } = user;
    const username = `${firstName} ${lastName}`.trim();
    return this.graphql.mutate(
      this.SIGNUP_MUTATION,
      { username, email, password }
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
