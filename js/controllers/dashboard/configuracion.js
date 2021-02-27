
var array_paises = []
var direccionesUsuario = []
var tarjetasUsuario = []
var ApiURL = 'https://peers2win.com/api/controllers';


let configuracion_mis_cuentas = localStorage.getItem("mis_cuentas");
if (("" + configuracion_mis_cuentas).includes('.sidenav_configuracion') || ("" + configuracion_mis_cuentas).includes('id-configuracion')) {
    $(configuracion_mis_cuentas).click();
    /*initCompras();*/
    if (user.empresa * 1 == 1) {
        localStorage.removeItem("mis_cuentas");
        loadPage("editar-empresa.php")
    } else {
        // localStorage.setItem("mis_cuentas", ".sidenav_configuracion"); este ya estaba comentado antes que el de la linea 29
        initConfiguraciones();
    }
}

$(document).ready(($event) => {
    $('.sidenav_configuracion').click(($event) => {

        if (user.empresa * 1 == 1) {
            localStorage.removeItem("mis_cuentas");
            loadPage('editar-empresa.php')
        } else {
            initConfiguraciones();
            // localStorage.setItem("mis_cuentas", ".sidenav_configuracion");
            redirigir_opcion_mis_cuentas(".sidenav_configuracion"); //esta funcion esta en resumen 
        }

    });

    const userAuthAux = JSON.parse(localStorage.getItem('userAuth'));
    const div_clave_antigua = document.getElementById('antigua_clave');
    if (!userAuthAux.clave_trans) {
        div_clave_antigua.style.display = "none";
    } else {
        div_clave_antigua.style.display = "block";
    }

    $(".__btncreardireccion").click(($event) => {
        crearDireccion()
    })
    $(".__btnanadirtarjeta").click(($event) => {
        anadirTarjeta()
    })
    $('.__save_detalles_tarjeta').click(($event) => {
        guardarTarjeta();
    })
    $('.guardar_cambios').click(($event) => {
        guardarCambios();
    })
    $('.select-idioma').change(($event) => {
        $(".spiner_guardar_idioma").show()
        cambiarIdiomaUsuario($event)
    })
    $('.disabled_usuario').click(($event) => {
        confirmarDisabledUsuario()
    })
    $('.btn_eye_desact').on('click', function (e) {
        chageBtnEye(this, ".input_motivo_desact")
    })
    $('.btn_eye_contraActual').on('click', function (e) {
        chageBtnEye(this, ".actual-contrasena")
    })
    $('.btn_eye_nuevaContra').on('click', function (e) {
        chageBtnEye(this, ".nueva-contrasena")
    })
    $('.btn_eye_confirContra').on('click', function (e) {
        chageBtnEye(this, ".confir-contrasena")
    })
    $('.btn_eye_actualClave').on('click', function (e) {
        chageBtnEye(this, ".actual-clave")
    })
    $('.btn_eye_nuevaClave').on('click', function (e) {
        chageBtnEye(this, ".nueva-clave")
    })
    $('.btn_eye_confirClave').on('click', function (e) {
        chageBtnEye(this, ".confir-clave")
    })
    params_to_deactivate();
});



function cargarPrimero() { }

function initConfiguraciones() {
    cargarUserInfo()
    //getDomicilios();
    //llenarTarjetas()
    getMetodosPago();
}
function mostrar(input, label, button, select) {
    select == 1 ? $('.' + input).selectpicker('show') : $('.' + input).show();
    $('.' + label).hide();
    $('.' + button).attr('onclick', 'ocultar("' + input + '", "' + label + '", "' + button + '",' + select + ')');
}
function ocultarInput(id) {
    $('.' + id).hide();
}
function mostarLabel(id) {
    $('.' + id).show();

}

function ocultar(input, lebal, button, select) {
    $('.' + lebal).text(select == 1 ? $('.' + input + ' option:selected').text() : $('.' + input).val());
    select == 1 ? $('.' + input).selectpicker('hide') : $('.' + input).hide();
    $('.' + lebal).show();
    $('.' + button).attr('onclick', 'mostrar("' + input + '", "' + lebal + '", "' + button + '",' + select + ')');
}


