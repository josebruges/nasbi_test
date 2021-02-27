let params = new URLSearchParams(location.search);
let datos = {
    id: (params.get('uid') == undefined ? "" : params.get('uid')),
    iso_code_2: "US",
    iso_code_2_money: iso_code_2_money,
    uid: null,
    empresa: null
};
let miuser_uid = validarText(user) ? user.uid : null;
let miuser_empresa = validarText(user) ? user.empresa : null;
let miuser_lang = validarText(user) && validarText(user.idioma) ? user.idioma.toUpperCase() : "ES";
if (paisOrigen != undefined && paisOrigen != null && paisOrigen != "") {
    datos.iso_code_2 = paisOrigen.iso_code_2;
    datos.iso_code_2_money = iso_code_2_money;
}
var categorias_vendedor = [
    { id: 1, nombre: "Bronze", texto: idioma['_trans850'] },
    { id: 2, nombre: "Silver", texto: idioma['_trans851'] },
    { id: 3, nombre: "Gold", texto: idioma['_trans852'] },
    { id: 4, nombre: "Platinum", texto: idioma['_trans853'] },
    { id: 5, nombre: "Diamond", texto: idioma['_trans854'] },
]
var url_temp = getBaseUrlProject();
var metodoDepagoSelect = "";

var schemaProducto = {};
var schemaImages = {};
var schemaQuestion = {};
var schemaDatosVendedor = {};
var schemaProductosDelVendedor = {};

