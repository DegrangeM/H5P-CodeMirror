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
    }
}