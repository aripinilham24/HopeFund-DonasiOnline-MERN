

const CampaignCard = ({title, desc, img, key}) => {
  return (
<div className="card bg-white w-96 shadow-sm" key={key}>
  <figure>
    <img
      src={img}
      alt={title} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>{desc}</p>
    <div className="card-actions justify-end">
      <a className="btn btn-primary">Donate Now</a>
    </div>
  </div>
</div>
  )
}

export default CampaignCard
