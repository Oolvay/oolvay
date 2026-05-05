"use server"

import { env } from "@/env"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

export type PlaceSuggestion = {
  placeId: string
  description: string
}

type GetPlacesResult =
  | { success: true; suggestions: PlaceSuggestion[] }
  | { success: false; error: string }

// Define the shape of the incoming Google API payload
type GoogleApiSuggestion = {
  placePrediction?: {
    placeId?: string
    text?: {
      text?: string
    }
  }
}

export async function getPlacesSuggestions(
  input: string
): Promise<GetPlacesResult> {
  try {
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session?.user) {
      return { success: false, error: "Unauthorized" }
    }

    if (!input || input.trim().length < 2) {
      return { success: true, suggestions: [] }
    }

    const res = await fetch(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": env.GOOGLE_PLACES_API_KEY!,
        },
        body: JSON.stringify({
          input: input.trim(),
          includedPrimaryTypes: [
            "locality",
            "administrative_area_level_1",
            "country",
          ],
        }),
      }
    )

    if (!res.ok) {
      return { success: false, error: "Places API request failed." }
    }

    const data = await res.json()

    // Replace 'any' with our new strict type
    const suggestions: PlaceSuggestion[] = (data.suggestions ?? []).map(
      (s: GoogleApiSuggestion) => ({
        placeId: s.placePrediction?.placeId ?? "",
        description: s.placePrediction?.text?.text ?? "",
      })
    )

    return { success: true, suggestions }
  } catch {
    return { success: false, error: "Failed to fetch place suggestions." }
  }
}
