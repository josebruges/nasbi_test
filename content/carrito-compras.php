<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="trans35"></title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php 
        include '../include/include-css.php';

        include '../include/head-js.php';
    ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/carrito-compras.css">
</head>

<!-- Include Navbar : para todas las pantallas-->
<?php 
    include '../include/manager-navbar.php';
?>

 

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row row-global list__contents__cart" style="display: none;">
            <div class="col-12">
                <h2 class="trans36"></h2>
            </div>
            
            <div class="col-xl-9">
                <h5 class="trans37"></h5>
                
                <div class="table-responsive responsive-carrito">
                    <table class="table table-carrito">
                        <thead>
                            <tr>
                                <!-- <th class="trans55"></th> -->
                                <!-- <th class=""></th> -->
                                <th class="trans38"></th>
                                <!-- <th class="trans39"></th> -->
                                <!-- <th class="trans40"></th> -->
                                <th class="trans48"></th>
                                <!-- <th class="trans41"></th> -->
                                <th class="trans_315"></th>
                                <th class="trans_316"></th>
                                <th class="trans43"></th>
                            </tr>
                        </thead>
                        <tbody class="__carritoUser">
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="col-xl-3">
                <div class="row container-pagos">
                    <div class="col-12 __totalesCarrito">
                        
                    </div>
                </div>
            </div>
        </div>

        <div class="row list__contents__cart__nodata" style="display: none;">
            <div class="content__nodata">
                <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                <p class="label-title_nodata _trans126 ">Ningún producto por aquí.</p>
                <label class="label-subtitle_nodata trans_45">Regresa más tarde.</label>
                <br><br><br><br><br><br>
            </div>
        </div>
    </div>

    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/core.min.js"></script> -->


    <script src="../js/carrito-compras.js"></script>

    <?php include '../include/footer.php';?>
    <!-- include general js -->
    <?php include '../include/include-js.php';?>
    <script>
        function cargarPrimero(){
            carritoUsuario();
        }
    </script>
</body>

</html>


<!-- MODALES SUBASTAS NASBI NORMAL: Usuario sin inicio de sesión carrito  -->
<div class="modal fade" id="modal-carrito_compras-nologeado" tabindex="1" role="dialog" aria-hidden="true">
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
                        <h5 class="trans57">Inscripción a subastas</h5> 

                        <p class="trans475_">Para inscribirte en está subasta inicia sesión en tu cuenta NASBI.</p>

                        <div class="contn-entrega">
                            <button class="btnsi trans_118" data-dismiss="modal" data-toggle="modal" data-target="#modal-login">Inicia sesión</button>
                        </div>

                        <p class="trans_119">Si aún no tienes una cuenta, <a href='registro.php'>regístrate ahora.</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
