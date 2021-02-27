$(document).ready(e => {
    let mis_cuentas_factura = localStorage.getItem("mis_cuentas");
    if (mis_cuentas_factura == ".sidenav_facturacion") {
        $(mis_cuentas_factura).click();
        facturacion();
    }

    $(".sidenav_facturacion").click(($event) => {
        if (validarlogueado_2()) {
            localStorage.setItem("mis_cuentas", ".sidenav_facturacion");
            facturacion();
        }
    });

    // $('.sidenav_facturacion').off('click');
    // $('.sidenav_facturacion').on('click', event => {
    //     localStorage.setItem("mis_cuentas", ".sidenav_facturacion");
    //     facturacion();
    // });

    $('.btn_descargar_facturacion').off('click');
    $('.btn_descargar_facturacion').on('click', convertToPDF);
});

function facturacion() {

    $('.__view_facturacion').addClass('d-none');
    $('.__notviewfact').removeClass('d-none');

    let data_url = baseurl + "/controllers/ventas/?facturacion";
    //facturacion
    const dataEnviar = {
        data: {
            uid: user.uid,
            empresa: user.empresa
        }
    }
    $.ajax({
        type: 'POST',
        url: data_url,
        data: dataEnviar,
        dataType: 'json',
    }).done((res) => {
        if (res.status != 'success') return $('.__view_f__notviewfactacturacion').toggleClass('d-none');

        agrupar(res.data).then((agrupado) => {
            console.log("array agrupado por rangos ", agrupado);
            $('.__view_facturacion').toggleClass('d-none');
            $('.__notviewfact').toggleClass('d-none');
            llenarFacturacion(agrupado);
        });
    }).fail((err) => {
        $('.__notviewfact').toggleClass('d-none');
    });
}

function llenarFacturacion(factura) {
    console.log("FACTURA = AGRUPADO: ", factura);
    let facturaItems = Object.values(factura);
    console.log("FACTURA-ITEMS: ", facturaItems);
    let htmlFactura = ``;

    for (let i in facturaItems) {
        for (let j in facturaItems[i].data) {
            const fac = facturaItems[i].data[j];
            console.log("UN ITEM");

            let id_carrito;
            if (fac.id_carrito !== undefined) {
                id_carrito = fac.id_carrito;
            } else {
                id_carrito = 0;
            }

            let status;

            if (fac.estado_pago_transaccion == 0) {
                status = idioma.trans254;
            } else if (fac.estado_pago_transaccion == 1) {
                status = idioma.trans255;
            } else if (fac.estado_pago_transaccion == 2) {
                status = idioma.trans256;
            }

            htmlFactura += `
            <tr>
                <td>${facturaItems[i].fecha}</td>
                <td>Marketplace</td>
                <td>$${fac.precio_mask}</td>
                <td>${status}</td>
                <td>${id_carrito}</td>
                <td>-</td>
            </tr>
            `;

        }
    }
    // for (const x in facturaItems) {
    //     const fac = facturaItems[x];

    //     let id_carrito;
    //     if(fac.data[x].id_carrito !== undefined){
    //         id_carrito = fac.data[x].id_carrito;
    //     }else{
    //         id_carrito = 0;
    //     }

    //     let status;

    //     if(fac.data[x].estado_pago_transaccion == 0){
    //         status = idioma.trans254;
    //     }else if(fac.data[x].estado_pago_transaccion == 1){
    //         status = idioma.trans255;
    //     }else if(fac.data[x].estado_pago_transaccion == 2){
    //         status = idioma.trans256;
    //     }

    //     htmlFactura += `
    //     <tr>
    //         <td>${fac.fecha}</td>
    //         <td>Marketplace</td>
    //         <td>$${fac.data[x].precio_mask}</td>
    //         <td>${status}</td>
    //         <td>${id_carrito}</td>
    //         <td>-</td>
    //     </tr>
    //     `;
    // }
    $('.__table_facturacion').html(htmlFactura);
}

function order(data, campo) {
    return data.sort(function (a, b) {
        return b[campo] > a[campo] ? -1 : 1;
    });
}

function nextDate(fecha) {
    let next = new Date(fecha)
    return next.setDate(next.getDate() + 1);
}

function createRange(fechaInicial) {
    return { inicial: fechaInicial, final: fechaInicial + 2592000000 }

}

