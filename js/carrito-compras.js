let carritopagar = null;


function cargarPrimero() { }

function carritoUsuario() {
    $('.__carritoUser').empty();
    carritopagar = null;
    sessionStorage.removeItem('finalizar-compra');
    let dataEnviar = null;
    let tipo = 0;
    const paisusuario = JSON.parse(localStorage.getItem('paisOrigen'));
    var url = `${baseurl}/controllers/carrito/?carrito_usuario`;
    var headers = "";
    if (validarText(user)) {
        headers = { 'x-api-key': user.token }
        tipo = 1;
        dataEnviar = {
            data: {
                uid: user.uid,
                empresa: user.empresa,
                iso_code_2: paisusuario.iso_code_2,
                iso_code_2_money: iso_code_2_money
            }
        }

        let carrito_no_logueado = JSON.parse(localStorage.getItem('carrito_no_logueado'));
        console.log("[ 1 ]--------> Que pasa aquí: ", carrito_no_logueado);

        if (validarText(carrito_no_logueado)) {
            tipo = 3;
            carrito_no_logueado = carrito_no_logueado.data;
            console.log('carrito_no_logueado', carrito_no_logueado);
            carrito_no_logueado.map(data => {
                data['uid'] = user.uid;
                data.empresa = user.empresa;
            });
            url = `${baseurl}/controllers/carrito/?carrito_usuario_add_no_logeado`;
            dataEnviar = {
                data: {
                    uid: user.uid,
                    empresa: user.empresa,
                    iso_code_2: paisusuario.iso_code_2,
                    data_carrito: carrito_no_logueado,
                    iso_code_2_money: iso_code_2_money
                }
            }
        }

    } else {
        tipo = 2;
        headers = ""
        const carrito_no_logueado = JSON.parse(localStorage.getItem('carrito_no_logueado'));
        console.log("[ 2 ]--------> Que pasa aquí: ", carrito_no_logueado);
        if (!validarText(carrito_no_logueado)) {
            cartEmpty();
            console.log("[ 3 ]--------> Que pasa aquí: ", carrito_no_logueado);
            /*return presentAlertObject({ icon: 'info', text: idioma.trans54 });*/
            return;
        }
        console.log("[ 3.1 ]--------> Que pasa aquí: ", carrito_no_logueado);
        url = `${baseurl}/controllers/carrito/?carrito_usuario_no_logeado`;
        dataEnviar = carrito_no_logueado;

    }

    console.log('user', user);
    console.log("[ 3.2 ]--------> Que pasa aquí: ", dataEnviar);
    $.ajax({
        type: 'POST',
        url,
        data: dataEnviar,
        dataType: 'json',
        headers
    }).done(async (res) => {
        console.log('res', res);

        console.log("[ 4 ]--------> Que pasa aquí: ", JSON.parse(localStorage.getItem('carrito_no_logueado')), "\tres: ", res);
        if (res.status == 'success' && res.cantidad > 0) {
            if (tipo == 3) localStorage.removeItem('carrito_no_logueado');
            // llenarCarrito(res.data);
            llenarCarrito(res);
            llenarTotales(res);
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) cartEmpty();
            /*return presentAlertObject({ icon: 'info', text: idioma.trans54 });*/
            return;
        }

    }).fail((err) => {
        console.log("err: ", err);
        presentAlertObject({ icon: 'error', text: idioma.trans45 });
    });
}

