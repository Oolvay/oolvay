import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LockIcon } from "lucide-react"

interface NotificationChannelRowProps {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  lockedReason?: string
}

export function NotificationChannelRow({
  label,
  checked,
  onCheckedChange,
  disabled,
  lockedReason,
}: NotificationChannelRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b last:border-0">
      <span className="text-xs text-muted-foreground uppercase tracking-wide w-28 shrink-0">
        {label}
      </span>
      <div className="flex-1" />
      <div className="shrink-0 flex items-center gap-2">
        {lockedReason && (
          <Tooltip>
            <TooltipTrigger asChild>
              <LockIcon className="h-3.5 w-3.5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>{lockedReason}</TooltipContent>
          </Tooltip>
        )}
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className="cursor-pointer"
        />
      </div>
    </div>
  )
}
