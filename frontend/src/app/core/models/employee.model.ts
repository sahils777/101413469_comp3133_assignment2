export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  salary: number;
  department: Department;
  position: Position;
  profilePicture?: string;
}

export type Department =
  | 'HR'
  | 'IT'
  | 'Finance'
  | 'Marketing'
  | 'Operations'
  | 'Sales'
  | (string & {});

export type Position =
  | 'Manager'
  | 'Developer'
  | 'Designer'
  | 'Analyst'
  | 'Director'
  | (string & {});

export interface EmployeeInput extends Omit<Employee, '_id'> {}
export interface EmployeeUpdate extends Partial<Omit<EmployeeInput, 'email'>> {
  _id: string;
}
