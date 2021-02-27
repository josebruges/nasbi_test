// Variables compartidas - JDBC
var schemaSubasta = {};
var schemaContentSubasta = {};
var ultimos15seg = false;

const dir = '../assets/audios';
var audios = [];

precargarSonidos();

var FancyWebSocket = function (url) {
	var callbacks = {};
	var ws_url = url;
	var conn;

	this.bind = function (event_name, callback) {
		callbacks[event_name] = callbacks[event_name] || [];
		callbacks[event_name].push(callback);
		return this;
	};

	this.send = function (event_name, event_data) {
		try {
			this.conn.send(event_data);
		} catch (e) {
			console.log("error connection socket", e);
		}
		return this;
	};

	this.connect = function () {
		console.log("iniciar socket");
		if (typeof (MozWebSocket) == 'function')
			this.conn = new MozWebSocket(url);
		else
			this.conn = new WebSocket(url);

		this.conn.onmessage = function (evt) {
			dispatch('message', evt.data);
		};

		this.conn.onclose = function () { console.log("CERRANDO SOCKET"); dispatch('close', null) }
		this.conn.onerror = (err) => {
			console.log("ERRROR EN SOCKET ", err);
		}
		this.conn.onopen = function () { dispatch('open', null) }


	};

	this.disconnect = function () {
		this.conn.close();
	};

	var dispatch = function (event_name, message) {
		if (message != null && message != "" && message != "R")//aqui es donde se realiza toda la accion, R es para mantener el socket activado
		{
			console.log("message: ", message);
			console.log("message: ", message);
			var JSONdata = JSON.parse(message); //parseo la informacion
			actualiza_mensaje(message);
		}
		if (event_name == "open") { //inicar el interval para mantener actividad en el socket y no se pierda la conecxión
			updateConnection();
		}
	}
};

const updateConnection = () => {
	setInterval(refreshConnection, 10000);
}

const refreshConnection = () => {
	console.log("refresh socket connecction");
	send('R');
}

var Server;
function send(text) {
	Server.send('message', text);
}
$(document).ready(() => {
	// Server = new FancyWebSocket('wss://nasbi.peers2win.com:12234');
	// Server = new FancyWebSocket('wss://nasbi.peers2win.com/websocket:12234');
	Server = new FancyWebSocket('wss://nasbi.peers2win.com/wss'); //socket subastas 09.11.2020
	Server.bind('open', ($event) => {
	});
	Server.bind('close', (data) => {
	});
	Server.bind('message', (payload) => {
	});
	Server.connect();
	$(".modal__subastas__winner").attr("src", "../assets/giffs/1-" + localLenguaje.toLowerCase() + ".gif")
	$(".modal__subastas__nowinner").attr("src", "../assets/giffs/2-" + localLenguaje.toLowerCase() + ".gif")
});

function obtenerTime(numero) {
	numero = numero / 1000;
	let minutos = parseInt(numero / 60);
	let segundos = parseInt((numero - (minutos * 60)));
	let min = (minutos < 10) ? "0" + minutos : minutos;
	let sec = segundos < 10 ? "0" + segundos : segundos;
	if (minutos <= 0 && segundos <= 0) {
		return "0m 0s.";
	}
	let stringg = min + "m " + sec + "s.";
	return stringg;
}


ordenPendiente = 0;
setInterval(($event) => {

	let resultTaks = $("#timer").html().includes('0m 0s.');
	if ($('#modal-pujar').is(':visible') && schemaSubasta.estado_subasta >= 3) {
		// console.log('\n\t Socket.js/setInterval/obtenerTime(ordenPendiente - +new Date()):', (obtenerTime(ordenPendiente - +new Date())));

		let diff = obtenerTime(ordenPendiente - (+new Date()));
		$("#timer").html(diff);
		if (resultTaks && schemaContentSubasta.data != null) {

			$('.__pujar').prop("disabled", true);

			console.log("\n\n\n\t\t\t\t.........::::::: Se concluye que la subasta ha finalizado :::::::.........");
			console.log("\t\t\t\t [ 1 ] Datos subasta finalizada [schemaSubasta]: ", schemaSubasta);
			console.log("\t\t\t\t [ 2 ] Datos subasta finalizada [schemaContentSubasta]: ", schemaContentSubasta);

			finalizarSubasta();
		}
		let tiempo = diff.split(' ').join('').split('m')[1].split('s')[0];
		tiempo *= 1;
		if (tiempo == 15 && $("#timer").html().includes('0m 15s.')) {
			playSoundPujaFaltan15();
		} else if (tiempo > 15 && ultimos15seg) {
			playSoundPujaFaltan15Stop();
			ultimos15seg = false;
		}
	}
}, 1000);

