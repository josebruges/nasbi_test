let infoEmpresa;
let paisesJSON_emp = JSON.parse(localStorage.getItem('paises'));

$(document).ready(($event) => {
    if (validarText(user)) {
        llenarSelects();
        getPaisesLocal();
        llenarFotos()
        cargarEmpresa();
        let params = new URLSearchParams(location.search);
        let dar_baja = params.get('act') == undefined ? "" : params.get('act')
        console.log(dar_baja)
        if (dar_baja && dar_baja == 0) {
            confirmarDisabledEmpresa()
        }
    } else {
        loadPage("index.php")
    }

    $(".btn-cambiar-contrasena").off();
    $(".btn-cambiar-contrasena").on('click', abrirModalContraseña)

    $(".editar__empresa_btnEnviar").click(($event) => {
        let dataEmpresa = {
            id: empresaAuth.id,
            notificaciones: 1,
            idioma: $(".editar__idioma option:selected").val(),
            nit: $(".editar__empresa__nit").val(),
            pagina_web: $(".editar__empresa__web").val(),
            pais: infoEmpresa.pais,
            tipo_empresa: $(".editar_empresa__tipo_empresa option:selected").val(),
            direccion_fisica_de_notificaciones: $(".editar__empresa__dir").val(),
            nombre_empresa: infoEmpresa.nombre_empresa ? infoEmpresa.nombre_empresa : "...",
            telefono: devolverNumero($(".editar__empresa__telefono").val()),
            razon_social: $(".editar__empresa__razon_social").val(),
            nombre_dueno: infoEmpresa.nombre_dueno ? infoEmpresa.nombre_dueno : "...",
            apellido_dueno: infoEmpresa.apellido_dueno ? infoEmpresa.apellido_dueno : "...",
            tipo_documento_dueno: infoEmpresa.tipo_documento_dueno ? tipo_documento_dueno : "...",
            numero_documento_dueno: infoEmpresa.numero_documento_dueno ? infoEmpresa.numero_documento_dueno : "...",
            foto_docuemento_empresa: infoEmpresa.foto_docuemento_empresa ? infoEmpresa.foto_docuemento_empresa : "...",
            foto_documento_dueno: infoEmpresa.foto_documento_dueno ? infoEmpresa.foto_documento_dueno : "...",
            foto_logo_empresa: infoEmpresa.foto_logo_empresa ? infoEmpresa.foto_logo_empresa : "...",
            foto_portada_empresa: infoEmpresa.foto_portada_empresa ? infoEmpresa.foto_portada_empresa : "...",
        };
        validarDatos(dataEmpresa)
    });
    $(".editar__empresa_btnPersonalizar").click(($event) => {
        $('#edicion-exitosa').modal('hide');
        $('#edicion-exitosa-normal').modal('hide');
        loadPage("crear-empresa.php")
    });
    $('.disabled_empresa').click(($event) => {
        confirmarDisabledEmpresa()
    })
    $('.editar__idioma').change(($event) => {
        cambiarIdiomaEmpresa($event)
    })
    $('.btn_eye_desactEmp').on('click', function (e) {
        chageBtnEye(this, ".desact_pass")
    })
    $('.btn_eye_actuEmp').on('click', function (e) {
        chageBtnEye(this, ".actual-contrasena")
    })
    $('.btn_eye_nuevaEmp').on('click', function (e) {
        chageBtnEye(this, ".nueva-contrasena")
    })
    $('.btn_eye_confirEmp').on('click', function (e) {
        chageBtnEye(this, ".confir-contrasena")
    })
});

function cargarEmpresa() {
    let data = {
        id: empresaAuth.id
    };
    let data_url = baseurl + "/controllers/empresas/?ver";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": data },
        dataType: "json",
        success: success => {

            if (success["status"] == "success") {
                infoEmpresa = success.data;
                getData(infoEmpresa);
            }

        }, error: error => {
            abrirAlerta(idioma['_trans462'], idioma['_trans495'])
        }
    });

    if (empresaAuth.estado * 1 == 1) {
        $('.editar__empresa_btnPersonalizar').show('slow');
    } else {
        $('.editar__empresa_btnPersonalizar').hide('slow');
    }
}


