function cargarPrimero() {
    validarlogueado();
}

function validarlogueado() {
    if (validarText(user)) {
        return true;
    } else {
        loadPage("index.php?s=0")
    }

}

$('.img_unidad_nabicoind').prop("src", "../imagen/icon_wallets/nasbi_blue.png");
let miuser_uid = validarText(user) ? user.uid : null;
let miuser_empresa = validarText(user) ? user.empresa : null;
let miuser_lang = validarText(user) && validarText(user.idioma) ? user.idioma.toUpperCase() : "ES";
arraydelosestados_subasta = [];
filtrar_valor = '';
tipo_listado_subasta = 0;
url_general = getBaseUrlProject();

var __wallet_usuario;


// subasta
function cargarPrimero() {
    miuser_uid = validarText(user) ? user.uid : null;
    miuser_empresa = validarText(user) ? user.empresa : null;
    miuser_lang = validarText(user) && validarText(user.idioma) ? user.idioma.toUpperCase() : "ES";
    if (validarlogueado()) {
        validarClave();
        getsubastas();
        getDireccionesSubasta()
        llenar_array_estado_subasta();
    }
}


$(document).ready((e) => {
    cargarPrimero();
    $(".__cantidadPuja").keyup(($event) => {


        let check_sugerido = $(".modal__puja__sugerido").prop("checked");
        if (check_sugerido) {
            if (schemaContentSubasta.sugerido * 1 != $event.target.value * 1) {
                $(".modal__puja__sugerido").prop("checked", false);
            }
        } else {
            if ($event.target.value) {
                let ofertaCOIN = $event.target.value * 1;

                let __cantidadPujaUSD = ofertaCOIN * schemaContentSubasta.precio_moneda * 1;
                $('.__cantidadPujaUSD').val(formatNumberUsd(__cantidadPujaUSD));
            }

        }
    });
    $(".ver__historial").click(($event) => {
        $('#nav-historial').click();
    });
    $(".historial_subasta").click(($event) => {
        if (validarlogueado()) {
            tipo_listado_subasta = 1;
            llenar_array_estado_subasta();
            $('.select_filtro_subasta').val(0);
            getsubastas(1, "");
        }
    });

    $(".tablero_subasta").click(($event) => {
        if (validarlogueado()) {
            tipo_listado_subasta = 0;
            llenar_array_estado_subasta();
            $('.select_filtro_subasta').val(0);
            getsubastas();
        }

    });

    $(".filtrar_subasta").click(($event) => {
        if ($('.select_filtro_subasta')[1].value == 0) {
            getsubastas();
        } else {
            getsubastas(1, $('.select_filtro_subasta')[1].value);
        }
    });

    //si le en el que esta la billetera ya bloqueaada si cierra pues que se le desbloquee la billetera al usuario
    //BOTONES SALIR//
    $(".alert_salir_flu_su_at").click(async ($event) => {
        let salir_su = await validar_salir_flujo_su();
        if (!salir_su) { // si es false cierra el modal
            $('#modal-atencion').modal('hide');
        }
    });

    $(".alert_salir_flu_su_bille").click(async ($event) => {
        $('#modal-seleccionar-billetera').modal('hide');
        /*let salir_su= await validar_salir_flujo_su(); 
        if(!salir_su){
            $('#modal-seleccionar-billetera').modal('hide');
        }*/
    });

    $(".alert_salir_flu_su_confir").click(async ($event) => {
        // let salir_su= await validar_salir_flujo_su(); 
        //  if(!salir_su){
        $('.pass_transacciones_in').val("");
        $('#modal-confirmacion').modal('hide');
        //}
    });

    $(".acept_buen_trabajo").click(async ($event) => {
        getsubastas();
        llenar_array_estado_subasta();



        abrirModalPuja(schemaSubasta);
    });

    $(".alert_salir_flu_su_buen").click(async ($event) => {
        let salir_su = await validar_salir_flujo_su();
        if (!salir_su) { // si es false cierra el modal
            $('#modal-buen-trabajo').modal('hide');
        }
    });

    $('.modal__puja__sugerido').on('change', ($event) => {
        let check_sugerido = $(".modal__puja__sugerido").prop("checked");
        sugerido(check_sugerido, schemaSubasta);
    });
});

function llenar_array_estado_subasta() {
    arraydelosestados_subasta = [
        { id: 1, text: idioma.trans62_ },
        { id: 2, text: idioma.trans63_ },
        { id: 3, text: idioma.trans64_ },
        { id: 4, text: idioma.trans67_ },
    ];

    let arraydetipos_subasta = [
        { id: 0, text: idioma.trans307_ },
        { id: 1, text: idioma._trans40 },
        { id: 2, text: idioma._trans41 },
        { id: 3, text: idioma._trans42 },
        { id: 4, text: idioma._trans43 },
        { id: 5, text: idioma.trans81_ },
        { id: 6, text: idioma.trans149 },
    ];
    llenar_select_mis_subasta(arraydetipos_subasta, ".select_filtro_subasta");
}

function llenar_select_mis_subasta(array, clase) {
    $(clase).selectpicker('destroy');
    let select_moneda = "";
    $.each(array, function (i, fuente) {
        select_moneda += `<option value="${fuente.id}">${fuente.text}</option>`;
    });
    $(clase).html(select_moneda);
    $(clase).selectpicker({
        size: 7,
        liveSearch: false,
        dropupAuto: false,
        showSubtext: true
    });

}

