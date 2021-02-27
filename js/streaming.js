const urlBlogP2W = "https://nasbi.peers2win.com/apiP2WBackendBlock/controllers/";
const urlImagenP2W = "https://nasbi.peers2win.com/apiP2WBackendBlock/";

let lenguaje;

$(document).ready((e)=> {
    $('.nodata_items_pre').hide();
    console.log(localLenguaje, "el real")
    lenguaje=localLenguaje.toLowerCase(); 
    cargarBlog(lenguaje); 
});


function retorna_mes_year_o_dia(id, date) {
    let meses=[]; 
    for (let index = 1; index <= 12; index++) {
        meses.push({id: index, nombre_mes: idioma['trans256_'+index.toString()]}) //json estan los meses
    }
    var d = new Date(date), 
    month = '' + (d.getMonth() + 1), 
    day = '' + d.getDate(), 
    year = d.getFullYear(); 
    if (day.length < 2) day = '0' + day; 
    switch (id) {
        case '1':
        return (parseFloat(year)); 
        break;
        case '2':
        return (parseFloat(month)); 
        break;
        case '3':
        return (parseFloat(day)); 
        break;
        case '4': //Devuelve el mes dia año por separado y tambien el mes en letra ya sea en ingles o español
        mes_letra= meses.filter(mes=> mes.id == parseFloat(month))[0]
        return ({year:parseFloat(year), mes: parseFloat(month), dia: parseFloat(day), mes_letra: mes_letra.nombre_mes}); 
        break;    
        default:
        return ([year, month, day].join('-')+" 00:00:00"); 
        break;
    }
}




function cargarBlog(lenguaje='es') {
    $('.content__loadingSpinner_escuela_vendedores').show(); 
    console.log(lenguaje, "mmmm"); 
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/eventos/?ver_eventos`,
        data: {
            data: {
                idioma: lenguaje,
                iso_code_2: iso_code_2_money
            }
        },
        dataType: 'json',
    }).done(data => {
        if(data.status == 'success'){
            $('.content__loadingSpinner_escuela_vendedores').hide(); 
            if(data.data){
                $('.nodata_items_pre').hide();
                $('.list__escuela_vendedores__pagination').show();
                llenar_ultimas_noticias(data.data); 
            }else{
                $('.nodata_items_pre').show();
                $('.list__escuela_vendedores__pagination').hide();
                $('.list_items_pre').empty();
                $('.carousel_items_escuela_vendedores').hide(); 
                return presentAlertObject({icon: 'error', text: idioma.trans_04});
            }
        }else{
            $('.nodata_items_pre').show();
            $('.list__escuela_vendedores__pagination').hide();
            $('.list_items_pre').empty();
            $('.carousel_items_escuela_vendedores').hide(); 
            return presentAlertObject({icon: 'error', text: idioma.trans_04});
        }
    }).fail((err)=>{
        $('.content__loadingSpinner_escuela_vendedores').hide(); 
        $('.nodata_items_pre').show();
        $('.list__escuela_vendedores__pagination').hide();
        $('.carousel_items_escuela_vendedores').hide(); 
        return presentAlertObject({icon: 'error', text: idioma.trans_04});
    });
}



function llenar_ultimas_noticias(data){
    $('.carousel_items_escuela_vendedores').hide(); 
    let mas_vistos = data; 
    let con=0;
    
    for (const x in mas_vistos) {
        const mas_visto_item = mas_vistos[x];
        let fecha= +new Date(mas_visto_item.fecha_inicio)
        let fecha_configurada = retorna_mes_year_o_dia("4", fecha);
        let dia= fecha_configurada.dia;
        let mes= fecha_configurada.mes_letra;
        let year= fecha_configurada.year; 
        let titulo= mas_visto_item.titulo.split('<h1>').join("").split('</h1>').join(""); 
        let fecha_noticia= idioma.trans286_.split('$d').join(dia).split('$m').join(mes).split('$a').join(year); 
        
        let html= 
        `
        <div class="item">
            <div class="container-noticia">
                <img src=${mas_visto_item.img}>
                <h5>${mas_visto_item.titulo}</h5>
                <p><i class="fas fa-clock"></i><span> </span>${fecha_noticia}</p>
            </div>
        </div>
        `; 
        
        
        $('.carousel-escuela-noticias').trigger('add.owl.carousel', html);
        $('.carousel-escuela-noticias .item').eq(con).off('click');
        $('.carousel-escuela-noticias .item').eq(con).on('click', { mas_visto_item }, pasar_info_card); 
        con++; 
    }
    
    setTimeout(() => {
        $('.carousel_items_escuela_vendedores').show(); 
    }, 800);
    
    
}



function pasar_info_card(event){
    const evento = event.data.mas_visto_item;
    $('.__img_evento').prop('src', evento.img);
    $('.__titulo_evento').html(evento.titulo);
    $('.__descripcion_evento').html(evento.subtitulo);

    let fecha= +new Date(evento.fecha_inicio)
    let fecha_configurada = retorna_mes_year_o_dia("4", fecha);
    let dia= fecha_configurada.dia;
    let mes= fecha_configurada.mes_letra;
    let year= fecha_configurada.year; 
    let fecha_noticia= idioma.trans286_.split('$d').join(dia).split('$m').join(mes).split('$a').join(year); 
    $('.__hora_evento').html(`<i class="fas fa-clock"></i> <span>${fecha_noticia}</span>`);

    if(validarText(user)){
        $('.__inscribirse_evento').off('click');
        $('.__inscribirse_evento').on('click', { evento }, inscribirseEvento); 
    }

    $('#modal-info-evento').modal('show');
}

function inscribirseEvento(event) {
    const evento = event.data.evento;
    console.log('evento', evento);
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/eventos/?inscribirse_evento`,
        "headers": { 'x-api-key': user.token },
        data: {
            data: {
                id: evento.id,
                uid: user.uid,
                empresa: user.empresa
            }
        },
        dataType: 'json',
    }).done(async data => {
        if(data.status == 'success'){
            return presentAlertObject({icon: 'info', text: idioma.trans161});
        }else{
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token){
                return presentAlertObject({icon: 'error', text: idioma.trans_04});
            }    
        }
    }).fail((err)=>{
        return presentAlertObject({icon: 'error', text: idioma.trans_04});
    });
}

function eventGeneratePaginations( pagView = 1 ){
    llenar_data_items(pagView); 
}
