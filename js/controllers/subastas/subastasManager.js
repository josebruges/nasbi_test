// Declaración - Mis variables
const objectCoin = {
    "nasbigold": {
        "img": '../imagen/icon_wallets/nasbi_gold.png'
    },
    "nasbiblue": {
        "img": '../imagen/icon_wallets/nasbi_blue.png'
    },
};

var __schemaSubasta = {};
var productoProx = [];
var productoAnt = [];
var miProducto = "";
var wallet = {};

const numLimitSliderImg = 4;


const type_subastas = [
    {
        type: 0,
        name: "none",
        css: "none",
        img: "../imagen/medalla.png"
    },
    {
        type: 1,
        name: "Bronze",
        css: "Bronze",
        img: "../imagen/medalla.png"
    },
    {
        type: 2,
        name: "Silver",
        css: "Silver",
        img: "../imagen/medalla.png"
    },
    {
        type: 3,
        name: "Gold",
        css: "Gold",
        img: "../imagen/medalla.png"
    },
    {
        type: 4,
        name: "Platinum",
        css: "Platinum",
        img: "../imagen/medalla.png"
    },
    {
        type: 5,
        name: "Diamond",
        css: "Diamond",
        img: "../imagen/medalla.png"
    },
    {
        type: 6,
        name: "Normal",
        css: "Normal",
        img: "../imagen/medalla.png"
    }
];
let estado_subastas = [
    { id: "1", nombre: idioma['trans62_'] },
    { id: "2", nombre: idioma['trans63_'] },
    { id: "3", nombre: idioma['trans64_'] },
    { id: "4", nombre: idioma['trans67_'] }
]


var stepImg = 0;

//Validamos si hay informacion en la URL
getSubastaParams();

// Developer JDBC - inicio
function managerOpenModalSubastaNasbi($event) {
    __schemaSubasta = $event.data.item;
    stepImg = 0;

    if (__schemaSubasta.array_fotos.length < numLimitSliderImg) {
        let imgFaltantes = numLimitSliderImg - __schemaSubasta.array_fotos.length;
        let index = 0;

        do {
            let foto = __schemaSubasta.array_fotos[index];
            __schemaSubasta.array_fotos.push(foto);
            if (index < __schemaSubasta.array_fotos.length) {
                index++;
            } else {
                index = 0;
            }
        } while (__schemaSubasta.array_fotos.length < numLimitSliderImg);
    }
    let fotosselects = [];
    let imagesHTML = "";

    $('.subasta__nasbi__img__present').prop('src', __schemaSubasta.array_fotos[0].foto);
    $('.subasta__nasbi__img__present').prop('alt', __schemaSubasta.titulo);

    for (let index = 0; index < numLimitSliderImg; ++index) {

        let picture = __schemaSubasta.array_fotos[index];

        $('.subasta__nasbi__img__' + (index + 1)).prop('src', picture.foto);
        $('.subasta__nasbi__img__' + (index + 1)).prop('alt', __schemaSubasta.titulo);
    }

    $('.subasta__nasbi__img__1').click(0, presentImg);
    $('.subasta__nasbi__img__2').click(1, presentImg);
    $('.subasta__nasbi__img__3').click(2, presentImg);
    $('.subasta__nasbi__img__4').click(3, presentImg);

    // $('.subasta__nasbi__btnprev').click(-1, prevNextImg);
    // $('.subasta__nasbi__btnnext').click(1, prevNextImg);

    $('.subasta__nasbi__btnprev').off('click');
    $('.subasta__nasbi__btnprev').on('click', -1, prevNextImg)

    $('.subasta__nasbi__btnnext').off('click');
    $('.subasta__nasbi__btnnext').on('click', 1, prevNextImg)

    let labelStatus = estado_subastas.filter(f => f.id == __schemaSubasta.estado)[0].nombre

    // let labelStatus = "";
    // if (__schemaSubasta.estado * 1 == 1) {
    //     labelStatus = idioma['trans_126'];
    // } else {
    //     labelStatus = idioma['trans_127'];
    // }
    $('.info__subastas__estado').text(labelStatus);

    $('.subasta__nasbi__prev__name').text(__schemaSubasta.titulo);

    $('.subasta__nasbi__prev__valorcomercial').text(`${__schemaSubasta.precio_local_user_mask} ${__schemaSubasta.moneda_local_user}`);
    $('.subasta__nasbi__prev__valorsubasta').text(`${__schemaSubasta.precio_subasta_local_user_mask} ${__schemaSubasta.moneda_local_user}`);
    $('.subasta__nasbi__prev__participantes').text(__schemaSubasta.inscritos);

    __schemaSubasta.porcentaje *= 1;
    $('.subasta__nasbi__prev__porcentaje').css('width', __schemaSubasta.porcentaje + '%', 'important');
    $('.subasta__nasbi__prev__porcentaje').text(__schemaSubasta.porcentaje + " %");

    let item = __schemaSubasta;
    $('.subasta__nasbi__prev__btnInsc').off('click');
    $('.subasta__nasbi__prev__btnInsc').on('click', { item }, modalSubastaNasbiValidateAcceso);


    $('#modal-new-subastas').modal("show");
    if (__schemaSubasta.porcentaje < 100) {
        $('.texto_tooltip_aumentalo').text(idioma.trans406_) //para el tooltip de aumentalo ahora
    }
}

