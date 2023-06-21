import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import {labels, ram, screenSizes, types} from '../../../../constants';
import {getSelectedCheckbox} from '../../../../helpers/commonHelpers';
import styles from './NotebookFilters.module.css';

export function NotebookFilters({getNotebookFilters}) {
    const [buttonSelectedRAM, setButtonSelectedRAM] = useState('any');
    const [minRam, setMinRAM] = useState('any');
    const [buttonSelectedMinScreenSize, setButtonSelectedMinScreenSize] = useState('any');
    const [minScreenSize, setMinScreenSize] = useState('any');
    const [notebookTypes, setNotebookTypes] = useState({});
    const [processorTypes, setProcessorTypes] = useState({});

    useEffect(() => {
        getNotebookFilters({
            types: Object.values(notebookTypes),
            minRam: minRam,
            minScreenSize: minScreenSize,
            processor: Object.values(processorTypes)
        });
    }, [notebookTypes, minRam, minScreenSize, processorTypes]);

    //Выбранные чекбоксы
    const selectTypes = (target) => {
        const {id, name, checked, dataset} = target;
        //Выбранные чекбоксы с типом ноутбука
        if (dataset.types === 'typesNotebooks') {
            const types = getSelectedCheckbox({id, name, checked}, notebookTypes);
            setNotebookTypes(types);
        }
        //Выбранные чекбоксы с типом процессора
        if (dataset.types === 'typesProcessor') {
            const types = getSelectedCheckbox({id, name, checked}, processorTypes);
            setProcessorTypes(types);
        }
    };

    //Минимальный объем оперативной памяти
    const selectRAM = (target) => {
        const {id} = target;
        setButtonSelectedRAM(id);
        setMinRAM(id);
    }

    //Минимальная диагональ экрана
    const selectMinScreenSize = (target) => {
        const {id} = target;
        setButtonSelectedMinScreenSize(id);
        setMinScreenSize(id);
    }

    return (
        <div className={styles.notebooksContainer}>
            <div className={styles.checkboxContainer}>
                <span className={styles.label}>{labels.notebooksLabels.type}</span>
                {
                    types.notebookTypes.map((notebookType) => {
                        return (
                            <label key={notebookType.id} className={styles.labelForCheckbox}>
                                <input
                                    id={notebookType.id}
                                    name={notebookType.type}
                                    type='checkbox'
                                    data-types='typesNotebooks'
                                    className={styles.checkbox}
                                    onChange={(e) => selectTypes(e.target)}
                                />
                                {notebookType.type}
                            </label>
                        )
                    })
                }
            </div>
            <div className={styles.RAMContainer}>
                <span className={styles.label}>{labels.notebooksLabels.minRam}</span>
                <div onClick={(e) => selectRAM(e.target)}>
                    <button
                        id='any'
                        type='button'
                        className={cn(styles.buttonRAM, styles.firstButton, {[styles.buttonSelected]: buttonSelectedRAM === 'any'})}>
                        Любой
                    </button>
                    {
                        ram.map((r, index) => {
                            return (
                                <button
                                    id={r}
                                    type='button'
                                    key={r}
                                    className={cn(styles.buttonRAM,
                                        {[styles.buttonSelected]: buttonSelectedRAM === String(r)},
                                        {[styles.lastButton]: index === ram.length - 1})}
                                >
                                    {`${r} Гб`}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.minScreenSizeContainer}>
                <span className={styles.label}>{labels.notebooksLabels.minScreenSize}</span>
                <div onClick={(e) => selectMinScreenSize(e.target)}>
                    <button
                        id='any'
                        type='button'
                        className={cn(styles.buttonMinScreenSize, styles.firstButton, {[styles.buttonSelected]: buttonSelectedMinScreenSize === 'any'})}>
                        Любая
                    </button>
                    {
                        screenSizes.map((screenSize, index) => {
                            return (
                                <button
                                    id={screenSize}
                                    type='button'
                                    key={screenSize}
                                    className={cn(styles.buttonMinScreenSize,
                                        {[styles.buttonSelected]: buttonSelectedMinScreenSize === String(screenSize)},
                                        {[styles.lastButton]: index === screenSizes.length - 1})}>
                                    {screenSize}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.checkboxContainer}>
                <span className={styles.label}>{labels.notebooksLabels.type}</span>
                {
                    types.processorTypes.map(({id, type}) => {
                        return (
                            <label key={id} className={styles.labelForCheckbox}>
                                <input
                                    id={id}
                                    name={type}
                                    type='checkbox'
                                    data-types='typesProcessor'
                                    className={styles.checkbox}
                                    onChange={(e) => selectTypes(e.target)}
                                />
                                {type}
                            </label>
                        )
                    })
                }
            </div>
        </div>
    )
}