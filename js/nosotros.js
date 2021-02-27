function validarlogueado() {
    if (validarText(user)) {
        botones_nosotros(false);
    } else {
        botones_nosotros(true);
    }

}


$(document).ready((e) => {
    cargarPrimero();
    $(".btn-ver-nosotros").click(($event) => {
        loadPage("contacto.php")
    });

})

function cargarPrimero() {
    validarlogueado();
}


function botones_nosotros(habilitados) {
    if (habilitados) {
        $('.btn-ver-nosotros ').show();
    } else {
        $('.btn-ver-nosotros ').hide();
    }


}