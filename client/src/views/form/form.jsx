import { useState } from "react";
import { Link } from 'react-router-dom';
import { createDog } from "../../redux/actions";
import { useDispatch, useSelector  } from 'react-redux';
import { validate } from "./validateForm"

import styles from './form.module.css';


function Form() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    name: "  *",
    image: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    ageMin: "",
    ageMax: "",
  });
      
  const [input, setInput] = useState({
    image:"",
    name:"",
    heightMin:"",
    heightMax:"",
    weight: { 
      metric: ""
    },
    temperament:"",
    ageMin:"",
    ageMax:"",
  })
      
  const validateForm = () => {
    const errors = validate(input);
    setErrors(errors);
  };

  const DogsCopy = useSelector((state) => state.DogsCopy.dogs);
  const isDogNameDuplicated = (name) => {
    return DogsCopy.some((dog) => dog.name.toLowerCase() === name.toLowerCase());
  };

  const allTemperaments = useSelector((state) => state.allTemperaments);
  const handleTemperamentChange = (e) => {
    const temperamentValue = e.target.value;
    setInput((prevInput) => {
      const isSelected = prevInput.temperament.includes(temperamentValue);
      let updatedTemperament;
      if (isSelected) {
        // Si el temperamento ya está seleccionado, lo eliminamos de la lista
        updatedTemperament = prevInput.temperament
          .split(',')
          .filter((temp) => temp.trim() !== temperamentValue)
          .join(', ');
      } else {
        // Si el temperamento no está seleccionado, lo agregamos a la lista
        updatedTemperament = prevInput.temperament
          ? `${prevInput.temperament}, ${temperamentValue}`
          : temperamentValue;
      }
      return { ...prevInput, temperament: updatedTemperament };
    });
    validateForm();
  };


  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
  
    // Si el campo es weightMin o weightMax, actualizamos el estado dentro de input.weight.metric.
    if (name === "weightMin" || name === "weightMax") {
      setInput((prevInput) => ({
        ...prevInput,
        weight: {
          metric: `${name === "weightMin" ? value : prevInput.weight.metric.split(" - ")[0]} - ${
            name === "weightMax" ? value : prevInput.weight.metric.split(" - ")[1]
          }`,
        },
      }));
    } else {
      // Si el campo no es weightMin o weightMax, actualizamos el estado normalmente.
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
    validateForm();
  }

    function handleSubmit(e) {
      e.preventDefault();

      const isNameDuplicated = isDogNameDuplicated(input.name);
      if (isNameDuplicated) {
        alert("Ya existe un perro con este nombre. Por favor, elige otro nombre.");
      return;
    }
      dispatch(createDog(input))
    .catch((errors) => {
      console.log(errors.response);
    });
};

  return (
    <div>
    <div>
        <Link to={`/home`}><button className={styles.volver}>VOLVER</button></Link>
    </div>
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div>
            <h3>CREA TU PROPIO PERRO〰🖍</h3>
      </div>
      <div>
            <label><strong>Foto:  </strong></label>
            <input className={styles.input} type="text" name="image" value={input.image} onChange={handleChange} />
            <span className={styles.error} >  {errors.image}</span>
        </div>
        <div>
            <label><strong>Nombre:  </strong></label>
            <input className={styles.input} type="text" name="name" value={input.name} onChange={handleChange}/>
            <span className={styles.error} >  {errors.name}</span>
        </div>
        <div>
            <label><strong>Altura mínima:  </strong></label>
            <input className={styles.input} type="text" name="heightMin" value={input.heightMin} onChange={handleChange}/> Cm
            <span className={styles.error} >  {errors.heightMin}</span>
        </div>
        <div>
            <label><strong>Altura máxima:  </strong></label>
            <input className={styles.input} type="text" name="heightMax" value={input.heightMax} onChange={handleChange}/> Cm
            <span className={styles.error} >  {errors.heightMax}</span>
        </div>
        <div>
            <label><strong>Peso mínimo:  </strong></label>
            <input className={styles.input} type="text" name="weightMin" value={input.weight.weightMin} onChange={handleChange}/> Kg
            <span className={styles.error} >  {errors.weightMin}</span>
        </div>
        <div>
            <label><strong>Peso máximo:  </strong></label>
            <input className={styles.input} type="text" name="weightMax" value={input.weight.weightMax} onChange={handleChange}/> Kg
            <span className={styles.error} >  {errors.weightMax}</span>
        </div>
        <div>
            <label><strong>Años de vida mínimos:  </strong></label>
            <input className={styles.input} type="text" name="ageMin" value={input.ageMin} onChange={handleChange}/> Años
            <span className={styles.error} >  {errors.ageMin}</span>
        </div>
        <div>
            <label><strong>Años de vida máximos:  </strong></label>
            <input className={styles.input} type="text" name="ageMax" value={input.ageMax} onChange={handleChange}/> Años
            <span className={styles.error} >  {errors.ageMin}</span>
        </div>
        <div className={styles.TemperamentDiv}>
            <label><strong>Temperamentos:  </strong></label>
            <br></br>
            <span className={styles.error} >  {errors.temperament}</span>
            <div className={styles.Temperament}>
                {allTemperaments.map((temperament) => ( <label key={temperament.id}>
                <input 
                      type="checkbox" 
                      name="temperament" 
                      value={temperament.name} 
                      checked={input.temperament.includes(temperament.name)} 
                      onChange={handleTemperamentChange}
                /> {temperament.name}</label>))}
            </div>
        </div>
            {!errors.name && 
            !errors.image && 
            !errors.heightMin && 
            !errors.heightMax && 
            !errors.weightMin &&
            !errors.weightMax &&
            !errors.ageMin &&
            !errors.ageMax && 
            !errors.temperament &&
            <button className={styles.btn} type="submit">Crear Raza</button>}
    </form>
    </div>
    </div>
  );
}

export default Form;