import {
  __commonJS
} from "./chunk-UXIASGQL.js";

// browser-external:events
var require_events = __commonJS({
  "browser-external:events"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "events" has been externalized for browser compatibility. Cannot access "events.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:url
var require_url = __commonJS({
  "browser-external:url"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "url" has been externalized for browser compatibility. Cannot access "url.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:buffer
var require_buffer = __commonJS({
  "browser-external:buffer"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "buffer" has been externalized for browser compatibility. Cannot access "buffer.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/debug/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/debug/node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// browser-external:os
var require_os = __commonJS({
  "browser-external:os"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "os" has been externalized for browser compatibility. Cannot access "os.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:zlib
var require_zlib = __commonJS({
  "browser-external:zlib"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "zlib" has been externalized for browser compatibility. Cannot access "zlib.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/ms/index.js
var require_ms2 = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/@elastic/elasticsearch/lib/errors.js
var require_errors = __commonJS({
  "node_modules/@elastic/elasticsearch/lib/errors.js"(exports, module) {
    "use strict";
    var ElasticsearchClientError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "ElasticsearchClientError";
      }
    };
    var TimeoutError = class _TimeoutError extends ElasticsearchClientError {
      constructor(message, meta) {
        super(message);
        Error.captureStackTrace(this, _TimeoutError);
        this.name = "TimeoutError";
        this.message = message || "Timeout Error";
        this.meta = meta;
      }
    };
    var ConnectionError = class _ConnectionError extends ElasticsearchClientError {
      constructor(message, meta) {
        super(message);
        Error.captureStackTrace(this, _ConnectionError);
        this.name = "ConnectionError";
        this.message = message || "Connection Error";
        this.meta = meta;
      }
    };
    var NoLivingConnectionsError = class _NoLivingConnectionsError extends ElasticsearchClientError {
      constructor(message, meta) {
        super(message);
        Error.captureStackTrace(this, _NoLivingConnectionsError);
        this.name = "NoLivingConnectionsError";
        this.message = message || "Given the configuration, the ConnectionPool was not able to find a usable Connection for this request.";
        this.meta = meta;
      }
    };
    var SerializationError = class _SerializationError extends ElasticsearchClientError {
      constructor(message, data) {
        super(message, data);
        Error.captureStackTrace(this, _SerializationError);
        this.name = "SerializationError";
        this.message = message || "Serialization Error";
        this.data = data;
      }
    };
    var DeserializationError = class _DeserializationError extends ElasticsearchClientError {
      constructor(message, data) {
        super(message, data);
        Error.captureStackTrace(this, _DeserializationError);
        this.name = "DeserializationError";
        this.message = message || "Deserialization Error";
        this.data = data;
      }
    };
    var ConfigurationError = class _ConfigurationError extends ElasticsearchClientError {
      constructor(message) {
        super(message);
        Error.captureStackTrace(this, _ConfigurationError);
        this.name = "ConfigurationError";
        this.message = message || "Configuration Error";
      }
    };
    var ResponseError = class _ResponseError extends ElasticsearchClientError {
      constructor(meta) {
        super("Response Error");
        Error.captureStackTrace(this, _ResponseError);
        this.name = "ResponseError";
        if (meta.body && meta.body.error && meta.body.error.type) {
          if (Array.isArray(meta.body.error.root_cause)) {
            this.message = meta.body.error.type + ": ";
            this.message += meta.body.error.root_cause.map((entry) => `[${entry.type}] Reason: ${entry.reason}`).join("; ");
          } else {
            this.message = meta.body.error.type;
          }
        } else if (typeof meta.body === "object" && meta.body != null) {
          this.message = JSON.stringify(meta.body);
        } else {
          this.message = meta.body || "Response Error";
        }
        this.meta = meta;
      }
      get body() {
        return this.meta.body;
      }
      get statusCode() {
        if (this.meta.body && typeof this.meta.body.status === "number") {
          return this.meta.body.status;
        }
        return this.meta.statusCode;
      }
      get headers() {
        return this.meta.headers;
      }
      toString() {
        return JSON.stringify(this.meta.body);
      }
    };
    var RequestAbortedError = class _RequestAbortedError extends ElasticsearchClientError {
      constructor(message, meta) {
        super(message);
        Error.captureStackTrace(this, _RequestAbortedError);
        this.name = "RequestAbortedError";
        this.message = message || "Request aborted";
        this.meta = meta;
      }
    };
    var ProductNotSupportedError = class _ProductNotSupportedError extends ElasticsearchClientError {
      constructor(meta) {
        super("Product Not Supported Error");
        Error.captureStackTrace(this, _ProductNotSupportedError);
        this.name = "ProductNotSupportedError";
        this.message = "The client noticed that the server is not Elasticsearch and we do not support this unknown product.";
        this.meta = meta;
      }
    };
    module.exports = {
      ElasticsearchClientError,
      TimeoutError,
      ConnectionError,
      NoLivingConnectionsError,
      SerializationError,
      DeserializationError,
      ConfigurationError,
      ResponseError,
      RequestAbortedError,
      ProductNotSupportedError
    };
  }
});

// node_modules/@elastic/elasticsearch/package.json
var require_package = __commonJS({
  "node_modules/@elastic/elasticsearch/package.json"(exports, module) {
    module.exports = {
      name: "@elastic/elasticsearch",
      description: "The official Elasticsearch client for Node.js",
      main: "index.js",
      types: "index.d.ts",
      exports: {
        ".": {
          require: "./index.js",
          import: "./index.mjs",
          types: "./index.d.ts"
        },
        "./*": "./*.js"
      },
      homepage: "http://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html",
      version: "7.17.13",
      versionCanary: "7.17.13-canary.1",
      keywords: [
        "elasticsearch",
        "elastic",
        "kibana",
        "mapping",
        "REST",
        "search",
        "client",
        "index"
      ],
      scripts: {
        test: "npm run lint && tap test/{unit,acceptance}/{*,**/*}.test.js && npm run test:types",
        "test:unit": "tap test/unit/{*,**/*}.test.js",
        "test:acceptance": "tap test/acceptance/*.test.js",
        "test:integration": "node test/integration/index.js",
        "test:integration:helpers": "tap test/integration/helpers/*.test.js",
        "test:types": "tsd",
        "test:coverage-100": 'tap test/{unit,acceptance}/{*,**/*}.test.js --coverage --100 --nyc-arg="--exclude=api"',
        "test:coverage-report": 'tap test/{unit,acceptance}/{*,**/*}.test.js --coverage --nyc-arg="--exclude=api" && nyc report --reporter=text-lcov > coverage.lcov',
        "test:coverage-ui": 'tap test/{unit,acceptance}/{*,**/*}.test.js --coverage --coverage-report=html --nyc-arg="--exclude=api"',
        lint: "standard",
        "lint:fix": "standard --fix",
        "license-checker": "license-checker --production --onlyAllow='MIT;Apache-2.0;Apache1.1;ISC;BSD-3-Clause;BSD-2-Clause'",
        "build-esm": "npx gen-esm-wrapper . index.mjs && standard --fix index.mjs"
      },
      author: {
        name: "Tomas Della Vedova",
        company: "Elastic BV"
      },
      "original-author": {
        name: "Spencer Alger",
        company: "Elasticsearch BV"
      },
      devDependencies: {
        "@sinonjs/fake-timers": "github:sinonjs/fake-timers#0bfffc1",
        "@types/node": "^15.3.1",
        "convert-hrtime": "^5.0.0",
        "cross-zip": "^4.0.0",
        dedent: "^0.7.0",
        deepmerge: "^4.2.2",
        desm: "^1.2.0",
        dezalgo: "^1.0.3",
        "fast-deep-equal": "^3.1.3",
        "into-stream": "^6.0.0",
        "js-yaml": "^4.1.0",
        "license-checker": "^25.0.1",
        minimist: "^1.2.5",
        "node-fetch": "^2.6.1",
        ora: "^5.4.0",
        "pretty-hrtime": "^1.0.3",
        proxy: "^1.0.2",
        rimraf: "^3.0.2",
        semver: "^7.3.5",
        "simple-git": "^2.39.0",
        "simple-statistics": "^7.7.0",
        split2: "^3.2.2",
        standard: "^16.0.3",
        stoppable: "^1.1.0",
        tap: "^15.0.9",
        tsd: "^0.15.1",
        workq: "^3.0.0",
        xmlbuilder2: "^2.4.1",
        zx: "^6.1.0"
      },
      dependencies: {
        debug: "^4.3.1",
        hpagent: "^0.1.1",
        ms: "^2.1.3",
        "secure-json-parse": "^2.4.0"
      },
      license: "Apache-2.0",
      repository: {
        type: "git",
        url: "https://github.com/elastic/elasticsearch-js.git"
      },
      bugs: {
        url: "https://github.com/elastic/elasticsearch-js/issues"
      },
      engines: {
        node: ">=12"
      },
      tsd: {
        directory: "test/types"
      },
      tap: {
        ts: false,
        jsx: false,
        flow: false,
        coverage: false,
        "jobs-auto": true,
        "check-coverage": false
      }
    };
  }
});

// node_modules/@elastic/elasticsearch/lib/Transport.js
var require_Transport = __commonJS({
  "node_modules/@elastic/elasticsearch/lib/Transport.js"(exports, module) {
    "use strict";
    var debug = require_browser()("elasticsearch");
    var os = require_os();
    var { gzip, unzip, createGzip } = require_zlib();
    var buffer = require_buffer();
    var ms = require_ms2();
    var { EventEmitter } = require_events();
    var {
      ConnectionError,
      RequestAbortedError,
      NoLivingConnectionsError,
      ResponseError,
      ConfigurationError,
      ProductNotSupportedError
    } = require_errors();
    var noop = () => {
    };
    var clientVersion = require_package().version;
    var userAgent = `elasticsearch-js/${clientVersion} (${os.platform()} ${os.release()}-${os.arch()}; Node.js ${process.version})`;
    var MAX_BUFFER_LENGTH = buffer.constants.MAX_LENGTH;
    var MAX_STRING_LENGTH = buffer.constants.MAX_STRING_LENGTH;
    var kProductCheck = Symbol("product check");
    var kApiVersioning = Symbol("api versioning");
    var kEventEmitter = Symbol("event emitter");
    var kMaxResponseSize = Symbol("max response size");
    var kMaxCompressedResponseSize = Symbol("max compressed response size");
    var Transport = class _Transport {
      constructor(opts) {
        if (typeof opts.compression === "string" && opts.compression !== "gzip") {
          throw new ConfigurationError(`Invalid compression: '${opts.compression}'`);
        }
        this.emit = opts.emit;
        this.connectionPool = opts.connectionPool;
        this.serializer = opts.serializer;
        this.maxRetries = opts.maxRetries;
        this.requestTimeout = toMs(opts.requestTimeout);
        this.suggestCompression = opts.suggestCompression === true;
        this.compression = opts.compression || false;
        this.context = opts.context || null;
        this.headers = Object.assign(
          {},
          { "user-agent": userAgent },
          opts.suggestCompression === true ? { "accept-encoding": "gzip,deflate" } : null,
          lowerCaseHeaders(opts.headers)
        );
        this.sniffInterval = opts.sniffInterval;
        this.sniffOnConnectionFault = opts.sniffOnConnectionFault;
        this.sniffEndpoint = opts.sniffEndpoint;
        this.generateRequestId = opts.generateRequestId || generateRequestId();
        this.name = opts.name;
        this.opaqueIdPrefix = opts.opaqueIdPrefix;
        this[kProductCheck] = 0;
        this[kApiVersioning] = process.env.ELASTIC_CLIENT_APIVERSIONING === "true";
        this[kEventEmitter] = new EventEmitter();
        this[kMaxResponseSize] = opts.maxResponseSize || MAX_STRING_LENGTH;
        this[kMaxCompressedResponseSize] = opts.maxCompressedResponseSize || MAX_BUFFER_LENGTH;
        this.nodeFilter = opts.nodeFilter || defaultNodeFilter;
        if (typeof opts.nodeSelector === "function") {
          this.nodeSelector = opts.nodeSelector;
        } else if (opts.nodeSelector === "round-robin") {
          this.nodeSelector = roundRobinSelector();
        } else if (opts.nodeSelector === "random") {
          this.nodeSelector = randomSelector;
        } else {
          this.nodeSelector = roundRobinSelector();
        }
        this._sniffEnabled = typeof this.sniffInterval === "number";
        this._nextSniff = this._sniffEnabled ? Date.now() + this.sniffInterval : 0;
        this._isSniffing = false;
        if (opts.sniffOnStart === true) {
          setTimeout(() => {
            this.sniff({ reason: _Transport.sniffReasons.SNIFF_ON_START });
          }, 10);
        }
      }
      request(params, options, callback) {
        options = options || {};
        if (typeof options === "function") {
          callback = options;
          options = {};
        }
        let p = null;
        if (callback === void 0) {
          let onFulfilled = null;
          let onRejected = null;
          p = new Promise((resolve, reject) => {
            onFulfilled = resolve;
            onRejected = reject;
          });
          callback = function callback2(err, result2) {
            err ? onRejected(err) : onFulfilled(result2);
          };
        }
        const meta = {
          context: null,
          request: {
            params: null,
            options: null,
            id: options.id || this.generateRequestId(params, options)
          },
          name: this.name,
          connection: null,
          attempts: 0,
          aborted: false
        };
        if (this.context != null && options.context != null) {
          meta.context = Object.assign({}, this.context, options.context);
        } else if (this.context != null) {
          meta.context = this.context;
        } else if (options.context != null) {
          meta.context = options.context;
        }
        const result = {
          body: null,
          statusCode: null,
          headers: null,
          meta
        };
        Object.defineProperty(result, "warnings", {
          get() {
            return this.headers && this.headers.warning ? this.headers.warning.split(/(?!\B"[^"]*),(?![^"]*"\B)/) : null;
          }
        });
        const maxRetries = isStream(params.body) || isStream(params.bulkBody) ? 0 : typeof options.maxRetries === "number" ? options.maxRetries : this.maxRetries;
        const compression = options.compression !== void 0 ? options.compression : this.compression;
        const maxResponseSize = options.maxResponseSize || this[kMaxResponseSize];
        const maxCompressedResponseSize = options.maxCompressedResponseSize || this[kMaxCompressedResponseSize];
        let request = { abort: noop };
        const transportReturn = {
          then(onFulfilled, onRejected) {
            if (p != null) {
              return p.then(onFulfilled, onRejected);
            }
          },
          catch(onRejected) {
            if (p != null) {
              return p.catch(onRejected);
            }
          },
          abort() {
            meta.aborted = true;
            request.abort();
            debug("Aborting request", params);
            return this;
          },
          finally(onFinally) {
            if (p != null) {
              return p.finally(onFinally);
            }
          }
        };
        const makeRequest = () => {
          if (meta.aborted === true) {
            this.emit("request", new RequestAbortedError(), result);
            return process.nextTick(callback, new RequestAbortedError(), result);
          }
          meta.connection = this.getConnection({ requestId: meta.request.id });
          if (meta.connection == null) {
            return process.nextTick(callback, new NoLivingConnectionsError(), result);
          }
          this.emit("request", null, result);
          request = meta.connection.request(params, onResponse);
        };
        const onConnectionError = (err) => {
          if (err.name !== "RequestAbortedError") {
            this.connectionPool.markDead(meta.connection);
            if (this.sniffOnConnectionFault === true) {
              this.sniff({
                reason: _Transport.sniffReasons.SNIFF_ON_CONNECTION_FAULT,
                requestId: meta.request.id
              });
            }
            if (meta.attempts < maxRetries) {
              meta.attempts++;
              debug(`Retrying request, there are still ${maxRetries - meta.attempts} attempts`, params);
              makeRequest();
              return;
            }
          }
          err.meta = result;
          this.emit("response", err, result);
          return callback(err, result);
        };
        const onResponse = (err, response) => {
          if (err !== null) {
            return onConnectionError(err);
          }
          result.statusCode = response.statusCode;
          result.headers = response.headers;
          if (options.asStream === true) {
            result.body = response;
            this.emit("response", null, result);
            callback(null, result);
            return;
          }
          const contentEncoding = (result.headers["content-encoding"] || "").toLowerCase();
          const isCompressed = contentEncoding.indexOf("gzip") > -1 || contentEncoding.indexOf("deflate") > -1;
          const isVectorTile = (result.headers["content-type"] || "").indexOf("application/vnd.mapbox-vector-tile") > -1;
          if (result.headers["content-length"] !== void 0) {
            const contentLength = Number(result.headers["content-length"]);
            if (isCompressed && contentLength > maxCompressedResponseSize) {
              response.destroy();
              return onConnectionError(
                new RequestAbortedError(`The content length (${contentLength}) is bigger than the maximum allowed buffer (${maxCompressedResponseSize})`, result)
              );
            } else if (contentLength > maxResponseSize) {
              response.destroy();
              return onConnectionError(
                new RequestAbortedError(`The content length (${contentLength}) is bigger than the maximum allowed string (${maxResponseSize})`, result)
              );
            }
          }
          let payload = isCompressed || isVectorTile ? [] : "";
          const onData = isCompressed || isVectorTile ? (chunk) => {
            payload.push(chunk);
          } : (chunk) => {
            payload += chunk;
          };
          const onEnd = (err2) => {
            response.removeListener("data", onData);
            response.removeListener("end", onEnd);
            response.removeListener("error", onEnd);
            response.removeListener("aborted", onAbort);
            if (err2) {
              return onConnectionError(new ConnectionError(err2.message));
            }
            if (isCompressed) {
              unzip(Buffer.concat(payload), onBody);
            } else {
              onBody(null, isVectorTile ? Buffer.concat(payload) : payload);
            }
          };
          const onAbort = () => {
            response.destroy();
            onEnd(new Error("Response aborted while reading the body"));
          };
          if (!isCompressed && !isVectorTile) {
            response.setEncoding("utf8");
          }
          this.emit("deserialization", null, result);
          response.on("data", onData);
          response.on("error", onEnd);
          response.on("end", onEnd);
          response.on("aborted", onAbort);
        };
        const onBody = (err, payload) => {
          if (err) {
            this.emit("response", err, result);
            return callback(err, result);
          }
          const isVectorTile = (result.headers["content-type"] || "").indexOf("application/vnd.mapbox-vector-tile") > -1;
          if (Buffer.isBuffer(payload) && !isVectorTile) {
            payload = payload.toString();
          }
          const isHead = params.method === "HEAD";
          if (result.headers["content-type"] !== void 0 && (result.headers["content-type"].indexOf("application/json") > -1 || result.headers["content-type"].indexOf("application/vnd.elasticsearch+json") > -1) && isHead === false && payload !== "") {
            try {
              result.body = this.serializer.deserialize(payload);
            } catch (err2) {
              this.emit("response", err2, result);
              return callback(err2, result);
            }
          } else {
            result.body = isHead === true && result.statusCode < 400 ? true : payload;
          }
          const ignoreStatusCode = Array.isArray(options.ignore) && options.ignore.indexOf(result.statusCode) > -1 || isHead === true && result.statusCode === 404;
          if (ignoreStatusCode === false && (result.statusCode === 502 || result.statusCode === 503 || result.statusCode === 504)) {
            this.connectionPool.markDead(meta.connection);
            if (meta.attempts < maxRetries && result.statusCode !== 429) {
              meta.attempts++;
              debug(`Retrying request, there are still ${maxRetries - meta.attempts} attempts`, params);
              makeRequest();
              return;
            }
          } else {
            this.connectionPool.markAlive(meta.connection);
          }
          if (ignoreStatusCode === false && result.statusCode >= 400) {
            const error = new ResponseError(result);
            this.emit("response", error, result);
            callback(error, result);
          } else {
            if (isHead === true && result.statusCode === 404) {
              result.body = false;
            }
            this.emit("response", null, result);
            callback(null, result);
          }
        };
        const prepareRequest = () => {
          this.emit("serialization", null, result);
          const headers = Object.assign({}, this.headers, lowerCaseHeaders(options.headers));
          if (options.opaqueId !== void 0) {
            headers["x-opaque-id"] = this.opaqueIdPrefix !== null ? this.opaqueIdPrefix + options.opaqueId : options.opaqueId;
          }
          if (params.body != null) {
            if (shouldSerialize(params.body) === true) {
              try {
                params.body = this.serializer.serialize(params.body);
              } catch (err) {
                this.emit("request", err, result);
                process.nextTick(callback, err, result);
                return transportReturn;
              }
            }
            if (params.body !== "") {
              headers["content-type"] = headers["content-type"] || (this[kApiVersioning] ? "application/vnd.elasticsearch+json; compatible-with=7" : "application/json");
            }
          } else if (params.bulkBody != null) {
            if (shouldSerialize(params.bulkBody) === true) {
              try {
                params.body = this.serializer.ndserialize(params.bulkBody);
              } catch (err) {
                this.emit("request", err, result);
                process.nextTick(callback, err, result);
                return transportReturn;
              }
            } else {
              params.body = params.bulkBody;
            }
            if (params.body !== "") {
              headers["content-type"] = headers["content-type"] || (this[kApiVersioning] ? "application/vnd.elasticsearch+x-ndjson; compatible-with=7" : "application/x-ndjson");
            }
          }
          params.headers = headers;
          if (options.querystring == null) {
            params.querystring = this.serializer.qserialize(params.querystring);
          } else {
            params.querystring = this.serializer.qserialize(
              Object.assign({}, params.querystring, options.querystring)
            );
          }
          params.timeout = toMs(options.requestTimeout || this.requestTimeout);
          if (options.asStream === true)
            params.asStream = true;
          if (params.body !== "" && params.body != null) {
            if (isStream(params.body) === true) {
              if (compression === "gzip") {
                params.headers["content-encoding"] = compression;
                params.body = params.body.pipe(createGzip());
              }
              makeRequest();
            } else if (compression === "gzip") {
              gzip(params.body, (err, buffer2) => {
                if (err) {
                  this.emit("request", err, result);
                  return callback(err, result);
                }
                params.headers["content-encoding"] = compression;
                params.headers["content-length"] = "" + Buffer.byteLength(buffer2);
                params.body = buffer2;
                makeRequest();
              });
            } else {
              params.headers["content-length"] = "" + Buffer.byteLength(params.body);
              makeRequest();
            }
          } else {
            makeRequest();
          }
        };
        meta.request.params = params;
        meta.request.options = options;
        if (this[kProductCheck] === 0 || this[kProductCheck] === 1) {
          if (params.method === "GET" && params.path === "/") {
            prepareRequest();
          } else {
            this[kEventEmitter].once("product-check", (error, status) => {
              if (status === false) {
                const err = error || new ProductNotSupportedError(result);
                if (this[kProductCheck] === 4) {
                  err.message = "The client noticed that the server is not a supported distribution of Elasticsearch";
                }
                this.emit("request", err, result);
                process.nextTick(callback, err, result);
              } else {
                prepareRequest();
              }
            });
            if (this[kProductCheck] === 0) {
              this.productCheck();
            }
          }
        } else if (this[kProductCheck] === 3 || this[kProductCheck] === 4) {
          const err = new ProductNotSupportedError(result);
          if (this[kProductCheck] === 4) {
            err.message = "The client noticed that the server is not a supported distribution of Elasticsearch";
          }
          this.emit("request", err, result);
          process.nextTick(callback, err, result);
        } else {
          prepareRequest();
        }
        return transportReturn;
      }
      getConnection(opts) {
        const now = Date.now();
        if (this._sniffEnabled === true && now > this._nextSniff) {
          this.sniff({ reason: _Transport.sniffReasons.SNIFF_INTERVAL, requestId: opts.requestId });
        }
        return this.connectionPool.getConnection({
          filter: this.nodeFilter,
          selector: this.nodeSelector,
          requestId: opts.requestId,
          name: this.name,
          now
        });
      }
      sniff(opts, callback = noop) {
        if (this._isSniffing === true)
          return;
        this._isSniffing = true;
        debug("Started sniffing request");
        if (typeof opts === "function") {
          callback = opts;
          opts = { reason: _Transport.sniffReasons.DEFAULT };
        }
        const { reason } = opts;
        const request = {
          method: "GET",
          path: this.sniffEndpoint
        };
        this.request(request, { id: opts.requestId }, (err, result) => {
          this._isSniffing = false;
          if (this._sniffEnabled === true) {
            this._nextSniff = Date.now() + this.sniffInterval;
          }
          if (err != null) {
            debug("Sniffing errored", err);
            result.meta.sniff = { hosts: [], reason };
            this.emit("sniff", err, result);
            return callback(err);
          }
          debug("Sniffing ended successfully", result.body);
          const protocol = result.meta.connection.url.protocol || /* istanbul ignore next */
          "http:";
          const hosts = this.connectionPool.nodesToHost(result.body.nodes, protocol);
          this.connectionPool.update(hosts);
          result.meta.sniff = { hosts, reason };
          this.emit("sniff", null, result);
          callback(null, hosts);
        });
      }
      productCheck() {
        debug("Start product check");
        this[kProductCheck] = 1;
        this.request({
          method: "GET",
          path: "/"
        }, (err, result) => {
          this[kProductCheck] = 3;
          if (err) {
            debug("Product check failed", err);
            if (err.statusCode === 401 || err.statusCode === 403) {
              this[kProductCheck] = 2;
              process.emitWarning(
                "The client is unable to verify that the server is Elasticsearch due to security privileges on the server side. Some functionality may not be compatible if the server is running an unsupported product.",
                "ProductNotSupportedSecurityError"
              );
              this[kEventEmitter].emit("product-check", null, true);
            } else {
              this[kProductCheck] = 0;
              this[kEventEmitter].emit("product-check", err, false);
            }
          } else {
            debug("Checking elasticsearch version", result.body, result.headers);
            if (result.body.version == null || typeof result.body.version.number !== "string") {
              debug("Can't access Elasticsearch version");
              return this[kEventEmitter].emit("product-check", null, false);
            }
            const tagline = result.body.tagline;
            const version = result.body.version.number.split(".");
            const major = Number(version[0]);
            const minor = Number(version[1]);
            if (major < 6) {
              return this[kEventEmitter].emit("product-check", null, false);
            } else if (major >= 6 && major < 7) {
              if (tagline !== "You Know, for Search") {
                debug("Bad tagline");
                return this[kEventEmitter].emit("product-check", null, false);
              }
            } else if (major === 7 && minor < 14) {
              if (tagline !== "You Know, for Search") {
                debug("Bad tagline");
                return this[kEventEmitter].emit("product-check", null, false);
              }
              if (result.body.version.build_flavor !== "default") {
                debug("Bad build_flavor");
                this[kProductCheck] = 4;
                return this[kEventEmitter].emit("product-check", null, false);
              }
            } else {
              if (result.headers["x-elastic-product"] !== "Elasticsearch") {
                debug("x-elastic-product not recognized");
                return this[kEventEmitter].emit("product-check", null, false);
              }
            }
            debug("Valid Elasticsearch distribution");
            this[kProductCheck] = 2;
            this[kEventEmitter].emit("product-check", null, true);
          }
        });
      }
    };
    Transport.sniffReasons = {
      SNIFF_ON_START: "sniff-on-start",
      SNIFF_INTERVAL: "sniff-interval",
      SNIFF_ON_CONNECTION_FAULT: "sniff-on-connection-fault",
      // TODO: find a better name
      DEFAULT: "default"
    };
    function toMs(time) {
      if (typeof time === "string") {
        return ms(time);
      }
      return time;
    }
    function shouldSerialize(obj) {
      return typeof obj !== "string" && typeof obj.pipe !== "function" && Buffer.isBuffer(obj) === false;
    }
    function isStream(obj) {
      return obj != null && typeof obj.pipe === "function";
    }
    function defaultNodeFilter(node) {
      if (node.roles.master === true && node.roles.data === false && node.roles.ingest === false) {
        return false;
      }
      return true;
    }
    function roundRobinSelector() {
      let current = -1;
      return function _roundRobinSelector(connections) {
        if (++current >= connections.length) {
          current = 0;
        }
        return connections[current];
      };
    }
    function randomSelector(connections) {
      const index = Math.floor(Math.random() * connections.length);
      return connections[index];
    }
    function generateRequestId() {
      const maxInt = 2147483647;
      let nextReqId = 0;
      return function genReqId(params, options) {
        return nextReqId = nextReqId + 1 & maxInt;
      };
    }
    function lowerCaseHeaders(oldHeaders) {
      if (oldHeaders == null)
        return oldHeaders;
      const newHeaders = {};
      for (const header in oldHeaders) {
        newHeaders[header.toLowerCase()] = oldHeaders[header];
      }
      return newHeaders;
    }
    module.exports = Transport;
    module.exports.internals = {
      defaultNodeFilter,
      roundRobinSelector,
      randomSelector,
      generateRequestId,
      lowerCaseHeaders
    };
  }
});

// browser-external:assert
var require_assert = __commonJS({
  "browser-external:assert"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "assert" has been externalized for browser compatibility. Cannot access "assert.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:util
var require_util = __commonJS({
  "browser-external:util"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "util" has been externalized for browser compatibility. Cannot access "util.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:https
var require_https = __commonJS({
  "browser-external:https"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "https" has been externalized for browser compatibility. Cannot access "https.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:http
var require_http = __commonJS({
  "browser-external:http"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "http" has been externalized for browser compatibility. Cannot access "http.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/hpagent/index.js
var require_hpagent = __commonJS({
  "node_modules/hpagent/index.js"(exports, module) {
    "use strict";
    var https = require_https();
    var http = require_http();
    var { URL } = require_url();
    var HttpProxyAgent = class extends http.Agent {
      constructor(options) {
        const { proxy, ...opts } = options;
        super(opts);
        this.proxy = typeof proxy === "string" ? new URL(proxy) : proxy;
      }
      createConnection(options, callback) {
        const requestOptions = {
          method: "CONNECT",
          host: this.proxy.hostname,
          port: this.proxy.port,
          path: `${options.host}:${options.port}`,
          setHost: false,
          headers: { connection: this.keepAlive ? "keep-alive" : "close", host: `${options.host}:${options.port}` },
          agent: false
        };
        if (this.proxy.username || this.proxy.password) {
          const base64 = Buffer.from(`${this.proxy.username || ""}:${this.proxy.password || ""}`).toString("base64");
          requestOptions.headers["proxy-authorization"] = `Basic ${base64}`;
        }
        const request = (this.proxy.protocol === "http:" ? http : https).request(requestOptions);
        request.once("connect", (response, socket, head) => {
          request.removeAllListeners();
          socket.removeAllListeners();
          if (response.statusCode === 200) {
            callback(null, socket);
          } else {
            callback(new Error(`Bad response: ${response.statusCode}`), null);
          }
        });
        request.once("error", (err) => {
          request.removeAllListeners();
          callback(err, null);
        });
        request.end();
      }
    };
    var HttpsProxyAgent = class extends https.Agent {
      constructor(options) {
        const { proxy, ...opts } = options;
        super(opts);
        this.proxy = typeof proxy === "string" ? new URL(proxy) : proxy;
      }
      createConnection(options, callback) {
        const requestOptions = {
          method: "CONNECT",
          host: this.proxy.hostname,
          port: this.proxy.port,
          path: `${options.host}:${options.port}`,
          setHost: false,
          headers: { connection: this.keepAlive ? "keep-alive" : "close", host: `${options.host}:${options.port}` },
          agent: false
        };
        if (this.proxy.username || this.proxy.password) {
          const base64 = Buffer.from(`${this.proxy.username || ""}:${this.proxy.password || ""}`).toString("base64");
          requestOptions.headers["proxy-authorization"] = `Basic ${base64}`;
        }
        const request = (this.proxy.protocol === "http:" ? http : https).request(requestOptions);
        request.once("connect", (response, socket, head) => {
          request.removeAllListeners();
          socket.removeAllListeners();
          if (response.statusCode === 200) {
            const secureSocket = super.createConnection({ ...options, socket });
            callback(null, secureSocket);
          } else {
            callback(new Error(`Bad response: ${response.statusCode}`), null);
          }
        });
        request.once("error", (err) => {
          request.removeAllListeners();
          callback(err, null);
        });
        request.end();
      }
    };
    module.exports = {
      HttpProxyAgent,
      HttpsProxyAgent
    };
  }
});

// browser-external:stream
var require_stream = __commonJS({
  "browser-external:stream"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "stream" has been externalized for browser compatibility. Cannot access "stream.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/@elastic/elasticsearch/lib/Connection.js
var require_Connection = __commonJS({
  "node_modules/@elastic/elasticsearch/lib/Connection.js"(exports, module) {
    "use strict";
    var assert = require_assert();
    var { inspect } = require_util();
    var hpagent = require_hpagent();
    var http = require_http();
    var https = require_https();
    var debug = require_browser()("elasticsearch");
    var { pipeline } = require_stream();
    var INVALID_PATH_REGEX = /[^\u0021-\u00ff]/;
    var {
      ConnectionError,
      RequestAbortedError,
      TimeoutError,
      ConfigurationError
    } = require_errors();
    var Connection = class _Connection {
      constructor(opts) {
        this.url = opts.url;
        this.ssl = opts.ssl || null;
        this.id = opts.id || stripAuth(opts.url.href);
        this.headers = prepareHeaders(opts.headers, opts.auth);
        this.deadCount = 0;
        this.resurrectTimeout = 0;
        this.caFingerprint = opts.caFingerprint;
        this._openRequests = 0;
        this._status = opts.status || _Connection.statuses.ALIVE;
        this.roles = Object.assign({}, defaultRoles, opts.roles);
        if (!["http:", "https:"].includes(this.url.protocol)) {
          throw new ConfigurationError(`Invalid protocol: '${this.url.protocol}'`);
        }
        if (typeof opts.agent === "function") {
          this.agent = opts.agent(opts);
        } else if (opts.agent === false) {
          this.agent = void 0;
        } else {
          const agentOptions = Object.assign({}, {
            keepAlive: true,
            keepAliveMsecs: 1e3,
            maxSockets: 256,
            maxFreeSockets: 256,
            scheduling: "lifo"
          }, opts.agent);
          if (opts.proxy) {
            agentOptions.proxy = opts.proxy;
            this.agent = this.url.protocol === "http:" ? new hpagent.HttpProxyAgent(agentOptions) : new hpagent.HttpsProxyAgent(Object.assign({}, agentOptions, this.ssl));
          } else {
            this.agent = this.url.protocol === "http:" ? new http.Agent(agentOptions) : new https.Agent(Object.assign({}, agentOptions, this.ssl));
          }
        }
        this.makeRequest = this.url.protocol === "http:" ? http.request : https.request;
      }
      request(params, callback) {
        this._openRequests++;
        let cleanedListeners = false;
        const requestParams = this.buildRequestObject(params);
        if (INVALID_PATH_REGEX.test(requestParams.path) === true) {
          callback(new TypeError(`ERR_UNESCAPED_CHARACTERS: ${requestParams.path}`), null);
          return { abort: () => {
          } };
        }
        debug("Starting a new request", params);
        const request = this.makeRequest(requestParams);
        const onResponse = (response) => {
          cleanListeners();
          this._openRequests--;
          callback(null, response);
        };
        const onTimeout = () => {
          cleanListeners();
          this._openRequests--;
          request.once("error", () => {
          });
          request.abort();
          callback(new TimeoutError("Request timed out", params), null);
        };
        const onError = (err) => {
          cleanListeners();
          this._openRequests--;
          let message = err.message;
          if (err.code === "ECONNRESET") {
            const socket = request.socket || {};
            message += ` - Local: ${socket.localAddress || "unknown"}:${socket.localPort || "unknown"}, Remote: ${socket.remoteAddress || "unknown"}:${socket.remotePort || "unknown"}`;
          }
          callback(new ConnectionError(message), null);
        };
        const onAbort = () => {
          cleanListeners();
          request.once("error", () => {
          });
          debug("Request aborted", params);
          this._openRequests--;
          callback(new RequestAbortedError(), null);
        };
        const onSocket = (socket) => {
          if (!socket.isSessionReused()) {
            socket.once("secureConnect", () => {
              const issuerCertificate = getIssuerCertificate(socket);
              if (issuerCertificate == null) {
                onError(new Error("Invalid or malformed certificate"));
                request.once("error", () => {
                });
                return request.abort();
              }
              if (this.caFingerprint !== issuerCertificate.fingerprint256) {
                onError(new Error("Server certificate CA fingerprint does not match the value configured in caFingerprint"));
                request.once("error", () => {
                });
                return request.abort();
              }
            });
          }
        };
        request.on("response", onResponse);
        request.on("timeout", onTimeout);
        request.on("error", onError);
        request.on("abort", onAbort);
        if (this.caFingerprint != null) {
          request.on("socket", onSocket);
        }
        request.setNoDelay(true);
        if (isStream(params.body) === true) {
          pipeline(params.body, request, (err) => {
            if (err != null && cleanedListeners === false) {
              cleanListeners();
              this._openRequests--;
              callback(err, null);
            }
          });
        } else {
          request.end(params.body);
        }
        return request;
        function cleanListeners() {
          request.removeListener("response", onResponse);
          request.removeListener("timeout", onTimeout);
          request.removeListener("error", onError);
          request.removeListener("abort", onAbort);
          request.removeListener("socket", onSocket);
          cleanedListeners = true;
        }
      }
      // TODO: write a better closing logic
      close(callback = () => {
      }) {
        debug("Closing connection", this.id);
        if (this._openRequests > 0) {
          setTimeout(() => this.close(callback), 1e3);
        } else {
          if (this.agent !== void 0) {
            this.agent.destroy();
          }
          callback();
        }
      }
      setRole(role, enabled) {
        if (validRoles.indexOf(role) === -1) {
          throw new ConfigurationError(`Unsupported role: '${role}'`);
        }
        if (typeof enabled !== "boolean") {
          throw new ConfigurationError("enabled should be a boolean");
        }
        this.roles[role] = enabled;
        return this;
      }
      get status() {
        return this._status;
      }
      set status(status) {
        assert(
          ~validStatuses.indexOf(status),
          `Unsupported status: '${status}'`
        );
        this._status = status;
      }
      buildRequestObject(params) {
        const url = this.url;
        const request = {
          protocol: url.protocol,
          hostname: url.hostname[0] === "[" ? url.hostname.slice(1, -1) : url.hostname,
          hash: url.hash,
          search: url.search,
          pathname: url.pathname,
          path: "",
          href: url.href,
          origin: url.origin,
          // https://github.com/elastic/elasticsearch-js/issues/843
          port: url.port !== "" ? url.port : void 0,
          headers: this.headers,
          agent: this.agent
        };
        const paramsKeys = Object.keys(params);
        for (let i = 0, len = paramsKeys.length; i < len; i++) {
          const key = paramsKeys[i];
          if (key === "path") {
            request.pathname = resolve(request.pathname, params[key]);
          } else if (key === "querystring" && !!params[key] === true) {
            if (request.search === "") {
              request.search = "?" + params[key];
            } else {
              request.search += "&" + params[key];
            }
          } else if (key === "headers") {
            request.headers = Object.assign({}, request.headers, params.headers);
          } else {
            request[key] = params[key];
          }
        }
        request.path = request.pathname + request.search;
        return request;
      }
      // Handles console.log and utils.inspect invocations.
      // We want to hide `auth`, `agent` and `ssl` since they made
      // the logs very hard to read. The user can still
      // access them with `instance.agent` and `instance.ssl`.
      [inspect.custom](depth, options) {
        const {
          authorization,
          ...headers
        } = this.headers;
        return {
          url: stripAuth(this.url.toString()),
          id: this.id,
          headers,
          deadCount: this.deadCount,
          resurrectTimeout: this.resurrectTimeout,
          _openRequests: this._openRequests,
          status: this.status,
          roles: this.roles
        };
      }
      toJSON() {
        const {
          authorization,
          ...headers
        } = this.headers;
        return {
          url: stripAuth(this.url.toString()),
          id: this.id,
          headers,
          deadCount: this.deadCount,
          resurrectTimeout: this.resurrectTimeout,
          _openRequests: this._openRequests,
          status: this.status,
          roles: this.roles
        };
      }
    };
    Connection.statuses = {
      ALIVE: "alive",
      DEAD: "dead"
    };
    Connection.roles = {
      MASTER: "master",
      DATA: "data",
      INGEST: "ingest",
      ML: "ml"
    };
    var defaultRoles = {
      [Connection.roles.MASTER]: true,
      [Connection.roles.DATA]: true,
      [Connection.roles.INGEST]: true,
      [Connection.roles.ML]: false
    };
    var validStatuses = Object.keys(Connection.statuses).map((k) => Connection.statuses[k]);
    var validRoles = Object.keys(Connection.roles).map((k) => Connection.roles[k]);
    function stripAuth(url) {
      if (url.indexOf("@") === -1)
        return url;
      return url.slice(0, url.indexOf("//") + 2) + url.slice(url.indexOf("@") + 1);
    }
    function isStream(obj) {
      return obj != null && typeof obj.pipe === "function";
    }
    function resolve(host, path) {
      const hostEndWithSlash = host[host.length - 1] === "/";
      const pathStartsWithSlash = path[0] === "/";
      if (hostEndWithSlash === true && pathStartsWithSlash === true) {
        return host + path.slice(1);
      } else if (hostEndWithSlash !== pathStartsWithSlash) {
        return host + path;
      } else {
        return host + "/" + path;
      }
    }
    function prepareHeaders(headers = {}, auth) {
      if (auth != null && headers.authorization == null) {
        if (auth.apiKey) {
          if (typeof auth.apiKey === "object") {
            headers.authorization = "ApiKey " + Buffer.from(`${auth.apiKey.id}:${auth.apiKey.api_key}`).toString("base64");
          } else {
            headers.authorization = `ApiKey ${auth.apiKey}`;
          }
        } else if (auth.bearer) {
          headers.authorization = `Bearer ${auth.bearer}`;
        } else if (auth.username && auth.password) {
          headers.authorization = "Basic " + Buffer.from(`${auth.username}:${auth.password}`).toString("base64");
        }
      }
      return headers;
    }
    function getIssuerCertificate(socket) {
      let certificate = socket.getPeerCertificate(true);
      while (certificate && Object.keys(certificate).length > 0) {
        if (certificate.issuerCertificate == null) {
          return null;
        }
        if (certificate.fingerprint256 === certificate.issuerCertificate.fingerprint256) {
          break;
        }
        certificate = certificate.issuerCertificate;
      }
      return certificate;
    }
    module.exports = Connection;
    module.exports.internals = { prepareHeaders, getIssuerCertificate };
  }
});

// node_modules/@elastic/elasticsearch/lib/pool/BaseConnectionPool.js
var require_BaseConnectionPool = __commonJS({
  "node_modules/@elastic/elasticsearch/lib/pool/BaseConnectionPool.js"(exports, module) {
    "use strict";
    var { URL } = require_url();
    var debug = require_browser()("elasticsearch");
    var Connection = require_Connection();
    var noop = () => {
    };
    var BaseConnectionPool = class {
      constructor(opts) {
        this.connections = [];
        this.size = this.connections.length;
        this.Connection = opts.Connection;
        this.emit = opts.emit || noop;
        this.auth = opts.auth || null;
        this._ssl = opts.ssl;
        this._agent = opts.agent;
        this._proxy = opts.proxy || null;
        this._caFingerprint = opts.caFingerprint || null;
      }
      getConnection() {
        throw new Error("getConnection must be implemented");
      }
      markAlive() {
        return this;
      }
      markDead() {
        return this;
      }
      /**
       * Creates a new connection instance.
       */
      createConnection(opts) {
        if (typeof opts === "string") {
          opts = this.urlToHost(opts);
        }
        if (this.auth !== null) {
          opts.auth = this.auth;
        } else if (opts.url.username !== "" && opts.url.password !== "") {
          opts.auth = {
            username: decodeURIComponent(opts.url.username),
            password: decodeURIComponent(opts.url.password)
          };
        }
        if (opts.ssl == null)
          opts.ssl = this._ssl;
        if (opts.agent == null)
          opts.agent = this._agent;
        if (opts.proxy == null)
          opts.proxy = this._proxy;
        if (opts.caFingerprint == null)
          opts.caFingerprint = this._caFingerprint;
        const connection = new this.Connection(opts);
        for (const conn of this.connections) {
          if (conn.id === connection.id) {
            throw new Error(`Connection with id '${connection.id}' is already present`);
          }
        }
        return connection;
      }
      /**
       * Adds a new connection to the pool.
       *
       * @param {object|string} host
       * @returns {ConnectionPool}
       */
      addConnection(opts) {
        if (Array.isArray(opts)) {
          return opts.forEach((o) => this.addConnection(o));
        }
        if (typeof opts === "string") {
          opts = this.urlToHost(opts);
        }
        const connectionById = this.connections.find((c) => c.id === opts.id);
        const connectionByUrl = this.connections.find((c) => c.id === opts.url.href);
        if (connectionById || connectionByUrl) {
          throw new Error(`Connection with id '${opts.id || opts.url.href}' is already present`);
        }
        this.update([...this.connections, opts]);
        return this.connections[this.size - 1];
      }
      /**
       * Removes a new connection to the pool.
       *
       * @param {object} connection
       * @returns {ConnectionPool}
       */
      removeConnection(connection) {
        debug("Removing connection", connection);
        return this.update(this.connections.filter((c) => c.id !== connection.id));
      }
      /**
       * Empties the connection pool.
       *
       * @returns {ConnectionPool}
       */
      empty(callback) {
        debug("Emptying the connection pool");
        let openConnections = this.size;
        this.connections.forEach((connection) => {
          connection.close(() => {
            if (--openConnections === 0) {
              this.connections = [];
              this.size = this.connections.length;
              callback();
            }
          });
        });
      }
      /**
       * Update the ConnectionPool with new connections.
       *
       * @param {array} array of connections
       * @returns {ConnectionPool}
       */
      update(nodes) {
        debug("Updating the connection pool");
        const newConnections = [];
        const oldConnections = [];
        for (const node of nodes) {
          const connectionById = this.connections.find((c) => c.id === node.id);
          const connectionByUrl = this.connections.find((c) => c.id === node.url.href);
          if (connectionById) {
            debug(`The connection with id '${node.id}' is already present`);
            this.markAlive(connectionById);
            newConnections.push(connectionById);
          } else if (connectionByUrl) {
            connectionByUrl.id = node.id;
            this.markAlive(connectionByUrl);
            newConnections.push(connectionByUrl);
          } else {
            newConnections.push(this.createConnection(node));
          }
        }
        const ids = nodes.map((c) => c.id);
        for (const connection of this.connections) {
          if (ids.indexOf(connection.id) === -1) {
            oldConnections.push(connection);
          }
        }
        oldConnections.forEach((connection) => connection.close());
        this.connections = newConnections;
        this.size = this.connections.length;
        return this;
      }
      /**
       * Transforms the nodes objects to a host object.
       *
       * @param {object} nodes
       * @returns {array} hosts
       */
      nodesToHost(nodes, protocol) {
        const ids = Object.keys(nodes);
        const hosts = [];
        for (let i = 0, len = ids.length; i < len; i++) {
          const node = nodes[ids[i]];
          if (node.http === void 0)
            continue;
          let address = node.http.publish_address;
          const parts = address.split("/");
          if (parts.length > 1) {
            const hostname = parts[0];
            const port = parts[1].match(/((?::))(?:[0-9]+)$/g)[0].slice(1);
            address = `${hostname}:${port}`;
          }
          address = address.slice(0, 4) === "http" ? address : `${protocol}//${address}`;
          const roles = node.roles.reduce((acc, role) => {
            acc[role] = true;
            return acc;
          }, {});
          hosts.push({
            url: new URL(address),
            id: ids[i],
            roles: Object.assign({
              [Connection.roles.MASTER]: false,
              [Connection.roles.DATA]: false,
              [Connection.roles.INGEST]: false,
              [Connection.roles.ML]: false
            }, roles)
          });
        }
        return hosts;
      }
      /**
       * Transforms an url string to a host object
       *
       * @param {string} url
       * @returns {object} host
       */
      urlToHost(url) {
        return {
          url: new URL(url)
        };
      }
    };
    module.exports = BaseConnectionPool;
  }
});

// node_modules/@elastic/elasticsearch/lib/pool/ConnectionPool.js
var require_ConnectionPool = __commonJS({
  "node_modules/@elastic/elasticsearch/lib/pool/ConnectionPool.js"(exports, module) {
    "use strict";
    var BaseConnectionPool = require_BaseConnectionPool();
    var assert = require_assert();
    var debug = require_browser()("elasticsearch");
    var Connection = require_Connection();
    var noop = () => {
    };
    var ConnectionPool = class _ConnectionPool extends BaseConnectionPool {
      constructor(opts) {
        super(opts);
        this.dead = [];
        this.resurrectTimeout = 1e3 * 60;
        this.resurrectTimeoutCutoff = 5;
        this.pingTimeout = opts.pingTimeout;
        this._sniffEnabled = opts.sniffEnabled || false;
        const resurrectStrategy = opts.resurrectStrategy || "ping";
        this.resurrectStrategy = _ConnectionPool.resurrectStrategies[resurrectStrategy];
        assert(
          this.resurrectStrategy != null,
          `Invalid resurrection strategy: '${resurrectStrategy}'`
        );
      }
      /**
       * Marks a connection as 'alive'.
       * If needed removes the connection from the dead list
       * and then resets the `deadCount`.
       *
       * @param {object} connection
       */
      markAlive(connection) {
        const { id } = connection;
        debug(`Marking as 'alive' connection '${id}'`);
        const index = this.dead.indexOf(id);
        if (index > -1)
          this.dead.splice(index, 1);
        connection.status = Connection.statuses.ALIVE;
        connection.deadCount = 0;
        connection.resurrectTimeout = 0;
        return this;
      }
      /**
       * Marks a connection as 'dead'.
       * If needed adds the connection to the dead list
       * and then increments the `deadCount`.
       *
       * @param {object} connection
       */
      markDead(connection) {
        const { id } = connection;
        debug(`Marking as 'dead' connection '${id}'`);
        if (this.dead.indexOf(id) === -1) {
          for (let i = 0; i < this.size; i++) {
            if (this.connections[i].id === id) {
              this.dead.push(id);
              break;
            }
          }
        }
        connection.status = Connection.statuses.DEAD;
        connection.deadCount++;
        connection.resurrectTimeout = Date.now() + this.resurrectTimeout * Math.pow(
          2,
          Math.min(connection.deadCount - 1, this.resurrectTimeoutCutoff)
        );
        this.dead.sort((a, b) => {
          const conn1 = this.connections.find((c) => c.id === a);
          const conn2 = this.connections.find((c) => c.id === b);
          return conn1.resurrectTimeout - conn2.resurrectTimeout;
        });
        return this;
      }
      /**
       * If enabled, tries to resurrect a connection with the given
       * resurrect strategy ('ping', 'optimistic', 'none').
       *
       * @param {object} { now, requestId }
       * @param {function} callback (isAlive, connection)
       */
      resurrect(opts, callback = noop) {
        if (this.resurrectStrategy === 0 || this.dead.length === 0) {
          debug("Nothing to resurrect");
          callback(null, null);
          return;
        }
        const connection = this.connections.find((c) => c.id === this.dead[0]);
        if ((opts.now || Date.now()) < connection.resurrectTimeout) {
          debug("Nothing to resurrect");
          callback(null, null);
          return;
        }
        const { id } = connection;
        if (this.resurrectStrategy === 1) {
          connection.request({
            method: "HEAD",
            path: "/",
            timeout: this.pingTimeout
          }, (err, response) => {
            let isAlive = true;
            const statusCode = response !== null ? response.statusCode : 0;
            if (err != null || (statusCode === 502 || statusCode === 503 || statusCode === 504)) {
              debug(`Resurrect: connection '${id}' is still dead`);
              this.markDead(connection);
              isAlive = false;
            } else {
              debug(`Resurrect: connection '${id}' is now alive`);
              this.markAlive(connection);
            }
            this.emit("resurrect", null, {
              strategy: "ping",
              name: opts.name,
              request: { id: opts.requestId },
              isAlive,
              connection
            });
            callback(isAlive, connection);
          });
        } else {
          debug(`Resurrect: optimistic resurrection for connection '${id}'`);
          this.dead.splice(this.dead.indexOf(id), 1);
          connection.status = Connection.statuses.ALIVE;
          this.emit("resurrect", null, {
            strategy: "optimistic",
            name: opts.name,
            request: { id: opts.requestId },
            isAlive: true,
            connection
          });
          callback(true, connection);
        }
      }
      /**
       * Returns an alive connection if present,
       * otherwise returns a dead connection.
       * By default it filters the `master` only nodes.
       * It uses the selector to choose which
       * connection return.
       *
       * @param {object} options (filter and selector)
       * @returns {object|null} connection
       */
      getConnection(opts = {}) {
        const filter = opts.filter || (() => true);
        const selector = opts.selector || ((c) => c[0]);
        this.resurrect({
          now: opts.now,
          requestId: opts.requestId,
          name: opts.name
        });
        const noAliveConnections = this.size === this.dead.length;
        const connections = [];
        for (let i = 0; i < this.size; i++) {
          const connection = this.connections[i];
          if (noAliveConnections || connection.status === Connection.statuses.ALIVE) {
            if (filter(connection) === true) {
              connections.push(connection);
            }
          }
        }
        if (connections.length === 0)
          return null;
        return selector(connections);
      }
      /**
       * Empties the connection pool.
       *
       * @returns {ConnectionPool}
       */
      empty(callback) {
        super.empty(() => {
          this.dead = [];
          callback();
        });
      }
      /**
       * Update the ConnectionPool with new connections.
       *
       * @param {array} array of connections
       * @returns {ConnectionPool}
       */
      update(connections) {
        super.update(connections);
        this.dead = [];
        return this;
      }
    };
    ConnectionPool.resurrectStrategies = {
      none: 0,
      ping: 1,
      optimistic: 2
    };
    module.exports = ConnectionPool;
  }
});

// node_modules/@elastic/elasticsearch/lib/pool/CloudConnectionPool.js
var require_CloudConnectionPool = __commonJS({
  "node_modules/@elastic/elasticsearch/lib/pool/CloudConnectionPool.js"(exports, module) {
    "use strict";
    var BaseConnectionPool = require_BaseConnectionPool();
    var CloudConnectionPool = class extends BaseConnectionPool {
      constructor(opts) {
        super(opts);
        this.cloudConnection = null;
      }
      /**
       * Returns the only cloud connection.
       *
       * @returns {object} connection
       */
      getConnection() {
        return this.cloudConnection;
      }
      /**
       * Empties the connection pool.
       *
       * @returns {ConnectionPool}
       */
      empty(callback) {
        super.empty(() => {
          this.cloudConnection = null;
          callback();
        });
      }
      /**
       * Update the ConnectionPool with new connections.
       *
       * @param {array} array of connections
       * @returns {ConnectionPool}
       */
      update(connections) {
        super.update(connections);
        this.cloudConnection = this.connections[0];
        return this;
      }
    };
    module.exports = CloudConnectionPool;
  }
});

// node_modules/@elastic/elasticsearch/lib/pool/index.js
var require_pool = __commonJS({
  "node_modules/@elastic/elasticsearch/lib/pool/index.js"(exports, module) {
    "use strict";
    var BaseConnectionPool = require_BaseConnectionPool();
    var ConnectionPool = require_ConnectionPool();
    var CloudConnectionPool = require_CloudConnectionPool();
    module.exports = {
      BaseConnectionPool,
      ConnectionPool,
      CloudConnectionPool
    };
  }
});

// node_modules/@elastic/elasticsearch/lib/Helpers.js
var require_Helpers = __commonJS({
  "node_modules/@elastic/elasticsearch/lib/Helpers.js"(exports, module) {
    "use strict";
    var { Readable } = require_stream();
    var { promisify } = require_util();
    var { ResponseError, ConfigurationError } = require_errors();
    var pImmediate = promisify(setImmediate);
    var sleep = promisify(setTimeout);
    var kClient = Symbol("elasticsearch-client");
    var kMetaHeader = Symbol("meta header");
    var noop = () => {
    };
    var Helpers = class {
      constructor(opts) {
        this[kClient] = opts.client;
        this[kMetaHeader] = opts.metaHeader;
        this.maxRetries = opts.maxRetries;
      }
      /**
       * Runs a search operation. The only difference between client.search and this utility,
       * is that we are only returning the hits to the user and not the full ES response.
       * This helper automatically adds `filter_path=hits.hits._source` to the querystring,
       * as it will only need the documents source.
       * @param {object} params - The Elasticsearch's search parameters.
       * @param {object} options - The client optional configuration for this request.
       * @return {array} The documents that matched the request.
       */
      async search(params, options) {
        appendFilterPath("hits.hits._source", params, true);
        const { body } = await this[kClient].search(params, options);
        if (body.hits && body.hits.hits) {
          return body.hits.hits.map((d) => d._source);
        }
        return [];
      }
      /**
       * Runs a scroll search operation. This function returns an async iterator, allowing
       * the user to use a for await loop to get all the results of a given search.
       * ```js
       * for await (const result of client.helpers.scrollSearch({ params })) {
       *   console.log(result)
       * }
       * ```
       * Each result represents the entire body of a single scroll search request,
       * if you just need to scroll the results, use scrollDocuments.
       * This function handles automatically retries on 429 status code.
       * @param {object} params - The Elasticsearch's search parameters.
       * @param {object} options - The client optional configuration for this request.
       * @return {iterator} the async iterator
       */
      async *scrollSearch(params, options = {}) {
        if (this[kMetaHeader] !== null) {
          options.headers = options.headers || {};
          options.headers["x-elastic-client-meta"] = this[kMetaHeader] + ",h=s";
        }
        const wait = options.wait || 5e3;
        const maxRetries = options.maxRetries || this.maxRetries;
        if (Array.isArray(options.ignore)) {
          options.ignore.push(429);
        } else {
          options.ignore = [429];
        }
        params.scroll = params.scroll || "1m";
        appendFilterPath("_scroll_id", params, false);
        const { method, body, index, ...querystring } = params;
        let response = null;
        for (let i = 0; i <= maxRetries; i++) {
          response = await this[kClient].search(params, options);
          if (response.statusCode !== 429)
            break;
          await sleep(wait);
        }
        if (response.statusCode === 429) {
          throw new ResponseError(response);
        }
        let scroll_id = response.body._scroll_id;
        let stop = false;
        const clear = async () => {
          stop = true;
          await this[kClient].clearScroll(
            { body: { scroll_id } },
            { ignore: [400], ...options }
          );
        };
        while (response.body.hits && response.body.hits.hits.length > 0) {
          scroll_id = response.body._scroll_id;
          response.clear = clear;
          addDocumentsGetter(response);
          yield response;
          if (stop === true) {
            break;
          }
          for (let i = 0; i <= maxRetries; i++) {
            response = await this[kClient].scroll({
              scroll: querystring.scroll,
              rest_total_hits_as_int: querystring.rest_total_hits_as_int || querystring.restTotalHitsAsInt,
              body: { scroll_id }
            }, options);
            if (response.statusCode !== 429)
              break;
            await sleep(wait);
          }
          if (response.statusCode === 429) {
            throw new ResponseError(response);
          }
        }
        if (stop === false) {
          await clear();
        }
      }
      /**
       * Runs a scroll search operation. This function returns an async iterator, allowing
       * the user to use a for await loop to get all the documents of a given search.
       * ```js
       * for await (const document of client.helpers.scrollSearch({ params })) {
       *   console.log(document)
       * }
       * ```
       * Each document is what you will find by running a scrollSearch and iterating on the hits array.
       * This helper automatically adds `filter_path=hits.hits._source` to the querystring,
       * as it will only need the documents source.
       * @param {object} params - The Elasticsearch's search parameters.
       * @param {object} options - The client optional configuration for this request.
       * @return {iterator} the async iterator
       */
      async *scrollDocuments(params, options) {
        appendFilterPath("hits.hits._source", params, true);
        for await (const { documents } of this.scrollSearch(params, options)) {
          for (const document2 of documents) {
            yield document2;
          }
        }
      }
      /**
       * Creates a msearch helper instance. Once you configure it, you can use the provided
       * `search` method to add new searches in the queue.
       * @param {object} options - The configuration of the msearch operations.
       * @param {object} reqOptions - The client optional configuration for this request.
       * @return {object} The possible operations to run.
       */
      msearch(options = {}, reqOptions = {}) {
        const client = this[kClient];
        const {
          operations = 5,
          concurrency = 5,
          flushInterval = 500,
          retries = this.maxRetries,
          wait = 5e3,
          ...msearchOptions
        } = options;
        let stopReading = false;
        let stopError = null;
        let timeoutRef = null;
        const operationsStream = new Readable({
          objectMode: true,
          read(size) {
          }
        });
        const p = iterate();
        const helper = {
          then(onFulfilled, onRejected) {
            return p.then(onFulfilled, onRejected);
          },
          catch(onRejected) {
            return p.catch(onRejected);
          },
          stop(error = null) {
            if (stopReading === true)
              return;
            stopReading = true;
            stopError = error;
            operationsStream.push(null);
          },
          // TODO: support abort a single search?
          // NOTE: the validation checks are synchronous and the callback/promise will
          //       be resolved in the same tick. We might want to fix this in the future.
          search(header, body, callback) {
            if (stopReading === true) {
              const error = stopError === null ? new ConfigurationError("The msearch processor has been stopped") : stopError;
              return callback ? callback(error, {}) : Promise.reject(error);
            }
            if (!(typeof header === "object" && header !== null && !Array.isArray(header))) {
              const error = new ConfigurationError("The header should be an object");
              return callback ? callback(error, {}) : Promise.reject(error);
            }
            if (!(typeof body === "object" && body !== null && !Array.isArray(body))) {
              const error = new ConfigurationError("The body should be an object");
              return callback ? callback(error, {}) : Promise.reject(error);
            }
            let promise = null;
            if (callback === void 0) {
              let onFulfilled = null;
              let onRejected = null;
              promise = new Promise((resolve, reject) => {
                onFulfilled = resolve;
                onRejected = reject;
              });
              callback = function callback2(err, result) {
                err ? onRejected(err) : onFulfilled(result);
              };
            }
            operationsStream.push([header, body, callback]);
            if (promise !== null) {
              return promise;
            }
          }
        };
        return helper;
        async function iterate() {
          const { semaphore, finish } = buildSemaphore();
          const msearchBody = [];
          const callbacks = [];
          let loadedOperations = 0;
          timeoutRef = setTimeout(onFlushTimeout, flushInterval);
          for await (const operation of operationsStream) {
            timeoutRef.refresh();
            loadedOperations += 1;
            msearchBody.push(operation[0], operation[1]);
            callbacks.push(operation[2]);
            if (loadedOperations >= operations) {
              const send = await semaphore();
              send(msearchBody.slice(), callbacks.slice());
              msearchBody.length = 0;
              callbacks.length = 0;
              loadedOperations = 0;
            }
          }
          clearTimeout(timeoutRef);
          if (loadedOperations > 0) {
            const send = await semaphore();
            send(msearchBody, callbacks);
          }
          await finish();
          if (stopError !== null) {
            throw stopError;
          }
          async function onFlushTimeout() {
            if (loadedOperations === 0)
              return;
            const msearchBodyCopy = msearchBody.slice();
            const callbacksCopy = callbacks.slice();
            msearchBody.length = 0;
            callbacks.length = 0;
            loadedOperations = 0;
            try {
              const send = await semaphore();
              send(msearchBodyCopy, callbacksCopy);
            } catch (err) {
              helper.stop(err);
            }
          }
        }
        function buildSemaphore() {
          let resolveSemaphore = null;
          let resolveFinish = null;
          let running = 0;
          return { semaphore, finish };
          function finish() {
            return new Promise((resolve, reject) => {
              if (running === 0) {
                resolve();
              } else {
                resolveFinish = resolve;
              }
            });
          }
          function semaphore() {
            if (running < concurrency) {
              running += 1;
              return pImmediate(send);
            } else {
              return new Promise((resolve, reject) => {
                resolveSemaphore = resolve;
              });
            }
          }
          function send(msearchBody, callbacks) {
            if (running > concurrency) {
              throw new Error("Max concurrency reached");
            }
            msearchOperation(msearchBody, callbacks, () => {
              running -= 1;
              if (resolveSemaphore) {
                running += 1;
                resolveSemaphore(send);
                resolveSemaphore = null;
              } else if (resolveFinish && running === 0) {
                resolveFinish();
              }
            });
          }
        }
        function msearchOperation(msearchBody, callbacks, done) {
          let retryCount = retries;
          tryMsearch(msearchBody, callbacks, retrySearch);
          function retrySearch(msearchBody2, callbacks2) {
            if (msearchBody2.length > 0 && retryCount > 0) {
              retryCount -= 1;
              setTimeout(tryMsearch, wait, msearchBody2, callbacks2, retrySearch);
              return;
            }
            done();
          }
          function tryMsearch(msearchBody2, callbacks2, done2) {
            client.msearch(Object.assign({}, msearchOptions, { body: msearchBody2 }), reqOptions, (err, results) => {
              const retryBody = [];
              const retryCallbacks = [];
              if (err) {
                addDocumentsGetter(results);
                for (const callback of callbacks2) {
                  callback(err, results);
                }
                return done2(retryBody, retryCallbacks);
              }
              const { responses } = results.body;
              for (let i = 0, len = responses.length; i < len; i++) {
                const response = responses[i];
                if (response.status === 429 && retryCount > 0) {
                  retryBody.push(msearchBody2[i * 2]);
                  retryBody.push(msearchBody2[i * 2 + 1]);
                  retryCallbacks.push(callbacks2[i]);
                  continue;
                }
                const result = { ...results, body: response };
                addDocumentsGetter(result);
                if (response.status >= 400) {
                  callbacks2[i](new ResponseError(result), result);
                } else {
                  callbacks2[i](null, result);
                }
              }
              done2(retryBody, retryCallbacks);
            });
          }
        }
      }
      /**
       * Creates a bulk helper instance. Once you configure it, you can pick which operation
       * to execute with the given dataset, index, create, update, and delete.
       * @param {object} options - The configuration of the bulk operation.
       * @param {object} reqOptions - The client optional configuration for this request.
       * @return {object} The possible operations to run with the datasource.
       */
      bulk(options, reqOptions = {}) {
        const client = this[kClient];
        const { serializer } = client;
        if (this[kMetaHeader] !== null) {
          reqOptions.headers = reqOptions.headers || {};
          reqOptions.headers["x-elastic-client-meta"] = this[kMetaHeader] + ",h=bp";
        }
        const {
          datasource,
          onDocument,
          flushBytes = 5e6,
          flushInterval = 3e4,
          concurrency = 5,
          retries = this.maxRetries,
          wait = 5e3,
          onDrop = noop,
          refreshOnCompletion = false,
          ...bulkOptions
        } = options;
        if (datasource === void 0) {
          return Promise.reject(new ConfigurationError("bulk helper: the datasource is required"));
        }
        if (!(Array.isArray(datasource) || Buffer.isBuffer(datasource) || typeof datasource.pipe === "function" || datasource[Symbol.asyncIterator])) {
          return Promise.reject(new ConfigurationError("bulk helper: the datasource must be an array or a buffer or a readable stream or an async generator"));
        }
        if (onDocument === void 0) {
          return Promise.reject(new ConfigurationError("bulk helper: the onDocument callback is required"));
        }
        let shouldAbort = false;
        let timeoutRef = null;
        const stats = {
          total: 0,
          failed: 0,
          retry: 0,
          successful: 0,
          noop: 0,
          time: 0,
          bytes: 0,
          aborted: false
        };
        const p = iterate();
        const helper = {
          get stats() {
            return stats;
          },
          then(onFulfilled, onRejected) {
            return p.then(onFulfilled, onRejected);
          },
          catch(onRejected) {
            return p.catch(onRejected);
          },
          abort() {
            clearTimeout(timeoutRef);
            shouldAbort = true;
            stats.aborted = true;
            return this;
          }
        };
        return helper;
        async function iterate() {
          const { semaphore, finish } = buildSemaphore();
          const startTime = Date.now();
          const bulkBody = [];
          let actionBody = "";
          let payloadBody = "";
          let chunkBytes = 0;
          timeoutRef = setTimeout(onFlushTimeout, flushInterval);
          for await (const chunk of datasource) {
            if (shouldAbort === true)
              break;
            timeoutRef.refresh();
            const action = onDocument(chunk);
            const operation = Array.isArray(action) ? Object.keys(action[0])[0] : Object.keys(action)[0];
            if (operation === "index" || operation === "create") {
              actionBody = serializer.serialize(action);
              payloadBody = typeof chunk === "string" ? chunk : serializer.serialize(chunk);
              chunkBytes += Buffer.byteLength(actionBody) + Buffer.byteLength(payloadBody);
              bulkBody.push(actionBody, payloadBody);
            } else if (operation === "update") {
              actionBody = serializer.serialize(action[0]);
              payloadBody = typeof chunk === "string" ? `{"doc":${chunk}}` : serializer.serialize({ doc: chunk, ...action[1] });
              chunkBytes += Buffer.byteLength(actionBody) + Buffer.byteLength(payloadBody);
              bulkBody.push(actionBody, payloadBody);
            } else if (operation === "delete") {
              actionBody = serializer.serialize(action);
              chunkBytes += Buffer.byteLength(actionBody);
              bulkBody.push(actionBody);
            } else {
              clearTimeout(timeoutRef);
              throw new ConfigurationError(`Bulk helper invalid action: '${operation}'`);
            }
            if (chunkBytes >= flushBytes) {
              stats.bytes += chunkBytes;
              const send = await semaphore();
              send(bulkBody.slice());
              bulkBody.length = 0;
              chunkBytes = 0;
            }
          }
          clearTimeout(timeoutRef);
          if (shouldAbort === false && chunkBytes > 0) {
            const send = await semaphore();
            stats.bytes += chunkBytes;
            send(bulkBody);
          }
          await finish();
          if (refreshOnCompletion) {
            await client.indices.refresh({
              index: typeof refreshOnCompletion === "string" ? refreshOnCompletion : "_all"
            }, reqOptions);
          }
          stats.time = Date.now() - startTime;
          stats.total = stats.successful + stats.failed;
          return stats;
          async function onFlushTimeout() {
            if (chunkBytes === 0)
              return;
            stats.bytes += chunkBytes;
            const bulkBodyCopy = bulkBody.slice();
            bulkBody.length = 0;
            chunkBytes = 0;
            try {
              const send = await semaphore();
              send(bulkBodyCopy);
            } catch (err) {
              helper.abort();
            }
          }
        }
        function buildSemaphore() {
          let resolveSemaphore = null;
          let resolveFinish = null;
          let rejectFinish = null;
          let error = null;
          let running = 0;
          return { semaphore, finish };
          function finish() {
            return new Promise((resolve, reject) => {
              if (running === 0) {
                if (error) {
                  reject(error);
                } else {
                  resolve();
                }
              } else {
                resolveFinish = resolve;
                rejectFinish = reject;
              }
            });
          }
          function semaphore() {
            if (running < concurrency) {
              running += 1;
              return pImmediate(send);
            } else {
              return new Promise((resolve, reject) => {
                resolveSemaphore = resolve;
              });
            }
          }
          function send(bulkBody) {
            if (running > concurrency) {
              throw new Error("Max concurrency reached");
            }
            bulkOperation(bulkBody, (err) => {
              running -= 1;
              if (err) {
                shouldAbort = true;
                error = err;
              }
              if (resolveSemaphore) {
                running += 1;
                resolveSemaphore(send);
                resolveSemaphore = null;
              } else if (resolveFinish && running === 0) {
                if (error) {
                  rejectFinish(error);
                } else {
                  resolveFinish();
                }
              }
            });
          }
        }
        function bulkOperation(bulkBody, callback) {
          let retryCount = retries;
          let isRetrying = false;
          tryBulk(bulkBody, retryDocuments);
          function retryDocuments(err, bulkBody2) {
            if (err)
              return callback(err);
            if (shouldAbort === true)
              return callback();
            if (bulkBody2.length > 0) {
              if (retryCount > 0) {
                isRetrying = true;
                retryCount -= 1;
                stats.retry += bulkBody2.length;
                setTimeout(tryBulk, wait, bulkBody2, retryDocuments);
                return;
              }
              for (let i = 0, len = bulkBody2.length; i < len; i = i + 2) {
                const operation = Object.keys(serializer.deserialize(bulkBody2[i]))[0];
                onDrop({
                  status: 429,
                  error: null,
                  operation: serializer.deserialize(bulkBody2[i]),
                  document: operation !== "delete" ? serializer.deserialize(bulkBody2[i + 1]) : null,
                  retried: isRetrying
                });
                stats.failed += 1;
              }
            }
            callback();
          }
          function tryBulk(bulkBody2, callback2) {
            if (shouldAbort === true)
              return callback2(null, []);
            client.bulk(Object.assign({}, bulkOptions, { body: bulkBody2 }), reqOptions, (err, { body }) => {
              if (err)
                return callback2(err, null);
              if (body.errors === false) {
                stats.successful += body.items.length;
                for (const item of body.items) {
                  if (item.update && item.update.result === "noop") {
                    stats.noop++;
                  }
                }
                return callback2(null, []);
              }
              const retry = [];
              const { items } = body;
              let indexSlice = 0;
              for (let i = 0, len = items.length; i < len; i++) {
                const action = items[i];
                const operation = Object.keys(action)[0];
                const { status } = action[operation];
                if (status >= 400) {
                  if (status === 429) {
                    retry.push(bulkBody2[indexSlice]);
                    if (operation !== "delete") {
                      retry.push(bulkBody2[indexSlice + 1]);
                    }
                  } else {
                    onDrop({
                      status,
                      error: action[operation].error,
                      operation: serializer.deserialize(bulkBody2[indexSlice]),
                      document: operation !== "delete" ? serializer.deserialize(bulkBody2[indexSlice + 1]) : null,
                      retried: isRetrying
                    });
                    stats.failed += 1;
                  }
                } else {
                  stats.successful += 1;
                }
                operation === "delete" ? indexSlice += 1 : indexSlice += 2;
              }
              callback2(null, retry);
            });
          }
        }
      }
    };
    function addDocumentsGetter(result) {
      Object.defineProperty(result, "documents", {
        get() {
          if (this.body.hits && this.body.hits.hits) {
            return this.body.hits.hits.map((d) => d._source);
          }
          return [];
        }
      });
    }
    function appendFilterPath(filter, params, force) {
      if (params.filter_path !== void 0) {
        params.filter_path += "," + filter;
      } else if (params.filterPath !== void 0) {
        params.filterPath += "," + filter;
      } else if (force === true) {
        params.filter_path = filter;
      }
    }
    module.exports = Helpers;
  }
});

// browser-external:querystring
var require_querystring = __commonJS({
  "browser-external:querystring"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "querystring" has been externalized for browser compatibility. Cannot access "querystring.${key}" in client code. See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/secure-json-parse/index.js
var require_secure_json_parse = __commonJS({
  "node_modules/secure-json-parse/index.js"(exports, module) {
    "use strict";
    var hasBuffer = typeof Buffer !== "undefined";
    var suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
    var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
    function _parse(text, reviver, options) {
      if (options == null) {
        if (reviver !== null && typeof reviver === "object") {
          options = reviver;
          reviver = void 0;
        }
      }
      if (hasBuffer && Buffer.isBuffer(text)) {
        text = text.toString();
      }
      if (text && text.charCodeAt(0) === 65279) {
        text = text.slice(1);
      }
      const obj = JSON.parse(text, reviver);
      if (obj === null || typeof obj !== "object") {
        return obj;
      }
      const protoAction = options && options.protoAction || "error";
      const constructorAction = options && options.constructorAction || "error";
      if (protoAction === "ignore" && constructorAction === "ignore") {
        return obj;
      }
      if (protoAction !== "ignore" && constructorAction !== "ignore") {
        if (suspectProtoRx.test(text) === false && suspectConstructorRx.test(text) === false) {
          return obj;
        }
      } else if (protoAction !== "ignore" && constructorAction === "ignore") {
        if (suspectProtoRx.test(text) === false) {
          return obj;
        }
      } else {
        if (suspectConstructorRx.test(text) === false) {
          return obj;
        }
      }
      return filter(obj, { protoAction, constructorAction, safe: options && options.safe });
    }
    function filter(obj, { protoAction = "error", constructorAction = "error", safe } = {}) {
      let next = [obj];
      while (next.length) {
        const nodes = next;
        next = [];
        for (const node of nodes) {
          if (protoAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "__proto__")) {
            if (safe === true) {
              return null;
            } else if (protoAction === "error") {
              throw new SyntaxError("Object contains forbidden prototype property");
            }
            delete node.__proto__;
          }
          if (constructorAction !== "ignore" && Object.prototype.hasOwnProperty.call(node, "constructor") && Object.prototype.hasOwnProperty.call(node.constructor, "prototype")) {
            if (safe === true) {
              return null;
            } else if (constructorAction === "error") {
              throw new SyntaxError("Object contains forbidden prototype property");
            }
            delete node.constructor;
          }
          for (const key in node) {
            const value = node[key];
            if (value && typeof value === "object") {
              next.push(value);
            }
          }
        }
      }
      return obj;
    }
    function parse(text, reviver, options) {
      const stackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 0;
      try {
        return _parse(text, reviver, options);
      } finally {
        Error.stackTraceLimit = stackTraceLimit;
      }
    }
    function safeParse(text, reviver) {
      const stackTraceLimit = Error.stackTraceLimit;
      Error.stackTraceLimit = 0;
      try {
        return _parse(text, reviver, { safe: true });
      } catch (_e) {
        return null;
      } finally {
        Error.stackTraceLimit = stackTraceLimit;
      }
    }
    module.exports = parse;
    module.exports.default = parse;
    module.exports.parse = parse;
    module.exports.safeParse = safeParse;
    module.exports.scan = filter;
  }
});

// node_modules/@elastic/elasticsearch/lib/Serializer.js
var require_Serializer = __commonJS({
  "node_modules/@elastic/elasticsearch/lib/Serializer.js"(exports, module) {
    "use strict";
    var { stringify } = require_querystring();
    var debug = require_browser()("elasticsearch");
    var sjson = require_secure_json_parse();
    var { SerializationError, DeserializationError } = require_errors();
    var kJsonOptions = Symbol("secure json parse options");
    var Serializer = class {
      constructor(opts = {}) {
        const disable = opts.disablePrototypePoisoningProtection;
        this[kJsonOptions] = {
          protoAction: disable === true || disable === "proto" ? "ignore" : "error",
          constructorAction: disable === true || disable === "constructor" ? "ignore" : "error"
        };
      }
      serialize(object) {
        debug("Serializing", object);
        let json;
        try {
          json = JSON.stringify(object);
        } catch (err) {
          throw new SerializationError(err.message, object);
        }
        return json;
      }
      deserialize(json) {
        debug("Deserializing", json);
        let object;
        try {
          object = sjson.parse(json, this[kJsonOptions]);
        } catch (err) {
          throw new DeserializationError(err.message, json);
        }
        return object;
      }
      ndserialize(array) {
        debug("ndserialize", array);
        if (Array.isArray(array) === false) {
          throw new SerializationError("The argument provided is not an array");
        }
        let ndjson = "";
        for (let i = 0, len = array.length; i < len; i++) {
          if (typeof array[i] === "string") {
            ndjson += array[i] + "\n";
          } else {
            ndjson += this.serialize(array[i]) + "\n";
          }
        }
        return ndjson;
      }
      qserialize(object) {
        debug("qserialize", object);
        if (object == null)
          return "";
        if (typeof object === "string")
          return object;
        const keys = Object.keys(object);
        for (let i = 0, len = keys.length; i < len; i++) {
          const key = keys[i];
          if (object[key] === void 0) {
            delete object[key];
          } else if (Array.isArray(object[key]) === true) {
            object[key] = object[key].join(",");
          }
        }
        return stringify(object);
      }
    };
    module.exports = Serializer;
  }
});

// node_modules/@elastic/elasticsearch/api/utils.js
var require_utils = __commonJS({
  "node_modules/@elastic/elasticsearch/api/utils.js"(exports, module) {
    "use strict";
    var result = { body: null, statusCode: null, headers: null, warnings: null };
    var kConfigurationError = Symbol("configuration error");
    function handleError(err, callback) {
      if (callback) {
        process.nextTick(callback, err, result);
        return { then: noop, catch: noop, abort: noop };
      }
      return Promise.reject(err);
    }
    function snakeCaseKeys(acceptedQuerystring, snakeCase, querystring) {
      const target = {};
      const keys = Object.keys(querystring);
      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i];
        target[snakeCase[key] || key] = querystring[key];
      }
      return target;
    }
    function normalizeArguments(params, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (typeof params === "function" || params == null) {
        callback = params;
        params = {};
        options = {};
      }
      return [params, options, callback];
    }
    function noop() {
    }
    module.exports = { handleError, snakeCaseKeys, normalizeArguments, noop, kConfigurationError };
  }
});

// node_modules/@elastic/elasticsearch/api/api/async_search.js
var require_async_search = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/async_search.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path", "wait_for_completion_timeout", "keep_alive", "typed_keys", "keep_on_completion", "batched_reduce_size", "request_cache", "analyzer", "analyze_wildcard", "default_operator", "df", "explain", "stored_fields", "docvalue_fields", "from", "ignore_unavailable", "ignore_throttled", "allow_no_indices", "expand_wildcards", "lenient", "preference", "q", "routing", "search_type", "size", "sort", "_source", "_source_excludes", "_source_exclude", "_source_includes", "_source_include", "terminate_after", "stats", "suggest_field", "suggest_mode", "suggest_size", "suggest_text", "timeout", "track_scores", "track_total_hits", "allow_partial_search_results", "version", "seq_no_primary_term", "max_concurrent_shard_requests"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path", waitForCompletionTimeout: "wait_for_completion_timeout", keepAlive: "keep_alive", typedKeys: "typed_keys", keepOnCompletion: "keep_on_completion", batchedReduceSize: "batched_reduce_size", requestCache: "request_cache", analyzeWildcard: "analyze_wildcard", defaultOperator: "default_operator", storedFields: "stored_fields", docvalueFields: "docvalue_fields", ignoreUnavailable: "ignore_unavailable", ignoreThrottled: "ignore_throttled", allowNoIndices: "allow_no_indices", expandWildcards: "expand_wildcards", searchType: "search_type", _sourceExcludes: "_source_excludes", _sourceExclude: "_source_exclude", _sourceIncludes: "_source_includes", _sourceInclude: "_source_include", terminateAfter: "terminate_after", suggestField: "suggest_field", suggestMode: "suggest_mode", suggestSize: "suggest_size", suggestText: "suggest_text", trackScores: "track_scores", trackTotalHits: "track_total_hits", allowPartialSearchResults: "allow_partial_search_results", seqNoPrimaryTerm: "seq_no_primary_term", maxConcurrentShardRequests: "max_concurrent_shard_requests" };
    function AsyncSearchApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    AsyncSearchApi.prototype.delete = function asyncSearchDeleteApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_async_search/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    AsyncSearchApi.prototype.get = function asyncSearchGetApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_async_search/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    AsyncSearchApi.prototype.status = function asyncSearchStatusApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_async_search/status/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    AsyncSearchApi.prototype.submit = function asyncSearchSubmitApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/_async_search";
      } else {
        if (method == null)
          method = "POST";
        path = "/_async_search";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    module.exports = AsyncSearchApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/autoscaling.js
var require_autoscaling = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/autoscaling.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function AutoscalingApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    AutoscalingApi.prototype.deleteAutoscalingPolicy = function autoscalingDeleteAutoscalingPolicyApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_autoscaling/policy/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    AutoscalingApi.prototype.getAutoscalingCapacity = function autoscalingGetAutoscalingCapacityApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_autoscaling/capacity";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    AutoscalingApi.prototype.getAutoscalingPolicy = function autoscalingGetAutoscalingPolicyApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_autoscaling/policy/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    AutoscalingApi.prototype.putAutoscalingPolicy = function autoscalingPutAutoscalingPolicyApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_autoscaling/policy/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(AutoscalingApi.prototype, {
      delete_autoscaling_policy: { get() {
        return this.deleteAutoscalingPolicy;
      } },
      get_autoscaling_capacity: { get() {
        return this.getAutoscalingCapacity;
      } },
      get_autoscaling_policy: { get() {
        return this.getAutoscalingPolicy;
      } },
      put_autoscaling_policy: { get() {
        return this.putAutoscalingPolicy;
      } }
    });
    module.exports = AutoscalingApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/bulk.js
var require_bulk = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/bulk.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["wait_for_active_shards", "refresh", "routing", "timeout", "type", "_source", "_source_excludes", "_source_exclude", "_source_includes", "_source_include", "pipeline", "require_alias", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { waitForActiveShards: "wait_for_active_shards", _sourceExcludes: "_source_excludes", _sourceExclude: "_source_exclude", _sourceIncludes: "_source_includes", _sourceInclude: "_source_include", requireAlias: "require_alias", errorTrace: "error_trace", filterPath: "filter_path" };
    function bulkApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_bulk";
      } else if (index != null) {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/_bulk";
      } else {
        if (method == null)
          method = "POST";
        path = "/_bulk";
      }
      const request = {
        method,
        path,
        bulkBody: body,
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = bulkApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/cat.js
var require_cat = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/cat.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["format", "local", "h", "help", "s", "v", "expand_wildcards", "pretty", "human", "error_trace", "source", "filter_path", "bytes", "master_timeout", "fields", "time", "ts", "health", "pri", "include_unloaded_segments", "allow_no_match", "allow_no_datafeeds", "allow_no_jobs", "from", "size", "full_id", "include_bootstrap", "active_only", "detailed", "index", "ignore_unavailable", "nodes", "actions", "parent_task_id"];
    var snakeCase = { expandWildcards: "expand_wildcards", errorTrace: "error_trace", filterPath: "filter_path", masterTimeout: "master_timeout", includeUnloadedSegments: "include_unloaded_segments", allowNoMatch: "allow_no_match", allowNoDatafeeds: "allow_no_datafeeds", allowNoJobs: "allow_no_jobs", fullId: "full_id", includeBootstrap: "include_bootstrap", activeOnly: "active_only", ignoreUnavailable: "ignore_unavailable", parentTaskId: "parent_task_id" };
    function CatApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    CatApi.prototype.aliases = function catAliasesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (name != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/aliases/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/aliases";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.allocation = function catAllocationApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, nodeId, node_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((node_id || nodeId) != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/allocation/" + encodeURIComponent(node_id || nodeId);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/allocation";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.count = function catCountApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/count/" + encodeURIComponent(index);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/count";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.fielddata = function catFielddataApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, fields, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (fields != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/fielddata/" + encodeURIComponent(fields);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/fielddata";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.health = function catHealthApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_cat/health";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.help = function catHelpApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_cat";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.indices = function catIndicesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/indices/" + encodeURIComponent(index);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/indices";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.master = function catMasterApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_cat/master";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.mlDataFrameAnalytics = function catMlDataFrameAnalyticsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (id != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/ml/data_frame/analytics/" + encodeURIComponent(id);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/ml/data_frame/analytics";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.mlDatafeeds = function catMlDatafeedsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, datafeedId, datafeed_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((datafeed_id || datafeedId) != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/ml/datafeeds/" + encodeURIComponent(datafeed_id || datafeedId);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/ml/datafeeds";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.mlJobs = function catMlJobsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((job_id || jobId) != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/ml/anomaly_detectors";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.mlTrainedModels = function catMlTrainedModelsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, modelId, model_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((model_id || modelId) != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/ml/trained_models/" + encodeURIComponent(model_id || modelId);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/ml/trained_models";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.nodeattrs = function catNodeattrsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_cat/nodeattrs";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.nodes = function catNodesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_cat/nodes";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.pendingTasks = function catPendingTasksApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_cat/pending_tasks";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.plugins = function catPluginsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_cat/plugins";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.recovery = function catRecoveryApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/recovery/" + encodeURIComponent(index);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/recovery";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.repositories = function catRepositoriesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_cat/repositories";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.segments = function catSegmentsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/segments/" + encodeURIComponent(index);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/segments";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.shards = function catShardsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/shards/" + encodeURIComponent(index);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/shards";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.snapshots = function catSnapshotsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, repository, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (repository != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/snapshots/" + encodeURIComponent(repository);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/snapshots";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.tasks = function catTasksApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_cat/tasks";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.templates = function catTemplatesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (name != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/templates/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/templates";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.threadPool = function catThreadPoolApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, threadPoolPatterns, thread_pool_patterns, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((thread_pool_patterns || threadPoolPatterns) != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/thread_pool/" + encodeURIComponent(thread_pool_patterns || threadPoolPatterns);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/thread_pool";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CatApi.prototype.transforms = function catTransformsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, transformId, transform_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((transform_id || transformId) != null) {
        if (method == null)
          method = "GET";
        path = "/_cat/transforms/" + encodeURIComponent(transform_id || transformId);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cat/transforms";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(CatApi.prototype, {
      ml_data_frame_analytics: { get() {
        return this.mlDataFrameAnalytics;
      } },
      ml_datafeeds: { get() {
        return this.mlDatafeeds;
      } },
      ml_jobs: { get() {
        return this.mlJobs;
      } },
      ml_trained_models: { get() {
        return this.mlTrainedModels;
      } },
      pending_tasks: { get() {
        return this.pendingTasks;
      } },
      thread_pool: { get() {
        return this.threadPool;
      } }
    });
    module.exports = CatApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/ccr.js
var require_ccr = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/ccr.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path", "wait_for_active_shards"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path", waitForActiveShards: "wait_for_active_shards" };
    function CcrApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    CcrApi.prototype.deleteAutoFollowPattern = function ccrDeleteAutoFollowPatternApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_ccr/auto_follow/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CcrApi.prototype.follow = function ccrFollowApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/" + encodeURIComponent(index) + "/_ccr/follow";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CcrApi.prototype.followInfo = function ccrFollowInfoApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/" + encodeURIComponent(index) + "/_ccr/info";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CcrApi.prototype.followStats = function ccrFollowStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/" + encodeURIComponent(index) + "/_ccr/stats";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CcrApi.prototype.forgetFollower = function ccrForgetFollowerApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_ccr/forget_follower";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CcrApi.prototype.getAutoFollowPattern = function ccrGetAutoFollowPatternApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (name != null) {
        if (method == null)
          method = "GET";
        path = "/_ccr/auto_follow/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "GET";
        path = "/_ccr/auto_follow";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CcrApi.prototype.pauseAutoFollowPattern = function ccrPauseAutoFollowPatternApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ccr/auto_follow/" + encodeURIComponent(name) + "/pause";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CcrApi.prototype.pauseFollow = function ccrPauseFollowApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_ccr/pause_follow";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CcrApi.prototype.putAutoFollowPattern = function ccrPutAutoFollowPatternApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_ccr/auto_follow/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CcrApi.prototype.resumeAutoFollowPattern = function ccrResumeAutoFollowPatternApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ccr/auto_follow/" + encodeURIComponent(name) + "/resume";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CcrApi.prototype.resumeFollow = function ccrResumeFollowApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_ccr/resume_follow";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CcrApi.prototype.stats = function ccrStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_ccr/stats";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    CcrApi.prototype.unfollow = function ccrUnfollowApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_ccr/unfollow";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(CcrApi.prototype, {
      delete_auto_follow_pattern: { get() {
        return this.deleteAutoFollowPattern;
      } },
      follow_info: { get() {
        return this.followInfo;
      } },
      follow_stats: { get() {
        return this.followStats;
      } },
      forget_follower: { get() {
        return this.forgetFollower;
      } },
      get_auto_follow_pattern: { get() {
        return this.getAutoFollowPattern;
      } },
      pause_auto_follow_pattern: { get() {
        return this.pauseAutoFollowPattern;
      } },
      pause_follow: { get() {
        return this.pauseFollow;
      } },
      put_auto_follow_pattern: { get() {
        return this.putAutoFollowPattern;
      } },
      resume_auto_follow_pattern: { get() {
        return this.resumeAutoFollowPattern;
      } },
      resume_follow: { get() {
        return this.resumeFollow;
      } }
    });
    module.exports = CcrApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/clear_scroll.js
var require_clear_scroll = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/clear_scroll.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function clearScrollApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, scrollId, scroll_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((scroll_id || scrollId) != null) {
        if (method == null)
          method = "DELETE";
        path = "/_search/scroll/" + encodeURIComponent(scroll_id || scrollId);
      } else {
        if (method == null)
          method = "DELETE";
        path = "/_search/scroll";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = clearScrollApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/close_point_in_time.js
var require_close_point_in_time = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/close_point_in_time.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function closePointInTimeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_pit";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = closePointInTimeApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/cluster.js
var require_cluster = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/cluster.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["include_yes_decisions", "include_disk_info", "pretty", "human", "error_trace", "source", "filter_path", "timeout", "master_timeout", "wait_for_removal", "local", "flat_settings", "include_defaults", "expand_wildcards", "level", "wait_for_active_shards", "wait_for_nodes", "wait_for_events", "wait_for_no_relocating_shards", "wait_for_no_initializing_shards", "wait_for_status", "node_ids", "node_names", "create", "dry_run", "explain", "retry_failed", "metric", "wait_for_metadata_version", "wait_for_timeout", "ignore_unavailable", "allow_no_indices"];
    var snakeCase = { includeYesDecisions: "include_yes_decisions", includeDiskInfo: "include_disk_info", errorTrace: "error_trace", filterPath: "filter_path", masterTimeout: "master_timeout", waitForRemoval: "wait_for_removal", flatSettings: "flat_settings", includeDefaults: "include_defaults", expandWildcards: "expand_wildcards", waitForActiveShards: "wait_for_active_shards", waitForNodes: "wait_for_nodes", waitForEvents: "wait_for_events", waitForNoRelocatingShards: "wait_for_no_relocating_shards", waitForNoInitializingShards: "wait_for_no_initializing_shards", waitForStatus: "wait_for_status", nodeIds: "node_ids", nodeNames: "node_names", dryRun: "dry_run", retryFailed: "retry_failed", waitForMetadataVersion: "wait_for_metadata_version", waitForTimeout: "wait_for_timeout", ignoreUnavailable: "ignore_unavailable", allowNoIndices: "allow_no_indices" };
    function ClusterApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    ClusterApi.prototype.allocationExplain = function clusterAllocationExplainApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/_cluster/allocation/explain";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.deleteComponentTemplate = function clusterDeleteComponentTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_component_template/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.deleteVotingConfigExclusions = function clusterDeleteVotingConfigExclusionsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_cluster/voting_config_exclusions";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.existsComponentTemplate = function clusterExistsComponentTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "HEAD";
      path = "/_component_template/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.getComponentTemplate = function clusterGetComponentTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (name != null) {
        if (method == null)
          method = "GET";
        path = "/_component_template/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "GET";
        path = "/_component_template";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.getSettings = function clusterGetSettingsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_cluster/settings";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.health = function clusterHealthApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "GET";
        path = "/_cluster/health/" + encodeURIComponent(index);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cluster/health";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.pendingTasks = function clusterPendingTasksApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_cluster/pending_tasks";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.postVotingConfigExclusions = function clusterPostVotingConfigExclusionsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_cluster/voting_config_exclusions";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.putComponentTemplate = function clusterPutComponentTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_component_template/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.putSettings = function clusterPutSettingsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_cluster/settings";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.remoteInfo = function clusterRemoteInfoApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_remote/info";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.reroute = function clusterRerouteApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_cluster/reroute";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.state = function clusterStateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index != null && params.metric == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: metric");
        return handleError(err, callback);
      }
      let { method, body, metric, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (metric != null && index != null) {
        if (method == null)
          method = "GET";
        path = "/_cluster/state/" + encodeURIComponent(metric) + "/" + encodeURIComponent(index);
      } else if (metric != null) {
        if (method == null)
          method = "GET";
        path = "/_cluster/state/" + encodeURIComponent(metric);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cluster/state";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ClusterApi.prototype.stats = function clusterStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, nodeId, node_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((node_id || nodeId) != null) {
        if (method == null)
          method = "GET";
        path = "/_cluster/stats/nodes/" + encodeURIComponent(node_id || nodeId);
      } else {
        if (method == null)
          method = "GET";
        path = "/_cluster/stats";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(ClusterApi.prototype, {
      allocation_explain: { get() {
        return this.allocationExplain;
      } },
      delete_component_template: { get() {
        return this.deleteComponentTemplate;
      } },
      delete_voting_config_exclusions: { get() {
        return this.deleteVotingConfigExclusions;
      } },
      exists_component_template: { get() {
        return this.existsComponentTemplate;
      } },
      get_component_template: { get() {
        return this.getComponentTemplate;
      } },
      get_settings: { get() {
        return this.getSettings;
      } },
      pending_tasks: { get() {
        return this.pendingTasks;
      } },
      post_voting_config_exclusions: { get() {
        return this.postVotingConfigExclusions;
      } },
      put_component_template: { get() {
        return this.putComponentTemplate;
      } },
      put_settings: { get() {
        return this.putSettings;
      } },
      remote_info: { get() {
        return this.remoteInfo;
      } }
    });
    module.exports = ClusterApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/count.js
var require_count = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/count.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["ignore_unavailable", "ignore_throttled", "allow_no_indices", "expand_wildcards", "min_score", "preference", "routing", "q", "analyzer", "analyze_wildcard", "default_operator", "df", "lenient", "terminate_after", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { ignoreUnavailable: "ignore_unavailable", ignoreThrottled: "ignore_throttled", allowNoIndices: "allow_no_indices", expandWildcards: "expand_wildcards", minScore: "min_score", analyzeWildcard: "analyze_wildcard", defaultOperator: "default_operator", terminateAfter: "terminate_after", errorTrace: "error_trace", filterPath: "filter_path" };
    function countApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_count";
      } else if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_count";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_count";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = countApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/create.js
var require_create = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/create.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["wait_for_active_shards", "refresh", "routing", "timeout", "version", "version_type", "pipeline", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { waitForActiveShards: "wait_for_active_shards", versionType: "version_type", errorTrace: "error_trace", filterPath: "filter_path" };
    function createApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, id, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null && id != null) {
        if (method == null)
          method = "PUT";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/" + encodeURIComponent(id) + "/_create";
      } else {
        if (method == null)
          method = "PUT";
        path = "/" + encodeURIComponent(index) + "/_create/" + encodeURIComponent(id);
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = createApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/dangling_indices.js
var require_dangling_indices = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/dangling_indices.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["accept_data_loss", "timeout", "master_timeout", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { acceptDataLoss: "accept_data_loss", masterTimeout: "master_timeout", errorTrace: "error_trace", filterPath: "filter_path" };
    function DanglingIndicesApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    DanglingIndicesApi.prototype.deleteDanglingIndex = function danglingIndicesDeleteDanglingIndexApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index_uuid == null && params.indexUuid == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index_uuid or indexUuid");
        return handleError(err, callback);
      }
      let { method, body, indexUuid, index_uuid, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_dangling/" + encodeURIComponent(index_uuid || indexUuid);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    DanglingIndicesApi.prototype.importDanglingIndex = function danglingIndicesImportDanglingIndexApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index_uuid == null && params.indexUuid == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index_uuid or indexUuid");
        return handleError(err, callback);
      }
      let { method, body, indexUuid, index_uuid, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_dangling/" + encodeURIComponent(index_uuid || indexUuid);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    DanglingIndicesApi.prototype.listDanglingIndices = function danglingIndicesListDanglingIndicesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_dangling";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(DanglingIndicesApi.prototype, {
      delete_dangling_index: { get() {
        return this.deleteDanglingIndex;
      } },
      import_dangling_index: { get() {
        return this.importDanglingIndex;
      } },
      list_dangling_indices: { get() {
        return this.listDanglingIndices;
      } }
    });
    module.exports = DanglingIndicesApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/delete.js
var require_delete = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/delete.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["wait_for_active_shards", "refresh", "routing", "timeout", "if_seq_no", "if_primary_term", "version", "version_type", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { waitForActiveShards: "wait_for_active_shards", ifSeqNo: "if_seq_no", ifPrimaryTerm: "if_primary_term", versionType: "version_type", errorTrace: "error_trace", filterPath: "filter_path" };
    function deleteApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, id, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null && id != null) {
        if (method == null)
          method = "DELETE";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/" + encodeURIComponent(id);
      } else {
        if (method == null)
          method = "DELETE";
        path = "/" + encodeURIComponent(index) + "/_doc/" + encodeURIComponent(id);
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = deleteApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/delete_by_query.js
var require_delete_by_query = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/delete_by_query.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["analyzer", "analyze_wildcard", "default_operator", "df", "from", "ignore_unavailable", "allow_no_indices", "conflicts", "expand_wildcards", "lenient", "preference", "q", "routing", "scroll", "search_type", "search_timeout", "size", "max_docs", "sort", "terminate_after", "stats", "version", "request_cache", "refresh", "timeout", "wait_for_active_shards", "scroll_size", "wait_for_completion", "requests_per_second", "slices", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { analyzeWildcard: "analyze_wildcard", defaultOperator: "default_operator", ignoreUnavailable: "ignore_unavailable", allowNoIndices: "allow_no_indices", expandWildcards: "expand_wildcards", searchType: "search_type", searchTimeout: "search_timeout", maxDocs: "max_docs", terminateAfter: "terminate_after", requestCache: "request_cache", waitForActiveShards: "wait_for_active_shards", scrollSize: "scroll_size", waitForCompletion: "wait_for_completion", requestsPerSecond: "requests_per_second", errorTrace: "error_trace", filterPath: "filter_path" };
    function deleteByQueryApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_delete_by_query";
      } else {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/_delete_by_query";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = deleteByQueryApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/delete_by_query_rethrottle.js
var require_delete_by_query_rethrottle = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/delete_by_query_rethrottle.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["requests_per_second", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { requestsPerSecond: "requests_per_second", errorTrace: "error_trace", filterPath: "filter_path" };
    function deleteByQueryRethrottleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.task_id == null && params.taskId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: task_id or taskId");
        return handleError(err, callback);
      }
      if (params.requests_per_second == null && params.requestsPerSecond == null) {
        const err = new this[kConfigurationError]("Missing required parameter: requests_per_second or requestsPerSecond");
        return handleError(err, callback);
      }
      let { method, body, taskId, task_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_delete_by_query/" + encodeURIComponent(task_id || taskId) + "/_rethrottle";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = deleteByQueryRethrottleApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/delete_script.js
var require_delete_script = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/delete_script.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["timeout", "master_timeout", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { masterTimeout: "master_timeout", errorTrace: "error_trace", filterPath: "filter_path" };
    function deleteScriptApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_scripts/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = deleteScriptApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/enrich.js
var require_enrich = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/enrich.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path", "wait_for_completion"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path", waitForCompletion: "wait_for_completion" };
    function EnrichApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    EnrichApi.prototype.deletePolicy = function enrichDeletePolicyApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_enrich/policy/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    EnrichApi.prototype.executePolicy = function enrichExecutePolicyApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_enrich/policy/" + encodeURIComponent(name) + "/_execute";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    EnrichApi.prototype.getPolicy = function enrichGetPolicyApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (name != null) {
        if (method == null)
          method = "GET";
        path = "/_enrich/policy/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "GET";
        path = "/_enrich/policy";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    EnrichApi.prototype.putPolicy = function enrichPutPolicyApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_enrich/policy/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    EnrichApi.prototype.stats = function enrichStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_enrich/_stats";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(EnrichApi.prototype, {
      delete_policy: { get() {
        return this.deletePolicy;
      } },
      execute_policy: { get() {
        return this.executePolicy;
      } },
      get_policy: { get() {
        return this.getPolicy;
      } },
      put_policy: { get() {
        return this.putPolicy;
      } }
    });
    module.exports = EnrichApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/eql.js
var require_eql = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/eql.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path", "wait_for_completion_timeout", "keep_alive", "keep_on_completion"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path", waitForCompletionTimeout: "wait_for_completion_timeout", keepAlive: "keep_alive", keepOnCompletion: "keep_on_completion" };
    function EqlApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    EqlApi.prototype.delete = function eqlDeleteApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_eql/search/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    EqlApi.prototype.get = function eqlGetApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_eql/search/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    EqlApi.prototype.getStatus = function eqlGetStatusApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_eql/search/status/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    EqlApi.prototype.search = function eqlSearchApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/" + encodeURIComponent(index) + "/_eql/search";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(EqlApi.prototype, {
      get_status: { get() {
        return this.getStatus;
      } }
    });
    module.exports = EqlApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/exists.js
var require_exists = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/exists.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["stored_fields", "preference", "realtime", "refresh", "routing", "_source", "_source_excludes", "_source_exclude", "_source_includes", "_source_include", "version", "version_type", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { storedFields: "stored_fields", _sourceExcludes: "_source_excludes", _sourceExclude: "_source_exclude", _sourceIncludes: "_source_includes", _sourceInclude: "_source_include", versionType: "version_type", errorTrace: "error_trace", filterPath: "filter_path" };
    function existsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, id, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null && id != null) {
        if (method == null)
          method = "HEAD";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/" + encodeURIComponent(id);
      } else {
        if (method == null)
          method = "HEAD";
        path = "/" + encodeURIComponent(index) + "/_doc/" + encodeURIComponent(id);
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = existsApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/exists_source.js
var require_exists_source = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/exists_source.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["preference", "realtime", "refresh", "routing", "_source", "_source_excludes", "_source_exclude", "_source_includes", "_source_include", "version", "version_type", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { _sourceExcludes: "_source_excludes", _sourceExclude: "_source_exclude", _sourceIncludes: "_source_includes", _sourceInclude: "_source_include", versionType: "version_type", errorTrace: "error_trace", filterPath: "filter_path" };
    function existsSourceApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.id != null && (params.type == null || params.index == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: type, index");
        return handleError(err, callback);
      } else if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, id, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null && id != null) {
        if (method == null)
          method = "HEAD";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/" + encodeURIComponent(id) + "/_source";
      } else {
        if (method == null)
          method = "HEAD";
        path = "/" + encodeURIComponent(index) + "/_source/" + encodeURIComponent(id);
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = existsSourceApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/explain.js
var require_explain = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/explain.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["analyze_wildcard", "analyzer", "default_operator", "df", "stored_fields", "lenient", "preference", "q", "routing", "_source", "_source_excludes", "_source_exclude", "_source_includes", "_source_include", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { analyzeWildcard: "analyze_wildcard", defaultOperator: "default_operator", storedFields: "stored_fields", _sourceExcludes: "_source_excludes", _sourceExclude: "_source_exclude", _sourceIncludes: "_source_includes", _sourceInclude: "_source_include", errorTrace: "error_trace", filterPath: "filter_path" };
    function explainApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, id, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null && id != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/" + encodeURIComponent(id) + "/_explain";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_explain/" + encodeURIComponent(id);
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = explainApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/features.js
var require_features = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/features.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["master_timeout", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { masterTimeout: "master_timeout", errorTrace: "error_trace", filterPath: "filter_path" };
    function FeaturesApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    FeaturesApi.prototype.getFeatures = function featuresGetFeaturesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_features";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    FeaturesApi.prototype.resetFeatures = function featuresResetFeaturesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_features/_reset";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(FeaturesApi.prototype, {
      get_features: { get() {
        return this.getFeatures;
      } },
      reset_features: { get() {
        return this.resetFeatures;
      } }
    });
    module.exports = FeaturesApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/field_caps.js
var require_field_caps = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/field_caps.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["fields", "ignore_unavailable", "allow_no_indices", "expand_wildcards", "include_unmapped", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { ignoreUnavailable: "ignore_unavailable", allowNoIndices: "allow_no_indices", expandWildcards: "expand_wildcards", includeUnmapped: "include_unmapped", errorTrace: "error_trace", filterPath: "filter_path" };
    function fieldCapsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_field_caps";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_field_caps";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = fieldCapsApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/fleet.js
var require_fleet = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/fleet.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["wait_for_advance", "wait_for_index", "checkpoints", "timeout", "pretty", "human", "error_trace", "source", "filter_path", "wait_for_checkpoints", "wait_for_checkpoints_timeout", "allow_partial_search_results"];
    var snakeCase = { waitForAdvance: "wait_for_advance", waitForIndex: "wait_for_index", errorTrace: "error_trace", filterPath: "filter_path", waitForCheckpoints: "wait_for_checkpoints", waitForCheckpointsTimeout: "wait_for_checkpoints_timeout", allowPartialSearchResults: "allow_partial_search_results" };
    function FleetApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    FleetApi.prototype.globalCheckpoints = function fleetGlobalCheckpointsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/" + encodeURIComponent(index) + "/_fleet/global_checkpoints";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    FleetApi.prototype.msearch = function fleetMsearchApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_fleet/_fleet_msearch";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_fleet/_fleet_msearch";
      }
      const request = {
        method,
        path,
        bulkBody: body,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    FleetApi.prototype.search = function fleetSearchApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/" + encodeURIComponent(index) + "/_fleet/_fleet_search";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(FleetApi.prototype, {
      global_checkpoints: { get() {
        return this.globalCheckpoints;
      } }
    });
    module.exports = FleetApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/get.js
var require_get = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/get.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["stored_fields", "preference", "realtime", "refresh", "routing", "_source", "_source_excludes", "_source_exclude", "_source_includes", "_source_include", "version", "version_type", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { storedFields: "stored_fields", _sourceExcludes: "_source_excludes", _sourceExclude: "_source_exclude", _sourceIncludes: "_source_includes", _sourceInclude: "_source_include", versionType: "version_type", errorTrace: "error_trace", filterPath: "filter_path" };
    function getApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, id, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null && id != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/" + encodeURIComponent(id);
      } else {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_doc/" + encodeURIComponent(id);
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = getApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/get_script.js
var require_get_script = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/get_script.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["master_timeout", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { masterTimeout: "master_timeout", errorTrace: "error_trace", filterPath: "filter_path" };
    function getScriptApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_scripts/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = getScriptApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/get_script_context.js
var require_get_script_context = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/get_script_context.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function getScriptContextApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_script_context";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = getScriptContextApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/get_script_languages.js
var require_get_script_languages = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/get_script_languages.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function getScriptLanguagesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_script_language";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = getScriptLanguagesApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/get_source.js
var require_get_source = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/get_source.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["preference", "realtime", "refresh", "routing", "_source", "_source_excludes", "_source_exclude", "_source_includes", "_source_include", "version", "version_type", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { _sourceExcludes: "_source_excludes", _sourceExclude: "_source_exclude", _sourceIncludes: "_source_includes", _sourceInclude: "_source_include", versionType: "version_type", errorTrace: "error_trace", filterPath: "filter_path" };
    function getSourceApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, id, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null && id != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/" + encodeURIComponent(id) + "/_source";
      } else {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_source/" + encodeURIComponent(id);
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = getSourceApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/graph.js
var require_graph = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/graph.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["routing", "timeout", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function GraphApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    GraphApi.prototype.explore = function graphExploreApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_graph/explore";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_graph/explore";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    module.exports = GraphApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/ilm.js
var require_ilm = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/ilm.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path", "only_managed", "only_errors", "dry_run"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path", onlyManaged: "only_managed", onlyErrors: "only_errors", dryRun: "dry_run" };
    function IlmApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    IlmApi.prototype.deleteLifecycle = function ilmDeleteLifecycleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.policy == null) {
        const err = new this[kConfigurationError]("Missing required parameter: policy");
        return handleError(err, callback);
      }
      let { method, body, policy, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_ilm/policy/" + encodeURIComponent(policy);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IlmApi.prototype.explainLifecycle = function ilmExplainLifecycleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/" + encodeURIComponent(index) + "/_ilm/explain";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IlmApi.prototype.getLifecycle = function ilmGetLifecycleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, policy, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (policy != null) {
        if (method == null)
          method = "GET";
        path = "/_ilm/policy/" + encodeURIComponent(policy);
      } else {
        if (method == null)
          method = "GET";
        path = "/_ilm/policy";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IlmApi.prototype.getStatus = function ilmGetStatusApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_ilm/status";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IlmApi.prototype.migrateToDataTiers = function ilmMigrateToDataTiersApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ilm/migrate_to_data_tiers";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IlmApi.prototype.moveToStep = function ilmMoveToStepApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ilm/move/" + encodeURIComponent(index);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IlmApi.prototype.putLifecycle = function ilmPutLifecycleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.policy == null) {
        const err = new this[kConfigurationError]("Missing required parameter: policy");
        return handleError(err, callback);
      }
      let { method, body, policy, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_ilm/policy/" + encodeURIComponent(policy);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IlmApi.prototype.removePolicy = function ilmRemovePolicyApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_ilm/remove";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IlmApi.prototype.retry = function ilmRetryApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_ilm/retry";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IlmApi.prototype.start = function ilmStartApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ilm/start";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IlmApi.prototype.stop = function ilmStopApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ilm/stop";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(IlmApi.prototype, {
      delete_lifecycle: { get() {
        return this.deleteLifecycle;
      } },
      explain_lifecycle: { get() {
        return this.explainLifecycle;
      } },
      get_lifecycle: { get() {
        return this.getLifecycle;
      } },
      get_status: { get() {
        return this.getStatus;
      } },
      migrate_to_data_tiers: { get() {
        return this.migrateToDataTiers;
      } },
      move_to_step: { get() {
        return this.moveToStep;
      } },
      put_lifecycle: { get() {
        return this.putLifecycle;
      } },
      remove_policy: { get() {
        return this.removePolicy;
      } }
    });
    module.exports = IlmApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/index.js
var require_api = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/index.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["wait_for_active_shards", "op_type", "refresh", "routing", "timeout", "version", "version_type", "if_seq_no", "if_primary_term", "pipeline", "require_alias", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { waitForActiveShards: "wait_for_active_shards", opType: "op_type", versionType: "version_type", ifSeqNo: "if_seq_no", ifPrimaryTerm: "if_primary_term", requireAlias: "require_alias", errorTrace: "error_trace", filterPath: "filter_path" };
    function indexApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, id, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null && id != null) {
        if (method == null)
          method = "PUT";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/" + encodeURIComponent(id);
      } else if (index != null && id != null) {
        if (method == null)
          method = "PUT";
        path = "/" + encodeURIComponent(index) + "/_doc/" + encodeURIComponent(id);
      } else if (index != null && type != null) {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type);
      } else {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/_doc";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = indexApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/indices.js
var require_indices = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/indices.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["timeout", "master_timeout", "ignore_unavailable", "allow_no_indices", "expand_wildcards", "pretty", "human", "error_trace", "source", "filter_path", "index", "fielddata", "fields", "query", "request", "wait_for_active_shards", "include_type_name", "run_expensive_tasks", "flush", "local", "flat_settings", "include_defaults", "force", "wait_if_ongoing", "max_num_segments", "only_expunge_deletes", "create", "cause", "write_index_only", "preserve_existing", "order", "detailed", "active_only", "dry_run", "verbose", "status", "copy_settings", "completion_fields", "fielddata_fields", "groups", "level", "types", "include_segment_file_sizes", "include_unloaded_segments", "forbid_closed_indices", "wait_for_completion", "only_ancient_segments", "explain", "q", "analyzer", "analyze_wildcard", "default_operator", "df", "lenient", "rewrite", "all_shards"];
    var snakeCase = { masterTimeout: "master_timeout", ignoreUnavailable: "ignore_unavailable", allowNoIndices: "allow_no_indices", expandWildcards: "expand_wildcards", errorTrace: "error_trace", filterPath: "filter_path", waitForActiveShards: "wait_for_active_shards", includeTypeName: "include_type_name", runExpensiveTasks: "run_expensive_tasks", flatSettings: "flat_settings", includeDefaults: "include_defaults", waitIfOngoing: "wait_if_ongoing", maxNumSegments: "max_num_segments", onlyExpungeDeletes: "only_expunge_deletes", writeIndexOnly: "write_index_only", preserveExisting: "preserve_existing", activeOnly: "active_only", dryRun: "dry_run", copySettings: "copy_settings", completionFields: "completion_fields", fielddataFields: "fielddata_fields", includeSegmentFileSizes: "include_segment_file_sizes", includeUnloadedSegments: "include_unloaded_segments", forbidClosedIndices: "forbid_closed_indices", waitForCompletion: "wait_for_completion", onlyAncientSegments: "only_ancient_segments", analyzeWildcard: "analyze_wildcard", defaultOperator: "default_operator", allShards: "all_shards" };
    function IndicesApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    IndicesApi.prototype.addBlock = function indicesAddBlockApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.block == null) {
        const err = new this[kConfigurationError]("Missing required parameter: block");
        return handleError(err, callback);
      }
      if (params.block != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, block, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/" + encodeURIComponent(index) + "/_block/" + encodeURIComponent(block);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.analyze = function indicesAnalyzeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_analyze";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_analyze";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.clearCache = function indicesClearCacheApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/_cache/clear";
      } else {
        if (method == null)
          method = "POST";
        path = "/_cache/clear";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.clone = function indicesCloneApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.target == null) {
        const err = new this[kConfigurationError]("Missing required parameter: target");
        return handleError(err, callback);
      }
      if (params.target != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, target, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/" + encodeURIComponent(index) + "/_clone/" + encodeURIComponent(target);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.close = function indicesCloseApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_close";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.create = function indicesCreateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/" + encodeURIComponent(index);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.createDataStream = function indicesCreateDataStreamApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_data_stream/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.dataStreamsStats = function indicesDataStreamsStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (name != null) {
        if (method == null)
          method = "GET";
        path = "/_data_stream/" + encodeURIComponent(name) + "/_stats";
      } else {
        if (method == null)
          method = "GET";
        path = "/_data_stream/_stats";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.delete = function indicesDeleteApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/" + encodeURIComponent(index);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.deleteAlias = function indicesDeleteAliasApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      if (params.name != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && name != null) {
        if (method == null)
          method = "DELETE";
        path = "/" + encodeURIComponent(index) + "/_alias/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "DELETE";
        path = "/" + encodeURIComponent(index) + "/_aliases/" + encodeURIComponent(name);
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.deleteDataStream = function indicesDeleteDataStreamApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_data_stream/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.deleteIndexTemplate = function indicesDeleteIndexTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_index_template/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.deleteTemplate = function indicesDeleteTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_template/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.diskUsage = function indicesDiskUsageApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_disk_usage";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.exists = function indicesExistsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "HEAD";
      path = "/" + encodeURIComponent(index);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.existsAlias = function indicesExistsAliasApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && name != null) {
        if (method == null)
          method = "HEAD";
        path = "/" + encodeURIComponent(index) + "/_alias/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "HEAD";
        path = "/_alias/" + encodeURIComponent(name);
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.existsIndexTemplate = function indicesExistsIndexTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "HEAD";
      path = "/_index_template/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.existsTemplate = function indicesExistsTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "HEAD";
      path = "/_template/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.existsType = function indicesExistsTypeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.type == null) {
        const err = new this[kConfigurationError]("Missing required parameter: type");
        return handleError(err, callback);
      }
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "HEAD";
      path = "/" + encodeURIComponent(index) + "/_mapping/" + encodeURIComponent(type);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.fieldUsageStats = function indicesFieldUsageStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/" + encodeURIComponent(index) + "/_field_usage_stats";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.flush = function indicesFlushApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_flush";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_flush";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.flushSynced = function indicesFlushSyncedApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/" + encodeURIComponent(index) + "/_flush/synced";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.forcemerge = function indicesForcemergeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/_forcemerge";
      } else {
        if (method == null)
          method = "POST";
        path = "/_forcemerge";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.freeze = function indicesFreezeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_freeze";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.get = function indicesGetApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/" + encodeURIComponent(index);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.getAlias = function indicesGetAliasApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, name, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && name != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_alias/" + encodeURIComponent(name);
      } else if (name != null) {
        if (method == null)
          method = "GET";
        path = "/_alias/" + encodeURIComponent(name);
      } else if (index != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_alias";
      } else {
        if (method == null)
          method = "GET";
        path = "/_alias";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.getDataStream = function indicesGetDataStreamApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (name != null) {
        if (method == null)
          method = "GET";
        path = "/_data_stream/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "GET";
        path = "/_data_stream";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.getFieldMapping = function indicesGetFieldMappingApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.fields == null) {
        const err = new this[kConfigurationError]("Missing required parameter: fields");
        return handleError(err, callback);
      }
      let { method, body, fields, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null && fields != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_mapping/" + encodeURIComponent(type) + "/field/" + encodeURIComponent(fields);
      } else if (index != null && fields != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_mapping/field/" + encodeURIComponent(fields);
      } else if (type != null && fields != null) {
        if (method == null)
          method = "GET";
        path = "/_mapping/" + encodeURIComponent(type) + "/field/" + encodeURIComponent(fields);
      } else {
        if (method == null)
          method = "GET";
        path = "/_mapping/field/" + encodeURIComponent(fields);
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.getIndexTemplate = function indicesGetIndexTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (name != null) {
        if (method == null)
          method = "GET";
        path = "/_index_template/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "GET";
        path = "/_index_template";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.getMapping = function indicesGetMappingApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_mapping/" + encodeURIComponent(type);
      } else if (index != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_mapping";
      } else if (type != null) {
        if (method == null)
          method = "GET";
        path = "/_mapping/" + encodeURIComponent(type);
      } else {
        if (method == null)
          method = "GET";
        path = "/_mapping";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.getSettings = function indicesGetSettingsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && name != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_settings/" + encodeURIComponent(name);
      } else if (index != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_settings";
      } else if (name != null) {
        if (method == null)
          method = "GET";
        path = "/_settings/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "GET";
        path = "/_settings";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.getTemplate = function indicesGetTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (name != null) {
        if (method == null)
          method = "GET";
        path = "/_template/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "GET";
        path = "/_template";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.getUpgrade = function indicesGetUpgradeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/" + encodeURIComponent(index) + "/_upgrade";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.migrateToDataStream = function indicesMigrateToDataStreamApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_data_stream/_migrate/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.modifyDataStream = function indicesModifyDataStreamApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_data_stream/_modify";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.open = function indicesOpenApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_open";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.promoteDataStream = function indicesPromoteDataStreamApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_data_stream/_promote/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.putAlias = function indicesPutAliasApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      if (params.name != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && name != null) {
        if (method == null)
          method = "PUT";
        path = "/" + encodeURIComponent(index) + "/_alias/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "PUT";
        path = "/" + encodeURIComponent(index) + "/_aliases/" + encodeURIComponent(name);
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.putIndexTemplate = function indicesPutIndexTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_index_template/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.putMapping = function indicesPutMappingApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = "PUT";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_mapping";
      } else if (index != null && type != null) {
        if (method == null)
          method = "PUT";
        path = "/" + encodeURIComponent(index) + "/_mapping/" + encodeURIComponent(type);
      } else if (index != null && type != null) {
        if (method == null)
          method = "PUT";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_mappings";
      } else if (index != null && type != null) {
        if (method == null)
          method = "PUT";
        path = "/" + encodeURIComponent(index) + "/_mappings/" + encodeURIComponent(type);
      } else if (index != null) {
        if (method == null)
          method = "PUT";
        path = "/" + encodeURIComponent(index) + "/_mapping";
      } else if (type != null) {
        if (method == null)
          method = "PUT";
        path = "/_mappings/" + encodeURIComponent(type);
      } else if (index != null) {
        if (method == null)
          method = "PUT";
        path = "/" + encodeURIComponent(index) + "/_mappings";
      } else {
        if (method == null)
          method = "PUT";
        path = "/_mapping/" + encodeURIComponent(type);
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.putSettings = function indicesPutSettingsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "PUT";
        path = "/" + encodeURIComponent(index) + "/_settings";
      } else {
        if (method == null)
          method = "PUT";
        path = "/_settings";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.putTemplate = function indicesPutTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_template/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.recovery = function indicesRecoveryApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_recovery";
      } else {
        if (method == null)
          method = "GET";
        path = "/_recovery";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.refresh = function indicesRefreshApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_refresh";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_refresh";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.reloadSearchAnalyzers = function indicesReloadSearchAnalyzersApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/" + encodeURIComponent(index) + "/_reload_search_analyzers";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.resolveIndex = function indicesResolveIndexApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_resolve/index/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.rollover = function indicesRolloverApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.alias == null) {
        const err = new this[kConfigurationError]("Missing required parameter: alias");
        return handleError(err, callback);
      }
      if ((params.new_index != null || params.newIndex != null) && params.alias == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: alias");
        return handleError(err, callback);
      }
      let { method, body, alias, newIndex, new_index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (alias != null && (new_index || newIndex) != null) {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(alias) + "/_rollover/" + encodeURIComponent(new_index || newIndex);
      } else {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(alias) + "/_rollover";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.segments = function indicesSegmentsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_segments";
      } else {
        if (method == null)
          method = "GET";
        path = "/_segments";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.shardStores = function indicesShardStoresApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_shard_stores";
      } else {
        if (method == null)
          method = "GET";
        path = "/_shard_stores";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.shrink = function indicesShrinkApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.target == null) {
        const err = new this[kConfigurationError]("Missing required parameter: target");
        return handleError(err, callback);
      }
      if (params.target != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, target, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/" + encodeURIComponent(index) + "/_shrink/" + encodeURIComponent(target);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.simulateIndexTemplate = function indicesSimulateIndexTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_index_template/_simulate_index/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.simulateTemplate = function indicesSimulateTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (name != null) {
        if (method == null)
          method = "POST";
        path = "/_index_template/_simulate/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "POST";
        path = "/_index_template/_simulate";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.split = function indicesSplitApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.target == null) {
        const err = new this[kConfigurationError]("Missing required parameter: target");
        return handleError(err, callback);
      }
      if (params.target != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, target, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/" + encodeURIComponent(index) + "/_split/" + encodeURIComponent(target);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.stats = function indicesStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, metric, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && metric != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_stats/" + encodeURIComponent(metric);
      } else if (metric != null) {
        if (method == null)
          method = "GET";
        path = "/_stats/" + encodeURIComponent(metric);
      } else if (index != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_stats";
      } else {
        if (method == null)
          method = "GET";
        path = "/_stats";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.unfreeze = function indicesUnfreezeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_unfreeze";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.updateAliases = function indicesUpdateAliasesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_aliases";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.upgrade = function indicesUpgradeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_upgrade";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IndicesApi.prototype.validateQuery = function indicesValidateQueryApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_validate/query";
      } else if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_validate/query";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_validate/query";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(IndicesApi.prototype, {
      add_block: { get() {
        return this.addBlock;
      } },
      clear_cache: { get() {
        return this.clearCache;
      } },
      create_data_stream: { get() {
        return this.createDataStream;
      } },
      data_streams_stats: { get() {
        return this.dataStreamsStats;
      } },
      delete_alias: { get() {
        return this.deleteAlias;
      } },
      delete_data_stream: { get() {
        return this.deleteDataStream;
      } },
      delete_index_template: { get() {
        return this.deleteIndexTemplate;
      } },
      delete_template: { get() {
        return this.deleteTemplate;
      } },
      disk_usage: { get() {
        return this.diskUsage;
      } },
      exists_alias: { get() {
        return this.existsAlias;
      } },
      exists_index_template: { get() {
        return this.existsIndexTemplate;
      } },
      exists_template: { get() {
        return this.existsTemplate;
      } },
      exists_type: { get() {
        return this.existsType;
      } },
      field_usage_stats: { get() {
        return this.fieldUsageStats;
      } },
      flush_synced: { get() {
        return this.flushSynced;
      } },
      get_alias: { get() {
        return this.getAlias;
      } },
      get_data_stream: { get() {
        return this.getDataStream;
      } },
      get_field_mapping: { get() {
        return this.getFieldMapping;
      } },
      get_index_template: { get() {
        return this.getIndexTemplate;
      } },
      get_mapping: { get() {
        return this.getMapping;
      } },
      get_settings: { get() {
        return this.getSettings;
      } },
      get_template: { get() {
        return this.getTemplate;
      } },
      get_upgrade: { get() {
        return this.getUpgrade;
      } },
      migrate_to_data_stream: { get() {
        return this.migrateToDataStream;
      } },
      modify_data_stream: { get() {
        return this.modifyDataStream;
      } },
      promote_data_stream: { get() {
        return this.promoteDataStream;
      } },
      put_alias: { get() {
        return this.putAlias;
      } },
      put_index_template: { get() {
        return this.putIndexTemplate;
      } },
      put_mapping: { get() {
        return this.putMapping;
      } },
      put_settings: { get() {
        return this.putSettings;
      } },
      put_template: { get() {
        return this.putTemplate;
      } },
      reload_search_analyzers: { get() {
        return this.reloadSearchAnalyzers;
      } },
      resolve_index: { get() {
        return this.resolveIndex;
      } },
      shard_stores: { get() {
        return this.shardStores;
      } },
      simulate_index_template: { get() {
        return this.simulateIndexTemplate;
      } },
      simulate_template: { get() {
        return this.simulateTemplate;
      } },
      update_aliases: { get() {
        return this.updateAliases;
      } },
      validate_query: { get() {
        return this.validateQuery;
      } }
    });
    module.exports = IndicesApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/info.js
var require_info = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/info.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function infoApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = infoApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/ingest.js
var require_ingest = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/ingest.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["master_timeout", "timeout", "pretty", "human", "error_trace", "source", "filter_path", "summary", "if_version", "verbose"];
    var snakeCase = { masterTimeout: "master_timeout", errorTrace: "error_trace", filterPath: "filter_path", ifVersion: "if_version" };
    function IngestApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    IngestApi.prototype.deletePipeline = function ingestDeletePipelineApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_ingest/pipeline/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IngestApi.prototype.geoIpStats = function ingestGeoIpStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_ingest/geoip/stats";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IngestApi.prototype.getPipeline = function ingestGetPipelineApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (id != null) {
        if (method == null)
          method = "GET";
        path = "/_ingest/pipeline/" + encodeURIComponent(id);
      } else {
        if (method == null)
          method = "GET";
        path = "/_ingest/pipeline";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IngestApi.prototype.processorGrok = function ingestProcessorGrokApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_ingest/processor/grok";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IngestApi.prototype.putPipeline = function ingestPutPipelineApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_ingest/pipeline/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    IngestApi.prototype.simulate = function ingestSimulateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (id != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ingest/pipeline/" + encodeURIComponent(id) + "/_simulate";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ingest/pipeline/_simulate";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(IngestApi.prototype, {
      delete_pipeline: { get() {
        return this.deletePipeline;
      } },
      geo_ip_stats: { get() {
        return this.geoIpStats;
      } },
      get_pipeline: { get() {
        return this.getPipeline;
      } },
      processor_grok: { get() {
        return this.processorGrok;
      } },
      put_pipeline: { get() {
        return this.putPipeline;
      } }
    });
    module.exports = IngestApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/license.js
var require_license = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/license.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path", "local", "accept_enterprise", "acknowledge", "type"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path", acceptEnterprise: "accept_enterprise" };
    function LicenseApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    LicenseApi.prototype.delete = function licenseDeleteApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_license";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    LicenseApi.prototype.get = function licenseGetApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_license";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    LicenseApi.prototype.getBasicStatus = function licenseGetBasicStatusApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_license/basic_status";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    LicenseApi.prototype.getTrialStatus = function licenseGetTrialStatusApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_license/trial_status";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    LicenseApi.prototype.post = function licensePostApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_license";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    LicenseApi.prototype.postStartBasic = function licensePostStartBasicApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_license/start_basic";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    LicenseApi.prototype.postStartTrial = function licensePostStartTrialApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_license/start_trial";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(LicenseApi.prototype, {
      get_basic_status: { get() {
        return this.getBasicStatus;
      } },
      get_trial_status: { get() {
        return this.getTrialStatus;
      } },
      post_start_basic: { get() {
        return this.postStartBasic;
      } },
      post_start_trial: { get() {
        return this.postStartTrial;
      } }
    });
    module.exports = LicenseApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/logstash.js
var require_logstash = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/logstash.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function LogstashApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    LogstashApi.prototype.deletePipeline = function logstashDeletePipelineApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_logstash/pipeline/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    LogstashApi.prototype.getPipeline = function logstashGetPipelineApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_logstash/pipeline/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    LogstashApi.prototype.putPipeline = function logstashPutPipelineApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_logstash/pipeline/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(LogstashApi.prototype, {
      delete_pipeline: { get() {
        return this.deletePipeline;
      } },
      get_pipeline: { get() {
        return this.getPipeline;
      } },
      put_pipeline: { get() {
        return this.putPipeline;
      } }
    });
    module.exports = LogstashApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/mget.js
var require_mget = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/mget.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["stored_fields", "preference", "realtime", "refresh", "routing", "_source", "_source_excludes", "_source_exclude", "_source_includes", "_source_include", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { storedFields: "stored_fields", _sourceExcludes: "_source_excludes", _sourceExclude: "_source_exclude", _sourceIncludes: "_source_includes", _sourceInclude: "_source_include", errorTrace: "error_trace", filterPath: "filter_path" };
    function mgetApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_mget";
      } else if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_mget";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_mget";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = mgetApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/migration.js
var require_migration = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/migration.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function MigrationApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    MigrationApi.prototype.deprecations = function migrationDeprecationsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_migration/deprecations";
      } else {
        if (method == null)
          method = "GET";
        path = "/_migration/deprecations";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MigrationApi.prototype.getFeatureUpgradeStatus = function migrationGetFeatureUpgradeStatusApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_migration/system_features";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MigrationApi.prototype.postFeatureUpgrade = function migrationPostFeatureUpgradeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_migration/system_features";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(MigrationApi.prototype, {
      get_feature_upgrade_status: { get() {
        return this.getFeatureUpgradeStatus;
      } },
      post_feature_upgrade: { get() {
        return this.postFeatureUpgrade;
      } }
    });
    module.exports = MigrationApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/ml.js
var require_ml = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/ml.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["allow_no_match", "allow_no_jobs", "force", "timeout", "pretty", "human", "error_trace", "source", "filter_path", "requests_per_second", "allow_no_forecasts", "wait_for_completion", "lines_to_sample", "line_merge_size_limit", "charset", "format", "has_header_row", "column_names", "delimiter", "quote", "should_trim_fields", "grok_pattern", "timestamp_field", "timestamp_format", "explain", "calc_interim", "start", "end", "advance_time", "skip_time", "duration", "expires_in", "max_model_memory", "expand", "exclude_interim", "from", "size", "anomaly_score", "sort", "desc", "job_id", "partition_field_value", "exclude_generated", "verbose", "allow_no_datafeeds", "influencer_score", "top_n", "bucket_span", "overall_score", "record_score", "include", "include_model_definition", "decompress_definition", "tags", "reset_start", "reset_end", "ignore_unavailable", "allow_no_indices", "ignore_throttled", "expand_wildcards", "defer_definition_decompression", "reassign", "delete_intervening_results", "enabled"];
    var snakeCase = { allowNoMatch: "allow_no_match", allowNoJobs: "allow_no_jobs", errorTrace: "error_trace", filterPath: "filter_path", requestsPerSecond: "requests_per_second", allowNoForecasts: "allow_no_forecasts", waitForCompletion: "wait_for_completion", linesToSample: "lines_to_sample", lineMergeSizeLimit: "line_merge_size_limit", hasHeaderRow: "has_header_row", columnNames: "column_names", shouldTrimFields: "should_trim_fields", grokPattern: "grok_pattern", timestampField: "timestamp_field", timestampFormat: "timestamp_format", calcInterim: "calc_interim", advanceTime: "advance_time", skipTime: "skip_time", expiresIn: "expires_in", maxModelMemory: "max_model_memory", excludeInterim: "exclude_interim", anomalyScore: "anomaly_score", jobId: "job_id", partitionFieldValue: "partition_field_value", excludeGenerated: "exclude_generated", allowNoDatafeeds: "allow_no_datafeeds", influencerScore: "influencer_score", topN: "top_n", bucketSpan: "bucket_span", overallScore: "overall_score", recordScore: "record_score", includeModelDefinition: "include_model_definition", decompressDefinition: "decompress_definition", resetStart: "reset_start", resetEnd: "reset_end", ignoreUnavailable: "ignore_unavailable", allowNoIndices: "allow_no_indices", ignoreThrottled: "ignore_throttled", expandWildcards: "expand_wildcards", deferDefinitionDecompression: "defer_definition_decompression", deleteInterveningResults: "delete_intervening_results" };
    function MlApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    MlApi.prototype.closeJob = function mlCloseJobApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/_close";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.deleteCalendar = function mlDeleteCalendarApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.calendar_id == null && params.calendarId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: calendar_id or calendarId");
        return handleError(err, callback);
      }
      let { method, body, calendarId, calendar_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_ml/calendars/" + encodeURIComponent(calendar_id || calendarId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.deleteCalendarEvent = function mlDeleteCalendarEventApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.calendar_id == null && params.calendarId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: calendar_id or calendarId");
        return handleError(err, callback);
      }
      if (params.event_id == null && params.eventId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: event_id or eventId");
        return handleError(err, callback);
      }
      if ((params.event_id != null || params.eventId != null) && (params.calendar_id == null && params.calendarId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: calendar_id");
        return handleError(err, callback);
      }
      let { method, body, calendarId, calendar_id, eventId, event_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_ml/calendars/" + encodeURIComponent(calendar_id || calendarId) + "/events/" + encodeURIComponent(event_id || eventId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.deleteCalendarJob = function mlDeleteCalendarJobApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.calendar_id == null && params.calendarId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: calendar_id or calendarId");
        return handleError(err, callback);
      }
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if ((params.job_id != null || params.jobId != null) && (params.calendar_id == null && params.calendarId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: calendar_id");
        return handleError(err, callback);
      }
      let { method, body, calendarId, calendar_id, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_ml/calendars/" + encodeURIComponent(calendar_id || calendarId) + "/jobs/" + encodeURIComponent(job_id || jobId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.deleteDataFrameAnalytics = function mlDeleteDataFrameAnalyticsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_ml/data_frame/analytics/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.deleteDatafeed = function mlDeleteDatafeedApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.datafeed_id == null && params.datafeedId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: datafeed_id or datafeedId");
        return handleError(err, callback);
      }
      let { method, body, datafeedId, datafeed_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_ml/datafeeds/" + encodeURIComponent(datafeed_id || datafeedId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.deleteExpiredData = function mlDeleteExpiredDataApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((job_id || jobId) != null) {
        if (method == null)
          method = "DELETE";
        path = "/_ml/_delete_expired_data/" + encodeURIComponent(job_id || jobId);
      } else {
        if (method == null)
          method = "DELETE";
        path = "/_ml/_delete_expired_data";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.deleteFilter = function mlDeleteFilterApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.filter_id == null && params.filterId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: filter_id or filterId");
        return handleError(err, callback);
      }
      let { method, body, filterId, filter_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_ml/filters/" + encodeURIComponent(filter_id || filterId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.deleteForecast = function mlDeleteForecastApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if ((params.forecast_id != null || params.forecastId != null) && (params.job_id == null && params.jobId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: job_id");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, forecastId, forecast_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((job_id || jobId) != null && (forecast_id || forecastId) != null) {
        if (method == null)
          method = "DELETE";
        path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/_forecast/" + encodeURIComponent(forecast_id || forecastId);
      } else {
        if (method == null)
          method = "DELETE";
        path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/_forecast";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.deleteJob = function mlDeleteJobApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.deleteModelSnapshot = function mlDeleteModelSnapshotApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if (params.snapshot_id == null && params.snapshotId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: snapshot_id or snapshotId");
        return handleError(err, callback);
      }
      if ((params.snapshot_id != null || params.snapshotId != null) && (params.job_id == null && params.jobId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: job_id");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, snapshotId, snapshot_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/model_snapshots/" + encodeURIComponent(snapshot_id || snapshotId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.deleteTrainedModel = function mlDeleteTrainedModelApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.model_id == null && params.modelId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: model_id or modelId");
        return handleError(err, callback);
      }
      let { method, body, modelId, model_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_ml/trained_models/" + encodeURIComponent(model_id || modelId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.deleteTrainedModelAlias = function mlDeleteTrainedModelAliasApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.model_alias == null && params.modelAlias == null) {
        const err = new this[kConfigurationError]("Missing required parameter: model_alias or modelAlias");
        return handleError(err, callback);
      }
      if (params.model_id == null && params.modelId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: model_id or modelId");
        return handleError(err, callback);
      }
      if ((params.model_alias != null || params.modelAlias != null) && (params.model_id == null && params.modelId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: model_id");
        return handleError(err, callback);
      }
      let { method, body, modelAlias, model_alias, modelId, model_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_ml/trained_models/" + encodeURIComponent(model_id || modelId) + "/model_aliases/" + encodeURIComponent(model_alias || modelAlias);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.estimateModelMemory = function mlEstimateModelMemoryApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/anomaly_detectors/_estimate_model_memory";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.evaluateDataFrame = function mlEvaluateDataFrameApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/data_frame/_evaluate";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.explainDataFrameAnalytics = function mlExplainDataFrameAnalyticsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (id != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/data_frame/analytics/" + encodeURIComponent(id) + "/_explain";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/data_frame/analytics/_explain";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.findFileStructure = function mlFindFileStructureApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/find_file_structure";
      const request = {
        method,
        path,
        bulkBody: body,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.flushJob = function mlFlushJobApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/_flush";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.forecast = function mlForecastApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/_forecast";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getBuckets = function mlGetBucketsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if (params.timestamp != null && (params.job_id == null && params.jobId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: job_id");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, timestamp, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((job_id || jobId) != null && timestamp != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/results/buckets/" + encodeURIComponent(timestamp);
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/results/buckets";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getCalendarEvents = function mlGetCalendarEventsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.calendar_id == null && params.calendarId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: calendar_id or calendarId");
        return handleError(err, callback);
      }
      let { method, body, calendarId, calendar_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_ml/calendars/" + encodeURIComponent(calendar_id || calendarId) + "/events";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getCalendars = function mlGetCalendarsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, calendarId, calendar_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((calendar_id || calendarId) != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/calendars/" + encodeURIComponent(calendar_id || calendarId);
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/calendars";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getCategories = function mlGetCategoriesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if ((params.category_id != null || params.categoryId != null) && (params.job_id == null && params.jobId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: job_id");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, categoryId, category_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((job_id || jobId) != null && (category_id || categoryId) != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/results/categories/" + encodeURIComponent(category_id || categoryId);
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/results/categories";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getDataFrameAnalytics = function mlGetDataFrameAnalyticsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (id != null) {
        if (method == null)
          method = "GET";
        path = "/_ml/data_frame/analytics/" + encodeURIComponent(id);
      } else {
        if (method == null)
          method = "GET";
        path = "/_ml/data_frame/analytics";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getDataFrameAnalyticsStats = function mlGetDataFrameAnalyticsStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (id != null) {
        if (method == null)
          method = "GET";
        path = "/_ml/data_frame/analytics/" + encodeURIComponent(id) + "/_stats";
      } else {
        if (method == null)
          method = "GET";
        path = "/_ml/data_frame/analytics/_stats";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getDatafeedStats = function mlGetDatafeedStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, datafeedId, datafeed_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((datafeed_id || datafeedId) != null) {
        if (method == null)
          method = "GET";
        path = "/_ml/datafeeds/" + encodeURIComponent(datafeed_id || datafeedId) + "/_stats";
      } else {
        if (method == null)
          method = "GET";
        path = "/_ml/datafeeds/_stats";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getDatafeeds = function mlGetDatafeedsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, datafeedId, datafeed_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((datafeed_id || datafeedId) != null) {
        if (method == null)
          method = "GET";
        path = "/_ml/datafeeds/" + encodeURIComponent(datafeed_id || datafeedId);
      } else {
        if (method == null)
          method = "GET";
        path = "/_ml/datafeeds";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getFilters = function mlGetFiltersApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, filterId, filter_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((filter_id || filterId) != null) {
        if (method == null)
          method = "GET";
        path = "/_ml/filters/" + encodeURIComponent(filter_id || filterId);
      } else {
        if (method == null)
          method = "GET";
        path = "/_ml/filters";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getInfluencers = function mlGetInfluencersApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/results/influencers";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getJobStats = function mlGetJobStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((job_id || jobId) != null) {
        if (method == null)
          method = "GET";
        path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/_stats";
      } else {
        if (method == null)
          method = "GET";
        path = "/_ml/anomaly_detectors/_stats";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getJobs = function mlGetJobsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((job_id || jobId) != null) {
        if (method == null)
          method = "GET";
        path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId);
      } else {
        if (method == null)
          method = "GET";
        path = "/_ml/anomaly_detectors";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getModelSnapshotUpgradeStats = function mlGetModelSnapshotUpgradeStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if (params.snapshot_id == null && params.snapshotId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: snapshot_id or snapshotId");
        return handleError(err, callback);
      }
      if ((params.snapshot_id != null || params.snapshotId != null) && (params.job_id == null && params.jobId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: job_id");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, snapshotId, snapshot_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/model_snapshots/" + encodeURIComponent(snapshot_id || snapshotId) + "/_upgrade/_stats";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getModelSnapshots = function mlGetModelSnapshotsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if ((params.snapshot_id != null || params.snapshotId != null) && (params.job_id == null && params.jobId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: job_id");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, snapshotId, snapshot_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((job_id || jobId) != null && (snapshot_id || snapshotId) != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/model_snapshots/" + encodeURIComponent(snapshot_id || snapshotId);
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/model_snapshots";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getOverallBuckets = function mlGetOverallBucketsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/results/overall_buckets";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getRecords = function mlGetRecordsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/results/records";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getTrainedModels = function mlGetTrainedModelsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, modelId, model_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((model_id || modelId) != null) {
        if (method == null)
          method = "GET";
        path = "/_ml/trained_models/" + encodeURIComponent(model_id || modelId);
      } else {
        if (method == null)
          method = "GET";
        path = "/_ml/trained_models";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.getTrainedModelsStats = function mlGetTrainedModelsStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, modelId, model_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((model_id || modelId) != null) {
        if (method == null)
          method = "GET";
        path = "/_ml/trained_models/" + encodeURIComponent(model_id || modelId) + "/_stats";
      } else {
        if (method == null)
          method = "GET";
        path = "/_ml/trained_models/_stats";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.info = function mlInfoApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_ml/info";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.openJob = function mlOpenJobApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/_open";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.postCalendarEvents = function mlPostCalendarEventsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.calendar_id == null && params.calendarId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: calendar_id or calendarId");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, calendarId, calendar_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/calendars/" + encodeURIComponent(calendar_id || calendarId) + "/events";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.postData = function mlPostDataApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/_data";
      const request = {
        method,
        path,
        bulkBody: body,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.previewDataFrameAnalytics = function mlPreviewDataFrameAnalyticsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (id != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/data_frame/analytics/" + encodeURIComponent(id) + "/_preview";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/data_frame/analytics/_preview";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.previewDatafeed = function mlPreviewDatafeedApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, datafeedId, datafeed_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((datafeed_id || datafeedId) != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/datafeeds/" + encodeURIComponent(datafeed_id || datafeedId) + "/_preview";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_ml/datafeeds/_preview";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.putCalendar = function mlPutCalendarApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.calendar_id == null && params.calendarId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: calendar_id or calendarId");
        return handleError(err, callback);
      }
      let { method, body, calendarId, calendar_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_ml/calendars/" + encodeURIComponent(calendar_id || calendarId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.putCalendarJob = function mlPutCalendarJobApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.calendar_id == null && params.calendarId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: calendar_id or calendarId");
        return handleError(err, callback);
      }
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if ((params.job_id != null || params.jobId != null) && (params.calendar_id == null && params.calendarId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: calendar_id");
        return handleError(err, callback);
      }
      let { method, body, calendarId, calendar_id, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_ml/calendars/" + encodeURIComponent(calendar_id || calendarId) + "/jobs/" + encodeURIComponent(job_id || jobId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.putDataFrameAnalytics = function mlPutDataFrameAnalyticsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_ml/data_frame/analytics/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.putDatafeed = function mlPutDatafeedApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.datafeed_id == null && params.datafeedId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: datafeed_id or datafeedId");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, datafeedId, datafeed_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_ml/datafeeds/" + encodeURIComponent(datafeed_id || datafeedId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.putFilter = function mlPutFilterApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.filter_id == null && params.filterId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: filter_id or filterId");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, filterId, filter_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_ml/filters/" + encodeURIComponent(filter_id || filterId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.putJob = function mlPutJobApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.putTrainedModel = function mlPutTrainedModelApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.model_id == null && params.modelId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: model_id or modelId");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, modelId, model_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_ml/trained_models/" + encodeURIComponent(model_id || modelId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.putTrainedModelAlias = function mlPutTrainedModelAliasApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.model_alias == null && params.modelAlias == null) {
        const err = new this[kConfigurationError]("Missing required parameter: model_alias or modelAlias");
        return handleError(err, callback);
      }
      if (params.model_id == null && params.modelId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: model_id or modelId");
        return handleError(err, callback);
      }
      if ((params.model_alias != null || params.modelAlias != null) && (params.model_id == null && params.modelId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: model_id");
        return handleError(err, callback);
      }
      let { method, body, modelAlias, model_alias, modelId, model_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_ml/trained_models/" + encodeURIComponent(model_id || modelId) + "/model_aliases/" + encodeURIComponent(model_alias || modelAlias);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.resetJob = function mlResetJobApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/_reset";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.revertModelSnapshot = function mlRevertModelSnapshotApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if (params.snapshot_id == null && params.snapshotId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: snapshot_id or snapshotId");
        return handleError(err, callback);
      }
      if ((params.snapshot_id != null || params.snapshotId != null) && (params.job_id == null && params.jobId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: job_id");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, snapshotId, snapshot_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/model_snapshots/" + encodeURIComponent(snapshot_id || snapshotId) + "/_revert";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.setUpgradeMode = function mlSetUpgradeModeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/set_upgrade_mode";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.startDataFrameAnalytics = function mlStartDataFrameAnalyticsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/data_frame/analytics/" + encodeURIComponent(id) + "/_start";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.startDatafeed = function mlStartDatafeedApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.datafeed_id == null && params.datafeedId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: datafeed_id or datafeedId");
        return handleError(err, callback);
      }
      let { method, body, datafeedId, datafeed_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/datafeeds/" + encodeURIComponent(datafeed_id || datafeedId) + "/_start";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.stopDataFrameAnalytics = function mlStopDataFrameAnalyticsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/data_frame/analytics/" + encodeURIComponent(id) + "/_stop";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.stopDatafeed = function mlStopDatafeedApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.datafeed_id == null && params.datafeedId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: datafeed_id or datafeedId");
        return handleError(err, callback);
      }
      let { method, body, datafeedId, datafeed_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/datafeeds/" + encodeURIComponent(datafeed_id || datafeedId) + "/_stop";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.updateDataFrameAnalytics = function mlUpdateDataFrameAnalyticsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/data_frame/analytics/" + encodeURIComponent(id) + "/_update";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.updateDatafeed = function mlUpdateDatafeedApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.datafeed_id == null && params.datafeedId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: datafeed_id or datafeedId");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, datafeedId, datafeed_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/datafeeds/" + encodeURIComponent(datafeed_id || datafeedId) + "/_update";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.updateFilter = function mlUpdateFilterApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.filter_id == null && params.filterId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: filter_id or filterId");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, filterId, filter_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/filters/" + encodeURIComponent(filter_id || filterId) + "/_update";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.updateJob = function mlUpdateJobApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/_update";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.updateModelSnapshot = function mlUpdateModelSnapshotApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if (params.snapshot_id == null && params.snapshotId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: snapshot_id or snapshotId");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      if ((params.snapshot_id != null || params.snapshotId != null) && (params.job_id == null && params.jobId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: job_id");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, snapshotId, snapshot_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/model_snapshots/" + encodeURIComponent(snapshot_id || snapshotId) + "/_update";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.upgradeJobSnapshot = function mlUpgradeJobSnapshotApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.job_id == null && params.jobId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: job_id or jobId");
        return handleError(err, callback);
      }
      if (params.snapshot_id == null && params.snapshotId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: snapshot_id or snapshotId");
        return handleError(err, callback);
      }
      if ((params.snapshot_id != null || params.snapshotId != null) && (params.job_id == null && params.jobId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: job_id");
        return handleError(err, callback);
      }
      let { method, body, jobId, job_id, snapshotId, snapshot_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/anomaly_detectors/" + encodeURIComponent(job_id || jobId) + "/model_snapshots/" + encodeURIComponent(snapshot_id || snapshotId) + "/_upgrade";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.validate = function mlValidateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/anomaly_detectors/_validate";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    MlApi.prototype.validateDetector = function mlValidateDetectorApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_ml/anomaly_detectors/_validate/detector";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(MlApi.prototype, {
      close_job: { get() {
        return this.closeJob;
      } },
      delete_calendar: { get() {
        return this.deleteCalendar;
      } },
      delete_calendar_event: { get() {
        return this.deleteCalendarEvent;
      } },
      delete_calendar_job: { get() {
        return this.deleteCalendarJob;
      } },
      delete_data_frame_analytics: { get() {
        return this.deleteDataFrameAnalytics;
      } },
      delete_datafeed: { get() {
        return this.deleteDatafeed;
      } },
      delete_expired_data: { get() {
        return this.deleteExpiredData;
      } },
      delete_filter: { get() {
        return this.deleteFilter;
      } },
      delete_forecast: { get() {
        return this.deleteForecast;
      } },
      delete_job: { get() {
        return this.deleteJob;
      } },
      delete_model_snapshot: { get() {
        return this.deleteModelSnapshot;
      } },
      delete_trained_model: { get() {
        return this.deleteTrainedModel;
      } },
      delete_trained_model_alias: { get() {
        return this.deleteTrainedModelAlias;
      } },
      estimate_model_memory: { get() {
        return this.estimateModelMemory;
      } },
      evaluate_data_frame: { get() {
        return this.evaluateDataFrame;
      } },
      explain_data_frame_analytics: { get() {
        return this.explainDataFrameAnalytics;
      } },
      find_file_structure: { get() {
        return this.findFileStructure;
      } },
      flush_job: { get() {
        return this.flushJob;
      } },
      get_buckets: { get() {
        return this.getBuckets;
      } },
      get_calendar_events: { get() {
        return this.getCalendarEvents;
      } },
      get_calendars: { get() {
        return this.getCalendars;
      } },
      get_categories: { get() {
        return this.getCategories;
      } },
      get_data_frame_analytics: { get() {
        return this.getDataFrameAnalytics;
      } },
      get_data_frame_analytics_stats: { get() {
        return this.getDataFrameAnalyticsStats;
      } },
      get_datafeed_stats: { get() {
        return this.getDatafeedStats;
      } },
      get_datafeeds: { get() {
        return this.getDatafeeds;
      } },
      get_filters: { get() {
        return this.getFilters;
      } },
      get_influencers: { get() {
        return this.getInfluencers;
      } },
      get_job_stats: { get() {
        return this.getJobStats;
      } },
      get_jobs: { get() {
        return this.getJobs;
      } },
      get_model_snapshot_upgrade_stats: { get() {
        return this.getModelSnapshotUpgradeStats;
      } },
      get_model_snapshots: { get() {
        return this.getModelSnapshots;
      } },
      get_overall_buckets: { get() {
        return this.getOverallBuckets;
      } },
      get_records: { get() {
        return this.getRecords;
      } },
      get_trained_models: { get() {
        return this.getTrainedModels;
      } },
      get_trained_models_stats: { get() {
        return this.getTrainedModelsStats;
      } },
      open_job: { get() {
        return this.openJob;
      } },
      post_calendar_events: { get() {
        return this.postCalendarEvents;
      } },
      post_data: { get() {
        return this.postData;
      } },
      preview_data_frame_analytics: { get() {
        return this.previewDataFrameAnalytics;
      } },
      preview_datafeed: { get() {
        return this.previewDatafeed;
      } },
      put_calendar: { get() {
        return this.putCalendar;
      } },
      put_calendar_job: { get() {
        return this.putCalendarJob;
      } },
      put_data_frame_analytics: { get() {
        return this.putDataFrameAnalytics;
      } },
      put_datafeed: { get() {
        return this.putDatafeed;
      } },
      put_filter: { get() {
        return this.putFilter;
      } },
      put_job: { get() {
        return this.putJob;
      } },
      put_trained_model: { get() {
        return this.putTrainedModel;
      } },
      put_trained_model_alias: { get() {
        return this.putTrainedModelAlias;
      } },
      reset_job: { get() {
        return this.resetJob;
      } },
      revert_model_snapshot: { get() {
        return this.revertModelSnapshot;
      } },
      set_upgrade_mode: { get() {
        return this.setUpgradeMode;
      } },
      start_data_frame_analytics: { get() {
        return this.startDataFrameAnalytics;
      } },
      start_datafeed: { get() {
        return this.startDatafeed;
      } },
      stop_data_frame_analytics: { get() {
        return this.stopDataFrameAnalytics;
      } },
      stop_datafeed: { get() {
        return this.stopDatafeed;
      } },
      update_data_frame_analytics: { get() {
        return this.updateDataFrameAnalytics;
      } },
      update_datafeed: { get() {
        return this.updateDatafeed;
      } },
      update_filter: { get() {
        return this.updateFilter;
      } },
      update_job: { get() {
        return this.updateJob;
      } },
      update_model_snapshot: { get() {
        return this.updateModelSnapshot;
      } },
      upgrade_job_snapshot: { get() {
        return this.upgradeJobSnapshot;
      } },
      validate_detector: { get() {
        return this.validateDetector;
      } }
    });
    module.exports = MlApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/monitoring.js
var require_monitoring = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/monitoring.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["system_id", "system_api_version", "interval", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { systemId: "system_id", systemApiVersion: "system_api_version", errorTrace: "error_trace", filterPath: "filter_path" };
    function MonitoringApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    MonitoringApi.prototype.bulk = function monitoringBulkApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (type != null) {
        if (method == null)
          method = "POST";
        path = "/_monitoring/" + encodeURIComponent(type) + "/bulk";
      } else {
        if (method == null)
          method = "POST";
        path = "/_monitoring/bulk";
      }
      const request = {
        method,
        path,
        bulkBody: body,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    module.exports = MonitoringApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/msearch.js
var require_msearch = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/msearch.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["search_type", "max_concurrent_searches", "typed_keys", "pre_filter_shard_size", "max_concurrent_shard_requests", "rest_total_hits_as_int", "ccs_minimize_roundtrips", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { searchType: "search_type", maxConcurrentSearches: "max_concurrent_searches", typedKeys: "typed_keys", preFilterShardSize: "pre_filter_shard_size", maxConcurrentShardRequests: "max_concurrent_shard_requests", restTotalHitsAsInt: "rest_total_hits_as_int", ccsMinimizeRoundtrips: "ccs_minimize_roundtrips", errorTrace: "error_trace", filterPath: "filter_path" };
    function msearchApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_msearch";
      } else if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_msearch";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_msearch";
      }
      const request = {
        method,
        path,
        bulkBody: body,
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = msearchApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/msearch_template.js
var require_msearch_template = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/msearch_template.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["search_type", "typed_keys", "max_concurrent_searches", "rest_total_hits_as_int", "ccs_minimize_roundtrips", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { searchType: "search_type", typedKeys: "typed_keys", maxConcurrentSearches: "max_concurrent_searches", restTotalHitsAsInt: "rest_total_hits_as_int", ccsMinimizeRoundtrips: "ccs_minimize_roundtrips", errorTrace: "error_trace", filterPath: "filter_path" };
    function msearchTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_msearch/template";
      } else if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_msearch/template";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_msearch/template";
      }
      const request = {
        method,
        path,
        bulkBody: body,
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = msearchTemplateApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/mtermvectors.js
var require_mtermvectors = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/mtermvectors.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["ids", "term_statistics", "field_statistics", "fields", "offsets", "positions", "payloads", "preference", "routing", "realtime", "version", "version_type", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { termStatistics: "term_statistics", fieldStatistics: "field_statistics", versionType: "version_type", errorTrace: "error_trace", filterPath: "filter_path" };
    function mtermvectorsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_mtermvectors";
      } else if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_mtermvectors";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_mtermvectors";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = mtermvectorsApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/nodes.js
var require_nodes = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/nodes.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path", "interval", "snapshots", "threads", "ignore_idle_threads", "type", "sort", "timeout", "flat_settings", "completion_fields", "fielddata_fields", "fields", "groups", "level", "types", "include_segment_file_sizes", "include_unloaded_segments"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path", ignoreIdleThreads: "ignore_idle_threads", flatSettings: "flat_settings", completionFields: "completion_fields", fielddataFields: "fielddata_fields", includeSegmentFileSizes: "include_segment_file_sizes", includeUnloadedSegments: "include_unloaded_segments" };
    function NodesApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    NodesApi.prototype.clearRepositoriesMeteringArchive = function nodesClearRepositoriesMeteringArchiveApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.node_id == null && params.nodeId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: node_id or nodeId");
        return handleError(err, callback);
      }
      if (params.max_archive_version == null && params.maxArchiveVersion == null) {
        const err = new this[kConfigurationError]("Missing required parameter: max_archive_version or maxArchiveVersion");
        return handleError(err, callback);
      }
      if ((params.max_archive_version != null || params.maxArchiveVersion != null) && (params.node_id == null && params.nodeId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: node_id");
        return handleError(err, callback);
      }
      let { method, body, nodeId, node_id, maxArchiveVersion, max_archive_version, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/_repositories_metering/" + encodeURIComponent(max_archive_version || maxArchiveVersion);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    NodesApi.prototype.getRepositoriesMeteringInfo = function nodesGetRepositoriesMeteringInfoApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.node_id == null && params.nodeId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: node_id or nodeId");
        return handleError(err, callback);
      }
      let { method, body, nodeId, node_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/_repositories_metering";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    NodesApi.prototype.hotThreads = function nodesHotThreadsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, nodeId, node_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((node_id || nodeId) != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/hot_threads";
      } else if ((node_id || nodeId) != null) {
        if (method == null)
          method = "GET";
        path = "/_cluster/nodes/" + encodeURIComponent(node_id || nodeId) + "/hotthreads";
      } else if ((node_id || nodeId) != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/hotthreads";
      } else if ((node_id || nodeId) != null) {
        if (method == null)
          method = "GET";
        path = "/_cluster/nodes/" + encodeURIComponent(node_id || nodeId) + "/hot_threads";
      } else {
        if (method == null)
          method = "GET";
        path = "/_nodes/hot_threads";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    NodesApi.prototype.info = function nodesInfoApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, nodeId, node_id, metric, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((node_id || nodeId) != null && metric != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/" + encodeURIComponent(metric);
      } else if ((node_id || nodeId) != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/" + encodeURIComponent(node_id || nodeId);
      } else if (metric != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/" + encodeURIComponent(metric);
      } else {
        if (method == null)
          method = "GET";
        path = "/_nodes";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    NodesApi.prototype.reloadSecureSettings = function nodesReloadSecureSettingsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, nodeId, node_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((node_id || nodeId) != null) {
        if (method == null)
          method = "POST";
        path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/reload_secure_settings";
      } else {
        if (method == null)
          method = "POST";
        path = "/_nodes/reload_secure_settings";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    NodesApi.prototype.stats = function nodesStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, nodeId, node_id, metric, indexMetric, index_metric, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((node_id || nodeId) != null && metric != null && (index_metric || indexMetric) != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/stats/" + encodeURIComponent(metric) + "/" + encodeURIComponent(index_metric || indexMetric);
      } else if ((node_id || nodeId) != null && metric != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/stats/" + encodeURIComponent(metric);
      } else if (metric != null && (index_metric || indexMetric) != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/stats/" + encodeURIComponent(metric) + "/" + encodeURIComponent(index_metric || indexMetric);
      } else if ((node_id || nodeId) != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/stats";
      } else if (metric != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/stats/" + encodeURIComponent(metric);
      } else {
        if (method == null)
          method = "GET";
        path = "/_nodes/stats";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    NodesApi.prototype.usage = function nodesUsageApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, nodeId, node_id, metric, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((node_id || nodeId) != null && metric != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/usage/" + encodeURIComponent(metric);
      } else if ((node_id || nodeId) != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/usage";
      } else if (metric != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/usage/" + encodeURIComponent(metric);
      } else {
        if (method == null)
          method = "GET";
        path = "/_nodes/usage";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(NodesApi.prototype, {
      clear_repositories_metering_archive: { get() {
        return this.clearRepositoriesMeteringArchive;
      } },
      get_repositories_metering_info: { get() {
        return this.getRepositoriesMeteringInfo;
      } },
      hot_threads: { get() {
        return this.hotThreads;
      } },
      reload_secure_settings: { get() {
        return this.reloadSecureSettings;
      } }
    });
    module.exports = NodesApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/open_point_in_time.js
var require_open_point_in_time = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/open_point_in_time.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["preference", "routing", "ignore_unavailable", "expand_wildcards", "keep_alive", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { ignoreUnavailable: "ignore_unavailable", expandWildcards: "expand_wildcards", keepAlive: "keep_alive", errorTrace: "error_trace", filterPath: "filter_path" };
    function openPointInTimeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.keep_alive == null && params.keepAlive == null) {
        const err = new this[kConfigurationError]("Missing required parameter: keep_alive or keepAlive");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_pit";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = openPointInTimeApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/ping.js
var require_ping = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/ping.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function pingApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "HEAD";
      path = "/";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = pingApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/put_script.js
var require_put_script = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/put_script.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["timeout", "master_timeout", "context", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { masterTimeout: "master_timeout", errorTrace: "error_trace", filterPath: "filter_path" };
    function putScriptApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      if (params.context != null && params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: id");
        return handleError(err, callback);
      }
      let { method, body, id, context, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (id != null && context != null) {
        if (method == null)
          method = "PUT";
        path = "/_scripts/" + encodeURIComponent(id) + "/" + encodeURIComponent(context);
      } else {
        if (method == null)
          method = "PUT";
        path = "/_scripts/" + encodeURIComponent(id);
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = putScriptApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/rank_eval.js
var require_rank_eval = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/rank_eval.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["ignore_unavailable", "allow_no_indices", "expand_wildcards", "search_type", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { ignoreUnavailable: "ignore_unavailable", allowNoIndices: "allow_no_indices", expandWildcards: "expand_wildcards", searchType: "search_type", errorTrace: "error_trace", filterPath: "filter_path" };
    function rankEvalApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_rank_eval";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_rank_eval";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = rankEvalApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/reindex.js
var require_reindex = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/reindex.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["refresh", "timeout", "wait_for_active_shards", "wait_for_completion", "requests_per_second", "scroll", "slices", "max_docs", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { waitForActiveShards: "wait_for_active_shards", waitForCompletion: "wait_for_completion", requestsPerSecond: "requests_per_second", maxDocs: "max_docs", errorTrace: "error_trace", filterPath: "filter_path" };
    function reindexApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_reindex";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = reindexApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/reindex_rethrottle.js
var require_reindex_rethrottle = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/reindex_rethrottle.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["requests_per_second", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { requestsPerSecond: "requests_per_second", errorTrace: "error_trace", filterPath: "filter_path" };
    function reindexRethrottleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.task_id == null && params.taskId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: task_id or taskId");
        return handleError(err, callback);
      }
      if (params.requests_per_second == null && params.requestsPerSecond == null) {
        const err = new this[kConfigurationError]("Missing required parameter: requests_per_second or requestsPerSecond");
        return handleError(err, callback);
      }
      let { method, body, taskId, task_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_reindex/" + encodeURIComponent(task_id || taskId) + "/_rethrottle";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = reindexRethrottleApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/render_search_template.js
var require_render_search_template = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/render_search_template.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function renderSearchTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (id != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_render/template/" + encodeURIComponent(id);
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_render/template";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = renderSearchTemplateApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/rollup.js
var require_rollup = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/rollup.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path", "typed_keys", "rest_total_hits_as_int", "wait_for_completion", "timeout"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path", typedKeys: "typed_keys", restTotalHitsAsInt: "rest_total_hits_as_int", waitForCompletion: "wait_for_completion" };
    function RollupApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    RollupApi.prototype.deleteJob = function rollupDeleteJobApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_rollup/job/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    RollupApi.prototype.getJobs = function rollupGetJobsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (id != null) {
        if (method == null)
          method = "GET";
        path = "/_rollup/job/" + encodeURIComponent(id);
      } else {
        if (method == null)
          method = "GET";
        path = "/_rollup/job";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    RollupApi.prototype.getRollupCaps = function rollupGetRollupCapsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (id != null) {
        if (method == null)
          method = "GET";
        path = "/_rollup/data/" + encodeURIComponent(id);
      } else {
        if (method == null)
          method = "GET";
        path = "/_rollup/data";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    RollupApi.prototype.getRollupIndexCaps = function rollupGetRollupIndexCapsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/" + encodeURIComponent(index) + "/_rollup/data";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    RollupApi.prototype.putJob = function rollupPutJobApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_rollup/job/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    RollupApi.prototype.rollup = function rollupRollupApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.rollup_index == null && params.rollupIndex == null) {
        const err = new this[kConfigurationError]("Missing required parameter: rollup_index or rollupIndex");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      if ((params.rollup_index != null || params.rollupIndex != null) && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, rollupIndex, rollup_index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/" + encodeURIComponent(index) + "/_rollup/" + encodeURIComponent(rollup_index || rollupIndex);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    RollupApi.prototype.rollupSearch = function rollupRollupSearchApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_rollup_search";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_rollup_search";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    RollupApi.prototype.startJob = function rollupStartJobApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_rollup/job/" + encodeURIComponent(id) + "/_start";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    RollupApi.prototype.stopJob = function rollupStopJobApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_rollup/job/" + encodeURIComponent(id) + "/_stop";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(RollupApi.prototype, {
      delete_job: { get() {
        return this.deleteJob;
      } },
      get_jobs: { get() {
        return this.getJobs;
      } },
      get_rollup_caps: { get() {
        return this.getRollupCaps;
      } },
      get_rollup_index_caps: { get() {
        return this.getRollupIndexCaps;
      } },
      put_job: { get() {
        return this.putJob;
      } },
      rollup_search: { get() {
        return this.rollupSearch;
      } },
      start_job: { get() {
        return this.startJob;
      } },
      stop_job: { get() {
        return this.stopJob;
      } }
    });
    module.exports = RollupApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/scripts_painless_execute.js
var require_scripts_painless_execute = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/scripts_painless_execute.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function scriptsPainlessExecuteApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/_scripts/painless/_execute";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = scriptsPainlessExecuteApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/scroll.js
var require_scroll = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/scroll.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["scroll", "scroll_id", "rest_total_hits_as_int", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { scrollId: "scroll_id", restTotalHitsAsInt: "rest_total_hits_as_int", errorTrace: "error_trace", filterPath: "filter_path" };
    function scrollApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, scrollId, scroll_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((scroll_id || scrollId) != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_search/scroll/" + encodeURIComponent(scroll_id || scrollId);
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_search/scroll";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = scrollApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/search.js
var require_search = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/search.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["analyzer", "analyze_wildcard", "ccs_minimize_roundtrips", "default_operator", "df", "explain", "stored_fields", "docvalue_fields", "from", "ignore_unavailable", "ignore_throttled", "allow_no_indices", "expand_wildcards", "lenient", "preference", "q", "routing", "scroll", "search_type", "size", "sort", "_source", "_source_excludes", "_source_exclude", "_source_includes", "_source_include", "terminate_after", "stats", "suggest_field", "suggest_mode", "suggest_size", "suggest_text", "timeout", "track_scores", "track_total_hits", "allow_partial_search_results", "typed_keys", "version", "seq_no_primary_term", "request_cache", "batched_reduce_size", "max_concurrent_shard_requests", "pre_filter_shard_size", "rest_total_hits_as_int", "min_compatible_shard_node", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { analyzeWildcard: "analyze_wildcard", ccsMinimizeRoundtrips: "ccs_minimize_roundtrips", defaultOperator: "default_operator", storedFields: "stored_fields", docvalueFields: "docvalue_fields", ignoreUnavailable: "ignore_unavailable", ignoreThrottled: "ignore_throttled", allowNoIndices: "allow_no_indices", expandWildcards: "expand_wildcards", searchType: "search_type", _sourceExcludes: "_source_excludes", _sourceExclude: "_source_exclude", _sourceIncludes: "_source_includes", _sourceInclude: "_source_include", terminateAfter: "terminate_after", suggestField: "suggest_field", suggestMode: "suggest_mode", suggestSize: "suggest_size", suggestText: "suggest_text", trackScores: "track_scores", trackTotalHits: "track_total_hits", allowPartialSearchResults: "allow_partial_search_results", typedKeys: "typed_keys", seqNoPrimaryTerm: "seq_no_primary_term", requestCache: "request_cache", batchedReduceSize: "batched_reduce_size", maxConcurrentShardRequests: "max_concurrent_shard_requests", preFilterShardSize: "pre_filter_shard_size", restTotalHitsAsInt: "rest_total_hits_as_int", minCompatibleShardNode: "min_compatible_shard_node", errorTrace: "error_trace", filterPath: "filter_path" };
    function searchApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_search";
      } else if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_search";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_search";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = searchApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/search_mvt.js
var require_search_mvt = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/search_mvt.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["exact_bounds", "extent", "grid_precision", "grid_type", "size", "track_total_hits", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { exactBounds: "exact_bounds", gridPrecision: "grid_precision", gridType: "grid_type", trackTotalHits: "track_total_hits", errorTrace: "error_trace", filterPath: "filter_path" };
    function searchMvtApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.field == null) {
        const err = new this[kConfigurationError]("Missing required parameter: field");
        return handleError(err, callback);
      }
      if (params.zoom == null) {
        const err = new this[kConfigurationError]("Missing required parameter: zoom");
        return handleError(err, callback);
      }
      if (params.x == null) {
        const err = new this[kConfigurationError]("Missing required parameter: x");
        return handleError(err, callback);
      }
      if (params.y == null) {
        const err = new this[kConfigurationError]("Missing required parameter: y");
        return handleError(err, callback);
      }
      if (params.y != null && (params.x == null || params.zoom == null || params.field == null || params.index == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: x, zoom, field, index");
        return handleError(err, callback);
      } else if (params.x != null && (params.zoom == null || params.field == null || params.index == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: zoom, field, index");
        return handleError(err, callback);
      } else if (params.zoom != null && (params.field == null || params.index == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: field, index");
        return handleError(err, callback);
      } else if (params.field != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, field, zoom, x, y, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/" + encodeURIComponent(index) + "/_mvt/" + encodeURIComponent(field) + "/" + encodeURIComponent(zoom) + "/" + encodeURIComponent(x) + "/" + encodeURIComponent(y);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = searchMvtApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/search_shards.js
var require_search_shards = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/search_shards.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["preference", "routing", "local", "ignore_unavailable", "allow_no_indices", "expand_wildcards", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { ignoreUnavailable: "ignore_unavailable", allowNoIndices: "allow_no_indices", expandWildcards: "expand_wildcards", errorTrace: "error_trace", filterPath: "filter_path" };
    function searchShardsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_search_shards";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_search_shards";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = searchShardsApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/search_template.js
var require_search_template = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/search_template.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["ignore_unavailable", "ignore_throttled", "allow_no_indices", "expand_wildcards", "preference", "routing", "scroll", "search_type", "explain", "profile", "typed_keys", "rest_total_hits_as_int", "ccs_minimize_roundtrips", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { ignoreUnavailable: "ignore_unavailable", ignoreThrottled: "ignore_throttled", allowNoIndices: "allow_no_indices", expandWildcards: "expand_wildcards", searchType: "search_type", typedKeys: "typed_keys", restTotalHitsAsInt: "rest_total_hits_as_int", ccsMinimizeRoundtrips: "ccs_minimize_roundtrips", errorTrace: "error_trace", filterPath: "filter_path" };
    function searchTemplateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_search/template";
      } else if (index != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_search/template";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_search/template";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = searchTemplateApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/searchable_snapshots.js
var require_searchable_snapshots = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/searchable_snapshots.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path", "ignore_unavailable", "allow_no_indices", "expand_wildcards", "index", "master_timeout", "wait_for_completion", "storage", "level"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path", ignoreUnavailable: "ignore_unavailable", allowNoIndices: "allow_no_indices", expandWildcards: "expand_wildcards", masterTimeout: "master_timeout", waitForCompletion: "wait_for_completion" };
    function SearchableSnapshotsApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    SearchableSnapshotsApi.prototype.cacheStats = function searchableSnapshotsCacheStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, nodeId, node_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((node_id || nodeId) != null) {
        if (method == null)
          method = "GET";
        path = "/_searchable_snapshots/" + encodeURIComponent(node_id || nodeId) + "/cache/stats";
      } else {
        if (method == null)
          method = "GET";
        path = "/_searchable_snapshots/cache/stats";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SearchableSnapshotsApi.prototype.clearCache = function searchableSnapshotsClearCacheApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/_searchable_snapshots/cache/clear";
      } else {
        if (method == null)
          method = "POST";
        path = "/_searchable_snapshots/cache/clear";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SearchableSnapshotsApi.prototype.mount = function searchableSnapshotsMountApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter: repository");
        return handleError(err, callback);
      }
      if (params.snapshot == null) {
        const err = new this[kConfigurationError]("Missing required parameter: snapshot");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      if (params.snapshot != null && params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: repository");
        return handleError(err, callback);
      }
      let { method, body, repository, snapshot, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_snapshot/" + encodeURIComponent(repository) + "/" + encodeURIComponent(snapshot) + "/_mount";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SearchableSnapshotsApi.prototype.repositoryStats = function searchableSnapshotsRepositoryStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter: repository");
        return handleError(err, callback);
      }
      let { method, body, repository, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_snapshot/" + encodeURIComponent(repository) + "/_stats";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SearchableSnapshotsApi.prototype.stats = function searchableSnapshotsStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null) {
        if (method == null)
          method = "GET";
        path = "/" + encodeURIComponent(index) + "/_searchable_snapshots/stats";
      } else {
        if (method == null)
          method = "GET";
        path = "/_searchable_snapshots/stats";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(SearchableSnapshotsApi.prototype, {
      cache_stats: { get() {
        return this.cacheStats;
      } },
      clear_cache: { get() {
        return this.clearCache;
      } },
      repository_stats: { get() {
        return this.repositoryStats;
      } }
    });
    module.exports = SearchableSnapshotsApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/security.js
var require_security = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/security.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path", "refresh", "usernames", "id", "name", "username", "realm_name", "owner"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path", realmName: "realm_name" };
    function SecurityApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    SecurityApi.prototype.authenticate = function securityAuthenticateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_security/_authenticate";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.changePassword = function securityChangePasswordApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, username, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (username != null) {
        if (method == null)
          method = "PUT";
        path = "/_security/user/" + encodeURIComponent(username) + "/_password";
      } else {
        if (method == null)
          method = "PUT";
        path = "/_security/user/_password";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.clearApiKeyCache = function securityClearApiKeyCacheApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.ids == null) {
        const err = new this[kConfigurationError]("Missing required parameter: ids");
        return handleError(err, callback);
      }
      let { method, body, ids, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_security/api_key/" + encodeURIComponent(ids) + "/_clear_cache";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.clearCachedPrivileges = function securityClearCachedPrivilegesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.application == null) {
        const err = new this[kConfigurationError]("Missing required parameter: application");
        return handleError(err, callback);
      }
      let { method, body, application, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_security/privilege/" + encodeURIComponent(application) + "/_clear_cache";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.clearCachedRealms = function securityClearCachedRealmsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.realms == null) {
        const err = new this[kConfigurationError]("Missing required parameter: realms");
        return handleError(err, callback);
      }
      let { method, body, realms, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_security/realm/" + encodeURIComponent(realms) + "/_clear_cache";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.clearCachedRoles = function securityClearCachedRolesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_security/role/" + encodeURIComponent(name) + "/_clear_cache";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.clearCachedServiceTokens = function securityClearCachedServiceTokensApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.namespace == null) {
        const err = new this[kConfigurationError]("Missing required parameter: namespace");
        return handleError(err, callback);
      }
      if (params.service == null) {
        const err = new this[kConfigurationError]("Missing required parameter: service");
        return handleError(err, callback);
      }
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      if (params.name != null && (params.service == null || params.namespace == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: service, namespace");
        return handleError(err, callback);
      } else if (params.service != null && params.namespace == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: namespace");
        return handleError(err, callback);
      }
      let { method, body, namespace, service, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_security/service/" + encodeURIComponent(namespace) + "/" + encodeURIComponent(service) + "/credential/token/" + encodeURIComponent(name) + "/_clear_cache";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.createApiKey = function securityCreateApiKeyApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_security/api_key";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.createServiceToken = function securityCreateServiceTokenApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.namespace == null) {
        const err = new this[kConfigurationError]("Missing required parameter: namespace");
        return handleError(err, callback);
      }
      if (params.service == null) {
        const err = new this[kConfigurationError]("Missing required parameter: service");
        return handleError(err, callback);
      }
      if (params.name != null && (params.service == null || params.namespace == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: service, namespace");
        return handleError(err, callback);
      } else if (params.service != null && params.namespace == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: namespace");
        return handleError(err, callback);
      }
      let { method, body, namespace, service, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (namespace != null && service != null && name != null) {
        if (method == null)
          method = "PUT";
        path = "/_security/service/" + encodeURIComponent(namespace) + "/" + encodeURIComponent(service) + "/credential/token/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "POST";
        path = "/_security/service/" + encodeURIComponent(namespace) + "/" + encodeURIComponent(service) + "/credential/token";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.deletePrivileges = function securityDeletePrivilegesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.application == null) {
        const err = new this[kConfigurationError]("Missing required parameter: application");
        return handleError(err, callback);
      }
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      if (params.name != null && params.application == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: application");
        return handleError(err, callback);
      }
      let { method, body, application, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_security/privilege/" + encodeURIComponent(application) + "/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.deleteRole = function securityDeleteRoleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_security/role/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.deleteRoleMapping = function securityDeleteRoleMappingApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_security/role_mapping/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.deleteServiceToken = function securityDeleteServiceTokenApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.namespace == null) {
        const err = new this[kConfigurationError]("Missing required parameter: namespace");
        return handleError(err, callback);
      }
      if (params.service == null) {
        const err = new this[kConfigurationError]("Missing required parameter: service");
        return handleError(err, callback);
      }
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      if (params.name != null && (params.service == null || params.namespace == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: service, namespace");
        return handleError(err, callback);
      } else if (params.service != null && params.namespace == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: namespace");
        return handleError(err, callback);
      }
      let { method, body, namespace, service, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_security/service/" + encodeURIComponent(namespace) + "/" + encodeURIComponent(service) + "/credential/token/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.deleteUser = function securityDeleteUserApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.username == null) {
        const err = new this[kConfigurationError]("Missing required parameter: username");
        return handleError(err, callback);
      }
      let { method, body, username, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_security/user/" + encodeURIComponent(username);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.disableUser = function securityDisableUserApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.username == null) {
        const err = new this[kConfigurationError]("Missing required parameter: username");
        return handleError(err, callback);
      }
      let { method, body, username, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_security/user/" + encodeURIComponent(username) + "/_disable";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.enableUser = function securityEnableUserApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.username == null) {
        const err = new this[kConfigurationError]("Missing required parameter: username");
        return handleError(err, callback);
      }
      let { method, body, username, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_security/user/" + encodeURIComponent(username) + "/_enable";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.getApiKey = function securityGetApiKeyApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_security/api_key";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.getBuiltinPrivileges = function securityGetBuiltinPrivilegesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_security/privilege/_builtin";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.getPrivileges = function securityGetPrivilegesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name != null && params.application == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: application");
        return handleError(err, callback);
      }
      let { method, body, application, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (application != null && name != null) {
        if (method == null)
          method = "GET";
        path = "/_security/privilege/" + encodeURIComponent(application) + "/" + encodeURIComponent(name);
      } else if (application != null) {
        if (method == null)
          method = "GET";
        path = "/_security/privilege/" + encodeURIComponent(application);
      } else {
        if (method == null)
          method = "GET";
        path = "/_security/privilege";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.getRole = function securityGetRoleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (name != null) {
        if (method == null)
          method = "GET";
        path = "/_security/role/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "GET";
        path = "/_security/role";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.getRoleMapping = function securityGetRoleMappingApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (name != null) {
        if (method == null)
          method = "GET";
        path = "/_security/role_mapping/" + encodeURIComponent(name);
      } else {
        if (method == null)
          method = "GET";
        path = "/_security/role_mapping";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.getServiceAccounts = function securityGetServiceAccountsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.service != null && params.namespace == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: namespace");
        return handleError(err, callback);
      }
      let { method, body, namespace, service, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (namespace != null && service != null) {
        if (method == null)
          method = "GET";
        path = "/_security/service/" + encodeURIComponent(namespace) + "/" + encodeURIComponent(service);
      } else if (namespace != null) {
        if (method == null)
          method = "GET";
        path = "/_security/service/" + encodeURIComponent(namespace);
      } else {
        if (method == null)
          method = "GET";
        path = "/_security/service";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.getServiceCredentials = function securityGetServiceCredentialsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.namespace == null) {
        const err = new this[kConfigurationError]("Missing required parameter: namespace");
        return handleError(err, callback);
      }
      if (params.service == null) {
        const err = new this[kConfigurationError]("Missing required parameter: service");
        return handleError(err, callback);
      }
      if (params.service != null && params.namespace == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: namespace");
        return handleError(err, callback);
      }
      let { method, body, namespace, service, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_security/service/" + encodeURIComponent(namespace) + "/" + encodeURIComponent(service) + "/credential";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.getToken = function securityGetTokenApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_security/oauth2/token";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.getUser = function securityGetUserApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, username, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (username != null) {
        if (method == null)
          method = "GET";
        path = "/_security/user/" + encodeURIComponent(username);
      } else {
        if (method == null)
          method = "GET";
        path = "/_security/user";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.getUserPrivileges = function securityGetUserPrivilegesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_security/user/_privileges";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.grantApiKey = function securityGrantApiKeyApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_security/api_key/grant";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.hasPrivileges = function securityHasPrivilegesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, user, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (user != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_security/user/" + encodeURIComponent(user) + "/_has_privileges";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_security/user/_has_privileges";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.invalidateApiKey = function securityInvalidateApiKeyApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_security/api_key";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.invalidateToken = function securityInvalidateTokenApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_security/oauth2/token";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.putPrivileges = function securityPutPrivilegesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_security/privilege";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.putRole = function securityPutRoleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_security/role/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.putRoleMapping = function securityPutRoleMappingApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.name == null) {
        const err = new this[kConfigurationError]("Missing required parameter: name");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_security/role_mapping/" + encodeURIComponent(name);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.putUser = function securityPutUserApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.username == null) {
        const err = new this[kConfigurationError]("Missing required parameter: username");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, username, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_security/user/" + encodeURIComponent(username);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.queryApiKeys = function securityQueryApiKeysApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/_security/_query/api_key";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.samlAuthenticate = function securitySamlAuthenticateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_security/saml/authenticate";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.samlCompleteLogout = function securitySamlCompleteLogoutApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_security/saml/complete_logout";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.samlInvalidate = function securitySamlInvalidateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_security/saml/invalidate";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.samlLogout = function securitySamlLogoutApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_security/saml/logout";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.samlPrepareAuthentication = function securitySamlPrepareAuthenticationApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_security/saml/prepare";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SecurityApi.prototype.samlServiceProviderMetadata = function securitySamlServiceProviderMetadataApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.realm_name == null && params.realmName == null) {
        const err = new this[kConfigurationError]("Missing required parameter: realm_name or realmName");
        return handleError(err, callback);
      }
      let { method, body, realmName, realm_name, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_security/saml/metadata/" + encodeURIComponent(realm_name || realmName);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(SecurityApi.prototype, {
      change_password: { get() {
        return this.changePassword;
      } },
      clear_api_key_cache: { get() {
        return this.clearApiKeyCache;
      } },
      clear_cached_privileges: { get() {
        return this.clearCachedPrivileges;
      } },
      clear_cached_realms: { get() {
        return this.clearCachedRealms;
      } },
      clear_cached_roles: { get() {
        return this.clearCachedRoles;
      } },
      clear_cached_service_tokens: { get() {
        return this.clearCachedServiceTokens;
      } },
      create_api_key: { get() {
        return this.createApiKey;
      } },
      create_service_token: { get() {
        return this.createServiceToken;
      } },
      delete_privileges: { get() {
        return this.deletePrivileges;
      } },
      delete_role: { get() {
        return this.deleteRole;
      } },
      delete_role_mapping: { get() {
        return this.deleteRoleMapping;
      } },
      delete_service_token: { get() {
        return this.deleteServiceToken;
      } },
      delete_user: { get() {
        return this.deleteUser;
      } },
      disable_user: { get() {
        return this.disableUser;
      } },
      enable_user: { get() {
        return this.enableUser;
      } },
      get_api_key: { get() {
        return this.getApiKey;
      } },
      get_builtin_privileges: { get() {
        return this.getBuiltinPrivileges;
      } },
      get_privileges: { get() {
        return this.getPrivileges;
      } },
      get_role: { get() {
        return this.getRole;
      } },
      get_role_mapping: { get() {
        return this.getRoleMapping;
      } },
      get_service_accounts: { get() {
        return this.getServiceAccounts;
      } },
      get_service_credentials: { get() {
        return this.getServiceCredentials;
      } },
      get_token: { get() {
        return this.getToken;
      } },
      get_user: { get() {
        return this.getUser;
      } },
      get_user_privileges: { get() {
        return this.getUserPrivileges;
      } },
      grant_api_key: { get() {
        return this.grantApiKey;
      } },
      has_privileges: { get() {
        return this.hasPrivileges;
      } },
      invalidate_api_key: { get() {
        return this.invalidateApiKey;
      } },
      invalidate_token: { get() {
        return this.invalidateToken;
      } },
      put_privileges: { get() {
        return this.putPrivileges;
      } },
      put_role: { get() {
        return this.putRole;
      } },
      put_role_mapping: { get() {
        return this.putRoleMapping;
      } },
      put_user: { get() {
        return this.putUser;
      } },
      query_api_keys: { get() {
        return this.queryApiKeys;
      } },
      saml_authenticate: { get() {
        return this.samlAuthenticate;
      } },
      saml_complete_logout: { get() {
        return this.samlCompleteLogout;
      } },
      saml_invalidate: { get() {
        return this.samlInvalidate;
      } },
      saml_logout: { get() {
        return this.samlLogout;
      } },
      saml_prepare_authentication: { get() {
        return this.samlPrepareAuthentication;
      } },
      saml_service_provider_metadata: { get() {
        return this.samlServiceProviderMetadata;
      } }
    });
    module.exports = SecurityApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/shutdown.js
var require_shutdown = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/shutdown.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function ShutdownApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    ShutdownApi.prototype.deleteNode = function shutdownDeleteNodeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.node_id == null && params.nodeId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: node_id or nodeId");
        return handleError(err, callback);
      }
      let { method, body, nodeId, node_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/shutdown";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ShutdownApi.prototype.getNode = function shutdownGetNodeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, nodeId, node_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((node_id || nodeId) != null) {
        if (method == null)
          method = "GET";
        path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/shutdown";
      } else {
        if (method == null)
          method = "GET";
        path = "/_nodes/shutdown";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    ShutdownApi.prototype.putNode = function shutdownPutNodeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.node_id == null && params.nodeId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: node_id or nodeId");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, nodeId, node_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_nodes/" + encodeURIComponent(node_id || nodeId) + "/shutdown";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(ShutdownApi.prototype, {
      delete_node: { get() {
        return this.deleteNode;
      } },
      get_node: { get() {
        return this.getNode;
      } },
      put_node: { get() {
        return this.putNode;
      } }
    });
    module.exports = ShutdownApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/slm.js
var require_slm = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/slm.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function SlmApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    SlmApi.prototype.deleteLifecycle = function slmDeleteLifecycleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.policy_id == null && params.policyId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: policy_id or policyId");
        return handleError(err, callback);
      }
      let { method, body, policyId, policy_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_slm/policy/" + encodeURIComponent(policy_id || policyId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SlmApi.prototype.executeLifecycle = function slmExecuteLifecycleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.policy_id == null && params.policyId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: policy_id or policyId");
        return handleError(err, callback);
      }
      let { method, body, policyId, policy_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_slm/policy/" + encodeURIComponent(policy_id || policyId) + "/_execute";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SlmApi.prototype.executeRetention = function slmExecuteRetentionApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_slm/_execute_retention";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SlmApi.prototype.getLifecycle = function slmGetLifecycleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, policyId, policy_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((policy_id || policyId) != null) {
        if (method == null)
          method = "GET";
        path = "/_slm/policy/" + encodeURIComponent(policy_id || policyId);
      } else {
        if (method == null)
          method = "GET";
        path = "/_slm/policy";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SlmApi.prototype.getStats = function slmGetStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_slm/stats";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SlmApi.prototype.getStatus = function slmGetStatusApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_slm/status";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SlmApi.prototype.putLifecycle = function slmPutLifecycleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.policy_id == null && params.policyId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: policy_id or policyId");
        return handleError(err, callback);
      }
      let { method, body, policyId, policy_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_slm/policy/" + encodeURIComponent(policy_id || policyId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SlmApi.prototype.start = function slmStartApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_slm/start";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SlmApi.prototype.stop = function slmStopApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_slm/stop";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(SlmApi.prototype, {
      delete_lifecycle: { get() {
        return this.deleteLifecycle;
      } },
      execute_lifecycle: { get() {
        return this.executeLifecycle;
      } },
      execute_retention: { get() {
        return this.executeRetention;
      } },
      get_lifecycle: { get() {
        return this.getLifecycle;
      } },
      get_stats: { get() {
        return this.getStats;
      } },
      get_status: { get() {
        return this.getStatus;
      } },
      put_lifecycle: { get() {
        return this.putLifecycle;
      } }
    });
    module.exports = SlmApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/snapshot.js
var require_snapshot = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/snapshot.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["master_timeout", "timeout", "pretty", "human", "error_trace", "source", "filter_path", "wait_for_completion", "verify", "ignore_unavailable", "index_details", "include_repository", "sort", "size", "order", "from_sort_value", "after", "offset", "slm_policy_filter", "verbose", "local", "blob_count", "concurrency", "read_node_count", "early_read_node_count", "seed", "rare_action_probability", "max_blob_size", "max_total_data_size", "detailed", "rarely_abort_writes"];
    var snakeCase = { masterTimeout: "master_timeout", errorTrace: "error_trace", filterPath: "filter_path", waitForCompletion: "wait_for_completion", ignoreUnavailable: "ignore_unavailable", indexDetails: "index_details", includeRepository: "include_repository", fromSortValue: "from_sort_value", slmPolicyFilter: "slm_policy_filter", blobCount: "blob_count", readNodeCount: "read_node_count", earlyReadNodeCount: "early_read_node_count", rareActionProbability: "rare_action_probability", maxBlobSize: "max_blob_size", maxTotalDataSize: "max_total_data_size", rarelyAbortWrites: "rarely_abort_writes" };
    function SnapshotApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    SnapshotApi.prototype.cleanupRepository = function snapshotCleanupRepositoryApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter: repository");
        return handleError(err, callback);
      }
      let { method, body, repository, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_snapshot/" + encodeURIComponent(repository) + "/_cleanup";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SnapshotApi.prototype.clone = function snapshotCloneApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter: repository");
        return handleError(err, callback);
      }
      if (params.snapshot == null) {
        const err = new this[kConfigurationError]("Missing required parameter: snapshot");
        return handleError(err, callback);
      }
      if (params.target_snapshot == null && params.targetSnapshot == null) {
        const err = new this[kConfigurationError]("Missing required parameter: target_snapshot or targetSnapshot");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      if ((params.target_snapshot != null || params.targetSnapshot != null) && (params.snapshot == null || params.repository == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: snapshot, repository");
        return handleError(err, callback);
      } else if (params.snapshot != null && params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: repository");
        return handleError(err, callback);
      }
      let { method, body, repository, snapshot, targetSnapshot, target_snapshot, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_snapshot/" + encodeURIComponent(repository) + "/" + encodeURIComponent(snapshot) + "/_clone/" + encodeURIComponent(target_snapshot || targetSnapshot);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SnapshotApi.prototype.create = function snapshotCreateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter: repository");
        return handleError(err, callback);
      }
      if (params.snapshot == null) {
        const err = new this[kConfigurationError]("Missing required parameter: snapshot");
        return handleError(err, callback);
      }
      if (params.snapshot != null && params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: repository");
        return handleError(err, callback);
      }
      let { method, body, repository, snapshot, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_snapshot/" + encodeURIComponent(repository) + "/" + encodeURIComponent(snapshot);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SnapshotApi.prototype.createRepository = function snapshotCreateRepositoryApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter: repository");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, repository, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_snapshot/" + encodeURIComponent(repository);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SnapshotApi.prototype.delete = function snapshotDeleteApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter: repository");
        return handleError(err, callback);
      }
      if (params.snapshot == null) {
        const err = new this[kConfigurationError]("Missing required parameter: snapshot");
        return handleError(err, callback);
      }
      if (params.snapshot != null && params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: repository");
        return handleError(err, callback);
      }
      let { method, body, repository, snapshot, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_snapshot/" + encodeURIComponent(repository) + "/" + encodeURIComponent(snapshot);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SnapshotApi.prototype.deleteRepository = function snapshotDeleteRepositoryApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter: repository");
        return handleError(err, callback);
      }
      let { method, body, repository, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_snapshot/" + encodeURIComponent(repository);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SnapshotApi.prototype.get = function snapshotGetApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter: repository");
        return handleError(err, callback);
      }
      if (params.snapshot == null) {
        const err = new this[kConfigurationError]("Missing required parameter: snapshot");
        return handleError(err, callback);
      }
      if (params.snapshot != null && params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: repository");
        return handleError(err, callback);
      }
      let { method, body, repository, snapshot, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_snapshot/" + encodeURIComponent(repository) + "/" + encodeURIComponent(snapshot);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SnapshotApi.prototype.getRepository = function snapshotGetRepositoryApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, repository, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (repository != null) {
        if (method == null)
          method = "GET";
        path = "/_snapshot/" + encodeURIComponent(repository);
      } else {
        if (method == null)
          method = "GET";
        path = "/_snapshot";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SnapshotApi.prototype.repositoryAnalyze = function snapshotRepositoryAnalyzeApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter: repository");
        return handleError(err, callback);
      }
      let { method, body, repository, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_snapshot/" + encodeURIComponent(repository) + "/_analyze";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SnapshotApi.prototype.restore = function snapshotRestoreApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter: repository");
        return handleError(err, callback);
      }
      if (params.snapshot == null) {
        const err = new this[kConfigurationError]("Missing required parameter: snapshot");
        return handleError(err, callback);
      }
      if (params.snapshot != null && params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: repository");
        return handleError(err, callback);
      }
      let { method, body, repository, snapshot, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_snapshot/" + encodeURIComponent(repository) + "/" + encodeURIComponent(snapshot) + "/_restore";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SnapshotApi.prototype.status = function snapshotStatusApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.snapshot != null && params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: repository");
        return handleError(err, callback);
      }
      let { method, body, repository, snapshot, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (repository != null && snapshot != null) {
        if (method == null)
          method = "GET";
        path = "/_snapshot/" + encodeURIComponent(repository) + "/" + encodeURIComponent(snapshot) + "/_status";
      } else if (repository != null) {
        if (method == null)
          method = "GET";
        path = "/_snapshot/" + encodeURIComponent(repository) + "/_status";
      } else {
        if (method == null)
          method = "GET";
        path = "/_snapshot/_status";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SnapshotApi.prototype.verifyRepository = function snapshotVerifyRepositoryApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.repository == null) {
        const err = new this[kConfigurationError]("Missing required parameter: repository");
        return handleError(err, callback);
      }
      let { method, body, repository, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_snapshot/" + encodeURIComponent(repository) + "/_verify";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(SnapshotApi.prototype, {
      cleanup_repository: { get() {
        return this.cleanupRepository;
      } },
      create_repository: { get() {
        return this.createRepository;
      } },
      delete_repository: { get() {
        return this.deleteRepository;
      } },
      get_repository: { get() {
        return this.getRepository;
      } },
      repository_analyze: { get() {
        return this.repositoryAnalyze;
      } },
      verify_repository: { get() {
        return this.verifyRepository;
      } }
    });
    module.exports = SnapshotApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/sql.js
var require_sql = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/sql.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path", "delimiter", "format", "keep_alive", "wait_for_completion_timeout"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path", keepAlive: "keep_alive", waitForCompletionTimeout: "wait_for_completion_timeout" };
    function SqlApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    SqlApi.prototype.clearCursor = function sqlClearCursorApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_sql/close";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SqlApi.prototype.deleteAsync = function sqlDeleteAsyncApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_sql/async/delete/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SqlApi.prototype.getAsync = function sqlGetAsyncApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_sql/async/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SqlApi.prototype.getAsyncStatus = function sqlGetAsyncStatusApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_sql/async/status/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SqlApi.prototype.query = function sqlQueryApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/_sql";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    SqlApi.prototype.translate = function sqlTranslateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/_sql/translate";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(SqlApi.prototype, {
      clear_cursor: { get() {
        return this.clearCursor;
      } },
      delete_async: { get() {
        return this.deleteAsync;
      } },
      get_async: { get() {
        return this.getAsync;
      } },
      get_async_status: { get() {
        return this.getAsyncStatus;
      } }
    });
    module.exports = SqlApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/ssl.js
var require_ssl = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/ssl.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function SslApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    SslApi.prototype.certificates = function sslCertificatesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_ssl/certificates";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    module.exports = SslApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/tasks.js
var require_tasks = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/tasks.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["nodes", "actions", "parent_task_id", "wait_for_completion", "pretty", "human", "error_trace", "source", "filter_path", "timeout", "detailed", "group_by"];
    var snakeCase = { parentTaskId: "parent_task_id", waitForCompletion: "wait_for_completion", errorTrace: "error_trace", filterPath: "filter_path", groupBy: "group_by" };
    function TasksApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    TasksApi.prototype.cancel = function tasksCancelApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, taskId, task_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((task_id || taskId) != null) {
        if (method == null)
          method = "POST";
        path = "/_tasks/" + encodeURIComponent(task_id || taskId) + "/_cancel";
      } else {
        if (method == null)
          method = "POST";
        path = "/_tasks/_cancel";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    TasksApi.prototype.get = function tasksGetApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.task_id == null && params.taskId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: task_id or taskId");
        return handleError(err, callback);
      }
      let { method, body, taskId, task_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_tasks/" + encodeURIComponent(task_id || taskId);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    TasksApi.prototype.list = function tasksListApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_tasks";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    module.exports = TasksApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/terms_enum.js
var require_terms_enum = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/terms_enum.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path" };
    function termsEnumApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/" + encodeURIComponent(index) + "/_terms_enum";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = termsEnumApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/termvectors.js
var require_termvectors = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/termvectors.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["term_statistics", "field_statistics", "fields", "offsets", "positions", "payloads", "preference", "routing", "realtime", "version", "version_type", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { termStatistics: "term_statistics", fieldStatistics: "field_statistics", versionType: "version_type", errorTrace: "error_trace", filterPath: "filter_path" };
    function termvectorsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      let { method, body, index, id, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null && id != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/" + encodeURIComponent(id) + "/_termvectors";
      } else if (index != null && id != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_termvectors/" + encodeURIComponent(id);
      } else if (index != null && type != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_termvectors";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/" + encodeURIComponent(index) + "/_termvectors";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = termvectorsApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/text_structure.js
var require_text_structure = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/text_structure.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["lines_to_sample", "line_merge_size_limit", "timeout", "charset", "format", "has_header_row", "column_names", "delimiter", "quote", "should_trim_fields", "grok_pattern", "timestamp_field", "timestamp_format", "explain", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { linesToSample: "lines_to_sample", lineMergeSizeLimit: "line_merge_size_limit", hasHeaderRow: "has_header_row", columnNames: "column_names", shouldTrimFields: "should_trim_fields", grokPattern: "grok_pattern", timestampField: "timestamp_field", timestampFormat: "timestamp_format", errorTrace: "error_trace", filterPath: "filter_path" };
    function TextStructureApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    TextStructureApi.prototype.findStructure = function textStructureFindStructureApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_text_structure/find_structure";
      const request = {
        method,
        path,
        bulkBody: body,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(TextStructureApi.prototype, {
      find_structure: { get() {
        return this.findStructure;
      } }
    });
    module.exports = TextStructureApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/transform.js
var require_transform = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/transform.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["force", "timeout", "pretty", "human", "error_trace", "source", "filter_path", "from", "size", "allow_no_match", "exclude_generated", "defer_validation", "wait_for_completion", "wait_for_checkpoint", "dry_run"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path", allowNoMatch: "allow_no_match", excludeGenerated: "exclude_generated", deferValidation: "defer_validation", waitForCompletion: "wait_for_completion", waitForCheckpoint: "wait_for_checkpoint", dryRun: "dry_run" };
    function TransformApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    TransformApi.prototype.deleteTransform = function transformDeleteTransformApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.transform_id == null && params.transformId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: transform_id or transformId");
        return handleError(err, callback);
      }
      let { method, body, transformId, transform_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_transform/" + encodeURIComponent(transform_id || transformId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    TransformApi.prototype.getTransform = function transformGetTransformApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, transformId, transform_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((transform_id || transformId) != null) {
        if (method == null)
          method = "GET";
        path = "/_transform/" + encodeURIComponent(transform_id || transformId);
      } else {
        if (method == null)
          method = "GET";
        path = "/_transform";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    TransformApi.prototype.getTransformStats = function transformGetTransformStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.transform_id == null && params.transformId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: transform_id or transformId");
        return handleError(err, callback);
      }
      let { method, body, transformId, transform_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_transform/" + encodeURIComponent(transform_id || transformId) + "/_stats";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    TransformApi.prototype.previewTransform = function transformPreviewTransformApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, transformId, transform_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((transform_id || transformId) != null) {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_transform/" + encodeURIComponent(transform_id || transformId) + "/_preview";
      } else {
        if (method == null)
          method = body == null ? "GET" : "POST";
        path = "/_transform/_preview";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    TransformApi.prototype.putTransform = function transformPutTransformApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.transform_id == null && params.transformId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: transform_id or transformId");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, transformId, transform_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_transform/" + encodeURIComponent(transform_id || transformId);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    TransformApi.prototype.startTransform = function transformStartTransformApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.transform_id == null && params.transformId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: transform_id or transformId");
        return handleError(err, callback);
      }
      let { method, body, transformId, transform_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_transform/" + encodeURIComponent(transform_id || transformId) + "/_start";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    TransformApi.prototype.stopTransform = function transformStopTransformApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.transform_id == null && params.transformId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: transform_id or transformId");
        return handleError(err, callback);
      }
      let { method, body, transformId, transform_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_transform/" + encodeURIComponent(transform_id || transformId) + "/_stop";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    TransformApi.prototype.updateTransform = function transformUpdateTransformApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.transform_id == null && params.transformId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: transform_id or transformId");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, transformId, transform_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_transform/" + encodeURIComponent(transform_id || transformId) + "/_update";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    TransformApi.prototype.upgradeTransforms = function transformUpgradeTransformsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_transform/_upgrade";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(TransformApi.prototype, {
      delete_transform: { get() {
        return this.deleteTransform;
      } },
      get_transform: { get() {
        return this.getTransform;
      } },
      get_transform_stats: { get() {
        return this.getTransformStats;
      } },
      preview_transform: { get() {
        return this.previewTransform;
      } },
      put_transform: { get() {
        return this.putTransform;
      } },
      start_transform: { get() {
        return this.startTransform;
      } },
      stop_transform: { get() {
        return this.stopTransform;
      } },
      update_transform: { get() {
        return this.updateTransform;
      } },
      upgrade_transforms: { get() {
        return this.upgradeTransforms;
      } }
    });
    module.exports = TransformApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/update.js
var require_update = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/update.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["wait_for_active_shards", "_source", "_source_excludes", "_source_exclude", "_source_includes", "_source_include", "lang", "refresh", "retry_on_conflict", "routing", "timeout", "if_seq_no", "if_primary_term", "require_alias", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { waitForActiveShards: "wait_for_active_shards", _sourceExcludes: "_source_excludes", _sourceExclude: "_source_exclude", _sourceIncludes: "_source_includes", _sourceInclude: "_source_include", retryOnConflict: "retry_on_conflict", ifSeqNo: "if_seq_no", ifPrimaryTerm: "if_primary_term", requireAlias: "require_alias", errorTrace: "error_trace", filterPath: "filter_path" };
    function updateApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.body == null) {
        const err = new this[kConfigurationError]("Missing required parameter: body");
        return handleError(err, callback);
      }
      let { method, body, id, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null && id != null) {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/" + encodeURIComponent(id) + "/_update";
      } else {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/_update/" + encodeURIComponent(id);
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = updateApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/update_by_query.js
var require_update_by_query = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/update_by_query.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["analyzer", "analyze_wildcard", "default_operator", "df", "from", "ignore_unavailable", "allow_no_indices", "conflicts", "expand_wildcards", "lenient", "pipeline", "preference", "q", "routing", "scroll", "search_type", "search_timeout", "size", "max_docs", "sort", "terminate_after", "stats", "version", "version_type", "request_cache", "refresh", "timeout", "wait_for_active_shards", "scroll_size", "wait_for_completion", "requests_per_second", "slices", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { analyzeWildcard: "analyze_wildcard", defaultOperator: "default_operator", ignoreUnavailable: "ignore_unavailable", allowNoIndices: "allow_no_indices", expandWildcards: "expand_wildcards", searchType: "search_type", searchTimeout: "search_timeout", maxDocs: "max_docs", terminateAfter: "terminate_after", versionType: "version_type", requestCache: "request_cache", waitForActiveShards: "wait_for_active_shards", scrollSize: "scroll_size", waitForCompletion: "wait_for_completion", requestsPerSecond: "requests_per_second", errorTrace: "error_trace", filterPath: "filter_path" };
    function updateByQueryApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter: index");
        return handleError(err, callback);
      }
      if (params.type != null && params.index == null) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: index");
        return handleError(err, callback);
      }
      let { method, body, index, type, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (index != null && type != null) {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/" + encodeURIComponent(type) + "/_update_by_query";
      } else {
        if (method == null)
          method = "POST";
        path = "/" + encodeURIComponent(index) + "/_update_by_query";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = updateByQueryApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/update_by_query_rethrottle.js
var require_update_by_query_rethrottle = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/update_by_query_rethrottle.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["requests_per_second", "pretty", "human", "error_trace", "source", "filter_path"];
    var snakeCase = { requestsPerSecond: "requests_per_second", errorTrace: "error_trace", filterPath: "filter_path" };
    function updateByQueryRethrottleApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.task_id == null && params.taskId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: task_id or taskId");
        return handleError(err, callback);
      }
      if (params.requests_per_second == null && params.requestsPerSecond == null) {
        const err = new this[kConfigurationError]("Missing required parameter: requests_per_second or requestsPerSecond");
        return handleError(err, callback);
      }
      let { method, body, taskId, task_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_update_by_query/" + encodeURIComponent(task_id || taskId) + "/_rethrottle";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    }
    module.exports = updateByQueryRethrottleApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/watcher.js
var require_watcher = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/watcher.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["pretty", "human", "error_trace", "source", "filter_path", "debug", "active", "version", "if_seq_no", "if_primary_term", "metric", "emit_stacktraces"];
    var snakeCase = { errorTrace: "error_trace", filterPath: "filter_path", ifSeqNo: "if_seq_no", ifPrimaryTerm: "if_primary_term", emitStacktraces: "emit_stacktraces" };
    function WatcherApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    WatcherApi.prototype.ackWatch = function watcherAckWatchApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.watch_id == null && params.watchId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: watch_id or watchId");
        return handleError(err, callback);
      }
      if ((params.action_id != null || params.actionId != null) && (params.watch_id == null && params.watchId == null)) {
        const err = new this[kConfigurationError]("Missing required parameter of the url: watch_id");
        return handleError(err, callback);
      }
      let { method, body, watchId, watch_id, actionId, action_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if ((watch_id || watchId) != null && (action_id || actionId) != null) {
        if (method == null)
          method = "PUT";
        path = "/_watcher/watch/" + encodeURIComponent(watch_id || watchId) + "/_ack/" + encodeURIComponent(action_id || actionId);
      } else {
        if (method == null)
          method = "PUT";
        path = "/_watcher/watch/" + encodeURIComponent(watch_id || watchId) + "/_ack";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    WatcherApi.prototype.activateWatch = function watcherActivateWatchApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.watch_id == null && params.watchId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: watch_id or watchId");
        return handleError(err, callback);
      }
      let { method, body, watchId, watch_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_watcher/watch/" + encodeURIComponent(watch_id || watchId) + "/_activate";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    WatcherApi.prototype.deactivateWatch = function watcherDeactivateWatchApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.watch_id == null && params.watchId == null) {
        const err = new this[kConfigurationError]("Missing required parameter: watch_id or watchId");
        return handleError(err, callback);
      }
      let { method, body, watchId, watch_id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_watcher/watch/" + encodeURIComponent(watch_id || watchId) + "/_deactivate";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    WatcherApi.prototype.deleteWatch = function watcherDeleteWatchApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "DELETE";
      path = "/_watcher/watch/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    WatcherApi.prototype.executeWatch = function watcherExecuteWatchApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (id != null) {
        if (method == null)
          method = "PUT";
        path = "/_watcher/watch/" + encodeURIComponent(id) + "/_execute";
      } else {
        if (method == null)
          method = "PUT";
        path = "/_watcher/watch/_execute";
      }
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    WatcherApi.prototype.getWatch = function watcherGetWatchApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_watcher/watch/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    WatcherApi.prototype.putWatch = function watcherPutWatchApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      if (params.id == null) {
        const err = new this[kConfigurationError]("Missing required parameter: id");
        return handleError(err, callback);
      }
      let { method, body, id, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "PUT";
      path = "/_watcher/watch/" + encodeURIComponent(id);
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    WatcherApi.prototype.queryWatches = function watcherQueryWatchesApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = body == null ? "GET" : "POST";
      path = "/_watcher/_query/watches";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    WatcherApi.prototype.start = function watcherStartApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_watcher/_start";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    WatcherApi.prototype.stats = function watcherStatsApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, metric, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (metric != null) {
        if (method == null)
          method = "GET";
        path = "/_watcher/stats/" + encodeURIComponent(metric);
      } else {
        if (method == null)
          method = "GET";
        path = "/_watcher/stats";
      }
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    WatcherApi.prototype.stop = function watcherStopApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "POST";
      path = "/_watcher/_stop";
      const request = {
        method,
        path,
        body: body || "",
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    Object.defineProperties(WatcherApi.prototype, {
      ack_watch: { get() {
        return this.ackWatch;
      } },
      activate_watch: { get() {
        return this.activateWatch;
      } },
      deactivate_watch: { get() {
        return this.deactivateWatch;
      } },
      delete_watch: { get() {
        return this.deleteWatch;
      } },
      execute_watch: { get() {
        return this.executeWatch;
      } },
      get_watch: { get() {
        return this.getWatch;
      } },
      put_watch: { get() {
        return this.putWatch;
      } },
      query_watches: { get() {
        return this.queryWatches;
      } }
    });
    module.exports = WatcherApi;
  }
});

// node_modules/@elastic/elasticsearch/api/api/xpack.js
var require_xpack = __commonJS({
  "node_modules/@elastic/elasticsearch/api/api/xpack.js"(exports, module) {
    "use strict";
    var { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require_utils();
    var acceptedQuerystring = ["categories", "accept_enterprise", "pretty", "human", "error_trace", "source", "filter_path", "master_timeout"];
    var snakeCase = { acceptEnterprise: "accept_enterprise", errorTrace: "error_trace", filterPath: "filter_path", masterTimeout: "master_timeout" };
    function XpackApi(transport, ConfigurationError) {
      this.transport = transport;
      this[kConfigurationError] = ConfigurationError;
    }
    XpackApi.prototype.info = function xpackInfoApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_xpack";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    XpackApi.prototype.usage = function xpackUsageApi(params, options, callback) {
      ;
      [params, options, callback] = normalizeArguments(params, options, callback);
      let { method, body, ...querystring } = params;
      querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring);
      let path = "";
      if (method == null)
        method = "GET";
      path = "/_xpack/usage";
      const request = {
        method,
        path,
        body: null,
        querystring
      };
      return this.transport.request(request, options, callback);
    };
    module.exports = XpackApi;
  }
});

// node_modules/@elastic/elasticsearch/api/index.js
var require_api2 = __commonJS({
  "node_modules/@elastic/elasticsearch/api/index.js"(exports, module) {
    "use strict";
    var AsyncSearchApi = require_async_search();
    var AutoscalingApi = require_autoscaling();
    var bulkApi = require_bulk();
    var CatApi = require_cat();
    var CcrApi = require_ccr();
    var clearScrollApi = require_clear_scroll();
    var closePointInTimeApi = require_close_point_in_time();
    var ClusterApi = require_cluster();
    var countApi = require_count();
    var createApi = require_create();
    var DanglingIndicesApi = require_dangling_indices();
    var deleteApi = require_delete();
    var deleteByQueryApi = require_delete_by_query();
    var deleteByQueryRethrottleApi = require_delete_by_query_rethrottle();
    var deleteScriptApi = require_delete_script();
    var EnrichApi = require_enrich();
    var EqlApi = require_eql();
    var existsApi = require_exists();
    var existsSourceApi = require_exists_source();
    var explainApi = require_explain();
    var FeaturesApi = require_features();
    var fieldCapsApi = require_field_caps();
    var FleetApi = require_fleet();
    var getApi = require_get();
    var getScriptApi = require_get_script();
    var getScriptContextApi = require_get_script_context();
    var getScriptLanguagesApi = require_get_script_languages();
    var getSourceApi = require_get_source();
    var GraphApi = require_graph();
    var IlmApi = require_ilm();
    var indexApi = require_api();
    var IndicesApi = require_indices();
    var infoApi = require_info();
    var IngestApi = require_ingest();
    var LicenseApi = require_license();
    var LogstashApi = require_logstash();
    var mgetApi = require_mget();
    var MigrationApi = require_migration();
    var MlApi = require_ml();
    var MonitoringApi = require_monitoring();
    var msearchApi = require_msearch();
    var msearchTemplateApi = require_msearch_template();
    var mtermvectorsApi = require_mtermvectors();
    var NodesApi = require_nodes();
    var openPointInTimeApi = require_open_point_in_time();
    var pingApi = require_ping();
    var putScriptApi = require_put_script();
    var rankEvalApi = require_rank_eval();
    var reindexApi = require_reindex();
    var reindexRethrottleApi = require_reindex_rethrottle();
    var renderSearchTemplateApi = require_render_search_template();
    var RollupApi = require_rollup();
    var scriptsPainlessExecuteApi = require_scripts_painless_execute();
    var scrollApi = require_scroll();
    var searchApi = require_search();
    var searchMvtApi = require_search_mvt();
    var searchShardsApi = require_search_shards();
    var searchTemplateApi = require_search_template();
    var SearchableSnapshotsApi = require_searchable_snapshots();
    var SecurityApi = require_security();
    var ShutdownApi = require_shutdown();
    var SlmApi = require_slm();
    var SnapshotApi = require_snapshot();
    var SqlApi = require_sql();
    var SslApi = require_ssl();
    var TasksApi = require_tasks();
    var termsEnumApi = require_terms_enum();
    var termvectorsApi = require_termvectors();
    var TextStructureApi = require_text_structure();
    var TransformApi = require_transform();
    var updateApi = require_update();
    var updateByQueryApi = require_update_by_query();
    var updateByQueryRethrottleApi = require_update_by_query_rethrottle();
    var WatcherApi = require_watcher();
    var XpackApi = require_xpack();
    var { kConfigurationError } = require_utils();
    var kAsyncSearch = Symbol("AsyncSearch");
    var kAutoscaling = Symbol("Autoscaling");
    var kCat = Symbol("Cat");
    var kCcr = Symbol("Ccr");
    var kCluster = Symbol("Cluster");
    var kDanglingIndices = Symbol("DanglingIndices");
    var kEnrich = Symbol("Enrich");
    var kEql = Symbol("Eql");
    var kFeatures = Symbol("Features");
    var kFleet = Symbol("Fleet");
    var kGraph = Symbol("Graph");
    var kIlm = Symbol("Ilm");
    var kIndices = Symbol("Indices");
    var kIngest = Symbol("Ingest");
    var kLicense = Symbol("License");
    var kLogstash = Symbol("Logstash");
    var kMigration = Symbol("Migration");
    var kMl = Symbol("Ml");
    var kMonitoring = Symbol("Monitoring");
    var kNodes = Symbol("Nodes");
    var kRollup = Symbol("Rollup");
    var kSearchableSnapshots = Symbol("SearchableSnapshots");
    var kSecurity = Symbol("Security");
    var kShutdown = Symbol("Shutdown");
    var kSlm = Symbol("Slm");
    var kSnapshot = Symbol("Snapshot");
    var kSql = Symbol("Sql");
    var kSsl = Symbol("Ssl");
    var kTasks = Symbol("Tasks");
    var kTextStructure = Symbol("TextStructure");
    var kTransform = Symbol("Transform");
    var kWatcher = Symbol("Watcher");
    var kXpack = Symbol("Xpack");
    function ESAPI(opts) {
      this[kConfigurationError] = opts.ConfigurationError;
      this[kAsyncSearch] = null;
      this[kAutoscaling] = null;
      this[kCat] = null;
      this[kCcr] = null;
      this[kCluster] = null;
      this[kDanglingIndices] = null;
      this[kEnrich] = null;
      this[kEql] = null;
      this[kFeatures] = null;
      this[kFleet] = null;
      this[kGraph] = null;
      this[kIlm] = null;
      this[kIndices] = null;
      this[kIngest] = null;
      this[kLicense] = null;
      this[kLogstash] = null;
      this[kMigration] = null;
      this[kMl] = null;
      this[kMonitoring] = null;
      this[kNodes] = null;
      this[kRollup] = null;
      this[kSearchableSnapshots] = null;
      this[kSecurity] = null;
      this[kShutdown] = null;
      this[kSlm] = null;
      this[kSnapshot] = null;
      this[kSql] = null;
      this[kSsl] = null;
      this[kTasks] = null;
      this[kTextStructure] = null;
      this[kTransform] = null;
      this[kWatcher] = null;
      this[kXpack] = null;
    }
    ESAPI.prototype.bulk = bulkApi;
    ESAPI.prototype.clearScroll = clearScrollApi;
    ESAPI.prototype.closePointInTime = closePointInTimeApi;
    ESAPI.prototype.count = countApi;
    ESAPI.prototype.create = createApi;
    ESAPI.prototype.delete = deleteApi;
    ESAPI.prototype.deleteByQuery = deleteByQueryApi;
    ESAPI.prototype.deleteByQueryRethrottle = deleteByQueryRethrottleApi;
    ESAPI.prototype.deleteScript = deleteScriptApi;
    ESAPI.prototype.exists = existsApi;
    ESAPI.prototype.existsSource = existsSourceApi;
    ESAPI.prototype.explain = explainApi;
    ESAPI.prototype.fieldCaps = fieldCapsApi;
    ESAPI.prototype.get = getApi;
    ESAPI.prototype.getScript = getScriptApi;
    ESAPI.prototype.getScriptContext = getScriptContextApi;
    ESAPI.prototype.getScriptLanguages = getScriptLanguagesApi;
    ESAPI.prototype.getSource = getSourceApi;
    ESAPI.prototype.index = indexApi;
    ESAPI.prototype.info = infoApi;
    ESAPI.prototype.mget = mgetApi;
    ESAPI.prototype.msearch = msearchApi;
    ESAPI.prototype.msearchTemplate = msearchTemplateApi;
    ESAPI.prototype.mtermvectors = mtermvectorsApi;
    ESAPI.prototype.openPointInTime = openPointInTimeApi;
    ESAPI.prototype.ping = pingApi;
    ESAPI.prototype.putScript = putScriptApi;
    ESAPI.prototype.rankEval = rankEvalApi;
    ESAPI.prototype.reindex = reindexApi;
    ESAPI.prototype.reindexRethrottle = reindexRethrottleApi;
    ESAPI.prototype.renderSearchTemplate = renderSearchTemplateApi;
    ESAPI.prototype.scriptsPainlessExecute = scriptsPainlessExecuteApi;
    ESAPI.prototype.scroll = scrollApi;
    ESAPI.prototype.search = searchApi;
    ESAPI.prototype.searchMvt = searchMvtApi;
    ESAPI.prototype.searchShards = searchShardsApi;
    ESAPI.prototype.searchTemplate = searchTemplateApi;
    ESAPI.prototype.termsEnum = termsEnumApi;
    ESAPI.prototype.termvectors = termvectorsApi;
    ESAPI.prototype.update = updateApi;
    ESAPI.prototype.updateByQuery = updateByQueryApi;
    ESAPI.prototype.updateByQueryRethrottle = updateByQueryRethrottleApi;
    Object.defineProperties(ESAPI.prototype, {
      asyncSearch: {
        get() {
          if (this[kAsyncSearch] === null) {
            this[kAsyncSearch] = new AsyncSearchApi(this.transport, this[kConfigurationError]);
          }
          return this[kAsyncSearch];
        }
      },
      async_search: { get() {
        return this.asyncSearch;
      } },
      autoscaling: {
        get() {
          if (this[kAutoscaling] === null) {
            this[kAutoscaling] = new AutoscalingApi(this.transport, this[kConfigurationError]);
          }
          return this[kAutoscaling];
        }
      },
      cat: {
        get() {
          if (this[kCat] === null) {
            this[kCat] = new CatApi(this.transport, this[kConfigurationError]);
          }
          return this[kCat];
        }
      },
      ccr: {
        get() {
          if (this[kCcr] === null) {
            this[kCcr] = new CcrApi(this.transport, this[kConfigurationError]);
          }
          return this[kCcr];
        }
      },
      clear_scroll: { get() {
        return this.clearScroll;
      } },
      close_point_in_time: { get() {
        return this.closePointInTime;
      } },
      cluster: {
        get() {
          if (this[kCluster] === null) {
            this[kCluster] = new ClusterApi(this.transport, this[kConfigurationError]);
          }
          return this[kCluster];
        }
      },
      danglingIndices: {
        get() {
          if (this[kDanglingIndices] === null) {
            this[kDanglingIndices] = new DanglingIndicesApi(this.transport, this[kConfigurationError]);
          }
          return this[kDanglingIndices];
        }
      },
      dangling_indices: { get() {
        return this.danglingIndices;
      } },
      delete_by_query: { get() {
        return this.deleteByQuery;
      } },
      delete_by_query_rethrottle: { get() {
        return this.deleteByQueryRethrottle;
      } },
      delete_script: { get() {
        return this.deleteScript;
      } },
      enrich: {
        get() {
          if (this[kEnrich] === null) {
            this[kEnrich] = new EnrichApi(this.transport, this[kConfigurationError]);
          }
          return this[kEnrich];
        }
      },
      eql: {
        get() {
          if (this[kEql] === null) {
            this[kEql] = new EqlApi(this.transport, this[kConfigurationError]);
          }
          return this[kEql];
        }
      },
      exists_source: { get() {
        return this.existsSource;
      } },
      features: {
        get() {
          if (this[kFeatures] === null) {
            this[kFeatures] = new FeaturesApi(this.transport, this[kConfigurationError]);
          }
          return this[kFeatures];
        }
      },
      field_caps: { get() {
        return this.fieldCaps;
      } },
      fleet: {
        get() {
          if (this[kFleet] === null) {
            this[kFleet] = new FleetApi(this.transport, this[kConfigurationError]);
          }
          return this[kFleet];
        }
      },
      get_script: { get() {
        return this.getScript;
      } },
      get_script_context: { get() {
        return this.getScriptContext;
      } },
      get_script_languages: { get() {
        return this.getScriptLanguages;
      } },
      get_source: { get() {
        return this.getSource;
      } },
      graph: {
        get() {
          if (this[kGraph] === null) {
            this[kGraph] = new GraphApi(this.transport, this[kConfigurationError]);
          }
          return this[kGraph];
        }
      },
      ilm: {
        get() {
          if (this[kIlm] === null) {
            this[kIlm] = new IlmApi(this.transport, this[kConfigurationError]);
          }
          return this[kIlm];
        }
      },
      indices: {
        get() {
          if (this[kIndices] === null) {
            this[kIndices] = new IndicesApi(this.transport, this[kConfigurationError]);
          }
          return this[kIndices];
        }
      },
      ingest: {
        get() {
          if (this[kIngest] === null) {
            this[kIngest] = new IngestApi(this.transport, this[kConfigurationError]);
          }
          return this[kIngest];
        }
      },
      license: {
        get() {
          if (this[kLicense] === null) {
            this[kLicense] = new LicenseApi(this.transport, this[kConfigurationError]);
          }
          return this[kLicense];
        }
      },
      logstash: {
        get() {
          if (this[kLogstash] === null) {
            this[kLogstash] = new LogstashApi(this.transport, this[kConfigurationError]);
          }
          return this[kLogstash];
        }
      },
      migration: {
        get() {
          if (this[kMigration] === null) {
            this[kMigration] = new MigrationApi(this.transport, this[kConfigurationError]);
          }
          return this[kMigration];
        }
      },
      ml: {
        get() {
          if (this[kMl] === null) {
            this[kMl] = new MlApi(this.transport, this[kConfigurationError]);
          }
          return this[kMl];
        }
      },
      monitoring: {
        get() {
          if (this[kMonitoring] === null) {
            this[kMonitoring] = new MonitoringApi(this.transport, this[kConfigurationError]);
          }
          return this[kMonitoring];
        }
      },
      msearch_template: { get() {
        return this.msearchTemplate;
      } },
      nodes: {
        get() {
          if (this[kNodes] === null) {
            this[kNodes] = new NodesApi(this.transport, this[kConfigurationError]);
          }
          return this[kNodes];
        }
      },
      open_point_in_time: { get() {
        return this.openPointInTime;
      } },
      put_script: { get() {
        return this.putScript;
      } },
      rank_eval: { get() {
        return this.rankEval;
      } },
      reindex_rethrottle: { get() {
        return this.reindexRethrottle;
      } },
      render_search_template: { get() {
        return this.renderSearchTemplate;
      } },
      rollup: {
        get() {
          if (this[kRollup] === null) {
            this[kRollup] = new RollupApi(this.transport, this[kConfigurationError]);
          }
          return this[kRollup];
        }
      },
      scripts_painless_execute: { get() {
        return this.scriptsPainlessExecute;
      } },
      search_mvt: { get() {
        return this.searchMvt;
      } },
      search_shards: { get() {
        return this.searchShards;
      } },
      search_template: { get() {
        return this.searchTemplate;
      } },
      searchableSnapshots: {
        get() {
          if (this[kSearchableSnapshots] === null) {
            this[kSearchableSnapshots] = new SearchableSnapshotsApi(this.transport, this[kConfigurationError]);
          }
          return this[kSearchableSnapshots];
        }
      },
      searchable_snapshots: { get() {
        return this.searchableSnapshots;
      } },
      security: {
        get() {
          if (this[kSecurity] === null) {
            this[kSecurity] = new SecurityApi(this.transport, this[kConfigurationError]);
          }
          return this[kSecurity];
        }
      },
      shutdown: {
        get() {
          if (this[kShutdown] === null) {
            this[kShutdown] = new ShutdownApi(this.transport, this[kConfigurationError]);
          }
          return this[kShutdown];
        }
      },
      slm: {
        get() {
          if (this[kSlm] === null) {
            this[kSlm] = new SlmApi(this.transport, this[kConfigurationError]);
          }
          return this[kSlm];
        }
      },
      snapshot: {
        get() {
          if (this[kSnapshot] === null) {
            this[kSnapshot] = new SnapshotApi(this.transport, this[kConfigurationError]);
          }
          return this[kSnapshot];
        }
      },
      sql: {
        get() {
          if (this[kSql] === null) {
            this[kSql] = new SqlApi(this.transport, this[kConfigurationError]);
          }
          return this[kSql];
        }
      },
      ssl: {
        get() {
          if (this[kSsl] === null) {
            this[kSsl] = new SslApi(this.transport, this[kConfigurationError]);
          }
          return this[kSsl];
        }
      },
      tasks: {
        get() {
          if (this[kTasks] === null) {
            this[kTasks] = new TasksApi(this.transport, this[kConfigurationError]);
          }
          return this[kTasks];
        }
      },
      terms_enum: { get() {
        return this.termsEnum;
      } },
      textStructure: {
        get() {
          if (this[kTextStructure] === null) {
            this[kTextStructure] = new TextStructureApi(this.transport, this[kConfigurationError]);
          }
          return this[kTextStructure];
        }
      },
      text_structure: { get() {
        return this.textStructure;
      } },
      transform: {
        get() {
          if (this[kTransform] === null) {
            this[kTransform] = new TransformApi(this.transport, this[kConfigurationError]);
          }
          return this[kTransform];
        }
      },
      update_by_query: { get() {
        return this.updateByQuery;
      } },
      update_by_query_rethrottle: { get() {
        return this.updateByQueryRethrottle;
      } },
      watcher: {
        get() {
          if (this[kWatcher] === null) {
            this[kWatcher] = new WatcherApi(this.transport, this[kConfigurationError]);
          }
          return this[kWatcher];
        }
      },
      xpack: {
        get() {
          if (this[kXpack] === null) {
            this[kXpack] = new XpackApi(this.transport, this[kConfigurationError]);
          }
          return this[kXpack];
        }
      }
    });
    module.exports = ESAPI;
  }
});

// node_modules/@elastic/elasticsearch/index.js
var require_elasticsearch = __commonJS({
  "node_modules/@elastic/elasticsearch/index.js"(exports, module) {
    var { EventEmitter } = require_events();
    var { URL } = require_url();
    var buffer = require_buffer();
    var debug = require_browser()("elasticsearch");
    var Transport = require_Transport();
    var Connection = require_Connection();
    var { ConnectionPool, CloudConnectionPool } = require_pool();
    var Helpers = require_Helpers();
    var Serializer = require_Serializer();
    var errors = require_errors();
    var { ConfigurationError } = errors;
    var { prepareHeaders } = Connection.internals;
    var clientVersion = require_package().version;
    if (clientVersion.includes("-")) {
      clientVersion = clientVersion.slice(0, clientVersion.indexOf("-")) + "p";
    }
    var nodeVersion = process.versions.node;
    var kInitialOptions = Symbol("elasticsearchjs-initial-options");
    var kChild = Symbol("elasticsearchjs-child");
    var kExtensions = Symbol("elasticsearchjs-extensions");
    var kEventEmitter = Symbol("elasticsearchjs-event-emitter");
    var ESAPI = require_api2();
    var Client = class _Client extends ESAPI {
      constructor(opts = {}) {
        super({ ConfigurationError });
        if (opts.cloud && opts[kChild] === void 0) {
          const { id, username, password } = opts.cloud;
          const cloudUrls = Buffer.from(id.split(":")[1], "base64").toString().split("$");
          if (username && password) {
            opts.auth = Object.assign({}, opts.auth, { username, password });
          }
          opts.node = `https://${cloudUrls[1]}.${cloudUrls[0]}`;
          if (opts.compression == null)
            opts.compression = "gzip";
          if (opts.suggestCompression == null)
            opts.suggestCompression = true;
          if (opts.ssl == null || opts.ssl && opts.ssl.secureProtocol == null) {
            opts.ssl = opts.ssl || {};
            opts.ssl.secureProtocol = "TLSv1_2_method";
          }
        }
        if (!opts.node && !opts.nodes) {
          throw new ConfigurationError("Missing node(s) option");
        }
        if (opts[kChild] === void 0) {
          const checkAuth = getAuth(opts.node || opts.nodes);
          if (checkAuth && checkAuth.username && checkAuth.password) {
            opts.auth = Object.assign({}, opts.auth, { username: checkAuth.username, password: checkAuth.password });
          }
        }
        const options = opts[kChild] !== void 0 ? opts[kChild].initialOptions : Object.assign({}, {
          Connection,
          Transport,
          Serializer,
          ConnectionPool: opts.cloud ? CloudConnectionPool : ConnectionPool,
          maxRetries: 3,
          requestTimeout: 3e4,
          pingTimeout: 3e3,
          sniffInterval: false,
          sniffOnStart: false,
          sniffEndpoint: "_nodes/_all/http",
          sniffOnConnectionFault: false,
          resurrectStrategy: "ping",
          suggestCompression: false,
          compression: false,
          ssl: null,
          caFingerprint: null,
          agent: null,
          headers: {},
          nodeFilter: null,
          nodeSelector: "round-robin",
          generateRequestId: null,
          name: "elasticsearch-js",
          auth: null,
          opaqueIdPrefix: null,
          context: null,
          proxy: null,
          enableMetaHeader: true,
          disablePrototypePoisoningProtection: false,
          maxResponseSize: null,
          maxCompressedResponseSize: null
        }, opts);
        if (options.maxResponseSize != null && options.maxResponseSize > buffer.constants.MAX_STRING_LENGTH) {
          throw new ConfigurationError(`The maxResponseSize cannot be bigger than ${buffer.constants.MAX_STRING_LENGTH}`);
        }
        if (options.maxCompressedResponseSize != null && options.maxCompressedResponseSize > buffer.constants.MAX_LENGTH) {
          throw new ConfigurationError(`The maxCompressedResponseSize cannot be bigger than ${buffer.constants.MAX_LENGTH}`);
        }
        if (options.caFingerprint != null && isHttpConnection(opts.node || opts.nodes)) {
          throw new ConfigurationError("You can't configure the caFingerprint with a http connection");
        }
        if (process.env.ELASTIC_CLIENT_APIVERSIONING === "true") {
          options.headers = Object.assign({ accept: "application/vnd.elasticsearch+json; compatible-with=7" }, options.headers);
        }
        this[kInitialOptions] = options;
        this[kExtensions] = [];
        this.name = options.name;
        if (options.enableMetaHeader) {
          options.headers["x-elastic-client-meta"] = `es=${clientVersion},js=${nodeVersion},t=${clientVersion},hc=${nodeVersion}`;
        }
        if (opts[kChild] !== void 0) {
          this.serializer = options[kChild].serializer;
          this.connectionPool = options[kChild].connectionPool;
          this[kEventEmitter] = options[kChild].eventEmitter;
        } else {
          this[kEventEmitter] = new EventEmitter();
          this.serializer = new options.Serializer({
            disablePrototypePoisoningProtection: options.disablePrototypePoisoningProtection
          });
          this.connectionPool = new options.ConnectionPool({
            pingTimeout: options.pingTimeout,
            resurrectStrategy: options.resurrectStrategy,
            ssl: options.ssl,
            agent: options.agent,
            proxy: options.proxy,
            Connection: options.Connection,
            auth: options.auth,
            emit: this[kEventEmitter].emit.bind(this[kEventEmitter]),
            caFingerprint: options.caFingerprint,
            sniffEnabled: options.sniffInterval !== false || options.sniffOnStart !== false || options.sniffOnConnectionFault !== false
          });
          this.connectionPool.addConnection(options.node || options.nodes);
        }
        this.transport = new options.Transport({
          emit: this[kEventEmitter].emit.bind(this[kEventEmitter]),
          connectionPool: this.connectionPool,
          serializer: this.serializer,
          maxRetries: options.maxRetries,
          requestTimeout: options.requestTimeout,
          sniffInterval: options.sniffInterval,
          sniffOnStart: options.sniffOnStart,
          sniffOnConnectionFault: options.sniffOnConnectionFault,
          sniffEndpoint: options.sniffEndpoint,
          suggestCompression: options.suggestCompression,
          compression: options.compression,
          headers: options.headers,
          nodeFilter: options.nodeFilter,
          nodeSelector: options.nodeSelector,
          generateRequestId: options.generateRequestId,
          name: options.name,
          opaqueIdPrefix: options.opaqueIdPrefix,
          context: options.context,
          maxResponseSize: options.maxResponseSize,
          maxCompressedResponseSize: options.maxCompressedResponseSize
        });
        this.helpers = new Helpers({
          client: this,
          maxRetries: options.maxRetries,
          metaHeader: options.enableMetaHeader ? `es=${clientVersion},js=${nodeVersion},t=${clientVersion},hc=${nodeVersion}` : null
        });
      }
      get emit() {
        return this[kEventEmitter].emit.bind(this[kEventEmitter]);
      }
      get on() {
        return this[kEventEmitter].on.bind(this[kEventEmitter]);
      }
      get once() {
        return this[kEventEmitter].once.bind(this[kEventEmitter]);
      }
      get off() {
        return this[kEventEmitter].off.bind(this[kEventEmitter]);
      }
      extend(name, opts, fn) {
        if (typeof opts === "function") {
          fn = opts;
          opts = {};
        }
        let [namespace, method] = name.split(".");
        if (method == null) {
          method = namespace;
          namespace = null;
        }
        if (namespace != null) {
          if (this[namespace] != null && this[namespace][method] != null && opts.force !== true) {
            throw new Error(`The method "${method}" already exists on namespace "${namespace}"`);
          }
          if (this[namespace] == null)
            this[namespace] = {};
          this[namespace][method] = fn({
            makeRequest: this.transport.request.bind(this.transport),
            result: { body: null, statusCode: null, headers: null, warnings: null },
            ConfigurationError
          });
        } else {
          if (this[method] != null && opts.force !== true) {
            throw new Error(`The method "${method}" already exists`);
          }
          this[method] = fn({
            makeRequest: this.transport.request.bind(this.transport),
            result: { body: null, statusCode: null, headers: null, warnings: null },
            ConfigurationError
          });
        }
        this[kExtensions].push({ name, opts, fn });
      }
      child(opts) {
        const options = Object.assign({}, this[kInitialOptions], opts);
        options[kChild] = {
          connectionPool: this.connectionPool,
          serializer: this.serializer,
          eventEmitter: this[kEventEmitter],
          initialOptions: options
        };
        if (options.auth !== void 0) {
          options.headers = prepareHeaders(options.headers, options.auth);
        }
        const client = new _Client(options);
        const tSymbol = Object.getOwnPropertySymbols(this.transport).filter((symbol) => symbol.description === "product check")[0];
        client.transport[tSymbol] = this.transport[tSymbol];
        if (this[kExtensions].length > 0) {
          this[kExtensions].forEach(({ name, opts: opts2, fn }) => {
            client.extend(name, opts2, fn);
          });
        }
        return client;
      }
      close(callback) {
        if (callback == null) {
          return new Promise((resolve, reject) => {
            this.close(resolve);
          });
        }
        debug("Closing the client");
        this.connectionPool.empty(callback);
      }
    };
    function getAuth(node) {
      if (Array.isArray(node)) {
        for (const url of node) {
          const auth2 = getUsernameAndPassword(url);
          if (auth2.username !== "" && auth2.password !== "") {
            return auth2;
          }
        }
        return null;
      }
      const auth = getUsernameAndPassword(node);
      if (auth.username !== "" && auth.password !== "") {
        return auth;
      }
      return null;
      function getUsernameAndPassword(node2) {
        if (typeof node2 === "string") {
          const { username, password } = new URL(node2);
          return {
            username: decodeURIComponent(username),
            password: decodeURIComponent(password)
          };
        } else if (node2.url instanceof URL) {
          return {
            username: decodeURIComponent(node2.url.username),
            password: decodeURIComponent(node2.url.password)
          };
        }
      }
    }
    function isHttpConnection(node) {
      if (Array.isArray(node)) {
        return node.some((n) => (typeof n === "string" ? new URL(n).protocol : n.url.protocol) === "http:");
      } else {
        return (typeof node === "string" ? new URL(node).protocol : node.url.protocol) === "http:";
      }
    }
    var events = {
      RESPONSE: "response",
      REQUEST: "request",
      SNIFF: "sniff",
      RESURRECT: "resurrect",
      SERIALIZATION: "serialization",
      DESERIALIZATION: "deserialization"
    };
    module.exports = {
      Client,
      Transport,
      ConnectionPool,
      Connection,
      Serializer,
      events,
      errors
    };
  }
});
export default require_elasticsearch();
//# sourceMappingURL=@elastic_elasticsearch.js.map
