// mis-subastas.php     por    mis-nasbi-descuentos.php
// subastas.php     por    nasbi-descuentos.php
// subastas-nasbi.php     por    nasbi-descuentos-normales.php
// subastas-premium.php     por    nasbi-descuentos-premium.php

/******************************/
/* FIN FUNCIONES QUE VALIDAN */
/****************************/


var serverUrl = (("" + location.href).includes("localhost") ? "https" : "https") + "://peers2win.com/api/";
var baseurl = (("" + location.href).includes("localhost") ? "https" : "https") + '://nasbi.peers2win.com/api';
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
console.log('Nombre------>', navigator.userAgent);


/**************************/
/* FUNCIONES QUE VALIDAN */
/************************/
function validarNumero(valor, id = '') {
    let numbers = new RegExp('^[-+]?[0-9]*\.?[0-9]*.');
    if (isNaN(valor) == true || valor == 'NaN' || valor <= 0.000000 || valor === undefined || valor == null || valor == '' || valor == 'null' || valor == 'undefined' || !numbers.test(valor.toString())) {
        if (id != '') {
            $('#' + id).addClass('errorr-red');
            $('#' + id).show();
        }
        return false;
    } else {
        if (id != '') $('#' + id).removeClass('errorr-red');
        return true;
    }
}
function validarText(valor, id = '') {
    if (valor === undefined || valor == 'undefined' || valor == null || valor == '' || valor == 'null' || valor <= 0) {
        if (id != '') {
            $('#' + id).addClass('errorr-red');
            $('#' + id).show();
        }
        return false;
    } else {
        if (id != '') $('#' + id).removeClass('errorr-red');
        return true;
    }
}
function validarColores(bool, data) {
    if (bool == true) {
        if (data.length > 0) return true;
        else return false;
    } else return true;
}
function validarTieneTalla(bool, data) {
    if (bool == true) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].tallas.length == 0) return false;
        }
        return true;
    } else return true;
}
function validaTallaTieneCantidad(bool, data) {
    if (bool == true) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].tallas.length; j++) {
                if (data[i].tallas[j].cantidad == null) return false;
            }
        }
        return true;
    } else return true;
}
function isDecimalKey(evt, obj) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;
    var dotcontains = value.indexOf(".") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
}
function isIntKey(event) {
    return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57
}
function formatNumberUsd(numero) {
    if (!validarNumero(numero)) numero = 0;
    return numero = parseFloat(numero.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]).toLocaleString('en-US', { minimumFractionDigits: 2, useGrouping: true });
}
//Nueva mario
function format_number(number, decimals) {
    return parseInt(number * (10 * decimals)) / (10 * decimals);
}//Nueva mario
function formatNumberCrypto(numero) {
    if (!validarNumero(numero)) numero = 0;
    return numero = parseFloat(numero.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0]).toLocaleString('en-US', { minimumFractionDigits: 6, useGrouping: true });
}
function formatNumberInt(numero) {
    if (!validarNumero(numero)) numero = 0;
    return numero = parseFloat(numero.toString().match(/^-?\d+(?:\.\d{0,0})?/)[0]).toLocaleString('en-US', { minimumFractionDigits: 0, useGrouping: true });
}
function formatNumberDecimal(numero) {
    if (!validarNumero(numero)) numero = 0;
    return numero = parseFloat(numero.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0]).toLocaleString('en-US', { minimumFractionDigits: 1, useGrouping: true });
}
function devolverNumero(valor) {
    if (validarText(valor)) {
        if (valor.split(',').length > 1) valor = parseFloat(valor.replace(/[^0-9-.]/g, ''));
        return valor;
    }
}
function reverseCommas(id) {
    let valor = $('#' + id).val();
    if (validarText(valor)) {
        if (valor.split(',').length > 1) valor = parseFloat(valor.replace(/[^0-9-.]/g, ''));
        $('#' + id).val(valor);
    }
}
function activarMask() {
    $('.__maskInt__, .__maskFloat__, .__maskUsd__, .__maskCripto__, .__maskDate__').off('blur');
    $('.__maskInt__').on('blur', (e) => $(e.target).val(formatNumberInt(e.target.value)));
    $('.__maskFloat__').on('blur', (e) => $(e.target).val(formatNumberDecimal(e.target.value)));
    $('.__maskUsd__').on('blur', (e) => $(e.target).val(formatNumberUsd(e.target.value)));
    $('.__maskCripto__').on('blur', (e) => $(e.target).val(formatNumberCrypto(e.target.value)));
    $('.__maskInt__, .__maskFloat__, .__maskUsd__, .__maskCripto__').off('focus');
    $('.__maskInt__, .__maskFloat__, .__maskUsd__, .__maskCripto__').on('focus', (e) => $(e.target).val(devolverNumero(e.target.value)));

    // if ( $('.__maskDate__').val() ) {
    try {
        $('.__maskDate__').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            endDate: getFechaSinHora(new Date()),
            language: localLenguaje.toLowerCase()
        });
        $('.__maskDate__').val(idioma.trans236_);
        $('.__maskDate__').on('blur', function () {
            const fecha = $(this).val();
            if (!validarText(fecha)) $(this).val(idioma.trans236_);
        });
    } catch (ex) {
        console.log(ex);
    }
    //}
}


function openPictureGeneral() {
    $('.__uploadfoto_general').off('change');
    $('.__uploadfoto_general').on('change', convertBase64);
}
function convertBase64_primary(e) {

    var archivo = e.target.files[0],
        reader = new FileReader()
    reader.onload = (e) => {
        var binaryString;
        if (!e) binaryString = reader.content;
        else binaryString = e.target.result;
        let img = 'data:image/png;base64,' + window.btoa(binaryString);
        $('.__imgfoto').prop('src', img);
        //Este tiene el base64

    }
    reader.readAsBinaryString(archivo);
}

function convertBase64(evt) {


    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var files = evt.target.files;
        var file = files[0];


        if (file['size'] > 500000) {

        } else {
            if (files && file) {
                if (file['type'] == "image/png" || file['type'] == "image/jpeg" || file['type'] == "image/jpg") {
                    var reader = new FileReader();
                    reader.onload = function (e) {

                        var binaryString;
                        if (!e) {
                            binaryString = reader.content;
                        } else {
                            binaryString = e.target.result;
                        }



                        var image = window.btoa(binaryString);
                        var base64 = 'data:image/jpg;base64,' + image;
                        $('.__imgfoto').prop('src', base64);



                    }
                    reader.readAsBinaryString(file);
                } else {

                }
            } else {

            }
        }
    } else {

    }
}


var user = {
    uid: 1,
    empresa: 1
};

var user = localStorage.getItem("userAuth");
if (validarText(user)) {
    user = JSON.parse(localStorage.getItem("userAuth"));
    countMyCartsAuth(user);
    isValidadReferNegocio(user);
    getMyPoints(user);
    getNotificaciones(user);
    agregar_variable_idioma_en_page();
    // $('.menu__opt__configuracion').prop('href', 'mis-cuentas.php?tokenPageView=id-configuracion');
} else {
    var carritoTemporal = localStorage.getItem('carrito_no_logueado');
    if (validarText(carritoTemporal)) {
        carritoTemporal = JSON.parse(carritoTemporal);
        let counts = countMyCartsNotAuth(carritoTemporal);

        if (counts > 0) {
            $('.carrito__indicador__producto').text(counts);
        } else {
            $('.carrito__indicador__producto').text('');
        }
    }
}

function getUserAuth() {
    let user = localStorage.getItem("userAuth");
    if (validarText(user)) {
        user = JSON.parse(localStorage.getItem("userAuth"));
        countMyCartsAuth(user);
        isValidadReferNegocio(user);
        getMyPoints(user);
        getNotificaciones(user);
        agregar_variable_idioma_en_page();
        return user;
    } else return false;
}

var idioma;
var localLenguaje = localStorage.getItem("lenguaje");
// var localLenguaje = 'ES'; // agregado decomentarear la 217 y borrar la 218 para volver a la normalidad
var idiomaurlExtern;

var divisasJSON = [];
var categoriasJSON = [];
var paisesJSON = [];

let paisOriginDEfault; //= { "_id": "COL", "country_id": "47", "departamento": [{ "code": "", "country_code": "", "name": "Todos los departamentos", "zone_id": "" }, { "code": "CO-AMA", "country_code": "CO", "name": "Amazonas", "zone_id": "505" }, { "code": "CO-ANT", "country_code": "CO", "name": "Antioquia", "zone_id": "506" }, { "code": "CO-ARA", "country_code": "CO", "name": "Arauca", "zone_id": "507" }, { "code": "CO-ATL", "country_code": "CO", "name": "Atlantico", "zone_id": "508" }, { "code": "CO-BOL", "country_code": "CO", "name": "Bolivar", "zone_id": "509" }, { "code": "CO-BOY", "country_code": "CO", "name": "Boyaca", "zone_id": "510" }, { "code": "CO-CAL", "country_code": "CO", "name": "Caldas", "zone_id": "511" }, { "code": "CO-CAQ", "country_code": "CO", "name": "Caqueta", "zone_id": "512" }, { "code": "CO-CAS", "country_code": "CO", "name": "Casanare", "zone_id": "513" }, { "code": "CO-CAU", "country_code": "CO", "name": "Cauca", "zone_id": "514" }, { "code": "CO-CES", "country_code": "CO", "name": "Cesar", "zone_id": "515" }, { "code": "CO-CHO", "country_code": "CO", "name": "Choco", "zone_id": "516" }, { "code": "CO-COR", "country_code": "CO", "name": "Cordoba", "zone_id": "517" }, { "code": "CO-CUN", "country_code": "CO", "name": "Cundinamarca", "zone_id": "518" }, { "code": "CO-DC", "country_code": "CO", "name": "Distrito Capital de Bogota", "zone_id": "519" }, { "code": "CO-GUA", "country_code": "CO", "name": "Guainia", "zone_id": "520" }, { "code": "CO-GUV", "country_code": "CO", "name": "Guaviare", "zone_id": "521" }, { "code": "CO-HUI", "country_code": "CO", "name": "Huila", "zone_id": "522" }, { "code": "CO-LAG", "country_code": "CO", "name": "La Guajira", "zone_id": "523" }, { "code": "CO-MAG", "country_code": "CO", "name": "Magdalena", "zone_id": "524" }, { "code": "CO-MET", "country_code": "CO", "name": "Meta", "zone_id": "525" }, { "code": "CO-NAR", "country_code": "CO", "name": "Narino", "zone_id": "526" }, { "code": "CO-NSA", "country_code": "CO", "name": "Norte de Santander", "zone_id": "527" }, { "code": "CO-PUT", "country_code": "CO", "name": "Putumayo", "zone_id": "528" }, { "code": "CO-QUI", "country_code": "CO", "name": "Quindio", "zone_id": "529" }, { "code": "CO-RIS", "country_code": "CO", "name": "Risaralda", "zone_id": "530" }, { "code": "CO-SAP", "country_code": "CO", "name": "San Andres, Providencia y Santa Catalina", "zone_id": "531" }, { "code": "CO-SAN", "country_code": "CO", "name": "Santander", "zone_id": "532" }, { "code": "CO-SUC", "country_code": "CO", "name": "Sucre", "zone_id": "533" }, { "code": "CO-TOL", "country_code": "CO", "name": "Tolima", "zone_id": "534" }, { "code": "CO-VAC", "country_code": "CO", "name": "Valle del Cauca", "zone_id": "535" }, { "code": "CO-VID", "country_code": "CO", "name": "Vichada", "zone_id": "536" }], "iso_code_2_money": "CO", "pais_name": "Colombia", "phone_code": "57", "iso_code_2_money": "CO" };
let params_funciones = new URLSearchParams(location.search);
let country_funciones = (isValidParamUrl(params_funciones.get('country')) ? params_funciones.get('country') : "");
let iso_code_2_money_aux = (isValidParamUrl(params_funciones.get('iso_code')) ? params_funciones.get('iso_code') : "");
let lenguajeDefecto_funciones = (isValidParamUrl(params_funciones.get('lang')) ? params_funciones.get('lang') : "");
// if(location.href.indexOf("index.php") > 0){
//     localStorage.setItem('country_funciones',country_funciones);
//     localStorage.setItem('iso_code_2_money_aux',iso_code_2_money_aux);
//     localStorage.setItem('lenguajeDefecto_funciones',lenguajeDefecto_funciones);
// }
//console.log("LENGUAJE DEFECTO_FUNCIONES: ", lenguajeDefecto_funciones);
var paisDeOrigenAux;
console.log("COUNTRY_FUNCIONES: ", country_funciones);
console.log("LENGUAJEDEFECTO_FUNCIONES: ", lenguajeDefecto_funciones);
if (!validarText(user)) {

    if (country_funciones == "" && lenguajeDefecto_funciones == "") {
        // localStorage.setItem('lenguaje',lenguajeDefecto_funciones);
        localStorage.setItem('lenguaje', localLenguaje);
        document.cookie = "lenguaje=" + encodeURIComponent(localStorage.getItem("lenguaje"));
        paisOriginDEfault = { "_id": "COL", "country_id": "47", "departamento": [{ "code": "", "country_code": "", "name": "Todos los departamentos", "zone_id": "" }, { "code": "CO-AMA", "country_code": "CO", "name": "Amazonas", "zone_id": "505" }, { "code": "CO-ANT", "country_code": "CO", "name": "Antioquia", "zone_id": "506" }, { "code": "CO-ARA", "country_code": "CO", "name": "Arauca", "zone_id": "507" }, { "code": "CO-ATL", "country_code": "CO", "name": "Atlantico", "zone_id": "508" }, { "code": "CO-BOL", "country_code": "CO", "name": "Bolivar", "zone_id": "509" }, { "code": "CO-BOY", "country_code": "CO", "name": "Boyaca", "zone_id": "510" }, { "code": "CO-CAL", "country_code": "CO", "name": "Caldas", "zone_id": "511" }, { "code": "CO-CAQ", "country_code": "CO", "name": "Caqueta", "zone_id": "512" }, { "code": "CO-CAS", "country_code": "CO", "name": "Casanare", "zone_id": "513" }, { "code": "CO-CAU", "country_code": "CO", "name": "Cauca", "zone_id": "514" }, { "code": "CO-CES", "country_code": "CO", "name": "Cesar", "zone_id": "515" }, { "code": "CO-CHO", "country_code": "CO", "name": "Choco", "zone_id": "516" }, { "code": "CO-COR", "country_code": "CO", "name": "Cordoba", "zone_id": "517" }, { "code": "CO-CUN", "country_code": "CO", "name": "Cundinamarca", "zone_id": "518" }, { "code": "CO-DC", "country_code": "CO", "name": "Distrito Capital de Bogota", "zone_id": "519" }, { "code": "CO-GUA", "country_code": "CO", "name": "Guainia", "zone_id": "520" }, { "code": "CO-GUV", "country_code": "CO", "name": "Guaviare", "zone_id": "521" }, { "code": "CO-HUI", "country_code": "CO", "name": "Huila", "zone_id": "522" }, { "code": "CO-LAG", "country_code": "CO", "name": "La Guajira", "zone_id": "523" }, { "code": "CO-MAG", "country_code": "CO", "name": "Magdalena", "zone_id": "524" }, { "code": "CO-MET", "country_code": "CO", "name": "Meta", "zone_id": "525" }, { "code": "CO-NAR", "country_code": "CO", "name": "Narino", "zone_id": "526" }, { "code": "CO-NSA", "country_code": "CO", "name": "Norte de Santander", "zone_id": "527" }, { "code": "CO-PUT", "country_code": "CO", "name": "Putumayo", "zone_id": "528" }, { "code": "CO-QUI", "country_code": "CO", "name": "Quindio", "zone_id": "529" }, { "code": "CO-RIS", "country_code": "CO", "name": "Risaralda", "zone_id": "530" }, { "code": "CO-SAP", "country_code": "CO", "name": "San Andres, Providencia y Santa Catalina", "zone_id": "531" }, { "code": "CO-SAN", "country_code": "CO", "name": "Santander", "zone_id": "532" }, { "code": "CO-SUC", "country_code": "CO", "name": "Sucre", "zone_id": "533" }, { "code": "CO-TOL", "country_code": "CO", "name": "Tolima", "zone_id": "534" }, { "code": "CO-VAC", "country_code": "CO", "name": "Valle del Cauca", "zone_id": "535" }, { "code": "CO-VID", "country_code": "CO", "name": "Vichada", "zone_id": "536" }], "iso_code_2_money": "CO", "pais_name": "Colombia", "phone_code": "57", "iso_code_2_money": "CO" };
        if (!validarText(localStorage.getItem("paisOrigen"))) {
            localStorage.setItem("paisOrigen", JSON.stringify(paisOriginDEfault));
        }
    } else {
        let paisesJSON_dire;
        if (!localStorage.getItem('paises')) {
            $.getJSON(`../json/paisesdepartamentos-${lenguajeDefecto_funciones.toUpperCase()}.json`, (paises) => {
                localStorage.setItem('paises', JSON.stringify(paises));
            }).then(() => {
                location.reload();
                // paisesJSON_dire = JSON.parse(localStorage.getItem('paises'));
                // paisOriginDEfault  = paisesJSON_dire.filter(pais => pais.iso_code_2_money == country)[0];
                //if (!validarText(localStorage.getItem("paisOrigen"))) localStorage.setItem("paisOrigen", JSON.stringify(paisOriginDEfault));
                // paisDeOrigenAux = localStorage.getItem("paisOrigen");
            });
        } else {
            paisesJSON_dire = JSON.parse(localStorage.getItem('paises'));
            paisOriginDEfault = paisesJSON_dire.filter(pais => pais.country_id == country_funciones)[0];
            // if (!validarText(localStorage.getItem("paisOrigen"))) localStorage.setItem("paisOrigen", JSON.stringify(paisOriginDEfault));
            // paisDeOrigenAux = localStorage.getItem("paisOrigen");
            console.log("paisoriginDefault: ", paisOriginDEfault);
            //if (!validarText(localStorage.getItem("paisOrigen"))){
            localStorage.setItem('lenguaje', lenguajeDefecto_funciones);
            document.cookie = "lenguaje=" + encodeURIComponent(localStorage.getItem("lenguaje"));
            localStorage.setItem("paisOrigen", JSON.stringify(paisOriginDEfault));
            localLenguaje = localStorage.getItem('lenguaje');
            //}
        }
    }
}


