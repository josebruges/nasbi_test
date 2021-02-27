let moneda= "Nasbigold"; 
let arrays_fuentes=[]; 
let fecha_trans=""; 
let transaciones_bonos = localStorage.getItem("mis_bonos_subasta");
if(validarlogueado()){
    if ( transaciones_bonos==".bonos_transacciones") {
        $(transaciones_bonos).click();
        cargardatos();
        getdatatransaciones();
    }
}

$(document).ready((e)=> {
    $(".bonos_transacciones").click(($event) => {
        localStorage.setItem("mis_bonos_subasta", ".bonos_transacciones");
        console.log("transacciones", localStorage.getItem("mis_bonos_subasta") ); 
        cargardatos();
        getdatatransaciones();
    }); 
    $(".select_moneda").change(($event) => {
        moneda=$event.target.value; 
        getdatatransaciones(); 
    }); 
    $('._fecha_trans_fil').change(($event) => {
        filtrofecha_trans($event.target.value); 
    });
    $('.boton_limpiar_fecha').click(($event) => {
        $('._fecha_trans_fil').val('').datepicker('update'); 
        fecha_trans="";
        $('._fecha_trans_fil').val(idioma.trans236_);
    });
});
function restringirinputfecha(id, val ) {
    let hoy= getFechaSinHora(new Date());
    $('.fechaparaelfiltro').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        endDate: hoy,
        language: 'es'
    });
    if(!validarNumero(val) || val=="0"){
      $('#'+id).val(idioma.trans236_);
    }
}
function filtrofecha_trans(e) {
    let fecha_buscar=e+" 00:00:00"; 
    fecha_trans=+new Date(fecha_buscar);
   if(validarNumero(fecha_trans)){
       getdatatransaciones();
    }else{
        $('._fecha_trans_fil').val(idioma.trans236_);
        fecha_trans="";
        getdatatransaciones();
    }
}


function getdatatransaciones(pagina=1) {
    agregar_loading_ge_publi(".transaciones_titu"); 
    $('.transacciones__list__nodata').show("slow");
    const dataEnviar = {
        "data" : {
            "uid": user.uid,
            "empresa": user.empresa,
            "moneda": moneda,
            "fecha_inicio": fecha_trans, 
            "pagina": pagina
        }
    };
    console.log(dataEnviar, "data"); 
    console.log('dataEnviar', dataEnviar);
    $.ajax({
        type: "POST",
        url:  `${baseurl}/controllers/nasbicoin/?transacciones`,
        data: dataEnviar,
        dataType: "json",
        "headers": { 'x-api-key': user.token },
    }).done(async(res)=>{
        quitar_loading_ge_publi(".transaciones_titu");
        if(res.status == 'success') {
            $('.transacciones__list__nodata').hide("slow");
            $('.list__transaciones__pagination').show("fast");
            llenarTransacciones(res.data, res.total_paginas, res.pagina ); 
        }else if(res.status == 'fail'){
            $('.list__transaciones__pagination').hide("fast");
            $('.transacciones__list').empty();
            $('.transacciones__list__nodata').show("slow");
        }else {
            let validate_token = await erroresTokenEmpresa(res);
            if (validate_token) return 0 ;
        }
    }).fail((err)=>{
        quitar_loading_ge_publi(".transaciones_titu"); 
        $('.list__transaciones__pagination').hide("fast");
        $('.transacciones__list').empty();
        $('.transacciones__list__nodata').show("slow");
        presentAlertObject({icon: 'error', text: idioma.trans_04});
    });
}
function llenarTransacciones(transaciones, paginas_total, pagina=1){
    let decrementar, aumentar, items, fuente_pago = '', asociado; 
    $('.transacciones__list').empty();
    for (const x in transaciones) {
        const transaccion = transaciones[x];
        console.log(transaccion.tipo, "mm"); 
        fuente_pago = arrays_fuentes.filter(datos => datos.id == transaccion.tipo)[0];
        let fecha_mostrar= getFechaConHora(transaccion.fecha_actualizacion); 
        if(transaccion.tipo==1){
            asociado="-";
        }else{
            asociado=transaccion.datos_user_envio.nombre;
        }
        $('.transacciones__list').append(
            `<tr>
                <td>
                    <span><img loading="lazy" src="../imagen/../imagen/logo-mtd.png"></span>${fuente_pago.text}
                </td>
                <td>#${transaccion.id_transaccion} - ${asociado}</td>
                <td><b>${transaccion.monto_mask}</b></td>
                <td>${fecha_mostrar}</td>
            </tr>`
        );
        $('.verdetalle').eq(x).off('click');
        $('.verdetalle').eq(x).on('click', { transaccion } , verdetalle);
    }
    let paramsPagination = {
        total_paginas: paginas_total,
        pagina: pagina
    };
    let result = generatePaginations( paramsPagination );
    $('.list__transaciones__pagination').html( result );
    $('html, body').animate({scrollTop:0},500);
    
}
function cargardatos() {
    arrays_fuentes= [
        {id: 1, text: idioma.trans40_},
        {id: 2, text: idioma.trans41_},
        {id: 3, text: idioma.trans42_},
        {id: 4, text: idioma.trans448_},
    ];

    let opciones_moneda = [
        {id: "Nasbigold", text: idioma.trans37_},
        {id: "Nasbiblue", text: idioma.trans36_}
    ];
    $('.select_moneda').selectpicker('destroy');
    let select_moneda = "";
    $.each(opciones_moneda, function(i, fuente) { 
        select_moneda += `<option value="${fuente.id}">${fuente.text}</option>`;
    });
    $('.select_moneda').html(select_moneda);
    $('.select_moneda').selectpicker({
        size: 7,
        liveSearch: false,
        dropupAuto: false,
        showSubtext: true
    });
}
function verdetalle(e){
}