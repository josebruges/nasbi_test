

$(document).ready(($event) => {
    var maxDate = new Date().toISOString().split("T")[0];
    $('.datepicker').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        endDate: maxDate,
    });

    $('.sidenav__mis_tk_venta').click(($event) => {
        initTicketVenta();
    });
    initTicketVenta();



    $(".tiquets_referencias").change(($event) => {
        getTiquets();
    })

    $(".fecha_transaccion").change(function () {
        getTiquets();
    })
    $(".btn_limpiar").click(($event) => {
        btn_limpiar_tiquets_ventas();

    })
    ///////////////////////////////////////////////
    $(".trans_tiquets_referencias").change(($event) => {
        getTransacciones();
    })

    $(".trans_fecha_transaccion").change(function () {
        getTransacciones();
    })
    $(".trans_btn_limpiar").click(($event) => {

        btn_limpiar_trans_ventas();

    })


})
function initTicketVenta() {
    if (validarText(user)) {
        llenarSelects()
        getCantTiquets()
        getTiquets();
        getTransacciones();
        //////////////////////
        getPlanes();

    } else {
        presentAlert("Error", "Por favor inicia sesion primero", "error")
        loadPage("index.php")
    }

}
function getCantTiquets() {
    let dataTiquets = {
        uid: user.uid,
        empresa: user.empresa,
        tipo: "all",
        uso: 1,
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

                generateItemsProductsHtml2(success['data']);
            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) { }
            }

        }, error: error => {
            presentAlert(idioma['trans_04'], idioma['_trans06'], "error")


        }
    });

}
function getTiquets(pag = 1) {
    let tipo = ""


    tipo = $(".tiquets_referencias option:selected").val()
    var date = +new Date($('.fecha_transaccion').val() + ' 00:00:00')
    // uso = $(".tiquets_tipos option:selected").val()
    let dataTiquets = {
        uid: user.uid,
        empresa: user.empresa,
        tipo: tipo,
        uso: 1,
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
                $(".trans__list__nodata ").hide("fast")
                listTiquetsView(false)
                generateItemsProductsHtml(success);
            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) listTiquetsView(true)
            }

        }, error: error => {
            presentAlert(idioma['trans_04'], idioma['_trans06'], "error")


        }
    });
}
function generateItemsProductsHtml2(data) {

    let total = 0
    $('.bronze').empty()
    $.each(data, (i, item) => {
        total += item.cantidad
        if (item.plan == 1) {
            $('.bronze').text(item.cantidad);

        } else if (item.plan == 2) {
            $('.silver').text(item.cantidad);

        } else if (item.plan == 3) {
            $('.gold').text(item.cantidad);
        } else if (item.plan == 4) {
            $('.platinum').text(item.cantidad);

        } else {
            $('.diamond').text(item.cantidad);

        }


    });

    $('.total').text(total);
}
function generateItemsProductsHtml(datos) {

    let htmlFila = "";
    $('.tabla_tiquets').empty();
    $('.paginacion').empty();

    $.each(datos.data, (i, item) => {
        console.log(item)
        item.descripcion = idioma['_trans936']
        let fecha = getFechaSinHora(item.fecha_creacion)

        htmlFila =
            `<tr>
            <td><span><img src="../imagen/../imagen/logo-mtd.png"></span> ${item.nombre_plan}</td>
            <td>${item.descripcion}</td>
            <td><b>${item.codigo}</b></td>
            <td>${fecha}</td>
        </tr>`;
        $('.tabla_tiquets').append(htmlFila);
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

            htmlContentItemsPagination += `<a onclick="getTiquets( ${index} )" class="${(index == datos.pagina ? 'active' : '')}">${index}</a>`;
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
            htmlContentItemsPagination += `<a onclick="getTiquets( ${datos.total_paginas} )" class="AD">${datos.total_paginas}</a>`;
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
    $('.paginacion').html(htmlContentPagination);
}





function llenarSelects() {
    var referencia = [
        { "id": "all", "nombre": idioma['_trans39'] },
        { "id": 1, "nombre": idioma['_trans40'] },
        { "id": 2, "nombre": idioma['_trans41'] },
        { "id": 3, "nombre": idioma['_trans42'] },
        { "id": 4, "nombre": idioma['_trans43'] }
    ];
    // $('.tiquets_referencias').empty();
    // $('.trans_tiquets_referencias').empty();

    // $('.tiquets_referencias2').empty();
    // $('.trans_tiquets_referencias2').empty();

    $('.tiquets_referencias').selectpicker('destroy');
    $('.trans_tiquets_referencias').selectpicker('destroy');

    $('.tiquets_referencias2').selectpicker('destroy');
    $('.trans_tiquets_referencias2').selectpicker('destroy');

    let htmlreferencias;

    $.each(referencia, function (i, ref) {
        htmlreferencias += `<option value="${ref.id}">${ref.nombre}</option>`;
    });

    $('.tiquets_referencias').html(htmlreferencias);
    $('.trans_tiquets_referencias').html(htmlreferencias);
    $('.tiquets_referencias2').html(htmlreferencias);
    $('.trans_tiquets_referencias2').html(htmlreferencias);
    $('.tiquets_referencias').selectpicker({
        size: 7,
        dropupAuto: false
    });
    $('.trans_tiquets_referencias').selectpicker({
        size: 7,
        dropupAuto: false
    });

    $('.tiquets_referencias2').selectpicker({
        size: 7,
        dropupAuto: false
    });

    $('.trans_tiquets_referencias2').selectpicker({
        size: 7,
        dropupAuto: false
    });


}
function listTiquetsView(isVisible = false) {
    if (isVisible) {
        $('.tabla_tiquets').empty();
        $('.paginacion').empty();
        $(".tiquets__list__nodata ").show("slow")
    } else {
        $(".tiquets__list__nodata ").hide("fast")
    }
}
///////////////////////////////////////////////////////////////

function getTransacciones(pag = 1) {
    let tipo = ""


    tipo = $(".trans_tiquets_referencias option:selected").val()
    let date = +new Date($('.trans_fecha_transaccion').val() + ' 00:00:00')
    let dataTrans = {
        uid: user.uid,
        empresa: user.empresa,
        tipo: tipo,
        uso: 1,
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
                generateItemsTransHtml(success)

            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) listTransView(true)
            }
        }, error: error => {
            presentAlert(idioma['trans_04'], idioma['_trans06'], "error")
        }
    });

}
function generateItemsTransHtml(datos) {

    let htmlFila = "";
    let htmlContentItemsPagination = ""
    $('.trans_tabla_tiquets').empty();


    $.each(datos.data, (i, item) => {
        let uso_desc = ""
        if (item.uso == 1) {
            uso_desc = idioma["_trans934"]
        } else {
            uso_desc = idioma["_trans935"]
        }

        let fecha = getFechaSinHora(item.fecha_creacion)

        htmlFila =
            `<tr>
            <td><span><img src="../imagen/../imagen/logo-mtd.png"></span> ${uso_desc}</td>
            <td>${item.cantidad}</td>
            <td><b>${item.nombre_plan}</b></td>
            <td>${fecha}</td>-
            <td><a id="${item.id}" class="ver_trans_detalles_venta">${idioma._trans44}</a></td>

        </tr>`;
        $('.trans_tabla_tiquets').append(htmlFila);
        $('.ver_trans_detalles_venta').eq(i).off()
        $('.ver_trans_detalles_venta').eq(i).on('click', { item }, verDetallesTrasVenta)
    });

    if (datos.total_paginas > 1) {
        for (let index = 1; index <= datos.total_paginas; ++index) {
            htmlContentItemsPagination += `<a onclick="getTransacciones(${index})" class="${(index == datos.pagina ? 'active' : '')}">${index}</a>`;
        }
        let anterior = datos.pagina - 1 ? datos.pagina - 1 : 1;
        let btnPrev = `<a onclick="getTransacciones(${anterior})" class="AD">&laquo;</a>`

        let sig = datos.pagina + 1 ? datos.pagina + 1 : datos.pagina;
        let btnNext = `<a onclick="getTransacciones(${sig})" class="AD">&raquo;</a>`

        htmlpaginacion =
            `<div class="col-12">
	                    <div class="pagination pagination_list">`
            + btnPrev +
            htmlContentItemsPagination +
            btnNext + `
	                  </div>
                  </div>`;
        $('.trans_paginacion').html(htmlpaginacion);
    }

}
function verDetallesTrasVenta(ev) {
    console.log(ev.data)
    let item = ev.data.item
    let fecha = getFechaConHora(item.fecha_creacion)
    let uso_desc = ""
    if (item.uso == 1) {
        uso_desc = idioma["_trans934"]
    } else {
        uso_desc = idioma["_trans935"]
    }
    $(".detalles_hash").val(item.codigo)
    $(".detalle_descripcion").val(uso_desc)
    $(".detalle_monto").val(item.cantidad)
    $(".detalle_fecha").val(fecha)
    $("#modal-detalles-trans").modal('show')

}
function listTransView(isVisible = false) {
    if (isVisible) {
        $('.trans_tabla_tiquets').empty();
        $('.trans_paginacion').empty();
        $(".trans__list__nodata ").show("slow")
    } else {
        $(".trans__list__nodata ").hide("fast")
    }
}


