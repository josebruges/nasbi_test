
function validarlogueado() {
    if (validarText(user)) {
        return true;
    } else {
        loadPage("index.php?s=0")
    }

}

//las funciones agregar y quitar loading estan en resumen.js

$(document).ready(e => {

    let direcciones_miscuentas = localStorage.getItem("mis_cuentas");

    if (validarlogueado()) {
        if (direcciones_miscuentas == ".sidenav_direcciones") {
            $(direcciones_miscuentas).click();
            getdirecciones();
            getSelectPais_direcciones();
        }
    }


    $(".sidenav_direcciones").click(($event) => {
        if (validarlogueado()) {
            getdirecciones();
            // localStorage.setItem("mis_cuentas", ".sidenav_direcciones");
            redirigir_opcion_mis_cuentas(".sidenav_direcciones"); //esta funcion esta en resumen 
            getSelectPais_direcciones();
        }
    });

    $(".__btncreardireccion_cuenta").click(($event) => {
        nuevadireccion();
    });
    $(".crear_direccion_mis_cuentas").click(($event) => {
        crear_direccion_cuenta();
    });

    $(".cerrar_crear_dir").click(($event) => {
        document.getElementById("formulario_crear").reset();
    });





});




function getdirecciones() {
    agregar_loading_ge_publi('.dire_titu_mis_cuentas');

    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
        }
    }

    $('.ventas__list__nodata').show("slow");

    let data_url = baseurl + "/controllers/direcciones/?direcciones_usuario";
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {

        quitar_loading_ge_publi('.dire_titu_mis_cuentas');
        if (res.status == 'success') {

            if (res.status == 'success' && res.cantidad > 0) {
                $('.direcciones__list__nodata').hide();
                let direccionesUsuario = res.data;
                direccionesUsuario.map((data) => {
                    let paisesJSON_dir = JSON.parse(localStorage.getItem('paises'));
                    data.pais = paisesJSON_dir.filter(datos => datos.country_id == data.pais)[0];
                    data.departamento = data.pais.departamento.filter(datos => datos.zone_id == data.departamento)[0];
                    delete (data.pais.departamento);
                    return data;
                });
                llenarDirecciones(direccionesUsuario, res.cantidad);

            } else {
                let validate_token = await erroresTokenEmpresa(res);
                if (!validate_token) {
                    $('.__alldirecciones_cuenta').empty();
                    // return presentAlertObject({icon: 'info', text: idioma.trans47_});
                    $('.direcciones__list__nodata').show();
                }
            }


        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                $('.__alldirecciones_cuenta').empty();
                $('.direcciones__list__nodata').show();
                if (res.status == 'fail' && res.cantidad == 0) {
                    //   return presentAlertObject({icon: 'info', text: idioma.trans47_});
                } else {
                    return presentAlertObject({ icon: 'error', text: idioma.trans78 });
                }
            }

        }

    }).fail((err) => {
        quitar_loading_ge_publi('.dire_titu_mis_cuentas');
        $('.direcciones__list__nodata').show();
        $('.__alldirecciones_cuenta').empty();
        return presentAlertObject({ icon: 'error', text: idioma.trans78 });
    });


}


