import { getDogById } from "../../redux/actions";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import styles from "./detail.module.css"

function Detail() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const Dog = useSelector((state) => state.DogById);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    dispatch(getDogById(id))
    .then(()=> setCargando(false))
  }, [dispatch, id]);

  if (cargando) {
    return <p>Loading...</p>;
  }

  let weightDisplay = "";
  if (Dog.weightMin && Dog.weightMax) {
    weightDisplay = `${Dog.weightMin} - ${Dog.weightMax}`;
  } else if (Dog.weight && Dog.weight.metric) {
    weightDisplay = Dog.weight.metric;
  }

  let heightDisplay = "";
  if (Dog.heightMin && Dog.heightMax) {
    heightDisplay = `${Dog.heightMin} - ${Dog.heightMax}`;
  } else if (Dog.height && Dog.height.metric) {
    heightDisplay = Dog.height.metric;
  }
  
  let ageDisplay = "";
  if (Dog.ageMin && Dog.ageMax) {
    ageDisplay = `${Dog.ageMin} - ${Dog.ageMax}`;
  } else if (Dog.life_span) {
    ageDisplay = Dog.life_span;
  }

  let imageDisplay = "";
  if (Dog.image.url) {
    imageDisplay = Dog.image.url;
  } else if (Dog.image) {
    imageDisplay = Dog.image;
  }

  return (
    <div>
    <div>
        <Link to={`/home`}><button className={styles.volver} >VOLVER</button></Link>
    </div>
    <div className={styles.detailContainer}>
      <div className={styles.Nombre} >
        <h2>{Dog.name}</h2>
      </div>
      <div className={styles.others} >
        <p><strong>ID: </strong> {Dog.id}</p>
      </div>
      <div>
        <img src={imageDisplay} alt={Dog.name} className={styles.image} />
      </div>
      <div className={styles.others}>
        <p><strong>Años de vida: </strong> {ageDisplay}</p>
        <p><strong>Temperamentos:</strong> {Dog.temperament}</p>
        <p><strong>Peso: </strong>{weightDisplay}</p>
        <p><strong>Altura: </strong> {heightDisplay}</p>
      </div>
    </div>
    </div>
   );
}

export default Detail;