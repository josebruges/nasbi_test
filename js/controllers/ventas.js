let paginaactual = [];
let ventas__arraydelosestados = [];
let confirmarview = false;
let walletActiva = null;
let rutaSeleccionada = null;
//variables propias de confirmar venta
let dataunproductoenconfirmar = null;
let justificacion = null;

//variables de ver soporte 
let justificacionsoporte = null;
let datadeventaselecionada_soporterespuesta = null;
var exposicionProducto = [
    { id: "all", nombre: idioma['trans_47'] },
    { id: 1, nombre: idioma['_trans395'], img: '../imagen/public-venta/gratuita.png', descripcion: idioma.trans199_, link_text: idioma.trans200_, link: '' },
    { id: 2, nombre: idioma['_trans396'], img: '../imagen/public-venta/promocionada.png', descripcion: idioma.trans201_, link_text: idioma.trans202_, link: '' },
    { id: 3, nombre: idioma['_trans397'], img: '../imagen/public-venta/promocionada.png', descripcion: idioma.trans203_, link_text: idioma.trans204_, link: '' }
];

let paramsMisCuentasVentas = new URLSearchParams(location.search);
let tokenPageViewVentas = paramsMisCuentasVentas.get('tokenPageView');


let mis_cuentas_ventas = localStorage.getItem("mis_cuentas");


if (("" + mis_cuentas_ventas).includes('.sidenav_ventas') || ("" + tokenPageViewVentas).includes('.sidenav_ventas') ||
    ("" + mis_cuentas_ventas).includes('id-ventas') || ("" + tokenPageViewVentas).includes('id-ventas')) {

    $(mis_cuentas_ventas).click();
    reiniciarVariables();

    let params = new URLSearchParams(location.search);
    if (params.get('tokenPageViewAddProduct') != undefined) {
        $('.ventas__list__content__general').hide();
        $('.ventas__newProductoOptions').show();

    } else {
        $('.ventas__list__content__general').show();
        $('.ventas__newProductoOptions').hide();
        v_llenarSelects()
        getVentas();
        misVentas_estadisticas();
    }
}

$(document).ready(e => {
    $('#id-ventas').click(($event) => {
        //localStorage.setItem("mis_cuentas", ".sidenav_ventas");
        redirigir_opcion_mis_cuentas(".sidenav_ventas"); //esta funcion esta en resumen 
        reiniciarVariables();

        let params = new URLSearchParams(location.search);
        if (params.get('tokenPageViewAddProduct') != undefined) {
            $('.ventas__list__content__general').hide();
            $('.ventas__newProductoOptions').show();

        } else {
            $('.ventas__list__content__general').show();
            $('.ventas__newProductoOptions').hide();

            v_llenarSelects()
            getVentas();
            misVentas_estadisticas();
        }
    });
    $("#modal-confirmacion-venta").on('hidden.bs.modal', ($event) => {
        $('.__declinarventa').show()
        $('.__contenedorconfirmar').hide('fast');
        confirmarview = false
    });
});

function reiniciarVariables() {
    ventas__arraydelosestados = [
        { id: 1, text: idioma.trans07_, funcion: mostrarConfirmarVenta, descripcion: idioma['trans_196'] },
        { id: 2, text: idioma.trans08_, funcion: mensajeDeclinadaVenta, descripcion: idioma['trans_78'] },
        { id: 3, text: idioma.trans09_, funcion: mensajeEsperaDePagoVenta, descripcion: idioma['trans_197'] },
        { id: 4, text: idioma.trans107, funcion: mensajeComprobanteDeclinadoVenta, descripcion: idioma['trans_80'] },
        { id: 5, text: idioma.trans11_, funcion: mostrarConfirmarComprobanteVenta, descripcion: idioma['trans_81'] },
        { id: 6, text: idioma.trans99, funcion: envioProductoVenta, descripcion: idioma['trans_296'] }, // Antes: trans_198
        { id: 7, text: idioma.trans13_, funcion: mensajeEsperaDeEnvioVenta, descripcion: idioma['trans_199'] },
        { id: 8, text: idioma.trans14_, funcion: mensajeEntregadoVenta, descripcion: idioma['trans_329'] },
        { id: 9, text: idioma.trans15_, funcion: mostrarDevolucion, descripcion: idioma['trans_85'] },
        { id: 10, text: idioma.trans109, funcion: mensajeNoConcretadoVenta, descripcion: idioma['trans_86'] },
        { id: 11, text: idioma.trans19_, funcion: mensajeEsperaDeCalificacionComprador, descripcion: idioma['trans_330'] }, // Antes trans_200
        { id: 12, text: idioma.trans17_, funcion: mostrarcalificarCompradorVenta, descripcion: idioma['trans501_'] },
        { id: 13, text: idioma.trans18_, funcion: mensajeFinalizadoVenta, descripcion: idioma['trans_88'] },
    ];
}
function v_llenarSelects() {
    ventas__arraydelosestados = [
        { id: 1, text: idioma.trans07_, funcion: mostrarConfirmarVenta, descripcion: idioma['trans_196'] },
        { id: 2, text: idioma.trans08_, funcion: mensajeDeclinadaVenta, descripcion: idioma['trans_78'] },
        { id: 3, text: idioma.trans09_, funcion: mensajeEsperaDePagoVenta, descripcion: idioma['trans_197'] },
        { id: 4, text: idioma.trans107, funcion: mensajeComprobanteDeclinadoVenta, descripcion: idioma['trans_80'] },
        { id: 5, text: idioma.trans11_, funcion: mostrarConfirmarComprobanteVenta, descripcion: idioma['trans_81'] },
        { id: 6, text: idioma.trans99, funcion: envioProductoVenta, descripcion: idioma['trans_296'] }, // Antes: trans_198
        { id: 7, text: idioma.trans13_, funcion: mensajeEsperaDeEnvioVenta, descripcion: idioma['trans_199'] },
        { id: 8, text: idioma.trans14_, funcion: mensajeEntregadoVenta, descripcion: idioma['trans_329'] },
        { id: 9, text: idioma.trans15_, funcion: mostrarDevolucion, descripcion: idioma['trans_85'] },
        { id: 10, text: idioma.trans109, funcion: mensajeNoConcretadoVenta, descripcion: idioma['trans_86'] },
        { id: 11, text: idioma.trans19_, funcion: mensajeEsperaDeCalificacionComprador, descripcion: idioma['trans_330'] }, // Antes trans_200
        { id: 12, text: idioma.trans17_, funcion: mostrarcalificarCompradorVenta, descripcion: idioma['trans501_'] },
        { id: 13, text: idioma.trans18_, funcion: mensajeFinalizadoVenta, descripcion: idioma['trans_88'] },
    ];

    var exposicionProducto = [
        { id: "all", nombre: idioma['trans_47'] },
        { id: 1, nombre: idioma['_trans395'], img: '../imagen/public-venta/gratuita.png', descripcion: idioma.trans199_, link_text: idioma.trans200_, link: '' },
        { id: 2, nombre: idioma['_trans396'], img: '../imagen/public-venta/promocionada.png', descripcion: idioma.trans201_, link_text: idioma.trans202_, link: '' },
        { id: 3, nombre: idioma['_trans397'], img: '../imagen/public-venta/promocionada.png', descripcion: idioma.trans203_, link_text: idioma.trans204_, link: '' }
    ];
    var estados = [
        { id: "", nombre: idioma['trans_47'] },
        { id: 1, nombre: idioma['trans21'] },
        { id: 0, nombre: idioma['trans22'] }
    ];
    $(".content_estado_venta").html(` <select class="dropdown divdropdownfiltro filtro_estado_venta"></select>`)
    $(".content_expo_venta").html(` <select class="dropdown divdropdownfiltro filtro_exposicion_venta"></select>`)
    $('.content_select_venta').html(`<select class="menu_opciones_estado_venta" ></select>`);
    $(".filtro_estado_venta").empty()
    $(".filtro_exposicion_venta").empty()
    $('.menu_opciones_estado_venta').empty();
    let htmlestado = "";
    let htmlexpo = "";
    $.each(exposicionProducto, (i, item) => {
        htmlexpo += `<option value="${item.id}">${item.nombre}</option>`
    })
    $.each(estados, (i, item) => {
        htmlestado += `<option value="${item.id}">${item.nombre}</option>`
    })
    for (let index = 0; index <= 13; index++) {
        let button_option
        if (index == 0) {
            button_option = `<option value="${index}">${idioma.trans_47}</option>`;
            $('.menu_opciones_estado_venta').append(button_option);
        } else {
            let name_opcion = ventas__arraydelosestados.filter(estado => estado.id == index)[0];
            button_option = `<option  value="${index}">${name_opcion.text}</option>`;
            $('.menu_opciones_estado_venta').append(button_option);
        }

    }
    $(".filtro_estado_venta").html(htmlestado)
    $(".filtro_exposicion_venta").html(htmlexpo)
    $(".filtro_estado_venta").selectpicker({
        size: 5
    })
    $(".filtro_exposicion_venta").selectpicker({
        size: 5
    })
    $('.menu_opciones_estado_venta').selectpicker({
        size: 7
    })

    //ESTE BLOQUE ES DE RESUMEN DEBIDO A LA OPCION DE VENTAS POR PREPARAR 
    let opcion_ventas_pre_resu = localStorage.getItem("opcion_ventas_espera_envio");
    if (opcion_ventas_pre_resu == 1) {
        localStorage.setItem("opcion_ventas_espera_envio", 0);
        $('.menu_opciones_estado_venta').val(1);
        $('.menu_opciones_estado_venta').selectpicker('refresh');
    } else if (opcion_ventas_pre_resu * 1 == 13) {
        localStorage.setItem("opcion_ventas_espera_envio", 0);
        $('.menu_opciones_estado_venta').val(13);
        $('.menu_opciones_estado_venta').selectpicker('refresh');
        $('.filtro_estado_venta').val("");
        $('.filtro_estado_venta').selectpicker('refresh');
    }
    //FIN DE VENTAS POR PREPARAR DE RESUMEN

    //cambio 2


    $('.filtro_estado_venta').off('click');
    $('.filtro_estado_venta').on('click', null, function () {
        $('.menu_opciones_estado_venta').val(0);
        $('.menu_opciones_estado_venta').selectpicker('refresh');
        getVentas();
    })
    $('.filtro_exposicion_venta').off('click');
    $('.filtro_exposicion_venta').on('click', null, function () {
        getVentas();
    })

    $('.menu_opciones_estado_venta').off('click'); //el filtro de compras 
    $('.menu_opciones_estado_venta').on('click', null, function () {
        $('.filtro_estado_venta').val("");
        $('.filtro_estado_venta').selectpicker('refresh');
        getVentas();
    })




    // $(".filtro_estado").change(($event) => {
    //     getMisPublicaciones()
    // })




    // $(".filtro_exposicion").change(($event) => {
    //     getMisPublicaciones()

    // });

}

