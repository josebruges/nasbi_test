

let params = new URLSearchParams(location.search);
var paramsURL = getParamsFilterProductsURL();

let keysPage = {
    page: "empresas.php",
    content: ".empresas__list",
    pagination: ".pagination_list",
    contentNoData: ".empresas__list__nodata"
};

let empresas_xhrJSON = {
    "pagina": 1,
    "pais": paisOrigen.country_id*1
};

if (paramsURL.pagina != "" && paramsURL.pagina != undefined) {
    empresas_xhrJSON.pagina = paramsURL.pagina;
}

$(document).ready((e) => {
    $('.dropdown__departamentos__local').change(($event) => {

        if ($event.target.value) {
            let pos = paisOrigen.departamento.map(item => { return item.zone_id }).indexOf($event.target.value);
            if (pos > -1) {
                paisOrigen.departamentoSelect = paisOrigen.departamento[pos];
                $('.dropdown__departamentos').val($event.target.value);
                $('.dropdown__departamentos').selectpicker('refresh');

                localStorage.setItem("paisOrigen", JSON.stringify(paisOrigen));
            }
        }
    });
});

function cargarPrimero() {
    let paramsBanner = {
        "data": {
            "idioma": localLenguaje,
            "iso_code_2": paisOrigen.iso_code_2,
            "iso_code_2_money": iso_code_2_money,
            "tipo": 8
        }
    };

    let bannerID = '#carousel-banner-empresas';
    getBanner(bannerID, paramsBanner);

    // empresas_xhrJSON.data.pais = paisOrigen.country_id;
    getEmpresas(empresas_xhrJSON);
}

function getEmpresas(params = {}) {
    let data_url = baseurl + "/controllers/empresas/?home";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": params },
        dataType: "json",
        success: datos => {


            if (datos["status"] == "success") {
                loadingItemsEmpresasHtml(keysPage, datos);
            } else {
                generateItemsHtmlVisibility(keysPage, false);
            }
        }, error: error => {



            generateItemsHtmlVisibility(keysPage, false);
        }
    });
}

function eventGeneratePaginations(paginaView = 1) {
    empresas_xhrJSON.pagina = paginaView;
    getEmpresas(empresas_xhrJSON);
}