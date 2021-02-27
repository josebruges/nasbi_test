var chart, chart2, infoNegocio, dataProductosReferido;
var arraydelosestados = [
    { id: 1, text: idioma.trans07_, descripcion: idioma['trans_77'] },
    { id: 2, text: idioma.trans08_, descripcion: idioma['trans_78'] },
    { id: 3, text: idioma.trans09_, descripcion: idioma['trans_79'] },

    { id: 4, text: idioma.trans10_, descripcion: idioma['trans_80'] },
    { id: 5, text: idioma.trans11_, descripcion: idioma['trans_81'] },
    { id: 6, text: idioma.trans12_, descripcion: idioma['trans_82'] },
    { id: 7, text: idioma.trans13_, descripcion: idioma['trans_83'] },
    { id: 8, text: idioma.trans14_, descripcion: idioma['trans_83'] },
    { id: 9, text: idioma.trans15_, descripcion: idioma['trans_85'] },
    { id: 10, text: idioma.trans16_, descripcion: idioma['trans_86'] },
    { id: 11, text: idioma.trans17_, descripcion: idioma['trans_87'] },
    { id: 12, text: idioma.trans18_, funcion: "", descripcion: idioma['trans_88'] },
    { id: 13, text: idioma.trans18_, funcion: "", descripcion: idioma['trans_88'] }
];
var array_tipo = [
    { id: 1, nombre: idioma['_trans556'] },
    { id: 2, nombre: idioma['trans42_'] }
]

