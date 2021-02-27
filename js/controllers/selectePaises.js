let lenguaje_optenido = "";
var idioma = {
	"ES": {
		"transOrigen": "Nasbi.com | ¿De donde eres?",
		"transTitle": "¿En que lugar te encuentras?",
		"transSubTitle": "En <strong>Nasbi.com</strong> podrás seleccionar en que parte del mundo te encuentras, visualizar todos los artículos y vivir la experiencia.",
		"transBtn": "Siguiente",
		"trans477_": "Elige un país",
		"_trans264": "NOSOTROS",
		"trans211": "SOPORTE",
		"_trans266": "CONTÁCTANOS",
		"_trans509": "PREGUNTAS FRECUENTES",
		"_trans269": "Suscríbete a Nasbi y no te pierdas las promociones que tenemos para tí",
		"_trans271__ph": "Escribe tu correo electrónico aquí",
		"trans_16__btn": "Enviar",
		"_trans270": "Copyright © 2020 NASBI Electronic Commerce S.A.S.",
		"_trans900": "Términos y condiciones generales",
		"_trans901": "Política de Privacidad, seguridad de la información y cookies",
		"trans272": "Selecciona el idioma",
		"trans_300__src": "../imagen/logo-footer.svg",
		"trans_01": "Aceptar",
	},
	"EN": {
		"transOrigen": "Nasbi.com | Where are you from?",
		"transTitle": "Where are you?",
		"transSubTitle": "In <strong>Nasbi.com</strong> you will be able to select where you are in the world, view all the articles and live the experience.",
		"transBtn": "Following",
		"trans477_": "Choose a country",
		"_trans264": "ABOUT US",
		"trans211": "SUPPORT",
		"_trans266": "CONTACT US",
		"_trans509": " FREQUENT ASKED QUESTIONS ",
		"_trans269": "Subscribe to Nasbi and don't miss the promotions we have for you",
		"_trans271__ph": "Write your email here",
		"trans_16__btn": "Send",
		"_trans270": "Copyright © 2020 NASBI Electronic Commerce S.A.S.",
		"_trans900": "General terms and conditions",
		"_trans901": "Política de Privacidad, seguridad de la información y cookies",
		"trans272": "Select language",
		"trans_300__src": "../imagen/logo-footer-en.svg",
		"trans_01": "Accept",
	},
};

var arr_paises = [];

