export interface PermissionType {
    id: string;
    name: string;
    color: string;
}

export interface Turno {
    id: string;
    name: string;
    color: string;
}

export interface Employee {
    id: number;
    code: string;
    name: string;
    position: string;
    area: string;
    turn: string;
}

export interface Permission {
    id: number;
    employeeId: number;
    type: string;
    start: string;
    end: string;
    date: string;
}
