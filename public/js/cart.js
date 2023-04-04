
//eliminando productos desde el front
const deleteBtns = Array.from(

    document.querySelectorAll("#cart__product--deleteBtn")

);

const deleteProduct = async (cid, pid) => {
    try {
        const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
            method: "DELETE",
        });

        const result = await response.json();

        if (response.status === 200) {
            alert("Producto eliminado correctamente");
        }

    } catch (error) {

    }
};

const cid = document.getElementById("purchase__btn").value;

deleteBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

        const pid = btn.value;

        deleteProduct(cid, pid)

        location.reload();
    })


});

const purchaseBtn = document.getElementById("purchase__btn");

purchaseBtn.addEventListener("click", () => {
    purchaseCart(cid);

});

const purchaseCart = async (cid) => {

    try {

        const response = await fetch(`/cart/${cid}/purchase`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (response.status === 200) {
            alert(`Compra realizada con exito ${result.payload.code} `);
            location.reload();
        }


    } catch (error) {



    }
}

/*deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const pid = btn.value;

        deleteProduct("63d525c6279466c8fffbfc40", pid);
        location.reload();
    });
}); */