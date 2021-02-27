// INICIO: 07 octubre developer JDBC

var schemaChat = {
    "id": 0
};
// FIN: 07 octubre developer JDBC
var receptor = {
    id: 0,
    empresa: 0
}
var producto = []
var pag_actual;
var total_paginas;
var first_top;
var scrollA;
function abrirChat(ev) {
    first_top = false;
    pag_actual = 1;
    let productos_de_parametro = ev.data.productos;
    producto = ev.data.item;
    console.log("------------>", producto)

    schemaChat = producto;

    if (schemaChat.uid_vendedor == user.uid) {
        console.log("\n\n\n\n----+> bloquendo chat (1)");
        if (schemaChat.estado == 13) {
            $(".btn-camara").hide("slow");
            $(".chat_input_mensaje").hide("slow");
            console.log("\t----+> bloquendo chat (2)");
        } else {
            $(".btn-camara").show("slow");
            $(".chat_input_mensaje").show("slow");
            console.log("\t----+> bloquendo chat (3)");
        }
    } else {
        if (schemaChat.estado >= 10) {
            $(".btn-camara").hide("slow");
            $(".chat_input_mensaje").hide("slow");
        } else {
            $(".btn-camara").show("slow");
            $(".chat_input_mensaje").show("slow");
        }
    }


    showInfoProducto(1);
    $(".content_msgs_chat").empty()
    chat_verChat();
    enviarFoto();
    $('#modal-chat').modal("toggle")
    $('.chat_input_mensaje').off()
    $('.chat_input_mensaje').keypress(function (e) {
        /* ENTER PRESSED*/
        if (e.keyCode == 13) {
            chat_enviarMensajes();
        }
    });
    $(".content_scroll").off()
    $(".content_scroll").scroll(function () {
        var pos = $('.content_scroll').scrollTop();
        if (pos == 0 && first_top && pag_actual < total_paginas) {
            console.log('top of the div', pag_actual, total_paginas);
            chat_verChat(pag_actual + 1)
        }
        first_top = true;
    });

    if (productos_de_parametro) {
        if (typeof productos_de_parametro == "object") {
            let validacion_si_array_u_objeto = Array.isArray(productos_de_parametro);
            if (!validacion_si_array_u_objeto) {
                let keys_object = Object.keys(productos_de_parametro).length;
                if (keys_object > 1) {
                    $('.chat__nasbi__btnprev').show();
                    $('.chat__nasbi__btnnext').show();
                    $('.chat__nasbi__btnprev').off('click');
                    $('.chat__nasbi__btnprev').on('click', { tipo: -1, array_productos_carrito: productos_de_parametro }, prevNext_chat)
                    $('.chat__nasbi__btnnext').off('click');
                    $('.chat__nasbi__btnnext').on('click', { tipo: 1, array_productos_carrito: productos_de_parametro }, prevNext_chat)
                } else {
                    $('.chat__nasbi__btnprev').hide();
                    $('.chat__nasbi__btnnext').hide();
                }
            }

        }
    }

}

