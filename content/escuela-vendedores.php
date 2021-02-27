<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="_trans514" ></title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link  rel="stylesheet" href="../css/escuela-vendedores.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
    <div class="row row-header-escuela">
        <div class="col-12 ">
            <img src="../imagen/icon-escu.png" class="icon-logo">
            <h2 class="trans279_"></h2>
            <p class="trans280_"></p>
            <div class="contn-btns">
                <button class="filter_gerencia"><img src="../imagen/escuela-vendedores/icono_gerencia.svg"> <span class="trans496_ "></span></button>
                <button class="filter_mercadeo"><img src="../imagen/escuela-vendedores/icono_mercadeo.svg"> <span class="trans497_ "></span></button>
                <button class="filter_servicio"><img src="../imagen/escuela-vendedores/icono_servicio.svg"> <span class="_trans662 "></span></button>
                <button class="filter_finanzas"><img src="../imagen/escuela-vendedores/icono_finanzas.svg"> <span class="trans498_ "></span> </button>
                <button class="filter_logistica"><img src="../imagen/escuela-vendedores/Icono_logistica.svg"><span class="trans499_ "></span></button>
                <button class="tdos trans_47 activar_todos"></button>
            </div>
        </div>        
    </div>


    <div class="row rows-videos list_items_pre">
    <!--
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/estrategia.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_gerencia.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>La estrategia define tu éxito</h4>
                <p>Cuando escuchamos o leemos la palabra estrategia, algunos recordamos una película de acción</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/datos.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_gerencia.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Los datos, el punto clave de éxito</h4>
                <p>En los últimos años, el análisis de datos se ha convertido en un concepto de moda para todas las organizaciones comerciales</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/datos-ventas.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_gerencia.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Los datos, el camino para potenciar tus ventas</h4>
                <p>El análisis de datos de ventas es una herramienta vital para maximizar tu capacidad de ventas</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/aumenta-visitas.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_gerencia.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Aumenta las visitas de tu tienda</h4>
                <p>Hay muchas estrategias inmediatas que puedes aplicar para aumentar las ventas en línea</p>
            </div>
        </div>


        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/segmentar.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_gerencia.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Cómo segmentar tu cliente</h4>
                <p>Es el proceso de separar a los clientes en grupos en función de determinados rasgos, por ejemplo la personalidad, los intereses, los hábitos</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/proyecciones.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_gerencia.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Proyecciones y objetivos de tu negocio</h4>
                <p>Tus objetivos comerciales son los resultados que esperas lograr a medida que administras y haces crecer tu negocio</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/estrategia-promocion.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_mercadeo.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Define tus estrategias de promoción</h4>
                <p>Una estrategia de promoción es un plan viable diseñado para influir positivamente en las personas y acercarlas a tu negocio</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/email.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_mercadeo.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>E-mail marketing y SEO</h4>
                <p>El marketing por correo electrónico o mailing es una estrategia digital basada en el envío de correos electrónicos</p>
            </div>
        </div>



        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/redes-sociales.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_mercadeo.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Redes sociales para generar éxito</h4>
                <p>La gestión de las redes sociales es algo fundamental en materia de marketing digital ya que la mayoría de negocios</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/fotografia.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_mercadeo.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Fotografías para vender sin parar</h4>
                <p>Es bien sabido que ahora puedes lograr fotos de alta calidad con los teléfonos celulares que hay hoy en día en el mercado</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/redactar.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_mercadeo.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Cómo redactar y escribir para ganar</h4>
                <p>En medio del desarrollo de la era digital pocos llegaron a prever que la escritura seguiría siendo uno de los pilares fundamentales</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/brandis.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_mercadeo.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>El branding y sus elementos</h4>
                <p>El estudio de las marcas y del branding, la ciencia de crear un producto visual, físico y comunicativo que perdure en el tiempo</p>
            </div>
        </div>



        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/servicio-cliente.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_servicio.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>tips para tener un buen servicio al cliente</h4>
                <p>La satisfacción del cliente tiene un gran impacto en el éxito de tu empresa, ¿cuántas veces habremos escuchado o leído esto?</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/garantia.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_servicio.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Garantía y devolución</h4>
                <p>Optimizar la gestión de garantías y devoluciones no solo te permitirá mejorar el manejo de tus inventarios</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/comunicacion.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_servicio.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Comunicación con el cliente</h4>
                <p>Todo, absolutamente todo es comunicación. Hablar mucho, abruma y no decir nada es ignorar o desaparecer.</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/feedbank.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_servicio.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Feedback del cliente</h4>
                <p>Cuando piensas en recopilar comentarios (retroalimentación, en inglés feedback) de los clientes</p>
            </div>
        </div>



        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/calcula.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_finanzas.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Calcula tus costos</h4>
                <p>Cuando estés escribiendo tu plan de negocios, o llevándolo a cabo, realiza una estimación precisa de lo que le costará la operación de tu empresa</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/definir.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_finanzas.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Definir el precio correcto</h4>
                <p>En las operaciones comerciales es de gran importancia adquirir recursos de la calidad adecuada</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/estrategias-promocion.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_finanzas.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Estrategias de promoción</h4>
                <p>La promoción de productos es un componente fundamental de un plan de marketing para cualquier línea de negocio o empresa.</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/reduce-gastos.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_finanzas.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Reduce los gastos</h4>
                <p>Para este apartado contesta esta pregunta ¿para qué decidiste emprender o comenzar tu propio negocio?</p>
            </div>
        </div>



        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/seguridad-pagos.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/icono_finanzas.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Seguridad en los pagos</h4>
                <p>Gracias al desarrollo de tecnología, al creciente número de transacciones en línea y a un estilo de vida acelerado</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/como-empezar.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/Icono_logistica.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Cómo empezar</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu metus, convallis eget velit id, malesuada hendrerit sem.</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/como-vender.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/Icono_logistica.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Como vender en NASBI</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu metus, convallis eget velit id, malesuada hendrerit sem.</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/politicas.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/Icono_logistica.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Políticas NASBI</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu metus, convallis eget velit id, malesuada hendrerit sem.</p>
            </div>
        </div>



        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/seguridad-beneficios.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/Icono_logistica.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Seguridad Beneficios NASBI</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu metus, convallis eget velit id, malesuada hendrerit sem.</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/aliados-estrategicos.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/Icono_logistica.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Aliados Estratégicos NASBI</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu metus, convallis eget velit id, malesuada hendrerit sem.</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/crea-tu-tienda.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/Icono_logistica.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Crea tu tienda en Nasbi</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu metus, convallis eget velit id, malesuada hendrerit sem.</p>
            </div>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="contenedor-videos">
              <img src="../imagen/escuela-vendedores/que-vender.png" class="img-produt"> 
              <button><img src="../imagen/escuela-vendedores/Icono_logistica.svg"></button>
            </div>
            <div class="editor-videos">
                <h4>Cómo definir qué vender</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu metus, convallis eget velit id, malesuada hendrerit sem.</p>
            </div>
        </div>

        -->


         <div align="center" class="col-lg-12 content__loadingSpinner_escuela_vendedores">
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
    
     <div  class="row rows-videos nodata_items_pre">
        <div class="col-sm-4 no_data_arti_style">
            <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
            <p class="label-title_nodata trans231_ ">no tienes registro de ingresos este mes.</p>
         </div>
   </div> 

   <div align="center" class="list__escuela_vendedores__pagination"></div>
    <div class="row-noticias">
        <div class="col-12">
            <h4 class="trans283_">Últimas noticias</h4>
            <div class="owl-carousel owl-theme carousel-escuela-noticias">
                <!-- <div class="item">
                    <div class="container-noticia">
                        <img src="../imagen/escuela-vendedores/noticia1.png">
                        <h5>Precio de Bitcoin ha caído alrededor de 10% en los últimos 5 días</h5>
                        <p><i class="fas fa-clock"></i><span> </span>5 de Mayo de 2020</p>
                    </div>
                </div>
                <div class="item">
                    <div class="container-noticia">
                        <img src="../imagen/escuela-vendedores/noticia2.png">
                        <h5>Precio de Bitcoin ha caído alrededor de 10% en los últimos 5 días</h5>
                        <p><i class="fas fa-clock"></i><span> </span>5 de Mayo de 2020</p>
                    </div>
                </div>
                <div class="item">
                    <div class="container-noticia">
                        <img src="../imagen/escuela-vendedores/noticia3.png">
                        <h5>Precio de Bitcoin ha caído alrededor de 10% en los últimos 5 días</h5>
                        <p><i class="fas fa-clock"></i><span> </span>5 de Mayo de 2020</p>
                    </div>
                </div>
                <div class="item">
                    <div class="container-noticia">
                        <img src="../imagen/escuela-vendedores/noticia4.png">
                        <h5>Precio de Bitcoin ha caído alrededor de 10% en los últimos 5 días</h5>
                        <p><i class="fas fa-clock"></i><span> </span>5 de Mayo de 2020</p>
                    </div>
                </div> -->
            </div>
        </div>

     <div class="nodata_items_pre no_data_noti_style_ col-sm-4">
            <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
            <p class="label-title_nodata trans231_ ">no tienes registro de ingresos este mes.</p>
        </div>
        <div align="center" class="row content__loadingSpinner_escuela_vendedores">
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
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/controllers/escuela/escuela_vendedores.js"></script>

</html>