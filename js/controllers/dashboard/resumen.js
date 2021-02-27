
estado_cualitativos_resumen = [];
let resumen_miscuentas = localStorage.getItem("mis_cuentas");
let lenguaje, data_json_clasificacion_nivel_resu;

$(document).ready(($event) => {
    esconder_nabvar_lateral_responsive();
    lenguaje = localLenguaje;
    $.getJSON(`../json/clasificacion_de_niveles_user_${lenguaje}.json`, (clasificacion_nivel_user) => {
        data_json_clasificacion_nivel_resu = clasificacion_nivel_user;
    });

    if (validarlogueado_2()) {
        if (!validarText(resumen_miscuentas) || resumen_miscuentas == ".sidenav_resumen") {
            $('.sidenav_resumen').click();
            funciones_a_llamar_para_arranque_de_resumen_user();
        }
    }

    $(".sidenav_resumen").click(($event) => {
        if (validarlogueado_2()) {
            // localStorage.setItem("mis_cuentas", ".sidenav_resumen");
            redirigir_opcion_mis_cuentas(".sidenav_resumen");
            funciones_a_llamar_para_arranque_de_resumen_user();
        }
    });

    $(".to_bonos_resumen").click(($event) => {
        localStorage.setItem("mis_bonos_subasta", null);
    });

    $(".compras_resumen_miscuentas").click(($event) => {
        $('.sidenav_compras').click();

    });

    // $(".ventas_resumen_miscuentas").click(($event) => {
    //    // $('.sidenav_ventas').click();
    //    validar_flujo_opcion_de_ventas_realizadas(); 

    // }); 

    $(".subastas_resumen_miscuentas").click(($event) => {
        validar_flujo_opcion_de_subasta();
    });

    $(".ventas_por_preparar_resumen").click(($event) => {
        validar_flujo_opcion_de_ventas_por_preparar();
    });



    $(".publicaciones_resumen_miscuentas").click(($event) => {
        $('.sidenav_publicaciones').click();

    });


    $(".ver_mas_resumen").click(($event) => {
        loadPage("datos-vendedor.php?uid=" + user.uid + "&empresa=" + user.empresa)
    });

    $(".mejores_ventas_resumen").click(($event) => {
        loadPage("estadistica-mejores-ventas.php")
    });

});


function funciones_a_llamar_para_arranque_de_resumen_user() {
    getresume_miscuentas();
    llenararray_resumen();
    getClasificacion_next_nivel();
    getClasificacion_next_nivel_comprador();
}


function validarlogueado_2() {
    if (validarText(user)) {
        return true;
    } else {
        loadPage("index.php?s=0")
    }

}



function agregar_loading_ge_publi(clase) {
    let span_loading_ge;
    span_loading_ge = `<span class="spiner_modificar_publi">&nbsp;</span><span class="spinner-border spinner-border-sm spiner_modificar_publi" role="status" aria-hidden="true"></span>`;
    $(clase).append(span_loading_ge);
}

function quitar_loading_ge_publi(clase) {
    $(clase).children(".spiner_modificar_publi").remove();
}


function llenararray_resumen() {
    estado_cualitativos_resumen = [
        { id: "ninguno", value: idioma.trans490_, tiempo_entrega_porcentaje: "0%" },
        { id: "malo", value: idioma.trans246_, tiempo_entrega_porcentaje: "70%" },
        { id: "regular", value: idioma.trans245_, tiempo_entrega_porcentaje: "75%" },
        { id: "bueno", value: idioma.trans244_, tiempo_entrega_porcentaje: "80%" },
        { id: "muybueno", value: idioma.trans243_, tiempo_entrega_porcentaje: "85%" },
        { id: "excelente", value: idioma.trans_03, tiempo_entrega_porcentaje: "90%" },
    ]
}





function getresume_miscuentas() {

    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
        }
    }
    quitar_loading_ge_publi('.resumen_miscuentas_load');
    agregar_loading_ge_publi(".resumen_miscuentas_load");


    let data_url = baseurl + "/controllers/datos_vendedor/?resumen_usuario";
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        //  quitar_loading_ge_publi('.resumen_miscuentas_load');
        if (res.status == 'success') {
            llenarcampos_resumen_miscuentas(res.data);

        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) return presentAlertObject({ icon: 'error', text: idioma.trans_04 });


        }

    }).fail((err) => {
        quitar_loading_ge_publi('.resumen_miscuentas_load');
        return presentAlertObject({ icon: 'error', text: idioma.trans_04 });

    });


}