$(document).ready((e) => {
    if (validarText(user)) {

        if (!isValidadReferNegocio(user)) {
            loadPage("index.php")
        }
        getNegociosReferido()

        selectMeses();

    } else {
        abrirAlerta(idioma['trans_145'], idioma['_trans558'])
    }
    $('.sidenav_historial_referidos').off()
    $('.sidenav_historial_referidos').on('click', ($event) => {
        getHistorialReferidos();
        getReferidosRedesSociales();
    });
    $('.select_meses_referidos').on('click', function () {
        getHistorialReferidos();
    });
    $('.select_meses_estadistica').change(($event) => {
        destruirGraficas(2)
        getInfoGraficaVS();

    });

    $(".select_orden_prod").change(($event) => {
        getProductosReferido();
    })



});
function destruirGraficas(id) {
    console.log("destruir grafica", id)
    switch (id) {
        case 1:
            if (chart) {
                if (chart.ctx != null) {
                    chart.clear();
                    chart.destroy();
                    chart = "";
                }
            }
            break;
        case 2:
            if (chart2) {
                if (chart2.ctx != null) {
                    chart2.clear();
                    chart2.destroy();
                    chart2 = "";
                }
            }
            break;
        case 3:
            if ((chart && chart2)) {
                if (chart.ctx != null) {
                    chart.clear();
                    chart.destroy();
                    chart = "";
                }
                if (chart2.ctx != null) {
                    $('.legends_grafica_dos').empty();
                    chart2.clear();
                    chart2.destroy();
                    chart2 = "";
                }
            }

            break;
        default:
            break;
    }

}
function selectMeses() {
    let mes_actual = new Date().getMonth() + 1
    let mes_anterior = new Date().getMonth();
    let hace_3_meses = new Date().getMonth() - 2;
    let hace_6_meses = new Date().getMonth() - 5;
    var meses = [
        { id: mes_actual, nombre: idioma['trans255_'] },
        { id: mes_anterior, nombre: idioma['trans257_'] },
        { id: hace_3_meses, nombre: idioma['trans259_'] },
        { id: hace_6_meses, nombre: idioma['trans262_'] },
    ];
    var mesesEst = [
        { id: 1, nombre: idioma['trans257_'] },
        { id: 3, nombre: idioma['trans259_'] },
        { id: 6, nombre: idioma['trans262_'] },
    ];
    $(".content_select_meses_referidos").html(` <select class="form-comtrol select_meses_referidos">
    </select>`);
    $(".select_meses_referidos").empty()
    let htmlMeses = "";
    $.each(meses, (i, item) => {
        htmlMeses += `<option value="${item.id}">${item.nombre}</option>`
    });
    $(".select_meses_referidos").html(htmlMeses);
    let htmlMesesEst = "";
    $.each(mesesEst, (i, item) => {
        htmlMesesEst += `<option value="${item.id}">${item.nombre}</option>`
    });
    $(".select_meses_estadistica").html(htmlMesesEst);
    $(".select_meses_referidos").selectpicker({
        size: 7,
        dropupAuto: false
    })
    $(".select_meses_referidos").selectpicker("refresh")
    $(".select_meses_estadistica").selectpicker({
        size: 7,
        dropupAuto: false
    })
}
var Referido;
function getMiCodigoReferido() {
    let dataPlanes = {
        "uid": user.uid,
        "empresa": user.empresa
    };

    let data_url = baseurl + "/controllers/referidos/?referido_usuario";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataPlanes }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            if (success["status"] == "success") {

                Referido = success.data;
                getNegociosReferido();
            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) abrirAlerta(idioma['_trans06'], idioma['_trans535'])

            }

        }, error: error => {
            abrirAlerta(idioma['_trans06'], idioma['_trans535'])
        }
    });

}
function getNegociosReferido() {
    // let dataPlanes = {
    //     "referido": Referido.codigo
    // };
    let dataPlanes = {
        "referido": user.uid
    };

    let data_url = baseurl + "/controllers/referidos/?empresas_referido";

    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataPlanes },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $(".content__nodata").hide("fast");
            if (success["status"] == "success") {
                showEmpresasReferido(success.data);
                if (success.dataNoEmpresa) {
                    showUsuariosReferido(success.dataNoEmpresa)
                } else {
                    $(".content__nodata_user9").show("slow")
                }

            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) {
                    $(".content__nodata_user9").show("slow")
                    $(".content__nodata").show("slow")
                }


            }

        }, error: error => {
            abrirAlerta(idioma['_trans06'], idioma['_trans536'])

        }
    });

}
function showEmpresasReferido(datos) {
    let htmlEmpresasReferido = "";
    $('.content_empresas_referido').empty();
    if (datos && datos.length > 0) {


        $.each(datos, (i, item) => {
            let imagenEmpresa;
            console.log(item)
            let nombre_completo;
            if (validarText(item.nombre_empresa)) {
                nombre_completo = item.nombre_empresa
            } else {
                nombre_completo = item.razon_social
            }
            //item.nombre_dueno + " " + item.apellido_dueno;

            // if (item.foto_logo_empresa != "") {
            //     <img loading="lazy" alt="logo-${item.nombre_empresa} - nasbi.com" src="${imagenEmpresa}"></img>
            //     imagenEmpresa = item.foto_logo_empresa;
            // } else {
            //     imagenEmpresa = "../imagen/logo-negocio.png";
            // }
            htmlEmpresasReferido =
                ` <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0">
                <div class="card-negocio empresa_referido">
                    <img loading="lazy" alt="logo-empresa - nasbi.com" src="../imagen/logo-negocio.png">
                    <p><b>${nombre_completo}</b></p>
                    <p>${item.razon_social}</p>
                </div>
            </div> `
            $('.content_empresas_referido').append(htmlEmpresasReferido);
            $('.empresa_referido').eq(i).off();
            $('.empresa_referido').eq(i).on('click', { data: item }, abrirEstadisticasNegocio);
        });
    } else {
        $(".content__nodata").show("slow")
    }

}
function showUsuariosReferido(datos) {
    let htmlUsuariosReferido = "";
    console.log(datos)
    $('.content_usuarios_referido').empty();
    if (datos.length > 0) {
        $(".content__nodata_user9").hide("fast")


        $.each(datos, (i, item) => {
            let imagenEmpresa;
            console.log(item)

            //item.nombre_dueno + " " + item.apellido_dueno;

            // if (item.foto_logo_empresa != "") {
            //     <img loading="lazy" alt="logo-${item.nombre_empresa} - nasbi.com" src="${imagenEmpresa}"></img>
            //     imagenEmpresa = item.foto_logo_empresa;
            // } else {
            //     imagenEmpresa = "../imagen/logo-negocio.png";
            // }
            htmlUsuariosReferido =
                ` <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0">
                <div class="card-negocio user_referido">
                    <img loading="lazy" alt="logo-empresa - nasbi.com" src="../imagen/logo-negocio.png">
                    <p><b>${item.nombre}</b></p>
                </div>
            </div> `
            $('.content_usuarios_referido').append(htmlUsuariosReferido);
            $('.user_referido').eq(i).off();
            $('.user_referido').eq(i).on('click', { data: item }, abrirEstadisticasNegocio);
        });
    } else {
        $(".content__nodata_user9").show("slow")
    }

}
function abrirEstadisticasNegocio(ev) {
    infoNegocio = ev.data.data;
    console.log("infoNegocio", infoNegocio)
    $(".tab_resumen").addClass('d-none');
    $(".tab_estadistica").removeClass('d-none');
    $(".btn_atras_referidos").click(($event) => {
        $(".tab_resumen").removeClass('d-none');
        $(".tab_estadistica").addClass('d-none');
    })
    llenarSelectAno();
    destruirGraficas(3)
    showInfoNegocioReferido();
    getInfoGraficaResumen();
    getInfoGraficaVS();
    getProductosReferido();

}
////////////////////// historial /////////////////////////////////////

