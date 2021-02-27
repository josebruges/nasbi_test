

let params = new URLSearchParams(location.search);
var paramsURL = getParamsFilterProductsURL();
paramsURL.mas_vendidos = 1;

let keysPage = {
    page: "mas-vendidos.php",
    content: ".products__list",
    pagination: ".pagination_list",
    contentNoData: ".products__list__nodata"
};

cargarPrimero();

paramsURL.envio = '';
paramsURL.oferta = '';
paramsURL.garantia = '';
paramsURL.condicion_producto = '';
paramsURL.producto_nombre = '';
paramsURL.ordenamiento = '';
//paramsURL.departamento = '';

$(document).ready((e) => {
    $('.buscarnombreproductomas').click(($event) => {
        if ($('.nombreproductomas').val() != "" || $('.nombreproductomas').val() == !undefined) {
            nombredelproductmas($('.nombreproductomas').val());
        } else {
            nombredelproductmas("");
            $('.nombreproductomas').val("");
        }
    });


    $('.condiciondeuso_productmas').change(($event) => {

        cambiodecondiciondeproductomas($event.target.value);
    });


    $('.respuestagarantiamas').change(($event) => {
        respuestagarantiamas($event.target.value);

    });


    $('.enpromocionproductomas').change(($event) => {
        respuestapromocionproductomas($event.target.value);
    });


    $('.tipoenviomas').change(($event) => {
        tipoenviorespuestaproductmas($event.target.value);
    });


    $('.ordenamientoproductomas').change(($event) => {
        ordanmientoproductomas($event.target.value);

    });


    $('.buscargeneralmas').click(($event) => {
        if ($('.nombreproductomas').val() != "" || $('.nombreproductomas').val() == !undefined) {
            nombredelproductmas($('.nombreproductomas').val(), "1");
        } else {
            nombredelproductmas("", "1");
            $('.nombreproductomas').val("");
        }
        getProductos();
    });


    $('.limpiarmas').click(($event) => {
        limpiaropcionesmas();

    });
});

function cargarPrimero() {
    limpiaropcionesmas("1");

    getProductos();

    let paramsBanner = {
        "data": {
            "idioma": localLenguaje,
            "iso_code_2": paisOrigen.iso_code_2,
            "iso_code_2_money": iso_code_2_money,
            "tipo": 7
        }
    };
    let bannerID = '#carousel-banner-mas-vendidos';
    getBanner(bannerID, paramsBanner);



    // loadingDropdownCondicionProducto('.select__condicion__producto__local');
    // loadingDropdownGarantia('.select__garantia__local');
    // loadingDropdownOferta('.select__oferta__local');
}

function getProductos() {
    $('.content__loadingSpinner_filter_mas_vendidos').show();
    let data_url = baseurl + "/controllers/producto/?filtros_productos";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": paramsURL },
        dataType: "json",
        success: datos => {
            $('.content__loadingSpinner_filter_mas_vendidos').hide();

            if (datos["status"] == "success") {
                
                generateItemsHtml(keysPage, datos);

                $(keysPage.content+"_eventClick").off();
                $(keysPage.content+"_eventClick").on('click', eventGeneratePaginationsDynamic);
            } else {
                generateItemsHtmlVisibility(keysPage, false);
            }
        }, error: error => {
            $('.content__loadingSpinner_filter_mas_vendidos').hide();
            generateItemsHtmlVisibility(keysPage, false);
        }
    });
}

function nombredelproductmas(e, id = "0") {

    paramsURL.producto_nombre = e;
    if (id == "0") {
        getProductos();
    }

}
function respuestagarantiamas(e) {
    if (e != undefined) {
        if (e == "2") {
            paramsURL.garantia = "";

        } else {
            paramsURL.garantia = e;
        }
    }
}
function respuestapromocionproductomas(e) {
    if (e != undefined) {
        if (e == "2") {
            paramsURL.oferta = "";

        } else {
            paramsURL.oferta = e;
        }
    }
}
function tipoenviorespuestaproductmas(e) {
    if (e != undefined) {
        if (e == "0") {
            paramsURL.envio = "";

        } else {
            paramsURL.envio = e;
        }
    }
}
function ordanmientoproductomas(e) {

    if (e != undefined) {
        paramsURL.ordenamiento = e;
    }
}
function cambiodecondiciondeproductomas(e) {
    if (e != undefined) {
        if (e == "0") {
            paramsURL.condicion_producto = "";

        } else {
            paramsURL.condicion_producto = e;
        }
    }
}

function limpiaropcionesmas(id = "") {
    paramsURL.envio = "";
    paramsURL.oferta = "";
    paramsURL.garantia = "";
    paramsURL.condicion_producto = "";
    paramsURL.producto_nombre = "";
    paramsURL.ordenamiento = "";

    let ele = document.getElementsByName("colorinmas");
    for (let i = 0; i < ele.length; i++) {
        ele[i].checked = false;

    }
    $('.nombreproductomas').val("");
    if (id != "1") {
        getProductos();
    }

}

function eventGeneratePaginationsDynamic( $event ) {
    let tempIndex = paramsURL.pagina;
    try{
        paramsURL.pagina = $event.currentTarget.id * 1;
    }catch( ex ){
        console.log( ex );
        paramsURL.pagina = tempIndex++;
    }
    getProductos();
}
function eventGeneratePaginations(paginaView = 1) {
    paramsURL.pagina = paginaView;
    getProductos();
}

