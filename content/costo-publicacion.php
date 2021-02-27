<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="  ">Nasbi.com | Tarifas</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/costo-publicacion.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
    <div class="row row-banner">
        <div class="col-12">
            <!-- <h2>Publicaciones <br>nasbi</h2> -->
            <h2 class="trans226">Publicaciones nasbi</h2>
        </div>
    </div>

    <div class="row row-tabls">
        <div class="col-12">
            <h2 class="tittle-sect"><img src="../imagen/public-logo.png" alt=""> <span class="trans213">Tipos de publicación</span></h2>
            <div class="table-responsive table-publicaciones">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="trans212">Categorías</th>
                            <th class="trans196_">Gratuita</th>
                            <th class="trans197_">Clásica</th>
                            <th class="trans198_" style="color: #6200EA;"><b>Premium</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b class="trans214">Exposición en listados</b></td>
                            <td class="trans217">Baja</td>
                            <td class="trans218">Media</td>
                            <td style="color: #6200EA;"><b class="trans219">Alta</b></td>
                        </tr>
                        <tr>
                            <td><b class="trans216">Duración</b></td>
                            <td class="trans220">30 días </td>
                            <td class="trans221">60 días </td>
                            <td style="color: #6200EA;"><b class="trans222">Ilimitado</b></td>
                        </tr>
                        <tr>
                            <td><b class="trans185">Comisión</b></td>
                            <td class="trans223">Sin comisión NASBI </td>
                            <td style="cursor: pointer" class="trans224 ver-categorias">Ver Categorías </td>
                            <td style="color: #6200EA; cursor: pointer" class="ver-categorias"><b class="trans224"> Ver Categorías</b> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="aviso trans225">*El usuario podrá realizar 3 publicaciones anualmente de manera gratuita. Esto solo aplica para la comisión de Nasbi. No aplica para las comisiones de terceros, ejemplo: Pasarela de pago. </p>

            <h2 class="tittle-sect mt-5"><img src="../imagen/logo-category.png" alt=""><span class="trans215"> Categoría de productos y tarifas de publicación</span></h2>
            <div class="table-responsive table-publicaciones">
                <table class="table to_scroll">
                    <thead>
                        <tr>
                            <th class="trans212">Categorías</th>
                            <th class="trans196_">Gratuita</th>
                            <th class="trans197_">Clásica</th>
                            <th class="trans198_" style="color: #6200EA;"><b>Premium</b></th>
                        </tr>
                    </thead>
                    <tbody class="categorias_tbody">
                        <!-- <tr>
                            <td>Bebés</td>
                            <td>0% </td>
                            <td>12% </td>
                            <td style="color: #6200EA;"><b>13% </b></td>
                        </tr>
                        <tr>
                            <td>Bebés</td>
                            <td>0% </td>
                            <td>12% </td>
                            <td style="color: #6200EA;"><b>13% </b></td>
                        </tr>
                        <tr>
                            <td>Bebés</td>
                            <td>0% </td>
                            <td>12% </td>
                            <td style="color: #6200EA;"><b>13% </b></td>
                        </tr>
                        <tr>
                            <td>Bebés</td>
                            <td>0% </td>
                            <td>12% </td>
                            <td style="color: #6200EA;"><b>13% </b></td>
                        </tr>
                        <tr>
                            <td>Bebés</td>
                            <td>0% </td>
                            <td>12% </td>
                            <td style="color: #6200EA;"><b>13% </b></td>
                        </tr>
                        <tr>
                            <td>Bebés</td>
                            <td>0% </td>
                            <td>12% </td>
                            <td style="color: #6200EA;"><b>13% </b></td>
                        </tr>
                        <tr>
                            <td>Bebés</td>
                            <td>0% </td>
                            <td>12% </td>
                            <td style="color: #6200EA;"><b>13% </b></td>
                        </tr>
                        <tr>
                            <td>Bebés</td>
                            <td>0% </td>
                            <td>12% </td>
                            <td style="color: #6200EA;"><b>13% </b></td>
                        </tr>
                        <tr>
                            <td>Bebés</td>
                            <td>0% </td>
                            <td>12% </td>
                            <td style="color: #6200EA;"><b>13% </b></td>
                        </tr>
                        <tr>
                            <td>Bebés</td>
                            <td>0% </td>
                            <td>12% </td>
                            <td style="color: #6200EA;"><b>13% </b></td>
                        </tr>
                        <tr>
                            <td>Bebés</td>
                            <td>0% </td>
                            <td>12% </td>
                            <td style="color: #6200EA;"><b>13% </b></td>
                        </tr> -->

                    </tbody>
                </table>
            </div>
        </div>
        <img src="../imagen/imagen-fondo-chica.png" class="img-chica">
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/controllers/costo-publicacion.js"></script>

</html>