function getHistorialReferidos(pag = 1) {
    let mes = $(".select_meses_referidos option:selected").val();
    let ano = new Date().getFullYear();
    let fecha_inicio = +new Date(mes + "/" + "01/" + ano + " 00:00:00")

    let dataPlanes = {
        "referido": user.uid,
        "pagina": pag,
        "fecha_inicio": fecha_inicio
    };

    let data_url = baseurl + "/controllers/referidos/?historial_ventas";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataPlanes }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $(".content__nodata2").hide("fast")
            if (success["status"] == "success") {
                showHistorialReferido(success)

            } else {
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) {
                    $('.historial_referidos_negocios').empty();
                    $(".content__nodata2").show("slow")

                }

            }

        }, error: error => {
            $('.historial_referidos_negocios').empty();
            $(".content__nodata2").show("slow")
            abrirAlerta(idioma['_trans06'], idioma['_trans537'])

        }
    });

}
function showHistorialReferido(datos) {
    let htmlHistorialReferido = "";
    $('.historial_referidos_negocios').empty();
    $.each(datos.data, (i, item) => {
        if (item.moneda == "Nasbigold") {
            item.moneda = idioma.trans87_
        } else if (item.moneda == "Nasbiblue") {
            item.moneda = idioma.trans36_
        }
        console.log(item)
        let tipo = array_tipo.find(f => f.id == item.tipo).nombre
        htmlHistorialReferido +=
            `<tr>
                <td class="td-name">${item.datos_usuario_vendedor.razon_social}</td>
                <td>${tipo}</td>
                <td>${item.precio_refer_mask} ${item.moneda}</td>
                <td>${getFechaSinHora(item.fecha_actualizacion)}</td>
            </tr>`

    });
    $('.historial_referidos_negocios').html(htmlHistorialReferido);
    $('.pagination_historial').html(generatePaginations(datos))
}
function getReferidosRedesSociales(pag = 1) {
    let dataPlanes = {
        "uid_redsocial": user.uid,
        "empresa_redsocial": user.empresa,
        "pag": pag
    };

    let data_url = baseurl + "/controllers/referidos/?obtener_porcentaje_ganacia";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataPlanes }),
        dataType: "json",
        contentType: 'application/json',
        "headers": { 'x-api-key': user.token },
        success: async success => {
            $(".content__nodata6").hide("fast")
            if (success["status"] == "success") {
                console.log(success)
                showHistorialRedes(success)

            } else {
                $('.historial_referidos_redes').empty();
                $(".content__nodata6").show("slow")
                let validate_token = await erroresTokenEmpresa(success);
                if (!validate_token) { }

            }

        }, error: error => {
            $('.historial_referidos_redes').empty();
            $(".content__nodata6").show("slow")
            abrirAlerta(idioma['_trans06'], idioma['_trans537'])

        }
    });

}
function showHistorialRedes(datos) {
    let htmlHistorialReferido = "";
    $('.historial_referidos_redes').empty();
    $.each(datos.data, (i, item) => {
        if (item.precio_transaccion_moneda == "Nasbigold") {
            item.precio_transaccion_moneda = idioma.trans87_
        } else if (item.precio_transaccion_moneda == "Nasbiblue") {
            item.precio_transaccion_moneda = idioma.trans36_
        }
        console.log(item)
        htmlHistorialReferido +=
            `<tr>
                <td class="td-name text-start">${item.producto.titulo}</td>
                <td>${item.precio_transaccion_mask} ${item.precio_transaccion_moneda}</td>
                <td>${item.ganancia_publicacion_maks} ${item.producto.moneda_local}</td>
                <td>${getFechaSinHora(item.fecha_creacion)}</td>
            </tr>`

    });
    $('.historial_referidos_redes').html(htmlHistorialReferido);

}
function eventGeneratePaginations(pag) {
    getHistorialReferidos(pag);

}
////////////////////////////////////// estadisticas //////////////////////////////


