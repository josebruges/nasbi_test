let moneda_dif_blo = "0";
let tip_dif_blo = "1";
let fecha_blo_dif = "0";
let tipo_trans_blo_dif = "0";
let dif_blo_bonos = localStorage.getItem("mis_bonos_subasta");
let arrays_monedas_dif_blo = [];
let arrays_tipo_trans_dif_blo = [];

if (validarlogueado()) {
    if (dif_blo_bonos == ".bonos_dif_blo") {
        $(dif_blo_bonos).click();
        getdife_blo();
        optenerdatos_campos_dif_blo();

    }
}


$(document).ready((e) => {
    $(".bonos_dif_blo").click(($event) => {
        localStorage.setItem("mis_bonos_subasta", ".bonos_dif_blo");
        console.log("diferido bloqueado", localStorage.getItem("mis_bonos_subasta"));
        optenerdatos_campos_dif_blo();
        getdife_blo();
    });

    $(".select_tipo_blo_dif").change(($event) => {
        tip_dif_blo = $event.target.value;
        getdife_blo();
    });

    $(".select_moneda_blo_dif").change(($event) => {
        moneda_dif_blo = $event.target.value;
        getdife_blo();
    });

    $(".select_tipo_trans_blo_dif").change(($event) => {
        tipo_trans_blo_dif = $event.target.value;
        getdife_blo();
    });

    $('.fecha_dif_blo_fil').change(($event) => {
        filtrofecha_dif_blo($event.target.value);
    });


    $(".buscar_dif_blo").click(($event) => {
        getdife_blo();
    });
    $(".limpiar_dif_blo").click(($event) => {
        restaurar_filtro_dif_blo();
    });



});


function optenerdatos_campos_dif_blo() {

    tip_dif_blo = 1;
    moneda_dif_blo = "0";
    fecha_blo_dif = "0";
    tipo_trans_blo_dif = "0";


    arrays_monedas_dif_blo = [
        { id: "Nasbigold", text: idioma.trans37_ },
        { id: "Nasbiblue", text: idioma.trans36_ }
    ];
    arrays_tipo_trans_dif_blo = [
        { id: 1, text: idioma.trans41_ },
        { id: 2, text: idioma.trans42_ },

    ];

    let opciones_moneda = [
        { id: "0", text: idioma._trans39 },
        { id: "Nasbigold", text: idioma.trans37_ },
        { id: "Nasbiblue", text: idioma.trans36_ }
    ];

    let opciones_tipo = [
        { id: "1", text: idioma.trans229_ },
        { id: "0", text: idioma.trans228_ }
    ];

    let opciones_tipo_trans = [
        { id: "0", text: idioma._trans39 },
        { id: "1", text: idioma.trans41_ },
        { id: "2", text: idioma.trans42_ }
    ];

    llenar_select_diferido(opciones_moneda, ".select_moneda_blo_dif");
    llenar_select_diferido(opciones_tipo, ".select_tipo_blo_dif");
    llenar_select_diferido(opciones_tipo_trans, ".select_tipo_trans_blo_dif");

}

function llenar_select_diferido(array, clase) {
    $(clase).selectpicker('destroy');
    let select_moneda = "";
    $.each(array, function (i, fuente) {
        select_moneda += `<option value="${fuente.id}">${fuente.text}</option>`;
    });
    $(clase).html(select_moneda);
    $(clase).selectpicker({
        size: 7,
        liveSearch: false,
        dropupAuto: false,
        showSubtext: true
    });

}


function filtrofecha_dif_blo(e) {
    let fecha_buscar = e + " 00:00:00";
    fecha_blo_dif = +new Date(fecha_buscar);
    if (!validarNumero(fecha_blo_dif)) {
        fecha_blo_dif = "0";
        $('.fecha_dif_blo_fil').val(idioma.trans236_);
    }
    getdife_blo();
}







async function getdife_blo(pagina = 1) {
    agregar_loading_ge_publi(".dif_blo_titu");
    let dataEnviar = await preparar_data_to_enviar(pagina);

    $.ajax({
        type: "POST",
        url: `${baseurl}/controllers/nasbicoin/?diferidos_bloqueados`,
        data: dataEnviar,
        dataType: "json",
        "headers": { 'x-api-key': user.token },
    }).done(async(res) => {
        quitar_loading_ge_publi(".dif_blo_titu");
        if (res.status == 'success') {
            $('.blo_dif__list__nodata').hide("flash");
            $('.dif_blo__pagination').show("fast");
            llenar_tabla_dif_blo(res.data, res.total_paginas, pagina);

        } else if (res.status == 'fail') {
            $('.blo_dif__list_result').empty();
            $('.blo_dif__list__nodata').show("slow");
            $('.dif_blo__pagination').hide("fast");

        }else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                return 0;
            }

        }
    }).fail((err) => {
        quitar_loading_ge_publi(".dif_blo_titu");
        $('.dif_blo__pagination').hide("fast");
        $('.blo_dif__list__nodata').show("slow");
        presentAlertObject({ icon: 'error', text: idioma.trans_04 });
    });



}

