export const generateProductErrorInfo = (product) => {
    return `Required properties:
      title: must be string, recived ${product.title}
      description: must be string, recived ${product.description}
      price: must be number, recived ${product.price}
      code: must be string, recived ${product.code}
      category: must be string, recived ${product.category}`;
};


/*export const generateUserErrorInfo = user => {
    return `Uno o mas propiedades estan incompletos o son invalidos.
    Lista de propiedades obligatorios:
        * first_name: Necesita ser un string, recibio ${user.first_name}
        * last_name: Necesita ser un string, recibio ${user.last_name}
        * email: Necesita ser un string, recibio ${user.email}
        * zona: Necesita ser un string, recibio ${user.zona}
    `
}*/