$(document).ready((e) => {
    $('.product__btn__addcart').click(($event) => {
        validAddToCart();
    });
    $('.btn-preguntar').off('click');
    $('.btn-preguntar').on('click', cajadePreguntas);
    $(".btn__compartir").off()
    $(".btn__compartir").on('click', compartirMiPublicacion);
    $(".select-tallas").off()
    $(".select-tallas").on('change', selectTallaColor);
    $(".select-colores").off()
    $(".select-colores").on('change', selectColorAvailable);
});
function prodFavorito() {
    if (validarText(user)) {
        let value = $(".product__favorite").val()
        if (value == "true") {
            eliminarFav();

        } else {
            agregarFav();

        }

    } else {
        abrirAlerta(idioma['trans_145'], idioma['_trans481'])

    }
}
function agregarFav() {
    let dataFav = {
        "id_producto": schemaProducto.id,
        "uid": user.uid,
        "empresa": user.empresa
    }
    let data_url = baseurl + "/controllers/favoritos/?agregar";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataFav },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async datos => {
            if (datos['status'] == "success") {
                $(".product__favorite").empty();
                $($(".product__favorite")[0]).addClass('quitar');
                $(".product__favorite").val("true")
                $(".product__favorite").html(`<i class="fas fa-heart"></i> ${idioma.trans105_}</button >`)

            } else if (datos['status'] == "productoPertenece") {
                abrirAlerta(idioma['_trans06'], idioma['_trans860'])
            } else {
                let validate_token = await erroresTokenEmpresa(datos);
                if (!validate_token) abrirAlerta(idioma['_trans06'], idioma['_trans482'])

            }
        }, error: error => {
            abrirAlerta(idioma['_trans06'], idioma['_trans483'])
        }
    });
}
function eliminarFav() {
    let dataFav = {
        "id_producto": schemaProducto.id,
        "uid": user.uid,
        "empresa": user.empresa
    }
    let data_url = baseurl + "/controllers/favoritos/?eliminar";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataFav },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async datos => {
            if (datos['status'] == "success") {
                $(".product__favorite").empty();
                $($(".product__favorite")[0]).removeClass('quitar');
                $(".product__favorite").val("false")
                $(".product__favorite").html(`<i class="fas fa-heart"></i> ${idioma._trans415}</button >`)

            } else {
                let validate_token = await erroresTokenEmpresa(datos);
                if (!validate_token) abrirAlerta(idioma['_trans06'], idioma['_trans484'])

            }
        }, error: error => {
            abrirAlerta(idioma['_trans06'], idioma['_trans485'])
        }
    });
}
function cargarPrimero() {
    params = new URLSearchParams(location.search);
    datos = {
        id: (params.get('uid') == undefined ? "" : params.get('uid')),
        iso_code_2: "US",
        iso_code_2_money: iso_code_2_money,
        uid: null,
        empresa: null
    };
    if (paisOrigen != undefined && paisOrigen != null && paisOrigen != "") {
        datos.iso_code_2 = paisOrigen.iso_code_2;
        datos.iso_code_2_money = iso_code_2_money;
    }
    getPromiseProducto();
    getTallaColorProducto();
    // getParesProducto();
}
async function getPromiseProducto() {
    var categorias_vendedor = [
        { id: 1, nombre: "Bronze", texto: idioma['_trans850'] },
        { id: 2, nombre: "Silver", texto: idioma['_trans851'] },
        { id: 3, nombre: "Gold", texto: idioma['_trans852'] },
        { id: 4, nombre: "Platinum", texto: idioma['_trans853'] },
        { id: 5, nombre: "Diamond", texto: idioma['_trans854'] },
    ]

    if (validarText(user)) {
        datos.uid = user.uid;
        datos.empresa = user.empresa;
    }
    schemaProducto = await getProductoByParams({ "data": datos });
    // console.log("schemaProducto: ",schemaProducto);

    // if(schemaProducto){
    //     const descuento = schemaProducto.precio_descuento_local_user_mask;
    //     if( descuento !== "" && descuento !== undefined && descuento !== null){
    //         $('meta[property=og\\:title]').attr('content', `${schemaProducto.titulo} - ${descuento}`);
    //     }else{
    //         const precio = schemaProducto.precio_local_user_mask;
    //         $('meta[property=og\\:title]').attr('content', `${schemaProducto.titulo} - ${precio}`);
    //     }

    //     if(schemaProducto.foto_portada !== undefined){
    //         $('meta[property=og\\:image]').attr('content', schemaProducto.foto_portada);
    //     }
    // }

    if (schemaProducto.cantidad * 1 <= schemaProducto.cantidad_vendidas * 1) {
        $('.product__btn__addcart').prop("disabled", true);
        $('.product__cantida').prop("disabled", true);
    } else {
        $('.product__btn__addcart').prop("enabled", true);
        $('.product__cantida').prop("enabled", true);
    }

    if (schemaProducto == null) {
        location.href = "page-not-found.php";
        return;
    } else {
        schemaImages = await getProductoPicturesByParams({ "data": datos });


        schemaQuestion = await getProductoQuestionsByParams({ "data": datos });


        let paramsRequestVendedor = {
            uid: schemaProducto.uid,
            empresa: schemaProducto.empresa,
        };

        schemaDatosVendedor = await getProductoDatosVendedorByParams({ "data": paramsRequestVendedor });


        let paramsRequestProductosDelVendedor = {
            "id": schemaProducto.uid,
            "iso_code_2": datos.iso_code_2,
            "iso_code_2_money": iso_code_2_money,
            "pais": paisOrigen.country_id * 1,
            "id_producto": datos.id
        };
        console.log("paramsRequestProductosDelVendedor: ", paramsRequestProductosDelVendedor);
        console.log("paramsRequestProductosDelVendedor: ", paramsRequestProductosDelVendedor);
        console.log("paramsRequestProductosDelVendedor: ", paramsRequestProductosDelVendedor);
        console.log("paramsRequestProductosDelVendedor: ", paramsRequestProductosDelVendedor);
        console.log("paramsRequestProductosDelVendedor: ", paramsRequestProductosDelVendedor);
        console.log("paramsRequestProductosDelVendedor: ", paramsRequestProductosDelVendedor);
        console.log("paramsRequestProductosDelVendedor: ", paramsRequestProductosDelVendedor);
        console.log("paramsRequestProductosDelVendedor: ", paramsRequestProductosDelVendedor);
        console.log("schemaProducto: ", schemaProducto);

        schemaProductosDelVendedor = await getProductoProductosDelVendedorByParams({ "data": paramsRequestProductosDelVendedor });
        let product__favoriteHTML = "";
        if (user != null && user != undefined) {

            if (schemaProducto.uid == user.uid) {
                $(".btn-preguntar").hide("fast")
            } else {

                if (schemaProducto.favorito) {
                    product__favoriteHTML = `<button class="btn-favorito product__favorite quitar" onclick="prodFavorito()" value="${schemaProducto.favorito}"><i class="fas fa-heart"></i> ${idioma._trans210}</button>`;

                } else {
                    product__favoriteHTML = `<button class="btn-favorito product__favorite" onclick="prodFavorito()" value="${schemaProducto.favorito}"><i class="fas fa-heart"></i> ${idioma._trans415}</button>`;
                }


            }
        }


        $('.product__name').text(schemaProducto.titulo);
        $('.product__description').text(schemaProducto.descripcion);

        $('.published__symbol__localcurrency').text(schemaProducto.moneda_local);
        $('.published__symbol__localcurrency__check').val(schemaProducto.moneda_local);

        $('.published__symbol__localcurrency').text(schemaProducto.moneda_local);


        $('.published__price__nasbiblue').html(schemaProducto.precio_nasbiblue_mask);
        $('.published__price__nasbigold').html(schemaProducto.precio_nasbigold_mask);

        if (schemaProducto.oferta == tieneOferta) {
            $('.product__actual').text(schemaProducto.precio_descuento_local_user_mask + " " + schemaProducto.moneda_local_user);
            $('.product__anterior').text(schemaProducto.precio_local_user_mask + " " + schemaProducto.moneda_local_user);
            $('.product__porcentaje_descuento').text(schemaProducto.porcentaje_oferta + "% OFF");


            $('.published__price__localcurrency').text(schemaProducto.precio_descuento_local_mask);
            $('.published__price__localcurrency').html(`${schemaProducto.precio_descuento_local_mask} <span>${schemaProducto.moneda_local}</span>`);


            $('.product__anterior').show("slow");
            $('.product__porcentaje_descuento').show("slow");
        } else {
            $('.product__actual').text(schemaProducto.precio_local_user_mask + " " + schemaProducto.moneda_local_user);
            $('.product__anterior').hide("fast");
            $('.product__porcentaje_descuento').hide("fast");

            $('.published__price__localcurrency').text(schemaProducto.precio_local_user_mask);
            $('.published__price__localcurrency').html(`${schemaProducto.precio_local_mask} <span>${schemaProducto.moneda_local}</span>`);
        }

        let rate = 0;
        if (schemaProducto.calificacion) {
            rate = schemaProducto.calificacion * 1;
        }
        $('.product__rate').html(getRatesIcons(rate) + product__favoriteHTML); // implementar webservice


        if (schemaProducto.envio * 1 == envio.free) {
            $('.shipping__method__free').show("slow");

        } else if (schemaProducto.envio * 1 == envio.acargo) {
            $('.shipping__method__acargo').show("slow");

        } else if (schemaProducto.envio * 1 == envio.acordar_comprador) {
            $('.shipping__method__vendedor').show("slow");

        } else {

        }

        if (schemaImages) {
            let imagesHTML = "";
            $.each(schemaImages, (i, item) => {
                imagesHTML +=
                    `<li data-thumb="${item.foto}" data-src="${item.foto}" id="${i}">
                    <div class="anchor-tag container-slider">
                        <a href="${item.foto}">
                            <img loading="lazy" src="${item.foto}" class="imagen-slider" alt="${schemaProducto.titulo} - nasbi.com">
                        </a>
                    </div>
                </li>`;
            });

            let contentImagesHTML = `<ul id="slider-img">${imagesHTML}</ul>`;
            $('.product__images').html(contentImagesHTML);
            $('#slider-img').lightSlider({
                gallery: true,
                item: 1,
                vertical: true,
                verticalHeight: 470,
                vThumbWidth: 50,
                thumbItem: 8,
                thumbMargin: 4,
                slideMargin: 0,
                onSliderLoad: function (el) {
                    el.lightGallery({
                        selector: '#slider-img .lslide',
                        download: false
                    });
                }
            });
        }


        let listQuestionsHTML = "";
        if (schemaQuestion) {
            if (schemaQuestion.data.length > 0) {
                $('.product__content__questions').empty();
                $.each(schemaQuestion.data, (i, item) => {
                    listQuestionsHTML += `<p class="text-pregunta"><span><img loading="lazy" src="../imagen/icon-preguntas.png" alt="question - nasbi.com"></span> ${item.pregunta}<span> <b>${getFechaConHora(item.fecha_creacion)}</b></span></p>`;
                    if (item.respuesta) {
                        listQuestionsHTML += `<p class=" textrespuesta"><span><img loading="lazy" src="../imagen/icon-preguntas.png" alt="question - nasbi.com"></span> ${item.respuesta} <span> <b> ${getFechaConHora(item.fecha_actualizacion)}</b></span></p>`;
                    } else {
                        if (user != null && user != undefined) {
                            if (schemaProducto.uid == user.uid) {
                                listQuestionsHTML +=
                                    `<div class=" buttons-pregunta">
                                        <button onclick="cajadeRespuesta(${item.id})" class="btn btn_respuesta${item.id}">${idioma._trans145}</button>
                                        </div>
                                        <div class="row input_respuesta${item.id}" style="display: none;">
                                            <div class="col-12">
                                                <textarea class="form-control texarea_respuesta${item.id} " cols="70" rows="3" placeholder="${idioma._trans146}"></textarea>
                                            </div>
                                            <div class="col-12">
                                                <div class="float-left mt-2 buttons-pregunta">
                                                    <button class="btn btn-danger btn_cancelar_respuesta${item.id} trans_02">${idioma.trans_02}</button>
                                                    <button class="btn btn-primary btn_enviar_respuesta${item.id} ">
                                                        ${idioma.trans_16__btn}
                                                        <span class="spinner-border spinner-border-sm spiner_enviar_respuesta${item.id}" style="display: none;" role="status" aria-hidden="true"></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>`;
                            }
                        }

                    }
                });
                $('.product__content__questions').html(listQuestionsHTML);
                $('.product__content__questions').show("slow");
                $('.product__content__questions__nodata').hide();
            } else {
                $('.product__content__questions').html("");
                $('.product__content__questions').hide();
                $('.product__content__questions__nodata').show("slow");
            }
        } else {
            $('.product__content__questions').html("");
            $('.product__content__questions').hide();
            $('.product__content__questions__nodata').show("slow");
        }


        if (schemaProductosDelVendedor) {
            if (schemaProductosDelVendedor.data.length > 0) {
                $.each(schemaProductosDelVendedor.data, (i, item) => {
                    if (item.tipoSubasta == 0) {
                        console.log(item)
                        let precioShow = item.precio_local_user_mask + " " + schemaProducto.moneda_local_user;
                        if (item.oferta == tieneOferta) {
                            precioShow = item.precio_descuento_local_user_mask + " " + schemaProducto.moneda_local_user;
                        }
                        let htmoItem =
                            `<div class="item">
                                <a href="producto.php?uid=${item.id}">
                                    <div class="container-similar">
                                        <img loading="lazy" src="${item.foto_portada}" alt="${item.titulo} - nasbi.com" class="img-similar">
                                    </div>
                                    <h3 class="price-similar">${precioShow}</h3>
                                    <p class="name-similar">${item.titulo}</p>
                                </a>
                            </div>`;
                        $('.content__masproductos__carousel').owlCarousel('add', htmoItem).owlCarousel('refresh');
                    }
                });
                $('.tittle_productos_vendedor').show("slow");

                $('.content__masproductos').show("slow");

            } else {

            }
        } else {
            $('.content__masproductos').hide();
            $('.tittle_productos_vendedor').hide();

        }

        // Datos del vendedor
        if (schemaDatosVendedor.data) {
            $('.contenedor-nombre').empty()
            let html = `
            <a href="datos-vendedor.php?uid=${schemaProducto.uid}&empresa=${schemaProducto.empresa}">
                <h5 class="nombre-vendedor vendedor__name">${schemaDatosVendedor.data.usuario.nombre}</h5>
            </a>`
            $('.contenedor-nombre').html(html)
            if (schemaDatosVendedor.data.usuario.empresa) {
                schemaDatosVendedor.data.usuario.foto ? $(".vendedor__avatar").attr('src', schemaDatosVendedor.data.usuario.foto) : $(".vendedor__avatar").attr('src', "../imagen/avatar.png")

            } else {
                schemaDatosVendedor.data.usuario.foto ? $(".vendedor__avatar").attr('src', "../imagen/avatar/" + schemaDatosVendedor.data.usuario.foto + ".png") : $(".vendedor__avatar").attr('src', "../imagen/avatar.png")
            }


            $('.vendedor__location').text(schemaDatosVendedor.data.direccion ? schemaDatosVendedor.data.direccion.ciudad : schemaProducto.ciudad);

            let promComments = 0;
            if (schemaDatosVendedor.data.promedio.cantidad_comentarios * 1 > 0) {
                promComments = (schemaDatosVendedor.data.promedio.buenos / schemaDatosVendedor.data.promedio.cantidad_comentarios)
            }

            if (promComments > 0) {
                $('.vendedor__status__comments__content').show();
                $('.vendedor__status__comments__content__NoData').hide();
                $('.vendedor__status__comments').text(promComments.toFixed(2) * 100 + "%");
            } else {
                $('.vendedor__status__comments__content').hide();
                $('.vendedor__status__comments__content__NoData').show();
                $('.vendedor__status__comments').text(idioma['trans_60']);
            }

            $('.vendedor__sales__made').text(schemaDatosVendedor.data.promedio.ventas_seis_meses);

            //se cambio esta linea
            $('.vendedor__rates__info').html(`<span>${schemaDatosVendedor.data.promedio.general_prom}</span> ${getRatesIcons(schemaDatosVendedor.data.promedio.general_prom)}`);
            $('.vendedor__clasification').text(idioma['_trans157'] + " " + schemaDatosVendedor.data.promedio.vendedor_tipo)
            if (schemaDatosVendedor.data.promedio.general_prom <= 0) {
                $('.vendedor__clasification__description').text("")
            } else {
                $('.vendedor__clasification__description').text(categorias_vendedor.find(f => f.nombre == schemaDatosVendedor.data.promedio.vendedor_tipo).texto)

            }
            let porc = schemaDatosVendedor.data.promedio.general_prom * 100 / 5.00
            $('.porcent_bar').css('width', porc + '%')
        }

        producto_getComentarios();
        $(".content__loadingSpinner").hide()
        $(".content_all").show()
        $(".product__description").show()
        $(".content__masproductos__carousel").show()
        $(".content_info_vendedor").show()



    }
}
async function validAddToCart() {
    let isValidForm = true;
    if ($('.product__cantida').val() * 1 <= 0) {
        $('.product__cantida__errors').show("slow");
        isValidForm = false;
    } else {
        $('.product__cantida__errors').hide("fast");
    }
    if (schemaProducto.detalle_colores_tallas != null) {
        if (parProducto.cantidad != null) {
            // if (($('.product__cantida').val() * 1) <= parProducto.cantidad) {
            //     parProducto.cantidad = parProducto.cantidad - ($('.product__cantida').val() * 1);
            //     Object.keys(tallaXcolorXproducto).forEach(function (key) {
            //         for (let i = 0; i < tallaXcolorXproducto[key].length; i++) {
            //             if (tallaXcolorXproducto[key][i].id_color == parProducto.id_color && tallaXcolorXproducto[key][i].id_tallas == parProducto.id_talla) {
            //                 tallaXcolorXproducto[key][i].cantidad = parProducto.cantidad - ($('.product__cantida').val() * 1);
            //             }
            //         }
            //     });
            //     console.log(parProducto);
            // }
            // else {
            //     isValidForm = false;
            //     presentAlertObject({ icon: 'error', text: idioma.trans_eb25 });
            // }
        } else {
            isValidForm = false;
            presentAlertObject({ icon: 'error', text: idioma.trans_eb26 });
        }
    }
    if ($('.method_1').is(':checked')) {
        metodoDepagoSelect = "Nasbiblue";
    }
    if ($('.method_2').is(':checked')) {
        metodoDepagoSelect = "Nasbigold";
    }
    if ($('.method_3').is(':checked')) {
        metodoDepagoSelect = $('.published__symbol__localcurrency').text();
    }

    if (isValidForm) {

        if (validarText(user)) {
            //Registro carrito usuarios LOGEADOS.
            // addToCart();


            let pais_dir_activa;
            let direcc_usuario = await getdireccion_activa_usuario();
            let paisesJSON_prod = JSON.parse(localStorage.getItem('paises'));
            if (direcc_usuario.status) {
                let array_pais_usuario;
                for (const x in direcc_usuario.data) {
                    const direccion = direcc_usuario.data[x];
                    if (direccion.activa == 1) {
                        array_pais_usuario = direccion;
                    }
                }
                pais_dir_activa = paisesJSON_prod.filter(f => f.iso_code_2 == array_pais_usuario.departamento.country_code)[0]

            } else {
                pais_dir_activa = paisesJSON_prod.filter(f => f.iso_code_2 == user.paisid)[0]
            }
            if (pais_dir_activa.country_id != schemaProducto.pais) {
                abrirAlerta(idioma['_trans462'], idioma['_trans871'])

            } else if (user.uid == schemaDatosVendedor.data.direccion.uid) {
                abrirAlerta(idioma['_trans462'], idioma['_trans832'])
            } else {
                validateCarritoLogout();
            }



        } else {
            let correcto_seguir_proceso = await validar_valor_correcto_producto();
            if (correcto_seguir_proceso) {
                let cartAux = getSchemaToCartLogout();

                localStorage.setItem('carrito_no_logueado', JSON.stringify(cartAux));
                addToCartStorage(cartAux);

            } else {
                presentAlertObject({ icon: 'error', text: idioma.trans451_ });
            }

        }
    }

}
function getSchemaToCartLogout() {

    let cart = {
        "empresa": 0,
        "id_producto": schemaProducto.id,
        "cantidad": $('.product__cantida').val() * 1,
        "moneda": $('.published__symbol__localcurrency').text(),//metodoDepagoSelect,
        "refer": ""
    };
    if (validarText(user)) {
        cart.empresa = user.empresa;
    }
    if (carritoTemporal) {
        let pos = carritoTemporal.data.map(article => { return article.id_producto }).indexOf(schemaProducto.id);
        if (pos > -1) {
            if (carritoTemporal.data[pos].moneda == $('.product_payment_method').val()) {
                carritoTemporal.data[pos].cantidad = (carritoTemporal.data[pos].cantidad * 1) + cart.cantidad;
            } else {
                carritoTemporal.data.push(cart);
            }
        } else {
            carritoTemporal.data.push(cart);
        }
    } else {
        // Registro carrito usuario NO-LOGEADO
        carritoTemporal = {
            "data": [cart]
        };
    }

    return carritoTemporal;
}
async function validateCarritoLogout() {

    if (schemaProducto.cantidad * 1 <= schemaProducto.cantidad_vendidas * 1) {
        return presentAlertObject({ icon: 'error', text: idioma['trans_327'] });
    }

    if (carritoTemporal) {
        let schemaCartStorage = getSchemaToCartLogout();

        addToCartStorage(schemaCartStorage);
    } else {
        let correcto_seguir_proceso = await validar_valor_correcto_producto();

        if (correcto_seguir_proceso) {
            addToCart();
        } else {
            presentAlertObject({ icon: 'error', text: idioma.trans451_ });
        }

    }
}

