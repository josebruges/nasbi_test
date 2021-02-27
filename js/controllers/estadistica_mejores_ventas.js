let fecha_actual_general_mejores_ventas = +new Date();
let chart2 = null, chart1 = null;
let fecha_actua_listado_ingreso;

function validarlogueado() {
    if (validarText(user)) {
        filtrofecha_mejores_ventas("0");
        llenar_selects();
    } else {
        loadPage("index.php?s=0")
    }

}

function agregar_loading_ge_publi(clase) {
    let span_loading_ge;
    span_loading_ge = `<span class="spiner_modificar_publi">&nbsp;</span> <span class="spinner-border spinner-border-sm spiner_modificar_publi" role="status" aria-hidden="true"></span>`;
    $(clase).append(span_loading_ge);
}

function quitar_loading_ge_publi(clase) {
    $(clase).children(".spiner_modificar_publi").remove();
}


$(document).ready((e) => {
    validarlogueado();
    $('.select_meses_estadistica_ven').change(($event) => {
        seleccionado_opcion_mes = $event.target.value;
        destruir_grafica_mejores_ventas(2);
        filtrofecha_mejores_ventas($event.target.value, "1");
    });

    $('.select_orden_precio_list_mejore_ven').change(($event) => {
        cambio_orden_actual_list_mejoreven_in();
    });

    $('.cerrar_modal_info_comprador').click(($event) => {
        $('#modal-ver_info_comprador').modal('hide');
    });

});




function destruir_grafica_mejores_ventas(id) {
    switch (id) {
        case 1:
            if (chart1) {
                if (chart1.ctx != null) {
                    chart1.clear();
                    chart1.destroy();
                }
            }
            break;
        case 2:
            if (chart2) {
                if (chart2.ctx != null) {
                    $('.legends_grafica_dos').empty();
                    chart2.clear();
                    chart2.destroy();
                }
            }
            break;
        case 3:
            if (chart1 && chart2) {
                if (chart1.ctx != null) {
                    chart1.clear();
                    chart1.destroy();
                }
                if (chart2.ctx != null) {
                    $('.legends_grafica_dos').empty();
                    chart2.clear();
                    chart2.destroy();
                }
            } else {
                destruir_grafica_mejores_ventas(1);
                destruir_grafica_mejores_ventas(2);
            }

            break;
        default:
            break;
    }

}




async function llenar_selects() {
    let year_actual = await retorna_mes_year_o_dia("1", +new Date());
    year_select = [];

    llenar_select_mes_padre_estadistica();

    for (let y = 0; y < 5; y++) {
        let year_tratar = year_actual - y;
        year_select.push(year_tratar);

    }
    $('.select2_years_mejores_ventas').selectpicker('destroy');

    let htmlOptionyears_mejor = "";
    $.each(year_select, function (i, year) {
        htmlOptionyears_mejor += `<option value="${year}">${year}</option>`;
    });
    $('.select2_years_mejores_ventas').html(htmlOptionyears_mejor);
    $('.select2_years_mejores_ventas').off('changed.bs.select');
    $('.select2_years_mejores_ventas').on('changed.bs.select', onChangeyear);
    $('.select2_years_mejores_ventas').selectpicker({
    });


    let mesanterior_select = [
        { id: 1, nombre: idioma['trans257_'] },
        { id: 3, nombre: idioma['trans259_'] },
        { id: 6, nombre: idioma['trans262_'] },
    ];

    $('.select_meses_estadistica_ven').selectpicker('destroy');
    let select_meses_estadistica_select_ingresomensual = "";
    $.each(mesanterior_select, function (i, mes) {
        select_meses_estadistica_select_ingresomensual += `<option value="${mes.id}">${mes.nombre}</option>`;
    });
    $('.select_meses_estadistica_ven').html(select_meses_estadistica_select_ingresomensual);
    $('.select_meses_estadistica_ven').selectpicker({
        size: 7,
        liveSearch: false,
        dropupAuto: false,
        showSubtext: true
    });
    let mesanterior_select_orden = [
        { id: 2, nombre: idioma['trans30_'] },
        { id: 1, nombre: idioma['trans29_'] }
    ];

    $('.select_orden_precio_list_mejore_ven').selectpicker('destroy');
    let selecthtml_ordenamiento = "";
    selecthtml_ordenamiento += `<option selected disabled value="">${idioma.trans266_}</option>`
    $.each(mesanterior_select_orden, function (i, orden) {
        selecthtml_ordenamiento += `<option value="${orden.id}">${orden.nombre}</option>`;
    });
    $('.select_orden_precio_list_mejore_ven').html(selecthtml_ordenamiento);
    $('.select_orden_precio_list_mejore_ven').selectpicker({
        size: 7,
        liveSearch: false,
        dropupAuto: false,
        showSubtext: true
    });
}

