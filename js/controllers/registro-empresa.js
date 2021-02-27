let params = new URLSearchParams(location.search);
let cod_referido = (params.get('r') == undefined ? "" : params.get('r'))
let paisesJSON_emp = JSON.parse(localStorage.getItem('paises'));
var uid;
let dataEmpresa;
if (validarText(cod_referido)) {
    $(".red_registro_empresa").attr("href", "registro-empresa.php?r=" + cod_referido)
    $(".red_registro_usuario").attr("href", "registro.php?r=" + cod_referido)
} else {
    $(".red_registro_usuario").attr("href", "registro.php")
}
function cargarPrimero() {
    llenarSelectPaises()
}

$(document).ready(($event) => {
    ///setitime captcha
    // setTimeout(() => {

    //     setCaptchaLang(document.getElementById("rcap2"), localLenguaje.toLowerCase())

    // }, 1000);

    $(".registro__empresa__referido").val(cod_referido);

    $(".registro_empresa_terminos").off();
    $(".registro_empresa_terminos").on("click", function (params) {
        openPDF("https://nasbi.com/assets/docs/terminos-y-condiciones-generales-nasbi-v8.pdf")
    });
    $(".registro_empresa_politica").off();
    $(".registro_empresa_politica").on("click", function (params) {
        openPDF("https://nasbi.com/assets/docs/politicas-privacidad-nasbi-v10.pdf")
    });

    $(".registro__empresa_btnEnviar").click(($event) => {
        if (!validarText(user) && $.isEmptyObject(empresaAuth)) {
            let list_errors = "";

            if (!$('.registro_empresa__terms').is(':checked')) {
                list_errors += "<br>" + idioma['trans_07'];
            }
            if (!$('.registro_empresa__politics').is(':checked')) {
                list_errors += "<br>" + idioma['trans_06'];
            }
            if (list_errors.length > 0) {
                presentAlert(idioma["trans_00"], list_errors, "info");
            } else {
                const aux_idioma_RE = localStorage.getItem('lenguaje');
                dataEmpresa = {
                    pais: $(".registro__empresa__pais option:selected").val(),
                    razon_social: $(".registro__empresa__nombre").val(),
                    nit: $(".registro__empresa__nit").val(),
                    pagina_web: $(".registro__empresa__web").val(),
                    correo: $(".registro__empresa__correo").val(),
                    clave: $(".registro__empresa__clave").val(),
                    referido: $(".registro__empresa__referido").val(),
                    idioma: aux_idioma_RE
                };

                validarDatos(dataEmpresa);
            }

        } else {
            abrirAlerta(idioma['_trans462'], idioma['_trans01']);
        }
    });
    $("#final-registro").on('hidden.bs.modal', function () {
        $("#validar-registro-empresa").modal("toggle")
    })

    $(".validar_codigo_registro").off()
    $(".validar_codigo_registro").on('click', validarCodigoRegistro)
    $('.btn_eye_registroEmp').on('click', function (e) {
        chageBtnEye(this, ".registro__empresa__clave")
    })
});
function llenarSelectPaises() {
    $('.registro__empresa__pais').selectpicker('destroy');
    let htmlOptionPais;
    htmlOptionPais = `<option value="">${idioma.trans15}</option>`;
    $.each(paisesJSON_emp, function (i, pais_select) {
        htmlOptionPais += `<option value="${pais_select.country_id}">${pais_select.pais_name}</option>`;
    });
    $('.registro__empresa__pais').html(htmlOptionPais)
    $('.registro__empresa__pais').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false

    })
    let pais_origen = JSON.parse(localStorage.getItem("paisOrigen"));
    if (pais_origen) {
        let pais_id = pais_origen.country_id
        console.log(pais_origen, pais_id)
        $('.registro__empresa__pais').val(pais_id).selectpicker("refresh")
    }

}

