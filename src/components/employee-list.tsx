import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Employee } from "@/types";

interface EmployeeListProps {
  employees: Employee[];
  selectedEmployees: number[];
  onToggleSeleccion: (id: number) => void;
  allEmployees: number;
}

export function EmployeeList({
  employees,
  selectedEmployees,
  onToggleSeleccion,
  allEmployees,
}: EmployeeListProps) {
  return (
    <div className="w-64 border-r bg-purple-600 text-white flex flex-col">
      <div className="p-3 font-semibold">Empleados</div>
      <ScrollArea className="flex-1">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className={cn(
              "flex items-center justify-between p-3 hover:bg-purple-700 cursor-pointer border-b border-purple-500",
              selectedEmployees.includes(employee.id) && "bg-purple-700"
            )}
            onClick={() => onToggleSeleccion(employee.id)}
          >
            <div>
              <div className="font-medium">{employee.name}</div>
              <div className="text-xs text-purple-200">• {employee.area}</div>
              <div className="text-xs text-purple-200">{employee.position}</div>
            </div>
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white flex-shrink-0">
              {selectedEmployees.includes(employee.id) && (
                <div className="w-4 h-4 rounded-full bg-white"></div>
              )}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-3 text-xs border-t border-purple-500 mt-auto">
        Total: {allEmployees} | Seleccionados: {selectedEmployees.length}
      </div>
    </div>
  );
}