async function llenarcampos_resumen_miscuentas(data_resum) {
    let valor_de_wbs_to_barra = data_resum.escalaUsuario.escala;
    let ancho_barra_resumen, valor_tiempo_entrega, reputacion_resumen;
    let texto_ventas_opction_resu = idioma.trans460_.split("$v").join(data_resum.ventas);
    //nº1 campos directos de wbs
    $('.valor_compras_resumen').text(data_resum.compras);
    $('.valor_publicaciones_resumen').text(data_resum.publicaciones);
    $('.valor_ventas_resumen').text(texto_ventas_opction_resu);
    $('.valor_ventas_preparar_resumen').text(data_resum.ventas_preparar);
    $('.valor_ventas_reclamos_resumen').text(data_resum.reclamos);
    // fin nº1

    $('.ventas_resumen_miscuentas').off('click');
    $('.ventas_resumen_miscuentas').on('click', { ventas_r: data_resum['ventas'] }, validar_flujo_opcion_de_ventas_realizadas);
    //nº2 para llenar campo de canceladas
    if (data_resum.canceladas > 0) {
        $('.valor_canceladas_ventas_resumen').text(data_resum.canceladas);
    } else {
        $('.valor_canceladas_ventas_resumen').text(idioma._trans382);

    }
    //nº2 fin

    //nº3 para llenar campo de tiempo de entrega 
    valor_tiempo_entrega = await rangos_resumen(data_resum.tiempos_entrega);
    if (valor_tiempo_entrega == "sin calificacion") {
        valor_tiempo_entrega = estado_cualitativos_resumen[0];
    } else {
        valor_tiempo_entrega = estado_cualitativos_resumen.filter(cualidad => valor_tiempo_entrega == cualidad.id)[0];
    }
    $('.valor_tiempos_entrega_resumen').text(valor_tiempo_entrega.value);
    llenartooltips_mensaje_resumen(valor_tiempo_entrega);
    //nº3 fin

    //nº4 para llenar campo de la barra de clasificacion
    ancho_barra_resumen = valor_de_wbs_to_barra * 20;
    $(".barra_reputacion").css("width", ancho_barra_resumen.toString() + "%");
    if (valor_de_wbs_to_barra == 0) { reputacion_resumen = await rangos_resumen(valor_de_wbs_to_barra, "2"); } else { reputacion_resumen = await rangos_resumen(valor_de_wbs_to_barra); }

    if (reputacion_resumen == "sin calificacion") {
        reputacion_resumen = idioma.trans247_;
    } else {
        reputacion_resumen = estado_cualitativos_resumen.filter(cualidad => reputacion_resumen == cualidad.id)[0];
        reputacion_resumen = reputacion_resumen.value;
    }
    $('.reputacion_resumen_cualidad').text(reputacion_resumen);
    //nº4 fin


    //nº5 para determinar el flujo del boton subasta 
    let opciones_botone = await validar_subasta_usuario(user);
    if (opciones_botone.opcion == 1) {
        $('.valor_subastas_resumen').text(data_resum.subastas);
    } else {
        $('.valor_subastas_resumen').html(`<span style="text-decoration: underline;">${idioma.trans455_}</span>`);
    }
    //nº5 fin 


}


function llenartooltips_mensaje_resumen(data_tiempos_entrega) {
    let porcentaje_tiempo_entrega = data_tiempos_entrega.tiempo_entrega_porcentaje;
    let mensaje_tool = idioma.trans289_.split('$p').join(porcentaje_tiempo_entrega)
    $('.mensaje_tiempo_entrega').text(mensaje_tool);
    $('.mensaje_ventas_canceladas').text(idioma.trans290_);
}


function rangos_resumen(valor, id = "1") {
    return new Promise((resolve) => {
        if (valor >= 0 && valor <= 1) {
            if (id == "2") {
                valor = "sin calificacion";
            } else {
                if (valor == 0) {
                    valor = "sin calificacion";
                } else {
                    valor = "malo";
                }
            }
            resolve(valor);
        } else {
            if (valor > 1 && valor <= 2) {
                valor = "regular";
                resolve(valor);
            } else {
                if (valor > 2 && valor <= 3) {
                    valor = "bueno";
                    resolve(valor);
                } else {
                    if (valor > 3 && valor <= 4) {
                        valor = "muybueno";
                        resolve(valor);
                    } else if (valor > 4 && valor <= 5) {
                        valor = "excelente";
                        resolve(valor);
                    }

                }

            }

        }

    });

}

async function validar_flujo_opcion_de_subasta(id = "1") {

    let opciones_botone = await validar_subasta_usuario(user);
    if (opciones_botone.opcion == 1) {
        loadPage("mis-nasbi-descuentos.php")
    } else {
        redirigir_opcion_mis_cuentas(".sidenav_subastas");
        if (id == "1") {
            loadPage("mis-cuentas.php")
        }
        //cuando viene en "2" el id quiere decir que viene de 
        //subasta.js de aca de mis-cuentas

    }

}


function redirigir_opcion_mis_cuentas(opcion) {
    localStorage.setItem("mis_cuentas", opcion);

    let params_mis_cuentas = new URLSearchParams(location.search);
    if (params_mis_cuentas.has('tokenPageView')) {
        let token = params_mis_cuentas.get('tokenPageView');
        if (validarText(token)) {
            token = decodeURI(token);
            validaciones__opciones___usan__tokenPageView(token, params_mis_cuentas);
        }
    }

}

function validaciones__opciones___usan__tokenPageView(token, params_mis_cuentas) {
    if (token == "id-configuracion" && localStorage.getItem("mis_cuentas") != ".sidenav_configuracion") {
        quitar_tokenPageView_de_url(params_mis_cuentas);
    } else {
        if (token == "id-ventas" && localStorage.getItem("mis_cuentas") != ".sidenav_ventas") {
            quitar_tokenPageView_de_url(params_mis_cuentas);
        } else {
            if (token == "id-compras" && localStorage.getItem("mis_cuentas") != ".sidenav_compras") {
                quitar_tokenPageView_de_url(params_mis_cuentas);
            }
        }
    }
}

function quitar_tokenPageView_de_url(params_mis_cuentas) {
    let page = "mis-cuentas.php";
    params_mis_cuentas.delete('tokenPageView');
    let new_params = params_mis_cuentas.toString();
    ruta = `${page}?&${new_params}`;
    location.href = ruta;
}

