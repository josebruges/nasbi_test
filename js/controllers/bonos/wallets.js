let wallets__schemaRecarga = {};
let wallet_usuario = {};
//cambio
function validarlogueado() {
    if (validarText(user)) {
        return true;
    } else {
        loadPage("index.php?s=0")
    }

}

function agregar_loading_ge_publi(clase) {
    let span_loading_ge = `<span class="spiner_modificar_publi">&nbsp;</span><span class="spinner-border spinner-border-sm spiner_modificar_publi" role="status" aria-hidden="true"></span>`
    $(clase).append(span_loading_ge);
}

function quitar_loading_ge_publi(clase) {
    $(clase).children(".spiner_modificar_publi").remove();
}


$(document).ready(($event) => {
    let wallet_bonos = localStorage.getItem("mis_bonos_subasta");
    if (validarlogueado()) {
        if (!validarText(wallet_bonos) || wallet_bonos == ".bonos_wallet") {
            $('.bonos_wallet').click();
            wallet__getdatabono();
        }
    }

    $('.nasbi_blue').hide('slow');
    $('.nasbi_gold').hide('slow');

    $(".bonos_wallet").click(($event) => {
        if (validarlogueado()) {
            localStorage.setItem("mis_bonos_subasta", ".bonos_wallet");
            wallet__getdatabono();
        }
    });

    $(".wallets__recarga__input__localmoney").keyup(async ($event) => {
        let amount_localmoney = parseFloat(devolverNumero($event.target.value));
        let amount_coin = amount_localmoney / wallets__schemaRecarga.dataExtra.precio_actual_local_user;
        let resultado_sin_notacion_cientifica = await scientificToDecimal(amount_coin);
        $(".wallets__recarga__input__coin").val(formatNumberCrypto(resultado_sin_notacion_cientifica));
    });

    $(".wallets__recarga__input__coin").keyup(async ($event) => {
        // console.log("$event.target.value*1: ", devolverNumero($event.target.value));
        let amount_coin = parseFloat(devolverNumero($event.target.value));
        let amount_localmoney = amount_coin * wallets__schemaRecarga.dataExtra.precio_actual_local_user;
        let resultado_sin_notacion_cientifica = await scientificToDecimal(amount_localmoney);
        $(".wallets__recarga__input__localmoney").val(formatNumberUsd(resultado_sin_notacion_cientifica));
    });
});

function wallet__openModalInfoOptionRecarga($event) {

    wallets__schemaRecarga = $event.data.item;

    console.log("[ 1 ] Params: ", wallets__schemaRecarga);
    $('#modal-info-opcion-recarga').modal('show');
    if (wallets__schemaRecarga.code == "blue") {
        $(".opc_recarga_blue").hide()
    } else {
        $(".opc_recarga_blue").show()
    }

    if (("" + wallets__schemaRecarga.code.toLowerCase()).includes("gold")) {
        let item = wallets__schemaRecarga;
        // Ocultado temporalmente // $('.modal-info-opcion-recarga-btn').off('click');
        // Ocultado temporalmente // $('.modal-info-opcion-recarga-btn').on('click', { item }, wallet__openModalCantRecarga);
    }

}

function wallet__openModalCantRecarga($event) {
    console.log("[ 2 ] Params: ", wallets__schemaRecarga);
    wallets__schemaRecarga = $event.data.item;

    console.log("wallets__schemaRecarga.dataExtra: ", wallets__schemaRecarga.dataExtra);
    console.log("wallets__schemaRecarga.dataExtra.nasbigold_local_user: ", wallets__schemaRecarga.dataExtra.precio_actual_local_user_mask);

    $('.wallets__recarga__input__localmoney').val(wallets__schemaRecarga.dataExtra.precio_actual_local_user_mask); // Valor de una COIN en mi moneda local.
    $('.wallets__recarga__localmoney').val(wallets__schemaRecarga.dataExtra.precio_actual_moneda_local);

    $('.wallets__recarga__input__coin').val(1);
    $('.wallets__recarga__coin').prop('src', wallets__schemaRecarga.ico);

    // Normal
    $('.modal-info-cantidad-recarga-btn__spinner').hide('slow');
    $(".modal-info-cantidad-recarga-btn").attr("disabled", false);

    $('#modal-info-cantidad-recarga').modal('show');

    $('.modal-info-cantidad-recarga-btn').off('click');
    $('.modal-info-cantidad-recarga-btn').on('click', { item: wallets__schemaRecarga }, wallet__managerPayU);
}