function showInfoProducto(pag = 1) {


    let htmlPrecioGlobal_chat = "";
    htmlPrecioGlobal_chat += `${(producto.dataCarritoFull.total_bd > 0) ? "<span>" + producto.dataCarritoFull.total_bd_mask + " " + getCoinLabelSymbol("Nasbiblue") + "</span><br>" : ""}`;
    htmlPrecioGlobal_chat += `${(producto.dataCarritoFull.total_sd > 0) ? "<span>" + producto.dataCarritoFull.total_sd_mask + " " + getCoinLabelSymbol("Nasbigold") + "</span><br>" : ""}`;
    htmlPrecioGlobal_chat += `${(producto.dataCarritoFull.total_fiat > 0) ? "<span>" + producto.dataCarritoFull.total_fiat_mask + " " + getCoinLabelSymbol(producto.moneda_fiat) + "</span><br>" : ""}`;

    let htmlPrecio_chat = "";
    htmlPrecio_chat += `${(producto.bd > 0) ? "<span>" + producto.bd_mask + " " + getCoinLabelSymbol("Nasbiblue") + "</span><br>" : ""}`;
    htmlPrecio_chat += `${(producto.sd > 0) ? "<span>" + producto.sd_mask + " " + getCoinLabelSymbol("Nasbigold") + "</span><br>" : ""}`;
    htmlPrecio_chat += `${(producto.fiat > 0) ? "<span>" + producto.fiat_mask + " " + getCoinLabelSymbol(producto.moneda_fiat) + "</span><br>" : ""}`;

    console.log("\n\n\n\n\n\n\n");
    console.log("\t [ producto / producto.dataCarritoFull.total_bd ]: ", producto.dataCarritoFull.total_bd);
    console.log("\t [ producto / producto.dataCarritoFull.total_sd ]: ", producto.dataCarritoFull.total_sd);
    console.log("\t [ producto / producto.dataCarritoFull.total_fiat ]: ", producto.dataCarritoFull.total_fiat);
    console.log("\n\n ...::: Producto precios :::...");
    console.log("\t [ producto / producto.bd ]: ", producto.bd);
    console.log("\t [ producto / producto.sd ]: ", producto.sd);
    console.log("\t [ producto / producto.fiat ]: ", producto.fiat);

    let imagenProducto = "";
    if (producto.foto_portada != "" && producto.foto_portada != null) {
        imagenProducto = producto.foto_portada;
    } else {
        imagenProducto = imageDefault;
    }
    let moneda;
    if (producto.moneda == "Nasbigold") {
        producto.moneda = idioma.trans87_;
    } else if (producto.moneda == "Nasbiblue") {
        producto.moneda = idioma.trans36_;
    }

    if (user.uid == producto.uid_vendedor) {
        receptor.id = producto.uid_comprador;
        receptor.empresa = producto.empresa_comprador
        if (producto.empresa_comprador == 0) {
            $('.chat_conectado_con').text(producto.datos_usuario_comprador.nombre)
            getAvatar(producto.datos_usuario_comprador.foto)

        } else {
            $('.chat_conectado_con').text(producto.datos_usuario_comprador.empresa)
            if (validarText(producto.datos_usuario_comprador.foto)) {
                $('.chat_img_user').attr('src', producto.datos_usuario_comprador.foto)
            } else {
                $('.chat_img_user').attr('src', "../imagen/avatar.png")
            }
        }
        $('.chat_nombre_vendedor').text(producto.datos_usuario_comprador.nombre)
        $('.chat_nombre_empresa').text(producto.datos_usuario_comprador.empresa)

        $('.chat_datos_vendedor').attr('href', 'datos-vendedor.php?uid=' + producto.uid_comprador + '&empresa=' + producto.empresa)
        $('.chat_empresa_info').attr('href', 'productos-empresa.php?empresa=' + producto.uid_comprador)

    } else {
        receptor.id = producto.uid_vendedor;
        receptor.empresa = producto.empresa
        if (producto.empresa == 0) {
            $('.chat_conectado_con').text(producto.datos_usuario_vendedor.nombre)
            getAvatar(producto.datos_usuario_vendedor.foto)
        }
        else {
            $('.chat_conectado_con').text(producto.datos_usuario_vendedor.empresa)
            if (validarText(producto.datos_usuario_vendedor.foto)) {
                $('.chat_img_user').attr('src', producto.datos_usuario_vendedor.foto)
            } else {
                $('.chat_img_user').attr('src', "../imagen/avatar.png")
            }
        }
        $('.chat_nombre_vendedor').text(producto.datos_usuario_vendedor.nombre);
        $('.chat_nombre_empresa').text(producto.datos_usuario_vendedor.empresa);
        $('.chat_conectado_con').text(producto.datos_usuario_vendedor.nombre);

    }
    // $('.chat_img_producto').attr('src', imagenProducto)
    // $('.chat_nombre_producto').text(producto.titulo)
    // $('.chat_detalle_prod').attr('href', 'producto.php?uid=' + producto.id_producto)
    // $('.chat_precio_producto').html( htmlPrecio_chat );

    mostrar_datos_producto(imagenProducto, producto.titulo, producto.id_producto, htmlPrecio_chat, 0);

    // $('.chat_precio_producto').text(producto.precio_mask + " " + producto.moneda)
    /////validar descuento
    // $('.chat_precio_antes').text(producto)
    // $('.chat_desc_porcentaje').text(producto)

    $(".notif_chat" + producto.id).hide("fast")
    $(".notif_chat" + producto.id).text(0)
}
function getAvatar(foto) {
    if (validarText(foto)) {
        foto = "" + foto;

        if (("0.png").includes("" + foto)) {
            $('.chat_img_user').prop('src', '../imagen/avatar/0.png');

        } else if (("1.png").includes("" + foto)) {
            $('.chat_img_user').prop('src', '../imagen/avatar/1.png');

        } else if (("2.png").includes("" + foto)) {
            $('.chat_img_user').prop('src', '../imagen/avatar/2.png');

        } else if (("3.png").includes("" + foto)) {
            $('.chat_img_user').prop('src', '../imagen/avatar/3.png');

        } else if (("4.png").includes("" + foto)) {
            $('.chat_img_user').prop('src', '../imagen/avatar/4.png');

        } else if (("5.png").includes("" + foto)) {
            $('.chat_img_user').prop('src', '../imagen/avatar/5.png');

        } else if (("6.png").includes("" + foto)) {
            $('.chat_img_user').prop('src', '../imagen/avatar/6.png');

        } else {
            $('.chat_img_user').prop('src', '../imagen/avatar.png');

        }
    }

}

