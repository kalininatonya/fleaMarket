import React, {useEffect, useState} from 'react';
import {addressAPI} from '../../api/addressAPI';
import {labels} from '../../constants';
import {formatDate} from '../../helpers/formatDate';
import {users} from '../../mockData/data';
import marker from '../../icons/marker.svg';
import styles from './ModalInformation.module.css';

export function ModalInformation({product, closeModal}) {
    const {
        date,
        userId,
        money,
        address,
        description,
        type,
        paths,
        category,

        year,
        transmission,

        room,
        square,

        matrix,
        video,

        ram,
        screenSize
    } = product;

    const [user, setUser] = useState(null);
    const [selectedImage, setSelectedImage] = useState(paths[0]);
    const [restImages, setRestImages] = useState(null);

    //Для смены изображения по клику
    useEffect(() => {
        const extraPaths = paths.filter((el) => el !== selectedImage);
        setRestImages(extraPaths);
    }, [selectedImage]);

    //Карта
    useEffect(() => {
        if (product.address) {
            //Достаем координаты переданного адреса и на его основе рисуем карту
            addressAPI.getCoordinates(address)
                .then(coordinates => {
                    const center = coordinates.pos.split(' ');
                    const newCoordinates = [center[1], center[0]];
                    let map = new window.ymaps.Map('map', {
                        center: newCoordinates,
                        zoom: 15
                    });
                    //Удаляем с карты лишние опции
                    map.controls.remove('trafficControl');
                    map.controls.remove('geolocationControl');
                    map.controls.remove('searchControl');
                    map.controls.remove('typeSelector');
                    map.controls.remove('rulerControl');
                    let placemark = new window.ymaps.Placemark(newCoordinates, {}, {
                        //Настройки для своего маркера
                        iconLayout: 'default#image',
                        iconImageHref: marker,
                        iconImageSize: [20, 20],
                        //iconImageOffSet: [100, -38] //Отступ

                    });
                    map.geoObjects.add(placemark);
                })
        }
    }, [product.address]);

    useEffect(() => {
        if (userId) {
            const newUser = users.filter((user) => user.id === userId);
            setUser(newUser[0]);
        }
    }, [userId]);

    const changeImage = (e) => {
        const {name} = e.target;
        setSelectedImage(name);
    }

    const renderInfo = () => {
        let array = [];
        const {
            carsLabels,
            buildingLabels,
            camerasLabels,
            notebooksLabels
        } = labels;

        switch (category) {
            case 'cars':
                const cars = [
                    {id: 1, label: carsLabels.year, value: year},
                    {id: 2, label: carsLabels.transmission, value: transmission},
                    {id: 3, label: carsLabels.type, value: type}
                ];
                array = [...cars];
                break;
            case 'buildings':
                const buildings = [
                    {id: 1, label: buildingLabels.type, value: type},
                    {id: 2, label: buildingLabels.square, value: square},
                    {id: 3, label: buildingLabels.room, value: room}
                ];
                array = [...buildings];
                break;
            case 'cameras':
                const cameras = [
                    {id: 1, label: camerasLabels.type, value: type},
                    {id: 2, label: camerasLabels.matrix, value: matrix},
                    {id: 3, label: camerasLabels.video, value: video}
                ];
                array = [...cameras];
                break;
            case 'notebooks':
                const notebooks = [
                    {id: 1, label: notebooksLabels.type, value: type},
                    {id: 2, label: notebooksLabels.ram, value: ram},
                    {id: 3, label: notebooksLabels.screenSize, value: screenSize}
                ];
                array = [...notebooks];
                break;
        }
        return (
            <>
                {
                    array.map(({id, label, value}) => {
                        return (
                            <div key={id} className={styles.info}>
                                <span className={styles.label}>{label}</span>
                                <span className={styles.infoText}>{value}</span>
                            </div>
                        )
                    })
                }
            </>
        )
    };

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalOverlay}/>
            <div className={styles.modalContentContainer}>
                <header className={styles.header}>
                    <div className={styles.date}>{formatDate(date)}</div>
                    <h2 className={styles.product}>{product.product}</h2>
                    <div className={styles.money}>{Number(money).toLocaleString()} &#x20bd;</div>
                    <button
                        type="button"
                        className={styles.modalIconClose}
                        onClick={closeModal}
                    />
                </header>
                <div className={styles.modalContent}>
                    <div className={styles.mapContainer}>
                        <div>
                            <img
                                name={selectedImage}
                                src={selectedImage}
                                alt={category}
                                className={styles.selectedImage}
                                onClick={(e) => changeImage(e)}
                            />
                        </div>
                        <div>
                            <div id='map' className={styles.map}/>
                            <div className={styles.addressContainer}>
                                <svg className={styles.iconMarker} version="1.1" baseProfile="tiny" id="Layer_1"
                                     x="0px" y="0px" width="42px" height="42px" viewBox="0 0 42 42">
                                    <path fillRule="evenodd" d="M33,13.924C33,6.893,27.594,1,20.51,1S8,6.897,8,13.93C8,16.25,8.324,18,9.423,20H9.402l10.695,20.621
	c0.402,0.551,0.824-0.032,0.824-0.032C20.56,41.13,31.616,20,31.616,20h-0.009C32.695,18,33,16.246,33,13.924z M14.751,13.528
	c0-3.317,2.579-6.004,5.759-6.004c3.179,0,5.76,2.687,5.76,6.004s-2.581,6.005-5.76,6.005C17.33,19.533,14.751,16.846,14.751,13.528
	z"
                                    />
                                </svg>
                                <div className={styles.address}>{address}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.imagesContainer}>
                        {
                            restImages ? restImages.map((path) => {
                                return (
                                    <div key={path}>
                                        <img
                                            name={path}
                                            src={path}
                                            alt={category}
                                            className={styles.image}
                                            onClick={(e) => changeImage(e)}
                                        />
                                    </div>
                                )
                            }) : null
                        }
                    </div>
                    <div className={styles.infoContainer}>
                        {category ? renderInfo() : null}
                    </div>
                    {
                        user ?
                            <div className={styles.seller}>
                                <span className={styles.label}>{labels.sellerLabel}</span>
                                <span className={styles.infoText}>{user.name}</span>
                            </div> : null
                    }
                    <div className={styles.description}>
                        <span className={styles.label}>{labels.descriptionLabel}</span>
                        <span className={styles.infoText}>{description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