function llenarSelects() {

    $('.editar_empresa__pais').selectpicker('destroy');
    let htmlOptionPais;
    htmlOptionPais = `<option value="">${idioma.trans15}</option>`;
    $.each(paisesJSON_emp, function (i, pais_select) {
        htmlOptionPais += `<option value="${pais_select.country_id}">${pais_select.pais_name}</option>`;
    });
    $('.editar_empresa__pais').html(htmlOptionPais)
    $('.editar_empresa__pais').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false

    })

    $('.editar_empresa__tipo_empresa').selectpicker("destroy");
    let htmlMeses;
    for (let i = 0; i < 8; i++) {
        htmlMeses += `<option value="${i}">${idioma['_trans842_' + i]}</option>`

    }
    $('.editar_empresa__tipo_empresa').html(htmlMeses)
    $('.editar_empresa__tipo_empresa').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false

    })


}
function getData(datos) {
    console.log(datos)
    let pais = paisesJSON_emp.filter(f => f.country_id == datos.pais)[0].pais_name
    $(".editar__empresa__correo").val(datos.correo)

    $(".editar__empresa__nombre_empresa").val(datos.razon_social)

    $(".editar__empresa__razon_social").val(datos.razon_social)
    $(".editar__empresa__nit").val(datos.nit)
    $(".editar__empresa__web").val(datos.pagina_web)
    // $(".editar__idioma").val(datos.idioma).selectpicker('refresh')
    $('#doblefactorcheck').prop('checked', parseInt(datos.notificaciones) ? true : false)
    if (datos.direccion_fisica_de_notificaciones) $(".editar__empresa__dir").val(datos.direccion_fisica_de_notificaciones)
    if (datos.referido) $(".editar__empresa__referido").val(datos.referido)
    if (datos.telefono) $(".editar__empresa__telefono").val(datos.telefono)
    if (datos.tipo_empresa) $(".editar_empresa__tipo_empresa").val(datos.tipo_empresa).selectpicker('refresh')
    if (datos.pais) $(".editar_empresa__pais").val(pais)

    // if (datos.nombre_dueno) $(".editar__empresa__nombre").val(datos.nombre_dueno)
    // if (datos.apellido_dueno) $(".editar__empresa__apellido").val(datos.apellido_dueno)
    // if (datos.tipo_documento_dueno) $(".editar__empresa__tipo_doc").val(datos.tipo_documento_dueno)
    // if (datos.numero_documento_dueno) $(".editar__empresa__numero_doc").val(datos.numero_documento_dueno)
    // if (datos.foto_docuemento_empresa) $('.__imgfotoDocEmpresa').attr("src", datos.foto_docuemento_empresa)
    // if (datos.foto_documento_dueno) $('.__imgfotoDuenoEmpresa').attr("src", datos.foto_documento_dueno)
    // if (datos.foto_logo_empresa) {
    //     $('.__imgfotoLogoEmpresa').attr("src", datos.foto_logo_empresa)
    //     $('.editar__logo_empresa').attr("src", datos.foto_logo_empresa)

    // }
    // if (datos.foto_portada_empresa) {
    //     $('.__imgfotoPortadaEmpresa').attr("src", datos.foto_portada_empresa)
    //     $('.editar__portada_empresa').attr("src", datos.foto_portada_empresa)

    // }
    if (datos.estado == 1) {
        $(".editar__empresa__nombre_empresa").attr('disabled', true);
        $(".editar__empresa__nit").attr('disabled', true);
        // $(".editar_empresa__tipo_empresa").attr('disabled', true);
        // $(".editar__empresa__nombre").attr('disabled', true);
        // $(".editar__empresa__apellido").attr('disabled', true);
        // $(".editar__empresa__tipo_doc").attr('disabled', true);
        // $(".editar__empresa__numero_doc").attr('disabled', true);
        // $('.__uploadfotoDocEmpresa').attr('disabled', true);
        // $('.__uploadfotoDuenoEmpresa').attr('disabled', true);
        // $(".editar__empresa__tipo_doc").selectpicker('refresh');

    }


}
function validarDatos(dataEmpresa) {
    var errores = []
    var errFotos = []
    console.log(dataEmpresa.tipo_empresa)
    if (!validarText(dataEmpresa.razon_social)) {
        errores.push(idioma['_trans834'])
    } else if (!validarText(dataEmpresa.nit)) {
        errores.push(idioma['_trans833'])

    } else if (!validarNumero(dataEmpresa.telefono)) {
        errores.push(idioma['trans269_'])
    } else if (dataEmpresa.tipo_empresa == 0) {
        errores.push(idioma['_trans842_0'])
        // } else if (dataEmpresa.pais.length == 0) {
        //     errores.push(idioma['trans15'])
    } else if (!validarText(dataEmpresa.direccion_fisica_de_notificaciones)) {
        errores.push(idioma['_trans891'])


        // } else if (!validarText(dataEmpresa.nombre_dueno)) {
        //     errores.push(idioma['_trans433'])


        // } else if (!validarText(dataEmpresa.apellido_dueno)) {
        //     errores.push(idioma['_trans434'])

        // } else if (!validarText(dataEmpresa.numero_documento_dueno)) {
        //     errores.push(idioma['_trans435'])

    } else {

    }
    ///////////////////////
    // if (dataEmpresa.foto_docuemento_empresa == "../imagen/product.jpg") {
    //     errFotos.push(idioma['_trans29']);
    // } else if (dataEmpresa.foto_documento_dueno == "../imagen/product.jpg") {
    //     errFotos.push(idioma['_trans30']);

    // } else if (dataEmpresa.foto_logo_empresa == "../imagen/product.jpg") {
    //     errFotos.push(idioma['_trans31']);

    // } else if (dataEmpresa.foto_portada_empresa == "../imagen/product.jpg") {
    //     errFotos.push(idioma['_trans32']);

    // } else {

    // }

    if (errores.length > 0) {
        abrirAlerta(idioma['_trans460'], idioma['_trans93'] + errores);
    } else if (errFotos.length > 0) {
        abrirAlerta(idioma['_trans460'], idioma['_trans432'] + errFotos);
    } else {
        $(".spiner_loading").show()
        $('.editar__empresa_btnEnviar').attr('disabled', true);
        actualizar(dataEmpresa);

    }

}
function actualizar(dataEmpresa) {


    let data_url = baseurl + "/controllers/empresas/?actualizar";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataEmpresa }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $('.editar__empresa_btnEnviar').attr('disabled', false);
            if (success["status"] == "success") {
                empresaAuth.notificaciones = dataEmpresa.notificaciones
                empresaAuth.razon_social = dataEmpresa.razon_social
                empresaAuth.telefono = dataEmpresa.telefono
                empresaAuth.idioma = dataEmpresa.idioma
                empresaAuth.nit = dataEmpresa.nit
                empresaAuth.tipo_empresa = dataEmpresa.tipo_empresa
                // empresaAuth.pais = dataEmpresa.pais
                empresaAuth.direccion_fisica_de_notificaciones = dataEmpresa.direccion_fisica_de_notificaciones
                // empresaAuth.apellido_dueno = dataEmpresa.apellido_dueno
                // empresaAuth.foto_docuemento_empresa = dataEmpresa.foto_docuemento_empresa
                // empresaAuth.foto_documento_dueno = dataEmpresa.foto_documento_dueno
                // empresaAuth.foto_logo_empresa = dataEmpresa.foto_logo_empresa
                // empresaAuth.foto_portada_empresa = dataEmpresa.foto_portada_empresa

                // empresaAuth.nombre_dueno = dataEmpresa.nombre_dueno

                // empresaAuth.numero_documento_dueno = dataEmpresa.numero_documento_dueno


                // empresaAuth.tipo_documento_dueno = dataEmpresa.tipo_documento_dueno

                localStorage.setItem("empresaAuth", JSON.stringify(empresaAuth));
                localStorage.setItem("userAuth", JSON.stringify(empresaAuth));
                // localStorage.setItem('lenguaje', empresaAuth.idioma)
                // $.getJSON(`../json/${empresaAuth.idioma}.json`, (idiomajson) => {
                //     sessionStorage.removeItem("idioma");
                //     sessionStorage.setItem("idioma", JSON.stringify(idiomajson));
                // });
                const dato = paisesJSON_emp.find(pais => { return pais.country_id == empresaAuth.pais });
                localStorage.setItem("paisOrigen", JSON.stringify(dato));

                // location.reload();

                $(".spiner_loading").hide()
                setTimeout(() => {
                    console.log("entro en el set time");


                    if (success.primer_cambio == 1) {
                        $('#edicion-exitosa').modal('toggle');
                        if (empresaAuth.estado * 1 == 1) {
                            $('.edicion-exitosa-body').html(idioma['trans_284']); // SI estoy validado
                        } else {
                            $('.edicion-exitosa-body').html(idioma['_trans28']); // SINO estoy validado
                        }
                    } else {
                        $('#edicion-exitosa-normal').modal('toggle');
                        if (empresaAuth.estado * 1 == 1) {
                            $('.edicion-exitosa-normal-body').html(idioma['trans_277']); // SI estoy validado
                        } else {
                            $('.edicion-exitosa-normal-body').html(idioma['trans_286']); // SINO estoy validado
                        }
                        // abrirAlerta(idioma['_trans474'], idioma['_trans830'])
                    }

                }, 500);



                cargarEmpresa();



                //presentAlert(idioma['_trans12'], idioma['_trans11'], "success")


            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) {
                    $(".spiner_loading").hide()
                    abrirAlerta(idioma['_trans06'], idioma['_trans490'])
                }


            }

        }, error: error => {
            $(".spiner_loading").hide()
            abrirAlerta(idioma['_trans06'], idioma['_trans491'])


        }
    });

}
function llenarFotos() {
    $('.__uploadfotoDocEmpresa').off('change');
    $('.__uploadfotoDocEmpresa').on('change', { id: 1 }, convertBase64);
    $('.__uploadfotoDuenoEmpresa').off('change');
    $('.__uploadfotoDuenoEmpresa').on('change', { id: 2 }, convertBase64);
    $('.__uploadfotoLogoEmpresa').off('change');
    $('.__uploadfotoLogoEmpresa').on('change', { id: 3 }, convertBase64);
    $('.__uploadfotoPortadaEmpresa').off('change');
    $('.__uploadfotoPortadaEmpresa').on('change', { id: 4 }, convertBase64);
}