async function validar_flujo_opcion_de_ventas_por_preparar() {
    let valor_campo_v_preparar = $('.valor_ventas_preparar_resumen').text();
    valor_campo_v_preparar = parseFloat(valor_campo_v_preparar);
    console.log(valor_campo_v_preparar, "mmmmmmm");
    let tipo_usuario = await get_tipo_usuario(user);
    muestra_proceso_segun_tipo_user_ventas_por_preparar(tipo_usuario.id, valor_campo_v_preparar)
}
function muestra_proceso_segun_tipo_user_ventas_por_preparar(id_tipo_usuario, valor_campo_v_preparar) {
    switch (id_tipo_usuario) {
        case 1: // p2w
            if (valor_campo_v_preparar == 0) {
                return presentAlertObject({ icon: 'error', text: idioma.trans459_ });
            } else {
                irse_a_ventas_opc_enviar_pro_act();
            }
            break;
        case 2: // externo
            if (valor_campo_v_preparar == 0) {
                return presentAlertObject({ icon: 'error', text: idioma.trans459_ });
            } else {
                irse_a_ventas_opc_enviar_pro_act();
            }
            break;
        case 3: // empresa
            if (valor_campo_v_preparar == 0) {
                return presentAlertObject({ icon: 'error', text: idioma.trans459_ });
            } else {
                irse_a_ventas_opc_enviar_pro_act();
            }
            break;

        default:
            if (valor_campo_v_preparar == 0) {
                return presentAlertObject({ icon: 'error', text: idioma.trans459_ });
            }
            break;
    }
}
function irse_a_ventas_opc_enviar_pro_act() {
    localStorage.setItem("opcion_ventas_espera_envio", 1);
    redirigir_opcion_mis_cuentas(".sidenav_ventas");
    loadPage("mis-cuentas.php")
}
async function validar_flujo_opcion_de_ventas_realizadas($e) {
    let valor_campo_v_preparar = $e.data.ventas_r;
    valor_campo_v_preparar = parseFloat(valor_campo_v_preparar);
    console.log(valor_campo_v_preparar, "mmmmmmm");
    let tipo_usuario = await get_tipo_usuario(user);
    muestra_proceso_segun_tipo_user_ventas_realizadas(tipo_usuario.id, valor_campo_v_preparar)

}
function muestra_proceso_segun_tipo_user_ventas_realizadas(id_tipo_usuario, valor_campo_v_preparar) {
    console.log(valor_campo_v_preparar, "mmmmmm");
    switch (id_tipo_usuario) {
        case 1: // p2w
            if (valor_campo_v_preparar == 0) {
                return presentAlertObject({ icon: 'error', text: idioma.trans522_ });
            } else {
                irse_a_ventas_opc_realizadas();
            }
            break;
        case 2: // externo
            if (valor_campo_v_preparar == 0) {
                return presentAlertObject({ icon: 'error', text: idioma.trans522_ });
            } else {
                irse_a_ventas_opc_realizadas();
            }
            break;
        case 3: // empresa
            if (valor_campo_v_preparar == 0) {
                return presentAlertObject({ icon: 'error', text: idioma.trans522_ });
            } else {
                irse_a_ventas_opc_realizadas();
            }
            break;

        default:
            if (valor_campo_v_preparar == 0) {
                return presentAlertObject({ icon: 'error', text: idioma.trans522_ });
            }
            break;
    }
}
function irse_a_ventas_opc_realizadas() {
    console.log("-------------> paso por aquí: ", 13);
    localStorage.setItem("opcion_ventas_espera_envio", 13);
    redirigir_opcion_mis_cuentas(".sidenav_ventas");
    loadPage("mis-cuentas.php")
}
//CLASIFICION VENDEDOR EMPRESA, USUARIO P2W Y EXTERNO 
//Este codigo de resumen con la clasificacion de usuario vendedor lo que hace es 
//si ya tiene mas de los puntos de los item en el nivel que esta el usuario dice el porque no a pasado
//y si no tiene los puntos maximo del nivel dice a que item esta proximo del nivel
async function getClasificacion_next_nivel() {

    $('.contenedor_parrafos_de_next_objetivo_content').show('slow');
    $('.contenedor_parrafos_de_next_objetivo').html("");

    data_json_clasificacion_nivel_resu = await cargarClasificacionesJSON();
    let dataEnviar = {
        "data": {
            "uid": user.uid,
            "empresa": user.empresa,
        }
    };
    let data_url = `${baseurl}/controllers/datos_vendedor/?clasificacion`;
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        // "headers": { 'x-api-key': user.token },
    }).done((res) => {
        $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
        if (res.status == 'success') {//PERTENECE ALGUN NIVEL
            $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
            // muestra_clasificacion_usuario(res.data); 
            if (user.empresa * 1 == 0) {
                definirClasificacionNoEmpresas(res);

            } else {
                definirClasificacionEmpresas(res);
            }
        } else {
            // Activa el semaforo de calificación
            $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
            vededor_agregar_items_beneficios(idioma['trans480_']);
        }
    }).fail((err) => {
        $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
        quitar_loading_ge_publi('.resumen_miscuentas_load');
        return presentAlertObject({ icon: 'error', text: idioma.trans_04 });
    });
}
function cargarClasificacionesJSON() {
    return new Promise((resolve, reject) => {
        if (!data_json_clasificacion_nivel_resu) {
            lenguaje = localLenguaje;
            $.getJSON(`../json/clasificacion_de_niveles_user_${lenguaje}.json`, (clasificacion_nivel_user) => {
                resolve(clasificacion_nivel_user);
            });
        } else {
            resolve(data_json_clasificacion_nivel_resu);
        }
    });
}
function vededor_agregar_items_beneficios(label = idioma['trans480_']) {
    $('.contenedor_parrafos_de_next_objetivo').append(`
    <p class="text-objetico">
        <span><img loading="lazy" src="../imagen/diamante.png"></span>
        <span>${label}</span>
    </p>
`);
}
// INICIO - Listado beneficios EMPRESAS
function definirClasificacionNoEmpresas(item = {}) {
    console.log("\t\t\t Definiendo datos empresa.");

    if (item.data.clasificacion.ventas_concretadas < 10) {
        vededor_agregar_items_beneficios(idioma['trans480_']);
        console.log("\n\t --------+> [ 1 ]. PARAMETROS NO DEFINIDOS");
        $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
    } else {
        if ((item.data.clasificacion.ventas_concretadas >= 10 && item.data.clasificacion.ventas_concretadas <= 15) || item.data.escala == 0) {
            // #1. Filtro de activación del semaforo.

            let label = idioma['trans_332'];
            console.log("----+> label: ", label);
            label = label.split('$n').join("Junior").split('$d').join(16);

            vededor_agregar_items_beneficios(label);
            console.log("\n\t --------+> [ 2 ]. PARAMETROS SI DEFINIDOS");
            $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
        } else {
            console.log("\n\t --------+> [ 3 ]. PARAMETROS SI DEFINIDOS");
            if (item.data.escala == 1) {
                definirClasificacionNoEmpresas_junior(item);

            } else if (item.data.escala == 2) {
                definirClasificacionNoEmpresas_senior(item);

            } else if (item.data.escala == 3) {
                definirClasificacionNoEmpresas_master(item);

            } else { }
        }
    }
}
function definirClasificacionNoEmpresas_junior(params) {
    let beneficios = data_json_clasificacion_nivel_resu.user_normal_detalles_niveles.niveles[0].beneficios;
    beneficios = beneficios.sort(function (a, b) {
        return (a.puntos * 1) < (b.puntos * 1) ? -1 : 1;
    });
    console.log("\n\n\n ------- [ beneficios ]: ", beneficios);
    console.log("\n\n\n ------- [ beneficios ]: ", params);

    let count = 0;
    for (let index = 0; index < beneficios.length; index++) {
        if (params.data.puntos * 1 >= beneficios[index].puntos * 1) {
            let label = idioma['trans_333'];
            label = label.split("$n").join("Junior"); // Nivel
            label = label.split("$p").join(beneficios[index].puntos); // Puntos
            label = label.split("$b").join(beneficios[index].detalle_beneficio); // Beneficios
            vededor_agregar_items_beneficios(label);
            count++;
        }
        // $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
    }
    if (count == beneficios.length) {
        // Debes mostrar el primero del next level.
        definirClasificacionGeneral__nextlevel("Senior", (50 + 1));
    }
    console.log(data_json_clasificacion_nivel_resu.user_normal_detalles_niveles.niveles[0].beneficios);
}
function definirClasificacionNoEmpresas_senior(params) {
    let beneficios = data_json_clasificacion_nivel_resu.user_normal_detalles_niveles.niveles[1].beneficios;
    beneficios = beneficios.sort(function (a, b) {
        return (a.puntos * 1) < (b.puntos * 1) ? -1 : 1;
    });
    let count = 0;
    for (let index = 0; index < beneficios.length; index++) {
        if (params.data.puntos * 1 >= beneficios[index].puntos * 1) {
            let label = idioma['trans_333'];
            label = label.split("$n").join("Senior"); // Nivel
            label = label.split("$p").join(beneficios[index].puntos); // Puntos
            label = label.split("$b").join(beneficios[index].detalle_beneficio); // Beneficios
            vededor_agregar_items_beneficios(label);
            count++;
        }
        //  $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
    }
    if (count == beneficios.length) {
        // Debes mostrar el primero del next level.
        definirClasificacionGeneral__nextlevel("Master", (100 + 1));
    }
    console.log(data_json_clasificacion_nivel_resu.user_normal_detalles_niveles.niveles[1].beneficios);
}
function definirClasificacionNoEmpresas_master(params) {
    let beneficios = data_json_clasificacion_nivel_resu.user_normal_detalles_niveles.niveles[1].beneficios;
    beneficios = beneficios.sort(function (a, b) {
        return (a.puntos * 1) < (b.puntos * 1) ? -1 : 1;
    });
    let count = 0;
    for (let index = 0; index < beneficios.length; index++) {
        if (params.data.puntos * 1 >= beneficios[index].puntos * 1) {
            let label = idioma['trans_333'];
            label = label.split("$n").join("Master"); // Nivel
            label = label.split("$p").join(beneficios[index].puntos); // Puntos
            label = label.split("$b").join(beneficios[index].detalle_beneficio); // Beneficios
            vededor_agregar_items_beneficios(label);
            count++;
        }
        //   $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
    }
    if (count == beneficios.length) {
        // Debes mostrar el primero del next level.
        definirClasificacionGeneral__nextlevel_tope("Master", params.data.puntos * 1);
    }
}
// FIN - Listado beneficios EMPRESAS



