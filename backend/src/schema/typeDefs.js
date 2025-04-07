const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String
  }

  type AuthPayload {
    token: String!
    user: User
  }

  type Employee {
    id: ID!
    first_name: String
    last_name: String
    email: String
    gender: String
    designation: String
    salary: Int
    date_of_joining: String
    department: String
    profile_image: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    employees: [Employee]
    employee(id: ID!): Employee
    searchEmployees(department: String, designation: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload

    addEmployee(
      first_name: String
      last_name: String
      email: String
      gender: String
      designation: String
      salary: Int
      date_of_joining: String
      department: String
      profile_image: String
    ): Employee

    updateEmployee(
      id: ID!
      first_name: String
      last_name: String
      email: String
      gender: String
      designation: String
      salary: Int
      date_of_joining: String
      department: String
      profile_image: String
    ): Employee

    deleteEmployee(id: ID!): Employee
  }
`;

module.exports = typeDefs;
