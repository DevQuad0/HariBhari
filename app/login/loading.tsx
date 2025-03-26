import { Skeleton } from "@/components/ui/skeleton"

export default function LoginLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 bg-gradient-to-b from-emerald-50 to-lime-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-8">
          <Skeleton className="h-10 w-64 md:w-96" />
          <Skeleton className="h-6 w-80 md:w-[500px]" />
        </div>

        <div className="mx-auto max-w-md w-full">
          <Skeleton className="h-10 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

