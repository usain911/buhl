export interface DataObject {
    users: User[];
    total: number;
    limit:number
}

export interface User {
    id?: number
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    gender: string;
}
