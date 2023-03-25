
// REVISAR
// agregando productos desde el front
const addToCartBtn = document.getElementById("addProduct__btn");
const pid = addToCartBtn.value;

const addToCart = async (cid, pid) => {
    try {
        const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (result.status === "succes") {
            alert("Producto agregado correctamente");
        }
    } catch (error) {
        console.log(error);
    }
};

addToCartBtn.addEventListener("click", (e) => {
    console.log(e.target.value)
    addToCart("63d525c6279466c8fffbfc40", pid);
});