function showInfoNegocioReferido() {
    let fecha = getFechaSinHora(infoNegocio.fecha_creacion)
    let estado = infoNegocio.estado ? idioma['trans21'] : idioma['trans22']
    console.log(fecha, estado)
    $(".nombre_dueno").text(infoNegocio.razon_social)
    $(".nombre_negocio").text(infoNegocio.nombre_empresa ? infoNegocio.nombre_empresa : infoNegocio.razon_social)
    $(".fecha_creacion").text(idioma['_trans548'].split("$").join(fecha))
    $(".estado_empresa").text(idioma['_trans549'].split("$").join(estado))
}

//////////////////////////////////// graficas ////////////////////////////////
var colores = ["rgba(234, 66, 98, 1)", "rgba(52, 116, 252, 1)", "rgba(77, 146, 247, 1)", "rgba(4, 5, 137, 1)", "rgba(4, 5, 137, 1)"]
function llenarSelectMes() {
    var Smeses = [
        { id: "12", nombre: idioma['trans256_12'] },
        { id: "11", nombre: idioma['trans256_11'] },
        { id: "10", nombre: idioma['trans256_10'] },
        { id: "9", nombre: idioma['trans256_9'] },
        { id: "8", nombre: idioma['trans256_8'] },
        { id: "7", nombre: idioma['trans256_7'] },
        { id: "6", nombre: idioma['trans256_6'] },
        { id: "5", nombre: idioma['trans256_5'] },
        { id: "4", nombre: idioma['trans256_4'] },
        { id: "3", nombre: idioma['trans256_3'] },
        { id: "2", nombre: idioma['trans256_2'] },
        { id: "1", nombre: idioma['trans256_1'] },

    ];
    let htmlMeses;
    let mes_actual = new Date().getMonth() + 1;
    let ano_actual = new Date().getFullYear();
    $(".content_select_meses").html(
        `<select class="form-control select2 select_meses"></select>`
    )
    $(".select_meses").empty();
    $.each(Smeses, (i, item) => {
        if ($(".select_anos option:selected").val() == ano_actual) {
            if (mes_actual >= item.id) {
                htmlMeses += `<option value="${item.id}">${item.nombre}</option>`
            }
        } else {
            htmlMeses += `<option value="${item.id}">${item.nombre}</option>`
        }


    })
    $(".select_meses").html(htmlMeses);
    $(".select_meses").selectpicker({
        size: 5,
        liveSearch: true

    });

}
function llenarSelectAno() {

    let htmlAnos;
    let ano_actual = new Date().getFullYear();


    var Sanos = []
    for (let index = 0; index <= 5; index++) {
        Sanos[index] = ano_actual - index;
    }
    $(".content_select_anos").html(
        `<select class="form-control select2 select_anos"></select>`
    )

    $(".select_anos").empty();
    $.each(Sanos, (i, item) => {
        htmlAnos += `<option value="${item}">${item}</option>`
    })

    $(".select_anos").html(htmlAnos);



    llenarSelectMes()

    $(".select_anos").selectpicker({
        size: 5

    });
    $(".select_orden_prod").selectpicker({
        size: 5,

    });
    $(".select_meses").change(($event) => {
        destruirGraficas(3)
        getInfoGraficaVS();
        getInfoGraficaResumen()
        getProductosReferido();

    });
    $(".select_anos").change(($event) => {
        destruirGraficas(3)
        llenarSelectMes()
        getInfoGraficaVS();
        getInfoGraficaResumen();

    });


}
function getInfoGraficaResumen() {
    let mes = $(".select_meses option:selected").val();
    let ano = $(".select_anos option:selected").val();
    let fecha_inicio = +new Date(mes + "/" + "01/" + ano + " 00:00:00")
    let dataVentas = {
        "uid": infoNegocio.uid,
        "empresa": infoNegocio.empresa,
        "fecha_inicio": fecha_inicio
    };

    let data_url = baseurl + "/controllers/referidos/?resumen_mensual";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataVentas }),
        dataType: "json",
        contentType: 'application/json',
        success: async success => {

            if (success["status"] == "success") {
                $(".content__nodata4").hide("fast")
                $(".content-grafica-resumen").show("fast")
                console.log("------> grafica resumen", success);
                prepararDataResumen(success.data)

            } else {
                destruirGraficas(3)
                $(".content__nodata4").show("fast")
                $(".content-grafica-resumen").hide("fast")

            }

        }, error: error => {
            destruirGraficas(3)
            abrirAlerta(idioma['_trans06'], idioma['_trans538'])

        }
    });
}


