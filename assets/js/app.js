//  Menu Berger
const menu = document.querySelector(".menu");
const toggleBtn = document.querySelector(".nav__toggle");

if (toggleBtn && menu) {
  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("menu--open");
    const isOpen = menu.classList.contains("menu--open");
    toggleBtn.classList.toggle("fa-bars", !isOpen);
    toggleBtn.classList.toggle("fa-times", isOpen);
  });
}

//  Fixed Header
//  Fixed Header - اصلاح شده
const navigation = document.querySelector(".navigation");

function fixedNavigation() {
  if (!navigation) return;

  // ارتفاعی که بعد از آن منو فیکس می‌شود (مثلاً بعد از 100 پیکسل اسکرول)
  const scrollOffset = 100;

  if (window.scrollY >= scrollOffset) {
    navigation.classList.add("navigation--fixed");
  } else {
    navigation.classList.remove("navigation--fixed");
  }
}

window.addEventListener("scroll", fixedNavigation);
window.addEventListener("load", fixedNavigation);

//   Mega Menu Mobile
const subMenuBtn = document.querySelector(".menu__link-sub");
const subMenu = document.querySelector(".menu__sub-item");

if (subMenuBtn && subMenu) {
  subMenuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    subMenu.classList.toggle("menu__sub-item--open");
  });
}

/**
 * ============================================================
 * اسکریپت اسلایدر دسته‌بندی محصولات
 * ============================================================
 */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  if (window.innerWidth < 1025) {
    const swiperEl = document.querySelector(".category-swiper");
    if (!swiperEl) return;

    const nextBtn = document.querySelector(".slider-nav__btn--next");
    const prevBtn = document.querySelector(".slider-nav__btn--prev");

    let slidesPerView =
      window.innerWidth >= 641 && window.innerWidth < 1025 ? 2 : 1;

    if (typeof Swiper !== "undefined") {
      const swiper = new Swiper(swiperEl, {
        rtl: true,
        loop: true,
        grabCursor: true,
        slidesPerView: slidesPerView,
        spaceBetween: 14,
        autoHeight: false,
        watchSlidesProgress: true,
        resizeObserver: true,
        observer: true,
        observeParents: true,
        lazy: { loadPrevNext: true, loadOnTransitionStart: true },
        keyboard: { enabled: true, onlyInViewport: true },
        navigation: { nextEl: nextBtn, prevEl: prevBtn },
        mousewheel: { enabled: true, thresholdDelta: 10, sensitivity: 1 },
        speed: 400,
        touchRatio: 1.2,
        touchAngle: 45,
        simulateTouch: true,
        followFinger: true,
        breakpoints: {
          0: { slidesPerView: 1, spaceBetween: 14 },
          641: { slidesPerView: 2, spaceBetween: 14 },
        },
        a11y: {
          enabled: true,
          prevSlideMessage: "اسلاید قبلی",
          nextSlideMessage: "اسلاید بعدی",
          firstSlideMessage: "اولین اسلاید",
          lastSlideMessage: "آخرین اسلاید",
        },
        on: {
          touchStart: function () {
            this._isDragging = false;
          },
          touchMove: function () {
            this._isDragging = true;
          },
          touchEnd: function () {
            const self = this;
            setTimeout(() => {
              self._isDragging = false;
            }, 50);
          },
          click: function (e) {
            if (this._isDragging) {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
            return true;
          },
          afterInit: function () {
            this.update();
          },
          resize: function () {
            this.update();
          },
        },
      });

      document.querySelectorAll(".category-card").forEach((card) => {
        card.addEventListener("click", (e) => {
          if (swiper._isDragging) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        });
      });
      console.log("✅ اسلایدر دسته‌بندی در موبایل/تبلت فعال شد");
    }
  } else {
    console.log("✅ حالت دسکتاپ: نمایش گرید (اسلایدر غیرفعال)");
  }
});

// ============================================================
// دکمه بازگشت به بالا
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const scrollBtn = document.createElement("button");
  scrollBtn.className = "scroll-to-top";
  scrollBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--color-primary, #a72f3b);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.visibility = "visible";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.visibility = "hidden";
    }
  });

  scrollBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// ============================================================
