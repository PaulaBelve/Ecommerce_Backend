//Eliminar un usuario

const btnDeleteUser = document.getElementById("deleteUser");
const uid = btnDeleteUser.value;

const dltUser = async (uid) => {
    try {
        const response = await fetch(`/admin/${uid}`, {
            method: "DELETE",
        });

        const result = await response.json();

        if (response.status === 200) {
            alert("Usuario eliminado");
        } /*else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        } */
    } catch (error) {
        console.log(error);

    }
};

btnDeleteUser.addEventListener("click", (e) => {
    console.log(e.target.value)
    dltUser(uid);
});

// Cambiar el role del usuario

const btnChangeRole = document.getElementById("changeRole");
const updateRole = btnChangeRole.value;

const changeUserRole = async (uid, newRole) => {
    try {
        const response = await fetch(`/admin/${uid}/role`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: newRole }),
        });

        if (response.status === 200) {
            alert("Rol de usuario cambiado exitosamente");
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.log(error);

    }
};

btnChangeRole.addEventListener("click", () => {
    const newRole = prompt("Ingrese el nuevo rol del usuario");
    if (newRole) {
        changeUserRole(uid, newRole);
    }
});