function getInfoGraficaVS() {
    let mes = $(".select_meses option:selected").val();
    let ano = $(".select_anos option:selected").val();
    let fecha_inicio = +new Date(mes + "/" + "01/" + ano + " 00:00:00")
    let hace_meses = $(".select_meses_estadistica option:selected").val();
    let dataVentas = {
        "uid": infoNegocio.uid,
        "empresa": infoNegocio.empresa,
        "fecha_inicio": fecha_inicio,
        "hace_meses": hace_meses
    };

    let data_url = baseurl + "/controllers/referidos/?ingresos_mensuales";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataVentas }),
        dataType: "json",
        contentType: 'application/json',
        success: async success => {
            if (success["status"] == "success") {
                $(".content__nodata5").hide("fast")
                $(".content-grafica-ingresos").show("fast")
                console.log("-----> grafica Vs", success);
                dataProductosReferido = success.data
                if (dataProductosReferido.mesactual.length > 0 || dataProductosReferido.mesanterior.length > 0) {
                    prepararDataVS(success.data)
                } else {
                    destruirGraficas(3)
                    $(".content__nodata5").show("fast")
                    $(".content-grafica-ingresos").hide("fast")


                }


            } else {
                destruirGraficas(3)
                $(".content__nodata5").show("fast")
                $(".content-grafica-ingresos").hide("fast")

            }

        }, error: error => {
            abrirAlerta(idioma['_trans06'], idioma['_trans539'])

        }
    });

}
function prepararDataResumen(datos) {
    let fecha = [];

    let titulo;
    let color;
    let datasetLabels = [];
    let dataset = [];
    datos.sort((a, b) => a.fecha_actualizacion - b.fecha_actualizacion)
    $.each(datos, (i, item) => {
        let cant = [];
        fecha.push(getFechaSinHora(item.fecha_actualizacion))
        // for (const o in datos) {
        //     cant[o]=null 
        //  }

        cant.splice(i, 1, item.cantidades_vendidas);
        // cant=item.cantidades_vendidas;
        titulo = item.titulo;
        color = colores[i];
        dataset.push({
            label: titulo,
            data: cant,
            backgroundColor: color,
            borderColor: color
        });
        datasetLabels.push(titulo);
    });
    let data = {
        //labels: datasetLabels,
        datasets: dataset
    }
    showGraficaResumen(data)
}


function prepararDataVS(datos) {
    let mes_anterior = [{ x: 0, y: 0 }];
    let mes_actual = [{ x: 0, y: 0 }];
    let dias_anterior = [];
    let dias_actual = []
    let dias_totales = [0]
    $.each(datos.mesanterior, (i, item) => {
        let fecha = new Date(parseInt(item.fecha_actualizacion))
        dias_anterior.push(fecha.getDate())
        let data = {
            x: fecha.getDate(),
            y: parseFloat(item.precio_usd)
        }

        mes_anterior.push(data)

    })

    $.each(datos.mesactual, (i, item) => {
        let fecha = new Date(parseInt(item.fecha_actualizacion))
        dias_actual.push(fecha.getDate())
        let data = {
            x: fecha.getDate(),
            y: parseFloat(item.precio_usd)
        }

        mes_actual.push(data)
    })
    let temporal = dias_anterior.concat(dias_actual)
    $.each(temporal, (i, item) => {
        if (!dias_totales.includes(item)) {
            dias_totales.push(item);
        }
    })
    mes_anterior.sort((a, b) => a.x - b.x);
    mes_actual.sort((a, b) => a.x - b.x);
    dias_totales.sort((a, b) => a - b);
    console.log(mes_actual, mes_anterior, dias_totales)
    showGraficaIngresosVS(mes_actual, mes_anterior, dias_totales)

}
function getMesesAnteriores() {
    let mes_selected = $(".select_meses option:selected").val()
    let ano_selected = $(".select_anos option:selected").val()
    let meses_restados = $(".select_meses_estadistica option:selected").val()
    let mesDate_selected = new Date(ano_selected + "/0" + mes_selected + "/01")
    mesDate_selected.setMonth(mesDate_selected.getMonth() + 1 - meses_restados)
    console.log(mesDate_selected,)
    return mesDate_selected.getMonth()
}