function chat_verChat(pag = 1) {
    let data = {
        "pagina": pag,
        "id_transaccion": producto.id,
        "uid": user.uid,
        "empresa": user.empresa,
        "tipo": 1
    }
    let data_url = `${baseurl}/controllers/chat/?ver_chat`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": data },
        dataType: "json",
        "headers": { 'x-api-key': user.token },
        success: async result => {

            if (result['status'] == "success") {
                pag_actual = result.pagina;
                total_paginas = result.total_paginas
                showHistorialChat(result.data)
            } else {
                let validate_token = await erroresTokenEmpresa(result);
                if (!validate_token) {

                }
            }
        }, error: error => {
            $('.modal-chat').modal("hide")
            abrirAlerta(idioma['_trans06'], idioma['_trans560'])
        }
    });

}
function showHistorialChat(data) {
    $.each(data, (i, item) => {
        if (item.uid == user.uid && item.empresa == user.empresa) {
            showMiMensaje(item.mensaje, item.imagen, item.fecha_creacion)
        } else {
            showMensaje(item.mensaje, item.imagen, item.fecha_creacion)
        }
    })
    console.log($(".content_msgs_chat").height(), scrollA)
    if (pag_actual <= 1) {

        $(".content_scroll").scrollTop($(".content_msgs_chat")[0].scrollHeight);
    } else {
        $(".content_scroll").scrollTop($(".content_msgs_chat")[0].scrollHeight - scrollA);
    }
    scrollA = $(".content_msgs_chat").height()

}
function chat_enviarMensajes(img = "") {
    var mensaje = $(".chat_input_mensaje").val().trim()

    let data = {
        "id_transaccion": producto.id,
        "uid": user.uid,
        "empresa": user.empresa,
        "tipo": 1
    };
    if (!validarText(img)) {
        if (!validarText(mensaje)) {
            return 0
        } else {
            data.mensaje = mensaje
        }
    } else {
        data.imagen = img
    }

    showMiMensaje(mensaje, img);

    let data_url = `${baseurl}/controllers/chat/?enviar_mensaje`;
    $.ajax({
        type: "POST",
        url: data_url,
        data: { "data": data },
        "headers": { 'x-api-key': user.token },
        success: async result => {
            if (result['status'] == "success") {
                $(".error-msg-no-enviado").hide("slow");
                $('.chat_input_mensaje').val("");
                let productoAuxChat = producto;
                delete productoAuxChat.dataCarritoFull;
                let messageSend = {
                    "mensaje": mensaje,
                    "img": img,
                    "receptor": receptor,
                    "data": data,
                    "orderDeCompra": producto
                };



                // ASÍ ENVIO LA INFORMACIÓN AL SOCKET PARA QUE LA TRANSMITA A LOS DEMÁS.
                send(JSON.stringify(messageSend));

            } else {
                let validate_token = await erroresTokenEmpresa(res);
                if (!validate_token) {
                    $(".error-msg-no-enviado").show("slow");
                }
            }
        }, error: error => {
            $('.modal-chat').modal("hide");
            abrirAlerta(idioma['_trans06'], idioma['_trans559'])

        }
    });

}
function enviarFoto() {
    $('.chat_subir_foto').off('change');
    $('.chat_subir_foto').on('change', convertBase64);

}
function convertBase64(evt) {

    // var archivo = e.target.files[0],
    //     reader = new FileReader()
    // reader.onload = (e) => {
    //     var binaryString;
    //     if (!e) binaryString = reader.content;
    //     else binaryString = e.target.result;
    //     let img = 'data:image/png;base64,' + window.btoa(binaryString);
    //     chat_enviarMensajes(img)

    //     //Este tiene el base64

    // }
    // reader.readAsBinaryString(archivo);
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var files = evt.target.files;
        var file = files[0];


        if (file['size'] > 500000) {

        } else {
            if (files && file) {
                if (file['type'] == "image/png" || file['type'] == "image/jpeg" || file['type'] == "image/jpg") {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var binaryString;
                        if (!e) {
                            binaryString = reader.content;
                        } else {
                            binaryString = e.target.result;
                        }
                        var image = window.btoa(binaryString);
                        var base64 = 'data:image/jpg;base64,' + image;
                        // $('.img_modal_evidencia').prop('src', base64);
                        chat_enviarMensajes(base64)
                    }
                    reader.readAsBinaryString(file);
                } else {

                }
            } else {
            }
        }
    } else {
    }
}
function showMiMensaje(msg, img, fecha) {
    let mensaje = ""
    if (validarText(img)) {
        mensaje = ` <img loading="lazy" alt="img-chat-nasbi.com" src="${img}">`
    }
    if (validarText(msg)) {
        mensaje = msg
    }
    let date = fecha ? getFechaSoloHora(parseInt(fecha)) : getFechaSoloHora(new Date())
    let htmlmsg =
        `<div class="row">
            <div class="col-10 col-sm-11 px-2">
                <p class="msj-comprador">${mensaje}</p>
                <p class="hora-chat-comprador">${date}</p>
            </div>
            <div class="col-2 col-sm-1 px-2">
                <p class="inicial-comprador">${user.username.toUpperCase().charAt(0)}</p>
            </div>
        </div>`
    if (fecha) {
        $(".content_msgs_chat").prepend(htmlmsg)
    } else {
        $(".content_msgs_chat").append(htmlmsg)
        $(".content_scroll").animate({ scrollTop: $(".content_msgs_chat")[0].scrollHeight }, "fast");
    }
}
function showMensaje(msg, img, fecha) {
    let mensaje = ""
    if (validarText(img)) {
        mensaje = `<img loading="lazy" alt="img-chat-nasbi.com" src="${img}"> `
    }
    if (validarText(msg)) {
        mensaje = msg
    }
    let receptor = $('.chat_conectado_con').text()
    let date = fecha ? getFechaSoloHora(parseInt(fecha)) : getFechaSoloHora(new Date())
    let htmlmsg =
        `<div class="row">
            <div class="col-2 col-sm-1 px-2">
                <p class="inicial-vendedor">${receptor.toUpperCase().charAt(0)}</p>
            </div>
            <div class="col-10 col-sm-11 px-2">
                <p class="msj-vendedor">${mensaje}</p>
                <p class="hora-chat-vendedor">${date}</p>
            </div>
        </div>`
    if (fecha) {
        $(".content_msgs_chat").prepend(htmlmsg)
    } else {
        $(".content_msgs_chat").append(htmlmsg)
        $(".content_scroll").animate({ scrollTop: $(".content_msgs_chat")[0].scrollHeight }, "fast");
    }
}
function abrirAlerta(titulo, texto) {
    $(".titulo_modal_confirmacion").text(titulo);
    $(".info_modal_confirmacion").text(texto);
    $("#modal-confirmar-proceso").modal("toggle");
}



