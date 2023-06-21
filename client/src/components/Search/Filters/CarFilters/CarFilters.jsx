import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import {labels, transmissions, types} from '../../../../constants';
import {getSelectedCheckbox} from '../../../../helpers/commonHelpers';
import {data} from '../../../../mockData/data';
import styles from './CarFilters.module.css';

//Автомобили
export function CarFilters({getCarFilters}) {
    const [buttonSelected, setButtonSelected] = useState('any');
    const [years, setYears] = useState(null); //Для селекта при выборе Минимальный год выпуска
    const [minCarYear, setMinCarYear] = useState('');
    const [transmission, setTransmission] = useState('any');
    const [carTypes, setCarTypes] = useState({});

    //Для select с годами в машинах
    useEffect(() => {
        const years = data.filter((el) => el.category === 'cars')
            .map((el) => el.year);
        const objYears = new Set(years);
        const yearsSort = [...objYears].sort((a, b) => a - b);
        setYears(yearsSort);
    }, []);

    useEffect(() => {
        getCarFilters({minYear: minCarYear, transmission: transmission, types: Object.values(carTypes)});
    }, [minCarYear, transmission, carTypes]);

    //Select Минимальный год выпуска
    const selectMinYear = (year) => {
        setMinCarYear(year);
    }

    //Коробка передач
    const selectTransmission = (target) => {
        const {id} = target;
        setButtonSelected(id);
        setTransmission(id);
    }

    //Выбранные чекбоксы с типом кузова
    const selectTypes = (target) => {
        const {id, name, checked} = target;
        const types = getSelectedCheckbox({id, name, checked}, carTypes);
        setCarTypes(types);
    };

    return (
        <div>
            <div className={styles.yearsContainer}>
                <span className={styles.label}>{labels.carsLabels.minYear}</span>
                <select onChange={(e) => selectMinYear(e.target.value)} className={styles.years}>
                    <option value=''>Любой</option>
                    {
                        years ? years.map((year) => <option key={year} value={year}>{year}</option>)
                            : null
                    }
                </select>
            </div>
            <div className={styles.transmissionContainer}>
                <span className={styles.label}>{labels.carsLabels.transmission}</span>
                <div className={styles.buttonContainer} onClick={(e) => selectTransmission(e.target)}>
                    <button
                        id='any'
                        type='button'
                        className={cn(styles.buttonTransmission, styles.firstButtonTransmission, {[styles.buttonSelected]: buttonSelected === 'any'})}>
                        Любое
                    </button>
                    {
                        transmissions.map(({id, value, label}) => {
                            return (
                                <button
                                    id={value}
                                    type='button'
                                    key={id}
                                    className={cn(styles.buttonTransmission,
                                        {[styles.buttonSelected]: buttonSelected === value},
                                        {[styles.lastButtonTransmission]: id === transmissions.length}
                                    )}>
                                    {label}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.checkboxContainer}>
                <span className={styles.label}>{labels.carsLabels.type}</span>
                {
                    types.carTypes.map((carType) => {
                        return (
                            <label key={carType.id} className={styles.labelForCheckbox}>
                                <input
                                    id={carType.id}
                                    type='checkbox'
                                    name={carType.type}
                                    className={styles.checkbox}
                                    onChange={(e) => selectTypes(e.target)}/>
                                {carType.type}
                            </label>
                        )
                    })
                }
            </div>
        </div>
    )
}