function showGraficaIngresosVS(act, ant, dias) {
    let mes_anterior = $(".select_meses option:selected").val() - $(".select_meses_estadistica option:selected").val()
    let data_opciones_anteriores = {
        label: idioma['trans257_'] + " (" + idioma['trans256_' + getMesesAnteriores()] + ')',
        data: ant,
        lineTension: 0,
        borderWidth: 4,
        fill: false,
        borderDash: [5, 5],
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHitRadius: 30,
        pointBorderWidth: 2,
        pointStyle: 'circle',
        stepped: true,
        borderJoinStyle: "round",
        backgroundColor: 'transparent',
        pointBorderColor: colores[2],
        pointBackgroundColor: colores[2],
        borderColor: colores[2]

    };

    let data_mes_actual = {
        label: idioma['trans255_'] + ' (' + $(".select_meses option:selected").text() + ')',
        data: act,
        borderWidth: 4,
        lineTension: 0,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointHitRadius: 30,
        pointBorderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: colores[3],
        pointBackgroundColor: colores[3],
        borderColor: colores[3],
        fill: false,
        borderJoinStyle: "round"
    };
    var ctx = document.getElementById('myChartVS').getContext('2d');
    chart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dias,
            datasets: [data_mes_actual, data_opciones_anteriores]

        },
        options: {
            responsive: true,
            legend: {
                display: false,

            },
            legendCallback: html_legend_personal_grafica2,
            tooltips: {
                titleFontColor: 'transparent',

                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            if (tooltipItem.index == 0) {
                                label = "(0,0)";
                            } else {
                                let registro_venta = tooltipItem.index;
                                let valor = Math.round(tooltipItem.yLabel * 100) / 100
                                let mensaje = idioma.trans264_.split('$r').join(registro_venta).split("$v").join(valor);
                                label = mensaje;
                            }
                        }

                        return label;
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: idioma.trans253_
                    },
                    gridLines: {
                        display: false,
                        color: "rgba(231, 231, 231, 1)",
                        lineWidth: 4,
                    },
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: idioma.trans254_
                    },
                    gridLines: {
                        display: false,
                        color: "rgba(231, 231, 231, 1)",
                        lineWidth: 4,
                    },
                }]
            }



        }
    });
    let myLegendContainer2 = document.getElementById("legend2");
    myLegendContainer2.innerHTML = chart2.generateLegend();
    let legendItems2 = myLegendContainer2.getElementsByTagName('li');
    for (var i = 0; i < legendItems2.length; i += 1) {
        legendItems2[i].addEventListener("click", legendClickCallback2, false);
    }


}
function showGraficaResumen(data) {

    var ctx = document.getElementById('myChartResumen').getContext('2d');
    ctx.canvas.clientHeight = '284px'
    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: data,


        // Configuration options go here
        options: {

            maintainAspectRatio: true,
            legend: {
                display: false,

            },


            legendCallback: html_legend_personal_grafica1,
            responsive: true,
            scaleShowLabels: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }, scaleLabel: {
                        display: true,
                        labelString: idioma._trans540
                    },
                    gridLines: {
                        display: false,
                        color: "rgba(231, 231, 231, 1)",
                        lineWidth: 4

                    },
                }],
                xAxes: [{
                    barPercentage: 0.4,
                    ticks: {
                        display: true,
                    },
                    gridLines: {
                        display: false,
                        color: "rgba(231, 231, 231, 1)",
                        lineWidth: 4

                    },
                }]
            }
            , tooltips: {
                callbacks: {
                    title: function (tooltipItem, data) {
                        //Return value for title
                        let title = data.datasets[tooltipItem[0].datasetIndex].label
                        console.log("<<<<<<<<<<<<<<<<<<<< tooltip", tooltipItem)
                        console.log("<<<<<<<<<<<<<<<<<<<<data", data)
                        return title;
                    },
                    label: function (tooltipItem, data) {


                        // console.log("\t -----> [ JDBC/tooltipItem]: ", tooltipItem);
                        // console.log("\t -----> [ JDBC/data]: ", data);
                        // console.log("\t -----> [ JDBC/data.datasets[tooltipItem.datasetIndex].label]: ", data.datasets[tooltipItem.datasetIndex].label);

                        let valor = Math.round(tooltipItem.yLabel * 100) / 100;
                        let mensaje = idioma._trans902.split('$u').join(valor);
                        console.log("\t -----> [ JDBC/mensaje]: ", mensaje);
                        let label = mensaje;

                        return label;
                    }
                }
            }
        }
    });

    let myLegendContainer = document.getElementById("legend");
    myLegendContainer.innerHTML = chart.generateLegend();
    let legendItems = myLegendContainer.getElementsByTagName('li');
    for (let i = 0; i < legendItems.length; i += 1) {
        legendItems[i].addEventListener("click", legendClickCallback, false);
    }


}
function html_legend_personal_grafica1(chart3) {
    var text = [];
    var ds = chart3.data.datasets;
    // var sum = ds.data.reduce(function add(a, b) { return a + b; }, 0);
    let titulo;
    text.push('<ul class="list-group ">');


    for (var i = 0; i < ds.length; i++) {
        let color = ds[i].backgroundColor;
        titulo = chart3.data.datasets[i].label;
        // if (titulo.length > 20) {
        //     titulo = titulo.substr(0, 20) + '...'; //truncate
        // }
        text.push('<li class="list-group-item" data-toggle="tooltip" title="' + titulo + '" style="background-color:' + color + '; !important" >');
        text.push(titulo);
        text.push('</li>');
        //  $('.list-group-item').css("border", 'blue', "!important"); 
    }
    text.push('</ul>');
    return text.join("");

};
function html_legend_personal_grafica2(chart4) {
    var text = [];
    var ds = chart4.data.datasets;
    // var sum = ds.data.reduce(function add(a, b) { return a + b; }, 0);
    let titulo;
    text.push('<ul class="list-group ">');


    for (var i = 0; i < ds.length; i++) {
        let color = ds[i].borderColor;
        console.log(ds)
        titulo = chart4.data.datasets[i].label;
        // if (titulo.length > 20) {
        //     titulo = titulo.substr(0, 20) + '...'; //truncate
        // }
        text.push('<li class="list-group-item" data-toggle="tooltip" title="' + titulo + '"style="background-color:' + color + '; !important" >');
        text.push(titulo);
        text.push('</li>');
        //  $('.list-group-item').css("border", 'blue', "!important"); 
    }
    text.push('</ul>');
    return text.join("");

};

