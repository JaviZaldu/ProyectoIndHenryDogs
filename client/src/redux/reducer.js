import { GET_ALL_DOGS, GET_ALL_TEMPERAMENTS ,GET_DOG_BY_ID, GET_DOG_BY_NAME, ORDER_DOGS, 
RESET_DOGS, CREATE_DOG, WEIGHT_ORDER ,FILTER_BY_TEMPERAMENTS, FILTER_BY_ORIGIN} from "./actions";
  
let initialState = { allDogs: [], DogsCopy: [], DogById: [], allTemperaments: []};
  
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_DOGS:
        return {
          ...state,
          allDogs: action.payload,
          DogsCopy: action.payload,
        };
      case GET_ALL_TEMPERAMENTS:
        return {
          ...state,
          allTemperaments: action.payload,
        };
      case GET_DOG_BY_NAME:
        const SearchByName = state.allDogs.dogs.filter((dog) => 
        dog.name.toLowerCase().includes(action.payload.toLowerCase()));
        return {
          ...state,
          DogsCopy: {
            ...state.DogsCopy,
            dogs: SearchByName,
          },
      };
      case GET_DOG_BY_ID:
        return {
          ...state,
          DogById: action.payload,
        };

//filtros

      case ORDER_DOGS:
        let ordenados;
        if (action.payload === "A-Z") {
          ordenados = [...state.DogsCopy.dogs].sort((a, b) => {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
            if (nameA < nameB) {
              return -1
            }
            if (nameA > nameB) {
              return 1
            }
            return 0
          })
        }
        if (action.payload === "Z-A") {
          ordenados = [...state.DogsCopy.dogs].sort((a, b) => {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
              if (nameA < nameB) {
                return 1
              }
              if (nameA > nameB) {
                return -1
              }
              return 0
          })
        }
        return {
          ...state,
          DogsCopy: {
            ...state.DogsCopy,
            dogs: ordenados,
          },
      };

      case WEIGHT_ORDER:
      let orderedByWeight;
      if (action.payload === "lighter") {
        orderedByWeight = state.DogsCopy.dogs.sort((a, b) => {
          const weightA = parseInt(a.weight.metric.split(" - ")[0]); // Convierte el valor numérico inferior del rango
          const weightB = parseInt(b.weight.metric.split(" - ")[0]); // Convierte el valor numérico inferior del rango
          return weightA - weightB;
        });
      } else if (action.payload === "heavier") {
        orderedByWeight = state.DogsCopy.dogs.sort((a, b) => {
          const weightA = parseInt(a.weight.metric.split(" - ")[1]); // Convierte el valor numérico superior del rango
          const weightB = parseInt(b.weight.metric.split(" - ")[1]); // Convierte el valor numérico superior del rango
          return weightB - weightA; // Ordena de mayor a menor peso
        });
      } else {
        orderedByWeight = state.DogsCopy.dogs; // No se seleccionó ninguna opción, no se hace ningún cambio
      }
      return {
        ...state,
        DogsCopy: {
          ...state.DogsCopy,
          dogs: orderedByWeight,
        },
    };
      
      case FILTER_BY_TEMPERAMENTS:
        let tempsDogs = state.allDogs.dogs;
        const filtrados = tempsDogs.filter((dog) => dog.temperament && dog.temperament.includes(action.payload));
        return {
          ...state,
          DogsCopy: {
            ...state.DogsCopy,
            dogs: filtrados,
        }
      }

      case FILTER_BY_ORIGIN:
        let origen;
        let originalDogs = state.allDogs.dogs;
          if (action.payload === "Api") {
            origen = originalDogs.filter((dog) => {
              return !isNaN((dog.id));
            });
          } 
          else {
            origen = originalDogs.filter((dog) => {
              return isNaN((dog.id));
            });
          }
        return {
          ...state,
          DogsCopy: {
            ...state.DogsCopy,
            dogs: origen,
        }
        }
    
      case RESET_DOGS:
        return {
          ...state,
          DogsCopy: state.allDogs,
        };


//creando...
      case CREATE_DOG:
        return {
          ...state,
          allDogs: [...state.allDogs, action.payload],
      };

      default:
        return state;
      }
};


export default rootReducer;