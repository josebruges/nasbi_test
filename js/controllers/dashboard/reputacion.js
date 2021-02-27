cargarRecupacion();

function cargarRecupacion() {
	//a la hora de llamar este wbs no se le puso token debido que producto_empresa usan este mismo para mandar otros usuario
	var user = JSON.parse(localStorage.getItem('userAuth'));
	const data_url = baseurl + "/controllers/datos_vendedor/?calificacion";
	const datos = {
		"data": {
			"uid": user.uid,
			"empresa": 1,
		}
	};

	$.ajax({
		type: "POST",
		url: data_url,
		data: datos,
		dataType: "json",
		success: res => {

			if (res.status == "success") {
				var pocentaje = (res.data.escala.escala * 100) / 5;

				$('#progeso-reputacion').css('width', `${pocentaje}%`);

				if (res.data.escala.detalle) {

					if (res.data.escala.detalle.contar * 1 <= 1) {
						$('.reputacion__categoria').text(idioma['trans_211']);
						$('.reputacion__categoria__img').prop('src', '../imagen/nivel1.png');

					} else if (res.data.escala.detalle.contar * 1 == 2) {
						$('.reputacion__categoria').text(idioma['trans_212']);
						$('.reputacion__categoria__img').prop('src', '../imagen/nivel2.png');

					} else if (res.data.escala.detalle.contar * 1 == 3) {
						$('.reputacion__categoria').text(idioma['trans_213']);
						$('.reputacion__categoria__img').prop('src', '../imagen/nivel3.png');

					} else if (res.data.escala.detalle.contar * 1 == 4) {
						$('.reputacion__categoria').text(idioma['trans_214']);
						$('.reputacion__categoria__img').prop('src', '../imagen/nivel4.png');

					} else if (res.data.escala.detalle.contar * 1 >= 5) {
						$('.reputacion__categoria').text(idioma['trans_215']);
						$('.reputacion__categoria__img').prop('src', '../imagen/nivel5.png');

					} else {
						$('.reputacion__categoria').text(idioma['trans_210']);
						$('.reputacion__categoria__img').prop('src', '../imagen/nivel1.png');
					}
					$('._trans310').text(idioma._trans310.split('$ventas').join(res.data.escala.detalle.contar));
					$('._trans309').text(idioma._trans309.split('$ventas').join(res.data.escala.detalle.contar));

					$("#cantida_venta_reputacion").text(res.data.escala.detalle.contar);
					$("#venta_reclamo_reputacion").text(res.data.escala.detalle.reclamos + '%');
					$("#tiempo_correo_reputacion").text(res.data.escala.detalle.tiempo_respuesta + 'Hrs.');
					$("#venta_canceladas_reputacion").text(res.data.escala.detalle.ventas_canceladas + '%');
				} else {
					reputacion_reiniciardatos();
				}
			} else {
				reputacion_reiniciardatos();
			}
		}, error: error => {
			console.log(error);
			reputacion_reiniciardatos();
		}
	});
}
function reputacion_reiniciardatos() {
	$('.reputacion__categoria').text(idioma['trans_211']);

	$('.reputacion__categoria__img').prop('src', '../imagen/nivel1.png');

	$('._trans310').text(idioma._trans310.split('$ventas').join(0));
	$('._trans309').text(idioma._trans309.split('$ventas').join(0));

	$("#cantida_venta_reputacion").text(0);
	$("#venta_reclamo_reputacion").text(0 + '%');
	$("#tiempo_correo_reputacion").text(0 + ' Hrs.');
	$("#venta_canceladas_reputacion").text(0 + '%');
	$('#progeso-reputacion').css('width', `0%`);
}