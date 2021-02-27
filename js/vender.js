let datosproductos = null;
// let esPrecioPorcentajeAceptable = false;
let montoMinimoPublicarMonedaLocal;
let maximoPorcentajeAceptable;
let symbolMonedaLocal;
let montoMinimoPublicarMonedaLocalMask;
let direccionesUsuario = [],
    direccionActiva = null,
    ticketsUsuario = [],
    tiposProdutos = [],
    condicionProducto = [],
    exposicionProducto = [],
    envioProducto = [],
    unidadDistancia = [],
    unidadPeso = [],
    primerintento = false,
    validar_si_3_ventas = null;
let color;
let colores = {
    azul: "blue",
    rojo: "red",
    verde: "green",
    negro: "black",
    blanco: "white",
    naranja: "orange",
    rosado: "pink"
}

$(document).ready(e => {
    cargarDatosValidacion();
    $('.img_portada_video').prop("disabled", true);
    $('.__uploadfoto_img_video').prop("disabled", true);
    $('.div_contenedor_img_video').hide();

    $(".confirmar_felicidades").click(($event) => {
        btn_aceptar_modal_felicitaciones();
    });
    $(".confirmar_revision").click(($event) => {
        btn_aceptar_modal_revision();
    });


    $(".cierre_modal_felicitaciones").click(($event) => {
        loadPage('index.php?s=0')
    });

    $(".cierre_modal_revision").click(($event) => {
        loadPage('index.php?s=0')
    });

    $(".__uploadfoto_img_video").change(($event) => {
        convertBase64_portadavideo($event, ".img_portada_video", ".__uploadfoto_img_video");
    });

    $(".__precio").on("focusout", function () {
        precioPorcentajeAceptable();
    });

    $(".__porcentajeofer").on("focusout", function () {
        precioPorcentajeAceptable();
        removerExposicion();
    });
    $(".btn-view-picker").click(function () {
        $(".div-picker-color").removeClass('d-none');
        $(".btn-picker").addClass('d-none');
    });
    $(".btn-no-view-picker").click(function () {
        $(".color-picker").val('');
        $(".nombre_en_picker").val('');
        $(".nombre_es_picker").val('');
        $(".div-picker-color").addClass('d-none');
        $(".btn-picker").removeClass('d-none');
    });
    $(".btn-save-view-picker").click(function () {
        saveNewColorPicker();
    });

    $('.__condicionesproducto').on('click','#garantia1_yes',function(e){
        // $('#elegir_condicion_1').click();
        let data = { data:{condicion: condicionProducto[0] }};
        activarCondicionProducto(data);
        $('.card-condicion').removeClass('activo');
        $('.__card1').addClass('activo');
        [2,3].forEach(element => {
            $(`#garantia${element}_yes`).prop('checked', false);
        });
        $(`#garantia1_yes`).prop('checked', true);

        
    });

    $('.__condicionesproducto').on('click','#garantia1_no',function(e){
        // $('#elegir_condicion_1').click();
        let data = { data:{condicion: condicionProducto[0] }};
        activarCondicionProducto(data);
        $('.card-condicion').removeClass('activo');
        $('.__card1').addClass('activo');
        [2,3].forEach(element => {
            $(`#garantia${element}_yes`).prop('checked', false);
        });
        $(`#garantia1_no`).prop('checked', true);
    });

    $('.__condicionesproducto').on('click','#garantia2_yes',function(e){
        // $('#elegir_condicion_2').click();
        let data = { data:{condicion: condicionProducto[1] }};
        activarCondicionProducto(data);
        $('.card-condicion').removeClass('activo');
        $('.__card2').addClass('activo');
        [1,3].forEach(element => {
            $(`#garantia${element}_yes`).prop('checked', false);
        });
        $(`#garantia2_yes`).prop('checked', true);
    });
    $('.__condicionesproducto').on('click','#garantia2_no',function(e){
        // $('#elegir_condicion_2').click();
        let data = { data:{condicion: condicionProducto[1] }};
        activarCondicionProducto(data);
        $('.card-condicion').removeClass('activo');
        $('.__card2').addClass('activo');
        [1,3].forEach(element => {
            $(`#garantia${element}_yes`).prop('checked', false);
        });
        $(`#garantia2_no`).prop('checked', true);
    });

    $('.__condicionesproducto').on('click','#garantia3_yes',function(e){
        // c$('#elegir_condicion_3').click();
        let data = { data:{condicion: condicionProducto[2] }}
        activarCondicionProducto(data);
        $('.card-condicion').removeClass('activo');
        $('.__card3').addClass('activo');
        [1,2].forEach(element => {
            $(`#garantia${element}_yes`).prop('checked', false);
        });
        $(`#garantia3_yes`).prop('checked', true);
    });
    $('.__condicionesproducto').on('click','#garantia3_no',function(e){
        // $('#elegir_condicion_3').click();
        let data = { data:{condicion: condicionProducto[2] }}
        activarCondicionProducto(data);
        $('.card-condicion').removeClass('activo');
        $('.__card3').addClass('activo');
        [1,2].forEach(element => {
            $(`#garantia${element}_yes`).prop('checked', false);
        });
        $(`#garantia3_no`).prop('checked', true);
    });
    

});
function validarEmpresa() {

    if (validarText(user)) {
        if (user.empresa == 1 && user.estado == 0) {
            $("#modal-empresa-validar").modal('toggle');
            $(".btn_aceptar_validado").off()
            $(".btn_aceptar_validado").on('click', redirigir)
        }
    } else {
        loadPage("registro.php")
    }

}
function redirigir() {
    loadPage("productos-empresa.php?empresa=" + user.id)

}


function cargarArrays() {
    primerintento = false;
    datosproductos = {
        uid: user.uid,
        tiene_colores_tallas: false,
        empresa: user.empresa,
        tipo: 0,
        producto: '',
        marca: '',
        modelo: '',
        titulo: '',
        descripcion: '',
        categoria: null,
        subcategoria: null,
        condicion_producto: 0,
        garantia: 0,
        cantidad: 0,
        moneda_local: '',
        iso_code_2: '',
        precio: 0,
        precio_usd: 0,
        oferta: 0,
        porcentaje_oferta: 0,
        porcentaje_tax: 0,
        exposicion: 0,
        cantidad_exposicion: 0,
        envio: 0,
        direccion_envio: {
            pais: 0,
            departamento: 0,
            ciudad: '',
            latitud: 0,
            longitud: 0,
            codigo_postal: 0,
            direccion: ''
        },
        detalle_envio: {
            largo: 0,
            ancho: 0,
            alto: 0,
            unidad_distancia: '',
            peso: 0,
            unidad_masa: ''
        },
        subasta: {
            moneda: '',
            cantidad: 0,
            precio: 0,
            precio_usd: 0,
            tipo: 0,
            activo: 0
        },
        fotos_producto: [],
        url_video: null,
        genero: 3,
        coloresXtallas: []
    }

    tiposProdutos = [
        { id: 1, nombre: idioma.trans1, img: '../imagen/vender/productos.png' },
        { id: 2, nombre: idioma.trans2, img: '../imagen/vender/vehiculos.png' },
        // { id: 3, nombre: idioma.trans3, img: '../imagen/vender/inmuebles.png' }
    ];
    condicionProducto = [
        { id: 1, nombre: idioma.trans4, img: '../imagen/vender/productos.png' },
        { id: 2, nombre: idioma.trans5, img: '../imagen/vender/vehiculos.png' },
        { id: 3, nombre: idioma.trans6, img: '../imagen/vender/inmuebles.png' }
    ];
    exposicionProducto = [
        { id: 1, nombre: idioma.trans196_, img: '../imagen/public-venta/gratuita.png', descripcion: idioma.trans199_, link_text: idioma.trans200_, link: '' },
        { id: 2, nombre: idioma.trans197_, img: '../imagen/public-venta/promocionada.png', descripcion: idioma.trans201_, link_text: idioma.trans202_, link: '' },
        { id: 3, nombre: idioma.trans198_, img: '../imagen/public-venta/subasta.png', descripcion: idioma.trans203_, link_text: idioma.trans204_, link: '' }
    ];
    envioProducto = [
        { id: 1, nombre: idioma._trans205, descripcion: idioma.trans153, img: '../imagen/public-venta/envio-pais.png' },
        { id: 2, nombre: idioma._trans206, descripcion: idioma.trans154, img: '../imagen/public-venta/envio-vendedor.png' },
        { id: 3, nombre: idioma._trans207, descripcion: idioma.trans155, img: '../imagen/public-venta/acuerdo.png' }
    ];
    unidadDistancia = [
        { id: 'cm', nombre: idioma.trans9 },
        { id: 'in', nombre: idioma.trans10 }
    ];
    unidadPeso = [
        { id: 'kg', nombre: idioma.trans11 },
        { id: 'lb', nombre: idioma.trans12 }
    ];

    categoriasProductos = [];
    $.getJSON('../json/categorias_ES.json', function (data) {
        categoriasProductos = data;
    });

    //$('.__unidadDistancia').selectpicker('destroy');
    $('.content_unidades').empty();
    $(".content_unidades").html(`<select class="form-control __unidadDistancia select-plataforma"></select>`)

    let htmloptionsdistancia = `<option value="0">${idioma.trans207_}</option>`;
    for (const distancia of unidadDistancia) {
        htmloptionsdistancia += `<option value="${distancia.id}">${distancia.nombre}</option>`;
    }

    $('.__unidadDistancia').html(htmloptionsdistancia);
    $('.__unidadDistancia').selectpicker({
        size: 7,
        dropupAuto: false,
    });
    $('.__unidadDistancia').off('changed.bs.select');
    $('.__unidadDistancia').on('changed.bs.select', llenarUnidadPeso);



}
//comentario
function prepararVender() {
    // $('.__tiposProdutos').empty();
    // let textdispo = '';
    // for (const x in tiposProdutos) {
    //     if(x > 0) textdispo = idioma.trans167;
    //     $('.__tiposProdutos').append(`
    //     <div class="card-cat __cardselect">
    //         <img src="${tiposProdutos[x].img}">
    //         <p>${tiposProdutos[x].nombre}</p>
    //         <p>${textdispo}</p>
    //     </div>
    //     `);
    //     $('.__cardselect').eq(x).off('click');
    //     $('.__cardselect').eq(x).on('click', { tipo: tiposProdutos[x] }, activarTipoProducto);
    // }
    $('.__nexttipo1').off('click');
    $('.__nexttipo1').on('click', nextTipoArticulo);

    $('.__nexttipo1').click();


    $('.__nexttipo2').off('click');
    $('.__nexttipo2').on('click', nextTipoArticulo2);

    $('.__nexttipo3').off('click');
    $('.__nexttipo3').on('click', nextTipoArticulo3);

    $('.__publicar').off('click');
    $('.__publicar').on('click', publicar);




    $('.__backtipo2').off('click');
    $('.__backtipo2').on('click', backTipoArt2);

    $('.__backtipo3').off('click');
    $('.__backtipo3').on('click', backTipoArt3);

    $('.__backtipo4').off('click');
    $('.__backtipo4').on('click', backTipoArt4);
}
function backTipoArt2() {
    $('.steps').addClass('d-none');
    $('.__step0').removeClass('d-none');
    $('html, body').animate({ scrollTop: 0 }, 'slow');

}
function backTipoArt3() {
    datosproductos.garantia = $('input[name=garantia]:checked').val();
    $('.steps').addClass('d-none');
    $('.__step1').removeClass('d-none');
    $('html, body').animate({ scrollTop: 0 }, 'slow');

}
function backTipoArt4(params) {
    $('.steps').addClass('d-none');
    $('.__step2').removeClass('d-none');
    $('html, body').animate({ scrollTop: 0 }, 'slow');

}

