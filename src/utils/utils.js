function formatDate(date) {
    const d = new Date(date);

    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-GB', { month: 'short' }).slice(0, 3);
    const year = d.getFullYear();

    return `${day} ${month} ${year}`;
}

function formatDateTime(date) {
    const d = new Date(date);

    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-GB', { month: 'short' }).slice(0, 3);
    const year = d.getFullYear();

    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');

    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
    formatDate,
    formatDateTime,
};
