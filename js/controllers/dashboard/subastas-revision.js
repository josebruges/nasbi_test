var arraydetipos_subasta = [
    { id: 0, text: idioma.trans307_ },
    { id: 1, text: idioma._trans40 },
    { id: 2, text: idioma._trans41 },
    { id: 3, text: idioma._trans42 },
    { id: 4, text: idioma._trans43 },
    { id: 5, text: idioma.trans81_ },
    { id: 6, text: idioma.trans149 },
];
var estadoSubasta = [
    { id: 1, nombre: idioma['trans62_'] },
    { id: 2, nombre: idioma['trans63_'] },
    { id: 3, nombre: idioma['trans64_'] },
    { id: 4, nombre: idioma['trans67_'] },

];

$(document).ready(($event) => {
    $('.sidenav_publicaciones_revision_subastas').click(($event) => {
        $(".mis_publicaciones__tabla__revision_subastas").empty();
        $(".paginacion_publicaciones__revision_subastas").empty()
        getProductosRevisionSubastas(1);
    });
});

function getProductosRevisionSubastas(pag=1, titulo = null){
    $(".content__loadingSpinner_subastas").show();
    let dataRev_url = baseurl + "/controllers/publicacion/?obtener_subastas_backend";
    let dataRev = null;
    if (titulo != null){
        dataRev = {
            data:{
                "pag":pag,
                "titulo": titulo,
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
            $(".content__loadingSpinner_subastas").hide()
            $(".products__listp__nodata2").hide("fast")
            if(results.status == "success"){
                // listarMisPublicaciones(results);
                console.log(results);
                listarMisPublicacionesRevisionSubastas(results);
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

function buscar() {
    let key = $(".input_buscar").val();
    if (key != "") {
        getProductosRevisionSubastas(1, key)

    } else {
        getProductosRevisionSubastas(1)
    }
}
function listarMisPublicacionesRevisionSubastas(datos) {
    let htmlPubli = ""
    let imagenProducto;
    let precio;
    let option = "";
    let option2 = "";
    let expo;
    let estado;
    let addItem = 0;
    $(".mis_publicaciones__tabla__revision_subastas").empty();
    $(".paginacion_publicaciones__revision_subastas").empty()
    if (datos.data.length > 0) {
        $.each(datos.data, (i, item) => {

            htmlPubli = `
            <tr>
                <td class="">
                    <div class="flex-name">
                        <div class="containe-fto">
                            <img loading="lazy" alt="img${i}-producto - nasbi.com" src="${item.foto_portada}" class="img-articulo">
                        </div>
                        <p class="txt-numb">#${item.id}</p>
                        <p class="name-product" data-toggle="tooltip" data-placement="top" title= "${item.producto_titulo}">${item.producto_titulo}</p>
                    </div>
                </td>
                <td class=""> <p>${item.cantidad}</p></td>
                <td class=""><p>${item.tipo_descripcion}</p></td>
                <td class=""><p>${item.moneda}</p></td>
                <td class=""><p>${item.inscritos}</p></td>
                <td class=""><p>${item.producto_precio_mask}</p></td>
                <td class=""><p>${item.apostadores}</p></td>
                <td class=""><p>${estadoSubasta.filter(f => f.id == item.estado )[0].nombre}</p></td>
                <td class=""><p>${getFechaSinHora(Number.parseFloat(item.fecha_inicio))}</p></td>
                <td class="td6">
                    <div class="dropdown divdropdownfiltro dropdown_opciones${item.id}">
                        <button class="drop-filtro drop-table dropdown-toggle" type="button" id="opciones" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${idioma._trans332}</button>
                        <div class="dropdown-menu" aria-labelledby="opciones">
                            <a class="dropdown-item" onclick="loadPage('detalles-subastas.php?pro=${item.id}')">Detalles</a> 
                        </div>
                    </div>
                </td>
            </tr>`

            $(".mis_publicaciones__tabla__revision_subastas").append(htmlPubli)
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

                htmlContentItemsPagination += `<a onclick="cambiarPagRevionSubastas1( ${index} )" class="${(index == datos.pagina ? 'active' : '')}">${index}</a>`;
            }
            let btnPrev = "";
            if (datos.pagina - 1 > 1) {
                let pag = datos.pagina - 1;
                btnPrev = `<a onclick="cambiarPagRevionSubastas1( ${pag} )" class="AD">&laquo;</a>`;
            }
            let btnNext = "";
            if (datos.pagina + 1 < datos.total_paginas) {
                let pag = datos.pagina + 1;
                btnNext = `<a onclick="cambiarPagRevionSubastas1( ${pag} )" class="AD">&raquo;</a>`;
            }
            let htmlPuntosIndexFin = "";
            if (fin < datos.total_paginas) {
                htmlContentItemsPagination += `<a> ... </a>`;

                let pag = datos.total_paginas;
                htmlContentItemsPagination += `<a onclick="cambiarPagRevionSubastas1( ${datos.total_paginas} )" class="AD">${datos.total_paginas}</a>`;
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


        $(".paginacion_publicaciones__revision_subastas").html(htmlContentPagination);
    } else {
        $(".products__listp__nodata3").show("slow")
        $(".paginacion_publicaciones").hide()
    }

}
function cambiarPagRevionSubastas1(pag){
    getProductosRevisionSubastas(pag);
}