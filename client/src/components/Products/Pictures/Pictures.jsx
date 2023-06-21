import React, {Fragment} from 'react';
import cn from 'classnames';
import {formatDate} from '../../../helpers/formatDate';
import styles from './Pictures.module.css';

export function Pictures({products, onIconHeartClick, openModal}) {

    return products.map(element =>
        <Fragment key={element.id}>
            <div className={styles.imagesContainer}>
                <svg onClick={() => onIconHeartClick(element)} className={cn(styles.iconHeartOnImages,  {[styles.selectedIconHeartOnImages]: element.selected})} enableBackground="new 0 0 91 91" height="91px"
                     version="1.1"
                     viewBox="0 0 91 91" width="91px" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path
                            d="M64.666,30.208c-2.195-1.816-5.014-2.814-7.936-2.814c-3.375,0-6.642,1.342-8.962,3.686   c-0.417,0.422-0.808,0.875-1.175,1.367c-2.841-3.781-7.588-5.721-12.283-4.863c-3.896,0.707-6.959,2.848-9.098,6.359   c-3.018,4.957-3.265,9.738-0.73,14.211c1.355,2.393,3.113,4.725,5.375,7.129c4.143,4.404,9.047,8.584,15.434,13.15   c0.408,0.293,0.845,0.441,1.301,0.441c0.702,0,1.176-0.355,1.411-0.529c5.763-4.115,10.29-7.908,14.248-11.943   c2.21-2.252,4.718-5.02,6.552-8.477c0.786-1.477,1.682-3.465,1.629-5.736C70.314,37.302,68.375,33.271,64.666,30.208z    M65.801,46.331c-1.633,3.074-3.937,5.611-5.977,7.689c-3.66,3.732-7.845,7.264-13.238,11.158   c-5.869-4.246-10.412-8.145-14.252-12.229c-2.073-2.203-3.674-4.32-4.895-6.475c-1.933-3.41-1.718-6.832,0.678-10.764   c1.612-2.648,3.9-4.258,6.802-4.785c0.556-0.102,1.119-0.152,1.674-0.152c3.44,0,6.487,1.9,8.208,5.199l0.292,0.551   c0.3,0.563,0.918,0.883,1.528,0.898c0.639-0.012,1.216-0.377,1.497-0.951c0.604-1.232,1.263-2.188,2.067-3.002   c1.686-1.701,4.071-2.678,6.545-2.678c2.133,0,4.182,0.723,5.771,2.037c2.956,2.441,4.438,5.531,4.533,9.439   C67.067,43.741,66.43,45.147,65.801,46.331z"/>
                    </g>
                </svg>
                <img onClick={() => openModal(element)} className={styles.image} src={element.paths[0]} alt={element.category}/>
            </div>
            <div className={styles.descriptionContainer}>
                <span className={styles.caption}>{element.product}</span>
                <span className={styles.money}>{Number(element.money).toLocaleString()} &#x20bd;</span>
                <div className={styles.addressContainer}>
                    <svg className={styles.iconMarker} viewBox="0 0 42 42">
                        <path d="M33,13.924C33,6.893,27.594,1,20.51,1S8,6.897,8,13.93C8,16.25,8.324,18,9.423,20H9.402l10.695,20.621
	c0.402,0.551,0.824-0.032,0.824-0.032C20.56,41.13,31.616,20,31.616,20h-0.009C32.695,18,33,16.246,33,13.924z M14.751,13.528
	c0-3.317,2.579-6.004,5.759-6.004c3.179,0,5.76,2.687,5.76,6.004s-2.581,6.005-5.76,6.005C17.33,19.533,14.751,16.846,14.751,13.528
	z"/>
                    </svg>
                    <span className={styles.address}>{element.address}</span>
                </div>
                <span className={styles.date}>{formatDate(element.date)}</span>
            </div>
        </Fragment>
    )
}