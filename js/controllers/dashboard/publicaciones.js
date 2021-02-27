

let mis_cuentas_publicaciones = localStorage.getItem("mis_cuentas");
if (mis_cuentas_publicaciones == ".sidenav_publicaciones") {
    $(mis_cuentas_publicaciones).click();
    initPublicaciones();


}
let miuser_uid = validarText(user) ? user.uid : null;
let miuser_empresa = validarText(user) ? user.empresa : null;
let miuser_lang = validarText(user) && validarText(user.idioma) ? user.idioma.toUpperCase() : "ES";
var exposicionProducto = [
    { id: "all", nombre: idioma['trans_47'] },
    { id: 1, nombre: idioma['_trans395'], img: '../imagen/public-venta/gratuita.png', descripcion: idioma.trans199_, link_text: idioma.trans200_, link: '' },
    { id: 2, nombre: idioma['_trans396'], img: '../imagen/public-venta/promocionada.png', descripcion: idioma.trans201_, link_text: idioma.trans202_, link: '' },
    { id: 3, nombre: idioma['_trans397'], img: '../imagen/public-venta/promocionada.png', descripcion: idioma.trans203_, link_text: idioma.trans204_, link: '' }
];

var estadoSubasta = [
    { id: 1, nombre: idioma['trans62_'] },
    { id: 2, nombre: idioma['trans63_'] },
    { id: 3, nombre: idioma['trans64_'] },
    { id: 4, nombre: idioma['trans67_'] },

];
var estados = [
    { id: "all", nombre: idioma['trans_47'] },
    { id: 0, nombre: idioma['_trans393'] },
    { id: 1, nombre: idioma['trans21'] },
    { id: 2, nombre: idioma['_trans394'] },
    { id: 3, nombre: idioma['trans292'] },
    { id: 5, nombre: idioma['trans297'] }


];
var misSubastas = [];
var misPublicaciones = []


var url_temp = getBaseUrlProject();

$(document).ready(($event) => {
    $('.sidenav_publicaciones').click(($event) => {
        //localStorage.setItem("mis_cuentas", ".sidenav_publicaciones");
        redirigir_opcion_mis_cuentas(".sidenav_publicaciones"); //esta funcion esta en resumen 
        initPublicaciones();
        console.log("------------############# Mis cuentas: [.sidenav_publicaciones]");
    });
    $('.tips_mejorar_ventas').click(($event) => {
        loadPage("escuela-vendedores.php")
    });

})