// confirmar_parametros();
console.log("PAIS ORIGEN DEFAULT: ", paisOriginDEfault);
console.log("paisOrigen DEL STORAGE: ", localStorage.getItem("paisOrigen"));
// if (!validarText(localStorage.getItem("paisOrigen"))){
//     localStorage.setItem("paisOrigen", paisOriginDEfault);
// }
paisDeOrigenAux = localStorage.getItem("paisOrigen");
var paisOrigen = {};

var iso_code_2_money; //= localStorage.getItem('iso_code_2_money') || 'CO';
//console.log("THE VARRRR ISO_CODE_2_MONEY: ", iso_code_2_money);
if (localStorage.getItem('iso_code_2_money') == "undefined" || localStorage.getItem('iso_code_2_money') == undefined || !localStorage.getItem('iso_code_2_money')) {
    // iso_code_2_money = 'CO';
    // console.log("ENTRO LINEA 229");
    //console.log("ISO_CODE_MONEY_IF_antes_funcion: ", localStorage.getItem('iso_code_2_money'));
    // getParamsFromUrl();

    // console.log("ISO_CODE_MONEY_IF_despues_funcion: ", localStorage.getItem('iso_code_2_money'));
} else {
    //   console.log("ENTRO LINEA 233");
    //   console.log("ISO_CODE_MONEY_ELSE: ", localStorage.getItem('iso_code_2_money'));
    iso_code_2_money = localStorage.getItem('iso_code_2_money');
    if (iso_code_2_money != iso_code_2_money_aux) {
        localStorage.setItem('iso_code_2_money', iso_code_2_money_aux);
    }
    cargarPaises().then((paises) => {
        //    console.log(paises)
        let paisesJSON_dire = paises;
        paisOriginDEfault = paisesJSON_dire.filter(pais => pais.iso_code_2_money == iso_code_2_money)[0];
    });
    // let paisesJSON_dire = JSON.parse(localStorage.getItem('paises'));
    // paisOriginDEfault = paisesJSON_dire.filter(pais => pais.iso_code_2_money == iso_code_2_money)[0];
}

confirmar_parametros();

const openPDF = (url) => {
    if (/Android|android/.test(navigator.userAgent)) {
        NativeFunction.downloadFile(url)
    }
    else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        window.webkit.messageHandlers.downloadFile.postMessage(url);
    }
    else {
        window.location.href = url;
    }
}

//////funciones para evitar recarga de pages
const getLanguaje = async () => {
    const storage = localStorage.getItem('lenguaje') || "EN";
    if (!localStorage.getItem('lenguaje')) await setLanguaje("EN")
    return storage;
}

const setLanguaje = async (lang) => {
    //  console.log("lang ", lang);
    if (!lang || lang == "") lang = await getLanguaje();
    localStorage.setItem('lenguaje', lang)
    return lang;
}

const loadPage = async url => {
    console.log('load Page', url);
    if (!url.includes("https")) {
        //  console.log(url.split("content/")[1] ? url.split("content/")[1] : url)
        //  console.log(location.href.split("content")[0] + "content/")
        let url_param = url.split("content/")[1] ? url.split("content/")[1] : url
        url = location.href.split("content")[0] + "content/" + url_param
        //  console.log(url)
    }
    let new_url = new URL(url);

    let new_params = new URLSearchParams(new_url.search);

    if (localStorage.getItem('userAuth')) {

        new_params.delete('lang');
        new_params.delete('iso_code');
        new_params.delete('country');

        // if (!new_params.has('nle')) {
        let lang = await getLanguaje();
        new_params.set('nle', lang);
        // }

        new_url = url.split("?")[0] + "?" + new_params.toString();


        location.href = new_url;
    }
    else {

        // if (!new_params.has('lang')) {
        let lang = await getLanguaje();
        new_params.set('lang', lang);
        // }

        // if (!new_params.has('iso_code')) {
        let iso_code = JSON.parse(localStorage.getItem('paisOrigen')).iso_code_2 || 'CO';
        new_params.set('iso_code', iso_code);
        // }

        if (!new_params.has('country')) {
            let country = JSON.parse(localStorage.getItem('paisOrigen')).country_id || 47;
            new_params.set('country', country);
        }

        new_url = url.split("?")[0] + "?" + new_params.toString();

        location.href = new_url;
    }
}



function confirmar_parametros() {
    // let url = location.href;
    let url = new URL(location.href);
    // let auxParams = new URLSearchParams(location.search);
    let auxParams = url.searchParams;
    if (!validarText(user)) {
        let sw = false;
        // if(location.href.indexOf('filtro-productos') < 0){
        if (!auxParams.has('lang')) {
            // if(lenguajeDefecto_funciones == ""){
            // auxParams.set('lang',localStorage.getItem('lenguajeDefecto_funciones'));
            if (validarText(localStorage.getItem('lenguaje'))) {
                auxParams.set('lang', localStorage.getItem('lenguaje'));
                // url = url + `?lang=${localStorage.getItem('lenguaje')}`;
                sw = true;
            } else {
                auxParams.set('lang', getDefaultIdioma());
                // url = url + `?lang=${getDefaultIdioma()}`;
                sw = true;
            }
        } else {
            if (auxParams.has('lang') && !validarText(localStorage.getItem('lenguaje'))) {
                $.getJSON(`../json/${auxParams.get('lang').toUpperCase()}.json`, (idiomajson) => {
                    sessionStorage.setItem("idioma", JSON.stringify(idiomajson));
                    idioma = idiomajson;
                });
            }
        }
        if (!auxParams.has('iso_code')) {
            // if(iso_code_2_money_aux == ""){
            if (validarText(localStorage.getItem('iso_code_2_money'))) {
                auxParams.set('iso_code', localStorage.getItem('iso_code_2_money'));
                // url = url + `&iso_code=${localStorage.getItem('iso_code_2_money')}`;
                sw = true;
            } else {
                // auxParams.set('iso_code', 'CO');
                let isoCodeAux = JSON.parse(localStorage.getItem('paisOrigen'))["iso_code_2_money"]
                console.log(JSON.parse(localStorage.getItem('paisOrigen')), isoCodeAux)

                auxParams.set('iso_code', JSON.parse(localStorage.getItem('paisOrigen')) ? isoCodeAux : "CO");
                // url = url + `&iso_code=CO`;
                sw = true;
            }
        } else {
            let iso_code = auxParams.get('iso_code')
            if (!validarText(iso_code)) {
                auxParams.set('iso_code', JSON.parse(localStorage.getItem('paisOrigen')).iso_code_2);
            }
        }
        // if(country_funciones == ""){
        if (!auxParams.has('country')) {
            // auxParams.set('country',localStorage.getItem('country_funciones'));
            if (validarText(localStorage.getItem('paisOrigen'))) {
                // localStorage.setItem("aux-test",localStorage.getItem('paisOrigen'));
                auxParams.set('country', JSON.parse(localStorage.getItem('paisOrigen')).country_id);
                // url = url + `&country=${JSON.parse(localStorage.getItem('paisOrigen')).country_id}`;
                sw = true;
            } else {
                auxParams.set('country', '47');
                sw = true;
            }
        }
        // }
        // console.log("AUXPARAMS: --",window.location.pathname);
        if (sw == true) {
            url.search = auxParams.toString();
            let newUrl = url.toString();
            // console.log("the newUrl: ", newUrl);
            location.href = newUrl;
            // location.href = url;
            // console.log(`.${window.location.pathname}${auxParams}`);
            // location.href = `.${window.location.pathname}${auxParams}`;
        }
    } else {
        if (auxParams.has('lang') || auxParams.has('iso_code') || auxParams.has('country')) {
            // // console.log("THE URL OBJECT: ",url);
            // url = url.href.split("?")[0];
            // // let newUrl = new URL(location.href);
            // console.log("the NEW URL:; ", url);
            // location.href = url;
            // console.log("THE URL OBJECT: ",url);
            auxParams.delete('lang');
            auxParams.delete('iso_code');
            auxParams.delete('country');
            if (!auxParams.has('nle')) {
                let lenguaje_actual_funcion = localStorage.getItem('lenguaje');
                auxParams.set('nle', lenguaje_actual_funcion);
            }
            //  console.log("hiiiiiii parametros", auxParams);

            url = url.href.split("?")[0] + "?" + auxParams.toString();
            // url = url.href + auxParams.toString();
            console.log("ANOTHER NEW URL: ", url);

            // url = url.href.split("?")[0];

            // let newUrl = new URL(location.href);
            // console.log("the NEW URL:; ", url);

            location.href = url;
        }

    }
    // let url = location.href;
    // console.log("MYY URL: ",url);
    // let auxParams = new URLSearchParams(url);
    //     if(!validarText(user)){
    //         console.log("DESPUES DEL IF DE USER: ",user);
    //         if(url.indexOf('filtro-productos') < 0){
    //             let sw = false;
    //             if(lenguajeDefecto_funciones == ""){
    //                 console.log("if lenguaje: ",localStorage.getItem('lenguajeDefecto_funciones'));
    //                 url = url + `?lang=${localStorage.getItem('lenguajeDefecto_funciones')}`;
    //                 sw = true;
    //                 // auxParams.append('new',localStorage.getItem('lenguaje'));
    //             }
    //             if(country_funciones == ""){
    //                 console.log("if country: ",localStorage.getItem('country_funciones'));
    //                 // auxParams.append('country',paisOrigen.country_id);
    //                 url = url + `&country=${localStorage.getItem('country_funciones')}`;
    //                 sw = true;
    //             }
    //             if(iso_code_2_money_aux == ""){
    //                 console.log("entro: ",localStorage.getItem('iso_code_2_money_aux'));
    //                 url = url + `&iso_code=${localStorage.getItem('iso_code_2_money_aux')}`;
    //                 sw = true;
    //                 // auxParams.append('iso_code',"MY CUSTOM ISO");
    //             }
    //             if(sw == true){
    //                 location.href = url;
    //             }
    //         }
    //         console.log("AUX PARAMS NEW FUNCTION: ",auxParams);
    //     }else{
    //         console.log("logueado");
    //     }
}


// $(document).ready((ev)=>{
//     $('.to_promociones').on('click',function(){
//         let newParams = getParamsToRedirect();
//         toSomePageWithNewParams(newParams,"promociones.php");
//     });

//     $('.to_mas_vendidos').on('click',function(){
//         let newParams = getParamsToRedirect();
//         toSomePageWithNewParams(newParams,"mas-vendidos.php");
//     });

//     $('.to_empresas').on('click',function(){
//         let newParams = getParamsToRedirect();
//         toSomePageWithNewParams(newParams,"empresas.php");
//     });

//     $('.to_vender').on('click',function(){
//         let newParams = getParamsToRedirect();
//         toSomePageWithNewParams(newParams,"vender.php");
//     });

//     $('.to_vender').on('click',function(){
//         let newParams = getParamsToRedirect();
//         toSomePageWithNewParams(newParams,"vender.php");
//     });

//     $('.to_nasbi_descuentos').on('click',function(){
//         let newParams = getParamsToRedirect();
//         toSomePageWithNewParams(newParams,"nasbi-descuentos.php");
//     });

//     $('').on('click',function(){
//         let newParams = getParamsToRedirect();
//         toSomePageWithNewParams(newParams,"nasbi-descuentos.php");
//     });

// });


if (validarText(paisDeOrigenAux)) {
    paisOrigen = JSON.parse(paisDeOrigenAux);
}
var empresaAux = localStorage.getItem("empresaAuth");
var empresaAuth = {};

if (validarText(empresaAux)) {
    empresaAuth = JSON.parse(empresaAux);
    let labelMiEmpresa = "Mi empresa";
    let symbol_idioma = "ES";
    if (validarText(localLenguaje) == true) {
        symbol_idioma = ('' + localLenguaje);
    } else {
        symbol_idioma = getDefaultIdioma();
    }
    if (('' + symbol_idioma).toUpperCase() == "ES") {
        labelMiEmpresa = "Mi empresa";
    } else {
        var lnTemp = getDefaultIdioma();
        labelMiEmpresa = "My business";
    }
    $('.menu__user').prepend(`<a href="productos-empresa.php?empresa=${empresaAuth.id}"><li>${labelMiEmpresa}</li></a>`);
    $('.menu__user__resp').prepend(`<a class="dropdown-item" href="productos-empresa.php?empresa=${empresaAuth.id}">${labelMiEmpresa}</a>`);
    getMyPoints(empresaAuth);


    //   $('.menu__opt__configuracion').prop('href', 'editar-empresa.php');

    getNotificaciones(empresaAuth);
    isValidadReferNegocio(user);
    agregar_variable_idioma_en_page();
}


var carritoTemporal = localStorage.getItem('carrito_no_logueado');
if (validarText(carritoTemporal)) {
    carritoTemporal = JSON.parse(carritoTemporal);
}

var imageDefault = "../imagen/vacio-vender.png";
var tieneOferta = 1;
var noTieneOferta = 0;


var condicion_producto = {
    "todos": "",
    "nuevo": 1,
    "usado": 2,
    "reacondicionado": 3
};
var garantia = {
    "todos": "",
    "si": 1,
    "no": 0
};
var oferta = {
    "todos": "",
    "si": 1,
    "no": 0
};
var envio = {
    "todos": "",
    "free": 1,
    "acargo": 2,
    "acordar_comprador": 3,
};



if (validarText(localLenguaje) == true) {
    if (localLenguaje.toUpperCase() == 'ES') {
        localLenguaje = localLenguaje.toUpperCase();
    } else {
        localLenguaje = 'EN';
        localStorage.setItem('lenguaje', 'EN');
        document.cookie = "lenguaje=" + encodeURIComponent(localStorage.getItem("lenguaje"));
        // localLenguaje = 'ES';    // agregada  descomentarear las 304 y 305, borrar las 306 y 307 para volver a la normalidad
        // localStorage.setItem('lenguaje', 'ES'); // agregada decomentareas las 304 y 305, borrar las 306 y 307 para volver a la normalidad
    }
    $(".navbar__idioma").val(localLenguaje);
    $(".select-idioma").val(localLenguaje);
    $(".editar__idioma").val(localLenguaje);
    $("body").addClass(localLenguaje.toUpperCase());

} else {

    var lnTemp = getDefaultIdioma();
    //   console.log("LNTEMP:", lnTemp);
    localLenguaje = lnTemp;
    localStorage.setItem('lenguaje', lnTemp);
    document.cookie = "lenguaje=" + encodeURIComponent(localStorage.getItem("lenguaje"));

    $(".navbar__idioma").val(localLenguaje);
    $(".select-idioma").val(localLenguaje);
    $(".editar__idioma").val(localLenguaje);
    $("body").addClass(localLenguaje.toUpperCase());
}

var validador = 0;
if (sessionStorage.getItem('idioma') == null || sessionStorage.getItem('idioma') == undefined) {
    validador = 1;
} else {

    idioma = JSON.parse(sessionStorage.getItem("idioma"));

    if (idioma['lang'] != localLenguaje) {
        validador = 1;
    }
}

if (validador == 1) {
    $.getJSON(`../json/${localLenguaje}.json`, (idiomajson) => {
        /*sessionStorage.removeItem("idioma");*/
        sessionStorage.setItem("idioma", JSON.stringify(idiomajson));

        idioma = idiomajson;
        menuBasicConfigPostAuth(JSON.parse(localStorage.getItem("userAuth")));
        readyIdioma('old');
    });
} else {
    try {
        idioma = JSON.parse(sessionStorage.getItem('idioma'));
    } catch (ex) {
        console.log(ex);
    }

    menuBasicConfigPostAuth(JSON.parse(localStorage.getItem("userAuth")));
    readyIdioma('old');

    // Por si llegan keys nuevas.
    try {
        $.getJSON(`../json/${localLenguaje}.json`, (idiomajson) => {
            console.log("\t-----*> Para las keys nuevas: ", idiomajson);
            sessionStorage.setItem("idioma", JSON.stringify(idiomajson));
        });
    } catch (ex) {
        console.log("Idioma nueva: ", ex);
    }
}

