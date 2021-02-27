<!DOCTYPE html>
<html lang="en">
<?php
$urlbaseNasbi = "https://nasbi.peers2win.com/api/controllers/producto/?producto";
$data = array("data" => array("id" => $_GET["uid"], "iso_code_2" => "CO", "iso_code_2_money" => "CO", "uid" => null, "empresa" => null));
$postdata = json_encode($data);
$ch = curl_init($urlbaseNasbi);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'User-Agent:' . $_SERVER['HTTP_USER_AGENT']));
$response = curl_exec($ch);
$result =  json_decode($response, true);
curl_close($ch);

if ($result["status"] == "success") {
    $producto = $result["data"];
}

?>


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="title" content="Nasbi.com | <?php echo $producto["titulo"]; ?>">
    <meta property="og:title" content="<?php echo $producto["titulo"]; ?>">
    <meta name="description" content="<?php echo $producto["descripcion"]; ?>">
    <meta property="og:description" content="<?php echo $producto["descripcion"]; ?>">
    <meta property="keywords" name="keywords" content="<?php echo $producto["keywords"]; ?>">
    <meta property="og:image" content="<?php echo $producto["foto_portada"]; ?>">
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <title class="_trans525">Nasbi.com | Producto</title>
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/producto.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
    <?php include '../include/body_general.php'; ?>

    <div align="center">
        <div class="row row-info-product">
            <!-- Imagenes product -->
            <div class="col-lg-6 px-lg-0 col6-img. product__images">
                <ul id="slider-img">
                    <li data-thumb="" data-src="">
                        <div class="anchor-tag container-slider">
                            <a href="">
                                <div class="row loading-spinners content__loadingSpinner">
                                    <div class="col-lg-12"><br><br><br></div>
                                    <div class="col-lg-12">
                                        <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                        <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>

                            </a>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col-lg-6 content__loadingSpinner">
                <div class="row loading-spinners ">
                    <div class="col-lg-12"><br><br><br></div>
                    <div class="col-lg-12">
                        <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-6 pl-lg-0 content_all" style="display: none;">
                <!-- Nombre y precios -->
                <div class="row">
                    <div class="col-12 px-0 content_info_prod">
                        <h2 class="name-product product__name">Tenis Adidas Deerupt Runner - originales</h2>

                        <p class="clasificacion product__rate">
                            <i class="fas fa-star orange"></i>
                            <i class="fas fa-star orange"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <button class="btn-favorito product__favorite quitar"><i class="fas fa-heart"></i> <span class="_trans210">Quitar favorito</span></button>
                        </p>


                        <h2 class="text-descuento">
                            <span class="price-actual product__actual">300,00 USD</span>
                            <span class="price-descuento product__anterior" style="display: none;">1,500,00 USD</span>
                            <span class="porcentaje-decuento product__porcentaje_descuento" style="display: none;">80 % OFF</span>
                        </h2>
                    </div>

                </div>

                <!-- pagos -->
                <div class="row product__content__payment__method">
                    <div class="col-12 px-0">
                        <p class="label-moneda _trans167">Monedas de pago</p>
                    </div>

                    <!-- No disponible -->
                    <!-- <div class="col-6 col-sm-4 pr-lg-2 pl-lg-0">
                        <p class="Texmoneda">
                            <input type="radio" name="price" class="product__payment__method method_1" checked="true" value="1">
                            <span class="_trans168">Nasbi Blue</span>
                        </p>
                        <p class="price-pago published__price__nasbiblue">0,001004 <span>EBG</span></p>
                    </div> -->

                    <!-- <div class="col-6 col-sm-4 pr-lg-2 pl-lg-0">
                        <p class="Texmoneda">
                            <input type="radio" name="price" class="product__payment__method method_2" value="2">
                            <span class="_trans169">Nasbi Gold</span>
                        </p>
                        <p class="price-pago published__price__nasbigold">0,001004 <span>BTC</span></p>
                    </div> -->
                    <div class="col-12 col-sm-4 pr-lg-2 pl-lg-0">
                        <p class="Texmoneda">
                            <!-- <input type="radio" name="price" class="product__payment__method method_3" value="3"> -->
                            <span class="published__symbol__localcurrency">COP</span>
                        </p>
                        <p class="price-pago published__price__localcurrency">0,001004 <span class="published__symbol__localcurrency">COP</span></p>
                    </div>
                </div>

                <!-- Envio -->
                <div class="row">
                    <div class="col-12 px-0">
                        <p class="label-moneda _trans170">Datos del envío</p>
                    </div>
                    <div class="col-lg-12 pl-lg-0">
                        <div class="container-button">
                            <button class="button-envio button-envio-activo shipping__method__free" style="display: none;">
                                <span><img src="../imagen/envios/envio-gratis.png"></span> <span class="_trans205">Envíos gratuitos a todo el país</span>
                            </button>


                            <button class="button-envio button-envio-activo shipping__method__acargo" style="display: none;">
                                <span><img src="../imagen/envios/acordar.png"></span> <span class="_trans206"> Envíos a cargo</span>
                            </button>

                            <button class="button-envio button-envio-activo shipping__method__vendedor" style="display: none;">
                                <span><img src="../imagen/envios/acordar.png"></span> <span class="_trans207"> Cargo de envío en acuerdo</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Cantidad y compartir -->
                <div class="row">
                    <div class="col-12 px-sm-0">
                        <div class="container-button-cantidas">
                            <button class="btn-agg-arrito product__btn__addcart "><span class="_trans171">AÑADIR AL CARRITO</span> <span class="spinner-border spinner-border-sm spiner_anadir_carrito" style="display: none;" role="status" aria-hidden="true"></span></button>
                            <input type="text" value="1" class="form-control input-cant input-group-text product__cantida" maxlength="5">
                            <button class="btn-agg-arrito btn-compartir btn__compartir _trans172">COMPARTIR <span><img src="../imagen/compartir.png" alt=""></span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Descripcion e informacion personal -->
        <div class="row row-info-personal">
            <div class="col-lg-8">
                <div class="container-nav">
                    <nav>
                        <div class="nav nav-tabs" role="tablist">
                            <a class="nav-item nav-link active _trans173" id="nav-descripcion" data-toggle="tab" href="#descripcion" role="tab" aria-controls="descripcion" aria-selected="true">Descripción</a>
                            <a class="nav-item nav-link _trans174" id="nav-comentarios" data-toggle="tab" href="#comentarios" role="tab" aria-controls="comentarios" aria-selected="false">Comentarios</a>
                        </div>
                    </nav>
                    <div class="tab-content">
                        <!-- Descripcion -->
                        <div class="tab-pane fade show active" id="descripcion" role="tabpanel" aria-labelledby="nav-descripcion">
                            <div class="row loading-spinners content__loadingSpinner">
                                <div class="col-lg-12"><br><br><br></div>
                                <div class="col-lg-12">
                                    <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                    <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                            <p class="descripcion-product product__description" style="display: none;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat nulla veritatis ipsa maxime, doloribus a fuga ipsum explicabo, facilis repellat quae praesentium totam natus. Obcaecati dignissimos illo sed excepturi. Doloribus. lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum perferendis laboriosam ullam fugit provident, cupiditate neque unde, voluptate consectetur fuga maxime sunt consequuntur placeat aut ducimus, quis eius nam sapiente!</p>
                        </div>

                        <!-- Comentarios -->
                        <div class="tab-pane fade" id="comentarios" role="tabpanel" aria-labelledby="nav-comentarios">
                            <div class="row row-commets product_no_comments" style="display: none;">
                                <div class="col-lg-12">
                                    <p class="trans_44 _trans436">Ningún comentario por aquí.</p>
                                </div>
                            </div>
                            <div class="producto_content_coments">
                            </div>
                        </div>

                    </div>
                </div>

                <div class="row row-preguntas">
                    <div class="col-sm-9">
                        <p class="label-preguntas _trans175">Preguntas y respuestas</p>
                    </div>
                    <div class="col-sm-3 px-0 ">
                        <button class="btn-preguntar _trans176">Preguntar</button>
                    </div>
                </div>
                <div class="row input_pregunta" style="display: none;">
                    <div class="col-12">
                        <textarea class="form-control texarea_pregunta _trans437__ph" cols="70" rows="3" placeholder="Pregunta aqui..."></textarea>
                    </div>

                    <div class="col-12">
                        <div class="float-left mt-2 buttons-pregunta">
                            <button class="btn btn-danger btn_cancelar_pregunta trans_02">Cancelar</button>
                            <button class="btn btn-primary mr-2 btn_enviar_pregunta ">
                                <span class="trans_16__btn"></span>
                                <span class="spinner-border spinner-border-sm spiner_enviar_pregunta" style="display: none;" role="status" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row row-return-preguntas">
                    <div class="col-12 product__content__questions">
                        <!-- <p class="text-pregunta"><span><img src="../imagen/icon-preguntas.png"></span> Siguen disponibles????<span><b>16/11/2019 17:49</b></span></p>
                        <p class="text-pregunta textrespuesta"><span><img src="../imagen/icon-preguntas.png"></span> Si <span><b>16/11/2019 17:49</b></span></p> -->
                    </div>
                    <div class="col-12 product__content__questions__nodata" style="display: none;">
                        <div class="row">
                            <div class="col-lg-12">
                                <p class="trans_44 _trans177">Ningúna Pregunta por aquí.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="row loading-spinners content__loadingSpinner">
                    <div class="col-lg-12"><br><br><br></div>
                    <div class="col-lg-12">
                        <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>

                <div class="row content_info_vendedor" style="display: none;">
                    <div class="col-md-6 col-lg-12">
                        <p class="label-inform _trans178">Información del vendedor</p>
                        <div class="contenedor-vendedor">
                            <img loading="lazy" src="../imagen/avatar.png" class="imagen-vendedor vendedor__avatar" alt=" nasbi.com">
                        </div>
                        <div class="contenedor-nombre">
                            <a href="datos-vendedor.php">
                                <h5 class="nombre-vendedor vendedor__name">Alexander Benavides</h5>
                            </a>
                        </div>

                        <span class="row ubicacion-vendedor">
                            <label class=" trans_58">Ubicación:</label>
                            <span class="vendedor__location"></span>
                        </span>
                        <p class="tipo-coment vendedor__status__comments__content" style="display: none;">
                            <span class=" porc vendedor__status__comments">99%</span> <span class="_trans208">Comentarios positivos</span>
                        </p>
                        <p class="tipo-coment vendedor__status__comments__content__NoData" style="display: none;">
                            <span class="vendedor__status__comments">99%</span>
                        </p>
                        <p class="text-vent">
                            <span class=" num vendedor__sales__made">29</span> <span class="_trans158">Ventas realizadas en los últimos 6 meses</span>
                        </p>
                        <!-- <p class="text-vent">
                            <span class="vendedor__products_on__sale">48</span> Productos en venta
                        </p> -->
                        <div class="progress-vend">
                            <div class="porcent_bar"></div>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-12">
                        <p class="clasificacion-vendedor vendedor__rates__info">
                            <span>0.0</span>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </p>
                        <p class="text-vent "> <span class="num vendedor__clasification">Vendedor Platinum</span> </p>
                        <p class="text-vent vendedor__clasification__description ">Es un excelente y confiable vendedor</p>
                        <!-- <button class="btn-contactar" data-toggle="modal" data-target="#modal-chat"> <span class="_trans209">Contactar con el vendedor</span> <span><img src="../imagen/contactar.png"></span></button> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- productos del vendedor -->
        <div class="row content__masproductos">
            <div class="col-md-12">
                <div class="row row-similares">
                    <div class="col-12">
                        <p class="label-preguntas _trans179 tittle_productos_vendedor">Más productos del vendedor</p>
                        <div class="row loading-spinners content__loadingSpinner">
                            <div class="col-lg-12"><br><br><br></div>
                            <div class="col-lg-12">
                                <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>

                        <div class="owl-carousel owl-theme producto-vendedor content__masproductos__carousel" style="display: none;">
                            <!-- <div class="item">
                                <div class="container-similar">
                                    <img src="../imagen/img-slider.jpg" class="img-similar">
                                </div>
                                <h3 class="price-similar">300,00 USD</h3>
                                <p class="name-similar">Tenis Adidas Deerupt Runner - originals</p>
                            </div> -->
                            <!-- <div class="item">
                                <div class="container-similar">
                                    <img src="../imagen/img-slider.jpg" class="img-similar">
                                </div>
                                <h3 class="price-similar">300,00 USD</h3>
                                <p class="name-similar">Tenis Adidas Deerupt Runner - originals</p>
                            </div>
                            <div class="item">
                                <div class="container-similar">
                                    <img src="../imagen/img-slider.jpg" class="img-similar">
                                </div>
                                <h3 class="price-similar">300,00 USD</h3>
                                <p class="name-similar">Tenis Adidas Deerupt Runner - originals</p>
                            </div>
                            <div class="item">
                                <div class="container-similar">
                                    <img src="../imagen/img-slider.jpg" class="img-similar">
                                </div>
                                <h3 class="price-similar">300,00 USD</h3>
                                <p class="name-similar">Tenis Adidas Deerupt Runner - originals</p>
                            </div>
                            <div class="item">
                                <div class="container-similar">
                                    <img src="../imagen/img-slider.jpg" class="img-similar">
                                </div>
                                <h3 class="price-similar">300,00 USD</h3>
                                <p class="name-similar">Tenis Adidas Deerupt Runner - originals</p>
                            </div>
                            <div class="item">
                                <div class="container-similar">
                                    <img src="../imagen/img-slider.jpg" class="img-similar">
                                </div>
                                <h3 class="price-similar">300,00 USD</h3>
                                <p class="name-similar">Tenis Adidas Deerupt Runner - originals</p>
                            </div> -->
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