function getVentas(pagina = 1) {
    var estado = $(".filtro_estado_venta option:selected").val();
    // var expo = $(".filtro_exposicion_venta option:selected").val();
    var expo = "all";
    var ordenar = $(".menu_opciones_estado_venta option:selected").val();

    let dataEnviar = {
        "data": {
            uid: user.uid,
            empresa: user.empresa,
            pagina,
            estado
        }
    };

    if (ordenar * 1 > 0) dataEnviar.data.ordenar = parseInt(ordenar)

    // if (ordenar != "0") dataEnviar.data.ordenar = parseInt(ordenar)

    if (expo != "all") dataEnviar.data.exposicion = parseInt(expo)
    let data_url = baseurl + "/controllers/ventas/?mis_ventas";

    console.log("dataEnviar: ", dataEnviar);
    $.ajax({
        "type": 'POST',
        "url": data_url,
        "data": dataEnviar,
        "dataType": 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        paginaactual = pagina;
        if (res.status == "success") {
            $(".boton_publicar_individual").hide();
            $('.ventas__list__nodata').hide('fast');
            $('.ventas__list').show('slow');
            $('.titulosdeventas').show('slow');
            $(".paginacion_numeros").show()
            llenarVentas(res);
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                validar_si_es_empresa();
                return 0;
            }

        }


    }).fail((err) => {
        $('.titulosdeventas').hide('slow');
        $('.ventas__list').empty();
        $('.ventas__list__nodata').show('slow');
    });

    misVentas_estadisticas();
}


