var paramsURL_publi_sub;
var data_subasta = null;

$(document).ready(($event) => {
    cargarprimero_edit();
    $('.btn-atras-sub').click(function () {
        loadPage("publicaciones-revision.php")
    });
});
function cargarprimero_edit() {
    let params_view_sub = new URLSearchParams(location.search);
    paramsURL_publi_sub = params_view_sub.get('pro');
    detallesSubasta();
}
function detallesSubasta() {
    let data_url = baseurl + "/controllers/publicacion/?obtener_subasta_backend";
    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'POST',
            data: { data: { id: paramsURL_publi_sub } },
        }).done((result) => {
            console.log(result);
            if (result.status == 'success') {
                data_subasta = result.data;
                listarDetalles(data_subasta);
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
    let htmlFotos = '';
    for (let i = 0; i < data.fotos.length; i++) {
        htmlFotos = htmlFotos + `
    <div class="col-12 col-sm-4 col-md-3 col-lg-2 pl-0 pr-2">
        <div class="content-product">
            <img loading="lazy" src="${data.fotos[i].foto}" class="img-product __imgfoto0">
        </div>
    </div>`;
    }
    $('.__divfotos_sub').html(htmlFotos);
    $('.producto_sub').text(data.producto.producto);
    $('.cantidad_sub').text(data.cantidad);
    $('.estado_sub').text(data.estado_subasta.descripcion);
    $('.precio_sub').text('$ '+data.producto.precio);
    $('.fecha_creacion_sub').text(getFechaSinHora(data.fecha_creacion));
    $('.fecha_actualizacion_sub').text(getFechaSinHora(data.fecha_actualizacion));
    $('.fecha_inicio_sub').text(getFechaSinHora(data.fecha_inicio));
    $('.fecha_fin_sub').text(getFechaSinHora(data.fecha_fin));
    $('.inscritos_sub').text(data.inscritos);
    $('.tipo_sub').text(data.tipo_subasta.descripcion);
    $('.moneda_sub').text(data.moneda);

    if (data.pujas_subasta != null) {
        let htmlTable = '';
        $('.table-respn-pujas').removeClass('d-none');
        for (let i = 0; i < data.pujas_subasta.length; i++){
            htmlTable += `<tr>
                        <td>${i+1}</td>
                        <td>${data.pujas_subasta[i].usuario.nombreCompleto}</td>
                        <td>${data.pujas_subasta[i].usuario.email}</td>
                        <td>${data.pujas_subasta[i].usuario.telefono}</td>
                        <td>${data.pujas_subasta[i].monto} ${data.pujas_subasta[i].moneda_local_simbol}</td>
                        <td>${getFechaSinHora(data.pujas_subasta[i].fecha_creacion)}</td>
                        <td>${getFechaSinHora(data.pujas_subasta[i].fecha_final)}</td>
                    </tr>`;
        }
        $('.pujas__list').html(htmlTable);
    }
    if (data.ultima_puja != null) {
        let htmlTable = '';
        $('.table-respn-pujas-ganadora').removeClass('d-none');
        htmlTable += `<tr>
                    <td>${1}</td>
                    <td>${data.ultima_puja.usuario.nombreCompleto}</td>
                    <td>${data.ultima_puja.usuario.email}</td>
                    <td>${data.ultima_puja.usuario.telefono}</td>
                    <td>${data.ultima_puja.monto} ${data.ultima_puja.moneda_local_simbol}</td>
                    <td>${getFechaSinHora(data.ultima_puja.fecha_creacion)}</td>
                    <td>${getFechaSinHora(data.ultima_puja.fecha_final)}</td>
                </tr>`;
        $('.pujas__ganadora__list').html(htmlTable);
    }
}