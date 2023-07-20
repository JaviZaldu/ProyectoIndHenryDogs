import styles from './landing.module.css';
import tittle from '../../assets/imagenes/tittle.png'

import { Link } from 'react-router-dom';

function Landing() {

  return (
    <div className={styles.landing}>
      <img src={tittle} alt="Henry Dogs PI" className={styles.tittleImage} />
      <h2 className={styles.h2}> ¡Bienvenidos al mundo de los Perros, Los invito a decubrir todo tipo de Raza y mucho más!</h2>
      <Link to={`/home`}><button className={styles.boton}>COMENCEMOS</button></Link>
    </div>
  );
}

export default Landing;