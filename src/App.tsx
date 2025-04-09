import { useState, useMemo } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  employees as allEmployees,
  examplePermissions,
  turns,
  permissionsType,
  hours,
} from "./data/mock-data";
import { Header } from "./components/header";
import { ScheduleGrid } from "./components/schedule-grid";
import { ScheduleSidebar } from "./components/schedule-sidebar";
import { Footer } from "./components/footer";
import { Permission } from "./types";
import { EmployeeList } from "./components/employee-list";

export default function PermisosInasistenciaApp() {
  const [date, setDate] = useState<Date>(new Date());
  const [period, setPeriod] = useState("diario");
  const [search, setSearch] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [permissions, setPermissions] =
    useState<Permission[]>(examplePermissions);

  const filterEmployees = useMemo(() => {
    const searchLower = search.toLowerCase();
    if (!searchLower) return allEmployees;
    return allEmployees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchLower) ||
        emp.code.includes(search) ||
        emp.area.toLowerCase().includes(searchLower) ||
        emp.position.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const permissionsDate = useMemo(() => {
    const formatedDate = format(date, "yyyy-MM-dd");
    return permissions.filter((permission) => permission.date === formatedDate);
  }, [date, permissions]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
  };

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  const handleTodayClick = () => {
    setDate(new Date());
  };

  const handleToggleEmployeeSelection = (id: number) => {
    setSelectedEmployees((prevSelection) =>
      prevSelection.includes(id)
        ? prevSelection.filter((empId) => empId !== id)
        : [...prevSelection, id]
    );
  };

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active?.data.current) return;

    const isPermisoType = active.id.toString().startsWith("permisoType-");
    const isGridCell = over.id.toString().startsWith("cell-");

    if (isPermisoType && isGridCell) {
      const permissionType = active.data.current.type as string;
      const [, empleadoIdStr, horaStr] = over.id.toString().split("-");
      const employeeId = parseInt(empleadoIdStr, 10);
      const startTime = `${horaStr.slice(0, 2)}:${horaStr.slice(2, 4)}`;

      if (!permissionType || isNaN(employeeId) || !startTime) {
        console.error("Datos inválidos para crear permission");
        return;
      }

      const indexStartTime = hours.indexOf(startTime);
      if (indexStartTime === -1) return;

      const endTime = hours[indexStartTime + 1] || startTime;
      const currentDate = format(date, "yyyy-MM-dd");

      const existingPermission = permissions.find(
        (p) =>
          p.employeeId === employeeId &&
          p.date === currentDate &&
          p.start === startTime
      );

      if (existingPermission) {
        // Si existe un permission, actualizamos su type
        setPermissions((currentPermissions) =>
          currentPermissions.map((p) =>
            p.id === existingPermission.id
              ? {
                  ...p,
                  type: permissionType, // Actualizamos solo el type, manteniendo el resto igual
                }
              : p
          )
        );
      } else {
        // Si no existe un permission, creamos uno nuevo
        const newPermission: Permission = {
          id: Date.now(),
          employeeId,
          type: permissionType,
          start: startTime,
          end: endTime,
          date: currentDate,
        };

        setPermissions((currentPermissions) => [
          ...currentPermissions,
          newPermission,
        ]);
      }
    }
  };

  const handlePermisoSelect = (
    employeeId: number,
    hour: string,
    tipoId: string
  ) => {
    const startTime = hour;
    const indexStartTime = hours.indexOf(startTime);
    if (indexStartTime === -1) return;

    const endTime = hours[indexStartTime + 1] || startTime;
    const currentDate = format(date, "yyyy-MM-dd");

    const existingPermission = permissions.find(
      (p) =>
        p.employeeId === employeeId &&
        p.date === currentDate &&
        p.start === startTime
    );

    if (existingPermission) {
      setPermissions((currentPermissions) =>
        currentPermissions.map((p) =>
          p.id === existingPermission.id
            ? {
                ...p,
                type: tipoId,
              }
            : p
        )
      );
    } else {
      const newPermission: Permission = {
        id: Date.now(),
        employeeId,
        type: tipoId,
        start: startTime,
        end: endTime,
        date: currentDate,
      };

      setPermissions((currentPermissions) => [
        ...currentPermissions,
        newPermission,
      ]);
    }
  };

  const handleDeletePermission = (permisoId: number) => {
    setPermissions((permissions) =>
      permissions.filter((p) => p.id !== permisoId)
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen bg-gray-100">
        <Header
          search={search}
          onSearchChange={handleSearchChange}
          period={period}
          onPeriodChange={handlePeriodChange}
          date={date}
          onDateChange={handleDateChange}
          onTodayClick={handleTodayClick}
        />

        <div className="flex flex-1 overflow-hidden gap-5">
          <EmployeeList
            employees={filterEmployees}
            selectedEmployees={selectedEmployees}
            onToggleSeleccion={handleToggleEmployeeSelection}
            allEmployees={allEmployees.length}
          />

          <ScheduleGrid
            filterEmployees={filterEmployees}
            permissionsDate={permissionsDate}
            onDeletePermission={handleDeletePermission}
            onPermisoSelect={handlePermisoSelect}
          />

          {showSidebar && (
            <ScheduleSidebar
              selectedDate={date}
              onClose={handleToggleSidebar}
            />
          )}
        </div>

        <Footer turns={turns} permissionsType={permissionsType} />

        <Button
          className="fixed bottom-20 right-4 bg-purple-600 hover:bg-purple-700 rounded-full shadow-lg z-20"
          size="icon"
          onClick={handleToggleSidebar}
          title={showSidebar ? "Cerrar panel" : "Abrir panel de acciones"}
        >
          {showSidebar ? (
            <X className="h-5 w-5" />
          ) : (
            <CalendarIcon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </DndContext>
  );
}
