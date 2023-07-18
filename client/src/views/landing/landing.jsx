import styles from './landing.module.css';
import tittle from '../../assets/imagenes/tittle.png'

import { Link } from 'react-router-dom';

function Landing() {

  return (
    <div className={styles.landing}>
      <img src={tittle} alt="Henry Dogs PI" className={styles.tittleImage} />
      <Link to={`/home`}><button className={styles.boton}>COMENCEMOS</button></Link>
    </div>
  );
}

export default Landing;