function presentImg($event) {
    stepImg = $event.data;
    $('.subasta__nasbi__img__present').prop('src', __schemaSubasta.array_fotos[stepImg].foto);
}
function prevNextImg($event) {
    if ($event.data > 0) {
        if (stepImg + 1 < numLimitSliderImg) {
            stepImg++;
        } else {
            stepImg = 0;
        }
    } else {
        if (stepImg - 1 >= 0) {
            stepImg--;
        } else {
            stepImg = numLimitSliderImg - 1;
        }
    }
    if (__schemaSubasta.array_fotos[stepImg]) $('.subasta__nasbi__img__present').prop('src', __schemaSubasta.array_fotos[stepImg].foto);
}

async function modalSubastaNasbiValidateAcceso($event) {


    if (!validarText(user)) {
        // Caso 1: Validar si el usuario NO esta logeado
        $('#modal-new-subastas').modal("hide");
        $('#modal-subastas-nologeado').modal('show');
    } else {
        if (bloquearFullAccess(user.uid)) {
            return presentAlert("", idioma['trans_309'], "info");
        }

        ///  if (user.empresa == 0) {
        // No soy una empresa
        // Caso 2: Validar mi saldo
        console.log($event.data.item, "mmmmmm info");

        let validar_tipo_user = await subasta_validacion_user____();
        if (!validar_tipo_user) {
            localStorage.setItem("mis_cuentas", ".sidenav_subastas");
            loadPage("mis-cuentas.php")
            return 0;
        }

        let esta_inscrito_subasta = await saber_si_esta_inscrito_en_subasta(user.uid, $event.data.item.id);
        if (!esta_inscrito_subasta) return presentAlertObject({ icon: 'error', text: idioma.trans_273 });

        __schemaSubasta = $event.data.item;

        let dataEnvio = {
            "data": {
                "uid": user.uid,
                "empresa": user.empresa,
                "tipo": __schemaSubasta.moneda
            }
        };

        let wallet = await getWalletByCoin(dataEnvio);
        if (wallet == null) {
            let __text = idioma['trans_114'];
            __text = __text.split('@@@').join(idioma['trans37_'].toLowerCase());
            $('.subasta__nasbi__sinsaldo').text(__text);

            $('#modal-new-subastas').modal("hide");

            $('#modal-subastas-logeado-sinsaldo').modal('show');

        } else if (wallet.status == "success") {

            $('#modal-new-subastas').modal("hide");

            let precioInscripcionSubasta = __schemaSubasta.porcentaje_entrada * 1;

            // Validar si tenemos saldo

            if (__schemaSubasta.moneda == "Nasbigold") {
                if (wallet.nasbicoin_gold == null) {
                    subastas_normal_nofound(__schemaSubasta, wallet);

                } else {
                    // Encapsular cuando el usuario no cuente con los fondos suficientes para pagar 2.9%
                    if (wallet.nasbicoin_gold.monto * 1 > precioInscripcionSubasta * 1) {
                        let __text = idioma['trans_116'];
                        __text = __text.split('$$$').join(__schemaSubasta.porcentaje_entrada_local_user_mask + ' ' + __schemaSubasta.moneda_local_user + ' / ' + __schemaSubasta.porcentaje_entrada_mask + ' ' + getLabelCoinByNameID(__schemaSubasta.moneda));
                        $('.subasta__nasbi__consaldo').html(__text);

                        $('.subasta__nasbi__consaldo__btn').off('click');
                        $('.subasta__nasbi__consaldo__btn').on('click', { wallet: wallet, schema: __schemaSubasta }, openModalSubastaNasbi);
                        $('#modal-subastas-logeado-consaldo').modal('show');

                    } else {

                        subastas_normal_nofound(__schemaSubasta, wallet);

                    }
                }


            } else if (__schemaSubasta.moneda == "Nasbiblue") {
                if (wallet.nasbicoin_blue == null) {
                    subastas_normal_nofound(__schemaSubasta, wallet);

                } else {
                    // Encapsular cuando el usuario no cuente con los fondos suficientes para pagar 2.9%
                    if (wallet.nasbicoin_blue.monto * 1 > precioInscripcionSubasta * 1) {
                        let __text = idioma['trans_116'];
                        __text = __text.split('$$$').join(__schemaSubasta.porcentaje_entrada_local_user_mask + ' ' + __schemaSubasta.moneda_local_user + ' / ' + __schemaSubasta.porcentaje_entrada_mask + ' ' + getLabelCoinByNameID(__schemaSubasta.moneda));
                        /*__text = __text.split('$$$').join(__schemaSubasta.porcentaje_entrada_mask + ' ' + getLabelCoinByNameID(__schemaSubasta.moneda));*/
                        $('.subasta__nasbi__consaldo').html(__text);

                        $('.subasta__nasbi__consaldo__btn').off('click');
                        $('.subasta__nasbi__consaldo__btn').on('click', { wallet: wallet, schema: __schemaSubasta }, openModalSubastaNasbi);
                        $('#modal-subastas-logeado-consaldo').modal('show');

                    } else {
                        subastas_normal_nofound(__schemaSubasta, wallet);

                    }
                }

            } else { }
        }
    }
}


