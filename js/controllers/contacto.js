var arr_paises = [];
$(document).ready(($event) => {
    $(".contacto__btn").click(($event) => {
        $('.contacto__btn__spinner').show();
        $(".contacto__btn").attr("disabled", true);

        let list_errors = "";

        if (!$('.contacto__terms').is(':checked')) {
            list_errors += "<br>" + idioma['trans_07'];
        }
        if (!$('.contacto__politics').is(':checked')) {
            list_errors += "<br>" + idioma['trans_06'];
        }
        if (list_errors.length > 0) {
            presentAlert(idioma["trans_00"], list_errors, "info");
            $(".contacto__btn").attr("disabled", false);
            $('.contacto__btn__spinner').hide();
        } else {
            let params = {
                nombre: $('.contacto__name').val(),
                correo: $('.contacto__email').val(),
                iso_code_2: $('.contacto__country option:selected').val(),
                ciudad: $('.contacto__city').val(),
                telefono: $('.contacto__phone__number').val(),
                motivo: $('.contacto__interests option:selected').val()
            };
            isValidForm(params);
        }
    });/////////

    $("#bienvenida-contacto-user").on('hidden.bs.modal', function () {
        $('.contacto__name').val("");
        $('.contacto__email').val("");
        $('.contacto__city').val("");
        $('.contacto__phone__number').val("");
        $('.contacto__interests').val("");
        loadPage("index.php")
    });
});
function cargarPrimero() {
    getPaisesLocal();

}
function validarLogueado() {
    if (validarText(user)) {
        $('.contacto__name').val(user.nombreCompleto);
        if (user.email) {
            $('.contacto__email').val(user.email);
        } else if (user.correo) {
            $('.contacto__email').val(user.correo);
        } else {
            $('.contacto__email').val("");
        }
        if (user.paisid) {
            $('.contacto__country').val(user.paisid).selectpicker('refresh');
        } else if (user.iso_code_2) {
            $('.contacto__country').val(user.iso_code_2).selectpicker('refresh');
        } else {
            $('.contacto__country').val(47).selectpicker('refresh');
        }
        $('.contacto__city').val(user.ciudad ? user.ciudad : "")
        $('.contacto_phone_number').val(user.telefono ? user.telefono : "");

    }

}

function getPaisesLocal() {
    let data_url = serverUrl + "controllers/users/listarPaices.php";
    $.ajax({
        type: "POST",
        url: data_url,
        dataType: "json",
        contentType: 'application/json',
        // headers: { 'x-api-key': user.token },
        success: datos => {
            console.log("-----> getPaises: ", datos);

            if (datos['status'] == "success") {
                arr_paises = datos.paices;
                crearSelectOptionPais(arr_paises);
            } else {
                presentAlert(idioma['trans_04'], idioma['trans164'], 'error');
            }

        }, error: error => {
            console.log('error verify: ', error);
            presentAlert(idioma['trans_04'], idioma['trans164'], 'error');
        }
    });
}


function crearSelectOptionPais(arr = []) {
    $('.contacto__country').html("");
    $('.contacto__country').append($('<option>', {
        value: "",
        text: idioma.trans15
    }));
    arr.forEach((pais) => {
        $('.contacto__country').append($('<option>', {
            value: pais.id,
            text: pais.name
        }));
    });
    $('.contacto__country').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false

    })
    $(".contacto__interests").selectpicker()
    validarLogueado()
}
function isValidForm(params = {}) {
    let isValidForm = true;
    var pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    var e = pattern.test(params.correo);
    if (params.nombre.trim().length == 0) {
        $('.form-error_contacto__name').show("slow");
        isValidForm = false;
    } else {
        $('.form-error_contacto__name').hide();
    }
    if (params.correo.trim().length == 0 || !e) {
        $('.form-error_contacto__email').show("slow");
        isValidForm = false;
    } else {
        $('.form-error_contacto__email').hide();
    }

    if (params.iso_code_2.length == 0) {
        $('.form-error_contacto__country').show("slow");
        isValidForm = false;
    } else {
        $('.form-error_contacto__country').hide();
    }
    if (params.ciudad.trim().length == 0) {
        $('.form-error_contacto__city').show("slow");
        isValidForm = false;
    } else {
        $('.form-error_contacto__city').hide();
    }
    if (params.telefono.trim().length == 0) {
        $('.form-error_contacto__phone__number').show("slow");
        isValidForm = false;
    } else {
        $('.form-error_contacto__phone__number').hide();
    }
    if (params.interes == "t" || params.interes == "Interes") {
        $('.form-error_contacto__interests').show("slow");
        isValidForm = false;
    } else {
        $('.form-error_contacto__interests').hide();
    }
    if (isValidForm) {
        console.log(params)
        enviarDatosContacto(params);
    } else {
        $(".contacto__btn").attr("disabled", false);
        $('.contacto__btn__spinner').hide();
        setTimeout(() => {
            reiniciarLabelsErrors();
        }, 5000);
    }
}
function reiniciarLabelsErrors() {
    $('.form-error-control').hide();
}
function enviarDatosContacto(params) {
    let data_url = `${baseurl}/controllers/contacto/?enviar_mensaje`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": params },
        dataType: "json",
        success: datos => {
            console.log("Response codigo confirmación: ", datos);

            if (datos['status'] == "success") {

                console.log("------ paso por aqui");

                $(".contacto__btn").attr("disabled", false);
                $('.contacto__btn__spinner').hide();
                $('#bienvenida-contacto-user').modal('toggle');

            } else {
                $(".contacto__btn").attr("disabled", false);
                $('.contacto__btn__spinner').hide();
                presentAlert(idioma['trans_04'], idioma['trans_09'], 'error');
            }

        }, error: error => {
            $(".contacto__btn").attr("disabled", false);
            $('.contacto__btn__spinner').hide();
            console.log('error verify: ', error);
            presentAlert(idioma['trans_04'], idioma['trans_09'], 'error');
        }
    });

}