function filterData(arr, rango) {
    return arr.filter((row) => {
        return row.fecha_actualizacion >= rango.inicial && row.fecha_actualizacion <= rango.final;
    })
}

function createDate(fecha) {
    let convert = new Date(fecha).toLocaleDateString();
    console.log('convert', convert);
    convert = convert.split("/")[2] + "/" + convert.split("/")[1] + "/" + convert.split("/")[0];
    return convert;
}

async function agrupar(arr) {
    let agrupado = await createNewData(arr);
    return agrupado;
}

async function createNewData(arr) {
    if (arr.length == 0) {
        return {};
    }
    console.log("DATA_AGRUPADA: ", dataAgrupada);
    if (Object.keys(dataAgrupada).length == 0) { //primera vez
        console.log('arr[0].fecha_actualizacion', arr[0].fecha_actualizacion);
        rango = createRange(arr[0].fecha_actualizacion); // creo el rango apartir de la primera fecha
    }
    else {
        console.log('rango.final', rango.final);
        let next = nextDate(rango.final); // para q me retorne la siguiente fecha de dodonde termina el rango
        rango = createRange(next) // crear nuevo rango apartir de esa fecha
    }


    let filter = await filterData(arr, rango);
    if (filter.length > 0) {
        let key = createDate(rango.inicial) + " - " + createDate(rango.final);
        let total = filter.map((row) => row.precio_usd).reduce((acc, next) => {
            return acc += next;
        })
        dataAgrupada[key] = { data: filter, total, fecha: key };
    }

    if (rango.final >= arr[arr.length - 1].fecha_actualizacion) { // se termino ya esta todo agrupado
        return dataAgrupada;
    }
    else {
        return createNewData(arr);
    }

}
function convertToPDF() {
    // var pdf = new jsPDF('p', 'pt', 'a4');

    // source = $(".contenedor_facturacion")[0];

    // specialElementHandlers = {
    //     '#bypassme': function (element, renderer) {
    //         return true
    //     }
    // };
    // margins = {
    //     top: 80,
    //     bottom: 60,
    //     left: 40,
    //     width: 550
    // };

    // pdf.fromHTML(
    //     source,
    //     margins.left, // x coord
    //     margins.top, { // y coord
    //     'width': margins.width,
    //     'elementHandlers': specialElementHandlers
    // },

    //     function (dispose) {
    //         pdf.save('reporte de facturacion.pdf');
    //     }, margins
    // );
    $(".btn_descargar_facturacion").css("display", "none")
    $(".responsive-table-facturacion").css("max-height", "none")
    element = $(".contenedor_facturacion")[0];

    var opt = {
        margin: [2, 1, 1.6, 1],
        filename: 'reporte_facturacion.pdf',
        image: { type: 'jpeg', quality: 0.99 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).toPdf().save()

    setTimeout(() => {
        $(".btn_descargar_facturacion").css("display", "")
        $(".responsive-table-facturacion").css("max-height", "300px")
    }, 100);


}

// const productosActivv = ["camisa","moto","carro","celular"];

// function generateData(cantidad){
// 	let info = [];
// 	for(let i=0;i < cantidad;i++){
// 		let precio = Math.floor(Math.random() * (100 - 10)) + 10;
// 		let prod = Math.floor(Math.random() * (4 - 0)) + 0;
// 		let mes = Math.floor(Math.random() * (12 - 1)) + 1;
// 		let dia = Math.floor(Math.random() * (30 - 1)) + 1;
// 		let fecha = "2020/"+mes+"/"+dia;
// 		let fecha_actualizacion = new Date(fecha).getTime();
// 		info.push({
// 			fecha,
// 			fecha_actualizacion,
// 			valor:precio,
// 			nombre:productosActivv[prod]
// 		})
// 	}
// 	return info;
// }

let dataAgrupada = {}; // donde guardare ya todo el resultado
let rango = {}; // este lo usare para los rangos de fecha
// let data = generateData(20); // creo una data aleatoria para trabajar
// data = order(data,"fecha_actualizacion") // ordenar por fecha;
// console.log("la data ",data);
// agrupar(data).then((agrupado)=>{
// 	console.log("array agrupado por rangos ",agrupado);
// });
