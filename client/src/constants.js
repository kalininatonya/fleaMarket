export const labels = {
    categoryLabel: "Категория товаров",
    priceLabel: "Цена",
    sellerLabel: "Продавец",
    descriptionLabel: "Описание товара",
    carsLabels: {
        year: "Год выпуска",
        minYear: "Минимальный год выпуска",
        transmission: "Коробка передач",
        type: "Тип кузова"
    },
    buildingLabels: {
        room: "Количество комнат",
        square: "Площадь",
        minSquare:"Минимальная площадь, м2",
        type: "Тип недвижимости",
    },
    camerasLabels: {
        matrix: "Разрешение матрицы",
        minMatrix: "Минимальное разрешение матрицы",
        video: "Разрешение видео",
        type: "Тип фотоаппарата",
    },
    notebooksLabels: {
        ram: "Объем оперативной памяти",
        minRam: "Минимальный объем оперативной памяти",
        screenSize: "Диагональ экрана",
        minScreenSize: "Минимальная диагональ экрана",
        type: "Тип ноутбука",
    }
};

export const rooms = [1, 2, 3, 4, 5]; //Кноки количества комнат для фильтра Недвижимость
export const ram = [4, 8, 16]; //Для фильтра - Минимальный объем оперативной памяти
export const screenSizes = [13, 14, 15, 17];

export const transmissions = [
    {id: 1, value: "manual", label: "Механика"},
    {id: 2, value: "automatic", label: "Автомат"}
];

export const sortButtons = [
    {id: 1, value: "buttonPopularCategories", label: "Популярные"},
    {id: 2, value: "buttonCheapCategories", label: "Дешевые"},
    {id: 3, value: "buttonNewCategories", label: "Новые"},
    {id: 4, value: "buttonFavoritesCategories", label: "Показать избранные"}
];

export const options = [
    {value: "cars", label: "Автомобили"},
    {value: "buildings", label: "Недвижимость"},
    {value: "notebooks", label: "Ноутбуки"},
    {value: "cameras", label: "Фотоаппараты"}
];

export const types = {
    carTypes: [
        {id: 1, type: 'Седан'},
        {id: 2, type: 'Универсал'},
        {id: 3, type: 'Хэтчбэк'},
        {id: 4, type: 'Внедорожник'},
        {id: 5, type: 'Купе'}
    ],
    buildingTypes: [
        {id: 1, type: 'Дом'},
        {id: 2, type: 'Квартира'},
        {id: 3, type: 'Апартаменты'}
    ],
    cameraTypes: [
        {id: 1, type: 'Зеркальный'},
        {id: 2, type: 'Цифровой'},
        {id: 3, type: 'Беззеркальный'}
    ],
    notebookTypes: [
        {id: 1, type: 'Ультрабук'},
        {id: 2, type: 'Домашний ноутбук'},
        {id: 3, type: 'Игровой ноутбук'}
    ],
    processorTypes: [
        {id: 1, type: 'Intel Core i3'},
        {id: 2, type: 'Intel Core i5'},
        {id: 3, type: 'Intel Core i7'}
    ],
};