 <!-- Mis Tickets Venta -->
 <div class="tab-pane fade show active" id="ref-venta-tickets" role="tabpanel" aria-labelledby="id-venta-tickets">
     <div class="row">
         <div class="col-12">
             <h3 class="title-section _trans192">Tickets de Venta</h3>
         </div>
     </div>

     <div class="row row-card-ticket">
         <div class="col-lg-9 px-2">
             <div class="row row-new-tickets">
                 <div class="col-md-6 px-1">
                    <div class="card-tiket">
                        <img src="../imagen/nasbi-tickets/svg/Tickets-platinum.svg">
                        <h1 class="platinum">0</h1>
                        <h3>Tickets <br>PLATINUM</h3>
                    </div>
                 </div>
                 <div class="col-md-6 px-1">
                    <div class="card-tiket">
                        <img src="../imagen/nasbi-tickets/svg/Tickets-gold.svg">
                        <h1 class="gold">0</h1>
                        <h3>Tickets <br>GOLD</h3>
                    </div>
                 </div>
                 <div class="col-md-6 px-1">
                    <div class="card-tiket">
                        <img src="../imagen/nasbi-tickets/svg/Tickets-silver.svg">
                        <h1 class="silver">0</h1>
                        <h3>Tickets <br>SILVER</h3>
                    </div>
                 </div>
                 <div class="col-md-6 px-1">
                    <div class="card-tiket">
                        <img src="../imagen/nasbi-tickets/svg/Tickets-bronze.svg">
                        <h1 class="bronze"> 0</h1>
                        <h3>Tickets <br>BRONZE</h3>
                    </div>
                 </div>
             </div>
         </div>
         <div class="col-lg-3 px-2">
            <div class="card-total">
                <h1 class="total"> 0</h1>
                <h3 class="_trans196">Tickets Totales</h3>
            </div>
         </div>


        <!-- <div class="card-tiket tickt2">
            <div class="divSub">
                <h1 class="diamond"> 0</h1>
                <h3>Tickets <br>DIAMOND</h3>
            </div>
        </div> -->
    </div>

     <div class="row pt-5 pt-md-0">
         <div class="col-sm-6 col-md-4 px-2">
             <div class="input-group grouo-fecha">
                 <div class="input-group-prepend">
                     <label class="input-group-text"><b class="_trans194">Filtrar por:</b> &nbsp;<span class="_trans195">Referencia</span></label>
                 </div>
                 <select class="form-control tiquets_referencias"></select>
             </div>
         </div>
        <div class="col-sm-6 col-md-4 px-2">
             <div class="input-group grouo-fecha">
                 <div class="input-group-prepend">
                     <label class="input-group-text">&nbsp;<span class="_trans197">Fecha de caducidad</span></label>
                 </div>
                 <!-- <input placeholder="yyyy-mm-dd" class="form-control fecha_transaccion datepicker"> -->
                 <input autocomplete="off" type="text"  class=" __maskDate__ form-control fecha_transaccion datepicker"> 
                 
             </div>
         </div>
         <div class="col-sm-12 col-md-4 px-2">
             <div class="input-group grouo-fecha">
                 <button class="btn_limpiar btnagg _trans48">Limpiar</button>
             </div>
         </div>


         <div class="col-12">
             <div class="table-responsive responsive-table">
                 <table class="table table-list ">
                     <thead>
                         <tr>
                             <th class="_trans49">Referencia</th>
                             <th class="_trans50">Descripción</th>
                             <th class="_trans51">Código</th>
                             <th class="_trans52">Fecha creación</th>
                         </tr>
                     </thead>
                     <tbody class="tabla_tiquets">

                     </tbody>
                 </table>

             </div>
             <div class="paginacion">

             </div>
         </div>

         <div class="row tiquets__list__nodata" style="display: none;">
             <div class="content__nodata">
                 <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                 <p class="label-title_nodata trans02_">No se encontraron tiquets.</p>
             </div>
         </div>
     </div>

     <div class="transacciones pb-5">
         <div class="row">
             <div class="col-12">
                 <h3 class="title-section _trans53">Transacciones de Tickets de Venta</h3>
             </div>
         </div>
         <div class="row pt-5 pb-5">
             <div class="col-sm-6 col-md-4 px-2">
                 <div class="input-group grouo-fecha">
                     <div class="input-group-prepend">
                         <label class="input-group-text"><b class="_trans194">Filtrar por:</b> &nbsp;<span class="_trans195">Referencia</span></label>
                     </div>
                     <select class="form-control trans_tiquets_referencias"></select>
                 </div>
             </div>
             <div class="col-sm-6 col-md-4 px-2">
                 <div class="input-group grouo-fecha">
                     <div class="input-group-prepend">
                         <label class="input-group-text">&nbsp;<span class="_trans197">Fecha de caducidad</span></label>
                     </div>
                     <!-- <input placeholder="yyyy-mm-dd" class="form-control trans_fecha_transaccion datepicker"> -->
                     <input autocomplete="off" type="text"  class=" __maskDate__ form-control trans_fecha_transaccion datepicker"> 
                 </div>
             </div>
             <div class="col-sm-12 col-md-4 px-2">
                 <div class="input-group grouo-fecha">
                     <button class="trans_btn_limpiar btnagg _trans48">Limpiar</button>
                 </div>
             </div>


             <div class="col-12">
                 <div class="table-responsive responsive-table">
                     <table class="table table-list ">
                         <thead>
                             <tr>
                                 <th class="_trans50">Descripción</th>
                                 <th class="_trans54">Cantidad</th>
                                 <th class="_trans49">Referencia</th>
                                 <th class="_trans55">Fecha</th>
                                 <th></th>

                             </tr>
                         </thead>
                         <tbody class="trans_tabla_tiquets">

                         </tbody>
                     </table>

                 </div>
                 <div class="trans_paginacion">

                 </div>
             </div>
             <div class="row trans__list__nodata" style="display: none;">
                 <div class="content__nodata">
                     <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                     <p class="label-title_nodata trans02_">No se encontraron transacciones.</p>
                 </div>
             </div>
         </div>
     </div>
 </div>