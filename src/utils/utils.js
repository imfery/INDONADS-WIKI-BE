function formatDate(date) {
    const d = new Date(date);

    const day = d.getDate().toString().padStart(2, '0');
    console.log("day -> ", day)
    const month = d.toLocaleString('en-GB', { month: 'short' });
    console.log("month -> ", month)
    const year = d.getFullYear();
    console.log("year -> ", year)

    return `${day} ${month} ${year}`;
}

module.exports = formatDate;
