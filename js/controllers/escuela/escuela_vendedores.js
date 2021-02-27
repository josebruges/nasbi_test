//const urlBlogP2W = "https://nasbi.peers2win.com/apiP2WBackendBlock/controllers/";
const urlBlogP2W = "https://blog.peers2win.com/controllers/";
const urlImagenP2W = "https://blog.peers2win.com/";

let lenguaje;
let data_items;
let data_a_mostrar;
let todos_activos = true;
let array_tipos_articulos = [];

$(document).ready((e) => {
  $('.nodata_items_pre').hide();
  console.log(localLenguaje, "el real")
  lenguaje = localLenguaje.toLowerCase();
  cargarBlog(lenguaje);
  llenar_array_de_tipos();


  $('.activar_todos').click(($event) => {
    todos_activos = true;
    if (data_items.data) {
      if (data_items.data.length > 0) {
        quitar_vista_vacio_mostrar_contenido(0);
        llenar_data_items();
      } else {
        vaciar_vista_y_colocar_vista_vacio(0);
      }
    } else {
      vaciar_vista_y_colocar_vista_vacio(0);
    }


  })

});


function retorna_mes_year_o_dia(id, date) {
  return new Promise((resolve) => {
    let meses = [];
    for (let index = 1; index <= 12; index++) {
      meses.push({ id: index, nombre_mes: idioma['trans256_' + index.toString()] }) //json estan los meses
    }
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + (d.getDate()),
      year = d.getFullYear();
    if (day.length < 2) day = '0' + day;
    switch (id) {
      case '1':
        resolve(parseFloat(year));
        break;
      case '2':
        resolve(parseFloat(month));
        break;
      case '3':
        resolve(parseFloat(day));
        break;
      case '4': //Devuelve el mes dia año por separado y tambien el mes en letra ya sea en ingles o español
        mes_letra = meses.filter(mes => mes.id == parseFloat(month))[0];
        resolve({ year: parseFloat(year), mes: parseFloat(month), dia: parseFloat(day), mes_letra: mes_letra.nombre_mes });
        break;
      default:
        resolve([year, month, day].join('-') + " 00:00:00");
        break;
    }

  });
}




function cargarBlog(lenguaje = 'es') {
  $('.content__loadingSpinner_escuela_vendedores').show();
  let data_enviar = {
    idioma: lenguaje,
    plataforma: 3
  }
  $.ajax({
    type: "POST",
    url: urlBlogP2W + "block/getAllBlock.php",
    data: data_enviar,
    dataType: 'json',
  }).done(data => {
    if (data.statud == "success") {
      $('.content__loadingSpinner_escuela_vendedores').hide();
      data_items = data;
      if (data.data) {
        if (data.data.length > 0) {
          quitar_vista_vacio_mostrar_contenido(0);
          llenar_data_items();
          llenar_ultimas_noticias();
        } else {
          vaciar_vista_y_colocar_vista_vacio(0);
        }
      } else {
        vaciar_vista_y_colocar_vista_vacio(0);
      }
    } else {
      vaciar_vista_y_colocar_vista_vacio(1);
    }
  }).fail((err) => {
    vaciar_vista_y_colocar_vista_vacio(1);
  });
}






