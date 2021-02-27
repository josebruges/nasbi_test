<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title class="trans516_">Nasbi.com | Soporte</title>
  <link rel="icon" href="../imagen/Logo-Blanco.png">
  <!-- Include General Css -->
  <?php
    include '../include/include-css.php';
    include '../include/head-js.php';
  ?>
  <link rel="stylesheet" href="../css/support.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
  
  <div class="animate__animated animate__fadeIn">
    <div class="content_custom_container">
      <div class="row my_title">
        <div class="col-12 px-0 titulo-resume-ganancias titulo-dashboard">
          <h2 class="json trans202" ></h2>
          <h5 class="json my_subtitulo trans203"></h5>
        </div>
      </div>
      
      
      <div class="row color-edit-label-support">
        <div class="col-12">
          <div class="form-group">
            <label for="" class="json trans211_" id="titulo" ></label>
            <input type="text" class="form-control" name="" id="txt-soporte-titulo" aria-describedby="helpId" placeholder="">
          </div>
        </div>
                
        <div class="col-12">
          <div class="form-group">
            <label for="" class="json trans204" id="mensaje" ></label>
            <textarea class="form-control textarea" name="" id="txt-soporte-mensaje"></textarea>
          </div>
        </div>

        <div class="col-12">
          <a name="" id="btn-support" class="btn btn-primary btn-ver-support" role="button">
            <span class="json trans208" style="color: white"></span> <img loading="lazy" src="../imagen/Icono-enviar.png" alt="">
          </a>
          <label for="file" class="btn btn-primary btn-ver-support">
            <span class="json trans209" style="color: white"></span> <img loading="lazy" src="../imagen/Icono-de-adjuntar.png" alt="">
          </label>
          <input type="file" onchange="ShowImagePreview_producto(this)" name="" id="file" hidden accept="image/*">
        </div>
      </div>
      
      <div class="row row-edit-tickets">
        <div class="col-12 px-0 titulo-resume-ganancias mt-5 mb-2">
          <h2 class="json trans207"></h2>
        </div>
      </div>
      
      <div class="row editar-historial-support"> 
        <div class="col-12 px-0">
          <div id="listaSoporte">
            <!-- <div class="row row-edit-tickets-2">
              <div class="col-sm-7 imagen-1-support">
                <h6>12 03 2020</h6>
                <p>
                  Restablecer mi contraseña
                </p>
                <p class="my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, ipsum nec
                  rutrum
                  condimentum, lorem justo molestie velit, sit amet sodales sem quam id sem.</p>
                </div>
                <div class="col-sm-3">
                  
                  <a name="" id="" class="btn btn-primary btn-ver-support-view-more" role="button">
                    VER MÁS
                  </a>
                </div>
                
              </div> -->
              
            <!-- <div class="row row-edit-tickets-2">
              <div class="col-sm-7 imagen-1-support">
                <h6>12 03 2020</h6>
                <p>
                  Restablecer mi contraseña
                </p>
                <p class="my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, ipsum nec
                  rutrum
                  condimentum, lorem justo molestie velit, sit amet sodales sem quam id sem.</p>
                </div>
                <div class="col-sm-3">
                  
                  <a name="" id="" class="btn btn-primary btn-ver-support-view-more" role="button">
                    VER MÁS
                  </a>
                </div>
                
              </div> -->
              
            <!-- <div class="row row-edit-tickets-2">
              <div class="col-sm-7  imagen-1-support">
                <h6>12 03 2020</h6>
                <p>
                  Restablecer mi contraseña
                </p>
                <p class="my-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis, ipsum nec
                  rutrum
                  condimentum, lorem justo molestie velit, sit amet sodales sem quam id sem.</p>
                </div>
                <div class="col-sm-3">
                  
                  <a name="" id="" class="btn btn-primary btn-ver-support-view-more" role="button">
                    VER MÁS
                  </a>
                </div>
              </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
          
    <div class="animate__animated animate__fadeIn"></div>
      
    <script>
      // var user = JSON.parse(localStorage.getItem("dataUser"));
      // cargarJSONLogueado(user.idioma !== '' && user.idioma != null ? user.idioma : 'es');
    </script>
      
      