function initPublicaciones() {
    llenarSelects()
    if (validarText(user)) {
        getMisPublicaciones();
        getMisSubastas();
    } else {
        confirmarProceso(idioma['trans_145'], idioma['_trans452']);
        $(location).attr('href', "index.php")
    }

}
function llenarSelects() {
    var exposicionProducto = [
        { id: "all", nombre: idioma['trans_47'] },
        { id: 1, nombre: idioma['_trans395'], img: '../imagen/public-venta/gratuita.png', descripcion: idioma.trans199_, link_text: idioma.trans200_, link: '' },
        { id: 2, nombre: idioma['_trans396'], img: '../imagen/public-venta/promocionada.png', descripcion: idioma.trans201_, link_text: idioma.trans202_, link: '' },
        { id: 3, nombre: idioma['_trans397'], img: '../imagen/public-venta/promocionada.png', descripcion: idioma.trans203_, link_text: idioma.trans204_, link: '' }
    ];
    var estados = [
        { id: "all", nombre: idioma['trans_47'] },
        { id: 0, nombre: idioma['_trans393'] },
        { id: 1, nombre: idioma['trans21'] },
        { id: 2, nombre: idioma['_trans394'] },
        { id: 3, nombre: idioma['trans292'] },
        // { id: 5, nombre: idioma['trans297']}

    ];
    var tipos_publicacion = [
        { id: 0, nombre: idioma['trans_47'] },
        { id: 1, nombre: idioma['_trans879'] },
        { id: 2, nombre: idioma['_trans219'] },
    ]
    $(".content_estado").html(` <select class="dropdown divdropdownfiltro filtro_estado"></select>`)
    $(".content_expo").html(` <select class="dropdown divdropdownfiltro filtro_exposicion"></select>`)
    $(".content_tipo_publicacion").html(` <select class="dropdown divdropdownfiltro filtro_tipo_publicacion"></select>`)

    $(".filtro_estado").empty()
    $(".filtro_exposicion").empty()
    $(".filtro_tipo_publicacion").empty()
    let htmlestado = "";
    let htmlexpo = "";
    let htmltipo = ""
    $.each(exposicionProducto, (i, item) => {
        htmlexpo += `<option value="${item.id}">${item.nombre}</option>`
    })
    $.each(estados, (i, item) => {
        htmlestado += `<option value="${item.id}">${item.nombre}</option>`
    })
    $.each(tipos_publicacion, (i, item) => {
        htmltipo += `<option value="${item.id}">${item.nombre}</option>`
    })
    $(".filtro_tipo_publicacion").html(htmltipo)
    $(".filtro_estado").html(htmlestado)
    $(".filtro_exposicion").html(htmlexpo)
    $(".filtro_tipo_publicacion").selectpicker({
        size: 5
    })
    $(".filtro_estado").selectpicker({
        size: 5
    })
    $(".filtro_exposicion").selectpicker({
        size: 5
    })
    $('.filtro_tipo_publicacion').off('click');
    $('.filtro_tipo_publicacion').on('click', null, function () {
        getMisPublicaciones();
    })

    $('.filtro_estado').off('click');
    $('.filtro_estado').on('click', null, function () {
        // let revision = $(".filtro_estado option:selected").val();
        getMisPublicaciones();
    })
    $('.filtro_exposicion').off('click');
    $('.filtro_exposicion').on('click', null, function () {
        getMisPublicaciones();
    })




    // $(".filtro_estado").change(($event) => {
    //     getMisPublicaciones()
    // })




    // $(".filtro_exposicion").change(($event) => {
    //     getMisPublicaciones()

    // });

}
function buscar() {
    let miarray = {
        data: [],
        pagina: 1,
        total_paginas: 1
    };
    let miarraySub = {
        data: [],
        pagina: 1,
        total_paginas: 1
    }
    let key = $(".input_buscar").val();
    if (key != "") {
        if (parseInt(key)) {
            miarray.data = misPublicaciones.filter(f => {
                return f.id.toString().includes(key.toString())
            })
        } else {
            miarray.data = misPublicaciones.filter(f => {
                return f.titulo.toLowerCase().includes(key.toLowerCase())
            })
            miarraySub.data = misSubastas.filter(f => {
                return f.titulo.toLowerCase().includes(key.toLowerCase())
            })
            listarMisSubastas(miarraySub)
        }
        console.log(miarraySub, miarray)
        listarMisPublicaciones(miarray)

    } else {
        getMisPublicaciones()
        getMisSubastas()
    }
}
function getMisSubastas(pag = 1) {
    $(".content__loadingSpinner_subastas").show()
    let dataSubastas = {
        "uid": user.uid,
        "empresa": user.empresa,
        "pagina": pag
    }
    let data_url = baseurl + "/controllers/publicacion/?mis_subastas";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataSubastas }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $(".content__loadingSpinner_subastas").hide()
            if (success["status"] == "success") {
                $(".products__listp__nodata").hide("fast")
                misSubastas = success['data']
                listarMisSubastas(success);

            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) {
                    for (var i = 0; i < $('.item').length; i++) {
                        $("#carrousel_mis_subastas").trigger('remove.owl.carousel', [i])
                            .trigger('refresh.owl.carousel');
                    }
                    $(".paginacion_subastas").empty()
                    // $(".carrousel_mis_subastas").empty();
                    $(".products__listp__nodata").show("slow")
                }
            }
        }, error: error => {
            for (var i = 0; i < $('.item').length; i++) {
                $("#carrousel_mis_subastas").trigger('remove.owl.carousel', [i])
                    .trigger('refresh.owl.carousel');
            }
            $(".content__loadingSpinner_subastas").hide()
            $(".paginacion_subastas").empty()
            confirmarProceso(idioma['_trans06'], idioma['_trans499'])
        }
    });
}
function listarMisSubastas(datos) {

    let htmlSubastas = ""
    let imagenProducto;
    let precio;
    let miestado;

    //$("#carrousel_mis_subastas").empty();
    for (var i = 0; i < $('.item').length; i++) {
        $("#carrousel_mis_subastas").trigger('remove.owl.carousel', [i])
            .trigger('refresh.owl.carousel');
    }
    if (datos.data.length > 0) {
        $.each(datos.data, (i, item) => {
            if (item.foto_portada != "") {
                imagenProducto = item.foto_portada;
            } else {
                imagenProducto = imageDefault;
            }
            if (item.moneda == "Nasbiblue") {
                item['moneda'] = idioma['trans36_']
            } else if (item.moneda == "Nasbigold") {
                item['moneda'] = idioma['trans37_']
            }
            let precio = ""

            console.log(item)
            miestado = estadoSubasta.filter(f => f.id == item.estado)[0].nombre
            htmlSubastas = ` 
                <div class="item">
                    <div class="row row-cont-publi" onclick="mostrarInfoMisSubastas(${item.id})">
                        <div class="col-12 px-1">
                            <p class="label1P">${idioma._trans129}: <span class="estado${item.estado}">${miestado}</span></p>
                            <div class="container-public">
                                <img loading="lazy" alt="img${i}-producto - nasbi.com" src="${imagenProducto}" class="imagen-public">
                            </div>
                            <h5 class="bold-public">${item.titulo}</h5>
                            <p class="label1P">${idioma._trans130}</p>
                            <h5 class="bold-public">${item.precio_local_user_mask} ${item.moneda_local}</h5>
                            <p class="label2P">${idioma._trans865}: <span class="tipo-subasta ${item.tipo_descripcion}">${item.tipo_descripcion} <img loading="lazy" alt="logo-medalla - nasbi.com"src="../imagen/medalla.png"></span></p>
                            <p class="label2P">${idioma._trans402} ${item.inscritos}/${item.apostadores}</p>
                        </div>
                    </div>
                </div>`;
            $("#carrousel_mis_subastas").owlCarousel('add', htmlSubastas).owlCarousel('refresh');
        })
        let htmlContentPagination = "";
        let htmlContentItemsPagination = "";
        if (datos.total_paginas > 1) {
            let inicio = ((datos.pagina - 5) > 0 ? (datos.pagina - 5) : 1);
            let fin = ((inicio + 5) < datos.total_paginas ? (inicio + 5) : datos.total_paginas);
            for (let index = inicio; index <= fin; ++index) {

                htmlContentItemsPagination += `<a onclick="cambiarPagSubastas( ${index} )" class="${(index == datos.pagina ? 'active' : '')}">${index}</a>`;
            }
            let btnPrev = "";
            if (datos.pagina - 1 < 1) {
                let pag = (datos.pagina - 1 < 1 ? datos.pagina : datos.pagina - 1);
                btnPrev = `<a onclick="cambiarPagSubastas( ${pag} )" class="AD">&laquo;</a>`;
            }
            let btnNext = "";
            if (datos.pagina + 1 < datos.total_paginas) {
                let pag = (datos.pagina + 1 < datos.total_paginas ? datos.pagina + 1 : datos.pagina);
                btnNext = `<a onclick="cambiarPagSubastas( ${pag} )" class="AD">&raquo;</a>`;
            }
            let htmlPuntosIndexFin = "";
            if (fin < datos.total_paginas) {
                htmlContentItemsPagination += `<a> ... </a>`;

                let pag = datos.total_paginas;
                htmlContentItemsPagination += `<a onclick="cambiarPagSubastas( ${pag} )" class="AD">&raquo;</a>`;
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
        $(".paginacion_subastas").html(htmlContentPagination);
    } else {
        for (var i = 0; i < $('.item').length; i++) {
            $("#carrousel_mis_subastas").trigger('remove.owl.carousel', [i])
                .trigger('refresh.owl.carousel');
        }
        $(".paginacion_subastas").empty()
    }



}
function mostrarInfoMisSubastas(data) {
    let item = misSubastas.filter(f => f.id == data)[0]
    let miestado = estadoSubasta.filter(f => f.id == item.estado)[0].nombre
    let imagenProducto;
    if (item.foto_portada != "") {
        imagenProducto = item.foto_portada;
    } else {
        imagenProducto = imageDefault;
    }

    $(".imagen_mi_subasta").attr('src', imagenProducto)
    $(".estado_mi_subasta").text(miestado)
    $(".nombre_mi_subasta").text(item.titulo)
    $(".precio_mi_subasta").text(item.precio_local_user_mask + " " + item.moneda_local)
    $(".tipo_mi_subasta").text(item.tipo_descripcion)
    $(".tipo_subasta_modal").addClass(item.tipo_descripcion)
    $(".estado_mi_subasta").addClass("estado" + item.estado)
    $(".participantes_mi_subasta").text(item.inscritos + "/" + item.apostadores)
    $("#modal-info-public").modal("toggle")
    if (item.estado == 4) {
        $(".btn__compartir_mi_subasta").addClass("d-none")
    } else {
        $(".btn__compartir_mi_subasta").removeClass("d-none")
        $(".btn__compartir_mi_subasta").off()
        $(".btn__compartir_mi_subasta").on('click', { data }, compartirSubasta)
    }

    $("#modal-info-public").on('hide.bs.modal', function () {
        $(".tipo_subasta_modal").removeClass(item.tipo_descripcion)
        $(".estado_mi_subasta").removeClass("estado" + item.estado)
    })
}
function compartirSubasta(ev) {
    let id = ev.data.data;
    $("#modal-info-public").modal("hide")
    $("#modal-compartir-subasta").modal("toggle")
    $(".compartir_mi_subasta_wsp").off()
    $(".compartir_mi_subasta_wsp").on('click', { id: id }, compartirMiSubastaWsp)
    $(".compartir_mi_subasta_fb").off()
    $(".compartir_mi_subasta_fb").on('click', { id: id }, compartirMiSubastaFb)
    $(".compartir_mi_subasta_link").off()
    $(".compartir_mi_subasta_link").on('click', { id: id }, compartirMiSubastaLink)

}

async function compartirMiSubastaWsp(ev) {
    let id_miPubli = ev.data.id;
    let url_publi_texto = url_temp + "nasbi-descuentos.php" + "?sub=" + id_miPubli + "&lang=" + miuser_lang + "&iso_code=" + paisOrigen.iso_code_2 + "&country=" + paisOrigen.country_id + "&uid_user=" + miuser_uid + "&empresa_user=" + miuser_empresa;
    let texto = url_publi_texto;
    texto = await convertParams_facebook(texto);
    let url = "https://api.whatsapp.com/send?text=" + texto.split(" ").join("%20");
    return window.open(url, '_blank');

}
async function compartirMiSubastaFb(ev) {
    let id_miPubli = ev.data.id;
    let url_publi_texto = url_temp + "nasbi-descuentos.php" + "?lang=" + miuser_lang + "&sub=" + id_miPubli + "&iso_code=" + paisOrigen.iso_code_2 + "&country=" + paisOrigen.country_id + "&uid_user=" + miuser_uid + "&empresa_user=" + miuser_empresa;
    url_publi_texto = await convertParams_facebook(url_publi_texto);
    let url_fab = "http://www.facebook.com/share.php?u=" + url_publi_texto;
    return window.open(url_fab, '_blank');

}
function compartirMiSubastaLink(ev) {
    let id_miPubli = ev.data.id;
    let url_publi_texto = url_temp + "nasbi-descuentos.php" + "?sub=" + id_miPubli + "&lang=" + miuser_lang + "&iso_code=" + paisOrigen.iso_code_2 + "&country=" + paisOrigen.country_id + "&uid_user=" + miuser_uid + "&empresa_user=" + miuser_empresa;
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(url_publi_texto);
        return;
    }
    navigator.clipboard.writeText(url_publi_texto).then(function () {

        Toast('success', idioma.trans_207);

    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });

}
// NO SE UTILIZA
// function getProductosRevision(pag = 1) {
//     $(".content__loadingSpinner_publicaciones").show();
//     let dataRev_url = baseurl + "/controllers/publicacion/?productos_espera_validacion";
//     let dataRev = {
//         data: {
//             "id_usuario": user.uid,
//             'empresa':user.empresa,
//             "pag": pag
//         }
//     }
//     $.ajax({
//         type: "POST",
//         url: dataRev_url,
//         data: JSON.stringify(dataRev),
//         dataType: "json",
//         contentType: 'application/json',
//         "headers": { 'x-api-key': user.token },
//         success: async results => {
//             $(".content__loadingSpinner_publicaciones").hide()
//             $(".products__listp__nodata2").hide("fast")
//             if (results.status == "success") {
//                 // listarMisPublicaciones(results);
//                 listarMisPublicacionesRevision(results);
//             } else {
//                 let validate_token = await erroresTokenEmpresa(results);
//                 if (!validate_token) {
//                     $(".paginacion_publicaciones").empty();
//                     $(".mis_publicaciones__tabla").empty();
//                     $(".products__listp__nodata2").show("slow");
//                 }

//             }
//         },
//         error: error => {
//             $(".paginacion_publicaciones").empty();
//             $(".content__loadingSpinner_publicaciones").hide();
//             confirmarProceso(idioma['_trans06'], idioma['_trans500']);
//         }
//     });
// }

function getMisPublicaciones(pag = 1) {
    $(".content__loadingSpinner_publicaciones").show()
    var expo = $(".filtro_exposicion option:selected").val()
    var estadoselect = $(".filtro_estado option:selected").val()
    var tipoPublicacion = $(".filtro_tipo_publicacion option:selected").val()
    let dataPubli = {
        "uid": user.uid,
        "empresa": user.empresa,
        "pagina": pag,
        "tipoPublicacion": tipoPublicacion
    }
    if (expo != "all") {
        dataPubli['exposicion'] = expo;
    }
    if (estadoselect != "all") {
        dataPubli['estado'] = estadoselect;
    }
    let data_url = baseurl + "/controllers/publicacion/?mis_publicaciones";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataPubli }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $(".content__loadingSpinner_publicaciones").hide()
            $(".products__listp__nodata2").hide("fast")
            if (success["status"] == "success") {
                misPublicaciones = success['data']
                listarMisPublicaciones(success);

            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) {
                    $(".paginacion_publicaciones").empty()
                    $(".mis_publicaciones__tabla").empty();
                    $(".products__listp__nodata2").show("slow")
                }


            }
        }, error: error => {
            $(".paginacion_publicaciones").empty()
            $(".content__loadingSpinner_publicaciones").hide()
            confirmarProceso(idioma['_trans06'], idioma['_trans500'])
        }
    });

}

