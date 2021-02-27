$(document).ready(($event) => {
    getSubastasAnt();
    getSubastasProx();
    $(".tooltip-porc").tooltip()


    $('.subasta__nasbi__sinsaldo__btn').on('click', ($event) => {
        loadPage("e-wallet.php")
    });
});
function cargarPrimero() {
    let paramsBanner = {
        "data": {
            "idioma": localLenguaje,
            "iso_code_2": paisOrigen.iso_code_2,
            "iso_code_2_money": iso_code_2_money,
            "tipo": 3
        }
    };
    let bannerID = '#carousel-banner-subastas';
    getBanner(bannerID, paramsBanner);
}
function modalInfoProduct(producto) {
    let estado = "";
    let Htmlestado;
    let htmlfotos;
    let htmlinfo;
    let imagenProducto = "";

    if (producto.foto_portada != "") {
        imagenProducto = producto.foto_portada;
    } else {
        imagenProducto = imageDefault;
    }
    $('.col7none').empty()
    $('.carousel-info-subastas').empty()
    $('.modal-info').empty()


    if (producto.estado == 1) {
        estado = "Activa"
        htmlinfo =
            `<h4 class="nombre-producto-modal">${producto.titulo}</h4>
        <p class="label-modal">Valor real</p>
        <h4 class="price-product-modal">${producto.precio_local_user_mask} ${producto.moneda_local_user}</h4>
        <h4 class="label02">Tipo de subasta: <span class="tipo-subasta ${producto.tipo_descripcion}">${producto.tipo_descripcion} <img src="../imagen/medalla.png"></span></h4>
        <h4 class="label02">Participantes: <span class="return">${producto.inscritos}/${producto.apostadores}</span></h4>`
    } else {
        estado = "Finalizada"
        htmlinfo =
            `<h4 class="nombre-producto-modal">${producto.titulo}</h4>
        <p class="label-modal">${idioma._trans130}</p>
        <h4 class="price-product-modal">${producto.precio_local_user_mask} ${producto.moneda_local_user}</h4>
        <p class="label-modal">Hash</p>
        <h4 class="label02">${producto.precio_local_user_mask}</h4>
        <p class="label-modal">${idioma._trans128}</p>
        <h4 class="label02">${producto.usuario_ganador.nombre}</h4>`

    }

    Htmlestado = `<p class="header-modal-label">${idioma._trans129}: <span class="estado${producto.estado}">${estado}</span></p>`
    htmlfotos =
        ` <div class="item">
        <div class="content-foto">
            <img src="${imagenProducto}" class="img-carousel">
        </div>
    </div>`

    $('.col7none').html(Htmlestado)
    $('.carousel-info-subastas').html(htmlfotos)
    $('.modal-info').html(htmlinfo)
}
function getSubastasAnt() {
    let dataSubastas = {
        "pais": paisOrigen.country_id,
        "tipo": 1,
        "iso_code_2": paisOrigen.iso_code_2,
        "iso_code_2_money": iso_code_2_money,
        "pagina": 1
    }
    let data_url = baseurl + "/controllers/producto_subastas/?home";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataSubastas },
        dataType: "json",
        success: result => {

            console.log("\n\n\n\n\n\n\n\t ----* result: ", result, " *---- \n\n\n\n\n\n\n");
            if (result["status"] == "success") {
                result["tipo"] = 1

                productos_ant = result['data']
                generateItemsProductsHtml(result);
            } else {
                listProductsView(false);
            }
        }, error: error => {
            console.log(error);
            presentAlert(idioma['trans_04'], idioma['_trans06'], "error")
        }
    });
}
function getSubastasProx(pag = 1) {
    let dataSubastas = {
        "pais": paisOrigen.country_id,
        "tipo": 2,
        "iso_code_2": paisOrigen.iso_code_2,
        "iso_code_2_money": iso_code_2_money,
        "pagina": pag
    };//////////
    let data_url = baseurl + "/controllers/producto_subastas/?home";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataSubastas },
        dataType: "json",
        success: response => {
            if (response["status"] == "success") {
                response["tipo"] = 2

                productos_prox = response['data']
                generateItemsProductsHtml(response);
            } else {
                listProductsViewP(false);
            }
        }, error: error => {
            console.log(error);

            presentAlert(idioma['trans_04'], idioma['_trans06'], "error")


        }
    });
}
function generateItemsProductsHtml(datos) {
    let htmlContentItems = "";
    let htmlContentItem2 = "";

    switch (datos.tipo) {
        case 1:

            for (var i = 0; i < $('.item').length; i++) {
                $("#subastas_anteriores").trigger('remove.owl.carousel', [i])
                    .trigger('refresh.owl.carousel');
            }
            $.each(datos.data, (i, item) => {
                console.log(item)
                let imagenProducto = "";
                if (item.foto_portada != "") {
                    imagenProducto = item.foto_portada;
                } else {
                    imagenProducto = imageDefault;
                }

                htmlContentItems2 =
                    `<div class="item subastas__nasbi__btncomprar">
                        <div class="row row-container-destacado producto" id="${item.id}">
                            <div class="col-12 px-2">
                                <div class="container-destacado">
                                    <img loading="lazy" src="${imagenProducto}" class="imagen-destacados" alt="${item.producto} - nasbi.com">
                                </div>
                                <h4 class="nombre-producto">${item.titulo}</h4>
                                
                                <h4 class="nombre-producto"><span>${idioma.trans479_}</span> <span> ${item.porcentaje}%</span></h4>
                                <p class="descripcion-product">${idioma['trans_95']}</p>
                                <h4 class="price-product">${item.precio_subasta_local_user_mask} ${item.moneda_local_user}</h4>

                                <button class="btn-comprar " id="${item.id}"> ${item.tipo_descripcion} ${idioma['trans_113']}</button>
                            </div>
                        </div>
                    </div>`;


                $('#subastas_anteriores').owlCarousel('add', htmlContentItems2).owlCarousel('refresh');

                $('.subastas__nasbi__btncomprar').eq(i).off('click');
                $('.subastas__nasbi__btncomprar').eq(i).on('click', { item }, managerOpenModalSubastaNasbi);

                // cambios jdbc
            });
            listProductsView(true);

            break;
        case 2:

            let htmlpaginacion = ""
            let htmlContentItemsPagination = "";
            // $('paginacion').empty();

            for (var i = 0; i < $('.item').length; i++) {
                $("#proximas_subastas").trigger('remove.owl.carousel', [i])
                    .trigger('refresh.owl.carousel');
            }

            console.log("Proximas subastas list: ", datos.data);

            $.each(datos.data, (i, item) => {

                let imagenProducto = "";
                if (item.foto_portada != "") {
                    imagenProducto = item.foto_portada;
                } else {
                    imagenProducto = imageDefault;
                }

                htmlContentItems =
                    `<div class="item subastas__nasbi__premium__btncomprar">
                        <div class="row row-container-destacado producto" id="${item.id}">
                            <div class="col-12 px-2">
                                <div class="container-destacado">
                                    <img loading="lazy" src="${imagenProducto}" class="imagen-destacados" alt="${item.producto} - nasbi.com">
                                </div>
                                <h4 class="nombre-producto">${item.titulo}</h4>
                                

                                <p class="descripcion-product">${idioma['trans_95']}</p>
                                <h4 class="price-product">${item.precio_local_user_mask} ${item.moneda_local_user}</h4>

                                <button class="btn-comprar" id="${item.id}"> ${item.tipo_descripcion} ${idioma['trans_113']}</button>
                            </div>
                        </div>
                    </div>`;

                $('#proximas_subastas').owlCarousel('add', htmlContentItems).owlCarousel('refresh');

                $('.subastas__nasbi__premium__btncomprar').eq(i).off('click');
                $('.subastas__nasbi__premium__btncomprar').eq(i).on('click', { item }, managerOpenModalSubastaNasbiPremium);
            });
            listProductsViewP(true);

            break;
    }
}
function inscribirse() {
    if (validarText(user)) {

        getTiquets();
    } else {
        $('.divTickekss').hide();
    }
    let indicadorSubastas = idioma['trans_96'];
    // indicadorSubastas = indicadorSubastas.split("###").join(`#${miProducto.id} ${miProducto.tipo_descripcion}`);
    indicadorSubastas = indicadorSubastas.split("###").join(`#${miProducto.id} ${miProducto.producto}`);
    $('.subastas__inscripcion__id').text(indicadorSubastas);

    $('.cant_tiquets').val(1);

    /*$('.subastas__inscripcion__amounts').text(`${miProducto.precio_local_user_mask} ${miProducto.moneda_local_user} / ${miProducto.precio_mask} ${miProducto.moneda} `);*/
    $('.subastas__inscripcion__amounts').text(`${miProducto.precio_local_user_mask} ${miProducto.moneda_local_user}`);
    //$('.subastas__inscripcion__amounts__coin').prop('src', objectCoin[("" + miProducto.moneda).toLowerCase()].img);

    $('.subastas__inscripcion__coin').prop('src', miProducto.foto_portada);
    $('.subastas__inscripcion__inscritos__inf').text(`${miProducto.inscritos} / ${miProducto.apostadores}`);

    $('.subastas__inscripcion__comprar').off('click');
    $('.subastas__inscripcion__comprar').on('click', { miProducto }, validationSell);

}

