const state = {
    activePage: 'home',
    ingredients: ['ไข่ไก่', 'มะเขือเทศ', 'ผักสลัด'],
    stats: {
        ingredientsSaved: 14,
        recipesCreated: 5,
        wasteReducedKg: 2.8,
        moneySavedBaht: 420
    }
};

const recipeDatabase = [
    {
        id: 1,
        name: 'ไข่ขยี้มะเขือเทศสลัดสด',
        time: '10 นาที',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
        ingredients: ['ไข่ไก่', 'มะเขือเทศ', 'ผักสลัด', 'น้ำมันพืช', 'ซอสปรุงรส'],
        matchedCount: 3,
        steps: [
            'ตั้งกระทะใส่น้ำมันเล็กน้อย ใช้ไฟกลาง',
            'ตอกไข่ไก่ลงไป หั่นมะเขือเทศใส่ตามลงไป แล้วใช้ตะหลิวขยี้เบาๆ พอสุก',
            'ปรุงรสด้วยซอสตามชอบ',
            'จัดจานโดยวางผักสลัดสด แล้วตักไข่ขยี้มะเขือเทศลงราด พร้อมเสิร์ฟ'
        ],
        tip: 'เมนูนี้เน้นใช้วัตถุดิบที่เหลือให้หมด 100% ปรุงง่าย เหมาะสำหรับมื้อเช้าที่เร่งรีบ'
    },
    {
        id: 2,
        name: 'ซุปมะเขือเทศไข่คนสไตล์โฮมเมด',
        time: '15 นาที',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
        ingredients: ['มะเขือเทศ', 'ไข่ไก่', 'ซุปก้อน', 'ผักสลัด (สำหรับตกแต่ง)', 'กระเทียม'],
        matchedCount: 3,
        steps: [
            'ผัดกระเทียมสับกับมะเขือเทศหั่นเต๋าจนนุ่มและได้���้ำมะเขือเทศ',
            'เติมน้ำเปล่าและใส่ซุปก้อน รอจนเดือด',
            'ค่อยๆ ค่อยเทไข่ไก่ที่ตีแล้วลงไปเป็นสาย ตีเบาๆ ให้เป็นคลื่น',
            'ตักใส่ชาม โรยผักสลัดซอยเล็กน้อย'
        ],
        tip: 'ใช้วัตถุดิบมะเขือเทศที่เริ่มนุ่มได้ดีเยี่ยม ไม่ต้องทิ้ง'
    },
    {
        id: 3,
        name: 'สลัดไข่ต้มมะเขือเทศสด',
        time: '8 นาที',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
        ingredients: ['ไข่ไก่', 'ผักสลัด', 'มะเขือเทศ', 'น้ำสลัดตามชอบ'],
        matchedCount: 3,
        steps: [
            'ต้มไข่ไก่ประมาณ 8 นาที ให้ได้ไข่ต้มยางมะตอยกำลังดี',
            'ล้างผักสลัดและมะเขือเทศให��สะอาด หั่นเป็นชิ้นพอดีคำ',
            'นำผักใส่ชาม ผ่าไข่ต้มวางด้านบน ราดน้ำสลัดพร้อมรับประทาน'
        ],
        tip: 'เมนูคลีนเพื่อสุขภาพ ไม่ต้องใช้น้ำมัน ทำง่ายภายใน 8 นาที'
    }
];