// INICIO - Listado beneficios EMPRESAS
function definirClasificacionEmpresas(item = {}) {
    console.log("\t\t\t Definiendo datos empresa.");

    if (item.data.clasificacion.ventas_concretadas < 10) {
        vededor_agregar_items_beneficios(idioma['trans480_']);
        console.log("\n\t --------+> [ 1 ]. PARAMETROS NO DEFINIDOS");
        $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
    } else {
        if ((item.data.clasificacion.ventas_concretadas >= 10 && item.data.clasificacion.ventas_concretadas <= 150) || item.data.escala == 0) {
            // #1. Filtro de activación del semaforo.

            let label = idioma['trans_332'];
            console.log("----+> label: ", label);
            label = label.split('$n').join("Junior").split('$d').join(151);

            vededor_agregar_items_beneficios(label);
            console.log("\n\t --------+> [ 2 ]. PARAMETROS SI DEFINIDOS");
            $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
        } else {
            console.log("\n\t --------+> [ 3 ]. PARAMETROS SI DEFINIDOS");
            if (item.data.escala == 1) {
                definirClasificacionEmpresas_junior(item);

            } else if (item.data.escala == 2) {
                definirClasificacionEmpresas_senior(item);

            } else if (item.data.escala == 3) {
                definirClasificacionEmpresas_master(item);

            } else { }
        }
    }
}
function definirClasificacionEmpresas_junior(params) {
    let beneficios = data_json_clasificacion_nivel_resu.user_empresa_detalles_niveles.niveles[0].beneficios;
    beneficios = beneficios.sort(function (a, b) {
        return (a.puntos * 1) < (b.puntos * 1) ? -1 : 1;
    });
    console.log("\n\n\n ------- [ beneficios ]: ", beneficios);
    console.log("\n\n\n ------- [ beneficios ]: ", params);

    let count = 0;
    for (let index = 0; index < beneficios.length; index++) {
        if (params.data.puntos * 1 >= beneficios[index].puntos * 1) {
            let label = idioma['trans_333'];
            label = label.split("$n").join("Junior"); // Nivel
            label = label.split("$p").join(beneficios[index].puntos); // Puntos
            label = label.split("$b").join(beneficios[index].detalle_beneficio); // Beneficios
            vededor_agregar_items_beneficios(label);
            count++;
        }
        //  $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
    }
    if (count == beneficios.length) {
        // Debes mostrar el primero del next level.
        definirClasificacionGeneral__nextlevel("Senior", (300 + 1));
    }
    console.log(data_json_clasificacion_nivel_resu.user_empresa_detalles_niveles.niveles[0].beneficios);
}
function definirClasificacionEmpresas_senior(params) {
    let beneficios = data_json_clasificacion_nivel_resu.user_empresa_detalles_niveles.niveles[1].beneficios;
    beneficios = beneficios.sort(function (a, b) {
        return (a.puntos * 1) < (b.puntos * 1) ? -1 : 1;
    });
    let count = 0;
    for (let index = 0; index < beneficios.length; index++) {
        if (params.data.puntos * 1 >= beneficios[index].puntos * 1) {
            let label = idioma['trans_333'];
            label = label.split("$n").join("Senior"); // Nivel
            label = label.split("$p").join(beneficios[index].puntos); // Puntos
            label = label.split("$b").join(beneficios[index].detalle_beneficio); // Beneficios
            vededor_agregar_items_beneficios(label);
            count++;
        }
        $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
    }
    if (count == beneficios.length) {
        // Debes mostrar el primero del next level.
        definirClasificacionGeneral__nextlevel("Master", (500 + 1));
    }
    console.log(data_json_clasificacion_nivel_resu.user_empresa_detalles_niveles.niveles[1].beneficios);
}
function definirClasificacionEmpresas_master(params) {
    let beneficios = data_json_clasificacion_nivel_resu.user_empresa_detalles_niveles.niveles[1].beneficios;
    beneficios = beneficios.sort(function (a, b) {
        return (a.puntos * 1) < (b.puntos * 1) ? -1 : 1;
    });
    let count = 0;
    for (let index = 0; index < beneficios.length; index++) {
        if (params.data.puntos * 1 >= beneficios[index].puntos * 1) {
            let label = idioma['trans_333'];
            label = label.split("$n").join("Master"); // Nivel
            label = label.split("$p").join(beneficios[index].puntos); // Puntos
            label = label.split("$b").join(beneficios[index].detalle_beneficio); // Beneficios
            vededor_agregar_items_beneficios(label);
            count++;
        }
        $('.contenedor_parrafos_de_next_objetivo_content').hide('slow');
    }
    if (count == beneficios.length) {
        // Debes mostrar el primero del next level.
        definirClasificacionGeneral__nextlevel_tope("Master", params.data.puntos * 1);
    }
}
// FIN - Listado beneficios EMPRESAS
function definirClasificacionGeneral__nextlevel(nivelLabel, nivelPuntos) {
    let label = idioma['trans_332'];
    label = label.split('$n').join(nivelLabel).split('$d').join(formatNumberInt(nivelPuntos));
    vededor_agregar_items_beneficios(label);
}
function definirClasificacionGeneral__nextlevel_tope(nivelLabel, nivelPuntos) {
    let label = idioma['trans_334'];
    label = label.split('$n').join(nivelLabel).split('$p').join(formatNumberInt(nivelPuntos));
    vededor_agregar_items_beneficios(label);
}