function preparar_data_to_enviar(pagina) {
    return new Promise((resolve) => {
        let dataEnviar = {
            data: {
                "uid": user.uid,
                "empresa": user.empresa,
                "tipo": tip_dif_blo,
                "pagina": pagina
            }
        };

        if (moneda_dif_blo == "0" && fecha_blo_dif == "0" && tipo_trans_blo_dif == "0") {
            resolve(dataEnviar);
        } else {
            if (moneda_dif_blo != "0" && fecha_blo_dif != "0" && tipo_trans_blo_dif != "0") {
                dataEnviar.data["moneda"] = moneda_dif_blo;
                dataEnviar.data["fecha_inicio"] = fecha_blo_dif;
                dataEnviar.data["tipo_transaccion"] = tipo_trans_blo_dif;
                resolve(dataEnviar);
            } else if (moneda_dif_blo != "0" || fecha_blo_dif != "0" || tipo_trans_blo_dif != "0") {
                if (moneda_dif_blo != "0") {
                    dataEnviar.data["moneda"] = moneda_dif_blo;
                }

                if (fecha_blo_dif != "0") {
                    dataEnviar.data["fecha_inicio"] = fecha_blo_dif;
                }

                if (tipo_trans_blo_dif != "0") {
                    dataEnviar.data["tipo_transaccion"] = tipo_trans_blo_dif;
                }
                resolve(dataEnviar);
            }
        }

    });
}




function llenar_tabla_dif_blo(bloquiados_diferidos, paginas_total, pagina) {
    let tipo, moneda = "-", tipo_trans;
    $('.blo_dif__list_result').empty();
    for (const x in bloquiados_diferidos) {
        const blo_dife = bloquiados_diferidos[x];
        if (blo_dife.moneda == "Nasbigold" || blo_dife.moneda == "Nasbiblue") moneda = arrays_monedas_dif_blo.filter(datos => datos.id == blo_dife.moneda)[0];
        tipo_trans = arrays_tipo_trans_dif_blo.filter(datos => datos.id == blo_dife.tipo_transaccion)[0];
        let fecha_mostrar = getFechaConHora(blo_dife.fecha_actualizacion);
        if (blo_dife.tipo == 1) {
            tipo = idioma.trans229_;
        } else {
            tipo = idioma.trans228_;
        }
        console.log(blo_dife)
        blo_dife.descripcion = blo_dife.descripcion.split("adquirido en subasta").join(idioma['_trana937'])
        $('.blo_dif__list_result').append(
            `<tr>
                <td>${tipo}</td>
                <td>${blo_dife.precio_mask}</td>
                <td>${moneda.text}</td>
                <td><div class="descrip-tablee">${blo_dife.descripcion}</div></td>
                <td>${tipo_trans.text}</td>
                <td>${fecha_mostrar}</td>
               
            </tr>`
        );

    }

    let paramsPagination_dig_blo = {
        total_paginas: paginas_total,
        pagina: pagina
    };
    let result = generatePaginations(paramsPagination_dig_blo);
    $('.dif_blo__pagination').html(result);
    $('html, body').animate({ scrollTop: 0 }, 500);


}
function restaurar_filtro_dif_blo() {
    moneda_dif_blo = "0";
    tip_dif_blo = "1";
    tipo_trans_blo_dif = "0";
    $('.select_moneda_blo_dif').val(moneda_dif_blo);
    $('.select_tipo_blo_dif').val(tip_dif_blo);
    $(".select_tipo_trans_blo_dif").val(tipo_trans_blo_dif);
    if (fecha_blo_dif != "0") {
        fecha_blo_dif = "0";
        $('.fecha_dif_blo_fil').val('').datepicker('update');
        $('.fecha_dif_blo_fil').val(idioma.trans236_);
    } else {
        getdife_blo();
    }

    $('.select_moneda_blo_dif').selectpicker('refresh')
    $('.select_tipo_blo_dif').selectpicker('refresh')
    $('.select_tipo_trans_blo_dif').selectpicker('refresh')



}