function readyIdioma(tipo) {
    $(document).ready((e) => {

        $('.input__navbar__search').val("");

        $(".input__eye__btn").click(($event) => {
            if ($event.currentTarget.value == 'btnOff') {
                $('.nasbi__input__eyes__on').hide();
                $('.nasbi__input__eyes__off').show();
                $('.nasbi__input__password').prop('type', 'text');
            } else {
                $('.nasbi__input__eyes__on').show();
                $('.nasbi__input__eyes__off').hide();
                $('.nasbi__input__password').prop('type', 'password');
            }
        });

        $(".input-login").keypress(function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13) {
                let userAuthData = {
                    user: $(".nasbi__input__username").val().trim(),
                    password: $(".nasbi__input__password").val().trim()
                };
                auth(userAuthData);
            }
        });

        $(".nasbi__btn__login").click(($event) => {
            let userAuthData = {
                user: $(".nasbi__input__username").val().trim(),
                password: $(".nasbi__input__password").val().trim()
            };
            auth(userAuthData);
        });
        $(".nasbi__btn__login_empresa").click(($event) => {
            let empresaAuthData = {
                correo: $(".nasbi__input__username").val().trim(),
                clave: $(".nasbi__input__password").val().trim(),
                mostrar_alerta: true
            };
            loginEmpresaAuth(empresaAuthData, 0);
        });

        $("#modal-login").on('hidden.bs.modal', function () {
            $(".nasbi__input__username").val("");
            $(".nasbi__input__password").val("");
        });
        $("#bienvenida-promociones-home").on('hidden.bs.modal', function () {
            presentNavBarAuth();
        });
        $(".navbar__exit").click(($event) => {
            logout();
        });
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        var ratio = window.devicePixelRatio || 1;
        var screenRatio = {
            width: window.screen.width * ratio,
            height: window.screen.height * ratio
        };

        if (iOS) {
            $('body').addClass('iphone');
        }
        if (iOS && screenRatio.width == 1125 && screenRatio.height === 2436) {
            $('body').addClass('iphoneX');
        }

        authCheck(user);

        // setCaptchaLang(document.getElementsByClassName("img-capcha"), localLenguaje.toLowerCase());

        cargarIdioma(localLenguaje, tipo);

        activarMask();

        openPictureGeneral();

        getAllPromise();

        cargarPrimero();

        cargarDepartamentos();

        document.addEventListener('click', (e) => {
            console.log(e)
            let raiz = "";
            if (e.target.localName == 'a') {
                raiz = e.target;
            } else if ((e.target.localName == 'li' || e.target.localName == 'span') && e.target.parentNode.localName == 'a') {
                raiz = e.target.parentNode;
            }
            if (raiz.localName == 'a' && validarText(raiz.pathname) && validarText(raiz.href) && !raiz.href.includes("#")) {
                loadPage(raiz.href);
                e.preventDefault()

            }

        })

        $('.to_change_idioma').on('click', function ($event) {
            if (!validarText(user)) {
                if ($event.target.name) {
                    localLenguaje = $event.target.name;
                    localStorage.setItem('lenguaje', localLenguaje);
                    document.cookie = "lenguaje=" + encodeURIComponent(localStorage.getItem("lenguaje"));

                    // console.log("\n\n\n\n\n\n\n\n [ 1. ] localLenguaje= ", localLenguaje);
                    $.getJSON(`../json/${localLenguaje}.json`, (idiomajson) => {

                        // console.log("[ 1.1 ] idiomajson= ", idiomajson);
                        // console.log("sessionStorage.getItem('idioma')= ", sessionStorage.getItem('idioma'));


                        sessionStorage.removeItem('idioma');


                        // console.log("[ 2. ]sessionStorage.getItem('idioma')= ", sessionStorage.getItem('idioma'));


                        sessionStorage.setItem('idioma', JSON.stringify(idiomajson));


                        // console.log("[ 3. ]sessionStorage.getItem('idioma')= ", sessionStorage.getItem('idioma'));

                        setTimeout(() => {
                            // location.reload();
                            let new_url = new URL(location.href);
                            let new_params = new URLSearchParams(new_url.search);

                            if (new_params.has('lang')) {
                                new_params.set('lang', localLenguaje);
                                console.log("NEW_PARAMS: ", new_params.toString());
                                if (!new_params.has('nle')) {
                                    let lenguaje_actual_funcion = localStorage.getItem('lenguaje');
                                    new_params.set('nle', lenguaje_actual_funcion);
                                }
                                new_url = location.href.split("?")[0];
                                new_url = new_url + "?" + new_params.toString();
                                console.log("NEW_URL :", new_url);

                                location.href = new_url;
                            }
                        }, 300);
                    });
                }
            }
        });
        $(".navbar__idioma").change(($event) => {
            if (!validarText(user)) {
                if ($event.target.value) {
                    localLenguaje = $event.target.value;
                    localStorage.setItem('lenguaje', localLenguaje);
                    document.cookie = "lenguaje=" + encodeURIComponent(localStorage.getItem("lenguaje"));

                    // console.log("\n\n\n\n\n\n\n\n [ 1. ] localLenguaje= ", localLenguaje);
                    $.getJSON(`../json/${localLenguaje}.json`, (idiomajson) => {

                        // console.log("[ 1.1 ] idiomajson= ", idiomajson);
                        // console.log("sessionStorage.getItem('idioma')= ", sessionStorage.getItem('idioma'));


                        sessionStorage.removeItem('idioma');


                        // console.log("[ 2. ]sessionStorage.getItem('idioma')= ", sessionStorage.getItem('idioma'));


                        sessionStorage.setItem('idioma', JSON.stringify(idiomajson));


                        // console.log("[ 3. ]sessionStorage.getItem('idioma')= ", sessionStorage.getItem('idioma'));

                        setTimeout(() => {
                            // location.reload();
                            let new_url = new URL(location.href);
                            let new_params = new URLSearchParams(new_url.search);

                            if (new_params.has('lang')) {
                                new_params.set('lang', localLenguaje);
                                console.log("NEW_PARAMS: ", new_params.toString());
                                if (!new_params.has('nle')) {
                                    let lenguaje_actual_funcion = localStorage.getItem('lenguaje');
                                    new_params.set('nle', lenguaje_actual_funcion);
                                }
                                new_url = location.href.split("?")[0];
                                new_url = new_url + "?" + new_params.toString();
                                console.log("NEW_URL :", new_url);
                                location.href = new_url;
                            }
                        }, 300);
                    });
                }
            }
        });
        $(".categorias__navbar").change(($event) => {
            let departamentoID = 0;
            if (paisOrigen.departamentoSelect) {
                departamentoID = paisOrigen.departamentoSelect.zone_id;
            } else {
                departamentoID = paisOrigen.departamento[0].zone_id;
            }
            let dataFilterProducts = {
                "pais": paisOrigen.country_id,
                "departamento": departamentoID,
                "iso_code_2": paisOrigen.iso_code_2,
                "iso_code_2_money": iso_code_2_money,
                "categoria": $event.target.value
            };

            $('.categorias__navbar').val("" + $event.target.value);
            if ($event.target.value != null && $event.target.value != undefined) {
                localStorage.setItem('categorias__navbar', $event.target.value);
            }
            toFilterProductosObject(dataFilterProducts);
        });
        $('.dropdown__departamentos').change(($event) => {
            let value_elegido_filtro_product = $event.target.value;
            let pos = paisOrigen.departamento.map(item => { return item.zone_id }).indexOf(value_elegido_filtro_product);
            if (pos > -1) {
                paisOrigen.departamentoSelect = paisOrigen.departamento[pos];
                $('.dropdown__departamentos').val(value_elegido_filtro_product);
                $('.dropdown__departamentos').selectpicker('refresh');
                localStorage.setItem("paisOrigen", JSON.stringify(paisOrigen));

                //Nº1 Este pedaso se agrego para saber si esta 
                //en filtro-productos.js y llamar la funcion de dicho js
                //debido que tener otro evento change creaba conflicto
                pedaso_numero_uno_filtro_producto($event.target.value);
                //fin de pedaso Nº1

            }

            /*}else{
                console.log("[ 5 ] ----------> $event.target.value: ", $event.target.value);
            }*/
        });
        $('.input__navbar__search').keypress(($event) => {
            if ($event.which == 13) {
                $event.preventDefault();
                let dataFilterProducts = getParamsFilterProductsURL();
                dataFilterProducts.producto_nombre = $event.target.value;
                if (dataFilterProducts.producto_nombre != undefined && dataFilterProducts.producto_nombre != null) {
                    toFilterProductosObject(dataFilterProducts);
                }
            }
        });
        $('.input__navbar__search__btn').click(($event) => {
            let dataFilterProducts = getParamsFilterProductsURL();
            let inputs_navbar = $(".input__navbar__search")
            $.each(inputs_navbar, (i, navbar) => {
                if (navbar.value) {
                    dataFilterProducts.producto_nombre = navbar.value;
                    return
                }

            })
            console.log(dataFilterProducts.producto_nombre)
            if (dataFilterProducts.producto_nombre != undefined && dataFilterProducts.producto_nombre != null && dataFilterProducts.producto_nombre != "") {
                toFilterProductosObject(dataFilterProducts);
            }
        });
        $('.cantidad_notificaciones2__').click(($event) => {
            getNotificaciones(user);
        });


        $('.to_mis_cuentas_menu_user').click(($event) => {
            localStorage.setItem("mis_cuentas", null);
            loadPage("mis-cuentas.php");
        });

        $('.menu__opt__configuracion').click(($event) => {
            localStorage.setItem("mis_cuentas", ".sidenav_configuracion");
            loadPage("mis-cuentas.php");
        });

        $('.to_mis_compras_menu_user').click(($event) => {
            localStorage.setItem("mis_cuentas", ".sidenav_compras");
            loadPage("mis-cuentas.php");
        });

        $('.to_mis_ventas_menu_user').click(($event) => {
            localStorage.setItem("mis_cuentas", ".sidenav_ventas");
            loadPage("mis-cuentas.php");
        });


        $('.boton_a_vender').click(($event) => {
            loadPage("vender.php");
        });







    });
}
function cargarIdioma(id, tipo) {
    // id = 'ES'; // AGREGADA borrar la 555 para volver a la normalidad
    localStorage.setItem("lenguaje", id);
    document.cookie = "lenguaje=" + encodeURIComponent(localStorage.getItem("lenguaje"));
    let actualNewLenguaje = '';
    if (id.toUpperCase() == 'ES') {
        actualNewLenguaje = 'es';
    } else if (id.toUpperCase() == 'PT') {
        actualNewLenguaje = 'pr';
    } else {
        actualNewLenguaje = 'us';
    }

    if (tipo == 'new') {
        sessionStorage.removeItem("idioma");
        window.location.href = '../content/' + actualNewLenguaje;
    } else {
        let buscar, buscarsocial;
        let currentYear = new Date().getFullYear()
        $.each(idioma, (key, value) => {
            // Validamos el tipo de KEY: normal, placeholder, href, src, alt.....
            let terminos = `<a onclick="openPDF2('https://nasbi.com/assets/docs/terminos-y-condiciones-generales-nasbi-v8.pdf')"><span class="">Términos y condiciones generales</span></a>`
            let politicas = `<a onclick="openPDF2('https://nasbi.com/assets/docs/politicas-privacidad-nasbi-v10.pdf')"><span class="">Política de Privacidad, seguridad de la información y cookies</span></a>`
            if (key == "_trans270") {
                value = value.split("2020").join(currentYear)
                $('.' + key).html(value + "/" + terminos + ", " + politicas);
            } else if (key.indexOf('__ph') > 0) {
                $('.' + key).attr("placeholder", value);

            } else if (key.indexOf('__href') > 0) {
                $('.' + key).attr("href", value);

            }
            else if (key.indexOf('__download') > 0) {
                $('.' + key).attr("download", value);

            }
            else if (key.indexOf('__src') > 0) {
                $('.' + key).attr("src", value);

            } else if (key.indexOf('__tooltip') > 0) {
                $('.' + key).attr("title", value);

            } else if (key.indexOf('__alt') > 0) {
                $('.' + key).attr("alt", value);

            } else if (key.indexOf('_SEO') > 0) {
                $('.' + key).attr("content", value);
            }
            else {
                $('.' + key).html(value);
            }
        });
        /*$('.selectpicker').selectpicker('refresh');*/
    }
}
async function getAllPromise() {
    divisasJSON = await getDivisas();

    categoriasJSON = await getCategorias();
    cargarCategoriasGlobal(categoriasJSON, 'categorias__navbar');

    paisesJSON = await getPaises();
}

function getDivisas() {
    return new Promise((resolve, reject) => {
        let divisasjson = JSON.parse(localStorage.getItem('divisas'));

        if (divisasjson != null) {
            divisasJSON = divisasjson;



            resolve(divisasJSON);
        } else {
            $.ajax({
                url: 'https://peers2win.com/js/fidusuarias.json',
                type: 'GET',
            }).done((res) => {
                divisasJSON = res;
                localStorage.setItem('divisas', JSON.stringify(divisasJSON));



                resolve(divisasJSON);
            }).fail((err) => {
                presentAlertObject({ icon: 'error', text: idioma.trans277 });
                // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
                localStorage.removeItem('divisas');

                reject(null);
            });
        }
    });
}
function getPaises() {
    return new Promise((resolve, reject) => {
        let paisjson = JSON.parse(localStorage.getItem('paises'));
        // if (validarText(paisjson)) {
        //     paisesJSON = paisjson;
        //     resolve(paisesJSON);
        // } else { //ESTO LO COMENTE PORQUE SI OCURRE UN CAMBIO DE IDIOMA NO LLAMARIA EL JSON PARA CAMBIAR LOS PAISES

        $.ajax({
            type: 'POST',
            url: '../json/paisesdepartamentos-' + localLenguaje.toUpperCase() + '.json',
            data: '',
            dataType: 'json',
        }).done((res) => {
            paisesJSON = res;
            localStorage.setItem('paises', JSON.stringify(res));



            resolve(paisesJSON);

        }).fail((err) => {
            paisesJSON = [];
            presentAlertObject({ icon: 'error', text: idioma.trans278 });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las paises' });
            localStorage.removeItem('paises');



            reject(null);
        });
        // }

    });
}
function authCheck(user) {
    if (!user) {
        presentNavBar();

        $('.navbar__nologeado').show("slow");

        // $('.navbar__logeado').hide(3000);
        $('.navbar__logeado').hide("fast");
    } else {
        presentNavBarAuth();
    }
}
function presentNavBarAuth() {
    // $('.navbar__logeado').show(300);
    $('.navbar__logeado').show();
    $('.navbar__nologeado').hide();
}
function presentNavBar() {
    $('.navbar__nologeado').show("slow");
    $('.navbar__logeado').hide(100);
    $('.navbar__logeado').hide("fast");
}
function logout() {
    localStorage.removeItem("userAuth");
    localStorage.removeItem("empresaAuth");
    // localStorage.removeItem("iso_code_2_money");

    localStorage.removeItem(user.uid + '_clasificacion');

    // user = {
    //     uid: 1,
    //     empresa: 1
    // };

    user = null;

    // window.location.href = "index.php";

    window.location.href = `
        index.php?lang=${localStorage.getItem('lenguaje')}&iso_code=${localStorage.getItem('iso_code_2_money')}&country=${JSON.parse(localStorage.getItem('paisOrigen')).country_id}`;
    presentNavBar();
}
function presentAlert(title = "N A S B I", text = "", icon = "info") {
    $('#modal-presentAlert-info').modal('show');

    $('.modal-presentAlert-info-title').html(`<div>${title}</div>`);
    $('.modal-presentAlert-info-body').html(`<div>${text}</div>`);

}