function activarTipoProducto(e) {
    //Se fijo en 1 mientras 22
    if (parseFloat(e.data.tipo.id) > 1) return 0;
    $('.__cardselect').removeClass('activo');
    let tipo = e.data.tipo;
    $(e.currentTarget).addClass('activo');
    datosproductos.tipo = tipo.id;
    console.log('datosproductos.tipo', datosproductos.tipo);
}

function nextTipoArticulo() {
    datosproductos.tipo = 1;
    if (!validarText(datosproductos.tipo)) return presentAlertObject({ icon: 'error', text: idioma.trans108_ });
    $('.steps').addClass('d-none');
    $('.__step1').removeClass('d-none');
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return 0;
}

function agregarTalla() {
    console.log("Se agrego talla");
}

function color_already_set(colores, color) {
    let i = 0;
    while (i < colores.length) {
        if (colores[i].hasOwnProperty(color)) {
            return true;
        }
        i = i + 1;
    }
    return false;
}

function nextTipoArticulo2() {
    let producto = $('.__producto').val(),
        marca = $('.__marca').val(),
        modelo = $('.__modelo').val(),
        titulo = $('.__titulo').val(),
        descripcion = $('.__descripcion').val();

    if (!validarText(producto)) return presentAlertObject({ icon: 'error', text: idioma.trans127_ });
    if (!validarText(marca)) return presentAlertObject({ icon: 'error', text: idioma.trans128_ });
    if (!validarText(modelo)) return presentAlertObject({ icon: 'error', text: idioma.trans129_ });
    if (!validarText(titulo)) return presentAlertObject({ icon: 'error', text: idioma.trans130_ });
    if (!validarText(descripcion)) return presentAlertObject({ icon: 'error', text: idioma.trans131_ });

    datosproductos.producto = producto;
    datosproductos.marca = marca;
    datosproductos.modelo = modelo;
    datosproductos.titulo = titulo;
    datosproductos.descripcion = descripcion;

    $('.steps').addClass('d-none');
    $('.__step2').removeClass('d-none');

    $('.__cantidad').off('change');
    $('.__cantidad').on('change', e => {
        datosproductos.cantidad = devolverNumero(e.target.value);
        // removerExposicion();
    });

    $('.__viewinsertarvideo').off('click');
    $('.__viewinsertarvideo').on('click', e => {
        console.log('y por eso ');
        $('.__viewinsertarvideo').toggleClass('d-none');
        $('.__cardvideo').toggleClass('d-none');
    });

    // $('.__urlvideo').off('change');
    // $('.__urlvideo').on('change', e => {
    //     datosproductos.url_video = e.target.value;
    // });

    $('.__urlvideo').off('blur');
    $('.__urlvideo').on('blur', e => {
        blur_input_video(e.target.value);
    });
    $('.hombre_check').off();
    $('.hombre_check').on('click', function () {
        console.log("evento1");
        $('.mujer_check').prop('checked', false);
        $('.all_gender').prop('checked', false);
        datosproductos.genero = 1;
    });

    $('.mujer_check').off();
    $('.mujer_check').on('click', function () {
        console.log("evento2");
        $('.hombre_check').prop('checked', false);
        $('.all_gender').prop('checked', false);
        datosproductos.genero = 2;
    });
    $('.all_gender').prop('checked', true);
    $('.all_gender').off();
    $('.all_gender').on('click', function () {
        console.log("evento3");
        $('.hombre_check').prop('checked', false);
        $('.mujer_check').prop('checked', false);
        datosproductos.genero = 3;
    });
    $('#div_elegir_color').off();
    $('#div_elegir_color').on('click', function () {
        color = $('#color_input').val();
        if (colores[color] && !color_already_set(datosproductos.coloresXtallas, color)) {
            const chipColor = `
                <div class="div-color">
                    <div class="span-color" style="background-color: ${colores[color.toLowerCase()]};"></div> 
                    <span id="color">${color}</span> 
                    <span class="icon-color">&times;</span>
                </div>
            `
            const chipColorTalla = `  
                <div class="div-color div-elegir div_elegir_talla">
                    Elegir talla 
                    <span class="close-elegir icon-color">&plus;</span>
                </div>
            `
            $('#color_container').prepend(chipColor);
            $('#talla_container').append(chipColor);
            $('#talla_container').append(chipColorTalla);
            datosproductos.coloresXtallas.push({ [color]: [] });

            // $('#talla_container').on('click',`#${color}`,function(){
            //     console.log("se dio click en el color: ",color);
            // });
        }
    });

    $('#talla_container').off();
    $('#talla_container').on('click', `.div_elegir_talla`, function (e) {
        let talla = $('#talla_input').val();
        if (color) {
            const chipTalla = `
                <div class="div-color">${talla.toUpperCase()} <span class="close">&times;</span></div>
            `;
            const addButton = $(e.target);
            $(addButton).closest('.div_elegir_talla').before(chipTalla);
            console.log(`se agregara la talla ${talla} a el color ${color}`);
        }
    });

    llenarCategorias();
    llenarCodicionProducto();
    llenarFotos();

    datosproductos.cantidad = $('.__cantidad').val();
    $('html, body').animate({ scrollTop: 0 }, 'slow');

    return 0;
}

function getDireccionesUsuario() {
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
            direccionActiva = direccionesUsuario.filter(data => data.activa == 1)[0];
            $('.__pais').val(direccionActiva.pais.pais_name);
            $('.__departamento').val(direccionActiva.departamento.name);
            $('.__ciudad').val(direccionActiva.ciudad);
            $('.__direccion').val(direccionActiva.direccion);
            $('.__zip').val(direccionActiva.codigo_postal);
            $('.__vermisdirecciones').html(idioma.trans13);
            $('.__vermisdirecciones').on('click', abrirDirecciones);
            llenarDirecciones();
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                $('.__vermisdirecciones').html(idioma.trans14);
                $('.__vermisdirecciones').on('click', crearDireccion);
            }

        }

    }).fail((err) => {
        presentAlertObject({ icon: 'error', text: idioma.trans78 });
    });
}

function abrirDirecciones() {
    if (direccionesUsuario.length <= 0) return 0;
    if (direccionesUsuario.length >= 3) {
        $('.title-direcciones').hide();
    } else {
        $('.title-direcciones').show();
    }
    $('#modal-direcciones').modal('show');
    llenarDirecciones();
}

function llenarDirecciones() {
    if (direccionesUsuario.length <= 0) return 0;
    $('.__alldirecciones').empty();
    let activa, butonActivar = false;

    for (const x in direccionesUsuario) {
        activa = direccionesUsuario[x].activa == 1 ? `<span class="text-primary">${idioma.trans21}</span>` : `<span class="text-secondary">${idioma.trans22}</span>`;
        butonActivar = direccionesUsuario[x].activa == 1 ? `<a href="#" class="card-link __diruser activadaclase">${idioma.trans265}</a>` : `<a href="#" class="card-link __diruser">${idioma.trans31}</a>`;
        $('.__alldirecciones').append(`
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${idioma.trans18}</h5>
                        <p class="card-text text-modal-direcciones">${idioma.trans15}: <span>${direccionesUsuario[x].pais.pais_name}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans16}: <span>${direccionesUsuario[x].departamento.name}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans17}: <span>${direccionesUsuario[x].ciudad}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans18}: <span>${direccionesUsuario[x].direccion}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans19}: <span>${direccionesUsuario[x].codigo_postal}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans20}: <span>${activa}</span></p>
                        ${butonActivar}
                    </div>
                </div>
            </div>
        `);
        $('.__diruser').eq(x).off('click');
        $('.__diruser').eq(x).on('click', { direccion: direccionesUsuario[x] }, activardireccion);
    }

}

function activardireccion(e) {
    const direccion = e.data.direccion;
    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            id: direccion.id
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
        if (res.status != 'success') {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) return presentAlertObject({ icon: 'error', text: idioma.trans51_ });
        }
        getDireccionesUsuario();
    }).fail((err) => {
        return presentAlertObject({ icon: 'error', text: idioma.trans51_ });
    });
}

function crearDireccion() {
    if (direccionesUsuario.length >= 3) return 0;
    $('.__ciudadnewdireccion').val('');
    $('.__dirnewdireccion').val('');
    $('.__codigopostalnewdireccion').val('');

    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    $('.__paisnewdireccion').val(paisusuario.pais_name).prop('disabled', true);
    cityInput(paisusuario, '__ciudadnewdireccion');
    $('.__divdepnewdireccion').html(`
        <select class="form-control __depnewdireccion select-plataforma"></select>
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

    console.log(
        'pais', pais,
        'estado', estado,
        'ciudad', ciudad,
        'direccion', direccion,
    );
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
                console.log('postal_code', postal_code);
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

    if (!validarText(paisusuario)) return presentAlertObject({ icon: 'error', text: idioma.trans55_ });
    if (!validarNumero(departamento)) return presentAlertObject({ icon: 'error', text: idioma.trans56_ });
    if (!validarText(ciudad)) return presentAlertObject({ icon: 'error', text: idioma.trans57_ });
    if (!validarText(autocomplete)) return presentAlertObject({ icon: 'error', text: idioma.trans57_ });
    if (!validarText(direccion)) return presentAlertObject({ icon: 'error', text: idioma.trans58_ });
    if (!validarText(codigopostal)) return presentAlertObject({ icon: 'error', text: idioma.trans59_ });

    departamento = paisusuario.departamento.filter(datos => datos.zone_id == departamento)[0];
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
    agregar_loading_ge_publi(".__save_detalles_envio");
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/direcciones/?crear`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        quitar_loading_ge_publi(".__save_detalles_envio");
        console.log('res', res);
        $('#modal-direcciones-crear').modal('hide');
        getDireccionesUsuario();
        if (res.status == 'success') {
            presentAlertObject({ icon: 'success', text: idioma['trans_187'] });
        } else if (res.status == 'maxDirecciones') {
            presentAlertObject({ icon: 'warning', text: idioma['trans54_'] });
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) presentAlertObject({ icon: 'error', text: idioma['trans132_'] });

        }
    }).fail((err) => {
        quitar_loading_ge_publi(".__save_detalles_envio");
        $('#modal-direcciones-crear').modal('hide');
        presentAlertObject({ icon: 'error', text: idioma['trans132_'] });
    });
}

