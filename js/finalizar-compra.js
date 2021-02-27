let carrito, carrito_new;

function cargarPrimero() {
    carrito = JSON.parse(sessionStorage.getItem('finalizar-compra'));
    carrito_new = JSON.parse(sessionStorage.getItem('finalizar-compra-new'));

    console.log('carrito', carrito);
    console.log('\n\ncarrito_new', carrito_new);

    if (!validarText(carrito) || !validarText(carrito_new)) {
        return window.location.href = './'
    };
    reiniciarVariables();
    getDireccionesUsuario();
    llenarProducto();
}

let direccionesUsuario = [],
    direccionActiva = null,
    rutasDisponibles = null,
    rutaSeleccionada = null,
    walletActiva = null;

var datosDescuento = {
    porcentajeDecimal: 0,
    monto_usd: 0,
    monto_nasbiblue: 0,
    moneda: "Nasbiblue",

    monto_nasbigold: 0,
    monedagold: "Nasbigold",

    precioMonedaLocalEnUSD: 0, // Cuanto vale 1 USD en COP,
    moneda_local: "",
    monto_local_money: 0
};
var schemaDatosCombinado = {
    coin_monto: 0,
    coin_symbol: "Nasbigold",
    coin_priceUSD: 0,

    coin_porcentaje: 0,

    localmoney_monto: 0,
    localmoney_symbol: "",
    localmoney_priceUSD: ""
};
var schemeGlobalPreciosCarrito = {
    cantidad: 0,
    subtotal_usd: 0,
    symbol_localmoney: "",
    subtotal_localmoney: 0,
    precioMonedaLocalEnUSD: 0,
    subtotal_gold: 0,
    subtotal_blue: 0,
    nodoWallet: {}
};
const monedaShow = getLabelCoinByNameCropID("Nasbigold");
let coloresXtallas_stock = [];
function traerDataCarrito() {

    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    let url = `${baseurl}/controllers/carrito/?carrito_usuario`;

    dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            iso_code_2: paisusuario.iso_code_2,
            iso_code_2_money: iso_code_2_money
        }
    }

    $.ajax({
        type: 'POST',
        url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        console.log("la respuesta del carrito: ", res);
        if (res.status == "success") {
            for (let i = 0; i < res.data.length; i = i + 1) {
                coloresXtallas_stock.push({
                    id_producto: res.data[i]['id_producto'],
                    producto_titulo: res.data[i]['titulo'],
                    variaciones: []
                });
                if (res.data[i].variaciones.length > 0) {
                    for (let j = 0; j < res.data[i]["variaciones"].length; j = j + 1) {
                        coloresXtallas_stock[i]["variaciones"].push({ ...res.data[i]["variaciones"][j] });
                    }
                }
            }
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) { }
        }
    }).fail((error) => console.log("fallo al cargar carrito: ", error));
}

