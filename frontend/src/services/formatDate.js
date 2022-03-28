export default function formatDate (stringDate) {

    const date = new Date (stringDate);
    const day = date.getDate();
    const month = parseInt(date.getMonth(),10) + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    
    return `${day}/${month}/${year} à ${hour}:${minutes}`
}