function llenarVentas(params) {

    $('.ventas__list').empty();
    $('.paginacion_numeros').empty()


    // <a class="dropdown-item" href="#">Modificar</a>
    let viewbadgechat;

    let expo;
    let ventas = params.data;
    let count_ventas = 0;

    let imgVenta = "../imagen/Nivelcero.png";


    let ventasKeys = Object.keys(ventas).reverse();

    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    console.log("ventasKeys: ", ventasKeys);
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");


    for (let x of ventasKeys) {

        let venta = ventas[x];

        dataunproducto = venta;
        for (let y in venta.productos) {
            console.log("venta: ", venta);
            console.log("\n\nvalidando venta: ", venta.productos[y].estado);
            let estado_filtro = "";
            let ventaActiva = (venta.productos[y].estado * 1 != 13 ? true : false);
            if (ventaActiva) {
                estado_filtro = idioma['trans21']; // Activa
                console.log(ventaActiva, "] (1) ++++++++++++++++> [ venta.productos[y].estado ]: ", venta.productos[y].estado, "\t => ", estado_filtro);
            } else {
                estado_filtro = idioma['trans22']; //inactiva
                console.log(ventaActiva, "] (2)++++++++++++++++> [venta.productos[y].estado ]: ", venta.productos[y].estado, "\t => ", estado_filtro);
            }

            expo = exposicionProducto.find(f => f.id == venta.productos[y].exposicion).nombre
            opcionesdeestado = ventas__arraydelosestados.filter(datos => datos.id == venta.productos[y].estado)[0];
            console.log("-----------+> [ venta.productos[y].estado ]: ", venta.productos[y].estado);
            console.log("-----------+> [ venta.productos[y].estado ]: ", venta.productos[y].estado);
            console.log("-----------+> [ opcionesdeestado ]: ", opcionesdeestado);
            console.log("-----------+> [ opcionesdeestado ]: ", opcionesdeestado);
            viewbadgechat = venta.productos[y].contador_chat > 0 ? '' : 'display:none';


            let subEstadisticasVenta = idioma['trans_319'];

            subEstadisticasVenta = subEstadisticasVenta.split("###").join(venta.productos[y].visitas);
            subEstadisticasVenta = subEstadisticasVenta.split("@@@").join(venta.productos[y].cantidad_vendidas);

            if (venta.productos[y].fecha_creacion_producto) {
                subEstadisticasVenta = subEstadisticasVenta.split("$$$").join(calcDate(venta.productos[y].fecha_creacion_producto * 1));
            } else {
                subEstadisticasVenta = subEstadisticasVenta.split("$$$").join("...");
            }


            let countArticles = getCountArticles(venta.productos);
            $('.ventas__list').append(
                `<tr>
                    <td>
                        <div class="flex-name">
                            <div class="containe-fto">
                                <img src=${imgVenta} class="img-articulo">
                            </div>
                            <p class="txt-numb">Ref: #${venta.productos[y].id_carrito}</p>
                            <p class="name-product">${idioma.trans273}: (${countArticles})</p>
                            <p class="visits" style="cursor: pointer;" data-toggle="tooltip" data-placement="top" title= "${subEstadisticasVenta}">${subEstadisticasVenta}</p>
                        </div>
                    </td>
                    <td class="td-border">
                        ${ (venta.total_bd > 0) ? "<p>" + venta.total_bd_mask + " " + getCoinLabelSymbol("Nasbiblue") + "</p>" : ""}
                        ${ (venta.total_sd > 0) ? "<p>" + venta.total_sd_mask + " " + getCoinLabelSymbol("Nasbigold") + "</p>" : ""}
                        ${ (venta.total_fiat > 0) ? "<p>" + venta.total_fiat_mask + " " + getCoinLabelSymbol(venta.productos[y].moneda_fiat) + "</p>" : ""}
                    </td>
                    <td ><p>${ countArticles}</p></td>
                    <td class="td-border"><p>${estado_filtro}</p></td>
                    <!-- <td><p>${expo}</p></td> -->
                    <td>
                        <div class="cont-btn"-metdo>
                            <button class="button-modificar trans01_ ventas_abrir_chat">
                                ${idioma.trans01_} <span style="${viewbadgechat};" class="badge notif_chat${venta.productos[y].id}">${venta.productos[y].contador_chat}</span>
                            </button>
                        </div>
                    </td>
                    <td>
                        <div class="dropdown divdropdownfiltro">
                            <button class="drop-filtro drop-table dropdown-toggle" type="button" id="opciones" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${idioma._trans332}</button>
                            <div class="dropdown-menu" aria-labelledby="opciones">
                                <a class="dropdown-item __ventastimeline">${idioma.trans137}</a>
                                <a class="dropdown-item __opcionesventa" >${opcionesdeestado.text}</a>
                            </div>
                        </div>
                    </td>
                </tr>`
            );

            const dataCarritoFull = {
                "total_bd": venta.total_bd,
                "total_sd": venta.total_sd,
                "total_fiat": venta.total_fiat,
                "total_bd_mask": venta.total_bd_mask,
                "total_sd_mask": venta.total_sd_mask,
                "total_fiat_mask": venta.total_fiat_mask,
                "productos": venta.productos
            };

            venta.productos[y].dataCarritoFull = dataCarritoFull;

            $('.__ventastimeline').eq(count_ventas).off('click');
            $('.__ventastimeline').eq(count_ventas).on('click', { item: venta.productos[y] }, ventas_timeLine);

            $('.ventas_abrir_chat').eq(count_ventas).off('click');
            $('.ventas_abrir_chat').eq(count_ventas).on('click', { item: venta.productos[y], productos: venta.productos }, abrirChat);

            $('.__opcionesventa').eq(count_ventas).off('click');
            $('.__opcionesventa').eq(count_ventas).on('click', { venta: venta.productos[y], productos: venta.productos }, opcionesdeestado.funcion);
            count_ventas++;
            break;
        }
    }
    let htmlContentPagination = "";
    let htmlContentItemsPagination = "";
    if (params.total_paginas > 1) {
        let inicio = ((params.pagina - 2) > 0 ? (params.pagina - 2) : 1);
        let fin = ((inicio + 4) < params.total_paginas ? (inicio + 4) : params.total_paginas);
        if (fin == params.total_paginas) {
            inicio = ((params.pagina - 4) > 0 ? (params.pagina - 4) : 1);
        }
        for (let index = inicio; index <= fin; ++index) {

            htmlContentItemsPagination += `<a onclick="getVentas( ${index} )" class="${(index == params.pagina ? 'active' : '')}">${index}</a>`;
        }
        let btnPrev = "";
        if (params.pagina - 1 > 1) {
            let pag = params.pagina - 1;
            btnPrev = `<a onclick="getVentas( 1 )" class="AD">&laquo;</a>`;
        }
        let btnNext = "";
        if (params.pagina + 1 < params.total_paginas) {
            let pag = params.pagina + 1;
            btnNext = `<a onclick="getVentas( ${pag} )" class="AD">&raquo;</a>`;
        }
        let htmlPuntosIndexFin = "";
        if (fin < params.total_paginas) {
            htmlContentItemsPagination += `<a> ... </a>`;

            let pag = params.total_paginas;
            htmlContentItemsPagination += `<a onclick="getVentas( ${params.total_paginas} )" class="AD">${params.total_paginas}</a>`;
        }
        htmlContentPagination +=
            `<div class="col-12">
            <div class="pagination pagination_list">
                `+ btnPrev + `
                `+ htmlContentItemsPagination + `
                `+ btnNext + `
            </div>
        </div>`;
    }
    $('.paginacion_numeros').html(htmlContentPagination);
}


function mostrarConfirmarVenta(e) {
    let productos_de_parametro = e.data.productos;

    const venta = e.data.venta;

    console.log('venta', venta);
    $('.__imagenproductoventa').html(`
        <div class="foto-producto-modal anchor-tag">
        <i class="fas fa-chevron-left left-slid confirmar_venta__nasbi__btnprev"></i>
            <a href="${venta.foto_portada}">
                <img loading="lazy" class="img-producto-modal img_producto_confirm" src="${venta.foto_portada}" alt="${venta.titulo}- nasbi.com">
            </a>
        <i class="fas fa-chevron-right right-slid confirmar_venta__nasbi__btnnext"></i>
        </div>
        <h5 class="titulo_pro_confirm">${venta.titulo}</h5>
        <p class="variaciones_ventas"> </p>
    `);
    let variaciones = ""
    console.log(__orderItemAct)
    if (venta.variaciones) {
        $.each(venta.variaciones, function (i, vari) {
            variaciones += `<div class="return-td" style=" display: flex;justify-content:center">
                                    <div> Color ${i + 1}:  </div>
                                    <div style="width:20px;height:12px; border-radius: 15px; margin:5px; background:${vari.color}"></div>
                                    <div>${idioma.trans_eb12} ${i + 1}: ${vari.tallaES}</div>
                            </div>`
        });
        $(".variaciones_ventas").html(variaciones)

    }
    $('.anchor-tag').lightGallery({
        download: false
    });

    // $('.__descripcionadicional').html(
    //     `<h5 class="mt-4">${idioma.trans89}</h5>
    //     <p>${venta.descripcion_extra}</p>`
    // );

    $('.__aceptarventa').show('fast');
    $('.__justificaciondeclinarventa').val('').prop('placeholder', idioma.trans91__ph);
    $('.__contenedorjustificacion').hide('slow');
    $('.__contenedorconfirmar').hide('slow');

    confirmarview = false; // Para llamar la wallet 1 vez cuando llama al modal
    walletActiva = null;

    $('.__declinarventa').off('click');
    $('.__declinarventa').on('click', { venta }, declinarVenta);

    $('.__aceptarventa').off('click');
    $('.__aceptarventa').on('click', { venta }, confirmarVenta);

    $('.img_producto_confirm').prop('position', 0);

    $('#modal-confirmacion-venta').modal('show');

    if (productos_de_parametro) {
        if (typeof productos_de_parametro == "object") {
            let validacion_si_array_u_objeto = Array.isArray(productos_de_parametro);
            if (!validacion_si_array_u_objeto) {
                let keys_object = Object.keys(productos_de_parametro).length;
                console.log("hiiii-confirmar");
                if (keys_object > 1) {
                    $('.confirmar_venta__nasbi__btnprev').show();
                    $('.confirmar_venta__nasbi__btnnext').show();
                    $('.confirmar_venta__nasbi__btnprev').off('click');
                    $('.confirmar_venta__nasbi__btnprev').on('click', { tipo: -1, array_productos_carrito: productos_de_parametro }, prevNext_confirmar_venta)
                    $('.confirmar_venta__nasbi__btnnext').off('click');
                    $('.confirmar_venta__nasbi__btnnext').on('click', { tipo: 1, array_productos_carrito: productos_de_parametro }, prevNext_confirmar_venta)
                } else {
                    $('.confirmar_venta__nasbi__btnprev').hide();
                    $('.confirmar_venta__nasbi__btnnext').hide();
                }
            }

        }
    }

}

function declinarVenta(e) {
    let venta = e.data.venta;
    $('.__contenedorjustificacion').show('slow');
    const justificacion = $('.__justificaciondeclinarventa').val();
    if (validarText(justificacion)) {
        venta.justificacion = justificacion;
        return enviarDeclinarVenta(venta);
    }

    $('.__aceptarventa').hide('slow');
    presentAlertObject({ icon: 'warning', text: idioma.trans04_ });
}

