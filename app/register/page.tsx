"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page with register tab active
    router.push("/login?tab=register")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Redirecting to registration...</h1>
        <p className="mt-2">Please wait while we redirect you to the registration page.</p>
      </div>
    </div>
  )
}

