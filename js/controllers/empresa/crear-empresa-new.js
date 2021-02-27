var crearEmpresaSchema = {
  "id": 0,
  "pais": 0,
  "nombre_empresa": "",
  "razon_social": "",
  "nit": 0,
  "pagina_web": "",
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
  "foto_asesor": null,
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


$(document).ready(($event) => {

  $('#file-upload').off('change');
  $('#file-upload').on('change', { id: '.crear_empresa_logo', keyJSON: "foto_logo_empresa" }, convertBase64);

  $('#file-upload-asesor').off('change');
  $('#file-upload-asesor').on('change', { id: '.crear_empresa_avatar_asesor', keyJSON: "foto_asesor" }, convertBase64);

  $('#file-banner').off('change');
  $('#file-banner').on('change', { id: '.crear_empresa_logo' }, convertBase64__background_image);

  $('.crear_empresa__btnpublicar').off('click');
  $('.crear_empresa__btnpublicar').on('click', {}, publicar_btn);

  $('.crear_empresa__btnprevisualizar').click(($event) => {
    // $('#modal-presentAlert-info-local').modal('show');

    console.log("\n\n\n\n\n\n\n\n");
    console.log("[ 1. ] --+> crearEmpresaSchema: ", crearEmpresaSchema);

    crearEmpresaSchema = asignarDatosEmpresa();
    let crearEmpresaSchemaAux = crearEmpresaSchema;
    delete crearEmpresaSchemaAux.productos;
    localStorage.setItem(`previsualizar-empresa`, JSON.stringify(crearEmpresaSchemaAux));

    console.log("[ 2. ] --+> crearEmpresaSchema: ", crearEmpresaSchemaAux);

    window.open("previsualizar-empresa.php", "_blank");
    console.log("\n\n\n\n\n\n\n\n");
  });

  $('.modal-presentAlert-info-local-cancel').click(($event) => {
  });

  $('.modal-presentAlert-info-local-publicar').click(($event) => {
    activarButtonPublicar(false);

    if (crearEmpresa_validar()) {
      let data_url = `${baseurl}/controllers/empresas/?personalizar`;
      $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": crearEmpresaSchema },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async success => {
          activarButtonPublicar(true);
          $('#modal-presentAlert-info-local').modal('hide');

          if (success["status"] == "success") {
            empresaAuth.notificaciones = crearEmpresaSchema.notificaciones;
            // empresaAuth.nombre_empresa = crearEmpresaSchema.nombre_empresa
            // empresaAuth.nombre_dueno = crearEmpresaSchema.nombre_dueno
            // empresaAuth.cargo = crearEmpresaSchema.cargo
            // empresaAuth.foto_logo_empresa = crearEmpresaSchema.foto_logo_empresa
            // empresaAuth.foto_portada_empresa = crearEmpresaSchema.foto_portada_empresa
            // empresaAuth.foto_asesor = crearEmpresaSchema.foto_asesor
            // empresaAuth.descripcion = crearEmpresaSchema.descripcion


            console.log("\n\n\n\n\n\n\n\n");
            console.log("1). empresaAuth: ", empresaAuth);
            console.log("2). empresaAuth: ", empresaAuth);
            console.log("3). success: ", success);
            console.log("4). crearEmpresaSchema: ", crearEmpresaSchema);
            console.log("\n\n\n\n\n\n\n\n");

            localStorage.setItem("empresaAuth", JSON.stringify(empresaAuth));
            localStorage.setItem("userAuth", JSON.stringify(empresaAuth));

            // if (success.primer_cambio == 1) {
            if (empresaAuth.estado == 1) {
              $('#modal-tienda-publicada').modal('show');
              console.log("\n\n Información a verificar (1)");
              $(".modal-tienda-publicada-vertienda").click(($event) => {
                let crearEmpresaSchemaAux = crearEmpresaSchema;
                delete crearEmpresaSchemaAux.productos;
                localStorage.removeItem(`previsualizar-empresa`);
                loadPage("productos-empresa.php?empresa=" + crearEmpresa.uid)
              });
            } else {
              $('#modal-tienda-publicada-v2').modal('show');
              console.log("\n\n Información a verificar (2)");
              $(".modal-tienda-publicada-vertienda-2").click(($event) => {
                let crearEmpresaSchemaAux = crearEmpresaSchema;
                delete crearEmpresaSchemaAux.productos;
                localStorage.removeItem(`previsualizar-empresa`);
                loadPage("productos-empresa.php?empresa=" + crearEmpresa.uid)
              });
            }
          } else {
            let validate_token = await erroresTokenEmpresa(success);
            if (!validate_token) presentAlert(idioma['_trans06'], idioma['_trans490'])

          }
        }, error: error => {
          activarButtonPublicar(true);
          $('#modal-presentAlert-info-local').modal('hide');
          presentAlert(idioma['_trans06'], idioma['_trans491'])
        }
      });
    } else {
      activarButtonPublicar(true);

    }
  });

  $('.crear_empresa__newproduct').click(function ($event) {
    console.log("---------- CREAR UN NUEVO PRODUCTO ----------");
    $("#modal-crear-empresa-cargar-producto").modal("show");
  });

});

