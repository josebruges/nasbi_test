<!-- Test test -->
<form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">

    <input name="merchantId"        type="hidden"  value="508029" >
    <input name="accountId"         type="hidden"  value="512326" >

    <input name="description"       type="hidden"  value="Test PAYU" >
    <input name="referenceCode"     type="hidden"  value="TestPayU" >
    <input name="extra1"            type="hidden"  value="1" >
    <input name="amount"            type="hidden"  value="3" >
    <input name="tax"               type="hidden"  value="0" >
    <input name="taxReturnBase"     type="hidden"  value="0" >
    <input name="currency"          type="hidden"  value="USD" >
    <input name="signature"         type="hidden"  value="ba9ffa71559580175585e45ce70b6c37" >
    <input name="test"              type="hidden"  value="1" >
    
    <input name="lng"               type="hidden"  value="es" >

    <input name="buyerFullName"     type="hidden"  value="Juan Cervantes" >
    <input name="buyerEmail"        type="hidden"  value="josedavid.bruges@gmail.com" >

    <input name="responseUrl"       type="hidden"  value="http://testnet.foodsdnd.com/buyinbig/content/response" >

    <input name="confirmationUrl"   type="hidden"  value="http://testnet.foodsdnd.com/buyinbig/content/confirmation" >

    <input name="Submit"            type="submit"  value="Enviar" >
</form>


<!-- MIS DATOS REALES -->
<!-- <form method="post" action="https://checkout.payulatam.com/ppp-web-gateway-payu/">
    <input name="merchantId"        type="hidden"  value="713459" >
    <input name="accountId"         type="hidden"  value="718278" >

    <input name="description"       type="hidden"  value="PRIMER PAGO ONLINE PAYU - NASBI.COM" >

    <input name="referenceCode"     type="hidden"  value="ref005" >
    <input name="amount"            type="hidden"  value="5" >
    <input name="tax"               type="hidden"  value="0" >
    <input name="taxReturnBase"     type="hidden"  value="0" >
    <input name="currency"          type="hidden"  value="USD" >
    <input name="signature"         type="hidden"  value="d2188c6095139dc7046d04af5edc0af9" >
    <input name="test"              type="hidden"  value="1" >

    <input name="lng"               type="hidden"  value="es" >

    <input name="buyerFullName"     type="hidden"  value="Juan Cervantes" >
    <input name="buyerEmail"        type="hidden"  value="josedavid.bruges@gmail.com" >

    <input name="responseUrl"       type="hidden"  value="http://testnet.foodsdnd.com/buyinbig/content/paises.php" >
    <input name="confirmationUrl"   type="hidden"  value="http://testnet.foodsdnd.com/buyinbig/content" >

    <input name="Submit"            type="submit"  value="Enviar" >
</form> -->



<!-- Result SANDBOX -->
http://localhost/ProyectoNasbi2020/content/payu-response.php?


merchantId=508029
&merchant_name=Test+PayU+Test+comercio
&merchant_address=Av+123+Calle+12
&telephone=7512354
&merchant_url=http%3A%2F%2Fpruebaslapv.xtrweb.com
&transactionState=4
&lapTransactionState=APPROVED
&message=APPROVED
&referenceCode=ref33
&reference_pol=120521903
&transactionId=d6f2f34b-e4af-4aad-a303-a43b998c0d09
&description=Compra+de+articulo+Bicicletas+Todo+Terreno+Gw+Alligator+Rin+29+Shimano+7V+Tipo+Moto+Suspe+Disco+Morado+Fucsia+Azul+Nasbi
&trazabilityCode=CRED+-+666522118
&cus=CRED+-+666522118
&orderLanguage=es
&extra1=
&extra2=
&extra3=
&polTransactionState=4
&signature=d30929ee065febba57f60c7f2a945c7f
&polResponseCode=1
&lapResponseCode=APPROVED
&risk=
&polPaymentMethod=10
&l…



&lapTransactionState=APPROVED
&message=APPROVED
&referenceCode=ref33
&reference_pol=120521903
&transactionId=d6f2f34b-e4af-4aad-a303-a43b998c0d09

&description=Compra+de+articulo+Bicicletas+Todo+Terreno+Gw+Alligator+Rin+29+Shimano+7V+Tipo+Moto+Suspe+Disco+Morado+Fucsia+Azul+Nasbi

&signature=d30929ee065febba57f60c7f2a945c7f
&lapResponseCode=APPROVED
&lapPaymentMethod=VISA
&lapPaymentMethodType=CREDIT_CARD
&TX_VALUE=1000.00
&currency=USD






========= RESPUESTA DE payU =========


http://localhost/ProyectoNasbi2020/content/payu-response.php?merchantId=508029
&merchant_name=Test+PayU+Test+comercio
&merchant_address=Av+123+Calle+12
&telephone=7512354
&merchant_url=http%3A%2F%2Fpruebaslapv.xtrweb.com
&transactionState=4
&lapTransactionState=APPROVED
&message=APPROVED
&referenceCode=ref33
&reference_pol=120530184
&transactionId=c6919173-f12d-4f5f-8456-fa708ac8434c

