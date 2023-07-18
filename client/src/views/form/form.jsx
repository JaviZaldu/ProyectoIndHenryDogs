import { useState } from "react";
import { Link } from 'react-router-dom';
import { createDog } from "../../redux/actions";
import { useDispatch, useSelector  } from 'react-redux';
import { validate } from "./validateForm"

import styles from './form.module.css';


function Form() {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
        name: "  Requerido",
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
        weightMin:"",
        weightMax:"",
        temperament:"",
        ageMin:"",
        ageMax:"",
      })

  const [isDogCreated, setIsDogCreated] = useState(false);
      
      const validateForm = () => {
        const errors = validate(input);
        setErrors(errors);
      };

  const DogsCopy = useSelector((state) => state.DogsCopy.dogs);
  const isDogNameDuplicated = (name) => {
    return DogsCopy.some((dog) => dog.name.toLowerCase() === name.toLowerCase());
  };

    function handleChange(e) {
      e.preventDefault();
      setInput((prevInput) => ({
        ...prevInput,
        [e.target.name]: e.target.value
      }));
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
        .then(() => {
          setIsDogCreated(true); // Perro creado exitosamente
          setTimeout(() => {
            setIsDogCreated(false); // Ocultar el mensaje después de unos segundos
          }, 3000); // Aquí puedes ajustar la cantidad de milisegundos que el mensaje se muestra antes de desaparecer (3 segundos en este caso)
        })
        .catch((errors) => {
          console.log(errors.response);
        });
    }

  return (
    <div>
    <div>
        <Link to={`/home`}><button className={styles.volver}>VOLVER</button></Link>
    </div>
    <div>
        {isDogCreated && <p>¡Perro creado correctamente!</p>}
      </div>
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div>
            <h3>CREA TU PROPIO PERRO〰🖍</h3>
      </div>
      <div>
            <label><strong>Foto:  </strong></label>
            <input className={styles.input} type="text" name="image" value={input.image} onChange={handleChange} />
            <span className={styles.error} >{errors.image}</span>
        </div>
        <div>
            <label><strong>Nombre:  </strong></label>
            <input className={styles.input} type="text" name="name" value={input.name} onChange={handleChange}/>
            <span className={styles.error} >{errors.name}</span>
        </div>
        <div>
            <label><strong>Altura mínima:  </strong></label>
            <input className={styles.input} type="text" name="heightMin" value={input.heightMin} onChange={handleChange}/>
            <span className={styles.error} >{errors.heightMin}</span>
        </div>
        <div>
            <label><strong>Altura máxima:  </strong></label>
            <input className={styles.input} type="text" name="heightMax" value={input.heightMax} onChange={handleChange}/>
            <span className={styles.error} >{errors.heightMax}</span>
        </div>
        <div>
            <label><strong>Peso mínimo:  </strong></label>
            <input className={styles.input} type="text" name="weightMin" value={input.weightMin} onChange={handleChange}/>
            <span className={styles.error} >{errors.weightMin}</span>
        </div>
        <div>
            <label><strong>Peso máximo:  </strong></label>
            <input className={styles.input} type="text" name="weightMax" value={input.weightMax} onChange={handleChange}/>
            <span className={styles.error} >{errors.weightMax}</span>
        </div>
        <div>
            <label><strong>Años de vida mínimos:  </strong></label>
            <input className={styles.input} type="text" name="ageMin" value={input.ageMin} onChange={handleChange}/>
            <span className={styles.error} >{errors.ageMin}</span>
        </div>
        <div>
            <label><strong>Años de vida máximos:  </strong></label>
            <input className={styles.input} type="text" name="ageMax" value={input.ageMax} onChange={handleChange}/>
            <span className={styles.error} >{errors.ageMin}</span>
        </div>
        <div>
            <label><strong>Temperamentos:  </strong></label>
            <input className={styles.input} type="text" name="temperament" value={input.temperament} onChange={handleChange}/>
        </div>
        <div>
            {!errors.name && 
            !errors.image && 
            !errors.heightMin && 
            !errors.heightMax && 
            !errors.weightMin &&
            !errors.weightMax &&
            !errors.ageMin &&
            !errors.ageMax && <button className={styles.btn} type="submit">Crear Raza</button>}
        </div>
    </form>
    </div>
    </div>
  );
}

export default Form;