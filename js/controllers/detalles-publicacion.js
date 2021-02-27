var paramsURL_publi_rev;
var condicionProducto = [];
var envioProducto = [];
var exposicionProducto_edit = [];
var misSubastas = [];
var data_revision = null;
condicionProducto = [
    { id: 1, nombre: idioma.trans4, img: '../imagen/vender/productos.png' },
    { id: 2, nombre: idioma.trans5, img: '../imagen/vender/vehiculos.png' },
    { id: 3, nombre: idioma.trans6, img: '../imagen/vender/inmuebles.png' }
];
envioProducto = [
    { id: 1, nombre: idioma._trans205, img: '../imagen/public-venta/envio-pais.png' },
    { id: 2, nombre: idioma._trans206, img: '../imagen/public-venta/envio-vendedor.png' },
    { id: 3, nombre: idioma._trans207, img: '../imagen/public-venta/acuerdo.png' }
];

exposicionProducto_edit = [
    { id: 1, nombre: idioma.trans196_, img: '../imagen/public-venta/gratuita.png', descripcion: idioma.trans199_, link_text: idioma.trans200_, link: '' },
    { id: 2, nombre: idioma.trans197_, img: '../imagen/public-venta/promocionada.png', descripcion: idioma.trans201_, link_text: idioma.trans202_, link: '' },
    { id: 3, nombre: idioma.trans198_, img: '../imagen/public-venta/subasta.png', descripcion: idioma.trans203_, link_text: idioma.trans204_, link: '' }
];
$(document).ready(($event) => {
    cargarprimero_edit();
    $('.btn-aceptar').click(function () {
        AceptarRevision(paramsURL_publi_rev);
    });
    $('.btn-rechazar').click(function () {
        // RechazarRevision(paramsURL_publi_rev);
        $('#modal-rechazo').modal('show');
    });
    $('.btn-atras').click(function () {
        loadPage("publicaciones-revision.php")
    });
    $('.btn-revision').click(function () {
        $(".cierre_modal_revision").click();
    });
    $(".cierre_modal_revision").click(($event) => {
        loadPage("publicaciones-revision.php")
    });
    $(".cierre_modal_rechazo").click(($event) => {
        $('#modal-rechazo').modal('hide');
    });
    $(".btn-rechazar-2").click(($event) => {
        RechazarRevision(paramsURL_publi_rev);
    });
    $('.btn-rechazo-exitoso').click(function () {
        $(".cierre_modal_revision").click();
    });
    $(".cierre_modal_rechazo_exitoso").click(($event) => {
        loadPage("publicaciones-revision.php")
    });

});
function cargarprimero_edit() {
    let params_view_rev = new URLSearchParams(location.search);
    paramsURL_publi_rev = params_view_rev.get('pro');
    detallesRevision(paramsURL_publi_rev);
}
function detallesRevision(id) {
    let data_url = baseurl + "/controllers/publicacion/?obtener_producto_backend";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'POST',
            data: { data: { id: paramsURL_publi_rev } },
        }).done((result) => {
            console.log(result);
            if (result.status == 'success') {
                data_revision = result.data;
                listarDetalles(result.data);
            } else {
                presentAlertObject({ icon: 'error', text: idioma.trans281 });
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans281 });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
            reject(null);
        });
    });
}
function listarDetalles(data) {
    console.log(data);
    let categoriasJSON_edit = JSON.parse(localStorage.getItem('categorias'));
    let categoria_edit = categoriasJSON_edit.filter(categoria_sin => data.producto_categoria == categoria_sin.CategoryID)[0];
    let subcategoria_edit = categoria_edit.subCategoria.filter(data_sub => data.producto_subcategoria == data_sub.CategoryID)[0];
    let textocategoria = subcategoria_edit.CategoryNamePath.split(':').join(" > ");
    let condicion_publi = condicionProducto.filter(condicion => data.producto_condicion == condicion.id)[0];
    let data_to_condicion = {
        condicion_pre: condicion_publi,
        garantia_pre: data.garantia
    }
    let texto_condicion
    let tipoenvio_edit = envioProducto.filter(envio => data.producto_envio == envio.id)[0];
    let tipo_expo_edit = exposicionProducto_edit.filter(esposicion => data.producto_exposicion == esposicion.id)[0];


    if (data.producto_garantia == 1) {
        texto_condicion = condicion_publi.nombre + " " + idioma.trans213_;
    } else if (data.producto_garantia == 0) {
        texto_condicion = condicion_publi.nombre + " " + idioma.trans214_;

    }

    if (validarText(data.url_video)) {
        $('.url_video_rev').text(data.producto_url_video);
    } else {
        $('.url_video_rev').text(idioma.trans309_);
    }
    let htmlFotos = '';
    for (let i = 0; i < data.fotos.length; i++) {
        htmlFotos = htmlFotos + `
        <div class="col-12 col-sm-4 col-md-3 col-lg-2 pl-0 pr-2">
            <div class="content-product">
                <img loading="lazy" src="${data.fotos[i].foto}" class="img-product __imgfoto0">
            </div>
        </div>`;
    }
    $('.__divfotos_rev').html(htmlFotos);
    $('.titulo_rev').text(data.producto);
    $('.descripcion_rev').text(data.descripcion);
    $('.dias_espera_rev').text(Math.round(data.dias_espera));
    $('.marca_rev').text(data.marca);
    $('.modelo_rev').text(data.modelo);
    $('.categoria_rev').text(textocategoria);
    $('.condicion_rev').text(texto_condicion);
    if (data.producto_oferta) {
        $('.precio_rev').text(data.producto_precio);
    } else {
        $('.precio_rev').text(data.producto_precio);
    }
    $('.tipoenvio_rev').text(tipoenvio_edit.nombre);
    $('.cantidad_rev').text(formatNumberInt(data.producto_cantidad));
    $('.exposicion_rev').text(tipo_expo_edit.nombre);
    if (data.usuario != null) {
        $('.email_user').append(data.usuario.email);
        $('.nombre_user').append(data.usuario.nombre_usuario);
        $('.telefono_user').append(data.usuario.telefono);
    }
    if (data.subastas != null) {
        $('.table-respn-subasta').removeClass('d-none');
        let htmlTable = `<tr>
                        <td>
                            <div class="containe-fto">
                                <img src="${data.fotos[0].foto}" class="img-articulo">
                            </div>
                        </td>
                        <td><div class="name-product">${data.producto}</div></td>
                        <td>${data.subastas.subasta_id}</td>
                        <td><img src="../imagen/img-inscritos.png" class="img-inscr">${data.subastas.subastas_inscritos}</td>
                        <td>${data.subastas.subasta_tipo.descripcion}</td>
                        <td>${getFechaSinHora(data.producto_fecha_creacion)}</td>
                        <td><span class="spanv"></span>${data.subastas.subasta_estado.descripcion}</td>
                    </tr>`;
        $('.subastas__list').html(htmlTable);
    }
}
function AceptarRevision(id) {
    let dataRev_url = baseurl + "/controllers/publicacion/?aceptar_producto";
    let dataRev = {
        data: {
            "id_producto": id,
        }
    }
    $.ajax({
        type: "POST",
        url: dataRev_url,
        data: JSON.stringify(dataRev),
        dataType: "json",
        contentType: 'application/json',
        success: results => {
            if (results.status == "success") {
                $('#modal-revision').modal('show');
                $('#modal-revision').off('hidden.bs.modal');
                $('#modal-revision').on('hidden.bs.modal', (e) => {
                    $(".cierre_modal_revision").click();
                });
            } else if (results.status == 'fail') {
                presentAlertObject({ icon: 'success', text: idioma.trans_eb46 });
            }
        },
        error: error => {
            presentAlertObject({ icon: 'success', text: idioma.trans_eb46 });
            $('.sidenav_publicaciones_revision').click();
        }
    });
}
function RechazarRevision(id) {
    let dataRev_url = baseurl + "/controllers/publicacion/?rechazar_producto";
    if ($('#motivo_rechazo').val() != '') {
        let motivo = $('#motivo_rechazo').val();
        let dataRev = {
            data: {
                "id_producto": id,
                "motivo": motivo,
            }
        }
        $.ajax({
            type: "POST",
            url: dataRev_url,
            data: JSON.stringify(dataRev),
            dataType: "json",
            contentType: 'application/json',
            success: results => {
                if (results.status == "success") {
                    $('#modal-rechazo').modal('hide');
                    $('#modal-rechazo-exitoso').modal('show');
                } else if (results.status == 'fail') {
                    presentAlertObject({ icon: 'success', text: idioma.trans_eb46 });
                }
            },
            error: error => {
                presentAlertObject({ icon: 'success', text: idioma.trans_eb46 });
                $('.sidenav_publicaciones_revision').click();
            }
        });
    } else
        presentAlertObject({ icon: 'success', text: '¡Escribe el motivo de rechazo!' });
}
