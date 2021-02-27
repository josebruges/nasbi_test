<!-- Mis wallets -->
<div class="tab-pane fade show active" id="ref-wallets" role="tabpanel" aria-labelledby="id-wallets">
    <div class="row pb-5">
        <div class="col-12 ">
            <h3 class="title-section titulo_bonos trans35_"></h3>
        </div>

        <div class="col-sm-6 col-md-4 nasbi_gold">
            <div class="row row-card-wallets">
                <div class="col-12 px-1">
                    <h2 class="trans37_ wallet-title-header"></h2>
                </div>
                <div class="col-6 px-1">
                    <p class="label-saldo trans_159"><img loading="lazy" src="../imagen/logo-mtd.png" /></p>
                </div>
                <div class="col-6 px-1 valoresdesaldo"></div>
                <div class="col-12 px-0">
                    <div class="row row-btn" style="justify-content: center;align-items: center;">
                        <div class="col-6 px-1">
                            <button class="btn2 recargar_gold trans_206"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-md-4 nasbi_blue">
            <div class="row row-card-wallets">
                <div class="col-12 px-1">
                    <h2 class="trans36_ wallet-title-header"></h2>
                </div>
                <div class="col-6 px-1">
                    <p class="label-saldo trans_159"><img loading="lazy" src="../imagen/logo-mtd.png" /></p>
                </div>
                <div class="col-6 px-1 valoresdesaldoblue"></div>

                <div class="col-12 px-0">
                    <div class="row row-btn" style="justify-content: center;align-items: center;">
                        <div class="col-6 px-1">
                            <button class="btn2 recargar_blue trans_206"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- Modal info opcion recarga -->
<div class="modal fade" id="modal-info-opcion-recarga" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="Nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-titleEntrega">
                    <div class="col-12">
                        <h5 class="label-notifc trans_150"></h5>
                        <p class="trans_151 mx-0 mb-4"></p>
                        <div class="row row-rcrgr">

                            <!-- 
                            NO BORRAR - Oculto hasta que se pueda usar peers2win.com
                            <div class="col-sm-6" style="margin: auto !important;">
                                <a href="https://peers2win.com" target="_blank">
                                    <img loading="lazy" src="../imagen/Logo-peertowin-azul.png" class="icon-option-pay-2" alt="peer2win.com - Nasbi.com">
                                    <p class="wallet-sub-titles"></p>
                                </a>
                            </div>
                            -->



                            <div class="col-sm-6" style="margin: auto !important;">
                                <a href="https://nasbi.com/content/contacto.php" target="_blank">
                                    <img loading="lazy" src="../imagen/logo-tips.png" class="icon-option-pay" alt="Pay U - Nasbi.com">
                                    <p class="wallet-sub-titles trans_310"></p>
                                </a>
                            </div>
                            <div class="col-sm-6 opc_recarga_blue">
                                <a data-dismiss="modal" aria-label="Close" class="modal-info-opcion-recarga-btn">
                                    <img loading="lazy" src="../imagen/tarjeta-credito.png" class="icon-option-pay" alt="Pay U - Nasbi.com">
                                    <p class="wallet-sub-titles trans_152"></p>
                                </a>
                            </div>
                            
                        </div>

                        <div class="contn-entrega">
                            <button class="btnsi trans_01" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal info especificar cantidad a recargar -->
<div class="modal fade" id="modal-info-cantidad-recarga" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" src="../imagen/logo-modal.png" class="logo-modal" alt="Nasbi.com">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-titleEntrega">
                    <div class="col-12">
                        <h5 class="trans_153"></h5>

                        <p class="trans_154"></p>

                        <div class="recarga-nasbi">
                            <div class="row">
                                <div class="col-12 secondlabel">
                                    <div class="row">
                                        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 paddingright">
                                            <div class="container-select-nasbi contain-selct02-nasbi">
                                                <input class="form-control __maskUsd__ marginmoneda wallets__recarga__input__localmoney trans_155__ph" placeholder="Cantidad en" value="0" type="tel" maxlength="50" />

                                                <span class="caret"></span>

                                                <input class="flotantes monfiat wallets__recarga__localmoney" readonly value="COP" type="text" />

                                            </div>
                                        </div>

                                        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 nopaddingright">
                                            <div class="container-select-nasbi contain-selct02-nasbi">
                                                <input class="form-control __maskCripto__ marginmoneda wallets__recarga__input__coin trans_156__ph" placeholder="Cantidad de bonos" value="0" type="tel" maxlength="50" />

                                                <span class="caret"></span>

                                                <span class="flotantes">
                                                    <img loading="lazy" src="" class="wallets__recarga__img wallets__recarga__coin" alt="Nasbi.com">
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="col-12">
                        <button class="btnsi btn-transferir-nasbi modal-info-cantidad-recarga-btn" type="button">

                            <span class="spinner-border spinner-border-sm modal-info-cantidad-recarga-btn__spinner" role="status" aria-hidden="true" style="display: none;"></span>

                            <span class="trans_158">Enviar</span>
                        </button>

                        <!-- <button class="btnsi btn-transferir-nasbi modal-info-cantidad-recarga-btn trans_158" data-dismiss="modal" aria-label="Close">Adquirir mis bonos Nasbi</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Formulario Pay U Latam -->
<?php include '../include/form-payu.php'; ?>