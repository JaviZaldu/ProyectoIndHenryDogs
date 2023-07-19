import React from 'react';
import styles from './about.module.css';
import aboutImg from '../../assets/imagenes/aboutImg.jpg';
import { Link } from 'react-router-dom';

function About() { 
      return (
        <div>
          <div className={styles.divAbout}>
              <img src={aboutImg} alt="FotoPerfil" className={styles.Foto}/>
              <h2 className={styles.Info}>Un poco sobre mí:</h2>
              <p className={styles.Info}>
                  Hola! mi nombre es <b>Javier Zalduendo</b>
                  <br/>
                  Con mucho esfuerzo y dedicacion pude completar una de mis primeras paginas Web!
                  <br/>
                  Muy feliz de ver todo lo que hice para alcanzar el objetivo
              </p>
          </div>
        <div>
          <Link to={`/home`}><button className={styles.volver}><strong>Volver al Home</strong></button></Link>
        </div>
      </div>
      );
  }

export default About;