function actualiza_mensaje(message) {
	console.log('\n\t Socket.js/message:', message);
	console.log('\n\t Socket.js/schemaSubasta:', schemaSubasta);
	console.log('\n\t Socket.js/schemaContentSubasta:', schemaContentSubasta);
	console.log('\n\t user:', user);
	var JSONdata = JSON.parse(message);
	console.log("Jsondata ", JSONdata);
	if (!JSONdata.puja_actual) {
		return;
	}
	if (!JSONdata.puja_actual.id_subasta) {
		return;
	}

	// Importante:
	// Validar que la información que se recibe pertence a al subasta que estoy visualizando en el modal.
	// schemaSubasta: El valor de esta variable se asigna en mis-subastas.js cada vez que se abre el modal de pujas.
	// schemaContentSubasta: El valor de esta variable se asigna en mis-subastas.js cada vez que se abre el modal de pujas. Siendo el result del webservice

	if (JSONdata.puja_actual.id_subasta == schemaSubasta.id_subasta) {
		if (user.uid != JSONdata.puja_actual.uid) {
			let messageAlert = "";

			if (JSONdata.status == "errorMontoSugerido") {
				messageAlert = idioma['trans_105'];
				messageAlert = messageAlert.split("@@@").join(schemaContentSubasta.sugerido_mask + " " + getCoinLabel(schemaSubasta.moneda)).split("###").join(schemaContentSubasta.sugerido_usd_mask + " USD");

			} else if (JSONdata.status == "errorMontoPujar") {
				messageAlert = idioma['trans_106'];
				messageAlert = messageAlert.split("@@@").join(schemaContentSubasta.data[0].username.toUpperCase()).split("###").join(schemaContentSubasta.data[0].monto_mask + " " + getCoinLabel(schemaSubasta.moneda));

			} else if (JSONdata.status == "montoErroneo") {
				messageAlert = idioma['trans_107'];

			} else if (JSONdata.status == "fail") {
				messageAlert = idioma['trans_108'];
			}

			// Si por algun motivo LA PERSONA QUE PUJO (USUARIO LOGEADO) obtuvo algún error
			// Se valida para no le salga el mensaje a todos los inscritos en la subas y se muestré solo al propietario del error.
			console.log("messageAlert: ", messageAlert);
			if (messageAlert.length > 0 && user.uid == JSONdata.uid_pujo) {
				$('.col__errors__content').show('slow');
				$('.col__errors__msg').text(messageAlert);
				return;
			} else {
				$('.col__errors__content').hide('slow');
			}

			// Si todo esta correcto sin errores.
			// Paso 1: Agregar al array de pujas la nueva puja.

			let arr = schemaContentSubasta.data ? schemaContentSubasta.data : [];
			arr.unshift(JSONdata.puja_actual);

			schemaContentSubasta = JSONdata;
			schemaContentSubasta.data = arr;

			if (schemaContentSubasta.data.length == 1) {
				$('.row_sugerido_init').hide();
			}

			// Si yo fui quien pujo debe sonar un audio para mi
			console.log("\n\tQuien fue el que pujo: [user.uid]= ", user.uid, " vs [schemaContentSubasta.puja_actual.uid]= ", schemaContentSubasta.puja_actual.uid);
			if (user.uid != schemaContentSubasta.puja_actual.uid) {
				playSoundPujaCompetencia();
			}

			// Reseteamos el temporizador con la nueva hora de finalización
			ordenPendiente = schemaContentSubasta.puja_actual.fecha_final * 1;
			schemaSubasta.estado_subasta = schemaContentSubasta.estado_subasta * 1;

			// Actualizamos información basica sugeridad por la plataforma
			subastas_actualizar_informacion(schemaSubasta, schemaContentSubasta);

			// Mostramos cuantas pujar han sido ofertadas.
			$('.modal_puja_total__pujas').text(schemaContentSubasta.data.length);

			// Buscamos en nuevo lider de la subasta. Quien siempre será el de la posición número cero
			let liderData = schemaContentSubasta.data[0];
			let resultFilter = schemaContentSubasta.data.filter((item) => { return liderData.uid == item.uid });
			liderData.isLider = (liderData.uid * 1 == user.uid * 1);

			// Mostramos la información del lider de la subasta, el monto pujado y cuantas ofertas ha realizado.
			$('.__gandosubasta').html(`${liderData.username} ${liderData.monto_mask} ${getCoinLabel(schemaSubasta.moneda)} <p>${(liderData.uid * 1 == user.uid * 1) ? idioma['trans_209'] : idioma['trans_208']}</p> <span>+ ${resultFilter.length}</span>`); //Quien va de primero

			// Cambiamos los colores

			if ($('.row-lider').prop('id') * 1 == user.uid * 1) {
				$('.row-lider').addClass("row-secundP");
				$('.row-lider').removeClass("row-lider");
			} else {
				$('.row-lider').addClass("row-others");
				$('.row-lider').removeClass("row-lider");
			}
			$('#row_img_lider').prop('src', '../imagen/secund.png');

			//Validamos que si yo soy el lider no deberia mostrar en la derecha quien va de lider y yo como voy
			$('.__mesubastando').show();
			$('.__gandosubasta').show();
			$('.row_lidersubasta').show();
			$('.row_userAuth').show();

			if (liderData.isLider) {
				/*$('.row_lidersubasta').hide();*/
				$('.row_userAuth').show('slow');
			} else {
				$('.row_lidersubasta').show('slow');
				$('.row_userAuth').show('slow');
			}

			// Agregamos la información de la puja al listado.
			let myUltimaPujaData = {};
			let index = 0;
			let item = schemaContentSubasta.data[index];

			let labelColorClass = "row-others";
			if (item.uid * 1 == user.uid * 1 && index == 0) {
				labelColorClass = "row-lider";

				myUltimaPujaData = item;
				myUltimaPujaData
				$('.__mesubastando').html(`${user.username} ${myUltimaPujaData.monto_mask} ${getCoinLabel(schemaSubasta.moneda)} ${liderData.isLider ? '<span><i class="fas fa-angle-double-up"></i></span>' : '<span><i class="fas fa-angle-double-down"></i></span>'}`); //Yo

			} else {
				if (index == 0) {
					labelColorClass = "row-lider";
				} else if (item.uid * 1 == user.uid * 1) {
					labelColorClass = "row-secundP";
					if (Object.keys(myUltimaPujaData).length == 0) {
						myUltimaPujaData = item;
						$('.__mesubastando').html(`${user.username} ${myUltimaPujaData.monto_mask} ${getCoinLabel(schemaSubasta.moneda)} ${liderData.isLider ? '<span><i class="fas fa-angle-double-up"></i></span>' : '<span><i class="fas fa-angle-double-down"></i></span>'}`); //Yo
					}
				} else { }
			}

			console.log("\n\n\n\n\n PASANDO POR AQUÍ \n\n\n\n\n");
			//validación para que no liste mis pujas porque son agregadas manualmente después de invocar el webservice
			$('.__listadoapostadores').prepend(`
				<div id="${item.uid}" class="row ${labelColorClass} mb-3">
					<div class="col-6 px-2">
						<div class="divelipsi">
							<img id="${index == 0 ? 'row_img_lider' : 'row_img_others'}" src="../imagen/${index == 0 ? 'nameUserpuja.png' : 'secund.png'}"><p class="left"> ${item.username} </p>
						</div>
					</div>
					<div class="col-6 px-2">
						<p class="right">${ item.monto_mask} ${getCoinLabel(schemaSubasta.moneda)}</p><br>
					</div>
					<div class="col-12 px-2" style="height:10px"></div>
				</div>
			`);
		}
		console.log("\n\n\n\n\n PASANDO POR AQUÍ \n\n\n\n\n");

		console.log('\n\t Socket.js/actualiza_mensaje:', JSONdata);

		// $("#1").html(contenidoDiv+mensajehtml+'<br/>');
	}
}