function abrirModalMotivoRechazo(motivo) {
    $(".motivo_rechazo").html("");
    $(".motivo_rechazo").append(`
        <p>${motivo}</p>
    `);
    $("#modal-motivo-rechazo").modal("show");
}

function listarMisPublicaciones(datos) {
    let htmlPubli = ""
    let imagenProducto;
    let precio;
    let option = "";
    let option2 = "";
    let optionModificar = "";
    let optionMotivoRechazo = "";
    let expo;
    let estado;
    let addItem = 0;


    $(".mis_publicaciones__tabla").empty();
    $(".paginacion_publicaciones").empty()
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
            let optionCompartir = ` <div class="cont-btn button-compartir${item.id}" -metdo>
                                          <button class="button-modificar" onclick="compartirMiPublicacion(${item.id})">${idioma._trans401}</button>
                                     </div>`
            if (item.subasta_terminada) optionCompartir = ""

            optionMotivoRechazo = "";

            expo = exposicionProducto.filter(n => n.id == item.exposicion)[0].nombre
            estado = estados.filter(e => e.id == item.estado)[0].nombre
            if (item.estado == 2) {

                option = `<a class="dropdown-item activar_publicacion" onclick="confirmarActivar(${item.id})">${idioma._trans398}</a>`;
                if (!item.inscritos) {
                    option2 = `<a class="dropdown-item eliminar_mi_publicacion"  onclick="confirmarEliminar(${item.id})">${idioma._trans384}</a>`;
                    optionModificar = `<a class="dropdown-item" onclick="loadPage('modificar-publicacion.php?pro=${item.id}')">${idioma._trans76}</a>`
                    addItem++;
                }
                else if (+item.inscritos == 0) {
                    option2 = `<a class="dropdown-item eliminar_mi_publicacion"  onclick="confirmarEliminar(${item.id})">${idioma._trans384}</a>`;
                    optionModificar = `<a class="dropdown-item" onclick="loadPage('modificar-publicacion.php?pro=${item.id}')">${idioma._trans76}</a>`
                    addItem++;
                }
                else {
                    option2 = ``;
                    optionModificar = `<a class="dropdown-item" onclick="loadPage('modificar-publicacion.php?pro=${item.id}')">${idioma._trans76}</a>`
                }

            } else if (item.estado == 1) {
                if (!item.inscritos) {
                    option2 = `<a class="dropdown-item eliminar_mi_publicacion"  onclick="confirmarEliminar(${item.id})">${idioma._trans384}</a>`;
                    option = `<a class="dropdown-item pausar_mi_publicacion" onclick="confirmarPausar(${item.id})">${idioma._trans386}</a>`
                    optionModificar = `<a class="dropdown-item" onclick="loadPage('modificar-publicacion.php?pro=${item.id}')"">${idioma._trans76}</a>`
                    addItem++;
                }
                else if (+item.inscritos == 0) {
                    option2 = `<a class="dropdown-item eliminar_mi_publicacion" onclick="confirmarEliminar(${item.id})">${idioma._trans384}</a>`;
                    option = `<a class="dropdown-item pausar_mi_publicacion" onclick="confirmarPausar(${item.id})">${idioma._trans386}</a>`
                    optionModificar = `<a class="dropdown-item" onclick="loadPage('modificar-publicacion.php?pro=${item.id}')">${idioma._trans76}</a>`
                    addItem++;
                }
                else {
                    option2 = ``;
                    option = ``;
                    optionModificar = `<a class="dropdown-item" onclick="loadPage('modificar-publicacion.php?pro=${item.id}')">${idioma._trans76}</a>`
                }

                // } else if (item.estado == 3) {
                //     option2 = "";
                //     option = "";
                //     optionModificar = "";
                //     optionCompartir = ""

            } else if (item.estado == 5) {
                let motivo = 'Su publicacion se rechazo por...';
                if (item.motivo) motivo = item.motivo;
                optionMotivoRechazo = '<a class="dropdown-item motivo_rechazo_ver" onclick="abrirModalMotivoRechazo(\'' + motivo + '\')">' + idioma.trans299 + '</a>'
                option2 = "";
                option = "";
                optionModificar = "";
                optionCompartir = "";
            }

            let label_cantidades_vendidas = "";
            if (item.tipoSubasta * 1 == 0 && item.cantidad_vendidas * 1 > 0) {
                label_cantidades_vendidas = `${item.cantidad_vendidas} / ${item.cantidad}`;
            } else {
                label_cantidades_vendidas = item.cantidad;
            }
            console.log(item)

            // let lasOpciones = "";
            // if(item.estado == 3){
            //     lasOpciones = `
            //         <a class="dropdown-item" href="modificar-publicacion.php?pro=${item.id}">${idioma._trans76}</a>
            //         ${option} 
            //         ${option2}
            //     `;
            // }else{
            //     lasOpciones = "";
            // }

            htmlPubli = `
            <tr>
                <td class="td1">
                    <div class="flex-name">
                        <div class="containe-fto">
                            <img loading="lazy" alt="img${i}-producto - nasbi.com" src="${imagenProducto}" class="img-articulo">
                        </div>
                        <p class="txt-numb">#${item.id}</p>
                        <p class="name-product" data-toggle="tooltip" data-placement="top" title= "${item.titulo}">${item.titulo}</p>
                        <p class="visits"  data-toggle="tooltip" data-placement="bottom" title="${item.visitas} ${idioma._trans399} ${item.cantidad_vendidas} ${idioma._trans400}">${item.visitas} ${idioma._trans399} ${item.cantidad_vendidas} ${idioma._trans400}</p>
                    </div>
                </td>
                <td class="td2"> <p>${precio} ${item.moneda_local}</p></td>
                <td class="td3"><p>${label_cantidades_vendidas}</p></td>
                <td class="td4"><p>${estado}</p></td>
                <td class="td5"><p>${expo}</p></td>
                <td class="td6">
                    <div class="dropdown divdropdownfiltro dropdown_opciones${item.id}">
                        <button class="drop-filtro drop-table dropdown-toggle" type="button" id="opciones" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${idioma._trans332}</button>
                        <div class="dropdown-menu" aria-labelledby="opciones">
                            ${optionModificar}
                            ${option}    
                            ${option2}
                            ${optionMotivoRechazo}
                        </div>
                    </div>
                </td>
                <td class="td7">
                    ${optionCompartir}
                </td>
            </tr>`

            $(".mis_publicaciones__tabla").append(htmlPubli)
            $(".dropdown_opciones" + item.id).css('display', '')
            $(".button-compartir" + item.id).css("display", "")
            if (item.estado == 0 || item.estado == 3) {
                $(".dropdown_opciones" + item.id).css('display', 'none')
                $(".button-compartir" + item.id).css('display', 'none')
            }

            // $(".activar_publicacion").eq(i).off();
            // $(".activar_publicacion").eq(i).on('click', { id: item.id }, confirmarActivar);


            // $(".pausar_mi_publicacion").eq(i).off();
            // $(".pausar_mi_publicacion").eq(i).on('click', { id: item.id }, confirmarPausar);

            // $(".compartir_mi_publicacion").eq(i).off();
            // $(".compartir_mi_publicacion").eq(i).on('click', { item }, compartirMiPublicacion);

            // $(".eliminar_mi_publicacion").eq(addItem - 1 <= 0 ? 0 : addItem - 1).off();
            // $(".eliminar_mi_publicacion").eq(addItem - 1 <= 0 ? 0 : addItem - 1).on('click', { id: datos.data[addItem - 1 <= 0 ? 0 : addItem - 1].id }, confirmarEliminar);

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

                htmlContentItemsPagination += `<a onclick="cambiarPagPublicacion( ${index} )" class="${(index == datos.pagina ? 'active' : '')}">${index}</a>`;
            }
            let btnPrev = "";
            if (datos.pagina - 1 > 1) {
                let pag = datos.pagina - 1;
                btnPrev = `<a onclick="cambiarPagPublicacion( ${pag} )" class="AD">&laquo;</a>`;
            }
            let btnNext = "";
            if (datos.pagina + 1 < datos.total_paginas) {
                let pag = datos.pagina + 1;
                btnNext = `<a onclick="cambiarPagPublicacion( ${pag} )" class="AD">&raquo;</a>`;
            }
            let htmlPuntosIndexFin = "";
            if (fin < datos.total_paginas) {
                htmlContentItemsPagination += `<a> ... </a>`;

                let pag = datos.total_paginas;
                htmlContentItemsPagination += `<a onclick="cambiarPagPublicacion( ${datos.total_paginas} )" class="AD">${datos.total_paginas}</a>`;
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


        $(".paginacion_publicaciones").html(htmlContentPagination);
    } else {
        $(".products__listp__nodata2").show("slow")
        $(".paginacion_publicaciones").hide()
    }

}
// NO SE UTILIZA
// function listarMisPublicacionesRevision(datos) {
//     let htmlPubli = ""
//     let imagenProducto;
//     let precio;
//     let option = "";
//     let option2 = "";
//     let optionModificar = "";
//     let expo;
//     let estado;
//     let addItem = 0;
//     $(".mis_publicaciones__tabla").empty();
//     $(".paginacion_publicaciones").empty()
//     if (datos.data.length > 0) {
//         $.each(datos.data, (i, item) => {

