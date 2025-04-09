import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import type { Employee, Permission } from "@/types";
import { hours, permissionsType } from "@/data/mock-data";
import { X } from "lucide-react";
import { useState } from "react";

interface ScheduleGridProps {
  filterEmployees: Employee[];
  permissionsDate: Permission[];
  onDeletePermission: (permisoId: number) => void;
  onPermisoSelect: (employeeId: number, hour: string, tipoId: string) => void;
}

function ContextMenu({
  x,
  y,
  onSelect,
  onClose,
}: {
  x: number;
  y: number;
  onSelect: (tipoId: string) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[200px]"
      style={{ left: x, top: y }}
    >
      {permissionsType.map((type) => (
        <button
          key={type.id}
          className={cn(
            "w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2",
            "text-sm focus:outline-none focus:bg-gray-100"
          )}
          onClick={() => {
            onSelect(type.id);
            onClose();
          }}
        >
          <div
            className={cn("w-3 h-3 rounded-full", type.color.split(" ")[0])}
          />
          <span>{type.name}</span>
        </button>
      ))}
    </div>
  );
}

function DroppableCell({
  employeeId,
  hour,
  children,
  onPermisoSelect,
}: {
  employeeId: number;
  hour: string;
  children?: React.ReactNode;
  onPermisoSelect: (employeeId: number, hour: string, tipoId: string) => void;
}) {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const { setNodeRef, isOver } = useDroppable({
    id: `cell-${employeeId}-${hour.replace(":", "")}`,
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
        ref={setNodeRef}
        onContextMenu={handleContextMenu}
        className={cn(
          "border-r last:border-r-0 relative h-16 cursor-context-menu",
          isOver && "bg-purple-100 border-purple-300 border-dashed"
        )}
      >
        {children}
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onSelect={(tipoId) => onPermisoSelect(employeeId, hour, tipoId)}
          onClose={() => setContextMenu(null)}
        />
      )}
    </>
  );
}

export function ScheduleGrid({
  filterEmployees,
  permissionsDate,
  onDeletePermission,
  onPermisoSelect,
}: ScheduleGridProps) {
  const calculateWidth = (permission: Permission) => {
    const startTime = parseInt(permission.start.split(":")[0]);
    const endTime = parseInt(permission.end.split(":")[0]);
    return Math.max(1, endTime - startTime);
  };

  const getPermissionClass = (type: string): string => {
    const permissionType = permissionsType.find((t) => t.id === type);
    if (!permissionType) return "";
    return permissionType.color;
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-w-[1200px]">
        <div className="grid grid-cols-[150px_150px_repeat(14,minmax(80px,1fr))] border-b sticky top-0 bg-white z-10">
          <div className="p-2 font-medium text-sm border-r">Código</div>
          <div className="p-2 font-medium text-sm border-r">Employee</div>
          {hours.map((hour) => (
            <div
              key={hour}
              className="p-2 font-medium text-sm text-center border-r"
            >
              {hour}
            </div>
          ))}
        </div>

        {filterEmployees.map((employee) => (
          <div
            key={employee.id}
            className="grid grid-cols-[150px_150px_repeat(14,minmax(80px,1fr))] border-b"
          >
            <div className="p-2 text-sm border-r">{employee.code}</div>
            <div className="p-2 text-sm border-r">
              <div className="font-medium truncate">{employee.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {employee.position}
              </div>
            </div>

            {hours.map((hour) => {
              const permissionInHour = permissionsDate.find(
                (p) => p.employeeId === employee.id && p.start === hour
              );

              return (
                <DroppableCell
                  key={`${employee.id}-${hour}`}
                  employeeId={employee.id}
                  hour={hour}
                  onPermisoSelect={onPermisoSelect}
                >
                  {permissionInHour && (
                    <div
                      className={cn(
                        "absolute top-1 left-0 right-1 bottom-1 rounded px-2 py-1 group",
                        getPermissionClass(permissionInHour.type)
                      )}
                      style={{
                        gridColumn: `span ${calculateWidth(permissionInHour)}`,
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-medium truncate block">
                            {permissionInHour.type}
                          </span>
                          <span className="text-xs opacity-75">
                            {permissionInHour.start} - {permissionInHour.end}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            onDeletePermission(permissionInHour.id)
                          }
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/10 rounded"
                          title="Eliminar permission"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </DroppableCell>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
