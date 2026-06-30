import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CampaignSkeleton() {
  return (
    <Card className="w-94 overflow-hidden">
      <Skeleton className="h-50 w-full rounded-none" />
      <CardContent className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-end">
          <Skeleton className="h-9 w-36" />
        </div>
      </CardContent>
    </Card>
  )
}