function validationSell($event) {
    let params = new URLSearchParams(location.search);
    let user_comp_uid = params.get('uid_user')
    let user_comp_empresa = params.get('empresa_user')
    miProducto = $event.data.miProducto;
    var cant_tiquets = devolverNumero($('.cant_tiquets').val());
    if (!validarNumero(cant_tiquets)) {
        $('#modal-subastas-error-compra').modal('show');
        // } else if (user_comp_uid && user_comp_empresa) {
        //     getComisionCompartirSubasta(miProducto)
    } else {/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        $(".spiner_comprar_entradas").show();
        $(".subastas__inscripcion__comprar").attr("disabled", true)
        comprarTiquets(cant_tiquets);
    }
}
function comprarTiquets(cant) {

    let dataTiquets = {
        uid: user.uid,
        empresa: user.empresa,
        id: miProducto.id,
        cantidad: cant,
        ticket: miProducto.tipo,
        cantidad_ticket: cant
    };
    let data_url = baseurl + "/controllers/producto_subastas/?inscribir_subasta";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataTiquets }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $(".spiner_comprar_entradas").hide();
            $(".subastas__inscripcion__comprar").attr("disabled", false)
            if (success["status"] == "success") {
                loadPage("mis-nasbi-descuentos.php")

            } else if (success["status"] == 'maxInscritos') {
                $('#modal-subastas-error-compra-maxInscritos').modal('show');

            } else if (success["status"] == 'tuSubasta') {
                $('#modal-subastas-error-compra-fail-tuSubasta').modal('show');

            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) {
                    $('#modal-subastas-error-compra-nofound').modal('show');
                }

            }
        }, error: error => {
            console.log(error);
            $(".spiner_comprar_entradas").hide();
            $(".subastas__inscripcion__comprar").attr("disabled", false)
            $('#modal-subastas-error-compra-fail').modal('show');
        }
    });
}