function presentAlertObject({ title = "N A S B I", text = "", icon = "info" }) {
    $('#modal-presentAlert-info').modal('show');

    $('.modal-presentAlert-info-title').html(`<div>${title}</div>`);
    $('.modal-presentAlert-info-body').html(`<div>${text}</div>`);

}
function presentAlertModalConfirm({ title = "N A S B I", text = "", icon = "info" }) {
    $('#modal-presentAlert-comfirm').modal('show');


    $('.modal-presentAlert-comfirm-title').html(`<div>${title}</div>`);
    $('.modal-presentAlert-comfirm-body').html(`<div>${text}</div>`);

    return new Promise((resolve) => {

        $('.modal-presentAlert-comfirm-accept').off('click');
        $('.modal-presentAlert-comfirm-accept').on('click', null, () => {
            $('#modal-presentAlert-comfirm').modal('hide');
            resolve(true);
        });
        $('.modal-presentAlert-comfirm-cancel').off('click');
        $('.modal-presentAlert-comfirm-cancel').on('click', null, () => {
            $('#modal-presentAlert-comfirm').modal('hide');
            resolve(false);
        });
    });
}
// 25 de agosto 2020 - Editada el 27 de agosto 2020
function getCategorias() {
    return new Promise((resolve, reject) => {
        $.ajax({

            type: 'POST',
            url: `../json/categorias_${localLenguaje}.json`,
            data: '',
            dataType: 'json',

        }).done((res) => {

            categoriasJSON = res;
            localStorage.setItem('categorias', JSON.stringify(res));
            resolve(categoriasJSON);

        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans276 });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las categorias' });
            localStorage.removeItem('categorias');
            reject(null);

        });

    });
}
function cargarCategoriasGlobal(arr = [], key = "") {
    $('.' + key).selectpicker('destroy');

    let htmlOption = "";
    $.each(arr, function (i, item) {
        htmlOption += `<option value="${item.CategoryID}">${item.CategoryName}</option>`;
    });
    $('.' + key).html(htmlOption);
    $('.' + key).selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false,
        noneSelectedText: idioma.trans476_,
        noneResultsText: idioma.trans476_

    });

    let ctg_paramsURLTemp = getParamsFilterProductsURL();
    let ctg_categoriaTemp = localStorage.getItem('categorias__navbar');

    if (ctg_paramsURLTemp.categoria) {
        let encontro_en_array = arr.filter(data => ctg_paramsURLTemp.categoria == data.CategoryID)[0];
        if (validarText(encontro_en_array)) {
            $('.categorias__navbar').val(ctg_paramsURLTemp.categoria);
            $('.categorias__navbar').selectpicker('refresh');
            localStorage.setItem('categorias__navbar', ctg_paramsURLTemp.categoria);
        } else {
            ctg_paramsURLTemp.categoria = "";
            let params_filtro = new URLSearchParams(location.search);
            if (params_filtro.has('categoria')) {
                let page = "filtro-productos.php";
                let new_params, ruta;
                params_filtro.delete('categoria');
                new_params = params_filtro.toString();
                ruta = `${page}?&${new_params}`;
                location.href = ruta;
            }
        }
    } else {
        if (ctg_categoriaTemp) {
            $('.categorias__navbar').val(ctg_categoriaTemp);
            $('.categorias__navbar').selectpicker('refresh');
        }
    }


    $('.' + key).selectpicker('refresh');
}
function cargarDepartamentos() {
    console.log("QUE ES PAIS ORIGEN: ", paisOrigen);
    if (paisOrigen.departamento) {
        if (validarText(paisDeOrigenAux)) {
            paisOrigen = JSON.parse(paisDeOrigenAux);

            if (("" + localLenguaje).toUpperCase() == "EN") {
                paisOrigen.departamento[0].name = "All the departments";

            } else {
                paisOrigen.departamento[0].name = "Todos los departamentos";

            }

            loadingDropdownDepartamentos(paisOrigen, 'dropdown__departamentos');

            // console.log("paisOrigen.departamentoSelect: ", paisOrigen.departamentoSelect);
            if (paisOrigen.departamentoSelect) {
                if (Object.keys(paisOrigen.departamentoSelect).length > 0) {

                } else {
                    paisOrigen.departamentoSelect = paisOrigen.departamento[0];
                }
            } else {
                paisOrigen.departamentoSelect = paisOrigen.departamento[0];
            }
            $('.dropdown__departamentos').val(paisOrigen.departamentoSelect.zone_id);
            $('.dropdown__departamentos').selectpicker('refresh');

        } else {
            loadPage("paises.php");
        }
    }
}
function loadingDropdownDepartamentos(arr = [], key = "") {


    $('.' + key).selectpicker('destroy');

    let htmlOptionPais = "";
    $.each(arr.departamento, function (i, item) {
        htmlOptionPais += `<option value="${item.zone_id}">${item.name}</option>`;
    });
    $('.' + key).html(htmlOptionPais);

    /*$('.' + key ).off('changed.bs.select');
    $('.' + key ).on('changed.bs.select', onChangePais);*/

    $('.' + key).selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false
    });
    $('.' + key).selectpicker('refresh');
}
// 26 de agosto 2020
function buscarPais(atributo = "country_id", value = 0) {
    if (paisesJSON.length > 0) {
        let pos = paisesJSON.map((item) => { return item[atributo] + "" }).indexOf(value + "");
        // console.log("POS BUSCAR PAIS: ", pos);
        if (pos > -1) {
            //  console.log("PAISESJSON[POS]: ", paisesJSON[pos]);
            return paisesJSON[pos];
        } else {
            return null;
        }
    }
}
// 27 de agosto 2020
function toFilterProductosObject(params = {}, page = "filtro-productos.php") {
    let contentPath = "";
    let index = 0;
    for (let key in params) {
        if (params[key] != null && params[key] != undefined && params[key] != "") {
            if (index == 0) {
                contentPath += `${key}=${params[key]}`;
            } else {
                contentPath += `&${key}=${params[key]}`;
            }
            index++;
        }
    }
    let ruta = `${page}?${contentPath}`;
    location.href = ruta;
}
function isValidParamUrl(item = "") {
    if (item == null || item == "") {
        return false;
    } else {
        return true;
    }
}
function getParamsFilterProductsURL() {
    let params = new URLSearchParams(location.search)
    let datos = {};
    if (typeof params != 'undefined' && params != null) {
        datos = {
            pais: (isValidParamUrl(params.get('pais')) ? params.get('pais') : ""),
            iso_code_2: (isValidParamUrl(params.get('iso_code_2')) ? params.get('iso_code_2') : ""),
            // lang: (isValidParamUrl(params.get('lang')) ? params.get('lang') : ""),
            iso_code_2_money: iso_code_2_money,
            iso_code: (isValidParamUrl(params.get('iso_code')) ? params.get('iso_code') : ""),
            pagina: (isValidParamUrl(params.get('pagina')) ? params.get('pagina') : ""),
            exposicion: (isValidParamUrl(params.get('exposicion')) ? params.get('exposicion') : ""),
            condicion_producto: (isValidParamUrl(params.get('condicion_producto')) ? params.get('condicion_producto') : ""),
            garantia: (isValidParamUrl(params.get('garantia')) ? params.get('garantia') : ""),
            oferta: (isValidParamUrl(params.get('oferta')) ? params.get('oferta') : ""),
            departamento: (isValidParamUrl(params.get('departamento')) ? params.get('departamento') : ""),
            producto_nombre: (isValidParamUrl(params.get('producto_nombre')) ? params.get('producto_nombre') : ""),
            empresa: (isValidParamUrl(params.get('empresa')) ? params.get('empresa') : ""),
            categoria: (isValidParamUrl(params.get('categoria')) ? params.get('categoria') : ""),
            subcategoria: (isValidParamUrl(params.get('subcategoria')) ? params.get('subcategoria') : ""),
            envio: (isValidParamUrl(params.get('envio')) ? params.get('envio') : ""),
            ordenamiento: (isValidParamUrl(params.get('ordenamiento')) ? params.get('ordenamiento') : ""),
            mas_vendidos: (isValidParamUrl(params.get('mas_vendidos')) ? params.get('mas_vendidos') : "")
        };

        if (paisOrigen) {
            let departamentoID = 0;
            if (paisOrigen.departamentoSelect) {
                departamentoID = paisOrigen.departamentoSelect.zone_id;
            } else {
                // departamentoID = paisOrigen.departamento[0].zone_id;
            }
            datos.pais = (datos.pais == "" ? paisOrigen.country_id : datos.pais);
            datos.iso_code_2 = (datos.iso_code_2 == "" ? paisOrigen.iso_code_2 : datos.iso_code_2);
            datos.iso_code_2_money = iso_code_2_money;
            datos.departamento = (datos.departamento == "" ? departamentoID : datos.departamento);
        }

        datos.iso_code_2 = (datos.iso_code_2 == "" ? "US" : datos.iso_code_2);
        datos.iso_code_2_money = iso_code_2_money;
        datos.pagina = (datos.pagina == "" ? 1 : datos.pagina);

    } else {
        datos = {
            pais: "",
            iso_code_2: "",
            iso_code_2_money: iso_code_2_money,
            pagina: "",
            exposicion: "",
            condicion_producto: "",
            garantia: "",
            oferta: "",
            departamento: "",
            producto_nombre: "",
            empresa: "",
            categoria: "",
            subcategoria: "",
            envio: "",
            ordenamiento: "",
            mas_vendidos: ""
        };

        if (paisOrigen) {
            let departamentoID = 0;
            if (paisOrigen.departamentoSelect) {
                departamentoID = paisOrigen.departamentoSelect.zone_id;
            }
            datos.pais = (datos.pais == "" ? paisOrigen.country_id : datos.pais);
            datos.iso_code_2 = (datos.iso_code_2 == "" ? paisOrigen.iso_code_2 : datos.iso_code_2);
            datos.iso_code_2_money = (datos.iso_code_2_money == "" ? paisOrigen.iso_code_2_money : datos.iso_code_2_money);
            datos.departamento = (datos.departamento == "" ? departamentoID : datos.departamento);
        }

        datos.iso_code_2 = (datos.iso_code_2 == "" ? "US" : datos.iso_code_2);
        datos.iso_code_2_money = iso_code_2_money;
        datos.pagina = (datos.pagina == "" ? 1 : datos.pagina);
    }

    return datos;
}
function getBanner(bannerID = "", datos) {

    let data_url = `${baseurl}/controllers/producto/?banner_home`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: datos,
        dataType: "json",
        success: success => {
            if (success['status'] == "success") {
                if (datos.data.tipo == "3" || datos.data.tipo == "4" || datos.data.tipo == "5") {
                    loadingBannerSubastas(bannerID, success)
                } else if (datos.data.tipo * 1 == 2) {
                    loadingBannerPantallaCompleta(bannerID, success);
                } else {
                    loadingBannerGeneral(bannerID, success);
                }
            } else {
                $(bannerID).hide("fast");
            }
        }, error: error => {
            $(bannerID).hide("fast");
        }
    });
}
function loadingBannerSubastas(key = "", datos) {
    let htmoItem = "";
    $.each(datos.data, function (i, item) {
        let imagenProducto = "";
        if (item.foto_portada != "") {
            imagenProducto = item.img;
        } else {
            imagenProducto = imageDefault;
        }
        let button = ``;
        if (validarText(item.button)) {
            button = `<a href="${item['button-url']}"><button>${item.button}</button></a>`
        }

        item.nota = (item.nota ? item.nota : "");
        htmoItem =
            `<div class="item">
            <div class="row row-carousel p-0">
                <div class="col-lg-6">
                    <div class="container-text-carousel">
                        <h1>${item.titulo}</h1>
                        <p>${item.subtitulo}</p>
                        ${button}
                       
                    </div>
                </div>
                <div class="col-lg-6 p-0">
                    <img loading="lazy" src="${imagenProducto}" alt="${item.titulo} - nasbi.com">

                </div>
                <p class="text-blck">${item.nota}</p>
            </div>
        </div>`;
        $(key).owlCarousel('add', htmoItem).owlCarousel('refresh');
    });
}
function loadingBannerPantallaCompleta(key = "", datos) {
    let htmoItem = "";
    $.each(datos.data, function (i, item) {
        let imagenProducto = "";
        if (item.foto_portada != "") {
            imagenProducto = item.img;
        } else {
            imagenProducto = imageDefault;
        }
        let button = ``;
        if (validarText(item.button) && !validarText(user)) {
            button = `<a href="${item['button-url']}"><button class="btn-comprar">${item.button}</button></a>`
        }
        htmoItem =
            `<div class="item">
            <div class="row row-carousel">
                <div class="col-lg-12 px-0">
                    <div class="container-text-carousel">
                        <h1><span>${item.titulo}</span></h1>
                        <p>${item.subtitulo ? item.subtitulo : ""}</p>
                        ${button}
                    </div>
                    <img loading="lazy" src="${imagenProducto}" alt="${item.titulo} - nasbi.com">
                </div>
            </div>
        </div>`;
        $(key).owlCarousel('add', htmoItem).owlCarousel('refresh');
    });
}
function loadingBannerGeneral(key = "", datos) {
    let htmoItem = "";
    $.each(datos.data, function (i, item) {
        let imagenProducto = "";
        if (item.foto_portada != "") {
            imagenProducto = item.img;
        } else {
            imagenProducto = imageDefault;
        }
        let button = ``;
        if (validarText(item.button)) {
            button = `<a href="${item['button-url']}"><button class="btn-comprar">${item.button}</button></a>`
        }
        htmoItem =
            `<div class="item">
            <div class="row row-carousel p-0">
                <div class="col-lg-5">
                    <div class="container-text-carousel">
                        <h1>${item.titulo}</h1>
                        <p>${item.subtitulo ? item.subtitulo : ""}</p>
                        ${button}
                       
                    </div>
                </div>
                <div class="col-lg-7 p-0">
                    <img loading="lazy" src="${imagenProducto}" alt="${item.titulo} - nasbi.com">

                </div>
            </div>
        </div>`;
        $(key).owlCarousel('add', htmoItem).owlCarousel('refresh');
    });
}

// 28 de agosto 2020
function generateItemsHtml(keysPage = {}, datos = {}) {
    let htmlContentItems = "";
    let htmlContentItemsPagination = "";
    $(keysPage.content).empty();
    $.each(datos.data, (i, item) => {
        let htmlOferta = "";
        if (item.oferta == tieneOferta) {
            htmlOferta = `<p class="descuento"><span>${item.precio_local_user_mask} ${item.moneda_local_user}</span> ${item.porcentaje_oferta}% OFF</p>`;
        }
        let imagenProducto = "";
        if (item.foto_portada != "") {
            imagenProducto = item.foto_portada;
        } else {
            imagenProducto = imageDefault;
        }
        htmlContentItems += `
        <div class="col-sm-6 col-lg-4">
            <a href="./producto.php?uid=${item.id}">
                <div class="row row-container-destacado">
                    <div class="col-12 px-2">
                        <div class="container-destacado">
                            <img loading="lazy" src="${imagenProducto}" class="imagen-destacados" alt="${item.producto} - nasbi.com">
                        </div>
                        <h4 class="nombre-producto">${item.titulo}</h4>
                        <div class="div-text-descuento">
                        `+ htmlOferta + `
                        </div>
                        <h4 class="price-product">${item.precio_descuento_local_user_mask} ${item.moneda_local_user}</h4>
                        <p class="descripcion-product">${item.descripcion}</p>
                        <a href="./producto.php?uid=${item.id}"><button class="btn-comprar">${idioma['trans_43']}</button></a>
                    </div>
                </div>
            </a>
        </div>`;
    });
    let paramsPaginationGeneral = {
        total_paginas: datos.total_paginas,
        pagina: datos.pagina,
        classClick: keysPage.content + "_eventClick"
    };
    /*htmlContentItems += generatePaginations(paramsPaginationGeneral);*/
    htmlContentItems += generatePaginationsDynamic(paramsPaginationGeneral);
    $(keysPage.content).html(htmlContentItems);

    generateItemsHtmlVisibility(keysPage, true);
}
function generateItemsHtmlVisibility(keysPage, isVisible = false) {
    if (isVisible) {
        $(keysPage.content).show("slow");
        $(keysPage.contentNoData).hide("fast");
    } else {
        $(keysPage.content).hide("fast");
        $(keysPage.contentNoData).show("slow");
    }
}
function loadingDropdownCondicionProducto(key = "") {
    $(key).empty();

    let htmlItem = "";
    htmlItem += `<option value="${condicion_producto.todos}">${idioma['trans_47']}</option>`;
    htmlItem += `<option value="${condicion_producto.nuevo}">${idioma['trans_48']}</option>`;
    htmlItem += `<option value="${condicion_producto.usado}">${idioma['trans_49']}</option>`;
    htmlItem += `<option value="${condicion_producto.reacondicionado}">${idioma['trans_50']}</option>`;

    $(key).html(htmlItem);
    $(key).selectpicker({
        size: 7,
        dropupAuto: false
    });
    $(key).selectpicker('refresh');
}
function loadingDropdownGarantia(key = "") {
    $(key).empty();

    let htmlItem = "";
    htmlItem += `<option value="${garantia.todos}">${idioma['trans_47']}</option>`;
    htmlItem += `<option value="${garantia.si}">${idioma['trans_53']}</option>`;
    htmlItem += `<option value="${garantia.no}">${idioma['trans_54']}</option>`;

    $(key).html(htmlItem);
    $(key).selectpicker({
        size: 7,
        dropupAuto: false
    });
    $(key).selectpicker('refresh');
}
function loadingDropdownOferta(key = "") {
    $(key).empty();

    let htmlItem = "";
    htmlItem += `<option value="${oferta.todos}">${idioma['trans_47']}</option>`;
    htmlItem += `<option value="${oferta.si}">${idioma['trans_53']}</option>`;
    htmlItem += `<option value="${oferta.no}">${idioma['trans_54']}</option>`;

    $(key).html(htmlItem);
    $(key).selectpicker({
        size: 7,
        dropupAuto: false
    });
    $(key).selectpicker('refresh');
}

function loadingItemsEmpresasHtml(keysPage = {}, datos = {}) {
    let htmlContentItems = "";
    let htmlContentItemsPagination = "";

    $(keysPage.content).empty();

    $.each(datos.data, (i, item) => {
        htmlContentItems +=
            `<div class="col-md-6 col-lg-4">
            <div class="container-gray"></div>
            <div class="container-img">
                <img loading="lazy" src="${getvalidateImage(item.foto_logo_empresa)}" alt="${item.nombre_empresa} - nasbi.com" class="img-empresa">
            </div>

            <div class="owl-carousel carousel-empresas owl-theme carousel-product-empresas">
            `+ generateCarouselEmpresa(item.productos) + `
            </div>
            <p class="descrip-empresa">${item.nombre_empresa}</p>
            <button class="btn-tienda" onclick="loadPage('productos-empresa.php?empresa=${item.id}')">${idioma['trans_59']}</button>
        </div>`;
    });
    let paramsPaginationGeneral = {
        total_paginas: datos.total_paginas,
        pagina: datos.pagina
    };
    htmlContentItems += generatePaginations(paramsPaginationGeneral);
    $(keysPage.content).html(htmlContentItems);
    $('.carousel-product-empresas').owlCarousel('refresh');
    generateItemsHtmlVisibility(keysPage, true);
}
function generateCarouselEmpresa(datos = []) {
    let htmlContentSubItems = "";
    $.each(datos, (i, item) => {
        htmlContentSubItems +=
            `<div class="item">
            <div class="container-product-empresa">
                <img loading="lazy" src="${getvalidateImage(item.foto_portada)}" class="product-empresa" alt="${item.titulo} - nasbi.com">
            </div>
        </div>`;
    });
    return htmlContentSubItems;
}
function getvalidateImage(image = "") {
    let imagenProducto = "";
    if (image != "" && image != undefined && image != null) {
        imagenProducto = image;
    } else {
        imagenProducto = imageDefault;
    }
    return imagenProducto;
}


// 29 de agosto 2020
function getProductoByParams(params = {}) {
    //  console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\nproducto.php: ", params);
    let data_url = baseurl + "/controllers/producto/?producto";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'POST',
            data: params,
            dataType: 'json',
        }).done((result) => {

            if (result["status"] == 'success') {
                resolve(result.data);
            } else if (result["status"] == 'errorStock') {
                presentAlertObject({ icon: 'error', text: idioma['trans_327'] });
                resolve(result.data);
            } else {
                resolve(null);
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma['trans_326'] });
            resolve(null);
        });
    });
}
function getProductoPicturesByParams(params = {}) {
    let data_url = baseurl + "/controllers/producto/?fotos_producto";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'POST',
            data: params,
            dataType: 'json',
        }).done((result) => {

            if (result["status"] == 'success') {
                resolve(result.data);
            } else {
                resolve(null);
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans216_ });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
            reject(null);
        });
    });
}
function getProductoRateByParams(params = {}) {
    let data_url = baseurl + "/controllers/producto/?calificaciones_producto";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'POST',
            data: params,
            dataType: 'json',
        }).done((result) => {

            if (result["status"] == 'success') {
                resolve(result.data);
            } else {
                resolve(null);
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans279 });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
            reject(null);
        });
    });
}
function getProductoQuestionsByParams(params = {}) {
    let data_url = baseurl + "/controllers/producto/?preguntas_producto";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'POST',
            data: params,
            dataType: 'json',
        }).done((result) => {

            if (result["status"] == 'success') {
                resolve(result);
            } else {
                resolve(null);
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans280 });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
            reject(null);
        });
    });
}
function getProductoDatosVendedorByParams(params = {}) {
    let data_url = baseurl + "/controllers/datos_vendedor/?calificacion";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'POST',
            data: params,
            dataType: 'json',
        }).done((result) => {

            if (result["status"] == 'success') {
                resolve(result);
            } else {
                resolve(null);
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans281 });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
            reject(null);
        });
    });
}
function getProductoProductosDelVendedorByParams(params = {}) {
    let data_url = baseurl + "/controllers/producto/?productos_vendedor";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'POST',
            data: params,
            dataType: 'json',
        }).done((result) => {

            if (result["status"] == 'success') {
                resolve(result);
            } else {
                resolve(null);
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans282 });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
            reject(null);
        });
    });
}
function getRatesIcons(rate = 0) {
    let html = "";
    for (let index = 1; index <= 5; ++index) {
        if (index <= rate) {
            html += `<i class="fas fa-star orange"></i>`;
        } else {
            html += `<i class="fas fa-star"></i>`;
        }
    }
    return html;
}
function getFechaSinHora(data) {
    let fecha = new Date(data);
    let mes = ((fecha.getMonth() + 1) < 10 ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1));
    let dia = (fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate());
    return fecha.getFullYear() + "-" + mes + '-' + dia;
}
function getFechaSoloHora(data) {
    let fecha = new Date(data);

    let hora = (fecha.getHours() < 10 ? '0' + fecha.getHours() : fecha.getHours());
    let minutos = (fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes());

    return hora + ':' + minutos;
}
function getFechaConHora(data) {

    let fecha = new Date(data);
    let mes = ((fecha.getMonth() + 1) < 10 ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1));
    let dia = (fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate());

    let hora = (fecha.getHours() < 10 ? '0' + fecha.getHours() : fecha.getHours());
    let minutos = (fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes());

    return fecha.getFullYear() + "-" + mes + '-' + dia + '  ' + hora + ':' + minutos;
}
function getFechaConHoraV2(data) {

    let fecha = new Date(data);
    let mes = ((fecha.getMonth() + 1) < 10 ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1));
    let dia = (fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate());

    let hora = (fecha.getHours() < 10 ? '0' + fecha.getHours() : fecha.getHours());
    let minutos = (fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes());

    return dia + "/" + mes + '/' + fecha.getFullYear() + '  ' + hora + ':' + minutos;
}
function getClasificacionVendedorByRate() {
    return {
        type: 1

    }
}
function getPaisDeOrigen() {
    if (paisOrigen) {
        return paisOrigen;
    } else {
        return JSON.parse(paisDeOrigenAux);
    }
}