function openModalSubastaNasbi($event) {
    console.log($event.data)
    let datos = $event.data;
    let subastaID = idioma['trans_96'];
    subastaID = subastaID.split('###').join(`${datos.schema.id} ${datos.schema.producto}`);
    $('.subastas__inscripcion__normal__id').text(subastaID);


    $('.subastas__inscripcion__normal__coin').prop('src', datos.schema.foto_portada);


    /*$('.subastas__inscripcion__normal__amounts').text(`${datos.schema.precio_local_user_mask} ${datos.schema.moneda_local_user} / ${datos.schema.precio_mask} ${datos.schema.moneda} `);*/
    $('.subastas__inscripcion__normal__amounts').text(`${datos.schema.precio_local_user_mask} ${datos.schema.moneda_local_user}`);
    // $('.subastas__inscripcion__normal__amounts__coin').prop('src', objectCoin[("" + datos.schema.moneda).toLowerCase()].img);


    $('.subastas__inscripcion__normal__inscritos__inf').text(`${datos.schema.inscritos}`);

    let __text = idioma['trans_123'];
    __text = __text.split('@@@').join(__schemaSubasta.porcentaje_entrada_local_user_mask + ' ' + getLabelCoinByNameID(datos.schema.moneda));
    $('.subasta__nasbi__valor__entrada').html(__text);


    let my_wallet_amount_coin = "";
    let my_wallet_coin = "";
    let my_wallet_usd = "";

    if (__schemaSubasta.moneda == "Nasbigold") {
        if (datos.wallet.nasbicoin_gold != null) {
            my_wallet_amount_coin = datos.wallet.nasbicoin_gold.monto_mask;
            my_wallet_coin = idioma['trans37_'].toLowerCase();
            my_wallet_usd = datos.wallet.nasbicoin_gold.monto_usd_mask + " USD";
        }
        datos.walletSelect = datos.wallet.nasbicoin_gold;

    } else if (__schemaSubasta.moneda == "Nasbiblue") {
        if (datos.wallet.nasbicoin_blue != null) {
            my_wallet_amount_coin = datos.wallet.nasbicoin_blue.monto_mask;
            my_wallet_coin = idioma['trans36_'].toLowerCase();
            my_wallet_usd = datos.wallet.nasbicoin_blue.monto_usd_mask + " USD";
        }
        datos.walletSelect = datos.wallet.nasbicoin_blue;

    } else { }

    let labelTextSaldo = idioma['trans_122'];
    labelTextSaldo = labelTextSaldo.split('$$$').join(my_wallet_amount_coin).split('###').join(my_wallet_coin);

    $('.label__mis__tickets__normal').html(labelTextSaldo);

    $('.subastas__inscripcion__normal__comprar').off('click');
    $('.subastas__inscripcion__normal__comprar').on('click', datos, validationSellNormal);

    $('.cant_tiquets_normal').val(1);

    $('#modal-inscribirse-normales').modal('show');
}