function getsubastas(pagina_mandar = 1, tipo_ticket = "") {
    // let datadireccion =dir.data.direccion; 
    // console.log(datadireccion, "direccion");
    let dataEnviar
    $('.content__loadingSpinner_mis_subasta').show();
    if (validarNumero(tipo_ticket)) {

        dataEnviar = {
            data: {
                uid: user.uid,
                empresa: user.empresa,
                tipo: tipo_ticket,
                pagina: pagina_mandar,
                historial: tipo_listado_subasta

            }
        }
    } else {
        dataEnviar = {
            data: {
                uid: user.uid,
                empresa: user.empresa,
                pagina: pagina_mandar,
                historial: tipo_listado_subasta,

            }
        }
    }
    let data_url = baseurl + "/controllers/mis_subastas/?mis_subastas";
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        $('.content__loadingSpinner_mis_subasta').hide();
        if (res.status == 'success') {
            console.log("historial_subasta_tabla, nada de nada 2, ", tipo_listado_subasta);
            switch (tipo_listado_subasta) {

                case 0:
                    $('.subastas__list__nodata').addClass('d-none');
                    $('.tablero_subasta_tabla').removeClass('d-none');
                    $('.list__subastas__pagination').show('flash');
                    $('.list__subastas_historial__pagination').hide();
                    llenar_subastas(res.data, res.total_paginas, res.pagina);
                    break;
                case 1:
                    console.log("historial_subasta_tabla, nada de nada");
                    $('.subastas__list__nodata').addClass('d-none');
                    $('.historial_subasta_tabla').removeClass('d-none');
                    $('.list__subastas__pagination').hide();
                    $('.list__subastas_historial__pagination').show('flash');
                    llenar_subastas_historial(res.data, res.total_paginas, res.pagina);

                    break;

                default:
                    break;
            }

        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                $('.tablero_subasta_tabla').addClass('d-none');
                $('.historial_subasta_tabla').addClass('d-none');
                $('.subastas__list_historial').empty();
                $('.subastas__list').empty();
                $('.subastas__list__nodata').removeClass('d-none');
                $('.list__subastas_historial__pagination').hide();
                $('.list__subastas__pagination').hide();
            }
        }

    }).fail((err) => {
        $('.content__loadingSpinner_mis_subasta').hide();
        $('.list__subastas_historial__pagination').hide();
        $('.list__subastas__pagination').hide();
        $('.modal__advertencias__title').text(idioma['trans68_']);
        $('.modal__advertencias__description').text(idioma['trans51_']);
        $('#modal-advertencias').modal('show');
    });
}

function llenar_subastas(mis_subastas, paginas_total, pagina) {
    $('.subastas__list').empty();
    for (const x in mis_subastas) {
        const subasta = mis_subastas[x];
        let fecha_mostrar = getFechaSinHora(subasta.fecha_actualizacion);
        let punto_subasta = subasta.estado_subasta == 3 ? `<div class="vineta"></div>` : "";
        let opcionesdeestado_subasta = arraydelosestados_subasta.filter(datos => datos.id == subasta.estado_subasta)[0]
        $('.subastas__list').append(
            `<tr>
                <td>
                    <div class="containe-fto">
                        <img src=${subasta.foto_portada} class="img-articulo">
                    </div>
                </td>
                <td><div class="name-product">${subasta.descripcion}</div></td>
                <td>${subasta.id_subasta}</td>
                <td><img src="../imagen/img-inscritos.png" class="img-inscr">${subasta.inscritos}</td>
                <td>${subasta.tipo_descripcion}</td>
                <td>${fecha_mostrar}</td>
                <td><span class="spanv">${punto_subasta}</div></span>${opcionesdeestado_subasta.text}</td>
                <td><button class="entrar button-modificar texto_entrar_subasta __entrarsubasta">${idioma.trans305_}</button></td>
                <td><button class="button-modificar texto_entrar_subasta __invitarsubasta" data-toggle="modal" data-target="#modal-compartir-subasta">${idioma.trans304_}</button></td>
            </tr>`
        );
        $('.__entrarsubasta').eq(x).off('click');
        $('.__entrarsubasta').eq(x).on('click', { subasta }, entrarSubasta);

        $('.__invitarsubasta').eq(x).off('click');
        $('.__invitarsubasta').eq(x).on('click', { subasta }, invitar_subasta);

    }
    let paramsPagination = {
        total_paginas: paginas_total,
        pagina: pagina
    };
    let result = generatePaginations(paramsPagination);
    $('.list__subastas__pagination').html(result);
    $('html, body').animate({ scrollTop: 0 }, 500);
}

function llenar_subastas_historial(mis_subastas_historial, paginas_total_h, pagina_h) {
    $('.subastas__list_historial').empty();
    for (const x in mis_subastas_historial) {
        const subastaH = mis_subastas_historial[x];
        let fecha_mostrar = getFechaSinHora(subastaH.fecha_actualizacion);
        let resultado_subasta = subastaH.uid_ganador == user.uid ? idioma.trans82_ : idioma.trans83_;
        $('.subastas__list_historial').append(`
            <tr>
                <td>
                    <div class="containe-fto">
                        <img src=${subastaH.foto_portada} class="img-articulo">
                    </div>
                </td>
                <td><div class="name-product">${subastaH.descripcion}</div></td>
                <td>${subastaH.id_subasta}</td>
                <td><img src="../imagen/img-inscritos.png" class="img-inscr"> ${subastaH.inscritos}</td>
                <td>${subastaH.tipo_descripcion}</td>
                <td>${fecha_mostrar}</td>
                <td><div>${resultado_subasta}</div></td>
            </tr>
        `);
        // $('.boton_entrarSubasta').eq(x).off('click');
        // $('.boton_entrarSubasta').eq(x).on('click', { subastaH } , entrarSubasta);

        // $('.__invitarsubasta').eq(x).off('click');
        // $('.__invitarsubasta').eq(x).on('click', { subastaH } , invitar_subasta);

    }
    let paramsPagination = {
        total_paginas: paginas_total_h,
        pagina: pagina_h
    };
    let result = generatePaginations(paramsPagination);
    $('.list__subastas_historial__pagination').html(result);
    $('html, body').animate({ scrollTop: 0 }, 500);
}

function entrarSubasta(e) {
    const subasta = e.data.subasta;

    schemaSubasta = e.data.subasta;


    if (subasta.estado_subasta == 1) {
        $('#modal-preguntar-direccion').modal("show")
        $(".btn_continuar_subasta").off()
        $(".btn_continuar_subasta").on('click', function () {
            let labelTemporizador = idioma['trans86_'];
            if (subasta.fecha_inicio) {
                labelTemporizador = labelTemporizador.split("@@@").join(obtenerTimeInicio(subasta.fecha_inicio));
            }
            $('.modal__advertencias__title').text(idioma.trans512_);
            $('.modal__advertencias__description').text(labelTemporizador);
            $('#modal-advertencias').modal('show');
        })
    } else if ((subasta.estado_subasta == 2 || subasta.estado_subasta == 3) && subasta.estado == 2) {
        abrirModalPuja(subasta);

    } else if ((subasta.estado_subasta == 2 || subasta.estado_subasta == 3) && subasta.estado != 2) {
        $('#modal-preguntar-direccion').modal("show")
        $(".btn_continuar_subasta").off()
        $(".btn_continuar_subasta").on('click', function () {
            $('#modal-atencion').modal('show');
            $('.aceptar_to_billetera').off('click');
            $('.aceptar_to_billetera').on('click', { subasta }, seleccionarbilletera);
        })
    } else {
    }




}


