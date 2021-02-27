<!DOCTYPE html>
<html lang="en">
<?php
$var_PHP = "ES";
if (array_key_exists("lenguaje", $_COOKIE)) {
    $var_PHP = $_COOKIE["lenguaje"];
    $var_PHP = strtoupper($var_PHP);
} else {
    if (array_key_exists("lang", $_GET)) {
        $lenguaje_url_metas = urldecode($_GET['lang']);
        $var_PHP = $lenguaje_url_metas;
        $var_PHP = strtoupper($var_PHP);
    } else {
        if (array_key_exists("nle", $_GET)) {
            $lenguaje_url_metas = urldecode($_GET['nle']);
            $var_PHP = $lenguaje_url_metas;
            $var_PHP = strtoupper($var_PHP);
        } else {
            $idioma = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
            $idioma = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"], 0, 2);
            $idioma = strtoupper($idioma);
            $var_PHP = $idioma;
        }
    }
}
$urlbaseNasbi = "https://nasbi.com/json/$var_PHP.json";
$ch = curl_init($urlbaseNasbi);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'User-Agent:' . $_SERVER['HTTP_USER_AGENT']));
$response = curl_exec($ch);
$result =  json_decode($response, true);
curl_close($ch);
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="title" content="<?php echo $result["trans242_SEO"] ?>">
    <meta property="og:title" content="<?php echo $result["trans242_SEO"] ?>">
    <meta name="description" content="<?php echo $result["trans243_SEO"] ?>">
    <meta property="og:description" content="<?php echo $result["trans243_SEO"] ?>">
    <meta property="og:image" content="https://nasbi.com/imagen/logo_150x150.png">
    <title class="trans517_"></title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/preguntas-frecuentes.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
    <?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row row-banner">
            <div class="col-12">
                <h2 class="_trans818"></h2>
            </div>
        </div>

        <div class="row content-colapse">
            <!-- General 1-->
            <div class="col-12">
                <button class="btn-collapse" data-toggle="collapse" data-target="#collapse1"><img src="../imagen/collapse-preguntas/general.svg" alt=""> <span class="_trans565"> </span><img src="../imagen/down.png" class="flecha"></button>
                <div id="collapse1" class="collapse">
                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans572">¿Qué es Nasbi?</h6>
                        </div>

                        <div id="sub-collapse" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans573">Marketplace que te permite comprar, vender y subastar productos, sacando provecho a una variedad de métodos de pago, con grandes promociones las 24 horas del día, los 365 días del año.</p>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse02">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans574">¿Cuándo recibiré notificaciones por correo electrónico relacionadas con Nasbi?:</h6>
                        </div>
                        <div id="sub-collapse02" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <ul>
                                    <li class="_trans575">Al momento de culminar el registro como usuario Nasbi.</li>
                                    <li class="_trans576">Al momento de publicar una venta.</li>
                                    <li class="_trans577">Al momento de cerrar una venta.</li>
                                    <li class="_trans578">Informando si un comprador tiene interés por uno de nuestros productos publicados.</li>
                                    <li class="_trans579">Al momento de realizar una compra.</li>
                                    <li class="_trans580">Informando nuevos productos de interés.</li>
                                    <li class="_trans581">Informando promociones.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Compras 2-->
            <div class="col-12">
                <button class="btn-collapse" data-toggle="collapse" data-target="#collapse2"><img src="../imagen/collapse-preguntas/compras.svg"> <span class="trans41_"></span> <img src="../imagen/down.png" class="flecha"></button>
                <div id="collapse2" class="collapse">
                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse03">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans582">¿Por qué debería comprar en Nasbi?</h6>
                        </div>
                        <div id="sub-collapse03" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <ul>
                                    <li>
                                        <span class="_trans583">Ofrecemos la mejor experiencia de usuario</span>
                                        <p class="_trans584">Podrás interactuar con nuestro marketplace de manera fácil, ágil e intuitiva, establecemos una relación familiar y consistente entre nuestros clientes y nuestro marketplace.</p>
                                    </li>
                                    <li>
                                        <span class="_trans585">Amplia variedad de productos premium</span>
                                        <p class="_trans586">Contamos con un amplio portafolio de productos premium desde ropa, electrodomésticos, artículos deportivos hasta todos aquellos que puedas imaginar</p>
                                    </li>
                                    <li>
                                        <span class="_trans587">Grandes descuentos</span>
                                        <p class="_trans588">Operando bajo un sistema de subastas los usuarios podrán acceder a gran variedad de productos con un 60% debajo de su valor comercial comercial. </p>
                                    </li>
                                    <li>
                                        <span class="_trans589">Vende y Compra de manera segura </span>
                                        <p class="_trans590">En Nasbi puedes comercializar tu productos de manera segura debido a que la plataforma se encuentra protegida por su tecnología Blockchain, la cual almacena la información transaccional y personal de los usuarios de manera descentralizada garantizando la protección de esta e imposibilitando los fraudes y hackeos a los que se encuentran expuestos los marketplace tradicionales.</p>
                                    </li>
                                    <li>
                                        <span class="_trans591">Nasbi te mantiene actualizado con productos de tu interés: </span>
                                        <p class="_trans592">Constantemente nos preocupamos por las necesidades de nuestros usuarios, por lo cual nos mantenemos analizando sus comportamientos de compra y venta, para enviar sugerencias de:</p>
                                        <ul>
                                            <li class="_trans593">Promociones de sus productos de interés</li>
                                            <li class="_trans594">Nuevos productos en la plataforma que podrían interesarles.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span class="_trans595">Política de Devoluciones</span>
                                        <p class="_trans596">Inicialmente, con sólo la persona reportar dentro de los primeros 30 días que había un problema en su compra, tenía la oportunidad de recibir el reembolso o nuevamente el artículo; sin necesidad de devolverlo.Actualmente esto es diferente, porque Amazon pedirá el producto para poder cambiarlo; y aunque las políticas fueron modificadas, sigue siendo una opción totalmente beneficiosa para los clientes.</p>
                                    </li>
                                    <li>
                                        <span class="_trans597">Excelente atención al cliente</span>
                                        <p class="_trans598">Nos preocupamos por brindar el mejor servicio al cliente, brindando las respuestas a las inquietudes de los clientes de manera inmediata a través de cualquiera de los canales de atención definidos.</p>
                                    </li>
                                    <li>
                                        <span class="_trans599">Favoritos</span>
                                        <p class="_trans600">Nasbi te brinda la oportunidad de agregar en una lista los productos que desearías tener o que te regalaran en algún momento, para la adquisición de estos en un futuro según disponibilidad.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse04">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans601">¿Cómo buscar productos en Nasbi?</h6>
                        </div>
                        <div id="sub-collapse04" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans602">Para encontrar el producto de tu interés solo debes escribir el nombre en la barra de búsqueda situada en la parte superior de Nasbi.com, allí podrás visualizar todos los vendedores que están ofertando el producto con su precio de venta.</p>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse05">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans603">¿Cómo buscar productos en Nasbi?</h6>
                        </div>
                        <div id="sub-collapse05" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class="_trans604">El sistema de compra en Nasbi está estructurado bajo 2 modelos, los cuales se detallan a continuación:</p>
                                <ul>
                                    <li><span class="_trans605">Compra tradicional:</span>
                                        <p class="_trans606">Cualquier usuario puede ser parte de Nasbi, para realizar compras de productos y servicios en el Marketplace, siguiendo los pasos que se detallan a continuación:</p>
                                        <ol>
                                            <li class="_trans607">Abrir una cuenta en Nasbi.com</li>
                                            <li class="_trans608">Agregar el Método de Pago de preferencia.</li>
                                            <li class="_trans609">Buscar y seleccionar el producto que desea comprar.</li>
                                            <li class="_trans610">Confirmar la compra</li>
                                            <li class="_trans611">Recibir el producto.</li>
                                        </ol>
                                    </li>
                                    <li><span class="_trans612">Compra por subasta:</span>
                                        <p class="_trans613">Cualquier usuario puede participar en las subastas de Nasbi, existen 2 tipos de subasta: </p>
                                        <ul>
                                            <li><span class="_trans614">Subasta Nasbi:</span>
                                                <p class="_trans616">Subastas de productos con un costo entre USD 30 y USD 249, para participar en estas subastas deberás pagar la entrada a la subasta, la cual es equivalente al 2,9% del costo del producto.</p>
                                                <ol>
                                                    <li class="_trans617">Abre una cuenta en https://nasbi.com</li>
                                                    <li class="_trans618">Recarga saldo dorado a través de las pasarelas de pago disponibles. (Ten en cuenta recargar el saldo suficiente para pagar la entrada, realizar tu puja y llevarte el producto que tanto deseas).</li>
                                                    <li class="_trans619">Ingresa a la subasta de tu interés pagando del saldo dorado el 2,9% del costo del producto del saldo dorado.</li>
                                                    <li class="_trans620">Realiza tu oferta con el saldo “dorado”.</li>
                                                    <li class="_trans621">Espera que el conteo regresivo llegue a 0 sin que ningún usuario realice otra oferta de mayor valor.</li>
                                                    <li class="_trans622">Gana la subasta.</li>
                                                    <li class="_trans623">Acuerda el envío con el vendedor.</li>
                                                    <li class="_trans624">Recibe el producto.</li>
                                                </ol>
                                            </li>
                                            <li><span class="_trans625">Subastas Premium Nasbi:</span>
                                                <p class="_trans626">Para participar en las subastas Premium Nasbi deberás adquirir los tickets que dan acceso a estas dependiendo de la categoría en la que desees comprar tu producto.</p>
                                                <ol>
                                                    <li class="_trans617">Abre una cuenta en https://nasbi.com</li>
                                                    <li class="_trans627">Recarga saldo dorado a través de las pasarelas de pago disponibles. (Ten en cuenta recargar el saldo con un monto igual o mayor al 60% del costo del producto para que no te quedes sin dinero para realizar tu puja y llevarte el producto que tanto deseas).</li>
                                                    <li class="_trans628">Ingresa a la subasta de tu interés.</li>
                                                    <li class="_trans629">Realiza tu oferta con el saldo “subasta” a partir del 40% del costo comercial del producto.</li>
                                                    <li class="_trans621"></li>
                                                    <li class="_trans622"></li>
                                                    <li class="_trans624"></li>
                                                </ol>
                                                <span class="_trans807">Nota</span>
                                                <p class="_trans808">Si no ganas la subasta el saldo “Subasta” retornará de manera automática a tu billetera digital Nasbi, para que puedas hacer uso de este en otra subasta.</p>
                                            </li>
                                        </ul>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse06">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans630">¿Qué son los tickets de compra? </h6>
                        </div>
                        <div id="sub-collapse06" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans631">Entradas que te brindan acceso a compras de productos bajo el modelo de subasta y sus diferentes categorías.</p>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse07">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans632">¿Cómo puedo adquirir mis tickets para realizar compras bajo el modelo de subasta?</h6>
                        </div>
                        <div id="sub-collapse07" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans633">Para realizar compras bajo el modelo de subasta deberás adquirir tickets según la categoría en la que desees comprar.</p>
                                <div class="table-responsive responvibeTable">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="_trans634" ROWSPAN=2>CATEGORÍA</th>
                                                <th class="_trans635" COLSPAN=2>VALOR PRODUCTOS</th>
                                                <th class="_trans636" ROWSPAN=2>No. TICKET NECESARIOS</th>
                                                <th class="_trans637" ROWSPAN=2>COSTO TICKET VENTA/UND</th>
                                            </tr>
                                            <tr>

                                                <th class="_trans638">RANGO INF.</th>
                                                <th class="_trans639">RANGO SUP.</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>BRONZE</td>
                                                <td>$ 250</td>
                                                <td>$ 300</td>
                                                <td>1 BRONZE</td>
                                                <td>USD 7</td>
                                            </tr>
                                            <tr>
                                                <td>SILVER</td>
                                                <td>$ 301</td>
                                                <td>$ 500</td>
                                                <td>1 SILVER</td>
                                                <td>USD 9</td>
                                            </tr>
                                            <tr>
                                                <td>GOLD</td>
                                                <td>$ 501</td>
                                                <td>$ 1.000</td>
                                                <td>1 GOLD</td>
                                                <td>USD 18</td>
                                            </tr>
                                            <tr>
                                                <td>PLATINUM</td>
                                                <td>$ 1.001</td>
                                                <td>$ 5.000</td>
                                                <td>1 PLATINUM</td>
                                                <td>USD 39</td>
                                            </tr>
                                            <tr>
                                                <td>DIAMOND</td>
                                                <td>$ 5.001</td>
                                                <td>$ 10.000</td>
                                                <td>2 PLATINUM</td>
                                                <td>USD 78</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ventas 3-->
            <div class="col-12">
                <button class="btn-collapse" data-toggle="collapse" data-target="#collapse3"><img src="../imagen/collapse-preguntas/ventas.svg" alt=""> <span class="_trans566"> </span><img src="../imagen/down.png" class="flecha"></button>
                <div id="collapse3" class="collapse">
                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse08">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans640">¿Por qué debería vender en Nasbi?</h6>
                        </div>
                        <div id="sub-collapse08" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <ul>
                                    <li><span class="_trans583">Ofrecemos la mejor experiencia de usuario</span>
                                        <p class="_trans584">Podrás interactuar con nuestro marketplace de manera fácil, ágil e intuitiva, establecemos una relación familiar y consistente entre nuestros clientes y nuestro marketplace.</p>
                                    </li>
                                    <li><span class="_trans589">Vende y Compra de manera segura </span>
                                        <p class="_trans590">En Nasbi puedes comercializar tu productos de manera segura debido a que la plataforma se encuentra protegida por su tecnología Blockchain, la cual almacena la información transaccional y personal de los usuarios de manera descentralizada garantizando la protección de esta e imposibilitando los fraudes y hackeos a los que se encuentran expuestos los marketplace tradicionales.</p>
                                    </li>
                                    <li><span class="_trans641">Sistema de reputación</span>
                                        <p class="_trans642">Tu buen servicio y la velocidad de despacho de los productos es el reflejo de tu reputación, lo cual te permitirá cerrar más ventas.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse09">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans643">¿Cómo puedo vender en Nasbi?</h6>
                        </div>
                        <div id="sub-collapse09" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class="_trans644">El sistema de venta de productos de en Nasbi está estructurado bajo dos modelos los cuales se detallan a continuación:</p>
                                <ol>
                                    <li><span class="_trans645">Venta tradicional:</span>
                                        <p class="_trans646">Cualquier usuario puede registrarse para ser parte de Nasbi y puede publicar ventas de productos eligiendo el tipo de publicación dependiendo de la exposición deseada en el motor de búsqueda para agilizar la venta del producto</p>
                                    </li>
                                    <li><span class="_trans647">Venta por subasta: </span>
                                        <p class="_trans648">Cualquier usuario puede hacer sus publicaciones mediante subastas, pagando la tarifa premium de publicación (Ver Tarifas por categorías) del artículo más el gasto operativo de venta individual (Ver costo venta individual) o la membresía de venta (Ver membresías subasta). El costo de publicación y de venta será cobrado una vez la subasta del usuario se haya cerrado de manera efectiva.</p>
                                    </li>

                                </ol>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse11">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans651">¿Cómo puedo vender en Nasbi?</h6>
                        </div>
                        <div id="sub-collapse11" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans652">Para realizar ventas bajo el modelo de subasta deberás adquirir tickets según la categoría en la que desees vender tu producto.</p>
                                <div class="table-responsive responvibeTable">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="_trans634" ROWSPAN=2>CATEGORÍA</th>
                                                <th class="_trans635" COLSPAN=2>VALOR PRODUCTOS</th>
                                                <th class="_trans636" ROWSPAN=2>No. TICKET NECESARIOS</th>
                                                <th class="_trans637" ROWSPAN=2>COSTO TICKET VENTA/UND</th>
                                            </tr>
                                            <tr>

                                                <th class="_trans638">RANGO INF.</th>
                                                <th class="_trans639">RANGO SUP.</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>BRONZE</td>
                                                <td>$ 250</td>
                                                <td>$ 300</td>
                                                <td>1 BRONZE</td>
                                                <td>USD 1</td>
                                            </tr>
                                            <tr>
                                                <td>SILVER</td>
                                                <td>$ 301</td>
                                                <td>$ 500</td>
                                                <td>1 SILVER</td>
                                                <td>USD 3</td>
                                            </tr>
                                            <tr>
                                                <td>GOLD</td>
                                                <td>$ 501</td>
                                                <td>$ 1.000</td>
                                                <td>1 GOLD</td>
                                                <td>USD 5</td>
                                            </tr>
                                            <tr>
                                                <td>PLATINUM</td>
                                                <td>$ 1.001</td>
                                                <td>$ 5.000</td>
                                                <td>1 PLATINUM</td>
                                                <td>USD 10</td>
                                            </tr>
                                            <tr>
                                                <td>DIAMOND</td>
                                                <td>$ 5.001</td>
                                                <td>$ 10.000</td>
                                                <td>2 PLATINUM</td>
                                                <td>USD 20</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                                <p class="_trans653">En caso de que seas un vendedor frecuente y desees obtener mayores beneficios, Nasbi ofrece los paquetes de tickets para venta que se detallan en la seccion de</p><a href="tickets.php">Tickets</a>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse12">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans654">¿Cuánto demora la liberación del pago por la venta de mis productos en Nasbi?</h6>
                        </div>
                        <div id="sub-collapse12" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans655">Una vez el comprador ha recibido el producto según las especificaciones requeridas y han transcurrido 15 días sin inconveniente alguno, se enviará el dinero de la venta a la cuenta registrada en plataforma para la recepción de pagos.</p>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse31">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="trans284"></h6>
                        </div>
                        <div id="sub-collapse31" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class="trans283"></p>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse13">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans656">¿Cómo funciona la escala de calificación Nasbi?</h6>
                        </div>
                        <div id="sub-collapse13" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans657">Con el objeto de garantizar la presencia de vendedores con altos estándares de calidad se desarrolló el sistema de calificación que evalúa el desempeño de estos según:</p>
                                <ul>
                                    <li class="_trans814">La satisfacción de los usuarios compradores. </li>
                                    <li class="_trans815">Los porcentajes de reclamos. </li>
                                    <li class="_trans816">Los tiempos de respuesta.</li>
                                    <li class="_trans817"> Retrasos en tiempos de entrega.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse14">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans654">¿Cómo clasificó al rango de vendedor Junior, Master y Senior?</h6>
                        </div>
                        <div id="sub-collapse14" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans659">Teniendo en cuenta el número de ventas realizadas y la facturación obtenida, los vendedores podrán clasificar a los rangos Junior, Master y Senior, los cuales les permitirán hacer uso de diferentes tipos de beneficios</p>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse15">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans660">¿Cómo obtengo los sellos de vendedor certificado Nasbi?</h6>
                        </div>
                        <div id="sub-collapse15" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans661">Nasbi otorga el reconocimiento de sello Nasbi para garantizar el buen desempeño de los vendedores que cumplen con requisitos establecidos por Nasbi y tienen buenas prácticas en:</p>
                                <ul>
                                    <li class="_trans662">Servicio al cliente</li>
                                    <li class="_trans663">Comercialización</li>
                                    <li class="_trans664">Postventa</li>
                                </ul>
                                <p class="_trans665">Las tiendas podrán obtener el reconocimiento de Sello Nasbi de dos formas:</p>
                                <ol>
                                    <li>
                                        <span class="_trans666">Orgánicamente:</span>
                                        <p class="_trans667">El sello será asignado de manera automática por la plataforma según el desempeño del vendedor evaluado bajo las siguientes variables:</p>
                                        <ul>
                                            <li class="_trans668">Estar activo durante 3 meses o más en clasificación Master.</li>
                                            <li class="_trans669">Alcanzar una facturación superior a $20.000.000.</li>
                                            <li class="_trans670">Tener 500 ventas concluidas.</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span class="_trans671">Por solicitud:</span>
                                        <p class="_trans672">El vendedor tendrá la posibilidad de solicitar el sello a través de la plataforma, para lo cual se le solicitará la siguiente documentación:</p>
                                        <ol>
                                            <li class="_trans673">Diligenciar formulario de solicitud de reconocimiento de Sello Nasbi*.</li>
                                            <li class="_trans675">Rut</li>
                                            <li class="_trans674">Proyección de ventas esperada.</li>
                                            <li class="_trans676">Propuesta comercial para asignar beneficios al programa Sello Nasbi.</li>
                                        </ol>
                                        <span class="_trans677">Características de propuesta comercial:</span>
                                        <p class="_trans678">Con la finalidad de potencializar las ventas de los aliados comerciales se desarrollaron 2 sistemas, de los cuales el vendedor deberá elegir 1 para enviar su solicitud de reconocimiento de sello Nasbi. A continuación, se detallan los sistemas citados anteriormente:</p>
                                        <span class="_trans679">Sistema 1: Bono primera compra y bono de referido</span>
                                        <ul>
                                            <li>
                                                <span class="_trans681">Bono primera Compra:</span>
                                                <p class="_trans680">El programa de Sello Nasbi premia al comprador en su primera compra con $10.000 pesos para ser gastado en tiendas certificadas con el Sello Nasbi.</p>
                                            </li>
                                            <li>
                                                <span class="_trans682">Bono Referido:</span>
                                                <p class="_trans683">Los compradores tendrán la posibilidad de referir nuevos compradores, por lo cual recibirán $5.000 una vez hayan llevado a cabo su primera compra en tiendas certificadas con el sello Nasbi.</p>
                                            </li>
                                        </ul>
                                        <span class="_trans684">Sistema 2: Descuento 10/30</span>
                                        <ul>
                                            <li>
                                                <span class="_trans685">Descuento 10/30:</span>
                                                <p class="_trans686">El vendedor tendrá la opción de otorgar un descuento en un rango del 10% al 30% en los productos de su tienda.</p>
                                            </li>
                                        </ul>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Envios 4-->
            <div class="col-12">
                <button class="btn-collapse" data-toggle="collapse" data-target="#collapse4"><img src="../imagen/collapse-preguntas/envios.svg" alt=""> <span class="_trans567"> </span><img src="../imagen/down.png" class="flecha"></button>
                <div id="collapse4" class="collapse">
                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse16">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans687">¿Cómo son los envíos en Nasbi?</h6>
                        </div>
                        <div id="sub-collapse16" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans688">En Nasbi contamos con 3 tipos de envíos, los cuales se describen a continuación:</p>
                                <ul>
                                    <li>
                                        <span class="_trans689">Uso de courier aliado:</span>
                                        <p class="_trans690">Tendrás la posibilidad de utilizar nuestro courier aliado garantizando una entrega de producto de alta calidad,menor costo de envío y tendrás la posibilidad de realizar el seguimiento del envío en tiempo real.</p>
                                    </li>
                                    <li>
                                        <span class="_trans691">Hacer envío por mi cuenta:</span>
                                        <p class="_trans692">Los usuarios vendedores tendrán la posibilidad de realizar el envío del producto con el courier de su preferencia.</p>
                                    </li>
                                    <li>
                                        <span class="_trans693">Hacer entrega personal: </span>
                                        <p class="_trans694">En caso de que el comprador y el vendedor se encuentren en la misma ciudad, el comprador y vendedor tendrán la posibilidad de acordar una cita en un sitio público para hacer entrega del producto.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagos 5-->
            <div class="col-12">
                <button class="btn-collapse" data-toggle="collapse" data-target="#collapse5"><img src="../imagen/collapse-preguntas/pagos.svg" alt=""> <span class="_trans568"> </span><img src="../imagen/down.png" class="flecha"></button>
                <div id="collapse5" class="collapse">
                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse17">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans695">¿Qué medios de pago existen en Nasbi?</h6>
                        </div>
                        <div id="sub-collapse17" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans696">Dado que Nasbi maneja el sistema de compra tradicional y el sistema de compra de subasta, los Nasbi usuarios tendrán la posibilidad de realizar el pago de los productos de la manera que se detalle a continuación:</p>
                                <ul>
                                    <li class="_trans697">Compra tradicional: Pasarelas de pago, Saldo Dorado y Bono de descuento.</li>
                                    <li class="_trans698">Compra por subasta: Saldo Dorado</li>
                                </ul>

                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse18">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans699">¿Cómo pago mis artículos?</h6>
                        </div>
                        <div id="sub-collapse18" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans700">Teniendo en cuenta nuestros dos sistemas de compra, el pago de los artículos depende el sistema elegido, como se detalla a continuación:</p>
                                <ul>
                                    <li class="">
                                        <span class="_trans701">Sistema de compra tradicional:</span>
                                        <p class="_trans702">Para realizar los pagos en el sistema de compra tradicional tendrás la posibilidad de registrar el método de pago deseado, usando nuestras pasarelas de pago, las cuales pueden ser: Tarjeta de crédito y Tarjeta débito.</p>
                                    </li>
                                    <li class="">
                                        <span class="_trans870">Sistema de compra por subasta:</span>
                                        <p class="_trans703">Para hacer uso del sistema de compra por subasta deberás recargar tu saldo subasta a través de nuestras pasarelas de pago o nuestros aliados comerciales (Efecty, Baloto)</p>

                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse19">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans705">¿Qué es el saldo Dorado?</h6>
                        </div>
                        <div id="sub-collapse19" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans706">El saldo subasta es el saldo mediante el cual puedes realizar tus pujas en las subastas para llevarte el producto que está siendo ofertado.</p>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse20">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans707">¿Cómo puedo recargar saldo Dorado?</h6>
                        </div>
                        <div id="sub-collapse20" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans708">Para adquirir los productos mediante el sistema subastas deberás contar con “Saldo subasta” el cual podrá ser recargado en el menú”XXXXXXX” mediante las pasarelas de pago disponibles en la plataforma. Para mayor información haz clic aquí:</p><a class="_trans709 redireccion_tickets">Recargar Tickets</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Plan lealtad 6-->
            <div class="col-12">
                <button class="btn-collapse" data-toggle="collapse" data-target="#collapse6"><img src="../imagen/collapse-preguntas/lealtad.svg" alt=""> <span class="_trans569"> </span><img src="../imagen/down.png" class="flecha"></button>
                <div id="collapse6" class="collapse">
                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse21">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans710">¿Qué son los Nasbi puntos?</h6>
                        </div>
                        <div id="sub-collapse21" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans711">Con el fin de ofrecer mayores beneficios a nuestros vendedores, se desarrolló el sistema de Nasbi puntos, los cuales le permitirán a nuestros vendedores acumular puntos por cada venta cerrada, estos puntos podrán ser canjeables por una serie de beneficios.</p>
                                <span class="_trans712">Los beneficios para Persona Natural o emprendedores:</span>
                                <div class="table-responsive responvibeTable">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="_trans634">CATEGORÍA</th>
                                                <th class="_trans713">BENEFICIO</th>
                                                <th class="_trans714">DETALLE</th>
                                                <th class="_trans715">PUNTOS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td rowspan="3" class="_trans716">JUNIOR</td>
                                                <td class="_trans717">Regalar tickets para ventas en subasta Bronze</td>
                                                <td>1</td>
                                                <td>38</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans718">Descuento 20% BRONZE PRO</td>
                                                <td>1</td>
                                                <td>114</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans719">Publicaciones Orgánicas Historias</td>
                                                <td>1</td>
                                                <td>114</td>
                                            </tr>
                                            <tr>
                                                <td rowspan="8">SENIOR</td>
                                                <td class="_trans720">Publicidad pautada en redes sociales de Nasbi Marca con otras marcas 3</td>
                                                <td>1</td>
                                                <td>900</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans721">Videos para el listing</td>
                                                <td>1</td>
                                                <td>600</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans722">Regalos de ads en banners y página aliadas<br>Paquete 2 (Impre.: 30.960. Clics: 588)</td>
                                                <td>1</td>
                                                <td>1.000</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans723">Regalar tickets para ventas en subasta Bronze</td>
                                                <td>1</td>
                                                <td>38</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans724">Regalar tickets para ventas en subasta Silver</td>
                                                <td>1</td>
                                                <td>114</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans725">Descuento 20% BRONZE PRO</td>
                                                <td>1</td>
                                                <td>114</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans726">Descuento 15% SILVER PRO</td>
                                                <td>1</td>
                                                <td>142</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans727">Descuento 15% GOLD PRO</td>
                                                <td>1</td>
                                                <td>199</td>
                                            </tr>
                                            <tr>
                                                <td rowspan="13">MASTER</td>
                                                <td class="_trans728">Publicidad pautada en redes sociales de Nasbi Marca con otras marcas 3</td>
                                                <td>1</td>
                                                <td>1.100</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans729">Posición especial en estrategia de mailing (Marca) 1</td>
                                                <td>1</td>
                                                <td>2.000</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans730">Videos para el listing 3</td>
                                                <td>1</td>
                                                <td>1.400</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans732">Video de streaming</td>
                                                <td>1</td>
                                                <td>1.600</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans733">Regalos de ads en banners y página aliadas<br>Paquete 3 (Impre.: 51.600. Clics: 980)</td>
                                                <td>1</td>
                                                <td>309</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans717">Regalar tickets para ventas en subasta Bronze</td>
                                                <td>1</td>
                                                <td>38</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans724">Regalar tickets para ventas en subasta Silver</td>
                                                <td>1</td>
                                                <td>114</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans734">Regalar tickets para ventas en subasta Gold</td>
                                                <td>1</td>
                                                <td>190</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans725">Descuento 20% BRONZE PRO</td>
                                                <td>1</td>
                                                <td>114</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans726">Descuento 20% SILVER PRO</td>
                                                <td>1</td>
                                                <td>142</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans727">Descuento 20% GOLD PRO</td>
                                                <td>1</td>
                                                <td>199</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans735">Descuento 10% PLATINUM PRO</td>
                                                <td>1</td>
                                                <td>215</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans736">Descuento 10% DIAMOND PRO</td>
                                                <td>1</td>
                                                <td>220</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <span class="_trans737">Los beneficios para Persona Jurídica:</span>
                                <div class="table-responsive responvibeTable">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="_trans634">CATEGORÍA</th>
                                                <th class="_trans713">BENEFICIO</th>
                                                <th class="_trans714">DETALLE</th>
                                                <th class="_trans715">PUNTOS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td rowspan="3" class="_trans716">JUNIOR</td>
                                                <td class="_trans717">Regalar tickets para ventas en subasta Bronze</td>
                                                <td>5</td>
                                                <td>190</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans718">Descuento 20% BRONZE PRO</td>
                                                <td>1</td>
                                                <td>400</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans719">Publicaciones Orgánicas Historias</td>
                                                <td>2</td>
                                                <td>500</td>
                                            </tr>
                                            <tr>
                                                <td rowspan="8">SENIOR</td>
                                                <td class="_trans720">Publicidad pautada en redes sociales de Nasbi Marca con otras marcas 3</td>
                                                <td>2</td>
                                                <td>1.200</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans721">Videos para el listing</td>
                                                <td>2</td>
                                                <td>1.200</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans722">Regalos de ads en banners y página aliadas<br>Paquete 2 (Impre.: 30.960. Clics: 588)</td>
                                                <td>1</td>
                                                <td>1.000</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans723">Regalar tickets para ventas en subasta Bronze</td>
                                                <td>5</td>
                                                <td>190</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans724">Regalar tickets para ventas en subasta Silver</td>
                                                <td>5</td>
                                                <td>500</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans738">Descuento 20% BRONZE PRO</td>
                                                <td>1</td>
                                                <td>400</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans739">Descuento 15% SILVER PRO</td>
                                                <td>1</td>
                                                <td>700</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans740">Descuento 15% GOLD PRO</td>
                                                <td>1</td>
                                                <td>900</td>
                                            </tr>
                                            <tr>
                                                <td rowspan="13">MASTER</td>
                                                <td class="_trans728">Publicidad pautada en redes sociales de Nasbi Marca con otras marcas 3</td>
                                                <td>1</td>
                                                <td>2.000</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans729">Posición especial en estrategia de mailing (Marca) 1</td>
                                                <td>3</td>
                                                <td>2.200</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans730">Videos para el listing 3</td>
                                                <td>3</td>
                                                <td>1.400</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans732">Video de streaming</td>
                                                <td>3</td>
                                                <td>1.600</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans733">Regalos de ads en banners y página aliadas<br>Paquete 3 (Impre.: 51.600. Clics: 980)</td>
                                                <td>1</td>
                                                <td>1.200</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans717">Regalar tickets para ventas en subasta Bronze</td>
                                                <td>5</td>
                                                <td>190</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans724">Regalar tickets para ventas en subasta Silver</td>
                                                <td>5</td>
                                                <td>500</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans734">Regalar tickets para ventas en subasta Gold</td>
                                                <td>5</td>
                                                <td>950</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans738">Descuento 20% BRONZE PRO</td>
                                                <td>1</td>
                                                <td>500</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans739">Descuento 20% SILVER PRO</td>
                                                <td>1</td>
                                                <td>700</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans740">Descuento 20% GOLD PRO</td>
                                                <td>1</td>
                                                <td>900</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans741">Descuento 10% PLATINUM PRO</td>
                                                <td>1</td>
                                                <td>1.100</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans742">Descuento 10% DIAMOND PRO</td>
                                                <td>1</td>
                                                <td>1.200</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <!-- Subastas 7-->
            <div class="col-12">
                <button class="btn-collapse" data-toggle="collapse" data-target="#collapse7"><img src="../imagen/collapse-preguntas/subastas.svg" alt=""> <span class="_trans219"> </span><img src="../imagen/down.png" class="flecha"></button>
                <div id="collapse7" class="collapse">
                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse22">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans743">¿Qué son las subastas?</h6>
                        </div>
                        <div id="sub-collapse22" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans744">Una subasta en Nasbi, hace referencia a la posibilidad de vender o comprar productos con grandes descuentos, pagando un acceso el cual te otorgará el ingreso a dichas subastas, en las cuales realizando la mejor oferta podrás obtener el producto que tanto deseas. </p>

                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse23">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans745">¿Quiénes pueden acceder a las subastas en Nasbi?</h6>
                        </div>
                        <div id="sub-collapse23" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans746">Las subastas en Nasbi están disponibles para 3 tipos de usuarios del Marketplace: </p>
                                <div class="table-responsive responvibeTable">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="_trans747" colspan="2">Tipos de usuario</th>
                                                <th class="_trans748">Compra tradicional</th>
                                                <th class="_trans749">Venta tradicional</th>
                                                <th class="_trans750">Compra por subasta</th>
                                                <th class="_trans751">Venta por subasta</th>
                                                <th class="_trans752">Referir negocios</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colspan="2" class="trans_00">Nasbi</td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td><i class="fas fa-times"></i></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="_trans753">Invitado (P2W)</td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td><i class="fas fa-check"></i></td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" class="trans112">Empresa</td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td><i class="fas fa-check"></i></td>
                                                <td><i class="fas fa-times"></i></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse24">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans754">¿Qué tipos de subasta existen en Nasbi?</h6>
                        </div>
                        <div id="sub-collapse24" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <span class="_trans755">Subastas Nasbi:</span>
                                <p class=" _trans756">Subastas en las cuales los usuarios pueden adquirir productos entre productos entre USD 30 y USD 249.</p>
                                <span class="_trans757">Subastas Nasbi Premium:</span>
                                <p class="_trans758">Subastas en las cuales los usuarios pueden adquirir productos entre USD 250 y USD 10.000 o más. Las subastas Nasbi Premium se dividen en las siguientes categorías:</p>
                                <ul>
                                    <li>
                                        <span class="_trans759">Subasta Bronze:</span>
                                        <p class="_trans764">Subastas de productos con valores comerciales entre</p><span class="_trans767">USD 250 y 300 USD.</span>
                                    </li>
                                    <li>
                                        <span class="_trans760">Subasta Silver:</span>
                                        <p class="_trans764">Subastas de productos con valores comerciales entre</p><span class="_trans768">USD 301 y 500 USD.</span>
                                    </li>
                                    <li>
                                        <span class="_trans761">Subasta Gold:</span>
                                        <p class="_trans764">Subastas de productos con un valor comercial entre</p><span class="_trans769">USD 501 y USD 1.000.</span>
                                        <p class="_trans765">Podrás acumular los tickets Gold para poder ingresar a subastas de mayor valor.</p>
                                    </li>
                                    <li>
                                        <span class="_trans762">Subasta Platinum:</span>
                                        <p class="_trans764">Subastas de productos con un valor comercial entre</p><span class="_trans770">USD 1.001 y USD 5.000.</span>
                                        <p class="_trans766">Podrás acumular los tickets Platinum para poder ingresar a subastas de mayor valor.</p>
                                    </li>
                                    <li>
                                        <span class="_trans763">Subasta Diamond: </span>
                                        <p class="_trans764">Subastas de productos con un valor comercial entre</p><span class="_trans771">USD 5.001 y USD 10.000.</span>
                                        <p class="_trans766">Podrás acumular los tickets Platinum para poder ingresar a subastas de mayor valor.</p>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse25">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans772">¿Cómo ingresar en una subasta?</h6>
                        </div>
                        <div id="sub-collapse25" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans773">Teniendo en cuenta las “Subastas Nasbi” y las “Subastas Nasbi Premium” se desarrollaron los métodos de acceso a estas, los cuales se detallan a continuación:</p>
                                <span class="_trans774">Ticket porcentual:</span>
                                <p class="_trans775">Porcentaje fijo sobre el valor del producto que te otorga acceso a las “Subastas Nasbi”.</p>
                                <span class="_trans776">Ticket premium: </span>
                                <p class="_trans809">Documento digital que te otorga acceso a las subastas “Nasbi Premium” y puede ser adquirido por:</p>
                                <ul>
                                    <li class="_trans777">Usuarios Nasbi en el sitio web www.nasbi.com para subasta de categoría BRONZE, SILVER y GOLD.</li>
                                    <li>
                                        <p class="_trans778">Managers de la comunidad P2W de la siguiente manera:</p>
                                        <ul>
                                            <li class="_trans779">Compra de paquete</li>
                                            <li class="_trans780">Reconsumo</li>
                                            <li class="_trans781">Compra de tickets en la plataforma P2W</li>
                                        </ul>
                                    </li>
                                    <li class="_trans782">Los usuarios Nasbi que deseen participar en subastas PLATINUM y DIAMOND deberán contactarse con un usuario P2W para adquirir sus tickets.</li>
                                </ul>

                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse26">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans783">¿Cómo puedo pujar en una subasta?</h6>
                        </div>
                        <div id="sub-collapse26" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans784">Una vez se da inicio a una subasta de la cual eres participante tendrás dos opciones para realizar tus pujas: </p>
                                <ol>
                                    <li>
                                        <span class="_trans785">Sistema de sugerencia:</span>
                                        <p class="_trans786">La plataforma te sugerirá de manera automática una oferta mayor a la última oferta realizada.</p>
                                    </li>
                                    <li>
                                        <span class="_trans787">Sistema manual:</span>
                                        <p class="_trans788">Tendrás la posibilidad de ingresar de manera manual el monto que deseas ofertar.</p>
                                    </li>
                                </ol>

                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse27">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans789">¿Cómo hacer la mejor oferta?</h6>
                        </div>
                        <div id="sub-collapse27" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans790">Debes estar preparado y recargar tu cuenta con suficiente saldo para puja y tener al menos un 70% del costo comercial del producto para que puedas pujar en repetidas ocasiones y puedas conseguir el producto deseado haciendo la mejor oferta entre los usuarios participantes en la puja.</p>

                            </div>
                        </div>
                    </div>

                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse28">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans791">¿Cómo retirar una oferta de una subasta?</h6>
                        </div>
                        <div id="sub-collapse28" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class=" _trans792">Una vez que se da inicio a la subasta y realizas tu oferta en una subasta no podrás retractarte de esta.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Tickets 8-->
            <div class="col-12">
                <button class="btn-collapse" data-toggle="collapse" data-target="#collapse8"><img src="../imagen/collapse-preguntas/tickets.svg" alt=""> <span class="trans32"> </span><img src="../imagen/down.png" class="flecha"></button>
                <div id="collapse8" class="collapse">
                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse29">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans793">¿Qué tipos de tickets existen?</h6>
                        </div>
                        <div id="sub-collapse29" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <ul>
                                    <li><span class="_trans794">Ticket BRONZE:</span>
                                        <p class="_trans795">Documento digital que te otorga ingreso a subastas BRONZE. </p>
                                    </li>
                                    <li>
                                        <span class="_trans796">Ticket SILVER:</span>
                                        <p class="_trans797">Documento digital que te otorga ingreso a subastas SILVER.</p>
                                    </li>
                                    <li>
                                        <span class="_trans798">Ticket GOLD:</span>
                                        <p class="_trans799">Documento digital que te otorga ingreso a subastas GOLD.</p>
                                    </li>
                                    <li>
                                        <span class="_trans800">Ticket PLATINUM:</span>
                                        <p class="_trans801">Documento digital que te otorga ingreso a subastas PLATINUM Y DIAMOND.</p>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <!-- Calificaciones -->
            <div class="col-12">
                <button class="btn-collapse" data-toggle="collapse" data-target="#collapse9"><img src="../imagen/collapse-preguntas/calificaciones.svg" alt=""> <span class="_trans804"> </span><img src="../imagen/down.png" class="flecha"></button>
                <div id="collapse9" class="collapse">
                    <div class="row row-sub-collpase" data-toggle="collapse" data-target="#sub-collapse30">
                        <div class="col-12 label-sub-collapse">
                            <img src="../imagen/logo-preguntas.png">
                            <h6 class="_trans802">¿Cómo hacer una calificación?</h6>
                        </div>
                        <div id="sub-collapse30" class="col-12 collapse col-sub-collapse">
                            <div class="respuestaF">
                                <p class="_trans803">Una vez realices una compra tendrás la posibilidad de calificar la atención recibida durante la experiencia de compra con la siguiente escala de evaluación:</p>
                                <div class="table-responsive responvibetable02">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="_trans804">Calificación</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="trans_03">Excelente</td>
                                            </tr>
                                            <tr>
                                                <td class="_trans805">Muy Bueno</td>
                                            </tr>
                                            <tr>
                                                <td class="trans244_"></td>
                                            </tr>
                                            <tr>
                                                <td class="trans245_"></td>
                                            </tr>
                                            <tr>
                                                <td class="trans246_"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

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
<script src="../js/controllers/preguntas-frecuentes.js"></script>


</html>