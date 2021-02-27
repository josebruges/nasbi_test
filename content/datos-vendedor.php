<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="_trans510">Nasbi.com | Datos vendedor</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php
    include '../include/include-css.php';

    include '../include/head-js.php';
    ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/datos-vendedor.css">
</head>

<!-- Include Navbar : para todas las pantallas-->
<?php
include '../include/manager-navbar.php';
?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <!-- info user -->
        <div class=" row-name">
            <div class="container-user">
                <h2>
                    <img src="../imagen/avatar.png" class="img-user-vendedor img_vendedor">
                    <span class="nombre nombre-usuario">Nombre Usuario</span>
                    <span class="label-ubi label_tittle_ubicacion trans_58">Ubicación:</span>
                    <span class="ciudad ciudad_vendedor">Santa Marta, Magdalena</span>
                </h2>
            </div>
        </div>

        <!-- insignias -->
        <div class="row row-insignias">
            <div class="col-md-6">
                <p class="calif-vendedor brinda_atencion">
                    <i class="fas fa-star orange"></i>
                    <i class="fas fa-star orange"></i>
                    <i class="fas fa-star orange"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span><img src="../imagen/insignias/atencion.png"></span>
                    <span class="text-insig">Brinda buena atención</span>
                </p>
            </div>
            <div class="col-md-6">
                <p class="calif-vendedor satisfaccion_producto">
                    <i class="fas fa-star orange"></i>
                    <i class="fas fa-star orange"></i>
                    <i class="fas fa-star orange"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span><img src="../imagen/insignias/satisfaccion.png"></span>
                    <span class="text-insig">Satisfacción de producto</span>
                </p>
            </div>

            <div class="col-md-6">
                <p class="calif-vendedor tiempo_entrega">
                    <i class="fas fa-star orange"></i>
                    <i class="fas fa-star orange"></i>
                    <i class="fas fa-star orange"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span><img src="../imagen/insignias/tiempo.png"></span>
                    <span class="text-insig">Tiempo de entrega</span>
                </p>
            </div>
            <div class="col-md-6">
                <p class="calif-vendedor fidelidad_producto">
                    <i class="fas fa-star orange"></i>
                    <i class="fas fa-star orange"></i>
                    <i class="fas fa-star orange"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span><img src="../imagen/insignias/fidelidad.png"></span>
                    <span class="text-insig">Fidelidad de productos</span>
                </p>
            </div>
        </div>

        <!-- cantidad coentarios -->
        <div class="row cantidad-comentarios">
            <div class="col-6 col-md-3">
                <p><span class="comentarios numbrs">324</span> <span class="_trans159"></span></p>
            </div>
            <div class="col-6 col-md-3">
                <p><span class="buenos numbrs">280</span> <span class="_trans160"></span></p>
            </div>
            <div class="col-6 col-md-3">
                <p><span class="regulares numbrs">42</span> <span class="_trans161"></span></p>
            </div>
            <div class="col-6 col-md-3">
                <p><span class="malos numbrs">2</span> <span class="_trans162"></span></p>
            </div>
        </div>

        <!-- listado comentarios -->
        <div class="row list-comentarios">
            <div class="col-lg-8">
                <div class="row row-filter">
                    <div class="col-md-8">
                        <h5 class="label-copmentario _trans155">Comentarios de compradores</h5>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group group-filtro">
                            <div class="input-group-prepend">
                                <span class="input-group-text _trans156">Periodo:</span>
                            </div>
                            <div class=" divdropdownfiltro ">
                                <select class="filtro_meses">
                                    <option class="_trans164" value="1">1 Mes</option>
                                    <option class="_trans165" value="6">6 Meses</option>
                                    <option class="_trans166" value="12">12 Meses</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="scroll-comentarios">
                    <div class=" row content__nodata" style="display: none;">
                        <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                        <p class="label-title_nodata _trans163 ">No tienes comentarios.</p>

                    </div>
                    <!-- <div class="row">
                        <div class="col-md-9">
                            <p class="text-comentario text-fondo">
                                <span><img src="../imagen/icon-preguntas.png"></span>
                                Excelente producto y vendedor, todo a tiempo.
                                <span>12/11/2019 17:49</span>
                            </p>
                        </div>
                        <div class="col-md-3">
                            <p class="calif-comentario">
                                <i class="fas fa-star orange"></i>
                                <i class="fas fa-star orange"></i>
                                <i class="fas fa-star orange"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-9">
                            <p class="text-comentario">
                                <span><img src="../imagen/icon-preguntas.png"></span>
                                Me gusto mucho el servicio al cliente.
                                <span>12/11/2019 17:49</span>
                            </p>
                        </div>
                        <div class="col-md-3">
                            <p class="calif-comentario">
                                <i class="fas fa-star orange"></i>
                                <i class="fas fa-star orange"></i>
                                <i class="fas fa-star orange"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-9">
                            <p class="text-comentario text-fondo">
                                <span><img src="../imagen/icon-preguntas.png"></span>
                                Excelente producto y vendedor, todo a tiempo.
                                <span>12/11/2019 17:49</span>
                            </p>
                        </div>
                        <div class="col-md-3">
                            <p class="calif-comentario">
                                <i class="fas fa-star orange"></i>
                                <i class="fas fa-star orange"></i>
                                <i class="fas fa-star orange"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-9">
                            <p class="text-comentario">
                                <span><img src="../imagen/icon-preguntas.png"></span>
                                Me gusto mucho el servicio al cliente.
                                <span>12/11/2019 17:49</span>
                            </p>
                        </div>
                        <div class="col-md-3">
                            <p class="calif-comentario">
                                <i class="fas fa-star orange"></i>
                                <i class="fas fa-star orange"></i>
                                <i class="fas fa-star orange"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </p>
                        </div>
                    </div> -->
                </div>

                <!-- Paginacion -->
                <div class="pagination">
                    <!-- <a href="#" class="AD">&laquo;</a>
                    <a href="#" class="active">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#" class="AD">&raquo;</a> -->
                </div>
            </div>

            <div class="col-lg-4">
                <div class="container-infor">
                    <p class="clasificacion-general">
                        <span>0.0</span>
                        <i class="fas fa-star orange"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </p>
                    <p class="text-infor">
                        <span class="number-art datos__vendedor_clasifica"></span>
                    </p>
                    <p class="text-infor">
                        <span class="datos__vendedor_califica"></span>
                    </p>
                    <p class="text-infor">
                        <span class="ventas_seis_meses number-art">29</span>
                        <span class="_trans158"></span>
                    </p>
                    <p class="text-infor">
                        <span class="ventas_total number-art">29</span>
                        <span class="trans168"></span>
                    </p>
                    <div class="progress-user">
                        <div class="porcentaje_bar"></div>
                    </div>
                    <!-- <button class="btn-contactar" data-toggle="modal" data-target="#modal-chat">Contactar con el vendedor <span><img src="../imagen/contactar.png"></span></button> -->
                </div>
            </div>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/controllers/datos-vendedor.js"></script>

