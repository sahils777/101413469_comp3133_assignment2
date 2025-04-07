import { gql } from 'apollo-angular';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password)
  }
`;

export const ADD_EMPLOYEE_MUTATION = gql`
  mutation AddEmployee(
    $first_name: String!
    $last_name: String!
    $email: String!
    $gender: String!
    $designation: String!
    $salary: Float!
    $department: String!
    $employee_photo: String
  ) {
    addEmployee(
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      department: $department
      employee_photo: $employee_photo
    ) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      department
      employee_photo
    }
  }
`;


export const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UpdateEmployee(
    $id: ID!
    $first_name: String
    $last_name: String
    $email: String
    $gender: String
    $designation: String
    $salary: Float
    $department: String
    $employee_photo: String
  ) {
    updateEmployee(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      department: $department
      employee_photo: $employee_photo
    ) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      department
      employee_photo
    }
  }
`;


export const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      first_name
      last_name
    }
  }
`;
