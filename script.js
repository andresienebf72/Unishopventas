document.addEventListener('DOMContentLoaded', () => {
  // =====================================================
  // Sección 1: Funcionalidad General (Formularios, etc.)
  // =====================================================

  // "¿Olvidaste tu clave?"
  const forgotPasswordBtn = document.getElementById('forgotPassword');
  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert("Funcionalidad para recuperar contraseña");
    });
  }

  // Formulario "floatingForm"
  const floatingForm = document.getElementById('floatingForm');
  if (floatingForm) {
    floatingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Cuenta creada exitosamente (floatingForm)!');
    });
  }

  // Formulario "registerForm" con transición a login
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const registerContainer = document.getElementById("registerContainer");
      if (registerContainer) {
        registerContainer.style.opacity = '0';
        setTimeout(() => {
          registerContainer.classList.add('hidden');
          const loginContainer = document.getElementById("loginContainer");
          if (loginContainer) {
            loginContainer.classList.remove('hidden');
            // Forzar reflow para activar la transición
            void loginContainer.offsetWidth;
            loginContainer.style.opacity = '1';
          }
        }, 500);
      }
    });
  }

  // Formulario "loginForm"
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const correoIngresado = document.getElementById('emailLogin')?.value || '';
      const claveIngresada = document.getElementById('claveLogin')?.value || '';
      const correoRegistrado = localStorage.getItem('usuarioCorreo');
      const claveRegistrada = localStorage.getItem('usuarioClave');

      if (!correoIngresado || !claveIngresada) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      if (correoIngresado === correoRegistrado && claveIngresada === claveRegistrada) {
        alert("Inicio de sesión exitoso!");
        window.location.href = 'pagina_principal.html';
      } else {
        alert("Correo o contraseña incorrectos.");
      }
    });
  }

  // =====================================================
  // Sección 2: Funcionalidad del Sidebar (Perfil y Contacto)
  // =====================================================
  const sidebar = document.getElementById('sidebar');
  const closeSidebarBtn = document.getElementById("closeSidebar");

  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.remove("open", "active");
    }
  }

  const toggleSidebarBtn = document.getElementById("toggleSidebar");
  if (toggleSidebarBtn && sidebar) {
    toggleSidebarBtn.addEventListener("click", () => {
      sidebar.classList.add("open");
    });
  }

  const openSidebarBtn = document.getElementById('openSidebar');
  if (openSidebarBtn && sidebar) {
    openSidebarBtn.addEventListener('click', () => {
      sidebar.classList.add('active');
    });
  }

  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", closeSidebar);
  }

  // =====================================================
  // Sección 3: Funcionalidad del Carrito
  // =====================================================
  let cart = [];
  const openCartBtn = document.getElementById('openCart');
  const cartModal = document.getElementById('cartModal');
  const closeCartBtn = document.getElementById('closeCart');
  const cartCount = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItems');

  function updateCartView() {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = "";
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
      cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = 
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h4>${item.name}</h4>
            <p>${item.description}</p>
          </div>
          <button class="remove-btn" data-index="${index}">Eliminar</button>
        ;
        cartItemsContainer.appendChild(div);
      });
      cartItemsContainer.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
          const idx = parseInt(this.getAttribute('data-index'));
          cart.splice(idx, 1);
          updateCartView();
          updateCartCount();
        });
      });
    }
  }

  function updateCartCount() {
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
  }

  if (openCartBtn && cartModal && closeCartBtn) {
    openCartBtn.addEventListener('click', () => {
      updateCartView();
      cartModal.classList.add('active');
    });
    closeCartBtn.addEventListener('click', () => {
      cartModal.classList.remove('active');
    });
  }

  const productsContainer = document.getElementById('productsContainer');
  if (productsContainer) {
    productsContainer.innerHTML = ""; // Aseguramos que esté vacío
  }
});