async function llenar_select_mes_padre_estadistica(id = "1", year_escogido = "") {
    let fin, mes_actual = await retorna_mes_year_o_dia("2", +new Date());
    let year_actual = await retorna_mes_year_o_dia("1", +new Date());
    if (id != "1") {
        if (year_escogido == year_actual) {
            fin = mes_actual;
        } else {
            fin = 12;
        }
    } else {
        fin = mes_actual;
    }
    let meses = [];
    for (let index = 1; index <= fin; index++) {
        meses.push({ id: index, nombre_mes: idioma['trans256_' + index.toString()] }) //json estan los meses
    }

    $('.select1_meses_mejor_venta').selectpicker('destroy');

    let htmlOptionMeses = "";
    $.each(meses, function (i, mes) {
        htmlOptionMeses += `<option value="${mes.id}">${mes.nombre_mes}</option>`;
    });
    $('.select1_meses_mejor_venta').html(htmlOptionMeses);
    $('.select1_meses_mejor_venta').off('changed.bs.select');
    $('.select1_meses_mejor_venta').on('changed.bs.select', onChangeMes);
    $('.select1_meses_mejor_venta').selectpicker({
        size: 7,
        liveSearch: true,
        dropupAuto: false,
        showSubtext: true
    });
    $('.select1_meses_mejor_venta').val(mes_actual);
    $('.select1_meses_mejor_venta').selectpicker('refresh');
}


function onChangeMes($e) {
    destruir_grafica_mejores_ventas(3);

    let mes_escogido = $e.target.value;
    let year_elegido = $('.select2_years_mejores_ventas')[1].value;
    let fecha_a_enviar = [year_elegido, mes_escogido, '01'].join('-') + " 00:00:00";
    let meses_to_resta = $('.select_meses_estadistica_ven').val();
    fecha_a_enviar = +new Date(fecha_a_enviar);
    fecha_actual_general_mejores_ventas = fecha_a_enviar;
    if (validarNumero(fecha_a_enviar)) {

        preparar_data_mejores_ventas(fecha_a_enviar, meses_to_resta.toString());
    }
}

function onChangeyear($e) {
    destruir_grafica_mejores_ventas(3);
    let year_escogido = $e.target.value;
    let mes_escogido = $('.select1_meses_mejor_venta')[1].value;
    let fecha_a_enviar = [year_escogido, mes_escogido, '01'].join('-') + " 00:00:00";
    let meses_to_resta = $('.select_meses_estadistica_ven').val();
    fecha_a_enviar = +new Date(fecha_a_enviar);
    fecha_actual_general_mejores_ventas = fecha_a_enviar;
    llenar_select_mes_padre_estadistica("2", year_escogido);

    if (validarNumero(fecha_a_enviar)) {
        preparar_data_mejores_ventas(fecha_a_enviar, meses_to_resta.toString());
    }
}




function retorna_mes_year_o_dia(id, date) {
    return new Promise((resolve) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (day.length < 2) day = '0' + day;
        switch (id) {
            case '1':
                resolve(parseFloat(year));
                break;
            case '2':
                resolve(parseFloat(month));
                break;
            case '3':
                resolve(parseFloat(day));
                break;
            default:
                resolve([year, month, day].join('-') + " 00:00:00");
                break;
        }

    });
}



