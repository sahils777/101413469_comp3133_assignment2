const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt
  } = require("graphql");

  const userResolvers = require("../resolvers/userResolvers");
  const employeeResolvers = require("../resolvers/employeeResolvers");

  const UserType = require("./types/userType");
  const EmployeeType = require("./types/employeeType");

  // Root Query
  const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
      users: {
        type: new GraphQLList(UserType),
        resolve: userResolvers.Query.users
      },
      user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve: userResolvers.Query.user
      },
      employees: {
        type: new GraphQLList(EmployeeType),
        resolve: employeeResolvers.Query.employees
      },
      employee: {
        type: EmployeeType,
        args: { id: { type: GraphQLID } },
        resolve: employeeResolvers.Query.employee
      }
    }
  });

  // Mutation
  const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      signup: {
        type: UserType,
        args: {
          username: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString }
        },
        resolve: userResolvers.Mutation.signup
      },
      login: {
        type: UserType,
        args: {
          email: { type: GraphQLString },
          password: { type: GraphQLString }
        },
        resolve: userResolvers.Mutation.login
      },
      addEmployee: {
        type: EmployeeType,
        args: {
          first_name: { type: GraphQLString },
          last_name: { type: GraphQLString },
          email: { type: GraphQLString },
          gender: { type: GraphQLString },
          designation: { type: GraphQLString },
          salary: { type: GraphQLInt },
          date_of_joining: { type: GraphQLString },
          department: { type: GraphQLString }
        },
        resolve: employeeResolvers.Mutation.addEmployee
      },
      updateEmployee: {
        type: EmployeeType,
        args: {
          id: { type: GraphQLID },
          first_name: { type: GraphQLString },
          last_name: { type: GraphQLString },
          email: { type: GraphQLString },
          gender: { type: GraphQLString },
          designation: { type: GraphQLString },
          salary: { type: GraphQLInt },
          date_of_joining: { type: GraphQLString },
          department: { type: GraphQLString }
        },
        resolve: employeeResolvers.Mutation.updateEmployee
      },
      deleteEmployee: {
        type: EmployeeType,
        args: {
          id: { type: GraphQLID }
        },
        resolve: employeeResolvers.Mutation.deleteEmployee
      }
    }
  });

  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
  });