// Función para cerrar sesión: muestra un overlay con animación y redirige a index.html
function cerrarSesion() {
  const overlay = document.getElementById('logoutOverlay');
  if (overlay) {
    overlay.classList.add('show');
  }
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}  arreglar codigo y modificar cosas con este codigo <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UNIshop</title>
  <link rel="stylesheet" href="styles.css">
  <style>
    /* Estilos para el video de fondo */
    #bgVideo {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
    }
    /* Contenedor principal con scroll */
    .scroll-container {
      position: relative;
      z-index: 1;
      overflow-y: auto;
      height: 100vh;
    }
    /* Estilos para el header y la barra de búsqueda centrada */
    header {
      position: relative;
      height: 250px;
      text-align: center;
      color: #fff;
      padding-top: 20px;
    }
    .search-bar-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      max-width: 400px;
      transition: all 0.3s ease;
    }
    .search-bar-container input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      outline: none;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .search-bar-container input:focus {
      transform: scale(1.05);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
    /* Botones de contacto y carrito */
    .open-sidebar-btn, .open-cart-btn {
      padding: 10px 20px;
      margin: 10px;
      font-size: 16px;
      cursor: pointer;
    }
    /* Estilos para el carrito */
    .cart-logo {
      width: 24px;
      height: 24px;
    }
    #cartCount {
      background-color: red;
      color: white;
      border-radius: 50%;
      padding: 2px 6px;
      font-size: 14px;
      vertical-align: top;
      margin-left: 5px;
    }
    /* Footer */
    footer {
      text-align: center;
      margin-top: 20px;
      color: #fff;
    }
    /* Contenedor de productos: grid de 6 columnas */
    .product-container {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 20px;
      margin: 20px 0;
      padding: 0 20px;
    }
    /* Tarjeta de producto */
    .product-card {
      background-color: #00000086;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      text-align: center;
      color: #05e2ff;
    }
    .product-card img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
    .product-card h3 {
      margin: 10px 0;
      font-size: 20px;
    }
    .product-card p {
      font-size: 16px;
    }
    /* Botón "Agregar al carrito" con animación */
    .add-to-cart-btn {
      background-color: #33f1ff00;
      border: none;
      color: #ffffff;
      padding: 10px 15px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.3s ease;
      border-radius: 4px;
    }
    .add-to-cart-btn:hover {
      background-color: #50dcfff5;
      transform: scale(1.05);
    }
    /* Estilos para elementos agregados en el carrito */
    .cart-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    .cart-item img {
      width: 50px;
      height: auto;
      margin-right: 10px;
    }
    /* Estilos básicos para el modal del carrito */
    .cart-modal {
      display: none; /* Se abre solo al hacer clic en el botón del carrito */
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      padding: 20px;
      border-radius: 8px;
      z-index: 1001;
      max-height: 80vh;
      overflow-y: auto;
      color: #fff;
    }
    .cart-bg-video {
      display: none;
    }
    .cart-content {
      position: relative;
    }
    .close-btn {
      position: absolute;
      top: 10px;
      right: 15px;
      background: transparent;
      border: none;
      font-size: 24px;
      color: #fff;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <!-- Video de fondo -->
  <video autoplay muted loop id="bgVideo">
    <source src="https://media.istockphoto.com/id/1861758016/video/square-shaped-of-the-light-blue-color-glowing-frame-shining-blank-neo-border-sign.mp4?s=mp4-640x640-is&k=20&c=Cxn0KqeqtJ1PHn7itA729-1mILUXP_yY6f1cq0va6gs=" type="video/mp4">
    Tu navegador no soporta la reproducción de videos.
  </video>

  <!-- Sidebar de Contacto -->
  <div id="sidebar" class="sidebar">
    <button class="close-btn" id="closeSidebar">&times;</button>
    <h2>Contacto</h2>
    <div class="contact-info">
      <button class="contact-btn" id="contactName">Nombre: UNIshop</button>
      <button class="contact-btn" id="contactEmail" onclick="window.location.href='mailto:andresrojas72u@gmail.com'">
        Correo: andresrojas72u@gmail.com
      </button>
      <button class="contact-btn" id="contactCustomer" onclick="window.location.href='mailto:andresrojas72u@gmail.com'">
        Atención al Clientes
      </button>
    </div>
  </div>

  <!-- Modal Carrito -->
  <div id="cartModal" class="cart-modal">
    <button class="close-btn" id="closeCart">&times;</button>
    <h2>Tu Carrito</h2>
    <div id="cartItems">
      <p>Tu carrito está vacío.</p>
    </div>
    <div class="cart-actions">
      <button id="checkoutBtn" class="checkout-btn">Realizar Pedido</button>
    </div>
  </div>

  <!-- Contenedor principal -->
  <div class="scroll-container">
    <div class="content">
      <header>
        <h1>UNIshop</h1>
        <!-- Barra de búsqueda centrada en la mitad superior del header -->
        <div class="search-bar-container">
          <input type="text" id="searchBar" placeholder="Buscar producto...">
        </div>
        <div style="margin-top: 180px;">
          <!-- Botones adicionales de contacto y carrito (ubicados debajo del header) -->
          <button id="openSidebar" class="open-sidebar-btn">Contacto</button>
          <button id="openCart" class="open-cart-btn">
            <img src="https://www.shutterstock.com/image-illustration/3d-rendering-ui-shopping-cart-260nw-2277712531.jpg" alt="Carrito" class="cart-logo">
            <span id="cartCount">0</span>
          </button>
        </div>
      </header>

      <!-- Contenedor de productos: grid de 6 columnas -->
      <div class="product-container">
        <div class="product-card">
          <img src="https://roobotech.com.au/cdn/shop/files/apple-airpods-2nd-generation-pakistan-priceoye-ck2wq_1.png?v=1708511976" alt="Producto 1">
          <h3>Tesla</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 2">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 3">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 4">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 5">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
        <div class="product-card">
          <img src="https://pladani.com/wp-content/uploads/2024/10/Apple-airpods-4-.png" alt="Producto 6">
          <h3>Audífonos</h3>
          <p>Descripción del producto</p>
          <button class="add-to-cart-btn">Agregar al carrito</button>
        </div>
      </div>
      
      <footer>
        <p>&copy; 2025 UNIshop. Todos los derechos reservados.</p>
      </footer>
    </div>
  </div>

  <!-- Toast (opcional) -->
  <div id="toast" class="toast">Producto agregado</div>

  <script>
    // Filtrado de productos en tiempo real por nombre
    document.getElementById("searchBar").addEventListener("input", function() {
      let filter = this.value.toLowerCase();
      let products = document.querySelectorAll(".product-card");
      products.forEach(function(product) {
        let title = product.querySelector("h3").textContent.toLowerCase();
        product.style.display = title.indexOf(filter) > -1 ? "" : "none";
      });
    });

    // Función para animar la imagen del producto hacia el ícono del carrito
    function flyToCart(imgElement) {
      let imgRect = imgElement.getBoundingClientRect();
      let flyingImg = imgElement.cloneNode(true);
      flyingImg.style.position = "fixed";
      flyingImg.style.left = imgRect.left + "px";
      flyingImg.style.top = imgRect.top + "px";
      flyingImg.style.width = imgRect.width + "px";
      flyingImg.style.height = imgRect.height + "px";
      flyingImg.style.transition = "all 1s ease-in-out";
      flyingImg.style.zIndex = "1000";
      document.body.appendChild(flyingImg);

      let cartIcon = document.querySelector(".open-cart-btn img");
      let cartRect = cartIcon.getBoundingClientRect();

      // Forzar reflow
      void flyingImg.offsetWidth;

      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.width = "0px";
      flyingImg.style.height = "0px";
      flyingImg.style.opacity = "0.5";

      flyingImg.addEventListener("transitionend", function() {
        flyingImg.remove();
      });
    }
    function addProductToCart(productCard) {
  let productName = productCard.querySelector("h3").textContent;
  // Se busca el elemento con la clase "price"
  let productPrice = productCard.querySelector(".price") ? productCard.querySelector(".price").textContent : "$0";
  let productImgSrc = productCard.querySelector("img").src;
  // Agregar producto al arreglo del carrito, incluyendo el precio
  cart.push({ name: productName, price: productPrice, image: productImgSrc });
  updateCartCount();
  if (cartModal.classList.contains('active')) {
    updateCartView();
  }
}
