import Card from '../card/card';
import styles from './cards.module.css';
import gifPerrito from "../../assets/imagenes/gifPerrito.gif"

function Cards({ DogsCopy }) {
  return (
    <div className={styles.cards}>
      {DogsCopy && DogsCopy.length > 0 ? ( 
        DogsCopy?.map((dog, index) => <Card dog={dog} key={`${dog.id}-${index}`} />)
      ) : (
        <div>
        <div className={styles.h2}>
          <h2>No hay razas con este Nombre</h2>
        </div>
        <div className={styles.image}>
          <img src={gifPerrito} alt="Gif"/>
        </div>
      </div>
    )}
    </div>
  );
}

export default Cards;