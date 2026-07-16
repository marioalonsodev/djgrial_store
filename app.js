// Cuando la página termina de cargar, arrancamos el robot
document.addEventListener('DOMContentLoaded', () => {
    dibujarProductos(inventario); // "inventario" viene de tu archivo productos.js
    configurarMenu();
    configurarPopup();
});

// 1. FUNCIÓN PARA DIBUJAR LOS PRODUCTOS EN PANTALLA
function dibujarProductos(listaDeProductos) {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = ''; // Limpiamos el texto de "Cargando..."

    if (listaDeProductos.length === 0) {
        contenedor.innerHTML = '<p style="color: #8b9eb0;">No hay productos en esta categoría.</p>';
        return;
    }

    // Por cada producto en tu lista, creamos una tarjetita
    listaDeProductos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card-herramienta'; // Reutilizamos tu clase CSS que ya es bonita
        tarjeta.style.cursor = 'pointer'; // Para que muestre la manito al pasar el mouse
        
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}" style="width:100%; height:150px; object-fit:cover; border-radius:12px; margin-bottom:15px;">
            <h3 style="margin-bottom: 5px;">${producto.titulo}</h3>
            <p style="font-weight: bold; color: #00e5ff; font-size: 18px;">${producto.precio}</p>
        `;

        // Si le hacen clic a la tarjeta, abrimos el popup con sus datos
        tarjeta.addEventListener('click', () => {
            abrirPopup(producto);
        });

        contenedor.appendChild(tarjeta);
    });
}

// 2. FUNCIÓN PARA FILTRAR POR CATEGORÍAS (Menú lateral)
function configurarMenu() {
    const btnTodos = document.getElementById('btn-menu-todos');
    const botonesCategoria = document.querySelectorAll('.btn-categoria');
    const tituloSeccion = document.getElementById('titulo-seccion');

    // Botón "Todos los productos"
    btnTodos.addEventListener('click', (e) => {
        e.preventDefault();
        limpiarMenuActivo();
        btnTodos.classList.add('activo');
        tituloSeccion.textContent = "Todos los productos";
        dibujarProductos(inventario);
    });

    // Botones de cada categoría
    botonesCategoria.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            limpiarMenuActivo();
            btn.classList.add('activo');
            
            const categoriaSeleccionada = btn.getAttribute('data-cat');
            tituloSeccion.textContent = btn.textContent.trim(); // Pone el nombre de la categoría
            
            // Filtramos la lista de excel (solo los que coincidan con la categoría)
            const productosFiltrados = inventario.filter(prod => prod.categoria === categoriaSeleccionada);
            dibujarProductos(productosFiltrados);
        });
    });

    function limpiarMenuActivo() {
        btnTodos.classList.remove('activo');
        botonesCategoria.forEach(b => b.classList.remove('activo'));
    }
}

// 3. LÓGICA DEL POPUP
const popup = document.getElementById('popup-producto');
const btnCerrarX = document.getElementById('btn-cerrar-popup-x');

function abrirPopup(producto) {
    // Rellenamos el popup con los datos del producto clickeado
    document.getElementById('popup-img').src = producto.imagen;
    document.getElementById('popup-titulo').textContent = producto.titulo;
    document.getElementById('popup-descripcion').textContent = producto.descripcion;
    document.getElementById('popup-precio').textContent = producto.precio;
    document.getElementById('popup-btn-comprar').href = producto.linkAfiliado;

    // Mostramos el popup
    popup.classList.remove('oculto');
}

function configurarPopup() {
    // Cerrar con la X
    btnCerrarX.addEventListener('click', () => {
        popup.classList.add('oculto');
    });

    // Cerrar si hacen clic en el fondo oscuro
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.add('oculto');
        }
    });
}