async function llenar_data_items(pagina = 1, id = 0) {
  let data_items_generales;
  if (id == 0) {
    data_items_generales = data_items.data;
  } else {
    data_items_generales = data_a_mostrar;
  }
  let numero_de_items_pagina = 12; //item que se mostraran en cada pagina el wbs no esta paginado 
  let total_paginas = Math.ceil(data_items_generales.length / numero_de_items_pagina);
  let inicio = numero_de_items_pagina * (pagina - 1);
  $('.list_items_pre').empty();
  let data_to_recorrer = [];

  for (let index = 0; index < numero_de_items_pagina; index++) {
    if (data_items_generales[inicio]) {
      data_to_recorrer.push(data_items_generales[inicio]);
      inicio++;
    }
  }

  for (const x in data_to_recorrer) {
    let img_icon = array_tipos_articulos.filter(estado => estado.id == data_to_recorrer[x].tipo_block_id || estado.id_en == data_to_recorrer[x].tipo_block_id)[0];
    const item_mostrar = data_to_recorrer[x];
    let titulo = item_mostrar.titulo.replace(/<[^>]*>?/g, '');
    let alt = item_mostrar.alt.replace(/ /g, '');
    // if (titulo.length > 60) {
    //   titulo= titulo.substr(0, 60) + '...'; //truncate
    // }
    $('.list_items_pre').append(
      `<div class="col-sm-6 col-md-4 col-lg-3 item_general_escuela" style="cursor: pointer;">
          <div class="contenedor-videos">
            <img loading="lazy" alt=${alt} title=${item_mostrar.titulo_img} src=${urlImagenP2W + item_mostrar.imagen} class="img-produt"> 
            <button><img loading="lazy" alt="nasbi.com" src=${img_icon.img}></button>
          </div>
          <div class="editor-videos">
              <h4 class="line-clamp line-clamp-2">${titulo}</h4>
              <p>${item_mostrar.meta_descripcion}</p>
          </div>
      </div>`);

    $('.item_general_escuela').eq(x).off('click');
    $('.item_general_escuela').eq(x).on('click', { x, data: item_mostrar }, pasar_info_card);

  }



  let paramsPagination = {
    total_paginas: total_paginas,
    pagina: pagina
  };
  let result = generatePaginations(paramsPagination);
  $('.list__escuela_vendedores__pagination').html(result);
  $('html, body').animate({ scrollTop: 0 }, 500);


  //para los filtros
  $('.filter_gerencia').off('click');
  $('.filter_gerencia').on('click', null, async function () {
    console.log("29");
    llamar_filtro_tipo(data_items, 29);
  });


  $('.filter_mercadeo').off('click');
  $('.filter_mercadeo').on('click', null, async function () {
    llamar_filtro_tipo(data_items, 30);
  });


  $('.filter_servicio').off('click');
  $('.filter_servicio').on('click', null, async function () {
    llamar_filtro_tipo(data_items, 31);
  });


  $('.filter_finanzas').off('click');
  $('.filter_finanzas').on('click', null, async function () {
    llamar_filtro_tipo(data_items, 32);
  });


  $('.filter_logistica').off('click');
  $('.filter_logistica').on('click', null, async function () {
    llamar_filtro_tipo(data_items, 33);
  });
  //fin para los filtros
}






async function llenar_ultimas_noticias() {
  $('.carousel-escuela-noticias').hide();
  let mas_vistos = data_items.masvistos;
  let con = 0;

  for await (const mas_visto of mas_vistos) {
    let fecha = +new Date(mas_visto.fecha + " 00:00:00")
    let fecha_configurada = await retorna_mes_year_o_dia("4", fecha);
    let dia = fecha_configurada.dia;
    let mes = fecha_configurada.mes_letra;
    let year = fecha_configurada.year;
    let titulo = mas_visto.titulo.replace(/<[^>]*>?/g, '');
    let fecha_noticia = idioma.trans286_.split('$d').join(dia).split('$m').join(mes).split('$a').join(year);
    let alt = mas_visto.alt.replace(/ /g, '');
    let html =
      ` <div class="item" style="cursor: pointer;">
            <div class="container-noticia">
                <img loading="lazy" alt=${alt} title=${mas_visto.titulo_img} src=${urlImagenP2W + mas_visto.imagen}>
                <h5>${titulo}</h5>
                <p><i class="fas fa-clock"></i><span> </span>${fecha_noticia}</p>
            </div>
          </div>`;


    $('.carousel-escuela-noticias').trigger('add.owl.carousel', html);
    $('.carousel-escuela-noticias .item').eq(con).off('click');
    $('.carousel-escuela-noticias .item').eq(con).on('click', { index: con, data: mas_visto }, pasar_info_card);
    con++;
  }

  setTimeout(() => {
    $('.carousel-escuela-noticias').show();
  }, 800);


}