const addMyBid = (data) => {
	console.log("data ", data);
	var JSONdata = JSON.parse(data);
	console.log("estoy en addmybid \n\n")

	console.log("estoy en addmybid02")
	let messageAlert = "";

	if (JSONdata.status == "errorMontoSugerido") {
		messageAlert = idioma['trans_105'];
		messageAlert = messageAlert.split("@@@").join(schemaContentSubasta.sugerido_mask + " " + getCoinLabel(schemaSubasta.moneda)).split("###").join(schemaContentSubasta.sugerido_usd_mask + " USD");

	} else if (JSONdata.status == "errorMontoPujar") {
		messageAlert = idioma['trans_106'];
		messageAlert = messageAlert.split("@@@").join(schemaContentSubasta.data[0].username.toUpperCase()).split("###").join(schemaContentSubasta.data[0].monto_mask + " " + getCoinLabel(schemaSubasta.moneda));

	} else if (JSONdata.status == "montoErroneo") {
		messageAlert = idioma['trans_107'];

	} else if (JSONdata.status == "fail") {
		messageAlert = idioma['trans_108'];
	}

	// Si por algun motivo LA PERSONA QUE PUJO (USUARIO LOGEADO) obtuvo algún error
	// Se valida para no le salga el mensaje a todos los inscritos en la subas y se muestré solo al propietario del error.
	console.log("messageAlert: ", messageAlert);
	if (messageAlert.length > 0 && user.uid == JSONdata.uid_pujo) {
		console.log("hubo error")
		$('.col__errors__content').show('slow');
		$('.col__errors__msg').text(messageAlert);
		return;
	} else {
		$('.col__errors__content').hide('slow');
	}
	if (!JSONdata.puja_actual) {
		return;
	}
	if (!JSONdata.puja_actual.id_subasta) {
		return;
	}

	// Si todo esta correcto sin errores.
	// Paso 1: Agregar al array de pujas la nueva puja.

	let arr = schemaContentSubasta.data ? schemaContentSubasta.data : [];
	arr.unshift(JSONdata.puja_actual);

	schemaContentSubasta = JSONdata;
	schemaContentSubasta.data = arr;

	if (schemaContentSubasta.data.length == 1) {
		$('.row_sugerido_init').hide();
	}

	// Si yo fui quien pujo debe sonar un audio para mi
	console.log("\n\tQuien fue el que pujo: [user.uid]= ", user.uid, " vs [schemaContentSubasta.puja_actual.uid]= ", schemaContentSubasta.puja_actual.uid);
	if (user.uid != schemaContentSubasta.puja_actual.uid) {
		playSoundPujaCompetencia();
	} else {
		playSoundPuja();
	}

	// Reseteamos el temporizador con la nueva hora de finalización
	ordenPendiente = schemaContentSubasta.puja_actual.fecha_final * 1;
	schemaSubasta.estado_subasta = schemaContentSubasta.estado_subasta * 1;

	// Actualizamos información basica sugeridad por la plataforma
	subastas_actualizar_informacion(schemaSubasta, schemaContentSubasta);

	// Mostramos cuantas pujar han sido ofertadas.
	$('.modal_puja_total__pujas').text(schemaContentSubasta.data.length);

	// Buscamos en nuevo lider de la subasta. Quien siempre será el de la posición número cero
	let liderData = schemaContentSubasta.data[0];
	let resultFilter = schemaContentSubasta.data.filter((item) => { return liderData.uid == item.uid });
	liderData.isLider = (liderData.uid * 1 == user.uid * 1);

	// Mostramos la información del lider de la subasta, el monto pujado y cuantas ofertas ha realizado.
	$('.__gandosubasta').html(`${liderData.username} ${liderData.monto_mask} ${getCoinLabel(schemaSubasta.moneda)} <p>${(liderData.uid * 1 == user.uid * 1) ? idioma['trans_209'] : idioma['trans_208']}</p> <span>+ ${resultFilter.length}</span>`); //Quien va de primero

	// Cambiamos los colores

	if ($('.row-lider').prop('id') * 1 == user.uid * 1) {
		$('.row-lider').addClass("row-secundP");
		$('.row-lider').removeClass("row-lider");
	} else {
		$('.row-lider').addClass("row-others");
		$('.row-lider').removeClass("row-lider");
	}
	$('#row_img_lider').prop('src', '../imagen/secund.png');

	//Validamos que si yo soy el lider no deberia mostrar en la derecha quien va de lider y yo como voy
	$('.__mesubastando').show();
	$('.__gandosubasta').show();
	$('.row_lidersubasta').show();
	$('.row_userAuth').show();

	if (liderData.isLider) {
		/*$('.row_lidersubasta').hide();*/
		$('.row_userAuth').show('slow');
	} else {
		$('.row_lidersubasta').show('slow');
		$('.row_userAuth').show('slow');
	}

	// Agregamos la información de la puja al listado.
	let myUltimaPujaData = {};
	let index = 0;
	let item = JSONdata.puja_actual;

	let labelColorClass = "row-others";
	if (item.uid * 1 == user.uid * 1 && index == 0) {
		labelColorClass = "row-lider";

		myUltimaPujaData = item;
		myUltimaPujaData
		$('.__mesubastando').html(`${user.username} ${myUltimaPujaData.monto_mask} ${getCoinLabel(schemaSubasta.moneda)} ${liderData.isLider ? '<span><i class="fas fa-angle-double-up"></i></span>' : '<span><i class="fas fa-angle-double-down"></i></span>'}`); //Yo

	} else {
		if (index == 0) {
			labelColorClass = "row-lider";
		} else if (item.uid * 1 == user.uid * 1) {
			labelColorClass = "row-secundP";
			if (Object.keys(myUltimaPujaData).length == 0) {
				myUltimaPujaData = item;
				$('.__mesubastando').html(`${user.username} ${myUltimaPujaData.monto_mask} ${getCoinLabel(schemaSubasta.moneda)} ${liderData.isLider ? '<span><i class="fas fa-angle-double-up"></i></span>' : '<span><i class="fas fa-angle-double-down"></i></span>'}`); //Yo
			}
		} else { }
	}

	console.log("\n\n\n\n\n PASANDO POR AQUÍ \n\n\n\n\n");
	//validación para que no liste mis pujas porque son agregadas manualmente después de invocar el webservice
	$('.__listadoapostadores').prepend(`
		<div id="${item.uid}" class="row ${labelColorClass} mb-3">
			<div class="col-6 px-2">
				<div class="divelipsi">
					<img id="${index == 0 ? 'row_img_lider' : 'row_img_others'}" src="../imagen/${index == 0 ? 'nameUserpuja.png' : 'secund.png'}"><p class="left"> ${item.username} </p>
				</div>
			</div>
			<div class="col-6 px-2">
				<p class="right">${ item.monto_mask} ${getCoinLabel(schemaSubasta.moneda)}</p><br>
			</div>
			<div class="col-12 px-2" style="height:10px"></div>
		</div>
	`);
}


