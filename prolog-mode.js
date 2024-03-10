CodeMirror.defineMode("prolog", function(config) {
    var indentUnit = config.indentUnit;

    function wordRegexp(words) {
        return new RegExp("^(?:" + words.join("|") + ")\\b", "i");
    }

    var atoms = ["true", "false"];
    var builtins = [
        "write", "read", "nl", "fail", "repeat", "not",
        "var", "nonvar", "number", "atom", "integer", "float", "compound",
        "arg", "functor", "term_variables", "ground", "atomic", "compare",
        "sort", "keysort", "is", "=", "\\=", "==", "\\==", "@<", "@=<", "@>", "@>=",
        "var", "nonvar", "integer", "float", "number", "atomic", "compound"
    ];

    var keywords = ["if", "else", "while", "do", "true", "false", "cut", "fail"];

    var builtinsRegexp = wordRegexp(builtins);
    var atomsRegexp = wordRegexp(atoms);
    var keywordsRegexp = wordRegexp(keywords);

    return {
        startState: function() {
            return {
                inString: false,
                inComment: false
            };
        },
        token: function(stream, state) {
            // Handle Comments
            if (stream.match(/\/\*/)) {
                state.inComment = true;
                return "comment";
            }
            if (state.inComment) {
                if (stream.match(/\*\//)) {
                    state.inComment = false;
                    return "comment";
                }
                stream.next();
                return "comment";
            }

            // Handle Strings
            if (stream.match(/"/)) {
                state.inString = !state.inString;
                return "string";
            }
            if (state.inString) {
                stream.next();
                return "string";
            }

            // Handle Numbers
            if (stream.match(/\d+/)) {
                return "number";
            }

            // Handle Atoms
            if (stream.match(atomsRegexp)) {
                return "atom";
            }

            // Handle Built-ins
            if (stream.match(builtinsRegexp)) {
                return "builtin";
            }

            // Handle Keywords
            if (stream.match(keywordsRegexp)) {
                return "keyword";
            }

            // Handle Punctuation
            if (stream.match(/[.,;:(){}\[\]]/)) {
                return null;
            }

            // Handle Variables
            if (stream.match(/[A-Z_][a-zA-Z0-9_]*/)) {
                return "variable";
            }

            // Handle Operators
            if (stream.match(/[-+*/<>:=\\]+/)) {
                return "operator";
            }

            // Handle Whitespaces
            if (stream.match(/\s+/)) {
                return null;
            }

            // If no match, consume one character and move on
            stream.next();
            return null;
        },
        indent: function(state, textAfter) {
            if (state.inComment) {
                return CodeMirror.Pass;
            }
            var closing = textAfter && textAfter.charAt(0) == "}";
            return state.indent + (closing ? 0 : indentUnit);
        },
        electricChars: "{}",
        lineComment: "%"
    };
});

CodeMirror.defineMIME("text/x-prolog", "prolog");

