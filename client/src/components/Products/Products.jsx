import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import {data} from '../../mockData/data';
import {rooms, sortButtons} from '../../constants';
import {getFilteredByTypeItems} from '../../helpers/commonHelpers';
import {Pictures} from './Pictures/Pictures';
import styles from './Products.module.css';

export function Products({filters, openModal}) {
    const [buttonSelected, setButtonSelected] = useState('buttonPopularCategories');
    const [isFavorite, setIsFavorite] = useState(false);
    const [sortCategory, setSortCategory] = useState('buttonPopularCategories');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState(data);
    const {value, label} = sortButtons[sortButtons.length - 1]; //Кнопка для сортировки по избранным

    //Фильтрация и сортировка
    useEffect(() => {
        let filteredProducts = [...categories];

        //Применяю фильтр (category)
        if (filters.category) {
            const filterByCategory = filteredProducts.filter(el => el.category === filters.category);
            filteredProducts = [...filterByCategory];
        }

        if (filters.money) {
            //Применяю фильтр по диапазону денег, чтобы отображались товары входящие в выбранный ценовой диапазон
            const filterBySelectedMoney = filteredProducts.filter(el => el.money >= filters.money.minMoney && el.money <= filters.money.maxMoney);
            filteredProducts = [...filterBySelectedMoney];
        }

        switch (filters.category) {
            case 'buildings': //Применяю фильтр, если выбрана категория - Недвижимость
                //Применяю фильтр - Выбранные чекбоксы с типом квартиры
                if (filters.types && filters.types.length !== 0) {
                    const filterByType = getFilteredByTypeItems(filters.types, filteredProducts);
                    filteredProducts = [...filterByType];
                }
                //Применяю фильтр - Минимально допустимая площадь
                if (filters.minSquare) {
                    const filterBySquare = filteredProducts.filter(el => el.square >= filters.minSquare);
                    filteredProducts = [...filterBySquare];
                }
                //Применяю фильтр - Выбор количества комнат
                if (filters.room && filters.room === String(rooms.length)) {
                    //Комнат 5+
                    const filterByRoom = filteredProducts.filter(el => el.room >= Number(filters.room));
                    filteredProducts = [...filterByRoom];
                } else if (filters.room && filters.room !== String(rooms.length) && filters.room !== 'any') {
                    const filterByRoom = filteredProducts.filter(el => el.room === Number(filters.room));
                    filteredProducts = [...filterByRoom];
                }
                break;
            case 'cars': //Применяю фильтр, если выбрана категория - Автомобили
                // Применяю фильтр - Выбранные чекбоксы с типом кузова
                if (filters.types && filters.types.length !== 0) {
                    const filterByType = getFilteredByTypeItems(filters.types, filteredProducts);
                    filteredProducts = [...filterByType];
                }
                //Применяю фильтр - Минимальный год выпуска
                if (filters.minYear) {
                    const filterByMinYear = filteredProducts.filter((el) => el.year >= Number(filters.minYear));
                    filteredProducts = [...filterByMinYear];
                }
                //Применяю фильтр - Коробка передач
                if (filters.transmission && filters.transmission !== 'any') {
                    const filterByTransmission = filteredProducts.filter((el) => el.transmission === filters.transmission);
                    filteredProducts = [...filterByTransmission];
                }
                break;
            case 'notebooks': //Применяю фильтр, если выбрана категория - Ноутбуки
                //Применяю фильтр - Выбранные чекбоксы с типом ноутбука
                if (filters.types && filters.types.length !== 0) {
                    const filterByType = getFilteredByTypeItems(filters.types, filteredProducts);
                    filteredProducts = [...filterByType];
                }
                //Применяю фильтр - Минимальный объем оперативной памяти
                if (filters.minRam && filters.minRam !== 'any') {
                    const filterByMinRAM = filteredProducts.filter((el) => el.ram >= Number(filters.minRam));
                    filteredProducts = [...filterByMinRAM];
                }

                //Применяю фильтр - Минимальная диагональ экрана
                if (filters.minScreenSize && filters.minScreenSize !== 'any') {
                    const filterByMinScreenSize = filteredProducts.filter((el) => el.screenSize >= Number(filters.minScreenSize));
                    filteredProducts = [...filterByMinScreenSize];
                }
                //Применяю фильтр - Выбранные чекбоксы с типом процессора
                if (filters.processor && filters.processor.length !== 0) {
                    const filterByProcessor = filteredProducts.filter((el) => {
                        for (let type of filters.processor) {
                            if (el.processor === type) {
                                return el;
                            }
                        }
                    })
                    filteredProducts = [...filterByProcessor];
                }
                break;
            case 'cameras':  //Применяю фильтр, если выбрана категория - Фотоаппараты
                //Применяю фильтр - Выбранные чекбоксы с типом фотоаппарата
                if (filters.types && filters.types.length !== 0) {
                    const filterByType = getFilteredByTypeItems(filters.types, filteredProducts);
                    filteredProducts = [...filterByType];
                }
                //Применяю фильтр - Минимальное разрешение матрицы
                if (filters.minMatrix) {
                    const filterByMinMatrix = filteredProducts.filter((el) => el.matrix >= Number(filters.minMatrix));
                    filteredProducts = [...filterByMinMatrix];
                }
                //Применяю фильтр - Разрешение видео
                if (filters.minVideo) {
                    const filterByMinVideo = filteredProducts.filter((el) => el.video === filters.minVideo);
                    filteredProducts = [...filterByMinVideo];
                }
                break;
        }

        //Сортировка
        //Применяю сортировку - Избранные(isFavorite)
        if (isFavorite) {
            const sortByFavoritesCategories = filteredProducts.filter(el => el.selected === true);
            filteredProducts = [...sortByFavoritesCategories];
        }
        switch (sortCategory) {
            case 'buttonNewCategories':
                const sortedNewProducts = filteredProducts.slice().sort((a, b) => a.date - b.date);
                setFilteredProducts(sortedNewProducts);
                break;
            case 'buttonCheapCategories':
                const sortedCheapProducts = filteredProducts.slice().sort((a, b) => a.money - b.money);
                setFilteredProducts(sortedCheapProducts);
                break;
            default:
                const sortedPopularProducts = filteredProducts.slice().sort((a, b) => b.countViews - a.countViews);
                setFilteredProducts(sortedPopularProducts);
        }

    }, [filters, isFavorite, categories, sortCategory]);


    const onIconHeartClick = (selectedElement) => {
        //Сделать selected true/false по клику на иконку избранные
        const {id, selected, category} = selectedElement;
        const newCategories = categories.map(el => {
            if (el.id === id && el.category === category) {
                return {...el, selected: !selected}
            } else return el;
        });
        setCategories(newCategories);
    }

    const categorySorting = (target) => {
        const {id} = target;
        setButtonSelected(id);
        if (id === 'buttonFavoritesCategories') {
            setIsFavorite(!isFavorite);
        } else {
            setIsFavorite(false);
            setSortCategory(id);
        }
    }

    return (
        <section className={styles.productsContainer}>
            <h2>РЕЗУЛЬТАТЫ</h2>
            <div>
                <span className={styles.label}>Показать сначала:</span>
                <nav className={styles.buttonsContainer}
                     onClick={(e) => categorySorting(e.target)}
                >
                    <div className={styles.buttonsLeft}>
                        {
                            sortButtons.map(({id, value, label}) => {
                                if (id !== 4) {
                                    return (
                                        <button
                                            id={value}
                                            type='button'
                                            key={id}
                                            className={cn(styles.button, styles[value], {[styles.buttonSelected]: buttonSelected === value})}>
                                            {label}
                                        </button>
                                    )
                                }
                            })
                        }
                    </div>
                    <div>
                        <button
                            id={value}
                            type='button'
                            className={cn(styles.button, styles[value], {[styles.buttonSelected]: buttonSelected === value})}
                        >
                            <svg className={styles.iconHeart} enableBackground="new 0 0 91 91" height="91px"
                                 id="Layer_1"
                                 version="1.1"
                                 viewBox="0 0 91 91" width="91px" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path
                                        d="M64.666,30.208c-2.195-1.816-5.014-2.814-7.936-2.814c-3.375,0-6.642,1.342-8.962,3.686   c-0.417,0.422-0.808,0.875-1.175,1.367c-2.841-3.781-7.588-5.721-12.283-4.863c-3.896,0.707-6.959,2.848-9.098,6.359   c-3.018,4.957-3.265,9.738-0.73,14.211c1.355,2.393,3.113,4.725,5.375,7.129c4.143,4.404,9.047,8.584,15.434,13.15   c0.408,0.293,0.845,0.441,1.301,0.441c0.702,0,1.176-0.355,1.411-0.529c5.763-4.115,10.29-7.908,14.248-11.943   c2.21-2.252,4.718-5.02,6.552-8.477c0.786-1.477,1.682-3.465,1.629-5.736C70.314,37.302,68.375,33.271,64.666,30.208z    M65.801,46.331c-1.633,3.074-3.937,5.611-5.977,7.689c-3.66,3.732-7.845,7.264-13.238,11.158   c-5.869-4.246-10.412-8.145-14.252-12.229c-2.073-2.203-3.674-4.32-4.895-6.475c-1.933-3.41-1.718-6.832,0.678-10.764   c1.612-2.648,3.9-4.258,6.802-4.785c0.556-0.102,1.119-0.152,1.674-0.152c3.44,0,6.487,1.9,8.208,5.199l0.292,0.551   c0.3,0.563,0.918,0.883,1.528,0.898c0.639-0.012,1.216-0.377,1.497-0.951c0.604-1.232,1.263-2.188,2.067-3.002   c1.686-1.701,4.071-2.678,6.545-2.678c2.133,0,4.182,0.723,5.771,2.037c2.956,2.441,4.438,5.531,4.533,9.439   C67.067,43.741,66.43,45.147,65.801,46.331z"/>
                                </g>
                            </svg>
                            {label}
                        </button>
                    </div>
                </nav>
                <div className={styles.gallery}>
                    {
                        filteredProducts.length !== 0 ?
                            <Pictures
                                products={filteredProducts}
                                openModal={openModal}
                                onIconHeartClick={onIconHeartClick}
                            /> :
                            <div>Нет товаров выбранной категории</div>
                    }
                </div>
            </div>
        </section>
    )
}