<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title class="trans276_">Nasbi.com</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <?php include '../include/analitic-web-script.php'; ?><!--si va hacer include de head-js.php quite este include porque ese ya esta alla-->
    <!-- Include General Css -->
    <?php include '../include/include-css.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/estadistica_mejores_ventas.css">
</head>

<!-- Include Navbar -->
<?php include '../include/navbar-logueado.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
            <div class="row row-two-est">
                <div class="col-sm-4">
                    <h5 class="_trans550 load_grafi">Estadísticas</h5>
                </div>
                <div class="col-sm-8 px-0">
                    <div class="input-group group-filterr">
                        <div class="input-group-prepend">
                            <label class="input-group-text _trans542">Buscar estadísticas por:</label>
                        </div>
                        <select class="form-comtrol select_meses_estadistica_ven selectpicker">
                        </select>
                    </div>
                </div>
            </div>

            <div class="row-three">
                <div class="select_mejores_vents">
                    <select class="select_padre_mejoresvents  select1_meses_mejor_venta" id="select_mejores_vents">
                        <option>Enero</option>
                        <option>Febrero</option>
                        <option>Marzo</option>
                    </select>
                </div>
                <div class="select_mejores_vents">
                    <select class="select_padre_mejoresvents select2_years_mejores_ventas" id="select_mejores_vents">
                        <option>2020</option>
                        <option>2019</option>
                        <option>2018</option>
                    </select>
                </div>
            </div>

            <div class="row row-four">
                <div class="col-xl-6 div_grafica_1">
                    <h5 class="trans249_">Resumen mensual</h5>

                    <div class="row row-secund-grafic">
                        <div class="col-md-4 px-1">
                            <div class="legends_grafica_uno div_grafica_1" id="legend"></div>
                        </div>
                        <div class="col-md-8 px-1">
                            <canvas id="myChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="no_data_en_grafica_resumen_vent col-sm-6">
                    <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                    <p class="label-title_nodata trans274_">no tienes ventas este mes.</p>
                </div>

                <div class="col-xl-6 div_grafica_2">
                    <h5 class="trans250_"></h2>
                    
                    <div class="row row-secund-grafic">
                        <div class="col-md-4 px-1">
                            <div class="legends_grafica_dos div_grafica_2" id="legend2"></div>
                        </div>
                        <div class="col-md-8 px-1">
                            <canvas class="grafic-secund" id="myChart2"></canvas>
                        </div>
                    </div>
                </div>

                <div class="no_data_en_grafica_ingreso_mejores_venta col-sm-6">
                    <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                    <p class="label-title_nodata trans275_ ">no tienes registro de ingresos este mes.</p>
                </div>
            </div>

            <div class="row row-five load_tabla">
                <div class="col-12">
                    <div class="input-group group-filterr">
                        <div class="input-group-prepend">
                            <label class="input-group-text _trans551">Ordenar por:</label>
                        </div>
                        <select  class="form-comtrol select_orden_precio_list_mejore_ven selectpicker"></select>
                    </div><br>

                    <div class="table-responsive">
                        <table class="table table-negocio table_estadistica_ventas_style">
                            <thead>
                                <tr>
                                    <th class="trans1">producto</th>
                                    <th class="trans39" >valor</th>
                                    <th class="trans48">cantidad</th>
                                    <th class="trans46_">fecha</th>
                                    <!-- <th class="trans265_">comprador</th>
                                    <th>boton</th> -->
                                </tr>
                            </thead>
                            <tbody class="ventas_negocio_referido  _mejore_ventas_estadistica_resumen">
                            </tbody>
                        </table>
                    </div>  
                    <div class="list__estadisticca_mejores_ventas__pagination"></div>
                    <div class="content__nodata3 no_data_en_lisstado_ingreso" >
                        <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                        <p class="label-title_nodata trans275_">No tienes negocios.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
<script src="../js/controllers/estadistica_mejores_ventas.js"></script>

</html>

<!--Modal ver info comprador-->

<div class="modal fade" id="modal-ver_info_comprador" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/Logo.png" class="logo-modal trans_299__src">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close cerrar_modal_info_comprador"  aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> 
                </div>

            
                <div class="row row-inf">
                    <h4 class="trans267_">¡Buen trabajo!</h4>
                </div>
                
                <div class="table-responsive table-modal-info">
                    <table class="table">
                        <thead>
                            <tr>
                                <th  class="trans268_">#</th>
                                <th  class="trans269_">First</th>
                                <th  class="trans_25">Last</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="nombre_comprador_mejores_vents">Mark</td>
                                <td class="tel_comprador_mejores_vents">Otto</td>
                                <td class="correo_comprador_mejores_vents">@mdo</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

