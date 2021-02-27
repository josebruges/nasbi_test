<!-- Configuracion -->
<div class="tab-pane fade" id="ref-configuracion" role="tabpanel" aria-labelledby="id-configuracion">
    <div class="contnConf">
        <div class="row">
            <div class="col-md-9">
                <h3 class="title-section _trans117">Configuraciones</h3>
            </div>
            <div class="col-md-3">
                <button class="btn-cambiar-contrasena disabled_usuario _trans886 " role="button">Desactivar</button>
            </div>
        </div>
        <div class="row row-foms2">
            <div class="col-12">
                <h5 class="title-section _trans119">Inicio de Sesión</h5>
            </div>
            <div class="col-md-6 col-xl-3">
                <p class="label-form _trans439"> Nombre de usuario </p>
                <p class="text-modificar btn-usuario _trans76" onclick="mostrar('input-usuario', 'label-usuario', 'btn-usuario', 0)">Modificar</p>
                <label class="label label-usuario"></label>
                <input type="text" class="form-control input-usuario _trans120__ph" placeholder="Usuario">
            </div>
            <div class="col-md-6 col-xl-3">
                <p class="label-form trans_25">Correo electronico</p>
                <p></p>
                <!-- <p class="text-modificar btn-correo _trans76" onclick="mostrar('input-correo', 'label-correo', 'btn-correo',0)">Modificar</p> -->
                <label class="label label-correo"></label>
                <input type="email" class="form-control input-correo _trans121__ph" placeholder="Correo eléctronico">
            </div>
            <div class="col-md-6 col-xl-3">
                <button onclick="abrirModalContraseña()" class="btn-cambiar-contrasena _trans77 " role="button">CAMBIAR CONTRASEÑA</button>
            </div>
            <div class="col-md-6 col-xl-3">
                <button onclick="abrirModalClave()" class="btn-cambiar-contrasena trans171 " role="button">CAMBIAR CONTRASEÑA</button>
            </div>

            <div class="col-12">
                <h5 class="title-section _trans78">Datos personales</h5>
            </div>
            <div class="col-md-6 col-lg-3">
                <p class="label-form _trans440">Nombre y Apellido</p>
                <p class="text-modificar btn-nombre _trans76" onclick="mostrar('input-nombre', 'label-nombre', 'btn-nombre',0)">Modificar</p>
                <label class="label label-nombre"></label>
                <input type="text" class="form-control input-nombre _trans122__ph" placeholder="Nombre y apellido">
            </div>

            <div class="col-md-6 col-lg-3">
                <p class="label-form _trans105">Telefono</p>
                <p class="text-modificar btn-telefono _trans76" onclick="mostrar('input-telefono', 'label-telefono', 'btn-telefono',0)">Modificar</p>
                <label class="label label-telefono"></label>
                <input type="number" class="form-control input-telefono _trans123__ph" placeholder="Teléfono">
            </div>
            <div class="col-md-6 col-lg-3">
                <p class="label-form _trans441">Pais de Residencia</p>
                <!-- <p class="text-modificar btn-pais _trans76" onclick="mostrar('input-pais', 'label-pais', 'btn-pais', 1)">Modificar</p> -->
                <p class="text-modificar btn-pais "></p>
                <label class="label mt-3 label-pais"></label>
                <select class="input-pais _trans124__ph" style="display: none;" placeholder="Pais de Residencia"></select>

            </div>
            <div class="col-md-6 col-lg-3">
                <p class="label-form _trans442">Moneda Fiat</p>
                <!-- <p class="text-modificar btn-fiat _trans76" onclick="mostrar('input-fiat', 'label-fiat', 'btn-fiat',1)">Modificar</p> -->
                <p class="text-modificar btn-fiat "></p>
                <label class="label mt-3 label-fiat"></label>
                <select class="input-fiat _trans125__ph" style="display: none;" placeholder="Moneda Fiat"></select>

            </div>

            <!-- <div class="col-12">
                <h5 class="title-section">
                    <span class="_trans80"></span>
                    <span>
                        <p class="text-modificar _trans76 px-4" onclick="showModalDirecciones()">Modificar</p>
                    </span>
                </h5>
            </div>

            <div class="col-xl-12 px-0">
                <div class="row row-public publc2 d-flex flex-nowrap justify-content-around">
                    <div class="row row-form1 info_activo">
                        <div class="col-12">
                            <p class="label-paso title-direcciones __vermisdirecciones"></p>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <p class="trans15">País</p>
                            <input type="text" class="form-control __pais" placeholder="País" readonly>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <p class="trans16">Departamento</p>
                            <input type="text" class="form-control __departamento" placeholder="Departamento" readonly>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <p class="trans17">Ciudad</p>
                            <input type="text" class="form-control __ciudad" placeholder="Ciudad" readonly>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <p class="trans18">Dirección</p>
                            <input type="text" class="form-control __direccion" placeholder="Dirección" readonly>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <p class="trans19">Código Postal</p>
                            <input type="text" class="form-control __zip" placeholder="Código Postal" readonly>
                        </div>
                    </div>
                </div>
            </div> -->

            <div class="col-md-6 col6idioma">
                <h5 class="title-section "><span class="_trans261">Idioma</span> <span class="spinner-border spinner-border-sm m-3 spiner_guardar_idioma" style="display: none;" role="status" aria-hidden="true"></span></h5>
                <select class="form-control select-idioma ">
                    <option value="ES">ES</option>
                    <option value="EN">EN</option>
                </select>
            </div>
            <div class="col-md-6">
                <h5 class=" title-section _trans110">Activar notificaciones</h5>
                <label class="switch">
                    <input type="checkbox" id="doblefactorcheck">
                    <div class="slider round">
                    </div>
                </label>
            </div>

            <div class="col-md-12">
                <h5 class="title-section _trans109">Escoge un avatar:</h5>
                <div class="radiomix">
                    <label for="input-1">
                        <img loading="lazy" src="../imagen/avatar/0.png" alt="avatar-1-nasbi.com">
                        <input type="radio" name="avatar" id="input-1" value="0">
                    </label>
                    <label for="input-2">
                        <img loading="lazy" src="../imagen/avatar/1.png" alt="avatar-2-nasbi.com">
                        <input type="radio" name="avatar" id="input-2" value="1">
                    </label>
                    <label for="input-3">
                        <img loading="lazy" src="../imagen/avatar/2.png" alt="avatar-3-nasbi.com">
                        <input type="radio" name="avatar" id="input-3" value="2">
                    </label>
                    <label for="input-4">
                        <img loading="lazy" src="../imagen/avatar/3.png" alt="avatar-4-nasbi.com">
                        <input type="radio" name="avatar" id="input-4" value="3">
                    </label>
                    <label for="input-5">
                        <img loading="lazy" src="../imagen/avatar/4.png" alt="avatar-5-nasbi.com">
                        <input type="radio" name="avatar" id="input-5" value="4">
                    </label>
                    <label for="input-6">
                        <img loading="lazy" src="../imagen/avatar/5.png" alt="avatar-6-nasbi.com">
                        <input type="radio" name="avatar" id="input-6" value="5">
                    </label>
                    <label for="input-7">
                        <img loading="lazy" src="../imagen/avatar/6.png" alt="avatar-7-nasbi.com">
                        <input type="radio" name="avatar" id="input-7" value="6">
                    </label>
                </div>
            </div>

            <div class="col-xl-12 pt-5">
                <button class="btnsopcs guardar_cambios "><span class="_trans111">GUARDAR CAMBIOS</span><span class="spinner-border spinner-border-sm m-2 spiner_guardar_cambios" style="display: none;" role="status" aria-hidden="true"></span> </button>
            </div>
            <div class="col-12 ">
                <h6 class="title-section trans264">Dispositivos Conectados</h6>
            </div>
            <div class="row content_dispositivos">
                <div class="col-12">
                    <p class="label-form">computador dell <span>aqui va una fecha </span></p>
                </div>
            </div>
        </div>

    </div>
