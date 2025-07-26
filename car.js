// Wait for DOM to load

// ---- DOMContentLoaded Wrapper ----
document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle 
  const toggleTheme = document.getElementById("toggletheme");
  const themeIcon = toggleTheme.querySelector('i');

  // Check for saved theme preference or use prefers-color-scheme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  // Toggle theme when button is clicked
  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains('dark-mode')) {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
    menuToggle.setAttribute('aria-expanded', !expanded);
  });

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Product card animations
  const productCards = document.querySelectorAll('.product-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  productCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });

  // Greeting and button toggle
  const currentUser = localStorage.getItem("currentUser");
  const users = JSON.parse(localStorage.getItem("users")) || {};

  const loginBtn = document.querySelector(".login");
  const logoutBtn = document.getElementById("logout-btn");
  const userGreeting = document.getElementById("user-greeting");

  if (currentUser && users[currentUser]) {
    userGreeting.textContent = `Welcome, ${currentUser}`;
    logoutBtn.style.display = "inline-block";
    loginBtn.style.display = "none";
  } else {
    userGreeting.textContent = `Welcome, Guest`;
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline-block";
  }

  // Populate cart if cart-items element exists
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  if (cartItemsContainer && totalPriceEl) {
    const cartItems = users[currentUser]?.cart || [];
    let total = 0;

    cartItems.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h4>${item.name}</h4>
        <p>Price: $${item.price} × ${item.quantity}</p>
        <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
        <hr>
      `;
      cartItemsContainer.appendChild(div);
      total += item.price * item.quantity;
    });

    totalPriceEl.textContent = `$${total.toFixed(2)}`;
  }
});

// ---- Search Handling ----
function handleSearch() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!query) return;

  if (query.includes("gpu") || query.includes("graphics")) {
    window.location.href = "https://yourstore.com/gpu";
  } else if (query.includes("cpu") || query.includes("intel")) {
    window.location.href = "https://yourstore.com/cpu";
  } else if (query.includes("ram") || query.includes("memory")) {
    window.location.href = "https://yourstore.com/ram";
  } else if (query.includes("ssd") || query.includes("storage")) {
    window.location.href = "https://yourstore.com/ssd";
  } else {
    window.location.href = `https://yourstore.com/search?q=${encodeURIComponent(query)}`;
  }
}
