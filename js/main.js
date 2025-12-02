// Toggle mobile navigation
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}




// Back to top button
const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (!backToTopBtn) return;

  if (window.scrollY > 300) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}





// collection filter
document.addEventListener("DOMContentLoaded", () => {

  const filterButtons = document.querySelectorAll(".filter-buttons .btn");
  const productCards = document.querySelectorAll(".collection-grid .product-card");

  if (filterButtons.length && productCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;

        filterButtons.forEach((b) => b.classList.remove("active-filter"));
        btn.classList.add("active-filter");

        productCards.forEach((card) => {
          const category = card.dataset.category;
          if (filter === "all" || category === filter) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }




  // cart
  const CART_KEY = "soulEclipseCart";
  let cart = [];

  function loadCart() {
    try {
      const saved = localStorage.getItem(CART_KEY);
      cart = saved ? JSON.parse(saved) : [];
    } catch (error) {
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {}
  }

  function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function renderCart() {
    const cartContainer = document.querySelector("#cart-items");
    const cartTotalEl = document.querySelector("#cart-total");
    const cartCountEl = document.querySelector(".cart-count");

    if (cartCountEl) {
      cartCountEl.textContent = getCartItemCount();
    }

    if (!cartContainer || !cartTotalEl) {
      return;
    }

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p class="cart-empty">Количката е празна.</p>';
      cartTotalEl.textContent = "0.00";
      return;
    }

    cartContainer.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-item">
          <div>
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-meta">${item.price.toFixed(2)} BGN x ${item.quantity}</p>
          </div>
          <div class="cart-item-actions">
            <button class="cart-btn" data-action="minus" data-id="${item.id}">-</button>
            <span class="cart-item-qty">${item.quantity}</span>
            <button class="cart-btn" data-action="plus" data-id="${item.id}">+</button>
            <button class="cart-btn cart-remove" data-action="remove" data-id="${item.id}">x</button>
          </div>
        </div>
        `
      )
      .join("");

    cartTotalEl.textContent = getCartTotal().toFixed(2);
  }

  function addToCart(product) {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    renderCart();
  }

  function updateCartItem(id, action) {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    if (action === "plus") {
      item.quantity += 1;
    } else if (action === "minus") {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cart = cart.filter((i) => i.id !== id);
      }
    } else if (action === "remove") {
      cart = cart.filter((i) => i.id !== id);
    }

    saveCart();
    renderCart();
  }

  loadCart();
  renderCart();

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price);

      if (!id || !name || !price) return;

      addToCart({ id, name, price });
    });
  });

  const cartItemsContainer = document.querySelector("#cart-items");
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", (event) => {
      const btn = event.target.closest(".cart-btn");
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      updateCartItem(id, action);
    });
  }

  const clearCartBtn = document.querySelector("#cart-clear");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      cart = [];
      saveCart();
      renderCart();
    });
  }
});




// contacts form
document.addEventListener("DOMContentLoaded", () => {

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      console.log("Име:", name);
      console.log("Имейл:", email);
      console.log("Съобщение:", message);

      alert("Благодарим ти за съобщението! Ще се свържем с теб скоро.");
      contactForm.reset();
    });
  }
});