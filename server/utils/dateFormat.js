const moment = require('moment');

function formatTimestamp(timestamp) {
    return moment(timestamp).format('MMMM Do YYYY');
}

module.exports = formatTimestamp;