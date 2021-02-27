var productos = {
	tipo: {
		destacado: 1,
		nuevos: 2
	},
	destacados: [],
	nuevos: []
};

var myUrl = location.href;

function cargarPrimero() {
	if (!validarText(user)) {
		$(".link5").attr("href", "registro.php")
	}

	if (("" + myUrl).includes("index.php") || ("" + myUrl) == "http://localhost/MisProyectos/ProyectoNasbi2020/content/" || ("" + myUrl) == "https://nasbi.com/") {

		if (!validarText(paisOrigen)) paisOrigen = localStorage.getItem('paisOrigen');
		let paramsBanner = {
			"data": {
				"idioma": localLenguaje,
				"iso_code_2": paisOrigen.iso_code_2,
				"iso_code_2_money": iso_code_2_money,
				"tipo": 2
			}
		};
		let bannerID = '#carousel-banner';
		getBanner(bannerID, paramsBanner);

		if (("" + myUrl).includes("index.php") || ("" + myUrl) == "http://localhost/MisProyectos/ProyectoNasbi2020/content/" || ("" + myUrl) == "https://nasbi.com/") {

			paisOrigen = JSON.parse(paisDeOrigenAux);
			getProducts(productos.tipo.destacado);
			getProducts(productos.tipo.nuevos);

			let paramsModalUrl = new URLSearchParams(location.search);

			if (paramsModalUrl.get('modal') != "" && paramsModalUrl.get('modal') != null && paramsModalUrl.get('modal') != undefined) {
				$(`#${paramsModalUrl.get('modal')}`).modal('show');
			}
		}
	}
}

$(document).ready(($event) => {

	$('.go-filter-producto').click(function ($event) {
		let paramsURLTemp = getParamsFilterProductsURL();

		let subcategoria = ("" + this.id).split(":")[1];

		paramsURLTemp.categoria = ("" + this.id).split(":")[0];
		paramsURLTemp.subcategoria = (subcategoria ? subcategoria : "");

		toFilterProductosObject(paramsURLTemp);

	});
	$(".btn_crear_empresa").off();
	$(".btn_crear_empresa").on('click', function () {
		if (validarText(user)) {
			loadPage("vender.php")
		} else {
			loadPage("registro-empresa.php")
		}

	});

});
function getProducts(type = 1, pais = 223, moneda_local = "USD") {

	let datosLocation = {
		"data": {
			"pais": pais,
			"tipo": type,
			"iso_code_2": moneda_local,
			"iso_code_2_money": iso_code_2_money
		}
	};

	if (paisOrigen != null && paisOrigen != undefined) {
		datosLocation.data.pais = paisOrigen.country_id;
		datosLocation.data.iso_code_2 = paisOrigen.iso_code_2;
	}
	let data_url = baseurl + "/controllers/producto/?home";
	$.ajax({
		type: "POST",
		url: data_url,
		data: datosLocation,
		dataType: "json",
		success: datos => {
			if (datos['status'] == "success") {
				if (productos.tipo.destacado == type) {
					productos.destacados = datos.data;
					generateProductosItemHtml(datos.data, datosLocation, '#carousel-destacados');

				} else if (productos.tipo.nuevos == type) {
					productos.nuevos = datos.data;
					generateProductosItemHtml(datos.data, datosLocation, '#carousel-productos-nuevos');


				} else {
					productoItemEmpty(type);
				}
			} else {
				// presentAlert( idioma['trans_04'], idioma['trans_40'], 'error');
				productoItemEmpty(type);
			}
		}, error: error => {
			productoItemEmpty(type);
		}
	});
}
function generateProductosItemHtml(params = [], datosLocation = {}, carouselID = "") {

	if (params != undefined && params != null && params.length > 0) {
		let contentCarousel = "";
		params.forEach((producto) => {
			let htmlOferta = "";
			if (producto.oferta == tieneOferta) {
				htmlOferta = `<p class="descuento"><span>${producto.precio_local_user_mask} ${producto.moneda_local_user}</span> ${producto.porcentaje_oferta}% OFF</p>`;
			}

			let imagenProducto = "";
			if (producto.foto_portada != "") {
				imagenProducto = producto.foto_portada;
			} else {
				imagenProducto = imageDefault;
			}
			let htmlFormat =
				`<div class="item">
				<a href="./producto.php?uid=${producto.id}">
		        <div class="row row-container-destacado">
		            <div class="col-12 px-2">
		                <div class="container-destacado">
		                    <img loading="lazy" src="${imagenProducto}" class="imagen-destacados" alt="${producto.producto} - nasbi.com">
		                </div>
						<h4 class="nombre-producto">${producto.titulo}</h4>
						<div class="div-text-descuento">
							`+ htmlOferta + `
						</div>
		                <h4 class="price-product">${producto.precio_descuento_local_user_mask} ${producto.moneda_local_user}</h4>
		                <p class="descripcion-product">${producto.descripcion}</p>
		                <a href="./producto.php?uid=${producto.id}"><button class="btn-comprar">${idioma['trans_43']}</button></a>
		            </div>
				</div>
				</a>
		    </div>`;
			$(carouselID).owlCarousel('add', htmlFormat).owlCarousel('refresh');
		});
		$(carouselID.split("#").join(".") + '-vacio').hide("slow");
	}
}
function productoItemEmpty(type = 0) {
	if (productos.tipo.destacado == type) {
		let key = 'carousel-destacados';
		$('.' + key + '-vacio').show("slow");
		$('#' + key).hide("fast");

	} else if (productos.tipo.nuevos == type) {
		let key = 'carousel-productos-nuevos';
		$('.' + key + '-vacio').show("slow");
		$('#' + key).hide("fast");

	} else { }
}
function misTickets() {
	if (validarText(user)) {
		$(location).attr('href', "tickets.php")
	} else {
		$(location).attr('href', "contacto.php")

	}
}

$(document).ready(function () {
	$(window).scroll(function () {
		let windowHeight3 = $(window).scrollTop();
		let contenido3 = $("#newless").offset();
		contenido3 = contenido3.top;
		if (screen.width > 1400) {
			contenido3 = contenido3 - 845;
		} else {
			contenido3 = contenido3 - 600;
		}
		// console.log("windowHeight3", windowHeight3)
		// console.log("scroll", contenido3)
		if (windowHeight3 >= contenido3) {
			if (screen.width < 575) {
				// console.log("resolucion ", screen.width)
				$(".banner-llamada-2").hide(300);
			} else {
				if ((screen.width < 1140)) {
					// console.log("resolucion ", screen.width)
					$(".banner-llamada-2").css({
						'bottom': '244px'
					});
				} else {
					if ((screen.width < 1400)) {
						// console.log("resolucion ", screen.width)
						$(".banner-llamada-2").css({
							'bottom': '140px'
						});
					} else {
						// console.log("resolucion", screen.width)
						$(".banner-llamada-2").css({
							'bottom': '46px'
						});
					}
				}
			}
		} else {
			$(".banner-llamada-2").show(400);
			$(".banner-llamada-2").css({
				'bottom': '46px'
			});
		}
	});
});