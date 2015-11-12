var im = require('imagemagick'),
    meta = {
        '2#05': 'title',
        '2#09': 'urgency',
        '2#15': 'category',
        '2#20': 'supplementalCategory',
        '2#25': 'keywords',
        '2#40': 'instructions',
        '2#55': 'dateCreated',
        '2#80': 'author',
        '2#85': 'authorsPosition',
        '2#90': 'city',
        '2#95': 'state',
        '2#101': 'country',
        '2#103': 'transmissionReference',
        '2#105': 'headline',
        '2#110': 'credit',
        '2#115': 'source',
        '2#116': 'copyright',
        '2#120': 'description',
        '2#122': 'writer'
    };

function process(dataStr) {
    var metaKeys = Object.keys(meta);

    return dataStr
        .split('\n')
        .reduce(function (info, line) {
            metaKeys.some(function (key) {
                var idx = line.indexOf('=');
                if (line.indexOf(key + '#') === 0) {
                    info[meta[key]] = line.substr(idx + 1)
                        .replace(new RegExp('^"|"$', 'g'), '');
                    return true;
                }
                return false;
            });
            return info;
        }, {});
}

module.exports = {

    /**
     * Set path to the convert command.
     * @param {String} convertPath
     */
    setImageMagickConvertPath: function (convertPath) {
        im.convert.path = convertPath;
    },

    /**
     * Extract IPTC/XMP headers form file
     * @param {String} filePath Absolute image path
     * @param {Function} callback
     */
    extract: function extract(filePath, callback) {
        try {
            im.convert([filePath, 'IPTCTEXT:-'], function (err, data) {
                if (err) {
                    callback(null, {});
                }
                callback(null, process(data));
            });
        } catch (err) {
            callback(err);
        }
    }

};
