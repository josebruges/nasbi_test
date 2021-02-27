/*
    Los tickets-de-compra son para si y solo si: INSCRIBIRSE EN UNA SUBASTA.
    Los tickets-de-venda son para si y solo si: PUBLICAR PRODUCTOS EN UNA SUBASTA.
*/
let params = new URLSearchParams(location.search);
let res_payu = (params.get('merchantId') == undefined ? "" : params.get('merchantId'))
$(document).ready((e) => {
    if (validarText(res_payu)) {
        $("#modal-ticketsc-info-payu").modal("toggle")
        $('.modal__tkc__info__payu').off('click');
        $('.modal__tkc__info__payu').on('click', tkc_opVerificarPago);
    }
    tkc__getTickes();
    tkc__getPlanes();
});
function cargarPrimero() {

}
function tkc__getTickes() {
    let dataPlanes = {
        /*uid: user.uid,
        empresa: user.empresa,*/
        "iso_code_2": paisOrigen.iso_code_2,
        "iso_code_2_money": iso_code_2_money,
    };

    let data_url = baseurl + "/controllers/planes_nasbi/?ver_tickets";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataPlanes }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {

            if (success["status"] == "success") {

                let data = success.data;
                tkc__showTickets(data)

            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) $(".tkc__no_data").show()

            }

        }, error: error => {
            let desc = idioma['_trans458'].split("###").join("tickets")
            tkc__alertaConfirmacion(idioma['trans_145'], desc);

        }
    });

}
function tkc__showTickets(datos) {
    let htmlTickets = "";

    /*console.log("datos: ", datos);
    console.log("datos: ", JSON.stringify(datos));*/

    $('.tkc__content_tickets').empty();
    $.each(datos, (i, item) => {

        let descrip = idioma['trans_147'];
        descrip = descrip.split('$$').join(`${item.rango_inferior_local_user_mask} ${item.moneda_local_user}`).split('##').join(`${item.rango_superior_local_user_mask} ${item.moneda_local_user}`);

        item.label_descrip = descrip;

        htmlTickets =
            `
        <div class="col-sm-6 col-md-4 px-md-1 px-lg-3">
            <div class="content-card">
                <div class="card1">
                    <h4>
                        <img loading="lazy" src="../imagen/nasbi-tickets/svg/Tickets-${item.descripcion.toLowerCase()}.svg" alt="tickets ${item.descripcion} - nasbi.com" />
                        <label>
                        Tickets <br />
                        ${item.descripcion}
                        </label>
                    </h4>
                    <p>${descrip}</p>
                </div>
                <div class="row card2">
                    <div class="col-4">
                        <input type="tel" class="form-control __maskInt__ compra__input_cantidad_${item.id}" value="1"/>
                    </div>
                    <div class="col-8">
                        <h4>${item.precio_local_user_mask} <br>${item.moneda_local_user}</h4>
                    </div>
                    <div class="col-12">
                        <button class="btn-nasbi-tickets-compra">${idioma._trans428}</button>
                    </div>
                </div>
            </div>
        </div>`;

        $('.tkc__content_tickets').append(htmlTickets);
        $('.btn-nasbi-tickets-compra').eq(i).off('click');
        $('.btn-nasbi-tickets-compra').eq(i).click({ item }, tkc__opGeneraOrdenPago);
    });

}

function tkc__opGeneraOrdenPago($event) {
    return presentAlert("", idioma['trans_309'], "info");
    //De aquí en adelante esto esta en proceso por PASARELA DE PAGO.
    if (!validarText(user)) {
        // Proceso usuario [NO LOGEADO].
        $('#modal-tkc-nologeado').modal('show');
    } else {
        let item = $event.data.item;
        let cant = $('.compra__input_cantidad_' + item.id).val() * 1;
        if (!validarNumero(cant)) return tkc__alertaConfirmacion(idioma['_trans460'], idioma['_trans423'])

        let datoEnvio =
        {
            "data": {
                "id": item.id,
                "uid": user.uid,
                "empresa": user.empresa,
                "iso_code_2": paisOrigen.iso_code_2,
                "iso_code_2_money": iso_code_2_money,
                "cantidad": cant
            }
        };
        let data_url = `${baseurl}/controllers/planes_nasbi/?gernerar_orden_pago`;
        $.ajax({
            type: "POST",
            url: data_url,
            data: datoEnvio,
            dataType: "json",
            success: result => {
                if (result["status"] == "success") {

                    result.data.payu.description = item.label_descrip;
                    toPayU(result.data.payu);

                } else {
                    presentAlert(idioma['trans_145'], idioma['trans_148'], "error");

                }

            }, error: error => {
                console.log("error: ", error);
                presentAlert(idioma['trans_145'], idioma['trans_148'], "error");

            }
        });
    }
}
/*function tkc__ComprarTickets(id) {
    var cant = $(".compra__input_cantidad" + id).val();
    if (!validarNumero(cant)) return tkc__alertaConfirmacion(idioma['trans_04'], idioma['_trans423']);
    let dataTickets = {
        uid: user.uid,
        empresa: user.empresa,
        tipo: id,
        cantidad: cant,
        uso: 2,
        tranferido: null
    }
    console.log(dataTickets)

    let data_url = baseurl + "/controllers/planes_nasbi/?pagar_ticket_compra";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataTickets },
        dataType: "json",
        success: success => {
            if (success["status"] == "success") {
                tkc__alertaConfirmacion(idioma['_trans12'], idioma['_trans424']);


            } else {
                tkc__alertaConfirmacion(idioma['trans_04'], idioma['_trans06']);
            }

        }, error: error => {
            tkc__alertaConfirmacion(idioma['trans_04'], idioma['_trans06']);


        }
    });

}*/

