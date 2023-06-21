export const getSelectedCheckbox = (target, types) => {
    const {id, name, checked} = target;
    const isElement = Number(id) in types;
    //Если включили чекбокс и элемента еще нет в объекте
    if (checked && !isElement) {
        return {...types, [Number(id)]: name};
    }
    //Если выключили чекбокс и элемент уже есть в объекте
    if (!checked && isElement) {
        const newBuildingsTypes = {...types};
        delete newBuildingsTypes[Number(id)];
        return {...newBuildingsTypes};
    }
};

export const getFilteredByTypeItems = (types, array) => {
    return ((types && types.length !== 0) ? array.filter((el) => {
        for (let type of types) {
            if (el.type === type) {
                return el;
            }
        }
    }) : array);
}
