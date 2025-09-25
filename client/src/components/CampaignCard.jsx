import { Link } from 'react-router-dom';

const CampaignCard = ({title, desc, img, id}) => {
  return (
<div className="card bg-white w-94 shadow-lg">
  <figure>
    <img
      src={img}
      alt={title}
      className="w-100 h-50 object-cover"/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>{desc}</p>
    <div className="card-actions justify-end">
      <Link to={`/detailcampaign/${id}`} className="btn btn-primary">Donate Now</Link>
    </div>
  </div>
</div>
  )
}

export default CampaignCard