function validar_valor_correcto_producto() {
    return new Promise((resolve) => {
        switch (metodoDepagoSelect) {
            case "Nasbigold":
                if (schemaProducto.precio_nasbigold > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
                break;
            case "Nasbiblue":
                if (schemaProducto.precio_nasbiblue > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
                break;

            default:
                if (schemaProducto.precio_local > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
                break;
        }
    });

}
function addToCart() {
    $(".spiner_anadir_carrito").show()
    let user_comp_uid = params.get('uid_user')
    let user_comp_empresa = params.get('empresa_user')
    console.log(user_comp_uid, user_comp_empresa)
    let paramsCart = {
        "uid": user.uid,
        "empresa": user.empresa,
        "id_producto": schemaProducto.id,
        "id_pair": parProducto.id_pair,
        "id_talla": parProducto.id_talla,
        "id_color": parProducto.id_color,
        "cantidad": $('.product__cantida').val() * 1,
        "moneda": $('.published__symbol__localcurrency').text(), //metodoDepagoSelect
    };
    if (user_comp_uid && user_comp_empresa) {
        console.log("valid params to get comision")
        paramsCart.uid_redsocial = user_comp_uid;
        paramsCart.empresa_redsocial = user_comp_empresa;
    }
    let data_url = `${baseurl}/controllers/carrito/?agregar`;

    console.log("\n\n\n\n\n\n\n\n\n");
    console.log("URL: ", data_url);
    console.log("JSON: ", JSON.stringify({ "data": paramsCart }));
    console.log("\n\n\n\n\n\n\n\n\n");
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": paramsCart },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async datos => {
            $(".spiner_anadir_carrito").hide()
            if (datos['status'] == "success") {

                countMyCartsAuth(user);

                $('#modal-agregado-carrito-new').modal('toggle');
            } else if (datos['status'] == "productoPertenece") {
                abrirAlerta(idioma['_trans462'], idioma['_trans832'])

            } else if (datos['status'] == 'errorMonedaCarrito') {
                abrirAlerta(idioma['trans183'], idioma["trans184"]);

            } else if (datos['status'] == 'stockError') {
                abrirAlerta(idioma['trans_eb54'], idioma['trans_eb55']);
            } else if (datos['status'] == 'errorStock') {
                abrirAlerta(idioma['trans_eb54'], idioma['trans_eb55']);
            }
            else {
                let validate_token = await erroresTokenEmpresa(datos);
                if (!validate_token) abrirAlerta(idioma['trans_04'], idioma['trans_62']);

            }

        }, error: error => {
            $(".spiner_anadir_carrito").hide()
            abrirAlerta(idioma['trans_04'], idioma['trans_62']);
        }
    });

}
function addToCartStorage(paramsCart = {}) {
    let data_url = baseurl + "/controllers/carrito/?agregar_de_no_logueado";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": paramsCart },
        dataType: "json",
        success: datos => {
            if (datos['status'] == "success") {

                $('#modal-agregado-carrito-new').modal('toggle');

                countMyCartsNotAuth(carritoTemporal);
            } else {
                abrirAlerta(idioma['trans_04'], idioma['trans_62']);
            }
        }, error: error => {
            abrirAlerta(idioma['trans_04'], idioma['trans_62']);
        }
    });
}