function getTicketsUsuario() {
    //Cambio el wbs, y se implemenetó
    console.log('user', user);
    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            tipo: 'all',
            uso: 1,
            group: 1
        }
    }
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/planes_nasbi/?tickets_usuario`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        console.log('res', res);
        if (res.status == 'success') {
            ticketsUsuario = res.data;
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) { }
        }
    }).fail((err) => {
        presentAlertObject({ icon: 'error', text: idioma.trans133_ });
    });
}

function llenarCategorias() {
    $('.__divcategoria').html(`<select class="form-control __categoria select-plataforma"></select>`);
    let htmloptionscategorias = ""
    // htmloptionscategorias = `<option value="0">${idioma.trans205_}</option>`;
    for (const cat of categoriasJSON) {
        if (!validarText(cat.CategoryID)) {
            htmloptionscategorias += `<option disabled selected value="${cat.CategoryID}">${cat.CategoryName}</option>`;
        } else {
            htmloptionscategorias += `<option value="${cat.CategoryID}">${cat.CategoryName}</option>`;
        }

    }
    $('.__categoria').html(htmloptionscategorias);
    $('.__categoria').off('changed.bs.select');
    $('.__categoria').on('changed.bs.select', llenarSubCategorias);
    $('.__categoria').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false
    });


    if (validarText(datosproductos.categoria)) {
        $('.__categoria').val(datosproductos.categoria.CategoryID);
        $('.__categoria').selectpicker('refresh');
    }

}

function llenarSubCategorias(e) {

    let cat = $(e.target).val();
    $('.__divsubcategoria').html(`<select class="form-control select-plataforma __subcategoria"></select>`);
    $('.__subcategoria').empty();
    let htmloptionssubcategorias = `<option value="0">${idioma.trans206_}</option>`;
    $('.__subcategoria').html(htmloptionssubcategorias);
    $('.__subcategoria').off('changed.bs.select');

    if (!validarText(cat)) {
        datosproductos.subcategoria = null;
        datosproductos.categoria = null;
        return;
    }

    const newcat = categoriasJSON.filter((datos) => parseFloat(datos.CategoryID) == parseFloat(cat)),
        subcategorias = newcat[0].subCategoria;
    datosproductos.categoria = newcat[0];

    for (const subcat of subcategorias) {
        htmloptionssubcategorias += `<option value="${subcat.CategoryID}">${subcat.CategoryName}</option>`;
    }
    $('.__subcategoria').html(htmloptionssubcategorias);
    $('.__subcategoria').off('changed.bs.select');
    $('.__subcategoria').on('changed.bs.select', activarSubCategorias);
    $('.__subcategoria').selectpicker({
        dropupAuto: false,
        size: 7,
        liveSearch: true
    });
}

function activarSubCategorias(e) {
    if (!validarText($(e.target).val())) return datosproductos.subcategoria = null;

    let subcat = $(e.target).val(),
        newsubcat = datosproductos.categoria.subCategoria.filter((datos) => parseFloat(datos.CategoryID) == parseFloat(subcat));
    datosproductos.subcategoria = newsubcat[0];
}

function llenarCodicionProducto() {
    $('.__condicionesproducto').empty();
    for (const x in condicionProducto) {
        const condicion = condicionProducto[x];
        $('.__condicionesproducto').append(`
            <div class="col-md-4 card-condicion __card${condicion.id}">
                <h5>${condicion.nombre}</h5>
                <p>${idioma.trans176_}
                    <span class="span1"><input type="radio" name="garantia" value="1" id="garantia${condicion.id}_yes">${idioma.trans24_}</span>
                    <span><input type="radio" name="garantia" value="0" id="garantia${condicion.id}_no">${idioma.trans25_}</span>
                </p>
                <button class="__selectcondicionproducto" id=elegir_condicion_${condicion.id}>${idioma.trans193_}</button>
            </div>
        `);
        $('.__selectcondicionproducto').eq(x).off('click');
        $('.__selectcondicionproducto').eq(x).on('click', { condicion: condicionProducto[x] }, activarCondicionProducto);
    }

    console.log(datosproductos.condicion_producto, datosproductos.garantia, "caaaaaards de garantiaaaaaa");
    if (datosproductos.condicion_producto == 0 && datosproductos.garantia == 0) {
        $(`#garantia${condicionProducto[0].id}_yes`).prop('checked', true);
        $('.card-condicion').removeClass('activo');
        $('.__card' + condicionProducto[0].id).addClass('activo');
        datosproductos.condicion_producto = condicionProducto[0].id;
        datosproductos.garantia = 1;
    } else {
        let data_de_activar_pre = { id: datosproductos.condicion_producto, garantia: datosproductos.garantia };
        activarCondicionProducto(data_de_activar_pre, "1")
    }


}

function activarCondicionProducto(e, id = "") {
    console.log("ACTIVAR CONDICION");
    if (id == "1") {
        let data_pre_con = e;
        $('.card-condicion').removeClass('activo');
        $('.__card' + data_pre_con.id).addClass('activo');
        if (data_pre_con.garantia == 1) {
            $(`#garantia${data_pre_con.id}_yes`).prop('checked', true);
        } else {
            $(`#garantia${data_pre_con.id}_no`).prop('checked', true);
        }
    } else {
        console.log("else ACTIVAR CONDICION");
        let condicion = e.data.condicion;
        $('.card-condicion').removeClass('activo');
        $('.__card' + condicion.id).addClass('activo');
        $(`#garantia${condicion.id}_yes`).prop('checked', true);
        datosproductos.condicion_producto = condicion.id;
    }
}

function llenarFotos() {
    if (datosproductos.fotos_producto.length <= 0) {
        let hidde_foto = ``;
        $('.__divfotos').empty();
        for (let i = 0; i < 10; i++) {
            let texto;
            if (i == 0) {
                hidde_foto = ``;
                texto = idioma.trans415_
            } else {
                texto = idioma.trans416_
                hidde_foto = `element_oculto_vender`; //ESTA CLASE ESTA EN EL CSS
                // if(i==1){
                //     hidde_foto=``; 
                // }
            }
            $('.__divfotos').append(`
                <label class="content-img contenedor_img_vender${i} ${hidde_foto}" >
                    <img src="../imagen/vacio-vender.png" class="img-produ __imgfoto${i}">
                    <input type="file" class="form-control d-none __uploadfoto" accept="image/*">
                    <span class="text-photo">${texto}</span>
                </label>

        `);
            $('.__uploadfoto').eq(i).off('change');
            $('.__uploadfoto').eq(i).on('change', { id: i }, convertBase64);
        }

    }

}

