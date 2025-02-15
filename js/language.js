

// Функция для загрузки JSON-файла
async function loadTranslations(lang) {
  try {
    const response = await fetch(`js/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки языка: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка загрузки переводов:", error);
    return null; // Возвращаем null, если произошла ошибка
  }
}

// Функция для установки языка
async function setLanguage(lang) {
  const translations = await loadTranslations(lang);

  if (translations) {
    // Обновляем текст всех элементов с атрибутом data-i18n
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        element.textContent = translations[key];
      } else {
        console.warn(`Ключ "${key}" отсутствует в переводах.`);
      }
    });

    // Обновляем текст кнопок
    const btnRu = document.getElementById("btn-ru");
    const btnSi = document.getElementById("btn-si");

    if (lang === "ru") {
      btnRu.textContent = "Русский";
      btnSi.textContent = "Словенский";
    } else if (lang === "si") {
      btnRu.textContent = "Ruščina"; // Если нужен текст на английском
      btnSi.textContent = "Slovenski";
    }
  } else {
    console.error("Переводы не были загружены. Проверьте файл перевода.");
  }
}

// Устанавливаем язык по умолчанию при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  const userLang = navigator.language || navigator.userLanguage; // Определяем язык браузера пользователя
  const defaultLang = userLang.startsWith("ru") ? "ru" : "si"; // Если это русский — ставим его, иначе словенский
  setLanguage(defaultLang); // Устанавливаем язык по умолчанию
});



