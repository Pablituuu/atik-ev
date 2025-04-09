import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  turns as turnData,
  permissionsType as permissionTypeDate,
} from "@/data/mock-data";

interface ScheduleSidebarProps {
  selectedDate: Date;
  sleccionHour?: string;
  onClose: () => void;
}

export function ScheduleSidebar({
  selectedDate,
  sleccionHour,
  onClose,
}: ScheduleSidebarProps) {
  const formatedDate = selectedDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const titulo = `Agregar el ${formatedDate}${
    sleccionHour ? ` - ${sleccionHour}` : ""
  }`;

  return (
    <div className="w-80 border-l p-4 bg-white flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-sm">{titulo}</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6 overflow-y-auto flex-1 pr-2">
        <div>
          <h4 className="text-sm font-medium mb-2">Marcajes</h4>
          <div className="flex items-center gap-2 p-2 border rounded-md hover:bg-gray-50 cursor-pointer">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Registrar horario manual</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Asignar Turno</h4>
          <RadioGroup defaultValue={turnData[0]?.id}>
            {turnData.map((turn) => (
              <div key={turn.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={turn.id}
                  id={`sidebar-turn-${turn.id}`}
                />
                <Label
                  htmlFor={`sidebar-turn-${turn.id}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className={cn("w-3 h-3 rounded-full", turn.color)}></div>
                  <span>{turn.name}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">
            Agregar Licencia / Permission
          </h4>
          <RadioGroup defaultValue={permissionTypeDate[0]?.id}>
            {permissionTypeDate.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={permission.id}
                  id={`sidebar-permission-${permission.id}`}
                />
                <Label
                  htmlFor={`sidebar-permission-${permission.id}`}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full",
                      permission.color.split(" ")[0]
                    )}
                  ></div>
                  <span className="text-xs">{permission.name}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t">
        <Button className="w-full bg-purple-600 hover:bg-purple-700">
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}
