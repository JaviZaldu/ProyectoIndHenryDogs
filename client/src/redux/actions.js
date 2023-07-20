import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS"
export const GET_DOG_BY_NAME = "GET_DOGS_BY_NAME";
export const GET_DOG_BY_ID = "GET_DOG_BY_ID";
export const ORDER_DOGS = "ORDER_DOGS";
export const RESET_DOGS = "RESET_DOGS";
export const CREATE_DOG = "CREATE_DOG";
export const WEIGHT_ORDER = "WEIGHT_ORDER";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";


export function getAllDogs() {

  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/dogs/`);
    return dispatch({
      type: GET_ALL_DOGS,
      payload: response.data,
    });
  } 
}
export function getAllTemperaments() {

  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/dogs/temperaments/`);
    return dispatch({
      type: GET_ALL_TEMPERAMENTS,
      payload: response.data,
    });
  } 
}

export function getDogByName(name) {
    return {
      type: GET_DOG_BY_NAME,
      payload: name,
  };
} 

export function getDogById(id) {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/dogs/${id}`);
    return dispatch({
      type: GET_DOG_BY_ID,
      payload: response.data.data,
    });
  } 
}

//filtros

export function orderDogs(order) {
  return {
    type: ORDER_DOGS,
    payload: order,
  };
}

export function resetDogs() {
  return {
    type: RESET_DOGS,
  };
}

export function weightOrder(weight) {
  return {
    type: WEIGHT_ORDER,
    payload: weight,
  }
}

export function filterByTemperaments(temperament) {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload: temperament,
  };
}

export function filterByOrigin(origin) {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
}

//creando...

export function createDog(input) {

  return async function (dispatch) {
    const response = await axios.post(`http://localhost:3001/dogs/`,input);
    return dispatch({
      type: CREATE_DOG,
      payload: response.data.data,
    });
  } 
}