function get_data_nivel_user(data, id_tipo_user) {
    return new Promise((resolve) => {
        let data_segun_tipo_user = id_tipo_user == 1 ? data_json_clasificacion_nivel_resu.user_empresa_detalles_niveles : data_json_clasificacion_nivel_resu.user_normal_detalles_niveles;
        let data_segun_nivel_user;
        switch (data.escala) {
            case 0:
                let cantidad_minima_activar_semaforo = data_segun_tipo_user.activar_semaforo_ventas_mayores_o_igual;
                data_segun_nivel_user = data_segun_tipo_user.niveles[0];
                resolve({ data: 0, nivel: data.escala, data_next_nivel: data_segun_nivel_user, cantidad_minima_activar_semaforo });
                break;
            case 1:
                data_segun_nivel_user = data_segun_tipo_user.niveles[0];
                resolve({ data: data_segun_nivel_user, nivel: data.escala, data_next_nivel: data_segun_tipo_user.niveles[2] });
                break;
            case 2:
                data_segun_nivel_user = data_segun_tipo_user.niveles[2];
                resolve({ data: data_segun_nivel_user, nivel: data.escala, data_next_nivel: data_segun_tipo_user.niveles[1] });
                break;

            case 3:
                data_segun_nivel_user = data_segun_tipo_user.niveles[1];
                resolve({ data: data_segun_nivel_user, nivel: data.escala, data_next_nivel: null });
                break;

            default:
                resolve(false);
                break;
        }



    });
}



async function muestra_item_de_nivel_user(data_nivel, data_wbs, proximo_nivel, data_next_nivel, id = 1) {

    if (data_next_nivel != null) { //quiere decir que no esta en el ultimo nivel
        let acumulado_ventas_user = data_wbs.clasificacion.facturacion_usd
        let acumulado_ventas_user_cop = parseFloat(acumulado_ventas_user) * parseFloat(data_json_clasificacion_nivel_resu.valor_dolar_peso_co); //dolar a peso
        acumulado_ventas_user_cop = await scientificToDecimal(acumulado_ventas_user_cop);
        let puntos_user = data_wbs.clasificacion.puntos;
        let meses_antiguedad_usuario = data_wbs.clasificacion.antiguedad;
        let porcentaje_ventas_canceladas = data_wbs.clasificacion.porcentaje_ventas_canceladas;
        if (acumulado_ventas_user_cop < data_next_nivel.valor_cop_acumular || parseFloat(data_wbs.clasificacion.ventas_concretadas) < data_next_nivel.ventas_mayor_igual_a || porcentaje_ventas_canceladas || puntos_user < data_next_nivel.minimo_puntos || meses_antiguedad_usuario < data_next_nivel.activo_durante) {
            if (id == 1) {
                sigue_en_mismo_nivel_buscar_siguiente_beneficio(data_nivel, data_wbs, acumulado_ventas_user_cop, data_next_nivel, puntos_user, meses_antiguedad_usuario); //el flujo que inicia esta funcion dira porque sigue en el mismo nivel
            } else if (id == 2) {
                esta_en_el_ultimo_nivel(data_nivel, data_wbs, 1);
            } else if (id == 3) {
                flujo_para_mostrar(data_nivel, data_wbs, acumulado_ventas_user_cop, data_next_nivel, puntos_user, meses_antiguedad_usuario); //el flujo que inicia esta funcion dira porque sigue en el mismo nivel
            }

        } else {
            if (id == 2) {
                esta_en_el_ultimo_nivel(data_nivel, data_wbs, 2);
            } else {
                console.log("deberia estar en el otro nivel revisar wbs de clasificacion")
            }
        }

    } else {
        muestra_item_de_nivel_user(data_nivel, data_wbs, proximo_nivel, data_nivel, 2); //hago esta recursividad 

    }

}