$(document).ready(($event) => {
    traerDataCarrito();
    // codigo nuevo para traer data de carrito a finalizar compra.

    // fin codigo nuevo para traer data de carrito a finalizar compra.

    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n");
    console.log(" #####[ schemeGlobalPreciosCarrito ]: ", schemeGlobalPreciosCarrito);
    console.log(" #####[ schemeGlobalPreciosCarrito ]: ", schemeGlobalPreciosCarrito);
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n");

    $('.finalizar_compra__inputscombinadospagos').hide();
    $('.finalizar_compra__input__cripto').val('');
    $('.finalizar_compra__input__localmoney').val('');
    $('.finalizar_compra__input__localmoney__two').val('');

    let precio_producto_nasbiblue = (schemeGlobalPreciosCarrito.subtotal_usd / 2) / schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_blue.precio_actual; // Para obtener cuanto es el 50% del valor del producto en BONOS DE DESCUENTO.
    if (precio_producto_nasbiblue > (schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_blue.monto * 1)) {
        // ¿Que pasa si el valor del producto supera el dinero que yo tengo?

        let stepsRangeUnd = 100 / precio_producto_nasbiblue; //Cuanto vale cada step con respecto al VALOR (50%) DEL ARTICULO.
        let porcentajeInt = parseInt(stepsRangeUnd * (schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_blue.monto * 1)); // Dado el valor de cada unidad hasta donde deberia ir el rango
        $('#finalizar_compra_rangodescuento').prop('max', porcentajeInt);
    }

    managerTotales($('#select-metodo-pago').val());
    $('#finalizar_compra_rangodescuento').prop('value', 0);

    if (schemeGlobalPreciosCarrito.subtotal_usd > 50) {
        $('.select-metodo-pago_combinado').show();
    } else {
        $('.select-metodo-pago_combinado').hide();
    }

    datosDescuento.moneda = schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_blue.moneda;
    datosDescuento.monedagold = schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.moneda;
    datosDescuento.moneda_local = schemeGlobalPreciosCarrito.subtotal_localmoney;
    datosDescuento.precioMonedaLocalEnUSD = schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD;

    $('.finalizar_compra__symbollocalmoney').text(schemeGlobalPreciosCarrito.symbol_localmoney);
    $('.finalizar_compra__symbolcoin').text(getLabelCoinByNameCropID(schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.moneda));

    $('#finalizar_compra_rangodescuento').change(function ($event) {
        console.log("$event: ", this.value);
        // Definir liimites rango cuando supera el maximo que es 50%
        $('.finalizar_compra_descuento').text(this.value / 2);
        console.log("carrito: ", carrito);

        // - Valor del articulo en Bonos de descuento:
        datosDescuento.porcentajeDecimal = (this.value / 2) / 100;
        console.log("Descuento en [porcentajeDecimal]: ", datosDescuento.porcentajeDecimal);
        datosDescuento.monto_usd = (schemeGlobalPreciosCarrito.subtotal_usd * datosDescuento.porcentajeDecimal);
        datosDescuento.monto_nasbiblue = (schemeGlobalPreciosCarrito.subtotal_blue * datosDescuento.porcentajeDecimal);//datosDescuento.monto_usd / schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_blue.precio_actual;

        datosDescuento.moneda = schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_blue.moneda;
        datosDescuento.monedagold = schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.moneda;

        datosDescuento.moneda_local = schemeGlobalPreciosCarrito.subtotal_localmoney;
        // Cuanto vale 1 USD en dolares
        datosDescuento.precioMonedaLocalEnUSD = schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD;


        console.log("Descuento en %: ", (this.value / 2));
        console.log("Descuento en %%: ", (this.value / 2) / 100);
        console.log("Descuento en [porcentajeDecimal]: ", datosDescuento.porcentajeDecimal);
        console.log("VALOR FULL en USD: ", schemeGlobalPreciosCarrito.subtotal_usd);
        console.log("Descuento en USD [monto_usd]: ", datosDescuento.monto_usd);
        console.log("Descuento en USD [monto_nasbiblue]: ", datosDescuento.monto_nasbiblue);

        if (datosDescuento.monto_nasbiblue > (schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_blue.monto * 1)) {
            // Validamos el monto maximo que puedo redimir en BONOS DE DESCUENTO
            console.log("ERROR - Quiero usar más de lo que tengo.");
            // let valor_producto_nasbiblue = schemeGlobalPreciosCarrito.subtotal_blue;
        }

        datosDescuento.monto_nasbigold = (schemeGlobalPreciosCarrito.subtotal_gold * datosDescuento.porcentajeDecimal);//datosDescuento.monto_usd / schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.precio_actual;
        // datosDescuento.monto_local_money = datosDescuento.monto_nasbiblue * schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_blue.precio_actual * datosDescuento.precioMonedaLocalEnUSD;
        datosDescuento.monto_local_money = (schemeGlobalPreciosCarrito.subtotal_localmoney * datosDescuento.porcentajeDecimal);
        console.log("datosDescuento.monto_local_money: ", datosDescuento.monto_local_money);


        managerTotales($('#select-metodo-pago').val());
    });

    $('#select-metodo-pago').prop('value', 1);
    managerTotales(1);
    $('#select-metodo-pago').change(function ($event) {
        console.log("Select metodo de pago: ", this.value);
        managerTotales(this.value);
    });

    $('.finalizar_compra__input__cripto').blur(function ($event) {
        console.log("valor ingresado en [ finalizar_compra__input__cripto') ]: ", devolverNumero(this.value));

        schemaDatosCombinado.coin_monto = devolverNumero(this.value);
        schemaDatosCombinado.coin_monto = (schemaDatosCombinado.coin_monto == undefined ? 0 : schemaDatosCombinado.coin_monto);

        // Validar que el valor ingresado no supere el costo del valor
        if (schemaDatosCombinado.coin_monto * 1 >= datosDescuento.total_nasbigold || schemaDatosCombinado.coin_monto * 1 < 0) {
            // Si ingreso un valor mayor o menor a los permitidos
            Toast('warning', " Por favor ingresa un valor entre 0 y menor a " + formatNumberCrypto(datosDescuento.total_nasbigold) + " " + getLabelCoinByNameCropID(schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.moneda) + ".");
            schemaDatosCombinado.coin_monto = datosDescuento.total_nasbigold;
            schemaDatosCombinado.localmoney_monto = 0;

            schemaDatosCombinado.localmoney_monto = 0;
            $('.finalizar_compra__input__localmoney').val('');
            $('.finalizar_compra__input__cripto').val('');
            $('.finalizar_compra__input__localmoney__two').val('');
        } else {
            if (!datosDescuento.total_nasbigold) {
                datosDescuento.total_nasbigold = 0;
            }
            schemeGlobalPreciosCarrito.subtotal_gold *= 1;
            schemaDatosCombinado.coin_monto *= 1;
            schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.precio_actual *= 1;

            console.log("\n\n\n\n\n @=========================@ ");
            let dolares_para_input_localmoney = (schemeGlobalPreciosCarrito.subtotal_usd -
                (
                    (schemaDatosCombinado.coin_monto * schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.precio_actual) +
                    (schemeGlobalPreciosCarrito.subtotal_usd * datosDescuento.porcentajeDecimal)
                )
            );

            let ingresado_localmoney = (schemaDatosCombinado.coin_monto * schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.precio_actual);
            let ingresado_localmoney_mas_descuento = ingresado_localmoney + (schemeGlobalPreciosCarrito.subtotal_usd * datosDescuento.porcentajeDecimal);

            schemaDatosCombinado.localmoney_monto = dolares_para_input_localmoney * schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD;

            console.log("\n\n\n");
            // Cuando se ingreso en dolares
            console.log(" \t [ Ingresado en dolares (USD) ]: ", ingresado_localmoney);
            console.log(" \t [ Ingresado en dolares + descuento (USD) ]: ", ingresado_localmoney_mas_descuento);

            console.log(" \t [ Descuento (USD) ]: ", (schemeGlobalPreciosCarrito.subtotal_usd * datosDescuento.porcentajeDecimal));
            console.log(" \t [ Descuento (COP) ]: ", (schemeGlobalPreciosCarrito.subtotal_localmoney * datosDescuento.porcentajeDecimal));

            // Cuando debo colocar en input cripto
            console.log(" \t [ Parte a completar (USD) ]: ", dolares_para_input_localmoney);
            console.log(" \t [ Parte a completar (COP) ]: ", schemaDatosCombinado.localmoney_monto);

            console.log(" \t [ Subtotal (USD) ]: ", schemeGlobalPreciosCarrito.subtotal_usd);

            if (dolares_para_input_localmoney < 5) {
                // El valor ingresado debe ser mayor a 5 USD

                console.log(` \t LOCAL MONEY / El monto ingresado es muy bajo por favor ingrese un valor superior a: ${formatNumberUsd(5 / schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.precio_actual)} ${schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.moneda}`);
                Toast('warning', `El monto ingresado es muy bajo por favor ingrese un valor superior a: ${formatNumberUsd(5 / schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.precio_actual)} ${getLabelCoinByNameCropID(schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.moneda)}`);

                $('.finalizar_compra__input__localmoney').val('');
                $('.finalizar_compra__input__cripto').val('');
                $('.finalizar_compra__input__localmoney__two').val('');

            } else {
                $('.finalizar_compra__input__localmoney').val(formatNumberUsd(schemaDatosCombinado.localmoney_monto));
            }

            console.log(" LOCAL MONEY / [ schemaDatosCombinado.coin_monto ]", schemaDatosCombinado.coin_monto);
            console.log(" @=========================@ \n\n\n\n\n");

        }
    });
    $('.finalizar_compra__input__localmoney').blur(function ($event) {
        console.log("valor ingresado en [ finalizar_compra__input__cripto') ]: ", $('.finalizar_compra__input__cripto').val());
        console.log("valor ingresado en [ finalizar_compra__input__localmoney ]: ", devolverNumero(this.value));

        schemaDatosCombinado.coin_monto = $('.finalizar_compra__input__cripto').val();
        schemaDatosCombinado.localmoney_monto = devolverNumero(this.value);
        schemaDatosCombinado.localmoney_monto = (schemaDatosCombinado.localmoney_monto == undefined ? 0 : schemaDatosCombinado.localmoney_monto);

        if (schemaDatosCombinado.localmoney_monto * 1 >= schemeGlobalPreciosCarrito.subtotal_localmoney || schemaDatosCombinado.localmoney_monto * 1 <= 0) {
            // Si ingreso un valor mayor o menor a los permitidos
            datosDescuento.total_localmoney = schemeGlobalPreciosCarrito.subtotal_localmoney;

            Toast('warning', " Por favor ingresa un valor entre 0 y menor a " + formatNumberUsd(datosDescuento.total_localmoney) + " " + schemeGlobalPreciosCarrito.symbol_localmoney);
            schemaDatosCombinado.coin_monto = 0;
            $('.finalizar_compra__input__cripto').val('');
            $('.finalizar_compra__input__localmoney__two').val('');
            $('.finalizar_compra__input__localmoney').val('');
        } else {
            if (!datosDescuento.total_localmoney) {
                datosDescuento.total_localmoney = 0;
            }

            schemeGlobalPreciosCarrito.subtotal_localmoney *= 1;
            schemaDatosCombinado.localmoney_monto *= 1;
            datosDescuento.precioMonedaLocalEnUSD *= 1;
            schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.precio_actual *= 1;


            console.log("\n\n\n\n\n @=========================@ ");
            let dolares_para_input_coin = (schemeGlobalPreciosCarrito.subtotal_usd -
                (
                    (schemaDatosCombinado.localmoney_monto / schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD) +
                    (schemeGlobalPreciosCarrito.subtotal_usd * datosDescuento.porcentajeDecimal)
                )
            );

            let ingresado_localmoney = (schemaDatosCombinado.localmoney_monto / schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD);
            let ingresado_localmoney_mas_descuento = (schemaDatosCombinado.localmoney_monto / schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD) + (schemeGlobalPreciosCarrito.subtotal_usd * datosDescuento.porcentajeDecimal);

            schemaDatosCombinado.coin_monto = dolares_para_input_coin / schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.precio_actual;


            console.log("\n\n\n");
            // Cuando se ingreso en dolares
            console.log(" \t [ Ingresado en dolares (USD) ]: ", ingresado_localmoney);
            console.log(" \t [ Ingresado en dolares + descuento (USD) ]: ", ingresado_localmoney_mas_descuento);

            console.log(" \t [ Descuento (USD) ]: ", (schemeGlobalPreciosCarrito.subtotal_usd * datosDescuento.porcentajeDecimal));
            console.log(" \t [ Descuento (COP) ]: ", (schemeGlobalPreciosCarrito.subtotal_localmoney * datosDescuento.porcentajeDecimal));

            // Cuando debo colocar en input cripto
            console.log(" \t [ Parte a completar (USD) ]: ", dolares_para_input_coin);
            console.log(" \t [ Parte a completar (CRYPO) ]: ", schemaDatosCombinado.coin_monto);

            console.log(" \t [ Subtotal (USD) ]: ", schemeGlobalPreciosCarrito.subtotal_usd);


            if (ingresado_localmoney < 5) {
                // El valor ingresado debe ser mayor a 5 USD
                console.log(` \t LOCAL MONEY / El monto ingresado es muy bajo por favor ingrese un valor superior a: ${formatNumberUsd(5 * schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD)} ${schemeGlobalPreciosCarrito.symbol_localmoney}`);
                Toast('warning', `El monto ingresado es muy bajo por favor ingrese un valor superior a: ${formatNumberUsd(5 * schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD)} ${schemeGlobalPreciosCarrito.symbol_localmoney}`);

                $('.finalizar_compra__input__localmoney').val('');
                $('.finalizar_compra__input__cripto').val('');
                $('.finalizar_compra__input__localmoney__two').val('');

            } else {
                $('.finalizar_compra__input__cripto').val(formatNumberCrypto(schemaDatosCombinado.coin_monto));

                let montoCompletarMonedaLocalNew = schemeGlobalPreciosCarrito.subtotal_localmoney - (schemaDatosCombinado.localmoney_monto + (schemeGlobalPreciosCarrito.subtotal_localmoney * datosDescuento.porcentajeDecimal));
                if (montoCompletarMonedaLocalNew > 0) {
                    console.log(" LOCAL MONEY / [ montoCompletarMonedaLocalNew ]", montoCompletarMonedaLocalNew);
                    $('.finalizar_compra__input__localmoney__two').val(formatNumberUsd(montoCompletarMonedaLocalNew));
                } else {
                    // Hacer alert informativo error valor negati
                    $('.finalizar_compra__input__localmoney').val('');
                    $('.finalizar_compra__input__cripto').val('');
                    $('.finalizar_compra__input__localmoney__two').val('');
                    Toast('warning', `Por favor verifique el monto ingresado.`);
                }
            }
            console.log(" LOCAL MONEY / [ schemaDatosCombinado.coin_monto ]", schemaDatosCombinado.coin_monto);
            console.log(" @=========================@ \n\n\n\n\n");
        }
    });
    $('.finalizar_compra__input__localmoney__two').blur(function ($event) {
        console.log("valor ingresado en [ finalizar_compra__input__cripto') ]: ", $('.finalizar_compra__input__cripto').val());
        console.log("valor ingresado en [ finalizar_compra__input__localmoney ]: ", devolverNumero(this.value));

        schemaDatosCombinado.coin_monto = $('.finalizar_compra__input__cripto').val();
        schemaDatosCombinado.localmoney_monto = devolverNumero(this.value);
        schemaDatosCombinado.localmoney_monto = (schemaDatosCombinado.localmoney_monto == undefined ? 0 : schemaDatosCombinado.localmoney_monto);

        if (schemaDatosCombinado.localmoney_monto * 1 >= schemeGlobalPreciosCarrito.subtotal_localmoney || schemaDatosCombinado.localmoney_monto * 1 <= 0) {
            // Si ingreso un valor mayor o menor a los permitidos
            datosDescuento.total_localmoney = schemeGlobalPreciosCarrito.subtotal_localmoney;

            Toast('warning', " Por favor ingresa un valor entre 0 y menor a " + formatNumberUsd(datosDescuento.total_localmoney) + " " + schemeGlobalPreciosCarrito.symbol_localmoney);
            schemaDatosCombinado.coin_monto = 0;
            $('.finalizar_compra__input__cripto').val('');
            $('.finalizar_compra__input__localmoney__two').val('');
            $('.finalizar_compra__input__localmoney__two').val('');
        } else {
            if (!datosDescuento.total_localmoney) {
                datosDescuento.total_localmoney = 0;
            }

            schemeGlobalPreciosCarrito.subtotal_localmoney *= 1;
            schemaDatosCombinado.localmoney_monto *= 1;
            datosDescuento.precioMonedaLocalEnUSD *= 1;
            schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.precio_actual *= 1;


            console.log("\n\n\n\n\n @=========================@ ");
            let dolares_para_input_coin = (schemeGlobalPreciosCarrito.subtotal_usd -
                (
                    (schemaDatosCombinado.localmoney_monto / schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD) +
                    (schemeGlobalPreciosCarrito.subtotal_usd * datosDescuento.porcentajeDecimal)
                )
            );

            let ingresado_localmoney = (schemaDatosCombinado.localmoney_monto / schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD);
            let ingresado_localmoney_mas_descuento = (schemaDatosCombinado.localmoney_monto / schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD) + (schemeGlobalPreciosCarrito.subtotal_usd * datosDescuento.porcentajeDecimal);

            schemaDatosCombinado.coin_monto = dolares_para_input_coin / schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.precio_actual;


            console.log("\n\n\n");
            // Cuando se ingreso en dolares
            console.log(" \t [ Ingresado en dolares (USD) ]: ", ingresado_localmoney);
            console.log(" \t [ Ingresado en dolares + descuento (USD) ]: ", ingresado_localmoney_mas_descuento);

            console.log(" \t [ Descuento (USD) ]: ", (schemeGlobalPreciosCarrito.subtotal_usd * datosDescuento.porcentajeDecimal));
            console.log(" \t [ Descuento (COP) ]: ", (schemeGlobalPreciosCarrito.subtotal_localmoney * datosDescuento.porcentajeDecimal));

            // Cuando debo colocar en input cripto
            console.log(" \t [ Parte a completar (USD) ]: ", dolares_para_input_coin);
            console.log(" \t [ Parte a completar (CRYPO) ]: ", schemaDatosCombinado.coin_monto);

            console.log(" \t [ Subtotal (USD) ]: ", schemeGlobalPreciosCarrito.subtotal_usd);


            if (ingresado_localmoney < 5) {
                // El valor ingresado debe ser mayor a 5 USD
                console.log(` \t LOCAL MONEY / El monto ingresado es muy bajo por favor ingrese un valor superior a: ${formatNumberUsd(5 * schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD)} ${schemeGlobalPreciosCarrito.symbol_localmoney}`);
                Toast('warning', `El monto ingresado es muy bajo por favor ingrese un valor superior a: ${formatNumberUsd(5 * schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD)} ${schemeGlobalPreciosCarrito.symbol_localmoney}`);

                $('.finalizar_compra__input__localmoney__two').val('');
                $('.finalizar_compra__input__cripto').val('');
                $('.finalizar_compra__input__localmoney__two').val('');

            } else {
                $('.finalizar_compra__input__cripto').val(formatNumberCrypto(schemaDatosCombinado.coin_monto));

                let montoCompletarMonedaLocalNew = schemeGlobalPreciosCarrito.subtotal_localmoney - (schemaDatosCombinado.localmoney_monto + (schemeGlobalPreciosCarrito.subtotal_localmoney * datosDescuento.porcentajeDecimal));
                if (montoCompletarMonedaLocalNew > 0) {
                    console.log(" LOCAL MONEY / [ montoCompletarMonedaLocalNew ]", montoCompletarMonedaLocalNew);
                    $('.finalizar_compra__input__localmoney').val(formatNumberUsd(montoCompletarMonedaLocalNew));
                } else {
                    // Hacer alert informativo error valor negati
                    $('.finalizar_compra__input__localmoney').val('');
                    $('.finalizar_compra__input__cripto').val('');
                    $('.finalizar_compra__input__localmoney__two').val('');
                    Toast('warning', `Por favor verifique el monto ingresado.`);
                }
            }
            console.log(" LOCAL MONEY / [ schemaDatosCombinado.coin_monto ]", schemaDatosCombinado.coin_monto);
            console.log(" @=========================@ \n\n\n\n\n");
        }
    });

    $('.text_codigo_regalo_').blur(($event) => {
        if (validarText($event.target.value)) {
            presentAlertObject({ icon: 'error', text: idioma.trans450_ });
            $('.text_codigo_regalo_').val("");
        }
    });

    $('.to_miscompras_mis_cuentas').click(($event) => {
        localStorage.setItem("mis_cuentas", ".sidenav_compras");
        loadPage("mis-cuentas.php")
    });
});
function managerTotales(valueSelected = 2) {
    if (valueSelected == 1) {
        // Paga solo con saldo dorado
        $('.finalizar_compra__inputscombinadospagos').hide('slow');
        $('.finalizar_compra__input__cripto').val('');
        $('.finalizar_compra__input__localmoney').val('');
        convertToSaldoDorado();

    } else if (valueSelected == 2) {
        // Paga solo con tu moneda local
        convertToLocalMoney();

    } else if (valueSelected == 3) {
        // Pago combiado
        console.log("------> paso por combinadoooo");
        convertToCombinado();

    } else {

    }
}