function enviarDeclinarVenta(venta) {
    $(".spiner_declinar_venta").show()
    const dataEnviar = {
        "data": {
            "id": venta.id,
            "uid": user.uid,
            "empresa": user.empresa,
            "confirmar": 0,
            "descripcion": venta.justificacion,
            "id_metodo_pago": venta.id_metodo_pago,
            "id_carrito": venta.id_carrito
        }
    };

    console.log("+--------+");
    console.log("\n\n\n\n\n\n\n\n\n\n\n");
    console.log('venta: ', venta);
    console.log('dataEnviar: ', dataEnviar);
    console.log("\n\n\n\n\n\n\n\n\n\n\n");
    console.log("+--------+");

    $.ajax({
        type: "POST",
        url: `${baseurl}/controllers/ventas/?confirmar_venta`,
        data: dataEnviar,
        dataType: "json",
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        $(".spiner_declinar_venta").hide()
        if (res.status == "success") {
            $('#modal-confirmacion-venta').modal("hide");
            presentAlertObject({ icon: 'success', text: idioma.trans93 });
            getVentas();
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) return presentAlertObject({ icon: 'error', text: idioma.trans92 });
        }

    }).fail((err) => {
        $(".spiner_declinar_venta").hide()
        presentAlertObject({ icon: 'error', text: idioma.trans92 });
    });
}

async function confirmarVenta(e) {
    const venta = e.data.venta;
    console.log('venta', venta);
    $('.__declinarventa').hide('slow');

    if (venta.id_metodo_pago == 1 && confirmarview == false) {
        const wallet = await nasbiCoinsUser({});
        $('.__contenedorconfirmar').show('slow');
        // const wallet = await nasbiCoinsUser({ moneda: venta.moneda });
        let moneda = "nasbicoin_gold";//venta.moneda.split('Nasbi').join('nasbicoin_');

        if (!wallet || !wallet.data[moneda] || !wallet.data[moneda].address) {
            console.log("\n\n\n\n\n\n");
            console.log("[ wallet ]: ", wallet);
            console.log("[ moneda ]: ", moneda);

            console.log("[ wallet.data[moneda] ]: ", wallet.data[moneda]);
            console.log("[ !wallet.data[moneda] ]: ", !wallet.data[moneda]);

            // console.log("[ wallet.data[moneda].address ]: ", wallet.data[moneda].address);
            // console.log("[ !wallet.data[moneda].address ]: ", !wallet.data[moneda].address);

            return presentAlertObject({ icon: 'error', text: idioma.trans85 })
        };

        // walletActiva = wallet.data[moneda];
        // let unidad_de_moneda = await obtener_unidad_moneda_ventas(moneda);
        // console.log(walletActiva, "result", moneda);
        $('.__direccion__nasbicoin__confirmar__venta').html(
            `${getCoinLabel(wallet.data.nasbicoin_gold.moneda)}: ${wallet.data.nasbicoin_gold.address} <br> ${getCoinLabel(wallet.data.nasbicoin_blue.moneda)}: ${wallet.data.nasbicoin_blue.address}`
        );
        // $('.unidad_nasbi_bono').text(" " + unidad_de_moneda);
        confirmarview = true
        // return presentAlertObject({ icon: 'info', text: idioma.trans95 + " " + unidad_de_moneda });
        venta.wallet = wallet.data;//walletActiva;
        return 0
    }

    enviarConfirmarVenta(venta);
}

function enviarConfirmarVenta(venta) {
    $(".spiner_aceptar_venta").show()
    let dataEnviar = {
        "data": {
            "id": venta.id,
            "uid": user.uid,
            "empresa": user.empresa,
            "confirmar": 1,
            "id_metodo_pago": venta.id_metodo_pago,
            "id_carrito": venta.id_carrito

        }
    }

    if (dataEnviar.data.id_metodo_pago == 1) {
        dataEnviar.data.adicional = {
            "address_vendedor": venta.wallet.nasbicoin_gold.address,
            "address_vendedor_sd": venta.wallet.nasbicoin_gold.address,
            "address_vendedor_bd": venta.wallet.nasbicoin_blue.address
        };
    };
    console.log("+--------+");
    console.log("\n\n\n\n\n\n\n\n\n\n\n");
    console.log('---> Confirm/venta: ', venta);
    console.log('---> Confirm/dataEnviar: ', dataEnviar);
    console.log("\n\n\n\n\n\n\n\n\n\n\n");
    console.log("+--------+");

    $.ajax({
        type: "POST",
        url: `${baseurl}/controllers/ventas/?confirmar_venta`,
        data: dataEnviar,
        dataType: "json",
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        $(".spiner_aceptar_venta").hide()
        if (res.status == "success") {
            $('#modal-confirmacion-venta').modal("hide");
            presentAlertObject({ icon: 'success', text: idioma.trans96 });
            getVentas();
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) return presentAlertObject({ icon: 'error', text: idioma.trans97 });
        }

    }).fail((err) => {
        $(".spiner_aceptar_venta").hide()
        presentAlertObject({ icon: 'error', text: idioma.trans97 });
    });
}

function mensajeDeclinadaVenta() {
    presentAlertObject({ icon: 'info', text: idioma.trans98 });
}

function mensajeEsperaDePagoVenta() {
    const mensaje = idioma.trans100.split('$tiempo').join(idioma['_trans374']);
    presentAlertObject({ icon: 'info', text: mensaje });
}

function mostrarConfirmarComprobanteVenta(e) {

    const venta = e.data.venta;

    console.log('venta', venta);
    $('.__imagenproductoventa').html(`
        <div class="foto-producto-modal anchor-tag">
            <a href="${venta.detalle_pago.url}">
                <img loading="lazy" class="img-producto-modal" src="${venta.detalle_pago.url}" alt="${idioma.trans102} ${venta.titulo}- nasbi.com">
            </a>
        </div>
        <h5>${venta.titulo}</h5>
        ${variaciones}
    `);
    $('.anchor-tag').lightGallery({
        download: false
    });

    $('.__descripcionadicional').html(
        `<h5 class="mt-4">${idioma.trans89}</h5>
        <p>${venta.detalle_pago.descripcion}</p>`
    );

    $('.__aceptarventa').show('fast');
    $('.__justificaciondeclinarventa').val('').prop('placeholder', idioma.trans101__ph);
    $('.__contenedorjustificacion').hide('slow');
    $('.__contenedorconfirmar').hide('slow');

    confirmarview = false; // Para llamar la wallet 1 vez cuando llama al modal
    walletActiva = null;

    $('.__declinarventa').off('click');
    $('.__declinarventa').on('click', { venta }, declinarComprobante);

    $('.__aceptarventa').off('click');
    $('.__aceptarventa').on('click', { venta }, confirmarComprobante);

    $('#modal-confirmacion-venta').modal('show');
}

function declinarComprobante(e) {
    let venta = e.data.venta;
    $('.__contenedorjustificacion').show('slow');
    const justificacion = $('.__justificaciondeclinarventa').val();
    if (validarText(justificacion)) {
        venta.justificacion = justificacion;
        return enviarDeclinarComprobante(venta);
    }

    $('.__aceptarventa').hide('slow');
    presentAlertObject({ icon: 'warning', text: idioma.trans04_ });
}

function enviarDeclinarComprobante(venta) {
    const dataEnviar = {
        data: {
            id: venta.id,
            uid: user.uid,
            empresa: user.empresa,
            confirmar: 0,
            descripcion: venta.justificacion,
            id_carrito: venta.id_carrito
        }
    }

    console.log('dataEnviar', dataEnviar);

    $.ajax({
        type: "POST",
        url: `${baseurl}/controllers/ventas/?confirmar_comprobante`,
        data: dataEnviar,
        dataType: "json",
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        if (res.status == "success") {
            $('#modal-confirmacion-venta').modal("hide");
            presentAlertObject({ icon: 'success', text: idioma.trans106 });
            getVentas();
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) return presentAlertObject({ icon: 'error', text: idioma.trans105 });
        }

    }).fail((err) => {
        presentAlertObject({ icon: 'error', text: idioma.trans105 });
    });
}

function confirmarComprobante(e) {
    let venta = e.data.venta;
    console.log('venta', venta);
    $('.__declinarventa').hide('slow');
    enviarConfirmarComprobante(venta);
}

