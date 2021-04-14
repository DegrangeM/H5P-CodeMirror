CodeMirror.H5P = {
    /*
        By default, when a content-type fetch the value of a text field,
        H5P apply some sanitization to avoid xss injection.
        This sanitization is only applied for content-type, so
        all the editor widget work with unsanitized values.
        This xss protection is annoying if you try to display a CodeMirror instance
        initialised with a text field value in a content-type because the CodeMirror
        will display the sanitized code instead of the real code itself.
        The CodeMirror.H5P.decode function allow you to decode the text field value
        to remove the sanitization. However this is not be enough if the text field
        value contains already sanitized string before sanitization (which might be
        the case in a library used to display code). This is due to the fact that
        H5P use the htmlspecialchars php function with the doubleEncode parameter
        set as false. This means that if your text field contains the following value
            document.body.innerHTML = "5x + 2 &gt; 0"
        it will be sanitized as :
            document.body.innerHTML = &quot;5x + 2 &gt; 0&quot;
        instead of :
            document.body.innerHTML = &quot;5x + 2 &amp;gt; 0&quot;
        This means that trying to decode this string you will get :
            document.body.innerHTML = "5x + 2 > 0"
        The solution is to apply the CodeMirror.H5P.encode function before saving
        data in the text field. That ways it will be correctly encoded (because it
        emulate the htmlspecialchars php function with the doubleEncode parameter set
        to true) and when H5P will try to sanitize the text field value it will change
        nothing as the string is already sanitized. Calling then CodeMirror.H5P.decode
        in the content-type will give the good value.
    */
    /**
     * Encode the str string. Emulate the htmlspecialchars php function
     * with the ENT_QUOTES flag and the doubleEncode parameter set to true
     * @param {string} str
     * @returns {string}
     */
    encode: function (str) { // adapted from https://github.com/locutusjs/locutus/blob/master/src/php/strings/htmlspecialchars.js
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#039;')
            .replace(/"/g, '&quot;');
    },
    /**
     * Decode the str string. Emulate the htmlspecialchars_decode
     * php function with the ENT_QUOTES flag 
     * @param {string} str
     * @returns {string}
     */
    decode: function (str) { // adapted from https://github.com/locutusjs/locutus/blob/master/src/php/strings/htmlspecialchars_decode.js
        return str.replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#0*39;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&');
    },
    /**
     * Allow to apply highlighting to some of the lines.
     * @param {CodeMirror} cm The instance of CodeMirror that will be highlighted
     * @param {string} str The lines to highlight. Separate lines by comma, use
     * hyphen to indicate range (e.g. 1,3,5-8)
     */
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