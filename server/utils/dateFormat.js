const moment = require('moment');

function formatTimestamp(timestamp) {
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
}

module.exports = formatTimestamp;