// دکمه لایک/قلب برای محصولات
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const likeButtons = document.querySelectorAll(".product-card__like");

  likeButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();

      const heart = this.querySelector("i");
      const card = this.closest(".product-card");
      const productId = card ? card.dataset.productId : null;

      const cards = document.querySelectorAll(".product-card");
      const finalId = productId || "product-" + Array.from(cards).indexOf(card);

      if (heart) {
        if (heart.classList.contains("ri-heart-line")) {
          heart.classList.remove("ri-heart-line");
          heart.classList.add("ri-heart-fill");
          this.style.color = "var(--color-primary)";
          this.style.transform = "scale(1.3)";
          setTimeout(() => {
            this.style.transform = "scale(1)";
          }, 200);

          saveLikeStatus(finalId, true);
        } else {
          heart.classList.remove("ri-heart-fill");
          heart.classList.add("ri-heart-line");
          this.style.color = "var(--color-gray-7)";

          saveLikeStatus(finalId, false);
        }
      }
    });
  });

  function saveLikeStatus(productId, isLiked) {
    try {
      const likes = JSON.parse(localStorage.getItem("productLikes") || "{}");
      likes[productId] = isLiked;
      localStorage.setItem("productLikes", JSON.stringify(likes));
    } catch (e) {
      console.warn("ذخیره لایک ممکن نیست");
    }
  }

  function restoreLikes() {
    try {
      const likes = JSON.parse(localStorage.getItem("productLikes") || "{}");

      document
        .querySelectorAll(".product-card")
        .forEach(function (card, index) {
          let productId = card.dataset.productId || "product-" + index;

          if (likes[productId] === true) {
            const likeBtn = card.querySelector(".product-card__like");
            const heart = likeBtn ? likeBtn.querySelector("i") : null;
            if (heart && likeBtn) {
              heart.classList.remove("ri-heart-line");
              heart.classList.add("ri-heart-fill");
              likeBtn.style.color = "var(--color-primary)";
            }
          }
        });
    } catch (e) {
      console.warn("بازیابی لایک ممکن نیست");
    }
  }

  restoreLikes();
});

// ============================================================
// انیمیشن ظهور + افکت ۳D Tilt برای کارت‌های محصول
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const productCards = document.querySelectorAll(".product-card");

  if (productCards.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1,
    };

    const productObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("product-card--visible");
        }
      });
    }, observerOptions);

    productCards.forEach((card) => productObserver.observe(card));

    productCards.forEach(function (card) {
      const glow = document.createElement("div");
      glow.className = "product-card__glow";
      glow.style.cssText = `
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: radial-gradient(circle, rgba(167,47,59,0.05) 0%, transparent 60%);
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: inherit;
        z-index: 1;
      `;
      card.style.position = "relative";
      card.style.overflow = "hidden";
      card.appendChild(glow);

      card.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateX = (0.5 - y) * 15;
        const rotateY = (x - 0.5) * 15;

        this.style.transition = "none";
        this.style.transform = `translateY(-2px) scale(1.01)`;

        glow.style.opacity = "1";
        glow.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(167,47,59,0.08) 0%, transparent 60%)`;

        const shadowX = (x - 0.5) * 20;
        const shadowY = (0.5 - y) * 20;
        this.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(167, 47, 59, 0.12), 0 10px 30px rgba(0, 0, 0, 0.08)`;

        const intensity = Math.abs(x - 0.5) + Math.abs(y - 0.5);
        this.style.borderColor = `rgba(167, 47, 59, ${Math.min(intensity * 0.8, 0.6)})`;

        const image = this.querySelector(".product-card__image");
        if (image) {
          image.style.transition = "none";
          image.style.transform = `translateZ(20px) rotateX(${rotateX * 0.3}deg) rotateY(${rotateY * 0.3}deg) scale(1.02)`;
        }

        const likeBtn = this.querySelector(".product-card__like");
        if (likeBtn) {
          likeBtn.style.transition = "none";
          likeBtn.style.transform = `translateX(${(x - 0.5) * 15}px) translateY(${(0.5 - y) * 15}px) scale(1.15)`;
        }

        const title = this.querySelector(".product-card__title");
        if (title) {
          title.style.transition = "none";
          title.style.transform = `translateX(${(x - 0.5) * 5}px) translateY(${(0.5 - y) * 5}px)`;
        }

        const price = this.querySelector(".product-card__price");
        if (price) {
          price.style.transition = "none";
          price.style.transform = `translateX(${(x - 0.5) * 8}px) translateY(${(0.5 - y) * 8}px)`;
        }
      });

      card.addEventListener("mouseleave", function () {
        this.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        this.style.transform = "translateY(0) scale(1)";
        this.style.boxShadow = "";
        this.style.borderColor = "";

        const cardGlow = this.querySelector(".product-card__glow");
        if (cardGlow) {
          cardGlow.style.opacity = "0";
          cardGlow.style.background =
            "radial-gradient(circle, rgba(167,47,59,0.05) 0%, transparent 60%)";
        }

        const image = this.querySelector(".product-card__image");
        if (image) {
          image.style.transition = "transform 0.6s ease";
          image.style.transform = "";
        }

        const likeBtn = this.querySelector(".product-card__like");
        if (likeBtn) {
          likeBtn.style.transition = "transform 0.6s ease";
          likeBtn.style.transform = "";
        }

        const title = this.querySelector(".product-card__title");
        if (title) {
          title.style.transition = "all 0.6s ease";
          title.style.transform = "";
        }

        const price = this.querySelector(".product-card__price");
        if (price) {
          price.style.transition = "all 0.6s ease";
          price.style.transform = "";
        }
      });
    });
  }
});

