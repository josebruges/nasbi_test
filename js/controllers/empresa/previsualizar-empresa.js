// Estos son los datos base de la tienda
var prevEmpresaSchema = {
  "id": 0,
  "pais": 0,
  "nombre_empresa": "",
  "razon_social": "",
  "nit": 0,
  "pagina_web": "",
  "razon_social": 0,
  "correo": "",
  "clave": "",
  "telefono": null,
  "nombre_dueno": null,
  "apellido_dueno": null,
  "tipo_documento_dueno": 0,
  "numero_documento_dueno": null,
  "cargo": "",
  "caracteristica_principal_1": null,
  "caracteristica_principal_2": null,
  "caracteristica_principal_3": null,
  "foto_docuemento_empresa": null,
  "foto_documento_dueno": null,
  "foto_logo_empresa": null,
  "foto_portada_empresa": null,
  "referido": "",
  "notificaciones": "0",
  "idioma": "ES",
  "estado": 0,
  "primer_login": "0",
  "primer_cambio": "1",
  "fecha_creacion": 1604523050881,
  "fecha_actualizacion": 1604523050881,
  "token": null,
  "fecha_token": null,
  "uid": 0,
  "empresa": 1,
  "nombreCompleto": "",
  "productos": null
};
var categorias_empresa = [
  { id: 1, nombre: "Bronze", texto: idioma['_trans845'] },
  { id: 2, nombre: "Silver", texto: idioma['_trans846'] },
  { id: 3, nombre: "Gold", texto: idioma['_trans847'] },
  { id: 4, nombre: "Platinum", texto: idioma['_trans848'] },
  { id: 5, nombre: "Diamond", texto: idioma['_trans849'] },
]

//contenedor de datos para filtrar
var paramsFilter = {
  "categoria": {},
  "ordenamiento": "DESC",
  "condicion_producto": "",
  "garantia": "",
  "oferta": "",
  "envio": ""
};

$(document).ready(($event) => {
  // $('.prev__tienda__subcategory__list__content__1').show();

  $('.prev__tienda__ordering__ASC').click(($event) => {
    $('.prev__tienda__ordering__selected').text(idioma['trans_264']);
    paramsFilter.ordenamiento = "ASC";
    getProductos();
  });
  $('.prev__tienda__ordering__DESC').click(($event) => {
    $('.prev__tienda__ordering__selected').text(idioma['trans_265']);
    paramsFilter.ordenamiento = "DESC";
    getProductos();
  });
  $('.content_ctg').click(function ($event) {



    $('.prev__tienda__category__selected').text(this.text);


    if (("0" + this.id) * 1 == 1) {

      $('.prev__tienda__subcategory__selected').text(idioma['trans_288']);

    } else if (("0" + this.id) * 1 == 2) {

      $('.prev__tienda__subcategory__selected').text(idioma['trans_289']);

    } else if (("0" + this.id) * 1 == 3) {

      $('.prev__tienda__subcategory__selected').text(idioma['trans_290']);

    } else if (("0" + this.id) * 1 == 4) {

      $('.prev__tienda__subcategory__selected').text(idioma['trans_291']);

    } else if (("0" + this.id) * 1 == 5) {

      $('.prev__tienda__subcategory__selected').text(idioma['trans_292']);

    } else {

      $('.prev__tienda__subcategory__selected').text(idioma['trans_293']);

    }

    $('.subcategory').hide();
    $('.prev__tienda__subcategory__list__content__' + this.id).show();
    paramsFilter.categoria = "";

  });
  $('.content_ctg_tdu').click(function ($event) {



    $('.prev__tienda__subcategory__selected').text(this.text);
    paramsFilter = {
      "categoria": {},
      "ordenamiento": "DESC",
      "condicion_producto": "",
      "garantia": "",
      "oferta": "",
      "envio": ""
    }
    paramsFilter.condicion_producto = this.id;
    getProductos();
  });
  $('.content_ctg_g').click(function ($event) {



    $('.prev__tienda__subcategory__selected').text(this.text);
    paramsFilter = {
      "categoria": {},
      "ordenamiento": "DESC",
      "condicion_producto": "",
      "garantia": "",
      "oferta": "",
      "envio": ""
    }
    paramsFilter.garantia = this.id;
    getProductos();
  });
  $('.content_ctg_ep').click(function ($event) {



    $('.prev__tienda__subcategory__selected').text(this.text);
    paramsFilter = {
      "categoria": {},
      "ordenamiento": "DESC",
      "condicion_producto": "",
      "garantia": "",
      "oferta": "",
      "envio": ""
    }
    paramsFilter.oferta = this.id;
    getProductos();
  });
  $('.content_ctg_e').click(function ($event) {



    $('.prev__tienda__subcategory__selected').text(this.text);
    paramsFilter = {
      "categoria": {},
      "ordenamiento": "DESC",
      "condicion_producto": "",
      "garantia": "",
      "oferta": "",
      "envio": ""
    }
    paramsFilter.envio = this.id;
    getProductos();
  });
});

