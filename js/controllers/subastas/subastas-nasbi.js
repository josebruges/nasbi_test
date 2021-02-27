// Declaración - Mis variables

let params_subasta = new URLSearchParams(location.search);
paramsURL_invitado_subastas = params_subasta.get('sub');


// Events HTML
$(document).ready(($event) => {
  $('.subasta__nasbi__sinsaldo__btn').on('click', ($event) => {
    loadPage("e-wallet.php")

  });


  $('.buscarsubasta_nor').click(($event) => {
    getSubastas();
  });


  $('.limpiarsubasta_nor').click(($event) => {
    limpiaropciones();
  });


});

var myUrl = location.href;
function cargarPrimero() {

  getSubastas(1);

  if (("" + myUrl).includes("nasbi-descuentos-normales.php")) {
    let paramsBanner = {
      "data": {
        "idioma": localLenguaje,
        "iso_code_2": paisOrigen.iso_code_2,
        "iso_code_2_money": iso_code_2_money,
        "tipo": 4
      }
    };
    let bannerID = '#carousel-banner-subastas-nasbi';
    getBanner(bannerID, paramsBanner);
  }
}

// Funciones DEVELOPER JDBC
async function getSubastas(pagina = 1) {
  $('.content__loadingSpinner_filter_subasta_nor').show('fast');
  let dataEnviar = await preparar_data_to_enviar_subasta_normal(pagina);
  console.log(dataEnviar, "dataaaaa, para subasta_normal");


  // let dataSubastas = {
  //   "pais": paisOrigen.country_id,
  //   "tipo": 1,
  //   "iso_code_2": paisOrigen.iso_code_2,
  //   "iso_code_2_money": iso_code_2_money,
  //   "pagina": pagina
  // };


  let data_url = `${baseurl}/controllers/producto_subastas/?home`;
  $.ajax({
    type: "POST",
    url: data_url,
    data: dataEnviar,
    dataType: "json",
    success: response => {
      $('.content__loadingSpinner_filter_subasta_nor').hide('fast');

      if (response["status"] == "success") {
        // generateHTML(response);
        $('.products__list_subasta_normal').show('fast');
        $('.list__subasta_nor__pagination').show('fast');
        $('.products__list__nodata_subasta_normal').hide('fast');
        llenar_subastas_normal(response);
      } else {
        $('.list__subasta_nor__pagination').hide('fast');
        $('.products__list_subasta_normal').hide('fast');
        $('.products__list__nodata_subasta_normal').show('fast');

        // listProductsView(false);
      }
    }, error: error => {
      $('.products__list__nodata_subasta_normal').show('fast');
      $('.products__list_subasta_normal').hide('fast');
      $('.list__subasta_nor__pagination').hide('fast');
      $('.content__loadingSpinner_filter_subasta_nor').hide('fast');
      console.log(error);
    }
  });

}
/* //esta funcion se reemplazo por llenar_subastas_normal
function generateHTML(datos) {

  let htmlContentItems = "";
  let htmlContentItem2 = "";

  let htmlpaginacion = ""
  let htmlContentItemsPagination = "";
  $("#subastas-nasbi").html('');
  $("#subastas-nasbi").owlCarousel('destroy');


  let listItems = [];
  let index = [];
  let contentFull = "";
  $.each(datos.data, (i, itemSchema) => {

    let imagenProducto = "";
    if (itemSchema.foto_portada != "") {
      imagenProducto = itemSchema.foto_portada;
    } else {
      imagenProducto = imageDefault;
    }
    htmlContentItems = `
  		<div class="row row-container-destacado subastas__nasbi__premium__btncomprar">
  		    <div class="col-12 px-2">
  		        <div class="container-destacado">
  		            <img loading="lazy" src="${ imagenProducto}" class="imagen-destacados" alt="${itemSchema.producto} - nasbi.com">
  		        </div>
  		        <h4 class="nombre-producto">${ itemSchema.titulo}</h4>
  		        <p class="descripcion-product"> ${ idioma['trans_95']} </p>
  		        <h4 class="price-product">${itemSchema.precio_local_user_mask} ${itemSchema.moneda_local_user}</h4>

  		        <button class="btn-comprar" id="${itemSchema.id}"> ${itemSchema.tipo_descripcion} ${idioma['trans_113']}</button>
  		    </div>
  		</div>`;
    index.push({ row: itemSchema, html: htmlContentItems });
    if ( datos.data.length > 9) {
      if (index.length % 2 == 0 || i == datos.data.length - 1) {
        let contentFullTemp = "";
        index.forEach((current) => {
          contentFullTemp += current.html;
          listItems.push(current.row);
        });

        contentFull += `<div class="item"> ${contentFullTemp} </div>`;

        index = [];
      }
    }else{
      listItems.push(itemSchema);
      contentFull += `<div class="item"> ${htmlContentItems} </div>`;
      index = [];
    }
  });
  $('#subastas-nasbi').html(contentFull);

  let indexx = 0;
  let item = {};
  listItems.forEach((current) => {
    $('.subastas__nasbi__premium__btncomprar').eq(indexx).off('click');
    item = current;

    $('.subastas__nasbi__premium__btncomprar').eq(indexx).on('click', { item }, managerOpenModalSubastaNasbi);
    indexx++;
  });

  let paramsPagination = {
    total_paginas: datos.total_paginas,
    pagina: datos.pagina
  };
  let result = generatePaginations(paramsPagination);
  $('.subastas__nasbi__content__pagination').html(result);
  $('.paginacion').html(htmlpaginacion);
  $('#subastas-nasbi').owlCarousel({
    lazyLoad: true,
    loop: false,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      575: {
        items: 2
      },
      767: {
        items: 3
      },
      950: {
        items: 4
      },
      1130: {
        items: 5
      },
    }
  });
}
*/