function legendClickCallback(event) {
    console.log(event)
    event = event || window.event;
    var target = event.target || event.srcElement;
    while (target.nodeName !== 'LI') {
        target = target.parentElement;
    }
    var parent = target.parentElement;
    var index = Array.prototype.slice.call(parent.children).indexOf(target);

    [
        chart.getDatasetMeta(index),
    ].forEach(function (meta) {
        meta.hidden = meta.hidden === null ? !chart.data.datasets[index].hidden : null;
    });

    chart.update();
}
function legendClickCallback2(event) {
    console.log(event)
    event = event || window.event;
    var target = event.target || event.srcElement;
    while (target.nodeName !== 'LI') {
        target = target.parentElement;
    }
    var parent = target.parentElement;
    var index = Array.prototype.slice.call(parent.children).indexOf(target);

    [
        chart2.getDatasetMeta(index),
    ].forEach(function (meta) {
        meta.hidden = meta.hidden === null ? !chart2.data.datasets[index].hidden : null;
    });

    chart2.update();
}
/////////////////////////////////// tabla productos ///////////////////////////////

function getProductosReferido(pag = 1) {
    let mes = $(".select_meses option:selected").val();
    let ano = $(".select_anos option:selected").val();
    let fecha_inicio = +new Date(mes + "/" + "01/" + ano + " 00:00:00")
    let dataVentas = {
        "uid": infoNegocio.uid,
        "empresa": infoNegocio.empresa,
        "fecha_inicio": fecha_inicio,
        "pagina": pag
    };

    let data_url = baseurl + "/controllers/referidos/?ingresos_mensuales_paginacion";
    $.ajax({
        type: "POST",
        url: data_url,
        data: JSON.stringify({ "data": dataVentas }),
        dataType: "json",
        contentType: 'application/json',
        success: async success => {
            if (success["status"] == "success") {
                $(".content__nodata6").hide("fast")
                $(".pagination-prod-referido").show("fast")

                console.log("-----> Productos referido", success);
                showProductosReferido(success)

            } else {

                $(".ventas_negocio_referido").empty();
                $(".content__nodata6").show("fast")
                $(".pagination-prod-referido").hide("fast")


            }

        }, error: error => {
            abrirAlerta(idioma['_trans06'], idioma['_trans539'])

        }
    });

}

