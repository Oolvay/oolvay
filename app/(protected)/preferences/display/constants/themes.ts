import { MODES } from "@/db/types/modes"

export const THEMES = [
  {
    value: MODES.LIGHT,
    label: "Light",
    preview: {
      bg: "bg-gray-50",
      sidebar: "bg-gray-200",
      bar: "bg-gray-300",
    },
  },
  {
    value: MODES.DARK,
    label: "Dark",
    preview: {
      bg: "bg-gray-900",
      sidebar: "bg-gray-950",
      bar: "bg-gray-700",
    },
  },
  {
    value: MODES.SYSTEM,
    label: "System",
    preview: {
      leftBg: "bg-gray-50",
      rightBg: "bg-gray-900",
      leftSidebar: "bg-gray-200",
      rightSidebar: "bg-gray-950",
      leftBar: "bg-gray-300",
      rightBar: "bg-gray-700",
    },
  },
] as const

export type Theme = (typeof THEMES)[number]