function navigateTo(pageId) {
    state.activePage = pageId;
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) targetPage.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-dark-green', 'font-semibold');
        link.classList.add('text-gray-600');
    });

    const activeNav = document.getElementById(`nav-${pageId}`);
    if (activeNav) {
        activeNav.classList.remove('text-gray-600');
        activeNav.classList.add('text-dark-green', 'font-semibold');
    }

    if (pageId === 'recipes') {
        renderRecipes();
    } else if (pageId === 'dashboard') {
        initCharts();
        updateDashboardStats();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('image-preview').src = e.target.result;
            document.getElementById('upload-placeholder').classList.add('hidden');
            document.getElementById('image-preview-container').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function loadScenarioExample() {
    document.getElementById('image-preview').src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
    document.getElementById('upload-placeholder').classList.add('hidden');
    document.getElementById('image-preview-container').classList.remove('hidden');

    state.ingredients = ['ไข่ไก่', 'มะเขือเทศ', 'ผักสลัด'];
    renderIngredients();

    document.getElementById('analyze-btn').classList.add('hidden');
    document.getElementById('find-recipes-btn').classList.remove('hidden');
}

function analyzeIngredients() {
    const btn = document.getElementById('analyze-btn');
    btn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> <span>กำลังวิเคราะห์ภาพด้วย AI...</span>';

    setTimeout(() => {
        state.ingredients = ['ไข่ไก่', 'มะเขือเทศ', 'ผักสลัด'];
        renderIngredients();
        btn.classList.add('hidden');
        document.getElementById('find-recipes-btn').classList.remove('hidden');
        btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> <span>วิเคราะห์วัตถุดิบด้วย AI</span>';
    }, 1000);
}

function renderIngredients() {
    const container = document.getElementById('ingredient-list');
    if (state.ingredients.length === 0) {
        container.innerHTML = '<p class="text-sm text-gray-400 italic text-center py-4">ไม่มีวัตถุดิบในรายการ</p>';
        return;
    }

    container.innerHTML = state.ingredients.map((item, index) => `
        <div class="flex items-center justify-between bg-cream p-2.5 rounded-xl border border-sage/20">
            <span class="text-sm font-medium text-dark-green"><i class="fa-solid fa-check text-sage mr-2"></i>${item}</span>
            <button onclick="removeIngredient(${index})" class="text-gray-400 hover:text-red-500 text-xs px-2 py-1">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');
}

function addManualIngredient() {
    const input = document.getElementById('new-ingredient-input');
    const val = input.value.trim();
    if (val) {
        state.ingredients.push(val);
        input.value = '';
        renderIngredients();
    }
}

function removeIngredient(index) {
    state.ingredients.splice(index, 1);
    renderIngredients();
}

function goToRecipesWithIngredients() {
    navigateTo('recipes');
}

function renderRecipes() {
    const container = document.getElementById('recipe-grid');
    const activeIngContainer = document.getElementById('recipe-active-ingredients');

    activeIngContainer.innerHTML = state.ingredients.map(ing => 
        `<span class="bg-cream text-dark-green text-xs px-2.5 py-1 rounded-full border border-sage/30">${ing}</span>`
    ).join('');

    container.innerHTML = recipeDatabase.map(recipe => `
        <div class="bg-cream rounded-3xl border border-sage/20 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition">
            <div>
                <div class="relative h-48 overflow-hidden">
                    <img src="${recipe.image}" alt="${recipe.name}" class="w-full h-full object-cover">
                    <span class="absolute top-3 right-3 bg-dark-green/90 backdrop-blur-md text-cream text-xs px-3 py-1 rounded-full font-medium">
                        <i class="fa-regular fa-clock mr-1"></i>${recipe.time}
                    </span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-dark-green mb-2">${recipe.name}</h3>
                    <p class="text-xs text-sage font-semibold mb-4">
                        <i class="fa-solid fa-circle-check mr-1"></i>ตรงกับวัตถุดิบที่คุณมี ${recipe.matchedCount} ชนิด
                    </p>
                    <div class="space-y-1 mb-4">
                        <p class="text-xs font-bold text-gray-500">ส่วนผสมหลัก:</p>
                        <div class="flex flex-wrap gap-1">
                            ${recipe.ingredients.map(ing => `
                                <span class="text-xs bg-sage-light/60 text-dark-green px-2 py-0.5 rounded-md">${ing}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-6 pt-0">
                <button onclick="openRecipeModal(${recipe.id})" class="w-full bg-sage hover:bg-dark-green text-cream py-3 rounded-2xl font-semibold text-sm transition flex items-center justify-center space-x-2">
                    <span>ดูวิธีทำและขั้นตอน</span>
                    <i class="fa-solid fa-chevron-right text-xs"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function openRecipeModal(recipeId) {
    const recipe = recipeDatabase.find(r => r.id === recipeId);
    if (!recipe) return;

    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" class="w-full h-56 object-cover rounded-2xl mb-6">
        <div class="flex items-center justify-between mb-2">
            <h2 class="text-2xl font-bold text-dark-green">${recipe.name}</h2>
            <span class="bg-sage-light text-dark-green text-xs font-semibold px-3 py-1 rounded-full">
                <i class="fa-regular fa-clock mr-1"></i>${recipe.time}
            </span>
        </div>

        <div class="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-xl mb-6">
            <i class="fa-solid fa-lightbulb text-amber-500 mr-1"></i> <strong>AI Smart Tip:</strong> ${recipe.tip}
        </div>

        <div class="mb-6">
            <h4 class="font-bold text-dark-green mb-2">ส่วนผสมทั้งหมด:</h4>
            <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>

        <div class="mb-6">
            <h4 class="font-bold text-dark-green mb-2">ขั้นตอนการปรุงอาหาร:</h4>
            <ol class="list-decimal list-inside text-sm text-gray-600 space-y-2">
                ${recipe.steps.map(step => `<li class="pl-1">${step}</li>`).join('')}
            </ol>
        </div>

        <button onclick="cookRecipeCompleted()" class="w-full bg-dark-green text-cream py-3.5 rounded-2xl font-semibold transition hover:bg-accent-green flex items-center justify-center space-x-2">
            <i class="fa-solid fa-check"></i>
            <span>ทำเมนูนี้เสร็จแล้ว (บันทึกเข้าระบบ Dashboard)</span>
        </button>
    `;

    document.getElementById('recipe-modal').classList.remove('hidden');
}

function closeRecipeModal() {
    document.getElementById('recipe-modal').classList.add('hidden');
}

function cookRecipeCompleted() {
    state.stats.ingredientsSaved += state.ingredients.length || 3;
    state.stats.recipesCreated += 1;
    state.stats.wasteReducedKg = parseFloat((state.stats.wasteReducedKg + 0.4).toFixed(1));
    state.stats.moneySavedBaht += 60;

    closeRecipeModal();
    alert('บันทึกความสำเร็จสำเร็จ! สถิติใหม่ของคุณถูกเพิ่มลงใน Dashboard เรียบร้อยแล้ว');
    navigateTo('dashboard');
}

function updateDashboardStats() {
    document.getElementById('stat-ingredients').innerText = state.stats.ingredientsSaved;
    document.getElementById('stat-recipes').innerText = state.stats.recipesCreated;
    document.getElementById('stat-waste').innerText = state.stats.wasteReducedKg;
    document.getElementById('stat-saved').innerText = state.stats.moneySavedBaht;
}

let wasteChartInstance = null;
let categoryChartInstance = null;

function initCharts() {
    if (wasteChartInstance) wasteChartInstance.destroy();
    if (categoryChartInstance) categoryChartInstance.destroy();

    const ctxWaste = document.getElementById('wasteChart').getContext('2d');
    wasteChartInstance = new Chart(ctxWaste, {
        type: 'line',
        data: {
            labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'ปัจจุบัน'],
            datasets: [{
                label: 'ขยะอาหารที่ลดลง (กิโลกรัม)',
                data: [0.5, 1.2, 1.8, 2.1, 2.4, state.stats.wasteReducedKg],
                borderColor: '#2D5A39',
                backgroundColor: 'rgba(45, 90, 57, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    const ctxCategory = document.getElementById('categoryChart').getContext('2d');
    categoryChartInstance = new Chart(ctxCategory, {
        type: 'doughnut',
        data: {
            labels: ['ผักสด', 'ไข่และเนื้อสัตว์', 'ผลไม้', 'เครื่องปรุง/อื่นๆ'],
            datasets: [{
                data: [40, 35, 15, 10],
                backgroundColor: ['#8A9A86', '#1C3A27', '#D97706', '#9CA3AF']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

renderIngredients();
