import type { PermissionType, Turno, Employee, Permission } from "../types";

export const markingStates = [
    { name: "A tiempo", color: "bg-green-500" },
    { name: "Tardanza", color: "bg-orange-500" },
    { name: "Salida anticipada", color: "bg-yellow-500" },
    { name: "Ausencia", color: "bg-red-500" },
    { name: "Marcaje de entrada", color: "bg-green-700" },
    { name: "Marcaje de salida", color: "bg-blue-500" },
];

export const permissionsType: PermissionType[] = [
    { id: "descanso", name: "DESCANSO", color: "bg-red-200 text-red-800" },
    {
        id: "maternidad",
        name: "LICENCIA POR MATERNIDAD",
        color: "bg-orange-200 text-orange-800",
    },
    {
        id: "tramite",
        name: "LICENCIA POR TRÁMITE ESPECIAL",
        color: "bg-blue-200 text-blue-800",
    },
    {
        id: "estudios",
        name: "ESTUDIOS",
        color: "bg-purple-200 text-purple-800",
    },
    { id: "legal", name: "TRÁMITE LEGAL", color: "bg-gray-200 text-gray-800" },
    {
        id: "nacimiento",
        name: "NACIMIENTO DE UN HIJO",
        color: "bg-pink-200 text-pink-800",
    },
    {
        id: "matrimonio",
        name: "LICENCIA POR MATRIMONIO",
        color: "bg-yellow-200 text-yellow-800",
    },
];

export const turns: Turno[] = [
    { id: "a", name: "A", color: "bg-green-500" },
    { id: "m", name: "M", color: "bg-orange-500" },
    { id: "n", name: "N", color: "bg-purple-500" },
    { id: "s", name: "S", color: "bg-pink-500" },
    { id: "t", name: "T", color: "bg-teal-500" },
];

export const employees: Employee[] = [
    {
        id: 1,
        code: "2001",
        name: "Ana María Santos",
        position: "Camarera",
        area: "Habitaciones",
        turn: "a",
    },
    {
        id: 2,
        code: "2002",
        name: "Carmen Rodríguez",
        position: "Recepcionista",
        area: "Front Desk",
        turn: "m",
    },
    {
        id: 3,
        code: "2003",
        name: "Carolina Martínez",
        position: "Asistente de Eventos",
        area: "Eventos",
        turn: "m",
    },
    {
        id: 4,
        code: "2004",
        name: "Daniel Herrera",
        position: "Seguridad",
        area: "Otros",
        turn: "n",
    },
    {
        id: 5,
        code: "2005",
        name: "Fernando Ruiz Medina",
        position: "Bartender",
        area: "Alimentos y Bebidas",
        turn: "a",
    },
    {
        id: 6,
        code: "2006",
        name: "Gabriela María Pérez Sánchez",
        position: "Recepcionista",
        area: "Habitaciones",
        turn: "s",
    },
    {
        id: 7,
        code: "2007",
        name: "Héctor Durán",
        position: "Chef de Partida",
        area: "Alimentos y Bebidas",
        turn: "m",
    },
    {
        id: 8,
        code: "2008",
        name: "Isabel Morales",
        position: "Recepcionista",
        area: "Habitaciones",
        turn: "t",
    },
    {
        id: 9,
        code: "2009",
        name: "Javier Castillo",
        position: "Asistente de Cocina",
        area: "Alimentos y Bebidas",
        turn: "a",
    },
    {
        id: 10,
        code: "2010",
        name: "José Carlos Ramírez",
        position: "Mantenimiento",
        area: "Mantenimiento",
        turn: "n",
    },
];

export const examplePermissions: Permission[] = [
    {
        id: 1,
        employeeId: 1,
        type: "estudios",
        start: "08:00",
        end: "16:00",
        date: "2025-02-14",
    },
    {
        id: 2,
        employeeId: 2,
        type: "matrimonio",
        start: "06:00",
        end: "14:00",
        date: "2025-02-14",
    },
    {
        id: 3,
        employeeId: 3,
        type: "tramite",
        start: "08:00",
        end: "16:00",
        date: "2025-02-14",
    },
    {
        id: 4,
        employeeId: 4,
        type: "descanso",
        start: "06:00",
        end: "15:00",
        date: "2025-02-14",
    },
    {
        id: 5,
        employeeId: 6,
        type: "maternidad",
        start: "08:00",
        end: "16:00",
        date: "2025-02-14",
    },
    {
        id: 6,
        employeeId: 8,
        type: "legal",
        start: "09:00",
        end: "17:00",
        date: "2025-02-14",
    },
    {
        id: 7,
        employeeId: 8,
        type: "nacimiento",
        start: "06:00",
        end: "14:00",
        date: "2025-02-14",
    },
];

export const hours = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
];
