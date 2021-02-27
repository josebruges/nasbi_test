// http://localhost/ProyectoNasbi2020/content/referir-negocio.php

var resultStatusReferNegocio = {};
var url_temp = getBaseUrlProject() + "registro-empresa.php?r="

$(document).ready(($event) => {
	$(".compartir_codigo_fb").off()
	$(".compartir_codigo_fb").on('click', compartirCodigoFb)
	$(".compartir_codigo_in").off()
	$(".compartir_codigo_in").on('click', compartirCodigoInk)
	$(".compartir_codigo_gl").off()
	$(".compartir_codigo_gl").on('click', compartirCodigoGl)
	$(".compartir_codigo_wsp").off()
	$(".compartir_codigo_wsp").on('click', compartirCodigoWsp)
});

function cargarPrimero() {
	$('.referir-negocio-1-crear-solicitud').hide();

	$('.referir-negocio-2-visualizar-pago').hide();

	$('.referir-negocio-3-visualizar-mi-refercode').hide();
	// Validamos si el usuario esta logeado o no


	if (!validarText(user)) {
		// Usuarios no logeado
		console.log("\t\tReferir-negocio.js --> Usuarios no logeado");
		$('.referir-negocio-1-crear-solicitud').show();

		$('.referir__negocio__crearsolicitud__btn').off('click');
		$('.referir__negocio__crearsolicitud__btn').click({}, referir_negocio_toRegister);

	} else {

		if (!isValidadReferNegocio(user)) {
			/*location.href = "index.php";*/
			// Usuarios logeado
			console.log("\t\tReferir-negocio.js --> Usuarios no logeado");
			$('.referir-negocio-1-crear-solicitud').show();

			$('.referir__negocio__crearsolicitud__btn').off('click');
			$('.referir__negocio__crearsolicitud__btn').click({}, referir_negocio_toRegister);
		} else {
			$('.referir-negocio-3-visualizar-mi-refercode').show();
			$('.referir__negocio__refercode').val(user.uid);
		}
	}
}
function referir_negocio_toRegister($event) {
	loadPage("registro.php?keyrefercode=true")
}
async function compartirCodigoFb() {
	let texto = url_temp + user.uid + "&lang=" + user.idioma.toUpperCase() + "&iso_code=" + paisOrigen.iso_code_2 + "&country=" + paisOrigen.country_id + "&uid_user=" + user.uid + "&empresa_user=" + user.empresa;
	texto = await convertParams_facebook(texto);
	let url = "http://www.facebook.com/share.php?u=" + texto.split(" ").join("%20")
	return window.open(url, '_blank');

}
function compartirCodigoInk() {
	let texto = idioma['_trans564'].split("$$").join(user.uid)
	let url_fab = "https://www.linkedin.com/sharing/share-offsite/?url=" + url_temp + user.uid + "&lang=" + user.idioma.toUpperCase() + "&iso_code=" + paisOrigen.iso_code_2 + "&country=" + paisOrigen.country_id + "&uid_user=" + user.uid + "&empresa_user=" + user.empresa;
	return window.open(url_fab, '_blank');

}
function compartirCodigoGl() {

	let texto = url_temp + user.uid + "&lang=" + user.idioma.toUpperCase() + "&iso_code=" + paisOrigen.iso_code_2 + "&country=" + paisOrigen.country_id + "&uid_user=" + user.uid + "&empresa_user=" + user.empresa;
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(texto);
		return;
	}
	navigator.clipboard.writeText(texto).then(function () {
		$('.texto_copiado').show('flash');
		setTimeout(() => {
			$('.texto_copiado').hide('flash');
		}, 900);
	}, function (err) {
		console.error('Async: Could not copy text: ', err);
		NativeFunction.copyToClipboard(texto);
		$('.texto_copiado').show('flash');
		setTimeout(() => {
			$('.texto_copiado').hide('flash');
		}, 900);
	});

}
async function compartirCodigoWsp() {
	let texto = url_temp + user.uid + "&lang=" + user.idioma.toUpperCase() + "&iso_code=" + paisOrigen.iso_code_2 + "&country=" + paisOrigen.country_id + "&uid_user=" + user.uid + "&empresa_user=" + user.empresa;
	texto = await convertParams_facebook(texto);
	let url = "https://api.whatsapp.com/send?text=" + idioma['_trans564'].split("$$").join(user.uid) + " - " + texto.split(" ").join("%20");
	return window.open(url, '_blank');

}