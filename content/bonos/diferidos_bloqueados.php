<!-- diferidos y bloqueado -->
<div class="tab-pane fade" id="ref-blo_dif" role="tabpanel" aria-labelledby="id-blo_dif">
    <div class="row pb-5">
        <div class="col-12">
            <h3 class="title-section dif_blo_titu trans224_">E-wallet</h3>

            <div class="col-12 px-0">
                <div class="row row-selects-direridos">
                    <div class="col-md-4 px-sm-2">
                        <div class="div-select">
                            <p><span class="trans230_"><img loading="lazy" src="../imagen/tipo-wallet.png"></span></p>
                            <select class="select_tipo_blo_dif form-control  ">
                                <option value="1" class="trans229_"></option>
                                <option value="0" class="trans228_" ></option>
                            </select>
                        </div>
                    </div>

                    <div class="col-md-4 px-sm-2">
                        <div class="div-select">
                            <p><span class="trans39_"><img loading="lazy" src="../imagen/tipo-wallet.png"></span></p>
                            <select class="select_moneda_blo_dif form-control"></select>
                        </div>
                    </div>

                    <div class="col-md-4 px-sm-2">
                        <div class="div-select selectsTrsnss">
                            <p><span class="trans233_"><img loading="lazy" src="../imagen/tipo-wallet.png"></span></p>
                            <select class="select_tipo_trans_blo_dif form-control"></select>
                        </div>
                    </div>
                    
                    <div class="col-sm-7 px-sm-2">
                        <div class="input-group grouo-fecha " >
                            <div class="input-group-prepend">
                                <label class="input-group-text trans_57"></label>
                            </div>
                            <!-- <input type="date" data-date-format="AAAA/MM/DD" class="form-control datepicker fechaparaelfiltro_dif_blo"> -->
                            <input autocomplete="off" type="text"  class="__maskDate__  form-control input_datos fecha_dif_blo_fil " readonly > </input>
                        </div>
                    </div>
                    <div class="col-sm-5 px-sm-2">
                        <!-- <button class="btn btn-primary trans22_ buscar_dif_blo"></button> -->
                    <button class="btnlimpiar _trans48 limpiar_dif_blo"></button>
                    </div>
                </div>
            </div>

            
            <!--                                 
                <div class="input-group grouo-fecha">
                    <div class="input-group-prepend">
                        <label class="input-group-text trans_57"></label>
                    </div>
                    <input type="date" class="form-control fechaparaelfiltro">
                </div> -->
                
                <div class="table-responsive div-table-diferido"> <!--class="table-responsive responsive-table1" para quue haga scroll-->
                    <table class="table table-transacciones table-blo_dif">
                        <thead>
                            <tr>
                                <th class="trans230_">Fuente de pago</th>
                                <th class="_trans320">Fecha</th>
                                <th class="trans39_">Miembro asociado</th>
                                <th class="trans0">Fecha</th>
                                <th class="trans233_">Fecha</th>
                                <th class="trans46_">Fecha</th>
                                
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="blo_dif__list_result">
                            
                        </tbody>
                    </table>
                </div>
                
                <div class="dif_blo__pagination"></div>
                
                <div class="blo_dif__list__nodata" style="display: none;">
                    <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                    <p class="label-title_nodata trans231_">Ningúna transaccion por aquí.</p>
                    <label class="trans_45">Regresa más tarde.</label>
                    
                </div> 
            </div>
        </div>
    </div>
    
    <!-- <script src="../js/controllers/bonos/paginacion.js"></script> -->