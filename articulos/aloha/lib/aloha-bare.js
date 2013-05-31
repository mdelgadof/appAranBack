/*!
 * This file is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */;(function() {
/*
    http://www.JSON.org/json2.js
    2011-02-23

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist.
var JSON;
if (!JSON) {
	JSON = {};
}

(function () {
	

	function f(n) {
		// Format integers to have at least two digits.
		return n < 10 ? '0' + n : n;
	}

	if (typeof Date.prototype.toJSON !== 'function') {

		Date.prototype.toJSON = function (key) {

			return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
		};

		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
			return this.valueOf();
		};
	}

	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		gap,
		indent,
		meta = { // table of character substitutions
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'"': '\\"',
			'\\': '\\\\'
		},
		rep;


	function quote(string) {

		// If the string contains no control characters, no quote characters, and no
		// backslash characters, then we can safely slap some quotes around it.
		// Otherwise we must also replace the offending characters with safe escape
		// sequences.

		escapable.lastIndex = 0;
		return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
			var c = meta[a];
			return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		}) + '"' : '"' + string + '"';
	}


	function str(key, holder) {

		// Produce a string from holder[key].

		var i, // The loop counter.
		k, // The member key.
		v, // The member value.
		length,
		mind = gap,
			partial,
			value = holder[key];

		// If the value has a toJSON method, call it to obtain a replacement value.

		if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
			value = value.toJSON(key);
		}

		// If we were called with a replacer function, then call the replacer to
		// obtain a replacement value.

		if (typeof rep === 'function') {
			value = rep.call(holder, key, value);
		}

		// What happens next depends on the value's type.

		switch (typeof value) {
		case 'string':
			return quote(value);

		case 'number':

			// JSON numbers must be finite. Encode non-finite numbers as null.

			return isFinite(value) ? String(value) : 'null';

		case 'boolean':
		case 'null':

			// If the value is a boolean or null, convert it to a string. Note:
			// typeof null does not produce 'null'. The case is included here in
			// the remote chance that this gets fixed someday.

			return String(value);

			// If the type is 'object', we might be dealing with an object or an array or
			// null.

		case 'object':

			// Due to a specification blunder in ECMAScript, typeof null is 'object',
			// so watch out for that case.

			if (!value) {
				return 'null';
			}

			// Make an array to hold the partial results of stringifying this object value.

			gap += indent;
			partial = [];

			// Is the value an array?

			if (Object.prototype.toString.apply(value) === '[object Array]') {

				// The value is an array. Stringify every element. Use null as a placeholder
				// for non-JSON values.

				length = value.length;
				for (i = 0; i < length; i += 1) {
					partial[i] = str(i, value) || 'null';
				}

				// Join all of the elements together, separated with commas, and wrap them in
				// brackets.

				v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
				gap = mind;
				return v;
			}

			// If the replacer is an array, use it to select the members to be stringified.

			if (rep && typeof rep === 'object') {
				length = rep.length;
				for (i = 0; i < length; i += 1) {
					if (typeof rep[i] === 'string') {
						k = rep[i];
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			} else {

				// Otherwise, iterate through all of the keys in the object.

				for (k in value) {
					if (Object.prototype.hasOwnProperty.call(value, k)) {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			}

			// Join all of the member texts together, separated with commas,
			// and wrap them in braces.

			v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
			gap = mind;
			return v;
		}
	}

	// If the JSON object does not yet have a stringify method, give it one.

	if (typeof JSON.stringify !== 'function') {
		JSON.stringify = function (value, replacer, space) {

			// The stringify method takes a value and an optional replacer, and an optional
			// space parameter, and returns a JSON text. The replacer can be a function
			// that can replace values, or an array of strings that will select the keys.
			// A default replacer method can be provided. Use of the space parameter can
			// produce text that is more easily readable.

			var i;
			gap = '';
			indent = '';

			// If the space parameter is a number, make an indent string containing that
			// many spaces.

			if (typeof space === 'number') {
				for (i = 0; i < space; i += 1) {
					indent += ' ';
				}

				// If the space parameter is a string, it will be used as the indent string.

			} else if (typeof space === 'string') {
				indent = space;
			}

			// If there is a replacer, it must be a function or an array.
			// Otherwise, throw an error.

			rep = replacer;
			if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
				throw new Error('JSON.stringify');
			}

			// Make a fake root object containing our value under the key of ''.
			// Return the result of stringifying the value.

			return str('', {
				'': value
			});
		};
	}


	// If the JSON object does not yet have a parse method, give it one.

	if (typeof JSON.parse !== 'function') {
		JSON.parse = function (text, reviver) {

			// The parse method takes a text and an optional reviver function, and returns
			// a JavaScript value if the text is a valid JSON text.

			var j;

			function walk(holder, key) {

				// The walk method is used to recursively walk the resulting structure so
				// that modifications can be made.

				var k, v, value = holder[key];
				if (value && typeof value === 'object') {
					for (k in value) {
						if (Object.prototype.hasOwnProperty.call(value, k)) {
							v = walk(value, k);
							if (v !== undefined) {
								value[k] = v;
							} else {
								delete value[k];
							}
						}
					}
				}
				return reviver.call(holder, key, value);
			}


			// Parsing happens in four stages. In the first stage, we replace certain
			// Unicode characters with escape sequences. JavaScript handles many characters
			// incorrectly, either silently deleting them, or treating them as line endings.

			text = String(text);
			cx.lastIndex = 0;
			if (cx.test(text)) {
				text = text.replace(cx, function (a) {
					return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				});
			}

			// In the second stage, we run the text against regular expressions that look
			// for non-JSON patterns. We are especially concerned with '()' and 'new'
			// because they can cause invocation, and '=' because it can cause mutation.
			// But just to be safe, we want to reject all unexpected forms.

			// We split the second stage into 4 regexp operations in order to work around
			// crippling inefficiencies in IE's and Safari's regexp engines. First we
			// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
			// replace all simple value tokens with ']' characters. Third, we delete all
			// open brackets that follow a colon or comma or that begin the text. Finally,
			// we look to see that the remaining characters are only whitespace or ']' or
			// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

			if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

				// In the third stage we use the eval function to compile the text into a
				// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
				// in JavaScript: it can begin a block or an object literal. We wrap the text
				// in parens to eliminate the ambiguity.

				j = eval('(' + text + ')');

				// In the optional fourth stage, we recursively walk the new structure, passing
				// each name/value pair to a reviver function for possible transformation.

				return typeof reviver === 'function' ? walk({
					'': j
				}, '') : j;
			}

			// If the text is not JSON parseable, then a SyntaxError is thrown.

			throw new SyntaxError('JSON.parse');
		};
	}
}());

define('util/json2', [], function () {
	return JSON;
});

/**
 * @license Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Copyright 2011, Tim Down
 * Licensed under the MIT license.
 * Version: 1.2.1
 * Build date: 8 October 2011
 */
(function () {
	var rangy = (function () {


		var OBJECT = "object",
			FUNCTION = "function",
			UNDEFINED = "undefined";

		var domRangeProperties = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer", "START_TO_START", "START_TO_END", "END_TO_START", "END_TO_END"];

		var domRangeMethods = ["setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore", "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents", "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach"];

		var textRangeProperties = ["boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text"];

		// Subset of TextRange's full set of methods that we're interested in
		var textRangeMethods = ["collapse", "compareEndPoints", "duplicate", "getBookmark", "moveToBookmark", "moveToElementText", "parentElement", "pasteHTML", "select", "setEndPoint", "getBoundingClientRect"];

		/*----------------------------------------------------------------------------------------------------------------*/

		// Trio of functions taken from Peter Michaux's article:
		// http://peter.michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
		function isHostMethod(o, p) {
			var t = typeof o[p];
			return t == FUNCTION || ( !! (t == OBJECT && o[p])) || t == "unknown";
		}

		function isHostObject(o, p) {
			return !!(typeof o[p] == OBJECT && o[p]);
		}

		function isHostProperty(o, p) {
			return typeof o[p] != UNDEFINED;
		}

		// Creates a convenience function to save verbose repeated calls to tests functions
		function createMultiplePropertyTest(testFunc) {
			return function (o, props) {
				var i = props.length;
				while (i--) {
					if (!testFunc(o, props[i])) {
						return false;
					}
				}
				return true;
			};
		}

		// Next trio of functions are a convenience to save verbose repeated calls to previous two functions
		var areHostMethods = createMultiplePropertyTest(isHostMethod);
		var areHostObjects = createMultiplePropertyTest(isHostObject);
		var areHostProperties = createMultiplePropertyTest(isHostProperty);

		function isTextRange(range) {
			return range && areHostMethods(range, textRangeMethods) && areHostProperties(range, textRangeProperties);
		}

		var api = {
			version: "1.2.1",
			initialized: false,
			supported: true,

			util: {
				isHostMethod: isHostMethod,
				isHostObject: isHostObject,
				isHostProperty: isHostProperty,
				areHostMethods: areHostMethods,
				areHostObjects: areHostObjects,
				areHostProperties: areHostProperties,
				isTextRange: isTextRange
			},

			features: {},

			modules: {},
			config: {
				alertOnWarn: false,
				// Note: this was set to true, see issue https://github.com/alohaeditor/Aloha-Editor/issues/474
				preferTextRange: true
			}
		};

		function fail(reason) {
			window.alert("Rangy not supported in your browser. Reason: " + reason);
			api.initialized = true;
			api.supported = false;
		}

		api.fail = fail;

		function warn(msg) {
			var warningMessage = "Rangy warning: " + msg;
			if (api.config.alertOnWarn) {
				window.alert(warningMessage);
			} else if (typeof window.console != UNDEFINED && typeof window.console.log != UNDEFINED) {
				window.console.log(warningMessage);
			}
		}

		api.warn = warn;

		if ({}.hasOwnProperty) {
			api.util.extend = function (o, props) {
				for (var i in props) {
					if (props.hasOwnProperty(i)) {
						o[i] = props[i];
					}
				}
			};
		} else {
			fail("hasOwnProperty not supported");
		}

		var initListeners = [];
		var moduleInitializers = [];

		// Initialization
		function init() {
			if (api.initialized) {
				return;
			}
			var testRange;
			var implementsDomRange = false,
				implementsTextRange = false;

			// First, perform basic feature tests

			if (isHostMethod(document, "createRange")) {
				testRange = document.createRange();
				if (areHostMethods(testRange, domRangeMethods) && areHostProperties(testRange, domRangeProperties)) {
					implementsDomRange = true;
				}
				testRange.detach();
			}

			var body = isHostObject(document, "body") ? document.body : document.getElementsByTagName("body")[0];

			if (body && isHostMethod(body, "createTextRange")) {
				testRange = body.createTextRange();
				if (isTextRange(testRange)) {
					implementsTextRange = true;
				}
			}

			if (!implementsDomRange && !implementsTextRange) {
				fail("Neither Range nor TextRange are implemented");
			}

			api.initialized = true;
			api.features = {
				implementsDomRange: implementsDomRange,
				implementsTextRange: implementsTextRange
			};

			// Initialize modules and call init listeners
			var allListeners = moduleInitializers.concat(initListeners);
			for (var i = 0, len = allListeners.length; i < len; ++i) {
				try {
					allListeners[i](api);
				} catch (ex) {
					if (isHostObject(window, "console") && isHostMethod(window.console, "log")) {
						window.console.log("Init listener threw an exception. Continuing.", ex);
					}

				}
			}
		}

		// Allow external scripts to initialize this library in case it's loaded after the document has loaded
		api.init = init;

		// Execute listener immediately if already initialized
		api.addInitListener = function (listener) {
			if (api.initialized) {
				listener(api);
			} else {
				initListeners.push(listener);
			}
		};

		var createMissingNativeApiListeners = [];

		api.addCreateMissingNativeApiListener = function (listener) {
			createMissingNativeApiListeners.push(listener);
		};

		function createMissingNativeApi(win) {
			win = win || window;
			init();

			// Notify listeners
			for (var i = 0, len = createMissingNativeApiListeners.length; i < len; ++i) {
				createMissingNativeApiListeners[i](win);
			}
		}

		api.createMissingNativeApi = createMissingNativeApi;

		/**
		 * @constructor
		 */
		function Module(name) {
			this.name = name;
			this.initialized = false;
			this.supported = false;
		}

		Module.prototype.fail = function (reason) {
			this.initialized = true;
			this.supported = false;

			throw new Error("Module '" + this.name + "' failed to load: " + reason);
		};

		Module.prototype.warn = function (msg) {
			api.warn("Module " + this.name + ": " + msg);
		};

		Module.prototype.createError = function (msg) {
			return new Error("Error in Rangy " + this.name + " module: " + msg);
		};

		api.createModule = function (name, initFunc) {
			var module = new Module(name);
			api.modules[name] = module;

			moduleInitializers.push(function (api) {
				initFunc(api, module);
				module.initialized = true;
				module.supported = true;
			});
		};

		api.requireModules = function (modules) {
			for (var i = 0, len = modules.length, module, moduleName; i < len; ++i) {
				moduleName = modules[i];
				module = api.modules[moduleName];
				if (!module || !(module instanceof Module)) {
					throw new Error("Module '" + moduleName + "' not found");
				}
				if (!module.supported) {
					throw new Error("Module '" + moduleName + "' not supported");
				}
			}
		};

		/*----------------------------------------------------------------------------------------------------------------*/

		// Wait for document to load before running tests

		var docReady = false;

		var loadHandler = function (e) {

			if (!docReady) {
				docReady = true;
				if (!api.initialized) {
					init();
				}
			}
		};

		// Test whether we have window and document objects that we will need
		if (typeof window == UNDEFINED) {
			fail("No window found");
			return;
		}
		if (typeof document == UNDEFINED) {
			fail("No document found");
			return;
		}

		if (isHostMethod(document, "addEventListener")) {
			document.addEventListener("DOMContentLoaded", loadHandler, false);
		}

		// Add a fallback in case the DOMContentLoaded event isn't supported
		if (isHostMethod(window, "addEventListener")) {
			window.addEventListener("load", loadHandler, false);
		} else if (isHostMethod(window, "attachEvent")) {
			window.attachEvent("onload", loadHandler);
		} else {
			fail("Window does not have required addEventListener or attachEvent method");
		}

		return api;
	})();
	rangy.createModule("DomUtil", function (api, module) {

		var UNDEF = "undefined";
		var util = api.util;

		// Perform feature tests
		if (!util.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"])) {
			module.fail("document missing a Node creation method");
		}

		if (!util.isHostMethod(document, "getElementsByTagName")) {
			module.fail("document missing getElementsByTagName method");
		}

		var el = document.createElement("div");
		if (!util.areHostMethods(el, ["insertBefore", "appendChild", "cloneNode"] || !util.areHostObjects(el, ["previousSibling", "nextSibling", "childNodes", "parentNode"]))) {
			module.fail("Incomplete Element implementation");
		}

		// innerHTML is required for Range's createContextualFragment method
		if (!util.isHostProperty(el, "innerHTML")) {
			module.fail("Element is missing innerHTML property");
		}

		var textNode = document.createTextNode("test");
		if (!util.areHostMethods(textNode, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"] || !util.areHostObjects(el, ["previousSibling", "nextSibling", "childNodes", "parentNode"]) || !util.areHostProperties(textNode, ["data"]))) {
			module.fail("Incomplete Text Node implementation");
		}

		/*----------------------------------------------------------------------------------------------------------------*/

		// Removed use of indexOf because of a bizarre bug in Opera that is thrown in one of the Acid3 tests. I haven't been
		// able to replicate it outside of the test. The bug is that indexOf returns -1 when called on an Array that
		// contains just the document as a single element and the value searched for is the document.
		var arrayContains =
		/*Array.prototype.indexOf ?
        function(arr, val) {
            return arr.indexOf(val) > -1;
        }:*/

			function (arr, val) {
				var i = arr.length;
				while (i--) {
					if (arr[i] === val) {
						return true;
					}
				}
				return false;
			};

		// Opera 11 puts HTML elements in the null namespace, it seems, and IE 7 has undefined namespaceURI
		function isHtmlNamespace(node) {
			var ns;
			return typeof node.namespaceURI == UNDEF || ((ns = node.namespaceURI) === null || ns == "http://www.w3.org/1999/xhtml");
		}

		function parentElement(node) {
			var parent = node.parentNode;
			return (parent.nodeType == 1) ? parent : null;
		}

		function getNodeIndex(node) {
			var i = 0;
			while ((node = node.previousSibling)) {
				i++;
			}
			return i;
		}

		function getNodeLength(node) {
			var childNodes;
			return isCharacterDataNode(node) ? node.length : ((childNodes = node.childNodes) ? childNodes.length : 0);
		}

		function getCommonAncestor(node1, node2) {
			var ancestors = [],
				n;
			for (n = node1; n; n = n.parentNode) {
				ancestors.push(n);
			}

			for (n = node2; n; n = n.parentNode) {
				if (arrayContains(ancestors, n)) {
					return n;
				}
			}

			return null;
		}

		function isAncestorOf(ancestor, descendant, selfIsAncestor) {
			var n = selfIsAncestor ? descendant : descendant.parentNode;
			while (n) {
				if (n === ancestor) {
					return true;
				} else {
					n = n.parentNode;
				}
			}
			return false;
		}

		function getClosestAncestorIn(node, ancestor, selfIsAncestor) {
			var p, n = selfIsAncestor ? node : node.parentNode;
			while (n) {
				p = n.parentNode;
				if (p === ancestor) {
					return n;
				}
				n = p;
			}
			return null;
		}

		function isCharacterDataNode(node) {
			var t = node.nodeType;
			return t == 3 || t == 4 || t == 8; // Text, CDataSection or Comment
		}

		function insertAfter(node, precedingNode) {
			var nextNode = precedingNode.nextSibling,
				parent = precedingNode.parentNode;
			if (nextNode) {
				parent.insertBefore(node, nextNode);
			} else {
				parent.appendChild(node);
			}
			return node;
		}

		// Note that we cannot use splitText() because it is bugridden in IE 9.
		function splitDataNode(node, index) {
			var newNode = node.cloneNode(false);
			newNode.deleteData(0, index);
			node.deleteData(index, node.length - index);
			insertAfter(newNode, node);
			return newNode;
		}

		function getDocument(node) {
			if (node.nodeType == 9) {
				return node;
			} else if (typeof node.ownerDocument != UNDEF) {
				return node.ownerDocument;
			} else if (typeof node.document != UNDEF) {
				return node.document;
			} else if (node.parentNode) {
				return getDocument(node.parentNode);
			} else {
				throw new Error("getDocument: no document found for node");
			}
		}

		function getWindow(node) {
			var doc = getDocument(node);
			if (typeof doc.defaultView != UNDEF) {
				return doc.defaultView;
			} else if (typeof doc.parentWindow != UNDEF) {
				return doc.parentWindow;
			} else {
				throw new Error("Cannot get a window object for node");
			}
		}

		function getIframeDocument(iframeEl) {
			if (typeof iframeEl.contentDocument != UNDEF) {
				return iframeEl.contentDocument;
			} else if (typeof iframeEl.contentWindow != UNDEF) {
				return iframeEl.contentWindow.document;
			} else {
				throw new Error("getIframeWindow: No Document object found for iframe element");
			}
		}

		function getIframeWindow(iframeEl) {
			if (typeof iframeEl.contentWindow != UNDEF) {
				return iframeEl.contentWindow;
			} else if (typeof iframeEl.contentDocument != UNDEF) {
				return iframeEl.contentDocument.defaultView;
			} else {
				throw new Error("getIframeWindow: No Window object found for iframe element");
			}
		}

		function getBody(doc) {
			return util.isHostObject(doc, "body") ? doc.body : doc.getElementsByTagName("body")[0];
		}

		function getRootContainer(node) {
			var parent;
			while ((parent = node.parentNode)) {
				node = parent;
			}
			return node;
		}

		/**
		 * This is a very ugly workaround for an IE9 issue Before comparing DOM
		 * elements "normalize" them. There are cases, where anchorNode and
		 * focusNode in a nativeselection point to DOM elements with same
		 * parentNode, same previousSibling and same nextSibling, but the nodes
		 * themselves are not the same
		 * If such nodes are compared in the comparePoints method, an error occurs.
		 * To fix this, we move to the previousSibling/nextSibling/parentNode and back, to hopefully get
		 * the "correct" node in the DOM
		 * @param node node to fix
		 * @return normalized node
		 */
		function fixNode(node) {
			if (!node) {
				return;
			}
			if (node.previousSibling) {
				return node.previousSibling.nextSibling;
			} else if (node.nextSibling) {
				return node.nextSibling.previousSibling;
			} else if (node.parentNode) {
				return node.parentNode.firstChild;
			} else {
				return node;
			}
		}

		function comparePoints(nodeA, offsetA, nodeB, offsetB) {
			// fix the nodes before comparing them
			nodeA = fixNode(nodeA);
			nodeB = fixNode(nodeB);
			// See http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Comparing
			var nodeC, root, childA, childB, n;
			if (nodeA == nodeB) {

				// Case 1: nodes are the same
				return offsetA === offsetB ? 0 : (offsetA < offsetB) ? -1 : 1;
			} else if ((nodeC = getClosestAncestorIn(nodeB, nodeA, true))) {

				// Case 2: node C (container B or an ancestor) is a child node of A
				return offsetA <= getNodeIndex(nodeC) ? -1 : 1;
			} else if ((nodeC = getClosestAncestorIn(nodeA, nodeB, true))) {

				// Case 3: node C (container A or an ancestor) is a child node of B
				return getNodeIndex(nodeC) < offsetB ? -1 : 1;
			} else {

				// Case 4: containers are siblings or descendants of siblings
				root = getCommonAncestor(nodeA, nodeB);
				childA = (nodeA === root) ? root : getClosestAncestorIn(nodeA, root, true);
				childB = (nodeB === root) ? root : getClosestAncestorIn(nodeB, root, true);

				if (childA === childB) {
					// This shouldn't be possible

					throw new Error("comparePoints got to case 4 and childA and childB are the same!");
				} else {
					n = root.firstChild;
					while (n) {
						if (n === childA) {
							return -1;
						} else if (n === childB) {
							return 1;
						}
						n = n.nextSibling;
					}
					throw new Error("Should not be here!");
				}
			}
		}

		function fragmentFromNodeChildren(node) {
			var fragment = getDocument(node).createDocumentFragment(),
				child;
			while ((child = node.firstChild)) {
				fragment.appendChild(child);
			}
			return fragment;
		}

		function inspectNode(node) {
			if (!node) {
				return "[No node]";
			}
			if (isCharacterDataNode(node)) {
				return '"' + node.data + '"';
			} else if (node.nodeType == 1) {
				var idAttr = node.id ? ' id="' + node.id + '"' : "";
				return "<" + node.nodeName + idAttr + ">[" + node.childNodes.length + "]";
			} else {
				return node.nodeName;
			}
		}

		/**
		 * @constructor
		 */
		function NodeIterator(root) {
			this.root = root;
			this._next = root;
		}

		NodeIterator.prototype = {
			_current: null,

			hasNext: function () {
				return !!this._next;
			},

			next: function () {
				var n = this._current = this._next;
				var child, next;
				if (this._current) {
					child = n.firstChild;
					if (child) {
						this._next = child;
					} else {
						next = null;
						while ((n !== this.root) && !(next = n.nextSibling)) {
							n = n.parentNode;
						}
						this._next = next;
					}
				}
				return this._current;
			},

			detach: function () {
				this._current = this._next = this.root = null;
			}
		};

		function createIterator(root) {
			return new NodeIterator(root);
		}

		/**
		 * @constructor
		 */
		function DomPosition(node, offset) {
			this.node = node;
			this.offset = offset;
		}

		DomPosition.prototype = {
			equals: function (pos) {
				return this.node === pos.node & this.offset == pos.offset;
			},

			inspect: function () {
				return "[DomPosition(" + inspectNode(this.node) + ":" + this.offset + ")]";
			}
		};

		/**
		 * @constructor
		 */
		function DOMException(codeName) {
			this.code = this[codeName];
			this.codeName = codeName;
			this.message = "DOMException: " + this.codeName;
		}

		DOMException.prototype = {
			INDEX_SIZE_ERR: 1,
			HIERARCHY_REQUEST_ERR: 3,
			WRONG_DOCUMENT_ERR: 4,
			NO_MODIFICATION_ALLOWED_ERR: 7,
			NOT_FOUND_ERR: 8,
			NOT_SUPPORTED_ERR: 9,
			INVALID_STATE_ERR: 11
		};

		DOMException.prototype.toString = function () {
			return this.message;
		};

		api.dom = {
			arrayContains: arrayContains,
			isHtmlNamespace: isHtmlNamespace,
			parentElement: parentElement,
			getNodeIndex: getNodeIndex,
			getNodeLength: getNodeLength,
			getCommonAncestor: getCommonAncestor,
			isAncestorOf: isAncestorOf,
			getClosestAncestorIn: getClosestAncestorIn,
			isCharacterDataNode: isCharacterDataNode,
			insertAfter: insertAfter,
			splitDataNode: splitDataNode,
			getDocument: getDocument,
			getWindow: getWindow,
			getIframeWindow: getIframeWindow,
			getIframeDocument: getIframeDocument,
			getBody: getBody,
			getRootContainer: getRootContainer,
			comparePoints: comparePoints,
			inspectNode: inspectNode,
			fragmentFromNodeChildren: fragmentFromNodeChildren,
			createIterator: createIterator,
			DomPosition: DomPosition
		};

		api.DOMException = DOMException;
	});
	rangy.createModule("DomRange", function (api, module) {
		api.requireModules(["DomUtil"]);


		var dom = api.dom;
		var DomPosition = dom.DomPosition;
		var DOMException = api.DOMException;

		/*----------------------------------------------------------------------------------------------------------------*/

		// Utility functions

		function isNonTextPartiallySelected(node, range) {
			return (node.nodeType != 3) && (dom.isAncestorOf(node, range.startContainer, true) || dom.isAncestorOf(node, range.endContainer, true));
		}

		function getRangeDocument(range) {
			return dom.getDocument(range.startContainer);
		}

		function dispatchEvent(range, type, args) {
			var listeners = range._listeners[type];
			if (listeners) {
				for (var i = 0, len = listeners.length; i < len; ++i) {
					listeners[i].call(range, {
						target: range,
						args: args
					});
				}
			}
		}

		function getBoundaryBeforeNode(node) {
			return new DomPosition(node.parentNode, dom.getNodeIndex(node));
		}

		function getBoundaryAfterNode(node) {
			return new DomPosition(node.parentNode, dom.getNodeIndex(node) + 1);
		}

		function insertNodeAtPosition(node, n, o) {
			var firstNodeInserted = node.nodeType == 11 ? node.firstChild : node;
			if (dom.isCharacterDataNode(n)) {
				if (o == n.length) {
					dom.insertAfter(node, n);
				} else {
					n.parentNode.insertBefore(node, o == 0 ? n : dom.splitDataNode(n, o));
				}
			} else if (o >= n.childNodes.length) {
				n.appendChild(node);
			} else {
				n.insertBefore(node, n.childNodes[o]);
			}
			return firstNodeInserted;
		}

		function cloneSubtree(iterator) {
			var partiallySelected;
			for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next();) {
				partiallySelected = iterator.isPartiallySelectedSubtree();

				node = node.cloneNode(!partiallySelected);
				if (partiallySelected) {
					subIterator = iterator.getSubtreeIterator();
					node.appendChild(cloneSubtree(subIterator));
					subIterator.detach(true);
				}

				if (node.nodeType == 10) { // DocumentType
					throw new DOMException("HIERARCHY_REQUEST_ERR");
				}
				frag.appendChild(node);
			}
			return frag;
		}

		function iterateSubtree(rangeIterator, func, iteratorState) {
			var it, n;
			iteratorState = iteratorState || {
				stop: false
			};
			for (var node, subRangeIterator; node = rangeIterator.next();) {
				//log.debug("iterateSubtree, partially selected: " + rangeIterator.isPartiallySelectedSubtree(), nodeToString(node));
				if (rangeIterator.isPartiallySelectedSubtree()) {
					// The node is partially selected by the Range, so we can use a new RangeIterator on the portion of the
					// node selected by the Range.
					if (func(node) === false) {
						iteratorState.stop = true;
						return;
					} else {
						subRangeIterator = rangeIterator.getSubtreeIterator();
						iterateSubtree(subRangeIterator, func, iteratorState);
						subRangeIterator.detach(true);
						if (iteratorState.stop) {
							return;
						}
					}
				} else {
					// The whole node is selected, so we can use efficient DOM iteration to iterate over the node and its
					// descendant
					it = dom.createIterator(node);
					while ((n = it.next())) {
						if (func(n) === false) {
							iteratorState.stop = true;
							return;
						}
					}
				}
			}
		}

		function deleteSubtree(iterator) {
			var subIterator;
			while (iterator.next()) {
				if (iterator.isPartiallySelectedSubtree()) {
					subIterator = iterator.getSubtreeIterator();
					deleteSubtree(subIterator);
					subIterator.detach(true);
				} else {
					iterator.remove();
				}
			}
		}

		function extractSubtree(iterator) {

			for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next();) {


				if (iterator.isPartiallySelectedSubtree()) {
					node = node.cloneNode(false);
					subIterator = iterator.getSubtreeIterator();
					node.appendChild(extractSubtree(subIterator));
					subIterator.detach(true);
				} else {
					iterator.remove();
				}
				if (node.nodeType == 10) { // DocumentType
					throw new DOMException("HIERARCHY_REQUEST_ERR");
				}
				frag.appendChild(node);
			}
			return frag;
		}

		function getNodesInRange(range, nodeTypes, filter) {
			//log.info("getNodesInRange, " + nodeTypes.join(","));
			var filterNodeTypes = !! (nodeTypes && nodeTypes.length),
				regex;
			var filterExists = !! filter;
			if (filterNodeTypes) {
				regex = new RegExp("^(" + nodeTypes.join("|") + ")$");
			}

			var nodes = [];
			iterateSubtree(new RangeIterator(range, false), function (node) {
				if ((!filterNodeTypes || regex.test(node.nodeType)) && (!filterExists || filter(node))) {
					nodes.push(node);
				}
			});
			return nodes;
		}

		function inspect(range) {
			var name = (typeof range.getName == "undefined") ? "Range" : range.getName();
			return "[" + name + "(" + dom.inspectNode(range.startContainer) + ":" + range.startOffset + ", " + dom.inspectNode(range.endContainer) + ":" + range.endOffset + ")]";
		}

		/*----------------------------------------------------------------------------------------------------------------*/

		// RangeIterator code partially borrows from IERange by Tim Ryan (http://github.com/timcameronryan/IERange)

		/**
		 * @constructor
		 */
		function RangeIterator(range, clonePartiallySelectedTextNodes) {
			this.range = range;
			this.clonePartiallySelectedTextNodes = clonePartiallySelectedTextNodes;



			if (!range.collapsed) {
				this.sc = range.startContainer;
				this.so = range.startOffset;
				this.ec = range.endContainer;
				this.eo = range.endOffset;
				var root = range.commonAncestorContainer;

				if (this.sc === this.ec && dom.isCharacterDataNode(this.sc)) {
					this.isSingleCharacterDataNode = true;
					this._first = this._last = this._next = this.sc;
				} else {
					this._first = this._next = (this.sc === root && !dom.isCharacterDataNode(this.sc)) ? this.sc.childNodes[this.so] : dom.getClosestAncestorIn(this.sc, root, true);
					this._last = (this.ec === root && !dom.isCharacterDataNode(this.ec)) ? this.ec.childNodes[this.eo - 1] : dom.getClosestAncestorIn(this.ec, root, true);
				}

			}
		}

		RangeIterator.prototype = {
			_current: null,
			_next: null,
			_first: null,
			_last: null,
			isSingleCharacterDataNode: false,

			reset: function () {
				this._current = null;
				this._next = this._first;
			},

			hasNext: function () {
				return !!this._next;
			},

			next: function () {
				// Move to next node
				var current = this._current = this._next;
				if (current) {
					this._next = (current !== this._last) ? current.nextSibling : null;

					// Check for partially selected text nodes
					if (dom.isCharacterDataNode(current) && this.clonePartiallySelectedTextNodes) {
						if (current === this.ec) {

							(current = current.cloneNode(true)).deleteData(this.eo, current.length - this.eo);
						}
						if (this._current === this.sc) {

							(current = current.cloneNode(true)).deleteData(0, this.so);
						}
					}
				}

				return current;
			},

			remove: function () {
				var current = this._current,
					start, end;

				if (dom.isCharacterDataNode(current) && (current === this.sc || current === this.ec)) {
					start = (current === this.sc) ? this.so : 0;
					end = (current === this.ec) ? this.eo : current.length;
					if (start != end) {
						current.deleteData(start, end - start);
					}
				} else {
					if (current.parentNode) {
						current.parentNode.removeChild(current);
					} else {

					}
				}
			},

			// Checks if the current node is partially selected
			isPartiallySelectedSubtree: function () {
				var current = this._current;
				return isNonTextPartiallySelected(current, this.range);
			},

			getSubtreeIterator: function () {
				var subRange;
				if (this.isSingleCharacterDataNode) {
					subRange = this.range.cloneRange();
					subRange.collapse();
				} else {
					subRange = new Range(getRangeDocument(this.range));
					var current = this._current;
					var startContainer = current,
						startOffset = 0,
						endContainer = current,
						endOffset = dom.getNodeLength(current);

					if (dom.isAncestorOf(current, this.sc, true)) {
						startContainer = this.sc;
						startOffset = this.so;
					}
					if (dom.isAncestorOf(current, this.ec, true)) {
						endContainer = this.ec;
						endOffset = this.eo;
					}

					updateBoundaries(subRange, startContainer, startOffset, endContainer, endOffset);
				}
				return new RangeIterator(subRange, this.clonePartiallySelectedTextNodes);
			},

			detach: function (detachRange) {
				if (detachRange) {
					this.range.detach();
				}
				this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null;
			}
		};

		/*----------------------------------------------------------------------------------------------------------------*/

		// Exceptions

		/**
		 * @constructor
		 */
		function RangeException(codeName) {
			this.code = this[codeName];
			this.codeName = codeName;
			this.message = "RangeException: " + this.codeName;
		}

		RangeException.prototype = {
			BAD_BOUNDARYPOINTS_ERR: 1,
			INVALID_NODE_TYPE_ERR: 2
		};

		RangeException.prototype.toString = function () {
			return this.message;
		};

		/*----------------------------------------------------------------------------------------------------------------*/

		/**
		 * Currently iterates through all nodes in the range on creation until I think of a decent way to do it
		 * TODO: Look into making this a proper iterator, not requiring preloading everything first
		 * @constructor
		 */
		function RangeNodeIterator(range, nodeTypes, filter) {
			this.nodes = getNodesInRange(range, nodeTypes, filter);
			this._next = this.nodes[0];
			this._position = 0;
		}

		RangeNodeIterator.prototype = {
			_current: null,

			hasNext: function () {
				return !!this._next;
			},

			next: function () {
				this._current = this._next;
				this._next = this.nodes[++this._position];
				return this._current;
			},

			detach: function () {
				this._current = this._next = this.nodes = null;
			}
		};

		var beforeAfterNodeTypes = [1, 3, 4, 5, 7, 8, 10];
		var rootContainerNodeTypes = [2, 9, 11];
		var readonlyNodeTypes = [5, 6, 10, 12];
		var insertableNodeTypes = [1, 3, 4, 5, 7, 8, 10, 11];
		var surroundNodeTypes = [1, 3, 4, 5, 7, 8];

		function createAncestorFinder(nodeTypes) {
			return function (node, selfIsAncestor) {
				var t, n = selfIsAncestor ? node : node.parentNode;
				while (n) {
					t = n.nodeType;
					if (dom.arrayContains(nodeTypes, t)) {
						return n;
					}
					n = n.parentNode;
				}
				return null;
			};
		}

		var getRootContainer = dom.getRootContainer;
		var getDocumentOrFragmentContainer = createAncestorFinder([9, 11]);
		var getReadonlyAncestor = createAncestorFinder(readonlyNodeTypes);
		var getDocTypeNotationEntityAncestor = createAncestorFinder([6, 10, 12]);

		function assertNoDocTypeNotationEntityAncestor(node, allowSelf) {
			if (getDocTypeNotationEntityAncestor(node, allowSelf)) {
				throw new RangeException("INVALID_NODE_TYPE_ERR");
			}
		}

		function assertNotDetached(range) {
			if (!range.startContainer) {
				throw new DOMException("INVALID_STATE_ERR");
			}
		}

		function assertValidNodeType(node, invalidTypes) {
			if (!dom.arrayContains(invalidTypes, node.nodeType)) {
				throw new RangeException("INVALID_NODE_TYPE_ERR");
			}
		}

		function assertValidOffset(node, offset) {
			if (offset < 0 || offset > (dom.isCharacterDataNode(node) ? node.length : node.childNodes.length)) {
				throw new DOMException("INDEX_SIZE_ERR");
			}
		}

		function assertSameDocumentOrFragment(node1, node2) {
			if (getDocumentOrFragmentContainer(node1, true) !== getDocumentOrFragmentContainer(node2, true)) {
				throw new DOMException("WRONG_DOCUMENT_ERR");
			}
		}

		function assertNodeNotReadOnly(node) {
			if (getReadonlyAncestor(node, true)) {
				throw new DOMException("NO_MODIFICATION_ALLOWED_ERR");
			}
		}

		function assertNode(node, codeName) {
			if (!node) {
				throw new DOMException(codeName);
			}
		}

		function isOrphan(node) {
			return !dom.arrayContains(rootContainerNodeTypes, node.nodeType) && !getDocumentOrFragmentContainer(node, true);
		}

		function isValidOffset(node, offset) {
			return offset <= (dom.isCharacterDataNode(node) ? node.length : node.childNodes.length);
		}

		function assertRangeValid(range) {
			assertNotDetached(range);
			if (isOrphan(range.startContainer) || isOrphan(range.endContainer) || !isValidOffset(range.startContainer, range.startOffset) || !isValidOffset(range.endContainer, range.endOffset)) {
				throw new Error("Range error: Range is no longer valid after DOM mutation (" + range.inspect() + ")");
			}
		}

		/*----------------------------------------------------------------------------------------------------------------*/

		// Test the browser's innerHTML support to decide how to implement createContextualFragment
		var styleEl = document.createElement("style");
		var htmlParsingConforms = false;
		try {
			styleEl.innerHTML = "<b>x</b>";
			htmlParsingConforms = (styleEl.firstChild.nodeType == 3); // Opera incorrectly creates an element node
		} catch (e) {
			// IE 6 and 7 throw
		}

		api.features.htmlParsingConforms = htmlParsingConforms;

		var createContextualFragment = htmlParsingConforms ?

		// Implementation as per HTML parsing spec, trusting in the browser's implementation of innerHTML. See
		// discussion and base code for this implementation at issue 67.
		// Spec: http://html5.org/specs/dom-parsing.html#extensions-to-the-range-interface
		// Thanks to Aleks Williams.
			function (fragmentStr) {
				// "Let node the context object's start's node."
				var node = this.startContainer;
				var doc = dom.getDocument(node);

				// "If the context object's start's node is null, raise an INVALID_STATE_ERR
				// exception and abort these steps."
				if (!node) {
					throw new DOMException("INVALID_STATE_ERR");
				}

				// "Let element be as follows, depending on node's interface:"
				// Document, Document Fragment: null
				var el = null;

				// "Element: node"
				if (node.nodeType == 1) {
					el = node;

					// "Text, Comment: node's parentElement"
				} else if (dom.isCharacterDataNode(node)) {
					el = dom.parentElement(node);
				}

				// "If either element is null or element's ownerDocument is an HTML document
				// and element's local name is "html" and element's namespace is the HTML
				// namespace"
				if (el === null || (
				el.nodeName == "HTML" && dom.isHtmlNamespace(dom.getDocument(el).documentElement) && dom.isHtmlNamespace(el))) {

					// "let element be a new Element with "body" as its local name and the HTML
					// namespace as its namespace.""
					el = doc.createElement("body");
				} else {
					el = el.cloneNode(false);
				}

				// "If the node's document is an HTML document: Invoke the HTML fragment parsing algorithm."
				// "If the node's document is an XML document: Invoke the XML fragment parsing algorithm."
				// "In either case, the algorithm must be invoked with fragment as the input
				// and element as the context element."
				el.innerHTML = fragmentStr;

				// "If this raises an exception, then abort these steps. Otherwise, let new
				// children be the nodes returned."

				// "Let fragment be a new DocumentFragment."
				// "Append all new children to fragment."
				// "Return fragment."
				return dom.fragmentFromNodeChildren(el);
			} :

			// In this case, innerHTML cannot be trusted, so fall back to a simpler, non-conformant implementation that
			// previous versions of Rangy used (with the exception of using a body element rather than a div)
			function (fragmentStr) {
				assertNotDetached(this);
				var doc = getRangeDocument(this);
				var el = doc.createElement("body");
				el.innerHTML = fragmentStr;

				return dom.fragmentFromNodeChildren(el);
			};

		/*----------------------------------------------------------------------------------------------------------------*/

		var rangeProperties = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer"];

		var s2s = 0,
			s2e = 1,
			e2e = 2,
			e2s = 3;
		var n_b = 0,
			n_a = 1,
			n_b_a = 2,
			n_i = 3;

		function RangePrototype() {}

		RangePrototype.prototype = {
			attachListener: function (type, listener) {
				this._listeners[type].push(listener);
			},

			compareBoundaryPoints: function (how, range) {
				assertRangeValid(this);
				assertSameDocumentOrFragment(this.startContainer, range.startContainer);

				var nodeA, offsetA, nodeB, offsetB;
				var prefixA = (how == e2s || how == s2s) ? "start" : "end";
				var prefixB = (how == s2e || how == s2s) ? "start" : "end";
				nodeA = this[prefixA + "Container"];
				offsetA = this[prefixA + "Offset"];
				nodeB = range[prefixB + "Container"];
				offsetB = range[prefixB + "Offset"];
				return dom.comparePoints(nodeA, offsetA, nodeB, offsetB);
			},

			insertNode: function (node) {
				assertRangeValid(this);
				assertValidNodeType(node, insertableNodeTypes);
				assertNodeNotReadOnly(this.startContainer);

				if (dom.isAncestorOf(node, this.startContainer, true)) {
					throw new DOMException("HIERARCHY_REQUEST_ERR");
				}

				// No check for whether the container of the start of the Range is of a type that does not allow
				// children of the type of node: the browser's DOM implementation should do this for us when we attempt
				// to add the node

				var firstNodeInserted = insertNodeAtPosition(node, this.startContainer, this.startOffset);
				this.setStartBefore(firstNodeInserted);
			},

			cloneContents: function () {
				assertRangeValid(this);

				var clone, frag;
				if (this.collapsed) {
					return getRangeDocument(this).createDocumentFragment();
				} else {
					if (this.startContainer === this.endContainer && dom.isCharacterDataNode(this.startContainer)) {
						clone = this.startContainer.cloneNode(true);
						clone.data = clone.data.slice(this.startOffset, this.endOffset);
						frag = getRangeDocument(this).createDocumentFragment();
						frag.appendChild(clone);
						return frag;
					} else {
						var iterator = new RangeIterator(this, true);
						clone = cloneSubtree(iterator);
						iterator.detach();
					}
					return clone;
				}
			},

			canSurroundContents: function () {
				assertRangeValid(this);
				assertNodeNotReadOnly(this.startContainer);
				assertNodeNotReadOnly(this.endContainer);

				// Check if the contents can be surrounded. Specifically, this means whether the range partially selects
				// no non-text nodes.
				var iterator = new RangeIterator(this, true);
				var boundariesInvalid = (iterator._first && (isNonTextPartiallySelected(iterator._first, this)) || (iterator._last && isNonTextPartiallySelected(iterator._last, this)));
				iterator.detach();
				return !boundariesInvalid;
			},

			surroundContents: function (node) {
				assertValidNodeType(node, surroundNodeTypes);

				if (!this.canSurroundContents()) {
					throw new RangeException("BAD_BOUNDARYPOINTS_ERR");
				}

				// Extract the contents
				var content = this.extractContents();

				// Clear the children of the node
				if (node.hasChildNodes()) {
					while (node.lastChild) {
						node.removeChild(node.lastChild);
					}
				}

				// Insert the new node and add the extracted contents
				insertNodeAtPosition(node, this.startContainer, this.startOffset);
				node.appendChild(content);

				this.selectNode(node);
			},

			cloneRange: function () {
				assertRangeValid(this);
				var range = new Range(getRangeDocument(this));
				var i = rangeProperties.length,
					prop;
				while (i--) {
					prop = rangeProperties[i];
					range[prop] = this[prop];
				}
				return range;
			},

			toString: function () {
				assertRangeValid(this);
				var sc = this.startContainer;
				if (sc === this.endContainer && dom.isCharacterDataNode(sc)) {
					return (sc.nodeType == 3 || sc.nodeType == 4) ? sc.data.slice(this.startOffset, this.endOffset) : "";
				} else {
					var textBits = [],
						iterator = new RangeIterator(this, true);

					iterateSubtree(iterator, function (node) {
						// Accept only text or CDATA nodes, not comments

						if (node.nodeType == 3 || node.nodeType == 4) {
							textBits.push(node.data);
						}
					});
					iterator.detach();
					return textBits.join("");
				}
			},

			// The methods below are all non-standard. The following batch were introduced by Mozilla but have since
			// been removed from Mozilla.

			compareNode: function (node) {
				assertRangeValid(this);

				var parent = node.parentNode;
				var nodeIndex = dom.getNodeIndex(node);

				if (!parent) {
					throw new DOMException("NOT_FOUND_ERR");
				}

				var startComparison = this.comparePoint(parent, nodeIndex),
					endComparison = this.comparePoint(parent, nodeIndex + 1);

				if (startComparison < 0) { // Node starts before
					return (endComparison > 0) ? n_b_a : n_b;
				} else {
					return (endComparison > 0) ? n_a : n_i;
				}
			},

			comparePoint: function (node, offset) {
				assertRangeValid(this);
				assertNode(node, "HIERARCHY_REQUEST_ERR");
				assertSameDocumentOrFragment(node, this.startContainer);

				if (dom.comparePoints(node, offset, this.startContainer, this.startOffset) < 0) {
					return -1;
				} else if (dom.comparePoints(node, offset, this.endContainer, this.endOffset) > 0) {
					return 1;
				}
				return 0;
			},

			createContextualFragment: createContextualFragment,

			toHtml: function () {
				assertRangeValid(this);
				var container = getRangeDocument(this).createElement("div");
				container.appendChild(this.cloneContents());
				return container.innerHTML;
			},

			// touchingIsIntersecting determines whether this method considers a node that borders a range intersects
			// with it (as in WebKit) or not (as in Gecko pre-1.9, and the default)
			intersectsNode: function (node, touchingIsIntersecting) {
				assertRangeValid(this);
				assertNode(node, "NOT_FOUND_ERR");
				if (dom.getDocument(node) !== getRangeDocument(this)) {
					return false;
				}

				var parent = node.parentNode,
					offset = dom.getNodeIndex(node);
				assertNode(parent, "NOT_FOUND_ERR");

				var startComparison = dom.comparePoints(parent, offset, this.endContainer, this.endOffset),
					endComparison = dom.comparePoints(parent, offset + 1, this.startContainer, this.startOffset);

				return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
			},


			isPointInRange: function (node, offset) {
				assertRangeValid(this);
				assertNode(node, "HIERARCHY_REQUEST_ERR");
				assertSameDocumentOrFragment(node, this.startContainer);

				return (dom.comparePoints(node, offset, this.startContainer, this.startOffset) >= 0) && (dom.comparePoints(node, offset, this.endContainer, this.endOffset) <= 0);
			},

			// The methods below are non-standard and invented by me.

			// Sharing a boundary start-to-end or end-to-start does not count as intersection.
			intersectsRange: function (range, touchingIsIntersecting) {
				assertRangeValid(this);

				if (getRangeDocument(range) != getRangeDocument(this)) {
					throw new DOMException("WRONG_DOCUMENT_ERR");
				}

				var startComparison = dom.comparePoints(this.startContainer, this.startOffset, range.endContainer, range.endOffset),
					endComparison = dom.comparePoints(this.endContainer, this.endOffset, range.startContainer, range.startOffset);

				return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
			},

			intersection: function (range) {
				if (this.intersectsRange(range)) {
					var startComparison = dom.comparePoints(this.startContainer, this.startOffset, range.startContainer, range.startOffset),
						endComparison = dom.comparePoints(this.endContainer, this.endOffset, range.endContainer, range.endOffset);

					var intersectionRange = this.cloneRange();

					if (startComparison == -1) {
						intersectionRange.setStart(range.startContainer, range.startOffset);
					}
					if (endComparison == 1) {
						intersectionRange.setEnd(range.endContainer, range.endOffset);
					}
					return intersectionRange;
				}
				return null;
			},

			union: function (range) {
				if (this.intersectsRange(range, true)) {
					var unionRange = this.cloneRange();
					if (dom.comparePoints(range.startContainer, range.startOffset, this.startContainer, this.startOffset) == -1) {
						unionRange.setStart(range.startContainer, range.startOffset);
					}
					if (dom.comparePoints(range.endContainer, range.endOffset, this.endContainer, this.endOffset) == 1) {
						unionRange.setEnd(range.endContainer, range.endOffset);
					}
					return unionRange;
				} else {
					throw new RangeException("Ranges do not intersect");
				}
			},

			containsNode: function (node, allowPartial) {
				if (allowPartial) {
					return this.intersectsNode(node, false);
				} else {
					return this.compareNode(node) == n_i;
				}
			},

			containsNodeContents: function (node) {
				return this.comparePoint(node, 0) >= 0 && this.comparePoint(node, dom.getNodeLength(node)) <= 0;
			},

			containsRange: function (range) {
				return this.intersection(range).equals(range);
			},

			containsNodeText: function (node) {
				var nodeRange = this.cloneRange();
				nodeRange.selectNode(node);
				var textNodes = nodeRange.getNodes([3]);
				if (textNodes.length > 0) {
					nodeRange.setStart(textNodes[0], 0);
					var lastTextNode = textNodes.pop();
					nodeRange.setEnd(lastTextNode, lastTextNode.length);
					var contains = this.containsRange(nodeRange);
					nodeRange.detach();
					return contains;
				} else {
					return this.containsNodeContents(node);
				}
			},

			createNodeIterator: function (nodeTypes, filter) {
				assertRangeValid(this);
				return new RangeNodeIterator(this, nodeTypes, filter);
			},

			getNodes: function (nodeTypes, filter) {
				assertRangeValid(this);
				return getNodesInRange(this, nodeTypes, filter);
			},

			getDocument: function () {
				return getRangeDocument(this);
			},

			collapseBefore: function (node) {
				assertNotDetached(this);

				this.setEndBefore(node);
				this.collapse(false);
			},

			collapseAfter: function (node) {
				assertNotDetached(this);

				this.setStartAfter(node);
				this.collapse(true);
			},

			getName: function () {
				return "DomRange";
			},

			equals: function (range) {
				return Range.rangesEqual(this, range);
			},

			inspect: function () {
				return inspect(this);
			}
		};

		function copyComparisonConstantsToObject(obj) {
			obj.START_TO_START = s2s;
			obj.START_TO_END = s2e;
			obj.END_TO_END = e2e;
			obj.END_TO_START = e2s;

			obj.NODE_BEFORE = n_b;
			obj.NODE_AFTER = n_a;
			obj.NODE_BEFORE_AND_AFTER = n_b_a;
			obj.NODE_INSIDE = n_i;
		}

		function copyComparisonConstants(constructor) {
			copyComparisonConstantsToObject(constructor);
			copyComparisonConstantsToObject(constructor.prototype);
		}

		function createRangeContentRemover(remover, boundaryUpdater) {
			return function () {
				assertRangeValid(this);

				var sc = this.startContainer,
					so = this.startOffset,
					root = this.commonAncestorContainer;

				var iterator = new RangeIterator(this, true);

				// Work out where to position the range after content removal
				var node, boundary;
				if (sc !== root) {
					node = dom.getClosestAncestorIn(sc, root, true);
					boundary = getBoundaryAfterNode(node);
					sc = boundary.node;
					so = boundary.offset;
				}

				// Check none of the range is read-only
				iterateSubtree(iterator, assertNodeNotReadOnly);

				iterator.reset();

				// Remove the content
				var returnValue = remover(iterator);
				iterator.detach();

				// Move to the new position
				boundaryUpdater(this, sc, so, sc, so);

				return returnValue;
			};
		}

		function createPrototypeRange(constructor, boundaryUpdater, detacher) {
			function createBeforeAfterNodeSetter(isBefore, isStart) {
				return function (node) {
					assertNotDetached(this);
					assertValidNodeType(node, beforeAfterNodeTypes);
					assertValidNodeType(getRootContainer(node), rootContainerNodeTypes);

					var boundary = (isBefore ? getBoundaryBeforeNode : getBoundaryAfterNode)(node);
					(isStart ? setRangeStart : setRangeEnd)(this, boundary.node, boundary.offset);
				};
			}

			function setRangeStart(range, node, offset) {
				var ec = range.endContainer,
					eo = range.endOffset;
				if (node !== range.startContainer || offset !== this.startOffset) {
					// Check the root containers of the range and the new boundary, and also check whether the new boundary
					// is after the current end. In either case, collapse the range to the new position
					if (getRootContainer(node) != getRootContainer(ec) || dom.comparePoints(node, offset, ec, eo) == 1) {
						ec = node;
						eo = offset;
					}
					boundaryUpdater(range, node, offset, ec, eo);
				}
			}

			function setRangeEnd(range, node, offset) {
				var sc = range.startContainer,
					so = range.startOffset;
				if (node !== range.endContainer || offset !== this.endOffset) {
					// Check the root containers of the range and the new boundary, and also check whether the new boundary
					// is after the current end. In either case, collapse the range to the new position
					if (getRootContainer(node) != getRootContainer(sc) || dom.comparePoints(node, offset, sc, so) == -1) {
						sc = node;
						so = offset;
					}
					boundaryUpdater(range, sc, so, node, offset);
				}
			}

			function setRangeStartAndEnd(range, node, offset) {
				if (node !== range.startContainer || offset !== this.startOffset || node !== range.endContainer || offset !== this.endOffset) {
					boundaryUpdater(range, node, offset, node, offset);
				}
			}

			constructor.prototype = new RangePrototype();

			api.util.extend(constructor.prototype, {
				setStart: function (node, offset) {
					assertNotDetached(this);
					assertNoDocTypeNotationEntityAncestor(node, true);
					assertValidOffset(node, offset);

					setRangeStart(this, node, offset);
				},

				setEnd: function (node, offset) {
					assertNotDetached(this);
					assertNoDocTypeNotationEntityAncestor(node, true);
					assertValidOffset(node, offset);

					setRangeEnd(this, node, offset);
				},

				setStartBefore: createBeforeAfterNodeSetter(true, true),
				setStartAfter: createBeforeAfterNodeSetter(false, true),
				setEndBefore: createBeforeAfterNodeSetter(true, false),
				setEndAfter: createBeforeAfterNodeSetter(false, false),

				collapse: function (isStart) {
					assertRangeValid(this);
					if (isStart) {
						boundaryUpdater(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset);
					} else {
						boundaryUpdater(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset);
					}
				},

				selectNodeContents: function (node) {
					// This doesn't seem well specified: the spec talks only about selecting the node's contents, which
					// could be taken to mean only its children. However, browsers implement this the same as selectNode for
					// text nodes, so I shall do likewise
					assertNotDetached(this);
					assertNoDocTypeNotationEntityAncestor(node, true);

					boundaryUpdater(this, node, 0, node, dom.getNodeLength(node));
				},

				selectNode: function (node) {
					assertNotDetached(this);
					assertNoDocTypeNotationEntityAncestor(node, false);
					assertValidNodeType(node, beforeAfterNodeTypes);

					var start = getBoundaryBeforeNode(node),
						end = getBoundaryAfterNode(node);
					boundaryUpdater(this, start.node, start.offset, end.node, end.offset);
				},

				extractContents: createRangeContentRemover(extractSubtree, boundaryUpdater),

				deleteContents: createRangeContentRemover(deleteSubtree, boundaryUpdater),

				canSurroundContents: function () {
					assertRangeValid(this);
					assertNodeNotReadOnly(this.startContainer);
					assertNodeNotReadOnly(this.endContainer);

					// Check if the contents can be surrounded. Specifically, this means whether the range partially selects
					// no non-text nodes.
					var iterator = new RangeIterator(this, true);
					var boundariesInvalid = (iterator._first && (isNonTextPartiallySelected(iterator._first, this)) || (iterator._last && isNonTextPartiallySelected(iterator._last, this)));
					iterator.detach();
					return !boundariesInvalid;
				},

				detach: function () {
					detacher(this);
				},

				splitBoundaries: function () {
					assertRangeValid(this);


					var sc = this.startContainer,
						so = this.startOffset,
						ec = this.endContainer,
						eo = this.endOffset;
					var startEndSame = (sc === ec);

					if (dom.isCharacterDataNode(ec) && eo > 0 && eo < ec.length) {
						dom.splitDataNode(ec, eo);

					}

					if (dom.isCharacterDataNode(sc) && so > 0 && so < sc.length) {

						sc = dom.splitDataNode(sc, so);
						if (startEndSame) {
							eo -= so;
							ec = sc;
						} else if (ec == sc.parentNode && eo >= dom.getNodeIndex(sc)) {
							eo++;
						}
						so = 0;

					}
					boundaryUpdater(this, sc, so, ec, eo);
				},

				normalizeBoundaries: function () {
					assertRangeValid(this);

					var sc = this.startContainer,
						so = this.startOffset,
						ec = this.endContainer,
						eo = this.endOffset;

					var mergeForward = function (node) {
						var sibling = node.nextSibling;
						if (sibling && sibling.nodeType == node.nodeType) {
							ec = node;
							eo = node.length;
							node.appendData(sibling.data);
							sibling.parentNode.removeChild(sibling);
						}
					};

					var mergeBackward = function (node) {
						var sibling = node.previousSibling;
						if (sibling && sibling.nodeType == node.nodeType) {
							sc = node;
							var nodeLength = node.length;
							so = sibling.length;
							node.insertData(0, sibling.data);
							sibling.parentNode.removeChild(sibling);
							if (sc == ec) {
								eo += so;
								ec = sc;
							} else if (ec == node.parentNode) {
								var nodeIndex = dom.getNodeIndex(node);
								if (eo == nodeIndex) {
									ec = node;
									eo = nodeLength;
								} else if (eo > nodeIndex) {
									eo--;
								}
							}
						}
					};

					var normalizeStart = true;

					if (dom.isCharacterDataNode(ec)) {
						if (ec.length == eo) {
							mergeForward(ec);
						}
					} else {
						if (eo > 0) {
							var endNode = ec.childNodes[eo - 1];
							if (endNode && dom.isCharacterDataNode(endNode)) {
								mergeForward(endNode);
							}
						}
						normalizeStart = !this.collapsed;
					}

					if (normalizeStart) {
						if (dom.isCharacterDataNode(sc)) {
							if (so == 0) {
								mergeBackward(sc);
							}
						} else {
							if (so < sc.childNodes.length) {
								var startNode = sc.childNodes[so];
								if (startNode && dom.isCharacterDataNode(startNode)) {
									mergeBackward(startNode);
								}
							}
						}
					} else {
						sc = ec;
						so = eo;
					}

					boundaryUpdater(this, sc, so, ec, eo);
				},

				collapseToPoint: function (node, offset) {
					assertNotDetached(this);

					assertNoDocTypeNotationEntityAncestor(node, true);
					assertValidOffset(node, offset);

					setRangeStartAndEnd(this, node, offset);
				}
			});

			copyComparisonConstants(constructor);
		}

		/*----------------------------------------------------------------------------------------------------------------*/

		// Updates commonAncestorContainer and collapsed after boundary change
		function updateCollapsedAndCommonAncestor(range) {
			range.collapsed = (range.startContainer === range.endContainer && range.startOffset === range.endOffset);
			range.commonAncestorContainer = range.collapsed ? range.startContainer : dom.getCommonAncestor(range.startContainer, range.endContainer);
		}

		function updateBoundaries(range, startContainer, startOffset, endContainer, endOffset) {
			var startMoved = (range.startContainer !== startContainer || range.startOffset !== startOffset);
			var endMoved = (range.endContainer !== endContainer || range.endOffset !== endOffset);

			range.startContainer = startContainer;
			range.startOffset = startOffset;
			range.endContainer = endContainer;
			range.endOffset = endOffset;

			updateCollapsedAndCommonAncestor(range);
			dispatchEvent(range, "boundarychange", {
				startMoved: startMoved,
				endMoved: endMoved
			});
		}

		function detach(range) {
			assertNotDetached(range);
			range.startContainer = range.startOffset = range.endContainer = range.endOffset = null;
			range.collapsed = range.commonAncestorContainer = null;
			dispatchEvent(range, "detach", null);
			range._listeners = null;
		}

		/**
		 * @constructor
		 */
		function Range(doc) {
			this.startContainer = doc;
			this.startOffset = 0;
			this.endContainer = doc;
			this.endOffset = 0;
			this._listeners = {
				boundarychange: [],
				detach: []
			};
			updateCollapsedAndCommonAncestor(this);
		}

		createPrototypeRange(Range, updateBoundaries, detach);

		api.rangePrototype = RangePrototype.prototype;

		Range.rangeProperties = rangeProperties;
		Range.RangeIterator = RangeIterator;
		Range.copyComparisonConstants = copyComparisonConstants;
		Range.createPrototypeRange = createPrototypeRange;
		Range.inspect = inspect;
		Range.getRangeDocument = getRangeDocument;
		Range.rangesEqual = function (r1, r2) {
			return r1.startContainer === r2.startContainer && r1.startOffset === r2.startOffset && r1.endContainer === r2.endContainer && r1.endOffset === r2.endOffset;
		};

		api.DomRange = Range;
		api.RangeException = RangeException;
	});
	rangy.createModule("WrappedRange", function (api, module) {
		api.requireModules(["DomUtil", "DomRange"]);

		/**
		 * @constructor
		 */
		var WrappedRange;
		var dom = api.dom;
		var DomPosition = dom.DomPosition;
		var DomRange = api.DomRange;



		/*----------------------------------------------------------------------------------------------------------------*/

		/*
    This is a workaround for a bug where IE returns the wrong container element from the TextRange's parentElement()
    method. For example, in the following (where pipes denote the selection boundaries):

    <ul id="ul"><li id="a">| a </li><li id="b"> b |</li></ul>

    var range = document.selection.createRange();
    alert(range.parentElement().id); // Should alert "ul" but alerts "b"

    This method returns the common ancestor node of the following:
    - the parentElement() of the textRange
    - the parentElement() of the textRange after calling collapse(true)
    - the parentElement() of the textRange after calling collapse(false)
     */
		function getTextRangeContainerElement(textRange) {
			var parentEl = textRange.parentElement();

			var range = textRange.duplicate();
			range.collapse(true);
			var startEl = range.parentElement();
			range = textRange.duplicate();
			range.collapse(false);
			var endEl = range.parentElement();
			var startEndContainer = (startEl == endEl) ? startEl : dom.getCommonAncestor(startEl, endEl);

			return startEndContainer == parentEl ? startEndContainer : dom.getCommonAncestor(parentEl, startEndContainer);
		}

		function textRangeIsCollapsed(textRange) {
			return textRange.compareEndPoints("StartToEnd", textRange) == 0;
		}

		// Gets the boundary of a TextRange expressed as a node and an offset within that node. This function started out as
		// an improved version of code found in Tim Cameron Ryan's IERange (http://code.google.com/p/ierange/) but has
		// grown, fixing problems with line breaks in preformatted text, adding workaround for IE TextRange bugs, handling
		// for inputs and images, plus optimizations.
		function getTextRangeBoundaryPosition(textRange, wholeRangeContainerElement, isStart, isCollapsed) {
			var workingRange = textRange.duplicate();

			workingRange.collapse(isStart);
			var containerElement = workingRange.parentElement();

			// Sometimes collapsing a TextRange that's at the start of a text node can move it into the previous node, so
			// check for that
			// TODO: Find out when. Workaround for wholeRangeContainerElement may break this
			if (!dom.isAncestorOf(wholeRangeContainerElement, containerElement, true)) {
				containerElement = wholeRangeContainerElement;

			}



			// Deal with nodes that cannot "contain rich HTML markup". In practice, this means form inputs, images and
			// similar. See http://msdn.microsoft.com/en-us/library/aa703950%28VS.85%29.aspx
			if (!containerElement.canHaveHTML) {
				return new DomPosition(containerElement.parentNode, dom.getNodeIndex(containerElement));
			}

			var workingNode = dom.getDocument(containerElement).createElement("span");

			// Workaround for HTML5 Shiv's insane violation of
			// document.createElement(). See Rangy issue 104 and HTML 5 Shiv issue
			// 64: https://github.com/aFarkas/html5shiv/issues/64
			if (workingNode.parentNode) {
				workingNode.parentNode.removeChild(workingNode);
			}

			var comparison, workingComparisonType = isStart ? "StartToStart" : "StartToEnd";
			var previousNode, nextNode, boundaryPosition, boundaryNode;

			// Move the working range through the container's children, starting at the end and working backwards, until the
			// working range reaches or goes past the boundary we're interested in
			do {
				containerElement.insertBefore(workingNode, workingNode.previousSibling);
				workingRange.moveToElementText(workingNode);
			} while ((comparison = workingRange.compareEndPoints(workingComparisonType, textRange)) > 0 && workingNode.previousSibling);

			// We've now reached or gone past the boundary of the text range we're interested in
			// so have identified the node we want
			boundaryNode = workingNode.nextSibling;

			if (comparison == -1 && boundaryNode && dom.isCharacterDataNode(boundaryNode)) {
				// This is a character data node (text, comment, cdata). The working range is collapsed at the start of the
				// node containing the text range's boundary, so we move the end of the working range to the boundary point
				// and measure the length of its text to get the boundary's offset within the node.
				workingRange.setEndPoint(isStart ? "EndToStart" : "EndToEnd", textRange);


				var offset;

				if (/[\r\n]/.test(boundaryNode.data)) {
					/*
                For the particular case of a boundary within a text node containing line breaks (within a <pre> element,
                for example), we need a slightly complicated approach to get the boundary's offset in IE. The facts:

                - Each line break is represented as \r in the text node's data/nodeValue properties
                - Each line break is represented as \r\n in the TextRange's 'text' property
                - The 'text' property of the TextRange does not contain trailing line breaks

                To get round the problem presented by the final fact above, we can use the fact that TextRange's
                moveStart() and moveEnd() methods return the actual number of characters moved, which is not necessarily
                the same as the number of characters it was instructed to move. The simplest approach is to use this to
                store the characters moved when moving both the start and end of the range to the start of the document
                body and subtracting the start offset from the end offset (the "move-negative-gazillion" method).
                However, this is extremely slow when the document is large and the range is near the end of it. Clearly
                doing the mirror image (i.e. moving the range boundaries to the end of the document) has the same
                problem.

                Another approach that works is to use moveStart() to move the start boundary of the range up to the end
                boundary one character at a time and incrementing a counter with the value returned by the moveStart()
                call. However, the check for whether the start boundary has reached the end boundary is expensive, so
                this method is slow (although unlike "move-negative-gazillion" is largely unaffected by the location of
                the range within the document).

                The method below is a hybrid of the two methods above. It uses the fact that a string containing the
                TextRange's 'text' property with each \r\n converted to a single \r character cannot be longer than the
                text of the TextRange, so the start of the range is moved that length initially and then a character at
                a time to make up for any trailing line breaks not contained in the 'text' property. This has good
                performance in most situations compared to the previous two methods.
                */
					var tempRange = workingRange.duplicate();
					var rangeLength = tempRange.text.replace(/\r\n/g, "\r").length;

					offset = tempRange.moveStart("character", rangeLength);
					while ((comparison = tempRange.compareEndPoints("StartToEnd", tempRange)) == -1) {
						offset++;
						tempRange.moveStart("character", 1);
					}
				} else {
					// IE7 sometimes has weird workingranges that apparently do not start in the workingNode any more, but in
					// some kind of phantom paragraph, that cannot be found in the DOM.
					// in such situations, the workingRange.text no longer is a substring at the start of the boundaryNode.data
					// If we find such a situation, we skip all characters at the start of the workingRange.data, that are not
					// at the start of the boundaryNode.data.
					// Before comparing, we have to replace all nbsp with normal spaces
					var wrText = workingRange.text.replace(/\u00a0/g, " ");
					var bnText = boundaryNode.data.replace(/\u00a0/g, " ");
					if (bnText.indexOf(wrText) !== 0) {
						while (wrText.length > 0 && bnText.indexOf(wrText) !== 0) {
							wrText = wrText.substr(1);
						}
						offset = wrText.length;
					} else {
						offset = workingRange.text.length;
					}
				}
				boundaryPosition = new DomPosition(boundaryNode, offset);
			} else {


				// If the boundary immediately follows a character data node and this is the end boundary, we should favour
				// a position within that, and likewise for a start boundary preceding a character data node
				previousNode = (isCollapsed || !isStart) && workingNode.previousSibling;
				nextNode = (isCollapsed || isStart) && workingNode.nextSibling;



				if (nextNode && dom.isCharacterDataNode(nextNode)) {
					boundaryPosition = new DomPosition(nextNode, 0);
				} else if (previousNode && dom.isCharacterDataNode(previousNode)) {
					boundaryPosition = new DomPosition(previousNode, previousNode.length);
				} else {
					boundaryPosition = new DomPosition(containerElement, dom.getNodeIndex(workingNode));
				}
			}

			// Clean up
			workingNode.parentNode.removeChild(workingNode);

			return boundaryPosition;
		}

		// Returns a TextRange representing the boundary of a TextRange expressed as a node and an offset within that node.
		// This function started out as an optimized version of code found in Tim Cameron Ryan's IERange
		// (http://code.google.com/p/ierange/)
		function createBoundaryTextRange(boundaryPosition, isStart) {
			var boundaryNode, boundaryParent, boundaryOffset = boundaryPosition.offset;
			var doc = dom.getDocument(boundaryPosition.node);
			var workingNode, childNodes, workingRange = doc.body.createTextRange();
			var nodeIsDataNode = dom.isCharacterDataNode(boundaryPosition.node);

			if (nodeIsDataNode) {
				boundaryNode = boundaryPosition.node;
				boundaryParent = boundaryNode.parentNode;
			} else {
				childNodes = boundaryPosition.node.childNodes;
				boundaryNode = (boundaryOffset < childNodes.length) ? childNodes[boundaryOffset] : null;
				boundaryParent = boundaryPosition.node;
			}

			// Position the range immediately before the node containing the boundary
			workingNode = doc.createElement("span");

			// Making the working element non-empty element persuades IE to consider the TextRange boundary to be within the
			// element rather than immediately before or after it, which is what we want
			workingNode.innerHTML = "&#feff;";

			// insertBefore is supposed to work like appendChild if the second parameter is null. However, a bug report
			// for IERange suggests that it can crash the browser: http://code.google.com/p/ierange/issues/detail?id=12
			if (boundaryNode) {
				boundaryParent.insertBefore(workingNode, boundaryNode);
			} else {
				boundaryParent.appendChild(workingNode);
			}

			try {
				workingRange.moveToElementText(workingNode);
				workingRange.collapse(!isStart);
			} catch (err) {
				// @todo window.console.log('problem with moveToElementText');
				//return false;
			}

			// Clean up
			boundaryParent.removeChild(workingNode);

			// Move the working range to the text offset, if required
			if (nodeIsDataNode) {
				workingRange[isStart ? "moveStart" : "moveEnd"]("character", boundaryOffset);
			}

			return workingRange;
		}

		/*----------------------------------------------------------------------------------------------------------------*/

		if (api.features.implementsDomRange && (!api.features.implementsTextRange || !api.config.preferTextRange)) {
			// This is a wrapper around the browser's native DOM Range. It has two aims:
			// - Provide workarounds for specific browser bugs
			// - provide convenient extensions, which are inherited from Rangy's DomRange

			(function () {
				var rangeProto;
				var rangeProperties = DomRange.rangeProperties;
				var canSetRangeStartAfterEnd;

				function updateRangeProperties(range) {
					var i = rangeProperties.length,
						prop;
					while (i--) {
						prop = rangeProperties[i];
						range[prop] = range.nativeRange[prop];
					}
				}

				function updateNativeRange(range, startContainer, startOffset, endContainer, endOffset) {
					var startMoved = (range.startContainer !== startContainer || range.startOffset != startOffset);
					var endMoved = (range.endContainer !== endContainer || range.endOffset != endOffset);

					// Always set both boundaries for the benefit of IE9 (see issue 35)
					if (startMoved || endMoved) {
						range.setEnd(endContainer, endOffset);
						range.setStart(startContainer, startOffset);
					}
				}

				function detach(range) {
					range.nativeRange.detach();
					range.detached = true;
					var i = rangeProperties.length,
						prop;
					while (i--) {
						prop = rangeProperties[i];
						range[prop] = null;
					}
				}

				var createBeforeAfterNodeSetter;

				WrappedRange = function (range) {
					if (!range) {
						throw new Error("Range must be specified");
					}
					this.nativeRange = range;
					updateRangeProperties(this);
				};

				DomRange.createPrototypeRange(WrappedRange, updateNativeRange, detach);

				rangeProto = WrappedRange.prototype;

				rangeProto.selectNode = function (node) {
					this.nativeRange.selectNode(node);
					updateRangeProperties(this);
				};

				rangeProto.deleteContents = function () {
					this.nativeRange.deleteContents();
					updateRangeProperties(this);
				};

				rangeProto.extractContents = function () {
					var frag = this.nativeRange.extractContents();
					updateRangeProperties(this);
					return frag;
				};

				rangeProto.cloneContents = function () {
					return this.nativeRange.cloneContents();
				};

				// TODO: Until I can find a way to programmatically trigger the Firefox bug (apparently long-standing, still
				// present in 3.6.8) that throws "Index or size is negative or greater than the allowed amount" for
				// insertNode in some circumstances, all browsers will have to use the Rangy's own implementation of
				// insertNode, which works but is almost certainly slower than the native implementation.
				/*
            rangeProto.insertNode = function(node) {
                this.nativeRange.insertNode(node);
                updateRangeProperties(this);
            };
*/

				rangeProto.surroundContents = function (node) {
					this.nativeRange.surroundContents(node);
					updateRangeProperties(this);
				};

				rangeProto.collapse = function (isStart) {
					this.nativeRange.collapse(isStart);
					updateRangeProperties(this);
				};

				rangeProto.cloneRange = function () {
					return new WrappedRange(this.nativeRange.cloneRange());
				};

				rangeProto.refresh = function () {
					updateRangeProperties(this);
				};

				rangeProto.toString = function () {
					return this.nativeRange.toString();
				};

				// Create test range and node for feature detection

				var testTextNode = document.createTextNode("test");
				dom.getBody(document).appendChild(testTextNode);
				var range = document.createRange();

				/*--------------------------------------------------------------------------------------------------------*/

				// Test for Firefox 2 bug that prevents moving the start of a Range to a point after its current end and
				// correct for it

				range.setStart(testTextNode, 0);
				range.setEnd(testTextNode, 0);

				try {
					range.setStart(testTextNode, 1);
					canSetRangeStartAfterEnd = true;

					rangeProto.setStart = function (node, offset) {
						this.nativeRange.setStart(node, offset);
						updateRangeProperties(this);
					};

					rangeProto.setEnd = function (node, offset) {
						this.nativeRange.setEnd(node, offset);
						updateRangeProperties(this);
					};

					createBeforeAfterNodeSetter = function (name) {
						return function (node) {
							this.nativeRange[name](node);
							updateRangeProperties(this);
						};
					};

				} catch (ex) {


					canSetRangeStartAfterEnd = false;

					rangeProto.setStart = function (node, offset) {
						try {
							this.nativeRange.setStart(node, offset);
						} catch (ex) {
							this.nativeRange.setEnd(node, offset);
							this.nativeRange.setStart(node, offset);
						}
						updateRangeProperties(this);
					};

					rangeProto.setEnd = function (node, offset) {
						try {
							this.nativeRange.setEnd(node, offset);
						} catch (ex) {
							this.nativeRange.setStart(node, offset);
							this.nativeRange.setEnd(node, offset);
						}
						updateRangeProperties(this);
					};

					createBeforeAfterNodeSetter = function (name, oppositeName) {
						return function (node) {
							try {
								this.nativeRange[name](node);
							} catch (ex) {
								this.nativeRange[oppositeName](node);
								this.nativeRange[name](node);
							}
							updateRangeProperties(this);
						};
					};
				}

				rangeProto.setStartBefore = createBeforeAfterNodeSetter("setStartBefore", "setEndBefore");
				rangeProto.setStartAfter = createBeforeAfterNodeSetter("setStartAfter", "setEndAfter");
				rangeProto.setEndBefore = createBeforeAfterNodeSetter("setEndBefore", "setStartBefore");
				rangeProto.setEndAfter = createBeforeAfterNodeSetter("setEndAfter", "setStartAfter");

				/*--------------------------------------------------------------------------------------------------------*/

				// Test for and correct Firefox 2 behaviour with selectNodeContents on text nodes: it collapses the range to
				// the 0th character of the text node
				range.selectNodeContents(testTextNode);
				if (range.startContainer == testTextNode && range.endContainer == testTextNode && range.startOffset == 0 && range.endOffset == testTextNode.length) {
					rangeProto.selectNodeContents = function (node) {
						this.nativeRange.selectNodeContents(node);
						updateRangeProperties(this);
					};
				} else {
					rangeProto.selectNodeContents = function (node) {
						this.setStart(node, 0);
						this.setEnd(node, DomRange.getEndOffset(node));
					};
				}

				/*--------------------------------------------------------------------------------------------------------*/

				// Test for WebKit bug that has the beahviour of compareBoundaryPoints round the wrong way for constants
				// START_TO_END and END_TO_START: https://bugs.webkit.org/show_bug.cgi?id=20738

				range.selectNodeContents(testTextNode);
				range.setEnd(testTextNode, 3);

				var range2 = document.createRange();
				range2.selectNodeContents(testTextNode);
				range2.setEnd(testTextNode, 4);
				range2.setStart(testTextNode, 2);

				if (range.compareBoundaryPoints(range.START_TO_END, range2) == -1 & range.compareBoundaryPoints(range.END_TO_START, range2) == 1) {
					// This is the wrong way round, so correct for it


					rangeProto.compareBoundaryPoints = function (type, range) {
						range = range.nativeRange || range;
						if (type == range.START_TO_END) {
							type = range.END_TO_START;
						} else if (type == range.END_TO_START) {
							type = range.START_TO_END;
						}
						return this.nativeRange.compareBoundaryPoints(type, range);
					};
				} else {
					rangeProto.compareBoundaryPoints = function (type, range) {
						return this.nativeRange.compareBoundaryPoints(type, range.nativeRange || range);
					};
				}

				/*--------------------------------------------------------------------------------------------------------*/

				// Test for existence of createContextualFragment and delegate to it if it exists
				if (api.util.isHostMethod(range, "createContextualFragment")) {
					rangeProto.createContextualFragment = function (fragmentStr) {
						return this.nativeRange.createContextualFragment(fragmentStr);
					};
				}

				/*--------------------------------------------------------------------------------------------------------*/

				// Clean up
				dom.getBody(document).removeChild(testTextNode);
				range.detach();
				range2.detach();
			})();

			api.createNativeRange = function (doc) {
				doc = doc || document;
				return doc.createRange();
			};
		} else if (api.features.implementsTextRange) {
			// This is a wrapper around a TextRange, providing full DOM Range functionality using rangy's DomRange as a
			// prototype

			WrappedRange = function (textRange) {
				this.textRange = textRange;
				this.refresh();
			};

			WrappedRange.prototype = new DomRange(document);

			WrappedRange.prototype.refresh = function () {
				var start, end;

				// TextRange's parentElement() method cannot be trusted. getTextRangeContainerElement() works around that.
				var rangeContainerElement = getTextRangeContainerElement(this.textRange);

				if (textRangeIsCollapsed(this.textRange)) {
					end = start = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true, true);
				} else {

					start = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true, false);
					end = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, false, false);
				}

				this.setStart(start.node, start.offset);
				this.setEnd(end.node, end.offset);
			};

			DomRange.copyComparisonConstants(WrappedRange);

			// Add WrappedRange as the Range property of the global object to allow expression like Range.END_TO_END to work
			var globalObj = (function () {
				return this;
			})();
			if (typeof globalObj.Range == "undefined") {
				globalObj.Range = WrappedRange;
			}

			api.createNativeRange = function (doc) {
				doc = doc || document;
				return doc.body.createTextRange();
			};
		}

		if (api.features.implementsTextRange) {
			WrappedRange.rangeToTextRange = function (range) {
				if (range.collapsed) {
					var tr = createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
					return tr;
					//return createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
				} else {
					var startRange = createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
					var endRange = createBoundaryTextRange(new DomPosition(range.endContainer, range.endOffset), false);
					var textRange = dom.getDocument(range.startContainer).body.createTextRange();
					textRange.setEndPoint("StartToStart", startRange);
					textRange.setEndPoint("EndToEnd", endRange);
					return textRange;
				}
			};
		}

		WrappedRange.prototype.getName = function () {
			return "WrappedRange";
		};

		api.WrappedRange = WrappedRange;

		api.createRange = function (doc) {
			doc = doc || document;
			return new WrappedRange(api.createNativeRange(doc));
		};

		api.createRangyRange = function (doc) {
			doc = doc || document;
			return new DomRange(doc);
		};

		api.createIframeRange = function (iframeEl) {
			return api.createRange(dom.getIframeDocument(iframeEl));
		};

		api.createIframeRangyRange = function (iframeEl) {
			return api.createRangyRange(dom.getIframeDocument(iframeEl));
		};

		api.addCreateMissingNativeApiListener(function (win) {
			var doc = win.document;
			if (typeof doc.createRange == "undefined") {
				doc.createRange = function () {
					return api.createRange(this);
				};
			}
			doc = win = null;
		});
	});
	rangy.createModule("WrappedSelection", function (api, module) {
		// This will create a selection object wrapper that follows the Selection object found in the WHATWG draft DOM Range
		// spec (http://html5.org/specs/dom-range.html)

		api.requireModules(["DomUtil", "DomRange", "WrappedRange"]);

		api.config.checkSelectionRanges = true;

		var BOOLEAN = "boolean",
			windowPropertyName = "_rangySelection",
			dom = api.dom,
			util = api.util,
			DomRange = api.DomRange,
			WrappedRange = api.WrappedRange,
			DOMException = api.DOMException,
			DomPosition = dom.DomPosition,
			getSelection,
			selectionIsCollapsed,
			CONTROL = "Control";



		function getWinSelection(winParam) {
			return (winParam || window).getSelection();
		}

		function getDocSelection(winParam) {
			return (winParam || window).document.selection;
		}

		// Test for the Range/TextRange and Selection features required
		// Test for ability to retrieve selection
		var implementsWinGetSelection = api.util.isHostMethod(window, "getSelection"),
			implementsDocSelection = api.util.isHostObject(document, "selection");

		var useDocumentSelection = implementsDocSelection && (!implementsWinGetSelection || api.config.preferTextRange);

		if (useDocumentSelection) {
			getSelection = getDocSelection;
			api.isSelectionValid = function (winParam) {
				var doc = (winParam || window).document,
					nativeSel = doc.selection;

				// Check whether the selection TextRange is actually contained within the correct document
				return (nativeSel.type != "None" || dom.getDocument(nativeSel.createRange().parentElement()) == doc);
			};
		} else if (implementsWinGetSelection) {
			getSelection = getWinSelection;
			api.isSelectionValid = function () {
				return true;
			};
		} else {
			module.fail("Neither document.selection or window.getSelection() detected.");
		}

		api.getNativeSelection = getSelection;

		var testSelection = getSelection();
		var testRange = api.createNativeRange(document);
		var body = dom.getBody(document);

		// Obtaining a range from a selection
		var selectionHasAnchorAndFocus = util.areHostObjects(testSelection, ["anchorNode", "focusNode"] && util.areHostProperties(testSelection, ["anchorOffset", "focusOffset"]));
		api.features.selectionHasAnchorAndFocus = selectionHasAnchorAndFocus;

		// Test for existence of native selection extend() method
		var selectionHasExtend = util.isHostMethod(testSelection, "extend");
		api.features.selectionHasExtend = selectionHasExtend;

		// Test if rangeCount exists
		var selectionHasRangeCount = (typeof testSelection.rangeCount == "number");
		api.features.selectionHasRangeCount = selectionHasRangeCount;

		var selectionSupportsMultipleRanges = false;
		var collapsedNonEditableSelectionsSupported = true;

		if (util.areHostMethods(testSelection, ["addRange", "getRangeAt", "removeAllRanges"]) && typeof testSelection.rangeCount == "number" && api.features.implementsDomRange) {

			(function () {
				var iframe = document.createElement("iframe");
				body.appendChild(iframe);

				var iframeDoc = dom.getIframeDocument(iframe);
				iframeDoc.open();
				iframeDoc.write("<html><head></head><body>12</body></html>");
				iframeDoc.close();

				var sel = dom.getIframeWindow(iframe).getSelection();
				var docEl = iframeDoc.documentElement;
				var iframeBody = docEl.lastChild,
					textNode = iframeBody.firstChild;

				// Test whether the native selection will allow a collapsed selection within a non-editable element
				var r1 = iframeDoc.createRange();
				r1.setStart(textNode, 1);
				r1.collapse(true);
				sel.addRange(r1);
				collapsedNonEditableSelectionsSupported = (sel.rangeCount == 1);
				sel.removeAllRanges();

				// Test whether the native selection is capable of supporting multiple ranges
				var r2 = r1.cloneRange();
				r1.setStart(textNode, 0);
				r2.setEnd(textNode, 2);
				sel.addRange(r1);
				sel.addRange(r2);

				selectionSupportsMultipleRanges = (sel.rangeCount == 2);

				// Clean up
				r1.detach();
				r2.detach();

				body.removeChild(iframe);
			})();
		}

		api.features.selectionSupportsMultipleRanges = selectionSupportsMultipleRanges;
		api.features.collapsedNonEditableSelectionsSupported = collapsedNonEditableSelectionsSupported;

		// ControlRanges
		var implementsControlRange = false,
			testControlRange;

		if (body && util.isHostMethod(body, "createControlRange")) {
			testControlRange = body.createControlRange();
			if (util.areHostProperties(testControlRange, ["item", "add"])) {
				implementsControlRange = true;
			}
		}
		api.features.implementsControlRange = implementsControlRange;

		// Selection collapsedness
		if (selectionHasAnchorAndFocus) {
			selectionIsCollapsed = function (sel) {
				return sel.anchorNode === sel.focusNode && sel.anchorOffset === sel.focusOffset;
			};
		} else {
			selectionIsCollapsed = function (sel) {
				return sel.rangeCount ? sel.getRangeAt(sel.rangeCount - 1).collapsed : false;
			};
		}

		function updateAnchorAndFocusFromRange(sel, range, backwards) {
			var anchorPrefix = backwards ? "end" : "start",
				focusPrefix = backwards ? "start" : "end";
			sel.anchorNode = range[anchorPrefix + "Container"];
			sel.anchorOffset = range[anchorPrefix + "Offset"];
			sel.focusNode = range[focusPrefix + "Container"];
			sel.focusOffset = range[focusPrefix + "Offset"];
		}

		function updateAnchorAndFocusFromNativeSelection(sel) {
			var nativeSel = sel.nativeSelection;
			sel.anchorNode = nativeSel.anchorNode;
			sel.anchorOffset = nativeSel.anchorOffset;
			sel.focusNode = nativeSel.focusNode;
			sel.focusOffset = nativeSel.focusOffset;
		}

		function updateEmptySelection(sel) {
			sel.anchorNode = sel.focusNode = null;
			sel.anchorOffset = sel.focusOffset = 0;
			sel.rangeCount = 0;
			sel.isCollapsed = true;
			sel._ranges.length = 0;
		}

		function getNativeRange(range) {
			var nativeRange;
			if (range instanceof DomRange) {
				nativeRange = range._selectionNativeRange;
				if (!nativeRange) {
					nativeRange = api.createNativeRange(dom.getDocument(range.startContainer));
					nativeRange.setEnd(range.endContainer, range.endOffset);
					nativeRange.setStart(range.startContainer, range.startOffset);
					range._selectionNativeRange = nativeRange;
					range.attachListener("detach", function () {

						this._selectionNativeRange = null;
					});
				}
			} else if (range instanceof WrappedRange) {
				nativeRange = range.nativeRange;
			} else if (api.features.implementsDomRange && (range instanceof dom.getWindow(range.startContainer).Range)) {
				nativeRange = range;
			}
			return nativeRange;
		}

		function rangeContainsSingleElement(rangeNodes) {
			if (!rangeNodes.length || rangeNodes[0].nodeType != 1) {
				return false;
			}
			for (var i = 1, len = rangeNodes.length; i < len; ++i) {
				if (!dom.isAncestorOf(rangeNodes[0], rangeNodes[i])) {
					return false;
				}
			}
			return true;
		}

		function getSingleElementFromRange(range) {
			var nodes = range.getNodes();
			if (!rangeContainsSingleElement(nodes)) {
				throw new Error("getSingleElementFromRange: range " + range.inspect() + " did not consist of a single element");
			}
			return nodes[0];
		}

		function isTextRange(range) {
			return !!range && typeof range.text != "undefined";
		}

		function updateFromTextRange(sel, range) {
			// Create a Range from the selected TextRange
			var wrappedRange = new WrappedRange(range);
			sel._ranges = [wrappedRange];

			updateAnchorAndFocusFromRange(sel, wrappedRange, false);
			sel.rangeCount = 1;
			sel.isCollapsed = wrappedRange.collapsed;
		}

		function updateControlSelection(sel) {
			// Update the wrapped selection based on what's now in the native selection
			sel._ranges.length = 0;
			if (sel.docSelection.type == "None") {
				updateEmptySelection(sel);
			} else {
				var controlRange = sel.docSelection.createRange();
				if (isTextRange(controlRange)) {
					// This case (where the selection type is "Control" and calling createRange() on the selection returns
					// a TextRange) can happen in IE 9. It happens, for example, when all elements in the selected
					// ControlRange have been removed from the ControlRange and removed from the document.
					updateFromTextRange(sel, controlRange);
				} else {
					sel.rangeCount = controlRange.length;
					var range, doc = dom.getDocument(controlRange.item(0));
					for (var i = 0; i < sel.rangeCount; ++i) {
						range = api.createRange(doc);
						range.selectNode(controlRange.item(i));
						sel._ranges.push(range);
					}
					sel.isCollapsed = sel.rangeCount == 1 && sel._ranges[0].collapsed;
					updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], false);
				}
			}
		}

		function addRangeToControlSelection(sel, range) {
			var controlRange = sel.docSelection.createRange();
			var rangeElement = getSingleElementFromRange(range);

			// Create a new ControlRange containing all the elements in the selected ControlRange plus the element
			// contained by the supplied range
			var doc = dom.getDocument(controlRange.item(0));
			var newControlRange = dom.getBody(doc).createControlRange();
			for (var i = 0, len = controlRange.length; i < len; ++i) {
				newControlRange.add(controlRange.item(i));
			}
			try {
				newControlRange.add(rangeElement);
			} catch (ex) {
				throw new Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");
			}
			newControlRange.select();

			// Update the wrapped selection based on what's now in the native selection
			updateControlSelection(sel);
		}

		var getSelectionRangeAt;

		if (util.isHostMethod(testSelection, "getRangeAt")) {
			getSelectionRangeAt = function (sel, index) {
				try {
					return sel.getRangeAt(index);
				} catch (ex) {
					return null;
				}
			};
		} else if (selectionHasAnchorAndFocus) {
			getSelectionRangeAt = function (sel) {
				var doc = dom.getDocument(sel.anchorNode);
				var range = api.createRange(doc);
				range.setStart(sel.anchorNode, sel.anchorOffset);
				range.setEnd(sel.focusNode, sel.focusOffset);

				// Handle the case when the selection was selected backwards (from the end to the start in the
				// document)
				if (range.collapsed !== this.isCollapsed) {
					range.setStart(sel.focusNode, sel.focusOffset);
					range.setEnd(sel.anchorNode, sel.anchorOffset);
				}

				return range;
			};
		}

		/**
		 * @constructor
		 */
		function WrappedSelection(selection, docSelection, win) {
			this.nativeSelection = selection;
			this.docSelection = docSelection;
			this._ranges = [];
			this.win = win;
			this.refresh();
		}

		api.getSelection = function (win) {
			win = win || window;
			var sel = win[windowPropertyName];
			var nativeSel = getSelection(win),
				docSel = implementsDocSelection ? getDocSelection(win) : null;
			if (sel) {
				sel.nativeSelection = nativeSel;
				sel.docSelection = docSel;
				sel.refresh(win);
			} else {
				sel = new WrappedSelection(nativeSel, docSel, win);
				win[windowPropertyName] = sel;
			}
			return sel;
		};

		api.getIframeSelection = function (iframeEl) {
			return api.getSelection(dom.getIframeWindow(iframeEl));
		};

		var selProto = WrappedSelection.prototype;

		function createControlSelection(sel, ranges) {
			// Ensure that the selection becomes of type "Control"
			var doc = dom.getDocument(ranges[0].startContainer);
			var controlRange = dom.getBody(doc).createControlRange();
			for (var i = 0, el; i < rangeCount; ++i) {
				el = getSingleElementFromRange(ranges[i]);
				try {
					controlRange.add(el);
				} catch (ex) {
					throw new Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)");
				}
			}
			controlRange.select();

			// Update the wrapped selection based on what's now in the native selection
			updateControlSelection(sel);
		}

		// Selecting a range
		if (!useDocumentSelection && selectionHasAnchorAndFocus && util.areHostMethods(testSelection, ["removeAllRanges", "addRange"])) {
			selProto.removeAllRanges = function () {
				this.nativeSelection.removeAllRanges();
				updateEmptySelection(this);
			};

			var addRangeBackwards = function (sel, range) {
				var doc = DomRange.getRangeDocument(range);
				var endRange = api.createRange(doc);
				endRange.collapseToPoint(range.endContainer, range.endOffset);
				sel.nativeSelection.addRange(getNativeRange(endRange));
				sel.nativeSelection.extend(range.startContainer, range.startOffset);
				sel.refresh();
			};

			if (selectionHasRangeCount) {
				selProto.addRange = function (range, backwards) {
					if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
						addRangeToControlSelection(this, range);
					} else {
						if (backwards && selectionHasExtend) {
							addRangeBackwards(this, range);
						} else {
							var previousRangeCount;
							if (selectionSupportsMultipleRanges) {
								previousRangeCount = this.rangeCount;
							} else {
								this.removeAllRanges();
								previousRangeCount = 0;
							}
							this.nativeSelection.addRange(getNativeRange(range));

							// Check whether adding the range was successful
							this.rangeCount = this.nativeSelection.rangeCount;

							if (this.rangeCount == previousRangeCount + 1) {
								// The range was added successfully

								// Check whether the range that we added to the selection is reflected in the last range extracted from
								// the selection
								if (api.config.checkSelectionRanges) {
									var nativeRange = getSelectionRangeAt(this.nativeSelection, this.rangeCount - 1);
									if (nativeRange && !DomRange.rangesEqual(nativeRange, range)) {
										// Happens in WebKit with, for example, a selection placed at the start of a text node
										range = new WrappedRange(nativeRange);
									}
								}
								this._ranges[this.rangeCount - 1] = range;
								updateAnchorAndFocusFromRange(this, range, selectionIsBackwards(this.nativeSelection));
								this.isCollapsed = selectionIsCollapsed(this);
							} else {
								// The range was not added successfully. The simplest thing is to refresh
								this.refresh();
							}
						}
					}
				};
			} else {
				selProto.addRange = function (range, backwards) {
					if (backwards && selectionHasExtend) {
						addRangeBackwards(this, range);
					} else {
						this.nativeSelection.addRange(getNativeRange(range));
						this.refresh();
					}
				};
			}

			selProto.setRanges = function (ranges) {
				if (implementsControlRange && ranges.length > 1) {
					createControlSelection(this, ranges);
				} else {
					this.removeAllRanges();
					for (var i = 0, len = ranges.length; i < len; ++i) {
						this.addRange(ranges[i]);
					}
				}
			};
		} else if (util.isHostMethod(testSelection, "empty") && util.isHostMethod(testRange, "select") && implementsControlRange && useDocumentSelection) {

			selProto.removeAllRanges = function () {
				// Added try/catch as fix for issue #21
				try {

					var isNativeIE7 = (jQuery.browser.msie && jQuery.browser.version < 8 && (typeof document.documentMode === 'undefined'));
					if (!isNativeIE7) {
						this.docSelection.empty();
					}

					// Check for empty() not working (issue #24)
					if (this.docSelection.type != "None") {

						if (isNativeIE7) {
							this.docSelection.empty();
						}

						// removed workaround of rangy-core implementation
						// for IE to fix issue with strange selection of
						// hole body in some selection change cases
					}

				} catch (ex) {}
				updateEmptySelection(this);
			};

			selProto.addRange = function (range) {
				if (this.docSelection.type == CONTROL) {
					addRangeToControlSelection(this, range);
				} else {
					try {
						WrappedRange.rangeToTextRange(range).select();
						this._ranges[0] = range;
						this.rangeCount = 1;
						this.isCollapsed = this._ranges[0].collapsed;
						updateAnchorAndFocusFromRange(this, range, false);
					} catch (e) {
						// @todo
						// window.console.log('problem at addRange');
					}
				}
			};

			selProto.setRanges = function (ranges) {
				this.removeAllRanges();
				var rangeCount = ranges.length;
				if (rangeCount > 1) {
					createControlSelection(this, ranges);
				} else if (rangeCount) {
					this.addRange(ranges[0]);
				}
			};
		} else {
			module.fail("No means of selecting a Range or TextRange was found");
			return false;
		}

		selProto.getRangeAt = function (index) {
			if (index < 0 || index >= this.rangeCount) {
				throw new DOMException("INDEX_SIZE_ERR");
			} else {
				return this._ranges[index];
			}
		};

		var refreshSelection;

		if (useDocumentSelection) {
			refreshSelection = function (sel) {
				var range;
				if (api.isSelectionValid(sel.win)) {
					range = sel.docSelection.createRange();
				} else {
					range = dom.getBody(sel.win.document).createTextRange();
					range.collapse(true);
				}


				if (sel.docSelection.type == CONTROL) {
					updateControlSelection(sel);
				} else if (isTextRange(range)) {
					updateFromTextRange(sel, range);
				} else {
					updateEmptySelection(sel);
				}
			};
		} else if (util.isHostMethod(testSelection, "getRangeAt") && typeof testSelection.rangeCount == "number") {
			refreshSelection = function (sel) {
				if (implementsControlRange && implementsDocSelection && sel.docSelection.type == CONTROL) {
					updateControlSelection(sel);
				} else {
					sel._ranges.length = sel.rangeCount = sel.nativeSelection.rangeCount;
					if (sel.rangeCount) {
						for (var i = 0, len = sel.rangeCount; i < len; ++i) {
							sel._ranges[i] = new api.WrappedRange(sel.nativeSelection.getRangeAt(i));
						}
						updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], selectionIsBackwards(sel.nativeSelection));
						sel.isCollapsed = selectionIsCollapsed(sel);
					} else {
						updateEmptySelection(sel);
					}
				}
			};
		} else if (selectionHasAnchorAndFocus && typeof testSelection.isCollapsed == BOOLEAN && typeof testRange.collapsed == BOOLEAN && api.features.implementsDomRange) {
			refreshSelection = function (sel) {
				var range, nativeSel = sel.nativeSelection;
				if (nativeSel.anchorNode) {
					range = getSelectionRangeAt(nativeSel, 0);
					sel._ranges = [range];
					sel.rangeCount = 1;
					updateAnchorAndFocusFromNativeSelection(sel);
					sel.isCollapsed = selectionIsCollapsed(sel);
				} else {
					updateEmptySelection(sel);
				}
			};
		} else {
			module.fail("No means of obtaining a Range or TextRange from the user's selection was found");
			return false;
		}

		selProto.refresh = function (checkForChanges) {
			var oldRanges = checkForChanges ? this._ranges.slice(0) : null;
			refreshSelection(this);
			if (checkForChanges) {
				var i = oldRanges.length;
				if (i != this._ranges.length) {
					return false;
				}
				while (i--) {
					if (!DomRange.rangesEqual(oldRanges[i], this._ranges[i])) {
						return false;
					}
				}
				return true;
			}
		};

		// Removal of a single range
		var removeRangeManually = function (sel, range) {
			var ranges = sel.getAllRanges(),
				removed = false;
			sel.removeAllRanges();
			for (var i = 0, len = ranges.length; i < len; ++i) {
				if (removed || range !== ranges[i]) {
					sel.addRange(ranges[i]);
				} else {
					// According to the draft WHATWG Range spec, the same range may be added to the selection multiple
					// times. removeRange should only remove the first instance, so the following ensures only the first
					// instance is removed
					removed = true;
				}
			}
			if (!sel.rangeCount) {
				updateEmptySelection(sel);
			}
		};

		if (implementsControlRange) {
			selProto.removeRange = function (range) {
				if (this.docSelection.type == CONTROL) {
					var controlRange = this.docSelection.createRange();
					var rangeElement = getSingleElementFromRange(range);

					// Create a new ControlRange containing all the elements in the selected ControlRange minus the
					// element contained by the supplied range
					var doc = dom.getDocument(controlRange.item(0));
					var newControlRange = dom.getBody(doc).createControlRange();
					var el, removed = false;
					for (var i = 0, len = controlRange.length; i < len; ++i) {
						el = controlRange.item(i);
						if (el !== rangeElement || removed) {
							newControlRange.add(controlRange.item(i));
						} else {
							removed = true;
						}
					}
					newControlRange.select();

					// Update the wrapped selection based on what's now in the native selection
					updateControlSelection(this);
				} else {
					removeRangeManually(this, range);
				}
			};
		} else {
			selProto.removeRange = function (range) {
				removeRangeManually(this, range);
			};
		}

		// Detecting if a selection is backwards
		var selectionIsBackwards;
		if (!useDocumentSelection && selectionHasAnchorAndFocus && api.features.implementsDomRange) {
			selectionIsBackwards = function (sel) {
				var backwards = false;
				if (sel.anchorNode) {
					backwards = (dom.comparePoints(sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset) == 1);
				}
				return backwards;
			};

			selProto.isBackwards = function () {
				return selectionIsBackwards(this);
			};
		} else {
			selectionIsBackwards = selProto.isBackwards = function () {
				return false;
			};
		}

		// Selection text
		// This is conformant to the new WHATWG DOM Range draft spec but differs from WebKit and Mozilla's implementation
		selProto.toString = function () {

			var rangeTexts = [];
			for (var i = 0, len = this.rangeCount; i < len; ++i) {
				rangeTexts[i] = "" + this._ranges[i];
			}
			return rangeTexts.join("");
		};

		function assertNodeInSameDocument(sel, node) {
			if (sel.anchorNode && (dom.getDocument(sel.anchorNode) !== dom.getDocument(node))) {
				throw new DOMException("WRONG_DOCUMENT_ERR");
			}
		}

		// No current browsers conform fully to the HTML 5 draft spec for this method, so Rangy's own method is always used
		selProto.collapse = function (node, offset) {
			assertNodeInSameDocument(this, node);
			var range = api.createRange(dom.getDocument(node));
			range.collapseToPoint(node, offset);
			this.removeAllRanges();
			this.addRange(range);
			this.isCollapsed = true;
		};

		selProto.collapseToStart = function () {
			if (this.rangeCount) {
				var range = this._ranges[0];
				this.collapse(range.startContainer, range.startOffset);
			} else {
				throw new DOMException("INVALID_STATE_ERR");
			}
		};

		selProto.collapseToEnd = function () {
			if (this.rangeCount) {
				var range = this._ranges[this.rangeCount - 1];
				this.collapse(range.endContainer, range.endOffset);
			} else {
				throw new DOMException("INVALID_STATE_ERR");
			}
		};

		// The HTML 5 spec is very specific on how selectAllChildren should be implemented so the native implementation is
		// never used by Rangy.
		selProto.selectAllChildren = function (node) {
			assertNodeInSameDocument(this, node);
			var range = api.createRange(dom.getDocument(node));
			range.selectNodeContents(node);
			this.removeAllRanges();
			this.addRange(range);
		};

		selProto.deleteFromDocument = function () {
			// Sepcial behaviour required for Control selections
			if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
				var controlRange = this.docSelection.createRange();
				var element;
				while (controlRange.length) {
					element = controlRange.item(0);
					controlRange.remove(element);
					element.parentNode.removeChild(element);
				}
				this.refresh();
			} else if (this.rangeCount) {
				var ranges = this.getAllRanges();
				this.removeAllRanges();
				for (var i = 0, len = ranges.length; i < len; ++i) {
					ranges[i].deleteContents();
				}
				// The HTML5 spec says nothing about what the selection should contain after calling deleteContents on each
				// range. Firefox moves the selection to where the final selected range was, so we emulate that
				this.addRange(ranges[len - 1]);
			}
		};

		// The following are non-standard extensions
		selProto.getAllRanges = function () {
			return this._ranges.slice(0);
		};

		selProto.setSingleRange = function (range) {
			this.setRanges([range]);
		};

		selProto.containsNode = function (node, allowPartial) {
			for (var i = 0, len = this._ranges.length; i < len; ++i) {
				if (this._ranges[i].containsNode(node, allowPartial)) {
					return true;
				}
			}
			return false;
		};

		selProto.toHtml = function () {
			var html = "";
			if (this.rangeCount) {
				var container = DomRange.getRangeDocument(this._ranges[0]).createElement("div");
				for (var i = 0, len = this._ranges.length; i < len; ++i) {
					container.appendChild(this._ranges[i].cloneContents());
				}
				html = container.innerHTML;
			}
			return html;
		};

		function inspect(sel) {
			var rangeInspects = [];
			var anchor = new DomPosition(sel.anchorNode, sel.anchorOffset);
			var focus = new DomPosition(sel.focusNode, sel.focusOffset);
			var name = (typeof sel.getName == "function") ? sel.getName() : "Selection";

			if (typeof sel.rangeCount != "undefined") {
				for (var i = 0, len = sel.rangeCount; i < len; ++i) {
					rangeInspects[i] = DomRange.inspect(sel.getRangeAt(i));
				}
			}
			return "[" + name + "(Ranges: " + rangeInspects.join(", ") + ")(anchor: " + anchor.inspect() + ", focus: " + focus.inspect() + "]";

		}

		selProto.getName = function () {
			return "WrappedSelection";
		};

		selProto.inspect = function () {
			return inspect(this);
		};

		selProto.detach = function () {
			this.win[windowPropertyName] = null;
			this.win = this.anchorNode = this.focusNode = null;
		};

		WrappedSelection.inspect = inspect;

		api.Selection = WrappedSelection;

		api.selectionPrototype = selProto;

		api.addCreateMissingNativeApiListener(function (win) {
			if (typeof win.getSelection == "undefined") {
				win.getSelection = function () {
					return api.getSelection(this);
				};
			}
			win = null;
		});
	});

	// TODO we should avoid populating the global namespace
	window.rangy = rangy;
}());

define("vendor/rangy-core", function(){});

/* rangy-core.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('aloha/rangy-core', ['jquery', 'vendor/rangy-core'], function (jQuery) {
	
	return window.rangy;
});

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
/*
 * MODIFICATIONS: 
 * * The name of the "constructor" method was changed from "init" to "_constructor"
 * * Mixin Support using https://gist.github.com/1006243
 * * Modified to be a require.js module
 */
define('util/class',[], function () {
	var initializing = false,
		fnTest = /xyz/.test(function () {
			xyz;
		}) ? /\b_super\b/ : /.*/;

	// The base Class implementation (does nothing)
	// with doing that Class is available in the global namespace.
	this.Class = function () {};

	// Create a new Class that inherits from this class
	Class.extend = function () {
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var i = 0; i < arguments.length; i++) {
			var prop = arguments[i];
			for (var name in prop) {
				// Check if we're overwriting an existing function
				prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function (name, fn) {
					return function () {

						var tmp = this._super;

						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					};
				})(name, prop[name]) : prop[name];
			}
		}

		// The dummy class constructor
		function Class() {
			// All construction is actually done in the _constructor method
			if (!initializing && this._constructor) this._constructor.apply(this, arguments);
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;

	};

	return this.Class;

});

/* lang.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
// Ensure GENTICS Namespace
window.GENTICS = window.GENTICS || {};
window.GENTICS.Utils = window.GENTICS.Utils || {};

define('util/lang', [], function () {
	
});

// Start Closure
(function (window) {
	
	var jQuery = window.alohaQuery || window.jQuery,
		$ = jQuery,
		GENTICS = window.GENTICS,
		Class = window.Class,
		console = window.console;

	/**
	 * Takes over all properties from the 'properties' object to the target object.
	 * If a property in 'target' with the same name as a property in 'properties' is already defined it is overridden.
	 *
	 * Example:
	 *
	 * var o1 = {a : 1, b : 'hello'};
	 * var o2 = {a : 3, c : 'world'};
	 *
	 * GENTICS.Utils.applyProperties(o1, o2);
	 *
	 * Will result in an o1 object like this:
	 *
	 * {a : 3, b: 'hello', c: 'world'}
	 *
	 * @static
	 * @return void
	 */
	GENTICS.Utils.applyProperties = function (target, properties) {
		var name;
		for (name in properties) {
			if (properties.hasOwnProperty(name)) {
				target[name] = properties[name];
			}
		}
	};

	/**
	 * Generate a unique hexadecimal string with 4 charachters
	 * @return {string}
	 */
	GENTICS.Utils.uniqeString4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};

	/**
	 * Generate a unique value represented as a 32 character hexadecimal string,
	 * such as 21EC2020-3AEA-1069-A2DD-08002B30309D
	 * @return {string}
	 */
	GENTICS.Utils.guid = function () {
		var S4 = GENTICS.Utils.uniqeString4;
		return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
	};

}(window));

/**
 * ecma5schims.js - Shim for ECMA5 compatibility
 * (http://en.wikipedia.org/wiki/Shim_%28computing%29)
 *
 * A shim library that implements common functions that are missing on some
 * environments in order to complete ECMA5 compatibility across all major
 * browsers.
 *
 * TODO: This code needs to be refactored so as to conform to Aloha coding
 *       standards.  It is also severly lacking in documentation.  Please take
 *       note of: https://github.com/alohaeditor/Aloha-Editor/wiki/Commit-Checklist .
 */

define('aloha/ecma5shims',[], function () {
	
	var $_;

	var shims = {
		// Function bind
		bind: function (owner) {
			var obj = this.obj || this;
			var native_method = Function.prototype.bind;
			var args = Array.prototype.slice.call(arguments, 1);

			if (native_method) {
				return native_method.apply(obj, arguments);
			}
			return function () {
				return obj.apply(owner, arguments.length === 0 ? args : args.concat(Array.prototype.slice.call(arguments)));
			};
		},

		// String trim
		trim: function () {
			var obj = this.obj || this;
			var native_method = String.prototype.trim;

			if (native_method) {
				return native_method.call(obj);
			}
			return obj.replace(/^\s+/, '').replace(/\s+$/, '');
		},

		// Array methods 
		// i optional
		indexOf: function (find, i) {
			var obj = this.obj || this;
			var native_method = Array.prototype.indexOf;

			if (native_method) {
				return native_method.call(obj, find, i);
			}
			if (i === undefined) {
				i = 0;
			}
			if (i < 0) {
				i += obj.length;
			}
			if (i < 0) {
				i = 0;
			}
			var n;
			for (n = obj.length; i < n; i++) {
				if (undefined !== obj[i] && obj[i] === find) {
					return i;
				}
			}
			return -1;
		},

		// that optional
		forEach: function (action, that) {
			var obj = this.obj || this;
			var native_method = Array.prototype.forEach;

			if (native_method) {
				return native_method.call(obj, action, that);
			}
			var i, n;
			for (i = 0, n = obj.length; i < n; i++) {
				if (undefined !== obj[i]) {
					action.call(that, obj[i], i, obj);
				}
			}
		},

		// that optional
		// chain optional
		map: function (mapper, that, chain) {
			var obj = this.obj || this;
			var native_method = Array.prototype.map;
			var returnWrapper = (typeof arguments[arguments.length - 1] == "boolean") ? Array.prototype.pop.call(arguments) : false;
			var result = [];

			if (native_method) {
				result = native_method.call(obj, mapper, that);
			} else {
				var other = [];
				var i, n;
				for (i = 0, n = obj.length; i < n; i++) {
					if (undefined !== obj[i]) {
						other[i] = mapper.call(that, obj[i], i, obj);
					}
				}
				result = other;
			}

			return returnWrapper ? $_(result) : result;
		},

		// that optional
		// chain optional
		filter: function (filterFunc, that, chain) {
			var obj = this.obj || this;
			var native_method = Array.prototype.filter;
			var returnWrapper = (typeof arguments[arguments.length - 1] == "boolean") ? Array.prototype.pop.call(arguments) : false;
			var result = [];

			if (native_method) {
				result = native_method.call(obj, filterFunc, that);
			} else {
				var other = [],
				    v,
				    i,
				    n;
				for (i = 0, n = obj.length; i < n; i++) {
					if (undefined !== obj[i] && filterFunc.call(that, v = obj[i], i, obj)) {
						other.push(v);
					}
				}
				result = other;
			}

			return returnWrapper ? $_(result) : result;
		},

		// that optional
		every: function (tester, that) {
			var obj = this.obj || this;
			var native_method = Array.prototype.every;

			if (native_method) {
				return native_method.call(obj, tester, that);
			}
			var i, n;
			for (i = 0, n = obj.length; i < n; i++) {
				if (undefined !== obj[i] && !tester.call(that, obj[i], i, obj)) {
					return false;
				}
			}
			return true;
		},

		// that optional
		some: function (tester, that) {
			var obj = this.obj || this;
			var native_method = Array.prototype.some;

			if (native_method) {
				return native_method.call(obj, tester, that);
			}
			var i, n;
			for (i = 0, n = obj.length; i < n; i++) {
				if (undefined !== obj[i] && tester.call(that, obj[i], i, obj)) {
					return true;
				}
			}
			return false;
		},

		// Since IE7 doesn't support 'hasAttribute' method on nodes
		// TODO: raise an exception if the object is not an node
		hasAttribute: function (attr) {
			var obj = this.obj || this;
			var native_method = obj.hasAttribute;

			if (native_method) {
				return obj.hasAttribute(attr);
			}
			return !!obj.getAttribute(attr);
		}

	};

	$_ = function (obj) {
		var Wrapper = function () {};
		Wrapper.prototype = shims;

		var wrapper_instance = new Wrapper();
		wrapper_instance.obj = obj;
		return wrapper_instance;
	};

	var shim;
	for (shim in shims) {
		if (shims.hasOwnProperty(shim)) {
			$_[shim] = shims[shim];
		}
	}


	// Node constants
	// http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-1841493061
	if (typeof window.Node != 'undefined') {
		$_.Node = window.Node;
	} else {
		$_.Node = {
			'ELEMENT_NODE': 1,
			'ATTRIBUTE_NODE': 2,
			'TEXT_NODE': 3,
			'CDATA_SECTION_NODE': 4,
			'ENTITY_REFERENCE_NODE': 5,
			'ENTITY_NODE': 6,
			'PROCESSING_INSTRUCTION_NODE': 7,
			'COMMENT_NODE': 8,
			'DOCUMENT_NODE': 9,
			'DOCUMENT_TYPE_NODE': 10,
			'DOCUMENT_FRAGMENT_NODE': 11,
			'NOTATION_NODE': 12,
			//The two nodes are disconnected. Order between disconnected nodes is always implementation-specific.
			'DOCUMENT_POSITION_DISCONNECTED': 0x01,
			//The second node precedes the reference node.
			'DOCUMENT_POSITION_PRECEDING': 0x02,
			//The node follows the reference node.
			'DOCUMENT_POSITION_FOLLOWING': 0x04,
			//The node contains the reference node. A node which contains is always preceding, too.
			'DOCUMENT_POSITION_CONTAINS': 0x08,
			//The node is contained by the reference node. A node which is contained is always following, too.
			'DOCUMENT_POSITION_CONTAINED_BY': 0x10,
			//The determination of preceding versus following is implementation-specific.
			'DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC': 0x20
		};
	}

	//node.ownerDocument gives the document object, which isn't the right info for a disconnect
	function getRootParent(node) {
		var parent = null;

		if (node) {
			do {
				parent = node;
			} while (null != (node = node.parentNode));
		}

		return parent;
	}

	//Compare Position - MIT Licensed, John Resig; http://ejohn.org/blog/comparing-document-position/
	//Already checked for equality and disconnect
	function comparePosition(node1, node2) {
		return (node1.contains(node2) && 16) + (node2.contains(node1) && 8) + (node1.sourceIndex >= 0 && node2.sourceIndex >= 0 ? (node1.sourceIndex < node2.sourceIndex && 4) + (node1.sourceIndex > node2.sourceIndex && 2) : 1);
	}

	//get a node with a sourceIndex to use
	function getUseNode(node) {
		//if the node already has a sourceIndex, use that node
		if (null != node.sourceIndex) {
			return node;
		}
		//otherwise, insert a comment (which has a sourceIndex but minimal DOM impact) before the node and use that
		return node.parentNode.insertBefore(document.createComment(""), node);
	}

	// http://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-compareDocumentPosition
	// FIXME: Check if the DOMNode prototype can be set.
	$_.compareDocumentPosition = function (node1, node2) {

		if (document.documentElement.compareDocumentPosition) {
			return node1.compareDocumentPosition(node2);
		}

		if (!document.documentElement.contains) {
			throw 'neither compareDocumentPosition nor contains is supported by this browser.';
		}

		if (node1 == node2) {
			return 0;
		}

		//if they don't have the same parent, there's a disconnect
		if (getRootParent(node1) != getRootParent(node2)) {
			return 1;
		}

		//use this if both nodes have a sourceIndex (text nodes don't)
		if (null != node1.sourceIndex && null != node2.sourceIndex) {
			return comparePosition(node1, node2);
		}

		//document will definitely contain the other node
		if (node1 == document) {
			return 20;
		}
		if (node2 == document) {
			return 10;
		}

		//get sourceIndexes to use for both nodes
		var useNode1 = getUseNode(node1),
			useNode2 = getUseNode(node2);

		//call this function again to get the result
		var result = comparePosition(useNode1, useNode2);

		//clean up if needed
		if (node1 != useNode1) {
			useNode1.parentNode.removeChild(useNode1);
		}
		if (node2 != useNode2) {
			useNode2.parentNode.removeChild(useNode2);
		}
		return result;
	};

	$_.getComputedStyle = function (node, style) {
		if (window.getComputedStyle) {
			return window.getComputedStyle(node, style);
		}
		if (node.currentStyle) {
			return node.currentStyle;
		}
		return null;
	};

	return $_;
});

/* dom.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
// Ensure GENTICS Namespace
window.GENTICS = window.GENTICS || {};
window.GENTICS.Utils = window.GENTICS.Utils || {};

define('util/dom',['jquery', 'util/class', 'aloha/ecma5shims'], function (jQuery, Class, $_) {
	

	var	GENTICS = window.GENTICS,
		//		Class = window.Class,
		// http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-1841493061
		Node = {
			'ELEMENT_NODE': 1,
			'ATTRIBUTE_NODE': 2,
			'TEXT_NODE': 3,
			'CDATA_SECTION_NODE': 4,
			'ENTITY_REFERENCE_NODE': 5,
			'ENTITY_NODE': 6,
			'PROCESSING_INSTRUCTION_NODE': 7,
			'COMMENT_NODE': 8,
			'DOCUMENT_NODE': 9,
			'DOCUMENT_TYPE_NODE': 10,
			'DOCUMENT_FRAGMENT_NODE': 11,
			'NOTATION_NODE': 12,
			//The two nodes are disconnected. Order between disconnected nodes is always implementation-specific.
			'DOCUMENT_POSITION_DISCONNECTED': 0x01,
			//The second node precedes the reference node.
			'DOCUMENT_POSITION_PRECEDING': 0x02,
			//The node follows the reference node.
			'DOCUMENT_POSITION_FOLLOWING': 0x04,
			//The node contains the reference node. A node which contains is always preceding, too.
			'DOCUMENT_POSITION_CONTAINS': 0x08,
			//The node is contained by the reference node. A node which is contained is always following, too.
			'DOCUMENT_POSITION_CONTAINED_BY': 0x10,
			//The determination of preceding versus following is implementation-specific.
			'DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC': 0x20
		},
		blockElementNames = {
			'P': true,
			'H1': true,
			'H2': true,
			'H3': true,
			'H4': true,
			'H5': true,
			'H6': true,
			'LI': true
		};

	/**
	 * @namespace GENTICS.Utils
	 * @class Dom provides methods to get information about the DOM and to manipulate it
	 * @singleton
	 */
	var Dom = Class.extend({
		/**
		 * Regex to find word characters.
		 */
		wordRegex: /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0525\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0621-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971\u0972\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D3D\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC\u0EDD\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8B\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10D0-\u10FA\u10FC\u1100-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u2094\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2D00-\u2D25\u2D30-\u2D65\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31B7\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCB\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA65F\uA662-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B\uA78C\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA2D\uFA30-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,

		/**
		 * Regex to find non-word characters.
		 */
		nonWordRegex: /[^\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0525\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0621-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971\u0972\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D3D\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC\u0EDD\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8B\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10D0-\u10FA\u10FC\u1100-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u2094\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2D00-\u2D25\u2D30-\u2D65\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31B7\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCB\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA65F\uA662-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B\uA78C\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA2D\uFA30-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,

		/**
		 * Tags which can safely be merged
		 * @hide
		 */
		mergeableTags: ['b', 'code', 'del', 'em', 'i', 'ins', 'strong', 'sub', 'sup', '#text'],

		/**
		 * Tags which do not mark word boundaries
		 * @hide
		 */
		nonWordBoundaryTags: ['a', 'b', 'code', 'del', 'em', 'i', 'ins', 'span', 'strong', 'sub', 'sup', '#text'],

		/**
		 * Tags which are considered 'nonempty', even if they have no children (or not data)
		 * TODO: finish this list
		 * @hide
		 */
		nonEmptyTags: ['br'],

		/**
		 * Tags which make up Flow Content or Phrasing Content, according to the HTML 5 specification,
		 * @see http://dev.w3.org/html5/spec/Overview.html#flow-content
		 * @see http://dev.w3.org/html5/spec/Overview.html#phrasing-content
		 * @hide
		 */
		tags: {
			'flow': ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'blockquote', 'br', 'button', 'canvas', 'cite', 'code', 'command', 'datalist', 'del', 'details', 'dfn', 'div', 'dl', 'em', 'embed', 'fieldset', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'menu', 'meter', 'nav', 'noscript', 'object', 'ol', 'output', 'p', 'pre', 'progress', 'q', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'span', 'strong', 'style', 'sub', 'sup', 'svg', 'table', 'textarea', 'time', 'u', 'ul', 'var', 'video', 'wbr', '#text'],
			'phrasing': ['a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'command', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'progress', 'q', 'ruby', 'samp', 'script', 'select', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'textarea', 'time', 'u', 'var', 'video', 'wbr', '#text']
		},

		/**
		 * Possible children of tags, according to the HTML 5
		 * specification.
		 * See http://dev.w3.org/html5/spec/Overview.html#elements-1
		 * Moved to http://www.whatwg.org/specs/web-apps/current-work/#elements-1
		 * @hide
		 */
		children: {
			'a': 'phrasing', // transparent
			'abbr': 'phrasing',
			'address': 'flow',
			'area': 'empty',
			'article': 'flow',
			'aside': 'flow',
			'audio': 'source', // transparent
			'b': 'phrasing',
			'base': 'empty',
			'bdo': 'phrasing',
			'blockquote': 'phrasing',
			'body': 'flow',
			'br': 'empty',
			'button': 'phrasing',
			'canvas': 'phrasing', // transparent
			'caption': 'flow',
			'cite': 'phrasing',
			'code': 'phrasing',
			'col': 'empty',
			'colgroup': 'col',
			'command': 'empty',
			'datalist': ['phrasing', 'option'],
			'dd': 'flow',
			'del': 'phrasing',
			'div': 'flow',
			'details': ['summary', 'flow'],
			'dfn': 'flow',
			'dl': ['dt', 'dd'],
			'dt': 'phrasing', // varies
			'em': 'phrasing',
			'embed': 'empty',
			'fieldset': ['legend', 'flow'],
			'figcaption': 'flow',
			'figure': ['figcaption', 'flow'],
			'footer': 'flow',
			'form': 'flow',
			'h1': 'phrasing',
			'h2': 'phrasing',
			'h3': 'phrasing',
			'h4': 'phrasing',
			'h5': 'phrasing',
			'h6': 'phrasing',
			//head
			'header': 'flow',
			'hgroup': ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
			'hr': 'empty',
			//html :)
			'i': 'phrasing',
			'iframe': '#text',
			'img': 'empty',
			'input': 'empty',
			'ins': 'phrasing', // transparent
			'kbd': 'phrasing',
			'keygen': 'empty',
			'label': 'phrasing',
			'legend': 'phrasing',
			'li': 'flow',
			'link': 'empty',
			'map': 'area', // transparent
			'mark': 'phrasing',
			'menu': ['li', 'flow'],
			'meta': 'empty',
			'meter': 'phrasing',
			'nav': 'flow',
			'noscript': 'phrasing', // varies
			'object': 'param', // transparent
			'ol': 'li',
			'optgroup': 'option',
			'option': '#text',
			'output': 'phrasing',
			'p': 'phrasing',
			'param': 'empty',
			'pre': 'phrasing',
			'progress': 'phrasing',
			'q': 'phrasing',
			'rp': 'phrasing',
			'rt': 'phrasing',
			'ruby': ['phrasing', 'rt', 'rp'],
			's': 'phrasing',
			'samp': 'pharsing',
			'script': '#script', //script
			'section': 'flow',
			'select': ['option', 'optgroup'],
			'small': 'phrasing',
			'source': 'empty',
			'span': 'phrasing',
			'strong': 'phrasing',
			'style': 'phrasing', // varies
			'sub': 'phrasing',
			'summary': 'phrasing',
			'sup': 'phrasing',
			'table': ['caption', 'colgroup', 'thead', 'tbody', 'tfoot', 'tr'],
			'tbody': 'tr',
			'td': 'flow',
			'textarea': '#text',
			'tfoot': 'tr',
			'th': 'phrasing',
			'thead': 'tr',
			'time': 'phrasing',
			'title': '#text',
			'tr': ['th', 'td'],
			'track': 'empty',
			'u': 'phrasing',
			'ul': 'li',
			'var': 'phrasing',
			'video': 'source', // transparent
			'wbr': 'empty'
		},

		/**
		 * List of nodenames of blocklevel elements
		 * TODO: finish this list
		 * @hide
		 */
		blockLevelElements: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'div', 'pre'],

		/**
		 * List of nodenames of list elements
		 * @hide
		 */
		listElements: ['li', 'ol', 'ul'],

		/**
		 * Splits a DOM element at the given position up until the limiting object(s), so that it is valid HTML again afterwards.
		 * @param {RangeObject} range Range object that indicates the position of the splitting.
		 *				This range will be updated, so that it represents the same range as before the split.
		 * @param {jQuery} limit Limiting node(s) for the split.
		 *				The limiting node will not be included in the split itself.
		 *				If no limiting object is set, the document body will be the limiting object.
		 * @param {boolean} atEnd If set to true, the DOM will be splitted at the end of the range otherwise at the start.
		 * @return {object} jQuery object containing the two root DOM objects of the split, true if the DOM did not need to be split or false if the DOM could not be split
		 * @method
		 */
		split: function (range, limit, atEnd) {
			var splitElement = jQuery(range.startContainer),
				splitPosition = range.startOffset,
				updateRange,
			    path,
			    parents,
				newDom,
			    insertElement,
			    secondPart,
				i,
			    pathLength,
			    element,
			    jqelement,
			    children,
			    newElement,
				next,
			    prev,
			    offset;

			if (atEnd) {
				splitElement = jQuery(range.endContainer);
				splitPosition = range.endOffset;
			}

			if (limit.length < 1) {
				limit = jQuery(document.body);
			}

			// we may have to update the range if it is not collapsed and we are splitting at the start
			updateRange = (!range.isCollapsed() && !atEnd);

			// find the path up to the highest object that will be splitted
			parents = splitElement.parents().get();
			parents.unshift(splitElement.get(0));

			jQuery.each(parents, function (index, element) {
				var isLimit = limit.filter(
					function () {
						return this == element;
					}
				).length;
				if (isLimit) {
					if (index > 0) {
						path = parents.slice(0, index);
					}
					return false;
				}
			});

			// nothing found to split -> return here
			if (!path) {
				return true;
			}

			path = path.reverse();

			// iterate over the path, create new dom nodes for every element and move
			// the contents right of the split to the new element
			for (i = 0, pathLength = path.length; i < pathLength; ++i) {
				element = path[i];
				if (i === pathLength - 1) {
					// last element in the path -> we have to split it

					// split the last part into two parts
					if (element.nodeType === 3) {
						// text node
						secondPart = document.createTextNode(element.data.substring(splitPosition, element.data.length));
						element.data = element.data.substring(0, splitPosition);
					} else {
						// other nodes
						jqelement = jQuery(element);
						children = jqelement.contents();
						newElement = jqelement.clone(false).empty();
						secondPart = newElement.append(children.slice(splitPosition, children.length)).get(0);
					}

					// update the range if necessary
					if (updateRange && range.endContainer === element) {
						range.endContainer = secondPart;
						range.endOffset -= splitPosition;
						range.clearCaches();
					}

					// add the second part
					if (insertElement) {
						insertElement.prepend(secondPart);
					} else {
						jQuery(element).after(secondPart);
					}
				} else {
					// create the new element of the same type and prepend it to the previously created element
					newElement = jQuery(element).clone(false).empty();

					if (!newDom) {
						newDom = newElement;
					} else {
						insertElement.prepend(newElement);
					}
					insertElement = newElement;

					// move all contents right of the split to the new element
					while (true) {
						next = path[i + 1].nextSibling;
						if (!next) {
							break;
						}
						insertElement.append(next);
					}

					// update the range if necessary
					if (updateRange && range.endContainer === element) {
						range.endContainer = newElement.get(0);
						prev = path[i + 1];
						offset = 0;
						while (true) {
							prev = prev.previousSibling;
							if (!prev) {
								break;
							}
							offset++;
						}
						range.endOffset -= offset;
						range.clearCaches();
					}
				}
			}

			// append the new dom
			jQuery(path[0]).after(newDom);

			return jQuery([path[0], newDom ? newDom.get(0) : secondPart]);
		},

		/**
		 * Check whether the HTML 5 specification allows direct nesting of the given DOM
		 * objects.
		 * @param {object} outerDOMObject
		 *            outer (nesting) DOM Object
		 * @param {object} innerDOMObject
		 *            inner (nested) DOM Object
		 * @return {boolean} true when the nesting is allowed, false if not
		 * @method
		 */
		allowsNesting: function (outerDOMObject, innerDOMObject) {
			if (!outerDOMObject || !outerDOMObject.nodeName || !innerDOMObject || !innerDOMObject.nodeName) {
				return false;
			}

			var outerNodeName = outerDOMObject.nodeName.toLowerCase(),
				innerNodeName = innerDOMObject.nodeName.toLowerCase();

			if (!this.children[outerNodeName]) {
				return false;
			}

			// check whether the nesting is configured by node names (like for table)
			if (this.children[outerNodeName] == innerNodeName) {
				return true;
			}
			if (jQuery.isArray(this.children[outerNodeName]) && jQuery.inArray(innerNodeName, this.children[outerNodeName]) >= 0) {
				return true;
			}

			if (jQuery.isArray(this.tags[this.children[outerNodeName]])
				    && jQuery.inArray(innerNodeName, this.tags[this.children[outerNodeName]]) >= 0) {
				return true;
			}

			return false;
		},

		/**
		 * Apply the given markup additively to the given range. The given rangeObject will be modified if necessary
		 * @param {GENTICS.Utils.RangeObject} rangeObject range to which the markup shall be added
		 * @param {jQuery} markup markup to be applied as jQuery object
		 * @param {boolean} allownesting true when nesting of the added markup is allowed, false if not (default: false)
		 * @method
		 */
		addMarkup: function (rangeObject, markup, nesting) {
			// split partially contained text nodes at the start and end of the range
			if (rangeObject.startContainer.nodeType === 3
				    && rangeObject.startOffset > 0
				    && rangeObject.startOffset < rangeObject.startContainer.data.length) {
				this.split(rangeObject, jQuery(rangeObject.startContainer).parent(), false);
			}
			if (rangeObject.endContainer.nodeType === 3 && rangeObject.endOffset > 0 && rangeObject.endOffset < rangeObject.endContainer.data.length) {
				this.split(rangeObject, jQuery(rangeObject.endContainer).parent(), true);
			}

			// get the range tree
			var rangeTree = rangeObject.getRangeTree();
			this.recursiveAddMarkup(rangeTree, markup, rangeObject, nesting);

			// cleanup DOM
			this.doCleanup({
				'merge': true,
				'removeempty': true
			}, rangeObject);
		},

		/**
		 * Recursive helper method to add the given markup to the range
		 * @param rangeTree rangetree at the current level
		 * @param markup markup to be applied
		 * @param rangeObject range object, which eventually is updated
		 * @param nesting true when nesting of the added markup is allowed, false if not
		 * @hide
		 */
		recursiveAddMarkup: function (rangeTree, markup, rangeObject, nesting) {
			var i, innerRange, rangeLength;

			// iterate through all rangetree objects of that level
			for (i = 0, rangeLength = rangeTree.length; i < rangeLength; ++i) {
				// check whether the rangetree object is fully contained and the markup may be wrapped around the object
				if (rangeTree[i].type == 'full' && this.allowsNesting(markup.get(0), rangeTree[i].domobj)) {
					// we wrap the object, when
					// 1. nesting of markup is allowed or the node is not of the markup to be added
					// 2. the node an element node or a non-empty text node
					if ((nesting || rangeTree[i].domobj.nodeName != markup.get(0).nodeName) && (rangeTree[i].domobj.nodeType !== 3 || jQuery.trim(rangeTree[i].domobj.data).length !== 0)) {
						// wrap the object
						jQuery(rangeTree[i].domobj).wrap(markup);

						// TODO eventually update the range (if it changed)

						// when nesting is not allowed, we remove the markup from the inner element
						if (!nesting && rangeTree[i].domobj.nodeType !== 3) {
							innerRange = new GENTICS.Utils.RangeObject();
							innerRange.startContainer = innerRange.endContainer = rangeTree[i].domobj.parentNode;
							innerRange.startOffset = 0;
							innerRange.endOffset = innerRange.endContainer.childNodes.length;
							this.removeMarkup(innerRange, markup, jQuery(rangeTree[i].domobj.parentNode));
						}
					}
				} else {
					// TODO check whether the object may be replaced by the given markup
					//if (false) {
					// TODO replace
					//} else {
					// recurse into the children (if any), but not if nesting is not
					// allowed and the object is of the markup to be added
					if ((nesting || (rangeTree[i].domobj && rangeTree[i].domobj.nodeName !== markup.get(0).nodeName)) && rangeTree[i].children && rangeTree[i].children.length > 0) {
						this.recursiveAddMarkup(rangeTree[i].children, markup);
					}
				}
			}
		},

		/**
		 * Find the highest occurrence of a node with given nodename within the parents
		 * of the start. When limit objects are given, the search stops there.
		 * The limiting object is of the found type, it won't be considered
		 * @param {DOMObject} start start object
		 * @param {String} nodeName name of the node to search for (case-insensitive)
		 * @param {jQuery} limit Limiting node(s) as jQuery object (if none given, the search will stop when there are no more parents)
		 * @return {DOMObject} the found DOM object or undefined
		 * @method
		 */
		findHighestElement: function (start, nodeName, limit) {
			nodeName = nodeName.toLowerCase();

			// this will be the highest found markup object (up to a limit object)
			var highestObject,
			// blah
			    testObject = start,
				// helper function to stop when we reach a limit object
				isLimit = limit ? function () {
					return limit.filter(
						function () {
							return testObject == this;
						}
					).length;
				} : function () {
					return false;
				};

			// now get the highest parent that has the given markup (until we reached
			// one of the limit objects or there are no more parent nodes)
			while (!isLimit() && testObject) {
				if (testObject.nodeName.toLowerCase() === nodeName) {
					highestObject = testObject;
				}
				testObject = testObject.parentNode;
			}

			return highestObject;
		},

		/**
		 * Remove the given markup from the given range. The given rangeObject will be modified if necessary
		 * TODO: add parameter deep/shallow
		 * @param {GENTICS.Utils.RangeObject} rangeObject range from which the markup shall be removed
		 * @param {jQuery} markup markup to be removed as jQuery object
		 * @param {jQuery} limit Limiting node(s) as jQuery object
		 * @method
		 */
		removeMarkup: function (rangeObject, markup, limit) {
			var nodeName = markup.get(0).nodeName,
				startSplitLimit = this.findHighestElement(rangeObject.startContainer, nodeName, limit),
				endSplitLimit = this.findHighestElement(rangeObject.endContainer, nodeName, limit),
				didSplit = false,
				highestObject,
			    root,
			    rangeTree;

			if (startSplitLimit && rangeObject.startOffset > 0) {
				// when the start is in the start of its container, we don't split
				this.split(rangeObject, jQuery(startSplitLimit).parent(), false);
				didSplit = true;
			}

			if (endSplitLimit) {
				// when the end is in the end of its container, we don't split
				if (rangeObject.endContainer.nodeType === 3 && rangeObject.endOffset < rangeObject.endContainer.data.length) {
					this.split(rangeObject, jQuery(endSplitLimit).parent(), true);
					didSplit = true;
				}
				if (rangeObject.endContainer.nodeType === 1 && rangeObject.endOffset < rangeObject.endContainer.childNodes.length) {
					this.split(rangeObject, jQuery(endSplitLimit).parent(), true);
					didSplit = true;
				}
			}

			// when we split the DOM, we maybe need to correct the range
			if (didSplit) {
				rangeObject.correctRange();
			}

			// find the highest occurrence of the markup
			highestObject = this.findHighestElement(rangeObject.getCommonAncestorContainer(), nodeName, limit);
			root = highestObject ? highestObject.parentNode : rangeObject.getCommonAncestorContainer();

			if (root) {
				// construct the range tree
				rangeTree = rangeObject.getRangeTree(root);

				// remove the markup from the range tree
				this.recursiveRemoveMarkup(rangeTree, markup);

				// cleanup DOM
				this.doCleanup({
					'merge': true,
					'removeempty': true
				}, rangeObject, root);
			}
		},

		/**
		 * TODO: pass the range itself and eventually update it if necessary
		 * Recursive helper method to remove the given markup from the range
		 * @param rangeTree rangetree at the current level
		 * @param markup markup to be applied
		 * @hide
		 */
		recursiveRemoveMarkup: function (rangeTree, markup) {
			var i, rangeLength, content;
			// iterate over the rangetree objects of this level
			for (i = 0, rangeLength = rangeTree.length; i < rangeLength; ++i) {
				// check whether the object is the markup to be removed and is fully into the range
				if (rangeTree[i].type == 'full' && rangeTree[i].domobj.nodeName == markup.get(0).nodeName) {
					// found the markup, so remove it
					content = jQuery(rangeTree[i].domobj).contents();
					if (content.length > 0) {
						// when the object has children, we unwrap them
						content.first().unwrap();
					} else {
						// obj has no children, so just remove it
						jQuery(rangeTree[i].domobj).remove();
					}
				}

				// if the object has children, we do the recursion now
				if (rangeTree[i].children) {
					this.recursiveRemoveMarkup(rangeTree[i].children, markup);
				}
			}
		},

		/**
		 * Cleanup the DOM, starting with the given startobject (or the common ancestor container of the given range)
		 * ATTENTION: If range is a selection you need to update the selection after doCleanup
		 * Cleanup modes (given as properties in 'cleanup'):
		 * <pre>
		 * - merge: merges multiple successive nodes of same type, if this is allowed, starting at the children of the given node (defaults to false)
		 * - removeempty: removes empty element nodes (defaults to false)
		 * - mergeable: Custom function to predicate whether or not a given
		 *              element should be mergeable. Overrides `mergeableTags'.
		 * </pre>
		 * Example for calling this method:<br/>
		 * <code>GENTICS.Utils.Dom.doCleanup({merge:true,removeempty:false}, range)</code>
		 * @param {object} cleanup type of cleanup to be done
		 * @param {GENTICS.Utils.RangeObject} rangeObject range which is eventually updated
		 * @param {DOMObject} start start object, if not given, the commonancestorcontainer is used as startobject insted
		 * @return {boolean} true when the range (startContainer/startOffset/endContainer/endOffset) was modified, false if not
		 * @method
		 */
		doCleanup: function (cleanup, rangeObject, start) {
			var that = this,
				prevNode,
			    modifiedRange,
			    startObject,
			    startOffset,
			    endOffset;

			if (typeof cleanup === 'undefined') {
				cleanup = {};
			}
			if (typeof cleanup.merge === 'undefined') {
				cleanup.merge = false;
			}
			if (typeof cleanup.removeempty === 'undefined') {
				cleanup.removeempty = false;
			}

			if (typeof start === 'undefined' && rangeObject) {
				start = rangeObject.getCommonAncestorContainer();
			}
			// remember the previous node here (successive nodes of same type will be merged into this)
			prevNode = false;
			// check whether the range needed to be modified during merging
			modifiedRange = false;
			// get the start object
			startObject = jQuery(start);
			startOffset = rangeObject.startOffset;
			endOffset = rangeObject.endOffset;

			// iterate through all sub nodes
			startObject.contents().each(function () {
				var index;

				// Try to read the nodeType property and return if we do not have permission
				// ie.: frame document to an external URL
				var nodeType;
				try {
					nodeType = this.nodeType;
					index = that.getIndexInParent(this);
				} catch (e) {
					return;
				}

				// decide further actions by node type
				switch (nodeType) {
					// found a non-text node
				case 1:
					if (prevNode && prevNode.nodeName == this.nodeName) {
						// found a successive node of same type

						// now we check whether the selection starts or ends in the mother node after the current node
						if (rangeObject.startContainer === startObject && startOffset > index) {
							// there will be one less object, so reduce the startOffset by one
							rangeObject.startOffset -= 1;
							// set the flag for range modification
							modifiedRange = true;
						}
						if (rangeObject.endContainer === startObject && endOffset > index) {
							// there will be one less object, so reduce the endOffset by one
							rangeObject.endOffset -= 1;
							// set the flag for range modification
							modifiedRange = true;
						}

						// merge the contents of this node into the previous one
						jQuery(prevNode).append(jQuery(this).contents());

						// after merging, we eventually need to cleanup the prevNode again
						modifiedRange |= that.doCleanup(cleanup, rangeObject, prevNode);

						// remove this node
						jQuery(this).remove();

					} else {

						// do the recursion step here
						modifiedRange |= that.doCleanup(cleanup, rangeObject, this);

						// eventually remove empty elements
						var removed = false;
						if (cleanup.removeempty) {
							if (GENTICS.Utils.Dom.isBlockLevelElement(this) && this.childNodes.length === 0) {
								//							jQuery(this).remove();
								removed = true;
							}
							if (jQuery.inArray(this.nodeName.toLowerCase(), that.mergeableTags) >= 0 && jQuery(this).text().length === 0 && this.childNodes.length === 0) {
								//							jQuery(this).remove();
								removed = true;
							}
						}

						// when the current node was not removed, we eventually store it as previous (mergeable) tag
						if (!removed) {
							if (cleanup.mergeable
									? cleanup.mergeable(this)
									: jQuery.inArray(this.nodeName.toLowerCase(), that.mergeableTags) >= 0) {
								prevNode = this;
							} else {
								prevNode = false;
							}
						} else {
							// now we check whether the selection starts or ends in the mother node of this
							if (rangeObject.startContainer === this.parentNode && startOffset > index) {
								// there will be one less object, so reduce the startOffset by one
								rangeObject.startOffset = rangeObject.startOffset - 1;
								// set the flag for range modification
								modifiedRange = true;
							}
							if (rangeObject.endContainer === this.parentNode && endOffset > index) {
								// there will be one less object, so reduce the endOffset by one
								rangeObject.endOffset = rangeObject.endOffset - 1;
								// set the flag for range modification
								modifiedRange = true;
							}

							// remove this text node
							jQuery(this).remove();

						}
					}

					break;
					// found a text node
				case 3:
					// found a text node
					if (prevNode && prevNode.nodeType === 3 && cleanup.merge) {
						// the current text node will be merged into the last one, so
						// check whether the selection starts or ends in the current
						// text node
						if (rangeObject.startContainer === this) {
							// selection starts in the current text node

							// update the start container to the last node
							rangeObject.startContainer = prevNode;

							// update the start offset
							rangeObject.startOffset += prevNode.nodeValue.length;

							// set the flag for range modification
							modifiedRange = true;

						} else if (rangeObject.startContainer === prevNode.parentNode && rangeObject.startOffset === that.getIndexInParent(prevNode) + 1) {
							// selection starts right between the previous and current text nodes (which will be merged)

							// update the start container to the previous node
							rangeObject.startContainer = prevNode;

							// set the start offset
							rangeObject.startOffset = prevNode.nodeValue.length;

							// set the flag for range modification
							modifiedRange = true;
						}

						if (rangeObject.endContainer === this) {
							// selection ends in the current text node

							// update the end container to be the last node
							rangeObject.endContainer = prevNode;

							// update the end offset
							rangeObject.endOffset += prevNode.nodeValue.length;

							// set the flag for range modification
							modifiedRange = true;

						} else if (rangeObject.endContainer === prevNode.parentNode && rangeObject.endOffset === that.getIndexInParent(prevNode) + 1) {
							// selection ends right between the previous and current text nodes (which will be merged)

							// update the end container to the previous node
							rangeObject.endContainer = prevNode;

							// set the end offset
							rangeObject.endOffset = prevNode.nodeValue.length;

							// set the flag for range modification
							modifiedRange = true;
						}

						// now append the contents of the current text node into the previous
						prevNode.data += this.data;

						// remove empty text nodes	
					} else if (!(this.nodeValue === '' && cleanup.removeempty)) {
						prevNode = this;
						// we are finish here don't delete this node
						break;
					}

					// now we check whether the selection starts or ends in the mother node of this
					if (rangeObject.startContainer === this.parentNode && rangeObject.startOffset > index) {
						// there will be one less object, so reduce the startOffset by one
						rangeObject.startOffset = rangeObject.startOffset - 1;
						// set the flag for range modification
						modifiedRange = true;
					}
					if (rangeObject.endContainer === this.parentNode && rangeObject.endOffset > index) {
						// there will be one less object, so reduce the endOffset by one
						rangeObject.endOffset = rangeObject.endOffset - 1;
						// set the flag for range modification
						modifiedRange = true;
					}

					// remove this text node
					jQuery(this).remove();

					// if this is the last text node in a sequence, we remove any zero-width spaces in the text node,
					// unless it is the only character
					if (prevNode && (!prevNode.nextSibling || prevNode.nextSibling.nodeType !== 3)) {
						var pos;
						for (pos = prevNode.data.length - 1; pos >= 0 && prevNode.data.length > 1; pos--) {
							if (prevNode.data.charAt(pos) === '\u200b') {
								prevNode.deleteData(pos, 1);
								if (rangeObject.startContainer === prevNode && rangeObject.startOffset > pos) {
									rangeObject.startOffset--;
									modifiedRange = true;
								}
								if (rangeObject.endContainer === prevNode && rangeObject.endOffset > pos) {
									rangeObject.endOffset--;
									modifiedRange = true;
								}
							}
						}
					}

					break;
				}
			});

			// eventually remove the startnode itself
			//		if (cleanup.removeempty
			//				&& GENTICS.Utils.Dom.isBlockLevelElement(start)
			//				&& (!start.childNodes || start.childNodes.length === 0)) {
			//			if (rangeObject.startContainer == start) {
			//				rangeObject.startContainer = start.parentNode;
			//				rangeObject.startOffset = GENTICS.Utils.Dom.getIndexInParent(start);
			//			}
			//			if (rangeObject.endContainer == start) {
			//				rangeObject.endContainer = start.parentNode;
			//				rangeObject.endOffset = GENTICS.Utils.Dom.getIndexInParent(start);
			//			}
			//			startObject.remove();
			//			modifiedRange = true;
			//		}

			if (modifiedRange) {
				rangeObject.clearCaches();
			}

			return modifiedRange;
		},

		/**
		 * Get the index of the given node within its parent node
		 * @param {DOMObject} node node to check
		 * @return {Integer} index in the parent node or false if no node given or node has no parent
		 * @method
		 */
		getIndexInParent: function (node) {
			if (!node) {
				return false;
			}

			var index = 0,
				check = node.previousSibling;

			while (check) {
				index++;
				check = check.previousSibling;
			}

			return index;
		},

		/**
		 * Check whether the given node is a blocklevel element
		 * @param {DOMObject} node node to check
		 * @return {boolean} true if yes, false if not (or null)
		 * @method
		 */
		isBlockLevelElement: function (node) {
			if (!node) {
				return false;
			}
			if (node.nodeType === 1 && jQuery.inArray(node.nodeName.toLowerCase(), this.blockLevelElements) >= 0) {
				return true;
			}
			return false;
		},

		/**
		 * Check whether the given node is a linebreak element
		 * @param {DOMObject} node node to check
		 * @return {boolean} true for linebreak elements, false for everything else
		 * @method
		 */
		isLineBreakElement: function (node) {
			if (!node) {
				return false;
			}
			return node.nodeType === 1 && node.nodeName.toLowerCase() == 'br';
		},

		/**
		 * Check whether the given node is a list element
		 * @param {DOMObject} node node to check
		 * @return {boolean} true for list elements (li, ul, ol), false for everything else
		 * @method
		 */
		isListElement: function (node) {
			if (!node) {
				return false;
			}
			return node.nodeType === 1 && jQuery.inArray(node.nodeName.toLowerCase(), this.listElements) >= 0;
		},

		/**
		 * This method checks, whether the passed dom object is a dom object, that would
		 * be split in cases of pressing enter. This currently is true for paragraphs
		 * and headings
		 * @param {DOMObject} el
		 *            dom object to check
		 * @return {boolean} true for split objects, false for other
		 * @method
		 */
		isSplitObject: function (el) {
			return el.nodeType === 1 && blockElementNames.hasOwnProperty(el.nodeName);
		},

		/**
		 * Starting with the given position (between nodes), search in the given direction to an adjacent notempty text node
		 * @param {DOMObject} parent parent node containing the position
		 * @param {Integer} index index of the position within the parent node
		 * @param {boolean} searchleft true when search direction is 'left' (default), false for 'right'
		 * @param {object} stopat define at which types of element we shall stop, may contain the following properties
		 * <pre>
		 * - blocklevel (default: true)
		 * - list (default: true)
		 * - linebreak (default: true)
		 * </pre>
		 * @return {DOMObject} the found text node or false if none found
		 * @method
		 */
		searchAdjacentTextNode: function (parent, index, searchleft, stopat) {
			if (!parent || parent.nodeType !== 1 || index < 0 || index > parent.childNodes.length) {
				return false;
			}

			if (typeof stopat === 'undefined') {
				stopat = {
					'blocklevel': true,
					'list': true,
					'linebreak': true
				};
			}

			if (typeof stopat.blocklevel === 'undefined') {
				stopat.blocklevel = true;
			}
			if (typeof stopat.list === 'undefined') {
				stopat.list = true;
			}
			if (typeof stopat.linebreak === 'undefined') {
				stopat.linebreak = true;
			}

			if (typeof searchleft === 'undefined') {
				searchleft = true;
			}

			var nextNode,
			    currentParent = parent;

			// start at the node left/right of the given position
			if (searchleft && index > 0) {
				nextNode = parent.childNodes[index - 1];
			}
			if (!searchleft && index < parent.childNodes.length) {
				nextNode = parent.childNodes[index];
			}

			//currentParent is not a number therefore it is sufficient to directly test for it with while(currentParent)
			//otherwise there would be an error if the object is null
			while (currentParent) {
				//while (typeof currentParent !== 'undefined') {
				if (!nextNode) {
					// no next node found, check whether the parent is a blocklevel element
					if (stopat.blocklevel && this.isBlockLevelElement(currentParent)) {
						// do not leave block level elements
						return false;
					}
					if (stopat.list && this.isListElement(currentParent)) {
						// do not leave list elements
						return false;
					}
					// continue with the parent
					nextNode = searchleft ? currentParent.previousSibling : currentParent.nextSibling;
					currentParent = currentParent.parentNode;
					continue;
				} else if (nextNode.nodeType === 3 && jQuery.trim(nextNode.data).length > 0) {
					// we are lucky and found a notempty text node
					return nextNode;
				}
				if (stopat.blocklevel && this.isBlockLevelElement(nextNode)) {
					// we found a blocklevel element, stop here
					return false;
				}
				if (stopat.linebreak && this.isLineBreakElement(nextNode)) {
					// we found a linebreak, stop here
					return false;
				}
				if (stopat.list && this.isListElement(nextNode)) {
					// we found a linebreak, stop here
					return false;
				}
				if (nextNode.nodeType === 3) {
					// we found an empty text node, so step to the next
					nextNode = searchleft ? nextNode.previousSibling : nextNode.nextSibling;
				} else {
					// we found a non-blocklevel element, step into
					currentParent = nextNode;
					nextNode = searchleft ? nextNode.lastChild : nextNode.firstChild;
				}
			}
		},

		/**
		 * Insert the given DOM Object into the start/end of the given range. The method
		 * will find the appropriate place in the DOM tree for inserting the given
		 * object, and will eventually split elements in between. The given range will
		 * be updated if necessary. The updated range will NOT embrace the inserted
		 * object, which means that the object is actually inserted before or after the
		 * given range (depending on the atEnd parameter)
		 *
		 * @param {jQuery}
		 *				object object to insert into the DOM
		 * @param {GENTICS.Utils.RangeObject}
		 *				range range where to insert the object (at start or end)
		 * @param {jQuery}
		 *				limit limiting object(s) of the DOM modification
		 * @param {boolean}
		 *				atEnd true when the object shall be inserted at the end, false for
		 *				insertion at the start (default)
		 * @param {boolean}
		 *				true when the insertion shall be done, even if inserting the element
		 *				would not be allowed, false to deny inserting unallowed elements (default)
		 * @return true if the object could be inserted, false if not.
		 * @method
		 */
		insertIntoDOM: function (object, range, limit, atEnd, force) {
			// first find the appropriate place to insert the given object
			var parentElements = range.getContainerParents(limit, atEnd),
				that = this,
				newParent,
				container,
			    offset,
			    splitParts,
			    contents;

			if (!limit) {
				limit = jQuery(document.body);
			}

			// if no parent elements exist (up to the limit), the new parent will be the
			// limiter itself
			if (parentElements.length === 0) {
				newParent = limit.get(0);
			} else {
				jQuery.each(parentElements, function (index, parent) {
					if (that.allowsNesting(parent, object.get(0))) {
						newParent = parent;
						return false;
					}
				});
			}

			if (typeof newParent === 'undefined' && limit.length > 0) {
				// found no possible new parent, so split up to the limit object
				newParent = limit.get(0);
			}

			// check whether it is allowed to insert the element at all
			if (!this.allowsNesting(newParent, object.get(0)) && !force) {
				return false;
			}

			if (typeof newParent !== 'undefined') {
				// we found a possible new parent, so we split the DOM up to the new parent
				splitParts = this.split(range, jQuery(newParent), atEnd);
				if (splitParts === true) {
					// DOM was not split (there was no need to split it), insert the new object anyway
					container = range.startContainer;
					offset = range.startOffset;
					if (atEnd) {
						container = range.endContainer;
						offset = range.endOffset;
					}
					if (offset === 0) {
						// insert right before the first element in the container
						contents = jQuery(container).contents();
						if (contents.length > 0) {
							contents.eq(0).before(object);
						} else {
							jQuery(container).append(object);
						}
						return true;
					}
					// insert right after the element at offset-1
					jQuery(container).contents().eq(offset - 1).after(object);
					return true;
				}
				if (splitParts) {
					// if the DOM could be split, we insert the new object in between the split parts
					splitParts.eq(0).after(object);
					return true;
				}
				// could not split, so could not insert
				return false;
			}
			// found no possible new parent, so we shall not insert
			return false;
		},

		/**
		 * Remove the given DOM object from the DOM and modify the given range to reflect the user expected range after the object was removed
		 * TODO: finish this
		 * @param {DOMObject} object DOM object to remove
		 * @param {GENTICS.Utils.RangeObject} range range which eventually be modified
		 * @param {boolean} preserveContent true if the contents of the removed DOM object shall be preserved, false if not (default: false)
		 * @return true if the DOM object could be removed, false if not
		 * @hide
		 */
		removeFromDOM: function (object, range, preserveContent) {
			if (preserveContent) {
				// check whether the range will need modification
				var indexInParent = this.getIndexInParent(object),
					numChildren = jQuery(object).contents().length,
					parent = object.parentNode;

				if (range.startContainer == parent && range.startOffset > indexInParent) {
					range.startOffset += numChildren - 1;
				} else if (range.startContainer == object) {
					range.startContainer = parent;
					range.startOffset = indexInParent + range.startOffset;
				}

				if (range.endContainer == parent && range.endOffset > indexInParent) {
					range.endOffset += numChildren - 1;
				} else if (range.endContainer == object) {
					range.endContainer = parent;
					range.endOffset = indexInParent + range.endOffset;
				}

				// we simply unwrap the children of the object
				jQuery(object).contents().unwrap();

				// optionally do cleanup
				this.doCleanup({
					'merge': true
				}, range, parent);
			}
		},

		/**
		 * Remove the content defined by the given range from the DOM. Update the given
		 * range object to be a collapsed selection at the place of the previous
		 * selection.
		 * @param rangeObject range object
		 * @return true if the range could be removed, false if not
		 */
		removeRange: function (rangeObject) {
			if (!rangeObject) {
				// no range given
				return false;
			}
			if (rangeObject.isCollapsed()) {
				// the range is collapsed, nothing to delete
				return false;
			}

			// split partially contained text nodes at the start and end of the range
			if (rangeObject.startContainer.nodeType == 3
				    && rangeObject.startOffset > 0
				    && rangeObject.startOffset < rangeObject.startContainer.data.length) {
				this.split(rangeObject, jQuery(rangeObject.startContainer).parent(), false);
			}
			if (rangeObject.endContainer.nodeType == 3 && rangeObject.endOffset > 0 && rangeObject.endOffset < rangeObject.endContainer.data.length) {
				this.split(rangeObject, jQuery(rangeObject.endContainer).parent(), true);
			}

			// construct the range tree
			var rangeTree = rangeObject.getRangeTree();

			// collapse the range
			rangeObject.endContainer = rangeObject.startContainer;
			rangeObject.endOffset = rangeObject.startOffset;

			// remove the markup from the range tree
			this.recursiveRemoveRange(rangeTree, rangeObject);

			// do some cleanup
			this.doCleanup({
				'merge': true
			}, rangeObject);
			//		this.doCleanup({'merge' : true, 'removeempty' : true}, rangeObject);

			// clear the caches of the range object
			rangeObject.clearCaches();
		},

		recursiveRemoveRange: function (rangeTree, rangeObject) {
			// iterate over the rangetree objects of this level
			var i;
			for (i = 0; i < rangeTree.length; ++i) {
				// check for nodes fully in the range
				if (rangeTree[i].type == 'full') {
					// if the domobj is the startcontainer, or the startcontainer is inside the domobj, we need to update the rangeObject
					if (jQuery(rangeObject.startContainer).parents().andSelf().filter(rangeTree[i].domobj).length > 0) {
						rangeObject.startContainer = rangeObject.endContainer = rangeTree[i].domobj.parentNode;
						rangeObject.startOffset = rangeObject.endOffset = this.getIndexInParent(rangeTree[i].domobj);
					}

					// remove the object from the DOM
					jQuery(rangeTree[i].domobj).remove();
				} else if (rangeTree[i].type == 'partial' && rangeTree[i].children) {
					// node partially selected and has children, so do recursion
					this.recursiveRemoveRange(rangeTree[i].children, rangeObject);
				}
			}
		},

		/**
		 * Extend the given range to have start and end at the nearest word boundaries to the left (start) and right (end)
		 * @param {GENTICS.Utils.RangeObject} range range to be extended
		 * @param {boolean} fromBoundaries true if extending will also be done, if one or both ends of the range already are at a word boundary, false if not, default: false
		 * @method
		 */
		extendToWord: function (range, fromBoundaries) {
			// search the word boundaries to the left and right
			var leftBoundary = this.searchWordBoundary(range.startContainer, range.startOffset, true),
				rightBoundary = this.searchWordBoundary(range.endContainer, range.endOffset, false);

			// check whether we must not extend the range from word boundaries
			if (!fromBoundaries) {
				// we only extend the range if both ends would be different
				if (range.startContainer == leftBoundary.container && range.startOffset == leftBoundary.offset) {
					return;
				}
				if (range.endContainer == rightBoundary.container && range.endOffset == rightBoundary.offset) {
					return;
				}
			}

			// set the new boundaries
			range.startContainer = leftBoundary.container;
			range.startOffset = leftBoundary.offset;
			range.endContainer = rightBoundary.container;
			range.endOffset = rightBoundary.offset;

			// correct the range
			range.correctRange();

			// clear caches
			range.clearCaches();
		},

		/**
		 * Helper method to check whether the given DOM object is a word boundary.
		 * @param {DOMObject} object DOM object in question
		 * @return {boolean} true when the DOM object is a word boundary, false if not
		 * @hide
		 */
		isWordBoundaryElement: function (object) {
			if (!object || !object.nodeName) {
				return false;
			}
			return jQuery.inArray(object.nodeName.toLowerCase(), this.nonWordBoundaryTags) == -1;
		},

		/**
		 * Search for the next word boundary, starting at the given position
		 * @param {DOMObject} container container of the start position
		 * @param {Integer} offset offset of the start position
		 * @param {boolean} searchleft true for searching to the left, false for searching to the right (default: true)
		 * @return {object} object with properties 'container' and 'offset' marking the found word boundary
		 * @method
		 */
		searchWordBoundary: function (container, offset, searchleft) {
			if (typeof searchleft === 'undefined') {
				searchleft = true;
			}
			var boundaryFound = false,
				wordBoundaryPos,
			    tempWordBoundaryPos,
			    textNode;
			while (!boundaryFound) {
				// check the node type
				if (container.nodeType === 3) {
					// we are currently in a text node

					// find the nearest word boundary character
					if (!searchleft) {
						// search right
						wordBoundaryPos = container.data.substring(offset).search(this.nonWordRegex);
						if (wordBoundaryPos != -1) {
							// found a word boundary
							offset = offset + wordBoundaryPos;
							boundaryFound = true;
						} else {
							// found no word boundary, so we set the position after the container
							offset = this.getIndexInParent(container) + 1;
							container = container.parentNode;
						}
					} else {
						// search left
						wordBoundaryPos = container.data.substring(0, offset).search(this.nonWordRegex);
						tempWordBoundaryPos = wordBoundaryPos;
						while (tempWordBoundaryPos != -1) {
							wordBoundaryPos = tempWordBoundaryPos;
							tempWordBoundaryPos = container.data.substring(wordBoundaryPos + 1, offset).search(this.nonWordRegex);
							if (tempWordBoundaryPos != -1) {
								tempWordBoundaryPos = tempWordBoundaryPos + wordBoundaryPos + 1;
							}
						}

						if (wordBoundaryPos != -1) {
							// found a word boundary
							offset = wordBoundaryPos + 1;
							boundaryFound = true;
						} else {
							// found no word boundary, so we set the position before the container
							offset = this.getIndexInParent(container);
							container = container.parentNode;
						}
					}
				} else if (container.nodeType === 1) {
					// we are currently in an element node (between nodes)

					if (!searchleft) {
						// check whether there is an element to the right
						if (offset < container.childNodes.length) {
							// there is an element to the right, check whether it is a word boundary element
							if (this.isWordBoundaryElement(container.childNodes[offset])) {
								// we are done
								boundaryFound = true;
							} else {
								// element to the right is no word boundary, so enter it
								container = container.childNodes[offset];
								offset = 0;
							}
						} else {
							// no element to the right, check whether the element itself is a boundary element
							if (this.isWordBoundaryElement(container)) {
								// we are done
								boundaryFound = true;
							} else {
								// element itself is no boundary element, so go to parent
								offset = this.getIndexInParent(container) + 1;
								container = container.parentNode;
							}
						}
					} else {
						// check whether there is an element to the left
						if (offset > 0) {
							// there is an element to the left, check whether it is a word boundary element
							if (this.isWordBoundaryElement(container.childNodes[offset - 1])) {
								// we are done
								boundaryFound = true;
							} else {
								// element to the left is no word boundary, so enter it
								container = container.childNodes[offset - 1];
								offset = container.nodeType === 3 ? container.data.length : container.childNodes.length;
							}
						} else {
							// no element to the left, check whether the element itself is a boundary element
							if (this.isWordBoundaryElement(container)) {
								// we are done
								boundaryFound = true;
							} else {
								// element itself is no boundary element, so go to parent
								offset = this.getIndexInParent(container);
								container = container.parentNode;
							}
						}
					}
				}
			}

			if (container.nodeType !== 3) {
				textNode = this.searchAdjacentTextNode(container, offset, !searchleft);
				if (textNode) {
					container = textNode;
					offset = searchleft ? 0 : container.data.length;
				}
			}

			return {
				'container': container,
				'offset': offset
			};
		},

		/**
		 * Check whether the given dom object is empty
		 * @param {DOMObject} domObject object to check
		 * @return {boolean} true when the object is empty, false if not
		 * @method
		 */
		isEmpty: function (domObject) {
			// a non dom object is considered empty
			if (!domObject) {
				return true;
			}

			// some tags are considered to be non-empty
			if (jQuery.inArray(domObject.nodeName.toLowerCase(), this.nonEmptyTags) != -1) {
				return false;
			}

			// text nodes are not empty, if they contain non-whitespace characters
			if (domObject.nodeType === 3) {
				return domObject.data.search(/\S/) == -1;
			}

			// all other nodes are not empty if they contain at least one child which is not empty
			var i, childNodes;
			for (i = 0, childNodes = domObject.childNodes.length; i < childNodes; ++i) {
				if (!this.isEmpty(domObject.childNodes[i])) {
					return false;
				}
			}

			// found no contents, so the element is empty
			return true;
		},

		/**
		 * Set the cursor (collapsed selection) right after the given DOM object
		 * @param domObject DOM object
		 * @method
		 */
		setCursorAfter: function (domObject) {
			var newRange = new GENTICS.Utils.RangeObject(),
				index = this.getIndexInParent(domObject),
				targetNode,
				offset;

			// selection cannot be set between to TEXT_NODEs
			// if domOject is a Text node set selection at last position in that node
			if (domObject.nodeType == 3) {
				targetNode = domObject;
				offset = targetNode.nodeValue.length;

				// if domOject is a Text node set selection at last position in that node
			} else if (domObject.nextSibling && domObject.nextSibling.nodeType == 3) {
				targetNode = domObject.nextSibling;
				offset = 0;
			} else {
				targetNode = domObject.parentNode;
				offset = this.getIndexInParent(domObject) + 1;
			}

			newRange.startContainer = newRange.endContainer = targetNode;
			newRange.startOffset = newRange.endOffset = offset;

			// select the range
			newRange.select();

			return newRange;
		},

		/**
		 * Select a DOM node
		 * will create a new range which spans the provided dom node and selects it afterwards
		 * @param domObject DOM object
		 * @method
		 */
		selectDomNode: function (domObject) {
			var newRange = new GENTICS.Utils.RangeObject();
			newRange.startContainer = newRange.endContainer = domObject.parentNode;
			newRange.startOffset = this.getIndexInParent(domObject);
			newRange.endOffset = newRange.startOffset + 1;
			newRange.select();
		},

		/**
		 * Set the cursor (collapsed selection) at the start into the given DOM object
		 * @param domObject DOM object
		 * @method
		 */
		setCursorInto: function (domObject) {
			// set a new range into the given dom object
			var newRange = new GENTICS.Utils.RangeObject();
			newRange.startContainer = newRange.endContainer = domObject;
			newRange.startOffset = newRange.endOffset = 0;

			// select the range
			newRange.select();
		},


		/**
		 * "An editing host is a node that is either an Element with a contenteditable
		 * attribute set to the true state, or the Element child of a Document whose
		 * designMode is enabled."
		 * @param domObject DOM object
		 * @method
		 */
		isEditingHost: function (node) {
			return node
				&& node.nodeType == 1 //ELEMENT_NODE
				&& (node.contentEditable == "true" || (node.parentNode && node.parentNode.nodeType == 9 //DOCUEMENT_NODE
													   && node.parentNode.designMode == "on"));
		},

		/**
		 * "Something is editable if it is a node which is not an editing host, does
		 * not have a contenteditable attribute set to the false state, and whose
		 * parent is an editing host or editable."
		 * @param domObject DOM object
		 * @method
		 */
		isEditable: function (node) {
			// This is slightly a lie, because we're excluding non-HTML elements with
			// contentEditable attributes.
			return node
				&& !this.isEditingHost(node)
				&& (node.nodeType != 1 || node.contentEditable != "false") // ELEMENT_NODE
				&& (this.isEditingHost(node.parentNode) || this.isEditable(node.parentNode));
		},

		/**
		 * "The editing host of node is null if node is neither editable nor an editing
		 * host; node itself, if node is an editing host; or the nearest ancestor of
		 * node that is an editing host, if node is editable."
		 * @param domObject DOM object
		 * @method
		 */
		getEditingHostOf: function (node) {
			if (this.isEditingHost(node)) {
				return node;
			}
			if (this.isEditable(node)) {
				var ancestor = node.parentNode;
				while (!this.isEditingHost(ancestor)) {
					ancestor = ancestor.parentNode;
				}
				return ancestor;
			}
			return null;
		},

		/**
		 * 
		 * "Two nodes are in the same editing host if the editing host of the first is
		 * non-null and the same as the editing host of the second."
		 * @param node1 DOM object
		 * @param node2 DOM object
		 * @method
		 */
		inSameEditingHost: function (node1, node2) {
			return this.getEditingHostOf(node1) && this.getEditingHostOf(node1) == this.getEditingHostOf(node2);
		},

		// "A block node is either an Element whose "display" property does not have
		// resolved value "inline" or "inline-block" or "inline-table" or "none", or a
		// Document, or a DocumentFragment."
		isBlockNode: function (node) {
			return node && ((node.nodeType == $_.Node.ELEMENT_NODE && $_(["inline", "inline-block", "inline-table", "none"]).indexOf($_.getComputedStyle(node).display) == -1) || node.nodeType == $_.Node.DOCUMENT_NODE || node.nodeType == $_.Node.DOCUMENT_FRAGMENT_NODE);
		},

		/**
		 * Get the first visible child of the given node.
		 * @param node node
		 * @param includeNode when set to true, the node itself may be returned, otherwise only children are allowed
		 * @return first visible child or null if none found
		 */
		getFirstVisibleChild: function (node, includeNode) {
			// no node -> no child
			if (!node) {
				return null;
			}

			// check whether the node itself is visible
			if ((node.nodeType == $_.Node.TEXT_NODE && this.isEmpty(node)) || (node.nodeType == $_.Node.ELEMENT_NODE && node.offsetHeight == 0 && jQuery.inArray(node.nodeName.toLowerCase(), this.nonEmptyTags) === -1)) {
				return null;
			}

			// if the node is a text node, or does not have children, or is not editable, it is the first visible child
			if (node.nodeType == $_.Node.TEXT_NODE || (node.nodeType == $_.Node.ELEMENT_NODE && node.childNodes.length == 0) || !jQuery(node).contentEditable()) {
				return includeNode ? node : null;
			}

			// otherwise traverse through the children
			var i;
			for (i = 0; i < node.childNodes.length; ++i) {
				var visibleChild = this.getFirstVisibleChild(node.childNodes[i], true);
				if (visibleChild != null) {
					return visibleChild;
				}
			}

			return null;
		},

		/**
		 * Get the last visible child of the given node.
		 * @param node node
		 * @param includeNode when set to true, the node itself may be returned, otherwise only children are allowed
		 * @return last visible child or null if none found
		 */
		getLastVisibleChild: function (node, includeNode) {
			// no node -> no child
			if (!node) {
				return null;
			}

			// check whether the node itself is visible
			if ((node.nodeType == $_.Node.TEXT_NODE && this.isEmpty(node)) || (node.nodeType == $_.Node.ELEMENT_NODE && node.offsetHeight == 0 && jQuery.inArray(node.nodeName.toLowerCase(), this.nonEmptyTags) === -1)) {
				return null;
			}

			// if the node is a text node, or does not have children, or is not editable, it is the first visible child
			if (node.nodeType == $_.Node.TEXT_NODE || (node.nodeType == $_.Node.ELEMENT_NODE && node.childNodes.length == 0) || !jQuery(node).contentEditable()) {
				return includeNode ? node : null;
			}

			// otherwise traverse through the children
			var i;
			for (i = node.childNodes.length - 1; i >= 0; --i) {
				var visibleChild = this.getLastVisibleChild(node.childNodes[i], true);
				if (visibleChild != null) {
					return visibleChild;
				}
			}

			return null;
		}
	});


	/**
	 * Create the singleton object
	 * @hide
	 */
	GENTICS.Utils.Dom = new Dom();

	return GENTICS.Utils.Dom;

});

/* pluginmanager.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor.
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php
 *
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
// Do not add dependencies that require depend on aloha/core
define('aloha/pluginmanager',[
	'jquery',
	'util/class'
], function (
	$,
	Class
) {
	

	var Aloha = window.Aloha;

	/**
	 * For each plugin setting, assigns it into its corresponding plugin.
	 *
	 * @param {Array.<Plugin>} plugins
	 * @param {object<string, object>} settings
	 */
	function mapSettingsIntoPlugins(plugins, settings) {
		var plugin;
		for (plugin in settings) {
			if (settings.hasOwnProperty(plugin) && plugins[plugin]) {
				plugins[plugin].settings = settings[plugin] || {};
			}
		}
	}

	/**
	 * Retrieves a set of plugins or the given `names' list, from among those
	 * specified in `plugins'.
	 *
	 * @param {object<string, object>} plugins
	 * @param {Array.<string>} names List of plugins names.
	 * @return {Array.<Plugins>} List of available plugins.
	 */
	function getPlugins(plugins, names) {
		var available = [];
		var plugin;
		var i;
		for (i = 0; i < names.length; i++) {
			plugin = plugins[names[i]];
			if (plugin) {
				available.push(plugin);
			}
		}
		return available;
	}

	/**
	 * Initializes the plugins in the given list.
	 *
	 * @param {Array.<Plugins>} plugins Plugins to initialize.
	 * @param {function} callback Function to invoke once all plugins have been
	 *                            successfully initialized.
	 */
	function initializePlugins(plugins, callback) {
		var numToEnable = plugins.length;
		var onInit = function () {
			if (0 === --numToEnable && callback) {
				callback();
			}
		};
		var i;
		var ret;
		var plugin;
		for (i = 0; i < plugins.length; i++) {
			plugin = plugins[i];
			plugin.settings = plugin.settings || {};
			if (typeof plugin.settings.enabled === 'undefined') {
				plugin.settings.enabled = true;
			}
			if (plugin.settings.enabled && plugin.checkDependencies()) {
				ret = plugin.init();
				if (ret && typeof ret.done === 'function') {
					ret.done(onInit);
				} else {
					onInit();
				}
			}
		}
	}

	/**
	 * The Plugin Manager controls the lifecycle of all Aloha Plugins.
	 *
	 * @namespace Aloha
	 * @class PluginManager
	 * @singleton
	 */
	return new (Class.extend({

		plugins: {},

		/**
		 * Initialize all registered plugins.
		 *
		 * @param {function} next Callback to invoke after plugins have
		 *                        succefully initialized.
		 * @param {Array.<string>} enabled A list of plugin names which are to
		 *                                 be enable.
		 */
		init: function (next, enabled) {
			var manager = this;
			var plugins = manager.plugins;

			mapSettingsIntoPlugins(plugins,
					Aloha && Aloha.settings && Aloha.settings.plugins);

			// Because all plugins are enabled by default if specific plugins
			// are not specified.
			var plugin;
			if (plugins && 0 === enabled.length) {
				enabled = [];
				for (plugin in plugins) {
					if (plugins.hasOwnProperty(plugin)) {
						enabled.push(plugin);
					}
				}
			}

			initializePlugins(getPlugins(plugins, enabled), next);
		},

		/**
		 * Register a plugin
		 * @param {Plugin} plugin plugin to register
		 */
		register: function (plugin) {

			if (!plugin.name) {
				throw new Error('Plugin does not have an name.');
			}

			if (this.plugins[plugin.name]) {
				throw new Error('Already registered the plugin "' + plugin.name + '"!');
			}

			this.plugins[plugin.name] = plugin;
		},

		/**
		 * Pass the given jQuery object, which represents an editable to all plugins, so that they can make the content clean (prepare for saving)
		 * @param obj jQuery object representing an editable
		 * @return void
		 * @hide
		 */
		makeClean: function (obj) {
			var i, plugin;
			// iterate through all registered plugins
			for (plugin in this.plugins) {
				if (this.plugins.hasOwnProperty(plugin)) {
					if (Aloha.Log.isDebugEnabled()) {
						Aloha.Log.debug(this, 'Passing contents of HTML Element with id { ' + obj.attr('id') + ' } for cleaning to plugin { ' + plugin + ' }');
					}
					this.plugins[plugin].makeClean(obj);
				}
			}
		},

		/**
		 * Expose a nice name for the Plugin Manager
		 * @hide
		 */
		toString: function () {
			return 'pluginmanager';
		}

	}))();
});

/*core.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor.
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php
 *
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('aloha/core',[
	'jquery',
	'aloha/pluginmanager'
], function (
	$,
	PluginManager
) {
	

	var Aloha = window.Aloha;

	/**
	 * Checks whether the current user agent is supported.
	 *
	 * @return {boolean} True if Aloha supports the current browser.
	 */
	function isBrowserSupported() {
		var browser = $.browser;
		var version = browser.version;
		return !(
			// Chrome/Safari 4
			(browser.webkit && parseFloat(version) < 532.5) ||
			// FF 3.5
			(browser.mozilla && parseFloat(version) < 1.9) ||
			// IE 7
			(browser.msie && version < 7) ||
			// Right now Opera needs some work
			(browser.opera && version < 11)
		);
	}

	/**
	 * Checks whether the given jQuery event originates from an Aloha dialog
	 * element.
	 *
	 * This is used to facilitate a hackish way of preventing blurring
	 * editables when interacting with Aloha UI modals.
	 *
	 * @param {jQuery<Event>} $event
	 * @return {boolean} True if $event is initiated from within an Aloha
	 *                   dialog element.
	 */
	function originatesFromDialog($event) {
		var $target = $($event.target);
		return $target.is('.aloha-dialog')
			|| $target.closest('.aloha').length;
	}

	/**
	 * Registers events on the documents to cause editables to be blurred when
	 * clicking outside of editables.
	 *
	 * Hack: Except when the click originates from a modal dialog.
	 */
	function registerEvents() {
		$('html').mousedown(function ($event) {
			if (Aloha.activeEditable && !Aloha.eventHandled
					&& !originatesFromDialog($event)) {
				Aloha.deactivateEditable();
			}
		}).mouseup(function () {
			Aloha.eventHandled = false;
		});
	}

	/**
	 * Initialize Aloha.
	 *
	 * @param {function} event Event to trigger after completing tasks.
	 * @param {function} next Function to call after completing tasks.
	 */
	function initAloha(event, next) {
		if (!isBrowserSupported()) {
			var console = window.console;
			if (console) {
				var fn = console.error ? 'error' : console.log ? 'log' : null;
				if (fn) {
					console[fn]('This browser is not supported');
				}
			}
			return;
		}

		// Because different css is to be applied based on what the user-agent
		// supports.  For example: outlines do not render in IE7.
		if ($.browser.webkit) {
			$('html').addClass('aloha-webkit');
		} else if ($.browser.opera) {
			$('html').addClass('aloha-opera');
		} else if ($.browser.msie) {
			$('html').addClass('aloha-ie' + parseInt($.browser.version, 10));
		} else if ($.browser.mozilla) {
			$('html').addClass('aloha-mozilla');
		}

		if (navigator.appVersion.indexOf('Win') !== -1) {
			Aloha.OSName = 'Win';
		} else if (navigator.appVersion.indexOf('Mac') !== -1) {
			Aloha.OSName = 'Mac';
		} else if (navigator.appVersion.indexOf('X11') !== -1) {
			Aloha.OSName = 'Unix';
		} else if (navigator.appVersion.indexOf('Linux') !== -1) {
			Aloha.OSName = 'Linux';
		}

		registerEvents();
		Aloha.settings.base = Aloha.getAlohaUrl();
		Aloha.Log.init();

		// Initialize error handler for general javascript errors.
		if (Aloha.settings.errorhandling) {
			window.onerror = function (msg, url, line) {
				Aloha.Log.error(Aloha, 'Error message: ' + msg + '\nURL: ' +
				                       url + '\nLine Number: ' + line);
				return true;
			};
		}

		event();
		next();
	}

	/**
	 * Initialize managers
	 *
	 * @param {function} event Event to trigger after completing tasks.
	 * @param {function} next Function to call after completing tasks.
	 */
	function initRepositoryManager(event, next) {
		Aloha.RepositoryManager.init();
		event();
		next();
	}

	/**
	 * Initialize Aloha plugins.
	 *
	 *
	 * @param {function} event Event to trigger after completing tasks.
	 * @param {function} next Callback that will be invoked after all plugins
	 *                        have been initialized.  Whereas plugins are loaded
	 *                        synchronously, plugins may initialize
	 *                        asynchronously.
	 */
	function initPluginManager(event, next) {
		// Because if there are no loadedPlugins specified, then the default is
		// to initialized all available plugins.
		if (0 === Aloha.loadedPlugins.length) {
			var plugins = PluginManager.plugins;
			var plugin;
			for (plugin in plugins) {
				if (plugins.hasOwnProperty(plugin)) {
					Aloha.loadedPlugins.push(plugin);
				}
			}
		}

		var fired = false;

		PluginManager.init(function () {
			if (!fired) {
				event();
				fired = true;
			}
			next();
		}, Aloha.loadedPlugins);

		if (!fired) {
			event();
			fired = true;
		}
	}

	/**
	 * Begin initialize editables.
	 *
	 * @param {function} event Event to trigger after completing tasks.
	 * @param {function} next Function to call after completing tasks.
	 */
	function initEditables(event, next) {
		var i;
		for (i = 0; i < Aloha.editables.length; i++) {
			if (!Aloha.editables[i].ready) {
				Aloha.editables[i].init();
			}
		}
		event();
		next();
	}

	/**
	 * Initialization phases.
	 *
	 * These stages denote the initialization states which Aloha will go
	 * through from loading to ready.
	 *
	 * Each phase object contains the following properties:
	 *        fn : The process that is to be invoked during this phase.
	 *             Will take two functions: event() and next().
	 *     event : The event name, which if provided, will be fired after the
	 *             phase has been started (optional).
	 *  deferred : A $.Deferred() object to hold event handlers until that
	 *             initialization phase has been done (optional).
	 *
	 * @type {Array.<phase>}
	 */
	var phases = [
		// Phase 0: Waiting for initialization to begin.  This is the state at
		//          load-time.
		{
			fn: null,
			event: null,
			deferred: null
		},

		// Phase 1: DOM is ready; performing compatibility checks, registering
		//          basic events, and initializing logging.
		{
			fn: initAloha,
			event: null,
			deferred: null
		},

		// Phase 2: Initial checks have passed; Initializing repository manger.
		{
			fn: initRepositoryManager,
			event: null,
			deferred: null
		},

		// Phase 3: Repository manager is ready for use; commence
		//          initialization of configured or default plugins.
		{
			fn: initPluginManager,
			event: 'aloha-plugins-loaded',
			deferred: null
		},

		// Phase 4: Plugins have all begun their initialization process, but it
		//          is not necessary that they have completed.  Start
		//          initializing editable, along with their scaffolding UI.
		//          Editables will not be fully initialized however, until
		//          plugins have finished initialization.
		{
			fn: initEditables,
			event: null,
			deferred: null
		},

		// Phase 5: The "ready" state.  Notify the system that Aloha is fully
		//          loaded, and ready for use.
		{
			fn: null,
			event: 'aloha-ready',
			deferred: null
		}
	];


	/**
	 * Base Aloha Object
	 * @namespace Aloha
	 * @class Aloha The Aloha base object, which contains all the core functionality
	 * @singleton
	 */
	$.extend(true, Aloha, {

		/**
		 * The Aloha Editor Version we are using
		 * It should be set by us and updated for the particular branch
		 * @property
		 */
		version: '0.23.6',

		/**
		 * Array of editables that are managed by Aloha
		 * @property
		 * @type Array
		 */
		editables: [],

		/**
		 * The currently active editable is referenced here
		 * @property
		 * @type Aloha.Editable
		 */
		activeEditable: null,

		/**
		 * settings object, which will contain all Aloha settings
		 * @cfg {Object} object Aloha's settings
		 */
		settings: {},

		/**
		 * defaults object, which will contain all Aloha defaults
		 * @cfg {Object} object Aloha's settings
		 */
		defaults: {},

		/**
		 * Namespace for ui components
		 */
		ui: {},

		/**
		 * This represents the name of the users OS. Could be:
		 * 'Mac', 'Linux', 'Win', 'Unix', 'Unknown'
		 * @property
		 * @type string
		 */
		OSName: 'Unknown',

		/**
		 * A list of loaded plugin names, available after the STAGES.PLUGINS
		 * initialization phase.
		 *
		 * @type {Array.<string>}
		 * @internal
		 */
		loadedPlugins: [],

		/**
		 * Maps names of plugins (link) to the base URL (../plugins/common/link).
		 */
		_pluginBaseUrlByName: {},

		/**
		 * Start the initialization process.
		 */
		init: function () {
			Aloha.initialize(phases);
		},

		/**
		 * Returns list of loaded plugins (without Bundle name)
		 *
		 * @return array
		 */
		getLoadedPlugins: function () {
			return this.loadedPlugins;
		},

		/**
		 * Returns true if a certain plugin is loaded, false otherwise.
		 *
		 * @param {string} plugin Name of plugin
		 * @return {boolean} True if plugin with given name is load.
		 */
		isPluginLoaded: function (name) {
			var loaded = false;
			$.each(this.loadedPlugins, function (i, plugin) {
				if (name === plugin.toString()) {
					loaded = true;
					return false;
				}
			});
			return loaded;
		},

		/**
		 * Activates editable and deactivates all other Editables.
		 *
		 * @param {Editable} editable the Editable to be activated
		 */
		activateEditable: function (editable) {
			// Because editables may be removed on blur, Aloha.editables.length
			// is not cached.
			var editables = Aloha.editables;
			var i;
			for (i = 0; i < editables.length; i++) {
				if (editables[i] !== editable && editables[i].isActive) {
					editables[i].blur();
				}
			}
			Aloha.activeEditable = editable;
		},

		/**
		 * Returns the current Editable
		 * @return {Editable} returns the active Editable
		 */
		getActiveEditable: function () {
			return Aloha.activeEditable;
		},

		/**
		 * Deactivates the active Editable.
		 *
		 * TODO: Would be better named "deactivateActiveEditable".
		 */
		deactivateEditable: function () {
			if (Aloha.activeEditable) {
				Aloha.activeEditable.blur();
				Aloha.activeEditable = null;
			}
		},

		/**
		 * Gets an editable by an ID or null if no Editable with that ID
		 * registered.
		 *
		 * @param {string} id The element id to look for.
		 * @return {Aloha.Editable|null} An editable, or null if none if found
		 *                               for the given id.
		 */
		getEditableById: function (id) {
			// Because if the element is a textarea, then it's necessary to
			// route to the editable div.
			var $editable = $('#' + id);
			if ($editable.length
					&& 'textarea' === $editable[0].nodeName.toLowerCase()) {
				id = id + '-aloha';
			}
			var i;
			for (i = 0; i < Aloha.editables.length; i++) {
				if (Aloha.editables[i].getId() === id) {
					return Aloha.editables[i];
				}
			}
			return null;
		},

		/**
		 * Checks whether an object is a registered Aloha Editable.
		 * @param {jQuery} obj the jQuery object to be checked.
		 * @return {boolean}
		 */
		isEditable: function (obj) {
			var i, editablesLength;

			for (i = 0, editablesLength = Aloha.editables.length; i < editablesLength; i++) {
				if (Aloha.editables[i].originalObj.get(0) === obj) {
					return true;
				}
			}
			return false;
		},

		/**
		 * Gets the nearest editable parent of the DOM element contained in the
		 * given jQuery object.
		 *
		 * @param {jQuery} $element jQuery unit set containing DOM element.
		 * @return {Aloha.Editable} Editable, or null if none found.
		 */
		getEditableHost: (function () {
			var getEditableOf = function (editable) {
				var i;
				for (i = 0; i < Aloha.editables.length; i++) {
					if (Aloha.editables[i].originalObj[0] === editable) {
						return Aloha.editables[i];
					}
				}
				return null;
			};

			return function ($element) {
				if (!$element || 0 === $element.length) {
					return null;
				}
				var editable = getEditableOf($element[0]);
				if (!editable) {
					$element.parents().each(function (__unused__, node) {
						editable = getEditableOf(node);
						if (editable) {
							return false;
						}
					});
				}
				return editable;
			};
		}()),

		/**
		 * Logs a message to the console.
		 *
		 * @param {string} level Level of the log
		 *                       ("error", "warn" or "info", "debug").
		 * @param {object} component Component that calls the log.
		 * @param {string} message Log message.
		 * @hide
		 */
		log: function (level, component, message) {
			if (typeof Aloha.Log !== 'undefined') {
				Aloha.Log.log(level, component, message);
			}
		},

		/**
		 * Register the given editable.
		 *
		 * @param {Editable} editable to register.
		 * @hide
		 */
		registerEditable: function (editable) {
			Aloha.editables.push(editable);
		},

		/**
		 * Unregister the given editable. It will be deactivated and removed
		 * from editables.
		 *
		 * @param {Editable} editable The editable to unregister.
		 * @hide
		 */
		unregisterEditable: function (editable) {
			var index = $.inArray(editable, Aloha.editables);
			if (index !== -1) {
				Aloha.editables.splice(index, 1);
			}
		},

		/**
		 * Check whether at least one editable was modified.
		 *
		 * @return {boolean} True when at least one editable was modified,
		 *                   false otherwise.
		 */
		isModified: function () {
			var i;
			for (i = 0; i < Aloha.editables.length; i++) {
				if (Aloha.editables[i].isModified
						&& Aloha.editables[i].isModified()) {
					return true;
				}
			}
			return false;
		},

		/**
		 * Determines the Aloha Url.
		 *
		 * @return {String} Aloha's baseUrl setting or "" if not set.
		 */
		getAlohaUrl: function (suffix) {
			return Aloha.settings.baseUrl || '';
		},

		/**
		 * Gets the plugin's url.
		 *
		 * @param {string} name The name with which the plugin was registered
		 *                      with.
		 * @return {string} The fully qualified url of this plugin.
		 */
		getPluginUrl: function (name) {
			if (!name) {
				return null;
			}
			var url = Aloha.settings._pluginBaseUrlByName[name];
			if (url) {
				// Check if url is absolute and attach base url if it is not.
				if (!url.match("^(\/|http[s]?:).*")) {
					url = Aloha.getAlohaUrl() + '/' + url;
				}
			}
			return url;
		},

		/**
		 * Disable object resizing by executing command 'enableObjectResizing',
		 * if the browser supports this.
		 */
		disableObjectResizing: function () {
			try {
				// This will disable browsers image resizing facilities in
				// order disable resize handles.
				var supported;
				try {
					supported = document.queryCommandSupported('enableObjectResizing');
				} catch (e) {
					supported = false;
					Aloha.Log.log('enableObjectResizing is not supported.');
				}
				if (supported) {
					document.execCommand('enableObjectResizing', false, false);
					Aloha.Log.log('enableObjectResizing disabled.');
				}
			} catch (e2) {
				Aloha.Log.error(e2, 'Could not disable enableObjectResizing');
				// this is just for others, who will not support disabling enableObjectResizing
			}
		},

		/**
		 * Human-readable string representation of this.
		 *
		 * @hide
		 */
		toString: function () {
			return 'Aloha';
		}
	});

	return Aloha;
});

/* console.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('aloha/console',[
	'aloha/core',
	'util/class',
	'jquery'
], function (
	Aloha,
	Class,
	jQuery
) {
	

	/**
	 * This is the aloha Log
	 * @namespace Aloha
	 * @class Log
	 * @singleton
	 */
	var AlohaConsole = Class.extend({
		/**
		 * Initialize the logging
		 * @hide
		 */
		init: function () {

			// initialize the logging settings (if not present)
			if (typeof Aloha.settings.logLevels === 'undefined' || !Aloha.settings.logLevels) {
				Aloha.settings.logLevels = {
					'error': true,
					'warn': true
				};
			}

			// initialize the logHistory settings (if not present)
			if (typeof Aloha.settings.logHistory === 'undefined' || !Aloha.settings.logHistory) {
				Aloha.settings.logHistory = {};
			}
			// set the default values for the loghistory
			if (!Aloha.settings.logHistory.maxEntries) {
				Aloha.settings.logHistory.maxEntries = 100;
			}
			if (!Aloha.settings.logHistory.highWaterMark) {
				Aloha.settings.logHistory.highWaterMark = 90;
			}
			if (!Aloha.settings.logHistory.levels) {
				Aloha.settings.logHistory.levels = {
					'error': true,
					'warn': true
				};
			}
			this.flushLogHistory();

			Aloha.trigger('aloha-logger-ready');
		},

		/**
		 * Log History as array of Message Objects. Every object has the properties
		 * 'level', 'component' and 'message'
		 * @property
		 * @type Array
		 * @hide
		 */
		logHistory: [],

		/**
		 * Flag, which is set as soon as the highWaterMark for the log history is reached.
		 * This flag is reset on every call of flushLogHistory()
		 * @hide
		 */
		highWaterMarkReached: false,

		/**
		 * Logs a message to the console
		 * @method
		 * @param {String} level Level of the log ('error', 'warn' or 'info', 'debug')
		 * @param {String} component Component that calls the log
		 * @param {String} message log message
		 */
		log: function (level, component, message) {


			// log ('Logging message');
			if (typeof component === 'undefined') {
				message = level;
			}
			if (typeof component !== 'string' && component && component.toString) {
				component = component.toString();
			}

			// log ('warn', 'Warning message');
			if (typeof message === 'undefined') {
				message = component;
				component = undefined;
			}

			if (typeof level === 'undefined' || !level) {
				level = 'log';
			}

			level = level.toLowerCase();

			if (typeof Aloha.settings.logLevels === "undefined") {
				return;
			}

			// now check whether the log level is activated
			if (!Aloha.settings.logLevels[level]) {
				return;
			}

			component = component || "Unkown Aloha Component";

			this.addToLogHistory({
				'level': level,
				'component': component,
				'message': message,
				'date': new Date()
			});

			var console = window.console;

			switch (level) {
			case 'error':
				if (window.console && console.error) {
					// FIXME:
					// Using console.error rather than throwing an error is very
					// problematic because we get not stack.
					// We ought to consider doing the following:
					// throw component + ': ' + message;
					if (!component && !message) {
						console.error("Error occured without message and component");
					} else {
						console.error(component + ': ' + message);
					}
				}
				break;
			case 'warn':
				if (window.console && console.warn) {
					console.warn(component + ': ' + message);
				}
				break;
			case 'info':
				if (window.console && console.info) {
					console.info(component + ': ' + message);
				}
				break;
			case 'debug':
				if (window.console && console.log) {
					console.log(component + ' [' + level + ']: ' + message);
				}
				break;
			default:
				if (window.console && console.log) {
					console.log(component + ' [' + level + ']: ' + message);
				}
				break;
			}
		},

		/**
		 * Log a message of log level 'error'
		 * @method
		 * @param {String} component Component that calls the log
		 * @param {String} message log message
		 */
		error: function (component, message) {
			this.log('error', component, message);
		},

		/**
		 * Log a message of log level 'warn'
		 * @method
		 * @param {String} component Component that calls the log
		 * @param {String} message log message
		 */
		warn: function (component, message) {
			this.log('warn', component, message);
		},

		/**
		 * Log a message of log level 'info'
		 * @method
		 * @param {String} component Component that calls the log
		 * @param {String} message log message
		 */
		info: function (component, message) {
			this.log('info', component, message);
		},

		/**
		 * Log a message of log level 'debug'
		 * @param {String} component Component that calls the log
		 * @param {String} message log message
		 */
		debug: function (component, message) {
			this.log('debug', component, message);
		},

		/**
		 * Methods to mark function as deprecated for developers.
		 * @param {String} component String that calls the log
		 * @param {String} message log message
		 */
		deprecated: function (component, message) {
			this.log('warn', component, message);
			// help the developer to locate the call.
			if (Aloha.settings.logLevels.deprecated) {
				throw new Error(message);
			}
		},

		/**
		 * Check whether the given log level is currently enabled
		 * @param {String} level
		 * @return true when log level is enabled, false if not
		 */
		isLogLevelEnabled: function (level) {
			return Aloha.settings && Aloha.settings.logLevels && Aloha.settings.logLevels[level];
		},

		/**
		 * Check whether error logging is enabled
		 * @return true if error logging is enabled, false if not
		 */
		isErrorEnabled: function () {
			return this.isLogLevelEnabled('error');
		},

		/**
		 * Check whether warn logging is enabled
		 * @return true if warn logging is enabled, false if not
		 */
		isWarnEnabled: function () {
			return this.isLogLevelEnabled('warn');
		},

		/**
		 * Check whether info logging is enabled
		 * @return true if info logging is enabled, false if not
		 */
		isInfoEnabled: function () {
			return this.isLogLevelEnabled('info');
		},

		/**
		 * Check whether debug logging is enabled
		 * @return true if debug logging is enabled, false if not
		 */
		isDebugEnabled: function () {
			return this.isLogLevelEnabled('debug');
		},

		/**
		 * Add the given entry to the log history. Check whether the highWaterMark has been reached, and fire an event if yes.
		 * @param {Object} entry entry to be added to the log history
		 * @hide
		 */
		addToLogHistory: function (entry) {

			if (!Aloha.settings.logHistory) {
				this.init();
			}

			// when maxEntries is set to something illegal, we do nothing (log history is disabled)
			// check whether the level is one we like to have logged
			if (Aloha.settings.logHistory.maxEntries <= 0 || !Aloha.settings.logHistory.levels[entry.level]) {

				return;
			}

			// first add the entry as last element to the history array
			this.logHistory.push(entry);

			// check whether the highWaterMark was reached, if so, fire an event
			if (!this.highWaterMarkReached) {

				if (this.logHistory.length >= Aloha.settings.logHistory.maxEntries * Aloha.settings.logHistory.highWaterMark / 100) {

					// fire the event
					Aloha.trigger('aloha-log-full');
					// set the flag (so we will not fire the event again until the logHistory is flushed)
					this.highWaterMarkReached = true;
				}
			}

			// check whether the log is full and eventually remove the oldest entries
			// @todo remove old entries when aloha-log-full event is triggered
			while (this.logHistory.length > Aloha.settings.logHistory.maxEntries) {
				this.logHistory.shift();
			}
		},

		/**
		 * Get the log history
		 * @return log history as array of objects
		 * @hide
		 */
		getLogHistory: function () {
			return this.logHistory;
		},

		/**
		 * Flush the log history. Remove all log entries and reset the flag for the highWaterMark
		 * @return void
		 * @hide
		 */
		flushLogHistory: function () {
			this.logHistory = [];
			this.highWaterMarkReached = false;
		}
	});

	/**
	 * Create the Log object
	 * @hide
	 */
	AlohaConsole = new AlohaConsole();

	// add to log namespace for compatiblility.
	Aloha.Log = Aloha.Console = AlohaConsole;
	return AlohaConsole;
});

/* range.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
// Ensure GENTICS Namespace
window.GENTICS = window.GENTICS || {};
window.GENTICS.Utils = window.GENTICS.Utils || {};

define('util/range',[
	'jquery',
	'util/dom',
	'util/class',
	'aloha/console',
	'aloha/rangy-core'
], function (jQuery, Dom, Class, console, rangy) {
	

	var GENTICS = window.GENTICS;
	var Aloha = window.Aloha;

	function selfAndParentsUntil(container, limit) {
		var parents = [],
			cur;
		if (1 === container.nodeType) {
			cur = container;
		} else {
			cur = container.parentNode;
		}
		for (;;) {
			if (!cur || cur === limit || 9 === cur.nodeType) {
				break;
			}
			if (1 === cur.nodeType) {
				parents.push(cur);
			}
			cur = cur.parentNode;
		}
		return parents;
	}

	/**
	 * @namespace GENTICS.Utils
	 * @class RangeObject
	 * Represents a selection range in the browser that
	 * has some advanced features like selecting the range.
	 * @param {object} param if boolean true is passed, the range will be deducted from the current browser selection.
	 * If another rangeObject is passed, it will be cloned.
	 * If nothing is passed, the rangeObject will be empty.
	 * @constructor
	 */
	GENTICS.Utils.RangeObject = Class.extend({
		_constructor: function (param) {
			// Take the values from the passed object
			if (typeof param === 'object') {
				if (typeof param.startContainer !== 'undefined') {
					this.startContainer = param.startContainer;
				}
				if (typeof param.startOffset !== 'undefined') {
					this.startOffset = param.startOffset;
				}
				if (typeof param.endContainer !== 'undefined') {
					this.endContainer = param.endContainer;
				}
				if (typeof param.endOffset !== 'undefined') {
					this.endOffset = param.endOffset;
				}
			} else if (param === true) {
				this.initializeFromUserSelection();
			}
		},

		/**
		 * DOM object of the start container of the selection.
		 * This is always has to be a DOM text node.
		 * @property startContainer
		 * @type {DOMObject}
		 */
		startContainer: undefined,

		/**
		 * Offset of the selection in the start container
		 * @property startOffset
		 * @type {Integer}
		 */
		startOffset: undefined,

		/**
		 * DOM object of the end container of the selection.
		 * This is always has to be a DOM text node.
		 * @property endContainer
		 * @type {DOMObject}
		 */
		endContainer: undefined,

		/**
		 * Offset of the selection in the end container
		 * @property endOffset
		 * @type {Integer}
		 */
		endOffset: undefined,

		/**
		 * Delete all contents selected by the current range
		 * @param rangeTree a GENTICS.Utils.RangeTree object may be provided to start from. This parameter is optional
		 */
		deleteContents: function () {

			Dom.removeRange(this);

		},

		/**
		 * Output some log
		 * TODO: move this to Aloha.Log
		 * @param message log message to output
		 * @return void
		 * @deprecated
		 * @hide
		 */
		log: function (message) {
			console.deprecated('Utils.RangeObject', 'log() is deprecated. use ' + 'console.log() from module "aloha/console" instead: ' + message);
		},

		/**
		 * Method to test if a range object is collapsed.
		 * A range is considered collapsed if either no endContainer exists or the endContainer/Offset equal startContainer/Offset
		 * @return {boolean} true if collapsed, false otherwise
		 * @method
		 */
		isCollapsed: function () {
			return (!this.endContainer || (this.startContainer === this.endContainer && this.startOffset === this.endOffset));
		},

		/**
		 * Method to (re-)calculate the common ancestor container and to get it.
		 * The common ancestor container is the DOM Object which encloses the
		 * whole range and is nearest to the start and end container objects.
		 * @return {DOMObject} get the common ancestor container
		 * @method
		 */
		getCommonAncestorContainer: function () {
			if (this.commonAncestorContainer) {
				// sometimes it's cached (or was set)
				return this.commonAncestorContainer;
			}
			// if it's not cached, calculate and then cache it
			this.updateCommonAncestorContainer();

			// now return it anyway
			return this.commonAncestorContainer;
		},

		/**
		 * Get the parent elements of the startContainer/endContainer up to the given limit. When the startContainer/endContainer
		 * is no text element, but a node, the node itself is returned as first element.
		 * @param {jQuery} limit limit object (default: body)
		 * @param {boolean} fromStart true to fetch the parents from the startContainer, false for the endContainer
		 * @return {jQuery} parent elements of the startContainer/endContainer as jQuery objects
		 * @method
		 */
		getContainerParents: function (limit, fromEnd) {
			// TODO cache the calculated parents
			var container = fromEnd ? this.endContainer : this.startContainer;
			if (!container) {
				return false;
			}
			return jQuery(selfAndParentsUntil(container, limit ? limit[0] : null));
		},

		/**
		 * Get the parent elements of the startContainer up to the given limit. When the startContainer
		 * is no text element, but a node, the node itself is returned as first element.
		 * @param {jQuery} limit limit object (default: body)
		 * @return {jQuery} parent elements of the startContainer as jQuery objects
		 * @method
		 */
		getStartContainerParents: function (limit) {
			return this.getContainerParents(limit, false);
		},

		/**
		 * Get the parent elements of the endContainer up to the given limit. When the endContainer is
		 * no text element, but a node, the node itself is returned as first element.
		 * @param {jQuery} limit limit object (default: body)
		 * @return {jQuery} parent elements of the endContainer as jQuery objects
		 * @method
		 */
		getEndContainerParents: function (limit) {
			return this.getContainerParents(limit, true);
		},

		/**
		 * TODO: the commonAncestorContainer is not calculated correctly, if either the start or
		 * the endContainer would be the cac itself (e.g. when the startContainer is a textNode
		 * and the endContainer is the startContainer's parent <p>). in this case the cac will be set
		 * to the parent div
		 * Method to update a range object internally
		 * @param commonAncestorContainer (DOM Object); optional Parameter; if set, the parameter
		 * will be used instead of the automatically calculated CAC
		 * @return void
		 * @hide
		 */
		updateCommonAncestorContainer: function (commonAncestorContainer) {
			// if no parameter was passed, calculate it
			if (!commonAncestorContainer) {
				// this will be needed either right now for finding the CAC or later for the crossing index
				var parentsStartContainer = this.getStartContainerParents(),
					parentsEndContainer = this.getEndContainerParents(),
					i;

				// find the crossing between startContainer and endContainer parents (=commonAncestorContainer)
				if (!(parentsStartContainer.length > 0 && parentsEndContainer.length > 0)) {
					console.warn('aloha/range', 'could not find commonAncestorContainer');
					return false;
				}

				for (i = 0; i < parentsStartContainer.length; i++) {
					if (parentsEndContainer.index(parentsStartContainer[i]) != -1) {
						this.commonAncestorContainer = parentsStartContainer[i];
						break;
					}
				}
			} else {
				this.commonAncestorContainer = commonAncestorContainer;
			}

			// if everything went well, return true :-)
			console.debug(commonAncestorContainer ? 'commonAncestorContainer was set successfully' : 'commonAncestorContainer was calculated successfully');
			return true;
		},

		/**
		 * Helper function for selection in IE. Creates a collapsed text range at the given position
		 * @param container container
		 * @param offset offset
		 * @return collapsed text range at that position
		 * @hide
		 */
		getCollapsedIERange: function (container, offset) {
			// create a text range
			var ieRange = document.body.createTextRange(),
				tmpRange,
			    right,
			    parent,
			    left;

			// search to the left for the next element
			left = this.searchElementToLeft(container, offset);
			if (left.element) {
				// found an element, set the start to the end of that element
				tmpRange = document.body.createTextRange();
				tmpRange.moveToElementText(left.element);
				ieRange.setEndPoint('StartToEnd', tmpRange);

				// and correct the start
				if (left.characters !== 0) {
					ieRange.moveStart('character', left.characters);
				} else {
					// this is a hack, when we are at the start of a text node, move the range anyway
					ieRange.moveStart('character', 1);
					ieRange.moveStart('character', -1);
				}
			} else {
				// found nothing to the left, so search right
				right = this.searchElementToRight(container, offset);
				// also found no element to the right, use the container itself
				parent = container.nodeType == 3 ? container.parentNode : container;
				tmpRange = document.body.createTextRange();
				tmpRange.moveToElementText(parent);
				ieRange.setEndPoint('StartToStart', tmpRange);

				// and correct the start
				if (left.characters !== 0) {
					ieRange.moveStart('character', left.characters);
				}
			}
			ieRange.collapse();

			return ieRange;
		},

		/**
		 * Sets the visible selection in the Browser based on the range object.
		 * If the selection is collapsed, this will result in a blinking cursor,
		 * otherwise in a text selection.
		 * @method
		 */
		select: function () {
			var ieRange, endRange, startRange, range, sel;

			if (typeof this.startContainer === 'undefined' || typeof this.endContainer === 'undefined') {
				console.warn('can not select an empty range');
				return false;
			}

			// create a range
			range = rangy.createRange();
			// set start and endContainer
			range.setStart(this.startContainer, this.startOffset);
			range.setEnd(this.endContainer, this.endOffset);

			// update the selection
			sel = rangy.getSelection();
			sel.setSingleRange(range);
		},

		/**
		 * Starting at the given position, search for the next element to the left and count the number of characters are in between
		 * @param container container of the startpoint
		 * @param offset offset of the startpoint in the container
		 * @return object with 'element' (null if no element found) and 'characters'
		 * @hide
		 */
		searchElementToLeft: function (container, offset) {
			var checkElement,
			    characters = 0;

			if (container.nodeType === 3) {
				// start is in a text node
				characters = offset;
				// begin check at the element to the left (if any)
				checkElement = container.previousSibling;
			} else {
				// start is between nodes, begin check at the element to the left (if any)
				if (offset > 0) {
					checkElement = container.childNodes[offset - 1];
				}
			}

			// move to the right until we find an element
			while (checkElement && checkElement.nodeType === 3) {
				characters += checkElement.data.length;
				checkElement = checkElement.previousSibling;
			}

			return {
				'element': checkElement,
				'characters': characters
			};
		},

		/**
		 * Starting at the given position, search for the next element to the right and count the number of characters that are in between
		 * @param container container of the startpoint
		 * @param offset offset of the startpoint in the container
		 * @return object with 'element' (null if no element found) and 'characters'
		 * @hide
		 */
		searchElementToRight: function (container, offset) {
			var checkElement,
			    characters = 0;

			if (container.nodeType === 3) {
				// start is in a text node
				characters = container.data.length - offset;

				// begin check at the element to the right (if any)
				checkElement = container.nextSibling;
			} else {
				// start is between nodes, begin check at the element to the right (if any)
				if (offset < container.childNodes.length) {
					checkElement = container.childNodes[offset];
				}
			}

			// move to the right until we find an element
			while (checkElement && checkElement.nodeType === 3) {
				characters += checkElement.data.length;
				checkElement = checkElement.nextSibling;
			}

			return {
				'element': checkElement,
				'characters': characters
			};
		},

		/**
		 * Method which updates the rangeObject including all extending properties like commonAncestorContainer etc...
		 * TODO: is this method needed here? or should it contain the same code as Aloha.Selection.prototype.SelectionRange.prototype.update?
		 * @return void
		 * @hide
		 */
		update: function (event) {
			console.debug('now updating rangeObject');

			this.initializeFromUserSelection(event);
			this.updateCommonAncestorContainer();
		},

		/**
		 * Initialize the current range object from the user selection of the browser.
		 * @param event which calls the method
		 * @return void
		 * @hide
		 */
		initializeFromUserSelection: function (event) {
			var selection = rangy.getSelection(),
				browserRange;

			if (!selection) {
				return false;
			}

			// check if a ragne exists
			if (!selection.rangeCount) {
				return false;
			}

			// getBrowserRange
			browserRange = selection.getRangeAt(0);
			if (!browserRange) {
				return false;
			}

			// initially set the range to what the browser tells us
			this.startContainer = browserRange.startContainer;
			this.endContainer = browserRange.endContainer;
			this.startOffset = browserRange.startOffset;
			this.endOffset = browserRange.endOffset;

			// now try to correct the range
			this.correctRange();
			return;
		},

		/**
		 * Correct the current range. The general goal of the algorithm is to have start
		 * and end of the range in text nodes if possible and the end of the range never
		 * at the beginning of an element or text node. Details of the algorithm can be
		 * found in the code comments
		 * @method
		 */
		correctRange: function () {
			var adjacentTextNode,
			    textNode,
			    checkedElement,
			    parentNode,
			    offset;

			this.clearCaches();
			if (this.isCollapsed()) {
				// collapsed ranges are treated specially

				// first check if the range is not in a text node
				if (this.startContainer.nodeType === 1) {
					if (this.startOffset > 0 && this.startContainer.childNodes[this.startOffset - 1].nodeType === 3) {
						// when the range is between nodes (container is an element
						// node) and there is a text node to the left -> move into this text
						// node (at the end)
						this.startContainer = this.startContainer.childNodes[this.startOffset - 1];
						this.startOffset = this.startContainer.data.length;
						this.endContainer = this.startContainer;
						this.endOffset = this.startOffset;
						return;
					}

					if (this.startOffset > 0 && this.startContainer.childNodes[this.startOffset - 1].nodeType === 1) {
						// search for the next text node to the left
						adjacentTextNode = GENTICS.Utils.Dom.searchAdjacentTextNode(this.startContainer, this.startOffset, true);
						if (adjacentTextNode) {
							this.startContainer = this.endContainer = adjacentTextNode;
							this.startOffset = this.endOffset = adjacentTextNode.data.length;
							return;
						}
						// search for the next text node to the right
						adjacentTextNode = GENTICS.Utils.Dom.searchAdjacentTextNode(this.startContainer, this.startOffset, false);
						if (adjacentTextNode) {
							this.startContainer = this.endContainer = adjacentTextNode;
							this.startOffset = this.endOffset = 0;
							return;
						}
					}

					if (this.startOffset < this.startContainer.childNodes.length && this.startContainer.childNodes[this.startOffset].nodeType === 3) {
						// when the range is between nodes and there is a text node
						// to the right -> move into this text node (at the start)
						this.startContainer = this.startContainer.childNodes[this.startOffset];
						this.startOffset = 0;
						this.endContainer = this.startContainer;
						this.endOffset = 0;
						return;
					}
				}

				// when the selection is in a text node at the start, look for an adjacent text node and if one found, move into that at the end
				if (this.startContainer.nodeType === 3 && this.startOffset === 0) {
					adjacentTextNode = GENTICS.Utils.Dom.searchAdjacentTextNode(this.startContainer.parentNode, GENTICS.Utils.Dom.getIndexInParent(this.startContainer), true);
					//only move the selection if the adjacentTextNode is inside the current editable
					//the cursor should not be outside the editable
					if (adjacentTextNode && jQuery(adjacentTextNode).closest(Aloha.activeEditable.obj).length > 0) {
						this.startContainer = this.endContainer = adjacentTextNode;
						this.startOffset = this.endOffset = adjacentTextNode.data.length;
					}
				}
			} else {
				// expanded range found

				// correct the start, but only if between nodes
				if (this.startContainer.nodeType === 1) {
					// if there is a text node to the right, move into this
					if (this.startOffset < this.startContainer.childNodes.length && this.startContainer.childNodes[this.startOffset].nodeType === 3) {
						this.startContainer = this.startContainer.childNodes[this.startOffset];
						this.startOffset = 0;
					} else if (this.startOffset < this.startContainer.childNodes.length && this.startContainer.childNodes[this.startOffset].nodeType === 1) {
						// there is an element node to the right, so recursively check all first child nodes until we find a text node
						textNode = false;
						checkedElement = this.startContainer.childNodes[this.startOffset];
						while (textNode === false && checkedElement.childNodes && checkedElement.childNodes.length > 0) {
							// go to the first child of the checked element
							checkedElement = checkedElement.childNodes[0];
							// when this element is a text node, we are done
							if (checkedElement.nodeType === 3) {
								textNode = checkedElement;
							}
						}

						// found a text node, so move into it
						if (textNode !== false) {
							this.startContainer = textNode;
							this.startOffset = 0;
						}
					}
				}

				// check whether the start is inside a text node at the end
				if (this.startContainer.nodeType === 3 && this.startOffset === this.startContainer.data.length) {
					// check whether there is an adjacent text node to the right and if
					// yes, move into it
					adjacentTextNode = GENTICS.Utils.Dom.searchAdjacentTextNode(this.startContainer.parentNode, GENTICS.Utils.Dom.getIndexInParent(this.startContainer) + 1, false);
					if (adjacentTextNode) {
						this.startContainer = adjacentTextNode;
						this.startOffset = 0;
					}
				}

				// now correct the end
				if (this.endContainer.nodeType === 3 && this.endOffset === 0) {
					// we are in a text node at the start
					if (this.endContainer.previousSibling && this.endContainer.previousSibling.nodeType === 3) {
						// found a text node to the left -> move into it (at the end)
						this.endContainer = this.endContainer.previousSibling;
						this.endOffset = this.endContainer.data.length;
					} else if (this.endContainer.previousSibling && this.endContainer.previousSibling.nodeType === 1 && this.endContainer.parentNode) {
						// found an element node to the left -> move in between
						parentNode = this.endContainer.parentNode;
						for (offset = 0; offset < parentNode.childNodes.length; ++offset) {
							if (parentNode.childNodes[offset] == this.endContainer) {
								this.endOffset = offset;
								break;
							}
						}
						this.endContainer = parentNode;
					}
				}

				if (this.endContainer.nodeType == 1 && this.endOffset === 0) {
					// we are in an element node at the start, possibly move to the previous sibling at the end
					if (this.endContainer.previousSibling) {
						if (this.endContainer.previousSibling.nodeType === 3) {
							// previous sibling is a text node, move end into here (at the end)
							this.endContainer = this.endContainer.previousSibling;
							this.endOffset = this.endContainer.data.length;
						} else if (this.endContainer.previousSibling.nodeType === 1 && this.endContainer.previousSibling.childNodes && this.endContainer.previousSibling.childNodes.length > 0) {
							// previous sibling is another element node with children,
							// move end into here (at the end)
							this.endContainer = this.endContainer.previousSibling;
							this.endOffset = this.endContainer.childNodes.length;
						}
					}
				}

				// correct the end, but only if between nodes
				if (this.endContainer.nodeType == 1) {
					// if there is a text node to the left, move into this
					if (this.endOffset > 0 && this.endContainer.childNodes[this.endOffset - 1].nodeType === 3) {
						this.endContainer = this.endContainer.childNodes[this.endOffset - 1];
						this.endOffset = this.endContainer.data.length;
					} else if (this.endOffset > 0 && this.endContainer.childNodes[this.endOffset - 1].nodeType === 1) {
						// there is an element node to the left, so recursively check all last child nodes until we find a text node
						textNode = false;
						checkedElement = this.endContainer.childNodes[this.endOffset - 1];
						while (textNode === false && checkedElement.childNodes && checkedElement.childNodes.length > 0) {
							// go to the last child of the checked element
							checkedElement = checkedElement.childNodes[checkedElement.childNodes.length - 1];
							// when this element is a text node, we are done
							if (checkedElement.nodeType === 3) {
								textNode = checkedElement;
							}
						}

						// found a text node, so move into it
						if (textNode !== false) {
							this.endContainer = textNode;
							this.endOffset = this.endContainer.data.length;
						}
					}
				}
			}
		},

		/**
		 * Clear the caches for this range. This method must be called when the range itself (start-/endContainer or start-/endOffset) is modified.
		 * @method
		 */
		clearCaches: function () {
			this.commonAncestorContainer = undefined;
		},

		/**
		 * Get the range tree of this range.
		 * The range tree will be cached for every root object. When the range itself is modified, the cache should be cleared by calling GENTICS.Utils.RangeObject.clearCaches
		 * @param {DOMObject} root root object of the range tree, if non given, the common ancestor container of the start and end containers will be used
		 * @return {RangeTree} array of RangeTree object for the given root object
		 * @method
		 */
		getRangeTree: function (root) {
			// TODO cache rangeTrees
			if (typeof root === 'undefined') {
				root = this.getCommonAncestorContainer();
			}

			this.inselection = false;
			return this.recursiveGetRangeTree(root);
		},

		/**
		 * Recursive inner function for generating the range tree.
		 * @param currentObject current DOM object for which the range tree shall be generated
		 * @return array of Tree objects for the children of the current DOM object
		 * @hide
		 */
		recursiveGetRangeTree: function (currentObject) {
			// get all direct children of the given object
			var jQueryCurrentObject = jQuery(currentObject),
				childCount = 0,
				that = this,
				currentElements = [];

			jQueryCurrentObject.contents().each(function (index) {
				var type = 'none',
					startOffset = false,
					endOffset = false,
					collapsedFound = false,
					noneFound = false,
					partialFound = false,
					fullFound = false,
					i;

				// check for collapsed selections between nodes
				if (that.isCollapsed() && currentObject === that.startContainer && that.startOffset === index) {
					// insert an extra rangetree object for the collapsed range here
					currentElements[childCount] = new GENTICS.Utils.RangeTree();
					currentElements[childCount].type = 'collapsed';
					currentElements[childCount].domobj = undefined;
					that.inselection = false;
					collapsedFound = true;
					childCount++;
				}

				if (!that.inselection && !collapsedFound) {
					// the start of the selection was not yet found, so look for it now
					// check whether the start of the selection is found here

					// check is dependent on the node type
					switch (this.nodeType) {
					case 3:
						// text node
						if (this === that.startContainer) {
							// the selection starts here
							that.inselection = true;

							// when the startoffset is > 0, the selection type is only partial
							type = that.startOffset > 0 ? 'partial' : 'full';
							startOffset = that.startOffset;
							endOffset = this.length;
						}
						break;
					case 1:
						// element node
						if (this === that.startContainer && that.startOffset === 0) {
							// the selection starts here
							that.inselection = true;
							type = 'full';
						}
						if (currentObject === that.startContainer && that.startOffset === index) {
							// the selection starts here
							that.inselection = true;
							type = 'full';
						}
						break;
					}
				}

				if (that.inselection && !collapsedFound) {
					if (type == 'none') {
						type = 'full';
					}
					// we already found the start of the selection, so look for the end of the selection now
					// check whether the end of the selection is found here

					switch (this.nodeType) {
					case 3:
						// text node
						if (this === that.endContainer) {
							// the selection ends here
							that.inselection = false;

							// check for partial selection here
							if (that.endOffset < this.length) {
								type = 'partial';
							}
							if (startOffset === false) {
								startOffset = 0;
							}
							endOffset = that.endOffset;
						}
						break;
					case 1:
						// element node
						if (this === that.endContainer && that.endOffset === 0) {
							that.inselection = false;
						}
						break;
					}
					if (currentObject === that.endContainer && that.endOffset <= index) {
						that.inselection = false;
						type = 'none';
					}
				}

				// create the current selection tree entry
				currentElements[childCount] = new GENTICS.Utils.RangeTree();
				currentElements[childCount].domobj = this;
				currentElements[childCount].type = type;
				if (type == 'partial') {
					currentElements[childCount].startOffset = startOffset;
					currentElements[childCount].endOffset = endOffset;
				}

				// now do the recursion step into the current object
				currentElements[childCount].children = that.recursiveGetRangeTree(this);

				// check whether a selection was found within the children
				if (currentElements[childCount].children.length > 0) {
					for (i = 0; i < currentElements[childCount].children.length; ++i) {
						switch (currentElements[childCount].children[i].type) {
						case 'none':
							noneFound = true;
							break;
						case 'full':
							fullFound = true;
							break;
						case 'partial':
							partialFound = true;
							break;
						}
					}

					if (partialFound || (fullFound && noneFound)) {
						// found at least one 'partial' DOM object in the children, or both 'full' and 'none', so this element is also 'partial' contained
						currentElements[childCount].type = 'partial';
					} else if (fullFound && !partialFound && !noneFound) {
						// only found 'full' contained children, so this element is also 'full' contained
						currentElements[childCount].type = 'full';
					}
				}

				childCount++;
			});

			// extra check for collapsed selections at the end of the current element
			if (this.isCollapsed() && currentObject === this.startContainer && this.startOffset == currentObject.childNodes.length) {
				currentElements[childCount] = new GENTICS.Utils.RangeTree();
				currentElements[childCount].type = 'collapsed';
				currentElements[childCount].domobj = undefined;
			}

			return currentElements;
		},

		/**
		 * Find certain the first occurrence of some markup within the parents of either the start or the end of this range.
		 * The markup can be identified by means of a given comparator function. The function will be passed every parent (up to the eventually given limit object, which itself is not considered) to the comparator function as this.
		 * When the comparator function returns boolean true, the markup found and finally returned from this function as dom object.<br/>
		 * Example for finding an anchor tag at the start of the range up to the active editable object:<br/>
		 * <pre>
		 * range.findMarkup(
		 *   function() {
		 *     return this.nodeName.toLowerCase() == 'a';
		 *   },
		 *   jQuery(Aloha.activeEditable.obj)
		 * );
		 * </pre>
		 * @param {function} comparator comparator function to find certain markup
		 * @param {jQuery} limit limit objects for limit the parents taken into consideration
		 * @param {boolean} atEnd true for searching at the end of the range, false for the start (default: false)
		 * @return {DOMObject} the found dom object or false if nothing found.
		 * @method
		 */
		findMarkup: function (comparator, limit, atEnd) {
			var container = atEnd ? this.endContainer : this.startContainer,
				parents,
				i,
				len;
			limit = limit ? limit[0] : null;
			if (!container) {
				return;
			}
			parents = selfAndParentsUntil(container, limit);
			for (i = 0, len = parents.length; i < len; i++) {
				if (comparator.apply(parents[i])) {
					return parents[i];
				}
			}
			return false;
		},

		/**
		 * Get the text enclosed by this range
		 * @return {String} the text of the range
		 * @method
		 */
		getText: function () {
			if (this.isCollapsed()) {
				return '';
			}
			return this.recursiveGetText(this.getRangeTree());
		},

		recursiveGetText: function (tree) {
			if (!tree) {
				return '';
			}
			var that = this,
			    text = '';
			jQuery.each(tree, function () {
				if (this.type == 'full') {
					// fully selected element/text node
					text += jQuery(this.domobj).text();
				} else if (this.type == 'partial' && this.domobj.nodeType === 3) {
					// partially selected text node
					text += jQuery(this.domobj).text().substring(this.startOffset, this.endOffset);
				} else if (this.type == 'partial' && this.domobj.nodeType === 1 && this.children) {
					// partially selected element node
					text += that.recursiveGetText(this.children);
				}
			});
			return text;
		}
	});

	/**
	 * @namespace GENTICS.Utils
	 * @class RangeTree
	 * Class definition of a RangeTree, which gives a tree view of the DOM objects included in this range
	 * Structure:
	 * <pre>
	 * +
	 * |-domobj: <reference to the DOM Object> (NOT jQuery)
	 * |-type: defines if this node is marked by user [none|partial|full|collapsed]
	 * |-children: recursive structure like this
	 * </pre>
	 */
	GENTICS.Utils.RangeTree = Class.extend({
		/**
		 * DOMObject, if the type is one of [none|partial|full], undefined if the type is [collapsed]
		 * @property domobj
		 * @type {DOMObject}
		 */
		domobj: {},

		/**
		 * type of the participation of the dom object in the range. Is one of:
		 * <pre>
		 * - none the DOMObject is outside of the range
		 * - partial the DOMObject partially in the range
		 * - full the DOMObject is completely in the range
		 * - collapsed the current RangeTree element marks the position of a collapsed range between DOM nodes
		 * </pre>
		 * @property type
		 * @type {String}
		 */
		type: null,

		/**
		 * Array of RangeTree objects which reflect the status of the child elements of the current DOMObject
		 * @property children
		 * @type {Array}
		 */
		children: []
	});

	return GENTICS.Utils.RangeObject;
});

/* functions.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('util/functions',[], function () {
	

	/**
	 * The identity function returns its single argument.
	 * Useful for composition when some default behaviour is needed.
	 */
	function identity(arg) {
		return arg;
	}

	function noop() {
	}

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	function complement(fn) {
		return function () {
			return !fn.apply(this, arguments);
		};
	}

	return {
		identity: identity,
		noop: noop,
		returnTrue: returnTrue,
		returnFalse: returnFalse,
		complement: complement
	};
});

/* arrays.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('util/arrays',['util/functions'], function (Fn) {
	

	/**
	 * Implements unique() using the browser's sort().
	 *
	 * @param a
	 *        The array to sort and strip of duplicate values.
	 *        Warning: this array will be modified in-place.
	 * @param compFn
	 *        A custom comparison function that accepts two values a and
	 *        b from the given array and returns -1, 0, 1 depending on
	 *        whether a < b, a == b, a > b respectively.
	 *
	 *        If no compFn is provided, the algorithm will use the
	 *        browsers default sort behaviour and loose comparison to
	 *        detect duplicates.
	 * @return
	 *        The given array.
	 */
	function sortUnique(a, compFn) {
		var i;
		if (compFn) {
			a.sort(compFn);
			for (i = 1; i < a.length; i++) {
				if (0 === compFn(a[i], a[i - 1])) {
					a.splice(i--, 1);
				}
			}
		} else {
			a.sort();
			for (i = 1; i < a.length; i++) {
				// Use loosely typed comparsion if no compFn is given
				// to avoid sortUnique([6, "6", 6]) => [6, "6", 6]
				if (a[i] == a[i - 1]) {
					a.splice(i--, 1);
				}
			}
		}
		return a;
	}

	/**
	 * Shallow comparison of two arrays.
	 *
	 * @param a, b
	 *        The arrays to compare.
	 * @param equalFn
	 *        A custom comparison function that accepts two values a and
	 *        b from the given arrays and returns true or false for
	 *        equal and not equal respectively.
	 *
	 *        If no equalFn is provided, the algorithm will use the strict
	 *        equals operator.
	 * @return
	 *        True if all items in a and b are equal, false if not.
	 */
	function equal(a, b, equalFn) {
		var i,
			len = a.length;
		if (len !== b.length) {
			return false;
		}
		if (equalFn) {
			for (i = 0; i < len; i++) {
				if (!equalFn(a[i], b[i])) {
					return false;
				}
			}
		} else {
			for (i = 0; i < len; i++) {
				if (a[i] !== b[i]) {
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * Emulates ECMAScript edition 5 Arrays.map
	 * See https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
	 * And http://es5.github.com/#x15.4.4.19
	 * It's not exactly according to standard, but it does what one expects.
	 */
	function map(a, fn) {
		var i, len, result = [];
		for (i = 0, len = a.length; i < len; i++) {
			result.push(fn(a[i]));
		}
		return result;
	}

	function mapNative(a, fn) {
		// Call map directly on the object instead of going through
		// Array.prototype.map. This avoids the problem that we may get
		// passed an array-like object (NodeList) which may cause an
		// error if the implementation of Array.prototype.map can only
		// deal with arrays (Array.prototype.map may be native or
		// provided by a javscript framework).
		return a.map(fn);
	}

	/**
	 * Returns a new array that contains all values in the given a for
	 * which pred returns true.
	 */
	function filter(a, pred) {
		var i,
		    len,
		    value,
		    result = [];
		for (i = 0, len = a.length; i < len; i++) {
			value = a[i];
			if (pred(value)) {
				result.push(value);
			}
		}
		return result;
	}

	/**
	 * Finds a value in the given array.
	 * Strict comparison is used to find the value.
	 * Returns the index of the first occurrence of the given value in
	 * the given a, or -1 if a contains no such value.
	 */
	function indexOf(a, value) {
		var i,
		    len;
		for (i = 0, len = a.length; i < len; i++) {
			if (value === a[i]) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * Reduces an array of values to a single value.
	 *
	 * For example:
	 * Arrays.reduce([2, 3, 4], 1, function (a, b) { return a + b; });
	 * returns the result of (((1 + 2) + 3) + 4)
	 *
	 * Emulates ECMAScript edition 5 Array.reduce.
	 *
	 * @param a
	 *        An array of values.
	 * @param init
	 *        An initial value.
	 * @param fn
	 *        A function that takes two values and returns the reduction
	 *        of both.
	 */
	function reduce(a, init, fn) {
		var i,
		    len;
		for (i = 0, len = a.length; i < len; i++) {
			init = fn(init, a[i]);
		}
		return init;
	}

	/**
	 * Returns true if the given xs contains the given x.
	 */
	function contains(xs, x) {
		return -1 !== indexOf(xs, x);
	}

	/**
	 * Applies the given value to the given function unless the value is
	 * null, in which case just returns null.
	 *
	 * This is a utility function to be used with reduce().
	 */
	function applyNotNull(value, fn) {
		return value == null ? null : fn(value);
	}

	/**
	 * For each item in xs, call cb(item, index, xs).
	 *
	 * Emulates ECMAScript edition 5 Array.forEach.
	 */
	function forEach(xs, cb) {
		var i,
		    len;
		for (i = 0, len = xs.length; i < len; i++) {
			cb(xs[i], i, xs);
		}
	}

	/**
	 * Returns true if the given predicate function returns true for at
	 * least one item.
	 *
	 * Emulates ECMAScript edition 5 Array.some.
	 */
	function some(xs, pred) {
		var i,
		    len;
		for (i = 0, len = xs.length; i < len; i++) {
			if (pred(xs[i])) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Returns true if the given predicate function returns true for all
	 * items in xs.
	 *
	 * Emulates ECMAScript edition 5 Array.every.
	 */
	function every(xs, pred) {
		return !some(xs, Fn.complement(pred));
	}

	/**
	 * Returns all items in xs that are also contained in zs.
	 */
	function intersect(xs, zs) {
		return filter(xs, function (x) {
			return contains(zs, x);
		});
	}

	/**
	 * Returns the last item in xs or null.
	 */
	function last(xs) {
		return xs.length ? xs[xs.length - 1] : null;
	}

	/**
	 * Returns the second item in xs.
	 */
	function second(xs) {
		return xs[1];
	}

	return {
		filter: filter,
		indexOf: indexOf,
		reduce: reduce,
		forEach: forEach,
		some: some,
		every: every,
		map: Array.prototype.map ? mapNative : map,
		contains: contains,
		equal: equal,
		applyNotNull: applyNotNull,
		sortUnique: sortUnique,
		intersect: intersect,
		second: second,
		last: last
	};
});

/* strings.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('util/strings',['jquery'], function ($) {
	

	var spacesRx = /\s+/;

	/**
	 * Splits a string into individual words.
	 *
	 * Words are non-empty sequences of non-space characaters.
	 */
	function words(str) {
		var list = str.split(spacesRx);
		// "  x  ".split(/\s+/) => ["", "x", ""] (Chrome)
		// "".split(/\s+/) => [""] (Chrome)
		if (list.length && list[0] === "") {
			list.shift();
		}
		if (list.length && list[list.length - 1] === "") {
			list.pop();
		}
		return list;
	}

	/**
	 * Converst a dashes form into camel cased form.
	 *
	 * For example 'data-my-attr' becomes 'dataMyAttr'.
	 *
	 * @param {string} s
	 *        Should be all lowercase and should not begin with a dash
	 */
	function dashesToCamelCase(s) {
		return s.replace(/[\-]([a-z])/gi, function (all, upper) {
			return upper.toUpperCase();
		});
	}

	/**
	 * Converts a camel cased form into dashes form.
	 *
	 * For example
	 * 'dataMyAttr' becomes 'data-my-attr',
	 * 'dataAB'     becomes 'data-a-b'.
	 *
	 * @param {string} s
	 *        Should begin with a lowercase letter and should not contain dashes.
	 */
	function camelCaseToDashes(s) {
		return s.replace(/[A-Z]/g, function (match) {
			return '-' + match.toLowerCase();
		});
	}

	/**
	 * Split str along pattern, including matches in the result.
	 *
	 * Necssary because, although "xzx".split(/(z)/) results in
	 * ["x", "z", "x"] on most modern browsers, it results in
	 * ["x", "x"] on IE.
	 *
	 * @param pattern must include the g flag, otherwise will result in
	 * an endless loop.
	 */
	function splitIncl(str, pattern) {
		var result = [];
		var lastIndex = 0;
		var match;
		while (null != (match = pattern.exec(str))) {
			if (lastIndex < match.index) {
				result.push(str.substring(lastIndex, match.index));
				lastIndex = match.index;
			}
			lastIndex += match[0].length;
			result.push(match[0]);
		}
		if (lastIndex < str.length) {
			result.push(str.substring(lastIndex, str.length));
		}
		return result;
	}

	/**
	 * Returns true for the empty string, null and undefined.
	 */
	function empty(str) {
		return "" === str || null == str;
	}

	return {
		words: words,
		dashesToCamelCase: dashesToCamelCase,
		camelCaseToDashes: camelCaseToDashes,
		splitIncl: splitIncl,
		empty: empty
	};
});

/*!
 * Aloha Editor
 * Author & Copyright (c) 2012 Gentics Software GmbH
 * aloha-sales@gentics.com
 * Licensed under the terms of http://www.aloha-editor.com/license.html
 *
 * @overview Provides methods to broker publish/subscribe facilities.
 */
define('PubSub', [], function () {
	

	/**
	 * A hash of channel names mapped to an array of ids of subscriptions that
	 * are listening on that channel.
	 *
	 * @type {Object<String, Array.<Number>>}
	 */
	var channels = {};

	/**
	 * A hash of subscription tuples (channel, callback), mapped against unique
	 * ids assigned to each subscription.
	 * As subscriptions are removed from this object via `unsub()' this object
	 * will become a sparse array.
	 *
	 * @type {Object<Number, Object>}
	 */
	var subscriptions = {};

	/**
	 * The last used subscription id.  This values is only used and modified in
	 * `sub().'
	 *
	 * @type {number}
	 */
	var sid = 0;

	/**
	 * Returns the channel to which a subscription matching the given sid is
	 * listening on.
	 *
	 * @param {Number} sid Id of subscription.
	 * @return {Array.<Object>} sid Id of subscription.
	 */
	function getSubscriptionChannel(sid) {
		return subscriptions[sid] && channels[subscriptions[sid].channel];
	}

	/**
	 * Publishes a message `message' on the given channel.
	 * All callbacks that have sub()scribed to listen on this channel will be
	 * invoked and receive `message' as their only argument.
	 *
	 * @private
	 * @param {String} channel Name of channel to publish the message on.
	 * @param {*} message Variable to pass to all callbacks listening on the
	 *                    given channel.
	 * @return {Number} The number of subscribed callbacks that were invoked.
	 */
	function pub(channel, message) {
		if (!channels[channel]) {
			return 0;
		}

		if (!message) {
			message = {};
		} else if (typeof message !== 'object') {
			message = {
				data: message
			};
		}

		message.channel = channel;

		// Clone a immutable snapshot of the subscription ids that we can
		// safetly iterate over.
		var sids = channels[channel].slice();

		// NB: It is necessary to read the size of the `sids' array on each
		// iteration, in case the size changes (via unsubscription) between
		// iterations.
		var i;
		for (i = 0; i < sids.length; ++i) {
			subscriptions[sids[i]].callback(message);
		}

		return i;
	}

	var PubSub = {

		/**
		 * Subscribes a callback function to a channel.  Whenever this channel
		 * publishes, this function will be invoked.  The return value is an id
		 * which identifies this subscription (a channel, and callback tuple).
		 * This id can be used to unsubscribe this subscription from the given
		 * channel.
		 *
		 * @param {String} channel Name of channel to listen on.
		 * @param {Function(Object)} callback Function to be invoked when
		 *                                    messages are published on the
		 *                                    given channel.
		 * @return {Number} Positive integer representing the sid of this
		 *                  subscription, that can be used with unsub() if
		 *                  subscription succeeds.  Otherwise the return value
		 *                  is -1;
		 */
		sub: function (channel, callback) {
			if (typeof callback !== 'function') {
				return -1;
			}

			var subscriptionIds = channels[channel];

			if (!subscriptionIds) {
				subscriptionIds = channels[channel] = [];
			}

			subscriptionIds.push(++sid);
			subscriptions[sid] = {
				channel  : channel,
				callback : callback
			};

			return sid;
		},

		/**
		 * Unsubscribes callback using an sid which was returned by sub() when
		 * the callback was subscribed.  Returns true if a subscription for
		 * this sid was found and removed, otherwise returns false.
		 *
		 * @param {Number} sid Id of subscription.
		 * @return {Boolean} True if a a subscription matching this sid was
		 *                   removed.
		 */
		unsub: function (sid) {
			if (-1 === sid || !subscriptions[sid]) {
				return false;
			}

			var subscriptionIds = getSubscriptionChannel(sid);

			// assert(typeof subscriptionIds === 'array')

			delete subscriptions[sid];
			var j = subscriptionIds.length;

			while (j) {
				if (subscriptionIds[--j] === sid) {
					subscriptionIds.splice(j, 1);
					return true;
				}
			}

			return false;
		},

		/**
		 * Publishes a message `message' on all channels that can be derived
		 * from the given channel name.
		 *
		 * @param {String} channel Name of channel to publish the message on.
		 * @param {*} message Variable to pass to all callbacks listening on
		 *                    the given channel.
		 * @return {Number} The number of subscribed callbacks that were
		 *                  invoked.
		 */
		pub: function (channel, message) {
			var segments = channel.split('.');
			var i;
			var len = segments.length;
			var channelName = '';
			var tally = 0;

			for (i = 0; i < len; ++i) {
				channelName += (0 === i ? '' : '.') + segments[i];
				tally += pub(channelName, message);
			}

			return tally;
		}

	};

	return PubSub;
});

/* maps.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('util/maps',[], function () {
	

	/**
	 * Checks whether the given object has no own or inherited properties.
	 *
	 * @param {!Object} obj The object to check.
	 * @return {boolean} True if the object is empty. eg: isEmpty({}) == true
	 */
	function isEmpty(obj) {
		var name;
		for (name in obj) {
			if (obj.hasOwnProperty(name)) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Fill the given map with the given keys mapped to the given value.
	 *
	 * @param map
	 *        The given map will have one entry added for each given key.
	 * @param keys
	 *        An array of string keys. Javascript maps can only
	 *        contain string keys, so these must be strings or
	 *        or they will be cast to string.
	 * @param value
	 *        A single value that each given key will map to.
	 * @return
	 *        The given map.
	 */
	function fillKeys(map, keys, value) {
		var i = keys.length;
		while (i--) {
			map[keys[i]] = value;
		}
		return map;
	}

	/**
	 * Fill the given map with entries from the given tuples.
	 *
	 * @param map
	 *        The given map will have one entry added for each item in
	 *        the given array.
	 * @param tuples
	 *        An array of [key, value] tuples. Javascript maps can only
	 *        contain string keys, so the keys must be strings or
	 *        or they will be cast to string.
	 * @return
	 *        The given map.
	 */
	function fillTuples(map, tuples) {
		var i = tuples.length,
			tuple;
		while (i--) {
			tuple = tuples[i];
			map[tuple[0]] = tuple[1];
		}
		return map;
	}

	/**
	 * Returns an array of the map's keys.
	 */
	function keys(map) {
		var ks = [],
			k;
		for (k in map) {
			if (map.hasOwnProperty(k)) {
				ks.push(k);
			}
		}
		return ks;
	}

	/**
	 * For each mapping, call cb(value, key, map).
	 *
	 * Emulates ECMAScript edition 5 Array.forEach.
	 *
	 * Contrary to "for (key in map)" iterates only over the
	 * "hasOwnProperty" properties of the map, which is usually what you
	 * want.
	 */
	function forEach(map, cb) {
		var key;
		for (key in map) {
			if (map.hasOwnProperty(key)) {
				cb(map[key], key, map);
			}
		}
	}

	return {
		isEmpty: isEmpty,
		fillTuples: fillTuples,
		fillKeys: fillKeys,
		keys: keys,
		forEach: forEach
	};
});

/* ephemera.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('util/browser',['jquery'], function ($) {
	
	return {
		ie7: $.browser.msie && parseInt($.browser.version, 10) < 8
	};
});

/* dom2.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('util/dom2',[
	'aloha/core',
	'jquery',
	'util/functions',
	'util/maps',
	'util/arrays',
	'util/strings',
	'util/browser',
	'util/dom',
	'util/range'
], function (
	Aloha,
	$,
	Fn,
	Maps,
	Arrays,
	Strings,
	Browser,
	Dom1,
	RangeObject
) {
	

	var spacesRx = /\s+/;
	var attrRegex = /\s([^\/<>\s=]+)(?:=(?:"[^"]*"|'[^']*'|[^>\/\s]+))?/g;

	/**
	 * Like insertBefore, inserts firstChild into parent before
	 * refChild, except also inserts all the following siblings of
	 * firstChild.
	 */
	function moveNextAll(parent, firstChild, refChild) {
		while (firstChild) {
			var nextChild = firstChild.nextSibling;
			parent.insertBefore(firstChild, refChild);
			firstChild = nextChild;
		}
	}

	/**
	 * Used to serialize outerHTML of DOM elements in older (pre-HTML5) Gecko,
	 * Safari, and Opera browsers.
	 *
	 * Beware that XMLSerializer generates an XHTML string (<div class="team" />
	 * instead of <div class="team"></div>).  It is noted here:
	 * http://stackoverflow.com/questions/1700870/how-do-i-do-outerhtml-in-firefox
	 * that some browsers (like older versions of Firefox) have problems with
	 * XMLSerializer, and an alternative, albeit more expensive option, is
	 * described.
	 *
	 * @type {XMLSerializer|null}
	 */
	var Serializer = window.XMLSerializer && new window.XMLSerializer();

	/**
	 * Gets the serialized HTML that describes the given DOM element and its
	 * innerHTML.
	 *
	 * Polyfill for older versions of Gecko, Safari, and Opera browsers.
	 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=92264 for background.
	 *
	 * @param {HTMLElement} node DOM Element.
	 * @return {String}
	 */
	function outerHtml(node) {
		var html = node.outerHTML;
		if (typeof html !== 'undefined') {
			return html;
		}
		try {
			return Serializer ? Serializer.serializeToString(node) : node.xml;
		} catch (e) {
			return node.xml;
		}
	}

	/**
	 * Retrieves the names of all attributes from the given elmenet.
	 *
	 * Correctly handles the case that IE7 and IE8 have approx 70-90
	 * default attributes on each and every element.
	 *
	 * This implementation does not iterate over the elem.attributes
	 * property since that is much slower on IE7 (even when
	 * checking the attrNode.specified property). Instead it parses the
	 * HTML of the element. For elements with few attributes the
	 * performance on IE7 is improved by an order of magnitued.
	 *
	 * On IE7, when you clone a <button disabled="disabled"/> or an
	 * <input checked="checked"/> element the boolean properties will
	 * not be set on the cloned node. We choose the speed optimization
	 * over correctness in this case. The dom-to-xhtml plugin has a
	 * workaround for this case.
	 */
	function attrNames(elem) {
		var names = [];
		var html = outerHtml(elem.cloneNode(false));
		var match;
		while (null != (match = attrRegex.exec(html))) {
			names.push(match[1]);
		}
		return names;
	}

	/**
	 * Gets the attributes of the given element.
	 *
	 * See attrNames() for an edge case on IE7.
	 *
	 * @param elem
	 *        An element to get the attributes for.
	 * @return
	 *        An array containing [name, value] tuples for each attribute.
	 *        Attribute values will always be strings, but possibly empty strings.
	 */
	function attrs(elem) {
		var as = [];
		var names = attrNames(elem);
		var i;
		var len;
		for (i = 0, len = names.length; i < len; i++) {
			var name = names[i];
			var value = $.attr(elem, name);
			if (null == value) {
				value = "";
			} else {
				value = value.toString();
			}
			as.push([name, value]);
		}
		return as;
	}

	/**
	 * Like indexByClass() but operates on a list of elements instead.
	 * The given list may be a NodeList, HTMLCollection, or an array.
	 */
	function indexByClassHaveList(elems, classMap) {
		var index = {},
		    indexed,
		    classes,
		    elem,
		    cls,
		    len,
		    i,
		    j;
		for (i = 0, len = elems.length; i < len; i++) {
			elem = elems[i];
			if (elem.className) {
				classes = Strings.words(elem.className);
				for (j = 0; j < classes.length; j++) {
					cls = classes[j];
					if (classMap[cls]) {
						indexed = index[cls];
						if (indexed) {
							indexed.push(elem);
						} else {
							index[cls] = [elem];
						}
					}
				}
			}
		}
		return index;
	}

	/**
	 * Indexes descendant elements based on the individual classes in
	 * the class attribute.
	 *
	 * Based on these observations;
	 * 
	 * * $('.class1, .class2') takes twice as long as $('.class1') on IE7.
	 *
	 * * $('.class1, .class2') is fast on IE8 (approx the same as
	 *   $('.class'), no matter how many classes), but if the individual
	 *   elements in the result set should be handled differently, the
	 *   subsequent hasClass('.class1') and hasClass('.class2') calls
	 *   slow things down again.
	 *
	 * * DOM traversal with elem.firstChild elem.nextSibling is very
	 *   slow on IE7 compared to just iterating over
	 *   root.getElementsByTagName('*').
	 *
	 * * $('name.class') is much faster than just $('.class'), but as
	 *   soon as you need a single class in classMap that may be present
	 *   on any element, that optimization doesn't gain anything since
	 *   then you have to examine every element.
	 *
	 * This function will always take approx. the same amount of time
	 * (on IE7 approx. equivalent to a single call to $('.class')) no
	 * matter how many entries there are in classMap to index.
	 *
	 * This function only makes sense for multiple entries in
	 * classMap. For a single class lookup, $('.class') or
	 * $('name.class') is fine (even better in the latter case).
	 *
	 * @param root
	 *        The root element to search for elements to index
	 *        (will not be included in search).
	 * @param classMap
	 *        A map from class name to boolean true.
	 * @return
	 *        A map from class name to an array of elements with that class.
	 *        Every entry in classMap for which elements have been found
	 *        will have a corresponding entry in the returned
	 *        map. Entries for which no elements have been found, may or
	 *        may not have an entry in the returned map.
	 */
	function indexByClass(root, classMap) {
		var elems;
		if (Browser.ie7) {
			elems = root.getElementsByTagName('*');
		} else {
			// Optimize for browsers that support querySelectorAll/getElementsByClassName.
			// On IE8 for example, if there is a relatively high
			// elems/resultSet ratio, performance can improve by a factor of 2.
			elems = $(root).find('.' + Maps.keys(classMap).join(',.'));
		}
		return indexByClassHaveList(elems, classMap);
	}

	/**
	 * Indexes descendant elements based on elem.nodeName.
	 *
	 * Based on these observations:
	 *
	 * * On IE8, for moderate values of names.length, individual calls to
	 *   getElementsByTagName is just as fast as $root.find('name, name,
	 *   name, name').
	 *
	 * * On IE7, $root.find('name, name, name, name') is extemely slow
	 *   (can be an order of magnitude slower than individual calls to
	 *    getElementsByTagName, why is that?).
	 *
	 * * Although getElementsByTagName is very fast even on IE7, when
	 *   names.length > 7 an alternative implementation that iterates
	 *   over all tags and checks names from a hashmap (similar to how
	 *   indexByClass does it) may become interesting, but
	 *   names.length > 7 is unlikely.
	 *
	 * This function only makes sense if the given names array has many
	 * entries. For only one or two different names, calling $('name')
	 * or context.getElementsByTagName(name) directly is fine (but
	 * beware of $('name, name, ...') as explained above).
	 *
	 * The signature of this function differs from indexByClass by not
	 * taking a map but instead an array of names.
	 *
	 * @param root
	 *        The root element to search for elements to index
	 *        (will not be included in search).
	 * @param names
	 *        An array of element names to look for.
	 *        Names must be in all-uppercase (the same as elem.nodeName).
	 * @return
	 *        A map from element name to an array of elements with that name.
	 *        Names will be all-uppercase.
	 *        Arrays will be proper arrays, not NodeLists.
	 *        Every entry in classMap for which elements have been found
	 *        will have a corresponding entry in the returned
	 *        map. Entries for which no elements have been found, may or
	 *        may not have an entry in the returned map.
	 */
	function indexByName(root, names) {
		var i,
		    index = {},
		    len;
		for (i = 0, len = names.length; i < len; i++) {
			var name = names[i];
			index[name] = $.makeArray(root.getElementsByTagName(name));
		}
		return index;
	}

	function nodeIndex(node) {
		var ret = 0;
		while (node.previousSibling) {
			ret++;
			node = node.previousSibling;
		}
		return ret;
	}

	/**
	 * Can't use elem.childNodes.length because
	 * http://www.quirksmode.org/dom/w3c_core.html
	 * "IE up to 8 does not count empty text nodes."
	 */
	function numChildren(elem) {
		var count = 0;
		var child = elem.firstChild;
		while (child) {
			count += 1;
			child = child.nextSibling;
		}
		return count;
	}

	function nodeLength(node) {
		if (1 === node.nodeType) {
			return numChildren(node);
		}
		if (3 === node.nodeType) {
			return node.length;
		}
		return 0;
	}

	function isAtEnd(node, offset) {
		return (1 === node.nodeType
				&& offset >= numChildren(node))
			|| (3 === node.nodeType
				&& offset === node.length
				&& !node.nextSibling);
	}

	/**
	 * @param node if a text node, should have a parent node.
	 */
	function nodeAtOffset(node, offset) {
		if (1 === node.nodeType && offset < numChildren(node)) {
			node = node.childNodes[offset];
		} else if (3 === node.nodeType && offset === node.length) {
			node = node.nextSibling || node.parentNode;
		}
		return node;
	}

	function removeShallow(node) {
		var parent = node.parentNode;
		moveNextAll(parent, node.firstChild, node);
		parent.removeChild(node);
	}

	function wrap(node, wrapper) {
		node.parentNode.replaceChild(wrapper, node);
		wrapper.appendChild(node);
	}

	function insert(node, ref, atEnd) {
		if (atEnd) {
			ref.appendChild(node);
		} else {
			ref.parentNode.insertBefore(node, ref);
		}
	}

	function Cursor(node, atEnd) {
		this.node = node;
		this.atEnd = atEnd;
	}

	/**
	 * A cursor has the added utility over other iteration methods of
	 * iterating over the end position of an element. The start and end
	 * positions of an element are immediately before the element and
	 * immediately after the last child respectively. All node positions
	 * except end positions can be identified just by a node. To
	 * distinguish between element start and end positions, the
	 * additional atEnd boolean is necessary.
	 */
	function cursor(node, atEnd) {
		return new Cursor(node, atEnd);
	}

	Cursor.prototype.next = function () {
		var node = this.node;
		var next;
		if (this.atEnd || 1 !== node.nodeType) {
			next = node.nextSibling;
			if (next) {
				this.atEnd = false;
			} else {
				next = node.parentNode;
				if (!next) {
					return false;
				}
				this.atEnd = true;
			}
			this.node = next;
		} else {
			next = node.firstChild;
			if (next) {
				this.node = next;
			} else {
				this.atEnd = true;
			}
		}
		return true;
	};

	Cursor.prototype.prev = function () {
		var node = this.node;
		var prev;
		if (this.atEnd) {
			prev = node.lastChild;
			if (prev) {
				this.node = prev;
			} else {
				this.atEnd = false;
			}
		} else {
			prev = node.previousSibling;
			if (prev) {
				if (1 === node.nodeType) {
					this.atEnd = true;
				}
			} else {
				prev = node.parentNode;
				if (!prev) {
					return false;
				}
			}
			this.node = prev;
		}
		return true;
	};

	Cursor.prototype.equals = function (cursor) {
		return cursor.node === this.node && cursor.atEnd === this.atEnd;
	};

	Cursor.prototype.clone = function (cursor) {
		return cursor(cursor.node, cursor.atEnd);
	};

	Cursor.prototype.insert = function (node) {
		return insert(node, this.node, this.atEnd);
	};

	/**
	 * @param offset if node is a text node, the offset will be ignored.
	 * @param node if a text node, should have a parent node.
	 */
	function cursorFromBoundaryPoint(node, offset) {
		return cursor(nodeAtOffset(node, offset), isAtEnd(node, offset));
	}

	function parentsUntil(node, pred) {
		var parents = [];
		var parent = node.parentNode;
		while (parent && !pred(parent)) {
			parents.push(parent);
			parent = parent.parentNode;
		}
		return parents;
	}

	function parentsUntilIncl(node, pred) {
		var parents = parentsUntil(node, pred);
		var topmost = parents.length ? parents[parents.length - 1] : node;
		if (topmost.parentNode) {
			parents.push(topmost.parentNode);
		}
		return parents;
	}

	function childAndParentsUntil(node, pred) {
		if (pred(node)) {
			return [];
		}
		var parents = parentsUntil(node, pred);
		parents.unshift(node);
		return parents;
	}

	function childAndParentsUntilIncl(node, pred) {
		if (pred(node)) {
			return [node];
		}
		var parents = parentsUntilIncl(node, pred);
		parents.unshift(node);
		return parents;
	}

	function childAndParentsUntilNode(node, untilNode) {
		return childAndParentsUntil(node, function (nextNode) {
			return nextNode === untilNode;
		});
	}

	function childAndParentsUntilInclNode(node, untilInclNode) {
		return childAndParentsUntilIncl(node, function (nextNode) {
			return nextNode === untilInclNode;
		});
	}

	function next(node, until, arg) {
		while (node && !until(node, arg)) {
			node = node.nextSibling;
		}
		return node;
	}

	function parent(node, until, arg) {
		while (node && !until(node, arg)) {
			node = node.parentNode;
		}
		return node;
	}

	function isTextNode(node) {
		return 3 === node.nodeType;
	}

	function splitTextNode(node, offset) {
		// Because node.splitText() is buggy on IE, split it manually.
		// http://www.quirksmode.org/dom/w3c_core.html
		var parent = node.parentNode;
		var text = node.nodeValue;
		if (0 === offset || offset >= text.length) {
			return node;
		}
		var before = document.createTextNode(text.substring(0, offset));
		var after = document.createTextNode(text.substring(offset, text.length));
		parent.insertBefore(before, node);
		parent.insertBefore(after, node);
		parent.removeChild(node);
		return before;
	}

	function adjustRangeAfterSplit(range, container, offset, setProp, splitNode, newNodeBeforeSplit) {
		if (container !== splitNode) {
			return;
		}
		var newNodeLength = newNodeBeforeSplit.length;
		if (offset === 0) {
			container = newNodeBeforeSplit.parentNode;
			offset = nodeIndex(newNodeBeforeSplit);
		} else if (offset < newNodeLength) {
			container = newNodeBeforeSplit;
		} else if (offset === newNodeLength) {
			container = newNodeBeforeSplit.parentNode;
			offset = nodeIndex(newNodeBeforeSplit) + 1;
		} else {// offset > newNodeLength
			var newNodeAfterSplit = newNodeBeforeSplit.nextSibling;
			container = newNodeAfterSplit;
			offset -= newNodeLength;
		}
		range[setProp].call(range, container, offset);
	}

	/**
	 * Splits the given text node at the given offset and, if the given
	 * range happens to have start or end containers equal to the given
	 * text node, adjusts it such that start and end position will point
	 * at the same position in the new text nodes.
	 *
	 * It is guaranteed that an adjusted boundary point will not point
	 * to the end of a text node. Instead, it will point to the next
	 * node. This guarantee often happens to be useful.
	 *
	 * If splitNode is not a text node, does nothing.
	 */
	function splitTextNodeAdjustRange(splitNode, splitOffset, range) {
		if (3 !== splitNode.nodeType) {
			return;
		}
		var sc = range.startContainer;
		var so = range.startOffset;
		var ec = range.endContainer;
		var eo = range.endOffset;
		var newNodeBeforeSplit = splitTextNode(splitNode, splitOffset);
		adjustRangeAfterSplit(range, sc, so, 'setStart', splitNode, newNodeBeforeSplit);
		adjustRangeAfterSplit(range, ec, eo, 'setEnd', splitNode, newNodeBeforeSplit);
	}

	function splitTextContainers(range) {
		var sc = range.startContainer;
		var so = range.startOffset;
		splitTextNodeAdjustRange(sc, so, range);
		// Because the range may have been adjusted.
		var ec = range.endContainer;
		var eo = range.endOffset;
		splitTextNodeAdjustRange(ec, eo, range);
	}

	function walkUntil(node, fn, until, arg) {
		while (node && !until(node, arg)) {
			var next = node.nextSibling;
			fn(node, arg);
			node = next;
		}
	}

	function walk(node, fn, arg) {
		walkUntil(node, fn, Fn.returnFalse, arg);
	}

	/**
	 * Depth-first postwalk of the given DOM node.
	 */
	function walkRec(node, fn, arg) {
		if (1 === node.nodeType) {
			walk(node.firstChild, function (node) {
				walkRec(node, fn, arg);
			});
		}
		fn(node, arg);
	}

	function walkUntilNode(node, fn, untilNode, arg) {
		walkUntil(node, fn, function (nextNode) {
			return nextNode === untilNode;
		}, arg);
	}

	function StableRange(range) {
		if (!range) {
			return;
		}
		this.startContainer = range.startContainer;
		this.startOffset = range.startOffset;
		this.endContainer = range.endContainer;
		this.endOffset = range.endOffset;
		this.commonAncestorContainer = range.commonAncestorContainer;
		this.collapsed = range.collapsed;
	}

	StableRange.prototype.update = function () {
		if (!this.startContainer || !this.endContainer) {
			return;
		}
		this.collapsed = (this.startContainer === this.endContainer
						  && this.startOffset === this.endOffset);
		var start = childAndParentsUntil(this.startContainer, Fn.returnFalse);
		var end   = childAndParentsUntil(this.endContainer, Fn.returnFalse);
		this.commonAncestorContainer = Arrays.intersect(start, end)[0];
	};

	StableRange.prototype.setStart = function (sc, so) {
		this.startContainer = sc;
		this.startOffset = so;
		this.update();
	};

	StableRange.prototype.setEnd = function (ec, eo) {
		this.endContainer = ec;
		this.endOffset = eo;
		this.update();
	};

	function setRangeStartFromCursor(range, cursor) {
		if (cursor.atEnd) {
			range.setStart(cursor.node, numChildren(cursor.node));
		} else {
			range.setStart(cursor.node.parentNode, nodeIndex(cursor.node));
		}
	}

	function setRangeEndFromCursor(range, cursor) {
		if (cursor.atEnd) {
			range.setEnd(cursor.node, numChildren(cursor.node));
		} else {
			range.setEnd(cursor.node.parentNode, nodeIndex(cursor.node));
		}
	}

	function setRangeFromRef(range, ref) {
		range.setStart(ref.startContainer, ref.startOffset);
		range.setEnd(ref.endContainer, ref.endOffset);
	}

	/**
	 * A native range is live, which means that modifying the DOM may
	 * mutate the range. Also, using setStart/setEnd may not set the
	 * properties correctly (the browser may perform its own
	 * normalization of boundary points). The behaviour of a native
	 * range is very erratic and should be converted to a stable range
	 * as the first thing in any algorithm.
	 */
	function stableRange(range) {
		return new StableRange(range);
	}

	/**
	 * The dom cursor passed to ignoreLeft and ignoreRight does not
	 * traverse positions inside text nodes. The exact rules for when
	 * text node containers are passed are as follows: If the left
	 * boundary point is inside a text node, trimming will start before
	 * it. If the right boundary point is inside a text node, trimming
	 * will start after it.
	 */
	function trimRange(range, ignoreLeft, ignoreRight) {
		if (range.collapsed) {
			return;
		}
		var start = cursorFromBoundaryPoint(range.startContainer, range.startOffset);
		var end = cursorFromBoundaryPoint(range.endContainer, range.endOffset);
		var setStart = false;
		while (!start.equals(end) && ignoreLeft(start) && start.next()) {
			setStart = true;
		}
		ignoreRight = ignoreRight || ignoreLeft;
		var setEnd = false;
		// Because if the right boundary points is inside a text node,
		// trimming starts after it.
		if (3 === range.endContainer.nodeType
			    && range.endOffset > 0
			    // Because the cursor already normalizes
			    // endOffset == endContainer.length to the node next after it.
			    && range.endOffset < range.endContainer.length
			    && end.next()) {
			if (ignoreRight(end)) {
				end.prev();
			}
		}
		while (!end.equals(start) && ignoreRight(end) && end.prev()) {
			setEnd = true;
		}
		if (setStart) {
			setRangeStartFromCursor(range, start);
		}
		if (setEnd) {
			setRangeEndFromCursor(range, end);
		}
	}

	function trimRangeClosingOpening(range, ignoreLeft, ignoreRight) {
		ignoreRight = ignoreRight || ignoreLeft;
		trimRange(range, function (cursor) {
			return cursor.atEnd || ignoreLeft(cursor.node);
		}, function (cursor) {
			var prev = cursor.atEnd ? cursor.node.lastChild : cursor.node.previousSibling;
			return !prev || ignoreRight(prev);
		});
	}

	function areRangesEq(a, b) {
		return a.startContainer === b.startContainer
			&& a.startOffset    === b.startOffset
			&& a.endContainer   === b.endContainer
			&& a.endOffset      === b.endOffset;
	}

	function insertSelectText(text, range) {
		// Because empty text nodes are generally not nice and even
		// cause problems with IE8 (elem.childNodes).
		if (!text.length) {
			return;
		}
		splitTextNodeAdjustRange(range.startContainer, range.startOffset, range);
		var node = nodeAtOffset(range.startContainer, range.startOffset);
		var atEnd = isAtEnd(range.startContainer, range.startOffset);
		// Because if the node following the insert position is already
		// a text node we can just reuse it.
		if (!atEnd && 3 === node.nodeType) {
			node.insertData(0, text);
			range.setStart(node, 0);
			range.setEnd(node, text.length);
			return;
		}
		// Because if the node preceding the insert position is already
		// a text node we can just reuse it.
		var prev;
		if (!atEnd) {
			prev = node.previousSibling;
		} else {
			prev = node.lastChild;
		}
		if (prev && 3 === prev.nodeType) {
			prev.insertData(prev.length, text);
			range.setStart(prev, prev.length - text.length);
			range.setEnd(prev, prev.length);
			return;
		}
		// Because if we can't reuse any text nodes, we have to insert a
		// new one.
		var textNode = document.createTextNode(text);
		insert(textNode, node, atEnd);
		range.setStart(textNode, 0);
		range.setEnd(textNode, textNode.length);
	}

	function collapseToEnd(range) {
		range.setStart(range.endContainer, range.endOffset);
	}

	function rangeFromRangeObject(alohaRange) {
		var range = Aloha.createRange();
		range.setStart(alohaRange.startContainer, alohaRange.startOffset);
		range.setEnd(alohaRange.endContainer, alohaRange.endOffset);
		return range;
	}

	function extendToWord(range) {
		var rangeObject = new RangeObject(range);
		Dom1.extendToWord(rangeObject);
		setRangeFromRef(range, rangeObject);
	}

	function cloneShallow(node) {
		return node.cloneNode(false);
	}

	/**
	 * Sets a style on the given element by modifying it's style attribute.
	 */
	function setStyle(node, name, value) {
		// Because only the empty string removes a style.
		$(node).css(name, null == value ? '' : value);
	}

	/**
	 * Gets a style from the given element's style attribute.
	 * Note that this is different from the computed/inherited style.
	 */
	function getStyle(node, name) {
		// Because IE7 needs dashesToCamelCase().
		name = Strings.dashesToCamelCase(name);
		return node.nodeType === 1 ? node.style[name] : null;
	}

	/**
	 * Gets the computed/inherited style of the given node.
	 * @param node may be a text node.
	 */
	function getComputedStyle(node, name) {
		if (node.currentStyle) {
			return node.currentStyle[name];
		}
		var doc = node.ownerDocument;
		if (doc.defaultView && doc.defaultView.getComputedStyle) {
			var styles = doc.defaultView.getComputedStyle(node, null);
			if (styles) {
				return styles[name] || styles.getPropertyValue(name);
			}
		}
		return null;
	}

	return {
		moveNextAll: moveNextAll,
		attrNames: attrNames,
		attrs: attrs,
		indexByClass: indexByClass,
		indexByName: indexByName,
		indexByClassHaveList: indexByClassHaveList,
		outerHtml: outerHtml,
		removeShallow: removeShallow,
		wrap: wrap,
		insert: insert,
		cursor: cursor,
		cursorFromBoundaryPoint: cursorFromBoundaryPoint,
		nodeAtOffset: nodeAtOffset,
		isAtEnd: isAtEnd,
		parentsUntil: parentsUntil,
		parentsUntilIncl: parentsUntilIncl,
		childAndParentsUntil: childAndParentsUntil,
		childAndParentsUntilIncl: childAndParentsUntilIncl,
		childAndParentsUntilNode: childAndParentsUntilNode,
		childAndParentsUntilInclNode: childAndParentsUntilInclNode,
		next: next,
		parent: parent,
		isTextNode: isTextNode,
		nodeIndex: nodeIndex,
		splitTextNode: splitTextNode,
		splitTextContainers: splitTextContainers,
		walk: walk,
		walkRec: walkRec,
		walkUntil: walkUntil,
		walkUntilNode: walkUntilNode,
		stableRange: stableRange,
		trimRange: trimRange,
		trimRangeClosingOpening: trimRangeClosingOpening,
		setRangeFromRef: setRangeFromRef,
		setRangeStartFromCursor: setRangeStartFromCursor,
		setRangeEndFromCursor: setRangeEndFromCursor,
		splitTextNodeAdjustRange: splitTextNodeAdjustRange,
		insertSelectText: insertSelectText,
		areRangesEq: areRangesEq,
		collapseToEnd: collapseToEnd,
		extendToWord: extendToWord,
		rangeFromRangeObject: rangeFromRangeObject,
		cloneShallow: cloneShallow,
		setStyle: setStyle,
		getStyle: getStyle,
		getComputedStyle: getComputedStyle
	};
});

/* html.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor.
 * Copyright (c) 2010-2013 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php
 *
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('util/html',[
	'util/dom2',
	'util/maps',
	'util/arrays'
], function (
	Dom,
	Maps,
	Arrays
) {
	

	var inlineFormattableMap = {
		'A': true,
		'B': true,
		'EM': true,
		'FONT': true,
		'I': true,
		'S': true,
		'SPAN': true,
		'STRIKE': true,
		'STRONG': true,
		'SUB': true,
		'SUP': true,
		'U': true
	};

	// NB: "block-level" is not technically defined for elements that are new in
	// HTML5.
	var BLOCKLEVEL_ELEMENTS = [
		'address',
		'article',    // HTML5
		'aside',      // HTML5
		'audio',      // HTML5
		'blockquote',
		'canvas',     // HTML5
		'dd',
		'div',
		'dl',
		'fieldset',
		'figcaption',
		'figure',
		'footer',
		'form',
		'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
		'header',
		'hgroup',
		'hr',
		'noscript',
		'ol',
		'output',
		'p',
		'pre',
		'section',   // HTML5
		'table',
		'tfoot',
		'ul',
		'video'      // HTML5
	];

	/**
	 * Map containing lowercase and uppercase tagnames of block element as keys
	 * mapped against true.
	 *
	 * @type {object<string, boolean>}
	 */
	var blocksTagnameMap = {};
	Maps.fillKeys(blocksTagnameMap, BLOCKLEVEL_ELEMENTS, true);
	Maps.fillKeys(
		blocksTagnameMap,
		Arrays.map(BLOCKLEVEL_ELEMENTS, function (str) {
			return str.toUpperCase();
		}),
		true
	);

	function isBlock(node) {
		return blocksTagnameMap[node.nodeName];
	}

	function isIgnorableWhitespace(node) {
		return 3 === node.nodeType && !node.length;
	}

	function isInlineFormattable(node) {
		return inlineFormattableMap[node.nodeName];
	}

	/**
	 * Checks whether the given element is a block that contains a "propping"
	 * <br> element.
	 *
	 * A propping <br> is one which is inserted into block element to ensure
	 * that the otherwise empty element will be rendered visibly.
	 *
	 * @param {HTMLElement} node
	 * @return {boolean} True if node contains a propping <br>
	 */
	function isProppedBlock(node) {
		if (!blocksTagnameMap[node.nodeName]) {
			return false;
		}
		var found = false;
		var kids = node.children;
		var len = kids.length;
		var i;
		for (i = 0; i < len; i++) {
			if (!found && 'br' === kids[i].nodeName.toLowerCase()) {
				found = true;
			} else if (!isIgnorableWhitespace(kids[i])) {
				return false;
			}
		}
		return found;
	}

	function isEditingHost(node) {
		return 1 === node.nodeType && "true" === node.contentEditable;
	}

	/**
	 * Starting from the given node, and working backwards through the siblings,
	 * find the node that satisfies the given condition.
	 *
	 * @param {HTMLElement} node The node at which to start the search.
	 * @param {function(HTMLElement):boolean} condition A predicate the receives
	 *                                        one of children of `node`.
	 *
	 * @return {HTMLElement} The first node that meets the given condition.
	 */
	function findNodeRight(node, condition) {
		while (node && !condition(node)) {
			node = node.previousSibling;
		}
		return node;
	}

	/**
	 * Checks if the given editable is a valid container for paragraphs.
	 *
	 * @param {Aloha.Editable} editable The editable to be checked
	 *
	 * @return {boolean} False if the editable may not contain paragraphs
	 */
	function allowNestedParagraph(editable) {
		if (editable.obj.prop("tagName") === "SPAN" ||
				editable.obj.prop("tagName") === "P") {
			return false;
		}
		return true;
	}

	return {
		BLOCKLEVEL_ELEMENTS: BLOCKLEVEL_ELEMENTS,
		isBlock: isBlock,
		isIgnorableWhitespace: isIgnorableWhitespace,
		isInlineFormattable: isInlineFormattable,
		isProppedBlock: isProppedBlock,
		isEditingHost: isEditingHost,
		findNodeRight: findNodeRight,
		allowNestedParagraph: allowNestedParagraph
	};
});

define('aloha/engine',['aloha/core', 'aloha/ecma5shims', 'util/maps', 'util/html', 'jquery'], function (Aloha, $_, Maps, Html, jQuery) {
	

	function hasAttribute(obj, attr) {
		var native_method = obj.hasAttribute;
		if (native_method) {
			return obj.hasAttribute(attr);
		}
		return (typeof obj.attributes[attr] != "undefined");
	}

	var htmlNamespace = "http://www.w3.org/1999/xhtml";

	var cssStylingFlag = false;

	// This is bad :(
	var globalRange = null;

	// Commands are stored in a dictionary where we call their actions and such
	var commands = {};

	///////////////////////////////////////////////////////////////////////////////
	////////////////////////////// Utility functions //////////////////////////////
	///////////////////////////////////////////////////////////////////////////////
	//@{

	// Opera 11 puts HTML elements in the null namespace, it seems.
	function isHtmlNamespace(ns) {
		return ns === null || !ns || ns === htmlNamespace;
	}

	// "An HTML element is an Element whose namespace is the HTML namespace."
	//
	// I allow an extra argument to more easily check whether something is a
	// particular HTML element, like isNamedHtmlElement(node, 'OL').  It accepts arrays
	// too, like isHtmlElementInArray(node, ["OL", "UL"]) to check if it's an ol or ul.
	// TODO This function was prominent during profiling. Remove it
	//      and replace with calls to isAnyHtmlElement, isNamedHtmlElement
	//      and is isMappedHtmlElement.
	function isHtmlElement_obsolete(node, tags) {
		if (typeof tags == "string") {
			tags = [tags];
		}
		if (typeof tags == "object") {
			tags = $_(tags).map(function (tag) {
				return tag.toUpperCase();
			});
		}
		return node && node.nodeType == 1 && isHtmlNamespace(node.namespaceURI) && (typeof tags == "undefined" || $_(tags).indexOf(node.tagName) != -1);
	}

	function isAnyHtmlElement(node) {
		return node && node.nodeType == 1 && isHtmlNamespace(node.namespaceURI);
	}

	// name should be uppercase
	function isNamedHtmlElement(node, name) {
		return node && node.nodeType == 1 && isHtmlNamespace(node.namespaceURI)
		// This function is passed in a mix of upper and lower case names
			&& name.toUpperCase() === node.nodeName;
	}

	// TODO remove when isHtmlElementInArray is removed
	function arrayContainsInsensitive(array, str) {
		var i, len;
		str = str.toUpperCase();
		for (i = 0, len = array.length; i < len; i++) {
			if (array[i].toUpperCase() === str) {
				return true;
			}
		}
		return false;
	}
	// TODO replace calls to this function with calls to isMappedHtmlElement()
	function isHtmlElementInArray(node, array) {
		return node && node.nodeType == 1 && isHtmlNamespace(node.namespaceURI)
		// This function is passed in a mix of upper and lower case names
			&& arrayContainsInsensitive(array, node.nodeName);
	}

	// map must have all-uppercase keys
	function isMappedHtmlElement(node, map) {
		return node && node.nodeType == 1 && isHtmlNamespace(node.namespaceURI) && map[node.nodeName];
	}

	/**
	 * Method to count the number of styles in the given style
	 */
	function getStyleLength(node) {
		var s;
		var styleLength = 0;

		if (!node) {
			return 0;
		}

		if (!node.style) {
			return 0;
		}

		// some browsers support .length on styles
		if (typeof node.style.length !== 'undefined') {
			return node.style.length;
		}

		/*jslint forin: true*/ //not sure whether node.style.hasOwnProperty is valid
		for (s in node.style) {
			if (node.style[s] && node.style[s] !== 0 && node.style[s] !== 'false') {
				styleLength++;
			}
		}
		/*jslint forin: false*/

		return styleLength;
	}

	function toArray(obj) {
		if (!obj) {
			return null;
		}
		var array = [],
			i,
		    l = obj.length;
		// iterate backwards ensuring that length is an UInt32
		i = l >>> 0;
		while (i--) {
			array[i] = obj[i];
		}
		return array;
	}

	function nextNodeDescendants(node) {
		while (node && !node.nextSibling) {
			node = node.parentNode;
		}
		if (!node) {
			return null;
		}
		return node.nextSibling;
	}

	function nextNode(node) {
		if (node.hasChildNodes()) {
			return node.firstChild;
		}
		return nextNodeDescendants(node);
	}

	function previousNode(node) {
		if (node.previousSibling) {
			node = node.previousSibling;
			while (node.hasChildNodes()) {
				node = node.lastChild;
			}
			return node;
		}
		if (node.parentNode && node.parentNode.nodeType == $_.Node.ELEMENT_NODE) {
			return node.parentNode;
		}
		return null;
	}

	/**
	 * Returns true if ancestor is an ancestor of descendant, false otherwise.
	 */
	function isAncestor(ancestor, descendant) {
		return ancestor && descendant && Boolean($_.compareDocumentPosition(ancestor, descendant) & $_.Node.DOCUMENT_POSITION_CONTAINED_BY);
	}

	/**
	 * Returns true if ancestor is an ancestor of or equal to descendant, false
	 * otherwise.
	 */
	function isAncestorContainer(ancestor, descendant) {
		return (ancestor || descendant) && (ancestor == descendant || isAncestor(ancestor, descendant));
	}

	/**
	 * Returns true if descendant is a descendant of ancestor, false otherwise.
	 */
	function isDescendant(descendant, ancestor) {
		return ancestor && descendant && Boolean($_.compareDocumentPosition(ancestor, descendant) & $_.Node.DOCUMENT_POSITION_CONTAINED_BY);
	}

	/**
	 * Returns true if node1 is before node2 in tree order, false otherwise.
	 */
	function isBefore(node1, node2) {
		return Boolean($_.compareDocumentPosition(node1, node2) & $_.Node.DOCUMENT_POSITION_FOLLOWING);
	}

	/**
	 * Returns true if node1 is after node2 in tree order, false otherwise.
	 */
	function isAfter(node1, node2) {
		return Boolean($_.compareDocumentPosition(node1, node2) & $_.Node.DOCUMENT_POSITION_PRECEDING);
	}

	function getAncestors(node) {
		var ancestors = [];
		while (node.parentNode) {
			ancestors.unshift(node.parentNode);
			node = node.parentNode;
		}
		return ancestors;
	}

	function getDescendants(node) {
		var descendants = [];
		var stop = nextNodeDescendants(node);
		while (null != (node = nextNode(node)) && node != stop) {
			descendants.push(node);
		}
		return descendants;
	}

	function convertProperty(property) {
		// Special-case for now
		var map = {
			"fontFamily": "font-family",
			"fontSize": "font-size",
			"fontStyle": "font-style",
			"fontWeight": "font-weight",
			"textDecoration": "text-decoration"
		};
		if (typeof map[property] != "undefined") {
			return map[property];
		}

		return property;
	}

	// Return the <font size=X> value for the given CSS size, or undefined if there
	// is none.
	function cssSizeToLegacy(cssVal) {
		return {
			"xx-small": 1,
			"small": 2,
			"medium": 3,
			"large": 4,
			"x-large": 5,
			"xx-large": 6,
			"xxx-large": 7
		}[cssVal];
	}

	// Return the CSS size given a legacy size.
	function legacySizeToCss(legacyVal) {
		return {
			1: "xx-small",
			2: "small",
			3: "medium",
			4: "large",
			5: "x-large",
			6: "xx-large",
			7: "xxx-large"
		}[legacyVal];
	}

	// "the directionality" from HTML.  I don't bother caring about non-HTML
	// elements.
	//
	// "The directionality of an element is either 'ltr' or 'rtl', and is
	// determined as per the first appropriate set of steps from the following
	// list:"
	function getDirectionality(element) {
		// "If the element's dir attribute is in the ltr state
		//     The directionality of the element is 'ltr'."
		if (element.dir == "ltr") {
			return "ltr";
		}

		// "If the element's dir attribute is in the rtl state
		//     The directionality of the element is 'rtl'."
		if (element.dir == "rtl") {
			return "rtl";
		}

		// "If the element's dir attribute is in the auto state
		// "If the element is a bdi element and the dir attribute is not in a
		// defined state (i.e. it is not present or has an invalid value)
		//     [lots of complicated stuff]
		//
		// Skip this, since no browser implements it anyway.

		// "If the element is a root element and the dir attribute is not in a
		// defined state (i.e. it is not present or has an invalid value)
		//     The directionality of the element is 'ltr'."
		if (!isAnyHtmlElement(element.parentNode)) {
			return "ltr";
		}

		// "If the element has a parent element and the dir attribute is not in a
		// defined state (i.e. it is not present or has an invalid value)
		//     The directionality of the element is the same as the element's
		//     parent element's directionality."
		return getDirectionality(element.parentNode);
	}

	//@}

	///////////////////////////////////////////////////////////////////////////////
	///////////////////////////// DOM Range functions /////////////////////////////
	///////////////////////////////////////////////////////////////////////////////
	//@{

	function getNodeIndex(node) {
		var ret = 0;
		while (node.previousSibling) {
			ret++;
			node = node.previousSibling;
		}
		return ret;
	}

	// "The length of a Node node is the following, depending on node:
	//
	// ProcessingInstruction
	// DocumentType
	//   Always 0.
	// Text
	// Comment
	//   node's length.
	// Any other node
	//   node's childNodes's length."
	function getNodeLength(node) {
		switch (node.nodeType) {
		case $_.Node.PROCESSING_INSTRUCTION_NODE:
		case $_.Node.DOCUMENT_TYPE_NODE:
			return 0;

		case $_.Node.TEXT_NODE:
		case $_.Node.COMMENT_NODE:
			return node.length;

		default:
			return node.childNodes.length;
		}
	}

	/**
	 * The position of two boundary points relative to one another, as defined by
	 * DOM Range.
	 */
	function getPosition(nodeA, offsetA, nodeB, offsetB) {
		// "If node A is the same as node B, return equal if offset A equals offset
		// B, before if offset A is less than offset B, and after if offset A is
		// greater than offset B."
		if (nodeA == nodeB) {
			if (offsetA == offsetB) {
				return "equal";
			}
			if (offsetA < offsetB) {
				return "before";
			}
			if (offsetA > offsetB) {
				return "after";
			}
		}

		var documentPosition = $_.compareDocumentPosition(nodeB, nodeA);
		// "If node A is after node B in tree order, compute the position of (node
		// B, offset B) relative to (node A, offset A). If it is before, return
		// after. If it is after, return before."
		if (documentPosition & $_.Node.DOCUMENT_POSITION_FOLLOWING) {
			var pos = getPosition(nodeB, offsetB, nodeA, offsetA);
			if (pos == "before") {
				return "after";
			}
			if (pos == "after") {
				return "before";
			}
		}

		// "If node A is an ancestor of node B:"
		if (documentPosition & $_.Node.DOCUMENT_POSITION_CONTAINS) {
			// "Let child equal node B."
			var child = nodeB;

			// "While child is not a child of node A, set child to its parent."
			while (child.parentNode != nodeA) {
				child = child.parentNode;
			}

			// "If the index of child is less than offset A, return after."
			if (getNodeIndex(child) < offsetA) {
				return "after";
			}
		}

		// "Return before."
		return "before";
	}

	/**
	 * Returns the furthest ancestor of a Node as defined by DOM Range.
	 */
	function getFurthestAncestor(node) {
		var root = node;
		while (root.parentNode != null) {
			root = root.parentNode;
		}
		return root;
	}

	/**
	 * "contained" as defined by DOM Range: "A Node node is contained in a range
	 * range if node's furthest ancestor is the same as range's root, and (node, 0)
	 * is after range's start, and (node, length of node) is before range's end."
	 */
	function isContained(node, range) {
		var pos1 = getPosition(node, 0, range.startContainer, range.startOffset);
		if (pos1 !== "after") {
			return false;
		}
		var pos2 = getPosition(node, getNodeLength(node), range.endContainer, range.endOffset);
		if (pos2 !== "before") {
			return false;
		}
		return getFurthestAncestor(node) == getFurthestAncestor(range.startContainer);
	}

	/**
	 * Return all nodes contained in range that the provided function returns true
	 * for, omitting any with an ancestor already being returned.
	 */
	function getContainedNodes(range, condition) {
		if (typeof condition == "undefined") {
			condition = function () {
				return true;
			};
		}
		var node = range.startContainer;
		if (node.hasChildNodes() && range.startOffset < node.childNodes.length) {
			// A child is contained
			node = node.childNodes[range.startOffset];
		} else if (range.startOffset == getNodeLength(node)) {
			// No descendant can be contained
			node = nextNodeDescendants(node);
		} else {
			// No children; this node at least can't be contained
			node = nextNode(node);
		}

		var stop = range.endContainer;
		if (stop.hasChildNodes() && range.endOffset < stop.childNodes.length) {
			// The node after the last contained node is a child
			stop = stop.childNodes[range.endOffset];
		} else {
			// This node and/or some of its children might be contained
			stop = nextNodeDescendants(stop);
		}

		var nodeList = [];
		while (isBefore(node, stop)) {
			if (isContained(node, range) && condition(node)) {
				nodeList.push(node);
				node = nextNodeDescendants(node);
				continue;
			}
			node = nextNode(node);
		}
		return nodeList;
	}

	/**
	 * As above, but includes nodes with an ancestor that's already been returned.
	 */
	function getAllContainedNodes(range, condition) {
		if (typeof condition == "undefined") {
			condition = function () {
				return true;
			};
		}
		var node = range.startContainer;
		if (node.hasChildNodes() && range.startOffset < node.childNodes.length) {
			// A child is contained
			node = node.childNodes[range.startOffset];
		} else if (range.startOffset == getNodeLength(node)) {
			// No descendant can be contained
			node = nextNodeDescendants(node);
		} else {
			// No children; this node at least can't be contained
			node = nextNode(node);
		}

		var stop = range.endContainer;
		if (stop.hasChildNodes() && range.endOffset < stop.childNodes.length) {
			// The node after the last contained node is a child
			stop = stop.childNodes[range.endOffset];
		} else {
			// This node and/or some of its children might be contained
			stop = nextNodeDescendants(stop);
		}

		var nodeList = [];
		while (isBefore(node, stop)) {
			if (isContained(node, range) && condition(node)) {
				nodeList.push(node);
			}
			node = nextNode(node);
		}
		return nodeList;
	}

	// Returns either null, or something of the form rgb(x, y, z), or something of
	// the form rgb(x, y, z, w) with w != 0.
	function normalizeColor(color) {
		if (color.toLowerCase() == "currentcolor") {
			return null;
		}

		var outerSpan = document.createElement("span");
		document.body.appendChild(outerSpan);
		outerSpan.style.color = "black";

		var innerSpan = document.createElement("span");
		outerSpan.appendChild(innerSpan);
		innerSpan.style.color = color;
		color = $_.getComputedStyle(innerSpan).color;

		if (color == "rgb(0, 0, 0)") {
			// Maybe it's really black, maybe it's invalid.
			outerSpan.color = "white";
			color = $_.getComputedStyle(innerSpan).color;
			if (color != "rgb(0, 0, 0)") {
				return null;
			}
		}

		document.body.removeChild(outerSpan);

		// I rely on the fact that browsers generally provide consistent syntax for
		// getComputedStyle(), although it's not standardized.  There are only two
		// exceptions I found:
		if (/^rgba\([0-9]+, [0-9]+, [0-9]+, 1\)$/.test(color)) {
			// IE10PP2 seems to do this sometimes.
			return color.replace("rgba", "rgb").replace(", 1)", ")");
		}
		if (color == "transparent") {
			// IE10PP2, Firefox 7.0a2, and Opera 11.50 all return "transparent" if
			// the specified value is "transparent".
			return "rgba(0, 0, 0, 0)";
		}
		return color;
	}

	// Returns either null, or something of the form #xxxxxx, or the color itself
	// if it's a valid keyword.
	function parseSimpleColor(color) {
		color = color.toLowerCase();
		if ($_(["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"]).indexOf(color) != -1) {
			return color;
		}

		color = normalizeColor(color);
		var matches = /^rgb\(([0-9]+), ([0-9]+), ([0-9]+)\)$/.exec(color);
		if (matches) {
			return "#" + parseInt(matches[1], 10).toString(16).replace(/^.$/, "0$&") + parseInt(matches[2], 10).toString(16).replace(/^.$/, "0$&") + parseInt(matches[3], 10).toString(16).replace(/^.$/, "0$&");
		} else if (/^#[abcdef0123456789]+$/i.exec(color)) {
			// return hexadecimal color values (as returned by IE 7/8)
			return color;
		}
		return null;
	}

	//@}

	//////////////////////////////////////////////////////////////////////////////
	/////////////////////////// Edit command functions ///////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////
	///// Methods of the HTMLDocument interface /////
	/////////////////////////////////////////////////
	//@{

	var getStateOverride,
	    setStateOverride,
	    resetOverrides,
	    unsetStateOverride,
	    getValueOverride,
	    setValueOverride,
	    unsetValueOverride;

	var executionStackDepth = 0;

	// Helper function for fontSize's action plus queryOutputHelper.  It's just the
	// middle of fontSize's action, ripped out into its own function.
	function normalizeFontSize(value) {
		// "Strip leading and trailing whitespace from value."
		//
		// Cheap hack, not following the actual algorithm.
		value = $_(value).trim();

		// "If value is a valid floating point number, or would be a valid
		// floating point number if a single leading "+" character were
		// stripped:"
		if (/^[\-+]?[0-9]+(\.[0-9]+)?([eE][\-+]?[0-9]+)?$/.test(value)) {
			var mode;

			// "If the first character of value is "+", delete the character
			// and let mode be "relative-plus"."
			if (value[0] == "+") {
				value = value.slice(1);
				mode = "relative-plus";
				// "Otherwise, if the first character of value is "-", delete the
				// character and let mode be "relative-minus"."
			} else if (value[0] == "-") {
				value = value.slice(1);
				mode = "relative-minus";
				// "Otherwise, let mode be "absolute"."
			} else {
				mode = "absolute";
			}

			// "Apply the rules for parsing non-negative integers to value, and
			// let number be the result."
			//
			// Another cheap hack.
			var num = parseInt(value, 10);

			// "If mode is "relative-plus", add three to number."
			if (mode == "relative-plus") {
				num += 3;
			}

			// "If mode is "relative-minus", negate number, then add three to
			// it."
			if (mode == "relative-minus") {
				num = 3 - num;
			}

			// "If number is less than one, let number equal 1."
			if (num < 1) {
				num = 1;
			}

			// "If number is greater than seven, let number equal 7."
			if (num > 7) {
				num = 7;
			}

			// "Set value to the string here corresponding to number:" [table
			// omitted]
			value = {
				1: "xx-small",
				2: "small",
				3: "medium",
				4: "large",
				5: "x-large",
				6: "xx-large",
				7: "xxx-large"
			}[num];
		}

		return value;
	}

	function getLegacyFontSize(size) {
		// For convenience in other places in my code, I handle all sizes, not just
		// pixel sizes as the spec says.  This means pixel sizes have to be passed
		// in suffixed with "px", not as plain numbers.
		size = normalizeFontSize(size);

		if (jQuery.inArray(size, ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"]) == -1 && !/^[0-9]+(\.[0-9]+)?(cm|mm|in|pt|pc|px)$/.test(size)) {
			// There is no sensible legacy size for things like "2em".
			return null;
		}

		var font = document.createElement("font");
		document.body.appendChild(font);
		if (size == "xxx-large") {
			font.size = 7;
		} else {
			font.style.fontSize = size;
		}
		var pixelSize = parseInt($_.getComputedStyle(font).fontSize, 10);
		document.body.removeChild(font);

		// "Let returned size be 1."
		var returnedSize = 1;

		// "While returned size is less than 7:"
		while (returnedSize < 7) {
			// "Let lower bound be the resolved value of "font-size" in pixels
			// of a font element whose size attribute is set to returned size."
			font = document.createElement("font");
			font.size = returnedSize;
			document.body.appendChild(font);
			var lowerBound = parseInt($_.getComputedStyle(font).fontSize, 10);

			// "Let upper bound be the resolved value of "font-size" in pixels
			// of a font element whose size attribute is set to one plus
			// returned size."
			font.size = 1 + returnedSize;
			var upperBound = parseInt($_.getComputedStyle(font).fontSize, 10);
			document.body.removeChild(font);

			// "Let average be the average of upper bound and lower bound."
			var average = (upperBound + lowerBound) / 2;

			// "If pixel size is less than average, return the one-element
			// string consisting of the digit returned size."
			if (pixelSize < average) {
				return String(returnedSize);
			}

			// "Add one to returned size."
			returnedSize++;
		}

		// "Return "7"."
		return "7";
	}

	// Helper function for common behavior.
	function editCommandMethod(command, prop, range, callback) {
		var ret;

		// Set up our global range magic, but only if we're the outermost function
		if (executionStackDepth == 0 && typeof range != "undefined") {
			globalRange = range;
		} else if (executionStackDepth == 0) {
			globalRange = null;
			globalRange = range;
		}

		executionStackDepth++;
		try {
			ret = callback();
		} catch (e) {
			executionStackDepth--;
			throw e;
		}
		executionStackDepth--;
		return ret;
	}

	function myQueryCommandEnabled(command, range) {
		// "All of these methods must treat their command argument ASCII
		// case-insensitively."
		command = command.toLowerCase();

		// "If command is not supported, raise a NOT_SUPPORTED_ERR exception."
		return editCommandMethod(command, "action", range, (function (command) {
			return function () {
				// "Among commands defined in this specification, those listed in
				// Miscellaneous commands are always enabled. The other commands defined
				// here are enabled if the active range is not null, and disabled
				// otherwise."
				return jQuery.inArray(command, ["copy", "cut", "paste", "selectall", "stylewithcss", "usecss"]) != -1 || range !== null;
			};
		}(command)));
	}

	function setActiveRange(range) {
		var rangeObject = new window.GENTICS.Utils.RangeObject();

		rangeObject.startContainer = range.startContainer;
		rangeObject.startOffset = range.startOffset;
		rangeObject.endContainer = range.endContainer;
		rangeObject.endOffset = range.endOffset;

		rangeObject.select();
	}

	function myExecCommand(commandArg, showUiArg, valueArg, range) {
		// "All of these methods must treat their command argument ASCII
		// case-insensitively."
		var command = commandArg.toLowerCase();
		var showUi = showUiArg;
		var value = valueArg;

		// "If only one argument was provided, let show UI be false."
		//
		// If range was passed, I can't actually detect how many args were passed
		// . . .
		if (arguments.length == 1 || (arguments.length >= 4 && typeof showUi == "undefined")) {
			showUi = false;
		}

		// "If only one or two arguments were provided, let value be the empty
		// string."
		if (arguments.length <= 2 || (arguments.length >= 4 && typeof value == "undefined")) {
			value = "";
		}

		// "If command is not supported, raise a NOT_SUPPORTED_ERR exception."
		//
		// "If command has no action, raise an INVALID_ACCESS_ERR exception."
		return editCommandMethod(command, "action", range, (function (command, showUi, value) {
			return function () {
				// "If command is not enabled, return false."
				if (!myQueryCommandEnabled(command)) {
					return false;
				}

				// "Take the action for command, passing value to the instructions as an
				// argument."
				commands[command].action(value, range);

				// always fix the range after the command is complete
				setActiveRange(range);

				// "Return true."
				return true;
			};
		}(command, showUi, value)));
	}

	function myQueryCommandIndeterm(command, range) {
		// "All of these methods must treat their command argument ASCII
		// case-insensitively."
		command = command.toLowerCase();

		// "If command is not supported, raise a NOT_SUPPORTED_ERR exception."
		//
		// "If command has no indeterminacy, raise an INVALID_ACCESS_ERR
		// exception."
		return editCommandMethod(command, "indeterm", range, (function (command) {
			return function () {
				// "If command is not enabled, return false."
				if (!myQueryCommandEnabled(command, range)) {
					return false;
				}

				// "Return true if command is indeterminate, otherwise false."
				return commands[command].indeterm(range);
			};
		}(command)));
	}

	function myQueryCommandState(command, range) {
		// "All of these methods must treat their command argument ASCII
		// case-insensitively."
		command = command.toLowerCase();

		// "If command is not supported, raise a NOT_SUPPORTED_ERR exception."
		//
		// "If command has no state, raise an INVALID_ACCESS_ERR exception."
		return editCommandMethod(command, "state", range, (function (command) {
			return function () {
				// "If command is not enabled, return false."
				if (!myQueryCommandEnabled(command, range)) {
					return false;
				}

				// "If the state override for command is set, return it."
				if (typeof getStateOverride(command, range) != "undefined") {
					return getStateOverride(command, range);
				}

				// "Return true if command's state is true, otherwise false."
				return commands[command].state(range);
			};
		}(command)));
	}

	// "When the queryCommandSupported(command) method on the HTMLDocument
	// interface is invoked, the user agent must return true if command is
	// supported, and false otherwise."
	function myQueryCommandSupported(command) {
		// "All of these methods must treat their command argument ASCII
		// case-insensitively."
		command = command.toLowerCase();

		return commands.hasOwnProperty(command);
	}

	function myQueryCommandValue(command, range) {
		// "All of these methods must treat their command argument ASCII
		// case-insensitively."
		command = command.toLowerCase();

		return editCommandMethod(command, "value", range, function () {
			// "If command is not supported or has no value, return the empty string."
			if (!commands.hasOwnProperty(command) || !commands[command].hasOwnProperty("value")) {
				return "";
			}

			// "If command is "fontSize" and its value override is set, convert the
			// value override to an integer number of pixels and return the legacy
			// font size for the result."
			if (command == "fontsize" && getValueOverride("fontsize", range) !== undefined) {
				return getLegacyFontSize(getValueOverride("fontsize", range));
			}

			// "If the value override for command is set, return it."
			if (typeof getValueOverride(command, range) != "undefined") {
				return getValueOverride(command, range);
			}

			// "Return command's value."
			return commands[command].value(range);
		});
	}
	//@}

	//////////////////////////////
	///// Common definitions /////
	//////////////////////////////
	//@{

	// "A prohibited paragraph child name is "address", "article", "aside",
	// "blockquote", "caption", "center", "col", "colgroup", "dd", "details",
	// "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer",
	// "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li",
	// "listing", "menu", "nav", "ol", "p", "plaintext", "pre", "section",
	// "summary", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul", or
	// "xmp"."
	var prohibitedParagraphChildNamesMap = {
		"ADDRESS": true,
		"ARTICLE": true,
		"ASIDE": true,
		"BLOCKQUOTE": true,
		"CAPTION": true,
		"CENTER": true,
		"COL": true,
		"COLGROUP": true,
		"DD": true,
		"DETAILS": true,
		"DIR": true,
		"DIV": true,
		"DL": true,
		"DT": true,
		"FIELDSET": true,
		"FIGCAPTION": true,
		"FIGURE": true,
		"FOOTER": true,
		"FORM": true,
		"H1": true,
		"H2": true,
		"H3": true,
		"H4": true,
		"H5": true,
		"H6": true,
		"HEADER": true,
		"HGROUP": true,
		"HR": true,
		"LI": true,
		"LISTING": true,
		"MENU": true,
		"NAV": true,
		"OL": true,
		"P": true,
		"PLAINTEXT": true,
		"PRE": true,
		"SECTION": true,
		"SUMMARY": true,
		"TABLE": true,
		"TBODY": true,
		"TD": true,
		"TFOOT": true,
		"TH": true,
		"THEAD": true,
		"TR": true,
		"UL": true,
		"XMP": true
	};

	// "A prohibited paragraph child is an HTML element whose local name is a
	// prohibited paragraph child name."
	function isProhibitedParagraphChild(node) {
		return isMappedHtmlElement(node, prohibitedParagraphChildNamesMap);
	}

	var nonBlockDisplayValuesMap = {
		"inline": true,
		"inline-block": true,
		"inline-table": true,
		"none": true
	};

	// "A block node is either an Element whose "display" property does not have
	// resolved value "inline" or "inline-block" or "inline-table" or "none", or a
	// Document, or a DocumentFragment."
	function isBlockNode(node) {
		return node && ((node.nodeType == $_.Node.ELEMENT_NODE && !nonBlockDisplayValuesMap[$_.getComputedStyle(node).display]) || node.nodeType == $_.Node.DOCUMENT_NODE || node.nodeType == $_.Node.DOCUMENT_FRAGMENT_NODE);
	}

	// "An inline node is a node that is not a block node."
	function isInlineNode(node) {
		return node && !isBlockNode(node);
	}

	// "An editing host is a node that is either an Element with a contenteditable
	// attribute set to the true state, or the Element child of a Document whose
	// designMode is enabled."
	function isEditingHost(node) {
		return node && node.nodeType == $_.Node.ELEMENT_NODE && (node.contentEditable == "true" || (node.parentNode && node.parentNode.nodeType == $_.Node.DOCUMENT_NODE && node.parentNode.designMode == "on"));
	}

	// "Something is editable if it is a node which is not an editing host, does
	// not have a contenteditable attribute set to the false state, and whose
	// parent is an editing host or editable."
	function isEditable(node) {
		// This is slightly a lie, because we're excluding non-HTML elements with
		// contentEditable attributes.
		return node && !isEditingHost(node) && (node.nodeType != $_.Node.ELEMENT_NODE || node.contentEditable != "false" || jQuery(node).hasClass('aloha-table-wrapper')) && (isEditingHost(node.parentNode) || isEditable(node.parentNode));
	}

	// Helper function, not defined in the spec
	function hasEditableDescendants(node) {
		var i;
		for (i = 0; i < node.childNodes.length; i++) {
			if (isEditable(node.childNodes[i]) || hasEditableDescendants(node.childNodes[i])) {
				return true;
			}
		}
		return false;
	}

	// "The editing host of node is null if node is neither editable nor an editing
	// host; node itself, if node is an editing host; or the nearest ancestor of
	// node that is an editing host, if node is editable."
	function getEditingHostOf(node) {
		if (isEditingHost(node)) {
			return node;
		}
		if (isEditable(node)) {
			var ancestor = node.parentNode;
			while (!isEditingHost(ancestor)) {
				ancestor = ancestor.parentNode;
			}
			return ancestor;
		}
		return null;
	}

	// "Two nodes are in the same editing host if the editing host of the first is
	// non-null and the same as the editing host of the second."
	function inSameEditingHost(node1, node2) {
		return getEditingHostOf(node1) && getEditingHostOf(node1) == getEditingHostOf(node2);
	}

	// "A collapsed line break is a br that begins a line box which has nothing
	// else in it, and therefore has zero height."
	function isCollapsedLineBreak(br) {
		if (!isNamedHtmlElement(br, 'br')) {
			return false;
		}

		// Add a zwsp after it and see if that changes the height of the nearest
		// non-inline parent.  Note: this is not actually reliable, because the
		// parent might have a fixed height or something.
		var ref = br.parentNode;
		while ($_.getComputedStyle(ref).display == "inline") {
			ref = ref.parentNode;
		}

		var origStyle = {
			height: ref.style.height,
			maxHeight: ref.style.maxHeight,
			minHeight: ref.style.minHeight
		};

		ref.style.height = 'auto';
		ref.style.maxHeight = 'none';
		if (!(jQuery.browser.msie && jQuery.browser.version < 8)) {
			ref.style.minHeight = '0';
		}
		var space = document.createTextNode('\u200b');
		var origHeight = ref.offsetHeight;
		if (origHeight == 0) {
			throw 'isCollapsedLineBreak: original height is zero, bug?';
		}
		br.parentNode.insertBefore(space, br.nextSibling);
		var finalHeight = ref.offsetHeight;
		space.parentNode.removeChild(space);

		ref.style.height = origStyle.height;
		ref.style.maxHeight = origStyle.maxHeight;
		if (!(jQuery.browser.msie && jQuery.browser.version < 8)) {
			ref.style.minHeight = origStyle.minHeight;
		}

		// Allow some leeway in case the zwsp didn't create a whole new line, but
		// only made an existing line slightly higher.  Firefox 6.0a2 shows this
		// behavior when the first line is bold.
		return origHeight < finalHeight - 5;
	}

	// "An extraneous line break is a br that has no visual effect, in that
	// removing it from the DOM would not change layout, except that a br that is
	// the sole child of an li is not extraneous."
	function isExtraneousLineBreak(br) {

		if (!isNamedHtmlElement(br, 'br')) {
			return false;
		}

		if (isNamedHtmlElement(br.parentNode, "li") && br.parentNode.childNodes.length == 1) {
			return false;
		}

		// Make the line break disappear and see if that changes the block's
		// height.  Yes, this is an absurd hack.  We have to reset height etc. on
		// the reference node because otherwise its height won't change if it's not
		// auto.
		var ref = br.parentNode;
		while ($_.getComputedStyle(ref).display == "inline") {
			ref = ref.parentNode;
		}

		var origStyle = {
			height: ref.style.height,
			maxHeight: ref.style.maxHeight,
			minHeight: ref.style.minHeight,
			contentEditable: ref.contentEditable
		};

		ref.style.height = 'auto';
		ref.style.maxHeight = 'none';
		ref.style.minHeight = '0';
		// IE7 would ignore display:none in contentEditable, so we temporarily set it to false
		if (jQuery.browser.msie && jQuery.browser.version <= 7) {
			ref.contentEditable = 'false';
		}

		var origHeight = ref.offsetHeight;
		if (origHeight == 0) {
			throw "isExtraneousLineBreak: original height is zero, bug?";
		}

		var origBrDisplay = br.style.display;
		br.style.display = 'none';
		var finalHeight = ref.offsetHeight;

		// Restore original styles to the touched elements.
		ref.style.height = origStyle.height;
		ref.style.maxHeight = origStyle.maxHeight;
		ref.style.minHeight = origStyle.minHeight;
		// reset contentEditable for IE7
		if (jQuery.browser.msie && jQuery.browser.version <= 7) {
			ref.contentEditable = origStyle.contentEditable;
		}
		br.style.display = origBrDisplay;

		// https://github.com/alohaeditor/Aloha-Editor/issues/516
		// look like it works in msie > 7
		/* if (jQuery.browser.msie && jQuery.browser.version < 8) {
		   br.removeAttribute("style");
		   ref.removeAttribute("style");
		   } */

		return origHeight == finalHeight;
	}

	// "A whitespace node is either a Text node whose data is the empty string; or
	// a Text node whose data consists only of one or more tabs (0x0009), line
	// feeds (0x000A), carriage returns (0x000D), and/or spaces (0x0020), and whose
	// parent is an Element whose resolved value for "white-space" is "normal" or
	// "nowrap"; or a Text node whose data consists only of one or more tabs
	// (0x0009), carriage returns (0x000D), and/or spaces (0x0020), and whose
	// parent is an Element whose resolved value for "white-space" is "pre-line"."
	function isWhitespaceNode(node) {
		return node && node.nodeType == $_.Node.TEXT_NODE && (node.data == "" || (/^[\t\n\r ]+$/.test(node.data) && node.parentNode && node.parentNode.nodeType == $_.Node.ELEMENT_NODE && jQuery.inArray($_.getComputedStyle(node.parentNode).whiteSpace, ["normal", "nowrap"]) != -1) || (/^[\t\r ]+$/.test(node.data) && node.parentNode && node.parentNode.nodeType == $_.Node.ELEMENT_NODE && $_.getComputedStyle(node.parentNode).whiteSpace == "pre-line") || (/^[\t\n\r ]+$/.test(node.data) && node.parentNode && node.parentNode.nodeType == $_.Node.DOCUMENT_FRAGMENT_NODE));
	}

	/**
	 * Collapse sequences of ignorable whitespace (tab (0x0009), line feed (0x000A), carriage return (0x000D), space (0x0020)) to only one space.
	 * Preserve the given range if necessary.
	 * @param node text node
	 * @param range range
	 */
	function collapseWhitespace(node, range) {
		// "If node is neither editable nor an editing host, abort these steps."
		if (!isEditable(node) && !isEditingHost(node)) {
			return;
		}

		// if the given node is not a text node, return
		if (!node || node.nodeType !== $_.Node.TEXT_NODE) {
			return;
		}

		// if the node is in a pre or pre-wrap node, return
		if (jQuery.inArray($_.getComputedStyle(node.parentNode).whiteSpace, ["pre", "pre-wrap"]) != -1) {
			return;
		}

		// if the given node does not contain sequences of at least two consecutive ignorable whitespace characters, return
		if (!/[\t\n\r ]{2,}/.test(node.data)) {
			return;
		}

		var newData = '';
		var correctStart = range.startContainer == node;
		var correctEnd = range.endContainer == node;
		var wsFound = false;
		var i;

		// iterate through the node data
		for (i = 0; i < node.data.length; ++i) {
			if (/[\t\n\r ]/.test(node.data.substr(i, 1))) {
				// found a whitespace
				if (!wsFound) {
					// this is the first whitespace in the current sequence
					// add a whitespace to the new data sequence
					newData += ' ';
					// remember that we found a whitespace
					wsFound = true;
				} else {
					// this is not the first whitespace in the sequence, so omit this character
					if (correctStart && newData.length < range.startOffset) {
						range.startOffset--;
					}
					if (correctEnd && newData.length < range.endOffset) {
						range.endOffset--;
					}
				}
			} else {
				newData += node.data.substr(i, 1);
				wsFound = false;
			}
		}

		// set the new data
		node.data = newData;
	}

	// "node is a collapsed whitespace node if the following algorithm returns
	// true:"
	function isCollapsedWhitespaceNode(node) {
		// "If node is not a whitespace node, return false."
		if (!isWhitespaceNode(node)) {
			return false;
		}

		// "If node's data is the empty string, return true."
		if (node.data == "") {
			return true;
		}

		// "Let ancestor be node's parent."
		var ancestor = node.parentNode;

		// "If ancestor is null, return true."
		if (!ancestor) {
			return true;
		}

		// "If the "display" property of some ancestor of node has resolved value
		// "none", return true."
		if ($_(getAncestors(node)).some(function (ancestor) { return ancestor.nodeType == $_.Node.ELEMENT_NODE && $_.getComputedStyle(ancestor).display == "none"; })) {
			return true;
		}

		// "While ancestor is not a block node and its parent is not null, set
		// ancestor to its parent."
		while (!isBlockNode(ancestor) && ancestor.parentNode) {
			ancestor = ancestor.parentNode;
		}

		// "Let reference be node."
		var reference = node;

		// "While reference is a descendant of ancestor:"
		while (reference != ancestor) {
			// "Let reference be the node before it in tree order."
			reference = previousNode(reference);

			// "If reference is a block node or a br, return true."
			if (isBlockNode(reference) || isNamedHtmlElement(reference, 'br')) {
				return true;
			}

			// "If reference is a Text node that is not a whitespace node, or is an
			// img, break from this loop."
			if ((reference.nodeType == $_.Node.TEXT_NODE && !isWhitespaceNode(reference)) || isNamedHtmlElement(reference, 'img')) {
				break;
			}
		}

		// "Let reference be node."
		reference = node;

		// "While reference is a descendant of ancestor:"
		var stop = nextNodeDescendants(ancestor);
		while (reference != stop) {
			// "Let reference be the node after it in tree order, or null if there
			// is no such node."
			reference = nextNode(reference);

			// "If reference is a block node or a br, return true."
			if (isBlockNode(reference) || isNamedHtmlElement(reference, 'br')) {
				return true;
			}

			// "If reference is a Text node that is not a whitespace node, or is an
			// img, break from this loop."
			if ((reference && reference.nodeType == $_.Node.TEXT_NODE && !isWhitespaceNode(reference)) || isNamedHtmlElement(reference, 'img')) {
				break;
			}
		}

		// "Return false."
		return false;
	}

	// "Something is visible if it is a node that either is a block node, or a Text
	// node that is not a collapsed whitespace node, or an img, or a br that is not
	// an extraneous line break, or any node with a visible descendant; excluding
	// any node with an ancestor container Element whose "display" property has
	// resolved value "none"."
	function isVisible(node) {
		var i;

		if (!node) {
			return false;
		}

		if ($_(getAncestors(node).concat(node))
			    .filter(function (node) { return node.nodeType == $_.Node.ELEMENT_NODE; }, true)
			    .some(function (node) { return $_.getComputedStyle(node).display == "none"; })) {
			return false;
		}

		if (isBlockNode(node) || (node.nodeType == $_.Node.TEXT_NODE && !isCollapsedWhitespaceNode(node)) || isNamedHtmlElement(node, 'img') || (isNamedHtmlElement(node, 'br') && !isExtraneousLineBreak(node))) {
			return true;
		}

		for (i = 0; i < node.childNodes.length; i++) {
			if (isVisible(node.childNodes[i])) {
				return true;
			}
		}

		return false;
	}

	// "Something is invisible if it is a node that is not visible."
	function isInvisible(node) {
		return node && !isVisible(node);
	}

	// "A collapsed block prop is either a collapsed line break that is not an
	// extraneous line break, or an Element that is an inline node and whose
	// children are all either invisible or collapsed block props and that has at
	// least one child that is a collapsed block prop."
	function isCollapsedBlockProp(node) {
		var i;

		if (isCollapsedLineBreak(node) && !isExtraneousLineBreak(node)) {
			return true;
		}

		if (!isInlineNode(node) || node.nodeType != $_.Node.ELEMENT_NODE) {
			return false;
		}

		var hasCollapsedBlockPropChild = false;
		for (i = 0; i < node.childNodes.length; i++) {
			if (!isInvisible(node.childNodes[i]) && !isCollapsedBlockProp(node.childNodes[i])) {
				return false;
			}
			if (isCollapsedBlockProp(node.childNodes[i])) {
				hasCollapsedBlockPropChild = true;
			}
		}

		return hasCollapsedBlockPropChild;
	}

	/**
	 * Checks whether the given node is a visible text node.
	 *
	 * @param {HTMLElement} node
	 * @return {Boolean} True if `node` is a visible text node.
	 */
	function isInvisibleTextNode(node) {
		if (node && node.nodeType !== $_.Node.TEXT_NODE) {
			return false;
		}
		var offset = 0;
		var data = node.data;
		var len = data.length;
		while (offset < len && data.charAt(offset) === '\u200b') {
			offset++;
		}
		return offset === len;
	}

	/**
	 * Complement of isInvisibleTextNode().
	 *
	 * @param {HTMLElement} node
	 * @return {Boolean} True if `node` is anything but an invisible text node.
	 */
	function isNotInvisibleTextNode(node) {
		return !isInvisibleTextNode(node);
	}

	/**
	 * Checks whether the given node is a otherwise empty block-level element
	 * containing a propping <br> element.
	 *
	 * @param {HTMLElement} node
	 * @return {Boolean} True if `node` is a propped up block-level element.
	 */
	function isProppedBlock(node) {
		if (!Html.isBlock(node)) {
			return false;
		}
		var child = Html.findNodeRight(node.lastChild, isVisible);
		return (
			child
			&& 'br' === child.nodeName.toLowerCase()
			&& !Html.findNodeRight(child.previousSibling, isVisible)
		);
	}

	/**
	 * Checks whether the given node is a empty element, or an element that
	 * would otherwise be empty except for a propping <br>, or an element
	 * containing only invisible text nodes.
	 *
	 * @param {HTMLElement} node
	 * @return {Boolean} True if `node` can be considered empty.
	 */
	function isEmptyNode(node) {
		return (
			!node.hasChildNodes()
			|| isProppedBlock(node)
			|| !Html.findNodeRight(node.lastChild, isNotInvisibleTextNode)
		);
	}

	/**
	 * Check if the given node is a empty element which is the only
	 * immediate child of a editing host.
	 *
	 * @param {HTMLElement} node
	 * @return {Boolean} True if `node` can be regarded as empty and the
	 *                   only immediate child of its parent editing host.
	 */
	function isEmptyOnlyChildOfEditingHost(node) {
		return (
			node
				&& isEmptyNode(node)
					&& isEditingHost(node.parentNode)
						&& !node.previousSibling
							&& !node.nextSibling
		);
	}

	/**
	 * Remove the given node and return the position from where it was
	 * removed.
	 *
	 * @param {HTMLElement} node Element to remove from DOM
	 * @return {object} Object containing node and offset index.
	 */
	function removeNode(node) {
		var ancestor = node.parentNode;
		var offset = getNodeIndex(node);
		ancestor.removeChild(node);
		return {
			node: ancestor,
			offset: offset
		};
	}

	// Please note: This method is deprecated and will be removed.
	// Every command should use the value and range parameter.
	//
	// "The active range is the first range in the Selection given by calling
	// getSelection() on the context object, or null if there is no such range."
	//
	// We cheat and return globalRange if that's defined.  We also ensure that the
	// active range meets the requirements that selection boundary points are
	// supposed to meet, i.e., that the nodes are both Text or Element nodes that
	// descend from a Document.
	function getActiveRange() {
		var ret;
		if (globalRange) {
			ret = globalRange;
		} else if (Aloha.getSelection().rangeCount) {
			ret = Aloha.getSelection().getRangeAt(0);
		} else {
			return null;
		}
		if (jQuery.inArray(ret.startContainer.nodeType, [$_.Node.TEXT_NODE, $_.Node.ELEMENT_NODE]) == -1 || jQuery.inArray(ret.endContainer.nodeType, [$_.Node.TEXT_NODE, $_.Node.ELEMENT_NODE]) == -1 || !ret.startContainer.ownerDocument || !ret.endContainer.ownerDocument || !isDescendant(ret.startContainer, ret.startContainer.ownerDocument) || !isDescendant(ret.endContainer, ret.endContainer.ownerDocument)) {
			throw "Invalid active range; test bug?";
		}
		return ret;
	}

	// "For some commands, each HTMLDocument must have a boolean state override
	// and/or a string value override. These do not change the command's state or
	// value, but change the way some algorithms behave, as specified in those
	// algorithms' definitions. Initially, both must be unset for every command.
	// Whenever the number of ranges in the Selection changes to something
	// different, and whenever a boundary point of the range at a given index in
	// the Selection changes to something different, the state override and value
	// override must be unset for every command."
	//
	// We implement this crudely by using setters and getters.  To verify that the
	// selection hasn't changed, we copy the active range and just check the
	// endpoints match.  This isn't really correct, but it's good enough for us.
	// Unset state/value overrides are undefined.  We put everything in a function
	// so no one can access anything except via the provided functions, since
	// otherwise callers might mistakenly use outdated overrides (if the selection
	// has changed).
	(function () {
		var stateOverrides = {};
		var valueOverrides = {};
		var storedRange = null;

		resetOverrides = function (range) {
			if (!storedRange
				    || storedRange.startContainer != range.startContainer
				    || storedRange.endContainer != range.endContainer
				    || storedRange.startOffset != range.startOffset
				    || storedRange.endOffset != range.endOffset) {
				storedRange = {
					startContainer: range.startContainer,
					endContainer: range.endContainer,
					startOffset: range.startOffset,
					endOffset: range.endOffset
				};
				if (!Maps.isEmpty(stateOverrides) || !Maps.isEmpty(valueOverrides)) {
					stateOverrides = {};
					valueOverrides = {};
					return true;
				}
			}
			return false;
		};

		getStateOverride = function (command, range) {
			resetOverrides(range);
			return stateOverrides[command];
		};

		setStateOverride = function (command, newState, range) {
			resetOverrides(range);
			stateOverrides[command] = newState;
		};

		unsetStateOverride = function (command, range) {
			resetOverrides(range);
			delete stateOverrides[command];
		};

		getValueOverride = function (command, range) {
			resetOverrides(range);
			return valueOverrides[command];
		};

		// "The value override for the backColor command must be the same as the
		// value override for the hiliteColor command, such that setting one sets
		// the other to the same thing and unsetting one unsets the other."
		setValueOverride = function (command, newValue, range) {
			resetOverrides(range);
			valueOverrides[command] = newValue;
			if (command == "backcolor") {
				valueOverrides.hilitecolor = newValue;
			} else if (command == "hilitecolor") {
				valueOverrides.backcolor = newValue;
			}
		};

		unsetValueOverride = function (command, range) {
			resetOverrides(range);
			delete valueOverrides[command];
			if (command == "backcolor") {
				delete valueOverrides.hilitecolor;
			} else if (command == "hilitecolor") {
				delete valueOverrides.backcolor;
			}
		};
	}());

	//@}

	/////////////////////////////
	///// Common algorithms /////
	/////////////////////////////

	///// Assorted common algorithms /////
	//@{

	function movePreservingRanges(node, newParent, newIndex, range) {
		// For convenience, I allow newIndex to be -1 to mean "insert at the end".
		if (newIndex == -1) {
			newIndex = newParent.childNodes.length;
		}

		// "When the user agent is to move a Node to a new location, preserving
		// ranges, it must remove the Node from its original parent (if any), then
		// insert it in the new location. In doing so, however, it must ignore the
		// regular range mutation rules, and instead follow these rules:"

		// "Let node be the moved Node, old parent and old index be the old parent
		// (which may be null) and index, and new parent and new index be the new
		// parent and index."
		var oldParent = node.parentNode;
		var oldIndex = getNodeIndex(node);
		var i;

		// We only even attempt to preserve the global range object and the ranges
		// in the selection, not every range out there (the latter is probably
		// impossible).
		var ranges = [range];
		for (i = 0; i < Aloha.getSelection().rangeCount; i++) {
			ranges.push(Aloha.getSelection().getRangeAt(i));
		}
		var boundaryPoints = [];
		$_(ranges).forEach(function (range) {
			boundaryPoints.push([range.startContainer, range.startOffset]);
			boundaryPoints.push([range.endContainer, range.endOffset]);
		});

		$_(boundaryPoints).forEach(function (boundaryPoint) {
			// "If a boundary point's node is the same as or a descendant of node,
			// leave it unchanged, so it moves to the new location."
			//
			// No modifications necessary.

			// "If a boundary point's node is new parent and its offset is greater
			// than new index, add one to its offset."
			if (boundaryPoint[0] == newParent && boundaryPoint[1] > newIndex) {
				boundaryPoint[1]++;
			}

			// "If a boundary point's node is old parent and its offset is old index or
			// old index + 1, set its node to new parent and add new index − old index
			// to its offset."
			if (boundaryPoint[0] == oldParent && (boundaryPoint[1] == oldIndex || boundaryPoint[1] == oldIndex + 1)) {
				boundaryPoint[0] = newParent;
				boundaryPoint[1] += newIndex - oldIndex;
			}

			// "If a boundary point's node is old parent and its offset is greater than
			// old index + 1, subtract one from its offset."
			if (boundaryPoint[0] == oldParent && boundaryPoint[1] > oldIndex + 1) {
				boundaryPoint[1]--;
			}
		});

		// Now actually move it and preserve the ranges.
		if (newParent.childNodes.length == newIndex) {
			newParent.appendChild(node);
		} else {
			newParent.insertBefore(node, newParent.childNodes[newIndex]);
		}

		// if we're off actual node boundaries this implies that the move was
		// part of a deletion process (backspace). If that's the case we
		// attempt to fix this by restoring the range to the first index of
		// the node that has been moved
		var newRange = null;
		if (boundaryPoints[0][1] > boundaryPoints[0][0].childNodes.length && boundaryPoints[1][1] > boundaryPoints[1][0].childNodes.length) {
			range.setStart(node, 0);
			range.setEnd(node, 0);
		} else {
			range.setStart(boundaryPoints[0][0], boundaryPoints[0][1]);
			range.setEnd(boundaryPoints[1][0], boundaryPoints[1][1]);

			Aloha.getSelection().removeAllRanges();
			for (i = 1; i < ranges.length; i++) {
				newRange = Aloha.createRange();
				newRange.setStart(boundaryPoints[2 * i][0], boundaryPoints[2 * i][1]);
				newRange.setEnd(boundaryPoints[2 * i + 1][0], boundaryPoints[2 * i + 1][1]);
				Aloha.getSelection().addRange(newRange);
			}
			if (newRange) {
				range = newRange;
			}
		}
	}

	/**
	 * Copy all non empty attributes from an existing to a new element
	 *
	 * @param {dom} element The source DOM element
	 * @param {dom} newElement The new DOM element which will get the attributes of the source DOM element
	 * @return void
	 */
	function copyAttributes(element, newElement) {

		// This is an IE7 workaround. We identified three places that were connected
		// to the mysterious ie7 crash:
		// 1. Add attribute to dom element (Initialization of jquery-ui sortable)
		// 2. Access the jquery expando attribute. Just reading the name is
		//    sufficient to make the browser vulnerable for the crash (Press enter)
		// 3. On editable blur the Aloha.editables[0].getContents(); gets invoked.
		//    This invokation somehow crashes the ie7. We assume that the access of
		//    shared expando attribute updates internal references which are not
		//    correclty handled during clone();
		if (jQuery.browser.msie && jQuery.browser.version >= 7 && typeof element.attributes[jQuery.expando] !== 'undefined') {
			jQuery(element).removeAttr(jQuery.expando);
		}

		var attrs = element.attributes;
		var i;
		for (i = 0; i < attrs.length; i++) {
			var attr = attrs[i];
			// attr.specified is an IE specific check to exclude attributes that were never really set.
			if (typeof attr.specified === "undefined" || attr.specified) {
				if (typeof newElement.setAttributeNS === 'function') {
					newElement.setAttributeNS(attr.namespaceURI, attr.name, attr.value);
				} else {
					// fixes https://github.com/alohaeditor/Aloha-Editor/issues/515
					newElement.setAttribute(attr.name, attr.value);
				}
			}
		}
	}

	function setTagName(element, newName, range) {
		// "If element is an HTML element with local name equal to new name, return
		// element."
		if (isNamedHtmlElement(element, newName)) {
			return element;
		}

		// "If element's parent is null, return element."
		if (!element.parentNode) {
			return element;
		}

		// "Let replacement element be the result of calling createElement(new
		// name) on the ownerDocument of element."
		var replacementElement = element.ownerDocument.createElement(newName);

		// "Insert replacement element into element's parent immediately before
		// element."
		element.parentNode.insertBefore(replacementElement, element);

		// "Copy all attributes of element to replacement element, in order."
		copyAttributes(element, replacementElement);

		// "While element has children, append the first child of element as the
		// last child of replacement element, preserving ranges."
		while (element.childNodes.length) {
			movePreservingRanges(element.firstChild, replacementElement, replacementElement.childNodes.length, range);
		}

		// "Remove element from its parent."
		element.parentNode.removeChild(element);

		// if the range still uses the old element, we modify it to the new one
		if (range.startContainer === element) {
			range.startContainer = replacementElement;
		}
		if (range.endContainer === element) {
			range.endContainer = replacementElement;
		}

		// "Return replacement element."
		return replacementElement;
	}

	function removeExtraneousLineBreaksBefore(node) {
		// "Let ref be the previousSibling of node."
		var ref = node.previousSibling;

		// "If ref is null, abort these steps."
		if (!ref) {
			return;
		}

		// "While ref has children, set ref to its lastChild."
		while (ref.hasChildNodes()) {
			ref = ref.lastChild;
		}

		// "While ref is invisible but not an extraneous line break, and ref does
		// not equal node's parent, set ref to the node before it in tree order."
		while (isInvisible(ref) && !isExtraneousLineBreak(ref) && ref != node.parentNode) {
			ref = previousNode(ref);
		}

		// "If ref is an editable extraneous line break, remove it from its
		// parent."
		if (isEditable(ref) && isExtraneousLineBreak(ref)) {
			ref.parentNode.removeChild(ref);
		}
	}

	function removeExtraneousLineBreaksAtTheEndOf(node) {
		// "Let ref be node."
		var ref = node;

		// "While ref has children, set ref to its lastChild."
		while (ref.hasChildNodes()) {
			ref = ref.lastChild;
		}

		// "While ref is invisible but not an extraneous line break, and ref does
		// not equal node, set ref to the node before it in tree order."
		while (isInvisible(ref) && !isExtraneousLineBreak(ref) && ref != node) {
			ref = previousNode(ref);
		}

		// "If ref is an editable extraneous line break, remove it from its
		// parent."
		if (isEditable(ref) && isExtraneousLineBreak(ref)) {
			ref.parentNode.removeChild(ref);
		}
	}

	// "To remove extraneous line breaks from a node, first remove extraneous line
	// breaks before it, then remove extraneous line breaks at the end of it."
	function removeExtraneousLineBreaksFrom(node) {
		removeExtraneousLineBreaksBefore(node);
		removeExtraneousLineBreaksAtTheEndOf(node);
	}

	//@}
	///// Wrapping a list of nodes /////
	//@{

	function wrap(nodeList, siblingCriteria, newParentInstructions, range) {
		var i;

		// "If not provided, sibling criteria returns false and new parent
		// instructions returns null."
		if (typeof siblingCriteria == "undefined") {
			siblingCriteria = function () {
				return false;
			};
		}
		if (typeof newParentInstructions == "undefined") {
			newParentInstructions = function () {
				return null;
			};
		}

		// "If node list is empty, or the first member of node list is not
		// editable, return null and abort these steps."
		if (!nodeList.length || !isEditable(nodeList[0])) {
			return null;
		}

		// "If node list's last member is an inline node that's not a br, and node
		// list's last member's nextSibling is a br, append that br to node list."
		if (isInlineNode(nodeList[nodeList.length - 1]) && !isNamedHtmlElement(nodeList[nodeList.length - 1], "br") && isNamedHtmlElement(nodeList[nodeList.length - 1].nextSibling, "br")) {
			nodeList.push(nodeList[nodeList.length - 1].nextSibling);
		}

		// "If the previousSibling of the first member of node list is editable and
		// running sibling criteria on it returns true, let new parent be the
		// previousSibling of the first member of node list."
		var newParent;
		if (isEditable(nodeList[0].previousSibling) && siblingCriteria(nodeList[0].previousSibling)) {
			newParent = nodeList[0].previousSibling;

			// "Otherwise, if the nextSibling of the last member of node list is
			// editable and running sibling criteria on it returns true, let new parent
			// be the nextSibling of the last member of node list."
		} else if (isEditable(nodeList[nodeList.length - 1].nextSibling) && siblingCriteria(nodeList[nodeList.length - 1].nextSibling)) {
			newParent = nodeList[nodeList.length - 1].nextSibling;

			// "Otherwise, run new parent instructions, and let new parent be the
			// result."
		} else {
			newParent = newParentInstructions();
		}

		// "If new parent is null, abort these steps and return null."
		if (!newParent) {
			return null;
		}

		// "If new parent's parent is null:"
		if (!newParent.parentNode) {
			// "Insert new parent into the parent of the first member of node list
			// immediately before the first member of node list."
			nodeList[0].parentNode.insertBefore(newParent, nodeList[0]);

			// "If any range has a boundary point with node equal to the parent of
			// new parent and offset equal to the index of new parent, add one to
			// that boundary point's offset."
			//
			// Try to fix range
			var startContainer = range.startContainer,
				startOffset = range.startOffset,
				endContainer = range.endContainer,
				endOffset = range.endOffset;
			if (startContainer == newParent.parentNode && startOffset >= getNodeIndex(newParent)) {
				range.setStart(startContainer, startOffset + 1);
			}
			if (endContainer == newParent.parentNode && endOffset >= getNodeIndex(newParent)) {
				range.setEnd(endContainer, endOffset + 1);
			}

			// Only try to fix the global range. TODO remove globalRange here
			if (globalRange && globalRange !== range) {
				startContainer = globalRange.startContainer;
				startOffset = globalRange.startOffset;
				endContainer = globalRange.endContainer;
				endOffset = globalRange.endOffset;
				if (startContainer == newParent.parentNode && startOffset >= getNodeIndex(newParent)) {
					globalRange.setStart(startContainer, startOffset + 1);
				}
				if (endContainer == newParent.parentNode && endOffset >= getNodeIndex(newParent)) {
					globalRange.setEnd(endContainer, endOffset + 1);
				}
			}
		}

		// "Let original parent be the parent of the first member of node list."
		var originalParent = nodeList[0].parentNode;

		// "If new parent is before the first member of node list in tree order:"
		if (isBefore(newParent, nodeList[0])) {
			// "If new parent is not an inline node, but the last child of new
			// parent and the first member of node list are both inline nodes, and
			// the last child of new parent is not a br, call createElement("br")
			// on the ownerDocument of new parent and append the result as the last
			// child of new parent."
			if (!isInlineNode(newParent) && isInlineNode(newParent.lastChild) && isInlineNode(nodeList[0]) && !isNamedHtmlElement(newParent.lastChild, "BR")) {
				newParent.appendChild(newParent.ownerDocument.createElement("br"));
			}

			// "For each node in node list, append node as the last child of new
			// parent, preserving ranges."
			for (i = 0; i < nodeList.length; i++) {
				movePreservingRanges(nodeList[i], newParent, -1, range);
			}

			// "Otherwise:"
		} else {
			// "If new parent is not an inline node, but the first child of new
			// parent and the last member of node list are both inline nodes, and
			// the last member of node list is not a br, call createElement("br")
			// on the ownerDocument of new parent and insert the result as the
			// first child of new parent."
			if (!isInlineNode(newParent) && isInlineNode(newParent.firstChild) && isInlineNode(nodeList[nodeList.length - 1]) && !isNamedHtmlElement(nodeList[nodeList.length - 1], "BR")) {
				newParent.insertBefore(newParent.ownerDocument.createElement("br"), newParent.firstChild);
			}

			// "For each node in node list, in reverse order, insert node as the
			// first child of new parent, preserving ranges."
			for (i = nodeList.length - 1; i >= 0; i--) {
				movePreservingRanges(nodeList[i], newParent, 0, range);
			}
		}

		// "If original parent is editable and has no children, remove it from its
		// parent."
		if (isEditable(originalParent) && !originalParent.hasChildNodes()) {
			originalParent.parentNode.removeChild(originalParent);
		}

		// "If new parent's nextSibling is editable and running sibling criteria on
		// it returns true:"
		if (isEditable(newParent.nextSibling) && siblingCriteria(newParent.nextSibling)) {
			// "If new parent is not an inline node, but new parent's last child
			// and new parent's nextSibling's first child are both inline nodes,
			// and new parent's last child is not a br, call createElement("br") on
			// the ownerDocument of new parent and append the result as the last
			// child of new parent."
			if (!isInlineNode(newParent) && isInlineNode(newParent.lastChild) && isInlineNode(newParent.nextSibling.firstChild) && !isNamedHtmlElement(newParent.lastChild, "BR")) {
				newParent.appendChild(newParent.ownerDocument.createElement("br"));
			}

			// "While new parent's nextSibling has children, append its first child
			// as the last child of new parent, preserving ranges."
			while (newParent.nextSibling.hasChildNodes()) {
				movePreservingRanges(newParent.nextSibling.firstChild, newParent, -1, range);
			}

			// "Remove new parent's nextSibling from its parent."
			newParent.parentNode.removeChild(newParent.nextSibling);
		}

		// "Remove extraneous line breaks from new parent."
		removeExtraneousLineBreaksFrom(newParent);

		// "Return new parent."
		return newParent;
	}


	//@}
	///// Allowed children /////
	//@{

	// "A name of an element with inline contents is "a", "abbr", "b", "bdi",
	// "bdo", "cite", "code", "dfn", "em", "h1", "h2", "h3", "h4", "h5", "h6", "i",
	// "kbd", "mark", "p", "pre", "q", "rp", "rt", "ruby", "s", "samp", "small",
	// "span", "strong", "sub", "sup", "u", "var", "acronym", "listing", "strike",
	// "xmp", "big", "blink", "font", "marquee", "nobr", or "tt"."
	var namesOfElementsWithInlineContentsMap = {
		"A": true,
		"ABBR": true,
		"B": true,
		"BDI": true,
		"BDO": true,
		"CITE": true,
		"CODE": true,
		"DFN": true,
		"EM": true,
		"H1": true,
		"H2": true,
		"H3": true,
		"H4": true,
		"H5": true,
		"H6": true,
		"I": true,
		"KBD": true,
		"MARK": true,
		"P": true,
		"PRE": true,
		"Q": true,
		"RP": true,
		"RT": true,
		"RUBY": true,
		"S": true,
		"SAMP": true,
		"SMALL": true,
		"SPAN": true,
		"STRONG": true,
		"SUB": true,
		"SUP": true,
		"U": true,
		"VAR": true,
		"ACRONYM": true,
		"LISTING": true,
		"STRIKE": true,
		"XMP": true,
		"BIG": true,
		"BLINK": true,
		"FONT": true,
		"MARQUEE": true,
		"NOBR": true,
		"TT": true
	};


	var tableRelatedElements = {
		"colgroup": true,
		"table": true,
		"tbody": true,
		"tfoot": true,
		"thead": true,
		"tr": true
	};

	var scriptRelatedElements = {
		"script": true,
		"style": true,
		"plaintext": true,
		"xmp": true
	};

	var prohibitedHeadingNestingMap = jQuery.extend({
		"H1": true,
		"H2": true,
		"H3": true,
		"H4": true,
		"H5": true,
		"H6": true
	}, prohibitedParagraphChildNamesMap);
	var prohibitedTableNestingMap = {
		"CAPTION": true,
		"COL": true,
		"COLGROUP": true,
		"TBODY": true,
		"TD": true,
		"TFOOT": true,
		"TH": true,
		"THEAD": true,
		"TR": true
	};
	var prohibitedDefNestingMap = {
		"DD": true,
		"DT": true
	};
	var prohibitedNestingCombinationsMap = {
		"A": jQuery.extend({
			"A": true
		}, prohibitedParagraphChildNamesMap),
		"DD": prohibitedDefNestingMap,
		"DT": prohibitedDefNestingMap,
		"LI": {
			"LI": true
		},
		"NOBR": jQuery.extend({
			"NOBR": true
		}, prohibitedParagraphChildNamesMap),
		"H1": prohibitedHeadingNestingMap,
		"H2": prohibitedHeadingNestingMap,
		"H3": prohibitedHeadingNestingMap,
		"H4": prohibitedHeadingNestingMap,
		"H5": prohibitedHeadingNestingMap,
		"H6": prohibitedHeadingNestingMap,
		"TD": prohibitedTableNestingMap,
		"TH": prohibitedTableNestingMap,
		// this is the same as namesOfElementsWithInlineContentsMap excluding a and h1-h6 elements above
		"ABBR": prohibitedParagraphChildNamesMap,
		"B": prohibitedParagraphChildNamesMap,
		"BDI": prohibitedParagraphChildNamesMap,
		"BDO": prohibitedParagraphChildNamesMap,
		"CITE": prohibitedParagraphChildNamesMap,
		"CODE": prohibitedParagraphChildNamesMap,
		"DFN": prohibitedParagraphChildNamesMap,
		"EM": prohibitedParagraphChildNamesMap,
		"I": prohibitedParagraphChildNamesMap,
		"KBD": prohibitedParagraphChildNamesMap,
		"MARK": prohibitedParagraphChildNamesMap,
		"P": prohibitedParagraphChildNamesMap,
		"PRE": prohibitedParagraphChildNamesMap,
		"Q": prohibitedParagraphChildNamesMap,
		"RP": prohibitedParagraphChildNamesMap,
		"RT": prohibitedParagraphChildNamesMap,
		"RUBY": prohibitedParagraphChildNamesMap,
		"S": prohibitedParagraphChildNamesMap,
		"SAMP": prohibitedParagraphChildNamesMap,
		"SMALL": prohibitedParagraphChildNamesMap,
		"SPAN": prohibitedParagraphChildNamesMap,
		"STRONG": prohibitedParagraphChildNamesMap,
		"SUB": prohibitedParagraphChildNamesMap,
		"SUP": prohibitedParagraphChildNamesMap,
		"U": prohibitedParagraphChildNamesMap,
		"VAR": prohibitedParagraphChildNamesMap,
		"ACRONYM": prohibitedParagraphChildNamesMap,
		"LISTING": prohibitedParagraphChildNamesMap,
		"STRIKE": prohibitedParagraphChildNamesMap,
		"XMP": prohibitedParagraphChildNamesMap,
		"BIG": prohibitedParagraphChildNamesMap,
		"BLINK": prohibitedParagraphChildNamesMap,
		"FONT": prohibitedParagraphChildNamesMap,
		"MARQUEE": prohibitedParagraphChildNamesMap,
		"TT": prohibitedParagraphChildNamesMap
	};

	// "An element with inline contents is an HTML element whose local name is a
	// name of an element with inline contents."
	function isElementWithInlineContents(node) {
		return isMappedHtmlElement(node, namesOfElementsWithInlineContentsMap);
	}

	function isAllowedChild(child, parent_) {
		// "If parent is "colgroup", "table", "tbody", "tfoot", "thead", "tr", or
		// an HTML element with local name equal to one of those, and child is a
		// Text node whose data does not consist solely of space characters, return
		// false."
		if ((tableRelatedElements[parent_] || isHtmlElementInArray(parent_, ["colgroup", "table", "tbody", "tfoot", "thead", "tr"])) && typeof child == "object" && child.nodeType == $_.Node.TEXT_NODE && !/^[ \t\n\f\r]*$/.test(child.data)) {
			return false;
		}

		// "If parent is "script", "style", "plaintext", or "xmp", or an HTML
		// element with local name equal to one of those, and child is not a Text
		// node, return false."
		if ((scriptRelatedElements[parent_] || isHtmlElementInArray(parent_, ["script", "style", "plaintext", "xmp"])) && (typeof child != "object" || child.nodeType != $_.Node.TEXT_NODE)) {
			return false;
		}

		// "If child is a Document, DocumentFragment, or DocumentType, return
		// false."
		if (typeof child == "object" && (child.nodeType == $_.Node.DOCUMENT_NODE || child.nodeType == $_.Node.DOCUMENT_FRAGMENT_NODE || child.nodeType == $_.Node.DOCUMENT_TYPE_NODE)) {
			return false;
		}

		// "If child is an HTML element, set child to the local name of child."
		if (isAnyHtmlElement(child)) {
			child = child.tagName.toLowerCase();
		}

		// "If child is not a string, return true."
		if (typeof child != "string") {
			return true;
		}

		// "If parent is an HTML element:"
		if (isAnyHtmlElement(parent_)) {
			// "If child is "a", and parent or some ancestor of parent is an a,
			// return false."
			//
			// "If child is a prohibited paragraph child name and parent or some
			// ancestor of parent is an element with inline contents, return
			// false."
			//
			// "If child is "h1", "h2", "h3", "h4", "h5", or "h6", and parent or
			// some ancestor of parent is an HTML element with local name "h1",
			// "h2", "h3", "h4", "h5", or "h6", return false."
			var ancestor = parent_;
			while (ancestor) {
				if (child == "a" && isNamedHtmlElement(ancestor, 'a')) {
					return false;
				}
				if (prohibitedParagraphChildNamesMap[child.toUpperCase()] && isElementWithInlineContents(ancestor)) {
					return false;
				}
				if (/^h[1-6]$/.test(child) && isAnyHtmlElement(ancestor) && /^H[1-6]$/.test(ancestor.tagName)) {
					return false;
				}
				ancestor = ancestor.parentNode;
			}

			// "Let parent be the local name of parent."
			parent_ = parent_.tagName.toLowerCase();
		}

		// "If parent is an Element or DocumentFragment, return true."
		if (typeof parent_ == "object" && (parent_.nodeType == $_.Node.ELEMENT_NODE || parent_.nodeType == $_.Node.DOCUMENT_FRAGMENT_NODE)) {
			return true;
		}

		// "If parent is not a string, return false."
		if (typeof parent_ != "string") {
			return false;
		}

		// "If parent is on the left-hand side of an entry on the following list,
		// then return true if child is listed on the right-hand side of that
		// entry, and false otherwise."
		switch (parent_) {
		case "colgroup":
			return child == "col";
		case "table":
			return jQuery.inArray(child, ["caption", "col", "colgroup", "tbody", "td", "tfoot", "th", "thead", "tr"]) != -1;
		case "tbody":
		case "thead":
		case "tfoot":
			return jQuery.inArray(child, ["td", "th", "tr"]) != -1;
		case "tr":
			return jQuery.inArray(child, ["td", "th"]) != -1;
		case "dl":
			return jQuery.inArray(child, ["dt", "dd"]) != -1;
		case "dir":
		case "ol":
		case "ul":
			return jQuery.inArray(child, ["dir", "li", "ol", "ul"]) != -1;
		case "hgroup":
			return (/^h[1-6]$/).test(child);
		}

		// "If child is "body", "caption", "col", "colgroup", "frame", "frameset",
		// "head", "html", "tbody", "td", "tfoot", "th", "thead", or "tr", return
		// false."
		if (jQuery.inArray(child, ["body", "caption", "col", "colgroup", "frame", "frameset", "head", "html", "tbody", "td", "tfoot", "th", "thead", "tr"]) != -1) {
			return false;
		}

		// "If child is "dd" or "dt" and parent is not "dl", return false."
		if (jQuery.inArray(child, ["dd", "dt"]) != -1 && parent_ != "dl") {
			return false;
		}

		// "If child is "li" and parent is not "ol" or "ul", return false."
		if (child == "li" && parent_ != "ol" && parent_ != "ul") {
			return false;
		}

		// "If parent is on the left-hand side of an entry on the following list
		// and child is listed on the right-hand side of that entry, return false."
		var leftSide = prohibitedNestingCombinationsMap[parent_.toUpperCase()];
		if (leftSide) {
			var rightSide = leftSide[child.toUpperCase()];
			if (rightSide) {
				return false;
			}
		}

		// "Return true."
		return true;
	}


	//@}

	//////////////////////////////////////
	///// Inline formatting commands /////
	//////////////////////////////////////

	///// Inline formatting command definitions /////
	//@{

	// "A node node is effectively contained in a range range if range is not
	// collapsed, and at least one of the following holds:"
	function isEffectivelyContained(node, range) {
		if (range.collapsed) {
			return false;
		}

		// "node is contained in range."
		if (isContained(node, range)) {
			return true;
		}

		// "node is range's start node, it is a Text node, and its length is
		// different from range's start offset."
		if (node == range.startContainer && node.nodeType == $_.Node.TEXT_NODE && getNodeLength(node) != range.startOffset) {
			return true;
		}

		// "node is range's end node, it is a Text node, and range's end offset is
		// not 0."
		if (node == range.endContainer && node.nodeType == $_.Node.TEXT_NODE && range.endOffset != 0) {
			return true;
		}

		// "node has at least one child; and all its children are effectively
		// contained in range; and either range's start node is not a descendant of
		// node or is not a Text node or range's start offset is zero; and either
		// range's end node is not a descendant of node or is not a Text node or
		// range's end offset is its end node's length."
		if (node.hasChildNodes() && $_(node.childNodes).every(function (child) { return isEffectivelyContained(child, range); })
			    && (!isDescendant(range.startContainer, node)
					|| range.startContainer.nodeType != $_.Node.TEXT_NODE
					|| range.startOffset == 0)
			    && (!isDescendant(range.endContainer, node)
					|| range.endContainer.nodeType != $_.Node.TEXT_NODE
					|| range.endOffset == getNodeLength(range.endContainer))) {
			return true;
		}

		return false;
	}

	// Like get(All)ContainedNodes(), but for effectively contained nodes.
	function getEffectivelyContainedNodes(range, condition) {
		if (typeof condition == "undefined") {
			condition = function () {
				return true;
			};
		}
		var node = range.startContainer;
		while (isEffectivelyContained(node.parentNode, range)) {
			node = node.parentNode;
		}

		var stop = nextNodeDescendants(range.endContainer);

		var nodeList = [];
		while (isBefore(node, stop)) {
			if (isEffectivelyContained(node, range) && condition(node)) {
				nodeList.push(node);
				node = nextNodeDescendants(node);
				continue;
			}
			node = nextNode(node);
		}
		return nodeList;
	}

	function getAllEffectivelyContainedNodes(range, condition) {
		if (typeof condition == "undefined") {
			condition = function () {
				return true;
			};
		}
		var node = range.startContainer;
		while (isEffectivelyContained(node.parentNode, range)) {
			node = node.parentNode;
		}

		var stop = nextNodeDescendants(range.endContainer);

		var nodeList = [];
		while (isBefore(node, stop)) {
			if (isEffectivelyContained(node, range) && condition(node)) {
				nodeList.push(node);
			}
			node = nextNode(node);
		}
		return nodeList;
	}

	// "A modifiable element is a b, em, i, s, span, strong, sub, sup, or u element
	// with no attributes except possibly style; or a font element with no
	// attributes except possibly style, color, face, and/or size; or an a element
	// with no attributes except possibly style and/or href."
	function isModifiableElement(node) {
		if (!isAnyHtmlElement(node)) {
			return false;
		}

		if (jQuery.inArray(node.tagName, ["B", "EM", "I", "S", "SPAN", "STRIKE", "STRONG", "SUB", "SUP", "U"]) != -1) {
			if (node.attributes.length == 0) {
				return true;
			}

			if (node.attributes.length == 1 && hasAttribute(node, "style")) {
				return true;
			}
		}

		if (node.tagName == "FONT" || node.tagName == "A") {
			var numAttrs = node.attributes.length;

			if (hasAttribute(node, "style")) {
				numAttrs--;
			}

			if (node.tagName == "FONT") {
				if (hasAttribute(node, "color")) {
					numAttrs--;
				}

				if (hasAttribute(node, "face")) {
					numAttrs--;
				}

				if (hasAttribute(node, "size")) {
					numAttrs--;
				}
			}

			if (node.tagName == "A" && hasAttribute(node, "href")) {
				numAttrs--;
			}

			if (numAttrs == 0) {
				return true;
			}
		}

		return false;
	}

	function isSimpleModifiableElement(node) {
		// "A simple modifiable element is an HTML element for which at least one
		// of the following holds:"
		if (!isAnyHtmlElement(node)) {
			return false;
		}

		// Only these elements can possibly be a simple modifiable element.
		if (jQuery.inArray(node.tagName, ["A", "B", "EM", "FONT", "I", "S", "SPAN", "STRIKE", "STRONG", "SUB", "SUP", "U"]) == -1) {
			return false;
		}

		// "It is an a, b, em, font, i, s, span, strike, strong, sub, sup, or u
		// element with no attributes."
		if (node.attributes.length == 0) {
			return true;
		}

		// If it's got more than one attribute, everything after this fails.
		if (node.attributes.length > 1) {
			return false;
		}

		// "It is an a, b, em, font, i, s, span, strike, strong, sub, sup, or u
		// element with exactly one attribute, which is style, which sets no CSS
		// properties (including invalid or unrecognized properties)."
		//
		// Not gonna try for invalid or unrecognized.
		if (hasAttribute(node, "style") && getStyleLength(node) == 0) {
			return true;
		}

		// "It is an a element with exactly one attribute, which is href."
		if (node.tagName == "A" && hasAttribute(node, "href")) {
			return true;
		}

		// "It is a font element with exactly one attribute, which is either color,
		// face, or size."
		if (node.tagName == "FONT" && (hasAttribute(node, "color") || hasAttribute(node, "face") || hasAttribute(node, "size"))) {
			return true;
		}

		// "It is a b or strong element with exactly one attribute, which is style,
		// and the style attribute sets exactly one CSS property (including invalid
		// or unrecognized properties), which is "font-weight"."
		if ((node.tagName == "B" || node.tagName == "STRONG") && hasAttribute(node, "style") && getStyleLength(node) == 1 && node.style.fontWeight != "") {
			return true;
		}

		// "It is an i or em element with exactly one attribute, which is style,
		// and the style attribute sets exactly one CSS property (including invalid
		// or unrecognized properties), which is "font-style"."
		if ((node.tagName == "I" || node.tagName == "EM") && hasAttribute(node, "style") && getStyleLength(node) == 1 && node.style.fontStyle != "") {
			return true;
		}

		// "It is an a, font, or span element with exactly one attribute, which is
		// style, and the style attribute sets exactly one CSS property (including
		// invalid or unrecognized properties), and that property is not
		// "text-decoration"."
		if ((node.tagName == "A" || node.tagName == "FONT" || node.tagName == "SPAN") && hasAttribute(node, "style") && getStyleLength(node) == 1 && node.style.textDecoration == "") {
			return true;
		}

		// "It is an a, font, s, span, strike, or u element with exactly one
		// attribute, which is style, and the style attribute sets exactly one CSS
		// property (including invalid or unrecognized properties), which is
		// "text-decoration", which is set to "line-through" or "underline" or
		// "overline" or "none"."
		if (jQuery.inArray(node.tagName, ["A", "FONT", "S", "SPAN", "STRIKE", "U"]) != -1 && hasAttribute(node, "style") && getStyleLength(node) == 1 && (node.style.textDecoration == "line-through" || node.style.textDecoration == "underline" || node.style.textDecoration == "overline" || node.style.textDecoration == "none")) {
			return true;
		}

		return false;
	}

	// "Two quantities are equivalent values for a command if either both are null,
	// or both are strings and they're equal and the command does not define any
	// equivalent values, or both are strings and the command defines equivalent
	// values and they match the definition."
	function areEquivalentValues(command, val1, val2) {
		if (val1 === null && val2 === null) {
			return true;
		}

		if (typeof val1 == "string" && typeof val2 == "string" && val1 == val2 && !(commands[command].hasOwnProperty("equivalentValues"))) {
			return true;
		}

		if (typeof val1 == "string" && typeof val2 == "string" && commands[command].hasOwnProperty("equivalentValues") && commands[command].equivalentValues(val1, val2)) {
			return true;
		}

		return false;
	}

	// "Two quantities are loosely equivalent values for a command if either they
	// are equivalent values for the command, or if the command is the fontSize
	// command; one of the quantities is one of "xx-small", "small", "medium",
	// "large", "x-large", "xx-large", or "xxx-large"; and the other quantity is
	// the resolved value of "font-size" on a font element whose size attribute has
	// the corresponding value set ("1" through "7" respectively)."
	function areLooselyEquivalentValues(command, val1, val2) {
		if (areEquivalentValues(command, val1, val2)) {
			return true;
		}

		if (command != "fontsize" || typeof val1 != "string" || typeof val2 != "string") {
			return false;
		}

		// Static variables in JavaScript?
		var callee = areLooselyEquivalentValues;
		if (callee.sizeMap === undefined) {
			callee.sizeMap = {};
			var font = document.createElement("font");
			document.body.appendChild(font);
			$_(["xx-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"]).forEach(function (keyword) {
				font.size = cssSizeToLegacy(keyword);
				callee.sizeMap[keyword] = $_.getComputedStyle(font).fontSize;
			});
			document.body.removeChild(font);
		}

		return val1 === callee.sizeMap[val2] || val2 === callee.sizeMap[val1];
	}

	//@}
	///// Assorted inline formatting command algorithms /////
	//@{

	function getEffectiveCommandValue(node, command) {
		// "If neither node nor its parent is an Element, return null."
		if (node.nodeType != $_.Node.ELEMENT_NODE && (!node.parentNode || node.parentNode.nodeType != $_.Node.ELEMENT_NODE)) {
			return null;
		}

		// "If node is not an Element, return the effective command value of its
		// parent for command."
		if (node.nodeType != $_.Node.ELEMENT_NODE) {
			return getEffectiveCommandValue(node.parentNode, command);
		}

		// "If command is "createLink" or "unlink":"
		if (command == "createlink" || command == "unlink") {
			// "While node is not null, and is not an a element that has an href
			// attribute, set node to its parent."
			while (node && (!isAnyHtmlElement(node) || node.tagName != "A" || !hasAttribute(node, "href"))) {
				node = node.parentNode;
			}

			// "If node is null, return null."
			if (!node) {
				return null;
			}

			// "Return the value of node's href attribute."
			return node.getAttribute("href");
		}

		// "If command is "backColor" or "hiliteColor":"
		if (command == "backcolor" || command == "hilitecolor") {
			// "While the resolved value of "background-color" on node is any
			// fully transparent value, and node's parent is an Element, set
			// node to its parent."
			//
			// Another lame hack to avoid flawed APIs.
			while (($_.getComputedStyle(node).backgroundColor == "rgba(0, 0, 0, 0)" || $_.getComputedStyle(node).backgroundColor === "" || $_.getComputedStyle(node).backgroundColor == "transparent") && node.parentNode && node.parentNode.nodeType == $_.Node.ELEMENT_NODE) {
				node = node.parentNode;
			}

			// "If the resolved value of "background-color" on node is a fully
			// transparent value, return "rgb(255, 255, 255)"."
			if ($_.getComputedStyle(node).backgroundColor == "rgba(0, 0, 0, 0)" || $_.getComputedStyle(node).backgroundColor === "" || $_.getComputedStyle(node).backgroundColor == "transparent") {
				return "rgb(255, 255, 255)";
			}

			// "Otherwise, return the resolved value of "background-color" for
			// node."
			return $_.getComputedStyle(node).backgroundColor;
		}

		// "If command is "subscript" or "superscript":"
		if (command == "subscript" || command == "superscript") {
			// "Let affected by subscript and affected by superscript be two
			// boolean variables, both initially false."
			var affectedBySubscript = false;
			var affectedBySuperscript = false;

			// "While node is an inline node:"
			while (isInlineNode(node)) {
				var verticalAlign = $_.getComputedStyle(node).verticalAlign;

				// "If node is a sub, set affected by subscript to true."
				if (isNamedHtmlElement(node, 'sub')) {
					affectedBySubscript = true;
					// "Otherwise, if node is a sup, set affected by superscript to
					// true."
				} else if (isNamedHtmlElement(node, 'sup')) {
					affectedBySuperscript = true;
				}

				// "Set node to its parent."
				node = node.parentNode;
			}

			// "If affected by subscript and affected by superscript are both true,
			// return the string "mixed"."
			if (affectedBySubscript && affectedBySuperscript) {
				return "mixed";
			}

			// "If affected by subscript is true, return "subscript"."
			if (affectedBySubscript) {
				return "subscript";
			}

			// "If affected by superscript is true, return "superscript"."
			if (affectedBySuperscript) {
				return "superscript";
			}

			// "Return null."
			return null;
		}

		// "If command is "strikethrough", and the "text-decoration" property of
		// node or any of its ancestors has resolved value containing
		// "line-through", return "line-through". Otherwise, return null."
		if (command == "strikethrough") {
			do {
				if ($_.getComputedStyle(node).textDecoration.indexOf("line-through") != -1) {
					return "line-through";
				}
				node = node.parentNode;
			} while (node && node.nodeType == $_.Node.ELEMENT_NODE);
			return null;
		}

		// "If command is "underline", and the "text-decoration" property of node
		// or any of its ancestors has resolved value containing "underline",
		// return "underline". Otherwise, return null."
		if (command == "underline") {
			do {
				if ($_.getComputedStyle(node).textDecoration.indexOf("underline") != -1) {
					return "underline";
				}
				node = node.parentNode;
			} while (node && node.nodeType == $_.Node.ELEMENT_NODE);
			return null;
		}

		if (!commands[command].hasOwnProperty("relevantCssProperty")) {
			throw "Bug: no relevantCssProperty for " + command + " in getEffectiveCommandValue";
		}

		// "Return the resolved value for node of the relevant CSS property for
		// command."
		return $_.getComputedStyle(node)[commands[command].relevantCssProperty].toString();
	}

	function getSpecifiedCommandValue(element, command) {
		// "If command is "backColor" or "hiliteColor" and element's display
		// property does not have resolved value "inline", return null."
		if ((command == "backcolor" || command == "hilitecolor") && $_.getComputedStyle(element).display != "inline") {
			return null;
		}

		// "If command is "createLink" or "unlink":"
		if (command == "createlink" || command == "unlink") {
			// "If element is an a element and has an href attribute, return the
			// value of that attribute."
			if (isAnyHtmlElement(element) && element.tagName == "A" && hasAttribute(element, "href")) {
				return element.getAttribute("href");
			}

			// "Return null."
			return null;
		}

		// "If command is "subscript" or "superscript":"
		if (command == "subscript" || command == "superscript") {
			// "If element is a sup, return "superscript"."
			if (isNamedHtmlElement(element, 'sup')) {
				return "superscript";
			}

			// "If element is a sub, return "subscript"."
			if (isNamedHtmlElement(element, 'sub')) {
				return "subscript";
			}

			// "Return null."
			return null;
		}

		// "If command is "strikethrough", and element has a style attribute set,
		// and that attribute sets "text-decoration":"
		if (command == "strikethrough" && element.style.textDecoration != "") {
			// "If element's style attribute sets "text-decoration" to a value
			// containing "line-through", return "line-through"."
			if (element.style.textDecoration.indexOf("line-through") != -1) {
				return "line-through";
			}

			// "Return null."
			return null;
		}

		// "If command is "strikethrough" and element is a s or strike element,
		// return "line-through"."
		if (command == "strikethrough" && isHtmlElementInArray(element, ["S", "STRIKE"])) {
			return "line-through";
		}

		// "If command is "underline", and element has a style attribute set, and
		// that attribute sets "text-decoration":"
		if (command == "underline" && element.style.textDecoration != "") {
			// "If element's style attribute sets "text-decoration" to a value
			// containing "underline", return "underline"."
			if (element.style.textDecoration.indexOf("underline") != -1) {
				return "underline";
			}

			// "Return null."
			return null;
		}

		// "If command is "underline" and element is a u element, return
		// "underline"."
		if (command == "underline" && isNamedHtmlElement(element, 'U')) {
			return "underline";
		}

		// "Let property be the relevant CSS property for command."
		var property = commands[command].relevantCssProperty;

		// "If property is null, return null."
		if (property === null) {
			return null;
		}

		// "If element has a style attribute set, and that attribute has the
		// effect of setting property, return the value that it sets property to."
		if (element.style[property] != "") {
			return element.style[property];
		}

		// "If element is a font element that has an attribute whose effect is
		// to create a presentational hint for property, return the value that the
		// hint sets property to.  (For a size of 7, this will be the non-CSS value
		// "xxx-large".)"
		if (isHtmlNamespace(element.namespaceURI) && element.tagName == "FONT") {
			if (property == "color" && hasAttribute(element, "color")) {
				return element.color;
			}
			if (property == "fontFamily" && hasAttribute(element, "face")) {
				return element.face;
			}
			if (property == "fontSize" && hasAttribute(element, "size")) {
				// This is not even close to correct in general.
				var size = parseInt(element.size, 10);
				if (size < 1) {
					size = 1;
				}
				if (size > 7) {
					size = 7;
				}
				return {
					1: "xx-small",
					2: "small",
					3: "medium",
					4: "large",
					5: "x-large",
					6: "xx-large",
					7: "xxx-large"
				}[size];
			}
		}

		// "If element is in the following list, and property is equal to the
		// CSS property name listed for it, return the string listed for it."
		//
		// A list follows, whose meaning is copied here.
		if (property == "fontWeight" && (element.tagName == "B" || element.tagName == "STRONG")) {
			return "bold";
		}
		if (property == "fontStyle" && (element.tagName == "I" || element.tagName == "EM")) {
			return "italic";
		}

		// "Return null."
		return null;
	}

	function reorderModifiableDescendants(node, command, newValue, range) {
		// "Let candidate equal node."
		var candidate = node;

		// "While candidate is a modifiable element, and candidate has exactly one
		// child, and that child is also a modifiable element, and candidate is not
		// a simple modifiable element or candidate's specified command value for
		// command is not equivalent to new value, set candidate to its child."
		while (isModifiableElement(candidate) && candidate.childNodes.length == 1 && isModifiableElement(candidate.firstChild) && (!isSimpleModifiableElement(candidate) || !areEquivalentValues(command, getSpecifiedCommandValue(candidate, command), newValue))) {
			candidate = candidate.firstChild;
		}

		// "If candidate is node, or is not a simple modifiable element, or its
		// specified command value is not equivalent to new value, or its effective
		// command value is not loosely equivalent to new value, abort these
		// steps."
		if (candidate == node || !isSimpleModifiableElement(candidate) || !areEquivalentValues(command, getSpecifiedCommandValue(candidate, command), newValue) || !areLooselyEquivalentValues(command, getEffectiveCommandValue(candidate, command), newValue)) {
			return;
		}

		// "While candidate has children, insert the first child of candidate into
		// candidate's parent immediately before candidate, preserving ranges."
		while (candidate.hasChildNodes()) {
			movePreservingRanges(candidate.firstChild, candidate.parentNode, getNodeIndex(candidate), range);
		}

		// "Insert candidate into node's parent immediately after node."
		node.parentNode.insertBefore(candidate, node.nextSibling);

		// "Append the node as the last child of candidate, preserving ranges."
		movePreservingRanges(node, candidate, -1, range);
	}

	var recordValuesCommands = ["subscript", "bold", "fontname", "fontsize", "forecolor", "hilitecolor", "italic", "strikethrough", "underline"];

	function recordValues(nodeList) {
		// "Let values be a list of (node, command, specified command value)
		// triples, initially empty."
		var values = [];

		// "For each node in node list, for each command in the list "subscript",
		// "bold", "fontName", "fontSize", "foreColor", "hiliteColor", "italic",
		// "strikethrough", and "underline" in that order:"

		// Ensure we have a plain array to avoid the potential performance
		// overhead of a NodeList
		var nodes = jQuery.makeArray(nodeList);
		var i, j;
		var node;
		var command;
		var ancestor;
		var specifiedCommandValue;
		for (i = 0; i < nodes.length; i++) {
			node = nodes[i];
			for (j = 0; j < recordValuesCommands.length; j++) {
				command = recordValuesCommands[j];

				// "Let ancestor equal node."
				ancestor = node;

				// "If ancestor is not an Element, set it to its parent."
				if (ancestor.nodeType != 1) {
					ancestor = ancestor.parentNode;
				}

				// "While ancestor is an Element and its specified command value
				// for command is null, set it to its parent."
				specifiedCommandValue = null;
				while (ancestor && ancestor.nodeType == 1 && (specifiedCommandValue = getSpecifiedCommandValue(ancestor, command)) === null) {
					ancestor = ancestor.parentNode;
				}

				// "If ancestor is an Element, add (node, command, ancestor's
				// specified command value for command) to values. Otherwise add
				// (node, command, null) to values."
				values.push([node, command, specifiedCommandValue]);
			}
		}

		// "Return values."
		return values;
	}

	//@}
	///// Clearing an element's value /////
	//@{

	function clearValue(element, command, range) {
		// "If element is not editable, return the empty list."
		if (!isEditable(element)) {
			return [];
		}

		// "If element's specified command value for command is null, return the
		// empty list."
		if (getSpecifiedCommandValue(element, command) === null) {
			return [];
		}

		// "If element is a simple modifiable element:"
		if (isSimpleModifiableElement(element)) {
			// "Let children be the children of element."
			var children = Array.prototype.slice.call(toArray(element.childNodes));

			// "For each child in children, insert child into element's parent
			// immediately before element, preserving ranges."
			var i;
			for (i = 0; i < children.length; i++) {
				movePreservingRanges(children[i], element.parentNode, getNodeIndex(element), range);
			}

			// "Remove element from its parent."
			element.parentNode.removeChild(element);

			// "Return children."
			return children;
		}

		// "If command is "strikethrough", and element has a style attribute that
		// sets "text-decoration" to some value containing "line-through", delete
		// "line-through" from the value."
		if (command == "strikethrough" && element.style.textDecoration.indexOf("line-through") != -1) {
			if (element.style.textDecoration == "line-through") {
				element.style.textDecoration = "";
			} else {
				element.style.textDecoration = element.style.textDecoration.replace("line-through", "");
			}
			if (element.getAttribute("style") == "") {
				element.removeAttribute("style");
			}
		}

		// "If command is "underline", and element has a style attribute that sets
		// "text-decoration" to some value containing "underline", delete
		// "underline" from the value."
		if (command == "underline" && element.style.textDecoration.indexOf("underline") != -1) {
			if (element.style.textDecoration == "underline") {
				element.style.textDecoration = "";
			} else {
				element.style.textDecoration = element.style.textDecoration.replace("underline", "");
			}
			if (element.getAttribute("style") == "") {
				element.removeAttribute("style");
			}
		}

		// "If the relevant CSS property for command is not null, unset the CSS
		// property property of element."
		if (commands[command].relevantCssProperty !== null) {
			element.style[commands[command].relevantCssProperty] = '';
			if (element.getAttribute("style") == "") {
				element.removeAttribute("style");
			}
		}

		// "If element is a font element:"
		if (isHtmlNamespace(element.namespaceURI) && element.tagName == "FONT") {
			// "If command is "foreColor", unset element's color attribute, if set."
			if (command == "forecolor") {
				element.removeAttribute("color");
			}

			// "If command is "fontName", unset element's face attribute, if set."
			if (command == "fontname") {
				element.removeAttribute("face");
			}

			// "If command is "fontSize", unset element's size attribute, if set."
			if (command == "fontsize") {
				element.removeAttribute("size");
			}
		}

		// "If element is an a element and command is "createLink" or "unlink",
		// unset the href property of element."
		if (isNamedHtmlElement(element, 'A') && (command == "createlink" || command == "unlink")) {
			element.removeAttribute("href");
		}

		// "If element's specified command value for command is null, return the
		// empty list."
		if (getSpecifiedCommandValue(element, command) === null) {
			return [];
		}

		// "Set the tag name of element to "span", and return the one-node list
		// consisting of the result."
		return [setTagName(element, "span", range)];
	}

	//@}
	///// Forcing the value of a node /////
	//@{

	function forceValue(node, command, newValue, range) {
		var children = [];
		var i;
		var specifiedValue;

		// "If node's parent is null, abort this algorithm."
		if (!node.parentNode) {
			return;
		}

		// "If new value is null, abort this algorithm."
		if (newValue === null) {
			return;
		}

		// "If node is an allowed child of "span":"
		if (isAllowedChild(node, "span")) {
			// "Reorder modifiable descendants of node's previousSibling."
			reorderModifiableDescendants(node.previousSibling, command, newValue, range);

			// "Reorder modifiable descendants of node's nextSibling."
			reorderModifiableDescendants(node.nextSibling, command, newValue, range);

			// "Wrap the one-node list consisting of node, with sibling criteria
			// returning true for a simple modifiable element whose specified
			// command value is equivalent to new value and whose effective command
			// value is loosely equivalent to new value and false otherwise, and
			// with new parent instructions returning null."
			wrap(
				[node],
				function (node) {
					return isSimpleModifiableElement(node) && areEquivalentValues(command, getSpecifiedCommandValue(node, command), newValue) && areLooselyEquivalentValues(command, getEffectiveCommandValue(node, command), newValue);
				},
				function () {
					return null;
				},
				range
			);
		}

		// "If the effective command value of command is loosely equivalent to new
		// value on node, abort this algorithm."
		if (areLooselyEquivalentValues(command, getEffectiveCommandValue(node, command), newValue)) {
			return;
		}

		// "If node is not an allowed child of "span":"
		if (!isAllowedChild(node, "span")) {
			// "Let children be all children of node, omitting any that are
			// Elements whose specified command value for command is neither null
			// nor equivalent to new value."
			for (i = 0; i < node.childNodes.length; i++) {
				if (node.childNodes[i].nodeType == $_.Node.ELEMENT_NODE) {
					specifiedValue = getSpecifiedCommandValue(node.childNodes[i], command);

					if (specifiedValue !== null && !areEquivalentValues(command, newValue, specifiedValue)) {
						continue;
					}
				}
				children.push(node.childNodes[i]);
			}

			// "Force the value of each Node in children, with command and new
			// value as in this invocation of the algorithm."
			for (i = 0; i < children.length; i++) {
				forceValue(children[i], command, newValue, range);
			}

			// "Abort this algorithm."
			return;
		}

		// "If the effective command value of command is loosely equivalent to new
		// value on node, abort this algorithm."
		if (areLooselyEquivalentValues(command, getEffectiveCommandValue(node, command), newValue)) {
			return;
		}

		// "Let new parent be null."
		var newParent = null;

		// "If the CSS styling flag is false:"
		if (!cssStylingFlag) {
			// "If command is "bold" and new value is "bold", let new parent be the
			// result of calling createElement("b") on the ownerDocument of node."
			if (command == "bold" && (newValue == "bold" || newValue == "700")) {
				newParent = node.ownerDocument.createElement("b");
			}

			// "If command is "italic" and new value is "italic", let new parent be
			// the result of calling createElement("i") on the ownerDocument of
			// node."
			if (command == "italic" && newValue == "italic") {
				newParent = node.ownerDocument.createElement("i");
			}

			// "If command is "strikethrough" and new value is "line-through", let
			// new parent be the result of calling createElement("s") on the
			// ownerDocument of node."
			if (command == "strikethrough" && newValue == "line-through") {
				newParent = node.ownerDocument.createElement("s");
			}

			// "If command is "underline" and new value is "underline", let new
			// parent be the result of calling createElement("u") on the
			// ownerDocument of node."
			if (command == "underline" && newValue == "underline") {
				newParent = node.ownerDocument.createElement("u");
			}

			// "If command is "foreColor", and new value is fully opaque with red,
			// green, and blue components in the range 0 to 255:"
			if (command == "forecolor" && parseSimpleColor(newValue)) {
				// "Let new parent be the result of calling createElement("span")
				// on the ownerDocument of node."
				// NOTE: modified this process to create span elements with style attributes
				// instead of oldschool font tags with color attributes
				newParent = node.ownerDocument.createElement("span");

				// "If new value is an extended color keyword, set the color
				// attribute of new parent to new value."
				//
				// "Otherwise, set the color attribute of new parent to the result
				// of applying the rules for serializing simple color values to new
				// value (interpreted as a simple color)."
				jQuery(newParent).css('color', parseSimpleColor(newValue));
			}

			// "If command is "fontName", let new parent be the result of calling
			// createElement("font") on the ownerDocument of node, then set the
			// face attribute of new parent to new value."
			if (command == "fontname") {
				newParent = node.ownerDocument.createElement("font");
				newParent.face = newValue;
			}
		}

		// "If command is "createLink" or "unlink":"
		if (command == "createlink" || command == "unlink") {
			// "Let new parent be the result of calling createElement("a") on the
			// ownerDocument of node."
			newParent = node.ownerDocument.createElement("a");

			// "Set the href attribute of new parent to new value."
			newParent.setAttribute("href", newValue);

			// "Let ancestor be node's parent."
			var ancestor = node.parentNode;

			// "While ancestor is not null:"
			while (ancestor) {
				// "If ancestor is an a, set the tag name of ancestor to "span",
				// and let ancestor be the result."
				if (isNamedHtmlElement(ancestor, 'A')) {
					ancestor = setTagName(ancestor, "span", range);
				}

				// "Set ancestor to its parent."
				ancestor = ancestor.parentNode;
			}
		}

		// "If command is "fontSize"; and new value is one of "xx-small", "small",
		// "medium", "large", "x-large", "xx-large", or "xxx-large"; and either the
		// CSS styling flag is false, or new value is "xxx-large": let new parent
		// be the result of calling createElement("font") on the ownerDocument of
		// node, then set the size attribute of new parent to the number from the
		// following table based on new value: [table omitted]"
		if (command == "fontsize" && jQuery.inArray(newValue, ["xx-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"]) != -1 && (!cssStylingFlag || newValue == "xxx-large")) {
			newParent = node.ownerDocument.createElement("font");
			newParent.size = cssSizeToLegacy(newValue);
		}

		// "If command is "subscript" or "superscript" and new value is
		// "subscript", let new parent be the result of calling
		// createElement("sub") on the ownerDocument of node."
		if ((command == "subscript" || command == "superscript") && newValue == "subscript") {
			newParent = node.ownerDocument.createElement("sub");
		}

		// "If command is "subscript" or "superscript" and new value is
		// "superscript", let new parent be the result of calling
		// createElement("sup") on the ownerDocument of node."
		if ((command == "subscript" || command == "superscript") && newValue == "superscript") {
			newParent = node.ownerDocument.createElement("sup");
		}

		// "If new parent is null, let new parent be the result of calling
		// createElement("span") on the ownerDocument of node."
		if (!newParent) {
			newParent = node.ownerDocument.createElement("span");
		}

		// "Insert new parent in node's parent before node."
		node.parentNode.insertBefore(newParent, node);

		// "If the effective command value of command for new parent is not loosely
		// equivalent to new value, and the relevant CSS property for command is
		// not null, set that CSS property of new parent to new value (if the new
		// value would be valid)."
		var property = commands[command].relevantCssProperty;
		if (property !== null && !areLooselyEquivalentValues(command, getEffectiveCommandValue(newParent, command), newValue)) {
			newParent.style[property] = newValue;
		}

		// "If command is "strikethrough", and new value is "line-through", and the
		// effective command value of "strikethrough" for new parent is not
		// "line-through", set the "text-decoration" property of new parent to
		// "line-through"."
		if (command == "strikethrough" && newValue == "line-through" && getEffectiveCommandValue(newParent, "strikethrough") != "line-through") {
			newParent.style.textDecoration = "line-through";
		}

		// "If command is "underline", and new value is "underline", and the
		// effective command value of "underline" for new parent is not
		// "underline", set the "text-decoration" property of new parent to
		// "underline"."
		if (command == "underline" && newValue == "underline" && getEffectiveCommandValue(newParent, "underline") != "underline") {
			newParent.style.textDecoration = "underline";
		}

		// "Append node to new parent as its last child, preserving ranges."
		movePreservingRanges(node, newParent, newParent.childNodes.length, range);

		// "If node is an Element and the effective command value of command for
		// node is not loosely equivalent to new value:"
		if (node.nodeType == $_.Node.ELEMENT_NODE && !areEquivalentValues(command, getEffectiveCommandValue(node, command), newValue)) {
			// "Insert node into the parent of new parent before new parent,
			// preserving ranges."
			movePreservingRanges(node, newParent.parentNode, getNodeIndex(newParent), range);

			// "Remove new parent from its parent."
			newParent.parentNode.removeChild(newParent);

			// "Let children be all children of node, omitting any that are
			// Elements whose specified command value for command is neither null
			// nor equivalent to new value."
			children = [];
			for (i = 0; i < node.childNodes.length; i++) {
				if (node.childNodes[i].nodeType == $_.Node.ELEMENT_NODE) {
					specifiedValue = getSpecifiedCommandValue(node.childNodes[i], command);

					if (specifiedValue !== null && !areEquivalentValues(command, newValue, specifiedValue)) {
						continue;
					}
				}
				children.push(node.childNodes[i]);
			}

			// "Force the value of each Node in children, with command and new
			// value as in this invocation of the algorithm."
			for (i = 0; i < children.length; i++) {
				forceValue(children[i], command, newValue, range);
			}
		}
	}

	//@}
	///// Pushing down values /////
	//@{

	function pushDownValues(node, command, newValue, range) {
		// "If node's parent is not an Element, abort this algorithm."
		if (!node.parentNode || node.parentNode.nodeType != $_.Node.ELEMENT_NODE) {
			return;
		}

		// "If the effective command value of command is loosely equivalent to new
		// value on node, abort this algorithm."
		if (areLooselyEquivalentValues(command, getEffectiveCommandValue(node, command), newValue)) {
			return;
		}

		// "Let current ancestor be node's parent."
		var currentAncestor = node.parentNode;

		// "Let ancestor list be a list of Nodes, initially empty."
		var ancestorList = [];

		// "While current ancestor is an editable Element and the effective command
		// value of command is not loosely equivalent to new value on it, append
		// current ancestor to ancestor list, then set current ancestor to its
		// parent."
		while (isEditable(currentAncestor) && currentAncestor.nodeType == $_.Node.ELEMENT_NODE && !areLooselyEquivalentValues(command, getEffectiveCommandValue(currentAncestor, command), newValue)) {
			ancestorList.push(currentAncestor);
			currentAncestor = currentAncestor.parentNode;
		}

		// "If ancestor list is empty, abort this algorithm."
		if (!ancestorList.length) {
			return;
		}

		// "Let propagated value be the specified command value of command on the
		// last member of ancestor list."
		var propagatedValue = getSpecifiedCommandValue(ancestorList[ancestorList.length - 1], command);

		// "If propagated value is null and is not equal to new value, abort this
		// algorithm."
		if (propagatedValue === null && propagatedValue != newValue) {
			return;
		}

		// "If the effective command value for the parent of the last member of
		// ancestor list is not loosely equivalent to new value, and new value is
		// not null, abort this algorithm."
		if (newValue !== null && !areLooselyEquivalentValues(command, getEffectiveCommandValue(ancestorList[ancestorList.length - 1].parentNode, command), newValue)) {
			return;
		}

		// "While ancestor list is not empty:"
		while (ancestorList.length) {
			// "Let current ancestor be the last member of ancestor list."
			// "Remove the last member from ancestor list."
			currentAncestor = ancestorList.pop();

			// "If the specified command value of current ancestor for command is
			// not null, set propagated value to that value."
			if (getSpecifiedCommandValue(currentAncestor, command) !== null) {
				propagatedValue = getSpecifiedCommandValue(currentAncestor, command);
			}

			// "Let children be the children of current ancestor."
			var children = Array.prototype.slice.call(toArray(currentAncestor.childNodes));

			// "If the specified command value of current ancestor for command is
			// not null, clear the value of current ancestor."
			if (getSpecifiedCommandValue(currentAncestor, command) !== null) {
				clearValue(currentAncestor, command, range);
			}

			// "For every child in children:"
			var i;
			for (i = 0; i < children.length; i++) {
				var child = children[i];

				// "If child is node, continue with the next child."
				if (child == node) {
					continue;
				}

				// "If child is an Element whose specified command value for
				// command is neither null nor equivalent to propagated value,
				// continue with the next child."
				if (child.nodeType == $_.Node.ELEMENT_NODE && getSpecifiedCommandValue(child, command) !== null && !areEquivalentValues(command, propagatedValue, getSpecifiedCommandValue(child, command))) {
					continue;
				}

				// "If child is the last member of ancestor list, continue with the
				// next child."
				if (child == ancestorList[ancestorList.length - 1]) {
					continue;
				}

				// "Force the value of child, with command as in this algorithm
				// and new value equal to propagated value."
				forceValue(child, command, propagatedValue, range);
			}
		}
	}

	function restoreValues(values, range) {
		// "For each (node, command, value) triple in values:"
		$_(values).forEach(function (triple) {
			var node = triple[0];
			var command = triple[1];
			var value = triple[2];

			// "Let ancestor equal node."
			var ancestor = node;

			// "If ancestor is not an Element, set it to its parent."
			if (!ancestor || ancestor.nodeType != $_.Node.ELEMENT_NODE) {
				ancestor = ancestor.parentNode;
			}

			// "While ancestor is an Element and its specified command value for
			// command is null, set it to its parent."
			while (ancestor && ancestor.nodeType == $_.Node.ELEMENT_NODE && getSpecifiedCommandValue(ancestor, command) === null) {
				ancestor = ancestor.parentNode;
			}

			// "If value is null and ancestor is an Element, push down values on
			// node for command, with new value null."
			if (value === null && ancestor && ancestor.nodeType == $_.Node.ELEMENT_NODE) {
				pushDownValues(node, command, null, range);

				// "Otherwise, if ancestor is an Element and its specified command
				// value for command is not equivalent to value, or if ancestor is not
				// an Element and value is not null, force the value of command to
				// value on node."
			} else if ((ancestor && ancestor.nodeType == $_.Node.ELEMENT_NODE && !areEquivalentValues(command, getSpecifiedCommandValue(ancestor, command), value)) || ((!ancestor || ancestor.nodeType != $_.Node.ELEMENT_NODE) && value !== null)) {
				forceValue(node, command, value, range);
			}
		});
	}

	//@}
	///// Setting the selection's value /////
	//@{

	function setSelectionValue(command, newValue, range) {

		// Use current selected range if no range passed
		range = range || getActiveRange();

		// "If there is no editable text node effectively contained in the active
		// range:"
		if (!$_(getAllEffectivelyContainedNodes(range)).filter(function (node) { return node.nodeType == $_.Node.TEXT_NODE; }, true).some(isEditable)) {
			// "If command has inline command activated values, set the state
			// override to true if new value is among them and false if it's not."
			if (commands[command].hasOwnProperty("inlineCommandActivatedValues")) {
				setStateOverride(
					command,
					$_(commands[command].inlineCommandActivatedValues).indexOf(newValue) != -1,
					range
				);
			}

			// "If command is "subscript", unset the state override for
			// "superscript"."
			if (command == "subscript") {
				unsetStateOverride("superscript", range);
			}

			// "If command is "superscript", unset the state override for
			// "subscript"."
			if (command == "superscript") {
				unsetStateOverride("subscript", range);
			}

			// "If new value is null, unset the value override (if any)."
			if (newValue === null) {
				unsetValueOverride(command, range);

				// "Otherwise, if command has a value specified, set the value override
				// to new value."
			} else if (commands[command].hasOwnProperty("value")) {
				setValueOverride(command, newValue, range);
			}

			// "Abort these steps."
			return;
		}

		// "If the active range's start node is an editable Text node, and its
		// start offset is neither zero nor its start node's length, call
		// splitText() on the active range's start node, with argument equal to the
		// active range's start offset. Then set the active range's start node to
		// the result, and its start offset to zero."
		if (isEditable(range.startContainer) && range.startContainer.nodeType == $_.Node.TEXT_NODE && range.startOffset != 0 && range.startOffset != getNodeLength(range.startContainer)) {
			// Account for browsers not following range mutation rules
			var newNode = range.startContainer.splitText(range.startOffset);
			var newActiveRange = Aloha.createRange();
			if (range.startContainer == range.endContainer) {
				var newEndOffset = range.endOffset - range.startOffset;
				newActiveRange.setEnd(newNode, newEndOffset);
				range.setEnd(newNode, newEndOffset);
			}
			newActiveRange.setStart(newNode, 0);
			Aloha.getSelection().removeAllRanges();
			Aloha.getSelection().addRange(newActiveRange);

			range.setStart(newNode, 0);
		}

		// "If the active range's end node is an editable Text node, and its end
		// offset is neither zero nor its end node's length, call splitText() on
		// the active range's end node, with argument equal to the active range's
		// end offset."
		if (isEditable(range.endContainer) && range.endContainer.nodeType == $_.Node.TEXT_NODE && range.endOffset != 0 && range.endOffset != getNodeLength(range.endContainer)) {
			// IE seems to mutate the range incorrectly here, so we need correction
			// here as well.  The active range will be temporarily in orphaned
			// nodes, so calling getActiveRange() after splitText() but before
			// fixing the range will throw an exception.
			// TODO: check if this is still neccessary
			var activeRange = range;
			var newStart = [activeRange.startContainer, activeRange.startOffset];
			var newEnd = [activeRange.endContainer, activeRange.endOffset];
			activeRange.endContainer.splitText(activeRange.endOffset);
			activeRange.setStart(newStart[0], newStart[1]);
			activeRange.setEnd(newEnd[0], newEnd[1]);

			Aloha.getSelection().removeAllRanges();
			Aloha.getSelection().addRange(activeRange);
		}

		// "Let element list be all editable Elements effectively contained in the
		// active range.
		//
		// "For each element in element list, clear the value of element."
		$_(getAllEffectivelyContainedNodes(getActiveRange(), function (node) {
			return isEditable(node) && node.nodeType == $_.Node.ELEMENT_NODE;
		})).forEach(function (element) {
			clearValue(element, command, range);
		});

		// "Let node list be all editable nodes effectively contained in the active
		// range.
		//
		// "For each node in node list:"
		$_(getAllEffectivelyContainedNodes(range, isEditable)).forEach(function (node) {
			// "Push down values on node."
			pushDownValues(node, command, newValue, range);

			// "Force the value of node."
			forceValue(node, command, newValue, range);
		});
	}

	/**
	 * attempt to retrieve a block like a table or an Aloha Block
	 * which is located one step right of the current caret position.
	 * If an appropriate element is found it will be returned or
	 * false otherwise
	 *
	 * @param {element} node current node we're in
	 * @param {number} offset current offset within that node
	 *
	 * @return the dom node if found or false if no appropriate
	 * element was found
	 */
	function getBlockAtNextPosition(node, offset) {
		var i;

		// if we're inside a text node we first have to check
		// if there is nothing but tabs, newlines or the like
		// after our current cursor position
		if (node.nodeType === $_.Node.TEXT_NODE && offset < node.length) {
			for (i = offset; i < node.length; i++) {
				if ((node.data.charAt(i) !== '\t' && node.data.charAt(i) !== '\r' && node.data.charAt(i) !== '\n') || node.data.charCodeAt(i) === 160) { // &nbsp;
					// this is a character that has to be deleted first
					return false;
				}
			}
		}

		// try the most simple approach first: the next sibling
		// is a table
		if (node.nextSibling && node.nextSibling.className && node.nextSibling.className.indexOf("aloha-table-wrapper") >= 0) {
			return node.nextSibling;
		}

		// since we got only ignorable whitespace here determine if
		// our nodes parents next sibling is a table
		if (node.parentNode && node.parentNode.nextSibling && node.parentNode.nextSibling.className && node.parentNode.nextSibling.className.indexOf("aloha-table-wrapper") >= 0) {
			return node.parentNode.nextSibling;
		}

		// our parents nextsibling is a pure whitespace node such as
		// generated by sourcecode indentation so we'll check for
		// the next next sibling
		if (node.parentNode && node.parentNode.nextSibling && isWhitespaceNode(node.parentNode.nextSibling) && node.parentNode.nextSibling.nextSibling && node.parentNode.nextSibling.nextSibling.className && node.parentNode.nextSibling.nextSibling.className.indexOf("aloha-table-wrapper") >= 0) {
			return node.parentNode.nextSibling.nextSibling;
		}

		// Note: the search above works for tables, since they cannot be
		// nested deeply in paragraphs and other formatting tags. If this code
		// is extended to work also for other blocks, the search probably needs to be adapted
	}

	/**
	 * Attempt to retrieve a block like a table or an Aloha Block
	 * which is located right before the current position.
	 * If an appropriate element is found, it will be returned or
	 * false otherwise
	 *
	 * @param {element} node current node
	 * @param {offset} offset current offset
	 *
	 * @return dom node of found or false if no appropriate
	 * element was found
	 */
	function getBlockAtPreviousPosition(node, offset) {
		var i;

		if (node.nodeType === $_.Node.TEXT_NODE && offset > 0) {
			for (i = offset - 1; i >= 0; i--) {
				if ((node.data.charAt(i) !== '\t' && node.data.charAt(i) !== '\r' && node.data.charAt(i) !== '\n') || node.data.charCodeAt(i) === 160) { // &nbsp;
					// this is a character that has to be deleted first
					return false;
				}
			}
		}

		// try the previous sibling
		if (node.previousSibling && node.previousSibling.className && node.previousSibling.className.indexOf("aloha-table-wrapper") >= 0) {
			return node.previousSibling;
		}

		// try the parent's previous sibling
		if (node.parentNode && node.parentNode.previousSibling && node.parentNode.previousSibling.className && node.parentNode.previousSibling.className.indexOf("aloha-table-wrapper") >= 0) {
			return node.parentNode.previousSibling;
		}

		// the parent's previous sibling might be a whitespace node
		if (node.parentNode && node.parentNode.previousSibling && isWhitespaceNode(node.parentNode.previousSibling) && node.parentNode.previousSibling.previousSibling && node.parentNode.previousSibling.previousSibling.className && node.parentNode.previousSibling.previousSibling.className.indexOf('aloha-table-wrapper') >= 0) {
			return node.parentNode.previousSibling.previousSibling;
		}

		// Note: the search above works for tables, since they cannot be
		// nested deeply in paragraphs and other formatting tags. If this code
		// is extended to work also for other blocks, the search probably needs to be adapted

		return false;
	}

	// "A boundary point (node, offset) is a block start point if either node's
	// parent is null and offset is zero; or node has a child with index offset −
	// 1, and that child is either a visible block node or a visible br."
	function isBlockStartPoint(node, offset) {
		return (!node.parentNode && offset == 0) || (0 <= offset - 1 && offset - 1 < node.childNodes.length && isVisible(node.childNodes[offset - 1]) && (isBlockNode(node.childNodes[offset - 1]) || isNamedHtmlElement(node.childNodes[offset - 1], "br")));
	}

	// "A boundary point (node, offset) is a block end point if either node's
	// parent is null and offset is node's length; or node has a child with index
	// offset, and that child is a visible block node."
	function isBlockEndPoint(node, offset) {
		return (!node.parentNode && offset == getNodeLength(node)) || (offset < node.childNodes.length && isVisible(node.childNodes[offset]) && isBlockNode(node.childNodes[offset]));
	}

	// "A boundary point is a block boundary point if it is either a block start
	// point or a block end point."
	function isBlockBoundaryPoint(node, offset) {
		return isBlockStartPoint(node, offset) || isBlockEndPoint(node, offset);
	}

	function followsLineBreak(node) {
		// "Let offset be zero."
		var offset = 0;

		// "While (node, offset) is not a block boundary point:"
		while (!isBlockBoundaryPoint(node, offset)) {
			// "If node has a visible child with index offset minus one, return
			// false."
			if (0 <= offset - 1 && offset - 1 < node.childNodes.length && isVisible(node.childNodes[offset - 1])) {
				return false;
			}

			// "If offset is zero or node has no children, set offset to node's
			// index, then set node to its parent."
			if (offset == 0 || !node.hasChildNodes()) {
				offset = getNodeIndex(node);
				node = node.parentNode;

				// "Otherwise, set node to its child with index offset minus one, then
				// set offset to node's length."
			} else {
				node = node.childNodes[offset - 1];
				offset = getNodeLength(node);
			}
		}

		// "Return true."
		return true;
	}

	function precedesLineBreak(node) {
		// "Let offset be node's length."
		var offset = getNodeLength(node);

		// "While (node, offset) is not a block boundary point:"
		while (!isBlockBoundaryPoint(node, offset)) {
			// "If node has a visible child with index offset, return false."
			if (offset < node.childNodes.length && isVisible(node.childNodes[offset])) {
				return false;
			}

			// "If offset is node's length or node has no children, set offset to
			// one plus node's index, then set node to its parent."
			if (offset == getNodeLength(node) || !node.hasChildNodes()) {
				offset = 1 + getNodeIndex(node);
				node = node.parentNode;

				// "Otherwise, set node to its child with index offset and set offset
				// to zero."
			} else {
				node = node.childNodes[offset];
				offset = 0;
			}
		}

		// "Return true."
		return true;
	}

	//@}
	///// Splitting a node list's parent /////
	//@{

	function splitParent(nodeList, range) {
		var i;

		// "Let original parent be the parent of the first member of node list."
		var originalParent = nodeList[0].parentNode;

		// "If original parent is not editable or its parent is null, do nothing
		// and abort these steps."
		if (!isEditable(originalParent) || !originalParent.parentNode) {
			return;
		}

		// "If the first child of original parent is in node list, remove
		// extraneous line breaks before original parent."
		if (jQuery.inArray(originalParent.firstChild, nodeList) != -1) {
			removeExtraneousLineBreaksBefore(originalParent);
		}

		var firstChildInNodeList = jQuery.inArray(originalParent.firstChild, nodeList) != -1;
		var lastChildInNodeList = jQuery.inArray(originalParent.lastChild, nodeList) != -1;

		// "If the first child of original parent is in node list, and original
		// parent follows a line break, set follows line break to true. Otherwise,
		// set follows line break to false."
		var followsLineBreak_ = firstChildInNodeList && followsLineBreak(originalParent);

		// "If the last child of original parent is in node list, and original
		// parent precedes a line break, set precedes line break to true.
		// Otherwise, set precedes line break to false."
		var precedesLineBreak_ = lastChildInNodeList && precedesLineBreak(originalParent);

		// "If the first child of original parent is not in node list, but its last
		// child is:"
		if (!firstChildInNodeList && lastChildInNodeList) {
			// "For each node in node list, in reverse order, insert node into the
			// parent of original parent immediately after original parent,
			// preserving ranges."
			for (i = nodeList.length - 1; i >= 0; i--) {
				movePreservingRanges(nodeList[i], originalParent.parentNode, 1 + getNodeIndex(originalParent), range);
			}

			// "If precedes line break is true, and the last member of node list
			// does not precede a line break, call createElement("br") on the
			// context object and insert the result immediately after the last
			// member of node list."
			if (precedesLineBreak_ && !precedesLineBreak(nodeList[nodeList.length - 1])) {
				nodeList[nodeList.length - 1].parentNode.insertBefore(document.createElement("br"), nodeList[nodeList.length - 1].nextSibling);
			}

			// "Remove extraneous line breaks at the end of original parent."
			removeExtraneousLineBreaksAtTheEndOf(originalParent);

			// "Abort these steps."
			return;
		}

		// "If the first child of original parent is not in node list:"
		if (!firstChildInNodeList) {
			// "Let cloned parent be the result of calling cloneNode(false) on
			// original parent."
			var clonedParent = originalParent.cloneNode(false);

			// "If original parent has an id attribute, unset it."
			originalParent.removeAttribute("id");

			// "Insert cloned parent into the parent of original parent immediately
			// before original parent."
			originalParent.parentNode.insertBefore(clonedParent, originalParent);

			// "While the previousSibling of the first member of node list is not
			// null, append the first child of original parent as the last child of
			// cloned parent, preserving ranges."
			while (nodeList[0].previousSibling) {
				movePreservingRanges(originalParent.firstChild, clonedParent, clonedParent.childNodes.length, range);
			}
		}

		// "For each node in node list, insert node into the parent of original
		// parent immediately before original parent, preserving ranges."
		for (i = 0; i < nodeList.length; i++) {
			movePreservingRanges(nodeList[i], originalParent.parentNode, getNodeIndex(originalParent), range);
		}

		// "If follows line break is true, and the first member of node list does
		// not follow a line break, call createElement("br") on the context object
		// and insert the result immediately before the first member of node list."
		if (followsLineBreak_ && !followsLineBreak(nodeList[0])) {
			nodeList[0].parentNode.insertBefore(document.createElement("br"), nodeList[0]);
		}

		// "If the last member of node list is an inline node other than a br, and
		// the first child of original parent is a br, and original parent is not
		// an inline node, remove the first child of original parent from original
		// parent."
		if (isInlineNode(nodeList[nodeList.length - 1]) && !isNamedHtmlElement(nodeList[nodeList.length - 1], "br") && isNamedHtmlElement(originalParent.firstChild, "br") && !isInlineNode(originalParent)) {
			originalParent.removeChild(originalParent.firstChild);
		}

		// "If original parent has no children:"
		if (!originalParent.hasChildNodes()) {
			// if the current range is collapsed and at the end of the originalParent.parentNode
			// the offset will not be available anymore after the next step (remove child)
			// that's why we need to fix the range to prevent a bogus offset
			if (originalParent.parentNode === range.startContainer && originalParent.parentNode === range.endContainer && range.startContainer === range.endContainer && range.startOffset === range.endOffset && originalParent.parentNode.childNodes.length === range.startOffset) {
				range.startOffset = originalParent.parentNode.childNodes.length - 1;
				range.endOffset = range.startOffset;
			}

			// "Remove original parent from its parent."
			originalParent.parentNode.removeChild(originalParent);

			// "If precedes line break is true, and the last member of node list
			// does not precede a line break, call createElement("br") on the
			// context object and insert the result immediately after the last
			// member of node list."
			if (precedesLineBreak_ && !precedesLineBreak(nodeList[nodeList.length - 1])) {
				nodeList[nodeList.length - 1].parentNode.insertBefore(document.createElement("br"), nodeList[nodeList.length - 1].nextSibling);
			}

			// "Otherwise, remove extraneous line breaks before original parent."
		} else {
			removeExtraneousLineBreaksBefore(originalParent);
		}

		// "If node list's last member's nextSibling is null, but its parent is not
		// null, remove extraneous line breaks at the end of node list's last
		// member's parent."
		if (!nodeList[nodeList.length - 1].nextSibling && nodeList[nodeList.length - 1].parentNode) {
			removeExtraneousLineBreaksAtTheEndOf(nodeList[nodeList.length - 1].parentNode);
		}
	}

	//@}
	///// The backColor command /////
	//@{
	commands.backcolor = {
		// Copy-pasted, same as hiliteColor
		action: function (value, range) {
			// Action is further copy-pasted, same as foreColor

			// "If value is not a valid CSS color, prepend "#" to it."
			//
			// "If value is still not a valid CSS color, or if it is currentColor,
			// abort these steps and do nothing."
			//
			// Cheap hack for testing, no attempt to be comprehensive.
			if (/^([0-9a-fA-F]{3}){1,2}$/.test(value)) {
				value = "#" + value;
			}
			if (!/^(rgba?|hsla?)\(.*\)$/.test(value) && !parseSimpleColor(value) && value.toLowerCase() != "transparent") {
				return;
			}

			// "Set the selection's value to value."
			setSelectionValue("backcolor", value, range);
		},
		standardInlineValueCommand: true,
		relevantCssProperty: "backgroundColor",
		equivalentValues: function (val1, val2) {
			// "Either both strings are valid CSS colors and have the same red,
			// green, blue, and alpha components, or neither string is a valid CSS
			// color."
			return normalizeColor(val1) === normalizeColor(val2);
		}
	};

	//@}
	///// The bold command /////
	//@{
	commands.bold = {
		action: function (value, range) {
			// "If queryCommandState("bold") returns true, set the selection's
			// value to "normal". Otherwise set the selection's value to "bold"."
			if (myQueryCommandState("bold", range)) {
				setSelectionValue("bold", "normal", range);
			} else {
				setSelectionValue("bold", "bold", range);
			}
		},
		inlineCommandActivatedValues: ["bold", "600", "700", "800", "900"],
		relevantCssProperty: "fontWeight",
		equivalentValues: function (val1, val2) {
			// "Either the two strings are equal, or one is "bold" and the other is
			// "700", or one is "normal" and the other is "400"."
			return val1 == val2 || (val1 == "bold" && val2 == "700") || (val1 == "700" && val2 == "bold") || (val1 == "normal" && val2 == "400") || (val1 == "400" && val2 == "normal");
		}
	};

	//@}
	///// The createLink command /////
	//@{
	commands.createlink = {
		action: function (value, range) {
			// "If value is the empty string, abort these steps and do nothing."
			if (value === "") {
				return;
			}

			// "For each editable a element that has an href attribute and is an
			// ancestor of some node effectively contained in the active range, set
			// that a element's href attribute to value."
			//
			// TODO: We don't actually do this in tree order, not that it matters
			// unless you're spying with mutation events.
			$_(getAllEffectivelyContainedNodes(getActiveRange())).forEach(function (node) {
				$_(getAncestors(node)).forEach(function (ancestor) {
					if (isEditable(ancestor) && isNamedHtmlElement(ancestor, 'a') && hasAttribute(ancestor, "href")) {
						ancestor.setAttribute("href", value);
					}
				});
			});

			// "Set the selection's value to value."
			setSelectionValue("createlink", value, range);
		},
		standardInlineValueCommand: true
	};

	//@}
	///// The fontName command /////
	//@{
	commands.fontname = {
		action: function (value, range) {
			// "Set the selection's value to value."
			setSelectionValue("fontname", value, range);
		},
		standardInlineValueCommand: true,
		relevantCssProperty: "fontFamily"
	};

	//@}
	///// The fontSize command /////
	//@{

	commands.fontsize = {
		action: function (value, range) {
			// "If value is the empty string, abort these steps and do nothing."
			if (value === "") {
				return;
			}

			value = normalizeFontSize(value);

			// "If value is not one of the strings "xx-small", "x-small", "small",
			// "medium", "large", "x-large", "xx-large", "xxx-large", and is not a
			// valid CSS absolute length, then abort these steps and do nothing."
			//
			// More cheap hacks to skip valid CSS absolute length checks.
			if (jQuery.inArray(value, ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"]) == -1 && !/^[0-9]+(\.[0-9]+)?(cm|mm|in|pt|pc)$/.test(value)) {
				return;
			}

			// "Set the selection's value to value."
			setSelectionValue("fontsize", value, range);
		},
		indeterm: function () {
			// "True if among editable Text nodes that are effectively contained in
			// the active range, there are two that have distinct effective command
			// values.  Otherwise false."
			return $_(getAllEffectivelyContainedNodes(getActiveRange(), function (node) {
				return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE;
			})).map(function (node) {
				return getEffectiveCommandValue(node, "fontsize");
			}, true).filter(function (value, i, arr) {
				return $_(arr.slice(0, i)).indexOf(value) == -1;
			}).length >= 2;
		},
		value: function (range) {
			// "Let pixel size be the effective command value of the first editable
			// Text node that is effectively contained in the active range, or if
			// there is no such node, the effective command value of the active
			// range's start node, in either case interpreted as a number of
			// pixels."
			var node = getAllEffectivelyContainedNodes(range, function (node) {
				return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE;
			})[0];
			if (node === undefined) {
				node = range.startContainer;
			}
			var pixelSize = getEffectiveCommandValue(node, "fontsize");

			// "Return the legacy font size for pixel size."
			return getLegacyFontSize(pixelSize);
		},
		relevantCssProperty: "fontSize"
	};

	//@}
	///// The foreColor command /////
	//@{
	commands.forecolor = {
		action: function (value, range) {
			// Copy-pasted, same as backColor and hiliteColor

			// "If value is not a valid CSS color, prepend "#" to it."
			//
			// "If value is still not a valid CSS color, or if it is currentColor,
			// abort these steps and do nothing."
			//
			// Cheap hack for testing, no attempt to be comprehensive.
			if (/^([0-9a-fA-F]{3}){1,2}$/.test(value)) {
				value = "#" + value;
			}
			if (!/^(rgba?|hsla?)\(.*\)$/.test(value) && !parseSimpleColor(value) && value.toLowerCase() != "transparent") {
				return;
			}

			// "Set the selection's value to value."
			setSelectionValue("forecolor", value, range);
		},
		standardInlineValueCommand: true,
		relevantCssProperty: "color",
		equivalentValues: function (val1, val2) {
			// "Either both strings are valid CSS colors and have the same red,
			// green, blue, and alpha components, or neither string is a valid CSS
			// color."
			return normalizeColor(val1) === normalizeColor(val2);
		}
	};

	//@}
	///// The hiliteColor command /////
	//@{
	commands.hilitecolor = {
		// Copy-pasted, same as backColor
		action: function (value, range) {
			// Action is further copy-pasted, same as foreColor

			// "If value is not a valid CSS color, prepend "#" to it."
			//
			// "If value is still not a valid CSS color, or if it is currentColor,
			// abort these steps and do nothing."
			//
			// Cheap hack for testing, no attempt to be comprehensive.
			if (/^([0-9a-fA-F]{3}){1,2}$/.test(value)) {
				value = "#" + value;
			}
			if (!/^(rgba?|hsla?)\(.*\)$/.test(value) && !parseSimpleColor(value) && value.toLowerCase() != "transparent") {
				return;
			}

			// "Set the selection's value to value."
			setSelectionValue("hilitecolor", value, range);
		},
		indeterm: function () {
			// "True if among editable Text nodes that are effectively contained in
			// the active range, there are two that have distinct effective command
			// values.  Otherwise false."
			return $_(getAllEffectivelyContainedNodes(getActiveRange(), function (node) {
				return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE;
			})).map(function (node) {
				return getEffectiveCommandValue(node, "hilitecolor");
			}, true).filter(function (value, i, arr) {
				return $_(arr.slice(0, i)).indexOf(value) == -1;
			}).length >= 2;
		},
		standardInlineValueCommand: true,
		relevantCssProperty: "backgroundColor",
		equivalentValues: function (val1, val2) {
			// "Either both strings are valid CSS colors and have the same red,
			// green, blue, and alpha components, or neither string is a valid CSS
			// color."
			return normalizeColor(val1) === normalizeColor(val2);
		}
	};

	//@}
	///// The italic command /////
	//@{
	commands.italic = {
		action: function (value, range) {
			// "If queryCommandState("italic") returns true, set the selection's
			// value to "normal". Otherwise set the selection's value to "italic"."
			if (myQueryCommandState("italic", range)) {
				setSelectionValue("italic", "normal", range);
			} else {
				setSelectionValue("italic", "italic", range);
			}
		},
		inlineCommandActivatedValues: ["italic", "oblique"],
		relevantCssProperty: "fontStyle"
	};

	//@}
	///// The removeFormat command /////
	//@{
	commands.removeformat = {
		action: function (value, range) {
			var newEnd, newStart, newNode;

			// "A removeFormat candidate is an editable HTML element with local
			// name "abbr", "acronym", "b", "bdi", "bdo", "big", "blink", "cite",
			// "code", "dfn", "em", "font", "i", "ins", "kbd", "mark", "nobr", "q",
			// "s", "samp", "small", "span", "strike", "strong", "sub", "sup",
			// "tt", "u", or "var"."
			function isRemoveFormatCandidate(node) {
				return isEditable(node) && isHtmlElementInArray(node, ["abbr", "acronym", "b", "bdi", "bdo", "big", "blink", "cite", "code", "dfn", "em", "font", "i", "ins", "kbd", "mark", "nobr", "q", "s", "samp", "small", "span", "strike", "strong", "sub", "sup", "tt", "u", "var"]);
			}

			// "Let elements to remove be a list of every removeFormat candidate
			// effectively contained in the active range."
			var elementsToRemove = getAllEffectivelyContainedNodes(getActiveRange(), isRemoveFormatCandidate);

			// "For each element in elements to remove:"
			$_(elementsToRemove).forEach(function (element) {
				// "While element has children, insert the first child of element
				// into the parent of element immediately before element,
				// preserving ranges."
				while (element.hasChildNodes()) {
					movePreservingRanges(element.firstChild, element.parentNode, getNodeIndex(element), getActiveRange());
				}

				// "Remove element from its parent."
				element.parentNode.removeChild(element);
			});

			// "If the active range's start node is an editable Text node, and its
			// start offset is neither zero nor its start node's length, call
			// splitText() on the active range's start node, with argument equal to
			// the active range's start offset. Then set the active range's start
			// node to the result, and its start offset to zero."
			if (isEditable(getActiveRange().startContainer) && getActiveRange().startContainer.nodeType == $_.Node.TEXT_NODE && getActiveRange().startOffset != 0 && getActiveRange().startOffset != getNodeLength(getActiveRange().startContainer)) {
				// Account for browsers not following range mutation rules
				if (getActiveRange().startContainer == getActiveRange().endContainer) {
					newEnd = getActiveRange().endOffset - getActiveRange().startOffset;
					newNode = getActiveRange().startContainer.splitText(getActiveRange().startOffset);
					getActiveRange().setStart(newNode, 0);
					getActiveRange().setEnd(newNode, newEnd);
				} else {
					getActiveRange().setStart(getActiveRange().startContainer.splitText(getActiveRange().startOffset), 0);
				}
			}

			// "If the active range's end node is an editable Text node, and its
			// end offset is neither zero nor its end node's length, call
			// splitText() on the active range's end node, with argument equal to
			// the active range's end offset."
			if (isEditable(getActiveRange().endContainer) && getActiveRange().endContainer.nodeType == $_.Node.TEXT_NODE && getActiveRange().endOffset != 0 && getActiveRange().endOffset != getNodeLength(getActiveRange().endContainer)) {
				// IE seems to mutate the range incorrectly here, so we need
				// correction here as well.  Have to be careful to set the range to
				// something not including the text node so that getActiveRange()
				// doesn't throw an exception due to a temporarily detached
				// endpoint.
				newStart = [getActiveRange().startContainer, getActiveRange().startOffset];
				newEnd = [getActiveRange().endContainer, getActiveRange().endOffset];
				getActiveRange().setEnd(document.documentElement, 0);
				newEnd[0].splitText(newEnd[1]);
				getActiveRange().setStart(newStart[0], newStart[1]);
				getActiveRange().setEnd(newEnd[0], newEnd[1]);
			}

			// "Let node list consist of all editable nodes effectively contained
			// in the active range."
			//
			// "For each node in node list, while node's parent is a removeFormat
			// candidate in the same editing host as node, split the parent of the
			// one-node list consisting of node."
			$_(getAllEffectivelyContainedNodes(getActiveRange(), isEditable)).forEach(function (node) {
				while (isRemoveFormatCandidate(node.parentNode) && inSameEditingHost(node.parentNode, node)) {
					splitParent([node], getActiveRange());
				}
			});

			// "For each of the entries in the following list, in the given order,
			// set the selection's value to null, with command as given."
			$_(["subscript", "bold", "fontname", "fontsize", "forecolor", "hilitecolor", "italic", "strikethrough", "underline"]).forEach(function (command) {
				setSelectionValue(command, null, range);
			});
		}
	};

	//@}
	///// The strikethrough command /////
	//@{
	commands.strikethrough = {
		action: function (value, range) {
			// "If queryCommandState("strikethrough") returns true, set the
			// selection's value to null. Otherwise set the selection's value to
			// "line-through"."
			if (myQueryCommandState("strikethrough", range)) {
				setSelectionValue("strikethrough", null, range);
			} else {
				setSelectionValue("strikethrough", "line-through", range);
			}
		},
		inlineCommandActivatedValues: ["line-through"]
	};

	//@}
	///// The subscript command /////
	//@{
	commands.subscript = {
		action: function (value, range) {
			// "Call queryCommandState("subscript"), and let state be the result."
			var state = myQueryCommandState("subscript", range);

			// "Set the selection's value to null."
			setSelectionValue("subscript", null, range);

			// "If state is false, set the selection's value to "subscript"."
			if (!state) {
				setSelectionValue("subscript", "subscript", range);
			}
		},
		indeterm: function () {
			// "True if either among editable Text nodes that are effectively
			// contained in the active range, there is at least one with effective
			// command value "subscript" and at least one with some other effective
			// command value; or if there is some editable Text node effectively
			// contained in the active range with effective command value "mixed".
			// Otherwise false."
			var nodes = getAllEffectivelyContainedNodes(getActiveRange(), function (node) {
				return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE;
			});
			return (($_(nodes).some(function (node) { return getEffectiveCommandValue(node, "subscript") == "subscript"; })
					 && $_(nodes).some(function (node) { return getEffectiveCommandValue(node, "subscript") != "subscript"; }))
					|| $_(nodes).some(function (node) { return getEffectiveCommandValue(node, "subscript") == "mixed"; }));
		},
		inlineCommandActivatedValues: ["subscript"]
	};

	//@}
	///// The superscript command /////
	//@{
	commands.superscript = {
		action: function (value, range) {
			// "Call queryCommandState("superscript"), and let state be the
			// result."
			var state = myQueryCommandState("superscript", range);

			// "Set the selection's value to null."
			setSelectionValue("superscript", null, range);

			// "If state is false, set the selection's value to "superscript"."
			if (!state) {
				setSelectionValue("superscript", "superscript", range);
			}
		},
		indeterm: function () {
			// "True if either among editable Text nodes that are effectively
			// contained in the active range, there is at least one with effective
			// command value "superscript" and at least one with some other
			// effective command value; or if there is some editable Text node
			// effectively contained in the active range with effective command
			// value "mixed".  Otherwise false."
			var nodes = getAllEffectivelyContainedNodes(
				getActiveRange(),
				function (node) {
					return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE;
				}
			);
			return (($_(nodes).some(function (node) { return getEffectiveCommandValue(node, "superscript") == "superscript"; })
					 && $_(nodes).some(function (node) { return getEffectiveCommandValue(node, "superscript") != "superscript"; }))
					|| $_(nodes).some(function (node) { return getEffectiveCommandValue(node, "superscript") == "mixed"; }));
		},
		inlineCommandActivatedValues: ["superscript"]
	};

	//@}
	///// The underline command /////
	//@{
	commands.underline = {
		action: function (value, range) {
			// "If queryCommandState("underline") returns true, set the selection's
			// value to null. Otherwise set the selection's value to "underline"."
			if (myQueryCommandState("underline", range)) {
				setSelectionValue("underline", null, range);
			} else {
				setSelectionValue("underline", "underline", range);
			}
		},
		inlineCommandActivatedValues: ["underline"]
	};

	//@}
	///// The unlink command /////
	//@{
	commands.unlink = {
		action: function () {
			// "Let hyperlinks be a list of every a element that has an href
			// attribute and is contained in the active range or is an ancestor of
			// one of its boundary points."
			//
			// As usual, take care to ensure it's tree order.  The correctness of
			// the following is left as an exercise for the reader.
			var range = getActiveRange();
			var hyperlinks = [];
			var node;
			for (node = range.startContainer; node; node = node.parentNode) {
				if (isNamedHtmlElement(node, 'A') && hasAttribute(node, "href")) {
					hyperlinks.unshift(node);
				}
			}
			for (node = range.startContainer; node != nextNodeDescendants(range.endContainer); node = nextNode(node)) {
				if (isNamedHtmlElement(node, 'A') && hasAttribute(node, "href") && (isContained(node, range) || isAncestor(node, range.endContainer) || node == range.endContainer)) {
					hyperlinks.push(node);
				}
			}

			// "Clear the value of each member of hyperlinks."
			var i;
			for (i = 0; i < hyperlinks.length; i++) {
				clearValue(hyperlinks[i], "unlink", range);
			}
		},
		standardInlineValueCommand: true
	};

	//@}

	/////////////////////////////////////
	///// Block formatting commands /////
	/////////////////////////////////////

	///// Block formatting command definitions /////
	//@{

	// "An indentation element is either a blockquote, or a div that has a style
	// attribute that sets "margin" or some subproperty of it."
	function isIndentationElement(node) {
		if (!isAnyHtmlElement(node)) {
			return false;
		}

		if (node.tagName == "BLOCKQUOTE") {
			return true;
		}

		if (node.tagName != "DIV") {
			return false;
		}

		if (typeof node.style.length !== 'undefined') {
			var i;
			for (i = 0; i < node.style.length; i++) {
				// Approximate check
				if (/^(-[a-z]+-)?margin/.test(node.style[i])) {
					return true;
				}
			}
		} else {
			var s;
			/*jslint forin: true*/ //not sure whether node.style.hasOwnProperty is valid
			for (s in node.style) {
				if (/^(-[a-z]+-)?margin/.test(s) && node.style[s] && node.style[s] !== 0) {
					return true;
				}
			}
			/*jslint forin: false*/
		}

		return false;
	}

	// "A simple indentation element is an indentation element that has no
	// attributes other than one or more of
	//
	//   * "a style attribute that sets no properties other than "margin", "border",
	//     "padding", or subproperties of those;
	//   * "a class attribute;
	//   * "a dir attribute."
	function isSimpleIndentationElement(node) {
		if (!isIndentationElement(node)) {
			return false;
		}

		if (node.tagName != "BLOCKQUOTE" && node.tagName != "DIV") {
			return false;
		}

		var i;
		for (i = 0; i < node.attributes.length; i++) {
			if (!isHtmlNamespace(node.attributes[i].namespaceURI) || jQuery.inArray(node.attributes[i].name, ["style", "class", "dir"]) == -1) {
				return false;
			}
		}

		if (typeof node.style.length !== 'undefined') {
			for (i = 0; i < node.style.length; i++) {
				// This is approximate, but it works well enough for my purposes.
				if (!/^(-[a-z]+-)?(margin|border|padding)/.test(node.style[i])) {
					return false;
				}
			}
		} else {
			var s;
			/*jslint forin: true*/ //not sure whether node.style.hasOwnProperty is valid
			for (s in node.style) {
				// This is approximate, but it works well enough for my purposes.
				if (!/^(-[a-z]+-)?(margin|border|padding)/.test(s) && node.style[s] && node.style[s] !== 0 && node.style[s] !== 'false') {
					return false;
				}
			}
			/*jslint forin: false*/
		}

		return true;
	}

	// "A non-list single-line container is an HTML element with local name
	// "address", "div", "h1", "h2", "h3", "h4", "h5", "h6", "listing", "p", "pre",
	// or "xmp"."
	function isNonListSingleLineContainer(node) {
		return isHtmlElementInArray(node, ["address", "div", "h1", "h2", "h3", "h4", "h5", "h6", "listing", "p", "pre", "xmp"]);
	}

	// "A single-line container is either a non-list single-line container, or an
	// HTML element with local name "li", "dt", or "dd"."
	function isSingleLineContainer(node) {
		return isNonListSingleLineContainer(node) || isHtmlElementInArray(node, ["li", "dt", "dd"]);
	}

	// "The default single-line container name is "p"."
	var defaultSingleLineContainerName = "p";

	//@}
	///// Check whether the given element is an end break /////
	//@{
	function isEndBreak(element) {
		return (isNamedHtmlElement(element, 'br') && element.parentNode.lastChild === element);
	}

	//@}
	///// Create an end break /////
	//@{
	function createEndBreak() {
		return document.createElement("br");
	}

	/**
	 * Ensure the container is editable
	 * E.g. when called for an empty paragraph or header, and the browser is not IE,
	 * we need to append a br (marked with class aloha-end-br)
	 * For IE7, there is a special behaviour that will append zero-width whitespace
	 * @param {DOMNode} container
	 */
	function ensureContainerEditable(container) {
		if (!container) {
			return;
		}

		// Because it is useful to be able to completely empty the contents of
		// an editing host during editing.  So long as the container's
		// contenteditable attribute is "true" (as is the case during editing),
		// the element will be rendered visibly in all browsers.  This fact
		// allows us to not have to prop up the container with a <br> in order
		// to keep it accessible to the editor.
		if (isEditingHost(container)) {
			return;
		}

		if (isNamedHtmlElement(container.lastChild, "br")) {
			return;
		}

		if ($_(container.childNodes).some(isVisible)) {
			return;
		}

		if (!jQuery.browser.msie) {
			// for normal browsers, the end-br will do
			container.appendChild(createEndBreak());
		} else if (jQuery.browser.msie && jQuery.browser.version <= 7 && isHtmlElementInArray(container, ["p", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote"])) {
			// for IE7, we need to insert a text node containing a single zero-width whitespace character
			if (!container.firstChild) {
				container.appendChild(document.createTextNode('\u200b'));
			}
		}
	}

	//@}
	///// Assorted block formatting command algorithms /////
	//@{

	function fixDisallowedAncestors(node, range) {
		var i;

		// "If node is not editable, abort these steps."
		if (!isEditable(node)) {
			return;
		}

		// "If node is not an allowed child of any of its ancestors in the same
		// editing host, and is not an HTML element with local name equal to the
		// default single-line container name:"
		if ($_(getAncestors(node)).every(function (ancestor) { return !inSameEditingHost(node, ancestor) || !isAllowedChild(node, ancestor); })
			    && !isHtmlElement_obsolete(node, defaultSingleLineContainerName)) {
			// "If node is a dd or dt, wrap the one-node list consisting of node,
			// with sibling criteria returning true for any dl with no attributes
			// and false otherwise, and new parent instructions returning the
			// result of calling createElement("dl") on the context object. Then
			// abort these steps."
			if (isHtmlElementInArray(node, ["dd", "dt"])) {
				wrap(
					[node],
					function (sibling) {
						return isNamedHtmlElement(sibling, 'dl') && !sibling.attributes.length;
					},
					function () {
						return document.createElement("dl");
					},
					range
				);
				return;
			}

			// "If node is not a prohibited paragraph child, abort these steps."
			if (!isProhibitedParagraphChild(node)) {
				return;
			}

			// "Set the tag name of node to the default single-line container name,
			// and let node be the result."
			node = setTagName(node, defaultSingleLineContainerName, range);

			ensureContainerEditable(node);

			// "Fix disallowed ancestors of node."
			fixDisallowedAncestors(node, range);

			// "Let descendants be all descendants of node."
			var descendants = getDescendants(node);

			// "Fix disallowed ancestors of each member of descendants."
			for (i = 0; i < descendants.length; i++) {
				fixDisallowedAncestors(descendants[i], range);
			}

			// "Abort these steps."
			return;
		}

		// "Record the values of the one-node list consisting of node, and let
		// values be the result."
		var values = recordValues([node]);
		var newStartOffset, newEndOffset;

		// "While node is not an allowed child of its parent, split the parent of
		// the one-node list consisting of node."
		while (!isAllowedChild(node, node.parentNode)) {
			// If the parent contains only this node and possibly empty text nodes, we rather want to unwrap the node, instead of splitting.
			// With splitting, we would get empty nodes, like:
			// split: <p><p>foo</p></p> -> <p></p><p>foo</p> (bad)
			// unwrap: <p><p>foo</p></p> -> <p>foo</p> (good)

			// First remove empty text nodes that are children of the parent and correct the range if necessary
			// we do this to have the node being the only child of its parent, so that we can replace the parent with the node
			for (i = node.parentNode.childNodes.length - 1; i >= 0; --i) {
				if (node.parentNode.childNodes[i].nodeType == 3 && node.parentNode.childNodes[i].data.length == 0) {
					// we remove the empty text node
					node.parentNode.removeChild(node.parentNode.childNodes[i]);

					// if the range points to somewhere behind the removed text node, we reduce the offset
					if (range.startContainer == node.parentNode && range.startOffset > i) {
						range.startOffset--;
					}
					if (range.endContainer == node.parentNode && range.endOffset > i) {
						range.endOffset--;
					}
				}
			}

			// now that the parent has only the node as child (because we
			// removed any existing empty text nodes), we can safely unwrap the
			// node's contents, and correct the range if necessary
			if (node.parentNode.childNodes.length == 1) {
				newStartOffset = range.startOffset;
				newEndOffset = range.endOffset;

				if (range.startContainer === node.parentNode && range.startOffset > getNodeIndex(node)) {
					// the node (1 element) will be replaced by its contents (contents().length elements)
					newStartOffset = range.startOffset + (jQuery(node).contents().length - 1);
				}
				if (range.endContainer === node.parentNode && range.endOffset > getNodeIndex(node)) {
					// the node (1 element) will be replaced by its contents (contents().length elements)
					newEndOffset = range.endOffset + (jQuery(node).contents().length - 1);
				}
				jQuery(node).contents().unwrap();
				range.startOffset = newStartOffset;
				range.endOffset = newEndOffset;
				// after unwrapping, we are done
				break;
			} else {
				// store the original parent
				var originalParent = node.parentNode;
				splitParent([node], range);
				// check whether the parent did not change, so the split did not work, e.g.
				// because we already reached the editing host itself.
				// this situation can occur, e.g. when we insert a paragraph into an contenteditable span
				// in such cases, we just unwrap the contents of the paragraph
				if (originalParent === node.parentNode) {
					// so we unwrap now
					newStartOffset = range.startOffset;
					newEndOffset = range.endOffset;

					if (range.startContainer === node.parentNode && range.startOffset > getNodeIndex(node)) {
						// the node (1 element) will be replaced by its contents (contents().length elements)
						newStartOffset = range.startOffset + (jQuery(node).contents().length - 1);
					}
					if (range.endContainer === node.parentNode && range.endOffset > getNodeIndex(node)) {
						// the node (1 element) will be replaced by its contents (contents().length elements)
						newEndOffset = range.endOffset + (jQuery(node).contents().length - 1);
					}
					jQuery(node).contents().unwrap();
					range.startOffset = newStartOffset;
					range.endOffset = newEndOffset;
					// after unwrapping, we are done
					break;
				}
			}
		}

		// "Restore the values from values."
		restoreValues(values, range);
	}

	/**
	 * This method "normalizes" sublists of the given item (which is supposed to be a LI):
	 * If sublists are found in the LI element, they are moved directly into the outer list.
	 * @param item item
	 * @param range range, which will be modified if necessary
	 */
	function normalizeSublists(item, range) {
		// "If item is not an li or it is not editable or its parent is not
		// editable, abort these steps."
		if (!isNamedHtmlElement(item, 'LI') || !isEditable(item) || !isEditable(item.parentNode)) {
			return;
		}

		// "Let new item be null."
		var newItem = null;

		function isOlUl(node) {
			return isHtmlElementInArray(node, ["OL", "UL"]);
		}

		// "While item has an ol or ul child:"
		while ($_(item.childNodes).some(isOlUl)) {
			// "Let child be the last child of item."
			var child = item.lastChild;

			// "If child is an ol or ul, or new item is null and child is a Text
			// node whose data consists of zero of more space characters:"
			if (isHtmlElementInArray(child, ["OL", "UL"]) || (!newItem && child.nodeType == $_.Node.TEXT_NODE && /^[ \t\n\f\r]*$/.test(child.data))) {
				// "Set new item to null."
				newItem = null;

				// "Insert child into the parent of item immediately following
				// item, preserving ranges."
				movePreservingRanges(child, item.parentNode, 1 + getNodeIndex(item), range);

				// "Otherwise:"
			} else {
				// "If new item is null, let new item be the result of calling
				// createElement("li") on the ownerDocument of item, then insert
				// new item into the parent of item immediately after item."
				if (!newItem) {
					newItem = item.ownerDocument.createElement("li");
					item.parentNode.insertBefore(newItem, item.nextSibling);
				}

				// "Insert child into new item as its first child, preserving
				// ranges."
				movePreservingRanges(child, newItem, 0, range);
			}
		}
	}

	/**
	 * This method is the exact opposite of normalizeSublists.
	 * List nodes directly nested into each other are corrected to be nested in li elements (so that the resulting lists conform the html5 specification)
	 * @param item list node
	 * @param range range, which is preserved when modifying the list
	 */
	function unNormalizeSublists(item, range) {
		// "If item is not an ol or ol or it is not editable or its parent is not
		// editable, abort these steps."
		if (!isHtmlElementInArray(item, ["OL", "UL"]) || !isEditable(item)) {
			return;
		}

		var $list = jQuery(item);
		$list.children("ol,ul").each(function (index, sublist) {
			if (isNamedHtmlElement(sublist.previousSibling, "LI")) {
				// move the sublist into the LI
				movePreservingRanges(sublist, sublist.previousSibling, sublist.previousSibling.childNodes.length, range);
			}
		});
	}

	//@}
	///// Block-extending a range /////
	//@{

	function blockExtend(range) {
		// "Let start node, start offset, end node, and end offset be the start
		// and end nodes and offsets of the range."
		var startNode = range.startContainer;
		var startOffset = range.startOffset;
		var endNode = range.endContainer;
		var endOffset = range.endOffset;

		// "If some ancestor container of start node is an li, set start offset to
		// the index of the last such li in tree order, and set start node to that
		// li's parent."
		var liAncestors = $_(getAncestors(startNode).concat(startNode)).filter(function (ancestor) { return isNamedHtmlElement(ancestor, 'li'); }).slice(-1);
		if (liAncestors.length) {
			startOffset = getNodeIndex(liAncestors[0]);
			startNode = liAncestors[0].parentNode;
		}

		// "If (start node, start offset) is not a block start point, repeat the
		// following steps:"
		if (!isBlockStartPoint(startNode, startOffset)) {
			do {
				// "If start offset is zero, set it to start node's index, then set
				// start node to its parent."
				if (startOffset == 0) {
					startOffset = getNodeIndex(startNode);
					startNode = startNode.parentNode;

					// "Otherwise, subtract one from start offset."
				} else {
					startOffset--;
				}

				// "If (start node, start offset) is a block boundary point, break from
				// this loop."
			} while (!isBlockBoundaryPoint(startNode, startOffset));
		}

		// "While start offset is zero and start node's parent is not null, set
		// start offset to start node's index, then set start node to its parent."
		while (startOffset == 0 && startNode.parentNode) {
			startOffset = getNodeIndex(startNode);
			startNode = startNode.parentNode;
		}

		// "If some ancestor container of end node is an li, set end offset to one
		// plus the index of the last such li in tree order, and set end node to
		// that li's parent."
		liAncestors = $_(getAncestors(endNode).concat(endNode)).filter(function (ancestor) { return isNamedHtmlElement(ancestor, 'li'); }).slice(-1);
		if (liAncestors.length) {
			endOffset = 1 + getNodeIndex(liAncestors[0]);
			endNode = liAncestors[0].parentNode;
		}

		// "If (end node, end offset) is not a block end point, repeat the
		// following steps:"
		if (!isBlockEndPoint(endNode, endOffset)) {
			do {
				// "If end offset is end node's length, set it to one plus end node's
				// index, then set end node to its parent."
				if (endOffset == getNodeLength(endNode)) {
					endOffset = 1 + getNodeIndex(endNode);
					endNode = endNode.parentNode;

					// "Otherwise, add one to end offset.
				} else {
					endOffset++;
				}

				// "If (end node, end offset) is a block boundary point, break from
				// this loop."
			} while (!isBlockBoundaryPoint(endNode, endOffset));
		}

		// "While end offset is end node's length and end node's parent is not
		// null, set end offset to one plus end node's index, then set end node to
		// its parent."
		while (endOffset == getNodeLength(endNode) && endNode.parentNode) {
			endOffset = 1 + getNodeIndex(endNode);
			endNode = endNode.parentNode;
		}

		// "Let new range be a new range whose start and end nodes and offsets
		// are start node, start offset, end node, and end offset."
		var newRange = Aloha.createRange();
		newRange.setStart(startNode, startOffset);
		newRange.setEnd(endNode, endOffset);

		// "Return new range."
		return newRange;
	}

	function getSelectionListState() {
		// "Block-extend the active range, and let new range be the result."
		var newRange = blockExtend(getActiveRange());

		// "Let node list be a list of nodes, initially empty."
		//
		// "For each node contained in new range, append node to node list if the
		// last member of node list (if any) is not an ancestor of node; node is
		// editable; node is not an indentation element; and node is either an ol
		// or ul, or the child of an ol or ul, or an allowed child of "li"."
		var nodeList = getContainedNodes(newRange, function (node) {
			return isEditable(node) && !isIndentationElement(node) && (isHtmlElementInArray(node, ["ol", "ul"]) || isHtmlElementInArray(node.parentNode, ["ol", "ul"]) || isAllowedChild(node, "li"));
		});

		// "If node list is empty, return "none"."
		if (!nodeList.length) {
			return "none";
		}

		// "If every member of node list is either an ol or the child of an ol or
		// the child of an li child of an ol, and none is a ul or an ancestor of a
		// ul, return "ol"."
		if ($_(nodeList).every(function (node) { return (isNamedHtmlElement(node, 'ol')
														 || isNamedHtmlElement(node.parentNode, "ol")
														 || (isNamedHtmlElement(node.parentNode, "li")
															 && isNamedHtmlElement(node.parentNode.parentNode, "ol"))); })
			    && !$_(nodeList).some(function (node) { return isNamedHtmlElement(node, 'ul') || (node.querySelector && node.querySelector("ul")); })) {
			return "ol";
		}

		// "If every member of node list is either a ul or the child of a ul or the
		// child of an li child of a ul, and none is an ol or an ancestor of an ol,
		// return "ul"."
		if ($_(nodeList).every(function (node) { return (isNamedHtmlElement(node, 'ul')
														 || isNamedHtmlElement(node.parentNode, "ul")
														 || (isNamedHtmlElement(node.parentNode, "li")
															 && isNamedHtmlElement(node.parentNode.parentNode, "ul"))); })
			    && !$_(nodeList).some(function (node) { return isNamedHtmlElement(node, 'ol') || (node.querySelector && node.querySelector("ol")); })) {
			return "ul";
		}

		var hasOl = $_(nodeList).some(function (node) {
			return (isNamedHtmlElement(node, 'ol')
					|| isNamedHtmlElement(node.parentNode, "ol")
					|| (node.querySelector && node.querySelector("ol"))
					|| (isNamedHtmlElement(node.parentNode, "li")
						&& isNamedHtmlElement(node.parentNode.parentNode, "ol")));
		});
		var hasUl = $_(nodeList).some(function (node) {
			return (isNamedHtmlElement(node, 'ul')
					|| isNamedHtmlElement(node.parentNode, "ul")
					|| (node.querySelector && node.querySelector("ul"))
					|| (isNamedHtmlElement(node.parentNode, "li")
						&& isNamedHtmlElement(node.parentNode.parentNode, "ul")));
		});
		// "If some member of node list is either an ol or the child or ancestor of
		// an ol or the child of an li child of an ol, and some member of node list
		// is either a ul or the child or ancestor of a ul or the child of an li
		// child of a ul, return "mixed"."
		if (hasOl && hasUl) {
			return "mixed";
		}

		// "If some member of node list is either an ol or the child or ancestor of
		// an ol or the child of an li child of an ol, return "mixed ol"."
		if (hasOl) {
			return "mixed ol";
		}

		// "If some member of node list is either a ul or the child or ancestor of
		// a ul or the child of an li child of a ul, return "mixed ul"."
		if (hasUl) {
			return "mixed ul";
		}

		// "Return "none"."
		return "none";
	}

	function getAlignmentValue(node) {
		// "While node is neither null nor an Element, or it is an Element but its
		// "display" property has resolved value "inline" or "none", set node to
		// its parent."
		while ((node && node.nodeType != $_.Node.ELEMENT_NODE) || (node.nodeType == $_.Node.ELEMENT_NODE && jQuery.inArray($_.getComputedStyle(node).display, ["inline", "none"]) != -1)) {
			node = node.parentNode;
		}

		// "If node is not an Element, return "left"."
		if (!node || node.nodeType != $_.Node.ELEMENT_NODE) {
			return "left";
		}

		var resolvedValue = $_.getComputedStyle(node).textAlign
		// Hack around browser non-standardness
			.replace(/^-(moz|webkit)-/, "").replace(/^auto$/, "start");

		// "If node's "text-align" property has resolved value "start", return
		// "left" if the directionality of node is "ltr", "right" if it is "rtl"."
		if (resolvedValue == "start") {
			return getDirectionality(node) == "ltr" ? "left" : "right";
		}

		// "If node's "text-align" property has resolved value "end", return
		// "right" if the directionality of node is "ltr", "left" if it is "rtl"."
		if (resolvedValue == "end") {
			return getDirectionality(node) == "ltr" ? "right" : "left";
		}

		// "If node's "text-align" property has resolved value "center", "justify",
		// "left", or "right", return that value."
		if (jQuery.inArray(resolvedValue, ["center", "justify", "left", "right"]) != -1) {
			return resolvedValue;
		}

		// "Return "left"."
		return "left";
	}

	//@}
	///// Recording and restoring overrides /////
	//@{

	function recordCurrentOverrides(range) {
		// "Let overrides be a list of (string, string or boolean) ordered pairs,
		// initially empty."
		var overrides = [];

		// "If there is a value override for "createLink", add ("createLink", value
		// override for "createLink") to overrides."
		if (getValueOverride("createlink", range) !== undefined) {
			overrides.push(["createlink", getValueOverride("createlink", range)]);
		}

		// "For each command in the list "bold", "italic", "strikethrough",
		// "subscript", "superscript", "underline", in order: if there is a state
		// override for command, add (command, command's state override) to
		// overrides."
		$_(["bold", "italic", "strikethrough", "subscript", "superscript", "underline"]).forEach(function (command) {
			if (getStateOverride(command, range) !== undefined) {
				overrides.push([command, getStateOverride(command, range)]);
			}
		});

		// "For each command in the list "fontName", "fontSize", "foreColor",
		// "hiliteColor", in order: if there is a value override for command, add
		// (command, command's value override) to overrides."
		$_(["fontname", "fontsize", "forecolor", "hilitecolor"]).forEach(function (command) {
			if (getValueOverride(command, range) !== undefined) {
				overrides.push([command, getValueOverride(command, range)]);
			}
		});

		// "Return overrides."
		return overrides;
	}

	function recordCurrentStatesAndValues(range) {
		// "Let overrides be a list of (string, string or boolean) ordered pairs,
		// initially empty."
		var overrides = [];

		// "Let node be the first editable Text node effectively contained in the
		// active range, or null if there is none."
		var node = $_(getAllEffectivelyContainedNodes(range)).filter(function (node) {
			return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE;
		})[0];

		// "If node is null, return overrides."
		if (!node) {
			return overrides;
		}

		// "Add ("createLink", value for "createLink") to overrides."
		overrides.push(["createlink", commands.createlink.value(range)]);

		// "For each command in the list "bold", "italic", "strikethrough",
		// "subscript", "superscript", "underline", in order: if node's effective
		// command value for command is one of its inline command activated values,
		// add (command, true) to overrides, and otherwise add (command, false) to
		// overrides."
		$_(["bold", "italic", "strikethrough", "subscript", "superscript", "underline"]).forEach(function (command) {
			if ($_(commands[command].inlineCommandActivatedValues).indexOf(getEffectiveCommandValue(node, command)) != -1) {
				overrides.push([command, true]);
			} else {
				overrides.push([command, false]);
			}
		});

		// "For each command in the list "fontName", "foreColor", "hiliteColor", in
		// order: add (command, command's value) to overrides."

		$_(["fontname", "fontsize", "forecolor", "hilitecolor"]).forEach(function (command) {
			overrides.push([command, commands[command].value(range)]);
		});

		// "Add ("fontSize", node's effective command value for "fontSize") to
		// overrides."
		overrides.push(["fontsize", getEffectiveCommandValue(node, "fontsize")]);

		// "Return overrides."
		return overrides;
	}

	function restoreStatesAndValues(overrides, range) {
		var i;
		var command;
		var override;
		// "Let node be the first editable Text node effectively contained in the
		// active range, or null if there is none."
		var node = $_(getAllEffectivelyContainedNodes(range)).filter(function (node) {
			return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE;
		})[0];

		function isEditableTextNode(node) {
			return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE;
		}

		// "If node is not null, then for each (command, override) pair in
		// overrides, in order:"
		if (node) {

			for (i = 0; i < overrides.length; i++) {
				command = overrides[i][0];
				override = overrides[i][1];

				// "If override is a boolean, and queryCommandState(command)
				// returns something different from override, call
				// execCommand(command)."
				if (typeof override == "boolean" && myQueryCommandState(command, range) != override) {
					myExecCommand(command, false, override, range);

					// "Otherwise, if override is a string, and command is not
					// "fontSize", and queryCommandValue(command) returns something not
					// equivalent to override, call execCommand(command, false,
					// override)."
				} else if (typeof override == "string" && command != "fontsize" && !areEquivalentValues(command, myQueryCommandValue(command, range), override)) {
					myExecCommand(command, false, override, range);

					// "Otherwise, if override is a string; and command is "fontSize";
					// and either there is a value override for "fontSize" that is not
					// equal to override, or there is no value override for "fontSize"
					// and node's effective command value for "fontSize" is not loosely
					// equivalent to override: call execCommand("fontSize", false,
					// override)."
				} else if (typeof override == "string"
						   && command == "fontsize"
						   && ((getValueOverride("fontsize", range) !== undefined
								&& getValueOverride("fontsize", range) !== override)
							   || (getValueOverride("fontsize", range) === undefined
								   && !areLooselyEquivalentValues(command, getEffectiveCommandValue(node, "fontsize"), override)))) {
					myExecCommand("fontsize", false, override, range);

					// "Otherwise, continue this loop from the beginning."
				} else {
					continue;
				}

				// "Set node to the first editable Text node effectively contained
				// in the active range, if there is one."
				node = $_(getAllEffectivelyContainedNodes(range)).filter(isEditableTextNode)[0] || node;
			}

			// "Otherwise, for each (command, override) pair in overrides, in order:"
		} else {
			for (i = 0; i < overrides.length; i++) {
				command = overrides[i][0];
				override = overrides[i][1];

				// "If override is a boolean, set the state override for command to
				// override."
				if (typeof override == "boolean") {
					setStateOverride(command, override, range);
				}

				// "If override is a string, set the value override for command to
				// override."
				if (typeof override == "string") {
					setValueOverride(command, override, range);
				}
			}
		}
	}

	//@}
	///// Canonical space sequences /////
	//@{

	function canonicalSpaceSequence(n, nonBreakingStart, nonBreakingEnd) {
		// "If n is zero, return the empty string."
		if (n == 0) {
			return "";
		}

		// "If n is one and both non-breaking start and non-breaking end are false,
		// return a single space (U+0020)."
		if (n == 1 && !nonBreakingStart && !nonBreakingEnd) {
			return " ";
		}

		// "If n is one, return a single non-breaking space (U+00A0)."
		if (n == 1) {
			return "\xa0";
		}

		// "Let buffer be the empty string."
		var buffer = "";

		// "If non-breaking start is true, let repeated pair be U+00A0 U+0020.
		// Otherwise, let it be U+0020 U+00A0."
		var repeatedPair;
		if (nonBreakingStart) {
			repeatedPair = "\xa0 ";
		} else {
			repeatedPair = " \xa0";
		}

		// "While n is greater than three, append repeated pair to buffer and
		// subtract two from n."
		while (n > 3) {
			buffer += repeatedPair;
			n -= 2;
		}

		// "If n is three, append a three-element string to buffer depending on
		// non-breaking start and non-breaking end:"
		if (n == 3) {
			buffer += !nonBreakingStart && !nonBreakingEnd ? " \xa0 " : nonBreakingStart && !nonBreakingEnd ? "\xa0\xa0 " : !nonBreakingStart && nonBreakingEnd ? " \xa0\xa0" : nonBreakingStart && nonBreakingEnd ? "\xa0 \xa0" : "impossible";

			// "Otherwise, append a two-element string to buffer depending on
			// non-breaking start and non-breaking end:"
		} else {
			buffer += !nonBreakingStart && !nonBreakingEnd ? "\xa0 " : nonBreakingStart && !nonBreakingEnd ? "\xa0 " : !nonBreakingStart && nonBreakingEnd ? " \xa0" : nonBreakingStart && nonBreakingEnd ? "\xa0\xa0" : "impossible";
		}

		// "Return buffer."
		return buffer;
	}

	function canonicalizeWhitespace(node, offset) {
		// "If node is neither editable nor an editing host, abort these steps."
		if (!isEditable(node) && !isEditingHost(node)) {
			return;
		}

		// "Let start node equal node and let start offset equal offset."
		var startNode = node;
		var startOffset = offset;

		// "Repeat the following steps:"
		while (true) {
			// "If start node has a child in the same editing host with index start
			// offset minus one, set start node to that child, then set start
			// offset to start node's length."
			if (0 <= startOffset - 1 && inSameEditingHost(startNode, startNode.childNodes[startOffset - 1])) {
				startNode = startNode.childNodes[startOffset - 1];
				startOffset = getNodeLength(startNode);

				// "Otherwise, if start offset is zero and start node does not follow a
				// line break and start node's parent is in the same editing host, set
				// start offset to start node's index, then set start node to its
				// parent."
			} else if (startOffset == 0 && !followsLineBreak(startNode) && inSameEditingHost(startNode, startNode.parentNode)) {
				startOffset = getNodeIndex(startNode);
				startNode = startNode.parentNode;

				// "Otherwise, if start node is a Text node and its parent's resolved
				// value for "white-space" is neither "pre" nor "pre-wrap" and start
				// offset is not zero and the (start offset − 1)st element of start
				// node's data is a space (0x0020) or non-breaking space (0x00A0),
				// subtract one from start offset."
			} else if (startNode.nodeType == $_.Node.TEXT_NODE && jQuery.inArray($_.getComputedStyle(startNode.parentNode).whiteSpace, ["pre", "pre-wrap"]) == -1 && startOffset != 0 && /[ \xa0]/.test(startNode.data[startOffset - 1])) {
				startOffset--;

				// "Otherwise, break from this loop."
			} else {
				break;
			}
		}

		// "Let end node equal start node and end offset equal start offset."
		var endNode = startNode;
		var endOffset = startOffset;

		// "Let length equal zero."
		var length = 0;

		// "Let follows space be false."
		var followsSpace = false;

		// "Repeat the following steps:"
		while (true) {
			// "If end node has a child in the same editing host with index end
			// offset, set end node to that child, then set end offset to zero."
			if (endOffset < endNode.childNodes.length && inSameEditingHost(endNode, endNode.childNodes[endOffset])) {
				endNode = endNode.childNodes[endOffset];
				endOffset = 0;

				// "Otherwise, if end offset is end node's length and end node does not
				// precede a line break and end node's parent is in the same editing
				// host, set end offset to one plus end node's index, then set end node
				// to its parent."
			} else if (endOffset == getNodeLength(endNode) && !precedesLineBreak(endNode) && inSameEditingHost(endNode, endNode.parentNode)) {
				endOffset = 1 + getNodeIndex(endNode);
				endNode = endNode.parentNode;

				// "Otherwise, if end node is a Text node and its parent's resolved
				// value for "white-space" is neither "pre" nor "pre-wrap" and end
				// offset is not end node's length and the end offsetth element of
				// end node's data is a space (0x0020) or non-breaking space (0x00A0):"
			} else if (endNode.nodeType == $_.Node.TEXT_NODE && jQuery.inArray($_.getComputedStyle(endNode.parentNode).whiteSpace, ["pre", "pre-wrap"]) == -1 && endOffset != getNodeLength(endNode) && /[ \xa0]/.test(endNode.data[endOffset])) {
				// "If follows space is true and the end offsetth element of end
				// node's data is a space (0x0020), call deleteData(end offset, 1)
				// on end node, then continue this loop from the beginning."
				if (followsSpace && " " == endNode.data[endOffset]) {
					endNode.deleteData(endOffset, 1);
					continue;
				}

				// "Set follows space to true if the end offsetth element of end
				// node's data is a space (0x0020), false otherwise."
				followsSpace = " " == endNode.data[endOffset];

				// "Add one to end offset."
				endOffset++;

				// "Add one to length."
				length++;

				// "Otherwise, break from this loop."
			} else {
				break;
			}
		}

		// "Let replacement whitespace be the canonical space sequence of length
		// length. non-breaking start is true if start offset is zero and start
		// node follows a line break, and false otherwise. non-breaking end is true
		// if end offset is end node's length and end node precedes a line break,
		// and false otherwise."
		var replacementWhitespace = canonicalSpaceSequence(length, startOffset == 0 && followsLineBreak(startNode), endOffset == getNodeLength(endNode) && precedesLineBreak(endNode));

		// "While (start node, start offset) is before (end node, end offset):"
		while (getPosition(startNode, startOffset, endNode, endOffset) == "before") {
			// "If start node has a child with index start offset, set start node
			// to that child, then set start offset to zero."
			if (startOffset < startNode.childNodes.length) {
				startNode = startNode.childNodes[startOffset];
				startOffset = 0;

				// "Otherwise, if start node is not a Text node or if start offset is
				// start node's length, set start offset to one plus start node's
				// index, then set start node to its parent."
			} else if (startNode.nodeType != $_.Node.TEXT_NODE || startOffset == getNodeLength(startNode)) {
				startOffset = 1 + getNodeIndex(startNode);
				startNode = startNode.parentNode;

				// "Otherwise:"
			} else {
				// "Remove the first element from replacement whitespace, and let
				// element be that element."
				var element = replacementWhitespace[0];
				replacementWhitespace = replacementWhitespace.slice(1);

				// "If element is not the same as the start offsetth element of
				// start node's data:"
				if (element != startNode.data[startOffset]) {
					// "Call insertData(start offset, element) on start node."
					startNode.insertData(startOffset, element);

					// "Call deleteData(start offset + 1, 1) on start node."
					startNode.deleteData(startOffset + 1, 1);
				}

				// "Add one to start offset."
				startOffset++;
			}
		}
	}

	//@}
	///// Deleting the contents of a range /////
	//@{

	function deleteContents(arg1, arg2, arg3, arg4, arg5) {
		// We accept several different calling conventions:
		//
		// 1) A single argument, which is a range.
		//
		// 2) Two arguments, the first being a range and the second flags.
		//
		// 3) Four arguments, the start and end of a range.
		//
		// 4) Five arguments, the start and end of a range plus flags.
		//
		// The flags argument is a dictionary that can have up to two keys,
		// blockMerging and stripWrappers, whose corresponding values are
		// interpreted as boolean.  E.g., {stripWrappers: false}.
		var range;
		var flags = {};
		var i;

		if (arguments.length < 3) {
			range = arg1;
		} else {
			range = Aloha.createRange();
			range.setStart(arg1, arg2);
			range.setEnd(arg3, arg4);
		}
		if (arguments.length == 2) {
			flags = arg2;
		}
		if (arguments.length == 5) {
			flags = arg5;
		}

		var blockMerging = null != flags.blockMerging ? !!flags.blockMerging : true;
		var stripWrappers = null != flags.stripWrappers ? !!flags.stripWrappers : true;

		// "If range is null, abort these steps and do nothing."
		if (!range) {
			return;
		}

		// "Let start node, start offset, end node, and end offset be range's start
		// and end nodes and offsets."
		var startNode = range.startContainer;
		var startOffset = range.startOffset;
		var endNode = range.endContainer;
		var endOffset = range.endOffset;
		var referenceNode;

		// "While start node has at least one child:"
		while (startNode.hasChildNodes()) {
			// "If start offset is start node's length, and start node's parent is
			// in the same editing host, and start node is an inline node, set
			// start offset to one plus the index of start node, then set start
			// node to its parent and continue this loop from the beginning."
			if (startOffset == getNodeLength(startNode) && inSameEditingHost(startNode, startNode.parentNode) && isInlineNode(startNode)) {
				startOffset = 1 + getNodeIndex(startNode);
				startNode = startNode.parentNode;
				continue;
			}

			// "If start offset is start node's length, break from this loop."
			if (startOffset == getNodeLength(startNode)) {
				break;
			}

			// "Let reference node be the child of start node with index equal to
			// start offset."
			referenceNode = startNode.childNodes[startOffset];

			// "If reference node is a block node or an Element with no children,
			// or is neither an Element nor a Text node, break from this loop."
			if (isBlockNode(referenceNode) || (referenceNode.nodeType == $_.Node.ELEMENT_NODE && !referenceNode.hasChildNodes()) || (referenceNode.nodeType != $_.Node.ELEMENT_NODE && referenceNode.nodeType != $_.Node.TEXT_NODE)) {
				break;
			}

			// "Set start node to reference node and start offset to 0."
			startNode = referenceNode;
			startOffset = 0;
		}

		// "While end node has at least one child:"
		while (endNode.hasChildNodes()) {
			// "If end offset is 0, and end node's parent is in the same editing
			// host, and end node is an inline node, set end offset to the index of
			// end node, then set end node to its parent and continue this loop
			// from the beginning."
			if (endOffset == 0 && inSameEditingHost(endNode, endNode.parentNode) && isInlineNode(endNode)) {
				endOffset = getNodeIndex(endNode);
				endNode = endNode.parentNode;
				continue;
			}

			// "If end offset is 0, break from this loop."
			if (endOffset == 0) {
				break;
			}

			// "Let reference node be the child of end node with index equal to end
			// offset minus one."
			referenceNode = endNode.childNodes[endOffset - 1];

			// "If reference node is a block node or an Element with no children,
			// or is neither an Element nor a Text node, break from this loop."
			if (isBlockNode(referenceNode) || (referenceNode.nodeType == $_.Node.ELEMENT_NODE && !referenceNode.hasChildNodes()) || (referenceNode.nodeType != $_.Node.ELEMENT_NODE && referenceNode.nodeType != $_.Node.TEXT_NODE)) {
				break;
			}

			// "Set end node to reference node and end offset to the length of
			// reference node."
			endNode = referenceNode;
			endOffset = getNodeLength(referenceNode);
		}

		// "If (end node, end offset) is not after (start node, start offset), set
		// range's end to its start and abort these steps."
		if (getPosition(endNode, endOffset, startNode, startOffset) !== "after") {
			range.setEnd(range.startContainer, range.startOffset);
			return range;
		}

		// "If start node is a Text node and start offset is 0, set start offset to
		// the index of start node, then set start node to its parent."
		// Commented out for unknown reason
		//if (startNode.nodeType == $_.Node.TEXT_NODE && startOffset == 0 && startNode != endNode) {
		//		startOffset = getNodeIndex(startNode);
		//		startNode = startNode.parentNode;
		//}

		// "If end node is a Text node and end offset is its length, set end offset
		// to one plus the index of end node, then set end node to its parent."
		if (endNode.nodeType == $_.Node.TEXT_NODE && endOffset == getNodeLength(endNode) && startNode != endNode) {
			endOffset = 1 + getNodeIndex(endNode);
			endNode = endNode.parentNode;
		}

		// "Set range's start to (start node, start offset) and its end to (end
		// node, end offset)."
		range.setStart(startNode, startOffset);
		range.setEnd(endNode, endOffset);

		// "Let start block be the start node of range."
		var startBlock = range.startContainer;

		// "While start block's parent is in the same editing host and start block
		// is an inline node, set start block to its parent."
		while (inSameEditingHost(startBlock, startBlock.parentNode) && isInlineNode(startBlock)) {
			startBlock = startBlock.parentNode;
		}

		// "If start block is neither a block node nor an editing host, or "span"
		// is not an allowed child of start block, or start block is a td or th,
		// set start block to null."
		if ((!isBlockNode(startBlock) && !isEditingHost(startBlock)) || !isAllowedChild("span", startBlock) || isHtmlElementInArray(startBlock, ["td", "th"])) {
			startBlock = null;
		}

		// "Let end block be the end node of range."
		var endBlock = range.endContainer;

		// "While end block's parent is in the same editing host and end block is
		// an inline node, set end block to its parent."
		while (inSameEditingHost(endBlock, endBlock.parentNode) && isInlineNode(endBlock)) {
			endBlock = endBlock.parentNode;
		}

		// "If end block is neither a block node nor an editing host, or "span" is
		// not an allowed child of end block, or end block is a td or th, set end
		// block to null."
		if ((!isBlockNode(endBlock) && !isEditingHost(endBlock)) || !isAllowedChild("span", endBlock) || isHtmlElementInArray(endBlock, ["td", "th"])) {
			endBlock = null;
		}

		// "Record current states and values, and let overrides be the result."
		var overrides = recordCurrentStatesAndValues(range);
		var parent_;
		// "If start node and end node are the same, and start node is an editable
		// Text node:"
		if (startNode == endNode && isEditable(startNode) && startNode.nodeType == $_.Node.TEXT_NODE) {
			// "Let parent be the parent of node."
			parent_ = startNode.parentNode;

			// "Call deleteData(start offset, end offset − start offset) on start
			// node."
			startNode.deleteData(startOffset, endOffset - startOffset);

			// if deleting the text moved two spaces together, we replace the left one by a &nbsp;, which makes the two spaces a visible
			// two space sequence
			if (startOffset > 0 && startNode.data.substr(startOffset - 1, 1) === ' ' && startOffset < startNode.data.length && startNode.data.substr(startOffset, 1) === ' ') {
				startNode.replaceData(startOffset - 1, 1, '\xa0');
			}

			// "Canonicalize whitespace at (start node, start offset)."
			canonicalizeWhitespace(startNode, startOffset);

			// "Set range's end to its start."
			// Ok, also set the range's start to its start, because modifying the text
			// might have somehow corrupted the range
			range.setStart(range.startContainer, range.startOffset);
			range.setEnd(range.startContainer, range.startOffset);

			// "Restore states and values from overrides."
			restoreStatesAndValues(overrides, range);

			// "If parent is editable or an editing host, is not an inline node,
			// and has no children, call createElement("br") on the context object
			// and append the result as the last child of parent."
			// only do this, if the offsetHeight is 0
			if ((isEditable(parent_) || isEditingHost(parent_)) && !isInlineNode(parent_)) {
				ensureContainerEditable(parent_);
			}

			// "Abort these steps."
			return range;
		}

		// "If start node is an editable Text node, call deleteData() on it, with
		// start offset as the first argument and (length of start node − start
		// offset) as the second argument."
		if (isEditable(startNode) && startNode.nodeType == $_.Node.TEXT_NODE) {
			startNode.deleteData(startOffset, getNodeLength(startNode) - startOffset);
		}

		// "Let node list be a list of nodes, initially empty."
		//
		// "For each node contained in range, append node to node list if the last
		// member of node list (if any) is not an ancestor of node; node is
		// editable; and node is not a thead, tbody, tfoot, tr, th, or td."
		var nodeList = getContainedNodes(
			range,
			function (node) {
				return isEditable(node) && !isHtmlElementInArray(node, ["thead", "tbody", "tfoot", "tr", "th", "td"]);
			}
		);

		// "For each node in node list:"
		for (i = 0; i < nodeList.length; i++) {
			var node = nodeList[i];

			// "Let parent be the parent of node."
			parent_ = node.parentNode;

			// "Remove node from parent."
			parent_.removeChild(node);

			// "If strip wrappers is true or parent is not an ancestor container of
			// start node, while parent is an editable inline node with length 0,
			// let grandparent be the parent of parent, then remove parent from
			// grandparent, then set parent to grandparent."
			if (stripWrappers || (!isAncestor(parent_, startNode) && parent_ != startNode)) {
				while (isEditable(parent_) && isInlineNode(parent_) && getNodeLength(parent_) == 0) {
					var grandparent = parent_.parentNode;
					grandparent.removeChild(parent_);
					parent_ = grandparent;
				}
			}

			// "If parent is editable or an editing host, is not an inline node,
			// and has no children, call createElement("br") on the context object
			// and append the result as the last child of parent."
			// only do this, if the offsetHeight is 0
			if ((isEditable(parent_) || isEditingHost(parent_)) && !isInlineNode(parent_)) {
				ensureContainerEditable(parent_);
			}
		}

		// "If end node is an editable Text node, call deleteData(0, end offset) on
		// it."
		if (isEditable(endNode) && endNode.nodeType == $_.Node.TEXT_NODE) {
			endNode.deleteData(0, endOffset);
		}

		// "Canonicalize whitespace at range's start."
		canonicalizeWhitespace(range.startContainer, range.startOffset);

		// "Canonicalize whitespace at range's end."
		canonicalizeWhitespace(range.endContainer, range.endOffset);

		// A reference to the position where a node is removed.
		var pos;

		// "If block merging is false, or start block or end block is null, or
		// start block is not in the same editing host as end block, or start block
		// and end block are the same:"
		if (!blockMerging || !startBlock || !endBlock || !inSameEditingHost(startBlock, endBlock) || startBlock == endBlock) {
			// "Set range's end to its start."
			range.setEnd(range.startContainer, range.startOffset);

			// Calling delete on the give markup:
			// <editable><block><br>[]</block></editable>
			// should result in:
			// <editable>[]</editable>
			var block = startBlock || endBlock;
			if (isEmptyOnlyChildOfEditingHost(block)) {
				pos = removeNode(block);
				range.setStart(pos.node, pos.offset);
				range.setEnd(pos.node, pos.offset);
			}

			// "Restore states and values from overrides."
			restoreStatesAndValues(overrides, range);

			// "Abort these steps."
			return range;
		}

		// "If start block has one child, which is a collapsed block prop, remove
		// its child from it."
		if (startBlock.children.length == 1 && isCollapsedBlockProp(startBlock.firstChild)) {
			startBlock.removeChild(startBlock.firstChild);
		}

		// "If end block has one child, which is a collapsed block prop, remove its
		// child from it."
		if (endBlock.children.length == 1 && isCollapsedBlockProp(endBlock.firstChild)) {
			endBlock.removeChild(endBlock.firstChild);
		}

		var values;
		// "If start block is an ancestor of end block:"
		if (isAncestor(startBlock, endBlock)) {
			// "Let reference node be end block."
			referenceNode = endBlock;

			// "While reference node is not a child of start block, set reference
			// node to its parent."
			while (referenceNode.parentNode != startBlock) {
				referenceNode = referenceNode.parentNode;
			}

			// "Set the start and end of range to (start block, index of reference
			// node)."
			range.setStart(startBlock, getNodeIndex(referenceNode));
			range.setEnd(startBlock, getNodeIndex(referenceNode));

			// "If end block has no children:"
			if (!endBlock.hasChildNodes()) {
				// "While end block is editable and is the only child of its parent
				// and is not a child of start block, let parent equal end block,
				// then remove end block from parent, then set end block to
				// parent."
				while (isEditable(endBlock) && endBlock.parentNode.childNodes.length == 1 && endBlock.parentNode != startBlock) {
					parent_ = endBlock;
					parent_.removeChild(endBlock);
					endBlock = parent_;
				}

				// "If end block is editable and is not an inline node, and its
				// previousSibling and nextSibling are both inline nodes, call
				// createElement("br") on the context object and insert it into end
				// block's parent immediately after end block."

				if (isEditable(endBlock) && !isInlineNode(endBlock) && isInlineNode(endBlock.previousSibling) && isInlineNode(endBlock.nextSibling)) {
					endBlock.parentNode.insertBefore(document.createElement("br"), endBlock.nextSibling);
				}

				// "If end block is editable, remove it from its parent."
				if (isEditable(endBlock)) {
					endBlock.parentNode.removeChild(endBlock);
				}

				// "Restore states and values from overrides."
				restoreStatesAndValues(overrides, range);

				// "Abort these steps."
				return range;
			}

			// "If end block's firstChild is not an inline node, restore states and
			// values from overrides, then abort these steps."
			if (!isInlineNode(endBlock.firstChild)) {
				restoreStatesAndValues(overrides, range);
				return range;
			}

			// "Let children be a list of nodes, initially empty."
			var children = [];

			// "Append the first child of end block to children."
			children.push(endBlock.firstChild);

			// "While children's last member is not a br, and children's last
			// member's nextSibling is an inline node, append children's last
			// member's nextSibling to children."
			while (!isNamedHtmlElement(children[children.length - 1], "br") && isInlineNode(children[children.length - 1].nextSibling)) {
				children.push(children[children.length - 1].nextSibling);
			}

			// "Record the values of children, and let values be the result."
			values = recordValues(children);

			// "While children's first member's parent is not start block, split
			// the parent of children."
			while (children[0].parentNode != startBlock) {
				splitParent(children, range);
			}

			// "If children's first member's previousSibling is an editable br,
			// remove that br from its parent."
			if (isEditable(children[0].previousSibling) && isNamedHtmlElement(children[0].previousSibling, "br")) {
				children[0].parentNode.removeChild(children[0].previousSibling);
			}

			// "Otherwise, if start block is a descendant of end block:"
		} else if (isDescendant(startBlock, endBlock)) {
			// "Set the start and end of range to (start block, length of start
			// block)."
			range.setStart(startBlock, getNodeLength(startBlock));
			range.setEnd(startBlock, getNodeLength(startBlock));

			// "Let reference node be start block."
			referenceNode = startBlock;

			// "While reference node is not a child of end block, set reference
			// node to its parent."
			while (referenceNode.parentNode != endBlock) {
				referenceNode = referenceNode.parentNode;
			}

			// "If reference node's nextSibling is an inline node and start block's
			// lastChild is a br, remove start block's lastChild from it."
			if (isInlineNode(referenceNode.nextSibling) && isNamedHtmlElement(startBlock.lastChild, "br")) {
				startBlock.removeChild(startBlock.lastChild);
			}

			// "Let nodes to move be a list of nodes, initially empty."
			var nodesToMove = [];

			// "If reference node's nextSibling is neither null nor a br nor a
			// block node, append it to nodes to move."
			if (referenceNode.nextSibling && !isNamedHtmlElement(referenceNode.nextSibling, "br") && !isBlockNode(referenceNode.nextSibling)) {
				nodesToMove.push(referenceNode.nextSibling);
			}

			// "While nodes to move is nonempty and its last member's nextSibling
			// is neither null nor a br nor a block node, append it to nodes to
			// move."
			if (nodesToMove.length && nodesToMove[nodesToMove.length - 1].nextSibling && !isNamedHtmlElement(nodesToMove[nodesToMove.length - 1].nextSibling, "br") && !isBlockNode(nodesToMove[nodesToMove.length - 1].nextSibling)) {
				nodesToMove.push(nodesToMove[nodesToMove.length - 1].nextSibling);
			}

			// "Record the values of nodes to move, and let values be the result."
			values = recordValues(nodesToMove);

			// "For each node in nodes to move, append node as the last child of
			// start block, preserving ranges."
			$_(nodesToMove).forEach(function (node) {
				movePreservingRanges(node, startBlock, -1, range);
			});

			// "If the nextSibling of reference node is a br, remove it from its
			// parent."
			if (isNamedHtmlElement(referenceNode.nextSibling, "br")) {
				referenceNode.parentNode.removeChild(referenceNode.nextSibling);
			}

			// "Otherwise:"
		} else {
			// "Set the start and end of range to (start block, length of start
			// block)."
			range.setStart(startBlock, getNodeLength(startBlock));
			range.setEnd(startBlock, getNodeLength(startBlock));

			// "If end block's firstChild is an inline node and start block's
			// lastChild is a br, remove start block's lastChild from it."
			if (isInlineNode(endBlock.firstChild) && isNamedHtmlElement(startBlock.lastChild, "br")) {
				startBlock.removeChild(startBlock.lastChild);
			}

			// "Record the values of end block's children, and let values be the
			// result."
			values = recordValues([].slice.call(toArray(endBlock.childNodes)));

			// "While end block has children, append the first child of end block
			// to start block, preserving ranges."
			while (endBlock.hasChildNodes()) {
				movePreservingRanges(endBlock.firstChild, startBlock, -1, range);
			}

			// "While end block has no children, let parent be the parent of end
			// block, then remove end block from parent, then set end block to
			// parent."
			while (!endBlock.hasChildNodes()) {
				parent_ = endBlock.parentNode;
				parent_.removeChild(endBlock);
				endBlock = parent_;
			}
		}

		// "Restore the values from values."
		restoreValues(values, range);

		// Because otherwise calling deleteContents() with the given selection:
		//
		// <editable><block>[foo</block><block>bar]</block></editable>
		//
		// would result in:
		//
		// <editable><block>[]<br /></block></editable>
		//
		// instead of:
		//
		// <editable>[]</editable>
		//
		// Therefore, the below makes it possible to completely empty contents
		// of editing hosts via operations like CTRL+A, DEL.
		//
		// If startBlock is empty, and startBlock is the immediate and only
		// child of its parent editing host, then remove startBlock and collapse
		// the selection at the beginning of the editing post.
		if (isEmptyOnlyChildOfEditingHost(startBlock)) {
			pos = removeNode(startBlock);
			range.setStart(pos.node, pos.offset);
			range.setEnd(pos.node, pos.offset);
			startBlock = pos.node;
		}

		// "If start block has no children, call createElement("br") on the context
		// object and append the result as the last child of start block."
		ensureContainerEditable(startBlock);

		// "Restore states and values from overrides."
		restoreStatesAndValues(overrides, range);

		return range;
	}

	// "To remove a node node while preserving its descendants, split the parent of
	// node's children if it has any. If it has no children, instead remove it from
	// its parent."
	function removePreservingDescendants(node, range) {
		if (node.hasChildNodes()) {
			splitParent([].slice.call(toArray(node.childNodes)), range);
		} else {
			node.parentNode.removeChild(node);
		}
	}

	//@}
	///// Indenting and outdenting /////
	//@{

	function cleanLists(node, range) {
		// remove any whitespace nodes around list nodes
		if (node) {
			jQuery(node).find('ul,ol,li').each(function () {
				jQuery(this).contents().each(function () {
					if (isWhitespaceNode(this)) {
						var index = getNodeIndex(this);

						// if the range points to somewhere behind the removed text node, we reduce the offset
						if (range.startContainer === this.parentNode && range.startOffset > index) {
							range.startOffset--;
						} else if (range.startContainer === this) {
							// the range starts in the removed text node, let it start right before
							range.startContainer = this.parentNode;
							range.startOffset = index;
						}
						// same thing for end of the range
						if (range.endContainer === this.parentNode && range.endOffset > index) {
							range.endOffset--;
						} else if (range.endContainer === this) {
							range.endContainer = this.parentNode;
							range.endOffset = index;
						}
						// finally remove the whitespace node
						jQuery(this).remove();
					}
				});
			});
		}
	}


	//@}
	///// Indenting and outdenting /////
	//@{

	function indentNodes(nodeList, range) {
		// "If node list is empty, do nothing and abort these steps."
		if (!nodeList.length) {
			return;
		}

		// "Let first node be the first member of node list."
		var firstNode = nodeList[0];

		// "If first node's parent is an ol or ul:"
		if (isHtmlElementInArray(firstNode.parentNode, ["OL", "UL"])) {
			// "Let tag be the local name of the parent of first node."
			var tag = firstNode.parentNode.tagName;

			// "Wrap node list, with sibling criteria returning true for an HTML
			// element with local name tag and false otherwise, and new parent
			// instructions returning the result of calling createElement(tag) on
			// the ownerDocument of first node."
			wrap(
				nodeList,
				function (node) {
					return isHtmlElement_obsolete(node, tag);
				},
				function () {
					return firstNode.ownerDocument.createElement(tag);
				},
				range
			);

			// "Abort these steps."
			return;
		}

		// "Wrap node list, with sibling criteria returning true for a simple
		// indentation element and false otherwise, and new parent instructions
		// returning the result of calling createElement("blockquote") on the
		// ownerDocument of first node. Let new parent be the result."
		var newParent = wrap(
			nodeList,
			function (node) {
				return isSimpleIndentationElement(node);
			},
			function () {
				return firstNode.ownerDocument.createElement("blockquote");
			},
			range
		);

		// "Fix disallowed ancestors of new parent."
		fixDisallowedAncestors(newParent, range);
	}

	function outdentNode(node, range) {
		// "If node is not editable, abort these steps."
		if (!isEditable(node)) {
			return;
		}

		// "If node is a simple indentation element, remove node, preserving its
		// descendants.  Then abort these steps."
		if (isSimpleIndentationElement(node)) {
			removePreservingDescendants(node, range);
			return;
		}

		// "If node is an indentation element:"
		if (isIndentationElement(node)) {
			// "Unset the class and dir attributes of node, if any."
			node.removeAttribute("class");
			node.removeAttribute("dir");

			// "Unset the margin, padding, and border CSS properties of node."
			node.style.margin = "";
			node.style.padding = "";
			node.style.border = "";
			if (node.getAttribute("style") == "") {
				node.removeAttribute("style");
			}

			// "Set the tag name of node to "div"."
			setTagName(node, "div", range);

			// "Abort these steps."
			return;
		}

		// "Let current ancestor be node's parent."
		var currentAncestor = node.parentNode;

		// "Let ancestor list be a list of nodes, initially empty."
		var ancestorList = [];

		// "While current ancestor is an editable Element that is neither a simple
		// indentation element nor an ol nor a ul, append current ancestor to
		// ancestor list and then set current ancestor to its parent."
		while (isEditable(currentAncestor) && currentAncestor.nodeType == $_.Node.ELEMENT_NODE && !isSimpleIndentationElement(currentAncestor) && !isHtmlElementInArray(currentAncestor, ["ol", "ul"])) {
			ancestorList.push(currentAncestor);
			currentAncestor = currentAncestor.parentNode;
		}

		// "If current ancestor is not an editable simple indentation element:"
		if (!isEditable(currentAncestor) || !isSimpleIndentationElement(currentAncestor)) {
			// "Let current ancestor be node's parent."
			currentAncestor = node.parentNode;

			// "Let ancestor list be the empty list."
			ancestorList = [];

			// "While current ancestor is an editable Element that is neither an
			// indentation element nor an ol nor a ul, append current ancestor to
			// ancestor list and then set current ancestor to its parent."
			while (isEditable(currentAncestor) && currentAncestor.nodeType == $_.Node.ELEMENT_NODE && !isIndentationElement(currentAncestor) && !isHtmlElementInArray(currentAncestor, ["ol", "ul"])) {
				ancestorList.push(currentAncestor);
				currentAncestor = currentAncestor.parentNode;
			}
		}

		// "If node is an ol or ul and current ancestor is not an editable
		// indentation element:"
		if (isHtmlElementInArray(node, ["OL", "UL"]) && (!isEditable(currentAncestor) || !isIndentationElement(currentAncestor))) {
			// "Unset the reversed, start, and type attributes of node, if any are
			// set."
			node.removeAttribute("reversed");
			node.removeAttribute("start");
			node.removeAttribute("type");

			// "Let children be the children of node."
			var children = [].slice.call(toArray(node.childNodes));

			// "If node has attributes, and its parent is not an ol or ul, set the
			// tag name of node to "div"."
			if (node.attributes.length && !isHtmlElementInArray(node.parentNode, ["OL", "UL"])) {
				setTagName(node, "div", range);

				// "Otherwise:"
			} else {
				// "Record the values of node's children, and let values be the
				// result."
				var values = recordValues([].slice.call(toArray(node.childNodes)));

				// "Remove node, preserving its descendants."
				removePreservingDescendants(node, range);

				// "Restore the values from values."
				restoreValues(values, range);
			}

			// "Fix disallowed ancestors of each member of children."
			var i;
			for (i = 0; i < children.length; i++) {
				fixDisallowedAncestors(children[i], range);
			}

			// "Abort these steps."
			return;
		}

		// "If current ancestor is not an editable indentation element, abort these
		// steps."
		if (!isEditable(currentAncestor) || !isIndentationElement(currentAncestor)) {
			return;
		}

		// "Append current ancestor to ancestor list."
		ancestorList.push(currentAncestor);

		// "Let original ancestor be current ancestor."
		var originalAncestor = currentAncestor;

		// "While ancestor list is not empty:"
		while (ancestorList.length) {
			// "Let current ancestor be the last member of ancestor list."
			//
			// "Remove the last member of ancestor list."
			currentAncestor = ancestorList.pop();

			// "Let target be the child of current ancestor that is equal to either
			// node or the last member of ancestor list."
			var target = node.parentNode == currentAncestor ? node : ancestorList[ancestorList.length - 1];

			// "If target is an inline node that is not a br, and its nextSibling
			// is a br, remove target's nextSibling from its parent."
			if (isInlineNode(target) && !isNamedHtmlElement(target, 'BR') && isNamedHtmlElement(target.nextSibling, "BR")) {
				target.parentNode.removeChild(target.nextSibling);
			}

			// "Let preceding siblings be the preceding siblings of target, and let
			// following siblings be the following siblings of target."
			var precedingSiblings = [].slice.call(toArray(currentAncestor.childNodes), 0, getNodeIndex(target));
			var followingSiblings = [].slice.call(toArray(currentAncestor.childNodes), 1 + getNodeIndex(target));

			// "Indent preceding siblings."
			indentNodes(precedingSiblings, range);

			// "Indent following siblings."
			indentNodes(followingSiblings, range);
		}

		// "Outdent original ancestor."
		outdentNode(originalAncestor, range);
	}


	//@}
	///// Toggling lists /////
	//@{

	function toggleLists(tagName, range) {
		// "Let mode be "disable" if the selection's list state is tag name, and
		// "enable" otherwise."
		var mode = getSelectionListState() == tagName ? "disable" : "enable";

		tagName = tagName.toUpperCase();

		// "Let other tag name be "ol" if tag name is "ul", and "ul" if tag name is
		// "ol"."
		var otherTagName = tagName == "OL" ? "UL" : "OL";

		// "Let items be a list of all lis that are ancestor containers of the
		// range's start and/or end node."
		//
		// It's annoying to get this in tree order using functional stuff without
		// doing getDescendants(document), which is slow, so I do it imperatively.
		var items = [];
		(function () {
			var ancestorContainer;
			for (ancestorContainer = range.endContainer;
				     ancestorContainer != range.commonAncestorContainer;
				     ancestorContainer = ancestorContainer.parentNode) {
				if (isNamedHtmlElement(ancestorContainer, "li")) {
					items.unshift(ancestorContainer);
				}
			}
			for (ancestorContainer = range.startContainer;
				     ancestorContainer;
				     ancestorContainer = ancestorContainer.parentNode) {
				if (isNamedHtmlElement(ancestorContainer, "li")) {
					items.unshift(ancestorContainer);
				}
			}
		}());

		// "For each item in items, normalize sublists of item."
		$_(items).forEach(function (thisArg) {
			normalizeSublists(thisArg, range);
		});

		// "Block-extend the range, and let new range be the result."
		var newRange = blockExtend(range);

		// "If mode is "enable", then let lists to convert consist of every
		// editable HTML element with local name other tag name that is contained
		// in new range, and for every list in lists to convert:"
		if (mode == "enable") {
			$_(getAllContainedNodes(newRange, function (node) {
				return isEditable(node) && isHtmlElement_obsolete(node, otherTagName);
			})).forEach(function (list) {
				// "If list's previousSibling or nextSibling is an editable HTML
				// element with local name tag name:"
				if ((isEditable(list.previousSibling) && isHtmlElement_obsolete(list.previousSibling, tagName)) || (isEditable(list.nextSibling) && isHtmlElement_obsolete(list.nextSibling, tagName))) {
					// "Let children be list's children."
					var children = [].slice.call(toArray(list.childNodes));

					// "Record the values of children, and let values be the
					// result."
					var values = recordValues(children);

					// "Split the parent of children."
					splitParent(children, range);

					// "Wrap children, with sibling criteria returning true for an
					// HTML element with local name tag name and false otherwise."
					wrap(
						children,
						function (node) {
							return isHtmlElement_obsolete(node, tagName);
						},
						function () {
							return null;
						},
						range
					);

					// "Restore the values from values."
					restoreValues(values, range);

					// "Otherwise, set the tag name of list to tag name."
				} else {
					setTagName(list, tagName, range);
				}
			});
		}

		// "Let node list be a list of nodes, initially empty."
		//
		// "For each node node contained in new range, if node is editable; the
		// last member of node list (if any) is not an ancestor of node; node
		// is not an indentation element; and either node is an ol or ul, or its
		// parent is an ol or ul, or it is an allowed child of "li"; then append
		// node to node list."
		var nodeList = getContainedNodes(newRange, function (node) {
			return isEditable(node) && !isIndentationElement(node) && (isHtmlElementInArray(node, ["OL", "UL"]) || isHtmlElementInArray(node.parentNode, ["OL", "UL"]) || isAllowedChild(node, "li"));
		});

		// "If mode is "enable", remove from node list any ol or ul whose parent is
		// not also an ol or ul."
		if (mode == "enable") {
			nodeList = $_(nodeList).filter(function (node) {
				return !isHtmlElementInArray(node, ["ol", "ul"]) || isHtmlElementInArray(node.parentNode, ["ol", "ul"]);
			});
		}

		// "If mode is "disable", then while node list is not empty:"
		var sublist, values;

		function createLi() {
			return document.createElement("li");
		}

		function isOlUl(node) {
			return isHtmlElementInArray(node, ["ol", "ul"]);
		}

		function makeIsElementPred(tagName) {
			return function (node) {
				return isHtmlElement_obsolete(node, tagName);
			};
		}

		function makeCreateElement(tagName) {
			return function () {
				return document.createElement(tagName);
			};
		}

		function makeCreateElementSublist(tagName, sublist, range) {
			return function () {
				// "If sublist's first member's parent is not an editable
				// simple indentation element, or sublist's first member's
				// parent's previousSibling is not an editable HTML element
				// with local name tag name, call createElement(tag name)
				// on the context object and return the result."
				if (!isEditable(sublist[0].parentNode) || !isSimpleIndentationElement(sublist[0].parentNode) || !isEditable(sublist[0].parentNode.previousSibling) || !isHtmlElement_obsolete(sublist[0].parentNode.previousSibling, tagName)) {
					return document.createElement(tagName);
				}

				// "Let list be sublist's first member's parent's
				// previousSibling."
				var list = sublist[0].parentNode.previousSibling;

				// "Normalize sublists of list's lastChild."
				normalizeSublists(list.lastChild, range);

				// "If list's lastChild is not an editable HTML element
				// with local name tag name, call createElement(tag name)
				// on the context object, and append the result as the last
				// child of list."
				if (!isEditable(list.lastChild) || !isHtmlElement_obsolete(list.lastChild, tagName)) {
					list.appendChild(document.createElement(tagName));
				}

				// "Return the last child of list."
				return list.lastChild;
			};
		}

		if (mode == "disable") {
			while (nodeList.length) {
				// "Let sublist be an empty list of nodes."
				sublist = [];

				// "Remove the first member from node list and append it to
				// sublist."
				sublist.push(nodeList.shift());

				// "If the first member of sublist is an HTML element with local
				// name tag name, outdent it and continue this loop from the
				// beginning."
				if (isHtmlElement_obsolete(sublist[0], tagName)) {
					outdentNode(sublist[0], range);
					continue;
				}

				// "While node list is not empty, and the first member of node list
				// is the nextSibling of the last member of sublist and is not an
				// HTML element with local name tag name, remove the first member
				// from node list and append it to sublist."
				while (nodeList.length && nodeList[0] == sublist[sublist.length - 1].nextSibling && !isHtmlElement_obsolete(nodeList[0], tagName)) {
					sublist.push(nodeList.shift());
				}

				// "Record the values of sublist, and let values be the result."
				values = recordValues(sublist);

				// "Split the parent of sublist."
				splitParent(sublist, range);

				// "Fix disallowed ancestors of each member of sublist."
				var i;
				for (i = 0; i < sublist.length; i++) {
					fixDisallowedAncestors(sublist[i], range);
				}

				// "Restore the values from values."
				restoreValues(values, range);
			}

			// "Otherwise, while node list is not empty:"
		} else {
			while (nodeList.length) {
				// "Let sublist be an empty list of nodes."
				sublist = [];

				// "While either sublist is empty, or node list is not empty and
				// its first member is the nextSibling of sublist's last member:"
				while (!sublist.length || (nodeList.length && nodeList[0] == sublist[sublist.length - 1].nextSibling)) {
					// "If node list's first member is a p or div, set the tag name
					// of node list's first member to "li", and append the result
					// to sublist. Remove the first member from node list."
					if (isHtmlElementInArray(nodeList[0], ["p", "div"])) {
						sublist.push(setTagName(nodeList[0], "li", range));
						nodeList.shift();

						// "Otherwise, if the first member of node list is an li or ol
						// or ul, remove it from node list and append it to sublist."
					} else if (isHtmlElementInArray(nodeList[0], ["li", "ol", "ul"])) {
						sublist.push(nodeList.shift());

						// "Otherwise:"
					} else {
						// "Let nodes to wrap be a list of nodes, initially empty."
						var nodesToWrap = [];

						// "While nodes to wrap is empty, or node list is not empty
						// and its first member is the nextSibling of nodes to
						// wrap's last member and the first member of node list is
						// an inline node and the last member of nodes to wrap is
						// an inline node other than a br, remove the first member
						// from node list and append it to nodes to wrap."
						while (!nodesToWrap.length || (nodeList.length && nodeList[0] == nodesToWrap[nodesToWrap.length - 1].nextSibling && isInlineNode(nodeList[0]) && isInlineNode(nodesToWrap[nodesToWrap.length - 1]) && !isNamedHtmlElement(nodesToWrap[nodesToWrap.length - 1], "br"))) {
							nodesToWrap.push(nodeList.shift());
						}

						// "Wrap nodes to wrap, with new parent instructions
						// returning the result of calling createElement("li") on
						// the context object. Append the result to sublist."
						sublist.push(wrap(
							nodesToWrap,
							undefined,
							createLi,
							range
						));
					}
				}

				// "If sublist's first member's parent is an HTML element with
				// local name tag name, or if every member of sublist is an ol or
				// ul, continue this loop from the beginning."
				if (isHtmlElement_obsolete(sublist[0].parentNode, tagName) || $_(sublist).every(isOlUl)) {
					continue;
				}

				// "If sublist's first member's parent is an HTML element with
				// local name other tag name:"
				if (isHtmlElement_obsolete(sublist[0].parentNode, otherTagName)) {
					// "Record the values of sublist, and let values be the
					// result."
					values = recordValues(sublist);

					// "Split the parent of sublist."
					splitParent(sublist, range);

					// "Wrap sublist, with sibling criteria returning true for an
					// HTML element with local name tag name and false otherwise,
					// and new parent instructions returning the result of calling
					// createElement(tag name) on the context object."
					wrap(
						sublist,
						makeIsElementPred(tagName),
						makeCreateElement(tagName),
						range
					);

					// "Restore the values from values."
					restoreValues(values, range);

					// "Continue this loop from the beginning."
					continue;
				}

				// "Wrap sublist, with sibling criteria returning true for an HTML
				// element with local name tag name and false otherwise, and new
				// parent instructions being the following:"
				// . . .
				// "Fix disallowed ancestors of the previous step's result."
				fixDisallowedAncestors(wrap(
					sublist,
					makeIsElementPred(tagName),
					makeCreateElementSublist(tagName, sublist, range),
					range
				), range);
			}
		}
	}


	//@}
	///// Justifying the selection /////
	//@{

	function justifySelection(alignment, range) {

		// "Block-extend the active range, and let new range be the result."
		var newRange = blockExtend(range);

		// "Let element list be a list of all editable Elements contained in new
		// range that either has an attribute in the HTML namespace whose local
		// name is "align", or has a style attribute that sets "text-align", or is
		// a center."
		var elementList = getAllContainedNodes(newRange, function (node) {
			return node.nodeType == $_.Node.ELEMENT_NODE && isEditable(node)
			// Ignoring namespaces here
				&& (hasAttribute(node, "align") || node.style.textAlign != "" || isNamedHtmlElement(node, 'center'));
		});

		// "For each element in element list:"
		var i;
		for (i = 0; i < elementList.length; i++) {
			var element = elementList[i];

			// "If element has an attribute in the HTML namespace whose local name
			// is "align", remove that attribute."
			element.removeAttribute("align");

			// "Unset the CSS property "text-align" on element, if it's set by a
			// style attribute."
			element.style.textAlign = "";
			if (element.getAttribute("style") == "") {
				element.removeAttribute("style");
			}

			// "If element is a div or span or center with no attributes, remove
			// it, preserving its descendants."
			if (isHtmlElementInArray(element, ["div", "span", "center"]) && !element.attributes.length) {
				removePreservingDescendants(element, range);
			}

			// "If element is a center with one or more attributes, set the tag
			// name of element to "div"."
			if (isNamedHtmlElement(element, 'center') && element.attributes.length) {
				setTagName(element, "div", range);
			}
		}

		// "Block-extend the active range, and let new range be the result."
		newRange = blockExtend(globalRange);

		// "Let node list be a list of nodes, initially empty."
		var nodeList = [];

		// "For each node node contained in new range, append node to node list if
		// the last member of node list (if any) is not an ancestor of node; node
		// is editable; node is an allowed child of "div"; and node's alignment
		// value is not alignment."
		nodeList = getContainedNodes(newRange, function (node) {
			return isEditable(node) && isAllowedChild(node, "div") && getAlignmentValue(node) != alignment;
		});

		function makeIsAlignedDiv(alignment) {
			return function (node) {
				return isNamedHtmlElement(node, 'div') && $_(node.attributes).every(function (attr) {
					return (attr.name == "align" && attr.value.toLowerCase() == alignment) || (attr.name == "style" && getStyleLength(node) == 1 && node.style.textAlign == alignment);
				});
			};
		}

		function makeCreateAlignedDiv(alignment) {
			return function () {
				var newParent = document.createElement("div");
				newParent.setAttribute("style", "text-align: " + alignment);
				return newParent;
			};
		}

		// "While node list is not empty:"
		while (nodeList.length) {
			// "Let sublist be a list of nodes, initially empty."
			var sublist = [];

			// "Remove the first member of node list and append it to sublist."
			sublist.push(nodeList.shift());

			// "While node list is not empty, and the first member of node list is
			// the nextSibling of the last member of sublist, remove the first
			// member of node list and append it to sublist."
			while (nodeList.length && nodeList[0] == sublist[sublist.length - 1].nextSibling) {
				sublist.push(nodeList.shift());
			}

			// "Wrap sublist. Sibling criteria returns true for any div that has
			// one or both of the following two attributes and no other attributes,
			// and false otherwise:"
			//
			//   * "An align attribute whose value is an ASCII case-insensitive
			//     match for alignment.
			//   * "A style attribute which sets exactly one CSS property
			//     (including unrecognized or invalid attributes), which is
			//     "text-align", which is set to alignment.
			//
			// "New parent instructions are to call createElement("div") on the
			// context object, then set its CSS property "text-align" to alignment
			// and return the result."
			wrap(
				sublist,
				makeIsAlignedDiv(alignment),
				makeCreateAlignedDiv(alignment),
				range
			);
		}
	}

	//@}
	///// Move the given collapsed range over adjacent zero-width whitespace characters.
	///// The range is
	//@{
	/**
	 * Move the given collapsed range over adjacent zero-width whitespace characters.
	 * If the range is not collapsed or is not contained in a text node, it is not modified
	 * @param range range to modify
	 * @param forward {Boolean} true to move forward, false to move backward
	 */
	function moveOverZWSP(range, forward) {
		var offset;
		if (!range.collapsed) {
			return;
		}

		offset = range.startOffset;

		if (forward) {
			// check whether the range starts in a text node
			if (range.startContainer && range.startContainer.nodeType === $_.Node.TEXT_NODE) {
				// move forward (i.e. increase offset) as long as we stay in the text node and have zwsp characters to the right
				while (offset < range.startContainer.data.length && range.startContainer.data.charAt(offset) === '\u200b') {
					offset++;
				}
			}
		} else {
			// check whether the range starts in a text node
			if (range.startContainer && range.startContainer.nodeType === $_.Node.TEXT_NODE) {
				// move backward (i.e. decrease offset) as long as we stay in the text node and have zwsp characters to the left
				while (offset > 0 && range.startContainer.data.charAt(offset - 1) === '\u200b') {
					offset--;
				}
			}
		}

		// if the offset was changed, set it back to the collapsed range
		if (offset !== range.startOffset) {
			range.setStart(range.startContainer, offset);
			range.setEnd(range.startContainer, offset);
		}
	}

	/**
	 * implementation of the delete command
	 * will attempt to delete contents within range if non-collapsed
	 * or delete the character left of the cursor position if range
	 * is collapsed. Is used to define the behaviour of the backspace
	 * button.
	 *
	 * @param      value   is just there for compatibility with the commands api. parameter is ignored.
	 * @param      range   the range to execute the delete command for
	 * @return     void
	 */
	commands["delete"] = {
		action: function (value, range) {
			var i;

			// special behaviour for skipping zero-width whitespaces in IE7
			if (jQuery.browser.msie && jQuery.browser.version <= 7) {
				moveOverZWSP(range, false);
			}

			// "If the active range is not collapsed, delete the contents of the
			// active range and abort these steps."
			if (!range.collapsed) {
				deleteContents(range);
				return;
			}

			// "Canonicalize whitespace at (active range's start node, active
			// range's start offset)."
			canonicalizeWhitespace(range.startContainer, range.startOffset);

			// "Let node and offset be the active range's start node and offset."
			var node = range.startContainer;
			var offset = range.startOffset;
			var isBr = false;
			var isHr = false;

			// "Repeat the following steps:"
			while (true) {
				// we need to reset isBr and isHr on every interation of the loop
				if (offset > 0) {
					isBr = isNamedHtmlElement(node.childNodes[offset - 1], "br") || false;
					isHr = isNamedHtmlElement(node.childNodes[offset - 1], "hr") || false;
				}
				// "If offset is zero and node's previousSibling is an editable
				// invisible node, remove node's previousSibling from its parent."
				if (offset == 0 && isEditable(node.previousSibling) && isInvisible(node.previousSibling)) {
					node.parentNode.removeChild(node.previousSibling);
					continue;
				}
				// "Otherwise, if node has a child with index offset − 1 and that
				// child is an editable invisible node, remove that child from
				// node, then subtract one from offset."
				if (0 <= offset - 1 && offset - 1 < node.childNodes.length && isEditable(node.childNodes[offset - 1]) && (isInvisible(node.childNodes[offset - 1]) || isBr || isHr)) {
					node.removeChild(node.childNodes[offset - 1]);
					offset--;
					if (isBr || isHr) {
						range.setStart(node, offset);
						range.setEnd(node, offset);
						return;
					}
					continue;

				}
				// "Otherwise, if offset is zero and node is an inline node, or if
				// node is an invisible node, set offset to the index of node, then
				// set node to its parent."
				if ((offset == 0 && isInlineNode(node)) || isInvisible(node)) {
					offset = getNodeIndex(node);
					node = node.parentNode;
					continue;
				}
				// "Otherwise, if node has a child with index offset − 1 and that
				// child is an editable a, remove that child from node, preserving
				// its descendants. Then abort these steps."
				if (0 <= offset - 1 && offset - 1 < node.childNodes.length && isEditable(node.childNodes[offset - 1]) && isNamedHtmlElement(node.childNodes[offset - 1], "a")) {
					removePreservingDescendants(node.childNodes[offset - 1], range);
					return;

				}
				// "Otherwise, if node has a child with index offset − 1 and that
				// child is not a block node or a br or an img, set node to that
				// child, then set offset to the length of node."
				if (0 <= offset - 1 && offset - 1 < node.childNodes.length && !isBlockNode(node.childNodes[offset - 1]) && !isHtmlElementInArray(node.childNodes[offset - 1], ["br", "img"])) {
					node = node.childNodes[offset - 1];
					offset = getNodeLength(node);
					continue;
				}
				// "Otherwise, break from this loop."
				// brk is a quick and dirty jslint workaround since I don't want to rewrite this loop
				var brk = true;
				if (brk) {
					break;
				}
			}

			// if the previous node is an aloha-table we want to delete it
			var delBlock = getBlockAtPreviousPosition(node, offset);
			if (delBlock) {
				delBlock.parentNode.removeChild(delBlock);
				return;
			}

			// "If node is a Text node and offset is not zero, call collapse(node,
			// offset) on the Selection. Then delete the contents of the range with
			// start (node, offset − 1) and end (node, offset) and abort these
			// steps."
			if (node.nodeType == $_.Node.TEXT_NODE && offset != 0) {
				range.setStart(node, offset - 1);
				range.setEnd(node, offset - 1);
				deleteContents(node, offset - 1, node, offset);
				return;
			}

			// @iebug
			// when inserting a special char via the plugin
			// there where problems deleting them again with backspace after insertation
			// see https://github.com/alohaeditor/Aloha-Editor/issues/517
			if (node.nodeType == $_.Node.TEXT_NODE && offset == 0 && jQuery.browser.msie) {
				offset = 1;
				range.setStart(node, offset);
				range.setEnd(node, offset);
				range.startOffset = 0;
				deleteContents(range);
				return;
			}

			// "If node is an inline node, abort these steps."
			if (isInlineNode(node)) {
				return;
			}

			// "If node has a child with index offset − 1 and that child is a br or
			// hr or img, call collapse(node, offset) on the Selection. Then delete
			// the contents of the range with start (node, offset − 1) and end
			// (node, offset) and abort these steps."
			if (0 <= offset - 1 && offset - 1 < node.childNodes.length && isHtmlElementInArray(node.childNodes[offset - 1], ["br", "hr", "img"])) {
				range.setStart(node, offset);
				range.setEnd(node, offset);
				deleteContents(range);
				return;
			}

			// "If node is an li or dt or dd and is the first child of its parent,
			// and offset is zero:"
			if (isHtmlElementInArray(node, ["li", "dt", "dd"]) && node == node.parentNode.firstChild && offset == 0) {
				// "Let items be a list of all lis that are ancestors of node."
				//
				// Remember, must be in tree order.
				var items = [];
				var ancestor;
				for (ancestor = node.parentNode; ancestor; ancestor = ancestor.parentNode) {
					if (isNamedHtmlElement(ancestor, 'li')) {
						items.unshift(ancestor);
					}
				}

				// "Normalize sublists of each item in items."
				for (i = 0; i < items.length; i++) {
					normalizeSublists(items[i], range);
				}

				// "Record the values of the one-node list consisting of node, and
				// let values be the result."
				var values = recordValues([node]);

				// "Split the parent of the one-node list consisting of node."
				splitParent([node], range);

				// "Restore the values from values."
				restoreValues(values, range);

				// "If node is a dd or dt, and it is not an allowed child of any of
				// its ancestors in the same editing host, set the tag name of node
				// to the default single-line container name and let node be the
				// result."
				if (isHtmlElementInArray(node, ["dd", "dt"]) && $_(getAncestors(node)).every(function (ancestor) { return !inSameEditingHost(node, ancestor) || !isAllowedChild(node, ancestor); })) {
					node = setTagName(node, defaultSingleLineContainerName, range);
				}

				// "Fix disallowed ancestors of node."
				fixDisallowedAncestors(node, range);

				// fix the lists to be html5 conformant
				for (i = 0; i < items.length; i++) {
					unNormalizeSublists(items[i].parentNode, range);
				}

				// "Abort these steps."
				return;
			}

			// "Let start node equal node and let start offset equal offset."
			var startNode = node;
			var startOffset = offset;

			// "Repeat the following steps:"
			while (true) {
				// "If start offset is zero, set start offset to the index of start
				// node and then set start node to its parent."
				if (startOffset == 0) {
					startOffset = getNodeIndex(startNode);
					startNode = startNode.parentNode;

					// "Otherwise, if start node has an editable invisible child with
					// index start offset minus one, remove it from start node and
					// subtract one from start offset."
				} else if (0 <= startOffset - 1 && startOffset - 1 < startNode.childNodes.length && isEditable(startNode.childNodes[startOffset - 1]) && isInvisible(startNode.childNodes[startOffset - 1])) {
					startNode.removeChild(startNode.childNodes[startOffset - 1]);
					startOffset--;

					// "Otherwise, break from this loop."
				} else {
					break;
				}
			}

			// "If offset is zero, and node has an editable ancestor container in
			// the same editing host that's an indentation element:"
			if (offset == 0 && $_(getAncestors(node).concat(node)).filter(function (ancestor) { return isEditable(ancestor) && inSameEditingHost(ancestor, node) && isIndentationElement(ancestor); }).length) {
				// "Block-extend the range whose start and end are both (node, 0),
				// and let new range be the result."
				var newRange = Aloha.createRange();
				newRange.setStart(node, 0);
				newRange.setEnd(node, 0);
				newRange = blockExtend(newRange);

				// "Let node list be a list of nodes, initially empty."
				//
				// "For each node current node contained in new range, append
				// current node to node list if the last member of node list (if
				// any) is not an ancestor of current node, and current node is
				// editable but has no editable descendants."
				var nodeList = getContainedNodes(newRange, function (currentNode) {
					return isEditable(currentNode) && !hasEditableDescendants(currentNode);
				});

				// "Outdent each node in node list."
				for (i = 0; i < nodeList.length; i++) {
					outdentNode(nodeList[i], range);
				}

				// "Abort these steps."
				return;
			}

			// "If the child of start node with index start offset is a table,
			// abort these steps."
			if (isNamedHtmlElement(startNode.childNodes[startOffset], "table")) {
				return;
			}

			// "If start node has a child with index start offset − 1, and that
			// child is a table:"
			if (0 <= startOffset - 1 && startOffset - 1 < startNode.childNodes.length && isNamedHtmlElement(startNode.childNodes[startOffset - 1], "table")) {
				// "Call collapse(start node, start offset − 1) on the context
				// object's Selection."
				range.setStart(startNode, startOffset - 1);

				// "Call extend(start node, start offset) on the context object's
				// Selection."
				range.setEnd(startNode, startOffset);

				// "Abort these steps."
				return;
			}

			// "If offset is zero; and either the child of start node with index
			// start offset minus one is an hr, or the child is a br whose
			// previousSibling is either a br or not an inline node:"
			if (offset == 0
				    && (isNamedHtmlElement(startNode.childNodes[startOffset - 1], "hr")
						|| (isNamedHtmlElement(startNode.childNodes[startOffset - 1], "br")
							&& (isNamedHtmlElement(startNode.childNodes[startOffset - 1].previousSibling, "br")
								|| !isInlineNode(startNode.childNodes[startOffset - 1].previousSibling))))) {
				// "Call collapse(node, offset) on the Selection."
				range.setStart(node, offset);
				range.setEnd(node, offset);

				// "Delete the contents of the range with start (start node, start
				// offset − 1) and end (start node, start offset)."
				deleteContents(startNode, startOffset - 1, startNode, startOffset);

				// "Abort these steps."
				return;
			}

			// "If the child of start node with index start offset is an li or dt
			// or dd, and that child's firstChild is an inline node, and start
			// offset is not zero:"
			if (isHtmlElementInArray(startNode.childNodes[startOffset], ["li", "dt", "dd"]) && isInlineNode(startNode.childNodes[startOffset].firstChild) && startOffset != 0) {
				// "Let previous item be the child of start node with index start
				// offset minus one."
				var previousItem = startNode.childNodes[startOffset - 1];

				// "If previous item's lastChild is an inline node other than a br,
				// call createElement("br") on the context object and append the
				// result as the last child of previous item."
				if (isInlineNode(previousItem.lastChild) && !isNamedHtmlElement(previousItem.lastChild, "br")) {
					previousItem.appendChild(document.createElement("br"));
				}

				// "If previous item's lastChild is an inline node, call
				// createElement("br") on the context object and append the result
				// as the last child of previous item."
				if (isInlineNode(previousItem.lastChild)) {
					previousItem.appendChild(document.createElement("br"));
				}
			}

			// "If the child of start node with index start offset is an li or dt
			// or dd, and its previousSibling is also an li or dt or dd, set start
			// node to its child with index start offset − 1, then set start offset
			// to start node's length, then set node to start node's nextSibling,
			// then set offset to 0."
			if (isHtmlElementInArray(startNode.childNodes[startOffset], ["li", "dt", "dd"]) && isHtmlElementInArray(startNode.childNodes[startOffset - 1], ["li", "dt", "dd"])) {
				startNode = startNode.childNodes[startOffset - 1];
				startOffset = getNodeLength(startNode);
				node = startNode.nextSibling;
				offset = 0;

				// "Otherwise, while start node has a child with index start offset
				// minus one:"
			} else {
				while (0 <= startOffset - 1 && startOffset - 1 < startNode.childNodes.length) {
					// "If start node's child with index start offset minus one is
					// editable and invisible, remove it from start node, then
					// subtract one from start offset."
					if (isEditable(startNode.childNodes[startOffset - 1]) && isInvisible(startNode.childNodes[startOffset - 1])) {
						startNode.removeChild(startNode.childNodes[startOffset - 1]);
						startOffset--;

						// "Otherwise, set start node to its child with index start
						// offset minus one, then set start offset to the length of
						// start node."
					} else {
						startNode = startNode.childNodes[startOffset - 1];
						startOffset = getNodeLength(startNode);
					}
				}
			}

			// "Delete the contents of the range with start (start node, start
			// offset) and end (node, offset)."
			var delRange = Aloha.createRange();
			delRange.setStart(startNode, startOffset);
			delRange.setEnd(node, offset);
			deleteContents(delRange);

			if (!isAncestorContainer(document.body, range.startContainer)) {
				if (delRange.startContainer.hasChildNodes()
						|| delRange.startContainer.nodeType == $_.Node.TEXT_NODE
							|| isEditingHost(delRange.startContainer)) {
					range.setStart(delRange.startContainer, delRange.startOffset);
					range.setEnd(delRange.startContainer, delRange.startOffset);
				} else {
					range.setStart(delRange.startContainer.parentNode, getNodeIndex(delRange.startContainer));
					range.setEnd(delRange.startContainer.parentNode, getNodeIndex(delRange.startContainer));
				}
			}
		}
	};

	//@}
	///// The formatBlock command /////
	//@{
	// "A formattable block name is "address", "dd", "div", "dt", "h1", "h2", "h3",
	// "h4", "h5", "h6", "p", or "pre"."
	var formattableBlockNames = ["address", "dd", "div", "dt", "h1", "h2", "h3", "h4", "h5", "h6", "p", "pre"];

	commands.formatblock = {
		action: function (value) {
			var i;

			// "If value begins with a "<" character and ends with a ">" character,
			// remove the first and last characters from it."
			if (/^<.*>$/.test(value)) {
				value = value.slice(1, -1);
			}

			// "Let value be converted to ASCII lowercase."
			value = value.toLowerCase();

			// "If value is not a formattable block name, abort these steps and do
			// nothing."
			if ($_(formattableBlockNames).indexOf(value) == -1) {
				return;
			}

			// "Block-extend the active range, and let new range be the result."
			var newRange = blockExtend(getActiveRange());

			// "Let node list be an empty list of nodes."
			//
			// "For each node node contained in new range, append node to node list
			// if it is editable, the last member of original node list (if any) is
			// not an ancestor of node, node is either a non-list single-line
			// container or an allowed child of "p" or a dd or dt, and node is not
			// the ancestor of a prohibited paragraph child."
			var nodeList = getContainedNodes(newRange, function (node) {
				return isEditable(node) && (isNonListSingleLineContainer(node) || isAllowedChild(node, "p") || isHtmlElementInArray(node, ["dd", "dt"])) && !$_(getDescendants(node)).some(isProhibitedParagraphChild);
			});

			// "Record the values of node list, and let values be the result."
			var values = recordValues(nodeList);

			function makeIsEditableElementInSameEditingHostDoesNotContainProhibitedParagraphChildren(node) {
				return function (ancestor) {
					return (isEditable(ancestor)
							&& inSameEditingHost(ancestor, node)
							&& isHtmlElement_obsolete(ancestor, formattableBlockNames)
							&& !$_(getDescendants(ancestor)).some(isProhibitedParagraphChild));
				};
			}

			function makeIsElementWithoutAttributes(value) {
				return function (node) {
					return isHtmlElement_obsolete(node, value) && !node.attributes.length;
				};
			}

			function returnFalse() {
				return false;
			}

			function makeCreateElement(value) {
				return function () {
					return document.createElement(value);
				};
			}

			// "For each node in node list, while node is the descendant of an
			// editable HTML element in the same editing host, whose local name is
			// a formattable block name, and which is not the ancestor of a
			// prohibited paragraph child, split the parent of the one-node list
			// consisting of node."
			for (i = 0; i < nodeList.length; i++) {
				var node = nodeList[i];
				while ($_(getAncestors(node)).some(makeIsEditableElementInSameEditingHostDoesNotContainProhibitedParagraphChildren(node))) {
					splitParent([node], newRange);
				}
			}

			// "Restore the values from values."
			restoreValues(values, newRange);

			// "While node list is not empty:"
			while (nodeList.length) {
				var sublist;

				// "If the first member of node list is a single-line
				// container:"
				if (isSingleLineContainer(nodeList[0])) {
					// "Let sublist be the children of the first member of node
					// list."
					sublist = [].slice.call(toArray(nodeList[0].childNodes));

					// "Record the values of sublist, and let values be the
					// result."
					values = recordValues(sublist);

					// "Remove the first member of node list from its parent,
					// preserving its descendants."
					removePreservingDescendants(nodeList[0], newRange);

					// "Restore the values from values."
					restoreValues(values, newRange);

					// "Remove the first member from node list."
					nodeList.shift();

					// "Otherwise:"
				} else {
					// "Let sublist be an empty list of nodes."
					sublist = [];

					// "Remove the first member of node list and append it to
					// sublist."
					sublist.push(nodeList.shift());

					// "While node list is not empty, and the first member of
					// node list is the nextSibling of the last member of
					// sublist, and the first member of node list is not a
					// single-line container, and the last member of sublist is
					// not a br, remove the first member of node list and
					// append it to sublist."
					while (nodeList.length && nodeList[0] == sublist[sublist.length - 1].nextSibling && !isSingleLineContainer(nodeList[0]) && !isNamedHtmlElement(sublist[sublist.length - 1], "BR")) {
						sublist.push(nodeList.shift());
					}
				}

				// "Wrap sublist. If value is "div" or "p", sibling criteria
				// returns false; otherwise it returns true for an HTML element
				// with local name value and no attributes, and false otherwise.
				// New parent instructions return the result of running
				// createElement(value) on the context object. Then fix disallowed
				// ancestors of the result."
				fixDisallowedAncestors(wrap(
					sublist,
					jQuery.inArray(value, ["div", "p"]) == -1 ? makeIsElementWithoutAttributes(value) : returnFalse,
					makeCreateElement(value),
					newRange
				), newRange);
			}
		},
		indeterm: function () {
			// "Block-extend the active range, and let new range be the result."
			var newRange = blockExtend(getActiveRange());

			// "Let node list be all visible editable nodes that are contained in
			// new range and have no children."
			var nodeList = getAllContainedNodes(newRange, function (node) {
				return isVisible(node) && isEditable(node) && !node.hasChildNodes();
			});

			// "If node list is empty, return false."
			if (!nodeList.length) {
				return false;
			}

			// "Let type be null."
			var type = null;

			// "For each node in node list:"
			var i;
			for (i = 0; i < nodeList.length; i++) {
				var node = nodeList[i];

				// "While node's parent is editable and in the same editing host as
				// node, and node is not an HTML element whose local name is a
				// formattable block name, set node to its parent."
				while (isEditable(node.parentNode) && inSameEditingHost(node, node.parentNode) && !isHtmlElement_obsolete(node, formattableBlockNames)) {
					node = node.parentNode;
				}

				// "Let current type be the empty string."
				var currentType = "";

				// "If node is an editable HTML element whose local name is a
				// formattable block name, and node is not the ancestor of a
				// prohibited paragraph child, set current type to node's local
				// name."
				if (isEditable(node) && isHtmlElement_obsolete(node, formattableBlockNames) && !$_(getDescendants(node)).some(isProhibitedParagraphChild)) {
					currentType = node.tagName;
				}

				// "If type is null, set type to current type."
				if (type === null) {
					type = currentType;

					// "Otherwise, if type does not equal current type, return true."
				} else if (type != currentType) {
					return true;
				}
			}

			// "Return false."
			return false;
		},
		value: function () {
			// "Block-extend the active range, and let new range be the result."
			var newRange = blockExtend(getActiveRange());

			// "Let node be the first visible editable node that is contained in
			// new range and has no children. If there is no such node, return the
			// empty string."
			var nodes = getAllContainedNodes(newRange, function (node) {
				return isVisible(node) && isEditable(node) && !node.hasChildNodes();
			});
			if (!nodes.length) {
				return "";
			}
			var node = nodes[0];

			// "While node's parent is editable and in the same editing host as
			// node, and node is not an HTML element whose local name is a
			// formattable block name, set node to its parent."
			while (isEditable(node.parentNode) && inSameEditingHost(node, node.parentNode) && !isHtmlElement_obsolete(node, formattableBlockNames)) {
				node = node.parentNode;
			}

			// "If node is an editable HTML element whose local name is a
			// formattable block name, and node is not the ancestor of a prohibited
			// paragraph child, return node's local name, converted to ASCII
			// lowercase."
			if (isEditable(node) && isHtmlElement_obsolete(node, formattableBlockNames) && !$_(getDescendants(node)).some(isProhibitedParagraphChild)) {
				return node.tagName.toLowerCase();
			}

			// "Return the empty string."
			return "";
		}
	};

	//@}
	///// The forwardDelete command /////
	//@{
	commands.forwarddelete = {
		action: function (value, range) {
			// special behaviour for skipping zero-width whitespaces in IE7
			if (jQuery.browser.msie && jQuery.browser.version <= 7) {
				moveOverZWSP(range, true);
			}

			// "If the active range is not collapsed, delete the contents of the
			// active range and abort these steps."
			if (!range.collapsed) {
				deleteContents(range);
				return;
			}

			// "Canonicalize whitespace at (active range's start node, active
			// range's start offset)."
			canonicalizeWhitespace(range.startContainer, range.startOffset);

			// "Let node and offset be the active range's start node and offset."
			var node = range.startContainer;
			var offset = range.startOffset;
			var isBr = false;
			var isHr = false;

			// "Repeat the following steps:"
			while (true) {
				// check whether the next element is a br or hr
				// Commented out for unknown reason.
				//if (offset < node.childNodes.length) {
				//				isBr = isHtmlElement_obsolete(node.childNodes[offset], "br") || false;
				//				isHr = isHtmlElement_obsolete(node.childNodes[offset], "hr") || false;
				//}

				// "If offset is the length of node and node's nextSibling is an
				// editable invisible node, remove node's nextSibling from its
				// parent."
				if (offset == getNodeLength(node) && isEditable(node.nextSibling) && isInvisible(node.nextSibling)) {
					node.parentNode.removeChild(node.nextSibling);

					// "Otherwise, if node has a child with index offset and that child
					// is an editable invisible node, remove that child from node."
				} else if (offset < node.childNodes.length && isEditable(node.childNodes[offset]) && (isInvisible(node.childNodes[offset]) || isBr || isHr)) {
					node.removeChild(node.childNodes[offset]);
					if (isBr || isHr) {
						ensureContainerEditable(node);
						range.setStart(node, offset);
						range.setEnd(node, offset);
						return;
					}

					// "Otherwise, if node has a child with index offset and that child
					// is a collapsed block prop, add one to offset."
				} else if (offset < node.childNodes.length && isCollapsedBlockProp(node.childNodes[offset])) {
					offset++;

					// "Otherwise, if offset is the length of node and node is an
					// inline node, or if node is invisible, set offset to one plus the
					// index of node, then set node to its parent."
				} else if ((offset == getNodeLength(node) && isInlineNode(node)) || isInvisible(node)) {
					offset = 1 + getNodeIndex(node);
					node = node.parentNode;

					// "Otherwise, if node has a child with index offset and that child
					// is not a block node or a br or an img, set node to that child,
					// then set offset to zero."
				} else if (offset < node.childNodes.length && !isBlockNode(node.childNodes[offset]) && !isHtmlElementInArray(node.childNodes[offset], ["br", "img"])) {
					node = node.childNodes[offset];
					offset = 0;

					// "Otherwise, break from this loop."
				} else {
					break;
				}
			}

			// collapse whitespace in the node, if it is a text node
			canonicalizeWhitespace(range.startContainer, range.startOffset);

			// if the next node is an aloha-table we want to delete it
			var delBlock = getBlockAtNextPosition(node, offset);
			if (delBlock) {
				delBlock.parentNode.removeChild(delBlock);
				return;
			}

			var endOffset;
			// "If node is a Text node and offset is not node's length:"
			if (node.nodeType == $_.Node.TEXT_NODE && offset != getNodeLength(node)) {
				// "Call collapse(node, offset) on the Selection."
				range.setStart(node, offset);
				range.setEnd(node, offset);

				// "Let end offset be offset plus one."
				endOffset = offset + 1;

				// "While end offset is not node's length and the end offsetth
				// element of node's data has general category M when interpreted
				// as a Unicode code point, add one to end offset."
				//
				// TODO: Not even going to try handling anything beyond the most
				// basic combining marks, since I couldn't find a good list.  I
				// special-case a few Hebrew diacritics too to test basic coverage
				// of non-Latin stuff.
				while (endOffset != node.length && /^[\u0300-\u036f\u0591-\u05bd\u05c1\u05c2]$/.test(node.data[endOffset])) {
					endOffset++;
				}

				// "Delete the contents of the range with start (node, offset) and
				// end (node, end offset)."
				deleteContents(node, offset, node, endOffset);

				// "Abort these steps."
				return;
			}

			// "If node is an inline node, abort these steps."
			if (isInlineNode(node)) {
				return;
			}

			// "If node has a child with index offset and that child is a br or hr
			// or img, call collapse(node, offset) on the Selection. Then delete
			// the contents of the range with start (node, offset) and end (node,
			// offset + 1) and abort these steps."
			if (offset < node.childNodes.length && isHtmlElementInArray(node.childNodes[offset], ["br", "hr", "img"])) {
				range.setStart(node, offset);
				range.setEnd(node, offset);
				deleteContents(node, offset, node, offset + 1);
				return;
			}

			// "Let end node equal node and let end offset equal offset."
			var endNode = node;
			endOffset = offset;

			// "Repeat the following steps:"
			while (true) {
				// "If end offset is the length of end node, set end offset to one
				// plus the index of end node and then set end node to its parent."
				if (endOffset == getNodeLength(endNode)) {
					endOffset = 1 + getNodeIndex(endNode);
					endNode = endNode.parentNode;

					// "Otherwise, if end node has a an editable invisible child with
					// index end offset, remove it from end node."
				} else if (endOffset < endNode.childNodes.length && isEditable(endNode.childNodes[endOffset]) && isInvisible(endNode.childNodes[endOffset])) {
					endNode.removeChild(endNode.childNodes[endOffset]);

					// "Otherwise, break from this loop."
				} else {
					break;
				}
			}

			// "If the child of end node with index end offset minus one is a
			// table, abort these steps."
			if (isNamedHtmlElement(endNode.childNodes[endOffset - 1], "table")) {
				return;
			}

			// "If the child of end node with index end offset is a table:"
			if (isNamedHtmlElement(endNode.childNodes[endOffset], "table")) {
				// "Call collapse(end node, end offset) on the context object's
				// Selection."
				range.setStart(endNode, endOffset);

				// "Call extend(end node, end offset + 1) on the context object's
				// Selection."
				range.setEnd(endNode, endOffset + 1);

				// "Abort these steps."
				return;
			}

			// "If offset is the length of node, and the child of end node with
			// index end offset is an hr or br:"
			if (offset == getNodeLength(node) && isHtmlElementInArray(endNode.childNodes[endOffset], ["br", "hr"])) {
				// "Call collapse(node, offset) on the Selection."
				range.setStart(node, offset);
				range.setEnd(node, offset);

				// "Delete the contents of the range with end (end node, end
				// offset) and end (end node, end offset + 1)."
				deleteContents(endNode, endOffset, endNode, endOffset + 1);

				// "Abort these steps."
				return;
			}

			// "While end node has a child with index end offset:"
			while (endOffset < endNode.childNodes.length) {
				// "If end node's child with index end offset is editable and
				// invisible, remove it from end node."
				if (isEditable(endNode.childNodes[endOffset]) && isInvisible(endNode.childNodes[endOffset])) {
					endNode.removeChild(endNode.childNodes[endOffset]);

					// "Otherwise, set end node to its child with index end offset and
					// set end offset to zero."
				} else {
					endNode = endNode.childNodes[endOffset];
					endOffset = 0;
				}
			}

			// "Delete the contents of the range with start (node, offset) and end
			// (end node, end offset)."
			var newRange = deleteContents(node, offset, endNode, endOffset);
			range.setStart(newRange.startContainer, newRange.startOffset);
			range.setEnd(newRange.endContainer, newRange.endOffset);
		}
	};

	//@}
	///// The indent command /////
	//@{
	commands.indent = {
		action: function () {
			// "Let items be a list of all lis that are ancestor containers of the
			// active range's start and/or end node."
			//
			// Has to be in tree order, remember!
			var items = [];
			var node;
			for (node = getActiveRange().endContainer; node != getActiveRange().commonAncestorContainer; node = node.parentNode) {
				if (isNamedHtmlElement(node, "LI")) {
					items.unshift(node);
				}
			}
			for (node = getActiveRange().startContainer; node != getActiveRange().commonAncestorContainer; node = node.parentNode) {
				if (isNamedHtmlElement(node, "LI")) {
					items.unshift(node);
				}
			}
			for (node = getActiveRange().commonAncestorContainer; node; node = node.parentNode) {
				if (isNamedHtmlElement(node, "LI")) {
					items.unshift(node);
				}
			}

			// "For each item in items, normalize sublists of item."
			var i;
			for (i = 0; i < items.length; i++) {
				normalizeSublists(items[i], getActiveRange());
			}

			// "Block-extend the active range, and let new range be the result."
			var newRange = blockExtend(getActiveRange());

			// "Let node list be a list of nodes, initially empty."
			var nodeList = [];

			// "For each node node contained in new range, if node is editable and
			// is an allowed child of "div" or "ol" and if the last member of node
			// list (if any) is not an ancestor of node, append node to node list."
			nodeList = getContainedNodes(newRange, function (node) {
				return isEditable(node) && (isAllowedChild(node, "div") || isAllowedChild(node, "ol"));
			});

			// "If the first member of node list is an li whose parent is an ol or
			// ul, and its previousSibling is an li as well, normalize sublists of
			// its previousSibling."
			if (nodeList.length && isNamedHtmlElement(nodeList[0], "LI") && isHtmlElementInArray(nodeList[0].parentNode, ["OL", "UL"]) && isNamedHtmlElement(nodeList[0].previousSibling, "LI")) {
				normalizeSublists(nodeList[0].previousSibling, newRange);
			}

			// "While node list is not empty:"
			while (nodeList.length) {
				// "Let sublist be a list of nodes, initially empty."
				var sublist = [];

				// "Remove the first member of node list and append it to sublist."
				sublist.push(nodeList.shift());

				// "While the first member of node list is the nextSibling of the
				// last member of sublist, remove the first member of node list and
				// append it to sublist."
				while (nodeList.length && nodeList[0] == sublist[sublist.length - 1].nextSibling) {
					sublist.push(nodeList.shift());
				}

				// "Indent sublist."
				indentNodes(sublist, newRange);
			}
		}
	};

	//@}
	///// The insertHorizontalRule command /////
	//@{
	commands.inserthorizontalrule = {
		action: function (value, range) {

			// "While range's start offset is 0 and its start node's parent is not
			// null, set range's start to (parent of start node, index of start
			// node)."
			while (range.startOffset == 0 && range.startContainer.parentNode) {
				range.setStart(range.startContainer.parentNode, getNodeIndex(range.startContainer));
			}

			// "While range's end offset is the length of its end node, and its end
			// node's parent is not null, set range's end to (parent of end node, 1
			// + index of start node)."
			while (range.endOffset == getNodeLength(range.endContainer) && range.endContainer.parentNode) {
				range.setEnd(range.endContainer.parentNode, 1 + getNodeIndex(range.endContainer));
			}

			// "Delete the contents of range, with block merging false."
			deleteContents(range, {
				blockMerging: false
			});

			// "If the active range's start node is neither editable nor an editing
			// host, abort these steps."
			if (!isEditable(getActiveRange().startContainer) && !isEditingHost(getActiveRange().startContainer)) {
				return;
			}

			// "If the active range's start node is a Text node and its start
			// offset is zero, set the active range's start and end to (parent of
			// start node, index of start node)."
			if (getActiveRange().startContainer.nodeType == $_.Node.TEXT_NODE && getActiveRange().startOffset == 0) {
				getActiveRange().setStart(getActiveRange().startContainer.parentNode, getNodeIndex(getActiveRange().startContainer));
				getActiveRange().collapse(true);
			}

			// "If the active range's start node is a Text node and its start
			// offset is the length of its start node, set the active range's start
			// and end to (parent of start node, 1 + index of start node)."
			if (getActiveRange().startContainer.nodeType == $_.Node.TEXT_NODE && getActiveRange().startOffset == getNodeLength(getActiveRange().startContainer)) {
				getActiveRange().setStart(getActiveRange().startContainer.parentNode, 1 + getNodeIndex(getActiveRange().startContainer));
				getActiveRange().collapse(true);
			}

			// "Let hr be the result of calling createElement("hr") on the
			// context object."
			var hr = document.createElement("hr");

			// "Run insertNode(hr) on the range."
			range.insertNode(hr);

			// "Fix disallowed ancestors of hr."
			fixDisallowedAncestors(hr, range);

			// "Run collapse() on the Selection, with first argument equal to the
			// parent of hr and the second argument equal to one plus the index of
			// hr."
			//
			// Not everyone actually supports collapse(), so we do it manually
			// instead.  Also, we need to modify the actual range we're given as
			// well, for the sake of autoimplementation.html's range-filling-in.
			range.setStart(hr.parentNode, 1 + getNodeIndex(hr));
			range.setEnd(hr.parentNode, 1 + getNodeIndex(hr));
			Aloha.getSelection().removeAllRanges();
			Aloha.getSelection().addRange(range);
		}
	};

	//@}
	///// The insertHTML command /////
	//@{
	commands.inserthtml = {
		action: function (value, range) {


			// "Delete the contents of the active range."
			deleteContents(range);

			// "If the active range's start node is neither editable nor an editing
			// host, abort these steps."
			if (!isEditable(range.startContainer) && !isEditingHost(range.startContainer)) {
				return;
			}

			// "Let frag be the result of calling createContextualFragment(value)
			// on the active range."
			var frag = range.createContextualFragment(value);

			// "Let last child be the lastChild of frag."
			var lastChild = frag.lastChild;

			// "If last child is null, abort these steps."
			if (!lastChild) {
				return;
			}

			// "Let descendants be all descendants of frag."
			var descendants = getDescendants(frag);

			// "If the active range's start node is a block node:"
			if (isBlockNode(range.startContainer)) {
				// "Let collapsed block props be all editable collapsed block prop
				// children of the active range's start node that have index
				// greater than or equal to the active range's start offset."
				//
				// "For each node in collapsed block props, remove node from its
				// parent."
				$_(range.startContainer.childNodes).filter(function (node, range) {
					return isEditable(node) && isCollapsedBlockProp(node) && getNodeIndex(node) >= range.startOffset;
				}, true).forEach(function (node) {
					node.parentNode.removeChild(node);
				});
			}

			// "Call insertNode(frag) on the active range."
			range.insertNode(frag);

			// "If the active range's start node is a block node with no visible
			// children, call createElement("br") on the context object and append
			// the result as the last child of the active range's start node."
			if (isBlockNode(range.startContainer)) {
				ensureContainerEditable(range.startContainer);
			}

			// "Call collapse() on the context object's Selection, with last
			// child's parent as the first argument and one plus its index as the
			// second."
			range.setStart(lastChild.parentNode, 1 + getNodeIndex(lastChild));
			range.setEnd(lastChild.parentNode, 1 + getNodeIndex(lastChild));

			// "Fix disallowed ancestors of each member of descendants."
			var i;
			for (i = 0; i < descendants.length; i++) {
				fixDisallowedAncestors(descendants[i], range);
			}

			setActiveRange(range);
		}
	};

	//@}
	///// The insertImage command /////
	//@{
	commands.insertimage = {
		action: function (value) {
			// "If value is the empty string, abort these steps and do nothing."
			if (value === "") {
				return;
			}

			// "Let range be the active range."
			var range = getActiveRange();

			// "Delete the contents of range, with strip wrappers false."
			deleteContents(range, {
				stripWrappers: false
			});

			// "If the active range's start node is neither editable nor an editing
			// host, abort these steps."
			if (!isEditable(getActiveRange().startContainer) && !isEditingHost(getActiveRange().startContainer)) {
				return;
			}

			// "If range's start node is a block node whose sole child is a br, and
			// its start offset is 0, remove its start node's child from it."
			if (isBlockNode(range.startContainer) && range.startContainer.childNodes.length == 1 && isNamedHtmlElement(range.startContainer.firstChild, "br") && range.startOffset == 0) {
				range.startContainer.removeChild(range.startContainer.firstChild);
			}

			// "Let img be the result of calling createElement("img") on the
			// context object."
			var img = document.createElement("img");

			// "Run setAttribute("src", value) on img."
			img.setAttribute("src", value);

			// "Run insertNode(img) on the range."
			range.insertNode(img);

			// "Run collapse() on the Selection, with first argument equal to the
			// parent of img and the second argument equal to one plus the index of
			// img."
			//
			// Not everyone actually supports collapse(), so we do it manually
			// instead.  Also, we need to modify the actual range we're given as
			// well, for the sake of autoimplementation.html's range-filling-in.
			range.setStart(img.parentNode, 1 + getNodeIndex(img));
			range.setEnd(img.parentNode, 1 + getNodeIndex(img));
			Aloha.getSelection().removeAllRanges();
			Aloha.getSelection().addRange(range);

			// IE adds width and height attributes for some reason, so remove those
			// to actually do what the spec says.
			img.removeAttribute("width");
			img.removeAttribute("height");
		}
	};

	//@}
	///// The insertLineBreak command /////
	//@{
	commands.insertlinebreak = {
		action: function (value, range) {
			// "Delete the contents of the active range, with strip wrappers false."
			deleteContents(range, {
				stripWrappers: false
			});

			// "If the active range's start node is neither editable nor an editing
			// host, abort these steps."
			if (!isEditable(range.startContainer) && !isEditingHost(range.startContainer)) {
				return;
			}

			// "If the active range's start node is an Element, and "br" is not an
			// allowed child of it, abort these steps."
			if (range.startContainer.nodeType == $_.Node.ELEMENT_NODE && !isAllowedChild("br", range.startContainer)) {
				return;
			}

			// "If the active range's start node is not an Element, and "br" is not
			// an allowed child of the active range's start node's parent, abort
			// these steps."
			if (range.startContainer.nodeType != $_.Node.ELEMENT_NODE && !isAllowedChild("br", range.startContainer.parentNode)) {
				return;
			}

			// "If the active range's start node is a Text node and its start
			// offset is zero, call collapse() on the context object's Selection,
			// with first argument equal to the active range's start node's parent
			// and second argument equal to the active range's start node's index."
			var newNode, newOffset;
			if (range.startContainer.nodeType == $_.Node.TEXT_NODE && range.startOffset == 0) {
				newNode = range.startContainer.parentNode;
				newOffset = getNodeIndex(range.startContainer);
				Aloha.getSelection().collapse(newNode, newOffset);
				range.setStart(newNode, newOffset);
				range.setEnd(newNode, newOffset);
			}

			// "If the active range's start node is a Text node and its start
			// offset is the length of its start node, call collapse() on the
			// context object's Selection, with first argument equal to the active
			// range's start node's parent and second argument equal to one plus
			// the active range's start node's index."
			if (range.startContainer.nodeType == $_.Node.TEXT_NODE && range.startOffset == getNodeLength(range.startContainer)) {
				newNode = range.startContainer.parentNode;
				newOffset = 1 + getNodeIndex(range.startContainer);
				Aloha.getSelection().collapse(newNode, newOffset);
				range.setStart(newNode, newOffset);
				range.setEnd(newNode, newOffset);
			}

			// "Let br be the result of calling createElement("br") on the context
			// object."
			var br = document.createElement("br");

			// "Call insertNode(br) on the active range."
			range.insertNode(br);

			// "Call collapse() on the context object's Selection, with br's parent
			// as the first argument and one plus br's index as the second
			// argument."
			Aloha.getSelection().collapse(br.parentNode, 1 + getNodeIndex(br));
			range.setStart(br.parentNode, 1 + getNodeIndex(br));
			range.setEnd(br.parentNode, 1 + getNodeIndex(br));

			// "If br is a collapsed line break, call createElement("br") on the
			// context object and let extra br be the result, then call
			// insertNode(extra br) on the active range."
			if (isCollapsedLineBreak(br)) {
				// TODO
				range.insertNode(createEndBreak());

				// Compensate for nonstandard implementations of insertNode
				Aloha.getSelection().collapse(br.parentNode, 1 + getNodeIndex(br));
				range.setStart(br.parentNode, 1 + getNodeIndex(br));
				range.setEnd(br.parentNode, 1 + getNodeIndex(br));
			}

			// IE7 is adding this styles: height: auto; min-height: 0px; max-height: none;
			// with that there is the ugly "IE-editable-outline"
			if (jQuery.browser.msie && jQuery.browser.version < 8) {
				br.parentNode.removeAttribute("style");
			}
		}
	};

	//@}
	///// The insertOrderedList command /////
	//@{
	commands.insertorderedlist = {
		// "Toggle lists with tag name "ol"."
		action: function (value, range) {
			toggleLists("ol", range);
		},
		// "True if the selection's list state is "mixed" or "mixed ol", false
		// otherwise."
		indeterm: function () {
			return (/^mixed( ol)?$/).test(getSelectionListState());
		},
		// "True if the selection's list state is "ol", false otherwise."
		state: function () {
			return getSelectionListState() == "ol";
		}
	};

	var listRelatedElements = {
		"LI": true,
		"DT": true,
		"DD": true
	};

	//@}
	///// The insertParagraph command /////
	//@{
	commands.insertparagraph = {
		action: function (value, range) {
			var i;

			// "Delete the contents of the active range."
			deleteContents(range);

			// clean lists in the editing host, this will remove any whitespace nodes around lists
			// because the following algorithm is not prepared to deal with them
			cleanLists(getEditingHostOf(range.startContainer), range);

			// "If the active range's start node is neither editable nor an editing
			// host, abort these steps."
			if (!isEditable(range.startContainer) && !isEditingHost(range.startContainer)) {
				return;
			}

			// "Let node and offset be the active range's start node and offset."
			var node = range.startContainer;
			var offset = range.startOffset;

			// "If node is a Text node, and offset is neither 0 nor the length of
			// node, call splitText(offset) on node."
			if (node.nodeType == $_.Node.TEXT_NODE && offset != 0 && offset != getNodeLength(node)) {
				node.splitText(offset);
			}

			// "If node is a Text node and offset is its length, set offset to one
			// plus the index of node, then set node to its parent."
			if (node.nodeType == $_.Node.TEXT_NODE && offset == getNodeLength(node)) {
				offset = 1 + getNodeIndex(node);
				node = node.parentNode;
			}

			// "If node is a Text or Comment node, set offset to the index of node,
			// then set node to its parent."
			if (node.nodeType == $_.Node.TEXT_NODE || node.nodeType == $_.Node.COMMENT_NODE) {
				offset = getNodeIndex(node);
				node = node.parentNode;
			}

			// "Call collapse(node, offset) on the context object's Selection."
			Aloha.getSelection().collapse(node, offset);
			range.setStart(node, offset);
			range.setEnd(node, offset);

			// "Let container equal node."
			var container = node;

			// "While container is not a single-line container, and container's
			// parent is editable and in the same editing host as node, set
			// container to its parent."
			while (!isSingleLineContainer(container) && isEditable(container.parentNode) && inSameEditingHost(node, container.parentNode)) {
				container = container.parentNode;
			}

			// "If container is not editable or not in the same editing host as
			// node or is not a single-line container:"
			if (!isEditable(container) || !inSameEditingHost(container, node) || !isSingleLineContainer(container)) {
				// "Let tag be the default single-line container name."
				var tag = defaultSingleLineContainerName;

				// "Block-extend the active range, and let new range be the
				// result."
				var newRange = blockExtend(range);

				// "Let node list be a list of nodes, initially empty."
				//
				// "Append to node list the first node in tree order that is
				// contained in new range and is an allowed child of "p", if any."
				var nodeList = getContainedNodes(newRange, function (node) {
					return isAllowedChild(node, "p");
				}).slice(0, 1);

				// "If node list is empty:"
				if (!nodeList.length) {
					// "If tag is not an allowed child of the active range's start
					// node, abort these steps."
					if (!isAllowedChild(tag, range.startContainer)) {
						return;
					}

					// "Set container to the result of calling createElement(tag)
					// on the context object."
					container = document.createElement(tag);

					// "Call insertNode(container) on the active range."
					range.insertNode(container);

					// "Call createElement("br") on the context object, and append
					// the result as the last child of container."
					// TODO not always
					container.appendChild(createEndBreak());

					// "Call collapse(container, 0) on the context object's
					// Selection."
					// TODO: remove selection from command
					Aloha.getSelection().collapse(container, 0);
					range.setStart(container, 0);
					range.setEnd(container, 0);

					// "Abort these steps."
					return;
				}

				// "While the nextSibling of the last member of node list is not
				// null and is an allowed child of "p", append it to node list."
				while (nodeList[nodeList.length - 1].nextSibling && isAllowedChild(nodeList[nodeList.length - 1].nextSibling, "p")) {
					nodeList.push(nodeList[nodeList.length - 1].nextSibling);
				}

				// "Wrap node list, with sibling criteria returning false and new
				// parent instructions returning the result of calling
				// createElement(tag) on the context object. Set container to the
				// result."
				container = wrap(
					nodeList,
					function () {
						return false;
					},
					function () {
						return document.createElement(tag);
					},
					range
				);
			}

			// If no container has been set yet, it is not possible to insert a paragraph at this position;
			// the following steps are skipped in order to prevent critical errors from occurring;
			if (!container) {
				return;
			}

			// "If container's local name is "address", "listing", or "pre":"
			var oldHeight, newHeight;
			if (container.tagName == "ADDRESS" || container.tagName == "LISTING" || container.tagName == "PRE") {
				// "Let br be the result of calling createElement("br") on the
				// context object."
				var br = document.createElement("br");

				// remember the old height
				oldHeight = container.offsetHeight;

				// "Call insertNode(br) on the active range."
				range.insertNode(br);

				// determine the new height
				newHeight = container.offsetHeight;

				// "Call collapse(node, offset + 1) on the context object's
				// Selection."
				Aloha.getSelection().collapse(node, offset + 1);
				range.setStart(node, offset + 1);
				range.setEnd(node, offset + 1);

				// "If br is the last descendant of container, let br be the result
				// of calling createElement("br") on the context object, then call
				// insertNode(br) on the active range." (Fix: only do this, if the container height did not change by inserting a single <br/>)
				//
				// Work around browser bugs: some browsers select the
				// newly-inserted node, not per spec.
				if (oldHeight == newHeight && !isDescendant(nextNode(br), container)) {
					// TODO check
					range.insertNode(createEndBreak());
					Aloha.getSelection().collapse(node, offset + 1);
					range.setEnd(node, offset + 1);
				}

				// "Abort these steps."
				return;
			}

			// "If container's local name is "li", "dt", or "dd"; and either it has
			// no children or it has a single child and that child is a br:"
			if (listRelatedElements[container.tagName] && (!container.hasChildNodes() || (container.childNodes.length == 1 && isNamedHtmlElement(container.firstChild, "br")))) {
				// "Split the parent of the one-node list consisting of container."
				splitParent([container], range);

				// "If container has no children, call createElement("br") on the
				// context object and append the result as the last child of
				// container."
				// only do this, if inserting the br does NOT modify the offset height of the container
				//			if (!container.hasChildNodes()) {
				//				var oldHeight = container.offsetHeight, endBr = createEndBreak();
				//				container.appendChild(endBr);
				//				if (container.offsetHeight !== oldHeight) {
				//					container.removeChild(endBr);
				//				}
				//			}

				// "If container is a dd or dt, and it is not an allowed child of
				// any of its ancestors in the same editing host, set the tag name
				// of container to the default single-line container name and let
				// container be the result."
				if (isHtmlElementInArray(container, ["dd", "dt"]) && $_(getAncestors(container)).every(function (ancestor) { return !inSameEditingHost(container, ancestor) || !isAllowedChild(container, ancestor); })) {
					container = setTagName(container, defaultSingleLineContainerName, range);
				}

				// "Fix disallowed ancestors of container."
				fixDisallowedAncestors(container, range);

				// fix invalid nested lists
				if (isNamedHtmlElement(container, 'li') && isNamedHtmlElement(container.nextSibling, "li") && isHtmlElementInArray(container.nextSibling.firstChild, ["ol", "ul"])) {
					// we found a li containing only a br followed by a li containing a list as first element: merge the two li's
					var listParent = container.nextSibling,
						length = container.nextSibling.childNodes.length;
					for (i = 0; i < length; i++) {
						// we always move the first child into the container
						container.appendChild(listParent.childNodes[0]);
					}
					listParent.parentNode.removeChild(listParent);
				}

				// "Abort these steps."
				return;
			}

			// "Let new line range be a new range whose start is the same as
			// the active range's, and whose end is (container, length of
			// container)."
			var newLineRange = Aloha.createRange();
			newLineRange.setStart(range.startContainer, range.startOffset);
			newLineRange.setEnd(container, getNodeLength(container));

			// "While new line range's start offset is zero and its start node is
			// not container, set its start to (parent of start node, index of
			// start node)."
			while (newLineRange.startOffset == 0 && newLineRange.startContainer != container) {
				newLineRange.setStart(newLineRange.startContainer.parentNode, getNodeIndex(newLineRange.startContainer));
			}

			// "While new line range's start offset is the length of its start node
			// and its start node is not container, set its start to (parent of
			// start node, 1 + index of start node)."
			while (newLineRange.startOffset == getNodeLength(newLineRange.startContainer) && newLineRange.startContainer != container) {
				newLineRange.setStart(newLineRange.startContainer.parentNode, 1 + getNodeIndex(newLineRange.startContainer));
			}

			// "Let end of line be true if new line range contains either nothing
			// or a single br, and false otherwise."
			var containedInNewLineRange = getContainedNodes(newLineRange);
			var endOfLine = !containedInNewLineRange.length || (containedInNewLineRange.length == 1 && isNamedHtmlElement(containedInNewLineRange[0], "br"));

			// "If the local name of container is "h1", "h2", "h3", "h4", "h5", or
			// "h6", and end of line is true, let new container name be the default
			// single-line container name."
			var newContainerName;
			if (/^H[1-6]$/.test(container.tagName) && endOfLine) {
				newContainerName = defaultSingleLineContainerName;

				// "Otherwise, if the local name of container is "dt" and end of line
				// is true, let new container name be "dd"."
			} else if (container.tagName == "DT" && endOfLine) {
				newContainerName = "dd";

				// "Otherwise, if the local name of container is "dd" and end of line
				// is true, let new container name be "dt"."
			} else if (container.tagName == "DD" && endOfLine) {
				newContainerName = "dt";

				// "Otherwise, let new container name be the local name of container."
			} else {
				newContainerName = container.tagName.toLowerCase();
			}

			// "Let new container be the result of calling createElement(new
			// container name) on the context object."
			var newContainer = document.createElement(newContainerName);

			// "Copy all non empty attributes of the container to new container."
			copyAttributes(container, newContainer);

			// "If new container has an id attribute, unset it."
			newContainer.removeAttribute("id");

			// "Insert new container into the parent of container immediately after
			// container."
			container.parentNode.insertBefore(newContainer, container.nextSibling);

			// "Let contained nodes be all nodes contained in new line range."
			var containedNodes = getAllContainedNodes(newLineRange);

			// "Let frag be the result of calling extractContents() on new line
			// range."
			var frag = newLineRange.extractContents();

			// "Unset the id attribute (if any) of each Element descendant of frag
			// that is not in contained nodes."
			var descendants = getDescendants(frag);
			for (i = 0; i < descendants.length; i++) {
				if (descendants[i].nodeType == $_.Node.ELEMENT_NODE && $_(containedNodes).indexOf(descendants[i]) == -1) {
					descendants[i].removeAttribute("id");
				}
			}

			var fragChildren = [],
				fragChild = frag.firstChild;
			if (fragChild) {
				do {
					if (!isWhitespaceNode(fragChild)) {
						fragChildren.push(fragChild);
					}
				} while (null != (fragChild = fragChild.nextSibling));
			}

			// if newContainer is a li and frag contains only a list, we add a br in the li (but only if the height would not change)
			if (isNamedHtmlElement(newContainer, 'li') && fragChildren.length && isHtmlElementInArray(fragChildren[0], ["ul", "ol"])) {
				oldHeight = newContainer.offsetHeight;
				var endBr = createEndBreak();
				newContainer.appendChild(endBr);
				newHeight = newContainer.offsetHeight;
				if (oldHeight !== newHeight) {
					newContainer.removeChild(endBr);
				}
			}

			// "Call appendChild(frag) on new container."
			newContainer.appendChild(frag);

			// "If container has no visible children, call createElement("br") on
			// the context object, and append the result as the last child of
			// container."
			ensureContainerEditable(container);

			// "If new container has no visible children, call createElement("br")
			// on the context object, and append the result as the last child of
			// new container."
			ensureContainerEditable(newContainer);

			// "Call collapse(new container, 0) on the context object's Selection."
			Aloha.getSelection().collapse(newContainer, 0);
			range.setStart(newContainer, 0);
			range.setEnd(newContainer, 0);
		}
	};

	//@}
	///// The insertText command /////
	//@{
	commands.inserttext = {
		action: function (value, range) {
			var i;

			// "Delete the contents of the active range, with strip wrappers
			// false."
			deleteContents(range, {
				stripWrappers: false
			});

			// "If the active range's start node is neither editable nor an editing
			// host, abort these steps."
			if (!isEditable(range.startContainer) && !isEditingHost(range.startContainer)) {
				return;
			}

			// "If value's length is greater than one:"
			if (value.length > 1) {
				// "For each element el in value, take the action for the
				// insertText command, with value equal to el."
				for (i = 0; i < value.length; i++) {
					commands.inserttext.action(value[i], range);
				}

				// "Abort these steps."
				return;
			}

			// "If value is the empty string, abort these steps."
			if (value == "") {
				return;
			}

			// "If value is a newline (U+00A0), take the action for the
			// insertParagraph command and abort these steps."
			if (value == "\n") {
				commands.insertparagraph.action('', range);
				return;
			}

			// "Let node and offset be the active range's start node and offset."
			var node = range.startContainer;
			var offset = range.startOffset;

			// "If node has a child whose index is offset − 1, and that child is a
			// Text node, set node to that child, then set offset to node's
			// length."
			if (0 <= offset - 1 && offset - 1 < node.childNodes.length && node.childNodes[offset - 1].nodeType == $_.Node.TEXT_NODE) {
				node = node.childNodes[offset - 1];
				offset = getNodeLength(node);
			}

			// "If node has a child whose index is offset, and that child is a Text
			// node, set node to that child, then set offset to zero."
			if (0 <= offset && offset < node.childNodes.length && node.childNodes[offset].nodeType == $_.Node.TEXT_NODE) {
				node = node.childNodes[offset];
				offset = 0;
			}

			// "If value is a space (U+0020), and either node is an Element whose
			// resolved value for "white-space" is neither "pre" nor "pre-wrap" or
			// node is not an Element but its parent is an Element whose resolved
			// value for "white-space" is neither "pre" nor "pre-wrap", set value
			// to a non-breaking space (U+00A0)."
			var refElement = node.nodeType == $_.Node.ELEMENT_NODE ? node : node.parentNode;
			if (value == " " && refElement.nodeType == $_.Node.ELEMENT_NODE && jQuery.inArray($_.getComputedStyle(refElement).whiteSpace, ["pre", "pre-wrap"]) == -1) {
				value = "\xa0";
			}

			// "Record current overrides, and let overrides be the result."
			var overrides = recordCurrentOverrides(range);

			// "If node is a Text node:"
			if (node.nodeType == $_.Node.TEXT_NODE) {
				// "Call insertData(offset, value) on node."
				node.insertData(offset, value);

				// "Call collapse(node, offset) on the context object's Selection."
				Aloha.getSelection().collapse(node, offset);
				range.setStart(node, offset);

				// "Call extend(node, offset + 1) on the context object's
				// Selection."
				Aloha.getSelection().extend(node, offset + 1);
				range.setEnd(node, offset + 1);

				// "Otherwise:"
			} else {
				// "If node has only one child, which is a collapsed line break,
				// remove its child from it."
				//
				// FIXME: IE incorrectly returns false here instead of true
				// sometimes?
				if (node.childNodes.length == 1 && isCollapsedLineBreak(node.firstChild)) {
					node.removeChild(node.firstChild);
				}

				// "Let text be the result of calling createTextNode(value) on the
				// context object."
				var text = document.createTextNode(value);

				// "Call insertNode(text) on the active range."
				range.insertNode(text);

				// "Call collapse(text, 0) on the context object's Selection."
				Aloha.getSelection().collapse(text, 0);
				range.setStart(text, 0);

				// "Call extend(text, 1) on the context object's Selection."
				Aloha.getSelection().extend(text, 1);
				range.setEnd(text, 1);
			}

			// "Restore states and values from overrides."
			restoreStatesAndValues(overrides, range);

			// "Canonicalize whitespace at the active range's start."
			canonicalizeWhitespace(range.startContainer, range.startOffset);

			// "Canonicalize whitespace at the active range's end."
			canonicalizeWhitespace(range.endContainer, range.endOffset);

			// "Call collapseToEnd() on the context object's Selection."
			Aloha.getSelection().collapseToEnd();
			range.collapse(false);
		}
	};

	//@}
	///// The insertUnorderedList command /////
	//@{
	commands.insertunorderedlist = {
		// "Toggle lists with tag name "ul"."
		action: function (value, range) {
			toggleLists("ul", range);
		},
		// "True if the selection's list state is "mixed" or "mixed ul", false
		// otherwise."
		indeterm: function () {
			return (/^mixed( ul)?$/).test(getSelectionListState());
		},
		// "True if the selection's list state is "ul", false otherwise."
		state: function () {
			return getSelectionListState() == "ul";
		}
	};

	//@}
	///// The justifyCenter command /////
	//@{
	commands.justifycenter = {
		// "Justify the selection with alignment "center"."
		action: function (value, range) {
			justifySelection("center", range);
		},
		indeterm: function () {
			// "Block-extend the active range. Return true if among visible
			// editable nodes that are contained in the result and have no
			// children, at least one has alignment value "center" and at least one
			// does not. Otherwise return false."
			var nodes = getAllContainedNodes(blockExtend(getActiveRange()), function (node) {
				return isEditable(node) && isVisible(node) && !node.hasChildNodes();
			});
			return $_(nodes).some(function (node) { return getAlignmentValue(node) == "center"; })
				&& $_(nodes).some(function (node) { return getAlignmentValue(node) != "center"; });
		},
		state: function () {
			// "Block-extend the active range. Return true if there is at least one
			// visible editable node that is contained in the result and has no
			// children, and all such nodes have alignment value "center".
			// Otherwise return false."
			var nodes = getAllContainedNodes(blockExtend(getActiveRange()), function (node) {
				return isEditable(node) && isVisible(node) && !node.hasChildNodes();
			});
			return nodes.length && $_(nodes).every(function (node) {
				return getAlignmentValue(node) == "center";
			});
		},
		value: function () {
			// "Block-extend the active range, and return the alignment value of
			// the first visible editable node that is contained in the result and
			// has no children. If there is no such node, return "left"."
			var nodes = getAllContainedNodes(blockExtend(getActiveRange()), function (node) {
				return isEditable(node) && isVisible(node) && !node.hasChildNodes();
			});
			if (nodes.length) {
				return getAlignmentValue(nodes[0]);
			}
			return "left";
		}
	};

	//@}
	///// The justifyFull command /////
	//@{
	commands.justifyfull = {
		// "Justify the selection with alignment "justify"."
		action: function (value, range) {
			justifySelection("justify", range);
		},
		indeterm: function () {
			// "Block-extend the active range. Return true if among visible
			// editable nodes that are contained in the result and have no
			// children, at least one has alignment value "justify" and at least
			// one does not. Otherwise return false."
			var nodes = getAllContainedNodes(blockExtend(getActiveRange()), function (node) {
				return isEditable(node) && isVisible(node) && !node.hasChildNodes();
			});
			return $_(nodes).some(function (node) { return getAlignmentValue(node) == "justify"; })
				&& $_(nodes).some(function (node) { return getAlignmentValue(node) != "justify"; });
		},
		state: function () {
			// "Block-extend the active range. Return true if there is at least one
			// visible editable node that is contained in the result and has no
			// children, and all such nodes have alignment value "justify".
			// Otherwise return false."
			var nodes = getAllContainedNodes(blockExtend(getActiveRange()), function (node) {
				return isEditable(node) && isVisible(node) && !node.hasChildNodes();
			});
			return nodes.length && $_(nodes).every(function (node) {
				return getAlignmentValue(node) == "justify";
			});
		},
		value: function () {
			// "Block-extend the active range, and return the alignment value of
			// the first visible editable node that is contained in the result and
			// has no children. If there is no such node, return "left"."
			var nodes = getAllContainedNodes(blockExtend(getActiveRange()), function (node) {
				return isEditable(node) && isVisible(node) && !node.hasChildNodes();
			});
			if (nodes.length) {
				return getAlignmentValue(nodes[0]);
			}
			return "left";
		}
	};

	//@}
	///// The justifyLeft command /////
	//@{
	commands.justifyleft = {
		// "Justify the selection with alignment "left"."
		action: function (value, range) {
			justifySelection("left", range);
		},
		indeterm: function () {
			// "Block-extend the active range. Return true if among visible
			// editable nodes that are contained in the result and have no
			// children, at least one has alignment value "left" and at least one
			// does not. Otherwise return false."
			var nodes = getAllContainedNodes(blockExtend(getActiveRange()), function (node) {
				return isEditable(node) && isVisible(node) && !node.hasChildNodes();
			});
			return $_(nodes).some(function (node) { return getAlignmentValue(node) == "left"; })
				&& $_(nodes).some(function (node) { return getAlignmentValue(node) != "left"; });
		},
		state: function () {
			// "Block-extend the active range. Return true if there is at least one
			// visible editable node that is contained in the result and has no
			// children, and all such nodes have alignment value "left".  Otherwise
			// return false."
			var nodes = getAllContainedNodes(blockExtend(getActiveRange()), function (node) {
				return isEditable(node) && isVisible(node) && !node.hasChildNodes();
			});
			return nodes.length && $_(nodes).every(function (node) {
				return getAlignmentValue(node) == "left";
			});
		},
		value: function () {
			// "Block-extend the active range, and return the alignment value of
			// the first visible editable node that is contained in the result and
			// has no children. If there is no such node, return "left"."
			var nodes = getAllContainedNodes(blockExtend(getActiveRange()), function (node) {
				return isEditable(node) && isVisible(node) && !node.hasChildNodes();
			});
			if (nodes.length) {
				return getAlignmentValue(nodes[0]);
			}
			return "left";
		}
	};

	//@}
	///// The justifyRight command /////
	//@{
	commands.justifyright = {
		// "Justify the selection with alignment "right"."
		action: function (value, range) {
			justifySelection("right", range);
		},
		indeterm: function () {
			// "Block-extend the active range. Return true if among visible
			// editable nodes that are contained in the result and have no
			// children, at least one has alignment value "right" and at least one
			// does not. Otherwise return false."
			var nodes = getAllContainedNodes(blockExtend(getActiveRange()), function (node) {
				return isEditable(node) && isVisible(node) && !node.hasChildNodes();
			});
			return $_(nodes).some(function (node) { return getAlignmentValue(node) == "right"; })
				&& $_(nodes).some(function (node) { return getAlignmentValue(node) != "right"; });
		},
		state: function () {
			// "Block-extend the active range. Return true if there is at least one
			// visible editable node that is contained in the result and has no
			// children, and all such nodes have alignment value "right".
			// Otherwise return false."
			var nodes = getAllContainedNodes(blockExtend(getActiveRange()), function (node) {
				return isEditable(node) && isVisible(node) && !node.hasChildNodes();
			});
			return nodes.length && $_(nodes).every(function (node) {
				return getAlignmentValue(node) == "right";
			});
		},
		value: function () {
			// "Block-extend the active range, and return the alignment value of
			// the first visible editable node that is contained in the result and
			// has no children. If there is no such node, return "left"."
			var nodes = getAllContainedNodes(blockExtend(getActiveRange()), function (node) {
				return isEditable(node) && isVisible(node) && !node.hasChildNodes();
			});
			if (nodes.length) {
				return getAlignmentValue(nodes[0]);
			}
			return "left";
		}
	};

	//@}
	///// The outdent command /////
	//@{
	commands.outdent = {
		action: function () {
			// "Let items be a list of all lis that are ancestor containers of the
			// range's start and/or end node."
			//
			// It's annoying to get this in tree order using functional stuff
			// without doing getDescendants(document), which is slow, so I do it
			// imperatively.
			var items = [];
			(function () {
				var ancestorContainer;
				for (ancestorContainer = getActiveRange().endContainer;
					     ancestorContainer != getActiveRange().commonAncestorContainer;
					     ancestorContainer = ancestorContainer.parentNode) {
					if (isNamedHtmlElement(ancestorContainer, "li")) {
						items.unshift(ancestorContainer);
					}
				}
				for (ancestorContainer = getActiveRange().startContainer;
					     ancestorContainer;
					     ancestorContainer = ancestorContainer.parentNode) {
					if (isNamedHtmlElement(ancestorContainer, "li")) {
						items.unshift(ancestorContainer);
					}
				}
			}());

			// "For each item in items, normalize sublists of item."
			$_(items).forEach(function (thisArg) {
				normalizeSublists(thisArg, getActiveRange());
			});

			// "Block-extend the active range, and let new range be the result."
			var newRange = blockExtend(getActiveRange());

			// "Let node list be a list of nodes, initially empty."
			//
			// "For each node node contained in new range, append node to node list
			// if the last member of node list (if any) is not an ancestor of node;
			// node is editable; and either node has no editable descendants, or is
			// an ol or ul, or is an li whose parent is an ol or ul."
			var nodeList = getContainedNodes(newRange, function (node) {
				return isEditable(node) && (!$_(getDescendants(node)).some(isEditable) || isHtmlElementInArray(node, ["ol", "ul"]) || (isNamedHtmlElement(node, 'li') && isHtmlElementInArray(node.parentNode, ["ol", "ul"])));
			});

			// "While node list is not empty:"
			while (nodeList.length) {
				// "While the first member of node list is an ol or ul or is not
				// the child of an ol or ul, outdent it and remove it from node
				// list."
				while (nodeList.length && (isHtmlElementInArray(nodeList[0], ["OL", "UL"]) || !isHtmlElementInArray(nodeList[0].parentNode, ["OL", "UL"]))) {
					outdentNode(nodeList.shift(), newRange);
				}

				// "If node list is empty, break from these substeps."
				if (!nodeList.length) {
					break;
				}

				// "Let sublist be a list of nodes, initially empty."
				var sublist = [];

				// "Remove the first member of node list and append it to sublist."
				sublist.push(nodeList.shift());

				// "While the first member of node list is the nextSibling of the
				// last member of sublist, and the first member of node list is not
				// an ol or ul, remove the first member of node list and append it
				// to sublist."
				while (nodeList.length && nodeList[0] == sublist[sublist.length - 1].nextSibling && !isHtmlElementInArray(nodeList[0], ["OL", "UL"])) {
					sublist.push(nodeList.shift());
				}

				// "Record the values of sublist, and let values be the result."
				var values = recordValues(sublist);

				// "Split the parent of sublist, with new parent null."
				splitParent(sublist, newRange);

				// "Fix disallowed ancestors of each member of sublist."
				$_(sublist).forEach(fixDisallowedAncestors);

				// "Restore the values from values."
				restoreValues(values, newRange);
			}
		}
	};

	//@}

	//////////////////////////////////
	///// Miscellaneous commands /////
	//////////////////////////////////

	///// The selectAll command /////
	//@{
	commands.selectall = {
		// Note, this ignores the whole globalRange/getActiveRange() thing and
		// works with actual selections.  Not suitable for autoimplementation.html.
		action: function () {
			// "Let target be the body element of the context object."
			var target = document.body;

			// "If target is null, let target be the context object's
			// documentElement."
			if (!target) {
				target = document.documentElement;
			}

			// "If target is null, call getSelection() on the context object, and
			// call removeAllRanges() on the result."
			if (!target) {
				Aloha.getSelection().removeAllRanges();

				// "Otherwise, call getSelection() on the context object, and call
				// selectAllChildren(target) on the result."
			} else {
				Aloha.getSelection().selectAllChildren(target);
			}
		}
	};

	//@}
	///// The styleWithCSS command /////
	//@{
	commands.stylewithcss = {
		action: function (value) {
			// "If value is an ASCII case-insensitive match for the string
			// "false", set the CSS styling flag to false. Otherwise, set the
			// CSS styling flag to true."
			cssStylingFlag = String(value).toLowerCase() != "false";
		},
		state: function () {
			return cssStylingFlag;
		}
	};

	//@}
	///// The useCSS command /////
	//@{
	commands.usecss = {
		action: function (value) {
			// "If value is an ASCII case-insensitive match for the string "false",
			// set the CSS styling flag to true. Otherwise, set the CSS styling
			// flag to false."
			cssStylingFlag = String(value).toLowerCase() == "false";
		}
	};
	//@}

	// Some final setup
	//@{
	(function () {
		// Opera 11.50 doesn't implement Object.keys, so I have to make an explicit
		// temporary, which means I need an extra closure to not leak the temporaries
		// into the global namespace.  >:(
		var commandNames = [];
		var command;
		for (command in commands) {
			if (commands.hasOwnProperty(command)) {
				commandNames.push(command);
			}
		}
		$_(commandNames).forEach(function (command) {
			// "If a command does not have a relevant CSS property specified, it
			// defaults to null."
			if (null == commands[command].relevantCssProperty) {
				commands[command].relevantCssProperty = null;
			}

			// "If a command has inline command activated values defined but
			// nothing else defines when it is indeterminate, it is indeterminate
			// if among editable Text nodes effectively contained in the active
			// range, there is at least one whose effective command value is one of
			// the given values and at least one whose effective command value is
			// not one of the given values."
			if (null != commands[command].inlineCommandActivatedValues && null == commands[command].indeterm) {
				commands[command].indeterm = function (range) {
					var values = $_(getAllEffectivelyContainedNodes(range, function (node) { return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE; }))
						.map(function (node) { return getEffectiveCommandValue(node, command); });

					var matchingValues = $_(values).filter(function (value) {
						return $_(commands[command].inlineCommandActivatedValues).indexOf(value) != -1;
					});

					return matchingValues.length >= 1 && values.length - matchingValues.length >= 1;
				};
			}

			// "If a command has inline command activated values defined, its state
			// is true if either no editable Text node is effectively contained in
			// the active range, and the active range's start node's effective
			// command value is one of the given values; or if there is at least
			// one editable Text node effectively contained in the active range,
			// and all of them have an effective command value equal to one of the
			// given values."
			if (null != commands[command].inlineCommandActivatedValues) {
				commands[command].state = function (range) {
					var nodes = getAllEffectivelyContainedNodes(range, function (node) {
						return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE;
					});

					if (nodes.length == 0) {
						return $_(commands[command].inlineCommandActivatedValues).indexOf(getEffectiveCommandValue(range.startContainer, command)) != -1;
					}
					return $_(nodes).every(function (node) {
						return $_(commands[command].inlineCommandActivatedValues).indexOf(getEffectiveCommandValue(node, command)) != -1;
					});
				};
			}

			// "If a command is a standard inline value command, it is
			// indeterminate if among editable Text nodes that are effectively
			// contained in the active range, there are two that have distinct
			// effective command values. Its value is the effective command value
			// of the first editable Text node that is effectively contained in the
			// active range, or if there is no such node, the effective command
			// value of the active range's start node."
			if (null != commands[command].standardInlineValueCommand) {
				commands[command].indeterm = function () {
					var values = $_(getAllEffectivelyContainedNodes(getActiveRange())).filter(function (node) { return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE; }, true)
						.map(function (node) { return getEffectiveCommandValue(node, command); });
					var i;
					for (i = 1; i < values.length; i++) {
						if (values[i] != values[i - 1]) {
							return true;
						}
					}
					return false;
				};

				commands[command].value = function (range) {
					var refNode = getAllEffectivelyContainedNodes(range, function (node) {
						return isEditable(node) && node.nodeType == $_.Node.TEXT_NODE;
					})[0];

					if (typeof refNode == "undefined") {
						refNode = range.startContainer;
					}

					return getEffectiveCommandValue(refNode, command);
				};
			}
		});
	}());
	//@}
	return {
		commands: commands,
		execCommand: myExecCommand,
		queryCommandIndeterm: myQueryCommandIndeterm,
		queryCommandState: myQueryCommandState,
		queryCommandValue: myQueryCommandValue,
		queryCommandEnabled: myQueryCommandEnabled,
		queryCommandSupported: myQueryCommandSupported,
		copyAttributes: copyAttributes,
		createEndBreak: createEndBreak,
		isEndBreak: isEndBreak,
		ensureContainerEditable: ensureContainerEditable,
		isEditingHost: isEditingHost,
		isEditable: isEditable,
		getStateOverride: getStateOverride,
		setStateOverride: setStateOverride,
		resetOverrides: resetOverrides,
		unsetStateOverride: unsetStateOverride
	};
}); // end define
// vim: foldmarker=@{,@} foldmethod=marker
;
/* selection.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('aloha/selection',[
	'aloha/core',
	'jquery',
	'util/class',
	'util/range',
	'util/arrays',
	'util/strings',
	'aloha/console',
	'PubSub',
	'aloha/engine',
	'aloha/ecma5shims',
	'aloha/rangy-core'
], function (
	Aloha,
	jQuery,
	Class,
	Range,
	Arrays,
	Strings,
	console,
	PubSub,
	Engine,
	e5s
) {
	

	var GENTICS = window.GENTICS;

	function isCollapsedAndEmptyOrEndBr(rangeObject) {
		var firstChild;
		if (rangeObject.startContainer !== rangeObject.endContainer) {
			return false;
		}
		// check whether the container starts in an element node
		if (rangeObject.startContainer.nodeType != 1) {
			return false;
		}
		firstChild = rangeObject.startContainer.firstChild;
		return (!firstChild || (!firstChild.nextSibling && firstChild.nodeName == 'BR'));
	}

	function isCollapsedAndEndBr(rangeObject) {
		if (rangeObject.startContainer !== rangeObject.endContainer) {
			return false;
		}
		if (rangeObject.startContainer.nodeType != 1) {
			return false;
		}
		return Engine.isEndBreak(rangeObject.startContainer);
	}

	var prevStartContext = null;
	var prevEndContext = null;

	function makeContextHtml(node, parents) {
		var result = [],
			parent,
			len,
			i;
		if (1 === node.nodeType && node.nodeName !== 'BODY' && node.nodeName !== 'HTML') {
			result.push(node.cloneNode(false).outerHTML);
		} else {
			result.push('#' + node.nodeType);
		}
		for (i = 0, len = parents.length; i < len; i++) {
			parent = parents[i];
			if (parent.nodeName === 'BODY' || parent.nodeName === 'HTML') {
				// Although we limit the ancestors in most cases to the
				// active editable, in some cases (copy&paste) the
				// parent may be outside.
				// On IE7 this means the following code may clone the
				// HTML node too, which causes the browser to crash.
				// On other browsers, this is just an optimization
				// because the body and html elements should probably
				// not be considered part of the context of an edit
				// operation.
				break;
			}
			result.push(parent.cloneNode(false).outerHTML);
		}
		return result.join('');
	}

	function getChangedContext(node, context) {
		var until = Aloha.activeEditable ? Aloha.activeEditable.obj.parent()[0] : null;
		var parents = jQuery(node).parentsUntil(until).get();
		var html = makeContextHtml(node, parents);
		var equal = (context && node === context.node && Arrays.equal(context.parents, parents) && html === context.html);
		return equal ? null : {
			node: node,
			parents: parents,
			html: html
		};
	}

	function triggerSelectionContextChanged(rangeObject, event) {
		var startContainer = rangeObject.startContainer;
		var endContainer = rangeObject.endContainer;
		if (!startContainer || !endContainer) {
			console.warn("aloha/selection", "encountered range object without start or end container");
			return;
		}
		var startContext = getChangedContext(startContainer, prevStartContext);
		var endContext = getChangedContext(endContainer, prevEndContext);
		if (!startContext && !endContext) {
			return;
		}
		prevStartContext = startContext;
		prevEndContext = endContext;

		/**
		 * @api documented in the guides
		 */
		PubSub.pub('aloha.selection.context-change', {
			range: rangeObject,
			event: event
		});
	}

	/**
	 * @namespace Aloha
	 * @class Selection
	 * This singleton class always represents the current user selection
	 * @singleton
	 */
	var Selection = Class.extend({
		_constructor: function () {
			// Pseudo Range Clone being cleaned up for better HTML wrapping support
			this.rangeObject = {};

			this.preventSelectionChangedFlag = false; // will remember if someone urged us to skip the next aloha-selection-changed event

			// define basics first
			this.tagHierarchy = {
				'textNode': {},
				'abbr': {
					'textNode': true
				},
				'b': {
					'textNode': true,
					'b': true,
					'i': true,
					'em': true,
					'sup': true,
					'sub': true,
					'br': true,
					'span': true,
					'img': true,
					'a': true,
					'del': true,
					'ins': true,
					'u': true,
					'cite': true,
					'q': true,
					'code': true,
					'abbr': true,
					'strong': true
				},
				'pre': {
					'textNode': true,
					'b': true,
					'i': true,
					'em': true,
					'sup': true,
					'sub': true,
					'br': true,
					'span': true,
					'img': true,
					'a': true,
					'del': true,
					'ins': true,
					'u': true,
					'cite': true,
					'q': true,
					'code': true,
					'abbr': true
				},
				'blockquote': {
					'textNode': true,
					'b': true,
					'i': true,
					'em': true,
					'sup': true,
					'sub': true,
					'br': true,
					'span': true,
					'img': true,
					'a': true,
					'del': true,
					'ins': true,
					'u': true,
					'cite': true,
					'q': true,
					'code': true,
					'abbr': true,
					'p': true,
					'h1': true,
					'h2': true,
					'h3': true,
					'h4': true,
					'h5': true,
					'h6': true
				},
				'ins': {
					'textNode': true,
					'b': true,
					'i': true,
					'em': true,
					'sup': true,
					'sub': true,
					'br': true,
					'span': true,
					'img': true,
					'a': true,
					'u': true,
					'p': true,
					'h1': true,
					'h2': true,
					'h3': true,
					'h4': true,
					'h5': true,
					'h6': true
				},
				'ul': {
					'li': true
				},
				'ol': {
					'li': true
				},
				'li': {
					'textNode': true,
					'b': true,
					'i': true,
					'em': true,
					'sup': true,
					'sub': true,
					'br': true,
					'span': true,
					'img': true,
					'ul': true,
					'ol': true,
					'h1': true,
					'h2': true,
					'h3': true,
					'h4': true,
					'h5': true,
					'h6': true,
					'del': true,
					'ins': true,
					'u': true,
					'a': true
				},
				'tr': {
					'td': true,
					'th': true
				},
				'table': {
					'tr': true
				},
				'div': {
					'textNode': true,
					'b': true,
					'i': true,
					'em': true,
					'sup': true,
					'sub': true,
					'br': true,
					'span': true,
					'img': true,
					'ul': true,
					'ol': true,
					'table': true,
					'h1': true,
					'h2': true,
					'h3': true,
					'h4': true,
					'h5': true,
					'h6': true,
					'del': true,
					'ins': true,
					'u': true,
					'p': true,
					'div': true,
					'pre': true,
					'blockquote': true,
					'a': true
				},
				'h1': {
					'textNode': true,
					'b': true,
					'i': true,
					'em': true,
					'sup': true,
					'sub': true,
					'br': true,
					'span': true,
					'img': true,
					'a': true,
					'del': true,
					'ins': true,
					'u': true
				}
			};

			// now reference the basics for all other equal tags (important: don't forget to include
			// the basics itself as reference: 'b' : this.tagHierarchy.b
			this.tagHierarchy = {
				'textNode': this.tagHierarchy.textNode,
				'abbr': this.tagHierarchy.abbr,
				'br': this.tagHierarchy.textNode,
				'img': this.tagHierarchy.textNode,
				'b': this.tagHierarchy.b,
				'strong': this.tagHierarchy.b,
				'code': this.tagHierarchy.b,
				'q': this.tagHierarchy.b,
				'blockquote': this.tagHierarchy.blockquote,
				'cite': this.tagHierarchy.b,
				'i': this.tagHierarchy.b,
				'em': this.tagHierarchy.b,
				'sup': this.tagHierarchy.b,
				'sub': this.tagHierarchy.b,
				'span': this.tagHierarchy.b,
				'del': this.tagHierarchy.del,
				'ins': this.tagHierarchy.ins,
				'u': this.tagHierarchy.b,
				'p': this.tagHierarchy.b,
				'pre': this.tagHierarchy.pre,
				'a': this.tagHierarchy.b,
				'ul': this.tagHierarchy.ul,
				'ol': this.tagHierarchy.ol,
				'li': this.tagHierarchy.li,
				'td': this.tagHierarchy.li,
				'div': this.tagHierarchy.div,
				'h1': this.tagHierarchy.h1,
				'h2': this.tagHierarchy.h1,
				'h3': this.tagHierarchy.h1,
				'h4': this.tagHierarchy.h1,
				'h5': this.tagHierarchy.h1,
				'h6': this.tagHierarchy.h1,
				'table': this.tagHierarchy.table
			};

			// When applying this elements to selection they will replace the assigned elements
			this.replacingElements = {
				'h1': {
					'p': true,
					'h1': true,
					'h2': true,
					'h3': true,
					'h4': true,
					'h5': true,
					'h6': true,
					'pre': true,
					'blockquote': true
				}
			};
			this.replacingElements = {
				'h1': this.replacingElements.h1,
				'h2': this.replacingElements.h1,
				'h3': this.replacingElements.h1,
				'h4': this.replacingElements.h1,
				'h5': this.replacingElements.h1,
				'h6': this.replacingElements.h1,
				'pre': this.replacingElements.h1,
				'p': this.replacingElements.h1,
				'blockquote': this.replacingElements.h1
			};
			this.allowedToStealElements = {
				'h1': {
					'textNode': true
				}
			};
			this.allowedToStealElements = {
				'h1': this.allowedToStealElements.h1,
				'h2': this.allowedToStealElements.h1,
				'h3': this.allowedToStealElements.h1,
				'h4': this.allowedToStealElements.h1,
				'h5': this.allowedToStealElements.h1,
				'h6': this.allowedToStealElements.h1,
				'p': this.tagHierarchy.b
			};
		},

		/**
		 * Class definition of a SelectionTree (relevant for all formatting / markup changes)
		 * TODO: remove this (was moved to range.js)
		 * Structure:
		 * +
		 * |-domobj: <reference to the DOM Object> (NOT jQuery)
		 * |-selection: defines if this node is marked by user [none|partial|full]
		 * |-children: recursive structure like this
		 * @hide
		 */
		SelectionTree: function () {
			this.domobj = {};
			this.selection = undefined;
			this.children = [];
		},

		/**
		 * INFO: Method is used for integration with Gentics Aloha, has no use otherwise
		 * Updates the rangeObject according to the current user selection
		 * Method is always called on selection change
		 * @param objectClicked Object that triggered the selectionChange event
		 * @return true when rangeObject was modified, false otherwise
		 * @hide
		 */
		onChange: function (objectClicked, event, timeout) {
			if (this.updateSelectionTimeout) {
				window.clearTimeout(this.updateSelectionTimeout);
			}

			// We have to update the selection in a timeout due to an IE
			// bug that is is caused by selecting some text and then
			// clicking once inside the selection (which collapses the
			// selection inside the previous selection).
			var selection = this;
			this.updateSelectionTimeout = window.setTimeout(function () {
				var range = new Aloha.Selection.SelectionRange(true);
				// We have to work around an IE bug that causes the user
				// selection to be incorrectly set on the body element
				// when the updateSelectionTimeout triggers. The
				// selection corrects itself after waiting a while.
				if (!range.startContainer || 'HTML' === range.startContainer.nodeName || 'BODY' === range.startContainer.nodeName) {
					if (!this.updateSelectionTimeout) {
						// First wait 5 millis, then 20 millis, 50 millis, 110 millis etc.
						selection.onChange(objectClicked, event, 10 + (timeout || 5) * 2);
					}
					return;
				}
				Aloha.Selection._updateSelection(event, range);
			}, timeout || 5);
		},

		/**
		 * prevents the next aloha-selection-changed event from being triggered
		 */
		preventSelectionChanged: function () {
			this.preventSelectionChangedFlag = true;
		},

		/**
		 * will return wheter selection change event was prevented or not, and reset the preventSelectionChangedFlag
		 * @return {Boolean} true if aloha-selection-change event was prevented
		 */
		isSelectionChangedPrevented: function () {
			var prevented = this.preventSelectionChangedFlag;
			this.preventSelectionChangedFlag = false;
			return prevented;
		},

		/**
		 * Checks if the current rangeObject common ancector container is edtiable
		 * @return {Boolean} true if current common ancestor is editable
		 */
		isSelectionEditable: function () {
			return (this.rangeObject.commonAncestorContainer && jQuery(this.rangeObject.commonAncestorContainer).contentEditable());
		},

		/**
		 * This method checks, if the current rangeObject common ancestor container has a 'data-aloha-floatingmenu-visible' Attribute.
		 * Needed in Floating Menu for exceptional display of floatingmenu.
		 */
		isFloatingMenuVisible: function () {
			var visible = jQuery(Aloha.Selection.rangeObject.commonAncestorContainer).attr('data-aloha-floatingmenu-visible');
			if (visible !== 'undefined') {
				if (visible === 'true') {
					return true;
				}
				return false;
			}
			return false;
		},

		/**
		 * INFO: Method is used for integration with Gentics Aloha, has no use otherwise
		 * Updates the rangeObject according to the current user selection
		 * Method is always called on selection change
		 * @param event jQuery browser event object
		 * @return true when rangeObject was modified, false otherwise
		 * @hide
		 */
		updateSelection: function (event) {
			return this._updateSelection(event, null);
		},

		/**
		 * Internal version of updateSelection that adds the range parameter to be
		 * able to work around an IE bug that caused the current user selection
		 * sometimes to be on the body element.
		 * @param {Object} event
		 * @param {Object} range a substitute for the current user selection. if not provided,
		 *   the current user selection will be used.
		 * @hide
		 */
		_updateSelection: function (event, range) {
			if (event && event.originalEvent &&
					true === event.originalEvent.stopSelectionUpdate) {
				return false;
			}

			if (typeof range === 'undefined') {
				return false;
			}

			this.rangeObject = range =
					range || new Aloha.Selection.SelectionRange(true);

			// Determine the common ancestor container and update the selection
			// tree.
			range.update();

			// Workaround for nasty IE bug that allows the user to select
			// text nodes inside areas with contenteditable "false"
			if (range && range.startContainer && range.endContainer) {
				var inEditable =
						jQuery(range.commonAncestorContainer)
							.closest('.aloha-editable').length > 0;

				if (inEditable) {
					var validStartPosition = !(3 === range.startContainer.nodeType &&
							!jQuery(range.startContainer.parentNode).contentEditable());

					var validEndPosition = !(3 === range.endContainer.nodeType &&
							!jQuery(range.endContainer.parentNode).contentEditable());

					if (!validStartPosition || !validEndPosition) {
						Aloha.getSelection().removeAllRanges();
						return true;
					}
				}
			}

			// check if aloha-selection-changed event has been prevented
			if (this.isSelectionChangedPrevented()) {
				return true;
			}

			Aloha.trigger('aloha-selection-changed-before', [this.rangeObject, event]);

			// throw the event that the selection has changed. Plugins now have the
			// chance to react on the currentElements[childCount].children.lengthged selection
			Aloha.trigger('aloha-selection-changed', [this.rangeObject, event]);

			triggerSelectionContextChanged(this.rangeObject, event);

			Aloha.trigger('aloha-selection-changed-after', [this.rangeObject, event]);

			return true;
		},

		/**
		 * creates an object with x items containing all relevant dom objects.
		 * Structure:
		 * +
		 * |-domobj: <reference to the DOM Object> (NOT jQuery)
		 * |-selection: defines if this node is marked by user [none|partial|full]
		 * |-children: recursive structure like this ("x.." because it's then shown last in DOM Browsers...)
		 * TODO: remove this (was moved to range.js)
		 *
		 * @param rangeObject "Aloha clean" range object including a commonAncestorContainer
		 * @return obj selection
		 * @hide
		 */
		getSelectionTree: function (rangeObject) {
			if (!rangeObject) { // if called without any parameters, the method acts as getter for this.selectionTree
				return this.rangeObject.getSelectionTree();
			}
			if (!rangeObject.commonAncestorContainer) {
				Aloha.Log.error(this, 'the rangeObject is missing the commonAncestorContainer');
				return false;
			}

			this.inselection = false;

			// before getting the selection tree, we do a cleanup
			if (GENTICS.Utils.Dom.doCleanup({ 'merge': true }, rangeObject)) {
				rangeObject.update();
				rangeObject.select();
			}

			return this.recursiveGetSelectionTree(rangeObject, rangeObject.commonAncestorContainer);
		},

		/**
		 * Recursive inner function for generating the selection tree.
		 * TODO: remove this (was moved to range.js)
		 * @param rangeObject range object
		 * @param currentObject current DOM object for which the selection tree shall be generated
		 * @return array of SelectionTree objects for the children of the current DOM object
		 * @hide
		 */
		recursiveGetSelectionTree: function (rangeObject, currentObject) {
			// get all direct children of the given object
			var jQueryCurrentObject = jQuery(currentObject),
				childCount = 0,
				that = this,
				currentElements = [];

			jQueryCurrentObject.contents().each(function (index) {
				var selectionType = 'none',
					startOffset = false,
					endOffset = false,
					collapsedFound = false,
					i,
				    elementsLength,
					noneFound = false,
					partialFound = false,
					fullFound = false;

				// check for collapsed selections between nodes
				if (rangeObject.isCollapsed() && currentObject === rangeObject.startContainer && rangeObject.startOffset == index) {
					// insert an extra selectiontree object for the collapsed selection here
					currentElements[childCount] = new Aloha.Selection.SelectionTree();
					currentElements[childCount].selection = 'collapsed';
					currentElements[childCount].domobj = undefined;
					that.inselection = false;
					collapsedFound = true;
					childCount++;
				}

				if (!that.inselection && !collapsedFound) {
					// the start of the selection was not yet found, so look for it now
					// check whether the start of the selection is found here

					// Try to read the nodeType property and return if we do not have permission
					// ie.: frame document to an external URL
					var nodeType;
					try {
						nodeType = this.nodeType;
					} catch (e) {
						return;
					}

					// check is dependent on the node type
					switch (nodeType) {
					case 3:
						// text node
						if (this === rangeObject.startContainer) {
							// the selection starts here
							that.inselection = true;

							// when the startoffset is > 0, the selection type is only partial
							selectionType = rangeObject.startOffset > 0 ? 'partial' : 'full';
							startOffset = rangeObject.startOffset;
							endOffset = this.length;
						}
						break;
					case 1:
						// element node
						if (this === rangeObject.startContainer && rangeObject.startOffset === 0) {
							// the selection starts here
							that.inselection = true;
							selectionType = 'full';
						}
						if (currentObject === rangeObject.startContainer && rangeObject.startOffset === index) {
							// the selection starts here
							that.inselection = true;
							selectionType = 'full';
						}
						break;
					}
				}

				if (that.inselection && !collapsedFound) {
					if (selectionType == 'none') {
						selectionType = 'full';
					}
					// we already found the start of the selection, so look for the end of the selection now
					// check whether the end of the selection is found here

					switch (this.nodeType) {
					case 3:
						// text node
						if (this === rangeObject.endContainer) {
							// the selection ends here
							that.inselection = false;

							// check for partial selection here
							if (rangeObject.endOffset < this.length) {
								selectionType = 'partial';
							}
							if (startOffset === false) {
								startOffset = 0;
							}
							endOffset = rangeObject.endOffset;
						}
						break;
					case 1:
						// element node
						if (this === rangeObject.endContainer && rangeObject.endOffset === 0) {
							that.inselection = false;
						}
						break;
					}
					if (currentObject === rangeObject.endContainer && rangeObject.endOffset <= index) {
						that.inselection = false;
						selectionType = 'none';
					}
				}

				// create the current selection tree entry
				currentElements[childCount] = new Aloha.Selection.SelectionTree();
				currentElements[childCount].domobj = this;
				currentElements[childCount].selection = selectionType;
				if (selectionType == 'partial') {
					currentElements[childCount].startOffset = startOffset;
					currentElements[childCount].endOffset = endOffset;
				}

				// now do the recursion step into the current object
				currentElements[childCount].children = that.recursiveGetSelectionTree(rangeObject, this);
				elementsLength = currentElements[childCount].children.length;

				// check whether a selection was found within the children
				if (elementsLength > 0) {
					for (i = 0; i < elementsLength; ++i) {
						switch (currentElements[childCount].children[i].selection) {
						case 'none':
							noneFound = true;
							break;
						case 'full':
							fullFound = true;
							break;
						case 'partial':
							partialFound = true;
							break;
						}
					}

					if (partialFound || (fullFound && noneFound)) {
						// found at least one 'partial' selection in the children, or both 'full' and 'none', so this element is also 'partial' selected
						currentElements[childCount].selection = 'partial';
					} else if (fullFound && !partialFound && !noneFound) {
						// only found 'full' selected children, so this element is also 'full' selected
						currentElements[childCount].selection = 'full';
					}
				}

				childCount++;
			});

			// extra check for collapsed selections at the end of the current element
			if (rangeObject.isCollapsed() && currentObject === rangeObject.startContainer && rangeObject.startOffset == currentObject.childNodes.length) {
				currentElements[childCount] = new Aloha.Selection.SelectionTree();
				currentElements[childCount].selection = 'collapsed';
				currentElements[childCount].domobj = undefined;
			}

			return currentElements;
		},

		/**
		 * Get the currently selected range
		 * @return {Aloha.Selection.SelectionRange} currently selected range
		 * @method
		 */
		getRangeObject: function () {
			return this.rangeObject;
		},

		/**
		 * method finds out, if a node is within a certain markup or not
		 * @param rangeObj Aloha rangeObject
		 * @param startOrEnd boolean; defines, if start or endContainer should be used: false for start, true for end
		 * @param markupObject jQuery object of the markup to look for
		 * @param tagComparator method, which is used to compare the dom object and the jQuery markup object. the method must accept 2 parameters, the first is the domobj, the second is the jquery object. if no method is specified, the method this.standardTextLevelSemanticsComparator is used
		 * @param limitObject dom object which limits the search are within the dom. normally this will be the active Editable
		 * @return true, if the markup is effective on the range objects start or end node
		 * @hide
		 */
		isRangeObjectWithinMarkup: function (rangeObject, startOrEnd, markupObject, tagComparator, limitObject) {
			var domObj = !startOrEnd ? rangeObject.startContainer : rangeObject.endContainer,
				that = this,
				parents = jQuery(domObj).parents(),
				returnVal = false,
				i = -1;

			// check if a comparison method was passed as parameter ...
			if (typeof tagComparator !== 'undefined' && typeof tagComparator !== 'function') {
				Aloha.Log.error(this, 'parameter tagComparator is not a function');
			}
			// ... if not use this as standard tag comparison method
			if (typeof tagComparator === 'undefined') {
				tagComparator = function (domobj, markupObject) {
					return that.standardTextLevelSemanticsComparator(domobj, markupObject); // TODO should actually be this.getStandardTagComparator(markupObject)
				};
			}

			if (parents.length > 0) {
				parents.each(function () {
					// the limit object was reached (normally the Editable Element)
					if (this === limitObject) {
						Aloha.Log.debug(that, 'reached limit dom obj');
						return false; // break() of jQuery .each(); THIS IS NOT THE FUNCTION RETURN VALUE
					}
					if (tagComparator(this, markupObject)) {
						if (returnVal === false) {
							returnVal = [];
						}
						Aloha.Log.debug(that, 'reached object equal to markup');
						i++;
						returnVal[i] = this;
						return true; // continue() of jQuery .each(); THIS IS NOT THE FUNCTION RETURN VALUE
					}
				});
			}
			return returnVal;
		},

		/**
		 * standard method, to compare a domobj and a jquery object for sections and grouping content (e.g. p, h1, h2, ul, ....).
		 * is always used when no other tag comparator is passed as parameter
		 * @param domobj domobject to compare with markup
		 * @param markupObject jQuery object of the markup to compare with domobj
		 * @return true if objects are equal and false if not
		 * @hide
		 */
		standardSectionsAndGroupingContentComparator: function (domobj, markupObject) {
			if (domobj.nodeType !== 1) {
				Aloha.Log.debug(this, 'only element nodes (nodeType == 1) can be compared');
				return false;
			}
			if (!markupObject[0].nodeName) {
				return false;
			}
			var elemMap = Aloha.Selection.replacingElements[domobj.nodeName.toLowerCase()];
			return elemMap && elemMap[markupObject[0].nodeName.toLowerCase()];
		},

		/**
		 * standard method, to compare a domobj and a jquery object for their tagName (aka span elements, e.g. b, i, sup, span, ...).
		 * is always used when no other tag comparator is passed as parameter
		 * @param domobj domobject to compare with markup
		 * @param markupObject jQuery object of the markup to compare with domobj
		 * @return true if objects are equal and false if not
		 * @hide
		 */
		standardTagNameComparator: function (domobj, markupObject) {
			if (domobj.nodeType === 1) {
				if (domobj.nodeName != markupObject[0].nodeName) {
					return false;
				}
				return true;
			}
			Aloha.Log.debug(this, 'only element nodes (nodeType == 1) can be compared');
			return false;
		},

		/**
		 * standard method, to compare a domobj and a jquery object for text level semantics (aka span elements, e.g. b, i, sup, span, ...).
		 * is always used when no other tag comparator is passed as parameter
		 * @param domobj domobject to compare with markup
		 * @param markupObject jQuery object of the markup to compare with domobj
		 * @return true if objects are equal and false if not
		 * @hide
		 */
		standardTextLevelSemanticsComparator: function (domobj, markupObject) {
			// only element nodes can be compared
			if (domobj.nodeType === 1) {
				if (domobj.nodeName != markupObject[0].nodeName) {
					return false;
				}
				if (!this.standardAttributesComparator(domobj, markupObject)) {
					return false;
				}
				return true;
			}
			Aloha.Log.debug(this, 'only element nodes (nodeType == 1) can be compared');
			return false;
		},


		/**
		 * standard method, to compare attributes of one dom obj and one markup obj (jQuery)
		 * @param domobj domobject to compare with markup
		 * @param markupObject jQuery object of the markup to compare with domobj
		 * @return true if objects are equal and false if not
		 * @hide
		 */
		standardAttributesComparator: function (domobj, markupObject) {
			var classesA = Strings.words((domobj && domobj.className) || '');
			var classesB = Strings.words((markupObject.length && markupObject[0].className) || '');
			Arrays.sortUnique(classesA);
			Arrays.sortUnique(classesB);
			return Arrays.equal(classesA, classesB);
		},

		/**
		 * method finds out, if a node is within a certain markup or not
		 * @param rangeObj Aloha rangeObject
		 * @param markupObject jQuery object of the markup to be applied (e.g. created with obj = jQuery('<b></b>'); )
		 * @param tagComparator method, which is used to compare the dom object and the jQuery markup object. the method must accept 2 parameters, the first is the domobj, the second is the jquery object. if no method is specified, the method this.standardTextLevelSemanticsComparator is used
		 * @return void; TODO: should return true if the markup applied successfully and false if not
		 * @hide
		 */
		changeMarkup: function (rangeObject, markupObject, tagComparator) {
			var tagName = markupObject[0].tagName.toLowerCase(),
				newCAC,
			    limitObject,
				backupRangeObject,
				relevantMarkupObjectsAtSelectionStart = this.isRangeObjectWithinMarkup(rangeObject, false, markupObject, tagComparator, limitObject),
				relevantMarkupObjectsAtSelectionEnd = this.isRangeObjectWithinMarkup(rangeObject, true, markupObject, tagComparator, limitObject),
				nextSibling,
			    relevantMarkupObjectAfterSelection,
				prevSibling,
			    relevantMarkupObjectBeforeSelection,
				extendedRangeObject;
			var parentElement;

			// if the element is a replacing element (like p/h1/h2/h3/h4/h5/h6...), which must not wrap each other
			// use a clone of rangeObject
			if (this.replacingElements[tagName]) {
				// backup rangeObject for later selection;
				backupRangeObject = rangeObject;

				// create a new range object to not modify the orginal
				rangeObject = new this.SelectionRange(rangeObject);

				// either select the active Editable as new commonAncestorContainer (CAC) or use the body
				if (Aloha.activeEditable) {
					newCAC = Aloha.activeEditable.obj.get(0);
				} else {
					newCAC = jQuery('body');
				}
				// update rangeObject by setting the newCAC and automatically recalculating the selectionTree
				rangeObject.update(newCAC);

				// store the information, that the markupObject can be replaced (not must be!!) inside the jQuery markup object
				markupObject.isReplacingElement = true;
			} else {
				// if the element is NOT a replacing element, then something needs to be selected, otherwise it can not be wrapped
				// therefor the method can return false, if nothing is selected ( = rangeObject is collapsed)
				if (rangeObject.isCollapsed()) {
					Aloha.Log.debug(this, 'early returning from applying markup because nothing is currently selected');
					return false;
				}
			}

			// is Start/End DOM Obj inside the markup to change
			if (Aloha.activeEditable) {
				limitObject = Aloha.activeEditable.obj[0];
			} else {
				limitObject = jQuery('body');
			}

			if (!markupObject.isReplacingElement && rangeObject.startOffset === 0) { // don't care about replacers, because they never extend
				if (null != (prevSibling = this.getTextNodeSibling(false, rangeObject.commonAncestorContainer.parentNode, rangeObject.startContainer))) {
					relevantMarkupObjectBeforeSelection = this.isRangeObjectWithinMarkup({
						startContainer: prevSibling,
						startOffset: 0
					}, false, markupObject, tagComparator, limitObject);
				}
			}
			if (!markupObject.isReplacingElement && (rangeObject.endOffset === rangeObject.endContainer.length)) { // don't care about replacers, because they never extend
				if (null != (nextSibling = this.getTextNodeSibling(true, rangeObject.commonAncestorContainer.parentNode, rangeObject.endContainer))) {
					relevantMarkupObjectAfterSelection = this.isRangeObjectWithinMarkup({
						startContainer: nextSibling,
						startOffset: 0
					}, false, markupObject, tagComparator, limitObject);
				}
			}

			// decide what to do (expand or reduce markup)
			// Alternative A: from markup to no-markup: markup will be removed in selection;
			// reapplied from original markup start to selection start
			if (!markupObject.isReplacingElement && (relevantMarkupObjectsAtSelectionStart && !relevantMarkupObjectsAtSelectionEnd)) {
				Aloha.Log.info(this, 'markup 2 non-markup');
				this.prepareForRemoval(rangeObject.getSelectionTree(), markupObject, tagComparator);
				jQuery(relevantMarkupObjectsAtSelectionStart).addClass('preparedForRemoval');
				this.insertCroppedMarkups(relevantMarkupObjectsAtSelectionStart, rangeObject, false, tagComparator);
			} else if (!markupObject.isReplacingElement && relevantMarkupObjectsAtSelectionStart && relevantMarkupObjectsAtSelectionEnd) {
				// Alternative B: from markup to markup:
				// remove selected markup (=split existing markup if single, shrink if two different)
				Aloha.Log.info(this, 'markup 2 markup');
				this.prepareForRemoval(rangeObject.getSelectionTree(), markupObject, tagComparator);
				this.splitRelevantMarkupObject(relevantMarkupObjectsAtSelectionStart, relevantMarkupObjectsAtSelectionEnd, rangeObject, tagComparator);
			} else if (!markupObject.isReplacingElement && ((!relevantMarkupObjectsAtSelectionStart && relevantMarkupObjectsAtSelectionEnd) || relevantMarkupObjectAfterSelection || relevantMarkupObjectBeforeSelection)) { //
				// Alternative C: from no-markup to markup OR with next2markup:
				// new markup is wrapped from selection start to end of originalmarkup, original is remove afterwards
				Aloha.Log.info(this, 'non-markup 2 markup OR with next2markup');
				// move end of rangeObject to end of relevant markups
				if (relevantMarkupObjectBeforeSelection && relevantMarkupObjectAfterSelection) {
					extendedRangeObject = new Aloha.Selection.SelectionRange(rangeObject);
					extendedRangeObject.startContainer = jQuery(relevantMarkupObjectBeforeSelection[relevantMarkupObjectBeforeSelection.length - 1]).textNodes()[0];
					extendedRangeObject.startOffset = 0;
					extendedRangeObject.endContainer = jQuery(relevantMarkupObjectAfterSelection[relevantMarkupObjectAfterSelection.length - 1]).textNodes().last()[0];
					extendedRangeObject.endOffset = extendedRangeObject.endContainer.length;
					extendedRangeObject.update();
					this.applyMarkup(extendedRangeObject.getSelectionTree(), rangeObject, markupObject, tagComparator);
					Aloha.Log.info(this, 'double extending previous markup(previous and after selection), actually wrapping it ...');

				} else if (relevantMarkupObjectBeforeSelection && !relevantMarkupObjectAfterSelection && !relevantMarkupObjectsAtSelectionEnd) {
					this.extendExistingMarkupWithSelection(relevantMarkupObjectBeforeSelection, rangeObject, false, tagComparator);
					Aloha.Log.info(this, 'extending previous markup');

				} else if (relevantMarkupObjectBeforeSelection && !relevantMarkupObjectAfterSelection && relevantMarkupObjectsAtSelectionEnd) {
					extendedRangeObject = new Aloha.Selection.SelectionRange(rangeObject);
					extendedRangeObject.startContainer = jQuery(relevantMarkupObjectBeforeSelection[relevantMarkupObjectBeforeSelection.length - 1]).textNodes()[0];
					extendedRangeObject.startOffset = 0;
					extendedRangeObject.endContainer = jQuery(relevantMarkupObjectsAtSelectionEnd[relevantMarkupObjectsAtSelectionEnd.length - 1]).textNodes().last()[0];
					extendedRangeObject.endOffset = extendedRangeObject.endContainer.length;
					extendedRangeObject.update();
					this.applyMarkup(extendedRangeObject.getSelectionTree(), rangeObject, markupObject, tagComparator);
					Aloha.Log.info(this, 'double extending previous markup(previous and relevant at the end), actually wrapping it ...');

				} else if (!relevantMarkupObjectBeforeSelection && relevantMarkupObjectAfterSelection) {
					this.extendExistingMarkupWithSelection(relevantMarkupObjectAfterSelection, rangeObject, true, tagComparator);
					Aloha.Log.info(this, 'extending following markup backwards');

				} else {
					this.extendExistingMarkupWithSelection(relevantMarkupObjectsAtSelectionEnd, rangeObject, true, tagComparator);
				}
			} else if (markupObject.isReplacingElement || (!relevantMarkupObjectsAtSelectionStart && !relevantMarkupObjectsAtSelectionEnd && !relevantMarkupObjectBeforeSelection && !relevantMarkupObjectAfterSelection)) {
				// Alternative D: no-markup to no-markup: easy
				Aloha.Log.info(this, 'non-markup 2 non-markup');

				// workaround to keep the caret at the right position if it's an empty element
				// applyMarkup was not working correctly and has a lot of overhead we don't need in that case
				if (isCollapsedAndEmptyOrEndBr(rangeObject)) {
					var newMarkup = markupObject.clone();

					if (isCollapsedAndEndBr(rangeObject)) {
						newMarkup[0].appendChild(Engine.createEndBreak());
					}

					// setting the focus is needed for mozilla and IE 7 to have a working rangeObject.select()
					if (Aloha.activeEditable && jQuery.browser.mozilla) {
						Aloha.activeEditable.obj.focus();
					}

					if (Engine.isEditable(rangeObject.startContainer)) {
						Engine.copyAttributes(rangeObject.startContainer, newMarkup[0]);
						jQuery(rangeObject.startContainer).after(newMarkup[0]).remove();
					} else if (Engine.isEditingHost(rangeObject.startContainer)) {
						jQuery(rangeObject.startContainer).append(newMarkup[0]);
						Engine.ensureContainerEditable(newMarkup[0]);
					}

					backupRangeObject.startContainer = newMarkup[0];
					backupRangeObject.endContainer = newMarkup[0];
					backupRangeObject.startOffset = 0;
					backupRangeObject.endOffset = 0;
					return;
				}
				this.applyMarkup(rangeObject.getSelectionTree(), rangeObject, markupObject, tagComparator, {
					setRangeObject2NewMarkup: true
				});
				backupRangeObject.startContainer = rangeObject.startContainer;
				backupRangeObject.endContainer = rangeObject.endContainer;
				backupRangeObject.startOffset = rangeObject.startOffset;
				backupRangeObject.endOffset = rangeObject.endOffset;
			}

			if (markupObject.isReplacingElement) {
				//Check if the startContainer is one of the zapped elements
				if (backupRangeObject && backupRangeObject.startContainer.className && backupRangeObject.startContainer.className.indexOf('preparedForRemoval') > -1) {
					//var parentElement = jQuery(backupRangeObject.startContainer).closest(markupObject[0].tagName).get(0);
					parentElement = jQuery(backupRangeObject.startContainer).parents(markupObject[0].tagName).get(0);
					backupRangeObject.startContainer = parentElement;
					rangeObject.startContainer = parentElement;
				}
				//check if the endContainer is one of the zapped elements
				if (backupRangeObject && backupRangeObject.endContainer.className && backupRangeObject.endContainer.className.indexOf('preparedForRemoval') > -1) {
					//var parentElement = jQuery(backupRangeObject.endContainer).closest(markupObject[0].tagName).get(0);
					parentElement = jQuery(backupRangeObject.endContainer).parents(markupObject[0].tagName).get(0);
					backupRangeObject.endContainer = parentElement;
					rangeObject.endContainer = parentElement;
				}
			}
			// remove all marked items
			jQuery('.preparedForRemoval').zap();

			// recalculate cac and selectionTree

			// update selection
			if (markupObject.isReplacingElement) {
				//After the zapping we have to check for wrong offsets
				if (e5s.Node.ELEMENT_NODE === backupRangeObject.startContainer.nodeType && backupRangeObject.startContainer.childNodes && backupRangeObject.startContainer.childNodes.length < backupRangeObject.startOffset) {
					backupRangeObject.startOffset = backupRangeObject.startContainer.childNodes.length;
					rangeObject.startOffset = backupRangeObject.startContainer.childNodes.length;
				}
				if (e5s.Node.ELEMENT_NODE === backupRangeObject.endContainer.nodeType && backupRangeObject.endContainer.childNodes && backupRangeObject.endContainer.childNodes.length < backupRangeObject.endOffset) {
					backupRangeObject.endOffset = backupRangeObject.endContainer.childNodes.length;
					rangeObject.endOffset = backupRangeObject.endContainer.childNodes.length;
				}
				rangeObject.endContainer = backupRangeObject.endContainer;
				rangeObject.endOffset = backupRangeObject.endOffset;
				rangeObject.startContainer = backupRangeObject.startContainer;
				rangeObject.startOffset = backupRangeObject.startOffset;
				backupRangeObject.update();
				backupRangeObject.select();
			} else {
				rangeObject.update();
				rangeObject.select();
			}
		},

		/**
		 * method compares a JS array of domobjects with a range object and decides, if the rangeObject spans the whole markup objects. method is used to decide if a markup2markup selection can be completely remove or if it must be splitted into 2 separate markups
		 * @param relevantMarkupObjectsAtSelectionStart JS Array of dom objects, which are parents to the rangeObject.startContainer
		 * @param relevantMarkupObjectsAtSelectionEnd JS Array of dom objects, which are parents to the rangeObject.endContainer
		 * @param rangeObj Aloha rangeObject
		 * @return true, if rangeObjects and markup objects are identical, false otherwise
		 * @hide
		 */
		areMarkupObjectsAsLongAsRangeObject: function (relevantMarkupObjectsAtSelectionStart, relevantMarkupObjectsAtSelectionEnd, rangeObject) {
			var i, el, textNode, relMarkupEnd, relMarkupStart;

			if (rangeObject.startOffset !== 0) {
				return false;
			}

			for (i = 0, relMarkupStart = relevantMarkupObjectsAtSelectionStart.length; i < relMarkupStart; i++) {
				el = jQuery(relevantMarkupObjectsAtSelectionStart[i]);
				if (el.textNodes().first()[0] !== rangeObject.startContainer) {
					return false;
				}
			}

			for (i = 0, relMarkupEnd = relevantMarkupObjectsAtSelectionEnd.length; i < relMarkupEnd; i++) {
				el = jQuery(relevantMarkupObjectsAtSelectionEnd[i]);
				textNode = el.textNodes().last()[0];
				if (textNode !== rangeObject.endContainer || textNode.length != rangeObject.endOffset) {
					return false;
				}
			}

			return true;
		},

		/**
		 * method used to remove/split markup from a "markup2markup" selection
		 * @param relevantMarkupObjectsAtSelectionStart JS Array of dom objects, which are parents to the rangeObject.startContainer
		 * @param relevantMarkupObjectsAtSelectionEnd JS Array of dom objects, which are parents to the rangeObject.endContainer
		 * @param rangeObj Aloha rangeObject
		 * @param tagComparator method, which is used to compare the dom object and the jQuery markup object. the method must accept 2 parameters, the first is the domobj, the second is the jquery object. if no method is specified, the method this.standardTextLevelSemanticsComparator is used
		 * @return true (always, since no "false" case is currently known...but might be added)
		 * @hide
		 */
		splitRelevantMarkupObject: function (relevantMarkupObjectsAtSelectionStart, relevantMarkupObjectsAtSelectionEnd, rangeObject, tagComparator) {
			// mark them to be deleted
			jQuery(relevantMarkupObjectsAtSelectionStart).addClass('preparedForRemoval');
			jQuery(relevantMarkupObjectsAtSelectionEnd).addClass('preparedForRemoval');

			// check if the rangeObject is identical with the relevantMarkupObjects (in this case the markup can simply be removed)
			if (this.areMarkupObjectsAsLongAsRangeObject(relevantMarkupObjectsAtSelectionStart, relevantMarkupObjectsAtSelectionEnd, rangeObject)) {
				return true;
			}

			// find intersection (this can always only be one dom element (namely the highest) because all others will be removed
			var relevantMarkupObjectAtSelectionStartAndEnd = this.intersectRelevantMarkupObjects(relevantMarkupObjectsAtSelectionStart, relevantMarkupObjectsAtSelectionEnd);

			if (relevantMarkupObjectAtSelectionStartAndEnd) {
				this.insertCroppedMarkups([relevantMarkupObjectAtSelectionStartAndEnd], rangeObject, false, tagComparator);
				this.insertCroppedMarkups([relevantMarkupObjectAtSelectionStartAndEnd], rangeObject, true, tagComparator);
			} else {
				this.insertCroppedMarkups(relevantMarkupObjectsAtSelectionStart, rangeObject, false, tagComparator);
				this.insertCroppedMarkups(relevantMarkupObjectsAtSelectionEnd, rangeObject, true, tagComparator);
			}
			return true;
		},

		/**
		 * method takes two arrays of bottom up dom objects, compares them and returns either the object closest to the root or false
		 * @param relevantMarkupObjectsAtSelectionStart JS Array of dom objects
		 * @param relevantMarkupObjectsAtSelectionEnd JS Array of dom objects
		 * @return dom object closest to the root or false
		 * @hide
		 */
		intersectRelevantMarkupObjects: function (relevantMarkupObjectsAtSelectionStart, relevantMarkupObjectsAtSelectionEnd) {
			var intersection = false, i, elStart, j, elEnd, relMarkupStart, relMarkupEnd;
			if (!relevantMarkupObjectsAtSelectionStart || !relevantMarkupObjectsAtSelectionEnd) {
				return intersection; // we can only intersect, if we have to arrays!
			}
			relMarkupStart = relevantMarkupObjectsAtSelectionStart.length;
			relMarkupEnd = relevantMarkupObjectsAtSelectionEnd.length;
			for (i = 0; i < relMarkupStart; i++) {
				elStart = relevantMarkupObjectsAtSelectionStart[i];
				for (j = 0; j < relMarkupEnd; j++) {
					elEnd = relevantMarkupObjectsAtSelectionEnd[j];
					if (elStart === elEnd) {
						intersection = elStart;
					}
				}
			}
			return intersection;
		},

		/**
		 * method used to add markup to a nonmarkup2markup selection
		 * @param relevantMarkupObjects JS Array of dom objects effecting either the start or endContainer of a selection (which should be extended)
		 * @param rangeObject Aloha rangeObject the markups should be extended to
		 * @param startOrEnd boolean; defines, if the existing markups should be extended forwards or backwards (is propably redundant and could be found out by comparing start or end container with the markup array dom objects)
		 * @param tagComparator method, which is used to compare the dom object and the jQuery markup object. the method must accept 2 parameters, the first is the domobj, the second is the jquery object. if no method is specified, the method this.standardTextLevelSemanticsComparator is used
		 * @return true
		 * @hide
		 */
		extendExistingMarkupWithSelection: function (relevantMarkupObjects, rangeObject, startOrEnd, tagComparator) {
			var extendMarkupsAtStart, extendMarkupsAtEnd, objects, i, relMarkupLength, el, textnodes, nodeNr;
			if (!startOrEnd) { // = Start
				// start part of rangeObject should be used, therefor existing markups are cropped at the end
				extendMarkupsAtStart = true;
			}
			if (startOrEnd) { // = End
				// end part of rangeObject should be used, therefor existing markups are cropped at start (beginning)
				extendMarkupsAtEnd = true;
			}
			objects = [];
			for (i = 0, relMarkupLength = relevantMarkupObjects.length; i < relMarkupLength; i++) {
				objects[i] = new this.SelectionRange();
				el = relevantMarkupObjects[i];
				if (extendMarkupsAtEnd && !extendMarkupsAtStart) {
					objects[i].startContainer = rangeObject.startContainer; // jQuery(el).contents()[0];
					objects[i].startOffset = rangeObject.startOffset;
					textnodes = jQuery(el).textNodes(true);

					nodeNr = textnodes.length - 1;
					objects[i].endContainer = textnodes[nodeNr];
					objects[i].endOffset = textnodes[nodeNr].length;
					objects[i].update();
					this.applyMarkup(objects[i].getSelectionTree(), rangeObject, this.getClonedMarkup4Wrapping(el), tagComparator, {
						setRangeObject2NewMarkup: true
					});
				}
				if (!extendMarkupsAtEnd && extendMarkupsAtStart) {
					textnodes = jQuery(el).textNodes(true);
					objects[i].startContainer = textnodes[0]; // jQuery(el).contents()[0];
					objects[i].startOffset = 0;
					objects[i].endContainer = rangeObject.endContainer;
					objects[i].endOffset = rangeObject.endOffset;
					objects[i].update();
					this.applyMarkup(objects[i].getSelectionTree(), rangeObject, this.getClonedMarkup4Wrapping(el), tagComparator, {
						setRangeObject2NewMarkup: true
					});
				}
			}
			return true;
		},

		/**
		 * method creates an empty markup jQuery object from a dom object passed as paramter
		 * @param domobj domobject to be cloned, cleaned and emptied
		 * @param tagComparator method, which is used to compare the dom object and the jQuery markup object. the method must accept 2 parameters, the first is the domobj, the second is the jquery object. if no method is specified, the method this.standardTextLevelSemanticsComparator is used
		 * @return jQuery wrapper object to be passed to e.g. this.applyMarkup(...)
		 * @hide
		 */
		getClonedMarkup4Wrapping: function (domobj) {
			var wrapper = jQuery(domobj.outerHTML).removeClass('preparedForRemoval').empty();
			if (wrapper.attr('class').length === 0) {
				wrapper.removeAttr('class');
			}
			return wrapper;
		},

		/**
		 * method used to subtract the range object from existing markup. in other words: certain markup is removed from the selections defined by the rangeObject
		 * @param relevantMarkupObjects JS Array of dom objects effecting either the start or endContainer of a selection (which should be extended)
		 * @param rangeObject Aloha rangeObject the markups should be removed from
		 * @param startOrEnd boolean; defines, if the existing markups should be reduced at the beginning of the tag or at the end (is propably redundant and could be found out by comparing start or end container with the markup array dom objects)
		 * @param tagComparator method, which is used to compare the dom object and the jQuery markup object. the method must accept 2 parameters, the first is the domobj, the second is the jquery object. if no method is specified, the method this.standardTextLevelSemanticsComparator is used
		 * @return true
		 * @hide
		 */
		insertCroppedMarkups: function (relevantMarkupObjects, rangeObject, startOrEnd, tagComparator) {
			var cropMarkupsAtEnd, cropMarkupsAtStart, textnodes, objects, i, el, textNodes;
			if (!startOrEnd) { // = Start
				// start part of rangeObject should be used, therefor existing markups are cropped at the end
				cropMarkupsAtEnd = true;
			} else { // = End
				// end part of rangeObject should be used, therefor existing markups are cropped at start (beginning)
				cropMarkupsAtStart = true;
			}
			objects = [];
			for (i = 0; i < relevantMarkupObjects.length; i++) {
				objects[i] = new this.SelectionRange();
				el = relevantMarkupObjects[i];
				if (cropMarkupsAtEnd && !cropMarkupsAtStart) {
					textNodes = jQuery(el).textNodes(true);
					objects[i].startContainer = textNodes[0];
					objects[i].startOffset = 0;
					// if the existing markup startContainer & startOffset are equal to the rangeObject startContainer and startOffset,
					// then markupobject does not have to be added again, because it would have no content (zero-length)
					if (objects[i].startContainer === rangeObject.startContainer && objects[i].startOffset === rangeObject.startOffset) {
						continue;
					}
					if (rangeObject.startOffset === 0) {
						objects[i].endContainer = this.getTextNodeSibling(false, el, rangeObject.startContainer);
						objects[i].endOffset = objects[i].endContainer.length;
					} else {
						objects[i].endContainer = rangeObject.startContainer;
						objects[i].endOffset = rangeObject.startOffset;
					}

					objects[i].update();

					this.applyMarkup(objects[i].getSelectionTree(), rangeObject, this.getClonedMarkup4Wrapping(el), tagComparator, {
						setRangeObject2NextSibling: true
					});
				}

				if (!cropMarkupsAtEnd && cropMarkupsAtStart) {
					objects[i].startContainer = rangeObject.endContainer; // jQuery(el).contents()[0];
					objects[i].startOffset = rangeObject.endOffset;
					textnodes = jQuery(el).textNodes(true);
					objects[i].endContainer = textnodes[textnodes.length - 1];
					objects[i].endOffset = textnodes[textnodes.length - 1].length;
					objects[i].update();
					this.applyMarkup(objects[i].getSelectionTree(), rangeObject, this.getClonedMarkup4Wrapping(el), tagComparator, {
						setRangeObject2PreviousSibling: true
					});
				}
			}
			return true;
		},

		/**
		 * apply a certain markup to the current selection
		 * @param markupObject jQuery object of the markup to be applied (e.g. created with obj = jQuery('<b></b>'); )
		 * @return void
		 * @hide
		 */
		changeMarkupOnSelection: function (markupObject) {
			var rangeObject = this.getRangeObject();

			// change the markup
			this.changeMarkup(rangeObject, markupObject, this.getStandardTagComparator(markupObject));

			// merge text nodes
			GENTICS.Utils.Dom.doCleanup({
				'merge': true
			}, rangeObject);

			// update the range and select it
			rangeObject.update();
			rangeObject.select();
			this.rangeObject = rangeObject;
		},

		/**
		 * apply a certain markup to the selection Tree
		 * @param selectionTree SelectionTree Object markup should be applied to
		 * @param rangeObject Aloha rangeObject which will be modified to reflect the dom changes, after the markup was applied (only if activated via options)
		 * @param markupObject jQuery object of the markup to be applied (e.g. created with obj = jQuery('<b></b>'); )
		 * @param tagComparator method, which is used to compare the dom object and the jQuery markup object. the method must accept 2 parameters, the first is the domobj, the second is the jquery object. if no method is specified, the method this.standardTextLevelSemanticsComparator is used
		 * @param options JS object, with the following boolean properties: setRangeObject2NewMarkup, setRangeObject2NextSibling, setRangeObject2PreviousSibling
		 * @return void
		 * @hide
		 */
		applyMarkup: function (selectionTree, rangeObject, markupObject, tagComparator, options) {
			var optimizedSelectionTree, i, el, breakpoint;
			options = options || {};
			// first same tags from within fully selected nodes for removal
			this.prepareForRemoval(selectionTree, markupObject, tagComparator);

			// first let's optimize the selection Tree in useful groups which can be wrapped together
			optimizedSelectionTree = this.optimizeSelectionTree4Markup(selectionTree, markupObject, tagComparator);
			breakpoint = true;

			// now iterate over grouped elements and either recursively dive into object or wrap it as a whole
			for (i = 0; i < optimizedSelectionTree.length; i++) {
				el = optimizedSelectionTree[i];
				if (el.wrappable) {
					this.wrapMarkupAroundSelectionTree(el.elements, rangeObject, markupObject, tagComparator, options);
				} else {
					Aloha.Log.debug(this, 'dive further into non-wrappable object');
					this.applyMarkup(el.element.children, rangeObject, markupObject, tagComparator, options);
				}
			}
		},

		/**
		 * returns the type of the given markup (trying to match HTML5)
		 * @param markupObject jQuery object of the markup to be applied (e.g. created with obj = jQuery('<b></b>'); )
		 * @return string name of the markup type
		 * @hide
		 */
		getMarkupType: function (markupObject) {
			var nn = jQuery(markupObject)[0].nodeName.toLowerCase();
			if (markupObject.outerHtml) {
				Aloha.Log.debug(this, 'Node name detected: ' + nn + ' for: ' + markupObject.outerHtml());
			}
			if (nn == '#text') {
				return 'textNode';
			}
			if (this.replacingElements[nn]) {
				return 'sectionOrGroupingContent';
			}
			if (this.tagHierarchy[nn]) {
				return 'textLevelSemantics';
			}
			Aloha.Log.warn(this, 'unknown markup passed to this.getMarkupType(...): ' + markupObject.outerHtml());
		},

		/**
		 * returns the standard tag comparator for the given markup object
		 * @param markupObject jQuery object of the markup to be applied (e.g. created with obj = jQuery('<b></b>'); )
		 * @return function tagComparator method, which is used to compare the dom object and the jQuery markup object. the method must accept 2 parameters, the first is the domobj, the second is the jquery object. if no method is specified, the method this.standardTextLevelSemanticsComparator is used
		 * @hide
		 */
		getStandardTagComparator: function (markupObject) {
			var that = this,
				result;
			switch (this.getMarkupType(markupObject)) {
			case 'textNode':
				result = function (p1, p2) {
					return false;
				};
				break;

			case 'sectionOrGroupingContent':
				result = function (domobj, markupObject) {
					return that.standardSectionsAndGroupingContentComparator(domobj, markupObject);
				};
				break;

			//case 'textLevelSemantics' covered by default
			default:
				result = function (domobj, markupObject) {
					return that.standardTextLevelSemanticsComparator(domobj, markupObject);
				};
				break;
			}
			return result;
		},

		/**
		 * searches for fully selected equal markup tags
		 * @param selectionTree SelectionTree Object markup should be applied to
		 * @param markupObject jQuery object of the markup to be applied (e.g. created with obj = jQuery('<b></b>'); )
		 * @param tagComparator method, which is used to compare the dom object and the jQuery markup object. the method must accept 2 parameters, the first is the domobj, the second is the jquery object. if no method is specified, the method this.standardTextLevelSemanticsComparator is used
		 * @return void
		 * @hide
		 */
		prepareForRemoval: function (selectionTree, markupObject, tagComparator) {
			var that = this, i, el;

			// check if a comparison method was passed as parameter ...
			if (typeof tagComparator !== 'undefined' && typeof tagComparator !== 'function') {
				Aloha.Log.error(this, 'parameter tagComparator is not a function');
			}
			// ... if not use this as standard tag comparison method
			if (typeof tagComparator === 'undefined') {
				tagComparator = this.getStandardTagComparator(markupObject);
			}
			for (i = 0; i < selectionTree.length; i++) {
				el = selectionTree[i];
				if (el.domobj && (el.selection == 'full' || (el.selection == 'partial' && markupObject.isReplacingElement))) {
					// mark for removal
					if (el.domobj.nodeType === 1 && tagComparator(el.domobj, markupObject)) {
						Aloha.Log.debug(this, 'Marking for removal: ' + el.domobj.nodeName);
						jQuery(el.domobj).addClass('preparedForRemoval');
					}
				}
				if (el.selection != 'none' && el.children.length > 0) {
					this.prepareForRemoval(el.children, markupObject, tagComparator);
				}

			}
		},

		/**
		 * searches for fully selected equal markup tags
		 * @param selectionTree SelectionTree Object markup should be applied to
		 * @param rangeObject Aloha rangeObject the markup will be applied to
		 * @param markupObject jQuery object of the markup to be applied (e.g. created with obj = jQuery('<b></b>'); )
		 * @param tagComparator method, which is used to compare the dom object and the jQuery markup object. the method must accept 2 parameters, the first is the domobj, the second is the jquery object. if no method is specified, the method this.standardTextLevelSemanticsComparator is used
		 * @param options JS object, with the following boolean properties: setRangeObject2NewMarkup, setRangeObject2NextSibling, setRangeObject2PreviousSibling
		 * @return void
		 * @hide
		 */
		wrapMarkupAroundSelectionTree: function (selectionTree, rangeObject, markupObject, tagComparator, options) {
			// first let's find out if theoretically the whole selection can be wrapped with one tag and save it for later use
			var objects2wrap = [], // // this will be used later to collect objects
				j = -1, // internal counter,
				breakpoint = true,
				preText = '',
				postText = '',
				prevOrNext,
				textNode2Start,
				textnodes,
				newMarkup,
				i,
			    el,
			    middleText;

			Aloha.Log.debug(this, 'The formatting <' + markupObject[0].tagName + '> will be wrapped around the selection');

			// now lets iterate over the elements
			for (i = 0; i < selectionTree.length; i++) {
				el = selectionTree[i];

				// check if markup is allowed inside the elements parent
				if (el.domobj && !this.canTag1WrapTag2(el.domobj.parentNode.tagName.toLowerCase(), markupObject[0].tagName.toLowerCase())) {
					Aloha.Log.info(this, 'Skipping the wrapping of <' + markupObject[0].tagName.toLowerCase() + '> because this tag is not allowed inside <' + el.domobj.parentNode.tagName.toLowerCase() + '>');
					continue;
				}

				// skip empty text nodes
				if (el.domobj && el.domobj.nodeType === 3 && jQuery.trim(el.domobj.nodeValue).length === 0) {
					continue;
				}

				// partial element, can either be a textnode and therefore be wrapped (at least partially)
				// or can be a nodeType == 1 (tag) which must be dived into
				if (el.domobj && el.selection == 'partial' && !markupObject.isReplacingElement) {
					if (el.startOffset !== undefined && el.endOffset === undefined) {
						j++;
						preText += el.domobj.data.substr(0, el.startOffset);
						el.domobj.data = el.domobj.data.substr(el.startOffset, el.domobj.data.length - el.startOffset);
						objects2wrap[j] = el.domobj;
					} else if (el.endOffset !== undefined && el.startOffset === undefined) {
						j++;
						postText += el.domobj.data.substr(el.endOffset, el.domobj.data.length - el.endOffset);
						el.domobj.data = el.domobj.data.substr(0, el.endOffset);
						objects2wrap[j] = el.domobj;
					} else if (el.endOffset !== undefined && el.startOffset !== undefined) {
						if (el.startOffset == el.endOffset) { // do not wrap empty selections
							Aloha.Log.debug(this, 'skipping empty selection');
							continue;
						}
						j++;
						preText += el.domobj.data.substr(0, el.startOffset);
						middleText = el.domobj.data.substr(el.startOffset, el.endOffset - el.startOffset);
						postText += el.domobj.data.substr(el.endOffset, el.domobj.data.length - el.endOffset);
						el.domobj.data = middleText;
						objects2wrap[j] = el.domobj;
					} else {
						// a partially selected item without selectionStart/EndOffset is a nodeType 1 Element on the way to the textnode
						Aloha.Log.debug(this, 'diving into object');
						this.applyMarkup(el.children, rangeObject, markupObject, tagComparator, options);
					}
				}
				// fully selected dom elements can be wrapped as whole element
				if (el.domobj && (el.selection == 'full' || (el.selection == 'partial' && markupObject.isReplacingElement))) {
					j++;
					objects2wrap[j] = el.domobj;
				}
			}

			if (objects2wrap.length > 0) {
				// wrap collected DOM object with markupObject
				objects2wrap = jQuery(objects2wrap);

				// make a fix for text nodes in <li>'s in ie
				jQuery.each(objects2wrap, function (index, element) {
					if (jQuery.browser.msie && element.nodeType == 3 && !element.nextSibling && !element.previousSibling && element.parentNode && element.parentNode.nodeName.toLowerCase() == 'li') {
						element.data = jQuery.trim(element.data);
					}
				});

				newMarkup = objects2wrap.wrapAll(markupObject).parent();
				newMarkup.before(preText).after(postText);

				if (options.setRangeObject2NewMarkup) { // this is used, when markup is added to normal/normal Text
					textnodes = objects2wrap.textNodes();

					if (textnodes.index(rangeObject.startContainer) != -1) {
						rangeObject.startOffset = 0;
					}
					if (textnodes.index(rangeObject.endContainer) != -1) {
						rangeObject.endOffset = rangeObject.endContainer.length;
					}
					breakpoint = true;
				}
				if (options.setRangeObject2NextSibling) {
					prevOrNext = true;
					textNode2Start = newMarkup.textNodes(true).last()[0];
					if (objects2wrap.index(rangeObject.startContainer) != -1) {
						rangeObject.startContainer = this.getTextNodeSibling(prevOrNext, newMarkup.parent(), textNode2Start);
						rangeObject.startOffset = 0;
					}
					if (objects2wrap.index(rangeObject.endContainer) != -1) {
						rangeObject.endContainer = this.getTextNodeSibling(prevOrNext, newMarkup.parent(), textNode2Start);
						rangeObject.endOffset = rangeObject.endOffset - textNode2Start.length;
					}
				}
				if (options.setRangeObject2PreviousSibling) {
					prevOrNext = false;
					textNode2Start = newMarkup.textNodes(true).first()[0];
					if (objects2wrap.index(rangeObject.startContainer) != -1) {
						rangeObject.startContainer = this.getTextNodeSibling(prevOrNext, newMarkup.parent(), textNode2Start);
						rangeObject.startOffset = 0;
					}
					if (objects2wrap.index(rangeObject.endContainer) != -1) {
						rangeObject.endContainer = this.getTextNodeSibling(prevOrNext, newMarkup.parent(), textNode2Start);
						rangeObject.endOffset = rangeObject.endContainer.length;
					}
				}
			}
		},

		/**
		 * takes a text node and return either the next recursive text node sibling or the previous
		 * @param previousOrNext boolean, false for previous, true for next sibling
		 * @param commonAncestorContainer dom object to be used as root for the sibling search
		 * @param currentTextNode dom object of the originating text node
		 * @return dom object of the sibling text node
		 * @hide
		 */
		getTextNodeSibling: function (previousOrNext, commonAncestorContainer, currentTextNode) {
			var textNodes = jQuery(commonAncestorContainer).textNodes(true), newIndex, index;

			index = textNodes.index(currentTextNode);
			if (index == -1) { // currentTextNode was not found
				return false;
			}
			newIndex = index + (!previousOrNext ? -1 : 1);
			return textNodes[newIndex] || false;
		},

		/**
		 * takes a selection tree and groups it into markup wrappable selection trees
		 * @param selectionTree rangeObject selection tree
		 * @param markupObject jQuery object of the markup to be applied (e.g. created with obj = jQuery('<b></b>'); )
		 * @return JS array of wrappable selection trees
		 * @hide
		 */
		optimizeSelectionTree4Markup: function (selectionTree, markupObject, tagComparator) {
			var groupMap = [],
				outerGroupIndex = 0,
				innerGroupIndex = 0,
				that = this,
				i,
			    j,
				endPosition,
			    startPosition;

			if (typeof tagComparator === 'undefined') {
				tagComparator = function (domobj, markupObject) {
					return that.standardTextLevelSemanticsComparator(markupObject);
				};
			}
			for (i = 0; i < selectionTree.length; i++) {
				// we are just interested in selected item, but not in non-selected items
				if (selectionTree[i].domobj && selectionTree[i].selection != 'none') {
					if (markupObject.isReplacingElement && tagComparator(markupObject[0], jQuery(selectionTree[i].domobj))) {
						if (groupMap[outerGroupIndex] !== undefined) {
							outerGroupIndex++;
						}
						groupMap[outerGroupIndex] = {};
						groupMap[outerGroupIndex].wrappable = true;
						groupMap[outerGroupIndex].elements = [];
						groupMap[outerGroupIndex].elements[innerGroupIndex] = selectionTree[i];
						outerGroupIndex++;

					} else if (this.canMarkupBeApplied2ElementAsWhole([selectionTree[i]], markupObject)) {
						// now check, if the children of our item could be wrapped all together by the markup object
						// if yes, add it to the current group
						if (groupMap[outerGroupIndex] === undefined) {
							groupMap[outerGroupIndex] = {};
							groupMap[outerGroupIndex].wrappable = true;
							groupMap[outerGroupIndex].elements = [];
						}
						if (markupObject.isReplacingElement) { //  && selectionTree[i].domobj.nodeType === 3
							/* we found the node to wrap for a replacing element. however there might
							 * be siblings which should be included as well
							 * although they are actually not selected. example:
							 * li
							 * |-textNode ( .selection = 'none')
							 * |-textNode (cursor inside, therefor .selection = 'partial')
							 * |-textNode ( .selection = 'none')
							 *
							 * in this case it would be useful to select the previous and following textNodes as well (they might result from a previous DOM manipulation)
							 * Think about other cases, where the parent is the Editable. In this case we propably only want to select from and until the next <br /> ??
							 * .... many possibilities, here I realize the two described cases
							 */

							// first find start element starting from the current element going backwards until sibling 0
							startPosition = i;
							for (j = i - 1; j >= 0; j--) {
								if (this.canMarkupBeApplied2ElementAsWhole([selectionTree[j]], markupObject) && this.isMarkupAllowedToStealSelectionTreeElement(selectionTree[j], markupObject)) {
									startPosition = j;
								} else {
									break;
								}
							}

							// now find the end element starting from the current element going forward until the last sibling
							endPosition = i;
							for (j = i + 1; j < selectionTree.length; j++) {
								if (this.canMarkupBeApplied2ElementAsWhole([selectionTree[j]], markupObject) && this.isMarkupAllowedToStealSelectionTreeElement(selectionTree[j], markupObject)) {
									endPosition = j;
								} else {
									break;
								}
							}

							// now add the elements to the groupMap
							innerGroupIndex = 0;
							for (j = startPosition; j <= endPosition; j++) {
								groupMap[outerGroupIndex].elements[innerGroupIndex] = selectionTree[j];
								groupMap[outerGroupIndex].elements[innerGroupIndex].selection = 'full';
								innerGroupIndex++;
							}
							innerGroupIndex = 0;
						} else {
							// normal text level semantics object, no siblings need to be selected
							groupMap[outerGroupIndex].elements[innerGroupIndex] = selectionTree[i];
							innerGroupIndex++;
						}
					} else {
						// if no, isolate it in its own group
						if (groupMap[outerGroupIndex] !== undefined) {
							outerGroupIndex++;
						}
						groupMap[outerGroupIndex] = {};
						groupMap[outerGroupIndex].wrappable = false;
						groupMap[outerGroupIndex].element = selectionTree[i];
						innerGroupIndex = 0;
						outerGroupIndex++;
					}
				}
			}
			return groupMap;
		},

		/**
		 * very tricky method, which decides, if a certain markup (normally a replacing markup element like p, h1, blockquote)
		 * is allowed to extend the user selection to other dom objects (represented as selectionTreeElement)
		 * to understand the purpose: if the user selection is collapsed inside e.g. some text, which is currently not
		 * wrapped by the markup to be applied, and therefor the markup does not have an equal markup to replace, then the DOM
		 * manipulator has to decide which objects to wrap. real example:
		 * <div>
		 *	<h1>headline</h1>
		 *	some text blabla bla<br>
		 *	more text HERE THE | CURSOR BLINKING and <b>even more bold text</b>
		 * </div>
		 * when the user now wants to apply e.g. a <p> tag, what will be wrapped? it could be useful if the manipulator would actually
		 * wrap everything inside the div except the <h1>. but for this purpose someone has to decide, if the markup is
		 * allowed to wrap certain dom elements in this case the question would be, if the <p> is allowed to wrap
		 * textNodes, <br> and <b> and <h1>. therefore this tricky method should answer the question for those 3 elements
		 * with true, but for for the <h1> it should return false. and since the method does not know this, there is a configuration
		 * for this
		 *
		 * @param selectionTree rangeObject selection tree element (only one, not an array of)
		 * @param markupObject lowercase string of the tag to be verified (e.g. "b")
		 * @return true if the markup is allowed to wrap the selection tree element, false otherwise
		 * @hide
		 */
		isMarkupAllowedToStealSelectionTreeElement: function (selectionTreeElement, markupObject) {
			if (!selectionTreeElement.domobj) {
				return false;
			}
			var maybeTextNodeName = selectionTreeElement.domobj.nodeName.toLowerCase(),
				nodeName = (maybeTextNodeName == '#text') ? 'textNode' : maybeTextNodeName,
				markupName = markupObject[0].nodeName.toLowerCase(),
				elemMap = this.allowedToStealElements[markupName];
			return elemMap && elemMap[nodeName];
		},

		/**
		 * checks if a selection can be completey wrapped by a certain html tags (helper method for this.optimizeSelectionTree4Markup
		 * @param selectionTree rangeObject selection tree
		 * @param markupObject lowercase string of the tag to be verified (e.g. "b")
		 * @return true if selection can be applied as whole, false otherwise
		 * @hide
		 */
		canMarkupBeApplied2ElementAsWhole: function (selectionTree, markupObject) {
			var htmlTag, i, el, returnVal;

			if (markupObject.jquery) {
				htmlTag = markupObject[0].tagName;
			}
			if (markupObject.tagName) {
				htmlTag = markupObject.tagName;
			}

			returnVal = true;
			for (i = 0; i < selectionTree.length; i++) {
				el = selectionTree[i];
				if (el.domobj && (el.selection != "none" || markupObject.isReplacingElement)) {
					// Aloha.Log.debug(this, 'Checking, if  <' + htmlTag + '> can be applied to ' + el.domobj.nodeName);
					if (!this.canTag1WrapTag2(htmlTag, el.domobj.nodeName)) {
						return false;
					}
					if (el.children.length > 0 && !this.canMarkupBeApplied2ElementAsWhole(el.children, markupObject)) {
						return false;
					}
				}
			}
			return returnVal;
		},

		/**
		 * checks if a tag 1 (first parameter) can wrap tag 2 (second parameter).
		 * IMPORTANT: the method does not verify, if there have to be other tags in between
		 * Example: this.canTag1WrapTag2("table", "td") will return true, because the method does not take into account, that there has to be a "tr" in between
		 * @param t1 string: tagname of outer tag to verify, e.g. "b"
		 * @param t2 string: tagname of inner tag to verify, e.g. "b"
		 * @return true if tag 1 can wrap tag 2, false otherwise
		 * @hide
		 */
		canTag1WrapTag2: function (t1, t2) {
			t1 = (t1 == '#text') ? 'textNode' : t1.toLowerCase();
			t2 = (t2 == '#text') ? 'textNode' : t2.toLowerCase();
			var t1Map = this.tagHierarchy[t1];
			if (!t1Map) {
				return true;
			}
			if (!this.tagHierarchy[t2]) {
				return true;
			}
			return t1Map[t2];
		},

		/**
		 * Check whether it is allowed to insert the given tag at the start of the
		 * current selection. This method will check whether the markup effective for
		 * the start and outside of the editable part (starting with the editable tag
		 * itself) may wrap the given tag.
		 * @param tagName {String} name of the tag which shall be inserted
		 * @return true when it is allowed to insert that tag, false if not
		 * @hide
		 */
		mayInsertTag: function (tagName) {
			var i;
			if (typeof this.rangeObject.unmodifiableMarkupAtStart == 'object') {
				// iterate over all DOM elements outside of the editable part
				for (i = 0; i < this.rangeObject.unmodifiableMarkupAtStart.length; ++i) {
					// check whether an element may not wrap the given
					if (!this.canTag1WrapTag2(this.rangeObject.unmodifiableMarkupAtStart[i].nodeName, tagName)) {
						// found a DOM element which forbids to insert the given tag, we are done
						return false;
					}
				}

				// all of the found DOM elements allow inserting the given tag
				return true;
			}
			Aloha.Log.warn(this, 'Unable to determine whether tag ' + tagName + ' may be inserted');
			return true;
		},

		/**
		 * String representation
		 * @return "Aloha.Selection"
		 * @hide
		 */
		toString: function () {
			return 'Aloha.Selection';
		},

		/**
		 * @namespace Aloha.Selection
		 * @class SelectionRange
		 * @extends GENTICS.Utils.RangeObject
		 * Constructor for a range object.
		 * Optionally you can pass in a range object that's properties will be assigned to the new range object.
		 * @param rangeObject A range object thats properties will be assigned to the new range object.
		 * @constructor
		 */
		SelectionRange: GENTICS.Utils.RangeObject.extend({
			_constructor: function (rangeObject) {
				this._super(rangeObject);
				// If a range object was passed in we apply the values to the new range object
				if (rangeObject) {
					if (rangeObject.commonAncestorContainer) {
						this.commonAncestorContainer = rangeObject.commonAncestorContainer;
					}
					if (rangeObject.selectionTree) {
						this.selectionTree = rangeObject.selectionTree;
					}
					if (rangeObject.limitObject) {
						this.limitObject = rangeObject.limitObject;
					}
					if (rangeObject.markupEffectiveAtStart) {
						this.markupEffectiveAtStart = rangeObject.markupEffectiveAtStart;
					}
					if (rangeObject.unmodifiableMarkupAtStart) {
						this.unmodifiableMarkupAtStart = rangeObject.unmodifiableMarkupAtStart;
					}
					if (rangeObject.splitObject) {
						this.splitObject = rangeObject.splitObject;
					}
				}
			},

			/**
			 * DOM object of the common ancestor from startContainer and endContainer
			 * @hide
			 */
			commonAncestorContainer: undefined,

			/**
			 * The selection tree
			 * @hide
			 */
			selectionTree: undefined,

			/**
			 * Array of DOM objects effective for the start container and inside the
			 * editable part (inside the limit object). relevant for the button status
			 * @hide
			 */
			markupEffectiveAtStart: [],

			/**
			 * Array of DOM objects effective for the start container, which lies
			 * outside of the editable portion (starting with the limit object)
			 * @hide
			 */
			unmodifiableMarkupAtStart: [],

			/**
			 * DOM object being the limit for all markup relevant activities
			 * @hide
			 */
			limitObject: undefined,

			/**
			 * DOM object being split when enter key gets hit
			 * @hide
			 */
			splitObject: undefined,

			/**
			 * Sets the visible selection in the Browser based on the range object.
			 * If the selection is collapsed, this will result in a blinking cursor,
			 * otherwise in a text selection.
			 * @method
			 */
			select: function () {
				// Call Utils' select()
				this._super();

				// update the selection
				Aloha.Selection.updateSelection();
			},

			/**
			 * Method to update a range object internally
			 * @param commonAncestorContainer (DOM Object); optional Parameter; if set, the parameter
			 * will be used instead of the automatically calculated CAC
			 * @return void
			 * @hide
			 */
			update: function (commonAncestorContainer) {
				this.updatelimitObject();
				this.updateMarkupEffectiveAtStart();
				this.updateCommonAncestorContainer(commonAncestorContainer);

				// reset the selectiontree (must be recalculated)
				this.selectionTree = undefined;
			},

			/**
			 * Get the selection tree for this range
			 * TODO: remove this (was moved to range.js)
			 * @return selection tree
			 * @hide
			 */
			getSelectionTree: function () {
				// if not yet calculated, do this now
				if (!this.selectionTree) {
					this.selectionTree = Aloha.Selection.getSelectionTree(this);
				}

				return this.selectionTree;
			},

			/**
			 * TODO: move this to range.js
			 * Get an array of domobj (in dom tree order) of siblings of the given domobj, which are contained in the selection
			 * @param domobj dom object to start with
			 * @return array of siblings of the given domobj, which are also selected
			 * @hide
			 */
			getSelectedSiblings: function (domobj) {
				var selectionTree = this.getSelectionTree();

				return this.recursionGetSelectedSiblings(domobj, selectionTree);
			},

			/**
			 * TODO: move this to range.js
			 * Recursive method to find the selected siblings of the given domobj (which should be selected as well)
			 * @param domobj dom object for which the selected siblings shall be found
			 * @param selectionTree current level of the selection tree
			 * @return array of selected siblings of dom objects or false if none found
			 * @hide
			 */
			recursionGetSelectedSiblings: function (domobj, selectionTree) {
				var selectedSiblings = false,
					foundObj = false,
					i;

				for (i = 0; i < selectionTree.length; ++i) {
					if (selectionTree[i].domobj === domobj) {
						foundObj = true;
						selectedSiblings = [];
					} else if (!foundObj && selectionTree[i].children) {
						// do the recursion
						selectedSiblings = this.recursionGetSelectedSiblings(domobj, selectionTree[i].children);
						if (selectedSiblings !== false) {
							break;
						}
					} else if (foundObj && selectionTree[i].domobj && selectionTree[i].selection != 'collapsed' && selectionTree[i].selection != 'none') {
						selectedSiblings.push(selectionTree[i].domobj);
					} else if (foundObj && selectionTree[i].selection == 'none') {
						break;
					}
				}

				return selectedSiblings;
			},

			/**
			 * TODO: move this to range.js
			 * Method updates member var markupEffectiveAtStart and splitObject, which is relevant primarily for button status and enter key behaviour
			 * @return void
			 * @hide
			 */
			updateMarkupEffectiveAtStart: function () {
				// reset the current markup
				this.markupEffectiveAtStart = [];
				this.unmodifiableMarkupAtStart = [];

				var parents = this.getStartContainerParents(),
					limitFound = false,
					splitObjectWasSet,
					i,
				    el;

				for (i = 0; i < parents.length; i++) {
					el = parents[i];
					if (!limitFound && (el !== this.limitObject)) {
						this.markupEffectiveAtStart[i] = el;
						if (!splitObjectWasSet && GENTICS.Utils.Dom.isSplitObject(el)) {
							splitObjectWasSet = true;
							this.splitObject = el;
						}
					} else {
						limitFound = true;
						this.unmodifiableMarkupAtStart.push(el);
					}
				}
				if (!splitObjectWasSet) {
					this.splitObject = false;
				}
				return;
			},

			/**
			 * TODO: remove this
			 * Method updates member var markupEffectiveAtStart, which is relevant primarily for button status
			 * @return void
			 * @hide
			 */
			updatelimitObject: function () {
				if (Aloha.editables && Aloha.editables.length > 0) {
					var parents = this.getStartContainerParents(),
						editables = Aloha.editables,
						i,
					    el,
					    j,
					    editable;
					for (i = 0; i < parents.length; i++) {
						el = parents[i];
						for (j = 0; j < editables.length; j++) {
							editable = editables[j].obj[0];
							if (el === editable) {
								this.limitObject = el;
								return true;
							}
						}
					}
				}
				this.limitObject = jQuery('body');
				return true;
			},

			/**
			 * string representation of the range object
			 * @param	verbose	set to true for verbose output
			 * @return string representation of the range object
			 * @hide
			 */
			toString: function (verbose) {
				if (!verbose) {
					return 'Aloha.Selection.SelectionRange';
				}
				return 'Aloha.Selection.SelectionRange {start [' + this.startContainer.nodeValue + '] offset ' + this.startOffset + ', end [' + this.endContainer.nodeValue + '] offset ' + this.endOffset + '}';
			}

		}) // SelectionRange

	}); // Selection


	/**
	 * This method implements an ugly workaround for a selection problem in ie:
	 * when the cursor shall be placed at the end of a text node in a li element, that is followed by a nested list,
	 * the selection would always snap into the first li of the nested list
	 * therefore, we make sure that the text node ends with a space and place the cursor right before it
	 */
	function nestedListInIEWorkaround(range) {
		var nextSibling;
		if (jQuery.browser.msie && range.startContainer === range.endContainer && range.startOffset === range.endOffset && range.startContainer.nodeType == 3 && range.startOffset == range.startContainer.data.length && range.startContainer.nextSibling) {
			nextSibling = range.startContainer.nextSibling;
			if ('OL' === nextSibling.nodeName || 'UL' === nextSibling.nodeName) {
				if (range.startContainer.data[range.startContainer.data.length - 1] == ' ') {
					range.startOffset = range.endOffset = range.startOffset - 1;
				} else {
					range.startContainer.data = range.startContainer.data + ' ';
				}
			}
		}
	}

	function correctRange(range) {
		nestedListInIEWorkaround(range);
		return range;
	}

	/**
	 * Implements Selection http://html5.org/specs/dom-range.html#selection
	 * @namespace Aloha
	 * @class Selection This singleton class always represents the
	 *        current user selection
	 * @singleton
	 */
	var AlohaSelection = Class.extend({

		_constructor: function (nativeSelection) {

			this._nativeSelection = nativeSelection;
			this.ranges = [];

			// will remember if urged to not change the selection
			this.preventChange = false;

		},

		/**
		 * Returns the element that contains the start of the selection. Returns null if there's no selection.
		 * @readonly
		 * @type Node
		 */
		anchorNode: null,

		/**
		 * Returns the offset of the start of the selection relative to the element that contains the start 
		 * of the selection. Returns 0 if there's no selection.
		 * @readonly
		 * @type int
		 */
		anchorOffset: 0,

		/**
		 * Returns the element that contains the end of the selection.
		 * Returns null if there's no selection.
		 * @readonly
		 * @type Node
		 */
		focusNode: null,

		/**
		 * Returns the offset of the end of the selection relative to the element that contains the end 
		 * of the selection. Returns 0 if there's no selection.
		 * @readonly
		 * @type int
		 */
		focusOffset: 0,

		/**
		 * Returns true if there's no selection or if the selection is empty. Otherwise, returns false.
		 * @readonly
		 * @type boolean
		 */
		isCollapsed: false,

		/**
		 * Returns the number of ranges in the selection.
		 * @readonly
		 * @type int
		 */
		rangeCount: 0,

		/**
		 * Replaces the selection with an empty one at the given position.
		 * @throws a WRONG_DOCUMENT_ERR exception if the given node is in a different document.
		 * @param parentNode Node of new selection
		 * @param offest offest of new Selection in parentNode
		 * @void
		 */
		collapse: function (parentNode, offset) {
			this._nativeSelection.collapse(parentNode, offset);
		},

		/**
		 * Replaces the selection with an empty one at the position of the start of the current selection.
		 * @throws an INVALID_STATE_ERR exception if there is no selection.
		 * @void
		 */
		collapseToStart: function () {
			throw "NOT_IMPLEMENTED";
		},

		/** 
		 * @void
		 */
		extend: function (parentNode, offset) {

		},

		/**
		 * @param alter DOMString 
		 * @param direction DOMString 
		 * @param granularity DOMString 
		 * @void
		 */
		modify: function (alter, direction, granularity) {

		},

		/**
		 * Replaces the selection with an empty one at the position of the end of the current selection.
		 * @throws an INVALID_STATE_ERR exception if there is no selection.
		 * @void
		 */
		collapseToEnd: function () {
			this._nativeSelection.collapseToEnd();
		},

		/**
		 * Replaces the selection with one that contains all the contents of the given element.
		 * @throws a WRONG_DOCUMENT_ERR exception if the given node is in a different document.
		 * @param parentNode Node the Node fully select
		 * @void
		 */
		selectAllChildren: function (parentNode) {
			throw "NOT_IMPLEMENTED";
		},

		/**
		 * Deletes the contents of the selection
		 */
		deleteFromDocument: function () {
			throw "NOT_IMPLEMENTED";
		},

		/**
		 * NB!
		 * We have serious problem in IE.
		 * The range that we get in IE is not the same as the range we had set,
		 * so even if we normalize it during getRangeAt, in IE, we will be
		 * correcting the range to the "correct" place, but still not the place
		 * where it was originally set.
		 * 
		 * Returns the given range.
		 * The getRangeAt(index) method returns the indexth range in the list. 
		 * NOTE: Aloha Editor only support 1 range! index can only be 0
		 * @throws INDEX_SIZE_ERR DOM exception if index is less than zero or 
		 * greater or equal to the value returned by the rangeCount.
		 * @param index int 
		 * @return Range return the selected range from index
		 */
		getRangeAt: function (index) {
			return correctRange(this._nativeSelection.getRangeAt(index));
			//if ( index < 0 || this.rangeCount ) {
			//	throw "INDEX_SIZE_ERR DOM";
			//}
			//return this._ranges[index];
		},

		/**
		 * Adds the given range to the selection.
		 * The addRange(range) method adds the given range Range object to the list of
		 * selections, at the end (so the newly added range is the new last range). 
		 * NOTE: Aloha Editor only support 1 range! The added range will replace the 
		 * range at index 0
		 * see http://html5.org/specs/dom-range.html#selection note about addRange
		 * @throws an INVALID_NODE_TYPE_ERR exception if the given Range has a boundary point
		 * node that's not a Text or Element node, and an INVALID_MODIFICATION_ERR exception 
		 * if it has a boundary point node that doesn't descend from a Document.
		 * @param range Range adds the range to the selection
		 * @void
		 */
		addRange: function (range) {
			// set readonly attributes
			this._nativeSelection.addRange(range);
			// We will correct the range after rangy has processed the native
			// selection range, so that our correction will be the final fix on
			// the range according to the guarentee's that Aloha wants to make
			this._nativeSelection._ranges[0] = correctRange(range);

			// make sure, the old Aloha selection will be updated (until all implementations use the new AlohaSelection)
			Aloha.Selection.updateSelection();
		},

		/**
		 * Removes the given range from the selection, if the range was one of the ones in the selection.
		 * NOTE: Aloha Editor only support 1 range! The added range will replace the 
		 * range at with index 0
		 * @param range Range removes the range from the selection
		 * @void
		 */
		removeRange: function (range) {
			this._nativeSelection.removeRange();
		},

		/**
		 * Removes all the ranges in the selection.
		 * @viod
		 */
		removeAllRanges: function () {
			this._nativeSelection.removeAllRanges();
		},

		/**
		 * INFO: Method is used for integration with Gentics
		 * Aloha, has no use otherwise Updates the rangeObject
		 * according to the current user selection Method is
		 * always called on selection change
		 * 
		 * @param event
		 *            jQuery browser event object
		 * @return true when rangeObject was modified, false
		 *         otherwise
		 * @hide
		 */
		refresh: function (event) {

		},

		/**
		 * String representation
		 * 
		 * @return "Aloha.Selection"
		 * @hide
		 */
		toString: function () {
			return 'Aloha.Selection';
		},

		getRangeCount: function () {
			return this._nativeSelection.rangeCount;
		}

	});

	/**
	 * A wrapper for the function of the same name in the rangy core-depdency.
	 * This function should be preferred as it hides the global rangy object.
	 * For more information look at the following sites:
	 * http://html5.org/specs/dom-range.html
	 * @param window optional - specifices the window to get the selection of
	 */
	Aloha.getSelection = function (target) {
		target = (target !== document || target !== window) ? window : target;
		// Aloha.Selection.refresh()
		// implement Aloha Selection 
		// TODO cache
		return new AlohaSelection(window.rangy.getSelection(target));
	};

	/**
	 * A wrapper for the function of the same name in the rangy core-depdency.
	 * This function should be preferred as it hides the global rangy object.
	 * Please note: when the range object is not needed anymore,
	 *   invoke the detach method on it. It is currently unknown to me why
	 *   this is required, but that's what it says in the rangy specification.
	 * For more information look at the following sites:
	 * http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html
	 * @param document optional - specifies which document to create the range for
	 */
	Aloha.createRange = function (givenWindow) {
		return window.rangy.createRange(givenWindow);
	};

	var selection = new Selection();
	Aloha.Selection = selection;

	return selection;
});

/* block-jump.js is part of the Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
/**
 * Implements some logic related to moving the cursor keys across blocks.
 * 
 * In the following example
 *
 * "some text<span class="aloha-block ..." contenteditable="false" ...>...</span>[]some text"
 *
 * when one moves the cursor indicated by "[]" to the left, the entire
 * non-contenteditable block is skipped. The same for moving the cursor
 * right across the block.
 *
 * TODO: actually, the block shouldn't be skipped, it should be
 *       selected/highlighted first.
 * TODO: this file currently doesn't contain all the code to implement
 *       block jumping. Some of it is currently implemented in markup.js.
 */
define('aloha/block-jump',[
	'aloha/core',
	'jquery',
	'aloha/console'
], function (
	Aloha,
	$,
	console
) {
	

	var zeroWidthNode = null;

	/**
	 * Replaces the text in given text with the given text.
	 *
	 * @param node
	 *        A text node attached to the DOM.
	 * @param text
	 *        A string that is to replace the text of the given text node.
	 */
	function replaceMergeTextNode(node, text) {
		node.deleteData(0, node.length);
		if ('' !== text) {
			if (node.nextSibling && 3 === node.nextSibling.nodeType) {
				node.nextSibling.insertData(0, text);
			} else if (node.previousSibling && 3 === node.previousSibling.nodeType) {
				node.previousSibling.insertData(node.previousSibling.length, text);
			} else {
				node.insertData(0, text);
			}
		}
		// We don't remove the node immediately to avoid intefering with a
		// caller's range object that may have a start or end containers
		// equal to this node. Removing it in a timeout may still interfere
		// with the selection, but that was not a problem during testing.
		setTimeout(function () {
			if (0 === node.length) {
				$(node).remove();
			}
		}, 0);
	}

	/**
	 * Removes a previously inserted zero width text node.
	 * See insertZeroWidthTextNodeFix().
	 */
	function removeZeroWidthTextNodeFix() {
		if (!zeroWidthNode) {
			return;
		}
		// We want to only replace a single zero-width character to avoid
		// interfering with the other zero-width whitespace hack that makes
		// empty lines visible in IE7.
		var text = zeroWidthNode.nodeValue.replace(/\u200b/, '');
		if (text === zeroWidthNode.nodeValue) {
			console.warn('Expected to remove the zero width text node fix, but couldn\'t find it');
		}
		replaceMergeTextNode(zeroWidthNode, text);
		zeroWidthNode = null;
	}

	/**
	 * Inserts a zero width text node before or after a block.
	 *
	 * There is a problem where some browsers can't select the boundary
	 * between some contenteditable content and non-contenteditable
	 * content. For example, if in the example at the top of the file
	 * the selection were one step to the right "...</span>s[]ome..."
	 * and the left cursor key were pressed, then the selection would
	 * just disappear or be stuck between the span and the text node.
	 *
	 * To work around this problem a zero width text node is inserted
	 * before or after a block.
	 *
	 * The inserted zero width text node will be removed automatically
	 * when it isn't necessary any more (on selection change or on
	 * editable.getContents()).
	 *
	 * TODO: In retrospect, a better alternative may be to simply wrap
	 *       every inlin-block with an editable span.
	 * @param block
	 *        The DOM element for a block before or after which the zero
	 *        width text node will be inserted.
	 * @param isGoingLeft
	 *        True if the zero width text node is to be inserted after
	 *        the block element, or false if the zero width text node is
	 *        to be inserted before the block element.
	 * @return
	 *        The text node that was inserted.
	 */
	function insertZeroWidthTextNodeFix(block, isGoingLeft) {
		removeZeroWidthTextNodeFix();
		zeroWidthNode = document.createTextNode("\u200b");
		if (isGoingLeft) {
			$(block).after(zeroWidthNode);
		} else {
			$(block).before(zeroWidthNode);
		}
		Aloha.bind('aloha-selection-changed', function (event) {
			removeZeroWidthTextNodeFix();
			Aloha.unbind(event);
		});
		return zeroWidthNode;
	}

	return {
		removeZeroWidthTextNodeFix: removeZeroWidthTextNodeFix,
		insertZeroWidthTextNodeFix: insertZeroWidthTextNodeFix
	};
});

/* markup.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('aloha/markup',[
	'aloha/core',
	'util/class',
	'util/html',
	'jquery',
	'aloha/ecma5shims',
	'aloha/console',
	'aloha/block-jump'
], function (
	Aloha,
	Class,
	Html,
	jQuery,
	shims,
	console,
	BlockJump
) {
	

	var GENTICS = window.GENTICS;

	var isOldIE = !!(jQuery.browser.msie && 9 > parseInt(jQuery.browser.version, 10));

	function isBR(node) {
		return 'BR' === node.nodeName;
	}

	function isBlock(node) {
		return 'false' === jQuery(node).attr('contenteditable');
	}

	function isTextNode(node) {
		return node && 3 === node.nodeType; // Node.TEXT_NODE
	}

	function nodeLength(node) {
		return !node ? 0 : (isTextNode(node) ? node.length : node.childNodes.length);
	}

	/**
	 * Determines whether the given text node is visible to the the user,
	 * based on our understanding that browsers will not display
	 * superfluous white spaces.
	 *
	 * @param {HTMLEmenent} node The text node to be checked.
	 */
	function isVisibleTextNode(node) {
		return 0 < node.data.replace(/\s+/g, '').length;
	}

	function nextVisibleNode(node) {
		if (!node) {
			return null;
		}

		if (node.nextSibling) {
			// Skip over nodes that the user cannot see ...
			if (isTextNode(node.nextSibling) && !isVisibleTextNode(node.nextSibling)) {
				return nextVisibleNode(node.nextSibling);
			}

			// Skip over propping <br>s ...
			if (isBR(node.nextSibling) && node.nextSibling === node.parentNode.lastChild) {
				return nextVisibleNode(node.nextSibling);
			}

			// Skip over empty editable elements ...
			if ('' === node.nextSibling.innerHTML && !isBlock(node.nextSibling)) {
				return nextVisibleNode(node.nextSibling);
			}

			return node.nextSibling;
		}

		if (node.parentNode) {
			return nextVisibleNode(node.parentNode);
		}

		return null;
	}

	function prevVisibleNode(node) {
		if (!node) {
			return null;
		}

		if (node.previousSibling) {
			// Skip over nodes that the user cannot see...
			if (isTextNode(node.previousSibling) && !isVisibleTextNode(node.previousSibling)) {
				return prevVisibleNode(node.previousSibling);
			}

			// Skip over empty editable elements ...
			if ('' === node.previousSibling.innerHTML && !isBlock(node.previousSibling)) {
				return prevVisibleNode(node.previouSibling);
			}

			return node.previousSibling;
		}

		if (node.parentNode) {
			return prevVisibleNode(node.parentNode);
		}

		return null;
	}

	function isFrontPosition(node, offset) {
		return (0 === offset) || (offset <= node.data.length - node.data.replace(/^\s+/, '').length);
	}

	function isBlockInsideEditable($block) {
		return $block.parent().hasClass('aloha-editable');
	}

	function isEndPosition(node, offset) {
		var length = nodeLength(node);

		if (length === offset) {
			return true;
		}

		var isText = isTextNode(node);

		// If within a text node, then ignore superfluous white-spaces,
		// since they are invisible to the user.
		if (isText && node.data.replace(/\s+$/, '').length === offset) {
			return true;
		}

		if (1 === length && !isText) {
			return isBR(node.childNodes[0]);
		}

		return false;
	}

	function blink(node) {
		jQuery(node).stop(true).css({
			opacity: 0
		}).fadeIn(0).delay(100).fadeIn(function () {
			jQuery(node).css({
				opacity: 1
			});
		});

		return node;
	}

	function nodeContains(node1, node2) {
		return isOldIE ? (shims.compareDocumentPosition(node1, node2) & 16) : 0 < jQuery(node1).find(node2).length;
	}

	function isInsidePlaceholder(range) {
		var start = range.startContainer;
		var end = range.endContainer;
		var $placeholder = window.$_alohaPlaceholder;

		return $placeholder.is(start) || $placeholder.is(end) || nodeContains($placeholder[0], start) || nodeContains($placeholder[0], end);
	}

	function cleanupPlaceholders(range) {
		if (window.$_alohaPlaceholder && !isInsidePlaceholder(range)) {
			if (0 === window.$_alohaPlaceholder.html().replace(/^(&nbsp;)*$/, '').length) {
				window.$_alohaPlaceholder.remove();
			}

			window.$_alohaPlaceholder = null;
		}
	}

	/**
	 * @TODO(petro): We need to be more intelligent about whether we insert a
	 *               block-level placeholder or a phrasing level element.
	 * @TODO(petro): test with <pre>
	 * @TODO: move to block-jump.js
	 */
	function jumpBlock(block, isGoingLeft, currentRange) {
		var range = new GENTICS.Utils.RangeObject();
		var sibling = isGoingLeft ? prevVisibleNode(block) : nextVisibleNode(block);

		if (!sibling || isBlock(sibling)) {
			var $landing = jQuery('<div>&nbsp;</div>');

			if (isGoingLeft) {
				jQuery(block).before($landing);
			} else {
				jQuery(block).after($landing);
			}

			range.startContainer = range.endContainer = $landing[0];
			range.startOffset = range.endOffset = 0;

			// Clear out any old placeholder first ...
			cleanupPlaceholders(range);

			window.$_alohaPlaceholder = $landing;
		} else {

			// Don't jump the block yet if the cursor is moving to the
			// beginning or end of a text node, or if it is about to leave
			// an element node. Both these cases require a hack in some
			// browsers.
			var moveToBoundaryPositionInIE = ( // To the beginning or end of a text node?
				(currentRange.startContainer.nodeType === 3
				 && currentRange.startContainer === currentRange.endContainer
				 && currentRange.startContainer.nodeValue !== ""
				 && (isGoingLeft ? currentRange.startOffset === 1 : currentRange.endOffset + 1 === currentRange.endContainer.length))
				// Leaving an element node?
					|| (currentRange.startContainer.nodeType === 1
						&& (!currentRange.startOffset
							|| (currentRange.startContainer.childNodes[currentRange.startOffset] && currentRange.startContainer.childNodes[currentRange.startOffset].nodeType === 1)))
			);

			if (moveToBoundaryPositionInIE) {
				// The cursor is moving to the beginning or end of a text
				// node, or is leaving an element node, which requires a
				// hack in some browsers.
				var zeroWidthNode = BlockJump.insertZeroWidthTextNodeFix(block, isGoingLeft);
				range.startContainer = range.endContainer = zeroWidthNode;
				range.startOffset = range.endOffset = isGoingLeft ? 1 : 0;
			} else {
				// The selection is already at the boundary position - jump
				// the block.
				range.startContainer = range.endContainer = sibling;
				range.startOffset = range.endOffset = isGoingLeft ? nodeLength(sibling) : 0;
				if (!isGoingLeft) {
					// Just as above, jumping to the first position right of
					// a block requires a hack in some browsers. Jumping
					// left seems to be fine.
					BlockJump.insertZeroWidthTextNodeFix(block, true);
				}
			}
			cleanupPlaceholders(range);
		}

		range.select();

		Aloha.trigger('aloha-block-selected', block);
		Aloha.Selection.preventSelectionChanged();
	}

	/**
	 * Markup object
	 */
	Aloha.Markup = Class.extend({

		/**
		 * Key handlers for special key codes
		 */
		keyHandlers: {},

		/**
		 * Add a key handler for the given key code
		 * @param keyCode key code
		 * @param handler handler function
		 */
		addKeyHandler: function (keyCode, handler) {
			if (!this.keyHandlers[keyCode]) {
				this.keyHandlers[keyCode] = [];
			}

			this.keyHandlers[keyCode].push(handler);
		},

		/**
		 * Removes a key handler for the given key code
		 * @param keyCode key code
		 */
		removeKeyHandler: function (keyCode) {
			if (this.keyHandlers[keyCode]) {
				this.keyHandlers[keyCode] = null;
			}
		},

		insertBreak: function () {
			var range = Aloha.Selection.rangeObject,
				nonWSIndex,
				nextTextNode,
				newBreak;

			if (!range.isCollapsed()) {
				this.removeSelectedMarkup();
			}

			newBreak = jQuery('<br/>');
			GENTICS.Utils.Dom.insertIntoDOM(newBreak, range, Aloha.activeEditable.obj);

			nextTextNode = GENTICS.Utils.Dom.searchAdjacentTextNode(
				newBreak.parent().get(0),
				GENTICS.Utils.Dom.getIndexInParent(newBreak.get(0)) + 1,
				false
			);

			if (nextTextNode) {
				// trim leading whitespace
				nonWSIndex = nextTextNode.data.search(/\S/);
				if (nonWSIndex > 0) {
					nextTextNode.data = nextTextNode.data.substring(nonWSIndex);
				}
			}

			range.startContainer = range.endContainer = newBreak.get(0).parentNode;
			range.startOffset = range.endOffset = GENTICS.Utils.Dom.getIndexInParent(newBreak.get(0)) + 1;
			range.correctRange();
			range.clearCaches();
			range.select();
		},

		/**
		 * first method to handle key strokes
		 * @param event DOM event
		 * @param rangeObject as provided by Aloha.Selection.getRangeObject();
		 * @return "Aloha.Selection"
		 */
		preProcessKeyStrokes: function (event) {
			if (event.type !== 'keydown') {
				return false;
			}

			var rangeObject,
			    handlers,
			    i;

			if (this.keyHandlers[event.keyCode]) {
				handlers = this.keyHandlers[event.keyCode];
				for (i = 0; i < handlers.length; ++i) {
					if (!handlers[i](event)) {
						return false;
					}
				}
			}

			// LEFT (37), RIGHT (39) keys for block detection
			if (event.keyCode === 37 || event.keyCode === 39) {
				if (Aloha.getSelection().getRangeCount()) {
					rangeObject = Aloha.getSelection().getRangeAt(0);

					if (this.processCursor(rangeObject, event.keyCode)) {
						cleanupPlaceholders(Aloha.Selection.rangeObject);
						return true;
					}
				}

				return false;
			}

			// BACKSPACE
			if (event.keyCode === 8) {
				event.preventDefault(); // prevent history.back() even on exception
				Aloha.execCommand('delete', false);
				return false;
			}

			// DELETE
			if (event.keyCode === 46) {
				Aloha.execCommand('forwarddelete', false);
				return false;
			}

			// ENTER
			if (event.keyCode === 13) {
				if (event.shiftKey || !Html.allowNestedParagraph(Aloha.activeEditable)) {
					Aloha.execCommand('insertlinebreak', false);
					return false;
				}
				Aloha.execCommand('insertparagraph', false);
				return false;
			}
			return true;
		},

		/**
		 * Processing of cursor keys.
		 * Detect blocks (elements with contenteditable=false) and will select them
		 * (normally the cursor would simply jump right past them).
		 *
		 * For each block that is selected, an 'aloha-block-selected' event will be
		 * triggered.
		 *
		 * TODO: the above is what should happen. Currently we just skip past blocks.
		 *
		 * @param {RangyRange} range A range object for the current selection.
		 * @param {number} keyCode Code of the currently pressed key.
		 * @return {boolean} False if a block was found, to prevent further events,
		 *                   true otherwise.
		 * @TODO move to block-jump.js
		 */
		processCursor: function (range, keyCode) {
			if (!range.collapsed) {
				return true;
			}

			BlockJump.removeZeroWidthTextNodeFix();

			var node = range.startContainer,
				selection = Aloha.getSelection();

			if (!node) {
				return true;
			}

			var sibling, offset;

			// special handling for moving Cursor around zero-width whitespace in IE7
			if (jQuery.browser.msie && parseInt(jQuery.browser.version, 10) <= 7 && isTextNode(node)) {
				if (keyCode == 37) {
					// moving left -> skip zwsp to the left
					offset = range.startOffset;
					while (offset > 0 && node.data.charAt(offset - 1) === '\u200b') {
						offset--;
					}
					if (offset != range.startOffset) {
						range.setStart(range.startContainer, offset);
						range.setEnd(range.startContainer, offset);
						selection = Aloha.getSelection();
						selection.removeAllRanges();
						selection.addRange(range);
					}
				} else if (keyCode == 39) {
					// moving right -> skip zwsp to the right
					offset = range.startOffset;
					while (offset < node.data.length && node.data.charAt(offset) === '\u200b') {
						offset++;
					}
					if (offset != range.startOffset) {
						range.setStart(range.startContainer, offset);
						range.setEnd(range.startContainer, offset);
						selection.removeAllRanges();
						selection.addRange(range);
					}
				}
			}

			// Versions of Internet Explorer that are older that 9, will
			// erroneously allow you to enter and edit inside elements which have
			// their contenteditable attribute set to false...
			if (isOldIE && !jQuery(node).contentEditable()) {
				var $parentBlock = jQuery(node).parents('[contenteditable=false]');
				var isInsideBlock = $parentBlock.length > 0;

				if (isInsideBlock) {
					if (isBlockInsideEditable($parentBlock)) {
						sibling = $parentBlock[0];
					} else {
						return true;
					}
				}
			}

			var isLeft;
			if (!sibling) {
				// True if keyCode denotes LEFT or UP arrow key, otherwise they
				// keyCode is for RIGHT or DOWN in which this value will be false.
				isLeft = (37 === keyCode || 38 === keyCode);
				offset = range.startOffset;

				if (isTextNode(node)) {
					if (isLeft) {
						var isApproachingFrontPosition = (1 === offset);
						if (!isApproachingFrontPosition && !isFrontPosition(node, offset)) {
							return true;
						}
					} else if (!isEndPosition(node, offset)) {
						return true;
					}

				} else {
					node = node.childNodes[offset === nodeLength(node) ? offset - 1 : offset];
				}

				sibling = isLeft ? prevVisibleNode(node) : nextVisibleNode(node);
			}

			if (isBlock(sibling)) {
				jumpBlock(sibling, isLeft, range);
				return false;
			}

			return true;
		},

		/**
		 * method handling shiftEnter
		 * @param Aloha.Selection.SelectionRange of the current selection
		 * @return void
		 */
		processShiftEnter: function (rangeObject) {
			this.insertHTMLBreak(rangeObject.getSelectionTree(), rangeObject);
		},

		/**
		 * method handling Enter
		 * @param Aloha.Selection.SelectionRange of the current selection
		 * @return void
		 */
		processEnter: function (rangeObject) {
			if (rangeObject.splitObject) {
				// now comes a very evil hack for ie, when the enter is pressed in a text node in an li element, we just append an empty text node
				// if ( jQuery.browser.msie
				//      && GENTICS.Utils.Dom
				//           .isListElement( rangeObject.splitObject ) ) {
				//  jQuery( rangeObject.splitObject ).append(
				//          jQuery( document.createTextNode( '' ) ) );
				//  }
				this.splitRangeObject(rangeObject);
			} else { // if there is no split object, the Editable is the paragraph type itself (e.g. a p or h2)
				this.insertHTMLBreak(rangeObject.getSelectionTree(), rangeObject);
			}
		},

		/**
		 * Insert the given html markup at the current selection
		 * @param html html markup to be inserted
		 */
		insertHTMLCode: function (html) {
			var rangeObject = Aloha.Selection.rangeObject;
			this.insertHTMLBreak(rangeObject.getSelectionTree(), rangeObject, jQuery(html));
		},

		/**
		 * insert an HTML Break <br /> into current selection
		 * @param Aloha.Selection.SelectionRange of the current selection
		 * @return void
		 */
		insertHTMLBreak: function (selectionTree, rangeObject, inBetweenMarkup) {
			var i,
			    treeLength,
			    el,
			    jqEl,
			    jqElBefore,
			    jqElAfter,
			    tmpObject,
			    offset,
			    checkObj;

			inBetweenMarkup = inBetweenMarkup || jQuery('<br/>');

			for (i = 0, treeLength = selectionTree.length; i < treeLength; ++i) {
				el = selectionTree[i];
				jqEl = el.domobj ? jQuery(el.domobj) : undefined;

				if (el.selection !== 'none') { // before cursor, leave this part inside the splitObject
					if (el.selection == 'collapsed') {
						// collapsed selection found (between nodes)
						if (i > 0) {
							// not at the start, so get the element to the left
							jqElBefore = jQuery(selectionTree[i - 1].domobj);

							// and insert the break after it
							jqElBefore.after(inBetweenMarkup);

						} else {
							// at the start, so get the element to the right
							jqElAfter = jQuery(selectionTree[1].domobj);

							// and insert the break before it
							jqElAfter.before(inBetweenMarkup);
						}

						// now set the range
						rangeObject.startContainer = rangeObject.endContainer = inBetweenMarkup[0].parentNode;
						rangeObject.startOffset = rangeObject.endOffset = GENTICS.Utils.Dom.getIndexInParent(inBetweenMarkup[0]) + 1;
						rangeObject.correctRange();

					} else if (el.domobj && el.domobj.nodeType === 3) { // textNode
						// when the textnode is immediately followed by a blocklevel element (like p, h1, ...) we need to add an additional br in between
						if (el.domobj.nextSibling && el.domobj.nextSibling.nodeType == 1 && Aloha.Selection.replacingElements[el.domobj.nextSibling.nodeName.toLowerCase()]) {
							// TODO check whether this depends on the browser
							jqEl.after('<br/>');
						}

						if (this.needEndingBreak()) {
							// when the textnode is the last inside a blocklevel element
							// (like p, h1, ...) we need to add an additional br as very
							// last object in the blocklevel element
							checkObj = el.domobj;

							while (checkObj) {
								if (checkObj.nextSibling) {
									checkObj = false;
								} else {
									// go to the parent
									checkObj = checkObj.parentNode;

									// found a blocklevel or list element, we are done
									if (GENTICS.Utils.Dom.isBlockLevelElement(checkObj) || GENTICS.Utils.Dom.isListElement(checkObj)) {
										break;
									}

									// reached the limit object, we are done
									if (checkObj === rangeObject.limitObject) {
										checkObj = false;
									}
								}
							}

							// when we found a blocklevel element, insert a break at the
							// end. Mark the break so that it is cleaned when the
							// content is fetched.
							if (checkObj) {
								jQuery(checkObj).append('<br class="aloha-cleanme" />');
							}
						}

						// insert the break
						jqEl.between(inBetweenMarkup, el.startOffset);

						// correct the range
						// count the number of previous siblings
						offset = 0;
						tmpObject = inBetweenMarkup[0];
						while (tmpObject) {
							tmpObject = tmpObject.previousSibling;
							++offset;
						}

						rangeObject.startContainer = inBetweenMarkup[0].parentNode;
						rangeObject.endContainer = inBetweenMarkup[0].parentNode;
						rangeObject.startOffset = offset;
						rangeObject.endOffset = offset;
						rangeObject.correctRange();

					} else if (el.domobj && el.domobj.nodeType === 1) { // other node, normally a break
						if (jqEl.parent().find('br.aloha-ephemera').length === 0) {
							// but before putting it, remove all:
							jQuery(rangeObject.limitObject).find('br.aloha-ephemera').remove();

							//  now put it:
							jQuery(rangeObject.commonAncestorContainer).append(this.getFillUpElement(rangeObject.splitObject));
						}

						jqEl.after(inBetweenMarkup);

						// now set the selection. Since we just added one break do the currect el
						// the new position must be el's position + 1. el's position is the index
						// of the el in the selection tree, which is i. then we must add
						// another +1 because we want to be AFTER the object, not before. therefor +2
						rangeObject.startContainer = rangeObject.commonAncestorContainer;
						rangeObject.endContainer = rangeObject.startContainer;
						rangeObject.startOffset = i + 2;
						rangeObject.endOffset = i + 2;
						rangeObject.update();
					}
				}
			}
			rangeObject.select();
		},

		/**
		 * Check whether blocklevel elements need breaks at the end to visibly render a newline
		 * @return true if an ending break is necessary, false if not
		 */
		needEndingBreak: function () {
			// currently, all browser except IE need ending breaks
			return !jQuery.browser.msie;
		},

		/**
		 * Get the currently selected text or false if nothing is selected (or the selection is collapsed)
		 * @return selected text
		 */
		getSelectedText: function () {
			var rangeObject = Aloha.Selection.rangeObject;

			if (rangeObject.isCollapsed()) {
				return false;
			}

			return this.getFromSelectionTree(rangeObject.getSelectionTree(), true);
		},

		/**
		 * Recursive function to get the selected text from the selection tree starting at the given level
		 * @param selectionTree array of selectiontree elements
		 * @param astext true when the contents shall be fetched as text, false for getting as html markup
		 * @return selected text from that level (incluiding all sublevels)
		 */
		getFromSelectionTree: function (selectionTree, astext) {
			var text = '', i, treeLength, el, clone;
			for (i = 0, treeLength = selectionTree.length; i < treeLength; i++) {
				el = selectionTree[i];
				if (el.selection == 'partial') {
					if (el.domobj.nodeType === 3) {
						// partial text node selected, get the selected part
						text += el.domobj.data.substring(el.startOffset, el.endOffset);
					} else if (el.domobj.nodeType === 1 && el.children) {
						// partial element node selected, do the recursion into the children
						if (astext) {
							text += this.getFromSelectionTree(el.children, astext);
						} else {
							// when the html shall be fetched, we create a clone of
							// the element and remove all the children
							clone = jQuery(el.domobj.outerHTML).empty();
							// then we do the recursion and add the selection into the clone
							clone.html(this.getFromSelectionTree(el.children, astext));
							// finally we get the html of the clone
							text += clone.outerHTML();
						}
					}
				} else if (el.selection == 'full') {
					if (el.domobj.nodeType === 3) {
						// full text node selected, get the text
						text += jQuery(el.domobj).text();
					} else if (el.domobj.nodeType === 1 && el.children) {
						// full element node selected, get the html of the node and all children
						text += astext ? jQuery(el.domobj).text() : jQuery(el.domobj).outerHTML();
					}
				}
			}

			return text;
		},

		/**
		 * Get the currently selected markup or false if nothing is selected (or the selection is collapsed)
		 * @return {?String}
		 */
		getSelectedMarkup: function () {
			var rangeObject = Aloha.Selection.rangeObject;
			return rangeObject.isCollapsed() ? null : this.getFromSelectionTree(rangeObject.getSelectionTree(), false);
		},

		/**
		 * Remove the currently selected markup
		 */
		removeSelectedMarkup: function () {
			var rangeObject = Aloha.Selection.rangeObject,
				newRange;

			if (rangeObject.isCollapsed()) {
				return;
			}

			newRange = new Aloha.Selection.SelectionRange();
			// remove the selection
			this.removeFromSelectionTree(rangeObject.getSelectionTree(), newRange);

			// do a cleanup now (starting with the commonancestorcontainer)
			newRange.update();
			GENTICS.Utils.Dom.doCleanup({
				'merge': true,
				'removeempty': true
			}, Aloha.Selection.rangeObject);
			Aloha.Selection.rangeObject = newRange;

			// need to set the collapsed selection now
			newRange.correctRange();
			newRange.update();
			newRange.select();
			Aloha.Selection.updateSelection();
		},

		/**
		 * Recursively remove the selected items, starting with the given level in the selectiontree
		 * @param selectionTree current level of the selectiontree
		 * @param newRange new collapsed range to be set after the removal
		 */
		removeFromSelectionTree: function (selectionTree, newRange) {
			// remember the first found partially selected element node (in case we need
			// to merge it with the last found partially selected element node)
			var firstPartialElement, newdata, i, el, adjacentTextNode, treeLength;

			// iterate through the selection tree
			for (i = 0, treeLength = selectionTree.length; i < treeLength; i++) {
				el = selectionTree[i];

				// check the type of selection
				if (el.selection == 'partial') {
					if (el.domobj.nodeType === 3) {
						// partial text node selected, so remove the selected portion
						newdata = '';
						if (el.startOffset > 0) {
							newdata += el.domobj.data.substring(0, el.startOffset);
						}
						if (el.endOffset < el.domobj.data.length) {
							newdata += el.domobj.data.substring(el.endOffset, el.domobj.data.length);
						}
						el.domobj.data = newdata;

						// eventually set the new range (if not done before)
						if (!newRange.startContainer) {
							newRange.startContainer = newRange.endContainer = el.domobj;
							newRange.startOffset = newRange.endOffset = el.startOffset;
						}
					} else if (el.domobj.nodeType === 1 && el.children) {
						// partial element node selected, so do the recursion into the children
						this.removeFromSelectionTree(el.children, newRange);

						if (firstPartialElement) {
							// when the first parially selected element is the same type
							// of element, we need to merge them
							if (firstPartialElement.nodeName == el.domobj.nodeName) {
								// merge the nodes
								jQuery(firstPartialElement).append(jQuery(el.domobj).contents());

								// and remove the latter one
								jQuery(el.domobj).remove();
							}

						} else {
							// remember this element as first partially selected element
							firstPartialElement = el.domobj;
						}
					}

				} else if (el.selection == 'full') {
					// eventually set the new range (if not done before)
					if (!newRange.startContainer) {
						adjacentTextNode = GENTICS.Utils.Dom.searchAdjacentTextNode(
							el.domobj.parentNode,
							GENTICS.Utils.Dom.getIndexInParent(el.domobj) + 1,
							false,
							{
								'blocklevel': false
							}
						);

						if (adjacentTextNode) {
							newRange.startContainer = newRange.endContainer = adjacentTextNode;
							newRange.startOffset = newRange.endOffset = 0;
						} else {
							newRange.startContainer = newRange.endContainer = el.domobj.parentNode;
							newRange.startOffset = newRange.endOffset = GENTICS.Utils.Dom.getIndexInParent(el.domobj) + 1;
						}
					}

					// full node selected, so just remove it (will also remove all children)
					jQuery(el.domobj).remove();
				}
			}
		},

		/**
		 * split passed rangeObject without or with optional markup
		 * @param Aloha.Selection.SelectionRange of the current selection
		 * @param markup object (jQuery) to insert in between the split elements
		 * @return void
		 */
		splitRangeObject: function (rangeObject, markup) {
			// UAAAA: first check where the markup can be inserted... *grrrrr*, then decide where to split
			// object which is split up
			var splitObject = jQuery(rangeObject.splitObject),
				selectionTree,
			    insertAfterObject,
			    followUpContainer;

			// update the commonAncestor with the splitObject (so that the selectionTree is correct)
			rangeObject.update(rangeObject.splitObject); // set the splitObject as new commonAncestorContainer and update the selectionTree

			// calculate the selection tree. NOTE: it is necessary to do this before
			// getting the followupcontainer, since getting the selection tree might
			// possibly merge text nodes, which would lead to differences in the followupcontainer
			selectionTree = rangeObject.getSelectionTree();

			// object to be inserted after the splitObject
			followUpContainer = this.getSplitFollowUpContainer(rangeObject);

			// now split up the splitObject into itself AND the followUpContainer
			this.splitRangeObjectHelper(selectionTree, rangeObject, followUpContainer); // split the current object into itself and the followUpContainer

			// check whether the followupcontainer is still marked for removal
			if (followUpContainer.hasClass('preparedForRemoval')) {
				// TODO shall we just remove the class or shall we not use the followupcontainer?
				followUpContainer.removeClass('preparedForRemoval');
			}

			// now let's find the place, where the followUp is inserted afterwards. normally that's the splitObject itself, but in
			// some cases it might be their parent (e.g. inside a list, a <p> followUp must be inserted outside the list)
			insertAfterObject = this.getInsertAfterObject(rangeObject, followUpContainer);

			// now insert the followUpContainer
			jQuery(followUpContainer).insertAfter(insertAfterObject); // attach the followUpContainer right after the insertAfterObject

			// in some cases, we want to remove the "empty" splitObject (e.g. LIs, if enter was hit twice)
			if (rangeObject.splitObject.nodeName.toLowerCase() === 'li' && !Aloha.Selection.standardTextLevelSemanticsComparator(rangeObject.splitObject, followUpContainer)) {
				jQuery(rangeObject.splitObject).remove();
			}

			rangeObject.startContainer = null;
			// first check whether the followUpContainer starts with a <br/>
			// if so, place the cursor right before the <br/>
			var followContents = followUpContainer.contents();
			if (followContents.length > 0 && followContents.get(0).nodeType == 1 && followContents.get(0).nodeName.toLowerCase() === 'br') {
				rangeObject.startContainer = followUpContainer.get(0);
			}

			if (!rangeObject.startContainer) {
				// find a possible text node in the followUpContainer and set the selection to it
				// if no textnode is available, set the selection to the followup container itself
				rangeObject.startContainer = followUpContainer.textNodes(true, true).first().get(0);
			}
			if (!rangeObject.startContainer) { // if no text node was found, select the parent object of <br class="aloha-ephemera" />
				rangeObject.startContainer = followUpContainer.textNodes(false).first().parent().get(0);
			}
			if (rangeObject.startContainer) {
				// the cursor is always at the beginning of the followUp
				rangeObject.endContainer = rangeObject.startContainer;
				rangeObject.startOffset = 0;
				rangeObject.endOffset = 0;
			} else {
				rangeObject.startContainer = rangeObject.endContainer = followUpContainer.parent().get(0);
				rangeObject.startOffset = rangeObject.endOffset = GENTICS.Utils.Dom.getIndexInParent(followUpContainer.get(0));
			}

			// finally update the range object again
			rangeObject.update();

			// now set the selection
			rangeObject.select();
		},

		/**
		 * method to get the object after which the followUpContainer can be inserted during splitup
		 * this is a helper method, not needed anywhere else
		 * @param rangeObject Aloha.Selection.SelectionRange of the current selection
		 * @param followUpContainer optional jQuery object; if provided the rangeObject will be split and the second part will be insert inside of this object
		 * @return object after which the followUpContainer can be inserted
		 */
		getInsertAfterObject: function (rangeObject, followUpContainer) {
			var passedSplitObject, i, el;

			for (i = 0; i < rangeObject.markupEffectiveAtStart.length; i++) {
				el = rangeObject.markupEffectiveAtStart[i];

				// check if we have already passed the splitObject (some other markup might come before)
				if (el === rangeObject.splitObject) {
					passedSplitObject = true;
				}

				// if not passed splitObject, skip this markup
				if (!passedSplitObject) {
					continue;
				}

				// once we are passed, check if the followUpContainer is allowed to be inserted into the currents el's parent
				if (Aloha.Selection.canTag1WrapTag2(jQuery(el).parent()[0].nodeName, followUpContainer[0].nodeName)) {
					return el;
				}
			}

			return false;
		},

		/**
		 * @fixme: Someone who knows what this function does, please refactor it.
		 *			1. splitObject arg is not used at all
		 *			2. Would be better to use ternary operation would be better than if else statement
		 *
		 * method to get the html code for a fillUpElement. this is needed for empty paragraphs etc., so that they take up their expected height
		 * @param splitObject split object (dom object)
		 * @return fillUpElement HTML Code
		 */
		getFillUpElement: function (splitObject) {
			if (jQuery.browser.msie) {
				return false;
			}
			return jQuery('<br class="aloha-cleanme"/>');
		},

		/**
		 * removes textNodes from passed array, which only contain contentWhiteSpace (e.g. a \n between two tags)
		 * @param domArray array of domObjects
		 * @return void
		 */
		removeElementContentWhitespaceObj: function (domArray) {
			var correction = 0,
				removeLater = [],
				i,
				el,
			    removeIndex;

			for (i = 0; i < domArray.length; ++i) {
				el = domArray[i];
				if (el.isElementContentWhitespace) {
					removeLater[removeLater.length] = i;
				}
			}

			for (i = 0; i < removeLater.length; ++i) {
				removeIndex = removeLater[i];
				domArray.splice(removeIndex - correction, 1);
				++correction;
			}
		},

		/**
		 * recursive method to parallelly walk through two dom subtrees, leave elements before startContainer in first subtree and move rest to other
		 * @param selectionTree tree to iterate over as contained in rangeObject. must be passed separately to allow recursion in the selection tree, but not in the rangeObject
		 * @param rangeObject Aloha.Selection.SelectionRange of the current selection
		 * @param followUpContainer optional jQuery object; if provided the rangeObject will be split and the second part will be insert inside of this object
		 * @param inBetweenMarkup jQuery object to be inserted between the two split parts. will be either a <br> (if no followUpContainer is passed) OR e.g. a table, which must be inserted between the splitobject AND the follow up
		 * @return void
		 */
		splitRangeObjectHelper: function (selectionTree, rangeObject, followUpContainer, inBetweenMarkup) {
			if (!followUpContainer) {
				Aloha.Log.warn(this, 'no followUpContainer, no inBetweenMarkup, nothing to do...');
			}

			var fillUpElement = this.getFillUpElement(rangeObject.splitObject),
				splitObject = jQuery(rangeObject.splitObject),
				startMoving = false,
				el,
				i,
				completeText,
				jqObj,
				mirrorLevel,
				parent,
				treeLength;

			if (selectionTree.length > 0) {
				mirrorLevel = followUpContainer.contents();

				// if length of mirrorLevel and selectionTree are not equal, the mirrorLevel must be corrected. this happens, when the mirrorLevel contains whitespace textNodes
				if (mirrorLevel.length !== selectionTree.length) {
					this.removeElementContentWhitespaceObj(mirrorLevel);
				}

				for (i = 0, treeLength = selectionTree.length; i < treeLength; ++i) {
					el = selectionTree[i];

					// remove all objects in the mirrorLevel, which are BEFORE the cursor
					// OR if the cursor is at the last position of the last Textnode (causing an empty followUpContainer to be appended)
					if ((el.selection === 'none' && startMoving === false) || (el.domobj && el.domobj.nodeType === 3 && el === selectionTree[(selectionTree.length - 1)] && el.startOffset === el.domobj.data.length)) {
						// iteration is before cursor, leave this part inside the splitObject, remove from followUpContainer
						// however if the object to remove is the last existing textNode within the followUpContainer, insert a BR instead
						// otherwise the followUpContainer is invalid and takes up no vertical space

						if (followUpContainer.textNodes().length > 1 || (el.domobj.nodeType === 1 && el.children.length === 0)) {
							// note: the second part of the if (el.domobj.nodeType === 1 && el.children.length === 0) covers a very special condition,
							// where an empty tag is located right before the cursor when pressing enter. In this case the empty tag would not be
							// removed correctly otherwise
							mirrorLevel.eq(i).remove();

						} else if (GENTICS.Utils.Dom.isSplitObject(followUpContainer[0])) {
							if (fillUpElement) {
								followUpContainer.html(fillUpElement); // for your zoological german knowhow: ephemera = Eintagsfliege
							} else {
								followUpContainer.empty();
							}

						} else {
							followUpContainer.empty();
							followUpContainer.addClass('preparedForRemoval');
						}

						continue;

					} else {
						// split objects, which are AT the cursor Position or directly above
						if (el.selection !== 'none') { // before cursor, leave this part inside the splitObject
							// TODO better check for selection == 'partial' here?
							if (el.domobj && el.domobj.nodeType === 3 && el.startOffset !== undefined) {
								completeText = el.domobj.data;
								if (el.startOffset > 0) { // first check, if there will be some text left in the splitObject
									el.domobj.data = completeText.substr(0, el.startOffset);
								} else if (selectionTree.length > 1) { // if not, check if the splitObject contains more than one node, because then it can be removed. this happens, when ENTER is pressed inside of a textnode, but not at the borders
									jQuery(el.domobj).remove();
								} else { // if the "empty" textnode is the last node left in the splitObject, replace it with a ephemera break
									// if the parent is a blocklevel element, we insert the fillup element
									parent = jQuery(el.domobj).parent();
									if (GENTICS.Utils.Dom.isSplitObject(parent[0])) {
										if (fillUpElement) {
											parent.html(fillUpElement);
										} else {
											parent.empty();
										}

									} else {
										// if the parent is no blocklevel element and would be empty now, we completely remove it
										parent.remove();
									}
								}
								if (completeText.length - el.startOffset > 0) {
									// first check if there is text left to put in the followUpContainer's textnode. this happens, when ENTER is pressed inside of a textnode, but not at the borders
									mirrorLevel[i].data = completeText.substr(el.startOffset, completeText.length);
								} else if (mirrorLevel.length > 1) {
									// if not, check if the followUpContainer contains more than one node, because if yes, the "empty" textnode can be removed
									mirrorLevel.eq((i)).remove();
								} else if (GENTICS.Utils.Dom.isBlockLevelElement(followUpContainer[0])) {
									// if the "empty" textnode is the last node left in the followUpContainer (which is a blocklevel element), replace it with a ephemera break
									if (fillUpElement) {
										followUpContainer.html(fillUpElement);
									} else {
										followUpContainer.empty();
									}

								} else {
									// if the "empty" textnode is the last node left in a non-blocklevel element, mark it for removal
									followUpContainer.empty();
									followUpContainer.addClass('preparedForRemoval');
								}
							}

							startMoving = true;

							if (el.children.length > 0) {
								this.splitRangeObjectHelper(el.children, rangeObject, mirrorLevel.eq(i), inBetweenMarkup);
							}

						} else {
							// remove all objects in the origin, which are AFTER the cursor
							if (el.selection === 'none' && startMoving === true) {
								// iteration is after cursor, remove from splitObject and leave this part inside the followUpContainer
								jqObj = jQuery(el.domobj).remove();
							}
						}
					}
				}
			} else {
				Aloha.Log.error(this, 'can not split splitObject due to an empty selection tree');
			}

			// and finally cleanup: remove all fillUps > 1
			splitObject.find('br.aloha-ephemera:gt(0)').remove(); // remove all elements greater than (gt) 0, that also means: leave one
			followUpContainer.find('br.aloha-ephemera:gt(0)').remove(); // remove all elements greater than (gt) 0, that also means: leave one

			// remove objects prepared for removal
			splitObject.find('.preparedForRemoval').remove();
			followUpContainer.find('.preparedForRemoval').remove();

			// if splitObject / followUp are empty, place a fillUp inside
			if (splitObject.contents().length === 0 && GENTICS.Utils.Dom.isSplitObject(splitObject[0]) && fillUpElement) {
				splitObject.html(fillUpElement);
			}

			if (followUpContainer.contents().length === 0 && GENTICS.Utils.Dom.isSplitObject(followUpContainer[0]) && fillUpElement) {
				followUpContainer.html(fillUpElement);
			}
		},

		/**
		 * returns a jQuery object fitting the passed splitObject as follow up object
		 * examples,
		 * - when passed a p it will return an empty p (clone of the passed p)
		 * - when passed an h1, it will return either an h1 (clone of the passed one) or a new p (if the collapsed selection was at the end)
		 * @param rangeObject Aloha.RangeObject
		 * @return void
		 */
		getSplitFollowUpContainer: function (rangeObject) {
			var tagName = rangeObject.splitObject.nodeName.toLowerCase(),
				returnObj,
				inside,
				lastObj;

			switch (tagName) {
			case 'h1':
			case 'h2':
			case 'h3':
			case 'h4':
			case 'h5':
			case 'h6':
				// get the last textnode in the splitobject, but don't consider aloha-cleanme elements
				lastObj = jQuery(rangeObject.splitObject).textNodes(':not(.aloha-cleanme)').last()[0];
				// special case: when enter is hit at the end of a heading, the followUp should be a <p>
				if (lastObj && rangeObject.startContainer === lastObj && rangeObject.startOffset === lastObj.length) {
					returnObj = jQuery('<p></p>');
					inside = jQuery(rangeObject.splitObject.outerHTML).contents();
					returnObj.append(inside);
					return returnObj;
				}
				break;

			case 'li':
				// TODO check whether the li is the last one
				// special case: if enter is hit twice inside a list, the next item should be a <p> (and inserted outside the list)
				if (rangeObject.startContainer.nodeName.toLowerCase() === 'br' && jQuery(rangeObject.startContainer).hasClass('aloha-ephemera')) {
					returnObj = jQuery('<p></p>');
					inside = jQuery(rangeObject.splitObject.outerHTML).contents();
					returnObj.append(inside);
					return returnObj;
				}
				// when the li is the last one and empty, we also just return a <p>
				if (!rangeObject.splitObject.nextSibling && jQuery.trim(jQuery(rangeObject.splitObject).text()).length === 0) {
					returnObj = jQuery('<p></p>');
					return returnObj;
				}
				break;
			}

			return jQuery(rangeObject.splitObject.outerHTML);
		},

		/**
		 * Transform the given domobj into an object with the given new nodeName.
		 * Preserves the content and all attributes. If a range object is given, also the range will be preserved
		 * @param domobj dom object to transform
		 * @param nodeName new node name
		 * @param range range object
		 * @api
		 * @return new object as jQuery object
		 */
		transformDomObject: function (domobj, nodeName, range) {
			// first create the new element
			var jqOldObj = jQuery(domobj),
				jqNewObj = jQuery('<' + nodeName + '>'),
				i,
				attributes = jqOldObj[0].cloneNode(false).attributes;

			// TODO what about events?
			// copy attributes
			if (attributes) {
				for (i = 0; i < attributes.length; ++i) {
					if (typeof attributes[i].specified === 'undefined' || attributes[i].specified) {
						jqNewObj.attr(attributes[i].nodeName, attributes[i].nodeValue);
					}
				}
			}

			// copy inline CSS
			if (jqOldObj[0].style && jqOldObj[0].style.cssText) {
				jqNewObj[0].style.cssText = jqOldObj[0].style.cssText;
			}

			// now move the contents of the old dom object into the new dom object
			jqOldObj.contents().appendTo(jqNewObj);

			// finally replace the old object with the new one
			jqOldObj.replaceWith(jqNewObj);

			// preserve the range
			if (range) {
				if (range.startContainer == domobj) {
					range.startContainer = jqNewObj.get(0);
				}

				if (range.endContainer == domobj) {
					range.endContainer = jqNewObj.get(0);
				}
			}

			return jqNewObj;
		},

		/**
		 * String representation
		 * @return {String}
		 */
		toString: function () {
			return 'Aloha.Markup';
		}

	});

	Aloha.Markup = new Aloha.Markup();
	return Aloha.Markup;
});

/* observable.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('aloha/observable',[
	'jquery'
], function (
	jQuery
) {
	

	var $ = jQuery;

	return {
		_eventHandlers: null,

		/**
		 * Attach a handler to an event
		 *
		 * @param {String} eventType A string containing the event name to bind to
		 * @param {Function} handler A function to execute each time the event is triggered
		 * @param {Object} scope Optional. Set the scope in which handler is executed
		 */
		bind: function (eventType, handler, scope) {
			this._eventHandlers = this._eventHandlers || {};
			if (!this._eventHandlers[eventType]) {
				this._eventHandlers[eventType] = [];
			}
			this._eventHandlers[eventType].push({
				handler: handler,
				scope: (scope || window)
			});
		},

		/**
		 * Remove a previously-attached event handler
		 *
		 * @param {String} eventType A string containing the event name to unbind
		 * @param {Function} handler The function that is to be no longer executed. Optional. If not given, unregisters all functions for the given event.
		 */
		unbind: function (eventType, handler) {
			this._eventHandlers = this._eventHandlers || {};
			if (!this._eventHandlers[eventType]) {
				return;
			}
			if (!handler) {
				// No handler function given, unbind all event handlers for the eventType
				this._eventHandlers[eventType] = [];
			} else {
				this._eventHandlers[eventType] = $.grep(this._eventHandlers[eventType], function (element) {
					if (element.handler === handler) {
						return false;
					}
					return true;
				});
			}
		},

		/**
		 * Execute all handlers attached to the given event type.
		 * All arguments except the eventType are directly passed to the callback function.
		 *
		 * @param (String} eventType A string containing the event name for which the event handlers should be invoked.
		 */
		trigger: function (eventType) {
			this._eventHandlers = this._eventHandlers || {};
			if (!this._eventHandlers[eventType]) {
				return;
			}

			// preparedArguments contains all arguments except the first one.
			var preparedArguments = [];
			$.each(arguments, function (i, argument) {
				if (i > 0) {
					preparedArguments.push(argument);
				}
			});

			$.each(this._eventHandlers[eventType], function (index, element) {
				element.handler.apply(element.scope, preparedArguments);
			});
		},

		/**
		 * Clears all event handlers. Call this method when cleaning up.
		 */
		unbindAll: function () {
			this._eventHandlers = null;
		}
	};
});

/* registry.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
/*global define:true */
/**
 * Registry base class.
 * TODO: document that it also contains Observable.
 *
 */
define('aloha/registry',[
	'jquery',
	'aloha/observable',
	'util/class'
], function (
	jQuery,
	Observable,
	Class
) {
	

	return Class.extend(Observable, {

		/**
		 * Object containing the registered entries by key.
		 */
		_entries: null,

		/**
		 * Array containing the registered ids in order
		 * of registry
		 */
		_ids: null,

		_constructor: function () {
			this._entries = {};
			this._ids = [];
		},

		/**
		 * Register an entry with an id
		 * 
		 * @event register
		 * @param id id of the registered entry
		 * @param entry registered entry
		 */
		register: function (id, entry) {
			// TODO check whether an entry with the id is already registered
			this._entries[id] = entry;
			this._ids.push(id);
			this.trigger('register', entry, id);
		},

		/**
		 * Unregister the entry with given id
		 * 
		 * @event unregister
		 * @param id id of the registered entry
		 */
		unregister: function (id) {
			// TODO check whether an entry was registered
			var i, oldEntry = this._entries[id];
			delete this._entries[id];
			for (i in this._ids) {
				if (this._ids.hasOwnProperty(i) && this._ids[i] === id) {
					this._ids.splice(i, 1);
					break;
				}
			}
			this.trigger('unregister', oldEntry, id);
		},

		/**
		 * Get the entry registered with the given id
		 * 
		 * @param id id of the registered entry
		 * @return registered entry
		 */
		get: function (id) {
			return this._entries[id];
		},

		/**
		 * Check whether an entry was registered with given id
		 * 
		 * @param id id to check
		 * @return true if an entry was registered, false if not
		 */
		has: function (id) {
			return (this._entries[id] ? true : false);
		},

		/**
		 * Get an object mapping the ids (properties) to the registered entries
		 * Note, that iterating over the properties of the returned object
		 * will return the entries in an unspecified order
		 * 
		 * @return object containing the registered entries
		 */
		getEntries: function () {
			// clone the entries so the user does not accidentally modify our _entries object.
			return jQuery.extend({}, this._entries);
		},

		/**
		 * Get the ids of the registered objects as array.
		 * The array will contain the ids in order of registry
		 * 
		 * @return array if registered ids
		 */
		getIds: function () {
			return jQuery.extend([], this._ids);
		}
	});
});

/* contenthandlermanager.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2013 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('aloha/contenthandlermanager',[
	'aloha/core',
	'aloha/registry',
	'util/class'
], function (
	Aloha,
	Registry,
	Class
) {
	

	var ContentHandlerManager = Registry.extend({

		/**
		 * Create a contentHandler from the given definition.  Acts as a factory
		 * method for contentHandler.
		 *
		 * @param {object} definition
		 */
		createHandler: function (definition) {
			if (typeof definition.handleContent !== 'function') {
				throw 'ContentHandler has no function handleContent().';
			}
			var AbstractContentHandler = Class.extend({
				handleContent: function (content) {
					// Implement in subclass!
				}
			}, definition);
			return new AbstractContentHandler();
		},

		/**
		 * Manipulates the given contents of an editable by invoking content
		 * handlers over it.
		 *
		 * @param {string} content The content of an editable which will be
		 *                         handled.
		 * @param {object} options Used to filter limit which content handlers
		 *                         should be used.
		 * @param {Aloha.Editable} The editable whose content is being handled.
		 * @return {string} The handled content.
		 */
		handleContent: function (content, options, editable) {
			var manager = this;

			// Because if no options are specified, to indicate which content
			// handler to use, then all that are available are used.
			var handlers = options ? options.contenthandler : manager.getIds();

			if (!handlers) {
				return content;
			}

			var i;
			var handler;
			for (i = 0; i < handlers.length; i++) {
				handler = manager.get(handlers[i]);
				if (handler) {
					content = handler.handleContent(
						content,
						options,
						editable || Aloha.activeEditable
					);
				}

				// FIXME: Is it ever valid for content to be null?  This would
				//        break the handleContent(string):string contract.
				if (null === content) {
					break;
				}
			}

			return content;
		}
	});

	return new ContentHandlerManager();
});

/* trees.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
/**
 * Tree walking functions.
 *
 * prewalk(form, fn, inplace)
 *
 *     Descend into the given form, which is a tree of arrays andmaps
 *     (javascript Object), and build a new tree with the result of
 *     applying the given fn to each branch and leaf. Only arrays and
 *     maps are descended into, everything else is considered a leaf.
 *
 *     The given fn is applied as the tree is descended into - the
 *     function application (pre)cedes descending into the tree.
 * 
 *     By default, an entirely new structure is returned. If the
 *     optional inplace argument is true, the algorithm will not
 *     allocate any new structures, but modify the given form in-place.
 *     The benefit of this is more performance due to less allocation,
 *     and reduced memory overhead, but see the "Note" below.
 *
 * postwalk(form, fn, inplace)
 *
 *     the same as prewalk, except the given fn is applied as the tree
 *     is ascended.
 *
 * preprune(form, pred, inplace)
 *
 *     the same as prewalk, except pred is a predicate function and any
 *     branch or leaf that is encountered and for which pred returns
 *     true is removed from the tree.
 *
 * postprune(form, pred, inplace)
 *
 *     the same as preprune, except the predicate function is applied as
 *     the tree is ascended.
 *
 *     Postpruning is potentially slower than prepruning since it always
 *     descendes into the whole tree, even into pruned nodes, while
 *     prepruning skips any pruned nodes.
 *
 * leaves(form, leaf, inplace)
 *
 *     Like postwalk, except the leaf function is applied only to
 *     leaves, and not to the arrays or maps that make up the tree
 *     structure of form.
 *
 *     Useful when one is only interested in tranforming leaves.
 *
 * flatten(form)
 *
 *     Makes an array of all of the given form's leaves.
 *
 * clone(form)
 *
 *     Constructs a deep clone of the given form.
 *
 * prepruneDom(form, pred, inplace)
 *
 *     Like preprune() except:
 *
 *     - the given form may be either an element or other DOM node, and
 *       only elements are descended into, all other node types are
 *       considered leaves.
 *
 *     - the given form will be cloned before it is being traversed, unless
 *       inplace is true.
 *
 *       This is different from prewalk, where the subforms that are
 *       passed to fn are not clones. Making a deep clone first
 *       simplifies some things, basically because an array or map can
 *       be the child of multiple arrays and maps at the same time,
 *       while a node can only be the child of a single parent node at
 *       any one time.
 *   
 * postpruneDom(form, pred, inplace)
 *
 *     Like prepruneDom(), except the given function is applied as the tree
 *     is ascended.
 *
 * walk(form, recurse, inplace)
 *
 *     If form is an array or map, calls recurse on each of its items.
 *     If inplace is true, modifies the form and sets each item to the
 *     result of the call to recurse. If inplace is false, creates a new
 *     array/map containing the results of calling recurse. Returns
 *     either form if inplace is true, or the newly created array/map.
 *
 *     If form is not an array or map, it is simply returned.
 *
 *     An example using walk() in a custom recursive traversal function:
 * 
 *     function doSomething(root) {
 *         function step(form) {
 *             form = Trees.walk(form, step);
 *             // do something with form
 *             return form ? [form] : [];
 *         }
 *         return step(root)[0] || null;
 *     }
 *
 * walk(form, recurse)
 *
 *     Short for walk(form, recurse, true)
 *
 * walkDomInplace(form, recurse)
 *
 *     Similar to walk() but operates on DOM nodes.
 *
 *     Elements are considered non-leaf, and everything else is
 *     considerd a leaf.
 *
 * Note: All functions work on array+map trees, unless they are suffixed
 *       with Dom, in which case they only work on DOM nodes.
 *
 * Note: When walking arrays and maps, if the fn and leaf functions
 *       modify the parent or any ancestor of the passed form, the
 *       resulting behaviour is undefined. Only modification of the
 *       passed form and descendants of the passed form is valid.
 *
 *       During DOM traversal, it is allowed to insert-into/remove-from
 *       the children of the parent of the given form, as long the given
 *       form itself is not removed.
 *
 * Note: the algorithms are recursive and the maximum nesting level of
 *       the input set is therefore bound to the maximum stack depth.
 *       IE7 and IE8 for example have a maximum stack depth of greater
 *       than 1000, so the maximum input nesting level should not exceed
 *       about 300 (3 stack frames are needed per nesting level).
 */
define('util/trees',['jquery'], function ($) {
	

	function walk(form, step, inplace) {
		var type = $.type(form),
			subResult,
			result,
			resultOff,
			len,
			i,
			key;
		if ('array' === type) {
			result = (inplace ? form : []);
			resultOff = 0;
			for (i = 0, len = form.length; i < len; i++) {
				subResult = step(form[i]);
				if (subResult.length) {
					result[resultOff++] = subResult[0];
				}
			}
			if (resultOff !== result.length) {
				// TODO is result.length = resultOff better?
				result = result.slice(0, resultOff);
			}
		} else if ('object' === type) {
			result = (inplace ? form : {});
			for (key in form) {
				if (form.hasOwnProperty(key)) {
					subResult = step(form[key]);
					if (subResult.length) {
						result[key] = subResult[0];
					} else {
						delete result[key];
					}
				}
			}
		} else {
			result = form;
		}
		return result;
	}

	function walkInplace(form, step) {
		return walk(form, step, true);
	}

	function walkDomInplace(form, step) {
		var subResult,
		    child,
		    nextChild;
		if (1 === form.nodeType) {
			child = form.firstChild;
			while (child) {
				subResult = step(child);
				// Advance to the next child _after stepping into child_
				// to pick up modifications of the DOM.
				nextChild = child.nextSibling;
				if (subResult.length) {
					if (subResult[0] !== child) {
						form.replaceChild(subResult[0], child);
					}
				} else {
					form.removeChild(child);
				}
				child = nextChild;
			}
		}
		return form;
	}

	function prewalkStep(step, fn, walk, form) {
		return [walk(fn(form), step)];
	}

	function postwalkStep(step, fn, walk, form) {
		return [fn(walk(form, step))];
	}

	function prepruneStep(step, fn, walk, form) {
		return fn(form) ? [] : [walk(form, step)];
	}

	function postpruneStep(step, fn, walk, form) {
		var subForm = walk(form, step);
		return fn(subForm) ? [] : [subForm];
	}

	function prepost(step, fnOrPred, walk, form) {
		function prepostStep(form) {
			return step(prepostStep, fnOrPred, walk, form);
		}
		return prepostStep(form)[0];
	}

	function prewalk(form, fn, inplace) {
		return prepost(prewalkStep, fn, inplace ? walkInplace : walk, form);
	}

	function postwalk(form, fn, inplace) {
		return prepost(postwalkStep, fn, inplace ? walkInplace : walk, form);
	}

	function preprune(form, pred, inplace) {
		return prepost(prepruneStep, pred, inplace ? walkInplace : walk, form);
	}

	function postprune(form, pred, inplace) {
		return prepost(postpruneStep, pred, inplace ? walkInplace : walk, form);
	}

	function prewalkDom(form, fn, inplace) {
		return prepost(prewalkStep, fn, walkDomInplace, inplace ? form : form.cloneNode(true));
	}

	function postwalkDom(form, fn, inplace) {
		return prepost(postwalkStep, fn, walkDomInplace, inplace ? form : form.cloneNode(true));
	}

	function prepruneDom(form, pred, inplace) {
		return prepost(prepruneStep, pred, walkDomInplace, inplace ? form : form.cloneNode(true));
	}

	function postpruneDom(form, pred, inplace) {
		return prepost(postpruneStep, pred, walkDomInplace, inplace ? form : form.cloneNode(true));
	}

	function isLeaf(form) {
		var type = $.type(form);
		return type !== 'object' && type !== 'array';
	}

	function identityStep(step, walk, form) {
		return [walk(form, step)];
	}

	function leaves(form, leaf, inplace) {
		var leafWalk = inplace ? walkInplace : walk;

		function leafStep(form) {
			if (isLeaf(form)) {
				return [leaf(form)];
			}
			return identityStep(leafStep, leafWalk, form);
		}
		return leafStep(form)[0];
	}

	function clone(form) {
		function cloneStep(form) {
			return identityStep(cloneStep, walk, form);
		}
		return cloneStep(form)[0];
	}

	function flatten(form) {
		var inplace = true;
		var result = [];
		leaves(form, function (leaf) {
			result.push(leaf);
			return leaf;
		}, inplace);
		return result;
	}

	return {
		prewalk: prewalk,
		postwalk: postwalk,
		preprune: preprune,
		postprune: postprune,
		prewalkDom: prewalkDom,
		postwalkDom: postwalkDom,
		prepruneDom: prepruneDom,
		postpruneDom: postpruneDom,
		isLeaf: isLeaf,
		leaves: leaves,
		clone: clone,
		flatten: flatten,
		walk: walk,
		walkInplace: walkInplace,
		walkDomInplace: walkDomInplace
	};
});

/* misc.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
/**
 * Contains miscellaneous utility functions that don't fit anywhere else.
 */
define('util/misc',[], function () {
	

	/**
	 * Returns true if any regex in the given rxs array tests true
	 * against str.
	 */
	function anyRx(rxs, str) {
		var i,
		    len;
		for (i = 0, len = rxs.length; i < len; i++) {
			if (rxs[i].test(str)) {
				return true;
			}
		}
		return false;
	}

	return {
		anyRx: anyRx
	};
});

/* ephemera.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor. 
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php 
 * 
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 * 
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
/**
 * Provides functions to mark the contents of editables as ephemeral. An
 * editable's ephemeral content will be pruned before it is being
 * returned by editable.getContents().
 * 
 * It is planned to replace most instances of makeClean() with this
 * implementation for improved performance and more importantly, in
 * order to have a centralized place that has the control over all
 * ephemeral content, which can be leveraged by plugins to provide more
 * advanced functionality.
 *
 * Some examples that would be possible:
 * * a HTML source code text box, an interactive tree structure, or
 *   other kind of DOM visualization, next to the editable, that
 *   contains just the content of the editable (without ephemeral data)
 *   and which is updated efficiently in real time after each keystroke.
 *
 * * change detection algorithms that are able to intelligently ignore
 *   ephemeral data and which would not trigger unless non-ephemeral
 *   data is added to the editable.
 *
 * * When a plugin provides very general functionality over all nodes of
 *   the DOM, somtimes the plugin may not know what is and what isn't
 *   supposed to be real content. The functionality provided here makes
 *   it possible for the plugin to exaclty distinguish real content from
 *   ephemeral content.
 *
 * TODO: currently only simple transformations are suppored, like
 *       marking classes, attributes and elements as ephemeral and removing
 *       them during the pruning process.
 *       In the future, support for the block-plugin and custom pruning
 *       functions should be added. This may be done by letting implementations
 *       completely control the pruning of a DOM element through a
 *       function that takes the content+ephemeral-data and returns only
 *       content - similar to make clean, but for single elements to reduce
 *       overhead.
 */
define('aloha/ephemera',[
	'jquery',
	'aloha/core',
	'aloha/console',
	'util/strings',
	'util/trees',
	'util/arrays',
	'util/maps',
	'util/dom2',
	'util/functions',
	'util/misc',
	'util/browser',
	'PubSub'
], function (
	$,
	Aloha,
	console,
	Strings,
	Trees,
	Arrays,
	Maps,
	Dom,
	Functions,
	Misc,
	Browser,
	PubSub
) {
	

	var ephemeraMap = {
		classMap: {
			'aloha-ephemera-wrapper': true,
			'aloha-ephemera-filler': true,
			'aloha-ephemera-attr': true,
			'aloha-ephemera': true,
			// aloha-cleanme is the same as aloha-ephemera.
			// TODO: should be replaced with aloha-ephemera throughout
			//       the codebase and removed here.
			'aloha-cleanme': true
		},
		attrMap: {
			'hidefocus': true,
			'hideFocus': true,
			'tabindex': true,
			'tabIndex': true,
			'contenteditable': ['TABLE'],
			'contentEditable': ['TABLE']
		},
		attrRxs: [/^(?:nodeIndex|sizcache|sizset|jquery)[\w\d]*$/i],
		pruneFns: []
	};

	var commonClsSubstr = 'aloha-';

	/**
	 * Checks whether the given classes contain the substring common to
	 * all ephemeral classes. If the check fails, an warning will be
	 * logged and the substring will be set to the empty string which
	 * voids the performance improvement the common substring would
	 * otherwise have gained.
	 */
	function checkCommonSubstr(clss) {
		var i, len;
		for (i = 0, len = clss.length; i < len; i++) {
			if (-1 === clss[i].indexOf(commonClsSubstr)) {
				console.warn('Class "' + clss[i] + '" was set to be ephemeral,' + 'which hurts peformance.' + ' Add the common substring "' + commonClsSubstr + '" to the class to fix this problem.');
				commonClsSubstr = '';
			}
		}
	}

	/**
	 * Registers ephemeral classes.
	 *
	 * An ephemeral class is a non-content class that will be pruned
	 * from the from the result of editable.getContents().
	 *
	 * The given classes should contain the string 'aloha-' to get the
	 * benefit of a performance optimization.
	 *
	 * Returns a map that contains all classes that were ever registered
	 * with this function.
	 *
	 * Multiple classes may be specified. If none are specified, just
	 * returns the current ephemeral classes map without modifying it.
	 *
	 * Also see ephemera().
	 */
	function classes() {
		var clss = Array.prototype.slice.call(arguments);
		Maps.fillKeys(ephemeraMap.classMap, clss, true);
		checkCommonSubstr(clss);
		PubSub.pub('aloha.ephemera.classes', {
			ephemera: ephemeraMap,
			newClasses: clss
		});
	}

	/**
	 * Registers ephemeral attributes by attribute name.
	 *
	 * Similar to classes() except applies to entire attributes instead
	 * of individual classes in the class attribute.
	 */
	function attributes() {
		var attrs = Array.prototype.slice.call(arguments);
		Maps.fillKeys(ephemeraMap.attrMap, attrs, true);
		PubSub.pub('aloha.ephemera.attributes', {
			ephemera: ephemeraMap,
			newAttributes: attrs
		});
	}

	/**
	 * Provides access to the global ephemera registry.
	 *
	 * If the given argument is not null, sets the global ephemera
	 * registry to the given value and returns it. Otherwise, just
	 * returns the global registry.
	 *
	 * The given/returned value has the following properties:
	 *
	 * The given map may have the following entries
	 *
	 * classMap - a map from class name to the value true.
	 *            all classes must have a "aloha-" prefix.
	 *            Use Ehpemera.attributes() to set classes without "aloha-" prefix.
	 *
	 * attrMap  - a map from attribute name to the value true or to an array
	 *            of element names. If an array of elements is specified, the
	 *            attribute will only be considered ephemeral if it is
	 *            found on an element in the array.
	 *
	 * attrRxs  - an array of regexes (in object - not string - form: /[a-z].../)
	 *
	 * pruneFns - an array of functions that will be called at each pruning step.
	 *
	 * When a DOM tree is pruned with prune(elem) without an emap
	 * argument, the global registry maintained with classes()
	 * attributes() and ephemera() is used as a default map. If an emap
	 * argument is specified, the global registry will be ignored and
	 * the emap argument will be used instead.
	 *
	 * When a DOM tree is pruned with prune()
	 * - classes specified by classMap will be removed
	 * - attributes specified by attrMap or attrRxs will be removed
	 * - functions specified by pruneFns will be called as the DOM tree
	 *   is descended into (pre-order), with each node (element, text,
	 *   etc.) as a single argument. The function is free to modify the
	 *   element and return it, or return a new element which will
	 *   replace the given element in the pruned tree. If null or
	 *   undefined is returned, the element will be removed from the
	 *   tree. As per contract of Maps.walkDomInplace, it is allowed to
	 *   insert/remove children in the parent node as long as the given
	 *   node is not removed.
	 *
	 * Also see classes() and attributes().
	 *
	 * Note that removal of attributes doesn't always work on IE7 (in
	 * rare special cases). The dom-to-xhtml plugin can reliably remove
	 * ephemeral attributes during the serialization step.
	 */
	function ephemera(emap) {
		if (emap) {
			ephemeraMap = emap;
		}
		PubSub.pub('aloha.ephemera', {
			ephemera: ephemeraMap
		});
		return ephemeraMap;
	}

	/**
	 * Marks an element as ephemeral.
	 *
	 * The element will be completely removed when the prune function is
	 * called on it.
	 *
	 * Adds the class 'aloha-ephemera' to the given element.
	 *
	 * The class 'aloha-ephemera' can also be added directly without
	 * recurse to this function, if that is more convenient.
	 */
	function markElement(elem) {
		$(elem).addClass('aloha-ephemera');
	}

	/**
	 * Marks the attribute of an element as ephemeral.
	 *
	 * The attribute will be removed from the element when the prune
	 * function is called on it.
	 *
	 * Multiple attributes can be passed at the same time be separating
	 * them with a space.
	 *
	 * Adds the class 'aloha-ephemera-attr' to the given element. Also
	 * adds or modifies the 'data-aloha-ephemera-attr' attribute,
	 * and adds to it the name of the given attribute.
	 *
	 * These modifications can be made directly without recurse to this
	 * function, if that is more convenient.
	 */
	function markAttr(elem, attr) {
		elem = $(elem);
		var data = elem.attr('data-aloha-ephemera-attr');
		if (null == data || '' === data) {
			data = attr;
		} else if (-1 === Arrays.indexOf(Strings.words(data), attr)) {
			data += ' ' + attr;
		}
		elem.attr('data-aloha-ephemera-attr', data);
		elem.addClass('aloha-ephemera-attr');
	}

	/**
	 * Marks an element as a ephemeral, excluding subnodes.
	 *
	 * The element will be removed when the prune function is called on
	 * it, but any children of the wrapper element will remain in its
	 * place.
	 *
	 * A wrapper is an element that wraps a single non-ephemeral
	 * element. A filler is an element that is wrapped by a single
	 * non-ephemeral element. This distinction is not important for the
	 * prune function, which behave the same for both wrappers and
	 * fillers, but it makes it easier to build more advanced content
	 * inspection algorithms (also see note at the header of ephemeral.js).
	 * 
	 * Adds the class 'aloha-ephemera-wrapper' to the given element.
	 *
	 * The class 'aloha-ephemera-wrapper' may also be added directly,
	 * without recurse to this function, if that is more convenient.
	 *
	 * NB: a wrapper element must not wrap a filler element. Wrappers
	 *     and fillers are ephermeral. A wrapper must always wrap a
	 *     single _non-ephemeral_ element, and a filler must always fill
	 *     a single _non-ephemeral_ element.
	 */
	function markWrapper(elem) {
		$(elem).addClass('aloha-ephemera-wrapper');
	}

	/**
	 * Marks an element as ephemeral, excluding subnodes.
	 *
	 * Adds the class 'aloha-ephemera-filler' to the given element.
	 *
	 * The class 'aloha-ephemera-filler' may also be added directly,
	 * without recurse to this function, if that is more convenient.
	 *
	 * See wrapper()
	 */
	function markFiller(elem) {
		$(elem).addClass('aloha-ephemera-filler');
	}

	/**
	 * Prunes attributes marked as ephemeral with Ephemera.attributes()
	 * from the given element.
	 */
	function pruneMarkedAttrs(elem) {
		var $elem = $(elem);
		var data = $elem.attr('data-aloha-ephemera-attr');
		var i;
		var attrs;
		// Because IE7 crashes if we remove this attribute. If the
		// dom-to-xhtml plugin is turned on, it will handle the removal
		// of this attribute during serialization.
		if (!Browser.ie7) {
			$elem.removeAttr('data-aloha-ephemera-attr');
		}
		if (typeof data === 'string') {
			attrs = Strings.words(data);
			for (i = 0; i < attrs.length; i++) {
				$elem.removeAttr(attrs[i]);
			}
		}
	}

	/**
	 * Determines whether the given attribute of the given element is
	 * ephemeral according to the given emap.
	 * See Ephemera.ephemera() for an explanation of attrMap and attrRxs.
	 */
	function isAttrEphemeral(elem, attrName, attrMap, attrRxs) {
		var mapped = attrMap[attrName];
		if (mapped) {
			// The attrMap may either contain boolean true or an array of element names.
			if (true === mapped) {
				return true;
			}
			if (-1 !== Arrays.indexOf(mapped, elem.nodeName)) {
				return true;
			}
		}
		return Misc.anyRx(attrRxs, attrName);
	}

	/**
	 * Prunes attributes specified with either emap.attrMap or emap.attrRxs.
	 * See ephemera().
	 */
	function pruneEmapAttrs(elem, emap) {
		var $elem = null,
			attrs = Dom.attrNames(elem),
		    name,
		    i,
		    len;
		for (i = 0, len = attrs.length; i < len; i++) {
			name = attrs[i];
			if (isAttrEphemeral(elem, name, emap.attrMap, emap.attrRxs)) {
				$elem = $elem || $(elem);
				$elem.removeAttr(name);
			}
		}
	}

	/**
	 * Prunes an element of attributes and classes or removes the
	 * element by returning false.
	 *
	 * Elements attributes and classes can either be marked as
	 * ephemeral, in which case the element itself will contain the
	 * prune-info, or they can be specified as ephemeral with the given
	 * emap.
	 *
	 * See ephemera() for an explanation of the emap argument.
	 */
	function pruneElem(elem, emap) {
		var className = elem.className;
		if (className && -1 !== className.indexOf(commonClsSubstr)) {
			var classes = Strings.words(className);

			// Ephemera.markElement()
			if (-1 !== Arrays.indexOf(classes, 'aloha-cleanme') || -1 !== Arrays.indexOf(classes, 'aloha-ephemera')) {
				$.removeData(elem); // avoids memory leak
				return false; // removes the element
			}

			// Ephemera.markWrapper() and Ephemera.markFiller()
			if (-1 !== Arrays.indexOf(classes, 'aloha-ephemera-wrapper') || -1 !== Arrays.indexOf(classes, 'aloha-ephemera-filler')) {
				Dom.moveNextAll(elem.parentNode, elem.firstChild, elem.nextSibling);
				$.removeData(elem);
				return false;
			}

			// Ephemera.markAttr()
			if (-1 !== Arrays.indexOf(classes, 'aloha-ephemera-attr')) {
				pruneMarkedAttrs(elem);
			}

			// Ephemera.classes() and Ehpemera.ephemera({ classMap: {} })
			var persistentClasses = Arrays.filter(classes, function (cls) {
				return !emap.classMap[cls];
			});
			if (persistentClasses.length !== classes.length) {
				if (0 === persistentClasses.length) {
					// Removing the attributes is dangerous. Aloha has a
					// jquery patch in place to fix some issue.
					$(elem).removeAttr('class');
				} else {
					elem.className = persistentClasses.join(' ');
				}
			}
		}

		// Ephemera.attributes() and Ephemera.ephemera({ attrMap: {}, attrRxs: {} })
		pruneEmapAttrs(elem, emap);

		return true;
	}

	/**
	 * Called for each node during the pruning of a DOM tree.
	 */
	function pruneStep(emap, step, node) {
		if (1 === node.nodeType) {
			if (!pruneElem(node, emap)) {
				return [];
			}
			node = Trees.walkDomInplace(node, step);
		}

		// Ephemera.ephemera({ pruneFns: [] })
		node = Arrays.reduce(emap.pruneFns, node, Arrays.applyNotNull);
		if (!node) {
			return [];
		}

		return [node];
	}

	/**
	 * Prunes the given element of all ephemeral data.
	 *
	 * Elements marked with Ephemera.markElement() will be removed.
	 * Attributes marked with Ephemera.markAttr() will be removed.
	 * Elements marked with Ephemera.markWrapper() or
	 * Ephemera.markFiller() will be replaced with their children.
	 *
	 * See ephemera() for an explanation of the emap argument.
	 *
	 * All properties of emap, if specified, are required, but may be
	 * empty.
	 *
	 * The element is modified in-place and returned.
	 */
	function prune(elem, emap) {
		emap = emap || ephemeraMap;

		function pruneStepClosure(node) {
			return pruneStep(emap, pruneStepClosure, node);
		}
		return pruneStepClosure(elem)[0];
	}

	return {
		ephemera: ephemera,
		classes: classes,
		attributes: attributes,
		markElement: markElement,
		markAttr: markAttr,
		markWrapper: markWrapper,
		markFiller: markFiller,
		prune: prune,
		isAttrEphemeral: isAttrEphemeral
	};
});

/* copypaste.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor.
 * Copyright (c) 2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php
 *
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
/**
 * @overview:
 * Various utility functions that are useful when working with selections, and
 * ranges for copy/paste functionality.
 */
define('aloha/copypaste', [
	'jquery',
	'aloha/core'
], function (
	$,
	Aloha
) {
	

	/**
	 * Retrieve the editable host in which the given range is contained.
	 *
	 * @param {WrappedRange} range
	 * @return {jQuery.<HTMLElement>|null} The editable host element, null if
	 *                                     non can be determinded from the given
	 *                                     range.
	 */
	function getEditableAt(range) {
		if (!range || !range.commonAncestorContainer) {
			return null;
		}
		var $container = $(range.commonAncestorContainer);
		return $container.length ? Aloha.getEditableHost($container) : null;
	}

	/**
	 * Retrieves the current range.
	 *
	 * @return {WrappedRange|null} Range at current selection or null of non
	 *                             exists.
	 */
	function getRange() {
		var selection = Aloha.getSelection();
		return selection.getRangeCount() ? selection.getRangeAt(0) : null;
	}

	/**
	 * Set the selection to the given range
	 *
	 * @param {object} range An object that must container the following
	 *                       essential range properties: ~ startContainer
	 *                                                   ~ endContainer
	 *                                                   ~ startOffset
	 *                                                   ~ endOffset
	 */
	function setSelectionAt(range) {
		var newRange = Aloha.createRange();
		var selection = Aloha.getSelection();
		newRange.setStart(range.startContainer, range.startOffset);
		newRange.setEnd(range.endContainer, range.endOffset);
		selection.removeAllRanges();
		selection.addRange(newRange);
	}

	/**
	 * Creates a selection that encompasses the contents of the given element.
	 *
	 * @param {HTMLElement} element Editable DOM element.
	 */
	function selectAllOf(element) {
		setSelectionAt({
			startContainer: element,
			endContainer: element,
			startOffset: 0,
			endOffset: element.childNodes ? element.childNodes.length
		                                  : element.length
		});
		$(element).focus();
	}

	return {
		getEditableAt: getEditableAt,
		getRange: getRange,
		selectAllOf: selectAllOf,
		setSelectionAt: setSelectionAt
	};
});

/* command.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor.
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php
 *
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('aloha/command',[
	'aloha/core',
	'aloha/registry',
	'aloha/engine',
	'util/dom',
	'aloha/contenthandlermanager'
], function (
	Aloha,
	Registry,
	Engine,
	Dom,
	ContentHandlerManager
) {
	

	//			Action: What the command does when executed via execCommand(). Every command defined
	//			in CommandManager specification has an action defined for it in the relevant section. For example,
	//			the bold command's action generally makes the current selection bold, or removes bold if
	//			the selection is already bold. An editing toolbar might provide buttons that execute the
	//			action for a command if clicked, or a script might run an action without user interaction
	//			to achieve some particular effect.
	//
	//			Indeterminate: A boolean value returned by queryCommandIndeterm(), depending on the
	//			current state of the document. Generally, a command that has a state defined will be
	//			indeterminate if the state is true for part but not all of the current selection, and a
	//			command that has a value defined will be indeterminate if different parts of the
	//			selection have different values. An editing toolbar might display a button or control
	//			in a special way if the command is indeterminate, like showing a "bold" button as
	//			partially depressed, or leaving a font size selector blank instead of showing the font
	//			size of the current selection. As a rule, a command can only be indeterminate if its
	//			state is false, supposing it has a state.
	//
	//			State: A boolean value returned by queryCommandState(), depending on the current state
	//			of the document. The state of a command is true if it is already in effect, in some
	//			sense specific to the command. Most commands that have a state defined will take opposite
	//			actions depending on whether the state is true or false, such as making the selection
	//			bold if the state is false and removing bold if the state is true. Others will just
	//			have no effect if the state is true, like the justifyCenter command. Still others will
	//			have the same effect regardless, like the styleWithCss command. An editing toolbar might
	//			display a button or control differently depending on the state and indeterminacy of the
	//			command.
	//
	//			Value: A string returned by queryCommandValue(), depending on the current state of the
	//			document. A command usually has a value instead of a state if the property it modifies
	//			can take more than two different values, like the foreColor command. If the command is
	//			indeterminate, its value is generally based on the start of the selection. Otherwise,
	//			in most cases the value holds true for the entire selection, but see the justifyCenter
	//			command and its three companions for an exception. An editing toolbar might display the
	//			value of a command as selected in a drop-down or filled in in a text box, if the command
	//			isn't indeterminate.
	//
	//			Relevant CSS property: CommandManager is defined for certain inline formatting commands, and
	//			is used in algorithms specific to those commands. It is an implementation detail, and
	//			is not exposed to authors. If a command does not have a relevant CSS property
	//			specified, it defaults to null.

	var CommandManager = {

		execCommand: function (commandId, showUi, value, range) {
			var evtObj = {
				commandId: commandId,
				preventDefault: false
			};
			Aloha.trigger('aloha-command-will-execute', evtObj);

			if (evtObj.preventDefault === true) {
				return;
			}
			// Read current selection if not passed
			if (!range) {
				if (!Aloha.getSelection().getRangeCount()) {
					return;
				}
				range = Aloha.getSelection().getRangeAt(0);
			}

			// For the insertHTML command we provide contenthandler API
			if (commandId.toLowerCase() === 'inserthtml') {
				//if (typeof Aloha.settings.contentHandler.insertHtml === 'undefined') {
				//	use all registered content handler; used for copy & paste atm (or write log message)
				//	Aloha.settings.contentHandler.insertHtml = Aloha.defaults.contentHandler.insertHtml;
				//}
				value = ContentHandlerManager.handleContent(value, {
					contenthandler: Aloha.settings.contentHandler.insertHtml,
					command: 'insertHtml'
				});
			}

			Engine.execCommand(commandId, showUi, value, range);

			if (Aloha.getSelection().getRangeCount()) {
				// Read range after engine modification
				range = Aloha.getSelection().getRangeAt(0);

				// FIX: doCleanup should work with W3C range
				var startnode = range.commonAncestorContainer;
				if (startnode.parentNode) {
					startnode = startnode.parentNode;
				}
				var rangeObject = new window.GENTICS.Utils.RangeObject();
				rangeObject.startContainer = range.startContainer;
				rangeObject.startOffset = range.startOffset;
				rangeObject.endContainer = range.endContainer;
				rangeObject.endOffset = range.endOffset;
				Dom.doCleanup({
					merge: true,
					removeempty: false
				}, rangeObject, startnode);
				rangeObject.select();
			}

			Aloha.trigger('aloha-command-executed', commandId);
		},

		// If command is available and not disabled or the active range is not null
		// the command is enabled
		queryCommandEnabled: function (commandId, range) {

			// Take current selection if not passed
			if (!range) {
				if (!Aloha.getSelection().getRangeCount()) {
					return;
				}
				range = Aloha.getSelection().getRangeAt(0);
			}
			return Engine.queryCommandEnabled(commandId, range);
		},

		// "Return true if command is indeterminate, otherwise false."
		queryCommandIndeterm: function (commandId, range) {

			// Take current selection if not passed
			if (!range) {
				if (!Aloha.getSelection().getRangeCount()) {
					return;
				}
				range = Aloha.getSelection().getRangeAt(0);
			}
			return Engine.queryCommandIndeterm(commandId, range);

		},

		queryCommandState: function (commandId, range) {

			// Take current selection if not passed
			if (!range) {
				if (!Aloha.getSelection().getRangeCount()) {
					return;
				}
				range = Aloha.getSelection().getRangeAt(0);
			}
			return Engine.queryCommandState(commandId, range);

		},

		// "When the queryCommandSupported(command) method on the HTMLDocument
		// interface is invoked, the user agent must return true if command is
		// supported, and false otherwise."
		queryCommandSupported: function (commandId) {

			return Engine.queryCommandSupported(commandId);
		},

		queryCommandValue: function (commandId, range) {

			// Take current selection if not passed
			if (!range) {
				if (!Aloha.getSelection().getRangeCount()) {
					return;
				}
				range = Aloha.getSelection().getRangeAt(0);
			}

			// "Return command's value."
			return Engine.queryCommandValue(commandId, range);
		},
		querySupportedCommands: function () {

			var commands = [],
				command;

			for (command in Engine.commands) {
				if (Engine.commands.hasOwnProperty(command)) {
					commands.push(command);
				}
			}
			return commands;
		},
		getStateOverride: Engine.getStateOverride,
		setStateOverride: Engine.setStateOverride,
		resetOverrides: Engine.resetOverrides,
		unsetStateOverride: Engine.unsetStateOverride
	};

	// create an instance
	CommandManager = new (Registry.extend(CommandManager))();

	/**
	 * Executes a registered command.
	 * http://aryeh.name/spec/editing/editing.html#methods-of-the-htmldocument-interface
	 * @method
	 * @param command name of the command
	 * @param showUI has no effect for Aloha Editor and is only here because in spec...
	 * @param value depends on the used command and it impementation
	 * @range optional a range on which the command will be executed if not specified
	 *        the current selection will be used as range
	 */
	Aloha.execCommand = CommandManager.execCommand;

	/**
	 * Check wheater the command in enabled.
	 * If command is not supported, raise a NOT_SUPPORTED_ERR exception.
	 * @param command name of the command
	 * @return true if command is enabled, false otherwise.
	 */
	Aloha.queryCommandEnabled = CommandManager.queryCommandEnabled;

	/**
	 * Check if the command has an indetermed state.
	 * If command is not supported, a NOT_SUPPORTED_ERR exception is thrown
	 * If command has no indeterminacy, INVALID_ACCESS_ERR exception is thrown
	 * If command is not enabled, return false.
	 * @param command name of the command
	 * @range optional a range on which the command will be executed if not specified
	 *        the current selection will be used as range
	 * @return true if command is indeterminate, otherwise false.
	 */
	Aloha.queryCommandIndeterm = CommandManager.queryCommandIndeterm;

	/**
	 * Returns the state of a given command
	 * If command is not supported, a NOT_SUPPORTED_ERR exception is thrown
	 * If command has no state, an INVALID_ACCESS_ERR exception is thrown
	 * If command is not enabled, return false
	 * If the state override for command is set, it returns the state
	 * @param command name of the command
	 * @return state override or true if command's state is true, otherwise false.
	 */
	Aloha.queryCommandState = CommandManager.queryCommandState;

	/**
	 * Check if a given command is supported
	 * @return true if command is supported, and false otherwise.
	 */
	Aloha.queryCommandSupported = CommandManager.queryCommandSupported;

	/**
	 * Returns the Value of a given Command
	 * If command is not supported, a NOT_SUPPORTED_ERR exception is thrown
	 * If command is not enabled, returns an empty string
	 * If command is "fontSize" and its value override is set, an integer
	 * number of pixels is returned as font size for the result.
	 * If the value override for command is set, it returns that.
	 * @return command's value.
	 */
	Aloha.queryCommandValue = CommandManager.queryCommandValue;

	Aloha.querySupportedCommands = CommandManager.querySupportedCommands;

	return CommandManager;
});

/* state-override.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor.
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php
 *
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('aloha/state-override',[
	'aloha/core',
	'jquery',
	'aloha/command',
	'util/dom2',
	'util/maps',
	'util/range',
	'PubSub'
], function (
	Aloha,
	jQuery,
	Command,
	Dom,
	Maps,
	RangeObject,
	PubSub
) {
	

	// Because we want to provide an easy way to disable the state-override feature.
	var enabled = Aloha.settings.stateOverride !== false;
	var overrides = null;
	var overrideRange = null;

	function rangeObjectFromRange(range) {
		return new RangeObject(range);
	}

	function clear() {
		overrideRange = null;
		overrides = null;
	}

	function keyPressHandler(event) {
		if (!overrides) {
			return;
		}
		if (event.altKey || event.ctrlKey || !event.which) {
			return;
		}
		var selection = Aloha.getSelection();
		if (!selection.getRangeCount()) {
			return;
		}
		var text = String.fromCharCode(event.which);
		var range = selection.getRangeAt(0);
		Dom.insertSelectText(text, range);
		Maps.forEach(overrides, function (formatFn, command) {
			formatFn(command, range);
		});
		Dom.collapseToEnd(range);
		selection.removeAllRanges();
		selection.addRange(range);
		// Because we handled the character insert ourselves via
		// insertText we must not let the browser's default action
		// insert the character a second time.
		event.preventDefault();
	}

	function set(command, range, formatFn) {
		if (!enabled) {
			return;
		}
		overrideRange = range;
		overrides = overrides || {};
		overrides[command] = formatFn;
	}

	function setWithRangeObject(command, rangeObject, formatFn) {
		if (!enabled) {
			return;
		}
		set(command, Dom.rangeFromRangeObject(rangeObject), function (command, range) {
			var rangeObject = rangeObjectFromRange(range);
			formatFn(command, rangeObject);
			Dom.setRangeFromRef(range, rangeObject);
		});
		// Because without doing rangeObject.select(), the
		// next insertText command (see editable.js) will
		// not be reached and instead the browsers default
		// insert behaviour will be applied (which doesn't
		// know anything about state overrides). I don't
		// know the exact reasons why; probably some
		// stopPropagation somewhere by some plugin.
		rangeObject.select();
	}

	function enabledAccessor(trueFalse) {
		if (null != trueFalse) {
			enabled = trueFalse;
		}
		return enabled;
	}

	// https://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#state-override
	// "Whenever the number of ranges in the selection changes to
	// something different, and whenever a boundary point of the range
	// at a given index in the selection changes to something different,
	// the state override and value override must be unset for every
	// command."
	Aloha.bind('aloha-selection-changed', function (event, range) {
		if (overrideRange && !Dom.areRangesEq(overrideRange, range)) {
			clear();
			// Because the UI may reflect the any potentially state
			// overrides that are now no longer in effect, we must
			// redraw the UI according to the current selection.
			PubSub.pub('aloha.selection.context-change', {
				range: range,
				event: event
			});
		}
	});

	return {
		enabled: enabledAccessor,
		keyPressHandler: keyPressHandler,
		setWithRangeObject: setWithRangeObject,
		set: set,
		clear: clear
	};
});

/* editable.js is part of Aloha Editor project http://aloha-editor.org
 *
 * Aloha Editor is a WYSIWYG HTML5 inline editing library and editor.
 * Copyright (c) 2010-2012 Gentics Software GmbH, Vienna, Austria.
 * Contributors http://aloha-editor.org/contribution.php
 *
 * Aloha Editor is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * Aloha Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 * As an additional permission to the GNU GPL version 2, you may distribute
 * non-source (e.g., minimized or compacted) forms of the Aloha-Editor
 * source code without the copy of the GNU GPL normally required,
 * provided you include this license notice and a URL through which
 * recipients can access the Corresponding Source.
 */
define('aloha/editable',[
	'aloha/core',
	'util/class',
	'jquery',
	'aloha/pluginmanager',
	'aloha/selection',
	'aloha/markup',
	'aloha/contenthandlermanager',
	'aloha/console',
	'aloha/block-jump',
	'aloha/ephemera',
	'util/dom2',
	'PubSub',
	'aloha/copypaste',
	'aloha/command',
	'aloha/state-override'
], function (
	Aloha,
	Class,
	$,
	PluginManager,
	Selection,
	Markup,
	ContentHandlerManager,
	console,
	BlockJump,
	Ephemera,
	Dom,
	PubSub,
	CopyPaste,
	Command,
	StateOverride
) {
	

	var jQuery = $;
	var unescape = window.unescape,
		GENTICS = window.GENTICS,

		// True, if the next editable activate event should not be handled
		ignoreNextActivateEvent = false;

	/**
	 * A cache to hold information derived, and used in getContents().
	 * @type {object<string,(string|jQuery.<HTMLElement>)>}
	 * @private
	 */
	var editableContentCache = {};

	// default supported and custom content handler settings
	// @TODO move to new config when implemented in Aloha
	Aloha.defaults.contentHandler = {};
	Aloha.defaults.contentHandler.initEditable = ['blockelement', 'sanitize'];
	Aloha.defaults.contentHandler.getContents = ['blockelement', 'sanitize', 'basic'];

	// The insertHtml contenthandler ( paste ) will, by default, use all
	// registered content handlers.
	//Aloha.defaults.contentHandler.insertHtml = void 0;

	if (typeof Aloha.settings.contentHandler === 'undefined') {
		Aloha.settings.contentHandler = {};
	}

	var defaultContentSerializer = function (editableElement) {
		return jQuery(editableElement).html();
	};

	var contentSerializer = defaultContentSerializer;

	/**
	 * Triggers smartContentChange handlers.
	 *
	 * @param {Aloha.Editable}
	 * @return {string} Content that has been processed by getContent handlers
	 *                  and smartContentChange handlers.
	 */
	function handleSmartContentChange(editable) {
		return ContentHandlerManager.handleContent(editable.getContents(), {
			contenthandler: Aloha.settings.contentHandler.smartContentChange
		}, editable);
	}

	/**
	 * List of observed key, mapped against their keycodes.
	 *
	 * @type {object<number, string>}
	 * @const
	 */
	var KEYCODES = {
		65: 'a'
	};

	/**
	 * Handlers for various key combos.
	 * Each handler ought to return false if they do not want the event to
	 * continue propagating.
	 */
	var keyBindings = {
		'ctrl+a': function () {
			var editable = CopyPaste.getEditableAt(CopyPaste.getRange());
			if (editable) {
				CopyPaste.selectAllOf(editable.obj[0]);
				return false;
			}
		}
	};

	/**
	 * Gets the name of the modifier key if is in effect for the given event.
	 *
	 * eg: <Ctrl>+c
	 *
	 * @param {jQuery.Event} $event
	 * @return {string|null} Modifier string or null if no modifier is in
	 *                       effect.
	 *                      
	 */
	function keyModifier($event) {
		return $event.altKey ? 'alt' :
					$event.ctrlKey ? 'ctrl' :
						$event.shiftKey ? 'shift' : null;
	}

	/**
	 * Handles keydown events that are fired on the page's document.
	 *
	 * @param {jQuery.Event) $event
	 * @return {boolean} Returns false to stop propagation; undefined otherwise.
	 */
	function onKeydown($event) {
		if (!Aloha.activeEditable) {
			return;
		}
		var key = KEYCODES[$event.which];
		if (key) {
			var modifier = keyModifier($event);
			var combo = (modifier ? modifier + '+' : '') + key;
			if (keyBindings[combo]) {
				return keyBindings[combo]($event);
			}
		}
	}

	$(document).keydown(onKeydown);

	/**
	 * Editable object
	 * @namespace Aloha
	 * @class Editable
	 * @method
	 * @constructor
	 * @param {Object} obj jQuery object reference to the object
	 */
	Aloha.Editable = Class.extend({

		_constructor: function (obj) {
			// check wheter the object has an ID otherwise generate and set
			// globally unique ID
			if (!obj.attr('id')) {
				obj.attr('id', GENTICS.Utils.guid());
			}

			// store object reference
			this.obj = obj;
			this.originalObj = obj;
			this.ready = false;

			// delimiters, timer and idle for smartContentChange
			// smartContentChange triggers -- tab: '\u0009' - space: '\u0020' - enter: 'Enter'
			// backspace: U+0008 - delete: U+007F
			this.sccDelimiters = [':', ';', '.', '!', '?', ',',
								  unescape('%u0009'), unescape('%u0020'), unescape('%u0008'), unescape('%u007F'), 'Enter'];
			this.sccIdle = 5000;
			this.sccDelay = 500;
			this.sccTimerIdle = false;
			this.sccTimerDelay = false;

			// see keyset http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/keyset.html
			this.keyCodeMap = {
				93: 'Apps', // The Application key
				18: 'Alt', // The Alt ( Menu ) key.
				20: 'CapsLock', // The Caps Lock ( Capital ) key.
				17: 'Control', // The Control ( Ctrl ) key.
				40: 'Down', // The Down Arrow key.
				35: 'End', // The End key.
				13: 'Enter', // The Enter key.
				112: 'F1', // The F1 key.
				113: 'F2', // The F2 key.
				114: 'F3', // The F3 key.
				115: 'F4', // The F4 key.
				116: 'F5', // The F5 key.
				117: 'F6', // The F6 key.
				118: 'F7', // The F7 key.
				119: 'F8', // The F8 key.
				120: 'F9', // The F9 key.
				121: 'F10', // The F10 key.
				122: 'F11', // The F11 key.
				123: 'F12', // The F12 key.

				// Anybody knows the keycode for F13-F24?
				36: 'Home', // The Home key.
				45: 'Insert', // The Insert ( Ins ) key.
				37: 'Left', // The Left Arrow key.
				224: 'Meta', // The Meta key.
				34: 'PageDown', // The Page Down ( Next ) key.
				33: 'PageUp', // The Page Up key.
				19: 'Pause', // The Pause key.
				44: 'PrintScreen', // The Print Screen ( PrintScrn, SnapShot ) key.
				39: 'Right', // The Right Arrow key.
				145: 'Scroll', // The scroll lock key
				16: 'Shift', // The Shift key.
				38: 'Up', // The Up Arrow key.
				91: 'Win', // The left Windows Logo key.
				92: 'Win' // The right Windows Logo key.
			};

			this.placeholderClass = 'aloha-placeholder';

			Aloha.registerEditable(this);
		},

		/**
		 * Initialize the editable
		 * @return void
		 * @hide
		 */
		init: function () {
			var me = this;

			// TODO make editables their own settings.
			this.settings = Aloha.settings;

			// smartContentChange settings
			// @TODO move to new config when implemented in Aloha
			if (Aloha.settings && Aloha.settings.smartContentChange) {
				if (Aloha.settings.smartContentChange.delimiters) {
					this.sccDelimiters = Aloha.settings.smartContentChange.delimiters;
				}

				if (Aloha.settings.smartContentChange.idle) {
					this.sccIdle = Aloha.settings.smartContentChange.idle;
				}

				if (Aloha.settings.smartContentChange.delay) {
					this.sccDelay = Aloha.settings.smartContentChange.delay;
				}
			}

			// check if Aloha can handle the obj as Editable
			if (!this.check(this.obj)) {
				//Aloha.log( 'warn', this, 'Aloha cannot handle {' + this.obj[0].nodeName + '}' );
				this.destroy();
				return;
			}

			// apply content handler to clean up content
			if (typeof Aloha.settings.contentHandler.getContents === 'undefined') {
				Aloha.settings.contentHandler.getContents = Aloha.defaults.contentHandler.getContents;
			}

			// apply content handler to clean up content
			if (typeof Aloha.settings.contentHandler.initEditable === 'undefined') {
				Aloha.settings.contentHandler.initEditable = Aloha.defaults.contentHandler.initEditable;
			}

			var content = me.obj.html();
			content = ContentHandlerManager.handleContent(content, {
				contenthandler: Aloha.settings.contentHandler.initEditable,
				command: 'initEditable'
			}, me);
			me.obj.html(content);

			// Because editables can only properly be initialized when Aloha
			// plugins are loaded.
			Aloha.bind('aloha-plugins-loaded', function () {
				me.obj.addClass('aloha-editable').contentEditable(true);

				me.obj.mousedown(function (e) {
					if (!Aloha.eventHandled) {
						Aloha.eventHandled = true;
						return me.activate(e);
					}
				});

				me.obj.mouseup(function (e) {
					Aloha.eventHandled = false;
				});

				me.obj.focus(function (e) {
					return me.activate(e);
				});

				var keyInputElements = me.obj.add('.aloha-block', me.obj)
					.keydown(function (event) {
						var letEventPass = Markup.preProcessKeyStrokes(event);
						me.keyCode = event.which;

						if (!letEventPass) {
							// the event will not proceed to key press, therefore trigger smartContentChange
							me.smartContentChange(event);
						}
						return letEventPass;
					})
					.keypress(StateOverride.keyPressHandler);

				// handle keypress
				me.obj.keypress(function (event) {
					// triggers a smartContentChange to get the right charcode
					// To test try http://www.w3.org/2002/09/tests/keys.html
					Aloha.activeEditable.smartContentChange(event);
				});

				// handle shortcut keys
				me.obj.keyup(function (event) {
					if (event.keyCode === 27) {
						Aloha.deactivateEditable();
						return false;
					}
				});

				// register the onSelectionChange Event with the Editable field
				me.obj.contentEditableSelectionChange(function (event) {
					Selection.onChange(me.obj, event);
					return me.obj;
				});

				// mark the editable as unmodified
				me.setUnmodified();

				// we don't do the sanitizing on aloha ready, since some plugins add elements into the content and bind
				// events to it. If we sanitize by replacing the html, all events would get lost. TODO: think about a
				// better solution for the sanitizing, without destroying the events  apply content handler to clean up content
				//				var content = me.obj.html();
				//				if ( typeof Aloha.settings.contentHandler.ini