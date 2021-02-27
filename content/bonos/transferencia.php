 <!-- Transferencias -->
 <div class="tab-pane fade" id="ref-transaferencias" role="tabpanel" aria-labelledby="id-transaferencias">
    <div class="row pb-5">
        <div class="col-12">
            <h3 class="title-section">Otros Métodos de pago</h3>
        </div>

        <div class="col-12 px-0">
            <div class="row row-form">
                <div class="col-12">
                    <p class="labelgray">Selecciona el método de pago</p>
                    <p class="text-pago">
                        <span><img src="../imagen/tarjeta-credito.png"> Tarjeta de crédito <input type="radio" name="01"></span>
                        <span><img src="../imagen/paypal.png"> Paypal <input type="radio" name="01"></span>
                    </p>
                </div>

                <div class="col-md-7 col-lg-5">
                    <p class="label-form-sect">Información de la tarjeta</p>
                    <p class="label-text label001">Número de la tarjeta</p>
                    <input type="number" class="form-control inputs" placeholder="Número de la tarjeta">
                </div>
                
                <div class="col-12 px-0">
                    <div class="row">
                        <div class="col-md-9 col-lg-7 px-0">
                            <div class="row">
                                <div class="col-md-4">
                                    <p class="label-text">Fecha de expiración</p>
                                    <select class="form-control inputs">
                                        <option>Mes</option>
                                        <option>Enero</option>
                                    </select>
                                </div>

                                <div class="col-md-4">
                                    <p class="label-text">&nbsp;</p>
                                    <select class="form-control inputs">
                                        <option>Año</option>
                                        <option>2020</option>
                                    </select>
                                </div>

                                <div class="col-md-4">
                                    <p class="label-text">CVC Código</p>
                                    <input type="text" class="form-control inputs" placeholder="CVC Código">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-12 px-0">
                    <div class="row">
                        <div class="col-md-9 col-lg-7 px-0">
                            <div class="row">
                                <div class="col-12">
                                    <p class="label-form-sect pt-3 pb-2">Información de facturación</p>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control inputs" placeholder="Nombres">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control inputs" placeholder="Apellidos">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control inputs" placeholder="Dirección de residencia">
                                </div>
                                <div class="col-md-6">
                                    <input type="number" class="form-control inputs" placeholder="Teléfono">
                                </div>
                                <div class="col-12">
                                    <button class="btningresar">Ingresar tarjeta</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>