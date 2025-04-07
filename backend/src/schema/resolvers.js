const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");

require("dotenv").config();

const resolvers = {
  Query: {
    users: async (_, __, { user }) => {
      if (!user) throw new Error("Access Denied");
      return await User.find();
    },
    user: async (_, { id }, { user }) => {
      if (!user) throw new Error("Access Denied");
      return await User.findById(id);
    },
    employees: async (_, __, { user }) => {
      if (!user) throw new Error("Access Denied");
      return await Employee.find();
    },
    employee: async (_, { id }, { user }) => {
      if (!user) throw new Error("Access Denied");
      return await Employee.findById(id);
    },
    searchEmployees: async (_, { department, designation }, { user }) => {
      if (!user) throw new Error("Access Denied");
      const query = {};
      if (department) query.department = department;
      if (designation) query.designation = designation;
      return await Employee.find(query);
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid password");

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return { token, user };
    },

    addEmployee: async (_, args, { user }) => {
      if (!user) throw new Error("Access Denied");
      const newEmployee = new Employee(args);
      return await newEmployee.save();
    },

    updateEmployee: async (_, { id, ...rest }, { user }) => {
      if (!user) throw new Error("Access Denied");
      return await Employee.findByIdAndUpdate(id, rest, { new: true });
    },

    deleteEmployee: async (_, { id }, { user }) => {
      if (!user) throw new Error("Access Denied");
      return await Employee.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
