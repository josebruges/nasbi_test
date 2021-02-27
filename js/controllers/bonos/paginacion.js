
function eventGeneratePaginations( pagView = 1 ){
  let  respuesta_evento_pag_bonos = localStorage.getItem("mis_bonos_subasta");
  
    if ( respuesta_evento_pag_bonos== ".bonos_dif_blo" ) {
        getdife_blo( pagView );
    }

    if ( respuesta_evento_pag_bonos == ".bonos_transacciones" ) {
        getdatatransaciones( pagView );
    }

  
   
}