function enviarConfirmarComprobante(venta) {

    const dataEnviar = {
        data: {
            id: venta.id,
            uid: user.uid,
            empresa: user.empresa,
            confirmar: 1,
            id_carrito: venta.id_carrito
        }
    }
    console.log('dataEnviar', dataEnviar);

    $('.__aceptarventa').prop('disabled', true);
    $.ajax({
        type: "POST",
        url: `${baseurl}/controllers/ventas/?confirmar_comprobante`,
        data: dataEnviar,
        dataType: "json",
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        $('.__aceptarventa').prop('disabled', false);
        if (res.status == "success") {
            $('#modal-confirmacion-venta').modal('hide');
            presentAlertObject({ icon: 'success', text: idioma.trans104 });
            getVentas();
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) return presentAlertObject({ icon: 'error', text: idioma.trans103 });
        }

    }).fail((err) => {
        $('.__aceptarventa').prop('disabled', false);
        $('#modal-confirmacion-venta').modal('hide');
        presentAlertObject({ icon: 'error', text: idioma.trans103 });
    });
}

function mensajeComprobanteDeclinadoVenta() {
    const mensaje = idioma.trans108.split('$tiempo').join(idioma['_trans374']);
    presentAlertObject({ icon: 'info', text: mensaje });
}


function envioProductoVenta(e) {
    const venta = e.data.venta;
    console.log('venta', venta);

    paisesJSON = JSON.parse(localStorage.getItem('paises'));
    const pais = paisesJSON.filter(datos => datos.country_id == venta.envio.comprador_pais)[0];
    const departamento = pais.departamento.filter(datos => datos.zone_id == venta.envio.comprador_departamento)[0];
    delete (pais.departamento);

    $('.__enviopais').html(pais.pais_name);
    $('.__enviodep').html(departamento.name);
    $('.__enviociudad').html(venta.envio.comprador_ciudad);
    $('.__enviocodigopostal').html(venta.envio.comprador_codigo_postal);
    $('.__enviodirecion').html(venta.envio.comprador_direccion);

    $('.__empresa_envio').val("");
    $('.__numero_guia').val("");

    $('.__empresa_envio').html("");
    $('.__numero_guia').html("");

    $('.__envio1op, .__envio2op, .__envio3op').hide('fast');
    if (venta.envio.tipo_envio == 1) {
        $('.__envio1op').show('show');
        $('.__rutasenvio').html(`
            <div class="spinner-grow text-primary text-center" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        `);
        rutaSeleccionada = null;
        rutasEnvioShippo(venta);
    } else if (venta.envio.tipo_envio == 2) {
        $('.__envio2op').show('show');

        $('.__envioempresa').html(venta.envio.empresa);
        $('.__envionumeroguia').html(venta.envio.numero_guia);

        $('.__empresa_envio').html(venta.envio.empresa);
        $('.__numero_guia').html(venta.envio.numero_guia);

        $('.__envioetiqueta').attr('href', venta.envio.etiqueta_envio).html(idioma.trans120);
        $('.__envioseguimiento').attr('href', venta.envio.url_numero_guia).html(idioma.trans121);
    } else {
        $('.__envio3op').show('show');
    }

    $('.__realizarenvio').off('click');
    $('.__realizarenvio').on('click', { venta }, enviarRuta);
    $('#modal-envio').modal('show');
}

function rutasEnvioShippo(venta) {
    let dataEnviar = {
        data: {
            id: venta.id,
            uid: user.uid,
            empresa: user.empresa,
            id_carrito: venta.id_carrito
        }
    }
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/ventas/?rutas_envio`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        console.log('res', res);
        if (res.status == "success") {
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
            llenarRutasEnvioVentas();
            rutaSeleccionada = rutasDisponibles[0];
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                $('.__rutasenvio').empty();
                return presentAlertObject({ icon: 'error', text: idioma.trans152 });
            }
        }

    }).fail((err) => {
        $('.__rutasenvio').empty();
        presentAlertObject({ icon: 'error', text: idioma.trans152 });
    });
}


function llenarRutasEnvioVentas() {
    console.log('llenarRutasEnvioVentas');
    $('.__rutasenvio').empty();
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
        $('.__rutasenvio').append(`
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
    rutaSeleccionada = e.data.ruta;
}

function enviarRuta(e) {
    //Aqui el envios
    const venta = e.data.venta;
    const numero_guia = $('.__numero_guia').val();
    const empresa_envio = $('.__empresa_envio').val();

    // if (venta.envio.tipo_envio == 1 && !validarText(rutaSeleccionada)) return presentAlertObject({ icon: 'error', text: idioma.trans152 });
    if (/*venta.envio.tipo_envio == 3 && */(!validarText(numero_guia) || !validarText(empresa_envio))) return presentAlertObject({ icon: 'error', text: idioma.trans117 });
    $(".spiner_realizar_envio").show()
    let dataEnviar = {
        data: {
            id: venta.id,
            uid: user.uid,
            empresa: user.empresa,
            adicional: null,
            id_carrito: venta.id_carrito
        }
    }
    // if (venta.envio.tipo_envio == 1) {
    //     dataEnviar.data.adicional = {
    //         id_envio: rutaSeleccionada.shipment,
    //         id_ruta: rutaSeleccionada.object_id
    //     }
    // } else if (venta.envio.tipo_envio == 3) {
    // }
    dataEnviar.data.adicional = {
        "empresa_envio": empresa_envio,
        "numero_guia": numero_guia
    };

    console.log("dataEnviar: ", dataEnviar);
    console.log("dataEnviar: ", dataEnviar);
    console.log("dataEnviar: ", dataEnviar);
    console.log("dataEnviar: ", dataEnviar);
    console.log("dataEnviar: ", dataEnviar);
    console.log("dataEnviar: ", dataEnviar);

    $(e.target).prop('disabled', true);
    $('.__realizarenvio').prop('disabled', true);
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/ventas/?realizar_envio`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        $(".spiner_realizar_envio").hide()
        $(e.target).prop('disabled', false);
        $('#modal-envio').modal('hide');
        $('.__realizarenvio').prop('disabled', false);
        getVentas();
        if (res.status == "success") {
            return presentAlertObject({ icon: 'success', text: idioma.trans118 });
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) return presentAlertObject({ icon: 'error', text: idioma.trans119 });
        }
    }).fail((err) => {
        $(".spiner_realizar_envio").hide()
        $(e.target).prop('disabled', false);
        $('#modal-envio').modal('hide');
        $('.__realizarenvio').prop('disabled', false);
        getVentas();
        presentAlertObject({ icon: 'error', text: idioma.trans119 });
    });
}

function mensajeEsperaDeEnvioVenta() {
    presentAlertObject({ icon: 'info', text: idioma.trans129 });
}

function mensajeEntregadoVenta() {
    const mensaje = idioma.trans130.split('$tiempo').join(idioma['_trans374']);
    presentAlertObject({ icon: 'info', text: mensaje });
}

function mensajeNoConcretadoVenta() {
    presentAlertObject({ icon: 'info', text: idioma.trans110 });
}

function mensajeEsperaDeCalificacionComprador() {
    presentAlertObject({ icon: 'info', text: idioma.trans157 });
}

function mostrarcalificarCompradorVenta(e) {
    const venta = e.data.venta;
    const mensaje = `${idioma.trans123} ${venta.datos_usuario_comprador.nombre}?`;


    $('.__descripcalificarcomprador').val("");

    $('.__nombrecompradocal').html(mensaje);
    $('#__expradio5').prop('checked', true);
    $('#__comuradio5').prop('checked', true);
    $('#__punradio5').prop('checked', true);
    $('.__calificarcomprador').off('click');
    $('.__calificarcomprador').on('click', { venta }, confirmarCalificacionVenta);
    $('#modal-calificar-comprador').modal('show');
}

function confirmarCalificacionVenta(e) {
    const venta = e.data.venta;

    const experienciaventa = $('input[name=__experienciaventa]:checked').val();
    const comunicacioncliente = $('input[name=__comunicacioncliente]:checked').val();
    const puntualidadpago = $('input[name=__puntualidadpago]:checked').val();
    const descripcalificarcomprador = $('.__descripcalificarcomprador').val();

    if (!validarText(experienciaventa)) return presentAlertObject({ icon: 'error', text: idioma.trans131 });
    if (!validarText(comunicacioncliente)) return presentAlertObject({ icon: 'error', text: idioma.trans132 });
    if (!validarText(puntualidadpago)) return presentAlertObject({ icon: 'error', text: idioma.trans133 });
    if (!validarText(descripcalificarcomprador)) return presentAlertObject({ icon: 'error', text: idioma.trans86 });
    $(".spiner_calificar_comprador").show()
    $(e.target).prop('disabled', true);
    let dataEnviar = {
        data: {
            id: venta.id,
            uid: user.uid,
            empresa: user.empresa,
            expriencia_venta: experienciaventa,
            comunicacion_cliente: comunicacioncliente,
            puntualidad_pago: puntualidadpago,
            descripcion: descripcalificarcomprador,
            id_carrito: venta.id_carrito
        }
    }

    console.log("dataEnviar: ", dataEnviar);
    console.log("dataEnviar: ", dataEnviar);
    console.log("dataEnviar: ", dataEnviar);
    console.log("dataEnviar: ", dataEnviar);
    console.log("dataEnviar: ", dataEnviar);
    console.log("dataEnviar: ", dataEnviar);
    console.log("dataEnviar: ", dataEnviar);
    console.log("dataEnviar: ", dataEnviar);

    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/ventas/?calificar_comprador`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        $(".spiner_calificar_comprador").hide()
        $(e.target).prop('disabled', false);
        getVentas();
        $('#modal-calificar-comprador').modal('hide');
        if (res.status == "success") {
            return presentAlertObject({ icon: 'success', text: idioma.trans135 });
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) return presentAlertObject({ icon: 'error', text: idioma.trans134 });
        }

    }).fail((err) => {
        $(".spiner_calificar_comprador").hide()
        $(e.target).prop('disabled', false);
        getVentas();
        $('#modal-calificar-comprador').modal('hide');
        presentAlertObject({ icon: 'error', text: idioma.trans134 });
    });
}