function showProductosReferido(datos) {

    if ($(".select_orden_prod option:selected").val() == "1") {
        datos.data.sort((a, b) => a.precio - b.precio)
    } else {
        datos.data.sort((a, b) => b.precio - a.precio)
    }
    let htmlProd = "";
    $(".ventas_negocio_referido").empty();
    $.each(datos.data, (i, item) => {
        let estado = arraydelosestados.find(f => f.id == item.estado).text
        if (item.foto_portada != "") {
            imagenEmpresa = item.foto_portada;
        } else {
            imagenEmpresa = imageDefault;
        }
        if (item.moneda == "Nasbigold") {
            item.moneda = idioma.trans87_
        } else if (item.moneda == "Nasbiblue") {
            item.moneda = idioma.trans36_
        }
        htmlProd =
            `<tr>
                <td class="td1">
                    <div class="flex-name" data-toggle="tooltip" title="${item.titulo}">
                        <div class="container-photo">
                            <img loading="lazy" alt="logo-${item.titulo} - nasbi.com" src="${imagenEmpresa}" class="img-produt">
                        </div>
                        <p class="txt-numb">#${item.id_producto}</p>
                        <p class="name-product">${item.titulo}</p>
                        <p class="visits">${item.visitas} ${idioma._trans399} ${item.cantidad_vendidas} ${idioma._trans400}</p>
                    </div>
                </td>
                <td class="td2">
                    <p class="text-gry">${item.precio_mask} ${item.moneda}</p>
                </td>
                <td class="td3">
                    <p class="text-gry">${item.cantidad}</p>
                </td>
                <td class="td4">
                    <p class="text-gry">${estado}</p>
                </td>
                <td class="td5">
                    <button class="btnTle historico_ventas_referido">${idioma._trans541}</button>
                </td>
            </tr>`
        $(".ventas_negocio_referido").append(htmlProd)
        $(".historico_ventas_referido").eq(i).off();
        $(".historico_ventas_referido").eq(i).on('click', { url: item.url_csv }, verHistorico)
    });
    let htmlContentPagination = "";
    let htmlContentItemsPagination = "";
    if (datos.total_paginas > 1) {
        let inicio = ((datos.pagina - 2) > 0 ? (datos.pagina - 2) : 1);
        let fin = ((inicio + 4) < datos.total_paginas ? (inicio + 4) : datos.total_paginas);
        if (fin == datos.total_paginas) {
            inicio = ((datos.pagina - 4) > 0 ? (datos.pagina - 4) : 1);
        }
        for (let index = inicio; index <= fin; ++index) {

            htmlContentItemsPagination += `<a onclick="eventGeneratePaginations2( ${index} )" class="${(index == datos.pagina ? 'active' : '')}">${index}</a>`;
        }
        let btnPrev = "";
        if (datos.pagina - 1 > 1) {
            let pag = datos.pagina - 1;
            btnPrev = `<a onclick="eventGeneratePaginations2( 1 )" class="AD">&laquo;</a>`;
        }
        let btnNext = "";
        if (datos.pagina + 1 < datos.total_paginas) {
            let pag = datos.pagina + 1;
            btnNext = `<a onclick="eventGeneratePaginations2( ${pag} )" class="AD">&raquo;</a>`;
        }
        let htmlPuntosIndexFin = "";
        if (fin < datos.total_paginas) {
            htmlContentItemsPagination += `<a> ... </a>`;

            let pag = datos.total_paginas;
            htmlContentItemsPagination += `<a onclick="eventGeneratePaginations2( ${datos.total_paginas} )" class="AD">${datos.total_paginas}</a>`;
        }
        htmlContentPagination +=
            `<div class="col-12">
            <div class="pagination pagination_list">
                `+ btnPrev + `
                `+ htmlContentItemsPagination + `
                `+ btnNext + `
            </div>
        </div>`;
    } else {
    }
    $(".pagination-prod-referido").html(htmlContentPagination)
}
function verHistorico(ev) {
    window.open('https://nasbi.peers2win.com/api/models/csv_detalle.php?k=' + ev.data.url)

}
function eventGeneratePaginations2(pag) {
    getProductosReferido(pag);

}

//////////////////////////////////////////////////////////////////////////////////
function abrirAlerta(titulo, text) {
    $(".alerta_titulo").text(titulo);
    $(".alerta_text").text(text);
    $("#modal-alertas-generales").modal("toggle")
}


