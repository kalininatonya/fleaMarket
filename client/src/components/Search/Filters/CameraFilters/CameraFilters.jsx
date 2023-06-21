import React, {useEffect, useState} from 'react';
import {labels, types} from '../../../../constants';
import {getSelectedCheckbox} from '../../../../helpers/commonHelpers';
import {data} from '../../../../mockData/data';
import styles from './CameraFilters.module.css';

export function CameraFilters({getCameraFilters}) {
    const [cameraTypes, setCameraTypes] = useState({});
    const [matrices, setMatrices] = useState(null); //Для селекта при выборе Минимальное разрешение матрицы
    const [videos, setVideos] = useState(null); //Для селекта при выборе Минимальное разрешение видео
    const [minMatrix, setMinMatrix] = useState('');
    const [minVideo, setMinVideo] = useState('');

    useEffect(() => {
        getCameraFilters({minMatrix: minMatrix, minVideo: minVideo, types: Object.values(cameraTypes)});
    }, [minMatrix, cameraTypes, minVideo]);

    //Для select
    useEffect(() => {
        const category = data.filter((el) => el.category === 'cameras');
        //Разрешение видео
        const videos = category.map((el) => el.video);
        const objResolutions = new Set(videos);
        setVideos([...objResolutions]);

        //Минимальное разрешение матрицы
        const matrices = category.map((el) => el.matrix);
        const objMatrices = new Set(matrices);
        const objMatricesSort = [...objMatrices].sort((a, b) => a - b);
        setMatrices(objMatricesSort);
    }, []);

    //Выбранные чекбоксы с типом фотоаппарата
    const selectTypes = (target) => {
        const {id, name, checked} = target;
        const types = getSelectedCheckbox({id, name, checked}, cameraTypes);
        setCameraTypes(types);
    };

    //Select Минимальное разрешение матрицы
    const selectMinMatrices = (matrix) => {
        setMinMatrix(matrix);
    }

    //Select Минимальное разрешение видео
    const selectMinVideoResolution = (video) => {
        setMinVideo(video);
    }

    return (
        <div>
            <div className={styles.checkboxContainer}>
                <span className={styles.label}>{labels.camerasLabels.type}</span>
                {
                    types.cameraTypes.map((cameraType) => {
                        return (
                            <label key={cameraType.id} className={styles.labelForCheckbox}>
                                <input
                                    id={cameraType.id}
                                    name={cameraType.type}
                                    type='checkbox'
                                    className={styles.checkbox}
                                    onChange={(e) => selectTypes(e.target)}
                                />
                                {cameraType.type}
                            </label>
                        )
                    })
                }
            </div>
            <div className={styles.matricesContainer}>
                <span className={styles.label}>{labels.camerasLabels.minMatrix}</span>
                <select
                    className={styles.matrices}
                    onChange={(e) => selectMinMatrices(e.target.value)}>
                    <option value=''>Любое</option>
                    {
                        matrices ? matrices.map((m) => <option key={m} value={m}>{m}</option>) : null
                    }
                </select>
            </div>
            <div className={styles.videoResolutionContainer}>
                <span className={styles.label}>{labels.camerasLabels.video}</span>
                <select
                    className={styles.videoResolution}
                    onChange={(e) => selectMinVideoResolution(e.target.value)}>
                    <option value=''>Любое</option>
                    {
                        videos ? videos.map((v) => <option key={v} value={v}>{v}</option>) : null
                    }
                </select>
            </div>
        </div>
    )
}