function convertBase64(evt) {
    // let id = e.data.id;
    // var archivo = e.target.files[0],
    //     reader = new FileReader()
    // reader.onload = (e) => {
    //     var binaryString;
    //     if (!e) binaryString = reader.content;
    //     else binaryString = e.target.result;
    //     let img = 'data:image/png;base64,' + window.btoa(binaryString);
    //     switch (id) {
    //         case 1:
    //             $('.__imgfotoDocEmpresa').attr("src", img)

    //             break;
    //         case 2:
    //             $('.__imgfotoDuenoEmpresa').attr("src", img)

    //             break;
    //         case 3:
    //             $('.__imgfotoLogoEmpresa').attr("src", img)
    //             $(".editar__logo_empresa").attr("src", img)

    //             break;
    //         case 4:
    //             $('.__imgfotoPortadaEmpresa').attr("src", img)
    //             $(".editar__portada_empresa").attr("src", img)

    //             break;

    //     }
    //     //Este tiene el base64

    // }
    // reader.readAsBinaryString(archivo);

    let id = evt.data.id;
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
                        switch (id) {
                            case 1:
                                $('.__imgfotoDocEmpresa').attr("src", base64);

                                break;
                            case 2:
                                $('.__imgfotoDuenoEmpresa').attr("src", base64);

                                break;
                            case 3:
                                $('.__imgfotoLogoEmpresa').attr("src", base64);
                                $(".editar__logo_empresa").attr("src", base64);

                                break;
                            case 4:
                                $('.__imgfotoPortadaEmpresa').attr("src", base64);
                                $(".editar__portada_empresa").attr("src", base64);

                                break;
                        }
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
function getPaisesLocal() {

}


function llenarSelectOptionPais(arr = []) {

    arr.forEach((pais) => {
        $('.editar_empresa__pais').append($('<option>', {
            value: pais.id,
            text: pais.name
        }));
    });
    $('.editar_empresa__pais').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false

    })

}