function modificar_fecha_elegida(date, restar_mes) {
    return new Promise((resolve) => {

        var d = new Date(date)
        d.setMonth((d.getMonth() + 1) - Number.parseInt(restar_mes));
        month = d.getMonth();
        day = d.getDay(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (month == 0 || month == "00") month = "12"

        //     month = '' + (d.getMonth() + 1 - restar_mes),
        //     month =  d.setMonth(d.getMonth() - Number.parseInt(restar_mes));
        //     day = '' + 1,
        //     year = d.getFullYear();
        // if (month.length < 2) month = '0' + month;
        // if (day.length < 2) day = '0' + day;
        // if (month == 0 || month == "00") month = "12"

        resolve([year, month, day].join('-') + " 00:00:00");
    });
}


async function filtrofecha_mejores_ventas(e, id = "") {
    let hoy = getFechaSinHora(fecha_actual_general_mejores_ventas);
    let meses_to_resta = e;
    let fecha_buscar = hoy + " 00:00:00";
    fecha_buscar = +new Date(fecha_buscar);
    fecha_buscar = await modificar_fecha_elegida(fecha_buscar, "0");
    fecha_buscar = +new Date(fecha_buscar);
    if (validarNumero(fecha_buscar)) {
        if (id == "1") {
            preparar_data_mejores_ventas(fecha_buscar, meses_to_resta, "1");

        } else {
            preparar_data_mejores_ventas(fecha_buscar, meses_to_resta);
        }

    }
}

function preparar_data_mejores_ventas(fecha_mejores_ventas, hace_meses, id = "") {
    let dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa,
            fecha_inicio: fecha_mejores_ventas,
            hace_meses
        }
    }
    if (id == "1") {
        optenerdata_grafica_2(dataEnviar, fecha_mejores_ventas, hace_meses);
    } else {
        optenerdata_grafica_1(dataEnviar, fecha_mejores_ventas, hace_meses);
        optenerdata_grafica_2(dataEnviar, fecha_mejores_ventas, hace_meses);
    }


}





async function optenerdata_grafica_1(dataEnviar) {

    let data_url = baseurl + "/controllers/ventas/?resumen_mensual";
    quitar_loading_ge_publi('.load_grafi');
    agregar_loading_ge_publi('.load_grafi');
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        quitar_loading_ge_publi('.load_grafi');
        if (res.status == 'success') {
            $('.no_data_en_grafica_resumen_vent').hide('fast');
            $('.div_grafica_1').show('fast');
            primera_grafica_mejores_ventas(res.data);

        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                destruir_grafica_mejores_ventas(3);
                $('.legends_grafica_uno').empty();
                $('.div_grafica_1').hide('fast');
                $('.no_data_en_grafica_resumen_vent').show('fast');
            }

        }

    }).fail((err) => {
        quitar_loading_ge_publi('.load_grafi');
        destruir_grafica_mejores_ventas(3);
        $('.div_grafica_1').hide('fast');
        $('.no_data_en_grafica_resumen_vent').show('fast');
        return presentAlertObject({ icon: 'error', text: idioma.trans_04 });

    });


}