function seleccionarbilletera(e) {
    console.log(e.data);
    console.log(e.data);
    console.log(e.data);
    console.log(e.data);
    console.log(e.data);
    console.log(e.data);
    console.log(e.data);
    let subasta_select = e.data.subasta;

    $('#modal-atencion').modal('hide');
    $('#modal-seleccionar-billetera').modal('show');
    $('.mensaje_recarga_bille').empty();
    $('.mensaje_recarga_bille').append(`${idioma.trans91_} <a class="aqui_recarga" href="e-wallet.php">${idioma.trans92_}</a>`)
    const dataEnviar = {
        data: {
            "uid": user.uid,
            "empresa": user.empresa,
            "tipo": subasta_select.moneda
        }
    };
    $.ajax({
        type: "POST",
        url: `${baseurl}/controllers/nasbicoin/?wallet_usuario`,
        data: dataEnviar,
        dataType: "json",
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        if (res.status == 'success') {
            continua_bloqueo_subasta(res, subasta_select);
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                console.log("mal");
            }
        }
    }).fail((err) => {
        console.log("mal");
    });
}

function continua_bloqueo_subasta(billetera_posibles, subasta_play) {
    console.log(billetera_posibles);
    console.log("--->");
    console.log(subasta_play);

    let subasta_to_play = subasta_play;
    let moneda_subasta = subasta_to_play.moneda;
    let array_billetera_subasta = [];


    if (moneda_subasta == "Nasbigold") {
        array_billetera_subasta = billetera_posibles.nasbicoin_gold;
        $('.img_unidad_nabicoind').prop("src", "../imagen/icon_wallets/nasbi_gold.png");
        $('.bono_activo_subasta_blo').html(idioma.trans87_);

    } else { //hacer un if de validar con el nasbiblue saber como viene del wbs en la data subasta
        array_billetera_subasta = billetera_posibles.nasbicoin_blue;
        $('.img_unidad_nabicoind').prop("src", "../imagen/icon_wallets/nasbi_blue.png");
        $('.bono_activo_subasta_blo').html(idioma.trans88_);
    }

    __wallet_usuario = array_billetera_subasta;


    $('.valor_disponible_bille_blo').val(array_billetera_subasta.monto_mask);
    $('.aceptar_billetera_blo').off('click');
    $('.aceptar_billetera_blo').on('click', { billetera_moneda_subasta: array_billetera_subasta, data_subasta: subasta_to_play }, validar_valores_bille_bloquear);
}

function secret_pin_validar(valor) {
    return new Promise((resolve) => {

        let respuesta = false;
        let secret_usuario_trans = valor;
        let data1 = {
            uid: user.uid,
            secret: secret_usuario_trans
        }

        console.log(secret_usuario_trans, data1, "secret pin")


        $.ajax({
            type: "POST",
            url: `${serverUrl}controllers/users/verifySecret.php`,
            data: data1,
            dataType: "json",
            "headers": { 'x-api-key': user.token },

        }).done(async (res) => {
            if (res.status == 'success') {
                respuesta = true;
                resolve(respuesta);
            } else {
                let validate_token = await erroresTokenEmpresa(res);
                if (!validate_token) {
                    respuesta = false;
                    alertInfor(idioma['trans_109'], idioma['trans98_']);
                    resolve(respuesta);
                }
            }
        }).fail((err) => {
            repuesta = false;
            alertInfor(idioma['trans_109'], idioma['trans98_']);

            resolve(respuesta);

        });

    });
}

function validar_valores_bille_bloquear(e) {
    let data_billetera = e.data.billetera_moneda_subasta;
    let data_subasta = e.data.data_subasta;

    if (!$('.eleccion_billetera_chek').prop('checked')) {
        alertInfor(idioma['trans68_'], idioma['trans95_']);
    } else {

        if (data_billetera.monto > 0) {
            $('#modal-confirmacion').modal('show');
            $('.confirmar_trans_con').off('click');
            $('.confirmar_trans_con').on('click', { billetera_moneda_subasta: data_billetera, data_subasta: data_subasta }, validar_trans_contra_fun);
        } else {
            alertInfor(idioma['trans68_'], idioma['trans93_'], idioma['trans93_']);
        }
    }
}

async function validar_trans_contra_fun(e) {
    let data_billetera = e.data.billetera_moneda_subasta;
    let data_subasta = e.data.data_subasta;
    let valotr_pass_in = $('.pass_transacciones_in').val();
    let validacion_trans_pass;
    if (validarText(valotr_pass_in)) {
        validacion_trans_pass = await secret_pin_validar(valotr_pass_in);
        if (validacion_trans_pass) {
            $(".spiner_confirmar_clave").show()
            $(".confirmar_trans_con").attr("disabled", true)
            console.log("------------> validacion_trans_pass: ", validacion_trans_pass);

            $('#modal-seleccionar-billetera').modal('hide');

            enviar_data_bille_blo(data_billetera, data_subasta);
        }
    } else {
        alertInfor(idioma['trans_109'], idioma['trans98_']);
    }
}


function enviar_data_bille_blo(data_billetera, data_subasta) {

    schemaSubasta = data_subasta;

    const dataEnviar = {
        "data": {
            "id": data_subasta.id_subasta,
            "uid": user.uid,
            "empresa": user.empresa,
            "direcciones": [
                { "address": data_billetera.address }
            ]
        }
    };

    console.log(dataEnviar, "data enviar de billetera")

    $.ajax({
        type: "POST",
        url: `${baseurl}/controllers/mis_subastas/?bloquear_direcciones`,
        data: dataEnviar,
        dataType: "json",
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        $(".spiner_confirmar_clave").hide()
        $(".confirmar_trans_con").attr("disabled", false)
        if (res.status == 'success') {
            $('#modal-confirmacion').modal('hide');
            $('#modal-buen-trabajo').modal('show');
            buen_trabajo_blo(data_billetera, data_subasta, res);

        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                alertInfor(idioma['trans_109'], idioma['trans94_']);
                return;
            }
        }
    }).fail((err) => {
        $(".confirmar_trans_con").attr("disabled", false)
        $(".spiner_confirmar_clave").hide()
        alertInfor(idioma['trans_109'], idioma['trans94_']);
        return;

    });
}

function buen_trabajo_blo(data_billetera, data_subasta, res) {

    console.log("\n\n\n\n\n");
    console.log("---+> [ data_billetera ]: ", data_billetera);
    console.log("---+> [ data_subasta ]: ", data_subasta);
    console.log("---+> [ res ]: ", res);
    let cantidad_billeteras_blo = 1;
    // let  __wallet_usuario.monto_mask  = res.comision; // valor 
    console.log("--------------------> data_subasta: ", data_subasta);
    let moneda_bille_blo = getCoinLabel(data_subasta.moneda).toLowerCase();

    let mensaje_buen = idioma.trans100_.split('$c').join(cantidad_billeteras_blo).split("$t").join(__wallet_usuario.monto_mask).split("$m").join(moneda_bille_blo);

    $('#modal-buen-trabajo').modal('show');

    $('.mensaje_de_buen').text(mensaje_buen);
}


