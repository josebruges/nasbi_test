let data_primera_edit;
let paramsURL_publi_edit;
let temp_cat_sub = {
    id_categoria: 0,
    id_sub: 0

}
let montoMinimoPublicarMonedaLocal;
let maximoPorcentajeAceptable;
let symbolMonedaLocal;
let montoMinimoPublicarMonedaLocalMask;
let condicionProducto = [];
let envioProducto = [];
let datos_img;
let fotos_edit = [];
let accedio_base64 = false;  //sirve para saber si se edito el array de imagenes ya sea agregar o quitar
let unidadDistancia;
let unidadPeso;
let cambio_envio_edit_publi = false;
let cambio_price_edit = false;
let hizo_cambio = false;
let exposicionProducto_edit = [];
let tiposProdutos_edit = [];
let base64_img_video = false;
let tiene_colores_tallas = false;
let categoriasProductos = [];

function validarlogueado_edit() {
    if (validarText(user)) {
        return true;
    } else {
        loadPage("index.php?s=0")
    }

}
function agregar_loading_ge_publi(clase) {
    let span_loading_ge = `<span class="spiner_modificar_publi">&nbsp;</span><span class="spinner-border spinner-border-sm spiner_modificar_publi" role="status" aria-hidden="true"></span>`
    $(clase).append(span_loading_ge);
}

function quitar_loading_ge_publi(clase) {
    $(clase).children(".spiner_modificar_publi").remove();
}

function cargarprimero_edit() {
    agregar_loading_ge_publi(".loading_modificar_publi");
    if (validarlogueado_edit()) {
        params_edit_publi = new URLSearchParams(location.search);
        paramsURL_publi_edit = params_edit_publi.get('pro');

        if (paramsURL_publi_edit) {
            getpublica_edit(paramsURL_publi_edit);
        }
    }

    //getTallaColorProducto();
    getColors(1);
}

//comentario

$(document).ready(($event) => {
    cargarprimero_edit();
    cargarDatosValidacion();
    llenararrays_para_campos();
    $('.opciones_condicion_edit').hide();
    $('.editar_titu_edit').click(($event) => {
        editar_titulo_publi();
    });

    // $('.edit_cantidad_pro').click(($event) => {
    //     editar_cantidad_publi();
    // });
    $('#opciones-editar').on('click', '.edit_cantidad_pro', function ($event) {
        if (!tiene_colores_tallas) {
            editar_cantidad_publi();
        } else {
            presentAlertObject({ icon: 'error', text: idioma.trans295 });
        }
    });

    $('.marca_edit_bu').click(($event) => {
        editar_marca_publi();
    });

    $('.edit_precio_bu').click(($event) => {
        editar_precio_publi();
    });

    $('.edit_modelo_pro').click(($event) => {
        editar_modelo_publi();
    });

    $('.button_categoria').click(($event) => {
        editar_cate_edit();
    });

    $('.no_cambiar_cate').click(($event) => {
        $('#modal-cambiar_camp_cate').modal('hide');
    });

    $('.edit_descrit_b').click(($event) => {
        descripcion_edit();
    });

    $('.no_cambiar_valor_dire').click(($event) => {
        $('#modal-cambiar_dire').modal('hide');
    });

    $('.datos_caracteristica_product_edit').change(($event) => {
        cambio_envio_edit_publi = true;
    });
    $('.modal-felciidades_edit').change(($event) => {
        cambio_price_edit = true;
    });
    $('.publicar_edit').click(($event) => {
        salir_para_publicaciones(hizo_cambio);
    });

    $.getJSON('../json/categorias_ES.json', function (data) {
        categoriasProductos = data;
    });
    $(".btn-create-color").click(function () {
        $(".div-create-color").removeClass('d-none');
        $(".btn-create-color").addClass('d-none');
    });
    $(".btn-cancel-create").click(function () {
        $(".color-picker").val('');
        $(".nombre_en_picker").val('');
        $(".nombre_es_picker").val('');
        $(".div-create-color").addClass('d-none');
        $(".btn-create-color").removeClass('d-none');
    });
    $(".btn-save-create").click(function () {
        saveNewColorPickerEdit();
    });

});

function salir_para_publicaciones(cambio) {
    if (cambio) {
        $('#modal-felciidades_edit').modal('show');

        // $('.no_cambiar_valor_descrip').off('click');
        // $('.no_cambiar_valor_descrip').on('click',null,function() {
        //     $('#modal-cambiar_camp_tarea').modal('hide'); 
        // });

        $('.confirmar_felicidades_edit').off('click');
        $('.confirmar_felicidades_edit').on('click', null, async function () {
            $('#modal-felciidades_edit').modal('hide');
            loadPage("mis-cuentas.php")
        });


    } else {
        loadPage("mis-cuentas.php")
    }
}

function llenararrays_para_campos() {

    condicionProducto = [
        { id: 1, nombre: idioma.trans4, img: '../imagen/vender/productos.png' },
        { id: 2, nombre: idioma.trans5, img: '../imagen/vender/vehiculos.png' },
        { id: 3, nombre: idioma.trans6, img: '../imagen/vender/inmuebles.png' }
    ];

    envioProducto = [
        { id: 1, nombre: idioma._trans205, img: '../imagen/public-venta/envio-pais.png' },
        { id: 2, nombre: idioma._trans206, img: '../imagen/public-venta/envio-vendedor.png' },
        { id: 3, nombre: idioma._trans207, img: '../imagen/public-venta/acuerdo.png' }
    ];

    exposicionProducto_edit = [
        { id: 1, nombre: idioma.trans196_, img: '../imagen/public-venta/gratuita.png', descripcion: idioma.trans199_, link_text: idioma.trans200_, link: '' },
        { id: 2, nombre: idioma.trans197_, img: '../imagen/public-venta/promocionada.png', descripcion: idioma.trans201_, link_text: idioma.trans202_, link: '' },
        { id: 3, nombre: idioma.trans198_, img: '../imagen/public-venta/subasta.png', descripcion: idioma.trans203_, link_text: idioma.trans204_, link: '' }
    ];

    unidadDistancia = [
        { id: 'cm', nombre: idioma.trans9 },
        { id: 'in', nombre: idioma.trans10 }
    ];
    unidadPeso = [
        { id: 'kg', nombre: idioma.trans11 },
        { id: 'lb', nombre: idioma.trans12 }
    ];

    tiposProdutos_edit = [
        { id: 1, nombre: idioma.trans1, img: '../imagen/vender/productos.png' },
        { id: 2, nombre: idioma.trans2, img: '../imagen/vender/vehiculos.png' },
        { id: 3, nombre: idioma.trans3, img: '../imagen/vender/inmuebles.png' }
    ];


}


async function preparardata_wbs(valor, tipo, propio_modal = false, modal_tocerrar = "") {
    if (validarText(valor)) {
        let tipo_to_cambiar = tipo;
        let id_publi = paramsURL_publi_edit;
        let categoria_edit = categoriasJSON.filter(data => data_primera_edit.categoria == data.CategoryID)[0];
        let subcategoria_edit = categoria_edit.subCategoria.filter(data => data_primera_edit.subcategoria == data.CategoryID)[0];
        let dataEnviar;
        let categoria = { ...categoria_edit };
        let subcategoria = subcategoria_edit;
        let respuesta;
        delete categoria.subCategoria;
        switch (tipo_to_cambiar) {
            case 1:
                dataEnviar = {
                    data: {
                        id: id_publi,
                        uid: user.uid,
                        empresa: user.empresa,
                        tipo: 1,
                        titulo: valor,
                        categoria,
                        subcategoria

                    }
                }
                break;
            case 6:
                dataEnviar = {
                    data: {
                        id: id_publi,
                        uid: user.uid,
                        empresa: user.empresa,
                        tipo: 6,
                        marca: valor,
                        categoria,
                        subcategoria

                    }
                }
                break;
            case 9:
                dataEnviar = {
                    data: {
                        id: id_publi,
                        uid: user.uid,
                        empresa: user.empresa,
                        tipo: 9,
                        modelo: valor,
                        categoria,
                        subcategoria

                    }
                }
                break;
            case 11:
                dataEnviar = {
                    data: {
                        id: id_publi,
                        uid: user.uid,
                        empresa: user.empresa,
                        tipo: 11,
                        cantidad: valor,
                    }
                }
                break;
            case 12:
                dataEnviar = {
                    data: {
                        id: id_publi,
                        uid: user.uid,
                        empresa: user.empresa,
                        tipo: 12,
                        tipo_publicacion: valor,
                    }
                }
                break;
            case 13:
                dataEnviar = {
                    data: {
                        id: id_publi,
                        uid: user.uid,
                        empresa: user.empresa,
                        tipo: 13,
                        exposicion: valor,
                    }
                }
                break;
            case 14:

                dataEnviar = {
                    data: {
                        id: id_publi,
                        uid: user.uid,
                        empresa: user.empresa,
                        tipo: 14,
                        url_video: valor.url_video,
                        portada_video: valor.img
                    }
                }

                break;

            default:
                break;
        }


        respuesta = await enviar_data_wbs_edit(dataEnviar);
        if (respuesta) {
            if (propio_modal) {
                $(modal_tocerrar).modal('hide');
            } else {
                $('#modal-cambiar_camp_in').modal('hide');
            }
        } else {
            console.log("error");
        }
    }

}

function enviar_data_wbs_edit(dataEnviar) {
    agregar_loading_ge_publi(".loading_modificar_publi");
    $('.loading_modificar_publi').prop("disabled", true);

    return new Promise((resolve) => {
        let respuesta = false;
        let data_url = baseurl + "/controllers/publicacion/?editar_publicacion";
        console.log("dataEnviar: ", dataEnviar);
        $.ajax({
            type: 'POST',
            url: data_url,
            data: dataEnviar,
            dataType: 'json',
            "headers": { 'x-api-key': user.token },
        }).done(async (res) => {
            $('.loading_modificar_publi').prop("disabled", false);
            quitar_loading_ge_publi(".loading_modificar_publi");
            console.log(res);
            if (res.status == "success") {
                hizo_cambio = true;
                respuesta = true;
                cargarprimero_edit();
                llenararrays_para_campos();
                resolve(respuesta);
            } else if (res.status == "errorMontoMinimoPublicar") {
                console.log("HEREEE");
                presentAlertObject({ icon: 'error', text: `${idioma.trans186} ${montoMinimoPublicarMonedaLocalMask}` });
            } else if (res.status == "errorMontoMinimoConDescuentoPublicar") {
                presentAlertObject({ icon: 'error', text: `${idioma.trans187} ${maximoPorcentajeAceptable}%` });
            } else if (res.status == "errorPorcentajeMaximoPublicar") {
                presentAlertObject({ icon: 'error', text: idioma.trans188 });
            } else {
                let validate_token = await erroresTokenEmpresa(res);
                if (!validate_token) {
                    quitar_loading_ge_publi(".loading_modificar_publi");
                    presentAlertObject({ icon: 'error', text: idioma.trans_04 });
                    resolve(respuesta);
                }

            }

        }).fail((err) => {
            $('.loading_modificar_publi').prop("disabled", false);
            quitar_loading_ge_publi(".loading_modificar_publi");
            presentAlertObject({ icon: 'error', text: idioma.trans_04 });
            resolve(respuesta);
        });
    });
}


async function editar_titulo_publi() {
    let valor_to_cambiar = $('.titulo_edit_p')[0].innerText.toString();
    let nuevo_titulo = await cambiarvalor_modal_in(valor_to_cambiar, idioma.trans211_);
    if (nuevo_titulo) {

        preparardata_wbs(nuevo_titulo, 1);
    }
}

async function editar_cantidad_publi() {

    let valor_to_cambiar = $('.cantidad_edit_p')[0].innerText.toString();
    let nuevo_titulo = await cambiarvalor_modal_in(valor_to_cambiar, idioma._trans54, "1");
    nuevo_titulo = devolverNumero(nuevo_titulo);
    if (nuevo_titulo) {
        if (validarNumero(nuevo_titulo)) {
            preparardata_wbs(nuevo_titulo, 11);
        } else {
            presentAlertObject({ icon: "error", text: idioma.trans217_ });
            editar_cantidad_publi();
        }
    } else {
        $('#modal-cambiar_camp_in').modal('hide');

    }


}