function llenarDirecciones(direccionesUsuario, cantidad) {
    // if(direccionesUsuario.length <= 0) return 0;
    $('.__alldirecciones_cuenta').empty();

    if (cantidad < 3) {
        $('.__btncreardireccion_cuenta').show('fast');
    } else {
        $('.__btncreardireccion_cuenta').hide('slow');
    }
    let activa, butonActivar = false;
    for (const x in direccionesUsuario) {
        const direccion = direccionesUsuario[x];
        activa = direccion.activa == 1 ? `<span class="text-primary">${idioma.trans21}</span>` : `<span class="text-secondary">${idioma.trans22}</span>`;
        butonActivar = direccion.activa == 1 ? `<a href="#" class="card-link __diruser" style="background-color: #3474FC;">${idioma.trans265}</a>` : `<a href="#" class="card-link __diruser">${idioma.trans31}</a>`;
        $('.__alldirecciones_cuenta').append(`
            <div class="col-sm-6 col-md-4 px-1">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${idioma.trans18}</h5>
                        <p class="card-text text-modal-direcciones">${idioma.trans15}: <span>${direccion.pais.pais_name}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans16}: <span>${direccion.departamento.name}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans17}: <span>${direccion.ciudad}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans18}: <span>${direccion.direccion}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans19}: <span>${direccion.codigo_postal}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans20}: <span>${activa}</span></p>
                        <div class="div-enlaces">
                            ${butonActivar}
                            <a href="#" class="card-link editar_dir_cuenta">${idioma.trans61}</a>
                            <a href="#" class="card-link eliminar_dir_cuenta" style="background-color: #FF103D;">${idioma.trans44}</a>
                        </div>
                    </div>
                </div>
            </div>
        `);
        $('.__diruser').eq(x).off('click');
        $('.__diruser').eq(x).on('click', { direccion: direccion }, activardireccion);

        $('.eliminar_dir_cuenta').eq(x).off('click');
        $('.eliminar_dir_cuenta').eq(x).on('click', { direccion: direccion }, eliminardireccion);

        $('.editar_dir_cuenta').eq(x).off('click');
        $('.editar_dir_cuenta').eq(x).on('click', { direccion: direccion }, llenardata_editar);



    }


}




async function llenardata_editar(dir) {
    const datadireccion = dir.data.direccion;
    let paisesJSON_dire = JSON.parse(localStorage.getItem('paises'));
    const paisusuario = paisesJSON_dire.filter(datos => datos.country_id == datadireccion.pais.country_id)[0];
    $('#modal-direccion-cuenta_editar').modal('show');

    $('.__paisnewdireccion_cuenta_e').val(paisusuario.pais_name).prop('disabled', true);
    cityInput(paisusuario, '__ciudadnewdireccion_e');
    $('.__divdepnewdireccion_e').html(`<select class="form-control __depnewdireccion_e select-plataforma"></select><p>${idioma.trans16}</p>`);

    $('.__depnewdireccion_e').empty();
    let htmloptionsdep = `<option value="0">${idioma.trans208_}</option>`;
    if (paisusuario.iso_code_2 == "CO") {
        let dep_tcc = await getDepartamentosTCC()
        $.each(dep_tcc, (i, item) => {
            htmloptionsdep += `<option value="${item["DANE DEPARTAMENT"]}">${item["DEPARTAMENTO"]}</option>`;
        })
        $(".__ciudadtccnewdireccion_e").html(`<option value="0">${idioma.trans208_}</option>`);
        $(".__ciudadtccnewdireccion_e").attr("disabled", true)
        $(".__ciudadtccnewdireccion_e").selectpicker()
        $(".__depnewdireccion_e").on('change', async function (e) {
            console.log(e)
            let ciudad_tcc = await getCiudadesTCC(e.target.value)
            let htmloptionsciud = "";
            $.each(ciudad_tcc, (i, item) => {
                htmloptionsciud += `<option value="${item["DANE"]}">${item["POBLACION"]}</option>`;
            })
            $(".__ciudadtccnewdireccion_e").selectpicker("destroy")

            $('.__ciudadtccnewdireccion_e').html(htmloptionsciud);
            $(".__ciudadtccnewdireccion_e").attr("disabled", false)
            $('.__ciudadtccnewdireccion_e').selectpicker({
                size: 7,
                liveSearch: true,
                dropupAuto: false,
            });
        })
    } else {
        for (const dep of paisusuario.departamento) { if (dep.zone_id != "") { htmloptionsdep += `<option value="${dep.zone_id}">${dep.name}</option>` } };
    }
    $('.__depnewdireccion_e').html(htmloptionsdep);
    $('.__depnewdireccion_e').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false
    });
    console.log(datadireccion.departamento.zone_id)
    // $('.__depnewdireccion_e').val(datadireccion.departamento.zone_id);
    //  $('.__depnewdireccion_e').selectpicker('refresh');

    // $('.__ciudadnewdireccion_e').val(datadireccion.ciudad);
    $('.__dirnewdireccion_e').val(datadireccion.direccion);
    $('.__codigopostalnewdireccion_e').val(datadireccion.codigo_postal);

    if (datadireccion.activa == 1) {
        $('.__activanewdireccion_e').prop('checked', true);
    } else {
        $('.__activanewdireccion_e').prop('checked', false);
    }



    $('.editar_direccion').off('click');
    $('.editar_direccion').on('click', { direccion: datadireccion, pais: paisusuario }, editardirecciondata);


}