function cargarPrimero() {
  /*let data = {
    "id": empresaAuth.id
  };
  let data_url = `${baseurl}/controllers/empresas/?ver`;
  $.ajax({
    type: "POST",
    url: data_url,
    data: ({ "data": data }),
    dataType: "json",
    success: success => {
      if (success["status"] == "success") {
        prevEmpresaSchema = success.data;
        initPage(prevEmpresaSchema);
      } else {
        
        history.go(-1);
        return;
      }
    }, error: error => {
      
      
      presentAlert(idioma['_trans462'], idioma['_trans495']);
      history.go(-1);
      return;
    }
  });*/

  try {
    prevEmpresaSchema = JSON.parse(localStorage.getItem(`previsualizar-empresa`));
    initPage(prevEmpresaSchema);
    console.log("[ 1. prev ] ---------- [ prevEmpresaSchema ]: ", prevEmpresaSchema);
    console.log("[ 1. prev ] ---------- [ prevEmpresaSchema ]: ", prevEmpresaSchema);
    console.log("[ 1. prev ] ---------- [ prevEmpresaSchema ]: ", prevEmpresaSchema);
    console.log("[ 1. prev ] ---------- [ prevEmpresaSchema ]: ", prevEmpresaSchema);
    console.log("[ 1. prev ] ---------- [ prevEmpresaSchema ]: ", prevEmpresaSchema);
  } catch (ex) {

    console.log(ex);
    history.go(-1);
    return;
  }
}