async function sigue_en_mismo_nivel_buscar_siguiente_beneficio(data_nivel, data_wbs, facturado_cop, data_next_nivel, puntos_user, meses_antiguedad_usuario) {
    let data_beneficio = await data_beneficio_que_corresponde_puntos_user(data_wbs, data_nivel); //donde esta creada la funcion explico para que la uso
    if (data_beneficio.respuesta == 2) {  //si es 2 quiere decir que tiene items por cumplir en el nivel actual
        //pero OJO eso no es impedimento para pasar a otro nivel el wbs es el 
        //dice en que nivel esta el usuario
        let nombre_nivel = await optener_nombre_nivel(data_nivel.id_nivel);
        if (data_beneficio.data.length > 1) { //quiere decir que solo hay un objetivo mayor en el nivel actual
            mostrar_mas_deun_item(nombre_nivel, data_beneficio.data, idioma.trans488_, 1);
        } else {  //quiere decir que solo hay mas de un objetivo mayor en el nivel actual
            let detalle = data_beneficio.data[0].detalle_beneficio
            mensaje_jutificacion = idioma.trans488_.split("$n").join(nombre_nivel).split("$p").join(nombre_nivel).split("$d").join(detalle);
            mostrar_un_solo_item(mensaje_jutificacion);
        }
    } else if (facturado_cop < data_nivel.valor_cop_acumular) { //si llegó aca quiere decir que ya tiene los puntos superados de este nivel
        mensaje_porque_sigue_en_mismo_nivel(1, data_next_nivel, data_wbs);
    } else {
        console.log("por aca 1");
        if (data_wbs.clasificacion.ventas_concretadas < data_next_nivel.ventas_mayor_igual_a) {
            mensaje_porque_sigue_en_mismo_nivel(2, data_next_nivel, data_wbs);
        } else {
            console.log("por aca 2");
            if (!data_wbs.clasificacion.ventas_canceladas) {
                mensaje_porque_sigue_en_mismo_nivel(3, data_next_nivel, data_wbs);
            } else {
                console.log("por aca 3");
                if (puntos_user < data_next_nivel.minimo_puntos) {
                    mensaje_porque_sigue_en_mismo_nivel(4, data_next_nivel, data_wbs);
                } else if (meses_antiguedad_usuario < data_next_nivel.activo_durante) {
                    mensaje_porque_sigue_en_mismo_nivel(5, data_next_nivel, data_wbs);
                }

            }
        }

    }

}


function flujo_para_mostrar(data_nivel, data_wbs, facturado_cop, data_next_nivel, puntos_user, meses_antiguedad_usuario) {
    if (facturado_cop < data_nivel.valor_cop_acumular) { //si llegó aca quiere decir que ya tiene los puntos superados de este nivel
        mensaje_porque_sigue_en_mismo_nivel(1, data_next_nivel, data_wbs);
    } else {
        console.log("por aca 1");
        if (data_wbs.clasificacion.ventas_concretadas < data_next_nivel.ventas_mayor_igual_a) {
            mensaje_porque_sigue_en_mismo_nivel(2, data_next_nivel, data_wbs);
        } else {
            console.log("por aca 2");
            if (!data_wbs.clasificacion.ventas_canceladas) {
                mensaje_porque_sigue_en_mismo_nivel(3, data_next_nivel, data_wbs);
            } else {
                console.log("por aca 3");
                if (puntos_user < data_next_nivel.minimo_puntos) {
                    mensaje_porque_sigue_en_mismo_nivel(4, data_next_nivel, data_wbs);
                } else if (meses_antiguedad_usuario < data_next_nivel.activo_durante) {
                    mensaje_porque_sigue_en_mismo_nivel(5, data_next_nivel, data_wbs);
                }

            }
        }
    }
}




function mostrar_un_solo_item(mensaje, clase = ".contenedor_parrafos_de_next_objetivo") {
    $(clase).append(
        `<p class="text-objetico">
            <span><img loading="lazy" src="../imagen/diamante.png"></span>
            <span>${mensaje}</span>
        </p>
        `);

}