</div>




<!-- Modal ver direcciones-->
<div class="modal fade" id="modal-direcciones" tabindex="-1" role="dialog" aria-hidden="true">
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
                <div class="row">
                    <div class="col-12">
                        <label class="title-anadir  title-direcciones __btncreardireccion trans14"></label>
                    </div>
                </div>
                <!-- <div class="row row-form1 __alldirecciones"> -->
                <div class="row row-form3 __alldirecciones">
                </div>
                <div class="contant-button02">
                    <button class="btncomrar _trans112" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal crear direccion-->
<div class="modal fade" id="modal-direcciones-crear" tabindex="-1" role="dialog" aria-hidden="true">
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
                <div class="row row-form1">
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="text" class="form-control __maskFloat__ __paisnewdireccion" placeholder="pais" disabled readonly>
                        <p class="trans15">País</p>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6 __divdepnewdireccion">
                        <!-- <select class=" __depnewdireccion select-plataforma "></select>
                            <p class="trans16">Departamento</p> -->
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="text" class="form-control __ciudadnewdireccion pac-target-input trans_28__ph" placeholder="Ciudad" autocomplete="off">
                        <p class="trans17">Ciudad</p>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="text" class="form-control __dirnewdireccion _trans450__ph" placeholder="Dirección">
                        <p class="trans18">Dirección</p>
                    </div>
                    <div class="mb-0 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="text" class="form-control __codigopostalnewdireccion _trans451__ph" placeholder="Código postal">
                        <p class="trans19">Código postal</p>
                    </div>
                    <div class="mb-0 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="checkbox" class="form-control __activanewdireccion">
                        <p class="trans31">Activar</p>
                    </div>
                </div>
                <div class="contant-button02">
                    <button class="btncomrar _trans112" data-dismiss="modal">Cerrar</button>
                    <button class="btntikets __save_detalles_envio "><span class="trans118_">Confirmar</span><span class="spinner-border spinner-border-sm spiner_crear_direccion" style="display: none;" role="status" aria-hidden="true"></span></button>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal ver tarjetas-->