<script src="../js/controllers/producto.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/css/lightgallery.min.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightslider/1.1.6/css/lightslider.min.css" integrity="sha256-ev+XS9lVA6/6vEe/p9pncQjsHB6g9UtAZYFLNViXxAA=" crossorigin="anonymous" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/js/lightgallery.min.js"></script>
<script src="https://sachinchoolur.github.io/lightGallery/lightgallery/js/lg-fullscreen.js"></script>
<script src="https://sachinchoolur.github.io/lightGallery/lightgallery/js/lg-zoom.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lg-video@1.3.0/dist/lg-video.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightslider/1.1.6/js/lightslider.min.js" integrity="sha256-nHmCK+HOPMPezzS3ky9VKznMWH4sW4keT8HrMaDNbYo=" crossorigin="anonymous"></script>

<script>
    /* Script De Slider Producto */
    $(document).ready(function() {
        $('#slider-img').lightSlider({
            gallery: true,
            item: 1,
            vertical: true,
            verticalHeight: 470,
            vThumbWidth: 50,
            thumbItem: 8,
            thumbMargin: 4,
            slideMargin: 0,
            onSliderLoad: function(el) {
                el.lightGallery({
                    selector: '#slider-img .lslide',
                    download: false
                });
            }
        });
    });

    /* Funcion de Add y remove class (envio) */
    /*$('.button-envio').click(function() {
        if( $(this).hasClass('button-envio-activo') ){
            $(this).removeClass('button-envio-activo');
        }
        
        else{
            $('.button-envio').removeClass('button-envio-activo');
            $(this).addClass('button-envio-activo');
        }
    });*/
