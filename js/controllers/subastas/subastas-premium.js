var myUrl = location.href;

$(document).ready(($event) => {
  $('.subasta__nasbi__sinsaldo__btn').on('click', ($event) => {
    loadPage("e-wallet.php")
  });


  $('.buscarsubasta_pre').click(($event) => {
    getSubastas();
  });


  $('.limpiarsubasta_pro').click(($event) => {
    limpiaropciones();
  });


});




function cargarPrimero() {
  getSubastas(1);
  if (("" + myUrl).includes("nasbi-descuentos-premium.php")) {
    let paramsBanner = {
      "data": {
        "idioma": localLenguaje,
        "iso_code_2": paisOrigen.iso_code_2,
        "iso_code_2_money": iso_code_2_money,
        "tipo": 5
      }
    };
    let bannerID = '#carousel-banner-subastas-premium';
    getBanner(bannerID, paramsBanner);
  }
}
//getBanner

async function getSubastas(pagina = 1) {
  $('.content__loadingSpinner_filter_subasta_pre').show('fast');
  let dataEnviar = await preparar_data_to_enviar_subasta_premium(pagina);
  console.log(dataEnviar, "dataaaaa, para subasta_premium");

  //  let dataSubastas = {
  //    "pais": paisOrigen.country_id,
  //    "tipo": 2,
  //    "iso_code_2": paisOrigen.iso_code_2,
  //    "iso_code_2_money": iso_code_2_money,
  //    "pagina": pagina
  //  };

  let data_url = baseurl + "/controllers/producto_subastas/?home";
  $.ajax({
    type: "POST",
    url: data_url,
    data: JSON.stringify(dataEnviar),
    dataType: "json",
    contentType: 'application/json',
    success: response => {
      $('.content__loadingSpinner_filter_subasta_pre').hide('fast');
      if (response["status"] == "success") {
        if (dataEnviar.data.ordenamiento === 'ASC') {
          response.data.sort((a, b) => a.precio_local_user - b.precio_local_user);
        } else if (dataEnviar.data.ordenamiento === 'DESC') {
          response.data.sort((a, b) => b.precio_local_user - a.precio_local_user);
        }
        $('.products__list_subasta').show('fast');
        $('.list__subasta_pre__pagination').show('fast');
        $('.products__list__nodata_subasta').hide('fast');
        llenar_subastas_premiums(response);
      } else {
        $('.products__list__nodata_subasta').show('fast');
        $('.products__list_subasta').hide('fast');
        $('.list__subasta_pre__pagination').hide('fast');


      }

    }, error: error => {
      $('.list__subasta_pre__pagination').hide('fast');
      $('.products__list__nodata_subasta').show('fast');
      $('.content__loadingSpinner_filter_subasta_pre').hide('fast');
      $('.products__list_subasta').hide('fast');
      console.log(error);
    }
  });

}

/* esta funcion se reemplazo por llenar_subastas_premiums
function generateHTML(datos) {
  let htmlContentItems = "";
  let htmlContentItem2 = "";

  let htmlpaginacion = ""
  let htmlContentItemsPagination = "";

  $("#subastas-nasbi-premium").html('');
  $("#subastas-nasbi-premium").owlCarousel('destroy');

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

    if (index.length % 2 == 0 || i == datos.data.length - 1) {
      let contentFullTemp = "";
      index.forEach((current) => {
        contentFullTemp += current.html;
        listItems.push(current.row);
      });

      contentFull += `<div class="item"> ${contentFullTemp} </div>`;

      index = [];
    }
  });
  $('#subastas-nasbi-premium').html(contentFull);

  let indexx = 0;
  let item = {};
  listItems.forEach((current) => {
    $('.subastas__nasbi__premium__btncomprar').eq(indexx).off('click');
    item = current;

    $('.subastas__nasbi__premium__btncomprar').eq(indexx).on('click', { item }, managerOpenModalSubastaNasbiPremium);
    indexx++;
  });

  let paramsPagination = {
    total_paginas: datos.total_paginas,
    pagina: datos.pagina
  };
  let result = generatePaginations(paramsPagination);
  $('.subastas__nasbi__content__pagination').html(result);
  $('.paginacion').html(htmlpaginacion);
  $('#subastas-nasbi-premium').owlCarousel({
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


function llenar_subastas_premiums(data) {
  let data_subasta_pre = data.data;
  let htmlContentItems = "";

  let listItems = [];
  let index = [];
  let contentFull = "";
  $('.products__list_subasta').empty();
  for (const i in data_subasta_pre) {

    const itemSchema = data_subasta_pre[i];

    let imagenProducto = "";
    if (itemSchema.foto_portada != "") {
      imagenProducto = itemSchema.foto_portada;
    } else {
      imagenProducto = imageDefault;
    }

    htmlContentItems = `<div class="col-sm-6 col-lg-4">
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
                                </div>
                           </div> `;

    index.push({ row: itemSchema, html: htmlContentItems });

    if (index.length % 2 == 0 || i == data.data.length - 1) {
      let contentFullTemp = "";
      index.forEach((current) => {
        contentFullTemp += current.html;
        listItems.push(current.row);
      });

      // contentFull += `<div class="item"> ${contentFullTemp} </div>`;
      contentFull += `${contentFullTemp}`;
      index = [];
    }
  }


  $('.products__list_subasta').html(contentFull);

  let indexx = 0;
  let item = {};
  listItems.forEach((current) => {
    $('.subastas__nasbi__premium__btncomprar').eq(indexx).off('click');
    item = current;

    $('.subastas__nasbi__premium__btncomprar').eq(indexx).on('click', { item }, managerOpenModalSubastaNasbiPremium);
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



function preparar_data_to_enviar_subasta_premium(pagina) {
  return new Promise(async (resolve) => {
    let nombre_buscar = $('.buscarnombre_subasta_pre').val();
    let dataEnviar = {
      data: {
        "pais": paisOrigen.country_id,
        "tipo": 2,
        "iso_code_2": paisOrigen.iso_code_2,
        "iso_code_2_money": iso_code_2_money,
        "pagina": pagina,
        "subastas": 1
      }
    };
    let respuesta_check = await saber_si_algun_check();

    if (respuesta_check.respuesta == true) {
      let escogidos = respuesta_check.data
      console.log(escogidos, "los escogidos");

      for (let i in escogidos) {
        if (escogidos[i].clase == "condiciondeuso_subasta_pre") {
          if (escogidos[i].value != "0") {
            dataEnviar.data.condicion_producto = escogidos[i].value;
          }
        } else {
          if (escogidos[i].clase == "respuestagarantiapro") {
            if (escogidos[i].value != "2") {
              dataEnviar.data.garantia = escogidos[i].value;
            }
          } else {
            if (escogidos[i].clase == "ordenamientoproductopro") {
              dataEnviar.data.ordenamiento = escogidos[i].value;
            } else if (escogidos[i].clase == "tipoenviopro") {
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



function saber_si_algun_check() {
  return new Promise(async (resolve) => {
    let respuesta = [];
    let ele = document.getElementsByName("colorinpro");
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
  let ele = document.getElementsByName("colorinpro");
  for (let i = 0; i < ele.length; i++) {
    ele[i].checked = false;
  }
  $('.buscarnombre_subasta_pre').val("");

  getSubastas();
}



function eventGeneratePaginations(pagView = 1) {
  getSubastas(pagView);
}
