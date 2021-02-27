// const urlBlogP2W = "https://nasbi.peers2win.com/apiP2WBackendBlock/controllers/";
// const urlImagenP2W = "https://nasbi.peers2win.com/apiP2WBackendBlock/";
const urlBlogP2W = "https://blog.peers2win.com/controllers/";
const urlImagenP2W = "https://blog.peers2win.com/";

let data_noticia; 
let paramsURL_url_item_escuela;
let array_tipos_articulos=[];
let bPreguntar = true;
$(".navbar__idioma").hide(); //hay que ocultar el select de idioma debido que si cambia de idioma el articulo por su url no lo haria

     
window.onbeforeunload = reaparecer_select_idioma; //hay que ocultar el select de idioma debido que si cambia de idioma el articulo por su url no lo haria
 
function reaparecer_select_idioma(){
    $(".navbar__idioma").show(); 
}



$(document).ready(($event) => {
    let params_edit_publi = new URLSearchParams(location.search);
    paramsURL_url_item_escuela = params_edit_publi.get('url');
    cargarPrimero();
});

function cargarPrimero() {
    llenar_array_de_tipos(); 
    get_info_noticia_escogida(paramsURL_url_item_escuela); 
    
}

function get_info_noticia_escogida(url) {
    if(url){
        url= url.toString(); 
        
        let data_url = urlBlogP2W+"block/getBlogs.php";
        $.ajax({
            type: 'GET',
            url: data_url,
            data: {url},
            dataType: 'json',
        }).done((res) => {
        llenar_campos_noticia(res); 

        }).fail((err) => {
        
        });
    }
    
}


function llenar_campos_noticia(data) {
    let data_noticia= data.data;
    let titulo_barra= data_noticia.titulo.replace(/<[^>]*>?/g, '');//eso es para quitar el html que venga 
    let titulo_noticia= data_noticia.titulo.split('<h1>').join("").split('</h1>').join(""); 
    let fecha= data_noticia.fecha.split("-"); 
    let fecha_noticia_card= fecha[2]+"-"+fecha[1]+"-"+fecha[0];
    let img_noticia=  urlImagenP2W+data_noticia.imagen; 
    let contenido= data_noticia.contenido;
    let texto_img_tipo= array_tipos_articulos.filter(estado => estado.id == data_noticia.tipo_block_id || estado.id_en == data_noticia.tipo_block_id)[0];
    let alt= data_noticia.alt.replace(/ /g,'');
    if(validarText(texto_img_tipo.img)){
        $('.imagen_icon_tipo').attr("src", texto_img_tipo.img); 
        $('.tipo_articulo_info').text(texto_img_tipo.nombre); 
    }
    $('.title_noticia_nasby').html(titulo_barra);
    $('.titulo_noticia_dom_escue').html(titulo_noticia);
    $('.fecha_noticia').text(fecha_noticia_card);
    $('.img_noticia').prop("src", img_noticia).prop("alt", alt).prop("title", data_noticia.titulo_img).prop("loading","lazy"); 


    $('.contenido_noticia').html(contenido);
    
    llenar_campos_mas_visto(data); 
    
}



function llenar_campos_mas_visto(data) {
    let data_mas_vistos=[]; 
     data_mas_vistos= data.masvistos; 

     $('.proximo_articulo').empty();

     for (const x in data_mas_vistos) {
         const mas_visto= data_mas_vistos[x];
         let alt= mas_visto.alt.replace(/ /g,''); 
         let titulo= mas_visto.titulo.replace(/<[^>]*>?/g, '');
             $('.proximo_articulo').append(
                 `<div class="card-notics">
                 <h5>${titulo}</h5>
                 <img loading="lazy" alt=${alt} title=${mas_visto.titulo_img} src=${urlImagenP2W+mas_visto.imagen}>
                 <button class="ver_articulo_mas_visto">${idioma.trans500_}</button>
             </div>`
         );
        
        $('.ver_articulo_mas_visto').eq(x).off('click');
        $('.ver_articulo_mas_visto').eq(x).on('click', { index:x,  data: mas_visto }, recursividad_info_cad);
    }

}

function recursividad_info_cad($e) {
    let data_recursiva_masvisto= $e.data.data; 

    if (data_recursiva_masvisto.url.indexOf("http") > -1) {
        location.href = data_recursiva_masvisto.url; 
    } else {
       location.href="./info-card.php?url="+data_recursiva_masvisto.url;
   }
    
}

function llenar_array_de_tipos() {
    if(idioma){
    array_tipos_articulos = [
        { id: 29, id_en: 34, nombre: idioma.trans496_, img: '../imagen/escuela-vendedores/icono_gerencia.svg' },
        { id: 30, id_en: 35, nombre: idioma.trans497_, img: '../imagen/escuela-vendedores/icono_mercadeo.svg' },
        { id: 31, id_en: 36, nombre: idioma._trans662, img: '../imagen/escuela-vendedores/icono_servicio.svg' },
        { id: 32, id_en: 37, nombre: idioma.trans498_, img: '../imagen/escuela-vendedores/icono_finanzas.svg' },
        { id: 33, id_en: 38, nombre: idioma.trans499_, img: '../imagen/escuela-vendedores/Icono_logistica.svg'}
        
    ];
    }else{
        console.log("falta idioma"); 
    }
   }