&description=Compra+de+articulo+Bicicletas+Todo+Terreno+Gw+Alligator+Rin+29+Shimano+7V+Tipo+Moto+Suspe+Disco+Morado+Fucsia+Azul+Nasbi

&trazabilityCode=564336
&cus=564336
&orderLanguage=es
&extra1=
&extra2=
&extra3=
&polTransactionState=4
&signature=d30929ee065febba57f60c7f2a945c7f
&polResponseCode=1
&lapResponseCode=APPROVED
&risk=
&polPaymentMethod=11
&lapPaymentMethod=MASTERCARD
&polPaymentMethodType=2
&lapPaymentMethodType=CREDIT_CARD
&installmentsNumber=1
&TX_VALUE=1000.00
&TX_TAX=.00
&currency=USD
&lng=es
&pseCycle=
&buyerEmail=mario%40correo.com
&pseBank=
&pseReference1=
&pseReference2=
&pseReference3=
&authorizationCode=RBM668
&TX_ADMINISTRATIVE_FEE=.00
&TX_TAX_ADMINISTRATIVE_FEE=.00
&TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE=.00
&processingDate=2020-09-24











https://testnet.foodsdnd.com/buyinbig/content/pasarela/?merchantId=508029&merchant_name=Test+PayU+Test+comercio&merchant_address=Av+123+Calle+12&telephone=7512354&merchant_url=http%3A%2F%2Fpruebaslapv.xtrweb.com&transactionState=6&lapTransactionState=DECLINED&message=DECLINED&referenceCode=33&reference_pol=120530467&transactionId=60c19aff-8e02-46b3-8741-ca2e99c69ea6&description=Compra+de+articulo+Bicicletas+Todo+Terreno+Gw+Alligator+Rin+29+Shimano+7V+Tipo+Moto+Suspe+Disco+Morado+Fucsia+Azul+Nasbi&trazabilityCode=564375&cus=564375&orderLanguage=es&extra1=1&extra2=&extra3=&polTransactionState=6&signature=f2327cf9434c89dfd6e3ab56fd356953&polResponseCode=4&lapResponseCode=PAYMENT_NETWORK_REJECTED&risk=&polPaymentMethod=11&lapPaymentMethod=MASTERCARD&polPaymentMethodType=2&lapPaymentMethodType=CREDIT_CARD&installmentsNumber=1&TX_VALUE=1000.00&TX_TAX=.00&currency=USD&lng=es&pseCycle=&buyerEmail=mario%40correo.com&pseBank=&pseReference1=&pseReference2=&pseReference3=&authorizationCode=RBM736&TX_ADMINISTRATIVE_FEE=.00&TX_TAX_ADMINISTRATIVE_FEE=.00&TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE=.00&processingDate=2020-09-24















{
date: '2020.09.25 09:01:42',
pse_reference3: '',
payment_method_type: '2',
pse_reference2: '',
franchise: 'VISA',
commision_pol: '0.00',
pse_reference1: '',
shipping_city: '',
bank_referenced_name: '',
sign: 'd513951af258172e4db4617a40d45f00',
extra2: '',
extra3: '',
operation_date: '2020-09-25 09:01:42',
payment_request_state: 'A',
billing_address: '',
extra1: '1',
administrative_fee: '0.00',
administrative_fee_tax: '0.00',
bank_id: '10',
nickname_buyer: '',
payment_method: '10',
attempts: '1',
transaction_id: '734cc6a7-4461-4011-81a6-6149e4b4bce8',
transaction_date: '2020-09-25 09:01:42',
test: '0',
exchange_rate: '3827.00',
ip: '10.0.0.4',
reference_pol: '120532832',
cc_holder: 'Emily Clark',
tax: '0.00',
antifraudMerchantId: '',
pse_bank: '',
state_pol: '4',
billing_city: '',
phone: '',
error_message_bank: '',
shipping_country: 'CO',
error_code_bank: '76',
cus: 'CRED - 666602476',
commision_pol_currency: '',
customer_number: '',
description: 'Compra de articulo Bicicletas Todo Terreno Gw Alligator Rin 29 Shimano 7V Tipo Moto Suspe Disco Morado Fucsia Azul Nasbi',
merchant_id: '508029',
administrative_fee_base: '0.00',
authorization_code: '983568',
currency: 'USD',
shipping_address: '',
nickname_seller: '',
cc_number: '******4877',
installments_number: '1',
value: '1000.00',
transaction_bank_id: '983568',
billing_country: 'CO',
response_code_pol: '1',
payment_method_name: 'VISA',
office_phone: '',
email_buyer: 'mario@correo.com',
payment_method_id: '2',
response_message_pol: 'APPROVED',
account_id: '512321',
airline_code: '',
pseCycle: 'null',
risk: '0.0',
reference_sale: '33',
additional_value: '0.00'
}