function invitar_subasta(e) {
    $('.alert_copy').hide('flash');
    let subasta_compartir = e.data

    $('.enviar_link_subasta').off('click');
    $('.enviar_link_subasta').on('click', { subasta_compartir }, copiarlink_subasta_compartir);

    $('.enviar_link_subasta_wpp').off('click');
    $('.enviar_link_subasta_wpp').on('click', { subasta_compartir }, compartir_wpp);

    $('.enviar_link_subasta_fb').off('click');
    $('.enviar_link_subasta_fb').on('click', { subasta_compartir }, compartir_facebook_subasta);
}

function copiarlink_subasta_compartir(e) {
    let datasubasta_copiar = e.data.subasta_compartir.subasta;
    let url = url_general + "nasbi-descuentos.php" + "?sub=" + datasubasta_copiar.id_subasta + "&lang=" + miuser_lang + "&iso_code=" + paisOrigen.iso_code_2 + "&country=" + paisOrigen.country_id + "&uid_user=" + miuser_uid + "&empresa_user=" + miuser_empresa;
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(url);
        Toast('success', idioma.trans_207);
        return;
    }
    navigator.clipboard.writeText(url).then(function () {
        Toast('success', idioma.trans_207);
        /* $('.alert_copy').show('flash');
        setTimeout(() => {
            $('.alert_copy').hide('flash');
        }, 900); */
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
        NativeFunction.copyToClipboard(url);
        Toast('success', idioma.trans_207);
    });
}

async function compartir_wpp(e) {
    let datasubasta_copiar = e.data.subasta_compartir.subasta;
    let url_subasta_texto = url_general + "nasbi-descuentos.php" + "?sub=" + datasubasta_copiar.id_subasta + "&lang=" + miuser_lang + "&iso_code=" + paisOrigen.iso_code_2 + "&country=" + paisOrigen.country_id + "&uid_user=" + miuser_uid + "&empresa_user=" + miuser_empresa;
    url_subasta_texto = await convertParams_facebook(url_subasta_texto);
    let texto = url_subasta_texto;
    let url = "https://api.whatsapp.com/send?text=" + texto.split(" ").join("%20");
    return window.open(url, '_blank');
}

async function compartir_facebook_subasta(e) {
    let datasubasta_copiar = e.data.subasta_compartir.subasta;
    let texto = " " + idioma.trans85_;
    let url_subasta_texto = url_general + "nasbi-descuentos.php" + "?sub=" + datasubasta_copiar.id_subasta + "&lang=" + miuser_lang + "&iso_code=" + paisOrigen.iso_code_2 + "&country=" + paisOrigen.country_id + "&uid_user=" + miuser_uid + "&empresa_user=" + miuser_empresa;
    url_subasta_texto = await convertParams_facebook(url_subasta_texto);
    let url_fab = "http://www.facebook.com/sharer.php?u=" + url_subasta_texto;
    return window.open(url_fab, '_blank');
}

function eventGeneratePaginations(pagView = 1) {
    let opcion_del_filtro_mis_subasta = $('.select_filtro_subasta')[1].value;
    if (opcion_del_filtro_mis_subasta == 0) {
        opcion_del_filtro_mis_subasta = "";
    }
    switch (tipo_listado_subasta) {
        case 0:
            getsubastas(pagView, opcion_del_filtro_mis_subasta);
            break;

        case 1:
            getsubastas(pagView, opcion_del_filtro_mis_subasta);
            break;

        default:
            break;
    }
}

function validar_salir_flujo_su() { //Puede configurarse para que el title y el texto sean por parametros

    $('#modal-confirmar-salir').modal('show');
    $('.pregunta_de_salir').text(idioma.trans101_);
    $('.mensaje_de_salir').text(idioma.trans102_);

    return new Promise((resolve) => {
        $('.no_salir').off('click');
        $('.no_salir').on('click', function () {
            $('#modal-confirmar-salir').modal('hide');
            resolve(true);
        });

        $('.si_salir').off('click');
        $('.si_salir').click('click', function () {
            $('#modal-confirmar-salir').modal('hide');
            resolve(false);
        });
        // Swal.fire({
        //     title: idioma.trans101_,
        //     text: idioma.trans102_,
        //     icon: 'question',
        //     showCancelButton: true,
        //     confirmButtonColor: '#d33',
        //     cancelButtonColor: '#3085d6',
        //     confirmButtonText: idioma.trans25_,
        //     cancelButtonText: idioma.trans24_,
        // }).then((result) => {
        //     reject(result.isConfirmed);
        // });
    });
}