//             if (item.foto_portada != "") {
//                 imagenProducto = item.foto_portada;
//             } else {
//                 imagenProducto = imageDefault;
//             }
//             if (item.oferta == 1) {
//                 precio = item.precio_descuento_local_mask
//             } else {
//                 precio = item.precio_local_mask
//             }

//             expo = exposicionProducto.filter(n => n.id == item.exposicion)[0].nombre
//             estado = estados.filter(e => e.id == item.estado)[0].nombre
//             if (item.estado == 2) {

//                 option = `<a class="dropdown-item activar_publicacion" onclick="confirmarActivar(${item.id})">${idioma._trans398}</a>`;
//                 if (!item.inscritos) {
//                     option2 = `<a class="dropdown-item eliminar_mi_publicacion"  onclick="confirmarEliminar(${item.id})">${idioma._trans384}</a>`;
//                     optionModificar = `<a class="dropdown-item" href="modificar-publicacion.php?pro=${item.id}">${idioma._trans76}</a>`
//                     addItem++;
//                 }
//                 else if (+item.inscritos == 0) {
//                     option2 = `<a class="dropdown-item eliminar_mi_publicacion"  onclick="confirmarEliminar(${item.id})">${idioma._trans384}</a>`;
//                     optionModificar = `<a class="dropdown-item" href="modificar-publicacion.php?pro=${item.id}">${idioma._trans76}</a>`
//                     addItem++;
//                 }
//                 else {
//                     option2 = ``;
//                     optionModificar = `<a class="dropdown-item" href="modificar-publicacion.php?pro=${item.id}">${idioma._trans76}</a>`
//                 }

