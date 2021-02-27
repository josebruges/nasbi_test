let params = new URLSearchParams(location.search);
let datos = {
    uid: (params.get('uid') == undefined ? "" : params.get('uid')),
    empresa: (params.get('empresa') == undefined ? "" : params.get('empresa'))
};
var categorias_vendedor = [
    { id: 1, nombre: "Bronze", texto: idioma['_trans850'] },
    { id: 2, nombre: "Silver", texto: idioma['_trans851'] },
    { id: 3, nombre: "Gold", texto: idioma['_trans852'] },
    { id: 4, nombre: "Platinum", texto: idioma['_trans853'] },
    { id: 5, nombre: "Diamond", texto: idioma['_trans854'] },
]

var schemaDatosVendedor;
var paisesJSON = []

function cargarPrimero() {
    getDatosVendedor();
    getComentarios();
    getDatosVendedorT();
}
$(document).ready(($event) => {
    $(".filtro_meses").selectpicker()
    $(".filtro_meses").change(function () {
        getComentarios()
    })
})

function getDatosVendedor() {

    let data_url = baseurl + "/controllers/datos_vendedor/?calificacion";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": datos },
        dataType: "json",
        success: datos => {
            if (datos['status'] == "success") {
                schemaDatosVendedor = datos['data']
                cargarDatos()

            } else {
                abrirAlerta(idioma['_trans462'], idioma['_trans150']);
            }
        }, error: error => {
            abrirAlerta(idioma['_trans462'], idioma['_trans506']);
        }
    });
}

function getDatosVendedorT() {

    let data_url = baseurl + "/controllers/datos_vendedor/?calificacion__total";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": datos },
        dataType: "json",
        success: datos => {
            console.log(datos);
            if (datos['status'] == "success") {
                $('.ventas_total').text(datos.data.promedio.ventas_seis_meses);
            } else {
                abrirAlerta(idioma['_trans462'], idioma['_trans150']);
            }
        }, error: error => {
            abrirAlerta(idioma['_trans462'], idioma['_trans506']);
        }
    });
}

async function cargarDatos() {
    paisesJSON = JSON.parse(localStorage.getItem('paises'));
    if (schemaDatosVendedor.direccion) { //valida existencia de direcciones
        var pais = paisesJSON.find(f => f.country_id == schemaDatosVendedor.direccion.pais);
        var dep = pais.departamento.find(d => d.zone_id == schemaDatosVendedor.direccion.departamento)
        $(".label_tittle_ubicacion").show()
        $('.ciudad_vendedor').text(dep.name + ", " + schemaDatosVendedor.direccion.ciudad)
    } else {
        $('.ciudad_vendedor').text("")
        $(".label_tittle_ubicacion").hide()


    }

    $('.nombre-usuario').text(schemaDatosVendedor.usuario.nombre.trim())
    if (schemaDatosVendedor.usuario.empresa) {
        $(".img_vendedor").attr('src', schemaDatosVendedor.usuario.foto ? schemaDatosVendedor.usuario.foto : "../imagen/avatar.png")

    } else {
        $(".img_vendedor").attr('src', "../imagen/avatar/" + schemaDatosVendedor.usuario.foto + ".png")
    }

    $('.brinda_atencion').html(
        `${getRatesIcons(schemaDatosVendedor.promedio.buena_atencion_prom)}
         <span><img src="../imagen/insignias/atencion.png"></span>
        <span class="text-insig ">${idioma._trans151}</span>`)

    $('.satisfaccion_producto').html(
        `${getRatesIcons(schemaDatosVendedor.promedio.satisfaccion_producto_prom)}
         <span><img src="../imagen/insignias/satisfaccion.png"></span>
        <span class="text-insig ">${idioma._trans152}</span>`)
    $('.tiempo_entrega').html(
        `${getRatesIcons(schemaDatosVendedor.promedio.tiempo_entrega_prom)}
         <span><img src="../imagen/insignias/tiempo.png"></span>
        <span class="text-insig ">${idioma._trans153}</span>`)
    $('.fidelidad_producto').html(
        `${getRatesIcons(schemaDatosVendedor.promedio.fidelidad_producto_prom)}
         <span><img src="../imagen/insignias/fidelidad.png"></span>
        <span class="text-insig ">${idioma._trans154}</span>`)
    $('.comentarios').text(schemaDatosVendedor.promedio.cantidad_comentarios)
    $('.buenos').text(schemaDatosVendedor.promedio.buenos)
    $('.regulares').text(schemaDatosVendedor.promedio.regulares)
    $('.malos').text(schemaDatosVendedor.promedio.malos);
    $('.clasificacion-general').html(`<span>${schemaDatosVendedor.promedio.general_prom}</span> ${getRatesIcons(schemaDatosVendedor.promedio.general_prom)}`);
    $('.ventas_seis_meses').text(schemaDatosVendedor.promedio.ventas_seis_meses);
    $('.datos__vendedor_clasifica').text(idioma['_trans157'] + " " + schemaDatosVendedor.promedio.vendedor_tipo);
    let mensaje = ""
    if (schemaDatosVendedor.escala.escala > 0) {
        mensaje = idioma['_trans835']
    }
    if (parseFloat(schemaDatosVendedor.promedio.general_prom) <= 0) {
        $('.datos__vendedor_califica').text("")
    } else {
        $('.datos__vendedor_califica').text(categorias_vendedor.find(f => f.nombre == schemaDatosVendedor.promedio.vendedor_tipo).texto)

    }
    let porc = schemaDatosVendedor.promedio.general_prom * 100 / 5.00
    $('.porcentaje_bar').css('width', porc + '%')

}
function getComentarios(pag = 1) {
    let meses = $('.filtro_meses option:selected').val()
    let dataComents = {
        "uid": datos.uid,
        "empresa": datos.empresa,
        "meses": meses,
        "pagina": pag
    }

    let data_url = baseurl + "/controllers/datos_vendedor/?calificacion_paginado";
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": dataComents },
        dataType: "json",
        success: datos => {
            if (datos['status'] == "success") {
                $('.content__nodata').hide("fast");
                listarComentarios(datos)


            } else {
                $('.content__nodata').show("slow");

            }
        }, error: error => {
            abrirAlerta(idioma['_trans06'], idioma['_trans507']);
        }
    });
}
function listarComentarios(datos) {
    let htmlCms = "";
    $('.scroll-comentarios').empty()
    $.each(datos.data, (i, item) => {
        let fondo = i % 2 ? `` : `text-fondo`
        htmlCms += `<div class="row ${fondo}">
                        <div class="col-md-9">
                            <p class="text-comentario ">
                                <span><img src="../imagen/icon-preguntas.png"></span>
                                ${item.descripcion}
                                <span>${getFechaConHoraV2(parseInt(item.fecha_creacion))}</span>
                            </p>
                        </div>
                        <div class="col-md-3 calif-comentario">
                            ${getRatesIcons(parseFloat(item.promedio).toFixed(2))}
                        </div>
                    </div>`
    });
    $('.scroll-comentarios').html(htmlCms)
    $('.pagination').html(generatePaginations(datos))
}
function eventGeneratePaginations(pag) {
    getComentarios(pag)

}
function abrirAlerta(titulo, texto) {
    $(".alerta_titulo").text(titulo);
    $(".alerta_texto").text(texto);
    $("#modal_alertas_generales").modal("toggle");
}