//  Cart (پرفروش/پرتطرفدار)
const portarafdarCardmenu = document.getElementById("portarafdar-card-group");

if (portarafdarCardmenu) {
  fetch("assets/data/portarafdar.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        portarafdarCardmenu.innerHTML += `
          <div class="portarafdar-card">
            <div class="portarafdar-card-img">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="portarafdar-card-info">
              <h4>${item.name}</h4>
              <p>قابل طراحی و چاپ بر روی انواع محصولات</p>
              <button><img src="assets/image/portarafdar-gallery-add.png" alt="">افزودن به گالری</button>
            </div>
          </div>
        `;
      });
    })
    .catch((err) => console.error("خطا در لود فایل portarafdar.json:", err));
}

//  طراحان برتر
const designerCards = document.querySelectorAll(".designer__card");
const designerButtons = document.querySelectorAll(".designer__sub");
const designerDescs = document.querySelectorAll(".designer__desc");

if (designerCards.length > 0) {
  const designerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          designerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  designerCards.forEach((card) => designerObserver.observe(card));

  designerCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      if (!card.classList.contains("show")) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = (x / rect.width - 0.5) * 20;
      const rotateX = (y / rect.height - 0.5) * -20;

      card.style.transform = `
          translateY(-10px)
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

designerButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    button.classList.toggle("active");
    button.textContent = button.classList.contains("active")
      ? "✓ دنبال شد"
      : "دنبال کردن";
  });
});

designerDescs.forEach((item) => {
  const number = item.textContent.match(/\d+/);
  if (!number) return;

  let count = 0;
  const target = Number(number[0]);
  const timer = setInterval(() => {
    count++;
    item.textContent = item.textContent.replace(/\d+/, count);
    if (count >= target) clearInterval(timer);
  }, 20);
});

// ==========================================================
// سیستم علاقه‌مندی‌ها
// ==========================================================
const wishlistBtns = document.querySelectorAll(".product-card__wishlist");
const wishlistModal = document.getElementById("wishlistModal");
const wishlistBody = document.getElementById("wishlistBody");
const wishlistCount = document.getElementById("wishlistCount");
const closeWishlistBtn = document.getElementById("closeWishlist");
const clearAllBtn = document.getElementById("clearAllWishlist");
const openWishlistBtn = document.getElementById("wishlistBtn");

const notificationOverlay = document.getElementById("notificationOverlay");
const notificationTitle = document.getElementById("notificationTitle");
const notificationText = document.getElementById("notificationText");
const notificationProgress = document.getElementById("notificationProgress");

let wishlistItems = [];
let notificationTimeout = null;

function addToWishlist(productId, productName) {
  if (wishlistItems.some((item) => item.id === productId)) {
    showNotification("این محصول قبلاً اضافه شده است", "تکرار!");
    return;
  }

  const productCard = document.querySelector(
    `.product-card[data-product-id="${productId}"]`,
  );
  if (!productCard) return;

  const imgSrc =
    productCard.querySelector(".product-card__image img")?.src || "";
  const price =
    productCard.querySelector(".product-card__price-amount")?.textContent || "";

  wishlistItems.push({
    id: productId,
    name: productName,
    image: imgSrc,
    price: price,
  });

  updateWishlistUI();
  updateWishlistCount();

  const wishlistBtn = productCard.querySelector(".product-card__wishlist");
  if (wishlistBtn) wishlistBtn.classList.add("product-card__wishlist--active");

  showNotification(`${productName} با موفقیت اضافه شد`, "افزوده شد! ✅");
}

function removeFromWishlist(productId) {
  const removedItem = wishlistItems.find((item) => item.id === productId);
  wishlistItems = wishlistItems.filter((item) => item.id !== productId);

  const productCard = document.querySelector(
    `.product-card[data-product-id="${productId}"]`,
  );
  if (productCard) {
    const wishlistBtn = productCard.querySelector(".product-card__wishlist");
    if (wishlistBtn)
      wishlistBtn.classList.remove("product-card__wishlist--active");
  }

  updateWishlistUI();
  updateWishlistCount();

  if (removedItem) {
    showNotification(`${removedItem.name} از لیست حذف شد`, "حذف شد! ❌");
  }
}

