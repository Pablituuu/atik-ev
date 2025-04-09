import { useDraggable } from "@dnd-kit/core";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Turno, PermissionType } from "@/types";
import { markingStates } from "@/data/mock-data";

interface FooterProps {
  turns: Turno[];
  permissionsType: PermissionType[];
}

function DraggablePermisoBadge({ permission }: { permission: PermissionType }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `permisoType-${permission.id}`,
      data: {
        type: permission.id,
        name: permission.name,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Badge
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      variant="outline"
      className={cn(
        "rounded-sm border-none px-1.5 py-0.5 text-xs cursor-grab active:cursor-grabbing",
        permission.color,
        isDragging && "opacity-50 shadow-lg z-50"
      )}
    >
      {permission.name}
    </Badge>
  );
}

export function Footer({ turns, permissionsType }: FooterProps) {
  return (
    <div className="border-t p-4 bg-gray-50">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium shrink-0">Turnos:</span>
          <div className="flex gap-1 flex-wrap">
            {turns.map((turn) => (
              <Badge
                key={turn.id}
                variant="outline"
                className={cn(
                  "rounded-sm border-none px-1.5 py-0.5 text-xs",
                  turn.color,
                  "text-white"
                )}
              >
                {turn.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium shrink-0">
            Licencias/Permisos (Arrastra para asignar):
          </span>
          <div className="flex gap-1 flex-wrap">
            {permissionsType.map((permission) => (
              <DraggablePermisoBadge
                key={permission.id}
                permission={permission}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium shrink-0">Estado Marcajes:</span>
          <div className="flex items-center gap-x-3 gap-y-1 flex-wrap">
            {markingStates.map((estado) => (
              <div key={estado.name} className="flex items-center gap-1">
                <div
                  className={cn("w-2.5 h-2.5 rounded-full", estado.color)}
                ></div>
                <span className="text-xs text-muted-foreground">
                  {estado.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