$(document).ready(($event) => {
	init();
	redirection();
	$(".btn-siguiente").click(($event) => {
		onChangePaisByID($('.select__pais option:selected').val());
	});
	const writeEmailInput = document.getElementsByClassName("correo_suscribir_newsleter");
	writeEmailInput[0].placeholder = idioma[lenguaje_optenido]["_trans271__ph"];

	if (document.cookie.includes("appURL")) { //para redireccion de la app 
		console.log("load url")
		window.location = document.cookie.split("appURL=")[1].split(";")[0]
		document.cookie = 'appURL=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}

});
function init() {
	const aux_lang = localStorage.getItem('lenguaje');
	if (aux_lang == null || aux_lang == "" || aux_lang == undefined) {
		// Obtenemos el idioma del navegador y en base a eso mostramos el idioma pertinente en la page.
		var ln = x = window.navigator.language || navigator.browserLanguage;
		let idiomaSelected = ln;

		//idiomaSelected = 'ES'; // AGREGADO borrar la linea 33 para volver a la normalidad

		if (idiomaSelected.toUpperCase().includes("ES")) {
			lenguaje_optenido = "ES";
			myTranslatePage(idioma["ES"]);
			cargar1erIdioma("ES");
			$("body").addClass("ES");
			localStorage.setItem('lenguaje', 'ES');
		} else {
			lenguaje_optenido = "EN";
			myTranslatePage(idioma["EN"]);
			cargar1erIdioma("EN");
			$("body").addClass("EN");
			localStorage.setItem('lenguaje', 'EN');
		}
		document.cookie = "lenguaje=" + encodeURIComponent(localStorage.getItem("lenguaje"));
	} else {
		lenguaje_optenido = aux_lang;
		myTranslatePage(idioma[aux_lang]);
		cargar1erIdioma(aux_lang);
		$("body").addClass(aux_lang);
		document.cookie = "lenguaje=" + encodeURIComponent(lenguaje_optenido);

	}

	$(".select_idioma_paises").val(localStorage.getItem('lenguaje'));

	$(".select_idioma_paises").on('change', function (ev) {
		localStorage.setItem('lenguaje', $(".select_idioma_paises option:selected").val());
		document.cookie = "lenguaje=" + encodeURIComponent(localStorage.getItem("lenguaje"));
		$("body").addClass(localStorage.getItem('lenguaje'));
		myTranslatePage(idioma[aux_lang]);
		location.reload();
	});

	// Obtenemos el JSON de paises con departamentos para validar cuando el usuario ingrese al home 
	// que productos o articulos debe visualizar y de que lugar del mundo
	getSelectPais();

	let iso_code_2_money = localStorage.getItem('iso_code_2_money');
	if (iso_code_2_money == null || iso_code_2_money == undefined || iso_code_2_money == "") {
		localStorage.setItem('iso_code_2_money', 'US');

	}
}
function getSelectPais() {
	$.ajax({
		type: 'POST',
		url: '../json/paisesdepartamentos-' + lenguaje_optenido + '.json',
		data: '',
		dataType: 'json',
	}).done((res) => {
		arr_paises = res;
		localStorage.setItem('paises', JSON.stringify(res));

		let labelDepartamento = "Todos los departamentos";
		var ln = x = window.navigator.language || navigator.browserLanguage;
		let idiomaSelected = ln;
		if (idiomaSelected.toUpperCase().includes("ES")) {
			labelDepartamento = "Todos los departamentos";

		} else {
			labelDepartamento = "All the departments";

		}

		$('.select__pais').empty();

		let htmlOptionPais = "";
		htmlOptionPais = `<option value="">${idioma[lenguaje_optenido].trans477_}</option>`;
		$.each(arr_paises, function (i, pais) {
			htmlOptionPais += `<option value="${pais.country_id}">${pais.pais_name}</option>`;
			arr_paises[i].departamento[0].name = labelDepartamento;
			console.log("---> i: ", arr_paises[i].departamento[0].name);
		});
		$('.select__pais').html(htmlOptionPais);
		localStorage.setItem('paises', JSON.stringify(arr_paises));

		$('.select__pais').off('changed.bs.select');
		$('.select__pais').on('changed.bs.select', onChangePais);
		$('.select__pais').selectpicker({
			size: 7,
			liveSearch: true,
			dropupAuto: false
		});
		$('.select__pais').selectpicker('refresh');
		/// si ya estuve en nasbi, selecciono el pais q ya tengo en el localstorage
		getPaisStorage()
	}).fail((err) => {
		console.log(err);
		localStorage.removeItem('paises');
	});
}
function myTranslatePage(idiomaJSON) {
	$.each(idiomaJSON, (key, value) => {
		if (key.indexOf('__src') > 0) {
			$('.' + key).attr("src", value);

		} else if (key.indexOf('__ph') > 0) {
			$('.' + key).attr("placeholder", value);

		} else {
			$('.' + key).html(value);
		}
	});
}

function getDefaultIdioma() {
	// getParamsFromUrl();
	// let params = new URLSearchParams(location.search);
	// console.log("ENTRO A LA FUNCION");
	// let auxLenguaje = (isValidParamUrl(params.get('lang')) ? params.get('lang') : "");
	// if(auxLenguaje != ""){
	//     console.log("EL STORAGE: ",localStorage.getItem('lenguaje'));
	//     return auxLenguaje;
	// }else{
	var ln_temp = window.navigator.language || navigator.browserLanguage;
	console.log("LN_TEMP: ", ln_temp);
	let idiomaSelected_temp = ln_temp;

	if (idiomaSelected_temp.toUpperCase().includes("ES")) {
		return "ES";
	} else {
		return "EN";
	}
	// }
}


function onChangePais(e) {
	console.log("onCHange");
	let paisID = $(e.target).val();
	const dato = arr_paises.find(pais => { return pais.country_id == paisID });
}
const getLanguaje = async () => {
	const storage = localStorage.getItem('lenguaje') || "EN";
	if (!localStorage.getItem('lenguaje')) await setLanguaje("EN")
	return storage;
}
const setLanguaje = async (lang) => {
	console.log("lang ", lang);
	if (!lang || lang == "") lang = await getLanguaje();
	localStorage.setItem('lenguaje', lang)
	return lang;
}


async function onChangePaisByID(paisID = 0) {
	console.log("OnchangeById");
	let valor_en_select_pais = $('.select__pais')[1].value;
	if (valor_en_select_pais != "") {
		const dato = arr_paises.find(pais => { return pais.country_id == paisID });
		localStorage.setItem("paisOrigen", JSON.stringify(dato));

		localStorage.setItem("iso_code_2_money", dato.iso_code_2);

		console.log("dato.iso_code_2: ", dato.iso_code_2);
		console.log("DAAATOOO: ", dato);
		if (("" + location.href).includes("localhost")) {
			if (localStorage.getItem("userAuth")) {
				let lenguaje_actual_funcion = await getLanguaje();
				location.href = `index.php?nle=${lenguaje_actual_funcion}`;
			}
			else {
				location.href = `index.php?lang=${localStorage.getItem('lenguaje')}&iso_code=${dato.iso_code_2}&country=${dato.country_id}`;
			}
		} else {
			if (localStorage.getItem("userAuth")) {
				let lenguaje_actual_funcion = await getLanguaje();
				location.href = `/content/index.php?nle=${lenguaje_actual_funcion}`;
			}
			else {
				location.href = `/content/index.php?lang=${localStorage.getItem('lenguaje')}&iso_code=${dato.iso_code_2}&country=${dato.country_id}`;
			}
		}
	} else {
		presentAlertObject_alert_new({ icon: 'error', text: idioma[lenguaje_optenido].trans477_ });
	}
}

function cargar1erIdioma(localLenguaje = "EN") {
	$.getJSON(`../json/${localLenguaje}.json`, (idiomajson) => {
		sessionStorage.setItem("idioma", JSON.stringify(idiomajson));
	});
}

function redirection() {
	const paisOrigen = localStorage.getItem("paisOrigen");
	if ((paisOrigen !== null) && (paisOrigen !== undefined) && (paisOrigen !== "")) {
		const paisOrigenParsed = JSON.parse(paisOrigen);
		if (paisOrigenParsed["_id"] !== "" && paisOrigenParsed["_id"] !== undefined) {
			// location.href = "/content/index.php";
			// Favor omitir esta redirección
		}
	}
}



function presentAlertObject_alert_new({ title = "N A S B I", text = "", icon = "info" }) {
	$('#modal-presentAlert-info').modal('show');

	$('.modal-presentAlert-info-title').html(`<div>${title}</div>`);
	$('.modal-presentAlert-info-body').html(`<div>${text}</div>`);

}
function getPaisStorage() {
	console.log("entro a get pais localstorage")
	let pais_localStorage = JSON.parse(localStorage.getItem("paisOrigen"))
	console.log(pais_localStorage)
	if (pais_localStorage) {
		$('.select__pais').val(pais_localStorage.country_id).selectpicker("refresh")
	}

}