function pasar_info_card($e) {
  let data_info_card = $e.data.data;

  if (data_info_card.url.indexOf("http") > -1) {
    location.href = data_info_card.url;
  } else {
    console.log(data_info_card.url);
    loadPage("info-card.php?url=" + data_info_card.url);
  }

}

function eventGeneratePaginations(pagView = 1) {
  quitar_vista_vacio_mostrar_contenido(0);
  if (todos_activos) {
    llenar_data_items(pagView);
  } else {
    llenar_data_items(pagView, 1);
  }

}

function llamar_filtro_tipo(data, id, campo = "tipo_block_id") {
  data_a_mostrar = [];
  todos_activos = false;
  data = data.data;
  data_a_mostrar = data.filter(row => row[campo] == id);
  if (data_a_mostrar.length > 0) {
    quitar_vista_vacio_mostrar_contenido(0);
    llenar_data_items(1, 2);
  } else {
    //este pedaso se agrego porque el id de los tipos no son los mismos en ingles 
    let array_tem = [];
    array_tem = array_tipos_articulos.filter(row => row.id == id);
    if (array_tem.length > 0) {
      llamar_filtro_tipo(data_items, array_tem[0].id_en);
    } else {
      //fin de este pedaso se agrego porque el id de los tipos no son los mismos en ingles 
      if (data_items.masvistos) {
        if (data_items.masvistos.length > 0) {
          vaciar_vista_y_colocar_vista_vacio(3);

        } else {
          vaciar_vista_y_colocar_vista_vacio(2);
        }
      } else {
        vaciar_vista_y_colocar_vista_vacio(2);
      }
    }
  }

}


function vaciar_vista_y_colocar_vista_vacio(id = 0) {
  if (id == 0) {
    $('.nodata_items_pre').show();
    $('.list__escuela_vendedores__pagination').hide();
    $('.list_items_pre').empty();
    $('.list_items_pre').hide();
    $('.carousel_items_escuela_vendedores').hide();
  } else if (id == 1) {
    $('.nodata_items_pre').show();
    $('.list__escuela_vendedores__pagination').hide();
    $('.list_items_pre').empty();
    $('.list_items_pre').hide();
    $('.carousel_items_escuela_vendedores').hide();
    return presentAlertObject({ icon: 'error', text: idioma.trans_04 });
  } else if (id == 2) {
    $('.nodata_items_pre').show();
    $('.list__escuela_vendedores__pagination').hide();
    $('.list_items_pre').empty();
    $('.list_items_pre').hide();
  } else if (id == 3) {
    $('.nodata_items_pre').show();
    $('.no_data_noti_style_').hide();
    $('.list__escuela_vendedores__pagination').hide();
    $('.list_items_pre').empty();
    $('.list_items_pre').hide();
  }

}

function llenar_array_de_tipos() {
  array_tipos_articulos = [
    { id: 29, id_en: 34, nombre: idioma.trans496_, img: '../imagen/escuela-vendedores/icono_gerencia.svg' },
    { id: 30, id_en: 35, nombre: idioma.trans497_, img: '../imagen/escuela-vendedores/icono_mercadeo.svg' },
    { id: 31, id_en: 36, nombre: idioma._trans662, img: '../imagen/escuela-vendedores/icono_servicio.svg' },
    { id: 32, id_en: 37, nombre: idioma.trans498_, img: '../imagen/escuela-vendedores/icono_finanzas.svg' },
    { id: 33, id_en: 38, nombre: idioma.trans499_, img: '../imagen/escuela-vendedores/Icono_logistica.svg' }

  ];
}


function quitar_vista_vacio_mostrar_contenido(id = 0) {
  switch (id) {
    case 0:
      $('.list_items_pre').show();
      $('.nodata_items_pre').hide();
      $('.list__escuela_vendedores__pagination').show();
      break;

    default:
      break;
  }

}


