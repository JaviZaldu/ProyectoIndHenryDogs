import styles from './card.module.css';
import { Link } from 'react-router-dom';

function Card({dog}) {
  const {name, temperament, id} = dog;

  let weightDisplay = "";
  if (dog.weightMin && dog.weightMax) {
    weightDisplay = `${dog.weightMin} - ${dog.weightMax}`;
  } else if (dog.weight && dog.weight.metric) {
    weightDisplay = dog.weight.metric;
  }
  let imageDisplay = "";
  if (dog.image.url) {
    imageDisplay = dog.image.url;
  } else if (dog.image) {
    imageDisplay = dog.image;
  }

  return (
    <div className={styles.card}>
      <Link to={`/detail/${id}`}>
      <div>
      <img src={imageDisplay} alt={name} className={styles.image} />
      </div>
      </Link>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.others}>
      <p ><strong>Temperamentos: </strong> {temperament}</p>
      <p ><strong>Peso: </strong>{weightDisplay} KG</p>
      </div>
    </div>
  );
}

export default Card;