//             } else if (item.estado == 1) {
//                 if (!item.inscritos) {
//                     option2 = `<a class="dropdown-item eliminar_mi_publicacion"  onclick="confirmarEliminar(${item.id})">${idioma._trans384}</a>`;
//                     option = `<a class="dropdown-item pausar_mi_publicacion" onclick="confirmarPausar(${item.id})">${idioma._trans386}</a>`
//                     optionModificar = `<a class="dropdown-item" href="modificar-publicacion.php?pro=${item.id}">${idioma._trans76}</a>`
//                     addItem++;
//                 }
//                 else if (+item.inscritos == 0) {
//                     option2 = `<a class="dropdown-item eliminar_mi_publicacion" onclick="confirmarEliminar(${item.id})">${idioma._trans384}</a>`;
//                     option = `<a class="dropdown-item pausar_mi_publicacion" onclick="confirmarPausar(${item.id})">${idioma._trans386}</a>`
//                     optionModificar = `<a class="dropdown-item" href="modificar-publicacion.php?pro=${item.id}">${idioma._trans76}</a>`
//                     addItem++;
//                 }
//                 else {
//                     option2 = ``;
//                     option = ``;
//                     optionModificar = `<a class="dropdown-item" href="modificar-publicacion.php?pro=${item.id}">${idioma._trans76}</a>`
//                 }

