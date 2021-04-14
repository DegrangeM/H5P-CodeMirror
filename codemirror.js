CodeMirror.H5P = {
    encode: function (str) { // adapted from https://github.com/locutusjs/locutus/blob/master/src/php/strings/htmlspecialchars.js
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#039;')
            .replace(/"/g, '&quot;');
    },
    decode: function (str) { // adapted from https://github.com/locutusjs/locutus/blob/master/src/php/strings/htmlspecialchars_decode.js
        return str.replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#0*39;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&');
    },
    highlightLines: function (cm, str) {
        let lines = str.split(',');
        lines.forEach(function (l) {
            let match = l.trim().match('^([0-9]+)(?:-([0-9]+))?$');
            if (match) {
                if (typeof match[2] === 'undefined') {
                    cm.addLineClass(parseInt(match[1]), 'background', 'CodeMirror-highlightedline')
                } else {
                    let start = Math.min(match[1], match[2]);
                    let end = Math.max(match[1], match[2]);
                    for (let i = start; i <= end; i++) {
                        cm.addLineClass(i, 'background', 'CodeMirror-highlightedline')
                    }
                }
            }
        });
    }
}