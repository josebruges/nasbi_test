/*Actualicaciones modulo compras - sección devoluciones*/
//compras
const __compras_arraydelosestados = [
    { id: 1, text: idioma.trans07_, funcion: compras_optEsperandoConfirmacion, descripcion: idioma['trans_77'] },
    { id: 2, text: idioma.trans08_, funcion: compras_optOrdenDeclinadaPorComprador, descripcion: idioma['trans_78'] },
    { id: 3, text: idioma.trans09_, funcion: compras_opAdvertenciaPayU, descripcion: idioma['trans_79'] },

    { id: 4, text: idioma.trans10_, funcion: compras_optvolverSubirComprobante, descripcion: idioma['trans_80'] },
    { id: 5, text: idioma.trans11_, funcion: compras_VerComprobante, descripcion: idioma['trans_81'] },
    { id: 6, text: idioma.trans12_, funcion: compras_infoEsperaEnvio, descripcion: idioma['trans_82'] },
    { id: 7, text: idioma.trans13_, funcion: compras_esperandoConfirmacion, descripcion: idioma['trans_306'] },
    { id: 8, text: idioma.trans14_, funcion: compras_esperandoConfirmacion, descripcion: idioma['trans_298'] },
    { id: 9, text: idioma.trans15_, funcion: compras_infoProcesoDevolucion, descripcion: idioma['trans_85'] },
    { id: 10, text: idioma.trans16_, funcion: compras_infoNoConcretada, descripcion: idioma['trans_86'] },
    { id: 11, text: idioma.trans17_, funcion: compras_openModaCalificarVendedor, descripcion: idioma['trans_308'] }, // Antes trans_87
    { id: 12, text: idioma.trans19_, funcion: "", descripcion: idioma['trans_331'] },
    { id: 13, text: idioma.trans18_, funcion: "", descripcion: idioma['trans_88'] }
];
var __compras_list = [];
var __orderItemAct = {};
var __imgComprobanteDefault = "../imagen/logo-mtd.png";
var compras__rutaSeleccionada = "../imagen/logo-mtd.png";

