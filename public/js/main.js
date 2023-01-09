const socket = io();

const productsContainer = document.getElementById('products-body')
const formProducts = document.getElementById('crear-formulario')


socket.on('products', (products) => {

    console.log (products)

const todosLosProductos = products.map (
(product) => `



<div class="cards-products">
<picture class="cards-img"> <img   src=${product.thumbnail} /></picture>
<div class="cards-info">
<p> ${product.title}</p>
<p>${product.description}</p>
<p>${product.price}</p>
</div>



</div>`

).join(" ")

console.log(todosLosProductos)

productsContainer.innerHTML = todosLosProductos

})

formProducts.addEventListener('submit', (e) => e.preventDefault())

const formData = new FormData(formProducts)

const products = {}

for (const field of formData.entries()) {

    console.log (field)


}

//socket.on("hello", (data) => console.log(data));
