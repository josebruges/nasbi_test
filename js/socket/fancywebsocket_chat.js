const updateConnection = () =>{
	setInterval(refreshConnection, 10000);
}

const refreshConnection = () =>{
	console.log("refresh socket connecction");
	send('R');
}

// Variables compartidas - JDBC
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
		this.conn.send(event_data);
		return this;
	};

	this.connect = function () {
		if (typeof (MozWebSocket) == 'function')
			this.conn = new MozWebSocket(url);
		else
			this.conn = new WebSocket(url);

		this.conn.onmessage = function (evt) {
			dispatch('message', evt.data);
		};

		this.conn.onclose = function () { dispatch('close', null) }
		this.conn.onopen = function () { dispatch('open', null) }
	};

	this.disconnect = function () {
		this.conn.close();
	};

	var dispatch = function (event_name, message) {
		if (message != null && message != "" && message != "R")//aqui es donde se realiza toda la accion
		{
			var JSONdata = JSON.parse(message); //parseo la informacion
			actualiza_mensaje(message);
		}
	}
};

var Server;
function send(text) {
	// AQUÍ SE RECIBE EL MENSAJE QUE SE QUIERE TRANSMITIR A TODOS LOS USUARIOS.
	// console.log("---> Enviando: ", text);
	Server.send('message', text);
}
$(document).ready(($event) => {
	// Server = new FancyWebSocket('wss://nasbi.peers2win.com:11111');
	Server = new FancyWebSocket('wss://nasbi.peers2win.com/ws'); //socket chat
	Server.bind('open', ($event) => { });
	Server.bind('close', (data) => { });
	Server.bind('message', (payload) => { });
	Server.connect();
});

function actualiza_mensaje(message) {
	// console.log('\n\t Socket.js/message CHAT:', message);
	var JSONdata = JSON.parse(message);

	// INICIO: Aqui se implementa la logica

	// 1. Validar que el modal del chat este abierto.
	if ($('#modal-chat').is(':visible')) {

		// 2. Que sea el chat del usuario logeado. si el chat me pertenence NO PUEDEN SALIR LOS MENSAJES DE ESOS USUARIOS EN MI CHAT
		// console.log("Este mensaje pertenece al chat que esta abierto: ", (schemaChat.id == JSONdata.orderDeCompra.id));
		// console.log("Actual chat: ", schemaChat.id);
		// console.log("Mensaje recibido chat: ", JSONdata.orderDeCompra.id);
		if (schemaChat.id == JSONdata.orderDeCompra.id) {


			if (user.uid == JSONdata.data.uid) {
				// Un mensaje que yo envie
				// console.log(" - Un mensaje que yo envie.");
				/*showMiMensaje(JSONdata.mensaje, JSONdata.img);*/
			} else {
				cont_mensajes = 0;
				$(".notif_chat" + JSONdata.orderDeCompra.id).hide("fast")
				//Un mensaje que me esta llegando

				// console.log(" - Un mensaje que me esta llegando.");
				showMensaje(JSONdata.mensaje, JSONdata.img);
				audios[0].play();
			}
		} else {
			// console.log("Este mensaje pertenece al chat que esta abierto: ", (schemaChat.id == JSONdata.orderDeCompra.id));
			// console.log("Mensaje recibido chat: ", JSONdata.orderDeCompra.id);
			if (user.uid == JSONdata.receptor.id) {

				// Un mensaje que me llego 
				var cant_mensajes = $(".notif_chat" + JSONdata.orderDeCompra.id).text()
				$(".notif_chat" + JSONdata.orderDeCompra.id).text(parseInt(cant_mensajes) + 1)
				$(".notif_chat" + JSONdata.orderDeCompra.id).show("flash")
				// console.log(" - Un mensaje que me llego y tengo otro chat abierto", cant_mensajes);

			}

		}
	} else {
		// console.log("Este mensaje pertenece al chat que esta abierto: ", (schemaChat.id == JSONdata.orderDeCompra.id));
		// console.log("Mensaje recibido chat: ", JSONdata.orderDeCompra.id);
		if (user.uid == JSONdata.receptor.id) {

			// Un mensaje que me llego 
			var cant_mensajes = $(".notif_chat" + JSONdata.orderDeCompra.id).text()
			$(".notif_chat" + JSONdata.orderDeCompra.id).text(parseInt(cant_mensajes) + 1)
			$(".notif_chat" + JSONdata.orderDeCompra.id).show("flash")
			// console.log(" - Un mensaje que me llego y no esta abierto el chat", cant_mensajes);

			audios[0].play();

		}
	}

	// FIN: Aqui se implementa la logica
}
function precargarSonidos() {
	audios.push(new Audio(`${dir}/OrganicAlertNotifications_01.wav`));
}
