'use strict';

const beatle = require('@rhema/beatle');

// it will be triggered for every logger message;
module.exports = (options) => {
    return (data) => {
        if (!options.blackList.includes(data.title.toLowerCase())) {
            // attach each message to syslog
            beatle.set('syslog', {
                [data.title.toLowerCase()]: data.message
            });
        }
    };
};
