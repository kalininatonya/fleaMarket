import React, {useEffect, useState} from 'react';
import cn from 'classnames';
import {distanceBetweenRollers, positionEnd, rollerWidth, sliderWidth} from './inputRangeConstants';
import styles from './InputRange.module.css';

export function InputRange({min, max, getValues}) {
    const [roller, setRoller] = useState(''); //'Min'/'Max' бегунок
    const [prevClientX, setPrevClientX] = useState(null); //Предыдущее значение clientX
    //Положение бегунков
    const [positionMin, setPositionMin] = useState(0);
    const [positionMax, setPositionMax] = useState(positionEnd);
    //Линия-заливка
    const [positionLine, setPositionLine] = useState(0);
    const [dynamicLineWidth, setDynamicLineWidth] = useState(sliderWidth); //Ширина линии заливки

    const [minValue, setMinValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);

    //Сбрасываем бегунки при смене категории
    useEffect(() => {
        setPositionMin(0);
        setPositionMax(positionEnd);
        setDynamicLineWidth(sliderWidth);
        setPositionLine(0);
        setMinValue(min);
        setMaxValue(max);
    }, [min, max]);

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
        };
    }, [min, max, roller]);

    useEffect(() => {
        document.addEventListener("mouseup", onMouseUp);
        return () => {
            document.removeEventListener("mouseup", onMouseUp);
        };
    }, []);

    const onMouseDown = (clientX, newRoller) => {
        setRoller(newRoller);
        setPrevClientX(clientX); //Координата(положение) роллера до начала перемещения
    }

    const calculateMaxValue = (position) => {
        let newPosition = max;

        if (position > 0 && position < positionEnd) {
            newPosition = position * max / sliderWidth;
        }

        if (position === rollerWidth) {
            newPosition = min;
        }

        return newPosition;
    };

    const calculateMinValue = (position) => {
        let newPosition = min;

        if (position > 0) {
            newPosition = position * max / sliderWidth;
        }

        if (position === distanceBetweenRollers) {
            newPosition = max;
        }

        return newPosition;
    };

    //Функции для рассчета синей линии
    const calculateMinLine = (position) => {
        setPositionLine(position);

        return (positionMax < positionEnd ? (positionMax - position) : (sliderWidth - position));
    };

    const calculateMaxLine = (position) => {
        if (positionMin > 0) {
            setPositionLine(positionMin);
            return (position - positionMin);
        }

        setPositionLine(0);

        return position;
    };

    const onMouseMove = (e) => {
        //Расстояние на которое переместился курсор из точки А в точку В(deltaX)
        const deltaX = e.clientX - prevClientX;
        let newPosition;

        if (roller === 'Min') {
            //Точка, которую не может переехать роллер 'Min'(роллеры не могут меняться местами)
            const positionMinEnd = positionMax - rollerWidth;
            newPosition = positionMin + deltaX;

            if (newPosition < 0) newPosition = 0;

            if (newPosition > positionMinEnd) {
                newPosition = positionMinEnd;
            }

            setPositionMin(newPosition);
            setMinValue(calculateMinValue(newPosition));
            //line width
            setDynamicLineWidth(calculateMinLine(newPosition));
        }

        if (roller === 'Max') {
            //Крайняя точка до которой может доехать роллер 'Max'
            const positionStart = positionMin + rollerWidth;
            newPosition = positionMax + deltaX;

            if (newPosition < positionStart) {
                newPosition = positionStart;
            }

            if (newPosition > positionEnd) {
                newPosition = positionEnd;
            }

            setPositionMax(newPosition);
            setMaxValue(calculateMaxValue(newPosition));
            //line width
            setDynamicLineWidth(calculateMaxLine(newPosition));
        }
    }

    const onMouseUp = () => {
        setRoller('');
        setPrevClientX(null);
    }

    return (
        <div id="rangeContainer" className={styles.inputRange}>
            <div className={styles.valueContainer} onChange={getValues(minValue, maxValue)}>
                <div className={styles.value}>{Math.round(Number(minValue)).toLocaleString()}</div>
                <div className={styles.value}>{Math.round(Number(maxValue)).toLocaleString()}</div>
            </div>
            <div>
                <div className={styles.lineTemp} style={{width: `${dynamicLineWidth}px`, left: `${positionLine}px`}}/>
                <div className={styles.line}/>
                <div className={cn(styles.sliderMin)} style={{left: `${positionMin}px`}}
                     onMouseDown={(e) => onMouseDown(e.clientX, 'Min')}/>
                <div className={styles.sliderMax} style={{left: `${positionMax}px`}}
                     onMouseDown={(e) => onMouseDown(e.clientX, 'Max')}/>
            </div>
        </div>
    )
}