function activardireccion(dir) {
    agregar_loading_ge_publi('.dire_titu_mis_cuentas');
    let datadireccion = dir.data.direccion;


    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            id: datadireccion.id
        }
    }

    $('.ventas__list__nodata').show("slow");

    let data_url = baseurl + "/controllers/direcciones/?activar";
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        quitar_loading_ge_publi('.dire_titu_mis_cuentas')
        if (res.status == 'success') {
            activada_direccion();

            //  return presentAlertObject({icon: 'info', text: idioma.trans52_});

        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                return presentAlertObject({ icon: 'error', text: idioma.trans51_ });
            }


        }

    }).fail((err) => {
        quitar_loading_ge_publi('.dire_titu_mis_cuentas')
        return presentAlertObject({ icon: 'error', text: idioma.trans51_ });

    });


}

async function activada_direccion() {
    let titulo, mensaje, respuesta;
    titulo = idioma._trans72;
    mensaje = idioma.trans234_;
    respuesta = await modal_aceptar_general_nasbi(titulo, mensaje);
    getdirecciones();

}


async function eliminardireccion(dir) {
    let data = dir.data.direccion;
    let direccion = data.direccion;
    let ciudad = data.ciudad;
    let departamento_dir_eli = data.departamento.name;
    let pais_dir_eli = data.pais.pais_name;
    let mensaje = idioma.trans61_.split('$d').join(direccion).split("$c").join(ciudad).split("$m").join(departamento_dir_eli).split("$p").join(pais_dir_eli);

    let decision = await validar_borrar_direccion(mensaje);

    if (!decision) return 0;

    let datadireccion = dir.data.direccion;
    agregar_loading_ge_publi('.dire_titu_mis_cuentas');

    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            id: datadireccion.id,
            activa: datadireccion.activa

        }
    }


    $('.ventas__list__nodata').show("slow");

    let data_url = baseurl + "/controllers/direcciones/?eliminar";
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        quitar_loading_ge_publi('.dire_titu_mis_cuentas');
        if (res.status == 'success') {

            getdirecciones();

        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                return presentAlertObject({ icon: 'error', text: idioma.trans48_ });
            }
        }

    }).fail((err) => {
        quitar_loading_ge_publi('.dire_titu_mis_cuentas');
        return presentAlertObject({ icon: 'error', text: idioma.trans48_ });
    });


}


function validar_borrar_direccion(pregunta) {
    $('#modal-confirmar-eliminar').modal('show');
    $('.pregunta_de_eliminar').text(pregunta);


    return new Promise((resolve) => {

        $('.no_eliminar_direccion').off('click');
        $('.no_eliminar_direccion').on('click', null, function () {
            $('#modal-confirmar-eliminar').modal('hide');
            resolve(false);
        });

        $('.si_eliminar_direccion').off('click');
        $('.si_eliminar_direccion').on('click', null, function () {
            $('#modal-confirmar-eliminar').modal('hide');
            resolve(true);
        });
    });

}

function modal_aceptar_general_nasbi(titulo, mensaje) {
    $('#modal-aceptar-ge').modal('show');
    $('.mensaje_ge_aceptar').text(mensaje);
    $('.titulo_modal_acep_ge').text(titulo);

    return new Promise((resolve) => {

        $('.aceptar_modal_nasbi').off('click');
        $('.aceptar_modal_nasbi').on('click', null, function () {
            $('#modal-aceptar-ge').modal('hide');
            resolve(true);
        });

        $('.cerra_modal_acep_ge').off('click');
        $('.cerra_modal_acep_ge').on('click', null, function () {
            $('#modal-aceptar-ge').modal('hide');
            resolve(false);
        });



    });

}