function tkc__getPlanes() {
    let dataPlanes = {
        iso_code_2: paisOrigen.iso_code_2,
        "iso_code_2_money": iso_code_2_money,
    };

    if (validarText(user)) {
        dataPlanes.uid = user.uid;
        dataPlanes.empresa = user.empresa;
    }

    let data_url = `${baseurl}/controllers/planes_nasbi/?ver_planes_compra`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataPlanes },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async result => {

            if (result["status"] == "success") {
                let data = result.data;
                tkc__showPlanes(data);

            } else {
                let validate_token = await erroresTokenEmpresa(result);
                if (!validate_token) $(".tkc__no_data2").show();

            }

        }, error: error => {
            console.log("error: ", error);
            let desc = idioma['_trans458'].split("###").join(idioma['_trans60'])
            tkc__alertaConfirmacion(idioma['trans_145'], idioma['_trans06']);

        }
    });
}
function tkc__showPlanes(datos) {

    let htmlPlan = "";

    $('.tkc__content_planes').empty();
    $.each(datos, (i, item) => {
        let htmlTickets = ""
        $.each(item.entradas_planes, (i, ticket) => {
            htmlTickets +=
                `
            <div class="row row-lista mt-2">
                <div class="col-10 px-0">
                    <p>
                        <span><img loading="lazy" src="../imagen/nasbi-tickets/svg/Tickets-${ticket.nombre}.svg" alt="${ticket.nombre} - nasbi.com" /></span> Ticket ${ticket.nombre}
                    </p>
                </div>
                <div class="col-2 px-2">
                    <p class="text-right">${ticket.valor}</p>
                </div>
            </div>`
        });
        htmlPlan =
            `
        <div class="col-sm-6 col-md-4 px-md-1 px-lg-3 tarjet">
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
                        <button class="btn-nasbi-tickets-compra-plan">${idioma._trans428}</button>
                    </div>
                </div>
            </div>
        </div>`
        $('.tkc__content_planes').append(htmlPlan);
        $('.btn-nasbi-tickets-compra-plan').eq(i).off('click');
        $('.btn-nasbi-tickets-compra-plan').eq(i).click({ item }, tkc__opGeneraOrdenPagoPlan);
    });

}
function tkc__opGeneraOrdenPagoPlan($event) {

    return presentAlert("", idioma['trans_309'], "info");
    //De aquí en adelante esto esta en proceso por PASARELA DE PAGO.

    if (!validarText(user)) {
        // Proceso usuario [NO LOGEADO].
        $('#modal-tkc-nologeado').modal('show');
    } else {
        let item = $event.data.item;
        item.payu.description = idioma['_trans60'] + " " + item.nombre;
        toPayU(item.payu);

    }
}
function tkc_opVerificarPago(params) {
    let compras__aprobada = idioma['trans_141'];
    let compras__declinada = idioma['trans_142'];
    let compras__pendiente = idioma['trans_143'];
    let compras__status_generico = idioma['trans_144'];
    $('.modal__info__payu__status').hide();

    let dataEnvio = {
        "data": {
            "id": __orderItemAct.id,
            "uid": user.uid,
            "empresa": user.empresa
        }
    };

    let data_url = `${baseurl}/controllers/compras/?detalle_payu`;
    // $.ajax({
    //     type: "POST",
    //     url: data_url,
    //     data: dataEnvio,
    //     dataType: "json",
    //     success: result => {

    //         $('.modal__tkc__info__payu__status').show('slow');

    //         if (result['status'] == "success") {
    //             if (validarText(result.data.json)) {

    //                 result.data.json.state_pol *= 1;

    //                 if (result.data.json.state_pol == 4 && result.data.json.response_message_pol == "APPROVED") {
    //                     $('.modal__tkc__info__payu__status__text').text(compras__aprobada);
    //                     console.log("compras__aprobada: ", compras__aprobada);

    //                 } else if (result.data.json.response_message_pol == "PENDING") {
    //                     $('.modal__tkc__info__payu__status__text').text(compras__pendiente);
    //                     console.log("compras__pendiente: ", compras__pendiente);

    //                 } else {
    //                     $('.modal__tkc__info__payu__status__text').text(compras__declinada);
    //                     console.log("compras__declinada: ", compras__declinada);

    //                 }
    //             } else {
    //                 return presentAlertObject({ icon: 'error', text: idioma._trans06 });
    //             }
    //         } else {
    //             $('.modal__tkc__info__payu__status__text').text(compras__status_generico);
    //             console.log("compras__status_generico: ", compras__status_generico);
    //             $('.modal__tkc__info__payu__status').show('slow');
    //         }

    //     }, error: error => {
    //         console.log("error: ", error);

    //         $('.modal__tkc__info__payu__status').show('slow');
    //         $('.modal__tkc__info__payu__status__text').text(compras__status_generico);

    //     }
    // });
}
/*function tkc__compraComprarPlan(id) {
    let dataPlanes = {
        uid: user.uid,
        empresa: user.empresa,
        id: id,
        uso: 2
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
                tkc__alertaConfirmacion(idioma['_trans12'], idioma['_trans46']);

            } else {
                tkc__alertaConfirmacion(idioma['trans_04'], idioma['_trans06']);
            }

        }, error: error => {
            tkc__alertaConfirmacion(idioma['trans_04'], idioma['_trans06']);


        }
    });

}*/

function tkc__alertaConfirmacion(titulo, texto) {
    presentAlert(titulo, texto, "error");

}