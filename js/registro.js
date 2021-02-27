reiniciarLabelsErrors();
let params = new URLSearchParams(location.search);
let paisesJSON_emp = JSON.parse(localStorage.getItem('paises'));
let cod_referido = (params.get('r') == undefined ? "" : params.get('r'))
if (validarText(cod_referido)) {
	$(".red_registro_empresa").attr("href", "registro-empresa.php?r=" + cod_referido)
	$(".red_registro_usuario").attr("href", "registro.php?r=" + cod_referido)
}

var lang = "ES";

var arr_intereses = [
	idioma['trans_32'],
	idioma['trans_33'],
	idioma['trans_34'],
	idioma['trans_35'],
	idioma['trans_36']
];
getIntereses(arr_intereses);

var arr_paises = [];
var user_login;
var uid;
getPaisesLocal();


// Validamos si el usuario desea solicitar que se
// Habilite la opción para poder referir negocios en nasbi.com
let params_register = new URLSearchParams(location.search);
console.log("------> Activar referido de empresas: ", params_register.get('keyrefercode'));

$(document).ready(($event) => {
	console.log('asasd', user);
	$('.registro__referido').val(cod_referido)

	if (validarText(user)) loadPage('index.php');
	$(".registro__btn").click(($event) => {
		$('.registro__btn__spinner').show();
		$(".registro__btn").attr("disabled", true);

		let list_errors = "";

		if (!$('.registro__terms').is(':checked')) {
			list_errors += "<br>" + idioma['trans_07'];
		}
		if (!$('.registro__politics').is(':checked')) {
			list_errors += "<br>" + idioma['trans_06'];
		}
		if (list_errors.length > 0) {
			presentAlert(idioma["trans_00"], list_errors, "info");
			$(".registro__btn").attr("disabled", false);
			$('.registro__btn__spinner').hide();
		} else {
			let params = {
				nombreCompleto: $('.registro__name').val(),
				email: $('.registro__email').val().trim(),
				usuario: $('.registro__usuario').val().trim(),
				password: $('.registro__pass').val().trim(),
				paisid: $('.registro__country option:selected').val(),
				ciudad: $('.registro__city').val(),
				telefono: $('.registro__phone__number').val(),
				// interes: $('.registro__interests option:selected').val(),
				plataforma: 3,
				idioma: localLenguaje,
				referido: $('.registro__referido').val(),
			};
			isValidForm(params);
		}
	});

	$(".registro_terminos_condiciones").off();
	$(".registro_terminos_condiciones").on("click", function (params) {
		openPDF("https://nasbi.com/assets/docs/terminos-y-condiciones-generales-nasbi-v8.pdf")
	});
	$(".registro_politica_privacidad").off();
	$(".registro_politica_privacidad").on("click", function (params) {
		openPDF("https://nasbi.com/assets/docs/politicas-privacidad-nasbi-v10.pdf")
	});


	$("#bienvenida-registro-user").on('hidden.bs.modal', function () {
		$('.registro__name').val("");
		$('.registro__usuario').val(""),
			$('.registro__email').val("");
		$('.registro__pass').val("");
		$('.registro__confirm__pass').val("");
		$('.registro__country').val(arr_paises[0].id);
		$('.registro__city').val("");
		$('.registro__phone__number').val("");
		// $('.registro__interests').val("");
		loadPage("promociones.php")
	});
	$(".validar_codigo_registro").off()
	$(".validar_codigo_registro").on('click', validarCodigoRegistroUsuario)
	$('.btn_eye_registro').on('click', function (e) {
		chageBtnEye(this, ".registro__pass")
	})
	$('.btn_eye_registro_confirm').on('click', function (e) {
		chageBtnEye(this, ".registro__confirm__pass")
	})
});
function authCheck(user) {
	if (!user) {
		presentNavBar();

		$('.navbar__nologeado').show("slow");

		// $('.navbar__logeado').hide(3000);
		$('.navbar__logeado').hide("fast");
	} else {
		presentNavBarAuth();
	}
}
function presentNavBarAuth() {
	$('.navbar__logeado').show();
	$('.navbar__nologeado').hide();
}
function presentNavBar() {
	$('.navbar__nologeado').show();
	// $('.navbar__nologeado').show("slow");
	// $('.navbar__logeado').hide(3000);
	// $('.navbar__logeado').hide("fast");
	$('.navbar__logeado').hide();
}

