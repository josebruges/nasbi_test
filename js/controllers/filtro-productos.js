let banderaprimeraves = 1;

let params = new URLSearchParams(location.search);
var paramsURL = getParamsFilterProductsURL();


$(document).ready(($event) => {
	cargarPrimero();
	$('.condiciondeuso_product').change(($event) => {
		cambiodecondiciondeproducto($event.target.value);
	});


	$('.respuestagarantia').change(($event) => {
		respuestagarantia($event.target.value);
	});


	$('.enpromocionproducto').change(($event) => {
		respuestapromocionproducto($event.target.value);
	});


	$('.tipoenvio').change(($event) => {
		tipoenviorespuestaproduct($event.target.value);
	});


	$('.buscarnombre').click(($event) => {

		if ($('.nombreproducto').val() != "" || $('.nombreproducto').val() == !undefined) {
			nombredelproducto($('.nombreproducto').val());
		} else {
			nombredelproducto("");
			$('.nombreproducto').val("");
		}
	});


	$('.buscargeneral').click(($event) => {
		if ($('.nombreproducto').val() != "" || $('.nombreproducto').val() == !undefined) {
			nombredelproducto($('.nombreproducto').val(), "1");
		} else {
			nombredelproducto("", "1");
			$('.nombreproducto').val("");
		}
		toFilterProductosObject(paramsURL, 'filtro-productos.php'); //llama al wbs en la funcion nombreproducto
	});


	$('.limpiar').click(($event) => {
		limpiaropciones();
	});


	$('.ordenamientoproducto').change(($event) => {
		ordanmientoproducto($event.target.value);
	});

	// $('.dropdown__departamentos').change(($event) => {
	// 	//let value_select_departamento= $('.dropdown__departamentos').val();
	// 	console.log($event, "mmmmmmmm filtro "); 
	// 	//
	// });
});

function cambio_select_departamento(newdepartamento) {
	let params_filtro = new URLSearchParams(location.search);
	let page = "filtro-productos.php";
	let new_params, ruta;
	if (validarText(newdepartamento)) {
		params_filtro.set('departamento', newdepartamento)
	} else {
		if (params_filtro.has('departamento')) {
			params_filtro.delete('departamento');
		}
	}
	new_params = params_filtro.toString();
	ruta = `${page}?&${new_params}`;
	location.href = ruta;
}



function cargarPrimero() {
	/*saber_si_algun_check();*/
	active_search_criteria();
	getProductos();

}

function saber_si_algun_check() {
	let respuesta = [];
	let ele = document.getElementsByName("colorin");
	for (let i = 0; i < ele.length; i++) {
		if (ele[i].checked) {
			respuesta.push({ clase: ele[i].form.className, value: ele[i].value });
		}
	}
	if (respuesta.length > 0) {
		revisarcheck(respuesta);
	} else {
		console.log("nada");
	}

}

function revisarcheck(escogidos) {
	// console.log(escogidos, "los escogidos");
	for (let i in escogidos) {
		// console.log("hiiii");
		if (escogidos[i].clase == "condiciondeuso_product") {
			cambiodecondiciondeproducto(escogidos[i].value);
		} else {
			if (escogidos[i].clase == "respuestagarantia") {
				respuestagarantia(escogidos[i].value);
			} else {
				if (escogidos[i].clase == "enpromocionproducto") {
					respuestapromocionproducto(escogidos[i].value);
				} else if (escogidos[i].clase == "tipoenvio") {
					tipoenviorespuestaproduct(escogidos[i].value);
				}
			}
		}
	}
}

