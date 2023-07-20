import SearchBar from '../../components/searchBar/searchBar';
import Cards from '../../components/cards/cards';
import Order from '../../components/filters/order';
import styles from './home.module.css';
import tittle from '../../assets/imagenes/tittle.png'
import Paginado from '../../components/paginado/paginado';

import { getAllDogs, getAllTemperaments} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


function Home() {

  const dispatch = useDispatch();
  const DogsCopy = useSelector((state) => state.DogsCopy);
  const allTemperaments = useSelector((state) => state.allTemperaments);

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperaments());
  }, [dispatch]);

    const [currentPage, setCurrentPage] = useState(1); // Define el estado local para manejar la paginación.
    const dogsPerPage = 8;
  
    const indexOfLastDog = currentPage * dogsPerPage; // Calcula el índice del último y primer perro en la página actual.
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = DogsCopy.dogs?.slice(indexOfFirstDog, indexOfLastDog);
  
    const totalPages = Math.ceil(DogsCopy.dogs?.length / dogsPerPage); // Obtiene los perros que corresponden a la página actual.
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

  return (
    <div className={styles.home}>
      <img src={tittle} alt="Henry Dogs PI" className={styles.tittleImage} />
      <Link to={`/about`}><button className={styles.about}>ABOUT ME</button></Link>
      <Link to={`/form`}><button className={styles.form}>CREAR RAZA</button></Link>
      <SearchBar setCurrentPage = {setCurrentPage}/>
      <Order allTemperaments={allTemperaments}/>
      <Cards DogsCopy={currentDogs}/>
      <Paginado totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
}

export default Home;