function optenerdata_grafica_2(dataEnviar, fecha_actual, resta_de_actual) {
    fecha_actua_listado_ingreso = fecha_actual;
    let data_url = baseurl + "/controllers/ventas/?ingresos_mensuales";
    quitar_loading_ge_publi('.load_grafi');
    agregar_loading_ge_publi('.load_grafi');
    $('.legends_grafica_dos').empty();
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        quitar_loading_ge_publi('.load_grafi');
        if (res.status == 'success') {
            if (res.data.mesactual.length > 0 || res.data.mesanterior.length > 0) {

                $('.no_data_en_grafica_ingreso_mejores_venta').hide("fast");
                $('.div_grafica_2').show("fast");
                segunda_grafica_mejores_ventas(res.data, fecha_actual, resta_de_actual);

                if (res.data.mesactual.length > 0) {
                    $('.table_estadistica_ventas_style').show("fast");
                    $('.list__estadisticca_mejores_ventas__pagination').show("fast");
                    traer_data_ventas_ingreso_actual();
                } else {

                    $('.table_estadistica_ventas_style').hide("fast");
                    $('.list__estadisticca_mejores_ventas__pagination').hide("fast");
                    $('.no_data_en_lisstado_ingreso').show("fast");
                    $('._mejore_ventas_estadistica_resumen').empty();
                }
            } else {
                let validate_token = await erroresTokenEmpresa(res);
                if (!validate_token) {
                    $('.legends_grafica_dos').empty();
                    $('._mejore_ventas_estadistica_resumen').empty();
                    $('.list__estadisticca_mejores_ventas__pagination').hide("fast");
                    $('.no_data_en_lisstado_ingreso').show("fast");
                    $('.div_grafica_2').hide("fast");
                    $('.no_data_en_grafica_ingreso_mejores_venta').show("fast");
                    destruir_grafica_mejores_ventas(3);
                }
            }

        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                $('.legends_grafica_dos').empty();
                $('.div_grafica_2').hide("fast");
                $('.list__estadisticca_mejores_ventas__pagination').hide("fast");
                $('.no_data_en_grafica_ingreso_mejores_venta').show("fast");
                $('.no_data_en_lisstado_ingreso').show("fast");
                $('._mejore_ventas_estadistica_resumen').empty();
                destruir_grafica_mejores_ventas(3);
            }

        }

    }).fail((err) => {
        $('.legends_grafica_dos').empty();
        quitar_loading_ge_publi('.load_grafi');
        $('.div_grafica_2').hide("fast");
        $('.no_data_en_grafica_ingreso_mejores_venta').show("fast");
        $('.no_data_en_lisstado_ingreso').show("fast");
        $('._mejore_ventas_estadistica_resumen').empty();
        destruir_grafica_mejores_ventas(3);
        return presentAlertObject({ icon: 'error', text: idioma.trans_04 });
    });

}
function configurar_data_primera_grafica(data) {
    return new Promise((resolve) => {
        let data_conf = {
            labels: [],
            datasets: []

        };

        let colores_barras = ['#EB4454', '#4A00B1', '#0056B7', '#040589', '#94EDED']; //esto solo funciona con 5 
        let nombre_producto;
        let data_productos = [];

        for (const x in data) {
            const producto_grafi = data[x];
            nombre_producto = producto_grafi.titulo;
            let posiciones = [];

            data_conf.labels.push(nombre_producto);

            for (const o in data) {
                posiciones[o] = null
            }
            posiciones.splice(x, 1, producto_grafi.cantidades_vendidas);
            data_productos.push({
                label: nombre_producto,
                backgroundColor: colores_barras[x],
                borderColor: colores_barras[x],
                data: posiciones
            })

        }

        data_conf.datasets = data_productos;
        resolve(data_conf);
    });
}


async function primera_grafica_mejores_ventas(data) {
    let data_de_grafica;
    var ctx = document.getElementById('myChart').getContext('2d');
    data_de_grafica = await configurar_data_primera_grafica(data);

    chart1 = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        data: data_de_grafica,
        options: {
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
                    }
                }],
                xAxes: [{
                    ticks: {
                        callback: function (value) {
                            if (value.length > 10) {
                                return value.substr(0, 10) + '...'; //truncate
                            } else {
                                return value
                            }

                        },
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            let valor = Math.round(tooltipItem.yLabel * 100) / 100;
                            let mensaje = idioma.trans263_.split('$u').join(valor).split("$p").join(label);
                            label = mensaje;

                        }

                        return label;
                    },
                }
            },
        }
    });

    var myLegendContainer = document.getElementById("legend");
    myLegendContainer.innerHTML = chart1.generateLegend();
    var legendItems = myLegendContainer.getElementsByTagName('button');
    for (var i = 0; i < legendItems.length; i += 1) {
        legendItems[i].addEventListener("click", legendClickCallback, false);
    }
}


function html_legend_personal_grafica1(chart1) {
    var text = [];
    var ds = chart1.data.datasets[0];
    let titulo;
    text.push('<ul class="list-group ">');
    for (var i = 0; i < ds.data.length; i++) {
        let color = chart1.data.datasets[i].borderColor;
        titulo = chart1.data.labels[i];
        if (titulo.length > 20) {
            titulo = titulo.substr(0, 20) + '...'; //truncate
        }
        text.push('<li style="list-style:none;">');
        text.push('<button class="btnTle opcion_legend_mejores_vents botones_grafica_uno" style="background-color:' + color + '; !important" ">' + titulo + '</button>');
        text.push('</li>');
    }
    text.push('</ul>');
    return text.join("");

};






