import React, {useState} from 'react';
import {Header} from './Header/Header';
import {Filter} from './Search/Filter';
import {Products} from './Products/Products';
import {ModalInformation} from './modals/ModalInformation';
import './App.css';

export function App() {
    const [selectedFilters, setSelectedFilters] = useState({
        category: '',
        money: null,
    });
    const [isOpen, setIsOpenModal] = useState(false);
    const [product, setProduct] = useState(null);

    //Значения фильтров
    const getFilters = (newFilters) => {
        setSelectedFilters(newFilters);
    };

    const openModal = (element) => {
        setProduct(element);
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    }

    return (
        <div className='main'>
            <Header/>
            <div className='container'>
                <Filter getFilters={getFilters}/>
                <Products filters={selectedFilters} openModal={openModal}/>
            </div>
            {
                isOpen ?
                    <ModalInformation product={product} closeModal={closeModal}/>
                    : null
            }
        </div>
    );
}