//01 de septiembre 2020
function validate(userAuthData, nextStep) {
    if (nextStep == 1) return true
    let list_errors = "";
    if (grecaptcha.getResponse(nextStep) || (location.href + "").includes("localhost")) {
        if (userAuthData.user.trim().length == 0) {
            list_errors += "<br>" + idioma["trans_10"];
        }
        if (userAuthData.password.trim().length == 0) {
            list_errors += "<br>" + idioma["trans_11"];
        }
        if (list_errors.length > 0) {
            presentAlert(idioma['trans_04'], list_errors, 'error');
            return false;
        } else {
            return true;
        }
    } else {
        presentAlert(idioma['trans_04'], idioma['trans_05'], 'error');
        return false;
    }
    /* if (grecaptcha.getResponse() || nextStep != 0 || (location.href + "").includes("localhost")) {
    } else {
        presentAlert(idioma['trans_04'], idioma['trans_05'], 'error');
        return false;
    } */
}
function validateEmpresa(empresaAuthData, captcha) {
    if (captcha == 1) return true
    let list_errors = "";
    if (grecaptcha.getResponse(captcha) || (location.href + "").includes("localhost")) {

        if (empresaAuthData.correo.trim().length == 0) {
            list_errors += "<br>" + idioma["trans_10"];
        }
        if (empresaAuthData.clave.trim().length == 0) {
            list_errors += "<br>" + idioma["trans_11"];
        }
        if (list_errors.length > 0) {
            presentAlert(idioma['trans_04'], list_errors, 'error');
            return false;
        } else {
            return true;
        }
    } else {
        presentAlert(idioma['trans_04'], idioma['trans_05'], 'error');
        return false;
    }
}
async function auth(userAuthData, nextStep = 0) {
    // console.log("EN FUNCION AUTH");
    if (validate(userAuthData, nextStep)) {
        if (getCookie("token") != null && getCookie("token") != "") {
            userAuthData["tokenfb"] = getCookie("token");
        }
        if (getCookie("plataforma") != null && getCookie("plataforma") != "") {
            userAuthData["plataforma"] = getCookie("plataforma");
        }
        if (getCookie("device") != null && getCookie("device") != "") {
            userAuthData["device"] = getCookie("device");
        }
        //  console.log("userAUTHDATA: ", userAuthData);
        datos = await authConsulta(userAuthData);
        //  console.log("DATO EN AUTH: ", datos);
        if (datos['status'] == "success") {
            user = datos.data[0];
            user.empresa = 0;
            user.uid = user.id;
            user.idioma = user.idioma ? user.idioma.toUpperCase() : null
            delete (user.id);

            let mi_nacionalidad = await getNacionalidadUsuario(user)
            if (mi_nacionalidad.res) {
                let paisOrigenTemp = buscarPais('country_id', mi_nacionalidad.data.pais_country_id);
                paisOrigen = paisOrigenTemp;
                console.log("paisOrigen en auth: ", paisOrigen);
                paisOrigen.departamentoSelect = paisOrigen.departamento[0].zone_id;
                localStorage.setItem("iso_code_2_money", mi_nacionalidad.data.pais_iso_code_2)
                iso_code_2_money = mi_nacionalidad.data.pais_iso_code_2
                paisOrigen.iso_code_2_money = iso_code_2_money;
                let moneda = Object.values(divisasJSON).filter(row => (row.iso_code_2 == iso_code_2_money))[0]
                user.fiat = moneda.code
            } else if (mi_nacionalidad.motivo == "noRegistradoUsuario") {
                user.paisid = paisesJSON.filter(f => f.iso_code_2 == user.paisid)[0].country_id
                let enviar_nac = await enviarNacionalidadUsuario(user)
                if (enviar_nac) {
                    let mi_nacionalidad = await getNacionalidadUsuario(user)
                    if (mi_nacionalidad.res) {
                        let paisOrigenTemp = buscarPais('country_id', mi_nacionalidad.data.pais_country_id);
                        paisOrigen = paisOrigenTemp;
                        console.log("paisOrigen en auth: ", paisOrigen);
                        paisOrigen.departamentoSelect = paisOrigen.departamento[0].zone_id;
                        localStorage.setItem("iso_code_2_money", mi_nacionalidad.data.pais_iso_code_2)
                        iso_code_2_money = mi_nacionalidad.data.pais_iso_code_2
                        paisOrigen.iso_code_2_money = iso_code_2_money;
                        user.paisid = iso_code_2_money;
                        let moneda = Object.values(divisasJSON).filter(row => (row.iso_code_2 == iso_code_2_money))[0]
                        user.fiat = moneda.code
                    }

                } else {
                    ///iso code tomado del paisOrigen
                    paisOrigen = buscarPais('country_id', user.paisid);
                    console.log("paisOrigen en auth: ", paisOrigen, user.paisid);
                    paisOrigen.departamentoSelect = paisOrigen.departamento[0].zone_id;

                    iso_code_2_money = paisOrigen.iso_code_2
                    localStorage.setItem("iso_code_2_money", iso_code_2_money)
                    paisOrigen.iso_code_2_money = iso_code_2_money;
                    user.paisid = iso_code_2_money
                    let moneda = Object.values(divisasJSON).filter(row => (row.iso_code_2 == iso_code_2_money))[0]
                    user.fiat = moneda.code
                }


                // try {
                //     if (divisasJSON[datos.data[0].fiat]) {
                //         if (datos.data[0].fiat == "USD") {
                //             console.log("vino USD")
                //             localStorage.setItem("iso_code_2_money", "US");
                //             iso_code_2_money = "US";
                //         } else {
                //             console.log("vino pero no USD")
                //             if (!divisasJSON[datos.data[0].fiat].iso_code_2) {
                //                 divisasJSON[datos.data[0].fiat].iso_code_2 = "CO";
                //             }
                //             localStorage.setItem("iso_code_2_money", divisasJSON[datos.data[0].fiat].iso_code_2);
                //             iso_code_2_money = divisasJSON[datos.data[0].fiat].iso_code_2;
                //         }
                //     } else {
                //         console.log("vino vacio o null")
                //         localStorage.setItem("iso_code_2_money", paisOrigen.iso_code_2);
                //         iso_code_2_money = paisOrigen.iso_code_2;
                //     }
                // } catch (ex) {
                //     console.log("el catch")
                //     localStorage.setItem("iso_code_2_money", paisOrigen.iso_code_2);
                //     iso_code_2_money = paisOrigen.iso_code_2;
                // }
                // console.log("PAIS ORIGEN EN AUTH ------: ", paisOrigen);
                // localStorage.setItem("paisOrigen", JSON.stringify(paisOrigen));
                // if (!iso_code_2_money) {
                //     iso_code_2_money = 'CO';
                // }

            } else {
                ///iso code tomado del paisOrigen

                paisOrigen = buscarPais('iso_code_2', datos.data[0].paisid);
                console.log("paisOrigen en auth: ", paisOrigen);
                paisOrigen.departamentoSelect = paisOrigen.departamento[0].zone_id;
                iso_code_2_money = paisOrigen.iso_code_2
                localStorage.setItem("iso_code_2_money", iso_code_2_money)
                paisOrigen.iso_code_2_money = iso_code_2_money;
                user.paisid = iso_code_2_money
                let moneda = Object.values(divisasJSON).filter(row => (row.iso_code_2 == iso_code_2_money))[0]
                user.fiat = moneda.code

            }

            $('.dropdown__departamentos').val(paisOrigen.departamentoSelect.zone_id);

            loadingDropdownDepartamentos(paisOrigen, 'dropdown__departamentos');






            //  console.log("AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIII \n\n\n\n")
            localStorage.setItem("userAuth", JSON.stringify(user));

            let userAux = JSON.parse(localStorage.getItem("userAuth"));

            if (("" + userAux.idioma).toUpperCase() == "ES") {
                localStorage.setItem('lenguaje', "ES");
            } else if (("" + userAux.idioma).toUpperCase() == "EN") {
                localStorage.setItem('lenguaje', "EN");
            } else {
                localStorage.setItem('lenguaje', getDefaultIdioma());
                console.log("AUTH --", localStorage.getItem('lenguaje'));


                // console.log("AUTH funcion getdefaulidioma--", getDefaultIdioma());
            }
            document.cookie = "lenguaje=" + encodeURIComponent(localStorage.getItem("lenguaje"));

            menuBasicConfigPostAuth(userAux);

            isValidadReferNegocio(userAux);

            countMyCartsAuth(user);

            getNotificaciones(user);

            validar_limite_3_estado1_exposicion(user);

            // agregar_variable_idioma_en_page(); 
            cargarPrimero();

            //   validarClave();

            //  $('.menu__opt__configuracion').prop('href', 'mis-cuentas.php?tokenPageView=id-configuracion');
            let redir = await getParamsCorreoDardeBaja()
            if (!redir) {


                if (nextStep == 0) {
                    $('#modal-login').modal('hide');

                    if (userAux.status == 0) {
                        presentAlert(idioma['trans165'], idioma['_trans880'])
                        $('#modal-presentAlert-info').on('hidden.bs.modal', async function () {
                            let respuesta_clave_transacciones = await validarClave();
                            if (!respuesta_clave_transacciones) {
                                loadPage("promociones.php")
                            }
                        });

                    } else {
                        $("#modal-login").on('hidden.bs.modal', function () {
                            $('#bienvenida-promociones-home').modal('toggle');
                            $("#bienvenida-promociones-home").on('hidden.bs.modal', async function () {
                                let respuesta_clave_transacciones = await validarClave();
                                if (!respuesta_clave_transacciones) {
                                    if (!('' + location.href).includes("promociones.php")) {
                                        // location.reload();
                                        //location.href = "index.php";
                                        let new_url = new URL(location.href);
                                        let new_params = new URLSearchParams(new_url.search);
                                        if (new_params.has('lang')) {
                                            new_params.set('lang', localLenguaje);
                                            //  console.log("NEW_PARAMS: ", new_params.toString());
                                            if (!new_params.has('nle')) {
                                                new_params.delete('lang');
                                                new_params.delete('iso_code');
                                                new_params.delete('country');
                                                let lenguaje_actual_funcion = localStorage.getItem('lenguaje');
                                                new_params.set('nle', lenguaje_actual_funcion);
                                            }
                                            new_url = location.href.split("?")[0];
                                            new_url = new_url + "?" + new_params.toString();
                                            console.log("NEW_URL :", new_url);

                                            location.href = new_url;
                                        }
                                    }
                                }
                            });
                        });

                    }


                } else {

                    presentAlert(idioma['trans165'], idioma['_trans880'])
                    $('#modal-presentAlert-info').on('hidden.bs.modal', async function () {
                        let respuesta_clave_transacciones = await validarClave();
                        if (!respuesta_clave_transacciones) {
                            $(location).attr('href', "promociones.php")
                        }
                    });


                }
            }

        } else {
            presentAlert(idioma['trans_04'], idioma['trans_68'], 'error');
        }
    }
}
function authConsulta(userAuthData) {
    return new Promise((resolve, reject) => {
        let data_url = `${baseurl}/controllers/usuario_nasbi/?login`;
        $.ajax({
            type: "POST",
            url: data_url,
            data: userAuthData,
            dataType: "json",
            success: async result => {

                // console.log("\n\n\n*****************");
                // console.log("-------+> [ result ]: ", result);
                // console.log("-------+> [ result.status ]: ", result.status);
                // console.log("-------+> [ result.data[0].status ]: ", result.data[0].status);

                if (result.status == "success" && result.data[0].status == 0) {
                    $("#validar-registro-empresa").modal("toggle")
                    $(".validar_codigo_registro").off()
                    $(".validar_codigo_registro").on('click', async function () {
                        let codigo = $(".registro_empresa_codigo").val();
                        if (!validarText(codigo)) return presentAlert(idioma['trans_04'], idioma['_trans863'])
                        let response_validar = await getValidacionCodigoUsuario(codigo);
                        if (response_validar) {
                            resolve(result);
                        }
                    })
                } else if (result.status == "success") {
                    console.log("EL RESULTADO: ", result.data[0]);
                    // console.log("\n");
                    // console.log("-------+> [ result2 ] ------: ");


                    if (result.data[0].inactivo == 2) {
                        // result.data[0].inactivo == 2: Usuario que se dio de baja
                        let activar = await presentAlertModalConfirm({ tittle: idioma['_trans896'], text: idioma['_trans897'] })
                        if (activar) {

                            // console.log("SE VA A ACTIVAR");
                            let activo = await new Promise((resolve, reject) => {
                                $.ajax({
                                    type: "POST",
                                    url: 'https://peers2win.com/api/controllers/users/?darse_de_alta',
                                    data: { data: { id: result.data[0].id } },
                                    dataType: "json",
                                    success: result2 => {
                                        // console.log("-------+> [ result2 ]: ", result2);
                                        // console.log("-------+> [ result2.status ]: ", result2.status);
                                        // console.log("-------+> [ result2.data[0].status ]: ", result2.data[0].status);

                                        // $(".validar_codigo_registro").off()
                                        // $(".validar_codigo_registro").on('click', async function () {
                                        //     let codigo = $(".registro_empresa_codigo").val();
                                        //     if (!validarText(codigo)) return presentAlert(idioma['trans_04'], idioma['_trans863'])
                                        //     let response_validar = await getValidacionCodigoUsuario(codigo);
                                        //     if (response_validar) {
                                        //         resolve(result);
                                        //     }
                                        // })
                                        // console.log("resultado: ",result);
                                        result.data[0].inactivo = 1;
                                        // let userAuthDataActivated = {
                                        //     user: $(".nasbi__input__username").val().trim(),
                                        //     password: $(".nasbi__input__password").val().trim()
                                        // };
                                        // auth(userAuthDataActivated);
                                        resolve(result2);
                                    },
                                    error: error => {
                                        resolve(false);
                                        //  console.log(error);
                                        reject({ "status": "fail" });
                                    }
                                });
                            });
                            if (activo) {
                                resolve(result);
                            }
                        }
                    } else {
                        resolve(result);
                    }
                } else {
                    resolve(result);
                }

            }, error: error => {
                // console.log(error);
                reject({ "status": "fail" });
            }
        });
    });
}
async function loginEmpresaAuth(empresaAuthData, captcha) {

    if (validateEmpresa(empresaAuthData, captcha)) {
        if (getCookie("token") != null && getCookie("token") != "") {
            empresaAuthData["tokenfb"] = getCookie("token");
        }
        if (getCookie("plataforma") != null && getCookie("plataforma") != "") {
            empresaAuthData["plataforma"] = getCookie("plataforma");
        }
        if (getCookie("device") != null && getCookie("device") != "") {
            empresaAuthData["device"] = getCookie("device");
        }

        let data_url = baseurl + "/controllers/empresas/?login";
        $.ajax({
            type: "POST",
            url: data_url,
            data: { data: empresaAuthData },
            dataType: "json",
            success: async success => {
                if (success['status'] == "success") {

                    $('#modal-login').modal('hide');
                    if (success.data.estado == 0) {
                        $("#validar-registro-empresa").modal("toggle")
                        $(".validar_codigo_registro").off()
                        $(".validar_codigo_registro").on('click', async function () {
                            let codigo = $(".registro_empresa_codigo").val();
                            if (!validarText(codigo)) return presentAlert(idioma['trans_04'], idioma['_trans863'])
                            let response_validar = await getValidacionCodigoEmpresa(codigo, success.data.uid);
                            if (response_validar) {
                                $("#validar-registro-empresa").modal("hide")
                                afterLoginEmpresa(success, empresaAuthData)
                            }
                        })
                    } else if (empresaAuthData.desactivar) {
                        let desactivada = await desactivarCuentaUsuario(success.data.uid)
                        if (desactivada) {
                            $("#modal-desactivar-empresa").modal('hide');
                            presentAlert(idioma['_trans12'], idioma['_trans889'])
                            $('#modal-presentAlert-info').on('hidden.bs.modal', function () {
                                logout();
                            });


                        }
                    } else if (success.data.estado == 2) {

                        let activar = await presentAlertModalConfirm({ tittle: idioma['_trans896'], text: idioma['_trans897'] })
                        if (activar) {
                            let activada = await activarCuentaUsuario(success.data.uid)
                            if (activada) {
                                afterLoginEmpresa(success, empresaAuthData)
                            }
                        }


                    } else {
                        afterLoginEmpresa(success, empresaAuthData)
                    }
                } else {
                    presentAlert(idioma['trans_04'], idioma['trans_66'], 'error');
                }

            }, error: error => {
                $("#modal-desactivar-empresa").modal('hide');
                presentAlert(idioma['trans_04'], idioma['trans_67'], 'error');
            }
        });
    } else {
    }
}
async function afterLoginEmpresa(success, empresaAuthData) {

    let mi_nacionalidad = await getNacionalidadUsuario(success.data)
    if (mi_nacionalidad.res) {
        let paisOrigenTemp = buscarPais('country_id', mi_nacionalidad.data.pais_country_id);

        paisOrigen = paisOrigenTemp;
        iso_code_2_money = mi_nacionalidad.data.fiat_iso_code_2;
        paisOrigen.iso_code_2_money = iso_code_2_money;
        success.data.iso_code_2 = iso_code_2_money;

        console.log("--------------+++++++++++++++++>", mi_nacionalidad.data)
    } else if (mi_nacionalidad.motivo == "noRegistradoUsuario") {
        let enviar_nac = await enviarNacionalidadUsuario(success.data)
        if (enviar_nac) {
            let mi_nacionalidad = await getNacionalidadUsuario(success.data)
            if (mi_nacionalidad.res) {
                let paisOrigenTemp = buscarPais('country_id', mi_nacionalidad.data.pais_country_id);

                paisOrigen = paisOrigenTemp;
                iso_code_2_money = mi_nacionalidad.data.fiat_iso_code_2;
                paisOrigen.iso_code_2_money = iso_code_2_money;
                success.data.iso_code_2 = iso_code_2_money;

            }

        } else {
            //iso code tomado de paisORigen
            let paisOrigenTemp = buscarPais('country_id', success.data.pais);
            if (paisOrigenTemp) {
                paisOrigen = paisOrigenTemp;
                paisOrigen.departamentoSelect = paisOrigen.departamento[0].zone_id;

                iso_code_2_money = paisOrigen.iso_code_2;
                paisOrigen.iso_code_2_money = iso_code_2_money;
                success.data.iso_code_2 = iso_code_2_money;
            }
        }
        //     if (success.data.pais) {
        //         let paisOrigenTemp = buscarPais('country_id', success.data.pais);
        //         if (paisOrigenTemp) {
        //             paisOrigen = paisOrigenTemp;
        //             paisOrigen.departamentoSelect = paisOrigen.departamento[0].zone_id;
        //             if (paisOrigen.iso_code_2 == undefined) {
        //                 paisOrigen.iso_code_2 = 'CO';
        //             }
        //             iso_code_2_money = paisOrigen.iso_code_2;
        //             paisOrigen.iso_code_2_money = iso_code_2_money;
        //             success.data.iso_code_2 = iso_code_2_money;
        //         }
        //     }

    } else {
        //iso code tomado de paisORigen
        let paisOrigenTemp = buscarPais('country_id', success.data.pais);
        if (paisOrigenTemp) {
            paisOrigen = paisOrigenTemp;
            paisOrigen.departamentoSelect = paisOrigen.departamento[0].zone_id;

            iso_code_2_money = paisOrigen.iso_code_2;
            paisOrigen.iso_code_2_money = iso_code_2_money;
            success.data.iso_code_2 = iso_code_2_money;
        }

    }

    localStorage.setItem("empresaAuth", JSON.stringify(success.data));
    localStorage.setItem("userAuth", JSON.stringify(success.data));

    let userAux = JSON.parse(localStorage.getItem("userAuth"));
    if (("" + userAux.idioma).toUpperCase() == "ES") {
        localStorage.setItem('lenguaje', "ES");
    } else if (("" + userAux.idioma).toUpperCase() == "EN") {
        localStorage.setItem('lenguaje', "EN");
    } else {
        localStorage.setItem('lenguaje', getDefaultIdioma());
    }
    document.cookie = "lenguaje=" + encodeURIComponent(localStorage.getItem("lenguaje"));
    menuBasicConfigPostAuth(userAux);
    isValidadReferNegocio(userAux);
    getNotificaciones(userAux);
    agregar_variable_idioma_en_page();
    let redir = await getParamsCorreoDardeBaja()
    if (!redir) {



        let redirigir = false
        let campos = [
            "idioma",
            "cargo",
            "nit",
            "foto_asesor",
            "descripcion",
            "pais",
            "tipo_empresa",
            "nombre_empresa",
            "telefono",
            "razon_social",
            "nombre_dueno",
            "foto_logo_empresa",
            "foto_portada_empresa",
        ]
        for (const property in userAux) {
            if (campos.includes(property) && !userAux[property]) {
                redirigir = true
                break
            }
        }
        // console.log(empresaAuthData.mostrar_alerta, "mmmmmmmmmmmmmmmmm");
        if (empresaAuthData.mostrar_alerta) {
            //login donde sea
            if (userAux.estado == 0) {
                $("#bienvenida-empresa-validada").modal("toggle");
                $("#bienvenida-empresa-validada").on('hidden.bs.modal', ($event) => {
                    $(location).attr('href', 'editar-empresa.php');
                })
            } else {
                let res_expo_1 = await validar_si_tiene_mas_de_tres_ventas_estado_1(userAux, false, 1, success.data.id);

                if (res_expo_1) {
                    //si tiene el limite la promesa ya activa el modal 
                } else if (redirigir) {
                    presentAlert(idioma['_trans462'], idioma['_trans881'])
                    $('#modal-presentAlert-info').on('hidden.bs.modal', function () {
                        $(location).attr('href', "editar-empresa.php")
                    });

                } else {
                    $(location).attr('href', 'productos-empresa.php?empresa=' + success.data.id);

                }

            }

        } else {
            //login despues de registro
            $("#bienvenida-empresa-validada").modal("toggle");
            $("#bienvenida-empresa-validada").on('hidden.bs.modal', ($event) => {
                $(location).prop('href', 'editar-empresa.php');
            })
        }
    }

}
function ordenar(array, key, orderby) {
    return array.slice().sort(function (a, b) {
        if (orderby == 'DESC') return parseFloat(a[key]) > parseFloat(b[key]) ? -1 : 1;
        if (orderby == 'ASC') return parseFloat(a[key]) < parseFloat(b[key]) ? -1 : 1;
    });
}
function nasbiCoinsUser({ moneda, ver_trans = 0 }) {
    return new Promise((resolve) => {
        let dataEnviar = {
            data: {
                uid: user.uid,
                empresa: user.empresa,
                // tipo: moneda,
                ver_transacciones: ver_trans,
            }
        };
        if (moneda && moneda != "" || moneda != undefined) {
            dataEnviar.data.tipo = moneda;
        }
        $.ajax({
            type: 'POST',
            url: `${baseurl}/controllers/nasbicoin/?wallet_usuario`,
            data: dataEnviar,
            dataType: 'json',
            "headers": { 'x-api-key': user.token },
        }).done(async (res) => {
            if (res.status != 'success') {
                let validate_token = await erroresTokenEmpresa(res);
                if (!validate_token) return resolve({ status: false, data: null });
            }

            return resolve({ status: true, data: res });
        }).fail((err) => {
            return resolve({ status: false, data: null });
        });
    })
}