async function cargarUserInfo() {
    let fiat = await llenarFiat()
    let pais = await getPaisesLocal()

    ocultarInput("input-usuario")
    ocultarInput("input-correo")
    ocultarInput("input-clave")
    ocultarInput("input-nombre")
    ocultarInput("input-documento")
    ocultarInput("input-telefono")
    ocultarInput("input-pago")
    mostarLabel("label-usuario")
    mostarLabel("label-correo")
    mostarLabel("label-clave")
    mostarLabel("label-nombre")
    mostarLabel("label-documento")
    mostarLabel("label-telefono")
    mostarLabel("label-pais")
    mostarLabel("label-pago")
    mostarLabel("label-fiat")
    showDispositivos()

    if (pais && fiat) {
        $(".input-usuario").val(user.username)
        $(".label-usuario").text(user.username)

        $(".input-correo").val(user.email)
        $(".label-correo").text(user.email)

        $(".input-nombre").val(user.nombreCompleto != undefined && user.nombreCompleto != null ? user.nombreCompleto : '')
        $(".label-nombre").text(user.nombreCompleto != undefined && user.nombreCompleto != null ? user.nombreCompleto : idioma['_trans459'])

        $(".input-telefono").val(user.telefono != undefined && user.telefono != null ? user.telefono : '')
        $(".label-telefono").text(user.telefono != undefined && user.telefono != null ? user.telefono : idioma['_trans459'])
        // $('.input-fiat').val(user.fiat != undefined && user.fiat != null ? user.fiat : '').selectpicker('refresh');
        let moneda = Object.values(divisasJSON).filter(row => (row.code == user.fiat))[0]
        console.log(moneda)
        $('.label-fiat').text(moneda.code + " - " + moneda.nombre_moneda);
        $('#doblefactorcheck').prop('checked', user.notificaciones ? true : false)
        $('input:radio[name="avatar"]').filter('[value=' + user.avatar + ']').attr('checked', true);
        var resul = array_paises.find(f => f.id == user.paisid);
        if (!validarText(resul)) return; // #juanito Se colocó esta validación para que no moleste revisar Gissel
        $(".label-pais").text(resul.name != undefined && resul.name != null ? resul.name : idioma['_trans459'])
        $(".input-pais").val(resul.id != undefined && resul.id != null ? resul.id : '').selectpicker('refresh')
    }
}
function llenarFiat() {
    return new Promise((resolve) => {

        $('.input-fiat').selectpicker('destroy');

        let htmlfiat;
        $.each(divisasJSON, function (i, ref) {
            htmlfiat += `<option value="${ref.code}">${ref.code} - ${ref.nombre_moneda}</option>`;
        });
        $('.input-fiat').html(htmlfiat);
        $('.input-fiat').selectpicker({
            size: 7,
            dropupAuto: false,
            liveSearch: true
        })
        $('.input-fiat').selectpicker('hide')
        $(".navbar__idioma").selectpicker()
        resolve(true)
    });


}
function getPaisesLocal() {
    return new Promise((resolve) => {
        let data_url = serverUrl + "controllers/users/listarPaices.php";
        // let data_url = 'http://https://nasbi.peers2win.com/api/controllers/users/date.php'
        $.ajax({
            type: "GET",
            url: data_url,
            dataType: "json",
            // headers: { 'x-api-key': user.token },
            // contentType: 'application/json',
            success: datos => {
                if (datos['status'] == "success") {
                    array_paises = datos.paices;
                    llenarPaises()
                    resolve(true)
                } else {
                    resolve(false)
                    abrirAlerta(idioma['_trans462'], idioma['_trans113']);
                }

            }, error: error => {
                resolve(false)
                abrirAlerta(idioma['_trans462'], idioma['_trans113']);
            }
        });
    });
}
function llenarPaises() {

    $('.input-pais').selectpicker('destroy');

    let htmlpaises;
    $.each(array_paises, function (i, ref) {
        htmlpaises += `<option value="${ref.id}">${ref.name}</option>`;
    });
    $('.input-pais').html(htmlpaises);
    $('.input-pais').selectpicker({
        size: 7,
        dropupAuto: false,
        liveSearch: true
    })
    $('.input-pais').selectpicker('hide')


}

function getDomicilios() {
    let dataDomicilios = {
        uid: user.uid,
        empresa: user.empresa
    }
    let data_url = baseurl + "/controllers/direcciones/?direcciones_usuario";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataDomicilios },
        dataType: "json",
        success: datos => {
            $(".info_activo").css("display", "");
            $('.label-domicilio').text("");

            if (datos['status'] == "success") {
                direccionesUsuario = datos['data']
                direccionesUsuario.map((data) => {

                    /*Corrección para gisel */

                    paisesJSON = JSON.parse(localStorage.getItem('paises'));

                    data.pais = paisesJSON.filter(datos => datos.country_id == data.pais)[0];

                    data.departamento = data.pais.departamento.filter(datos => datos.zone_id == data.departamento)[0];

                    return data;
                });
                generateItemsDomiHtml();
            } else {
                $(".info_activo").css("display", "none");
                $('.label-domicilio').text(idioma['_trans69']);

            }

        }, error: error => {

            abrirAlerta(idioma['_trans462'], idioma['_trans461']);
        }
    });

}
function getMetodosPago() {
    let dataMetodos = {
        uid: user.uid,
        empresa: user.empresa
    }

    let data_url = baseurl + "/controllers/tarjetas_bancarias/?tarjetas_bancarias_usuario";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataMetodos }),
        dataType: "json",
        contentType: 'application/json',
        success: datos => {
            if (datos['status'] == "success") {
                tarjetasUsuario = datos['data']

            } else {
                $('.label-tarjetas').text(idioma['_trans70']);

            }

        }, error: error => {
            console.log(error);
            abrirAlerta(idioma['trans_04'], idioma['trans_09']);
        }
    });

}
function generateItemsDomiHtml() {

    let domiactivo = direccionesUsuario.find(t => t.activa == 1)
    $('.__pais').val(domiactivo.pais.pais_name)
    $('.__departamento').val(domiactivo.departamento.name)
    $('.__ciudad').val(domiactivo.ciudad)
    $('.__direccion').val(domiactivo.direccion)
    $('.__zip').val(domiactivo.codigo_postal)

}