async function editar_marca_publi() {
    let valor_to_cambiar = $('.marca_p_edit')[0].innerText;
    let nuevo_marca = await cambiarvalor_modal_in(valor_to_cambiar, idioma.trans28);
    if (nuevo_marca) {
        preparardata_wbs(nuevo_marca, 6);

    }
}

function descripcion_edit() {
    let valor_to_cambiar = $('.descrip_edit_p')[0].innerText;
    $('#modal-cambiar_camp_tarea').modal('show');
    $('.descrip_edit').val(valor_to_cambiar);
    $('.titulo_cambio_edit_text').text(idioma.trans0);


    $('.no_cambiar_valor_descrip').off('click');
    $('.no_cambiar_valor_descrip').on('click', null, function () {
        $('#modal-cambiar_camp_tarea').modal('hide');
    });

    $('.si_cambiar_valor_descrip').off('click');
    $('.si_cambiar_valor_descrip').on('click', null, async function () {
        let valor = $('.descrip_edit').val();
        if (validarText(valor)) {
            let id_publi = paramsURL_publi_edit;
            if (valor != valor_to_cambiar) {
                let respuesta;
                let dataEnviar = {
                    data: {
                        id: id_publi,
                        uid: user.uid,
                        empresa: user.empresa,
                        tipo: 3,
                        descripcion: valor
                    }
                }

                respuesta = await enviar_data_wbs_edit(dataEnviar);
                if (respuesta) {
                    $('#modal-cambiar_camp_tarea').modal('hide');
                    $('.descrip_edit').val("");
                    $('.titulo_cambio_edit_text').text("");
                }
            } else {
                $('#modal-cambiar_camp_tarea').modal('hide');
                $('.descrip_edit').val("");
                $('.titulo_cambio_edit_text').text("");
            }
        } else {
            presentAlertObject({ icon: "error", text: idioma._trans93 })
        }

    });





}


async function editar_modelo_publi() {
    let valor_to_cambiar = $('.modelo_edit_publi')[0].innerText;
    let nuevo_edit = await cambiarvalor_modal_in(valor_to_cambiar, idioma.trans29);
    if (nuevo_edit) {
        preparardata_wbs(nuevo_edit, 9);

    }

}

function editar_precio_publi() {
    // let valor_to_cambiar=  $('.precio_p')[0].innerText;
    let valor_to_cambiar = data_primera_edit.precio_local_mask;
    let activa_prom = data_primera_edit.oferta;
    let porcentaje = data_primera_edit.porcentaje_oferta;
    let porcentaje_tax = data_primera_edit.porcentaje_tax;
    let con_descuento = data_primera_edit.precio_descuento_local_mask;
    console.log("DATA PRIMERA: ", data_primera_edit);

    if (activa_prom == 1) {
        $('.colorin_edit_si').prop('checked', true);
    } else {
        $('.cambiar_valor_procentaje').prop('disabled', true);
        $('.colorin_edit_no').prop('checked', true);
    }



    $('#modal-cambiar_camp_pri').modal('show');
    $('.cambiar_valor_pri').val(valor_to_cambiar);
    if (data_primera_edit.oferta) {
        $('.valor_con_descuento').val(con_descuento);
    } else {
        $('.valor_con_descuento').val(formatNumberUsd(0));
    }

    $('.titulo_cambio_pri_edit').text(idioma.trans34_);
    $('.titulo_cambio_pri_desc_edit').text(idioma.trans189);
    $('.cambiar_valor_procentaje').val(porcentaje);


    $('.cambiar_valor_procentaje_tax').val(porcentaje_tax);


    $('.no_cambiar_pri_valor').off('click');
    $('.no_cambiar_pri_valor').on('click', null, function () {
        $('#modal-cambiar_camp_pri').modal('hide');

    });

    $('.si_cambiar_pri_valor').off('click');
    $('.si_cambiar_pri_valor').on('click', null, function () {
        // $('.cambiar_valor_procentaje').blur(); 
        validar_valoresprice();


    });

    $('.cambiar_valor_pri').off('blur');
    $('.cambiar_valor_pri').on('blur', null, async function () {
        let valor = $('.cambiar_valor_pri').val();
        let oferta = $('.cambiar_valor_procentaje').val();
        // let respuesta = await validar_campo_precio_campo_porcentaje(valor, oferta);
        valor = devolverNumero(valor);
        let respuesta = await validar_campo_precio(valor);
        if (!respuesta) {
            // $('.si_cambiar_pri_valor').prop('disabled', true); 
        } else {
            $('.si_cambiar_pri_valor').prop('disabled', false);
        }
        valor = formatNumberUsd(valor);
        $('.cambiar_valor_pri').val(valor);
        // $('.si_cambiar_pri_valor').prop('disabled', false);
        $('.cambiar_valor_procentaje').keyup();
    });

    $('.cambiar_valor_pri').off('focus');
    $('.cambiar_valor_pri').on('focus', null, function () {
        let valor = $('.cambiar_valor_pri').val();
        valor = devolverNumero(valor);
        $('.cambiar_valor_pri').val(valor);
        // $('.si_cambiar_pri_valor').prop('disabled', true);


    });

    $('.cambiar_valor_procentaje').off('keyup');
    $('.cambiar_valor_procentaje').on('keyup', null, async function () {
        let valor = $('.cambiar_valor_pri').val();
        let oferta = $('.cambiar_valor_procentaje').val();

        valor = devolverNumero(valor);
        oferta = devolverNumero(oferta);
        if (oferta !== undefined) {
            // let respuesta = await validar_campo_precio_campo_porcentaje(valor, oferta);
            let respuesta = await validar_campo_porcentaje(valor, oferta);
            if (!respuesta) {
                // $('.si_cambiar_pri_valor').prop('disabled', true);

                $('.valor_con_descuento').val(formatNumberUsd(0));

            } else if (respuesta.status === true) {
                $('.valor_con_descuento').val(formatNumberUsd(respuesta.precioConDescuento));
                $('.si_cambiar_pri_valor').prop('disabled', false);
            }
        } else {
            $('.valor_con_descuento').val(valor_to_cambiar);
        }

        if (oferta > 100) { oferta = 100 }
        oferta = formatNumberDecimal(oferta);
        // $('.cambiar_valor_procentaje').val(oferta);
        $('.si_cambiar_pri_valor').prop('disabled', false);
    });

    $('.cambiar_valor_procentaje').off('focus');
    $('.cambiar_valor_procentaje').on('focus', null, function () {
        let valor = $('.cambiar_valor_procentaje').val();
        valor = devolverNumero(valor);
        $('.cambiar_valor_procentaje').val(valor);
        // $('.si_cambiar_pri_valor').prop('disabled', true);


    });

    $('input[name=oferta_edit]').off('change');
    $('input[name=oferta_edit]').on('change', null, function ($event) {
        if ($('.colorin_edit_no').prop('checked')) {
            $('.cambiar_valor_procentaje').val(0);
            // let aux = $('.cambiar_valor_procentaje').val();
            // console.log("the aux: ",aux);
            $('.valor_con_descuento').val(formatNumberUsd(0));
            $('.cambiar_valor_procentaje').prop('disabled', true);
        } else {
            $('.cambiar_valor_procentaje').prop('disabled', false);
            $('.valor_con_descuento').val(valor_to_cambiar);
            $(".cambiar_valor_procentaje").focus();
        }
    });
}

async function validar_valoresprice() {
    let newactprom = $('.colorin_edit_si').prop('checked') == true ? 1 : 0;
    let newporcentaje = $('.cambiar_valor_procentaje').val();
    let valor = $('.cambiar_valor_pri').val();
    let validacion_number_mask = new RegExp('^(0*[1-9][0-9,]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$');
    // let valido_para_seguir; 
    let valido_para_seguir_precio;
    let valido_para_seguir_porcentaje;
    if (validacion_number_mask.test(valor.toString())) {
        valor = devolverNumero(valor);
        newporcentaje = devolverNumero(newporcentaje);

        if (valor != data_primera_edit.precio_descuento_local || newactprom != data_primera_edit.oferta || newporcentaje != data_primera_edit.porcentaje_oferta) {

            if (newactprom == 1 && newporcentaje != 0 && newporcentaje) {
                // valido_para_seguir = await validar_campo_precio_campo_porcentaje(valor,newporcentaje);
                valido_para_seguir_precio = await validar_campo_precio(valor);
                valido_para_seguir_porcentaje = await validar_campo_porcentaje(valor, newporcentaje);
                if (valido_para_seguir_precio && valido_para_seguir_porcentaje) {
                    console.log("AQUIII");
                    preparardata_precio(valor, newactprom, newporcentaje);
                } else {
                    //no cumplio validaciones de precio y porcentaje 
                }
            } else if (newactprom == 0) {
                // valido_para_seguir = await validar_campo_precio_campo_porcentaje(valor); 
                valido_para_seguir_precio = await validar_campo_precio(valor);
                newporcentaje = 0;
                console.log("POR AQUI");
                if (valido_para_seguir_precio) {
                    preparardata_precio(valor, newactprom, newporcentaje);
                }
            } else {
                return presentAlertObject({ icon: 'error', text: idioma.trans162_ });
            }
        } else {
            $('#modal-cambiar_camp_pri').modal('hide');
        }
    } else {
        return presentAlertObject({ icon: 'error', text: idioma.trans217_ });
    }


}

async function preparardata_precio(valor, newactprom, newporcentaje) {
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    let id_publi = paramsURL_publi_edit;
    let dataEnviar = {
        data: {
            id: id_publi,
            uid: user.uid,
            empresa: user.empresa,
            tipo: 7,
            precio: valor,
            iso_code_2: paisusuario.iso_code_2,
            oferta: newactprom,
            porcentaje_oferta: newporcentaje

        }
    }
    respuesta = await enviar_data_wbs_edit(dataEnviar);
    if (respuesta) {
        $('#modal-cambiar_camp_pri').modal('hide');
        $('.titulo_cambio_pri_edit').val("");
        $('.titulo_cambio_edit_t').text("");
    }
}




function llenarCategorias_edit() {
    $('.__categoria_edit').selectpicker('destroy');
    let htmloptionscategorias;
    let categoria_local = { ...categoriasJSON }
    // delete (categoria_local[0]); 
    console.log(categoria_local, categoriasJSON, "categoriaaaaaaaa");
    $.each(categoria_local, function (i, categoria_select) {
        htmloptionscategorias += `<option value="${categoria_select.CategoryID}">${categoria_select.CategoryName}</option>`;
    });
    $('.__categoria_edit').html(htmloptionscategorias);
    $('.__categoria_edit').off('changed.bs.select');
    $('.__categoria_edit').on('changed.bs.select', null, llenarsubCategorias_edit);
    $('.__categoria_edit').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false
    });

}

function llenarsubCategorias_edit(e, valor_id = "") {

    let categoria_id;
    if (valor_id == "2") {
        temp_cat_sub.id_sub = data_primera_edit.subcategoria;
        categoria_id = e;
    } else {
        $('.__subcategoria_edit').val(0);
        $('.__subcategoria_edit').selectpicker('refresh');
        categoria_id = e.target.value;
        temp_cat_sub.id_sub = $('.__subcategoria_edit')[1].value;
    }

    console.log(categoria_id, valor_id, "mmmmmmmmmmmm");

    const categoria = categoriasJSON.find(categoria => { return categoria.CategoryID == categoria_id });

    if (!validarText(categoria) || categoria_id == "") {
        $('.__subcategoria_edit').prop("disabled", true);
        $('.__subcategoria_edit').selectpicker('refresh');
        return;
    } else {
        $('.__subcategoria_edit').prop("disabled", false);
        $('.__subcategoria_edit').selectpicker('refresh');
    }

    temp_cat_sub.id_categoria = categoria.CategoryID;

    subcategoria_edit = categoria.subCategoria;
    $('.__subcategoria_edit').selectpicker('destroy');
    let htmloptionssubcategorias = `<option value="0">${idioma.trans206_}</option>`;
    $.each(subcategoria_edit, function (i, subcategoria_select) {
        htmloptionssubcategorias += `<option value="${subcategoria_select.CategoryID}">${subcategoria_select.CategoryName}</option>`;
    });
    $('.__subcategoria_edit').html(htmloptionssubcategorias);
    $('.__subcategoria_edit').off('changed.bs.select');
    $('.__subcategoria_edit').on('changed.bs.select', null, function () {
        temp_cat_sub.id_sub = $('.__subcategoria_edit')[1].value;
    });

    $('.__subcategoria_edit').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false
    });




}