let mis_cuentas = localStorage.getItem("mis_cuentas");
if (("" + mis_cuentas).includes('.sidenav_compras') || ("" + mis_cuentas).includes('id-compras')) {
    $(mis_cuentas).click();
    initCompras();

}
$(document).ready(($event) => {
    $('.sidenav_compras').click(($event) => {
        //localStorage.setItem("mis_cuentas", ".sidenav_compras");
        redirigir_opcion_mis_cuentas(".sidenav_compras"); //esta funcion esta en resumen 
        initCompras();

    });
    $('.actualizar__content__btn').click(($event) => {
        initCompras();
    });

    $("#modal-compras-timeline-detalle-orden").on('shown.bs.modal', ($event) => {
        compras_timeLineShow(__orderItemAct);
    });

    /*$("#modal-compras-comprobante-esperando-comfirm-vendedor").on('shown.bs.modal', ($event) => {});*/
    $("#modal-compras-declinada-por-vendedor").on('shown.bs.modal', ($event) => { });

    $('.compras_adjuntar_comprobante_btn').click(($event) => {
        compras_sendComprobante();
    });
    $('.compras_volver_adjuntar_comprobante_btn').click(($event) => {
        compras_volverSendComprobante();
    });

    // $('.compras__confirm__recepcion__llegomal').click(($event) => {
    //     compras_confirmarRecepcionLlegoMal();
    // });
    $('.compras__confirm__recepcion__llegobien').click(($event) => {
        compras_confirmarRecepcionLlegoBien();
    });
    $('.compras__calificar__vendedor__btn').click(($event) => {
        $(".spiner_calificar_vendedor").show()
        let params = {
            "id": __orderItemAct.id,
            "uid": user.uid,
            "empresa": user.empresa,
            "estado": __orderItemAct.estado,
            "id_carrito": __orderItemAct.id_carrito,

            "buena_atencion": ($('input[name=estrellas1]:checked').val() * 1),
            "tiempo_entrega": ($('input[name=estrellas2]:checked').val() * 1),
            "fidelidad_producto": ($('input[name=estrellas3]:checked').val() * 1),
            "satisfaccion_producto": ($('input[name=estrellas4]:checked').val() * 1),

            "descripcion": $('.compras__calificar__vendedor__descrip').val()
        };
        compras_CalificarVendedorValidate(params);
    });


    $('.compras__proceso__devolucion__contact').click(($event) => {
        // OPEN CHAT
    });
    $('.compras__proceso__devolucion__devolucion_shippo').click(($event) => {
        compras_opcionesEnviarDevolucion(1);
    });
    $('.compras__proceso__devolucion__devolucion_normal').click(($event) => {
        compras_opcionesEnviarDevolucion(2);
    });
    $('.compras__proceso__devolucion__devolver').click(($event) => {
        console.log("devolviendo orden.");
        compras__proceso__devolucion__devolver();
    });

    $('.compras__realizarenvio__shippo').click(($event) => {

        console.log("compras__rutaSeleccionada: ", compras__rutaSeleccionada);
        if (compras__rutaSeleccionada) {
            if (compras__rutaSeleccionada.shipment) {
                compras_enviarDevolucionShippo();
            }
        }
    });

    $('.compras__realizarenvio__normal').click(($event) => {
        compras_enviarDevolucionNormal();
    });
});
function cammbio_opcion_filter_estados(estado_seleccionado) {
    if (estado_seleccionado != 0) {
        let name_opcion = __compras_arraydelosestados.filter(estado => estado.id == estado_seleccionado)[0];
        $('.seleccionado_filter').text(name_opcion.text);
    } else {
        $('.seleccionado_filter').text(idioma.trans_47);
    }
    getCompras(1, estado_seleccionado);
    $('.content__loadingSpinner').show();
}
function cargaropciones_estado_filtro() {
    $('.content_select').html(`<select class="menu_opciones_estado" ></select>`);
    $('.menu_opciones_estado').html("");
    for (let index = 0; index <= 13; index++) {
        let button_option
        if (index == 0) {
            button_option = `<option value=${index}>${idioma.trans_47}</option>`;
            $('.menu_opciones_estado').append(button_option);
        } else {
            let name_opcion = __compras_arraydelosestados.filter(estado => estado.id == index)[0];
            button_option = `<option  value=${index}>${name_opcion.text}</option>`;
            $('.menu_opciones_estado').append(button_option);
        }
    }
    $('.menu_opciones_estado').selectpicker({
        size: 7
    });
    $('.menu_opciones_estado').off('click'); //el filtro de compras 
    $('.menu_opciones_estado').on('click', null, function () {
        let value = $('.menu_opciones_estado')[1].value;
        cammbio_opcion_filter_estados(value);
    });
}
function initCompras() {
    compras_paramsURL = getParamsFilterProductsURL();
    console.log("__compras_arraydelosestados::: ", __compras_arraydelosestados);
    cargaropciones_estado_filtro();
    getCompras();
    $('.content__loadingSpinner').show();
}
function getCompras(pagina = 1, estado = 0) {
    let datos

    if (estado == 0) {
        datos = {
            "uid": user.uid,
            "empresa": user.empresa,
            "pagina": pagina
        };
    } else {
        datos = {
            "uid": user.uid,
            "empresa": user.empresa,
            "pagina": pagina,
            "estado": estado,
        };
    }

    let data_url = `${baseurl}/controllers/compras/?mis_compras`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": datos },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $('.content__loadingSpinner').hide();

            if (success["status"] == "success") {
                $('.list__nodata_compra').hide("fast");
                $('.content__list__compras').show("slow");
                $(".tabla_compras").show("slow")
                $('.content__list__compras__pagination').show("slow");
                compras_pusList(success);
            } else {
                $('.list__compras').html("");
                $('.content__loadingSpinner').hide();
                $('.list__nodata_compra').show("slow");
                $(".tabla_compras").hide("slow")
                $('.content__list__compras__pagination').hide("slow");
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) { }

            }
        }, error: error => {
            $('.list__compras').html("");
            $('.content__loadingSpinner').hide();
            $(".tabla_compras").hide("slow")
            $('.content__list__compras__pagination').hide("slow");
            $('.list__nodata_compra').show("slow");

        }
    });
}
function compras_pusList(listacompras) {
    __compras_list = listacompras.data;
    console.log("::::__compras_list= ", __compras_list);
    $('.list__compras').html("");
    let count = 0;

    let array_items_a_mostrar = [];

    let comprasKeys = Object.keys(listacompras.data).reverse();
    console.log(comprasKeys, "mmmmmm");
    for (let x of comprasKeys) {
        let index = x;
        let item2 = listacompras.data[x];

        console.log("\n\n");
        console.log(" DATA |----*> [ index ]: ", index);
        console.log(" DATA |----*> [ item2 ]: ", item2);
        let imgCompra = "../imagen/Nivelcero.png";

        for (let x in item2.productos) {
            var item = item2.productos[x];
            let schemaStatus = compras_getEstados(item.estado);

            let labelComprador1er = "";
            let labelComprador2do = "";
            if (validarText(item.datos_usuario_vendedor.empresa)) {
                labelComprador1er = item.datos_usuario_vendedor.empresa;
            } else if (validarText(item.datos_usuario_vendedor.nombre)) {
                if (labelComprador1er == "") {
                    labelComprador1er = item.datos_usuario_vendedor.nombre;
                } else {
                    labelComprador2do = " (" + item.datos_usuario_vendedor.nombre + " )";
                }
            } else { }

            let labelInfo = "";
            if (item.timeline) {
                try {
                    let timeLineItem = item.timeline[item.timeline.length - 1];

                    let schemaStep = __compras_arraydelosestados[timeLineItem.estado - 1];
                    let fecha_con_hora_compras = getFechaConHoraV2(1 * item.fecha_actualizacion);
                    if (true) { }
                    labelInfo = `<p style="cursor: pointer;" data-toggle="tooltip" data-placement="top" title= "${fecha_con_hora_compras}: ${schemaStep.descripcion}" ><b>${fecha_con_hora_compras}: </b> ${schemaStep.descripcion}</p>`;
                    console.log(item.fecha_actualizacion, "fechaaaaaaaa", getFechaConHoraV2(1 * item.fecha_actualizacion));
                } catch (ex) {

                }
            }

            item.contador_chat = (item.contador_chat ? item.contador_chat : 0);
            let indicadorHTML = "";
            if (item.contador_chat > 0) {
                indicadorHTML = `<span class="badge notif_chat${item.id}">${item.contador_chat}</span>`;
            } else {
                indicadorHTML = `<span style="display:none;" class="badge notif_chat${item.id}">0</span>`;
            }

            let opcionesAdicionales = "";
            if (item.estado < 12) {
                opcionesAdicionales = `<a class="dropdown-item compras_opCompra">${schemaStatus.text}</a>`;
            } else {
                opcionesAdicionales = `<a class="dropdown-item compras_opCompra d-none"></a>`;
            }

            let valor_para_la_moneda = ` <td class="td-border">
            ${ (item2.total_bd > 0) ? "<p>" + item2.total_bd_mask + " " + getCoinLabelSymbol("Nasbiblue") + "</p>" : ""}
            ${ (item2.total_sd > 0) ? "<p>" + item2.total_sd_mask + " " + getCoinLabelSymbol("Nasbigold") + "</p>" : ""}
            ${ (item2.total_fiat > 0) ? "<p>" + item2.total_fiat_mask + " " + getCoinLabelSymbol(item.moneda_fiat) + "</p>" : ""}
            </td>`

            let cantidad_productos = getCountArticles(item2.productos);

            array_items_a_mostrar.push({ position: count, titulo: item.titulo, img: imgCompra, id_carrito: item.id_carrito, camtidad_product: cantidad_productos, info: labelInfo, valores: valor_para_la_moneda, comprador1: labelComprador1er, labelComprador2do, indicadorHTML, opcionesAdicionales, fecha_time: item.fecha_actualizacion });

            let htmlInject =
                `<tr>
                    <td class="td-name1" data-toggle="tooltip" data-placement="bottom">
                        <div class="row">
                            <div class="col-3 px-2">
                                <div class="containerimg-compra">
                                    <img loading="lazy" src=${imgCompra} class="img-compra" alt="${item.titulo} - nasbi.com">
                                </div>
                            </div>
                            <div class="col-9 px-2">
                                <div class="content-img-comp">
                                    <p class=""><span class="txt-numb">Ref: #${item.id_carrito}</span></p>
                                    <p class="name"><span class="txt-numb">${idioma._trans319}: (${cantidad_productos})</span></p>
                                    ${labelInfo}
                                </div>
                            </div>
                        </div>
                    </td>
                    ${valor_para_la_moneda}
                   
                    <td data-toggle="tooltip" data-placement="bottom" title="${labelComprador1er} ${labelComprador2do} ">
                        <p class="name-001"><b>${labelComprador1er}</b> <span>${labelComprador2do}</span></p>
                        <a class="abrir_chat_compras">
                            <p class="ver-conver "><b>${idioma._trans331} ${indicadorHTML}</b> </p>
                        </a>
                    </td>
                    <td>
                        <div class="dropdown divdropdownfiltro">
                            <button class="drop-filtro drop-table dropdown-toggle" type="button" id="opciones" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-toggle="tooltip" data-placement="bottom" title="${schemaStatus.text}">${idioma._trans332.toUpperCase()}</button>
                            <div class="dropdown-menu" aria-labelledby="opciones">
                                <a class="dropdown-item compras_timelineVentas">${idioma.trans137}</a>
                                ${opcionesAdicionales}
                            </div>
                        </div>
                    </td>
                </tr>`;
            $('.list__compras').append(htmlInject);

            item.indexArr = count;
            const dataCarritoFull = {
                "total_bd": item2.total_bd,
                "total_sd": item2.total_sd,
                "total_fiat": item2.total_fiat,
                "total_bd_mask": item2.total_bd_mask,
                "total_sd_mask": item2.total_sd_mask,
                "total_fiat_mask": item2.total_fiat_mask,
                "productos": item2.productos
            };

            item.dataCarritoFull = dataCarritoFull;

            $(".abrir_chat_compras").eq(count).off('click');
            $(".abrir_chat_compras").eq(count).on('click', { item, productos: item2.productos }, abrirChat);

            $('.compras_timelineVentas').eq(count).off('click');
            $('.compras_timelineVentas').eq(count).on('click', { item }, compras_timeLine);

            $('.compras_opCompra').eq(count).off('click');
            $('.compras_opCompra').eq(count).on('click', { item }, schemaStatus.funcion);
            ++count;
            break;
        }
    }

    console.log(array_items_a_mostrar, "arrayyyyyyy, mmmmm");
    //show_items_a_organizar_porfecha
    let paramsPagination = {
        total_paginas: listacompras.total_paginas,
        pagina: listacompras.pagina
    };
    let result = generatePaginations(paramsPagination);
    $('.content__list__compras__pagination').html(result);
    $('html, body').animate({ scrollTop: 0 }, 500);
}
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};
function compras_getEstados(estado = 0) {

    if ((estado - 1) >= 0 && estado - 1 < __compras_arraydelosestados.length) {
        return __compras_arraydelosestados[estado - 1];

    } else {
        return { id: 0, text: "undefined-jb", funcion: "" };
    }
}
function compras_optEsperandoConfirmacion($event) {
    // El cliente esta esperando que el vendedor decida: Aceptar o rechazar su orden de compra.
    __orderItemAct = $event.data.item;

    $('#modal-compras-confirmacion-de-vendedor').modal("show");
}
function compras_optOrdenDeclinadaPorComprador($event) {
    // El vendedor decidio rechazar mi orden de compra.
    let item = $event.data.item;
    __orderItemAct = $event.data.item;

    $('.compras_declinada_content').hide();
    $('.compras_declinada_content_skeletons').show();

    $('#modal-compras-declinada-por-vendedor').modal("show");
    $('.compras_declinada_content').show();
    $('.compras_declinada_content_skeletons').hide();
    $('.compras_declinada_motivo_newOrder').attr('href', `producto.php?uid=${item.id_producto}`);

    console.log("item: ", item);
    console.log("item: ", item);
    console.log("item: ", item);
    console.log("item: ", item);
    console.log("item: ", item);
    console.log("item: ", item);
    console.log("item: ", item);

    $('.compras_declinada_motivo').text(`"${(item.detalle_rechazada ? item.detalle_rechazada.descripcion : "...")}"`);

    $('.compras__declinada__noconcretado__content').hide();
    if (item.estado == __compras_arraydelosestados[9].id) {
        // verifica si se encuentrá en estado, no concretada.
        $('.compras__declinada__noconcretado__content').show('slow');
    } else {
        compras_noConcretado(item);
    }
}
function compras_opAdvertenciaPayU($event) {

    $('.modal__info__payu__status').hide();
    $('#modal-compras-info-payu').modal('show');

    $('.modal__info__payu__toPayU').show('slow');

    __orderItemAct = $event.data.item;
    let item = __orderItemAct;
    // $('.modal__info__payu').click({ item }, compras_opVerificarPago);
    $('.modal__info__payu').off('click');
    $('.modal__info__payu').on('click', { item }, compras_opVerificarPago);

    $('.modal__info__payu__toPayU').click({ item }, compras_optSubirComprobante);
}
function compras_opVerificarPago($event) {

    /*__orderItemAct = $event.data.item;
    if ( __orderItemAct.payu.isApprovedStatus ) {
        return;
    }*/

    let compras__aprobada = idioma['trans_141'];
    let compras__declinada = idioma['trans_142'];
    let compras__pendiente = idioma['trans_143'];
    let compras__status_generico = idioma['trans_144'];

    $('.modal__info__payu__status').hide();

    let dataEnvio = {
        "data": {
            "id": __orderItemAct.id,
            "uid": user.uid,
            "empresa": user.empresa,
            "id_carrito": __orderItemAct.id_carrito
        }
    };

    let data_url = `${baseurl}/controllers/compras/?detalle_payu`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: dataEnvio,
        dataType: "json",
        success: result => {

            $('.modal__info__payu__status').show('slow');

            if (result['status'] == "success") {
                if (validarText(result.data.json)) {

                    result.data.json.state_pol *= 1;

                    if (result.data.json.state_pol == 4 && result.data.json.response_message_pol == "APPROVED") {
                        $('.modal__info__payu__status__text').text(compras__aprobada);
                        console.log("compras__aprobada: ", compras__aprobada);
                        $('.modal__info__payu__toPayU').hide('slow');

                        __orderItemAct.payu.isApprovedStatus = true;
                        initCompras();

                    } else if (result.data.json.response_message_pol == "PENDING") {
                        $('.modal__info__payu__status__text').text(compras__pendiente);
                        console.log("compras__pendiente: ", compras__pendiente);

                    } else {
                        $('.modal__info__payu__status__text').text(compras__declinada);
                        console.log("compras__declinada: ", compras__declinada);

                    }
                } else {
                    return presentAlertObject({ icon: 'error', text: idioma._trans06 });
                }
            } else {
                $('.modal__info__payu__status__text').text(compras__status_generico);
                console.log("compras__status_generico: ", compras__status_generico);
                $('.modal__info__payu__status').show('slow');
            }

        }, error: error => {
            console.log("error: ", error);

            $('.modal__info__payu__status').show('slow');
            $('.modal__info__payu__status__text').text(compras__status_generico);

        }
    });
}
function compras_optSubirComprobante($event) {
    __orderItemAct = $event.data.item;
    /*$('.compras_adjuntar_comprobante_description').val("");
    $('.compras_adjuntar_comprobante_img').attr("src", __imgComprobanteDefault);
    $('#modal-compras-adjuntar-comprobante').modal("show");
    $('.compras_adjuntar_comprobante_erros').text("");

    $('.compras_adjuntar_comprobante_btn__spinner').hide();
    $(".compras_adjuntar_comprobante_btn").attr("disabled", false);*/

    if (__orderItemAct.payu) {
        /*let paramsPayU = __orderItemAct.payu;*/

        toPayU(__orderItemAct.payu);

        /*$('.payU__merchantId').val( paramsPayU.merchantId );
        $('.payU__accountId').val( paramsPayU.accountId );
        $('.payU__description').val( paramsPayU.description );
        $('.payU__referenceCode').val( paramsPayU.referenceCode );
        $('.payU__extra1').val( paramsPayU.extra1 );
        $('.payU__amount').val( paramsPayU.amount );
        $('.payU__tax').val( paramsPayU.tax );
        $('.payU__taxReturnBase').val( paramsPayU.taxReturnBase );
        $('.payU__currency').val( paramsPayU.currency );
        $('.payU__signature').val( paramsPayU.signature );
        $('.payU__test').val( paramsPayU.test );
        $('.payU__lng').val( idioma );
        $('.payU__buyerFullName').val( paramsPayU.buyerFullName );
        $('.payU__buyerEmail').val( paramsPayU.buyerEmail );
        $('.payU__responseUrl').val( paramsPayU.responseUrl );
        $('.payU__confirmationUrl').val( paramsPayU.confirmationUrl );


        console.log("$('#payuDataFrom').val(): ", $('#payuDataFrom').html());
        
        $('#payuDataFrom').submit();*/
    }
}
function compras_isValidComprobante(params = {}) {
    isValidForm = {
        status: 0,
        message: "success"
    }
    if (params.foto.includes(__imgComprobanteDefault)) {
        return {
            status: 1,
            message: "No has adjuntado tu comprobante de pago"
        };
    }

    $('.compras_adjuntar_comprobante_erros').text("");

    return isValidForm;
}
function compras_sendComprobante() {
    $('.compras_adjuntar_comprobante_btn__spinner').show();
    $(".compras_adjuntar_comprobante_btn").attr("disabled", true);

    let params = {
        "id": __orderItemAct.id,
        "uid": user.uid,
        "estado": __orderItemAct.estado,
        "descripcion": $('.compras_adjuntar_comprobante_description').val(),
        "foto": $('.compras_adjuntar_comprobante_img').attr("src"),
        "id_carrito": __orderItemAct.id_carrito
    };

    let resultFom = compras_isValidComprobante(params);


    if (resultFom.status > 0) {
        $('.compras_adjuntar_comprobante_erros').text(resultFom.message);

        $('.compras_adjuntar_comprobante_btn__spinner').hide();
        $(".compras_adjuntar_comprobante_btn").attr("disabled", false);
    } else {
        let data_url = `${baseurl}/controllers/compras/?subir_foto_comprobante`;
        $.ajax({
            type: "POST",
            url: data_url,
            data: { "data": params },
            dataType: "json",
            success: result => {
                $('.compras_adjuntar_comprobante_btn__spinner').hide();
                $(".compras_adjuntar_comprobante_btn").attr("disabled", false);



                if (result['status'] == "success") {
                    $('#modal-compras-adjuntar-comprobante').modal('hide');
                    getCompras();
                } else {
                    $('.compras_adjuntar_comprobante_erros').text("No fue posible adjuntar tu comprobante de pago.");
                }
            }, error: error => {


                $('.compras_adjuntar_comprobante_btn__spinner').hide();
                $(".compras_adjuntar_comprobante_btn").attr("disabled", false);
                $('.compras_adjuntar_comprobante_erros').text("No fue posible adjuntar tu comprobante de pago.");
            }
        });
    }
}
function compras_VerComprobante($event) {
    __orderItemAct = $event.data.item;
    $('.compras_comprobante_de_pago_img').html(`
        <div class="foto-producto-modal anchor-tag">
            <a href="${__orderItemAct.detalle_pago.url}">
                <img loading="lazy" class="img-producto-modal" src="${__orderItemAct.detalle_pago.url}" alt="${idioma.trans102} ${__orderItemAct.titulo}- nasbi.com">
            </a>
        </div>
        <h5>${__orderItemAct.titulo}</h5>
    `);
    $('.anchor-tag').lightGallery({
        download: false
    });

    $('#modal-compras-comprobante-esperando-comfirm-vendedor').modal('show');
}
/*Probar estado declinado de la orden estado: 4*/
function compras_optvolverSubirComprobante($event) {
    __orderItemAct = $event.data.item;
    $('.compras_volver_adjuntar_comprobante_description').val("");
    $('#modal-compras-volver-adjuntar-comprobante').modal("show");

    if (__orderItemAct.contador == 2) {
        $('.compras_volver_adjuntar_comprobante_nota').show('slow');
    } else {
        $('.compras_volver_adjuntar_comprobante_nota').hide();
    }

    $('.compras_volver_adjuntar_comprobante_erros').text("");
    $('.compras_volver_adjuntar_comprobante_motivo').text(__orderItemAct.detalle_pago.descripcion_declinado);
    $('.compras_volver_adjuntar_comprobante_img').attr('src', __orderItemAct.detalle_pago.url);

    $('.compras_volver_adjuntar_comprobante_btn__spinner').hide();
    $(".compras_volver_adjuntar_comprobante_btn").attr("disabled", false);
}
function compras_volverisValidComprobante(params = {}) {
    isValidForm = {
        status: 0,
        message: "success"
    }
    if (params.foto.includes(__imgComprobanteDefault)) {
        return {
            status: 1,
            message: idioma['_trans328']
        };
    }

    $('.compras_volver_adjuntar_comprobante_erros').text("");

    return isValidForm;
}
function compras_volverSendComprobante() {
    $('.compras_volver_adjuntar_comprobante_btn__spinner').show();
    $(".compras_volver_adjuntar_comprobante_btn").attr("disabled", true);

    let params = {
        "id": __orderItemAct.id,
        "uid": user.uid,
        "estado": __orderItemAct.estado,
        "descripcion": $('.compras_volver_adjuntar_comprobante_description').val(),
        "foto": $('.compras_volver_adjuntar_comprobante_img').attr("src"),
        "id_carrito": __orderItemAct.id_carrito
    };

    let resultFom = compras_volverisValidComprobante(params);


    if (resultFom.status > 0) {
        $('.compras_volver_adjuntar_comprobante_erros').text(resultFom.message);

        $('.compras_volver_adjuntar_comprobante_btn__spinner').hide();
        $(".compras_volver_adjuntar_comprobante_btn").attr("disabled", false);
    } else {
        let data_url = `${baseurl}/controllers/compras/?subir_foto_comprobante`;
        $.ajax({
            type: "POST",
            url: data_url,
            data: { "data": params },
            dataType: "json",
            "headers": { 'x-api-key': user.token },
            success: async result => {
                $('.compras_volver_adjuntar_comprobante_btn__spinner').hide();
                $(".compras_volver_adjuntar_comprobante_btn").attr("disabled", false);

                if (result['status'] == "success") {
                    $('#modal-compras-volver-adjuntar-comprobante').modal('hide');
                    getCompras();

                } else {
                    let validate_token = await erroresTokenEmpresa(result);
                    if (!validate_token) $('.compras_volver_adjuntar_comprobante_erros').text(idioma['_trans329']);

                }
            }, error: error => {


                $('.compras_volver_adjuntar_comprobante_btn__spinner').hide();
                $(".compras_volver_adjuntar_comprobante_btn").attr("disabled", false);
                $('.compras_volver_adjuntar_comprobante_erros').text(idioma['_trans329']);
            }
        });
    }
}
/* '6', 'Espera de envío' */
function compras_infoEsperaEnvio($event) {
    __orderItemAct = $event.data.item;
    switch (__orderItemAct.caso_especial) {
        case 0:
            $('#modal-compras-espera-de-envio-vendedor').modal('show');

            break;
        case 1:
            $(".modal_imagen__producto").attr('src', __orderItemAct.foto_portada)
            $('#modal-compras-caso-especial-1').modal('show');
            $(".compra_abrir_chat_modal").off()
            $(".compra_abrir_chat_modal").on("click", { item: __orderItemAct }, abrirChat)
            $(".btn_cancelar_compra").off()
            $(".btn_cancelar_compra").on("click", { data: __orderItemAct }, comprar_cancelarCompra)

            break;
    }

}
function comprar_cancelarCompra(ev) {
    let infoItem = ev.data.data;
    var motivo = $(".cancelar_input_motivo").val();
    if (!validarText(motivo)) return confirmarProceso(idioma['trans_04'], idioma['trans86'])
    $(".spiner_cancelar_compra").show()
    let dataCancelar = {
        "id": infoItem.id,
        "uid": user.uid,
        "empresa": user.empresa,
        "estado": infoItem.estado,
        "descripcion": motivo,
        "id_carrito": infoItem.id_carrito
    }
    let data_url = baseurl + "/controllers/compras/?reportar_compra";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataCancelar }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $(".spiner_cancelar_compra").hide()
            $('#modal-cancelar-compra').modal('hide');
            if (success["status"] == "success") {
                confirmarProceso(idioma['_trans12'], idioma['_trans419'])
                getCompras();

            } else {

                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) confirmarProceso(idioma['trans_04'], idioma['_trans06'])


            }

        }, error: error => {
            $(".spiner_cancelar_compra").hide()
            confirmarProceso(idioma['trans_04'], idioma['_trans06'])


        }
    });

}

