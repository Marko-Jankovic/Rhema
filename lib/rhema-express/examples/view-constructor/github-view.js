/**
 * Module dependencies.
 */

const https = require('https');
const path = require('path');
const extname = path.extname;

/**
 * Expose `GithubView`.
 */

module.exports = GithubView;

/**
 * Custom view that fetches and renders
 * remove github templates. You could
 * render templates from a database etc.
 */

function GithubView (name, options) {
    this.name = name;
    options = options || {};
    this.engine = options.engines[extname(name)];
    // "root" is the app.set('views') setting, however
    // in your own implementation you could ignore this
    this.path = `/${options.root}/master/${name}`;
}

/**
 * Render the view.
 */

GithubView.prototype.render = function (options, fn) {
    const self = this;
    const opts = {
        host: 'raw.githubusercontent.com',
        port: 443,
        path: this.path,
        method: 'GET'
    };

    https.request(opts, (res) => {
        let buf = '';
        res.setEncoding('utf8');
        res.on('data', (str) => {
            buf += str;
        });
        res.on('end', () => {
            self.engine(buf, options, fn);
        });
    }).end();
};