function cajadePreguntas() {
    if (validarText(user)) {
        $('.input_pregunta').show("slow");
        $('.btn-preguntar').hide("fast");
        $('.btn_enviar_pregunta').off('click');
        $('.btn_enviar_pregunta').on('click', enviarPregunta)

        $('.btn_cancelar_pregunta').click(($event) => {
            $('.input_pregunta').hide("slow");
            $('.btn-preguntar').show("slow");
        })
    } else {
        abrirAlerta(idioma['trans_145'], idioma['_trans486'])

    }
}
function enviarPregunta() {
    var pregunta = $('.texarea_pregunta').val()
    if (!validarText(pregunta)) return abrirAlerta(idioma['_trans460'], idioma['_trans93'] + " " + idioma['_trans147'])
    $(".btn_enviar_pregunta").attr("disabled", true)
    $(".spiner_enviar_pregunta").show()
    let dataPregunta = {
        "id": schemaProducto.id,
        "uid": user.uid,
        "empresa": user.empresa,
        "pregunta": pregunta
    };


    let data_url = baseurl + "/controllers/producto/?preguntar";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataPregunta },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async datos => {
            $(".btn_enviar_pregunta").attr("disabled", false)
            $(".spiner_enviar_pregunta").hide()
            if (datos['status'] == "success") {
                $('.input_pregunta').hide("fast");
                $('.btn-preguntar').show("fast");
                $('.texarea_pregunta').val("")
                getPreguntas()


            } else {
                let validate_token = await erroresTokenEmpresa(datos);
                if (!validate_token) abrirAlerta(idioma['_trans06'], idioma['_trans477']);

            }
        }, error: error => {
            $(".btn_enviar_pregunta").attr("disabled", false)
            $(".spiner_enviar_pregunta").hide()
            abrirAlerta(idioma['_trans06'], idioma['_trans478']);
        }
    });
}
function cajadeRespuesta(x) {
    $('.input_respuesta' + x).show("slow");
    $('.btn_respuesta' + x).hide("fast");
    $('.btn_enviar_respuesta' + x).click(($event) => {
        console.log("entroa la respuesta")
        enviarRespuesta(x)
    })
    $('.btn_cancelar_respuesta' + x).click(($event) => {
        $('.btn_enviar_respuesta' + x).off();
        $('.input_respuesta' + x).hide("slow");
        $('.btn_respuesta' + x).show("slow");
        console.log("entro a cancelar")
    })
}
function enviarRespuesta(x) {
    var respuesta = $('.texarea_respuesta' + x).val()
    if (!validarText(respuesta)) return abrirAlerta(idioma['_trans460'], idioma['_trans211'])
    $(".spiner_enviar_respuesta" + x).show();
    $(".btn_enviar_respuesta" + x).attr("disabled", true)
    let dataRespuesta = {
        "id": schemaProducto.id,
        "id_pregunta": x,
        "uid": user.uid,
        "empresa": user.empresa,
        "respuesta": respuesta,
        "uid_vendedor": schemaProducto.uid
    };

    let data_url = baseurl + "/controllers/producto/?responder";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataRespuesta },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async datos => {
            $(".spiner_enviar_respuesta" + x).hide();
            $(".btn_enviar_respuesta" + x).attr("disabled", false)
            if (datos['status'] == "success") {
                $('.input_respuesta' + x).hide("fast");
                $('.btn_respuesta' + x).show("fast");
                $('.texarea_respuesta' + x).val("")
                getPreguntas()


            } else {
                let validate_token = await erroresTokenEmpresa(datos);
                if (!validate_token) abrirAlerta(idioma['_trans06'], idioma['_trans149']);

            }
        }, error: error => {
            $(".spiner_enviar_respuesta" + x).hide();
            $(".btn_enviar_respuesta" + x).attr("disabled", false)
            abrirAlerta(idioma['_trans06'], idioma['_trans479']);
        }
    });
}
function getPreguntas() {
    let paramsPreg = {
        "id": schemaProducto.id,
    };

    let data_url = baseurl + "/controllers/producto/?preguntas_producto";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": paramsPreg },
        dataType: "json",
        success: datos => {
            if (datos['status'] == "success") {
                let pregunta = datos['data']
                let listQuestionsHTML = "";
                $('.product__content__questions').empty();
                $.each(pregunta, (i, item) => {
                    listQuestionsHTML += `<p class="text-pregunta"><span><img loading="lazy" src="../imagen/icon-preguntas.png" alt="question - nasbi.com"></span> ${item.pregunta}<span> <b> ${getFechaConHora(item.fecha_creacion)}</b></span></p>`;
                    if (item.respuesta) {
                        listQuestionsHTML += `<p class="textrespuesta"><span><img loading="lazy" src="../imagen/icon-preguntas.png" alt="question - nasbi.com"></span> ${item.respuesta} <span> <b>${getFechaConHora(item.fecha_actualizacion)}</b></span></p>`;
                    } else {
                        if (user) {

                            if (schemaProducto.uid == user.uid) {
                                listQuestionsHTML +=
                                    `<div class="buttons-pregunta">
                                        <button onclick="cajadeRespuesta(${item.id})" class="btn_respuesta${item.id}">${idioma._trans145}</button>
                                    </div>
                                    <div class="row input_respuesta${item.id}" style="display: none;">
                                        <div class="col-12">
                                            <textarea class="form-control texarea_respuesta${item.id} " cols="70" rows="3" placeholder="${idioma._trans146}"></textarea>
                                        </div>
                                        <div class="col-12">
                                            <div class="float-left mt-2 buttons-pregunta">
                                                
                                                <button class="btn btn-danger btn_cancelar_respuesta${item.id} trans_02">${idioma.trans_02}</button>
                                                <button class="btn btn-primary btn_enviar_respuesta${item.id} ">
                                                    ${idioma.trans_16__btn}
                                                    <span class="spinner-border spinner-border-sm spiner_enviar_respuesta${item.id}" style="display: none;" role="status" aria-hidden="true"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>`
                            }
                        }

                    }
                });
                $('.product__content__questions').html(listQuestionsHTML);
                $('.product__content__questions').show("slow");
                $('.product__content__questions__nodata').hide();

            } else {
                $('.product__content__questions').hide("fast");
                $('.product__content__questions__nodata').show();

            }
        }, error: error => {
            abrirAlerta(idioma['_trans462'], idioma['_trans480']);
        }
    });
}

