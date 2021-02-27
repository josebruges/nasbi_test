let idioma_antes_login;
let siglas_idioma_por_defecto = "ES";
//let serverUrl_new = "http://peers2win.com/api/";
let serverUrl_new = 'https://peers2win.com/api/';

var ln = x = window.navigator.language || navigator.browserLanguage;
let idiomaSelected = ln;

const leng_aux = localStorage.getItem('lenguaje');
if (leng_aux != null && leng_aux != "" && leng_aux != undefined) {
    siglas_idioma_por_defecto = leng_aux;
} else {
    if (idiomaSelected.toUpperCase().includes("ES")) {
        siglas_idioma_por_defecto = "ES";
    } else {
        siglas_idioma_por_defecto = "EN";
    }
}

$.getJSON(`../json/${siglas_idioma_por_defecto}.json`, (idiomajson) => {
    idioma_antes_login = idiomajson;
}).then(() => {
    llenarFooter()
});

$(document).ready(($event) => {


    redesSociales();



    $('.btn_suscribir_news').click(($event) => {
        validar_campo_vacio_newsleter();
    });



});

function validarText__new(valor, id = '') {
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

function agregar_loading_ge_publi_footer(clase) { //CUIDADO ESTE LO USO EN VARIOS DOCUMENTOS ES COMO UNA FUNCION GENERAL
    let span_loading_ge = ` <span class="spiner_modificar_publi">&nbsp;</span><span class="spinner-border spinner-border-sm spiner_modificar_publi" role="status" aria-hidden="true"></span>`
    $(clase).append(span_loading_ge);
    $(clase).prop("disabled", true);
}

function quitar_loading_ge_publi_footer(clase) {//CUIDADO ESTE LO USO EN VARIOS DOCUMENTOS ES COMO UNA FUNCION GENERAL
    $(clase).children(".spiner_modificar_publi").remove();
    $(clase).prop("disabled", false);
}



async function validar_campo_vacio_newsleter() {
    let correo = $('.correo_suscribir_newsleter').val();
    if (validarText__new(correo)) {
        let es_correo = await validar_si_escorreo_newsleter(correo);
        console.log(es_correo);
        if (es_correo) {
            enviar_data_correo_newsletter(correo);
        } else {
            if (idioma.trans287_) {
                presentAlertObject_alert_new({ icon: 'error', text: idioma.trans287_ });
            } else {

                presentAlertObject_alert_new({ icon: 'error', text: idioma_antes_login.trans287_ });
            }

        }
    } else {
        if (idioma.trans407_) {
            presentAlertObject_alert_new({ icon: 'error', text: idioma.trans407_ });
        } else {
            presentAlertObject_alert_new({ icon: 'error', text: idioma_antes_login.trans407_ });
        }
        $('.correo_suscribir_newsleter').focus();
    }

}


function validar_si_escorreo_newsleter(correo) {
    let expresion_valid_correo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    return new Promise((resolve) => {
        console.log(expresion_valid_correo.test(correo.toString()))
        if (expresion_valid_correo.test(correo.toString())) {
            resolve(true);
        } else {
            resolve(false);
        }


    });

}

function enviar_data_correo_newsletter(correo) {
    agregar_loading_ge_publi_footer('.btn_suscribir_news');
    $('.btn_suscribir_news').prop('disabled', true);
    $.ajax({
        type: "POST",
        url: serverUrl_new + "controllers/users/saveSuscripcion.php",
        data: {
            email: correo
        },
        dataType: 'json',
    }).done(res => {
        quitar_loading_ge_publi_footer('.btn_suscribir_news');
        $('.btn_suscribir_news').prop('disabled', false);
        $('.correo_suscribir_newsleter').val("");
        if (res.status === 'success') {
            if (idioma.trans288_) {
                presentAlertObject_alert_new({ icon: 'info', text: idioma.trans288_ });
            } else {
                presentAlertObject_alert_new({ icon: 'info', text: idioma_antes_login.trans288_ });
            }

        } else if (res.status == "errorUser") {
            if (idioma.trans400_) {
                presentAlertObject_alert_new({ icon: 'error', text: idioma.trans400_ });
            } else {
                presentAlertObject_alert_new({ icon: 'error', text: idioma_antes_login.trans400_ });
            }

        } else {
            if (idioma.trans400_) {
                presentAlertObject_alert_new({ icon: 'error', text: idioma._trans06 });
            } else {
                presentAlertObject_alert_new({ icon: 'error', text: idioma_antes_login._trans06 });
            }

        }
    }).fail((err) => {
        quitar_loading_ge_publi_footer('.btn_suscribir_news');
        $('.btn_suscribir_news').prop('disabled', false);
        if (idioma.trans400_) {
            presentAlertObject_alert_new({ icon: 'error', text: idioma._trans06 });
        } else {
            presentAlertObject_alert_new({ icon: 'error', text: idioma_antes_login._trans06 });
        }

    });

}
function redesSociales() {
    $(".nasbi_fb").off();
    $(".nasbi_fb").on('click', nasbiFB);

    $(".nasbi_ing").off();
    $(".nasbi_ing").on('click', nasbiINSTG);

    $(".nasbi_in").off();
    $(".nasbi_in").on('click', nasbiLINK);
}
function nasbiFB() {
    if (validarText__new(siglas_idioma_por_defecto)) {
        if (siglas_idioma_por_defecto == "EN") {

        } else {

        }

    } else {

    }
    window.open('https://www.facebook.com/Nasbi-109598020971382')
}
function nasbiINSTG() {
    if (validarText__new(siglas_idioma_por_defecto)) {
        if (siglas_idioma_por_defecto == "EN") {

        } else {

        }

    } else {

    }
    window.open('https://www.instagram.com/nasbicommerce/')
}
function nasbiLINK() {
    if (validarText__new(siglas_idioma_por_defecto)) {
        if (siglas_idioma_por_defecto == "EN") {

        } else {

        }

    } else {

    }
    window.open('https://www.linkedin.com/company/nasbi-marketplace/about/')
}



function presentAlertObject_alert_new({ title = "N A S B I", text = "", icon = "info" }) {
    $('#modal-presentAlert-info').modal('show');

    $('.modal-presentAlert-info-title').html(`<div>${title}</div>`);
    $('.modal-presentAlert-info-body').html(`<div>${text}</div>`);

}
function llenarFooter() {
    let terminos = `<a onclick="openPDF2('https://nasbi.com/assets/docs/terminos-y-condiciones-generales-nasbi-v8.pdf')"><span class="">${idioma._trans900}</span></a>`
    let politicas = `<a onclick="openPDF2('https://nasbi.com/assets/docs/politicas-privacidad-nasbi-v10.pdf')"><span class="">${idioma._trans901}</span></a>`
    if (idioma._trans270) {
        $(".edit-footer").html(idioma._trans270 + "/" + terminos + ", " + politicas)
    } else {
        terminos = `<a onclick="openPDF2('https://nasbi.com/assets/docs/terminos-y-condiciones-generales-nasbi-v8.pdf')"><span class="">${idioma_antes_login._trans900}</span></a>`
        politicas = `<a onclick="openPDF2('https://nasbi.com/assets/docs/politicas-privacidad-nasbi-v10.pdf')"><span class="">${idioma_antes_login._trans901}</span></a>`
        $(".edit-footer").html(idioma_antes_login._trans270 + "/" + terminos + ", " + politicas)

    }

    let currentYear = new Date().getFullYear();
    let value = idioma_antes_login["_trans270"];
    let cadena = value.split("2020");
    cadena.splice(1, 0, currentYear);
    console.log("the new cadena: ", cadena);
    let newString = cadena.join("");
    console.log("la cadena: ", newString);
    $('._trans270').html(newString + "/" + terminos + ", " + politicas);
}
const openPDF2 = (url) => {
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

