"use client"

import { useState } from "react"
import { format, parseISO, isValid } from "date-fns"
import { CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

interface BirthdayFieldProps {
  value: string // "YYYY-MM-DD" or ""
  onSave: (val: string) => Promise<void>
}

export function BirthdayField({ value, onSave }: BirthdayFieldProps) {
  const [open, setOpen] = useState(false)

  const parsed = value ? parseISO(value) : undefined
  const selected = parsed && isValid(parsed) ? parsed : undefined

  async function handleSelect(day: Date | undefined) {
    setOpen(false)
    if (!day) return
    const iso = format(day, "yyyy-MM-dd")
    if (iso === value) return
    await onSave(iso)
  }

  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-muted/40 last:border-0">
      <span className="text-xs text-muted-foreground uppercase tracking-wide w-28 shrink-0">
        Date of Birth
      </span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="cursor-pointer group flex flex-1 items-center justify-between gap-4 rounded-sm outline-none text-left"
            aria-label="Edit Date of Birth"
          >
            <span className="text-sm text-muted-foreground flex-1">
              {selected ? (
                format(selected, "MMMM d, yyyy")
              ) : (
                <span className="text-muted-foreground/40">Pick a date</span>
              )}
            </span>
            <CalendarIcon
              className="size-3 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground opacity-30"
              aria-hidden="true"
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            defaultMonth={selected ?? new Date(1990, 0)}
            captionLayout="dropdown"
            fromYear={1900}
            toYear={new Date().getFullYear()}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