function convertBase64(e) {
    let id = e.data.id;
    $('.contenedor_img_vender' + (id + 1)).removeClass("element_oculto_vender");
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
                    $('.__imgfoto' + id).prop('src', img);
                    if (datosproductos.fotos_producto.length > 0) {
                        let index = datosproductos.fotos_producto.map((item) => item.id).indexOf(id);
                        if (index < 0) return datosproductos.fotos_producto.push({ id, img });
                        datosproductos.fotos_producto.splice(index, 1);
                    }

                    datosproductos.fotos_producto.push({ id, img });
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


async function nextTipoArticulo3() {
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    agregar_texto_de_rango_subasta(paisusuario.iso_code_2);
    // getTicketsUsuario(); //para llenar la variable global de tocket
    if (!validarText(datosproductos.categoria)) return presentAlertObject({ icon: 'error', text: idioma.trans134_ });
    if (!validarText(datosproductos.subcategoria)) return presentAlertObject({ icon: 'error', text: idioma.trans135_ });
    if (!validarText(datosproductos.condicion_producto)) return presentAlertObject({ icon: 'error', text: idioma.trans136_ });
    if ($('input[name=garantia]:checked').val() === undefined || $('input[name=garantia]:checked').val() == null) return presentAlertObject({ icon: 'error', text: idioma.trans137_ });
    if (datosproductos.fotos_producto.length <= 0) return presentAlertObject({ icon: 'error', text: idioma.trans138_ });
    if (!validarColores(datosproductos.tiene_colores_tallas, datosproductos.coloresXtallas)) return presentAlertObject({ icon: 'error', text: idioma.trans_eb17 });
    if (!validarTieneTalla(datosproductos.tiene_colores_tallas, datosproductos.coloresXtallas)) return presentAlertObject({ icon: 'error', text: idioma.trans_eb18 });
    if (!validaTallaTieneCantidad(datosproductos.tiene_colores_tallas, datosproductos.coloresXtallas)) return presentAlertObject({ icon: 'error', text: idioma.trans139_ });
    if (!datosproductos.tiene_colores_tallas) if (!validarText($('#cantidad_no_talla').val())) return presentAlertObject({ icon: 'error', text: idioma.trans_eb19 });

    /*campos de video*/
    let respuesta_validacion_video = await validar_opciones_de_video();
    if (respuesta_validacion_video.respuesta) { return presentAlertObject({ icon: 'error', text: idioma[respuesta_validacion_video.idioma] }); };
    //fin validaciones video

    if (datosproductos.tiene_colores_tallas) datosproductos.cantidad = sumarCantidades(datosproductos.coloresXtallas);
    else datosproductos.cantidad = $('#cantidad_no_talla').val();

    $('.steps').addClass('d-none');
    $('.__step3').removeClass('d-none');
    llenarExpoProducto();
    $('.__subastar_producto').off('click');
    $('.__subastar_producto').on('click', valiadarSubasta);


    $('input[name="oferta"]').off('change');
    $('input[name="oferta"]').on('change', e => {
        removerExposicion();
        datosproductos.oferta = e.target.value;
        datosproductos.porcentaje_oferta = 0;
        console.log('cambio el input', e.target.value, datosproductos.oferta);
        $('.__porcentajeofer').prop('disabled', true);
        if (e.target.value == 1) {
            $('.__porcentajeofer').prop('disabled', false);
        } else if (e.target.value == 0) {
            $('.__porcentajeofer').val(0);
            $(".__porcentajeofer").prop('disabled', true);
        }

    });
    $('.__porcentajeofer').off('change');
    $('.__porcentajeofer').on('change', e => {
        if (devolverNumero(e.target.value) > 100 || devolverNumero(e.target.value) <= 0) {
            datosproductos.porcentaje_oferta = 0;
            $('.__porcentajeofer').val(0);
            return 0;
        }
        datosproductos.porcentaje_oferta = e.target.value
    });

    $('input[name="nasbicoin"]').off('change');
    $('input[name="nasbicoin"]').on('change', e => {

        datosproductos.subasta.moneda = e.target.id;

        // datosproductos.subasta.moneda = e.target.value == 1 ? 'Nasbigold' : 'Nasbiblue';
        // console.log("select coin: ",e.target.value);
    });

    $('.__precio').off('change');
    $('.__precio').on('change', precioUser);

    $('.__cantidad__exposicion').off('change');
    $('.__cantidad__exposicion').on('change', e => {
        datosproductos.cantidad_exposicion = devolverNumero(e.target.value);
        datosproductos.subasta.cantidad = devolverNumero(e.target.value);
        datosproductos.subasta.precio_usd = datosproductos.precio_usd * datosproductos.subasta.cantidad;
    });

    //  datosproductos.oferta = $('input[name="oferta"]').val();
    datosproductos.garantia = $('input[name=garantia]:checked').val();
    llenarEnvioProducto();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return 0;
}

function precioUser(e) {
    datosproductos.precio = devolverNumero(e.target.value);
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    if (paisusuario.iso_code_2 == 'US') return datosproductos.precio_usd = datosproductos.precio;
    console.log('paisusuario', paisusuario);
    const divisa = Object.values(divisasJSON).filter(datos => validarText(datos.iso_code_2) && datos.iso_code_2 == paisusuario.iso_code_2);
    if (divisa.length <= 0) return presentAlertObject({ icon: 'error', text: idioma.trans140_ });
    datosproductos.precio_usd = parseFloat(datosproductos.precio) / parseFloat(divisa[0].costo_dolar);
    console.log('datosproductos', datosproductos.precio, datosproductos.precio_usd);
    removerExposicion();
}

function llenarExpoProducto() {
    // console.log("datosProducto: ",datosproductos);
    $('.__divexposicion').empty();
    let adicionalexpo = '';
    for (const x in exposicionProducto) {
        if (exposicionProducto[x].id == 3) {
            adicionalexpo = `
            <div class="input-group group-filtro">
                <div class="dropdown divdropdownfiltro">
                    <input type="text" class="form-control input-plataforma rounded __cantidad__exposicion" placeholder="#">
                </div>
                <div class="input-group-prepend">
                    <span class="input-group-text">de ${datosproductos.cantidad}</span>
                </div>
            </div>
            `;
            adicionalexpo = ``;
        }
        const detalleCategoria = categoriasProductos.filter((categoria) => {
            if (categoria.CategoryIDPath !== "") {
                if (categoria.CategoryID === datosproductos.categoria.CategoryID) return categoria;
            }
        });

        // console.log("detalleCategoria: ",detalleCategoria);
        // console.log("exposicion producto:[x]: ",exposicionProducto[x]);
        $('.__divexposicion').append(`
            <div class="col-lg-4 container-public __card__condicion${exposicionProducto[x].id}">
                <img src="${exposicionProducto[x].img}">
                <h5>${exposicionProducto[x].nombre}</h5>
                <p>${exposicionProducto[x].descripcion}</p>

                <p>${exposicionProducto[x].id === 2 ? `<p><a href="costo-publicacion.php" target="_blank">${idioma.trans185}: ` + detalleCategoria[0].tarifaPublicacion.clasica + "</a></p>" : ""}</p>
                <p>${exposicionProducto[x].id === 3 ? `<p><a href="costo-publicacion.php" target="_blank">${idioma.trans185}: ` + detalleCategoria[0].tarifaPublicacion.premium + "</a></p>" : ""}</p>

                <!--  <div class="cont002">
                  se oculto enlace de exposicion aqui va
                    ${adicionalexpo}
                </div>-->
                <button style="margin-top: 4px;" class="btn-eleg btn_elegi_expo${exposicionProducto[x].id}  __selectexpo">${idioma.trans193_}</button>
            </div>
        `);
        $('.__selectexpo').eq(x).off('click');
        $('.__selectexpo').eq(x).on('click', { expo: exposicionProducto[x] }, activarExpoProducto);
    }

    if (datosproductos.exposicion != 0) {
        activarExpoProducto(datosproductos.exposicion, "1")
    }

    //  <a href="${exposicionProducto[x].link}" target="_blank"><p class="enlace">${exposicionProducto[x].link_text}</p></a> enlace de las card de exposici
}

async function activarExpoProducto(e, id = "") {
    switch (id) {
        case "1":
            let data_pre_expo = e;
            $('.container-public').removeClass('activo');
            $('.__card__condicion' + data_pre_expo).addClass('activo');
            break;
        case "2":
            $('.container-public').removeClass('activo');
            $('.__card__condicion' + e).addClass('activo');
            datosproductos.exposicion = e;
            break;
        default:
            let exposicion = e.data.expo;
            if (exposicion.id == 1) {
                let res_expo_1 = await validar_si_tiene_mas_de_tres_ventas_estado_1(user, true);
                if (res_expo_1) {
                    return 0;
                }
            }
            $('.container-public').removeClass('activo');
            $('.__card__condicion' + exposicion.id).addClass('activo');
            datosproductos.exposicion = exposicion.id;
            // if (datosproductos.exposicion == 3) valiadarSubasta();
            break;
    }


    if (id == "1") {

    } else {

    }

}


function valiadarSubasta() {

    if (bloquearFullAccess(user.uid)) {
        return presentAlert("", idioma['trans_309'], "info");
    }


    getTicketsUsuario(); //para llenar la variable global de tocket
    $('.subasta_success').hide();
    $('.__infosubasta').empty();
    let subtastatext = ``;

    if (!validarNumero(datosproductos.precio)) subtastatext += `<p class="mensajes-tickets-view">${idioma.trans161_}</p>`;
    $('.__infosubasta').html(subtastatext);

    if (datosproductos.subasta.activo == 1) return removerExposicion();
    if (validarText(subtastatext)) return abrirTickets();

    datosproductos.cantidad_exposicion = 1;
    datosproductos.subasta.cantidad = 1;
    datosproductos.subasta.precio_usd = datosproductos.precio_usd * datosproductos.subasta.cantidad;

    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    agregar_loading_ge_publi(".__subastar_producto");
    const { precio, oferta, porcentaje_oferta } = datosproductos;
    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            iso_code_2: paisusuario.iso_code_2,
            precio: datosproductos.precio,
            //precio: getPrice(precio, oferta, porcentaje_oferta),
            cantidad: datosproductos.cantidad_exposicion
        }
    }
    console.log("dataEnviar precio: ", dataEnviar.data.precio);
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/publicacion/?validar_subasta`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        quitar_loading_ge_publi(".__subastar_producto");
        const ticket = res.data;
        // abrirTickets(ticket);
        let r_cuenta_contickets = await cuenta_contickets_fun();
        if (res.status == 'success') {
            if (r_cuenta_contickets || res.data.id == 6) {
                abrirTickets(ticket, 1);
                datosproductos.subasta.activo = 1;
                $('.__subastar_producto').removeClass('btn-eleg-light');
                $('.__subastar_producto').addClass('btn-eleg');
                $('.text_quiero_subastar').removeClass('d-none');
                $('.subasta_success').show('slow');

                if ($('#Nasbigold')[0].checked == true) {
                    datosproductos.subasta.moneda = 'Nasbigold';
                } else if ($('#Nasbiblue')[0].checked == true) {
                    datosproductos.subasta.moneda = 'Nasbiblue';
                }
                // datosproductos.subasta.moneda = 'Nasbigold';
                datosproductos.subasta.tipo = res.data.id;
                elegir_tipo_exposicion_premium_bloquear_demas();

                if (res.data.id == 6) {
                    $('.__infosubasta').html(`
                            <p>${idioma.trans147}: ${ticket.descripcion}</p>
                            <p>${idioma.trans148}: ${ticket.num_apostadores}</p>`
                    );
                    return;
                }
                const ticketdispo = ticketsUsuario.filter(fil => fil.plan == res.data.id);
                if (ticketdispo.length > 0) {
                    $('.__infosubasta').html(`
                            <p>${idioma.trans147}: ${ticket.descripcion}</p>
                            <img src="../imagen/nasbi-tickets/svg/Tickets-${ticket.descripcion.split(' ')[0].toLowerCase()}.svg" alt="subasta ${ticket.descripcion.split(' ')[0].toLowerCase()} - nasbi.com" class="img-subasta-producto">
                            <p>${idioma.trans148}: ${ticket.num_apostadores}</p>`
                    );
                } else {
                    $('.__infosubasta').html(`<p>${idioma.trans148}: ${ticket.descripcion}</p>`);
                }

            } else {
                // subtastatext += `<p class="mensajes-tickets-view">${idioma.trans143_}</p>`;
                abrirTickets(ticket);
                $('.__infosubasta').html(subtastatext);
                removerExposicion();
            }
        } else {
            abrirTickets(ticket);
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                if (res.status == 'errorTipoSubasta') {
                    console.log("my log THE RES: ", res);
                    let minimo = res.precio_local_rango_inferior_mask;
                    let maximo = res.precio_local_rango_superior_mask;
                    let unidad_moneda = res.code;
                    //let data= await traer_mensaje_para_modal_ticket_precio_no_vali(res); 
                    //este error puede dar por estos casos
                    //1). El monto a subastas es menor a 30 USD
                    //2. El monto a subastas es superior a 300.00 USD.
                    let mensaje_modal_ticket = idioma.trans468_.split("$a").join(minimo).split("$b").join(unidad_moneda).split("$c").join(maximo).split("$d").join(unidad_moneda)
                    subtastatext += `<p class="mensajes-tickets-view">${mensaje_modal_ticket}</p>`;
                }

            }


            $('.__infosubasta').html(subtastatext);
            removerExposicion();
        }
    }).fail((err) => {
        quitar_loading_ge_publi(".__subastar_producto");
        presentAlertObject({ icon: 'error', text: idioma.trans144_ });
        removerExposicion();
    });
}

function cuenta_contickets_fun() {
    return new Promise((resolve) => {
        if (ticketsUsuario) {
            if (ticketsUsuario.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        } else {
            resolve(false);
        }

    });

}


function removerExposicion() {
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    agregar_texto_de_rango_subasta(paisusuario.iso_code_2);
    $('.__selectexpo').prop("disabled", false);
    // if(validar_si_3_ventas==true){//cree esta variable para no llamar otravez el wbs 
    //   //  $('.btn_elegi_expo1').prop("disabled", true); 
    // }else{
    //   //  $('.btn_elegi_expo1').prop("disabled", false);  
    // }
    $('.__subastar_producto').removeClass('btn-eleg');
    $('.__subastar_producto').addClass('btn-eleg-light');
    $('.text_quiero_subastar').addClass('d-none');
    $('.container-public').removeClass('activo');
    datosproductos.exposicion = 0;
    $('.__cantidad__exposicion').val('');
    datosproductos.cantidad_exposicion = 0;
    datosproductos.subasta = {
        moneda: '',
        cantidad: 0,
        precio: 0,
        precio_usd: 0,
        tipo: 0,
        activo: 0
    };

    //habilitar input porcentaje oferta
    $('input[name="oferta"]').attr("disabled", false)
    $('.__porcentajeofer').attr("disabled", false)
}

function abrirTickets(ticketInfo = {}, id = 0) {

    if (ticketsUsuario.length <= 0 && id === 0) {
        $('#modal-tickets').modal('show');
        $('.__infosubasta').html(``);
        $('.__alltickets').html(`<p>${idioma.trans146}`);
        return 0;
    }
    $('.__alltickets').empty();
    console.log("pintar los tickets ", ticketInfo);
    console.log("pintar los ticketsUsuario ", ticketsUsuario);
    let fil = ticketInfo ? ticketsUsuario.filter(row => +row.plan == +ticketInfo.id) : [];
    console.log("filtrar ", fil);
    if (fil.length > 0) {
        if (fil[0].plan != 6) {
            $('.__alltickets').append(`
                <div class="content-tickets-view">
                    <span class="number-tickets-view">${fil[0].cantidad}</span>
                    <img class="img-tickets-view" loading="lazy" src="../imagen/nasbi-tickets/svg/Tickets-${fil[0].nombre_plan.split(' ')[0].toLowerCase()}.svg" alt="tickets ${fil[0].nombre_plan.split(' ')[0].toLowerCase()} - nasbi.com"/>
                    <p class="decrip-tickets-view">Tickets ${fil[0].nombre_plan.split(' ')[0]}</p>
                </div>
            `);
        }
    }

    $('#modal-tickets').modal('show');

}

function llenarEnvioProducto() {
    $('.__divenvio').empty();
    let adicionalexpo = '';
    for (const x in envioProducto) {
        let texto_proximamente = ``;
        if (x == 1) texto_proximamente = idioma.trans167;
        $('.__divenvio').append(`
            <div class="col-lg-4 style_envio_card container-public envio __card__envio${envioProducto[x].id}">
                <img src="${envioProducto[x].img}">
                <h5>${envioProducto[x].nombre}</h5>
                <div class="container_text_temporal">
                    <h4 class="texto_poximamente_style">${texto_proximamente}</h4>
                </div>
                <p class="mb-3">${envioProducto[x].descripcion}</p>
                <button class="btn-eleg __selectenvio">${idioma.trans193_}</button>
            </div>
        `);
        $('.__selectenvio').eq(x).off('click');
        $('.__selectenvio').eq(x).on('click', { envio: envioProducto[x] }, activarEnvioProducto);
    }
    $('.__opendatosenvio').off('click');
    $('.__opendatosenvio').on('click', openMoadlDetalleEnvio);

    if (datosproductos.envio != 0) {
        activarEnvioProducto(datosproductos.envio, "1");
    }
}

function activarEnvioProducto(e, id = "") {
    if (id == "1") {
        let data_pre_en = e;
        $('.container-public.envio').removeClass('activo');
        $('.__card__envio' + data_pre_en).addClass('activo');
    } else {
        let envio = e.data.envio;
        if (parseFloat(envio.id) == 2) return 0;
        $('.container-public.envio').removeClass('activo');
        $('.__card__envio' + envio.id).addClass('activo');
        datosproductos.envio = envio.id;
        // if (!validarText(datosproductos.detalle_envio.unidad_distancia || !validarNumero(datosproductos.detalle_envio.alto) || !validarNumero(datosproductos.detalle_envio.largo) || !validarNumero(datosproductos.detalle_envio.ancho) || !validarNumero(datosproductos.detalle_envio.peso)) || !validarText(datosproductos.detalle_envio.unidad_masa)) return openMoadlDetalleEnvio();
    }
}

function openMoadlDetalleEnvio() {
    //  $('.__unidadDistancia').val(datosproductos.detalle_envio.unidad_distancia).selectpicker('refresh');
    $('.__alto').val(datosproductos.detalle_envio.alto);
    $('.__largo').val(datosproductos.detalle_envio.largo);
    $('.__ancho').val(datosproductos.detalle_envio.ancho);
    if (datosproductos.detalle_envio.unidad_distancia == 'cm') $('.__unidadPeso').val(unidadPeso[0].nombre);
    if (datosproductos.detalle_envio.unidad_distancia == 'in') $('.__unidadPeso').val(unidadPeso[1].nombre);
    $('.__peso').val(datosproductos.detalle_envio.peso);
    $('.__save_detalles_envio').off('click');
    $('.__save_detalles_envio').on('click', guardarDetalleEnvio);
    $('#modal-detalle-envio').modal({ backdrop: 'static', keyboard: false });
    $('#modal-detalle-envio').modal('show');
}

function guardarDetalleEnvio() {
    console.log('guardarDetalleEnvio');
    let alto = devolverNumero($('.__alto').val());
    let largo = devolverNumero($('.__largo').val());
    let ancho = devolverNumero($('.__ancho').val());
    let peso = devolverNumero($('.__peso').val());
    if (!validarText(datosproductos.detalle_envio.unidad_masa) || !validarText(datosproductos.detalle_envio.unidad_distancia)) return presentAlertObject({ icon: 'error', text: idioma.trans145_ });
    if (!validarNumero(alto)) return presentAlertObject({ icon: 'error', text: idioma.trans146_ });
    if (!validarNumero(largo)) return presentAlertObject({ icon: 'error', text: idioma.trans147_ });
    if (!validarNumero(ancho)) return presentAlertObject({ icon: 'error', text: idioma.trans148_ });
    if (!validarNumero(peso)) return presentAlertObject({ icon: 'error', text: idioma.trans149_ });


    datosproductos.detalle_envio.alto = alto;
    datosproductos.detalle_envio.largo = largo;
    datosproductos.detalle_envio.ancho = ancho;
    datosproductos.detalle_envio.peso = peso;
    $('#modal-detalle-envio').modal('hide');
}

function llenarUnidadPeso(e) {
    if (e.currentTarget.className.indexOf('__unidadDistancia') < 0) return 0;
    let unidadDsitancia = e.target.value
    if (!validarText(unidadDsitancia)) {
        datosproductos.detalle_envio.unidad_masa = '';
        datosproductos.detalle_envio.unidad_distancia = '';
        $('.__unidadPeso').val('');
        return 0;
    }

    if (unidadDsitancia == 'cm') {
        datosproductos.detalle_envio.unidad_masa = unidadPeso[0].id;
        datosproductos.detalle_envio.unidad_distancia = unidadDsitancia;
        $('.__unidadPeso').val(unidadPeso[0].nombre);
    }
    if (unidadDsitancia == 'in') {
        datosproductos.detalle_envio.unidad_masa = unidadPeso[1].id;
        datosproductos.detalle_envio.unidad_distancia = unidadDsitancia;
        $('.__unidadPeso').val(unidadPeso[1].nombre);
    }

}



function agregar_loading_ge_publi(clase) {
    let span_loading_ge;
    span_loading_ge = `<span class="spiner_modificar_publi">&nbsp;&nbsp;</span><span class="spinner-border spinner-border-sm spiner_modificar_publi" role="status" aria-hidden="true"></span>`;
    $(clase).append(span_loading_ge);
}

function quitar_loading_ge_publi(clase) {
    $(clase).children(".spiner_modificar_publi").remove();
}



function publicar() {
    agregar_loading_ge_publi(".btn_load_confirmar");
    $('.__publicar').prop('disabled', true);


    console.log('datosproductos', datosproductos);

    datosproductos.uid = user.uid;
    datosproductos.empresa = user.empresa;
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    datosproductos.iso_code_2 = paisusuario.iso_code_2;
    datosproductos.moneda_local = paisusuario.iso_code_2;
    if (paisusuario.iso_code_2 == 'US') {
        datosproductos.moneda_local = 'USD';
    } else {
        const divisa = Object.values(divisasJSON).filter(datos => validarText(datos.iso_code_2) && datos.iso_code_2 == paisusuario.iso_code_2);
        datosproductos.moneda_local = divisa[0].code;
    }

    delete (datosproductos.categoria.subCategoria);
    console.log(datosproductos.direccion_envio, "mmmmmmmm", direccionActiva, "mmmmmmm");
    if (validarText(direccionActiva)) {
        datosproductos.direccion_envio = { ...direccionActiva };//
        console.log(datosproductos.direccion_envio, "mm dataaaa");
        if (direccionActiva.pais != 0 && direccionActiva.departamento != 0) {
            if (datosproductos.direccion_envio.pais.country_id && datosproductos.direccion_envio.departamento.zone_id) {
                datosproductos.direccion_envio.pais = datosproductos.direccion_envio.pais.country_id;
                datosproductos.direccion_envio.departamento = datosproductos.direccion_envio.departamento.zone_id;
            }
        } else {
            publicarLoadingFinalizar();
            return presentAlertObject({ icon: 'error', text: idioma.trans47_ });
        }
    } else {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans47_ });
    }

    if (datosproductos.subasta) {
        if (datosproductos.subasta.activo == 0) delete (datosproductos.subasta);
    }

    console.log('datosproductos', datosproductos);

    console.log('validarText', validarText(datosproductos.uid))

    if (!validarText(datosproductos.uid)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans150_ });

    }
    if (!validarText(datosproductos.tipo)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans151_ });

    }
    if (!validarText(datosproductos.producto)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans152_ });

    }
    if (!validarText(datosproductos.marca)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans153_ });

    }
    if (!validarText(datosproductos.modelo)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans154_ });

    }
    if (!validarText(datosproductos.titulo)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans155_ });

    }
    if (!validarText(datosproductos.descripcion)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans156_ });

    }
    if (!validarText(datosproductos.categoria)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans134_ });

    }
    if (!validarText(datosproductos.subcategoria)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans135_ });

    }
    if (!validarText(datosproductos.condicion_producto)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans157_ });

    }

    if (!validarText(datosproductos.cantidad)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans139_ });

    }
    if (!validarText(datosproductos.moneda_local)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans159_ });

    }
    if (!validarText(datosproductos.iso_code_2)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans160_ });

    }
    if (!validarText(datosproductos.precio)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans161_ });

    }
    if (!validarText(datosproductos.precio_usd)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans140_ });

    }

    if (validarText(datosproductos.oferta) && datosproductos.oferta == 1 && !validarText(datosproductos.porcentaje_oferta)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans162_ });

    }
    if (!validarText(datosproductos.exposicion)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans163_ });

    }
    // if (validarText(datosproductos.exposicion) && datosproductos.exposicion == 3 && !validarText(datosproductos.cantidad_exposicion)) {
    //     publicarLoadingFinalizar();
    //     return presentAlertObject({ icon: 'error', text: idioma.trans164_ });

    // }
    if (!validarText(datosproductos.envio)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans165_ });

    }
    if (!validarText(datosproductos.direccion_envio)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans166_ });

    }
    if (!validarText(datosproductos.direccion_envio.pais)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans167_ });

    }
    if (!validarText(datosproductos.direccion_envio.departamento)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans168_ });

    }
    if (!validarText(datosproductos.direccion_envio.ciudad)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans57_ });

    }


    if (!validarText(datosproductos.direccion_envio.codigo_postal)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans59_ });

    }
    if (!validarText(datosproductos.direccion_envio.direccion)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans166_ });

    }
    if (!validarText(datosproductos.detalle_envio)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans169_ });

    }
    if (!validarText(datosproductos.detalle_envio.largo)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans179_ });

    }
    if (!validarText(datosproductos.detalle_envio.ancho)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans180_ });

    }
    if (!validarText(datosproductos.detalle_envio.alto)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans181_ });

    }
    if (!validarText(datosproductos.detalle_envio.unidad_distancia)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans182_ });

    }
    if (!validarText(datosproductos.detalle_envio.peso)) {
        //sadasd
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans183_ });

    }
    if (!validarText(datosproductos.detalle_envio.unidad_masa)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans184_ });

    }
    /*if (validarText(datosproductos.subasta) && datosproductos.subasta.activo) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans185_ });
    }*/
    if (validarText(datosproductos.subasta) && datosproductos.subasta.activo == 1 && !validarText(datosproductos.subasta.moneda)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans186_ });

    }
    if (validarText(datosproductos.subasta) && datosproductos.subasta.activo == 1 && !validarText(datosproductos.subasta.cantidad)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans187_ });

    }

    if (validarText(datosproductos.subasta) && datosproductos.subasta.activo == 1 && !validarText(datosproductos.subasta.precio_usd)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans188_ });

    }
    if (validarText(datosproductos.subasta) && datosproductos.subasta.activo == 1 && !validarText(datosproductos.subasta.tipo)) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans189_ });

    }
    if (datosproductos.fotos_producto.length <= 0) {
        publicarLoadingFinalizar();
        return presentAlertObject({ icon: 'error', text: idioma.trans138_ });

    }

    datosproductos.porcentaje_tax = $('.__porcentajeTax').val();

    console.log('datosproductos', datosproductos);
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/publicacion/?publicar_version_nueva`,
        data: { 'data': datosproductos },
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        $('.__publicar').prop('disabled', false);
        quitar_loading_ge_publi('.btn_load_confirmar');
        console.log('respondí');
        if (res.status != 'success') {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                mostrar_modales_de_errores_al_publicar(res);
                return 0;
            }

        }
        $('#modal-confirmacion').modal('hide');
        // $('#modal-felciidades').modal({backdrop: 'static', keyboard: false});
        if (res.revision == 1) {
            $('#modal-revision').modal('show');
            $('#modal-revision').off('hidden.bs.modal');
            $('#modal-revision').on('hidden.bs.modal', (e) => {
                $(".cierre_modal_revision").click();
            });
        } else if (res.revision == 0) {
            $('#modal-felciidades').modal('show');
            $('#modal-felciidades').off('hidden.bs.modal');
            $('#modal-felciidades').on('hidden.bs.modal', (e) => {
                $(".cierre_modal_felicitaciones").click();
            });
        }
    }).fail((err) => {
        $('.__publicar').prop('disabled', false);
        quitar_loading_ge_publi('.btn_load_confirmar');
        presentAlertObject({ icon: 'error', text: idioma._trans06 });
    });

}

