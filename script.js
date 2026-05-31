
const defaultServices = [
  { name: "Укладка по прямой вразброс (хаотичная)", price: "450 ₽/м²" },
  { name: "Укладка по прямой сдвиг на 1/3 или на половину", price: "550 ₽/м²" },
  { name: "Укладка по диагонали вразброс (хаотичная)", price: "550 ₽/м²" },
  { name: "Укладка по диагонали сдвиг на 1/3 или на половину", price: "600 ₽/м²" },
  { name: "Укладка ёлкой", price: "1 000 ₽/м²" }
];

// Получаем элементы DOM
const servicesContainer = document.getElementById('dynamic-services');
const form = document.getElementById('addServiceForm');
const nameInput = document.getElementById('serviceNameInput');
const priceInput = document.getElementById('servicePriceInput');
const clearBtn = document.getElementById('clearStorageBtn');

// Инициализация данных
function getServices() {
  const stored = localStorage.getItem('floorServices');
  if (stored) {
    return JSON.parse(stored);
  } else {

    localStorage.setItem('floorServices', JSON.stringify(defaultServices));
    return defaultServices;
  }
}

// Отрисовка списка на странице
function renderServices() {
  const services = getServices();
  servicesContainer.innerHTML = ''; 

  services.forEach(service => {
    const row = document.createElement('div');
    row.className = 'service-row';
    
    row.innerHTML = `
      <span class="service-name">${service.name}</span>
      <span class="service-price">${service.price}</span>
    `;
    
    servicesContainer.appendChild(row);
  });
}


form.addEventListener('submit', function(e) {
  e.preventDefault(); 

  const newService = {
    name: nameInput.value.trim(),
    price: priceInput.value.trim()
  };

  const services = getServices();
  services.push(newService);
  

  localStorage.setItem('floorServices', JSON.stringify(services));
  

  renderServices();
  form.reset();
});

// Кнопка сброса 
clearBtn.addEventListener('click', function() {
  localStorage.removeItem('floorServices');
  renderServices();
});

// Первичная отрисовка при загрузке
renderServices();