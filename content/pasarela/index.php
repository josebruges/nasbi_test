<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

    <h1>pasarela</h1>

    <script src="../../js/jquery-3.5.1.min.js"></script>
    <script type="text/javascript">
        /*
        http://localhost/ProyectoNasbi2020/content/pasarela/payu.php?merchantId=508029&merchant_name=Test+PayU+Test+comercio&merchant_address=Av+123+Calle+12&telephone=7512354&merchant_url=http%3A%2F%2Fpruebaslapv.xtrweb.com&transactionState=6&lapTransactionState=DECLINED&message=DECLINED&referenceCode=33&reference_pol=120530467&transactionId=60c19aff-8e02-46b3-8741-ca2e99c69ea6&description=Compra+de+articulo+Bicicletas+Todo+Terreno+Gw+Alligator+Rin+29+Shimano+7V+Tipo+Moto+Suspe+Disco+Morado+Fucsia+Azul+Nasbi&trazabilityCode=564375&cus=564375&orderLanguage=es&extra1=1&extra2=&extra3=&polTransactionState=6&signature=f2327cf9434c89dfd6e3ab56fd356953&polResponseCode=4&lapResponseCode=PAYMENT_NETWORK_REJECTED&risk=&polPaymentMethod=11&lapPaymentMethod=MASTERCARD&polPaymentMethodType=2&lapPaymentMethodType=CREDIT_CARD&installmentsNumber=1&TX_VALUE=1000.00&TX_TAX=.00&currency=USD&lng=es&pseCycle=&buyerEmail=mario%40correo.com&pseBank=&pseReference1=&pseReference2=&pseReference3=&authorizationCode=RBM736&TX_ADMINISTRATIVE_FEE=.00&TX_TAX_ADMINISTRATIVE_FEE=.00&TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE=.00&processingDate=2020-09-24
        */
        let params = new URLSearchParams(location.search);
        $.ajax({
            type: "GET",
            url: "https://nasbi.com/buyinbig/api/controllers/request_payu?" + params.toString(),
            success: success => {

                console.log("result: ", success);
            }, error: error => {
                console.log("error: ", error);

            }
        });
    </script>
</body>
</html>
