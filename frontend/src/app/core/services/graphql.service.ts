import { Injectable } from '@angular/core';
import { Apollo, gql, TypedDocumentNode } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { OperationVariables } from '@apollo/client/core';

@Injectable({ providedIn: 'root' })
export class GraphqlService {
  constructor(private apollo: Apollo) {
    if (!apollo) {
      throw new Error('Apollo service is not available');
    }
  }

  query<T = any, V extends OperationVariables = OperationVariables>(
    query: DocumentNode | TypedDocumentNode<T, V>,
    variables?: V,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.apollo.query<T, V>({
      query,
      variables,
      context: headers ? { headers } : undefined,
      fetchPolicy: 'network-only'
    }).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('GraphQL query error:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  mutate<T = any, V extends OperationVariables = OperationVariables>(
    mutation: DocumentNode | TypedDocumentNode<T, V>,
    variables?: V,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.apollo.mutate<T, V>({
      mutation,
      variables,
      context: headers ? { headers } : undefined
    }).pipe(
      map(response => response.data as T)
    );
  }

  parseQuery(query: string): DocumentNode {
    return gql(query);
  }
}
