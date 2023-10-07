import { Link } from 'react-router-dom';
import './Card.css';

interface CardProps {
  recipeId: number;
  image: string | null;
  title: string;
  readyInMinutes: number;
}

export default function Card({ recipeId, image, title, readyInMinutes }: CardProps) {
  const fallbackImage = '../../../../../assets/images/secret-dish.jpg';

  return (
    <div className="card" key={recipeId}>
      <img src={image || fallbackImage} alt={title} />
      <p className="description">{title}</p>
      <div className="bottom-card">
        <div className="time-description">
          <img src="../../../../../public/assets/images/clock-solid.svg" alt="Clock" className="imgClock" />
          {readyInMinutes} min
        </div>
        <Link to={`/recipes/${recipeId}`} className="view-recipe-button">
          View Recipe
        </Link>
      </div>
    </div>
  );
}