function agregar_loading_ge_publi(clase) {
    let span_loading_ge = `<span class="spiner_modificar_publi">&nbsp;</span><span class="spinner-border spinner-border-sm spiner_modificar_publi" role="status" aria-hidden="true"></span>`
    $(clase).append(span_loading_ge);
}
function quitar_loading_ge_publi(clase) {
    $(clase).children(".spiner_modificar_publi").remove();
}
async function validarDatos(dataEmpresa) {
    var pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    var e = pattern.test(dataEmpresa.correo);

    var patternurl = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
    var eurl = patternurl.test(dataEmpresa.pagina_web);

    if (!validarText(dataEmpresa.razon_social)) {
        abrirAlerta(idioma['_trans457'], idioma['_trans02'])

    } else if (!validarText(dataEmpresa.nit)) {
        abrirAlerta(idioma['_trans457'], idioma['_trans03'])

    } else if (!validarText(dataEmpresa.correo) || !e) {
        abrirAlerta(idioma['_trans457'], idioma['_trans04'])

    } else if (!validarText(dataEmpresa.clave)) {
        abrirAlerta(idioma['_trans457'], idioma['_trans05'])

    } else if (validarText(dataEmpresa.pagina_web) && !eurl) {
        console.log(dataEmpresa.pagina_web, eurl, "mmmmmmmmmm");
        //cambiar el mensaje 
        abrirAlerta(idioma['_trans457'], idioma['_trans489'])
    } else if (!grecaptcha.getResponse(1) && !(location.href + "").includes("localhost")) {

        presentAlert(idioma['trans_04'], idioma['trans_05'], 'error');
    } else if (!validarPassword(dataEmpresa.clave)) {

        presentAlert(idioma['trans_04'], idioma['_trans892'], 'error');
    } else if (dataEmpresa.pais.trim().length == 0) {

        presentAlert(idioma['trans_04'], idioma['_trana942'], 'error');



        // } else if (!await validar_referido_registro_empresa(dataEmpresa.referido, dataEmpresa)) {
    } else {

        if (validarText(dataEmpresa.referido)) {
            agregar_loading_ge_publi('.loadin_registro_empresa');

            $.ajax({
                type: 'POST',
                url: `${serverUrl}controllers/users/usuarioExistente.php`,
                data: { "id": dataEmpresa.referido },
                dataType: 'json',
                // headers: { 'x-api-key': user.token },
            }).done((res) => {
                quitar_loading_ge_publi('.loadin_registro_empresa');
                if (res.length > 0) {
                    console.log(res);
                    // resolve(true);
                    crearEmpresa(dataEmpresa);

                } else {
                    // resolve(false);
                    managerInfoRef(dataEmpresa);
                }
            }).fail((err) => {

                quitar_loading_ge_publi('.loadin_registro_empresa');
                return presentAlertObject({ icon: 'error', text: idioma.trans277_ });
            });

        } else {
            crearEmpresa(dataEmpresa);
        }

    }
}

// Deprecada
async function validar_referido_registro_empresa(uid_referido_regi_empre = {}, dataEmpresa = {}) {
    if (validarText(uid_referido_regi_empre)) {

        agregar_loading_ge_publi('.loadin_registro_empresa');
        let respuesta = await si_uid_valido(uid_referido_regi_empre);
        quitar_loading_ge_publi('.loadin_registro_empresa');

        if (respuesta == false) {

            let pregunta = idioma.trans278_.split('$r').join(uid_referido_regi_empre);
            let respuesta_to_pregunta = await validar_cambio_campo_referido(pregunta);
            if (respuesta_to_pregunta == true) {
                $(".registro__empresa__referido").focus();
            } else {
                $(".registro__empresa__referido").val("");
                dataEmpresa.referido = "";
                crearEmpresa(dataEmpresa);
                return true;
            }
        } else {
            return true;
        }
    } else {
        return true;
    }
}
// Deprecada
function si_uid_valido(uid) {
    let dataEnviar = { id: uid };
    return new Promise((resolve) => {
        let data_url = serverUrl + "controllers/users/usuarioExistente.php";
        $.ajax({
            type: 'POST',
            url: data_url,
            data: dataEnviar,
            dataType: 'json',
        }).done((res) => {
            if (res.length > 0) {
                console.log(res);
                resolve(true);
            } else {
                resolve(false);
            }
        }).fail((err) => {

            resolve(false);
            return presentAlertObject({ icon: 'error', text: idioma.trans277_ });
        });
    });
}
function validar_cambio_campo_referido(pregunta) {
    $('#modal-confirmar-eliminar-info-empresa').modal('show');
    $('.pregunta_de_eliminar-info-empresa').text(pregunta);
    return new Promise((resolve) => {

        $('.no_eliminar_direccion-info-empresa').off('click');
        $('.no_eliminar_direccion-info-empresa').on('click', null, function () {
            $('#modal-confirmar-eliminar-info-empresa').modal('hide');
            resolve(false);
        });

        $('.si_eliminar_direccion-info-empresa').off('click');
        $('.si_eliminar_direccion-info-empresa').on('click', null, function () {
            $('#modal-confirmar-eliminar-info-empresa').modal('hide');
            resolve(true);
        });
    });
}