function getTiquets() {
    let dataTiquets = {
        uid: user.uid,
        empresa: user.empresa,
        tipo: "all",
        uso: 2,
        group: 1
    };


    let data_url = baseurl + "/controllers/planes_nasbi/?tickets_usuario";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataTiquets },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async success => {

            console.log(" | ============== | success: ", success);

            $('.cant_tickets').empty();
            let html;
            if (success["status"] == "success") {

                console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n************************");
                console.log("miProducto: ", miProducto);
                console.log("success: ", success);
                console.log("data send: ", { "data": dataTiquets });
                console.log("success['data']: ", success["data"]);
                console.log("************************\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");

                let label__mis__tickets = `0 Tickets ${miProducto.tipo_descripcion}`;
                $.each(success["data"], (i, item) => {
                    if (item.plan == miProducto.tipo) {
                        html = `<p>Tienes ${item.cantidad} tickets ${item.nombre_plan} disponibles</p>`

                        // label__mis__tickets = `${formatNumberInt(item.cantidad)} Tickets ${miProducto.tipo_descripcion}`;
                        label__mis__tickets = `${formatNumberInt(item.cantidad)} Tickets ${item.nombre_plan}`;
                        return;
                    }
                });
                $('.label__mis__tickets').text(label__mis__tickets);
                $('.divTickekss').show('slow');

                $('.cant_tickets').html(html);
                $('.btn_recargar_tiquets').hide("fast")
            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) {
                    html = `<span><p>No posees ningun ticket ${miProducto.tipo_descripcion}. Recarga tickets para entrar a la subasta</p></span>`
                    $('.cant_tickets').html(html);
                    $('.input_tiquets').hide("fast")
                    $('.btn_recargar_tiquets').show("fast")
                }


            }

        }, error: error => {
            console.log(error);
            presentAlert(idioma['trans_04'], idioma['_trans06'], "error")
        }
    });

}
// function getComisionCompartirSubasta(producto) {
//     console.log(producto)
//     let user_comp_uid = params.get('uid_user')
//     let user_comp_empresa = params.get('empresa_user')
//     let dataPubli = {
//         uid_comp: user.uid,
//         emresa_comp: user.empresa,
//         // id_producto: schemaProducto.id,
//         // tipo_subasta: schemaProducto.tipoSubasta,
//         // uid_vendedor: schemaDatosVendedor.direccion.uid,
//         // empresa_vendedor: schemaDatosVendedor.direccion.empresa,
//         uid_user_refer: user_comp_uid,
//         empresa_user_comp: user_comp_empresa
//     }
//     $.ajax({
//         type: 'POST',
//         // url: data_url,
//         data: { "data": dataPubli },
//         dataType: 'json',
//     }).done((res) => {

//         if (res.status == 'success') {
//         } else {
//         }

//     }).fail((err) => {
//     });

// }
function listProductsView(isVisible = false) {
    if (isVisible) {
        $('.products__list').show("slow");
        $('.products__list__nodata').hide("fast");
    } else {
        $('.products__list').hide("fast");
        $('.products__list__nodata').show("slow");
    }
}
function listProductsViewP(isVisible = false) {
    if (isVisible) {
        $('.products__listp').show("slow");
        $('.products__listp__nodata').hide("fast");
    } else {
        $('.products__listp').hide("fast");
        $('.products__listp__nodata').show("slow");
    }
}