"use client"

import { useState, useRef, useEffect } from "react"
import { MapPinIcon, PencilIcon, LoaderCircleIcon } from "lucide-react"
import { getPlacesSuggestions, type PlaceSuggestion } from "@/actions/places"

const LOCATION_REGEX = /^[a-zA-Z\s,\-'\.]+$/

interface LocationFieldProps {
  value: string
  onSave: (val: string) => Promise<boolean>
  onError: (msg: string) => void
}

export function LocationField({ value, onSave, onError }: LocationFieldProps) {
  const [editing, setEditing] = useState(false)
  const [current, setCurrent] = useState(value)
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sync local state when the server/parent value changes
  useEffect(() => {
    setCurrent(value)
  }, [value])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
        setEditing(false)
        setCurrent(value) // Revert to confirmed value
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [value])

  async function handleChange(val: string) {
    setCurrent(val)
    setOpen(false)
    setSuggestions([])

    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (val.trim().length < 2) return

    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      const result = await getPlacesSuggestions(val)
      setLoading(false)
      if (result.success && result.suggestions.length > 0) {
        setSuggestions(result.suggestions)
        setOpen(true)
      }
    }, 350)
  }

  async function handleSelect(suggestion: PlaceSuggestion) {
    setCurrent(suggestion.description)
    setOpen(false)
    setSuggestions([])
    setEditing(false)

    if (suggestion.description === value) return

    const success = await onSave(suggestion.description)
    if (!success) {
      setCurrent(value) // Revert on failure
    }
  }

  async function handleSave() {
    const cleaned = current.trim()
    setOpen(false)

    if (!cleaned) {
      setEditing(false)
      if (cleaned === value) return

      const success = await onSave("")
      if (!success) setCurrent(value) // Revert on failure
      return
    }

    if (!LOCATION_REGEX.test(cleaned)) {
      // Pass the error up to the parent instead of handling it locally
      onError("Only letters, spaces, commas, and hyphens are allowed.")
      return
    }

    setEditing(false)
    if (cleaned === value) return

    const success = await onSave(cleaned)
    if (!success) {
      setCurrent(value) // Revert on failure
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-1 py-3 border-b border-muted/40 last:border-0"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-muted-foreground uppercase tracking-wide w-28 shrink-0">
          Location
        </span>

        {editing ? (
          <div className="flex flex-1 items-center gap-2">
            <input
              autoFocus
              value={current}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave()
                if (e.key === "Escape") {
                  setCurrent(value) // Revert on escape
                  setOpen(false)
                  setEditing(false)
                }
              }}
              className="flex-1 text-sm bg-transparent border-0 p-0 focus-visible:ring-0 focus-visible:outline-none text-foreground placeholder:text-muted-foreground/50"
              placeholder="e.g. Mumbai, India"
            />
            {loading && (
              <LoaderCircleIcon className="size-3 shrink-0 animate-spin text-muted-foreground/50" />
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="cursor-text group flex flex-1 items-center justify-between gap-4 rounded-sm outline-none text-left"
            aria-label="Edit Location"
          >
            <span className="text-sm text-muted-foreground flex-1">
              {current || (
                <span className="text-muted-foreground/40">
                  e.g. Mumbai, India
                </span>
              )}
            </span>
            <PencilIcon
              className="size-3 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground opacity-30"
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-md border border-muted/60 bg-popover shadow-md overflow-hidden">
          {suggestions.map((s) => (
            <button
              key={s.placeId}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(s)}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-left text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-colors"
            >
              <MapPinIcon className="size-3 shrink-0 opacity-50" />
              {s.description}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
