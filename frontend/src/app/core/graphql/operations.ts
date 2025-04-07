import { gql } from 'apollo-angular';

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      _id
      firstName
      lastName
      email
      department
      position
      salary
      profilePicture
    }
  }
`;

export const SEARCH_EMPLOYEES = gql`
  query SearchEmployees($department: String, $position: String) {
    searchEmployees(department: $department, position: $position) {
      _id
      firstName
      lastName
      email
      department
      position
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      _id
      firstName
      lastName
      email
      department
      position
      salary
      profilePicture
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $first_name: String!,
    $last_name: String!,
    $email: String!,
    $gender: String!,
    $designation: String!,
    $salary: Float!,
    $department: String!
  ) {
    addEmployee(
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      gender: $gender,
      designation: $designation,
      salary: $salary,
      department: $department
    ) {
      id
      first_name
      last_name
      email
      department
      designation
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      _id
      firstName
      lastName
      email
      department
      position
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      _id
    }
  }
`;

export const UPLOAD_PROFILE_PICTURE = gql`
  mutation UploadProfilePicture($id: ID!, $file: Upload!) {
    uploadProfilePicture(id: $id, file: $file)
  }
`;