function agregar_loading_ge_publi_finalizar_com(clase) {
    let span_loading_ge = `<span class="spiner_modificar_publi">&nbsp;</span><span class="spinner-border spinner-border-sm spiner_modificar_publi" role="status" aria-hidden="true"></span>`
    $(clase).append(span_loading_ge);
    $(clase).prop("disabled", true);
}

function quitar_loading_ge_publi_finalizar_com(clase) {
    $(clase).children(".spiner_modificar_publi").remove();
    $(clase).prop("disabled", false);
}



function reiniciarVariables() {
    direccionesUsuario = [];
    direccionActiva = null;
    rutasDisponibles = null;
    rutaSeleccionada = null;
    $('.__pagar').off('click');
    $('.__pagar').on('click', pagarCarrito);
}

function xgetDireccionesUsuario() {
    $('.__vermisdirecciones').css('margin-top', '0px');
    $('.__vermisdirecciones').html(`${idioma.trans61} <img src="../imagen/edit.png">`);
    direccionVendedor();
    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa
        }
    }
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/direcciones/?direcciones_usuario`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {

        console.log("\n\n\n\n\n----*> información: ", res, "\n\n\n\n\n");

        $('.__vermisdirecciones').off('click');

        $('.__btncreardireccion').off('click');
        $('.__btncreardireccion').on('click', crearDireccion);
        if (res.status == 'success' && res.cantidad > 0) {
            direccionesUsuario = res.data;
            direccionesUsuario.map((data) => {
                paisesJSON = JSON.parse(localStorage.getItem('paises'));
                data.pais = paisesJSON.filter(datos => datos.country_id == data.pais)[0];
                data.departamento = data.pais.departamento.filter(datos => datos.zone_id == data.departamento)[0];
                delete (data.pais.departamento);
                return data;
            });
            direccionActiva = direccionesUsuario.filter(data => data.activa == 1)[0];

            console.log("------+> [ X - direccionActiva ]: ", direccionActiva);
            console.log("------+> [ X - direccionActiva ]: ", direccionActiva);
            console.log("------+> [ X - direccionActiva ]: ", direccionActiva);
            console.log("------+> [ X - direccionActiva ]: ", direccionActiva);
            console.log("------+> [ X - direccionActiva ]: ", direccionActiva);
            console.log("------+> [ X - direccionActiva ]: ", direccionActiva);
            console.log("------+> [ X - direccionActiva ]: ", direccionActiva);
            console.log("------+> [ X - direccionActiva ]: ", direccionActiva);
            console.log("------+> [ X - direccionActiva ]: ", direccionActiva);
            console.log("------+> [ X - direccionActiva ]: ", direccionActiva);
            console.log("------+> [ X - direccionActiva ]: ", direccionActiva);
            console.log("------+> [ X - direccionActiva ]: ", direccionActiva);

            $('.__pais').html(direccionActiva.pais.pais_name);
            $('.__departamento').html(direccionActiva.departamento.name);
            $('.__ciudad').html(direccionActiva.ciudad);
            $('.__direccion').html(direccionActiva.direccion);
            $('.__zip').html(direccionActiva.codigo_postal);
            $('.__vermisdirecciones').off('click');
            $('.__vermisdirecciones').on('click', abrirDirecciones);
            // llenarDirecciones();

            // if (carrito.tipo_envio != 2) $('.__rutasenvio').empty();
            // if (carrito.moneda == carrito.moneda_local && carrito.tipo_envio == 2) rutasEnvioShippo();

            if (carrito.moneda != carrito.moneda_local) {
                nasbiCoinsUser({ moneda: carrito.moneda }).then((wallet) => {
                    if (!wallet) return presentAlertObject({ icon: 'error', text: idioma.trans85 });
                    let moneda = "nasbicoin_gold";//carrito.moneda.split('Nasbi').join('nasbicoin_');
                    console.log(wallet, 'moneda', moneda, wallet.data[moneda]);
                    walletActiva = wallet.data[moneda];
                    console.log("--------+> [ 492 / wallet ]: ", wallet);
                    console.log("--------+> [ 492 / wallet ]: ", wallet);
                    console.log("--------+> [ 492 / wallet ]: ", wallet);
                    console.log("--------+> [ 492 / wallet ]: ", wallet);
                    console.log("--------+> [ 492 / wallet ]: ", wallet);
                    // if (carrito.tipo_envio == 2) rutasEnvioShippo();
                });
            }
            // else {

            //     $('.__vermisdirecciones').html(`${idioma.trans14} <img src="../imagen/edit.png">`);
            //     $('.__vermisdirecciones').css('margin-top', '100px');
            //     $('.__vermisdirecciones').off('click');
            //     $('.__vermisdirecciones').on('click', crearDireccion);
            // }
        } else {
            // $('.__rutasenvio').empty();
            // $('.__vermisdirecciones').html(`${idioma.trans14} <img src="../imagen/edit.png">`);
            // $('.__vermisdirecciones').css('margin-top', '100px');
            // $('.__vermisdirecciones').off('click');
            // $('.__vermisdirecciones').on('click', crearDireccion);
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                $('.__vermisdirecciones').html(idioma.trans14);
                $('.__vermisdirecciones').on('click', crearDireccion);
            }

        }

    }).fail((err) => {

        console.log("\n\n\n\n\n----*> información: ", err, "\n\n\n\n\n");

        presentAlertObject({ icon: 'error', text: idioma.trans78 });
        // $('.__rutasenvio').empty();
        $('.__vermisdirecciones').html(`${idioma.trans14} <img src="../imagen/edit.png">`);
        $('.__vermisdirecciones').css('margin-top', '100px');
        $('.__vermisdirecciones').on('click', crearDireccion);
    });
}
function getDireccionesUsuario() {
    console.log('user', user);
    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa
        }
    }
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/direcciones/?direcciones_usuario`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        console.log('res', res);
        $('.__vermisdirecciones').off('click');
        $('.__btncreardireccion').off('click');
        $('.__btncreardireccion').on('click', crearDireccion);
        if (res.status == 'success' && res.cantidad > 0) {
            direccionesUsuario = res.data;
            direccionesUsuario.map((data) => {
                let paisesJSON_ven = JSON.parse(localStorage.getItem('paises'));
                data.pais = paisesJSON_ven.filter(datos => datos.country_id == data.pais)[0];
                data.departamento = data.pais.departamento.filter(datos => datos.zone_id == data.departamento)[0];
                delete (data.pais.departamento);
                return data;
            });
            direccionActiva = direccionesUsuario.filter(data => data.activa == 1)[0];
            let direcciones_residencia = `${direccionActiva.direccion} - ${direccionActiva.ciudad} - ${direccionActiva.departamento.name} - ${direccionActiva.pais.pais_name}`;
            $('.__pais').html(direcciones_residencia.toUpperCase());
            // $('.__pais').html(direccionActiva.pais.pais_name);
            // $('.__departamento').html(direccionActiva.departamento.name);

            // $('.__ciudad').html(direccionActiva.ciudad);
            // $('.__direccion').html(direccionActiva.direccion);
            // $('.__zip').html(direccionActiva.codigo_postal);
            $('.__vermisdirecciones').html(idioma.trans13);
            $('.__vermisdirecciones').on('click', abrirDirecciones);
            llenarDirecciones();
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                $('.__vermisdirecciones').html(idioma.trans14);
                $('.__vermisdirecciones').on('click', crearDireccion);
            }

        }

    }).fail((err) => {
        presentAlertObject({ icon: 'error', text: idioma.trans78 });
    });
}

