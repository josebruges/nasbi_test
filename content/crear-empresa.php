<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="trans_217">Nasbi.com | Crear empresa</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php
    include '../include/include-css.php';
    include '../include/head-js.php';
    ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/crear-empresa.css">
</head>

<!-- Include Navbar cambio -->
<?php include '../include/manager-navbar.php'; ?>


<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row row-global my-5">
            <div class="col-12">
                <div class="cont-tittle">
                    <h4 class="trans_295">Crear tu tienda</h4>
                    <p class="trans_219">Ahora puedes personalizar tu tienda y subir tus productos</p>
                </div>
            </div>

            <div class="col-12 p-0">
                <div class="row row-form">
                    <div class="col-md-3 col-lg-2">
                        <div class="content-imgEm">
                            <label for="file-upload">
                                <img loading="lazy" src="../imagen/img-empresas/nasbi-logo-placeholder.png" class="imagen-Emp trans_244__src crear_empresa_logo" alt="nasbi.com">
                                <img loading="lazy" src="../imagen/img-empresas/simbolo-camara.png" class="icon-camara" alt="nasbi.com">
                            </label>
                            <input id="file-upload" type="file" accept="image/*" />
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-8">
                        <div class="row row-form-secund">
                            <div class="col-sm-4 px-2">
                                <input type="text" maxlength="250" class="form-control trans_231__ph crear_empresa__nombre_empresa" placeholder="Nombre de la tienda">
                            </div>
                            <div class="col-sm-4 px-2">
                                <input type="text" maxlength="250" class="form-control trans_232__ph crear_empresa__nombre" placeholder="Nombre de asesor">
                            </div>
                            <div class="col-sm-4 px-2 pr-md-0">
                                <input type="text" maxlength="250" class="form-control trans_233__ph crear_empresa__cargo" placeholder="Cargo">
                            </div>

                            <div class="col-12 px-2 pr-md-0">
                                <textarea rows="5" maxlength="900" class="form-control trans_234__ph crear_empresa__descripcion" placeholder="Comienza aquí"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-lg-2">
                        <div class="content-imgEm">
                            <label for="file-upload-asesor">
                                <img loading="lazy" src="../imagen/img-empresas/user-placeholder.png" class="imagen-Emp trans_287__src crear_empresa_avatar_asesor" alt="nasbi.com">
                                <img loading="lazy" src="../imagen/img-empresas/simbolo-camara.png" class="icon-camara" alt="nasbi.com">
                            </label>
                            <input id="file-upload-asesor" type="file" accept="image/*" />
                        </div>
                    </div>


                    <div class="col-12">
                        <div class="content-flex">
                            <div class="sub-content">
                                <h6><span class="trans_235">Características que puede <br>ofrecer tu tienda</span> <br><span class="sub-content-p trans_274">(Próximamente disponible)</span></h6>
                            </div>
                            <!-- <div class="sub-content">
                                <div class="card-select">
                                    <input type="checkbox" name="crear_empresa__caracteristica_principal_1" class="crear_empresa__caracteristica_principal_1" value="1" disabled="true">
                                    <img loading="lazy" src="../imagen/logo-cripto.png" alt="nasbi.com">
                                    <button class="btn1 trans_236">PAGA EN <br>CRYPTOS</button>
                                </div>
                            </div> -->
                            <div class="sub-content">
                                <div class="card-select">
                                    <input type="checkbox" name="crear_empresa__caracteristica_principal_2" class="crear_empresa__caracteristica_principal_2" value="2" disabled="true">
                                    <img loading="lazy" src="../imagen/garantia.png" alt="nasbi.com">
                                    <button class="btn2 trans_237">GARANTÍA <br>1 AÑO</button>
                                </div>
                            </div>
                            <div class="sub-content">
                                <div class="card-select">
                                    <input type="checkbox" name="crear_empresa__caracteristica_principal_3" class="crear_empresa__caracteristica_principal_3" value="3" disabled="true">
                                    <img loading="lazy" src="../imagen/envi-gratis.png" alt="nasbi.com">
                                    <button class="btn3 trans_238">ENVÍO <br>GRATIS</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="content-imgPortada content-destacado">
                            <label for="file-banner"></label>
                            <input id="file-banner" type="file" accept="image/*" />
                            <img loading="lazy" src="../imagen/img-empresas/simbolo-camara.png" class="icon-camara-portada" alt="nasbi.com">
                        </div>
                    </div>


                    <div class="col-12">
                        <!-- <button class="btn-fila trans_241">Crear nueva fila +</button> -->
                        <br><br>

                        <div class="content-Btns">
                            <button class="btn01 trans_242 crear_empresa__btnprevisualizar">Previsualizar</button>

                            <button class="btn02 crear_empresa__btnpublicar">
                                <span class="spinner-border spinner-border-sm crear_empresa__btnpublicar__spinner" role="status" aria-hidden="true" style="display: none;"></span> <span class="trans_243">Publicar</span>
                            </button>
                        </div>
                    </div>

                    <div class="col-12 cont-tittle">
                        <br><br><br>
                        <p class="crear_empresa__content__general__products__title"></p>
                    </div>
                    <div class="crear_empresa__content__general__products" style="display: none;">
                        <div class="col-12 row row-prodcuts crear_empresa__productos__list" style="display: none;">
                            <div class="col-sm-6 col-md-3 crear_empresa__newproduct">
                                <a href="crear_empresa__newproduct">
                                    <div class="content-destacado">
                                        <label for="file-detacado">
                                            <img loading="lazy" src="../imagen/img-empresas/destacado-en.png" class="imagen-destacado trans_245__src crear_empresa__product" id="1" alt="nasbi.com">
                                        </label>
                                    </div>
                                </a>
                            </div>
                            <div class="col-sm-6 col-md-3 crear_empresa__newproduct">
                                <div class="content-destacado">
                                    <label for="file-detacado">
                                        <img loading="lazy" src="../imagen/img-empresas/destacado-en.png" class="imagen-destacado trans_245__src crear_empresa__product" id="2" alt="nasbi.com">
                                    </label>

                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3 crear_empresa__newproduct">
                                <div class="content-destacado">
                                    <label for="file-detacado">
                                        <img loading="lazy" src="../imagen/img-empresas/destacado-en.png" class="imagen-destacado trans_245__src crear_empresa__product" id="3" alt="nasbi.com">
                                    </label>

                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3 crear_empresa__newproduct">
                                <div class="content-destacado">
                                    <label for="file-detacado">
                                        <img loading="lazy" src="../imagen/img-empresas/destacado-en.png" class="imagen-destacado trans_245__src crear_empresa__product" id="4" alt="nasbi.com">

                                    </label>

                                </div>
                            </div>
                        </div>

                        <div class="col-12 row row-prodcuts-edit crear_empresa__productos__list__nodata" style="display: none;">
                            <div class="col-sm-6 col-md-3 crear_empresa__newproduct">
                                <div class="content-destacado">
                                    <label for="file-detacado">
                                        <img loading="lazy" src="../imagen/img-empresas/destacado-en.png" class="imagen-destacado trans_245__src crear_empresa__product" id="1" alt="nasbi.com">
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3 crear_empresa__newproduct">
                                <div class="content-destacado">
                                    <label for="file-detacado">
                                        <img loading="lazy" src="../imagen/img-empresas/destacado-en.png" class="imagen-destacado trans_245__src crear_empresa__product" id="1" alt="nasbi.com">
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3 crear_empresa__newproduct">
                                <div class="content-destacado">
                                    <label for="file-detacado">
                                        <img loading="lazy" src="../imagen/img-empresas/destacado-en.png" class="imagen-destacado trans_245__src crear_empresa__product" id="1" alt="nasbi.com">
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3 crear_empresa__newproduct">
                                <div class="content-destacado">
                                    <label for="file-detacado">
                                        <img loading="lazy" src="../imagen/img-empresas/destacado-en.png" class="imagen-destacado trans_245__src crear_empresa__product" id="1" alt="nasbi.com">
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br><br>
    </div>

    <!-- Modales -->
    <div class="modal fade" id="modal-tienda-publicada" tabindex="1" role="dialog" aria-hidden="true">
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
                        <div class="col-12" style="text-align: center;">
                            <h5 class="trans_252"><strong>¡Felicidades!</strong></h5>

                            <p class="trans_294">Has publicado tu tienda con éxito</p>

                            <div class="contn-entrega-tienda">
                                <!-- <button class="btnsi trans_02" data-dismiss="modal" aria-label="Close">Cancelar</button> -->

                                <button class="btnno trans_254 modal-tienda-publicada-vertienda" data-dismiss="modal" aria-label="Close">VER MI TIENDA</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal-tienda-publicada-v2" tabindex="1" role="dialog" aria-hidden="true">
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
                        <div class="col-12" style="text-align: center;">
                            <h5 class="trans_252"><strong>¡Felicidades!</strong></h5>

                            <p class="trans_253">Has guardado tu tienda con éxito. <br><small>Nota: Recuerda que los datos de tu empresa deben ser validados para que puedas publicar tus productos en el marketplace. Si tu empresa ya fue validada has caso omiso a este mensaje</small></p>

                            <div class="contn-entrega-tienda">
                                <button class="btnno trans_254 modal-tienda-publicada-vertienda-2" data-dismiss="modal" aria-label="Close">VER MI TIENDA</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Present Alert : deprecado-->
    <div class="moda-info-global modal fade" id="modal-presentAlert-info-local" tabindex="-1" role="dialog" aria-hidden="true">
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
                            <h5 class="label-titulo modal-presentAlert-info-local-title trans_270">Previsualizar mi tienda</h5>

                            <p class="modal-presentAlert-info-local-body trans_269">Si realizaste algún cambio te recomendamos siempre <strong>GUARDAR</strong> antes de previsualizar tus datos para no correr el riesgo de que la información se pierda.</p>

                            <div class="contn-entrega">
                                <button class="btnsi trans_02 modal-presentAlert-info-local-cancel" data-dismiss="modal" aria-label="Close">Cancelar</button>

                                <button class="btnno modal-presentAlert-info-local-publicar" data-dismiss="modal" aria-label="Close">
                                    <span class="spinner-border spinner-border-sm crear_empresa__btnpublicar__spinner" role="status" aria-hidden="true" style="display: none;"></span> <span class="trans_272">Publicar y seguir</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Confirmar salir de la page -->
    <div class="modal fade" id="modal-crear-empresa-confirm-exit" tabindex="1" role="dialog" aria-hidden="true">
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
                        <div class="col-12" style="text-align: center;">
                            <h5 class="trans_145"><strong>Información</strong></h5>

                            <p class="trans_269">Si realizaste algún cambio te recomendamos siempre <strong>GUARDAR</strong> antes de previsualizar tus datos para no correr el riesgo de que la información se pierda.</p>

                            <div class="contn-entrega-tienda">
                                <button class="btnsi trans_02" data-dismiss="modal" aria-label="Close">Cancelar</button>

                                <button class="btnno trans_01 modal-crear-empresa-confirm-exit-btn" data-dismiss="modal" aria-label="Close">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="modal-crear-empresa-cargar-producto" tabindex="1" role="dialog" aria-hidden="true">
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
                        <div class="col-12" style="text-align: center;">
                            <h4 class="cont-tittle-2 _trans922">Agregar productos a tu tienda</h4>
                            <div class="content-Btns-2">
                                <button class="btn01">
                                    <span class="trans_275">PUBLICAR MASIVAMENTE</span>
                                    <br>
                                    <span class="trans_274">(Próximamente disponible)</span>
                                </button>

                                <button class="btn02 crear_empresa__btnpublicar">
                                    <a href="vender.php" class="btnnormal">
                                        <span class="trans_276">PUBLICAR DE FORMA INDIVIDUAL</span>
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>

<script src="../js/controllers/empresa/crear-empresa-new.js"></script>

</html>