/* '7', 'Confirmar recepción' */
function compras_esperandoConfirmacion($event) {
    __orderItemAct = $event.data.item;
    console.log(__orderItemAct, "dataaaaa ordeeeen");

    /*$('.compras__confirm__recepcion__descripcion').val( "" );*/


    console.log("\n\n\n\n\n");
    console.log("\t [ __orderItemAct.envio ]: ", __orderItemAct.envio);
    console.log("\t [ __orderItemAct.envio ]: ", __orderItemAct.envio);
    console.log("\t [ __orderItemAct.envio ]: ", __orderItemAct.envio);
    console.log("\t [ __orderItemAct.envio ]: ", __orderItemAct.envio);
    console.log("\t [ __orderItemAct.envio ]: ", __orderItemAct.envio);
    console.log("\t [ __orderItemAct.envio ]: ", __orderItemAct.envio);
    console.log("\t [ __orderItemAct.envio ]: ", __orderItemAct.envio);
    console.log("\t [ __orderItemAct.envio ]: ", __orderItemAct.envio);
    console.log("\t [ __orderItemAct.envio ]: ", __orderItemAct.envio);
    console.log("\t [ __orderItemAct.envio ]: ", __orderItemAct.envio);
    console.log("\n\n");
    try {
        $('.compras__confirm__recepcion__empresa').text(__orderItemAct.envio.empresa);
        $('.compras__confirm__recepcion__numguia').text(__orderItemAct.envio.numero_guia);
        if (__orderItemAct.tipo != envio.acordar_comprador) {
            $('.compras__confirm__recepcion__content__urlguia').show();
            $('.compras__confirm__recepcion__urlguia').attr('href', __orderItemAct.envio.url_numero_guia)
        } else {
            $('.compras__confirm__recepcion__content__urlguia').hide();
        }

        $('#modal-compras-Confirmar-recepcion').modal('show');
        $(".compras__confirm__recepcion__llegomal").off('click')
        $(".compras__confirm__recepcion__llegomal").on('click', { data: __orderItemAct }, compras_confirmarRecepcionLlegoMal)

        $(".abrir_chat_compras_dos").off('click');

        $(".abrir_chat_compras_dos").on('click', { item: __orderItemAct }, abrirChat);
    } catch (ex) {
        console.log(ex);
    }

}
function compras_confirmarRecepcionLlegoMal(ev) {
    //__orderItemAct
    $('#modal-compras-Confirmar-recepcion').modal('hide');
    $('#modal-reclamar').modal('show');
    $('.input_reclamo_evidencia').off('change');
    $('.input_reclamo_evidencia').on('change', compras_convertBase64);
    $('.btn_enviar_reclamo').off()
    $('.btn_enviar_reclamo').on('click', { data: ev.data.data }, compras__enviar_reclamo)

}
function compras__enviar_reclamo(ev) {
    let infoItem = ev.data.data;
    let dataReclamo;
    var motivo = $('.reclamo_input_motivo').val()
    var foto_evidencia = $('.img_modal_evidencia').attr('src')

    if (!validarText(motivo)) return confirmarProceso(idioma['trans_04'], idioma['trans86'])

    if (foto_evidencia == "../imagen/product.jpg") {
        return confirmarProceso(idioma['trans_04'], idioma['_trans951'])
    }
    $(".spiner_enviar_reclamo").show()


    dataReclamo = {
        "id": infoItem.id,
        "uid": user.uid,
        "empresa": user.empresa,
        "estado": infoItem.estado,
        "descripcion": motivo,
        "foto": foto_evidencia,
        "id_carrito": infoItem.id_carrito
    }


    let data_url = baseurl + "/controllers/compras/?reportar_compra";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataReclamo }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $(".spiner_enviar_reclamo").hide()
            $('#modal-reclamar').modal('hide');
            if (success["status"] == "success") {
                confirmarProceso(idioma['_trans12'], idioma['_trans418'])
                getCompras();

            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) confirmarProceso(idioma['trans_04'], idioma['_trans06'])


            }

        }, error: error => {
            $(".spiner_enviar_reclamo").hide()
            confirmarProceso(idioma['trans_04'], idioma['_trans06'])


        }
    });

}

