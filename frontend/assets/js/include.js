async function loadComponent(id, file) {
  const element = document.getElementById(id);

  // اگر المان وجود نداشت، خطا نده
  if (!element) return;

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`Failed to load ${file}`);
    }

    element.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

async function init() {
  // ابتدا هدر و فوتر را لود کن
  await Promise.all([
    loadComponent("header", "./assets/components/header.html"),
    loadComponent("footer", "./assets/components/footer.html"),
  ]);

  // بعد از لود شدن کامپوننت‌ها
  if (typeof initApp === "function") {
    initApp();
  }
}

document.addEventListener("DOMContentLoaded", init);