//             } else if (item.estado == 3 || item.estado == 5) {
//                 option2 = "";
//                 option = "";
//                 optionModificar = "";
//             }

//             let label_cantidades_vendidas = "";
//             if (item.tipoSubasta * 1 == 0 && item.cantidad_vendidas * 1 > 0) {
//                 label_cantidades_vendidas = `${item.cantidad_vendidas} / ${item.cantidad}`;
//             } else {
//                 label_cantidades_vendidas = item.cantidad;
//             }
//             console.log(item)

//             htmlPubli = `
//             <tr>
//                 <td class="td1">
//                     <div class="flex-name">
//                         <div class="containe-fto">
//                             <img loading="lazy" alt="img${i}-producto - nasbi.com" src="${imagenProducto}" class="img-articulo">
//                         </div>
//                         <p class="txt-numb">#${item.id}</p>
//                         <p class="name-product" data-toggle="tooltip" data-placement="top" title= "${item.titulo}">${item.titulo}</p>
//                         <p class="visits"  data-toggle="tooltip" data-placement="bottom" title="${item.visitas} ${idioma._trans399} ${item.cantidad_vendidas} ${idioma._trans400}">${item.visitas} ${idioma._trans399} ${item.cantidad_vendidas} ${idioma._trans400}</p>
//                     </div>
//                 </td>
//                 <td class="td2"> <p>${precio} ${item.moneda_local}</p></td>
//                 <td class="td3"><p>${label_cantidades_vendidas}</p></td>
//                 <td class="td4"><p>${estado}</p></td>
//                 <td class="td5"><p>${expo}</p></td>
//                 <td class="td6">
//                     <div class="dropdown divdropdownfiltro dropdown_opciones${item.id}">
//                         <button class="drop-filtro drop-table dropdown-toggle" type="button" id="opciones" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${idioma._trans332}</button>
//                         <div class="dropdown-menu" aria-labelledby="opciones">
//                             ${optionModificar}
//                             ${option} 
//                             ${option2}
//                         </div>
//                     </div>
//                 </td>
//                 <td class="td7">
//                     <div class="cont-btn" -metdo>
//                         <button class="button-modificar compartir_mi_publicacion">${idioma._trans401}</button>
//                     </div>
//                 </td>
//             </tr>`

//             $(".mis_publicaciones__tabla").append(htmlPubli)
//             $(".dropdown_opciones" + item.id).css('display', '')
//             if (item.estado == 0) {
//                 $(".dropdown_opciones" + item.id).css('display', 'none')
//             }

//             // $(".activar_publicacion").eq(i).off();
//             // $(".activar_publicacion").eq(i).on('click', { id: item.id }, confirmarActivar);


//             // $(".pausar_mi_publicacion").eq(i).off();
//             // $(".pausar_mi_publicacion").eq(i).on('click', { id: item.id }, confirmarPausar);


