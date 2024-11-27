document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById('calendar');
    const currentYearSpan = document.getElementById('currentYear');
    const prevYearBtn = document.getElementById('prevYear');
    const nextYearBtn = document.getElementById('nextYear');
    const languageSwitcher = document.getElementById('languageSwitcher');
    const currentDateElement = document.getElementById('currentDate');

    let currentYear = 2024;
    let currentLanguage = 'uk'; // Default language

    const translations = {
        'uk': {
            prevYear: '<<',
            nextYear: '>>',
            currentYear: 'Поточний рік',
            today: 'Сьогодні'
        },
        'en': {
            prevYear: '<<',
            nextYear: '>>',
            currentYear: 'Current Year',
            today: 'Today'
        },
        'ru': {
            prevYear: '<<',
            nextYear: '>>',
            currentYear: 'Текущий год',
            today: 'Сегодня'
        }
    };

    const monthNames = {
        'uk': ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
            'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
        'en': ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
        'ru': ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    };

    function getHolidays(year) {
        const holidays = {
            '01-01': { uk: 'Новий Рік', en: 'New Year', ru: 'Новый Год' },
            '01-07': { uk: 'Різдво Христове', en: 'Christmas', ru: 'Рождество' },
            '01-22': { uk: 'День Соборності України', en: 'Unity Day of Ukraine', ru: 'День Соборности Украины' },
            '02-14': { uk: 'День святого Валентина', en: 'Valentine\'s Day', ru: 'День Святого Валентина' },
            '02-24': { uk: 'День повномасштабного вторгнення Росії в Україну', en: 'The day of Russia\'s full-scale invasion of Ukraine', ru: 'День полномасштабного вторжения России в Украину', tragic: true },
            '03-08': { uk: 'Міжнародний жіночий день', en: 'International Women\'s Day', ru: 'Международный женский день' },
            '04-26': { uk: 'День Чорнобиля', en: 'Chernobyl Disaster Remembrance Day', ru: 'День Чернобыля', tragic: true },
            '05-01': { uk: 'День праці', en: 'Labor Day', ru: 'День труда' },
            '05-08': { uk: 'День пам\'яті жертв Другої світової війни', en: 'Day of Remembrance for Victims of World War II', ru: 'День памяти жертв Второй мировой войны' },
            '06-28': { uk: 'День Конституції України', en: 'Constitution Day of Ukraine', ru: 'День Конституции Украины' },
            '08-24': { uk: 'День Незалежності України', en: 'Independence Day of Ukraine', ru: 'День Независимости Украины' },
            '09-01': { uk: 'День знань', en: 'Knowledge Day', ru: 'День знаний' },
            '10-14': { uk: 'День захисника України', en: 'Defender of Ukraine Day', ru: 'День защитника Украины' },
            '12-06': { uk: 'Святий Миколай', en: 'St. Nicholas Day', ru: 'День святого Николая' },
            '12-16': { uk: 'Святий Миколай', en: 'St. Nicholas Day', ru: 'День святого Николая' },
            '12-25': { uk: 'Різдво Христове (католицьке)', en: 'Christmas (Catholic)', ru: 'Рождество Христово (католическое)' },
            '12-31': { uk: 'Новий Рік (новорічна ніч)', en: 'New Year\'s Eve', ru: 'Новый Год (новогодняя ночь)' },
            '04-15': { uk: 'Страсна п\'ятниця', en: 'Good Friday', ru: 'Страстная пятница' },
            '04-17': { uk: 'Великдень', en: 'Easter', ru: 'Пасха' },
            '05-28': { uk: 'Трійця', en: 'Pentecost', ru: 'Троица' },
            '08-19': { uk: 'Пресвятая Богородиця', en: 'The Transfiguration of Jesus', ru: 'Преображение Господне' },
            '11-21': { uk: 'День Гідності та Свободи', en: 'Day of Dignity and Freedom', ru: 'День Достоинства и Свободы' },
            '11-25': { uk: 'День пам\'яті жертв Голодомору', en: 'Holodomor Victims Remembrance Day', ru: 'День памяти жертв Голодомора', tragic: true },
        };

        // Вычисляем дату Пасхи
        const easterDate = calculateEaster(year);
        if (easterDate) {
            const formattedEasterDate = `${String(easterDate.getMonth() + 1).padStart(2, '0')}-${String(easterDate.getDate()).padStart(2, '0')}`;
            holidays[formattedEasterDate] = { uk: 'Пасха', en: 'Easter', ru: 'Пасха' };
        }

        return holidays;
    }

    // Функция для вычисления даты Пасхи (православная)
    function calculateEaster(year) {
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 16);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31);
        const day = ((h + l - 7 * m + 114) % 31) + 1;

        return new Date(year, month - 1, day); // Возвращаем дату Пасхи
    }

    function generateCalendar(year) {
        const calendarDiv = document.getElementById('calendar');
        calendarDiv.classList.remove('visible'); // Сховати календар

        setTimeout(() => {
            calendarDiv.innerHTML = ''; // Очистити попередній календар
            const monthNamesCurrentLanguage = monthNames[currentLanguage];

            // Отримати свята для поточного року
            const currentYearHolidays = getHolidays(year);

            monthNamesCurrentLanguage.forEach((month, index) => {
                const monthDiv = document.createElement('div');
                monthDiv.classList.add('month');
                monthDiv.innerHTML = `
                    <div class="month-header">${month} ${year}</div>
                    <div class="weekdays">${['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map(day => `<div>${day}</div>`).join('')}</div>
                    <div class="days"></div>
                `;
                calendarDiv.appendChild(monthDiv);

                const daysDiv = monthDiv.querySelector('.days');
                const firstDay = new Date(year, index, 1).getDay();
                const daysInMonth = new Date(year, index + 1, 0).getDate();
                let daySlot = firstDay === 0 ? 6 : firstDay - 1; // Корекція для початку з понеділка

                // Додаємо пусті ячейки до першого дня місяця
                for (let i = 0; i < daySlot; i++) {
                    daysDiv.appendChild(document.createElement('div'));
                }

                // Додаємо дні місяця
                for (let day = 1; day <= daysInMonth; day++) {
                    const dayDiv = document.createElement('div');
                    dayDiv.textContent = day;
                    dayDiv.classList.add('day');

                    const formattedDate = `${String(index + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                    // Перевіряємо, чи є свято або трагічний день
                    if (currentYearHolidays[formattedDate]) {
                        if (currentYearHolidays[formattedDate].tragic) {
                            dayDiv.classList.add('tragic'); // Додаємо клас для трагічного дня
                        } else {
                            dayDiv.classList.add('holiday'); // Додаємо клас для свята
                        }
                        dayDiv.title = currentYearHolidays[formattedDate][currentLanguage]; // Установлюємо назву свята
                    }

                    daysDiv.appendChild(dayDiv);
                }

                // Додаємо пусті ячейки після останнього дня місяця
                for (let i = 0; i < 42 - daysInMonth - daySlot; i++) {
                    daysDiv.appendChild(document.createElement('div'));
                }
            });

            calendarDiv.classList.add('visible'); // Показати календар знову
        }, 500); // Час затримки, щоб дочекатися завершення анімації
    }

    function updateLanguage() {
        prevYearBtn.textContent = translations[currentLanguage].prevYear;
        nextYearBtn.textContent = translations[currentLanguage].nextYear;
        currentYearSpan.textContent = translations[currentLanguage].currentYear;
        updateCurrentDate(); // Обновляем текущую дату при смене языка
    }

    function updateCurrentDate() {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        const monthName = monthNames[currentLanguage][month];

        currentDateElement.innerHTML = `
            ${translations[currentLanguage].today} 
            ${day} ${monthName} ${year}
        `;
    }

    languageSwitcher.addEventListener('change', (event) => {
        currentLanguage = event.target.value;
        updateLanguage();
        generateCalendar(currentYear); // Перегенерируем календарь при смене языка
    });

    prevYearBtn.addEventListener('click', () => {
        currentYear--;
        currentYearSpan.textContent = currentYear;
        generateCalendar(currentYear);
    });

    nextYearBtn.addEventListener('click', () => {
        currentYear++;
        currentYearSpan.textContent = currentYear;
        generateCalendar(currentYear);
    });

    // Инициализация календаря и языка
    generateCalendar(currentYear);
    updateLanguage();
    updateCurrentDate();
});