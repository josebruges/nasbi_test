$(document).ready(($event) => {
    $('.sidenav_publicaciones_revision').click(($event) => {
        getProductosRevision1(1);
    });
    $('.sidenav_publicaciones_revision').click();
});
var keys = {
    titulo: null,
    email: null,
};
function buscarRevision() {
    $(".mis_publicaciones__tabla__revision").empty();
    $(".paginacion_publicaciones__revision").empty()
    keys.titulo = null;
    keys.email = null;
    let val = $('.select_buscar_revision').val();
    if (val != ''){
        switch (val){
            case '1':
                keys = {
                    titulo: $(".input_buscar_revision").val(),
                    email: null,
                }
                getProductosRevision1(1, keys)
                break;
            case '2':
                keys = {
                    titulo: null,
                    email: $(".input_buscar_revision").val(),
                }
                getProductosRevision1(1, keys)
                break;
        }
        $('.select_buscar_revision').val('')
    } else {
        getProductosRevision1(1)
    }
}
function getProductosRevision1(pag=1, keys = []){

    $(".mis_publicaciones__tabla__revision").empty();
    $(".paginacion_publicaciones__revision").empty()
    $(".content__loadingSpinner_publicaciones").show();
    let dataRev_url = baseurl + "/controllers/publicacion/?obtener_todos_espera_revision";
    let dataRev = null;
    if (keys.titulo != null){
        dataRev = {
            data:{
                "pag":pag,
                "titulo": keys.titulo,
            }
        }
    } else if (keys.email != null){
        console.log(keys.email);
        dataRev = {
            data:{
                "pag":pag,
                "email": keys.email,
            }
        }
    } else {
        dataRev = {
            data:{
                "pag":pag
            }
        }
    }
    $.ajax({
        type: "POST",
        url: dataRev_url,
        data:JSON.stringify(dataRev),
        dataType: "json",
        contentType: 'application/json',
        success: results =>{
            $(".content__loadingSpinner_publicaciones").hide()
            $(".products__listp__nodata2").hide("fast")
            if(results.status == "success"){
                // listarMisPublicaciones(results);
                console.log(results);
                listarMisPublicacionesRevision1(results);
            }else{
                $(".paginacion_publicaciones").empty();
                $(".mis_publicaciones__tabla").empty();
                $(".products__listp__nodata2").show("slow");
            }
        },
        error: error => {
            $(".paginacion_publicaciones").empty();
            $(".content__loadingSpinner_publicaciones").hide();
            confirmarProceso(idioma['_trans06'], idioma['_trans500']);
        }
    });
}
function listarMisPublicacionesRevision1(datos) {
    let htmlPubli = ""
    let imagenProducto;
    let precio;
    let option = "";
    let option2 = "";
    let expo;
    let estado;
    let addItem = 0;
    $(".mis_publicaciones__tabla__revision").empty();
    $(".paginacion_publicaciones__revision").empty()
    if (datos.data.length > 0) {
        $.each(datos.data, (i, item) => {

            if (item.foto_portada != "") {
                imagenProducto = item.foto_portada;
            } else {
                imagenProducto = imageDefault;
            }
            if (item.oferta == 1) {
                precio = item.precio_descuento_local_mask
            } else {
                precio = item.precio_local_mask
            }

            expo = exposicionProducto.filter(n => n.id == item.exposicion)[0].nombre
            estado = estados[4].nombre

            let label_cantidades_vendidas = "";
            if (item.tipoSubasta * 1 == 0 && item.cantidad_vendidas * 1 > 0) {
                label_cantidades_vendidas = `${item.cantidad_vendidas} / ${item.cantidad}`;
            } else {
                label_cantidades_vendidas = item.cantidad;
            }
            console.log(item)

            htmlPubli = `
            <tr>
                <td class="td1">
                    <div class="flex-name">
                        <div class="containe-fto">
                            <img loading="lazy" alt="img${i}-producto - nasbi.com" src="${imagenProducto}" class="img-articulo">
                        </div>
                        <p class="txt-numb">#${item.id}</p>
                        <p class="name-product" data-toggle="tooltip" data-placement="top" title= "${item.titulo}">${item.titulo}</p>
                        <p class="visits"  data-toggle="tooltip" data-placement="bottom" title="${item.cantidad_vendidas} ${idioma._trans400}">${item.cantidad_vendidas} ${idioma._trans400}</p>
                    </div>
                </td>
                <td class="">
                <div class="flex-name ml-3">
                        <p class="name-product" data-toggle="tooltip" data-placement="top" title="Caminadora X">${item.nombre_usuario}</p>
                        <p class="visits" data-toggle="tooltip" data-placement="bottom" title="undefined visitas 0 venta(s) Finalizada(s)">${item.email}</p>
                        <p class="visits" data-toggle="tooltip" data-placement="bottom" title="undefined visitas 0 venta(s) Finalizada(s)">${item.telefono}</p>
                </div>
                </td>
                <td class="td2"> <p>${item.precio_publicacion} ${item.moneda_local}</p></td>
                <td class="td3"><p>${label_cantidades_vendidas}</p></td>
                <td class="td4"><p>${estado}</p></td>
                <td class="td5"><p>${expo}</p></td>
                <td class="td5"><p>${Math.round(item.dias_espera)}</p></td>
                <td class="td6">
                    <div class="dropdown divdropdownfiltro dropdown_opciones${item.id}">
                        <button class="drop-filtro drop-table dropdown-toggle" type="button" id="opciones" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${idioma._trans332}</button>
                        <div class="dropdown-menu" aria-labelledby="opciones">
                            <a class="dropdown-item" onclick="loadPage('detalles-publicacion.php?pro=${item.id}')">Detalles</a> 
                        </div>
                    </div>
                </td>
            </tr>`

            $(".mis_publicaciones__tabla__revision").append(htmlPubli)
            $(".dropdown_opciones" + item.id).css('display', '')
            if (item.estado == 0) {
                $(".dropdown_opciones" + item.id).css('display', 'none')
            }
        })
        let htmlContentPagination = "";
        let htmlContentItemsPagination = "";
        if (datos.total_paginas > 1) {
            let inicio = ((datos.pagina - 2) > 0 ? (datos.pagina - 2) : 1);
            let fin = ((inicio + 4) < datos.total_paginas ? (inicio + 4) : datos.total_paginas);
            if (fin == datos.total_paginas) {
                inicio = ((datos.pagina - 4) > 0 ? (datos.pagina - 4) : 1);
            }
            for (let index = inicio; index <= fin; ++index) {

                htmlContentItemsPagination += `<a onclick="cambiarPagRevion1( ${index} )" class="${(index == datos.pagina ? 'active' : '')}">${index}</a>`;
            }
            let btnPrev = "";
            if (datos.pagina - 1 > 1) {
                let pag = datos.pagina - 1;
                btnPrev = `<a onclick="cambiarPagRevion1( ${pag} )" class="AD">&laquo;</a>`;
            }
            let btnNext = "";
            if (datos.pagina + 1 < datos.total_paginas) {
                let pag = datos.pagina + 1;
                btnNext = `<a onclick="cambiarPagRevion1( ${pag} )" class="AD">&raquo;</a>`;
            }
            let htmlPuntosIndexFin = "";
            if (fin < datos.total_paginas) {
                htmlContentItemsPagination += `<a> ... </a>`;

                let pag = datos.total_paginas;
                htmlContentItemsPagination += `<a onclick="cambiarPagRevion1( ${datos.total_paginas} )" class="AD">${datos.total_paginas}</a>`;
            }
            htmlContentPagination +=
                `<div class="col-12">
                <div class="pagination pagination_list">
                    `+ btnPrev + `
                    `+ htmlContentItemsPagination + `
                    `+ btnNext + `
                </div>
            </div>`;
        } else {
        }


        $(".paginacion_publicaciones__revision").html(htmlContentPagination);
    } else {
        $(".products__listp__nodata3").show("slow")
        $(".paginacion_publicaciones").hide()
    }

}
function cambiarPagRevion1(pag){
    getProductosRevision1(pag, keys);
}
function AceptarRevision(id) {
    let dataRev_url = baseurl + "/controllers/publicacion/?aceptar_producto";
    let dataRev = {
        data:{
            "id_producto": id,
        }
    }
    $.ajax({
        type: "POST",
        url: dataRev_url,
        data:JSON.stringify(dataRev),
        dataType: "json",
        contentType: 'application/json',
        success: results =>{
            if(results.status == "success"){
                presentAlertObject({ icon: 'success', text: idioma.trans_eb44 });
                $('.sidenav_publicaciones_revision').click();
            }else if (results.status == 'fail'){
                presentAlertObject({ icon: 'success', text: idioma.trans_eb46 });
                $('.sidenav_publicaciones_revision').click();
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
    let dataRev = {
        data:{
            "id_producto": id,
        }
    }
    $.ajax({
        type: "POST",
        url: dataRev_url,
        data:JSON.stringify(dataRev),
        dataType: "json",
        contentType: 'application/json',
        success: results =>{
            if(results.status == "success"){
                presentAlertObject({ icon: 'success', text: idioma.trans_eb45 });
                $('.sidenav_publicaciones_revision').click();
            }else if (results.status == 'fail'){
                presentAlertObject({ icon: 'success', text: idioma.trans_eb46 });
                $('.sidenav_publicaciones_revision').click();
            }
        },
        error: error => {
            presentAlertObject({ icon: 'success', text: idioma.trans_eb46 });
            $('.sidenav_publicaciones_revision').click();
        }
    });
}