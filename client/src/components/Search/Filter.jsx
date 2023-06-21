import React, {useCallback, useEffect, useState} from 'react';
import {labels, options} from '../../constants';
import {data} from '../../mockData/data';
import {InputRange} from '../InputRange/InputRange';
import {BuildingFilters} from './Filters/BuildingFilters/BuildingFilters';
import {CarFilters} from './Filters/CarFilters/CarFilters';
import {NotebookFilters} from './Filters/NotebookFilters/NotebookFilters';
import {CameraFilters} from './Filters/CameraFilters/CameraFilters';
import styles from './Filter.module.css';

let selectedMoneyRange = null;

export function Filter({getFilters}) {
    const [category, setCategory] = useState('');
    const [money, setMoney] = useState(null);
    //Недвижимость
    const [buildingsFilters, setBuildingsFilters] = useState(null);
    //Автомобили
    const [carsFilters, setCarsFilters] = useState(null);
    //Ноутбуки
    const [notebooksFilters, setNotebooksFilters] = useState(null);
    //Фотоаппараты
    const [camerasFilters, setCamerasFilters] = useState(null);

    //Находим максимальную и минимальную цену для каждой категории(для слайдера)
    useEffect(() => {
        let tempMoney;
        if (category) {
            tempMoney = data.filter((el) => el.category === category)
                .sort((a, b) => a.money - b.money);
        } else {
            tempMoney = data.sort((a, b) => a.money - b.money);
        }

        let minMoney = 0;
        let maxMoney = tempMoney[tempMoney.length - 1]?.money;
        //Если первое min значение не равно последнему max
        if (tempMoney[0]?.money !== tempMoney[tempMoney.length - 1]?.money) {
            minMoney = tempMoney[0]?.money;
        }

        setMoney({minMoney, maxMoney});
        getFilters({
            category: category,
            money: {minMoney, maxMoney},
        });
    }, [category]);

    const selectCategories = (value) => {
        setCategory(value);
    };

    //Недвижимость
    const getBuildingFilters = (data) => {
        setBuildingsFilters(data);
    }

    //Автомобили
    const getCarFilters = (data) => {
        setCarsFilters(data);
    }

    //Ноутбуки
    const getNotebookFilters = (data) => {
        setNotebooksFilters(data);
    }

    //Фотоаппараты
    const getCameraFilters = (data) => {
        setCamerasFilters(data);
    }

    //Выбрали диапазон от minMoney до maxMoney, необходимые для фильтрации категорий по цене
    const getMoney = useCallback((minMoney, maxMoney) => {
        selectedMoneyRange = {minMoney, maxMoney};
    }, []);

    //Клик по кнопке Показать
    const onHandlerShow = () => {
        let filters = {
            category: category,
            money: selectedMoneyRange,
        };

        switch (category) {
            case 'buildings':
                filters = {...filters, ...buildingsFilters};
                break;
            case 'cars':
                filters = {...filters, ...carsFilters};
                break;
            case 'notebooks':
                filters = {...filters, ...notebooksFilters};
                break;
            case 'cameras':
                filters = {...filters, ...camerasFilters};
                break;
        }

        getFilters(filters);
    };

    return (
        <section className={styles.container}>
            <h2>ФИЛЬТР</h2>
            <div className={styles.filtersContainer}>
                <div className={styles.categoriesContainer}>
                    <span className={styles.label}>{labels.categoryLabel}</span>
                    <select className={styles.categories}
                            onChange={(e) => selectCategories(e.target.value)}>
                        <option value=''>Все</option>
                        {
                            options.map(option => {
                                return (
                                    <option
                                        key={option.value}
                                        value={option.value}>
                                        {option.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className={styles.inputRangeContainer}>
                    <span className={styles.label}>{labels.priceLabel} &#x20bd;</span>
                    {
                        money ?
                            <InputRange
                                min={money.minMoney}
                                max={money.maxMoney}
                                getValues={getMoney}
                            />
                            : null
                    }
                </div>
            </div>
            {
                category === 'buildings' ?
                    <BuildingFilters getBuildingFilters={getBuildingFilters}/> : null
            }
            {
                category === 'cars' ?
                    <CarFilters getCarFilters={getCarFilters}/> : null
            }
            {
                category === 'notebooks' ?
                    <NotebookFilters getNotebookFilters={getNotebookFilters}/> : null
            }
            {
                category === 'cameras' ?
                    <CameraFilters getCameraFilters={getCameraFilters}/> : null
            }
            <button
                type='button'
                className={styles.buttonShow}
                onClick={onHandlerShow}>
                Показать
            </button>
        </section>
    )
}