// 04 de septiembre 2020 - Funcional
function generatePaginations(params) {
    let htmlContentPagination = "";
    let htmlContentItemsPagination = "";
    if (params.total_paginas > 1) {
        let inicio = ((params.pagina - 2) > 0 ? (params.pagina - 2) : 1);
        let fin = ((inicio + 4) < params.total_paginas ? (inicio + 4) : params.total_paginas);
        if (fin == params.total_paginas) {
            inicio = ((params.pagina - 4) > 0 ? (params.pagina - 4) : 1);
        }
        for (let index = inicio; index <= fin; ++index) {

            htmlContentItemsPagination += `<a onclick="eventGeneratePaginations( ${index} )" class="${(index == params.pagina ? 'active' : '')}">${index}</a>`;
        }
        let btnPrev = "";
        if (params.pagina - 1 > 1) {
            let pag = params.pagina - 1;
            btnPrev = `<a onclick="eventGeneratePaginations( ${pag} )" class="AD">&laquo;</a>`;
        }
        let btnNext = "";
        if (params.pagina + 1 < params.total_paginas) {
            let pag = params.pagina + 1;
            btnNext = `<a onclick="eventGeneratePaginations( ${pag} )" class="AD">&raquo;</a>`;
        }
        let htmlPuntosIndexFin = "";
        if (fin < params.total_paginas) {
            htmlContentItemsPagination += `<a> ... </a>`;

            let pag = params.total_paginas;
            htmlContentItemsPagination += `<a onclick="eventGeneratePaginations( ${params.total_paginas} )" class="AD">${params.total_paginas}</a>`;
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
    return htmlContentPagination;
}

function generatePaginationsDynamic(params) {
    // Esta función recibe los mismos parametros que 'generatePaginations(params)' más un parametro adicional
    // classClick = "CLASE_QUE_ESCUCHA_EVENTO_CLICK"

    if (!params.classClick) {
        params.classClick = "eventClick";
    } else {
        params.classClick = params.classClick.split(".").join("");
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

            htmlContentItemsPagination += `<a id="${index}" class="${(index == params.pagina ? params.classClick + ' active' : params.classClick)}">${index}</a>`;
        }
        let btnPrev = "";
        if (params.pagina - 1 > 1) {
            let pag = params.pagina - 1;
            btnPrev = `<a id="${pag}" class="${params.classClick} AD">&laquo;</a>`;
        }
        let btnNext = "";
        if (params.pagina + 1 < params.total_paginas) {
            let pag = params.pagina + 1;
            btnNext = `<a id="${pag}" class="${params.classClick} AD">&raquo;</a>`;
        }
        let htmlPuntosIndexFin = "";
        if (fin < params.total_paginas) {
            htmlContentItemsPagination += `<a> ... </a>`;

            let pag = params.total_paginas;
            htmlContentItemsPagination += `<a id="${params.total_paginas}" class="${params.classClick} AD">${params.total_paginas}</a>`;
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
    return htmlContentPagination;
}

// 11 septiembre 2020
function obtenerTimeInicio(numero) {
    numero = numero * 1 - (+new Date());
    numero = numero / 1000;
    let hora = parseInt((numero / 3600) + "")
    let minutos = parseInt((numero / 60) % 60 + "");
    let segundos = parseInt((numero % 60) + "");
    let hor = (hora < 10) ? "0" + hora : hora;
    let min = (minutos < 10) ? "0" + minutos : minutos;
    let sec = segundos < 10 ? "0" + segundos : segundos;
    if (minutos <= 0 && segundos <= 0 && hora <= 0) {
        return "0h 0m 0s.";
    }
    return hor + "h " + min + "m " + sec + "s.";
}

// 17 de septiembre 2020
function getWalletByCoin(params = {}) {
    return new Promise((resolve, reject) => {
        let data_url = `${baseurl}/controllers/nasbicoin/?wallet_usuario`
        $.ajax({
            url: data_url,
            type: 'POST',
            data: params,
            dataType: 'json',
            "headers": { 'x-api-key': user.token },
            success: async result => {
                let validate_token = await erroresTokenEmpresa(result);
                if (!validate_token) {
                    resolve(result);
                }

            }, error: error => {
                console.log(error);
                resolve(null);
            }
        });
    });
}

function getLabelCoinByNameID(nameID = "") {
    if (nameID.toLowerCase().includes('gold')) {
        return idioma['trans37_'];
    } else {
        return idioma['trans36_'];
    }
}
function getLabelCoinByNameCropID(nameID = "") {
    if (nameID.toLowerCase().includes('gold')) {
        return "NBC";
    } else if (nameID.toLowerCase().includes('blue')) {
        return "BD";
    } else {
        return nameID;
    }
}

// 26 septiembre 2020
function countMyCartsNotAuth(cartTemp) {
    const counts = cartTemp.data.reduce((count, item) => {
        count += (item.cantidad * 1);
        return count;
    }, 0);
    if (counts > 0) {
        $('.carrito__indicador__producto').text(counts);
    } else {
        $('.carrito__indicador__producto').text('');
    }
    return counts;
}
async function countMyCartsAuth(user = {}) {
    let counts = 0;
    var carritoTemporal = localStorage.getItem('carrito_no_logueado');
    if (validarText(carritoTemporal)) {
        carritoTemporal = JSON.parse(carritoTemporal);
        counts = countMyCartsNotAuth(carritoTemporal);

        if (counts > 0) {
            $('.carrito__indicador__producto').text(counts);
        } else {
            $('.carrito__indicador__producto').text('');
        }
    }
    let labelEsquema = (counts > 0 ? "" + counts : '');

    if (user.empresa * 1 == 0) {
        // Validamos que haya ingresa un usuario más no UNA EMPRESA.
        let dataEnvio = {
            "data":
            {
                "uid": user.uid,
                "empresa": user.empresa
            }
        };

        let data_url = `${baseurl}/controllers/carrito/?contar_carrito_usuario`;
        $.ajax({
            type: "POST",
            url: data_url,
            data: dataEnvio,
            dataType: "json",
            "headers": { 'x-api-key': user.token },
            success: async result => {
                if (result['status'] == "success") {
                    if (result.data * 1 > 0) {
                        $('.carrito__indicador__producto').text((result.data * 1) + counts);

                    } else {
                        $('.carrito__indicador__producto').text(labelEsquema);
                    }
                } else {
                    let validate_token = await erroresTokenEmpresa(result);
                    if (!validate_token) $('.carrito__indicador__producto').text(labelEsquema);

                }
            }, error: error => {
                $('.carrito__indicador__producto').text(labelEsquema);
            }
        });

    }
}

// 29 septiembre 2020


function toPayU(paramsPayU = {}) {
    $('.payU__merchantId').val(paramsPayU.merchantId);
    $('.payU__accountId').val(paramsPayU.accountId);
    $('.payU__description').val(paramsPayU.description);
    $('.payU__referenceCode').val(paramsPayU.referenceCode);

    paramsPayU.extra1 = (paramsPayU.extra1 ? paramsPayU.extra1 : "");
    paramsPayU.extra2 = (paramsPayU.extra2 ? paramsPayU.extra2 : "");
    paramsPayU.extra3 = (paramsPayU.extra3 ? paramsPayU.extra3 : "");

    $('.payU__extra1').val(paramsPayU.extra1);
    $('.payU__extra2').val(paramsPayU.extra2);
    $('.payU__extra3').val(paramsPayU.extra3);

    $('.payU__amount').val(paramsPayU.amount);
    $('.payU__tax').val(paramsPayU.tax);
    $('.payU__taxReturnBase').val(paramsPayU.taxReturnBase);
    $('.payU__currency').val(paramsPayU.currency);
    $('.payU__signature').val(paramsPayU.signature);
    $('.payU__test').val(paramsPayU.test);
    $('.payU__lng').val(localLenguaje.toLowerCase());

    $('.payU__buyerFullName').val(paramsPayU.buyerFullName);
    $('.payU__buyerEmail').val(paramsPayU.buyerEmail);
    $('.payU__responseUrl').val(paramsPayU.responseUrl);
    $('.payU__confirmationUrl').val(paramsPayU.confirmationUrl);

    // console.log("$('#payuDataFrom').val(): ", $('#payuDataFrom').html());
    $('#payuDataFrom').submit();
}

async function isValidadReferNegocio(user = {}) {
    $('.referir__negocio__refercode').val("");
    let tipo_usuario = await get_tipo_usuario(user)
    // if (user.fecha_fin == null || user.fecha_inicio == null) {
    if (tipo_usuario.id != 1) {
        $('.menu__user__referir__negocio').hide();
        $('.menu__user__resumen__negocio').hide();
        return false;
    } else {
        $('.menu__user__referir__negocio').show();
        let fechaInicio = + new Date(user.fecha_ingreso);
        let fechaFin = + new Date(user.fecha_fin_membresia);
        let tiempoPendiente = (fechaFin - fechaInicio);
        let diff_en_dias = parseInt(tiempoPendiente / 86400000);

        // console.log("\n\n\n\n\n\n\n\n");
        // console.log(" [ diff_en_dias ]:  ", diff_en_dias);
        if (diff_en_dias > 0) {
            // if (!user.referido) {
            // $('.menu__user__resumen__negocio').hide();
            // return false;
            // } else {
            $('.menu__user__resumen__negocio').show();
            $('.referir__negocio__refercode').val(user.uid);
            return true;
            // }
        } else {
            $('.menu__user__resumen__negocio').hide();
            return false;
        }
    }
}

// 08 octubre 2020
async function menuBasicConfigPostAuth(user) {
    //  console.log("MENU BASIC CONFIG POST AUTH");

    let userAux = JSON.parse(localStorage.getItem("userAuth"));
    if (validarText(userAux)) {
        //  console.log("EN MENU BASIC IF");
        //  console.log("USER AUX: ", userAux);
        //let userAux = user;//JSON.parse(localStorage.getItem("userAuth"));
        $('.menu_auth__username').text(idioma['trans_170'] + ' ' + userAux.username);

        getMyPoints(userAux);
    } else {
        $('.menu_auth__username').text(idioma['_trans102']);
        // console.log("EN MENU BASIC ELSE: ", iso_code_2_money_aux);
        if (iso_code_2_money_aux != "") {
            //  console.log("en el IF MENU");
            // let paisesJSON_dire = JSON.parse(localStorage.getItem('paises'));
            // let pais_iso_code_de_url  = paisesJSON_dire.filter(pais => pais.iso_code_2 == iso_code_2_money_aux)[0];
            userAux = {
                foto: "",
                fiat: iso_code_2_money_aux,
            };
        } else {
            // console.log("en el ELSE MENU");
            userAux = {
                foto: "",
                fiat: "USD"
            };
        }

    }
    let usuario_valido = await validar_subasta_usuario(userAux)
    if (usuario_valido.opcion == 2) {
        $(".menu_user__subastas").attr('href', '#')
        $(".menu_user__subastas").find(".trans68_").css("color", "#707070")

    }
    if (validarText(userAux.foto) || validarText(userAux.avatar)) {
        userAux.avatar = "" + userAux.avatar;
        userAux.foto = "" + userAux.foto;

        if (("0.png").includes("" + userAux.foto) || ("0.png").includes("" + userAux.avatar)) {
            $('.menu_auth__avatar').prop('src', '../imagen/avatar/0.png');

        } else if (("1.png").includes("" + userAux.foto) || ("1.png").includes("" + userAux.avatar)) {
            $('.menu_auth__avatar').prop('src', '../imagen/avatar/1.png');

        } else if (("2.png").includes("" + userAux.foto) || ("2.png").includes("" + userAux.avatar)) {
            $('.menu_auth__avatar').prop('src', '../imagen/avatar/2.png');

        } else if (("3.png").includes("" + userAux.foto) || ("3.png").includes("" + userAux.avatar)) {
            $('.menu_auth__avatar').prop('src', '../imagen/avatar/3.png');

        } else if (("4.png").includes("" + userAux.foto) || ("4.png").includes("" + userAux.avatar)) {
            $('.menu_auth__avatar').prop('src', '../imagen/avatar/4.png');

        } else if (("5.png").includes("" + userAux.foto) || ("5.png").includes("" + userAux.avatar)) {
            $('.menu_auth__avatar').prop('src', '../imagen/avatar/5.png');

        } else if (("6.png").includes("" + userAux.foto) || ("6.png").includes("" + userAux.avatar)) {
            $('.menu_auth__avatar').prop('src', '../imagen/avatar/6.png');

        } else {
            $('.menu_auth__avatar').prop('src', '../imagen/crear-cuenta.png');

        }
    } else {
        $('.menu_auth__avatar').prop('src', '../imagen/crear-cuenta.png');
    }

    setMonedaDeTrabajo(userAux.fiat);
}

async function setMonedaDeTrabajo(fiat = "USD") {
    let tipo_user_funciones;
    let paisesJSON_dire;
    if (validarText(user)) {
        tipo_user_funciones = await get_tipo_usuario(user);
        paisesJSON_dire = JSON.parse(localStorage.getItem('paises'));
    }

    console.log("ENTRO SET MONEDA DE TRABAJO");
    if (Object.keys(divisasJSON).length > 0) {
        divisasJSON = JSON.parse(localStorage.getItem('divisas'));

    } else {
        divisasJSON = await getDivisas();
        localStorage.setItem('divisas', JSON.stringify(divisasJSON));
    }
    if (iso_code_2_money == undefined) {
        iso_code_2_money = 'CO';
    }
    if (paisOrigen.iso_code_2 == undefined) {
        paisOrigen.iso_code_2 = 'CO';
    }
    //  console.log("PAIS ORIGEN BEFORE SMDT: ", paisOrigen);
    // console.log("SMDT paisOrigen.iso_code_2_money before: ", paisOrigen.iso_code_2_money);
    paisOrigen.iso_code_2_money = iso_code_2_money;
    console.log("SMDT paisOrigen.iso_code_2_money after: ", paisOrigen.iso_code_2_money);

    if (divisasJSON[fiat] && fiat != "USD" && fiat != "US") {
        divisasJSON[fiat].iso_code_2 = (divisasJSON[fiat].iso_code_2 ? divisasJSON[fiat].iso_code_2 : "US");
        //  console.log("IN IF TO ISO STORAGE: ", divisasJSON[fiat].iso_code_2);
        localStorage.setItem('iso_code_2_money', divisasJSON[fiat].iso_code_2);
        iso_code_2_money = divisasJSON[fiat].iso_code_2;

    } else {
        // console.log("IN ELSE TO ISO STORAGE: ", paisOrigen.iso_code_2);
        if (validarText(user) && !iso_code_2_money_aux) {

            switch (tipo_user_funciones.id) {
                case 3:
                    localStorage.setItem('iso_code_2_money', user.iso_code_2);
                    iso_code_2_money = user.iso_code_2;
                    break;

                default:
                    //   console.log("USER FIAT: ", user.fiat);
                    if (user.fiat == "USD") {
                        localStorage.setItem('iso_code_2_money', 'US');
                        iso_code_2_money = 'US';
                    } else {
                        localStorage.setItem('iso_code_2_money', user.fiat);
                        iso_code_2_money = user.fiat;
                    }
                    break;
            }
        } else {
            localStorage.setItem('iso_code_2_money', fiat);
            iso_code_2_money = fiat;
        }


    }
    // console.log("PAIS ORIGEN----: ", paisOrigen);
    if (validarText(user)) {
        switch (tipo_user_funciones.id) {
            case 3:
                //   console.log("EN 3: ", user.pais);
                // paisOrigen = buscarPais('country_id', user.pais);
                paisOrigen = paisesJSON_dire.filter(pais => pais.country_id == user.pais)[0];
                break;

            default:
                // console.log("EN DEFAULT: ", user.paisid);
                paisOrigen = paisesJSON_dire.filter(pais => pais.iso_code_2 == user.paisid)[0];
                // paisOrigen = buscarPais('iso_code_2', user.paisid);
                break;
        }
        // console.log("PAIS ORIGEN ANTES: ", paisOrigen);
        setTimeout(() => {
            localStorage.setItem("paisOrigen", JSON.stringify(paisOrigen));
        }, 800);

    } else {
        localStorage.setItem("paisOrigen", JSON.stringify(paisOrigen));
    }

    // }
}

// 14 Octubre 2020
function getMyPoints(user) {
    if (!user) {
        return;
    }

    let cadenaText = "";
    if (("" + user.nombreCompleto).length > 0) {
        cadenaText = user.nombreCompleto;
        // console.log("\n\t [ user.nombreCompleto ]: ", user.nombreCompleto);

    } else if (("" + user.razon_social).length > 0) {
        cadenaText = user.razon_social;
        // console.log("\n\t [ user.razon_social ]: ", user.razon_social);

    } else {
        cadenaText = "";
        // console.log("\n\t [ cadenaText ]: ", cadenaText);

    }
    let letra_1ra = cadenaText.split(" ")[0].split("")[0];
    let letra_2da = "";

    if (cadenaText.split(' ').length > 1) {
        letra_2da = cadenaText.split(" ")[1].split("")[0];
    }
    if (validarText(letra_1ra)) {
        $('.menu_auth__points__percentage').text((letra_1ra).toUpperCase());
        if (validarText(letra_2da)) {
            $('.menu_auth__points__percentage').text((letra_1ra + "" + letra_2da).toUpperCase());
        }
    }


    let resultAux = localStorage.getItem(user.uid + '_clasificacion');

    if (resultAux) {
        if (resultAux['status'] == "success") {
            $('.menu_auth__points__classification').text(resultAux.data.escala_descripcion);
            $('.menu_auth__points__number').text(resultAux.data.puntos_mask);
            $('.menu_auth__clasificacion__content').show();
            $('.menu_auth__clasificacion__content__nodata').hide();
        } else {
            $('.menu_auth__clasificacion__content').hide();
            $('.menu_auth__clasificacion__content__nodata').show();
            $('.menu_auth__points__classification').text("");
            $('.menu_auth__points__number').text("");
        }
    } else {
        let datosEnvio = {
            "data": {
                "uid": user.uid * 1,
                "empresa": user.empresa * 1
            }
        };
        let data_url = `${baseurl}/controllers/datos_vendedor/?clasificacion`;
        $.ajax({
            type: "POST",
            url: data_url,
            data: datosEnvio,
            dataType: "json",
            success: result => {

                localStorage.setItem(user.uid + '_clasificacion', JSON.stringify(result));

                if (result['status'] == "success") {
                    $('.menu_auth__points__classification').text(result.data.escala_descripcion);
                    $('.menu_auth__points__number').text(result.data.puntos_mask);
                    $('.menu_auth__clasificacion__content').show();
                } else {
                    $('.menu_auth__clasificacion__content').hide();
                    $('.menu_auth__points__classification').text("");
                    $('.menu_auth__points__number').text("");
                }
            }, error: error => {
                //   console.log(data_url, " -- error: ", error);
                $('.menu_auth__clasificacion__content').hide();
                $('.menu_auth__points__classification').text("");
                $('.menu_auth__points__number').text("");
            }
        });
    }
}
function getDefaultIdioma() {
    // getParamsFromUrl();
    let params = new URLSearchParams(location.search);
    //  console.log("ENTRO A LA FUNCION");
    let auxLenguaje = (isValidParamUrl(params.get('lang')) ? params.get('lang') : "");
    if (auxLenguaje != "") {
        //    console.log("EL STORAGE: ", localStorage.getItem('lenguaje'));
        return auxLenguaje;
    } else {
        var ln_temp = window.navigator.language || navigator.browserLanguage;
        console.log("LN_TEMP: ", ln_temp);
        let idiomaSelected_temp = ln_temp;

        if (idiomaSelected_temp.toUpperCase().includes("ES")) {
            return "ES";
        } else {
            return "EN";
        }
    }
}

// 14 Octubre 2020
function getNotificaciones(user, pagina = 1) {

    $('.cantidad_notificaciones__').text('');

    let dataEnviar = {
        "data": {
            "uid": user.uid,
            "empresa": user.empresa,
            "pagina": pagina
        }
    };
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/notificaciones_nasbi/?notificaciones_usuario`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (notifi) => {
        if (notifi.status == 'success') {
            llenar_notificaciones_nasbi(notifi, pagina);
        } else {
            let validate_token = await erroresTokenEmpresa(notifi);
            if (!validate_token) { }
        }
    }).fail((err) => {
        console.log(err);
    });
}
function llenar_notificaciones_nasbi(data, pagina) {
    if (data.notificaciones * 1 > 0) {
        // Caso: Si, tiene notificaciones.
        $('.no_data_notificaciones___').hide();
        $('.pagination_notificacion____').show();
        let notificaciones = data.data;
        let cantidad_notificaciones = data.no_leidas;
        $('.cantidad_notificaciones__').text(cantidad_notificaciones);
        let lenguaje = localLenguaje == 'ES' ? "es" : "en";
        let paginas_total = data.total_paginas;
        $('.todas_las_notificaciones____').empty();
        for (const x in notificaciones) {
            const notificacion = notificaciones[x];
            let fecha_notificacion = getFechaSinHora(parseFloat(notificacion.fecha_actualizacion));

            notificacion[lenguaje] = notificacion[lenguaje].split("Nasbigold").join(getLabelCoinByNameCropID("Nasbigold"));
            notificacion[lenguaje] = notificacion[lenguaje].split("Nasbiblue").join(getLabelCoinByNameCropID("Nasbiblue"));

            $('.todas_las_notificaciones____').append(`
                    <div class="row row-notificacion nes_fun notificacion${notificacion.id}" style="cursor: pointer;">
                        <div class="col-md-3 col-lg-2 p-0">
                            <img src="../imagen/Logo-Blanco.png">
                        </div>
                        <div class="col-md-9 col-lg-8 p-0">
                            <p>${notificacion[lenguaje]}</p>
                        </div>
                        <div class="col-md-12 col-lg-2">
                            <p class="fecha"><b>${fecha_notificacion}</b></p>
                        </div>
                    </div>
                `);


            if (notificacion.leida == 1 || notificacion.leida == "1") {
                $(`.notificacion${notificacion.id}`).css("background-color", "#9b9b9b");
            }


            $('.nes_fun').eq(x).off('click');
            $('.nes_fun').eq(x).on('click', { notificacion: notificacion }, leida_notificacion_funcion);

        }


        let paramsPagination = {
            total_paginas: paginas_total,
            pagina: pagina
        };
        let result = generatePaginations_para_notificaciones(paramsPagination);
        $('.pagination_notificacion____').html(result);



        /*$('html, body').animate({scrollTop:0},500);*/

    } else {
        // Caso: NOO, tiene notificaciones.
        $('.cantidad_notificaciones__').text('');
        $('.no_data_notificaciones___').show();
        $('.pagination_notificacion____').hide();
    }
}
function leida_notificacion_funcion(data_notificacion) {
    let notificacion_a_marcar = data_notificacion.data.notificacion;
    let id_notificacion = notificacion_a_marcar.id

    let dataEnviar = {
        "data": {
            "id": id_notificacion,
            "uid": user.uid,
            "empresa": user.empresa
        }
    };
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/notificaciones_nasbi/?marcar_como_leida`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        if (res.status == 'success') {
            $(`.notificacion${id_notificacion}`).css("background-color", "#9b9b9b");
            if (validarText(notificacion_a_marcar.url)) {
                location.href = notificacion_a_marcar.url;
            }
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) { }
        }
    }).fail((err) => {
        presentAlertObject({ icon: 'error', text: idioma.trans420_ });
    });
}
function generatePaginations_para_notificaciones(params) {
    let htmlContentPagination = "";
    let htmlContentItemsPagination = "";
    if (params.total_paginas > 1) {
        let inicio = ((params.pagina - 2) > 0 ? (params.pagina - 2) : 1);
        let fin = ((inicio + 4) < params.total_paginas ? (inicio + 4) : params.total_paginas);
        if (fin == params.total_paginas) {
            inicio = ((params.pagina - 4) > 0 ? (params.pagina - 4) : 1);
        }
        for (let index = inicio; index <= fin; ++index) {

            htmlContentItemsPagination += `<a onclick="cambio_pagina_notificacion( ${index} )" class="${(index == params.pagina ? 'active' : '')}">${index}</a>`;
        }
        let btnPrev = "";
        if (params.pagina - 1 > 1) {
            let pag = params.pagina - 1;
            btnPrev = `<a onclick="cambio_pagina_notificacion( 1 )" class="AD">&laquo;</a>`;
        }
        let btnNext = "";
        if (params.pagina + 1 < params.total_paginas) {
            let pag = params.pagina + 1;
            btnNext = `<a onclick="cambio_pagina_notificacion( ${pag} )" class="AD">&raquo;</a>`;
        }
        let htmlPuntosIndexFin = "";
        if (fin < params.total_paginas) {
            htmlContentItemsPagination += `<a> ... </a>`;

            let pag = params.total_paginas;
            htmlContentItemsPagination += `<a onclick="cambio_pagina_notificacion( ${params.total_paginas} )" class="AD">${params.total_paginas}</a>`;
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
    return htmlContentPagination;
}
function cambio_pagina_notificacion(pagView = 1) {
    getNotificaciones(user, pagView);
}
function Toast(icon, title) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
    Toast.fire({
        icon: icon,
        text: title
    });
}

// 30 Octubre 2020
function getCoinLabel(label = "Nasbigold") {
    label = "" + label;
    label = label.split("_").join("");
    label = label.toLowerCase().trim();

    if (label.includes("nasbigold")) {
        return "Nasbichips";//idioma['trans87_'];

    } else if (label.includes("nasbiblue")) {
        return idioma['trans88_'];

    } else {
        if (validarText(label)) {
            return label.toUpperCase();//.charAt(0).toUpperCase() + label.slice(1); 
        } else {
            return "";
        }

    }
}
function getCoinLabelSymbol(label = "Nasbigold") {
    label = "" + label;
    label = label.split("_").join("");
    label = label.toLowerCase().trim();

    if (label.includes("nasbigold")) {
        return "Nasbichips";

    } else if (label.includes("nasbiblue")) {
        return idioma['trans88_'];

    } else {
        if (validarText(label)) {
            return label.toUpperCase();//.charAt(0).toUpperCase() + label.slice(1); 
        } else {
            return "";
        }

    }
}

// 31 Octubre 2020
if (!("" + location.href).includes("e-wallet.php")) {
    localStorage.removeItem("mis_bonos_subasta");
}
if (!("" + location.href).includes("mis-cuentas.php")) {
    console.log("------+> BORRANDO EL STORAGE <+--------");
    localStorage.removeItem("mis_cuentas");
}

function getBaseUrlProject() {
    let URL_project = "nasbi.com/content/";
    try {
        URL_project = location.href.split("content")[0] + "content/";
    } catch (ex) {
        console.log(ex);
    }
    return URL_project;
}
function saber_si_estoy_en_filtro_producto(name_pagina) {
    return new Promise((resolve) => {
        let params_de_saber_en_que_page_esta = window.location.pathname;
        let pagina_actual = params_de_saber_en_que_page_esta.split("ProyectoNasbi2020/content/").join("");
        if (pagina_actual.toString() == name_pagina.toString()) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}
async function pedaso_numero_uno_filtro_producto(value) {
    let estoy_en_filtro_producto = await saber_si_estoy_en_filtro_producto("/filtro-productos.php");
    if (estoy_en_filtro_producto) {
        cambio_select_departamento(value) //funcion de filtro-productos.js 
    }
}
async function validar_subasta_usuario(user) {
    return new Promise(async (resolve) => {
        let tipo_usuario = await get_tipo_usuario(user);
        switch (tipo_usuario.id) {
            case 1:
                resolve({ opcion: 1, direccion: "status libre para subasta" })

                break;
            case 2:
                if (user.status_subasta == "0" || user.status_subasta == null) {
                    resolve({ opcion: 2, direccion: "status no libre para subasta" })


                } else {
                    resolve({ opcion: 1, direccion: "status libre para subasta" })

                }
            case 3:
                if (user.status_subasta == "0" || user.status_subasta == null) {
                    resolve({ opcion: 2, direccion: "status no libre para subasta" })

                } else {
                    resolve({ opcion: 1, direccion: "status libre para subasta" })

                }
                break;

            default:
                break;
        }
    });
}
function get_tipo_usuario(user) {
    return new Promise((resolve) => {
        if (user.empresa == 0) {
            if (validarText(user.referido)) {
                resolve({ id: 1, msj: "es usuario p2w" });
            } else {
                resolve({ id: 2, msj: "es usuario externo" });
            }
        } else {
            resolve({ id: 3, msj: "es usuario empresa" });

        }
    });
}

function validarClave() {
    return new Promise((resolve) => {
        if (validarText(localStorage.getItem('userAuth'))) {
            let user = JSON.parse(localStorage.getItem('userAuth'));
            if ((user.empresa * 1) == 0) {
                var url = location.href.split("/");
                // if (url[url.length - 1].indexOf('mis-cuentas.php') === -1) {
                if (!user.clave_trans) {
                    resolve(true);
                    $('#Modal-clave-transaccion').modal('show');
                    $(".btn_clave_configuracion").on('click', function () {
                        localStorage.setItem("mis_cuentas", ".sidenav_configuracion");
                        loadPage("mis-cuentas.php");
                    });
                    $('#Modal-clave-transaccion').on('hidden.bs.modal', function () {
                        if (!('' + location.href).includes("promociones.php")) {
                            loadPage("promociones.php")
                        }
                    })

                } else {
                    resolve(false);
                }
                // }
            } else {
                //Este else, no deberia pasar porque este flujo es para usuario normal
            }
        } else {
            //Este else, no deberia pasar ya debe tener data del usuario
        }
    });
}

function getValidacionCodigoEmpresa(codigo, uid) {
    $(".spiner_validar_codigo").show()
    return new Promise((resolve) => {
        let dataVali = {
            code: codigo,
            id: uid,
        };
        let data_url = `${baseurl}/controllers/empresas/?confirmar_empresa_code`;
        $.ajax({
            type: "POST",
            url: data_url,
            data: JSON.stringify({ "data": dataVali }),
            dataType: "json",
            contentType: 'application/json',
            success: success => {
                $(".spiner_validar_codigo").hide();
                $(".mnsj_error_codigo_validacion").hide("slow")
                //  console.log(success)

                if (success["status"] == "success") {
                    $("#validar-registro-empresa").modal("hide")

                    resolve(true)

                } else if (success["status"] == "errorCode") {
                    $(".mnsj_error_codigo_validacion").show("slow")
                    resolve(false)
                } else {
                    presentAlert(idioma['trans_04'], idioma['_trans863'])
                    resolve(false)
                }

            }, error: error => {
                $(".spiner_validar_codigo").hide();
                presentAlert(idioma['trans_04'], idioma['_trans864'])
                resolve(false)
            }
        });
    })

}
function getValidacionCodigoUsuario(token) {
    $(".spiner_validar_codigo").show()
    return new Promise((resolve) => {

        let data_url = `${serverUrl}controllers/users/activarCuenta.php`;
        $.ajax({
            type: "POST",
            url: data_url,
            data: JSON.stringify({ token }),
            dataType: "json",

            contentType: 'application/json',
            success: success => {
                $(".spiner_validar_codigo").hide();
                $(".mnsj_error_codigo_validacion").hide("slow")
                //   console.log(success)

                if (success["status"] == "success") {
                    $("#validar-registro-empresa").modal("hide")
                    resolve(true)

                } else if (success["status"] == "errorToken") {
                    $(".mnsj_error_codigo_validacion").show("slow")
                    resolve(false)
                } else {
                    presentAlert(idioma['trans_04'], idioma['_trans863'])
                    resolve(false)
                }

            }, error: error => {
                $(".spiner_validar_codigo").hide();
                presentAlert(idioma['trans_04'], idioma['_trans864'])
                resolve(false)
            }
        });
    })

}


async function validar_limite_3_estado1_exposicion(usuario) {
    let res_expo_1 = await validar_si_tiene_mas_de_tres_ventas_estado_1(usuario, false);
    if (res_expo_1) {
        return 0;
    }
}


async function validar_si_tiene_mas_de_tres_ventas_estado_1(usuario, viene_de_vender, empresa = 0, id_empresa = "") {
    return new Promise(async (resolve) => {
        //let valor_data; 
        let data_consulta = await consultar_data_de_venta_exposicion(usuario);
        if (data_consulta) {
            // if(data_consulta.data[0]){
            //     valor_data  = parseFloat(data_consulta.data[0].ventas);
            // }else{
            //     valor_data  = parseFloat(data_consulta.data);
            // }
            // if (valor_data >= 3 ) {
            if (viene_de_vender) {
                presentAlertObject({ icon: 'error', text: idioma.trans471_ });
            } else {
                $("#limite_3_estado1_gratuita").modal("show");
                if (empresa == 0) {
                    // presentAlertObject({ icon: 'error', text: idioma.trans474_ });
                    $("#limite_3_estado1_gratuita").off('hidden.bs.modal');
                    $("#limite_3_estado1_gratuita").on('hidden.bs.modal', ($event) => {
                        loadPage("index.php")
                    })
                } else {
                    $("#limite_3_estado1_gratuita").off('hidden.bs.modal');
                    $("#limite_3_estado1_gratuita").on('hidden.bs.modal', ($event) => {
                        loadPage('productos-empresa.php?empresa=' + id_empresa)
                    })
                }

                $('.opcion_to_publicaciones').off('click');
                $('.opcion_to_publicaciones').on('click', null, function () {
                    localStorage.setItem("mis_cuentas", ".sidenav_publicaciones");
                    loadPage("mis-cuentas.php");
                });

            }
            resolve(true);
            //  } //else {
            //     resolve(false);
            // }
        } else {
            //  presentAlertObject({ icon: 'error', text: idioma.trans472_ });
            resolve(false);
        }
    })
}


function consultar_data_de_venta_exposicion(usuario) {
    let dataEnviar = {
        data: {
            uid: usuario.uid,
            empresa: usuario.empresa
        }
    }
    return new Promise((resolve) => {
        $.ajax({
            type: 'POST',
            url: `${baseurl}/controllers/datos_vendedor/?ventas_gratuitas_realizadas`,
            data: dataEnviar,
            dataType: 'json',
            "headers": { 'x-api-key': usuario.token },
        }).done(async (res) => {
            if (res.status == "success") {
                resolve(true);
            } else {
                let validate_token = await erroresTokenEmpresa(res);
                if (!validate_token) resolve(false);

            }

        }).fail((err) => {
            resolve(false);
            presentAlertObject({ icon: 'error', text: idioma.trans_04 });
        });
    })
}
function validarPassword(texto) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

    if (regex.test(texto)) {
        return true;
    } else {
        return false;
    }
}
function desactivarCuentaUsuario(id) {
    return new Promise((resolve) => {
        $.ajax({
            type: "POST",
            url: baseurl + "/controllers/empresas/?darse_de_baja",
            data: { "data": { id } },
            dataType: "json",
            "headers": { 'x-api-key': user.token },
            success: async success => {
                if (success.status == 'success') {
                    resolve(true)

                } else {
                    let validate_token = await erroresTokenEmpresa(success);
                    if (!validate_token) {
                        presentAlert(idioma['trans_04'], idioma['_trans894'])
                        resolve(false)
                    }




                }
            }, error: error => {
                presentAlert(idioma['trans_04'], idioma['_trans895'])
                resolve(false)

            }
        });

    })

}
function activarCuentaUsuario(id) {
    return new Promise((resolve) => {
        $.ajax({
            type: "POST",
            url: baseurl + "/controllers/empresas/?darse_de_alta",
            data: { "data": { id } },
            dataType: "json",
            success: success => {
                if (success.status == 'success') {
                    resolve(true)

                } else {
                    presentAlert(idioma['trans_04'], idioma['_trans898'])
                    resolve(false)
                }
            }, error: error => {
                presentAlert(idioma['trans_04'], idioma['_trans899'])
                resolve(false)

            }
        });

    })

}

function bloquearFullAccess(dato = "") {
    if (("" + location.href).includes("localhost")) {
        return false;
    } else {
        if (("" + user.uid) == "1333") {

        } else if (("" + user.uid) == "17") {
            return false;
        } else if (("" + user.uid) == "1451") {
            return false;
        } else if (("" + user.uid) == "1378") {
            return false;
        } else if (("" + user.uid) == "1343") {
            return false;
        } else if (("" + user.uid) == "1439") {
            return false;
        } else if (("" + user.uid) == "1379") {
            return false;
        } else if (("" + user.uid) == "1291") {
            return false;
        } else if (("" + user.uid) == "5") {
            return false;
        } else if (("" + user.uid) == "1325") {
            return false;
        } else if (("" + user.uid) == "1326") {
            return false;
        } else {
            return true;
        }
    }
}

// 11 Diciembre 2020
function calcDate(fechaCreacion = 0) {
    let actual = +new Date();
    let antigua = fechaCreacion;//1580533200000; // fecha  mas antigua


    let diferencia = (actual - antigua) / (3600000 * 24);
    let tiempo;

    let labelDia = idioma['trans_320'];
    let labelMes = idioma['trans_321'];
    let labelAnio = idioma['trans_322'];

    if (diferencia > 1) {//mas de 1 día
        if (diferencia < 30) { //menos de 30 días
            tiempo = labelDia.split("###").join(parseInt(diferencia));
            // tiempo = this.idioma.publicadohacedia.split("%").join(diferencia.toString().split(".")[0])
        }
        else if (diferencia < 365) { //menos de un año
            tiempo = parseInt(diferencia / 30);
            tiempo = labelMes.split("###").join(parseInt(tiempo));
            // tiempo = this.idioma.publicadohaceMes.split("%").join(tiempo.toString().split(".")[0])
        }
        else { // mas de 1 año
            tiempo = parseInt(diferencia / 365);
            tiempo = labelAnio.split("###").join(parseInt(tiempo));
            // tiempo = this.idioma.publicadohaceAno.split("%").join(tiempo.toString().split(".")[0])
        }
    }
    else { //menos de 1 día
        tiempo = diferencia * 24;
        if (tiempo > 1) {//paso mas de 1 hora
            tiempo = idioma['trans_323'];//"hace pocas horas";
        }
        else {
            tiempo = tiempo * 60;
            if (tiempo > 1) {//mas de 1 minuto
                tiempo = idioma['trans_324'];//"hace pocos minutos";
            }
            else { //pocos segundos
                tiempo = idioma['trans_325'];//"hace pocos segundos";
            }
        }
    }
    return tiempo;
}

function obtenerPaises(lenguaje) {
    return new Promise((resolve) => {
        $.getJSON(`../json/paisesdepartamentos-${lenguaje.toUpperCase()}.json`, (paises) => {
            localStorage.setItem('paises', JSON.stringify(paises));
            resolve(true);
        });
    });
}

async function getParamsFromUrl() {
    return new Promise(async (resolve) => {
        if (validarText(user)) {
            //   console.log("FUNCTION EXECUTED");
            let params = new URLSearchParams(location.search);
            let datos = {};
            let sw = false;
            //  console.log("the params: ", params);
            if (params) {
                //   console.log("entro IF");
                datos = {
                    country: (isValidParamUrl(params.get('country')) ? params.get('country') : ""),
                    lenguaje: (isValidParamUrl(params.get('lang')) ? params.get('lang') : ""),
                    iso_code_2_money: (isValidParamUrl(params.get('iso_code')) ? params.get('iso_code') : ""),
                };
                // console.log("DATOS: ", datos);
                if (datos.country != "" && datos.lenguaje != "" && datos.iso_code_2_money != "") {
                    if (datos.lenguaje != localStorage.getItem("lenguaje")) {
                        localStorage.removeItem("lenguaje");
                        //     console.log("MI FUNCION DATOS LENGUAJE: ", datos.lenguaje);
                        localStorage.setItem('lenguaje', datos.lenguaje);
                        document.cookie = "lenguaje=" + encodeURIComponent(localStorage.getItem("lenguaje"));
                        localLenguaje = datos.lenguaje;
                        sw = true;
                    }

                    if (validarText(datos.iso_code_2_money)) {
                        if (datos.iso_code_2_money != localStorage.getItem("iso_code_2_money")) {
                            localStorage.removeItem("iso_code_2_money");
                            localStorage.setItem("iso_code_2_money", datos.iso_code_2_money);
                            //   console.log("DATA ISOCODE: ", localStorage.getItem("iso_code_2_money"));
                            iso_code_2_money = localStorage.getItem("iso_code_2_money");
                            let isResolved = await obtenerPaises(datos.lenguaje);
                            if (isResolved) {
                                // localLenguaje = datos.lenguaje;
                                let paisesJSON_dire = JSON.parse(localStorage.getItem('paises'));
                                paisOriginDEfault = paisesJSON_dire.filter(pais => pais.iso_code_2 == datos.iso_code_2_money)[0];
                                sw = true;
                            }
                        }
                    } else {
                        localStorage.setItem("iso_code_2_money", "CO");
                    }


                    if (sw == true) {
                        //  console.log("MI SW: ", iso_code_2_money);
                        // resolve(true);
                        // location.href = "index.php";
                        location.reload();
                    } else {
                        // resolve(false);
                    }
                    resolve(datos.lenguaje);
                } else {
                    //  console.log("PRIMER FALSE");
                    resolve(false);
                }
            } else {
                iso_code_2_money = 'CO';
                // console.log("SEGUNDO FALSE");
                resolve(false);
            }
        } else {
            resolve(false);
        }

    });
}

function getParamsToRedirect() {
    let params = new URLSearchParams(location.search);
    let datos = {};
    if (typeof params != 'undefined' && params != null) {
        datos = {
            iso_code: (isValidParamUrl(params.get('iso_code')) ? params.get('iso_code') : ""),
            country: (isValidParamUrl(params.get('country')) ? params.get('country') : ""),
            lang: (isValidParamUrl(params.get('lang')) ? params.get('lang') : ""),
        };
    }

    return datos;
}

function toSomePageWithNewParams(params = {}, page = "") {
    let contentPath = "";
    let index = 0;
    for (let key in params) {
        if (params[key] != null && params[key] != undefined && params[key] != "") {
            if (index == 0) {
                contentPath += `${key}=${params[key]}`;
            } else {
                contentPath += `&${key}=${params[key]}`;
            }
            index++;
        }
    }
    let ruta = `${page}?${contentPath}`;
    location.href = ruta;
}
$('#modal-login').on('shown.bs.modal', function (e) {
    // do something...
    // console.log("modal open")
    setCaptchaLang(document.getElementById("rcap"), localLenguaje.toLowerCase())
})
function setCaptchaLang(recaptchaContainer, lang) {
    lang = lang || "es";

    // console.log(lang)

    // 1. Search for the ReCaptcha iframe
    const iframeGoogleCaptcha = recaptchaContainer.querySelector('iframe');

    // 2. Retrieve the current language
    const currentLang = iframeGoogleCaptcha.getAttribute("src").match(/hl=(.*?)&/).pop();

    // 3. Verify if the language that you want to set is different to the current one
    if (currentLang !== lang) {
        // 4. If it is, change it
        iframeGoogleCaptcha.setAttribute(
            "src",
            iframeGoogleCaptcha.getAttribute("src").replace(
                /hl=(.*?)&/,
                'hl=' + lang + '&'
            )
        );
    }
}


function agregar_variable_idioma_en_page() {
    let new_url = new URL(location.href);
    let new_params = new URLSearchParams(new_url.search);
    if (validarText(user)) {
        if (!new_params.has('nle')) {
            let lenguaje_actual_funcion = localStorage.getItem('lenguaje');
            new_params.set('nle', lenguaje_actual_funcion);

            new_url = location.href.split("?")[0];
            new_url = new_url + "?" + new_params.toString();
            //  console.log("NEW_URL :", new_url);

            location.href = new_url;
        }
    }

}
function fallbackCopyTextToClipboard(string) {
    let textarea;
    let result;

    try {
        textarea = document.createElement('textarea');
        textarea.setAttribute('readonly', true);
        textarea.setAttribute('contenteditable', true);
        textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
        textarea.value = string;

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const range = document.createRange();
        range.selectNodeContents(textarea);

        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);

        textarea.setSelectionRange(0, textarea.value.length);
        result = document.execCommand('copy');
    } catch (err) {
        console.error(err);
        result = null;
    } finally {
        document.body.removeChild(textarea);
    }

    // manual copy fallback using prompt
    if (!result) {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
        result = prompt(`Press ${copyHotkey}`, string); // eslint-disable-line no-alert
        if (!result) {
            return false;
        }
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
async function cargarPaises() {
    if (localStorage.getItem('paises')) {
        //  console.log("storage")
        return JSON.parse(localStorage.getItem('paises'));
    }
    else {
        let pais = await loadJson("./paises.json")
        localStorage.setItem("paises", JSON.stringify(pais));
        return pais;
    }
}

function loadJson(ruta) {
    return fetch(ruta)
        .then(response => response.json())
        .then(data => {
            return data
        });
}
getParamsCorreoDardeBaja()
function getParamsCorreoDardeBaja() {
    return new Promise((resolve) => {
        let params = new URLSearchParams(location.search);
        let data_usuario = {
            uid: params.get('sr') == undefined ? "" : params.get('sr'),
            activar: params.get('act') == undefined ? "" : params.get('act'),
            empresa: params.get('em') == undefined ? "" : params.get('em'),
        }
        if (data_usuario.uid && data_usuario.empresa && data_usuario.activar) {
            let url_empresa = "editar-empresa.php? &act=" + data_usuario.activar
            let url_usuario = "mis-cuentas.php?&act=" + data_usuario.activar
            if (validarText(user)) {
                if (user.uid == data_usuario.uid) {
                    if (data_usuario.empresa == 1) {
                        loadPage(url_empresa)
                    } else {
                        localStorage.setItem("mis_cuentas", ".sidenav_configuracion");
                        loadPage(url_usuario)
                    }
                    resolve(true)

                } else {
                    presentAlert(idioma['trans_04'], idioma['_trana938'])
                    resolve(false)

                }
            } else {
                $("#modal-login").modal("show");
                resolve(false)
            }


        } else {
            resolve(false)
        }
    })
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function getNacionalidadUsuario(data) {
    let dataUser = {
        "uid": data.uid,
        "empresa": data.empresa
    }
    return new Promise((resolve) => {
        $.ajax({
            type: "POST",
            url: baseurl + "/controllers/users/?nacionalidad_id",
            data: JSON.stringify({ "data": dataUser }),
            dataType: "json",
            contentType: 'application/json',
            "headers": { 'x-api-key': data.token },
            success: async success => {
                if (success.status == 'success') {
                    resolve({ res: true, data: success.data })
                } else {
                    let validate_token = await erroresTokenEmpresa(success);
                    if (!validate_token) resolve({ res: false, motivo: success.status })
                    // presentAlert(idioma['trans_04'], idioma['_trana944'])

                }
            }, error: error => {
                //presentAlert(idioma['trans_04'], idioma['_trana944'])
                resolve({ res: false })

            }
        });

    })

}
function enviarNacionalidadUsuario(data) {
    let data_fiat = {
        "email": data.correo ? data.correo : data.email,
        "empresa": data.empresa,
        "country_id": data.pais ? data.pais : data.paisid
    }
    return new Promise((resolve) => {
        $.ajax({
            type: 'POST',
            url: `${baseurl}/controllers/users/?nacionalidad_registrar`,
            data: JSON.stringify({ "data": data_fiat }),
            dataType: 'json',
            contentType: 'application/json',
        }).done((res) => {
            if (res.status == "success") {
                resolve(true)

            } else {
                // presentAlertObject({ icon: 'error', text: idioma._trana943 });
                resolve(false)

            }
        }).fail((err) => {
            // presentAlertObject({ icon: 'error', text: idioma._trana943 });
            resolve(false)
        });
    })

}
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function chageBtnEye(btn, input) {
    let eye = $(btn).val();
    if (eye == "btnOff") {
        $(input).attr("type", "text");
        $(btn).find(".icono_eye").removeClass("fa-eye-slash")
        $(btn).find(".icono_eye").addClass("fa-eye")
        $(btn).val("btnOn");
    } else {
        $(input).attr("type", "password");
        $(btn).find(".icono_eye").removeClass("fa-eye")
        $(btn).find(".icono_eye").addClass("fa-eye-slash")
        $(btn).val("btnOff");
    }

}
function erroresTokenEmpresa(res) {
    return new Promise((resolve) => {
        if (res.status == "errorVencido") {
            presentAlert(idioma["trans_04"], idioma["_trana949"])
            $('#modal-presentAlert-info').on('hidden.bs.modal', function () {
                logout()
            })
            resolve(true)
        } else if (res.status == "errorEncabezado" || res.status == "errorToken") {
            presentAlert(idioma["trans_04"], idioma["_trans950"])
            $('#modal-presentAlert-info').on('hidden.bs.modal', function () {
                logout()
            })
            resolve(true)
        } else {
            resolve(false)

        }
    })
}


function cargarJsonTCC() {
    return new Promise((resolve) => {
        let tccJSON;
        $.getJSON(`../json/ciudades_tcc.json`, (JSONtcc) => {
            tccJSON = JSONtcc;
        }).then(() => {
            resolve(tccJSON)
        })
    })
}

function getDepartamentosTCC() {
    return new Promise(async (resolve) => {
        let tcc = await cargarJsonTCC();
        let arraydep = []
        let hash = {};
        arraydep = tcc.filter(function (current) {
            var exists = !hash[current.DEPARTAMENTO];
            hash[current.DEPARTAMENTO] = true;
            return exists;
        });
        //  console.log(arraydep)
        arraydep.sort((a, b) => a["DEPARTAMENTO"] > b["DEPARTAMENTO"])
        arraydep.sort(function (a, b) {
            if (a["DEPARTAMENTO"] < b["DEPARTAMENTO"]) { return -1; }
            if (a["DEPARTAMENTO"] > b["DEPARTAMENTO"]) { return 1; }
            return 0;
        })
        resolve(arraydep)
    })

}
function getCiudadesTCC(dep) {
    return new Promise(async (resolve) => {
        let tcc = await cargarJsonTCC();
        let arrayciud = tcc.filter(f => f["DANE DEPARTAMENT"] == dep)
        //arrayciud = arrayciud.sort()
        arrayciud.sort(function (a, b) {
            if (a["POBLACION"] < b["POBLACION"]) { return -1; }
            if (a["POBLACION"] > b["POBLACION"]) { return 1; }
            return 0;
        })
        resolve(arrayciud)
    })

}