function finalizarSubasta() {
	if (!schemaContentSubasta.data) {
		if ($('#modal-pujar').is(':visible')) {
			$('#modal-pujar').modal('hide');

		}
		return;
	}
	if (!schemaContentSubasta.puja_actual) {
		if ($('#modal-pujar').is(':visible')) {
			$('#modal-pujar').modal('hide');

		}
		return;
	}
	if (schemaContentSubasta.envioFinalizado) {
		return;
	}
	schemaContentSubasta.envioFinalizado = 1;

	let datosEnvio = {
		"data": {
			"uid": user.uid,
			"id": schemaContentSubasta.puja_actual.id_subasta
		}
	};


	console.log("\t\t\t\t [ 3 ] Datos subasta finalizada [datosEnvio]: ", datosEnvio);
	$.ajax({
		url: `${baseurl}/controllers/mis_subastas/?finalizar_subasta`,
		type: 'POST',
		data: datosEnvio,
		dataType: 'json',
	}).done((result) => {

		console.log("\t\t\t\t [ 4 ] Datos subasta finalizada [result]: ", result);

		$('#modal-pujar').modal('hide');
		if (!$('#modal-subasta-finalizada').is(':visible')) {

			if (result.status == "success") {
				$('.modal__subastas__winner').hide();
				$('.modal__subastas__winner').show();
				playSoundPujaWinner();
				console.log("\t\t\t\t [ 5 ] Datos subasta finalizada [GANE YO]");
				console.log("\t\t\t\t [ 6 ] Datos subasta finalizada [datosEnvio.data.uid]: ", datosEnvio.data.uid);
				console.log("\t\t\t\t [ 7 ] Datos subasta finalizada [datosEnvio.data.uid]: ", user.uid);


			} else {
				$('.modal__subastas__nowinner').hide();
				$('.modal__subastas__nowinner').show();
				playSoundPujaNoWinner();
				console.log("\t\t\t\t [ 5 ] Datos subasta finalizada [NOO - GANE YO]");
				console.log("\t\t\t\t [ 6 ] Datos subasta finalizada [datosEnvio.data.uid]: ", datosEnvio.data.uid);
				console.log("\t\t\t\t [ 7 ] Datos subasta finalizada [datosEnvio.data.uid]: ", user.uid);

			}

			countMyCartsAuth(user);
		}

		$('#modal-subasta-finalizada').modal('show');
		setTimeout(() => {
			$('#modal-subasta-finalizada').modal('hide');
		}, 4500);

		getsubastas();
		llenar_array_estado_subasta();
		$(".historial_subasta").click();

		console.log("\n\n\n\n");
		console.log("\tFinalizar subastas [success]: ", (`${baseurl}/controllers/mis_subastas/?finalizar_subasta`));
		console.log("\t Finalizar subasta [success]: ", result);

	}).fail((err) => {

		console.log("\n\n\n\n");
		console.log("\tFinalizar subastas [ERROR]: ", (`${baseurl}/controllers/mis_subastas/?finalizar_subasta`));
		console.log("\t Finalizar subasta [ERROR]: ", err);
	});
}

