<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nasbi.com | Tickets</title>
    <link rel="icon" href="../imagen/Logo-Blanco.png">
    <!-- Include General Css -->
    <?php include '../include/include-css.php';
    include '../include/head-js.php'; ?>
    <!-- link css -->
    <link rel="stylesheet" href="../css/tickets.css">
</head>

<!-- Include Navbar -->
<?php include '../include/manager-navbar.php'; ?>

<body>
<?php include '../include/body_general.php'; ?>
    <div align="center">
        <div class="row-nav">
            <div class="col-list-nav">
                <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                    <a class="nav-link active sidenav__mis_tk_venta" id="id-venta-tickets" data-toggle="pill" href="#ref-venta-tickets" role="tab" aria-controls="ref-venta-tickets" aria-selected="true"><img src="../imagen/nav-pills/wallets.png"> <span class="_trans192">Mis Tickets Venta</span> </a>
                    <a class="nav-link sidenav__mis_tk_compra" id="id-compra-tickets" data-toggle="pill" href="#ref-compra-tickets" role="tab" aria-controls="ref-compra-tickets" aria-selected="false"><img src="../imagen/nav-pills/wallets.png"> <span class="_trans193"> Mis Tickets Compra</span> </a>

                    <!-- <a class="nav-link sidenav__compra_tk" id="id-transferir" data-toggle="pill" href="#ref-transferir" role="tab" aria-controls="ref-transferir" aria-selected="false"><img src="../imagen/nav-pills/transacciones.png"> <span class="">Transferir</span> </a> -->

                    <!-- <a class="nav-link sidenav__venta_tk" id="id-reconsumo" data-toggle="pill" href="#ref-reconsumo" role="tab" aria-controls="ref-reconsumo" aria-selected="false"><img src="../imagen/nav-pills/recargas.png"> <span class="_trans68">Compra de Tickets</span> </a> -->
                    <a class="nav-link sidenav__compra_tk_compra" id="id-compra-tickets-compra" href="nasbi-tickets-compra.php" role="tab"><img src="../imagen/nav-pills/recargas.png"> <span class="_trans453">Compra de Tickets para compra</span> </a>
                    <a class="nav-link sidenav__venta_tk_venta" id="id-compra-tickets-venta" href="nasbi-tickets-venta.php" role="tab"><img src="../imagen/nav-pills/recargas.png"> <span class="_trans454">Compra de Tickets para venta</span> </a>
                    <div class="icon-down-responsive">
                        <i class="fas fa-chevron-left"></i>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>

            <div class="px-0 col-tabcontent">
                <div class="tab-content">
                    <!-- Mis Tickets Venta -->
                    <?php include './tickets/tickets-venta.php'; ?>
                    <!-- Mis Tickets Compra -->
                    <?php include './tickets/tickets-compra.php'; ?>

                    <!-- Transferir -->
                    <div class="tab-pane fade" id="ref-transferir" role="tabpanel" aria-labelledby="id-transferir">
                        <div class="row">
                            <div class="col-12">
                                <h3 class="title-section">Tickets</h3>
                                <p class="text-inf1">Selecciona los tickets que vas a transferir</p>
                            </div>
                        </div>

                        <div class="row py-md-5">
                            <div class="col-sm-6 col-md-4 px-2">
                                <div class="input-group grouo-fecha">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text"><b>Filtrar por:</b> &nbsp;<span>Referencia</span></label>
                                    </div>
                                    <select class="form-control">
                                        <option>Platinum</option>
                                        <option>Platinum</option>
                                        <option>Platinum</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 px-2">
                                <div class="input-group grouo-fecha">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Caducidad</label>
                                    </div>
                                    <input type="date" class="form-control">
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 px-2">
                                <button class="btnagg">Agregar</button>
                            </div>

                            <div class="col-12">
                                <div class="table-responsive pt-3 responsive-table">
                                    <table class="table table-list">
                                        <thead>
                                            <tr>
                                                <th>Referencia</th>
                                                <th>Código</th>
                                                <th>Caducidad</th>
                                                <th>Añadir</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><span><img src="../imagen/../imagen/logo-mtd.png"></span> Platinum</td>
                                                <td><b>Dfhoauwh32</b></td>
                                                <td>Marzo 24 de 2020</td>
                                                <td><input type="checkbox"></td>
                                            </tr>
                                            <tr>
                                                <td><span><img src="../imagen/../imagen/logo-mtd.png"></span> Platinum</td>
                                                <td><b>Dfhoauwh32</b></td>
                                                <td>Marzo 24 de 2020</td>
                                                <td><input type="checkbox"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="row roe-head">
                            <div class="col-md-8 px-2">
                                <p>Tickets a transferir</p>
                            </div>
                            <div class="col-md-4 px-2">
                                <button><b>25</b> Tickets</button>
                                <button><b>PLATINUM</b></button>
                            </div>
                        </div>

                        <div class="row row-col-left">
                            <div class="col-md-6">
                                <div class="row row-prics">
                                    <div class="col-12 px-0">
                                        <p class="text-left"><b>Costo de tickets</b></p>
                                    </div>
                                    <div class="col-6 px-0">
                                        <p class="text-left">COSTO TICKET PLATINUM</p>
                                    </div>
                                    <div class="col-6 px-0">
                                        <p class="text-right"><b>$50 USD</b></p>
                                    </div>
                                    <div class="col-6 px-0">
                                        <p class="text-left">TICKETS TOTALES</p>
                                    </div>
                                    <div class="col-6 px-0">
                                        <p class="text-right"><b>25</b></p>
                                    </div>
                                    <div class="col-6 px-0">
                                        <p class="text-left">TOTAL</p>
                                    </div>
                                    <div class="col-6 px-0">
                                        <p class="text-right"><b>$1250 usd</b></p>
                                    </div>
                                    <div class="col-6 px-0">
                                        <p class="text-left">Total en BTC</p>
                                    </div>
                                    <div class="col-6 px-0">
                                        <p class="text-right"><b><img src="../imagen/btc-blue.png"> 0.6832728</b></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row row-right">
                                    <div class="col-12 px-0">
                                        <p><b>Costo de tickets</b></p>
                                        <div class="row row-recarga">
                                            <div class="col-12 px-3">
                                                <p class="text2"><img src="../imagen/btcmix.png" class="btc"> 0.073427642</p>
                                            </div>
                                        </div>
                                        <div class="row row-secund">
                                            <div class="col-sm-3 px-0">
                                                <img src="../imagen/Qr.png" class="QR">
                                            </div>
                                            <div class="col-sm-9 px-2">
                                                <p class="textqr"><b>Hash</b><br> SDFDFKjshfy37iafgg7fg7bz <img src="../imagen/copiar.png"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="input-group grouo-info">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Nombre</label>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Nombre">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="input-group grouo-info">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text">Correo de usuario a transferir</label>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Correo de usuario a transferir">
                                </div>
                            </div>
                            <div class="col-12 pb-4">
                                <button class="btn-transfer">TRANSFERIR TICKETS</button>
                            </div>
                        </div>
                    </div>

                    <!-- Reconsumo -->
                    <div class="tab-pane fade" id="ref-reconsumo" role="tabpanel" aria-labelledby="id-reconsumo">
                        <div class="row">
                            <div class="col-12">
                                <h3 class="title-section _trans68">Compra de Tickets</h3>
                                <p class="text-inf1 _trans58">Recuerda que para adquirir nuevos tickets deberás hace un reconsumo de tu plan en Peers2win.</p>
                                <a class=" _trans59" href="https://peers2win.com/dashboard.php">Reconsumir en Peers2win</a>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="table-responsive pt-3 responsive-table">
                                <table class="table table-list ">
                                    <thead>
                                        <tr>
                                            <th class="_trans60">Paquetes</th>
                                            <th class="_trans61">Tickets totales</th>
                                            <th class="_trans62">Tickets Bronze </th>
                                            <th class="_trans63">Tickets Silver</th>
                                            <th class="_trans64">Tickets Gold</th>
                                            <th class="_trans65">Tickets Platinum </th>
                                            <th class="_trans66">Tickets Diamont</th>
                                            <th class="_trans67">Valor paquete</th>
                                            <th> </th>
                                        </tr>
                                    </thead>
                                    <tbody class="tabla_planes">

                                    </tbody>
                                </table>


                            </div>
                        </div>

                        <!-- <div class="row">
                            <div class="col-12 px-0">
                                <div class="fondo-bono">
                                    <h2>BONO DE PAGO</h2>
                                    <p>Por cada paquete de recompra que adquieras, recibirás un bono de pago por 50% del monto del paquete en criptomonedas para que lo puedas utilizar en productos seleccionados dentro del marketplace</p>
                                </div>
                                <p class="text-01">*Cada empresario independiente debe estar activo con mínimo 80 puntos mensuales de consumo personal o venta para tener derecho a los bonos de red. Si un empresario está inactivo el primer mes se descontarán los puntos que tenga acumulados de toda su red y después de un año inactivo perderá su código de empresario independiente y el derecho al uso del backoffice.</p>
                            </div>
                        </div>

                        <div class="row row-pago-act">
                            <div class="col-12 px-0 pb-4">
                                <h4 class="label-pago">Pago para activar</h4>
                            </div>
                            <div class="col-md-6">
                                <div class="row row-pago-info">
                                    <div class="col-6 px-0">
                                        <p class="text-left">Valor del paquete</p>
                                        <p class="text-left retr1">Total en BTC</p>
                                    </div>
                                    <div class="col-6 px-0">
                                        <p class="text-right">$499 USD</p>
                                        <p class="text-right"><img src="../imagen/btc-blue.png"> 0.6832728</p>
                                    </div>
                                    <div class="col-12 px-0 pt-4">
                                        <p class="text-left"><b>Vínculo a billetera</b></p>
                                        <p class="txt-copy">Xyewgjhbfnoñwiefwenfñ <img src="../imagen/copiar.png"></p>
                                    </div>
                                    <div class="col-12 px-0 pt-4">
                                        <p class="text-left"><b>¿Vas a hacer tu pago con otra billetera?</b></p>
                                        <input type="text" class="form-control" placeholder="Ingresa el hash de confirmación">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row row-secund qrpago">
                                    <div class="col-sm-3 px-0">
                                        <img src="../imagen/Qr.png" class="QR">
                                    </div>
                                    <div class="col-sm-9 px-2">
                                        <p class="textqr"><b>Tiempo para el pago</b><br> 29m 55s</p>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<?php include '../include/footer.php'; ?>