function abrirDirecciones() {
    if (direccionesUsuario.length <= 0) return 0;
    $('#modal-direcciones').modal('show');
    llenarDirecciones();
}

function llenarDirecciones() {
    if (direccionesUsuario.length <= 0) return 0;
    if (direccionesUsuario.length >= 3) $('.__btncreardireccion').hide();
    $('.__alldirecciones').empty();
    let activa, butonActivar = false;
    for (const x in direccionesUsuario) {
        activa = direccionesUsuario[x].activa == 1 ? `<span class="text-primary">${idioma.trans21}</span>` : `<span class="text-secondary inct">${idioma.trans22}</span>`;
        butonActivar = direccionesUsuario[x].activa == 1 ? `<a href="#" class="card-link __diruser"></a>` : `<button href="#" class="card-link btnact __diruser">${idioma.trans31}</button>`;
        $('.__alldirecciones').append(`
            <div class="card-body card-direct col-lg-4">
                <h4 class="card-title">${idioma.trans18}</h4>
                <p class="card-text text-modal-direcciones">${idioma.trans15}: <span>${direccionesUsuario[x].pais.pais_name}</span></p>
                <p class="card-text text-modal-direcciones">${idioma.trans16}: <span>${direccionesUsuario[x].departamento.name}</span></p>
                <p class="card-text text-modal-direcciones">${idioma.trans17}: <span>${direccionesUsuario[x].ciudad}</span></p>
                <p class="card-text text-modal-direcciones">${idioma.trans18}: <span>${direccionesUsuario[x].direccion}</span></p>
                <p class="card-text text-modal-direcciones">${idioma.trans19}: <span>${direccionesUsuario[x].codigo_postal}</span></p>
                <p class="card-text text-modal-direcciones">${idioma.trans20}: <span>${activa}</span></p>
                ${butonActivar}
            </div>
        `);
        $('.__diruser').eq(x).off('click');
        $('.__diruser').eq(x).on('click', { direccion: direccionesUsuario[x] }, activardireccion);
    }

}

