const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export const formatDate = (date) => {
    const year = new Date(date).getFullYear();
    let selectedMonths = new Date(date).getMonth();
    let day = new Date(date).getDate();
    return `${day} ${months[selectedMonths]} ${year} года`;
};