var autocomplete;
function cityInput(pais, classcity, tipo = 'dir') {
    let input = document.getElementsByClassName(classcity)[0];

    let options = {
        types: ['(cities)'],
        componentRestrictions: { country: pais._id }
    };



    autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

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


async function editardirecciondata(datadir) {
    const data_editar = datadir.data.direccion;
    const paisusuario = datadir.data.pais;
    let departamento = $('.__depnewdireccion_e')[1].value;
    let ciudad = $('.__ciudadnewdireccion_e').val();
    let direccion = $('.__dirnewdireccion_e').val();
    let codigopostal = $('.__codigopostalnewdireccion_e').val();
    let activa = $('.__activanewdireccion_e').is(':checked') == true ? 1 : 0;
    let long_enviar = "";
    let lat_enviar = "";
    let latitud_actual = data_editar.latitud;
    let longitud_actual = data_editar.longitud;
    let ciudadactual = data_editar.ciudad;
    let id_actual = data_editar.id;



    if (!validarText(paisusuario)) return presentAlertObject({ icon: 'error', text: idioma.trans55_ });
    if (!validarNumero(departamento)) return presentAlertObject({ icon: 'error', text: idioma.trans56_ });
    if (!validarText(ciudad)) return presentAlertObject({ icon: 'error', text: idioma.trans57_ });
    if (!validarText(autocomplete)) return presentAlertObject({ icon: 'error', text: idioma.trans57_ });
    if (!validarText(direccion)) return presentAlertObject({ icon: 'error', text: idioma.trans58_ });
    if (!validarText(codigopostal)) return presentAlertObject({ icon: 'error', text: idioma.trans59_ });
    if (ciudadactual != ciudad) {
        if (!autocomplete.getPlace()) {
            let __pais = $('.__paisnewdireccion_cuenta_e').val();
            let __estado = $('.__depnewdireccion_e option:selected').text();
            let __ciudad = $('.__ciudadnewdireccion_e').val();
            let latitud_longitud = await obtener_latitud_longitud(__pais, __estado, __ciudad);
            if (!validarText(latitud_longitud)) return presentAlertObject({ icon: 'error', text: idioma.trans457_ });
            long_enviar = latitud_longitud.lat;
            lat_enviar = latitud_longitud.lng;
        } else {
            long_enviar = autocomplete.getPlace().geometry.location.lng();
            lat_enviar = autocomplete.getPlace().geometry.location.lat();

        }
    } else {
        long_enviar = longitud_actual;
        lat_enviar = latitud_actual;
    }
    departamento = paisusuario.departamento.filter(datos => datos.zone_id == departamento)[0];
    let dataEnviar = {
        data: {
            id: id_actual,
            uid: user.uid,
            empresa: user.empresa,
            pais_isocode2: paisusuario.iso_code_2,
            pais: paisusuario.country_id,
            departamento: departamento.zone_id,
            departamento_isocode2: departamento.code.split('-')[1],
            ciudad,
            latitud: lat_enviar,
            longitud: long_enviar,
            codigo_postal: codigopostal,
            direccion,
            activa
        }
    }



    enviardataeditardir(dataEnviar);


}

function enviardataeditardir(dataEnviar) {
    agregar_loading_ge_publi('.editar_direccion');
    let data_url = baseurl + "/controllers/direcciones/?actualizar";
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        quitar_loading_ge_publi('.editar_direccion');
        if (res.status == 'success') {
            editada_direccion();
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                return presentAlertObject({ icon: 'error', text: idioma.trans49_ });
            }
        }

    }).fail((err) => {
        quitar_loading_ge_publi('.editar_direccion');
        return presentAlertObject({ icon: 'error', text: idioma.trans49_ });
    });

}

function editada_direccion() {
    //    let  titulo, mensaje; 
    //    titulo= "Direcci"
    //    let respuesta= modal_aceptar_general_nasbi(); 
    document.getElementById("formulario_editar").reset();
    $('#modal-direccion-cuenta_editar').modal('hide');
    $('.__ciudadnewdireccion_e').val("");
    $('.__dirnewdireccion_e').val("");
    $('.__codigopostalnewdireccion_e').val("");
    getdirecciones();

    //  return presentAlertObject({icon: 'info', text: idioma.trans50_});
}