function showModalDirecciones() {
    if (direccionesUsuario.length <= 0) {
        crearDireccion();
    } else {
        $('#modal-direcciones').modal("toggle")
        generateItemsDireccHtml()
    }

}
function showModalMetodos() {
    if (tarjetasUsuario.length <= 0) {
        anadirTarjeta()
    } else {
        generateItemsTarjetaHtml()
        $('#modal-tarjetas').modal("toggle")

    }

}

///////////////////////MODALES DIRECCIONES////////////////////////////


function generateItemsDireccHtml() {
    $('.__alldirecciones').empty();
    let activa, butonActivar = false;
    for (const x in direccionesUsuario) {

        activa = direccionesUsuario[x].activa == 1 ? `<span class="activo">${idioma.trans21}</span>` : `<span class="text-secondary">${idioma.trans22}</span>`;
        butonActivar = direccionesUsuario[x].activa == 1 ? `<a href="#" class="activo card-link __diruser"></a>` : `<a href="#" class="activo card-link __diruser">${idioma.trans31}</a>`;
        $('.__alldirecciones').append(`
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="title-section card-title">${idioma.trans18} ${parseInt(x) + 1}</h5>
                        <p class="card-text text-modal-direcciones">${idioma.trans15}: <span>${direccionesUsuario[x].pais.pais_name}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans16}: <span>${direccionesUsuario[x].departamento.name}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans17}: <span>${direccionesUsuario[x].ciudad}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans18}: <span>${direccionesUsuario[x].direccion}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans19}: <span>${direccionesUsuario[x].codigo_postal}</span></p>
                        <p class="card-text text-modal-direcciones">${idioma.trans20}: <span>${activa}</span></p>
                        
                        ${butonActivar}
                        <a class="editar_direccion ">${idioma.trans61}</a>
                        <a class="eliminar_direccion ">${idioma.trans44}</a>
                    </div>
                    
                </div>
            </div>
        `);
        $('.editar_direccion').eq(x).off('click');
        $('.editar_direccion').eq(x).on('click', { id: direccionesUsuario[x].id }, editardireccion);
        $('.eliminar_direccion').eq(x).off('click');
        $('.eliminar_direccion').eq(x).on('click', { id: direccionesUsuario[x].id }, eliminarDireccion);
        $('.__diruser').eq(x).off('click');
        $('.__diruser').eq(x).on('click', { id: direccionesUsuario[x].id }, activarDireccion);
    }
}