</script>

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
                        <button class="btn-camara"><img loading="lazy" src="../imagen/camara-chat.png"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Modal agregado al carrito -->
<div class="modal fade" id="modal-agregado-carrito-new" tabindex="-1" role="dialog" aria-hidden="true">
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

                <div class="row agregado-carrito">
                    <h4 class="trans300_"></h4>
                    <p class="trans301_"></p>
                    <div align="center" class="div-alignc" style="width: 100%;">
                        <a href="promociones.php"><button class="seguir trans302_"></button></a>

                        <a href="carrito-compras.php"><button class="trans57"></button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal compartir publicacion -->
<div class="modal fade" id="modal-compartir-publicacion" tabindex="-1" role="dialog" aria-hidden="true">
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
                    <img src="../imagen/compartir-subasta.png" class="img-modal">
                    <h4 class="_trans388">Comparte tu publicación</h4>
                    <p class="_trans831">Sabemos que quieres contarle a muchas personas sobre tus productos en venta. <br>¿Dónde quieres compartirlo?</p>

                    <div class="container-img">
                        <a class="compartir_mi_publicacion_wsp"> <img src="../imagen/icon-whatsapp.png"></a>
                        <a class="compartir_mi_publicacion_fb"> <img src="../imagen/icon-facebook.png"></a>
                        <a class="compartir_mi_publicacion_link"> <img src="../imagen/icon-copiar.png"></a>
                    </div>
                </div>
                <span class="texto_copiado _trans403">¡Copiado!</span>
            </div>
        </div>
    </div>
</div>

<!-- Modal alertas generales -->
<div class="modal fade" id="modal-alertas-generales" tabindex="-1" role="dialog" aria-hidden="true">
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

                <div class="row agregado-carrito">
                    <h4 class="alerta_titulo">¡Producto agregado!</h4>
                    <p class="alerta_text">Hemos agregado un producto a tu carrito de compras</p>
                    <div align="center" class="div-alignc" style="width: 100%;">
                        <button class="btn btn-primary trans_01" data-dismiss="modal" aria-label="Close">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>