function legendClickCallback(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    while (target.nodeName !== 'LI') {
        target = target.parentElement;
    }
    var parent = target.parentElement;
    var index = Array.prototype.slice.call(parent.children).indexOf(target);

    [
        chart1.getDatasetMeta(index),
    ].forEach(function (meta) {
        meta.hidden = meta.hidden === null ? !chart1.data.datasets[index].hidden : null;
    });

    chart1.update();
}


async function configurar_puntos(data_pre_esta, id = "") {
    return new Promise((resolve) => {
        let data_dias_mes_actual_x = [];
        let data_valores_usd_actual_y = [];
        let coordenadas = [];
        data_dias_mes_actual_x.push(0);
        data_valores_usd_actual_y.push(0);
        coordenadas.push({ x: 0, y: 0 });


        for (const x in data_pre_esta) {
            const data_puntos = data_pre_esta[x];
            let posicion_existencia;

            let d = new Date(parseFloat(data_puntos.fecha_actualizacion)),
                day = '' + d.getDate();
            //if (day.length < 2) day =
            day = parseFloat(day);

            if (data_dias_mes_actual_x.includes(day)) {
                posicion_existencia = data_dias_mes_actual_x.indexOf(day);

                if (posicion_existencia >= 0) {
                    data_valores_usd_actual_y[posicion_existencia] = data_valores_usd_actual_y[posicion_existencia] + parseFloat(data_puntos.precio_usd);
                    coordenadas[posicion_existencia].y = coordenadas[posicion_existencia].y + parseFloat(data_puntos.precio_usd);
                }
            } else {
                data_dias_mes_actual_x.push(day);
                data_valores_usd_actual_y.push(parseFloat(data_puntos.precio_usd));
                coordenadas.push({ x: parseFloat(day), y: parseFloat(data_puntos.precio_usd) });
            }
        }



        resolve({ puntos_x: data_dias_mes_actual_x, puntos_y: data_valores_usd_actual_y, coordenadas });

    });

}


async function eliminarduplicados(data) {
    return new Promise((resolve) => {
        let array_norepetido = [];
        for (const x in data) {
            if (!array_norepetido.includes(data[x])) {
                array_norepetido.push(data[x]);
            }
        }
        resolve(array_norepetido);
    });

}

async function traer_mes_anterior_actual(fecha_actual, fecha_mes_anterior) {
    return new Promise((resolve) => {
        let mes_actual, mes_anterior;
        var actual = new Date(fecha_actual),
            month1 = '' + (actual.getMonth() + 1);

        var anterior = new Date(fecha_mes_anterior),
            month2 = '' + (anterior.getMonth() + 1)

        let meses = [];
        for (let index = 1; index <= 12; index++) {
            meses.push({ id: index, nombre_mes: idioma['trans256_' + index.toString()] }) //json estan los meses
        }

        mes_actual = meses.filter(mes => mes.id == month1)[0];
        mes_anterior = meses.filter(mes => mes.id == month2)[0];
        resolve({ mes_actual, mes_anterior });
    });

}

