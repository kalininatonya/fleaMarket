import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import {labels, rooms, types} from '../../../../constants';
import {getSelectedCheckbox} from '../../../../helpers/commonHelpers';
import styles from './BuildingFilters.module.css';

//Недвижимость
export function BuildingFilters({getBuildingFilters}) {
    const [buttonSelected, setButtonSelected] = useState('any');
    const [buildingTypes, setBuildingTypes] = useState({});
    const [minSquare, setMinSquare] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState('any');

    useEffect(() => {
        getBuildingFilters({room: selectedRoom, minSquare: minSquare, types: Object.values(buildingTypes)});
    }, [selectedRoom, minSquare, buildingTypes]);

    //Выбранные чекбоксы с типом квартиры
    const selectTypes = (target) => {
        const {id, name, checked} = target;
        const types = getSelectedCheckbox({id, name, checked}, buildingTypes);
        setBuildingTypes(types);
    };

    //Минимально допустимая площадь
    const selectMinSquare = (value) => {
        if (value !== '' && isNaN(NaN) !== isNaN(Number(value))) {
            setMinSquare(Number(value));
        } else {
            setMinSquare(null);
        }
    }

    //Выбор количества комнат
    const selectRoomsNumber = (target) => {
        const {id} = target;
        setButtonSelected(id);
        setSelectedRoom(id);
    }

    return (
        <div>
            <div className={styles.checkboxContainer}>
                <span className={styles.label}>{labels.buildingLabels.type}</span>
                {
                    types.buildingTypes.map((buildingType) => {
                        return (
                            <label key={buildingType.id} className={styles.labelForCheckbox}>
                                <input
                                    id={buildingType.id}
                                    name={buildingType.type}
                                    type='checkbox'
                                    className={styles.checkbox}
                                    onChange={(e) => selectTypes(e.target)}
                                />
                                {buildingType.type}
                            </label>
                        )
                    })
                }
            </div>
            <div className={styles.squareContainer}>
                <span className={styles.label}>{labels.buildingLabels.minSquare}</span>
                <input
                    type='number'
                    autoFocus={true}
                    className={styles.square}
                    onChange={(e) => selectMinSquare(e.target.value)}
                />
            </div>
            <div className={styles.numberOfRoomsContainer}>
                <span className={styles.label}>{labels.buildingLabels.room}</span>
                <div className={styles.buttonContainer}
                     onClick={(e) => selectRoomsNumber(e.target)}
                >
                    <button
                        id='any'
                        type='button'
                        className={cn(styles.buttonRooms, styles.firstButtonRooms, {[styles.buttonSelected]: buttonSelected === 'any'})}
                    >
                        Любое
                    </button>
                    {
                        rooms.map((room) => {
                            return (
                                <button
                                    id={room}
                                    key={room}
                                    type='button'
                                    className={cn(styles.buttonRooms,
                                        {[styles.buttonSelected]: buttonSelected === String(room)},
                                        {[styles.lastButtonRooms]: room === rooms.length})}>
                                    {room === rooms.length ? `${room}+` : room}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}