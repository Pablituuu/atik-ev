import { CalendarIcon, Search, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  period: string;
  onPeriodChange: (value: string) => void;
  date: Date;
  onDateChange: (date: Date) => void;
  onTodayClick: () => void;
}

export function Header({
  search,
  onSearchChange,
  period,
  onPeriodChange,
  date,
  onDateChange,
  onTodayClick,
}: HeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="relative w-96">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por"
          className="pl-8 pr-4"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Button
          variant="link"
          size="sm"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xs text-blue-600"
        >
          Búsqueda avanzada <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Periodo:</span>
          <Select value={period} onValueChange={onPeriodChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diario">Diario</SelectItem>
              <SelectItem value="semanal">Semanal</SelectItem>
              <SelectItem value="mensual">Mensual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Fecha:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-36 justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "P", { locale: es }) : "Seleccionar date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && onDateChange(date)}
                initialFocus
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          variant="default"
          className="bg-purple-600 hover:bg-purple-700"
          onClick={onTodayClick}
        >
          Hoy
        </Button>

        <Button variant="outline">Turnos de trabajo</Button>
        <Button variant="outline">Licencias y permissions</Button>
      </div>
    </div>
  );
}