function getProductos() {

	$('.nombreproducto').val("");
	$('.content__loadingSpinner_filter_product').show("fast");
	/*paramsURL.departamento = "";*/

	console.log("[ AQUÍ] ======+> [ paramsURL ]: ", paramsURL);
	console.log("[ AQUÍ] ======+> [ paramsURL ]: ", paramsURL);
	console.log("[ AQUÍ] ======+> [ paramsURL ]: ", paramsURL);
	console.log("[ AQUÍ] ======+> [ paramsURL ]: ", paramsURL);
	console.log("[ AQUÍ] ======+> [ paramsURL ]: ", paramsURL);

	let data_url = baseurl + "/controllers/producto/?filtros_productos";
	$.ajax({
		type: "POST",
		url: data_url,
		data: { "data": paramsURL },
		dataType: "json",
		success: datos => {
			$('.content__loadingSpinner_filter_product').hide("fast");
			if (datos["status"] == "success") {
				generateItemsProductsHtml(datos);

			} else {
				listProductsView(false);
			}
		}, error: error => {

			$('.content__loadingSpinner_filter_product').hide("fast");
		}
	});

}
function generateItemsProductsHtml(datos) {
	let htmlContentItems = "";
	let htmlContentItemsPagination = "";
	$('.products__list').empty();
	$.each(datos.data, (i, item) => {
		let htmlOferta = "";
		if (item.oferta == tieneOferta) {
			htmlOferta = `<p class="descuento"><span>${item.precio_local_user_mask} ${item.moneda_local_user}</span> ${item.porcentaje_oferta}% OFF</p>`;
		}
		// console.log("ITEM: ", item);
		let imagenProducto = "";
		if (item.foto_portada != "") {
			imagenProducto = item.foto_portada;
		} else {
			imagenProducto = imageDefault;
		}
		htmlContentItems += `
		<div class="col-sm-6 col-lg-4">
			<a href="./producto.php?uid=${item.id}">
	        <div class="row row-container-destacado">
	            <div class="col-12 px-2">
	                <div class="container-destacado">
	                    <img loading="lazy" src="${imagenProducto}" class="imagen-destacados" alt="${item.producto} - nasbi.com">
	                </div>
	                <h4 class="nombre-producto">${item.titulo}</h4>
					<div class="div-text-descuento">
					`+ htmlOferta + `
					</div>
	                <h4 class="price-product">${item.precio_descuento_local_user_mask} ${item.moneda_local_user}</h4>
		            <p class="descripcion-product">${item.descripcion}</p>
	                
	                <a  href="./producto.php?uid=${item.id}"><button class="btn-comprar ">${idioma['trans_43']}</button></a>
	            </div>
			</div>
			</a>
	    </div>`;
	});
	let paramsPagination_filtro_prod = {
		total_paginas: datos.total_paginas,
		pagina: datos.pagina
	};
	htmlContentItems += generatePaginations(paramsPagination_filtro_prod);
	$('.products__list').html(htmlContentItems);
	listProductsView(true);
}
function listProductsView(isVisible = false) {
	if (isVisible) {
		$('.products__list').show("slow");
		$('.products__list__nodata').hide("fast");


	} else {
		$('.products__list').hide("fast");
		$('.products__list__nodata').show("slow");

	}
}