function editar_cate_edit() {

    llenarCategorias_edit();
    $('#modal-cambiar_camp_cate').modal('show');
    $('.__categoria_edit').val(data_primera_edit.categoria);
    $('.__categoria_edit').selectpicker('refresh');
    llenarsubCategorias_edit(data_primera_edit.categoria, "2")
    $('.__subcategoria_edit').val(data_primera_edit.subcategoria);
    $('.__subcategoria_edit').selectpicker('refresh');
    $('.si_cambiar_cate').off('click');
    $('.si_cambiar_cate').on('click', cambio_cate_wbs);

}
async function cambio_cate_wbs() {
    let dataEnviar;
    let respuesta;
    if (temp_cat_sub.id_sub != data_primera_edit.subcategoria && validarText(temp_cat_sub.id_sub) && temp_cat_sub.id_sub != 0) {
        let id_publi = paramsURL_publi_edit;
        let categoria = categoriasJSON.filter(data => temp_cat_sub.id_categoria == data.CategoryID)[0];
        let subcategoria = categoria.subCategoria.filter(data => temp_cat_sub.id_sub == data.CategoryID)[0];
        dataEnviar = {
            data: {
                id: id_publi,
                uid: user.uid,
                empresa: user.empresa,
                tipo: 2,
                categoria,
                subcategoria
            }
        }

        respuesta = await enviar_data_wbs_edit(dataEnviar);
        if (respuesta) {

            $('#modal-cambiar_camp_cate').modal('hide');
        } else {
            console.log("error");
        }



    } else {

        if (!validarText(temp_cat_sub.id_sub)) {
            temp_cat_sub.id_sub = 0;

            return presentAlertObject({ icon: 'error', text: idioma._trans96 });
        }

        $('#modal-cambiar_camp_cate').modal('hide');
    }


}




function cambiarvalor_modal_in(valor_inpu, titulo_cambio, id = "") {

    $('#modal-cambiar_camp_in').modal('show');
    $('.cambiar_valor_in').val(valor_inpu);
    $('.titulo_cambio_edit').text(titulo_cambio);
    if (id == "1") {
        $('.cambiar_valor_in').off('blur');
        $('.cambiar_valor_in').on('blur', null, function () {
            let valor = $('.cambiar_valor_in').val();
            valor = formatNumberInt(valor);
            $('.cambiar_valor_in').val(valor);
        });

        $('.cambiar_valor_in').off('focus');
        $('.cambiar_valor_in').on('focus', null, function () {
            let valor = $('.cambiar_valor_in').val();
            valor = devolverNumero(valor);
            $('.cambiar_valor_in').val(valor);
        });
    } else {
        $('.cambiar_valor_in').off('blur');
    }

    return new Promise((resolve) => {
        $('.no_cambiar_valor').off('click');
        $('.no_cambiar_valor').on('click', null, function () {
            $('#modal-cambiar_camp_in').modal('hide');
            $('.cambiar_valor_in').val("");
            $('.titulo_cambio_edit').text("");
            resolve(false);
        });

        $('.si_cambiar_valor').off('click');
        $('.si_cambiar_valor').on('click', null, function () {
            let valor = $('.cambiar_valor_in').val();

            if (valor == valor_inpu) {
                valor = false;
            }
            if (id != "1") {
                $('.cambiar_valor_in').val("");
                $('.titulo_cambio_edit').text("");
                $('#modal-cambiar_camp_in').modal('hide');
            }
            resolve(valor);
        });
    });


}


function getpublica_edit(id_publi_edit) {
    $('.btn_init_modificar_publi').prop("disabled", true);
    let dataEnviar = {
        data: {
            id: id_publi_edit,
            uid: user.uid,
            empresa: user.empresa,

        }
    }

    let data_url = baseurl + "/controllers/publicacion/?publicacion_usuario";
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {

        if (res.status == "success") {
            $('.btn_init_modificar_publi').prop('disabled', false);
            // el loading se quita cuando responda el wbs de imagenes
            data_primera_edit = res.data;
            llenarcampos_predeterminado_edit(res.data);
            if (res.data['tiene_colores_tallas'] == 1) {
                tiene_colores_tallas = true;
                // $('#div-edit-direccion').after(`
                //     <div class="col-sm-6 col-md-4 px-xl-5" id="div-tallas-colores">
                //         <h5 class="">${idioma.trans_eb27}</h5>
                //         <button class="btn-edit btn_init_modificar_publi loading_modificar_publi cambio_tallas_colores"  ><span class="">${idioma.trans61}</span> <img loading="lazy" src="../imagen/edit.png"></button>
                //     </div>
                // `);
            } else {
                tiene_colores_tallas = false;
                // $('#div-edit-tipo-envio').after(`
                // <div class="col-sm-6 col-md-4 px-xl-5" id="div-edit-cantidad">
                //     <h5 class="">${idioma.trans48}</h5>
                //     <p class="cantidad_edit_p"></p>
                //     <button class="btn-edit btn_init_modificar_publi  loading_modificar_publi edit_cantidad_pro"><span class="">${idioma.trans61}</span> <img loading="lazy" src="../imagen/edit.png"></button>
                // </div>
                // `);

            }

        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                quitar_loading_ge_publi(".loading_modificar_publi");
                presentAlertObject({ icon: 'error', text: idioma.trans_04 });
            }

        }

    }).fail((err) => {
        quitar_loading_ge_publi(".loading_modificar_publi");
        presentAlertObject({ icon: 'error', text: idioma.trans_04 });


    });


}


async function llenarcampos_predeterminado_edit(data) {
    let categoriasJSON_edit = JSON.parse(localStorage.getItem('categorias'));
    let categoria_edit = categoriasJSON_edit.filter(categoria_sin => data.categoria == categoria_sin.CategoryID)[0];
    let subcategoria_edit = categoria_edit.subCategoria.filter(data_sub => data.subcategoria == data_sub.CategoryID)[0];
    let textocategoria = subcategoria_edit.CategoryNamePath.split(':').join(" > ");
    let condicion_publi = condicionProducto.filter(condicion => data.condicion_producto == condicion.id)[0];
    let data_to_condicion = {
        condicion_pre: condicion_publi,
        garantia_pre: data.garantia
    }
    let texto_condicion
    let tipoenvio_edit = envioProducto.filter(envio => data.envio == envio.id)[0];
    let tipo_expo_edit = exposicionProducto_edit.filter(esposicion => data.exposicion == esposicion.id)[0];



    const fotos = await getimg_pro(); //wbs de traer imagenes
    if (fotos != null) {
        $('.btn_init_modificar_publi').prop('disabled', false);
        traer_imagenes_edit(fotos, 0);
    }
    if (data.garantia == 1) {
        texto_condicion = condicion_publi.nombre + " " + idioma.trans213_;
    } else if (data.garantia == 0) {
        texto_condicion = condicion_publi.nombre + " " + idioma.trans214_;

    }

    if (validarText(data.url_video)) {
        $('.url_video_edit').text(data.url_video);
    } else {
        $('.url_video_edit').text(idioma.trans309_);
    }



    temp_cat_sub.id_categoria = 0;
    temp_cat_sub.id_sub = 0;


    $('.titulo_edit_p').text(data.titulo);
    $('.descrip_edit_p').text(data.descripcion);
    $('.marca_p_edit').text(data.marca);
    $('.modelo_edit_publi').text(data.modelo);
    $('.categoria_sub_p').text(textocategoria);
    $('.texto_condicion_p').text(texto_condicion);
    if (data_primera_edit.oferta) {
        $('.precio_p').text(data_primera_edit.precio_descuento_local_mask);
    } else {
        $('.precio_p').text(data.precio_local_mask);
    }
    $('.tipoenvio_edit_p').text(tipoenvio_edit.nombre);
    $('.cantidad_edit_p').text(formatNumberInt(data.cantidad));
    $('.exposicion_text_edit').text(tipo_expo_edit.nombre);



    $('.editar_con_edit').off('click');
    $('.editar_con_edit').on('click', { data_to_condicion }, llenarCodicionProducto_edit);

    $('.btn_edit_envio').off('click');
    $('.btn_edit_envio').on('click', { envio: tipoenvio_edit, data_pre: data }, llenar_tipo_envio_edit);


    $('.editar_img').off('click');
    $('.editar_img').on('click', { fotos }, editar_img_publi);


    $('.editar_dire_edit').off('click');
    $('.editar_dire_edit').on('click', { data_pre: data }, llenar_direccion_elegir);

    $('.change_editar_tipo_publi').off('click');
    $('.change_editar_tipo_publi').on('click', { data_pre: data }, change_tipo_publi_edit);

    $('.cambio_tipo_exposicion').off('click');
    $('.cambio_tipo_exposicion').on('click', { data_pre: data }, cambio_tipo_expo);

    $('.cambio_url_edit_video').off('click');
    $('.cambio_url_edit_video').on('click', { data_pre: data }, cambio_url_edit);

    $('.cambio_tallas_colores').off('click');
    $('.cambio_tallas_colores').on('click', { data_pre: data }, cambiar_talla_color);



}


function cambio_url_edit($e) {
    $('#modal-url_video_youtube').modal({ backdrop: 'static', keyboard: false });
    $('#modal-url_video_youtube').modal('show');
    $('.div_foto_edit_url').empty();
    let data_pre = $e.data.data_pre;
    if (validarText(data_pre.url_video)) {
        siexiste_url_video(data_pre);
    } else {
        no_existeurl_video(data_pre);
    }

    $('.__uploadfoto_edit_fotourl').off('change');
    $('.__uploadfoto_edit_fotourl').on('change', { clase: ".img-product_url_edit" }, convertBase64_una);

    $('.aceptar_url_video').off('click');
    $('.aceptar_url_video').on('click', { data: data_pre }, cambioen_url_video);

    $('.cancelar_url_video').off('click');
    $('.cancelar_url_video').on('click', null, function () {
        $('.url_video_edit_modal').val("");
        $('#modal-url_video_youtube').modal('hide');
    });


    $('.url_video_edit_modal').off('blur');
    $('.url_video_edit_modal').on('blur', null, async function () {
        let valor_input = $('.url_video_edit_modal').val();
        let respuesta_video = await blur_input_video_edit(valor_input, data_pre.url_video);
        continuacion_blur_video_edit(respuesta_video);

    });

}

function continuacion_blur_video_edit(respuesta) {
    switch (respuesta.id) {
        case 0:
            $('.div_video_edit').show();
            $('.__uploadfoto_edit_fotourl').prop("disabled", false);
            break;

        case 1:
            $('.div_video_edit').show();
            $('.ocultar_opcion_img').show();
            agregar_url_iframe_edit(respuesta.url_actual, ".contenido_url_video");
            console.log(respuesta.url_actual, "mmmmmmm");
            $('.__uploadfoto_edit_fotourl').prop("disabled", false);

            break;

        case 2:
            $('.div_video_edit').hide();
            $('.__uploadfoto_edit_fotourl').prop("disabled", true);

            break;


        case 5:
            $('.div_video_edit').show();
            $('.ocultar_opcion_img').show();

            agregar_url_iframe_edit(respuesta.url_actual, ".contenido_url_video");
            console.log(respuesta.url_actual, "mmmmmmm 2");
            $('.__uploadfoto_edit_fotourl').prop("disabled", false);

            break;

        default:
            $('.div_video_edit').hide();
            $('.ocultar_opcion_img').hide();
            $('.__uploadfoto_edit_fotourl').prop("disabled", true);
            break;
    }
}
//comentario
async function agregar_url_iframe_edit(url_actual, clase_iframe) {
    let url_video;
    let expresion_vi = /^(http:\/\/|https:\/\/)(vimeo\.com)\/([\w\/]+)([\?].*)?$/i;
    let a = expresion_vi.test(url_actual);
    if (a) {
        url_video = url_actual.split("https://vimeo.com/").join("");
        url_video = "https://player.vimeo.com/video/" + url_video;
    } else {

        url_video = await preparar_url_youtube(url_actual);
        if (!validarText(url_video)) {
            $('.url_video_edit_modal').val("");
            $('.url_video_edit_modal').blur();
            presentAlertObject({ icon: 'error', text: idioma.trans403_ });
            return 0;
        }
    }
    $(clase_iframe).empty();
    $(clase_iframe).append(`
        <iframe class="contenido_url_video"  src=${url_video} width="560" height="315" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        `);
}