function mostrarDevolucion(e) {
    const venta = e.data.venta;

    console.log('venta', venta);

    paisesJSON = JSON.parse(localStorage.getItem('paises'));
    const pais = paisesJSON.filter(datos => datos.country_id == venta.envio.comprador_pais)[0];
    const departamento = pais.departamento.filter(datos => datos.zone_id == venta.envio.comprador_departamento)[0];
    delete (pais.departamento);

    $('.__enviodevpais').html(pais.pais_name);
    $('.__enviodevdep').html(departamento.name);
    $('.__enviodevciudad').html(venta.envio.comprador_ciudad);
    $('.__enviodevcodigopostal').html(venta.envio.comprador_codigo_postal);
    $('.__enviodevdirecion').html(venta.envio.comprador_direccion);


    $('.__numguiaviewvendedor').html(venta.envio.numero_guia);
    $('.__empresaenvioviewvendedor').html(venta.envio.empresa);

    $('.__confirmardevolucion').off('click');
    $('.__confirmardevolucion').on('click', { venta }, confirmarDevolucion);

    $('#modal-devolucion-vendedor').modal('show');
}

function confirmarDevolucion(e) {
    const venta = e.data.venta;

    const dataEnviar = {
        data: {
            id: venta.id,
            uid: user.uid,
            empresa: user.empresa,
            id_carrito: venta.id_carrito
        }
    }

    console.log('venta', venta);
    $('#modal-devolucion-vendedor').modal('hide');

    $(e.target).prop('disabled', false);
    $.ajax({
        type: "POST",
        url: `${baseurl}/controllers/ventas/?confirmar_devolucion`,
        data: dataEnviar,
        dataType: "json",
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        $(e.target).prop('disabled', false);
        if (res.status != 'success') {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) return presentAlertObject({ icon: 'error', text: idioma.trans139 });
        }
        presentAlertObject({ icon: 'success', text: idioma.trans140 });
        getVentas();
    }).fail((err) => {
        $(e.target).prop('disabled', false);
        presentAlertObject({ icon: 'error', text: idioma.trans139 });
    });
}

function mensajeFinalizadoVenta() {
    presentAlertObject({ icon: 'info', text: idioma.trans136 });
}

decrementaraumentar = (id) => {
    if (id == 1) {
        getVentas((paginaactual - 1));
    } else {
        getVentas((paginaactual + 1));
    }
}

// 10 octubre 2020
function misVentas_estadisticas() {
    let dataEnviar = {
        "data": {
            "uid": user.uid,
            "empresa": user.empresa
        }
    };
    let data_url = `${baseurl}/controllers/ventas/?resumen_ventas`;
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        console.log("-----------[]> res: ", res);
        let data = {
            por_preparar: 0,
            despachar: 0,
            transito: 0,
            finalizadas: 0
        };
        if (res['status'] == "success") {
            data = res.data;

        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) { }
        }
        $('.ventas__estadistica__preparar').text(data.por_preparar);
        $('.ventas__estadistica__despachar').text(data.despachar);
        $('.ventas__estadistica__transito').text(data.transito);
        $('.ventas__estadistica__finalizadas').text(data.finalizadas);


    }).fail((err) => {
        $('.ventas__estadistica__preparar').text(0);
        $('.ventas__estadistica__despachar').text(0);
        $('.ventas__estadistica__transito').text(0);
        $('.ventas__estadistica__finalizadas').text(0);
    });
}