function compartirMiPublicacion() {
    $("#modal-compartir-publicacion").modal("show");
    $(".compartir_mi_publicacion_wsp").off()
    $(".compartir_mi_publicacion_wsp").on('click', compartirMiPubliWsp)
    $(".compartir_mi_publicacion_fb").off()
    $(".compartir_mi_publicacion_fb").on('click', compartirMiPubliFb)
    $(".compartir_mi_publicacion_link").off()
    $(".compartir_mi_publicacion_link").on('click', compartirMiPubliLink)
}

function compartirMiPubliWsp() {
    let id_miPubli = schemaProducto.id;
    let url_publi_texto = url_temp + "producto.php" + "?uid=" + id_miPubli + "&lang=" + miuser_lang + "&iso_code=" + paisOrigen.iso_code_2 + "&country=" + paisOrigen.country_id + "&uid_user=" + miuser_uid + "&empresa_user=" + miuser_empresa;
    let texto = url_publi_texto;

    let url = "https://api.whatsapp.com/send?text=" + texto.split(" ").join("%20");

    return window.open(url, '_blank');

}
function compartirMiPubliFb() {
    let id_miPubli = schemaProducto.id;
    let url_publi_texto = url_temp + "producto.php" + "?uid=" + id_miPubli + "&lang=" + miuser_lang + "&iso_code=" + paisOrigen.iso_code_2 + "&country=" + paisOrigen.country_id + "&uid_user=" + miuser_uid + "&empresa_user=" + miuser_empresa;
    let url_fab = "http://www.facebook.com/share.php?u=" + url_publi_texto;
    return window.open(url_fab, '_blank');

}
function compartirMiPubliLink() {
    let id_miPubli = schemaProducto.id;
    let url_publi_texto = url_temp + "producto.php" + "?uid=" + id_miPubli + "&lang=" + miuser_lang + "&iso_code=" + paisOrigen.iso_code_2 + "&country=" + paisOrigen.country_id + "&uid_user=" + miuser_uid + "&empresa_user=" + miuser_empresa;
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(url_publi_texto);
        return;
    }
    navigator.clipboard.writeText(url_publi_texto).then(function () {
        Toast('success', idioma.trans_207);
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
        NativeFunction.copyToClipboard(url_publi_texto);
        Toast('success', idioma.trans_207);
    });

}
function producto_getComentarios() {
    let data = {
        "id": schemaProducto.id,

    };

    let data_url = baseurl + "/controllers/producto/?calificaciones_producto";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": data },
        dataType: "json",
        success: datos => {
            if (datos['status'] == "success") {
                let comentarios = datos.data;
                mostrarComments(comentarios);


            } else {
                $(".product_no_comments").show("fast")

            }
        }, error: error => {
            abrirAlerta(idioma['trans_04'], idioma['_trans06']);
        }
    });


}
function mostrarComments(datos) {
    let htmlcomments = "";
    $(".producto_content_coments").empty();
    $.each(datos, (i, item) => {
        htmlcomments +=
            `<div class="row row-coment">
            <div class="col-md-9 px-0">
                <p class="comentario"><span><img loading="lazy" alt="icon-pregunta-nasbi.com" src="../imagen/icon-preguntas.png"></span> ${item.descripcion} <span><b> ${getFechaConHora(parseInt(item.fecha_actualizacion))}</b></span></p>
            </div>
            <div class="px-0 px-md-2 col-md-3">
                <p class="calificacion-comentario">
                ${getRatesIcons(item.promedio)}
                </p>
            </div>
        </div>`
    })
    $(".producto_content_coments").html(htmlcomments);
}
function getdireccion_activa_usuario() {
    return new Promise((resolve) => {



        let dataEnviar = {
            data: {
                uid: user.uid,
                empresa: user.empresa,
            }
        }

        let data_url = baseurl + "/controllers/direcciones/?direcciones_usuario";
        $.ajax({
            type: 'POST',
            url: data_url,
            data: dataEnviar,
            dataType: 'json',
            "headers": { 'x-api-key': user.token },
        }).done(async (res) => {

            if (res.status == 'success') {

                if (res.status == 'success' && res.cantidad > 0) {
                    $('.direcciones__list__nodata').hide();
                    let direccionesUsuario = res.data;
                    direccionesUsuario.map((data) => {
                        let paisesJSON_dir = JSON.parse(localStorage.getItem('paises'));
                        data.pais = paisesJSON_dir.filter(datos => datos.country_id == data.pais)[0];
                        data.departamento = data.pais.departamento.filter(datos => datos.zone_id == data.departamento)[0];
                        delete (data.pais.departamento);
                        return data;
                    });
                    resolve({ status: true, data: direccionesUsuario })
                } else {
                    let validate_token = await erroresTokenEmpresa(res);
                    if (!validate_token) resolve({ status: false, data: "No posee direcciones" })


                }


            } else {
                let validate_token = await erroresTokenEmpresa(datos);
                if (!validate_token) resolve({ status: false, data: null })

            }

        }).fail((err) => {
            resolve({ status: false, data: null })
        });
    })


}


