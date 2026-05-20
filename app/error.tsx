"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Props {
  error: Error & {
    digest?: string
  }

  reset: () => void
}

export default function ErrorPage({ error, reset }: Props) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/50 p-6 md:p-10">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="flex flex-col items-center gap-4 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <AlertTriangle className="h-6 w-6 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Something Went Wrong
            </CardTitle>

            <CardDescription className="text-balance leading-relaxed">
              An unexpected error occurred while loading this page. Please try
              again.
            </CardDescription>

            {process.env.NODE_ENV === "development" && (
              <p className="text-muted-foreground mt-4 break-all text-xs">
                {error.message}
              </p>
            )}
          </div>
        </CardHeader>

        <CardFooter className="flex justify-center">
          <Button onClick={() => reset()} className="w-full sm:w-auto">
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