function managerInfoRef(dataEmpresa = {}) {
    $('#modal-confirmar-eliminar-info-empresa').modal('show');

    let pregunta = idioma['trans278_'].split('$r').join(dataEmpresa.referido);
    $('.pregunta_de_eliminar-info-empresa').text(pregunta);

    $('.no_eliminar_direccion-info-empresa').off('click');
    $('.no_eliminar_direccion-info-empresa').on('click', null, function ($event) {
        $('#modal-confirmar-eliminar-info-empresa').modal('hide');
        dataEmpresa.referido = "";
        crearEmpresa(dataEmpresa);
        console.log("\n\n\n Estoy pasando por: crearEmpresa(dataEmpresa);");
    });

    $('.si_eliminar_direccion-info-empresa').off('click');
    $('.si_eliminar_direccion-info-empresa').on('click', null, function ($event) {
        $('#modal-confirmar-eliminar-info-empresa').modal('hide');
        $(".registro__empresa__referido").focus();
        console.log("\n\n\n Estoy pasando por: $('.registro__empresa__referido').focus();");
    });
}
function crearEmpresa(dataEmpresa) {

    agregar_loading_ge_publi('.loadin_registro_empresa');
    let data_url = `${baseurl}/controllers/empresas/?registrar_empresa`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataEmpresa }),
        dataType: "json",
        contentType: 'application/json',
        success: async success => {

            console.log("\n\n\n\n\n\n\n\n");
            console.log("1). [ registrar_empresa ]: ", success);
            console.log("1). [ registrar_empresa ]: ", success);
            console.log("1). [ registrar_empresa ]: ", success);
            console.log("1). [ registrar_empresa ]: ", success);
            console.log("1). [ registrar_empresa ]: ", success);
            console.log("\n\n\n\n\n\n\n\n");


            quitar_loading_ge_publi('.loadin_registro_empresa');
            if (success["status"] == "success") {
                dataEmpresa.empresa = 1;
                let nacionalidad = await enviarNacionalidadUsuario(dataEmpresa)
                if (nacionalidad) {
                    uid = success['data']
                    $("#final-registro").modal("show")
                }
            } else if (success["status"] == "correoExiste") {
                abrirAlerta(idioma['_trans462'], idioma['_trans828'])
            } else if (success["status"] == "errorExitenciaCorreoPeers2Win") {
                abrirAlerta(idioma['_trans462'], idioma['_trans903'])

            } else {
                abrirAlerta(idioma['_trans06'], idioma['_trans487'])

            }

        }, error: error => {

            console.log("\n\n\n\n\n\n\n\n");
            console.log("2). [ registrar_empresa ]: ", error);
            console.log("2). [ registrar_empresa ]: ", error);
            console.log("2). [ registrar_empresa ]: ", error);
            console.log("2). [ registrar_empresa ]: ", error);
            console.log("2). [ registrar_empresa ]: ", error);
            console.log("\n\n\n\n\n\n\n\n");

            /*quitar_loading_ge_publi('.loadin_registro_empresa');
            abrirAlerta(idioma['_trans06'], idioma['_trans488']);*/


        }
    });
}
async function validarCodigoRegistro() {
    let codigo = $(".registro_empresa_codigo").val();
    if (!validarText(codigo)) return abrirAlerta(idioma['trans_04'], idioma['_trans863'])
    let response_validar = await getValidacionCodigoEmpresa(codigo, uid);
    ////////////////
    if (response_validar) {
        let empresaAuthData = {
            correo: dataEmpresa.correo,
            clave: dataEmpresa.clave,
            mostrar_alerta: false
        };
        loginEmpresaAuth(empresaAuthData, 1);
    }
}

function abrirAlerta(titulo, texto) {
    $(".alerta_titulo").text(titulo);
    $(".alerta_texto").text(texto);
    presentAlert(titulo, texto, "");
    // $("#modal_alertas_generales").modal("toggle");
}