function publicarLoadingFinalizar() {
    $('.__publicar').prop('disabled', false);
    quitar_loading_ge_publi('.btn_load_confirmar');
    $('#modal-confirmacion').modal('hide');
}

function convertBase64_portadavideo(e, clase_img, clase_input_file) {
    console.log($(clase_input_file).prop("files")[0], ",mmmmmmmm");
    if ($(clase_input_file).prop("files")[0]) {
        var archivo = $(clase_input_file).prop("files")[0],
            reader = new FileReader()
        if (archivo.size <= 5000000) {
            if (archivo['type'] == "image/png" || archivo['type'] == "image/jpeg" || archivo['type'] == "image/jpg") {
                reader.onload = (e) => {
                    var binaryString;
                    if (!e) binaryString = reader.content;
                    else binaryString = e.target.result;
                    let img = 'data:image/png;base64,' + window.btoa(binaryString);
                    $(clase_img).attr("src", img)
                    datosproductos.portada_video = img;
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
/////////////////
function validar_opciones_de_video() {
    let url_video_product = $('.__urlvideo').val();

    return new Promise((resolve) => {
        if (validarText(url_video_product)) {
            let patternurl = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
            let eurl;
            eurl = patternurl.test(url_video_product);
            if (eurl) {
                if (!validarText(datosproductos.portada_video)) {
                    resolve({ respuesta: true, idioma: "trans418_" });
                } else {
                    resolve({ respuesta: false, idioma: "" });
                }
            } else {
                resolve({ respuesta: true, idioma: "trans403_" });
            }
        } else {
            if (validarText(datosproductos.portada_video)) {
            } else {
                resolve({ respuesta: false, idioma: "" });
            }
        }
    });

}


function blur_input_video(valor_del_input) {
    if (validarText(valor_del_input)) {
        let url_video_product = $('.__urlvideo').val();
        let patternurl = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
        let eurl;
        eurl = patternurl.test(url_video_product);
        if (eurl) {
            let expresion_video_you_vi = /^(http:\/\/|https:\/\/)(vimeo\.com|youtu\.be|www\.youtube\.com)\/([\w\/]+)([\?].*)?$/i;
            let a = expresion_video_you_vi.test(url_video_product);
            if (a) {
                $('.div_contenedor_img_video').show();
                // $('.img_portada_video').prop("src",  "../imagen/vacio-vender.png"); 
                $('.img_portada_video').prop("disabled", false);
                $('.__uploadfoto_img_video').prop("disabled", false);
                agregar_url_iframe_vender(url_video_product, ".iframe_video_vender");
                datosproductos.url_video = valor_del_input;
            } else {
                $('.div_contenedor_img_video').hide();
                $('.img_portada_video').prop("disabled", true);
                $('.img_portada_video').attr("src", "../imagen/vacio-vender.png");
                $('.__uploadfoto_img_video').prop("disabled", true);
                $('.__urlvideo').val("");

                if (datosproductos.url_video) {
                    delete (datosproductos.url_video);
                }
                if (datosproductos.portada_video) {
                    delete (datosproductos.portada_video);
                }
                return presentAlertObject({ icon: 'error', text: idioma.trans419_ });
            }
        } else {
            $('.div_contenedor_img_video').hide();
            $('.img_portada_video').attr("src", "../imagen/vacio-vender.png");
            $('.img_portada_video').prop("disabled", true);
            $('.__uploadfoto_img_video').prop("disabled", true);
            $('.__urlvideo').val("");
            if (datosproductos.url_video) {
                delete (datosproductos.url_video);
            }
            if (datosproductos.portada_video) {
                delete (datosproductos.portada_video);
            }
            return presentAlertObject({ icon: 'error', text: idioma.trans403_ });
        }
    } else {
        $('.div_contenedor_img_video').hide();
        $('.img_portada_video').attr("src", "../imagen/vacio-vender.png");
        $('.img_portada_video').prop("disabled", true);
        $('.__uploadfoto_img_video').prop("disabled", true);
        $('.__urlvideo').val("");
        if (datosproductos.url_video) {
            delete (datosproductos.url_video);
        }
        if (datosproductos.portada_video) {
            delete (datosproductos.portada_video);
        }
    }
}


async function agregar_url_iframe_vender(url_actual, clase_iframe) {
    let url_video;
    let expresion_vi = /^(http:\/\/|https:\/\/)(vimeo\.com)\/([\w\/]+)([\?].*)?$/i;
    let a = expresion_vi.test(url_actual);
    if (a) {
        url_video = url_actual.split("https://vimeo.com/").join("");
        url_video = "https://player.vimeo.com/video/" + url_video;
    } else {
        //  url_video= url_actual.split("watch?v=").join("embed/").split("&", 1);
        url_video = await preparar_url_youtube(url_actual);
        if (!validarText(url_video)) {
            $('.__urlvideo').val("");
            $('.__urlvideo').blur();
            presentAlertObject({ icon: 'error', text: idioma.trans403_ });
            return 0;
        }
    }
    $(clase_iframe).empty();
    $(clase_iframe).append(`
         <iframe class="contenido_url_video" src=${url_video} width="560" height="315" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
    `);
}


function btn_aceptar_modal_felicitaciones() {
    localStorage.setItem("mis_cuentas", ".sidenav_publicaciones");
    loadPage("mis-cuentas.php")

}

function btn_aceptar_modal_revision() {
    localStorage.setItem("mis_cuentas", ".sidenav_publicaciones");
    loadPage("mis-cuentas.php")

}


function preparar_url_youtube(url_vi) {
    return new Promise((resolve) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url_vi.match(regExp);
        let respuesta = (match && match[2].length === 11) ? "https://youtube.com/embed/" + match[2] : null;
        resolve(respuesta);

    })
}


function obtener_latitud_longitud(__pais, __estado, __ciudad) {
    console.log(__pais, __estado, __ciudad, "mmmmmmmmmmm");
    return new Promise((resolve) => {
        let address = __pais + ',' + __estado + ',' + __ciudad;
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCMeqStSqC4lq01HX9yfjqAD8eNHHlWWac').then(response => response.json())
            .then(async (data) => {
                if (data) {
                    console.log(data, "mmmmmmm")
                    if (data.results[0]) {
                        if (!data.results[0].partial_match) {
                            data_enviar_lat_long = data.results[0].geometry.location;
                            let respuesta_corres = await verificar_si_corresponde_pais_departamento(__pais, __estado, __ciudad, data.results[0].formatted_address);
                            console.log(respuesta_corres, "mmmmmm respuesta vrid");
                            // if(respuesta_corres){
                            resolve(data_enviar_lat_long);
                            // }else{
                            //     resolve(false);   
                            // }

                        } else {
                            resolve(false);
                        }
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }

            })


        // };

    });



}


function verificar_si_corresponde_pais_departamento(pais, departamento, ciudad, array_buscado) {
    return new Promise((resolve) => {
        let result_pais = array_buscado.indexOf(pais);
        let result_derpantamento = array_buscado.indexOf(departamento);
        let result_ciudad = array_buscado.search(new RegExp(ciudad, "i"));
        if (result_pais != -1 && result_derpantamento != -1 && result_ciudad != -1) {
            console.log("asdasdf");
            resolve(true);
        } else {
            resolve(false);
        }
    })

}


function elegir_tipo_exposicion_premium_bloquear_demas() {
    activarExpoProducto(3, "2");
    $('.__selectexpo').prop("disabled", true);

    // deshabilitar input porcentaje oferta
    $('input[value="0"]').prop("checked", true);
    $('input[name="oferta"]').attr("disabled", true)
    $('.__porcentajeofer').attr("disabled", true)
    $(".__porcentajeofer").val(0)
    datosproductos.porcentaje_oferta = 0
}

async function agregar_texto_de_rango_subasta(pais_code2_user) {
    let data_consulta__rango = await consultar_rango_subasta(pais_code2_user);
    if (data_consulta__rango != false) {
        let minimo = data_consulta__rango.precio_local_rango_inferior_mask;
        let maximo = data_consulta__rango.precio_local_rango_superior_mask;
        let unidad_moneda = data_consulta__rango.code;
        let mensaje_rango_subasta = idioma.trans469_.split("$a").join(minimo).split("$b").join(unidad_moneda).split("$c").join(maximo).split("$d").join(unidad_moneda)
        $('._rango_subasta').text(mensaje_rango_subasta);
        $('._rango_subasta').removeClass("d-none");
    } else {
        presentAlertObject({ icon: 'error', text: idioma.trans470_ });
    }


}

function consultar_rango_subasta(pais_code2_user) {
    let dataEnviar = {
        "data": {
            "iso_code_2": pais_code2_user
        }
    };
    console.log("\n\n\n\n\n\n\n\n\n ---------+> [ dataEnviar ]: ", dataEnviar);
    console.log("\n\n\n\n\n\n\n\n\n ---------+> [ dataEnviar ]: ", dataEnviar);
    return new Promise((resolve) => {
        $.ajax({
            type: 'POST',
            url: `${baseurl}/controllers/publicacion/?rango_subastas`,
            data: dataEnviar,
            dataType: 'json',
        }).done((res) => {
            if (res.status == "success") {
                resolve(res);
            } else {
                resolve(false);
            }
        }).fail((err) => {
            resolve(false);
            presentAlertObject({ icon: 'error', text: idioma.trans_04 + "rango" });
        });

    });
}


// async function validar_si_tiene_mas_de_tres_ventas_estado_1(usuario, viene_de_vender) {
//     return new Promise(async (resolve) => {
//     let data_consulta = await consultar_data_de_venta_exposicion(usuario);
//     if(data_consulta){
//         let valor_data= parseFloat(data_consulta.data[0].ventas); 
//         if(valor_data>=3){
//             validar_si_3_ventas=true; 
//             if(viene_de_vender){
//                 presentAlertObject({ icon: 'error', text: idioma.trans471_ });
//             }else{
//                 presentAlertObject({ icon: 'error', text: "mensaje para loguear" });
//             }
//            // $('.btn_elegi_expo1').prop("disabled", true); 
//             resolve(validar_si_3_ventas); 
//         }else{
//             validar_si_3_ventas=false; 
//           //  $('.btn_elegi_expo1').show("disabled", false); 
//             resolve(validar_si_3_ventas); 
//         }
//     }else{
//         validar_si_3_ventas=false; 
//         presentAlertObject({ icon: 'error', text: idioma.trans472_ });
//         resolve(validar_si_3_ventas);  
//     }
//     })
// }


// function consultar_data_de_venta_exposicion(usuario) {
//     let dataEnviar = {
//         data: {
//             uid: usuario.uid,
//             empresa: usuario.empresa
//         }
//     }
//     return new Promise((resolve) => {
//         $.ajax({
//             type: 'POST',
//             url: `${baseurl}/controllers/datos_vendedor/?ventas_gratuitas_realizadas`,
//             data: dataEnviar,
//             dataType: 'json',
//         }).done((res) => {
//             if(res.status=="success"){
//                 resolve(res);
//             }else{
//             resolve(false);
//             }

//         }).fail((err) => {
//             resolve(false);
//             presentAlertObject({ icon: 'error', text: idioma.trans_04+"kjfhsf" });
//         });
//     })
// }


function mostrar_modales_de_errores_al_publicar(data) {
    if (data.status == "errorUsoMaximoExposicion") {
        presentAlertObject({ icon: 'error', text: idioma.trans473_ });
    } else if (data.status == "errorMontoMinimoPublicar") {
        presentAlertObject({ icon: 'error', text: `${idioma.trans186} $ ${montoMinimoPublicarMonedaLocalMask} ${symbolMonedaLocal}` });
    } else if (data.status == "errorMontoMinimoConDescuentoPublicar") {
        presentAlertObject({ icon: 'error', text: `${idioma.trans187} ${maximoPorcentajeAceptable}%` });
    } else if (data.status == "errorPorcentajeMaximoPublicar") {
        presentAlertObject({ icon: 'error', text: idioma.trans188 });
    } else {
        presentAlertObject({ icon: 'error', text: idioma._trans06 });
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
            console.log("THE RES: ", res);
            montoMinimoPublicarMonedaLocal = res.montoMinimoPublicarMonedaLocal;
            symbolMonedaLocal = res.symbolMonedaLocal;
            montoMinimoPublicarMonedaLocalMask = res.montoMinimoPublicarMonedaLocalMask;
        })
            .fail((err) => {
                console.log("ERROR AL CARGAR INFORMACION");
            });
    });
}

function precioPorcentajeAceptable() {
    const precio = Number.parseFloat(datosproductos.precio);
    if (precio > 0) {
        maximoPorcentajeAceptable = 100 - (100 * montoMinimoPublicarMonedaLocal) / precio;

        console.log(datosproductos);

        if (datosproductos.oferta) {
            const oferta = Number.parseFloat(datosproductos.porcentaje_oferta);

            if (oferta <= 50) {
                let auxMaximo = maximoPorcentajeAceptable.toString();

                let sliced = auxMaximo.slice(0, auxMaximo.indexOf('.') + 3);

                console.log(Number.parseFloat(sliced));
                maximoPorcentajeAceptable = Number.parseFloat(sliced);

                if (oferta > maximoPorcentajeAceptable) {
                    presentAlertObject({ icon: 'error', text: `${idioma.trans187} ${maximoPorcentajeAceptable}%` });
                    // esPrecioPorcentajeAceptable = false;
                }
            } else {
                presentAlertObject({ icon: 'error', text: idioma.trans188 });
            }
        }
        if (precio < montoMinimoPublicarMonedaLocal) {
            presentAlertObject({ icon: 'error', text: `${idioma.trans186} $ ${montoMinimoPublicarMonedaLocalMask} ${symbolMonedaLocal}` });
            // esPrecioPorcentajeAceptable = false
        }
    }
}

function getPrice(precio, hayOferta, oferta) {
    if (Number.parseInt(hayOferta) === 1 && (oferta !== "" && oferta !== 0)) {
        const numPrecio = devolverNumero(precio);
        const numOferta = devolverNumero(oferta);
        return numPrecio - (numPrecio * numOferta) / 100;
    } else {
        return devolverNumero(precio);
    }
}
/** Section Colors and Sizes */
var colores_ventas = null;
var tallas_ventas = null;
var paginas_colores = null;
var ya_elegidos = [];

function getColors(pag) {
    let data_url = baseurl + "/controllers/publicacion/?obtener_colores";
    let data;
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
    console.log(data);
    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'POST',
            data: { data: data },
        }).done((result) => {
            if (result['status'] == 'success') {
                colores_ventas = result['data'];
                paginas_colores = result['total_paginas'];
                getTallas();
                chargeColors(pag);
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans281 });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
            reject(null);
        });
    });
}
function chargeColors(pagina) {
    $("#div-colors").html('');
    $('[data-toggle="tooltip"]').tooltip();
    let htmlColors = '';
    let sw = false;
    let n_color = 0;
    for (let i = 0; i < colores_ventas.length; i++) {
        for (let j = 0; j < datosproductos.coloresXtallas.length; j++) {
            if (colores_ventas[i].id == datosproductos.coloresXtallas[j].color_id) {
                sw = true;
                break;
            }
        }
        if (!sw) {
            n_color++;
            htmlColors += `
        <button type="button" class="btn d-inline-block mr-2 border shadow" style="width: 50px; height: 50px; background: ${colores_ventas[i].hexadecimal};" 
        onclick="selectColor(${i})">
            
        </button>`;
        }
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

    if (n_color == 0) {
        htmlColors += `<div>${idioma.trans_eb33}</div>`;
        $("#title-color").html(htmlColors);
        htmlColors = '';
    } else {
        $("#title-color").html(idioma.trans_eb9);
    }
    $("#div-colors").html(htmlColors);
}
function selectColor(i) {
    let color = colores_ventas[i];
    let item = {
        color_id: color.id,
        color_nombre: color.nombre_es,
        color_name: color.nombre_en,
        color_hex: color.hexadecimal,
        tallas: [],
    };
    ya_elegidos.push(color.hexadecimal);
    datosproductos.coloresXtallas.push(item);
    updateColor();
}
function cambiarPagColors(pag) {
    getColors(pag);
}
function updateColor() {
    $("#selected-color").html('');
    let html = '';
    if (localLenguaje == 'ES') {
        for (let i = 0; i < datosproductos.coloresXtallas.length; i++) {
            html += `<div class="content-return-color">
                <div class="div-color text-capitalize" style="background: ${datosproductos.coloresXtallas[i].color_hex} !important;">
                    <div class="span-color" style="background: ${datosproductos.coloresXtallas[i].color_hex} !important;"></div> <!--${datosproductos.coloresXtallas[i].color_nombre}-->
                    <span class="icon-color" onclick="deleteColor(${i})">&times;</span>
                </div>
            </div>`;
        }
        $("#selected-color").append(html);
        $("#selectColorModal").modal('hide');
        updateTalla();
    } else if (localLenguaje == 'EN') {
        for (let i = 0; i < datosproductos.coloresXtallas.length; i++) {
            html += `<div class="content-return-color">
                <div class="div-color text-capitalize" style="background: ${datosproductos.coloresXtallas[i].color_hex} !important;">
                    <div class="span-color" style="background: ${datosproductos.coloresXtallas[i].color_hex} !important;"></div> <!--${datosproductos.coloresXtallas[i].color_name}-->
                    <span class="icon-color" onclick="deleteColor(${i})">&times;</span>
                </div>
            </div>`;
        }
        $("#selected-color").append(html);
        $("#selectColorModal").modal('hide');
        updateTalla();
    }
}

function deleteColor(i) {
    datosproductos.coloresXtallas.splice(i, 1);
    ya_elegidos.splice(i, 1);
    updateColor();
}


function getTallas() {
    let data_url = baseurl + "/controllers/publicacion/?obtener_tallas";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'GET',
        }).done((result) => {
            if (result['status'] == 'success') {
                tallas_ventas = result['data'];
                console
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans281 });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
            reject(null);
        });
    });
}