function mostrar_datos_producto(imagenProducto, titulo, id_producto, htmlPrecio_chat, position) {

    $('.chat_img_producto').prop('position', position)

    $('.chat_img_producto').attr('src', imagenProducto)
    $('.chat_nombre_producto').text(titulo)
    $('.chat_detalle_prod').attr('href', 'producto.php?uid=' + id_producto)
    $('.chat_precio_producto').html(htmlPrecio_chat);

}


async function prevNext_chat($e) {
    console.log($e.data, "mmmmm");
    let array_productos_carrito_chat = [];
    let boton = $e.data.tipo;
    let postition_img_actual = $(".chat_img_producto").prop("position");
    let imagenProducto, titulo, id_producto, htmlPrecio_chat, position;

    const productos_carrito = { ...$e.data.array_productos_carrito };
    for (let i in productos_carrito) {
        array_productos_carrito_chat.push(productos_carrito[i]);
    }
    // let postition_img_actual= await determinar_posicion(array_productos_carrito_chat, "", boton); 
    let data_a_mostrar = [];
    //   console.log($e.data,boton,array_productos_carrito_chat, key, postition_img_actual,array_productos_carrito_chat.length, "mmmmmmm"); 
    if (boton == 1) { //siguiente
        if (postition_img_actual == array_productos_carrito_chat.length - 1) {
            let tama_array = array_productos_carrito_chat.length;
            imagenProducto = array_productos_carrito_chat[0].foto_portada;
            titulo = array_productos_carrito_chat[0].titulo;
            id_producto = array_productos_carrito_chat[0].id_producto
            htmlPrecio_chat = await optener_html_precio(array_productos_carrito_chat[0]);
            position = 0;
            mostrar_datos_producto(imagenProducto, titulo, id_producto, htmlPrecio_chat, position);


        } else {
            imagenProducto = array_productos_carrito_chat[postition_img_actual + 1].foto_portada;
            titulo = array_productos_carrito_chat[postition_img_actual + 1].titulo;
            id_producto = array_productos_carrito_chat[postition_img_actual + 1].id_producto
            htmlPrecio_chat = await optener_html_precio(array_productos_carrito_chat[postition_img_actual + 1]);
            position = postition_img_actual + 1;
            mostrar_datos_producto(imagenProducto, titulo, id_producto, htmlPrecio_chat, position);
            // data_a_mostrar.item=array_productos_carrito_chat[postition_img_actual+1]; 
            // data_a_mostrar.key= array_productos_carrito_chat[postition_img_actual+1].id; 
            // data_a_mostrar.position= postition_img_actual+1; 
            console.log(array_productos_carrito_chat, "mmmmmmmmmmmm");
            // mostrar_datos_producto(data_a_mostrar, "1");
        }
    } else if (boton == -1) {//anterior
        if (postition_img_actual == 0) {
            let tama_array = array_productos_carrito_chat.length;
            imagenProducto = array_productos_carrito_chat[tama_array - 1].foto_portada;
            titulo = array_productos_carrito_chat[tama_array - 1].titulo;
            id_producto = array_productos_carrito_chat[tama_array - 1].id_producto
            htmlPrecio_chat = await optener_html_precio(array_productos_carrito_chat[tama_array - 1]);
            position = tama_array - 1;
            mostrar_datos_producto(imagenProducto, titulo, id_producto, htmlPrecio_chat, position);

            // data_a_mostrar.item=array_productos_carrito_chat[tama_array-1]; 
            // data_a_mostrar.key= array_productos_carrito_chat[tama_array-1].id; 
            // data_a_mostrar.position= tama_array-1; 
            //  mostrar_datos_producto(data_a_mostrar, "1"); 
        } else {
            imagenProducto = array_productos_carrito_chat[postition_img_actual - 1].foto_portada;
            titulo = array_productos_carrito_chat[postition_img_actual - 1].titulo;
            id_producto = array_productos_carrito_chat[postition_img_actual - 1].id_producto
            htmlPrecio_chat = await optener_html_precio(array_productos_carrito_chat[postition_img_actual - 1]);
            position = postition_img_actual - 1;
            mostrar_datos_producto(imagenProducto, titulo, id_producto, htmlPrecio_chat, position);
            // data_a_mostrar.item=array_productos_carrito_chat[postition_img_actual-1]; 
            // data_a_mostrar.key= array_productos_carrito_chat[postition_img_actual-1].id; 
            // data_a_mostrar.position= postition_img_actual-1; 
            //   mostrar_datos_producto(data_a_mostrar, "1");
        }
    }


}


function optener_html_precio(producto) {
    return new Promise((resolve) => {
        let htmlPrecio_chat = "";
        htmlPrecio_chat += `${(producto.bd > 0) ? "<span>" + producto.bd_mask + " " + getCoinLabelSymbol("Nasbiblue") + "</span><br>" : ""}`;
        htmlPrecio_chat += `${(producto.sd > 0) ? "<span>" + producto.sd_mask + " " + getCoinLabelSymbol("Nasbigold") + "</span><br>" : ""}`;
        htmlPrecio_chat += `${(producto.fiat > 0) ? "<span>" + producto.fiat_mask + " " + getCoinLabelSymbol(producto.moneda_fiat) + "</span><br>" : ""}`;
        resolve(htmlPrecio_chat)

    });

}