function abrirAlerta(titulo, text) {
    $(".alerta_titulo").text(titulo);
    $(".alerta_text").text(text);
    $("#modal-alertas-generales").modal("toggle")
}
var tallaXcolorXproducto = null;
function getTallaColorProducto() {
    let data_url = baseurl + "/controllers/producto/?producto_colores_tallas";
    let data = {
        data: { id_producto: datos.id },
    }

    return new Promise((resolve, reject) => {
        $.ajax({
            url: data_url,
            type: 'POST',
            data: data,
            dataType: 'json',
        }).done((result) => {
            if (result["status"] == 'success') {
                tallaXcolorXproducto = result.data;
                chargeTallasProducto();
            } else {
                $(".div-tallas-colores").addClass("d-none");
                resolve(null);
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: 'No tiene tallas' });
            // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
            reject(null);
        });
    });

}

function chargeTallasProducto() {
    let data = tallaXcolorXproducto;
    $(".select-tallas").html('');
    $(".select-colores").html('');
    if (localLenguaje == 'EN') {
        let html = '<option value="" selected>Select</option>';
        let html1 = ``;
        Object.keys(tallaXcolorXproducto).forEach(function (key) {
            html += `<option value="${key}">${tallaXcolorXproducto[key][0].talla_nombre_en}</option>`;
            for (let i = 0; i < tallaXcolorXproducto[key].length; i++) {
                html1 += `
            <a class="mt-1 dropdown-item ccolor key${key}${i} d-none" style="background-color: ${tallaXcolorXproducto[key][i].hexadecimal} !important; height: 20px; border-top: 1px solid #232a85; border-bottom: 1px solid #232a85;"  onclick="selectColorAvailable(${tallaXcolorXproducto[key][i].id_color}, ${key}, ${i})"></a>
            `;
                //<option style="background-color: ${tallaXcolorXproducto[key][i].hexadecimal}" class="key${key} d-none" value="${tallaXcolorXproducto[key][i].id_color}"></option
            }
        });
        $(".select-tallas").html(html);
        $(".select-colores").html(html1);
    } else if (localLenguaje == 'ES') {
        let html = '<option value="" selected>Selecciona</option>';
        let html1 = ``;
        Object.keys(tallaXcolorXproducto).forEach(function (key) {
            html += `<option value="${key}">${tallaXcolorXproducto[key][0].talla_nombre_es}</option>`;
            for (let i = 0; i < tallaXcolorXproducto[key].length; i++) {
                html1 += `
            <a class="mt-1 dropdown-item ccolor key${key}${i} d-none" style="background-color: ${tallaXcolorXproducto[key][i].hexadecimal} !important; height: 20px; border-top: 1px solid #232a85; border-bottom: 1px solid #232a85;"  onclick="selectColorAvailable(${tallaXcolorXproducto[key][i].id_color}, ${key}, ${i})"></a>
            `;
                // html1 += `<option style="background-color: ${tallaXcolorXproducto[key][i].hexadecimal}" class="key${key} d-none" value="${tallaXcolorXproducto[key][i].id_color}"></option>`;
            }
        });
        $(".select-tallas").html(html);
        $(".select-colores").html(html1);
    }
}
function selectTallaColor() {
    let key = $(".select-tallas").val();
    $(".ccolor").addClass('d-none');
    if (key != '') {
        for (let i = 0; i < tallaXcolorXproducto[key].length; i++) {
            $(".key" + key + i).removeClass('d-none');
        }
    }
    let element = document.querySelector('.id_color');
    element.style.backgroundColor = 'white';
    element.style.color = '#232a85';
}