function actualiza_solicitud() {
	alert("tipo de envio 2");
}

function precargarSonidos() {
	audios.push(new Audio(`${dir}/audio_puja.mp3`));
	audios.push(new Audio(`${dir}/audio_puja_competencia.mp3`));

	audios.push(new Audio(`${dir}/audio_faltan_15seg.mp3`));

	audios.push(new Audio(`${dir}/audio_winner.mp3`));
	audios.push(new Audio(`${dir}/audio_no_winner.mp3`));
}
function playSoundPuja() {
	audios[0].play();
}
function playSoundPujaCompetencia() {
	audios[1].play();
}
function playSoundPujaFaltan15() {
	audios[2].play();
	ultimos15seg = true;
}
function playSoundPujaFaltan15Stop() {
	audios[2].pause();
	audios[2].currentTime = 0;
}
function playSoundPujaWinner() {
	audios[3].play();
}
function playSoundPujaNoWinner() {
	audios[4].play();
}

function subastas_actualizar_informacion(schemaSubasta = {}, schemaContentSubasta = {}) {

	console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
	console.log("***** [ schemaSubasta ]: ", schemaSubasta);
	console.log("***** [ schemaContentSubasta ]: ", schemaContentSubasta);
	let check_sugeridoTemp = $(".modal__puja__sugerido").prop("checked");
	console.log("***** [ .check_sugerido ]: ", check_sugeridoTemp);

	if (check_sugeridoTemp) {
		console.log("---> aqui agregando otro sugerido");
		$('.__cantidadPuja').val(schemaContentSubasta.sugerido);
		$('.__cantidadPujaUSD').val(schemaContentSubasta.sugerido_usd);
	} else {
		/*let __cantidadPujaUSDTemp = ofertaCOIN * schemaContentSubasta.precio_moneda * 1;
		$('.__cantidadPujaUSD').val(schemaContentSubasta.sugerido_usd);*/
		if (schemaContentSubasta.data) {
			if (schemaContentSubasta.data) {
				if (schemaContentSubasta.data[0].monto) {
					let __cantidadPujaUSD = schemaContentSubasta.data[0].monto * schemaContentSubasta.precio_moneda * 1;
					__cantidadPujaUSD.toFixed(2);
					$('.__cantidadPuja').val(schemaContentSubasta.data[0].monto);
					$('.__cantidadPujaUSD').val(__cantidadPujaUSD.toFixed(2) * 1);

				}
			}
		}

	}

}
