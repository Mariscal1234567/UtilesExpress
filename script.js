// =========================================
// 1. PRODUCTOS DEL CATÁLOGO
// Hay 6 productos por categoría.
// Los precios son ejemplos: cámbialos por los reales.
// =========================================

const productos = [
    // CUADERNOS
    {
        nombre: "Cuaderno universitario",
        categoria: "cuadernos",
        precio: 18
    },
    {
        nombre: "Cuaderno espiral",
        categoria: "cuadernos",
        precio: 22
    },
    {
        nombre: "Cuaderno empastado",
        categoria: "cuadernos",
        precio: 25
    },
    {
        nombre: "Cuaderno cuadriculado",
        categoria: "cuadernos",
        precio: 16
    },
    {
        nombre: "Cuaderno de dibujo",
        categoria: "cuadernos",
        precio: 20
    },
    {
        nombre: "Cuaderno pequeño",
        categoria: "cuadernos",
        precio: 10
    },

    // ESCRITURA
    {
        nombre: "Bolígrafos azules",
        categoria: "escritura",
        precio: 12
    },
    {
        nombre: "Lápices HB",
        categoria: "escritura",
        precio: 8
    },
    {
        nombre: "Marcadores de colores",
        categoria: "escritura",
        precio: 18
    },
    {
        nombre: "Resaltadores",
        categoria: "escritura",
        precio: 15
    },
    {
        nombre: "Lapiceros negros",
        categoria: "escritura",
        precio: 12
    },
    {
        nombre: "Corrector líquido",
        categoria: "escritura",
        precio: 9
    },

    // ÚTILES ESCOLARES
    {
        nombre: "Regla de 30 cm",
        categoria: "escolar",
        precio: 5
    },
    {
        nombre: "Tijeras escolares",
        categoria: "escolar",
        precio: 10
    },
    {
        nombre: "Pegamento en barra",
        categoria: "escolar",
        precio: 8
    },
    {
        nombre: "Lápices de colores",
        categoria: "escolar",
        precio: 15
    },
    {
        nombre: "Juego de geometría",
        categoria: "escolar",
        precio: 18
    },
    {
        nombre: "Goma de borrar",
        categoria: "escolar",
        precio: 3
    },

    // OFICINA
    {
        nombre: "Carpetas para documentos",
        categoria: "oficina",
        precio: 10
    },
    {
        nombre: "Notas adhesivas",
        categoria: "oficina",
        precio: 9
    },
    {
        nombre: "Archivador",
        categoria: "oficina",
        precio: 25
    },
    {
        nombre: "Grapadora",
        categoria: "oficina",
        precio: 20
    },
    {
        nombre: "Clips metálicos",
        categoria: "oficina",
        precio: 6
    },
    {
        nombre: "Cinta adhesiva",
        categoria: "oficina",
        precio: 7
    }
];

// =========================================
// 2. NÚMERO DE WHATSAPP
// Bolivia: código de país 591.
// =========================================

const NUMERO_WHATSAPP = "59165713521";

// =========================================
// 3. ELEMENTOS DE LA PÁGINA
// =========================================

const lista = document.getElementById("lista-productos");
const buscador = document.getElementById("buscador");
const categoria = document.getElementById("categoria");
const sinResultados = document.getElementById("sin-resultados");
const resumenResultados = document.getElementById("resumen-resultados");

const nombresCategorias = {
    cuadernos: "Cuadernos",
    escritura: "Escritura",
    escolar: "Útiles escolares",
    oficina: "Oficina"
};

// =========================================
// 4. ICONOS DECORATIVOS
// =========================================

function iconoCategoria(tipo) {
    const iconos = {
        cuadernos: "▤",
        escritura: "✎",
        escolar: "✂",
        oficina: "▧"
    };

    return iconos[tipo] || "✦";
}

// =========================================
// 5. CREAR TARJETA DE PRODUCTO
// =========================================

function crearTarjeta(producto) {
    const articulo = document.createElement("article");
    articulo.className = "producto";

    // Imagen decorativa de la categoría
    const imagen = document.createElement("div");
    imagen.className = `producto-imagen imagen-${producto.categoria}`;
    imagen.setAttribute("aria-hidden", "true");

    const icono = document.createElement("span");
    icono.textContent = iconoCategoria(producto.categoria);
    imagen.appendChild(icono);

    // Información del producto
    const info = document.createElement("div");
    info.className = "producto-info";

    const etiqueta = document.createElement("span");
    etiqueta.className = "producto-categoria";
    etiqueta.textContent = nombresCategorias[producto.categoria];

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const descripcion = document.createElement("p");
    descripcion.textContent =
        "Consulta disponibilidad y detalles por WhatsApp.";

    // Precio y botón de contacto
    const pie = document.createElement("div");
    pie.className = "producto-pie";

    const precio = document.createElement("span");
    precio.className = "precio";
    precio.textContent = `Bs. ${producto.precio}`;

    const boton = document.createElement("a");
    boton.className = "boton-comprar";
    boton.textContent = "Consultar";

    const mensaje =
        `Hola, quiero consultar por ${producto.nombre}.`;

    boton.href =
        `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

    boton.target = "_blank";
    boton.rel = "noopener noreferrer";

    boton.setAttribute(
        "aria-label",
        `Consultar por WhatsApp sobre ${producto.nombre}`
    );

    // Organizar la tarjeta
    pie.append(precio, boton);
    info.append(etiqueta, titulo, descripcion, pie);
    articulo.append(imagen, info);

    return articulo;
}

// =========================================
// 6. BUSCADOR Y FILTRO DE CATEGORÍAS
// =========================================

function mostrarProductos() {
    const texto = buscador.value.trim().toLocaleLowerCase("es");
    const categoriaSeleccionada = categoria.value;

    const filtrados = productos.filter(producto => {
        const coincideTexto = producto.nombre
            .toLocaleLowerCase("es")
            .includes(texto);

        const coincideCategoria =
            categoriaSeleccionada === "todos" ||
            producto.categoria === categoriaSeleccionada;

        return coincideTexto && coincideCategoria;
    });

    // Mostrar las tarjetas filtradas
    lista.replaceChildren(...filtrados.map(crearTarjeta));

    // Mensaje cuando no existen coincidencias
    sinResultados.hidden = filtrados.length > 0;

    // Actualizar el número de resultados
    resumenResultados.textContent =
        `${filtrados.length} ${
            filtrados.length === 1
                ? "producto encontrado"
                : "productos encontrados"
        }`;
}

// Buscar automáticamente mientras se escribe
buscador.addEventListener("input", mostrarProductos);

// Cambiar categoría y enfocar el catálogo
categoria.addEventListener("change", () => {
    mostrarProductos();

    document.getElementById("catalogo").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// =========================================
// 7. AÑO AUTOMÁTICO DEL PIE DE PÁGINA
// =========================================

document.getElementById("anio").textContent =
    new Date().getFullYear();

// =========================================
// 8. CARGAR EL CATÁLOGO AL ABRIR LA PÁGINA
// =========================================

mostrarProductos();