function wallet__managerPayU($event) {
    console.log("[ 3 ] Params: ", wallets__schemaRecarga);
    wallets__schemaRecarga = $event.data.item;

    // Loading
    $('.modal-info-cantidad-recarga-btn__spinner').show();
    $(".modal-info-cantidad-recarga-btn").attr("disabled", true);



    if (devolverNumero($('.wallets__recarga__input__localmoney').val()) <= 0 && devolverNumero($('.wallets__recarga__input__coin').val()) <= 0) {
        console.log("Valores incorrectos: [wallets__recarga__input__coin]", devolverNumero($('.wallets__recarga__input__coin').val()));
        console.log("Valores incorrectos: [wallets__recarga__input__localmoney]", devolverNumero($('.wallets__recarga__input__localmoney').val()));
        // Normal
        $('.modal-info-cantidad-recarga-btn__spinner').hide('slow');
        $(".modal-info-cantidad-recarga-btn").attr("disabled", false);

        return 0;
    }

    const datosEnvio = {
        "data": {
            "uid": user.uid,
            "empresa": user.empresa,

            "monto": devolverNumero($('.wallets__recarga__input__coin').val()),
            "moneda": wallets__schemaRecarga.dataExtra.moneda,

            "monto_local": devolverNumero($('.wallets__recarga__input__localmoney').val()),
            "moneda_local": wallets__schemaRecarga.dataExtra.precio_actual_moneda_local,

            "monto_usd": devolverNumero($('.wallets__recarga__input__coin').val()) * wallets__schemaRecarga.dataExtra.precio_actual
        }
    };
    console.log('dataEnviar', datosEnvio);

    $.ajax({
        type: "POST",
        url: `${baseurl}/controllers/nasbicoin/?generar_orden_compra`,
        data: datosEnvio,
        dataType: "json",
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {

        if (res.status == 'success') {
            res.data.description = idioma['trans_161'];

            console.log(res, "data");
            toPayU(res.data);

        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                // Normal
                $('.modal-info-cantidad-recarga-btn__spinner').hide('slow');
                $(".modal-info-cantidad-recarga-btn").attr("disabled", false);

                presentAlertObject({ icon: 'error', text: idioma['trans_160'] });
            }
        }
    }).fail((err) => {
        // Normal
        $('.modal-info-cantidad-recarga-btn__spinner').hide('slow');
        $(".modal-info-cantidad-recarga-btn").attr("disabled", false);
        presentAlertObject({ icon: 'error', text: idioma['trans_160'] });
    });
}

function wallet__getdatabono() {
    agregar_loading_ge_publi(".titulo_bonos");

    const dataEnviar = {
        "data": {
            "uid": user.uid,
            "empresa": user.empresa,
            "iso_code_2": paisOrigen.iso_code_2,
            "iso_code_2_money": iso_code_2_money,
        }
    };

    /* console.log('dataEnviar', dataEnviar); */

    $.ajax({
        type: "POST",
        url: `${baseurl}/controllers/nasbicoin/?wallet_usuario`,
        data: dataEnviar,
        dataType: "json",
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        quitar_loading_ge_publi(".titulo_bonos");

        if (res.status == 'success') {
            console.log(res, "data");
            wallet_usuario = res;
            wallet__tratardata(res);
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (validate_token) {
                console.log("mal");
            }

        }
    }).fail((err) => {
        quitar_loading_ge_publi(".titulo_bonos");
        presentAlertObject({ icon: 'error', text: idioma.trans107_ });
    });
}