</body>
    
    <?php include '../include/footer.php'; ?>
    
    <!-- include general js -->
    <?php include '../include/include-js.php'; ?>
    
    <script src="../js/controllers/support.js"></script>
    
    <!-- modal alert -->
    <div class="moda-info-global modal fade" id="modal-presentAlert-Support" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
          <div class="modal-body">
            <div class="row">
              <div class="col-9">
                <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
              </div>
              <div class="col-3">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div class="row row-titleEntrega">
              <div class="col-12">
                <p class="modal-presentAlert-info-local-body">
                  <span class="trans227"></span>
                  <a class="to_login trans228"></a>
                  <span class="trans229"></span>
                </p>
                <div class="contn-entrega">
                  <button class="btnno modal-presentAlert-info-local-publicar" data-dismiss="modal" aria-label="Close">
                    <span class="spinner-border spinner-border-sm crear_empresa__btnpublicar__spinner" role="status" aria-hidden="true" style="display: none;"></span> <span class="trans191">Aceptar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal detalles de soporte-->
<div class="modal fade" id="detalles-soporte" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg detalles-support-modal-dialog" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-info-detalles">
                  <div class="col-12">
                    <h4 class="titulo_modal_confirmacion json trans210">Detalles de soporte</h4>
                  </div>
                  <div class="col-sm-6">
                    <p>
                      <b class="json trans205"> </b>
                      <span id="info-detalles-id"></span>
                    </p>
                  </div>
                  <div class="col-sm-6">
                    <p>
                      <b class="json trans206" ></b>
                      <span id="info-detalles-estado"></span>
                    </p>
                  </div>
                  <div class="col-sm-6">
                    <p class="json trans211_"></p>
                    <input class="form-control jsonP" key="ayuda2" id="info-detalles-titulo" type="text" disabled>
                  </div>
                  <div class="col-sm-6">
                    <p class="json trans204"></p>
                    <textarea class="form-control" rows="1" id="info-detalles-mensaje" disabled></textarea>
                  </div>
                  <div class="col-12">
                    <p class="trans274"></p>
                    <textarea class="form-control campo-respuesta trans275__ph" rows="4" placeholder="soporte" disabled></textarea>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>

    <!--modal detalles-->
    <!-- <div class="modal fade" id="detalles-transacciones-2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered detalles-support-modal-dialog" role="document">
      <div class="modal-content my-support-modal">
        <div class="modal-header header-peerswin header-compartir-avatar transacciones transacciones-2">
          <div align="left" style="width: 100%;">
            <img class="modal-img-tittle-mix" src="imagen/logo-completo-modal.png" alt="">
          </div>
          <button type="button" class="close compartir-tickets transacciones-cerrar aronegro-x " data-dismiss="modal"
          aria-label="Close">
          <span class="cerrar-mix" aria-hidden="true" style="color: black">&times;</span>
        </button>
      </div>
      <div class="modal-body body-compartir-avatar  editar-contenido transacciones">
        
        <div class="row mb-3">
          <div class="col-12 tittle-transacciones-tutoriales">
            <img src="imagen/infromacion-mix.png" alt="">
            <p class="json trans210"></p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 soporteacomodar">
            <p style="font-weight: normal;"><b class="json trans205"> </b> <span id="modal-detalle-trans-id"
              style="color:  #1464e1">6869</span></p>
              <p style="font-weight: normal;"><b class="json trans206" ></b> <span id="modal-detalle-trans-estado"
                style="color:  #1464e1">Cerrado</span></p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2 mb-3">
                <label for=""><b class="json trans211_"></b> </label>
              </div>
              <div class="col-md-8 mb-3">
                <input class="form-control editinputtransacciones jsonP" key="ayuda2" id="modal-detalle-trans-titulo" type="text" disabled
                value="Mi usuario no funciona correctamente">
              </div>
              <div class="w-100"></div>
              <div class="col-md-2 mb-3">
                <label for=""> <b class="json trans204" ></b> </label>
              </div>
              <div class="col-md-10 mb-3">
                <textarea class="form-control editinputtransacciones-textarea-1" id="modal-detalle-trans-mensaje"
                type="text" disabled>A continuación te presentamos la solución, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis magna ligula. Aenean nec leo ornare, iaculis mauris at, porta diam. Nunc pulvinar eleifend est. Vestibulum mollis eget tortor et cursus. Integer sit amet tincidunt diam. Praesent in laoreet urna, tincidunt convallis eros. ?????
              </textarea> </div>
              <div class="w-100"></div>
              <div class="col-md-2 mb-3 p2wsoportelogo">
                <img id="img-ayuda" src="imagen/p2wayuda.png" alt="">
              </div>
              <div class="col-md-10 soportelogodespues">
                <textarea class="form-control editinputtransacciones-textarea" id="modal-detalle-trans-respuesta"
                type="text" disabled>A continuación te presentamos la solución, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis magna ligula. Aenean nec leo ornare, iaculis mauris at, porta diam. Nunc pulvinar eleifend est. Vestibulum mollis eget tortor et cursus. Integer sit amet tincidunt diam. Praesent in laoreet urna, tincidunt convallis eros. ?????
              </textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
    
</html>