function cambioen_url_video($e) {
    let data_pri = $e.data.data;
    let valor = $('.url_video_edit_modal').val();
    let patternurl = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
    let eurl;
    if (data_pri.url_video != valor && validarText(valor)) {
        eurl = patternurl.test(valor);
        if (eurl) {
            if (base64_img_video) {
                let img = $(".img-product_url_edit").attr("src");
                let valor_enviar = { img: img, url_video: valor }
                preparardata_wbs(valor_enviar, 14, true, "#modal-url_video_youtube")
            } else {
                return presentAlertObject({ icon: 'error', text: idioma.trans418_ });
            }
        } else {
            return presentAlertObject({ icon: 'error', text: idioma.trans403_ });
        }
    } else {
        if (validarText(valor)) {
            if (base64_img_video) {

                let img = $(".img-product_url_edit").attr("src");
                console.log(img, "imagen");
                let valor_enviar = { img: img, url_video: valor }
                preparardata_wbs(valor_enviar, 14, true, "#modal-url_video_youtube")
            } else {
                $('.cancelar_url_video').click();
            }
        } else {
            // $('.cancelar_url_video').click();
            let valor_enviar = { img: "", url_video: "" }
            preparardata_wbs(valor_enviar, 14, true, "#modal-url_video_youtube")
        }


    }
}

function no_existeurl_video(data) {
    base64_img_video = false;
    $('.__uploadfoto_edit_fotourl').prop("disabled", true);
    $('.img-product_url_edit').prop("disabled", true);
    $('.div_video_edit').hide();
    $('.cuadro_img_edit_video').append(`
        <div class=" div_foto_edit_url ocultar_opcion_img">
        <div class="content-product">
        <label class="content-img">
        <img loading="lazy" class="img-carousel img-product img-product_url_edit" src="../imagen/vacio-vender.png" alt="imagen-producto-nasbi.com">
        <input type="file" class="form-control d-none __uploadfoto_edit_fotourl" accept="image/*">
        </label>
        </div>
        </div>
        `);


    $('.ocultar_opcion_img').hide();


}

function siexiste_url_video(data) {
    $('.__uploadfoto_edit_fotourl').prop("disabled", false);
    $('.img-product_url_edit').prop("disabled", false);
    $('.ocultar_opcion_img').show();
    $('.url_video_edit_modal').val(data.url_video);
    let data2 = { ...data };
    base64_img_video = true;
    agregar_url_iframe_edit(data2.url_video, ".contenido_url_video")
    $('.div_video_edit').show();
    $('.cuadro_img_edit_video').append(`
        <div class=" div_foto_edit_url">
        <div class="content-product">
        <label class="content-img">
        <img loading="lazy" class="img-carousel img-product img-product_url_edit" src=${data2.portada_video} alt="imagen-producto-nasbi.com">
        <input type="file" class="form-control d-none __uploadfoto_edit_fotourl" accept="image/*">
        </label>
        </div>
        </div>
        `);


}





function editar_img_publi(e) {
    $('.si_cambiar_valor_img').prop('disabled', false);
    $('#modal-cambiar_camp_img').modal({ backdrop: 'static', keyboard: false });
    $('#modal-cambiar_camp_img').modal('show');

    const fotos_pre = { ...e.data.fotos };
    for (let i in fotos_pre) {
        fotos_edit.push(fotos_pre[i]);
    }

    traer_imagenes_edit(fotos_edit, 1);

    $('.no_cambiar_valor_img').off('click');
    $('.no_cambiar_valor_img').on('click', null, function () {
        accedio_base64 = false;
        fotos_edit = [];

        $('#modal-cambiar_camp_img').modal('hide');

    });

    $('.si_cambiar_valor_img').off('click');
    $('.si_cambiar_valor_img').on('click', null, function () {
        if (accedio_base64 == true) {
            $('.si_cambiar_valor_img').prop('disabled', true);
            cambiar_imgs_edit();
        } else {
            fotos_edit = [];
            $('#modal-cambiar_camp_img').modal('hide');
        }

    });


}

async function cambiar_imgs_edit() {
    let id, img, dataEnviar, respuesta;
    let id_publi = paramsURL_publi_edit;
    for (let i in fotos_edit) {
        if (fotos_edit[i].id_publicacion) {
            id = parseFloat(i);
            img = fotos_edit[i].foto
            fotos_edit.splice(id, 1, { id, img });
        }

    }
    dataEnviar = {
        data: {
            id: id_publi,
            uid: user.uid,
            empresa: user.empresa,
            tipo: 5,
            fotos_producto: fotos_edit

        }
    }
    respuesta = await enviar_data_wbs_edit(dataEnviar);
    if (respuesta) {
        $('.si_cambiar_valor_img').prop('disabled', false);
        accedio_base64 = false;
        fotos_edit = [];
        $('#modal-cambiar_camp_img').modal('hide');
    }
}


function blur_input_video_edit(valor_del_input, url_pre) {
    return new Promise((resolve) => {
        if (validarText(valor_del_input)) {
            let url_video_product = valor_del_input;
            let patternurl = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
            let eurl;
            eurl = patternurl.test(url_video_product);
            if (eurl) {
                let expresion_video_you_vi = /^(http:\/\/|https:\/\/)(vimeo\.com|youtu\.be|www\.youtube\.com)\/([\w\/]+)([\?].*)?$/i;
                let a = expresion_video_you_vi.test(url_video_product);
                if (a) {
                    if (url_pre == url_video_product) {
                        resolve({ respuesta: true, mensaje: "es_la_misma", id: 0 });
                    } else {
                        if (validarText(url_pre)) {
                            resolve({ respuesta: true, mensaje: "valida_url", id: 1, url_actual: valor_del_input });
                        } else {
                            resolve({ respuesta: true, mensaje: "nueva_url", id: 5, url_actual: valor_del_input });
                        }
                    }

                } else {


                    presentAlertObject({ icon: 'error', text: idioma.trans419_ });
                    resolve({ respuesta: false, mensaje: "no_es_de_you_tube_url_ni_vimeo", id: 2 });
                }
            } else {
                presentAlertObject({ icon: 'error', text: idioma.trans403_ });
                resolve({ respuesta: false, mensaje: "no_es_url_valida", id: 3 });

            }
        } else {
            resolve({ respuesta: true, mensaje: "vacio_campo", id: 4 });
        }
    });
}




function llenarCodicionProducto_edit(e) {
    let valor_predeterinado_cond = e.data.data_to_condicion.condicion_pre;
    let garantia_pre = e.data.data_to_condicion.garantia_pre;
    $('.__condicionesproducto_edit').empty();
    for (const x in condicionProducto) {
        const condicion = condicionProducto[x];
        $('.__condicionesproducto_edit').append(`
            <div  align="center" class="col-lg-4 card-condicion __card${condicion.id}">
            <h5>${condicion.nombre}</h5>
            <p>${idioma.trans176_}
            <span class="span1"><input class="radiun_si" type="radio" name="garantia_edit" value="1" id="garantia_edit${condicion.id}_yes">${idioma.trans24_}</span>
            <span><input class="radiun_no" type="radio" name="garantia_edit" value="0" id="garantia_edit${condicion.id}_no">${idioma.trans25_}</span>
            </p>
            <button class="__selectcondicionproducto_edit button_elegir_${condicion.id}">${idioma.trans193_}</button>
            </div>
            `);
        if (condicionProducto[x].id == valor_predeterinado_cond.id) {
            $(`.__card${condicion.id}`).addClass('activo');
            // $(`#elegido_edit${condicionProducto[x].id}_yes`).prop('checked', true);
            if (garantia_pre == 1) {
                $(`#garantia_edit${condicionProducto[x].id}_yes`).prop('checked', true);
            } else {
                $(`#garantia_edit${condicionProducto[x].id}_no`).prop('checked', true);
            }
        }
        $('.__selectcondicionproducto_edit').eq(x).off('click');
        $('.__selectcondicionproducto_edit').eq(x).on('click', { condicion: condicion, data_pre: e.data.data_to_condicion }, activarCondicionProducto);

        $('.radiun_si').eq(x).off('click');
        $('.radiun_si').eq(x).on('click', { condicion: condicion, data_pre: e.data.data_to_condicion }, click_garantia_si);

        $('.radiun_no').eq(x).off('click');
        $('.radiun_no').eq(x).on('click', { condicion: condicion, data_pre: e.data.data_to_condicion }, click_garantia_no);

    }



    activarCondicionProducto(e.data.data_to_condicion, "1");

    $('#modal-cambiar_camp_condi').modal('show');

}


function click_garantia_si(e) {
    activarCondicionProducto(e, "2");
}

function click_garantia_no(e) {

    activarCondicionProducto(e, "2");
}


function activarCondicionProducto(e, id = "") {
    $('.card-condicion').removeClass('activo');
    let condicion;
    let data_pre;
    let id_pre_con;
    let id_pre_garan;
    if (id == "1") {
        condicion = e.condicion_pre;
        data_pre = condicion;
        id_pre_con = condicion.id;
        id_pre_garan = e.garantia_pre;
    }else if(id == "2"){
        condicion = e.data.condicion;
        data_pre = e.data.data_pre;
        id_pre_con = data_pre.condicion_pre.id;
        id_pre_garan = data_pre.garantia; 
    } else {
        condicion = e.data.condicion;
        data_pre = e.data.data_pre;
        id_pre_con = data_pre.condicion_pre.id;
        id_pre_garan = data_pre.garantia;
        if(!$(`#garantia_edit${condicion.id}_yes`).prop('checked') && !$(`#garantia_edit${condicion.id}_no`).prop('checked')){
            $(`#garantia_edit${condicion.id}_yes`).prop('checked', true);
        } 
    }


    $(`.__card${condicion.id}`).addClass('activo');

    $('.no_cambiar_valor_condi').off('click');
    $('.no_cambiar_valor_condi').on('click', null, function () {
        $('#modal-cambiar_camp_condi').modal('hide');
    });

    $('.si_cambiar_valor_condi').off('click');
    $('.si_cambiar_valor_condi').on('click', null, async function () {
        let garantia_new, condicion_new, dataEnviar, respuesta;
        let id_publi = paramsURL_publi_edit;
        if ($(`#garantia_edit${condicion.id}_yes`).prop('checked')) {
            garantia_new = $(`#garantia_edit${condicion.id}_yes`).val();
            condicion_new = condicion.id;

        } else {
            garantia_new = $(`#garantia_edit${condicion.id}_no`).val();
            condicion_new = condicion.id;
        }

        if (id_pre_con != condicion_new || id_pre_garan != garantia_new) {

            dataEnviar = {
                data: {
                    id: id_publi,
                    uid: user.uid,
                    empresa: user.empresa,
                    tipo: 4,
                    condicion_producto: condicion_new,
                    garantia: garantia_new

                }
            }
           // agregar_loading_ge_publi('.si_cambiar_valor_condi');
            console.log(dataEnviar, "mmmm");

            respuesta = await enviar_data_wbs_edit(dataEnviar);
            if (respuesta) {
                quitar_loading_ge_publi('.si_cambiar_valor_condi');
                $('#modal-cambiar_camp_condi').modal('hide');
            } else {
                quitar_loading_ge_publi('.si_cambiar_valor_condi');
                console.log("nada en condicion")
            }


        } else {
            $('#modal-cambiar_camp_condi').modal('hide');
        }


    });

}