async function initPage(prevEmpresaSchema = {}) {

  let data = {
    uid: user.uid,
    empresa: user.empresa
  }
  schemaDatosEmpresa = await getProductoDatosVendedorByParams({ "data": data });

  if (prevEmpresaSchema.foto_portada_empresa && prevEmpresaSchema.foto_portada_empresa != "" && !prevEmpresaSchema.foto_portada_empresa.includes("...")) {
    $('.prev__tienda__banner').prop('src', prevEmpresaSchema.foto_portada_empresa);
  }
  if (prevEmpresaSchema.foto_logo_empresa && prevEmpresaSchema.foto_logo_empresa != "" && !prevEmpresaSchema.foto_logo_empresa.includes("...")) {
    $('.prev__tienda__logo').prop('src', prevEmpresaSchema.foto_logo_empresa);
  }
  if (prevEmpresaSchema.nombre_empresa && prevEmpresaSchema.nombre_empresa != "" && !prevEmpresaSchema.nombre_empresa.includes("...")) {
    $('.prev__tienda__name').text(prevEmpresaSchema.nombre_empresa);
  }

  if (prevEmpresaSchema.foto_asesor && prevEmpresaSchema.foto_asesor != "" && !prevEmpresaSchema.foto_asesor.includes("...")) {
    $('.prev__tienda__employees__avatar').prop('src', prevEmpresaSchema.foto_asesor);
  }

  if (prevEmpresaSchema.descripcion && prevEmpresaSchema.descripcion != "" && !prevEmpresaSchema.descripcion.includes("...")) {
    $('.prev__tienda__description').text(prevEmpresaSchema.descripcion);
  }
  // if (prevEmpresaSchema.foto_empleado_empresa && prevEmpresaSchema.foto_empleado_empresa != "" && !prevEmpresaSchema.foto_empleado_empresa.includes("...")) {
  //   // campo nuevo.....
  //   $('.prev__tienda__employees__avatar').prop('src', prevEmpresaSchema.foto_empleado_empresa);
  // }
  if (prevEmpresaSchema.nombre_dueno && prevEmpresaSchema.nombre_dueno != "" && !prevEmpresaSchema.nombre_dueno.includes("...")) {
    $('.prev__tienda__employees__name').text(prevEmpresaSchema.nombre_dueno);
  }
  if (prevEmpresaSchema.cargo && prevEmpresaSchema.cargo != "" && !prevEmpresaSchema.cargo.includes("...")) {
    $('.prev__tienda__employees__rol').text(prevEmpresaSchema.cargo);
  }
  // $('.prev__tienda__starts').html(''); // ESTE CAMPO ESTA PENDIENTE, BUSCAR EN PRODUCTO.PHP el get de la empresa que información necesita y replicar aquí
  // $('.prev__tienda__category').text(idioma['_trans844'] + " " + schemaDatosEmpresa.data.promedio.vendedor_tipo);
  // $('.prev__tienda__category_text').text(categorias_empresa.find(f => f.nombre == schemaDatosEmpresa.data.promedio.vendedor_tipo).texto)


  if (prevEmpresaSchema.cargo && prevEmpresaSchema.cargo != "" && !prevEmpresaSchema.cargo.includes("...")) {
    $('.prev__tienda__employees__rol').text(prevEmpresaSchema.cargo);
  }
  if (prevEmpresaSchema.caracteristica_principal_1 == 1) {
    $('.prev__tienda__characteristic__1').show('slow');

  } else {
    $('.prev__tienda__characteristic__1').hide('slow');
  }
  if (prevEmpresaSchema.caracteristica_principal_2 == 2) {
    $('.prev__tienda__characteristic__2').show('slow');

  } else {
    $('.prev__tienda__characteristic__2').hide('slow');
  }
  if (prevEmpresaSchema.caracteristica_principal_3 == 3) {
    $('.prev__tienda__characteristic__3').show('slow');

  } else {
    $('.prev__tienda__characteristic__3').hide('slow');
  }

  prev__getCategoriasLocal();


  $('.prev__tienda__ordering__selected').text(idioma['trans_264']);
  paramsFilter.ordenamiento = "ASC";

  getEstadisticasEmpresa();
  getProductos();
}

async function prev__getCategoriasLocal() {
  let schemaCategoriasJSON = await getCategorias();
  prev__injectCategoriasDropdown(schemaCategoriasJSON);
}
function prev__injectCategoriasDropdown(schemaCategoriasJSON = []) {
  let htmlOption = "";
  $.each(schemaCategoriasJSON, function (i, item) {
    htmlOption = `<a class="dropdown-item prev__tienda__subcategory__list__item" data-id="${item.CategoryID}">${item.CategoryName}</a>`;
    $('.prev__tienda__subcategory__list').append(htmlOption);

    $('.prev__tienda__subcategory__list__item').eq(i).off('click');
    $('.prev__tienda__subcategory__list__item').eq(i).on('click', { 'item': item }, setterCatgorySelected);
  });
  $('.prev__tienda__subcategory__selected').text(schemaCategoriasJSON[0].CategoryName);
}

