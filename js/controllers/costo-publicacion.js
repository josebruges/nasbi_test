$(document).ready(($event) => {
    const lenguaje = localStorage.getItem("lenguaje");
    $.getJSON(`../json/categorias_${lenguaje}.json`, function (data) {
        cargar_tarifas_publicacion(data);
    });

    $('.ver-categorias').on("click", function () {
        //const seccion = $('.to_scroll');
        // window.scrollTo(0,seccion[0].offsetTop + 150);
        $("html, body").animate({ scrollTop: 730 }, 1000);
    });

});

function cargar_tarifas_publicacion(data) {
    const seccion_tbody = $('.categorias_tbody');
    data.forEach(categoria => {
        if (categoria.CategoryIDPath !== "") {
            seccion_tbody.append(

                `
                <tr>
                    <td>${categoria.CategoryName} </td>
                    <td>${categoria.tarifaPublicacion.gratuita} </td>
                    <td>${categoria.tarifaPublicacion.clasica} </td>
                    <td style="color: #6200EA;"><b>${categoria.tarifaPublicacion.premium} </b></td>
                </tr>
                    
                `
            );
        }
    });
}