async function mensaje_porque_sigue_en_mismo_nivel(id, data_next_nivel, data_user_wbs) {
    let data_next_beneficio = await data_beneficio_que_corresponde_puntos_user(data_user_wbs, data_next_nivel);
    data_next_beneficio = data_next_beneficio.data;
    let nombre_siguiente_nivel = await optener_nombre_nivel(data_next_nivel.id_nivel);
    let mensaje_jutificacion;
    let detalle;

    switch (id) {
        case 1://este caso es cuando falta mas facturacion 
            if (data_next_beneficio.length > 1) {
                mostrar_mas_deun_item(nombre_siguiente_nivel, data_next_beneficio, idioma.trans485_);
            } else {
                detalle = data_next_beneficio[0].detalle_beneficio
                mensaje_jutificacion = idioma.trans485_.split("$n").join(nombre_siguiente_nivel).split("$d").join(detalle);
                mostrar_un_solo_item(mensaje_jutificacion);
            }
            break;
        case 2://este caso es cuando falta ventas concretadas
            if (data_next_beneficio.length > 1) {
                mostrar_mas_deun_item(nombre_siguiente_nivel, data_next_beneficio, idioma.trans484_);
            } else {
                detalle = data_next_beneficio[0].detalle_beneficio
                mensaje_jutificacion = idioma.trans484_.split("$n").join(nombre_siguiente_nivel).split("$d").join(detalle);
                mostrar_un_solo_item(mensaje_jutificacion);
            }
            break;
        case 3: //este caso es cuando tiene ventas canceladas 
            if (data_next_beneficio.length > 1) {
                mostrar_mas_deun_item(nombre_siguiente_nivel, data_next_beneficio, idioma.trans486_);
            } else {
                detalle = data_next_beneficio[0].detalle_beneficio
                mensaje_jutificacion = idioma.trans486_.split("$n").join(nombre_siguiente_nivel);
                mostrar_un_solo_item(mensaje_jutificacion);
            }
            break;
        case 4: //y este que le falta puntos pero este no deberia pasar aca si pasa REVISAR FLUJO
            if (data_next_beneficio.length > 1) {
                mostrar_mas_deun_item(nombre_siguiente_nivel, data_next_beneficio, idioma.trans487_);
            } else {
                detalle = data_next_beneficio[0].detalle_beneficio
                mensaje_jutificacion = idioma.trans487_.split("$n").join(nombre_siguiente_nivel).split("$d").join(detalle);;
                mostrar_un_solo_item(mensaje_jutificacion);
            }
            break;
        case 5: //y este que le falta mas tiempo en nasbi 
            if (data_next_beneficio.length > 1) {
                mostrar_mas_deun_item(nombre_siguiente_nivel, data_next_beneficio, idioma.trans515_);
            } else {
                detalle = data_next_beneficio[0].detalle_beneficio
                mensaje_jutificacion = idioma.trans515_.split("$n").join(nombre_siguiente_nivel).split("$d").join(detalle);;
                mostrar_un_solo_item(mensaje_jutificacion);
            }
            break;

        default:
            break;
    }
}


function scientificToDecimal(num) {
    return new Promise((resolve) => {
        console.log("scientificToDecimal  numero ", num);
        var nsign = Math.sign(num);
        num = Math.abs(num);
        if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
            var zero = '0';
            let parts = String(num).toLowerCase().split('e');
            let e = parts.pop();
            let l = Math.abs(e);
            let sign = e / l;
            let coeff_array = parts[0].split('.');
            console.log("sign ", sign);
            if (sign === -1) {
                l = l - coeff_array[0].length;
                if (l < 0) {
                    num = coeff_array[0].slice(0, l) + '.' + coeff_array[0].slice(l) + (coeff_array.length === 2 ? coeff_array[1] : '');
                }
                else {
                    num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
                }
            }
            else {
                var dec = coeff_array[1];
                console.log("decccccc ", dec);
                if (dec)
                    l = l - dec.length;
                if (l < 0) {
                    num = coeff_array[0] + dec.slice(0, l) + '.' + dec;
                } else {
                    num = coeff_array.join('') + new Array(l + 1).join(zero);
                }
            }
        }
        console.log("scientificToDecimal ", nsign < 0 ? '-' + num : num)
        resolve(nsign < 0 ? '-' + num : num);
    })


}


function optener_nombre_nivel(id) {
    return new Promise((resolve) => {
        switch (id) {
            case 1:
                resolve(idioma.trans481_);
                break;
            case 2:
                resolve(idioma.trans483_);
                break;
            case 3:
                resolve(idioma.trans482_);
                break;

            default:
                break;
        }
    });

}




function data_beneficio_que_corresponde_puntos_user(data_wbs, data_nivel) {
    return new Promise(async (resolve) => {
        //esta promesa se usa para saber que beneficios del nivel son proximos dependiendo la cantidad de puntos del user
        //pero tambien la uso para el caso que los puntos del user sea superiores a los del nivel siguiente que se encuentra
        //le mando los beneficios con los puntos maximos del siguiente al actual 
        let beneficios = data_nivel.beneficios;
        let puntos_user = data_wbs.clasificacion.puntos;
        let array_objetivos_mayores_a_puntos_user = [];
        let array_puntos_mayores = [];
        for (const x in beneficios) {
            if (beneficios[x].puntos > puntos_user) {
                array_objetivos_mayores_a_puntos_user.push(beneficios[x]);
                array_puntos_mayores.push(beneficios[x].puntos);
            }
        }
        if (array_puntos_mayores.length == 0) {//quiere decir que no hay item con puntos superiores al actual 
            let maximo_de_beneficio_next_ni = await optener_maximo_minimo_valor_array(beneficios, "puntos");
            let data_beneficios_max_nex_nivel = maximo_de_beneficio_next_ni.data_valores_max;
            resolve({ data: data_beneficios_max_nex_nivel, respuesta: 1 });
        } else {//quiere decir que si hay item con puntos superiores al actual
            let data_max_min_beneficio_por_cumplir_nivel_actual = await optener_maximo_minimo_valor_array(array_objetivos_mayores_a_puntos_user, "puntos");
            let data_beneficio_mas_allegado_a_cumplir = data_max_min_beneficio_por_cumplir_nivel_actual.data_valores_min;
            resolve({ data: data_beneficio_mas_allegado_a_cumplir, respuesta: 2 });
        }
    });

}


function optener_maximo_minimo_valor_array(data, key) {
    return new Promise((resolve) => {
        let numeros = data.map(function (x) {
            return x[key];
        });
        let maximo = Math.max(...numeros);
        let minimo = Math.min(...numeros);
        let data_valores_max = data.filter(row => row[key] == maximo);
        let data_valores_min = data.filter(row => row[key] == minimo);
        resolve({ maximo, minimo, data_valores_max, data_valores_min })
    });
}


