

let params = new URLSearchParams(location.search);
var paramsURL = getParamsFilterProductsURL();

paramsURL.oferta = 1;

let keysPage = {
    page: "promociones.php",
    content: ".products__list",
    pagination: ".pagination_list",
    contentNoData: ".products__list__nodata"
};

paramsURL.envio = '';
paramsURL.garantia = '';
paramsURL.condicion_producto = '';
paramsURL.producto_nombre = '';
paramsURL.ordenamiento = '';
//paramsURL.departamento = '';

cargarPrimero();

$(document).ready((e) => {
    $('.buscarnombreproductopro').click(($event) => {
        if ($('.nombreproductopro').val() != "" || $('.nombreproductopro').val() == !undefined) {
            nombredelproductpro($('.nombreproductopro').val());
        } else {
            nombredelproductpro("");
            $('.nombreproductopro').val("");
        }
    });
    $('.condiciondeuso_productpro').change(($event) => {
        cambiodecondiciondeproductopro($event.target.value);
    });
    $('.respuestagarantiapro').change(($event) => {
        respuestagarantiapro($event.target.value);
    });
    $('.enpromocionproductopro').change(($event) => {
        respuestapromocionproductopro($event.target.value);
    });
    $('.tipoenviopro').change(($event) => {
        tipoenviorespuestaproductpro($event.target.value);
    });
    $('.buscargeneralpro').click(($event) => {
        if ($('.nombreproductopro').val() != "" || $('.nombreproductopro').val() == !undefined) {
            nombredelproductpro($('.nombreproductopro').val(), "1");
        } else {
            nombredelproductpro("", "1");
            $('.nombreproductopro').val("");
        }
        getProductos();
    });
    $('.limpiarpro').click(($event) => {
        limpiaropcionespro();
    });
    $('.ordenamientoproductopro').change(($event) => {
        ordanmientoproductopro($event.target.value);
    });
});

function cargarPrimero() {
    limpiaropcionespro("1");
    let paramsBanner = {
        "data": {
            "idioma": localLenguaje,
            "iso_code_2": paisOrigen.iso_code_2,
            "iso_code_2_money": iso_code_2_money,
            "tipo": 6

        }
    };
    getProductos();

    let bannerID = '#carousel-banner-promociones';
    getBanner(bannerID, paramsBanner);
}

function getProductos() {
    $('.content__loadingSpinner_filter_promociones').show('fast');
    

    localStorage.setItem('paramsURL', JSON.stringify(paramsURL));
    let data_url = baseurl + "/controllers/producto/?filtros_productos";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": paramsURL },
        dataType: "json",
        success: datos => {
            $('.content__loadingSpinner_filter_promociones').hide('fast');
            if (datos["status"] == "success") {
                generateItemsHtml(keysPage, datos);

                $(keysPage.content+"_eventClick").off();
                $(keysPage.content+"_eventClick").on('click', eventGeneratePaginationsDynamic);
            } else {
                generateItemsHtmlVisibility(keysPage, false);
            }

        }, error: error => {
            $('.content__loadingSpinner_filter_promociones').hide('fast');
            generateItemsHtmlVisibility(keysPage, false);

        }
    });
}
function nombredelproductpro(e, id = "0") {
    paramsURL.producto_nombre = e;
    if (id == "0") {
        getProductos();
    }
}

function cambiodecondiciondeproductopro(e) {

    if (e !== undefined) {
        if (e == "0") {
            paramsURL.condicion_producto = "";

        } else {
            paramsURL.condicion_producto = e;
        }
        //	getProductos();
    }
}

function respuestagarantiapro(e) {
    if (e !== undefined) {
        if (e == "2") {
            paramsURL.garantia = "";

        } else {
            paramsURL.garantia = e;
        }
        //	getProductos();
    }
}

function respuestapromocionproductopro(e) {
    if (e !== undefined) {
        if (e == "2") {
            paramsURL.oferta = "";

        } else {
            paramsURL.oferta = e;
        }
        getProductos();
    }
}

function tipoenviorespuestaproductpro(e) {
    if (e !== undefined) {
        if (e == "0") {
            paramsURL.envio = "";

        } else {
            paramsURL.envio = e;
        }
        //	getProductos();
    }
}

function ordanmientoproductopro(e) {

    if (e !== undefined) {
        paramsURL.ordenamiento = e;
    }
    //	getProductos(); 
}

function limpiaropcionespro(id = "") {
    paramsURL.envio = "";
    paramsURL.garantia = "";
    paramsURL.condicion_producto = "";
    paramsURL.producto_nombre = "";
    paramsURL.ordenamiento = "";

    let ele = document.getElementsByName("colorinpro");
    for (let i = 0; i < ele.length; i++) {
        ele[i].checked = false;

    }
    $('.nombreproductopro').val("");
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