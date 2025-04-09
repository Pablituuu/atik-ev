import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { PermissionType } from "@/types";

interface ContextMenuProps {
  x: number;
  y: number;
  permissionsType: PermissionType[];
  onSelect: (tipoId: string) => void;
  onClose: () => void;
}

export function ContextMenu({
  x,
  y,
  permissionsType,
  onSelect,
  onClose,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-[160px] bg-white rounded-md shadow-lg border border-gray-200 py-1"
      style={{
        left: x,
        top: y,
      }}
    >
      {permissionsType.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelect(type.id)}
          className={cn(
            "w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2",
            "focus:outline-none focus:bg-gray-100"
          )}
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