function activarDireccion(e) {


    let dataEnviar = {
        data:
        {
            uid: user.uid,
            empresa: user.empresa,
            id: e.data.id
        }

    }


    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/direcciones/?activar`,
        data: dataEnviar,
        dataType: 'json',
    }).done((res) => {

        $('#modal-direcciones').modal('hide');
        getDomicilios();
        if (res.status == 'success') {
            abrirAlerta(idioma._trans72, idioma["_trans465"])

        } else {
            abrirAlerta(idioma['_trans06'], idioma['_trans467']);
        }
    }).fail((err) => {
        $('#modal-direcciones').modal('hide');
        abrirAlerta(idioma['_trans06'], idioma['_trans466']);
    });


}
function crearDireccion() {
    $('.__ciudadnewdireccion').val("");
    $('.__dirnewdireccion').val("");
    $('.__codigopostalnewdireccion').val("");
    $('.__activanewdireccion').prop("checked", false);
    if (direccionesUsuario.length >= 3) return abrirAlerta(idioma['_trans462'], idioma['trans54_']);
    $('.__paisnewdireccion').val(paisOrigen.pais_name).prop('disabled', true);
    cityInput(paisOrigen, '__ciudadnewdireccion');
    $('.__divdepnewdireccion').html(`
        <select class=" __depnewdireccion select-plataforma"></select>
        <p>${idioma.trans16}</p>
    `);
    $('.__depnewdireccion').empty();

    let htmloptionsdep = `<option value="0">${idioma.trans208_}</option>`;
    $.each(paisOrigen.departamento, function (i, dep) {
        htmloptionsdep += `<option value="${dep.zone_id}">${dep.name}</option>`;
    })
    $('.__depnewdireccion').html(htmloptionsdep);
    $('.__depnewdireccion').selectpicker({
        size: 7,
        dropupAuto: false,
        width: 'auto'
    })


    $('.__dirnewdireccion').off('changed');
    $('.__dirnewdireccion').on('changed', buscarPostalMisCodeEnvio);
    $('#modal-direcciones').modal('hide');
    setTimeout(() => {
        $('#modal-direcciones-crear').modal('show');

    }, 1000);

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
var midepartamento;
var mipais
function editardireccion(ev) {
    let id = ev.data.id
    $('.__ciudadnewdireccion').val("");
    $('.__dirnewdireccion').val("");
    $('.__codigopostalnewdireccion').val("");
    var midireccion = direccionesUsuario.find(d => d.id == id)
    mipais = midireccion.pais
    $('.__paisnewdireccion').val(midireccion.pais.pais_name).prop('disabled', true);
    cityInput(midireccion.pais, '__ciudadnewdireccion');
    $('.__divdepnewdireccion').html(`
        <select class=" __depnewdireccion select-plataforma"></select>
        <p>Departamento</p>
    `);
    $('.__depnewdireccion').empty();


    midepartamento = midireccion.pais['departamento']
    let htmloptionsdep = `<option value="0">${idioma.trans55}</option>`;
    $.each(midepartamento, function (i, dep) {
        htmloptionsdep = `<option value="${dep.zone_id}">${dep.name}</option>`;
        $('.__depnewdireccion').append(htmloptionsdep);

    })

    let activa;
    if (midireccion.activa == 1) {
        activa = true
    } else {
        activa = false
    }

    $('.__depnewdireccion').val(midireccion.departamento.zone_id);
    $('.__depnewdireccion').selectpicker({
        size: 7,
        dropupAuto: false,
        width: 'auto'
    })

    // $('.__ciudadnewdireccion').val(midireccion.ciudad);
    $('.__dirnewdireccion').val(midireccion.direccion);
    $('.__codigopostalnewdireccion').val(midireccion.codigo_postal);
    $('.__activanewdireccion').prop("checked", activa);
    $('.__activanewdireccion').attr("disabled", activa);

    $('.__dirnewdireccion').off('changed');
    $('.__dirnewdireccion').on('changed', buscarPostalMisCodeEnvio);
    $('#modal-direcciones').modal('hide');
    setTimeout(() => {
        $('#modal-direcciones-crear').modal('show');
    }, 1000);

    $('.__save_detalles_envio').off('click');
    $('.__save_detalles_envio').on('click', { id: id }, guardarEditar);

}
function guardarEditar(id) {
    let departamento = $('.__depnewdireccion option:selected').val()
    let ciudad = $(".__ciudadnewdireccion").val();
    let direccion = $(".__dirnewdireccion").val();
    let codigopostal = $(".__codigopostalnewdireccion").val();
    let activa = $(".__activanewdireccion").is(':checked') == true ? 1 : 0;

    if (!validarText(paisOrigen)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['trans15']);
    if (!validarNumero(departamento)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['trans16']);
    if (!validarText(ciudad)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['trans17']);
    if (!validarText(autocomplete)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['trans17']);
    if (!validarText(direccion)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['trans18']);
    if (!validarText(codigopostal)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['trans19']);

    let departamentoosd = midepartamento.find(d => d.zone_id == departamento)

    let dataEnviar = {
        data: {

            uid: user.uid,
            empresa: user.empresa,
            pais_isocode2: mipais.iso_code_2,
            pais: mipais.country_id,
            departamento: departamentoosd.zone_id,
            departamento_isocode2: departamentoosd.code.split('-')[1],
            ciudad,
            latitud: autocomplete.getPlace().geometry.location.lng(),
            longitud: autocomplete.getPlace().geometry.location.lat(),
            codigo_postal: codigopostal,
            direccion,
            activa,
            id: id.data.id
        }

    }
    $.ajax({
        type: 'POST',
        url: baseurl + "/controllers/direcciones/?actualizar",
        data: dataEnviar,
        dataType: 'json',
    }).done((res) => {

        $('#modal-direcciones-crear').modal('hide');
        getDomicilios();
        if (res.status == 'success') {
            abrirAlerta(idioma.trans50_, idioma['_trans465'])

        } else {
            abrirAlerta(idioma['_trans06'], idioma['_trans472']);
        }
    }).fail((err) => {
        $('#modal-direcciones-crear').modal('hide');
        abrirAlerta(idioma['_trans06'], idioma['_trans473']);
    });

}


async function eliminarDireccion(ev) {
    let id = ev.data.id
    let decision = await confirmarEliminarGeneral(idioma._trans115);
    if (!decision) return 0;
    let diractiva = direccionesUsuario.find(f => f.id == id)

    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            id: id,
            activa: diractiva.activa

        }
    }


    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/direcciones/?eliminar`,
        data: dataEnviar,
        dataType: 'json',
    }).done((res) => {

        $('#modal-direcciones').modal('hide');
        getDomicilios();
        if (res.status == 'success') {
            abrirAlerta(idioma._trans75, idioma['_trans464'])

        } else {
            abrirAlerta(idioma['_trans06'], idioma['_trans469']);
        }
    }).fail((err) => {
        $('#modal-direcciones').modal('hide');
        abrirAlerta(idioma['_trans06'], idioma['_trans470']);
    });

}


