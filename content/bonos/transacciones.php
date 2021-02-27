<!-- Transacciones -->
<div class="tab-pane fade" id="ref-transacciones" role="tabpanel" aria-labelledby="id-transacciones">
    <div class="row pb-5">
        <div class="col-12 ">
            <h3 class="title-section transaciones_titu trans227_">E-wallet</h3>
            <div class="div-select">
                <p><span class="trans39_"></span><img loading="lazy" src="../imagen/tipo-wallet.png"></p>
                <select class="select_moneda form-control  ">
                    
                </select>
            </div>
            
            <div class="row mb-5">
                <div class="col-sm-7">
                    <div class="input-group grouo-fecha">
                        <div class="input-group-prepend">
                            <label class="input-group-text trans_57"></label>
                        </div>
                        <!-- <input type="date" id="#fecha_trans" name="fecha_trans" class="form-control fechaparaelfiltro"> -->
                        <input autocomplete="off" type="text" class="form-control input_datos __maskDate__ _fecha_trans_fil" readonly></input>
                    </div>
                </div>
                <div class="col-sm-5">
                    <button class="btnlimpiar boton_limpiar_fecha trans235_" >clear</button>
                </div>
            </div>
            
            
            
            
            <div class="table-responsive"> <!--class="table-responsive responsive-table1" para quue haga scroll-->
                <table class="table table-transacciones">
                    <thead>
                        <tr>
                            <th class="trans44_">Fuente de pago</th>
                            <th class="trans45_">Miembro asociado</th>
                            <th class="trans48">Cantidad</th>
                            <th class="trans46_">Fecha</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="transacciones__list">
                        
                    </tbody>
                </table>
            </div>
            <div class="botones__paginacion_trans col-sm-6 col-lg-3 col-xl-4 px-1" >
                <nav aria-label="Page navigation example paginacion ">
                    <ul class="pagination  paginacion_numeros_trans ">
                        
                    </ul>
                </nav>  
            </div>
            <div class="list__transaciones__pagination"></div>
            
            <div class="transacciones__list__nodata" style="display: none;">
                <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                <p class="label-title_nodata trans43_">Ningúna transaccion por aquí.</p>
                <label class="trans_45">Regresa más tarde.</label>
                
            </div> 
        </div>
    </div>
</div>

