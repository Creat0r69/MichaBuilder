/*! For license information please see main.js.LICENSE.txt */
(() => {
    var t = {
        505: (t, e, n) => {
            t.exports = n(15)
        }, 592: (t, e, n) => {
            "use strict";
            var r = n(516), i = n(522), o = n(948), a = n(106), s = n(615), u = n(631), c = n(202), f = n(763);
            t.exports = function (t) {
                return new Promise((function (e, n) {
                    var l = t.data, h = t.headers, d = t.responseType;
                    r.isFormData(l) && delete h["Content-Type"];
                    var p = new XMLHttpRequest;
                    if (t.auth) {
                        var g = t.auth.username || "",
                            y = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
                        h.Authorization = "Basic " + btoa(g + ":" + y)
                    }
                    var m = s(t.baseURL, t.url);

                    function v() {
                        if (p) {
                            var r = "getAllResponseHeaders" in p ? u(p.getAllResponseHeaders()) : null, o = {
                                data: d && "text" !== d && "json" !== d ? p.response : p.responseText,
                                status: p.status,
                                statusText: p.statusText,
                                headers: r,
                                config: t,
                                request: p
                            };
                            i(e, n, o), p = null
                        }
                    }

                    if (p.open(t.method.toUpperCase(), a(m, t.params, t.paramsSerializer), !0), p.timeout = t.timeout, "onloadend" in p ? p.onloadend = v : p.onreadystatechange = function () {
                        p && 4 === p.readyState && (0 !== p.status || p.responseURL && 0 === p.responseURL.indexOf("file:")) && setTimeout(v)
                    }, p.onabort = function () {
                        p && (n(f("Request aborted", t, "ECONNABORTED", p)), p = null)
                    }, p.onerror = function () {
                        n(f("Network Error", t, null, p)), p = null
                    }, p.ontimeout = function () {
                        var e = "timeout of " + t.timeout + "ms exceeded";
                        t.timeoutErrorMessage && (e = t.timeoutErrorMessage), n(f(e, t, t.transitional && t.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", p)), p = null
                    }, r.isStandardBrowserEnv()) {
                        var b = (t.withCredentials || c(m)) && t.xsrfCookieName ? o.read(t.xsrfCookieName) : void 0;
                        b && (h[t.xsrfHeaderName] = b)
                    }
                    "setRequestHeader" in p && r.forEach(h, (function (t, e) {
                        void 0 === l && "content-type" === e.toLowerCase() ? delete h[e] : p.setRequestHeader(e, t)
                    })), r.isUndefined(t.withCredentials) || (p.withCredentials = !!t.withCredentials), d && "json" !== d && (p.responseType = t.responseType), "function" == typeof t.onDownloadProgress && p.addEventListener("progress", t.onDownloadProgress), "function" == typeof t.onUploadProgress && p.upload && p.upload.addEventListener("progress", t.onUploadProgress), t.cancelToken && t.cancelToken.promise.then((function (t) {
                        p && (p.abort(), n(t), p = null)
                    })), l || (l = null), p.send(l)
                }))
            }
        }, 15: (t, e, n) => {
            "use strict";
            var r = n(516), i = n(12), o = n(155), a = n(343);

            function s(t) {
                var e = new o(t), n = i(o.prototype.request, e);
                return r.extend(n, o.prototype, e), r.extend(n, e), n
            }

            var u = s(n(987));
            u.Axios = o, u.create = function (t) {
                return s(a(u.defaults, t))
            }, u.Cancel = n(928), u.CancelToken = n(191), u.isCancel = n(864), u.all = function (t) {
                return Promise.all(t)
            }, u.spread = n(980), u.isAxiosError = n(19), t.exports = u, t.exports.default = u
        }, 928: t => {
            "use strict";

            function e(t) {
                this.message = t
            }

            e.prototype.toString = function () {
                return "Cancel" + (this.message ? ": " + this.message : "")
            }, e.prototype.__CANCEL__ = !0, t.exports = e
        }, 191: (t, e, n) => {
            "use strict";
            var r = n(928);

            function i(t) {
                if ("function" != typeof t) throw new TypeError("executor must be a function.");
                var e;
                this.promise = new Promise((function (t) {
                    e = t
                }));
                var n = this;
                t((function (t) {
                    n.reason || (n.reason = new r(t), e(n.reason))
                }))
            }

            i.prototype.throwIfRequested = function () {
                if (this.reason) throw this.reason
            }, i.source = function () {
                var t;
                return {
                    token: new i((function (e) {
                        t = e
                    })), cancel: t
                }
            }, t.exports = i
        }, 864: t => {
            "use strict";
            t.exports = function (t) {
                return !(!t || !t.__CANCEL__)
            }
        }, 155: (t, e, n) => {
            "use strict";
            var r = n(516), i = n(106), o = n(471), a = n(490), s = n(343), u = n(841), c = u.validators;

            function f(t) {
                this.defaults = t, this.interceptors = {request: new o, response: new o}
            }

            f.prototype.request = function (t) {
                "string" == typeof t ? (t = arguments[1] || {}).url = arguments[0] : t = t || {}, (t = s(this.defaults, t)).method ? t.method = t.method.toLowerCase() : this.defaults.method ? t.method = this.defaults.method.toLowerCase() : t.method = "get";
                var e = t.transitional;
                void 0 !== e && u.assertOptions(e, {
                    silentJSONParsing: c.transitional(c.boolean, "1.0.0"),
                    forcedJSONParsing: c.transitional(c.boolean, "1.0.0"),
                    clarifyTimeoutError: c.transitional(c.boolean, "1.0.0")
                }, !1);
                var n = [], r = !0;
                this.interceptors.request.forEach((function (e) {
                    "function" == typeof e.runWhen && !1 === e.runWhen(t) || (r = r && e.synchronous, n.unshift(e.fulfilled, e.rejected))
                }));
                var i, o = [];
                if (this.interceptors.response.forEach((function (t) {
                    o.push(t.fulfilled, t.rejected)
                })), !r) {
                    var f = [a, void 0];
                    for (Array.prototype.unshift.apply(f, n), f = f.concat(o), i = Promise.resolve(t); f.length;) i = i.then(f.shift(), f.shift());
                    return i
                }
                for (var l = t; n.length;) {
                    var h = n.shift(), d = n.shift();
                    try {
                        l = h(l)
                    } catch (t) {
                        d(t);
                        break
                    }
                }
                try {
                    i = a(l)
                } catch (t) {
                    return Promise.reject(t)
                }
                for (; o.length;) i = i.then(o.shift(), o.shift());
                return i
            }, f.prototype.getUri = function (t) {
                return t = s(this.defaults, t), i(t.url, t.params, t.paramsSerializer).replace(/^\?/, "")
            }, r.forEach(["delete", "get", "head", "options"], (function (t) {
                f.prototype[t] = function (e, n) {
                    return this.request(s(n || {}, {method: t, url: e, data: (n || {}).data}))
                }
            })), r.forEach(["post", "put", "patch"], (function (t) {
                f.prototype[t] = function (e, n, r) {
                    return this.request(s(r || {}, {method: t, url: e, data: n}))
                }
            })), t.exports = f
        }, 471: (t, e, n) => {
            "use strict";
            var r = n(516);

            function i() {
                this.handlers = []
            }

            i.prototype.use = function (t, e, n) {
                return this.handlers.push({
                    fulfilled: t,
                    rejected: e,
                    synchronous: !!n && n.synchronous,
                    runWhen: n ? n.runWhen : null
                }), this.handlers.length - 1
            }, i.prototype.eject = function (t) {
                this.handlers[t] && (this.handlers[t] = null)
            }, i.prototype.forEach = function (t) {
                r.forEach(this.handlers, (function (e) {
                    null !== e && t(e)
                }))
            }, t.exports = i
        }, 615: (t, e, n) => {
            "use strict";
            var r = n(137), i = n(680);
            t.exports = function (t, e) {
                return t && !r(e) ? i(t, e) : e
            }
        }, 763: (t, e, n) => {
            "use strict";
            var r = n(449);
            t.exports = function (t, e, n, i, o) {
                var a = new Error(t);
                return r(a, e, n, i, o)
            }
        }, 490: (t, e, n) => {
            "use strict";
            var r = n(516), i = n(881), o = n(864), a = n(987);

            function s(t) {
                t.cancelToken && t.cancelToken.throwIfRequested()
            }

            t.exports = function (t) {
                return s(t), t.headers = t.headers || {}, t.data = i.call(t, t.data, t.headers, t.transformRequest), t.headers = r.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers), r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function (e) {
                    delete t.headers[e]
                })), (t.adapter || a.adapter)(t).then((function (e) {
                    return s(t), e.data = i.call(t, e.data, e.headers, t.transformResponse), e
                }), (function (e) {
                    return o(e) || (s(t), e && e.response && (e.response.data = i.call(t, e.response.data, e.response.headers, t.transformResponse))), Promise.reject(e)
                }))
            }
        }, 449: t => {
            "use strict";
            t.exports = function (t, e, n, r, i) {
                return t.config = e, n && (t.code = n), t.request = r, t.response = i, t.isAxiosError = !0, t.toJSON = function () {
                    return {
                        message: this.message,
                        name: this.name,
                        description: this.description,
                        number: this.number,
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        config: this.config,
                        code: this.code
                    }
                }, t
            }
        }, 343: (t, e, n) => {
            "use strict";
            var r = n(516);
            t.exports = function (t, e) {
                e = e || {};
                var n = {}, i = ["url", "method", "data"], o = ["headers", "auth", "proxy", "params"],
                    a = ["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "timeoutMessage", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "decompress", "maxContentLength", "maxBodyLength", "maxRedirects", "transport", "httpAgent", "httpsAgent", "cancelToken", "socketPath", "responseEncoding"],
                    s = ["validateStatus"];

                function u(t, e) {
                    return r.isPlainObject(t) && r.isPlainObject(e) ? r.merge(t, e) : r.isPlainObject(e) ? r.merge({}, e) : r.isArray(e) ? e.slice() : e
                }

                function c(i) {
                    r.isUndefined(e[i]) ? r.isUndefined(t[i]) || (n[i] = u(void 0, t[i])) : n[i] = u(t[i], e[i])
                }

                r.forEach(i, (function (t) {
                    r.isUndefined(e[t]) || (n[t] = u(void 0, e[t]))
                })), r.forEach(o, c), r.forEach(a, (function (i) {
                    r.isUndefined(e[i]) ? r.isUndefined(t[i]) || (n[i] = u(void 0, t[i])) : n[i] = u(void 0, e[i])
                })), r.forEach(s, (function (r) {
                    r in e ? n[r] = u(t[r], e[r]) : r in t && (n[r] = u(void 0, t[r]))
                }));
                var f = i.concat(o).concat(a).concat(s),
                    l = Object.keys(t).concat(Object.keys(e)).filter((function (t) {
                        return -1 === f.indexOf(t)
                    }));
                return r.forEach(l, c), n
            }
        }, 522: (t, e, n) => {
            "use strict";
            var r = n(763);
            t.exports = function (t, e, n) {
                var i = n.config.validateStatus;
                n.status && i && !i(n.status) ? e(r("Request failed with status code " + n.status, n.config, null, n.request, n)) : t(n)
            }
        }, 881: (t, e, n) => {
            "use strict";
            var r = n(516), i = n(987);
            t.exports = function (t, e, n) {
                var o = this || i;
                return r.forEach(n, (function (n) {
                    t = n.call(o, t, e)
                })), t
            }
        }, 987: (t, e, n) => {
            "use strict";
            var r = n(516), i = n(18), o = n(449), a = {"Content-Type": "application/x-www-form-urlencoded"};

            function s(t, e) {
                !r.isUndefined(t) && r.isUndefined(t["Content-Type"]) && (t["Content-Type"] = e)
            }

            var u, c = {
                transitional: {silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1},
                adapter: (("undefined" != typeof XMLHttpRequest || "undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process)) && (u = n(592)), u),
                transformRequest: [function (t, e) {
                    return i(e, "Accept"), i(e, "Content-Type"), r.isFormData(t) || r.isArrayBuffer(t) || r.isBuffer(t) || r.isStream(t) || r.isFile(t) || r.isBlob(t) ? t : r.isArrayBufferView(t) ? t.buffer : r.isURLSearchParams(t) ? (s(e, "application/x-www-form-urlencoded;charset=utf-8"), t.toString()) : r.isObject(t) || e && "application/json" === e["Content-Type"] ? (s(e, "application/json"), function (t, e, n) {
                        if (r.isString(t)) try {
                            return (0, JSON.parse)(t), r.trim(t)
                        } catch (t) {
                            if ("SyntaxError" !== t.name) throw t
                        }
                        return (0, JSON.stringify)(t)
                    }(t)) : t
                }],
                transformResponse: [function (t) {
                    var e = this.transitional, n = e && e.silentJSONParsing, i = e && e.forcedJSONParsing,
                        a = !n && "json" === this.responseType;
                    if (a || i && r.isString(t) && t.length) try {
                        return JSON.parse(t)
                    } catch (t) {
                        if (a) {
                            if ("SyntaxError" === t.name) throw o(t, this, "E_JSON_PARSE");
                            throw t
                        }
                    }
                    return t
                }],
                timeout: 0,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                maxContentLength: -1,
                maxBodyLength: -1,
                validateStatus: function (t) {
                    return t >= 200 && t < 300
                },
                headers: {common: {Accept: "application/json, text/plain, */*"}}
            };
            r.forEach(["delete", "get", "head"], (function (t) {
                c.headers[t] = {}
            })), r.forEach(["post", "put", "patch"], (function (t) {
                c.headers[t] = r.merge(a)
            })), t.exports = c
        }, 12: t => {
            "use strict";
            t.exports = function (t, e) {
                return function () {
                    for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
                    return t.apply(e, n)
                }
            }
        }, 106: (t, e, n) => {
            "use strict";
            var r = n(516);

            function i(t) {
                return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
            }

            t.exports = function (t, e, n) {
                if (!e) return t;
                var o;
                if (n) o = n(e); else if (r.isURLSearchParams(e)) o = e.toString(); else {
                    var a = [];
                    r.forEach(e, (function (t, e) {
                        null != t && (r.isArray(t) ? e += "[]" : t = [t], r.forEach(t, (function (t) {
                            r.isDate(t) ? t = t.toISOString() : r.isObject(t) && (t = JSON.stringify(t)), a.push(i(e) + "=" + i(t))
                        })))
                    })), o = a.join("&")
                }
                if (o) {
                    var s = t.indexOf("#");
                    -1 !== s && (t = t.slice(0, s)), t += (-1 === t.indexOf("?") ? "?" : "&") + o
                }
                return t
            }
        }, 680: t => {
            "use strict";
            t.exports = function (t, e) {
                return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t
            }
        }, 948: (t, e, n) => {
            "use strict";
            var r = n(516);
            t.exports = r.isStandardBrowserEnv() ? {
                write: function (t, e, n, i, o, a) {
                    var s = [];
                    s.push(t + "=" + encodeURIComponent(e)), r.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), r.isString(i) && s.push("path=" + i), r.isString(o) && s.push("domain=" + o), !0 === a && s.push("secure"), document.cookie = s.join("; ")
                }, read: function (t) {
                    var e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
                    return e ? decodeURIComponent(e[3]) : null
                }, remove: function (t) {
                    this.write(t, "", Date.now() - 864e5)
                }
            } : {
                write: function () {
                }, read: function () {
                    return null
                }, remove: function () {
                }
            }
        }, 137: t => {
            "use strict";
            t.exports = function (t) {
                return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)
            }
        }, 19: t => {
            "use strict";
            t.exports = function (t) {
                return "object" == typeof t && !0 === t.isAxiosError
            }
        }, 202: (t, e, n) => {
            "use strict";
            var r = n(516);
            t.exports = r.isStandardBrowserEnv() ? function () {
                var t, e = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");

                function i(t) {
                    var r = t;
                    return e && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), {
                        href: n.href,
                        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                        host: n.host,
                        search: n.search ? n.search.replace(/^\?/, "") : "",
                        hash: n.hash ? n.hash.replace(/^#/, "") : "",
                        hostname: n.hostname,
                        port: n.port,
                        pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
                    }
                }

                return t = i(window.location.href), function (e) {
                    var n = r.isString(e) ? i(e) : e;
                    return n.protocol === t.protocol && n.host === t.host
                }
            }() : function () {
                return !0
            }
        }, 18: (t, e, n) => {
            "use strict";
            var r = n(516);
            t.exports = function (t, e) {
                r.forEach(t, (function (n, r) {
                    r !== e && r.toUpperCase() === e.toUpperCase() && (t[e] = n, delete t[r])
                }))
            }
        }, 631: (t, e, n) => {
            "use strict";
            var r = n(516),
                i = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
            t.exports = function (t) {
                var e, n, o, a = {};
                return t ? (r.forEach(t.split("\n"), (function (t) {
                    if (o = t.indexOf(":"), e = r.trim(t.substr(0, o)).toLowerCase(), n = r.trim(t.substr(o + 1)), e) {
                        if (a[e] && i.indexOf(e) >= 0) return;
                        a[e] = "set-cookie" === e ? (a[e] ? a[e] : []).concat([n]) : a[e] ? a[e] + ", " + n : n
                    }
                })), a) : a
            }
        }, 980: t => {
            "use strict";
            t.exports = function (t) {
                return function (e) {
                    return t.apply(null, e)
                }
            }
        }, 841: (t, e, n) => {
            "use strict";
            var r = n(198), i = {};
            ["object", "boolean", "number", "function", "string", "symbol"].forEach((function (t, e) {
                i[t] = function (n) {
                    return typeof n === t || "a" + (e < 1 ? "n " : " ") + t
                }
            }));
            var o = {}, a = r.version.split(".");

            function s(t, e) {
                for (var n = e ? e.split(".") : a, r = t.split("."), i = 0; i < 3; i++) {
                    if (n[i] > r[i]) return !0;
                    if (n[i] < r[i]) return !1
                }
                return !1
            }

            i.transitional = function (t, e, n) {
                var i = e && s(e);

                function a(t, e) {
                    return "[Axios v" + r.version + "] Transitional option '" + t + "'" + e + (n ? ". " + n : "")
                }

                return function (n, r, s) {
                    if (!1 === t) throw new Error(a(r, " has been removed in " + e));
                    return i && !o[r] && (o[r] = !0, console.warn(a(r, " has been deprecated since v" + e + " and will be removed in the near future"))), !t || t(n, r, s)
                }
            }, t.exports = {
                isOlderVersion: s, assertOptions: function (t, e, n) {
                    if ("object" != typeof t) throw new TypeError("options must be an object");
                    for (var r = Object.keys(t), i = r.length; i-- > 0;) {
                        var o = r[i], a = e[o];
                        if (a) {
                            var s = t[o], u = void 0 === s || a(s, o, t);
                            if (!0 !== u) throw new TypeError("option " + o + " must be " + u)
                        } else if (!0 !== n) throw Error("Unknown option " + o)
                    }
                }, validators: i
            }
        }, 516: (t, e, n) => {
            "use strict";
            var r = n(12), i = Object.prototype.toString;

            function o(t) {
                return "[object Array]" === i.call(t)
            }

            function a(t) {
                return void 0 === t
            }

            function s(t) {
                return null !== t && "object" == typeof t
            }

            function u(t) {
                if ("[object Object]" !== i.call(t)) return !1;
                var e = Object.getPrototypeOf(t);
                return null === e || e === Object.prototype
            }

            function c(t) {
                return "[object Function]" === i.call(t)
            }

            function f(t, e) {
                if (null != t) if ("object" != typeof t && (t = [t]), o(t)) for (var n = 0, r = t.length; n < r; n++) e.call(null, t[n], n, t); else for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && e.call(null, t[i], i, t)
            }

            t.exports = {
                isArray: o, isArrayBuffer: function (t) {
                    return "[object ArrayBuffer]" === i.call(t)
                }, isBuffer: function (t) {
                    return null !== t && !a(t) && null !== t.constructor && !a(t.constructor) && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t)
                }, isFormData: function (t) {
                    return "undefined" != typeof FormData && t instanceof FormData
                }, isArrayBufferView: function (t) {
                    return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer && t.buffer instanceof ArrayBuffer
                }, isString: function (t) {
                    return "string" == typeof t
                }, isNumber: function (t) {
                    return "number" == typeof t
                }, isObject: s, isPlainObject: u, isUndefined: a, isDate: function (t) {
                    return "[object Date]" === i.call(t)
                }, isFile: function (t) {
                    return "[object File]" === i.call(t)
                }, isBlob: function (t) {
                    return "[object Blob]" === i.call(t)
                }, isFunction: c, isStream: function (t) {
                    return s(t) && c(t.pipe)
                }, isURLSearchParams: function (t) {
                    return "undefined" != typeof URLSearchParams && t instanceof URLSearchParams
                }, isStandardBrowserEnv: function () {
                    return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document
                }, forEach: f, merge: function t() {
                    var e = {};

                    function n(n, r) {
                        u(e[r]) && u(n) ? e[r] = t(e[r], n) : u(n) ? e[r] = t({}, n) : o(n) ? e[r] = n.slice() : e[r] = n
                    }

                    for (var r = 0, i = arguments.length; r < i; r++) f(arguments[r], n);
                    return e
                }, extend: function (t, e, n) {
                    return f(e, (function (e, i) {
                        t[i] = n && "function" == typeof e ? r(e, n) : e
                    })), t
                }, trim: function (t) {
                    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                }, stripBOM: function (t) {
                    return 65279 === t.charCodeAt(0) && (t = t.slice(1)), t
                }
            }
        }, 198: t => {
            "use strict";
            t.exports = JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}')
        }
    }, e = {};

    function n(r) {
        var i = e[r];
        if (void 0 !== i) return i.exports;
        var o = e[r] = {exports: {}};
        return t[r](o, o.exports, n), o.exports
    }

    n.n = t => {
        var e = t && t.__esModule ? () => t.default : () => t;
        return n.d(e, {a: e}), e
    }, n.d = (t, e) => {
        for (var r in e) n.o(e, r) && !n.o(t, r) && Object.defineProperty(t, r, {enumerable: !0, get: e[r]})
    }, n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), (() => {
        "use strict";
        var t = {
            386: (t, e, n) => {
                e._O = e.Jq = e.KB = e.u8 = e.cv = void 0, e.Ik = e.A9 = e.n_ = e.gM = void 0;
                const r = n(764);

                function i(t) {
                    if (!(t instanceof Uint8Array)) throw new TypeError("b must be a Uint8Array")
                }

                function o(t) {
                    return i(t), r.Buffer.from(t.buffer, t.byteOffset, t.length)
                }

                class a {
                    constructor(t, e) {
                        if (!Number.isInteger(t)) throw new TypeError("span must be an integer");
                        this.span = t, this.property = e
                    }

                    makeDestinationObject() {
                        return {}
                    }

                    getSpan(t, e) {
                        if (0 > this.span) throw new RangeError("indeterminate span");
                        return this.span
                    }

                    replicate(t) {
                        const e = Object.create(this.constructor.prototype);
                        return Object.assign(e, this), e.property = t, e
                    }

                    fromArray(t) {
                    }
                }

                class s extends a {
                    isCount() {
                        throw new Error("ExternalLayout is abstract")
                    }
                }

                class u extends s {
                    constructor(t, e = 0, n) {
                        if (!(t instanceof a)) throw new TypeError("layout must be a Layout");
                        if (!Number.isInteger(e)) throw new TypeError("offset must be integer or undefined");
                        super(t.span, n || t.property), this.layout = t, this.offset = e
                    }

                    isCount() {
                        return this.layout instanceof c || this.layout instanceof f
                    }

                    decode(t, e = 0) {
                        return this.layout.decode(t, e + this.offset)
                    }

                    encode(t, e, n = 0) {
                        return this.layout.encode(t, e, n + this.offset)
                    }
                }

                class c extends a {
                    constructor(t, e) {
                        if (super(t, e), 6 < this.span) throw new RangeError("span must not exceed 6 bytes")
                    }

                    decode(t, e = 0) {
                        return o(t).readUIntLE(e, this.span)
                    }

                    encode(t, e, n = 0) {
                        return o(e).writeUIntLE(t, n, this.span), this.span
                    }
                }

                class f extends a {
                    constructor(t, e) {
                        if (super(t, e), 6 < this.span) throw new RangeError("span must not exceed 6 bytes")
                    }

                    decode(t, e = 0) {
                        return o(t).readUIntBE(e, this.span)
                    }

                    encode(t, e, n = 0) {
                        return o(e).writeUIntBE(t, n, this.span), this.span
                    }
                }

                const l = Math.pow(2, 32);

                function h(t) {
                    const e = Math.floor(t / l);
                    return {hi32: e, lo32: t - e * l}
                }

                function d(t, e) {
                    return t * l + e
                }

                class p extends a {
                    constructor(t) {
                        super(8, t)
                    }

                    decode(t, e = 0) {
                        const n = o(t), r = n.readUInt32LE(e);
                        return d(n.readUInt32LE(e + 4), r)
                    }

                    encode(t, e, n = 0) {
                        const r = h(t), i = o(e);
                        return i.writeUInt32LE(r.lo32, n), i.writeUInt32LE(r.hi32, n + 4), 8
                    }
                }

                class g extends a {
                    constructor(t) {
                        super(8, t)
                    }

                    decode(t, e = 0) {
                        const n = o(t), r = n.readUInt32LE(e);
                        return d(n.readInt32LE(e + 4), r)
                    }

                    encode(t, e, n = 0) {
                        const r = h(t), i = o(e);
                        return i.writeUInt32LE(r.lo32, n), i.writeInt32LE(r.hi32, n + 4), 8
                    }
                }

                class y extends a {
                    constructor(t, e, n) {
                        if (!(t instanceof a)) throw new TypeError("elementLayout must be a Layout");
                        if (!(e instanceof s && e.isCount() || Number.isInteger(e) && 0 <= e)) throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");
                        let r = -1;
                        !(e instanceof s) && 0 < t.span && (r = e * t.span), super(r, n), this.elementLayout = t, this.count = e
                    }

                    getSpan(t, e = 0) {
                        if (0 <= this.span) return this.span;
                        let n = 0, r = this.count;
                        if (r instanceof s && (r = r.decode(t, e)), 0 < this.elementLayout.span) n = r * this.elementLayout.span; else {
                            let i = 0;
                            for (; i < r;) n += this.elementLayout.getSpan(t, e + n), ++i
                        }
                        return n
                    }

                    decode(t, e = 0) {
                        const n = [];
                        let r = 0, i = this.count;
                        for (i instanceof s && (i = i.decode(t, e)); r < i;) n.push(this.elementLayout.decode(t, e)), e += this.elementLayout.getSpan(t, e), r += 1;
                        return n
                    }

                    encode(t, e, n = 0) {
                        const r = this.elementLayout, i = t.reduce(((t, i) => t + r.encode(i, e, n + t)), 0);
                        return this.count instanceof s && this.count.encode(t.length, e, n), i
                    }
                }

                class m extends a {
                    constructor(t, e, n) {
                        if (!Array.isArray(t) || !t.reduce(((t, e) => t && e instanceof a), !0)) throw new TypeError("fields must be array of Layout instances");
                        "boolean" == typeof e && void 0 === n && (n = e, e = void 0);
                        for (const e of t) if (0 > e.span && void 0 === e.property) throw new Error("fields cannot contain unnamed variable-length layout");
                        let r = -1;
                        try {
                            r = t.reduce(((t, e) => t + e.getSpan()), 0)
                        } catch (t) {
                        }
                        super(r, e), this.fields = t, this.decodePrefixes = !!n
                    }

                    getSpan(t, e = 0) {
                        if (0 <= this.span) return this.span;
                        let n = 0;
                        try {
                            n = this.fields.reduce(((n, r) => {
                                const i = r.getSpan(t, e);
                                return e += i, n + i
                            }), 0)
                        } catch (t) {
                            throw new RangeError("indeterminate span")
                        }
                        return n
                    }

                    decode(t, e = 0) {
                        i(t);
                        const n = this.makeDestinationObject();
                        for (const r of this.fields) if (void 0 !== r.property && (n[r.property] = r.decode(t, e)), e += r.getSpan(t, e), this.decodePrefixes && t.length === e) break;
                        return n
                    }

                    encode(t, e, n = 0) {
                        const r = n;
                        let i = 0, o = 0;
                        for (const r of this.fields) {
                            let a = r.span;
                            if (o = 0 < a ? a : 0, void 0 !== r.property) {
                                const i = t[r.property];
                                void 0 !== i && (o = r.encode(i, e, n), 0 > a && (a = r.getSpan(e, n)))
                            }
                            i = n, n += a
                        }
                        return i + o - r
                    }

                    fromArray(t) {
                        const e = this.makeDestinationObject();
                        for (const n of this.fields) void 0 !== n.property && 0 < t.length && (e[n.property] = t.shift());
                        return e
                    }

                    layoutFor(t) {
                        if ("string" != typeof t) throw new TypeError("property must be string");
                        for (const e of this.fields) if (e.property === t) return e
                    }

                    offsetOf(t) {
                        if ("string" != typeof t) throw new TypeError("property must be string");
                        let e = 0;
                        for (const n of this.fields) {
                            if (n.property === t) return e;
                            0 > n.span ? e = -1 : 0 <= e && (e += n.span)
                        }
                    }
                }

                class v extends a {
                    constructor(t, e) {
                        if (!(t instanceof s && t.isCount() || Number.isInteger(t) && 0 <= t)) throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");
                        let n = -1;
                        t instanceof s || (n = t), super(n, e), this.length = t
                    }

                    getSpan(t, e) {
                        let n = this.span;
                        return 0 > n && (n = this.length.decode(t, e)), n
                    }

                    decode(t, e = 0) {
                        let n = this.span;
                        return 0 > n && (n = this.length.decode(t, e)), o(t).slice(e, e + n)
                    }

                    encode(t, e, n) {
                        let r = this.length;
                        if (this.length instanceof s && (r = t.length), !(t instanceof Uint8Array && r === t.length)) throw new TypeError(function (t, e) {
                            return e.property ? t + "[" + e.property + "]" : t
                        }("Blob.encode", this) + " requires (length " + r + ") Uint8Array as src");
                        if (n + r > e.length) throw new RangeError("encoding overruns Uint8Array");
                        const i = o(t);
                        return o(e).write(i.toString("hex"), n, r, "hex"), this.length instanceof s && this.length.encode(r, e, n), r
                    }
                }

                e.cv = (t, e, n) => new u(t, e, n), e.u8 = t => new c(1, t), e.KB = t => new c(2, t), e.Jq = t => new c(4, t), e._O = t => new p(t), e.gM = t => new g(t), e.n_ = (t, e, n) => new m(t, e, n), e.A9 = (t, e, n) => new y(t, e, n), e.Ik = (t, e) => new v(t, e)
            }, 162: (t, e, n) => {
                var r = n(509).Buffer;
                t.exports = function (t) {
                    if (t.length >= 255) throw new TypeError("Alphabet too long");
                    for (var e = new Uint8Array(256), n = 0; n < e.length; n++) e[n] = 255;
                    for (var i = 0; i < t.length; i++) {
                        var o = t.charAt(i), a = o.charCodeAt(0);
                        if (255 !== e[a]) throw new TypeError(o + " is ambiguous");
                        e[a] = i
                    }
                    var s = t.length, u = t.charAt(0), c = Math.log(s) / Math.log(256), f = Math.log(256) / Math.log(s);

                    function l(t) {
                        if ("string" != typeof t) throw new TypeError("Expected String");
                        if (0 === t.length) return r.alloc(0);
                        for (var n = 0, i = 0, o = 0; t[n] === u;) i++, n++;
                        for (var a = (t.length - n) * c + 1 >>> 0, f = new Uint8Array(a); t[n];) {
                            var l = e[t.charCodeAt(n)];
                            if (255 === l) return;
                            for (var h = 0, d = a - 1; (0 !== l || h < o) && -1 !== d; d--, h++) l += s * f[d] >>> 0, f[d] = l % 256 >>> 0, l = l / 256 >>> 0;
                            if (0 !== l) throw new Error("Non-zero carry");
                            o = h, n++
                        }
                        for (var p = a - o; p !== a && 0 === f[p];) p++;
                        var g = r.allocUnsafe(i + (a - p));
                        g.fill(0, 0, i);
                        for (var y = i; p !== a;) g[y++] = f[p++];
                        return g
                    }

                    return {
                        encode: function (e) {
                            if ((Array.isArray(e) || e instanceof Uint8Array) && (e = r.from(e)), !r.isBuffer(e)) throw new TypeError("Expected Buffer");
                            if (0 === e.length) return "";
                            for (var n = 0, i = 0, o = 0, a = e.length; o !== a && 0 === e[o];) o++, n++;
                            for (var c = (a - o) * f + 1 >>> 0, l = new Uint8Array(c); o !== a;) {
                                for (var h = e[o], d = 0, p = c - 1; (0 !== h || d < i) && -1 !== p; p--, d++) h += 256 * l[p] >>> 0, l[p] = h % s >>> 0, h = h / s >>> 0;
                                if (0 !== h) throw new Error("Non-zero carry");
                                i = d, o++
                            }
                            for (var g = c - i; g !== c && 0 === l[g];) g++;
                            for (var y = u.repeat(n); g < c; ++g) y += t.charAt(l[g]);
                            return y
                        }, decodeUnsafe: l, decode: function (t) {
                            var e = l(t);
                            if (e) return e;
                            throw new Error("Non-base" + s + " character")
                        }
                    }
                }
            }, 742: (t, e) => {
                e.byteLength = function (t) {
                    var e = s(t), n = e[0], r = e[1];
                    return 3 * (n + r) / 4 - r
                }, e.toByteArray = function (t) {
                    var e, n, o = s(t), a = o[0], u = o[1], c = new i(function (t, e, n) {
                        return 3 * (e + n) / 4 - n
                    }(0, a, u)), f = 0, l = u > 0 ? a - 4 : a;
                    for (n = 0; n < l; n += 4) e = r[t.charCodeAt(n)] << 18 | r[t.charCodeAt(n + 1)] << 12 | r[t.charCodeAt(n + 2)] << 6 | r[t.charCodeAt(n + 3)], c[f++] = e >> 16 & 255, c[f++] = e >> 8 & 255, c[f++] = 255 & e;
                    return 2 === u && (e = r[t.charCodeAt(n)] << 2 | r[t.charCodeAt(n + 1)] >> 4, c[f++] = 255 & e), 1 === u && (e = r[t.charCodeAt(n)] << 10 | r[t.charCodeAt(n + 1)] << 4 | r[t.charCodeAt(n + 2)] >> 2, c[f++] = e >> 8 & 255, c[f++] = 255 & e), c
                }, e.fromByteArray = function (t) {
                    for (var e, r = t.length, i = r % 3, o = [], a = 16383, s = 0, c = r - i; s < c; s += a) o.push(u(t, s, s + a > c ? c : s + a));
                    return 1 === i ? (e = t[r - 1], o.push(n[e >> 2] + n[e << 4 & 63] + "==")) : 2 === i && (e = (t[r - 2] << 8) + t[r - 1], o.push(n[e >> 10] + n[e >> 4 & 63] + n[e << 2 & 63] + "=")), o.join("")
                };
                for (var n = [], r = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0; a < 64; ++a) n[a] = o[a], r[o.charCodeAt(a)] = a;

                function s(t) {
                    var e = t.length;
                    if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                    var n = t.indexOf("=");
                    return -1 === n && (n = e), [n, n === e ? 0 : 4 - n % 4]
                }

                function u(t, e, r) {
                    for (var i, o, a = [], s = e; s < r; s += 3) i = (t[s] << 16 & 16711680) + (t[s + 1] << 8 & 65280) + (255 & t[s + 2]), a.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);
                    return a.join("")
                }

                r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63
            }, 475: (t, e) => {
                e.oU = function (t) {
                    {
                        const e = Buffer.from(t);
                        e.reverse();
                        const n = e.toString("hex");
                        return 0 === n.length ? BigInt(0) : BigInt(`0x${n}`)
                    }
                }, e.k$ = function (t, e) {
                    {
                        const n = t.toString(16), r = Buffer.from(n.padStart(2 * e, "0").slice(0, 2 * e), "hex");
                        return r.reverse(), r
                    }
                }
            }, 550: function (t, e, n) {
                !function (t, e) {
                    function r(t, e) {
                        if (!t) throw new Error(e || "Assertion failed")
                    }

                    function i(t, e) {
                        t.super_ = e;
                        var n = function () {
                        };
                        n.prototype = e.prototype, t.prototype = new n, t.prototype.constructor = t
                    }

                    function o(t, e, n) {
                        if (o.isBN(t)) return t;
                        this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== e && "be" !== e || (n = e, e = 10), this._init(t || 0, e || 10, n || "be"))
                    }

                    var a;
                    "object" == typeof t ? t.exports = o : e.BN = o, o.BN = o, o.wordSize = 26;
                    try {
                        a = "undefined" != typeof window && void 0 !== window.Buffer ? window.Buffer : n(601).Buffer
                    } catch (t) {
                    }

                    function s(t, e) {
                        var n = t.charCodeAt(e);
                        return n >= 48 && n <= 57 ? n - 48 : n >= 65 && n <= 70 ? n - 55 : n >= 97 && n <= 102 ? n - 87 : void r(!1, "Invalid character in " + t)
                    }

                    function u(t, e, n) {
                        var r = s(t, n);
                        return n - 1 >= e && (r |= s(t, n - 1) << 4), r
                    }

                    function c(t, e, n, i) {
                        for (var o = 0, a = 0, s = Math.min(t.length, n), u = e; u < s; u++) {
                            var c = t.charCodeAt(u) - 48;
                            o *= i, a = c >= 49 ? c - 49 + 10 : c >= 17 ? c - 17 + 10 : c, r(c >= 0 && a < i, "Invalid character"), o += a
                        }
                        return o
                    }

                    function f(t, e) {
                        t.words = e.words, t.length = e.length, t.negative = e.negative, t.red = e.red
                    }

                    if (o.isBN = function (t) {
                        return t instanceof o || null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words)
                    }, o.max = function (t, e) {
                        return t.cmp(e) > 0 ? t : e
                    }, o.min = function (t, e) {
                        return t.cmp(e) < 0 ? t : e
                    }, o.prototype._init = function (t, e, n) {
                        if ("number" == typeof t) return this._initNumber(t, e, n);
                        if ("object" == typeof t) return this._initArray(t, e, n);
                        "hex" === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36);
                        var i = 0;
                        "-" === (t = t.toString().replace(/\s+/g, ""))[0] && (i++, this.negative = 1), i < t.length && (16 === e ? this._parseHex(t, i, n) : (this._parseBase(t, e, i), "le" === n && this._initArray(this.toArray(), e, n)))
                    }, o.prototype._initNumber = function (t, e, n) {
                        t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (r(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === n && this._initArray(this.toArray(), e, n)
                    }, o.prototype._initArray = function (t, e, n) {
                        if (r("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                        this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                        for (var i = 0; i < this.length; i++) this.words[i] = 0;
                        var o, a, s = 0;
                        if ("be" === n) for (i = t.length - 1, o = 0; i >= 0; i -= 3) a = t[i] | t[i - 1] << 8 | t[i - 2] << 16, this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, o++); else if ("le" === n) for (i = 0, o = 0; i < t.length; i += 3) a = t[i] | t[i + 1] << 8 | t[i + 2] << 16, this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, o++);
                        return this._strip()
                    }, o.prototype._parseHex = function (t, e, n) {
                        this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
                        for (var r = 0; r < this.length; r++) this.words[r] = 0;
                        var i, o = 0, a = 0;
                        if ("be" === n) for (r = t.length - 1; r >= e; r -= 2) i = u(t, e, r) << o, this.words[a] |= 67108863 & i, o >= 18 ? (o -= 18, a += 1, this.words[a] |= i >>> 26) : o += 8; else for (r = (t.length - e) % 2 == 0 ? e + 1 : e; r < t.length; r += 2) i = u(t, e, r) << o, this.words[a] |= 67108863 & i, o >= 18 ? (o -= 18, a += 1, this.words[a] |= i >>> 26) : o += 8;
                        this._strip()
                    }, o.prototype._parseBase = function (t, e, n) {
                        this.words = [0], this.length = 1;
                        for (var r = 0, i = 1; i <= 67108863; i *= e) r++;
                        r--, i = i / e | 0;
                        for (var o = t.length - n, a = o % r, s = Math.min(o, o - a) + n, u = 0, f = n; f < s; f += r) u = c(t, f, f + r, e), this.imuln(i), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
                        if (0 !== a) {
                            var l = 1;
                            for (u = c(t, f, t.length, e), f = 0; f < a; f++) l *= e;
                            this.imuln(l), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u)
                        }
                        this._strip()
                    }, o.prototype.copy = function (t) {
                        t.words = new Array(this.length);
                        for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
                        t.length = this.length, t.negative = this.negative, t.red = this.red
                    }, o.prototype._move = function (t) {
                        f(t, this)
                    }, o.prototype.clone = function () {
                        var t = new o(null);
                        return this.copy(t), t
                    }, o.prototype._expand = function (t) {
                        for (; this.length < t;) this.words[this.length++] = 0;
                        return this
                    }, o.prototype._strip = function () {
                        for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                        return this._normSign()
                    }, o.prototype._normSign = function () {
                        return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
                    }, "undefined" != typeof Symbol && "function" == typeof Symbol.for) try {
                        o.prototype[Symbol.for("nodejs.util.inspect.custom")] = l
                    } catch (t) {
                        o.prototype.inspect = l
                    } else o.prototype.inspect = l;

                    function l() {
                        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
                    }

                    var h = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                        d = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                        p = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

                    function g(t, e, n) {
                        n.negative = e.negative ^ t.negative;
                        var r = t.length + e.length | 0;
                        n.length = r, r = r - 1 | 0;
                        var i = 0 | t.words[0], o = 0 | e.words[0], a = i * o, s = 67108863 & a, u = a / 67108864 | 0;
                        n.words[0] = s;
                        for (var c = 1; c < r; c++) {
                            for (var f = u >>> 26, l = 67108863 & u, h = Math.min(c, e.length - 1), d = Math.max(0, c - t.length + 1); d <= h; d++) {
                                var p = c - d | 0;
                                f += (a = (i = 0 | t.words[p]) * (o = 0 | e.words[d]) + l) / 67108864 | 0, l = 67108863 & a
                            }
                            n.words[c] = 0 | l, u = 0 | f
                        }
                        return 0 !== u ? n.words[c] = 0 | u : n.length--, n._strip()
                    }

                    o.prototype.toString = function (t, e) {
                        var n;
                        if (e = 0 | e || 1, 16 === (t = t || 10) || "hex" === t) {
                            n = "";
                            for (var i = 0, o = 0, a = 0; a < this.length; a++) {
                                var s = this.words[a], u = (16777215 & (s << i | o)).toString(16);
                                o = s >>> 24 - i & 16777215, (i += 2) >= 26 && (i -= 26, a--), n = 0 !== o || a !== this.length - 1 ? h[6 - u.length] + u + n : u + n
                            }
                            for (0 !== o && (n = o.toString(16) + n); n.length % e != 0;) n = "0" + n;
                            return 0 !== this.negative && (n = "-" + n), n
                        }
                        if (t === (0 | t) && t >= 2 && t <= 36) {
                            var c = d[t], f = p[t];
                            n = "";
                            var l = this.clone();
                            for (l.negative = 0; !l.isZero();) {
                                var g = l.modrn(f).toString(t);
                                n = (l = l.idivn(f)).isZero() ? g + n : h[c - g.length] + g + n
                            }
                            for (this.isZero() && (n = "0" + n); n.length % e != 0;) n = "0" + n;
                            return 0 !== this.negative && (n = "-" + n), n
                        }
                        r(!1, "Base should be between 2 and 36")
                    }, o.prototype.toNumber = function () {
                        var t = this.words[0];
                        return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
                    }, o.prototype.toJSON = function () {
                        return this.toString(16, 2)
                    }, a && (o.prototype.toBuffer = function (t, e) {
                        return this.toArrayLike(a, t, e)
                    }), o.prototype.toArray = function (t, e) {
                        return this.toArrayLike(Array, t, e)
                    }, o.prototype.toArrayLike = function (t, e, n) {
                        this._strip();
                        var i = this.byteLength(), o = n || Math.max(1, i);
                        r(i <= o, "byte array longer than desired length"), r(o > 0, "Requested array length <= 0");
                        var a = function (t, e) {
                            return t.allocUnsafe ? t.allocUnsafe(e) : new t(e)
                        }(t, o);
                        return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](a, i), a
                    }, o.prototype._toArrayLikeLE = function (t, e) {
                        for (var n = 0, r = 0, i = 0, o = 0; i < this.length; i++) {
                            var a = this.words[i] << o | r;
                            t[n++] = 255 & a, n < t.length && (t[n++] = a >> 8 & 255), n < t.length && (t[n++] = a >> 16 & 255), 6 === o ? (n < t.length && (t[n++] = a >> 24 & 255), r = 0, o = 0) : (r = a >>> 24, o += 2)
                        }
                        if (n < t.length) for (t[n++] = r; n < t.length;) t[n++] = 0
                    }, o.prototype._toArrayLikeBE = function (t, e) {
                        for (var n = t.length - 1, r = 0, i = 0, o = 0; i < this.length; i++) {
                            var a = this.words[i] << o | r;
                            t[n--] = 255 & a, n >= 0 && (t[n--] = a >> 8 & 255), n >= 0 && (t[n--] = a >> 16 & 255), 6 === o ? (n >= 0 && (t[n--] = a >> 24 & 255), r = 0, o = 0) : (r = a >>> 24, o += 2)
                        }
                        if (n >= 0) for (t[n--] = r; n >= 0;) t[n--] = 0
                    }, Math.clz32 ? o.prototype._countBits = function (t) {
                        return 32 - Math.clz32(t)
                    } : o.prototype._countBits = function (t) {
                        var e = t, n = 0;
                        return e >= 4096 && (n += 13, e >>>= 13), e >= 64 && (n += 7, e >>>= 7), e >= 8 && (n += 4, e >>>= 4), e >= 2 && (n += 2, e >>>= 2), n + e
                    }, o.prototype._zeroBits = function (t) {
                        if (0 === t) return 26;
                        var e = t, n = 0;
                        return !(8191 & e) && (n += 13, e >>>= 13), !(127 & e) && (n += 7, e >>>= 7), !(15 & e) && (n += 4, e >>>= 4), !(3 & e) && (n += 2, e >>>= 2), !(1 & e) && n++, n
                    }, o.prototype.bitLength = function () {
                        var t = this.words[this.length - 1], e = this._countBits(t);
                        return 26 * (this.length - 1) + e
                    }, o.prototype.zeroBits = function () {
                        if (this.isZero()) return 0;
                        for (var t = 0, e = 0; e < this.length; e++) {
                            var n = this._zeroBits(this.words[e]);
                            if (t += n, 26 !== n) break
                        }
                        return t
                    }, o.prototype.byteLength = function () {
                        return Math.ceil(this.bitLength() / 8)
                    }, o.prototype.toTwos = function (t) {
                        return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
                    }, o.prototype.fromTwos = function (t) {
                        return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
                    }, o.prototype.isNeg = function () {
                        return 0 !== this.negative
                    }, o.prototype.neg = function () {
                        return this.clone().ineg()
                    }, o.prototype.ineg = function () {
                        return this.isZero() || (this.negative ^= 1), this
                    }, o.prototype.iuor = function (t) {
                        for (; this.length < t.length;) this.words[this.length++] = 0;
                        for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
                        return this._strip()
                    }, o.prototype.ior = function (t) {
                        return r(!(this.negative | t.negative)), this.iuor(t)
                    }, o.prototype.or = function (t) {
                        return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
                    }, o.prototype.uor = function (t) {
                        return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
                    }, o.prototype.iuand = function (t) {
                        var e;
                        e = this.length > t.length ? t : this;
                        for (var n = 0; n < e.length; n++) this.words[n] = this.words[n] & t.words[n];
                        return this.length = e.length, this._strip()
                    }, o.prototype.iand = function (t) {
                        return r(!(this.negative | t.negative)), this.iuand(t)
                    }, o.prototype.and = function (t) {
                        return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
                    }, o.prototype.uand = function (t) {
                        return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
                    }, o.prototype.iuxor = function (t) {
                        var e, n;
                        this.length > t.length ? (e = this, n = t) : (e = t, n = this);
                        for (var r = 0; r < n.length; r++) this.words[r] = e.words[r] ^ n.words[r];
                        if (this !== e) for (; r < e.length; r++) this.words[r] = e.words[r];
                        return this.length = e.length, this._strip()
                    }, o.prototype.ixor = function (t) {
                        return r(!(this.negative | t.negative)), this.iuxor(t)
                    }, o.prototype.xor = function (t) {
                        return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
                    }, o.prototype.uxor = function (t) {
                        return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
                    }, o.prototype.inotn = function (t) {
                        r("number" == typeof t && t >= 0);
                        var e = 0 | Math.ceil(t / 26), n = t % 26;
                        this._expand(e), n > 0 && e--;
                        for (var i = 0; i < e; i++) this.words[i] = 67108863 & ~this.words[i];
                        return n > 0 && (this.words[i] = ~this.words[i] & 67108863 >> 26 - n), this._strip()
                    }, o.prototype.notn = function (t) {
                        return this.clone().inotn(t)
                    }, o.prototype.setn = function (t, e) {
                        r("number" == typeof t && t >= 0);
                        var n = t / 26 | 0, i = t % 26;
                        return this._expand(n + 1), this.words[n] = e ? this.words[n] | 1 << i : this.words[n] & ~(1 << i), this._strip()
                    }, o.prototype.iadd = function (t) {
                        var e, n, r;
                        if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
                        if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
                        this.length > t.length ? (n = this, r = t) : (n = t, r = this);
                        for (var i = 0, o = 0; o < r.length; o++) e = (0 | n.words[o]) + (0 | r.words[o]) + i, this.words[o] = 67108863 & e, i = e >>> 26;
                        for (; 0 !== i && o < n.length; o++) e = (0 | n.words[o]) + i, this.words[o] = 67108863 & e, i = e >>> 26;
                        if (this.length = n.length, 0 !== i) this.words[this.length] = i, this.length++; else if (n !== this) for (; o < n.length; o++) this.words[o] = n.words[o];
                        return this
                    }, o.prototype.add = function (t) {
                        var e;
                        return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
                    }, o.prototype.isub = function (t) {
                        if (0 !== t.negative) {
                            t.negative = 0;
                            var e = this.iadd(t);
                            return t.negative = 1, e._normSign()
                        }
                        if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                        var n, r, i = this.cmp(t);
                        if (0 === i) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                        i > 0 ? (n = this, r = t) : (n = t, r = this);
                        for (var o = 0, a = 0; a < r.length; a++) o = (e = (0 | n.words[a]) - (0 | r.words[a]) + o) >> 26, this.words[a] = 67108863 & e;
                        for (; 0 !== o && a < n.length; a++) o = (e = (0 | n.words[a]) + o) >> 26, this.words[a] = 67108863 & e;
                        if (0 === o && a < n.length && n !== this) for (; a < n.length; a++) this.words[a] = n.words[a];
                        return this.length = Math.max(this.length, a), n !== this && (this.negative = 1), this._strip()
                    }, o.prototype.sub = function (t) {
                        return this.clone().isub(t)
                    };
                    var y = function (t, e, n) {
                        var r, i, o, a = t.words, s = e.words, u = n.words, c = 0, f = 0 | a[0], l = 8191 & f,
                            h = f >>> 13, d = 0 | a[1], p = 8191 & d, g = d >>> 13, y = 0 | a[2], m = 8191 & y,
                            v = y >>> 13, b = 0 | a[3], w = 8191 & b, x = b >>> 13, k = 0 | a[4], E = 8191 & k,
                            A = k >>> 13, S = 0 | a[5], I = 8191 & S, B = S >>> 13, M = 0 | a[6], O = 8191 & M,
                            _ = M >>> 13, T = 0 | a[7], L = 8191 & T, P = T >>> 13, $ = 0 | a[8], j = 8191 & $,
                            C = $ >>> 13, R = 0 | a[9], U = 8191 & R, z = R >>> 13, N = 0 | s[0], W = 8191 & N,
                            q = N >>> 13, K = 0 | s[1], D = 8191 & K, F = K >>> 13, H = 0 | s[2], V = 8191 & H,
                            J = H >>> 13, Z = 0 | s[3], G = 8191 & Z, Y = Z >>> 13, X = 0 | s[4], Q = 8191 & X,
                            tt = X >>> 13, et = 0 | s[5], nt = 8191 & et, rt = et >>> 13, it = 0 | s[6], ot = 8191 & it,
                            at = it >>> 13, st = 0 | s[7], ut = 8191 & st, ct = st >>> 13, ft = 0 | s[8],
                            lt = 8191 & ft, ht = ft >>> 13, dt = 0 | s[9], pt = 8191 & dt, gt = dt >>> 13;
                        n.negative = t.negative ^ e.negative, n.length = 19;
                        var yt = (c + (r = Math.imul(l, W)) | 0) + ((8191 & (i = (i = Math.imul(l, q)) + Math.imul(h, W) | 0)) << 13) | 0;
                        c = ((o = Math.imul(h, q)) + (i >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, r = Math.imul(p, W), i = (i = Math.imul(p, q)) + Math.imul(g, W) | 0, o = Math.imul(g, q);
                        var mt = (c + (r = r + Math.imul(l, D) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, F) | 0) + Math.imul(h, D) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(h, F) | 0) + (i >>> 13) | 0) + (mt >>> 26) | 0, mt &= 67108863, r = Math.imul(m, W), i = (i = Math.imul(m, q)) + Math.imul(v, W) | 0, o = Math.imul(v, q), r = r + Math.imul(p, D) | 0, i = (i = i + Math.imul(p, F) | 0) + Math.imul(g, D) | 0, o = o + Math.imul(g, F) | 0;
                        var vt = (c + (r = r + Math.imul(l, V) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, J) | 0) + Math.imul(h, V) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(h, J) | 0) + (i >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, r = Math.imul(w, W), i = (i = Math.imul(w, q)) + Math.imul(x, W) | 0, o = Math.imul(x, q), r = r + Math.imul(m, D) | 0, i = (i = i + Math.imul(m, F) | 0) + Math.imul(v, D) | 0, o = o + Math.imul(v, F) | 0, r = r + Math.imul(p, V) | 0, i = (i = i + Math.imul(p, J) | 0) + Math.imul(g, V) | 0, o = o + Math.imul(g, J) | 0;
                        var bt = (c + (r = r + Math.imul(l, G) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, Y) | 0) + Math.imul(h, G) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(h, Y) | 0) + (i >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, r = Math.imul(E, W), i = (i = Math.imul(E, q)) + Math.imul(A, W) | 0, o = Math.imul(A, q), r = r + Math.imul(w, D) | 0, i = (i = i + Math.imul(w, F) | 0) + Math.imul(x, D) | 0, o = o + Math.imul(x, F) | 0, r = r + Math.imul(m, V) | 0, i = (i = i + Math.imul(m, J) | 0) + Math.imul(v, V) | 0, o = o + Math.imul(v, J) | 0, r = r + Math.imul(p, G) | 0, i = (i = i + Math.imul(p, Y) | 0) + Math.imul(g, G) | 0, o = o + Math.imul(g, Y) | 0;
                        var wt = (c + (r = r + Math.imul(l, Q) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, tt) | 0) + Math.imul(h, Q) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(h, tt) | 0) + (i >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, r = Math.imul(I, W), i = (i = Math.imul(I, q)) + Math.imul(B, W) | 0, o = Math.imul(B, q), r = r + Math.imul(E, D) | 0, i = (i = i + Math.imul(E, F) | 0) + Math.imul(A, D) | 0, o = o + Math.imul(A, F) | 0, r = r + Math.imul(w, V) | 0, i = (i = i + Math.imul(w, J) | 0) + Math.imul(x, V) | 0, o = o + Math.imul(x, J) | 0, r = r + Math.imul(m, G) | 0, i = (i = i + Math.imul(m, Y) | 0) + Math.imul(v, G) | 0, o = o + Math.imul(v, Y) | 0, r = r + Math.imul(p, Q) | 0, i = (i = i + Math.imul(p, tt) | 0) + Math.imul(g, Q) | 0, o = o + Math.imul(g, tt) | 0;
                        var xt = (c + (r = r + Math.imul(l, nt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, rt) | 0) + Math.imul(h, nt) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(h, rt) | 0) + (i >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, r = Math.imul(O, W), i = (i = Math.imul(O, q)) + Math.imul(_, W) | 0, o = Math.imul(_, q), r = r + Math.imul(I, D) | 0, i = (i = i + Math.imul(I, F) | 0) + Math.imul(B, D) | 0, o = o + Math.imul(B, F) | 0, r = r + Math.imul(E, V) | 0, i = (i = i + Math.imul(E, J) | 0) + Math.imul(A, V) | 0, o = o + Math.imul(A, J) | 0, r = r + Math.imul(w, G) | 0, i = (i = i + Math.imul(w, Y) | 0) + Math.imul(x, G) | 0, o = o + Math.imul(x, Y) | 0, r = r + Math.imul(m, Q) | 0, i = (i = i + Math.imul(m, tt) | 0) + Math.imul(v, Q) | 0, o = o + Math.imul(v, tt) | 0, r = r + Math.imul(p, nt) | 0, i = (i = i + Math.imul(p, rt) | 0) + Math.imul(g, nt) | 0, o = o + Math.imul(g, rt) | 0;
                        var kt = (c + (r = r + Math.imul(l, ot) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, at) | 0) + Math.imul(h, ot) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(h, at) | 0) + (i >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, r = Math.imul(L, W), i = (i = Math.imul(L, q)) + Math.imul(P, W) | 0, o = Math.imul(P, q), r = r + Math.imul(O, D) | 0, i = (i = i + Math.imul(O, F) | 0) + Math.imul(_, D) | 0, o = o + Math.imul(_, F) | 0, r = r + Math.imul(I, V) | 0, i = (i = i + Math.imul(I, J) | 0) + Math.imul(B, V) | 0, o = o + Math.imul(B, J) | 0, r = r + Math.imul(E, G) | 0, i = (i = i + Math.imul(E, Y) | 0) + Math.imul(A, G) | 0, o = o + Math.imul(A, Y) | 0, r = r + Math.imul(w, Q) | 0, i = (i = i + Math.imul(w, tt) | 0) + Math.imul(x, Q) | 0, o = o + Math.imul(x, tt) | 0, r = r + Math.imul(m, nt) | 0, i = (i = i + Math.imul(m, rt) | 0) + Math.imul(v, nt) | 0, o = o + Math.imul(v, rt) | 0, r = r + Math.imul(p, ot) | 0, i = (i = i + Math.imul(p, at) | 0) + Math.imul(g, ot) | 0, o = o + Math.imul(g, at) | 0;
                        var Et = (c + (r = r + Math.imul(l, ut) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, ct) | 0) + Math.imul(h, ut) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(h, ct) | 0) + (i >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, r = Math.imul(j, W), i = (i = Math.imul(j, q)) + Math.imul(C, W) | 0, o = Math.imul(C, q), r = r + Math.imul(L, D) | 0, i = (i = i + Math.imul(L, F) | 0) + Math.imul(P, D) | 0, o = o + Math.imul(P, F) | 0, r = r + Math.imul(O, V) | 0, i = (i = i + Math.imul(O, J) | 0) + Math.imul(_, V) | 0, o = o + Math.imul(_, J) | 0, r = r + Math.imul(I, G) | 0, i = (i = i + Math.imul(I, Y) | 0) + Math.imul(B, G) | 0, o = o + Math.imul(B, Y) | 0, r = r + Math.imul(E, Q) | 0, i = (i = i + Math.imul(E, tt) | 0) + Math.imul(A, Q) | 0, o = o + Math.imul(A, tt) | 0, r = r + Math.imul(w, nt) | 0, i = (i = i + Math.imul(w, rt) | 0) + Math.imul(x, nt) | 0, o = o + Math.imul(x, rt) | 0, r = r + Math.imul(m, ot) | 0, i = (i = i + Math.imul(m, at) | 0) + Math.imul(v, ot) | 0, o = o + Math.imul(v, at) | 0, r = r + Math.imul(p, ut) | 0, i = (i = i + Math.imul(p, ct) | 0) + Math.imul(g, ut) | 0, o = o + Math.imul(g, ct) | 0;
                        var At = (c + (r = r + Math.imul(l, lt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, ht) | 0) + Math.imul(h, lt) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(h, ht) | 0) + (i >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, r = Math.imul(U, W), i = (i = Math.imul(U, q)) + Math.imul(z, W) | 0, o = Math.imul(z, q), r = r + Math.imul(j, D) | 0, i = (i = i + Math.imul(j, F) | 0) + Math.imul(C, D) | 0, o = o + Math.imul(C, F) | 0, r = r + Math.imul(L, V) | 0, i = (i = i + Math.imul(L, J) | 0) + Math.imul(P, V) | 0, o = o + Math.imul(P, J) | 0, r = r + Math.imul(O, G) | 0, i = (i = i + Math.imul(O, Y) | 0) + Math.imul(_, G) | 0, o = o + Math.imul(_, Y) | 0, r = r + Math.imul(I, Q) | 0, i = (i = i + Math.imul(I, tt) | 0) + Math.imul(B, Q) | 0, o = o + Math.imul(B, tt) | 0, r = r + Math.imul(E, nt) | 0, i = (i = i + Math.imul(E, rt) | 0) + Math.imul(A, nt) | 0, o = o + Math.imul(A, rt) | 0, r = r + Math.imul(w, ot) | 0, i = (i = i + Math.imul(w, at) | 0) + Math.imul(x, ot) | 0, o = o + Math.imul(x, at) | 0, r = r + Math.imul(m, ut) | 0, i = (i = i + Math.imul(m, ct) | 0) + Math.imul(v, ut) | 0, o = o + Math.imul(v, ct) | 0, r = r + Math.imul(p, lt) | 0, i = (i = i + Math.imul(p, ht) | 0) + Math.imul(g, lt) | 0, o = o + Math.imul(g, ht) | 0;
                        var St = (c + (r = r + Math.imul(l, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(l, gt) | 0) + Math.imul(h, pt) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(h, gt) | 0) + (i >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, r = Math.imul(U, D), i = (i = Math.imul(U, F)) + Math.imul(z, D) | 0, o = Math.imul(z, F), r = r + Math.imul(j, V) | 0, i = (i = i + Math.imul(j, J) | 0) + Math.imul(C, V) | 0, o = o + Math.imul(C, J) | 0, r = r + Math.imul(L, G) | 0, i = (i = i + Math.imul(L, Y) | 0) + Math.imul(P, G) | 0, o = o + Math.imul(P, Y) | 0, r = r + Math.imul(O, Q) | 0, i = (i = i + Math.imul(O, tt) | 0) + Math.imul(_, Q) | 0, o = o + Math.imul(_, tt) | 0, r = r + Math.imul(I, nt) | 0, i = (i = i + Math.imul(I, rt) | 0) + Math.imul(B, nt) | 0, o = o + Math.imul(B, rt) | 0, r = r + Math.imul(E, ot) | 0, i = (i = i + Math.imul(E, at) | 0) + Math.imul(A, ot) | 0, o = o + Math.imul(A, at) | 0, r = r + Math.imul(w, ut) | 0, i = (i = i + Math.imul(w, ct) | 0) + Math.imul(x, ut) | 0, o = o + Math.imul(x, ct) | 0, r = r + Math.imul(m, lt) | 0, i = (i = i + Math.imul(m, ht) | 0) + Math.imul(v, lt) | 0, o = o + Math.imul(v, ht) | 0;
                        var It = (c + (r = r + Math.imul(p, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(p, gt) | 0) + Math.imul(g, pt) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(g, gt) | 0) + (i >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, r = Math.imul(U, V), i = (i = Math.imul(U, J)) + Math.imul(z, V) | 0, o = Math.imul(z, J), r = r + Math.imul(j, G) | 0, i = (i = i + Math.imul(j, Y) | 0) + Math.imul(C, G) | 0, o = o + Math.imul(C, Y) | 0, r = r + Math.imul(L, Q) | 0, i = (i = i + Math.imul(L, tt) | 0) + Math.imul(P, Q) | 0, o = o + Math.imul(P, tt) | 0, r = r + Math.imul(O, nt) | 0, i = (i = i + Math.imul(O, rt) | 0) + Math.imul(_, nt) | 0, o = o + Math.imul(_, rt) | 0, r = r + Math.imul(I, ot) | 0, i = (i = i + Math.imul(I, at) | 0) + Math.imul(B, ot) | 0, o = o + Math.imul(B, at) | 0, r = r + Math.imul(E, ut) | 0, i = (i = i + Math.imul(E, ct) | 0) + Math.imul(A, ut) | 0, o = o + Math.imul(A, ct) | 0, r = r + Math.imul(w, lt) | 0, i = (i = i + Math.imul(w, ht) | 0) + Math.imul(x, lt) | 0, o = o + Math.imul(x, ht) | 0;
                        var Bt = (c + (r = r + Math.imul(m, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(m, gt) | 0) + Math.imul(v, pt) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(v, gt) | 0) + (i >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, r = Math.imul(U, G), i = (i = Math.imul(U, Y)) + Math.imul(z, G) | 0, o = Math.imul(z, Y), r = r + Math.imul(j, Q) | 0, i = (i = i + Math.imul(j, tt) | 0) + Math.imul(C, Q) | 0, o = o + Math.imul(C, tt) | 0, r = r + Math.imul(L, nt) | 0, i = (i = i + Math.imul(L, rt) | 0) + Math.imul(P, nt) | 0, o = o + Math.imul(P, rt) | 0, r = r + Math.imul(O, ot) | 0, i = (i = i + Math.imul(O, at) | 0) + Math.imul(_, ot) | 0, o = o + Math.imul(_, at) | 0, r = r + Math.imul(I, ut) | 0, i = (i = i + Math.imul(I, ct) | 0) + Math.imul(B, ut) | 0, o = o + Math.imul(B, ct) | 0, r = r + Math.imul(E, lt) | 0, i = (i = i + Math.imul(E, ht) | 0) + Math.imul(A, lt) | 0, o = o + Math.imul(A, ht) | 0;
                        var Mt = (c + (r = r + Math.imul(w, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(w, gt) | 0) + Math.imul(x, pt) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(x, gt) | 0) + (i >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, r = Math.imul(U, Q), i = (i = Math.imul(U, tt)) + Math.imul(z, Q) | 0, o = Math.imul(z, tt), r = r + Math.imul(j, nt) | 0, i = (i = i + Math.imul(j, rt) | 0) + Math.imul(C, nt) | 0, o = o + Math.imul(C, rt) | 0, r = r + Math.imul(L, ot) | 0, i = (i = i + Math.imul(L, at) | 0) + Math.imul(P, ot) | 0, o = o + Math.imul(P, at) | 0, r = r + Math.imul(O, ut) | 0, i = (i = i + Math.imul(O, ct) | 0) + Math.imul(_, ut) | 0, o = o + Math.imul(_, ct) | 0, r = r + Math.imul(I, lt) | 0, i = (i = i + Math.imul(I, ht) | 0) + Math.imul(B, lt) | 0, o = o + Math.imul(B, ht) | 0;
                        var Ot = (c + (r = r + Math.imul(E, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(E, gt) | 0) + Math.imul(A, pt) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(A, gt) | 0) + (i >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, r = Math.imul(U, nt), i = (i = Math.imul(U, rt)) + Math.imul(z, nt) | 0, o = Math.imul(z, rt), r = r + Math.imul(j, ot) | 0, i = (i = i + Math.imul(j, at) | 0) + Math.imul(C, ot) | 0, o = o + Math.imul(C, at) | 0, r = r + Math.imul(L, ut) | 0, i = (i = i + Math.imul(L, ct) | 0) + Math.imul(P, ut) | 0, o = o + Math.imul(P, ct) | 0, r = r + Math.imul(O, lt) | 0, i = (i = i + Math.imul(O, ht) | 0) + Math.imul(_, lt) | 0, o = o + Math.imul(_, ht) | 0;
                        var _t = (c + (r = r + Math.imul(I, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(I, gt) | 0) + Math.imul(B, pt) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(B, gt) | 0) + (i >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, r = Math.imul(U, ot), i = (i = Math.imul(U, at)) + Math.imul(z, ot) | 0, o = Math.imul(z, at), r = r + Math.imul(j, ut) | 0, i = (i = i + Math.imul(j, ct) | 0) + Math.imul(C, ut) | 0, o = o + Math.imul(C, ct) | 0, r = r + Math.imul(L, lt) | 0, i = (i = i + Math.imul(L, ht) | 0) + Math.imul(P, lt) | 0, o = o + Math.imul(P, ht) | 0;
                        var Tt = (c + (r = r + Math.imul(O, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(O, gt) | 0) + Math.imul(_, pt) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(_, gt) | 0) + (i >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, r = Math.imul(U, ut), i = (i = Math.imul(U, ct)) + Math.imul(z, ut) | 0, o = Math.imul(z, ct), r = r + Math.imul(j, lt) | 0, i = (i = i + Math.imul(j, ht) | 0) + Math.imul(C, lt) | 0, o = o + Math.imul(C, ht) | 0;
                        var Lt = (c + (r = r + Math.imul(L, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(L, gt) | 0) + Math.imul(P, pt) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(P, gt) | 0) + (i >>> 13) | 0) + (Lt >>> 26) | 0, Lt &= 67108863, r = Math.imul(U, lt), i = (i = Math.imul(U, ht)) + Math.imul(z, lt) | 0, o = Math.imul(z, ht);
                        var Pt = (c + (r = r + Math.imul(j, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(j, gt) | 0) + Math.imul(C, pt) | 0)) << 13) | 0;
                        c = ((o = o + Math.imul(C, gt) | 0) + (i >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863;
                        var $t = (c + (r = Math.imul(U, pt)) | 0) + ((8191 & (i = (i = Math.imul(U, gt)) + Math.imul(z, pt) | 0)) << 13) | 0;
                        return c = ((o = Math.imul(z, gt)) + (i >>> 13) | 0) + ($t >>> 26) | 0, $t &= 67108863, u[0] = yt, u[1] = mt, u[2] = vt, u[3] = bt, u[4] = wt, u[5] = xt, u[6] = kt, u[7] = Et, u[8] = At, u[9] = St, u[10] = It, u[11] = Bt, u[12] = Mt, u[13] = Ot, u[14] = _t, u[15] = Tt, u[16] = Lt, u[17] = Pt, u[18] = $t, 0 !== c && (u[19] = c, n.length++), n
                    };

                    function m(t, e, n) {
                        n.negative = e.negative ^ t.negative, n.length = t.length + e.length;
                        for (var r = 0, i = 0, o = 0; o < n.length - 1; o++) {
                            var a = i;
                            i = 0;
                            for (var s = 67108863 & r, u = Math.min(o, e.length - 1), c = Math.max(0, o - t.length + 1); c <= u; c++) {
                                var f = o - c, l = (0 | t.words[f]) * (0 | e.words[c]), h = 67108863 & l;
                                s = 67108863 & (h = h + s | 0), i += (a = (a = a + (l / 67108864 | 0) | 0) + (h >>> 26) | 0) >>> 26, a &= 67108863
                            }
                            n.words[o] = s, r = a, a = i
                        }
                        return 0 !== r ? n.words[o] = r : n.length--, n._strip()
                    }

                    function v(t, e, n) {
                        return m(t, e, n)
                    }

                    function b(t, e) {
                        this.x = t, this.y = e
                    }

                    Math.imul || (y = g), o.prototype.mulTo = function (t, e) {
                        var n = this.length + t.length;
                        return 10 === this.length && 10 === t.length ? y(this, t, e) : n < 63 ? g(this, t, e) : n < 1024 ? m(this, t, e) : v(this, t, e)
                    }, b.prototype.makeRBT = function (t) {
                        for (var e = new Array(t), n = o.prototype._countBits(t) - 1, r = 0; r < t; r++) e[r] = this.revBin(r, n, t);
                        return e
                    }, b.prototype.revBin = function (t, e, n) {
                        if (0 === t || t === n - 1) return t;
                        for (var r = 0, i = 0; i < e; i++) r |= (1 & t) << e - i - 1, t >>= 1;
                        return r
                    }, b.prototype.permute = function (t, e, n, r, i, o) {
                        for (var a = 0; a < o; a++) r[a] = e[t[a]], i[a] = n[t[a]]
                    }, b.prototype.transform = function (t, e, n, r, i, o) {
                        this.permute(o, t, e, n, r, i);
                        for (var a = 1; a < i; a <<= 1) for (var s = a << 1, u = Math.cos(2 * Math.PI / s), c = Math.sin(2 * Math.PI / s), f = 0; f < i; f += s) for (var l = u, h = c, d = 0; d < a; d++) {
                            var p = n[f + d], g = r[f + d], y = n[f + d + a], m = r[f + d + a], v = l * y - h * m;
                            m = l * m + h * y, y = v, n[f + d] = p + y, r[f + d] = g + m, n[f + d + a] = p - y, r[f + d + a] = g - m, d !== s && (v = u * l - c * h, h = u * h + c * l, l = v)
                        }
                    }, b.prototype.guessLen13b = function (t, e) {
                        var n = 1 | Math.max(e, t), r = 1 & n, i = 0;
                        for (n = n / 2 | 0; n; n >>>= 1) i++;
                        return 1 << i + 1 + r
                    }, b.prototype.conjugate = function (t, e, n) {
                        if (!(n <= 1)) for (var r = 0; r < n / 2; r++) {
                            var i = t[r];
                            t[r] = t[n - r - 1], t[n - r - 1] = i, i = e[r], e[r] = -e[n - r - 1], e[n - r - 1] = -i
                        }
                    }, b.prototype.normalize13b = function (t, e) {
                        for (var n = 0, r = 0; r < e / 2; r++) {
                            var i = 8192 * Math.round(t[2 * r + 1] / e) + Math.round(t[2 * r] / e) + n;
                            t[r] = 67108863 & i, n = i < 67108864 ? 0 : i / 67108864 | 0
                        }
                        return t
                    }, b.prototype.convert13b = function (t, e, n, i) {
                        for (var o = 0, a = 0; a < e; a++) o += 0 | t[a], n[2 * a] = 8191 & o, o >>>= 13, n[2 * a + 1] = 8191 & o, o >>>= 13;
                        for (a = 2 * e; a < i; ++a) n[a] = 0;
                        r(0 === o), r(!(-8192 & o))
                    }, b.prototype.stub = function (t) {
                        for (var e = new Array(t), n = 0; n < t; n++) e[n] = 0;
                        return e
                    }, b.prototype.mulp = function (t, e, n) {
                        var r = 2 * this.guessLen13b(t.length, e.length), i = this.makeRBT(r), o = this.stub(r),
                            a = new Array(r), s = new Array(r), u = new Array(r), c = new Array(r), f = new Array(r),
                            l = new Array(r), h = n.words;
                        h.length = r, this.convert13b(t.words, t.length, a, r), this.convert13b(e.words, e.length, c, r), this.transform(a, o, s, u, r, i), this.transform(c, o, f, l, r, i);
                        for (var d = 0; d < r; d++) {
                            var p = s[d] * f[d] - u[d] * l[d];
                            u[d] = s[d] * l[d] + u[d] * f[d], s[d] = p
                        }
                        return this.conjugate(s, u, r), this.transform(s, u, h, o, r, i), this.conjugate(h, o, r), this.normalize13b(h, r), n.negative = t.negative ^ e.negative, n.length = t.length + e.length, n._strip()
                    }, o.prototype.mul = function (t) {
                        var e = new o(null);
                        return e.words = new Array(this.length + t.length), this.mulTo(t, e)
                    }, o.prototype.mulf = function (t) {
                        var e = new o(null);
                        return e.words = new Array(this.length + t.length), v(this, t, e)
                    }, o.prototype.imul = function (t) {
                        return this.clone().mulTo(t, this)
                    }, o.prototype.imuln = function (t) {
                        var e = t < 0;
                        e && (t = -t), r("number" == typeof t), r(t < 67108864);
                        for (var n = 0, i = 0; i < this.length; i++) {
                            var o = (0 | this.words[i]) * t, a = (67108863 & o) + (67108863 & n);
                            n >>= 26, n += o / 67108864 | 0, n += a >>> 26, this.words[i] = 67108863 & a
                        }
                        return 0 !== n && (this.words[i] = n, this.length++), e ? this.ineg() : this
                    }, o.prototype.muln = function (t) {
                        return this.clone().imuln(t)
                    }, o.prototype.sqr = function () {
                        return this.mul(this)
                    }, o.prototype.isqr = function () {
                        return this.imul(this.clone())
                    }, o.prototype.pow = function (t) {
                        var e = function (t) {
                            for (var e = new Array(t.bitLength()), n = 0; n < e.length; n++) {
                                var r = n / 26 | 0, i = n % 26;
                                e[n] = t.words[r] >>> i & 1
                            }
                            return e
                        }(t);
                        if (0 === e.length) return new o(1);
                        for (var n = this, r = 0; r < e.length && 0 === e[r]; r++, n = n.sqr()) ;
                        if (++r < e.length) for (var i = n.sqr(); r < e.length; r++, i = i.sqr()) 0 !== e[r] && (n = n.mul(i));
                        return n
                    }, o.prototype.iushln = function (t) {
                        r("number" == typeof t && t >= 0);
                        var e, n = t % 26, i = (t - n) / 26, o = 67108863 >>> 26 - n << 26 - n;
                        if (0 !== n) {
                            var a = 0;
                            for (e = 0; e < this.length; e++) {
                                var s = this.words[e] & o, u = (0 | this.words[e]) - s << n;
                                this.words[e] = u | a, a = s >>> 26 - n
                            }
                            a && (this.words[e] = a, this.length++)
                        }
                        if (0 !== i) {
                            for (e = this.length - 1; e >= 0; e--) this.words[e + i] = this.words[e];
                            for (e = 0; e < i; e++) this.words[e] = 0;
                            this.length += i
                        }
                        return this._strip()
                    }, o.prototype.ishln = function (t) {
                        return r(0 === this.negative), this.iushln(t)
                    }, o.prototype.iushrn = function (t, e, n) {
                        var i;
                        r("number" == typeof t && t >= 0), i = e ? (e - e % 26) / 26 : 0;
                        var o = t % 26, a = Math.min((t - o) / 26, this.length), s = 67108863 ^ 67108863 >>> o << o,
                            u = n;
                        if (i -= a, i = Math.max(0, i), u) {
                            for (var c = 0; c < a; c++) u.words[c] = this.words[c];
                            u.length = a
                        }
                        if (0 === a) ; else if (this.length > a) for (this.length -= a, c = 0; c < this.length; c++) this.words[c] = this.words[c + a]; else this.words[0] = 0, this.length = 1;
                        var f = 0;
                        for (c = this.length - 1; c >= 0 && (0 !== f || c >= i); c--) {
                            var l = 0 | this.words[c];
                            this.words[c] = f << 26 - o | l >>> o, f = l & s
                        }
                        return u && 0 !== f && (u.words[u.length++] = f), 0 === this.length && (this.words[0] = 0, this.length = 1), this._strip()
                    }, o.prototype.ishrn = function (t, e, n) {
                        return r(0 === this.negative), this.iushrn(t, e, n)
                    }, o.prototype.shln = function (t) {
                        return this.clone().ishln(t)
                    }, o.prototype.ushln = function (t) {
                        return this.clone().iushln(t)
                    }, o.prototype.shrn = function (t) {
                        return this.clone().ishrn(t)
                    }, o.prototype.ushrn = function (t) {
                        return this.clone().iushrn(t)
                    }, o.prototype.testn = function (t) {
                        r("number" == typeof t && t >= 0);
                        var e = t % 26, n = (t - e) / 26, i = 1 << e;
                        return !(this.length <= n || !(this.words[n] & i))
                    }, o.prototype.imaskn = function (t) {
                        r("number" == typeof t && t >= 0);
                        var e = t % 26, n = (t - e) / 26;
                        if (r(0 === this.negative, "imaskn works only with positive numbers"), this.length <= n) return this;
                        if (0 !== e && n++, this.length = Math.min(n, this.length), 0 !== e) {
                            var i = 67108863 ^ 67108863 >>> e << e;
                            this.words[this.length - 1] &= i
                        }
                        return this._strip()
                    }, o.prototype.maskn = function (t) {
                        return this.clone().imaskn(t)
                    }, o.prototype.iaddn = function (t) {
                        return r("number" == typeof t), r(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) <= t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t)
                    }, o.prototype._iaddn = function (t) {
                        this.words[0] += t;
                        for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                        return this.length = Math.max(this.length, e + 1), this
                    }, o.prototype.isubn = function (t) {
                        if (r("number" == typeof t), r(t < 67108864), t < 0) return this.iaddn(-t);
                        if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                        if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1; else for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
                        return this._strip()
                    }, o.prototype.addn = function (t) {
                        return this.clone().iaddn(t)
                    }, o.prototype.subn = function (t) {
                        return this.clone().isubn(t)
                    }, o.prototype.iabs = function () {
                        return this.negative = 0, this
                    }, o.prototype.abs = function () {
                        return this.clone().iabs()
                    }, o.prototype._ishlnsubmul = function (t, e, n) {
                        var i, o, a = t.length + n;
                        this._expand(a);
                        var s = 0;
                        for (i = 0; i < t.length; i++) {
                            o = (0 | this.words[i + n]) + s;
                            var u = (0 | t.words[i]) * e;
                            s = ((o -= 67108863 & u) >> 26) - (u / 67108864 | 0), this.words[i + n] = 67108863 & o
                        }
                        for (; i < this.length - n; i++) s = (o = (0 | this.words[i + n]) + s) >> 26, this.words[i + n] = 67108863 & o;
                        if (0 === s) return this._strip();
                        for (r(-1 === s), s = 0, i = 0; i < this.length; i++) s = (o = -(0 | this.words[i]) + s) >> 26, this.words[i] = 67108863 & o;
                        return this.negative = 1, this._strip()
                    }, o.prototype._wordDiv = function (t, e) {
                        var n = (this.length, t.length), r = this.clone(), i = t, a = 0 | i.words[i.length - 1];
                        0 != (n = 26 - this._countBits(a)) && (i = i.ushln(n), r.iushln(n), a = 0 | i.words[i.length - 1]);
                        var s, u = r.length - i.length;
                        if ("mod" !== e) {
                            (s = new o(null)).length = u + 1, s.words = new Array(s.length);
                            for (var c = 0; c < s.length; c++) s.words[c] = 0
                        }
                        var f = r.clone()._ishlnsubmul(i, 1, u);
                        0 === f.negative && (r = f, s && (s.words[u] = 1));
                        for (var l = u - 1; l >= 0; l--) {
                            var h = 67108864 * (0 | r.words[i.length + l]) + (0 | r.words[i.length + l - 1]);
                            for (h = Math.min(h / a | 0, 67108863), r._ishlnsubmul(i, h, l); 0 !== r.negative;) h--, r.negative = 0, r._ishlnsubmul(i, 1, l), r.isZero() || (r.negative ^= 1);
                            s && (s.words[l] = h)
                        }
                        return s && s._strip(), r._strip(), "div" !== e && 0 !== n && r.iushrn(n), {
                            div: s || null,
                            mod: r
                        }
                    }, o.prototype.divmod = function (t, e, n) {
                        return r(!t.isZero()), this.isZero() ? {
                            div: new o(0),
                            mod: new o(0)
                        } : 0 !== this.negative && 0 === t.negative ? (s = this.neg().divmod(t, e), "mod" !== e && (i = s.div.neg()), "div" !== e && (a = s.mod.neg(), n && 0 !== a.negative && a.iadd(t)), {
                            div: i,
                            mod: a
                        }) : 0 === this.negative && 0 !== t.negative ? (s = this.divmod(t.neg(), e), "mod" !== e && (i = s.div.neg()), {
                            div: i,
                            mod: s.mod
                        }) : this.negative & t.negative ? (s = this.neg().divmod(t.neg(), e), "div" !== e && (a = s.mod.neg(), n && 0 !== a.negative && a.isub(t)), {
                            div: s.div,
                            mod: a
                        }) : t.length > this.length || this.cmp(t) < 0 ? {
                            div: new o(0),
                            mod: this
                        } : 1 === t.length ? "div" === e ? {
                            div: this.divn(t.words[0]),
                            mod: null
                        } : "mod" === e ? {div: null, mod: new o(this.modrn(t.words[0]))} : {
                            div: this.divn(t.words[0]),
                            mod: new o(this.modrn(t.words[0]))
                        } : this._wordDiv(t, e);
                        var i, a, s
                    }, o.prototype.div = function (t) {
                        return this.divmod(t, "div", !1).div
                    }, o.prototype.mod = function (t) {
                        return this.divmod(t, "mod", !1).mod
                    }, o.prototype.umod = function (t) {
                        return this.divmod(t, "mod", !0).mod
                    }, o.prototype.divRound = function (t) {
                        var e = this.divmod(t);
                        if (e.mod.isZero()) return e.div;
                        var n = 0 !== e.div.negative ? e.mod.isub(t) : e.mod, r = t.ushrn(1), i = t.andln(1),
                            o = n.cmp(r);
                        return o < 0 || 1 === i && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
                    }, o.prototype.modrn = function (t) {
                        var e = t < 0;
                        e && (t = -t), r(t <= 67108863);
                        for (var n = (1 << 26) % t, i = 0, o = this.length - 1; o >= 0; o--) i = (n * i + (0 | this.words[o])) % t;
                        return e ? -i : i
                    }, o.prototype.modn = function (t) {
                        return this.modrn(t)
                    }, o.prototype.idivn = function (t) {
                        var e = t < 0;
                        e && (t = -t), r(t <= 67108863);
                        for (var n = 0, i = this.length - 1; i >= 0; i--) {
                            var o = (0 | this.words[i]) + 67108864 * n;
                            this.words[i] = o / t | 0, n = o % t
                        }
                        return this._strip(), e ? this.ineg() : this
                    }, o.prototype.divn = function (t) {
                        return this.clone().idivn(t)
                    }, o.prototype.egcd = function (t) {
                        r(0 === t.negative), r(!t.isZero());
                        var e = this, n = t.clone();
                        e = 0 !== e.negative ? e.umod(t) : e.clone();
                        for (var i = new o(1), a = new o(0), s = new o(0), u = new o(1), c = 0; e.isEven() && n.isEven();) e.iushrn(1), n.iushrn(1), ++c;
                        for (var f = n.clone(), l = e.clone(); !e.isZero();) {
                            for (var h = 0, d = 1; !(e.words[0] & d) && h < 26; ++h, d <<= 1) ;
                            if (h > 0) for (e.iushrn(h); h-- > 0;) (i.isOdd() || a.isOdd()) && (i.iadd(f), a.isub(l)), i.iushrn(1), a.iushrn(1);
                            for (var p = 0, g = 1; !(n.words[0] & g) && p < 26; ++p, g <<= 1) ;
                            if (p > 0) for (n.iushrn(p); p-- > 0;) (s.isOdd() || u.isOdd()) && (s.iadd(f), u.isub(l)), s.iushrn(1), u.iushrn(1);
                            e.cmp(n) >= 0 ? (e.isub(n), i.isub(s), a.isub(u)) : (n.isub(e), s.isub(i), u.isub(a))
                        }
                        return {a: s, b: u, gcd: n.iushln(c)}
                    }, o.prototype._invmp = function (t) {
                        r(0 === t.negative), r(!t.isZero());
                        var e = this, n = t.clone();
                        e = 0 !== e.negative ? e.umod(t) : e.clone();
                        for (var i, a = new o(1), s = new o(0), u = n.clone(); e.cmpn(1) > 0 && n.cmpn(1) > 0;) {
                            for (var c = 0, f = 1; !(e.words[0] & f) && c < 26; ++c, f <<= 1) ;
                            if (c > 0) for (e.iushrn(c); c-- > 0;) a.isOdd() && a.iadd(u), a.iushrn(1);
                            for (var l = 0, h = 1; !(n.words[0] & h) && l < 26; ++l, h <<= 1) ;
                            if (l > 0) for (n.iushrn(l); l-- > 0;) s.isOdd() && s.iadd(u), s.iushrn(1);
                            e.cmp(n) >= 0 ? (e.isub(n), a.isub(s)) : (n.isub(e), s.isub(a))
                        }
                        return (i = 0 === e.cmpn(1) ? a : s).cmpn(0) < 0 && i.iadd(t), i
                    }, o.prototype.gcd = function (t) {
                        if (this.isZero()) return t.abs();
                        if (t.isZero()) return this.abs();
                        var e = this.clone(), n = t.clone();
                        e.negative = 0, n.negative = 0;
                        for (var r = 0; e.isEven() && n.isEven(); r++) e.iushrn(1), n.iushrn(1);
                        for (; ;) {
                            for (; e.isEven();) e.iushrn(1);
                            for (; n.isEven();) n.iushrn(1);
                            var i = e.cmp(n);
                            if (i < 0) {
                                var o = e;
                                e = n, n = o
                            } else if (0 === i || 0 === n.cmpn(1)) break;
                            e.isub(n)
                        }
                        return n.iushln(r)
                    }, o.prototype.invm = function (t) {
                        return this.egcd(t).a.umod(t)
                    }, o.prototype.isEven = function () {
                        return !(1 & this.words[0])
                    }, o.prototype.isOdd = function () {
                        return !(1 & ~this.words[0])
                    }, o.prototype.andln = function (t) {
                        return this.words[0] & t
                    }, o.prototype.bincn = function (t) {
                        r("number" == typeof t);
                        var e = t % 26, n = (t - e) / 26, i = 1 << e;
                        if (this.length <= n) return this._expand(n + 1), this.words[n] |= i, this;
                        for (var o = i, a = n; 0 !== o && a < this.length; a++) {
                            var s = 0 | this.words[a];
                            o = (s += o) >>> 26, s &= 67108863, this.words[a] = s
                        }
                        return 0 !== o && (this.words[a] = o, this.length++), this
                    }, o.prototype.isZero = function () {
                        return 1 === this.length && 0 === this.words[0]
                    }, o.prototype.cmpn = function (t) {
                        var e, n = t < 0;
                        if (0 !== this.negative && !n) return -1;
                        if (0 === this.negative && n) return 1;
                        if (this._strip(), this.length > 1) e = 1; else {
                            n && (t = -t), r(t <= 67108863, "Number is too big");
                            var i = 0 | this.words[0];
                            e = i === t ? 0 : i < t ? -1 : 1
                        }
                        return 0 !== this.negative ? 0 | -e : e
                    }, o.prototype.cmp = function (t) {
                        if (0 !== this.negative && 0 === t.negative) return -1;
                        if (0 === this.negative && 0 !== t.negative) return 1;
                        var e = this.ucmp(t);
                        return 0 !== this.negative ? 0 | -e : e
                    }, o.prototype.ucmp = function (t) {
                        if (this.length > t.length) return 1;
                        if (this.length < t.length) return -1;
                        for (var e = 0, n = this.length - 1; n >= 0; n--) {
                            var r = 0 | this.words[n], i = 0 | t.words[n];
                            if (r !== i) {
                                r < i ? e = -1 : r > i && (e = 1);
                                break
                            }
                        }
                        return e
                    }, o.prototype.gtn = function (t) {
                        return 1 === this.cmpn(t)
                    }, o.prototype.gt = function (t) {
                        return 1 === this.cmp(t)
                    }, o.prototype.gten = function (t) {
                        return this.cmpn(t) >= 0
                    }, o.prototype.gte = function (t) {
                        return this.cmp(t) >= 0
                    }, o.prototype.ltn = function (t) {
                        return -1 === this.cmpn(t)
                    }, o.prototype.lt = function (t) {
                        return -1 === this.cmp(t)
                    }, o.prototype.lten = function (t) {
                        return this.cmpn(t) <= 0
                    }, o.prototype.lte = function (t) {
                        return this.cmp(t) <= 0
                    }, o.prototype.eqn = function (t) {
                        return 0 === this.cmpn(t)
                    }, o.prototype.eq = function (t) {
                        return 0 === this.cmp(t)
                    }, o.red = function (t) {
                        return new I(t)
                    }, o.prototype.toRed = function (t) {
                        return r(!this.red, "Already a number in reduction context"), r(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
                    }, o.prototype.fromRed = function () {
                        return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
                    }, o.prototype._forceRed = function (t) {
                        return this.red = t, this
                    }, o.prototype.forceRed = function (t) {
                        return r(!this.red, "Already a number in reduction context"), this._forceRed(t)
                    }, o.prototype.redAdd = function (t) {
                        return r(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
                    }, o.prototype.redIAdd = function (t) {
                        return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
                    }, o.prototype.redSub = function (t) {
                        return r(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
                    }, o.prototype.redISub = function (t) {
                        return r(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
                    }, o.prototype.redShl = function (t) {
                        return r(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
                    }, o.prototype.redMul = function (t) {
                        return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
                    }, o.prototype.redIMul = function (t) {
                        return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
                    }, o.prototype.redSqr = function () {
                        return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
                    }, o.prototype.redISqr = function () {
                        return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
                    }, o.prototype.redSqrt = function () {
                        return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
                    }, o.prototype.redInvm = function () {
                        return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
                    }, o.prototype.redNeg = function () {
                        return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
                    }, o.prototype.redPow = function (t) {
                        return r(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
                    };
                    var w = {k256: null, p224: null, p192: null, p25519: null};

                    function x(t, e) {
                        this.name = t, this.p = new o(e, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
                    }

                    function k() {
                        x.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
                    }

                    function E() {
                        x.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
                    }

                    function A() {
                        x.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
                    }

                    function S() {
                        x.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
                    }

                    function I(t) {
                        if ("string" == typeof t) {
                            var e = o._prime(t);
                            this.m = e.p, this.prime = e
                        } else r(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
                    }

                    function B(t) {
                        I.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
                    }

                    x.prototype._tmp = function () {
                        var t = new o(null);
                        return t.words = new Array(Math.ceil(this.n / 13)), t
                    }, x.prototype.ireduce = function (t) {
                        var e, n = t;
                        do {
                            this.split(n, this.tmp), e = (n = (n = this.imulK(n)).iadd(this.tmp)).bitLength()
                        } while (e > this.n);
                        var r = e < this.n ? -1 : n.ucmp(this.p);
                        return 0 === r ? (n.words[0] = 0, n.length = 1) : r > 0 ? n.isub(this.p) : void 0 !== n.strip ? n.strip() : n._strip(), n
                    }, x.prototype.split = function (t, e) {
                        t.iushrn(this.n, 0, e)
                    }, x.prototype.imulK = function (t) {
                        return t.imul(this.k)
                    }, i(k, x), k.prototype.split = function (t, e) {
                        for (var n = 4194303, r = Math.min(t.length, 9), i = 0; i < r; i++) e.words[i] = t.words[i];
                        if (e.length = r, t.length <= 9) return t.words[0] = 0, void (t.length = 1);
                        var o = t.words[9];
                        for (e.words[e.length++] = o & n, i = 10; i < t.length; i++) {
                            var a = 0 | t.words[i];
                            t.words[i - 10] = (a & n) << 4 | o >>> 22, o = a
                        }
                        o >>>= 22, t.words[i - 10] = o, 0 === o && t.length > 10 ? t.length -= 10 : t.length -= 9
                    }, k.prototype.imulK = function (t) {
                        t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                        for (var e = 0, n = 0; n < t.length; n++) {
                            var r = 0 | t.words[n];
                            e += 977 * r, t.words[n] = 67108863 & e, e = 64 * r + (e / 67108864 | 0)
                        }
                        return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
                    }, i(E, x), i(A, x), i(S, x), S.prototype.imulK = function (t) {
                        for (var e = 0, n = 0; n < t.length; n++) {
                            var r = 19 * (0 | t.words[n]) + e, i = 67108863 & r;
                            r >>>= 26, t.words[n] = i, e = r
                        }
                        return 0 !== e && (t.words[t.length++] = e), t
                    }, o._prime = function (t) {
                        if (w[t]) return w[t];
                        var e;
                        if ("k256" === t) e = new k; else if ("p224" === t) e = new E; else if ("p192" === t) e = new A; else {
                            if ("p25519" !== t) throw new Error("Unknown prime " + t);
                            e = new S
                        }
                        return w[t] = e, e
                    }, I.prototype._verify1 = function (t) {
                        r(0 === t.negative, "red works only with positives"), r(t.red, "red works only with red numbers")
                    }, I.prototype._verify2 = function (t, e) {
                        r(!(t.negative | e.negative), "red works only with positives"), r(t.red && t.red === e.red, "red works only with red numbers")
                    }, I.prototype.imod = function (t) {
                        return this.prime ? this.prime.ireduce(t)._forceRed(this) : (f(t, t.umod(this.m)._forceRed(this)), t)
                    }, I.prototype.neg = function (t) {
                        return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
                    }, I.prototype.add = function (t, e) {
                        this._verify2(t, e);
                        var n = t.add(e);
                        return n.cmp(this.m) >= 0 && n.isub(this.m), n._forceRed(this)
                    }, I.prototype.iadd = function (t, e) {
                        this._verify2(t, e);
                        var n = t.iadd(e);
                        return n.cmp(this.m) >= 0 && n.isub(this.m), n
                    }, I.prototype.sub = function (t, e) {
                        this._verify2(t, e);
                        var n = t.sub(e);
                        return n.cmpn(0) < 0 && n.iadd(this.m), n._forceRed(this)
                    }, I.prototype.isub = function (t, e) {
                        this._verify2(t, e);
                        var n = t.isub(e);
                        return n.cmpn(0) < 0 && n.iadd(this.m), n
                    }, I.prototype.shl = function (t, e) {
                        return this._verify1(t), this.imod(t.ushln(e))
                    }, I.prototype.imul = function (t, e) {
                        return this._verify2(t, e), this.imod(t.imul(e))
                    }, I.prototype.mul = function (t, e) {
                        return this._verify2(t, e), this.imod(t.mul(e))
                    }, I.prototype.isqr = function (t) {
                        return this.imul(t, t.clone())
                    }, I.prototype.sqr = function (t) {
                        return this.mul(t, t)
                    }, I.prototype.sqrt = function (t) {
                        if (t.isZero()) return t.clone();
                        var e = this.m.andln(3);
                        if (r(e % 2 == 1), 3 === e) {
                            var n = this.m.add(new o(1)).iushrn(2);
                            return this.pow(t, n)
                        }
                        for (var i = this.m.subn(1), a = 0; !i.isZero() && 0 === i.andln(1);) a++, i.iushrn(1);
                        r(!i.isZero());
                        var s = new o(1).toRed(this), u = s.redNeg(), c = this.m.subn(1).iushrn(1),
                            f = this.m.bitLength();
                        for (f = new o(2 * f * f).toRed(this); 0 !== this.pow(f, c).cmp(u);) f.redIAdd(u);
                        for (var l = this.pow(f, i), h = this.pow(t, i.addn(1).iushrn(1)), d = this.pow(t, i), p = a; 0 !== d.cmp(s);) {
                            for (var g = d, y = 0; 0 !== g.cmp(s); y++) g = g.redSqr();
                            r(y < p);
                            var m = this.pow(l, new o(1).iushln(p - y - 1));
                            h = h.redMul(m), l = m.redSqr(), d = d.redMul(l), p = y
                        }
                        return h
                    }, I.prototype.invm = function (t) {
                        var e = t._invmp(this.m);
                        return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
                    }, I.prototype.pow = function (t, e) {
                        if (e.isZero()) return new o(1).toRed(this);
                        if (0 === e.cmpn(1)) return t.clone();
                        var n = new Array(16);
                        n[0] = new o(1).toRed(this), n[1] = t;
                        for (var r = 2; r < n.length; r++) n[r] = this.mul(n[r - 1], t);
                        var i = n[0], a = 0, s = 0, u = e.bitLength() % 26;
                        for (0 === u && (u = 26), r = e.length - 1; r >= 0; r--) {
                            for (var c = e.words[r], f = u - 1; f >= 0; f--) {
                                var l = c >> f & 1;
                                i !== n[0] && (i = this.sqr(i)), 0 !== l || 0 !== a ? (a <<= 1, a |= l, (4 == ++s || 0 === r && 0 === f) && (i = this.mul(i, n[a]), s = 0, a = 0)) : s = 0
                            }
                            u = 26
                        }
                        return i
                    }, I.prototype.convertTo = function (t) {
                        var e = t.umod(this.m);
                        return e === t ? e.clone() : e
                    }, I.prototype.convertFrom = function (t) {
                        var e = t.clone();
                        return e.red = null, e
                    }, o.mont = function (t) {
                        return new B(t)
                    }, i(B, I), B.prototype.convertTo = function (t) {
                        return this.imod(t.ushln(this.shift))
                    }, B.prototype.convertFrom = function (t) {
                        var e = this.imod(t.mul(this.rinv));
                        return e.red = null, e
                    }, B.prototype.imul = function (t, e) {
                        if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
                        var n = t.imul(e), r = n.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                            i = n.isub(r).iushrn(this.shift), o = i;
                        return i.cmp(this.m) >= 0 ? o = i.isub(this.m) : i.cmpn(0) < 0 && (o = i.iadd(this.m)), o._forceRed(this)
                    }, B.prototype.mul = function (t, e) {
                        if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
                        var n = t.mul(e), r = n.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                            i = n.isub(r).iushrn(this.shift), a = i;
                        return i.cmp(this.m) >= 0 ? a = i.isub(this.m) : i.cmpn(0) < 0 && (a = i.iadd(this.m)), a._forceRed(this)
                    }, B.prototype.invm = function (t) {
                        return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
                    }
                }(t = n.nmd(t), this)
            }, 532: function (t, e, n) {
                var r = this && this.__createBinding || (Object.create ? function (t, e, n, r) {
                    void 0 === r && (r = n), Object.defineProperty(t, r, {
                        enumerable: !0, get: function () {
                            return e[n]
                        }
                    })
                } : function (t, e, n, r) {
                    void 0 === r && (r = n), t[r] = e[n]
                }), i = this && this.__setModuleDefault || (Object.create ? function (t, e) {
                    Object.defineProperty(t, "default", {enumerable: !0, value: e})
                } : function (t, e) {
                    t.default = e
                }), o = this && this.__decorate || function (t, e, n, r) {
                    var i, o = arguments.length,
                        a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
                    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
                    return o > 3 && a && Object.defineProperty(e, n, a), a
                }, a = this && this.__importStar || function (t) {
                    if (t && t.__esModule) return t;
                    var e = {};
                    if (null != t) for (var n in t) "default" !== n && Object.hasOwnProperty.call(t, n) && r(e, t, n);
                    return i(e, t), e
                }, s = this && this.__importDefault || function (t) {
                    return t && t.__esModule ? t : {default: t}
                };
                Object.defineProperty(e, "__esModule", {value: !0}), e.deserializeUnchecked = e.deserialize = e.serialize = e.BinaryReader = e.BinaryWriter = e.BorshError = e.baseDecode = e.baseEncode = void 0;
                const u = s(n(550)), c = s(n(191)), f = a(n(379)),
                    l = new ("function" != typeof TextDecoder ? f.TextDecoder : TextDecoder)("utf-8", {fatal: !0});
                e.baseEncode = function (t) {
                    return "string" == typeof t && (t = Buffer.from(t, "utf8")), c.default.encode(Buffer.from(t))
                }, e.baseDecode = function (t) {
                    return Buffer.from(c.default.decode(t))
                };
                const h = 1024;

                class d extends Error {
                    constructor(t) {
                        super(t), this.fieldPath = [], this.originalMessage = t
                    }

                    addToFieldPath(t) {
                        this.fieldPath.splice(0, 0, t), this.message = this.originalMessage + ": " + this.fieldPath.join(".")
                    }
                }

                e.BorshError = d;

                class p {
                    constructor() {
                        this.buf = Buffer.alloc(h), this.length = 0
                    }

                    maybeResize() {
                        this.buf.length < 16 + this.length && (this.buf = Buffer.concat([this.buf, Buffer.alloc(h)]))
                    }

                    writeU8(t) {
                        this.maybeResize(), this.buf.writeUInt8(t, this.length), this.length += 1
                    }

                    writeU16(t) {
                        this.maybeResize(), this.buf.writeUInt16LE(t, this.length), this.length += 2
                    }

                    writeU32(t) {
                        this.maybeResize(), this.buf.writeUInt32LE(t, this.length), this.length += 4
                    }

                    writeU64(t) {
                        this.maybeResize(), this.writeBuffer(Buffer.from(new u.default(t).toArray("le", 8)))
                    }

                    writeU128(t) {
                        this.maybeResize(), this.writeBuffer(Buffer.from(new u.default(t).toArray("le", 16)))
                    }

                    writeU256(t) {
                        this.maybeResize(), this.writeBuffer(Buffer.from(new u.default(t).toArray("le", 32)))
                    }

                    writeU512(t) {
                        this.maybeResize(), this.writeBuffer(Buffer.from(new u.default(t).toArray("le", 64)))
                    }

                    writeBuffer(t) {
                        this.buf = Buffer.concat([Buffer.from(this.buf.subarray(0, this.length)), t, Buffer.alloc(h)]), this.length += t.length
                    }

                    writeString(t) {
                        this.maybeResize();
                        const e = Buffer.from(t, "utf8");
                        this.writeU32(e.length), this.writeBuffer(e)
                    }

                    writeFixedArray(t) {
                        this.writeBuffer(Buffer.from(t))
                    }

                    writeArray(t, e) {
                        this.maybeResize(), this.writeU32(t.length);
                        for (const n of t) this.maybeResize(), e(n)
                    }

                    toArray() {
                        return this.buf.subarray(0, this.length)
                    }
                }

                function g(t, e, n) {
                    const r = n.value;
                    n.value = function (...t) {
                        try {
                            return r.apply(this, t)
                        } catch (t) {
                            if (t instanceof RangeError) {
                                const e = t.code;
                                if (["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(e) >= 0) throw new d("Reached the end of buffer when deserializing")
                            }
                            throw t
                        }
                    }
                }

                e.BinaryWriter = p;

                class y {
                    constructor(t) {
                        this.buf = t, this.offset = 0
                    }

                    readU8() {
                        const t = this.buf.readUInt8(this.offset);
                        return this.offset += 1, t
                    }

                    readU16() {
                        const t = this.buf.readUInt16LE(this.offset);
                        return this.offset += 2, t
                    }

                    readU32() {
                        const t = this.buf.readUInt32LE(this.offset);
                        return this.offset += 4, t
                    }

                    readU64() {
                        const t = this.readBuffer(8);
                        return new u.default(t, "le")
                    }

                    readU128() {
                        const t = this.readBuffer(16);
                        return new u.default(t, "le")
                    }

                    readU256() {
                        const t = this.readBuffer(32);
                        return new u.default(t, "le")
                    }

                    readU512() {
                        const t = this.readBuffer(64);
                        return new u.default(t, "le")
                    }

                    readBuffer(t) {
                        if (this.offset + t > this.buf.length) throw new d(`Expected buffer length ${t} isn't within bounds`);
                        const e = this.buf.slice(this.offset, this.offset + t);
                        return this.offset += t, e
                    }

                    readString() {
                        const t = this.readU32(), e = this.readBuffer(t);
                        try {
                            return l.decode(e)
                        } catch (t) {
                            throw new d(`Error decoding UTF-8 string: ${t}`)
                        }
                    }

                    readFixedArray(t) {
                        return new Uint8Array(this.readBuffer(t))
                    }

                    readArray(t) {
                        const e = this.readU32(), n = Array();
                        for (let r = 0; r < e; ++r) n.push(t());
                        return n
                    }
                }

                function m(t) {
                    return t.charAt(0).toUpperCase() + t.slice(1)
                }

                function v(t, e, n, r, i) {
                    try {
                        if ("string" == typeof r) i[`write${m(r)}`](n); else if (r instanceof Array) if ("number" == typeof r[0]) {
                            if (n.length !== r[0]) throw new d(`Expecting byte array of length ${r[0]}, but got ${n.length} bytes`);
                            i.writeFixedArray(n)
                        } else if (2 === r.length && "number" == typeof r[1]) {
                            if (n.length !== r[1]) throw new d(`Expecting byte array of length ${r[1]}, but got ${n.length} bytes`);
                            for (let e = 0; e < r[1]; e++) v(t, null, n[e], r[0], i)
                        } else i.writeArray(n, (n => {
                            v(t, e, n, r[0], i)
                        })); else if (void 0 !== r.kind) switch (r.kind) {
                            case"option":
                                null == n ? i.writeU8(0) : (i.writeU8(1), v(t, e, n, r.type, i));
                                break;
                            case"map":
                                i.writeU32(n.size), n.forEach(((n, o) => {
                                    v(t, e, o, r.key, i), v(t, e, n, r.value, i)
                                }));
                                break;
                            default:
                                throw new d(`FieldType ${r} unrecognized`)
                        } else b(t, n, i)
                    } catch (t) {
                        throw t instanceof d && t.addToFieldPath(e), t
                    }
                }

                function b(t, e, n) {
                    if ("function" == typeof e.borshSerialize) return void e.borshSerialize(n);
                    const r = t.get(e.constructor);
                    if (!r) throw new d(`Class ${e.constructor.name} is missing in schema`);
                    if ("struct" === r.kind) r.fields.map((([r, i]) => {
                        v(t, r, e[r], i, n)
                    })); else {
                        if ("enum" !== r.kind) throw new d(`Unexpected schema kind: ${r.kind} for ${e.constructor.name}`);
                        {
                            const i = e[r.field];
                            for (let o = 0; o < r.values.length; ++o) {
                                const [a, s] = r.values[o];
                                if (a === i) {
                                    n.writeU8(o), v(t, a, e[a], s, n);
                                    break
                                }
                            }
                        }
                    }
                }

                function w(t, e, n, r) {
                    try {
                        if ("string" == typeof n) return r[`read${m(n)}`]();
                        if (n instanceof Array) {
                            if ("number" == typeof n[0]) return r.readFixedArray(n[0]);
                            if ("number" == typeof n[1]) {
                                const e = [];
                                for (let i = 0; i < n[1]; i++) e.push(w(t, null, n[0], r));
                                return e
                            }
                            return r.readArray((() => w(t, e, n[0], r)))
                        }
                        if ("option" === n.kind) return r.readU8() ? w(t, e, n.type, r) : void 0;
                        if ("map" === n.kind) {
                            let i = new Map;
                            const o = r.readU32();
                            for (let a = 0; a < o; a++) {
                                const o = w(t, e, n.key, r), a = w(t, e, n.value, r);
                                i.set(o, a)
                            }
                            return i
                        }
                        return x(t, n, r)
                    } catch (t) {
                        throw t instanceof d && t.addToFieldPath(e), t
                    }
                }

                function x(t, e, n) {
                    if ("function" == typeof e.borshDeserialize) return e.borshDeserialize(n);
                    const r = t.get(e);
                    if (!r) throw new d(`Class ${e.name} is missing in schema`);
                    if ("struct" === r.kind) {
                        const r = {};
                        for (const [i, o] of t.get(e).fields) r[i] = w(t, i, o, n);
                        return new e(r)
                    }
                    if ("enum" === r.kind) {
                        const i = n.readU8();
                        if (i >= r.values.length) throw new d(`Enum index: ${i} is out of range`);
                        const [o, a] = r.values[i];
                        return new e({[o]: w(t, o, a, n)})
                    }
                    throw new d(`Unexpected schema kind: ${r.kind} for ${e.constructor.name}`)
                }

                o([g], y.prototype, "readU8", null), o([g], y.prototype, "readU16", null), o([g], y.prototype, "readU32", null), o([g], y.prototype, "readU64", null), o([g], y.prototype, "readU128", null), o([g], y.prototype, "readU256", null), o([g], y.prototype, "readU512", null), o([g], y.prototype, "readString", null), o([g], y.prototype, "readFixedArray", null), o([g], y.prototype, "readArray", null), e.BinaryReader = y, e.serialize = function (t, e, n = p) {
                    const r = new n;
                    return b(t, e, r), r.toArray()
                }, e.deserialize = function (t, e, n, r = y) {
                    const i = new r(n), o = x(t, e, i);
                    if (i.offset < n.length) throw new d(`Unexpected ${n.length - i.offset} bytes after deserialized data`);
                    return o
                }, e.deserializeUnchecked = function (t, e, n, r = y) {
                    return x(t, e, new r(n))
                }
            }, 191: (t, e, n) => {
                var r = n(162);
                t.exports = r("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
            }, 764: (t, e, n) => {
                const r = n(742), i = n(241),
                    o = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
                e.Buffer = u, e.SlowBuffer = function (t) {
                    return +t != t && (t = 0), u.alloc(+t)
                }, e.INSPECT_MAX_BYTES = 50;
                const a = 2147483647;

                function s(t) {
                    if (t > a) throw new RangeError('The value "' + t + '" is invalid for option "size"');
                    const e = new Uint8Array(t);
                    return Object.setPrototypeOf(e, u.prototype), e
                }

                function u(t, e, n) {
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw new TypeError('The "string" argument must be of type string. Received type number');
                        return l(t)
                    }
                    return c(t, e, n)
                }

                function c(t, e, n) {
                    if ("string" == typeof t) return function (t, e) {
                        if ("string" == typeof e && "" !== e || (e = "utf8"), !u.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
                        const n = 0 | g(t, e);
                        let r = s(n);
                        const i = r.write(t, e);
                        return i !== n && (r = r.slice(0, i)), r
                    }(t, e);
                    if (ArrayBuffer.isView(t)) return function (t) {
                        if (Z(t, Uint8Array)) {
                            const e = new Uint8Array(t);
                            return d(e.buffer, e.byteOffset, e.byteLength)
                        }
                        return h(t)
                    }(t);
                    if (null == t) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
                    if (Z(t, ArrayBuffer) || t && Z(t.buffer, ArrayBuffer)) return d(t, e, n);
                    if ("undefined" != typeof SharedArrayBuffer && (Z(t, SharedArrayBuffer) || t && Z(t.buffer, SharedArrayBuffer))) return d(t, e, n);
                    if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
                    const r = t.valueOf && t.valueOf();
                    if (null != r && r !== t) return u.from(r, e, n);
                    const i = function (t) {
                        if (u.isBuffer(t)) {
                            const e = 0 | p(t.length), n = s(e);
                            return 0 === n.length || t.copy(n, 0, 0, e), n
                        }
                        return void 0 !== t.length ? "number" != typeof t.length || G(t.length) ? s(0) : h(t) : "Buffer" === t.type && Array.isArray(t.data) ? h(t.data) : void 0
                    }(t);
                    if (i) return i;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return u.from(t[Symbol.toPrimitive]("string"), e, n);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
                }

                function f(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be of type number');
                    if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"')
                }

                function l(t) {
                    return f(t), s(t < 0 ? 0 : 0 | p(t))
                }

                function h(t) {
                    const e = t.length < 0 ? 0 : 0 | p(t.length), n = s(e);
                    for (let r = 0; r < e; r += 1) n[r] = 255 & t[r];
                    return n
                }

                function d(t, e, n) {
                    if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
                    if (t.byteLength < e + (n || 0)) throw new RangeError('"length" is outside of buffer bounds');
                    let r;
                    return r = void 0 === e && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, e) : new Uint8Array(t, e, n), Object.setPrototypeOf(r, u.prototype), r
                }

                function p(t) {
                    if (t >= a) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a.toString(16) + " bytes");
                    return 0 | t
                }

                function g(t, e) {
                    if (u.isBuffer(t)) return t.length;
                    if (ArrayBuffer.isView(t) || Z(t, ArrayBuffer)) return t.byteLength;
                    if ("string" != typeof t) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
                    const n = t.length, r = arguments.length > 2 && !0 === arguments[2];
                    if (!r && 0 === n) return 0;
                    let i = !1;
                    for (; ;) switch (e) {
                        case"ascii":
                        case"latin1":
                        case"binary":
                            return n;
                        case"utf8":
                        case"utf-8":
                            return H(t).length;
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return 2 * n;
                        case"hex":
                            return n >>> 1;
                        case"base64":
                            return V(t).length;
                        default:
                            if (i) return r ? -1 : H(t).length;
                            e = ("" + e).toLowerCase(), i = !0
                    }
                }

                function y(t, e, n) {
                    let r = !1;
                    if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                    if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                    if ((n >>>= 0) <= (e >>>= 0)) return "";
                    for (t || (t = "utf8"); ;) switch (t) {
                        case"hex":
                            return _(this, e, n);
                        case"utf8":
                        case"utf-8":
                            return I(this, e, n);
                        case"ascii":
                            return M(this, e, n);
                        case"latin1":
                        case"binary":
                            return O(this, e, n);
                        case"base64":
                            return S(this, e, n);
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return T(this, e, n);
                        default:
                            if (r) throw new TypeError("Unknown encoding: " + t);
                            t = (t + "").toLowerCase(), r = !0
                    }
                }

                function m(t, e, n) {
                    const r = t[e];
                    t[e] = t[n], t[n] = r
                }

                function v(t, e, n, r, i) {
                    if (0 === t.length) return -1;
                    if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), G(n = +n) && (n = i ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
                        if (i) return -1;
                        n = t.length - 1
                    } else if (n < 0) {
                        if (!i) return -1;
                        n = 0
                    }
                    if ("string" == typeof e && (e = u.from(e, r)), u.isBuffer(e)) return 0 === e.length ? -1 : b(t, e, n, r, i);
                    if ("number" == typeof e) return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : b(t, [e], n, r, i);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function b(t, e, n, r, i) {
                    let o, a = 1, s = t.length, u = e.length;
                    if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        a = 2, s /= 2, u /= 2, n /= 2
                    }

                    function c(t, e) {
                        return 1 === a ? t[e] : t.readUInt16BE(e * a)
                    }

                    if (i) {
                        let r = -1;
                        for (o = n; o < s; o++) if (c(t, o) === c(e, -1 === r ? 0 : o - r)) {
                            if (-1 === r && (r = o), o - r + 1 === u) return r * a
                        } else -1 !== r && (o -= o - r), r = -1
                    } else for (n + u > s && (n = s - u), o = n; o >= 0; o--) {
                        let n = !0;
                        for (let r = 0; r < u; r++) if (c(t, o + r) !== c(e, r)) {
                            n = !1;
                            break
                        }
                        if (n) return o
                    }
                    return -1
                }

                function w(t, e, n, r) {
                    n = Number(n) || 0;
                    const i = t.length - n;
                    r ? (r = Number(r)) > i && (r = i) : r = i;
                    const o = e.length;
                    let a;
                    for (r > o / 2 && (r = o / 2), a = 0; a < r; ++a) {
                        const r = parseInt(e.substr(2 * a, 2), 16);
                        if (G(r)) return a;
                        t[n + a] = r
                    }
                    return a
                }

                function x(t, e, n, r) {
                    return J(H(e, t.length - n), t, n, r)
                }

                function k(t, e, n, r) {
                    return J(function (t) {
                        const e = [];
                        for (let n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
                        return e
                    }(e), t, n, r)
                }

                function E(t, e, n, r) {
                    return J(V(e), t, n, r)
                }

                function A(t, e, n, r) {
                    return J(function (t, e) {
                        let n, r, i;
                        const o = [];
                        for (let a = 0; a < t.length && !((e -= 2) < 0); ++a) n = t.charCodeAt(a), r = n >> 8, i = n % 256, o.push(i), o.push(r);
                        return o
                    }(e, t.length - n), t, n, r)
                }

                function S(t, e, n) {
                    return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n))
                }

                function I(t, e, n) {
                    n = Math.min(t.length, n);
                    const r = [];
                    let i = e;
                    for (; i < n;) {
                        const e = t[i];
                        let o = null, a = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
                        if (i + a <= n) {
                            let n, r, s, u;
                            switch (a) {
                                case 1:
                                    e < 128 && (o = e);
                                    break;
                                case 2:
                                    n = t[i + 1], 128 == (192 & n) && (u = (31 & e) << 6 | 63 & n, u > 127 && (o = u));
                                    break;
                                case 3:
                                    n = t[i + 1], r = t[i + 2], 128 == (192 & n) && 128 == (192 & r) && (u = (15 & e) << 12 | (63 & n) << 6 | 63 & r, u > 2047 && (u < 55296 || u > 57343) && (o = u));
                                    break;
                                case 4:
                                    n = t[i + 1], r = t[i + 2], s = t[i + 3], 128 == (192 & n) && 128 == (192 & r) && 128 == (192 & s) && (u = (15 & e) << 18 | (63 & n) << 12 | (63 & r) << 6 | 63 & s, u > 65535 && u < 1114112 && (o = u))
                            }
                        }
                        null === o ? (o = 65533, a = 1) : o > 65535 && (o -= 65536, r.push(o >>> 10 & 1023 | 55296), o = 56320 | 1023 & o), r.push(o), i += a
                    }
                    return function (t) {
                        const e = t.length;
                        if (e <= B) return String.fromCharCode.apply(String, t);
                        let n = "", r = 0;
                        for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += B));
                        return n
                    }(r)
                }

                e.kMaxLength = a, u.TYPED_ARRAY_SUPPORT = function () {
                    try {
                        const t = new Uint8Array(1), e = {
                            foo: function () {
                                return 42
                            }
                        };
                        return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo()
                    } catch (t) {
                        return !1
                    }
                }(), u.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(u.prototype, "parent", {
                    enumerable: !0,
                    get: function () {
                        if (u.isBuffer(this)) return this.buffer
                    }
                }), Object.defineProperty(u.prototype, "offset", {
                    enumerable: !0, get: function () {
                        if (u.isBuffer(this)) return this.byteOffset
                    }
                }), u.poolSize = 8192, u.from = function (t, e, n) {
                    return c(t, e, n)
                }, Object.setPrototypeOf(u.prototype, Uint8Array.prototype), Object.setPrototypeOf(u, Uint8Array), u.alloc = function (t, e, n) {
                    return function (t, e, n) {
                        return f(t), t <= 0 ? s(t) : void 0 !== e ? "string" == typeof n ? s(t).fill(e, n) : s(t).fill(e) : s(t)
                    }(t, e, n)
                }, u.allocUnsafe = function (t) {
                    return l(t)
                }, u.allocUnsafeSlow = function (t) {
                    return l(t)
                }, u.isBuffer = function (t) {
                    return null != t && !0 === t._isBuffer && t !== u.prototype
                }, u.compare = function (t, e) {
                    if (Z(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)), Z(e, Uint8Array) && (e = u.from(e, e.offset, e.byteLength)), !u.isBuffer(t) || !u.isBuffer(e)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (t === e) return 0;
                    let n = t.length, r = e.length;
                    for (let i = 0, o = Math.min(n, r); i < o; ++i) if (t[i] !== e[i]) {
                        n = t[i], r = e[i];
                        break
                    }
                    return n < r ? -1 : r < n ? 1 : 0
                }, u.isEncoding = function (t) {
                    switch (String(t).toLowerCase()) {
                        case"hex":
                        case"utf8":
                        case"utf-8":
                        case"ascii":
                        case"latin1":
                        case"binary":
                        case"base64":
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, u.concat = function (t, e) {
                    if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === t.length) return u.alloc(0);
                    let n;
                    if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
                    const r = u.allocUnsafe(e);
                    let i = 0;
                    for (n = 0; n < t.length; ++n) {
                        let e = t[n];
                        if (Z(e, Uint8Array)) i + e.length > r.length ? (u.isBuffer(e) || (e = u.from(e)), e.copy(r, i)) : Uint8Array.prototype.set.call(r, e, i); else {
                            if (!u.isBuffer(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                            e.copy(r, i)
                        }
                        i += e.length
                    }
                    return r
                }, u.byteLength = g, u.prototype._isBuffer = !0, u.prototype.swap16 = function () {
                    const t = this.length;
                    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (let e = 0; e < t; e += 2) m(this, e, e + 1);
                    return this
                }, u.prototype.swap32 = function () {
                    const t = this.length;
                    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (let e = 0; e < t; e += 4) m(this, e, e + 3), m(this, e + 1, e + 2);
                    return this
                }, u.prototype.swap64 = function () {
                    const t = this.length;
                    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (let e = 0; e < t; e += 8) m(this, e, e + 7), m(this, e + 1, e + 6), m(this, e + 2, e + 5), m(this, e + 3, e + 4);
                    return this
                }, u.prototype.toString = function () {
                    const t = this.length;
                    return 0 === t ? "" : 0 === arguments.length ? I(this, 0, t) : y.apply(this, arguments)
                }, u.prototype.toLocaleString = u.prototype.toString, u.prototype.equals = function (t) {
                    if (!u.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                    return this === t || 0 === u.compare(this, t)
                }, u.prototype.inspect = function () {
                    let t = "";
                    const n = e.INSPECT_MAX_BYTES;
                    return t = this.toString("hex", 0, n).replace(/(.{2})/g, "$1 ").trim(), this.length > n && (t += " ... "), "<Buffer " + t + ">"
                }, o && (u.prototype[o] = u.prototype.inspect), u.prototype.compare = function (t, e, n, r, i) {
                    if (Z(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)), !u.isBuffer(t)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
                    if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), e < 0 || n > t.length || r < 0 || i > this.length) throw new RangeError("out of range index");
                    if (r >= i && e >= n) return 0;
                    if (r >= i) return -1;
                    if (e >= n) return 1;
                    if (this === t) return 0;
                    let o = (i >>>= 0) - (r >>>= 0), a = (n >>>= 0) - (e >>>= 0);
                    const s = Math.min(o, a), c = this.slice(r, i), f = t.slice(e, n);
                    for (let t = 0; t < s; ++t) if (c[t] !== f[t]) {
                        o = c[t], a = f[t];
                        break
                    }
                    return o < a ? -1 : a < o ? 1 : 0
                }, u.prototype.includes = function (t, e, n) {
                    return -1 !== this.indexOf(t, e, n)
                }, u.prototype.indexOf = function (t, e, n) {
                    return v(this, t, e, n, !0)
                }, u.prototype.lastIndexOf = function (t, e, n) {
                    return v(this, t, e, n, !1)
                }, u.prototype.write = function (t, e, n, r) {
                    if (void 0 === e) r = "utf8", n = this.length, e = 0; else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0; else {
                        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        e >>>= 0, isFinite(n) ? (n >>>= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                    }
                    const i = this.length - e;
                    if ((void 0 === n || n > i) && (n = i), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    r || (r = "utf8");
                    let o = !1;
                    for (; ;) switch (r) {
                        case"hex":
                            return w(this, t, e, n);
                        case"utf8":
                        case"utf-8":
                            return x(this, t, e, n);
                        case"ascii":
                        case"latin1":
                        case"binary":
                            return k(this, t, e, n);
                        case"base64":
                            return E(this, t, e, n);
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return A(this, t, e, n);
                        default:
                            if (o) throw new TypeError("Unknown encoding: " + r);
                            r = ("" + r).toLowerCase(), o = !0
                    }
                }, u.prototype.toJSON = function () {
                    return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
                };
                const B = 4096;

                function M(t, e, n) {
                    let r = "";
                    n = Math.min(t.length, n);
                    for (let i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
                    return r
                }

                function O(t, e, n) {
                    let r = "";
                    n = Math.min(t.length, n);
                    for (let i = e; i < n; ++i) r += String.fromCharCode(t[i]);
                    return r
                }

                function _(t, e, n) {
                    const r = t.length;
                    (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
                    let i = "";
                    for (let r = e; r < n; ++r) i += Y[t[r]];
                    return i
                }

                function T(t, e, n) {
                    const r = t.slice(e, n);
                    let i = "";
                    for (let t = 0; t < r.length - 1; t += 2) i += String.fromCharCode(r[t] + 256 * r[t + 1]);
                    return i
                }

                function L(t, e, n) {
                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + e > n) throw new RangeError("Trying to access beyond buffer length")
                }

                function P(t, e, n, r, i, o) {
                    if (!u.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
                    if (n + r > t.length) throw new RangeError("Index out of range")
                }

                function $(t, e, n, r, i) {
                    q(e, r, i, t, n, 7);
                    let o = Number(e & BigInt(4294967295));
                    t[n++] = o, o >>= 8, t[n++] = o, o >>= 8, t[n++] = o, o >>= 8, t[n++] = o;
                    let a = Number(e >> BigInt(32) & BigInt(4294967295));
                    return t[n++] = a, a >>= 8, t[n++] = a, a >>= 8, t[n++] = a, a >>= 8, t[n++] = a, n
                }

                function j(t, e, n, r, i) {
                    q(e, r, i, t, n, 7);
                    let o = Number(e & BigInt(4294967295));
                    t[n + 7] = o, o >>= 8, t[n + 6] = o, o >>= 8, t[n + 5] = o, o >>= 8, t[n + 4] = o;
                    let a = Number(e >> BigInt(32) & BigInt(4294967295));
                    return t[n + 3] = a, a >>= 8, t[n + 2] = a, a >>= 8, t[n + 1] = a, a >>= 8, t[n] = a, n + 8
                }

                function C(t, e, n, r, i, o) {
                    if (n + r > t.length) throw new RangeError("Index out of range");
                    if (n < 0) throw new RangeError("Index out of range")
                }

                function R(t, e, n, r, o) {
                    return e = +e, n >>>= 0, o || C(t, 0, n, 4), i.write(t, e, n, r, 23, 4), n + 4
                }

                function U(t, e, n, r, o) {
                    return e = +e, n >>>= 0, o || C(t, 0, n, 8), i.write(t, e, n, r, 52, 8), n + 8
                }

                u.prototype.slice = function (t, e) {
                    const n = this.length;
                    (t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t);
                    const r = this.subarray(t, e);
                    return Object.setPrototypeOf(r, u.prototype), r
                }, u.prototype.readUintLE = u.prototype.readUIntLE = function (t, e, n) {
                    t >>>= 0, e >>>= 0, n || L(t, e, this.length);
                    let r = this[t], i = 1, o = 0;
                    for (; ++o < e && (i *= 256);) r += this[t + o] * i;
                    return r
                }, u.prototype.readUintBE = u.prototype.readUIntBE = function (t, e, n) {
                    t >>>= 0, e >>>= 0, n || L(t, e, this.length);
                    let r = this[t + --e], i = 1;
                    for (; e > 0 && (i *= 256);) r += this[t + --e] * i;
                    return r
                }, u.prototype.readUint8 = u.prototype.readUInt8 = function (t, e) {
                    return t >>>= 0, e || L(t, 1, this.length), this[t]
                }, u.prototype.readUint16LE = u.prototype.readUInt16LE = function (t, e) {
                    return t >>>= 0, e || L(t, 2, this.length), this[t] | this[t + 1] << 8
                }, u.prototype.readUint16BE = u.prototype.readUInt16BE = function (t, e) {
                    return t >>>= 0, e || L(t, 2, this.length), this[t] << 8 | this[t + 1]
                }, u.prototype.readUint32LE = u.prototype.readUInt32LE = function (t, e) {
                    return t >>>= 0, e || L(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
                }, u.prototype.readUint32BE = u.prototype.readUInt32BE = function (t, e) {
                    return t >>>= 0, e || L(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
                }, u.prototype.readBigUInt64LE = X((function (t) {
                    K(t >>>= 0, "offset");
                    const e = this[t], n = this[t + 7];
                    void 0 !== e && void 0 !== n || D(t, this.length - 8);
                    const r = e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24,
                        i = this[++t] + 256 * this[++t] + 65536 * this[++t] + n * 2 ** 24;
                    return BigInt(r) + (BigInt(i) << BigInt(32))
                })), u.prototype.readBigUInt64BE = X((function (t) {
                    K(t >>>= 0, "offset");
                    const e = this[t], n = this[t + 7];
                    void 0 !== e && void 0 !== n || D(t, this.length - 8);
                    const r = e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t],
                        i = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + n;
                    return (BigInt(r) << BigInt(32)) + BigInt(i)
                })), u.prototype.readIntLE = function (t, e, n) {
                    t >>>= 0, e >>>= 0, n || L(t, e, this.length);
                    let r = this[t], i = 1, o = 0;
                    for (; ++o < e && (i *= 256);) r += this[t + o] * i;
                    return i *= 128, r >= i && (r -= Math.pow(2, 8 * e)), r
                }, u.prototype.readIntBE = function (t, e, n) {
                    t >>>= 0, e >>>= 0, n || L(t, e, this.length);
                    let r = e, i = 1, o = this[t + --r];
                    for (; r > 0 && (i *= 256);) o += this[t + --r] * i;
                    return i *= 128, o >= i && (o -= Math.pow(2, 8 * e)), o
                }, u.prototype.readInt8 = function (t, e) {
                    return t >>>= 0, e || L(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
                }, u.prototype.readInt16LE = function (t, e) {
                    t >>>= 0, e || L(t, 2, this.length);
                    const n = this[t] | this[t + 1] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, u.prototype.readInt16BE = function (t, e) {
                    t >>>= 0, e || L(t, 2, this.length);
                    const n = this[t + 1] | this[t] << 8;
                    return 32768 & n ? 4294901760 | n : n
                }, u.prototype.readInt32LE = function (t, e) {
                    return t >>>= 0, e || L(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
                }, u.prototype.readInt32BE = function (t, e) {
                    return t >>>= 0, e || L(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
                }, u.prototype.readBigInt64LE = X((function (t) {
                    K(t >>>= 0, "offset");
                    const e = this[t], n = this[t + 7];
                    void 0 !== e && void 0 !== n || D(t, this.length - 8);
                    const r = this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (n << 24);
                    return (BigInt(r) << BigInt(32)) + BigInt(e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24)
                })), u.prototype.readBigInt64BE = X((function (t) {
                    K(t >>>= 0, "offset");
                    const e = this[t], n = this[t + 7];
                    void 0 !== e && void 0 !== n || D(t, this.length - 8);
                    const r = (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
                    return (BigInt(r) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + n)
                })), u.prototype.readFloatLE = function (t, e) {
                    return t >>>= 0, e || L(t, 4, this.length), i.read(this, t, !0, 23, 4)
                }, u.prototype.readFloatBE = function (t, e) {
                    return t >>>= 0, e || L(t, 4, this.length), i.read(this, t, !1, 23, 4)
                }, u.prototype.readDoubleLE = function (t, e) {
                    return t >>>= 0, e || L(t, 8, this.length), i.read(this, t, !0, 52, 8)
                }, u.prototype.readDoubleBE = function (t, e) {
                    return t >>>= 0, e || L(t, 8, this.length), i.read(this, t, !1, 52, 8)
                }, u.prototype.writeUintLE = u.prototype.writeUIntLE = function (t, e, n, r) {
                    t = +t, e >>>= 0, n >>>= 0, r || P(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                    let i = 1, o = 0;
                    for (this[e] = 255 & t; ++o < n && (i *= 256);) this[e + o] = t / i & 255;
                    return e + n
                }, u.prototype.writeUintBE = u.prototype.writeUIntBE = function (t, e, n, r) {
                    t = +t, e >>>= 0, n >>>= 0, r || P(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
                    let i = n - 1, o = 1;
                    for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;
                    return e + n
                }, u.prototype.writeUint8 = u.prototype.writeUInt8 = function (t, e, n) {
                    return t = +t, e >>>= 0, n || P(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1
                }, u.prototype.writeUint16LE = u.prototype.writeUInt16LE = function (t, e, n) {
                    return t = +t, e >>>= 0, n || P(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
                }, u.prototype.writeUint16BE = u.prototype.writeUInt16BE = function (t, e, n) {
                    return t = +t, e >>>= 0, n || P(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
                }, u.prototype.writeUint32LE = u.prototype.writeUInt32LE = function (t, e, n) {
                    return t = +t, e >>>= 0, n || P(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t, e + 4
                }, u.prototype.writeUint32BE = u.prototype.writeUInt32BE = function (t, e, n) {
                    return t = +t, e >>>= 0, n || P(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
                }, u.prototype.writeBigUInt64LE = X((function (t, e = 0) {
                    return $(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
                })), u.prototype.writeBigUInt64BE = X((function (t, e = 0) {
                    return j(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
                })), u.prototype.writeIntLE = function (t, e, n, r) {
                    if (t = +t, e >>>= 0, !r) {
                        const r = Math.pow(2, 8 * n - 1);
                        P(this, t, e, n, r - 1, -r)
                    }
                    let i = 0, o = 1, a = 0;
                    for (this[e] = 255 & t; ++i < n && (o *= 256);) t < 0 && 0 === a && 0 !== this[e + i - 1] && (a = 1), this[e + i] = (t / o | 0) - a & 255;
                    return e + n
                }, u.prototype.writeIntBE = function (t, e, n, r) {
                    if (t = +t, e >>>= 0, !r) {
                        const r = Math.pow(2, 8 * n - 1);
                        P(this, t, e, n, r - 1, -r)
                    }
                    let i = n - 1, o = 1, a = 0;
                    for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) t < 0 && 0 === a && 0 !== this[e + i + 1] && (a = 1), this[e + i] = (t / o | 0) - a & 255;
                    return e + n
                }, u.prototype.writeInt8 = function (t, e, n) {
                    return t = +t, e >>>= 0, n || P(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
                }, u.prototype.writeInt16LE = function (t, e, n) {
                    return t = +t, e >>>= 0, n || P(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
                }, u.prototype.writeInt16BE = function (t, e, n) {
                    return t = +t, e >>>= 0, n || P(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
                }, u.prototype.writeInt32LE = function (t, e, n) {
                    return t = +t, e >>>= 0, n || P(this, t, e, 4, 2147483647, -2147483648), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4
                }, u.prototype.writeInt32BE = function (t, e, n) {
                    return t = +t, e >>>= 0, n || P(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
                }, u.prototype.writeBigInt64LE = X((function (t, e = 0) {
                    return $(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                })), u.prototype.writeBigInt64BE = X((function (t, e = 0) {
                    return j(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
                })), u.prototype.writeFloatLE = function (t, e, n) {
                    return R(this, t, e, !0, n)
                }, u.prototype.writeFloatBE = function (t, e, n) {
                    return R(this, t, e, !1, n)
                }, u.prototype.writeDoubleLE = function (t, e, n) {
                    return U(this, t, e, !0, n)
                }, u.prototype.writeDoubleBE = function (t, e, n) {
                    return U(this, t, e, !1, n)
                }, u.prototype.copy = function (t, e, n, r) {
                    if (!u.isBuffer(t)) throw new TypeError("argument should be a Buffer");
                    if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
                    if (0 === t.length || 0 === this.length) return 0;
                    if (e < 0) throw new RangeError("targetStart out of bounds");
                    if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
                    if (r < 0) throw new RangeError("sourceEnd out of bounds");
                    r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
                    const i = r - n;
                    return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, n, r) : Uint8Array.prototype.set.call(t, this.subarray(n, r), e), i
                }, u.prototype.fill = function (t, e, n, r) {
                    if ("string" == typeof t) {
                        if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                        if ("string" == typeof r && !u.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
                        if (1 === t.length) {
                            const e = t.charCodeAt(0);
                            ("utf8" === r && e < 128 || "latin1" === r) && (t = e)
                        }
                    } else "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
                    if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
                    if (n <= e) return this;
                    let i;
                    if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t) for (i = e; i < n; ++i) this[i] = t; else {
                        const o = u.isBuffer(t) ? t : u.from(t, r), a = o.length;
                        if (0 === a) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                        for (i = 0; i < n - e; ++i) this[i + e] = o[i % a]
                    }
                    return this
                };
                const z = {};

                function N(t, e, n) {
                    z[t] = class extends n {
                        constructor() {
                            super(), Object.defineProperty(this, "message", {
                                value: e.apply(this, arguments),
                                writable: !0,
                                configurable: !0
                            }), this.name = `${this.name} [${t}]`, this.stack, delete this.name
                        }

                        get code() {
                            return t
                        }

                        set code(t) {
                            Object.defineProperty(this, "code", {
                                configurable: !0,
                                enumerable: !0,
                                value: t,
                                writable: !0
                            })
                        }

                        toString() {
                            return `${this.name} [${t}]: ${this.message}`
                        }
                    }
                }

                function W(t) {
                    let e = "", n = t.length;
                    const r = "-" === t[0] ? 1 : 0;
                    for (; n >= r + 4; n -= 3) e = `_${t.slice(n - 3, n)}${e}`;
                    return `${t.slice(0, n)}${e}`
                }

                function q(t, e, n, r, i, o) {
                    if (t > n || t < e) {
                        const r = "bigint" == typeof e ? "n" : "";
                        let i;
                        throw i = o > 3 ? 0 === e || e === BigInt(0) ? `>= 0${r} and < 2${r} ** ${8 * (o + 1)}${r}` : `>= -(2${r} ** ${8 * (o + 1) - 1}${r}) and < 2 ** ${8 * (o + 1) - 1}${r}` : `>= ${e}${r} and <= ${n}${r}`, new z.ERR_OUT_OF_RANGE("value", i, t)
                    }
                    !function (t, e, n) {
                        K(e, "offset"), void 0 !== t[e] && void 0 !== t[e + n] || D(e, t.length - (n + 1))
                    }(r, i, o)
                }

                function K(t, e) {
                    if ("number" != typeof t) throw new z.ERR_INVALID_ARG_TYPE(e, "number", t)
                }

                function D(t, e, n) {
                    if (Math.floor(t) !== t) throw K(t, n), new z.ERR_OUT_OF_RANGE(n || "offset", "an integer", t);
                    if (e < 0) throw new z.ERR_BUFFER_OUT_OF_BOUNDS;
                    throw new z.ERR_OUT_OF_RANGE(n || "offset", `>= ${n ? 1 : 0} and <= ${e}`, t)
                }

                N("ERR_BUFFER_OUT_OF_BOUNDS", (function (t) {
                    return t ? `${t} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
                }), RangeError), N("ERR_INVALID_ARG_TYPE", (function (t, e) {
                    return `The "${t}" argument must be of type number. Received type ${typeof e}`
                }), TypeError), N("ERR_OUT_OF_RANGE", (function (t, e, n) {
                    let r = `The value of "${t}" is out of range.`, i = n;
                    return Number.isInteger(n) && Math.abs(n) > 2 ** 32 ? i = W(String(n)) : "bigint" == typeof n && (i = String(n), (n > BigInt(2) ** BigInt(32) || n < -(BigInt(2) ** BigInt(32))) && (i = W(i)), i += "n"), r += ` It must be ${e}. Received ${i}`, r
                }), RangeError);
                const F = /[^+/0-9A-Za-z-_]/g;

                function H(t, e) {
                    let n;
                    e = e || 1 / 0;
                    const r = t.length;
                    let i = null;
                    const o = [];
                    for (let a = 0; a < r; ++a) {
                        if (n = t.charCodeAt(a), n > 55295 && n < 57344) {
                            if (!i) {
                                if (n > 56319) {
                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                if (a + 1 === r) {
                                    (e -= 3) > -1 && o.push(239, 191, 189);
                                    continue
                                }
                                i = n;
                                continue
                            }
                            if (n < 56320) {
                                (e -= 3) > -1 && o.push(239, 191, 189), i = n;
                                continue
                            }
                            n = 65536 + (i - 55296 << 10 | n - 56320)
                        } else i && (e -= 3) > -1 && o.push(239, 191, 189);
                        if (i = null, n < 128) {
                            if ((e -= 1) < 0) break;
                            o.push(n)
                        } else if (n < 2048) {
                            if ((e -= 2) < 0) break;
                            o.push(n >> 6 | 192, 63 & n | 128)
                        } else if (n < 65536) {
                            if ((e -= 3) < 0) break;
                            o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                        } else {
                            if (!(n < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                        }
                    }
                    return o
                }

                function V(t) {
                    return r.toByteArray(function (t) {
                        if ((t = (t = t.split("=")[0]).trim().replace(F, "")).length < 2) return "";
                        for (; t.length % 4 != 0;) t += "=";
                        return t
                    }(t))
                }

                function J(t, e, n, r) {
                    let i;
                    for (i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i) e[i + n] = t[i];
                    return i
                }

                function Z(t, e) {
                    return t instanceof e || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name
                }

                function G(t) {
                    return t != t
                }

                const Y = function () {
                    const t = "0123456789abcdef", e = new Array(256);
                    for (let n = 0; n < 16; ++n) {
                        const r = 16 * n;
                        for (let i = 0; i < 16; ++i) e[r + i] = t[n] + t[i]
                    }
                    return e
                }();

                function X(t) {
                    return "undefined" == typeof BigInt ? Q : t
                }

                function Q() {
                    throw new Error("BigInt not supported")
                }
            }, 468: (t, e, n) => {
                var r = n(81), i = n(645)(r);
                i.push([t.id, "@keyframes rotation {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(359deg);\n  }\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n:host {\n  --hover-opacity: 0.6;\n}\n\n.sc_hover_fade:hover {\n  opacity: var(--hover-opacity);\n}\n\n.sc_fade {\n  opacity: var(--hover-opacity);\n}\n\n::-webkit-scrollbar {\n  width: 10px;\n}\n\n::-webkit-scrollbar-track {\n  background: #f1f1f1;\n}\n\n::-webkit-scrollbar-thumb {\n  background: #54189e;\n}\n", ""]), t.exports = i.toString()
            }, 645: t => {
                t.exports = function (t) {
                    var e = [];
                    return e.toString = function () {
                        return this.map((function (e) {
                            var n = "", r = void 0 !== e[5];
                            return e[4] && (n += "@supports (".concat(e[4], ") {")), e[2] && (n += "@media ".concat(e[2], " {")), r && (n += "@layer".concat(e[5].length > 0 ? " ".concat(e[5]) : "", " {")), n += t(e), r && (n += "}"), e[2] && (n += "}"), e[4] && (n += "}"), n
                        })).join("")
                    }, e.i = function (t, n, r, i, o) {
                        "string" == typeof t && (t = [[null, t, void 0]]);
                        var a = {};
                        if (r) for (var s = 0; s < this.length; s++) {
                            var u = this[s][0];
                            null != u && (a[u] = !0)
                        }
                        for (var c = 0; c < t.length; c++) {
                            var f = [].concat(t[c]);
                            r && a[f[0]] || (void 0 !== o && (void 0 === f[5] || (f[1] = "@layer".concat(f[5].length > 0 ? " ".concat(f[5]) : "", " {").concat(f[1], "}")), f[5] = o), n && (f[2] ? (f[1] = "@media ".concat(f[2], " {").concat(f[1], "}"), f[2] = n) : f[2] = n), i && (f[4] ? (f[1] = "@supports (".concat(f[4], ") {").concat(f[1], "}"), f[4] = i) : f[4] = "".concat(i)), e.push(f))
                        }
                    }, e
                }
            }, 81: t => {
                t.exports = function (t) {
                    return t[1]
                }
            }, 652: function () {
                !function (t) {
                    function e(t, e, n) {
                        return n.a = t, n.f = e, n
                    }

                    function n(t) {
                        return e(2, t, (function (e) {
                            return function (n) {
                                return t(e, n)
                            }
                        }))
                    }

                    function r(t) {
                        return e(3, t, (function (e) {
                            return function (n) {
                                return function (r) {
                                    return t(e, n, r)
                                }
                            }
                        }))
                    }

                    function i(t) {
                        return e(4, t, (function (e) {
                            return function (n) {
                                return function (r) {
                                    return function (i) {
                                        return t(e, n, r, i)
                                    }
                                }
                            }
                        }))
                    }

                    function o(t) {
                        return e(5, t, (function (e) {
                            return function (n) {
                                return function (r) {
                                    return function (i) {
                                        return function (o) {
                                            return t(e, n, r, i, o)
                                        }
                                    }
                                }
                            }
                        }))
                    }

                    function a(t) {
                        return e(6, t, (function (e) {
                            return function (n) {
                                return function (r) {
                                    return function (i) {
                                        return function (o) {
                                            return function (a) {
                                                return t(e, n, r, i, o, a)
                                            }
                                        }
                                    }
                                }
                            }
                        }))
                    }

                    function s(t) {
                        return e(7, t, (function (e) {
                            return function (n) {
                                return function (r) {
                                    return function (i) {
                                        return function (o) {
                                            return function (a) {
                                                return function (s) {
                                                    return t(e, n, r, i, o, a, s)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }))
                    }

                    function u(t) {
                        return e(8, t, (function (e) {
                            return function (n) {
                                return function (r) {
                                    return function (i) {
                                        return function (o) {
                                            return function (a) {
                                                return function (s) {
                                                    return function (u) {
                                                        return t(e, n, r, i, o, a, s, u)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }))
                    }

                    function c(t) {
                        return e(9, t, (function (e) {
                            return function (n) {
                                return function (r) {
                                    return function (i) {
                                        return function (o) {
                                            return function (a) {
                                                return function (s) {
                                                    return function (u) {
                                                        return function (c) {
                                                            return t(e, n, r, i, o, a, s, u, c)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }))
                    }

                    function f(t, e, n) {
                        return 2 === t.a ? t.f(e, n) : t(e)(n)
                    }

                    function l(t, e, n, r) {
                        return 3 === t.a ? t.f(e, n, r) : t(e)(n)(r)
                    }

                    function h(t, e, n, r, i) {
                        return 4 === t.a ? t.f(e, n, r, i) : t(e)(n)(r)(i)
                    }

                    function d(t, e, n, r, i, o) {
                        return 5 === t.a ? t.f(e, n, r, i, o) : t(e)(n)(r)(i)(o)
                    }

                    function p(t, e, n, r, i, o, a) {
                        return 6 === t.a ? t.f(e, n, r, i, o, a) : t(e)(n)(r)(i)(o)(a)
                    }

                    function g(t, e, n, r, i, o, a, s, u) {
                        return 8 === t.a ? t.f(e, n, r, i, o, a, s, u) : t(e)(n)(r)(i)(o)(a)(s)(u)
                    }

                    var y = r((function (t, e, n) {
                        for (var r = new Array(t), i = 0; i < t; i++) r[i] = n(e + i);
                        return r
                    })), m = n((function (t, e) {
                        for (var n = new Array(t), r = 0; r < t && e.b; r++) n[r] = e.a, e = e.b;
                        return n.length = r, I(n, e)
                    })), v = (n((function (t, e) {
                        return e[t]
                    })), r((function (t, e, n) {
                        for (var r = n.length, i = new Array(r), o = 0; o < r; o++) i[o] = n[o];
                        return i[t] = e, i
                    })), n((function (t, e) {
                        for (var n = e.length, r = new Array(n + 1), i = 0; i < n; i++) r[i] = e[i];
                        return r[n] = t, r
                    })), r((function (t, e, n) {
                        for (var r = n.length, i = 0; i < r; i++) e = f(t, n[i], e);
                        return e
                    })), r((function (t, e, n) {
                        for (var r = n.length - 1; r >= 0; r--) e = f(t, n[r], e);
                        return e
                    })));

                    function b(t) {
                        throw new Error("https://github.com/elm/core/blob/1.0.0/hints/" + t + ".md")
                    }

                    function w(t, e) {
                        for (var n, r = [], i = x(t, e, 0, r); i && (n = r.pop()); i = x(n.a, n.b, 0, r)) ;
                        return i
                    }

                    function x(t, e, n, r) {
                        if (t === e) return !0;
                        if ("object" != typeof t || null === t || null === e) return "function" == typeof t && b(5), !1;
                        if (n > 100) return r.push(I(t, e)), !0;
                        for (var i in t.$ < 0 && (t = qe(t), e = qe(e)), t) if (!x(t[i], e[i], n + 1, r)) return !1;
                        return !0
                    }

                    n((function (t, e) {
                        for (var n = e.length, r = new Array(n), i = 0; i < n; i++) r[i] = t(e[i]);
                        return r
                    })), r((function (t, e, n) {
                        for (var r = n.length, i = new Array(r), o = 0; o < r; o++) i[o] = f(t, e + o, n[o]);
                        return i
                    })), r((function (t, e, n) {
                        return n.slice(t, e)
                    })), r((function (t, e, n) {
                        var r = e.length, i = t - r;
                        i > n.length && (i = n.length);
                        for (var o = new Array(r + i), a = 0; a < r; a++) o[a] = e[a];
                        for (a = 0; a < i; a++) o[a + r] = n[a];
                        return o
                    })), n((function (t, e) {
                        return e
                    })), n((function (t, e) {
                        return console.log(t + ": <internals>"), e
                    }));
                    var k = n(w);

                    function E(t, e, n) {
                        if ("object" != typeof t) return t === e ? 0 : t < e ? -1 : 1;
                        if (void 0 === t.$) return (n = E(t.a, e.a)) || (n = E(t.b, e.b)) ? n : E(t.c, e.c);
                        for (; t.b && e.b && !(n = E(t.a, e.a)); t = t.b, e = e.b) ;
                        return n || (t.b ? 1 : e.b ? -1 : 0)
                    }

                    n((function (t, e) {
                        return !w(t, e)
                    })), n((function (t, e) {
                        return E(t, e) < 0
                    })), n((function (t, e) {
                        return E(t, e) < 1
                    })), n((function (t, e) {
                        return E(t, e) > 0
                    })), n((function (t, e) {
                        return E(t, e) >= 0
                    }));
                    var A = n((function (t, e) {
                        var n = E(t, e);
                        return n < 0 ? Fe : n ? De : Ke
                    })), S = 0;

                    function I(t, e) {
                        return {a: t, b: e}
                    }

                    function B(t, e, n) {
                        return {a: t, b: e, c: n}
                    }

                    function M(t, e) {
                        var n = {};
                        for (var r in t) n[r] = t[r];
                        for (var r in e) n[r] = e[r];
                        return n
                    }

                    function O(t, e) {
                        if ("string" == typeof t) return t + e;
                        if (!t.b) return e;
                        var n = T(t.a, e);
                        t = t.b;
                        for (var r = n; t.b; t = t.b) r = r.b = T(t.a, e);
                        return n
                    }

                    n(O);
                    var _ = {$: 0};

                    function T(t, e) {
                        return {$: 1, a: t, b: e}
                    }

                    var L = n(T);

                    function P(t) {
                        for (var e = _, n = t.length; n--;) e = T(t[n], e);
                        return e
                    }

                    function $(t) {
                        for (var e = []; t.b; t = t.b) e.push(t.a);
                        return e
                    }

                    var j = r((function (t, e, n) {
                        for (var r = []; e.b && n.b; e = e.b, n = n.b) r.push(f(t, e.a, n.a));
                        return P(r)
                    })), C = (i((function (t, e, n, r) {
                        for (var i = []; e.b && n.b && r.b; e = e.b, n = n.b, r = r.b) i.push(l(t, e.a, n.a, r.a));
                        return P(i)
                    })), o((function (t, e, n, r, i) {
                        for (var o = []; e.b && n.b && r.b && i.b; e = e.b, n = n.b, r = r.b, i = i.b) o.push(h(t, e.a, n.a, r.a, i.a));
                        return P(o)
                    })), a((function (t, e, n, r, i, o) {
                        for (var a = []; e.b && n.b && r.b && i.b && o.b; e = e.b, n = n.b, r = r.b, i = i.b, o = o.b) a.push(d(t, e.a, n.a, r.a, i.a, o.a));
                        return P(a)
                    })), n((function (t, e) {
                        return P($(e).sort((function (e, n) {
                            return E(t(e), t(n))
                        })))
                    })));
                    n((function (t, e) {
                        return P($(e).sort((function (e, n) {
                            var r = f(t, e, n);
                            return r === Ke ? 0 : r === Fe ? -1 : 1
                        })))
                    })), n((function (t, e) {
                        return t + e
                    })), n((function (t, e) {
                        return t - e
                    })), n((function (t, e) {
                        return t * e
                    })), n((function (t, e) {
                        return t / e
                    })), n((function (t, e) {
                        return t / e | 0
                    })), n(Math.pow), n((function (t, e) {
                        return e % t
                    })), n((function (t, e) {
                        var n = e % t;
                        return 0 === t ? b(11) : n > 0 && t < 0 || n < 0 && t > 0 ? n + t : n
                    })), Math.PI, Math.E, Math.cos, Math.sin, Math.tan, Math.acos, Math.asin, Math.atan, n(Math.atan2);
                    var R = Math.ceil, U = Math.floor, z = Math.round, N = (Math.sqrt, Math.log);
                    isNaN, n((function (t, e) {
                        return t && e
                    })), n((function (t, e) {
                        return t || e
                    })), n((function (t, e) {
                        return t !== e
                    })), n((function (t, e) {
                        return t + e
                    })), n((function (t, e) {
                        return t + e
                    })), n((function (t, e) {
                        for (var n = e.length, r = new Array(n), i = 0; i < n;) {
                            var o = e.charCodeAt(i);
                            55296 <= o && o <= 56319 ? (r[i] = t(e[i] + e[i + 1]), i += 2) : (r[i] = t(e[i]), i++)
                        }
                        return r.join("")
                    })), n((function (t, e) {
                        for (var n = [], r = e.length, i = 0; i < r;) {
                            var o = e[i], a = e.charCodeAt(i);
                            i++, 55296 <= a && a <= 56319 && (o += e[i], i++), t(o) && n.push(o)
                        }
                        return n.join("")
                    })), r((function (t, e, n) {
                        for (var r = n.length, i = 0; i < r;) {
                            var o = n[i], a = n.charCodeAt(i);
                            i++, 55296 <= a && a <= 56319 && (o += n[i], i++), e = f(t, o, e)
                        }
                        return e
                    })), r((function (t, e, n) {
                        for (var r = n.length; r--;) {
                            var i = n[r], o = n.charCodeAt(r);
                            56320 <= o && o <= 57343 && (i = n[--r] + i), e = f(t, i, e)
                        }
                        return e
                    }));
                    var W = n((function (t, e) {
                        return e.split(t)
                    })), q = n((function (t, e) {
                        return e.join(t)
                    })), K = r((function (t, e, n) {
                        return n.slice(t, e)
                    }));
                    n((function (t, e) {
                        for (var n = e.length; n--;) {
                            var r = e[n], i = e.charCodeAt(n);
                            if (56320 <= i && i <= 57343 && (r = e[--n] + r), t(r)) return !0
                        }
                        return !1
                    }));
                    var D = n((function (t, e) {
                        for (var n = e.length; n--;) {
                            var r = e[n], i = e.charCodeAt(n);
                            if (56320 <= i && i <= 57343 && (r = e[--n] + r), !t(r)) return !1
                        }
                        return !0
                    })), F = n((function (t, e) {
                        return e.indexOf(t) > -1
                    })), H = (n((function (t, e) {
                        return 0 === e.indexOf(t)
                    })), n((function (t, e) {
                        return e.length >= t.length && e.lastIndexOf(t) === e.length - t.length
                    })), n((function (t, e) {
                        var n = t.length;
                        if (n < 1) return _;
                        for (var r = 0, i = []; (r = e.indexOf(t, r)) > -1;) i.push(r), r += n;
                        return P(i)
                    })));

                    function V(t) {
                        return t + ""
                    }

                    function J(t) {
                        return {$: 2, b: t}
                    }

                    var Z = J((function (t) {
                        return "number" != typeof t ? st("an INT", t) : -2147483647 < t && t < 2147483647 && (0 | t) === t ? Ge(t) : !isFinite(t) || t % 1 ? st("an INT", t) : Ge(t)
                    })), G = (J((function (t) {
                        return "boolean" == typeof t ? Ge(t) : st("a BOOL", t)
                    })), J((function (t) {
                        return "number" == typeof t ? Ge(t) : st("a FLOAT", t)
                    })), J((function (t) {
                        return Ge(t)
                    })), J((function (t) {
                        return "string" == typeof t ? Ge(t) : t instanceof String ? Ge(t + "") : st("a STRING", t)
                    }))), Y = n((function (t, e) {
                        return {$: 6, d: t, b: e}
                    }));

                    function X(t, e) {
                        return {$: 9, f: t, g: e}
                    }

                    n((function (t, e) {
                        return {$: 7, e: t, b: e}
                    }));
                    var Q = n((function (t, e) {
                        return {$: 10, b: e, h: t}
                    })), tt = n((function (t, e) {
                        return X(t, [e])
                    })), et = r((function (t, e, n) {
                        return X(t, [e, n])
                    })), nt = (i((function (t, e, n, r) {
                        return X(t, [e, n, r])
                    })), o((function (t, e, n, r, i) {
                        return X(t, [e, n, r, i])
                    })), a((function (t, e, n, r, i, o) {
                        return X(t, [e, n, r, i, o])
                    })), s((function (t, e, n, r, i, o, a) {
                        return X(t, [e, n, r, i, o, a])
                    })), u((function (t, e, n, r, i, o, a, s) {
                        return X(t, [e, n, r, i, o, a, s])
                    })), c((function (t, e, n, r, i, o, a, s, u) {
                        return X(t, [e, n, r, i, o, a, s, u])
                    })), n((function (t, e) {
                        try {
                            return rt(t, JSON.parse(e))
                        } catch (t) {
                            return He(f(Ve, "This is not valid JSON! " + t.message, e))
                        }
                    })), n((function (t, e) {
                        return rt(t, e)
                    })));

                    function rt(t, e) {
                        switch (t.$) {
                            case 2:
                                return t.b(e);
                            case 5:
                                return null === e ? Ge(t.c) : st("null", e);
                            case 3:
                                return ot(e) ? it(t.b, e, P) : st("a LIST", e);
                            case 4:
                                return ot(e) ? it(t.b, e, at) : st("an ARRAY", e);
                            case 6:
                                var n = t.d;
                                if ("object" != typeof e || null === e || !(n in e)) return st("an OBJECT with a field named `" + n + "`", e);
                                var r = rt(t.b, e[n]);
                                return qn(r) ? r : He(f(Je, n, r.a));
                            case 7:
                                var i = t.e;
                                return ot(e) ? i >= e.length ? st("a LONGER array. Need index " + i + " but only see " + e.length + " entries", e) : (r = rt(t.b, e[i]), qn(r) ? r : He(f(Ze, i, r.a))) : st("an ARRAY", e);
                            case 8:
                                if ("object" != typeof e || null === e || ot(e)) return st("an OBJECT", e);
                                var o = _;
                                for (var a in e) if (e.hasOwnProperty(a)) {
                                    if (r = rt(t.b, e[a]), !qn(r)) return He(f(Je, a, r.a));
                                    o = T(I(a, r.a), o)
                                }
                                return Ge(vn(o));
                            case 9:
                                for (var s = t.f, u = t.g, c = 0; c < u.length; c++) {
                                    if (r = rt(u[c], e), !qn(r)) return r;
                                    s = s(r.a)
                                }
                                return Ge(s);
                            case 10:
                                return r = rt(t.b, e), qn(r) ? rt(t.h(r.a), e) : r;
                            case 11:
                                for (var l = _, h = t.g; h.b; h = h.b) {
                                    if (r = rt(h.a, e), qn(r)) return r;
                                    l = T(r.a, l)
                                }
                                return He(Ye(vn(l)));
                            case 1:
                                return He(f(Ve, t.a, e));
                            case 0:
                                return Ge(t.a)
                        }
                    }

                    function it(t, e, n) {
                        for (var r = e.length, i = new Array(r), o = 0; o < r; o++) {
                            var a = rt(t, e[o]);
                            if (!qn(a)) return He(f(Ze, o, a.a));
                            i[o] = a.a
                        }
                        return Ge(n(i))
                    }

                    function ot(t) {
                        return Array.isArray(t) || "undefined" != typeof FileList && t instanceof FileList
                    }

                    function at(t) {
                        return f(Wn, t.length, (function (e) {
                            return t[e]
                        }))
                    }

                    function st(t, e) {
                        return He(f(Ve, "Expecting " + t, e))
                    }

                    function ut(t, e) {
                        if (t === e) return !0;
                        if (t.$ !== e.$) return !1;
                        switch (t.$) {
                            case 0:
                            case 1:
                                return t.a === e.a;
                            case 2:
                                return t.b === e.b;
                            case 5:
                                return t.c === e.c;
                            case 3:
                            case 4:
                            case 8:
                                return ut(t.b, e.b);
                            case 6:
                                return t.d === e.d && ut(t.b, e.b);
                            case 7:
                                return t.e === e.e && ut(t.b, e.b);
                            case 9:
                                return t.f === e.f && ct(t.g, e.g);
                            case 10:
                                return t.h === e.h && ut(t.b, e.b);
                            case 11:
                                return ct(t.g, e.g)
                        }
                    }

                    function ct(t, e) {
                        var n = t.length;
                        if (n !== e.length) return !1;
                        for (var r = 0; r < n; r++) if (!ut(t[r], e[r])) return !1;
                        return !0
                    }

                    var ft = n((function (t, e) {
                        return JSON.stringify(e, null, t) + ""
                    }));

                    function lt(t) {
                        return t
                    }

                    var ht = r((function (t, e, n) {
                        return n[t] = e, n
                    }));

                    function dt(t) {
                        return {$: 0, a: t}
                    }

                    function pt(t) {
                        return {$: 2, b: t, c: null}
                    }

                    var gt = n((function (t, e) {
                        return {$: 3, b: t, d: e}
                    }));
                    n((function (t, e) {
                        return {$: 4, b: t, d: e}
                    }));
                    var yt = 0;

                    function mt(t) {
                        var e = {$: 0, e: yt++, f: t, g: null, h: []};
                        return Et(e), e
                    }

                    function vt(t) {
                        return pt((function (e) {
                            e(dt(mt(t)))
                        }))
                    }

                    function bt(t, e) {
                        t.h.push(e), Et(t)
                    }

                    var wt = n((function (t, e) {
                        return pt((function (n) {
                            bt(t, e), n(dt(S))
                        }))
                    })), xt = !1, kt = [];

                    function Et(t) {
                        if (kt.push(t), !xt) {
                            for (xt = !0; t = kt.shift();) At(t);
                            xt = !1
                        }
                    }

                    function At(t) {
                        for (; t.f;) {
                            var e = t.f.$;
                            if (0 === e || 1 === e) {
                                for (; t.g && t.g.$ !== e;) t.g = t.g.i;
                                if (!t.g) return;
                                t.f = t.g.b(t.f.a), t.g = t.g.i
                            } else {
                                if (2 === e) return void (t.f.c = t.f.b((function (e) {
                                    t.f = e, Et(t)
                                })));
                                if (5 === e) {
                                    if (0 === t.h.length) return;
                                    t.f = t.f.b(t.h.shift())
                                } else t.g = {$: 3 === e ? 0 : 1, b: t.f.b, i: t.g}, t.f = t.f.d
                            }
                        }
                    }

                    function St(t, e, n, r, i, o) {
                        var a = f(nt, t, e ? e.flags : void 0);
                        qn(a) || b(2);
                        var s = {}, u = n(a.a), c = u.a, l = o(d, c), h = function (t, e) {
                            var n;
                            for (var r in It) {
                                var i = It[r];
                                i.a && ((n = n || {})[r] = i.a(r, e)), t[r] = Bt(i, e)
                            }
                            return n
                        }(s, d);

                        function d(t, e) {
                            var n = f(r, t, c);
                            l(c = n.a, e), Pt(s, n.b, i(c))
                        }

                        return Pt(s, u.b, i(c)), h ? {ports: h} : {}
                    }

                    i((function (t, e, n, r) {
                        return St(e, r, t.cz, t.du, t.da, (function () {
                            return function () {
                            }
                        }))
                    }));
                    var It = {};

                    function Bt(t, e) {
                        var n = {g: e, h: void 0}, r = t.c, i = t.d, o = t.e, a = t.f;
                        return n.h = mt(f(gt, (function t(e) {
                            return f(gt, t, {
                                $: 5, b: function (t) {
                                    var s = t.a;
                                    return 0 === t.$ ? l(i, n, s, e) : o && a ? h(r, n, s.i, s.j, e) : l(r, n, o ? s.i : s.j, e)
                                }
                            })
                        }), t.b))
                    }

                    var Mt = n((function (t, e) {
                        return pt((function (n) {
                            t.g(e), n(dt(S))
                        }))
                    }));

                    function Ot(t) {
                        return function (e) {
                            return {$: 1, k: t, l: e}
                        }
                    }

                    function _t(t) {
                        return {$: 2, m: t}
                    }

                    n((function (t, e) {
                        return f(wt, t.h, {$: 0, a: e})
                    })), n((function (t, e) {
                        return {$: 3, n: t, o: e}
                    }));
                    var Tt = [], Lt = !1;

                    function Pt(t, e, n) {
                        if (Tt.push({p: t, q: e, r: n}), !Lt) {
                            Lt = !0;
                            for (var r; r = Tt.shift();) $t(r.p, r.q, r.r);
                            Lt = !1
                        }
                    }

                    function $t(t, e, n) {
                        var r = {};
                        for (var i in jt(!0, e, r, null), jt(!1, n, r, null), t) bt(t[i], {
                            $: "fx",
                            a: r[i] || {i: _, j: _}
                        })
                    }

                    function jt(t, e, n, r) {
                        switch (e.$) {
                            case 1:
                                var i = e.k, o = function (t, e, n, r) {
                                    return f(t ? It[e].e : It[e].f, (function (t) {
                                        for (var e = n; e; e = e.t) t = e.s(t);
                                        return t
                                    }), r)
                                }(t, i, r, e.l);
                                return void (n[i] = function (t, e, n) {
                                    return n = n || {i: _, j: _}, t ? n.i = T(e, n.i) : n.j = T(e, n.j), n
                                }(t, o, n[i]));
                            case 2:
                                for (var a = e.m; a.b; a = a.b) jt(t, a.a, n, r);
                                return;
                            case 3:
                                return void jt(t, e.o, n, {s: e.n, t: r})
                        }
                    }

                    function Ct(t) {
                        It[t] && b(3)
                    }

                    function Rt(t, e) {
                        return Ct(t), It[t] = {e: Ut, u: e, a: zt}, Ot(t)
                    }

                    var Ut = n((function (t, e) {
                        return e
                    }));

                    function zt(t) {
                        var e = [], n = It[t].u, i = pt((function (t) {
                            var e = setTimeout((function () {
                                t(dt(S))
                            }), 0);
                            return function () {
                                clearTimeout(e)
                            }
                        }));
                        return It[t].b = i, It[t].c = r((function (t, r, o) {
                            for (; r.b; r = r.b) for (var a = e, s = n(r.a), u = 0; u < a.length; u++) a[u](s);
                            return i
                        })), {
                            subscribe: function (t) {
                                e.push(t)
                            }, unsubscribe: function (t) {
                                var n = (e = e.slice()).indexOf(t);
                                n >= 0 && e.splice(n, 1)
                            }
                        }
                    }

                    function Nt(t, e) {
                        return Ct(t), It[t] = {f: qt, u: e, a: Kt}, Ot(t)
                    }

                    var Wt, qt = n((function (t, e) {
                        return function (n) {
                            return t(e(n))
                        }
                    }));

                    function Kt(t, e) {
                        var n = _, i = It[t].u, o = dt(null);
                        return It[t].b = o, It[t].c = r((function (t, e, r) {
                            return n = e, o
                        })), {
                            send: function (t) {
                                var r = f(nt, i, t);
                                qn(r) || b(4, r.a);
                                for (var o = r.a, a = n; a.b; a = a.b) e(a.a(o))
                            }
                        }
                    }

                    var Dt = "undefined" != typeof document ? document : {};

                    function Ft(t, e) {
                        t.appendChild(e)
                    }

                    function Ht(t) {
                        return {$: 0, a: t}
                    }

                    i((function (t, e, n, r) {
                        var i = r.node;
                        return i.parentNode.replaceChild(fe(t, (function () {
                        })), i), {}
                    }));
                    var Vt = n((function (t, e) {
                        return n((function (n, r) {
                            for (var i = [], o = 0; r.b; r = r.b) {
                                var a = r.a;
                                o += a.b || 0, i.push(a)
                            }
                            return o += i.length, {$: 1, c: e, d: ue(n), e: i, f: t, b: o}
                        }))
                    })), Jt = Vt(void 0), Zt = n((function (t, e) {
                        return n((function (n, r) {
                            for (var i = [], o = 0; r.b; r = r.b) {
                                var a = r.a;
                                o += a.b.b || 0, i.push(a)
                            }
                            return o += i.length, {$: 2, c: e, d: ue(n), e: i, f: t, b: o}
                        }))
                    }))(void 0), Gt = n((function (t, e) {
                        return {$: 4, j: t, k: e, b: 1 + (e.b || 0)}
                    }));

                    function Yt(t, e) {
                        return {$: 5, l: t, m: e, k: void 0}
                    }

                    n((function (t, e) {
                        return Yt([t, e], (function () {
                            return t(e)
                        }))
                    })), r((function (t, e, n) {
                        return Yt([t, e, n], (function () {
                            return f(t, e, n)
                        }))
                    })), i((function (t, e, n, r) {
                        return Yt([t, e, n, r], (function () {
                            return l(t, e, n, r)
                        }))
                    })), o((function (t, e, n, r, i) {
                        return Yt([t, e, n, r, i], (function () {
                            return h(t, e, n, r, i)
                        }))
                    })), a((function (t, e, n, r, i, o) {
                        return Yt([t, e, n, r, i, o], (function () {
                            return d(t, e, n, r, i, o)
                        }))
                    })), s((function (t, e, n, r, i, o, a) {
                        return Yt([t, e, n, r, i, o, a], (function () {
                            return p(t, e, n, r, i, o, a)
                        }))
                    })), u((function (t, e, n, r, i, o, a, s) {
                        return Yt([t, e, n, r, i, o, a, s], (function () {
                            return function (t, e, n, r, i, o, a, s) {
                                return 7 === t.a ? t.f(e, n, r, i, o, a, s) : t(e)(n)(r)(i)(o)(a)(s)
                            }(t, e, n, r, i, o, a, s)
                        }))
                    })), c((function (t, e, n, r, i, o, a, s, u) {
                        return Yt([t, e, n, r, i, o, a, s, u], (function () {
                            return g(t, e, n, r, i, o, a, s, u)
                        }))
                    }));
                    var Xt = n((function (t, e) {
                        return {$: "a0", n: t, o: e}
                    })), Qt = n((function (t, e) {
                        return {$: "a1", n: t, o: e}
                    })), te = n((function (t, e) {
                        return {$: "a2", n: t, o: e}
                    })), ee = n((function (t, e) {
                        return {$: "a3", n: t, o: e}
                    }));

                    function ne(t) {
                        return "script" == t ? "p" : t
                    }

                    function re(t) {
                        return /^\s*(javascript:|data:text\/html)/i.test(t) ? "" : t
                    }

                    r((function (t, e, n) {
                        return {$: "a4", n: e, o: {f: t, o: n}}
                    }));
                    var ie, oe = n((function (t, e) {
                        return "a0" === e.$ ? f(Xt, e.n, function (t, e) {
                            var n = Vn(e);
                            return {$: e.$, a: n ? l(Fn, n < 3 ? ae : se, Hn(t), e.a) : f(Dn, t, e.a)}
                        }(t, e.o)) : e
                    })), ae = n((function (t, e) {
                        return I(t(e.a), e.b)
                    })), se = n((function (t, e) {
                        return {F: t(e.F), aN: e.aN, aI: e.aI}
                    }));

                    function ue(t) {
                        for (var e = {}; t.b; t = t.b) {
                            var n = t.a, r = n.$, i = n.n, o = n.o;
                            if ("a2" !== r) {
                                var a = e[r] || (e[r] = {});
                                "a3" === r && "class" === i ? ce(a, i, o) : a[i] = o
                            } else "className" === i ? ce(e, i, o) : e[i] = o
                        }
                        return e
                    }

                    function ce(t, e, n) {
                        var r = t[e];
                        t[e] = r ? r + " " + n : n
                    }

                    function fe(t, e) {
                        var n = t.$;
                        if (5 === n) return fe(t.k || (t.k = t.m()), e);
                        if (0 === n) return Dt.createTextNode(t.a);
                        if (4 === n) {
                            for (var r = t.k, i = t.j; 4 === r.$;) "object" != typeof i ? i = [i, r.j] : i.push(r.j), r = r.k;
                            var o = {j: i, p: e};
                            return (a = fe(r, o)).elm_event_node_ref = o, a
                        }
                        if (3 === n) return le(a = t.h(t.g), e, t.d), a;
                        var a = t.f ? Dt.createElementNS(t.f, t.c) : Dt.createElement(t.c);
                        Wt && "a" == t.c && a.addEventListener("click", Wt(a)), le(a, e, t.d);
                        for (var s = t.e, u = 0; u < s.length; u++) Ft(a, fe(1 === n ? s[u] : s[u].b, e));
                        return a
                    }

                    function le(t, e, n) {
                        for (var r in n) {
                            var i = n[r];
                            "a1" === r ? he(t, i) : "a0" === r ? ge(t, e, i) : "a3" === r ? de(t, i) : "a4" === r ? pe(t, i) : ("value" !== r && "checked" !== r || t[r] !== i) && (t[r] = i)
                        }
                    }

                    function he(t, e) {
                        var n = t.style;
                        for (var r in e) n[r] = e[r]
                    }

                    function de(t, e) {
                        for (var n in e) {
                            var r = e[n];
                            void 0 !== r ? t.setAttribute(n, r) : t.removeAttribute(n)
                        }
                    }

                    function pe(t, e) {
                        for (var n in e) {
                            var r = e[n], i = r.f, o = r.o;
                            void 0 !== o ? t.setAttributeNS(i, n, o) : t.removeAttributeNS(i, n)
                        }
                    }

                    function ge(t, e, n) {
                        var r = t.elmFs || (t.elmFs = {});
                        for (var i in n) {
                            var o = n[i], a = r[i];
                            if (o) {
                                if (a) {
                                    if (a.q.$ === o.$) {
                                        a.q = o;
                                        continue
                                    }
                                    t.removeEventListener(i, a)
                                }
                                a = ye(e, o), t.addEventListener(i, a, ie && {passive: Vn(o) < 2}), r[i] = a
                            } else t.removeEventListener(i, a), r[i] = void 0
                        }
                    }

                    try {
                        window.addEventListener("t", null, Object.defineProperty({}, "passive", {
                            get: function () {
                                ie = !0
                            }
                        }))
                    } catch (t) {
                    }

                    function ye(t, e) {
                        function n(e) {
                            var r = n.q, i = rt(r.a, e);
                            if (qn(i)) {
                                for (var o, a = Vn(r), s = i.a, u = a ? a < 3 ? s.a : s.F : s, c = 1 == a ? s.b : 3 == a && s.aN, f = (c && e.stopPropagation(), (2 == a ? s.b : 3 == a && s.aI) && e.preventDefault(), t); o = f.j;) {
                                    if ("function" == typeof o) u = o(u); else for (var l = o.length; l--;) u = o[l](u);
                                    f = f.p
                                }
                                f(u, c)
                            }
                        }

                        return n.q = e, n
                    }

                    function me(t, e) {
                        return t.$ == e.$ && ut(t.a, e.a)
                    }

                    function ve(t, e) {
                        var n = [];
                        return we(t, e, n, 0), n
                    }

                    function be(t, e, n, r) {
                        var i = {$: e, r: n, s: r, t: void 0, u: void 0};
                        return t.push(i), i
                    }

                    function we(t, e, n, r) {
                        if (t !== e) {
                            var i = t.$, o = e.$;
                            if (i !== o) {
                                if (1 !== i || 2 !== o) return void be(n, 0, r, e);
                                e = function (t) {
                                    for (var e = t.e, n = e.length, r = new Array(n), i = 0; i < n; i++) r[i] = e[i].b;
                                    return {$: 1, c: t.c, d: t.d, e: r, f: t.f, b: t.b}
                                }(e), o = 1
                            }
                            switch (o) {
                                case 5:
                                    for (var a = t.l, s = e.l, u = a.length, c = u === s.length; c && u--;) c = a[u] === s[u];
                                    if (c) return void (e.k = t.k);
                                    e.k = e.m();
                                    var f = [];
                                    return we(t.k, e.k, f, 0), void (f.length > 0 && be(n, 1, r, f));
                                case 4:
                                    for (var l = t.j, h = e.j, d = !1, p = t.k; 4 === p.$;) d = !0, "object" != typeof l ? l = [l, p.j] : l.push(p.j), p = p.k;
                                    for (var g = e.k; 4 === g.$;) d = !0, "object" != typeof h ? h = [h, g.j] : h.push(g.j), g = g.k;
                                    return d && l.length !== h.length ? void be(n, 0, r, e) : ((d ? function (t, e) {
                                        for (var n = 0; n < t.length; n++) if (t[n] !== e[n]) return !1;
                                        return !0
                                    }(l, h) : l === h) || be(n, 2, r, h), void we(p, g, n, r + 1));
                                case 0:
                                    return void (t.a !== e.a && be(n, 3, r, e.a));
                                case 1:
                                    return void xe(t, e, n, r, Ee);
                                case 2:
                                    return void xe(t, e, n, r, Ae);
                                case 3:
                                    if (t.h !== e.h) return void be(n, 0, r, e);
                                    var y = ke(t.d, e.d);
                                    y && be(n, 4, r, y);
                                    var m = e.i(t.g, e.g);
                                    return void (m && be(n, 5, r, m))
                            }
                        }
                    }

                    function xe(t, e, n, r, i) {
                        if (t.c === e.c && t.f === e.f) {
                            var o = ke(t.d, e.d);
                            o && be(n, 4, r, o), i(t, e, n, r)
                        } else be(n, 0, r, e)
                    }

                    function ke(t, e, n) {
                        var r;
                        for (var i in t) if ("a1" !== i && "a0" !== i && "a3" !== i && "a4" !== i) if (i in e) {
                            var o = t[i], a = e[i];
                            o === a && "value" !== i && "checked" !== i || "a0" === n && me(o, a) || ((r = r || {})[i] = a)
                        } else (r = r || {})[i] = n ? "a1" === n ? "" : "a0" === n || "a3" === n ? void 0 : {
                            f: t[i].f,
                            o: void 0
                        } : "string" == typeof t[i] ? "" : null; else {
                            var s = ke(t[i], e[i] || {}, i);
                            s && ((r = r || {})[i] = s)
                        }
                        for (var u in e) u in t || ((r = r || {})[u] = e[u]);
                        return r
                    }

                    function Ee(t, e, n, r) {
                        var i = t.e, o = e.e, a = i.length, s = o.length;
                        a > s ? be(n, 6, r, {v: s, i: a - s}) : a < s && be(n, 7, r, {v: a, e: o});
                        for (var u = a < s ? a : s, c = 0; c < u; c++) {
                            var f = i[c];
                            we(f, o[c], n, ++r), r += f.b || 0
                        }
                    }

                    function Ae(t, e, n, r) {
                        for (var i = [], o = {}, a = [], s = t.e, u = e.e, c = s.length, f = u.length, l = 0, h = 0, d = r; l < c && h < f;) {
                            var p = s[l], g = u[h], y = p.a, m = g.a, v = p.b, b = g.b, w = void 0, x = void 0;
                            if (y !== m) {
                                var k = s[l + 1], E = u[h + 1];
                                if (k) {
                                    var A = k.a, S = k.b;
                                    x = m === A
                                }
                                if (E) {
                                    var I = E.a, B = E.b;
                                    w = y === I
                                }
                                if (w && x) we(v, B, i, ++d), Ie(o, i, y, b, h, a), d += v.b || 0, Be(o, i, y, S, ++d), d += S.b || 0, l += 2, h += 2; else if (w) d++, Ie(o, i, m, b, h, a), we(v, B, i, d), d += v.b || 0, l += 1, h += 2; else if (x) Be(o, i, y, v, ++d), d += v.b || 0, we(S, b, i, ++d), d += S.b || 0, l += 2, h += 1; else {
                                    if (!k || A !== I) break;
                                    Be(o, i, y, v, ++d), Ie(o, i, m, b, h, a), d += v.b || 0, we(S, B, i, ++d), d += S.b || 0, l += 2, h += 2
                                }
                            } else we(v, b, i, ++d), d += v.b || 0, l++, h++
                        }
                        for (; l < c;) d++, v = (p = s[l]).b, Be(o, i, p.a, v, d), d += v.b || 0, l++;
                        for (; h < f;) {
                            var M = M || [];
                            Ie(o, i, (g = u[h]).a, g.b, void 0, M), h++
                        }
                        (i.length > 0 || a.length > 0 || M) && be(n, 8, r, {w: i, x: a, y: M})
                    }

                    var Se = "_elmW6BL";

                    function Ie(t, e, n, r, i, o) {
                        var a = t[n];
                        if (!a) return a = {c: 0, z: r, r: i, s: void 0}, o.push({r: i, A: a}), void (t[n] = a);
                        if (1 === a.c) {
                            o.push({r: i, A: a}), a.c = 2;
                            var s = [];
                            return we(a.z, r, s, a.r), a.r = i, void (a.s.s = {w: s, A: a})
                        }
                        Ie(t, e, n + Se, r, i, o)
                    }

                    function Be(t, e, n, r, i) {
                        var o = t[n];
                        if (o) {
                            if (0 === o.c) {
                                o.c = 2;
                                var a = [];
                                return we(r, o.z, a, i), void be(e, 9, i, {w: a, A: o})
                            }
                            Be(t, e, n + Se, r, i)
                        } else {
                            var s = be(e, 9, i, void 0);
                            t[n] = {c: 1, z: r, r: i, s}
                        }
                    }

                    function Me(t, e, n, r) {
                        Oe(t, e, n, 0, 0, e.b, r)
                    }

                    function Oe(t, e, n, r, i, o, a) {
                        for (var s = n[r], u = s.r; u === i;) {
                            var c = s.$;
                            if (1 === c) Me(t, e.k, s.s, a); else if (8 === c) s.t = t, s.u = a, (f = s.s.w).length > 0 && Oe(t, e, f, 0, i, o, a); else if (9 === c) {
                                s.t = t, s.u = a;
                                var f, l = s.s;
                                l && (l.A.s = t, (f = l.w).length > 0 && Oe(t, e, f, 0, i, o, a))
                            } else s.t = t, s.u = a;
                            if (!(s = n[++r]) || (u = s.r) > o) return r
                        }
                        var h = e.$;
                        if (4 === h) {
                            for (var d = e.k; 4 === d.$;) d = d.k;
                            return Oe(t, d, n, r, i + 1, o, t.elm_event_node_ref)
                        }
                        for (var p = e.e, g = t.childNodes, y = 0; y < p.length; y++) {
                            i++;
                            var m = 1 === h ? p[y] : p[y].b, v = i + (m.b || 0);
                            if (i <= u && u <= v && (!(s = n[r = Oe(g[y], m, n, r, i, v, a)]) || (u = s.r) > o)) return r;
                            i = v
                        }
                        return r
                    }

                    function _e(t, e, n, r) {
                        return 0 === n.length ? t : (Me(t, e, n, r), Te(t, n))
                    }

                    function Te(t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var r = e[n], i = r.t, o = Le(i, r);
                            i === t && (t = o)
                        }
                        return t
                    }

                    function Le(t, e) {
                        switch (e.$) {
                            case 0:
                                return function (t, e, n) {
                                    var r = t.parentNode, i = fe(e, n);
                                    return i.elm_event_node_ref || (i.elm_event_node_ref = t.elm_event_node_ref), r && i !== t && r.replaceChild(i, t), i
                                }(t, e.s, e.u);
                            case 4:
                                return le(t, e.u, e.s), t;
                            case 3:
                                return t.replaceData(0, t.length, e.s), t;
                            case 1:
                                return Te(t, e.s);
                            case 2:
                                return t.elm_event_node_ref ? t.elm_event_node_ref.j = e.s : t.elm_event_node_ref = {
                                    j: e.s,
                                    p: e.u
                                }, t;
                            case 6:
                                for (var n = e.s, r = 0; r < n.i; r++) t.removeChild(t.childNodes[n.v]);
                                return t;
                            case 7:
                                for (var i = (n = e.s).e, o = (r = n.v, t.childNodes[r]); r < i.length; r++) t.insertBefore(fe(i[r], e.u), o);
                                return t;
                            case 9:
                                if (!(n = e.s)) return t.parentNode.removeChild(t), t;
                                var a = n.A;
                                return void 0 !== a.r && t.parentNode.removeChild(t), a.s = Te(t, n.w), t;
                            case 8:
                                return function (t, e) {
                                    var n = e.s, r = function (t, e) {
                                        if (t) {
                                            for (var n = Dt.createDocumentFragment(), r = 0; r < t.length; r++) {
                                                var i = t[r].A;
                                                Ft(n, 2 === i.c ? i.s : fe(i.z, e.u))
                                            }
                                            return n
                                        }
                                    }(n.y, e);
                                    t = Te(t, n.w);
                                    for (var i = n.x, o = 0; o < i.length; o++) {
                                        var a = i[o], s = a.A, u = 2 === s.c ? s.s : fe(s.z, e.u);
                                        t.insertBefore(u, t.childNodes[a.r])
                                    }
                                    return r && Ft(t, r), t
                                }(t, e);
                            case 5:
                                return e.s(t);
                            default:
                                b(10)
                        }
                    }

                    function Pe(t) {
                        if (3 === t.nodeType) return Ht(t.textContent);
                        if (1 !== t.nodeType) return Ht("");
                        for (var e = _, n = t.attributes, r = n.length; r--;) {
                            var i = n[r], o = i.name, a = i.value;
                            e = T(f(ee, o, a), e)
                        }
                        var s = t.tagName.toLowerCase(), u = _, c = t.childNodes;
                        for (r = c.length; r--;) u = T(Pe(c[r]), u);
                        return l(Jt, s, e, u)
                    }

                    var $e = i((function (t, e, n, r) {
                        return St(e, r, t.cz, t.du, t.da, (function (e, n) {
                            var i = t.dw, o = r.node, a = Pe(o);
                            return Ce(n, (function (t) {
                                var n = i(t), r = ve(a, n);
                                o = _e(o, a, r, e), a = n
                            }))
                        }))
                    })), je = (i((function (t, e, n, r) {
                        return St(e, r, t.cz, t.du, t.da, (function (e, n) {
                            var r = t.aL && t.aL(e), i = t.dw, o = Dt.title, a = Dt.body, s = Pe(a);
                            return Ce(n, (function (t) {
                                Wt = r;
                                var n = i(t), u = Jt("body")(_)(n.b$), c = ve(s, u);
                                a = _e(a, s, c, e), s = u, Wt = 0, o !== n.dp && (Dt.title = o = n.dp)
                            }))
                        }))
                    })), "undefined" != typeof cancelAnimationFrame && cancelAnimationFrame, "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : function (t) {
                        return setTimeout(t, 1e3 / 60)
                    });

                    function Ce(t, e) {
                        e(t);
                        var n = 0;

                        function r() {
                            n = 1 === n ? 0 : (je(r), e(t), 1)
                        }

                        return function (i, o) {
                            t = i, o ? (e(t), 2 === n && (n = 1)) : (0 === n && je(r), n = 2)
                        }
                    }

                    n((function (t, e) {
                        return f(Mr, ar, pt((function () {
                            e && history.go(e), t()
                        })))
                    })), n((function (t, e) {
                        return f(Mr, ar, pt((function () {
                            history.pushState({}, "", e), t()
                        })))
                    })), n((function (t, e) {
                        return f(Mr, ar, pt((function () {
                            history.replaceState({}, "", e), t()
                        })))
                    }));
                    var Re = ("undefined" != typeof document && document, "undefined" != typeof window ? window : {
                        addEventListener: function () {
                        }, removeEventListener: function () {
                        }
                    });

                    function Ue(t, e) {
                        return pt((function (n) {
                            je((function () {
                                var r = document.getElementById(t);
                                n(r ? dt(e(r)) : {$: 1, a: Zn(t)})
                            }))
                        }))
                    }

                    r((function (t, e, n) {
                        return vt(pt((function (r) {
                            function i(t) {
                                mt(n(t))
                            }

                            return t.addEventListener(e, i, ie && {passive: !0}), function () {
                                t.removeEventListener(e, i)
                            }
                        })))
                    })), n((function (t, e) {
                        var n = rt(t, e);
                        return qn(n) ? Xe(n.a) : Qe
                    })), n((function (t, e) {
                        return Ue(e, (function (e) {
                            return e[t](), S
                        }))
                    })), n((function (t, e) {
                        return n = function () {
                            return Re.scroll(t, e), S
                        }, pt((function (t) {
                            je((function () {
                                t(dt(n()))
                            }))
                        }));
                        var n
                    })), r((function (t, e, n) {
                        return Ue(t, (function (t) {
                            return t.scrollLeft = e, t.scrollTop = n, S
                        }))
                    })), n((function (t, e) {
                        return t & e
                    })), n((function (t, e) {
                        return t | e
                    })), n((function (t, e) {
                        return t ^ e
                    })), n((function (t, e) {
                        return e << t
                    })), n((function (t, e) {
                        return e >> t
                    })), n((function (t, e) {
                        return e >>> t
                    }));
                    var ze = L, Ne = v, We = (r((function (t, e, r) {
                        var i = r.c, o = r.d, a = n((function (e, n) {
                            if (e.$) {
                                var r = e.a;
                                return l(Ne, t, n, r)
                            }
                            var i = e.a;
                            return l(Ne, a, n, i)
                        }));
                        return l(Ne, a, l(Ne, t, e, o), i)
                    })), r((function (t, e, n) {
                        for (; ;) {
                            if (-2 === n.$) return e;
                            var r = n.b, i = n.c, o = n.d, a = n.e, s = t, u = l(t, r, i, l(We, t, e, a));
                            t = s, e = u, n = o
                        }
                    }))), qe = function (t) {
                        return l(We, r((function (t, e, n) {
                            return f(ze, I(t, e), n)
                        })), _, t)
                    }, Ke = 1, De = 2, Fe = 0, He = function (t) {
                        return {$: 1, a: t}
                    }, Ve = n((function (t, e) {
                        return {$: 3, a: t, b: e}
                    })), Je = n((function (t, e) {
                        return {$: 0, a: t, b: e}
                    })), Ze = n((function (t, e) {
                        return {$: 1, a: t, b: e}
                    })), Ge = function (t) {
                        return {$: 0, a: t}
                    }, Ye = function (t) {
                        return {$: 2, a: t}
                    }, Xe = function (t) {
                        return {$: 0, a: t}
                    }, Qe = {$: 1}, tn = D, en = ft, nn = V, rn = n((function (t, e) {
                        return f(q, t, $(e))
                    })), on = n((function (t, e) {
                        return P(f(W, t, e))
                    })), an = function (t) {
                        return f(rn, "\n    ", f(on, "\n", t))
                    }, sn = r((function (t, e, n) {
                        for (; ;) {
                            if (!n.b) return e;
                            var r = n.a, i = n.b, o = t, a = f(t, r, e);
                            t = o, e = a, n = i
                        }
                    })), un = function (t) {
                        return l(sn, n((function (t, e) {
                            return e + 1
                        })), 0, t)
                    }, cn = j, fn = r((function (t, e, n) {
                        for (; ;) {
                            if (!(E(t, e) < 1)) return n;
                            var r = t, i = e - 1, o = f(ze, e, n);
                            t = r, e = i, n = o
                        }
                    })), ln = n((function (t, e) {
                        return l(fn, t, e, _)
                    })), hn = n((function (t, e) {
                        return l(cn, t, f(ln, 0, un(e) - 1), e)
                    })), dn = function (t) {
                        var e = t.charCodeAt(0);
                        return 55296 <= e && e <= 56319 ? 1024 * (e - 55296) + t.charCodeAt(1) - 56320 + 65536 : e
                    }, pn = function (t) {
                        var e = dn(t);
                        return 97 <= e && e <= 122
                    }, gn = function (t) {
                        var e = dn(t);
                        return e <= 90 && 65 <= e
                    }, yn = function (t) {
                        return pn(t) || gn(t)
                    }, mn = function (t) {
                        return pn(t) || gn(t) || function (t) {
                            var e = dn(t);
                            return e <= 57 && 48 <= e
                        }(t)
                    }, vn = function (t) {
                        return l(sn, ze, _, t)
                    }, bn = n((function (t, e) {
                        return "\n\n(" + nn(t + 1) + ") " + an(wn(e))
                    })), wn = function (t) {
                        return f(xn, t, _)
                    }, xn = n((function (t, e) {
                        t:for (; ;) switch (t.$) {
                            case 0:
                                var n = t.a, r = t.b, i = function () {
                                    var t, e,
                                        r = (e = (t = n).charCodeAt(0), isNaN(e) ? Qe : Xe(55296 <= e && e <= 56319 ? I(t[0] + t[1], t.slice(2)) : I(t[0], t.slice(1))));
                                    if (1 === r.$) return !1;
                                    var i = r.a, o = i.a, a = i.b;
                                    return yn(o) && f(tn, mn, a)
                                }(), o = r, a = f(ze, i ? "." + n : "['" + n + "']", e);
                                t = o, e = a;
                                continue t;
                            case 1:
                                var s = t.a, u = (r = t.b, "[" + nn(s) + "]");
                                t = o = r, e = a = f(ze, u, e);
                                continue t;
                            case 2:
                                var c = t.a;
                                if (c.b) {
                                    if (c.b.b) {
                                        var l = (e.b ? "The Json.Decode.oneOf at json" + f(rn, "", vn(e)) : "Json.Decode.oneOf") + " failed in the following " + nn(un(c)) + " ways:";
                                        return f(rn, "\n\n", f(ze, l, f(hn, bn, c)))
                                    }
                                    t = o = r = c.a, e = a = e;
                                    continue t
                                }
                                return "Ran into a Json.Decode.oneOf with no possibilities" + (e.b ? " at json" + f(rn, "", vn(e)) : "!");
                            default:
                                var h = t.a, d = t.b;
                                return (l = e.b ? "Problem with the value at json" + f(rn, "", vn(e)) + ":\n\n    " : "Problem with the given value:\n\n") + an(f(en, 4, d)) + "\n\n" + h
                        }
                    })), kn = 32, En = i((function (t, e, n, r) {
                        return {$: 0, a: t, b: e, c: n, d: r}
                    })), An = [], Sn = R, In = n((function (t, e) {
                        return N(e) / N(t)
                    })), Bn = function (t) {
                        return t
                    }, Mn = Sn(f(In, 2, kn)), On = h(En, 0, Mn, An, An), _n = y, Tn = (n((function (t, e) {
                        return t(e)
                    })), n((function (t, e) {
                        return e(t)
                    })), k), Ln = U, Pn = function (t) {
                        return t.length
                    }, $n = n((function (t, e) {
                        return E(t, e) > 0 ? t : e
                    })), jn = m, Cn = n((function (t, e) {
                        for (; ;) {
                            var n = f(jn, kn, t), r = n.a, i = n.b, o = f(ze, {$: 0, a: r}, e);
                            if (!i.b) return vn(o);
                            t = i, e = o
                        }
                    })), Rn = function (t) {
                        return t.a
                    }, Un = n((function (t, e) {
                        for (; ;) {
                            var n = Sn(e / kn);
                            if (1 === n) return f(jn, kn, t).a;
                            t = f(Cn, t, _), e = n
                        }
                    })), zn = n((function (t, e) {
                        if (e.c) {
                            var n = e.c * kn, r = Ln(f(In, kn, n - 1)), i = t ? vn(e.g) : e.g, o = f(Un, i, e.c);
                            return h(En, Pn(e.f) + n, f($n, 5, r * Mn), o, e.f)
                        }
                        return h(En, Pn(e.f), Mn, An, e.f)
                    })), Nn = o((function (t, e, n, r, i) {
                        for (; ;) {
                            if (e < 0) return f(zn, !1, {g: r, c: n / kn | 0, f: i});
                            var o = {$: 1, a: l(_n, kn, e, t)};
                            e -= kn, r = f(ze, o, r)
                        }
                    })), Wn = n((function (t, e) {
                        if (t <= 0) return On;
                        var n = t % kn, r = l(_n, n, t - n, e);
                        return d(Nn, e, t - n - kn, t, _, r)
                    })), qn = function (t) {
                        return !t.$
                    }, Kn = Q, Dn = tt, Fn = et, Hn = function (t) {
                        return {$: 0, a: t}
                    }, Vn = function (t) {
                        switch (t.$) {
                            case 0:
                                return 0;
                            case 1:
                                return 1;
                            case 2:
                                return 2;
                            default:
                                return 3
                        }
                    }, Jn = function (t) {
                        return t
                    }, Zn = Jn, Gn = a((function (t, e, n, r, i, o) {
                        return {a1: o, a5: e, bj: r, bl: n, bo: t, bp: i}
                    })), Yn = F, Xn = K, Qn = n((function (t, e) {
                        return t < 1 ? e : l(Xn, t, e.length, e)
                    })), tr = H, er = function (t) {
                        return "" === t
                    }, nr = n((function (t, e) {
                        return t < 1 ? "" : l(Xn, 0, t, e)
                    })), rr = o((function (t, e, n, r, i) {
                        if (er(i) || f(Yn, "@", i)) return Qe;
                        var o = f(tr, ":", i);
                        if (o.b) {
                            if (o.b.b) return Qe;
                            var a = o.a, s = function (t) {
                                for (var e = 0, n = t.charCodeAt(0), r = 43 == n || 45 == n ? 1 : 0, i = r; i < t.length; ++i) {
                                    var o = t.charCodeAt(i);
                                    if (o < 48 || 57 < o) return Qe;
                                    e = 10 * e + o - 48
                                }
                                return i == r ? Qe : Xe(45 == n ? -e : e)
                            }(f(Qn, a + 1, i));
                            if (1 === s.$) return Qe;
                            var u = s;
                            return Xe(p(Gn, t, f(nr, a, i), u, e, n, r))
                        }
                        return Xe(p(Gn, t, i, Qe, e, n, r))
                    })), ir = i((function (t, e, n, r) {
                        if (er(r)) return Qe;
                        var i = f(tr, "/", r);
                        if (i.b) {
                            var o = i.a;
                            return d(rr, t, f(Qn, o, r), e, n, f(nr, o, r))
                        }
                        return d(rr, t, "/", e, n, r)
                    })), or = r((function (t, e, n) {
                        if (er(n)) return Qe;
                        var r = f(tr, "?", n);
                        if (r.b) {
                            var i = r.a;
                            return h(ir, t, Xe(f(Qn, i + 1, n)), e, f(nr, i, n))
                        }
                        return h(ir, t, Qe, e, n)
                    })), ar = (n((function (t, e) {
                        if (er(e)) return Qe;
                        var n = f(tr, "#", e);
                        if (n.b) {
                            var r = n.a;
                            return l(or, t, Xe(f(Qn, r + 1, e)), f(nr, r, e))
                        }
                        return l(or, t, Qe, e)
                    })), function (t) {
                        for (; ;) ;
                    }), sr = dt, ur = sr(0), cr = i((function (t, e, n, r) {
                        if (r.b) {
                            var i = r.a, o = r.b;
                            if (o.b) {
                                var a = o.a, s = o.b;
                                if (s.b) {
                                    var u = s.a, c = s.b;
                                    if (c.b) {
                                        var d = c.a, p = c.b;
                                        return f(t, i, f(t, a, f(t, u, f(t, d, n > 500 ? l(sn, t, e, vn(p)) : h(cr, t, e, n + 1, p)))))
                                    }
                                    return f(t, i, f(t, a, f(t, u, e)))
                                }
                                return f(t, i, f(t, a, e))
                            }
                            return f(t, i, e)
                        }
                        return e
                    })), fr = r((function (t, e, n) {
                        return h(cr, t, e, 0, n)
                    })), lr = n((function (t, e) {
                        return l(fr, n((function (e, n) {
                            return f(ze, t(e), n)
                        })), _, e)
                    })), hr = gt, dr = n((function (t, e) {
                        return f(hr, (function (e) {
                            return sr(t(e))
                        }), e)
                    })), pr = r((function (t, e, n) {
                        return f(hr, (function (e) {
                            return f(hr, (function (n) {
                                return sr(f(t, e, n))
                            }), n)
                        }), e)
                    })), gr = Mt, yr = n((function (t, e) {
                        var n = e;
                        return vt(f(hr, gr(t), n))
                    })), mr = r((function (t, e, n) {
                        return f(dr, (function (t) {
                            return 0
                        }), (r = f(lr, yr(t), e), l(fr, pr(ze), sr(_), r)));
                        var r
                    })), vr = r((function (t, e, n) {
                        return sr(0)
                    })), br = n((function (t, e) {
                        return f(dr, t, e)
                    }));
                    It.Task = {b: ur, c: mr, d: vr, e: br, f: void 0};
                    var wr, xr, kr, Er, Ar, Sr, Ir, Br = Ot("Task"), Mr = n((function (t, e) {
                            return Br(f(dr, t, e))
                        })), Or = $e, _r = Y, Tr = lt, Lr = Rt("log", Tr), Pr = Z, $r = function (t) {
                            return {$: 2, a: t}
                        }, jr = {$: 5}, Cr = function (t) {
                            return {$: 0, a: t}
                        }, Rr = {$: 6}, Ur = n((function (t, e) {
                            return t
                        })), zr = _t, Nr = function (t) {
                            return {$: 5, c: t}
                        }, Wr = G, qr = Nt("connectCb", (Ir = P([Nr(Qe), f(Dn, Xe, Wr)]), {$: 11, g: Ir})),
                        Kr = Nt("disconnectIn", Nr(0)), Dr = Nt("walletCb", f(Kn, (function (t) {
                            return f(Kn, (function (e) {
                                return Hn({cv: e, cL: t})
                            }), f(_r, "icon", Wr))
                        }), f(_r, "name", Wr))), Fr = Nt("walletTimeout", Nr(0)), Hr = n((function (t, e) {
                            return e.$ ? Qe : t(e.a)
                        })), Vr = Rt("close", (function (t) {
                            return null
                        })), Jr = r((function (t, e, n) {
                            return e(t(n))
                        })), Zr = Rt("connect", Tr), Gr = Rt("copy", Tr), Yr = lt, Xr = Rt("disconnect", Yr),
                        Qr = n((function (t, e) {
                            for (; ;) {
                                if (!e.b) return Qe;
                                var n = e.a, r = e.b;
                                if (t(n)) return Xe(n);
                                e = r
                            }
                        })), ti = r((function (t, e, n) {
                            if (1 === e.$) return Qe;
                            var r = e.a;
                            if (1 === n.$) return Qe;
                            var i = n.a;
                            return Xe(f(t, r, i))
                        })), ei = _t, ni = ei(_), ri = C, ii = r((function (t, e, n) {
                            return 1 === n.$ ? t : e(n.a)
                        })), oi = n((function (t, e) {
                            return e.$ ? t : e.a
                        })), ai = n((function (t, e) {
                            switch (t.$) {
                                case 0:
                                    var r = t.a;
                                    return I(M(e, {
                                        dy: Xe(f(ri, (function (t) {
                                            return t.cL
                                        }), l(ii, P([r]), ze(r), e.dy)))
                                    }), ni);
                                case 6:
                                    return I(M(e, {dy: w(e.dy, Qe) ? Xe(_) : e.dy}), ni);
                                case 1:
                                    return r = t.a, I(M(e, {ce: Xe(r)}), Zr(r));
                                case 4:
                                    var i = t.a;
                                    return I(e, Xr(i));
                                case 7:
                                    var o = t.a;
                                    return I(e, Gr(o));
                                case 5:
                                    return I(M(e, {dx: Qe}), ni);
                                case 3:
                                    return I(e, Vr(0));
                                default:
                                    var a = t.a, s = l(ti, n((function (t, e) {
                                        return {bK: e, cJ: t}
                                    })), f(Hr, (function (t) {
                                        return f(Qr, f(Jr, (function (t) {
                                            return t.cL
                                        }), Tn(t)), f(oi, _, e.dy))
                                    }), e.ce), a);
                                    return l(ii, I(M(e, {ce: Qe}), ni), (function (t) {
                                        return I(M(e, {ce: Qe, dx: Xe(t)}), ni)
                                    }), s)
                            }
                        })), si = {$: 3}, ui = function (t) {
                            return {$: 7, a: t}
                        }, ci = function (t) {
                            return {$: 4, a: t}
                        }, fi = function (t) {
                            return {$: 5, a: t}
                        }, li = fi(2), hi = function (t) {
                            return {$: 6, a: t}
                        }, di = hi(2), pi = i((function (t, e, n, r) {
                            return {$: 0, a: t, b: e, c: n, d: r}
                        })), gi = r((function (t, e, n) {
                            return h(pi, t / 255, e / 255, n / 255, 1)
                        })), yi = l(gi, 0, 0, 0), mi = n((function (t, e) {
                            return {$: 3, a: t, b: e}
                        })), vi = "cx", bi = "cy", wi = "accx", xi = "accy", ki = "s", Ei = "bh", Ai = "ctr", Si = "ccy",
                        Ii = "cptr", Bi = "hf", Mi = "hfp", Oi = "fr", _i = "nb", Ti = "notxt", Li = "ol", Pi = "or",
                        $i = "oq", ji = "r", Ci = "e", Ri = "cap", Ui = "sev", zi = "t", Ni = "clr", Wi = "wc",
                        qi = "wf", Ki = "wfp", Di = "wrp", Fi = function (t) {
                            return t > 31 ? {$: 1, a: 1 << t - 32} : {$: 0, a: 1 << t}
                        }, Hi = Fi(13), Vi = f(mi, Hi, "w7"), Ji = function (t) {
                            return {$: 1, a: t}
                        }, Zi = {$: 8}, Gi = function (t) {
                            return {$: 2, a: t}
                        }, Yi = function (t) {
                            return {$: 0, a: t}
                        }, Xi = n((function (t, e) {
                            return f(te, t, Yr(e))
                        })), Qi = Xi("disabled"), to = {$: 0}, eo = {$: 0}, no = function (t) {
                            return {$: 1, a: t}
                        }, ro = {$: 0}, io = function (t) {
                            return {$: 1, a: t}
                        }, oo = function (t) {
                            return {$: 0, a: t}
                        }, ao = n((function (t, e) {
                            switch (e.$) {
                                case 0:
                                    return t;
                                case 1:
                                    return O(e.a, t);
                                case 2:
                                    return O(t, e.a);
                                default:
                                    return O(e.a, O(t, e.b))
                            }
                        })), so = r((function (t, e, n) {
                            switch (n.$) {
                                case 0:
                                    return e;
                                case 1:
                                    var r = n.a;
                                    return O(f(lr, (function (e) {
                                        return I(t, e)
                                    }), r), e);
                                case 2:
                                    var i = n.a;
                                    return O(e, f(lr, (function (e) {
                                        return I(t, e)
                                    }), i));
                                default:
                                    return r = n.a, i = n.b, O(f(lr, (function (e) {
                                        return I(t, e)
                                    }), r), O(e, f(lr, (function (e) {
                                        return I(t, e)
                                    }), i)))
                            }
                        })), uo = Fi(41), co = Fi(40), fo = Fi(42), lo = Fi(43), ho = n((function (t, e) {
                            return f(te, t, Tr(e))
                        })), po = ho("className"), go = Jt("div"), yo = {$: -2}, mo = yo, vo = mo, bo = function (t) {
                            switch (t.$) {
                                case 0:
                                    var e = t.a;
                                    return nn(e) + "px";
                                case 1:
                                    return "auto";
                                case 2:
                                    var n = t.a;
                                    return nn(n) + "fr";
                                case 3:
                                    var r = t.a, i = t.b;
                                    return "min" + (nn(r) + bo(i));
                                default:
                                    var o = t.a;
                                    return i = t.b, "max" + (nn(o) + bo(i))
                            }
                        }, wo = z, xo = function (t) {
                            return nn(wo(255 * t))
                        }, ko = function (t) {
                            switch (t.$) {
                                case 0:
                                    return Qe;
                                case 1:
                                    var e = t.a, n = e.a, r = e.b, i = e.c;
                                    return Xe("mv-" + xo(n) + "-" + xo(r) + "-" + xo(i));
                                default:
                                    var o = t.a, a = o.a, s = o.b, u = o.c, c = t.b, f = c.a, l = c.b, h = c.c, d = t.c,
                                        p = d.a, g = d.b, y = d.c, m = t.d;
                                    return Xe("tfrm-" + xo(a) + "-" + xo(s) + "-" + xo(u) + "-" + xo(f) + "-" + xo(l) + "-" + xo(h) + "-" + xo(p) + "-" + xo(g) + "-" + xo(y) + "-" + xo(m))
                            }
                        }, Eo = function (t) {
                            switch (t.$) {
                                case 13:
                                case 1:
                                    return e = t.a;
                                case 12:
                                    var e = t.a;
                                    return t.b, e;
                                case 0:
                                case 3:
                                case 4:
                                    return t.a;
                                case 2:
                                    var n = t.a;
                                    return "font-size-" + nn(n);
                                case 5:
                                    var r = t.a, i = t.b;
                                    return t.c, r;
                                case 7:
                                case 6:
                                    return r = t.a, t.b, t.c, t.d, t.e, r;
                                case 8:
                                    var o = t.a;
                                    return "grid-rows-" + f(rn, "-", f(lr, bo, o.cX)) + "-cols-" + f(rn, "-", f(lr, bo, o.x)) + "-space-x-" + bo(o.c4.a) + "-space-y-" + bo(o.c4.b);
                                case 9:
                                    var a = t.a;
                                    return "gp grid-pos-" + nn(a.u) + "-" + nn(a.cd) + "-" + nn(a.bD) + "-" + nn(a.cq);
                                case 11:
                                    var s = t.a, u = t.b;
                                    return e = function () {
                                        switch (s) {
                                            case 0:
                                                return "fs";
                                            case 1:
                                                return "hv";
                                            default:
                                                return "act"
                                        }
                                    }(), f(rn, " ", f(lr, (function (t) {
                                        var n = Eo(t);
                                        return "" === n ? "" : n + "-" + e
                                    }), u));
                                default:
                                    return i = t.a, f(oi, "", ko(i))
                            }
                        }, Ao = o((function (t, e, n, r, i) {
                            return {$: -1, a: t, b: e, c: n, d: r, e: i}
                        })), So = o((function (t, e, n, r, i) {
                            if (-1 !== i.$ || i.a) {
                                if (-1 !== r.$ || r.a || -1 !== r.d.$ || r.d.a) return d(Ao, t, e, n, r, i);
                                r.a, g = r.b, y = r.c;
                                var o = r.d, a = (o.a, o.b), s = o.c, u = o.d, c = o.e;
                                return v = r.e, d(Ao, 0, g, y, d(Ao, 1, a, s, u, c), d(Ao, 1, e, n, v, i))
                            }
                            i.a;
                            var f = i.b, l = i.c, h = i.d, p = i.e;
                            if (-1 !== r.$ || r.a) return d(Ao, t, f, l, d(Ao, 0, e, n, r, h), p);
                            r.a;
                            var g = r.b, y = r.c, m = r.d, v = r.e;
                            return d(Ao, 0, e, n, d(Ao, 1, g, y, m, v), d(Ao, 1, f, l, h, p))
                        })), Io = A, Bo = r((function (t, e, n) {
                            if (-2 === n.$) return d(Ao, 0, t, e, yo, yo);
                            var r = n.a, i = n.b, o = n.c, a = n.d, s = n.e;
                            switch (f(Io, t, i)) {
                                case 0:
                                    return d(So, r, i, o, l(Bo, t, e, a), s);
                                case 1:
                                    return d(Ao, r, i, e, a, s);
                                default:
                                    return d(So, r, i, o, a, l(Bo, t, e, s))
                            }
                        })), Mo = r((function (t, e, n) {
                            var r = l(Bo, t, e, n);
                            if (-1 !== r.$ || r.a) return r;
                            r.a;
                            var i = r.b, o = r.c, a = r.d, s = r.e;
                            return d(Ao, 1, i, o, a, s)
                        })), Oo = n((function (t, e) {
                            return l(Mo, t, 0, e)
                        })), _o = n((function (t, e) {
                            t:for (; ;) {
                                if (-2 === e.$) return Qe;
                                var n = e.b, r = e.c, i = e.d, o = e.e;
                                switch (f(Io, t, n)) {
                                    case 0:
                                        e = i;
                                        continue t;
                                    case 1:
                                        return Xe(r);
                                    default:
                                        e = o;
                                        continue t
                                }
                            }
                        })), To = n((function (t, e) {
                            return !f(_o, t, e).$
                        })), Lo = n((function (t, e) {
                            return f(To, t, e)
                        })), Po = n((function (t, e) {
                            var n = e.a, r = e.b, i = Eo(t);
                            return f(Lo, i, n) ? e : I(f(Oo, i, n), f(ze, t, r))
                        })), $o = n((function (t, e) {
                            return {$: 0, a: t, b: e}
                        })), jo = n((function (t, e) {
                            return {$: 0, a: t, b: e}
                        })), Co = function (t) {
                            return "." + t
                        }, Ro = r((function (t, e, n) {
                            var r = t(e);
                            if (r.$) return n;
                            var i = r.a;
                            return f(ze, i, n)
                        })), Uo = n((function (t, e) {
                            return l(fr, Ro(t), _, e)
                        })), zo = V, No = function (t) {
                            var e = t.a, n = t.b, r = t.c, i = t.d;
                            return "rgba(" + nn(wo(255 * e)) + "," + nn(wo(255 * n)) + "," + nn(wo(255 * r)) + "," + zo(i) + ")"
                        }, Wo = function (t) {
                            return f(rn, " ", f(Uo, Jn, P([t.a7 ? Xe("inset") : Qe, Xe(zo(t.be.a) + "px"), Xe(zo(t.be.b) + "px"), Xe(zo(t.V) + "px"), Xe(zo(t.Z) + "px"), Xe(No(t.W))])))
                        }, qo = n((function (t, e) {
                            if (e.$) return Qe;
                            var n = e.a;
                            return Xe(t(n))
                        })), Ko = n((function (t, e) {
                            var n = e.a, r = e.b;
                            return I(t(n), r)
                        })), Do = n((function (t, e) {
                            return I(e.a, t(e.b))
                        })), Fo = function (t) {
                            return P([f(jo, Co("focus-within") + ":focus-within", f(Uo, Jn, P([f(qo, (function (t) {
                                return f($o, "border-color", No(t))
                            }), t.b1), f(qo, (function (t) {
                                return f($o, "background-color", No(t))
                            }), t.bX), f(qo, (function (t) {
                                return f($o, "box-shadow", Wo({
                                    V: t.V,
                                    W: t.W,
                                    a7: !1,
                                    be: f(Do, Bn, f(Ko, Bn, t.be)),
                                    Z: t.Z
                                }))
                            }), t.c0), Xe(f($o, "outline", "none"))]))), f(jo, Co(ki) + ":focus .focusable, " + Co(ki) + ".focusable:focus, .ui-slide-bar:focus + " + Co(ki) + " .focusable-thumb", f(Uo, Jn, P([f(qo, (function (t) {
                                return f($o, "border-color", No(t))
                            }), t.b1), f(qo, (function (t) {
                                return f($o, "background-color", No(t))
                            }), t.bX), f(qo, (function (t) {
                                return f($o, "box-shadow", Wo({
                                    V: t.V,
                                    W: t.W,
                                    a7: !1,
                                    be: f(Do, Bn, f(Ko, Bn, t.be)),
                                    Z: t.Z
                                }))
                            }), t.c0), Xe(f($o, "outline", "none"))])))])
                        }, Ho = function (t) {
                            return Jt(ne(t))
                        }, Vo = n((function (t, e) {
                            return f(te, function (t) {
                                return "innerHTML" == t || "formAction" == t ? "data-" + t : t
                            }(t), re(e))
                        })), Jo = n((function (t, e) {
                            return {$: 2, a: t, b: e}
                        })), Zo = function (t) {
                            return {$: 6, a: t}
                        }, Go = n((function (t, e) {
                            return {$: 1, a: t, b: e}
                        })), Yo = n((function (t, e) {
                            return {$: 0, a: t, b: e}
                        })), Xo = n((function (t, e) {
                            return {$: 4, a: t, b: e}
                        })), Qo = n((function (t, e) {
                            return {$: 0, a: t, b: e}
                        })), ta = n((function (t, e) {
                            return {$: 3, a: t, b: e}
                        })), ea = P([0, 1, 2, 3, 4, 5]), na = n((function (t, e) {
                            return e.b ? l(fr, ze, e, t) : t
                        })), ra = function (t) {
                            return l(fr, na, _, t)
                        }, ia = n((function (t, e) {
                            return ra(f(lr, t, e))
                        })), oa = function (t) {
                            switch (t) {
                                case 0:
                                    return Co("ct");
                                case 1:
                                    return Co("cb");
                                case 2:
                                    return Co("cr");
                                case 3:
                                    return Co("cl");
                                case 4:
                                    return Co("ccx");
                                default:
                                    return Co(Si)
                            }
                        }, aa = function (t) {
                            switch (t) {
                                case 0:
                                    return Co("at");
                                case 1:
                                    return Co("ab");
                                case 2:
                                    return Co("ar");
                                case 3:
                                    return Co("al");
                                case 4:
                                    return Co(vi);
                                default:
                                    return Co(bi)
                            }
                        }, sa = function (t) {
                            return Zo(f(ia, (function (e) {
                                var n = t(e), r = n.a, i = n.b;
                                return P([f(Xo, oa(e), r), f(Go, Co(ki), P([f(Xo, aa(e), i)]))])
                            }), ea))
                        },
                        ua = P([f(Qo, "display", "flex"), f(Qo, "flex-direction", "column"), f(Qo, "white-space", "pre"), f(Xo, Co("hbh"), P([f(Qo, "z-index", "0"), f(Go, Co(Ei), P([f(Qo, "z-index", "-1")]))])), f(Xo, Co("sbt"), P([f(Go, Co(zi), P([f(Xo, Co(Bi), P([f(Qo, "flex-grow", "0")])), f(Xo, Co(qi), P([f(Qo, "align-self", "auto !important")]))]))])), f(Go, Co("hc"), P([f(Qo, "height", "auto")])), f(Go, Co(Bi), P([f(Qo, "flex-grow", "100000")])), f(Go, Co(qi), P([f(Qo, "width", "100%")])), f(Go, Co(Ki), P([f(Qo, "width", "100%")])), f(Go, Co(Wi), P([f(Qo, "align-self", "flex-start")])), sa((function (t) {
                            switch (t) {
                                case 0:
                                    return I(P([f(Qo, "justify-content", "flex-start")]), P([f(Qo, "margin-bottom", "auto !important"), f(Qo, "margin-top", "0 !important")]));
                                case 1:
                                    return I(P([f(Qo, "justify-content", "flex-end")]), P([f(Qo, "margin-top", "auto !important"), f(Qo, "margin-bottom", "0 !important")]));
                                case 2:
                                    return I(P([f(Qo, "align-items", "flex-end")]), P([f(Qo, "align-self", "flex-end")]));
                                case 3:
                                    return I(P([f(Qo, "align-items", "flex-start")]), P([f(Qo, "align-self", "flex-start")]));
                                case 4:
                                    return I(P([f(Qo, "align-items", "center")]), P([f(Qo, "align-self", "center")]));
                                default:
                                    return I(P([f(Go, Co(ki), P([f(Qo, "margin-top", "auto"), f(Qo, "margin-bottom", "auto")]))]), P([f(Qo, "margin-top", "auto !important"), f(Qo, "margin-bottom", "auto !important")]))
                            }
                        }))]), ca = P([0, 1, 2, 3, 4, 5]),
                        fa = P([f(Yo, "html,body", P([f(Qo, "height", "100%"), f(Qo, "padding", "0"), f(Qo, "margin", "0")])), f(Yo, O(Co(ki), O(Co(Ci), Co("ic"))), P([f(Qo, "display", "block"), f(Xo, Co(Bi), P([f(Go, "img", P([f(Qo, "max-height", "100%"), f(Qo, "object-fit", "cover")]))])), f(Xo, Co(qi), P([f(Go, "img", P([f(Qo, "max-width", "100%"), f(Qo, "object-fit", "cover")]))]))])), f(Yo, Co(ki) + ":focus", P([f(Qo, "outline", "none")])), f(Yo, Co("ui"), P([f(Qo, "width", "100%"), f(Qo, "height", "auto"), f(Qo, "min-height", "100%"), f(Qo, "z-index", "0"), f(Xo, O(Co(ki), Co(Bi)), P([f(Qo, "height", "100%"), f(Go, Co(Bi), P([f(Qo, "height", "100%")]))])), f(Go, Co(Oi), P([f(Xo, Co(_i), P([f(Qo, "position", "fixed"), f(Qo, "z-index", "20")]))]))])), f(Yo, Co(_i), P([f(Qo, "position", "relative"), f(Qo, "border", "none"), f(Qo, "display", "flex"), f(Qo, "flex-direction", "row"), f(Qo, "flex-basis", "auto"), f(Xo, Co(Ci), ua), Zo(f(lr, (function (t) {
                            switch (t) {
                                case 0:
                                    return f(Xo, Co("a"), P([f(Qo, "position", "absolute"), f(Qo, "bottom", "100%"), f(Qo, "left", "0"), f(Qo, "width", "100%"), f(Qo, "z-index", "20"), f(Qo, "margin", "0 !important"), f(Go, Co(Bi), P([f(Qo, "height", "auto")])), f(Go, Co(qi), P([f(Qo, "width", "100%")])), f(Qo, "pointer-events", "none"), f(Go, "*", P([f(Qo, "pointer-events", "auto")]))]));
                                case 1:
                                    return f(Xo, Co("b"), P([f(Qo, "position", "absolute"), f(Qo, "bottom", "0"), f(Qo, "left", "0"), f(Qo, "height", "0"), f(Qo, "width", "100%"), f(Qo, "z-index", "20"), f(Qo, "margin", "0 !important"), f(Qo, "pointer-events", "none"), f(Go, "*", P([f(Qo, "pointer-events", "auto")])), f(Go, Co(Bi), P([f(Qo, "height", "auto")]))]));
                                case 2:
                                    return f(Xo, Co(Pi), P([f(Qo, "position", "absolute"), f(Qo, "left", "100%"), f(Qo, "top", "0"), f(Qo, "height", "100%"), f(Qo, "margin", "0 !important"), f(Qo, "z-index", "20"), f(Qo, "pointer-events", "none"), f(Go, "*", P([f(Qo, "pointer-events", "auto")]))]));
                                case 3:
                                    return f(Xo, Co(Li), P([f(Qo, "position", "absolute"), f(Qo, "right", "100%"), f(Qo, "top", "0"), f(Qo, "height", "100%"), f(Qo, "margin", "0 !important"), f(Qo, "z-index", "20"), f(Qo, "pointer-events", "none"), f(Go, "*", P([f(Qo, "pointer-events", "auto")]))]));
                                case 4:
                                    return f(Xo, Co(Oi), P([f(Qo, "position", "absolute"), f(Qo, "width", "100%"), f(Qo, "height", "100%"), f(Qo, "left", "0"), f(Qo, "top", "0"), f(Qo, "margin", "0 !important"), f(Qo, "pointer-events", "none"), f(Go, "*", P([f(Qo, "pointer-events", "auto")]))]));
                                default:
                                    return f(Xo, Co(Ei), P([f(Qo, "position", "absolute"), f(Qo, "width", "100%"), f(Qo, "height", "100%"), f(Qo, "left", "0"), f(Qo, "top", "0"), f(Qo, "margin", "0 !important"), f(Qo, "z-index", "0"), f(Qo, "pointer-events", "none"), f(Go, "*", P([f(Qo, "pointer-events", "auto")]))]))
                            }
                        }), ca))])), f(Yo, Co(ki), P([f(Qo, "position", "relative"), f(Qo, "border", "none"), f(Qo, "flex-shrink", "0"), f(Qo, "display", "flex"), f(Qo, "flex-direction", "row"), f(Qo, "flex-basis", "auto"), f(Qo, "resize", "none"), f(Qo, "font-feature-settings", "inherit"), f(Qo, "box-sizing", "border-box"), f(Qo, "margin", "0"), f(Qo, "padding", "0"), f(Qo, "border-width", "0"), f(Qo, "border-style", "solid"), f(Qo, "font-size", "inherit"), f(Qo, "color", "inherit"), f(Qo, "font-family", "inherit"), f(Qo, "line-height", "1"), f(Qo, "font-weight", "inherit"), f(Qo, "text-decoration", "none"), f(Qo, "font-style", "inherit"), f(Xo, Co(Di), P([f(Qo, "flex-wrap", "wrap")])), f(Xo, Co(Ti), P([f(Qo, "-moz-user-select", "none"), f(Qo, "-webkit-user-select", "none"), f(Qo, "-ms-user-select", "none"), f(Qo, "user-select", "none")])), f(Xo, Co(Ii), P([f(Qo, "cursor", "pointer")])), f(Xo, Co("ctxt"), P([f(Qo, "cursor", "text")])), f(Xo, Co("ppe"), P([f(Qo, "pointer-events", "none !important")])), f(Xo, Co("cpe"), P([f(Qo, "pointer-events", "auto !important")])), f(Xo, Co(Ni), P([f(Qo, "opacity", "0")])), f(Xo, Co($i), P([f(Qo, "opacity", "1")])), f(Xo, Co(O("hv", Ni)) + ":hover", P([f(Qo, "opacity", "0")])), f(Xo, Co(O("hv", $i)) + ":hover", P([f(Qo, "opacity", "1")])), f(Xo, Co(O("fcs", Ni)) + ":focus", P([f(Qo, "opacity", "0")])), f(Xo, Co(O("fcs", $i)) + ":focus", P([f(Qo, "opacity", "1")])), f(Xo, Co(O("atv", Ni)) + ":active", P([f(Qo, "opacity", "0")])), f(Xo, Co(O("atv", $i)) + ":active", P([f(Qo, "opacity", "1")])), f(Xo, Co("ts"), P([f(Qo, "transition", f(rn, ", ", f(lr, (function (t) {
                            return t + " 160ms"
                        }), P(["transform", "opacity", "filter", "background-color", "color", "font-size"]))))])), f(Xo, Co("sb"), P([f(Qo, "overflow", "auto"), f(Qo, "flex-shrink", "1")])), f(Xo, Co("sbx"), P([f(Qo, "overflow-x", "auto"), f(Xo, Co(ji), P([f(Qo, "flex-shrink", "1")]))])), f(Xo, Co("sby"), P([f(Qo, "overflow-y", "auto"), f(Xo, Co("c"), P([f(Qo, "flex-shrink", "1")])), f(Xo, Co(Ci), P([f(Qo, "flex-shrink", "1")]))])), f(Xo, Co("cp"), P([f(Qo, "overflow", "hidden")])), f(Xo, Co("cpx"), P([f(Qo, "overflow-x", "hidden")])), f(Xo, Co("cpy"), P([f(Qo, "overflow-y", "hidden")])), f(Xo, Co(Wi), P([f(Qo, "width", "auto")])), f(Xo, Co("bn"), P([f(Qo, "border-width", "0")])), f(Xo, Co("bd"), P([f(Qo, "border-style", "dashed")])), f(Xo, Co("bdt"), P([f(Qo, "border-style", "dotted")])), f(Xo, Co("bs"), P([f(Qo, "border-style", "solid")])), f(Xo, Co(zi), P([f(Qo, "white-space", "pre"), f(Qo, "display", "inline-block")])), f(Xo, Co("it"), P([f(Qo, "line-height", "1.05"), f(Qo, "background", "transparent"), f(Qo, "text-align", "inherit")])), f(Xo, Co(Ci), ua), f(Xo, Co(ji), P([f(Qo, "display", "flex"), f(Qo, "flex-direction", "row"), f(Go, Co(ki), P([f(Qo, "flex-basis", "0%"), f(Xo, Co("we"), P([f(Qo, "flex-basis", "auto")])), f(Xo, Co("lnk"), P([f(Qo, "flex-basis", "auto")]))])), f(Go, Co(Bi), P([f(Qo, "align-self", "stretch !important")])), f(Go, Co(Mi), P([f(Qo, "align-self", "stretch !important")])), f(Go, Co(qi), P([f(Qo, "flex-grow", "100000")])), f(Go, Co(Ai), P([f(Qo, "flex-grow", "0"), f(Qo, "flex-basis", "auto"), f(Qo, "align-self", "stretch")])), f(Go, "u:first-of-type.acr", P([f(Qo, "flex-grow", "1")])), f(Go, "s:first-of-type." + wi, P([f(Qo, "flex-grow", "1"), f(Go, Co(vi), P([f(Qo, "margin-left", "auto !important")]))])), f(Go, "s:last-of-type." + wi, P([f(Qo, "flex-grow", "1"), f(Go, Co(vi), P([f(Qo, "margin-right", "auto !important")]))])), f(Go, "s:only-of-type." + wi, P([f(Qo, "flex-grow", "1"), f(Go, Co(bi), P([f(Qo, "margin-top", "auto !important"), f(Qo, "margin-bottom", "auto !important")]))])), f(Go, "s:last-of-type.accx ~ u", P([f(Qo, "flex-grow", "0")])), f(Go, "u:first-of-type.acr ~ s." + wi, P([f(Qo, "flex-grow", "0")])), sa((function (t) {
                            switch (t) {
                                case 0:
                                    return I(P([f(Qo, "align-items", "flex-start")]), P([f(Qo, "align-self", "flex-start")]));
                                case 1:
                                    return I(P([f(Qo, "align-items", "flex-end")]), P([f(Qo, "align-self", "flex-end")]));
                                case 2:
                                    return I(P([f(Qo, "justify-content", "flex-end")]), _);
                                case 3:
                                    return I(P([f(Qo, "justify-content", "flex-start")]), _);
                                case 4:
                                    return I(P([f(Qo, "justify-content", "center")]), _);
                                default:
                                    return I(P([f(Qo, "align-items", "center")]), P([f(Qo, "align-self", "center")]))
                            }
                        })), f(Xo, Co(Ui), P([f(Qo, "justify-content", "space-between")])), f(Xo, Co("lbl"), P([f(Qo, "align-items", "baseline")]))])), f(Xo, Co("c"), P([f(Qo, "display", "flex"), f(Qo, "flex-direction", "column"), f(Go, Co(ki), P([f(Qo, "flex-basis", "0px"), f(Qo, "min-height", "min-content"), f(Xo, Co("he"), P([f(Qo, "flex-basis", "auto")]))])), f(Go, Co(Bi), P([f(Qo, "flex-grow", "100000")])), f(Go, Co(qi), P([f(Qo, "width", "100%")])), f(Go, Co(Ki), P([f(Qo, "width", "100%")])), f(Go, Co(Wi), P([f(Qo, "align-self", "flex-start")])), f(Go, "u:first-of-type.acb", P([f(Qo, "flex-grow", "1")])), f(Go, "s:first-of-type." + xi, P([f(Qo, "flex-grow", "1"), f(Go, Co(bi), P([f(Qo, "margin-top", "auto !important"), f(Qo, "margin-bottom", "0 !important")]))])), f(Go, "s:last-of-type." + xi, P([f(Qo, "flex-grow", "1"), f(Go, Co(bi), P([f(Qo, "margin-bottom", "auto !important"), f(Qo, "margin-top", "0 !important")]))])), f(Go, "s:only-of-type." + xi, P([f(Qo, "flex-grow", "1"), f(Go, Co(bi), P([f(Qo, "margin-top", "auto !important"), f(Qo, "margin-bottom", "auto !important")]))])), f(Go, "s:last-of-type.accy ~ u", P([f(Qo, "flex-grow", "0")])), f(Go, "u:first-of-type.acb ~ s." + xi, P([f(Qo, "flex-grow", "0")])), sa((function (t) {
                            switch (t) {
                                case 0:
                                    return I(P([f(Qo, "justify-content", "flex-start")]), P([f(Qo, "margin-bottom", "auto")]));
                                case 1:
                                    return I(P([f(Qo, "justify-content", "flex-end")]), P([f(Qo, "margin-top", "auto")]));
                                case 2:
                                    return I(P([f(Qo, "align-items", "flex-end")]), P([f(Qo, "align-self", "flex-end")]));
                                case 3:
                                    return I(P([f(Qo, "align-items", "flex-start")]), P([f(Qo, "align-self", "flex-start")]));
                                case 4:
                                    return I(P([f(Qo, "align-items", "center")]), P([f(Qo, "align-self", "center")]));
                                default:
                                    return I(P([f(Qo, "justify-content", "center")]), _)
                            }
                        })), f(Go, Co(Ai), P([f(Qo, "flex-grow", "0"), f(Qo, "flex-basis", "auto"), f(Qo, "width", "100%"), f(Qo, "align-self", "stretch !important")])), f(Xo, Co(Ui), P([f(Qo, "justify-content", "space-between")]))])), f(Xo, Co("g"), P([f(Qo, "display", "-ms-grid"), f(Go, ".gp", P([f(Go, Co(ki), P([f(Qo, "width", "100%")]))])), f(ta, I("display", "grid"), P([I("display", "grid")])), (wr = function (t) {
                            switch (t) {
                                case 0:
                                    return P([f(Qo, "justify-content", "flex-start")]);
                                case 1:
                                    return P([f(Qo, "justify-content", "flex-end")]);
                                case 2:
                                    return P([f(Qo, "align-items", "flex-end")]);
                                case 3:
                                    return P([f(Qo, "align-items", "flex-start")]);
                                case 4:
                                    return P([f(Qo, "align-items", "center")]);
                                default:
                                    return P([f(Qo, "justify-content", "center")])
                            }
                        }, Zo(f(ia, (function (t) {
                            return P([f(Go, Co(ki), P([f(Xo, aa(t), wr(t))]))])
                        }), ea)))])), f(Xo, Co("pg"), P([f(Qo, "display", "block"), f(Go, Co("s:first-child"), P([f(Qo, "margin", "0 !important")])), f(Go, Co(ki + (aa(3) + ":first-child + .") + ki), P([f(Qo, "margin", "0 !important")])), f(Go, Co(ki + (aa(2) + ":first-child + .") + ki), P([f(Qo, "margin", "0 !important")])), sa((function (t) {
                            switch (t) {
                                case 0:
                                case 1:
                                case 4:
                                default:
                                    return I(_, _);
                                case 2:
                                    return I(_, P([f(Qo, "float", "right"), f(Xo, "::after", P([f(Qo, "content", '""'), f(Qo, "display", "table"), f(Qo, "clear", "both")]))]));
                                case 3:
                                    return I(_, P([f(Qo, "float", "left"), f(Xo, "::after", P([f(Qo, "content", '""'), f(Qo, "display", "table"), f(Qo, "clear", "both")]))]))
                            }
                        }))])), f(Xo, Co("iml"), P([f(Qo, "white-space", "pre-wrap !important"), f(Qo, "height", "100%"), f(Qo, "width", "100%"), f(Qo, "background-color", "transparent")])), f(Xo, Co("implw"), P([f(Xo, Co(Ci), P([f(Qo, "flex-basis", "auto")]))])), f(Xo, Co("imlp"), P([f(Qo, "white-space", "pre-wrap !important"), f(Qo, "cursor", "text"), f(Go, Co("imlf"), P([f(Qo, "white-space", "pre-wrap !important"), f(Qo, "color", "transparent")]))])), f(Xo, Co("p"), P([f(Qo, "display", "block"), f(Qo, "white-space", "normal"), f(Qo, "overflow-wrap", "break-word"), f(Xo, Co("hbh"), P([f(Qo, "z-index", "0"), f(Go, Co(Ei), P([f(Qo, "z-index", "-1")]))])), f(Jo, Co(zi), P([f(Qo, "display", "inline"), f(Qo, "white-space", "normal")])), f(Jo, Co("p"), P([f(Qo, "display", "inline"), f(Xo, "::after", P([f(Qo, "content", "none")])), f(Xo, "::before", P([f(Qo, "content", "none")]))])), f(Jo, Co(Ci), P([f(Qo, "display", "inline"), f(Qo, "white-space", "normal"), f(Xo, Co("we"), P([f(Qo, "display", "inline-block")])), f(Xo, Co(Oi), P([f(Qo, "display", "flex")])), f(Xo, Co(Ei), P([f(Qo, "display", "flex")])), f(Xo, Co("a"), P([f(Qo, "display", "flex")])), f(Xo, Co("b"), P([f(Qo, "display", "flex")])), f(Xo, Co(Pi), P([f(Qo, "display", "flex")])), f(Xo, Co(Li), P([f(Qo, "display", "flex")])), f(Go, Co(zi), P([f(Qo, "display", "inline"), f(Qo, "white-space", "normal")]))])), f(Go, Co(ji), P([f(Qo, "display", "inline")])), f(Go, Co("c"), P([f(Qo, "display", "inline-flex")])), f(Go, Co("g"), P([f(Qo, "display", "inline-grid")])), sa((function (t) {
                            switch (t) {
                                case 0:
                                case 1:
                                case 4:
                                default:
                                    return I(_, _);
                                case 2:
                                    return I(_, P([f(Qo, "float", "right")]));
                                case 3:
                                    return I(_, P([f(Qo, "float", "left")]))
                            }
                        }))])), f(Xo, ".hidden", P([f(Qo, "display", "none")])), f(Xo, Co("w1"), P([f(Qo, "font-weight", "100")])), f(Xo, Co("w2"), P([f(Qo, "font-weight", "200")])), f(Xo, Co("w3"), P([f(Qo, "font-weight", "300")])), f(Xo, Co("w4"), P([f(Qo, "font-weight", "400")])), f(Xo, Co("w5"), P([f(Qo, "font-weight", "500")])), f(Xo, Co("w6"), P([f(Qo, "font-weight", "600")])), f(Xo, Co("w7"), P([f(Qo, "font-weight", "700")])), f(Xo, Co("w8"), P([f(Qo, "font-weight", "800")])), f(Xo, Co("w9"), P([f(Qo, "font-weight", "900")])), f(Xo, Co("i"), P([f(Qo, "font-style", "italic")])), f(Xo, Co("sk"), P([f(Qo, "text-decoration", "line-through")])), f(Xo, Co("u"), P([f(Qo, "text-decoration", "underline"), f(Qo, "text-decoration-skip-ink", "auto"), f(Qo, "text-decoration-skip", "ink")])), f(Xo, O(Co("u"), Co("sk")), P([f(Qo, "text-decoration", "line-through underline"), f(Qo, "text-decoration-skip-ink", "auto"), f(Qo, "text-decoration-skip", "ink")])), f(Xo, Co("tun"), P([f(Qo, "font-style", "normal")])), f(Xo, Co("tj"), P([f(Qo, "text-align", "justify")])), f(Xo, Co("tja"), P([f(Qo, "text-align", "justify-all")])), f(Xo, Co("tc"), P([f(Qo, "text-align", "center")])), f(Xo, Co("tr"), P([f(Qo, "text-align", "right")])), f(Xo, Co("tl"), P([f(Qo, "text-align", "left")])), f(Xo, ".modal", P([f(Qo, "position", "fixed"), f(Qo, "left", "0"), f(Qo, "top", "0"), f(Qo, "width", "100%"), f(Qo, "height", "100%"), f(Qo, "pointer-events", "none")]))]))]),
                        la = function (t) {
                            return P([f(Yo, ".v-" + t, P([f(Qo, "font-feature-settings", '"' + t + '"')])), f(Yo, ".v-" + t + "-off", P([f(Qo, "font-feature-settings", '"' + t + '" 0')]))])
                        }, ha = ra(P([f(lr, (function (t) {
                            return f(Yo, ".border-" + nn(t), P([f(Qo, "border-width", nn(t) + "px")]))
                        }), f(ln, 0, 6)), f(lr, (function (t) {
                            return f(Yo, ".font-size-" + nn(t), P([f(Qo, "font-size", nn(t) + "px")]))
                        }), f(ln, 8, 32)), f(lr, (function (t) {
                            return f(Yo, ".p-" + nn(t), P([f(Qo, "padding", nn(t) + "px")]))
                        }), f(ln, 0, 24)), P([f(Yo, ".v-smcp", P([f(Qo, "font-variant", "small-caps")])), f(Yo, ".v-smcp-off", P([f(Qo, "font-variant", "normal")]))]), la("zero"), la("onum"), la("liga"), la("dlig"), la("ordn"), la("tnum"), la("afrc"), la("frac")])),
                        da = "@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {" + Co(ki) + Co(ji) + " > " + Co(ki) + " { flex-basis: auto !important; } " + Co(ki) + Co(ji) + " > " + Co(ki) + Co(Ai) + ' { flex-basis: auto !important; }}\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .s {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .s {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n',
                        pa = function (t) {
                            return f(rn, "", t)
                        }, ga = n((function (t, e) {
                            return {am: e, i: _, H: _, v: t}
                        })), ya = n((function (t, e) {
                            var r = t, i = n((function (t, e) {
                                switch (t.$) {
                                    case 0:
                                        var n = t.a, i = t.b;
                                        return M(e, {H: f(ze, I(n, i), e.H)});
                                    case 3:
                                        var o = t.a, a = o.a, s = o.b, u = t.b;
                                        return M(e, {
                                            i: f(ze, {
                                                am: "\n}",
                                                i: _,
                                                H: u,
                                                v: "@supports (" + a + ":" + s + ") {" + r.v
                                            }, e.i)
                                        });
                                    case 5:
                                        var c = t.a, l = t.b;
                                        return M(e, {i: f(ze, f(ya, f(ga, r.v + " + " + c, ""), l), e.i)});
                                    case 1:
                                        var h = t.a, d = t.b;
                                        return M(e, {i: f(ze, f(ya, f(ga, r.v + " > " + h, ""), d), e.i)});
                                    case 2:
                                        return h = t.a, d = t.b, M(e, {i: f(ze, f(ya, f(ga, r.v + " " + h, ""), d), e.i)});
                                    case 4:
                                        var p = t.a, g = t.b;
                                        return M(e, {i: f(ze, f(ya, f(ga, O(r.v, p), ""), g), e.i)});
                                    default:
                                        var y = t.a;
                                        return M(e, {i: f(ze, f(ya, f(ga, r.v, ""), y), e.i)})
                                }
                            }));
                            return l(fr, i, r, e)
                        })), ma = O(da, (xr = O(fa, ha), kr = function (t) {
                            return t.H.b ? t.v + "{" + function (t) {
                                return pa(f(lr, (function (t) {
                                    return t.a + ":" + t.b + ";"
                                }), t))
                            }(t.H) + t.am + "}" : ""
                        }, Er = function (t) {
                            var e = t;
                            return O(kr(e), pa(f(lr, Er, e.i)))
                        }, pa(f(lr, Er, l(fr, n((function (t, e) {
                            var n = t.a, r = t.b;
                            return f(ze, f(ya, f(ga, n, ""), r), e)
                        })), _, xr))))), va = Ht, ba = function (t) {
                            switch (t.cK) {
                                case 0:
                                    return l(Ho, "div", _, P([l(Ho, "style", _, P([va(ma)]))]));
                                case 1:
                                    return va("");
                                default:
                                    return l(Ho, "elm-ui-static-rules", P([f(Vo, "rules", Tr(ma))]), _)
                            }
                        }, wa = n((function (t, e) {
                            return l(sn, function (t) {
                                return n((function (e, n) {
                                    return n.push(t(e)), n
                                }))
                            }(t), [], e)
                        })), xa = n((function (t, e) {
                            for (; ;) {
                                if (!e.b) return !1;
                                var n = e.a, r = e.b;
                                if (t(n)) return !0;
                                e = r
                            }
                        })), ka = function (t) {
                            switch (t.$) {
                                case 0:
                                    return "serif";
                                case 1:
                                    return "sans-serif";
                                case 2:
                                    return "monospace";
                                case 3:
                                    return '"' + (e = t.a) + '"';
                                case 4:
                                    var e = t.a;
                                    return t.b, '"' + e + '"';
                                default:
                                    return '"' + (e = t.a.cL) + '"'
                            }
                        }, Ea = function (t) {
                            switch (t.$) {
                                case 0:
                                    return "smcp" === t.a;
                                case 1:
                                    var e = t.a;
                                    return !1;
                                default:
                                    e = t.a;
                                    var n = t.b;
                                    return "smcp" === e && 1 === n
                            }
                        }, Aa = function (t) {
                            if (5 === t.$) {
                                var e = t.a;
                                return f(xa, Ea, e.bA)
                            }
                            return !1
                        }, Sa = n((function (t, e) {
                            return E(t, e) < 0 ? t : e
                        })), Ia = r((function (t, e, n) {
                            var r = e.a, i = e.b;
                            return t ? n + "\n  " + r + ": " + i + " !important;" : n + "\n  " + r + ": " + i + ";"
                        })), Ba = i((function (t, e, n, r) {
                            if (1 === e.$) return P([n + "{" + l(sn, Ia(!1), "", r) + "\n}"]);
                            switch (e.a) {
                                case 1:
                                    switch (t.ct) {
                                        case 0:
                                            return _;
                                        case 2:
                                            return P([n + "-hv {" + l(sn, Ia(!0), "", r) + "\n}"]);
                                        default:
                                            return P([n + "-hv:hover {" + l(sn, Ia(!1), "", r) + "\n}"])
                                    }
                                case 0:
                                    var i = l(sn, Ia(!1), "", r);
                                    return P([n + "-fs:focus {" + i + "\n}", ".s:focus " + n + "-fs  {" + i + "\n}", n + "-fs:focus-within {" + i + "\n}", ".ui-slide-bar:focus + " + Co(ki) + " .focusable-thumb" + n + "-fs {" + i + "\n}"]);
                                default:
                                    return P([n + "-act:active {" + l(sn, Ia(!1), "", r) + "\n}"])
                            }
                        })), Ma = function (t) {
                            switch (t.$) {
                                case 0:
                                    return '"' + (e = t.a) + '"';
                                case 1:
                                    return '"' + (e = t.a) + '" 0';
                                default:
                                    var e = t.a, n = t.b;
                                    return '"' + e + '" ' + nn(n)
                            }
                        }, Oa = function (t) {
                            if (5 === t.$) {
                                var e = t.a;
                                return Xe(f(rn, ", ", f(lr, Ma, e.bA)))
                            }
                            return Qe
                        }, _a = r((function (t, e, n) {
                            switch (e.$) {
                                case 0:
                                    var i = e.a, o = e.b;
                                    return h(Ba, t, n, i, o);
                                case 13:
                                    var a = e.a, s = e.b;
                                    return h(Ba, t, n, "." + a, P([f($o, "box-shadow", s)]));
                                case 12:
                                    a = e.a;
                                    var u = e.b, c = f($n, 0, f(Sa, 1, 1 - u));
                                    return h(Ba, t, n, "." + a, P([f($o, "opacity", zo(c))]));
                                case 2:
                                    var d = e.a;
                                    return h(Ba, t, n, ".font-size-" + nn(d), P([f($o, "font-size", nn(d) + "px")]));
                                case 1:
                                    a = e.a;
                                    var p = e.b, g = f(rn, ", ", f(Uo, Oa, p)),
                                        y = P([f($o, "font-family", f(rn, ", ", f(lr, ka, p))), f($o, "font-feature-settings", g), f($o, "font-variant", f(xa, Aa, p) ? "small-caps" : "normal")]);
                                    return h(Ba, t, n, "." + a, y);
                                case 3:
                                    var m = e.a, v = (s = e.b, e.c);
                                    return h(Ba, t, n, "." + m, P([f($o, s, v)]));
                                case 4:
                                    m = e.a, s = e.b;
                                    var b = e.c;
                                    return h(Ba, t, n, "." + m, P([f($o, s, No(b))]));
                                case 5:
                                    var w = e.a, x = e.b, k = e.c, E = nn(k) + "px", A = nn(x) + "px", S = ".ar", B = ".pg",
                                        M = ".al", T = zo(k / 2) + "px", L = zo(x / 2) + "px", $ = ".s";
                                    return ra(P([h(Ba, t, n, (m = "." + w) + ".r > .s + " + $, P([f($o, "margin-left", A)])), h(Ba, t, n, m + ".wrp.r > " + $, P([f($o, "margin", T + " " + L)])), h(Ba, t, n, m + ".c > .s + " + $, P([f($o, "margin-top", E)])), h(Ba, t, n, m + (B + " > .s + ") + $, P([f($o, "margin-top", E)])), h(Ba, t, n, m + (B + " > ") + M, P([f($o, "margin-right", A)])), h(Ba, t, n, m + (B + " > ") + S, P([f($o, "margin-left", A)])), h(Ba, t, n, O(m, ".p"), P([f($o, "line-height", "calc(1em + " + nn(k) + "px)")])), h(Ba, t, n, "textarea" + ($ + m), P([f($o, "line-height", "calc(1em + " + nn(k) + "px)"), f($o, "height", "calc(100% + " + nn(k) + "px)")])), h(Ba, t, n, m + ".p > " + M, P([f($o, "margin-right", A)])), h(Ba, t, n, m + ".p > " + S, P([f($o, "margin-left", A)])), h(Ba, t, n, m + ".p::after", P([f($o, "content", "''"), f($o, "display", "block"), f($o, "height", "0"), f($o, "width", "0"), f($o, "margin-top", nn(-1 * (k / 2 | 0)) + "px")])), h(Ba, t, n, m + ".p::before", P([f($o, "content", "''"), f($o, "display", "block"), f($o, "height", "0"), f($o, "width", "0"), f($o, "margin-bottom", nn(-1 * (k / 2 | 0)) + "px")]))]));
                                case 7:
                                    w = e.a;
                                    var j = e.b, C = (S = e.c, e.d);
                                    return M = e.e, h(Ba, t, n, m = "." + w, P([f($o, "padding", zo(j) + "px " + zo(S) + "px " + zo(C) + "px " + zo(M) + "px")]));
                                case 6:
                                    return w = e.a, j = e.b, S = e.c, C = e.d, M = e.e, h(Ba, t, n, m = "." + w, P([f($o, "border-width", nn(j) + "px " + nn(S) + "px " + nn(C) + "px " + nn(M) + "px")]));
                                case 8:
                                    var R = e.a, U = r((function (t, e, n) {
                                            t:for (; ;) switch (n.$) {
                                                case 0:
                                                    var r = n.a;
                                                    return nn(r) + "px";
                                                case 1:
                                                    var i = I(t, e);
                                                    if (1 === i.a.$) {
                                                        if (1 === i.b.$) return i.a, i.b, "max-content";
                                                        i.a;
                                                        var o = i.b.a;
                                                        return "minmax(max-content, " + nn(o) + "px)"
                                                    }
                                                    if (1 === i.b.$) {
                                                        var a = i.a.a;
                                                        return i.b, "minmax(" + nn(a) + "px, max-content)"
                                                    }
                                                    return a = i.a.a, o = i.b.a, "minmax(" + nn(a) + "px, " + nn(o) + "px)";
                                                case 2:
                                                    var s = n.a, u = I(t, e);
                                                    return 1 === u.a.$ ? 1 === u.b.$ ? (u.a, u.b, nn(s) + "fr") : (u.a, o = u.b.a, "minmax(max-content, " + nn(o) + "px)") : 1 === u.b.$ ? (a = u.a.a, u.b, "minmax(" + nn(a) + "px, " + nn(s) + "frfr)") : (a = u.a.a, o = u.b.a, "minmax(" + nn(a) + "px, " + nn(o) + "px)");
                                                case 3:
                                                    var c = n.a, f = n.b;
                                                    t = Xe(c), n = f;
                                                    continue t;
                                                default:
                                                    c = n.a, f = n.b, e = Xe(c), n = f;
                                                    continue t
                                            }
                                        })), z = function (t) {
                                            return l(U, Qe, Qe, t)
                                        }, N = (z(R.c4.a), z(R.c4.b)), W = function (t) {
                                            return "grid-template-rows: " + t + ";"
                                        }(f(rn, " ", f(lr, z, R.cX))), q = function (t) {
                                            return "-ms-grid-rows: " + t + ";"
                                        }(f(rn, N, f(lr, z, R.x))), K = function (t) {
                                            return "-ms-grid-columns: " + t + ";"
                                        }(f(rn, N, f(lr, z, R.x))), D = "grid-row-gap:" + z(R.c4.b) + ";",
                                        F = "grid-column-gap:" + z(R.c4.a) + ";", H = function (t) {
                                            return "grid-template-columns: " + t + ";"
                                        }(f(rn, " ", f(lr, z, R.x)));
                                    return P([(m = ".grid-rows-" + f(rn, "-", f(lr, bo, R.cX)) + "-cols-" + f(rn, "-", f(lr, bo, R.x)) + "-space-x-" + bo(R.c4.a) + "-space-y-" + bo(R.c4.b)) + "{" + K + q + "}", "@supports (display:grid) {" + m + "{" + H + W + F + D + "}}"]);
                                case 9:
                                    var V = e.a,
                                        J = f(rn, " ", P(["-ms-grid-row: " + nn(V.u) + ";", "-ms-grid-row-span: " + nn(V.cq) + ";", "-ms-grid-column: " + nn(V.cd) + ";", "-ms-grid-column-span: " + nn(V.bD) + ";"])),
                                        Z = f(rn, " ", P(["grid-row: " + nn(V.u) + " / " + nn(V.u + V.cq) + ";", "grid-column: " + nn(V.cd) + " / " + nn(V.cd + V.bD) + ";"]));
                                    return P([(m = ".grid-pos-" + nn(V.u) + "-" + nn(V.cd) + "-" + nn(V.bD) + "-" + nn(V.cq)) + "{" + J + "}", "@supports (display:grid) {" + m + "{" + Z + "}}"]);
                                case 11:
                                    m = e.a;
                                    var G = e.b;
                                    return f(ia, (function (e) {
                                        return l(_a, t, e, Xe(m))
                                    }), G);
                                default:
                                    var Y = e.a, X = (v = function (t) {
                                        switch (t.$) {
                                            case 0:
                                                return Qe;
                                            case 1:
                                                var e = t.a, n = e.a, r = e.b, i = e.c;
                                                return Xe("translate3d(" + zo(n) + "px, " + zo(r) + "px, " + zo(i) + "px)");
                                            default:
                                                var o = t.a, a = o.a, s = o.b, u = o.c, c = t.b, f = c.a, l = c.b, h = c.c,
                                                    d = t.c, p = d.a, g = d.b, y = d.c, m = t.d,
                                                    v = "translate3d(" + zo(a) + "px, " + zo(s) + "px, " + zo(u) + "px)",
                                                    b = "scale3d(" + zo(f) + ", " + zo(l) + ", " + zo(h) + ")",
                                                    w = "rotate3d(" + zo(p) + ", " + zo(g) + ", " + zo(y) + ", " + zo(m) + "rad)";
                                                return Xe(v + " " + b + " " + w)
                                        }
                                    }(Y), I(m = ko(Y), v));
                                    if (X.a.$ || X.b.$) return _;
                                    w = X.a.a;
                                    var Q = X.b.a;
                                    return h(Ba, t, n, "." + w, P([f($o, "transform", Q)]))
                            }
                        })), Ta = n((function (t, e) {
                            return r = f(lr, (function (e) {
                                var n = l(_a, t, e, Qe);
                                return I(Eo(e), f(wa, Tr, n))
                            }), e), l(sn, n((function (t, e) {
                                var n = t.a, r = t.b;
                                return l(ht, n, r, e)
                            })), {}, r);
                            var r
                        })), La = n((function (t, e) {
                            return t + " {" + f(rn, "", f(lr, (function (t) {
                                return t.a + ": " + t.b + ";"
                            }), e)) + "}"
                        })), Pa = r((function (t, e, n) {
                            var r = n.a, i = n.b;
                            return P([f(La, "." + t + "." + e + ", ." + t + " ." + e, r), f(La, "." + t + "." + e + "> .t, ." + t + " ." + e + " > ." + zi, i)])
                        })), $a = r((function (t, e, n) {
                            var r = e.a, i = e.b, o = w(t, n) ? t : n + " ." + t;
                            return f(rn, " ", O(l(Pa, o, Ri, i), l(Pa, o, "fs", r)))
                        })), ja = n((function (t, e) {
                            var n = w(t, e) ? t : e + " ." + t;
                            return f(rn, " ", P([f(La, "." + n + "." + Ri + ", ." + n + " ." + Ri, P([I("line-height", "1")])), f(La, "." + n + "." + Ri + "> .t, ." + n + " ." + Ri + " > ." + zi, P([I("vertical-align", "0"), I("line-height", "1")]))]))
                        })), Ca = r((function (t, e, n) {
                            return {cq: e / t, Z: t, bB: n}
                        })), Ra = n((function (t, e) {
                            return l(fr, n((function (e, n) {
                                return t(e) ? f(ze, e, n) : n
                            })), _, e)
                        })), Ua = function (t) {
                            if (t.b) {
                                var e = t.a, n = t.b;
                                return Xe(l(sn, Sa, e, n))
                            }
                            return Qe
                        }, za = function (t) {
                            var e = P([t.b8, t.bY, t.ci, t.cI]), n = f(oi, t.ci, Ua(e)),
                                r = f(oi, t.bY, Ua(f(Ra, (function (t) {
                                    return !w(t, n)
                                }), e))), i = f(oi, t.b8, function (t) {
                                    if (t.b) {
                                        var e = t.a, n = t.b;
                                        return Xe(l(sn, $n, e, n))
                                    }
                                    return Qe
                                }(e)), o = 1 / (i - n), a = 1 - i;
                            return {b8: l(Ca, 1 / (i - r), i - r, 1 - i), a2: l(Ca, o, i - n, a)}
                        }, Na = function (t) {
                            return I(P([I("display", "block")]), P([I("display", "inline-block"), I("line-height", zo(t.cq)), I("vertical-align", zo(t.bB) + "em"), I("font-size", zo(t.Z) + "em")]))
                        }, Wa = n((function (t, e) {
                            var r = n((function (e, n) {
                                return {
                                    at: O(n.at, l(_a, t, e, Qe)), ah: function () {
                                        var t = function (t) {
                                            if (1 === t.$) {
                                                var e = t.a, n = t.b;
                                                return Xe(I(e, n))
                                            }
                                            return Qe
                                        }(e);
                                        if (1 === t.$) return n.ah;
                                        var r = t.a;
                                        return f(ze, r, n.ah)
                                    }()
                                }
                            })), i = l(sn, r, {at: _, ah: _}, e), o = i.ah, a = i.at;
                            return O(function (t) {
                                var e = function (t) {
                                    if (4 === t.$) {
                                        var e = t.b;
                                        return Xe("@import url('" + e + "');")
                                    }
                                    return Qe
                                }, r = f(lr, Rn, t);
                                return O(f(rn, "\n", f(lr, (function (t) {
                                    t.a;
                                    var n = t.b;
                                    return f(rn, "\n", f(Uo, e, n))
                                }), t)), f(rn, "\n", f(lr, (function (t) {
                                    var e, i = t.a, o = (e = t.b, l(sn, n((function (t, e) {
                                        if (1 === e.$) {
                                            if (5 === t.$) {
                                                var n = t.a.bL;
                                                if (1 === n.$) return e;
                                                var r = n.a;
                                                return Xe(I(Na(za(r).a2), Na(za(r).b8)))
                                            }
                                            return e
                                        }
                                        return e
                                    })), Qe, e));
                                    if (1 === o.$) return f(rn, "", f(lr, ja(i), r));
                                    var a = o.a;
                                    return f(rn, "", f(lr, f($a, i, a), r))
                                }), t)))
                            }(o), pa(a))
                        })), qa = n((function (t, e) {
                            switch (t.cK) {
                                case 0:
                                case 1:
                                    return l(Ho, "div", _, P([l(Ho, "style", _, P([va(f(Wa, t, e))]))]));
                                default:
                                    return l(Ho, "elm-ui-rules", P([f(Vo, "rules", f(Ta, t, e))]), _)
                            }
                        })), Ka = i((function (t, e, n, r) {
                            var i = f(qa, e, l(sn, Po, I(vo, Fo(e.cn)), n).b);
                            return t ? f(ze, I("static-stylesheet", ba(e)), f(ze, I("dynamic-stylesheet", i), r)) : f(ze, I("dynamic-stylesheet", i), r)
                        })), Da = i((function (t, e, n, r) {
                            var i = f(qa, e, l(sn, Po, I(vo, Fo(e.cn)), n).b);
                            return t ? f(ze, ba(e), f(ze, i, r)) : f(ze, i, r)
                        })), Fa = Fi(45), Ha = Fi(37), Va = function (t) {
                            return Zt(ne(t))
                        }, Ja = Jt("p"), Za = n((function (t, e) {
                            var n = e.a, r = e.b;
                            if (t.$) {
                                var i = t.a;
                                return w(i & r, i)
                            }
                            var o = t.a;
                            return w(o & n, o)
                        })), Ga = Jt("s"), Ya = Jt("u"), Xa = Fi(44), Qa = Fi(39), ts = a((function (t, e, r, i, o, a) {
                            var s = n((function (t, e) {
                                if (1 === i.$) {
                                    var n = i.a;
                                    return l(Va, t, e, function () {
                                        switch (o.$) {
                                            case 0:
                                                return n;
                                            case 2:
                                                var t = o.a, e = o.b;
                                                return h(Ka, !1, t, e, n);
                                            default:
                                                return t = o.a, e = o.b, h(Ka, !0, t, e, n)
                                        }
                                    }())
                                }
                                var r = i.a;
                                return f(function () {
                                    switch (t) {
                                        case"div":
                                            return go;
                                        case"p":
                                            return Ja;
                                        default:
                                            return Ho(t)
                                    }
                                }(), e, function () {
                                    switch (o.$) {
                                        case 0:
                                            return r;
                                        case 2:
                                            var t = o.a, e = o.b;
                                            return h(Da, !1, t, e, r);
                                        default:
                                            return t = o.a, e = o.b, h(Da, !0, t, e, r)
                                    }
                                }())
                            })), u = function () {
                                switch (e.$) {
                                    case 0:
                                        return f(s, "div", r);
                                    case 1:
                                        var t = e.a;
                                        return f(s, t, r);
                                    default:
                                        t = e.a;
                                        var n = e.b;
                                        return l(Ho, t, r, P([f(s, n, P([po("s e")]))]))
                                }
                            }();
                            switch (a) {
                                case 0:
                                    return f(Za, Qa, t) && !f(Za, Xa, t) ? u : f(Za, co, t) ? f(Ya, P([po(f(rn, " ", P([ki, Ci, Ai, Si, "acr"])))]), P([u])) : f(Za, fo, t) ? f(Ga, P([po(f(rn, " ", P([ki, Ci, Ai, Si, wi])))]), P([u])) : u;
                                case 1:
                                    return f(Za, Ha, t) && !f(Za, Fa, t) ? u : f(Za, lo, t) ? f(Ga, P([po(f(rn, " ", P([ki, Ci, Ai, xi])))]), P([u])) : f(Za, uo, t) ? f(Ya, P([po(f(rn, " ", P([ki, Ci, Ai, "acb"])))]), P([u])) : u;
                                default:
                                    return u
                            }
                        })), es = function (t) {
                            return !t.b
                        }, ns = va, rs = function (t) {
                            return f(go, P([po("s t wc hc")]), P([ns(t)]))
                        }, is = function (t) {
                            return f(go, P([po("s t wf hf")]), P([ns(t)]))
                        }, os = r((function (t, e, r) {
                            var i = n((function (e, n) {
                                var r = e.a, i = e.b, o = n.a, a = n.b;
                                switch (i.$) {
                                    case 0:
                                        var s = i.a;
                                        return w(t, 4), I(f(ze, I(r, s(t)), o), a);
                                    case 1:
                                        var u = i.a;
                                        return w(t, 4), I(f(ze, I(r, f(u.cu, ro, t)), o), es(a) ? u.c9 : O(u.c9, a));
                                    case 2:
                                        var c = i.a;
                                        return I(f(ze, I(r, w(t, 2) ? is(c) : rs(c)), o), a);
                                    default:
                                        return I(o, a)
                                }
                            })), o = n((function (e, n) {
                                var r = n.a, i = n.b;
                                switch (e.$) {
                                    case 0:
                                        var o = e.a;
                                        return w(t, 4), I(f(ze, o(t), r), i);
                                    case 1:
                                        var a = e.a;
                                        return w(t, 4), I(f(ze, f(a.cu, ro, t), r), es(i) ? a.c9 : O(a.c9, i));
                                    case 2:
                                        var s = e.a;
                                        return I(f(ze, w(t, 2) ? is(s) : rs(s), r), i);
                                    default:
                                        return I(r, i)
                                }
                            }));
                            if (1 === e.$) {
                                var a = e.a, s = l(fr, i, I(_, _), a), u = s.a, c = s.b;
                                if ((g = es(c) ? r.c9 : O(r.c9, c)).b) {
                                    var p = g;
                                    return io({cu: h(ts, r.N, r.O, r.J, no(l(so, "nearby-element-pls", u, r.K))), c9: p})
                                }
                                return oo(d(ts, r.N, r.O, r.J, no(l(so, "nearby-element-pls", u, r.K)), ro))
                            }
                            var g, y = e.a, m = l(fr, o, I(_, _), y), v = m.a;
                            return c = m.b, (g = es(c) ? r.c9 : O(r.c9, c)).b ? (p = g, io({
                                cu: h(ts, r.N, r.O, r.J, Yi(f(ao, v, r.K))),
                                c9: p
                            })) : oo(d(ts, r.N, r.O, r.J, Yi(f(ao, v, r.K)), ro))
                        })), as = r((function (t, e, n) {
                            return {$: 3, a: t, b: e, c: n}
                        })), ss = function (t) {
                            return {$: 10, a: t}
                        }, us = n((function (t, e) {
                            return {$: 0, a: t, b: e}
                        })), cs = n((function (t, e) {
                            var n = e.a, r = e.b;
                            if (t.$) {
                                var i = t.a;
                                return f(us, n, i | r)
                            }
                            var o = t.a;
                            return f(us, o | n, r)
                        })), fs = function (t) {
                            return {$: 1, a: t}
                        }, ls = n((function (t, e) {
                            return {$: 3, a: t, b: e}
                        })), hs = function (t) {
                            return {$: 2, a: t}
                        }, ds = n((function (t, e) {
                            return f(go, P([po(function () {
                                switch (t) {
                                    case 0:
                                        return f(rn, " ", P([_i, Ci, "a"]));
                                    case 1:
                                        return f(rn, " ", P([_i, Ci, "b"]));
                                    case 2:
                                        return f(rn, " ", P([_i, Ci, Pi]));
                                    case 3:
                                        return f(rn, " ", P([_i, Ci, Li]));
                                    case 4:
                                        return f(rn, " ", P([_i, Ci, Oi]));
                                    default:
                                        return f(rn, " ", P([_i, Ci, Ei]))
                                }
                            }())]), P([function () {
                                switch (e.$) {
                                    case 3:
                                        return va("");
                                    case 2:
                                        var t = e.a;
                                        return rs(t);
                                    case 0:
                                        return (0, e.a)(2);
                                    default:
                                        return f(e.a.cu, ro, 2)
                                }
                            }()]))
                        })), ps = r((function (t, e, n) {
                            var r = f(ds, t, e);
                            switch (n.$) {
                                case 0:
                                    return 5 === t ? fs(P([r])) : hs(P([r]));
                                case 1:
                                    var i = n.a;
                                    return 5 === t ? fs(f(ze, r, i)) : f(ls, i, P([r]));
                                case 2:
                                    var o = n.a;
                                    return 5 === t ? f(ls, P([r]), o) : hs(f(ze, r, o));
                                default:
                                    return i = n.a, o = n.b, 5 === t ? f(ls, f(ze, r, i), o) : f(ls, i, f(ze, r, o))
                            }
                        })), gs = n((function (t, e) {
                            return {$: 2, a: t, b: e}
                        })), ys = function (t) {
                            return {$: 1, a: t}
                        }, ms = n((function (t, e) {
                            switch (e.$) {
                                case 0:
                                    return ys(t);
                                case 1:
                                    var n = e.a;
                                    return f(gs, n, t);
                                default:
                                    var r = e.a, i = e.b;
                                    return f(gs, r, i)
                            }
                        })), vs = function (t) {
                            switch (t) {
                                case 0:
                                    return "ah al";
                                case 2:
                                    return "ah ar";
                                default:
                                    return "ah cx"
                            }
                        }, bs = function (t) {
                            switch (t) {
                                case 0:
                                    return "av at";
                                case 2:
                                    return "av ab";
                                default:
                                    return "av cy"
                            }
                        }, ws = n((function (t, e) {
                            return f(ee, function (t) {
                                return /^(on|formAction$)/i.test(t) ? "data-" + t : t
                            }(t), re(e))
                        })), xs = i((function (t, e, n, r) {
                            return {$: 2, a: t, b: e, c: n, d: r}
                        })), ks = function (t) {
                            return {$: 1, a: t}
                        }, Es = n((function (t, e) {
                            switch (t.$) {
                                case 0:
                                    switch (e.$) {
                                        case 0:
                                            var n = e.a;
                                            return ks(B(n, 0, 0));
                                        case 1:
                                            var r = e.a;
                                            return ks(B(0, r, 0));
                                        case 2:
                                            var i = e.a;
                                            return ks(B(0, 0, i));
                                        case 3:
                                            var o = e.a;
                                            return ks(o);
                                        case 4:
                                            o = e.a;
                                            var a = e.b;
                                            return h(xs, B(0, 0, 0), B(1, 1, 1), o, a);
                                        default:
                                            return o = e.a, h(xs, B(0, 0, 0), o, B(0, 0, 1), 0)
                                    }
                                case 1:
                                    switch (n = (l = t.a).a, r = l.b, i = l.c, e.$) {
                                        case 0:
                                            var s = e.a;
                                            return ks(B(s, r, i));
                                        case 1:
                                            var u = e.a;
                                            return ks(B(n, u, i));
                                        case 2:
                                            var c = e.a;
                                            return ks(B(n, r, c));
                                        case 3:
                                            return o = e.a, ks(o);
                                        case 4:
                                            return o = e.a, a = e.b, h(xs, l, B(1, 1, 1), o, a);
                                        default:
                                            var f = e.a;
                                            return h(xs, l, f, B(0, 0, 1), 0)
                                    }
                                default:
                                    n = (l = t.a).a, r = l.b, i = l.c;
                                    var l, d = t.b, p = t.c;
                                    switch (a = t.d, e.$) {
                                        case 0:
                                            return s = e.a, h(xs, B(s, r, i), d, p, a);
                                        case 1:
                                            return u = e.a, h(xs, B(n, u, i), d, p, a);
                                        case 2:
                                            return c = e.a, h(xs, B(n, r, c), d, p, a);
                                        case 3:
                                            var g = e.a;
                                            return h(xs, g, d, p, a);
                                        case 4:
                                            var y = e.a, m = e.b;
                                            return h(xs, l, d, y, m);
                                        default:
                                            var v = e.a;
                                            return h(xs, l, v, p, a)
                                    }
                            }
                        })), As = Fi(7), Ss = Fi(36), Is = n((function (t, e) {
                            var n = t.a, r = t.b, i = e.a, o = e.b;
                            return f(us, n | i, r | o)
                        })), Bs = f(us, 0, 0), Ms = function (t) {
                            switch (t.$) {
                                case 0:
                                    var e = t.a, n = nn(e), r = "height-px-" + n;
                                    return B(Bs, "he " + r, P([l(as, r, "height", n + "px")]));
                                case 1:
                                    return B(f(cs, Ss, Bs), "hc", _);
                                case 2:
                                    var i = t.a;
                                    return 1 === i ? B(f(cs, Ha, Bs), Bi, _) : B(f(cs, Ha, Bs), Mi + " height-fill-" + nn(i), P([l(as, "s.c > " + Co("height-fill-" + nn(i)), "flex-grow", nn(1e5 * i))]));
                                case 3:
                                    var o = t.a, a = t.b, s = "min-height-" + nn(o),
                                        u = l(as, s, "min-height", nn(o) + "px !important"), c = Ms(a), h = c.a, d = c.b,
                                        p = c.c;
                                    return B(f(cs, Fa, h), s + " " + d, f(ze, u, p));
                                default:
                                    var g = t.a,
                                        y = (a = t.b, s = "max-height-" + nn(g), u = l(as, s, "max-height", nn(g) + "px"), Ms(a));
                                    return h = y.a, d = y.b, p = y.c, B(f(cs, Fa, h), s + " " + d, f(ze, u, p))
                            }
                        }, Os = Fi(38), _s = function (t) {
                            switch (t.$) {
                                case 0:
                                    var e = t.a;
                                    return B(Bs, "we width-px-" + nn(e), P([l(as, "width-px-" + nn(e), "width", nn(e) + "px")]));
                                case 1:
                                    return B(f(cs, Os, Bs), Wi, _);
                                case 2:
                                    var n = t.a;
                                    return 1 === n ? B(f(cs, Qa, Bs), qi, _) : B(f(cs, Qa, Bs), Ki + " width-fill-" + nn(n), P([l(as, "s.r > " + Co("width-fill-" + nn(n)), "flex-grow", nn(1e5 * n))]));
                                case 3:
                                    var r = t.a, i = t.b, o = "min-width-" + nn(r), a = l(as, o, "min-width", nn(r) + "px"),
                                        s = _s(i), u = s.a, c = s.b, h = s.c;
                                    return B(f(cs, Xa, u), o + " " + c, f(ze, a, h));
                                default:
                                    var d = t.a,
                                        p = (i = t.b, o = "max-width-" + nn(d), a = l(as, o, "max-width", nn(d) + "px"), _s(i));
                                    return u = p.a, c = p.b, h = p.c, B(f(cs, Xa, u), o + " " + c, f(ze, a, h))
                            }
                        }, Ts = Fi(27), Ls = n((function (t, e) {
                            if (w(t, Ts)) {
                                if (3 !== e.$) return !1;
                                switch (e.c) {
                                    case"0px":
                                    case"1px":
                                    case"2px":
                                    case"3px":
                                    case"4px":
                                    case"5px":
                                    case"6px":
                                        return !0;
                                    default:
                                        return !1
                                }
                            } else switch (e.$) {
                                case 2:
                                    var n = e.a;
                                    return n >= 8 && n <= 32;
                                case 7:
                                    e.a;
                                    var r = e.b, i = e.c, o = e.d, a = e.e;
                                    return w(r, o) && w(r, i) && w(r, a) && r >= 0 && r <= 24;
                                default:
                                    return !1
                            }
                        })), Ps = Fi(6), $s = Fi(30), js = Fi(29), Cs = u((function (t, e, n, r, i, o, a, s) {
                            t:for (; ;) {
                                if (!s.b) {
                                    var u = ko(r);
                                    if (1 === u.$) return {J: f(ze, po(t), o), K: a, N: n, O: e, c9: i};
                                    var c = u.a;
                                    return {J: f(ze, po(t + " " + c), o), K: a, N: n, O: e, c9: f(ze, ss(r), i)}
                                }
                                var h = s.a, d = s.b;
                                switch (h.$) {
                                    case 0:
                                        t = m = t, e = v = e, n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                        continue t;
                                    case 3:
                                        var p = h.a, g = h.b;
                                        if (f(Za, p, n)) {
                                            t = m = t, e = v = e, n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                            continue t
                                        }
                                        t = m = g + " " + t, e = v = e, n = b = f(cs, p, n), r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                        continue t;
                                    case 1:
                                        var y = h.a, m = t, v = e, b = n, w = r, x = i, k = f(ze, y, o);
                                        t = m, e = v, n = b, r = w, i = x, o = k, a = q = a, s = d;
                                        continue t;
                                    case 4:
                                        p = h.a;
                                        var E = h.b;
                                        if (f(Za, p, n)) {
                                            t = m = t, e = v = e, n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                            continue t
                                        }
                                        if (f(Ls, p, E)) {
                                            t = m = Eo(E) + " " + t, e = v = e, n = b = f(cs, p, n), r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                            continue t
                                        }
                                        m = Eo(E) + " " + t, v = e, b = f(cs, p, n), w = r, x = f(ze, E, i), t = m, e = v, n = b, r = w, i = x, o = k = o, a = q = a, s = d;
                                        continue t;
                                    case 10:
                                        p = h.a;
                                        var A = h.b;
                                        t = m = t, e = v = e, n = b = f(cs, p, n), r = w = f(Es, r, A), i = x = i, o = k = o, a = q = a, s = d;
                                        continue t;
                                    case 7:
                                        var S = h.a;
                                        if (f(Za, Ps, n)) {
                                            t = m = t, e = v = e, n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                            continue t
                                        }
                                        switch (S.$) {
                                            case 0:
                                                var I = S.a;
                                                m = "we width-px-" + nn(I) + " " + t, v = e, b = f(cs, Ps, n), w = r, x = f(ze, l(as, "width-px-" + nn(I), "width", nn(I) + "px"), i), t = m, e = v, n = b, r = w, i = x, o = k = o, a = q = a, s = d;
                                                continue t;
                                            case 1:
                                                t = m = t + " " + Wi, e = v = e, n = b = f(cs, Os, f(cs, Ps, n)), r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                                continue t;
                                            case 2:
                                                if (1 === (j = S.a)) {
                                                    t = m = t + " " + qi, e = v = e, n = b = f(cs, Qa, f(cs, Ps, n)), r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                                    continue t
                                                }
                                                m = t + " " + Ki + " width-fill-" + nn(j), v = e, b = f(cs, Qa, f(cs, Ps, n)), w = r, x = f(ze, l(as, "s.r > " + Co("width-fill-" + nn(j)), "flex-grow", nn(1e5 * j)), i), t = m, e = v, n = b, r = w, i = x, o = k = o, a = q = a, s = d;
                                                continue t;
                                            default:
                                                var B = _s(S), M = B.a, _ = B.b, T = B.c;
                                                m = t + " " + _, v = e, b = f(Is, M, f(cs, Ps, n)), w = r, x = O(T, i), t = m, e = v, n = b, r = w, i = x, o = k = o, a = q = a, s = d;
                                                continue t
                                        }
                                    case 8:
                                        var L = h.a;
                                        if (f(Za, As, n)) {
                                            t = m = t, e = v = e, n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                            continue t
                                        }
                                        switch (L.$) {
                                            case 0:
                                                I = L.a;
                                                var P = nn(I) + "px", $ = "height-px-" + P;
                                                m = "he " + $ + " " + t, v = e, b = f(cs, As, n), w = r, x = f(ze, l(as, $, "height ", P), i), t = m, e = v, n = b, r = w, i = x, o = k = o, a = q = a, s = d;
                                                continue t;
                                            case 1:
                                                t = m = "hc " + t, e = v = e, n = b = f(cs, Ss, f(cs, As, n)), r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                                continue t;
                                            case 2:
                                                var j;
                                                if (1 === (j = L.a)) {
                                                    t = m = "hf " + t, e = v = e, n = b = f(cs, Ha, f(cs, As, n)), r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                                    continue t
                                                }
                                                m = t + " " + Mi + " height-fill-" + nn(j), v = e, b = f(cs, Ha, f(cs, As, n)), w = r, x = f(ze, l(as, "s.c > " + Co("height-fill-" + nn(j)), "flex-grow", nn(1e5 * j)), i), t = m, e = v, n = b, r = w, i = x, o = k = o, a = q = a, s = d;
                                                continue t;
                                            default:
                                                var C = Ms(L);
                                                M = C.a, _ = C.b, T = C.c, m = t + " " + _, v = e, b = f(Is, M, f(cs, As, n)), w = r, x = O(T, i), t = m, e = v, n = b, r = w, i = x, o = k = o, a = q = a, s = d;
                                                continue t
                                        }
                                    case 2:
                                        var R = h.a;
                                        switch (R.$) {
                                            case 0:
                                                t = m = t, e = v = f(ms, "main", e), n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                                continue t;
                                            case 1:
                                                t = m = t, e = v = f(ms, "nav", e), n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                                continue t;
                                            case 2:
                                                t = m = t, e = v = f(ms, "footer", e), n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                                continue t;
                                            case 3:
                                                t = m = t, e = v = f(ms, "aside", e), n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                                continue t;
                                            case 4:
                                                var U = R.a;
                                                if (U <= 1) {
                                                    t = m = t, e = v = f(ms, "h1", e), n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                                    continue t
                                                }
                                                if (U < 7) {
                                                    t = m = t, e = v = f(ms, "h" + nn(U), e), n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                                    continue t
                                                }
                                                t = m = t, e = v = f(ms, "h6", e), n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                                continue t;
                                            case 9:
                                                t = m = t, e = v = e, n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                                continue t;
                                            case 8:
                                                m = t, v = e, b = n, w = r, x = i, k = f(ze, f(ws, "role", "button"), o), t = m, e = v, n = b, r = w, i = x, o = k, a = q = a, s = d;
                                                continue t;
                                            case 5:
                                                var z = R.a;
                                                m = t, v = e, b = n, w = r, x = i, k = f(ze, f(ws, "aria-label", z), o), t = m, e = v, n = b, r = w, i = x, o = k, a = q = a, s = d;
                                                continue t;
                                            case 6:
                                                m = t, v = e, b = n, w = r, x = i, k = f(ze, f(ws, "aria-live", "polite"), o), t = m, e = v, n = b, r = w, i = x, o = k, a = q = a, s = d;
                                                continue t;
                                            default:
                                                m = t, v = e, b = n, w = r, x = i, k = f(ze, f(ws, "aria-live", "assertive"), o), t = m, e = v, n = b, r = w, i = x, o = k, a = q = a, s = d;
                                                continue t
                                        }
                                    case 9:
                                        var N = h.a, W = h.b, q = (m = t, v = e, b = n, w = r, x = T = function () {
                                            switch (W.$) {
                                                case 3:
                                                    return i;
                                                case 2:
                                                case 0:
                                                    return W.a, i;
                                                default:
                                                    var t = W.a;
                                                    return O(i, t.c9)
                                            }
                                        }(), k = o, l(ps, N, W, a));
                                        t = m, e = v, n = b, r = w, i = x, o = k, a = q, s = d;
                                        continue t;
                                    case 6:
                                        var K = h.a;
                                        if (f(Za, $s, n)) {
                                            t = m = t, e = v = e, n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                            continue t
                                        }
                                        t = m = vs(K) + " " + t, e = v = e, n = b = function (t) {
                                            switch (K) {
                                                case 1:
                                                    return f(cs, fo, t);
                                                case 2:
                                                    return f(cs, co, t);
                                                default:
                                                    return t
                                            }
                                        }(f(cs, $s, n)), r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                        continue t;
                                    default:
                                        var D = h.a;
                                        if (f(Za, js, n)) {
                                            t = m = t, e = v = e, n = b = n, r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                            continue t
                                        }
                                        t = m = bs(D) + " " + t, e = v = e, n = b = function (t) {
                                            switch (D) {
                                                case 1:
                                                    return f(cs, lo, t);
                                                case 2:
                                                    return f(cs, uo, t);
                                                default:
                                                    return t
                                            }
                                        }(f(cs, js, n)), r = w = r, i = x = i, o = k = o, a = q = a, s = d;
                                        continue t
                                }
                            }
                        })), Rs = {$: 0}, Us = Rs, zs = i((function (t, e, n, r) {
                            return l(os, t, r, g(Cs, function (t) {
                                switch (t) {
                                    case 0:
                                        return "s r";
                                    case 1:
                                        return "s c";
                                    case 2:
                                        return "s e";
                                    case 3:
                                        return "s g";
                                    case 4:
                                        return "s p";
                                    default:
                                        return "s pg"
                                }
                            }(t), e, Bs, Us, _, _, eo, vn(n)))
                        })), Ns = {$: 0}, Ws = function (t) {
                            return 4 === t.$ && 11 === t.b.$ && !t.b.a && (t.b.a, !0)
                        }, qs = function (t) {
                            return Ji(po(t))
                        }, Ks = function (t) {
                            return {$: 8, a: t}
                        }, Ds = Ks, Fs = r((function (t, e, n) {
                            return t(e(n))
                        })), Hs = Xt, Vs = n((function (t, e) {
                            return f(Hs, t, {$: 0, a: e})
                        })), Js = f(Fs, Ji, (function (t) {
                            return f(Vs, "click", Hn(t))
                        })), Zs = n((function (t, e) {
                            return f(Hs, t, {$: 2, a: e})
                        })), Gs = Fi(21), Ys = f(mi, Gs, Ii), Xs = {$: 1}, Qs = function (t) {
                            return {$: 7, a: t}
                        }, tu = Qs, eu = n((function (t, e) {
                            var n = e.bf, r = e.aE;
                            return h(zs, 2, to, f(ze, tu(Xs), f(ze, Ds(Xs), f(ze, qs("ccx ccy sbt " + Ti), f(ze, Ys, f(ze, function (t) {
                                return f(xa, Ws, t) ? Ns : qs("focusable")
                            }(t), f(ze, Gi(Zi), f(ze, Ji(f(ee, "tabIndex", nn(0))), function () {
                                if (1 === n.$) return f(ze, Ji(Qi(!0)), t);
                                var e, r, i = n.a;
                                return f(ze, Js(i), f(ze, (e = function (t) {
                                    return w(t, "Enter") || w(t, " ") ? Xe(i) : Qe
                                }, r = f(Kn, (function (t) {
                                    var n = e(t);
                                    if (1 === n.$) return {$: 1, a: "No key matched"};
                                    var r = n.a;
                                    return Hn(r)
                                }), f(_r, "key", Wr)), Ji(f(Zs, "keydown", f(Dn, (function (t) {
                                    return I(t, !0)
                                }), r)))), t))
                            }()))))))), Yi(P([r])))
                        })), nu = r((function (t, e, n) {
                            return {$: 4, a: t, b: e, c: n}
                        })), ru = n((function (t, e) {
                            return {$: 4, a: t, b: e}
                        })), iu = Fi(8), ou = function (t) {
                            var e = t.a, n = t.b, r = t.c, i = t.d;
                            return xo(e) + "-" + xo(n) + "-" + xo(r) + "-" + xo(i)
                        }, au = function (t) {
                            return f(ru, iu, l(nu, "bg-" + ou(t), "background-color", t))
                        }, su = Fi(14), uu = function (t) {
                            return f(ru, su, l(nu, "fc-" + ou(t), "color", t))
                        }, cu = Ji, fu = cu(po("sc_hover_fade")), lu = o((function (t, e, n, r, i) {
                            return {$: 7, a: t, b: e, c: n, d: r, e: i}
                        })), hu = Fi(2), du = function (t) {
                            var e = t;
                            return f(ru, hu, d(lu, "p-" + nn(t), e, e, e, e))
                        }, pu = n((function (t, e) {
                            if (w(t, e)) {
                                var n = t;
                                return f(ru, hu, d(lu, "p-" + nn(t), n, n, n, n))
                            }
                            var r = e, i = t;
                            return f(ru, hu, d(lu, "p-" + nn(t) + "-" + nn(e), r, i, r, i))
                        })), gu = Fi(17), yu = function (t) {
                            return f(ru, gu, l(as, "br-" + nn(t), "border-radius", nn(t) + "px"))
                        }, mu = function (t) {
                            return {$: 2, a: t}
                        }, vu = Fi(4), bu = function (t) {
                            return f(ru, vu, mu(t))
                        }, wu = function (t) {
                            return {$: 2, a: t}
                        }, xu = function (t) {
                            return wu(t)
                        }, ku = o((function (t, e, n, r, i) {
                            return {$: 6, a: t, b: e, c: n, d: r, e: i}
                        })), Eu = function (t) {
                            return f(ru, Ts, d(ku, "b-" + nn(t), t, t, t, t))
                        }, Au = r((function (t, e, n) {
                            return f(eu, P([du(10), Eu(1), au(t), yu(20), uu(yi), f(pu, 17, 8), fu, bu(15)]), {
                                aE: xu(e),
                                bf: Xe(n)
                            })
                        })), Su = {$: 2, a: 1}, Iu = n((function (t, e) {
                            return {$: 4, a: t, b: e}
                        })), Bu = n((function (t, e) {
                            return f(Iu, t, e)
                        })), Mu = function (t) {
                            return Ds(f(Bu, t, Su))
                        }, Ou = hi(1), _u = n((function (t, e) {
                            return f(eu, P([fu]), {aE: e, bf: Xe(t)})
                        })), Tu = ee("d"), Lu = ee("fill"), Pu = Lu, $u = Vt("http://www.w3.org/2000/svg"), ju = $u("g"),
                        Cu = ee("height"), Ru = $u("svg"), Uu = ee("width"), zu = i((function (t, e, n, r) {
                            var i = nn(n);
                            return f(Ru, O(t, P([Cu(i), Uu(i)])), P([f(ju, P([function () {
                                if (r.$) return Lu("currentColor");
                                var t, e, n, i, o, a, s, u = r.a;
                                return Lu((n = (t = u).a, i = t.b, o = t.c, a = t.d, s = function (t) {
                                    return wo(1e4 * t) / 100
                                }, pa(P(["rgba(", zo(s(n)), "%,", zo(s(i)), "%,", zo(s(o)), "%,", zo((e = a, wo(1e3 * e) / 1e3)), ")"]))))
                            }()]), e)]))
                        })), Nu = $u("path"), Wu = Nu, qu = ee("viewBox"), Ku = qu,
                        Du = f(zu, P([Ku("0 0 24 24")]), P([f(Wu, P([Tu("M0 0h24v24H0z"), Pu("none")]), _), f(Wu, P([Tu("M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z")]), _)])),
                        Fu = Fi(28), Hu = n((function (t, e) {
                            return h(zs, 1, to, f(ze, qs("ct cl"), f(ze, Ds(Xs), f(ze, tu(Xs), t))), Yi(e))
                        })),
                        Vu = f(zu, P([Ku("0 0 24 24")]), P([f(Wu, P([Tu("M0 0h24v24H0z"), Pu("none")]), _), f(Wu, P([Tu("M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z")]), _)])),
                        Ju = n((function (t, e) {
                            return h(zs, 2, to, f(ze, tu(Xs), f(ze, Ds(Xs), t)), Yi(P([e])))
                        })), Zu = Qt, Gu = n((function (t, e) {
                            return cu(f(Zu, t, e))
                        })), Yu = f(Gu, "animation", "fadeIn 0.5s"), Xu = r((function (t, e, n) {
                            return t ? e : n
                        })), Qu = {$: 1}, tc = f(Fs, oo, Ur), ec = n((function (t, e) {
                            return f(Ju, _, tc(f(t, e, Qu)))
                        })), nc = ho("alt"), rc = n((function (t, e) {
                            var n, r = e.bw, i = e.aZ, o = f(Ra, (function (t) {
                                switch (t.$) {
                                    case 7:
                                    case 8:
                                        return !0;
                                    default:
                                        return !1
                                }
                            }), t);
                            return h(zs, 2, to, f(ze, qs("ic"), t), Yi(P([h(zs, 2, ys("img"), O(P([Ji((n = r, f(ho, "src", re(n)))), Ji(nc(i))]), o), Yi(_))])))
                        })), ic = n((function (t, e) {
                            return {$: 2, a: t, b: e}
                        })), oc = n((function (t, e) {
                            return {$: 1, a: t, b: e}
                        })), ac = {bX: Qe, b1: Qe, c0: Xe({V: 0, W: h(pi, 155 / 255, 203 / 255, 1, 1), be: I(0, 0), Z: 3})},
                        sc = n((function (t, e) {
                            switch (e.$) {
                                case 0:
                                    return (0, e.a)(2);
                                case 1:
                                    var n = e.a.c9;
                                    return f(e.a.cu, t(n), 2);
                                case 2:
                                    var r = e.a;
                                    return rs(r);
                                default:
                                    return rs("")
                            }
                        })), uc = r((function (t, e, r) {
                            var i = function (t) {
                                var e, r, i, o, a = n((function (t, e) {
                                    switch (t.$) {
                                        case 0:
                                            var n = t.a;
                                            return 1 === e.ct.$ ? M(e, {ct: Xe(n)}) : e;
                                        case 1:
                                            var r = t.a;
                                            return 1 === e.cn.$ ? M(e, {cn: Xe(r)}) : e;
                                        default:
                                            var i = t.a;
                                            return 1 === e.cK.$ ? M(e, {cK: Xe(i)}) : e
                                    }
                                }));
                                return {
                                    cn: (o = (e = l(fr, a, {cn: Qe, ct: Qe, cK: Qe}, t)).cn, 1 === o.$ ? ac : o.a),
                                    ct: (i = e.ct, 1 === i.$ ? 1 : i.a),
                                    cK: (r = e.cK, 1 === r.$ ? 0 : r.a)
                                }
                            }(t), o = 1 === i.cK ? ic(i) : oc(i);
                            return f(sc, o, h(zs, 2, to, e, Yi(P([r]))))
                        })), cc = n((function (t, e) {
                            return {$: 1, a: t, b: e}
                        })), fc = {$: 1}, lc = function (t) {
                            return {$: 3, a: t}
                        }, hc = Fi(5), dc = function (t) {
                            return t.toLowerCase()
                        }, pc = function (t) {
                            return P(t.trim().split(/\s+/g))
                        }, gc = n((function (t, e) {
                            return O(e, function () {
                                switch (t.$) {
                                    case 0:
                                        return "serif";
                                    case 1:
                                        return "sans-serif";
                                    case 2:
                                        return "monospace";
                                    case 3:
                                        var e = t.a;
                                        return f(rn, "-", pc(dc(e)));
                                    case 4:
                                        return e = t.a, t.b, f(rn, "-", pc(dc(e)));
                                    default:
                                        return e = t.a.cL, f(rn, "-", pc(dc(e)))
                                }
                            }())
                        })),
                        yc = (Ar = P([lc("Open Sans"), lc("Helvetica"), lc("Verdana"), fc]), P([f(ru, iu, l(nu, "bg-" + ou(h(pi, 1, 1, 1, 0)), "background-color", h(pi, 1, 1, 1, 0))), f(ru, su, l(nu, "fc-" + ou(h(pi, 0, 0, 0, 1)), "color", h(pi, 0, 0, 0, 1))), f(ru, vu, mu(20)), f(ru, hc, f(cc, l(sn, gc, "font-", Ar), Ar))])),
                        mc = r((function (t, e, n) {
                            var r = t.cR;
                            return l(uc, r, f(ze, qs(f(rn, " ", P(["ui", ki, Ci]))), O(yc, e)), n)
                        })), vc = function (t) {
                            return f(ru, hc, f(cc, l(sn, gc, "ff-", t), t))
                        }, bc = vc(P([{$: 2}])), wc = n((function (t, e) {
                            return {$: 11, a: t, b: e}
                        })), xc = Fi(32), kc = n((function (t, e) {
                            return {$: 9, a: t, b: e}
                        })), Ec = n((function (t, e) {
                            return {$: 10, a: t, b: e}
                        })), Ac = {$: 3}, Sc = Gt, Ic = n((function (t, e) {
                            switch (e.$) {
                                case 1:
                                    var r = e.a;
                                    return io({
                                        cu: n((function (e, n) {
                                            return f(Sc, t, f(r.cu, e, n))
                                        })), c9: r.c9
                                    });
                                case 0:
                                    var i = e.a;
                                    return oo(f(Fs, Sc(t), i));
                                case 2:
                                    var o = e.a;
                                    return wu(o);
                                default:
                                    return Ac
                            }
                        })), Bc = oe, Mc = n((function (t, e) {
                            switch (e.$) {
                                case 0:
                                    return Ns;
                                case 2:
                                    var n = e.a;
                                    return Gi(n);
                                case 6:
                                    var r = e.a;
                                    return hi(r);
                                case 5:
                                    var i = e.a;
                                    return fi(i);
                                case 7:
                                    return r = e.a, Qs(r);
                                case 8:
                                    return r = e.a, Ks(r);
                                case 3:
                                    return r = e.a, i = e.b, f(mi, r, i);
                                case 4:
                                    var o = e.a, a = e.b;
                                    return f(ru, o, a);
                                case 9:
                                    var s = e.a, u = e.b;
                                    return f(kc, s, f(Ic, t, u));
                                case 1:
                                    var c = e.a;
                                    return Ji(f(Bc, t, c));
                                default:
                                    var l = e.a, h = e.b;
                                    return f(Ec, l, h)
                            }
                        })), Oc = n((function (t, e) {
                            var n = e.a, r = e.b, i = function (t) {
                                return f(Mc, ar, t)
                            }(t);
                            switch (i.$) {
                                case 4:
                                    var o = i.b;
                                    return I(f(ze, o, n), r);
                                case 10:
                                    i.a;
                                    var a = i.b;
                                    return I(n, f(Es, r, a));
                                default:
                                    return I(n, r)
                            }
                        })), _c = Fi(26), Tc = Fi(25),
                        Lc = f(zu, P([Ku("0 0 24 24")]), P([f(Wu, P([Tu("M0 0h24v24H0z"), Pu("none")]), _), f(Wu, P([Tu("M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z")]), _)])),
                        Pc = function (t) {
                            return {$: 0, a: t}
                        }, $c = l(gi, 255, 70, 60), jc = i((function (t, e, n, r) {
                            return h(pi, t / 255, e / 255, n / 255, r)
                        })), Cc = n((function (t, e) {
                            return h(zs, 0, to, f(ze, qs("cl " + Si), f(ze, tu(Xs), f(ze, Ds(Xs), t))), Yi(e))
                        })), Rc = vc(P([fc])), Uc = ee("gradientTransform"), zc = ee("gradientUnits"), Nc = ee("id"),
                        Wc = $u("linearGradient"), qc = ee("offset"), Kc = $u("stop"), Dc = ee("stop-color"),
                        Fc = f(Jr, tc, Ju(_)), Hc = ee("x1"), Vc = ee("x2"), Jc = ee("y1"), Zc = ee("y2"), Gc = Fi(3),
                        Yc = f(mi, Gc, Ui), Xc = r((function (t, e, n) {
                            return {$: 5, a: t, b: e, c: n}
                        })), Qc = n((function (t, e) {
                            return "spacing-" + nn(t) + "-" + nn(e)
                        })), tf = function (t) {
                            return f(ru, Gc, l(Xc, f(Qc, t, t), t, t))
                        }, ef = ho("title"), nf = function (t) {
                            return cu(ef(t))
                        }, rf = qs("u"), of = ee("rel"), af = ho("target"), sf = n((function (t, e) {
                            var n = e.dv, r = e.aE;
                            return h(zs, 2, ys("a"), f(ze, Ji(function (t) {
                                return f(ho, "href", /^javascript:/i.test((e = t).replace(/\s/g, "")) ? "" : e);
                                var e
                            }(n)), f(ze, Ji(of("noopener noreferrer")), f(ze, Ji(af("_blank")), f(ze, tu(Xs), f(ze, Ds(Xs), f(ze, qs("ccx ccy lnk"), t)))))), Yi(P([r])))
                        })), uf = n((function (t, e) {
                            return f(sf, P([fu]), {aE: e, dv: t})
                        })), cf = fi(0), ff = Fi(12), lf = f(mi, ff, "tc"), hf = cu(po("sc_fade")), df = {$: 9},
                        pf = n((function (t, e) {
                            return h(zs, 4, to, f(ze, Gi(df), f(ze, tu(Su), f(ze, tf(5), t))), Yi(e))
                        })), gf = f(Gu, "animation", "rotation 0.7s infinite linear"), yf = function (t) {
                            return f(Ju, P([gf, f(Gu, "fill", "white")]), (e = t, Fc(f(Ru, P([qu("0 0 512 512"), Cu(nn(e))]), P([f(Nu, P([Tu("M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z")]), _)])))));
                            var e
                        }, mf = Ac, vf = n((function (t, e) {
                            return t ? e : mf
                        })), bf = n((function (t, e) {
                            return 3 === e.$ ? Ns : f(kc, t, e)
                        })), wf = function (t) {
                            return t ? Jn : Ur(f(bf, 1, mf))
                        }, xf = function (t) {
                            return l(ii, f(Ju, P([Ou]), yf(20)), (function (e) {
                                return es(e) ? f(pf, P([lf]), P([xu("No Solana wallets have been detected. "), xu("You can learn more about installing one "), f(uf, "https://docs.solana.com/wallet-guide", f(Ju, P([rf]), xu("here"))), xu(".")])) : f(Hu, P([tf(20), Ds(Su)]), f(lr, (function (e) {
                                    return (w(t.ce, Qe) ? _u({
                                        $: 1,
                                        a: e.cL
                                    }) : Jn)(f(Cc, P([tf(10), f(wf, w(t.ce, Qe), fu), f(wf, !w(t.ce, Qe) && !w(t.ce, Xe(e.cL)), hf), f(wf, w(t.ce, Xe(e.cL)), Vi)]), P([f(Cc, P([tf(15), tu(Su)]), P([f(rc, P([Ds(Pc(25)), tu(Pc(25)), cf]), {
                                        aZ: e.cL,
                                        bw: e.cv
                                    }), f(pf, _, P([xu(e.cL)]))])), f(vf, w(t.ce, Xe(e.cL)), f(Ju, P([cf]), yf(20)))])))
                                }), e))
                            }), t.dy)
                        }, kf = l(gi, 255, 255, 255), Ef = o((function (t, e, n, r, i) {
                            return {$: 0, a: t, b: e, c: n, d: r, e: i}
                        })), Af = r((function (t, e, n) {
                            return {$: 0, a: t, b: e, c: n}
                        })), Sf = i((function (t, e, n, r) {
                            return "pad-" + xo(t) + "-" + xo(e) + "-" + xo(n) + "-" + xo(r)
                        })), If = n((function (t, e) {
                            var r = function (t) {
                                return l(fr, n((function (t, e) {
                                    var n = e.a, r = e.b;
                                    return I(function () {
                                        if (n.$) {
                                            if (4 === t.$ && 7 === t.b.$) {
                                                var e = t.b, r = e.a, i = e.b, o = e.c, a = e.d, s = e.e;
                                                return Xe(d(Ef, r, i, o, a, s))
                                            }
                                            return Qe
                                        }
                                        return n.a, n
                                    }(), function () {
                                        if (r.$) {
                                            if (4 === t.$ && 5 === t.b.$) {
                                                var e = t.b, n = e.a, i = (o = e.b, e.c);
                                                return Xe(l(Af, n, o, i))
                                            }
                                            return Qe
                                        }
                                        var o = r.a;
                                        return r
                                    }())
                                })), I(Qe, Qe), t)
                            }(t), i = r.a, o = r.b;
                            if (1 === o.$) return h(zs, 0, to, f(ze, qs("cl ccy " + Di), f(ze, tu(Xs), f(ze, Ds(Xs), t))), Yi(e));
                            var a = o.a, s = a.a, u = a.b, c = a.c, p = function () {
                                if (i.$) return Qe;
                                var t = i.a, e = (t.a, t.b), n = t.c, r = t.d, o = t.e;
                                if (E(n, u / 2) > -1 && E(r, c / 2) > -1) {
                                    var a = e - c / 2, s = n - u / 2, l = o - u / 2, p = r - c / 2;
                                    return Xe(f(ru, hu, d(lu, h(Sf, a, s, p, l), a, s, p, l)))
                                }
                                return Qe
                            }();
                            if (p.$) {
                                var g = -c / 2, y = -u / 2;
                                return h(zs, 2, to, t, Yi(P([h(zs, 0, to, f(ze, qs("cl ccy " + Di), f(ze, Ji(f(Zu, "margin", zo(g) + "px " + zo(y) + "px")), f(ze, Ji(f(Zu, "width", "calc(100% + " + nn(u) + "px)")), f(ze, Ji(f(Zu, "height", "calc(100% + " + nn(c) + "px)")), f(ze, f(ru, Gc, l(Xc, s, u, c)), _))))), Yi(e))])))
                            }
                            var m = p.a;
                            return h(zs, 0, to, f(ze, qs("cl ccy " + Di), f(ze, tu(Xs), f(ze, Ds(Xs), O(t, P([m]))))), Yi(e))
                        }));
                    Sr = {
                        Main: {
                            init: Or({
                                cz: function (t) {
                                    return I({ce: Qe, cF: t.bu.bD < 500, dx: Qe, dy: Qe}, Lr("start"))
                                }, da: function (t) {
                                    return zr(P([Dr(Cr), qr($r), Fr(Ur(Rr)), Kr(Ur(jr))]))
                                }, du: ai, dw: function (t) {
                                    return l(mc, {
                                        cR: P([(e = {bX: Qe, b1: Qe, c0: Qe}, {
                                            $: 1,
                                            a: e
                                        })])
                                    }, P([tu(Su), Ds(Su), bc, au(h(jc, 0, 0, 0, .2)), Yu]), f(Ju, P([Ou, du(l(Xu, t.cF, 15, 30)), tu(f(Bu, 500, Su)), Mu(400)]), f(Hu, P([au(yi), tf(30), du(l(Xu, t.cF, 20, 30)), tu(Su), Eu(2), (n = l(gi, 84, 24, 158), f(ru, Fu, l(nu, "bc-" + ou(n), "border-color", n))), yu(5), uu(kf), Ds(Su)]), P([f(Cc, P([Yc, tu(Su)]), P([f(Cc, P([tf(10)]), P([Fc(f(Ru, P([qu("0 0 397.7 311.7"), Cu(nn(25))]), P([f(Wc, P([Nc("a"), Hc("360.8791"), Vc("141.213"), Jc("351.4553"), Zc("-69.2936"), Uc("matrix(1 0 0 -1 0 314)"), zc("userSpaceOnUse")]), P([f(Kc, P([qc("0"), Dc("#00ffa3")]), _), f(Kc, P([qc("1"), Dc("#dc1fff")]), _)])), f(Nu, P([Lu("url(#a)"), Tu("M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z")]), _), f(Wc, P([Nc("b"), Hc("264.8291"), Vc("45.163"), Jc("401.6014"), Zc("-19.1475"), Uc("matrix(1 0 0 -1 0 314)"), zc("userSpaceOnUse")]), P([f(Kc, P([qc("0"), Dc("#00ffa3")]), _), f(Kc, P([qc("1"), Dc("#dc1fff")]), _)])), f(Nu, P([Lu("url(#b)"), Tu("M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z")]), _), f(Wc, P([Nc("c"), Hc("312.5484"), Vc("92.8822"), Jc("376.688"), Zc("-44.061"), Uc("matrix(1 0 0 -1 0 314)"), zc("userSpaceOnUse")]), P([f(Kc, P([qc("0"), Dc("#00ffa3")]), _), f(Kc, P([qc("1"), Dc("#dc1fff")]), _)])), f(Nu, P([Lu("url(#c)"), Tu("M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z")]), _)]))), f(Ju, P([Vi, bu(25), Rc]), xu("Solana Connect"))])), f(_u, si, f(Ju, P([nf("Close")]), f(ec, Du, 30)))])), l(ii, xf(t), (function (t) {
                                        return f(Hu, P([tf(40)]), P([f(Hu, P([tf(10)]), P([f(Ju, P([Vi, bu(22)]), xu("Wallet Connected:")), (a = f(nr, 12, t.bK), f(Cc, P([tf(15)]), P([f(uf, "https://solscan.io/account/" + t.bK, f(Cc, P([tf(10), fu]), P([f(rc, P([Ds(Pc(30)), tu(Pc(30))]), {
                                            aZ: t.cJ.cL,
                                            bw: t.cJ.cv
                                        }), f(Ju, P([rf]), xu(a + "..."))]))), f(Ju, P([(e = P([f(Ec, Tc, {
                                            $: 0,
                                            a: 3
                                        }), f(Ec, _c, {
                                            $: 1,
                                            a: 3
                                        })]), f(ru, xc, f(wc, 2, (n = e, i = (r = l(sn, Oc, I(_, Rs), n)).a, o = r.b, f(ze, ss(o), i)))))]), f(_u, ui(t.bK), f(Ju, P([nf("Copy")]), f(ec, Vu, 22))))])))])), f(If, P([tf(20)]), P([l(Au, kf, "Change Wallet", ci(!1)), l(Au, $c, "Disconnect", ci(!0))]))]));
                                        var e, n, r, i, o, a
                                    }), t.dx), f(Ju, P([di, li]), f(uf, "https://github.com/ronanyeah/solana-connect/", f(Cc, P([tf(5)]), P([f(Ju, P([bu(15), rf]), xu("About Solana Connect")), f(ec, Lc, 17)]))))]))));
                                    var e, n
                                }
                            })(f(Kn, (function (t) {
                                return Hn({bu: t})
                            }), f(_r, "screen", f(Kn, (function (t) {
                                return f(Kn, (function (e) {
                                    return Hn({cq: e, bD: t})
                                }), f(_r, "height", Pr))
                            }), f(_r, "width", Pr)))))(0)
                        }
                    }, t.Elm ? function t(e, n) {
                        for (var r in n) r in e ? "init" == r ? b(6) : t(e[r], n[r]) : e[r] = n[r]
                    }(t.Elm, Sr) : t.Elm = Sr
                }(this)
            }, 729: t => {
                var e = Object.prototype.hasOwnProperty, n = "~";

                function r() {
                }

                function i(t, e, n) {
                    this.fn = t, this.context = e, this.once = n || !1
                }

                function o(t, e, r, o, a) {
                    if ("function" != typeof r) throw new TypeError("The listener must be a function");
                    var s = new i(r, o || t, a), u = n ? n + e : e;
                    return t._events[u] ? t._events[u].fn ? t._events[u] = [t._events[u], s] : t._events[u].push(s) : (t._events[u] = s, t._eventsCount++), t
                }

                function a(t, e) {
                    0 == --t._eventsCount ? t._events = new r : delete t._events[e]
                }

                function s() {
                    this._events = new r, this._eventsCount = 0
                }

                Object.create && (r.prototype = Object.create(null), (new r).__proto__ || (n = !1)), s.prototype.eventNames = function () {
                    var t, r, i = [];
                    if (0 === this._eventsCount) return i;
                    for (r in t = this._events) e.call(t, r) && i.push(n ? r.slice(1) : r);
                    return Object.getOwnPropertySymbols ? i.concat(Object.getOwnPropertySymbols(t)) : i
                }, s.prototype.listeners = function (t) {
                    var e = n ? n + t : t, r = this._events[e];
                    if (!r) return [];
                    if (r.fn) return [r.fn];
                    for (var i = 0, o = r.length, a = new Array(o); i < o; i++) a[i] = r[i].fn;
                    return a
                }, s.prototype.listenerCount = function (t) {
                    var e = n ? n + t : t, r = this._events[e];
                    return r ? r.fn ? 1 : r.length : 0
                }, s.prototype.emit = function (t, e, r, i, o, a) {
                    var s = n ? n + t : t;
                    if (!this._events[s]) return !1;
                    var u, c, f = this._events[s], l = arguments.length;
                    if (f.fn) {
                        switch (f.once && this.removeListener(t, f.fn, void 0, !0), l) {
                            case 1:
                                return f.fn.call(f.context), !0;
                            case 2:
                                return f.fn.call(f.context, e), !0;
                            case 3:
                                return f.fn.call(f.context, e, r), !0;
                            case 4:
                                return f.fn.call(f.context, e, r, i), !0;
                            case 5:
                                return f.fn.call(f.context, e, r, i, o), !0;
                            case 6:
                                return f.fn.call(f.context, e, r, i, o, a), !0
                        }
                        for (c = 1, u = new Array(l - 1); c < l; c++) u[c - 1] = arguments[c];
                        f.fn.apply(f.context, u)
                    } else {
                        var h, d = f.length;
                        for (c = 0; c < d; c++) switch (f[c].once && this.removeListener(t, f[c].fn, void 0, !0), l) {
                            case 1:
                                f[c].fn.call(f[c].context);
                                break;
                            case 2:
                                f[c].fn.call(f[c].context, e);
                                break;
                            case 3:
                                f[c].fn.call(f[c].context, e, r);
                                break;
                            case 4:
                                f[c].fn.call(f[c].context, e, r, i);
                                break;
                            default:
                                if (!u) for (h = 1, u = new Array(l - 1); h < l; h++) u[h - 1] = arguments[h];
                                f[c].fn.apply(f[c].context, u)
                        }
                    }
                    return !0
                }, s.prototype.on = function (t, e, n) {
                    return o(this, t, e, n, !1)
                }, s.prototype.once = function (t, e, n) {
                    return o(this, t, e, n, !0)
                }, s.prototype.removeListener = function (t, e, r, i) {
                    var o = n ? n + t : t;
                    if (!this._events[o]) return this;
                    if (!e) return a(this, o), this;
                    var s = this._events[o];
                    if (s.fn) s.fn !== e || i && !s.once || r && s.context !== r || a(this, o); else {
                        for (var u = 0, c = [], f = s.length; u < f; u++) (s[u].fn !== e || i && !s[u].once || r && s[u].context !== r) && c.push(s[u]);
                        c.length ? this._events[o] = 1 === c.length ? c[0] : c : a(this, o)
                    }
                    return this
                }, s.prototype.removeAllListeners = function (t) {
                    var e;
                    return t ? (e = n ? n + t : t, this._events[e] && a(this, e)) : (this._events = new r, this._eventsCount = 0), this
                }, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prefixed = n, s.EventEmitter = s, t.exports = s
            }, 241: (t, e) => {
                e.read = function (t, e, n, r, i) {
                    var o, a, s = 8 * i - r - 1, u = (1 << s) - 1, c = u >> 1, f = -7, l = n ? i - 1 : 0,
                        h = n ? -1 : 1, d = t[e + l];
                    for (l += h, o = d & (1 << -f) - 1, d >>= -f, f += s; f > 0; o = 256 * o + t[e + l], l += h, f -= 8) ;
                    for (a = o & (1 << -f) - 1, o >>= -f, f += r; f > 0; a = 256 * a + t[e + l], l += h, f -= 8) ;
                    if (0 === o) o = 1 - c; else {
                        if (o === u) return a ? NaN : 1 / 0 * (d ? -1 : 1);
                        a += Math.pow(2, r), o -= c
                    }
                    return (d ? -1 : 1) * a * Math.pow(2, o - r)
                }, e.write = function (t, e, n, r, i, o) {
                    var a, s, u, c = 8 * o - i - 1, f = (1 << c) - 1, l = f >> 1,
                        h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = r ? 0 : o - 1, p = r ? 1 : -1,
                        g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, a = f) : (a = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), (e += a + l >= 1 ? h / u : h * Math.pow(2, 1 - l)) * u >= 2 && (a++, u /= 2), a + l >= f ? (s = 0, a = f) : a + l >= 1 ? (s = (e * u - 1) * Math.pow(2, i), a += l) : (s = e * Math.pow(2, l - 1) * Math.pow(2, i), a = 0)); i >= 8; t[n + d] = 255 & s, d += p, s /= 256, i -= 8) ;
                    for (a = a << i | s, c += i; c > 0; t[n + d] = 255 & a, d += p, a /= 256, c -= 8) ;
                    t[n + d - p] |= 128 * g
                }
            }, 198: (t, e, n) => {
                const r = n(608).v4, i = n(741), o = function (t, e) {
                    if (!(this instanceof o)) return new o(t, e);
                    e || (e = {}), this.options = {
                        reviver: void 0 !== e.reviver ? e.reviver : null,
                        replacer: void 0 !== e.replacer ? e.replacer : null,
                        generator: void 0 !== e.generator ? e.generator : function () {
                            return r()
                        },
                        version: void 0 !== e.version ? e.version : 2,
                        notificationIdNull: "boolean" == typeof e.notificationIdNull && e.notificationIdNull
                    }, this.callServer = t
                };
                t.exports = o, o.prototype.request = function (t, e, n, r) {
                    const o = this;
                    let a = null;
                    const s = Array.isArray(t) && "function" == typeof e;
                    if (1 === this.options.version && s) throw new TypeError("JSON-RPC 1.0 does not support batching");
                    if (s || !s && t && "object" == typeof t && "function" == typeof e) r = e, a = t; else {
                        "function" == typeof n && (r = n, n = void 0);
                        const o = "function" == typeof r;
                        try {
                            a = i(t, e, n, {
                                generator: this.options.generator,
                                version: this.options.version,
                                notificationIdNull: this.options.notificationIdNull
                            })
                        } catch (t) {
                            if (o) return r(t);
                            throw t
                        }
                        if (!o) return a
                    }
                    let u;
                    try {
                        u = JSON.stringify(a, this.options.replacer)
                    } catch (t) {
                        return r(t)
                    }
                    return this.callServer(u, (function (t, e) {
                        o._parseResponse(t, e, r)
                    })), a
                }, o.prototype._parseResponse = function (t, e, n) {
                    if (t) return void n(t);
                    if (!e) return n();
                    let r;
                    try {
                        r = JSON.parse(e, this.options.reviver)
                    } catch (t) {
                        return n(t)
                    }
                    if (3 === n.length) {
                        if (Array.isArray(r)) {
                            const t = function (t) {
                                return void 0 !== t.error
                            }, e = function (e) {
                                return !t(e)
                            };
                            return n(null, r.filter(t), r.filter(e))
                        }
                        return n(null, r.error, r.result)
                    }
                    n(null, r)
                }
            }, 741: (t, e, n) => {
                const r = n(608).v4;
                t.exports = function (t, e, n, i) {
                    if ("string" != typeof t) throw new TypeError(t + " must be a string");
                    const o = "number" == typeof (i = i || {}).version ? i.version : 2;
                    if (1 !== o && 2 !== o) throw new TypeError(o + " must be 1 or 2");
                    const a = {method: t};
                    if (2 === o && (a.jsonrpc = "2.0"), e) {
                        if ("object" != typeof e && !Array.isArray(e)) throw new TypeError(e + " must be an object, array or omitted");
                        a.params = e
                    }
                    if (void 0 === n) {
                        const t = "function" == typeof i.generator ? i.generator : function () {
                            return r()
                        };
                        a.id = t(a, i)
                    } else 2 === o && null === n ? i.notificationIdNull && (a.id = null) : a.id = n;
                    return a
                }
            }, 855: (t, e, n) => {
                var r = n(836);
                r(n(687)), r(n(156)), r(n(698)), r(n(690)), r(n(728)), r(n(655)), r(n(993)), r(n(808)), n(729).EventEmitter
            }, 598: (t, e, n) => {
                var r = n(836);
                r(n(690)), r(n(728)), r(n(655)), r(n(993)), r(n(808)), n(729).EventEmitter
            }, 509: (t, e, n) => {
                var r = n(764), i = r.Buffer;

                function o(t, e) {
                    for (var n in t) e[n] = t[n]
                }

                function a(t, e, n) {
                    return i(t, e, n)
                }

                i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = r : (o(r, e), e.Buffer = a), a.prototype = Object.create(i.prototype), o(i, a), a.from = function (t, e, n) {
                    if ("number" == typeof t) throw new TypeError("Argument must not be a number");
                    return i(t, e, n)
                }, a.alloc = function (t, e, n) {
                    if ("number" != typeof t) throw new TypeError("Argument must be a number");
                    var r = i(t);
                    return void 0 !== e ? "string" == typeof n ? r.fill(e, n) : r.fill(e) : r.fill(0), r
                }, a.allocUnsafe = function (t) {
                    if ("number" != typeof t) throw new TypeError("Argument must be a number");
                    return i(t)
                }, a.allocUnsafeSlow = function (t) {
                    if ("number" != typeof t) throw new TypeError("Argument must be a number");
                    return r.SlowBuffer(t)
                }
            }, 379: (t, e) => {
                function n(t, e, n) {
                    return e <= t && t <= n
                }

                function r(t) {
                    if (void 0 === t) return {};
                    if (t === Object(t)) return t;
                    throw TypeError("Could not convert argument to dictionary")
                }

                function i(t) {
                    this.tokens = [].slice.call(t)
                }

                i.prototype = {
                    endOfStream: function () {
                        return !this.tokens.length
                    }, read: function () {
                        return this.tokens.length ? this.tokens.shift() : -1
                    }, prepend: function (t) {
                        if (Array.isArray(t)) for (var e = t; e.length;) this.tokens.unshift(e.pop()); else this.tokens.unshift(t)
                    }, push: function (t) {
                        if (Array.isArray(t)) for (var e = t; e.length;) this.tokens.push(e.shift()); else this.tokens.push(t)
                    }
                };
                var o = -1;

                function a(t, e) {
                    if (t) throw TypeError("Decoder error");
                    return e || 65533
                }

                var s = "utf-8";

                function u(t, e) {
                    if (!(this instanceof u)) return new u(t, e);
                    if ((t = void 0 !== t ? String(t).toLowerCase() : s) !== s) throw new Error("Encoding not supported. Only utf-8 is supported");
                    e = r(e), this._streaming = !1, this._BOMseen = !1, this._decoder = null, this._fatal = Boolean(e.fatal), this._ignoreBOM = Boolean(e.ignoreBOM), Object.defineProperty(this, "encoding", {value: "utf-8"}), Object.defineProperty(this, "fatal", {value: this._fatal}), Object.defineProperty(this, "ignoreBOM", {value: this._ignoreBOM})
                }

                function c(t, e) {
                    if (!(this instanceof c)) return new c(t, e);
                    if ((t = void 0 !== t ? String(t).toLowerCase() : s) !== s) throw new Error("Encoding not supported. Only utf-8 is supported");
                    e = r(e), this._streaming = !1, this._encoder = null, this._options = {fatal: Boolean(e.fatal)}, Object.defineProperty(this, "encoding", {value: "utf-8"})
                }

                function f(t) {
                    var e = t.fatal, r = 0, i = 0, s = 0, u = 128, c = 191;
                    this.handler = function (t, f) {
                        if (-1 === f && 0 !== s) return s = 0, a(e);
                        if (-1 === f) return o;
                        if (0 === s) {
                            if (n(f, 0, 127)) return f;
                            if (n(f, 194, 223)) s = 1, r = f - 192; else if (n(f, 224, 239)) 224 === f && (u = 160), 237 === f && (c = 159), s = 2, r = f - 224; else {
                                if (!n(f, 240, 244)) return a(e);
                                240 === f && (u = 144), 244 === f && (c = 143), s = 3, r = f - 240
                            }
                            return r <<= 6 * s, null
                        }
                        if (!n(f, u, c)) return r = s = i = 0, u = 128, c = 191, t.prepend(f), a(e);
                        if (u = 128, c = 191, r += f - 128 << 6 * (s - (i += 1)), i !== s) return null;
                        var l = r;
                        return r = s = i = 0, l
                    }
                }

                function l(t) {
                    t.fatal, this.handler = function (t, e) {
                        if (-1 === e) return o;
                        if (n(e, 0, 127)) return e;
                        var r, i;
                        n(e, 128, 2047) ? (r = 1, i = 192) : n(e, 2048, 65535) ? (r = 2, i = 224) : n(e, 65536, 1114111) && (r = 3, i = 240);
                        for (var a = [(e >> 6 * r) + i]; r > 0;) {
                            var s = e >> 6 * (r - 1);
                            a.push(128 | 63 & s), r -= 1
                        }
                        return a
                    }
                }

                u.prototype = {
                    decode: function (t, e) {
                        var n;
                        n = "object" == typeof t && t instanceof ArrayBuffer ? new Uint8Array(t) : "object" == typeof t && "buffer" in t && t.buffer instanceof ArrayBuffer ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : new Uint8Array(0), e = r(e), this._streaming || (this._decoder = new f({fatal: this._fatal}), this._BOMseen = !1), this._streaming = Boolean(e.stream);
                        for (var a, s = new i(n), u = []; !s.endOfStream() && (a = this._decoder.handler(s, s.read())) !== o;) null !== a && (Array.isArray(a) ? u.push.apply(u, a) : u.push(a));
                        if (!this._streaming) {
                            do {
                                if ((a = this._decoder.handler(s, s.read())) === o) break;
                                null !== a && (Array.isArray(a) ? u.push.apply(u, a) : u.push(a))
                            } while (!s.endOfStream());
                            this._decoder = null
                        }
                        return u.length && (-1 === ["utf-8"].indexOf(this.encoding) || this._ignoreBOM || this._BOMseen || (65279 === u[0] ? (this._BOMseen = !0, u.shift()) : this._BOMseen = !0)), function (t) {
                            for (var e = "", n = 0; n < t.length; ++n) {
                                var r = t[n];
                                r <= 65535 ? e += String.fromCharCode(r) : (r -= 65536, e += String.fromCharCode(55296 + (r >> 10), 56320 + (1023 & r)))
                            }
                            return e
                        }(u)
                    }
                }, c.prototype = {
                    encode: function (t, e) {
                        t = t ? String(t) : "", e = r(e), this._streaming || (this._encoder = new l(this._options)), this._streaming = Boolean(e.stream);
                        for (var n, a = [], s = new i(function (t) {
                            for (var e = String(t), n = e.length, r = 0, i = []; r < n;) {
                                var o = e.charCodeAt(r);
                                if (o < 55296 || o > 57343) i.push(o); else if (56320 <= o && o <= 57343) i.push(65533); else if (55296 <= o && o <= 56319) if (r === n - 1) i.push(65533); else {
                                    var a = t.charCodeAt(r + 1);
                                    if (56320 <= a && a <= 57343) {
                                        var s = 1023 & o, u = 1023 & a;
                                        i.push(65536 + (s << 10) + u), r += 1
                                    } else i.push(65533)
                                }
                                r += 1
                            }
                            return i
                        }(t)); !s.endOfStream() && (n = this._encoder.handler(s, s.read())) !== o;) Array.isArray(n) ? a.push.apply(a, n) : a.push(n);
                        if (!this._streaming) {
                            for (; (n = this._encoder.handler(s, s.read())) !== o;) Array.isArray(n) ? a.push.apply(a, n) : a.push(n);
                            this._encoder = null
                        }
                        return new Uint8Array(a)
                    }
                }, e.TextEncoder = c, e.TextDecoder = u
            }, 608: (t, e, n) => {
                var r;
                n.d(e, {v4: () => c});
                var i = new Uint8Array(16);

                function o() {
                    if (!r && !(r = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                    return r(i)
                }

                const a = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
                for (var s = [], u = 0; u < 256; ++u) s.push((u + 256).toString(16).substr(1));
                const c = function (t, e, n) {
                    var r = (t = t || {}).random || (t.rng || o)();
                    if (r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, e) {
                        n = n || 0;
                        for (var i = 0; i < 16; ++i) e[n + i] = r[i];
                        return e
                    }
                    return function (t) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                            n = (s[t[e + 0]] + s[t[e + 1]] + s[t[e + 2]] + s[t[e + 3]] + "-" + s[t[e + 4]] + s[t[e + 5]] + "-" + s[t[e + 6]] + s[t[e + 7]] + "-" + s[t[e + 8]] + s[t[e + 9]] + "-" + s[t[e + 10]] + s[t[e + 11]] + s[t[e + 12]] + s[t[e + 13]] + s[t[e + 14]] + s[t[e + 15]]).toLowerCase();
                        if (!function (t) {
                            return "string" == typeof t && a.test(t)
                        }(n)) throw TypeError("Stringified UUID is invalid");
                        return n
                    }(r)
                }
            }, 601: () => {
            }, 115: t => {
                t.exports = function (t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t
                }, t.exports.__esModule = !0, t.exports.default = t.exports
            }, 156: t => {
                function e(t, e, n, r, i, o, a) {
                    try {
                        var s = t[o](a), u = s.value
                    } catch (t) {
                        return void n(t)
                    }
                    s.done ? e(u) : Promise.resolve(u).then(r, i)
                }

                t.exports = function (t) {
                    return function () {
                        var n = this, r = arguments;
                        return new Promise((function (i, o) {
                            var a = t.apply(n, r);

                            function s(t) {
                                e(a, i, o, s, u, "next", t)
                            }

                            function u(t) {
                                e(a, i, o, s, u, "throw", t)
                            }

                            s(void 0)
                        }))
                    }
                }, t.exports.__esModule = !0, t.exports.default = t.exports
            }, 690: t => {
                t.exports = function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }, t.exports.__esModule = !0, t.exports.default = t.exports
            }, 728: (t, e, n) => {
                var r = n(62);

                function i(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var i = e[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, r(i.key), i)
                    }
                }

                t.exports = function (t, e, n) {
                    return e && i(t.prototype, e), n && i(t, n), Object.defineProperty(t, "prototype", {writable: !1}), t
                }, t.exports.__esModule = !0, t.exports.default = t.exports
            }, 808: t => {
                function e(n) {
                    return t.exports = e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
                        return t.__proto__ || Object.getPrototypeOf(t)
                    }, t.exports.__esModule = !0, t.exports.default = t.exports, e(n)
                }

                t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports
            }, 655: (t, e, n) => {
                var r = n(15);
                t.exports = function (t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(t, "prototype", {writable: !1}), e && r(t, e)
                }, t.exports.__esModule = !0, t.exports.default = t.exports
            }, 836: t => {
                t.exports = function (t) {
                    return t && t.__esModule ? t : {default: t}
                }, t.exports.__esModule = !0, t.exports.default = t.exports
            }, 993: (t, e, n) => {
                var r = n(698).default, i = n(115);
                t.exports = function (t, e) {
                    if (e && ("object" === r(e) || "function" == typeof e)) return e;
                    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                    return i(t)
                }, t.exports.__esModule = !0, t.exports.default = t.exports
            }, 61: (t, e, n) => {
                var r = n(698).default;

                function i() {
                    t.exports = i = function () {
                        return e
                    }, t.exports.__esModule = !0, t.exports.default = t.exports;
                    var e = {}, n = Object.prototype, o = n.hasOwnProperty,
                        a = Object.defineProperty || function (t, e, n) {
                            t[e] = n.value
                        }, s = "function" == typeof Symbol ? Symbol : {}, u = s.iterator || "@@iterator",
                        c = s.asyncIterator || "@@asyncIterator", f = s.toStringTag || "@@toStringTag";

                    function l(t, e, n) {
                        return Object.defineProperty(t, e, {
                            value: n,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }), t[e]
                    }

                    try {
                        l({}, "")
                    } catch (t) {
                        l = function (t, e, n) {
                            return t[e] = n
                        }
                    }

                    function h(t, e, n, r) {
                        var i = e && e.prototype instanceof g ? e : g, o = Object.create(i.prototype),
                            s = new M(r || []);
                        return a(o, "_invoke", {value: A(t, n, s)}), o
                    }

                    function d(t, e, n) {
                        try {
                            return {type: "normal", arg: t.call(e, n)}
                        } catch (t) {
                            return {type: "throw", arg: t}
                        }
                    }

                    e.wrap = h;
                    var p = {};

                    function g() {
                    }

                    function y() {
                    }

                    function m() {
                    }

                    var v = {};
                    l(v, u, (function () {
                        return this
                    }));
                    var b = Object.getPrototypeOf, w = b && b(b(O([])));
                    w && w !== n && o.call(w, u) && (v = w);
                    var x = m.prototype = g.prototype = Object.create(v);

                    function k(t) {
                        ["next", "throw", "return"].forEach((function (e) {
                            l(t, e, (function (t) {
                                return this._invoke(e, t)
                            }))
                        }))
                    }

                    function E(t, e) {
                        function n(i, a, s, u) {
                            var c = d(t[i], t, a);
                            if ("throw" !== c.type) {
                                var f = c.arg, l = f.value;
                                return l && "object" == r(l) && o.call(l, "__await") ? e.resolve(l.__await).then((function (t) {
                                    n("next", t, s, u)
                                }), (function (t) {
                                    n("throw", t, s, u)
                                })) : e.resolve(l).then((function (t) {
                                    f.value = t, s(f)
                                }), (function (t) {
                                    return n("throw", t, s, u)
                                }))
                            }
                            u(c.arg)
                        }

                        var i;
                        a(this, "_invoke", {
                            value: function (t, r) {
                                function o() {
                                    return new e((function (e, i) {
                                        n(t, r, e, i)
                                    }))
                                }

                                return i = i ? i.then(o, o) : o()
                            }
                        })
                    }

                    function A(t, e, n) {
                        var r = "suspendedStart";
                        return function (i, o) {
                            if ("executing" === r) throw new Error("Generator is already running");
                            if ("completed" === r) {
                                if ("throw" === i) throw o;
                                return {value: void 0, done: !0}
                            }
                            for (n.method = i, n.arg = o; ;) {
                                var a = n.delegate;
                                if (a) {
                                    var s = S(a, n);
                                    if (s) {
                                        if (s === p) continue;
                                        return s
                                    }
                                }
                                if ("next" === n.method) n.sent = n._sent = n.arg; else if ("throw" === n.method) {
                                    if ("suspendedStart" === r) throw r = "completed", n.arg;
                                    n.dispatchException(n.arg)
                                } else "return" === n.method && n.abrupt("return", n.arg);
                                r = "executing";
                                var u = d(t, e, n);
                                if ("normal" === u.type) {
                                    if (r = n.done ? "completed" : "suspendedYield", u.arg === p) continue;
                                    return {value: u.arg, done: n.done}
                                }
                                "throw" === u.type && (r = "completed", n.method = "throw", n.arg = u.arg)
                            }
                        }
                    }

                    function S(t, e) {
                        var n = e.method, r = t.iterator[n];
                        if (void 0 === r) return e.delegate = null, "throw" === n && t.iterator.return && (e.method = "return", e.arg = void 0, S(t, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), p;
                        var i = d(r, t.iterator, e.arg);
                        if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, p;
                        var o = i.arg;
                        return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, p) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, p)
                    }

                    function I(t) {
                        var e = {tryLoc: t[0]};
                        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
                    }

                    function B(t) {
                        var e = t.completion || {};
                        e.type = "normal", delete e.arg, t.completion = e
                    }

                    function M(t) {
                        this.tryEntries = [{tryLoc: "root"}], t.forEach(I, this), this.reset(!0)
                    }

                    function O(t) {
                        if (t || "" === t) {
                            var e = t[u];
                            if (e) return e.call(t);
                            if ("function" == typeof t.next) return t;
                            if (!isNaN(t.length)) {
                                var n = -1, i = function e() {
                                    for (; ++n < t.length;) if (o.call(t, n)) return e.value = t[n], e.done = !1, e;
                                    return e.value = void 0, e.done = !0, e
                                };
                                return i.next = i
                            }
                        }
                        throw new TypeError(r(t) + " is not iterable")
                    }

                    return y.prototype = m, a(x, "constructor", {
                        value: m,
                        configurable: !0
                    }), a(m, "constructor", {
                        value: y,
                        configurable: !0
                    }), y.displayName = l(m, f, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
                        var e = "function" == typeof t && t.constructor;
                        return !!e && (e === y || "GeneratorFunction" === (e.displayName || e.name))
                    }, e.mark = function (t) {
                        return Object.setPrototypeOf ? Object.setPrototypeOf(t, m) : (t.__proto__ = m, l(t, f, "GeneratorFunction")), t.prototype = Object.create(x), t
                    }, e.awrap = function (t) {
                        return {__await: t}
                    }, k(E.prototype), l(E.prototype, c, (function () {
                        return this
                    })), e.AsyncIterator = E, e.async = function (t, n, r, i, o) {
                        void 0 === o && (o = Promise);
                        var a = new E(h(t, n, r, i), o);
                        return e.isGeneratorFunction(n) ? a : a.next().then((function (t) {
                            return t.done ? t.value : a.next()
                        }))
                    }, k(x), l(x, f, "Generator"), l(x, u, (function () {
                        return this
                    })), l(x, "toString", (function () {
                        return "[object Generator]"
                    })), e.keys = function (t) {
                        var e = Object(t), n = [];
                        for (var r in e) n.push(r);
                        return n.reverse(), function t() {
                            for (; n.length;) {
                                var r = n.pop();
                                if (r in e) return t.value = r, t.done = !1, t
                            }
                            return t.done = !0, t
                        }
                    }, e.values = O, M.prototype = {
                        constructor: M, reset: function (t) {
                            if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(B), !t) for (var e in this) "t" === e.charAt(0) && o.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
                        }, stop: function () {
                            this.done = !0;
                            var t = this.tryEntries[0].completion;
                            if ("throw" === t.type) throw t.arg;
                            return this.rval
                        }, dispatchException: function (t) {
                            if (this.done) throw t;
                            var e = this;

                            function n(n, r) {
                                return a.type = "throw", a.arg = t, e.next = n, r && (e.method = "next", e.arg = void 0), !!r
                            }

                            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                                var i = this.tryEntries[r], a = i.completion;
                                if ("root" === i.tryLoc) return n("end");
                                if (i.tryLoc <= this.prev) {
                                    var s = o.call(i, "catchLoc"), u = o.call(i, "finallyLoc");
                                    if (s && u) {
                                        if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                                        if (this.prev < i.finallyLoc) return n(i.finallyLoc)
                                    } else if (s) {
                                        if (this.prev < i.catchLoc) return n(i.catchLoc, !0)
                                    } else {
                                        if (!u) throw new Error("try statement without catch or finally");
                                        if (this.prev < i.finallyLoc) return n(i.finallyLoc)
                                    }
                                }
                            }
                        }, abrupt: function (t, e) {
                            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                                var r = this.tryEntries[n];
                                if (r.tryLoc <= this.prev && o.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                                    var i = r;
                                    break
                                }
                            }
                            i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                            var a = i ? i.completion : {};
                            return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, p) : this.complete(a)
                        }, complete: function (t, e) {
                            if ("throw" === t.type) throw t.arg;
                            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), p
                        }, finish: function (t) {
                            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                var n = this.tryEntries[e];
                                if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), B(n), p
                            }
                        }, catch: function (t) {
                            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                                var n = this.tryEntries[e];
                                if (n.tryLoc === t) {
                                    var r = n.completion;
                                    if ("throw" === r.type) {
                                        var i = r.arg;
                                        B(n)
                                    }
                                    return i
                                }
                            }
                            throw new Error("illegal catch attempt")
                        }, delegateYield: function (t, e, n) {
                            return this.delegate = {
                                iterator: O(t),
                                resultName: e,
                                nextLoc: n
                            }, "next" === this.method && (this.arg = void 0), p
                        }
                    }, e
                }

                t.exports = i, t.exports.__esModule = !0, t.exports.default = t.exports
            }, 15: t => {
                function e(n, r) {
                    return t.exports = e = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                        return t.__proto__ = e, t
                    }, t.exports.__esModule = !0, t.exports.default = t.exports, e(n, r)
                }

                t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports
            }, 36: (t, e, n) => {
                var r = n(698).default;
                t.exports = function (t, e) {
                    if ("object" !== r(t) || null === t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var i = n.call(t, e || "default");
                        if ("object" !== r(i)) return i;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === e ? String : Number)(t)
                }, t.exports.__esModule = !0, t.exports.default = t.exports
            }, 62: (t, e, n) => {
                var r = n(698).default, i = n(36);
                t.exports = function (t) {
                    var e = i(t, "string");
                    return "symbol" === r(e) ? e : String(e)
                }, t.exports.__esModule = !0, t.exports.default = t.exports
            }, 698: t => {
                function e(n) {
                    return t.exports = e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                        return typeof t
                    } : function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    }, t.exports.__esModule = !0, t.exports.default = t.exports, e(n)
                }

                t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports
            }, 687: (t, e, n) => {
                var r = n(61)();
                t.exports = r;
                try {
                    regeneratorRuntime = r
                } catch (t) {
                    "object" == typeof globalThis ? globalThis.regeneratorRuntime = r : Function("r", "regeneratorRuntime = r")(r)
                }
            }
        }, e = {};

        function r(n) {
            var i = e[n];
            if (void 0 !== i) return i.exports;
            var o = e[n] = {id: n, loaded: !1, exports: {}};
            return t[n].call(o.exports, o, o.exports, r), o.loaded = !0, o.exports
        }

        r.n = t => {
            var e = t && t.__esModule ? () => t.default : () => t;
            return r.d(e, {a: e}), e
        }, r.d = (t, e) => {
            for (var n in e) r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, {enumerable: !0, get: e[n]})
        }, r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), r.r = t => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
        }, r.nmd = t => (t.paths = [], t.children || (t.children = []), t);
        var i = {};
        (() => {
            r.d(i, {l: () => Yo});
            var t, e = {};
            let n;
            r.r(e), r.d(e, {
                dQ: () => Kt,
                ci: () => $t,
                bytesToNumberBE: () => Rt,
                ty: () => Ut,
                eV: () => qt,
                n$: () => Ht,
                ql: () => Wt,
                hexToBytes: () => Ct,
                tL: () => zt,
                S5: () => Nt,
                FF: () => Jt
            });
            const o = new Set, a = {};

            function s(...t) {
                return (t = t.filter((t => !o.has(t)))).length ? (t.forEach((t => o.add(t))), a.register?.forEach((e => f((() => e(...t))))), function () {
                    t.forEach((t => o.delete(t))), a.unregister?.forEach((e => f((() => e(...t)))))
                }) : () => {
                }
            }

            function u() {
                return [...o]
            }

            function c(t, e) {
                return a[t]?.push(e) || (a[t] = [e]), function () {
                    a[t] = a[t]?.filter((t => e !== t))
                }
            }

            function f(t) {
                try {
                    t()
                } catch (t) {
                    console.error(t)
                }
            }

            class l extends Event {
                constructor(e) {
                    super("wallet-standard:app-ready", {
                        bubbles: !1,
                        cancelable: !1,
                        composed: !1
                    }), t.set(this, void 0), function (t, e, n, r, i) {
                        if ("function" == typeof e || !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
                        e.set(t, n)
                    }(this, t, e)
                }

                get detail() {
                    return function (t, e, n, r) {
                        if ("function" == typeof e || !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
                        return e.get(t)
                    }(this, t)
                }

                get type() {
                    return "wallet-standard:app-ready"
                }

                preventDefault() {
                    throw new Error("preventDefault cannot be called")
                }

                stopImmediatePropagation() {
                    throw new Error("stopImmediatePropagation cannot be called")
                }

                stopPropagation() {
                    throw new Error("stopPropagation cannot be called")
                }
            }

            t = new WeakMap;
            const h = "solana:signAndSendTransaction", d = "solana:signTransaction", p = "standard:connect",
                g = "standard:events";
            var y, m = r(729);

            class v extends Error {
                constructor(t, e) {
                    super(t), this.error = e
                }
            }

            class b extends v {
                constructor() {
                    super(...arguments), this.name = "WalletNotReadyError"
                }
            }

            class w extends v {
                constructor() {
                    super(...arguments), this.name = "WalletConfigError"
                }
            }

            class x extends v {
                constructor() {
                    super(...arguments), this.name = "WalletConnectionError"
                }
            }

            class k extends v {
                constructor() {
                    super(...arguments), this.name = "WalletDisconnectedError"
                }
            }

            class E extends v {
                constructor() {
                    super(...arguments), this.name = "WalletDisconnectionError"
                }
            }

            class A extends v {
                constructor() {
                    super(...arguments), this.name = "WalletAccountError"
                }
            }

            class S extends v {
                constructor() {
                    super(...arguments), this.name = "WalletPublicKeyError"
                }
            }

            class I extends v {
                constructor() {
                    super(...arguments), this.name = "WalletNotConnectedError"
                }
            }

            class B extends v {
                constructor() {
                    super(...arguments), this.name = "WalletSendTransactionError"
                }
            }

            class M extends v {
                constructor() {
                    super(...arguments), this.name = "WalletSignTransactionError"
                }
            }

            class O extends v {
                constructor() {
                    super(...arguments), this.name = "WalletSignMessageError"
                }
            }

            class _ extends v {
                constructor() {
                    super(...arguments), this.name = "WalletSignInError"
                }
            }

            !function (t) {
                t.Installed = "Installed", t.NotDetected = "NotDetected", t.Loadable = "Loadable", t.Unsupported = "Unsupported"
            }(y || (y = {}));

            class T extends m {
                get connected() {
                    return !!this.publicKey
                }

                async autoConnect() {
                    await this.connect()
                }

                async prepareTransaction(t, e, n = {}) {
                    const r = this.publicKey;
                    if (!r) throw new I;
                    return t.feePayer = t.feePayer || r, t.recentBlockhash = t.recentBlockhash || (await e.getLatestBlockhash({
                        commitment: n.preflightCommitment,
                        minContextSlot: n.minContextSlot
                    })).blockhash, t
                }
            }

            function L(t) {
                return "version" in t
            }

            const P = "solana:signMessage", $ = "solana:signIn", j = "solana:mainnet";

            function C(t) {
                switch (t) {
                    case"processed":
                    case"confirmed":
                    case"finalized":
                    case void 0:
                        return t;
                    case"recent":
                        return "processed";
                    case"single":
                    case"singleGossip":
                        return "confirmed";
                    case"max":
                    case"root":
                        return "finalized";
                    default:
                        return
                }
            }

            function R(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function U(t) {
                return U = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }, U(t)
            }

            function z(t) {
                var e = function (t, e) {
                    if ("object" !== U(t) || null === t) return t;
                    var n = t[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var r = n.call(t, "string");
                        if ("object" !== U(r)) return r;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return String(t)
                }(t);
                return "symbol" === U(e) ? e : String(e)
            }

            function N(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, z(r.key), r)
                }
            }

            function W(t, e, n) {
                return e && N(t.prototype, e), n && N(t, n), Object.defineProperty(t, "prototype", {writable: !1}), t
            }

            var q = r(764);

            function K(t) {
                if (!Number.isSafeInteger(t) || t < 0) throw new Error(`Wrong positive integer: ${t}`)
            }

            function D(t, ...e) {
                if (!(t instanceof Uint8Array)) throw new Error("Expected Uint8Array");
                if (e.length > 0 && !e.includes(t.length)) throw new Error(`Expected Uint8Array of length ${e}, not of length=${t.length}`)
            }

            const F = {
                    number: K, bool: function (t) {
                        if ("boolean" != typeof t) throw new Error(`Expected boolean, not ${t}`)
                    }, bytes: D, hash: function (t) {
                        if ("function" != typeof t || "function" != typeof t.create) throw new Error("Hash should be wrapped by utils.wrapConstructor");
                        K(t.outputLen), K(t.blockLen)
                    }, exists: function (t, e = !0) {
                        if (t.destroyed) throw new Error("Hash instance has been destroyed");
                        if (e && t.finished) throw new Error("Hash#digest() has already been called")
                    }, output: function (t, e) {
                        D(t);
                        const n = e.outputLen;
                        if (t.length < n) throw new Error(`digestInto() expects output buffer of length at least ${n}`)
                    }
                }, H = F, V = "object" == typeof globalThis && "crypto" in globalThis ? globalThis.crypto : void 0,
                J = t => t instanceof Uint8Array, Z = t => new DataView(t.buffer, t.byteOffset, t.byteLength),
                G = (t, e) => t << 32 - e | t >>> e;
            if (68 !== new Uint8Array(new Uint32Array([287454020]).buffer)[0]) throw new Error("Non little-endian hardware is not supported");

            function Y(t) {
                if ("string" != typeof t) throw new Error("utf8ToBytes expected string, got " + typeof t);
                return new Uint8Array((new TextEncoder).encode(t))
            }

            function X(t) {
                if ("string" == typeof t && (t = Y(t)), !J(t)) throw new Error("expected Uint8Array, got " + typeof t);
                return t
            }

            function Q(...t) {
                const e = new Uint8Array(t.reduce(((t, e) => t + e.length), 0));
                let n = 0;
                return t.forEach((t => {
                    if (!J(t)) throw new Error("Uint8Array expected");
                    e.set(t, n), n += t.length
                })), e
            }

            Array.from({length: 256}, ((t, e) => e.toString(16).padStart(2, "0")));

            class tt {
                clone() {
                    return this._cloneInto()
                }
            }

            function et(t) {
                const e = e => t().update(X(e)).digest(), n = t();
                return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = () => t(), e
            }

            function nt(t = 32) {
                if (V && "function" == typeof V.getRandomValues) return V.getRandomValues(new Uint8Array(t));
                throw new Error("crypto.getRandomValues must be defined")
            }

            class rt extends tt {
                constructor(t, e, n, r) {
                    super(), this.blockLen = t, this.outputLen = e, this.padOffset = n, this.isLE = r, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Z(this.buffer)
                }

                update(t) {
                    H.exists(this);
                    const {view: e, buffer: n, blockLen: r} = this, i = (t = X(t)).length;
                    for (let o = 0; o < i;) {
                        const a = Math.min(r - this.pos, i - o);
                        if (a !== r) n.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === r && (this.process(e, 0), this.pos = 0); else {
                            const e = Z(t);
                            for (; r <= i - o; o += r) this.process(e, o)
                        }
                    }
                    return this.length += t.length, this.roundClean(), this
                }

                digestInto(t) {
                    H.exists(this), H.output(t, this), this.finished = !0;
                    const {buffer: e, view: n, blockLen: r, isLE: i} = this;
                    let {pos: o} = this;
                    e[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > r - o && (this.process(n, 0), o = 0);
                    for (let t = o; t < r; t++) e[t] = 0;
                    !function (t, e, n, r) {
                        if ("function" == typeof t.setBigUint64) return t.setBigUint64(e, n, r);
                        const i = BigInt(32), o = BigInt(4294967295), a = Number(n >> i & o), s = Number(n & o),
                            u = r ? 4 : 0, c = r ? 0 : 4;
                        t.setUint32(e + u, a, r), t.setUint32(e + c, s, r)
                    }(n, r - 8, BigInt(8 * this.length), i), this.process(n, 0);
                    const a = Z(t), s = this.outputLen;
                    if (s % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
                    const u = s / 4, c = this.get();
                    if (u > c.length) throw new Error("_sha2: outputLen bigger than state");
                    for (let t = 0; t < u; t++) a.setUint32(4 * t, c[t], i)
                }

                digest() {
                    const {buffer: t, outputLen: e} = this;
                    this.digestInto(t);
                    const n = t.slice(0, e);
                    return this.destroy(), n
                }

                _cloneInto(t) {
                    t || (t = new this.constructor), t.set(...this.get());
                    const {blockLen: e, buffer: n, length: r, finished: i, destroyed: o, pos: a} = this;
                    return t.length = r, t.pos = a, t.finished = i, t.destroyed = o, r % e && t.buffer.set(n), t
                }
            }

            const it = BigInt(2 ** 32 - 1), ot = BigInt(32);

            function at(t, e = !1) {
                return e ? {h: Number(t & it), l: Number(t >> ot & it)} : {
                    h: 0 | Number(t >> ot & it),
                    l: 0 | Number(t & it)
                }
            }

            const st = function (t, e = !1) {
                    let n = new Uint32Array(t.length), r = new Uint32Array(t.length);
                    for (let i = 0; i < t.length; i++) {
                        const {h: o, l: a} = at(t[i], e);
                        [n[i], r[i]] = [o, a]
                    }
                    return [n, r]
                }, ut = (t, e, n) => t >>> n, ct = (t, e, n) => t << 32 - n | e >>> n,
                ft = (t, e, n) => t >>> n | e << 32 - n, lt = (t, e, n) => t << 32 - n | e >>> n,
                ht = (t, e, n) => t << 64 - n | e >>> n - 32, dt = (t, e, n) => t >>> n - 32 | e << 64 - n,
                pt = function (t, e, n, r) {
                    const i = (e >>> 0) + (r >>> 0);
                    return {h: t + n + (i / 2 ** 32 | 0) | 0, l: 0 | i}
                }, gt = (t, e, n) => (t >>> 0) + (e >>> 0) + (n >>> 0),
                yt = (t, e, n, r) => e + n + r + (t / 2 ** 32 | 0) | 0,
                mt = (t, e, n, r) => (t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0),
                vt = (t, e, n, r, i) => e + n + r + i + (t / 2 ** 32 | 0) | 0,
                bt = (t, e, n, r, i, o) => e + n + r + i + o + (t / 2 ** 32 | 0) | 0,
                wt = (t, e, n, r, i) => (t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0) + (i >>> 0), [xt, kt] = st(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map((t => BigInt(t)))),
                Et = new Uint32Array(80), At = new Uint32Array(80);

            class St extends rt {
                constructor() {
                    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209
                }

                get() {
                    const {
                        Ah: t,
                        Al: e,
                        Bh: n,
                        Bl: r,
                        Ch: i,
                        Cl: o,
                        Dh: a,
                        Dl: s,
                        Eh: u,
                        El: c,
                        Fh: f,
                        Fl: l,
                        Gh: h,
                        Gl: d,
                        Hh: p,
                        Hl: g
                    } = this;
                    return [t, e, n, r, i, o, a, s, u, c, f, l, h, d, p, g]
                }

                set(t, e, n, r, i, o, a, s, u, c, f, l, h, d, p, g) {
                    this.Ah = 0 | t, this.Al = 0 | e, this.Bh = 0 | n, this.Bl = 0 | r, this.Ch = 0 | i, this.Cl = 0 | o, this.Dh = 0 | a, this.Dl = 0 | s, this.Eh = 0 | u, this.El = 0 | c, this.Fh = 0 | f, this.Fl = 0 | l, this.Gh = 0 | h, this.Gl = 0 | d, this.Hh = 0 | p, this.Hl = 0 | g
                }

                process(t, e) {
                    for (let n = 0; n < 16; n++, e += 4) Et[n] = t.getUint32(e), At[n] = t.getUint32(e += 4);
                    for (let t = 16; t < 80; t++) {
                        const e = 0 | Et[t - 15], n = 0 | At[t - 15], r = ft(e, n, 1) ^ ft(e, n, 8) ^ ut(e, 0, 7),
                            i = lt(e, n, 1) ^ lt(e, n, 8) ^ ct(e, n, 7), o = 0 | Et[t - 2], a = 0 | At[t - 2],
                            s = ft(o, a, 19) ^ ht(o, a, 61) ^ ut(o, 0, 6),
                            u = lt(o, a, 19) ^ dt(o, a, 61) ^ ct(o, a, 6), c = mt(i, u, At[t - 7], At[t - 16]),
                            f = vt(c, r, s, Et[t - 7], Et[t - 16]);
                        Et[t] = 0 | f, At[t] = 0 | c
                    }
                    let {
                        Ah: n,
                        Al: r,
                        Bh: i,
                        Bl: o,
                        Ch: a,
                        Cl: s,
                        Dh: u,
                        Dl: c,
                        Eh: f,
                        El: l,
                        Fh: h,
                        Fl: d,
                        Gh: p,
                        Gl: g,
                        Hh: y,
                        Hl: m
                    } = this;
                    for (let t = 0; t < 80; t++) {
                        const e = ft(f, l, 14) ^ ft(f, l, 18) ^ ht(f, l, 41),
                            v = lt(f, l, 14) ^ lt(f, l, 18) ^ dt(f, l, 41), b = f & h ^ ~f & p,
                            w = wt(m, v, l & d ^ ~l & g, kt[t], At[t]), x = bt(w, y, e, b, xt[t], Et[t]), k = 0 | w,
                            E = ft(n, r, 28) ^ ht(n, r, 34) ^ ht(n, r, 39),
                            A = lt(n, r, 28) ^ dt(n, r, 34) ^ dt(n, r, 39), S = n & i ^ n & a ^ i & a,
                            I = r & o ^ r & s ^ o & s;
                        y = 0 | p, m = 0 | g, p = 0 | h, g = 0 | d, h = 0 | f, d = 0 | l, ({
                            h: f,
                            l
                        } = pt(0 | u, 0 | c, 0 | x, 0 | k)), u = 0 | a, c = 0 | s, a = 0 | i, s = 0 | o, i = 0 | n, o = 0 | r;
                        const B = gt(k, A, I);
                        n = yt(B, x, E, S), r = 0 | B
                    }
                    ({h: n, l: r} = pt(0 | this.Ah, 0 | this.Al, 0 | n, 0 | r)), ({
                        h: i,
                        l: o
                    } = pt(0 | this.Bh, 0 | this.Bl, 0 | i, 0 | o)), ({
                        h: a,
                        l: s
                    } = pt(0 | this.Ch, 0 | this.Cl, 0 | a, 0 | s)), ({
                        h: u,
                        l: c
                    } = pt(0 | this.Dh, 0 | this.Dl, 0 | u, 0 | c)), ({
                        h: f,
                        l
                    } = pt(0 | this.Eh, 0 | this.El, 0 | f, 0 | l)), ({
                        h,
                        l: d
                    } = pt(0 | this.Fh, 0 | this.Fl, 0 | h, 0 | d)), ({
                        h: p,
                        l: g
                    } = pt(0 | this.Gh, 0 | this.Gl, 0 | p, 0 | g)), ({
                        h: y,
                        l: m
                    } = pt(0 | this.Hh, 0 | this.Hl, 0 | y, 0 | m)), this.set(n, r, i, o, a, s, u, c, f, l, h, d, p, g, y, m)
                }

                roundClean() {
                    Et.fill(0), At.fill(0)
                }

                destroy() {
                    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
                }
            }

            class It extends St {
                constructor() {
                    super(), this.Ah = -1942145080, this.Al = 424955298, this.Bh = 1944164710, this.Bl = -1982016298, this.Ch = 502970286, this.Cl = 855612546, this.Dh = 1738396948, this.Dl = 1479516111, this.Eh = 258812777, this.El = 2077511080, this.Fh = 2011393907, this.Fl = 79989058, this.Gh = 1067287976, this.Gl = 1780299464, this.Hh = 286451373, this.Hl = -1848208735, this.outputLen = 28
                }
            }

            class Bt extends St {
                constructor() {
                    super(), this.Ah = 573645204, this.Al = -64227540, this.Bh = -1621794909, this.Bl = -934517566, this.Ch = 596883563, this.Cl = 1867755857, this.Dh = -1774684391, this.Dl = 1497426621, this.Eh = -1775747358, this.El = -1467023389, this.Fh = -1101128155, this.Fl = 1401305490, this.Gh = 721525244, this.Gl = 746961066, this.Hh = 246885852, this.Hl = -2117784414, this.outputLen = 32
                }
            }

            class Mt extends St {
                constructor() {
                    super(), this.Ah = -876896931, this.Al = -1056596264, this.Bh = 1654270250, this.Bl = 914150663, this.Ch = -1856437926, this.Cl = 812702999, this.Dh = 355462360, this.Dl = -150054599, this.Eh = 1731405415, this.El = -4191439, this.Fh = -1900787065, this.Fl = 1750603025, this.Gh = -619958771, this.Gl = 1694076839, this.Hh = 1203062813, this.Hl = -1090891868, this.outputLen = 48
                }
            }

            const Ot = et((() => new St)),
                _t = (et((() => new It)), et((() => new Bt)), et((() => new Mt)), BigInt(0), BigInt(1)), Tt = BigInt(2),
                Lt = t => t instanceof Uint8Array,
                Pt = Array.from({length: 256}, ((t, e) => e.toString(16).padStart(2, "0")));

            function $t(t) {
                if (!Lt(t)) throw new Error("Uint8Array expected");
                let e = "";
                for (let n = 0; n < t.length; n++) e += Pt[t[n]];
                return e
            }

            function jt(t) {
                if ("string" != typeof t) throw new Error("hex string expected, got " + typeof t);
                return BigInt("" === t ? "0" : `0x${t}`)
            }

            function Ct(t) {
                if ("string" != typeof t) throw new Error("hex string expected, got " + typeof t);
                const e = t.length;
                if (e % 2) throw new Error("padded hex string expected, got unpadded hex of length " + e);
                const n = new Uint8Array(e / 2);
                for (let e = 0; e < n.length; e++) {
                    const r = 2 * e, i = t.slice(r, r + 2), o = Number.parseInt(i, 16);
                    if (Number.isNaN(o) || o < 0) throw new Error("Invalid byte sequence");
                    n[e] = o
                }
                return n
            }

            function Rt(t) {
                return jt($t(t))
            }

            function Ut(t) {
                if (!Lt(t)) throw new Error("Uint8Array expected");
                return jt($t(Uint8Array.from(t).reverse()))
            }

            function zt(t, e) {
                return Ct(t.toString(16).padStart(2 * e, "0"))
            }

            function Nt(t, e) {
                return zt(t, e).reverse()
            }

            function Wt(t, e, n) {
                let r;
                if ("string" == typeof e) try {
                    r = Ct(e)
                } catch (n) {
                    throw new Error(`${t} must be valid hex string, got "${e}". Cause: ${n}`)
                } else {
                    if (!Lt(e)) throw new Error(`${t} must be hex string or Uint8Array`);
                    r = Uint8Array.from(e)
                }
                const i = r.length;
                if ("number" == typeof n && i !== n) throw new Error(`${t} expected ${n} bytes, got ${i}`);
                return r
            }

            function qt(...t) {
                const e = new Uint8Array(t.reduce(((t, e) => t + e.length), 0));
                let n = 0;
                return t.forEach((t => {
                    if (!Lt(t)) throw new Error("Uint8Array expected");
                    e.set(t, n), n += t.length
                })), e
            }

            const Kt = t => (Tt << BigInt(t - 1)) - _t, Dt = t => new Uint8Array(t), Ft = t => Uint8Array.from(t);

            function Ht(t, e, n) {
                if ("number" != typeof t || t < 2) throw new Error("hashLen must be a number");
                if ("number" != typeof e || e < 2) throw new Error("qByteLen must be a number");
                if ("function" != typeof n) throw new Error("hmacFn must be a function");
                let r = Dt(t), i = Dt(t), o = 0;
                const a = () => {
                    r.fill(1), i.fill(0), o = 0
                }, s = (...t) => n(i, r, ...t), u = (t = Dt()) => {
                    i = s(Ft([0]), t), r = s(), 0 !== t.length && (i = s(Ft([1]), t), r = s())
                }, c = () => {
                    if (o++ >= 1e3) throw new Error("drbg: tried 1000 values");
                    let t = 0;
                    const n = [];
                    for (; t < e;) {
                        r = s();
                        const e = r.slice();
                        n.push(e), t += r.length
                    }
                    return qt(...n)
                };
                return (t, e) => {
                    let n;
                    for (a(), u(t); !(n = e(c()));) u();
                    return a(), n
                }
            }

            const Vt = {
                bigint: t => "bigint" == typeof t,
                function: t => "function" == typeof t,
                boolean: t => "boolean" == typeof t,
                string: t => "string" == typeof t,
                isSafeInteger: t => Number.isSafeInteger(t),
                array: t => Array.isArray(t),
                field: (t, e) => e.Fp.isValid(t),
                hash: t => "function" == typeof t && Number.isSafeInteger(t.outputLen)
            };

            function Jt(t, e, n = {}) {
                const r = (e, n, r) => {
                    const i = Vt[n];
                    if ("function" != typeof i) throw new Error(`Invalid validator "${n}", expected function`);
                    const o = t[e];
                    if (!(r && void 0 === o || i(o, t))) throw new Error(`Invalid param ${String(e)}=${o} (${typeof o}), expected ${n}`)
                };
                for (const [t, n] of Object.entries(e)) r(t, n, !1);
                for (const [t, e] of Object.entries(n)) r(t, e, !0);
                return t
            }

            const Zt = BigInt(0), Gt = BigInt(1), Yt = BigInt(2), Xt = BigInt(3), Qt = BigInt(4), te = BigInt(5),
                ee = BigInt(8);

            function ne(t, e) {
                const n = t % e;
                return n >= Zt ? n : e + n
            }

            function re(t, e, n) {
                if (n <= Zt || e < Zt) throw new Error("Expected power/modulo > 0");
                if (n === Gt) return Zt;
                let r = Gt;
                for (; e > Zt;) e & Gt && (r = r * t % n), t = t * t % n, e >>= Gt;
                return r
            }

            function ie(t, e, n) {
                let r = t;
                for (; e-- > Zt;) r *= r, r %= n;
                return r
            }

            function oe(t, e) {
                if (t === Zt || e <= Zt) throw new Error(`invert: expected positive integers, got n=${t} mod=${e}`);
                let n = ne(t, e), r = e, i = Zt, o = Gt, a = Gt, s = Zt;
                for (; n !== Zt;) {
                    const t = r / n, e = r % n, u = i - a * t, c = o - s * t;
                    r = n, n = e, i = a, o = s, a = u, s = c
                }
                if (r !== Gt) throw new Error("invert: does not exist");
                return ne(i, e)
            }

            BigInt(9), BigInt(16);
            const ae = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];

            function se(t, e) {
                const n = void 0 !== e ? e : t.toString(2).length;
                return {nBitLength: n, nByteLength: Math.ceil(n / 8)}
            }

            function ue(t, e, n = !1, r = {}) {
                if (t <= Zt) throw new Error(`Expected Fp ORDER > 0, got ${t}`);
                const {nBitLength: i, nByteLength: o} = se(t, e);
                if (o > 2048) throw new Error("Field lengths over 2048 bytes are not supported");
                const a = function (t) {
                    if (t % Qt === Xt) {
                        const e = (t + Gt) / Qt;
                        return function (t, n) {
                            const r = t.pow(n, e);
                            if (!t.eql(t.sqr(r), n)) throw new Error("Cannot find square root");
                            return r
                        }
                    }
                    if (t % ee === te) {
                        const e = (t - te) / ee;
                        return function (t, n) {
                            const r = t.mul(n, Yt), i = t.pow(r, e), o = t.mul(n, i), a = t.mul(t.mul(o, Yt), i),
                                s = t.mul(o, t.sub(a, t.ONE));
                            if (!t.eql(t.sqr(s), n)) throw new Error("Cannot find square root");
                            return s
                        }
                    }
                    return function (t) {
                        const e = (t - Gt) / Yt;
                        let n, r, i;
                        for (n = t - Gt, r = 0; n % Yt === Zt; n /= Yt, r++) ;
                        for (i = Yt; i < t && re(i, e, t) !== t - Gt; i++) ;
                        if (1 === r) {
                            const e = (t + Gt) / Qt;
                            return function (t, n) {
                                const r = t.pow(n, e);
                                if (!t.eql(t.sqr(r), n)) throw new Error("Cannot find square root");
                                return r
                            }
                        }
                        const o = (n + Gt) / Yt;
                        return function (t, a) {
                            if (t.pow(a, e) === t.neg(t.ONE)) throw new Error("Cannot find square root");
                            let s = r, u = t.pow(t.mul(t.ONE, i), n), c = t.pow(a, o), f = t.pow(a, n);
                            for (; !t.eql(f, t.ONE);) {
                                if (t.eql(f, t.ZERO)) return t.ZERO;
                                let e = 1;
                                for (let n = t.sqr(f); e < s && !t.eql(n, t.ONE); e++) n = t.sqr(n);
                                const n = t.pow(u, Gt << BigInt(s - e - 1));
                                u = t.sqr(n), c = t.mul(c, n), f = t.mul(f, u), s = e
                            }
                            return c
                        }
                    }(t)
                }(t), s = Object.freeze({
                    ORDER: t,
                    BITS: i,
                    BYTES: o,
                    MASK: Kt(i),
                    ZERO: Zt,
                    ONE: Gt,
                    create: e => ne(e, t),
                    isValid: e => {
                        if ("bigint" != typeof e) throw new Error("Invalid field element: expected bigint, got " + typeof e);
                        return Zt <= e && e < t
                    },
                    is0: t => t === Zt,
                    isOdd: t => (t & Gt) === Gt,
                    neg: e => ne(-e, t),
                    eql: (t, e) => t === e,
                    sqr: e => ne(e * e, t),
                    add: (e, n) => ne(e + n, t),
                    sub: (e, n) => ne(e - n, t),
                    mul: (e, n) => ne(e * n, t),
                    pow: (t, e) => function (t, e, n) {
                        if (n < Zt) throw new Error("Expected power > 0");
                        if (n === Zt) return t.ONE;
                        if (n === Gt) return e;
                        let r = t.ONE, i = e;
                        for (; n > Zt;) n & Gt && (r = t.mul(r, i)), i = t.sqr(i), n >>= Gt;
                        return r
                    }(s, t, e),
                    div: (e, n) => ne(e * oe(n, t), t),
                    sqrN: t => t * t,
                    addN: (t, e) => t + e,
                    subN: (t, e) => t - e,
                    mulN: (t, e) => t * e,
                    inv: e => oe(e, t),
                    sqrt: r.sqrt || (t => a(s, t)),
                    invertBatch: t => function (t, e) {
                        const n = new Array(e.length),
                            r = e.reduce(((e, r, i) => t.is0(r) ? e : (n[i] = e, t.mul(e, r))), t.ONE), i = t.inv(r);
                        return e.reduceRight(((e, r, i) => t.is0(r) ? e : (n[i] = t.mul(e, n[i]), t.mul(e, r))), i), n
                    }(s, t),
                    cmov: (t, e, n) => n ? e : t,
                    toBytes: t => n ? Nt(t, o) : zt(t, o),
                    fromBytes: t => {
                        if (t.length !== o) throw new Error(`Fp.fromBytes: expected ${o}, got ${t.length}`);
                        return n ? Ut(t) : Rt(t)
                    }
                });
                return Object.freeze(s)
            }

            const ce = BigInt(0), fe = BigInt(1);

            function le(t, e) {
                const n = (t, e) => {
                    const n = e.negate();
                    return t ? n : e
                }, r = t => ({windows: Math.ceil(e / t) + 1, windowSize: 2 ** (t - 1)});
                return {
                    constTimeNegate: n, unsafeLadder(e, n) {
                        let r = t.ZERO, i = e;
                        for (; n > ce;) n & fe && (r = r.add(i)), i = i.double(), n >>= fe;
                        return r
                    }, precomputeWindow(t, e) {
                        const {windows: n, windowSize: i} = r(e), o = [];
                        let a = t, s = a;
                        for (let t = 0; t < n; t++) {
                            s = a, o.push(s);
                            for (let t = 1; t < i; t++) s = s.add(a), o.push(s);
                            a = s.double()
                        }
                        return o
                    }, wNAF(e, i, o) {
                        const {windows: a, windowSize: s} = r(e);
                        let u = t.ZERO, c = t.BASE;
                        const f = BigInt(2 ** e - 1), l = 2 ** e, h = BigInt(e);
                        for (let t = 0; t < a; t++) {
                            const e = t * s;
                            let r = Number(o & f);
                            o >>= h, r > s && (r -= l, o += fe);
                            const a = e, d = e + Math.abs(r) - 1, p = t % 2 != 0, g = r < 0;
                            0 === r ? c = c.add(n(p, i[a])) : u = u.add(n(g, i[d]))
                        }
                        return {p: u, f: c}
                    }, wNAFCached(t, e, n, r) {
                        const i = t._WINDOW_SIZE || 1;
                        let o = e.get(t);
                        return o || (o = this.precomputeWindow(t, i), 1 !== i && e.set(t, r(o))), this.wNAF(i, o, n)
                    }
                }
            }

            function he(t) {
                return Jt(t.Fp, ae.reduce(((t, e) => (t[e] = "function", t)), {
                    ORDER: "bigint",
                    MASK: "bigint",
                    BYTES: "isSafeInteger",
                    BITS: "isSafeInteger"
                })), Jt(t, {n: "bigint", h: "bigint", Gx: "field", Gy: "field"}, {
                    nBitLength: "isSafeInteger",
                    nByteLength: "isSafeInteger"
                }), Object.freeze({...se(t.n, t.nBitLength), ...t, p: t.Fp.ORDER})
            }

            const de = BigInt(0), pe = BigInt(1), ge = BigInt(2), ye = BigInt(8), me = {zip215: !0};

            function ve(t) {
                const e = function (t) {
                        const e = he(t);
                        return Jt(t, {
                            hash: "function",
                            a: "bigint",
                            d: "bigint",
                            randomBytes: "function"
                        }, {
                            adjustScalarBytes: "function",
                            domain: "function",
                            uvRatio: "function",
                            mapToCurve: "function"
                        }), Object.freeze({...e})
                    }(t), {Fp: n, n: r, prehash: i, hash: o, randomBytes: a, nByteLength: s, h: u} = e,
                    c = ge << BigInt(8 * s) - pe, f = n.create, l = e.uvRatio || ((t, e) => {
                        try {
                            return {isValid: !0, value: n.sqrt(t * n.inv(e))}
                        } catch (t) {
                            return {isValid: !1, value: de}
                        }
                    }), h = e.adjustScalarBytes || (t => t), d = e.domain || ((t, e, n) => {
                        if (e.length || n) throw new Error("Contexts/pre-hash are not supported");
                        return t
                    }), p = t => "bigint" == typeof t && de < t, g = (t, e) => p(t) && p(e) && t < e,
                    y = t => t === de || g(t, c);

                function m(t, e) {
                    if (g(t, e)) return t;
                    throw new Error(`Expected valid scalar < ${e}, got ${typeof t} ${t}`)
                }

                function v(t) {
                    return t === de ? t : m(t, r)
                }

                const b = new Map;

                function w(t) {
                    if (!(t instanceof x)) throw new Error("ExtendedPoint expected")
                }

                class x {
                    constructor(t, e, n, r) {
                        if (this.ex = t, this.ey = e, this.ez = n, this.et = r, !y(t)) throw new Error("x required");
                        if (!y(e)) throw new Error("y required");
                        if (!y(n)) throw new Error("z required");
                        if (!y(r)) throw new Error("t required")
                    }

                    get x() {
                        return this.toAffine().x
                    }

                    get y() {
                        return this.toAffine().y
                    }

                    static fromAffine(t) {
                        if (t instanceof x) throw new Error("extended point not allowed");
                        const {x: e, y: n} = t || {};
                        if (!y(e) || !y(n)) throw new Error("invalid affine point");
                        return new x(e, n, pe, f(e * n))
                    }

                    static normalizeZ(t) {
                        const e = n.invertBatch(t.map((t => t.ez)));
                        return t.map(((t, n) => t.toAffine(e[n]))).map(x.fromAffine)
                    }

                    _setWindowSize(t) {
                        this._WINDOW_SIZE = t, b.delete(this)
                    }

                    assertValidity() {
                        const {a: t, d: n} = e;
                        if (this.is0()) throw new Error("bad point: ZERO");
                        const {ex: r, ey: i, ez: o, et: a} = this, s = f(r * r), u = f(i * i), c = f(o * o),
                            l = f(c * c), h = f(s * t);
                        if (f(c * f(h + u)) !== f(l + f(n * f(s * u)))) throw new Error("bad point: equation left != right (1)");
                        if (f(r * i) !== f(o * a)) throw new Error("bad point: equation left != right (2)")
                    }

                    equals(t) {
                        w(t);
                        const {ex: e, ey: n, ez: r} = this, {ex: i, ey: o, ez: a} = t, s = f(e * a), u = f(i * r),
                            c = f(n * a), l = f(o * r);
                        return s === u && c === l
                    }

                    is0() {
                        return this.equals(x.ZERO)
                    }

                    negate() {
                        return new x(f(-this.ex), this.ey, this.ez, f(-this.et))
                    }

                    double() {
                        const {a: t} = e, {ex: n, ey: r, ez: i} = this, o = f(n * n), a = f(r * r),
                            s = f(ge * f(i * i)), u = f(t * o), c = n + r, l = f(f(c * c) - o - a), h = u + a,
                            d = h - s, p = u - a, g = f(l * d), y = f(h * p), m = f(l * p), v = f(d * h);
                        return new x(g, y, v, m)
                    }

                    add(t) {
                        w(t);
                        const {a: n, d: r} = e, {ex: i, ey: o, ez: a, et: s} = this, {ex: u, ey: c, ez: l, et: h} = t;
                        if (n === BigInt(-1)) {
                            const t = f((o - i) * (c + u)), e = f((o + i) * (c - u)), n = f(e - t);
                            if (n === de) return this.double();
                            const r = f(a * ge * h), d = f(s * ge * l), p = d + r, g = e + t, y = d - r, m = f(p * n),
                                v = f(g * y), b = f(p * y), w = f(n * g);
                            return new x(m, v, w, b)
                        }
                        const d = f(i * u), p = f(o * c), g = f(s * r * h), y = f(a * l),
                            m = f((i + o) * (u + c) - d - p), v = y - g, b = y + g, k = f(p - n * d), E = f(m * v),
                            A = f(b * k), S = f(m * k), I = f(v * b);
                        return new x(E, A, I, S)
                    }

                    subtract(t) {
                        return this.add(t.negate())
                    }

                    wNAF(t) {
                        return A.wNAFCached(this, b, t, x.normalizeZ)
                    }

                    multiply(t) {
                        const {p: e, f: n} = this.wNAF(m(t, r));
                        return x.normalizeZ([e, n])[0]
                    }

                    multiplyUnsafe(t) {
                        let e = v(t);
                        return e === de ? E : this.equals(E) || e === pe ? this : this.equals(k) ? this.wNAF(e).p : A.unsafeLadder(this, e)
                    }

                    isSmallOrder() {
                        return this.multiplyUnsafe(u).is0()
                    }

                    isTorsionFree() {
                        return A.unsafeLadder(this, r).is0()
                    }

                    toAffine(t) {
                        const {ex: e, ey: r, ez: i} = this, o = this.is0();
                        null == t && (t = o ? ye : n.inv(i));
                        const a = f(e * t), s = f(r * t), u = f(i * t);
                        if (o) return {x: de, y: pe};
                        if (u !== pe) throw new Error("invZ was invalid");
                        return {x: a, y: s}
                    }

                    clearCofactor() {
                        const {h: t} = e;
                        return t === pe ? this : this.multiplyUnsafe(t)
                    }

                    static fromHex(t, r = !1) {
                        const {d: i, a: o} = e, a = n.BYTES, s = (t = Wt("pointHex", t, a)).slice(), u = t[a - 1];
                        s[a - 1] = -129 & u;
                        const h = Ut(s);
                        h === de || m(h, r ? c : n.ORDER);
                        const d = f(h * h), p = f(d - pe), g = f(i * d - o);
                        let {isValid: y, value: v} = l(p, g);
                        if (!y) throw new Error("Point.fromHex: invalid y coordinate");
                        const b = (v & pe) === pe, w = !!(128 & u);
                        if (!r && v === de && w) throw new Error("Point.fromHex: x=0 and x_0=1");
                        return w !== b && (v = f(-v)), x.fromAffine({x: v, y: h})
                    }

                    static fromPrivateKey(t) {
                        return B(t).point
                    }

                    toRawBytes() {
                        const {x: t, y: e} = this.toAffine(), r = Nt(e, n.BYTES);
                        return r[r.length - 1] |= t & pe ? 128 : 0, r
                    }

                    toHex() {
                        return $t(this.toRawBytes())
                    }
                }

                x.BASE = new x(e.Gx, e.Gy, pe, f(e.Gx * e.Gy)), x.ZERO = new x(de, pe, pe, de);
                const {BASE: k, ZERO: E} = x, A = le(x, 8 * s);

                function S(t) {
                    return ne(t, r)
                }

                function I(t) {
                    return S(Ut(t))
                }

                function B(t) {
                    const e = s;
                    t = Wt("private key", t, e);
                    const n = Wt("hashed private key", o(t), 2 * e), r = h(n.slice(0, e)), i = n.slice(e, 2 * e),
                        a = I(r), u = k.multiply(a), c = u.toRawBytes();
                    return {head: r, prefix: i, scalar: a, point: u, pointBytes: c}
                }

                function M(t = new Uint8Array, ...e) {
                    const n = qt(...e);
                    return I(o(d(n, Wt("context", t), !!i)))
                }

                const O = me;
                return k._setWindowSize(8), {
                    CURVE: e,
                    getPublicKey: function (t) {
                        return B(t).pointBytes
                    },
                    sign: function (t, e, r = {}) {
                        t = Wt("message", t), i && (t = i(t));
                        const {prefix: o, scalar: a, pointBytes: u} = B(e), c = M(r.context, o, t),
                            f = k.multiply(c).toRawBytes(), l = S(c + M(r.context, f, u, t) * a);
                        return v(l), Wt("result", qt(f, Nt(l, n.BYTES)), 2 * s)
                    },
                    verify: function (t, e, r, o = O) {
                        const {context: a, zip215: s} = o, u = n.BYTES;
                        t = Wt("signature", t, 2 * u), e = Wt("message", e), i && (e = i(e));
                        const c = Ut(t.slice(u, 2 * u));
                        let f, l, h;
                        try {
                            f = x.fromHex(r, s), l = x.fromHex(t.slice(0, u), s), h = k.multiplyUnsafe(c)
                        } catch (t) {
                            return !1
                        }
                        if (!s && f.isSmallOrder()) return !1;
                        const d = M(a, l.toRawBytes(), f.toRawBytes(), e);
                        return l.add(f.multiplyUnsafe(d)).subtract(h).clearCofactor().equals(x.ZERO)
                    },
                    ExtendedPoint: x,
                    utils: {
                        getExtendedPublicKey: B,
                        randomPrivateKey: () => a(n.BYTES),
                        precompute: (t = 8, e = x.BASE) => (e._setWindowSize(t), e.multiply(BigInt(3)), e)
                    }
                }
            }

            BigInt(0), BigInt(1);
            const be = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"),
                we = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752"),
                xe = (BigInt(0), BigInt(1)), ke = BigInt(2), Ee = BigInt(5), Ae = BigInt(10), Se = BigInt(20),
                Ie = BigInt(40), Be = BigInt(80), Me = ue(be, void 0, !0), Oe = {
                    a: BigInt(-1),
                    d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
                    Fp: Me,
                    n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
                    h: BigInt(8),
                    Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
                    Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
                    hash: Ot,
                    randomBytes: nt,
                    adjustScalarBytes: function (t) {
                        return t[0] &= 248, t[31] &= 127, t[31] |= 64, t
                    },
                    uvRatio: function (t, e) {
                        const n = be, r = ne(e * e * e, n), i = ne(r * r * e, n);
                        let o = ne(t * r * function (t) {
                            const e = be, n = t * t % e * t % e, r = ie(n, ke, e) * n % e, i = ie(r, xe, e) * t % e,
                                o = ie(i, Ee, e) * i % e, a = ie(o, Ae, e) * o % e, s = ie(a, Se, e) * a % e,
                                u = ie(s, Ie, e) * s % e, c = ie(u, Be, e) * u % e, f = ie(c, Be, e) * u % e,
                                l = ie(f, Ae, e) * o % e;
                            return {pow_p_5_8: ie(l, ke, e) * t % e, b2: n}
                        }(t * i).pow_p_5_8, n);
                        const a = ne(e * o * o, n), s = o, u = ne(o * we, n), c = a === t, f = a === ne(-t, n),
                            l = a === ne(-t * we, n);
                        return c && (o = s), (f || l) && (o = u), (ne(o, n) & Gt) === Gt && (o = ne(-o, n)), {
                            isValid: c || f,
                            value: o
                        }
                    }
                }, _e = ve(Oe);

            function Te(t, e, n) {
                if (e.length > 255) throw new Error("Context is too big");
                return Q(Y("SigEd25519 no Ed25519 collisions"), new Uint8Array([n ? 1 : 0, e.length]), e, t)
            }

            ve({...Oe, domain: Te}), ve({...Oe, domain: Te, prehash: Ot});
            const Le = (Me.ORDER + BigInt(3)) / BigInt(8);

            function Pe(t, e, n, r, i, o, a) {
                try {
                    var s = t[o](a), u = s.value
                } catch (t) {
                    return void n(t)
                }
                s.done ? e(u) : Promise.resolve(u).then(r, i)
            }

            function $e(t) {
                return function () {
                    var e = this, n = arguments;
                    return new Promise((function (r, i) {
                        var o = t.apply(e, n);

                        function a(t) {
                            Pe(o, r, i, a, s, "next", t)
                        }

                        function s(t) {
                            Pe(o, r, i, a, s, "throw", t)
                        }

                        a(void 0)
                    }))
                }
            }

            function je(t, e) {
                return je = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
                    return t.__proto__ = e, t
                }, je(t, e)
            }

            function Ce(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(t, "prototype", {writable: !1}), e && je(t, e)
            }

            function Re(t, e) {
                if (e && ("object" === U(e) || "function" == typeof e)) return e;
                if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                return function (t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t
                }(t)
            }

            function Ue(t) {
                return Ue = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                }, Ue(t)
            }

            Me.pow(ke, Le), Me.sqrt(Me.neg(Me.ONE)), Me.ORDER, BigInt(5), BigInt(8), BigInt(486662), function (t, e) {
                if (!t.isOdd) throw new Error("Field doesn't have isOdd");
                const n = t.sqrt(e);
                t.isOdd(n) && t.neg(n)
            }(Me, Me.neg(BigInt(486664))), BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235"), BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578"), BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838"), BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952"), BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
            var ze = r(687), Ne = r.n(ze), We = r(550), qe = r.n(We), Ke = r(191), De = r.n(Ke);
            const Fe = (t, e, n) => t & e ^ t & n ^ e & n,
                He = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
                Ve = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
                Je = new Uint32Array(64);

            class Ze extends rt {
                constructor() {
                    super(64, 32, 8, !1), this.A = 0 | Ve[0], this.B = 0 | Ve[1], this.C = 0 | Ve[2], this.D = 0 | Ve[3], this.E = 0 | Ve[4], this.F = 0 | Ve[5], this.G = 0 | Ve[6], this.H = 0 | Ve[7]
                }

                get() {
                    const {A: t, B: e, C: n, D: r, E: i, F: o, G: a, H: s} = this;
                    return [t, e, n, r, i, o, a, s]
                }

                set(t, e, n, r, i, o, a, s) {
                    this.A = 0 | t, this.B = 0 | e, this.C = 0 | n, this.D = 0 | r, this.E = 0 | i, this.F = 0 | o, this.G = 0 | a, this.H = 0 | s
                }

                process(t, e) {
                    for (let n = 0; n < 16; n++, e += 4) Je[n] = t.getUint32(e, !1);
                    for (let t = 16; t < 64; t++) {
                        const e = Je[t - 15], n = Je[t - 2], r = G(e, 7) ^ G(e, 18) ^ e >>> 3,
                            i = G(n, 17) ^ G(n, 19) ^ n >>> 10;
                        Je[t] = i + Je[t - 7] + r + Je[t - 16] | 0
                    }
                    let {A: n, B: r, C: i, D: o, E: a, F: s, G: u, H: c} = this;
                    for (let t = 0; t < 64; t++) {
                        const e = c + (G(a, 6) ^ G(a, 11) ^ G(a, 25)) + ((f = a) & s ^ ~f & u) + He[t] + Je[t] | 0,
                            l = (G(n, 2) ^ G(n, 13) ^ G(n, 22)) + Fe(n, r, i) | 0;
                        c = u, u = s, s = a, a = o + e | 0, o = i, i = r, r = n, n = e + l | 0
                    }
                    var f;
                    n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, s = s + this.F | 0, u = u + this.G | 0, c = c + this.H | 0, this.set(n, r, i, o, a, s, u, c)
                }

                roundClean() {
                    Je.fill(0)
                }

                destroy() {
                    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0)
                }
            }

            class Ge extends Ze {
                constructor() {
                    super(), this.A = -1056596264, this.B = 914150663, this.C = 812702999, this.D = -150054599, this.E = -4191439, this.F = 1750603025, this.G = 1694076839, this.H = -1090891868, this.outputLen = 28
                }
            }

            const Ye = et((() => new Ze));
            et((() => new Ge));
            var Xe = r(532), Qe = r(386);

            function tn(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
                return r
            }

            function en(t, e) {
                if (t) {
                    if ("string" == typeof t) return tn(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? tn(t, e) : void 0
                }
            }

            function nn(t, e) {
                return function (t) {
                    if (Array.isArray(t)) return t
                }(t) || function (t, e) {
                    var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                    if (null != n) {
                        var r, i, o, a, s = [], u = !0, c = !1;
                        try {
                            if (o = (n = n.call(t)).next, 0 === e) {
                                if (Object(n) !== n) return;
                                u = !1
                            } else for (; !(u = (r = o.call(n)).done) && (s.push(r.value), s.length !== e); u = !0) ;
                        } catch (t) {
                            c = !0, i = t
                        } finally {
                            try {
                                if (!u && null != n.return && (a = n.return(), Object(a) !== a)) return
                            } finally {
                                if (c) throw i
                            }
                        }
                        return s
                    }
                }(t, e) || en(t, e) || function () {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            var rn = r(475);

            function on(t, e, n) {
                return (e = z(e)) in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function an(t) {
                return function (t) {
                    if (Array.isArray(t)) return tn(t)
                }(t) || function (t) {
                    if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
                }(t) || en(t) || function () {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }

            class sn extends TypeError {
                constructor(t, e) {
                    let n;
                    const {message: r, ...i} = t, {path: o} = t;
                    super(0 === o.length ? r : "At path: " + o.join(".") + " -- " + r), Object.assign(this, i), this.name = this.constructor.name, this.failures = () => {
                        var r;
                        return null != (r = n) ? r : n = [t, ...e()]
                    }
                }
            }

            function un(t) {
                return "object" == typeof t && null != t
            }

            function cn(t) {
                return "string" == typeof t ? JSON.stringify(t) : "" + t
            }

            function fn(t, e, n, r) {
                if (!0 === t) return;
                !1 === t ? t = {} : "string" == typeof t && (t = {message: t});
                const {path: i, branch: o} = e, {type: a} = n, {
                    refinement: s,
                    message: u = "Expected a value of type `" + a + "`" + (s ? " with refinement `" + s + "`" : "") + ", but received: `" + cn(r) + "`"
                } = t;
                return {value: r, type: a, refinement: s, key: i[i.length - 1], path: i, branch: o, ...t, message: u}
            }

            function* ln(t, e, n, r) {
                var i;
                un(i = t) && "function" == typeof i[Symbol.iterator] || (t = [t]);
                for (const i of t) {
                    const t = fn(i, e, n, r);
                    t && (yield t)
                }
            }

            function* hn(t, e, n = {}) {
                const {path: r = [], branch: i = [t], coerce: o = !1, mask: a = !1} = n, s = {path: r, branch: i};
                if (o && (t = e.coercer(t, s), a && "type" !== e.type && un(e.schema) && un(t) && !Array.isArray(t))) for (const n in t) void 0 === e.schema[n] && delete t[n];
                let u = !0;
                for (const n of e.validator(t, s)) u = !1, yield[n, void 0];
                for (let [n, c, f] of e.entries(t, s)) {
                    const e = hn(c, f, {
                        path: void 0 === n ? r : [...r, n],
                        branch: void 0 === n ? i : [...i, c],
                        coerce: o,
                        mask: a
                    });
                    for (const r of e) r[0] ? (u = !1, yield[r[0], void 0]) : o && (c = r[1], void 0 === n ? t = c : t instanceof Map ? t.set(n, c) : t instanceof Set ? t.add(c) : un(t) && (t[n] = c))
                }
                if (u) for (const n of e.refiner(t, s)) u = !1, yield[n, void 0];
                u && (yield[void 0, t])
            }

            class dn {
                constructor(t) {
                    const {
                        type: e,
                        schema: n,
                        validator: r,
                        refiner: i,
                        coercer: o = (t => t),
                        entries: a = function* () {
                        }
                    } = t;
                    this.type = e, this.schema = n, this.entries = a, this.coercer = o, this.validator = r ? (t, e) => ln(r(t, e), e, this, t) : () => [], this.refiner = i ? (t, e) => ln(i(t, e), e, this, t) : () => []
                }

                assert(t) {
                    return function (t, e) {
                        const n = yn(t, e);
                        if (n[0]) throw n[0]
                    }(t, this)
                }

                create(t) {
                    return pn(t, this)
                }

                is(t) {
                    return gn(t, this)
                }

                mask(t) {
                    return function (t, e) {
                        const n = yn(t, e, {coerce: !0, mask: !0});
                        if (n[0]) throw n[0];
                        return n[1]
                    }(t, this)
                }

                validate(t, e = {}) {
                    return yn(t, this, e)
                }
            }

            function pn(t, e) {
                const n = yn(t, e, {coerce: !0});
                if (n[0]) throw n[0];
                return n[1]
            }

            function gn(t, e) {
                return !yn(t, e)[0]
            }

            function yn(t, e, n = {}) {
                const r = hn(t, e, n), i = function (t) {
                    const {done: e, value: n} = t.next();
                    return e ? void 0 : n
                }(r);
                return i[0] ? [new sn(i[0], (function* () {
                    for (const t of r) t[0] && (yield t[0])
                })), void 0] : [void 0, i[1]]
            }

            function mn(t, e) {
                return new dn({type: t, schema: null, validator: e})
            }

            function vn(t) {
                return new dn({
                    type: "array",
                    schema: t,
                    * entries(e) {
                        if (t && Array.isArray(e)) for (const [n, r] of e.entries()) yield[n, r, t]
                    },
                    coercer: t => Array.isArray(t) ? t.slice() : t,
                    validator: t => Array.isArray(t) || "Expected an array value, but received: " + cn(t)
                })
            }

            function bn() {
                return mn("boolean", (t => "boolean" == typeof t))
            }

            function wn(t) {
                return mn("instance", (e => e instanceof t || "Expected a `" + t.name + "` instance, but received: " + cn(e)))
            }

            function xn(t) {
                const e = cn(t), n = typeof t;
                return new dn({
                    type: "literal",
                    schema: "string" === n || "number" === n || "boolean" === n ? t : null,
                    validator: n => n === t || "Expected the literal `" + e + "`, but received: " + cn(n)
                })
            }

            function kn(t) {
                return new dn({
                    ...t,
                    validator: (e, n) => null === e || t.validator(e, n),
                    refiner: (e, n) => null === e || t.refiner(e, n)
                })
            }

            function En() {
                return mn("number", (t => "number" == typeof t && !isNaN(t) || "Expected a number, but received: " + cn(t)))
            }

            function An(t) {
                return new dn({
                    ...t,
                    validator: (e, n) => void 0 === e || t.validator(e, n),
                    refiner: (e, n) => void 0 === e || t.refiner(e, n)
                })
            }

            function Sn(t, e) {
                return new dn({
                    type: "record", schema: null, * entries(n) {
                        if (un(n)) for (const r in n) {
                            const i = n[r];
                            yield[r, r, t], yield[r, i, e]
                        }
                    }, validator: t => un(t) || "Expected an object, but received: " + cn(t)
                })
            }

            function In() {
                return mn("string", (t => "string" == typeof t || "Expected a string, but received: " + cn(t)))
            }

            function Bn(t) {
                const e = mn("never", (() => !1));
                return new dn({
                    type: "tuple", schema: null, * entries(n) {
                        if (Array.isArray(n)) {
                            const r = Math.max(t.length, n.length);
                            for (let i = 0; i < r; i++) yield[i, n[i], t[i] || e]
                        }
                    }, validator: t => Array.isArray(t) || "Expected an array, but received: " + cn(t)
                })
            }

            function Mn(t) {
                const e = Object.keys(t);
                return new dn({
                    type: "type", schema: t, * entries(n) {
                        if (un(n)) for (const r of e) yield[r, n[r], t[r]]
                    }, validator: t => un(t) || "Expected an object, but received: " + cn(t)
                })
            }

            function On(t) {
                const e = t.map((t => t.type)).join(" | ");
                return new dn({
                    type: "union", schema: null, validator(n, r) {
                        const i = [];
                        for (const e of t) {
                            const [...t] = hn(n, e, r), [o] = t;
                            if (!o[0]) return [];
                            for (const [e] of t) e && i.push(e)
                        }
                        return ["Expected the value to satisfy a union of `" + e + "`, but received: " + cn(n), ...i]
                    }
                })
            }

            function _n() {
                return mn("unknown", (() => !0))
            }

            function Tn(t, e, n) {
                return new dn({...t, coercer: (r, i) => gn(r, e) ? t.coercer(n(r, i), i) : t.coercer(r, i)})
            }

            function Ln(t, e, n) {
                return Ln = function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
                        }))), !0
                    } catch (t) {
                        return !1
                    }
                }() ? Reflect.construct.bind() : function (t, e, n) {
                    var r = [null];
                    r.push.apply(r, e);
                    var i = new (Function.bind.apply(t, r));
                    return n && je(i, n.prototype), i
                }, Ln.apply(null, arguments)
            }

            function Pn(t) {
                var e = "function" == typeof Map ? new Map : void 0;
                return Pn = function (t) {
                    if (null === t || (n = t, -1 === Function.toString.call(n).indexOf("[native code]"))) return t;
                    var n;
                    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
                    if (void 0 !== e) {
                        if (e.has(t)) return e.get(t);
                        e.set(t, r)
                    }

                    function r() {
                        return Ln(t, arguments, Ue(this).constructor)
                    }

                    return r.prototype = Object.create(t.prototype, {
                        constructor: {
                            value: r,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), je(r, t)
                }, Pn(t)
            }

            r(198), r(855), r(598);
            const [$n, jn, Cn] = [[], [], []], Rn = BigInt(0), Un = BigInt(1), zn = BigInt(2), Nn = BigInt(7),
                Wn = BigInt(256), qn = BigInt(113);
            for (let t = 0, e = Un, n = 1, r = 0; t < 24; t++) {
                [n, r] = [r, (2 * n + 3 * r) % 5], $n.push(2 * (5 * r + n)), jn.push((t + 1) * (t + 2) / 2 % 64);
                let i = Rn;
                for (let t = 0; t < 7; t++) e = (e << Un ^ (e >> Nn) * qn) % Wn, e & zn && (i ^= Un << (Un << BigInt(t)) - Un);
                Cn.push(i)
            }
            const [Kn, Dn] = st(Cn, !0),
                Fn = (t, e, n) => n > 32 ? ((t, e, n) => e << n - 32 | t >>> 64 - n)(t, e, n) : ((t, e, n) => t << n | e >>> 32 - n)(t, e, n),
                Hn = (t, e, n) => n > 32 ? ((t, e, n) => t << n - 32 | e >>> 64 - n)(t, e, n) : ((t, e, n) => e << n | t >>> 32 - n)(t, e, n);

            class Vn extends tt {
                constructor(t, e, n, r = !1, i = 24) {
                    if (super(), this.blockLen = t, this.suffix = e, this.outputLen = n, this.enableXOF = r, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, H.number(n), 0 >= this.blockLen || this.blockLen >= 200) throw new Error("Sha3 supports only keccak-f1600 function");
                    var o;
                    this.state = new Uint8Array(200), this.state32 = (o = this.state, new Uint32Array(o.buffer, o.byteOffset, Math.floor(o.byteLength / 4)))
                }

                keccak() {
                    !function (t, e = 24) {
                        const n = new Uint32Array(10);
                        for (let r = 24 - e; r < 24; r++) {
                            for (let e = 0; e < 10; e++) n[e] = t[e] ^ t[e + 10] ^ t[e + 20] ^ t[e + 30] ^ t[e + 40];
                            for (let e = 0; e < 10; e += 2) {
                                const r = (e + 8) % 10, i = (e + 2) % 10, o = n[i], a = n[i + 1],
                                    s = Fn(o, a, 1) ^ n[r], u = Hn(o, a, 1) ^ n[r + 1];
                                for (let n = 0; n < 50; n += 10) t[e + n] ^= s, t[e + n + 1] ^= u
                            }
                            let e = t[2], i = t[3];
                            for (let n = 0; n < 24; n++) {
                                const r = jn[n], o = Fn(e, i, r), a = Hn(e, i, r), s = $n[n];
                                e = t[s], i = t[s + 1], t[s] = o, t[s + 1] = a
                            }
                            for (let e = 0; e < 50; e += 10) {
                                for (let r = 0; r < 10; r++) n[r] = t[e + r];
                                for (let r = 0; r < 10; r++) t[e + r] ^= ~n[(r + 2) % 10] & n[(r + 4) % 10]
                            }
                            t[0] ^= Kn[r], t[1] ^= Dn[r]
                        }
                        n.fill(0)
                    }(this.state32, this.rounds), this.posOut = 0, this.pos = 0
                }

                update(t) {
                    H.exists(this);
                    const {blockLen: e, state: n} = this, r = (t = X(t)).length;
                    for (let i = 0; i < r;) {
                        const o = Math.min(e - this.pos, r - i);
                        for (let e = 0; e < o; e++) n[this.pos++] ^= t[i++];
                        this.pos === e && this.keccak()
                    }
                    return this
                }

                finish() {
                    if (this.finished) return;
                    this.finished = !0;
                    const {state: t, suffix: e, pos: n, blockLen: r} = this;
                    t[n] ^= e, !!(128 & e) && n === r - 1 && this.keccak(), t[r - 1] ^= 128, this.keccak()
                }

                writeInto(t) {
                    H.exists(this, !1), H.bytes(t), this.finish();
                    const e = this.state, {blockLen: n} = this;
                    for (let r = 0, i = t.length; r < i;) {
                        this.posOut >= n && this.keccak();
                        const o = Math.min(n - this.posOut, i - r);
                        t.set(e.subarray(this.posOut, this.posOut + o), r), this.posOut += o, r += o
                    }
                    return t
                }

                xofInto(t) {
                    if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
                    return this.writeInto(t)
                }

                xof(t) {
                    return H.number(t), this.xofInto(new Uint8Array(t))
                }

                digestInto(t) {
                    if (H.output(t, this), this.finished) throw new Error("digest() was already called");
                    return this.writeInto(t), this.destroy(), t
                }

                digest() {
                    return this.digestInto(new Uint8Array(this.outputLen))
                }

                destroy() {
                    this.destroyed = !0, this.state.fill(0)
                }

                _cloneInto(t) {
                    const {blockLen: e, suffix: n, outputLen: r, rounds: i, enableXOF: o} = this;
                    return t || (t = new Vn(e, n, r, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = n, t.outputLen = r, t.enableXOF = o, t.destroyed = this.destroyed, t
                }
            }

            const Jn = (t, e, n) => et((() => new Vn(e, t, n))),
                Zn = (Jn(6, 144, 28), Jn(6, 136, 32), Jn(6, 104, 48), Jn(6, 72, 64), Jn(1, 144, 28), Jn(1, 136, 32)),
                Gn = (Jn(1, 104, 48), Jn(1, 72, 64), (t, e, n) => function (t) {
                    const e = (e, n) => t(n).update(X(e)).digest(), n = t({});
                    return e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = e => t(e), e
                }(((r = {}) => new Vn(e, t, void 0 === r.dkLen ? n : r.dkLen, !0))));
            Gn(31, 168, 16), Gn(31, 136, 32);
            const {bytesToNumberBE: Yn, hexToBytes: Xn} = e, Qn = {
                Err: class extends Error {
                    constructor(t = "") {
                        super(t)
                    }
                }, _parseInt(t) {
                    const {Err: e} = Qn;
                    if (t.length < 2 || 2 !== t[0]) throw new e("Invalid signature integer tag");
                    const n = t[1], r = t.subarray(2, n + 2);
                    if (!n || r.length !== n) throw new e("Invalid signature integer: wrong length");
                    if (128 & r[0]) throw new e("Invalid signature integer: negative");
                    if (0 === r[0] && !(128 & r[1])) throw new e("Invalid signature integer: unnecessary leading zero");
                    return {d: Yn(r), l: t.subarray(n + 2)}
                }, toSig(t) {
                    const {Err: e} = Qn, n = "string" == typeof t ? Xn(t) : t;
                    if (!(n instanceof Uint8Array)) throw new Error("ui8a expected");
                    let r = n.length;
                    if (r < 2 || 48 != n[0]) throw new e("Invalid signature tag");
                    if (n[1] !== r - 2) throw new e("Invalid signature: incorrect length");
                    const {d: i, l: o} = Qn._parseInt(n.subarray(2)), {d: a, l: s} = Qn._parseInt(o);
                    if (s.length) throw new e("Invalid signature: left bytes after parsing");
                    return {r: i, s: a}
                }, hexFromSig(t) {
                    const e = t => 8 & Number.parseInt(t[0], 16) ? "00" + t : t, n = t => {
                        const e = t.toString(16);
                        return 1 & e.length ? `0${e}` : e
                    }, r = e(n(t.s)), i = e(n(t.r)), o = r.length / 2, a = i.length / 2, s = n(o), u = n(a);
                    return `30${n(a + o + 4)}02${u}${i}02${s}${r}`
                }
            }, tr = BigInt(0), er = BigInt(1), nr = (BigInt(2), BigInt(3));
            BigInt(4);

            class rr extends tt {
                constructor(t, e) {
                    super(), this.finished = !1, this.destroyed = !1, H.hash(t);
                    const n = X(e);
                    if (this.iHash = t.create(), "function" != typeof this.iHash.update) throw new Error("Expected instance of class which extends utils.Hash");
                    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
                    const r = this.blockLen, i = new Uint8Array(r);
                    i.set(n.length > r ? t.create().update(n).digest() : n);
                    for (let t = 0; t < i.length; t++) i[t] ^= 54;
                    this.iHash.update(i), this.oHash = t.create();
                    for (let t = 0; t < i.length; t++) i[t] ^= 106;
                    this.oHash.update(i), i.fill(0)
                }

                update(t) {
                    return H.exists(this), this.iHash.update(t), this
                }

                digestInto(t) {
                    H.exists(this), H.bytes(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy()
                }

                digest() {
                    const t = new Uint8Array(this.oHash.outputLen);
                    return this.digestInto(t), t
                }

                _cloneInto(t) {
                    t || (t = Object.create(Object.getPrototypeOf(this), {}));
                    const {oHash: e, iHash: n, finished: r, destroyed: i, blockLen: o, outputLen: a} = this;
                    return t.finished = r, t.destroyed = i, t.blockLen = o, t.outputLen = a, t.oHash = e._cloneInto(t.oHash), t.iHash = n._cloneInto(t.iHash), t
                }

                destroy() {
                    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy()
                }
            }

            const ir = (t, e, n) => new rr(t, e).update(n).digest();

            function or(t) {
                return {hash: t, hmac: (e, ...n) => ir(t, e, Q(...n)), randomBytes: nt}
            }

            ir.create = (t, e) => new rr(t, e);
            const ar = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
                sr = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), ur = BigInt(1),
                cr = BigInt(2), fr = (t, e) => (t + e / cr) / e, lr = ue(ar, void 0, void 0, {
                    sqrt: function (t) {
                        const e = ar, n = BigInt(3), r = BigInt(6), i = BigInt(11), o = BigInt(22), a = BigInt(23),
                            s = BigInt(44), u = BigInt(88), c = t * t * t % e, f = c * c * t % e, l = ie(f, n, e) * f % e,
                            h = ie(l, n, e) * f % e, d = ie(h, cr, e) * c % e, p = ie(d, i, e) * d % e,
                            g = ie(p, o, e) * p % e, y = ie(g, s, e) * g % e, m = ie(y, u, e) * y % e,
                            v = ie(m, s, e) * g % e, b = ie(v, n, e) * f % e, w = ie(b, a, e) * p % e,
                            x = ie(w, r, e) * c % e, k = ie(x, cr, e);
                        if (!lr.eql(lr.sqr(k), t)) throw new Error("Cannot find square root");
                        return k
                    }
                }), hr = function (t, e) {
                    const n = e => function (t) {
                        const e = function (t) {
                            const e = he(t);
                            return Jt(e, {hash: "hash", hmac: "function", randomBytes: "function"}, {
                                bits2int: "function",
                                bits2int_modN: "function",
                                lowS: "boolean"
                            }), Object.freeze({lowS: !0, ...e})
                        }(t), {Fp: n, n: r} = e, i = n.BYTES + 1, o = 2 * n.BYTES + 1;

                        function a(t) {
                            return ne(t, r)
                        }

                        function s(t) {
                            return oe(t, r)
                        }

                        const {
                            ProjectivePoint: u,
                            normPrivateKeyToScalar: c,
                            weierstrassEquation: f,
                            isWithinCurveOrder: l
                        } = function (t) {
                            const e = function (t) {
                                const e = he(t);
                                Jt(e, {a: "field", b: "field"}, {
                                    allowedPrivateKeyLengths: "array",
                                    wrapPrivateKey: "boolean",
                                    isTorsionFree: "function",
                                    clearCofactor: "function",
                                    allowInfinityPoint: "boolean",
                                    fromBytes: "function",
                                    toBytes: "function"
                                });
                                const {endo: n, Fp: r, a: i} = e;
                                if (n) {
                                    if (!r.eql(i, r.ZERO)) throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
                                    if ("object" != typeof n || "bigint" != typeof n.beta || "function" != typeof n.splitScalar) throw new Error("Expected endomorphism with beta: bigint and splitScalar: function")
                                }
                                return Object.freeze({...e})
                            }(t), {Fp: n} = e, r = e.toBytes || ((t, e, r) => {
                                const i = e.toAffine();
                                return qt(Uint8Array.from([4]), n.toBytes(i.x), n.toBytes(i.y))
                            }), i = e.fromBytes || (t => {
                                const e = t.subarray(1);
                                return {
                                    x: n.fromBytes(e.subarray(0, n.BYTES)),
                                    y: n.fromBytes(e.subarray(n.BYTES, 2 * n.BYTES))
                                }
                            });

                            function o(t) {
                                const {a: r, b: i} = e, o = n.sqr(t), a = n.mul(o, t);
                                return n.add(n.add(a, n.mul(t, r)), i)
                            }

                            if (!n.eql(n.sqr(e.Gy), o(e.Gx))) throw new Error("bad generator point: equation left != right");

                            function a(t) {
                                return "bigint" == typeof t && tr < t && t < e.n
                            }

                            function s(t) {
                                if (!a(t)) throw new Error("Expected valid bigint: 0 < bigint < curve.n")
                            }

                            function u(t) {
                                const {allowedPrivateKeyLengths: n, nByteLength: r, wrapPrivateKey: i, n: o} = e;
                                if (n && "bigint" != typeof t) {
                                    if (t instanceof Uint8Array && (t = $t(t)), "string" != typeof t || !n.includes(t.length)) throw new Error("Invalid key");
                                    t = t.padStart(2 * r, "0")
                                }
                                let a;
                                try {
                                    a = "bigint" == typeof t ? t : Rt(Wt("private key", t, r))
                                } catch (e) {
                                    throw new Error(`private key must be ${r} bytes, hex or bigint, not ${typeof t}`)
                                }
                                return i && (a = ne(a, o)), s(a), a
                            }

                            const c = new Map;

                            function f(t) {
                                if (!(t instanceof l)) throw new Error("ProjectivePoint expected")
                            }

                            class l {
                                constructor(t, e, r) {
                                    if (this.px = t, this.py = e, this.pz = r, null == t || !n.isValid(t)) throw new Error("x required");
                                    if (null == e || !n.isValid(e)) throw new Error("y required");
                                    if (null == r || !n.isValid(r)) throw new Error("z required")
                                }

                                static fromAffine(t) {
                                    const {x: e, y: r} = t || {};
                                    if (!t || !n.isValid(e) || !n.isValid(r)) throw new Error("invalid affine point");
                                    if (t instanceof l) throw new Error("projective point not allowed");
                                    const i = t => n.eql(t, n.ZERO);
                                    return i(e) && i(r) ? l.ZERO : new l(e, r, n.ONE)
                                }

                                get x() {
                                    return this.toAffine().x
                                }

                                get y() {
                                    return this.toAffine().y
                                }

                                static normalizeZ(t) {
                                    const e = n.invertBatch(t.map((t => t.pz)));
                                    return t.map(((t, n) => t.toAffine(e[n]))).map(l.fromAffine)
                                }

                                static fromHex(t) {
                                    const e = l.fromAffine(i(Wt("pointHex", t)));
                                    return e.assertValidity(), e
                                }

                                static fromPrivateKey(t) {
                                    return l.BASE.multiply(u(t))
                                }

                                _setWindowSize(t) {
                                    this._WINDOW_SIZE = t, c.delete(this)
                                }

                                assertValidity() {
                                    if (this.is0()) {
                                        if (e.allowInfinityPoint) return;
                                        throw new Error("bad point: ZERO")
                                    }
                                    const {x: t, y: r} = this.toAffine();
                                    if (!n.isValid(t) || !n.isValid(r)) throw new Error("bad point: x or y not FE");
                                    const i = n.sqr(r), a = o(t);
                                    if (!n.eql(i, a)) throw new Error("bad point: equation left != right");
                                    if (!this.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup")
                                }

                                hasEvenY() {
                                    const {y: t} = this.toAffine();
                                    if (n.isOdd) return !n.isOdd(t);
                                    throw new Error("Field doesn't support isOdd")
                                }

                                equals(t) {
                                    f(t);
                                    const {px: e, py: r, pz: i} = this, {px: o, py: a, pz: s} = t,
                                        u = n.eql(n.mul(e, s), n.mul(o, i)), c = n.eql(n.mul(r, s), n.mul(a, i));
                                    return u && c
                                }

                                negate() {
                                    return new l(this.px, n.neg(this.py), this.pz)
                                }

                                double() {
                                    const {a: t, b: r} = e, i = n.mul(r, nr), {px: o, py: a, pz: s} = this;
                                    let u = n.ZERO, c = n.ZERO, f = n.ZERO, h = n.mul(o, o), d = n.mul(a, a),
                                        p = n.mul(s, s), g = n.mul(o, a);
                                    return g = n.add(g, g), f = n.mul(o, s), f = n.add(f, f), u = n.mul(t, f), c = n.mul(i, p), c = n.add(u, c), u = n.sub(d, c), c = n.add(d, c), c = n.mul(u, c), u = n.mul(g, u), f = n.mul(i, f), p = n.mul(t, p), g = n.sub(h, p), g = n.mul(t, g), g = n.add(g, f), f = n.add(h, h), h = n.add(f, h), h = n.add(h, p), h = n.mul(h, g), c = n.add(c, h), p = n.mul(a, s), p = n.add(p, p), h = n.mul(p, g), u = n.sub(u, h), f = n.mul(p, d), f = n.add(f, f), f = n.add(f, f), new l(u, c, f)
                                }

                                add(t) {
                                    f(t);
                                    const {px: r, py: i, pz: o} = this, {px: a, py: s, pz: u} = t;
                                    let c = n.ZERO, h = n.ZERO, d = n.ZERO;
                                    const p = e.a, g = n.mul(e.b, nr);
                                    let y = n.mul(r, a), m = n.mul(i, s), v = n.mul(o, u), b = n.add(r, i), w = n.add(a, s);
                                    b = n.mul(b, w), w = n.add(y, m), b = n.sub(b, w), w = n.add(r, o);
                                    let x = n.add(a, u);
                                    return w = n.mul(w, x), x = n.add(y, v), w = n.sub(w, x), x = n.add(i, o), c = n.add(s, u), x = n.mul(x, c), c = n.add(m, v), x = n.sub(x, c), d = n.mul(p, w), c = n.mul(g, v), d = n.add(c, d), c = n.sub(m, d), d = n.add(m, d), h = n.mul(c, d), m = n.add(y, y), m = n.add(m, y), v = n.mul(p, v), w = n.mul(g, w), m = n.add(m, v), v = n.sub(y, v), v = n.mul(p, v), w = n.add(w, v), y = n.mul(m, w), h = n.add(h, y), y = n.mul(x, w), c = n.mul(b, c), c = n.sub(c, y), y = n.mul(b, m), d = n.mul(x, d), d = n.add(d, y), new l(c, h, d)
                                }

                                subtract(t) {
                                    return this.add(t.negate())
                                }

                                is0() {
                                    return this.equals(l.ZERO)
                                }

                                wNAF(t) {
                                    return d.wNAFCached(this, c, t, (t => {
                                        const e = n.invertBatch(t.map((t => t.pz)));
                                        return t.map(((t, n) => t.toAffine(e[n]))).map(l.fromAffine)
                                    }))
                                }

                                multiplyUnsafe(t) {
                                    const r = l.ZERO;
                                    if (t === tr) return r;
                                    if (s(t), t === er) return this;
                                    const {endo: i} = e;
                                    if (!i) return d.unsafeLadder(this, t);
                                    let {k1neg: o, k1: a, k2neg: u, k2: c} = i.splitScalar(t), f = r, h = r, p = this;
                                    for (; a > tr || c > tr;) a & er && (f = f.add(p)), c & er && (h = h.add(p)), p = p.double(), a >>= er, c >>= er;
                                    return o && (f = f.negate()), u && (h = h.negate()), h = new l(n.mul(h.px, i.beta), h.py, h.pz), f.add(h)
                                }

                                multiply(t) {
                                    s(t);
                                    let r, i, o = t;
                                    const {endo: a} = e;
                                    if (a) {
                                        const {k1neg: t, k1: e, k2neg: s, k2: u} = a.splitScalar(o);
                                        let {p: c, f} = this.wNAF(e), {p: h, f: p} = this.wNAF(u);
                                        c = d.constTimeNegate(t, c), h = d.constTimeNegate(s, h), h = new l(n.mul(h.px, a.beta), h.py, h.pz), r = c.add(h), i = f.add(p)
                                    } else {
                                        const {p: t, f: e} = this.wNAF(o);
                                        r = t, i = e
                                    }
                                    return l.normalizeZ([r, i])[0]
                                }

                                multiplyAndAddUnsafe(t, e, n) {
                                    const r = l.BASE,
                                        i = (t, e) => e !== tr && e !== er && t.equals(r) ? t.multiply(e) : t.multiplyUnsafe(e),
                                        o = i(this, e).add(i(t, n));
                                    return o.is0() ? void 0 : o
                                }

                                toAffine(t) {
                                    const {px: e, py: r, pz: i} = this, o = this.is0();
                                    null == t && (t = o ? n.ONE : n.inv(i));
                                    const a = n.mul(e, t), s = n.mul(r, t), u = n.mul(i, t);
                                    if (o) return {x: n.ZERO, y: n.ZERO};
                                    if (!n.eql(u, n.ONE)) throw new Error("invZ was invalid");
                                    return {x: a, y: s}
                                }

                                isTorsionFree() {
                                    const {h: t, isTorsionFree: n} = e;
                                    if (t === er) return !0;
                                    if (n) return n(l, this);
                                    throw new Error("isTorsionFree() has not been declared for the elliptic curve")
                                }

                                clearCofactor() {
                                    const {h: t, clearCofactor: n} = e;
                                    return t === er ? this : n ? n(l, this) : this.multiplyUnsafe(e.h)
                                }

                                toRawBytes(t = !0) {
                                    return this.assertValidity(), r(l, this, t)
                                }

                                toHex(t = !0) {
                                    return $t(this.toRawBytes(t))
                                }
                            }

                            l.BASE = new l(e.Gx, e.Gy, n.ONE), l.ZERO = new l(n.ZERO, n.ONE, n.ZERO);
                            const h = e.nBitLength, d = le(l, e.endo ? Math.ceil(h / 2) : h);
                            return {
                                CURVE: e,
                                ProjectivePoint: l,
                                normPrivateKeyToScalar: u,
                                weierstrassEquation: o,
                                isWithinCurveOrder: a
                            }
                        }({
                            ...e, toBytes(t, e, r) {
                                const i = e.toAffine(), o = n.toBytes(i.x), a = qt;
                                return r ? a(Uint8Array.from([e.hasEvenY() ? 2 : 3]), o) : a(Uint8Array.from([4]), o, n.toBytes(i.y))
                            }, fromBytes(t) {
                                const e = t.length, r = t[0], a = t.subarray(1);
                                if (e !== i || 2 !== r && 3 !== r) {
                                    if (e === o && 4 === r) return {
                                        x: n.fromBytes(a.subarray(0, n.BYTES)),
                                        y: n.fromBytes(a.subarray(n.BYTES, 2 * n.BYTES))
                                    };
                                    throw new Error(`Point of length ${e} was invalid. Expected ${i} compressed bytes or ${o} uncompressed bytes`)
                                }
                                {
                                    const t = Rt(a);
                                    if (!(tr < (s = t) && s < n.ORDER)) throw new Error("Point is not on curve");
                                    const e = f(t);
                                    let i = n.sqrt(e);
                                    return !(1 & ~r) != ((i & er) === er) && (i = n.neg(i)), {x: t, y: i}
                                }
                                var s
                            }
                        }), h = t => $t(zt(t, e.nByteLength));

                        function d(t) {
                            return t > r >> er
                        }

                        const p = (t, e, n) => Rt(t.slice(e, n));

                        class g {
                            constructor(t, e, n) {
                                this.r = t, this.s = e, this.recovery = n, this.assertValidity()
                            }

                            static fromCompact(t) {
                                const n = e.nByteLength;
                                return t = Wt("compactSignature", t, 2 * n), new g(p(t, 0, n), p(t, n, 2 * n))
                            }

                            static fromDER(t) {
                                const {r: e, s: n} = Qn.toSig(Wt("DER", t));
                                return new g(e, n)
                            }

                            assertValidity() {
                                if (!l(this.r)) throw new Error("r must be 0 < r < CURVE.n");
                                if (!l(this.s)) throw new Error("s must be 0 < s < CURVE.n")
                            }

                            addRecoveryBit(t) {
                                return new g(this.r, this.s, t)
                            }

                            recoverPublicKey(t) {
                                const {r, s: i, recovery: o} = this, c = b(Wt("msgHash", t));
                                if (null == o || ![0, 1, 2, 3].includes(o)) throw new Error("recovery id invalid");
                                const f = 2 === o || 3 === o ? r + e.n : r;
                                if (f >= n.ORDER) throw new Error("recovery id 2 or 3 invalid");
                                const l = 1 & o ? "03" : "02", d = u.fromHex(l + h(f)), p = s(f), g = a(-c * p),
                                    y = a(i * p), m = u.BASE.multiplyAndAddUnsafe(d, g, y);
                                if (!m) throw new Error("point at infinify");
                                return m.assertValidity(), m
                            }

                            hasHighS() {
                                return d(this.s)
                            }

                            normalizeS() {
                                return this.hasHighS() ? new g(this.r, a(-this.s), this.recovery) : this
                            }

                            toDERRawBytes() {
                                return Ct(this.toDERHex())
                            }

                            toDERHex() {
                                return Qn.hexFromSig({r: this.r, s: this.s})
                            }

                            toCompactRawBytes() {
                                return Ct(this.toCompactHex())
                            }

                            toCompactHex() {
                                return h(this.r) + h(this.s)
                            }
                        }

                        const y = {
                            isValidPrivateKey(t) {
                                try {
                                    return c(t), !0
                                } catch (t) {
                                    return !1
                                }
                            },
                            normPrivateKeyToScalar: c,
                            randomPrivateKey: () => zt(function (t, e, n = !1) {
                                const r = (t = Wt("privateHash", t)).length, i = se(e).nByteLength + 8;
                                if (i < 24 || r < i || r > 1024) throw new Error(`hashToPrivateScalar: expected ${i}-1024 bytes of input, got ${r}`);
                                return ne(n ? Ut(t) : Rt(t), e - Gt) + Gt
                            }(e.randomBytes(n.BYTES + 8), r), e.nByteLength),
                            precompute: (t = 8, e = u.BASE) => (e._setWindowSize(t), e.multiply(BigInt(3)), e)
                        };

                        function m(t) {
                            const e = t instanceof Uint8Array, n = "string" == typeof t, r = (e || n) && t.length;
                            return e ? r === i || r === o : n ? r === 2 * i || r === 2 * o : t instanceof u
                        }

                        const v = e.bits2int || function (t) {
                            const n = Rt(t), r = 8 * t.length - e.nBitLength;
                            return r > 0 ? n >> BigInt(r) : n
                        }, b = e.bits2int_modN || function (t) {
                            return a(v(t))
                        }, w = Kt(e.nBitLength);

                        function x(t) {
                            if ("bigint" != typeof t) throw new Error("bigint expected");
                            if (!(tr <= t && t < w)) throw new Error(`bigint expected < 2^${e.nBitLength}`);
                            return zt(t, e.nByteLength)
                        }

                        const k = {lowS: e.lowS, prehash: !1}, E = {lowS: e.lowS, prehash: !1};
                        return u.BASE._setWindowSize(8), {
                            CURVE: e, getPublicKey: function (t, e = !0) {
                                return u.fromPrivateKey(t).toRawBytes(e)
                            }, getSharedSecret: function (t, e, n = !0) {
                                if (m(t)) throw new Error("first arg must be private key");
                                if (!m(e)) throw new Error("second arg must be public key");
                                return u.fromHex(e).multiply(c(t)).toRawBytes(n)
                            }, sign: function (t, r, i = k) {
                                const {seed: o, k2sig: f} = function (t, r, i = k) {
                                    if (["recovered", "canonical"].some((t => t in i))) throw new Error("sign() legacy options not supported");
                                    const {hash: o, randomBytes: f} = e;
                                    let {lowS: h, prehash: p, extraEntropy: y} = i;
                                    null == h && (h = !0), t = Wt("msgHash", t), p && (t = Wt("prehashed msgHash", o(t)));
                                    const m = b(t), w = c(r), E = [x(w), x(m)];
                                    if (null != y) {
                                        const t = !0 === y ? f(n.BYTES) : y;
                                        E.push(Wt("extraEntropy", t, n.BYTES))
                                    }
                                    const A = qt(...E), S = m;
                                    return {
                                        seed: A, k2sig: function (t) {
                                            const e = v(t);
                                            if (!l(e)) return;
                                            const n = s(e), r = u.BASE.multiply(e).toAffine(), i = a(r.x);
                                            if (i === tr) return;
                                            const o = a(n * a(S + i * w));
                                            if (o === tr) return;
                                            let c = (r.x === i ? 0 : 2) | Number(r.y & er), f = o;
                                            return h && d(o) && (f = function (t) {
                                                return d(t) ? a(-t) : t
                                            }(o), c ^= 1), new g(i, f, c)
                                        }
                                    }
                                }(t, r, i), h = e;
                                return Ht(h.hash.outputLen, h.nByteLength, h.hmac)(o, f)
                            }, verify: function (t, n, r, i = E) {
                                const o = t;
                                if (n = Wt("msgHash", n), r = Wt("publicKey", r), "strict" in i) throw new Error("options.strict was renamed to lowS");
                                const {lowS: c, prehash: f} = i;
                                let l, h;
                                try {
                                    if ("string" == typeof o || o instanceof Uint8Array) try {
                                        l = g.fromDER(o)
                                    } catch (t) {
                                        if (!(t instanceof Qn.Err)) throw t;
                                        l = g.fromCompact(o)
                                    } else {
                                        if ("object" != typeof o || "bigint" != typeof o.r || "bigint" != typeof o.s) throw new Error("PARSE");
                                        {
                                            const {r: t, s: e} = o;
                                            l = new g(t, e)
                                        }
                                    }
                                    h = u.fromHex(r)
                                } catch (t) {
                                    if ("PARSE" === t.message) throw new Error("signature must be Signature instance, Uint8Array or hex string");
                                    return !1
                                }
                                if (c && l.hasHighS()) return !1;
                                f && (n = e.hash(n));
                                const {r: d, s: p} = l, y = b(n), m = s(p), v = a(y * m), w = a(d * m),
                                    x = u.BASE.multiplyAndAddUnsafe(h, v, w)?.toAffine();
                                return !!x && a(x.x) === d
                            }, ProjectivePoint: u, Signature: g, utils: y
                        }
                    }({...t, ...or(e)});
                    return Object.freeze({...n(e), create: n})
                }({
                    a: BigInt(0),
                    b: BigInt(7),
                    Fp: lr,
                    n: sr,
                    Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
                    Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
                    h: BigInt(1),
                    lowS: !0,
                    endo: {
                        beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
                        splitScalar: t => {
                            const e = sr, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
                                r = -ur * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
                                i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), o = n,
                                a = BigInt("0x100000000000000000000000000000000"), s = fr(o * t, e), u = fr(-r * t, e);
                            let c = ne(t - s * n - u * i, e), f = ne(-s * r - u * o, e);
                            const l = c > a, h = f > a;
                            if (l && (c = e - c), h && (f = e - f), c > a || f > a) throw new Error("splitScalar: Endomorphism failed, k=" + t);
                            return {k1neg: l, k1: c, k2neg: h, k2: f}
                        }
                    }
                }, Ye);
            BigInt(0), hr.ProjectivePoint, _e.utils.randomPrivateKey;
            var dr = function () {
                var t = _e.utils.randomPrivateKey(), e = pr(t), n = new Uint8Array(64);
                return n.set(t), n.set(e, 32), {publicKey: e, secretKey: n}
            }, pr = _e.getPublicKey;

            function gr(t) {
                try {
                    return _e.ExtendedPoint.fromHex(t), !0
                } catch (t) {
                    return !1
                }
            }

            var yr, mr = function (t, e) {
                return _e.sign(t, e.slice(0, 32))
            }, vr = _e.verify, br = function (t) {
                return q.Buffer.isBuffer(t) ? t : t instanceof Uint8Array ? q.Buffer.from(t.buffer, t.byteOffset, t.byteLength) : q.Buffer.from(t)
            }, wr = function () {
                function t(e) {
                    R(this, t), Object.assign(this, e)
                }

                return W(t, [{
                    key: "encode", value: function () {
                        return q.Buffer.from((0, Xe.serialize)(xr, this))
                    }
                }], [{
                    key: "decode", value: function (t) {
                        return (0, Xe.deserialize)(xr, this, t)
                    }
                }, {
                    key: "decodeUnchecked", value: function (t) {
                        return (0, Xe.deserializeUnchecked)(xr, this, t)
                    }
                }]), t
            }(), xr = new Map, kr = 32, Er = 1;
            yr = Symbol.toStringTag;
            var Ar = function (t) {
                Ce(s, t);
                var e, n, r, i, o, a = (i = s, o = function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
                        }))), !0
                    } catch (t) {
                        return !1
                    }
                }(), function () {
                    var t, e = Ue(i);
                    if (o) {
                        var n = Ue(this).constructor;
                        t = Reflect.construct(e, arguments, n)
                    } else t = e.apply(this, arguments);
                    return Re(this, t)
                });

                function s(t) {
                    var e;
                    if (R(this, s), (e = a.call(this, {}))._bn = void 0, function (t) {
                        return void 0 !== t._bn
                    }(t)) e._bn = t._bn; else {
                        if ("string" == typeof t) {
                            var n = De().decode(t);
                            if (n.length != kr) throw new Error("Invalid public key input");
                            e._bn = new (qe())(n)
                        } else e._bn = new (qe())(t);
                        if (e._bn.byteLength() > kr) throw new Error("Invalid public key input")
                    }
                    return e
                }

                return W(s, [{
                    key: "equals", value: function (t) {
                        return this._bn.eq(t._bn)
                    }
                }, {
                    key: "toBase58", value: function () {
                        return De().encode(this.toBytes())
                    }
                }, {
                    key: "toJSON", value: function () {
                        return this.toBase58()
                    }
                }, {
                    key: "toBytes", value: function () {
                        var t = this.toBuffer();
                        return new Uint8Array(t.buffer, t.byteOffset, t.byteLength)
                    }
                }, {
                    key: "toBuffer", value: function () {
                        var t = this._bn.toArrayLike(q.Buffer);
                        if (t.length === kr) return t;
                        var e = q.Buffer.alloc(32);
                        return t.copy(e, 32 - t.length), e
                    }
                }, {
                    key: yr, get: function () {
                        return "PublicKey(".concat(this.toString(), ")")
                    }
                }, {
                    key: "toString", value: function () {
                        return this.toBase58()
                    }
                }], [{
                    key: "unique", value: function () {
                        var t = new s(Er);
                        return Er += 1, new s(t.toBuffer())
                    }
                }, {
                    key: "createWithSeed", value: (r = $e(Ne().mark((function t(e, n, r) {
                        var i, o;
                        return Ne().wrap((function (t) {
                            for (; ;) switch (t.prev = t.next) {
                                case 0:
                                    return i = q.Buffer.concat([e.toBuffer(), q.Buffer.from(n), r.toBuffer()]), o = Ye(i), t.abrupt("return", new s(o));
                                case 3:
                                case"end":
                                    return t.stop()
                            }
                        }), t)
                    }))), function (t, e, n) {
                        return r.apply(this, arguments)
                    })
                }, {
                    key: "createProgramAddressSync", value: function (t, e) {
                        var n = q.Buffer.alloc(0);
                        t.forEach((function (t) {
                            if (t.length > 32) throw new TypeError("Max seed length exceeded");
                            n = q.Buffer.concat([n, br(t)])
                        })), n = q.Buffer.concat([n, e.toBuffer(), q.Buffer.from("ProgramDerivedAddress")]);
                        var r = Ye(n);
                        if (gr(r)) throw new Error("Invalid seeds, address must fall off the curve");
                        return new s(r)
                    }
                }, {
                    key: "createProgramAddress", value: (n = $e(Ne().mark((function t(e, n) {
                        return Ne().wrap((function (t) {
                            for (; ;) switch (t.prev = t.next) {
                                case 0:
                                    return t.abrupt("return", this.createProgramAddressSync(e, n));
                                case 1:
                                case"end":
                                    return t.stop()
                            }
                        }), t, this)
                    }))), function (t, e) {
                        return n.apply(this, arguments)
                    })
                }, {
                    key: "findProgramAddressSync", value: function (t, e) {
                        for (var n, r = 255; 0 != r;) {
                            try {
                                var i = t.concat(q.Buffer.from([r]));
                                n = this.createProgramAddressSync(i, e)
                            } catch (t) {
                                if (t instanceof TypeError) throw t;
                                r--;
                                continue
                            }
                            return [n, r]
                        }
                        throw new Error("Unable to find a viable program address nonce")
                    }
                }, {
                    key: "findProgramAddress", value: (e = $e(Ne().mark((function t(e, n) {
                        return Ne().wrap((function (t) {
                            for (; ;) switch (t.prev = t.next) {
                                case 0:
                                    return t.abrupt("return", this.findProgramAddressSync(e, n));
                                case 1:
                                case"end":
                                    return t.stop()
                            }
                        }), t, this)
                    }))), function (t, n) {
                        return e.apply(this, arguments)
                    })
                }, {
                    key: "isOnCurve", value: function (t) {
                        return gr(new s(t).toBytes())
                    }
                }]), s
            }(wr);
            Ar.default = new Ar("11111111111111111111111111111111"), xr.set(Ar, {
                kind: "struct",
                fields: [["_bn", "u256"]]
            }), new Ar("BPFLoader1111111111111111111111111111111111");
            var Sr = 1232;

            function Ir(t) {
                var e = function () {
                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" == typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {
                        }))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function () {
                    var n, r = Ue(t);
                    if (e) {
                        var i = Ue(this).constructor;
                        n = Reflect.construct(r, arguments, i)
                    } else n = r.apply(this, arguments);
                    return Re(this, n)
                }
            }

            var Br = function (t) {
                Ce(n, t);
                var e = Ir(n);

                function n(t) {
                    var r;
                    return R(this, n), (r = e.call(this, "Signature ".concat(t, " has expired: block height exceeded."))).signature = void 0, r.signature = t, r
                }

                return W(n)
            }(Pn(Error));
            Object.defineProperty(Br.prototype, "name", {value: "TransactionExpiredBlockheightExceededError"});
            var Mr = function (t) {
                Ce(n, t);
                var e = Ir(n);

                function n(t, r) {
                    var i;
                    return R(this, n), (i = e.call(this, "Transaction was not confirmed in ".concat(r.toFixed(2), " seconds. It is ") + "unknown if it succeeded or failed. Check signature " + "".concat(t, " using the Solana Explorer or CLI tools."))).signature = void 0, i.signature = t, i
                }

                return W(n)
            }(Pn(Error));
            Object.defineProperty(Mr.prototype, "name", {value: "TransactionExpiredTimeoutError"});
            var Or = function (t) {
                Ce(n, t);
                var e = Ir(n);

                function n(t) {
                    var r;
                    return R(this, n), (r = e.call(this, "Signature ".concat(t, " has expired: the nonce is no longer valid."))).signature = void 0, r.signature = t, r
                }

                return W(n)
            }(Pn(Error));

            function _r(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
                return r
            }

            Object.defineProperty(Or.prototype, "name", {value: "TransactionExpiredNonceInvalidError"});
            var Tr = function () {
                function t(e, n) {
                    R(this, t), this.staticAccountKeys = void 0, this.accountKeysFromLookups = void 0, this.staticAccountKeys = e, this.accountKeysFromLookups = n
                }

                return W(t, [{
                    key: "keySegments", value: function () {
                        var t = [this.staticAccountKeys];
                        return this.accountKeysFromLookups && (t.push(this.accountKeysFromLookups.writable), t.push(this.accountKeysFromLookups.readonly)), t
                    }
                }, {
                    key: "get", value: function (t) {
                        var e, n = function (t, e) {
                            var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                            if (!n) {
                                if (Array.isArray(t) || (n = function (t, e) {
                                    if (t) {
                                        if ("string" == typeof t) return _r(t, e);
                                        var n = Object.prototype.toString.call(t).slice(8, -1);
                                        return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _r(t, e) : void 0
                                    }
                                }(t))) {
                                    n && (t = n);
                                    var r = 0, i = function () {
                                    };
                                    return {
                                        s: i, n: function () {
                                            return r >= t.length ? {done: !0} : {done: !1, value: t[r++]}
                                        }, e: function (t) {
                                            throw t
                                        }, f: i
                                    }
                                }
                                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                            }
                            var o, a = !0, s = !1;
                            return {
                                s: function () {
                                    n = n.call(t)
                                }, n: function () {
                                    var t = n.next();
                                    return a = t.done, t
                                }, e: function (t) {
                                    s = !0, o = t
                                }, f: function () {
                                    try {
                                        a || null == n.return || n.return()
                                    } finally {
                                        if (s) throw o
                                    }
                                }
                            }
                        }(this.keySegments());
                        try {
                            for (n.s(); !(e = n.n()).done;) {
                                var r = e.value;
                                if (t < r.length) return r[t];
                                t -= r.length
                            }
                        } catch (t) {
                            n.e(t)
                        } finally {
                            n.f()
                        }
                    }
                }, {
                    key: "length", get: function () {
                        return this.keySegments().flat().length
                    }
                }, {
                    key: "compileInstructions", value: function (t) {
                        if (this.length > 256) throw new Error("Account index overflow encountered during compilation");
                        var e = new Map;
                        this.keySegments().flat().forEach((function (t, n) {
                            e.set(t.toBase58(), n)
                        }));
                        var n = function (t) {
                            var n = e.get(t.toBase58());
                            if (void 0 === n) throw new Error("Encountered an unknown instruction account key during compilation");
                            return n
                        };
                        return t.map((function (t) {
                            return {
                                programIdIndex: n(t.programId), accountKeyIndexes: t.keys.map((function (t) {
                                    return n(t.pubkey)
                                })), data: t.data
                            }
                        }))
                    }
                }]), t
            }(), Lr = function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "publicKey";
                return Qe.Ik(32, t)
            }, Pr = function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "signature";
                return Qe.Ik(64, t)
            }, $r = function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "string",
                    e = Qe.n_([Qe.Jq("length"), Qe.Jq("lengthPadding"), Qe.Ik(Qe.cv(Qe.Jq(), -8), "chars")], t),
                    n = e.decode.bind(e), r = e.encode.bind(e), i = e;
                return i.decode = function (t, e) {
                    return n(t, e).chars.toString()
                }, i.encode = function (t, e, n) {
                    var i = {chars: q.Buffer.from(t, "utf8")};
                    return r(i, e, n)
                }, i.alloc = function (t) {
                    return Qe.Jq().span + Qe.Jq().span + q.Buffer.from(t, "utf8").length
                }, i
            };

            function jr(t, e) {
                var n = function t(n) {
                    if (n.span >= 0) return n.span;
                    if ("function" == typeof n.alloc) return n.alloc(e[n.property]);
                    if ("count" in n && "elementLayout" in n) {
                        var r = e[n.property];
                        if (Array.isArray(r)) return r.length * t(n.elementLayout)
                    } else if ("fields" in n) return jr({layout: n}, e[n.property]);
                    return 0
                }, r = 0;
                return t.layout.fields.forEach((function (t) {
                    r += n(t)
                })), r
            }

            function Cr(t) {
                for (var e = 0, n = 0; ;) {
                    var r = t.shift();
                    if (e |= (127 & r) << 7 * n, n += 1, !(128 & r)) break
                }
                return e
            }

            function Rr(t, e) {
                for (var n = e; ;) {
                    var r = 127 & n;
                    if (0 == (n >>= 7)) {
                        t.push(r);
                        break
                    }
                    r |= 128, t.push(r)
                }
            }

            function Ur(t, e) {
                if (!t) throw new Error(e || "Assertion failed")
            }

            function zr(t, e) {
                var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                if (!n) {
                    if (Array.isArray(t) || (n = function (t, e) {
                        if (t) {
                            if ("string" == typeof t) return Nr(t, e);
                            var n = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Nr(t, e) : void 0
                        }
                    }(t)) || e && t && "number" == typeof t.length) {
                        n && (t = n);
                        var r = 0, i = function () {
                        };
                        return {
                            s: i, n: function () {
                                return r >= t.length ? {done: !0} : {done: !1, value: t[r++]}
                            }, e: function (t) {
                                throw t
                            }, f: i
                        }
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var o, a = !0, s = !1;
                return {
                    s: function () {
                        n = n.call(t)
                    }, n: function () {
                        var t = n.next();
                        return a = t.done, t
                    }, e: function (t) {
                        s = !0, o = t
                    }, f: function () {
                        try {
                            a || null == n.return || n.return()
                        } finally {
                            if (s) throw o
                        }
                    }
                }
            }

            function Nr(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
                return r
            }

            var Wr = function () {
                function t(e, n) {
                    R(this, t), this.payer = void 0, this.keyMetaMap = void 0, this.payer = e, this.keyMetaMap = n
                }

                return W(t, [{
                    key: "getMessageComponents", value: function () {
                        var t = an(this.keyMetaMap.entries());
                        Ur(t.length <= 256, "Max static account keys length exceeded");
                        var e = t.filter((function (t) {
                            var e = nn(t, 2)[1];
                            return e.isSigner && e.isWritable
                        })), n = t.filter((function (t) {
                            var e = nn(t, 2)[1];
                            return e.isSigner && !e.isWritable
                        })), r = t.filter((function (t) {
                            var e = nn(t, 2)[1];
                            return !e.isSigner && e.isWritable
                        })), i = t.filter((function (t) {
                            var e = nn(t, 2)[1];
                            return !e.isSigner && !e.isWritable
                        })), o = {
                            numRequiredSignatures: e.length + n.length,
                            numReadonlySignedAccounts: n.length,
                            numReadonlyUnsignedAccounts: i.length
                        };
                        return Ur(e.length > 0, "Expected at least one writable signer key"), Ur(nn(e[0], 1)[0] === this.payer.toBase58(), "Expected first writable signer key to be the fee payer"), [o, [].concat(an(e.map((function (t) {
                            var e = nn(t, 1)[0];
                            return new Ar(e)
                        }))), an(n.map((function (t) {
                            var e = nn(t, 1)[0];
                            return new Ar(e)
                        }))), an(r.map((function (t) {
                            var e = nn(t, 1)[0];
                            return new Ar(e)
                        }))), an(i.map((function (t) {
                            var e = nn(t, 1)[0];
                            return new Ar(e)
                        }))))]
                    }
                }, {
                    key: "extractTableLookup", value: function (t) {
                        var e = nn(this.drainKeysFoundInLookupTable(t.state.addresses, (function (t) {
                                return !t.isSigner && !t.isInvoked && t.isWritable
                            })), 2), n = e[0], r = e[1],
                            i = nn(this.drainKeysFoundInLookupTable(t.state.addresses, (function (t) {
                                return !t.isSigner && !t.isInvoked && !t.isWritable
                            })), 2), o = i[0], a = i[1];
                        if (0 !== n.length || 0 !== o.length) return [{
                            accountKey: t.key,
                            writableIndexes: n,
                            readonlyIndexes: o
                        }, {writable: r, readonly: a}]
                    }
                }, {
                    key: "drainKeysFoundInLookupTable", value: function (t, e) {
                        var n, r = this, i = new Array, o = new Array, a = zr(this.keyMetaMap.entries());
                        try {
                            var s = function () {
                                var a = nn(n.value, 2), s = a[0], u = a[1];
                                if (e(u)) {
                                    var c = new Ar(s), f = t.findIndex((function (t) {
                                        return t.equals(c)
                                    }));
                                    f >= 0 && (Ur(f < 256, "Max lookup table index exceeded"), i.push(f), o.push(c), r.keyMetaMap.delete(s))
                                }
                            };
                            for (a.s(); !(n = a.n()).done;) s()
                        } catch (t) {
                            a.e(t)
                        } finally {
                            a.f()
                        }
                        return [i, o]
                    }
                }], [{
                    key: "compile", value: function (e, n) {
                        var r = new Map, i = function (t) {
                            var e = t.toBase58(), n = r.get(e);
                            return void 0 === n && (n = {isSigner: !1, isWritable: !1, isInvoked: !1}, r.set(e, n)), n
                        }, o = i(n);
                        o.isSigner = !0, o.isWritable = !0;
                        var a, s = zr(e);
                        try {
                            for (s.s(); !(a = s.n()).done;) {
                                var u = a.value;
                                i(u.programId).isInvoked = !0;
                                var c, f = zr(u.keys);
                                try {
                                    for (f.s(); !(c = f.n()).done;) {
                                        var l = c.value, h = i(l.pubkey);
                                        h.isSigner || (h.isSigner = l.isSigner), h.isWritable || (h.isWritable = l.isWritable)
                                    }
                                } catch (t) {
                                    f.e(t)
                                } finally {
                                    f.f()
                                }
                            }
                        } catch (t) {
                            s.e(t)
                        } finally {
                            s.f()
                        }
                        return new t(n, r)
                    }
                }]), t
            }(), qr = function () {
                function t(e) {
                    var n = this;
                    R(this, t), this.header = void 0, this.accountKeys = void 0, this.recentBlockhash = void 0, this.instructions = void 0, this.indexToProgramIds = new Map, this.header = e.header, this.accountKeys = e.accountKeys.map((function (t) {
                        return new Ar(t)
                    })), this.recentBlockhash = e.recentBlockhash, this.instructions = e.instructions, this.instructions.forEach((function (t) {
                        return n.indexToProgramIds.set(t.programIdIndex, n.accountKeys[t.programIdIndex])
                    }))
                }

                return W(t, [{
                    key: "version", get: function () {
                        return "legacy"
                    }
                }, {
                    key: "staticAccountKeys", get: function () {
                        return this.accountKeys
                    }
                }, {
                    key: "compiledInstructions", get: function () {
                        return this.instructions.map((function (t) {
                            return {
                                programIdIndex: t.programIdIndex,
                                accountKeyIndexes: t.accounts,
                                data: De().decode(t.data)
                            }
                        }))
                    }
                }, {
                    key: "addressTableLookups", get: function () {
                        return []
                    }
                }, {
                    key: "getAccountKeys", value: function () {
                        return new Tr(this.staticAccountKeys)
                    }
                }, {
                    key: "isAccountSigner", value: function (t) {
                        return t < this.header.numRequiredSignatures
                    }
                }, {
                    key: "isAccountWritable", value: function (t) {
                        var e = this.header.numRequiredSignatures;
                        return t >= this.header.numRequiredSignatures ? t - e < this.accountKeys.length - e - this.header.numReadonlyUnsignedAccounts : t < e - this.header.numReadonlySignedAccounts
                    }
                }, {
                    key: "isProgramId", value: function (t) {
                        return this.indexToProgramIds.has(t)
                    }
                }, {
                    key: "programIds", value: function () {
                        return an(this.indexToProgramIds.values())
                    }
                }, {
                    key: "nonProgramIds", value: function () {
                        var t = this;
                        return this.accountKeys.filter((function (e, n) {
                            return !t.isProgramId(n)
                        }))
                    }
                }, {
                    key: "serialize", value: function () {
                        var t = this.accountKeys.length, e = [];
                        Rr(e, t);
                        var n = this.instructions.map((function (t) {
                            var e = t.accounts, n = t.programIdIndex, r = Array.from(De().decode(t.data)), i = [];
                            Rr(i, e.length);
                            var o = [];
                            return Rr(o, r.length), {
                                programIdIndex: n,
                                keyIndicesCount: q.Buffer.from(i),
                                keyIndices: e,
                                dataLength: q.Buffer.from(o),
                                data: r
                            }
                        })), r = [];
                        Rr(r, n.length);
                        var i = q.Buffer.alloc(Sr);
                        q.Buffer.from(r).copy(i);
                        var o = r.length;
                        n.forEach((function (t) {
                            var e = Qe.n_([Qe.u8("programIdIndex"), Qe.Ik(t.keyIndicesCount.length, "keyIndicesCount"), Qe.A9(Qe.u8("keyIndex"), t.keyIndices.length, "keyIndices"), Qe.Ik(t.dataLength.length, "dataLength"), Qe.A9(Qe.u8("userdatum"), t.data.length, "data")]).encode(t, i, o);
                            o += e
                        })), i = i.slice(0, o);
                        var a = Qe.n_([Qe.Ik(1, "numRequiredSignatures"), Qe.Ik(1, "numReadonlySignedAccounts"), Qe.Ik(1, "numReadonlyUnsignedAccounts"), Qe.Ik(e.length, "keyCount"), Qe.A9(Lr("key"), t, "keys"), Lr("recentBlockhash")]),
                            s = {
                                numRequiredSignatures: q.Buffer.from([this.header.numRequiredSignatures]),
                                numReadonlySignedAccounts: q.Buffer.from([this.header.numReadonlySignedAccounts]),
                                numReadonlyUnsignedAccounts: q.Buffer.from([this.header.numReadonlyUnsignedAccounts]),
                                keyCount: q.Buffer.from(e),
                                keys: this.accountKeys.map((function (t) {
                                    return br(t.toBytes())
                                })),
                                recentBlockhash: De().decode(this.recentBlockhash)
                            }, u = q.Buffer.alloc(2048), c = a.encode(s, u);
                        return i.copy(u, c), u.slice(0, c + i.length)
                    }
                }], [{
                    key: "compile", value: function (e) {
                        var n = nn(Wr.compile(e.instructions, e.payerKey).getMessageComponents(), 2), r = n[0],
                            i = n[1], o = new Tr(i).compileInstructions(e.instructions).map((function (t) {
                                return {
                                    programIdIndex: t.programIdIndex,
                                    accounts: t.accountKeyIndexes,
                                    data: De().encode(t.data)
                                }
                            }));
                        return new t({header: r, accountKeys: i, recentBlockhash: e.recentBlockhash, instructions: o})
                    }
                }, {
                    key: "from", value: function (e) {
                        var n = an(e), r = n.shift();
                        if (r !== (127 & r)) throw new Error("Versioned messages must be deserialized with VersionedMessage.deserialize()");
                        for (var i = n.shift(), o = n.shift(), a = Cr(n), s = [], u = 0; u < a; u++) {
                            var c = n.slice(0, kr);
                            n = n.slice(kr), s.push(new Ar(q.Buffer.from(c)))
                        }
                        for (var f = n.slice(0, kr), l = Cr(n = n.slice(kr)), h = [], d = 0; d < l; d++) {
                            var p = n.shift(), g = Cr(n), y = n.slice(0, g), m = Cr(n = n.slice(g)), v = n.slice(0, m),
                                b = De().encode(q.Buffer.from(v));
                            n = n.slice(m), h.push({programIdIndex: p, accounts: y, data: b})
                        }
                        return new t({
                            header: {
                                numRequiredSignatures: r,
                                numReadonlySignedAccounts: i,
                                numReadonlyUnsignedAccounts: o
                            }, recentBlockhash: De().encode(q.Buffer.from(f)), accountKeys: s, instructions: h
                        })
                    }
                }]), t
            }();

            function Kr(t, e) {
                var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                if (!n) {
                    if (Array.isArray(t) || (n = function (t, e) {
                        if (t) {
                            if ("string" == typeof t) return Dr(t, e);
                            var n = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Dr(t, e) : void 0
                        }
                    }(t)) || e && t && "number" == typeof t.length) {
                        n && (t = n);
                        var r = 0, i = function () {
                        };
                        return {
                            s: i, n: function () {
                                return r >= t.length ? {done: !0} : {done: !1, value: t[r++]}
                            }, e: function (t) {
                                throw t
                            }, f: i
                        }
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var o, a = !0, s = !1;
                return {
                    s: function () {
                        n = n.call(t)
                    }, n: function () {
                        var t = n.next();
                        return a = t.done, t
                    }, e: function (t) {
                        s = !0, o = t
                    }, f: function () {
                        try {
                            a || null == n.return || n.return()
                        } finally {
                            if (s) throw o
                        }
                    }
                }
            }

            function Dr(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
                return r
            }

            var Fr = function () {
                function t(e) {
                    R(this, t), this.header = void 0, this.staticAccountKeys = void 0, this.recentBlockhash = void 0, this.compiledInstructions = void 0, this.addressTableLookups = void 0, this.header = e.header, this.staticAccountKeys = e.staticAccountKeys, this.recentBlockhash = e.recentBlockhash, this.compiledInstructions = e.compiledInstructions, this.addressTableLookups = e.addressTableLookups
                }

                return W(t, [{
                    key: "version", get: function () {
                        return 0
                    }
                }, {
                    key: "numAccountKeysFromLookups", get: function () {
                        var t, e = 0, n = Kr(this.addressTableLookups);
                        try {
                            for (n.s(); !(t = n.n()).done;) {
                                var r = t.value;
                                e += r.readonlyIndexes.length + r.writableIndexes.length
                            }
                        } catch (t) {
                            n.e(t)
                        } finally {
                            n.f()
                        }
                        return e
                    }
                }, {
                    key: "getAccountKeys", value: function (t) {
                        var e;
                        if (t && "accountKeysFromLookups" in t && t.accountKeysFromLookups) {
                            if (this.numAccountKeysFromLookups != t.accountKeysFromLookups.writable.length + t.accountKeysFromLookups.readonly.length) throw new Error("Failed to get account keys because of a mismatch in the number of account keys from lookups");
                            e = t.accountKeysFromLookups
                        } else if (t && "addressLookupTableAccounts" in t && t.addressLookupTableAccounts) e = this.resolveAddressTableLookups(t.addressLookupTableAccounts); else if (this.addressTableLookups.length > 0) throw new Error("Failed to get account keys because address table lookups were not resolved");
                        return new Tr(this.staticAccountKeys, e)
                    }
                }, {
                    key: "isAccountSigner", value: function (t) {
                        return t < this.header.numRequiredSignatures
                    }
                }, {
                    key: "isAccountWritable", value: function (t) {
                        var e = this.header.numRequiredSignatures, n = this.staticAccountKeys.length;
                        return t >= n ? t - n < this.addressTableLookups.reduce((function (t, e) {
                            return t + e.writableIndexes.length
                        }), 0) : t >= this.header.numRequiredSignatures ? t - e < n - e - this.header.numReadonlyUnsignedAccounts : t < e - this.header.numReadonlySignedAccounts
                    }
                }, {
                    key: "resolveAddressTableLookups", value: function (t) {
                        var e, n = {writable: [], readonly: []}, r = Kr(this.addressTableLookups);
                        try {
                            var i = function () {
                                var r = e.value, i = t.find((function (t) {
                                    return t.key.equals(r.accountKey)
                                }));
                                if (!i) throw new Error("Failed to find address lookup table account for table key ".concat(r.accountKey.toBase58()));
                                var o, a = Kr(r.writableIndexes);
                                try {
                                    for (a.s(); !(o = a.n()).done;) {
                                        var s = o.value;
                                        if (!(s < i.state.addresses.length)) throw new Error("Failed to find address for index ".concat(s, " in address lookup table ").concat(r.accountKey.toBase58()));
                                        n.writable.push(i.state.addresses[s])
                                    }
                                } catch (t) {
                                    a.e(t)
                                } finally {
                                    a.f()
                                }
                                var u, c = Kr(r.readonlyIndexes);
                                try {
                                    for (c.s(); !(u = c.n()).done;) {
                                        var f = u.value;
                                        if (!(f < i.state.addresses.length)) throw new Error("Failed to find address for index ".concat(f, " in address lookup table ").concat(r.accountKey.toBase58()));
                                        n.readonly.push(i.state.addresses[f])
                                    }
                                } catch (t) {
                                    c.e(t)
                                } finally {
                                    c.f()
                                }
                            };
                            for (r.s(); !(e = r.n()).done;) i()
                        } catch (t) {
                            r.e(t)
                        } finally {
                            r.f()
                        }
                        return n
                    }
                }, {
                    key: "serialize", value: function () {
                        var t = Array();
                        Rr(t, this.staticAccountKeys.length);
                        var e = this.serializeInstructions(), n = Array();
                        Rr(n, this.compiledInstructions.length);
                        var r = this.serializeAddressTableLookups(), i = Array();
                        Rr(i, this.addressTableLookups.length);
                        var o = Qe.n_([Qe.u8("prefix"), Qe.n_([Qe.u8("numRequiredSignatures"), Qe.u8("numReadonlySignedAccounts"), Qe.u8("numReadonlyUnsignedAccounts")], "header"), Qe.Ik(t.length, "staticAccountKeysLength"), Qe.A9(Lr(), this.staticAccountKeys.length, "staticAccountKeys"), Lr("recentBlockhash"), Qe.Ik(n.length, "instructionsLength"), Qe.Ik(e.length, "serializedInstructions"), Qe.Ik(i.length, "addressTableLookupsLength"), Qe.Ik(r.length, "serializedAddressTableLookups")]),
                            a = new Uint8Array(Sr), s = o.encode({
                                prefix: 128,
                                header: this.header,
                                staticAccountKeysLength: new Uint8Array(t),
                                staticAccountKeys: this.staticAccountKeys.map((function (t) {
                                    return t.toBytes()
                                })),
                                recentBlockhash: De().decode(this.recentBlockhash),
                                instructionsLength: new Uint8Array(n),
                                serializedInstructions: e,
                                addressTableLookupsLength: new Uint8Array(i),
                                serializedAddressTableLookups: r
                            }, a);
                        return a.slice(0, s)
                    }
                }, {
                    key: "serializeInstructions", value: function () {
                        var t, e = 0, n = new Uint8Array(Sr), r = Kr(this.compiledInstructions);
                        try {
                            for (r.s(); !(t = r.n()).done;) {
                                var i = t.value, o = Array();
                                Rr(o, i.accountKeyIndexes.length);
                                var a = Array();
                                Rr(a, i.data.length), e += Qe.n_([Qe.u8("programIdIndex"), Qe.Ik(o.length, "encodedAccountKeyIndexesLength"), Qe.A9(Qe.u8(), i.accountKeyIndexes.length, "accountKeyIndexes"), Qe.Ik(a.length, "encodedDataLength"), Qe.Ik(i.data.length, "data")]).encode({
                                    programIdIndex: i.programIdIndex,
                                    encodedAccountKeyIndexesLength: new Uint8Array(o),
                                    accountKeyIndexes: i.accountKeyIndexes,
                                    encodedDataLength: new Uint8Array(a),
                                    data: i.data
                                }, n, e)
                            }
                        } catch (t) {
                            r.e(t)
                        } finally {
                            r.f()
                        }
                        return n.slice(0, e)
                    }
                }, {
                    key: "serializeAddressTableLookups", value: function () {
                        var t, e = 0, n = new Uint8Array(Sr), r = Kr(this.addressTableLookups);
                        try {
                            for (r.s(); !(t = r.n()).done;) {
                                var i = t.value, o = Array();
                                Rr(o, i.writableIndexes.length);
                                var a = Array();
                                Rr(a, i.readonlyIndexes.length), e += Qe.n_([Lr("accountKey"), Qe.Ik(o.length, "encodedWritableIndexesLength"), Qe.A9(Qe.u8(), i.writableIndexes.length, "writableIndexes"), Qe.Ik(a.length, "encodedReadonlyIndexesLength"), Qe.A9(Qe.u8(), i.readonlyIndexes.length, "readonlyIndexes")]).encode({
                                    accountKey: i.accountKey.toBytes(),
                                    encodedWritableIndexesLength: new Uint8Array(o),
                                    writableIndexes: i.writableIndexes,
                                    encodedReadonlyIndexesLength: new Uint8Array(a),
                                    readonlyIndexes: i.readonlyIndexes
                                }, n, e)
                            }
                        } catch (t) {
                            r.e(t)
                        } finally {
                            r.f()
                        }
                        return n.slice(0, e)
                    }
                }], [{
                    key: "compile", value: function (e) {
                        var n, r = Wr.compile(e.instructions, e.payerKey), i = new Array,
                            o = {writable: new Array, readonly: new Array}, a = Kr(e.addressLookupTableAccounts || []);
                        try {
                            for (a.s(); !(n = a.n()).done;) {
                                var s = n.value, u = r.extractTableLookup(s);
                                if (void 0 !== u) {
                                    var c, f, l = nn(u, 2), h = l[0], d = l[1], p = d.writable, g = d.readonly;
                                    i.push(h), (c = o.writable).push.apply(c, an(p)), (f = o.readonly).push.apply(f, an(g))
                                }
                            }
                        } catch (t) {
                            a.e(t)
                        } finally {
                            a.f()
                        }
                        var y = nn(r.getMessageComponents(), 2), m = y[0], v = y[1],
                            b = new Tr(v, o).compileInstructions(e.instructions);
                        return new t({
                            header: m,
                            staticAccountKeys: v,
                            recentBlockhash: e.recentBlockhash,
                            compiledInstructions: b,
                            addressTableLookups: i
                        })
                    }
                }, {
                    key: "deserialize", value: function (e) {
                        var n = an(e), r = n.shift(), i = 127 & r;
                        Ur(r !== i, "Expected versioned message but received legacy message"), Ur(0 === i, "Expected versioned message with version 0 but found version ".concat(i));
                        for (var o = {
                            numRequiredSignatures: n.shift(),
                            numReadonlySignedAccounts: n.shift(),
                            numReadonlyUnsignedAccounts: n.shift()
                        }, a = [], s = Cr(n), u = 0; u < s; u++) a.push(new Ar(n.splice(0, kr)));
                        for (var c = De().encode(n.splice(0, kr)), f = Cr(n), l = [], h = 0; h < f; h++) {
                            var d = n.shift(), p = Cr(n), g = n.splice(0, p), y = Cr(n),
                                m = new Uint8Array(n.splice(0, y));
                            l.push({programIdIndex: d, accountKeyIndexes: g, data: m})
                        }
                        for (var v = Cr(n), b = [], w = 0; w < v; w++) {
                            var x = new Ar(n.splice(0, kr)), k = Cr(n), E = n.splice(0, k), A = Cr(n),
                                S = n.splice(0, A);
                            b.push({accountKey: x, writableIndexes: E, readonlyIndexes: S})
                        }
                        return new t({
                            header: o,
                            staticAccountKeys: a,
                            recentBlockhash: c,
                            compiledInstructions: l,
                            addressTableLookups: b
                        })
                    }
                }]), t
            }(), Hr = {
                deserializeMessageVersion: function (t) {
                    var e = t[0], n = 127 & e;
                    return n === e ? "legacy" : n
                }, deserialize: function (t) {
                    var e = Hr.deserializeMessageVersion(t);
                    if ("legacy" === e) return qr.from(t);
                    if (0 === e) return Fr.deserialize(t);
                    throw new Error("Transaction message version ".concat(e, " deserialization is not supported"))
                }
            };

            function Vr(t, e) {
                var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                if (!n) {
                    if (Array.isArray(t) || (n = function (t, e) {
                        if (t) {
                            if ("string" == typeof t) return Jr(t, e);
                            var n = Object.prototype.toString.call(t).slice(8, -1);
                            return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Jr(t, e) : void 0
                        }
                    }(t)) || e && t && "number" == typeof t.length) {
                        n && (t = n);
                        var r = 0, i = function () {
                        };
                        return {
                            s: i, n: function () {
                                return r >= t.length ? {done: !0} : {done: !1, value: t[r++]}
                            }, e: function (t) {
                                throw t
                            }, f: i
                        }
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var o, a = !0, s = !1;
                return {
                    s: function () {
                        n = n.call(t)
                    }, n: function () {
                        var t = n.next();
                        return a = t.done, t
                    }, e: function (t) {
                        s = !0, o = t
                    }, f: function () {
                        try {
                            a || null == n.return || n.return()
                        } finally {
                            if (s) throw o
                        }
                    }
                }
            }

            function Jr(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
                return r
            }

            function Zr(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e && (r = r.filter((function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            var Gr = q.Buffer.alloc(64).fill(0), Yr = function () {
                function t(e) {
                    R(this, t), this.keys = void 0, this.programId = void 0, this.data = q.Buffer.alloc(0), this.programId = e.programId, this.keys = e.keys, e.data && (this.data = e.data)
                }

                return W(t, [{
                    key: "toJSON", value: function () {
                        return {
                            keys: this.keys.map((function (t) {
                                var e = t.pubkey, n = t.isSigner, r = t.isWritable;
                                return {pubkey: e.toJSON(), isSigner: n, isWritable: r}
                            })), programId: this.programId.toJSON(), data: an(this.data)
                        }
                    }
                }]), t
            }(), Xr = function () {
                function t(e) {
                    if (R(this, t), this.signatures = [], this.feePayer = void 0, this.instructions = [], this.recentBlockhash = void 0, this.lastValidBlockHeight = void 0, this.nonceInfo = void 0, this.minNonceContextSlot = void 0, this._message = void 0, this._json = void 0, e) if (e.feePayer && (this.feePayer = e.feePayer), e.signatures && (this.signatures = e.signatures), Object.prototype.hasOwnProperty.call(e, "nonceInfo")) {
                        var n = e, r = n.minContextSlot, i = n.nonceInfo;
                        this.minNonceContextSlot = r, this.nonceInfo = i
                    } else if (Object.prototype.hasOwnProperty.call(e, "lastValidBlockHeight")) {
                        var o = e, a = o.blockhash, s = o.lastValidBlockHeight;
                        this.recentBlockhash = a, this.lastValidBlockHeight = s
                    } else {
                        var u = e, c = u.recentBlockhash, f = u.nonceInfo;
                        f && (this.nonceInfo = f), this.recentBlockhash = c
                    }
                }

                var e;
                return W(t, [{
                    key: "signature", get: function () {
                        return this.signatures.length > 0 ? this.signatures[0].signature : null
                    }
                }, {
                    key: "toJSON", value: function () {
                        return {
                            recentBlockhash: this.recentBlockhash || null,
                            feePayer: this.feePayer ? this.feePayer.toJSON() : null,
                            nonceInfo: this.nonceInfo ? {
                                nonce: this.nonceInfo.nonce,
                                nonceInstruction: this.nonceInfo.nonceInstruction.toJSON()
                            } : null,
                            instructions: this.instructions.map((function (t) {
                                return t.toJSON()
                            })),
                            signers: this.signatures.map((function (t) {
                                return t.publicKey.toJSON()
                            }))
                        }
                    }
                }, {
                    key: "add", value: function () {
                        for (var t = this, e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                        if (0 === n.length) throw new Error("No instructions");
                        return n.forEach((function (e) {
                            "instructions" in e ? t.instructions = t.instructions.concat(e.instructions) : "data" in e && "programId" in e && "keys" in e ? t.instructions.push(e) : t.instructions.push(new Yr(e))
                        })), this
                    }
                }, {
                    key: "compileMessage", value: function () {
                        if (this._message && JSON.stringify(this.toJSON()) === JSON.stringify(this._json)) return this._message;
                        var t, e, n;
                        if (this.nonceInfo ? (t = this.nonceInfo.nonce, e = this.instructions[0] != this.nonceInfo.nonceInstruction ? [this.nonceInfo.nonceInstruction].concat(an(this.instructions)) : this.instructions) : (t = this.recentBlockhash, e = this.instructions), !t) throw new Error("Transaction recentBlockhash required");
                        if (e.length < 1 && console.warn("No instructions provided"), this.feePayer) n = this.feePayer; else {
                            if (!(this.signatures.length > 0 && this.signatures[0].publicKey)) throw new Error("Transaction fee payer required");
                            n = this.signatures[0].publicKey
                        }
                        for (var r = 0; r < e.length; r++) if (void 0 === e[r].programId) throw new Error("Transaction instruction index ".concat(r, " has undefined program id"));
                        var i = [], o = [];
                        e.forEach((function (t) {
                            t.keys.forEach((function (t) {
                                o.push(function (t) {
                                    for (var e = 1; e < arguments.length; e++) {
                                        var n = null != arguments[e] ? arguments[e] : {};
                                        e % 2 ? Zr(Object(n), !0).forEach((function (e) {
                                            on(t, e, n[e])
                                        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Zr(Object(n)).forEach((function (e) {
                                            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                                        }))
                                    }
                                    return t
                                }({}, t))
                            }));
                            var e = t.programId.toString();
                            i.includes(e) || i.push(e)
                        })), i.forEach((function (t) {
                            o.push({pubkey: new Ar(t), isSigner: !1, isWritable: !1})
                        }));
                        var a = [];
                        o.forEach((function (t) {
                            var e = t.pubkey.toString(), n = a.findIndex((function (t) {
                                return t.pubkey.toString() === e
                            }));
                            n > -1 ? (a[n].isWritable = a[n].isWritable || t.isWritable, a[n].isSigner = a[n].isSigner || t.isSigner) : a.push(t)
                        })), a.sort((function (t, e) {
                            return t.isSigner !== e.isSigner ? t.isSigner ? -1 : 1 : t.isWritable !== e.isWritable ? t.isWritable ? -1 : 1 : t.pubkey.toBase58().localeCompare(e.pubkey.toBase58(), "en", {
                                localeMatcher: "best fit",
                                usage: "sort",
                                sensitivity: "variant",
                                ignorePunctuation: !1,
                                numeric: !1,
                                caseFirst: "lower"
                            })
                        }));
                        var s = a.findIndex((function (t) {
                            return t.pubkey.equals(n)
                        }));
                        if (s > -1) {
                            var u = nn(a.splice(s, 1), 1)[0];
                            u.isSigner = !0, u.isWritable = !0, a.unshift(u)
                        } else a.unshift({pubkey: n, isSigner: !0, isWritable: !0});
                        var c, f = Vr(this.signatures);
                        try {
                            var l = function () {
                                var t = c.value, e = a.findIndex((function (e) {
                                    return e.pubkey.equals(t.publicKey)
                                }));
                                if (!(e > -1)) throw new Error("unknown signer: ".concat(t.publicKey.toString()));
                                a[e].isSigner || (a[e].isSigner = !0, console.warn("Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release."))
                            };
                            for (f.s(); !(c = f.n()).done;) l()
                        } catch (t) {
                            f.e(t)
                        } finally {
                            f.f()
                        }
                        var h = 0, d = 0, p = 0, g = [], y = [];
                        a.forEach((function (t) {
                            var e = t.pubkey, n = t.isSigner, r = t.isWritable;
                            n ? (g.push(e.toString()), h += 1, r || (d += 1)) : (y.push(e.toString()), r || (p += 1))
                        }));
                        var m = g.concat(y), v = e.map((function (t) {
                            var e = t.data, n = t.programId;
                            return {
                                programIdIndex: m.indexOf(n.toString()), accounts: t.keys.map((function (t) {
                                    return m.indexOf(t.pubkey.toString())
                                })), data: De().encode(e)
                            }
                        }));
                        return v.forEach((function (t) {
                            Ur(t.programIdIndex >= 0), t.accounts.forEach((function (t) {
                                return Ur(t >= 0)
                            }))
                        })), new qr({
                            header: {
                                numRequiredSignatures: h,
                                numReadonlySignedAccounts: d,
                                numReadonlyUnsignedAccounts: p
                            }, accountKeys: m, recentBlockhash: t, instructions: v
                        })
                    }
                }, {
                    key: "_compile", value: function () {
                        var t = this.compileMessage(), e = t.accountKeys.slice(0, t.header.numRequiredSignatures);
                        return this.signatures.length === e.length && this.signatures.every((function (t, n) {
                            return e[n].equals(t.publicKey)
                        })) || (this.signatures = e.map((function (t) {
                            return {signature: null, publicKey: t}
                        }))), t
                    }
                }, {
                    key: "serializeMessage", value: function () {
                        return this._compile().serialize()
                    }
                }, {
                    key: "getEstimatedFee", value: (e = $e(Ne().mark((function t(e) {
                        return Ne().wrap((function (t) {
                            for (; ;) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, e.getFeeForMessage(this.compileMessage());
                                case 2:
                                    return t.abrupt("return", t.sent.value);
                                case 3:
                                case"end":
                                    return t.stop()
                            }
                        }), t, this)
                    }))), function (t) {
                        return e.apply(this, arguments)
                    })
                }, {
                    key: "setSigners", value: function () {
                        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                        if (0 === e.length) throw new Error("No signers");
                        var r = new Set;
                        this.signatures = e.filter((function (t) {
                            var e = t.toString();
                            return !r.has(e) && (r.add(e), !0)
                        })).map((function (t) {
                            return {signature: null, publicKey: t}
                        }))
                    }
                }, {
                    key: "sign", value: function () {
                        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                        if (0 === e.length) throw new Error("No signers");
                        for (var r = new Set, i = [], o = 0, a = e; o < a.length; o++) {
                            var s = a[o], u = s.publicKey.toString();
                            r.has(u) || (r.add(u), i.push(s))
                        }
                        this.signatures = i.map((function (t) {
                            return {signature: null, publicKey: t.publicKey}
                        }));
                        var c = this._compile();
                        this._partialSign.apply(this, [c].concat(i))
                    }
                }, {
                    key: "partialSign", value: function () {
                        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                        if (0 === e.length) throw new Error("No signers");
                        for (var r = new Set, i = [], o = 0, a = e; o < a.length; o++) {
                            var s = a[o], u = s.publicKey.toString();
                            r.has(u) || (r.add(u), i.push(s))
                        }
                        var c = this._compile();
                        this._partialSign.apply(this, [c].concat(i))
                    }
                }, {
                    key: "_partialSign", value: function (t) {
                        for (var e = this, n = t.serialize(), r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) i[o - 1] = arguments[o];
                        i.forEach((function (t) {
                            var r = mr(n, t.secretKey);
                            e._addSignature(t.publicKey, br(r))
                        }))
                    }
                }, {
                    key: "addSignature", value: function (t, e) {
                        this._compile(), this._addSignature(t, e)
                    }
                }, {
                    key: "_addSignature", value: function (t, e) {
                        Ur(64 === e.length);
                        var n = this.signatures.findIndex((function (e) {
                            return t.equals(e.publicKey)
                        }));
                        if (n < 0) throw new Error("unknown signer: ".concat(t.toString()));
                        this.signatures[n].signature = q.Buffer.from(e)
                    }
                }, {
                    key: "verifySignatures", value: function (t) {
                        return this._verifySignatures(this.serializeMessage(), void 0 === t || t)
                    }
                }, {
                    key: "_verifySignatures", value: function (t, e) {
                        var n, r = Vr(this.signatures);
                        try {
                            for (r.s(); !(n = r.n()).done;) {
                                var i = n.value, o = i.signature, a = i.publicKey;
                                if (null === o) {
                                    if (e) return !1
                                } else if (!vr(o, t, a.toBytes())) return !1
                            }
                        } catch (t) {
                            r.e(t)
                        } finally {
                            r.f()
                        }
                        return !0
                    }
                }, {
                    key: "serialize", value: function (t) {
                        var e = Object.assign({requireAllSignatures: !0, verifySignatures: !0}, t),
                            n = e.requireAllSignatures, r = e.verifySignatures, i = this.serializeMessage();
                        if (r && !this._verifySignatures(i, n)) throw new Error("Signature verification failed");
                        return this._serialize(i)
                    }
                }, {
                    key: "_serialize", value: function (t) {
                        var e = this.signatures, n = [];
                        Rr(n, e.length);
                        var r = n.length + 64 * e.length + t.length, i = q.Buffer.alloc(r);
                        return Ur(e.length < 256), q.Buffer.from(n).copy(i, 0), e.forEach((function (t, e) {
                            var r = t.signature;
                            null !== r && (Ur(64 === r.length, "signature has invalid length"), q.Buffer.from(r).copy(i, n.length + 64 * e))
                        })), t.copy(i, n.length + 64 * e.length), Ur(i.length <= Sr, "Transaction too large: ".concat(i.length, " > ").concat(Sr)), i
                    }
                }, {
                    key: "keys", get: function () {
                        return Ur(1 === this.instructions.length), this.instructions[0].keys.map((function (t) {
                            return t.pubkey
                        }))
                    }
                }, {
                    key: "programId", get: function () {
                        return Ur(1 === this.instructions.length), this.instructions[0].programId
                    }
                }, {
                    key: "data", get: function () {
                        return Ur(1 === this.instructions.length), this.instructions[0].data
                    }
                }], [{
                    key: "from", value: function (e) {
                        for (var n = an(e), r = Cr(n), i = [], o = 0; o < r; o++) {
                            var a = n.slice(0, 64);
                            n = n.slice(64), i.push(De().encode(q.Buffer.from(a)))
                        }
                        return t.populate(qr.from(n), i)
                    }
                }, {
                    key: "populate", value: function (e) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], r = new t;
                        return r.recentBlockhash = e.recentBlockhash, e.header.numRequiredSignatures > 0 && (r.feePayer = e.accountKeys[0]), n.forEach((function (t, n) {
                            var i = {
                                signature: t == De().encode(Gr) ? null : De().decode(t),
                                publicKey: e.accountKeys[n]
                            };
                            r.signatures.push(i)
                        })), e.instructions.forEach((function (t) {
                            var n = t.accounts.map((function (t) {
                                var n = e.accountKeys[t];
                                return {
                                    pubkey: n, isSigner: r.signatures.some((function (t) {
                                        return t.publicKey.toString() === n.toString()
                                    })) || e.isAccountSigner(t), isWritable: e.isAccountWritable(t)
                                }
                            }));
                            r.instructions.push(new Yr({
                                keys: n,
                                programId: e.accountKeys[t.programIdIndex],
                                data: De().decode(t.data)
                            }))
                        })), r._message = e, r._json = r.toJSON(), r
                    }
                }]), t
            }();

            function Qr(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
                return r
            }

            var ti = function () {
                    function t(e, n) {
                        if (R(this, t), this.signatures = void 0, this.message = void 0, void 0 !== n) Ur(n.length === e.header.numRequiredSignatures, "Expected signatures length to be equal to the number of required signatures"), this.signatures = n; else {
                            for (var r = [], i = 0; i < e.header.numRequiredSignatures; i++) r.push(new Uint8Array(64));
                            this.signatures = r
                        }
                        this.message = e
                    }

                    return W(t, [{
                        key: "version", get: function () {
                            return this.message.version
                        }
                    }, {
                        key: "serialize", value: function () {
                            var t = this.message.serialize(), e = Array();
                            Rr(e, this.signatures.length);
                            var n = Qe.n_([Qe.Ik(e.length, "encodedSignaturesLength"), Qe.A9(Pr(), this.signatures.length, "signatures"), Qe.Ik(t.length, "serializedMessage")]),
                                r = new Uint8Array(2048), i = n.encode({
                                    encodedSignaturesLength: new Uint8Array(e),
                                    signatures: this.signatures,
                                    serializedMessage: t
                                }, r);
                            return r.slice(0, i)
                        }
                    }, {
                        key: "sign", value: function (t) {
                            var e, n = this, r = this.message.serialize(),
                                i = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures),
                                o = function (t, e) {
                                    var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                                    if (!n) {
                                        if (Array.isArray(t) || (n = function (t, e) {
                                            if (t) {
                                                if ("string" == typeof t) return Qr(t, e);
                                                var n = Object.prototype.toString.call(t).slice(8, -1);
                                                return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Qr(t, e) : void 0
                                            }
                                        }(t))) {
                                            n && (t = n);
                                            var r = 0, i = function () {
                                            };
                                            return {
                                                s: i, n: function () {
                                                    return r >= t.length ? {done: !0} : {done: !1, value: t[r++]}
                                                }, e: function (t) {
                                                    throw t
                                                }, f: i
                                            }
                                        }
                                        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                    }
                                    var o, a = !0, s = !1;
                                    return {
                                        s: function () {
                                            n = n.call(t)
                                        }, n: function () {
                                            var t = n.next();
                                            return a = t.done, t
                                        }, e: function (t) {
                                            s = !0, o = t
                                        }, f: function () {
                                            try {
                                                a || null == n.return || n.return()
                                            } finally {
                                                if (s) throw o
                                            }
                                        }
                                    }
                                }(t);
                            try {
                                var a = function () {
                                    var t = e.value, o = i.findIndex((function (e) {
                                        return e.equals(t.publicKey)
                                    }));
                                    Ur(o >= 0, "Cannot sign with non signer key ".concat(t.publicKey.toBase58())), n.signatures[o] = mr(r, t.secretKey)
                                };
                                for (o.s(); !(e = o.n()).done;) a()
                            } catch (t) {
                                o.e(t)
                            } finally {
                                o.f()
                            }
                        }
                    }, {
                        key: "addSignature", value: function (t, e) {
                            Ur(64 === e.byteLength, "Signature must be 64 bytes long");
                            var n = this.message.staticAccountKeys.slice(0, this.message.header.numRequiredSignatures).findIndex((function (e) {
                                return e.equals(t)
                            }));
                            Ur(n >= 0, "Can not add signature; `".concat(t.toBase58(), "` is not required to sign this transaction")), this.signatures[n] = e
                        }
                    }], [{
                        key: "deserialize", value: function (e) {
                            for (var n = an(e), r = [], i = Cr(n), o = 0; o < i; o++) r.push(new Uint8Array(n.splice(0, 64)));
                            return new t(Hr.deserialize(new Uint8Array(n)), r)
                        }
                    }]), t
                }(), ei = new Ar("SysvarC1ock11111111111111111111111111111111"),
                ni = (new Ar("SysvarEpochSchedu1e111111111111111111111111"), new Ar("Sysvar1nstructions1111111111111111111111111"), new Ar("SysvarRecentB1ockHashes11111111111111111111")),
                ri = new Ar("SysvarRent111111111111111111111111111111111"),
                ii = (new Ar("SysvarRewards111111111111111111111111111111"), new Ar("SysvarS1otHashes111111111111111111111111111"), new Ar("SysvarS1otHistory11111111111111111111111111"), new Ar("SysvarStakeHistory1111111111111111111111111"));

            function oi(t, e, n, r) {
                return ai.apply(this, arguments)
            }

            function ai() {
                return ai = $e(Ne().mark((function t(e, n, r, i) {
                    var o, a, s, u, c;
                    return Ne().wrap((function (t) {
                        for (; ;) switch (t.prev = t.next) {
                            case 0:
                                return o = i && {
                                    skipPreflight: i.skipPreflight,
                                    preflightCommitment: i.preflightCommitment || i.commitment,
                                    maxRetries: i.maxRetries,
                                    minContextSlot: i.minContextSlot
                                }, t.next = 3, e.sendTransaction(n, r, o);
                            case 3:
                                if (a = t.sent, null == n.recentBlockhash || null == n.lastValidBlockHeight) {
                                    t.next = 10;
                                    break
                                }
                                return t.next = 7, e.confirmTransaction({
                                    abortSignal: null == i ? void 0 : i.abortSignal,
                                    signature: a,
                                    blockhash: n.recentBlockhash,
                                    lastValidBlockHeight: n.lastValidBlockHeight
                                }, i && i.commitment);
                            case 7:
                                s = t.sent.value, t.next = 22;
                                break;
                            case 10:
                                if (null == n.minNonceContextSlot || null == n.nonceInfo) {
                                    t.next = 18;
                                    break
                                }
                                return u = n.nonceInfo.nonceInstruction, c = u.keys[0].pubkey, t.next = 15, e.confirmTransaction({
                                    abortSignal: null == i ? void 0 : i.abortSignal,
                                    minContextSlot: n.minNonceContextSlot,
                                    nonceAccountPubkey: c,
                                    nonceValue: n.nonceInfo.nonce,
                                    signature: a
                                }, i && i.commitment);
                            case 15:
                                s = t.sent.value, t.next = 22;
                                break;
                            case 18:
                                return null != (null == i ? void 0 : i.abortSignal) && console.warn("sendAndConfirmTransaction(): A transaction with a deprecated confirmation strategy was supplied along with an `abortSignal`. Only transactions having `lastValidBlockHeight` or a combination of `nonceInfo` and `minNonceContextSlot` are abortable."), t.next = 21, e.confirmTransaction(a, i && i.commitment);
                            case 21:
                                s = t.sent.value;
                            case 22:
                                if (!s.err) {
                                    t.next = 24;
                                    break
                                }
                                throw new Error("Transaction ".concat(a, " failed (").concat(JSON.stringify(s), ")"));
                            case 24:
                                return t.abrupt("return", a);
                            case 25:
                            case"end":
                                return t.stop()
                        }
                    }), t)
                }))), ai.apply(this, arguments)
            }

            function si(t) {
                return new Promise((function (e) {
                    return setTimeout(e, t)
                }))
            }

            function ui(t, e) {
                var n = t.layout.span >= 0 ? t.layout.span : jr(t, e), r = q.Buffer.alloc(n),
                    i = Object.assign({instruction: t.index}, e);
                return t.layout.encode(i, r), r
            }

            var ci = Qe._O("lamportsPerSignature"),
                fi = Qe.n_([Qe.Jq("version"), Qe.Jq("state"), Lr("authorizedPubkey"), Lr("nonce"), Qe.n_([ci], "feeCalculator")]).span,
                li = function (t) {
                    var e = (0, Qe.Ik)(8, t), n = function (t) {
                        return {decode: t.decode.bind(t), encode: t.encode.bind(t)}
                    }(e), r = n.encode, i = n.decode, o = e;
                    return o.decode = function (t, e) {
                        var n = i(t, e);
                        return (0, rn.oU)(q.Buffer.from(n))
                    }, o.encode = function (t, e, n) {
                        var i = (0, rn.k$)(t, 8);
                        return r(i, e, n)
                    }, o
                }, hi = Object.freeze({
                    Create: {
                        index: 0,
                        layout: Qe.n_([Qe.Jq("instruction"), Qe.gM("lamports"), Qe.gM("space"), Lr("programId")])
                    },
                    Assign: {index: 1, layout: Qe.n_([Qe.Jq("instruction"), Lr("programId")])},
                    Transfer: {index: 2, layout: Qe.n_([Qe.Jq("instruction"), li("lamports")])},
                    CreateWithSeed: {
                        index: 3,
                        layout: Qe.n_([Qe.Jq("instruction"), Lr("base"), $r("seed"), Qe.gM("lamports"), Qe.gM("space"), Lr("programId")])
                    },
                    AdvanceNonceAccount: {index: 4, layout: Qe.n_([Qe.Jq("instruction")])},
                    WithdrawNonceAccount: {index: 5, layout: Qe.n_([Qe.Jq("instruction"), Qe.gM("lamports")])},
                    InitializeNonceAccount: {index: 6, layout: Qe.n_([Qe.Jq("instruction"), Lr("authorized")])},
                    AuthorizeNonceAccount: {index: 7, layout: Qe.n_([Qe.Jq("instruction"), Lr("authorized")])},
                    Allocate: {index: 8, layout: Qe.n_([Qe.Jq("instruction"), Qe.gM("space")])},
                    AllocateWithSeed: {
                        index: 9,
                        layout: Qe.n_([Qe.Jq("instruction"), Lr("base"), $r("seed"), Qe.gM("space"), Lr("programId")])
                    },
                    AssignWithSeed: {
                        index: 10,
                        layout: Qe.n_([Qe.Jq("instruction"), Lr("base"), $r("seed"), Lr("programId")])
                    },
                    TransferWithSeed: {
                        index: 11,
                        layout: Qe.n_([Qe.Jq("instruction"), li("lamports"), $r("seed"), Lr("programId")])
                    },
                    UpgradeNonceAccount: {index: 12, layout: Qe.n_([Qe.Jq("instruction")])}
                }), di = function () {
                    function t() {
                        R(this, t)
                    }

                    return W(t, null, [{
                        key: "createAccount", value: function (t) {
                            var e = ui(hi.Create, {
                                lamports: t.lamports,
                                space: t.space,
                                programId: br(t.programId.toBuffer())
                            });
                            return new Yr({
                                keys: [{
                                    pubkey: t.fromPubkey,
                                    isSigner: !0,
                                    isWritable: !0
                                }, {pubkey: t.newAccountPubkey, isSigner: !0, isWritable: !0}],
                                programId: this.programId,
                                data: e
                            })
                        }
                    }, {
                        key: "transfer", value: function (t) {
                            var e, n;
                            return "basePubkey" in t ? (e = ui(hi.TransferWithSeed, {
                                lamports: BigInt(t.lamports),
                                seed: t.seed,
                                programId: br(t.programId.toBuffer())
                            }), n = [{pubkey: t.fromPubkey, isSigner: !1, isWritable: !0}, {
                                pubkey: t.basePubkey,
                                isSigner: !0,
                                isWritable: !1
                            }, {
                                pubkey: t.toPubkey,
                                isSigner: !1,
                                isWritable: !0
                            }]) : (e = ui(hi.Transfer, {lamports: BigInt(t.lamports)}), n = [{
                                pubkey: t.fromPubkey,
                                isSigner: !0,
                                isWritable: !0
                            }, {pubkey: t.toPubkey, isSigner: !1, isWritable: !0}]), new Yr({
                                keys: n,
                                programId: this.programId,
                                data: e
                            })
                        }
                    }, {
                        key: "assign", value: function (t) {
                            var e, n;
                            return "basePubkey" in t ? (e = ui(hi.AssignWithSeed, {
                                base: br(t.basePubkey.toBuffer()),
                                seed: t.seed,
                                programId: br(t.programId.toBuffer())
                            }), n = [{pubkey: t.accountPubkey, isSigner: !1, isWritable: !0}, {
                                pubkey: t.basePubkey,
                                isSigner: !0,
                                isWritable: !1
                            }]) : (e = ui(hi.Assign, {programId: br(t.programId.toBuffer())}), n = [{
                                pubkey: t.accountPubkey,
                                isSigner: !0,
                                isWritable: !0
                            }]), new Yr({keys: n, programId: this.programId, data: e})
                        }
                    }, {
                        key: "createAccountWithSeed", value: function (t) {
                            var e = ui(hi.CreateWithSeed, {
                                base: br(t.basePubkey.toBuffer()),
                                seed: t.seed,
                                lamports: t.lamports,
                                space: t.space,
                                programId: br(t.programId.toBuffer())
                            }), n = [{pubkey: t.fromPubkey, isSigner: !0, isWritable: !0}, {
                                pubkey: t.newAccountPubkey,
                                isSigner: !1,
                                isWritable: !0
                            }];
                            return t.basePubkey != t.fromPubkey && n.push({
                                pubkey: t.basePubkey,
                                isSigner: !0,
                                isWritable: !1
                            }), new Yr({keys: n, programId: this.programId, data: e})
                        }
                    }, {
                        key: "createNonceAccount", value: function (e) {
                            var n = new Xr;
                            "basePubkey" in e && "seed" in e ? n.add(t.createAccountWithSeed({
                                fromPubkey: e.fromPubkey,
                                newAccountPubkey: e.noncePubkey,
                                basePubkey: e.basePubkey,
                                seed: e.seed,
                                lamports: e.lamports,
                                space: fi,
                                programId: this.programId
                            })) : n.add(t.createAccount({
                                fromPubkey: e.fromPubkey,
                                newAccountPubkey: e.noncePubkey,
                                lamports: e.lamports,
                                space: fi,
                                programId: this.programId
                            }));
                            var r = {noncePubkey: e.noncePubkey, authorizedPubkey: e.authorizedPubkey};
                            return n.add(this.nonceInitialize(r)), n
                        }
                    }, {
                        key: "nonceInitialize", value: function (t) {
                            var e = ui(hi.InitializeNonceAccount, {authorized: br(t.authorizedPubkey.toBuffer())}), n = {
                                keys: [{pubkey: t.noncePubkey, isSigner: !1, isWritable: !0}, {
                                    pubkey: ni,
                                    isSigner: !1,
                                    isWritable: !1
                                }, {pubkey: ri, isSigner: !1, isWritable: !1}], programId: this.programId, data: e
                            };
                            return new Yr(n)
                        }
                    }, {
                        key: "nonceAdvance", value: function (t) {
                            var e = ui(hi.AdvanceNonceAccount), n = {
                                keys: [{pubkey: t.noncePubkey, isSigner: !1, isWritable: !0}, {
                                    pubkey: ni,
                                    isSigner: !1,
                                    isWritable: !1
                                }, {pubkey: t.authorizedPubkey, isSigner: !0, isWritable: !1}],
                                programId: this.programId,
                                data: e
                            };
                            return new Yr(n)
                        }
                    }, {
                        key: "nonceWithdraw", value: function (t) {
                            var e = ui(hi.WithdrawNonceAccount, {lamports: t.lamports});
                            return new Yr({
                                keys: [{
                                    pubkey: t.noncePubkey,
                                    isSigner: !1,
                                    isWritable: !0
                                }, {pubkey: t.toPubkey, isSigner: !1, isWritable: !0}, {
                                    pubkey: ni,
                                    isSigner: !1,
                                    isWritable: !1
                                }, {pubkey: ri, isSigner: !1, isWritable: !1}, {
                                    pubkey: t.authorizedPubkey,
                                    isSigner: !0,
                                    isWritable: !1
                                }], programId: this.programId, data: e
                            })
                        }
                    }, {
                        key: "nonceAuthorize", value: function (t) {
                            var e = ui(hi.AuthorizeNonceAccount, {authorized: br(t.newAuthorizedPubkey.toBuffer())});
                            return new Yr({
                                keys: [{
                                    pubkey: t.noncePubkey,
                                    isSigner: !1,
                                    isWritable: !0
                                }, {pubkey: t.authorizedPubkey, isSigner: !0, isWritable: !1}],
                                programId: this.programId,
                                data: e
                            })
                        }
                    }, {
                        key: "allocate", value: function (t) {
                            var e, n;
                            return "basePubkey" in t ? (e = ui(hi.AllocateWithSeed, {
                                base: br(t.basePubkey.toBuffer()),
                                seed: t.seed,
                                space: t.space,
                                programId: br(t.programId.toBuffer())
                            }), n = [{pubkey: t.accountPubkey, isSigner: !1, isWritable: !0}, {
                                pubkey: t.basePubkey,
                                isSigner: !0,
                                isWritable: !1
                            }]) : (e = ui(hi.Allocate, {space: t.space}), n = [{
                                pubkey: t.accountPubkey,
                                isSigner: !0,
                                isWritable: !0
                            }]), new Yr({keys: n, programId: this.programId, data: e})
                        }
                    }]), t
                }();
            di.programId = new Ar("11111111111111111111111111111111");
            var pi = function () {
                function t() {
                    R(this, t)
                }

                var e;
                return W(t, null, [{
                    key: "getMinNumSignatures", value: function (e) {
                        return 2 * (Math.ceil(e / t.chunkSize) + 1 + 1)
                    }
                }, {
                    key: "load", value: (e = $e(Ne().mark((function e(n, r, i, o, a) {
                        var s, u, c, f, l, h, d, p, g, y, m, v, b, w, x, k, E, A, S;
                        return Ne().wrap((function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, n.getMinimumBalanceForRentExemption(a.length);
                                case 2:
                                    return s = e.sent, e.next = 5, n.getAccountInfo(i.publicKey, "confirmed");
                                case 5:
                                    if (u = e.sent, c = null, null === u) {
                                        e.next = 16;
                                        break
                                    }
                                    if (!u.executable) {
                                        e.next = 11;
                                        break
                                    }
                                    return console.error("Program load failed, account is already executable"), e.abrupt("return", !1);
                                case 11:
                                    u.data.length !== a.length && (c = c || new Xr).add(di.allocate({
                                        accountPubkey: i.publicKey,
                                        space: a.length
                                    })), u.owner.equals(o) || (c = c || new Xr).add(di.assign({
                                        accountPubkey: i.publicKey,
                                        programId: o
                                    })), u.lamports < s && (c = c || new Xr).add(di.transfer({
                                        fromPubkey: r.publicKey,
                                        toPubkey: i.publicKey,
                                        lamports: s - u.lamports
                                    })), e.next = 17;
                                    break;
                                case 16:
                                    c = (new Xr).add(di.createAccount({
                                        fromPubkey: r.publicKey,
                                        newAccountPubkey: i.publicKey,
                                        lamports: s > 0 ? s : 1,
                                        space: a.length,
                                        programId: o
                                    }));
                                case 17:
                                    if (null === c) {
                                        e.next = 20;
                                        break
                                    }
                                    return e.next = 20, oi(n, c, [r, i], {commitment: "confirmed"});
                                case 20:
                                    f = Qe.n_([Qe.Jq("instruction"), Qe.Jq("offset"), Qe.Jq("bytesLength"), Qe.Jq("bytesLengthPadding"), Qe.A9(Qe.u8("byte"), Qe.cv(Qe.Jq(), -8), "bytes")]), l = t.chunkSize, h = 0, d = a, p = [];
                                case 25:
                                    if (!(d.length > 0)) {
                                        e.next = 39;
                                        break
                                    }
                                    if (g = d.slice(0, l), y = q.Buffer.alloc(l + 16), f.encode({
                                        instruction: 0,
                                        offset: h,
                                        bytes: g,
                                        bytesLength: 0,
                                        bytesLengthPadding: 0
                                    }, y), m = (new Xr).add({
                                        keys: [{
                                            pubkey: i.publicKey,
                                            isSigner: !0,
                                            isWritable: !0
                                        }], programId: o, data: y
                                    }), p.push(oi(n, m, [r, i], {commitment: "confirmed"})), !n._rpcEndpoint.includes("solana.com")) {
                                        e.next = 35;
                                        break
                                    }
                                    return e.next = 35, si(250);
                                case 35:
                                    h += l, d = d.slice(l), e.next = 25;
                                    break;
                                case 39:
                                    return e.next = 41, Promise.all(p);
                                case 41:
                                    return v = Qe.n_([Qe.Jq("instruction")]), b = q.Buffer.alloc(v.span), v.encode({instruction: 1}, b), w = (new Xr).add({
                                        keys: [{
                                            pubkey: i.publicKey,
                                            isSigner: !0,
                                            isWritable: !0
                                        }, {pubkey: ri, isSigner: !1, isWritable: !1}], programId: o, data: b
                                    }), x = "processed", e.next = 48, n.sendTransaction(w, [r, i], {preflightCommitment: x});
                                case 48:
                                    return k = e.sent, e.next = 51, n.confirmTransaction({
                                        signature: k,
                                        lastValidBlockHeight: w.lastValidBlockHeight,
                                        blockhash: w.recentBlockhash
                                    }, x);
                                case 51:
                                    if (E = e.sent, A = E.context, !(S = E.value).err) {
                                        e.next = 56;
                                        break
                                    }
                                    throw new Error("Transaction ".concat(k, " failed (").concat(JSON.stringify(S), ")"));
                                case 56:
                                    return e.prev = 57, e.next = 60, n.getSlot({commitment: x});
                                case 60:
                                    if (!(e.sent > A.slot)) {
                                        e.next = 63;
                                        break
                                    }
                                    return e.abrupt("break", 71);
                                case 63:
                                    e.next = 67;
                                    break;
                                case 65:
                                    e.prev = 65, e.t0 = e.catch(57);
                                case 67:
                                    return e.next = 69, new Promise((function (t) {
                                        return setTimeout(t, Math.round(200))
                                    }));
                                case 69:
                                    e.next = 56;
                                    break;
                                case 71:
                                    return e.abrupt("return", !0);
                                case 72:
                                case"end":
                                    return e.stop()
                            }
                        }), e, null, [[57, 65]])
                    }))), function (t, n, r, i, o) {
                        return e.apply(this, arguments)
                    })
                }]), t
            }();

            function gi(t, e) {
                var n = Object.keys(t);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(t);
                    e && (r = r.filter((function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function yi(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {};
                    e % 2 ? gi(Object(n), !0).forEach((function (e) {
                        on(t, e, n[e])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : gi(Object(n)).forEach((function (e) {
                        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
                    }))
                }
                return t
            }

            pi.chunkSize = 932, new Ar("BPFLoader2111111111111111111111111111111111"), Object.prototype.toString, Object.keys, globalThis.fetch, Qe.n_([Qe.Jq("typeIndex"), li("deactivationSlot"), Qe._O("lastExtendedSlot"), Qe.u8("lastExtendedStartIndex"), Qe.u8(), Qe.A9(Lr(), Qe.cv(Qe.u8(), -1), "authority")]);
            var mi = Tn(wn(Ar), In(), (function (t) {
                return new Ar(t)
            })), vi = Bn([In(), xn("base64")]), bi = Tn(wn(q.Buffer), vi, (function (t) {
                return q.Buffer.from(t[0], "base64")
            }));

            function wi(t) {
                return On([Mn({jsonrpc: xn("2.0"), id: In(), result: t}), Mn({
                    jsonrpc: xn("2.0"),
                    id: In(),
                    error: Mn({code: _n(), message: In(), data: An(mn("any", (() => !0)))})
                })])
            }

            var xi = wi(_n());

            function ki(t) {
                return Tn(wi(t), xi, (function (e) {
                    return "error" in e ? e : yi(yi({}, e), {}, {result: pn(e.result, t)})
                }))
            }

            function Ei(t) {
                return ki(Mn({context: Mn({slot: En()}), value: t}))
            }

            function Ai(t) {
                return Mn({context: Mn({slot: En()}), value: t})
            }

            var Si = Mn({foundation: En(), foundationTerm: En(), initial: En(), taper: En(), terminal: En()}),
                Ii = (ki(vn(kn(Mn({
                    epoch: En(),
                    effectiveSlot: En(),
                    amount: En(),
                    postBalance: En(),
                    commission: An(kn(En()))
                })))), vn(Mn({slot: En(), prioritizationFee: En()}))),
                Bi = Mn({total: En(), validator: En(), foundation: En(), epoch: En()}), Mi = Mn({
                    epoch: En(),
                    slotIndex: En(),
                    slotsInEpoch: En(),
                    absoluteSlot: En(),
                    blockHeight: An(En()),
                    transactionCount: An(En())
                }), Oi = Mn({
                    slotsPerEpoch: En(),
                    leaderScheduleSlotOffset: En(),
                    warmup: bn(),
                    firstNormalEpoch: En(),
                    firstNormalSlot: En()
                }), _i = Sn(In(), vn(En())), Ti = kn(On([Mn({}), In()])), Li = Mn({err: Ti}), Pi = xn("receivedSignature");
            Mn({"solana-core": In(), "feature-set": An(En())}), Ei(Mn({
                err: kn(On([Mn({}), In()])),
                logs: kn(vn(In())),
                accounts: An(kn(vn(kn(Mn({
                    executable: bn(),
                    owner: In(),
                    lamports: En(),
                    data: vn(In()),
                    rentEpoch: An(En())
                }))))),
                unitsConsumed: An(En()),
                returnData: An(kn(Mn({programId: In(), data: Bn([In(), xn("base64")])})))
            })), Ei(Mn({
                byIdentity: Sn(In(), vn(En())),
                range: Mn({firstSlot: En(), lastSlot: En()})
            })), ki(Si), ki(Bi), ki(Ii), ki(Mi), ki(Oi), ki(_i), ki(En()), Ei(Mn({
                total: En(),
                circulating: En(),
                nonCirculating: En(),
                nonCirculatingAccounts: vn(mi)
            }));
            var $i = Mn({amount: In(), uiAmount: kn(En()), decimals: En(), uiAmountString: An(In())}), ji = (Ei(vn(Mn({
                    address: mi,
                    amount: In(),
                    uiAmount: kn(En()),
                    decimals: En(),
                    uiAmountString: An(In())
                }))), Ei(vn(Mn({
                    pubkey: mi,
                    account: Mn({executable: bn(), owner: mi, lamports: En(), data: bi, rentEpoch: En()})
                }))), Mn({program: In(), parsed: _n(), space: En()})), Ci = (Ei(vn(Mn({
                    pubkey: mi,
                    account: Mn({executable: bn(), owner: mi, lamports: En(), data: ji, rentEpoch: En()})
                }))), Ei(vn(Mn({lamports: En(), address: mi}))), Mn({
                    executable: bn(),
                    owner: mi,
                    lamports: En(),
                    data: bi,
                    rentEpoch: En()
                })), Ri = (Mn({pubkey: mi, account: Ci}), Tn(On([wn(q.Buffer), ji]), On([vi, ji]), (function (t) {
                    return Array.isArray(t) ? pn(t, bi) : t
                }))), Ui = Mn({executable: bn(), owner: mi, lamports: En(), data: Ri, rentEpoch: En()}), zi = (Mn({
                    pubkey: mi,
                    account: Ui
                }), Mn({
                    state: On([xn("active"), xn("inactive"), xn("activating"), xn("deactivating")]),
                    active: En(),
                    inactive: En()
                }), ki(vn(Mn({
                    signature: In(),
                    slot: En(),
                    err: Ti,
                    memo: kn(In()),
                    blockTime: An(kn(En()))
                }))), ki(vn(Mn({
                    signature: In(),
                    slot: En(),
                    err: Ti,
                    memo: kn(In()),
                    blockTime: An(kn(En()))
                }))), Mn({subscription: En(), result: Ai(Ci)}), Mn({pubkey: mi, account: Ci})),
                Ni = (Mn({subscription: En(), result: Ai(zi)}), Mn({parent: En(), slot: En(), root: En()})), Wi = (Mn({
                    subscription: En(),
                    result: Ni
                }), On([Mn({
                    type: On([xn("firstShredReceived"), xn("completed"), xn("optimisticConfirmation"), xn("root")]),
                    slot: En(),
                    timestamp: En()
                }), Mn({type: xn("createdBank"), parent: En(), slot: En(), timestamp: En()}), Mn({
                    type: xn("frozen"),
                    slot: En(),
                    timestamp: En(),
                    stats: Mn({
                        numTransactionEntries: En(),
                        numSuccessfulTransactions: En(),
                        numFailedTransactions: En(),
                        maxTransactionsPerEntry: En()
                    })
                }), Mn({type: xn("dead"), slot: En(), timestamp: En(), err: In()})])),
                qi = (Mn({subscription: En(), result: Wi}), Mn({
                    subscription: En(),
                    result: Ai(On([Li, Pi]))
                }), Mn({subscription: En(), result: En()}), Mn({
                    pubkey: In(),
                    gossip: kn(In()),
                    tpu: kn(In()),
                    rpc: kn(In()),
                    version: kn(In())
                }), Mn({
                    votePubkey: In(),
                    nodePubkey: In(),
                    activatedStake: En(),
                    epochVoteAccount: bn(),
                    epochCredits: vn(Bn([En(), En(), En()])),
                    commission: En(),
                    lastVote: En(),
                    rootSlot: kn(En())
                })), Ki = (ki(Mn({
                    current: vn(qi),
                    delinquent: vn(qi)
                })), On([xn("processed"), xn("confirmed"), xn("finalized")])),
                Di = Mn({slot: En(), confirmations: kn(En()), err: Ti, confirmationStatus: An(Ki)}),
                Fi = (Ei(vn(kn(Di))), ki(En()), Mn({
                    accountKey: mi,
                    writableIndexes: vn(En()),
                    readonlyIndexes: vn(En())
                })), Hi = Mn({
                    signatures: vn(In()),
                    message: Mn({
                        accountKeys: vn(In()),
                        header: Mn({
                            numRequiredSignatures: En(),
                            numReadonlySignedAccounts: En(),
                            numReadonlyUnsignedAccounts: En()
                        }),
                        instructions: vn(Mn({accounts: vn(En()), data: In(), programIdIndex: En()})),
                        recentBlockhash: In(),
                        addressTableLookups: An(vn(Fi))
                    })
                }), Vi = Mn({
                    pubkey: mi,
                    signer: bn(),
                    writable: bn(),
                    source: An(On([xn("transaction"), xn("lookupTable")]))
                }), Ji = Mn({accountKeys: vn(Vi), signatures: vn(In())}),
                Zi = Mn({parsed: _n(), program: In(), programId: mi}),
                Gi = Mn({accounts: vn(mi), data: In(), programId: mi}),
                Yi = Tn(On([Gi, Zi]), On([Mn({parsed: _n(), program: In(), programId: In()}), Mn({
                    accounts: vn(In()),
                    data: In(),
                    programId: In()
                })]), (function (t) {
                    return pn(t, "accounts" in t ? Gi : Zi)
                })), Xi = Mn({
                    signatures: vn(In()),
                    message: Mn({
                        accountKeys: vn(Vi),
                        instructions: vn(Yi),
                        recentBlockhash: In(),
                        addressTableLookups: An(kn(vn(Fi)))
                    })
                }), Qi = Mn({accountIndex: En(), mint: In(), owner: An(In()), uiTokenAmount: $i}),
                to = Mn({writable: vn(mi), readonly: vn(mi)}), eo = Mn({
                    err: Ti,
                    fee: En(),
                    innerInstructions: An(kn(vn(Mn({
                        index: En(),
                        instructions: vn(Mn({accounts: vn(En()), data: In(), programIdIndex: En()}))
                    })))),
                    preBalances: vn(En()),
                    postBalances: vn(En()),
                    logMessages: An(kn(vn(In()))),
                    preTokenBalances: An(kn(vn(Qi))),
                    postTokenBalances: An(kn(vn(Qi))),
                    loadedAddresses: An(to),
                    computeUnitsConsumed: An(En())
                }), no = Mn({
                    err: Ti,
                    fee: En(),
                    innerInstructions: An(kn(vn(Mn({index: En(), instructions: vn(Yi)})))),
                    preBalances: vn(En()),
                    postBalances: vn(En()),
                    logMessages: An(kn(vn(In()))),
                    preTokenBalances: An(kn(vn(Qi))),
                    postTokenBalances: An(kn(vn(Qi))),
                    loadedAddresses: An(to),
                    computeUnitsConsumed: An(En())
                }), ro = On([xn(0), xn("legacy")]), io = Mn({
                    pubkey: In(),
                    lamports: En(),
                    postBalance: kn(En()),
                    rewardType: kn(In()),
                    commission: An(kn(En()))
                }), oo = (ki(kn(Mn({
                    blockhash: In(),
                    previousBlockhash: In(),
                    parentSlot: En(),
                    transactions: vn(Mn({transaction: Hi, meta: kn(eo), version: An(ro)})),
                    rewards: An(vn(io)),
                    blockTime: kn(En()),
                    blockHeight: kn(En())
                }))), ki(kn(Mn({
                    blockhash: In(),
                    previousBlockhash: In(),
                    parentSlot: En(),
                    rewards: An(vn(io)),
                    blockTime: kn(En()),
                    blockHeight: kn(En())
                }))), ki(kn(Mn({
                    blockhash: In(),
                    previousBlockhash: In(),
                    parentSlot: En(),
                    transactions: vn(Mn({transaction: Ji, meta: kn(eo), version: An(ro)})),
                    rewards: An(vn(io)),
                    blockTime: kn(En()),
                    blockHeight: kn(En())
                }))), ki(kn(Mn({
                    blockhash: In(),
                    previousBlockhash: In(),
                    parentSlot: En(),
                    transactions: vn(Mn({transaction: Xi, meta: kn(no), version: An(ro)})),
                    rewards: An(vn(io)),
                    blockTime: kn(En()),
                    blockHeight: kn(En())
                }))), ki(kn(Mn({
                    blockhash: In(),
                    previousBlockhash: In(),
                    parentSlot: En(),
                    transactions: vn(Mn({transaction: Ji, meta: kn(no), version: An(ro)})),
                    rewards: An(vn(io)),
                    blockTime: kn(En()),
                    blockHeight: kn(En())
                }))), ki(kn(Mn({
                    blockhash: In(),
                    previousBlockhash: In(),
                    parentSlot: En(),
                    rewards: An(vn(io)),
                    blockTime: kn(En()),
                    blockHeight: kn(En())
                }))), ki(kn(Mn({
                    blockhash: In(),
                    previousBlockhash: In(),
                    parentSlot: En(),
                    transactions: vn(Mn({transaction: Hi, meta: kn(eo)})),
                    rewards: An(vn(io)),
                    blockTime: kn(En())
                }))), ki(kn(Mn({
                    blockhash: In(),
                    previousBlockhash: In(),
                    parentSlot: En(),
                    signatures: vn(In()),
                    blockTime: kn(En())
                }))), ki(kn(Mn({
                    slot: En(),
                    meta: eo,
                    blockTime: An(kn(En())),
                    transaction: Hi,
                    version: An(ro)
                }))), ki(kn(Mn({
                    slot: En(),
                    transaction: Xi,
                    meta: kn(no),
                    blockTime: An(kn(En())),
                    version: An(ro)
                }))), Ei(Mn({blockhash: In(), feeCalculator: Mn({lamportsPerSignature: En()})})), Ei(Mn({
                    blockhash: In(),
                    lastValidBlockHeight: En()
                })), Ei(bn()), ki(vn(Mn({
                    slot: En(),
                    numTransactions: En(),
                    numSlots: En(),
                    samplePeriodSecs: En()
                }))), Ei(kn(Mn({feeCalculator: Mn({lamportsPerSignature: En()})}))), ki(In()), ki(In()), Mn({
                    err: Ti,
                    logs: vn(In()),
                    signature: In()
                })), ao = (Mn({result: Ai(oo), subscription: En()}), "js/".concat("0.0.0-development"), function () {
                    function t(e) {
                        R(this, t), this._keypair = void 0, this._keypair = null != e ? e : dr()
                    }

                    return W(t, [{
                        key: "publicKey", get: function () {
                            return new Ar(this._keypair.publicKey)
                        }
                    }, {
                        key: "secretKey", get: function () {
                            return new Uint8Array(this._keypair.secretKey)
                        }
                    }], [{
                        key: "generate", value: function () {
                            return new t(dr())
                        }
                    }, {
                        key: "fromSecretKey", value: function (e, n) {
                            if (64 !== e.byteLength) throw new Error("bad secret key size");
                            var r = e.slice(32, 64);
                            if (!n || !n.skipValidation) for (var i = e.slice(0, 32), o = pr(i), a = 0; a < 32; a++) if (r[a] !== o[a]) throw new Error("provided secretKey is invalid");
                            return new t({publicKey: r, secretKey: e})
                        }
                    }, {
                        key: "fromSeed", value: function (e) {
                            var n = pr(e), r = new Uint8Array(64);
                            return r.set(e), r.set(n, 32), new t({publicKey: n, secretKey: r})
                        }
                    }]), t
                }()), so = Object.freeze({
                    CreateLookupTable: {
                        index: 0,
                        layout: Qe.n_([Qe.Jq("instruction"), li("recentSlot"), Qe.u8("bumpSeed")])
                    },
                    FreezeLookupTable: {index: 1, layout: Qe.n_([Qe.Jq("instruction")])},
                    ExtendLookupTable: {
                        index: 2,
                        layout: Qe.n_([Qe.Jq("instruction"), li(), Qe.A9(Lr(), Qe.cv(Qe.Jq(), -8), "addresses")])
                    },
                    DeactivateLookupTable: {index: 3, layout: Qe.n_([Qe.Jq("instruction")])},
                    CloseLookupTable: {index: 4, layout: Qe.n_([Qe.Jq("instruction")])}
                });
            (function () {
                function t() {
                    R(this, t)
                }

                return W(t, null, [{
                    key: "createLookupTable", value: function (t) {
                        var e = nn(Ar.findProgramAddressSync([t.authority.toBuffer(), (0, rn.k$)(BigInt(t.recentSlot), 8)], this.programId), 2),
                            n = e[0], r = e[1],
                            i = ui(so.CreateLookupTable, {recentSlot: BigInt(t.recentSlot), bumpSeed: r}),
                            o = [{pubkey: n, isSigner: !1, isWritable: !0}, {
                                pubkey: t.authority,
                                isSigner: !0,
                                isWritable: !1
                            }, {pubkey: t.payer, isSigner: !0, isWritable: !0}, {
                                pubkey: di.programId,
                                isSigner: !1,
                                isWritable: !1
                            }];
                        return [new Yr({programId: this.programId, keys: o, data: i}), n]
                    }
                }, {
                    key: "freezeLookupTable", value: function (t) {
                        var e = ui(so.FreezeLookupTable), n = [{pubkey: t.lookupTable, isSigner: !1, isWritable: !0}, {
                            pubkey: t.authority,
                            isSigner: !0,
                            isWritable: !1
                        }];
                        return new Yr({programId: this.programId, keys: n, data: e})
                    }
                }, {
                    key: "extendLookupTable", value: function (t) {
                        var e = ui(so.ExtendLookupTable, {
                            addresses: t.addresses.map((function (t) {
                                return t.toBytes()
                            }))
                        }), n = [{pubkey: t.lookupTable, isSigner: !1, isWritable: !0}, {
                            pubkey: t.authority,
                            isSigner: !0,
                            isWritable: !1
                        }];
                        return t.payer && n.push({pubkey: t.payer, isSigner: !0, isWritable: !0}, {
                            pubkey: di.programId,
                            isSigner: !1,
                            isWritable: !1
                        }), new Yr({programId: this.programId, keys: n, data: e})
                    }
                }, {
                    key: "deactivateLookupTable", value: function (t) {
                        var e = ui(so.DeactivateLookupTable),
                            n = [{pubkey: t.lookupTable, isSigner: !1, isWritable: !0}, {
                                pubkey: t.authority,
                                isSigner: !0,
                                isWritable: !1
                            }];
                        return new Yr({programId: this.programId, keys: n, data: e})
                    }
                }, {
                    key: "closeLookupTable", value: function (t) {
                        var e = ui(so.CloseLookupTable), n = [{pubkey: t.lookupTable, isSigner: !1, isWritable: !0}, {
                            pubkey: t.authority,
                            isSigner: !0,
                            isWritable: !1
                        }, {pubkey: t.recipient, isSigner: !1, isWritable: !0}];
                        return new Yr({programId: this.programId, keys: n, data: e})
                    }
                }]), t
            }()).programId = new Ar("AddressLookupTab1e1111111111111111111111111");
            var uo = Object.freeze({
                RequestUnits: {
                    index: 0,
                    layout: Qe.n_([Qe.u8("instruction"), Qe.Jq("units"), Qe.Jq("additionalFee")])
                },
                RequestHeapFrame: {index: 1, layout: Qe.n_([Qe.u8("instruction"), Qe.Jq("bytes")])},
                SetComputeUnitLimit: {index: 2, layout: Qe.n_([Qe.u8("instruction"), Qe.Jq("units")])},
                SetComputeUnitPrice: {index: 3, layout: Qe.n_([Qe.u8("instruction"), li("microLamports")])}
            });
            (function () {
                function t() {
                    R(this, t)
                }

                return W(t, null, [{
                    key: "requestUnits", value: function (t) {
                        var e = ui(uo.RequestUnits, t);
                        return new Yr({keys: [], programId: this.programId, data: e})
                    }
                }, {
                    key: "requestHeapFrame", value: function (t) {
                        var e = ui(uo.RequestHeapFrame, t);
                        return new Yr({keys: [], programId: this.programId, data: e})
                    }
                }, {
                    key: "setComputeUnitLimit", value: function (t) {
                        var e = ui(uo.SetComputeUnitLimit, t);
                        return new Yr({keys: [], programId: this.programId, data: e})
                    }
                }, {
                    key: "setComputeUnitPrice", value: function (t) {
                        var e = ui(uo.SetComputeUnitPrice, {microLamports: BigInt(t.microLamports)});
                        return new Yr({keys: [], programId: this.programId, data: e})
                    }
                }]), t
            }()).programId = new Ar("ComputeBudget111111111111111111111111111111");
            var co = Qe.n_([Qe.u8("numSignatures"), Qe.u8("padding"), Qe.KB("signatureOffset"), Qe.KB("signatureInstructionIndex"), Qe.KB("publicKeyOffset"), Qe.KB("publicKeyInstructionIndex"), Qe.KB("messageDataOffset"), Qe.KB("messageDataSize"), Qe.KB("messageInstructionIndex")]),
                fo = function () {
                    function t() {
                        R(this, t)
                    }

                    return W(t, null, [{
                        key: "createInstructionWithPublicKey", value: function (e) {
                            var n = e.publicKey, r = e.message, i = e.signature, o = e.instructionIndex;
                            Ur(32 === n.length, "Public Key must be ".concat(32, " bytes but received ").concat(n.length, " bytes")), Ur(64 === i.length, "Signature must be ".concat(64, " bytes but received ").concat(i.length, " bytes"));
                            var a = co.span, s = a + n.length, u = s + i.length, c = q.Buffer.alloc(u + r.length),
                                f = null == o ? 65535 : o;
                            return co.encode({
                                numSignatures: 1,
                                padding: 0,
                                signatureOffset: s,
                                signatureInstructionIndex: f,
                                publicKeyOffset: a,
                                publicKeyInstructionIndex: f,
                                messageDataOffset: u,
                                messageDataSize: r.length,
                                messageInstructionIndex: f
                            }, c), c.fill(n, a), c.fill(i, s), c.fill(r, u), new Yr({
                                keys: [],
                                programId: t.programId,
                                data: c
                            })
                        }
                    }, {
                        key: "createInstructionWithPrivateKey", value: function (t) {
                            var e = t.privateKey, n = t.message, r = t.instructionIndex;
                            Ur(64 === e.length, "Private key must be ".concat(64, " bytes but received ").concat(e.length, " bytes"));
                            try {
                                var i = ao.fromSecretKey(e), o = i.publicKey.toBytes(), a = mr(n, i.secretKey);
                                return this.createInstructionWithPublicKey({
                                    publicKey: o,
                                    message: n,
                                    signature: a,
                                    instructionIndex: r
                                })
                            } catch (t) {
                                throw new Error("Error creating instruction; ".concat(t))
                            }
                        }
                    }]), t
                }();
            fo.programId = new Ar("Ed25519SigVerify111111111111111111111111111"), hr.utils.isValidPrivateKey;
            var lo = hr.getPublicKey,
                ho = Qe.n_([Qe.u8("numSignatures"), Qe.KB("signatureOffset"), Qe.u8("signatureInstructionIndex"), Qe.KB("ethAddressOffset"), Qe.u8("ethAddressInstructionIndex"), Qe.KB("messageDataOffset"), Qe.KB("messageDataSize"), Qe.u8("messageInstructionIndex"), Qe.Ik(20, "ethAddress"), Qe.Ik(64, "signature"), Qe.u8("recoveryId")]),
                po = function () {
                    function t() {
                        R(this, t)
                    }

                    return W(t, null, [{
                        key: "publicKeyToEthAddress", value: function (t) {
                            Ur(64 === t.length, "Public key must be ".concat(64, " bytes but received ").concat(t.length, " bytes"));
                            try {
                                return q.Buffer.from(Zn(br(t))).slice(-20)
                            } catch (t) {
                                throw new Error("Error constructing Ethereum address: ".concat(t))
                            }
                        }
                    }, {
                        key: "createInstructionWithPublicKey", value: function (e) {
                            var n = e.publicKey, r = e.message, i = e.signature, o = e.recoveryId,
                                a = e.instructionIndex;
                            return t.createInstructionWithEthAddress({
                                ethAddress: t.publicKeyToEthAddress(n),
                                message: r,
                                signature: i,
                                recoveryId: o,
                                instructionIndex: a
                            })
                        }
                    }, {
                        key: "createInstructionWithEthAddress", value: function (e) {
                            var n, r = e.ethAddress, i = e.message, o = e.signature, a = e.recoveryId,
                                s = e.instructionIndex, u = void 0 === s ? 0 : s;
                            Ur(20 === (n = "string" == typeof r ? r.startsWith("0x") ? q.Buffer.from(r.substr(2), "hex") : q.Buffer.from(r, "hex") : r).length, "Address must be ".concat(20, " bytes but received ").concat(n.length, " bytes"));
                            var c = 12 + n.length, f = c + o.length + 1, l = q.Buffer.alloc(ho.span + i.length);
                            return ho.encode({
                                numSignatures: 1,
                                signatureOffset: c,
                                signatureInstructionIndex: u,
                                ethAddressOffset: 12,
                                ethAddressInstructionIndex: u,
                                messageDataOffset: f,
                                messageDataSize: i.length,
                                messageInstructionIndex: u,
                                signature: br(o),
                                ethAddress: br(n),
                                recoveryId: a
                            }, l), l.fill(br(i), ho.span), new Yr({keys: [], programId: t.programId, data: l})
                        }
                    }, {
                        key: "createInstructionWithPrivateKey", value: function (t) {
                            var e = t.privateKey, n = t.message, r = t.instructionIndex;
                            Ur(32 === e.length, "Private key must be ".concat(32, " bytes but received ").concat(e.length, " bytes"));
                            try {
                                var i = br(e), o = lo(i, !1).slice(1), a = function (t, e) {
                                    var n = hr.sign(t, e);
                                    return [n.toCompactRawBytes(), n.recovery]
                                }(q.Buffer.from(Zn(br(n))), i), s = nn(a, 2), u = s[0], c = s[1];
                                return this.createInstructionWithPublicKey({
                                    publicKey: o,
                                    message: n,
                                    signature: u,
                                    recoveryId: c,
                                    instructionIndex: r
                                })
                            } catch (t) {
                                throw new Error("Error creating instruction; ".concat(t))
                            }
                        }
                    }]), t
                }();
            po.programId = new Ar("KeccakSecp256k11111111111111111111111111111");
            var go = new Ar("StakeConfig11111111111111111111111111111111"), yo = W((function t(e, n, r) {
                R(this, t), this.unixTimestamp = void 0, this.epoch = void 0, this.custodian = void 0, this.unixTimestamp = e, this.epoch = n, this.custodian = r
            }));
            yo.default = new yo(0, 0, Ar.default);
            var mo = Object.freeze({
                Initialize: {
                    index: 0, layout: Qe.n_([Qe.Jq("instruction"), function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "authorized";
                        return Qe.n_([Lr("staker"), Lr("withdrawer")], t)
                    }(), function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "lockup";
                        return Qe.n_([Qe.gM("unixTimestamp"), Qe.gM("epoch"), Lr("custodian")], t)
                    }()])
                },
                Authorize: {
                    index: 1,
                    layout: Qe.n_([Qe.Jq("instruction"), Lr("newAuthorized"), Qe.Jq("stakeAuthorizationType")])
                },
                Delegate: {index: 2, layout: Qe.n_([Qe.Jq("instruction")])},
                Split: {index: 3, layout: Qe.n_([Qe.Jq("instruction"), Qe.gM("lamports")])},
                Withdraw: {index: 4, layout: Qe.n_([Qe.Jq("instruction"), Qe.gM("lamports")])},
                Deactivate: {index: 5, layout: Qe.n_([Qe.Jq("instruction")])},
                Merge: {index: 7, layout: Qe.n_([Qe.Jq("instruction")])},
                AuthorizeWithSeed: {
                    index: 8,
                    layout: Qe.n_([Qe.Jq("instruction"), Lr("newAuthorized"), Qe.Jq("stakeAuthorizationType"), $r("authoritySeed"), Lr("authorityOwner")])
                }
            }), vo = (Object.freeze({Staker: {index: 0}, Withdrawer: {index: 1}}), function () {
                function t() {
                    R(this, t)
                }

                return W(t, null, [{
                    key: "initialize", value: function (t) {
                        var e = t.stakePubkey, n = t.authorized, r = t.lockup || yo.default, i = ui(mo.Initialize, {
                            authorized: {
                                staker: br(n.staker.toBuffer()),
                                withdrawer: br(n.withdrawer.toBuffer())
                            },
                            lockup: {
                                unixTimestamp: r.unixTimestamp,
                                epoch: r.epoch,
                                custodian: br(r.custodian.toBuffer())
                            }
                        }), o = {
                            keys: [{pubkey: e, isSigner: !1, isWritable: !0}, {
                                pubkey: ri,
                                isSigner: !1,
                                isWritable: !1
                            }], programId: this.programId, data: i
                        };
                        return new Yr(o)
                    }
                }, {
                    key: "createAccountWithSeed", value: function (t) {
                        var e = new Xr;
                        e.add(di.createAccountWithSeed({
                            fromPubkey: t.fromPubkey,
                            newAccountPubkey: t.stakePubkey,
                            basePubkey: t.basePubkey,
                            seed: t.seed,
                            lamports: t.lamports,
                            space: this.space,
                            programId: this.programId
                        }));
                        var n = t.stakePubkey, r = t.authorized, i = t.lockup;
                        return e.add(this.initialize({stakePubkey: n, authorized: r, lockup: i}))
                    }
                }, {
                    key: "createAccount", value: function (t) {
                        var e = new Xr;
                        e.add(di.createAccount({
                            fromPubkey: t.fromPubkey,
                            newAccountPubkey: t.stakePubkey,
                            lamports: t.lamports,
                            space: this.space,
                            programId: this.programId
                        }));
                        var n = t.stakePubkey, r = t.authorized, i = t.lockup;
                        return e.add(this.initialize({stakePubkey: n, authorized: r, lockup: i}))
                    }
                }, {
                    key: "delegate", value: function (t) {
                        var e = t.stakePubkey, n = t.authorizedPubkey, r = t.votePubkey, i = ui(mo.Delegate);
                        return (new Xr).add({
                            keys: [{pubkey: e, isSigner: !1, isWritable: !0}, {
                                pubkey: r,
                                isSigner: !1,
                                isWritable: !1
                            }, {pubkey: ei, isSigner: !1, isWritable: !1}, {
                                pubkey: ii,
                                isSigner: !1,
                                isWritable: !1
                            }, {pubkey: go, isSigner: !1, isWritable: !1}, {pubkey: n, isSigner: !0, isWritable: !1}],
                            programId: this.programId,
                            data: i
                        })
                    }
                }, {
                    key: "authorize", value: function (t) {
                        var e = t.stakePubkey, n = t.authorizedPubkey, r = t.newAuthorizedPubkey,
                            i = t.stakeAuthorizationType, o = t.custodianPubkey,
                            a = ui(mo.Authorize, {newAuthorized: br(r.toBuffer()), stakeAuthorizationType: i.index}),
                            s = [{pubkey: e, isSigner: !1, isWritable: !0}, {
                                pubkey: ei,
                                isSigner: !1,
                                isWritable: !0
                            }, {pubkey: n, isSigner: !0, isWritable: !1}];
                        return o && s.push({pubkey: o, isSigner: !1, isWritable: !1}), (new Xr).add({
                            keys: s,
                            programId: this.programId,
                            data: a
                        })
                    }
                }, {
                    key: "authorizeWithSeed", value: function (t) {
                        var e = t.stakePubkey, n = t.authorityBase, r = t.authoritySeed, i = t.authorityOwner,
                            o = t.newAuthorizedPubkey, a = t.stakeAuthorizationType, s = t.custodianPubkey,
                            u = ui(mo.AuthorizeWithSeed, {
                                newAuthorized: br(o.toBuffer()),
                                stakeAuthorizationType: a.index,
                                authoritySeed: r,
                                authorityOwner: br(i.toBuffer())
                            }), c = [{pubkey: e, isSigner: !1, isWritable: !0}, {
                                pubkey: n,
                                isSigner: !0,
                                isWritable: !1
                            }, {pubkey: ei, isSigner: !1, isWritable: !1}];
                        return s && c.push({pubkey: s, isSigner: !1, isWritable: !1}), (new Xr).add({
                            keys: c,
                            programId: this.programId,
                            data: u
                        })
                    }
                }, {
                    key: "splitInstruction", value: function (t) {
                        var e = t.stakePubkey, n = t.authorizedPubkey, r = t.splitStakePubkey, i = t.lamports,
                            o = ui(mo.Split, {lamports: i});
                        return new Yr({
                            keys: [{pubkey: e, isSigner: !1, isWritable: !0}, {
                                pubkey: r,
                                isSigner: !1,
                                isWritable: !0
                            }, {pubkey: n, isSigner: !0, isWritable: !1}], programId: this.programId, data: o
                        })
                    }
                }, {
                    key: "split", value: function (t) {
                        var e = new Xr;
                        return e.add(di.createAccount({
                            fromPubkey: t.authorizedPubkey,
                            newAccountPubkey: t.splitStakePubkey,
                            lamports: 0,
                            space: this.space,
                            programId: this.programId
                        })), e.add(this.splitInstruction(t))
                    }
                }, {
                    key: "splitWithSeed", value: function (t) {
                        var e = t.stakePubkey, n = t.authorizedPubkey, r = t.splitStakePubkey, i = t.basePubkey,
                            o = t.seed, a = t.lamports, s = new Xr;
                        return s.add(di.allocate({
                            accountPubkey: r,
                            basePubkey: i,
                            seed: o,
                            space: this.space,
                            programId: this.programId
                        })), s.add(this.splitInstruction({
                            stakePubkey: e,
                            authorizedPubkey: n,
                            splitStakePubkey: r,
                            lamports: a
                        }))
                    }
                }, {
                    key: "merge", value: function (t) {
                        var e = t.stakePubkey, n = t.sourceStakePubKey, r = t.authorizedPubkey, i = ui(mo.Merge);
                        return (new Xr).add({
                            keys: [{pubkey: e, isSigner: !1, isWritable: !0}, {
                                pubkey: n,
                                isSigner: !1,
                                isWritable: !0
                            }, {pubkey: ei, isSigner: !1, isWritable: !1}, {
                                pubkey: ii,
                                isSigner: !1,
                                isWritable: !1
                            }, {pubkey: r, isSigner: !0, isWritable: !1}], programId: this.programId, data: i
                        })
                    }
                }, {
                    key: "withdraw", value: function (t) {
                        var e = t.stakePubkey, n = t.authorizedPubkey, r = t.toPubkey, i = t.lamports,
                            o = t.custodianPubkey, a = ui(mo.Withdraw, {lamports: i}),
                            s = [{pubkey: e, isSigner: !1, isWritable: !0}, {
                                pubkey: r,
                                isSigner: !1,
                                isWritable: !0
                            }, {pubkey: ei, isSigner: !1, isWritable: !1}, {
                                pubkey: ii,
                                isSigner: !1,
                                isWritable: !1
                            }, {pubkey: n, isSigner: !0, isWritable: !1}];
                        return o && s.push({pubkey: o, isSigner: !1, isWritable: !1}), (new Xr).add({
                            keys: s,
                            programId: this.programId,
                            data: a
                        })
                    }
                }, {
                    key: "deactivate", value: function (t) {
                        var e = t.stakePubkey, n = t.authorizedPubkey, r = ui(mo.Deactivate);
                        return (new Xr).add({
                            keys: [{pubkey: e, isSigner: !1, isWritable: !0}, {
                                pubkey: ei,
                                isSigner: !1,
                                isWritable: !1
                            }, {pubkey: n, isSigner: !0, isWritable: !1}], programId: this.programId, data: r
                        })
                    }
                }]), t
            }());
            vo.programId = new Ar("Stake11111111111111111111111111111111111111"), vo.space = 200;
            var bo = Object.freeze({
                InitializeAccount: {
                    index: 0, layout: Qe.n_([Qe.Jq("instruction"), function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "voteInit";
                        return Qe.n_([Lr("nodePubkey"), Lr("authorizedVoter"), Lr("authorizedWithdrawer"), Qe.u8("commission")], t)
                    }()])
                },
                Authorize: {
                    index: 1,
                    layout: Qe.n_([Qe.Jq("instruction"), Lr("newAuthorized"), Qe.Jq("voteAuthorizationType")])
                },
                Withdraw: {index: 3, layout: Qe.n_([Qe.Jq("instruction"), Qe.gM("lamports")])},
                AuthorizeWithSeed: {
                    index: 10, layout: Qe.n_([Qe.Jq("instruction"), function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "voteAuthorizeWithSeedArgs";
                        return Qe.n_([Qe.Jq("voteAuthorizationType"), Lr("currentAuthorityDerivedKeyOwnerPubkey"), $r("currentAuthorityDerivedKeySeed"), Lr("newAuthorized")], t)
                    }()])
                }
            }), wo = (Object.freeze({Voter: {index: 0}, Withdrawer: {index: 1}}), function () {
                function t() {
                    R(this, t)
                }

                return W(t, null, [{
                    key: "initializeAccount", value: function (t) {
                        var e = t.votePubkey, n = t.nodePubkey, r = t.voteInit, i = ui(bo.InitializeAccount, {
                            voteInit: {
                                nodePubkey: br(r.nodePubkey.toBuffer()),
                                authorizedVoter: br(r.authorizedVoter.toBuffer()),
                                authorizedWithdrawer: br(r.authorizedWithdrawer.toBuffer()),
                                commission: r.commission
                            }
                        }), o = {
                            keys: [{pubkey: e, isSigner: !1, isWritable: !0}, {
                                pubkey: ri,
                                isSigner: !1,
                                isWritable: !1
                            }, {pubkey: ei, isSigner: !1, isWritable: !1}, {pubkey: n, isSigner: !0, isWritable: !1}],
                            programId: this.programId,
                            data: i
                        };
                        return new Yr(o)
                    }
                }, {
                    key: "createAccount", value: function (t) {
                        var e = new Xr;
                        return e.add(di.createAccount({
                            fromPubkey: t.fromPubkey,
                            newAccountPubkey: t.votePubkey,
                            lamports: t.lamports,
                            space: this.space,
                            programId: this.programId
                        })), e.add(this.initializeAccount({
                            votePubkey: t.votePubkey,
                            nodePubkey: t.voteInit.nodePubkey,
                            voteInit: t.voteInit
                        }))
                    }
                }, {
                    key: "authorize", value: function (t) {
                        var e = t.votePubkey, n = t.authorizedPubkey, r = t.newAuthorizedPubkey,
                            i = t.voteAuthorizationType,
                            o = ui(bo.Authorize, {newAuthorized: br(r.toBuffer()), voteAuthorizationType: i.index}),
                            a = [{pubkey: e, isSigner: !1, isWritable: !0}, {
                                pubkey: ei,
                                isSigner: !1,
                                isWritable: !1
                            }, {pubkey: n, isSigner: !0, isWritable: !1}];
                        return (new Xr).add({keys: a, programId: this.programId, data: o})
                    }
                }, {
                    key: "authorizeWithSeed", value: function (t) {
                        var e = t.currentAuthorityDerivedKeyBasePubkey, n = t.currentAuthorityDerivedKeyOwnerPubkey,
                            r = t.currentAuthorityDerivedKeySeed, i = t.newAuthorizedPubkey,
                            o = t.voteAuthorizationType, a = t.votePubkey, s = ui(bo.AuthorizeWithSeed, {
                                voteAuthorizeWithSeedArgs: {
                                    currentAuthorityDerivedKeyOwnerPubkey: br(n.toBuffer()),
                                    currentAuthorityDerivedKeySeed: r,
                                    newAuthorized: br(i.toBuffer()),
                                    voteAuthorizationType: o.index
                                }
                            }), u = [{pubkey: a, isSigner: !1, isWritable: !0}, {
                                pubkey: ei,
                                isSigner: !1,
                                isWritable: !1
                            }, {pubkey: e, isSigner: !0, isWritable: !1}];
                        return (new Xr).add({keys: u, programId: this.programId, data: s})
                    }
                }, {
                    key: "withdraw", value: function (t) {
                        var e = t.votePubkey, n = t.authorizedWithdrawerPubkey, r = t.lamports, i = t.toPubkey,
                            o = ui(bo.Withdraw, {lamports: r}), a = [{pubkey: e, isSigner: !1, isWritable: !0}, {
                                pubkey: i,
                                isSigner: !1,
                                isWritable: !0
                            }, {pubkey: n, isSigner: !0, isWritable: !1}];
                        return (new Xr).add({keys: a, programId: this.programId, data: o})
                    }
                }, {
                    key: "safeWithdraw", value: function (e, n, r) {
                        if (e.lamports > n - r) throw new Error("Withdraw will leave vote account with insuffcient funds.");
                        return t.withdraw(e)
                    }
                }]), t
            }());
            wo.programId = new Ar("Vote111111111111111111111111111111111111111"), wo.space = 3731, new Ar("Va1idator1nfo111111111111111111111111111111"), Mn({
                name: In(),
                website: An(In()),
                details: An(In()),
                keybaseUsername: An(In())
            }), new Ar("Vote111111111111111111111111111111111111111"), Qe.n_([Lr("nodePubkey"), Lr("authorizedWithdrawer"), Qe.u8("commission"), Qe._O(), Qe.A9(Qe.n_([Qe._O("slot"), Qe.Jq("confirmationCount")]), Qe.cv(Qe.Jq(), -8), "votes"), Qe.u8("rootSlotValid"), Qe._O("rootSlot"), Qe._O(), Qe.A9(Qe.n_([Qe._O("epoch"), Lr("authorizedVoter")]), Qe.cv(Qe.Jq(), -8), "authorizedVoters"), Qe.n_([Qe.A9(Qe.n_([Lr("authorizedPubkey"), Qe._O("epochOfLastAuthorizedSwitch"), Qe._O("targetEpoch")]), 32, "buf"), Qe._O("idx"), Qe.u8("isEmpty")], "priorVoters"), Qe._O(), Qe.A9(Qe.n_([Qe._O("epoch"), Qe._O("credits"), Qe._O("prevCredits")]), Qe.cv(Qe.Jq(), -8), "epochCredits"), Qe.n_([Qe._O("slot"), Qe._O("timestamp")], "lastTimestamp")]);
            const xo = "standard:disconnect";
            new WeakMap, new WeakMap, new WeakMap, new WeakMap, new WeakMap, new WeakMap;
            var ko, Eo, Ao, So, Io, Bo, Mo, Oo, _o, To, Lo, Po, $o, jo, Co, Ro, Uo, zo, No = function (t, e, n, r, i) {
                if ("m" === r) throw new TypeError("Private method is not writable");
                if ("a" === r && !i) throw new TypeError("Private accessor was defined without a setter");
                if ("function" == typeof e ? t !== e || !i : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
                return "a" === r ? i.call(t, n) : i ? i.value = n : e.set(t, n), n
            }, Wo = function (t, e, n, r) {
                if ("a" === n && !r) throw new TypeError("Private accessor was defined without a getter");
                if ("function" == typeof e ? t !== e || !r : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
                return "m" === n ? r : "a" === n ? r.call(t) : r ? r.value : e.get(t)
            };

            class qo extends T {
                constructor({wallet: t}) {
                    super(), ko.add(this), Eo.set(this, void 0), Ao.set(this, void 0), So.set(this, void 0), Io.set(this, void 0), Bo.set(this, void 0), Mo.set(this, void 0), Oo.set(this, void 0), _o.set(this, "undefined" == typeof window || "undefined" == typeof document ? y.Unsupported : y.Installed), jo.set(this, (t => {
                        if ("accounts" in t) {
                            const t = Wo(this, Oo, "f").accounts[0];
                            Wo(this, Eo, "f") && !Wo(this, Io, "f") && t !== Wo(this, Eo, "f") && (t ? Wo(this, ko, "m", Lo).call(this, t) : (this.emit("error", new k), Wo(this, ko, "m", Po).call(this)))
                        }
                        "features" in t && Wo(this, ko, "m", $o).call(this)
                    })), No(this, Oo, t, "f"), No(this, Eo, null, "f"), No(this, Ao, null, "f"), No(this, So, !1, "f"), No(this, Io, !1, "f"), No(this, Bo, Wo(this, Oo, "f").features[g].on("change", Wo(this, jo, "f")), "f"), Wo(this, ko, "m", $o).call(this)
                }

                get name() {
                    return Wo(this, Oo, "f").name
                }

                get url() {
                    return "https://github.com/solana-labs/wallet-standard"
                }

                get icon() {
                    return Wo(this, Oo, "f").icon
                }

                get readyState() {
                    return Wo(this, _o, "f")
                }

                get publicKey() {
                    return Wo(this, Ao, "f")
                }

                get connecting() {
                    return Wo(this, So, "f")
                }

                get supportedTransactionVersions() {
                    return Wo(this, Mo, "f")
                }

                get wallet() {
                    return Wo(this, Oo, "f")
                }

                get standard() {
                    return !0
                }

                destroy() {
                    No(this, Eo, null, "f"), No(this, Ao, null, "f"), No(this, So, !1, "f"), No(this, Io, !1, "f");
                    const t = Wo(this, Bo, "f");
                    t && (No(this, Bo, null, "f"), t())
                }

                async autoConnect() {
                    return Wo(this, ko, "m", To).call(this, {silent: !0})
                }

                async connect() {
                    return Wo(this, ko, "m", To).call(this)
                }

                async disconnect() {
                    if (xo in Wo(this, Oo, "f").features) try {
                        No(this, Io, !0, "f"), await Wo(this, Oo, "f").features[xo].disconnect()
                    } catch (t) {
                        this.emit("error", new E(t?.message, t))
                    } finally {
                        No(this, Io, !1, "f")
                    }
                    Wo(this, ko, "m", Po).call(this)
                }

                async sendTransaction(t, e, n = {}) {
                    try {
                        const i = Wo(this, Eo, "f");
                        if (!i) throw new I;
                        let o;
                        if (h in Wo(this, Oo, "f").features) if (i.features.includes(h)) o = h; else {
                            if (!(d in Wo(this, Oo, "f").features) || !i.features.includes(d)) throw new A;
                            o = d
                        } else {
                            if (!(d in Wo(this, Oo, "f").features)) throw new w;
                            if (!i.features.includes(d)) throw new A;
                            o = d
                        }
                        const a = (r = e.rpcEndpoint).includes("https://api.mainnet-beta.solana.com") ? j : /\bdevnet\b/i.test(r) ? "solana:devnet" : /\btestnet\b/i.test(r) ? "solana:testnet" : /\blocalhost\b/i.test(r) || /\b127\.0\.0\.1\b/.test(r) ? "solana:localnet" : j;
                        if (!i.chains.includes(a)) throw new B;
                        try {
                            const {signers: r, ...s} = n;
                            let u;
                            if (L(t) ? (r?.length && t.sign(r), u = t.serialize()) : (t = await this.prepareTransaction(t, e, s), r?.length && t.partialSign(...r), u = new Uint8Array(t.serialize({
                                requireAllSignatures: !1,
                                verifySignatures: !1
                            }))), o === h) {
                                const [t] = await Wo(this, Oo, "f").features[h].signAndSendTransaction({
                                    account: i,
                                    chain: a,
                                    transaction: u,
                                    options: {
                                        preflightCommitment: C(s.preflightCommitment || e.commitment),
                                        skipPreflight: s.skipPreflight,
                                        maxRetries: s.maxRetries,
                                        minContextSlot: s.minContextSlot
                                    }
                                });
                                return Ke.encode(t.signature)
                            }
                            {
                                const [t] = await Wo(this, Oo, "f").features[d].signTransaction({
                                    account: i,
                                    chain: a,
                                    transaction: u,
                                    options: {
                                        preflightCommitment: C(s.preflightCommitment || e.commitment),
                                        minContextSlot: s.minContextSlot
                                    }
                                });
                                return await e.sendRawTransaction(t.signedTransaction, {
                                    ...s,
                                    preflightCommitment: C(s.preflightCommitment || e.commitment)
                                })
                            }
                        } catch (t) {
                            if (t instanceof v) throw t;
                            throw new B(t?.message, t)
                        }
                    } catch (t) {
                        throw this.emit("error", t), t
                    }
                    var r
                }
            }

            Eo = new WeakMap, Ao = new WeakMap, So = new WeakMap, Io = new WeakMap, Bo = new WeakMap, Mo = new WeakMap, Oo = new WeakMap, _o = new WeakMap, jo = new WeakMap, ko = new WeakSet, To = async function (t) {
                try {
                    if (this.connected || this.connecting) return;
                    if (Wo(this, _o, "f") !== y.Installed) throw new b;
                    if (No(this, So, !0, "f"), !Wo(this, Oo, "f").accounts.length) try {
                        await Wo(this, Oo, "f").features[p].connect(t)
                    } catch (t) {
                        throw new x(t?.message, t)
                    }
                    const e = Wo(this, Oo, "f").accounts[0];
                    if (!e) throw new A;
                    Wo(this, ko, "m", Lo).call(this, e)
                } catch (t) {
                    throw this.emit("error", t), t
                } finally {
                    No(this, So, !1, "f")
                }
            }, Lo = function (t) {
                let e;
                try {
                    e = new Ar(t.address)
                } catch (t) {
                    throw new S(t?.message, t)
                }
                No(this, Eo, t, "f"), No(this, Ao, e, "f"), Wo(this, ko, "m", $o).call(this), this.emit("connect", e)
            }, Po = function () {
                No(this, Eo, null, "f"), No(this, Ao, null, "f"), Wo(this, ko, "m", $o).call(this), this.emit("disconnect")
            }, $o = function () {
                const t = h in Wo(this, Oo, "f").features ? Wo(this, Oo, "f").features[h].supportedTransactionVersions : Wo(this, Oo, "f").features[d].supportedTransactionVersions;
                No(this, Mo, function (t, e) {
                    if (t === e) return !0;
                    const n = t.length;
                    if (n !== e.length) return !1;
                    for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
                    return !0
                }(t, ["legacy"]) ? null : new Set(t), "f"), d in Wo(this, Oo, "f").features && Wo(this, Eo, "f")?.features.includes(d) ? (this.signTransaction = Wo(this, ko, "m", Co), this.signAllTransactions = Wo(this, ko, "m", Ro)) : (delete this.signTransaction, delete this.signAllTransactions), P in Wo(this, Oo, "f").features && Wo(this, Eo, "f")?.features.includes(P) ? this.signMessage = Wo(this, ko, "m", Uo) : delete this.signMessage, $ in Wo(this, Oo, "f").features ? this.signIn = Wo(this, ko, "m", zo) : delete this.signIn
            }, Co = async function (t) {
                try {
                    const e = Wo(this, Eo, "f");
                    if (!e) throw new I;
                    if (!(d in Wo(this, Oo, "f").features)) throw new w;
                    if (!e.features.includes(d)) throw new A;
                    try {
                        const n = (await Wo(this, Oo, "f").features[d].signTransaction({
                            account: e,
                            transaction: L(t) ? t.serialize() : new Uint8Array(t.serialize({
                                requireAllSignatures: !1,
                                verifySignatures: !1
                            }))
                        }))[0].signedTransaction;
                        return L(t) ? ti.deserialize(n) : Xr.from(n)
                    } catch (t) {
                        if (t instanceof v) throw t;
                        throw new M(t?.message, t)
                    }
                } catch (t) {
                    throw this.emit("error", t), t
                }
            }, Ro = async function (t) {
                try {
                    const e = Wo(this, Eo, "f");
                    if (!e) throw new I;
                    if (!(d in Wo(this, Oo, "f").features)) throw new w;
                    if (!e.features.includes(d)) throw new A;
                    try {
                        const n = await Wo(this, Oo, "f").features[d].signTransaction(...t.map((t => ({
                            account: e,
                            transaction: L(t) ? t.serialize() : new Uint8Array(t.serialize({
                                requireAllSignatures: !1,
                                verifySignatures: !1
                            }))
                        }))));
                        return t.map(((t, e) => {
                            const r = n[e].signedTransaction;
                            return L(t) ? ti.deserialize(r) : Xr.from(r)
                        }))
                    } catch (t) {
                        throw new M(t?.message, t)
                    }
                } catch (t) {
                    throw this.emit("error", t), t
                }
            }, Uo = async function (t) {
                try {
                    const e = Wo(this, Eo, "f");
                    if (!e) throw new I;
                    if (!(P in Wo(this, Oo, "f").features)) throw new w;
                    if (!e.features.includes(P)) throw new A;
                    try {
                        return (await Wo(this, Oo, "f").features[P].signMessage({account: e, message: t}))[0].signature
                    } catch (t) {
                        throw new O(t?.message, t)
                    }
                } catch (t) {
                    throw this.emit("error", t), t
                }
            }, zo = async function (t = {}) {
                try {
                    if (!($ in Wo(this, Oo, "f").features)) throw new w;
                    let e;
                    try {
                        [e] = await Wo(this, Oo, "f").features[$].signIn(t)
                    } catch (t) {
                        throw new _(t?.message, t)
                    }
                    if (!e) throw new _;
                    return Wo(this, ko, "m", Lo).call(this, e.account), e
                } catch (t) {
                    throw this.emit("error", t), t
                }
            };
            var Ko = function (t, e, n, r) {
                return new (n || (n = Promise))((function (i, o) {
                    function a(t) {
                        try {
                            u(r.next(t))
                        } catch (t) {
                            o(t)
                        }
                    }

                    function s(t) {
                        try {
                            u(r.throw(t))
                        } catch (t) {
                            o(t)
                        }
                    }

                    function u(t) {
                        var e;
                        t.done ? i(t.value) : (e = t.value, e instanceof n ? e : new n((function (t) {
                            t(e)
                        }))).then(a, s)
                    }

                    u((r = r.apply(t, e || [])).next())
                }))
            };
            const {Elm: Do} = r(652), Fo = r(468), Ho = "solana-connect-modal", Vo = "__sc__outer_modal",
                Jo = "__sc__elm_app", Zo = "__sc__ev_connect", Go = "__sc__ev_vis";

            class Yo {
                constructor(t) {
                    var e;
                    this.wallets = function () {
                        if (n) return n;
                        if (n = Object.freeze({register: s, get: u, on: c}), "undefined" == typeof window) return n;
                        const t = Object.freeze({register: s});
                        try {
                            window.addEventListener("wallet-standard:register-wallet", (({detail: e}) => e(t)))
                        } catch (t) {
                            console.error("wallet-standard:register-wallet event listener could not be added\n", t)
                        }
                        try {
                            window.dispatchEvent(new l(t))
                        } catch (t) {
                            console.error("wallet-standard:app-ready event could not be dispatched\n", t)
                        }
                        return n
                    }(), this.isOpen = !1, this.debug = (null == t ? void 0 : t.debug) || !1, this.options = new Map, this.activeWallet = null;
                    const r = function () {
                        if (customElements.get(Ho)) throw Error("Solana Connect already instantiated!");
                        customElements.define(Ho, Xo);
                        const t = document.createElement(Ho);
                        return document.body.appendChild(t), t
                    }();
                    this.root = r, this.elmApp = Do.Main.init({
                        node: null === (e = r.shadowRoot) || void 0 === e ? void 0 : e.querySelector("#" + Jo),
                        flags: {screen: {width: window.innerWidth, height: window.innerHeight}}
                    }), this.elmApp.ports.close.subscribe((() => {
                        this.showMenu(!1)
                    })), this.elmApp.ports.log.subscribe((t => {
                        this.log(t)
                    })), this.elmApp.ports.copy.subscribe((t => Ko(this, void 0, void 0, (function* () {
                        yield navigator.clipboard.writeText(t)
                    })))), this.elmApp.ports.connect.subscribe((t => (() => Ko(this, void 0, void 0, (function* () {
                        const e = this.options.get(t);
                        if (!e) throw new Error(`Wallet not found: ${t}`);
                        if (yield e.connect(), !e.connected || !e.publicKey) throw new Error(`Wallet not connected: ${e.name}`);
                        e.on("disconnect", (() => {
                            e.removeListener("disconnect"), this.log("disconnected"), this.activeWallet = null;
                            const t = new CustomEvent(Zo, {detail: null});
                            document.dispatchEvent(t), this.elmApp.ports.disconnectIn.send(null)
                        })), this.activeWallet = t, this.elmApp.ports.connectCb.send(e.publicKey.toString());
                        const n = new CustomEvent(Zo, {detail: e});
                        document.dispatchEvent(n), this.showMenu(!1)
                    })))().catch((t => {
                        this.elmApp.ports.connectCb.send(null), this.log(t)
                    })))), this.elmApp.ports.disconnect.subscribe((t => (() => Ko(this, void 0, void 0, (function* () {
                        t && this.showMenu(!1);
                        const e = this.getWallet();
                        e && (this.log("disconnecting", e.name), yield e.disconnect())
                    })))().catch((t => {
                        this.log(t)
                    }))));
                    const i = t => {
                        this.options.has(t.name) ? this.log("wallet duplicate:", t.name) : (this.options.set(t.name, t), this.elmApp.ports.walletCb.send({
                            name: t.name,
                            icon: t.icon
                        }))
                    }, o = t => {
                        !function (t) {
                            return p in t.features && g in t.features && (h in t.features || d in t.features)
                        }(t) ? this.log("wallet not compatible:", t.name) : i(new qo({wallet: t}))
                    };
                    this.wallets.get().forEach((t => {
                        this.log("wallet read:", t.name), o(t)
                    })), this.wallets.on("register", (t => {
                        this.log("wallet registered:", t.name), o(t)
                    })), (null == t ? void 0 : t.additionalAdapters) && t.additionalAdapters.forEach(i), setTimeout((() => this.elmApp.ports.walletTimeout.send(null)), 2500)
                }

                openMenu() {
                    this.showMenu(!0)
                }

                getWallet() {
                    return this.activeWallet && this.options.get(this.activeWallet) || null
                }

                onWalletChange(t) {
                    document.addEventListener(Zo, (e => {
                        t(e.detail)
                    }))
                }

                onVisibilityChange(t) {
                    document.addEventListener(Go, (e => {
                        t(e.detail)
                    }))
                }

                showMenu(t) {
                    var e;
                    const n = null === (e = this.root.shadowRoot) || void 0 === e ? void 0 : e.querySelector("#" + Vo);
                    n && (n.style.display = t ? "block" : "none"), this.isOpen = t;
                    const r = new CustomEvent(Go, {detail: this.isOpen});
                    document.dispatchEvent(r)
                }

                log(...t) {
                    this.debug && console.log(...t)
                }
            }

            class Xo extends HTMLElement {
                constructor() {
                    super();
                    const t = this.attachShadow({mode: "open"}), e = document.createElement("div");
                    e.id = Vo, e.style.position = "fixed", e.style.top = "0", e.style.left = "0", e.style.width = "100%", e.style.height = "100%", e.style.zIndex = "1000", e.style.display = "none";
                    const n = document.createElement("div");
                    n.id = Jo, n.style.width = "100%", n.style.height = "100%", e.appendChild(n);
                    const r = document.createElement("style");
                    r.textContent = Fo, t.appendChild(r), t.appendChild(e)
                }
            }
        })();
        var o = i.l, a = n(505), s = n.n(a);

        function u(t) {
            if (null == t) return window;
            if ("[object Window]" !== t.toString()) {
                var e = t.ownerDocument;
                return e && e.defaultView || window
            }
            return t
        }

        function c(t) {
            return t instanceof u(t).Element || t instanceof Element
        }

        function f(t) {
            return t instanceof u(t).HTMLElement || t instanceof HTMLElement
        }

        function l(t) {
            return "undefined" != typeof ShadowRoot && (t instanceof u(t).ShadowRoot || t instanceof ShadowRoot)
        }

        var h = Math.max, d = Math.min, p = Math.round;

        function g() {
            var t = navigator.userAgentData;
            return null != t && t.brands && Array.isArray(t.brands) ? t.brands.map((function (t) {
                return t.brand + "/" + t.version
            })).join(" ") : navigator.userAgent
        }

        function y() {
            return !/^((?!chrome|android).)*safari/i.test(g())
        }

        function m(t, e, n) {
            void 0 === e && (e = !1), void 0 === n && (n = !1);
            var r = t.getBoundingClientRect(), i = 1, o = 1;
            e && f(t) && (i = t.offsetWidth > 0 && p(r.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && p(r.height) / t.offsetHeight || 1);
            var a = (c(t) ? u(t) : window).visualViewport, s = !y() && n,
                l = (r.left + (s && a ? a.offsetLeft : 0)) / i, h = (r.top + (s && a ? a.offsetTop : 0)) / o,
                d = r.width / i, g = r.height / o;
            return {width: d, height: g, top: h, right: l + d, bottom: h + g, left: l, x: l, y: h}
        }

        function v(t) {
            var e = u(t);
            return {scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset}
        }

        function b(t) {
            return t ? (t.nodeName || "").toLowerCase() : null
        }

        function w(t) {
            return ((c(t) ? t.ownerDocument : t.document) || window.document).documentElement
        }

        function x(t) {
            return m(w(t)).left + v(t).scrollLeft
        }

        function k(t) {
            return u(t).getComputedStyle(t)
        }

        function E(t) {
            var e = k(t), n = e.overflow, r = e.overflowX, i = e.overflowY;
            return /auto|scroll|overlay|hidden/.test(n + i + r)
        }

        function A(t, e, n) {
            void 0 === n && (n = !1);
            var r, i, o = f(e), a = f(e) && function (t) {
                var e = t.getBoundingClientRect(), n = p(e.width) / t.offsetWidth || 1,
                    r = p(e.height) / t.offsetHeight || 1;
                return 1 !== n || 1 !== r
            }(e), s = w(e), c = m(t, a, n), l = {scrollLeft: 0, scrollTop: 0}, h = {x: 0, y: 0};
            return (o || !o && !n) && (("body" !== b(e) || E(s)) && (l = (r = e) !== u(r) && f(r) ? {
                scrollLeft: (i = r).scrollLeft,
                scrollTop: i.scrollTop
            } : v(r)), f(e) ? ((h = m(e, !0)).x += e.clientLeft, h.y += e.clientTop) : s && (h.x = x(s))), {
                x: c.left + l.scrollLeft - h.x,
                y: c.top + l.scrollTop - h.y,
                width: c.width,
                height: c.height
            }
        }

        function S(t) {
            var e = m(t), n = t.offsetWidth, r = t.offsetHeight;
            return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
                x: t.offsetLeft,
                y: t.offsetTop,
                width: n,
                height: r
            }
        }

        function I(t) {
            return "html" === b(t) ? t : t.assignedSlot || t.parentNode || (l(t) ? t.host : null) || w(t)
        }

        function B(t) {
            return ["html", "body", "#document"].indexOf(b(t)) >= 0 ? t.ownerDocument.body : f(t) && E(t) ? t : B(I(t))
        }

        function M(t, e) {
            var n;
            void 0 === e && (e = []);
            var r = B(t), i = r === (null == (n = t.ownerDocument) ? void 0 : n.body), o = u(r),
                a = i ? [o].concat(o.visualViewport || [], E(r) ? r : []) : r, s = e.concat(a);
            return i ? s : s.concat(M(I(a)))
        }

        function O(t) {
            return ["table", "td", "th"].indexOf(b(t)) >= 0
        }

        function _(t) {
            return f(t) && "fixed" !== k(t).position ? t.offsetParent : null
        }

        function T(t) {
            for (var e = u(t), n = _(t); n && O(n) && "static" === k(n).position;) n = _(n);
            return n && ("html" === b(n) || "body" === b(n) && "static" === k(n).position) ? e : n || function (t) {
                var e = /firefox/i.test(g());
                if (/Trident/i.test(g()) && f(t) && "fixed" === k(t).position) return null;
                var n = I(t);
                for (l(n) && (n = n.host); f(n) && ["html", "body"].indexOf(b(n)) < 0;) {
                    var r = k(n);
                    if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || e && "filter" === r.willChange || e && r.filter && "none" !== r.filter) return n;
                    n = n.parentNode
                }
                return null
            }(t) || e
        }

        var L = "top", P = "bottom", j = "right", C = "left", R = "auto", U = [L, P, j, C], z = "start", N = "end",
            W = "viewport", q = "popper", K = U.reduce((function (t, e) {
                return t.concat([e + "-" + z, e + "-" + N])
            }), []), D = [].concat(U, [R]).reduce((function (t, e) {
                return t.concat([e, e + "-" + z, e + "-" + N])
            }), []),
            F = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

        function H(t) {
            var e = new Map, n = new Set, r = [];

            function i(t) {
                n.add(t.name), [].concat(t.requires || [], t.requiresIfExists || []).forEach((function (t) {
                    if (!n.has(t)) {
                        var r = e.get(t);
                        r && i(r)
                    }
                })), r.push(t)
            }

            return t.forEach((function (t) {
                e.set(t.name, t)
            })), t.forEach((function (t) {
                n.has(t.name) || i(t)
            })), r
        }

        var V = {placement: "bottom", modifiers: [], strategy: "absolute"};

        function J() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            return !e.some((function (t) {
                return !(t && "function" == typeof t.getBoundingClientRect)
            }))
        }

        function Z(t) {
            void 0 === t && (t = {});
            var e = t, n = e.defaultModifiers, r = void 0 === n ? [] : n, i = e.defaultOptions,
                o = void 0 === i ? V : i;
            return function (t, e, n) {
                void 0 === n && (n = o);
                var i, a, s = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, V, o),
                    modifiersData: {},
                    elements: {reference: t, popper: e},
                    attributes: {},
                    styles: {}
                }, u = [], f = !1, l = {
                    state: s, setOptions: function (n) {
                        var i = "function" == typeof n ? n(s.options) : n;
                        h(), s.options = Object.assign({}, o, s.options, i), s.scrollParents = {
                            reference: c(t) ? M(t) : t.contextElement ? M(t.contextElement) : [],
                            popper: M(e)
                        };
                        var a, f, d = function (t) {
                            var e = H(t);
                            return F.reduce((function (t, n) {
                                return t.concat(e.filter((function (t) {
                                    return t.phase === n
                                })))
                            }), [])
                        }((a = [].concat(r, s.options.modifiers), f = a.reduce((function (t, e) {
                            var n = t[e.name];
                            return t[e.name] = n ? Object.assign({}, n, e, {
                                options: Object.assign({}, n.options, e.options),
                                data: Object.assign({}, n.data, e.data)
                            }) : e, t
                        }), {}), Object.keys(f).map((function (t) {
                            return f[t]
                        }))));
                        return s.orderedModifiers = d.filter((function (t) {
                            return t.enabled
                        })), s.orderedModifiers.forEach((function (t) {
                            var e = t.name, n = t.options, r = void 0 === n ? {} : n, i = t.effect;
                            if ("function" == typeof i) {
                                var o = i({state: s, name: e, instance: l, options: r});
                                u.push(o || function () {
                                })
                            }
                        })), l.update()
                    }, forceUpdate: function () {
                        if (!f) {
                            var t = s.elements, e = t.reference, n = t.popper;
                            if (J(e, n)) {
                                s.rects = {
                                    reference: A(e, T(n), "fixed" === s.options.strategy),
                                    popper: S(n)
                                }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function (t) {
                                    return s.modifiersData[t.name] = Object.assign({}, t.data)
                                }));
                                for (var r = 0; r < s.orderedModifiers.length; r++) if (!0 !== s.reset) {
                                    var i = s.orderedModifiers[r], o = i.fn, a = i.options, u = void 0 === a ? {} : a,
                                        c = i.name;
                                    "function" == typeof o && (s = o({state: s, options: u, name: c, instance: l}) || s)
                                } else s.reset = !1, r = -1
                            }
                        }
                    }, update: (i = function () {
                        return new Promise((function (t) {
                            l.forceUpdate(), t(s)
                        }))
                    }, function () {
                        return a || (a = new Promise((function (t) {
                            Promise.resolve().then((function () {
                                a = void 0, t(i())
                            }))
                        }))), a
                    }), destroy: function () {
                        h(), f = !0
                    }
                };
                if (!J(t, e)) return l;

                function h() {
                    u.forEach((function (t) {
                        return t()
                    })), u = []
                }

                return l.setOptions(n).then((function (t) {
                    !f && n.onFirstUpdate && n.onFirstUpdate(t)
                })), l
            }
        }

        var G = {passive: !0};

        function Y(t) {
            return t.split("-")[0]
        }

        function X(t) {
            return t.split("-")[1]
        }

        function Q(t) {
            return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y"
        }

        function tt(t) {
            var e, n = t.reference, r = t.element, i = t.placement, o = i ? Y(i) : null, a = i ? X(i) : null,
                s = n.x + n.width / 2 - r.width / 2, u = n.y + n.height / 2 - r.height / 2;
            switch (o) {
                case L:
                    e = {x: s, y: n.y - r.height};
                    break;
                case P:
                    e = {x: s, y: n.y + n.height};
                    break;
                case j:
                    e = {x: n.x + n.width, y: u};
                    break;
                case C:
                    e = {x: n.x - r.width, y: u};
                    break;
                default:
                    e = {x: n.x, y: n.y}
            }
            var c = o ? Q(o) : null;
            if (null != c) {
                var f = "y" === c ? "height" : "width";
                switch (a) {
                    case z:
                        e[c] = e[c] - (n[f] / 2 - r[f] / 2);
                        break;
                    case N:
                        e[c] = e[c] + (n[f] / 2 - r[f] / 2)
                }
            }
            return e
        }

        var et = {top: "auto", right: "auto", bottom: "auto", left: "auto"};

        function nt(t) {
            var e, n = t.popper, r = t.popperRect, i = t.placement, o = t.variation, a = t.offsets, s = t.position,
                c = t.gpuAcceleration, f = t.adaptive, l = t.roundOffsets, h = t.isFixed, d = a.x,
                g = void 0 === d ? 0 : d, y = a.y, m = void 0 === y ? 0 : y,
                v = "function" == typeof l ? l({x: g, y: m}) : {x: g, y: m};
            g = v.x, m = v.y;
            var b = a.hasOwnProperty("x"), x = a.hasOwnProperty("y"), E = C, A = L, S = window;
            if (f) {
                var I = T(n), B = "clientHeight", M = "clientWidth";
                I === u(n) && "static" !== k(I = w(n)).position && "absolute" === s && (B = "scrollHeight", M = "scrollWidth"), (i === L || (i === C || i === j) && o === N) && (A = P, m -= (h && I === S && S.visualViewport ? S.visualViewport.height : I[B]) - r.height, m *= c ? 1 : -1), i !== C && (i !== L && i !== P || o !== N) || (E = j, g -= (h && I === S && S.visualViewport ? S.visualViewport.width : I[M]) - r.width, g *= c ? 1 : -1)
            }
            var O, _ = Object.assign({position: s}, f && et), $ = !0 === l ? function (t, e) {
                var n = t.x, r = t.y, i = e.devicePixelRatio || 1;
                return {x: p(n * i) / i || 0, y: p(r * i) / i || 0}
            }({x: g, y: m}, u(n)) : {x: g, y: m};
            return g = $.x, m = $.y, c ? Object.assign({}, _, ((O = {})[A] = x ? "0" : "", O[E] = b ? "0" : "", O.transform = (S.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + m + "px)" : "translate3d(" + g + "px, " + m + "px, 0)", O)) : Object.assign({}, _, ((e = {})[A] = x ? m + "px" : "", e[E] = b ? g + "px" : "", e.transform = "", e))
        }

        const rt = {
            name: "applyStyles", enabled: !0, phase: "write", fn: function (t) {
                var e = t.state;
                Object.keys(e.elements).forEach((function (t) {
                    var n = e.styles[t] || {}, r = e.attributes[t] || {}, i = e.elements[t];
                    f(i) && b(i) && (Object.assign(i.style, n), Object.keys(r).forEach((function (t) {
                        var e = r[t];
                        !1 === e ? i.removeAttribute(t) : i.setAttribute(t, !0 === e ? "" : e)
                    })))
                }))
            }, effect: function (t) {
                var e = t.state, n = {
                    popper: {position: e.options.strategy, left: "0", top: "0", margin: "0"},
                    arrow: {position: "absolute"},
                    reference: {}
                };
                return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow), function () {
                    Object.keys(e.elements).forEach((function (t) {
                        var r = e.elements[t], i = e.attributes[t] || {},
                            o = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : n[t]).reduce((function (t, e) {
                                return t[e] = "", t
                            }), {});
                        f(r) && b(r) && (Object.assign(r.style, o), Object.keys(i).forEach((function (t) {
                            r.removeAttribute(t)
                        })))
                    }))
                }
            }, requires: ["computeStyles"]
        };
        var it = {left: "right", right: "left", bottom: "top", top: "bottom"};

        function ot(t) {
            return t.replace(/left|right|bottom|top/g, (function (t) {
                return it[t]
            }))
        }

        var at = {start: "end", end: "start"};

        function st(t) {
            return t.replace(/start|end/g, (function (t) {
                return at[t]
            }))
        }

        function ut(t, e) {
            var n = e.getRootNode && e.getRootNode();
            if (t.contains(e)) return !0;
            if (n && l(n)) {
                var r = e;
                do {
                    if (r && t.isSameNode(r)) return !0;
                    r = r.parentNode || r.host
                } while (r)
            }
            return !1
        }

        function ct(t) {
            return Object.assign({}, t, {left: t.x, top: t.y, right: t.x + t.width, bottom: t.y + t.height})
        }

        function ft(t, e, n) {
            return e === W ? ct(function (t, e) {
                var n = u(t), r = w(t), i = n.visualViewport, o = r.clientWidth, a = r.clientHeight, s = 0, c = 0;
                if (i) {
                    o = i.width, a = i.height;
                    var f = y();
                    (f || !f && "fixed" === e) && (s = i.offsetLeft, c = i.offsetTop)
                }
                return {width: o, height: a, x: s + x(t), y: c}
            }(t, n)) : c(e) ? function (t, e) {
                var n = m(t, !1, "fixed" === e);
                return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n
            }(e, n) : ct(function (t) {
                var e, n = w(t), r = v(t), i = null == (e = t.ownerDocument) ? void 0 : e.body,
                    o = h(n.scrollWidth, n.clientWidth, i ? i.scrollWidth : 0, i ? i.clientWidth : 0),
                    a = h(n.scrollHeight, n.clientHeight, i ? i.scrollHeight : 0, i ? i.clientHeight : 0),
                    s = -r.scrollLeft + x(t), u = -r.scrollTop;
                return "rtl" === k(i || n).direction && (s += h(n.clientWidth, i ? i.clientWidth : 0) - o), {
                    width: o,
                    height: a,
                    x: s,
                    y: u
                }
            }(w(t)))
        }

        function lt(t) {
            return Object.assign({}, {top: 0, right: 0, bottom: 0, left: 0}, t)
        }

        function ht(t, e) {
            return e.reduce((function (e, n) {
                return e[n] = t, e
            }), {})
        }

        function dt(t, e) {
            void 0 === e && (e = {});
            var n = e, r = n.placement, i = void 0 === r ? t.placement : r, o = n.strategy,
                a = void 0 === o ? t.strategy : o, s = n.boundary, u = void 0 === s ? "clippingParents" : s,
                l = n.rootBoundary, p = void 0 === l ? W : l, g = n.elementContext, y = void 0 === g ? q : g,
                v = n.altBoundary, x = void 0 !== v && v, E = n.padding, A = void 0 === E ? 0 : E,
                S = lt("number" != typeof A ? A : ht(A, U)), B = y === q ? "reference" : q, O = t.rects.popper,
                _ = t.elements[x ? B : y], $ = function (t, e, n, r) {
                    var i = "clippingParents" === e ? function (t) {
                        var e = M(I(t)), n = ["absolute", "fixed"].indexOf(k(t).position) >= 0 && f(t) ? T(t) : t;
                        return c(n) ? e.filter((function (t) {
                            return c(t) && ut(t, n) && "body" !== b(t)
                        })) : []
                    }(t) : [].concat(e), o = [].concat(i, [n]), a = o[0], s = o.reduce((function (e, n) {
                        var i = ft(t, n, r);
                        return e.top = h(i.top, e.top), e.right = d(i.right, e.right), e.bottom = d(i.bottom, e.bottom), e.left = h(i.left, e.left), e
                    }), ft(t, a, r));
                    return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s
                }(c(_) ? _ : _.contextElement || w(t.elements.popper), u, p, a), C = m(t.elements.reference),
                R = tt({reference: C, element: O, strategy: "absolute", placement: i}), z = ct(Object.assign({}, O, R)),
                N = y === q ? z : C, K = {
                    top: $.top - N.top + S.top,
                    bottom: N.bottom - $.bottom + S.bottom,
                    left: $.left - N.left + S.left,
                    right: N.right - $.right + S.right
                }, D = t.modifiersData.offset;
            if (y === q && D) {
                var F = D[i];
                Object.keys(K).forEach((function (t) {
                    var e = [j, P].indexOf(t) >= 0 ? 1 : -1, n = [L, P].indexOf(t) >= 0 ? "y" : "x";
                    K[t] += F[n] * e
                }))
            }
            return K
        }

        const pt = {
            name: "flip", enabled: !0, phase: "main", fn: function (t) {
                var e = t.state, n = t.options, r = t.name;
                if (!e.modifiersData[r]._skip) {
                    for (var i = n.mainAxis, o = void 0 === i || i, a = n.altAxis, s = void 0 === a || a, u = n.fallbackPlacements, c = n.padding, f = n.boundary, l = n.rootBoundary, h = n.altBoundary, d = n.flipVariations, p = void 0 === d || d, g = n.allowedAutoPlacements, y = e.options.placement, m = Y(y), v = u || (m !== y && p ? function (t) {
                        if (Y(t) === R) return [];
                        var e = ot(t);
                        return [st(t), e, st(e)]
                    }(y) : [ot(y)]), b = [y].concat(v).reduce((function (t, n) {
                        return t.concat(Y(n) === R ? function (t, e) {
                            void 0 === e && (e = {});
                            var n = e, r = n.placement, i = n.boundary, o = n.rootBoundary, a = n.padding,
                                s = n.flipVariations, u = n.allowedAutoPlacements, c = void 0 === u ? D : u, f = X(r),
                                l = f ? s ? K : K.filter((function (t) {
                                    return X(t) === f
                                })) : U, h = l.filter((function (t) {
                                    return c.indexOf(t) >= 0
                                }));
                            0 === h.length && (h = l);
                            var d = h.reduce((function (e, n) {
                                return e[n] = dt(t, {placement: n, boundary: i, rootBoundary: o, padding: a})[Y(n)], e
                            }), {});
                            return Object.keys(d).sort((function (t, e) {
                                return d[t] - d[e]
                            }))
                        }(e, {
                            placement: n,
                            boundary: f,
                            rootBoundary: l,
                            padding: c,
                            flipVariations: p,
                            allowedAutoPlacements: g
                        }) : n)
                    }), []), w = e.rects.reference, x = e.rects.popper, k = new Map, E = !0, A = b[0], S = 0; S < b.length; S++) {
                        var I = b[S], B = Y(I), M = X(I) === z, O = [L, P].indexOf(B) >= 0, _ = O ? "width" : "height",
                            T = dt(e, {placement: I, boundary: f, rootBoundary: l, altBoundary: h, padding: c}),
                            $ = O ? M ? j : C : M ? P : L;
                        w[_] > x[_] && ($ = ot($));
                        var N = ot($), W = [];
                        if (o && W.push(T[B] <= 0), s && W.push(T[$] <= 0, T[N] <= 0), W.every((function (t) {
                            return t
                        }))) {
                            A = I, E = !1;
                            break
                        }
                        k.set(I, W)
                    }
                    if (E) for (var q = function (t) {
                        var e = b.find((function (e) {
                            var n = k.get(e);
                            if (n) return n.slice(0, t).every((function (t) {
                                return t
                            }))
                        }));
                        if (e) return A = e, "break"
                    }, F = p ? 3 : 1; F > 0 && "break" !== q(F); F--) ;
                    e.placement !== A && (e.modifiersData[r]._skip = !0, e.placement = A, e.reset = !0)
                }
            }, requiresIfExists: ["offset"], data: {_skip: !1}
        };

        function gt(t, e, n) {
            return h(t, d(e, n))
        }

        function yt(t, e, n) {
            return void 0 === n && (n = {x: 0, y: 0}), {
                top: t.top - e.height - n.y,
                right: t.right - e.width + n.x,
                bottom: t.bottom - e.height + n.y,
                left: t.left - e.width - n.x
            }
        }

        function mt(t) {
            return [L, j, P, C].some((function (e) {
                return t[e] >= 0
            }))
        }

        var vt = Z({
                defaultModifiers: [{
                    name: "eventListeners", enabled: !0, phase: "write", fn: function () {
                    }, effect: function (t) {
                        var e = t.state, n = t.instance, r = t.options, i = r.scroll, o = void 0 === i || i, a = r.resize,
                            s = void 0 === a || a, c = u(e.elements.popper),
                            f = [].concat(e.scrollParents.reference, e.scrollParents.popper);
                        return o && f.forEach((function (t) {
                            t.addEventListener("scroll", n.update, G)
                        })), s && c.addEventListener("resize", n.update, G), function () {
                            o && f.forEach((function (t) {
                                t.removeEventListener("scroll", n.update, G)
                            })), s && c.removeEventListener("resize", n.update, G)
                        }
                    }, data: {}
                }, {
                    name: "popperOffsets", enabled: !0, phase: "read", fn: function (t) {
                        var e = t.state, n = t.name;
                        e.modifiersData[n] = tt({
                            reference: e.rects.reference,
                            element: e.rects.popper,
                            strategy: "absolute",
                            placement: e.placement
                        })
                    }, data: {}
                }, {
                    name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: function (t) {
                        var e = t.state, n = t.options, r = n.gpuAcceleration, i = void 0 === r || r, o = n.adaptive,
                            a = void 0 === o || o, s = n.roundOffsets, u = void 0 === s || s, c = {
                                placement: Y(e.placement),
                                variation: X(e.placement),
                                popper: e.elements.popper,
                                popperRect: e.rects.popper,
                                gpuAcceleration: i,
                                isFixed: "fixed" === e.options.strategy
                            };
                        null != e.modifiersData.popperOffsets && (e.styles.popper = Object.assign({}, e.styles.popper, nt(Object.assign({}, c, {
                            offsets: e.modifiersData.popperOffsets,
                            position: e.options.strategy,
                            adaptive: a,
                            roundOffsets: u
                        })))), null != e.modifiersData.arrow && (e.styles.arrow = Object.assign({}, e.styles.arrow, nt(Object.assign({}, c, {
                            offsets: e.modifiersData.arrow,
                            position: "absolute",
                            adaptive: !1,
                            roundOffsets: u
                        })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {"data-popper-placement": e.placement})
                    }, data: {}
                }, rt, {
                    name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: function (t) {
                        var e = t.state, n = t.options, r = t.name, i = n.offset, o = void 0 === i ? [0, 0] : i,
                            a = D.reduce((function (t, n) {
                                return t[n] = function (t, e, n) {
                                    var r = Y(t), i = [C, L].indexOf(r) >= 0 ? -1 : 1,
                                        o = "function" == typeof n ? n(Object.assign({}, e, {placement: t})) : n, a = o[0],
                                        s = o[1];
                                    return a = a || 0, s = (s || 0) * i, [C, j].indexOf(r) >= 0 ? {x: s, y: a} : {
                                        x: a,
                                        y: s
                                    }
                                }(n, e.rects, o), t
                            }), {}), s = a[e.placement], u = s.x, c = s.y;
                        null != e.modifiersData.popperOffsets && (e.modifiersData.popperOffsets.x += u, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = a
                    }
                }, pt, {
                    name: "preventOverflow", enabled: !0, phase: "main", fn: function (t) {
                        var e = t.state, n = t.options, r = t.name, i = n.mainAxis, o = void 0 === i || i, a = n.altAxis,
                            s = void 0 !== a && a, u = n.boundary, c = n.rootBoundary, f = n.altBoundary, l = n.padding,
                            p = n.tether, g = void 0 === p || p, y = n.tetherOffset, m = void 0 === y ? 0 : y,
                            v = dt(e, {boundary: u, rootBoundary: c, padding: l, altBoundary: f}), b = Y(e.placement),
                            w = X(e.placement), x = !w, k = Q(b), E = "x" === k ? "y" : "x",
                            A = e.modifiersData.popperOffsets, I = e.rects.reference, B = e.rects.popper,
                            M = "function" == typeof m ? m(Object.assign({}, e.rects, {placement: e.placement})) : m,
                            O = "number" == typeof M ? {mainAxis: M, altAxis: M} : Object.assign({
                                mainAxis: 0,
                                altAxis: 0
                            }, M), _ = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null,
                            $ = {x: 0, y: 0};
                        if (A) {
                            if (o) {
                                var R, U = "y" === k ? L : C, N = "y" === k ? P : j, W = "y" === k ? "height" : "width",
                                    q = A[k], K = q + v[U], D = q - v[N], F = g ? -B[W] / 2 : 0, H = w === z ? I[W] : B[W],
                                    V = w === z ? -B[W] : -I[W], J = e.elements.arrow,
                                    Z = g && J ? S(J) : {width: 0, height: 0},
                                    G = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : {
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0
                                    }, tt = G[U], et = G[N], nt = gt(0, I[W], Z[W]),
                                    rt = x ? I[W] / 2 - F - nt - tt - O.mainAxis : H - nt - tt - O.mainAxis,
                                    it = x ? -I[W] / 2 + F + nt + et + O.mainAxis : V + nt + et + O.mainAxis,
                                    ot = e.elements.arrow && T(e.elements.arrow),
                                    at = ot ? "y" === k ? ot.clientTop || 0 : ot.clientLeft || 0 : 0,
                                    st = null != (R = null == _ ? void 0 : _[k]) ? R : 0, ut = q + it - st,
                                    ct = gt(g ? d(K, q + rt - st - at) : K, q, g ? h(D, ut) : D);
                                A[k] = ct, $[k] = ct - q
                            }
                            if (s) {
                                var ft, lt = "x" === k ? L : C, ht = "x" === k ? P : j, pt = A[E],
                                    yt = "y" === E ? "height" : "width", mt = pt + v[lt], vt = pt - v[ht],
                                    bt = -1 !== [L, C].indexOf(b), wt = null != (ft = null == _ ? void 0 : _[E]) ? ft : 0,
                                    xt = bt ? mt : pt - I[yt] - B[yt] - wt + O.altAxis,
                                    kt = bt ? pt + I[yt] + B[yt] - wt - O.altAxis : vt, Et = g && bt ? function (t, e, n) {
                                        var r = gt(t, e, n);
                                        return r > n ? n : r
                                    }(xt, pt, kt) : gt(g ? xt : mt, pt, g ? kt : vt);
                                A[E] = Et, $[E] = Et - pt
                            }
                            e.modifiersData[r] = $
                        }
                    }, requiresIfExists: ["offset"]
                }, {
                    name: "arrow", enabled: !0, phase: "main", fn: function (t) {
                        var e, n = t.state, r = t.name, i = t.options, o = n.elements.arrow,
                            a = n.modifiersData.popperOffsets, s = Y(n.placement), u = Q(s),
                            c = [C, j].indexOf(s) >= 0 ? "height" : "width";
                        if (o && a) {
                            var f = function (t, e) {
                                    return lt("number" != typeof (t = "function" == typeof t ? t(Object.assign({}, e.rects, {placement: e.placement})) : t) ? t : ht(t, U))
                                }(i.padding, n), l = S(o), h = "y" === u ? L : C, d = "y" === u ? P : j,
                                p = n.rects.reference[c] + n.rects.reference[u] - a[u] - n.rects.popper[c],
                                g = a[u] - n.rects.reference[u], y = T(o),
                                m = y ? "y" === u ? y.clientHeight || 0 : y.clientWidth || 0 : 0, v = p / 2 - g / 2,
                                b = f[h], w = m - l[c] - f[d], x = m / 2 - l[c] / 2 + v, k = gt(b, x, w), E = u;
                            n.modifiersData[r] = ((e = {})[E] = k, e.centerOffset = k - x, e)
                        }
                    }, effect: function (t) {
                        var e = t.state, n = t.options.element, r = void 0 === n ? "[data-popper-arrow]" : n;
                        null != r && ("string" != typeof r || (r = e.elements.popper.querySelector(r))) && ut(e.elements.popper, r) && (e.elements.arrow = r)
                    }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"]
                }, {
                    name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: function (t) {
                        var e = t.state, n = t.name, r = e.rects.reference, i = e.rects.popper,
                            o = e.modifiersData.preventOverflow, a = dt(e, {elementContext: "reference"}),
                            s = dt(e, {altBoundary: !0}), u = yt(a, r), c = yt(s, i, o), f = mt(u), l = mt(c);
                        e.modifiersData[n] = {
                            referenceClippingOffsets: u,
                            popperEscapeOffsets: c,
                            isReferenceHidden: f,
                            hasPopperEscaped: l
                        }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
                            "data-popper-reference-hidden": f,
                            "data-popper-escaped": l
                        })
                    }
                }]
            }), bt = "tippy-content", wt = "tippy-backdrop", xt = "tippy-arrow", kt = "tippy-svg-arrow",
            Et = {passive: !0, capture: !0}, At = function () {
                return document.body
            };

        function St(t, e, n) {
            if (Array.isArray(t)) {
                var r = t[e];
                return null == r ? Array.isArray(n) ? n[e] : n : r
            }
            return t
        }

        function It(t, e) {
            var n = {}.toString.call(t);
            return 0 === n.indexOf("[object") && n.indexOf(e + "]") > -1
        }

        function Bt(t, e) {
            return "function" == typeof t ? t.apply(void 0, e) : t
        }

        function Mt(t, e) {
            return 0 === e ? t : function (r) {
                clearTimeout(n), n = setTimeout((function () {
                    t(r)
                }), e)
            };
            var n
        }

        function Ot(t) {
            return [].concat(t)
        }

        function _t(t, e) {
            -1 === t.indexOf(e) && t.push(e)
        }

        function Tt(t) {
            return [].slice.call(t)
        }

        function Lt(t) {
            return Object.keys(t).reduce((function (e, n) {
                return void 0 !== t[n] && (e[n] = t[n]), e
            }), {})
        }

        function Pt() {
            return document.createElement("div")
        }

        function $t(t) {
            return ["Element", "Fragment"].some((function (e) {
                return It(t, e)
            }))
        }

        function jt(t, e) {
            t.forEach((function (t) {
                t && (t.style.transitionDuration = e + "ms")
            }))
        }

        function Ct(t, e) {
            t.forEach((function (t) {
                t && t.setAttribute("data-state", e)
            }))
        }

        function Rt(t, e, n) {
            var r = e + "EventListener";
            ["transitionend", "webkitTransitionEnd"].forEach((function (e) {
                t[r](e, n)
            }))
        }

        function Ut(t, e) {
            for (var n = e; n;) {
                var r;
                if (t.contains(n)) return !0;
                n = null == n.getRootNode || null == (r = n.getRootNode()) ? void 0 : r.host
            }
            return !1
        }

        var zt = {isTouch: !1}, Nt = 0;

        function Wt() {
            zt.isTouch || (zt.isTouch = !0, window.performance && document.addEventListener("mousemove", qt))
        }

        function qt() {
            var t = performance.now();
            t - Nt < 20 && (zt.isTouch = !1, document.removeEventListener("mousemove", qt)), Nt = t
        }

        function Kt() {
            var t, e = document.activeElement;
            if ((t = e) && t._tippy && t._tippy.reference === t) {
                var n = e._tippy;
                e.blur && !n.state.isVisible && e.blur()
            }
        }

        var Dt = !("undefined" == typeof window || "undefined" == typeof document || !window.msCrypto),
            Ft = Object.assign({
                appendTo: At,
                aria: {content: "auto", expanded: "auto"},
                delay: 0,
                duration: [300, 250],
                getReferenceClientRect: null,
                hideOnClick: !0,
                ignoreAttributes: !1,
                interactive: !1,
                interactiveBorder: 2,
                interactiveDebounce: 0,
                moveTransition: "",
                offset: [0, 10],
                onAfterUpdate: function () {
                },
                onBeforeUpdate: function () {
                },
                onCreate: function () {
                },
                onDestroy: function () {
                },
                onHidden: function () {
                },
                onHide: function () {
                },
                onMount: function () {
                },
                onShow: function () {
                },
                onShown: function () {
                },
                onTrigger: function () {
                },
                onUntrigger: function () {
                },
                onClickOutside: function () {
                },
                placement: "top",
                plugins: [],
                popperOptions: {},
                render: null,
                showOnCreate: !1,
                touch: !0,
                trigger: "mouseenter focus",
                triggerTarget: null
            }, {animateFill: !1, followCursor: !1, inlinePositioning: !1, sticky: !1}, {
                allowHTML: !1,
                animation: "fade",
                arrow: !0,
                content: "",
                inertia: !1,
                maxWidth: 350,
                role: "tooltip",
                theme: "",
                zIndex: 9999
            }), Ht = Object.keys(Ft);

        function Vt(t) {
            var e = (t.plugins || []).reduce((function (e, n) {
                var r, i = n.name, o = n.defaultValue;
                return i && (e[i] = void 0 !== t[i] ? t[i] : null != (r = Ft[i]) ? r : o), e
            }), {});
            return Object.assign({}, t, e)
        }

        function Jt(t, e) {
            var n = Object.assign({}, e, {content: Bt(e.content, [t])}, e.ignoreAttributes ? {} : function (t, e) {
                return (e ? Object.keys(Vt(Object.assign({}, Ft, {plugins: e}))) : Ht).reduce((function (e, n) {
                    var r = (t.getAttribute("data-tippy-" + n) || "").trim();
                    if (!r) return e;
                    if ("content" === n) e[n] = r; else try {
                        e[n] = JSON.parse(r)
                    } catch (t) {
                        e[n] = r
                    }
                    return e
                }), {})
            }(t, e.plugins));
            return n.aria = Object.assign({}, Ft.aria, n.aria), n.aria = {
                expanded: "auto" === n.aria.expanded ? e.interactive : n.aria.expanded,
                content: "auto" === n.aria.content ? e.interactive ? null : "describedby" : n.aria.content
            }, n
        }

        var Zt = function () {
            return "innerHTML"
        };

        function Gt(t, e) {
            t[Zt()] = e
        }

        function Yt(t) {
            var e = Pt();
            return !0 === t ? e.className = xt : (e.className = kt, $t(t) ? e.appendChild(t) : Gt(e, t)), e
        }

        function Xt(t, e) {
            $t(e.content) ? (Gt(t, ""), t.appendChild(e.content)) : "function" != typeof e.content && (e.allowHTML ? Gt(t, e.content) : t.textContent = e.content)
        }

        function Qt(t) {
            var e = t.firstElementChild, n = Tt(e.children);
            return {
                box: e, content: n.find((function (t) {
                    return t.classList.contains(bt)
                })), arrow: n.find((function (t) {
                    return t.classList.contains(xt) || t.classList.contains(kt)
                })), backdrop: n.find((function (t) {
                    return t.classList.contains(wt)
                }))
            }
        }

        function te(t) {
            var e = Pt(), n = Pt();
            n.className = "tippy-box", n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
            var r = Pt();

            function i(n, r) {
                var i = Qt(e), o = i.box, a = i.content, s = i.arrow;
                r.theme ? o.setAttribute("data-theme", r.theme) : o.removeAttribute("data-theme"), "string" == typeof r.animation ? o.setAttribute("data-animation", r.animation) : o.removeAttribute("data-animation"), r.inertia ? o.setAttribute("data-inertia", "") : o.removeAttribute("data-inertia"), o.style.maxWidth = "number" == typeof r.maxWidth ? r.maxWidth + "px" : r.maxWidth, r.role ? o.setAttribute("role", r.role) : o.removeAttribute("role"), n.content === r.content && n.allowHTML === r.allowHTML || Xt(a, t.props), r.arrow ? s ? n.arrow !== r.arrow && (o.removeChild(s), o.appendChild(Yt(r.arrow))) : o.appendChild(Yt(r.arrow)) : s && o.removeChild(s)
            }

            return r.className = bt, r.setAttribute("data-state", "hidden"), Xt(r, t.props), e.appendChild(n), n.appendChild(r), i(t.props, t.props), {
                popper: e,
                onUpdate: i
            }
        }

        te.$$tippy = !0;
        var ee = 1, ne = [], re = [];

        function ie(t, e) {
            var n, r, i, o, a, s, u, c, f = Jt(t, Object.assign({}, Ft, Vt(Lt(e)))), l = !1, h = !1, d = !1, p = !1,
                g = [], y = Mt(V, f.interactiveDebounce), m = ee++, v = (c = f.plugins).filter((function (t, e) {
                    return c.indexOf(t) === e
                })), b = {
                    id: m,
                    reference: t,
                    popper: Pt(),
                    popperInstance: null,
                    props: f,
                    state: {isEnabled: !0, isVisible: !1, isDestroyed: !1, isMounted: !1, isShown: !1},
                    plugins: v,
                    clearDelayTimeouts: function () {
                        clearTimeout(n), clearTimeout(r), cancelAnimationFrame(i)
                    },
                    setProps: function (e) {
                        if (!b.state.isDestroyed) {
                            P("onBeforeUpdate", [b, e]), F();
                            var n = b.props, r = Jt(t, Object.assign({}, n, Lt(e), {ignoreAttributes: !0}));
                            b.props = r, D(), n.interactiveDebounce !== r.interactiveDebounce && (C(), y = Mt(V, r.interactiveDebounce)), n.triggerTarget && !r.triggerTarget ? Ot(n.triggerTarget).forEach((function (t) {
                                t.removeAttribute("aria-expanded")
                            })) : r.triggerTarget && t.removeAttribute("aria-expanded"), j(), L(), k && k(n, r), b.popperInstance && (Y(), Q().forEach((function (t) {
                                requestAnimationFrame(t._tippy.popperInstance.forceUpdate)
                            }))), P("onAfterUpdate", [b, e])
                        }
                    },
                    setContent: function (t) {
                        b.setProps({content: t})
                    },
                    show: function () {
                        var t = b.state.isVisible, e = b.state.isDestroyed, n = !b.state.isEnabled,
                            r = zt.isTouch && !b.props.touch, i = St(b.props.duration, 0, Ft.duration);
                        if (!(t || e || n || r || M().hasAttribute("disabled") || (P("onShow", [b], !1), !1 === b.props.onShow(b)))) {
                            if (b.state.isVisible = !0, B() && (x.style.visibility = "visible"), L(), N(), b.state.isMounted || (x.style.transition = "none"), B()) {
                                var o = _();
                                jt([o.box, o.content], 0)
                            }
                            var a, u, c;
                            s = function () {
                                var t;
                                if (b.state.isVisible && !p) {
                                    if (p = !0, x.offsetHeight, x.style.transition = b.props.moveTransition, B() && b.props.animation) {
                                        var e = _(), n = e.box, r = e.content;
                                        jt([n, r], i), Ct([n, r], "visible")
                                    }
                                    $(), j(), _t(re, b), null == (t = b.popperInstance) || t.forceUpdate(), P("onMount", [b]), b.props.animation && B() && function (t, e) {
                                        q(t, (function () {
                                            b.state.isShown = !0, P("onShown", [b])
                                        }))
                                    }(i)
                                }
                            }, u = b.props.appendTo, c = M(), (a = b.props.interactive && u === At || "parent" === u ? c.parentNode : Bt(u, [c])).contains(x) || a.appendChild(x), b.state.isMounted = !0, Y()
                        }
                    },
                    hide: function () {
                        var t = !b.state.isVisible, e = b.state.isDestroyed, n = !b.state.isEnabled,
                            r = St(b.props.duration, 1, Ft.duration);
                        if (!(t || e || n) && (P("onHide", [b], !1), !1 !== b.props.onHide(b))) {
                            if (b.state.isVisible = !1, b.state.isShown = !1, p = !1, l = !1, B() && (x.style.visibility = "hidden"), C(), W(), L(!0), B()) {
                                var i = _(), o = i.box, a = i.content;
                                b.props.animation && (jt([o, a], r), Ct([o, a], "hidden"))
                            }
                            $(), j(), b.props.animation ? B() && function (t, e) {
                                q(t, (function () {
                                    !b.state.isVisible && x.parentNode && x.parentNode.contains(x) && e()
                                }))
                            }(r, b.unmount) : b.unmount()
                        }
                    },
                    hideWithInteractivity: function (t) {
                        O().addEventListener("mousemove", y), _t(ne, y), y(t)
                    },
                    enable: function () {
                        b.state.isEnabled = !0
                    },
                    disable: function () {
                        b.hide(), b.state.isEnabled = !1
                    },
                    unmount: function () {
                        b.state.isVisible && b.hide(), b.state.isMounted && (X(), Q().forEach((function (t) {
                            t._tippy.unmount()
                        })), x.parentNode && x.parentNode.removeChild(x), re = re.filter((function (t) {
                            return t !== b
                        })), b.state.isMounted = !1, P("onHidden", [b]))
                    },
                    destroy: function () {
                        b.state.isDestroyed || (b.clearDelayTimeouts(), b.unmount(), F(), delete t._tippy, b.state.isDestroyed = !0, P("onDestroy", [b]))
                    }
                };
            if (!f.render) return b;
            var w = f.render(b), x = w.popper, k = w.onUpdate;
            x.setAttribute("data-tippy-root", ""), x.id = "tippy-" + b.id, b.popper = x, t._tippy = b, x._tippy = b;
            var E = v.map((function (t) {
                return t.fn(b)
            })), A = t.hasAttribute("aria-expanded");
            return D(), j(), L(), P("onCreate", [b]), f.showOnCreate && tt(), x.addEventListener("mouseenter", (function () {
                b.props.interactive && b.state.isVisible && b.clearDelayTimeouts()
            })), x.addEventListener("mouseleave", (function () {
                b.props.interactive && b.props.trigger.indexOf("mouseenter") >= 0 && O().addEventListener("mousemove", y)
            })), b;

            function S() {
                var t = b.props.touch;
                return Array.isArray(t) ? t : [t, 0]
            }

            function I() {
                return "hold" === S()[0]
            }

            function B() {
                var t;
                return !(null == (t = b.props.render) || !t.$$tippy)
            }

            function M() {
                return u || t
            }

            function O() {
                var t, e, n = M().parentNode;
                return n ? null != (e = Ot(n)[0]) && null != (t = e.ownerDocument) && t.body ? e.ownerDocument : document : document
            }

            function _() {
                return Qt(x)
            }

            function T(t) {
                return b.state.isMounted && !b.state.isVisible || zt.isTouch || o && "focus" === o.type ? 0 : St(b.props.delay, t ? 0 : 1, Ft.delay)
            }

            function L(t) {
                void 0 === t && (t = !1), x.style.pointerEvents = b.props.interactive && !t ? "" : "none", x.style.zIndex = "" + b.props.zIndex
            }

            function P(t, e, n) {
                var r;
                void 0 === n && (n = !0), E.forEach((function (n) {
                    n[t] && n[t].apply(n, e)
                })), n && (r = b.props)[t].apply(r, e)
            }

            function $() {
                var e = b.props.aria;
                if (e.content) {
                    var n = "aria-" + e.content, r = x.id;
                    Ot(b.props.triggerTarget || t).forEach((function (t) {
                        var e = t.getAttribute(n);
                        if (b.state.isVisible) t.setAttribute(n, e ? e + " " + r : r); else {
                            var i = e && e.replace(r, "").trim();
                            i ? t.setAttribute(n, i) : t.removeAttribute(n)
                        }
                    }))
                }
            }

            function j() {
                !A && b.props.aria.expanded && Ot(b.props.triggerTarget || t).forEach((function (t) {
                    b.props.interactive ? t.setAttribute("aria-expanded", b.state.isVisible && t === M() ? "true" : "false") : t.removeAttribute("aria-expanded")
                }))
            }

            function C() {
                O().removeEventListener("mousemove", y), ne = ne.filter((function (t) {
                    return t !== y
                }))
            }

            function R(e) {
                if (!zt.isTouch || !d && "mousedown" !== e.type) {
                    var n = e.composedPath && e.composedPath()[0] || e.target;
                    if (!b.props.interactive || !Ut(x, n)) {
                        if (Ot(b.props.triggerTarget || t).some((function (t) {
                            return Ut(t, n)
                        }))) {
                            if (zt.isTouch) return;
                            if (b.state.isVisible && b.props.trigger.indexOf("click") >= 0) return
                        } else P("onClickOutside", [b, e]);
                        !0 === b.props.hideOnClick && (b.clearDelayTimeouts(), b.hide(), h = !0, setTimeout((function () {
                            h = !1
                        })), b.state.isMounted || W())
                    }
                }
            }

            function U() {
                d = !0
            }

            function z() {
                d = !1
            }

            function N() {
                var t = O();
                t.addEventListener("mousedown", R, !0), t.addEventListener("touchend", R, Et), t.addEventListener("touchstart", z, Et), t.addEventListener("touchmove", U, Et)
            }

            function W() {
                var t = O();
                t.removeEventListener("mousedown", R, !0), t.removeEventListener("touchend", R, Et), t.removeEventListener("touchstart", z, Et), t.removeEventListener("touchmove", U, Et)
            }

            function q(t, e) {
                var n = _().box;

                function r(t) {
                    t.target === n && (Rt(n, "remove", r), e())
                }

                if (0 === t) return e();
                Rt(n, "remove", a), Rt(n, "add", r), a = r
            }

            function K(e, n, r) {
                void 0 === r && (r = !1), Ot(b.props.triggerTarget || t).forEach((function (t) {
                    t.addEventListener(e, n, r), g.push({node: t, eventType: e, handler: n, options: r})
                }))
            }

            function D() {
                var t;
                I() && (K("touchstart", H, {passive: !0}), K("touchend", J, {passive: !0})), (t = b.props.trigger, t.split(/\s+/).filter(Boolean)).forEach((function (t) {
                    if ("manual" !== t) switch (K(t, H), t) {
                        case"mouseenter":
                            K("mouseleave", J);
                            break;
                        case"focus":
                            K(Dt ? "focusout" : "blur", Z);
                            break;
                        case"focusin":
                            K("focusout", Z)
                    }
                }))
            }

            function F() {
                g.forEach((function (t) {
                    var e = t.node, n = t.eventType, r = t.handler, i = t.options;
                    e.removeEventListener(n, r, i)
                })), g = []
            }

            function H(t) {
                var e, n = !1;
                if (b.state.isEnabled && !G(t) && !h) {
                    var r = "focus" === (null == (e = o) ? void 0 : e.type);
                    o = t, u = t.currentTarget, j(), !b.state.isVisible && It(t, "MouseEvent") && ne.forEach((function (e) {
                        return e(t)
                    })), "click" === t.type && (b.props.trigger.indexOf("mouseenter") < 0 || l) && !1 !== b.props.hideOnClick && b.state.isVisible ? n = !0 : tt(t), "click" === t.type && (l = !n), n && !r && et(t)
                }
            }

            function V(t) {
                var e = t.target, n = M().contains(e) || x.contains(e);
                if ("mousemove" !== t.type || !n) {
                    var r = Q().concat(x).map((function (t) {
                        var e, n = null == (e = t._tippy.popperInstance) ? void 0 : e.state;
                        return n ? {popperRect: t.getBoundingClientRect(), popperState: n, props: f} : null
                    })).filter(Boolean);
                    (function (t, e) {
                        var n = e.clientX, r = e.clientY;
                        return t.every((function (t) {
                            var e = t.popperRect, i = t.popperState, o = t.props.interactiveBorder,
                                a = i.placement.split("-")[0], s = i.modifiersData.offset;
                            if (!s) return !0;
                            var u = "bottom" === a ? s.top.y : 0, c = "top" === a ? s.bottom.y : 0,
                                f = "right" === a ? s.left.x : 0, l = "left" === a ? s.right.x : 0,
                                h = e.top - r + u > o, d = r - e.bottom - c > o, p = e.left - n + f > o,
                                g = n - e.right - l > o;
                            return h || d || p || g
                        }))
                    })(r, t) && (C(), et(t))
                }
            }

            function J(t) {
                G(t) || b.props.trigger.indexOf("click") >= 0 && l || (b.props.interactive ? b.hideWithInteractivity(t) : et(t))
            }

            function Z(t) {
                b.props.trigger.indexOf("focusin") < 0 && t.target !== M() || b.props.interactive && t.relatedTarget && x.contains(t.relatedTarget) || et(t)
            }

            function G(t) {
                return !!zt.isTouch && I() !== t.type.indexOf("touch") >= 0
            }

            function Y() {
                X();
                var e = b.props, n = e.popperOptions, r = e.placement, i = e.offset, o = e.getReferenceClientRect,
                    a = e.moveTransition, u = B() ? Qt(x).arrow : null,
                    c = o ? {getBoundingClientRect: o, contextElement: o.contextElement || M()} : t,
                    f = [{name: "offset", options: {offset: i}}, {
                        name: "preventOverflow",
                        options: {padding: {top: 2, bottom: 2, left: 5, right: 5}}
                    }, {name: "flip", options: {padding: 5}}, {
                        name: "computeStyles",
                        options: {adaptive: !a}
                    }, {
                        name: "$$tippy",
                        enabled: !0,
                        phase: "beforeWrite",
                        requires: ["computeStyles"],
                        fn: function (t) {
                            var e = t.state;
                            if (B()) {
                                var n = _().box;
                                ["placement", "reference-hidden", "escaped"].forEach((function (t) {
                                    "placement" === t ? n.setAttribute("data-placement", e.placement) : e.attributes.popper["data-popper-" + t] ? n.setAttribute("data-" + t, "") : n.removeAttribute("data-" + t)
                                })), e.attributes.popper = {}
                            }
                        }
                    }];
                B() && u && f.push({
                    name: "arrow",
                    options: {element: u, padding: 3}
                }), f.push.apply(f, (null == n ? void 0 : n.modifiers) || []), b.popperInstance = vt(c, x, Object.assign({}, n, {
                    placement: r,
                    onFirstUpdate: s,
                    modifiers: f
                }))
            }

            function X() {
                b.popperInstance && (b.popperInstance.destroy(), b.popperInstance = null)
            }

            function Q() {
                return Tt(x.querySelectorAll("[data-tippy-root]"))
            }

            function tt(t) {
                b.clearDelayTimeouts(), t && P("onTrigger", [b, t]), N();
                var e = T(!0), r = S(), i = r[0], o = r[1];
                zt.isTouch && "hold" === i && o && (e = o), e ? n = setTimeout((function () {
                    b.show()
                }), e) : b.show()
            }

            function et(t) {
                if (b.clearDelayTimeouts(), P("onUntrigger", [b, t]), b.state.isVisible) {
                    if (!(b.props.trigger.indexOf("mouseenter") >= 0 && b.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(t.type) >= 0 && l)) {
                        var e = T(!1);
                        e ? r = setTimeout((function () {
                            b.state.isVisible && b.hide()
                        }), e) : i = requestAnimationFrame((function () {
                            b.hide()
                        }))
                    }
                } else W()
            }
        }

        function oe(t, e) {
            void 0 === e && (e = {});
            var n = Ft.plugins.concat(e.plugins || []);
            document.addEventListener("touchstart", Wt, Et), window.addEventListener("blur", Kt);
            var r, i = Object.assign({}, e, {plugins: n}), o = (r = t, $t(r) ? [r] : function (t) {
                return It(t, "NodeList")
            }(r) ? Tt(r) : Array.isArray(r) ? r : Tt(document.querySelectorAll(r))).reduce((function (t, e) {
                var n = e && ie(e, i);
                return n && t.push(n), t
            }), []);
            return $t(t) ? o[0] : o
        }

        oe.defaultProps = Ft, oe.setDefaultProps = function (t) {
            Object.keys(t).forEach((function (e) {
                Ft[e] = t[e]
            }))
        }, oe.currentInput = zt, Object.assign({}, rt, {
            effect: function (t) {
                var e = t.state, n = {
                    popper: {position: e.options.strategy, left: "0", top: "0", margin: "0"},
                    arrow: {position: "absolute"},
                    reference: {}
                };
                Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow)
            }
        }), oe.setDefaultProps({render: te});
        const ae = oe, se = document.querySelectorAll(".connect-button"),
            ue = document.querySelectorAll(".choices__choice_unavailable"),
            ce = ae(".choices__choice_unavailable", {content: "You need to hold at least 1000 PENG to use elite parts in generator"}),
            fe = {
                connect: new o({additionalAdapters: []}),
                adapter: null,
                address: null,
                wallet: null,
                canEdit: 1,
                canEditElite: 1
            };

        function le(t) {
            console.log({canEdit: t}), t ? (fe.canEditElite = !0, ue.forEach((t => t.classList.remove("choices__choice_unavailable"))), ce.forEach((t => t.destroy()))) : (fe.canEditElite = 1, ue.forEach((t => t.classList.add("choices__choice_unavailable"))))
        }


        const he = document.querySelector(".custom-generator__avatar canvas"),
            de = document.querySelectorAll(".choices__item"), pe = document.querySelectorAll(".btn_download"),
            ge = document.querySelector(".btn_random"), ye = 1024, me = 1024,
            ve = ["/assets/parts/background/rare/2.png", "/assets/parts/background/rare/5.png", "/assets/parts/background/rare/6.png", "/assets/parts/background/rare/Bg 5.png", "/assets/parts/background/rare/Bg 4.png", "/assets/parts/background/rare/Bg 1.png", "/assets/parts/background/rare/Bg 2.png", "/assets/parts/background/rare/Bg 3.png"],
            we = ["#", "/assets/parts/clothes/common/Bip.png", "/assets/parts/clothes/common/Cape.png", "/assets/parts/clothes/common/Icy sweater.png", "/assets/parts/clothes/common/Shirt.png"],
            be = ["/assets/parts/body/common/Original.png","/assets/parts/body/common/1.png","/assets/parts/body/common/2.png","/assets/parts/body/common/3.png","/assets/parts/body/common/4.png"],
            xe = ["/assets/parts/eyes/common/Original.png", "/assets/parts/eyes/common/Big eyes.png", "/assets/parts/eyes/common/Sus.png", "/assets/parts/eyes/common/Weird.png", "/assets/parts/eyes/common/Xx.png", "/assets/parts/eyes/rare/Pixel.png", "/assets/parts/eyes/rare/1.png", "/assets/parts/eyes/rare/2.png", "/assets/parts/eyes/rare/3.png", "/assets/parts/eyes/rare/4.png", "/assets/parts/eyes/rare/5.png", "/assets/parts/eyes/rare/6.png"],
            ke = ["#", "/assets/parts/head/common/Cap.png", "/assets/parts/head/common/Headband.png", "/assets/parts/head/common/Mafia.png", "/assets/parts/head/rare/Afro.png", "/assets/parts/head/rare/Arrow.png", "/assets/parts/head/rare/Egg.png", "/assets/parts/head/rare/Goggles.png", "/assets/parts/head/super rare/Horns.png","/assets/parts/head/super rare/1.png","/assets/parts/head/super rare/2.png","/assets/parts/head/super rare/3.png","/assets/parts/head/super rare/4.png","/assets/parts/head/super rare/7.png"],
            Ee = ["/assets/parts/mouth/common/Original.png", "/assets/parts/mouth/common/Rabbit teeth.png", "/assets/parts/mouth/common/Tounge.png", "/assets/parts/mouth/rare/Drool.png", "/assets/parts/mouth/rare/Fangs.png", "/assets/parts/mouth/rare/Jaws.png", "/assets/parts/mouth/rare/Smoke.png", "/assets/parts/mouth/super rare/Gold.png"],
            Ae = {
                background: "/assets/parts/background/rare/Bg 4.png",
                body: "/assets/parts/body/common/Original.png",
                clothes: "#",
                eyes: "/assets/parts/eyes/common/Original.png",
                head: "#",
                mouth: "/assets/parts/mouth/common/Original.png"
            };

        async function Se(t, e) {
            return t.canvas.parentElement.classList.add("_loading"), function (t) {
                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ye,
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : me;
                t.clearRect(0, 0, e, n)
            }(t), await Ie(t, e.background), await Ie(t, e.body), await Ie(t, e.clothes), await Ie(t, e.eyes), await Ie(t, e.head), await Ie(t, e.mouth), t.canvas.parentElement.classList.remove("_loading"), !0
        }

        function Ie(t, e) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : ye,
                o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : me;
            return new Promise(((a, s) => {
                if (!e || "#" === e) return a();
                try {
                    const s = new Image;
                    s.src = e, s.onload = () => {
                        t.drawImage(s, n, r, i, o), a(e)
                    }
                } catch (t) {
                    s(t)
                }
            }))
        }

        function Be(t) {
            const e = t.length - 1;
            return t[Math.ceil(Math.random() * e)]
        }

        window.onload = async () => {
            // Get the canvas context
            const t = he?.getContext("2d");
            if (!t) {
                console.error("Canvas context is null or undefined");
                return;
            }

            await Se(t, Ae);

            // Add click event listener to 'ge' if it exists
            if (ge) {
                ge.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateSelection(t);
                });
            } else {
                console.warn("'ge' is null or undefined");
            }

            // Iterate through 'de' elements
            de.forEach((e) => {
                const n = e.getAttribute("data-part");
                if (!n) return;
                const r = e.querySelectorAll("button.choices__choice");
                r.forEach((e) => {
                    const i = e.querySelector("img")?.getAttribute("src");
                    if (!i) return;
                    e.addEventListener("click", (a) => {
                        a.preventDefault();
                        a.stopPropagation();
                        // Directly update selection and display the overlay
                        r.forEach((t) => t.classList.remove("selected"));
                        e.classList.add("selected");
                        Ae[n] = i;
                        Se(t, Ae);
                        $(".choices__overlay").fadeIn(300);
                        $(".choices__overlay p").html("You can use the generator now.");
                    });
                });
            });

            // Add click event listener to 'pe' elements
            pe.forEach((t) => t.addEventListener("click", (t) => {
                t.preventDefault();
                t.stopPropagation();
                saveAvatar();
            }));

            // Initialize the owlCarousel if the element exists
            if ($(".choices__value").length) {
                $(".choices__value").owlCarousel({
                    margin: 10,
                    loop: false,
                    autoWidth: true,
                    dots: false,
                    nav: true
                });
            } else {
                console.warn("'.choices__value' element is not found");
            }
        };

        function updateSelection(t) {
            const e = Be(ve),
                n = Be(be),
                r = Be(we),
                i = Be(xe),
                o = Be(ke),
                a = Be(Ee);

            if (!e || !n || !r || !i || !o || !a) {
                console.error("One or more values are null or undefined in 'updateSelection'");
                return;
            }

            Ae.background = e;
            Ae.body = n;
            Ae.clothes = r;
            Ae.eyes = i;
            Ae.head = o;
            Ae.mouth = a;

            document.querySelectorAll(".choices__choice").forEach((t) => t.classList.remove("selected"));

            document.querySelector(`[data-value="${e}"]`)?.classList.add("selected");
            document.querySelector(`[data-value="${n}"]`)?.classList.add("selected");
            document.querySelector(`[data-value="${r}"]`)?.classList.add("selected");
            document.querySelector(`[data-value="${i}"]`)?.classList.add("selected");
            document.querySelector(`[data-value="${o}"]`)?.classList.add("selected");
            document.querySelector(`[data-value="${a}"]`)?.classList.add("selected");

            Se(t, Ae);
        }

        function saveAvatar() {
            const t = he.toDataURL(),
                e = document.createElement("a");
            e.href = t;
            e.download = "avatar.jpeg";
            document.body.appendChild(e);
            e.click();
            document.body.removeChild(e);
        }

    })()
})();