function validationSellNormal($event) {
    let datos = $event.data;
    let cant_tiquets = devolverNumero($('.cant_tiquets_normal').val());
    if (!validarNumero(cant_tiquets)) {
        $('#modal-subastas-error-compra').modal('show');
    } else {
        $(".spiner_inscribir_normal").show();
        comprarTiquetsNormales(cant_tiquets, datos);
    }
}

function comprarTiquetsNormales(cant_tiquets, datos) {
    let datosEnvio = {
        "data": {
            "id": datos.schema.id,
            "uid": user.uid,
            "empresa": user.empresa,
            "ticket": datos.schema.tipo,
            "cantidad": cant_tiquets,
            "cantidad_ticket": cant_tiquets,
            "address": datos.walletSelect.address
        }
    };
    let data_url = `${baseurl}/controllers/producto_subastas/?inscribir_subasta`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: datosEnvio,
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async result => {
            $(".spiner_inscribir_normal").hide();
            if (result["status"] == "success") {
                loadPage("mis-nasbi-descuentos.php")

            } else if (result["status"] == 'maxInscritos') {
                $('#modal-subastas-error-compra-maxInscritos').modal('show');

            } else if (result["status"] == 'tuSubasta') {
                $('#modal-subastas-error-compra-fail-tuSubasta').modal('show');

            } else {
                let validate_token = await erroresTokenEmpresa(result);
                if (!validate_token) subastas_normal_nofound(datos.schema, datos.wallet);

            }
        }, error: error => {
            $(".spiner_inscribir_normal").hide();
            console.log(error);
            $('#modal-subastas-error-compra-fail').modal('show');
        }
    });
}

function subastas_normal_nofound(__schemaSubasta = {}, wallet = {}) {
    if (__schemaSubasta.moneda == "Nasbigold") {
        let __text = idioma['trans_114'];
        __text = __text.split('@@@').join(idioma['trans37_'].toLowerCase());
        $('.subasta__nasbi__sinsaldo').text(__text);
        $('#modal-subastas-logeado-sinsaldo').modal('show');

    } else if (__schemaSubasta.moneda == "Nasbiblue") {
        let __text = idioma['trans_114'];
        __text = __text.split('@@@').join(idioma['trans36_'].toLowerCase());
        $('.subasta__nasbi__sinsaldo').text(__text);
        $('#modal-subastas-logeado-sinsaldo').modal('show');

    } else {
    }
}

