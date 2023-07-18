// import { useState } from 'react';
import { getDogByName } from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from './searchBar.module.css';

function SearchBar() {

  const dispatch = useDispatch();
  const [dogName, setDogName] = useState("");

  const handleChange = (event) => {
    setDogName(event.target.value); 
  };

  const handleSubmit = () => {
    dispatch(getDogByName(dogName))
  }
  
  return (
    <div className={styles.searchBar}>
      <input 
      className={styles.imput} 
      type='search' 
      placeholder="Nombre de la raza"  
      onChange={handleChange} value={dogName} 
      />
      <button className={styles.button} onClick={handleSubmit}>
        BUSCAR
      </button>
    </div>
  );
}

export default SearchBar;