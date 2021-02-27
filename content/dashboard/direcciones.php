<!-- Direcciones -->
<div class="tab-pane fade" id="ref-direcciones" role="tabpanel" aria-labelledby="id-direcciones">
    <div class="contnConf">
        <div class="row">
            <div class="col-12">
                <div class="row row-crear-direct">
                    <div class="col-sm-6">
                        <h3 class="title-section dire_titu_mis_cuentas trans18 mb-4">direcciones</h3>
                        <div class="input-group select_pais_div">
                            <div class="input-group-prepend">
                                <span class="input-group-text trans15"></span>
                            </div>
                            <select class="form-control select__pais_dire" data-live-search="true" disabled></select>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <p class="btn-crear-direccion title-direcciones __btncreardireccion_cuenta trans14"></p>
                    </div>
                </div>

                <div class="row row-form1 __alldirecciones_cuenta"></div>

                <div align="center" class="direcciones__list__nodata">
                    <img loading="lazy" src="../imagen/404.svg" alt="nasbi.com">
                    <p class="label-title_nodata trans47_">Ningúna transaccion por aquí.</p>
                    <br><br><br><br><br>
                </div>
            </div>
        </div>
    </div>
</div>




<!-- Modal confirmar si no -->
<div class="modal fade" id="modal-confirmar-eliminar" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close no_eliminar_direccion" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-inf">
                    <h4 class="pregunta_de_eliminar">¡Buen trabajo!</h4>
                </div>
                <div class="contn-entrega">

                    <button class="btnno trans_02  no_eliminar_direccion">Cancelar</button>
                    <button class="btnsi trans_01  si_eliminar_direccion" data-toggle="modal">Aceptar</button>


                </div>
            </div>
        </div>
    </div>
</div>



<!-- Modal aceptar general -->
<div class="modal fade" id="modal-aceptar-ge" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content content-modal">
            <div class="modal-body">
                <div class="row">
                    <div class="col-9">
                        <img loading="lazy" alt="nasbi.com" src="../imagen/logo-modal.png" class="logo-modal">
                    </div>
                    <div class="col-3">
                        <button type="button" class="close cerra_modal_acep_ge" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>

                <div class="row row-titleEntrega">
                    <div class="col-12">
                        <h5 class="titulo_modal_acep_ge">Información de tú orden</h5>
                        <p><span class="mensaje_ge_aceptar"> </span></p>
                        <div class="contn-entrega">
                            <button class="btnsi aceptar_modal_nasbi trans_01" data-dismiss="modal">Aceptar</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>