//15 octubre 2020 - JDBC
var ventas__orderItemAct = {};
function ventas_timeLine($event) {
    ventas__orderItemAct = $event.data.item; // Antes
    // ventas__orderItemAct = $event.data; // Ahora

    console.log("\n\n");
    console.log("\t\t %=======================% ");
    console.log("\t\t ventas__orderItemAct: ", ventas__orderItemAct);
    console.log("\t\t ventas__orderItemAct: ", ventas__orderItemAct.timeline);
    console.log("\t\t %=======================%");
    console.log("\n\n\n\n");

    if (!$('.modal').hasClass('in')) {
        $('#modal-ventas-timeline-detalle-orden').modal("show");
    }
    ventas_timeLineShow(ventas__orderItemAct);
}
async function ventas_timeLineShow(ventas__paramOrderItemAct) {

    console.log("ventas__paramOrderItemAct: ", ventas__paramOrderItemAct);
    console.log("ventas__arraydelosestados: ", ventas__arraydelosestados);

    if (ventas__paramOrderItemAct.timeline) {
        let unidad_moneda = await getCoinLabel(ventas__paramOrderItemAct.moneda);
        let monto = ventas__paramOrderItemAct.precio_mask;
        let monto_con_unidad = monto + " " + unidad_moneda;
        $('.ventas__timeline__img').attr('src', ventas__paramOrderItemAct.foto_portada);
        $('.ventas__timeline__img').prop('id', ventas__paramOrderItemAct.id);
        $('.ventas__timeline__img').prop('position', 0);
        $('.ventas__timeline__nameproduct').text(ventas__paramOrderItemAct.titulo);
        let variaciones = ""
        $(".ventas__timeline__variantes").empty()
        console.log(ventas__paramOrderItemAct)
        if (ventas__paramOrderItemAct.variaciones) {
            $.each(ventas__paramOrderItemAct.variaciones, function (i, vari) {
                variaciones += `<div class="return-td" style="display: flex;">
                                    <div> Color ${i + 1}:  </div>
                                    <div style="width:20px;height:12px; border-radius: 15px; margin:5px; background:${vari.color}"></div>
                                    <div>${idioma.trans_eb12} ${i + 1}: ${vari.tallaES}</div>
                                </div>`
            });
            $(".ventas__timeline__variantes").html(variaciones)

        }


        // $('.ventas__timeline__amount').text(monto_con_unidad);
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

        console.log("\n\n\n\n");
        let saldosHTML__ventas = "";
        if (ventas__paramOrderItemAct.sd * 1 > 0) {
            console.log("\n\t [ ventas__paramOrderItemAct.sd ]: ", ventas__paramOrderItemAct.sd);
            saldosHTML__ventas += `<span class="money-sd">${ventas__paramOrderItemAct.sd_mask} ${await getCoinLabel("Nasbigold")}</span> <br> `;
        }
        if (ventas__paramOrderItemAct.bd * 1 > 0) {
            console.log("\n\t [ ventas__paramOrderItemAct.bd ]: ", ventas__paramOrderItemAct.bd);
            saldosHTML__ventas += `<span class="money-bd">${ventas__paramOrderItemAct.bd_mask} ${await getCoinLabel("Nasbiblue")}</span> <br>`;
        }
        if (ventas__paramOrderItemAct.fiat * 1 > 0) {
            console.log("\n\t [ ventas__paramOrderItemAct.fiat ]: ", ventas__paramOrderItemAct.fiat);
            saldosHTML__ventas += `<span class="money-fiat">${ventas__paramOrderItemAct.fiat_mask} ${await getCoinLabel(ventas__paramOrderItemAct.moneda_fiat)}</span>`;
        }

        console.log("-----> [ saldosHTML__ventas ]: ", saldosHTML__ventas);
        $('.ventas__timeline__amount').html(saldosHTML__ventas);

        try {
            $('.ventas__timeline__comprador__city').text(" " + ventas__paramOrderItemAct.envio.comprador_ciudad);
            $('.ventas__timeline__comprador__address').text(ventas__paramOrderItemAct.envio.comprador_direccion);
        } catch (ex) {
            console.log(ex);
        }

        $('.ventas__timeline__id').text(ventas__paramOrderItemAct.id_carrito);

        $('.ventas__timeline__descripcion').html("");
        let steps = "";
        console.log(ventas__paramOrderItemAct.timeline);
        ventas__paramOrderItemAct.timeline.forEach((item, indice) => {
            let schemaStep = ventas__arraydelosestados[item.estado - 1];
            console.log("----====> Actual paso: ", schemaStep);
            var fecha = getFechaConHoraV2(1 * item.fecha_actualizacion).split(' ')[0];
            var rutaFecha = fecha.split('/');
            var diaMes = rutaFecha[0] + '/' + rutaFecha[1];
            $('._option_' + indice).text(diaMes);
            steps += `<p class="info-ord"><b>${getFechaConHoraV2(1 * item.fecha_actualizacion)}: </b> ${schemaStep.descripcion}</p>`;

            $('.ventas__timeline__process__steps__2').removeClass('pointactive');
            $('.ventas__timeline__process__steps__3').removeClass('pointactive');
            $('.ventas__timeline__process__steps__4').removeClass('pointactive');
            $('.ventas__timeline__process__steps__1').removeClass('pointactive');

            $('.ol-timeline').show();
            $('.message_aux').hide();
            if (item.estado >= 1) {
                //Recibida por el vendedor.
                $('.ventas__timeline__process__steps__1').addClass('pointactive');
                console.log("el estado: ", item.estado);
                if (item.estado == 2) {
                    console.log("primera condicion D");
                    $('.ol-timeline').hide();
                    $('.message_aux').show();
                    $('.message_aux').html(`<h4><strike>${idioma.trans257}</strike></h4>`);
                }

                if (item.estado == 10) {
                    console.log("primera condicion NC");
                    $('.ol-timeline').hide();
                    $('.message_aux').show();
                    $('.message_aux').html(`<h4><strike>${idioma.trans258}</strike></h4>`);
                }

            }
            if (item.estado > 1) {
                //Recibida por el vendedor.
                $('.ventas__timeline__process__steps__2').addClass('pointactive');

                if (item.estado == 2) {
                    console.log("segunda condicion D");
                    $('.ol-timeline').hide();
                    $('.message_aux').show();
                    $('.message_aux').html(`<h4><strike>${idioma.trans257}</strike></h4>`);
                }

                if (item.estado == 10) {
                    console.log("segunda condicion NC");
                    $('.ol-timeline').hide();
                    $('.message_aux').show();
                    $('.message_aux').html(`<h4><strike>${idioma.trans258}</strike></h4>`);
                }

            }
            if (item.estado >= 7) {
                //En camino.
                $('.ventas__timeline__process__steps__3').addClass('pointactive');

                if (item.estado == 10) {
                    $('.ol-timeline').hide();
                    $('.message_aux').show();
                    $('.message_aux').html(`<h4><strike>${idioma.trans258}</strike></h4>`);
                }

            }
            if (item.estado >= 8) {
                $('.ventas__timeline__process__steps__4').addClass('pointactive');

                if (item.estado == 10) {
                    console.log("cuarta condicion NC");
                    $('.ol-timeline').hide();
                    $('.message_aux').show();
                    $('.message_aux').html(`<h4><strike>${idioma.trans258}</strike></h4>`);
                }
            }
        });
        ventas_timeline_cargaritems(ventas__paramOrderItemAct);
        $('.ventas__timeline__descripcion').html('<br>' + steps);



    } else {
        alert("---*>" + idioma['_trans330'], ventas__paramOrderItemAct);
        $('#modal-ventas-timeline-detalle-orden').modal("hide");
        console.log("ventas__paramOrderItemAct: ", ventas__paramOrderItemAct);
    }
}

function obtener_unidad_moneda_ventas(unidad) {
    return new Promise((resolve) => {
        switch (unidad) {
            case "nasbicoin_gold":
                resolve(idioma.trans37_)
                break;
            case "nasbicoin_blue":
                resolve(idioma.trans36_)
                break;
            case "nasbicoin":
                break;


            default:
                resolve(unidad)
                break;
        }

    });
}


function validar_si_es_empresa() {
    if (user.empresa != 0) {
        let params_em = new URLSearchParams(location.search);
        let position_card_product_crear_em = params_em.get('position_pro_em');
        if (position_card_product_crear_em) {
            $('.titulosdeventas').hide('slow');
            $(".paginacion_numeros").hide();
            $(".conten_opcion_crear_em").show();


            $('.boton_publicar_individual').off('click');
            $('.boton_publicar_individual').on('click', null, function () {
                loadPage(`vender.php?position_pro_em=${position_card_product_crear_em}`)
            });
        } else {
            $('.titulosdeventas').hide('slow');
            $(".paginacion_numeros").hide();
            $(".conten_opcion_crear_em").hide();
            return $('.ventas__list__nodata').show('slow');
        }
    } else {
        $(".conten_opcion_crear_em").hide();
        $('.titulosdeventas').hide('slow');
        $(".paginacion_numeros").hide()

        return $('.ventas__list__nodata').show('slow');
    }

}



function ventas_timeline_cargaritems(ventas__paramOrderItemAct = {}) {
    console.log(ventas__paramOrderItemAct, "mmmmmmmmm");
    $('.ventas_timeline__items').html("");
    let count = 0;
    for (let key in ventas__paramOrderItemAct.dataCarritoFull.productos) {
        let productSchema = ventas__paramOrderItemAct.dataCarritoFull.productos[key];
        let htmlSchema = `
            <div>
                <img loading="lazy" src="${productSchema.foto_portada}" alt="nasbi.com" id=${key} class=" item_producto_comprar_detalle compras__timeline__img__${key}">
            </div>
        `;
        $('.ventas_timeline__items').append(htmlSchema);

        // $(`.compras__timeline__img__${key}`).eq(count).off('click');
        // $(`.compras__timeline__img__${key}`).eq(count).on('click', { item: productSchema }, compras_timelineShowItemSelected);

        $(".item_producto_comprar_detalle").eq(count).off('click');
        $(".item_producto_comprar_detalle").eq(count).on('click', { item: productSchema, key, position: count }, ventas_timelineShowItemSelected);


        count++;

    }
    if (count < 4) {
        for (let i = 0; i < 4 - count; ++i) {
            $('.ventas_timeline__items').append(`
                <div>
                    <img loading="lazy" src="../imagen/product.jpg" alt="nasbi.com">
                </div>
            `);
        }
    }

    if (count > 1) {
        $(".vender__nasbi__btnnext").show();
        $(".vender__nasbi__btnprev").show();
        $('.vender__nasbi__btnprev').off('click');
        $('.vender__nasbi__btnprev').on('click', { tipo: -1, array_productos_carrito: ventas__paramOrderItemAct.dataCarritoFull.productos }, prevNext_vender)

        $('.vender__nasbi__btnnext').off('click');
        $('.vender__nasbi__btnnext').on('click', { tipo: 1, array_productos_carrito: ventas__paramOrderItemAct.dataCarritoFull.productos }, prevNext_vender)
    } else {
        $(".vender__nasbi__btnnext").hide();
        $(".vender__nasbi__btnprev").hide();
    }

}

