import { Skeleton } from "@/components/ui/skeleton"

export function TableSkeleton() {
  return (
    <div className="space-y-2">
      <div className="flex gap-4 p-4 items-center">
        <Skeleton className="h-16 w-24 rounded" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-8 w-16 rounded" />
        </div>
      </div>
      <div className="flex gap-4 p-4 items-center">
        <Skeleton className="h-16 w-24 rounded" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-8 w-16 rounded" />
        </div>
      </div>
      <div className="flex gap-4 p-4 items-center">
        <Skeleton className="h-16 w-24 rounded" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-8 w-16 rounded" />
        </div>
      </div>
    </div>
  )
}