function guardarDireccion() {
    $(".spiner_crear_direccion").show()
    $(".__save_detalles_envio").attr('disabled', true)
    let departamento = $(".__depnewdireccion option:selected").val()
    let ciudad = $('.__ciudadnewdireccion').val();
    let direccion = $('.__dirnewdireccion').val();
    let codigopostal = $('.__codigopostalnewdireccion').val();
    let activa = $('.__activanewdireccion').is(':checked') == true ? 1 : 0;

    if (!validarText(paisOrigen)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['trans15']);
    if (!validarNumero(departamento)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['trans16']);
    if (!validarText(ciudad)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['trans17']);
    if (!validarText(autocomplete)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['trans17']);
    if (!validarText(direccion)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['trans18']);
    if (!validarText(codigopostal)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['trans19']);

    departamento = paisOrigen.departamento.filter(datos => datos.zone_id == departamento)[0];

    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            pais_isocode2: paisOrigen.iso_code_2,
            pais: paisOrigen.country_id,
            departamento: departamento.zone_id,
            departamento_isocode2: departamento.code.split('-')[1],
            ciudad,
            latitud: autocomplete.getPlace().geometry.location.lng(),
            longitud: autocomplete.getPlace().geometry.location.lat(),
            codigo_postal: codigopostal,
            direccion,
            activa
        }
    }

    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/direcciones/?crear`,
        data: dataEnviar,
        dataType: 'json',
    }).done((res) => {

        $('#modal-direcciones-crear').modal('hide');
        getDomicilios();
        if (res.status == 'success') {
            abrirAlerta(idioma._trans74, idioma['_trans465'])
        } else if (res.status == 'maxDirecciones') {
            abrirAlerta(idioma['_trans06'], idioma['_trans81']);
        } else {
            abrirAlerta(idioma['_trans06'], idioma['_trans472']);
        }
        $(".spiner_crear_direccion").hide()
        $(".__save_detalles_envio").attr('disabled', false)
    }).fail((err) => {
        $('#modal-direcciones-crear').modal('hide');
        abrirAlerta(idioma['_trans06'], idioma['_trans473']);
    });
}
///////////////////////////MODALES TARJETAS///////////////////////////////
function generateItemsTarjetaHtml() {
    $('.__alltarjetas').empty();
    for (const x in tarjetasUsuario) {
        let tipo;
        if (tarjetasUsuario[x].tipo == 1) {
            tipo = idioma['_trans82']

        } else {
            tipo = idioma['_trans83']
        }
        $('.__alltarjetas').append(`
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="title-section card-title">${idioma._trans199} ${parseInt(x) + 1}</h5>
                        <p class="card-text text-modal-tarjetas">${idioma._trans84}: <span>${tipo}</span></p>
                        <p class="card-text text-modal-tarjetas">${idioma._trans85}: <span>${tarjetasUsuario[x].numero}</span></p>
                        <p class="card-text text-modal-tarjetas">${idioma._trans86}: <span>${tarjetasUsuario[x].ccv}</span></p>
                        <p class="card-text text-modal-tarjetas">${idioma._trans87}: <span>${tarjetasUsuario[x].mes_expiriacion}</span></p>
                        <p class="card-text text-modal-tarjetas">${idioma._trans88}: <span>${tarjetasUsuario[x].ano_expiriacion}</span></p>
                        <p class="card-text text-modal-tarjetas">${idioma._trans89}: <span>${tarjetasUsuario[x].nombre}</span></p>
                        <p class="card-text text-modal-tarjetas">${idioma._trans90}: <span>${tarjetasUsuario[x].apellido}</span></p>
                        <p class="card-text text-modal-tarjetas">${idioma._trans91}: <span>${tarjetasUsuario[x].direccion}</span></p>
                        <p class="card-text text-modal-tarjetas">${idioma._trans92}: <span>${tarjetasUsuario[x].telefono}</span></p>
                       
                        
                    </div>
                   
                    <a onclick="eliminartarjeta(${tarjetasUsuario[x].id})" class="eliminar_direccion">${idioma.trans44}</a>
                </div>
            </div>
        `);

    }
}
function llenarTarjetas() {
    var tipos_tarjetas = [
        { "id": 1, "nombre": idioma['_trans82'] },
        { "id": 2, "nombre": idioma['_trans83'] },
    ]
    $('.__tipoTarjeta').empty();
    let htmlOption;
    $.each(tipos_tarjetas, function (i, tipo) {
        htmlOption += `<option value="${tipo.id}">${tipo.nombre}</option>`;
    });
    $('.__tipoTarjeta').html(htmlOption);

}
function anadirTarjeta() {
    if (tarjetasUsuario.length >= 1) {
        console.log("-----> paso por aqui error (tarjetasUsuario): ", tarjetasUsuario);
        return abrirAlerta(idioma['trans_04'], idioma['_trans204'])
    };

    $('#modal-tarjetas').modal("hide")
    setTimeout(() => {
        $('#modal-tarjeta-crear').modal("toggle")
    }, 1000);
    $('.__save_detalles_tarjeta').off('click');
    $('.__save_detalles_tarjeta').on('click', guardarTarjeta);


}
function guardarTarjeta() {
    let tipo = $('.__tipoTarjeta option:selected').val()
    let numero = $(".__numeroTarjeta").val();
    let ccv = $(".__ccvTarjeta").val();
    let mes = $(".__mesTarjeta").val();
    let ano = $(".__anoTarjeta").val();
    let nombre = $(".__nombreTarjeta").val();
    let apellido = $(".__apellidoTarjeta").val();
    let direccion = $(".__direccionTarjeta").val();
    let telefono = $(".__telefonoTarjeta").val();


    if (!validarNumero(tipo)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans84']);
    if (!validarNumero(numero)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans85']);
    if (!validarNumero(ccv)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans86']);
    if (!validarNumero(mes)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans87']);
    if (!validarNumero(ano)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans88']);
    if (!validarText(nombre)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans89']);
    if (!validarText(apellido)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans90']);
    if (!validarText(direccion)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans91']);
    if (!validarNumero(telefono)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans92']);
    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            numero: numero,
            ccv: ccv,
            mes_expiriacion: mes,
            ano_expiriacion: ano,
            nombre: nombre,
            apellido: apellido,
            direccion: direccion,
            telefono: telefono,
            tipo: tipo
        }
    }


    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/tarjetas_bancarias/?crear`,
        data: dataEnviar,
        dataType: 'json',
    }).done((res) => {

        $('#modal-tarjeta-crear').modal("hide")
        getMetodosPago();
        if (res.status == 'success') {
            abrirAlerta(idioma._trans12, idioma['_trans94'])
        } else {
            abrirAlerta('error', idioma['_trans73']);
        }
    }).fail((err) => {
        $('#modal-tarjeta-crear').modal("hide")
        presentAlertObject({ icon: 'error', text: idioma['_trans73'] });
    });
}

