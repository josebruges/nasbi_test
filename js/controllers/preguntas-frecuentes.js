$(document).ready(($event) => {
    $('.btn-collapse').on('click', function (e) {
        let col_id = $(this).attr("data-target");
        if ($(col_id).is('.collapse:not(.show)')) {
            console.log("que paso")
            $(this).find('.flecha').attr('src', '../imagen/up.png')
        } else {
            $(this).find('.flecha').attr('src', '../imagen/down.png')
        }
    })
    $(".redireccion_tickets").on("click", function (params) {
        if (validarText(user)) {
            loadPage("tickets.php")
        } else {
            loadPage("registro.php")
        }

    })

})

