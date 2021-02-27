let params = new URLSearchParams(location.search);
let res_payu = (params.get('merchantId') == undefined ? "" : params.get('merchantId'))
function cargarPrimero() {

    tkv__getPlanes();

}
$(document).ready((e) => {
    if (validarText(res_payu)) {
        $("#modal-tickets-info-payu").modal("toggle")
    }
});
function tkv__getPlanes() {
    /*let dataPlanes = {
        uid: user.uid,
        empresa: user.empresa
    }*/
    let dataPlanes = {
        iso_code_2: paisOrigen.iso_code_2,
        "iso_code_2_money": iso_code_2_money,
    };

    if (validarText(user)) {
        dataPlanes.uid = user.uid;
        dataPlanes.empresa = user.empresa;
    }
    let data_url = `${baseurl}/controllers/planes_nasbi/?ver_planes`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataPlanes },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async success => {

            if (success["status"] == "success") {
                let data = success.data;
                tkv__showPlanes(data);


            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) {
                    $(".tkc__no_data3").show()
                    $('.tkv__content_planes').empty();
                }

            }

        }, error: error => {
            tkc__alertaConfirmacion(idioma['trans_145'], idioma['_trans06'])


        }
    });
}
function tkv__showPlanes(datos) {

    let htmlPlan = "";

    $('.tkv__content_planes').empty();
    $.each(datos, (i, item) => {
        let htmlTickets = ""
        $.each(item.entradas_planes, (i, ticket) => {
            htmlTickets +=
                `<div class="row row-lista">
                <div class="col-10 px-0">
                    <p>
                        <span><img loading="lazy" src="../imagen/nasbi-tickets/svg/Tickets-${ticket.nombre}.svg" alt="${ticket.nombre} - nasbi.com" /></span> Ticket ${ticket.nombre}
                    </p>
                </div>
                <div class="col-2 px-2">
                    <p class="text-right">${(ticket.valor == 99999 ? 'Full' : ticket.valor)}</p>
                </div>
            </div> `
        });
        htmlPlan =
            `<div class="col-sm-6 col-md-4 px-md-1 px-lg-3 tarjet">
            <div class="content-card">
                <div class="card1">
                    <h4>${idioma['_trans60']} ${item.nombre}</h4>
                    ${htmlTickets}
                </div>
                <div class="row card2">
                    <div class="col-3"></div>
                    <div class="col-9">
                        <h4>${item.precio_local_user_mask} ${item.moneda_local_user}</h4>
                    </div>
                    <div class="col-12">
                        <button class="btn-nasbi-tickets-venta">${idioma._trans428}</button>
                    </div>
                </div>
            </div>
        </div> `
        $('.tkv__content_planes').append(htmlPlan);
        $('.btn-nasbi-tickets-venta').eq(i).off('click');
        $('.btn-nasbi-tickets-venta').eq(i).click({ item }, tkv__opGeneraOrdenPagoPlan);
    });
}
function tkv__opGeneraOrdenPagoPlan($event) {


    return presentAlert("", idioma['trans_309'], "info");
    //PENDIENTES POR PASARELAS DE PAGO

    if (!validarText(user)) {
        // Proceso usuario [NO LOGEADO].
        $('#modal-tkc-nologeado').modal('show');
    } else {
        let item = $event.data.item;
        item.payu.description = idioma['_trans60'] + " " + item.nombre;
        toPayU(item.payu);

    }
}
/*function ventaComprarPlan(id) {
    let dataPlanes = {
        uid: user.uid,
        empresa: user.empresa,
        id: id,
        uso: 1
    }

    let data_url = baseurl + "/controllers/planes_nasbi/?pagar_plan";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataPlanes }),
        dataType: "json",
        contentType: 'application/json',
        success: success => {

            if (success["status"] == "success") {
                console.log(success)
                tkc__alertaConfirmacion(idioma['_trans12'], idioma['_trans46'])

            } else {
                tkc__alertaConfirmacion(idioma['trans_04'], idioma['_trans06'])
            }

        }, error: error => {
            tkc__alertaConfirmacion(idioma['trans_04'], idioma['_trans06'])


        }
    });

}*/
function tkc__alertaConfirmacion(titulo, texto) {
    presentAlert(titulo, texto, "error")

}