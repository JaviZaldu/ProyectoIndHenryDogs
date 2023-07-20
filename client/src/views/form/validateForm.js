export function validate(input) {

    const errors = {};

    const nameRegex = /^[A-Za-z\s]+$/;
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;


    // Validación del imagen.
    if (!input.name) {
        errors.name = "El nombre es requerido"
    } else if (!nameRegex.test(input.name)) {
        errors.name = "El nombre solo puede contener letras y espacios"
    } else if (input.name.length > 35) {
        errors.name = "El nombre no puede exceder los 35 caracteres"
    }

    // Validación de la imagen.
    if (!input.image) {
        errors.image = "La URL de la imagen es requerida";
      } else if (!urlRegex.test(input.image)) {
        errors.image = "Ingresa una URL válida para la imagen";
    }

    // Validación de la altura
    const heightMin = parseInt(input.heightMin);
    const heightMax = parseInt(input.heightMax);

    if (!input.heightMin) {
        errors.heightMin = "La altura mínima es requerida";
    }

    if (!input.heightMax) {
        errors.heightMax = "La altura máxima es requerida";
    }

    if (heightMin >= heightMax) {
        errors.heightMin = "La altura mínima debe ser menor a la altura máxima";
        errors.heightMax = "La altura máxima debe ser mayor a la altura mínima";
    }

    // Validación del peso
    // const weightMin = parseInt(input.weight.weightMin);
    // const weightMax = parseInt(input.weight.weightMax);

    // if (!input.weight.weightMin || !input.weight.weightMax) {
    // errors.weightMin = "los pesos son requeridos";
    // errors.weightMax = "los pesos son requeridos";
    // }
    
    // if (weightMin >= weightMax) {
    // errors.weightMin = "El peso mínimo debe ser menor al peso máximo";
    // errors.weightMax = "El peso máximo debe ser mayor al peso mínimo";
    // }

    // Validación de la edad
    const ageMin = parseInt(input.ageMin);
    const ageMax = parseInt(input.ageMax);

    if (!input.ageMin) {
        errors.ageMin = "La edad mínima es requerida";
    }

    if (!input.ageMax) {
        errors.ageMax = "La edad máxima es requerida";
    }

    if (ageMin >= ageMax) {
        errors.ageMin = "La edad mínima debe ser menor a la edad máxima";
        errors.ageMax = "La edad máxima debe ser mayor a la edad mínima";
    }

    // Validación de los temperamentos
    if (input.temperament.length < 3) {
        errors.temperament = "Debe seleccionar un temperamento"
    }

    if (input.temperament.split(",").length > 4) {
        errors.temperament = "Máximo 5 temperamentos"
    }

return errors;
}
