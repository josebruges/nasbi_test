    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title class="_trans512">Nasbi.com | Editar empresa</title>
        <link rel="icon" href="../imagen/Logo-Blanco.png">
        <!-- Include General Css -->
        <?php include '../include/include-css.php'; ?>
        <?php include '../include/analitic-web-script.php'; ?>
        <!--si va hacer include de head-js.php quite este include porque ese ya esta alla-->
        <!-- link css -->
        <link rel="stylesheet" href="../css/editar-empresa.css">
    </head>

    <!-- Include Navbar -->
    <?php include '../include/navbar-logueado.php'; ?>
    <?php include '../include/navbars-modales-globales.php'; ?>

    <body>
        <?php include '../include/body_general.php'; ?>
        <div align="center">
            <div class="row row-content">
                <div class="col-md-7 mb-4">
                    <h3 class="_trans117 mb-4">Configuraciones</h3>
                    <h5 class="_trans856">Datos de la empresa</h5>
                </div>
                <div class="col-md-5">
                    <button class="button-registrar disabled_empresa _trans886 " role="button">Desactivar</button>
                </div>

                <div class="row rowGray">
                    <div class="col-sm-6 col-md-6 px-2 mb-3">
                        <p class="label-form _trans17">Numero de Identificacion Tributaria:</p>
                        <input type="text" maxlength="11" class="form-control editar__empresa__nit _trans185__ph" placeholder="NIT">
                    </div>
                    <div class="col-sm-6 col-md-6 px-2 mb-3">
                        <p class="label-form _trans16">Nombre de la Empresa:</p>
                        <input type="text" maxlength="255" class="form-control editar__empresa__razon_social _trans184__ph" placeholder="Nombre de la Empresa">
                    </div>

                    <div class="col-sm-6 col-md-6 px-2">
                        <p class="label-form trans_25">Correo electronico</p>
                        <input type="email" class="form-control editar__empresa__correo _trans121__ph" readonly>
                    </div>
                    <div class="col-sm-6 col-md-6 px-2 content-button">
                        <button class="btnsopcs btn-cambiar-contrasena _trans77 " role="button">CAMBIAR CONTRASEÑA</button>
                    </div>


                </div>

                <!-- <div class="col-sm-6 col-md-4">
                    <p class="label-form _trans110">Activar notificaciones</p>
                    <label class="switch">
                        <input type="checkbox" id="doblefactorcheck">
                        <div class="slider round">
                        </div>
                    </label>
                </div> -->

                <div class="row row-secnd">
                    <div class="col-12 px-2 px-2">
                        <p class="info-text _trans857">Información de la Empresa</p>
                    </div>
                    <div class="col-12 px-2 mb-3 px-2">
                        <h5 class="_trans13">Información de la Empresa</h5>
                    </div>
                    <div class="col-sm-6 col-md-6 px-2">
                        <p class="label-form _trans890">Dirección:</p>
                        <input type="text" maxlength="255" class="form-control editar__empresa__dir _trans450__ph" placeholder="Direccion">
                        </select>
                    </div>
                    <div class="col-sm-6 col-md-6 px-2">
                        <p class="label-form _trans427">Página web:</p>
                        <input type="text" maxlength="255" class="form-control editar__empresa__web _trans426__ph" placeholder="Pagina web">
                        </select>
                    </div>
                    <div class="col-sm-6 col-md-6 px-2">
                        <p class="label-form _trans430">Referido (Opcional):</p>
                        <input type="text" class="form-control editar__empresa__referido _trans431__ph" placeholder="Referido" readonly="">
                    </div>
                    <div class="col-sm-6 col-md-6 px-2">
                        <p class="label-form _trans261">Idioma</p>
                        <select class="form-control editar__idioma">
                            <option value="ES">ES</option>
                            <option value="EN">EN</option>
                        </select>
                    </div>

                    <div class="col-sm-6 col-md-4 px-2">
                        <input type="text" maxlength="255" class="form-control editar_empresa__pais " readonly>

                        <!-- <select class="form-control editar_empresa__pais" id=""></select> -->
                    </div>
                    <div class="col-sm-6 col-md-4 px-2">
                        <select class="form-control editar_empresa__tipo_empresa" id=""></select>
                    </div>
                    <div class="col-sm-6 col-md-4 px-2">
                        <!-- <p class="label-form _trans840">Telefono:</p> -->
                        <input type="text" maxlength="255" class="form-control editar__empresa__telefono _trans841__ph ">
                    </div>
                    <!-- <div class="col-sm-6 col-md-4 p-2">

                        <div class="contenedor-logo">
                            <label class="imagen-logo" for="file-upload">
                                <img loading="lazy" src="../imagen/vacio-vender.png" class="crear_empresa_logo" alt="nasbi.com">
                            </label>
                            <input id="file-upload" class="file-logo" type="file" accept="image/*" />
                        </div>
                        <p class="label-form  ">Foto del documento</p>
                    </div> -->



                    <div class="col-12 cont-btn-empresa">

                        <button class="button-registrar editar__empresa_btnEnviar">
                            <span class="btn_editar_empresa _trans111">Registrar Empresa</span>
                            <div class="spinner-border spiner_loading spinner-border-sm" role="status" style="display: none;">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </button>
                        <button class="button-registrar trans_285 editar__empresa_btnPersonalizar" style="display: none;">
                            Personalizar mi tienda
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </body>


    <div align="center">
        <!-- Modal Ciudad -->
        <div class="modal fade" id="modal-ciudad" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content content-modal">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-9">
                                <img src="../imagen/logo-modal.png" loading="lazy" class="logo-modal" alt="nasbi.com">
                            </div>
                            <div class="col-3">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <img src="https://i.blogs.es/b4dd5c/maps/1366_2000.png" class="img-mapa">
                                <button class="btn-acep-mdl" data-dismiss="modal" aria-label="Close">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Finalizacion primera vez-->
        <div class="modal fade" id="edicion-exitosa" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content content-modal">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-9">
                                <img loading="lazy" alt="logo-modal - nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                            </div>
                            <div class="col-3">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>

                        <div class="row agregado-carrito">
                            <div class="col-12">
                                <h4 class="_trans27">¡Felicidades!</h4>

                                <p class="_trans28 edicion-exitosa-body">Haz completado tu registro de manera exitosa, ahora podrás personalizar tu tienda para vender tus productos en el mercado</p>

                                <!-- <a href="index.php">
                                    <button class="btn-acep-mdl trans_01">Aceptar</button>
                                </a> -->
                                <a href="crear-empresa.php">
                                    <button class="btn-acep-mdl _trans843">Ir a Mi Tienda</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="edicion-exitosa-normal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content content-modal">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-9">
                                <img loading="lazy" alt="logo-modal - nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                            </div>
                            <div class="col-3">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>

                        <div class="row agregado-carrito">
                            <div class="col-12">
                                <h4 class="_trans27">¡Felicidades!</h4>
                                <p class="trans_277 edicion-exitosa-normal-body">Los datos de tu empresa han sido actualizados. ¿Quieres ir a personalizar tu tienda?</p>

                                <button class="btncomrar _trans112" data-dismiss="modal">Cerrar</button>
                                <a href="crear-empresa.php"><button class="btn-acep-mdl _trans843">Ir a Mi Tienda</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <!-- Modal Cambiar contraseña-->
        <div class="modal fade" id="modal-cambiar-contrasena" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content content-modal">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-9">
                                <img src="../imagen/logo-modal.png" class="logo-modal" alt="nasbi.com" loading="lazy">
                            </div>
                            <div class="col-3">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                        <div class="row row-form1 row-clavess px-0">
                            <div class="col-lg-4 px-2">
                                <div class="contra-actual">
                                    <p class="_trans200">Ingresa tu Contraseña</p>
                                    <div class="input-group group-claves">
                                        <input type="password" class=" form-control actual-contrasena">
                                        <div class="input-group-prepend">
                                            <button type="button" class="btn btn-link  btn_eye_actuEmp" value="btnOff">
                                                <i class="icono_eye far fa-eye-slash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 px-2">
                                <div class="contra-actual">
                                    <p class="_trans201">Nueva Contraseña</p>
                                    <div class="input-group group-claves">
                                        <input type="password" class=" form-control nueva-contrasena">
                                        <div class="input-group-prepend">
                                            <button type="button" class="btn btn-link  btn_eye_nuevaEmp" value="btnOff">
                                                <i class="icono_eye far fa-eye-slash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 px-2">
                                <div class="contra-actual">
                                    <p class="_trans202">Confirma Contraseña</p>
                                    <div class="input-group group-claves">
                                        <input type="password" class=" form-control confir-contrasena">
                                        <div class="input-group-prepend">
                                            <button type="button" class="btn btn-link  btn_eye_confirEmp" value="btnOff">
                                                <i class="icono_eye far fa-eye-slash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row row-form1 __alldirecciones"> -->
                        <div class="contant-button02">
                            <button class="btncomrar _trans112" data-dismiss="modal">Cerrar</button>
                            <button class="cambiar_contrasena "><span class="trans118_">Confirmar</span><span class="spinner-border spinner-border-sm spiner_cambiar_contra" style="display: none;" role="status" aria-hidden="true"></span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal DESACTIVAR CUENTA EMPRESA-->
        <div class="modal fade" id="modal-desactivar-empresa" tabindex="-1" role="dialog" aria-hidden="true">
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

                        <div class="row row-infMdal">
                            <div class="col-12">

                                <h4 class="_trans886">Desactivar cuenta</h4>
                                <p class="_trans887"></p>
                                <p class="_trans893">Ingresa tu contraseña</p>
                                <div class="input-group groupdesactivar group-claves">
                                    <input type="password" class="form-control desact_pass">
                                    <div class="input-group-prepend">
                                        <button type="button" class="btn btn-link  btn_eye_desactEmp" value="btnOff">
                                            <i class="icono_eye far fa-eye-slash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="contn-entrega">
                                    <button class="btnsi trans_02" data-dismiss="modal" aria-label="Close">Cancelar</button>
                                    <button class="btnsi trans_01 btn_desactivar_empresa">Aceptar</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal Alertas Generales -->
        <div class="modal fade" id="modal-alertas-generales" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content content-modal">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-9">
                                <img loading="lazy" alt="logo-modal - nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                            </div>
                            <div class="col-3">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>

                        <div class="row agregado-carrito">
                            <div class="col-12">
                                <h4 class="alerta_titulo"></h4>
                                <p class="alerta_texto"></p>
                                <button class="btn-acep-mdl trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <?php include '../include/footer.php'; ?>
    <!-- include general js -->
    <?php include '../include/include-js.php'; ?>
    <script src="../js/controllers/editar-empresa.js"></script>

    </html>