function llenar_subastas_normal(data) {
  let data_subasta_nor = data.data;
  let htmlContentItems = "";

  let listItems = [];
  let index = [];
  let contentFull = "";
  $('.products__list_subasta_normal').empty();
  for (const i in data_subasta_nor) {

    const itemSchema = data_subasta_nor[i];

    let imagenProducto = "";
    if (itemSchema.foto_portada != "") {
      imagenProducto = itemSchema.foto_portada;
    } else {
      imagenProducto = imageDefault;
    }

    htmlContentItems = `
    <div class="row row-container-destacado subastas__nasbi__normmal__btncomprar">
        <div class="col-12 px-2">
            <div class="container-destacado">
                <img loading="lazy" src="${ imagenProducto}" class="imagen-destacados" alt="${itemSchema.producto} - nasbi.com">
            </div>
            <h4 class="nombre-producto">${ itemSchema.titulo}</h4>
            <h4 class="nombre-producto"><span>${idioma.trans479_}</span> <span> ${itemSchema.porcentaje}%</span></h4>
            <p class="descripcion-product"> ${ idioma['trans_95']} </p>
            <h4 class="price-product">${itemSchema.precio_subasta_local_user_mask} ${itemSchema.moneda_local_user}</h4>

            <button class="btn-comprar" id="${itemSchema.id}"> ${itemSchema.tipo_descripcion} ${idioma['trans_113']}</button>
        </div>
    </div> `;

    index.push({ row: itemSchema, html: htmlContentItems });

    if (index.length % 2 == 0 || i == data.data.length - 1) {
      let contentFullTemp = "";
      index.forEach((current) => {
        contentFullTemp += current.html;
        listItems.push(current.row);
      });

      contentFull += `${contentFullTemp}`;
      index = [];
    }
  }


  $('.products__list_subasta_normal').html(contentFull);

  let indexx = 0;
  let item = {};
  listItems.forEach((current) => {
    $('.subastas__nasbi__normmal__btncomprar').eq(indexx).off('click');
    item = current;

    $('.subastas__nasbi__normmal__btncomprar').eq(indexx).on('click', { item }, managerOpenModalSubastaNasbi);
    indexx++;
  });

  let paramsPagination = {
    total_paginas: data.total_paginas,
    pagina: data.pagina
  };
  let result = generatePaginations(paramsPagination);
  $('.list__subasta_pre__pagination').html(result);
  // $('.paginacion').html(htmlpaginacion);
}

// Developer JDBC - inicio
function eventGeneratePaginations(pagView = 1) {
  console.log(" Paso. ", pagView);
  getSubastas(pagView);
}





function preparar_data_to_enviar_subasta_normal(pagina) {
  return new Promise(async (resolve) => {
    let nombre_buscar = $('.buscarnombre_subasta_nor').val();
    console.log(nombre_buscar, "mmmm");
    let dataEnviar = {
      data: {
        "pais": paisOrigen.country_id,
        "tipo": 1,
        "iso_code_2": paisOrigen.iso_code_2,
        "iso_code_2_money": iso_code_2_money,
        "pagina": pagina,
        "subastas": 1
      }
    };

    let respuesta_check = await saber_si_algun_check_suba_nor();

    if (respuesta_check.respuesta == true) {
      let escogidos = respuesta_check.data
      console.log(escogidos, "los escogidos");

      for (let i in escogidos) {
        if (escogidos[i].clase == "condiciondeuso_subasta_nor") {
          if (escogidos[i].value != "0") {
            dataEnviar.data.condicion_producto = escogidos[i].value;
          }
        } else {
          if (escogidos[i].clase == "respuestagarantia_subas_nor") {
            if (escogidos[i].value != "2") {
              dataEnviar.data.garantia = escogidos[i].value;
            }
          } else {
            if (escogidos[i].clase == "ordenamientoproducto_subas_nor") {
              dataEnviar.data.ordenamiento = escogidos[i].value;
            } else if (escogidos[i].clase == "tipoenvio_subas_nor") {
              if (escogidos[i].value != "0") {
                dataEnviar.data.envio = escogidos[i].value;
              }
            }
          }
        }
      }

    }


    if (validarText(nombre_buscar)) {
      dataEnviar.data.producto_nombre = nombre_buscar;
    }

    resolve(dataEnviar);
  });
}



function saber_si_algun_check_suba_nor() {
  return new Promise(async (resolve) => {
    let respuesta = [];
    let ele = document.getElementsByName("colorin_subas_nor");
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) {
        respuesta.push({ clase: ele[i].form.className, value: ele[i].value });
      }
    }
    if (respuesta.length > 0) {
      resolve({ respuesta: true, data: respuesta })
    } else {
      resolve({ respuesta: false, data: "nada escogido" })
    }
  });

}

function limpiaropciones() {
  let ele = document.getElementsByName("colorin_subas_nor");
  for (let i = 0; i < ele.length; i++) {
    ele[i].checked = false;
  }
  $('.buscarnombre_subasta_nor').val("");

  getSubastas();
}