//             $(".compartir_mi_publicacion").eq(i).off();
//             $(".compartir_mi_publicacion").eq(i).on('click', { item }, compartirMiPublicacion);


//             // $(".eliminar_mi_publicacion").eq(addItem - 1 <= 0 ? 0 : addItem - 1).off();
//             // $(".eliminar_mi_publicacion").eq(addItem - 1 <= 0 ? 0 : addItem - 1).on('click', { id: datos.data[addItem - 1 <= 0 ? 0 : addItem - 1].id }, confirmarEliminar);

//         })
//         let htmlContentPagination = "";
//         let htmlContentItemsPagination = "";
//         if (datos.total_paginas > 1) {
//             let inicio = ((datos.pagina - 2) > 0 ? (datos.pagina - 2) : 1);
//             let fin = ((inicio + 4) < datos.total_paginas ? (inicio + 4) : datos.total_paginas);
//             if (fin == datos.total_paginas) {
//                 inicio = ((datos.pagina - 4) > 0 ? (datos.pagina - 4) : 1);
//             }
//             for (let index = inicio; index <= fin; ++index) {

//                 htmlContentItemsPagination += `<a onclick="cambiarPagRevion( ${index} )" class="${(index == datos.pagina ? 'active' : '')}">${index}</a>`;
//             }
//             let btnPrev = "";
//             if (datos.pagina - 1 > 1) {
//                 let pag = datos.pagina - 1;
//                 btnPrev = `<a onclick="cambiarPagRevion( ${pag} )" class="AD">&laquo;</a>`;
//             }
//             let btnNext = "";
//             if (datos.pagina + 1 < datos.total_paginas) {
//                 let pag = datos.pagina + 1;
//                 btnNext = `<a onclick="cambiarPagRevion( ${pag} )" class="AD">&raquo;</a>`;
//             }
//             let htmlPuntosIndexFin = "";
//             if (fin < datos.total_paginas) {
//                 htmlContentItemsPagination += `<a> ... </a>`;

//                 let pag = datos.total_paginas;
//                 htmlContentItemsPagination += `<a onclick="cambiarPagRevion( ${datos.total_paginas} )" class="AD">${datos.total_paginas}</a>`;
//             }
//             htmlContentPagination +=
//                 `<div class="col-12">
//                 <div class="pagination pagination_list">
//                     `+ btnPrev + `
//                     `+ htmlContentItemsPagination + `
//                     `+ btnNext + `
//                 </div>
//             </div>`;
//         } else {
//         }


//         $(".paginacion_publicaciones").html(htmlContentPagination);
//     } else {
//         $(".products__listp__nodata2").show("slow")
//         $(".paginacion_publicaciones").hide()
//     }

// }