function compras_opcionesEnviarDevolucion(opDevolucion = 1) {
    paisesJSON = JSON.parse(localStorage.getItem('paises'));
    const pais = paisesJSON.filter(datos => datos.country_id == __orderItemAct.envio.vendedor_pais)[0];
    const departamento = pais.departamento.filter(datos => datos.zone_id == __orderItemAct.envio.vendedor_departamento)[0];
    delete (pais.departamento);

    $('.vendedor__enviopais').html(pais.pais_name);
    $('.vendedor__enviodep').html(departamento.name);
    $('.vendedor__enviociudad').html(__orderItemAct.envio.vendedor_ciudad);
    $('.vendedor__enviocodigopostal').html(__orderItemAct.envio.vendedor_codigo_postal);
    $('.vendedor__enviodirecion').html(__orderItemAct.envio.vendedor_direccion);

    if (opDevolucion == 1) {
        compras_rutasEnvioShippo(__orderItemAct);
        $('#modal-compras-proceso-devolucion-adjuntar-guia').modal("show");
    } else {
        $('.compras__numero_guia').text('');
        $('.compras__empresa_envio').text('');
        $('#modal-compras-proceso-devolucion-adjuntar-guia-normal').modal("show");
    }
}
function compras_rutasEnvioShippo(__orderItemAct) {
    let dataEnviar = {
        data: {
            id: __orderItemAct.id,
            uid: user.uid,
            empresa: user.empresa,
            estado: __orderItemAct.estado,
            id_carrito: __orderItemAct.id_carrito
        }
    };
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/compras/?rutas_envio`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        if (res.status != 'success') {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) { }
            $('.compras__rutasenvio').empty();
            return presentAlertObject({ icon: 'error', text: idioma.trans152 });
        }

        res.data = res.data.map(data => {
            if (!validarText(data.amount)) data.amount = 0;
            if (!validarText(data.estimated_days)) data.estimated_days = 30;
            return data;
        });

        let rutas = ordenar(res.data, 'amount', 'ASC');
        let lamasbarata = rutas.splice(0, 1);
        let lasmasrapidas = rutas;
        if (rutas.length > 1) lasmasrapidas = ordenar(lasmasrapidas, 'estimated_days', 'ASC');
        console.log('lamasbarata', lamasbarata);
        console.log('lasmasrapidas', lasmasrapidas);
        console.log('lamasbarata y lasmasrapidas', lamasbarata.concat(lasmasrapidas));
        rutasDisponibles = lamasbarata.concat(lasmasrapidas);
        llenarRutasEnvio();
        compras__rutaSeleccionada = rutasDisponibles[0];

    }).fail((err) => {
        $('.compras__rutasenvio').empty();
        presentAlertObject({ icon: 'error', text: idioma.trans152 });
    });
}
function llenarRutasEnvio() {
    $('.compras__rutasenvio').empty();
    let texthead = '',
        checked = '',
        diasestimados = '';
    for (const x in rutasDisponibles) {
        const ruta = rutasDisponibles[x];
        texthead = '';
        checked = '';
        diasestimados = validarText(ruta.estimated_days) ? ruta.estimated_days : '30';
        if (x == 0) texthead = `<p class="label1">${idioma.trans82}</p>`, checked = 'checked';
        if (x == 1) texthead = `<p class="label1">${idioma.trans83}</p>`;
        if (x == 2) texthead = `<p class="label1">${idioma.trans84}</p>`;
        $('.compras__rutasenvio').append(`
            ${texthead}
            <div class="card w-100 mt-1 mb-2">
                <div class="card-body p-0 pt-2 pb-2">
                    <div class="row">
                        <div class="col-6 col-sm-6 col-md-6 col-lg-1 col-xl-1">
                            <input type="radio" name="carrier" class="form-control radio-envio" ${checked}>
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2">
                            <img loading="lazy" src="${ruta.provider_image_75}" alt="${ruta.provider}- nasbi.com">
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <span class="card-text tipo-carrier">${ruta.servicelevel.name}</span>
                            <span class="card-text tipo-carrier">(${diasestimados} ${idioma.trans81})</span>
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                            <span class="card-text precio-carrier font-weight-light">$${formatNumberUsd(ruta.amount_local)} ${ruta.currency_local}</span>
                        </div>
                    </div>
                </div>
            </div>
        `);
        $('input[name="carrier"]').eq(x).off('click');
        $('input[name="carrier"]').eq(x).on('click', { ruta }, activarRuta);
    }
}
function activarRuta(e) {
    compras__rutaSeleccionada = e.data.ruta;
}
function compras_enviarDevolucionShippo() {

    let dataEnviar = {
        "data":
        {
            "id": __orderItemAct.id,
            "uid": user.uid,
            "empresa": user.empresa,
            "estado": __orderItemAct.estado,
            "id_envio": compras__rutaSeleccionada.shipment,
            "id_ruta": compras__rutaSeleccionada.object_id,
            "id_carrito": __orderItemAct.id_carrito
        }
    };

    console.log("compras__rutaSeleccionada: ", compras__rutaSeleccionada);
    $('#modal-compras-proceso-devolucion-adjuntar-guia').modal('hide');

    let data_url = `${baseurl}/controllers/compras/?devolucion_producto`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: dataEnviar,
        dataType: "json",
        success: datos => {
            getCompras();
        }, error: error => { }
    });
}
function compras_enviarDevolucionNormal() {

    console.log("paso 1");

    if ($('.compras__numero_guia').val().trim().length == 0 || $('.compras__empresa_envio').val().trim().length == 0) {
        $('.compras__error__msg').show('slow');
        console.log("paso 2");
    } else {
        console.log("paso 3");
        $('.compras__error__msg').hide('slow');
        $('#modal-compras-proceso-devolucion-adjuntar-guia-normal').modal('hide');

        let dataEnviar = {
            "data":
            {
                "id": __orderItemAct.id,
                "uid": user.uid,
                "empresa": user.empresa,
                "estado": __orderItemAct.estado,
                "empresa_envio": $('.compras__numero_guia').val().trim(),
                "numero_guia": $('.compras__empresa_envio').val().trim(),
                "id_carrito": __orderItemAct.id_carrito
            }
        }
        let data_url = `${baseurl}/controllers/compras/?devolucion_producto`;
        $.ajax({
            type: "POST",
            url: data_url,
            data: dataEnviar,
            dataType: "json",
            success: datos => {
                getCompras();
                console.log("paso 4: ", datos);
            }, error: error => { console.log("paso 5: ", error); }
        });
    }
}

function compras_confirmarRecepcionLlegoBien() {
    $(".spiner_recepcion_bien").show()
    let params = {
        id: __orderItemAct.id,
        uid: user.uid,
        empresa: user.empresa,
        id_carrito: __orderItemAct.id_carrito
    };





    let data_url = `${baseurl}/controllers/compras/?confirmar_entrega`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": params },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: datos => {
            /*if (datos['status'] == "success") {
            } else {
            }*/
            data_url = `${baseurl}/controllers/compras/?confirmar_entregado_bien`;
            $.ajax({
                type: "POST",
                url: data_url,
                data: { "data": params },
                dataType: "json",
                "headers": { 'x-api-key': user.token },
                success: async datos => {
                    let validate_token = await erroresTokenEmpresa(datos);
                    if (!validate_token) {
                        $(".spiner_recepcion_bien").hide()
                        $('#modal-compras-Confirmar-recepcion').modal("hide");

                        compras_openModaCalificarVendedorExecute(__orderItemAct);
                        getCompras();
                    }

                    /*if (datos['status'] == "success") {
                    } else {
                    }*/
                }, error: error => {
                    $(".spiner_recepcion_bien").hide()
                }
            });
        }, error: error => {
            $(".spiner_recepcion_bien").hide()
        }
    });
}
function compras_infoProcesoDevolucion($event) {
    __orderItemAct = $event.data.item;

    $('#modal-compras-proceso-de-devolucion-vendedor').modal('show');
    if (__orderItemAct) {

        $('.compras__devolucion__orden__content__empresa').text(__orderItemAct.envio.empresa);

        $('.compras__devolucion__orden__content__numguia').text(__orderItemAct.envio.numero_guia);

        if (__orderItemAct.tipo != envio.acordar_comprador) {
            $('.compras__devolucion__orden__content__urlguia').show();
            $('.compras__devolucion__orden__urlguia').attr('href', __orderItemAct.envio.url_numero_guia)
        } else {
            $('.compras__devolucion__orden__content__urlguia').hide();
        }
    }
}
function compras_infoNoConcretada() {
    $('#modal-compras-proceso-no-concretada-vendedor').modal('show');
}






function compras_openModaCalificarVendedor($event) {
    __orderItemAct = $event.data.item;
    compras_openModaCalificarVendedorExecute(__orderItemAct);
}
function compras_openModaCalificarVendedorExecute(__orderItemAct) {

    let labelComprador1er = "";
    let labelComprador2do = "";
    if (validarText(__orderItemAct.datos_usuario_vendedor.empresa)) {
        labelComprador1er = __orderItemAct.datos_usuario_vendedor.empresa;

    } else if (validarText(__orderItemAct.datos_usuario_vendedor.nombre)) {
        if (labelComprador1er == "") {
            labelComprador1er = __orderItemAct.datos_usuario_vendedor.nombre;
        } else {
            labelComprador2do = " (" + __orderItemAct.datos_usuario_vendedor.nombre + " )";
        }
    } else { }

    $('.calificar__vendedor__name').text(`${labelComprador1er}? ${labelComprador2do}`);

    $('.compras__calificar__vendedor__content__erros').hide();
    $('.compras__calificar__vendedor__descrip').val("")

    $('#modal-compras-calificar-vendedor').modal('show');

    $("#radio5").prop("checked", true);
    $("#radio2_5").prop("checked", true);
    $("#radio3_5").prop("checked", true);
    $("#radio4_5").prop("checked", true);
}


function compras_CalificarVendedorValidate(params = {}) {

    if (params.descripcion.trim().length == 0) {
        $(".spiner_calificar_vendedor").hide()
        $('.compras__calificar__vendedor__content__erros').show();
    } else {
        $('.compras__calificar__vendedor__content__erros').hide();
        compras_CalificarVendedorSend(params);
    }

}
function compras_CalificarVendedorSend(params = {}) {


    $('#modal-compras-calificar-vendedor').modal('hide');

    let data_url = `${baseurl}/controllers/compras/?calificar_vendedor`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": params },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async datos => {
            /*if (datos['status'] == "success") {
            } else {
            }*/
            let validate_token = await erroresTokenEmpresa(datos);
            if (!validate_token) {
                initCompras();
                $(".spiner_calificar_vendedor").hide()
            }


        }, error: error => {
            $(".spiner_calificar_vendedor").hide()
        }
    });
}






function compras_timeLine($event) {
    __orderItemAct = $event.data.item;

    if (!$('.modal').hasClass('in')) {
        $('#modal-compras-timeline-detalle-orden').modal("show");
    }
    compras_timeLineShow(__orderItemAct);
}
async function compras_timeLineShow(__orderItemAct) {

    console.log("__orderItemAct: ", __orderItemAct);
    console.log("__orderItemAct.moneda: ", __orderItemAct.moneda);
    console.log("__compras_arraydelosestados: ", __compras_arraydelosestados);
    if (__orderItemAct.timeline) {
        let unidad_moneda = await getCoinLabel(__orderItemAct.moneda);
        let monto = __orderItemAct.precio_mask;
        let monto_con_unidad = monto + " " + unidad_moneda;

        $('.compras__timeline__img').attr('src', __orderItemAct.foto_portada);
        $('.compras__timeline__nameproduct').text(__orderItemAct.producto);
        $('.compras__timeline__img').prop('id', __orderItemAct.id);
        $('.compras__timeline__img').prop('position', 0);
        let variaciones = ""
        $(".compras__timeline__variantes").empty()

        console.log(__orderItemAct)
        if (__orderItemAct.variaciones) {
            $.each(__orderItemAct.variaciones, function (i, vari) {
                variaciones += `<div class="return-td" style=" display: flex;">
                                    <div> Color ${i + 1}:  </div>
                                    <div style="width:20px;height:12px; border-radius: 15px; margin:5px; background:${vari.color}"></div>
                                    <div>${idioma.trans_eb12} ${i + 1}: ${vari.tallaES}</div>
                                </div>`
            });
            $(".compras__timeline__variantes").html(variaciones)

        }

        // "bd": 150000,
        // "sd": 150000,
        // "fiat": 0,

        // "bd_mask": "150,000.00",
        // "bd_usd_mask": "39.64",
        // "sd_mask": "150,000.00",
        // "sd_usd_mask": "39.64",
        // "fiat_mask": "0.00",
        // "fiat_usd_mask": "0.00",
        // $('.compras__timeline__amount').text(monto_con_unidad);

        let saldosHTML__compras = "";
        if (__orderItemAct.sd * 1 > 0) {
            saldosHTML__compras += `<span class="money-sd">${__orderItemAct.sd_mask} ${await getCoinLabel("Nasbigold")}</span> <br> `;
        }
        if (__orderItemAct.bd * 1 > 0) {
            saldosHTML__compras += `<span class="money-bd">${__orderItemAct.bd_mask} ${await getCoinLabel("Nasbiblue")}</span> <br>`;
        }
        if (__orderItemAct.fiat * 1 > 0) {
            saldosHTML__compras += `<span class="money-fiat">${__orderItemAct.fiat_mask} ${await getCoinLabel(__orderItemAct.moneda_fiat)}</span>`;
        }

        $('.compras__timeline__amount').html(saldosHTML__compras);

        $('.compras__timeline__comprador__city').text(" " + __orderItemAct.envio.comprador_ciudad);
        $('.compras__timeline__comprador__address').text(" " + __orderItemAct.envio.comprador_direccion);
        $('.compras__timeline__id').text(__orderItemAct.id_carrito);


        $('.compras__timeline__descripcion').html("");
        let steps = "";

        console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
        __orderItemAct.timeline.forEach((item, indice) => {
            var fecha = getFechaConHoraV2(1 * item.fecha_actualizacion).split(' ')[0];
            var rutaFecha = fecha.split('/');
            var diaMes = rutaFecha[0] + '/' + rutaFecha[1];
            $('._option_' + indice).text(diaMes);
            let schemaStep = __compras_arraydelosestados[item.estado - 1];

            console.log(" schemaStep: ", schemaStep);
            steps += `<p class="info-ord"><b>${getFechaConHoraV2(1 * item.fecha_actualizacion)}: </b> ${schemaStep.descripcion}</p>`;

            $('.compras__timeline__process__steps__2').removeClass('pointactive');
            $('.compras__timeline__process__steps__3').removeClass('pointactive');
            $('.compras__timeline__process__steps__4').removeClass('pointactive');
            $('.compras__timeline__process__steps__1').removeClass('pointactive');

            $('.ol-timeline').show();
            $('.message_aux').hide();
            if (item.estado * 1 >= 1) {
                //Recibida por el vendedor.
                $('.compras__timeline__process__steps__1').addClass('pointactive');

                if (item.estado * 1 == 2) {
                    console.log("primera condicion D");
                    $('.ol-timeline').hide();
                    $('.message_aux').show();
                    $('.message_aux').html(`<h4><strike>${idioma.trans257}</strike></h4>`);
                }

                if (item.estado * 1 == 10) {
                    console.log("primera condicion NC");
                    $('.ol-timeline').hide();
                    $('.message_aux').show();
                    $('.message_aux').html(`<h4><strike>${idioma.trans258}</strike></h4>`);
                }
            }
            if (item.estado * 1 > 1) {
                //Recibida por el vendedor.
                $('.compras__timeline__process__steps__2').addClass('pointactive');

                if (item.estado * 1 == 2) {
                    console.log("primera condicion D");
                    $('.ol-timeline').hide();
                    $('.message_aux').show();
                    $('.message_aux').html(`<h4><strike>${idioma.trans257}</strike></h4>`);
                }

                if (item.estado * 1 == 10) {
                    console.log("primera condicion NC");
                    $('.ol-timeline').hide();
                    $('.message_aux').show();
                    $('.message_aux').html(`<h4><strike>${idioma.trans258}</strike></h4>`);
                }
            }
            if (item.estado * 1 >= 7) {
                //En camino.
                $('.compras__timeline__process__steps__3').addClass('pointactive');

                if (item.estado * 1 == 10) {
                    console.log("primera condicion NC");
                    $('.ol-timeline').hide();
                    $('.message_aux').show();
                    $('.message_aux').html(`<h4><strike>${idioma.trans258}</strike></h4>`);
                }
            }
            if (item.estado * 1 >= 8) {
                $('.compras__timeline__process__steps__4').addClass('pointactive');

                if (item.estado * 1 == 10) {
                    console.log("primera condicion NC");
                    $('.ol-timeline').hide();
                    $('.message_aux').show();
                    $('.message_aux').html(`<h4><strike>${idioma.trans258}</strike></h4>`);
                }
            }
        });
        compras_timeline_cargaritems(__orderItemAct);
        console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
        $('.compras__timeline__descripcion').html('<br>' + steps);

    } else {
        alert(idioma['_trans330'], __orderItemAct);
        $('#modal-compras-timeline-detalle-orden').modal("hide");
        console.log("__orderItemAct: ", __orderItemAct);
    }
}

async function compras_timeline_cargaritems(__orderItemAct = {}) {
    console.log("----> __orderItemAct: ", __orderItemAct);
    console.log("----> __orderItemAct: ", __orderItemAct);
    console.log("----> __orderItemAct: ", __orderItemAct);

    $('.compras_timeline__items').html("");
    let count = 0;
    for (let key in __orderItemAct.dataCarritoFull.productos) {
        let productSchema = __orderItemAct.dataCarritoFull.productos[key];
        let htmlSchema = `
            <div>
                <img loading="lazy" src="${productSchema.foto_portada}" alt="nasbi.com" id=${key} class=" item_producto_comprar_detalle compras__timeline__img__${key}">
            </div>
        `;
        $('.compras_timeline__items').append(htmlSchema);

        // $(`.compras__timeline__img__${key}`).eq(count).off('click');
        // $(`.compras__timeline__img__${key}`).eq(count).on('click', { item: productSchema }, compras_timelineShowItemSelected);
        $(".item_producto_comprar_detalle").eq(count).off('click');
        $(".item_producto_comprar_detalle").eq(count).on('click', { item: productSchema, key, position: count }, compras_timelineShowItemSelected);


        count++;
    }
    if (count < 4) {
        for (let i = 0; i < 4 - count; ++i) {
            $('.compras_timeline__items').append(`
                <div>
                    <img loading="lazy" src="../imagen/product.jpg" alt="nasbi.com">
                </div>
            `);
        }
    }
    if (count > 1) {
        $(".subasta__nasbi__btnprev").show();
        $(".subasta__nasbi__btnnext").show();
        $('.subasta__nasbi__btnprev').off('click');
        $('.subasta__nasbi__btnprev').on('click', { tipo: -1, array_productos_carrito: __orderItemAct.dataCarritoFull.productos }, prevNext_comprar)

        $('.subasta__nasbi__btnnext').off('click');
        $('.subasta__nasbi__btnnext').on('click', { tipo: 1, array_productos_carrito: __orderItemAct.dataCarritoFull.productos }, prevNext_comprar)
    } else {
        $(".subasta__nasbi__btnprev").hide();
        $(".subasta__nasbi__btnnext").hide();
    }
}
async function compras_timelineShowItemSelected($e, id = "0") {
    // let product_select_detalle= $e.data.item;
    //  console.log(product_select_detalle, "mmmmm");
    let product_select_detalle;
    let key;
    let position;

    if (id == "0") {
        product_select_detalle = $e.data.item;
        key = $e.data.key;
        position = $e.data.position;
    } else {
        product_select_detalle = $e.item;
        key = $e.key;
        position = $e.position;
    }


    $('.compras__timeline__img').attr('src', product_select_detalle.foto_portada);
    $('.compras__timeline__img').prop('id', key);
    $('.compras__timeline__img').prop('position', position);
    $('.compras__timeline__nameproduct').text(product_select_detalle.titulo);
    let variaciones = ""
    console.log(product_select_detalle)
    if (product_select_detalle.variaciones) {
        $.each(product_select_detalle.variaciones, function (i, vari) {
            variaciones += `<div class="return-td" style=" display: flex;">
                                    <div> Color ${i + 1}:  </div>
                                    <div style="width:20px;height:12px; border-radius: 15px; margin:5px; background:${vari.color}"></div>
                                    <div>${idioma.trans_eb12} ${i + 1}: ${vari.tallaES}</div>
                            </div>`
        });
        $(".compras__timeline__variantes").html(variaciones)

    }

    let saldosHTML__compras = "";
    if (product_select_detalle.sd * 1 > 0) {
        saldosHTML__compras += `<span class="money-sd">${product_select_detalle.sd_mask} ${await getCoinLabel("Nasbigold")}</span> <br> `;
    }
    if (product_select_detalle.bd * 1 > 0) {
        saldosHTML__compras += `<span class="money-bd">${product_select_detalle.bd_mask} ${await getCoinLabel("Nasbiblue")}</span> <br>`;
    }
    if (product_select_detalle.fiat * 1 > 0) {
        saldosHTML__compras += `<span class="money-fiat">${product_select_detalle.fiat_mask} ${await getCoinLabel(product_select_detalle.moneda_fiat)}</span>`;
    }

    $('.compras__timeline__amount').html(saldosHTML__compras);
}
function compras_noConcretado(item = {}) {
    let params = {
        id: item.id,
        uid: user.uid,
        empresa: user.empresa,
        id_carrito: item.id_carrito
    };



    let data_url = `${baseurl}/controllers/compras/?compra_no_concretada`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": params },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async datos => {
            /*if (datos['status'] == "success") {
            } else {
            }*/

            let validate_token = await erroresTokenEmpresa(datos);
            if (!validate_token) { }
        }, error: error => {
        }
    });
}


//Proceso devolucion
function compras__proceso__devolucion__devolver() {
    console.log("devolviendo modal");
    $('#modal-compras-proceso-devolucion').modal("hide");
}

function compras_convertBase64(e) {
    var archivo = e.target.files[0],
        reader = new FileReader()
    if (archivo) {
        if (archivo.size <= 5000000) {
            if (archivo['type'] == "image/png" || archivo['type'] == "image/jpeg" || archivo['type'] == "image/jpg") {
                reader.onload = (e) => {
                    var binaryString;
                    if (!e) binaryString = reader.content;
                    else binaryString = e.target.result;
                    let img = 'data:image/png;base64,' + window.btoa(binaryString);
                    $(".img_modal_evidencia").attr("src", img)
                }
                reader.readAsBinaryString(archivo);
            } else {
                console.log('no es una imagen')
                presentAlert(idioma['trans_04'], idioma['_trans919'])
            }
        } else {
            presentAlertObject({ icon: "success", text: idioma.trans197 });

        }
    }
}


function eventGeneratePaginations(pagView = 1) {
    getCompras(pagView);
}

function confirmarProceso(titulo, texto) {
    $(".titulo_modal_confirmacion").text(titulo);
    $(".info_modal_confirmacion").text(texto);
    $("#modal-confirmar-proceso").modal("toggle");
}

function getComprasArrayDeLosEstados() {

}


function obtener_unidad_moneda_compras(unidad) {
    return new Promise((resolve) => {
        switch (unidad) {
            case "Nasbigold":
                resolve(idioma.trans37_)
                break;
            case "Nasbiblue":
                resolve(idioma.trans36_)
                break;

            default:
                resolve(unidad)
                break;
        }

    });
}

function getCountArticles(datos = {}) {
    try {
        let count = 0;
        for (let key in datos) {
            count += datos[key].cantidad;
        }
        return count;
    } catch (ex) {
        console.log(ex);
        return 0;
    }

}

function prevNext_comprar($e) {
    let array_productos_carrito = [];
    let boton = $e.data.tipo;
    const productos_carrito = { ...$e.data.array_productos_carrito };
    for (let i in productos_carrito) {
        array_productos_carrito.push(productos_carrito[i]);
    }
    let key = $('.compras__timeline__img').prop("id");
    let postition_img_actual = $('.compras__timeline__img').prop("position");
    let data_a_mostrar = [];
    console.log($e.data, boton, array_productos_carrito, key, postition_img_actual, array_productos_carrito.length, "mmmmmmm");
    if (boton == 1) { //siguiente
        if (postition_img_actual == array_productos_carrito.length - 1) {
            data_a_mostrar.item = array_productos_carrito[0];
            data_a_mostrar.key = array_productos_carrito[0].id;
            data_a_mostrar.position = 0;
            compras_timelineShowItemSelected(data_a_mostrar, "1");
        } else {
            data_a_mostrar.item = array_productos_carrito[postition_img_actual + 1];
            data_a_mostrar.key = array_productos_carrito[postition_img_actual + 1].id;
            data_a_mostrar.position = postition_img_actual + 1;
            compras_timelineShowItemSelected(data_a_mostrar, "1");
        }
    } else if (boton == -1) {//anterior
        if (postition_img_actual == 0) {
            let tama_array = array_productos_carrito.length;
            data_a_mostrar.item = array_productos_carrito[tama_array - 1];
            data_a_mostrar.key = array_productos_carrito[tama_array - 1].id;
            data_a_mostrar.position = tama_array - 1;
            compras_timelineShowItemSelected(data_a_mostrar, "1");
        } else {
            data_a_mostrar.item = array_productos_carrito[postition_img_actual - 1];
            data_a_mostrar.key = array_productos_carrito[postition_img_actual - 1].id;
            data_a_mostrar.position = postition_img_actual - 1;
            compras_timelineShowItemSelected(data_a_mostrar, "1");
        }
    }


}