///////////////// Cambiar Contraseña ///////////////////
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
        } else if (password == nuevo) {
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
                clave_anterior: password,
                clave_nueva: nuevo
            };
            $.ajax({
                type: "POST",
                url: baseurl + "/controllers/empresas/?actualizar_clave",
                data: { "data": data },
                dataType: "json",
                "headers": { 'x-api-key': user.token },
            }).then(async (res) => {
                $(".spiner_cambiar_contra").hide()
                $(".cambiar_contrasena").attr('disabled', false)
                if (res.status == 'success') {
                    $('#modal-cambiar-contrasena').modal('hide');
                    $('.actual-contrasena').val('');
                    $('.nueva-contrasena').val('');
                    $('.confir-contrasena').val('');
                    abrirAlerta(idioma['_trans12'], idioma['_trans99'])
                } else {
                    let validate_token = await erroresTokenEmpresa(res);
                    if (!validate_token) {
                        console.log("-----> paso por aqui error (res): ", res);
                        abrirAlerta(idioma['trans_04'], idioma['_trans101'])
                    }

                }
            });
        }

    })

}
function cambiarIdiomaEmpresa(ev) {
    let idioma = ev.target.value
    localStorage.setItem('lenguaje', idioma)
    document.cookie = "lenguaje=" + idioma
    $.getJSON(`../json/${idioma}.json`, (idiomajson) => {
        sessionStorage.removeItem("idioma");
        sessionStorage.setItem("idioma", JSON.stringify(idiomajson));
    });
    location.reload()


}
function confirmarDisabledEmpresa() {
    $("#modal-desactivar-empresa").modal('show');
    $(".btn_desactivar_empresa").off();
    $(".btn_desactivar_empresa").on('click', function () {
        let clave = $(".desact_pass").val().trim();
        if (!validarText(clave)) return abrirAlerta(idioma['_trans06'], idioma['_trans05'])
        let dataLogin = {
            correo: user.correo,
            clave,
            desactivar: true
        }
        loginEmpresaAuth(dataLogin, 1)

    })
}

function abrirAlerta(titulo, texto) {
    $(".alerta_titulo").text(titulo);
    $(".alerta_texto").text(texto);
    $("#modal-alertas-generales").modal("show");

}