function llenar_tipo_envio_edit(e) {
    let data_envio_pre_tipo = e.data.envio;
    let data_product = e.data.data_pre.detalles_envio;
    $('#modal-cambiar_envio_edit').modal({ backdrop: 'static', keyboard: false });
    $('#modal-cambiar_envio_edit').modal('show');
    //llenar campos condiciones product
    $('.__unidadDistancia_edit').selectpicker('destroy');
    let htmloptionsunidadistancia_edit;
    $.each(unidadDistancia, function (i, unidadis) {
        htmloptionsunidadistancia_edit += `<option value="${unidadis.id}">${unidadis.nombre}</option>`;
    });
    $('.__unidadDistancia_edit').html(htmloptionsunidadistancia_edit);
    $('.__unidadDistancia_edit').off('changed.bs.select');
    $('.__unidadDistancia_edit').on('changed.bs.select', cambiar_input_peso);
    $('.__unidadDistancia_edit').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false
    });
    $('.__alto_edit').val(data_product.alto);
    $('.__largo_edit').val(data_product.largo);
    $('.__ancho_edit').val(data_product.ancho);
    $('.__peso_edit').val(data_product.peso);

    $('.__unidadDistancia_edit').val(data_product.unidad_distancia);
    $('.__unidadDistancia_edit').selectpicker('refresh');
    cambiar_input_peso();

    $('.__divenvio_edit').empty();

    for (const x in envioProducto) {
        let texto_proximamente = ``;
        if (x == 1) texto_proximamente = idioma.trans167;
        $('.__divenvio_edit').append(`
        <div  align="center" class="col-lg-4 container-public envio __card__envio${envioProducto[x].id}">
        <img loading="lazy" src="${envioProducto[x].img}">
        <h5>${envioProducto[x].nombre}</h5>
        <div class="contenedor_text_temporal">
        <h4 class="texto_poximamente_style_modificar">${texto_proximamente}</h4>
        </div>
        <button class="btn-eleg __selectenvio">${idioma.trans193_}</button>
        </div>
        `);
        $('.__selectenvio').eq(x).off('click');
        $('.__selectenvio').eq(x).on('click', { envio: envioProducto[x] }, activarEnvioProducto);
    }
    activarEnvioProducto(data_envio_pre_tipo, 1);


}

function cambiar_input_peso() {
    let unidad_select = $('.__unidadDistancia_edit')[1].value;

    if (unidad_select == 'cm') $('.__unidadPeso_edit').val(unidadPeso[0].nombre);
    if (unidad_select == 'in') $('.__unidadPeso_edit').val(unidadPeso[1].nombre);
}


function activarEnvioProducto(e, id = 0) {
    let envio;
    if (id == 0) {
        envio = e.data.envio;
        if (parseFloat(envio.id) == 2) return 0;
        $('.container-public').removeClass('activo');
        cambio_envio_edit_publi = true;

    } else {
        $('.container-public').removeClass('activo');
        envio = e;
    }


    $(`.__card__envio${envio.id}`).addClass('activo');

    $('.no_cambiar_envio_edit').off('click');
    $('.no_cambiar_envio_edit').on('click', null, function () {
        $('#modal-cambiar_envio_edit').modal('hide');
        cambio_envio_edit_publi = false;
    });

    $('.btn_aceptar_envio_edit').off('click');
    $('.btn_aceptar_envio_edit').on('click', envio, validar_campos_envio_edit);


}
async function validar_campos_envio_edit(e) {
    if (cambio_envio_edit_publi) {
        let unidad_select = $('.__unidadDistancia_edit')[1].value;
        let id_unidadpeso;
        let dataEnviar;
        let alto = devolverNumero($('.__alto_edit').val());
        let largo = devolverNumero($('.__largo_edit').val());
        let ancho = devolverNumero($('.__ancho_edit').val());
        let peso = devolverNumero($('.__peso_edit').val());
        let id_envio = e.data.id;
        let id_publi = paramsURL_publi_edit;
        let respuesta;

        if (unidad_select == 'cm') id_unidadpeso = unidadPeso[0].id;
        if (unidad_select == 'in') id_unidadpeso = unidadPeso[1].id;;

        if (!validarText(id_unidadpeso) || !validarText(unidad_select)) return presentAlertObject({ icon: 'error', text: idioma.trans145_ });
        if (!validarNumero(alto)) return presentAlertObject({ icon: 'error', text: idioma.trans146_ });
        if (!validarNumero(largo)) return presentAlertObject({ icon: 'error', text: idioma.trans147_ });
        if (!validarNumero(ancho)) return presentAlertObject({ icon: 'error', text: idioma.trans148_ });
        if (!validarNumero(peso)) return presentAlertObject({ icon: 'error', text: idioma.trans149_ });

        dataEnviar = {
            data: {
                uid: user.uid,
                empresa: user.empresa,
                id: id_publi,
                tipo: 8,
                alto: alto,
                largo: largo,
                ancho: ancho,
                peso: peso,
                unidad_masa: id_unidadpeso,
                unidad_distancia: unidad_select,
                tipo_envio: id_envio

            }
        }
        $('.btn_aceptar_envio_edit').prop('disabled', true);
        respuesta = await enviar_data_wbs_edit(dataEnviar);
        if (respuesta) {
            $('#modal-cambiar_envio_edit').modal('hide');
            $('.btn_aceptar_envio_edit').prop('disabled', false);
        } else {
            $('.btn_aceptar_envio_edit').prop('disabled', false);
            console.log("error");
        }
    } else {
        $('#modal-cambiar_envio_edit').modal('hide');
        console.log("no cambio");

    }

}


function llenar_direccion_elegir(e) {
    let data_pre = e.data.data_pre.detalles_direccion;
    let paisesJSON_edit = JSON.parse(localStorage.getItem('paises'));
    let pais_pre = paisesJSON_edit.filter(pais => pais.country_id == data_pre.pais)[0];
    let departamento_pre = pais_pre.departamento.filter(departamento => departamento.zone_id == data_pre.departamento)[0];
    $('#modal-cambiar_dire').modal('show');
    //llenar direccion campos predeterminados//
    $('.__pais_edit').val(pais_pre.pais_name);
    $('.__departamento_edit').val(departamento_pre.name);
    $('.__ciudad_edit').val(data_pre.ciudad);
    $('.__direccion_edit').val(data_pre.direccion);
    $('.__zip_edit').val(data_pre.codigo_postal);

    ///
    $('.btn_cambiar_dir_edit').off('click');
    $('.btn_cambiar_dir_edit').on('click', data_pre, cambio_dir_edit);
}

async function cambio_dir_edit(e) {
    $('.btn_cambiar_dir_edit').prop("disabled", true);
    agregar_loading_ge_publi('.btn_cambiar_dir_edit');
    let direcciones = await getdirecciones_edit();
    quitar_loading_ge_publi('.btn_cambiar_dir_edit');
    $('.btn_cambiar_dir_edit').prop("disabled", false);
    let data_pre = e.data;
    let datos_de_direccion_pre = null;
    let direccion_registrada_edit = false;

    if (direcciones) {
        datos_de_direccion_pre = direcciones.filter(direccion => direccion.id == data_pre.id)[0]; //buscar direccion aa ver si se encuentra en la bd de direcciones 
        if (datos_de_direccion_pre != null) {
            direccion_registrada_edit = true;
        } else {
            direccion_registrada_edit = false;
            presentAlertObject({ icon: 'info', text: idioma.trans219_ });
        }
        mostrardirecciones(direcciones, data_pre, direccion_registrada_edit);

    } else {
        presentAlertObject({ icon: 'error', text: idioma.trans47_ });
    }


}

function mostrardirecciones(direccionesUsuario, data_pre, direccion_registrada_edit) {
    $('.__alldirecciones_cuenta_edit').empty();
    $('#modal-direcciones_edit').modal('show');

    let activa, butonActivar = false;
    for (const x in direccionesUsuario) {
        const direccion = direccionesUsuario[x];
        activa = direccion.activa == 1 ? `<span class="text-primary">${idioma.trans21}</span>` : `<span class="text-secondary">${idioma.trans22}</span>`;

        $('.__alldirecciones_cuenta_edit').append(`
            <div class="card-body col-lg-4 card_dire_edit elegir_direccion_edit_pro dire_card_${direccion.id}">
            <h4>${idioma.trans18}</h4>
            <p class="card-text text-modal-direcciones"><span>${idioma.trans15}:</span> <span>${direccion.pais.pais_name}</span></p>
            <p class="card-text text-modal-direcciones"><span>${idioma.trans16}:</span> <span>${direccion.departamento.name}</span></p>
            <p class="card-text text-modal-direcciones"><span>${idioma.trans17}:</span> <span>${direccion.ciudad}</span></p>
            <p class="card-text text-modal-direcciones"><span>${idioma.trans18}:</span> <span>${direccion.direccion}</span></p>
            <p class="card-text text-modal-direcciones"><span>${idioma.trans19}:</span> <span>${direccion.codigo_postal}</span></p>
            </div>
            `);
        $('.elegir_direccion_edit_pro').eq(x).off('click');
        $('.elegir_direccion_edit_pro').eq(x).on('click', { direccion_elegida: direccion }, activarDireccion_edit);


    }

    activarDireccion_edit(data_pre, 1, direccion_registrada_edit);

}



function activarDireccion_edit(e, caso = 0, direccion_registrada_edit = true) {
    let dir, accedio = false, dataEnviar;
    $('.card_dire_edit').removeClass('activo');
    if (caso == 0) {
        accedio = true;
        dir = e.data.direccion_elegida.id;
    } else {
        let id_dir_pre = e.id;
        dir = id_dir_pre;
    }

    if (direccion_registrada_edit) {
        $(`.dire_card_${dir}`).addClass('activo');
    }

    $('.btn_cancelar_dir_edit').off('click');
    $('.btn_cancelar_dir_edit').on('click', null, function () {

        $('#modal-direcciones_edit').modal('hide');
    });

    $('.btn_aceptar_dir_edit').off('click');
    $('.btn_aceptar_dir_edit').on('click', null, async function () {
        let id_publi = paramsURL_publi_edit;

        if (accedio) {
            dataEnviar = {
                data: {
                    uid: user.uid,
                    empresa: user.empresa,
                    id: id_publi,
                    tipo: 10,
                    id_direccion: dir
                }
            }

            // direccion_new=e.data.direccion_elegida; 
            respuesta = await enviar_data_wbs_edit(dataEnviar);
            if (respuesta) {
                $('#modal-cambiar_dire').modal('hide');
                $('#modal-direcciones_edit').modal('hide');
            } else {
                console.log("error");
            }



        } else {
            console.log("nocambio");
            $('#modal-direcciones_edit').modal('hide');
        }

    });
}



function getdirecciones_edit() {
    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
        }
    }

    return new Promise((resolve) => {
        let data_url = baseurl + "/controllers/direcciones/?direcciones_usuario";
        $.ajax({
            type: 'POST',
            url: data_url,
            data: dataEnviar,
            dataType: 'json',
            "headers": { 'x-api-key': user.token },
        }).done(async (res) => {
            if (res.status == 'success') {
                if (res.status == 'success' && res.cantidad > 0) {
                    let direccionesUsuario = res.data;
                    direccionesUsuario.map((data) => {
                        let paisesJSON_dir = JSON.parse(localStorage.getItem('paises'));
                        data.pais = paisesJSON_dir.filter(datos => datos.country_id == data.pais)[0];
                        data.departamento = data.pais.departamento.filter(datos => datos.zone_id == data.departamento)[0];
                        delete (data.pais.departamento);
                        return data;
                    });
                    resolve(direccionesUsuario);

                } else {
                    presentAlertObject({ icon: 'info', text: idioma.trans47_ });
                    resolve(false);
                }


            } else {
                let validate_token = await erroresTokenEmpresa(res);
                if (!validate_token) {
                    if (res.status == 'fail' && res.cantidad == 0) {
                        presentAlertObject({ icon: 'info', text: idioma.trans47_ });
                    } else {
                        presentAlertObject({ icon: 'error', text: idioma.trans78 });
                    }
                    resolve(false);

                }

            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans78 });
            resolve(false);
        });
    });
}