function setterCatgorySelected(params = {}) {


  paramsFilter.categoria = params.data.item.CategoryID;

  $('.prev__tienda__subcategory__selected').text(paramsFilter.categoria.CategoryName);
  getProductos();
}
var schemaDatosVendedor = {};
function getProductos(pag = 1) {




  var paramsRequest = getParamsFilterProductsURL();
  for (let key in paramsRequest) {
    if (key != 'iso_code_2' && key != 'iso_code_2_money' && key != 'empresa' && key != 'categoria' && key != 'pagina' && key != 'ordenamiento') {
      paramsRequest[key] = "";
    }
  }
  paramsRequest.iso_code_2 = paisOrigen.iso_code_2;
  // paramsRequest.iso_code_2_money = iso_code_2_money;
  paramsRequest.iso_code_2_money = empresaAuth.iso_code_2;
  paramsRequest.empresa = empresaAuth.uid;
  paramsRequest.ordenamiento = paramsFilter.ordenamiento;
  // paramsRequest.categoria        = "";
  paramsRequest.pagina = pag;

  if (paramsFilter.categoria) {
    paramsRequest.categoria = paramsFilter.categoria;
  } else {
    paramsRequest.categoria = "";
  }

  if (paramsFilter.condicion_producto) {
    paramsRequest.condicion_producto = paramsFilter.condicion_producto;
  } else {
    paramsRequest.condicion_producto = "";
  }

  if (paramsFilter.garantia) {
    paramsRequest.garantia = paramsFilter.garantia;
  } else {
    paramsRequest.garantia = "";
  }

  if (paramsFilter.oferta) {
    paramsRequest.oferta = paramsFilter.oferta;
  } else {
    paramsRequest.oferta = "";
  }

  if (paramsFilter.envio) {
    paramsRequest.envio = paramsFilter.envio;
  } else {
    paramsRequest.envio = "";
  }

  paramsFilter.ordenamiento = paramsFilter.ordenamiento;




  let data_url = `${baseurl}/controllers/producto/?filtros_productos`;


  prev_noDataProducts(true);
  let datosEnviar = {
    "data": paramsRequest
  };
  $.ajax({
    type: "POST",
    url: data_url,
    data: datosEnviar,
    dataType: "json",
    success: datos => {


      if (datos["status"] == "success") {
        prev_generateHtmlProducts(datos);
        prev_noDataProducts(false);

      } else {
        prev_noDataProducts(true);

      }
    }, error: error => {

      prev_noDataProducts(true);
    }
  });
}

