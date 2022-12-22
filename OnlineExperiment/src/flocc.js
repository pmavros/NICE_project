(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.flocc = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    // https://github.com/moll/json-stringify-safe
    function stringify(obj, replacer, spaces, cycleReplacer) {
        return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
    }
    function serializer(replacer, cycleReplacer) {
        var stack = [];
        var keys = [];
        if (cycleReplacer == null)
            cycleReplacer = function (key, value) {
                if (stack[0] === value)
                    return "[Circular ~]";
                return ("[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]");
            };
        return function (key, value) {
            if (stack.length > 0) {
                var thisPos = stack.indexOf(this);
                ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
                ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
                if (~stack.indexOf(value))
                    value = cycleReplacer.call(this, key, value);
            }
            else
                stack.push(value);
            return replacer == null ? value : replacer.call(this, key, value);
        };
    }

    /*
     * All of the below is taken from the `random-seed` library (via NPM).
     * Modifications made to convert it to TypeScript and remove a few
     * unused methods.
     * - Scott Donaldson, July 2020
     *
     */
    /*	============================================================================
    This is based upon Johannes Baagoe's carefully designed and efficient hash
    function for use with JavaScript.  It has a proven "avalanche" effect such
    that every bit of the input affects every bit of the output 50% of the time,
    which is good.	See: http://baagoe.com/en/RandomMusings/hash/avalanche.xhtml
    ============================================================================
    */
    var Mash = function () {
        var n = 0xefc8249d;
        var mash = function (data) {
            if (data) {
                var strData = data.toString();
                for (var i = 0; i < strData.length; i++) {
                    n += strData.charCodeAt(i);
                    var h = 0.02519603282416938 * n;
                    n = h >>> 0;
                    h -= n;
                    h *= n;
                    n = h >>> 0;
                    h -= n;
                    n += h * 0x100000000; // 2^32
                }
                return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
            }
            else {
                n = 0xefc8249d;
            }
        };
        return mash;
    };
    var uheprng = function () {
        return (function () {
            var seed = null;
            var o = 48; // set the 'order' number of ENTROPY-holding 32-bit values
            var c = 1; // init the 'carry' used by the multiply-with-carry (MWC) algorithm
            var p = o; // init the 'phase' (max-1) of the intermediate variable pointer
            var s = new Array(o); // declare our intermediate variables array
            var i; // general purpose local
            var j; // general purpose local
            var k = 0; // general purpose local
            // when our "uheprng" is initially invoked our PRNG state is initialized from the
            // browser's own local PRNG. This is okay since although its generator might not
            // be wonderful, it's useful for establishing large startup entropy for our usage.
            var mash = Mash(); // get a pointer to our high-performance "Mash" hash
            // fill the array with initial mash hash values
            for (i = 0; i < o; i++) {
                s[i] = mash(Math.random());
            }
            // this PRIVATE (internal access only) function is the heart of the multiply-with-carry
            // (MWC) PRNG algorithm. When called it returns a pseudo-random number in the form of a
            // 32-bit JavaScript fraction (0.0 to <1.0) it is a PRIVATE function used by the default
            // [0-1] return function, and by the random 'string(n)' function which returns 'n'
            // characters from 33 to 126.
            var rawprng = function () {
                if (++p >= o) {
                    p = 0;
                }
                var t = 1768863 * s[p] + c * 2.3283064365386963e-10; // 2^-32
                return (s[p] = t - (c = t | 0));
            };
            // this EXPORTED function is the default function returned by this library.
            // The values returned are integers in the range from 0 to range-1. We first
            // obtain two 32-bit fractions (from rawprng) to synthesize a single high
            // resolution 53-bit prng (0 to <1), then we multiply this by the caller's
            // "range" param and take the "floor" to return a equally probable integer.
            var random = function (range) {
                return Math.floor(range *
                    (rawprng() + ((rawprng() * 0x200000) | 0) * 1.1102230246251565e-16)); // 2^-53
            };
            // this EXPORTED function 'string(n)' returns a pseudo-random string of
            // 'n' printable characters ranging from chr(33) to chr(126) inclusive.
            random.string = function (count) {
                var i;
                var s = "";
                for (i = 0; i < count; i++) {
                    s += String.fromCharCode(33 + random(94));
                }
                return s;
            };
            // this PRIVATE "hash" function is used to evolve the generator's internal
            // entropy state. It is also called by the EXPORTED addEntropy() function
            // which is used to pour entropy into the PRNG.
            var hash = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                for (i = 0; i < args.length; i++) {
                    for (j = 0; j < o; j++) {
                        s[j] -= mash(args[i]);
                        if (s[j] < 0) {
                            s[j] += 1;
                        }
                    }
                }
            };
            // this EXPORTED "clean string" function removes leading and trailing spaces and non-printing
            // control characters, including any embedded carriage-return (CR) and line-feed (LF) characters,
            // from any string it is handed. this is also used by the 'hashstring' function (below) to help
            // users always obtain the same EFFECTIVE uheprng seeding key.
            random.cleanString = function (inStr) {
                inStr = inStr.replace(/(^\s*)|(\s*$)/gi, ""); // remove any/all leading spaces
                inStr = inStr.replace(/[\x00-\x1F]/gi, ""); // remove any/all control characters
                inStr = inStr.replace(/\n /, "\n"); // remove any/all trailing spaces
                return inStr; // return the cleaned up result
            };
            // this EXPORTED "hash string" function hashes the provided character string after first removing
            // any leading or trailing spaces and ignoring any embedded carriage returns (CR) or Line Feeds (LF)
            random.hashString = function (inStr) {
                inStr = random.cleanString(inStr);
                mash(inStr); // use the string to evolve the 'mash' state
                for (i = 0; i < inStr.length; i++) {
                    // scan through the characters in our string
                    k = inStr.charCodeAt(i); // get the character code at the location
                    for (j = 0; j < o; j++) {
                        // "mash" it into the UHEPRNG state
                        s[j] -= mash(k);
                        if (s[j] < 0) {
                            s[j] += 1;
                        }
                    }
                }
            };
            // this EXPORTED function allows you to seed the random generator.
            random.seed = function (s) {
                if (typeof s === "undefined" || s === null) {
                    s = Math.random();
                }
                if (typeof s !== "string") {
                    s = stringify(s, function (key, value) {
                        if (typeof value === "function") {
                            return value.toString();
                        }
                        return value;
                    });
                }
                random.initState();
                random.hashString(s);
                seed = s;
            };
            // this handy exported function is used to add entropy to our uheprng at any time
            random.addEntropy = function ( /* accept zero or more arguments */) {
                var args = [];
                for (i = 0; i < arguments.length; i++) {
                    args.push(arguments[i]);
                }
                hash(k++ + new Date().getTime() + args.join("") + Math.random());
            };
            // if we want to provide a deterministic startup context for our PRNG,
            // but without directly setting the internal state variables, this allows
            // us to initialize the mash hash and PRNG's internal state before providing
            // some hashing input
            random.initState = function () {
                mash(); // pass a null arg to force mash hash to init
                for (i = 0; i < o; i++) {
                    s[i] = mash(" "); // fill the array with initial mash hash values
                }
                c = 1; // init our multiply-with-carry carry
                p = o; // init our phase
            };
            // Returns a random integer between 0 (inclusive) and range (exclusive)
            random.range = function (range) {
                return random(range);
            };
            // Returns a random float between 0 (inclusive) and 1 (exclusive)
            random.random = function () {
                return random(Number.MAX_VALUE - 1) / Number.MAX_VALUE;
            };
            random.getSeed = function () {
                return seed;
            };
            // when our main outer "uheprng" function is called, after setting up our
            // initial variables and entropic state, we return an "instance pointer"
            // to the internal anonymous function which can then be used to access
            // the uheprng's various exported functions.  As with the ".done" function
            // above, we should set the returned value to 'null' once we're finished
            // using any of these functions.
            return random;
        })();
    };
    var PRNG = uheprng();

    /**
     * Return a random integer (or float)
     * between `min` and `max`
     * @param min
     * @param max
     * @param {boolean} float - If true, returns a float. If false or empty, returns an int.
     * @since 0.1.4
     */
    function random(min, max, float) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        if (float === void 0) { float = false; }
        var rand = (PRNG.getSeed() === null ? Math : PRNG).random();
        var length = ("" + rand).length - 1;
        if (float) {
            return Math.min(min + rand * (max - min + parseFloat("1e-" + length)), max);
        }
        else {
            return min + Math.floor(rand * (max - min + 1));
        }
    }

    /**
     * Produces a pseudo-random value sampled from the range 0-1 (inclusive).
     * Shortcut for calling `random(0, 1, true);`
     * @since 0.5.0
     */
    function uniform() {
        return random(0, 1, true);
    }

    /**
     * @since 0.1.3
     */
    function uuid() {
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
        var lut = [];
        for (var i = 0; i < 256; i++) {
            lut[i] = (i < 16 ? "0" : "") + i.toString(16);
        }
        return function generate() {
            var d0 = (uniform() * 0xffffffff) | 0;
            var d1 = (uniform() * 0xffffffff) | 0;
            var d2 = (uniform() * 0xffffffff) | 0;
            var d3 = (uniform() * 0xffffffff) | 0;
            var uuid = lut[d0 & 0xff] +
                lut[(d0 >> 8) & 0xff] +
                lut[(d0 >> 16) & 0xff] +
                lut[(d0 >> 24) & 0xff] +
                "-" +
                lut[d1 & 0xff] +
                lut[(d1 >> 8) & 0xff] +
                "-" +
                lut[((d1 >> 16) & 0x0f) | 0x40] +
                lut[(d1 >> 24) & 0xff] +
                "-" +
                lut[(d2 & 0x3f) | 0x80] +
                lut[(d2 >> 8) & 0xff] +
                "-" +
                lut[(d2 >> 16) & 0xff] +
                lut[(d2 >> 24) & 0xff] +
                lut[d3 & 0xff] +
                lut[(d3 >> 8) & 0xff] +
                lut[(d3 >> 16) & 0xff] +
                lut[(d3 >> 24) & 0xff];
            // .toUpperCase() here flattens concatenated strings to save heap memory space.
            return uuid.toUpperCase();
        };
    }
    var uuid$1 = uuid();

    /**
     * Find the sum of an Array of numbers.
     * @param {Array<number>} arr
     * @returns {number}
     * @since 0.0.16
     */
    function sum(arr) {
        return arr.reduce(function (a, b) { return a + b; }, 0);
    }

    /**
     * Linearly interpolates between `x` and `y`. The third parameter `t` (usually
     * a value between `0` and `1`) is the amount by which to interpolate &mdash; a value of `0`
     * returns the `x` value and `1` returns the `y` value.
     *
     * ```js
     * lerp(5, 10, 0.5); // returns 7.5
     * lerp(0, 100, 0.1); // returns 10
     * lerp(22, 79, 1); // returns 79
     * ```
     *
     * @param x The first value.
     * @param y The second value.
     * @param t The amount by which to interpolate (0 returns x, 1 returns y).
     * @since 0.2.4
     */
    function lerp(x, y, t) {
        return (1 - t) * x + t * y;
    }

    /**
     * Copies the values of `source` to `arr`
     * or to a new Array.
     *
     * @hidden
     * @param {Array} source The Array to copy values from.
     * @param {Array} [arr=[]] The Array to copy values to.
     * @returns {Array}
     * @since 0.0.7
     */
    function copyArray(source, arr) {
        var index = -1;
        var length = source.length;
        if (!arr)
            arr = new Array(length);
        while (++index < length)
            arr[index] = source[index];
        return arr;
    }

    /**
     * A `Vector` contains multi-dimensional numeric data.
     *
     * @since 0.1.0
     */
    var Vector = /** @class */ (function () {
        function Vector() {
            var data = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                data[_i] = arguments[_i];
            }
            this.data = data || [];
            this.dimension = data ? data.length : 0;
        }
        /**
         * Retrieve a value from a `Vector` by its index. If the given index is greater than the
         * `Vector`'s dimension, this returns `0` by default.
         *
         * ```js
         * const v = new Vector(1, 2, 4);
         *
         * v.index(0); // returns 1
         * v.index(2); // returns 4
         * v.index(5); // returns 0
         * ```
         * @since 0.1.0
         */
        Vector.prototype.index = function (i) {
            if (this.dimension > i) {
                return this.data[i];
            }
            // Attempting to access index ${n} on a vector greater than the vector's dimension returns 0 by default
            return 0;
        };
        /**
         * Set the value at a given index. If the index is greater than the {@linkcode dimension}
         * of this `Vector`, the dimension will be increased to the dimensionality implied by the index.
         * @param i The numerical index (0-based) or lowercase string value (e.g. `"x"`) to set.
         * @param value The value to set at this index/position.
         *
         * ```js
         * const vector = new Vector();
         * vector.set(0, 10);
         * vector.set('y', 2);
         * vector.set(2, 4);
         *
         * vector.xyz; // [10, 2, 4]
         * ```
         *
         * @since 0.1.0
         */
        Vector.prototype.set = function (i, value) {
            var index;
            if (i === "x" || i === "r") {
                index = 0;
            }
            else if (i === "y" || i === "g") {
                index = 1;
            }
            else if (i === "z" || i === "b") {
                index = 2;
            }
            else if (i === "w" || i === "a") {
                index = 3;
            }
            else if (typeof i === "number") {
                index = i;
            }
            while (this.dimension <= index) {
                this.data[this.dimension] = 0;
                this.dimension++;
            }
            this.data[index] = value;
            return this;
        };
        Object.defineProperty(Vector.prototype, "x", {
            /** @since 0.1.0 */
            get: function () {
                return this.index(0);
            },
            /** @since 0.1.0 */
            set: function (n) {
                this.set(0, n);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "y", {
            /** @since 0.1.0 */
            get: function () {
                return this.index(1);
            },
            /** @since 0.1.0 */
            set: function (n) {
                this.set(1, n);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "z", {
            /** @since 0.1.0 */
            get: function () {
                return this.index(2);
            },
            /** @since 0.1.0 */
            set: function (n) {
                this.set(2, n);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "w", {
            /** @since 0.1.0 */
            get: function () {
                return this.index(3);
            },
            /** @since 0.1.0 */
            set: function (n) {
                this.set(3, n);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "xy", {
            /** @since 0.2.4 */
            get: function () {
                return [this.index(0), this.index(1)];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "xz", {
            /** @since 0.2.4 */
            get: function () {
                return [this.index(0), this.index(2)];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "yz", {
            /** @since 0.2.4 */
            get: function () {
                return [this.index(1), this.index(2)];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "xyz", {
            /** @since 0.2.4 */
            get: function () {
                return [this.index(0), this.index(1), this.index(2)];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "r", {
            /**
             * `r` for 'red' (the 1st value)
             * @since 0.1.0
             */
            get: function () {
                return this.index(0);
            },
            /**
             * `r` for 'red' (the 1st value)
             * @since 0.1.0
             */
            set: function (n) {
                this.set(0, n);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "g", {
            /**
             * `g` for 'green' (the 2nd value)
             * @since 0.1.0
             */
            get: function () {
                return this.index(1);
            },
            /**
             * `g` for 'green' (the 2nd value)
             * @since 0.1.0
             */
            set: function (n) {
                this.set(1, n);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "b", {
            /**
             * `b` for 'blue' (the 3rd value)
             * @since 0.1.0
             */
            get: function () {
                return this.index(2);
            },
            /**
             * `b` for 'blue' (the 3rd value)
             * @since 0.1.0
             */
            set: function (n) {
                this.set(2, n);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "a", {
            /**
             * `a` for 'alpha' (the 4th value)
             * @since 0.1.0
             */
            get: function () {
                return this.index(3);
            },
            /**
             * `a` for 'alpha' (the 4th value)
             * @since 0.1.0
             */
            set: function (n) {
                this.set(3, n);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "rgb", {
            /** @since 0.2.4 */
            get: function () {
                return [this.index(0), this.index(1), this.index(2)];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "rgba", {
            /** @since 0.2.4 */
            get: function () {
                return [this.index(0), this.index(1), this.index(2), this.index(3)];
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Add another `Vector` to this `Vector`. This *does* mutate the `Vector` that calls this method.
         * @since 0.1.0
         */
        Vector.prototype.add = function (v) {
            var dimension = Math.max(this.dimension, v.dimension);
            for (var i = 0; i < dimension; i++) {
                if (i >= this.dimension) {
                    this.dimension = i;
                    this.set(i, 0);
                }
                this.set(i, this.index(i) + v.index(i));
            }
            return this;
        };
        /**
         * Multiply this `Vector` by a scalar number. This *does* mutate the `Vector` that calls this method.
         *
         * ```js
         * const v = new Vector(1, 2);
         * v.multiplyScalar(5);
         * v.xy; // returns [5, 10]
         *
         * v.multiplyScalar(-0.5);
         * v.xy; // returns [-2.5, -5]
         * ```
         *
         * @since 0.1.0
         */
        Vector.prototype.multiplyScalar = function (n) {
            this.data = this.data.map(function (x) { return x * n; });
            return this;
        };
        /**
         * Add a scalar number to all of this `Vector`'s values'. This *does* mutate the `Vector` that calls this method.
         * @since 0.1.0
         */
        Vector.prototype.addScalar = function (n) {
            this.data = this.data.map(function (x) { return x + n; });
            return this;
        };
        /**
         * Computes the Euclidean length (straight-line length) from the origin to this vector.
         * @since 0.1.0
         */
        Vector.prototype.length = function () {
            return Math.sqrt(sum(this.data.map(function (x) { return Math.pow(x, 2); })));
        };
        /**
         * Normalize the `Vector` (turn it into a `Vector` with length = `1`). Has no effect on the 0 `Vector`. This *does* mutate the `Vector` that calls this method.
         *
         * ```js
         * const v = new Vector(5, 3, -1);
         * v.normalize();
         * v.length(); // returns 1
         * ```
         *
         * @since 0.1.0
         */
        Vector.prototype.normalize = function () {
            var l = this.length();
            if (l > 0) {
                this.multiplyScalar(1 / l);
            }
            return this;
        };
        /**
         * Create a copy of this `Vector`.
         * @since 0.1.0
         */
        Vector.prototype.clone = function () {
            var data = copyArray(this.data);
            return new (Vector.bind.apply(Vector, __spreadArrays([void 0], data)))();
        };
        /**
         * Rotate the `Vector` about the z-axis by `angle` radians (updating its `x` and `y` values). This *does* mutate the `Vector` that calls this method.
         *
         * ```js
         * const v = new Vector(1, 0);
         * v.rotateZ(Math.PI / 2); // rotate by PI / 2 radians = 90 degrees
         *
         * v.xy; // returns [0, 1]
         * ```
         *
         * @since 0.2.2
         */
        Vector.prototype.rotateZ = function (angle) {
            var sin = Math.sin(angle);
            var cos = Math.cos(angle);
            var x = this.x * cos - this.y * sin;
            var y = this.x * sin + this.y * cos;
            this.x = x;
            this.y = y;
            return this;
        };
        /**
         * Get the {@link https://en.wikipedia.org/wiki/Dot_product | dot product} of this `Vector` with another.
         * @since 0.2.4
         */
        Vector.prototype.dot = function (v) {
            var dimension = Math.max(this.dimension, v.dimension);
            var sum = 0;
            for (var i = 0; i < dimension; i++)
                sum += this.index(i) * v.index(i);
            return sum;
        };
        /**
         * Linearly interpolate between this `Vector` and another `Vector`. This *does not* mutate the original `Vector` that calls this method, but returns a new `Vector`.
         *
         * ```js
         * const a = new Vector(1, 3, -5);
         * const b = new Vector(4, -2);
         *
         * a.lerp(b, 0); // returns a clone of Vector a
         * a.lerp(b, 1); // returns a clone of Vector b
         *
         * const mid = a.lerp(b, 0.5); // returns a Vector halfway between a and b
         * mid.xyz; // returns [2.5, 0.5, -2.5]
         * ```
         *
         * @param v - The other vector.
         * @param t - The amount by which to interpolate (usually between `0` and `1`, although it can be any number).
         * @returns {Vector} - The new, interpolated vector.
         * @since 0.2.4
         */
        Vector.prototype.lerp = function (v, t) {
            var longerVector = this.dimension > v.dimension ? this : v;
            var shorterVector = this.dimension > v.dimension ? v : this;
            var lerpedData = longerVector.data.map(function (x, i) {
                return lerp(x, shorterVector.index(i), t);
            });
            return new (Vector.bind.apply(Vector, __spreadArrays([void 0], lerpedData)))();
        };
        return Vector;
    }());

    var Operators;
    (function (Operators) {
        Operators["add"] = "add";
        Operators["subtract"] = "subtract";
        Operators["multiply"] = "multiply";
        Operators["divide"] = "divide";
        Operators["mod"] = "mod";
        Operators["power"] = "power";
        Operators["get"] = "get";
        Operators["set"] = "set";
        Operators["enqueue"] = "enqueue";
        Operators["local"] = "local";
        Operators["if"] = "if";
        Operators["and"] = "and";
        Operators["or"] = "or";
        Operators["gt"] = "gt";
        Operators["gte"] = "gte";
        Operators["lt"] = "lt";
        Operators["lte"] = "lte";
        Operators["eq"] = "eq";
        Operators["map"] = "map";
        Operators["filter"] = "filter";
        Operators["key"] = "key";
        Operators["method"] = "method";
        Operators["agent"] = "agent";
        Operators["environment"] = "environment";
        Operators["vector"] = "vector";
    })(Operators || (Operators = {}));
    var add = function (a, b) { return a + b; };
    var subtract = function (a, b) { return a - b; };
    var multiply = function (a, b) { return a * b; };
    var divide = function (a, b) { return a / b; };
    var power = function (a, b) { return Math.pow(a, b); };
    var mod = function (a, b) { return a % b; };
    var get = function (agent, key) { return agent.get(key); };
    var set = function (agent, key, value) {
        agent.set(key, value);
        return null;
    };
    var key = function (obj, k) {
        return obj[k];
    };
    var method = function (obj, name) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (!obj || !obj[name] || !(obj[name] instanceof Function))
            return null;
        return obj[name].apply(obj, args);
    };
    /**
     * The `Rule` class is an experimental interface for adding behavior to {@linkcode Agent}s. A `Rule` object may be used in place of a `tick` function to be added as `Agent` behavior using `agent.set('tick', tickRule)`. As a trivial example, consider the following `Rule`, which increments the `Agent`'s `x` value with every time step:
     *
     * ```js
     * const rule = new Rule(environment, [
     *   "set", "x", [
     *     "add", 1, [
     *       "get", "x"
     *     ]
     *   ]
     * ]);
     * agent.set("tick", rule);
     * ```
     *
     * Reading from the outer arrays inward, the steps of this `Rule` instructs the `Agent` to:
     * - `set` the `Agent`'s `"x"` value to...
     *   - The result of `add`ing `1` and...
     *     - The `Agent`'s current `"x"` value
     *
     * Generally, `Rule` steps are a deeply nested array, where the first value of any given array is always an instruction or operator (e.g. `"set"`, `"add"`, `"filter"`). See the {@linkcode constructor} function for more information about steps.
     * @since 0.3.0
     */
    var Rule = /** @class */ (function () {
        /**
         * A single step may be as simple as `["get", "x"]`. This returns the `Agent`'s `"x"` value to the outer step that contains it. So, for example, the step `["add", 1, ["get", "x"]]`, working from the inside out, retrieves the `"x"` value and then adds `1` to it. More complex steps function similarly, always traversing to the deepest nested step, evaluating it, and 'unwrapping' until all steps have been executed.
         *
         * A step's first element should be a string that is one of the allowed operators, followed by a certain number of arguments.
         *
         * |Operator|Arguments|Notes|
         * |---|---|---|
         * |`"add"`|`2`|Pass 2 numbers, or two steps that evaluate to numbers|
         * |`"subtract"`|`2`|""|
         * |`"multiply"`|`2`|""|
         * |`"divide"`|`2`|""|
         * |`"mod"`|`2`|""|
         * |`"power"`|`2`|""|
         * |`"get"`|`1`|Pass the key of `Agent` data to retrieve|
         * |`"set"`|`2`|Pass the key and value to set|
         * |`"enqueue"`|`2`|Pass the key and value to enqueue|
         * |`"local"`|`2`|Pass the key and value to set as local variables|
         * |`"if"`|`3`|Pass the conditional (usually a step that evaluates to a boolean), the step to run when `true`, and the step to run when `false|
         * |`"and"`|`2`|Pass the two steps to logically evaluate|
         * |`"or"`|`2`|""|
         * |`"gt"`|`2`|""|
         * |`"gte"`|`2`|""|
         * |`"lt"`|`2`|""|
         * |`"lte"`|`2`|""|
         * |`"eq"`|`2`|""|
         * |`"map"`|`2`|Pass an array (or step that evaluates to an array) and a lambda to invoke for each element|
         * |`"filter"`|`2`|""|
         * |`"key"`|`2`|Pass an object (or step that evaluates to an object) and the key to retrieve from that object|
         * |`"agent"`|`0`|No arguments; returns the `Agent`|
         * |`"environment"`|`0`|No arguments, returns the `Environment`|
         * |`"vector"`|`any`|Creates an n-dimensional {@linkcode Vector} from the supplied arguments|
         */
        function Rule(environment, steps) {
            var _this = this;
            /** @hidden */
            this.steps = [];
            /** @hidden */
            this.locals = {};
            /**
             * interpret single array step
             * @since 0.3.0
             * @hidden
             */
            this.evaluate = function (agent, step) {
                var first = step && step.length > 0 ? step[0] : null;
                if (first === undefined || first === null)
                    return null;
                if (first instanceof Array) {
                    var innerStep = _this.evaluate(agent, first);
                    if (innerStep === null)
                        return _this.evaluate(agent, step.slice(1));
                    return innerStep;
                }
                if (first === "log") {
                    console.log("logging", step.slice(1), _this.evaluate(agent, step.slice(1)));
                    return null;
                }
                if (!(first in Operators) && step.length > 1) {
                    return step;
                }
                var a = step.length > 1 ? [step[1]] : undefined;
                var b = step.length > 2 ? [step[2]] : undefined;
                var c = step.length > 3 ? [step[3]] : undefined;
                if (first === Operators.add)
                    return add(_this.evaluate(agent, a), _this.evaluate(agent, b));
                if (first === Operators.subtract)
                    return subtract(_this.evaluate(agent, a), _this.evaluate(agent, b));
                if (first === Operators.multiply)
                    return multiply(_this.evaluate(agent, a), _this.evaluate(agent, b));
                if (first === Operators.divide)
                    return divide(_this.evaluate(agent, a), _this.evaluate(agent, b));
                if (first === Operators.mod)
                    return mod(_this.evaluate(agent, a), _this.evaluate(agent, b));
                if (first === Operators.power)
                    return power(_this.evaluate(agent, a), _this.evaluate(agent, b));
                if (first === Operators.get)
                    return get(agent, _this.evaluate(agent, a));
                if (first === Operators.set)
                    return set(agent, _this.evaluate(agent, a), _this.evaluate(agent, b));
                if (first === Operators.enqueue) {
                    agent.enqueue(function () {
                        return set(agent, _this.evaluate(agent, a), _this.evaluate(agent, b));
                    });
                    return null;
                }
                if (first === Operators.local) {
                    var key_1 = _this.evaluate(agent, a);
                    var value = _this.evaluate(agent, b);
                    // get
                    if (!value)
                        return _this.locals[key_1];
                    // set
                    _this.locals[key_1] = value;
                    return null;
                }
                if (first === Operators.if) {
                    return _this.evaluate(agent, a)
                        ? _this.evaluate(agent, b)
                        : _this.evaluate(agent, c);
                }
                if (first === Operators.and) {
                    if (!_this.evaluate(agent, a) || !_this.evaluate(agent, b))
                        return false;
                    return true;
                }
                if (first === Operators.or) {
                    if (!_this.evaluate(agent, a) && !_this.evaluate(agent, b))
                        return false;
                    return true;
                }
                if (first === Operators.gt)
                    return _this.evaluate(agent, a) > _this.evaluate(agent, b);
                if (first === Operators.gte)
                    return _this.evaluate(agent, a) >= _this.evaluate(agent, b);
                if (first === Operators.lt)
                    return _this.evaluate(agent, a) < _this.evaluate(agent, b);
                if (first === Operators.lte)
                    return _this.evaluate(agent, a) <= _this.evaluate(agent, b);
                if (first === Operators.eq)
                    return _this.evaluate(agent, a) === _this.evaluate(agent, b);
                if (first === Operators.map) {
                    var arr = _this.evaluate(agent, a);
                    var lambda = step[2]; // before evaluation
                    var mapped = [];
                    for (var i in arr) {
                        var el = arr[i];
                        var withEl = Array.from(lambda);
                        withEl.splice(1, 0, el);
                        mapped.push(_this.evaluate(agent, withEl));
                    }
                    return mapped;
                }
                if (first === Operators.filter) {
                    var arr = _this.evaluate(agent, a);
                    var lambda = step[2]; // before evaluation
                    var mapped = [];
                    for (var i in arr) {
                        var el = arr[i];
                        var withEl = Array.from(lambda);
                        withEl.splice(1, 0, el);
                        if (_this.evaluate(agent, withEl)) {
                            mapped.push(el);
                        }
                    }
                    return mapped;
                }
                if (first === Operators.key)
                    return key(_this.evaluate(agent, a), _this.evaluate(agent, b));
                if (first === Operators.method) {
                    var args = step.length > 3 ? [_this.evaluate(agent, step.slice(3))] : [];
                    return method.apply(void 0, __spreadArrays([_this.evaluate(agent, a), _this.evaluate(agent, b)], args));
                }
                if (first === Operators.agent)
                    return agent;
                if (first === Operators.environment)
                    return _this.environment;
                if (first === Operators.vector) {
                    return new (Vector.bind.apply(Vector, __spreadArrays([void 0], _this.evaluate(agent, step.slice(1)))))();
                }
                return first;
            };
            this.environment = environment;
            this.steps = steps;
        }
        /**
         * @since 0.3.0
         * @hidden
         */
        Rule.prototype.call = function (agent) {
            return this.evaluate(agent, this.steps);
        };
        return Rule;
    }());

    /**
     * Lodash's implementation:
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it's called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     */
    function before(n, func) {
        var result;
        if (typeof func !== "function") {
            throw new TypeError("Expected a function");
        }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (--n > 0) {
                result = func.apply(this, args);
            }
            if (n <= 1) {
                func = undefined;
            }
            return result;
        };
    }
    /**
     * Lodash's implementation:
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first invocation. The `func` is
     * invoked with the `this` binding and arguments of the created function.
     *
     * @since 0.5.18
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     */
    function once(func) {
        return before(2, func);
    }

    var disallowed = ["tick", "queue"];
    var warnOnce1 = once(console.warn.bind(console));
    var warnOnce2 = once(console.warn.bind(console));
    /**
     * This class puts the `Agent` in 'agent-based modeling.' More specifically,
     * an `Agent` represents an individual unit of data and its associated
     * behaviors.
     * @since 0.0.5
     */
    var Agent = /** @class */ (function () {
        /**
         * `Agent`s can be instantiated with or without data. Instantiating
         * with data is equivalent to creating an `Agent` and immediately
         * calling {@linkcode Agent.set} to add data.
         *
         * ```js
         * // instantiates an Agent without data
         * const a = new Agent();
         *
         * // instantiates an Agent with data
         * const b = new Agent({
         *   x: 50,
         *   y: 100
         * });
         * ```
         * @param data
         */
        function Agent(data) {
            if (data === void 0) { data = {}; }
            /**
             * An `Agent` can only belong to a single {@linkcode Environment}. When
             * `environment.addAgent(agent);` is called, this is value is updated
             * to point to that `Environment`.
             *
             * ```js
             * const environment = new Environment();
             * const agent = new Agent();
             * agent.environment; // returns `null`
             *
             * environment.addAgent(agent);
             * agent.environment === environment; // returns `true`
             */
            this.environment = null;
            /** @hidden */
            this.rules = [];
            /** @hidden */
            this.queue = [];
            /** @hidden */
            this.data = {};
            /**
             * `Agent`s are automatically assigned a unique ID when they are created.
             * This can be useful when you need to refer to a specific `Agent`, and
             * they can be retrieved using their ID from their `Environment` by calling
             * {@link Environment.getAgentById | `environment.getAgentById(id);`}
             * ```js
             * const agent = new Agent();
             * const id = agent.id; // returns "59B4F928-46C8-..." (for example)
             * ```
             */
            this.id = uuid$1();
            /**
             * This is used as a temporary store for data that
             * gets returned from rules. When enqueued rules are executed,
             * even if there aren't any enqueued rules, .set gets called
             * on any data that was placed here.
             * @hidden
             */
            this.__newData = {};
            /** When agent.get('key') is called, this pseudo-private member is set to 'key'.
             * Once it is retrieved, it is reset to null. If agent.get('key') is called before
             * this has been reset, that means that there is an infinite loop, and the call
             * will throw an error.
             * @hidden
             */
            this.__retrievingData = null;
            /** @hidden */
            this.__subtree = null;
            this.set(data);
        }
        /**
         * Set a function value. `tick` and `queue` are not automatically called,
         * but any other named value will automatically be called when referenced.
         * @hidden
         */
        Agent.prototype._setFunctionValue = function (name, fn) {
            var _this = this;
            if (disallowed.includes(name)) {
                this.data[name] = fn;
            }
            else {
                var data = this.data;
                Object.defineProperty(data, name, {
                    get: function () { return fn(_this); },
                    configurable: true
                });
            }
        };
        /**
         * Retrieve an arbitrary piece of data associated by name.
         * If the data has not been {@linkcode set}, returns `null`.
         * @since 0.0.5
         */
        Agent.prototype.get = function (name) {
            // return null if it doesn't exist or if is disallowed
            if (!this.data.hasOwnProperty(name) || disallowed.includes(name))
                return null;
            // avoid infinite loops and give the user a hint if one is encountered
            if (this.__retrievingData === name) {
                throw new Error("A reference to an agent's `" + name + "` resulted in a recursive call to get that same data.\n\nThis results in an infinite loop, since the agent will keep requesting that data, which requests itself, and so on forever. You should probably try to restructure your data function so this doesn't happen!");
            }
            this.__retrievingData = name;
            var data = this.data[name];
            // Once the data has been retrieved, reset the pseudo-private member
            this.__retrievingData = null;
            return data;
        };
        /**
         * Retrieve all the data associated with this `Agent` at once.
         *
         * ```js
         * agent.set('x', 3);
         * agent.set('color', 'blue');
         * agent.set('active', false);
         *
         * agent.getData();
         * // returns {
         * //   x: 3,
         * //   color: 'blue',
         * //   active: false
         * // }
         * ```
         * @since 0.1.0
         */
        Agent.prototype.getData = function () {
            return this.data;
        };
        /**
         * Set a piece of data associated with this agent.
         * Name should be a string while value can be any valid type.
         * Alternatively, the first parameter can be an object, which merges
         * the current data with the new data (adding new values and overwriting existing).
         * Ex. agent.set('x', 5); agent.set('color', 'red');
         * @param {string|Data} name
         * @param {*} value
         * @since 0.0.5
         */
        Agent.prototype.set = function (name, value) {
            var _this = this;
            // if just receiving a single key-value pair, simply set it
            if (typeof name === "string") {
                this._setKeyValue(name, value);
                // if receiving an object of key-value pairs (i.e. data object),
                // loop over keys and call setKeyValue for each
            }
            else {
                Object.keys(name).forEach(function (key) {
                    var value = name[key];
                    _this._setKeyValue(key, value);
                });
            }
        };
        /**
         * Helper function to set key-value pair depending on whether value
         * is a function (callable) or not
         * @hidden
         */
        Agent.prototype._setKeyValue = function (key, value) {
            if (typeof value === "function") {
                this._setFunctionValue(key, value);
            }
            else {
                this.data[key] = value;
                // automatically handle wrapping for toroidal environments
                if (this.environment && this.environment.opts.torus) {
                    var _a = this.environment, width = _a.width, height = _a.height;
                    if (key === "x" && value > width)
                        this.data[key] -= width;
                    if (key === "x" && value < 0)
                        this.data[key] += width;
                    if (key === "y" && value > height)
                        this.data[key] -= height;
                    if (key === "y" && value < 0)
                        this.data[key] += height;
                }
                if (this.environment && this.environment.helpers.kdtree) {
                    var subtree = this.__subtree;
                    var bbox = subtree.bbox;
                    // if the agent is no longer contained within its
                    // subtree's bounding box, then
                    // traverse the tree and mark the highest level
                    // tree that will need to rebalance, starting with the parent
                    // of the agent's current subtree
                    while (!bbox.contains(this)) {
                        if (subtree === this.environment.helpers.kdtree)
                            break;
                        subtree = subtree.parent;
                        bbox = subtree.bbox;
                    }
                    subtree.needsUpdating = true;
                }
            }
        };
        /**
         * increment a numeric piece of data associated with this `Agent`
         * (increasing its value by 1). This method is *synchronous* &mdash;
         * it immediately increases the value (to *asynchronously* increase it,
         * the rule function should instead return a new value.
         *
         * ```js
         * agent.set('x', 50);
         * agent.increment('x');
         * agent.get('x'); // returns 51
         * ```
         *
         * If the second parameter `n` is included, decrements by that amount.
         *
         * ```js
         * agent.set('x', 50);
         * agent.increment('x', 10);
         * agent.get('x'); // returns 60
         * ```
         *
         * If the value has not yet been set, calling this method sets it to `1`
         * (or to `n`).
         * @since 0.0.8
         */
        Agent.prototype.increment = function (name, n) {
            if (n === void 0) { n = 1; }
            if (this.get(name) === null)
                this.set(name, 0);
            this.set(name, this.get(name) + n);
        };
        /**
         * Decrement a numeric piece of data associated with this `Agent`
         * (decreasing its value by 1). This method is *synchronous* &mdash;
         * it immediately decreases the value (to *asynchronously* decrease it,
         * the rule function should instead return a new value.
         *
         * ```js
         * agent.set('x', 50);
         * agent.decrement('x');
         * agent.get('x'); // returns 49
         * ```
         *
         * If the second parameter `n` is included, decrements by that amount.
         *
         * ```js
         * agent.set('x', 50);
         * agent.decrement('x', 10);
         * agent.get('x'); // returns 40
         * ```
         *
         * If the value has not yet been set, calling this method sets it to `-1`
         * (or to `-n`).
         * @since 0.0.8
         */
        Agent.prototype.decrement = function (name, n) {
            if (n === void 0) { n = 1; }
            this.increment(name, -n);
        };
        /**
         * Until v0.5.14, this was the preferred way to add behavior to `Agent`s.
         * Now, the preferred method is by setting the `Agent`'s `"tick"` value (i.e. `agent.set({ tick: function(agt) { ... }})`).
         * This method will still be allowed until v0.7.0.
         *
         * Adds a rule (a function taking an `Agent` as a callback or a {@linkcode Rule} object) that may be run with every {@linkcode Environment.tick}.
         * It is possible to add *more than one rule* to an `Agent`, although it
         * is generally easier to write a longer function or to break it apart
         * into multiple functions.
         *
         * ```js
         * // adds a rule that *synchronously* increments the Agent's "x" value
         * agent.addRule(function(agt) {
         *   agent.increment('x');
         * });
         *
         * // adds a rule that *asynchronously* increments the Agent's "x" value
         * agent.addRule(function(agt) {
         *   return {
         *     x: agt.get('x') + 1
         *   };
         * });
         * ```
         *
         * @deprecated since version 0.5.14
         * @since 0.0.5
         */
        Agent.prototype.addRule = function (rule) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            warnOnce1("As of Flocc v0.5.14, Agent.addRule is **DEPRECATED**. It will be **REMOVED** in v0.7.0. Instead, add the Agent's update rule by calling `Agent.set('tick', ...);`");
            this.rules.push({
                args: args,
                rule: rule
            });
        };
        /**
         * Like {@linkcode Agent.addRule}, this method is deprecated and the
         * recommended way is to now call
         * `agent.set('queue', function(agt) { ... });`
         *
         * Calling this method enqueues a function to be executed
         * *asynchronously* (at the end of the {@linkcode Environment}'s tick cycle).
         * This is useful if a 'cleanup pass' should be performed between
         * time steps to adjust `Agent` data.
         *
         * Below, the `Agent` sets its `"x"` value to `30` whenever it is
         * activated during the `Environment`'s tick cycle. After all of that
         * cycle's `Agent`s have been activated, this `Agent` sets its `"x"`
         * value to `20`. So if any other `Agent` references its `"x"` value
         * during a tick cycle after it has been activated, it will return `30`,
         * but in between tick cycles it will return `20`.
         *
         * ```js
         * agent.addRule(agt => {
         *   agt.set("x", 30);
         *   agt.enqueue(a => {
         *     a.set("x", 20);
         *   });
         * });
         * ```
         *
         * Any additional parameters passed to the enqueued function will
         * be remembered and passed through when the function is executed.
         *
         * @deprecated since version 0.5.14
         * @since 0.0.5
         */
        Agent.prototype.enqueue = function (rule) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            warnOnce2("As of Flocc v0.5.14, Agent.enqueue is **DEPRECATED**. It will be **REMOVED** in v0.7.0. Instead, add a rule to be executed at the end of this tick by calling `Agent.set('queue', ...);`");
            this.queue.push({
                args: args,
                rule: rule
            });
        };
        /**
         * From a RuleObj, execute a single rule (function or structured Rule).
         * @hidden
         */
        Agent.prototype.executeRule = function (ruleObj) {
            var rule = ruleObj.rule, args = ruleObj.args;
            if (rule instanceof Rule) {
                rule.call(this);
                return {};
            }
            else {
                var data = rule.apply(void 0, __spreadArrays([this], args));
                return data || {};
            }
        };
        /**
         * Execute all rules.
         * @hidden
         */
        Agent.prototype.executeRules = function () {
            var _this = this;
            var tick = this.data.tick;
            if (tick && (typeof tick === "function" || tick instanceof Rule)) {
                Object.assign(this.__newData, this.executeRule({
                    rule: tick,
                    args: []
                }));
            }
            this.rules.forEach(function (ruleObj) {
                Object.assign(_this.__newData, _this.executeRule(ruleObj));
            });
        };
        /**
         * Execute all enqueued rules.
         * @hidden
         */
        Agent.prototype.executeEnqueuedRules = function () {
            // if new data from the rules
            // exists, set it
            this.set(this.__newData);
            this.__newData = {};
            var queue = this.data.queue;
            if (queue && (typeof queue === "function" || queue instanceof Rule)) {
                var data = this.executeRule({
                    rule: queue,
                    args: []
                });
                if (data)
                    this.set(data);
                // remove once done
                delete this.data.queue;
            }
            // run through the queue and remove once done
            while (this.queue.length > 0) {
                var ruleObj = this.queue.shift();
                var data = this.executeRule(ruleObj);
                if (data)
                    this.set(data);
            }
        };
        return Agent;
    }());

    /**
     * Return the mean value from an array of numbers.
     *
     * ```js
     * mean([1, 2, 3]); // returns 2
     * mean([10]); // returns 10
     *
     * mean([]); // returns null for empty arrays
     * ```
     *
     * @since 0.0.16
     */
    function mean(arr) {
        if (arr.length === 0)
            return null;
        return sum(arr) / arr.length;
    }

    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     * (This is lodash's implementation).
     *
     * @param {Array} array The array to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @since 0.0.7
     */
    function shuffle(array) {
        var length = array ? array.length : 0;
        if (!length)
            return [];
        var index = -1;
        var lastIndex = length - 1;
        var result = copyArray(array);
        while (++index < length) {
            var rand = index + random(0, lastIndex - index);
            var value = result[rand];
            result[rand] = result[index];
            result[index] = value;
        }
        return result;
    }

    /**
     * @hidden
     * @since 0.3.11
     */
    var NumArray = /** @class */ (function () {
        function NumArray() {
            this.data = new Float32Array(1);
            this._index = 0;
        }
        Object.defineProperty(NumArray.prototype, "length", {
            get: function () {
                return this._index;
            },
            enumerable: false,
            configurable: true
        });
        NumArray.prototype.set = function (i, n) {
            if (i < 0)
                throw new Error("Can't set negative index of array!");
            while (i >= this.data.length)
                this.resize();
            this.data[i] = n;
            if (i > this._index)
                this._index = i + 1;
        };
        NumArray.prototype.get = function (i) {
            if (i >= this._index || i < 0)
                return null;
            return this.data[i];
        };
        NumArray.prototype.push = function (n) {
            if (this._index >= this.data.length)
                this.resize();
            this.data[++this._index] = n;
        };
        NumArray.prototype.resize = function () {
            var data = this.data;
            var newArr = new Float32Array(2 * data.length);
            for (var i = 0; i < data.length; i++) {
                newArr[i] = data[i];
            }
            this.data = newArr;
        };
        return NumArray;
    }());

    var Array2D = /** @class */ (function () {
        function Array2D(width, height) {
            this.data = new NumArray();
            this.width = width;
            this.height = height;
        }
        Array2D.prototype.set = function (x, y, n) {
            var index = x + this.width * y;
            this.data.set(index, n);
        };
        Array2D.prototype.get = function (x, y) {
            var index = x + this.width * y;
            return this.data.get(index);
        };
        return Array2D;
    }());

    /**
     * A `Network` allows {@linkcode Agent}s to be connected to each other.
     * @since 0.1.3
     */
    var Network = /** @class */ (function () {
        function Network() {
            /** @hidden */
            this.adjacencyList = new Map();
            /**
             * instantiated and updated in _resetAdjacencyMatrix
             * @hidden
             */
            this.adjacencyMatrix = null;
            /**
             * An array of the {@linkcode Agent}s in this `Network`
             * (in the order they were added).
             */
            this.agents = [];
        }
        /**
         * Add an agent to the network.
         * @returns Returns `true` if the `Agent` was successfully added, `false` otherwise.
         *
         * ```js
         * const a = new Agent();
         * network.addAgent(a); // returns true
         * network.addAgent(a); // returns false since `a` was already in the `Network`
         * ```
         * @since 0.1.3
         */
        Network.prototype.addAgent = function (agent) {
            if (!this.isInNetwork(agent)) {
                this.adjacencyList.set(agent, []);
                this.agents.push(agent);
                this._resetAdjacencyMatrix();
                return true;
            }
            return false;
        };
        /**
         * Given an {@linkcode Environment}, add all the {@linkcode Agent}s in that `Environment`
         * to this `Network`. (This is a shortcut for calling `environment.getAgents().forEach(a => network.addAgent(a)));`)
         * @since 0.2.1
         */
        Network.prototype.addFromEnvironment = function (environment) {
            var _this = this;
            environment.getAgents().forEach(function (agent) { return _this.addAgent(agent); });
        };
        /**
         * Removes an {@linkcode Agent} from the `Network`.
         *
         * ```js
         * const a = new Agent();
         * network.addAgent(a);
         *
         * network.removeAgent(a); // returns true
         *
         * network.removeAgent(a); // returns false since `a` was no longer in the `Network`
         * ```
         *
         * @returns Returns `true` if the agent was successfully removed.
         *
         * Returns `false` if the agent was not in the network to begin with.
         * @since 0.1.3
         */
        Network.prototype.removeAgent = function (agent) {
            var _this = this;
            if (!this.isInNetwork(agent))
                return false;
            if (this.neighbors(agent)) {
                this.neighbors(agent).forEach(function (neighbor) {
                    _this.disconnect(agent, neighbor);
                });
            }
            this.adjacencyList.delete(agent);
            var idx = this.indexOf(agent);
            if (idx >= 0)
                this.agents.splice(idx, 1);
            this._resetAdjacencyMatrix();
            return true;
        };
        /**
         * Removes all {@linkcode Agent}s from the `Network`.
         *
         * ```js
         * const network = new Network();
         * network.addAgent(new Agent());
         * network.size(); // returns 1
         *
         * network.clear();
         * network.size(); // returns 0
         * ```
         *
         * @since 0.2.1
         */
        Network.prototype.clear = function () {
            while (this.agents.length > 0) {
                var a0 = this.agents[0];
                this.removeAgent(a0);
            }
        };
        /**
         * Attempts to create a connection between {@linkcode Agent}s `a` and `b`.
         * @returns Returns `true` if the connection was successfully created (i.e. if `a` and `b` were previously not connected and now are).
         *
         * ```js
         * const a = new Agent();
         * const b = new Agent();
         * network.addAgent(a);
         * network.addAgent(b);
         *
         * network.connect(a, b); // returns true
         *
         * network.connect(a, b); // returns false since they are now already connected
         *
         * const c = new Agent();
         * network.connect(a, c); // returns false since `c` is not in the `Network`
         * ```
         *
         * Returns `false` otherwise, for example if `a` and `b` are the same `Agent`, or if either is not in the `Network`.
         * @since 0.1.3
         */
        Network.prototype.connect = function (a, b) {
            if (a === b)
                return false;
            if (!this.isInNetwork(a) || !this.isInNetwork(b))
                return false;
            if (!this.areConnected(a, b)) {
                this.adjacencyList.get(a).push(b);
                this.adjacencyList.get(b).push(a);
                var i1 = this.indexOf(a);
                var i2 = this.indexOf(b);
                this.adjacencyMatrix.set(i1, i2, 1);
                this.adjacencyMatrix.set(i2, i1, 1);
                return true;
            }
            return false;
        };
        /**
         * @returns Returns `true` if {@linkcode Agent}s `a` and `b` are connected, `false` if they are not.
         *
         * ```js
         * network.connect(a, b);
         * network.areConnected(a, b); // returns true since they have been connected
         *
         * network.disconnect(a, b);
         * network.areConnected(a, b); // returns false since they have been disconnected
         * ```
         *
         * @since 0.1.3
         */
        Network.prototype.areConnected = function (a, b) {
            if (!this.isInNetwork(a) || !this.isInNetwork(b))
                return false;
            var i1 = this.indexOf(a);
            var i2 = this.indexOf(b);
            return (this.adjacencyMatrix.get(i1, i2) === 1 &&
                this.adjacencyMatrix.get(i2, i1) === 1);
        };
        /**
         * Attempts to sever the connection between {@linkcode Agent}s `a` and `b`.
         * @returns Returns `true` if the `Agent`s were successfully disconnected, `false` otherwise.
         *
         * ```js
         * const a = new Agent();
         * const b = new Agent();
         * network.addAgent(a);
         * network.addAgent(b);
         *
         * network.connect(a, b);
         * network.disconnect(a, b); // returns true since they were connected and are no longer
         *
         * network.disconnect(a, b); // returns false since they were already not connected
         * ```
         *
         * @since 0.1.3
         */
        Network.prototype.disconnect = function (a1, a2) {
            if (a1 === a2)
                return false;
            if (this.areConnected(a1, a2)) {
                var a1neighbors = this.adjacencyList.get(a1);
                var a2neighbors = this.adjacencyList.get(a2);
                a1neighbors.splice(a1neighbors.indexOf(a2), 1);
                a2neighbors.splice(a2neighbors.indexOf(a1), 1);
                var i1 = this.indexOf(a1);
                var i2 = this.indexOf(a2);
                this.adjacencyMatrix.set(i1, i2, 0);
                this.adjacencyMatrix.set(i2, i1, 0);
                return true;
            }
            return false;
        };
        /**
         * @returns Returns the number of {@linkcode Agent}s in the `Network`.
         *
         * ```js
         * const a = new Agent();
         * const b = new Agent();
         * const c = new Agent();
         * [a, b, c].forEach(agt => network.addAgent(agt));
         *
         * network.size(); // returns 3
         * ```
         *
         * @since 0.1.3
         */
        Network.prototype.size = function () {
            return this.agents.length;
        };
        /**
         * Loop over all the {@linkcode Agent}s in the `Network` (in the order they were added),
         * and invoke the `callback` function with the `Agent` and an index passed as parameters.
         * @since 0.1.3
         */
        Network.prototype.forEach = function (callback) {
            this.agents.forEach(callback);
        };
        /**
         * The same method as {@linkcode forEach}, but executes in random order.
         * @since 0.1.3
         */
        Network.prototype.forEachRand = function (callback) {
            shuffle(this.agents).forEach(callback);
        };
        /**
         * Returns `true` if the given {@linkcode Agent} is in the `Network`, `false` if it is not.
         * @since 0.1.3
         */
        Network.prototype.isInNetwork = function (agent) {
            return this.adjacencyList.has(agent);
        };
        /**
         * Returns the {@linkcode Agent} at index `i`, where `i = 0` is the first `Agent`
         * added to the `Network`, `i = 1` the second, etc.
         *
         * Negative indices are allowed, so `network.get(-1)` returns the `Agent` that was most recently
         * added to the `Network`, `-2` the second-most recent, etc.
         * @since 0.1.3
         */
        Network.prototype.get = function (i) {
            while (i < 0)
                i += this.size();
            while (i >= this.size())
                i -= this.size();
            return this.agents[i];
        };
        /**
         * Returns the index of the given {@linkcode Agent} in the {@linkcode agents} array.
         * @since 0.1.3
         */
        Network.prototype.indexOf = function (agent) {
            return this.agents.indexOf(agent);
        };
        /**
         * Returns an array of {@linkcode Agent}s that are connected to the given `Agent` (in no guaranteed order).
         *
         * Returns `null` if the given `Agent` is not in the `Network`.
         *
         * ```js
         * // suppose a, b, and c are connected
         * network.neighbors(a); // returns [b, c] (or [c, b])
         *
         * network.disconnect(a, c);
         * network.neighbors(a); // returns [b]
         * network.neighbors(c); // returns [b]
         * ```
         *
         * @since 0.1.3
         */
        Network.prototype.neighbors = function (agent) {
            if (!this.isInNetwork(agent))
                return null;
            return this.adjacencyList.get(agent);
        };
        /**
         * Draw a connection between every pair of {@linkcode Agent}s in the `Network`.
         * @since 0.1.3
         */
        Network.prototype.complete = function () {
            for (var i = 0; i < this.agents.length; i++) {
                for (var j = i + 1; j < this.agents.length; j++) {
                    this.connect(this.get(i), this.get(j));
                }
            }
        };
        /**
         * Internal helper function to reset the adjacencyMatrix.
         * This gets called when agents are added to or removed from the network.
         * @hidden
         */
        Network.prototype._resetAdjacencyMatrix = function () {
            var size = this.size();
            var newMatrix = new Array2D(size, size);
            // only copy values if there is already an adjacencyMatrix
            if (this.adjacencyMatrix !== null) {
                for (var y = 0; y < size; y++) {
                    for (var x = 0; x < size; x++) {
                        var connected = this.areConnected(this.get(x), this.get(y));
                        newMatrix.set(x, y, connected ? 1 : 0);
                    }
                }
            }
            this.adjacencyMatrix = newMatrix;
        };
        /**
         * Returns `true` if `Agent`s a, b, and c form a 'triplet' &mdash; if (at least) one of the three is connected to the other two. Returns `false` otherwise.
         * @since 0.5.17
         */
        Network.prototype.isTriplet = function (a, b, c) {
            if (a === b || a === c || b === c)
                return false;
            var connections = [
                this.areConnected(a, b),
                this.areConnected(a, c),
                this.areConnected(b, c)
            ].filter(function (v) { return v; }).length;
            return connections >= 2;
        };
        /**
         * Returns `true` if `Agent`s a, b, and c form a 'closed triplet' &mdash; if each of the three are connected to the other two. Returns `false` otherwise.
         * @since 0.5.17
         */
        Network.prototype.isClosedTriplet = function (a, b, c) {
            if (a === b || a === c || b === c)
                return false;
            var connections = [
                this.areConnected(a, b),
                this.areConnected(a, c),
                this.areConnected(b, c)
            ].filter(function (v) { return v; }).length;
            return connections === 3;
        };
        /** @hidden */
        Network.prototype._globalClusteringCoefficient = function () {
            var _this = this;
            var triplets = 0;
            var closedTriplets = 0;
            this.forEach(function (agent, i) {
                var neighbors = _this.neighbors(agent);
                if (neighbors.length < 2)
                    return;
                for (var j = 0; j < neighbors.length - 1; j++) {
                    for (var k = 1; k < neighbors.length; k++) {
                        var _a = [neighbors[j], neighbors[k]], b = _a[0], c = _a[1];
                        if (_this.isTriplet(agent, b, c))
                            triplets++;
                        if (_this.isClosedTriplet(agent, b, c))
                            closedTriplets++;
                    }
                }
            });
            return closedTriplets / triplets;
        };
        /**
         * The {@link https://en.wikipedia.org/wiki/Clustering_coefficient | clustering coefficient} is a measure of how
         * closely connected either an individual {@linkcode Agent}'s connections are or the `Network` as a whole is.
         *
         * If an `Agent` is passed as the single parameter, returns the {@link https://en.wikipedia.org/wiki/Clustering_coefficient#Local_clustering_coefficient | local
         * clustering coefficient} for that `Agent`.
         *
         * If no parameter is passed, returns the {@link https://en.wikipedia.org/wiki/Clustering_coefficient#Global_clustering_coefficient | global clustering coefficient}
         * of the `Network` (an aggregate measure of how connected the `Agent`s are).
         *
         * @since 0.5.17
         */
        Network.prototype.clusteringCoefficient = function (agent) {
            if (!agent)
                return this._globalClusteringCoefficient();
            if (agent && !this.isInNetwork(agent))
                return null;
            var neighbors = this.neighbors(agent);
            if (neighbors.length < 2)
                return null;
            var k = neighbors.length;
            var clusterConnections = 0;
            for (var i = 0; i < k - 1; i++) {
                var a = neighbors[i];
                for (var j = i + 1; j < k; j++) {
                    var b = neighbors[j];
                    if (this.areConnected(a, b))
                        clusterConnections++;
                }
            }
            return (2 * clusterConnections) / (k * (k - 1));
        };
        /**
         * Returns the {@link https://en.wikipedia.org/wiki/Clustering_coefficient#Network_average_clustering_coefficient | average clustering coefficient} for the `Network` (the average
         * of the {@link Network.clusteringCoefficient | local clustering coefficient} across all `Agent`s).
         *
         * Note that this is a different measurement from the _global_ clustering coefficient
         * (i.e. calling {@linkcode clusteringCoefficient} without any parameters).
         * @since 0.5.17
         */
        Network.prototype.averageClusteringCoefficient = function () {
            var _this = this;
            // get clusteringCoefficients for all agents,
            // removing null values (those with too few neighbors)
            var coefficients = this.agents
                .map(function (a) { return _this.clusteringCoefficient(a); })
                .filter(function (v) { return v !== null; });
            return mean(coefficients);
        };
        return Network;
    }());

    /// <reference path="../types/Point.d.ts" />
    /**
     * @since 0.3.5
     */
    var BBox = /** @class */ (function () {
        function BBox(min, max) {
            this.min = min;
            this.max = max;
        }
        /**
         * @since 0.3.5
         */
        BBox.prototype.clone = function () {
            return new BBox(this.min.clone(), this.max.clone());
        };
        BBox.prototype.contains = function (p) {
            var _a = this, min = _a.min, max = _a.max;
            var dimension = Math.min(min.dimension, max.dimension);
            var x = (p instanceof Agent ? p.get("x") : p.x) || 0;
            var y = (p instanceof Agent ? p.get("y") : p.y) || 0;
            var z = (p instanceof Agent ? p.get("z") : p.z) || 0;
            if (dimension === 1) {
                return x >= this.min.x && x <= this.max.x;
            }
            else if (dimension === 2) {
                return (x >= this.min.x && x <= this.max.x && y >= this.min.y && y <= this.max.y);
            }
            else if (dimension === 3) {
                return (x >= this.min.x &&
                    x <= this.max.x &&
                    y >= this.min.y &&
                    y <= this.max.y &&
                    z >= this.min.z &&
                    z <= this.max.z);
            }
            return false;
        };
        return BBox;
    }());

    /**
     * Return the minimum value from an array of numbers.
     *
     * ```js
     * min([1, 2, 3]); // returns 1
     * min([10]); // returns 10
     *
     * min([]); // returns null for empty arrays
     * ```
     * @since 0.2.0
     */
    function min(arr) {
        if (arr.length === 0)
            return null;
        return Math.min.apply(null, arr);
    }

    /**
     * Return the maximum value from an array of numbers.
     *
     * ```js
     * max([1, 2, 3]); // returns 3
     * max([10]); // returns 10
     *
     * max([]); // returns null for empty arrays
     * ```
     *
     * @since 0.2.0
     */
    function max(arr) {
        if (arr.length === 0)
            return null;
        return Math.max.apply(null, arr);
    }

    /**
     * Return percentile value from an array of numbers. If a percentile falls
     * between discrete values of the array, linearly interpolates between those values
     * (https://en.wikipedia.org/wiki/Percentile#The_linear_interpolation_between_closest_ranks_method)
     * @param {number[]} arr - Array of numbers
     * @param {number} n - Percentile value (between 0 and 1 inclusive)
     * @since 0.3.14
     */
    function percentile(arr, n) {
        if (arr.length === 0)
            return null;
        if (arr.length === 1)
            return arr[0];
        if (n === 0)
            return min(arr);
        if (n === 1)
            return max(arr);
        var copy = copyArray(arr);
        var len = copy.length - 1;
        copy.sort(function (a, b) { return (a < b ? -1 : 1); });
        var nl = n * len;
        var i = nl | 0;
        // if n is close enough to the index of an element in the array
        // (i.e. 90th percentile with 100 elements), return that element
        var isEven = Math.abs(nl - i) <= 0.001;
        if (isEven)
            return copy[i];
        // if n falls between element indices, then interpolate
        var interp = nl - i;
        return lerp(copy[i], copy[i + 1], interp);
    }

    /**
     * Return the mean value from an array of numbers.
     *
     * ```js
     * median([1, 2, 3]); // returns 2
     * median([10]); // returns 10
     * median([1, 2, 3, 4]); // returns 2.5 (the mean of the two median values)
     *
     * median([]); // returns null for empty arrays
     * ```
     *
     * @param {number[]} arr
     * @since 0.2.0
     */
    function median(arr) {
        return percentile(arr, 0.5);
    }

    function isMultipleSampleFunc(f) {
        return f([1]).length > 0;
    }
    var sample;
    /**
     * Gets a random element from `array`.
     * @param {Array} array
     * @param {number[]} [weights] - An array of numbers that determines how often one value of the array will be picked relative to others. Should be the same length as the given array.
     * @returns {*} Returns the random element.
     * @since 0.0.7
     */
    sample = function sample(array, weights) {
        var length = array ? array.length : 0;
        if (length === 0)
            return null;
        // if no weights given, return a random value
        if (!weights)
            return array[random(0, length - 1)];
        // Otherwise, use the `weights` array to tend toward certain values.
        // Normalize the weights array
        var sum = 0;
        var cumulativeWeights = weights.map(function (w) {
            var value = w + sum;
            sum += w;
            return value;
        });
        var r = uniform();
        for (var i = 0; i < array.length; i++) {
            if (r < cumulativeWeights[i] / sum)
                return array[i];
        }
        return null;
    };
    var sample$1 = sample;
    function destructivelySample(array, weights) {
        var length = array ? array.length : 0;
        if (length === 0)
            return null;
        // if no weights given, return a random value
        if (!weights) {
            var i = random(0, length - 1);
            var output = array[i];
            array.splice(i, 1);
            return output;
        }
        // Otherwise, use the `weights` array to tend toward certain values.
        // Normalize the weights array
        var sum = 0;
        var cumulativeWeights = weights.map(function (w) {
            var value = w + sum;
            sum += w;
            return value;
        });
        var r = uniform();
        for (var i = 0; i < array.length; i++) {
            if (r < cumulativeWeights[i] / sum) {
                var output = array[i];
                // remove item from array and weights
                array.splice(i, 1);
                weights.splice(i, 1);
                // return the value
                return output;
            }
        }
        return null;
    }
    /**
     * This is a factory function that returns a function that acts like `utils.sample`, except it can sample multiple values as an array. Like `utils.sample`, the returned function can also sample by weighted values.
     * @param {number} n - How many values the returned sample function should retrieve, when it is called.
     * @since 0.5.16
     */
    function sampler(n) {
        // return a function that always returns null
        if (n < 1)
            return function () { return null; };
        // if n = 1, it's just a standard sample
        if (n === 1)
            return sample;
        return function sampleFunc(array, weights) {
            var output = [];
            var clonedArray = copyArray(array);
            var clonedWeights = weights ? copyArray(weights) : null;
            do {
                var s = destructivelySample(clonedArray, clonedWeights);
                output.push(s);
            } while (output.length < n && clonedArray.length > 0);
            return output;
        };
    }

    /// <reference path="../types/Point.d.ts" />
    /**
     * Finds the distance between `p1` and `p2`.
     *
     * The inputs may be plain objects with `x`, `y`, and/or `z` keys, {@linkcode Vector}s,
     * or {@linkcode Agent}s with `x`, `y`, and/or `z` data.
     *
     * ```js
     * const a1 = new Agent();
     * const a2 = new Agent({ x: 3, y: 4 });
     * distance(a1, a2); // returns 5 (defaults to x = 0 and y = 0 for a1)
     *
     * const p1 = { x: 0, y: 2 };
     * const p2 = { x: 0, y: 4 };
     * distance(p1, p2); // returns 2
     * ```
     *
     * @since 0.0.10
     */
    function distance(p1, p2) {
        var x1 = (p1 instanceof Agent ? p1.get("x") : p1.x) || 0;
        var y1 = (p1 instanceof Agent ? p1.get("y") : p1.y) || 0;
        var z1 = (p1 instanceof Agent ? p1.get("z") : p1.z) || 0;
        var x2 = (p2 instanceof Agent ? p2.get("x") : p2.x) || 0;
        var y2 = (p2 instanceof Agent ? p2.get("y") : p2.y) || 0;
        var z2 = (p2 instanceof Agent ? p2.get("z") : p2.z) || 0;
        var dx = Math.abs(x2 - x1);
        var dy = Math.abs(y2 - y1);
        var dz = Math.abs(z2 - z1);
        // distance for toroidal environments
        if (p1 instanceof Agent &&
            p2 instanceof Agent &&
            p1.environment &&
            p2.environment &&
            p1.environment === p2.environment &&
            p1.environment.width &&
            p1.environment.height &&
            p1.environment.opts.torus) {
            var environment = p1.environment;
            var width = environment.width, height = environment.height;
            if (dx > width / 2)
                dx = width - dx;
            if (dy > height / 2)
                dy = height - dy;
        }
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    var MAX_IN_LEAF = 5;
    var getCoord = function (i) {
        return i === 0 ? "x" : i === 1 ? "y" : "z";
    };
    var arrayOfTreesToAgents = function (trees) {
        if (trees.length === 0)
            return [];
        return trees
            .map(function (tree) { return tree.agents; })
            .reduce(function (acc, agents) { return acc.concat(agents); });
    };
    /**
     * @since 0.3.5
     */
    var KDTree = /** @class */ (function () {
        function KDTree(agents, dimension, depth, bbox) {
            var _this = this;
            if (dimension === void 0) { dimension = 2; }
            if (depth === void 0) { depth = 0; }
            this.agents = null;
            this.depth = 0;
            this.dimension = 2;
            this.median = null;
            this.needsUpdating = false;
            this.parent = null;
            this.left = null;
            this.right = null;
            this.intersectsAlongDimension = function (pt, d, coord) {
                var c = pt instanceof Agent ? pt.get(coord) : pt[coord];
                var mn = _this.bbox.min[coord];
                var mx = _this.bbox.max[coord];
                if (c <= mn && c + d >= mn)
                    return true;
                if (c >= mx && c - d <= mx)
                    return true;
                if (c + d >= mn && c - d <= mx)
                    return true;
                if (pt instanceof Agent && pt.environment.opts.torus) {
                    var environment = pt.environment;
                    if (coord === "x" && c + d > environment.width)
                        return true;
                    if (coord === "x" && c - d < 0)
                        return true;
                    if (coord === "y" && c + d > environment.height)
                        return true;
                    if (coord === "y" && c - d < 0)
                        return true;
                }
                return false;
            };
            this.sphereIntersectsBBox = function (pt, d) {
                // needs to be true for every dimension
                switch (_this.dimension) {
                    case 1:
                        return _this.intersectsAlongDimension(pt, d, "x");
                    case 2:
                        return (_this.intersectsAlongDimension(pt, d, "x") &&
                            _this.intersectsAlongDimension(pt, d, "y"));
                    case 3:
                        return (_this.intersectsAlongDimension(pt, d, "x") &&
                            _this.intersectsAlongDimension(pt, d, "y") &&
                            _this.intersectsAlongDimension(pt, d, "z"));
                    default:
                        return false;
                }
            };
            this.depth = depth;
            this.dimension = dimension;
            this.bbox = bbox;
            // if not given a bounding box, instantiate to a 0-dimensional bbox
            // and update
            if (!this.bbox) {
                this.bbox = new BBox(new (Vector.bind.apply(Vector, __spreadArrays([void 0], new Array(this.dimension).fill(0))))(), new (Vector.bind.apply(Vector, __spreadArrays([void 0], new Array(this.dimension).fill(0))))());
                this.needsUpdating = true;
            }
            this.rebalance(agents);
        }
        KDTree.prototype.axis = function () {
            var _a = this, depth = _a.depth, dimension = _a.dimension;
            var axis = depth % dimension === 0
                ? "x"
                : depth % dimension === 1
                    ? "y"
                    : depth % dimension === 2
                        ? "z"
                        : null;
            return axis;
        };
        KDTree.prototype.locateSubtree = function (pt) {
            // create a position vector to correspond to the
            // given point or agent
            var position = new Vector();
            for (var i = 0; i < this.dimension; i++) {
                var coord = getCoord(i);
                var v = pt instanceof Agent ? pt.get(coord) : pt[coord];
                if (v < this.bbox.min[coord] || v > this.bbox.max[coord]) {
                    throw new Error("Can't locate subtree out of bounds!");
                }
                position.set(i, v);
            }
            if (this.left && position[this.axis()] < this.median) {
                return this.left.locateSubtree(pt);
            }
            else if (this.right && position[this.axis()] >= this.median) {
                return this.right.locateSubtree(pt);
            }
            return this;
        };
        KDTree.prototype.subtreesWithinDistance = function (pt, d, trees) {
            if (trees === void 0) { trees = []; }
            var _a = this, left = _a.left, right = _a.right;
            if (left)
                left.subtreesWithinDistance(pt, d, trees);
            if (right)
                right.subtreesWithinDistance(pt, d, trees);
            if (!left && !right && this.sphereIntersectsBBox(pt, d))
                trees.push(this);
            return trees;
        };
        /**
         * Return all the Agents in this KDTree that are within `d` distance
         * of the given Point or Agent `pt`.
         * @param {Point | Agent} pt
         * @param {number} d
         * @since 0.3.5
         */
        KDTree.prototype.agentsWithinDistance = function (pt, d) {
            var trees = this.subtreesWithinDistance(pt, d);
            return arrayOfTreesToAgents(trees).filter(function (a) { return a !== pt && distance(a, pt) <= d; });
        };
        /**
         * Returns the Agent in this KDTree that is closest spatially to the
         * given Point or Agent `pt`.
         * @param {Point | Agent} pt
         * @since 0.3.5
         */
        KDTree.prototype.nearestNeighbor = function (pt) {
            // locate the subtree this point is in
            var candidates = this.locateSubtree(pt).agents.filter(function (a) { return a !== pt; });
            // get the distance of the nearest candidate agent in this subtree
            var nearestDistance = min(candidates.map(function (a) { return distance(a, pt); }));
            var trees;
            // if there are no other candidates, then slowly expand the circle outward
            // from this agent until we hit at least one
            var testDistance = 0.001;
            while (nearestDistance === Infinity) {
                trees = this.subtreesWithinDistance(pt, testDistance);
                candidates = arrayOfTreesToAgents(trees).filter(function (a) { return a !== pt; });
                nearestDistance = min(candidates.map(function (a) { return distance(a, pt); }));
                testDistance *= 3;
            }
            // get all subtrees that could contain agents
            // within `nearestDistance` radius
            trees = this.subtreesWithinDistance(pt, nearestDistance);
            candidates = arrayOfTreesToAgents(trees).filter(function (a) { return a !== pt; });
            // sort by distance
            candidates.sort(function (a, b) {
                return distance(a, pt) < distance(b, pt) ? -1 : 1;
            });
            return candidates[0];
        };
        /**
         * Rebalance the KDTree (if it has been marked as needing updating).
         * Optionally pass the agents that belong to this tree (relevant for trees
         * of higher depth than the top level).
         * @param {Agent[]} agents
         * @since 0.3.5
         */
        KDTree.prototype.rebalance = function (agents) {
            var _this = this;
            if (agents === void 0) { agents = this.agents; }
            // only rebalance if the tree has been marked as needing updating.
            // otherwise, recursively rebalance left and right subtrees
            if (!this.needsUpdating) {
                if (this.left)
                    this.left.rebalance();
                if (this.right)
                    this.right.rebalance();
                return;
            }
            // if not given a set of agents against which to rebalance,
            // use the agents that are currently tracked in this tree
            if (agents) {
                this.agents = Array.from(agents);
            }
            else {
                agents = this.agents;
            }
            if (!agents || agents.length <= MAX_IN_LEAF)
                return;
            var axis = this.axis();
            if (axis === null) {
                console.error("Can only construct 1, 2, or 3-dimensional KD trees");
            }
            this.median = median(new Array(Math.min(agents.length, 11))
                .fill(0)
                .map(function () { return sample$1(agents).get(axis); }));
            if (this.median === null)
                return;
            var left = new KDTree([], this.dimension, this.depth + 1);
            var right = new KDTree([], this.dimension, this.depth + 1);
            agents.forEach(function (agent) {
                for (var i = 0; i < _this.dimension; i++) {
                    var coord = getCoord(i);
                    if (agent.get(coord) < _this.bbox.min[coord])
                        _this.bbox.min[coord] = agent.get(coord);
                    if (agent.get(coord) > _this.bbox.max[coord])
                        _this.bbox.max[coord] = agent.get(coord);
                }
                if (agent.get(axis) < _this.median) {
                    left.agents.push(agent);
                    agent.__subtree = left;
                }
                else {
                    right.agents.push(agent);
                    agent.__subtree = right;
                }
            });
            this.needsUpdating = false;
            // if somehow either left or right has 0 agents in it, we might enter an
            // infinite loop, so in that case set the agents
            // to belong to this subtree and shortcut out
            if (left.agents.length === 0 || right.agents.length === 0) {
                agents.forEach(function (a) { return (a.__subtree = _this); });
                return;
            }
            if (left.agents.length > 0) {
                this.left = left;
                var leftBBox = this.bbox.clone();
                if (axis === "x")
                    leftBBox.max.x = this.median;
                if (axis === "y")
                    leftBBox.max.y = this.median;
                if (axis === "z")
                    leftBBox.max.z = this.median;
                left.bbox = leftBBox;
                left.parent = this;
                left.rebalance();
            }
            if (right.agents.length > 0) {
                this.right = right;
                var rightBBox = this.bbox.clone();
                if (axis === "x")
                    rightBBox.min.x = this.median;
                if (axis === "y")
                    rightBBox.min.y = this.median;
                if (axis === "z")
                    rightBBox.min.z = this.median;
                right.bbox = rightBBox;
                right.parent = this;
                right.rebalance();
            }
        };
        KDTree.prototype.removeAgent = function (agent, rebalance) {
            if (rebalance === void 0) { rebalance = true; }
            if (!this.agents.includes(agent))
                return false;
            this.agents.splice(this.agents.indexOf(agent), 1);
            this.needsUpdating = true;
            if (rebalance)
                this.rebalance();
        };
        return KDTree;
    }());

    /**
     * Finds the {@link https://en.wikipedia.org/wiki/Greatest_common_divisor | greatest common divisor} of `a` and `b`.
     *
     * ```js
     * gcd(7, 13); // returns 1
     * gcd(9, 15); // returns 3
     * gcd(12, 24); // returns 12
     * ```
     *
     * @since 0.4.5
     */
    function gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        if (b > a) {
            var temp = a;
            a = b;
            b = temp;
        }
        while (true) {
            if (b === 0)
                return a;
            a %= b;
            if (a === 0)
                return b;
            b %= a;
        }
    }

    function primeFactorization(n) {
        var factors = [];
        for (var i = 2; i <= Math.sqrt(n); i++) {
            while (n % i === 0) {
                factors.push(i);
                n /= i;
            }
        }
        return factors.concat(n);
    }
    /**
     * Per the Hull–Dobell Theorem, this should iterate pseudo-randomly over
     * the range [0...m) with period = m
     * @since 0.4.8
     */
    function series(m) {
        var c, factors, a, seed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    do {
                        c = random(1, m - 1);
                    } while (gcd(m, c) > 1);
                    factors = primeFactorization(m);
                    a = factors.reduce(function (acc, cur) {
                        // 3. `a - 1` is divisible by 4 if m is divisible by 4
                        if (acc === 2 && cur === 2)
                            return 4;
                        return acc % cur === 0 ? acc : acc * cur;
                    }, 1) + 1;
                    seed = random(0, m - 1);
                    _a.label = 1;
                case 1:
                    return [4 /*yield*/, seed];
                case 2:
                    _a.sent();
                    seed = (a * seed + c) % m;
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    }

    var defaultTerrainOptions = {
        async: false,
        grayscale: false,
        scale: 1
    };
    var BLACK = { r: 0, g: 0, b: 0, a: 255 };
    var WHITE = { r: 255, g: 255, b: 255, a: 255 };
    var RED = { r: 255, g: 0, b: 0, a: 255 };
    var MAROON = { r: 127, g: 0, b: 0, a: 255 };
    var YELLOW = { r: 255, g: 255, b: 0, a: 255 };
    var BLUE = { r: 0, g: 0, b: 255, a: 255 };
    var GREEN = { r: 0, g: 127, b: 0, a: 255 };
    var LIME = { r: 0, g: 255, b: 0, a: 255 };
    var AQUA = { r: 0, g: 255, b: 255, a: 255 };
    var ORANGE = { r: 255, g: 165, b: 0, a: 255 };
    var FUCHSIA = { r: 255, g: 0, b: 255, a: 255 };
    var PURPLE = { r: 127, g: 0, b: 127, a: 255 };
    /**
     * Each static member of the `Colors` class (e.g. `Colors.GREEN`, `Colors.RED`) is a pixel-like object with `r`, `g`, `b`, and `a` values that range from `0` to `255`.
     * @since 0.4.0
     */
    var Colors = /** @class */ (function () {
        function Colors() {
        }
        /** <div style="width: 100%; height: 20px; background-color: rgb(0, 0, 0);"></div> */
        Colors.BLACK = BLACK;
        /** <div style="width: 100%; height: 20px; background-color: rgb(255, 255, 255); border: 1px solid #eee;"></div> */
        Colors.WHITE = WHITE;
        /** <div style="width: 100%; height: 20px; background-color: rgb(255, 0, 0);"></div> */
        Colors.RED = RED;
        /** <div style="width: 100%; height: 20px; background-color: rgb(127, 0, 0);"></div> */
        Colors.MAROON = MAROON;
        /** <div style="width: 100%; height: 20px; background-color: rgb(255,255, 0);"></div> */
        Colors.YELLOW = YELLOW;
        /** <div style="width: 100%; height: 20px; background-color: rgb(0, 0, 255);"></div> */
        Colors.BLUE = BLUE;
        /** <div style="width: 100%; height: 20px; background-color: rgb(0, 127, 0);"></div> */
        Colors.GREEN = GREEN;
        /** <div style="width: 100%; height: 20px; background-color: rgb(0, 255, 0);"></div> */
        Colors.LIME = LIME;
        /** <div style="width: 100%; height: 20px; background-color: rgb(0, 255, 255);"></div> */
        Colors.AQUA = AQUA;
        /** <div style="width: 100%; height: 20px; background-color: rgb(255, 165, 0);"></div> */
        Colors.ORANGE = ORANGE;
        /** <div style="width: 100%; height: 20px; background-color: rgb(255, 0, 255);"></div> */
        Colors.FUCHSIA = FUCHSIA;
        /** <div style="width: 100%; height: 20px; background-color: rgb(127, 0, 127);"></div> */
        Colors.PURPLE = PURPLE;
        return Colors;
    }());
    /**
     * The `Terrain` class lets {@linkcode Environment}s function as lattices upon which {@link https://en.wikipedia.org/wiki/Cellular_automaton | cellular automata} can grow. With a `Terrain`, {@linkcode Agent}s may not be necessary, since all the cells of a `Terrain` can follow update rules (similar to but simplified from `Agent`s).
     *
     * ### Usage
     *
     * ```js
     * const environment = new Environment();
     * const terrain = new Terrain(30, 30); // create a 30 x 30 Terrain
     * environment.use(terrain); // tell the Environment to 'use' this Terrain as a helper
     * ```
     *
     * @since 0.4.0
     */
    var Terrain = /** @class */ (function () {
        /**
         * Instantiate a new `Terrain` by passing its `width` and `height` as the first two parameters, and an optional configuration object as the third.
         *
         * ### Options
         *
         * - `async` (*boolean* = `false`) &mdash; Whether to run the `Terrain` in synchronous (`true`) or asynchronous (`mode`). Defaults to synchronous. Depending on the timing mode, {@link addRule | Terrain update rules} should be written differently.
         * - `grayscale` (*boolean* = `false`)
         *   - In **color mode** (the default), each cell of a `Terrain` is represented by a {@link Colors | pixel-like object} (an object with numeric keys `r`, `g`, `b`, and `a` ranging from 0-255).
         *   - In **grayscale mode**, each cell of a `Terrain` is represented by a single number ranging from 0 (black) to 255 (white).
         * - `scale` (*number* = `1`) &mdash; The size, in pixels, of each cell's width and height when the `Terrain` is rendered using a {@linkcode CanvasRenderer}. In the below screenshots, the `Terrain` on the left uses a scale of `1` while the one on the right uses a scale of `5`:
         *
         * <img alt="Terrain with scale = 1" style="width: 49%;" src="https://cms.flocc.network/wp-content/uploads/2020/04/terrain-1.png">
         * <img alt="Terrain with scale = 5" style="width: 49%;" src="https://cms.flocc.network/wp-content/uploads/2020/04/terrain-5.png">
         *
         * In addition to the above setup, you will need to {@link init | initialize} the `Terrain` and {@link addRule | add an update rule}.
         */
        function Terrain(width, height, options) {
            if (options === void 0) { options = defaultTerrainOptions; }
            this.width = width;
            this.height = height;
            this.opts = Object.assign({}, defaultTerrainOptions);
            this.opts = Object.assign(this.opts, options);
            var scale = this.opts.scale;
            var size = Math.pow(scale, 2) * width * height * 4;
            this.data = new Uint8ClampedArray(size);
            for (var i = 0; i < size; i += 4) {
                this.data[i] = 0;
                this.data[i + 1] = 0;
                this.data[i + 2] = 0;
                this.data[i + 3] = 255;
            }
            this.nextData = new Uint8ClampedArray(this.data);
        }
        /**
         * Initialize (or overwrite) all cell values. The rule you pass has the same signature
         * as {@linkcode addRule}, but should always return a value (either a number or {@linkcode Colors | pixel-like object}).
         *
         * ```js
         * // initializes cells randomly to either blue or red
         * terrain.init((x, y) => {
         *   return utils.uniform() > 0.5 ? Colors.BLUE : Colors.RED;
         * });
         * ```
         *
         * @since 0.4.0
         */
        Terrain.prototype.init = function (rule) {
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var result = rule(x, y);
                    if (!result)
                        result = this.sample(x, y);
                    if (typeof result === "number") {
                        if (this.opts.grayscale) {
                            this.set(x, y, result);
                        }
                        else {
                            this.set(x, y, result, result, result, result);
                        }
                    }
                    else {
                        var r = result.r, g = result.g, b = result.b, a = result.a;
                        this.set(x, y, r, g, b, a);
                    }
                }
            }
            this.nextData = new Uint8ClampedArray(this.data);
        };
        /**
         * Similar to adding behavior to {@linkcode Agent}s, this adds an update rule for the `Terrain`.
         * The function passed as the rule should be called with the parameters (`x`, `y`). In synchronous mode,
         * it should return a value that is the color of that cell on the next time step.
         *
         * ```js
         * // turns a cell red if the x-value is greater than 200,
         * // blue if the x-value is less than 100,
         * // and leaves it unchanged in between
         * terrain.addRule((x, y) => {
         *   if (x > 200) {
         *     return Colors.RED;
         *   } else if (x < 100) {
         *     return Colors.BLUE;
         *   }
         * });
         * ```
         *
         * For grayscale mode, functions passed to `addRule` should return a number instead of a {@linkcode Colors | pixel-like object}.
         *
         * In asynchronous mode, functions should use the {@linkcode set} method to update either this cell
         * or a different cell.
         *
         * ```js
         * // swaps the colors of this cell and the one five cells to the right
         * terrain.addRule((x, y) => {
         *   const here = terrain.sample(x, y);
         *   const there = terrain.sample(x + 5, y);
         *   terrain.set(x, y, there);
         *   terrain.set(x + 5, y, here);
         * });
         * ```
         *
         * @since 0.4.0
         */
        Terrain.prototype.addRule = function (rule) {
            this.rule = rule;
        };
        /**
         * Given a local path or remote URL to an image, load that image and set
         * `Terrain` data accordingly. This will scale the image to match the
         * dimensions of the terrain.
         *
         * A 2nd callback parameter fires once the image has been successfully loaded.
         *
         * ```js
         * const terrain = new Terrain(400, 400);
         * terrain.load("/path/to/local/image.jpg", function() {
         *   console.log("Image loaded successfully!");
         * });
         * ```
         *
         * @param {string} path - The path to or URL of the image
         * @param {Function} cb - The function to call once the image loads (takes no parameters)
         * @since 0.4.0
         */
        Terrain.prototype.load = function (path, callback) {
            var _this = this;
            var img = document.createElement("img");
            img.src = path;
            img.crossOrigin = "anonymous";
            img.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = _this.width;
                canvas.height = _this.height;
                canvas.getContext("2d").drawImage(img, 0, 0, _this.width, _this.height);
                var data = canvas
                    .getContext("2d")
                    .getImageData(0, 0, _this.width, _this.height).data;
                _this.data = data;
                if (callback)
                    callback();
            };
            img.onerror = function () {
                console.error("There was an error loading the image for the terrain. Check the path to the URL to make sure that it exists, \n  or consider saving a local copy to pull from the same origin: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors");
            };
        };
        /**
         * Get the pixel value at the coordinate (x, y). If in grayscale mode, this
         * returns a single number. Otherwise, it returns a pixel-like object { r: number,
         * g: number, b: number, a: number } representing the value of that coordinate.
         * @param {number} x - The x coordinate
         * @param {number} y - The y coordinate
         * @since 0.4.0
         */
        Terrain.prototype.sample = function (x, y) {
            var _a = this, data = _a.data, width = _a.width, height = _a.height, opts = _a.opts;
            var grayscale = opts.grayscale, scale = opts.scale;
            while (x < 0)
                x += width;
            while (x >= width)
                x -= width;
            while (y < 0)
                y += height;
            while (y >= height)
                y -= height;
            x = Math.round(x);
            y = Math.round(y);
            var i = 4 * scale * (x + width * y * scale);
            if (grayscale) {
                return data[i];
            }
            else {
                return {
                    r: data[i],
                    g: data[i + 1],
                    b: data[i + 2],
                    a: data[i + 3]
                };
            }
        };
        /**
         * Get the values of the neighbors of a cell within a certain radius.
         * Depending on the fourth parameter, retrieves either the {@link https://en.wikipedia.org/wiki/Von_Neumann_neighborhood | von Neumann neighborhood}
         * or the {@link https://en.wikipedia.org/wiki/Moore_neighborhood | Moore neighborhood}.
         *
         * ```js
         * // in grayscale mode:
         * terrain.neighbors(5, 5, 1); // returns [127, 100, 255, 255] (4 values)
         *
         * // in color mode:
         * terrain.neighbors(5, 5, 1, true);
         * // returns [{ r: 255, g: 0, b: 0, a: 255 }, { r: 127, ... }, ...] (8 values)
         * ```
         *
         * @param moore - Defaults to using the von Neumann neighborhood.
         * @returns Either an array of numbers (grayscale mode) or {@link Colors | pixel-like objects} (color mode).
         * @since 0.4.0
         */
        Terrain.prototype.neighbors = function (x, y, radius, moore) {
            if (radius === void 0) { radius = 1; }
            if (moore === void 0) { moore = false; }
            var neighbors = [];
            if (radius < 1)
                return neighbors;
            for (var ny = -radius; ny <= radius; ny++) {
                for (var nx = -radius; nx <= radius; nx++) {
                    // always exclude self
                    if (nx === 0 && ny === 0)
                        continue;
                    var manhattan = Math.abs(ny) + Math.abs(nx);
                    if (moore || manhattan <= radius) {
                        neighbors.push(this.sample(x + nx, y + ny));
                    }
                }
            }
            return neighbors;
        };
        /** @hidden */
        Terrain.prototype._setAbstract = function (data, x, y, r, g, b, a) {
            var _a = this, width = _a.width, height = _a.height, opts = _a.opts;
            var grayscale = opts.grayscale, scale = opts.scale;
            while (x < 0)
                x += width;
            while (x >= width)
                x -= width;
            while (y < 0)
                y += height;
            while (y >= height)
                y -= height;
            var i = 4 * scale * (x + y * width * scale);
            if (typeof r === "number") {
                for (var dy = 0; dy < scale; dy++) {
                    if (dy > 0)
                        i += 4 * scale * width;
                    for (var dx = 0; dx < scale; dx++) {
                        data[i + 4 * dx] = r;
                        data[i + 4 * dx + 1] = grayscale ? r : g === undefined ? r : g;
                        data[i + 4 * dx + 2] = grayscale ? r : b === undefined ? r : b;
                        data[i + 4 * dx + 3] = grayscale ? 255 : a === undefined ? 255 : a;
                    }
                }
            }
            else {
                for (var dy = 0; dy < scale; dy++) {
                    if (dy > 0)
                        i += 4 * scale * width;
                    for (var dx = 0; dx < scale; dx++) {
                        data[i + 4 * dx] = r.r;
                        data[i + 4 * dx + 1] = grayscale ? r.r : r.g;
                        data[i + 4 * dx + 2] = grayscale ? r.r : r.b;
                        data[i + 4 * dx + 3] = grayscale ? 255 : r.a;
                    }
                }
            }
        };
        /**
         * Set new pixel data at a coordinate on the terrain. Only call this directly if
         * in async mode — otherwise you should return the new value from the update rule
         * (see Terrain.addRule).
         * @param {number} x - The x coordinate
         * @param {number} y - The y coordinate
         * @param {number | Pixel} r - A number 0-255 (if in grayscale mode or setting a single value for r/g/b), or a pixel-like object
         * @param {number=} g - The green value 0-255
         * @param {number=} b - The blue value 0-255
         * @param {number=} a - The alpha/transparency value 0-255
         * @since 0.4.0
         */
        Terrain.prototype.set = function (x, y, r, g, b, a) {
            this._setAbstract(this.data, x, y, r, g, b, a);
        };
        /** @hidden */
        Terrain.prototype._setNext = function (x, y, r, g, b, a) {
            this._setAbstract(this.nextData, x, y, r, g, b, a);
        };
        /** @hidden */
        Terrain.prototype._execute = function (x, y) {
            var _a = this, rule = _a.rule, opts = _a.opts;
            var async = opts.async;
            var result = rule(x, y);
            if (async)
                return;
            // in synchronous mode, set result to this pixel if there was no return value
            if (!result && result !== 0)
                result = this.sample(x, y);
            // update on nextData
            this._setNext(x, y, result);
        };
        /** @hidden */
        Terrain.prototype._loop = function (_a) {
            var _b = _a.randomizeOrder, randomizeOrder = _b === void 0 ? false : _b;
            var _c = this, rule = _c.rule, width = _c.width, height = _c.height, opts = _c.opts;
            var async = opts.async;
            if (!rule)
                return;
            if (randomizeOrder) {
                var generator = series(width * height);
                for (var i = 0; i < width * height; i++) {
                    var index = generator.next().value;
                    var x = index % width;
                    var y = (index / width) | 0;
                    this._execute(x, y);
                }
            }
            else {
                for (var y = 0; y < height; y++) {
                    for (var x = 0; x < width; x++) {
                        this._execute(x, y);
                    }
                }
            }
            // in synchronous mode, write the buffer to the data
            if (!async)
                this.data = new Uint8ClampedArray(this.nextData);
        };
        return Terrain;
    }());

    /**
     * Given a `number` and `min` and `max` values, restrict the number
     * to the range specified.
     *
     * ```js
     * clamp(5, 1, 10); // returns 5
     * clamp(5, 2, 4); // returns 4
     * clamp(0, -4, -3); // returns -3
     * ```
     *
     * @since 0.0.5
     */
    function clamp(x, min, max) {
        if (x < min)
            return min;
        if (x > max)
            return max;
        return x;
    }

    /**
     * Given a mean and standard deviation,
     * returns a value from a normal/Gaussian distribution.
     *
     * ```js
     * // returns values mostly between 5 and 15 (but sometimes lower or higher)
     * gaussian(10, 5);
     *
     * // no parameters defaults to mean = 0, std. dev. = 1
     * gaussian(); // mostly values between -1 and 1
     * ```
     *
     * @since 0.0.8
     */
    function gaussian(mean, sd) {
        if (mean === void 0) { mean = 0; }
        if (sd === void 0) { sd = 1; }
        var y, x1, x2, w;
        do {
            x1 = 2 * uniform() - 1;
            x2 = 2 * uniform() - 1;
            w = x1 * x1 + x2 * x2;
        } while (w >= 1);
        w = Math.sqrt((-2 * Math.log(w)) / w);
        y = x1 * w;
        return y * sd + mean;
    }

    /// <reference path="../types/Point.d.ts" />
    /**
     * Finds the {@link https://en.wikipedia.org/wiki/Taxicab_geometry | Manhattan distance} between `p1` and `p2`.
     *
     * The inputs may be plain objects with `x`, `y`, and/or `z` keys, {@linkcode Vector}s,
     * or {@linkcode Agent}s with `x`, `y`, and/or `z` data.
     *
     * ```js
     * const a1 = new Agent();
     * const a2 = new Agent({ x: 3, y: 4 });
     * manhattanDistance(a1, a2); // returns 7 (defaults to x = 0 and y = 0 for a1)
     *
     * const p1 = { x: 3, y: 2 };
     * const p2 = { x: 0, y: 4 };
     * manhattanDistance(p1, p2); // returns 5
     * ```
     *
     * @since 0.0.12
     */
    function manhattanDistance(p1, p2) {
        var x1 = (p1 instanceof Agent ? p1.get("x") : p1.x) || 0;
        var y1 = (p1 instanceof Agent ? p1.get("y") : p1.y) || 0;
        var z1 = (p1 instanceof Agent ? p1.get("z") : p1.z) || 0;
        var x2 = (p2 instanceof Agent ? p2.get("x") : p2.x) || 0;
        var y2 = (p2 instanceof Agent ? p2.get("y") : p2.y) || 0;
        var z2 = (p2 instanceof Agent ? p2.get("z") : p2.z) || 0;
        var dx = Math.abs(x2 - x1);
        var dy = Math.abs(y2 - y1);
        var dz = Math.abs(z2 - z1);
        // distance for toroidal environments
        if (p1 instanceof Agent &&
            p2 instanceof Agent &&
            p1.environment &&
            p2.environment &&
            p1.environment === p2.environment &&
            p1.environment.width &&
            p1.environment.height &&
            p1.environment.opts.torus) {
            var environment = p1.environment;
            var width = environment.width, height = environment.height;
            if (dx > width / 2)
                dx = width - dx;
            if (dy > height / 2)
                dy = height - dy;
        }
        return dx + dy + dz;
    }

    /**
     * Maps a number x, from the given domain aMin --> aMax,
     * onto the given range bMin --> bMax.
     * Ex: remap(5, 0, 10, 0, 100) => 50.
     * @param {number} x
     * @param {number} aMin
     * @param {number} aMax
     * @param {number} bMin
     * @param {number} bMax
     * @returns {number} The remapped value.
     * @since 0.0.5
     */
    function remap(x, aMin, aMax, bMin, bMax) {
        return bMin + ((bMax - bMin) * (x - aMin)) / (aMax - aMin);
    }

    /**
     * Seed a pseudo-random number generator with a value.
     * This can be used to produce predictable pseudo-random numbers.
     * When calling `utils.random`, `utils.sample`, or other functions
     * relying on randomness with the same initial seed, the values
     * generated will always be the same.
     *
     * Predictable randomness can be turned off by calling `seed(null)`, or reset
     * by calling `seed(value)` again with the initial value you used.
     * @param value
     * @since 0.5.0
     */
    var seed = function (value) { return PRNG.seed(value); };

    /**
     * Find the standard deviation of an Array of numbers.
     * @param {Array<number>} arr
     * @returns {number}
     * @since 0.0.16
     */
    function stdDev(arr) {
        if (arr.length === 0)
            return null;
        var ave = mean(arr);
        return Math.sqrt(mean(arr.map(function (x) { return (x - ave) * (x - ave); })));
    }

    /**
     * @since 0.1.4
     */
    function zfill(str, width) {
        if (width === void 0) { width = 0; }
        var output = str;
        while (output.length < width)
            output = "0" + output;
        return output;
    }



    var utils = /*#__PURE__*/Object.freeze({
        __proto__: null,
        clamp: clamp,
        distance: distance,
        gaussian: gaussian,
        gcd: gcd,
        manhattanDistance: manhattanDistance,
        lerp: lerp,
        remap: remap,
        random: random,
        sample: sample$1,
        sampler: sampler,
        seed: seed,
        series: series,
        shuffle: shuffle,
        sum: sum,
        max: max,
        mean: mean,
        median: median,
        min: min,
        percentile: percentile,
        stdDev: stdDev,
        uniform: uniform,
        uuid: uuid$1,
        zfill: zfill
    });

    var defaultTickOptions = {
        activation: "uniform",
        activationCount: 1,
        count: 1,
        randomizeOrder: false
    };
    var defaultEnvironmentOptions = {
        torus: true,
        height: 0,
        width: 0
    };
    var warnOnce = once(console.warn.bind(console));
    /**
     * An environment provides the space and time in which Agents interact.
     * Environments are themselves Agents, and can store data in key-value
     * pairs that can be manipulated just like Agent data.
     * @since 0.0.5
     */
    var Environment = /** @class */ (function (_super) {
        __extends(Environment, _super);
        /**
         * Although `Environment`s inherit {@linkcode Agent} methods
         * like {@linkcode Agent.set}, {@linkcode Agent.get}, etc. they have
         * a different `constructor` signature.
         *
         * Pass in predefined `Environment` options for:
         * - `torus` &mdash; Whether the `Environment` should wrap around in 2d space (with `Agent`s that move off the right reappearing on the left, off the top reappearing on the bottom, etc.)
         * - `width` &mdash; The width of the `Environment` (used when `torus = true`)
         * - `height` &mdash; The height of the `Environment` (used when `torus = true`)
         * @override
         */
        function Environment(opts) {
            if (opts === void 0) { opts = defaultEnvironmentOptions; }
            var _this = _super.call(this) || this;
            /** @hidden */
            _this.agents = [];
            /** @hidden */
            _this.agentsById = new Map();
            /** @hidden */
            _this.environment = null;
            /** @hidden */
            _this.cache = new Map();
            /** @hidden */
            _this.helpers = {
                kdtree: null,
                network: null,
                terrain: null
            };
            /**
             * An array of the renderers associated with this `Environment`.
             * An `Environment` can have multiple renderers, usually one to render
             * the {@linkcode Agent}s spatially and others for data visualization,
             * such as a {@linkcode LineChartRenderer}, {@linkcode Histogram}, etc.
             */
            _this.renderers = [];
            /**
             * This property will always equal the number of tick cycles that
             * have passed since the `Environment` was created. If you call
             * {@linkcode tick} so that it goes forward multiple time steps, it will
             * increase the `time` by that value (not by just `1`, even though
             * you only called `tick` once).
             *
             * ```js
             * const environment = new Environment();
             * environment.time; // returns 0
             *
             * environment.tick();
             * environment.time; // returns 1
             *
             * environment.tick(3);
             * environment.time; // returns 4
             * ```
             *
             * @since 0.1.4
             * */
            _this.time = 0;
            _this.opts = Object.assign({}, defaultEnvironmentOptions);
            _this.opts = Object.assign(_this.opts, opts);
            _this.width = _this.opts.width;
            _this.height = _this.opts.height;
            return _this;
        }
        /**
         * Add an {@linkcode Agent} to this `Environment`. Once this is called,
         * the `Agent`'s {@link Agent.environment | `environment`} property
         * will automatically be set to this `Environment`.
         * @param rebalance - Whether to rebalance if there is a `KDTree` (defaults to true)
         * @since 0.0.5
         */
        Environment.prototype.addAgent = function (agent, rebalance) {
            if (rebalance === void 0) { rebalance = true; }
            if (!(agent instanceof Agent))
                return;
            agent.environment = this;
            this.agents.push(agent);
            this.agentsById.set(agent.id, agent);
            if (this.helpers.kdtree) {
                this.helpers.kdtree.agents.push(agent);
                this.helpers.kdtree.needsUpdating = true;
                if (rebalance)
                    this.helpers.kdtree.rebalance();
            }
        };
        /**
         * Remove an agent from the environment.
         * @param {Agent} agent
         * @param {boolean} [rebalance] - Whether to rebalance if there is a KDTree (defaults to true)
         * @since 0.0.8
         */
        Environment.prototype.removeAgent = function (agent, rebalance) {
            if (rebalance === void 0) { rebalance = true; }
            agent.environment = null;
            var index = this.agents.indexOf(agent);
            this.agents.splice(index, 1);
            this.agentsById.delete(agent.id);
            if (this.helpers.kdtree) {
                this.helpers.kdtree.removeAgent(agent, rebalance);
            }
        };
        /**
         * Remove an agent from the environment by its ID.
         * @param {string} id
         * @since 0.1.3
         */
        Environment.prototype.removeAgentById = function (id) {
            var agent = this.getAgentById(id);
            if (!agent)
                return;
            this.removeAgent(agent);
        };
        /**
         * Get an array of all the agents in the environment.
         * @return {Agent[]}
         * @since 0.0.5
         */
        Environment.prototype.getAgents = function () {
            return this.agents;
        };
        /**
         * Get an agent in the environment by its ID.
         * @param {string} id
         * @returns {Agent|null}
         * @since 0.1.3
         */
        Environment.prototype.getAgentById = function (id) {
            return this.agentsById.get(id) || null;
        };
        /**
         * Remove all agents from the environment.
         * @since 0.1.3
         */
        Environment.prototype.clear = function () {
            while (this.getAgents().length > 0) {
                var a0 = this.getAgents()[0];
                this.removeAgent(a0);
            }
        };
        /**
         * From the parameter passed to {@linkcode Environment.tick}, get a structured TickOptions object.
         * @hidden
         */
        Environment.prototype._getTickOptions = function (opts) {
            var baseOpts = Object.assign({}, defaultTickOptions);
            if (typeof opts === "number") {
                baseOpts.count = opts;
            }
            else if (!!opts) {
                Object.assign(baseOpts, opts);
            }
            if (opts === undefined ||
                (typeof opts !== "number" && !opts.hasOwnProperty("randomizeOrder"))) {
                warnOnce("You called `environment.tick` without specifying a `randomizeOrder` option. Currently this defaults to `false` (i.e. each agent ticks in the order it was added to the environment). However, in **Flocc 0.6.0 this will default to `true`** — agent activation order will default to being randomized.");
            }
            return baseOpts;
        };
        /**
         * For all agents passed, execute agent rules
         * @hidden
         */
        Environment.prototype._executeAgentRules = function (agents) {
            agents.forEach(function (agent) { return agent === null || agent === void 0 ? void 0 : agent.executeRules(); });
        };
        /**
         * For all agents passed, execute enqueued agent rules
         * @hidden
         */
        Environment.prototype._executeEnqueuedAgentRules = function (agents) {
            agents.forEach(function (agent) { return agent === null || agent === void 0 ? void 0 : agent.executeEnqueuedRules(); });
        };
        /**
         * Runs the `Environment`s tick cycle. Depending on the parameters, one,
         * some, or all of the {@linkcode Agent}s in the `Environment`
         * might be activated, and all renderers associated with the
         * `Environment` will update. After the tick cycle finishes, any rules that were enqueued will be run and the `Environment`'s {@linkcode time} property will have incremented.
         *
         * ```js
         * environment.tick(); // ticks once
         *
         * // To run multiple tick cycles, you can pass a number
         * environment.tick(5); // ticks 5 times
         * ```
         *
         * Passing a configuration object (instead of a number) allows
         * you to have finer control over the tick cycle. The object can
         * have the following keys:
         * - `activation`: Either `"uniform"` or `"random"` (defaults to `"uniform"`).
         *   - `activation = "uniform"` &mdash; All `Agent`s in the `Environment` are activated with every tick cycle.
         *   - `activation = "random"` &mdash; One or more `Agent`s are randomly selected to be activated every tick cycle (see `activationCount` below).
         * - `activationCount`: For `"random"` activation, this many `Agent`s will be activated with each tick cycle. Defaults to `1`. If `activationCount` is greater than the number of `Agent`s in the `Environment`, then all the `Agent`s will be activated exactly once in random order.
         * - `count`: The number of tick cycles to run.
         * - `randomizeOrder`: When `activation = "uniform"`, if `randomizeOrder = true`, `Agent`s will be activated in random order, otherwise in the order they were added to the `Environment`. **This currently defaults to `false` but will default to `true` in v0.6.0.**
         *
         * ```js
         * // Ticks three times, activating 10 random agents with each tick cycle.
         * environment.tick({
         *   activation: "random",
         *   activationCount: 10,
         *   count: 3
         * });
         * ```
         *
         * @since 0.0.5
         */
        Environment.prototype.tick = function (opts) {
            var _a = this._getTickOptions(opts), activation = _a.activation, activationCount = _a.activationCount, count = _a.count, randomizeOrder = _a.randomizeOrder;
            // for uniform activation, every agent is always activated
            if (activation === "uniform") {
                var agentsInOrder = randomizeOrder ? shuffle(this.agents) : this.agents;
                this._executeAgentRules(agentsInOrder);
                this._executeEnqueuedAgentRules(agentsInOrder);
            }
            // for random activation, the number of agents activated
            // per tick is determined by the `activationCount` option
            else if (activation === "random") {
                if (activationCount === 1) {
                    var agent = sample$1(this.agents);
                    if (agent !== null) {
                        agent.executeRules();
                        agent.executeEnqueuedRules();
                    }
                }
                else if (activationCount > 1) {
                    var sampleCount = sampler(activationCount);
                    // this safety check should always return `true`
                    if (isMultipleSampleFunc(sampleCount)) {
                        var agents = sampleCount(this.getAgents());
                        this._executeAgentRules(agents);
                        this._executeEnqueuedAgentRules(agents);
                    }
                }
                else {
                    warnOnce("You passed a zero or negative `activationCount` to the Environment's tick options. No agents will be activated.");
                }
            }
            if (this.helpers.kdtree)
                this.helpers.kdtree.rebalance();
            var terrain = this.helpers.terrain;
            if (terrain && terrain.rule) {
                if (activation === "uniform") {
                    terrain._loop({ randomizeOrder: randomizeOrder });
                }
                else if (activation === "random") {
                    if (activationCount === 1) {
                        var x = random(0, terrain.width);
                        var y = random(0, terrain.height);
                        terrain._execute(x, y);
                    }
                    else if (activationCount > 1) {
                        var generator = series(terrain.width * terrain.height);
                        var indices = [];
                        while (indices.length < activationCount) {
                            var index = generator.next().value;
                            var x = index % terrain.width;
                            var y = (index / terrain.width) | 0;
                            terrain._execute(x, y);
                            indices.push(index);
                        }
                    }
                    // in synchronous mode, write the buffer to the data
                    if (!terrain.opts.async) {
                        terrain.data = new Uint8ClampedArray(terrain.nextData);
                    }
                }
            }
            this.time++;
            if (count > 1) {
                this.tick(count - 1);
                return;
            }
            this.renderers.forEach(function (r) { return r.render(); });
        };
        /**
         * Use a helper with this environment. A helper can be one of:
         * - {@linkcode KDTree}
         * - {@linkcode Network}
         * - {@linkcode Terrain}
         * @since 0.1.3
         */
        Environment.prototype.use = function (helper) {
            if (helper instanceof KDTree)
                this.helpers.kdtree = helper;
            if (helper instanceof Network)
                this.helpers.network = helper;
            if (helper instanceof Terrain)
                this.helpers.terrain = helper;
        };
        /**
         * Get an array of data associated with agents in the environment by key.
         * Calling `environment.stat('name')` is equivalent to calling
         * `environment.getAgents().map(agent => agent.get('name'));`
         *
         * By default, calling this will calculate the result at most once
         * per time cycle, and return the cached value on subsequent calls (until
         * the next time cycle, when it will recalculate).
         *
         * @param key - The key for which to retrieve data.
         * @param useCache - Whether or not to cache the result.
         * @returns Array of data associated with `agent.get(key)` across all agents.
         *
         * ```js
         * environment.addAgent(new Agent({ name: "Alice" }));
         * environment.addAgent(new Agent({ name: "Bob" }));
         * environment.addAgent(new Agent({ name: "Chaz" }));
         *
         * environment.stat('name'); // returns ['Alice', 'Bob', 'Chaz']
         * ```
         *
         * @since 0.3.14
         */
        Environment.prototype.stat = function (key, useCache) {
            var _this = this;
            if (useCache === void 0) { useCache = true; }
            var mapAndFilter = function () {
                var output = [];
                _this.getAgents().forEach(function (a) {
                    if (a.get(key) === null)
                        return;
                    output.push(a.get(key));
                });
                return output;
            };
            if (useCache)
                return this.memo(mapAndFilter, key);
            return mapAndFilter();
        };
        /**
         * Pass a function to cache and use the return value within the same environment tick.
         * @param fn - The function to memoize.
         * @return The return value of the function that was passed.
         * @since 0.3.14
         *
         * ```js
         * // Within the same time cycle, this function will only be called once.
         * // The cached value will be used on subsequent calls.
         * const blueAgents = environment.memo(() => {
         *   return environment.getAgents().filter(a => a.get('color') === 'blue');
         * });
         * ```
         */
        Environment.prototype.memo = function (fn, key) {
            var serialized = (key ? key + "-" : "") + fn.toString();
            var memoValue = this.cache.get(serialized);
            if (memoValue && this.time === memoValue.time)
                return memoValue.value;
            // if does not exist in cache or time has elapsed, cache new value
            var value = fn();
            var newMemoValue = { value: value, time: this.time };
            this.cache.set(serialized, newMemoValue);
            return value;
        };
        return Environment;
    }(Agent));

    /**
     * @since 0.0.14
     */
    var Cell = /** @class */ (function (_super) {
        __extends(Cell, _super);
        function Cell(x, y) {
            var _this = _super.call(this) || this;
            _this.set({ x: x, y: y });
            return _this;
        }
        return Cell;
    }(Agent));

    /// <reference path="../types/Point.d.ts" />
    var hash = function (x, y) {
        return x.toString() + "," + y.toString();
    };
    var unhash = function (str) {
        return {
            x: +str.split(",")[0],
            y: +str.split(",")[1]
        };
    };
    var warnOnce$1 = once(console.warn.bind(console));
    /**
     * A `GridEnvironment` is the **deprecated** version of a cellular automata.
     * It's now recommended that you use a standard {@linkcode Environment} with a
     * {@linkcode Terrain}. This class will be removed entirely in v0.6.0.
     *
     * In a `GridEnvironment` with an {@linkcode ASCIIRenderer}, {@linkcode Agent}s are rendered
     * using their `"value"` data (a single character).
     *
     * @deprecated since 0.4.0
     * @since 0.0.10
     */
    var GridEnvironment = /** @class */ (function (_super) {
        __extends(GridEnvironment, _super);
        /**
         * Create a `GridEnvironment` with the given `width` and `height`.
         */
        function GridEnvironment(width, height) {
            if (width === void 0) { width = 2; }
            if (height === void 0) { height = 2; }
            var _this = _super.call(this) || this;
            warnOnce$1("As of Flocc v0.5.0, GridEnvironment is **DEPRECATED**. It will be **REMOVED** in v0.6.0. The Terrain helper should be used for 2-dimensional grid-like data. Read more about Terrains here: https://flocc.network/docs/terrain");
            _this.height = height;
            _this.width = width;
            _this.cells = new Map();
            // store hashes of all possible cells internally
            _this._cellHashes = [];
            for (var y = 0; y < _this.height; y++) {
                for (var x = 0; x < _this.width; x++) {
                    var id = hash(x, y);
                    _this._cellHashes.push(id);
                    var cell = new Cell(x, y);
                    cell.environment = _this;
                    _this.cells.set(id, cell);
                }
            }
            return _this;
        }
        /**
         * Fill every cell of the grid with an agent
         * and set that agent's position to its x/y coordinate.
         * @since 0.0.5
         */
        GridEnvironment.prototype.fill = function () {
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    this.addAgentAt(x, y);
                }
            }
        };
        /**
         * @hidden
         * @since 0.1.0
         */
        GridEnvironment.prototype.normalize = function (x, y) {
            while (x < 0)
                x += this.width;
            while (x >= this.width)
                x -= this.width;
            while (y < 0)
                y += this.height;
            while (y >= this.height)
                y -= this.height;
            return { x: x, y: y };
        };
        /**
         * For `GridEnvironment`s, `addAgent` takes `x` and `y` values
         * and automatically adds a Agent to that cell coordinate.
         * @param {number} x_
         * @param {number} y_
         * @returns {Agent} The agent that was added at the specified coordinate.
         * @since 0.1.0
         */
        GridEnvironment.prototype.addAgentAt = function (x_, y_, agent) {
            if (x_ === void 0) { x_ = 0; }
            if (y_ === void 0) { y_ = 0; }
            if (agent === void 0) { agent = new Agent(); }
            var _a = this.normalize(x_, y_), x = _a.x, y = _a.y;
            var id = hash(x, y);
            var cell = this.cells.get(id);
            if (!cell)
                throw new Error("Can't add an Agent to a non-existent Cell!");
            // If there is already an agent at this location,
            // overwrite it. Remove the existing agent...
            if (cell.get("agent")) {
                this.removeAgentAt(x, y);
            }
            // ...and add a new one
            agent.set({ x: x, y: y });
            agent.environment = this;
            this.agents.push(agent);
            cell.set("agent", agent);
            return agent;
        };
        /**
         * For GridEnvironments, `removeAgentAt` takes `x` and `y` values
         * and removes the `Agent` (if there is one) at that cell coordinate.
         * @param {number} x_
         * @param {number} y_
         * @since 0.1.0
         */
        GridEnvironment.prototype.removeAgentAt = function (x_, y_) {
            if (x_ === void 0) { x_ = 0; }
            if (y_ === void 0) { y_ = 0; }
            var _a = this.normalize(x_, y_), x = _a.x, y = _a.y;
            var id = hash(x, y);
            var cell = this.cells.get(id);
            if (!cell)
                throw new Error("Can't remove an Agent from a non-existent Cell!");
            var agent = cell.get("agent");
            if (!agent)
                return;
            agent.environment = null;
            var indexAmongAgents = this.agents.indexOf(agent);
            this.agents.splice(indexAmongAgents, 1);
            cell.set("agent", null);
        };
        /**
         * Retrieve the cell at the specified coordinate.
         * @param {number} x_
         * @param {number} y_
         * @return {Cell}
         * @since 0.1.0
         */
        GridEnvironment.prototype.getCell = function (x_, y_) {
            var _a = this.normalize(x_, y_), x = _a.x, y = _a.y;
            var id = hash(x, y);
            return this.cells.get(id) || null;
        };
        /**
         * Get all cells of the environment, in a flat array.
         * @return {Cell[]}
         * @since 0.1.0
         */
        GridEnvironment.prototype.getCells = function () {
            return Array.from(this.cells.values());
        };
        /**
         * Retrieve the agent at the specified cell coordinate.
         * @param {number} x_
         * @param {number} y_
         * @return {null | Agent}
         * @since 0.1.0
         */
        GridEnvironment.prototype.getAgentAt = function (x_, y_) {
            var _a = this.normalize(x_, y_), x = _a.x, y = _a.y;
            var id = hash(x, y);
            var cell = this.cells.get(id);
            if (!cell)
                return null;
            return cell.get("agent") || null;
        };
        /**
         * `loop` is like `tick`, but the callback is invoked with every
         * cell coordinate, not every agent.
         *
         * The callback is invoked with arguments `x`, `y`, and `agent`
         * (if there is one at that cell coordinate).
         * @param {Function} callback
         * @since 0.0.5
         */
        GridEnvironment.prototype.loop = function (callback) {
            if (callback === void 0) { callback = function () { }; }
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    var agent = this.getAgentAt(x, y);
                    callback(x, y, agent);
                }
            }
        };
        /**
         * Given two pairs of cell coordinates, swap the agents at those cells.
         * If both are empty, nothing happens. If one is empty and the other has an agent,
         * this is equivalent to moving that agent to the new cell coordinate.
         * @param {number} x1_
         * @param {number} y1_
         * @param {number} x2_
         * @param {number} y2_
         * @since 0.0.7
         */
        GridEnvironment.prototype.swap = function (x1_, y1_, x2_, y2_) {
            var a = this.normalize(x1_, y1_);
            var x1 = a.x;
            var y1 = a.y;
            var b = this.normalize(x2_, y2_);
            var x2 = b.x;
            var y2 = b.y;
            var maybeAgent1 = this.getAgentAt(x1, y1);
            var maybeAgent2 = this.getAgentAt(x2, y2);
            if (maybeAgent1) {
                maybeAgent1.set({
                    x: x2,
                    y: y2
                });
            }
            if (maybeAgent2) {
                maybeAgent2.set({
                    x: x1,
                    y: y1
                });
            }
            var cell1 = this.cells.get(hash(x1, y1));
            var cell2 = this.cells.get(hash(x2, y2));
            if (cell1)
                cell1.set("agent", maybeAgent2);
            if (cell2)
                cell2.set("agent", maybeAgent1);
        };
        /**
         * Find a random open cell in the GridEnvironment.
         * @returns {Cell | null} The coordinate of the open cell.
         * @since 0.0.7
         */
        GridEnvironment.prototype.getRandomOpenCell = function () {
            // randomize order of cell hashes
            var hashes = shuffle(this._cellHashes);
            // keep looking for an empty one until we find it
            while (hashes.length > 0) {
                var id = hashes.pop();
                var cell = this.cells.get(id);
                var maybeAgent = cell ? cell.get("agent") : null;
                if (cell && !maybeAgent)
                    return cell;
            }
            // once there are no hashes left, that means that there are no open cells
            return null;
        };
        /**
         * Get the neighbors of an agent within a certain radius.
         * Depending on the third parameter, retrieves either the von Neumann neighborhood
         * (https://en.wikipedia.org/wiki/Von_Neumann_neighborhood) or the Moore neighborhood
         * (https://en.wikipedia.org/wiki/Moore_neighborhood).
         *
         * @param {Agent} agent - the agent whose neighbors to retrieve
         * @param {number} radius - how far to look for neighbors
         * @param {boolean} moore - whether to use the Moore neighborhood or von Neumann (defaults to von Neumann)
         * @since 0.1.4
         */
        GridEnvironment.prototype.neighbors = function (agent, radius, moore) {
            if (radius === void 0) { radius = 1; }
            if (moore === void 0) { moore = false; }
            var _a = agent.getData(), x = _a.x, y = _a.y;
            var neighbors = [];
            if (radius < 1)
                return neighbors;
            for (var ny = -radius; ny <= radius; ny++) {
                for (var nx = -radius; nx <= radius; nx++) {
                    if (nx === 0 && ny === 0)
                        continue;
                    var manhattan = Math.abs(ny) + Math.abs(nx);
                    if (moore || manhattan <= radius) {
                        neighbors.push(this.getAgentAt(x + nx, y + ny));
                    }
                }
            }
            return neighbors;
        };
        /**
         * Execute all cell rules.
         * @hidden
         * @param { boolean } randomizeOrder
         */
        GridEnvironment.prototype._executeCellRules = function (randomizeOrder) {
            var _this = this;
            if (randomizeOrder) {
                shuffle(this._cellHashes).forEach(function (hash) {
                    var _a = unhash(hash), x = _a.x, y = _a.y;
                    var cell = _this.getCell(x, y);
                    if (!cell)
                        return;
                    cell.executeRules();
                });
            }
            else {
                for (var y = 0; y < this.height; y++) {
                    for (var x = 0; x < this.width; x++) {
                        var cell = this.getCell(x, y);
                        if (!cell)
                            continue;
                        cell.executeRules();
                    }
                }
            }
        };
        /**
         * Execute all enqueued cell rules.
         * @hidden
         * @param { boolean } randomizeOrder
         */
        GridEnvironment.prototype._executeEnqueuedCellRules = function (randomizeOrder) {
            var _this = this;
            if (randomizeOrder) {
                shuffle(this._cellHashes).forEach(function (hash) {
                    var _a = unhash(hash), x = _a.x, y = _a.y;
                    var cell = _this.getCell(x, y);
                    if (!cell)
                        return;
                    cell.executeEnqueuedRules();
                });
            }
            else {
                for (var y = 0; y < this.height; y++) {
                    for (var x = 0; x < this.width; x++) {
                        var cell = this.getCell(x, y);
                        if (!cell)
                            continue;
                        cell.executeEnqueuedRules();
                    }
                }
            }
        };
        /**
         * Override/extend {@linkcode Environment.tick} to include the
         * `GridEnvironment`'s cells.
         * @override
         * @param {number} opts
         */
        GridEnvironment.prototype.tick = function (opts) {
            var _a = this._getTickOptions(opts), count = _a.count, randomizeOrder = _a.randomizeOrder;
            // execute all cell rules
            this._executeCellRules(randomizeOrder);
            // execute all agent rules
            this._executeAgentRules(randomizeOrder ? shuffle(this.agents) : this.agents);
            // execute all enqueued cell rules
            this._executeEnqueuedCellRules(randomizeOrder);
            // execute all enqueued agent rules
            this._executeEnqueuedAgentRules(randomizeOrder ? shuffle(this.agents) : this.agents);
            this.time++;
            if (count > 1) {
                this.tick(count - 1);
                return;
            }
            this.renderers.forEach(function (r) { return r.render(); });
        };
        return GridEnvironment;
    }(Environment));

    var AbstractRenderer = /** @class */ (function () {
        function AbstractRenderer() {
            /** @hidden */
            this.canvas = document.createElement("canvas");
            /** @hidden */
            this.context = this.canvas.getContext("2d");
        }
        AbstractRenderer.prototype.render = function () { };
        /**
         * Mount this renderer to a DOM element. Pass either a string representing a
         * CSS selector matching the element or the element itself.
         *
         * ```js
         * // mounts the renderer to the element with the ID `container`
         * renderer.mount('#container');
         *
         * // mounts the renderer to the element itself
         * const container = document.getElementById('container');
         * renderer.mount(container);
         * ```
         * @param {string | HTMLElement} el
         */
        AbstractRenderer.prototype.mount = function (el) {
            var container = typeof el === "string" ? document.querySelector(el) : el;
            if (container) {
                container.innerHTML = "";
                container.appendChild(this.canvas);
            }
        };
        return AbstractRenderer;
    }());

    var warnOnce$2 = once(console.warn.bind(console));
    /**
     * An `ASCIIRenderer` renders the {@link Agent | `Agent`}s in
     * a {@linkcode GridEnvironment}. `Agent`s are rendered
     * using their `"value"` data (a single character).
     * Since v0.4.0, this class has been **deprecated**, and it will be removed
     * entirely in v0.6.0.
     * ```js
     * const renderer = new ASCIIRenderer(grid);
     * renderer.mount("#container-id");
     * ```
     * @deprecated since 0.4.0
     * @since 0.0.10
     */
    var ASCIIRenderer = /** @class */ (function (_super) {
        __extends(ASCIIRenderer, _super);
        /**
         * Create a new `ASCIIRenderer` by passing in the
         * {@linkcode GridEnvironment} you want to be rendered.
         */
        function ASCIIRenderer(environment) {
            var _this = _super.call(this) || this;
            warnOnce$2("As of Flocc v0.5.0, ASCIIEnvironment is **DEPRECATED**. It will be **REMOVED** in v0.6.0. The Terrain helper should be used for 2-dimensional grid-like data, with CanvasRenderer to visualize. Read more about Terrains here: https://flocc.network/docs/terrain");
            _this.environment = environment;
            environment.renderers.push(_this);
            _this.pre = document.createElement("pre");
            return _this;
        }
        /**
         * Renders the contents of the `ASCIIRenderer`'s {@linkcode GridEnvironment}.
         * @since 0.0.10
         */
        ASCIIRenderer.prototype.render = function () {
            var _this = this;
            this.pre.innerHTML = "";
            this.environment.loop(function (x, y, agent) {
                var value = " ";
                var cell = _this.environment.getCell(x, y);
                if (agent && agent.get("value")) {
                    value = agent.get("value");
                }
                else if (cell && cell.get("value")) {
                    value = cell.get("value");
                }
                _this.pre.innerHTML += value;
                if (x === _this.environment.width - 1)
                    _this.pre.innerHTML += "\n";
            });
        };
        return ASCIIRenderer;
    }(AbstractRenderer));

    var defaultOptions = {
        autoPosition: false,
        background: "transparent",
        connectionColor: "black",
        connectionOpacity: 1,
        connectionWidth: 1,
        origin: { x: 0, y: 0 },
        width: 500,
        height: 500,
        scale: 1,
        trace: false
    };
    /**
     * A `CanvasRenderer` renders an {@linkcode Environment} spatially in two dimensions.
     * Importantly, it expects that all {@linkcode Agent}s in the `Environment`
     * have numeric `"x"` and `"y"` values associated with them.
     *
     * `CanvasRenderer`s will render all `Agent`s that are visible in the rendered `Environment` space,
     * with the color of their `"color"` value (defaulting to black).
     * Depending on the `"shape"` of the `Agent`, additional data might be needed. `Agent` `"shape"`s can be:
     * - `"circle"` (default) &mdash; Draws a circle centered at the `Agent`'s `"x"` / `"y"` values.
     *   - If the `Agent` has a `"size"` value, uses that for the circle radius (defaults to 1px).
     * - `"arrow"` &mdash; Draws an arrow centered at the `Agent`'s `"x"` / `"y"` values.
     *   - The arrow will point in the direction of the `Agent`s `"vx"` / `"vy"` values. For example, an `Agent` with `"vx" = 1` and `"vy" = 0` will be rendered as an arrow pointing to the right.
     *   - Also uses the `"size" value.
     * - `"rect"` &mdash; Draws a rectangle with the upper-left corner at `"x"` / `"y"`.
     *   - Uses the `Agent`'s `"width"` and `"height"` values for the dimensions of the rectangle.
     * - `"triangle"` &mdash; Draws a triangle centered at the `Agent`'s `"x"` / `"y"` values.
     *   - Also uses the `"size"` value.
     *
     * @since 0.0.11
     */
    var CanvasRenderer = /** @class */ (function (_super) {
        __extends(CanvasRenderer, _super);
        /**
         * The first parameter must be the {@linkcode Environment} that this
         * `CanvasRenderer` will render.
         *
         * The second parameter specifies options, which can include:
         * - `autoPosition` (*boolean* = `false`) &mdash; For `Environment`s using a {@linkcode Network}, whether to automatically position the `Agent`s.
         * - `background` (*string* = `"transparent"`) &mdash; The background color to draw before rendering any `Agent`s.
         * - `connectionColor` (*string* = `"black"`) &mdash; For `Environment`s using a `Network`, the color of lines
         * - `connectionOpacity` (*number* = `1`) &mdash; For `Environment`s using a `Network`, the opacity of lines
         * - `connectionWidth` (*number* = `1`) &mdash; For `Environment`s using a `Network`, the width of lines
         * - `height` (*number* = `500`) &mdash; The height, in pixels, of the canvas on which to render
         * - `origin` (*{ x: number; y: number }* = `{ x: 0, y: 0 }`) &mdash; The coordinate of the upper-left point of the space to be rendered
         * - `scale` (*number* = `1`) &mdash; The scale at which to render (the larger the scale, the smaller the size of the space that is actually rendered)
         * - `trace` (*boolean* = `false`) &mdash; If `true`, the renderer will not clear old drawings, causing the `Agent`s to appear to *trace* their paths across space
         * - `width` (*number* = `500`) &mdash; The width, in pixels, of the canvas on which to render
         */
        function CanvasRenderer(environment, opts) {
            var _this = _super.call(this) || this;
            /** @hidden */
            _this.terrainBuffer = document.createElement("canvas");
            _this.environment = environment;
            environment.renderers.push(_this);
            _this.opts = Object.assign({}, defaultOptions);
            Object.assign(_this.opts, opts);
            var _a = _this.opts, width = _a.width, height = _a.height;
            var dpr = window.devicePixelRatio;
            _this.width = width * dpr;
            _this.height = height * dpr;
            _this.canvas = _this.createCanvas();
            _this.context = _this.canvas.getContext("2d");
            _this.canvas.style.width = width + "px";
            _this.canvas.style.height = height + "px";
            _this.buffer = _this.createCanvas();
            _this.terrainBuffer.width = width;
            _this.terrainBuffer.height = height;
            _this.context.fillStyle = opts.background;
            _this.context.fillRect(0, 0, width, height);
            return _this;
        }
        /** @hidden */
        CanvasRenderer.prototype.x = function (v) {
            var _a = this.opts, origin = _a.origin, scale = _a.scale;
            return window.devicePixelRatio * scale * (v - origin.x);
        };
        /** @hidden */
        CanvasRenderer.prototype.y = function (v) {
            var _a = this.opts, origin = _a.origin, scale = _a.scale;
            return window.devicePixelRatio * scale * (v - origin.y);
        };
        /** @hidden */
        CanvasRenderer.prototype.createCanvas = function () {
            var dpr = window.devicePixelRatio;
            var _a = this.opts, width = _a.width, height = _a.height;
            var canvas = document.createElement("canvas");
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            return canvas;
        };
        /** @hidden */
        CanvasRenderer.prototype.drawPath = function (points, dx, dy) {
            if (dx === void 0) { dx = 0; }
            if (dy === void 0) { dy = 0; }
            var bufferContext = this.buffer.getContext("2d");
            points.forEach(function (_a, i) {
                var px = _a[0], py = _a[1];
                if (i === 0) {
                    bufferContext.moveTo(px + dx, py + dy);
                }
                else {
                    bufferContext.lineTo(px + dx, py + dy);
                }
            });
        };
        /** @hidden */
        CanvasRenderer.prototype.drawPathWrap = function (points) {
            var _this = this;
            var _a = this, width = _a.width, height = _a.height;
            var right = false;
            var left = false;
            var lower = false;
            var upper = false;
            points.forEach(function (_a) {
                var px = _a[0], py = _a[1];
                if (_this.x(px) >= width)
                    right = true;
                if (_this.x(px) < 0)
                    left = true;
                if (_this.y(py) >= height)
                    lower = true;
                if (_this.y(py) < 0)
                    upper = true;
            });
            if (right)
                this.drawPath(points, -width, 0);
            if (left)
                this.drawPath(points, width, 0);
            if (lower && right)
                this.drawPath(points, -width, -height);
            if (upper && right)
                this.drawPath(points, -width, height);
            if (lower && left)
                this.drawPath(points, width, -height);
            if (upper && left)
                this.drawPath(points, width, height);
            if (lower)
                this.drawPath(points, 0, -height);
            if (upper)
                this.drawPath(points, 0, height);
        };
        /** @hidden */
        CanvasRenderer.prototype.drawCircle = function (x, y, r) {
            var bufferContext = this.buffer.getContext("2d");
            bufferContext.moveTo(this.x(x), this.y(y));
            bufferContext.arc(this.x(x), this.y(y), r, 0, 2 * Math.PI);
        };
        /** @hidden */
        CanvasRenderer.prototype.drawCircleWrap = function (x, y, size) {
            var _a = this, width = _a.width, height = _a.height;
            if (this.x(x + size) >= width) {
                this.drawCircle(x - width, y, size);
                if (this.y(y + size) >= height)
                    this.drawCircle(x - width, y - height, size);
                if (this.y(y - size) < 0)
                    this.drawCircle(x - width, y + height, size);
            }
            if (this.x(x - size) < 0) {
                this.drawCircle(x + width, y, size);
                if (this.y(y + size) >= height)
                    this.drawCircle(x + width, y - height, size);
                if (this.y(y - size) < 0)
                    this.drawCircle(x + width, y + height, size);
            }
            if (this.y(y + size) > height)
                this.drawCircle(x, y - height, size);
            if (this.y(y - size) < 0)
                this.drawCircle(x, y + height, size);
        };
        /**
         * Draw a rectangle centered at (x, y). Automatically calculates the offset
         * for both width and height.
         * @hidden
         */
        CanvasRenderer.prototype.drawRect = function (x, y, width, height) {
            var bufferContext = this.buffer.getContext("2d");
            var dpr = window.devicePixelRatio;
            bufferContext.fillRect(this.x(x) - (width * dpr) / 2, this.y(y) - (height * dpr) / 2, width * dpr, height * dpr);
        };
        /** @hidden */
        CanvasRenderer.prototype.drawRectWrap = function (x, y, w, h) {
            var _a = this.opts, width = _a.width, height = _a.height;
            if (this.x(x + w / 2) >= width) {
                this.drawRect(x - width, y, w, h);
                if (this.y(y + h / 2) >= height)
                    this.drawRect(x - width, y - height, w, h);
                if (this.y(y - height / 2) < 0)
                    this.drawRect(x - width, y + height, w, h);
            }
            if (this.x(x - w / 2) < 0) {
                this.drawRect(x + width, y, w, h);
                if (this.y(y + h / 2) >= height)
                    this.drawRect(x + width, y - height, w, h);
                if (this.y(y - height / 2) < 0)
                    this.drawRect(x + width, y + height, w, h);
            }
            if (this.y(y + h / 2) > height)
                this.drawRect(x, y - height, w, h);
            if (this.y(y - height / 2) < 0)
                this.drawRect(x, y + height, w, h);
        };
        CanvasRenderer.prototype.render = function () {
            var _this = this;
            var _a = this, buffer = _a.buffer, context = _a.context, environment = _a.environment, width = _a.width, height = _a.height, opts = _a.opts, terrainBuffer = _a.terrainBuffer;
            var trace = opts.trace;
            var dpr = window.devicePixelRatio;
            // always clear buffer
            var bufferContext = buffer.getContext("2d");
            bufferContext.clearRect(0, 0, width, height);
            // if "trace" is truthy, don't clear the canvas with every frame
            // to trace the paths of agents
            if (!trace) {
                context.clearRect(0, 0, width * dpr, height * dpr);
                context.fillStyle = opts.background;
                context.fillRect(0, 0, width * dpr, height * dpr);
            }
            // automatically position agents in an environment that uses a network helper
            if (opts.autoPosition && environment.helpers.network) {
                environment.getAgents().forEach(function (agent) {
                    var network = _this.environment.helpers.network;
                    var _a = _this, width = _a.width, height = _a.height;
                    // only set once
                    if ((agent.get("x") === null || agent.get("y") === null) &&
                        network.isInNetwork(agent)) {
                        var idx = network.indexOf(agent);
                        var angle = idx / network.agents.length;
                        var x = width / 2 + 0.4 * width * Math.cos(2 * Math.PI * angle);
                        var y = height / 2 + 0.4 * height * Math.sin(2 * Math.PI * angle);
                        agent.set({ x: x, y: y });
                    }
                });
            }
            if (environment.helpers.terrain) {
                var terrain = environment.helpers.terrain;
                var scale = terrain.opts.scale;
                var terrainContext = terrainBuffer.getContext("2d");
                var imageData = new ImageData(terrain.data, terrain.width * scale, terrain.height * scale);
                terrainContext.putImageData(imageData, 0, 0);
                context.save();
                context.scale(1 / dpr, 1 / dpr);
                context.drawImage(this.terrainBuffer, 0, 0, width * dpr, height * dpr);
                context.restore();
            }
            // Map of connections that have been drawn between an agent and and its neighbors
            // (check against this in order to not draw connections twice)
            var connectionsDrawn = new Map();
            environment.getAgents().forEach(function (agent) {
                var _a;
                var _b = agent.getData(), x = _b.x, y = _b.y, vx = _b.vx, vy = _b.vy, color = _b.color, text = _b.text, _c = _b.textAlign, textAlign = _c === void 0 ? "center" : _c, _d = _b.textBaseline, textBaseline = _d === void 0 ? "middle" : _d, textColor = _b.textColor, _e = _b.textSize, textSize = _e === void 0 ? 12 : _e, shape = _b.shape, _f = _b.size, size = _f === void 0 ? 1 : _f;
                context.beginPath();
                context.moveTo(_this.x(x), _this.y(y));
                bufferContext.beginPath();
                bufferContext.moveTo(_this.x(x), _this.y(y));
                // always draw connections to other agents directly to the canvas context
                if (_this.environment.helpers.network) {
                    connectionsDrawn.set(agent, []);
                    var network = _this.environment.helpers.network;
                    if (!network.neighbors(agent))
                        return;
                    for (var _i = 0, _g = network.neighbors(agent); _i < _g.length; _i++) {
                        var neighbor = _g[_i];
                        if ((_a = connectionsDrawn.get(neighbor)) === null || _a === void 0 ? void 0 : _a.includes(agent)) {
                            continue;
                        }
                        connectionsDrawn.get(agent).push(neighbor);
                        var nx = neighbor.get("x");
                        var ny = neighbor.get("y");
                        context.save();
                        context.beginPath();
                        context.globalAlpha = _this.opts.connectionOpacity;
                        context.strokeStyle = _this.opts.connectionColor;
                        context.lineWidth = _this.opts.connectionWidth;
                        context.moveTo(_this.x(x), _this.x(y));
                        context.lineTo(_this.x(nx), _this.x(ny));
                        context.stroke();
                        context.closePath();
                        context.restore();
                    }
                }
                bufferContext.strokeStyle = "none";
                bufferContext.fillStyle = color || "black";
                // draw agents to the buffer, then after finished looping
                // we will draw the buffer to the canvas
                if (shape === "arrow" && vx !== null && vy !== null) {
                    var norm = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
                    var _vx = 3 * size * (vx / norm) * dpr;
                    var _vy = 3 * size * (vy / norm) * dpr;
                    bufferContext.beginPath();
                    var points = [
                        [_this.x(x) + 1.5 * _vx, _this.y(y) + 1.5 * _vy],
                        [_this.x(x) + _vy / 2, _this.y(y) - _vx / 2],
                        [_this.x(x) - _vy / 2, _this.y(y) + _vx / 2]
                    ];
                    _this.drawPath(points);
                    if (environment.opts.torus)
                        _this.drawPathWrap(points);
                }
                else if (shape === "rect") {
                    var _h = agent.getData(), _j = _h.width, width_1 = _j === void 0 ? 1 : _j, _k = _h.height, height_1 = _k === void 0 ? 1 : _k;
                    _this.drawRect(x, y, width_1, height_1);
                    if (environment.opts.torus)
                        _this.drawRectWrap(x, y, width_1, height_1);
                }
                else if (shape === "triangle") {
                    bufferContext.beginPath();
                    var points = [
                        [_this.x(x), _this.y(y) - size / 2],
                        [_this.x(x) + size / 2, _this.y(y) + size / 2],
                        [_this.x(x) - size / 2, _this.y(y) + size / 2]
                    ];
                    _this.drawPath(points);
                    if (environment.opts.torus)
                        _this.drawPathWrap(points);
                }
                else if (shape === "circle" || shape === undefined) {
                    _this.drawCircle(x, y, size * dpr);
                    if (environment.opts.torus)
                        _this.drawCircleWrap(x, y, size);
                }
                bufferContext.fill();
                if (text) {
                    bufferContext.save();
                    bufferContext.fillStyle = textColor
                        ? textColor
                        : color
                            ? color
                            : "black";
                    bufferContext.font = textSize + "px sans-serif";
                    bufferContext.textAlign = textAlign;
                    bufferContext.textBaseline = textBaseline;
                    bufferContext.fillText(text, _this.x(x), _this.y(y));
                    bufferContext.restore();
                }
            });
            context.drawImage(buffer, 0, 0);
        };
        return CanvasRenderer;
    }(AbstractRenderer));

    /// <reference path="../types/NRange.d.ts" />
    function extractRoundNumbers(range) {
        var min = range.min, max = range.max;
        var increment = Math.pow(10, Math.round(Math.log10(max - min) - 1)); // start from closest power of 10 difference, over 10
        var ticker = 0; // 0 = 1, 1 = 2, 2 = 5, etc.
        while ((max - min) / increment > 8) {
            increment *= ticker % 3 === 1 ? 2.5 : 2;
            ticker++;
        }
        var start = min - ((min + increment) % increment);
        var end = max - (max % increment);
        var arr = [];
        for (var n = start; n <= end; n += increment)
            arr.push(n);
        return arr;
    }

    var LINE_DASH = [10, 10];
    var PADDING_AT_BOTTOM = 60;
    var PADDING_AT_LEFT = 20;
    var PADDING_AT_RIGHT = 30;
    var defaultHistogramOptions = {
        aboveMax: false,
        belowMin: false,
        buckets: 1,
        color: "#000",
        epsilon: 0,
        height: 500,
        max: 1,
        min: 0,
        width: 500,
        scale: "fixed"
    };
    /**
     * @since 0.3.0
     */
    var Histogram = /** @class */ (function (_super) {
        __extends(Histogram, _super);
        function Histogram(environment, opts) {
            var _this = _super.call(this) || this;
            _this.background = document.createElement("canvas");
            _this.opts = defaultHistogramOptions;
            _this.markerWidth = 0;
            _this.environment = environment;
            _this.opts = Object.assign({}, _this.opts, opts);
            var _a = _this.opts, width = _a.width, height = _a.height;
            var dpr = window.devicePixelRatio;
            _this.width = width * dpr;
            _this.height = height * dpr;
            _this.canvas.width = width * dpr;
            _this.canvas.height = height * dpr;
            _this.canvas.style.width = width + "px";
            _this.canvas.style.height = height + "px";
            _this.background.width = width * dpr;
            _this.background.height = height * dpr;
            environment.renderers.push(_this);
            return _this;
        }
        /**
         * Add a metric or metrics to this Histogram. For a single metric, pass the
         * string matching the key of Agent data you would like to count. For multiple metrics,
         * pass either an array of strings or strings as separate parameters, e.g.
         * - `histogram.metric("one", "two", "three");` or
         * - `histogram.metric(["one", "two", "three"]);`
         * @param {string | string[]}_metric
         * @param {string[]} otherMetrics
         * @since 0.3.0
         */
        Histogram.prototype.metric = function (_metric) {
            var otherMetrics = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                otherMetrics[_i - 1] = arguments[_i];
            }
            if (Array.isArray(_metric)) {
                this._metric = _metric;
            }
            else if (otherMetrics && otherMetrics.length > 0) {
                this._metric = [_metric].concat(otherMetrics);
            }
            else {
                this._metric = _metric;
            }
        };
        Histogram.prototype.x = function (value) {
            var _a = this, width = _a.width, markerWidth = _a.markerWidth;
            return remap(value, 0, width, markerWidth + PADDING_AT_LEFT, width - PADDING_AT_RIGHT);
        };
        Histogram.prototype.y = function (value) {
            var _a = this, height = _a.height, maxValue = _a.maxValue;
            return remap(value, 0, maxValue, height - PADDING_AT_BOTTOM, 0);
        };
        Histogram.prototype.setMaxValue = function () {
            var _this = this;
            var environment = this.environment;
            var metric = this._metric;
            var scale = this.opts.scale;
            if (scale === "fixed") {
                this.maxValue = environment.getAgents().length;
            }
            else {
                if (Array.isArray(metric)) {
                    var arrayOfBucketValues = metric.map(function (metric) {
                        return _this.getBucketValues(metric);
                    });
                    // maxValue is maximum of maximum value across metrics
                    this.maxValue = max(arrayOfBucketValues.map(max));
                }
                else {
                    var bucketValues = this.getBucketValues(metric);
                    this.maxValue = max(bucketValues);
                }
            }
        };
        Histogram.prototype.drawMarkers = function (bucketValues) {
            var _this = this;
            var context = this.canvas.getContext("2d");
            var _a = this, height = _a.height, width = _a.width;
            var _b = this.opts, aboveMax = _b.aboveMax, belowMin = _b.belowMin, buckets = _b.buckets, min = _b.min, max$1 = _b.max;
            var yMin = 0;
            var yMax = this.maxValue;
            var markers = extractRoundNumbers({ min: yMin, max: yMax });
            context.fillStyle = "black";
            context.font = 14 * window.devicePixelRatio + "px Helvetica";
            // determine the width of the longest marker
            this.markerWidth = max(markers.map(function (marker) { return context.measureText(marker.toLocaleString()).width; }));
            // draw horizontal lines
            markers.forEach(function (marker) {
                context.textAlign = "right";
                context.textBaseline = "middle";
                context.fillText(marker.toLocaleString(), _this.markerWidth, _this.y(marker));
                context.beginPath();
                context.moveTo(_this.markerWidth + 10, _this.y(marker));
                context.lineTo(_this.width, _this.y(marker));
                context.setLineDash(LINE_DASH);
                context.stroke();
            });
            var numBuckets = bucketValues.length - (aboveMax ? 1 : 0) - (belowMin ? 1 : 0);
            // write labels below bars
            bucketValues
                .map(function (v, i) {
                if (Array.isArray(buckets))
                    return buckets[i].toString();
                if (i === 0 && belowMin) {
                    return "< " + min;
                }
                else if (i === bucketValues.length - 1 && aboveMax) {
                    return "> " + max$1;
                }
                var currentIndex = i - (belowMin ? 1 : 0);
                return (remap(currentIndex, 0, numBuckets, min, max$1).toLocaleString() +
                    "..." +
                    remap(currentIndex + 1, 0, numBuckets, min, max$1).toLocaleString());
            })
                .forEach(function (label, i) {
                context.save();
                context.translate(_this.x((i * width) / bucketValues.length +
                    (0.5 * width) / bucketValues.length), height - 50);
                context.rotate(Math.PI / 4);
                context.font = 12 * window.devicePixelRatio + "px Helvetica";
                context.textAlign = "left";
                context.textBaseline = "middle";
                context.fillText(label, 0, 0);
                context.restore();
            });
        };
        Histogram.prototype.drawBuckets = function (bucketValues, offset) {
            var _this = this;
            if (offset === void 0) { offset = 0; }
            var canvas = this.canvas;
            var metric = this._metric;
            var numMetrics = Array.isArray(metric) ? metric.length : 1;
            var _a = this.opts, aboveMax = _a.aboveMax, belowMin = _a.belowMin, color = _a.color, width = _a.width, height = _a.height;
            var context = canvas.getContext("2d");
            context.fillStyle = Array.isArray(color)
                ? color[offset % color.length]
                : color;
            var numBuckets = bucketValues.length;
            var barWidth = (width - PADDING_AT_LEFT - PADDING_AT_RIGHT - this.markerWidth) /
                numBuckets;
            barWidth *= 0.8;
            bucketValues.forEach(function (value, i) {
                var mappedValue = remap(value, 0, _this.maxValue, 0, 1);
                var x = _this.x(((0.1 + i) * width) / numBuckets);
                context.fillRect(x + (offset * barWidth - (numMetrics - 1)) / numMetrics + offset, remap(mappedValue, 0, 1, height - PADDING_AT_BOTTOM, 0), barWidth / numMetrics, remap(mappedValue, 0, 1, 0, height - PADDING_AT_BOTTOM));
            });
        };
        Histogram.prototype.getBucketValues = function (metric) {
            var environment = this.environment;
            var _a = this.opts, aboveMax = _a.aboveMax, belowMin = _a.belowMin, buckets = _a.buckets, epsilon = _a.epsilon, min = _a.min, max = _a.max;
            // this won't change in the same environment tick, so memoize it
            return environment.memo(function () {
                // initialize map of bucket values --
                // array of length `buckets`, initialized to all zeros,
                // plus 1 if aboveMax, plus another 1 if belowMin
                var numBuckets = Array.isArray(buckets)
                    ? buckets.length
                    : buckets + (aboveMax ? 1 : 0) + (belowMin ? 1 : 0);
                var bucketValues = new Array(numBuckets).fill(0);
                var data = environment.stat(metric);
                data.forEach(function (value) {
                    // Calculate index of bucket this agent's value says it belongs in.
                    // If given an array of discrete bucket values, only match the exact
                    // (or within epsilon) one
                    if (Array.isArray(buckets)) {
                        var index = buckets.findIndex(function (v) { return v === value || Math.abs(v - value) <= epsilon; });
                        return bucketValues[index]++;
                    }
                    // Shortcut if value is above max and we are allowing
                    // values above the max.
                    if (aboveMax && value > max) {
                        return bucketValues[bucketValues.length - 1]++;
                        // Same thing but for below min.
                    }
                    else if (belowMin && value < min) {
                        return bucketValues[0]++;
                        // Otherwise, only track if the value is in the allowed range.
                    }
                    else if (value >= min && value <= max) {
                        var index = Math.floor(remap(value, min, max, 0, 0.999999) * buckets) +
                            (belowMin ? 1 : 0);
                        bucketValues[index]++;
                    }
                });
                return bucketValues;
            }, metric);
        };
        Histogram.prototype.render = function () {
            var _this = this;
            if (!this._metric)
                return;
            var _a = this, canvas = _a.canvas, width = _a.width, height = _a.height;
            var metric = this._metric;
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, width, height);
            this.setMaxValue();
            if (Array.isArray(metric)) {
                var arrayOfBucketValues = metric.map(function (metric) {
                    return _this.getBucketValues(metric);
                });
                this.drawMarkers(arrayOfBucketValues[0]);
                arrayOfBucketValues.forEach(function (bucketValues, i) {
                    return _this.drawBuckets(bucketValues, i);
                });
            }
            else {
                var bucketValues = this.getBucketValues(metric);
                this.drawMarkers(bucketValues);
                this.drawBuckets(bucketValues);
            }
        };
        return Histogram;
    }(AbstractRenderer));

    var PADDING_BOTTOM = 10;
    var lineDash = [10, 10];
    var defaultRendererOptions = {
        autoScale: false,
        autoScroll: false,
        background: "transparent",
        height: 500,
        range: {
            min: 0,
            max: 1
        },
        width: 500
    };
    var defaultMetricOptions = {
        color: "#000",
        fn: mean
    };
    /**
     * @since 0.2.0
     */
    var LineChartRenderer = /** @class */ (function (_super) {
        __extends(LineChartRenderer, _super);
        function LineChartRenderer(environment, opts) {
            var _this = _super.call(this) || this;
            _this.background = document.createElement("canvas");
            _this.metrics = [];
            _this.t = 0;
            _this.environment = environment;
            _this.opts = Object.assign({}, defaultRendererOptions, opts);
            _this.opts.range = Object.assign({}, _this.opts.range);
            var _a = _this.opts, width = _a.width, height = _a.height;
            var dpr = window.devicePixelRatio;
            _this.width = _this.opts.width * dpr;
            _this.height = _this.opts.height * dpr;
            _this.canvas.width = width * dpr;
            _this.canvas.height = height * dpr;
            _this.canvas.style.width = width + "px";
            _this.canvas.style.height = height + "px";
            _this.background.width = width * dpr;
            _this.background.height = height * dpr;
            environment.renderers.push(_this);
            return _this;
        }
        /**
         * @since 0.2.0
         */
        LineChartRenderer.prototype.metric = function (key, opts) {
            var buffer = new NumArray();
            var metric = __assign({ key: key, buffer: buffer }, defaultMetricOptions);
            Object.assign(metric, opts);
            this.metrics.push(metric);
        };
        LineChartRenderer.prototype.x = function (value) {
            var _a = this, opts = _a.opts, t = _a.t, width = _a.width;
            var x = value;
            if (opts.autoScroll && t >= width) {
                x -= t - width;
            }
            else if (opts.autoScale && t >= width) {
                x *= width / t;
            }
            return x | 0;
        };
        LineChartRenderer.prototype.y = function (value) {
            var height = this.height;
            var range = this.opts.range;
            var min = range.min, max = range.max;
            var pxPerUnit = (height - 2 * PADDING_BOTTOM) / (max - min);
            return Math.round(height - (value - min) * pxPerUnit) - 2 * PADDING_BOTTOM;
        };
        LineChartRenderer.prototype.drawBackground = function () {
            var _this = this;
            var _a = this, context = _a.context, width = _a.width, height = _a.height, opts = _a.opts, t = _a.t;
            // draw background and lines
            context.fillStyle = this.opts.background;
            context.fillRect(0, 0, width, height);
            var range = this.opts.range;
            var markers = extractRoundNumbers(range);
            var textMaxWidth = 0;
            // write values on vertical axis
            context.font = 14 * window.devicePixelRatio + "px Helvetica";
            context.fillStyle = "#000";
            context.textBaseline = "middle";
            markers.forEach(function (marker) {
                if (_this.y(marker) < 10 || _this.y(marker) + 10 > height)
                    return;
                var width = context.measureText(marker.toLocaleString()).width;
                if (width > textMaxWidth)
                    textMaxWidth = width;
                context.fillText(marker.toLocaleString(), 5, _this.y(marker));
            });
            // draw horizontal lines for vertical axis
            context.save();
            context.strokeStyle = "#999";
            markers.forEach(function (marker) {
                if (_this.y(marker) >= height - PADDING_BOTTOM)
                    return;
                context.beginPath();
                context.moveTo(textMaxWidth + 10, _this.y(marker));
                context.lineTo(_this.x(Math.max(width, _this.environment.time)), _this.y(marker));
                context.setLineDash(lineDash);
                context.stroke();
            });
            context.restore();
            // draw time values for horizontal axis
            var min = opts.autoScroll && t >= width ? t - width : 0;
            var max = opts.autoScale && t >= width ? t : width;
            var timeRange = { min: min, max: max };
            var timeMarkers = extractRoundNumbers(timeRange);
            context.save();
            context.textAlign = "center";
            timeMarkers.forEach(function (marker) {
                var width = context.measureText(marker.toLocaleString()).width;
                if (_this.x(marker) + width / 2 > _this.width ||
                    _this.x(marker) - width / 2 < textMaxWidth) {
                    return;
                }
                context.font = 11 * window.devicePixelRatio + "px Helvetica";
                context.fillText(marker.toLocaleString(), _this.x(marker), height - PADDING_BOTTOM);
                context.strokeStyle = "black";
                context.lineWidth = 1;
                context.beginPath();
                context.moveTo(_this.x(marker), height - 4);
                context.lineTo(_this.x(marker), height);
                context.stroke();
            });
            context.restore();
        };
        LineChartRenderer.prototype.render = function () {
            var _this = this;
            var _a = this, context = _a.context, environment = _a.environment, metrics = _a.metrics, width = _a.width, height = _a.height, opts = _a.opts;
            // clear canvas and draw background
            context.clearRect(0, 0, width, height);
            this.drawBackground();
            // initialize values map -- for each metric, a pairing of `key` and an empty array
            var values = new Map();
            metrics.forEach(function (_a) {
                var key = _a.key;
                return values.set(key, environment.stat(key));
            });
            // finally, for each metric, use its function to derive the desired value
            // from all the agent data
            metrics.forEach(function (metric) {
                var buffer = metric.buffer, color = metric.color, fn = metric.fn, key = metric.key;
                // push new value to buffer
                var value = fn(values.get(key));
                buffer.set(_this.t, value);
                if (opts.autoScale) {
                    if (value < opts.range.min)
                        _this.opts.range.min = value;
                    if (value > opts.range.max)
                        _this.opts.range.max = value;
                }
                context.strokeStyle = color;
                context.beginPath();
                for (var i = 0; i < buffer.length; i++) {
                    var value_1 = buffer.get(i);
                    var x = _this.x(i);
                    var y = _this.y(value_1);
                    if (i === 0)
                        context.moveTo(x, y);
                    context.lineTo(x, y);
                }
                context.stroke();
            });
            this.t++;
        };
        return LineChartRenderer;
    }(AbstractRenderer));

    var defaultTableRendererOptions = {
        filter: null,
        limit: Infinity,
        order: "desc",
        precision: 3,
        refresh: 500,
        sortKey: null,
        type: "table"
    };
    var precision = function (n, d) {
        if (d < 1)
            return Math.round(n);
        return Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
    };
    var escapeStringQuotes = function (s) { return "\"" + s.replace(/"/g, '\\"') + "\""; };
    /**
     * A `TableRenderer` renders an HTML table (for browsers only) or CSV (comma-separated value)
     * representation of {@linkcode Agent} data.
     *
     * ```js
     * for (let i = 0; i < 3; i++) {
     *   environment.addAgent(new Agent({
     *     x: i * 10,
     *     y: i - 2
     *   }));
     * }
     *
     * const renderer = new TableRenderer(environment);
     * renderer.columns = ['x', 'y'];
     * renderer.mount('#container');
     * environment.tick();
     * ```
     *
     * The `TableRenderer` renders:
     *
     * |x   |y   |
     * |----|----|
     * |0   |-2  |
     * |10  |-1  |
     * |20  |0   |
     *
     * @since 0.5.0
     */
    var TableRenderer = /** @class */ (function (_super) {
        __extends(TableRenderer, _super);
        /**
         * The first parameter must be the {@linkcode Environment} that this
         * `TableRenderer` will render.
         *
         * The second parameter specifies options, which can include:
         * - `"type"` (`"csv"` | `"table"` = `"table"`) &mdash; Whether to render output in CSV or HTML `<table>` format
         * - `"filter"` &mdash; Include a function (`Agent` => `boolean`) to specify which rows to include in the output. For example, if you only want to include `Agent`s with an x value greater than 100:
         *   ```js
         *   const renderer = new TableRenderer(environment, {
         *     filter: agent => {
         *       return agent.get('x') > 100;
         *     }
         *   });
         *   ```
         * - `"limit"` (*number* = `Infinity`) &mdash; The maximum number of rows (`Agent`s) to render. If using a `filter` function, applies the `limit` *after* filtering.
         * - `"sortKey"` (*string* = `null`) &mdash; Sort the `Agent` data by this key of data
         * - `"order"` (`"asc"` | `"desc"` = `"desc"`) &mdash; When using a `"sortKey"`, specify whether `Agent`s should be listed in *asc*ending or *desc*ending order
         * - `"precision"` (*number* = `3`) &mdash; For floating point values, the number of decimal places to display
         * - `"refresh"` (*number* = `500`) &mdash; The number of milliseconds that should elapse between re-rendering (if this happens too quickly the effect can be visually jarring)
         */
        function TableRenderer(environment, options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this) || this;
            /** @hidden */
            _this.lastRendered = +new Date();
            /** @hidden */
            _this.opts = Object.assign({}, defaultTableRendererOptions);
            _this.environment = environment;
            environment.renderers.push(_this);
            Object.assign(_this.opts, options);
            _this.columns = [];
            return _this;
        }
        /**
         * Mount this renderer to a DOM element. Pass either a string representing a
         * CSS selector matching the element or the element itself.
         *
         * ```js
         * // mounts the renderer to the element with the ID `container`
         * renderer.mount('#container');
         *
         * // mounts the renderer to the element itself
         * const container = document.getElementById('container');
         * renderer.mount(container);
         * ```
         * @override
         * @param {string | HTMLElement} el
         */
        TableRenderer.prototype.mount = function (el) {
            var container = typeof el === "string" ? document.querySelector(el) : el;
            if (container) {
                if (container instanceof HTMLElement)
                    container.style.whiteSpace = "pre";
                container.innerHTML = "";
            }
            this.table = container;
        };
        /** @hidden */
        TableRenderer.prototype.serializeColumns = function (joiner, start, end, escape) {
            if (start === void 0) { start = ""; }
            if (end === void 0) { end = ""; }
            if (escape === void 0) { escape = false; }
            var columns = escape
                ? this.columns.map(function (c) { return escapeStringQuotes(c); })
                : this.columns;
            if (columns.length === 0)
                return "";
            return start + columns.join(joiner) + end;
        };
        /** @hidden */
        TableRenderer.prototype.serializeRows = function (cellJoiner, rowJoiner, start, end, rowStart, rowEnd, escape) {
            var _this = this;
            if (start === void 0) { start = ""; }
            if (end === void 0) { end = ""; }
            if (rowStart === void 0) { rowStart = ""; }
            if (rowEnd === void 0) { rowEnd = ""; }
            if (escape === void 0) { escape = false; }
            var _a = this, columns = _a.columns, environment = _a.environment, opts = _a.opts;
            var filter = opts.filter, limit = opts.limit, order = opts.order, sortKey = opts.sortKey;
            // if no agents, don't return anything
            if (environment.getAgents().length === 0)
                return "";
            // filter agent data if there is a filter function,
            // otherwise duplicate environment.getAgents() as a new array
            var agents = filter
                ? environment.getAgents().filter(filter)
                : Array.from(environment.getAgents());
            // if there is a sortKey, sort the agents
            if (sortKey !== null) {
                agents.sort(function (a, b) {
                    var first = order === "asc" ? a : b;
                    var second = first === a ? b : a;
                    return first.get(sortKey) - second.get(sortKey);
                });
            }
            return (start +
                agents
                    .slice(0, limit)
                    .map(function (agent) {
                    return (rowStart +
                        columns
                            .map(function (key) {
                            var v = agent.get(key);
                            if (typeof v === "number") {
                                return precision(v, _this.opts.precision);
                                // include double-quotes and escape inner double-quotes
                            }
                            else if (typeof v === "string") {
                                return escape ? escapeStringQuotes(v) : v;
                            }
                            return v ? v.toString() : "";
                        })
                            .join(cellJoiner) +
                        rowEnd);
                })
                    .join(rowJoiner) +
                end);
        };
        /** @hidden */
        TableRenderer.prototype.renderCSV = function () {
            var columns = this.serializeColumns(",", "", "", true);
            if (columns === "")
                return "";
            var rows = this.serializeRows(",", "\n", "", "", "", "", true);
            if (rows === "")
                return columns;
            return columns + "\n" + rows;
        };
        /** @hidden */
        TableRenderer.prototype.renderHTMLTable = function () {
            var thead = this.serializeColumns("</td><td>", "<thead><tr><td>", "</td></tr></thead>");
            var tbody = this.serializeRows("</td><td>", "", "<tbody>", "</tbody>", "<tr><td>", "</td></tr>");
            return "<table>" + thead + tbody + "</table>";
        };
        /**
         * Returns the outer HTML of the table or the CSV data as a string. This can be useful for exporting data, particularly in a Node.js environment as opposed to in a browser. For instance, in a Node.js script, you could write the CSV data to a file as follows:
         *
         * ```js
         * const fs = require('fs'); // import the file system module
         *
         * const environment = new Environment();
         * for (let i = 0; i < 3; i++) environment.addAgent(new Agent({ i }));
         *
         * const renderer = new TableRenderer(environment, { type: 'csv' });
         * renderer.columns = ['i'];
         *
         * // write the TableRenderer's output to a CSV file named data.csv
         * fs.writeFileSync('./data.csv', renderer.output());
         * ```
         *
         * @since 0.5.0
         */
        TableRenderer.prototype.output = function () {
            var type = this.opts.type;
            if (type === "csv") {
                return this.renderCSV();
            }
            else if (type === "table") {
                return this.renderHTMLTable();
            }
        };
        TableRenderer.prototype.render = function () {
            if (typeof window === "undefined") {
                // server: don't automatically write anything
                return;
            }
            // browser
            if (+new Date() - this.lastRendered >= this.opts.refresh) {
                this.table.innerHTML = this.output();
                this.lastRendered = +new Date();
            }
        };
        return TableRenderer;
    }(AbstractRenderer));

    var PADDING_AT_BOTTOM$1 = 60;
    var PADDING_AT_LEFT$1 = 60;
    var isAxisObject = function (obj) {
        return obj && typeof obj !== "string";
    };
    var defaultHeatmapOptions = {
        from: "#fff",
        to: "#000",
        x: "x",
        y: "y",
        height: 500,
        width: 500,
        scale: "relative"
    };
    var warnOnce$3 = once(console.warn.bind(console));
    /**
     * A `Heatmap` can be used to visualize the distribution of {@linkcode Agent}s across two metrics.
     * While {@linkcode Histogram}s are useful for showing the distribution of `Agent`s along a single metric
     * (or on multiple metrics using the same scale), a `Heatmap` can show how two metrics relate to one another &mdash;
     * correlation, inverse correlation, in a nonlinear manner, randomly (no correlation), etc.
     *
     * <img src="https://cms.flocc.network/wp-content/uploads/2020/11/heatmap-basic.png" />
     *
     * Note above that, although the output appears similar to what a {@linkcode CanvasRenderer} might output, the `y` axis is reversed here &mdash; low values are at the bottom and high at the top, whereas on a `CanvasRenderer` high values are at the bottom and low at the top.
     *
     * @since 0.5.8
     */
    var Heatmap = /** @class */ (function (_super) {
        __extends(Heatmap, _super);
        /**
         * The first parameter must be the {@linkcode Environment} that this
         * `Heatmap` will render.
         *
         * The second parameter specifies options, which can include:
         * - `from` (*string* = `"white"`) &mdash; The color (name, hex value, or RGB) to draw when a cell contains `0` {@linkcode Agent}s
         * - `to` (*string* = `"black"`) &mdash; The color (name, hex value, or RGB) to draw when a cell contains the highest number of `Agent`s
         * - `x` and `y` can be either:
         *   - *string* = `"x"`/`"y"` respectively &mdash; The name of `Agent` data to measure along the `x`/`y` axis
         *   - *{ buckets: number; key: string; min: number; max: number }* = `{ buckets: 10, key: 'x' | 'y', min: 0, max: 1 }` &mdash; Include the number of buckets to divide the range `min → max` into, along with the name of `Agent` data
         * - `width` (*number* = `500`) &mdash; The width, in pixels, of the canvas on which to render
         * - `height` (*number* = `500`) &mdash; The height, in pixels, of the canvas on which to render
         * - `scale` (either `"relative"` or `"fixed"`, defaults to `"relative"`)
         *   - `"relative"` &mdash; The maximum number of `Agent`s in any single cell is automatically used as the highest value in the scale. This updates over time based on `Agent` distribution.
         *   - `"fixed"` &mdash; You supply the number to use as the maximum value (see `max` below).
         * - `max` (optional, *number*) &mdash; If you use `scale = "fixed"`, then setting a `max` will cause cells with that number (or higher) of `Agent`s to be drawn using the `to` color.
         *
         * ```js
         * // plots the correlation between age of agents (on the x-axis)
         * // vs. their wealth (on the y-axis)
         * const heatmap = new Heatmap(environment, {
         *   x: 'age',
         *   y: 'wealth'
         * });
         * ```
         */
        function Heatmap(environment, opts) {
            var _this = _super.call(this) || this;
            /** @hidden */
            _this.opts = defaultHeatmapOptions;
            _this.environment = environment;
            _this.opts = Object.assign({}, _this.opts, opts);
            var _a = _this.opts, width = _a.width, height = _a.height;
            var dpr = window.devicePixelRatio;
            _this.width = width * dpr;
            _this.height = height * dpr;
            _this.canvas.width = width * dpr;
            _this.canvas.height = height * dpr;
            _this.canvas.style.width = width + "px";
            _this.canvas.style.height = height + "px";
            environment.renderers.push(_this);
            _this.buckets = new Array(_this.getBuckets("x") * _this.getBuckets("y")).fill(0);
            _this.drawMarkers();
            return _this;
        }
        /**
         * Map a value (on the range x-min to x-max) onto canvas space to draw it along the x-axis.
         * @hidden
         */
        Heatmap.prototype.x = function (value) {
            var width = this.width;
            return remap(value, this.getMin("x"), this.getMax("x"), PADDING_AT_LEFT$1, width);
        };
        /**
         * Map a value (on the range y-min to y-max) onto canvas space to draw it along the y-axis.
         * @hidden
         */
        Heatmap.prototype.y = function (value) {
            var height = this.height;
            return remap(value, this.getMin("y"), this.getMax("y"), height - PADDING_AT_BOTTOM$1, 0);
        };
        /** @hidden */
        Heatmap.prototype.getKey = function (axis) {
            var a = this.opts[axis];
            if (isAxisObject(a)) {
                return a.key;
            }
            else {
                return a;
            }
        };
        /** @hidden */
        Heatmap.prototype.getBuckets = function (axis) {
            var a = this.opts[axis];
            if (isAxisObject(a) && a.hasOwnProperty("buckets"))
                return a.buckets;
            return 10;
        };
        /** @hidden */
        Heatmap.prototype.getMin = function (axis) {
            var a = this.opts[axis];
            if (isAxisObject(a) && a.hasOwnProperty("min")) {
                return a.min;
            }
            else {
                return 0;
            }
        };
        /** @hidden */
        Heatmap.prototype.getMax = function (axis) {
            var a = this.opts[axis];
            if (isAxisObject(a) && a.hasOwnProperty("max")) {
                return a.max;
            }
            else {
                return 1;
            }
        };
        /** @hidden */
        Heatmap.prototype.drawMarkers = function () {
            var _a = this, context = _a.context, width = _a.width, height = _a.height;
            var _b = this.opts, from = _b.from, to = _b.to;
            context.strokeStyle = "black";
            context.lineWidth = 1;
            context.moveTo(PADDING_AT_LEFT$1 - 1, 0);
            context.lineTo(PADDING_AT_LEFT$1 - 1, height - PADDING_AT_BOTTOM$1 + 1);
            context.lineTo(width, height - PADDING_AT_BOTTOM$1 + 1);
            context.stroke();
            context.lineWidth = 0;
            var gradient = context.createLinearGradient(10, 0, PADDING_AT_LEFT$1 - 10, 0);
            gradient.addColorStop(0, from);
            gradient.addColorStop(1, to);
            context.fillStyle = gradient;
            context.fillRect(10, height - PADDING_AT_BOTTOM$1 + 20, PADDING_AT_LEFT$1 - 24, 20);
            context.fillStyle = "black";
            var step = (this.getMax("x") - this.getMin("x")) / this.getBuckets("x");
            var originalStep = step;
            while (Math.abs(this.x(step) - this.x(0)) < 35)
                step *= 2;
            for (var marker = this.getMin("x"); marker <= this.getMax("x"); marker += originalStep) {
                if (this.x(marker) + 10 > width)
                    continue;
                context.moveTo(this.x(marker), height - PADDING_AT_BOTTOM$1);
                context.lineTo(this.x(marker), height - PADDING_AT_BOTTOM$1 + 10);
                context.stroke();
                if (Math.abs(((marker - this.getMin("x")) / step) % 1) < 0.001 ||
                    Math.abs((((marker - this.getMin("x")) / step) % 1) - 1) < 0.001) {
                    context.font = 12 * window.devicePixelRatio + "px Helvetica";
                    context.textAlign = "center";
                    context.fillText(marker.toLocaleString(), this.x(marker), height - PADDING_AT_BOTTOM$1 + 24);
                }
            }
            step = (this.getMax("y") - this.getMin("y")) / this.getBuckets("y");
            originalStep = step;
            while (Math.abs(this.y(step) - this.y(0)) < 20)
                step *= 2;
            for (var marker = this.getMin("y"); marker <= this.getMax("y"); marker += originalStep) {
                if (this.y(marker) - 10 < 0)
                    continue;
                context.moveTo(PADDING_AT_LEFT$1, this.y(marker));
                context.lineTo(PADDING_AT_LEFT$1 - 10, this.y(marker));
                context.stroke();
                if (Math.abs(((marker - this.getMin("y")) / step) % 1) < 0.001 ||
                    Math.abs((((marker - this.getMin("y")) / step) % 1) - 1) < 0.001) {
                    context.font = 12 * window.devicePixelRatio + "px Helvetica";
                    context.textAlign = "right";
                    context.textBaseline = "middle";
                    context.fillText(marker.toLocaleString(), PADDING_AT_LEFT$1 - 14, this.y(marker));
                }
            }
        };
        /** @hidden */
        Heatmap.prototype.updateScale = function () {
            var _a = this, context = _a.context, environment = _a.environment, height = _a.height;
            var scale = this.opts.scale;
            var max = scale === "relative" ? this.localMax : this.opts.max;
            if (max === undefined) {
                if (!this.lastUpdatedScale) {
                    warnOnce$3("A Heatmap with the `scale` option set to 'fixed' should include a `max` option. Defaulting to the number of Agents currently in the Environment.");
                }
                max = environment.getAgents().length;
            }
            if (!this.lastUpdatedScale || +new Date() - +this.lastUpdatedScale > 250) {
                context.clearRect(0, height - 20, PADDING_AT_LEFT$1, 20);
                context.fillStyle = "black";
                context.font = 12 * window.devicePixelRatio + "px Helvetica";
                context.textAlign = "center";
                context.textBaseline = "bottom";
                context.fillText("0", 10, height - 5);
                context.fillText(max.toString(), PADDING_AT_LEFT$1 - 16, height - 5);
                this.lastUpdatedScale = new Date();
            }
        };
        /** @hidden */
        Heatmap.prototype.drawRectangles = function () {
            var _a = this, canvas = _a.canvas, environment = _a.environment, width = _a.width, height = _a.height;
            var _b = this.opts, scale = _b.scale, from = _b.from, to = _b.to;
            var context = canvas.getContext("2d");
            var xBuckets = this.getBuckets("x");
            var yBuckets = this.getBuckets("y");
            var max = scale === "relative" ? this.localMax : this.opts.max;
            if (max === undefined)
                max = environment.getAgents().length;
            // clear background by drawing background rectangle
            context.fillStyle = from;
            context.fillRect(PADDING_AT_LEFT$1, 0, width, height - PADDING_AT_BOTTOM$1);
            var w = width / xBuckets;
            var h = height / yBuckets;
            for (var row = 0; row < yBuckets; row++) {
                for (var column = 0; column < xBuckets; column++) {
                    var index = row * xBuckets + column;
                    // alpha corresponds to the number of agents in the bucket
                    var a = clamp(remap(this.buckets[index], 0, max, 0, 1), 0, 1);
                    context.fillStyle = to;
                    context.globalAlpha = a;
                    context.fillRect(this.x(remap(column, 0, xBuckets, this.getMin("x"), this.getMax("x"))), this.y(remap(row, -1, yBuckets - 1, this.getMin("y"), this.getMax("y"))), (w * (width - PADDING_AT_LEFT$1)) / width, (h * (height - PADDING_AT_BOTTOM$1)) / height);
                }
            }
            context.globalAlpha = 1;
        };
        /** @hidden */
        Heatmap.prototype.resetBuckets = function () {
            for (var i = 0; i < this.getBuckets("x") * this.getBuckets("y"); i++) {
                this.buckets[i] = 0;
            }
        };
        /** @hidden */
        Heatmap.prototype.updateBuckets = function () {
            var _this = this;
            var environment = this.environment;
            var xKey = this.getKey("x");
            var yKey = this.getKey("y");
            var xMin = this.getMin("x");
            var yMin = this.getMin("y");
            var xMax = this.getMax("x");
            var yMax = this.getMax("y");
            var xBuckets = this.getBuckets("x");
            var yBuckets = this.getBuckets("y");
            // reset localMax
            this.localMax = 0;
            // loop over agents and fill appropriate buckets
            environment.getAgents().forEach(function (agent) {
                var xValue = agent.get(xKey);
                var yValue = agent.get(yKey);
                var xBucket = Math.floor(remap(xValue, xMin, xMax, 0, xBuckets - 0.001));
                var yBucket = Math.floor(remap(yValue, yMin, yMax, 0, yBuckets - 0.001));
                if (xBucket >= 0 &&
                    xBucket < xBuckets &&
                    yBucket >= 0 &&
                    yBucket < yBuckets) {
                    var index = xBucket + yBucket * xBuckets;
                    _this.buckets[index]++;
                    if (_this.buckets[index] > _this.localMax) {
                        _this.localMax = _this.buckets[index];
                    }
                }
            });
        };
        Heatmap.prototype.render = function () {
            this.updateBuckets();
            this.drawRectangles();
            this.updateScale();
            // reset
            this.resetBuckets();
        };
        return Heatmap;
    }(AbstractRenderer));

    /**
     * The current version of the Flocc library.
     */
    var version = "0.5.20";

    exports.ASCIIRenderer = ASCIIRenderer;
    exports.Agent = Agent;
    exports.CanvasRenderer = CanvasRenderer;
    exports.Colors = Colors;
    exports.Environment = Environment;
    exports.GridEnvironment = GridEnvironment;
    exports.Heatmap = Heatmap;
    exports.Histogram = Histogram;
    exports.KDTree = KDTree;
    exports.LineChartRenderer = LineChartRenderer;
    exports.Network = Network;
    exports.NumArray = NumArray;
    exports.Rule = Rule;
    exports.TableRenderer = TableRenderer;
    exports.Terrain = Terrain;
    exports.VERSION = version;
    exports.Vector = Vector;
    exports.utils = utils;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