function abrirModalPuja(subasta) {

    $('#modal-buen-trabajo').modal('hide');

    $('.__cantidadPuja').val('');
    $('.__cantidadPujaUSD').val('');

    $('.__imgproductopuja').prop('src', subasta.foto_portada);
    $('.__productoproductopuja').html(subasta.producto);
    $('.__precionasbicoinproducto').html(`${subasta.precio_descuento_local_mask} ${getCoinLabel(subasta.moneda)}`);
    $(".modal__puja__sugerido").prop("checked", false);

    const dataEnviar = {
        "data": {
            "uid": user.uid,
            "id": subasta.id_subasta
        }
    };

    $('.__listadoapostadores').empty();
    $('.__gandosubasta').empty();
    $('.__mesubastando').empty();
    $('.__verpujandome').hide();

    $.ajax({
        type: "POST",
        url: `${baseurl}/controllers/mis_subastas/?ver_puja`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {

        console.log("\n");
        console.log(" [ subasta ]: ", subasta);
        console.log(" [ res ]: ", res);
        console.log("\n");

        if (res.status == 'success' || res.status == 'porPostor') {
            $('#modal-pujar').modal('show');
            $('.col__errors__content').hide();

            $('.__saldodispopujar').html(`${res.dinero_puja.precio_mask} ${getCoinLabel(res.dinero_puja.moneda)}`);
            $('.__saldodispopujarusd').html(`${res.dinero_puja.precio_usd_mask} USD`);

            $('.__listadoapostadores').html(`
                <div class="row row-lider row_sugerido_init">
                    <div class="col-6 px-2">
                        <div class="divelipsi">
                            <img src="../imagen/nameUserpuja.png"><p class="left">${idioma.trans142}</p>
                        </div>
                    </div>
                    <div class="col-6 px-2">
                        <p class="right">${res.sugerido_mask} ${getCoinLabel(subasta.moneda)}</p>
                    </div>
                </div>
            `);

            $('.modal_puja_total__pujas').text(0);


            if (res.status == 'success') {
                ordenPendiente = res.puja_actual.fecha_final * 1;
                $('.__verpujandome').show('slow');
                $('.__mesubastando').html(`${user.username} 0 ${getCoinLabel(subasta.moneda)}`); //Yo

                if (res.data) {
                    if (res.data.length > 0) {
                        $('.modal_puja_total__pujas').text(res.data.length);
                        $('.__listadoapostadores').html("");

                        let liderData = res.data[0];
                        let resultFilter = res.data.filter((item) => { return liderData.uid == item.uid });
                        liderData.isLider = (liderData.uid * 1 == user.uid * 1);

                        $('.__gandosubasta').html(`${liderData.username} ${liderData.monto_mask} ${getCoinLabel(subasta.moneda)} <p>${(liderData.uid * 1 == user.uid * 1) ? idioma['trans_209'] : idioma['trans_208']}</p> <span>+ ${resultFilter.length}</span>`); //Quien va de primero
                        if (liderData.isLider) {
                            // $('.row_lidersubasta').hide();
                        }

                        let myUltimaPujaData = {};

                        for (let index in res.data) {
                            let item = res.data[index];

                            let labelColorClass = "row-others";
                            if (item.uid * 1 == user.uid * 1 && index == 0) {
                                labelColorClass = "row-lider";

                                myUltimaPujaData = item;
                                myUltimaPujaData
                                $('.__mesubastando').html(`${user.username} ${myUltimaPujaData.monto_mask} ${getCoinLabel(subasta.moneda)} ${liderData.isLider ? '<span><i class="fas fa-angle-double-up"></i></span>' : '<span><i class="fas fa-angle-double-down"></i></span>'}`); //Yo

                            } else {
                                if (index == 0) {
                                    labelColorClass = "row-lider";
                                } else if (item.uid * 1 == user.uid * 1) {
                                    labelColorClass = "row-secundP";
                                    if (Object.keys(myUltimaPujaData).length == 0) {
                                        myUltimaPujaData = item;
                                        $('.__mesubastando').html(`${user.username} ${myUltimaPujaData.monto_mask} ${getCoinLabel(subasta.moneda)}${liderData.isLider ? '<span><i class="fas fa-angle-double-up"></i></span>' : '<span><i class="fas fa-angle-double-down"></i></span>'}`); //Yo
                                    }
                                } else { }
                            }

                            $('.__listadoapostadores').append(`
                                <div id="${item.uid}" class="row ${labelColorClass} mb-3">
                                    <div class="col-6 px-2">
                                        <div class="divelipsi">
                                            <img id="${index == 0 ? 'row_img_lider' : 'row_img_others'}" src="../imagen/${index == 0 ? 'nameUserpuja.png' : 'secund.png'}"><p class="left"> ${item.username} </p>
                                        </div>
                                    </div>
                                    <div class="col-6 px-2">
                                        <p class="right">${ item.monto_mask} ${getCoinLabel(subasta.moneda)}</p>
                                    </div>
                                   
                                </div>
                            `);
                        }
                    }
                }
            }

            console.log("\n\n\t\t\t\t\t\tCreando evento click de subasta: ", subasta);

            schemaContentSubasta = res;
            schemaSubasta = subasta;

            $(".modal__puja__sugerido").prop("checked", true);
            $('.__cantidadPuja').val(schemaContentSubasta.sugerido_mask);
            $('.__cantidadPujaUSD').val(schemaContentSubasta.sugerido_usd_mask);

            $('.__pujar').off('click');
            $('.__pujar').on('click', { subasta }, insertar);

        } else if (res.status == 'pujaFinalizada') {
            let msg = idioma['trans_111'];
            msg = msg.split("##").join(subasta.id_subasta);
            alertInforFinalizada(idioma['trans_109'], "", msg);
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {

            }
        }
    }).fail((err) => {
        console.log("err: ", err);
    });
}

function alertInfor(title = "NASBI.COM", body = "", bodyHTML = "") {
    $('.modal__advertencias__title').text(title);
    $('.modal__advertencias__description').html('');
    if (bodyHTML.length == 0) {
        $('.modal__advertencias__description').text(body);
    } else {
        $('.modal__advertencias__description').html(bodyHTML);
    }
    $('#modal-advertencias').modal('show');
}
function alertInforFinalizada(title = "NASBI.COM", body = "", bodyHTML = "") {
    $('.modal__advertencias__title').text(title);
    $('.modal__advertencias__description').html('');
    if (bodyHTML.length == 0) {
        $('.modal__advertencias__description').text(body);
    } else {
        $('.modal__advertencias__description').html(bodyHTML);
    }
    $('#modal-advertencias-finalizada').modal('show');
}


/* Inicio Modal puja - Developer JDBC */
function sugerido(check_sugerido, schemaSubasta) {
    if (!check_sugerido) {
        if (schemaContentSubasta.data) {
            if (schemaContentSubasta.data) {
                let __cantidadPujaUSD = schemaContentSubasta.data[0].monto * schemaContentSubasta.precio_moneda * 1;
                $('.__cantidadPuja').val(schemaContentSubasta.data[0].monto);
                $('.__cantidadPujaUSD').val(__cantidadPujaUSD.toFixed(2) * 1);
            }
        }
    } else {
        $('.__cantidadPuja').val(schemaContentSubasta.sugerido_mask);
        $('.__cantidadPujaUSD').val(schemaContentSubasta.sugerido_usd_mask);
    }
}
function insertar($event) {
    schemaSubasta = $event.data.subasta;

    console.log("\n\n X ===> [insertar/schemaSubasta]: ", schemaSubasta);


    let dataEnvio = {
        "username": user.username,
        "uid": user.uid,
        "id": schemaSubasta.id_subasta,
        "monto": 0
    };

    let check_sugerido = $(".modal__puja__sugerido").prop("checked");
    if (check_sugerido) {
        /*$('.__cantidadPuja').prop('disabled', true);*/
        $('.__cantidadPuja').val(schemaContentSubasta.sugerido);
        $('.__cantidadPujaUSD').val(schemaContentSubasta.sugerido_usd);

        dataEnvio.monto = schemaContentSubasta.sugerido;
    } else {
        dataEnvio.monto = devolverNumero($('.__cantidadPuja').val()) * 1;
    }
    $('.__pujar__spinner').show();
    $(".__pujar").attr("disabled", true);
    $('.__cantidadPuja').prop('disabled', true);

    if (!validarMountoPujar()) {
        $('.__pujar__spinner').hide();
        $(".__pujar").attr("disabled", false);
        $('.__cantidadPuja').prop('disabled', false);

        console.log("---- QUE MAL ALGO PASA CON EL MONTO ----");

        return;
    }

    /*$(".modal__puja__sugerido").prop("checked", false);*/



    $.ajax({
        type: "POST",
        url: `${baseurl}/controllers/mis_subastas/?pujar`,
        data: {
            "data": dataEnvio
        },
        dataType: "html",
        // "headers": { 'x-api-key': user.token },
        success: function (result) {
            $('.__pujar__spinner').hide();
            $(".__pujar").attr("disabled", false);
            $('.__cantidadPuja').prop('disabled', false);



            let check_sugerido = $(".modal__puja__sugerido").prop("checked");
            console.log("-----[pujar.php]: ", result);
            send(result);
            addMyBid(result);
            let resultObject = JSON.parse(result);

            console.log("0) @@@ [ X ] -----result: ", resultObject);
            console.log("0) @@@ [ X ] -----result.sugerido: ", resultObject['sugerido']);
            if (resultObject.sugerido) {
                console.log("1) @@@@-----result.sugerido: ", resultObject.sugerido);

                // Aqui debe validarse si el sugerido esta check entonces debe colocarse el nuevo valor sugerido
                if (check_sugerido) {
                    console.log("2) @@@ [ X ] -----modal__puja__sugerido: ", check_sugerido);

                    console.log("2) @@@ [ X ] -----resultObject.sugerido: ", resultObject.sugerido);
                    console.log("2) @@@ [ X ] -----resultObject.sugerido_usd: ", resultObject.sugerido_usd);

                    $('.__cantidadPuja').val(resultObject.sugerido_mask);
                    $('.__cantidadPujaUSD').val(resultObject.sugerido_usd_mask);

                    schemaContentSubasta.sugerido = resultObject.sugerido;
                    schemaContentSubasta.sugerido_usd = resultObject.sugerido_usd;
                } else {
                    // Sino entonces colocar el ultimo valor PUJADO en el tipe
                    console.log("3) @@@ [ X ] -----modal__puja__sugerido: ", check_sugerido);
                    $('.__cantidadPuja').val('');
                    $('.__cantidadPujaUSD').val('');
                }

            } else {

                console.log("4) @@@ [ X ] -----modal__puja__sugerido: ", check_sugerido);
            }



        }, error: error => {
            $('.__pujar__spinner').hide();
            $(".__pujar").attr("disabled", false);
            $('.__cantidadPuja').prop('disabled', false);
            console.log(".......... algo anda mal: ", error);
        }
    });
}
function validarMountoPujar() {
    let amount = devolverNumero($('.__cantidadPuja').val()) * 1;
    if (amount > 0) {
        return true;
    } else {
        return false;
    }
}

function convertParams_facebook(text) {
    return new Promise((resolve) => {
        let textParams = text.split("?")
        if (textParams[1]) {
            textParams = textParams[1].split("=").join("%3D").split("&").join("%26");
            resolve(text.split("?")[0] + "?" + textParams);
        }
        else {
            resolve(textParams[0]);
        }
    });

}

function getDireccionesSubasta() {
    console.log('user', user);
    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa
        }
    }
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/direcciones/?direcciones_usuario`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        console.log('res', res);
        $('.__vermisdirecciones').off('click');
        $('.__btncreardireccion').off('click');
        $('.__btncreardireccion').on('click', crearDireccion);
        if (res.status == 'success' && res.cantidad > 0) {
            direccionesUsuario = res.data;
            direccionesUsuario.map((data) => {
                let paisesJSON_ven = JSON.parse(localStorage.getItem('paises'));
                data.pais = paisesJSON_ven.filter(datos => datos.country_id == data.pais)[0];
                data.departamento = data.pais.departamento.filter(datos => datos.zone_id == data.departamento)[0];
                delete (data.pais.departamento);
                return data;
            });

            $('.abrir_direcciones_subastas').on('click', abrirDirecciones);
            llenarDirecciones();
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                $('.abrir_direcciones_subastas').on('click', crearDireccion);
            }

        }

    }).fail((err) => {
        presentAlertObject({ icon: 'error', text: idioma.trans78 });
    });
}
function abrirDirecciones() {
    if (direccionesUsuario.length <= 0) return 0;
    $('#modal-direcciones').modal('show');
    $('#modal-preguntar-direccion').modal("hide")
    llenarDirecciones();
}

function llenarDirecciones() {
    if (direccionesUsuario.length <= 0) return 0;
    $('.__btncreardireccion').show();
    if (direccionesUsuario.length >= 3) $('.__btncreardireccion').hide();
    $('.__alldirecciones').empty();
    let activa, butonActivar = false;
    let buton_eliminar = `<button href="#" class="card-link btnact btneliminar eliminar_dir">${idioma.trans44}</button>`
    let buton_editar = `<button href="#" class="card-link btnact editar_dir">${idioma.trans61}</button>`

    for (const x in direccionesUsuario) {
        activa = direccionesUsuario[x].activa == 1 ? `<span class="text-primary">${idioma.trans21}</span>` : `<span class="text-secondary inct">${idioma.trans22}</span>`;
        butonActivar = direccionesUsuario[x].activa == 1 ? `<a href="#" class="card-link __diruser"></a>` : `<button href="#" class="card-link btnact __diruser">${idioma.trans31}</button>`;
        $('.__alldirecciones').append(`
            <div class="card-body card-direct col-lg-4">
                <h4 class="card-title">${idioma.trans18}</h4>
                <p class="card-text text-modal-direcciones">${idioma.trans15}: <span>${direccionesUsuario[x].pais.pais_name}</span></p>
                <p class="card-text text-modal-direcciones">${idioma.trans16}: <span>${direccionesUsuario[x].departamento.name}</span></p>
                <p class="card-text text-modal-direcciones">${idioma.trans17}: <span>${direccionesUsuario[x].ciudad}</span></p>
                <p class="card-text text-modal-direcciones">${idioma.trans18}: <span>${direccionesUsuario[x].direccion}</span></p>
                <p class="card-text text-modal-direcciones">${idioma.trans19}: <span>${direccionesUsuario[x].codigo_postal}</span></p>
                <p class="card-text text-modal-direcciones">${idioma.trans20}: <span>${activa}</span></p>
                <div class="content-btns">
                ${butonActivar} ${buton_editar} ${buton_eliminar}
                </div>
            </div>
        `);
        $('.__diruser').eq(x).off('click');
        $('.__diruser').eq(x).on('click', { direccion: direccionesUsuario[x] }, activardireccion);
        $('.editar_dir').eq(x).off('click');
        $('.editar_dir').eq(x).on('click', { direccion: direccionesUsuario[x] }, editardireccion);
        $('.eliminar_dir').eq(x).off('click');
        $('.eliminar_dir').eq(x).on('click', { direccion: direccionesUsuario[x] }, eliminarDireccion);

    }

}

function crearDireccion() {
    $('#modal-preguntar-direccion').modal("hide")
    if (direccionesUsuario.length >= 3) return 0;
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    $('.__paisnewdireccion').val(paisusuario.pais_name).prop('disabled', true);
    cityInput(paisusuario, '__ciudadnewdireccion');
    $('.__divdepnewdireccion').html(`
        <select class="form-control row-select-dir-compra  __depnewdireccion select-plataforma"></select>
        <p>${idioma.trans16}</p>
    `);
    $('.__depnewdireccion').empty();
    let htmloptionsdep = `<option value="0">${idioma.trans208_}</option>`;
    for (const dep of paisusuario.departamento) { if (dep.zone_id != "") { htmloptionsdep += `<option value="${dep.zone_id}">${dep.name}</option>`; } }
    $('.__depnewdireccion').html(htmloptionsdep);
    $('.__depnewdireccion').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false
    });
    $('.__depnewdireccion').off('changed.bs.select');
    $('.__depnewdireccion').on('changed.bs.select', e => {
        $('.__ciudadnewdireccion').val('');
        $('.__dirnewdireccion').val('');
        $('.__codigopostalnewdireccion').val('');
    });
    $('.__dirnewdireccion').off('change');
    $('.__dirnewdireccion').on('change', buscarPostalMisCodeEnvio);
    $('#modal-direcciones').modal('hide');
    $('#modal-direcciones-crear').modal('show');
    $('.__save_detalles_envio').off('click');
    $('.__save_detalles_envio').on('click', guardarDireccion);

}

function buscarPostalMisCodeEnvio() {
    var pais = $('.__paisnewdireccion').val();
    var estado = $('.__depnewdireccion option:selected').text();
    var ciudad = $('.__ciudadnewdireccion').val();
    var direccion = $('.__dirnewdireccion').val();
    if (validarText(pais) == true && validarText(estado) == true && validarText(ciudad) == true && validarText(direccion) == true) {
        direccion = direccion.replace("#", "%23");
        var address = pais + ',' + estado + ',' + ciudad + ',' + direccion;
        $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCMeqStSqC4lq01HX9yfjqAD8eNHHlWWac', function (data) {
            if (data) {
                var postal_code = '';
                if (data.results) {
                    for (var i = 0; i < data.results[0].address_components.length; i++) {
                        if (data.results[0].address_components[i].types[0] === 'postal_code') {
                            postal_code = data.results[0].address_components[i].long_name;
                        }
                    }
                }
                $('.__codigopostalnewdireccion').val(postal_code);
            }
        });
    }
}

var autocomplete;
function cityInput(pais, classcity, tipo = 'dir') {
    let input = document.getElementsByClassName(classcity)[0];

    let options = {
        types: ['(cities)'],
        componentRestrictions: { country: pais._id }
    };

    console.log('pais', input, options);

    autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    console.log('autocomplete', autocomplete);
    consultagoogleActualInput(classcity);
}

function consultagoogleActualInput(classcity) {
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
        setTimeout(function () {
            var container = document.getElementsByClassName('pac-container-actual')[0];
            container.addEventListener('touchend', function (e) {
                e.stopImmediatePropagation();
            });
        }, 500);
    }

    autocomplete.addListener('place_changed', () => {
        var places = autocomplete.getPlace();
        if (places) {
            setTimeout(() => {
                $('.' + classcity).val(places.name);
            }, 300)
        }
    }, (err) => {
        let error = err;
    });
}

async function guardarDireccion() {
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    let departamento = $('.__depnewdireccion')[1].value;
    let ciudad = $('.__ciudadnewdireccion').val();
    let direccion = $('.__dirnewdireccion').val();
    let codigopostal = $('.__codigopostalnewdireccion').val();
    let activa = $('.__activanewdireccion').is(':checked') == true ? 1 : 0;
    let latitud;
    let longitud;

    if (!validarText(paisusuario)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo pais' });
    if (!validarNumero(departamento)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo departamento' });
    if (!validarText(ciudad)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo ciudad' });
    if (!validarText(autocomplete)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo ciudad' });
    if (!validarText(direccion)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo dirección' });
    if (!validarText(codigopostal)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo código postal' });

    departamento = paisusuario.departamento.filter(datos => datos.zone_id == departamento)[0];
    console.log(paisusuario.departamento);
    console.log(departamento);

    if (!autocomplete.getPlace()) {
        let __pais = $('.__paisnewdireccion').val();
        let __estado = $('.__depnewdireccion option:selected').text();
        let __ciudad = $('.__ciudadnewdireccion').val();
        let latitud_longitud = await obtener_latitud_longitud(__pais, __estado, __ciudad);
        if (!validarText(latitud_longitud)) return presentAlertObject({ icon: 'error', text: idioma.trans457_ });
        latitud = latitud_longitud.lat;
        longitud = latitud_longitud.lng;
    } else {
        console.log("mmmmmmmmm poraqui");
        latitud = autocomplete.getPlace().geometry.location.lat();
        longitud = autocomplete.getPlace().geometry.location.lng();

    }

    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            pais_isocode2: paisusuario.iso_code_2,
            iso_code_2_money: iso_code_2_money,
            pais: paisusuario.country_id,
            departamento: departamento.zone_id,
            departamento_isocode2: departamento.code.split('-')[1],
            ciudad,
            latitud: latitud,
            longitud: longitud,
            codigo_postal: codigopostal,
            direccion,
            activa
        }
    }
    console.log('dataEnviar', dataEnviar);
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/direcciones/?crear`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        $('#modal-direcciones-crear').modal('hide');
        getDireccionesSubasta();
        if (res.status == 'success') {
            $('#modal-direcciones').modal('show');
            presentAlertObject({ icon: 'success', text: idioma.trans53_ });
        } else if (res.status == 'maxDirecciones') {
            presentAlertObject({ icon: 'warning', text: idioma.trans54_ });
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                presentAlertObject({ icon: 'error', text: idioma.trans132_ });
            }
        }
    }).fail((err) => {
        $('#modal-direcciones-crear').modal('hide');
        presentAlertObject({ icon: 'error', text: idioma.trans_04 });
    });
}