function traer_imagenes_edit(e, id = 0) {
    let fotos_edit_temp = e;
    switch (id) {
        case 0:    //PARA LLENAR LAS IMAGENES PREDETERMINADAS DE LA VISTA NO LAS DEL MODAL DE EDITAR
            $('.__divfotos_edit').empty();
            for (let i = 0; i < 10; i++) {
                if (fotos_edit_temp[i]) {
                    const foto = fotos_edit_temp[i];

                    $('.__divfotos_edit').append(`

                        <div class="col-12 col-sm-4 col-md-3 col-lg-2 pl-0 pr-2">
                            <div class="content-product">
                                <img loading="lazy" src=${foto.foto} class="img-product __imgfoto${i}">
                            </div>
                        </div>
                    `);
                }
            }
            break;

        case 1: //LLENAR LAS IMAGENES TANTO LAS PREDETERMINADAS COMO LAS VACIAS PARA CARGAR EN EL MODAL
            let cantidad_fotos_pre = fotos_edit_temp.length;
            let hidde_foto = ``;
            $('.__divfotos_edit_2').empty();
            for (let j = 0; j < 10; j++) {
                const foto = fotos_edit_temp[j];
                if (fotos_edit_temp[j]) { //SI EXISTE EL CAMPO 
                    if (fotos_edit_temp[j].foto || fotos_edit_temp[j].img) { //SI EXISTE LA FOTO
                        hidde_foto = ``;
                        let url_foto = fotos_edit_temp[j].foto ? fotos_edit_temp[j].foto : fotos_edit_temp[j].img;
                        if (j != 0) {
                            $('.__divfotos_edit_2').append(`
                            <div class="col-sm-6 col-lg-3 px-0 px-sm-2">
                                <div class="content-product">
                                    <label class="content-img">
                                        <img loading="lazy" src=${url_foto} class="img-product __imgfoto2${j}">
                                        <input type="file" class="form-control d-none __uploadfoto_edit" accept="image/*">
                                    </label>
                                </div>
                                <button class="btn-edit quitar_img_edit2 rojo_claass_btn"  id=${j + "img"}>${idioma.trans218_}</button> 
                            </div>
                        `);
                        } else {
                            $('.__divfotos_edit_2').append(`
                            <div class="col-sm-6 col-lg-3 px-0 px-sm-2">
                                <div class="content-product">
                                    <label class="content-img">
                                        <img loading="lazy" src=${url_foto} class="img-product __imgfoto2${j}">
                                        <input type="file" class="form-control d-none __uploadfoto_edit" accept="image/*">
                                    </label>
                                </div>
                                <button class="btn-edit quitar_img_edit2  " id=${j + "img"}>${idioma.trans221_}</button> 
                            </div>
                        `);

                        }
                    } else {
                        if (cantidad_fotos_pre != j) {
                            hidde_foto = `element_oculto_modificar`;
                        } else {
                            hidde_foto = ``;
                        }
                        $('.__divfotos_edit_2').append(`
                        <div class="col-sm-6 col-lg-3 px-0 px-sm-2 contenedor_img_editar${j} ${hidde_foto}">
                            <div class="content-product">
                                <label class="content-img">
                                    <img loading="lazy" src=${foto.img} class="img-product __imgfoto2${j}">
                                    <input type="file" class="form-control d-none __uploadfoto_edit" accept="image/*">
                                </label>
                            </div>
                            <button class="btn-edit quitar_img_edit2 rojo_claass_btn " id=${j + "img"}>${idioma.trans218_}</button> 
                        </div>
                    `);
                    }
                }
                else {
                    if (cantidad_fotos_pre != j) {
                        hidde_foto = `element_oculto_modificar`;
                    } else {
                        hidde_foto = ``;
                    }

                    $('.__divfotos_edit_2').append(`
                        <div class="col-sm-6 col-lg-3 px-0 px-sm-2 contenedor_img_editar${j} ${hidde_foto}">
                            <div class="content-product">
                                <label class="content-img">
                                    <img loading="lazy" src="../imagen/vacio-vender.png" class="img-product __imgfoto2${j}">
                                    <input type="file" class="form-control d-none __uploadfoto_edit" accept="image/*">
                                </label>
                            </div>
                            <button class="btn-edit quitar_img_edit2 quitar_img_edit rojo_claass_btn"id=${j + "img"}>${idioma.trans218_}</button> 
                        </div>
                    `);

                    $('#' + j + "img").hide();
                }
                $('.__uploadfoto_edit').eq(j).off('change');
                $('.__uploadfoto_edit').eq(j).on('change', { id: j }, convertBase64);

                $('.quitar_img_edit2').eq(j).off('click');
                $('.quitar_img_edit2').eq(j).on('click', { img_borrar: foto, posicion: j }, quitar_img_array);
            }
            break;

        default:
            break;
    }
}



function quitar_img_array(e) {
    let posicion = e.data.posicion;
    if (posicion != 0) {
        fotos_edit.splice(posicion, 1);
        accedio_base64 = true;
        traer_imagenes_edit(fotos_edit, 1);
    } else {
        presentAlertObject({ icon: "info", text: idioma.trans220_ })
    }
}

