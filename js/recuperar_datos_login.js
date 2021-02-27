let API_URL = 'https://peers2win.com/api/controllers/'; // este es para restablecer usuario

$(document).ready((e)=> {
    $(".olvideclave_contrase_usuatrio").click(($event) => {
       recuperar_contra_user(); 
    });

    $(".olvideclave_contrase_empresa").click(($event) => {
        recuperar_contra_empresa(); 
     });

});


function recuperar_contra_user() {
    $('#modal-recuperar_contra').modal('show'); 

    $('.aceptar_recuperar_con_user').off('click');
    $('.aceptar_recuperar_con_user').on('click',null, function() {
        validar_campos_envio_data(".correo_recuperar", ".correo_recuperar_confirm", 1); 
    }); 
    
    
    $('.cancelar_recuperar_con_user').off('click');
    $('.cancelar_recuperar_con_user').on('click',null, function() {
        document.getElementById("usuario_recuperar_pass").reset();
        $('#modal-recuperar_contra').modal('hide'); 
    }); 
}

function recuperar_contra_empresa() {
    $('#modal-recuperar_contra_empresa').modal('show'); 

    $('.aceptar_recuperar_con_empresa').off('click');
    $('.aceptar_recuperar_con_empresa').on('click',null, function() {
        validar_campos_envio_data(".correo_recuperar_empresa", ".correo_recuperar_confirm_empresa", 2); 
    }); 
    
    $('.cancelar_recuperar_con_empresa').off('click');
    $('.cancelar_recuperar_con_empresa').on('click',null, function() {
        document.getElementById("empresa_recuperar_pass").reset();
        $('#modal-recuperar_contra_empresa').modal('hide'); 
    }); 
}


async function validar_campos_envio_data(class_correo1, class_correo2, id) {
    let correo_uno = $(class_correo1).val()
    let confirm_correo = $(class_correo2).val(); 
   
    if(validarText(correo_uno) && validarText(confirm_correo)){
        let validar_correo = await validar_si_escorreo_newsleter(correo_uno);  //esta funcion esta en suscribir_correo_newsleter
        let validar_confirmacion_correo =  await validar_si_escorreo_newsleter(confirm_correo); 
        if(validar_correo && validar_confirmacion_correo){
            if(correo_uno==confirm_correo){
                if(id==1){
                 enviar_data_a_recupar_pass_user(correo_uno); 
                }else{
                 enviar_data_a_recupar_pass_empresa(correo_uno);  
                }
            }else{
                presentAlertObject({ icon: 'error', text: idioma.trans426_ });
            }
        }else{
            presentAlertObject({ icon: 'error', text: idioma.trans425_ });
        }
    }else{
        presentAlertObject({ icon: 'error', text: idioma._trans96 });
    }

 
    
}

function enviar_data_a_recupar_pass_empresa(correo_uno) {
    agregar_loading_ge_publi_footer(".aceptar_recuperar_con_empresa"); //esta funcion esta en suscribir_correo_newsleter
    let data_url = baseurl + "/controllers/empresas/?generar_token";

    let datosEnvio = {
        "data": {
            "correo": correo_uno
        }
    }
    $.ajax({
        type: "POST",
        url: data_url,
        data: datosEnvio
    }).done(res => {
        quitar_loading_ge_publi_footer(".aceptar_recuperar_con_empresa"); 
        if (res.status == 'success') {
            $(".cancelar_recuperar_con_empresa").click(); 
            presentAlertObject_alert_new({ icon: 'info', text: idioma.trans428_ });
           
        } else if (res.status == 'errorCorreo') {
            if(res.message=="El correo ingresado no no se encuentrá registrado"){
                presentAlertObject_alert_new({ icon: 'error', text: idioma.trans427_ });
            }else{
                presentAlertObject_alert_new({ icon: 'error', text: idioma._trans06 });
            }
          
        }else{
            presentAlertObject_alert_new({ icon: 'error', text: idioma._trans06 });
        }
    }).fail((err) => {
        quitar_loading_ge_publi_footer(".aceptar_recuperar_con_empresa"); 
        presentAlertObject_alert_new({ icon: 'error', text: idioma.trans_04 });
     
    });
  
}





function enviar_data_a_recupar_pass_user(correo_uno) {
    agregar_loading_ge_publi_footer(".aceptar_recuperar_con_user"); //esta funcion esta en suscribir_correo_newsleter

    $.ajax({
        type: "POST",
        url: API_URL+"users/recuperarpassword.php",
        data: {
            email: correo_uno,
            plataforma: 3
        }
    }).done(res => {
        quitar_loading_ge_publi_footer(".aceptar_recuperar_con_user"); 
        console.log(res.status, "mmmmm"); 
        if (res.status == 'success') {
            $(".cancelar_recuperar_con_user").click();
            presentAlertObject_alert_new({ icon: 'info', text: idioma.trans428_ });
           
        } else if (res.status == 'error') {
            if(res.message=="El correo ingresado no se encuentra registrado"){
                presentAlertObject_alert_new({ icon: 'error', text: idioma.trans427_ });
            }else{
                presentAlertObject_alert_new({ icon: 'error', text: idioma._trans06 });
            }
        }
    }).fail((err) => {
        quitar_loading_ge_publi_footer(".aceptar_recuperar_con_user"); 
        presentAlertObject_alert_new({ icon: 'error', text: idioma._trans06 });
     
    });
    

    
}