function clearAllWishlist() {
  if (wishlistItems.length === 0) return;

  document
    .querySelectorAll(".product-card__wishlist--active")
    .forEach((btn) => {
      btn.classList.remove("product-card__wishlist--active");
    });

  const count = wishlistItems.length;
  wishlistItems = [];
  updateWishlistUI();
  updateWishlistCount();
  showNotification(`${count} محصول از لیست حذف شد`, "پاک شد! 🗑️");
}

function updateWishlistUI() {
  if (!wishlistBody) return;

  if (wishlistItems.length === 0) {
    wishlistBody.innerHTML = `
      <div class="wishlist-modal__empty">
        <i class="ri-heart-3-line"></i>
        <p>هنوز محصولی به علاقه‌مندی‌ها اضافه نشده است</p>
        <p style="font-size: var(--fs-body-4); color: var(--color-gray-6); margin-top: 4px;">
          برای افزودن، روی قلب ❤️ محصولات کلیک کنید
        </p>
      </div>
    `;
    return;
  }

  wishlistBody.innerHTML = wishlistItems
    .map(
      (item) => `
    <div class="wishlist-modal__item" data-item-id="${item.id}">
      <div class="wishlist-modal__item-info">
        <img class="wishlist-modal__item-img" src="${item.image}" alt="${item.name}" />
        <div>
          <div class="wishlist-modal__item-name">${item.name}</div>
          <div class="wishlist-modal__item-price">${item.price} تومان</div>
        </div>
      </div>
      <button class="wishlist-modal__item-remove" data-id="${item.id}" aria-label="حذف از علاقه‌مندی‌ها">
        <i class="ri-close-line"></i>
      </button>
    </div>
  `,
    )
    .join("");

  document.querySelectorAll(".wishlist-modal__item-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      removeFromWishlist(id);
    });
  });
}

function updateWishlistCount() {
  if (wishlistCount) wishlistCount.textContent = wishlistItems.length;
}

function showNotification(message, title = "افزوده شد!") {
  if (
    !notificationOverlay ||
    !notificationTitle ||
    !notificationText ||
    !notificationProgress
  )
    return;
  clearTimeout(notificationTimeout);

  notificationTitle.textContent = title;
  notificationText.textContent = message;

  notificationProgress.style.animation = "none";
  notificationProgress.offsetHeight;
  notificationProgress.style.animation = "progressBar 2.5s linear forwards";

  notificationOverlay.classList.add("notification-overlay--show");

  notificationTimeout = setTimeout(() => {
    notificationOverlay.classList.remove("notification-overlay--show");
  }, 2500);
}

function closeNotification() {
  if (notificationOverlay)
    notificationOverlay.classList.remove("notification-overlay--show");
  clearTimeout(notificationTimeout);
}

if (notificationOverlay) {
  notificationOverlay.addEventListener("click", (e) => {
    if (e.target === notificationOverlay) closeNotification();
  });
}

wishlistBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const productId = parseInt(btn.dataset.productId);
    const productName = btn.dataset.productName;

    if (wishlistItems.some((item) => item.id === productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId, productName);
    }
  });
});

if (openWishlistBtn && wishlistModal) {
  openWishlistBtn.addEventListener("click", () => {
    wishlistModal.classList.add("wishlist-modal--open");
    document.body.style.overflow = "hidden";
    updateWishlistUI();
  });
}

function closeWishlistModal() {
  if (wishlistModal) {
    wishlistModal.classList.remove("wishlist-modal--open");
    document.body.style.overflow = "";
  }
}

if (closeWishlistBtn)
  closeWishlistBtn.addEventListener("click", closeWishlistModal);

const overlay = document.querySelector(".wishlist-modal__overlay");
if (overlay) overlay.addEventListener("click", closeWishlistModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeWishlistModal();
    closeNotification();
  }
});

if (clearAllBtn) clearAllBtn.addEventListener("click", clearAllWishlist);

//  علاقه مندی ها (Load JSON)
const favoriteCardmenu = document.getElementById("favorite-card-group");

if (favoriteCardmenu) {
  fetch("assets/data/favorite.json")
    .then((res) => res.json())
    .then((info) => {
      info.forEach((item) => {
        favoriteCardmenu.innerHTML += `
          <div class="favorite-card">
            <div class="favorite-card-img">
              <img src="${item.img}" alt="${item.title}">
            </div>
            <div class="favorite-card-info">
              <h4>${item.title}<img src="assets/image/favorite-like.png" alt=""></h4>
              <p>دارای رنگ بندی و قابل طراحی</p>
              <p class="favorite-price">150,000 تومان</p>
            </div>
          </div>
        `;
      });
    })
    .catch((err) => console.error("خطا در لود فایل favorite.json:", err));
}

updateWishlistCount();