function crearDireccion() {
    if (direccionesUsuario.length >= 3) return 0;
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    $('.__paisnewdireccion').val(paisusuario.pais_name).prop('disabled', true);
    cityInput(paisusuario, '__ciudadnewdireccion');
    $('.__divdepnewdireccion').html(`
        <select class="form-control row-select-dir-compra  __depnewdireccion select-plataforma"></select>
        <p>${idioma.trans16}</p>
    `);
    $('.__depnewdireccion').empty();
    let htmloptionsdep = `<option value="0">${idioma.trans208_}</option>`;
    for (const dep of paisusuario.departamento) { if (dep.zone_id != "") { htmloptionsdep += `<option value="${dep.zone_id}">${dep.name}</option>`; } }
    $('.__depnewdireccion').html(htmloptionsdep);
    $('.__depnewdireccion').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false
    });
    $('.__depnewdireccion').off('changed.bs.select');
    $('.__depnewdireccion').on('changed.bs.select', e => {
        $('.__ciudadnewdireccion').val('');
        $('.__dirnewdireccion').val('');
        $('.__codigopostalnewdireccion').val('');
    });
    $('.__dirnewdireccion').off('change');
    $('.__dirnewdireccion').on('change', buscarPostalMisCodeEnvio);
    $('#modal-direcciones').modal('hide');
    $('#modal-direcciones-crear').modal('show');
    $('.__save_detalles_envio').off('click');
    $('.__save_detalles_envio').on('click', guardarDireccion);

}

function buscarPostalMisCodeEnvio() {
    var pais = $('.__paisnewdireccion').val();
    var estado = $('.__depnewdireccion option:selected').text();
    var ciudad = $('.__ciudadnewdireccion').val();
    var direccion = $('.__dirnewdireccion').val();
    if (validarText(pais) == true && validarText(estado) == true && validarText(ciudad) == true && validarText(direccion) == true) {
        direccion = direccion.replace("#", "%23");
        var address = pais + ',' + estado + ',' + ciudad + ',' + direccion;
        $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCMeqStSqC4lq01HX9yfjqAD8eNHHlWWac', function (data) {
            if (data) {
                var postal_code = '';
                if (data.results) {
                    for (var i = 0; i < data.results[0].address_components.length; i++) {
                        if (data.results[0].address_components[i].types[0] === 'postal_code') {
                            postal_code = data.results[0].address_components[i].long_name;
                        }
                    }
                }
                $('.__codigopostalnewdireccion').val(postal_code);
            }
        });
    }
}

var autocomplete;
function cityInput(pais, classcity, tipo = 'dir') {
    let input = document.getElementsByClassName(classcity)[0];

    let options = {
        types: ['(cities)'],
        componentRestrictions: { country: pais._id }
    };

    console.log('pais', input, options);

    autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    console.log('autocomplete', autocomplete);
    consultagoogleActualInput(classcity);
}

function consultagoogleActualInput(classcity) {
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
        setTimeout(function () {
            var container = document.getElementsByClassName('pac-container-actual')[0];
            container.addEventListener('touchend', function (e) {
                e.stopImmediatePropagation();
            });
        }, 500);
    }

    autocomplete.addListener('place_changed', () => {
        var places = autocomplete.getPlace();
        if (places) {
            setTimeout(() => {
                $('.' + classcity).val(places.name);
            }, 300)
        }
    }, (err) => {
        let error = err;
    });
}

async function guardarDireccion() {
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    let departamento = $('.__depnewdireccion')[1].value;
    let ciudad = $('.__ciudadnewdireccion').val();
    let direccion = $('.__dirnewdireccion').val();
    let codigopostal = $('.__codigopostalnewdireccion').val();
    let activa = $('.__activanewdireccion').is(':checked') == true ? 1 : 0;
    let latitud;
    let longitud;

    if (!validarText(paisusuario)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo pais' });
    if (!validarNumero(departamento)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo departamento' });
    if (!validarText(ciudad)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo ciudad' });
    if (!validarText(autocomplete)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo ciudad' });
    if (!validarText(direccion)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo dirección' });
    if (!validarText(codigopostal)) return presentAlertObject({ icon: 'error', text: 'Por favor completa el campo código postal' });

    departamento = paisusuario.departamento.filter(datos => datos.zone_id == departamento)[0];
    console.log(paisusuario.departamento);
    console.log(departamento);

    if (!autocomplete.getPlace()) {
        let __pais = $('.__paisnewdireccion').val();
        let __estado = $('.__depnewdireccion option:selected').text();
        let __ciudad = $('.__ciudadnewdireccion').val();
        let latitud_longitud = await obtener_latitud_longitud(__pais, __estado, __ciudad);
        if (!validarText(latitud_longitud)) return presentAlertObject({ icon: 'error', text: idioma.trans457_ });
        latitud = latitud_longitud.lat;
        longitud = latitud_longitud.lng;
    } else {
        console.log("mmmmmmmmm poraqui");
        latitud = autocomplete.getPlace().geometry.location.lat();
        longitud = autocomplete.getPlace().geometry.location.lng();

    }

    agregar_loading_ge_publi_finalizar_com(".__save_detalles_envio");
    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            pais_isocode2: paisusuario.iso_code_2,
            iso_code_2_money: iso_code_2_money,
            pais: paisusuario.country_id,
            departamento: departamento.zone_id,
            departamento_isocode2: departamento.code.split('-')[1],
            ciudad,
            latitud: latitud,
            longitud: longitud,
            codigo_postal: codigopostal,
            direccion,
            activa
        }
    }
    console.log('dataEnviar', dataEnviar);
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/direcciones/?crear`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        quitar_loading_ge_publi_finalizar_com(".__save_detalles_envio");
        $('#modal-direcciones-crear').modal('hide');
        getDireccionesUsuario();
        if (res.status == 'success') {
            presentAlertObject({ icon: 'success', text: idioma.trans53_ });
        } else if (res.status == 'maxDirecciones') {
            presentAlertObject({ icon: 'warning', text: idioma.trans54_ });
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) presentAlertObject({ icon: 'error', text: idioma.trans132_ });

        }
    }).fail((err) => {
        quitar_loading_ge_publi_finalizar_com(".__save_detalles_envio");
        $('#modal-direcciones-crear').modal('hide');
        presentAlertObject({ icon: 'error', text: idioma.trans_04 });
    });
}

function activarCondicionProducto(e) {
    let condicion = e.data.condicion;
    console.log('e', e)
    $('.card-condicion').removeClass('activo');
    $('.__card' + condicion.id).addClass('activo');
    $(`#garantia${condicion.id}_yes`).prop('checked', true);
}
function activardireccion(dir) {
    let datadireccion = dir.data.direccion;


    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            id: datadireccion.id
        }
    }

    $('.ventas_list_nodata').show("slow");

    let data_url = baseurl + "/controllers/direcciones/?activar";
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        if (res.status == 'success') {
            getDireccionesUsuario();
            return presentAlertObject({ icon: 'info', text: idioma.trans52_ });

        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) return presentAlertObject({ icon: 'error', text: idioma.trans51_ });


        }

    }).fail((err) => {
        return presentAlertObject({ icon: 'error', text: idioma.trans51_ });

    });


}

