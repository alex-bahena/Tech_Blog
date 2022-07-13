module.exports = {
    getMonthName(month) {
        return month === 1 ? 'January'
            : month === 2 ? 'Febrary'
                : month === 3 ? 'March'
                    : month === 4 ? 'April'
                        : month === 5 ? 'May'
                            : month === 6 ? 'June'
                                : month === 7 ? 'July'
                                    : month === 8 ? 'August'
                                        : month === 9 ? 'September'
                                            : month === 10 ? 'October'
                                                : month === 11 ? 'November'
                                                    : 'December'
    },
    format_time(date) {
        return date.toLocaleTimeString();
    },
    format_date(date) {
        return `${module.exports.getMonthName(new Date(date).getMonth() + 1)} ${new Date(date).getDate()}, ${new Date(date).getFullYear()}`;
    },
};
