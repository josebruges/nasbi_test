$(document).ready(($event) => {
    var maxDate = new Date().toISOString().split("T")[0];
    $('.datepicker').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        endDate: maxDate,
    });


    $('.sidenav__mis_tk_compra').click(($event) => {
        initTicketCompra();
    });


    $(".tiquets_referencias2").change(($event) => {
        getTiquetsc();
    })

    $(".fecha_transaccion2").change(function () {
        getTiquetsc();
    })
    $(".btn_limpiar2").click(($event) => {
        btn_limpiar_tiquets_compras();


    })
    ///////////////////////////////////////////////
    $(".trans_tiquets_referencias2").change(($event) => {
        getTransaccionesc();
    })

    $(".trans_fecha_transaccion2").change(function () {
        getTransaccionesc();
    })
    $(".trans_btn_limpiar2").click(($event) => {
        btn_limpiar_trans_compras();


    })

})
function initTicketCompra() {
    if (validarText(user)) {
        getCantTiquetsc()
        getTiquetsc();
        getTransaccionesc();
        //////////////////////

    } else {
        presentAlert("Error", "Por favor inicia sesion primero", "error")
        loadPage("index.php")
    }

}
function getCantTiquetsc() {
    let dataTiquets = {
        uid: user.uid,
        empresa: user.empresa,
        tipo: "all",
        uso: 2,
        group: 1,

    }

    let data_url = baseurl + "/controllers/planes_nasbi/?tickets_usuario";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataTiquets }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            if (success["status"] == "success") {

                generateItemsProductsHtml2c(success['data']);
            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) { }
            }

        }, error: error => {
            presentAlert(idioma['trans_04'], idioma['_trans06'], "error")


        }
    });

}
function getTiquetsc(pag = 1) {
    let tipo = ""


    tipo = $(".tiquets_referencias2 option:selected").val()
    var date = +new Date($('.fecha_transaccion2').val() + ' 00:00:00')
    // uso = $(".tiquets_tipos option:selected").val()
    let dataTiquets = {
        uid: user.uid,
        empresa: user.empresa,
        tipo: tipo,
        uso: 2,
        group: 0,
        fecha_inicio: date,
        pagina: pag
    }

    let data_url = baseurl + "/controllers/planes_nasbi/?tickets_usuario";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataTiquets }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {

            if (success["status"] == "success") {
                $(".trans__list__nodata2").hide("fast")
                listTiquetsViewc(false)
                generateItemsProductsHtmlc(success);
            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) listTiquetsViewc(true)
            }

        }, error: error => {
            presentAlert(idioma['trans_04'], idioma['_trans06'], "error")


        }
    });
}
function generateItemsProductsHtml2c(data) {

    let total = 0
    $.each(data, (i, item) => {
        total += item.cantidad
        if (item.plan == 1) {
            $('.bronze2').text(item.cantidad);

        } else if (item.plan == 2) {
            $('.silver2').text(item.cantidad);

        } else if (item.plan == 3) {
            $('.gold2').text(item.cantidad);
        } else if (item.plan == 4) {
            $('.platinum2').text(item.cantidad);

        } else {
            $('.diamond2').text(item.cantidad);

        }


    });

    $('.total2').text(total);


}
function generateItemsProductsHtmlc(datos) {

    let htmlFila = "";
    $('.tabla_tiquets2').empty();

    $.each(datos.data, (i, item) => {
        let uso = ""
        let fecha = getFechaSinHora(item.fecha_creacion)
        item.descripcion = idioma['_trans936']

        htmlFila =
            `<tr>
            <td><span><img src="../imagen/../imagen/logo-mtd.png"></span> ${item.nombre_plan}</td>
            <td>${item.descripcion}</td>
            <td><b>${item.codigo}</b></td>
            <td>${fecha}</td>
        </tr>`;
        $('.tabla_tiquets2').append(htmlFila);
    });

    let htmlContentPagination = "";
    let htmlContentItemsPagination = "";
    if (datos.total_paginas > 1) {
        let inicio = ((datos.pagina - 2) > 0 ? (datos.pagina - 2) : 1);
        let fin = ((inicio + 4) < datos.total_paginas ? (inicio + 4) : datos.total_paginas);
        if (fin == datos.total_paginas) {
            inicio = ((datos.pagina - 4) > 0 ? (datos.pagina - 4) : 1);
        }
        for (let index = inicio; index <= fin; ++index) {

            htmlContentItemsPagination += `<a onclick="getTiquetsc( ${index} )" class="${(index == datos.pagina ? 'active' : '')}">${index}</a>`;
        }
        let btnPrev = "";
        if (datos.pagina - 1 > 1) {
            let pag = datos.pagina - 1;
            btnPrev = `<a onclick="getTiquets( 1 )" class="AD">&laquo;</a>`;
        }
        let btnNext = "";
        if (datos.pagina + 1 < datos.total_paginas) {
            let pag = datos.pagina + 1;
            btnNext = `<a onclick="getTiquetsc( ${pag} )" class="AD">&raquo;</a>`;
        }
        let htmlPuntosIndexFin = "";
        if (fin < datos.total_paginas) {
            htmlContentItemsPagination += `<a> ... </a>`;

            let pag = datos.total_paginas;
            htmlContentItemsPagination += `<a onclick="getTiquetsc( ${datos.total_paginas} )" class="AD">${datos.total_paginas}</a>`;
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
    $('.paginacion2').html(htmlContentPagination);

}

function listTiquetsViewc(isVisible = false) {
    if (isVisible) {
        $('.tabla_tiquets2').empty();
        $('.paginacion2').empty()
        $(".tiquets__list__nodata2 ").show("slow")
    } else {
        $(".tiquets__list__nodata2 ").hide("fast")
    }
}
///////////////////////////////////////////////////////////////

function getTransaccionesc(pag = 1) {
    let tipo = ""


    tipo = $(".trans_tiquets_referencias2 option:selected").val()
    let date = +new Date($('.trans_fecha_transaccion2').val() + ' 00:00:00')

    let dataTrans = {
        uid: user.uid,
        empresa: user.empresa,
        tipo: tipo,
        uso: 2,
        group: 0,
        fecha_inicio: date,
        pagina: pag
    }



    let data_url = baseurl + "/controllers/planes_nasbi/?tickets_usuario_historico";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataTrans }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            if (success["status"] == "success") {
                listTransView(false)
                generateItemsTransHtmlc(success)

            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) listTransViewc(true)
            }
        }, error: error => {
            presentAlert(idioma['trans_04'], idioma['_trans06'], "error")
        }
    });

}
function generateItemsTransHtmlc(datos) {

    let htmlFila = "";
    $('.trans_tabla_tiquets2').empty();

    $.each(datos.data, (i, item) => {

        let fecha = getFechaSinHora(item.fecha_creacion)

        let uso_desc = ""
        if (item.uso == 1) {
            uso_desc = idioma["_trans934"]
        } else {
            uso_desc = idioma["_trans935"]
        }

        htmlFila =
            `<tr>
            <td><span><img src="../imagen/../imagen/logo-mtd.png"></span> ${uso_desc}</td>
            <td>${item.cantidad}</td>
            <td><b>${item.nombre_plan}</b></td>
            <td>${fecha}</td>
            <td><a id="${item.id}" class="ver_trans_detalles_compra">${idioma._trans44}</a></td>

        </tr>`;
        $('.trans_tabla_tiquets2').append(htmlFila);
        $('.ver_trans_detalles_compra').eq(i).off()
        $('.ver_trans_detalles_compra').eq(i).on('click', { item }, verDetallesTrasCompra)

    });

    let htmlContentPagination = "";
    let htmlContentItemsPagination = "";
    if (datos.total_paginas > 1) {
        let inicio = ((datos.pagina - 2) > 0 ? (datos.pagina - 2) : 1);
        let fin = ((inicio + 4) < datos.total_paginas ? (inicio + 4) : datos.total_paginas);
        if (fin == datos.total_paginas) {
            inicio = ((datos.pagina - 4) > 0 ? (datos.pagina - 4) : 1);
        }
        for (let index = inicio; index <= fin; ++index) {

            htmlContentItemsPagination += `<a onclick="getTransaccionesc( ${index} )" class="${(index == datos.pagina ? 'active' : '')}">${index}</a>`;
        }
        let btnPrev = "";
        if (datos.pagina - 1 > 1) {
            let pag = datos.pagina - 1;
            btnPrev = `<a onclick="getTransaccionesc( 1 )" class="AD">&laquo;</a>`;
        }
        let btnNext = "";
        if (datos.pagina + 1 < datos.total_paginas) {
            let pag = datos.pagina + 1;
            btnNext = `<a onclick="getTransaccionesc( ${pag} )" class="AD">&raquo;</a>`;
        }
        let htmlPuntosIndexFin = "";
        if (fin < datos.total_paginas) {
            htmlContentItemsPagination += `<a> ... </a>`;

            let pag = datos.total_paginas;
            htmlContentItemsPagination += `<a onclick="getTransaccionesc( ${datos.total_paginas} )" class="AD">${datos.total_paginas}</a>`;
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
    $('.trans_paginacion2').html(htmlContentPagination);

}
function verDetallesTrasCompra(ev) {
    console.log(ev.data)
    let item = ev.data.item
    let uso_desc = ""
    if (item.uso == 1) {
        uso_desc = idioma["_trans934"]
    } else {
        uso_desc = idioma["_trans935"]
    }

    $(".detalles_hash").val(item.codigo)
    $(".detalle_descripcion").val(uso_desc)
    $(".detalle_monto").val(item.cantidad)
    $(".detalle_fecha").val(getFechaConHora(item.fecha_creacion))
    $("#modal-detalles-trans").modal('show')

}
function listTransViewc(isVisible = false) {
    if (isVisible) {
        $('.trans_tabla_tiquets2').empty();
        $('.trans_paginacion2').empty()
        $(".trans__list__nodata2 ").show("slow")
    } else {
        $(".trans__list__nodata2 ").hide("fast")
    }
}


function btn_limpiar_tiquets_compras(params) {
    // $(".tiquets_referencias2").val("all")
    // $(".fecha_transaccion2").val("")

    $(".tiquets_referencias2").val("all")
    $(".tiquets_referencias2 .filter-option-inner-inner").text(idioma['_trans39']);

    // $(".fecha_transaccion").val("")
    $('.fecha_transaccion2').val('').datepicker('update');
    $('.fecha_transaccion2').val(idioma.trans236_);

    getTiquetsc();
}


function btn_limpiar_trans_compras() {
    //$(".trans_tiquets_referencias2").val("all")
    //$(".trans_fecha_transaccion2").val("")

    $(".trans_tiquets_referencias2").val("all")
    $(".trans_tiquets_referencias2 .filter-option-inner-inner").text(idioma['_trans39']);

    // $(".fecha_transaccion").val("")
    $('.trans_fecha_transaccion2').val('').datepicker('update');
    $('.trans_fecha_transaccion2').val(idioma.trans236_);


    getTransaccionesc();
}