function confirmarActivar(ev) {
    let id = ev
    $("#modal-publicar-nuevo").modal("show")
    $(".btn__modificar_mi_publicacion").off()
    $(".btn__modificar_mi_publicacion").on('click', { id: id }, modificarMiPublicacion)
    $(".btn__publicar_mi_publicacion").off()
    $(".btn__publicar_mi_publicacion").on('click', { id: id }, activarMiPublicacion)

}
function modificarMiPublicacion(ev) {
    $(location).attr('href', 'modificar-publicacion.php?pro=' + ev.data.id)

}
function activarMiPublicacion(ev) {
    $(".spiner_activar_publicacion").show()
    $(".btn__publicar_mi_publicacion").attr("disabled", true)

    let dataPublicar = {
        uid: user.uid,
        empresa: user.empresa,
        id: ev.data.id
    }

    let data_url = baseurl + "/controllers/publicacion/?activar_publicacion";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataPublicar }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $(".spiner_activar_publicacion").hide()
            $(".btn__publicar_mi_publicacion").attr("disabled", false)
            if (success["status"] == "success") {
                $("#modal-publicar-nuevo").modal("hide")
                confirmarProceso(idioma['_trans409'], idioma['_trans410'])
                getMisPublicaciones();

            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) {
                    confirmarProceso(idioma['_trans06'], idioma['_trans411'])
                }

            }
        }, error: error => {
            $(".spiner_activar_publicacion").hide()
            $(".btn__publicar_mi_publicacion").attr("disabled", false)
            confirmarProceso(idioma['_trans06'], idioma['_trans501'])
        }
    });
}
function confirmarEliminar(ev) {
    console.log("entra modal", ev);
    let id = ev
    $("#modal-eliminar-publicacion").modal("show")
    $(".btn__eliminar_mi_publicacion").off()
    $(".btn__eliminar_mi_publicacion").on('click', { id: id }, eliminarMiPublicacion)
}
function eliminarMiPublicacion(ev) {
    $(".spiner_eliminar_publicacion").show()
    $(".btn__eliminar_mi_publicacion").attr("disabled", true)

    let dataElim = {
        uid: user.uid,
        empresa: user.empresa,
        id: ev.data.id
    }

    let data_url = baseurl + "/controllers/publicacion/?eliminar_publicacion";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataElim }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $(".spiner_eliminar_publicacion").hide()
            $(".btn__eliminar_mi_publicacion").attr("disabled", false)
            if (success["status"] == "success") {
                $("#modal-eliminar-publicacion").modal("hide")
                confirmarProceso(idioma['_trans406'], idioma['_trans407'])
                getMisPublicaciones();
                getMisSubastas();

            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) {
                    confirmarProceso(idioma['_trans06'], idioma['_trans502'])
                }

            }
        }, error: error => {
            $(".spiner_eliminar_publicacion").hide()
            $(".btn__eliminar_mi_publicacion").attr("disabled", false)
            confirmarProceso(idioma['_trans06'], idioma['_trans503'])
        }
    });

}
function confirmarPausar(ev) {
    let id = ev;
    $("#modal-pausar-publicacion").modal("show")
    $(".btn__pausar_mi_publicacion").off()
    $(".btn__pausar_mi_publicacion").on('click', { id: id }, pausarMiPublicacion)

}
function pausarMiPublicacion(ev) {
    $(".spiner_pausar_publicacion").show()
    $(".btn__pausar_mi_publicacion").attr("disabled", true)

    let dataPausar = {
        "id": ev.data.id,
        "uid": user.uid,
        "empresa": user.empresa
    }
    let data_url = baseurl + "/controllers/publicacion/?pausar_publicacion";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataPausar }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $(".spiner_pausar_publicacion").hide()
            $(".btn__pausar_mi_publicacion").attr("disabled", false)
            if (success["status"] == "success") {
                $("#modal-pausar-publicacion").modal("hide")
                confirmarProceso(idioma._trans404, idioma['_trans405'])
                getMisPublicaciones();
            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) confirmarProceso(idioma['_trans06'], idioma['_trans505'])

            }
        }, error: error => {
            $(".spiner_pausar_publicacion").hide()
            $(".btn__pausar_mi_publicacion").attr("disabled", false)
            confirmarProceso(idioma['_trans06'], idioma['_trans504'])
        }
    });
}
function compartirMiPublicacion(id) {
    // let revision = $(".filtro_estado option:selected").val();
    let item = misPublicaciones.filter(f => f.id == id)[0]
    if (item.estado == 3) {
        $('.info-review').html("");
        $('.info-review').append(`
        <img loading="lazy" src="../imagen/compartir-subasta.png" class="img-modal">
        <h4 class="_trans388">Comparte tu publicación</h4>
        <p>${idioma.trans293}</p>
        `);
        $("#modal-compartir-publicacion-no-revisada").modal("show");
        // $(".compartir_mi_publicacion_wsp").off()
        // $(".compartir_mi_publicacion_wsp").on('click', { id: id }, compartirMiPubliWsp)
        // $(".compartir_mi_publicacion_fb").off()
        // $(".compartir_mi_publicacion_fb").on('click', { id: id }, compartirMiPubliFb)
        // $(".compartir_mi_publicacion_link").off()
        // $(".compartir_mi_publicacion_link").on('click', { id: id }, compartirMiPubliLink)
    } else if (item.estado == 5) {
        $('.info-review').html("");
        $('.info-review').append(`
        <img loading="lazy" src="../imagen/compartir-subasta.png" class="img-modal">
        <h4 class="_trans388">Comparte tu publicación</h4>
        <p>${idioma.trans298}</p>
        `);
        $("#modal-compartir-publicacion-no-revisada").modal("show");
    } else {
        let publi = item
        let id = publi.id
        console.log(publi)
        $("#modal-compartir-publicacion").modal("show");
        $(".compartir_mi_publicacion_wsp").off()
        $(".compartir_mi_publicacion_wsp").on('click', { id: id }, compartirMiPubliWsp)
        $(".compartir_mi_publicacion_fb").off()
        $(".compartir_mi_publicacion_fb").on('click', { id: id }, compartirMiPubliFb)
        $(".compartir_mi_publicacion_link").off()
        $(".compartir_mi_publicacion_link").on('click', { id: id }, compartirMiPubliLink)
    }
}

async function compartirMiPubliWsp(ev) {
    let id_miPubli = ev.data.id;
    let url_publi_texto = url_temp + "producto.php" + "?uid=" + id_miPubli + "&lang=" + miuser_lang + "&iso_code=CO&country=57" + "&uid_user=" + miuser_uid + "&empresa_user=" + miuser_empresa;
    let texto = url_publi_texto;
    texto = await convertParams_facebook(texto);
    let url = "https://api.whatsapp.com/send?text=" + texto.split(" ").join("%20");

    return window.open(url, '_blank');

}
async function compartirMiPubliFb(ev) {
    let id_miPubli = ev.data.id;
    let url_publi_texto = url_temp + "producto.php" + "?uid=" + id_miPubli + "&lang=" + miuser_lang + "&iso_code=CO&country=57" + "&uid_user=" + miuser_uid + "&empresa_user=" + miuser_empresa;
    url_publi_texto = await convertParams_facebook(url_publi_texto);
    let url_fab = "http://www.facebook.com/share.php?u=" + url_publi_texto;
    return window.open(url_fab, '_blank');

}
function compartirMiPubliLink(ev) {
    let id_miPubli = ev.data.id;
    let url_publi_texto = url_temp + "producto.php" + "?uid=" + id_miPubli + "&lang=" + miuser_lang + "&iso_code=CO&country=57" + "&uid_user=" + miuser_uid + "&empresa_user=" + miuser_empresa;
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(url_publi_texto);
        Toast('success', idioma.trans_207);
        return;
    }
    navigator.clipboard.writeText(url_publi_texto).then(function () {
        Toast('success', idioma.trans_207);
        /* $('.texto_copiado').show('flash');
        setTimeout(() => {
            $('.texto_copiado').hide('flash');
        }, 900); */
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
        NativeFunction.copyToClipboard(url_publi_texto);
        Toast('success', idioma.trans_207);
    });

}
function confirmarProceso(titulo, texto) {
    $(".titulo_modal_confirmacion").text(titulo);
    $(".info_modal_confirmacion").text(texto);
    $("#modal-confirmar-proceso").modal("toggle");
}

function cambiarPagSubastas(pag) {
    getMisSubastas(pag)

}
function cambiarPagPublicacion(pag) {
    getMisPublicaciones(pag)

}
// NO SE UTILIZA
// function cambiarPagRevion(pag) {
//     getProductosRevision(pag);
// }