<!-- include general js -->
<?php include '../include/include-js.php'; ?>
<script src="../js/controllers/tickets/tickets-venta.js"></script>
<script src="../js/controllers/tickets/tickets-compra.js"></script>


</html>
<!-- Modal ver detalles transaccion -->
<div class="modal fade" id="modal-detalles-trans" tabindex="-1" role="dialog" aria-hidden="true">
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
                <div class="row row-form4">
                    <div class="col-12 titulo">
                        <i class="fas fa-info-circle"></i>
                        <h5 class="_trans925">Detalles de transacción</h5>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6 ">
                        <p class="_trans926">Hash de transacción</p>
                        <input type="text" class="form-control detalles_hash" readonly>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <p class="trans0">Descripción</p>
                        <input type="text" class="form-control detalle_descripcion" readonly>

                    </div>

                    <div class="mb-0 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <p class="_trans824">Monto Enviado</p>
                        <input type="text" class="form-control detalle_monto" readonly>

                    </div>
                    <div class="mb-0 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <p class="trans46_">Fecha</p>
                        <input type="text" class="form-control detalle_fecha" readonly>

                    </div>
                </div>
                <div class="content-button">
                    <button class="btn-cerrar _trans112" data-dismiss="modal"></button>
                </div>

            </div>
        </div>
    </div>
</div>