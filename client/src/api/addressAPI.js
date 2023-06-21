import axios from 'axios';

export const addressAPI = {
    async getCoordinates(address) {
        const response = await axios.get(`https://geocode-maps.yandex.ru/1.x?format=json&apikey=ebaa8c00-e7d5-4dcc-9b62-dfbe3bf9f3cb&geocode=${address}&results=1`);
        return response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point;
    }
};