async function nuevadireccion() {

    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    $('.__paisnewdireccion_cuenta_dir').val(paisusuario.pais_name).prop('disabled', true);
    cityInput(paisusuario, '__ciudadnewdireccion_dir');
    $('.__divdepnewdireccion_dir').html(`
        <select class="form-control __depnewdireccion_dir select-plataforma"></select>
        <p>${idioma.trans16}</p>
        `);
    $('.__depnewdireccion_dir').empty();
    let htmloptionsdep = `<option value="0">${idioma.trans208_}</option>`;

    if (paisusuario.iso_code_2 == "CO") { //// si el pais es colombia, usar nuevo JSON 
        let dep_tcc = await getDepartamentosTCC()
        $.each(dep_tcc, (i, item) => {
            htmloptionsdep += `<option value="${item["DANE DEPARTAMENT"]}">${item["DEPARTAMENTO"]}</option>`;
        })
        $(".__ciudadtccnewdireccion_dir").html(`<option value="0">${idioma.trans208_}</option>`);
        $(".__ciudadtccnewdireccion_dir").attr("disabled", true)
        $(".__ciudadtccnewdireccion_dir").selectpicker()

        $(".__depnewdireccion_dir").on('change', async function (e) {
            let ciudad_tcc = await getCiudadesTCC(e.target.value)
            let htmloptionsciud = "";
            $.each(ciudad_tcc, (i, item) => {
                htmloptionsciud += `<option value="${item["DANE"]}">${item["POBLACION"]}</option>`;
            })
            $(".__ciudadtccnewdireccion_dir").selectpicker("destroy")

            $('.__ciudadtccnewdireccion_dir').html(htmloptionsciud);
            $(".__ciudadtccnewdireccion_dir").attr("disabled", false)
            $('.__ciudadtccnewdireccion_dir').selectpicker({
                size: 7,
                liveSearch: true,
                dropupAuto: false,
            });

        })

    } else {
        for (const dep of paisusuario.departamento) { if (dep.zone_id != "") { htmloptionsdep += `<option value="${dep.zone_id}">${dep.name}</option>`; } }
        $('.__codigopostalnewdireccion_dir').prop('disabled', true);

        $('.__dirnewdireccion_dir').off('blur');
        $('.__dirnewdireccion_dir').on('blur', buscarPostalMisCodeEnvio_direcciones);
    }


    $('.__depnewdireccion_dir').html(htmloptionsdep);
    $('.__depnewdireccion_dir').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false,


    });


    $('.__depnewdireccion_dir').selectpicker('refresh');
    $('#modal-direccion-cuenta').modal('show');

    $('.__codigopostalnewdireccion_dir').prop('disabled', true);

    $('.__dirnewdireccion_dir').off('blur');
    $('.__dirnewdireccion_dir').on('blur', buscarPostalMisCodeEnvio_direcciones);


}