async function managerOpenModalSubastaNasbiPremium($event) {
    miProducto = [];
    miProducto = $event.data.item;
    if (miProducto.array_fotos.length < numLimitSliderImg) {
        let imgFaltantes = numLimitSliderImg - miProducto.array_fotos.length;
        let index = 0;

        do {
            let foto = miProducto.array_fotos[index];
            miProducto.array_fotos.push(foto);
            if (index < miProducto.array_fotos.length) {
                index++;
            } else {
                index = 0;
            }
        } while (miProducto.array_fotos.length < numLimitSliderImg);
    }

    if (!validarText(user)) {
        // Caso 1: Validar si el usuario NO esta logeado
        $('#modal-subastas-nologeado').modal('show');
    } else {

        $('#modal-info-subastas-new').modal('show');


        let labelStatus = estado_subastas.filter(f => f.id == miProducto.estado)[0].nombre
        // if (miProducto.estado * 1 == 1) {
        //     labelStatus = idioma['trans_126'];
        // } else {
        //     labelStatus = idioma['trans_127'];
        // }
        $('.info__subastas__estado').text(labelStatus);

        $('.info__subastas__title').text(miProducto.titulo);

        $('.info__subastas__valor__real__amount').text(`${miProducto.precio_local_user_mask} ${miProducto.moneda_local_user}`);

        $('.info__subastas__participantes').text(miProducto.inscritos);
        $('.info__subastas__disponibles').text(miProducto.apostadores);

        let schemaImgsRow = "";
        $('.subasta__nasbi__img__present').prop('src', miProducto.array_fotos[0].foto);



        for (let index = 0; index < numLimitSliderImg; ++index) {
            let picture = miProducto.array_fotos[index];
            $('.subasta__premium__nasbi__img__' + (index + 1)).prop('src', picture.foto);
        }


        $('.subasta__premium__nasbi__img__1').click(0, presentImg);
        $('.subasta__premium__nasbi__img__2').click(1, presentImg);
        $('.subasta__premium__nasbi__img__3').click(2, presentImg);
        $('.subasta__premium__nasbi__img__4').click(3, presentImg);

        // // $('.subasta__premium__nasbi__btnprev').click(-1, prevNextImg);
        // // $('.subasta__premium__nasbi__btnnext').click(1, prevNextImg);

        $('.subasta__premium__nasbi__btnprev').off('click');
        $('.subasta__premium__nasbi__btnprev').on('click', -1, prevNextImg)

        $('.subasta__premium__nasbi__btnnext').off('click');
        $('.subasta__premium__nasbi__btnnext').on('click', 1, prevNextImg)


        miProducto.tipo *= 1;
        let clasificacionHTML = idioma['trans_128'];
        let clasificacionSchema = type_subastas[miProducto.tipo];
        clasificacionHTML = clasificacionHTML.split('@@@').join(clasificacionSchema.css).split('###').join(clasificacionSchema.name).split('$$$').join(clasificacionSchema.img);
        $('.info__subastas__clasificacion').html(clasificacionHTML);

        __schemaSubasta = miProducto;


        $('.info__subastas__inscribirse__btn').off('click');
        $('.info__subastas__inscribirse__btn').on('click', { item: __schemaSubasta }, openModalSubastaNasbiPremium);


        //  }else{
        //     console.log(idioma.trans_273);
        //     $('.trans_273').text(idioma.trans_273);
        //     $('#modal-subastas-error-compra-fail-insSubasta').modal('show');

        // }

    }
}
async function openModalSubastaNasbiPremium($event) {
    if (bloquearFullAccess(user.uid)) {
        return presentAlert("", idioma['trans_309'], "info");
    }


    let esta_inscrito_subasta = await saber_si_esta_inscrito_en_subasta(user.uid, $event.data.item.id);
    if (!esta_inscrito_subasta) return presentAlertObject({ icon: 'error', text: idioma.trans_273 });

    let validar_tipo_user = await subasta_validacion_user____();
    if (!validar_tipo_user) {
        localStorage.setItem("mis_cuentas", ".sidenav_subastas");
        loadPage("mis-cuentas.php")
        return 0;
    }

    // let esta_inscrito_subasta = await saber_si_esta_inscrito_en_subasta(user.uid, $event.data.item.id);
    // if (!esta_inscrito_subasta) return presentAlertObject({ icon: 'error', text: idioma.trans_273 });
    $('#modal-info-subastas-new').modal('hide');
    __schemaSubasta = $event.data.item;
    let dataEnvio = {
        "data": {
            "uid": user.uid,
            "empresa": user.empresa,
            "tipo": __schemaSubasta.moneda
        }
    };
    wallet = await getWalletByCoin(dataEnvio);
    /* console.log('walllet--------------------------->', wallet); */
    if (wallet == null) {
        let __text = idioma['trans_114'];
        __text = __text.split('@@@').join(idioma['trans37_'].toLowerCase());
        $('.subasta__nasbi__sinsaldo').text(__text);
        $('#modal-subastas-logeado-sinsaldo').modal('show');

    } else if (wallet.status == "success") {
        let precioInscripcionSubasta = __schemaSubasta.precio * 1;
        if (__schemaSubasta.moneda == "Nasbigold") {
            if (wallet.nasbicoin_gold == null) {
                subastas_normal_nofound(__schemaSubasta, wallet);
            } else {
                // Encapsular cuando el usuario no cuente con los fondos suficientes para pagar 2.9%
                if (wallet.nasbicoin_gold.monto * 1 > precioInscripcionSubasta * 1) {
                    inscribirse(__schemaSubasta);
                    $('#modal-inscribirse').modal("show");
                } else {
                    subastas_normal_nofound(__schemaSubasta, wallet);
                }
            }
        } else if (__schemaSubasta.moneda == "Nasbiblue") {
            if (wallet.nasbicoin_blue == null) {
                subastas_normal_nofound(__schemaSubasta, wallet);
            } else {
                // Encapsular cuando el usuario no cuente con los fondos suficientes para pagar 2.9%
                if (wallet.nasbicoin_blue.monto * 1 > precioInscripcionSubasta * 1) {
                    inscribirse(__schemaSubasta);
                    $('#modal-inscribirse').modal("show");
                } else {
                    subastas_normal_nofound(__schemaSubasta, wallet);
                }
            }
        } else {
            let __text = idioma['trans_114'];
            __text = __text.split('@@@').join(idioma['trans37_'].toLowerCase());
            $('.subasta__nasbi__sinsaldo').text(__text);
            $('#modal-subastas-logeado-sinsaldo').modal('show');
        }
    }

    // } else {
    //     presentAlert(idioma['_trans462'], idioma['_trans855'])
    // }

}
function inscribirse(miProducto) {
    if (validarText(user)) {
        getTiquets();
    } else {
        $('.divTickekss').hide();
    }
    let indicadorSubastas = idioma['trans_96'];
    indicadorSubastas = indicadorSubastas.split("###").join(`#${miProducto.id} ${miProducto.tipo_descripcion}`);

    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);
    console.log("------> miProducto: ", miProducto);

    $('.subastas__inscripcion__coin').prop('src', miProducto.foto_portada);

    $('.subastas__inscripcion__id').text(indicadorSubastas);

    $('.cant_tiquets').val(1);

    $('.subastas__inscripcion__amounts').text(`${miProducto.precio_local_user_mask} ${miProducto.moneda_local_user}`);
    //$('.subastas__inscripcion__amounts__coin').prop('src', objectCoin[("" + miProducto.moneda).toLowerCase()].img);

    $('.subastas__inscripcion__inscritos__inf').text(`${miProducto.inscritos} / ${miProducto.apostadores}`);

    $('.subastas__inscripcion__comprar').off('click');
    $('.subastas__inscripcion__comprar').on('click', { miProducto }, validationSell);
}
function validationSell($event) {
    miProducto = $event.data.miProducto;
    var cant_tiquets = devolverNumero($('.cant_tiquets').val());
    if (!validarNumero(cant_tiquets)) {
        $('#modal-subastas-error-compra').modal('show');
    } else {
        $(".spiner_comprar_entradas").show();
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
        data: { "data": dataTiquets },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $(".spiner_comprar_entradas").hide();
            if (success["status"] == "success") {
                loadPage("mis-nasbi-descuentos.php")

            } else if (success["status"] == 'maxInscritos') {
                $('#modal-subastas-error-compra-maxInscritos').modal('show');

            } else if (success["status"] == 'tuSubasta') {
                $('#modal-subastas-error-compra-fail-tuSubasta').modal('show');

            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) $('#modal-subastas-error-compra-nofound').modal('show');

            }
        }, error: error => {
            $(".spiner_comprar_entradas").hide();
            console.log(error);
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
        group: 1,
    };

    let data_url = baseurl + "/controllers/planes_nasbi/?tickets_usuario";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataTiquets },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async success => {

            $('.cant_tickets').empty();
            let html = "";
            if (success["status"] == "success") {

                let label__mis__tickets = `0 Tickets ${miProducto.tipo_descripcion}`;
                $.each(success["data"], (i, item) => {
                    if (item.plan == miProducto.tipo) {
                        console.log("====----> item: ", item);
                        console.log("====----> item: ", item);
                        console.log("====----> item: ", item);
                        html = `<p>Tienes ${item.cantidad} tickets ${item.nombre_plan} disponibles</p>`

                        label__mis__tickets = `${formatNumberInt(item.cantidad)} Tickets ${miProducto.tipo_descripcion}`;
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

function getSubastaParams() {
    let params_subasta = new URLSearchParams(location.search);
    let paramID = params_subasta.get('sub');
    let datosEnvio = {
        "data": {
            "id": paramID,
            "iso_code_2": paisOrigen.iso_code_2,
            "iso_code_2_money": iso_code_2_money,
        }
    };
    let data_url = `${baseurl}/controllers/producto_subastas/?subasta`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: datosEnvio,
        dataType: "json",
        success: result => {
            if (result['status'] == "success") {
                if (result.data.tipo * 1 >= 1 && result.data.tipo * 1 <= 5) {
                    //Subastas PREMIUM
                    managerOpenModalSubastaNasbiPremium({ "data": { "item": result.data } });
                } else if (result.data.tipo * 1 == 6) {
                    //Subastas NORMALES
                    managerOpenModalSubastaNasbi({ "data": { "item": result.data } });
                }
            }
        }, error: error => {
            console.log(error);
        }
    });
}


function saber_si_esta_inscrito_en_subasta(id_user, id_subasta) {
    return new Promise((resolve) => {
        let dataEnviar = {
            "uid": id_user,
            "subasta": id_subasta
        };
        $.ajax({
            type: 'POST',
            url: `${baseurl}/controllers/subastas/verificarInscrito.php`,
            data: dataEnviar,
            dataType: 'json',
            "headers": { 'x-api-key': user.token },
        }).done(async (res) => {
            if (res.status == 'success') {
                resolve(true);
            } else if (res.status == 'errorInscrito') {
                resolve(false);
            } else {
                let validate_token = await erroresTokenEmpresa(res);
                if (!validate_token) { }
            }
        }).fail((err) => {
            presentAlertObject({ icon: 'error', text: idioma.trans_04 });
            resolve(false);
        });
    });
}






function subasta_validacion_user____() {
    return new Promise(async (resolve) => {
        let estado_de_acceso_subasta = await validar_subasta_usuario(user);
        if (estado_de_acceso_subasta.opcion == 1) {
            resolve(true);
        } else {
            resolve(false)
        }
    });
}


//comentario
