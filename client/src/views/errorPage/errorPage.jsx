import gifError from "../../assets/imagenes/gifError.gif";
import styles from "./errorPage.module.css"
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div>
        <div className={styles.errorH3}>
            <h3>¡Se escaparon todos los perros! <br></br> Vuelve al home para recuperarlos
            </h3>
        </div>
        <div className={styles.errordiv}>
        <img src={gifError} alt="gifError" className={styles.errorgif}/>
        </div>
        <div>
            <Link to={`/home`}><button className={styles.volver}><strong>Volver al Home</strong></button></Link>
        </div>
    </div>

  );
}

export default ErrorPage;