function llenarProducto() {

    console.log("\n\n\n\n\n\n\n\n\n");
    console.log(" [ carrito_new ]: ", carrito_new);
    console.log(" [ carrito_new.dataTotales.nodoWallet.nasbicoin_gold ]: ", carrito_new.dataTotales.nodoWallet.nasbicoin_gold);
    console.log(" [ carrito_new.dataTotales.nodoWallet.nasbicoin_gold.moneda ]: ", carrito_new.dataTotales.nodoWallet.nasbicoin_gold.moneda);

    let moneda = getLabelCoinByNameCropID(carrito_new.dataTotales.nodoWallet.nasbicoin_gold.moneda);

    schemeGlobalPreciosCarrito.symbol_localmoney = carrito_new.data[0].moneda.toUpperCase();
    console.log(" [ moneda ]: ", moneda);
    console.log(" [ moneda ]: ", moneda);
    console.log(" [ moneda ]: ", moneda);
    console.log(" [ moneda ]: ", moneda);
    carrito_new.data.forEach((item) => {
        schemeGlobalPreciosCarrito.cantidad += item.cantidad;

        schemeGlobalPreciosCarrito.subtotal_usd += item.precio_usd_total;
        schemeGlobalPreciosCarrito.subtotal_localmoney += item.precio;

        item.subtotal_gold = item.precio_usd_total / carrito_new.dataTotales.nodoWallet.nasbicoin_gold.precio_actual;
        item.subtotal_blue = item.precio_usd_total / carrito_new.dataTotales.nodoWallet.nasbicoin_blue.precio_actual;

        schemeGlobalPreciosCarrito.precioMonedaLocalEnUSD = (item.precio / item.precio_usd_total);

        schemeGlobalPreciosCarrito.subtotal_gold = carrito_new.dataTotales.total_usd / carrito_new.dataTotales.nodoWallet.nasbicoin_gold.precio_actual;
        schemeGlobalPreciosCarrito.subtotal_blue = carrito_new.dataTotales.total_usd / carrito_new.dataTotales.nodoWallet.nasbicoin_blue.precio_actual;


        console.log("\n\n\n\n\n\n\n\n\n .-.-.-.-.-.-.-.-.-.");
        console.log(" [ 1* ] ---> [ carrito_new.dataTotales ]: ", carrito_new.dataTotales);
        console.log(" [ 1* ] ---> [ carrito_new.dataTotales.total_usd ]: ", carrito_new.dataTotales.total_usd);
        console.log(" [ 1* ] ---> [ carrito_new.dataTotales.total_usd ]: ", carrito_new.dataTotales.total_usd);
        console.log(" [ 2* ] ---> [ carrito_new.dataTotales.nodoWallet.nasbicoin_gold.precio_actual ]: ", carrito_new.dataTotales.nodoWallet.nasbicoin_gold.precio_actual);
        console.log(" [ 3* ] ---> [ schemeGlobalPreciosCarrito ]: ", schemeGlobalPreciosCarrito);
        console.log(".-.-.-.-.-.-.-.-.-.\n\n\n\n\n\n\n\n\n");
        let variaciones = ""
        if (item.variaciones) {
            // inputHTML = `<input id=${carrito.id_producto} class="form-control return-td __cantidad" type="number" step="1" min="1" value="${carrito.cantidad}" readonly>`;

            $.each(item.variaciones, function (i, vari) {
                variaciones += `<div class="return" style="display: flex;">
                                    <div> Color ${i + 1}: </div>
                                    <div style="width:20px;height:12px; border-radius: 15px; margin:5px; background:${vari.color}"></div>
                                    <div>${idioma.trans_eb12} ${i + 1}: ${vari.tallaES}</div>
                                </div>`
            });
        }

        $('.__datosproducto').append(`
            <div class="col-6 col-md-2 px-0">
                <div class="content-img">
                    <img loading="lazy" src="${item.foto_portada}" class="img-product" alt="nasbi.com">
                </div>
            </div>
            <div class="col-6 col-md-5 px-0">
                <p class="text-product">${item.producto}</p>
                ${variaciones}

            </div>
            <div class="col-6 col-md-1 px-0">
                <p class="text-product">${item.cantidad}</p>
            </div>
            <div class="col-6 col-md-4 px-0">
                <p class="text-product price-p subtotal-${item.id}">$${formatNumberCrypto(item.subtotal_gold)} ${moneda}</p>
            </div>
        `);
    });
    schemeGlobalPreciosCarrito.nodoWallet = carrito_new.dataTotales.nodoWallet;
    $('.__datosproductoprecio_1').html(`
        <p class="text-product pt-2 price-p subtotal">$${formatNumberUsd(schemeGlobalPreciosCarrito.subtotal_gold)} ${moneda} </p>
    `);
    $('.__datosproductoprecio_2').html(`
        <!-- <p class="text-product pt-2 price-p tdescuento"> 0 ${moneda}</p> -->
        <p class="text-product pt-2 price-p ttal">$${schemeGlobalPreciosCarrito.subtotal_gold} ${moneda}</p>
    `);
    $('.__datosproductoprecio_3').html(`
        <p class="text-product pt-2 price-p tdescuento"> 0 ${moneda}</p>
    `);
}

function direccionVendedor() {
    let dataEnviar = {
        data: {
            id_direccion_vendedor: carrito.id_direccion_vendedor,
        }
    }
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/carrito/?direccion_vendedor`,
        data: dataEnviar,
        dataType: 'json',
    }).done((res) => {
        if (res.status != 'success') return presentAlertObject({ icon: 'error', text: idioma.trans78 });
        console.log(res.data);

        paisesJSON = JSON.parse(localStorage.getItem('paises'));
        res.data.pais = paisesJSON.filter(datos => datos.country_id == res.data.pais)[0];
        res.data.departamento = res.data.pais.departamento.filter(datos => datos.zone_id == res.data.departamento)[0];
        delete (res.data.pais.departamento);
        $('.__pais_vendedor').html(res.data.pais.pais_name);
        $('.__departamento_vendedor').html(res.data.departamento ? res.data.departamento.name : '');
        $('.__ciudad_vendedor').html(res.data.ciudad);
        $('.__direccion_vendedor').html(res.data.direccion);
        $('.__zip_vendedor').html(res.data.codigo_postal);

    }).fail((err) => {
        presentAlertObject({ icon: 'error', text: idioma.trans79 });
    });
}


function rutasEnvioShippo() {
    let dataEnviar = {
        data: {
            destino: direccionActiva.id_shippo,
            carrito: {
                id: carrito.id,
                uid: user.uid,
                empresa: user.empresa
            }
        }
    }
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/carrito/?rutas_envio`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        console.log('res', res);
        if (res.status != 'success') {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                $('.__rutasenvio').empty();
                return presentAlertObject({ icon: 'error', text: idioma.trans152 });
            }

        }

        if (validarText(res.data) && res.data.length <= 0) return presentAlertObject({ icon: 'error', text: idioma.trans152 });

        res.data = res.data.map(data => {
            if (!validarText(data.amount)) data.amount = 0;
            if (!validarText(data.estimated_days)) data.estimated_days = 30;
            return data;
        });

        let rutas = ordenar(res.data, 'amount', 'ASC');
        let lamasbarata = rutas.splice(0, 1);
        let lasmasrapidas = rutas;
        if (rutas.length > 1) lasmasrapidas = ordenar(lasmasrapidas, 'estimated_days', 'ASC');
        console.log('lamasbarata', lamasbarata);
        console.log('lasmasrapidas', lasmasrapidas);
        console.log('lamasbarata y lasmasrapidas', lamasbarata.concat(lasmasrapidas));
        rutasDisponibles = lamasbarata.concat(lasmasrapidas);
        llenarRutasEnvio();
        rutaSeleccionada = rutasDisponibles[0];

    }).fail((err) => {
        $('.__rutasenvio').empty();
        presentAlertObject({ icon: 'error', text: idioma.trans152 });
    });
}


function llenarRutasEnvio() {
    $('.__rutasenvio').empty();
    let texthead = '',
        checked = '',
        diasestimados = '';
    for (const x in rutasDisponibles) {
        const ruta = rutasDisponibles[x];
        texthead = '';
        checked = '';
        diasestimados = validarText(ruta.estimated_days) ? ruta.estimated_days : '30';
        if (x == 0) texthead = `<p class="label1">${idioma.trans82}</p>`, checked = 'checked';
        if (x == 1) texthead = `<p class="label1">${idioma.trans83}</p>`;
        if (x == 2) texthead = `<p class="label1">${idioma.trans84}</p>`;
        $('.__rutasenvio').append(`
            ${texthead}
            <div class="card w-100 mt-1 mb-2">
                <div class="card-body p-0 pt-2 pb-2">
                    <div class="row">
                        <div class="col-6 col-sm-6 col-md-6 col-lg-1 col-xl-1">
                            <input type="radio" name="carrier" class="form-control" ${checked}>
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2">
                            <img loading="lazy" src="${ruta.provider_image_75}" alt="${ruta.provider}- nasbi.com">
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <span class="card-text tipo-carrier">${ruta.servicelevel.name}</span>
                            <span class="card-text tipo-carrier">(${diasestimados} ${idioma.trans81})</span>
                        </div>
                        <div class="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                            <span class="card-text precio-carrier font-weight-light">$${formatNumberUsd(ruta.amount_local)} ${ruta.currency_local}</span>
                        </div>
                    </div>
                </div>
            </div>
        `);
        $('input[name="carrier"]').eq(x).off('click');
        $('input[name="carrier"]').eq(x).on('click', { ruta }, activarRuta);
    }
}

function activarRuta(e) {
    rutaSeleccionada = e.data.ruta;
    console.log('rutaSeleccionada', rutaSeleccionada);
}