function cargarPrimero() {
  localStorage.removeItem(`${empresaAuth.id}-storate-previsualizar-empresa`);

  $('.crear_empresa__content__general__products').hide();

  console.log("----> [ empresaAuth ]: ", empresaAuth);

  let data = {
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
        crearEmpresaSchema = success.data;
        console.log("crearEmpresaSchema: ", crearEmpresaSchema);
        getData(crearEmpresaSchema);
      } else {

        console.log("\n\t\t [ Crear empresa new (1)]: No se recibierón datos de la empresa a través del webservice.");
      }

    }, error: error => {
      console.log("[ error ]: ", error);
      console.log("\n\t\t [ Crear empresa new (2)]: No se recibierón datos de la empresa a través del webservice.");
      presentAlert(idioma['_trans462'], idioma['_trans495'])
    }
  });
}

function convertBase64(e) {
  let id = e.data.id;
  let keyJSON = e.data.keyJSON;
  var archivo = e.target.files[0], reader = new FileReader();
  if (archivo) {
    if (archivo.size <= 5000000) {
      if (archivo['type'] == "image/png" || archivo['type'] == "image/jpeg" || archivo['type'] == "image/jpg") {

        reader.onload = (e) => {
          var binaryString;
          if (!e) binaryString = reader.content;
          else binaryString = e.target.result;
          let img = 'data:image/png;base64,' + window.btoa(binaryString);

          crearEmpresaSchema[keyJSON] = img;
          $(id).prop('src', img);
        }
        reader.readAsBinaryString(archivo);
      } else {
        console.log('no es una imagen')
        presentAlert(idioma['trans_04'], idioma['_trans919'])
      }
    } else {
      presentAlertObject({ icon: "success", text: idioma.trans197 });

    }
  }
}

function convertBase64__background_image(e) {
  let id = e.data.id;
  var archivo = e.target.files[0], reader = new FileReader();
  if (archivo) {
    if (archivo.size <= 5000000) {
      if (archivo['type'] == "image/png" || archivo['type'] == "image/jpeg" || archivo['type'] == "image/jpg") {

        reader.onload = (e) => {
          var binaryString;
          if (!e) binaryString = reader.content;
          else binaryString = e.target.result;

          let img = 'data:image/png;base64,' + window.btoa(binaryString);

          crearEmpresaSchema.foto_portada_empresa = img;
          $('.content-imgPortada').css('background-image', 'url("' + img + '")');
        }
        reader.readAsBinaryString(archivo);
      } else {
        console.log('no es una imagen')
        presentAlert(idioma['trans_04'], idioma['_trans919'])
      }
    } else {
      presentAlertObject({ icon: "success", text: idioma.trans197 });

    }
  }
}