var paresProductos = null;
var parProducto = {
    id_pair: null,
    id_color: null,
    id_talla: null,
};
function selectColorAvailable(id_color, key, i) {
    let size = $(".select-tallas").val();
    let color = id_color;
    let element = document.querySelector('.key' + key + i);
    let bg = element.style.backgroundColor;
    bg = bg.substr(4);
    bg = bg.split(')');
    bg = bg[0];
    bg = bg.split(',');
    let hex = rgbToHex(parseInt(bg[0]), parseInt(bg[1]), parseInt(bg[2]));
    console.log(hex);
    element = document.querySelector('.id_color');
    element.style.backgroundColor = hex;
    element.style.color = 'transparent';
    let response = null;
    Object.keys(tallaXcolorXproducto).forEach(function (key) {
        for (let i = 0; i < tallaXcolorXproducto[key].length; i++) {
            if (tallaXcolorXproducto[key][i].id_color == color && tallaXcolorXproducto[key][i].id_tallas == size) {
                parProducto.id_pair = tallaXcolorXproducto[key][i].id_pair;
                parProducto.id_color = tallaXcolorXproducto[key][i].id_color;
                parProducto.id_talla = tallaXcolorXproducto[key][i].id_tallas;
                parProducto.cantidad = tallaXcolorXproducto[key][i].cantidad;
            }
        }
    });
    // for (let i = 0; i < paresProductos.length; i++){
    //     if (paresProductos[i].id_color == color && paresProductos[i].id_tallas == size) {
    //         parProducto.id_pair = paresProductos[i].id_pair;
    //         parProducto.id_color = paresProductos[i].id_color;
    //         parProducto.id_talla = paresProductos[i].id_tallas;
    //         parProducto.cantidad = paresProductos[i].cantidad;
    //     }
    // }

    console.log(parProducto);
}
// function getParesProducto() {
//     let data_url = baseurl + "/controllers/publicacion/?obtener_pares_producto_colores_tallas";
//     let data = {
//         data:{id_producto: datos.id},
//     }
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: data_url,
//             type: 'POST',
//             data: data,
//             dataType: 'json',
//         }).done((result) => {
//             if (result["status"] == 'success') {
//                 paresProductos = result.data;
//             } else {
//                 resolve(null);
//             }
//         }).fail((err) => {
//             presentAlertObject({ icon: 'error', text: 'No tiene tallas' });
//             // Swal.fire({ icon: 'error', text: 'Error al cargar las divisas.' });
//             reject(null);
//         });
//     });
// }