async function crear_direccion_cuenta() {

    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    let departamento = $('.__depnewdireccion_dir')[1].value;
    let ciudad = $('.__ciudadnewdireccion_dir').val();
    let direccion = $('.__dirnewdireccion_dir').val();
    let codigopostal = $('.__codigopostalnewdireccion_dir').val();
    let activa = $('.__activanewdireccion_dir').is(':checked') == true ? 1 : 0;
    let latitud;
    let longitud;


    // hacer copia y pega del editar en esta parte por lo del idioma en la alertas 
    if (!validarText(paisusuario)) return presentAlertObject({ icon: 'error', text: idioma.trans55_ });
    if (!validarNumero(departamento)) return presentAlertObject({ icon: 'error', text: idioma.trans56_ });
    if (!validarText(ciudad)) return presentAlertObject({ icon: 'error', text: idioma.trans57_ });
    if (!validarText(autocomplete)) return presentAlertObject({ icon: 'error', text: idioma.trans57_ });
    if (!validarText(direccion)) return presentAlertObject({ icon: 'error', text: idioma.trans58_ });
    if (!validarText(codigopostal)) return presentAlertObject({ icon: 'error', text: idioma.trans59_ });

    departamento = paisusuario.departamento.filter(datos => datos.zone_id == departamento)[0];
    if (!autocomplete.getPlace()) {
        let __pais = $('.__paisnewdireccion_cuenta_dir').val();
        let __estado = $('.__depnewdireccion_dir option:selected').text();
        let __ciudad = $('.__ciudadnewdireccion_dir').val();
        let latitud_longitud = await obtener_latitud_longitud(__pais, __estado, __ciudad);
        if (!validarText(latitud_longitud)) return presentAlertObject({ icon: 'error', text: idioma.trans457_ });
        latitud = latitud_longitud.lat;
        longitud = latitud_longitud.lng;
    } else {
        console.log("mmmmmmmmm poraqui");
        latitud = autocomplete.getPlace().geometry.location.lat();
        longitud = autocomplete.getPlace().geometry.location.lng();

    }


    agregar_loading_ge_publi('.crear_direccion_mis_cuentas');
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


    $.ajax({
        type: 'POST',
        url: baseurl + '/controllers/direcciones/?crear',
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        quitar_loading_ge_publi('.crear_direccion_mis_cuentas');
        $('#modal-direccion-cuenta').modal('hide');
        document.getElementById("formulario_crear").reset();
        getdirecciones();
        if (res.status == 'success') {
            //  presentAlertObject({icon: 'success', text: idioma.trans53_});
        } else if (res.status == 'maxDirecciones') {
            presentAlertObject({ icon: 'warning', text: idioma.trans54_ });
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                presentAlertObject({ icon: 'error', text: idioma._trans06 });
            }
        }
    }).fail((err) => {
        quitar_loading_ge_publi('.crear_direccion_mis_cuentas');
        $('#modal-direccion-cuenta').modal('hide');
        presentAlertObject({ icon: 'error', text: idioma._trans06 });
    });


}




//para lo de paises//


function getSelectPais_direcciones() {
    console.log(localStorage.getItem('paises'), localLenguaje, "mmmmmm");
    let paisesJSON_dire = JSON.parse(localStorage.getItem('paises'));
    let data = paisesJSON_dire;
    data.pais = paisesJSON_dire.filter(datos => datos.country_id == data.pais)[0];
    $('.select__pais_dire').selectpicker('destroy');
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));

    let htmlOptionPais_direccion = "";
    $.each(paisesJSON_dire, function (i, pais_select) {
        htmlOptionPais_direccion += `<option value="${pais_select.country_id}">${pais_select.pais_name}</option>`;
    });
    $('.select__pais_dire').html(htmlOptionPais_direccion);
    $('.select__pais_dire').off('changed.bs.select');
    $('.select__pais_dire').on('changed.bs.select', onChangePais);
    $('.select__pais_dire').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false,
        showSubtext: true
    });
    $('.select__pais_dire').val(paisusuario.country_id);
    $('.select__pais_dire').selectpicker('refresh');

}


function onChangePais($e) {
    let paisesJSON_dire = JSON.parse(localStorage.getItem('paises'));
    let id_direccion_pais = $e.target.value;
    const dato = paisesJSON_dire.find(pais => { return pais.country_id == id_direccion_pais });
    localStorage.setItem("paisOrigen", JSON.stringify(dato));

}

function buscarPostalMisCodeEnvio_direcciones() {
    console.log("hiiiiii");
    var pais = $('.__paisnewdireccion_cuenta_dir').val();
    var estado = $('.__depnewdireccion_dir option:selected').text();
    var ciudad = $('.__ciudadnewdireccion_dir').val();
    var direccion = $('.__dirnewdireccion_dir').val();
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
                $('.__codigopostalnewdireccion_dir').val(postal_code);
                $('.__codigopostalnewdireccion_dir').prop('disabled', false);
            }
        });
    }
}


function obtener_latitud_longitud(__pais, __estado, __ciudad) {
    console.log(__estado, "mmmmmmmm sjdhashdj");
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











