

let subasta_miscuentas = localStorage.getItem("mis_cuentas");
if (subasta_miscuentas == ".sidenav_subastas") {
    validar_flujo_opcion_de_subasta("2");
    $(subasta_miscuentas).click();
}

$(document).ready(($event) => {

    $('.sidenav_subastas').click(($event) => {
        validar_flujo_opcion_de_subasta("2"); //esta funcion esta en resumen.js y ella ya llama la funcion redirigir_opcion_mis_cuentas que es la 
        //que se encarga de llenar el storage de mis-cuentas 
    });
    $(".doc_aprendecomo88").off();
    $(".doc_aprendecomo88").on("click", function (params) {
        openPDF("https://nasbi.com/assets/docs/ComovenderenNasbiDescuentos-ES.pdf")
    });
    $(".doc_aprendecomo89").off();
    $(".doc_aprendecomo89").on("click", function (params) {
        openPDF("https://nasbi.com/assets/docs/ComocomprarNasbiDescuentos-ES.pdf")
    });




    $('.boton_vende_subasta_mis_cuentas').click(($event) => {
        flujo_boton_de_vende_subasta_mis_cuuentas();

    });

});


async function flujo_boton_de_vende_subasta_mis_cuuentas() {
    let tipo_usuario = await get_tipo_usuario(user);
    switch (tipo_usuario.id) {
        case 3: // empresa
            loadPage("vender.php")
            break;
        default:
            loadPage("contacto.php")
            break;
    }

}