function llenarCarrito(carritoAll) {

    let usuariocarrito = carritoAll.data;

    $('.__carritoUser').empty();
    $('.__eliminar').off('click');
    $('.__cantidad').off('click');
    $('input[name="pagar"]').off('change');
    let checked = '', eliminar = '';
    for (const x in usuariocarrito) {
        checked = '';
        if (x == 0) checked = 'checked'
        const carrito = usuariocarrito[x];
        eliminar = `<p class="eliminar __eliminar"> ${idioma.trans151} </p>`;
        if (carrito.tipo == 1) eliminar = `<p class="eliminar __eliminar">${idioma.trans44}</p>`;

        let inputHTML = "";
        if (carrito.tipo == 1) {
            if (carrito.variaciones.length > 0) {
                inputHTML = `<input id=${carrito.id_producto} class="form-control return-td __cantidad" type="number" step="1" min="1" value="${carrito.cantidad}" disabled>`;
            } else {
                inputHTML = `<input id=${carrito.id_producto} class="form-control return-td __cantidad" type="number" step="1" min="1" value="${carrito.cantidad}">`;
            }

        } else {
            if (carrito.variaciones.length > 0) {
                inputHTML = `<input id=${carrito.id_producto} class="form-control return-td __cantidad" type="number" step="1" min="1" value="${carrito.cantidad}" readonly disabled>`;
            } else {
                inputHTML = `<input id=${carrito.id_producto} class="form-control return-td __cantidad" type="number" step="1" min="1" value="${carrito.cantidad}" readonly>`;
            }

        }
        let variaciones = ""
        if (carrito.variaciones) {
            // inputHTML = `<input id=${carrito.id_producto} class="form-control return-td __cantidad" type="number" step="1" min="1" value="${carrito.cantidad}" readonly>`;

            $.each(carrito.variaciones, function (i, vari) {
                variaciones += `<div class="return-td" style=" display: flex;">
                                    <div> Color ${i + 1}:  </div>
                                    <div style="width:20px;height:12px; border-radius: 15px; margin:5px; background:${vari.color}"></div>
                                    <div>${idioma.trans_eb12} ${i + 1}: ${vari.tallaES}</div>
                                </div>`
            });
        }
        $('.__carritoUser').append(
            `<tr>
                <td style="width: 40%;">
                    <div class="flex-name">
                        <div class="container-photo">
                            <img loading="lazy" class="img-produt" src="${carrito.foto_portada}" alt="${carrito.producto} - nasbi.com">
                        </div>
                        <div>
                        <p class="name-product">${carrito.titulo} </p>
                        ${variaciones}
                        </div>
                        
                    </div>
                </td>
                <td class="td-border" style="width: 10%;">
                    ${inputHTML}
                </td>
                <td class="td-border">
                    <p class="return-td" style="border-right: 1px solid #b4b4b4;">${carrito.precio_descuento_local_mask} ${carrito.moneda}</p>
                </td>
                <td class="td-border">
                    <p class="return-td" style="border-right: 1px solid #b4b4b4;">${carrito.precio_mask} ${carrito.moneda}</p>
                </td>
                <td>
                    ${eliminar}
                </td>
            </tr>`
        );
        $('.__eliminar').eq(x).off('click');
        $('.__eliminar').eq(x).on('click', { carrito }, eliminarCarrito);

        $('.__cantidad').eq(x).off('change');
        $('.__cantidad').eq(x).on('change', { carrito }, actualizarCarrito);

        // $('input[name="pagar"]').eq(x).off('change');
        // $('input[name="pagar"]').eq(x).on('change', { carrito }, e => {
        //     sessionStorage.setItem('finalizar-compra', JSON.stringify(e.data.carrito));
        //     sessionStorage.setItem('finalizar-compra-new', JSON.stringify(carritoAll));
        // });
    }

    carritopagar = usuariocarrito[0];
    sessionStorage.setItem('finalizar-compra', JSON.stringify(carritopagar));
    sessionStorage.setItem('finalizar-compra-new', JSON.stringify(carritoAll));
}