function getData(datos) {
  console.log("Estos son los datos de la empresa: ", datos);

  $('.crear_empresa__nombre_empresa').val(datos.nombre_empresa);

  if (datos.nombre_dueno && !datos.nombre_dueno.includes("...")) {
    $('.crear_empresa__nombre').val(datos.nombre_dueno);
  } else {
    datos.nombre_dueno = "";
  }

  if (datos.cargo && !datos.cargo.includes("...")) {
    $('.crear_empresa__cargo').val(datos.cargo);
  } else {
    datos.cargo = "";
  }
  if (datos.descripcion && !datos.descripcion.includes("...")) {
    $('.crear_empresa__descripcion').val(datos.descripcion);
  } else {
    datos.descripcion = "";
  }

  // Pendiente por juanito :'v
  $('.crear_empresa__descripcion').val(datos.descripcion);


  if (datos.foto_logo_empresa && !datos.foto_logo_empresa.includes("...")) {
    $('.crear_empresa_logo').prop('src', datos.foto_logo_empresa);
  } else {
    datos.foto_logo_empresa = "";
    $('.crear_empresa_logo').prop('src', "../imagen/img-empresas/nasbi-logo-placeholder.png");

  }

  if (datos.foto_portada_empresa && !datos.foto_portada_empresa.includes("...")) {
    $('.ES .content-imgPortada').css('background-image', 'url("' + datos.foto_portada_empresa + '")');
    $('.EN .content-imgPortada').css('background-image', 'url("' + datos.foto_portada_empresa + '")');
  } else {
    datos.foto_portada_empresa = "";
    $('.ES .content-imgPortada').css('background-image', 'url("' + "../imagen/img-empresas/header-empresa-placeholder.png" + '")');
  }
  if (datos.foto_asesor && !("" + datos.foto_asesor).includes("...")) {
    $('.crear_empresa_avatar_asesor').prop('src', datos.foto_asesor);
  } else {
    datos.foto_asesor = "";
    $('.crear_empresa_avatar_asesor').prop('src', "../imagen/img-empresas/user-placeholder-1.png");
  }

  if (datos.caracteristica_principal_1 && !("" + datos.caracteristica_principal_1).includes("...")) {
    $('.crear_empresa__caracteristica_principal_1').prop('checked', true);
  } else {
    datos.caracteristica_principal_1 = "";
  }
  if (datos.caracteristica_principal_2 && !("" + datos.caracteristica_principal_2).includes("...")) {
    $('.crear_empresa__caracteristica_principal_2').prop('checked', true);
  } else {
    datos.caracteristica_principal_2 = "";
  }
  if (datos.caracteristica_principal_3 && !("" + datos.caracteristica_principal_3).includes("...")) {
    $('.crear_empresa__caracteristica_principal_3').prop('checked', true);
  } else {
    datos.caracteristica_principal_3 = "";
  }

  if (datos.productos) {
    $('.crear_empresa__productos__list').hide();

    var paramsRequest = getParamsFilterProductsURL();
    for (let key in paramsRequest) {
      if (key != 'iso_code_2' && key != 'iso_code_2_money' && key != 'empresa' && key != 'categoria' && key != 'pagina' && key != 'ordenamiento') {
        paramsRequest[key] = "";
      }
    }
    paramsRequest.iso_code_2 = paisOrigen.iso_code_2;
    paramsRequest.iso_code_2_money = (empresaAuth.iso_code_2 ? empresaAuth.iso_code_2 : iso_code_2_money);
    paramsRequest.empresa = empresaAuth.id;
    paramsRequest.ordenamiento = "ASC";
    paramsRequest.pagina = 1;

    // $('.crear_empresa__productos__list__nodata').show();
    let datosEnviar = {
      "data": paramsRequest
    };
    $.ajax({
      type: "POST",
      url: `${baseurl}/controllers/producto/?filtros_productos`,
      data: datosEnviar,
      dataType: "json",
      success: datos => {
        console.log("[getProductos()/datosEnviar]: ", datosEnviar);
        console.log("[getProductos()/success]: ", datos);
        if (datos["status"] == "success") {
          crearEmpresa_generateHtmlProducts(datos);

        } else {
          $('.crear_empresa__productos__list__nodata').show();

        }
      }, error: error => {
        console.log("[getProductos()/serror]: ", error);
        $('.crear_empresa__productos__list__nodata').show();

      }
    });
    crearEmpresa_infoVerificado(datos);


  } else {
    $('.crear_empresa__productos__list__nodata').show();

    crearEmpresa_infoVerificado(datos);
  }
}
function crearEmpresa_infoVerificado(datos = {}) {
  empresaAuth.estado = datos.estado * 1;

  localStorage.setItem("empresaAuth", JSON.stringify(empresaAuth));
  localStorage.setItem("userAuth", JSON.stringify(empresaAuth));

  //if (datos.estado * 1 == 1) {
  // Proceso EMPRESA VALIDADA
  $('.crear_empresa__content__general__products__title').html(idioma['trans_278']);
  $('.crear_empresa__content__general__products').show();
  console.log("\n\n\n\n\n\n\n\n");
  console.log("ENTRE EN EL FLUJO DE// Proceso EMPRESA VALIDADA ---> ", datos);
  console.log("\n\n\n\n\n\n\n\n");
  //} else {
  // Proceso EMPRESA NO-VALIDADA
  //   $('.crear_empresa__content__general__products__title').html(idioma['trans_287']);
  //   $('.crear_empresa__content__general__products').hide();
  //   console.log("\n\n\n\n\n\n\n\n");
  //   console.log("ENTRE EN EL FLUJO DE: // Proceso EMPRESA NO-VALIDADA ---> ", datos);
  //   console.log("\n\n\n\n\n\n\n\n");
  // }
}
function crearEmpresa_generateHtmlProducts(datos = {}) {
  let htmlContent = "";
  let countCardDefault = 4;
  $.each(datos.data, (i, item) => {

    countCardDefault--;
    if (countCardDefault == 0) {
      countCardDefault = 4;
    }

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
  if (htmlContent.length > 0) {
    $('.crear_empresa__productos__list').show();
  }
  $('.crear_empresa__productos__list').html(htmlContent);
  crearEmpresa_generateHtmlProductsEmpty(countCardDefault);
}

function crearEmpresa_generateHtmlProductsEmpty(countCardDefault = 4) {
  if (countCardDefault == 4) {
    $('.crear_empresa__productos__list__nodata').show();
  } else {
    let htmlContent = "";
    for (let index = 0; index <= countCardDefault; index++) {

      htmlContent = `
        <div class="col-md-6 col-lg-4 col-xl-3 ">
          <div class="content-destacado">
              <label for="file-detacado">
                  <img loading="lazy"  src="../imagen/img-empresas/destacado-${localLenguaje.toLowerCase()}.png" class="imagen-destacado crear_empresa__newproduct trans_245__src crear_empresa__product" id="1" alt="nasbi.com">
              </label>
          </div>
        </div>
      `;
      $('.crear_empresa__productos__list').append(htmlContent);

      $('.crear_empresa__newproduct').eq(index).off('click');
      $('.crear_empresa__newproduct').eq(index).on('click', {}, openLoadingProductos);
    }
    if (htmlContent.length > 0) {
      $('.crear_empresa__productos__list').show();
    }
  }
}

function openLoadingProductos() {
  $("#modal-crear-empresa-cargar-producto").modal("show");
}

function crearEmpresa_validar() {
  crearEmpresaSchema = asignarDatosEmpresa();

  if (crearEmpresaSchema.nombre_empresa.trim().length == 0) {
    // error nombre
    presentAlert(idioma['trans_109'], idioma['trans_247']);
    return false;
  }
  if (crearEmpresaSchema.nombre_dueno.trim().length == 0) {
    // error asesor
    presentAlert(idioma['trans_109'], idioma['trans_248']);
    return false;
  }
  if (crearEmpresaSchema.cargo.trim().length == 0) {
    // error cargo asesor
    presentAlert(idioma['trans_109'], idioma['trans_249']);
    return false;
  }
  if (crearEmpresaSchema.foto_logo_empresa.trim().length == 0) {
    // error logo empresa
    presentAlert(idioma['trans_109'], idioma['trans_250']);
    return false;
  }
  if (crearEmpresaSchema.foto_portada_empresa.trim().length == 0) {
    // error portada empresa
    presentAlert(idioma['trans_109'], idioma['trans_251']);
    return false;
  }
  if (crearEmpresaSchema.foto_asesor.trim().length == 0) {
    // error foto asesor
    presentAlert(idioma['trans_109'], idioma['trans_251']);
    return false;
  }
  if (crearEmpresaSchema.descripcion.trim().length == 0) {
    // error portada empresa
    presentAlert(idioma['trans_109'], idioma['trans_255']);
    return false;
  }
  /*if ( crearEmpresaSchema.caracteristica_principal_1 == undefined ) {
    // error portada empresa
    presentAlert(idioma['trans_109'], idioma['trans_256']);
    return false;
  }
  if ( crearEmpresaSchema.caracteristica_principal_2 == undefined ) {
    // error portada empresa
    presentAlert(idioma['trans_109'], idioma['trans_256']);
    return false;
  }
  if ( crearEmpresaSchema.caracteristica_principal_3 == undefined ) {
    // error portada empresa
    presentAlert(idioma['trans_109'], idioma['trans_256']);
    return false;
  }*/
  return true;
}

function asignarDatosEmpresa() {
  console.log("\n\n");
  console.log("{antes} Datos a guardar [ crearEmpresaSchema ]: ", crearEmpresaSchema);

  crearEmpresaSchema.nombre_empresa = $('.crear_empresa__nombre_empresa').val();
  crearEmpresaSchema.nombre_dueno = $('.crear_empresa__nombre').val();
  crearEmpresaSchema.cargo = $('.crear_empresa__cargo').val();

  crearEmpresaSchema.descripcion = $('.crear_empresa__descripcion').val();

  let caracteristica_principalTemp = "";

  crearEmpresaSchema.caracteristica_principal = "";
  if ($('input[name=crear_empresa__caracteristica_principal_1]:checked').val()) {
    crearEmpresaSchema.caracteristica_principal_1 = "1";
  } else {
    console.log('pailas---- input[name=crear_empresa__caracteristica_principal_1]:checked');
    crearEmpresaSchema.caracteristica_principal_1 = "";
  }

  if ($('input[name=crear_empresa__caracteristica_principal_2]:checked').val()) {
    crearEmpresaSchema.caracteristica_principal_2 = "2";
  } else {
    console.log('pailas---- input[name=crear_empresa__caracteristica_principal_2]:checked');
    crearEmpresaSchema.caracteristica_principal_2 = "";
  }

  if ($('input[name=crear_empresa__caracteristica_principal_3]:checked').val()) {
    crearEmpresaSchema.caracteristica_principal_3 = "3";
  } else {
    console.log('pailas---- input[name=crear_empresa__caracteristica_principal_3]:checked');
    crearEmpresaSchema.caracteristica_principal_3 = "";
  }

  console.log("\t{despues} Datos a guardar [ crearEmpresaSchema ]: ", crearEmpresaSchema);

  return crearEmpresaSchema;
}

function publicar_btn() {

  activarButtonPublicar(false);

  if (crearEmpresa_validar()) {
    personalizar(crearEmpresaSchema);
  } else {
    activarButtonPublicar(true);
  }
}

function personalizar(dataEmpresa) {
  let data_url = `${baseurl}/controllers/empresas/?personalizar`;
  $.ajax({
    type: "POST",
    url: data_url,
    data: { "data": dataEmpresa },
    dataType: "json",
    "headers": { 'x-api-key': user.token },
    success: async success => {
      activarButtonPublicar(true);

      if (success["status"] == "success") {
        empresaAuth.notificaciones = dataEmpresa.notificaciones
        empresaAuth.nombre_empresa = dataEmpresa.nombre_empresa
        empresaAuth.nombre_dueno = dataEmpresa.nombre_dueno
        empresaAuth.cargo = dataEmpresa.cargo
        empresaAuth.foto_logo_empresa = dataEmpresa.foto_logo_empresa
        empresaAuth.foto_portada_empresa = dataEmpresa.foto_portada_empresa
        empresaAuth.foto_asesor = dataEmpresa.foto_asesor
        empresaAuth.descripcion = dataEmpresa.descripcion

        // empresaAuth.caracteristica_principal_1 = dataEmpresa.caracteristica_principal_1
        // empresaAuth.caracteristica_principal_2 = dataEmpresa.caracteristica_principal_2
        // empresaAuth.caracteristica_principal_3 = dataEmpresa.caracteristica_principal_3


        localStorage.setItem("empresaAuth", JSON.stringify(empresaAuth));
        localStorage.setItem("userAuth", JSON.stringify(empresaAuth));

        /*if (success.primer_cambio == 1) {
          $('#modal-tienda-publicada').modal('toggle');
        } else {
          presentAlert(idioma['_trans474'], idioma['_trans830'])
        }*/
        console.log("-----***> empresaAuth: ", empresaAuth.estado);
        console.log("-----***> empresaAuth: ", empresaAuth.estado);
        console.log("-----***> empresaAuth: ", empresaAuth.estado);
        console.log("-----***> empresaAuth: ", empresaAuth.estado);
        console.log("-----***> empresaAuth: ", empresaAuth.estado);
        console.log("-----***> empresaAuth: ", empresaAuth.estado);
        if (empresaAuth.estado == 1) {
          $('#modal-tienda-publicada').modal('show');
          console.log("\n\n Información a verificar (3)");
          $(".modal-tienda-publicada-vertienda").click(($event) => {
            let crearEmpresaSchemaAux = crearEmpresaSchema;
            delete crearEmpresaSchemaAux.productos;
            localStorage.removeItem(`previsualizar-empresa`);
            loadPage("productos-empresa.php?empresa=" + crearEmpresaSchema.uid)
          });
        } else {
          $('#modal-tienda-publicada-v2').modal('show');
          console.log("\n\n Información a verificar (4)");
          $(".modal-tienda-publicada-vertienda-2").click(($event) => {
            let crearEmpresaSchemaAux = crearEmpresaSchema;
            delete crearEmpresaSchemaAux.productos;
            localStorage.removeItem(`previsualizar-empresa`);
            loadPage("productos-empresa.php?empresa=" + crearEmpresaSchema.uid)
          });
        }
      } else {
        let validate_token = await erroresTokenEmpresa(success);
        if (!validate_token) presentAlert(idioma['_trans06'], idioma['_trans490'])

      }
    }, error: error => {
      activarButtonPublicar(true);
      presentAlert(idioma['_trans06'], idioma['_trans491'])
    }
  });
}

function activarButtonPublicar(disabled = false) {
  if (disabled) {
    $('.crear_empresa__btnpublicar__spinner').hide('slow');
    $('.crear_empresa__btnpublicar').attr('disabled', false);
    $('.modal-presentAlert-info-local-publicar').attr('disabled', false);
  } else {
    $('.crear_empresa__btnpublicar__spinner').show('slow');
    $('.crear_empresa__btnpublicar').attr('disabled', true);
    $('.modal-presentAlert-info-local-publicar').attr('disabled', true);
  }
}













