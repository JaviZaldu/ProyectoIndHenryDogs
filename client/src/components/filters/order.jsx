import React from "react";
import styles from './order.module.css';
import { useDispatch } from "react-redux";
import { orderDogs, resetDogs, weightOrder, filterByTemperaments, filterByOrigin} from "../../redux/actions";

export default function Order({allTemperaments}) {
  const dispatch = useDispatch();

  function handleSort(event) { 
    event.preventDefault();
    dispatch(orderDogs(event.target.value));
  }

  function handleReset(event) {
    event.preventDefault();
    dispatch(resetDogs());
  }

  function handleWeightOrder(event) { 
    event.preventDefault();
    dispatch(weightOrder(event.target.value));
  };

  function handleFilter(event) { 
    event.preventDefault();
    dispatch(filterByTemperaments(event.target.value));
  };

  function handleOriginFilter(event) {
    event.preventDefault();
    dispatch(filterByOrigin(event.target.value));
  };
  
  return (
    <div>
      <select className={styles.filter} onChange={handleSort}>
      <option>Orden Alfabetico</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <select className={styles.filter} onChange={handleWeightOrder}>
        <option>Ordenar por peso</option>
        <option value="lighter">Menor Peso</option>
        <option value="heavier">Mayor Peso</option>
      </select>
      <select className={styles.filter} onChange={handleFilter}>
      <option value="1" >Ordenar por Temperamento</option>
        {allTemperaments.map((temperament) => <option key={temperament.id} value={temperament.name} >{temperament.name}</option>) }
      </select>
      <select className={styles.filter} onChange={handleOriginFilter}>
      <option>Ordenar por Origen</option>
        <option value="Api">API</option>
        <option value="Database">Base de datos</option>
      </select>
      <button className={styles.button} onClick={handleReset}>Reset</button>
    </div>
  );
}