function isValidForm(params = {}) {
	let isValidForm = true;
	if (params.nombreCompleto.trim().length == 0) {
		$('.form-error_registro__name').show("slow");
		isValidForm = false;
	} else {
		$('.form-error_registro__name').hide();
	}
	if (params.email.trim().length == 0) {
		$('.form-error_registro__email').show("slow");
		isValidForm = false;
	} else {
		$('.form-error_registro__email').hide();
	}
	if (params.usuario.trim().length == 0) {
		$('.form-error_registro__usuario').show("slow");
		isValidForm = false;
	} else {
		$('.form-error_registro__usuario').hide();
	}
	if (!validarUsername(params.usuario.trim())) {
		$('.form-error_registro__invaliduser').show("slow");
		isValidForm = false;
	} else {
		$('.form-error_registro__invaliduser').hide();
	}

	if (params.password.trim() != $('.registro__confirm__pass').val()) {
		$('.form-error_registro__nocoincide__pass').show("slow");
		isValidForm = false;
	} else {
		$('.form-error_registro__nocoincide__pass').hide();

		if (params.password.trim().length == 0) {
			$('.form-error_registro__pass').show("slow");
			isValidForm = false;
		} else {
			$('.form-error_registro__pass').hide();
		}
		if ($('.registro__confirm__pass').val().length == 0) {
			$('.form-error_registro__confirm__pass').show("slow");
			isValidForm = false;
		} else {
			$('.form-error_registro__confirm__pass').hide();
		}
		if (!validarPassword(params.password.trim())) {
			$('.form-error_registro__pass_valid').show("slow");
			isValidForm = false;
		} else {
			$('.form-error_registro__pass_valid').hide();
		}
	}


	if (params.paisid.trim().length == 0) {
		$('.form-error_registro__country').show("slow");
		isValidForm = false;
	} else {
		$('.form-error_registro__country').hide();
	}
	if (params.ciudad.trim().length == 0) {
		$('.form-error_registro__city').show("slow");
		isValidForm = false;
	} else {
		$('.form-error_registro__city').hide();
	}
	if (params.telefono.trim().length == 0) {
		$('.form-error_registro__phone__number').show("slow");
		isValidForm = false;
	} else {
		$('.form-error_registro__phone__number').hide();
	}
	// if (params.interes == "t" || params.interes == "Interes") {
	// 	$('.form-error_registro__interests').show("slow");
	// 	isValidForm = false;
	// } else {
	// 	$('.form-error_registro__interests').hide();
	// }
	if (isValidForm) {
		console.log(params)
		validarReferido(params)

		//register(params);
	} else {
		$(".registro__btn").attr("disabled", false);
		$('.registro__btn__spinner').hide();
		setTimeout(() => {
			reiniciarLabelsErrors();
		}, 5000);
	}
}
function reiniciarLabelsErrors() {
	$('.form-error-control').hide();
}
function register(params = {}) {

	if (params_register.get('keyrefercode') != undefined && params_register.get('keyrefercode') != null && params_register.get('keyrefercode') != "") {
		params.email_refer = 1;
	} else {
		params.email_refer = 0;
	}


	let data_url = `${serverUrl}controllers/users/registroinvitado.php`;
	$.ajax({
		type: "POST",
		url: data_url,
		data: params,
		dataType: "json",
		success: async datos => {
			console.log("Response codigo confirmación: ", datos);
			$(".registro__btn").attr("disabled", false);
			$('.registro__btn__spinner').hide();

			if (datos['status'] == "success") {
				params.empresa = 0;
				params.paisid = paisesJSON_emp.filter(f => f.iso_code_2 == params.paisid)[0].country_id
				let nacionalidad = await enviarNacionalidadUsuario(params);
				if (nacionalidad) {
					user_login = params
					console.log("------ paso por aqui");
					// auth(userAuthData, 1).then(success => {
					$('.registro__btn__spinner').hide();
					console.log("/////// paso por aqui ");
					$('#final-registro').modal('toggle');
					$('#final-registro').on('hide.bs.modal', function () {
						$("#validar-registro-empresa").modal("toggle")
					})
				}

				// });
			} else if (datos["status"] == 'errorUserExiste') {
				presentAlert(idioma['trans_04'], idioma['_trans859'])

			} else if (datos["status"] == 'errorLogin') {
				presentAlert(idioma['trans_04'], idioma['_trans859'])

			} else if (datos["status"] == 'errorUserExiste') {
				presentAlert(idioma['trans_04'], idioma['_trans882'], 'error');

			} else {
				presentAlert(idioma['trans_04'], idioma['trans_09'], 'error');

			}

		}, error: error => {
			$(".registro__btn").attr("disabled", false);
			$('.registro__btn__spinner').hide();
			console.log('error verify: ', error);
			presentAlert(idioma['trans_04'], idioma['trans_09'], 'error');
		}
	});

}
function getPaisesLocal() {
	let data_url = serverUrl + "controllers/users/listarPaices.php";
	$.ajax({
		type: "POST",
		url: data_url,
		dataType: "json",
		contentType: 'application/json',
		success: datos => {
			console.log("-----> getPaises: ", datos);

			if (datos['status'] == "success") {
				arr_paises = datos.paices;
				crearSelectOptionPais(arr_paises);
			} else {
				presentAlert(idioma['trans_04'], idioma['trans_09'], 'error');
			}

		}, error: error => {
			console.log('error verify: ', error);
			presentAlert(idioma['trans_04'], idioma['trans_09'], 'error');
		}
	});
}
function crearSelectOptionPais(arr = []) {
	$('.registro__country').selectpicker('destroy');
	let html;
	html = `<option value="">${idioma.trans15}</option>`
	arr.forEach((pais) => {
		html += `<option value="${pais.id}">${pais.name}</option>`
	});
	$('.registro__country').html(html)
	$('.registro__country').selectpicker({
		size: 7,
		liveSearch: true
	})
	let pais_origen = JSON.parse(localStorage.getItem("paisOrigen"));
	if (pais_origen) {
		let pais_id = pais_origen.iso_code_2
		console.log(pais_origen, pais_id)
		$('.registro__country').val(pais_id).selectpicker("refresh")
	}
}
function getIntereses(arr = []) {
	$('.registro__interests').selectpicker('destroy');
	arr_intereses.forEach((item) => {
		$('.registro__interests').append($('<option>', {
			value: item,
			text: item
		}));
	});
	$('.registro__interests').selectpicker({
		size: 7,
	})
}
async function validarCodigoRegistroUsuario() {
	let codigo = $(".registro_empresa_codigo").val();
	if (!validarText(codigo)) return presentAlert(idioma['trans_04'], idioma['_trans863'])
	let response_validar = await getValidacionCodigoUsuario(codigo);
	////////////////
	if (response_validar) {
		let AuthData = {
			user: user_login.usuario,
			password: user_login.password,
		};
		auth(AuthData, 1);
	}
}
function validarReferido(params) {
	if (validarText(params.referido)) {

		$.ajax({
			type: 'POST',
			url: `${serverUrl}controllers/users/usuarioExistente.php`,
			data: { "id": params.referido },
			dataType: 'json',
			// headers: { 'x-api-key': user.token },
		}).done((res) => {
			if (res.length > 0) {
				console.log(res);
				console.log("registro")
				// resolve(true);
				register(params);

			} else {
				// resolve(false);
				managerInfoRef(params);
			}
		}).fail((err) => {
			$(".registro__btn").attr("disabled", false);
			$('.registro__btn__spinner').hide();
			setTimeout(() => {
				reiniciarLabelsErrors();
			}, 5000);
			return presentAlertObject({ icon: 'error', text: idioma.trans277_ });
		});

	} else {
		console.log("registro")
		register(params);
	}

}
function managerInfoRef(dataUser = {}) {
	$('#modal-confirmar-eliminar-info').modal('show');

	let pregunta = idioma['trans278_'].split('$r').join(dataUser.referido);
	$('.pregunta_de_eliminar-info-empresa').text(pregunta);

	$('.no_eliminar_direccion-info-empresa').off('click');
	$('.no_eliminar_direccion-info-empresa').on('click', null, function ($event) {
		$('#modal-confirmar-eliminar-info').modal('hide');
		dataUser.referido = "";
		register(dataUser);
		console.log("\n\n\n Estoy pasando por: crearEmpresa(dataEmpresa);");
	});

	$('.si_eliminar_direccion-info-empresa').off('click');
	$('.si_eliminar_direccion-info-empresa').on('click', null, function ($event) {
		$('#modal-confirmar-eliminar-info').modal('hide');
		$(".registro__referido").focus();
		$(".registro__btn").attr("disabled", false);
		$('.registro__btn__spinner').hide();
		setTimeout(() => {
			reiniciarLabelsErrors();
		}, 5000);
		console.log("\n\n\n Estoy pasando por: $('.registro__referido').focus();");
	});
}
function validarUsername(name) {
	let regex = /^[A-Za-z0-9]{1,15}$/
	console.log(name)
	if (regex.test(name)) {
		return true;
	} else {
		return false;
	}

}



