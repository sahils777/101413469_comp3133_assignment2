const Employee = require("../models/Employee");

const employeeResolvers = {
  Query: {
    employees: async (_, __, context) => {
      if (!context.user) throw new Error("Access Denied");
      return Employee.find();
    },
    employee: async (_, { id }, context) => {
      if (!context.user) throw new Error("Access Denied");
      return Employee.findById(id);
    },
  },
  Mutation: {
    addEmployee: async (_, args, context) => {
      if (!context.user) throw new Error("Access Denied");
      const newEmp = new Employee(args);
      return newEmp.save();
    },
    updateEmployee: async (_, { id, ...update }, context) => {
      if (!context.user) throw new Error("Access Denied");
      return Employee.findByIdAndUpdate(id, update, { new: true });
    },
    deleteEmployee: async (_, { id }, context) => {
      if (!context.user) throw new Error("Access Denied");
      return Employee.findByIdAndDelete(id);
    },
  },
};

module.exports = employeeResolvers;