let eschema = {
  "status": "success",
  "message": "usuario",
  "data": {
    "usuario": {
      "nombre": "Vilma J. R. A.",
      "empresa": 0,
      "correo": "vilma@correo.com",
      "telefono": "301548672111",
      "foto": "4"
    },
    "direccion": {
      "id": 78,
      "id_shippo": "34ddc47e2c494e2ba04c868e36d1511c",
      "uid": 297,
      "empresa": "0",
      "pais": 47,
      "departamento": 509,
      "ciudad": "Santa Marta",
      "latitud": -74.2110227,
      "longitud": 11.2403547,
      "codigo_postal": "470001",
      "direccion": "cerca al aeropuerto",
      "activa": 1,
      "estado": 1,
      "fecha_creacion": "1604498284695",
      "fecha_actualizacion": "1604498284695"
    },
    "promedio": {
      "general_prom": "3.25",
      "buena_atencion_prom": "4.00",
      "tiempo_entrega_prom": "4.00",
      "fidelidad_producto_prom": "4.00",
      "satisfaccion_producto_prom": "1.00",
      "cantidad_comentarios": "1",
      "buenos": "0",
      "regulares": "1",
      "malos": "0",
      "ventas_seis_meses": "1",
      "vendedor_tipo": "Platinum"
    },
    "escala": {
      "escala": 0,
      "escala_descripcion": "Sin clasificacion"
    }
  }
};
function getEstadisticasEmpresa() {
  let dataComents = {
    "uid": empresaAuth.id,
    "empresa": empresaAuth.empresa
  };


  let label = idioma['trans_279'].split("@@@").join("...");
  $('.prev__tienda__category__label').text(label);
  $('.prev__tienda__category__label__2').text('.....');

  let data_url = `${baseurl}/controllers/datos_vendedor/?calificacion`;
  $.ajax({
    type: "POST",
    url: data_url,
    data: { "data": dataComents },
    dataType: "json",
    //"headers": { 'x-api-key': user.token },
    success: async datos => {

      if (datos['status'] == "success") {
        if (datos.data.promedio) {
          if (datos.data.promedio.cantidad_comentarios) {
            $('.prev__tienda__total__comments').text(datos.data.promedio.cantidad_comentarios);
          }
          if (datos.data.promedio.buenos) {
            $('.prev__tienda__good__comments').text(datos.data.promedio.buenos);
          }
          if (datos.data.promedio.regulares) {
            $('.prev__tienda__regular__comments').text(datos.data.promedio.regulares);
          }
          if (datos.data.promedio.malos) {
            $('.prev__tienda__bad__comments').text(datos.data.promedio.malos);
          }
          if (datos.data.promedio.general_prom) {
            let schemaHtmlStarts = getRatesIcons(datos.data.promedio.general_prom * 1);
            $('.prev__tienda__starts').html(`
              <span>${datos.data.promedio.general_prom}</span>
              ${schemaHtmlStarts}
            `);
          }
        }
        schemaDatosVendedor = datos['data'];
        label = idioma['trans_279'].split("@@@").join(schemaDatosVendedor.promedio.vendedor_tipo);
        $('.prev__tienda__category__label').text(label);

        if (("" + localLenguaje).toUpperCase() == "ES") {
          $('.prev__tienda__category__label__2').text(schemaDatosVendedor.promedio.vendedor_tipo_label_es);
        } else if (("" + localLenguaje).toUpperCase() == "EN") {
          $('.prev__tienda__category__label__2').text(schemaDatosVendedor.promedio.vendedor_tipo_label_en);
        }

      } else {
        let validate_token = await erroresTokenEmpresa(datos);
        if (!validate_token) { }
        $('.prev__tienda__total__comments').text(0);
        $('.prev__tienda__good__comments').text(0);
        $('.prev__tienda__regular__comments').text(0);
        $('.prev__tienda__bad__comments').text(0);

      }
    }, error: error => {
      console.log("error: ", error);

      presentAlert(idioma['_trans06'], idioma['_trans507']);
      $('.prev__tienda__total__comments').text(0);
      $('.prev__tienda__good__comments').text(0);
      $('.prev__tienda__regular__comments').text(0);
      $('.prev__tienda__bad__comments').text(0);
    }
  });
}
function prev_generateHtmlProducts(datos = {}) {
  let htmlContent = "";
  $.each(datos.data, (i, item) => {

    let htmlOferta = "";
    let htmlOfertaPorcentaje = "";
    if (item.oferta != tieneOferta) {
      htmlOferta = `${item.precio_local_user_mask} ${item.moneda_local_user}`;
    } else {
      htmlOferta = `${item.precio_descuento_local_user_mask} ${item.moneda_local_user}`;
      htmlOfertaPorcentaje = `<button class="btn-descuent">${item.porcentaje_oferta} Off <img loading="lazy" src="../imagen/descuento-empresa.png" alt="${item.titulo} - nasbi.com"></button>`;
    }

    let imagenProducto = "";
    if (item.foto_portada != "") {
      imagenProducto = item.foto_portada;
    } else {
      imagenProducto = imageDefault;
    }

    let caracteristicasHTML = `
    <div class="content-button-product">
        <button class="btn1"><img loading="lazy" src="../imagen/logo-cripto.png"></button>
        <button class="btn2"><img loading="lazy" src="../imagen/garantia.png"></button>
        <button class="btn3"><img loading="lazy" src="../imagen/envi-gratis.png"></button>
    </div>`;

    htmlContent += `
      <div class="col-md-6 col-lg-4 col-xl-3">
          <div class="card-products">
              <div class="contenedor-producto">
                  <img loading="lazy" src="${imagenProducto}" class="imagen-producto">
                  ${htmlOfertaPorcentaje}
              </div>
              <div class="row row-name-price">
                  <div class="col-sm-7 px-1">
                      <p class="trans_267">${item.titulo}</p>
                      <p><b>${htmlOferta}</b></p>
                  </div>
                  <div class="col-sm-5 px-1">
                      <a href="./producto.php?uid=${item.id}"><button class="trans_268">${idioma['trans_268']}</button></a>
                  </div>
              </div>
          </div>
      </div>
    `;
  });

  let paramsPaginationGeneral = {
    total_paginas: datos.total_paginas,
    pagina: datos.pagina,
    classClick: "productos_empresa_eventClick"
  };
  htmlContent += generatePaginationsDynamic(paramsPaginationGeneral);
  $('.prev__tienda__content').html(htmlContent);
  $('.productos_empresa_eventClick').off('click');
  $('.productos_empresa_eventClick').on('click', {}, function ($event) {


    getProductos(this.id);
  });
}
function prev_noDataProducts(mostrar = false) {
  if (mostrar) {
    $('.prev__products__list__nodata').show('slow');
    $('.prev__tienda__content').hide('slow');
  } else {
    $('.prev__products__list__nodata').hide('slow');
    $('.prev__tienda__content').show('slow');
  }
}

function prev_loadingOptFilters(id = 1) {
  if (id == 1) {

  } else if (id == 2) {

  } else if (id == 3) {

  } else if (id == 4) {

  } else if (id == 5) {

  } else {

  }

}