<div class="modal fade" id="modal-tarjetas" tabindex="-1" role="dialog" aria-hidden="true">
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
                <div class="row">
                    <div class="col-12">
                        <label class="title-anadir title-direcciones __btnanadirtarjeta _trans438">Añadir tarjeta</label>
                    </div>
                </div>
                <!-- <div class="row row-form1 __alldirecciones"> -->
                <div class="row row-form3 __alltarjetas">
                </div>
                <div class="contant-button02">
                    <button class="btncomrar _trans112" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Modal añadir tarjeta-->
<div class="modal fade" id="modal-tarjeta-crear" tabindex="-1" role="dialog" aria-hidden="true">
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
                <div class="row row-form1">
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <select class=" __tipoTarjeta" placeholder="Numero de tarjeta"></select>
                        <p class="_trans84">Tipo de tarjeta</p>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6 ">
                        <input type="number" class="form-control  __numeroTarjeta _trans443__ph" placeholder="Numero">
                        <p class="_trans85">Número de tarjeta</p>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="number" maxlength="3" class="form-control __ccvTarjeta _trans444__ph" placeholder="CCV">
                        <p class="_trans86">CCV</p>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="number" min="1" max="12" class="form-control __mesTarjeta " placeholder="12">
                        <p class="_trans87">Mes de expiracion</p>
                    </div>
                    <div class="mb-0 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="number" class="form-control __anoTarjeta " placeholder="2021">
                        <p class="_trans88">Año de expiración</p>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="text" class="form-control  __nombreTarjeta _trans445__ph" placeholder="Nombre del titular">
                        <p class="_trans89">Nombre del Titular</p>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="text" class="form-control  __apellidoTarjeta _trans446__ph" placeholder="Apellido del titular">
                        <p class="_trans90">Apellido del titular</p>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="text" class="form-control  __direccionTarjeta _trans447__ph" placeholder="Dirección del titular">
                        <p class="_trans91">Dirección del titular</p>
                    </div>
                    <div class="mb-4 col-12 col-sm-12 col-md-12 col-lg-6 col-xg-6">
                        <input type="number" class="form-control  __telefonoTarjeta _trans449__ph" placeholder="Telefono del titular">
                        <p class="_trans92">Telefono del titular</p>
                    </div>

                </div>
                <div class="contant-button02">
                    <button class="btncomrar _trans112" data-dismiss="modal">Cerrar</button>
                    <button class="btntikets __save_detalles_tarjeta "><span class="trans118_">Confirmar</span><span class="spinner-border spinner-border-sm spiner_crear_direccion" style="display: none;" role="status" aria-hidden="true"></span></button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Cambiar contraseña-->
