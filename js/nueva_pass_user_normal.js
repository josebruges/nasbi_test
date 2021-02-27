let ojito_pass_;
let ojito_pass_confirm;

validarlogueado_new_pass();
activar_ojito_new_pass();

$(document).ready((e) => {
    $(".ojito_pass").click(($event) => {
        cambio_ojito(".ojito_pass", ".nas_nue_pas", ojito_pass_, 1);

    });

    $(".ojito_pass_confirm").click(($event) => {
        cambio_ojito(".ojito_pass_confirm", ".nas_nue_pas_confirm", ojito_pass_confirm, 2);

    });

    $(".enviar_nueva_pass").click(($event) => {
        validar_campos_to_enviar();

    });

});

function validarlogueado_new_pass() {
    if (!validarText(user)) {
        return true;
    } else {
        loadPage("index.php?s=0")
    }
}

function activar_ojito_new_pass() {
    ojito_pass_ = 0;
    ojito_pass_confirm = 0
    $(".ojito_pass").addClass("far").addClass("fa-eye-slash");
    $(".ojito_pass_confirm").addClass("far").addClass("fa-eye-slash");
    $(".nas_nue_pas").prop("type", "password");
    $(".nas_nue_pas_confirm").prop("type", "password");
}


function cambio_ojito(class_ojito, class_input_pass, estado, id) {
    if (estado == 0) {
        $(class_ojito).removeClass("far").removeClass("fa-eye-slash")
        $(class_ojito).addClass("far").addClass("fa-eye");
        $(class_input_pass).prop("type", "text");
        if (id == 1) {
            ojito_pass_ = 1;
        } else {
            ojito_pass_confirm = 1;
        }
    } else if (estado == 1) {
        $(class_ojito).removeClass("far").addClass("fa-eye-slash");
        $(class_ojito).addClass("far").addClass("fa-eye-slash");
        $(class_input_pass).prop("type", "password");
        if (id == 1) {
            ojito_pass_ = 0;
        } else {
            ojito_pass_confirm = 0;
        }

    }

}


async function validar_campos_to_enviar() {
    let correo_uno = $('.correo_nueva_pass').val();
    let contra_uno = $('.nas_nue_pas').val();
    let contra_dos = $('.nas_nue_pas_confirm').val();

    if (validarText(contra_uno) && validarText(contra_dos) && validarText(correo_uno)) {
        let validar_correo = await validar_si_escorreo_newsleter(correo_uno);  //esta funcion esta en suscribir_correo_newsleter
        if (validar_correo) {
            if (validarPassword(contra_uno)) {


                if (contra_uno == contra_dos) {
                    preparar_token_new_pass(correo_uno, contra_uno, contra_dos);
                } else {
                    presentAlertObject({ icon: 'error', text: idioma.trans433_ });
                }
            } else {
                presentAlertObject({ icon: 'error', text: idioma['_trans892'] })
            }
        } else {
            presentAlertObject({ icon: 'error', text: idioma.trans287_ });
        }
    } else {
        console.log("mal");
        presentAlertObject({ icon: 'error', text: idioma._trans96 });
    }
}

function preparar_token_new_pass(correo_uno, contra_uno, contra_dos) {
    let params_token = new URLSearchParams(location.search);
    let token = params_token.get('t');
    if (validarText(token)) {
        token = decodeURI(token);
        console.log(token, "mmmmmmmmm");
        enviar_data_wbs_new_pass(correo_uno, contra_uno, contra_dos, token);

    } else {
        presentAlertObject({ icon: 'error', text: idioma._trans06 });
    }

}


function enviar_data_wbs_new_pass(correo_uno, contra_uno, contra_dos, token) {
    agregar_loading_ge_publi_footer(".enviar_nueva_pass"); //esta funcion esta en suscribir_correo_newsleter
    let data_url = API_URL + "/users/actualizarpass.php";
    const dataEnviar = {
        token: token,
        password: contra_uno,
        email: correo_uno
    }

    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
    }).done((res) => {
        if (res.status = "success") {
            quitar_loading_ge_publi_footer(".enviar_nueva_pass");
            presentAlertObject({ icon: 'error', text: idioma.trans435_ });
            setTimeout(() => {
                loadPage("index.php?s=0")
            }, 3000);
        } else {
            quitar_loading_ge_publi_footer(".enviar_nueva_pass");
            if (res.status = "errorTokenVensido") {
                presentAlertObject({ icon: 'error', text: idioma.trans434_ });
            } else {
                presentAlertObject({ icon: 'error', text: idioma._trans06 });
            }
        }

    }).fail((err) => {
        quitar_loading_ge_publi_footer(".enviar_nueva_pass");
        presentAlertObject({ icon: 'error', text: idioma.trans_04 });

    });


}