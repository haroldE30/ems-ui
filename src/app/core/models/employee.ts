import { Department } from './department';
import { Address } from './address';
import { Position } from './position';

export class Employee {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    mobile: string;
    email: string;
    gender: string;
    maritalStatus: string;
    employmentStatus: string;
    employedDate: string;
    street: string;
    city: string;
    zipCode: number;
    country: string;
    position: Position;
    positionId: number;
    department: Department;
    departmentId: number;
}