function cambiodecondiciondeproducto(e) {
	if (e != undefined) {
		if (e == "0") {
			paramsURL.condicion_producto = "";

		} else {
			paramsURL.condicion_producto = e;
		}
		//	getProductos(); 
	} else {
		paramsURL.condicion_producto = "";
	}
	// console.log("paramsURL.condicion_producto: ", paramsURL.condicion_producto);
}
function respuestagarantia(e) {
	if (e != undefined) {
		if (e == "2") {
			paramsURL.garantia = "";

		} else {
			paramsURL.garantia = e;
		}
		//	getProductos(); 
	} else {
		paramsURL.garantia = "";
	}
	// console.log("paramsURL.garantia: ", paramsURL.garantia);
}
function respuestapromocionproducto(e) {
	if (e != undefined) {
		if (e == "2") {
			paramsURL.oferta = "";

		} else {
			paramsURL.oferta = e;
		}
	} else {
		paramsURL.oferta = "";
	}
	// console.log("paramsURL.oferta: ", paramsURL.oferta);
	// console.log("paramsURL.oferta: ", paramsURL.oferta);
	// console.log("paramsURL.oferta: ", paramsURL.oferta);
}
function nombredelproducto(e, id = "0") {
	paramsURL.producto_nombre = e;
	/*getProductos(); */
	if (id == "0") {
		// console.log("paramsURL.producto_nombre: ", paramsURL.producto_nombre);
		toFilterProductosObject(paramsURL, 'filtro-productos.php');
	}
}
function tipoenviorespuestaproduct(e) {
	if (e != undefined) {
		if (e == "0") {
			paramsURL.envio = "";

		} else {
			paramsURL.envio = e;
		}
		//	getProductos(); 
	} else {
		paramsURL.envio = "";
	}
	// console.log("paramsURL.envio: ", paramsURL.envio);
}
function ordanmientoproducto(e) {

	if (e != undefined) {
		paramsURL.ordenamiento = e;
	}
}
function limpiaropciones(id = "") {
	paramsURL.envio = "";
	paramsURL.oferta = "";
	paramsURL.garantia = "";
	paramsURL.condicion_producto = "";
	paramsURL.producto_nombre = "";
	paramsURL.ordenamiento = "";

	let ele = document.getElementsByName("colorin");
	for (let i = 0; i < ele.length; i++) {
		ele[i].checked = false;

	}
	$('.nombreproducto').val("");

	if (id != "1") {
		toFilterProductosObject(paramsURL, 'filtro-productos.php');
	}
}

function active_search_criteria() {
	if (isValidParamUrl(paramsURL.condicion_producto)) {
		let content = document.forms["condiciondeuso_product"].getElementsByTagName("input");
		content[paramsURL.condicion_producto * 1].checked = true;
	} else {
		let content = document.forms["condiciondeuso_product"].getElementsByTagName("input");
		content[0].checked = true;
	}

	if (isValidParamUrl(paramsURL.garantia)) {
		let content = document.forms["respuestagarantia"].getElementsByTagName("input");
		let pos = 0;
		if ((paramsURL.garantia * 1) > 0) {
			pos = (paramsURL.garantia * 1);
		} else {
			pos = 2 + (paramsURL.garantia * 1);
		}
		content[pos].checked = true;
	} else {
		let content = document.forms["respuestagarantia"].getElementsByTagName("input");
		content[0].checked = true;
	}

	if (isValidParamUrl(paramsURL.oferta)) {
		let content = document.forms["enpromocionproducto"].getElementsByTagName("input");
		let pos = 0;
		if ((paramsURL.oferta * 1) > 0) {
			pos = (paramsURL.oferta * 1);
		} else {
			pos = 2 + (paramsURL.oferta * 1);
		}
		content[pos].checked = true;
	} else {
		let content = document.forms["enpromocionproducto"].getElementsByTagName("input");
		content[0].checked = true;
	}

	if (isValidParamUrl(paramsURL.producto_nombre)) {
		//Arreglar en: Mas vendidos, empresa, y todos los demás filtros que usen la URL (http://https://nasbi.peers2win.com/api/controllers/producto/?filtros_productos)
		$('.nombreproducto').val(paramsURL.producto_nombre);

	}
	if (isValidParamUrl(paramsURL.envio)) {
		let content = document.forms["tipoenvio"].getElementsByTagName("input");
		content[paramsURL.envio * 1].checked = true;
	} else {
		let content = document.forms["tipoenvio"].getElementsByTagName("input");
		content[0].checked = true;
	}

	if (isValidParamUrl(paramsURL.ordenamiento)) {
		let content = document.forms["ordenamientoproducto"].getElementsByTagName("input");
		if (paramsURL.ordenamiento == "ASC") {
			content[0].checked = true;
		} else {
			content[1].checked = true;
		}
	}
}

function eventGeneratePaginations(pagView = 1) {
	paramsURL.pagina = pagView;
	toFilterProductosObject(paramsURL, 'filtro-productos.php');

}



