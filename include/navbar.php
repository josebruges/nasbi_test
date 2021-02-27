<div class="navbar__nologeado" style="display: none;">
    <div class="row header-volver">
        <div class="col-12">
            <!-- <p><span class="_trans258">Volver a:</span> <a href="http://peers2win.com"><img src="../imagen/Logo-peertowin-azul.png"> <span>P E E R S 2 W I N</span></a></p> -->
        </div>
    </div>

    <div class="row row-form-navbar">
        <div class="col-lg-2">
            <a onclick="loadPage('index.php')"><img src="../imagen/logo-navbar.svg" class="trans_299__src logo-form"></a>
        </div>
        <div class="col-lg-6">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text _trans240">Buscar en:</span>
                </div>
                <!-- <div class="dropdown divdropdownZona">
                    <select class="form-control btn drop-zona dropdown__departamentos" data-live-search="true"></select>
                </div> -->
                <input type="text" style="padding: 9px 12px;" class="form-control input__navbar__search _trans241__ph" placeholder="Escribe el producto que buscas |">
                <span class="input-group-addon input__navbar__search__btn"><i class="fas fa-search"></i></span>
            </div>
        </div>
        <div class="col-md-4">
            <div class="content-buttons">
                <div class="dropdown drop-crear-cuenta">
                    <button class="crear-cuenta dropdown-toggle _trans259" id="dropcuenta" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropcuenta">
                        <a class="dropdown-item red_registro_usuario" href="registro.php">
                            <img src="../imagen/personas.png"><span class="trans_134"></span>
                        </a>
                        <a class="dropdown-item red_registro_empresa" href="registro-empresa.php">
                            <img src="../imagen/empresa.png"><span class="_trans255"></span>
                        </a>
                    </div>
                </div>
                <button class="ingresar" data-toggle="modal" data-target="#modal-login"><span class="_trans260"></span> <span><img src="../imagen/Ingresar.png"></span></button>
                <select class="form-control select-idioma navbar__idioma">
                    <option value="ES">ES</option>
                    <option value="EN">EN</option>
                </select>
            </div>
        </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="index.php">
            <img src="../imagen/logo-navbar.svg" class="trans_299__src logo-brand">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarbid" aria-controls="navbarbid" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarbid">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <div class="row row-drop-responsive">
                        <div class="col-12 p-0">
                            <div class="input-group group-resposive">
                                <!-- <select class="form-control">
                                    <option>Atlántico</option>
                                    <option>Magdalena</option>
                                </select> -->
                                <!-- <select class="form-control  btn drop-zona dropdown__departamentos" data-live-search="true"></select> -->
                                <input type="text" class="form-control input__navbar__search _trans241__ph" placeholder="Escribe el producto que buscas">
                                <span class="input-group-addon input__navbar__search__btn"><i class="fas fa-search"></i></span>
                            </div>
                        </div>

                        <div class="col-6 pr-2 pl-0">
                            <div class="dropdown drop-crear-cuenta">
                                <button class="crear-cuenta dropdown-toggle _trans259" id="dropcuenta" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Crear cuenta
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropcuenta">
                                    <a class="dropdown-item red_registro_usuario" href="registro.php"><img src="../imagen/personas.png">
                                        <span class="trans_134">Personas</span>
                                    </a>
                                    <a class="dropdown-item red_registro_empresa" href="registro-empresa.php"><img src="../imagen/empresa.png">
                                        <span class="_trans255">Empresa</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="col-6 pl-2 pr-0">
                            <button class="ingresar" data-toggle="modal" data-target="#modal-login"><span class="_trans260">Ingresa</span> <span><img src="../imagen/Ingresar.png"></span></button>
                        </div>

                        <div class="col-6 pr-2 pl-0">
                            <select class="form-control categorias__navbar" data-live-search="true"></select>
                        </div>

                        <div class="col-6 pl-2 pr-0">
                            <div class="dropdown">
                                <button class="btn dropIdioma dropdown-toggle _trans261" type="button" id="idioma" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Idioma
                                </button>
                                <div class="dropdown-menu menu-idioma" aria-labelledby="idioma">
                                    <a class="dropdown-item to_change_idioma _trans262" name="ES">Español</a>
                                    <a class="dropdown-item to_change_idioma _trans263" name="EN">Ingles</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <!-- <li class="nav-item dropdown liLisDrop">
                    <a class="nav-link navdropSubass dropdown-toggle" href="#" id="DropSubas" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Categoria
                    </a>
                    <div class="dropdown-menu categorias__navbar" aria-labelledby="DropSubas">
                        <a class="dropdown-item" href="#">Categoria 1</a>
                        <a class="dropdown-item" href="#">Categoria 2</a>
                    </div>
                </li> -->
                <li class="nav-item nav-category">
                    <select class="form-control navdropSubass categorias__navbar" data-live-search="true"></select>
                </li>

                <li class="nav-item">
                    <a class="nav-link line-right link1 trans462_" href="nasbi-descuentos.php">Subastas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link line-right link2 _trans253" href="promociones.php">Promociones</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link line-right link3 _trans254" href="mas-vendidos.php">Lo más vendido</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link line-right link4 trans463_" href="empresas.php">Empresas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link link5 trans7" href="vender.php">Vender</a>
                </li>
            </ul>
            <li class="nav-item ml-auto">
                <a class="nav-link linkcarrito" href="carrito-compras.php"><span class="_trans256">Carrito de compra:</span> <img src="../imagen/Carrito.png" class="carrito"><span class="badge carrito__indicador__producto"></span></a>
            </li>
        </div>
    </nav>


    <ul class="ul-redes-fixed">
        <li><img class="nasbi_fb" src="../imagen/Facebook.png"></li>
        <li><img class="nasbi_ing" src="../imagen/Instagram.png"></li>
        <li><img class="nasbi_in" src="../imagen/Linkedin.png"></li>
    </ul>

    <!-- Modal Login-->
    <div class="modal fade" id="modal-login" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body p-lgn">
                    <div class="row">
                        <div class="col-9">
                            <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                        </div>
                        <div class="col-3">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>

                    <div class="row row-form">
                        <div class="col-12">
                            <h5 class="trans_12">Iniciar sesión</h5>
                            <p class="text-LGn trans_13">Ingresa hoy a un marketplace como nunca antes habias conocido.</p>

                            <p class="text-LGn trans_14">Compra, vende y subasta productos con múltiples medios de pago.</p>

                            <div class="div-inp-login">
                                <input type="text" class="form-control input-login nasbi__input__username trans_17__ph" placeholder="Username">
                            </div>

                            <div class="input-password-row div-inp-login">
                                <input type="password" class="form-control input-login nasbi__input__password trans_18__ph" placeholder="Contraseña">

                                <button type="button" class="btn btn-link input__eye__btn nasbi__input__eyes__on" value="btnOff">
                                    <i class="far fa-eye-slash"></i>
                                </button>

                                <button type="button" class="btn btn-link input__eye__btn nasbi__input__eyes__off" value="btnOn" style="display: none;">
                                    <i class="far fa-eye"></i>
                                </button>
                            </div>


                            <div class="container-button-modal">
                                <a class=" enlace_olvide_pass olvideclave_contrase_usuatrio trans421_">Usuario</a>
                                <a class=" enlace_olvide_pass olvideclave_contrase_empresa trans422_">Empresa</a>
                            </div>
                            <div class="captcha">
                                <div id="rcap" class="img-capcha"></div>
                            </div>
                            <div class="container-button-modal">
                                <button class="btn btn-default enviar nasbi__btn__login trans464_">Usuario</button>
                                <button class="btn btn-default enviar nasbi__btn__login_empresa trans465_">Empresa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal bienvenida promociones -->
    <div class="modal fade" id="bienvenida-promociones-home" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-9">
                            <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal" />
                        </div>
                        <div class="col-3">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>

                    <div class="row row-inf">
                        <h4 class="trans_19">Hola, hoy tenemos grandes productos <br>y promociones especialmente para ti</h4>
                        <p class="trans_20">Compra, vende y subasta los productos que más te gustan.</p>
                        <button class="trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                        <!-- <a href="promociones.php"><button class="trans_01">Aceptar</button></a> -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal codigo de confirmación registro -->
    <div class="modal fade" id="registro-codigo-confirmacion" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-9">
                            <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal" />
                        </div>
                        <div class="col-3">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>

                    <div class="row row-inf">
                        <h4 class="trans_19">Confirmación</h4>
                        <p class="trans_20">Enviamos un codigo de confirmación</p>
                        <button class="trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal recuperar contraseña usuario -->
    <div class="modal fade" id="modal-recuperar_contra" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body p-lgn">
                    <div class="row">
                        <div class="col-9">
                            <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                        </div>
                        <div class="col-3">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>

                    <div class="row row-form">
                        <div class="col-12">
                            <h5 class="trans421_"></h5>
                            <p class="text-LGn trans423_"></p>

                            <form id="usuario_recuperar_pass">
                                <h5 class="trans_25"></h5>
                                <input type="text" class="form-control input-login  correo_recuperar _trans121__ph">

                                <h5 class="trans424_"></h5>
                                <input type="text" class="form-control input-login correo_recuperar_confirm  _trans121__ph">
                            </form>

                            <div class="container-button-modal">
                                <button class="btn btn-default enviar cancelar_recuperar_con_user trans_02"></button>
                                <button class="btn btn-default enviar aceptar_recuperar_con_user trans_01"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal recuperar contraseña empresa -->
    <div class="modal fade" id="modal-recuperar_contra_empresa" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body p-lgn">
                    <div class="row">
                        <div class="col-9">
                            <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                        </div>
                        <div class="col-3">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>

                    <div class="row row-form">
                        <div class="col-12">
                            <h5 class="trans422_"></h5>
                            <p class="text-LGn trans423_"></p>

                            <form id="empresa_recuperar_pass">
                                <h5 class="trans_25"></h5>
                                <input type="text" class="form-control input-login  correo_recuperar_empresa _trans121__ph">

                                <h5 class="trans424_"></h5>
                                <input type="text" class="form-control input-login correo_recuperar_confirm_empresa  _trans121__ph">
                            </form>

                            <div class="container-button-modal">
                                <button class="btn btn-default enviar cancelar_recuperar_con_empresa trans_02"></button>
                                <button class="btn btn-default enviar aceptar_recuperar_con_empresa trans_01"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal validar registro empresa -->
    <div class="modal fade" id="validar-registro-empresa" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-9">
                            <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                        </div>
                        <div class="col-3">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>

                    <div class="row row-inf">
                        <div class="col-12">
                            <h4 class="trans_182"></h4>
                            <p class="trans_183"></p>
                            <p class="error-mnsj mnsj_error_codigo_validacion _trans867" style="color: #ff103d; display:none"></p>
                            <div class="content-input">
                                <input type="text" class="registro_empresa_codigo">
                                <button class="validar_codigo_registro m-auto ">
                                    <span class="trans_184"></span>
                                    <span class="spinner-border spinner-border-sm spiner_validar_codigo" style="display: none;" role="status" aria-hidden="true"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal bienvenida empresa validada -->
    <div class="modal fade" id="bienvenida-empresa-validada" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content content-modal">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-9">
                            <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal" />
                        </div>
                        <div class="col-3">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>

                    <div class="row row-inf">
                        <h4 class="trans165"></h4>
                        <p class="trans166"></p>
                        <button class="trans_01" data-dismiss="modal" aria-label="Close"></button>
                        <!-- <a href="promociones.php"><button class="trans_01">Aceptar</button></a> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Modal de si supero el limite 3 ventas en gratuita empresa -->
<div class="moda-info-global modal fade" id="limite_3_estado1_gratuita" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-titleEntrega">
                    <div class="col-12">
                        <h5 class="label-titulo">N A S B I</h5>

                        <p class="trans474_"></p>

                        <div class="contn-entrega">
                            <button class="btnno trans_01 modal-presentAlert-info-cancel" data-dismiss="modal" aria-label="Close">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>