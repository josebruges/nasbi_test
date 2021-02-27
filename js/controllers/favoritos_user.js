function validarlogueado() {
    if (validarText(user)) {
        return true;
    } else {
        loadPage("index.php?s=0")
    }

}

if (validarlogueado()) {
    getfavoritos();

}

//comentario 22


function agregar_loading_ge_publi(clase) {
    let span_loading_ge = `<span class="spinner-border spinner-border-sm spiner_modificar_publi" role="status" aria-hidden="true"></span>`
    $(clase).append(span_loading_ge);
}

function quitar_loading_ge_publi(clase) {
    $(clase).children(".spiner_modificar_publi").remove();
}

function getfavoritos(pagina = 1) {
    agregar_loading_ge_publi('.title-section');
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    let dataEnviar = {
        "data": {
            "uid": user.uid,
            "empresa": user.empresa,
            "pagina": pagina,
            "iso_code_2": paisusuario.iso_code_2,
            "iso_code_2_money": iso_code_2_money
        }
    }
    $('.favoritos__list__nodata').show("slow");

    let data_url = baseurl + "/controllers/favoritos/?favoritos_usuario";

    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {

        if (res.status == 'success') {
            quitar_loading_ge_publi('.title-section');
            if (res.status == 'success' && res.productos > 0) {
                $('.favoritos__list__nodata').hide("slow");
                llenar_favorito(res.data, res.total_paginas, res.pagina);

            } else {
                $('.favoritos__list__nodata').show("slow");
                $('.list_favoritos_user_product').empty();
            }


        } else {
            quitar_loading_ge_publi('.title-section');
            $('.favoritos__list__nodata').show("slow");

            if (res.status == 'fail' && res.productos == 0) {
                $('.list_favoritos_user_product').empty();
            } else {
                let validate_token = await erroresTokenEmpresa(res);
                if (!validate_token) return presentAlertObject({ icon: 'error', text: idioma.trans_04 });

            }
        }

    }).fail((err) => {
        quitar_loading_ge_publi('.title-section');
        $('.list_favoritos_user_product').empty();
        $('.favoritos__list__nodata').show("slow");
        return presentAlertObject({ icon: 'error', text: idioma.trans_04 });
    });


}


function llenar_favorito(datafavoritos_product, total_paginas, pagina) {
    $('.list_favoritos_user_product').empty();

    for (const x in datafavoritos_product) {
        const favorito = datafavoritos_product[x];
        $('.list_favoritos_user_product').append(`
            <div class="col-sm-6 col-lg-4">
            <div class="row row-container">
                <div class="col-md-5 px-2">
                    <div class="container-destacado">
                        <img loading="lazy" src=${favorito.foto_portada} class="imagen-destacados" alt="${favorito.titulo} - nasbi.com">
                    </div>
                </div>
                <div class="col-md-7 px-2">
                    <p class="texQuitar desmarcar_fav " style="cursor: pointer;"><span><i class="fas fa-heart "></i></span> ${idioma.trans105_} </p>
                    <h5 class="nombre-producto">${favorito.titulo}</h5>
                    <p class="descripcion-product">${favorito.descripcion}</p>
                    <h4 class="price-product">${favorito.precio_descuento_local_user_mask} ${favorito.moneda_local_user}</h4>
                    <button class="btn-comprar _trans143 boton_comprar_fav">${idioma._trans428}</button>
                </div>
            </div>
        </div>
        `);


        $('.boton_comprar_fav').eq(x).off('click');
        $('.boton_comprar_fav').eq(x).on('click', { favorito }, comprar_fav);

        $('.desmarcar_fav').eq(x).off('click');
        $('.desmarcar_fav').eq(x).on('click', { favorito }, desmarcar_fav_fun);



    }


    let paramsPagination = {
        total_paginas: total_paginas,
        pagina: pagina
    };
    let result = generatePaginations(paramsPagination);
    $('.list__favoritos__pagination').html(result);
    $('html, body').animate({ scrollTop: 0 }, 500);

}


function comprar_fav(e) {
    let fav_to_comprar = e.data.favorito;
    let id_producto_fav = fav_to_comprar.id;
    let new_url = new URL(location.href);
    let new_params = new URLSearchParams(new_url.search);
    if (!new_params.has('uid')) {
        new_params.set('uid', id_producto_fav);
        new_url = location.href.split("?")[0];
        new_url = new_url.split('favoritos').join("producto");
        new_url = new_url + "?" + new_params.toString();
    }

    // let myUrl = location.href;
    // let pri_url=myUrl+"?uid="+fav_to_comprar.id; 
    // return  window.open(url); para que se abra en otra ventana 
    return window.location.replace(new_url);
}

function desmarcar_fav_fun(e, id = "") {
    agregar_loading_ge_publi('.title-section');
    let fav_to_desmarcar = e.data.favorito;
    let dataEnviar
    if (id == "1") { //PARA ELIMINAR TODOS
        dataEnviar = {
            "data": {
                "id_producto": "all",
                "uid": user.uid,
                "empresa": user.empresa
            }
        }
    } else {

        dataEnviar = {
            "data": {
                "id_producto": fav_to_desmarcar.id,
                "uid": user.uid,
                "empresa": user.empresa
            }
        }
    }

    console.log(dataEnviar, fav_to_desmarcar, "dataaaaaaaa");

    $('.favoritos__list__nodata').show("slow");

    let data_url = baseurl + "/controllers/favoritos/?eliminar";

    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        quitar_loading_ge_publi('.title-section');
        if (res.status == 'success') {
            getfavoritos();

        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {

            }
        }

    }).fail((err) => {
        quitar_loading_ge_publi('.title-section');
        return presentAlertObject({ icon: 'error', text: idioma.trans_04 });
    });


}



function eventGeneratePaginations(pagView = 1) {
    getfavoritos(pagView);
}