async function ventas_timelineShowItemSelected($e, id = "0") {
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


    $('.ventas__timeline__img').attr('src', product_select_detalle.foto_portada);
    $('.ventas__timeline__img').prop('id', key);
    $('.ventas__timeline__img').prop('position', position);
    $('.ventas__timeline__nameproduct').text(product_select_detalle.titulo);
    let variaciones = ""
    $(".ventas__timeline__variantes").empty()
    console.log(product_select_detalle)
    if (product_select_detalle.variaciones) {
        $.each(product_select_detalle.variaciones, function (i, vari) {
            variaciones += `<div class="return-td"style=" display: flex;">
                                    <div> Color ${i + 1}:  </div>
                                    <div style="width:20px;height:12px; border-radius: 15px; margin:5px; background:${vari.color}"></div>
                                    <div>${idioma.trans_eb12} ${i + 1}: ${vari.tallaES}</div>
                                </div>`
        });
        $(".ventas__timeline__variantes").html(variaciones)

    }

    let saldosHTML__ventas = "";
    if (product_select_detalle.sd * 1 > 0) {
        console.log("\n\t [ product_select_detalle.sd ]: ", product_select_detalle.sd);
        saldosHTML__ventas += `<span class="money-sd">${product_select_detalle.sd_mask} ${await getCoinLabel("Nasbigold")}</span> <br> `;
    }
    if (product_select_detalle.bd * 1 > 0) {
        console.log("\n\t [ product_select_detalle.bd ]: ", product_select_detalle.bd);
        saldosHTML__ventas += `<span class="money-bd">${product_select_detalle.bd_mask} ${await getCoinLabel("Nasbiblue")}</span> <br>`;
    }
    if (product_select_detalle.fiat * 1 > 0) {
        console.log("\n\t [ product_select_detalle.fiat ]: ", product_select_detalle.fiat);
        saldosHTML__ventas += `<span class="money-fiat">${product_select_detalle.fiat_mask} ${await getCoinLabel(product_select_detalle.moneda_fiat)}</span>`;
    }

    $('.ventas__timeline__amount').html(saldosHTML__ventas);


}

function prevNext_vender($e) {
    let array_productos_carrito = [];
    let boton = $e.data.tipo;
    const productos_carrito = { ...$e.data.array_productos_carrito };
    for (let i in productos_carrito) {
        array_productos_carrito.push(productos_carrito[i]);
    }
    let key = $('.ventas__timeline__img').prop("id");
    let postition_img_actual = $('.ventas__timeline__img').prop("position");
    let data_a_mostrar = [];


    if (boton == 1) { //siguiente
        if (postition_img_actual == array_productos_carrito.length - 1) {
            data_a_mostrar.item = array_productos_carrito[0];
            data_a_mostrar.key = array_productos_carrito[0].id;
            data_a_mostrar.position = 0;
            ventas_timelineShowItemSelected(data_a_mostrar, "1");
        } else {
            data_a_mostrar.item = array_productos_carrito[postition_img_actual + 1];
            data_a_mostrar.key = array_productos_carrito[postition_img_actual + 1].id;
            data_a_mostrar.position = postition_img_actual + 1;
            ventas_timelineShowItemSelected(data_a_mostrar, "1");
        }
    } else if (boton == -1) {//anterior
        if (postition_img_actual == 0) {
            let tama_array = array_productos_carrito.length;
            data_a_mostrar.item = array_productos_carrito[tama_array - 1];
            data_a_mostrar.key = array_productos_carrito[tama_array - 1].id;
            data_a_mostrar.position = tama_array - 1;
            ventas_timelineShowItemSelected(data_a_mostrar, "1");
        } else {
            data_a_mostrar.item = array_productos_carrito[postition_img_actual - 1];
            data_a_mostrar.key = array_productos_carrito[postition_img_actual - 1].id;
            data_a_mostrar.position = postition_img_actual - 1;
            ventas_timelineShowItemSelected(data_a_mostrar, "1");
        }
    }

}

function prevNext_confirmar_venta($e) {
    let array_productos_carrito_chat = [];
    let boton = $e.data.tipo;
    let postition_img_actual = $(".img_producto_confirm").prop("position");
    let imagenProducto, titulo, variaciones;

    const productos_carrito = { ...$e.data.array_productos_carrito };
    for (let i in productos_carrito) {
        array_productos_carrito_chat.push(productos_carrito[i]);
    }
    if (boton == 1) { //siguiente
        if (postition_img_actual == array_productos_carrito_chat.length - 1) {
            let tama_array = array_productos_carrito_chat.length;
            imagenProducto = array_productos_carrito_chat[0].foto_portada;
            titulo = array_productos_carrito_chat[0].titulo;
            position = 0;
            if (array_productos_carrito_chat[0].variaciones) {
                variaciones = array_productos_carrito_chat[0].variaciones;
            }
            mostrar_datos_producto_confirm_ventas(imagenProducto, titulo, position, variaciones);
        } else {
            imagenProducto = array_productos_carrito_chat[postition_img_actual + 1].foto_portada;
            titulo = array_productos_carrito_chat[postition_img_actual + 1].titulo;
            position = postition_img_actual + 1;
            if (array_productos_carrito_chat[postition_img_actual + 1].variaciones) {
                variaciones = array_productos_carrito_chat[postition_img_actual + 1].variaciones;
            }
            mostrar_datos_producto_confirm_ventas(imagenProducto, titulo, position, variaciones);

        }
    } else if (boton == -1) {//anterior
        if (postition_img_actual == 0) {
            let tama_array = array_productos_carrito_chat.length;
            imagenProducto = array_productos_carrito_chat[tama_array - 1].foto_portada;
            titulo = array_productos_carrito_chat[tama_array - 1].titulo;
            position = tama_array - 1;
            if (array_productos_carrito_chat[tama_array - 1].variaciones) {
                variaciones = array_productos_carrito_chat[tama_array - 1].variaciones;
            }

            mostrar_datos_producto_confirm_ventas(imagenProducto, titulo, position, variaciones);

        } else {
            imagenProducto = array_productos_carrito_chat[postition_img_actual - 1].foto_portada;
            titulo = array_productos_carrito_chat[postition_img_actual - 1].titulo;
            position = postition_img_actual - 1;
            if (array_productos_carrito_chat[postition_img_actual - 1].variaciones) {
                variaciones = array_productos_carrito_chat[postition_img_actual - 1].variaciones;
            }

            mostrar_datos_producto_confirm_ventas(imagenProducto, titulo, position, variaciones);
        }
    }
}


function mostrar_datos_producto_confirm_ventas(imagenProducto, titulo, position, variaciones) {

    $('.img_producto_confirm').prop('position', position)
    $('.img_producto_confirm').attr('src', imagenProducto)
    $('.titulo_pro_confirm').text(titulo)
    let HTMLvariaciones = ""
    $(".variaciones_ventas").empty()
    console.log(variaciones)
    if (variaciones) {
        $.each(variaciones, function (i, vari) {
            HTMLvariaciones += `<div class="return-td" style=" display: flex; justify-content:center">
                                    <div > Color ${i + 1}:  </div>
                                    <div style="width:20px;height:12px; border-radius: 15px; margin:5px; background:${vari.color}"></div>
                                    <div>${idioma.trans_eb12} ${i + 1}: ${vari.tallaES}</div>
                            </div>`
        });
        $(".variaciones_ventas").html(HTMLvariaciones)

    }

}