async function segunda_grafica_mejores_ventas(data, fecha_actual, resta_de_actual) {

    if (resta_de_actual == '0' || !validarText(resta_de_actual)) {
        resta_de_actual = '1';
    }
    let data_puntos_mesaactual = await configurar_puntos(data.mesactual, "actual");
    let data_puntos_mesanterior = await configurar_puntos(data.mesanterior, "anterior");
    let union_tolabels = data_puntos_mesaactual.puntos_x.concat(data_puntos_mesanterior.puntos_x);
    let sin_du_union_tolabels = await eliminarduplicados(union_tolabels);
    let fecha_mes_anterior = await modificar_fecha_elegida(fecha_actual, resta_de_actual);
    let meses_anterior_actual = await traer_mes_anterior_actual(fecha_actual, +new Date(fecha_mes_anterior));


    sin_du_union_tolabels = sin_du_union_tolabels.sort((a, b) => a - b);
    let data_mes_actual = {
        label: idioma.trans255_ + " ( " + meses_anterior_actual.mes_actual.nombre_mes + " )",
        data: data_puntos_mesaactual.coordenadas,
        lineTension: 0,
        fill: false,
        borderDash: [5, 5],
        pointRadius: 3,
        pointHoverRadius: 10,
        pointHitRadius: 30,
        pointBorderWidth: 2,
        pointStyle: 'rectRounded',
        stepped: true,
        backgroundColor: 'transparent',
        pointBorderColor: "#0056B7",
        pointBackgroundColor: "#0056B7",
        borderColor: "#0056B7"

    };

    let data_opciones_anteriores = {
        label: idioma.trans257_ + " ( " + meses_anterior_actual.mes_anterior.nombre_mes + " )",
        data: data_puntos_mesanterior.coordenadas,
        pointRadius: 3,
        pointBorderColor: "#040589",
        pointBackgroundColor: "#040589",
        borderColor: "#040589",
        fill: false,
    };

    let ctx2 = document.getElementById('myChart2').getContext('2d');
    chart2 = new Chart(ctx2, {
        // The type of chart2 we want to create
        type: 'line',

        // The data for our dataset
        data:
        {
            //  labels: ['','primera venta', 'segunda venta', 'tercera venta', 'cuarta', 'quinta', 'sexta' ],
            labels: sin_du_union_tolabels,
            datasets: [data_mes_actual, data_opciones_anteriores]
        },
        options: {
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
                    scaleLabel: {
                        display: true,
                        labelString: idioma.trans253_
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: idioma.trans254_
                    }
                }]
            }



        }
    });

    let myLegendContainer = document.getElementById("legend2");
    myLegendContainer.innerHTML = chart2.generateLegend();
    let legendItems = myLegendContainer.getElementsByClassName('btn_mejores_ventas2');
    for (let i = 0; i < legendItems.length; i += 1) {
        legendItems[i].addEventListener("click", legendClickCallback2, false);
    }


}



async function llenar_tabla_ingreso_mejores_ventas(data, paginas_total_mejores_ventas, pagina_mejores_ventas) {
    $('._mejore_ventas_estadistica_resumen').empty();
    for (const x in data) {
        const ingreso_mes_actual = data[x];
        let visitas = ingreso_mes_actual.visitas;
        let ventas = ingreso_mes_actual.cantidad_vendidas;
        let fecha_en_que_finalizo = new Date(ingreso_mes_actual.fecha_actualizacion);
        let fecha_actual = new Date();
        var diasdif = fecha_actual.getTime() - fecha_en_que_finalizo.getTime();
        var dias = Math.round(diasdif / (1000 * 60 * 60 * 24));
        let texto_visit_ = idioma.trans510_.split("$v").join(visitas).split("$d").join(dias).split("$m").join(ventas);
        let fecha_mostrar = getFechaSinHora(ingreso_mes_actual.fecha_actualizacion);
        $('._mejore_ventas_estadistica_resumen').append(
            `<tr>
            <td class="td1">
                <div class="flex-name">
                    <div class="container-photo">
                        <img src=${ingreso_mes_actual.foto_portada} class="img-produt">
                    </div>
                    <p class="txt-numb">#${ingreso_mes_actual.id}</p>
                    <p class="name-product">${ingreso_mes_actual.titulo}</p>
                    <p class="visits">${texto_visit_}</p>
                </div>
            </td>
            <td class="td2">
                <p>${ingreso_mes_actual.precio_usd_mask} USD</p>
            </td>
            <td class="td3">
                <p>${ingreso_mes_actual.cantidad}</p>

            </td>
            <td class="td4">
                <p>${fecha_mostrar}</p>
            </td>
            <td class="td4">
                <button class="btnTle ver_info_comprador ">${idioma.trans270_}</button>
               
            </td>
            <td class="td5">
                <div class="dropdown ">
                    <button class="btnTle opciones_estadistica_style dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   ${idioma._trans332}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item factura_estaditica_descargar" href="#">${idioma.trans271_}</a>
                       
                    </div>
                </div>
            </td>
        </tr>`
        );


        $('.ver_info_comprador').eq(x).off('click');
        $('.ver_info_comprador').eq(x).on('click', { ...ingreso_mes_actual }, modal_info_commprador);

        $(".factura_estaditica_descargar").eq(x).off();
        $(".factura_estaditica_descargar").eq(x).on('click', { url: ingreso_mes_actual.url_csv }, descargar_factura);
    }
    let paramsPagination = {
        total_paginas: paginas_total_mejores_ventas,
        pagina: pagina_mejores_ventas
    };
    let result = generatePaginations(paramsPagination);
    $('.list__estadisticca_mejores_ventas__pagination').html(result);
    // $('html, body').animate({scrollTop:0},500);
}

