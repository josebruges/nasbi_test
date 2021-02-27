$(document).ready(($event) => {
    $(".btn_eliminar_historial").off('click');
    $(".btn_eliminar_historial").on('click', { id: "all" }, confirmarEliminar)
});

function cargarPrimero() {
    getHistorial()
}

function getHistorial(pag = 1) {
    let dataHistorial = {
        "uid": user.uid,
        "empresa": user.empresa,
        "pagina": pag,
        "iso_code_2": user.iso_code_2,
        "iso_code_2_money": iso_code_2_money
    };

    let data_url = baseurl + "/controllers/historial_usuario/?historial_usuario";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataHistorial },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async datos => {
            $(".content__nodata").hide()
            if (datos['status'] == "success") {
                showItemsHistorial(datos)
            } else {
                let validate_token = await erroresTokenEmpresa(datos);
                if (!validate_token) {
                    $(".historial__container").empty();
                    $(".pagination").empty();
                    $(".content__nodata").show()
                }

            }
        }, error: error => {
            abrirAlerta(idioma['trans_04'], idioma['_trans06']);
        }
    });
}
function showItemsHistorial(datos) {
    let htmlHistorial = "";
    let imagenProducto;
    $(".historial__container").empty();
    $.each(datos.data, (i, item) => {
        console.log(item)
        if (item.foto_portada != "") {
            imagenProducto = item.foto_portada;
        } else {
            imagenProducto = imageDefault;
        }
        let precio = item.precio_local_user_mask
        if (item.oferta) {
            precio = item.precio_descuento_local_user_mask
        }
        htmlHistorial =
            `<div class="col-sm-6 col-lg-3">
                <div class="row row-container">
                    <div class="col-12 historial__ver__btn cursorPointer">
                        <div class="container-destacado">
                            <img loading="lazy" src="${imagenProducto}" class="imagen-destacados" alt="${item.titulo} - nasbi.com">
                        </div>
                        <h4 class="nombre-producto">${item.titulo}</h4>
                        <h4 class="price-product">${precio} ${item.moneda_local_user}</h4>
                    </div>
                    <div class="col-12">
                        <button class="btn-comprar btn_eliminar_producto_historial">${idioma.trans44}</button>
                    </div>
                </div>
            </div>`;

        $(".historial__container").append(htmlHistorial);

        $(".btn_eliminar_producto_historial").eq(i).off();
        $(".btn_eliminar_producto_historial").eq(i).on('click', { id: item.id_historial }, confirmarEliminar);

        $(".historial__ver__btn").eq(i).off();
        $(".historial__ver__btn").eq(i).on('click', { item }, verProducto);
    });

    $(".pagination").html(generatePaginations(datos));
}
function eventGeneratePaginations(pag) {
    getHistorial(pag)
}
function confirmarEliminar(ev) {
    let id = ev.data.id
    $("#modal-confirmar-eliminar").modal("toggle");
    $(".btn_confirmar_eliminar").off();
    $(".btn_confirmar_eliminar").on('click', { id: id }, eliminarHistorial);
}
function eliminarHistorial(ev) {
    let id = ev.data.id

    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            id: id

        }
    }
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/historial_usuario/?eliminar`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        if (res.status == 'success') {
            $("#modal-confirmar-eliminar").modal("hide");
            abrirAlerta('Éxito', idioma['_trans183']);
            getHistorial()
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) abrirAlerta('error', idioma['_trans73']);
        }
    }).fail((err) => {
        abrirAlerta('error', idioma['_trans73']);
    });
}
function abrirAlerta(titulo, text) {
    $(".alerta_titulo").text(titulo);
    $(".alerta_text").text(text);
    $("#modal-alertas-generales").modal("toggle")
}
function verProducto($event) {
    let item = $event.data.item;
    loadPage("producto.php?uid=" + item.id)
}