/////////////////////////////COMPRA TIQUETS//////////////////////////////////////////////////////


function getPlanes() {
    let dataPlanes = {
        uid: user.uid,
        empresa: user.empresa,
    }



    let data_url = baseurl + "/controllers/planes_nasbi/?ver_planes";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataPlanes }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {

            if (success["status"] == "success") {

                generateItemsReconsHtml(success['data']);
            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) presentAlert(idioma['trans_04'], idioma['_trans06'], "error")
            }

        }, error: error => {
            presentAlert(idioma['trans_04'], idioma['_trans06'], "error")


        }
    });
}
function generateItemsReconsHtml(datos) {
    let htmlplanes = ""
    let htmltiquets = ""
    $('.tabla_planes').empty();
    $.each(datos, (i, item) => {
        htmlplanes =
            `<tr>
            <td>${item.nombre}</td>
            <td>${item.total_entradas}</td>`
        for (let index = 0; index < 5; index++) {
            let valor = "-"
            let array = item.entradas_planes[index]

            if (array != undefined) {
                switch (array.id) {
                    case 1:
                        valor = array.valor;
                        break;
                    case 2:
                        valor = array.valor;
                        break;
                    case 3:
                        valor = array.valor;
                        break;
                    case 4:
                        valor = array.valor;
                        break;
                    case 5:
                        valor = array.valor;
                        break;
                }

            }

            htmlplanes += `<td>${valor}</td>`
        }

        htmlplanes += `<td><b> $${item.costo} USD</b></td>
            <td> <button onclick="adquirirPlan(${item.id})" id="">${idioma._trans45}</button></td>

        </tr>`

        $('.tabla_planes').append(htmlplanes);

    });


}
function adquirirPlan(id) {
    let dataPlanes = {
        uid: user.uid,
        empresa: user.empresa,
        id: id
    }


    let data_url = baseurl + "/controllers/planes_nasbi/?pagar_plan";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataPlanes }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {

            if (success["status"] == "success") {
                presentAlert(idioma['_trans12'], idioma['_trans46'], "success")
            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) presentAlert(idioma['trans_04'], idioma['_trans06'], "error")
            }

        }, error: error => {
            presentAlert(idioma['trans_04'], idioma['_trans06'], "error")


        }
    });


}


function btn_limpiar_tiquets_ventas() {
    $(".tiquets_referencias").val("all")
    $(".tiquets_referencias .filter-option-inner-inner").text(idioma['_trans39']);

    // $(".fecha_transaccion").val("")
    $('.fecha_transaccion').val('').datepicker('update');
    $('.fecha_transaccion').val(idioma.trans236_);
    getTiquets();
}

function btn_limpiar_trans_ventas(params) {
    // $(".trans_tiquets_referencias").val("all")
    // $(".trans_fecha_transaccion").val("")

    $(".trans_tiquets_referencias").val("all")
    $(".trans_tiquets_referencias .filter-option-inner-inner").text(idioma['_trans39']);

    $('.trans_fecha_transaccion').val('').datepicker('update');
    $('.trans_fecha_transaccion').val(idioma.trans236_);

    getTransacciones();
}