function getimg_pro() {
    let id_publi = paramsURL_publi_edit;
    let dataEnviar = {
        data: {
            id: id_publi,
            uid: user.uid,
            empresa: user.empresa,
        }
    }
    let data_url = baseurl + "/controllers/publicacion/?fotos_producto";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'POST',
            data: dataEnviar,
            dataType: 'json',
            "headers": { 'x-api-key': user.token },
        }).done(async (result) => {
            quitar_loading_ge_publi(".loading_modificar_publi");

            if (result["status"] == 'success') {

                resolve(result.data);
            } else {
                let validate_token = await erroresTokenEmpresa(result);
                if (!validate_token) resolve(null);

            }
        }).fail((err) => {
            quitar_loading_ge_publi(".loading_modificar_publi");
            presentAlertObject({ icon: 'error', text: idioma.trans216_ });
            reject(null);
        });
    });



}
function convertBase64(e) {

    accedio_base64 = true;
    let id = e.data.id;
    $('.contenedor_img_editar' + (id + 1)).removeClass("element_oculto_modificar");
    var archivo = e.target.files[0], reader = new FileReader()
    if (archivo) {
        if (archivo.size <= 5000000) {
            if (archivo['type'] == "image/png" || archivo['type'] == "image/jpeg" || archivo['type'] == "image/jpg") {

                reader.onload = (e) => {
                    var binaryString;
                    if (!e) binaryString = reader.content;
                    else binaryString = e.target.result;
                    let img = 'data:image/png;base64,' + window.btoa(binaryString);
                    $('.__imgfoto2' + id).prop('src', img);
                    $('#' + id + "img").show();


                    if (fotos_edit.length > 0) {
                        fotos_edit.splice(id, 1, { id, img });
                    }

                }
                if (id > fotos_edit.length) {
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


function convertBase64_una(e) {
    base64_img_video = true;
    let clase_img = e.data.clase;
    var archivo = e.target.files[0],
        reader = new FileReader()
    reader.onload = (e) => {
        var binaryString;
        if (!e) binaryString = reader.content;
        else binaryString = e.target.result;
        let img = 'data:image/png;base64,' + window.btoa(binaryString);
        $(clase_img).attr("src", img)
    }
    reader.readAsBinaryString(archivo);
}


function change_tipo_publi_edit($e) {
    let data_de_pre = $e.data.data_pre;
    $('#modal-tipo_publi_edit').modal('show');
    $('.__tiposProdutos_edit').empty();
    for (const x in tiposProdutos_edit) {
        let textdispo = '';
        if (x > 0) textdispo = idioma.trans167;
        $('.__tiposProdutos_edit').append(`
            <div class="card-cat col-lg-4 __cardselect_edit __class_seleccion_tipo_edit${tiposProdutos_edit[x].id}">
                <img src="${tiposProdutos_edit[x].img}">
                <p>${tiposProdutos_edit[x].nombre}</p>
                <p style="font-size: 10px !important;">${textdispo}</p>
            </div>
            `);
        $('.__cardselect_edit').eq(x).off('click');
        $('.__cardselect_edit').eq(x).on('click', { tipo: tiposProdutos_edit[x] }, activarTipoProducto_edit);
    }
    activarTipoProducto_edit(data_de_pre.tipo, 0)
}

function activarTipoProducto_edit($e, id = 1) {
    $('.container-public').removeClass('activo');
    let tipo;
    if (id == 0) {
        tipo = $e;
    } else {
        tipo = $e.data.tipo.id;
        if (parseFloat(tipo) > 1) return 0;
    }

    $('.__cardselect_edit').removeClass('activo');

    $(`.__class_seleccion_tipo_edit${tipo}`).addClass('activo');

    $('.btn_cancelar_tipo_publi_edit').off('click');
    $('.btn_cancelar_tipo_publi_edit').on('click', null, function () {
        $('#modal-tipo_publi_edit').modal('hide');
    });

    $('.btn_aceptar_tipo_publi_edit').off('click');
    $('.btn_aceptar_tipo_publi_edit').on('click', null, function () {
        preparardata_wbs(tipo, 12, true, "#modal-tipo_publi_edit");
    });
}

function cambio_tipo_expo($e) {
    let data_de_pre = $e.data.data_pre;
    console.log("DATA_DE_PRE: ", data_de_pre);
    $('.__divexposicion_edit').empty();

    $('#modal-tipo_exposicion_edit').modal('show');
    let adicionalexpo = '';
    for (const x in exposicionProducto_edit) {
        if (exposicionProducto_edit[x].id == 3) {
            adicionalexpo = `
            <div class="input-group group-filtro">
                <div class="dropdown divdropdownfiltro">
                    <input type="text" class="form-control input-plataforma rounded __cantidad__exposicion" placeholder="#">
                </div>
                <div class="input-group-prepend">
                    <span class="input-group-text">${data_de_pre.cantidad}</span>
                </div>
            </div>
            `;
            adicionalexpo = ``;
        }

        const detalleCategoria = categoriasProductos.filter((categoria) => {
            if (categoria.CategoryIDPath !== "") {
                if (categoria.CategoryID === data_de_pre.categoria.toString()) return categoria;
            }
        });

        console.log("DETALLESCATEGORIA: ", detalleCategoria);

        $('.__divexposicion_edit').append(`
            <div align="center" class="col-lg-4 container-public_expo __card_edit__expo${exposicionProducto_edit[x].id}">
                <img src="${exposicionProducto_edit[x].img}">
                <h5>${exposicionProducto_edit[x].nombre}</h5>
                <div class="container_descrip_condicion">
                    <p>
                        ${exposicionProducto_edit[x].descripcion}
                        <br>
                        ${exposicionProducto_edit[x].id === 2 ? `<span><a href="costo-publicacion.php" target="_blank">${idioma.trans185}: ` + detalleCategoria[0].tarifaPublicacion.clasica + "</a></span>" : ""}
                        ${exposicionProducto_edit[x].id === 3 ? `<span><a href="costo-publicacion.php" target="_blank">${idioma.trans185}: ` + detalleCategoria[0].tarifaPublicacion.premium + "</a></span>" : ""}

                    </p>
                </div>
                    
                <div class="boton_expo_product">
                    <button class="btn-eleg __selectexpo">${idioma.trans193_}</button>
                </div>
            </div>
            `);
        $('.__selectexpo').eq(x).off('click');
        $('.__selectexpo').eq(x).on('click', { expo: exposicionProducto_edit[x], data: data_de_pre }, activarExpoProducto_edit);

    }

    activarExpoProducto_edit(data_de_pre, 0)

}

async function activarExpoProducto_edit($e, id = 1) {
    let id_expo;
    let data_pre = false;

    if (id == 0) {
        data_pre = $e;
        id_expo = $e.exposicion;
        id_expo = id_expo.toString();
        agregar_flujo_de_disabled_de_exposicion(data_pre);
    } else {
        id_expo = $e.data.expo.id;
        if (id_expo == 1) {
            let res_expo_1 = await validar_si_tiene_mas_de_tres_ventas_estado_1(user, true); //esto esta en funciones.js
            if (res_expo_1) {
                return 0;
            }
        }
    }

    console.log(id_expo, "mm 2");
    $('.container-public_expo').removeClass('activo');
    $(`.__card_edit__expo${id_expo}`).addClass('activo');


    $('.btn_cancelar_tipo_exposicion_edit').off('click');
    $('.btn_cancelar_tipo_exposicion_edit').on('click', null, function () {
        $('#modal-tipo_exposicion_edit').modal('hide');
    });

    $('.btn_aceptar_tipo_exposicion_edit').off('click');
    $('.btn_aceptar_tipo_exposicion_edit').on('click', null, function () {
        console.log(id_expo, "iddddd");
        preparardata_wbs(id_expo, 13, true, "#modal-tipo_exposicion_edit");
    });

}

function preparar_url_youtube(url_vi) {
    return new Promise((resolve) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url_vi.match(regExp);
        let respuesta = (match && match[2].length === 11) ? "https://youtube.com/embed/" + match[2] : null;
        resolve(respuesta);
    })

}




function agregar_flujo_de_disabled_de_exposicion(data) {
    if (data.tipoSubasta == "1") {
        $(".__selectexpo").prop("disabled", true);
    } else {
        $(".__selectexpo").prop("disabled", false);
    }
}

function cargarDatosValidacion() {
    const paisUsuario = JSON.parse(localStorage.getItem('paisOrigen'));
    const dataEnviar = {
        "data": {
            "iso_code_2": paisUsuario.iso_code_2
        }
    };
    return new Promise((resolve) => {
        $.ajax({
            type: 'POST',
            url: `${baseurl}/controllers/publicacion/?restricciones_publicar`,
            data: dataEnviar,
            dataType: 'json',
        }).done((res) => {
            console.log("RESPUESTA: ", res);
            montoMinimoPublicarMonedaLocal = res.montoMinimoPublicarMonedaLocal;
            symbolMonedaLocal = res.symbolMonedaLocal;
            montoMinimoPublicarMonedaLocalMask = res.montoMinimoPublicarMonedaLocalMask;
        })
            .fail((err) => {
                console.log("ERROR AL CARGAR INFORMACION");
            });
    });
}

function validar_campo_precio(precio) {
    return new Promise((resolve) => {
        if (precio < montoMinimoPublicarMonedaLocal) {
            presentAlertObject({ icon: 'error', text: `${idioma.trans186} $${montoMinimoPublicarMonedaLocalMask} ${symbolMonedaLocal}` });
            resolve(false);
        } else {
            resolve(true);
        }
    });
}

function validar_campo_porcentaje(precio, porcentaje = 0) {
    return new Promise((resolve) => {
        if (porcentaje != 0) {
            if (precio > montoMinimoPublicarMonedaLocal) {
                maximoPorcentajeAceptable = 100 - (100 * montoMinimoPublicarMonedaLocal) / precio;
                if (porcentaje <= 50) {
                    let auxMaximo = maximoPorcentajeAceptable.toString();
                    let sliced = auxMaximo.slice(0, auxMaximo.indexOf('.') + 3);
                    maximoPorcentajeAceptable = parseFloat(sliced);
                    if (porcentaje > maximoPorcentajeAceptable) {
                        presentAlertObject({ icon: 'error', text: `${idioma.trans187} ${maximoPorcentajeAceptable}%` });
                        resolve(false);
                    } else {
                        const precioConDescuento = precio - (precio * porcentaje) / 100;
                        resolve({ status: true, precioConDescuento: precioConDescuento });
                    }
                } else {
                    presentAlertObject({ icon: 'error', text: idioma.trans188 });
                    resolve(false);
                }
            } else {
                presentAlertObject({ icon: 'error', text: `${idioma.trans186} $${montoMinimoPublicarMonedaLocalMask} ${symbolMonedaLocal}` });
                resolve(false);
            }
        } else {

        }
    });
}

function cambiar_talla_color() {
    // if(tiene_colores_tallas){
    $('#modal-talla-color').modal({ backdrop: 'static', keyboard: false });
    $('#modal-talla-color').modal('show');
    $('.aceptar_talla_color').off('click');
    $('.aceptar_talla_color').on('click', { data: ObjectEditarTalla.data }, cambioen_talla_color);
    $('.cancelar_talla_color').off('click');
    $('.cancelar_talla_color').on('click', null, function () {
        $('.modal-talla-color').val("");
        $('#modal-talla-color').modal('hide');
        $('#content-colors').addClass('d-none');
    });
    $('.btn-add-more-color').off('click');
    $('.btn-add-more-color').on('click', null, function () {
        $('#content-colors').removeClass('d-none');
        getColors(1);
        chargeColorsEdit(1);
    });
    getTallaColorProducto();
    // }
    // else{
    //     presentAlertObject({icon:'error', text:idioma.trans294});
    // }

}
var tallaXcolorXproducto = [];
var esta_vacio = false;
var ObjectEditarTalla = {
    "data": {
        "id_producto": null,
        "coloresXtallas": [],
    }
}
function getTallaColorProducto() {
    let data_url = baseurl + "/controllers/publicacion/?obtener_productos_tallas_editar";
    let data = {
        data: { id_producto: paramsURL_publi_edit },
    }

    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'POST',
            data: data,
            dataType: 'json',
        }).done((result) => {
            if (result["status"] == 'success') {
                tallaXcolorXproducto = result.data;
                ObjectEditarTalla.data.id_producto = paramsURL_publi_edit;
                ObjectEditarTalla.data.coloresXtallas = tallaXcolorXproducto;
                getColors(1);
                chargeTallaColor();
                chargeColorsEdit(1);
            } else if (result["status"] == 'vacio') {
                esta_vacio = true;
                getColors(1);
                chargeTallaColor();
                chargeColorsEdit(1);
                resolve(null);
            } else {
                getColors(1);
                chargeTallaColor();
                chargeColorsEdit(1);
                resolve(null);
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans_04 });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
            reject(null);
        });
    });

}
function chargeTallaColor() {
    ya_elegidos = [];
    let html = '';
    $("#talla-cantidad").html('');
    if (localLenguaje == 'EN') {
        Object.keys(tallaXcolorXproducto).forEach(function (key) {
            if (tallaXcolorXproducto[key].eliminar_color != true) {
                html += `<div class="col-lg-6">
                    <div class="content-return-color">
                        <div class="div-color text-capitalize" style="background: ${tallaXcolorXproducto[key].hexadecimal} !important;">
                            <div class="span-color" style="background: ${tallaXcolorXproducto[key].hexadecimal} !important;"></div> <!-- ${tallaXcolorXproducto[key].nombre_en}-->
                            </div>
                            <a href="#" onclick="deleteColorEdit(${key})"><i class="ml-1 fa fa-trash add-talla"></i></a>
                        </div>
                        <div class="table-responsive tabla-tallas">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th style="width: 20%;">Size</th>
                                    <th style="width: 35%;">Quantity</th>
                                    <th style="width: 40%;">SKU optional</th>
                                    <th style="width: 5%;">&nbsp;</th>
                                </tr>
                                </thead>
                                <tbody>`;
                ya_elegidos.push(tallaXcolorXproducto[key].hexadecimal);
                Object.keys(tallaXcolorXproducto[key].tallas).forEach(function (key1) {
                    if (tallaXcolorXproducto[key].tallas[key1].eliminar_pair != true) {
                        html += `<tr>
                            <td style="width: 20%;"><b>${tallaXcolorXproducto[key].tallas[key1].nombre_en}</b></td>
                            <td style="width: 35%;">
                             <input type="number" maxlength="500" class="form-control __maskInt__ __cantidad trans194___ph" oninput="editarCantidadTalla(${key}, ${key1}, $(this).val());" value="${tallaXcolorXproducto[key].tallas[key1].cantidad}">
                            </td>
                            <td style="width: 40%;"><input type="text" class="form-control" oninput="editarSKUTalla(${key}, ${key1}, $(this).val())" value="${tallaXcolorXproducto[key].tallas[key1].sku}"></td>
                            <td style="width: 5%;"><a href="#" onclick="deleteSizeEdit(${key}, ${key1})"><i class="fa fa-trash add-talla"></i></a></td>
                        </tr>`;
                    }
                });
                html += `
                    <tr class="add_new_size${key} d-none">
                        <td>
                            <select name="" id="" class="nombre_talla${key}">`;
                let sw = false;
                for (let i = 0; i < tallas_ventas.length; i++) {
                    for (let j = 0; j < tallaXcolorXproducto[key].tallas.length; j++) {
                        if (tallas_ventas[i].id == tallaXcolorXproducto[key].tallas[j].id_talla) sw = true;
                    }
                    if (!sw) html += `<option value="${tallas_ventas[i].id}">${tallas_ventas[i].nombre_en}</option>`;
                    sw = false;
                }
                html += `</select>
                        </td>
                        <td>
                            <input type="number" maxlength="500" class="cantidad${key} form-control __maskInt__ __cantidad trans194___ph">               
                        </td>
                        <td>
                        <input type="text" class="sku${key} form-control">
                        </td>
                    </tr>
                    <tr class="options_add_new_size${key} d-none">
                        <td colspan="2">
                            <a href="#" onclick="chargeTallaColor()">
                                <button class="btncancelicon">${idioma.trans_eb42} <i class="fas fa-ban"></i></button>
                            </a>
                        </td>
                        <td colspan="2">
                            <a href="#" onclick="save_new_size(${key})">
                                <button class="btnsaveicon">${idioma.trans_243} <i class="fa fa-save add-talla"></i></button>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <a onclick="add_new_size(${key})" href="#">
                                <button class="btnaddicon">${idioma.trans_eb012} <i class="fa fa-plus add-talla"></i></button>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            </div>`;
            }
        });
        $("#talla-cantidad").html(html);
    }
    else if (localLenguaje == 'ES') {
        Object.keys(tallaXcolorXproducto).forEach(function (key) {
            if (tallaXcolorXproducto[key].eliminar_color != true) {
                html += `<div class="col-md-6">
                    <div class="content-return-color">
                        <div class="div-color text-capitalize" style="background: ${tallaXcolorXproducto[key].hexadecimal} !important;">
                            <div class="span-color" style="background: ${tallaXcolorXproducto[key].hexadecimal} !important;"></div> <!-- ${tallaXcolorXproducto[key].nombre_es} -->
                            </div>
                            <a href="#" onclick="deleteColorEdit(${key})"><i class="ml-1 fa fa-trash add-talla"></i></a>
                        </div>
                        <div class="table-responsive tabla-tallas">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Talla</th>
                                    <th>Cantidad</th>
                                    <th>SKU opcional</th>
                                </tr>
                                </thead>
                                <tbody>`;
                Object.keys(tallaXcolorXproducto[key].tallas).forEach(function (key1) {
                    if (tallaXcolorXproducto[key].tallas[key1].eliminar_pair != true) {
                        html += `<tr>
                            <td><b>${tallaXcolorXproducto[key].tallas[key1].nombre_es}</b></td>
                            <td>
                             <input type="number" maxlength="500" class="form-control __maskInt__ __cantidad trans194___ph" oninput="editarCantidadTalla(${key}, ${key1}, $(this).val());" value="${tallaXcolorXproducto[key].tallas[key1].cantidad}">
                            </td>
                            <td><input type="text" class="form-control" oninput="editarSKUTalla(${key}, ${key1}, $(this).val())" value="${tallaXcolorXproducto[key].tallas[key1].sku}"></td>
                            <td><a href="#" onclick="deleteSizeEdit(${key}, ${key1})"><i class="fa fa-trash add-talla"></i></a></td>
                        </tr>`;
                    }
                });
                html += `
                    <tr class="add_new_size${key} d-none">
                        <td>
                            <select name="" id="" class="select-talla-agg nombre_talla${key}">`;
                let sw = false;
                for (let i = 0; i < tallas_ventas.length; i++) {
                    for (let j = 0; j < tallaXcolorXproducto[key].tallas.length; j++) {
                        if (tallas_ventas[i].id == tallaXcolorXproducto[key].tallas[j].id_talla) sw = true;
                    }
                    if (!sw) html += `<option value="${tallas_ventas[i].id}">${tallas_ventas[i].nombre_es}</option>`;
                    sw = false;
                }
                html += `</select>
                        </td>
                        <td>
                            <input type="number" maxlength="500" class="cantidad${key} form-control __maskInt__ __cantidad trans194___ph">               
                        </td>
                        <td>
                        <input type="text" class="sku${key} form-control">
                        </td>
                    </tr>
                    <tr class="options_add_new_size${key} d-none">
                        <td colspan="2">
                            <a href="#" onclick="chargeTallaColor()">
                                <button class="btncancelicon">${idioma.trans_eb42} <i class="fas fa-ban"></i></button>
                            </a>
                        </td>
                        <td colspan="2">
                            <a href="#" onclick="save_new_size(${key})">
                                <button class="btnsaveicon">${idioma.trans_243} <i class="fa fa-save add-talla"></i></button>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <a onclick="add_new_size(${key})" href="#">
                                <button class="btnaddicon">${idioma.trans_eb012} <i class="fa fa-plus add-talla"></i></button>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            </div>`;
            }
        });
        $("#talla-cantidad").html(html);
    }
    $("#content-colors").addClass('d-none');
    $("#content-tallas").addClass('d-none');
}
function editarCantidadTalla(key, key1, val) {
    ObjectEditarTalla.data.coloresXtallas[key].tallas[key1].cantidad = val;
    tallaXcolorXproducto[key].tallas[key1].cantidad = val;
}
function editarSKUTalla(key, key1, val) {
    ObjectEditarTalla.data.coloresXtallas[key].tallas[key1].sku = val;
    tallaXcolorXproducto[key].tallas[key1].sku = val;
}
function cambioen_talla_color($data) {
    console.log($data.data);
    if (valid_ObjectEdit()) {
        let data_url = baseurl + "/controllers/publicacion/?editar_colores_tallas";

        return new Promise((resolve, reject) => {
            $('.aceptar_talla_color').attr('disabled',true);
            $.ajax({
                url: data_url,
                type: 'POST',
                data: $data.data,
                dataType: 'json',
            }).done((result) => {
                $('.aceptar_talla_color').attr('disabled',false);
                if (result["status"] == 'success') {
                    $('.modal-talla-color').val("");
                    $('#modal-talla-color').modal('hide');
                    $('#content-colors').addClass('d-none');
                    presentAlertObject({ icon: 'success', text: idioma.trans_eb29 });
                    getpublica_edit(paramsURL_publi_edit);
                } else {
                    $('.modal-talla-color').val("");
                    $('#modal-talla-color').modal('hide');
                    $('#content-colors').addClass('d-none');
                    presentAlertObject({ icon: 'error', text: idioma.trans_eb30 });
                    getpublica_edit(paramsURL_publi_edit);
                    resolve(null);
                }
            }).fail((err) => {
                $('.aceptar_talla_color').attr('disabled',false);
                presentAlertObject({ icon: 'error', text: idioma.trans_04 });
                // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
                reject(null);
            });
        });
    } else {
        presentAlertObject({ icon: 'error', text: idioma.trans_eb19 });
    }

}
function add_new_size(key) {
    $(".add_new_size" + key).removeClass('d-none');
    $(".options_add_new_size" + key).removeClass('d-none');
}
function save_new_size(key) {
    let talla_nueva = {
        id_talla: $('.nombre_talla' + key).val(),
        // id_pair: null,
        cantidad: $('.cantidad' + key).val(),
        nombre_en: $('.nombre_talla' + key + ' option:selected').text(),
        nombre_es: $('.nombre_talla' + key + ' option:selected').text(),
        sku: $('.sku' + key).val(),
    };
    tallaXcolorXproducto[key].tallas.push(talla_nueva);
    ObjectEditarTalla.data.coloresXtallas = tallaXcolorXproducto;
    chargeTallaColor();
}

