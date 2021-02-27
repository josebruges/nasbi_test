<div class="navbar__logeado" style="display: none;">
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
            <div class="dropdown dropdown-user">
                <button class="dropdown-toggle button-drop-user" id="drop-user" data-toggle="dropdown">
                    <p class="nombre-usuario-nav menu_auth__username">Usuario</p>
                    <span><img src="../imagen/crear-cuenta.png" class="img-user menu_auth__avatar"></span>
                </button>
                <div class="dropdown-menu" aria-labelledby="drop-user">
                    <div class="row row-menu-drop">
                        <div class="col-md-6">
                            <div class="containe-nivel">
                                <p class="menu_auth__points__percentage">P.D</p>
                                <img src="../imagen/progres-nivel.png">
                            </div>

                            <p class="text-inf1 menu_auth__clasificacion__content" style="display: none;">
                                <span class="trans_189">Eres nivel</span>
                                <b class="menu_auth__points__classification">Oro</b>
                                <span class="trans_193">con</span><br> <span class="menu_auth__points__number"></span> <span class="trans_194">puntos</span>
                            </p>

                            <p class="text-inf1 menu_auth__clasificacion__content__nodata trans_195" style="display: none;"></p>

                            <!-- <a class="menu__opt__configuracion" href="mis-cuentas.php?tokenPageView=id-configuracion"> -->
                            <button class="btn-ver-cuenta menu__opt__configuracion _trans242">ver mi cuenta</button>
                            <!-- </a> -->

                        </div>
                        <div class="col-md-6">
                            <ul class="ul-user menu__user">
                                <a class="to_mis_cuentas_menu_user">
                                    <li class="_trans243">Mi cuentas</li>
                                </a>

                                <a class="to_mis_compras_menu_user">
                                    <li class="_trans244">Mis compras</li>
                                </a>

                                <a class="to_mis_ventas_menu_user">
                                    <li class="_trans245">Mis ventas</li>
                                </a>


                                <a href="mis-nasbi-descuentos.php" class="menu_user__subastas">
                                    <li class="trans68_">Mis subastas</li>
                                </a>
                                <a href="referir-negocio.php" class="menu__user__referir__negocio " style="display: none;">
                                    <li class="_trans918">Mi código de feferidos</li>
                                </a>
                                <a href="resumen-negocio.php" class="menu__user__resumen__negocio" style="display: none;">
                                    <li class="trans249_">Resumen mensual</li>
                                </a>
                                <a href="e-wallet.php">
                                    <li class="_trans246">E-Wallet</li>
                                </a>
                                <a href="tickets.php">
                                    <li class="_trans247">Tickets</li>
                                </a>
                                <a href="historial.php">
                                    <li class="_trans248">Búsquedas</li>
                                </a>
                                <a href="favoritos.php">
                                    <li class="_trans249">Favoritos</li>
                                </a>
                                <a class="menu__opt__configuracion">
                                    <li class="_trans250">Mis datos</li>
                                </a>
                                <!-- <a class="menu__opt__configuracion" href="mis-cuentas.php?tokenPageView=id-configuracion">
                                    <li class="_trans251">Seguridad</li>
                                </a> -->
                                <a class="navbar__exit">
                                    <li class="_trans252">Salir</li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
                <p class="icon-notificacione" data-toggle="modal" data-target="#modal-notificaciones"><i class="fas fa-bell cantidad_notificaciones2__"></i> <span class=" cantidad_notificaciones__ badge">0</span></p>
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
                        <div class="col-12">
                            <!-- <div class="input-group group-resposive">
                                <select class="form-control btn drop-zona dropdown__departamentos" data-live-search="true"></select>
                                <input type="text" class="form-control input__navbar__search" placeholder="Escribe el producto que buscas">
                                <span class="input-group-addon input__navbar__search__btn"><i class="fas fa-search"></i></span>
                            </div> -->
                        </div>
                        <div class="col-12">

                            <!-- <div class="dropdown">
                                <button class="btn dropCat dropdown-toggle" type="button" id="categoriaResponsive" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Categoria
                                </button>

                                <div class="dropdown-menu menu-dpto categorias__navbar" aria-labelledby="categoriaResponsive">
                                    <a class="dropdown-item" href="#">Categoria 1</a>
                                    <a class="dropdown-item" href="#">Categoria 2</a>
                                </div>
                            </div> -->
                            <select class="form-control categorias__navbar" data-live-search="true"></select>
                        </div>
                    </div>
                </li>

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
                <li class="nav-item li-user-responsive">
                    <a class="nav-link link5" data-toggle="modal" data-target="#modal-notificaciones">
                        <p class="icon-notificacione">Notificaciones <i class="fas fa-bell cantidad_notificaciones2__"></i> <span class="badge cantidad_notificaciones__">0</span></p>
                    </a>
                </li>
            </ul>
            <li class="nav-item ml-auto">
                <a class="nav-link linkcarrito" href="carrito-compras.php"><span class="_trans256">Carrito de compra:</span> <img src="../imagen/Carrito.png" class="carrito"><span class="badge carrito__indicador__producto"></span></a>
            </li>
            <li class="nav-item dropdown li-user-responsive">
                <a class="nav-link dropdown-toggle" id="responsive-user" role="button" data-toggle="dropdown">
                    <span class="menu_auth__username">Usuario</span> <span><img src="../imagen/crear-cuenta-azul.png" class="img-user menu_auth__avatar"></span>
                </a>
                <div class="dropdown-menu menu__user__resp" aria-labelledby="responsive-user">
                    <a class="dropdown-item _trans243" href="mis-cuentas.php">Mi cuentas</a>
                    <a class="dropdown-item _trans244 to_mis_compras_menu_user">Mis compras</a>
                    <a class="dropdown-item _trans245 to_mis_ventas_menu_user">Mis ventas</a>
                    <a class="dropdown-item trans68_ menu_user__subastas" href="mis-nasbi-descuentos.php">Mis subastas</a>

                    <a class="dropdown-item trans_171 menu__user__referir__negocio" href="referir-negocio.php" style="display: none;">Mi código de referido</a>
                    <a class="dropdown-item trans249_ menu__user__resumen__negocio" href="resumen-negocio.php" style="display: none;">Resumen mensual</a>

                    <a class="dropdown-item _trans246" href="e-wallet.php">E-Wallet</a>
                    <a class="dropdown-item trans32" href="tickets.php">Tickets</a>
                    <a class="dropdown-item _trans248" href="historial.php">Búsquedas</a>
                    <a class="dropdown-item _trans249" href="favoritos.php">Favoritos</a>
                    <a class="dropdown-item _trans250 menu__opt__configuracion">Mis datos</a>
                    <!-- <a class="dropdown-item _trans251 menu__opt__configuracion" href="mis-cuentas.php?tokenPageView=id-configuracion">Seguridad</a> -->
                    <a class="dropdown-item navbar__exit _trans252">Salir</a>
                </div>
            </li>
        </div>
    </nav>


    <ul class="ul-redes-fixed">
        <li><img class="nasbi_fb" src="../imagen/Facebook.png"></li>
        <li><img class="nasbi_ing" src="../imagen/Instagram.png"></li>
        <li><img class="nasbi_in" src="../imagen/Linkedin.png"></li>
    </ul>

    <!-- Modal notificaciones -->
    <div class="modal fade" id="modal-notificaciones" tabindex="-1" role="dialog" aria-hidden="true">
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

                    <div class="row pb-3">
                        <div class="col-12">
                            <h5 class="label-notifc _trans257">Notificaciones</h5>
                        </div>
                        <div class="col-12 col12-Noti todas_las_notificaciones____">
                            <!-- <div class="row row-notificacion">
                                <div class="col-md-3 col-lg-2 p-0">
                                    <img src="../imagen/Logo-Blanco.png">
                                </div>
                                <div class="col-md-9 col-lg-8 p-0">
                                    <p>Recuerda subir fotografías claras y visibles del rostro, documento de identidad y firma. Las fotos no deben ser de personas externas, evita inconvenientes y ser bloqueado de la plataforma Bid By Token.</p>
                                </div>
                                <div class="col-md-12 col-lg-2">
                                    <p class="fecha"><b>30-03-2020</b></p>
                                </div>
                            </div> -->
                            <!-- <div class="row row-notificacion">
                                <div class="col-md-3 col-lg-2 p-0">
                                    <img src="../imagen/Logo-Blanco.png">
                                </div>
                                <div class="col-md-9 col-lg-8 p-0">
                                    <p>Recuerda subir fotografías claras y visibles del rostro, documento de identidad y firma. Las fotos no deben ser de personas externas, evita inconvenientes y ser bloqueado de la plataforma Bid By Token.</p>
                                </div>
                                <div class="col-md-12 col-lg-2">
                                    <p class="fecha"><b>30-03-2020</b></p>
                                </div>
                            </div>
                            <div class="row row-notificacion">
                                <div class="col-md-3 col-lg-2 p-0">
                                    <img src="../imagen/Logo-Blanco.png">
                                </div>
                                <div class="col-md-9 col-lg-8 p-0">
                                    <p>Recuerda subir fotografías claras y visibles del rostro, documento de identidad y firma. Las fotos no deben ser de personas externas, evita inconvenientes y ser bloqueado de la plataforma Bid By Token.</p>
                                </div>
                                <div class="col-md-12 col-lg-2">
                                    <p class="fecha"><b>30-03-2020</b></p>
                                </div>
                            </div>
                            <div class="row row-notificacion">
                                <div class="col-md-3 col-lg-2 p-0">
                                    <img src="../imagen/Logo-Blanco.png">
                                </div>
                                <div class="col-md-9 col-lg-8 p-0">
                                    <p>Recuerda subir fotografías claras y visibles del rostro, documento de identidad y firma. Las fotos no deben ser de personas externas, evita inconvenientes y ser bloqueado de la plataforma Bid By Token.</p>
                                </div>
                                <div class="col-md-12 col-lg-2">
                                    <p class="fecha"><b>30-03-2020</b></p>
                                </div>
                            </div> -->
                        </div>
                        <div align="center" class="col-12 no_data_notificaciones___">
                            <img loading="lazy" src="../imagen/404.svg" alt="nasbi.com">
                            <p class="label-subtitle_nodata trans231_"></p>
                            <label class="trans_45"></label>
                        </div>
                    </div>

                    <div align="center" class="pagination_notificacion____"></div>
                </div>
            </div>
        </div>
    </div>

</div>