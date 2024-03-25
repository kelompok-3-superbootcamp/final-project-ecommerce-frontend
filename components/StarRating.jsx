import { FaStar, FaStarHalf } from "react-icons/fa"

const StarRating = ({rating}) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const stars = []

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} />)
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalf />)
  }
  return <div className="star-container">{stars}</div>
}

export default StarRating