<div class="modal fade" id="modal-cambiar-contrasena" tabindex="-1" role="dialog" aria-hidden="true">
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
                <div class="row row-titleEntrega row-clavess row-form1">
                    <div class="col-12">
                        <h5 class="_trans878 mt-0 mb-5">Ingresa tu Contraseña</h5>
                    </div>
                    <div class="col-lg-4">
                        <p class="_trans200">Ingresa tu Contraseña</p>
                        <div class="input-group group-claves">
                            <input type="password" class=" form-control actual-contrasena">
                            <div class="input-group-prepend">
                                <button type="button" class="btn btn-link  btn_eye_contraActual" value="btnOff">
                                    <i class="icono_eye far fa-eye-slash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <p class="_trans201">Nueva Contraseña</p>
                        <div class="input-group group-claves">
                            <input type="password" class=" form-control nueva-contrasena">
                            <div class="input-group-prepend">
                                <button type="button" class="btn btn-link  btn_eye_nuevaContra" value="btnOff">
                                    <i class="icono_eye far fa-eye-slash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <p class="_trans202">Confirma Contraseña</p>
                        <div class="input-group group-claves">
                            <input type="password" class=" form-control confir-contrasena">
                            <div class="input-group-prepend">
                                <button type="button" class="btn btn-link  btn_eye_confirContra" value="btnOff">
                                    <i class="icono_eye far fa-eye-slash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="row row-form1 __alldirecciones"> -->
                <div class="contant-button02">
                    <button class="btncomrar _trans112" data-dismiss="modal">Cerrar</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="cambiar_contrasena "><span class="trans118_">Confirmar</span><span class="spinner-border spinner-border-sm spiner_cambiar_contra" style="display: none;" role="status" aria-hidden="true"></span></button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Cambiar Clave de transacciones-->
<div class="modal fade" id="modal-cambiar-clave" tabindex="-1" role="dialog" aria-hidden="true">
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
                <div class="row row-titleEntrega row-clavess row-form1">
                    <div class="col-12">
                        <h5 class="trans180 mt-0 mb-5">Ingresa tu Contraseña</h5>
                        
                        <div class="content-formss-clave">
                            <div class="sub-forms" id="antigua_clave">
                                <p class="trans172">Ingresa tu Contraseña</p>
                                <div class="input-group group-claves">
                                    <input type="password" class=" form-control actual-clave">
                                    <div class="input-group-prepend">
                                        <button type="button" class="btn btn-link  btn_eye_actualClave" value="btnOff">
                                            <i class="icono_eye far fa-eye-slash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="sub-forms" id="new_clave_id">
                                <p class="trans173">Nueva Contraseña</p>
                                <div class="input-group group-claves">
                                    <input type="password" class=" form-control nueva-clave">
                                    <div class="input-group-prepend">
                                        <button type="button" class="btn btn-link  btn_eye_nuevaClave" value="btnOff">
                                            <i class="icono_eye far fa-eye-slash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="sub-forms">
                                <p class="trans174">Confirma Contraseña</p>
                                <div class="input-group group-claves">
                                    <input type="password" class=" form-control confir-clave">
                                    <div class="input-group-prepend">
                                        <button type="button" class="btn btn-link  btn_eye_confirClave" value="btnOff">
                                            <i class="icono_eye far fa-eye-slash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="row row-form1 __alldirecciones"> -->
                <div class="contant-button02">
                    <button class="btncomrar _trans112" data-dismiss="modal">Cerrar</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="cambiar_clave"><span class="trans118_">Confirmar</span><span class="spinner-border spinner-border-sm spiner_cambiar_contra" style="display: none;" role="status" aria-hidden="true"></span></button>
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