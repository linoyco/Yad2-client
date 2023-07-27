import React from 'react';

import { Attractions } from '../types/attractions.types';
import { calculateDistance } from '../helpers/calculateDistance';

interface ItemProps {
    item: Attractions;
    myGeolocation: { x: number, y: number };
    favoritesList: number[];
    handleFavorites: (id: number) => void;
}

const Item: React.FC<ItemProps> = ({ item, myGeolocation, favoritesList, handleFavorites }) => {

    const titleAndContent = (title: string, content: string, custom?: any) => {
        return <div style={{ margin: '5px 10px' }}>
            <span style={{ fontWeight: 'bold' }}>{title}</span>
            {custom ? custom : <span>{content}</span>}
        </div>
    }

    const isFavorite = favoritesList.find((id) => id === item.id);

    return (
        <div dir='rtl' style={{ border: '2px solid #CD95DE', borderRadius: '10px', width: '350px', margin: '10px' }}>
            {titleAndContent('מזהה: ', `${item.id}`)}
            {titleAndContent('שם: ', item.name)}
            {titleAndContent('כתובת: ', item.address)}
            {titleAndContent('קישור: ', item.link, <a href={item.link} target='_blank' style={{ fontWeight: 'bold', color: '#CD95DE' }}>לחץ למעבר לאתר</a>)}
            {titleAndContent('שעות פתיחה: ', item.openingHours)}
            {titleAndContent('מרחק: ', `${calculateDistance(myGeolocation.y, myGeolocation.x, item.y, item.x)} ק"מ`)}
            {titleAndContent('מועדפים: ', '', <span style={{ cursor: 'pointer', color: '#CD95DE', fontWeight: 'bold' }} onClick={() => handleFavorites(item.id)}>{!!isFavorite ? ' נשמר במועדפים❤️ לחץ להסרה' : 'הוספה למועדפים 🤍'}</span>)}
        </div>
    )
}

export default Item;