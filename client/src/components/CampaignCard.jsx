import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CampaignCard = ({ title, desc, img, id }) => {
  return (
    <Card className="w-94 overflow-hidden">
      <div className="h-50 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover" />
      </div>
      <CardContent className="flex flex-col gap-3 p-5">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm text-muted-foreground line-clamp-2">{desc}</p>
        <div className="flex justify-end">
          <Link to={`/detailcampaign/${id}`}>
            <Button>Donasi Sekarang</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default CampaignCard
