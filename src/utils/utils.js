const convertToGMT7 = (date) => {
    if (!date) return null;
    const dateObj = new Date(date);
    const gmt7Offset = 7 * 60;
    const utcOffset = dateObj.getTimezoneOffset();
    return new Date(dateObj.getTime() + (gmt7Offset + utcOffset) * 60000);
};

function formatDate(date) {
    const d = convertToGMT7(date);

    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-GB', { month: 'short' }).slice(0, 3);
    const year = d.getFullYear();

    return `${day} ${month} ${year}`;
}

function formatDateTime(date) {
    const d = convertToGMT7(date);

    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-GB', { month: 'short' }).slice(0, 3);
    const year = d.getFullYear();

    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');

    return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}

function formatDateTimeOnly(date) {
    const d = convertToGMT7(date);

    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-GB', { month: 'short' }).slice(0, 3);
    const year = d.getFullYear();

    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year} ${hours}:${minutes}`;
}

module.exports = { formatDate, formatDateTime, formatDateTimeOnly };