function activardireccion(dir) {
    let datadireccion = dir.data.direccion;


    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            id: datadireccion.id
        }
    }
    let data_url = baseurl + "/controllers/direcciones/?activar";
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        if (res.status == 'success') {
            getDireccionesSubasta();
            return presentAlertObject({ icon: 'info', text: idioma.trans52_ });

        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                return presentAlertObject({ icon: 'error', text: idioma.trans51_ });
            }
        }

    }).fail((err) => {
        return presentAlertObject({ icon: 'error', text: idioma.trans51_ });

    });


}
function editardireccion(ev) {
    let midireccion = ev.data.direccion;
    console.log(midireccion)
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    let activa;
    if (midireccion.activa == 1) {
        activa = true
    } else {
        activa = false
    }
    $('.__ciudadnewdireccion').val("");
    $('.__dirnewdireccion').val("");
    $('.__codigopostalnewdireccion').val("");

    $('.__paisnewdireccion').val(midireccion.pais.pais_name).prop('disabled', true);
    cityInput(midireccion.pais, '__ciudadnewdireccion');
    $('.__divdepnewdireccion').html(`
    <select class="form-control row-select-dir-compra  __depnewdireccion select-plataforma"></select>
    <p>${idioma.trans16}</p>`);
    $('.__depnewdireccion').empty();
    let htmloptionsdep = `<option value="0">${idioma.trans208_}</option>`;
    for (const dep of paisusuario.departamento) { if (dep.zone_id != "") { htmloptionsdep += `<option value="${dep.zone_id}">${dep.name}</option>`; } }
    $('.__depnewdireccion').html(htmloptionsdep);
    $('.__depnewdireccion').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false
    });
    $('.__depnewdireccion').val(midireccion.departamento.zone_id).selectpicker("refresh");
    $('.__dirnewdireccion').val(midireccion.direccion);
    $('.__codigopostalnewdireccion').val(midireccion.codigo_postal);
    $('.__activanewdireccion').prop("checked", activa);
    $('.__activanewdireccion').attr("disabled", activa);
    $('.__depnewdireccion').off('changed.bs.select');
    $('.__depnewdireccion').on('changed.bs.select', e => {
        $('.__ciudadnewdireccion').val('');
        $('.__dirnewdireccion').val('');
        $('.__codigopostalnewdireccion').val('');
    });
    $('.__dirnewdireccion').off('change');
    $('.__dirnewdireccion').on('change', buscarPostalMisCodeEnvio);
    $('#modal-direcciones').modal('hide');
    $('#modal-direcciones-crear').modal('show');
    $('.__save_detalles_envio').off('click');
    $('.__save_detalles_envio').on('click', { id: midireccion.id }, editarDireccion);


}
async function editarDireccion(ev) {
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    let departamento = $('.__depnewdireccion')[1].value;
    let ciudad = $('.__ciudadnewdireccion').val();
    let direccion = $('.__dirnewdireccion').val();
    let codigopostal = $('.__codigopostalnewdireccion').val();
    let activa = $('.__activanewdireccion').is(':checked') == true ? 1 : 0;
    let latitud;
    let longitud;

    if (!validarText(paisusuario)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo pais' });
    if (!validarNumero(departamento)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo departamento' });
    if (!validarText(ciudad)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo ciudad' });
    if (!validarText(autocomplete)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo ciudad' });
    if (!validarText(direccion)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo dirección' });
    if (!validarText(codigopostal)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo código postal' });

    departamento = paisusuario.departamento.filter(datos => datos.zone_id == departamento)[0];
    console.log(paisusuario.departamento);
    console.log(departamento);

    if (!autocomplete.getPlace()) {
        let __pais = $('.__paisnewdireccion').val();
        let __estado = $('.__depnewdireccion option:selected').text();
        let __ciudad = $('.__ciudadnewdireccion').val();
        let latitud_longitud = await obtener_latitud_longitud(__pais, __estado, __ciudad);
        if (!validarText(latitud_longitud)) return presentAlertObject({ icon: 'error', text: idioma.trans457_ });
        latitud = latitud_longitud.lat;
        longitud = latitud_longitud.lng;
    } else {
        console.log("editar");
        latitud = autocomplete.getPlace().geometry.location.lat();
        longitud = autocomplete.getPlace().geometry.location.lng();

    }

    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            pais_isocode2: paisusuario.iso_code_2,
            iso_code_2_money: iso_code_2_money,
            pais: paisusuario.country_id,
            departamento: departamento.zone_id,
            departamento_isocode2: departamento.code.split('-')[1],
            ciudad,
            latitud: latitud,
            longitud: longitud,
            codigo_postal: codigopostal,
            direccion,
            activa,
            id: ev.data.id
        }
    }
    console.log('dataEnviar', dataEnviar);
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/direcciones/?actualizar`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        $('#modal-direcciones-crear').modal('hide');
        getDireccionesSubasta();
        if (res.status == 'success') {
            $('#modal-direcciones').modal('show');
            presentAlertObject({ icon: 'success', text: idioma.trans53_ });
        } else if (res.status == 'maxDirecciones') {
            presentAlertObject({ icon: 'warning', text: idioma.trans54_ });
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                presentAlertObject({ icon: 'error', text: idioma.trans132_ });
            }
        }
    }).fail((err) => {
        $('#modal-direcciones-crear').modal('hide');
        presentAlertObject({ icon: 'error', text: idioma.trans_04 });
    });

}
async function eliminarDireccion(ev) {
    console.log(ev)
    let confirmar = await presentAlertModalConfirm({ text: idioma['_trans498'], icon: "info" });
    if (confirmar) {
        let dataEnviar = {
            data: {
                uid: user.uid,
                empresa: user.empresa,
                id: ev.data.direccion.id,
                activa: ev.data.direccion.activa

            }
        }

        let data_url = baseurl + "/controllers/direcciones/?eliminar";
        $.ajax({
            type: 'POST',
            url: data_url,
            data: dataEnviar,
            dataType: 'json',
            "headers": { 'x-api-key': user.token },
        }).done(async (res) => {
            if (res.status == 'success') {

                getDireccionesSubasta();

            } else {
                let validate_token = await erroresTokenEmpresa(res);
                if (!validate_token) {
                    return presentAlertObject({ icon: 'error', text: idioma.trans48_ });
                }

            }

        }).fail((err) => {
            return presentAlertObject({ icon: 'error', text: idioma.trans48_ });
        });


    }

}