function wallet__tratardata(data) {
    if (validarText(data.nasbicoin_blue)) {
        wallet__target_blue(data.nasbicoin_blue);
    }
    if (validarText(data.nasbicoin_gold)) {
        wallet__target_gold(data.nasbicoin_gold);
    }
}
function wallet__target_gold(data) {

    data.monto_mask = (data.monto_mask ? data.monto_mask : 0);
    data.monto_local_user_mask = (data.monto_local_user_mask ? data.monto_local_user_mask : 0);
    data.precio_actual_moneda_local = (data.precio_actual_moneda_local ? data.precio_actual_moneda_local : 0);

    $('.valoresdesaldo').empty();
    let valoresdesaldo = `
    <div class="wallet-saldo_bonos_content">
        <span class="wallet-saldo_bonos" data-toggle="tooltip" data-placement="bottom" title="${data.monto_mask} ${getLabelCoinByNameCropID(data.moneda)}">
            ${data.monto_mask}
        </span>
        <img loading="lazy" class="wallet-img_bonos" src="../imagen/icon_wallets/nasbi_gold.png" alt="Bonos - Nasbi.com"/>
    </div>`;

    $('.nasbi_gold').show('slow');

    $('.valoresdesaldo').append(valoresdesaldo);
    let item = {};
    let itemGold = {
        code: "gold",
        ico: "../imagen/icon_wallets/nasbi_gold.png",
        dataExtra: data
    };
    item = itemGold;
    $('.recargar_gold').off('click');
    $('.recargar_gold').on('click', { item }, wallet__openModalInfoOptionRecarga);
}
function wallet__target_blue(data) {
    data.monto_mask = (data.monto_mask ? data.monto_mask : 0);
    data.monto_local_user_mask = (data.monto_local_user_mask ? data.monto_local_user_mask : 0);
    data.precio_actual_moneda_local = (data.precio_actual_moneda_local ? data.precio_actual_moneda_local : 0);

    $('.valoresdesaldoblue').empty();
    let valoresdesaldo = `
    <div class="wallet-saldo_bonos_content">
        <span class="wallet-saldo_bonos" data-toggle="tooltip" data-placement="bottom" title="${data.monto_mask} ${getLabelCoinByNameCropID(data.moneda)}">
            ${data.monto_mask}
        </span>
        <img class="wallet-img_bonos" loading="lazy" src="../imagen/icon_wallets/nasbi_blue.png" alt="Bonos - Nasbi.com"/>
    </div>`;

    $('.nasbi_blue').show('slow');

    $('.valoresdesaldoblue').append(valoresdesaldo);

    let item = {};
    let itemBlue = {
        code: "blue",
        ico: "../imagen/icon_wallets/nasbi_gold.png",
        dataExtra: data
    };

    item = itemBlue;
    $('.recargar_blue').off('click');
    $('.recargar_blue').on('click', { item }, wallet__openModalInfoOptionRecarga);
}



function scientificToDecimal(num) {
    return new Promise((resolve) => {
        console.log("scientificToDecimal  numero ", num);
        var nsign = Math.sign(num);
        num = Math.abs(num);
        if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
            var zero = '0';
            let parts = String(num).toLowerCase().split('e');
            let e = parts.pop();
            let l = Math.abs(e);
            let sign = e / l;
            let coeff_array = parts[0].split('.');
            console.log("sign ", sign);
            if (sign === -1) {
                l = l - coeff_array[0].length;
                if (l < 0) {
                    num = coeff_array[0].slice(0, l) + '.' + coeff_array[0].slice(l) + (coeff_array.length === 2 ? coeff_array[1] : '');
                }
                else {
                    num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
                }
            }
            else {
                var dec = coeff_array[1];
                console.log("decccccc ", dec);
                if (dec)
                    l = l - dec.length;
                if (l < 0) {
                    num = coeff_array[0] + dec.slice(0, l) + '.' + dec;
                } else {
                    num = coeff_array.join('') + new Array(l + 1).join(zero);
                }
            }
        }
        console.log("scientificToDecimal ", nsign < 0 ? '-' + num : num)
        resolve(nsign < 0 ? '-' + num : num);
    })


}