function chargeColorsTalla() {
    $("#div-tallas").html('');
    $("#div-tallas1").html('');

    if (localLenguaje == 'EN') {
        let html = `
    <div class="dropdown">
      <label for="">Color: </label>
      <br>
      <button style="width: 158px; color: #232a85; background: white;" class="btn btn-secondary dropdown-toggle id_color p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Select
      </button>
      <div class="dropdown-menu" aria-labelledby="">
        `;
        // let html = `<div>
        //             <label for="">Color: </label>
        //             <select name="id_color" id="id_color" class="select-cantidad text-capitalize" onchange="chargeTallas($(this).val())">
        //                 <option value="" selected>Selecciona</option>`;
        for (let i = 0; i < datosproductos.coloresXtallas.length; i++) {
            html += `<a class="mt-1 dropdown-item id_color${i}" style="background-color: ${datosproductos.coloresXtallas[i].color_hex} !important; height: 20px; border-top: 1px solid #232a85; border-bottom: 1px solid #232a85;"  onclick="chargeTallas(${i})"></a>`;
        }
        html += `</div>
        </div>`;
        // let html = `<div>
        //             <label for="">Color: </label>
        //             <select name="id_color" id="id_color" class="select-cantidad text-capitalize" onchange="chargeTallas($(this).val())">
        //                 <option value="" selected>Select</option>`;
        // for (let i = 0; i < datosproductos.coloresXtallas.length; i++) {
        //     html += `<option style="background-color: ${datosproductos.coloresXtallas[i].color_hex} !important;" value="${i}"></option>`;
        // }
        // html += `</select>`;
        $("#div-tallas").append(html);
    } else if (localLenguaje == 'ES') {
        let html = `
    <div class="dropdown">
      <label for="">Color: </label>
      <br>
      <button style="width: 158px; color: #232a85; background: white;" class="btn btn-secondary dropdown-toggle id_color p-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Selecciona
      </button>
      <div class="dropdown-menu" aria-labelledby="">
        `;
        // let html = `<div>
        //             <label for="">Color: </label>
        //             <select name="id_color" id="id_color" class="select-cantidad text-capitalize" onchange="chargeTallas($(this).val())">
        //                 <option value="" selected>Selecciona</option>`;
        for (let i = 0; i < datosproductos.coloresXtallas.length; i++) {
            html += `<a class="mt-1 dropdown-item id_color${i}" style="background-color: ${datosproductos.coloresXtallas[i].color_hex} !important; height: 20px; border-top: 1px solid #232a85; border-bottom: 1px solid #232a85;"  onclick="chargeTallas(${i})"></a>`;
        }
        html += `</div>
        </div>`;
        // $("#div-tallas").append(html);
        $("#div-tallas").append(html);

    }
}
function chargeTallas(id) {
    $("#div-tallas1").html('');

    let element = document.querySelector('.id_color' + id);
    let bg = element.style.backgroundColor;
    bg = bg.substr(4);
    bg = bg.split(')');
    bg = bg[0];
    bg = bg.split(',');
    let hex = rgbToHex(parseInt(bg[0]), parseInt(bg[1]), parseInt(bg[2]));
    console.log(hex);
    element = document.querySelector('.id_color');
    element.style.backgroundColor = hex;
    element.style.color = 'transparent';
    if (id != null) {
        if (localLenguaje == 'EN') {
            let html = '';
            html += `<div>
                    <label for="">Sizes: </label>
                    <br>
                    <select name="id_talla" id="id_talla" class="select-cantidad">
                        <option value="" selected>Select</option>`;
            let sw = false;
            for (let i = 0; i < tallas_ventas.length; i++) {
                for (let j = 0; j < datosproductos.coloresXtallas[id].tallas.length; j++) {
                    if (tallas_ventas[i].id == datosproductos.coloresXtallas[id].tallas[j].id_talla) {
                        sw = true;
                        break;
                    }
                }
                if (!sw) html += `<option value="${i}">${tallas_ventas[i].nombre_es}</option>`;
                sw = false;
            }
            html += `</select>
             </div>
              <button type="button"  class="btn btn-save-talla" onclick="selectTalla(${id})">Guardar</button>`;
            $("#div-tallas1").append(html);
        } else if (localLenguaje == 'ES') {
            let html = '';
            html += `<div>
                    <label for="">Tallas: </label>
                    <br>
                    <select name="id_talla" id="id_talla" class="select-cantidad">
                        <option value="" selected>Selecciona</option>`;
            let sw = false;
            for (let i = 0; i < tallas_ventas.length; i++) {
                for (let j = 0; j < datosproductos.coloresXtallas[id].tallas.length; j++) {
                    if (tallas_ventas[i].id == datosproductos.coloresXtallas[id].tallas[j].id_talla) {
                        sw = true;
                        break;
                    }
                }
                if (!sw) html += `<option value="${i}">${tallas_ventas[i].nombre_es}</option>`;
                sw = false;
            }
            html += `</select>
             </div>
              <button type="button"  class="btn btn-save-talla" onclick="selectTalla(${id})">Guardar</button>`;
            $("#div-tallas1").append(html);
        }
    }
}
function selectTalla(id) {

    if (id != null && $("#id_talla").val() != '') {
        let num_color = id;
        let id_talla = $("#id_talla").val();
        let talla = tallas_ventas[id_talla];
        let talla_color = {
            id_talla: talla.id,
            nombre_talla: talla.nombre_es,
            cantidad: null,
            sku: null,
        }
        datosproductos.coloresXtallas[num_color].tallas.push(talla_color);
        updateTalla();
    } else {
        if (localLenguaje == 'EN') presentAlertObject({ icon: 'error', text: 'Fill in all the fields!' });
        else if (localLenguaje == 'ES') presentAlertObject({ icon: 'error', text: '¡Faltan datos por llenar!' });
    }
}
function updateTalla() {
    $("#selected-tallas").html('');
    let html = '';
    for (let i = 0; i < datosproductos.coloresXtallas.length; i++) {
        if (localLenguaje == 'EN') {
            html += `<div class="content-return-color">
                <div class="div-color text-capitalize" style="background: ${datosproductos.coloresXtallas[i].color_hex} !important;">
                    <div class="span-color" style="background: ${datosproductos.coloresXtallas[i].color_hex} !important;"></div> <!--${datosproductos.coloresXtallas[i].color_name}-->
                    <span class="icon-color" onclick="deleteColor(${i})">&times;</span>
                </div>`;
            for (let j = 0; j < datosproductos.coloresXtallas[i].tallas.length; j++) {
                html += `<div class="div-color text-capitalize">
                    <div class="span-color"></div> ${datosproductos.coloresXtallas[i].tallas[j].nombre_talla}
                    <span class="icon-color" onclick="deleteTalla(${i},${j})">&times;</span>
                </div>`;
            }
            html += `</div>`;
        } else if (localLenguaje == 'ES') {
            html += `<div class="content-return-color">
                <div class="div-color text-capitalize" style="background: ${datosproductos.coloresXtallas[i].color_hex} !important;">
                    <div class="span-color" style="background: ${datosproductos.coloresXtallas[i].color_hex} !important;"></div> <!--${datosproductos.coloresXtallas[i].color_nombre}-->
                    <span class="icon-color" onclick="deleteColor(${i})">&times;</span>
                </div>`;
            for (let j = 0; j < datosproductos.coloresXtallas[i].tallas.length; j++) {
                html += `<div class="div-color text-capitalize">
                    <div class="span-color"></div> ${datosproductos.coloresXtallas[i].tallas[j].nombre_talla}
                    <span class="icon-color" onclick="deleteTalla(${i},${j})">&times;</span>
                </div>`;
            }
            html += `</div>`;
        }
    }
    $("#selected-tallas").append(html);
    $("#selectTallaColor").modal('hide');
    updateColorTalla();
}
function deleteTalla(i, j) {
    datosproductos.coloresXtallas[i].tallas.splice(j, 1);
    updateTalla();
}
function updateColorTalla() {
    $("#talla-cantidad").html('');

    let html = '';
    if (localLenguaje == 'EN') {
        for (let i = 0; i < datosproductos.coloresXtallas.length; i++) {
            html += `<div class="col-md-6">
                        <div class="content-return-color">
                            <div class="div-color text-capitalize" style="background: ${datosproductos.coloresXtallas[i].color_hex} !important;">
                                <div class="span-color" style="background: ${datosproductos.coloresXtallas[i].color_hex} !important;"></div> <!--${datosproductos.coloresXtallas[i].color_name}-->
                                <span class="icon-color" onclick="deleteColor(${i})">&times;</span>
                            </div>
                        </div>
    
                        <div class="table-responsive tabla-tallas">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                    <th>SKU optional</th>
                                </tr>
                                </thead>
                                <tbody>`;
            for (let j = 0; j < datosproductos.coloresXtallas[i].tallas.length; j++) {
                html += `<tr>
                            <td><b>${datosproductos.coloresXtallas[i].tallas[j].nombre_talla}</b></td>
                            <td>
                                <input type="number"  maxlength="500" class="form-control __maskInt__ __cantidad_talla trans194___ph" oninput="addCantTalla(${i}, ${j}, $(this).val(), $(this))" value="${datosproductos.coloresXtallas[i].tallas[j].cantidad}">
                            </td>`;
                if (datosproductos.coloresXtallas[i].tallas[j].sku != null) {
                    html += `
                            <td><input type="text" class="form-control" oninput="addSKUTalla(${i}, ${j}, $(this).val())" value="${datosproductos.coloresXtallas[i].tallas[j].sku}"></td>
                        </tr>`;
                } else
                    html += `
                            <td><input type="text" class="form-control" oninput="addSKUTalla(${i}, ${j}, $(this).val())" ></td>
                        </tr>`;
            }
            html += `</tbody>
                        </table>
                    </div>
                </div>`;
        }
    } else if (localLenguaje == 'ES') {
        for (let i = 0; i < datosproductos.coloresXtallas.length; i++) {
            html += `<div class="col-md-6">
                    <div class="content-return-color">
                        <div class="div-color text-capitalize" style="background: ${datosproductos.coloresXtallas[i].color_hex} !important;">
                            <div class="span-color" style="background: ${datosproductos.coloresXtallas[i].color_hex} !important;"></div> <!--${datosproductos.coloresXtallas[i].color_nombre}-->
                            <span class="icon-color" onclick="deleteColor(${i})">&times;</span>
                        </div>
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
            for (let j = 0; j < datosproductos.coloresXtallas[i].tallas.length; j++) {
                html += `<tr>
                            <td><b>${datosproductos.coloresXtallas[i].tallas[j].nombre_talla}</b></td>
                            <td>
                                <input type="number"  maxlength="500" class="form-control __maskInt__ __cantidad_talla trans194___ph" oninput="addCantTalla(${i}, ${j}, $(this).val(), $(this))" value="${datosproductos.coloresXtallas[i].tallas[j].cantidad}">
                            </td>`;
                if (datosproductos.coloresXtallas[i].tallas[j].sku != null) {
                    html += `
                            <td><input type="text" class="form-control" oninput="addSKUTalla(${i}, ${j}, $(this).val())" value="${datosproductos.coloresXtallas[i].tallas[j].sku}"></td>
                        </tr>`;
                } else
                    html += `
                            <td><input type="text" class="form-control" oninput="addSKUTalla(${i}, ${j}, $(this).val())" ></td>
                        </tr>`;
            }
            html += `</tbody>
                        </table>
                    </div>
                </div>`;
        }
    }
    $("#talla-cantidad").html(html);
}
function addCantTalla(i, j, cant, item) {
    let x = devolverNumero(cant)
    item.val(x);
    if (x = !0) datosproductos.coloresXtallas[i].tallas[j].cantidad = cant;
}
function addSKUTalla(i, j, cant) {
    datosproductos.coloresXtallas[i].tallas[j].sku = cant;
}
function enableTallaSection() {
    $("#no_talla").prop('checked', false);
    $("#section-color").removeClass('d-none');
    $("#section-talla").removeClass('d-none');
    $("#talla-cantidad").removeClass('d-none');
    $("#radio-selected").removeClass('d-none');
    $("#div-cantidad-no-talla").addClass('d-none');
    // $('.__cantidad_talla').off('change');
    // $('.__cantidad_talla').on('change', e => {
    //     $(".__cantidad_talla").val(devolverNumero(e.target.value));
    //     alert('OK');
    // });
    datosproductos.coloresXtallas = [];
    // datosproductos.tiene_colores_tallas = true;
    datosproductos.tiene_colores_tallas = 1;
    datosproductos.cantidad = 0;
    $("#cantidad_no_talla").val('');
    updateColor();
}
function disableTallaSection() {
    $("#yes_talla").prop('checked', false);
    $("#section-color").addClass('d-none');
    $("#section-talla").addClass('d-none');
    $("#talla-cantidad").addClass('d-none');
    $("#radio-selected").removeClass('d-none');
    $("#div-cantidad-no-talla").removeClass('d-none');
    datosproductos.coloresXtallas = [];
    // datosproductos.tiene_colores_tallas = false;
    datosproductos.tiene_colores_tallas = 0;
    datosproductos.cantidad = 0;
    $("#cantidad_no_talla").val('');
    updateColor();
}
function sumarCantidades(data) {
    let suma = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].tallas.length; j++) {
            suma += parseInt(data[i].tallas[j].cantidad);
        }
    }
    return suma;
}
function saveNewColorPicker() {
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
                    presentAlertObject({ icon: 'success', text: idioma.trans_eb39 });
                    $(".btn-no-view-picker").click();
                    getColors(1);
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