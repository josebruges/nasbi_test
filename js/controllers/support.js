var base64 = '';
var user = JSON.parse(localStorage.getItem('userAuth'));


$(document).ready(e => {
    cargarListaSoporte();
});

$(document).on("click", ".to_login", function () {
    $("#modal-presentAlert-Support").modal("hide");
    $("#modal-login").modal("show");
});

$(document).on("click", '#btn-support', () => {
    var titulo = $('#txt-soporte-titulo').val();
    var mensaje = $('#txt-soporte-mensaje').val();
    if (titulo != '') {
        if (mensaje != '') {
            var user = JSON.parse(localStorage.getItem('userAuth'));
            if (user !== null && user !== undefined) {
                var data = {
                    titulo: titulo,
                    mensaje: mensaje,
                    imagen: base64,
                    empresa:user.empresa,
                    user: user.uid
                };
                $.ajax({
                    type: "POST",
                    // url: ApiURL + "/support/saveSupport.php",
                    url: 'https://peers2win.com/api/controllers' + "/support/saveSupport.php",
                    data: data,
                    headers: {'x-api-key' : user.token},
                }).then(res => {
                    if (res.status == 'success') {
                        $('#txt-soporte-titulo').val('');
                        $('#txt-soporte-mensaje').val('');
                        var fecha = new Date();
                        data.respuesta = '';
                        data.id = res.data;
                        data.fecha = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
                        var conten = $('.contec-no-registro');
                        if (conten.length > 0) {
                            $('#listaSoporte').empty();
                        }
                        $('#listaSoporte').prepend(hrmlListadoSoporte(data));
                        $('#btn-repor-' + data.id).click(() => {
                            abrirModalDetalleSoporte(data);
                        });
                        base64 = '';
                        presentAlertObject({ icon: 'success', text: idioma.trans190 });
                    } else if (data.status == 'errorServidor') {

                        presentAlertObject({ icon: 'error', text: idioma._trans06 });

                    } else {
                        presentAlertObject({icon:'error', text:idioma._trans06});
                    }
                });
            } else {
                // presentAlertObject({icon:'error', text: idioma.trans227});
                $('#modal-presentAlert-Support').modal("show");
            }
        } else {
            presentAlertObject({ icon: 'error', text: idioma.trans193 });
        }
    } else {
        presentAlertObject({ icon: 'error', text: idioma.trans194 });
    }
});

function ShowImagePreview_producto(imageUplodear) {
    if (imageUplodear.files && imageUplodear.files[0]) {
        if (imageUplodear.files[0].size <= 5000000) {
            if (imageUplodear.files[0].type == 'image/jpeg' || imageUplodear.files[0].type == 'image/png' || imageUplodear.files[0]['type'] == "image/jpg") {
                var reader = new FileReader();
                reader.onload = function (e) {
                    base64 = e.target.result;
                    // $(".to_display")[0].setAttribute("src", `${base64}`);
                };
                reader.readAsDataURL(imageUplodear.files[0]);
                presentAlertObject({ icon: "success", text: idioma.trans195 })
            } else {
                presentAlertObject({ icon: "error", text: idioma.trans196 });
            }
        } else {
            presentAlertObject({ icon: "success", text: idioma.trans197 });
        }
    }
}

function cargarListaSoporte() {
    $(".backgroundblack").show();
    if (user !== null && user !== undefined) {
        $.ajax({
            type: "POST",
            // url: ApiURL + "/support/listarSupportId.php",
            url: 'https://peers2win.com/api/controllers' + "/support/listarSupportId.php",
            data: { user: user.uid },
            headers: {'x-api-key' : user.token},
        }).done(res => {
            if (res.status == 'success') {
                var array = [];
                res.data.filter(f => array.push(hrmlListadoSoporte(f)));
                if (array.length > 0) {
                    $('#listaSoporte').html(array);
                    res.data.filter(f => {
                        $('#btn-repor-' + f.id).click(() => {
                            abrirModalDetalleSoporte(f);
                        });
                    });
                } else {
                    $('#listaSoporte').html(htmlNoListaReporte(1));
                }
                $(".backgroundblack").hide();
            }
        }).fail((error) => {
            console.log(error);
        });
    }
}

function hrmlListadoSoporte(params) {
    var ruta = params.fecha.split(' ')[0].split('-').reverse().toString().split(',').join(' ');
    return `
        <div class="row row-edit-tickets-2">
            <div class="col-sm-9 my-3 mb-sm-3 imagen-1-support">
                <h6>${ruta}</h6>
                <p class="queja_titulo">
                    ${params.titulo}
                </p>
                <p class="my-2" style="word-break: break-all;">${params.mensaje}</p>
            </div>
            <div class="col-sm-3 my-3 mb-sm-3 ">

                <a id="btn-repor-${params.id}" class="btn btn-primary btn-ver-support-view-more" role="button">
                    ${ idioma.trans198}
                </a>
            </div>
        </div>
    `;
}

function htmlNoListaReporte(option) {
    return html = `
        <div class="contec-no-registro">
            <img loading="lazy" src=${ option === 1 ? 'imagen/no-hay-datos-registrDOS.png' : 'imagen/no-hay-datos-registrDOSazull.png'} alt="">
            <p style="color: white">${ idioma.trans199}</p>
        </div>
    `;
}

function abrirModalDetalleSoporte(params) {
    var user = JSON.parse(localStorage.getItem("userAuth"));
    var img = user.idioma === 'es' ? 'imagen/p2wayuda.png' : 'imagen/Support.png';
    $('#info-detalles-id').text(params.id);
    $('#info-detalles-estado').text(params.respuesta !== '' ? idioma.trans201 : idioma.trans200);
    $('#info-detalles-titulo').val(params.titulo);
    $('#info-detalles-mensaje').val(params.mensaje);
    $('#info-detalles-respuesta').val(params.respuesta);
    $('#img-ayuda').attr('src', img);
    $('#detalles-soporte').modal('show');
}