async function esta_en_el_ultimo_nivel(data_nivel, data_wbs, id) {
    let nombre_nivel = await optener_nombre_nivel(data_nivel.id_nivel);
    if (id == 2) {
        let data_beneficio = await data_beneficio_que_corresponde_puntos_user(data_wbs, data_nivel); //donde esta creada la funcion explico para que la uso
        if (data_beneficio.respuesta == 2) { //tiene item por cumplir de este maximo nivel 
            if (data_beneficio.data.length > 1) {
                mostrar_mas_deun_item(nombre_nivel, data_beneficio.data, idioma.trans488_, 1);
            } else {
                let detalle = data_beneficio.data[0].detalle_beneficio
                mensaje_jutificacion = idioma.trans488_.split("$n").join(nombre_nivel).split("$p").join(nombre_nivel).split("$d").join(detalle);
                mostrar_un_solo_item(mensaje_jutificacion);
            }
        } else if (data_beneficio.respuesta == 1) { // no tiene item por cumplir de este maximo nivel ya esta en lo maximo de maximo de todo
            let mensaje_jutificacion = idioma.trans489_.split("$n").join(nombre_nivel);
            mostrar_un_solo_item(mensaje_jutificacion);
        }
    } else if (id == 1) {
        console.log("no deberia ser senior revisar wbs de clasificacion")
    }

}


function mostrar_mas_deun_item(nombre_siguiente_nivel, data_next_beneficio, texto, id = 0) {
    let mensaje_jutificacion;
    for (const x in data_next_beneficio) {
        if (id == 0) {  //cuando no hay que hacerle split al $p puntos 
            mensaje_jutificacion = texto.split("$n").join(nombre_siguiente_nivel).split("$d").join(data_next_beneficio[x].detalle_beneficio);
        } else if (id == 1) { //cuando hay que hacerle split al $p puntos 
            mensaje_jutificacion = texto.split("$n").join(nombre_siguiente_nivel).split("$p").join(data_next_beneficio[x].puntos).split("$d").join(data_next_beneficio[x].detalle_beneficio);
        }
        $('.contenedor_parrafos_de_next_objetivo').append(
            `<p class="text-objetico">
                <span><img loading="lazy" src="../imagen/diamante.png"></span>
                <span>${mensaje_jutificacion}</span>
            </p>
            `);
    }
}
//FIN  CLASIFICION VENDEDOR EMPRESA, USUARIO P2W Y EXTERNO 


//CLASIFICACION SIGUIENTE OBJETIVO COMPRADOR (USO UNA QUE OTRA FUNCION DE LA CLASIFICACION DE VENDEDOR)


function getClasificacion_next_nivel_comprador(params) {
    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
        }
    }


    let data_url = baseurl + "/controllers/datos_comprador/?mis_puntos";
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        let validate_token = await erroresTokenEmpresa(res);
        if (!validate_token) {
            quitar_loading_ge_publi('.resumen_miscuentas_load');
            console.log(res, "laa dataaaaa compradoooooor");
            muestra_clasificacion_usuario_comprador(res);
        }


    }).fail((err) => {
        //quitar_loading_ge_publi('.resumen_miscuentas_load');
        return presentAlertObject({ icon: 'error', text: idioma.trans_04 });

    });


}


function muestra_clasificacion_usuario_comprador(data) {
    let compras_acumuladas = data.data.total_comprado_count;
    let puntos_user = data.puntos;
    let mensaje;
    $('.contenedor_parrafos_de_next_objetivo_comprador').empty();
    if (puntos_user != 0 && compras_acumuladas >= 10) {
        clasificar_nivel_segun_puntos_user_comprador(puntos_user, compras_acumuladas, data.puntos_mask);
    } else if (puntos_user == 0) {
        if (compras_acumuladas >= 10) {
            let puntos_para_ser_adventurer = 100;
            mensaje = idioma.trans514_.split("$p").join(puntos_para_ser_adventurer);
            mostrar_un_solo_item(mensaje, ".contenedor_parrafos_de_next_objetivo_comprador");
        } else {
            mensaje = idioma.trans491_;
            mostrar_un_solo_item(mensaje, ".contenedor_parrafos_de_next_objetivo_comprador");
        }

    } else {
        mensaje = idioma.trans491_;
        mostrar_un_solo_item(mensaje, ".contenedor_parrafos_de_next_objetivo_comprador");
    }

}



function clasificar_nivel_segun_puntos_user_comprador(puntos, cantidad_compras, puntos_mask) {
    let mensaje;
    if (puntos < 100 && cantidad_compras >= 10) {
        mensaje = idioma.trans492_.split("$p").join(100);
        mostrar_un_solo_item(mensaje, ".contenedor_parrafos_de_next_objetivo_comprador");
    } else if (puntos >= 100 && puntos < 500) {
        mensaje = idioma.trans493_.split("$p").join(500);
        mostrar_un_solo_item(mensaje, ".contenedor_parrafos_de_next_objetivo_comprador");

    } else if (puntos >= 500 && puntos < 1000) {
        mensaje = idioma.trans494_.split("$p").join("1,000");
        mostrar_un_solo_item(mensaje, ".contenedor_parrafos_de_next_objetivo_comprador");
    } else if (puntos >= 1000) {
        mensaje = idioma.trans495_.split("$p").join(puntos_mask);
        mostrar_un_solo_item(mensaje, ".contenedor_parrafos_de_next_objetivo_comprador");
    } else {
        console.log("error, en clasificar puntos");
    }
}

//FIN CLASIFICACION SIGUIENTE OBJETIVO COMPRADOR 

function esconder_nabvar_lateral_responsive() {

    // $(window).on("resize",function(){
    //     console.log("EL RESIZE");
    //     esconder_nabvar_helper();
    // });

    // esconder_nabvar_helper();
}

// function esconder_nabvar_helper(){
//     if(window.innerWidth <= 991){
//         console.log("EN EL CONDICIONAL");
//         $('a.side_option').off("click");
//         $('a.side_option').on("click",function(){
//             $('.col-list-nav').css('left','-200px');
//             $('.fa-chevron-left').css("display","none");
//             $('.fa-chevron-right').css("display","inline");
//         });
//         $('.fa-chevron-right').off('click');
//         $('.fa-chevron-right').on('click',function(){
//             $('.col-list-nav').css('left','0px');
//             $('.fa-chevron-left').css("display","inline");
//             $('.fa-chevron-right').css("display","none");
//         });

//     }else{
//         console.log("COLOCANDO DONDE ES");
//         $('.col-list-nav').css('left','0px');
//     }
// }