var colores_ventas = null;
var tallas_ventas = null;
var paginas_colores = null;
var ya_elegidos = [];
function getColors(pag) {
    let data_url = baseurl + "/controllers/publicacion/?obtener_colores";
    if (ya_elegidos.length > 0) {
        data = {
            pag: pag,
            ya_elegidos: ya_elegidos,
        };
    } else {
        data = {
            pag: pag,
        };
    }
    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'POST',
            data: { data: { pag: pag } },
        }).done((result) => {
            if (result['status'] == 'success') {
                colores_ventas = result['data'];
                paginas_colores = result['total_paginas'];
                getTallas(pag);
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans281 });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
            reject(null);
        });
    });
}

function getTallas(pag) {
    let data_url = baseurl + "/controllers/publicacion/?obtener_tallas";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'GET',
        }).done((result) => {
            if (result['status'] == 'success') {
                tallas_ventas = result['data'];
                chargeColorsEdit(pag);
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans281 });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
            reject(null);
        });
    });
}
function chargeColorsEdit(pagina) {
    $("#div-colors-edit").html('');
    let html = '';
    let sw = false;
    for (let i = 0; i < colores_ventas.length; i++) {
        if (tallaXcolorXproducto != null) {
            Object.keys(tallaXcolorXproducto).forEach(function (key) {
                if (tallaXcolorXproducto[key].id_color == colores_ventas[i].id) {
                    sw = true;
                }
            });
        }
        if (!sw) html += `<button type="button" class="btn btn-editar btn-colrs m-2" style="width: 50px; height: 50px; background: ${colores_ventas[i].hexadecimal};" data-toggle="tooltip" onclick="addSize($(this), ${i})">
                          </button>`;
        sw = false;
    }
    let htmlContentPagination = "";
    let htmlContentItemsPagination = "";
    if (paginas_colores > 1) {
        let inicio = ((pagina - 2) > 0 ? (pagina - 2) : 1);
        let fin = ((inicio + 4) < paginas_colores ? (inicio + 4) : paginas_colores);
        if (fin == paginas_colores) {
            inicio = ((pagina - 4) > 0 ? (pagina - 4) : 1);
        }
        for (let index = inicio; index <= fin; ++index) {

            htmlContentItemsPagination += `<a onclick="cambiarPagColors( ${index} )" class="${(index == pagina ? 'active' : '')}">${index}</a>`;
        }
        let btnPrev = "";
        if (pagina - 1 > 1) {
            let pag = pagina - 1;
            btnPrev = `<a onclick="cambiarPagColors( ${pag} )" class="AD">&laquo;</a>`;
        }
        let btnNext = "";
        if (pagina + 1 < paginas_colores) {
            let pag = pagina + 1;
            btnNext = `<a onclick="cambiarPagColors( ${pag} )" class="AD">&raquo;</a>`;
        }
        let htmlPuntosIndexFin = "";
        if (fin < paginas_colores) {
            htmlContentItemsPagination += `<a> ... </a>`;

            let pag = paginas_colores;
            htmlContentItemsPagination += `<a onclick="cambiarPagColors( ${paginas_colores} )" class="AD">${paginas_colores}</a>`;
        }
        htmlContentPagination +=
            `<div class="col-12">
                <div class="pagination pagination_list">
                    `+ btnPrev + `
                    `+ htmlContentItemsPagination + `
                    `+ btnNext + `
                </div>
            </div>`;
    } else {
    }

    $(".paginacion_colores").html(htmlContentPagination);
    $("#div-colors-edit").html(html);
}
function cambiarPagColors(pag) {
    getColors(pag);
}
function addMoreColors() {
    $("#div-colors-edit").removeClass('d-none');
}
function addSize(key, color) {
    $("#div-talla-edit").html('');
    $(".btn-editar").removeClass('select-color-edit');
    key.addClass('select-color-edit');
    $("#content-tallas").removeClass('d-none');
    let html = `<select name="" id="nueva-talla-color" class="custom-select w-50">`;
    if (localLenguaje == 'ES') {
        for (let i = 0; i < tallas_ventas.length; i++) {
            html += `<option value="${i}">${tallas_ventas[i].nombre_es}</option>`;
        }
    } else if (localLenguaje == 'EN') {
        for (let i = 0; i < tallas_ventas.length; i++) {
            html += `<option value="${i}">${tallas_ventas[i].nombre_en}</option>`;
        }
    }

    html += `</select>
                <div class="div-buttons-talla">
                    <a href="#" class="btn" onclick="chargeTallaColor()">
                        <button class="btn-cancell-talla">${idioma.trans_eb42} <i class="fas fa-ban add-talla"></i></button>
                    </a>
                    <a href="#" onclick="saveNewColor(${color}, $('#nueva-talla-color').val())" class="btn">
                        <button class="btn-save-talla">${idioma.trans_243} <i class="fa fa-save add-talla"></i></button>
                    </a>
                </div>`;

    $("#div-talla-edit").html(html);
}
function saveNewColor(id, size) {
    let color = {
        id_color: colores_ventas[id].id,
        nombre_en: colores_ventas[id].nombre_en,
        nombre_es: colores_ventas[id].nombre_es,
        hexadecimal: colores_ventas[id].hexadecimal,
        tallas: [
            {
                cantidad: null,
                id_talla: tallas_ventas[size].id,
                nombre_en: tallas_ventas[size].nombre_en,
                nombre_es: tallas_ventas[size].nombre_es,
                sku: '',
            },
        ],
    };
    ya_elegidos.push(color.hexadecimal);
    tallaXcolorXproducto.push(color);
    ObjectEditarTalla.data.id_producto = paramsURL_publi_edit;
    ObjectEditarTalla.data.coloresXtallas = tallaXcolorXproducto;
    $("#div-talla-edit").html('');
    $(".btn-editar").removeClass('select-color-edit');
    $("#content-tallas").addClass('d-none');
    $("#content-colors").addClass('d-none');
    $("#div-colors-edit").html('');
    getColors(1);
    chargeTallaColor();
}
function valid_ObjectEdit() {
    for (let i = 0; i < tallaXcolorXproducto.length; i++) {
        if (!tallaXcolorXproducto[i].eliminar_color) {
            for (let j = 0; j < tallaXcolorXproducto[i].tallas.length; j++) {
                if ((tallaXcolorXproducto[i].tallas[j].cantidad * 1) <= 0) return false;
            }
        }
    }
    return true;
}
function deleteColorEdit(key) {
    tallaXcolorXproducto[key].eliminar_color = true;
    chargeTallaColor();
}
function deleteSizeEdit(key, key1) {
    tallaXcolorXproducto[key].tallas[key1].eliminar_pair = true;
    chargeTallaColor();
}
function saveNewColorPickerEdit() {
    if ($('.color-picker').val() != '' && $('.nombre_es_picker').val() != '' && $('.nombre_en_picker-picker').val() != '') {
        let data = {
            nombre_es: $('.nombre_es_picker').val(),
            nombre_en: $('.nombre_en_picker').val(),
            nombre_corto: '',
            hexadecimal: $('.color-picker').val(),
        }
        console.log(data);

        let data_url = baseurl + "/controllers/publicacion/?crear_color";
        return new Promise((resolve, reject) => {
            $.ajax({
                url: data_url,
                type: 'POST',
                data: { data: data },
            }).done((result) => {
                if (result['status'] == 'success') {
                    getColors(1);
                    $(".btn-cancel-create").click();
                    presentAlertObject({ icon: 'success', text: idioma.trans_eb39 });
                } else if (result['status'] == 'yaExiste') {
                    presentAlertObject({ icon: 'success', text: idioma.trans_eb40 });
                } else {
                    presentAlertObject({ icon: 'success', text: idioma.trans_eb41 });
                }
            }).fail((err) => {
                presentAlertObject({ icon: 'error', text: idioma.trans281 });
                // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
                reject(null);
            });
        });
    } else {
        presentAlertObject({ icon: 'error', text: idioma.trans_eb35 });
    }
}