function llenarTotales(carrito) {
    let btn_finalizar;

    console.log("carrito: ", carrito);

    let monedaSelectCarrito = carrito.data[0].moneda;


    btn_finalizar = `<a class="boton_finalizar_compra"><button class="btn1">${idioma.trans51}</button></a>`;
    $('.__totalesCarrito').html(
        `<p>${idioma._trans872} </p>
         <p>${idioma._trans873} <span>${carrito.dataTotales.cantidad}</span></p>
         <p>${idioma._trans874} <span>${carrito.dataTotales[monedaSelectCarrito].total_mask} ${monedaSelectCarrito}</span></p>
         <p>${idioma._trans875} <span>${idioma._trans876}</span></p>
         <p><span>${idioma._trans877}</span></p>` +
        btn_finalizar +
        `<a href="promociones.php"><button class="btn2">${idioma.trans52}</button></a>`
    );

    if (carrito.dataTotales.cantidad * 1 > 0) {
        $('.carrito__indicador__producto').text((carrito.dataTotales.cantidad * 1));
        $('.list__contents__cart').show();
        $('.list__contents__cart__nodata').hide();

    } else {
        $('.carrito__indicador__producto').text('');
        $('.list__contents__cart').hide();
        $('.list__contents__cart__nodata').show();
    }



    $('.boton_finalizar_compra').off('click');
    $('.boton_finalizar_compra').on('click', null, async function () {
        if (validarText(user)) {
            let precio_product_valido = await validar_precio_producto();
            if (precio_product_valido == true) {
                loadPage("finalizar-compra.php")
            } else {
                presentAlertObject({ icon: 'error', text: idioma.trans452_ });
            }

        } else {
            modal_nologueado_carrito_compra();
        }
    });



}


function actualizarCarrito(e) {
    $(e.target).prop('disabled', true);
    const carrito = e.data.carrito;
    const cantidad = parseFloat(e.target.value);
    const dataEnviar = {
        data: {
            id: carrito.id,
            // uid: user.uid,
            // empresa: user.empresa,
            id_producto: carrito.id_producto,
            moneda: carrito.moneda,
            cantidad
        }
    }

    if (validarText(user)) {
        dataEnviar.data.uid = user.uid;
        dataEnviar.data.empresa = user.empresa;
    }
    console.log(carrito);
    if (carrito.variaciones.length > 0) {
        if ((cantidad * 1) <= carrito.variaciones[0].cantidad_disponible) {
            if (validarText(user)) {
                $.ajax({
                    type: 'POST',
                    url: `${baseurl}/controllers/carrito/?actualizar`,
                    data: dataEnviar,
                    dataType: 'json',
                    "headers": { 'x-api-key': user.token },
                }).done(async (res) => {
                    console.log('res', res);
                    if (res.status == 'success') {
                        if (carrito.cantidad < cantidad) {
                            console.log("SE AUMENTO LA CANTIDAD");
                            presentAlertObject({ icon: 'success', text: idioma.trans49 });
                        }
                    } else if (res.status == 'errorStock') {
                        presentAlertObject({ icon: 'error', text: idioma.trans230 });
                    } else {
                        let validate_token = await erroresTokenEmpresa(res);
                        if (!validate_token) {
                            presentAlertObject({ icon: 'error', text: idioma.trans50 });
                        }

                    }
                    $(e.target).prop('disabled', false);
                    carritoUsuario();

                }).fail((err) => {
                    console.log("err: ", err);
                    presentAlertObject({ icon: 'error', text: idioma.trans50 });
                    $(e.target).prop('disabled', false);
                    carritoUsuario();
                });
            } else {
                const carrito_no_logueado = JSON.parse(localStorage.getItem('carrito_no_logueado'));
                for (let i = 0; i < carrito_no_logueado.data.length; i++) {
                    const articulo = carrito_no_logueado.data[i];
                    console.log("el articulo: ", articulo);
                    if (articulo.id_producto == Number.parseInt(e.target.id)) {
                        if (cantidad != articulo.cantidad) {
                            console.log("se le aumento la cantidad del que es");
                            carrito_no_logueado.data[i].cantidad = cantidad;
                            localStorage.setItem('carrito_no_logueado', JSON.stringify(carrito_no_logueado));
                            carritoUsuario();
                            $(e.target).prop('disabled', false);
                        }
                    }

                }
            }
        } else {
            presentAlertObject({ icon: 'error', text: idioma.trans_eb25 });
            $(e.target).prop('disabled', false);
            carritoUsuario();
        }
    } else {
        if (validarText(user)) {
            $.ajax({
                type: 'POST',
                url: `${baseurl}/controllers/carrito/?actualizar`,
                data: dataEnviar,
                dataType: 'json',
                "headers": { 'x-api-key': user.token },
            }).done(async (res) => {
                console.log('res', res);
                if (res.status == 'success') {
                    if (carrito.cantidad < cantidad) {
                        console.log("SE AUMENTO LA CANTIDAD");
                        presentAlertObject({ icon: 'success', text: idioma.trans49 });
                    }
                } else if (res.status == 'errorStock') {
                    presentAlertObject({ icon: 'error', text: idioma.trans230 });
                } else {
                    let validate_token = await erroresTokenEmpresa(res);
                    if (!validate_token) presentAlertObject({ icon: 'error', text: idioma.trans50 });

                }
                $(e.target).prop('disabled', false);
                carritoUsuario();

            }).fail((err) => {
                console.log("err: ", err);
                presentAlertObject({ icon: 'error', text: idioma.trans50 });
                $(e.target).prop('disabled', false);
                carritoUsuario();
            });
        } else {
            const carrito_no_logueado = JSON.parse(localStorage.getItem('carrito_no_logueado'));
            for (let i = 0; i < carrito_no_logueado.data.length; i++) {
                const articulo = carrito_no_logueado.data[i];
                console.log("el articulo: ", articulo);
                if (articulo.id_producto == Number.parseInt(e.target.id)) {
                    if (cantidad != articulo.cantidad) {
                        console.log("se le aumento la cantidad del que es");
                        carrito_no_logueado.data[i].cantidad = cantidad;
                        localStorage.setItem('carrito_no_logueado', JSON.stringify(carrito_no_logueado));
                        carritoUsuario();
                        $(e.target).prop('disabled', false);
                    }
                }

            }
        }
    }
}


