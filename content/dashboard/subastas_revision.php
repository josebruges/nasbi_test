<!-- Publicaciones -->
<div class="tab-pane fade" id="ref-revision-subastas" role="tabpanel" aria-labelledby="id-revision-subastas">
    <div class="row">
        <div class="col-sm-6">
            <h3 class="title-section">Subastas</h3>
        </div>
    </div>
    <!-- Carousel publicaciones -->
    <div class="row row-filtro row-selects">
        <div class="col-12">
            <div class="input-group group-input group-input-edit">
                <div class="input-group-prepend">
                    <span class="input-group-text"><img loading="lazy" src="../imagen/filtro.png"> <span class="_trans312">Filtrar y ordenar</span></span>
                </div>
                <div class="content-input content-input-edit">
                    <span class="input-group-addon"><i class="fas fa-search"></i></span>
                    <input type="text" onkeyup="buscar()" class="form-control input_buscar m-0" placeholder="Buscar por título">
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <h5 class="title-section">Todas las subastas</h5>
        </div>
        <div class="col-12 px-0">
            <div class="table-responsive responsive-table-publicaciones">
                <table class="table table-publicaciones">
                    <thead>
                    <tr>
                        <th class="">Artículo</th>
                        <th class="">Cantidad</th>
                        <th class="">Tipo</th>
                        <th class="">Moneda</th>
                        <th class="">Inscritos</th>
                        <th class="">Precio</th>
                        <th class="">Apostadores</th>
                        <th class="">Estado</th>
                        <th class="">Fecha inicio</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <div class="row loading-spinners content__loadingSpinner_subastas" style="display: none;">
                        <div class="col-lg-12"><br><br><br></div>
                        <div class="col-lg-12">
                            <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <div class="spinner-grow spinner-grow-sm" style="width: 1rem; height: 1rem;" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                    <tbody class="mis_publicaciones__tabla__revision_subastas">

                    <!-- <tr>
                        <td>
                            <div class="flex-name">
                                <div class="containe-fto">
                                    <img src="../imagen/product.jpg" class="img-articulo">
                                </div>
                                <p class="txt-numb">#2739426</p>
                                <p class="name-product">Apple Watch Serie 5 (1)</p>
                                <p class="visits">139 visitas 1 venta Finaliza en 12 días</p>
                            </div>
                        </td>
                        <td>$1000 USD</td>
                        <td>1</td>
                        <td>Activa</td>
                        <td>Moderada</td>
                        <td>
                            <div class="dropdown divdropdownfiltro">
                                <button class="drop-filtro drop-table dropdown-toggle" type="button" id="opciones" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Opciones</button>
                                <div class="dropdown-menu" aria-labelledby="opciones">
                                    <a class="dropdown-item" href="modificar-publicacion.php">Modificar</a>
                                    <a class="dropdown-item" data-toggle="modal" data-target="#modal-publicar-nuevo">Publicar de nuevo</a>
                                    <a class="dropdown-item" data-toggle="modal" data-target="#modal-eliminar-publicacion">Eliminar publicacion</a>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="cont-btn" -metdo>
                                <button class="button-modificar">Compartir</button>
                                <span><input type="checkbox"></span>
                            </div>
                        </td>
                    </tr> -->
                    </tbody>

                </table>
                <div class="row products__listp__nodata2" style="display: none;">
                    <div class="content__nodata">
                        <img loading="lazy" class="imagen__nodata" src="../imagen/404.svg" alt="nasbi.com">
                        <p class="label-title_nodata _trans126 ">Ningún producto por aquí.</p>
                        <label class="trans_45">Regresa más tarde.</label>
                    </div>
                </div>
            </div>
            <div class="row paginacion_publicaciones__revision_subastas">

            </div>
        </div>
    </div>
</div>