function descargar_factura(ev) {
    window.open('https://nasbi.peers2win.com/api/models/csv_detalle.php?k=' + ev.data.url)
}


function modal_info_commprador($e) {
    let data_comprador = $e.data.datos_usuario_comprador;
    $('#modal-ver_info_comprador').modal('show');
    $('.nombre_comprador_mejores_vents').text(data_comprador.nombre);
    $('.tel_comprador_mejores_vents').text(data_comprador.telefono);
    $('.correo_comprador_mejores_vents').text(data_comprador.correo);
}



function cambio_orden_actual_list_mejoreven_in(pagina = 1) {
    let opcion_escogida = $('.select_orden_precio_list_mejore_ven')[1].value;
    if (opcion_escogida == "2") {
        traer_data_ventas_ingreso_actual(pagina, "DESC", "2");
    } else {
        traer_data_ventas_ingreso_actual(pagina, "ASC", "2");
    }
}


function traer_data_ventas_ingreso_actual(pagina = 1, orden = "DESC", id = "1") {
    let dataEnviar
    if (id == "1") {
        dataEnviar = {
            data: {
                uid: user.uid,
                empresa: user.empresa,
                fecha_inicio: fecha_actua_listado_ingreso,
                pagina
            }
        }

    } else {
        dataEnviar = {
            data: {
                uid: user.uid,
                empresa: user.empresa,
                fecha_inicio: fecha_actua_listado_ingreso,
                pagina,
                order_precio: orden

            }
        }

    }
    agregar_loading_ge_publi('.load_tabla');

    let data_url = baseurl + "/controllers/ventas/?ingresos_mensuales_paginacion";
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        quitar_loading_ge_publi('.load_tabla');
        if (res.status == 'success') {
            $('.no_data_en_lisstado_ingreso').hide("fast");
            llenar_tabla_ingreso_mejores_ventas(res.data, res.total_paginas, res.pagina);
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) {
                $('._mejore_ventas_estadistica_resumen').empty();
                $('.no_data_en_lisstado_ingreso').show("fast");
            }


        }

    }).fail((err) => {
        quitar_loading_ge_publi('.load_tabla');
        return presentAlertObject({ icon: 'error', text: idioma.trans_04 });

    });
}


function eventGeneratePaginations(pagView = 1) {
    cambio_orden_actual_list_mejoreven_in(pagView);
}




function html_legend_personal_grafica2(chart2) {
    var text = [];
    var ds = chart2.data.datasets[0];
    let titulo;
    text.push('<ul class="list-group ">');
    for (var i = 0; i <= ds.data.length; i++) {
        if (chart2.data.datasets[i]) {

            let color = chart2.data.datasets[i].borderColor;

            titulo = chart2.data.datasets[i].label;
            if (titulo.length > 40) {
                titulo = titulo.substr(0, 40) + '...'; //truncate
            }
            text.push('<li style="list-style:none;">');
            text.push('<button class="btn_mejores_ventas2 btnTle botones_grafica_dos opcion_legend_mejores_vents2" style="background-color:' + color + '!important" ">' + titulo + '</button>');
            text.push('</li>');
        }
    }
    text.push('</ul>');
    return text.join("");

};

function legendClickCallback2(event) {
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