async function eliminartarjeta(id) {
    let decision = await confirmarEliminarGeneral(idioma._trans115);
    if (!decision) return 0;

    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            id: id

        }
    }


    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/tarjetas_bancarias/?eliminar`,
        data: dataEnviar,
        dataType: 'json',
    }).done((res) => {

        $('#modal-tarjeta-crear').modal('hide');
        getMetodosPago();
        if (res.status == 'success') {
            abrirAlerta(idioma._trans12, idioma['_trans95'])
        } else {
            abrirAlerta('error', idioma['_trans73']);
        }
    }).fail((err) => {
        $('#modal-tarjeta-crear').modal('hide');
        presentAlertObject({ icon: 'error', text: idioma['_trans73'] });
    });

}
//////////////////////////////////////////////
function abrirModalContraseña() {
    $('#modal-cambiar-contrasena').modal('show');
    $('.cambiar_contrasena').click(($event) => {

        var password = $('.actual-contrasena').val();
        var nuevo = $('.nueva-contrasena').val();
        var confNuevo = $('.confir-contrasena').val();
        var error = "";
        if (!validarText(password) || !validarText(nuevo) || !validarText(confNuevo)) {
            error = idioma['_trans96']
        } else if (!validarPassword(nuevo)) {
            error = idioma['_trans892']
        } else if (nuevo != confNuevo) {
            error = idioma['_trans97']
        } else if (password == nuevo) { ///  cambio git
            error = idioma['_trans98']
        } else {

        }
        if (error != "") {
            abrirAlerta("Error", error)
        } else {
            $(".spiner_cambiar_contra").show()
            $(".cambiar_contrasena").attr('disabled', true)
            var data = {
                id: user.uid,
                email: user.email,
                password: password,
                nueva: nuevo
            };
            $.ajax({
                type: "POST",
                url: ApiURL + "/users/updatePassword.php",
                data: data,
                dataType: "json",
                headers: { 'x-api-key': user.token },
            }).then((res) => {
                $(".spiner_cambiar_contra").hide()
                $(".cambiar_contrasena").attr('disabled', false)
                if (res.status == 'success') {
                    $('#modal-cambiar-contrasena').modal('hide');
                    $('.actual-contrasena').val('');
                    $('.nueva-contrasena').val('');
                    $('.confir-contrasena').val('');
                    abrirAlerta(idioma['_trans12'], idioma['_trans99'])

                } else if (res.status == 'errorUser') {
                    $('#modal-cambiar-contrasena').modal('hide');

                    console.log("-----> paso por aqui error (res): ", res);
                    abrirAlerta(idioma['trans_04'], idioma['_trans100'])
                } else if (res['status'] == 'errorPassword') {
                    console.log("-----> paso por aqui error (res): ", res);
                    abrirAlerta(idioma['trans_04'], idioma['_trans101'])
                }
            });
        }

    })

}
/////////////////GUARDAR CAMBIOS//////////////////////////////
function guardarCambios() {

    var username = $('.input-usuario').val();
    var nombreCompleto = $('.input-nombre').val();
    var email = $('.input-correo').val();
    var telefono = $('.input-telefono').val();
    var pais = user.paisid;
    var notificacion = $('#doblefactorcheck').prop('checked');
    var avatar = $("input[name='avatar']:checked").val();
    var fiat = user.fiat



    if (!validarText(username)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans102']);
    if (!validarText(nombreCompleto)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans103']);
    if (!validarText(email)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans104']);
    if (!validarNumero(telefono)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans105']);
    if (!validarText(pais)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans106']);
    if (!validarText(fiat)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans107']);
    $(".spiner_guardar_cambios").show()
    $(".guardar_cambios").attr('disabled', true)
    paisOrigen = buscarPais('iso_code_2', pais);
    paisOrigen.departamentoSelect = paisOrigen.departamento[0].zone_id;


    $('.dropdown__departamentos').val(paisOrigen.departamentoSelect.zone_id);

    loadingDropdownDepartamentos(paisOrigen, 'dropdown__departamentos');


    localStorage.setItem("paisOrigen", JSON.stringify(paisOrigen));

    let dataEnviar = {
        username,
        nombreCompleto,
        email,
        telefono,
        pais,
        id: user.uid,
        notificacion: notificacion ? 1 : 0,
        avatar: avatar,
        fiat,
    };


    $.ajax({
        type: "POST",
        url: ApiURL + "/users/updateUsuario.php",
        data: dataEnviar,
        dataType: "json",
        headers: { 'x-api-key': user.token },
        success: res => {
            $(".guardar_cambios").attr('disabled', false)
            if (res["status"] == "success") {
                user.username = dataEnviar.username;
                user.nombreCompleto = dataEnviar.nombreCompleto;
                user.email = dataEnviar.email;
                user.telefono = dataEnviar.telefono;
                user.paisid = dataEnviar.pais;
                user.notificaciones = dataEnviar.notificacion;
                user.avatar = dataEnviar.avatar;
                user.fiat = dataEnviar.fiat;

                localStorage.setItem('userAuth', JSON.stringify(user));
                abrirAlerta(idioma['_trans474'], idioma['_trans108'])
                cargarUserInfo()
                ocultar('input-usuario', 'label-usuario', 'btn-usuario', 0);
                ocultar('input-correo', 'label-correo', 'btn-correo', 0);
                ocultar('input-nombre', 'label-nombre', 'btn-nombre', 0);
                ocultar('input-telefono', 'label-telefono', 'btn-telefono', 0);
                ocultar('input-pais', 'label-pais', 'btn-pais', 1);
                ocultar('input-fiat', 'label-fiat', 'btn-fiat', 1);

                setMonedaDeTrabajo(fiat);

                $(".spiner_guardar_cambios").hide()


            } else if (res["status"] == 'errorLogin') {
                $(".spiner_guardar_cambios").hide()
                $(".guardar_cambios").attr('disabled', false)
                abrirAlerta(idioma['_trans06'], idioma['_trans475'])
            }
        }, error: error => {
            $(".guardar_cambios").attr('disabled', false)
            $(".spiner_guardar_cambios").hide()
            abrirAlerta(idioma['_trans06'], idioma['_trans476']);
        }
    });
}

//////////////////////CAMBIAR IDIOMA //////////////////////////////
function cambiarIdiomaUsuario(ev) {
    let idioma = ev.target.value
    let dataIdioma = {
        id: user.uid,
        idioma
    }
    $.ajax({
        type: "POST",
        url: ApiURL + "/users/updateUsuarioIdioma.php",
        data: dataIdioma,
        dataType: "json",
        headers: { 'x-api-key': user.token },
        success: res => {
            $(".spiner_guardar_idioma").hide()
            if (res["status"] == "success") {
                localStorage.setItem('lenguaje', idioma);
                document.cookie = "lenguaje=" + idioma

                $.getJSON(`../json/${idioma}.json`, (idiomajson) => {
                    sessionStorage.removeItem('idioma');
                    sessionStorage.setItem('idioma', JSON.stringify(idiomajson));

                    setTimeout(() => {
                        location.reload();
                    }, 300);
                });
            } else if (res["status"] == "errorVencido") {
                abrirAlerta(idioma['_trans06'], idioma['_trana949'])
                $("#modal-confirmar-proceso").on('hidden.bs.modal', function () {
                    logout()
                });
            } else {
                abrirAlerta(idioma['_trans06'], idioma['_trans883'])
            }
        }, error: error => {
            $(".spiner_guardar_idioma").hide();
            abrirAlerta(idioma['_trans06'], idioma['_trans883']);
        }
    });

}

//////////////////////MOSTRAR DISPOSITIVOS //////////////////////////
function showDispositivos() {
    let array_disp = ["Windows", "Linux", "Macintosh"]
    let htmldisp = "";
    let tipo_disp;
    $(".content_dispositivos").empty();
    $.each(user.historial_sesion, function (i, histo) {
        if (array_disp.includes(histo.origen.split(" ")[0])) {
            tipo_disp = "Computador"
        } else {
            tipo_disp = "Celular"
        }
        htmldisp += `<div class="col-12">
                        <p class="label-form my-2">${tipo_disp} ${histo.origen}: <span>${idioma._trans858} ${histo.fecha}</span></p>
                    </div>`
    })
    $(".content_dispositivos").html(htmldisp)

}
///////////////////MODALES GENERALES////////////////////////////////
function abrirAlerta(titulo, texto) {
    $(".titulo_modal_confirmacion").text(titulo);
    $(".info_modal_confirmacion").text(texto);
    $("#modal-confirmar-proceso").modal("toggle");
}
function confirmarEliminarGeneral(pregunta) {
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
function chageBtnEye(btn, input) {
    let eye = $(btn).val();
    console.log(eye)
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
///////////////////////CLAVE DE TRANSACCIONES//////////////////////

function abrirModalClave() {
    var user = JSON.parse(localStorage.getItem('userAuth'));
    if (user.clave_trans) {
        $('.ingresa').show();
    } else {
        $('.ingresa').hide();
    }
    $('#modal-cambiar-clave').modal('show');
}

$('.cambiar_clave').on('click', null, function () {
    var user = JSON.parse(localStorage.getItem('userAuth'));
    if (validarClave()) {
        var data = {
            id: user.uid,
            nueva: $('.nueva-clave').val(),
            antigua: user.clave_trans ? $('.actual-clave').val() : ''
        };
        console.log(data);
        $.ajax({
            url: ApiURL + '/users/actualizarclavetrans.php',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: result => {
                console.log(result);
                if (result.status === 'success') {
                    $('#modal-cambiar-clave').modal('hide');
                    $('.nueva-clave').val('');
                    $('.actual-clave').val('');
                    $('.confir-clave').val('');
                    user.clave_trans = true;
                    localStorage.setItem('userAuth', JSON.stringify(user));
                    presentAlertObject({ icon: 'success', text: result.message });
                } else if (result.status === 'errorUser') {
                    presentAlertObject({ icon: 'error', text: result.message });
                } else if (result.status === 'errorPassword') {
                    presentAlertObject({ icon: 'error', text: idioma.trans181 });
                } else if (result.status === 'iguales') {
                    presentAlertObject({ icon: 'error', text: result.message });
                }
            }, error: error => {
                console.log(error);
            }
        });
    }
});

function validarClave() {
    var user = JSON.parse(localStorage.getItem('userAuth'));
    if (user.clave_trans) {

        const actualClave = $('.actual-clave').val();
        const nuevaClave = $('.nueva-clave').val();
        const confirClave = $('.confir-clave').val();

        if (actualClave !== "") {
            const intActualClave = Number.parseInt(actualClave);
            if (Number.isNaN(intActualClave) || intActualClave.toString().length !== 6) {
                presentAlertObject({ icon: 'error', text: idioma.trans182 });
                return false;
            }
        } else {
            presentAlertObject({ icon: 'error', text: idioma.trans175 });
            return false;
        }

        if (nuevaClave === "") {
            presentAlertObject({ icon: 'error', text: idioma.trans176 });
            return false
        }

        if (confirClave === "") {
            presentAlertObject({ icon: 'error', text: idioma.trans177 });
            return false;
        }

        if (nuevaClave !== confirClave) {
            presentAlertObject({ icon: 'error', text: idioma.trans179 });
            return false;
        } else {
            const intNuevaClave = Number.parseInt(nuevaClave);
            if (Number.isNaN(intNuevaClave) || intNuevaClave.toString().length !== 6) {
                presentAlertObject({ icon: 'error', text: idioma.trans182 });
                return false;
            }
        }

        if (nuevaClave === actualClave) {
            presentAlertObject({ icon: 'error', text: idioma.trans178 });
            return false
        }

        return true;

    } else {
        const nuevaClave = $('.nueva-clave').val();
        const confirClave = $('.confir-clave').val();

        if (nuevaClave === "") {
            presentAlertObject({ icon: 'error', text: idioma.trans176 });
            return false
        }

        if (confirClave === "") {
            presentAlertObject({ icon: 'error', text: idioma.trans177 });
            return false;
        }

        if (nuevaClave !== confirClave) {
            presentAlertObject({ icon: 'error', text: idioma.trans179 });
            return false;
        } else {
            const intNuevaClave = Number.parseInt(nuevaClave);
            if (Number.isNaN(intNuevaClave) || intNuevaClave.toString().length !== 6) {
                presentAlertObject({ icon: 'error', text: idioma.trans182 });
                return false;
            }
        }
        return true;
    }
}
////////////////////////DESACTIVAR CUENTA////////////////////////////
function confirmarDisabledUsuario() {
    $("#modal-desactivar-usuario").modal('show');
    $(".btn_desactivar_usuario").off();
    $(".btn_desactivar_usuario").on('click', function () {
        let password_desac = $(".input_motivo_desact").val();
        // if(!validarText(motivo)) return abrirAlerta(idioma['_trans06'])
        if (!validarText(password_desac)) {
            return abrirAlerta(idioma['_trans05'])
        } else {
            let data_url = `${baseurl}/controllers/usuario_nasbi/?login`;
            $.ajax({
                type: "POST",
                url: data_url,
                data: { user: user.username, password: password_desac.trim() },
                dataType: "json",
                success: result => {
                    if (result.status == "success") {
                        console.log("result success en disable: ", result);
                        $.ajax({
                            url: 'https://peers2win.com/api/controllers/users/?darse_de_baja',
                            type: 'POST',
                            data: { data: { id: user.uid } },
                            dataType: 'json',
                            success: result => {
                                console.log("dar de baja result: ", result);
                                if (result.status == "success") {
                                    abrirAlerta(idioma['_trans12'], idioma['_trans889']);
                                    $('#modal-confirmar-proceso').on('hidden.bs.modal', function () {
                                        logout();
                                    });
                                } else if (result.status == "error") {
                                    console.log("baja error");
                                    abrirAlerta(idioma['_trans894']);
                                }
                            },
                            error: error => {
                                console.log("error dar de baja usuario", error);
                                abrirAlerta(idioma['_trans894']);
                            }
                        });
                    } else if (result.status == "errorLogin") {
                        console.log("result fail en disable: ", result);
                        // presentAlertObject({ icon: 'error', text: idioma.trans291 });
                        abrirAlerta(idioma['trans291']);
                    }
                }, error: error => {
                    console.log(error);
                    // presentAlertObject({ icon: 'error', text: idioma.trans291 });
                    abrirAlerta(idioma['trans291']);
                }
            });
        }
        $("#modal-desactivar-usuario").modal('hide');
    })

}

function params_to_deactivate() {
    let ptd_url = new URL(location.href);
    let ptd_params = new URLSearchParams(ptd_url.search);

    if (ptd_params.has("act")) {
        let act = ptd_params.get("act");
        if (act == 0) {
            confirmarDisabledUsuario();
        }
    }
}