</html>


<!-- Modal chat -->
<div class="modal fade" id="modal-chat" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content content-modal">
            <div class="modal-header p-0">
                <div class="div-encabezado">
                    <div class="row encabezado-chat">
                        <div class="col-4">
                            <img src="../imagen/Logo-buy.png">
                        </div>
                        <div class="col-8">
                            <p>LIVECHAT</p>
                        </div>
                    </div>

                    <div class="row row-user-chat">
                        <div class="col-2 pr-0">
                            <div class="container-user-chat">
                                <img src="../imagen/avatar.png" class="imagen-user-chat">
                            </div>
                        </div>
                        <div class="col-10 pl-0">
                            <h6>Alexander Benavides</h6>
                            <p>SportClub store</p>
                        </div>
                    </div>

                    <div class="row row-chat-product">
                        <div class="col-sm-3  pr-md-2">
                            <div class="container-product-chat">
                                <img src="../imagen/img-slider.jpg" class="imagen-product-chat">
                            </div>
                        </div>
                        <div class="col-sm-9 pl-md-0">
                            <h5 class="name">Tenis Adidas Deerupt Runner - originales</h5>
                            <p class="price">300,00 USD</p>
                            <p class="descuento"><span>1,500,00 USD</span> 80 % OFF</p>
                        </div>
                        <div class="col-12 px-0">
                            <p class="text-conect">Conectado con SportClub Store</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-body px-2 py-0">
                <div class="scroll-chat">
                    <div class="row">
                        <div class="col-12 px-0">
                            <p class="hora-chat">Alexander- 10:55 am</p>
                        </div>
                        <div class="col-2 col-sm-1 px-2">
                            <p class="inicial-vendedor">A</p>
                        </div>
                        <div class="col-10 col-sm-11 px-2">
                            <p class="msj-vendedor">Hola Jorge, buen día! Para nosotros es un gusto atenderte.</p>
                            <p class="msj-vendedor">Cuéntanos, cómo podemos ayudarte</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 px-0">
                            <p class="hora-chat">Jorge- 10:57 am</p>
                        </div>
                        <div class="col-10 col-sm-11 px-2">
                            <p class="msj-comprador">Gracias, he buscado mucho este modelo y no lo había encontrado.</p>
                            <p class="msj-comprador">Sabes si en el futuro pueden traer más colores</p>
                        </div>
                        <div class="col-2 col-sm-1 px-2">
                            <p class="inicial-comprador">A</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer p-0">
                <div class="row row-enviar-msj">
                    <div class="col-10 col-md-11">
                        <div class="textarea-chat" contentEditable="true" placeholder="Escribe un mensaje aquí"></div>
                    </div>
                    <div class="col-2 col-md-1 px-0">
                        <button class="btn-camara"><img src="../imagen/camara-chat.png"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal alertas generales -->
<div class="modal fade" id="modal_alertas_generales" tabindex="-1" role="dialog" aria-hidden="true">
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

                <div class="row row-inf">
                    <h4 class="alerta_titulo"></h4>
                    <p class="alerta_texto"></p>
                    <button class=" trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>