function eliminarCarrito(e) {
    console.log('eliminarCarrito');
    const carrito = e.data.carrito;
    if (carrito.tipo != 1) return;
    console.log('carrito', carrito);

    if (!validarText(user)) {
        const carrito_no_logueado = JSON.parse(localStorage.getItem('carrito_no_logueado'));
        console.log('carrito_no_logueado', carrito_no_logueado);
        const carritototal = carrito_no_logueado.data.filter((data, x) => x != carrito.id);
        let carrito_actualizado = {
            data: carritototal
        };
        localStorage.setItem('carrito_no_logueado', JSON.stringify(carrito_actualizado));
        presentAlertObject({ icon: 'success', text: idioma.trans47 });
        return carritoUsuario();
    }


    const dataEnviar = {
        data: {
            id: carrito.id,
            uid: user.uid,
            empresa: user.empresa,
            id_producto: carrito.id_producto,
            moneda: carrito.moneda
        }
    }
    console.log('dataEnviar', dataEnviar);
    $.ajax({
        type: 'POST',
        url: `${baseurl}/controllers/carrito/?eliminar`,
        data: dataEnviar,
        dataType: 'json',
        "headers": { 'x-api-key': user.token },
    }).done(async (res) => {
        console.log('res', res);
        if (res.status == 'success') {
            presentAlertObject({ icon: 'success', text: idioma.trans47 });
        } else {
            let validate_token = await erroresTokenEmpresa(res);
            if (!validate_token) presentAlertObject({ icon: 'error', text: idioma.trans46 });

        }
        carritoUsuario();

    }).fail((err) => {
        console.log("err: ", err);
        presentAlertObject({ icon: 'error', text: idioma.trans46 });
        carritoUsuario();
    });
}

function cartEmpty() {
    console.log("=========== NO DATA ==========");
    $('.carrito__indicador__producto').text('');
    $('.list__contents__cart').hide();
    $('.list__contents__cart__nodata').show();
}

function validar_precio_producto() {
    let carrito_validar = JSON.parse(sessionStorage.getItem('finalizar-compra'));
    return new Promise((resolve) => {
        if (carrito_validar.precio > 0) {
            resolve(true);
        } else {
            resolve(false);
        }
    });

}



function modal_nologueado_carrito_compra() {
    $('#modal-carrito_compras-nologeado').modal("show");
}
