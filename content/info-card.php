 <!DOCTYPE html>
<html lang="en">
<?php 
$defaulturl = "https://blog.peers2win.com/";

$urlImagenP2W = "https://blog.peers2win.com/";

$noticia2 = file_get_contents($defaulturl."controllers/block/getBlogs.php?url=".$_GET["url"], "r");

$noticia2 = json_decode($noticia2, true);
 //print_r($defaulturl."controllers/block/getBlogs.php?url=".$_GET["url"]);

if ($noticia2["status"] == "success") {
  $noticia = $noticia2["data"];
}
$actualLink =  (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "//$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
?>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, maximum-scale=1.0,viewport-fit=cover">
  <title><?php echo strip_tags($noticia["titulo"]); ?></title>
  <meta name="title" content="<?php echo $noticia["meta_titulo"]; ?>">
  <meta property="og:title" content="<?php echo $noticia["meta_titulo"]; ?>">
  <meta name="description" content="<?php echo $noticia["meta_descripcion"]; ?>">
  <meta property="og:description" content="<?php echo $noticia["meta_descripcion"]; ?>">
  <meta name="url" content="<?php echo $actualLink ?>">
  <meta property="og:url" content="<?php echo $actualLink; ?>">
  <meta property="og:site_name" content="Nasbi">
  <meta property="keywords" name="keywords" content="<?php echo $noticia["keywords"]; ?>">

<meta property="og:type" content="article">
<meta property="og:image" content="<?php echo $defaulturl.$noticia["imagen"]; ?>">
<meta property="og:type" content="website" />

    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
        include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/info-card.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row row-global">
            <div class="col-lg-8 col-xl-9 colsglo">
               <div class="name-fecha">
                    <h1 class="titulo_noticia_dom_escue"></h1>
                    <p><button><img class="imagen_icon_tipo"></button> <b><span class="tipo_articulo_info"></span></b> | <span class="fecha_noticia"> 09.12.2020</span></p>
                </div>
                <img  class="img-01 img_noticia"> 
                <!-- <img  class="img-01" src="../imagen/escuela-vendedores/imagenespruebas/smiling-millennial-partners-handshaking-in-office-thanking-for-successful-teamwork.jpg">   -->
                <div class="contenido_noticia">
                </div>

  
                <!-- <p class="descrip-info">Cuando escuchamos o leemos la palabra estrategia, algunos recordamos una película de acción en la que un grupo de personas se reunía para trazar un plan y obtener una victoria. <br> Como vender en NASBI En verdad esto no se aleja de la realidad ya que en un nivel empresarial o de negocios, funciona de manera similar. Este es el sentido de la estrategia, generar un proceso de construcción que le permita a una persona o empresa, crear valores para los clientes, los accionistas y la sociedad, todo mientras crece.</p>

                <h2>¿Qué necesito para llevarlo a cabo?</h2>

                <p class="descrip-info">En el mercado hay mucha literatura relacionada con el tema, sin embargo, desde una perspectiva sencilla y práctica, en primer lugar debes realizar una revisión de lo que rodea tu idea de negocio o emprendimiento para optimizar y aprovechar al máximo tus recursos. VER ARTÍCULO Entonces, hay una serie de acciones que puedes hacer para empezar a determinar y marcar con claridad los límites de tu estrategia. Recuerda anotar todo en un documento escrito:</p>

                <p class="descrip-info"><b>Especifica la misión, la visión y los objetivos de tu empresa:</b> sí, esto se repite una y otra vez, muchas personas lo hacen sin mostrar interés. Sin embargo, definir estos procesos te dará un norte y será tu brújula para comenzar un proceso empresarial.</p>
                <p class="descrip-info mt-0"><b>Desarrolla planes puntuales para lograr los objetivos:</b> Digamos que tu meta es lograr cien ventas durante el primer mes de acción en tu empresa. Por lo tanto, pregúntate:</p>

                <p class="descrip-info mt-0 pl-md-4">
                    • ¿Cómo haré para llegar a ese número de personas? <br>
                    • ¿Cómo crear una campaña que me permita hacerlo?
                </p>

                <p class="descrip-info mt-0">Este ejemplo puedes plantearlo en el escenario que necesites. Lo importante es que sea evidente el camino a seguir, con objetivos claros, realizables y sostenibles en el tiempo.</p>

                <p class="descrip-info mt-0"><b>Asigna recursos para llevar a cabo estos planes:</b> no permitas que tus recursos se los lleve un solo plan. Sigamos el ejemplo de los 100 clientes: determina cuánto dinero vas a usar para lograr atraer ese número de personas. Por lo tanto, ten en cuenta:</p>
                <p class="descrip-info mt-0 pl-md-4">
                    • Si vas a usar redes sociales, determina cuánto invertirás en cada una. <br>
                    • Si realizas una campaña de correos, cuánto pagarás por cada envío. <br>
                    • Si llegas a usar material físico (pendones, flyers, etc.), determina cuánto será el retorno de la inversión para lograr un margen de ganancia <br>
                    Asignar recursos es uno de los puntos más importantes para lograr un saludable crecimiento en tus proyectos empresariales.
                </p>

                <p class="descrip-info mt-0"><b>Análisis de mercado:</b> en muchas ocasiones, gran parte de emprendimientos o pequeñas y medianas empresas usan como norte la fuerza del deseo. Por lo tanto, un concepto como análisis de mercadeo se convierte en algo muy extraño y ajeno. Sin embargo, no debe ser así, puesto que este concepto es el motor de cada una de las empresas que han llegado a ser grandes. Por lo tanto, es muy necesario y no requiere más que un poco de tu curiosidad y tiempo. <br><br> 
                
                Imaginemos un ejemplo: una empresa quiere crecer produciendo soluciones tecnológicas, como desarrollo de apps y venta de dispositivos.
                La estrategia de la empresa implica el análisis del sector tecnológico y de empresas de más o menos el mismo tamaño. A través de este
                análisis, la empresa sabe cómo ingresar al mercado y diferenciarse de los productos de la competencia. Posteriormente establece un plan
                para determinar si el enfoque es exitoso. Todo esto se puede hacer consultando en la Internet las cifras de X sector financiero por año.
                La estrategia final de cualquier empresa es el resultado de combinar, usar y aplicar investigación, sueños e interés, junto con un poco de
                organización escrita con puntos claros y bien definidos.
                </p>  -->
            </div>

            <div class="col-lg-4 col-xl-3 colsglo proximo_articulo">
                <h4 class="label-art trans285_">Artículos<br> más vistos</h4>

                <!-- <div class="card-notics">
                    <h5>Cómo redactar y <br> escribir para ganar</h5>
                    <img src="../imagen/escuela-vendedores/mas-vistos.png">
                    <button>Ver articulos</button>
                </div>

                <div class="card-notics">
                    <h5>Garantía <br>y devolución</h5>
                    <img src="../imagen/escuela-vendedores/mas-vistos.png">
                    <button>Ver articulos</button>
                </div>

                <div class="card-notics">
                    <h5>Como vender <br>en NASBI</h5>
                    <img src="../imagen/escuela-vendedores/mas-vistos.png">
                    <button>Ver articulos</button>
                </div> -->
            </div>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/controllers/escuela/info_card.js"></script>
</html>