function pagarCarrito(e) {
    if (bloquearFullAccess(user.uid)) {
        return presentAlert("", idioma['trans_309'], "info");
    }

    //De aquí en adelante esto esta en proceso por PASARELA DE PAGO.



    $(e.target).prop('disabled', true);
    $(e.target).prop('disabled', false);

    // const descripcion_extra = $('.__descripcioncarrito').val();
    const descripcion_extra = "  ";
    console.log('descripcion_extra', descripcion_extra);

    // if (!validarText(descripcion_extra)) return presentAlertObject({ icon: 'error', text: idioma.trans86 });
    if (!validarText(direccionActiva)) return presentAlertObject({ icon: 'error', text: idioma.trans458_ });
    if (carrito.tipo_envio == 2 && !validarText(rutaSeleccionada)) return presentAlertObject({ icon: 'error', text: idioma.trans152 });
    if (carrito.moneda != carrito.moneda_local && !validarText(walletActiva)) return presentAlertObject({ icon: 'error', text: idioma.trans85 });

    let metodopago = $('#select-metodo-pago').val() * 1;
    // if (carrito.moneda == carrito.moneda_local) metodopago = 2;


    let dataEnviar = {
        data: {
            carrito: {
                id: carrito.id,
                uid: user.uid,
                empresa: user.empresa,
                precio_moneda_actual_usd: carrito.precio_moneda_actual_usd
            },
            metodo_pago: {
                id: metodopago
            },
            direccion: {
                id: direccionActiva.id
            },
            coloresXtallas: coloresXtallas_stock,
            descripcion_extra
        }
    };
    if (carrito.tipo_envio == 2) {
        dataEnviar.data.shippo = {
            id_envio: rutaSeleccionada.shipment,
            id_ruta: rutaSeleccionada.object_id
        };
    }
    console.log("-----++> hey hey [ walletActiva ]: ", walletActiva);
    if (schemeGlobalPreciosCarrito) {
        if (schemeGlobalPreciosCarrito.nodoWallet) {
            if (schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold) {
                if (schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.address) {
                    dataEnviar.data.metodo_pago.address_comprador = schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.address;

                } else {
                    return presentAlertObject({ icon: 'error', text: idioma.trans85 });
                }
            } else {
                return presentAlertObject({ icon: 'error', text: idioma.trans85 });
            }
        } else {
            return presentAlertObject({ icon: 'error', text: idioma.trans85 });
        }
    } else {
        return presentAlertObject({ icon: 'error', text: idioma.trans85 });
    }
    /*
        // Validar toda la información referente al pago
        campos obligatorios
        id == 1 // SOLO SD
        id == 2 // SOLO FIAT
        id == 3 // FIAT + SD
        desc = 0 //no se paga con bono de descuento
        desc = 1 //se paga con bono de descuento

        campos obligatorios si desc == 1
        *bd = monto o % * //debemos definir cuanto lo enviamos si
        address_comprador_bd = address de compra de nasbiblue

        campos obligatorios si eres id == 3
        *sd = monto o % * //debemos definir cuanto lo enviamos
        *fiat = monto o % * //debemos definir cuanto lo enviamos si

        campos obligatorios si eres id == 3 o id == 1
        address_comprador_sd = address de compra de nasbigold
    */
    dataEnviar.data.metodo_pago.id = $('#select-metodo-pago').val() * 1;

    dataEnviar.data.metodo_pago.address_comprador_sd = schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.address;
    dataEnviar.data.metodo_pago.address_comprador_bd = schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_blue.address;

    if (datosDescuento.porcentajeDecimal > 0 && datosDescuento.monto_usd > 0) {
        dataEnviar.data.metodo_pago.desc = 1;
        dataEnviar.data.metodo_pago.bd = datosDescuento.monto_local_money;//datosDescuento.monto_nasbiblue *1;
        dataEnviar.data.metodo_pago.bd_porcentaje = datosDescuento.porcentajeDecimal * 1; // No requeridos, enviados por si acaso.
        dataEnviar.data.metodo_pago.bd_usd = datosDescuento.monto_usd * 1; // No requeridos, enviados por si acaso.
    } else {
        dataEnviar.data.metodo_pago.desc = 0;
    }
    if ($('#select-metodo-pago').val() * 1 == 3) {

        dataEnviar.data.metodo_pago.sd = devolverNumero($('.finalizar_compra__input__localmoney__two').val()) * 1;
        dataEnviar.data.metodo_pago.fiat = devolverNumero($('.finalizar_compra__input__localmoney').val()) * 1;

        if (!dataEnviar.data.metodo_pago.fiat) {
            return presentAlertObject({ icon: 'error', text: idioma.trans_301 });
        }

        if (!dataEnviar.data.metodo_pago.sd) {
            return presentAlertObject({ icon: 'error', text: idioma.trans_302 });
        }
    }
    $(".spiner_loading_pago").show()
    console.log('dataEnviar', dataEnviar);
    console.log('dataEnviar', dataEnviar);
    console.log('dataEnviar', dataEnviar);
    console.log("$('#select-metodo-pago').val()", $('#select-metodo-pago').val());
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/carrito/?pagar_carrito`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        $(".spiner_loading_pago").hide()
        if (res.status == 'success') {

            $("#modal-compra-finalizada").modal({ backdrop: 'static', keyboard: false });
            $("#modal-compra-finalizada").modal("show");
            $("#modal-compra-finalizada").on('hidden.bs.modal', function ($event) {
                sessionStorage.removeItem('finalizar-compra');
                sessionStorage.removeItem('finalizar-compra-new');
                loadPage("carrito-compras.php")
            });
        } else if (res.status == 'superaStock') {
            return presentAlertObject({ icon: 'error', text: idioma.trans303_ });

        } else if (res.status == 'errorBD') {
            return presentAlertObject({ icon: 'error', text: idioma.trans_317 });

        } else if (res.status == 'errorSD') {
            return presentAlertObject({ icon: 'error', text: idioma.trans_318 });

        } else if (res.status == 'stockError') {
            return presentAlertObject({ icon: 'error', text: idioma.trans296 });
        }
        else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) return presentAlertObject({ icon: 'error', text: idioma.trans87 });


        }
    }).fail((err) => {
        $(".spiner_loading_pago").hide()
        return presentAlertObject({ icon: 'error', text: idioma.trans87 });
    });
}



function obtener_latitud_longitud(__pais, __estado, __ciudad) {
    console.log(__pais, __estado, __ciudad, "mmmmmmmmmmm");
    return new Promise((resolve) => {
        let address = __pais + ',' + __estado + ',' + __ciudad;
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCMeqStSqC4lq01HX9yfjqAD8eNHHlWWac').then(response => response.json())
            .then(async (data) => {
                if (data) {
                    console.log(data, "mmmmmmm")
                    if (data.results[0]) {
                        if (!data.results[0].partial_match) {
                            data_enviar_lat_long = data.results[0].geometry.location;
                            let respuesta_corres = await verificar_si_corresponde_pais_departamento(__pais, __estado, __ciudad, data.results[0].formatted_address);
                            console.log(respuesta_corres, "mmmmmm respuesta vrid");
                            // if(respuesta_corres){
                            resolve(data_enviar_lat_long);
                            // }else{
                            //     resolve(false);   
                            // }

                        } else {
                            resolve(false);
                        }
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }

            })
        // };
    });
}


function verificar_si_corresponde_pais_departamento(pais, departamento, ciudad, array_buscado) {
    return new Promise((resolve) => {
        let result_pais = array_buscado.indexOf(pais);
        let result_derpantamento = array_buscado.indexOf(departamento);
        let result_ciudad = array_buscado.search(new RegExp(ciudad, "i"));
        if (result_pais != -1 && result_derpantamento != -1 && result_ciudad != -1) {
            console.log("asdasdf");
            resolve(true);
        } else {
            resolve(false);
        }
    })

}

// 26.nov.2020
function convertToCombinado() {
    $('.finalizar_compra__inputscombinadospagos').show('slow');
    $('.finalizar_compra__input__cripto').val('');
    $('.finalizar_compra__input__localmoney').val('');
    $('.finalizar_compra__input__localmoney__two').val('');
    // convertToSaldoDorado();
    datosDescuento.monto_nasbigold = (schemeGlobalPreciosCarrito.subtotal_gold * datosDescuento.porcentajeDecimal);//datosDescuento.monto_nasbigold = datosDescuento.monto_usd / schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.precio_actual;
    // $('.tdescuento').text(`${formatNumberCrypto(datosDescuento.monto_nasbiblue)} ${ getLabelCoinByNameCropID(datosDescuento.moneda) } / ${formatNumberCrypto(datosDescuento.monto_nasbigold)} ${ getLabelCoinByNameCropID(datosDescuento.monedagold) }`);
    $('.tdescuento').text(`${formatNumberUsd(datosDescuento.monto_local_money)} ${monedaShow} `);

    let montosubtotal_nasbigold = schemeGlobalPreciosCarrito.subtotal_gold;
    let moneda = getLabelCoinByNameCropID(carrito_new.dataTotales.nodoWallet.nasbicoin_gold.moneda);
    // carrito_new.data.forEach((item) => {
    //     $(`.subtotal-${item.id}`).text(`$${ formatNumberCrypto(item.subtotal_gold) } ${moneda}`);
    // });
    // $('.subtotal').text(`${formatNumberCrypto(montosubtotal_nasbigold)} ${getLabelCoinByNameCropID(datosDescuento.monedagold)}`);
    carrito_new.data.forEach((item) => {
        $(`.subtotal-${item.id}`).text(`$${item.precio_mask} ${monedaShow}`);
    });
    // $('.subtotal').text(`${formatNumberCrypto(montosubtotal_nasbigold)} ${getLabelCoinByNameCropID(datosDescuento.monedagold)}`);
    $(`.subtotal`).text(`$${carrito_new.dataTotales[carrito_new.data[0].moneda.toUpperCase()].total_mask} ${monedaShow}`);

    carrito.montosubtotal_nasbigold = devolverNumero(formatNumberCrypto(montosubtotal_nasbigold));
    montosubtotal_nasbigold = devolverNumero(formatNumberCrypto(montosubtotal_nasbigold));

    datosDescuento.monto_nasbigold = devolverNumero(formatNumberCrypto(datosDescuento.monto_nasbigold));

    let total = montosubtotal_nasbigold - datosDescuento.monto_nasbigold;
    let total_locamoney = schemeGlobalPreciosCarrito.subtotal_localmoney - (schemeGlobalPreciosCarrito.subtotal_localmoney * datosDescuento.porcentajeDecimal);

    if (total) {
        total = total.toFixed(6) * 1;
        console.log("montosubtotal_nasbigold: ", montosubtotal_nasbigold);
        console.log("datosDescuento.monto_nasbigold: ", datosDescuento.monto_nasbigold);
        console.log("total: ", total);
        datosDescuento.total_nasbigold = total;
        datosDescuento.monto_local_money = total_locamoney;
        // $('.ttal').text(`${formatNumberCrypto(total)} ${getLabelCoinByNameCropID(datosDescuento.monedagold)}`);
    } else {
        // $('.ttal').text(`${formatNumberCrypto(montosubtotal_nasbigold)} ${getLabelCoinByNameCropID(datosDescuento.monedagold)} / ${ formatNumberUsd( schemeGlobalPreciosCarrito.subtotal_localmoney ) } ${schemeGlobalPreciosCarrito.symbol_localmoney}`);
    }

    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n-----:> carrito_new.dataTotales[ moneda ].total= ", carrito_new.dataTotales[carrito_new.data[0].moneda.toUpperCase()].total);
    console.log("-----:> datosDescuento.monto_local_money= ", datosDescuento.monto_local_money);
    total = carrito_new.dataTotales[carrito_new.data[0].moneda.toUpperCase()].total - datosDescuento.monto_local_money;
    total = total.toFixed(2) * 1;
    if (datosDescuento.monto_local_money == 0) {
        $('.ttal').text(`${formatNumberUsd(carrito_new.dataTotales[carrito_new.data[0].moneda.toUpperCase()].total)} ${monedaShow}`);
        datosDescuento.total_localmoney = total;
    } else {
        $('.ttal').text(`${formatNumberUsd(datosDescuento.monto_local_money)} ${monedaShow}`);
    }
}
function convertToSaldoDorado() {
    $('.finalizar_compra__inputscombinadospagos').hide('slow');

    $('.finalizar_compra__input__cripto').val('');
    $('.finalizar_compra__input__localmoney').val('');
    $('.finalizar_compra__input__localmoney__two').val('');


    datosDescuento.monto_nasbigold = (schemeGlobalPreciosCarrito.subtotal_gold * datosDescuento.porcentajeDecimal);//datosDescuento.monto_nasbigold = datosDescuento.monto_usd / schemeGlobalPreciosCarrito.nodoWallet.nasbicoin_gold.precio_actual;
    // $('.tdescuento').text(`${formatNumberCrypto(datosDescuento.monto_nasbiblue)} ${ getLabelCoinByNameCropID(datosDescuento.moneda) } / ${formatNumberCrypto(datosDescuento.monto_nasbigold)} ${ getLabelCoinByNameCropID(datosDescuento.monedagold) }`);
    $('.tdescuento').text(`${formatNumberUsd(datosDescuento.monto_local_money)} ${monedaShow} `);

    let montosubtotal_nasbigold = schemeGlobalPreciosCarrito.subtotal_gold;
    // let moneda = getLabelCoinByNameCropID( carrito_new.dataTotales.nodoWallet.nasbicoin_gold.moneda );
    // carrito_new.data.forEach((item) => {
    //     $(`.subtotal-${item.id}`).text(`$${ formatNumberCrypto(item.subtotal_gold) } ${moneda}`);
    // });
    let moneda = carrito_new.data[0].moneda.toUpperCase();
    carrito_new.data.forEach((item) => {
        $(`.subtotal-${item.id}`).text(`$${item.precio_mask} ${monedaShow}`);
    });
    // $('.subtotal').text(`${formatNumberCrypto(montosubtotal_nasbigold)} ${getLabelCoinByNameCropID(datosDescuento.monedagold)}`);
    $(`.subtotal`).text(`$${carrito_new.dataTotales[carrito_new.data[0].moneda.toUpperCase()].total_mask} ${monedaShow}`);

    carrito.montosubtotal_nasbigold = devolverNumero(formatNumberCrypto(montosubtotal_nasbigold));
    montosubtotal_nasbigold = devolverNumero(formatNumberCrypto(montosubtotal_nasbigold));

    datosDescuento.monto_nasbigold = devolverNumero(formatNumberCrypto(datosDescuento.monto_nasbigold));

    let total = montosubtotal_nasbigold - datosDescuento.monto_nasbigold;
    let total_locamoney = schemeGlobalPreciosCarrito.subtotal_localmoney - (schemeGlobalPreciosCarrito.subtotal_localmoney * datosDescuento.porcentajeDecimal);

    // if ( total ) {
    //     total = total.toFixed(6)*1;
    //     console.log("montosubtotal_nasbigold: ", montosubtotal_nasbigold);
    //     console.log("datosDescuento.monto_nasbigold: ", datosDescuento.monto_nasbigold);
    //     console.log("total: ", total);
    //     datosDescuento.total_nasbigold = total;
    //     datosDescuento.monto_local_money = total_locamoney;
    //     // $('.ttal').text(`${formatNumberCrypto(total)} ${getLabelCoinByNameCropID(datosDescuento.monedagold)}`);
    // }else{
    //     // $('.ttal').text(`${formatNumberCrypto(montosubtotal_nasbigold)} ${getLabelCoinByNameCropID(datosDescuento.monedagold)}`);
    // }
    total = carrito_new.dataTotales[moneda].total - datosDescuento.monto_local_money;
    total = total.toFixed(2) * 1;
    $('.ttal').text(`${formatNumberUsd(total)} ${monedaShow}`);
    datosDescuento.total_localmoney = total;
}
function convertToLocalMoney() {
    $('.finalizar_compra__inputscombinadospagos').hide('slow');
    $('.finalizar_compra__input__cripto').val('');
    $('.finalizar_compra__input__localmoney').val('');
    $('.finalizar_compra__input__localmoney__two').val('');

    // $('.tdescuento').text(`${formatNumberCrypto(datosDescuento.monto_nasbiblue)} ${ getLabelCoinByNameCropID(datosDescuento.moneda) } / ${formatNumberUsd(datosDescuento.monto_local_money)} ${carrito.moneda_local} `);
    $('.tdescuento').text(`${formatNumberUsd(datosDescuento.monto_local_money)} ${carrito.moneda_local} `);
    let moneda = carrito_new.data[0].moneda.toUpperCase();
    carrito_new.data.forEach((item) => {
        $(`.subtotal-${item.id}`).text(`$${item.precio_mask} ${moneda}`);
    });
    $(`.subtotal`).text(`$${carrito_new.dataTotales[carrito_new.data[0].moneda.toUpperCase()].total_mask} ${moneda}`);
    let total = carrito_new.dataTotales[carrito_new.data[0].moneda.toUpperCase()].total - datosDescuento.monto_local_money;
    total = total.toFixed(2) * 1;
    $('.ttal').text(`${formatNumberUsd(total)} ${moneda}`);
    datosDescuento.total_localmoney = total;
}