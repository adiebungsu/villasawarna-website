import {
  require_react
} from "./chunk-2CLD7BNN.js";
import {
  __toESM
} from "./chunk-WOOG5QLI.js";

// node_modules/react-image-gallery/build/image-gallery.es.js
var e = __toESM(require_react());
var t = { 694: (e3, t2, n2) => {
  var i2 = n2(925);
  function r2() {
  }
  function a2() {
  }
  a2.resetWarningCache = r2, e3.exports = function() {
    function e4(e5, t4, n4, r3, a3, o2) {
      if (o2 !== i2) {
        var s2 = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        throw s2.name = "Invariant Violation", s2;
      }
    }
    function t3() {
      return e4;
    }
    e4.isRequired = e4;
    var n3 = { array: e4, bigint: e4, bool: e4, func: e4, number: e4, object: e4, string: e4, symbol: e4, any: e4, arrayOf: t3, element: e4, elementType: e4, instanceOf: t3, node: e4, objectOf: t3, oneOf: t3, oneOfType: t3, shape: t3, exact: t3, checkPropTypes: a2, resetWarningCache: r2 };
    return n3.PropTypes = n3, n3;
  };
}, 556: (e3, t2, n2) => {
  e3.exports = n2(694)();
}, 925: (e3) => {
  e3.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
}, 115: (e3) => {
  var t2 = "undefined" != typeof Element, n2 = "function" == typeof Map, i2 = "function" == typeof Set, r2 = "function" == typeof ArrayBuffer && !!ArrayBuffer.isView;
  function a2(e4, o2) {
    if (e4 === o2) return true;
    if (e4 && o2 && "object" == typeof e4 && "object" == typeof o2) {
      if (e4.constructor !== o2.constructor) return false;
      var s2, l2, u2, c2;
      if (Array.isArray(e4)) {
        if ((s2 = e4.length) != o2.length) return false;
        for (l2 = s2; 0 != l2--; ) if (!a2(e4[l2], o2[l2])) return false;
        return true;
      }
      if (n2 && e4 instanceof Map && o2 instanceof Map) {
        if (e4.size !== o2.size) return false;
        for (c2 = e4.entries(); !(l2 = c2.next()).done; ) if (!o2.has(l2.value[0])) return false;
        for (c2 = e4.entries(); !(l2 = c2.next()).done; ) if (!a2(l2.value[1], o2.get(l2.value[0]))) return false;
        return true;
      }
      if (i2 && e4 instanceof Set && o2 instanceof Set) {
        if (e4.size !== o2.size) return false;
        for (c2 = e4.entries(); !(l2 = c2.next()).done; ) if (!o2.has(l2.value[0])) return false;
        return true;
      }
      if (r2 && ArrayBuffer.isView(e4) && ArrayBuffer.isView(o2)) {
        if ((s2 = e4.length) != o2.length) return false;
        for (l2 = s2; 0 != l2--; ) if (e4[l2] !== o2[l2]) return false;
        return true;
      }
      if (e4.constructor === RegExp) return e4.source === o2.source && e4.flags === o2.flags;
      if (e4.valueOf !== Object.prototype.valueOf && "function" == typeof e4.valueOf && "function" == typeof o2.valueOf) return e4.valueOf() === o2.valueOf();
      if (e4.toString !== Object.prototype.toString && "function" == typeof e4.toString && "function" == typeof o2.toString) return e4.toString() === o2.toString();
      if ((s2 = (u2 = Object.keys(e4)).length) !== Object.keys(o2).length) return false;
      for (l2 = s2; 0 != l2--; ) if (!Object.prototype.hasOwnProperty.call(o2, u2[l2])) return false;
      if (t2 && e4 instanceof Element) return false;
      for (l2 = s2; 0 != l2--; ) if (("_owner" !== u2[l2] && "__v" !== u2[l2] && "__o" !== u2[l2] || !e4.$$typeof) && !a2(e4[u2[l2]], o2[u2[l2]])) return false;
      return true;
    }
    return e4 != e4 && o2 != o2;
  }
  e3.exports = function(e4, t3) {
    try {
      return a2(e4, t3);
    } catch (e5) {
      if ((e5.message || "").match(/stack|recursion/i)) return console.warn("react-fast-compare cannot handle circular refs"), false;
      throw e5;
    }
  };
} };
var n = {};
function i(e3) {
  var r2 = n[e3];
  if (void 0 !== r2) return r2.exports;
  var a2 = n[e3] = { exports: {} };
  return t[e3](a2, a2.exports, i), a2.exports;
}
i.n = (e3) => {
  var t2 = e3 && e3.__esModule ? () => e3.default : () => e3;
  return i.d(t2, { a: t2 }), t2;
}, i.d = (e3, t2) => {
  for (var n2 in t2) i.o(t2, n2) && !i.o(e3, n2) && Object.defineProperty(e3, n2, { enumerable: true, get: t2[n2] });
}, i.g = function() {
  if ("object" == typeof globalThis) return globalThis;
  try {
    return this || new Function("return this")();
  } catch (e3) {
    if ("object" == typeof window) return window;
  }
}(), i.o = (e3, t2) => Object.prototype.hasOwnProperty.call(e3, t2);
var r = {};
function a(e3) {
  var t2, n2, i2 = "";
  if ("string" == typeof e3 || "number" == typeof e3) i2 += e3;
  else if ("object" == typeof e3) if (Array.isArray(e3)) {
    var r2 = e3.length;
    for (t2 = 0; t2 < r2; t2++) e3[t2] && (n2 = a(e3[t2])) && (i2 && (i2 += " "), i2 += n2);
  } else for (n2 in e3) e3[n2] && (i2 && (i2 += " "), i2 += n2);
  return i2;
}
i.d(r, { A: () => ut });
var o = function() {
  for (var e3, t2, n2 = 0, i2 = "", r2 = arguments.length; n2 < r2; n2++) (e3 = arguments[n2]) && (t2 = a(e3)) && (i2 && (i2 += " "), i2 += t2);
  return i2;
};
var s = (l = { default: () => e.default, useMemo: () => e.useMemo, useRef: () => e.useRef }, u = {}, i.d(u, l), u);
var l;
var u;
var c = function(e3) {
  var t2 = typeof e3;
  return null != e3 && ("object" == t2 || "function" == t2);
};
var h = "object" == typeof global && global && global.Object === Object && global;
var d = "object" == typeof self && self && self.Object === Object && self;
var f = h || d || Function("return this")();
var p = function() {
  return f.Date.now();
};
var m = /\s/;
var b = /^\s+/;
var g = function(e3) {
  return e3 ? e3.slice(0, function(e4) {
    for (var t2 = e4.length; t2-- && m.test(e4.charAt(t2)); ) ;
    return t2;
  }(e3) + 1).replace(b, "") : e3;
};
var v = f.Symbol;
var y = Object.prototype;
var w = y.hasOwnProperty;
var S = y.toString;
var T = v ? v.toStringTag : void 0;
var O = Object.prototype.toString;
var E = v ? v.toStringTag : void 0;
var k = function(e3) {
  return null == e3 ? void 0 === e3 ? "[object Undefined]" : "[object Null]" : E && E in Object(e3) ? function(e4) {
    var t2 = w.call(e4, T), n2 = e4[T];
    try {
      e4[T] = void 0;
      var i2 = true;
    } catch (e5) {
    }
    var r2 = S.call(e4);
    return i2 && (t2 ? e4[T] = n2 : delete e4[T]), r2;
  }(e3) : function(e4) {
    return O.call(e4);
  }(e3);
};
var I = /^[-+]0x[0-9a-f]+$/i;
var x = /^0b[01]+$/i;
var P = /^0o[0-7]+$/i;
var j = parseInt;
var _ = function(e3) {
  if ("number" == typeof e3) return e3;
  if (function(e4) {
    return "symbol" == typeof e4 || function(e5) {
      return null != e5 && "object" == typeof e5;
    }(e4) && "[object Symbol]" == k(e4);
  }(e3)) return NaN;
  if (c(e3)) {
    var t2 = "function" == typeof e3.valueOf ? e3.valueOf() : e3;
    e3 = c(t2) ? t2 + "" : t2;
  }
  if ("string" != typeof e3) return 0 === e3 ? e3 : +e3;
  e3 = g(e3);
  var n2 = x.test(e3);
  return n2 || P.test(e3) ? j(e3.slice(2), n2 ? 2 : 8) : I.test(e3) ? NaN : +e3;
};
var R = Math.max;
var L = Math.min;
var M = function(e3, t2, n2) {
  var i2, r2, a2, o2, s2, l2, u2 = 0, h2 = false, d2 = false, f2 = true;
  if ("function" != typeof e3) throw new TypeError("Expected a function");
  function m2(t3) {
    var n3 = i2, a3 = r2;
    return i2 = r2 = void 0, u2 = t3, o2 = e3.apply(a3, n3);
  }
  function b2(e4) {
    var n3 = e4 - l2;
    return void 0 === l2 || n3 >= t2 || n3 < 0 || d2 && e4 - u2 >= a2;
  }
  function g2() {
    var e4 = p();
    if (b2(e4)) return v2(e4);
    s2 = setTimeout(g2, function(e5) {
      var n3 = t2 - (e5 - l2);
      return d2 ? L(n3, a2 - (e5 - u2)) : n3;
    }(e4));
  }
  function v2(e4) {
    return s2 = void 0, f2 && i2 ? m2(e4) : (i2 = r2 = void 0, o2);
  }
  function y2() {
    var e4 = p(), n3 = b2(e4);
    if (i2 = arguments, r2 = this, l2 = e4, n3) {
      if (void 0 === s2) return function(e5) {
        return u2 = e5, s2 = setTimeout(g2, t2), h2 ? m2(e5) : o2;
      }(l2);
      if (d2) return clearTimeout(s2), s2 = setTimeout(g2, t2), m2(l2);
    }
    return void 0 === s2 && (s2 = setTimeout(g2, t2)), o2;
  }
  return t2 = _(t2) || 0, c(n2) && (h2 = !!n2.leading, a2 = (d2 = "maxWait" in n2) ? R(_(n2.maxWait) || 0, t2) : a2, f2 = "trailing" in n2 ? !!n2.trailing : f2), y2.cancel = function() {
    void 0 !== s2 && clearTimeout(s2), u2 = 0, i2 = l2 = r2 = s2 = void 0;
  }, y2.flush = function() {
    return void 0 === s2 ? o2 : v2(p());
  }, y2;
};
var D = function(e3, t2, n2) {
  var i2 = true, r2 = true;
  if ("function" != typeof e3) throw new TypeError("Expected a function");
  return c(n2) && (i2 = "leading" in n2 ? !!n2.leading : i2, r2 = "trailing" in n2 ? !!n2.trailing : r2), M(e3, t2, { leading: i2, maxWait: t2, trailing: r2 });
};
var C = i(115);
var W = i.n(C);
var N = function() {
  if ("undefined" != typeof Map) return Map;
  function e3(e4, t2) {
    var n2 = -1;
    return e4.some(function(e5, i2) {
      return e5[0] === t2 && (n2 = i2, true);
    }), n2;
  }
  return function() {
    function t2() {
      this.__entries__ = [];
    }
    return Object.defineProperty(t2.prototype, "size", { get: function() {
      return this.__entries__.length;
    }, enumerable: true, configurable: true }), t2.prototype.get = function(t3) {
      var n2 = e3(this.__entries__, t3), i2 = this.__entries__[n2];
      return i2 && i2[1];
    }, t2.prototype.set = function(t3, n2) {
      var i2 = e3(this.__entries__, t3);
      ~i2 ? this.__entries__[i2][1] = n2 : this.__entries__.push([t3, n2]);
    }, t2.prototype.delete = function(t3) {
      var n2 = this.__entries__, i2 = e3(n2, t3);
      ~i2 && n2.splice(i2, 1);
    }, t2.prototype.has = function(t3) {
      return !!~e3(this.__entries__, t3);
    }, t2.prototype.clear = function() {
      this.__entries__.splice(0);
    }, t2.prototype.forEach = function(e4, t3) {
      void 0 === t3 && (t3 = null);
      for (var n2 = 0, i2 = this.__entries__; n2 < i2.length; n2++) {
        var r2 = i2[n2];
        e4.call(t3, r2[1], r2[0]);
      }
    }, t2;
  }();
}();
var F = "undefined" != typeof window && "undefined" != typeof document && window.document === document;
var z = void 0 !== i.g && i.g.Math === Math ? i.g : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")();
var B = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(z) : function(e3) {
  return setTimeout(function() {
    return e3(Date.now());
  }, 1e3 / 60);
};
var A = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
var U = "undefined" != typeof MutationObserver;
var q = function() {
  function e3() {
    this.connected_ = false, this.mutationEventsAdded_ = false, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = /* @__PURE__ */ function(e4) {
      var t2 = false, n2 = false, i2 = 0;
      function r2() {
        t2 && (t2 = false, e4()), n2 && o2();
      }
      function a2() {
        B(r2);
      }
      function o2() {
        var e5 = Date.now();
        if (t2) {
          if (e5 - i2 < 2) return;
          n2 = true;
        } else t2 = true, n2 = false, setTimeout(a2, 20);
        i2 = e5;
      }
      return o2;
    }(this.refresh.bind(this));
  }
  return e3.prototype.addObserver = function(e4) {
    ~this.observers_.indexOf(e4) || this.observers_.push(e4), this.connected_ || this.connect_();
  }, e3.prototype.removeObserver = function(e4) {
    var t2 = this.observers_, n2 = t2.indexOf(e4);
    ~n2 && t2.splice(n2, 1), !t2.length && this.connected_ && this.disconnect_();
  }, e3.prototype.refresh = function() {
    this.updateObservers_() && this.refresh();
  }, e3.prototype.updateObservers_ = function() {
    var e4 = this.observers_.filter(function(e5) {
      return e5.gatherActive(), e5.hasActive();
    });
    return e4.forEach(function(e5) {
      return e5.broadcastActive();
    }), e4.length > 0;
  }, e3.prototype.connect_ = function() {
    F && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), U ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, { attributes: true, childList: true, characterData: true, subtree: true })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = true), this.connected_ = true);
  }, e3.prototype.disconnect_ = function() {
    F && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = false, this.connected_ = false);
  }, e3.prototype.onTransitionEnd_ = function(e4) {
    var t2 = e4.propertyName, n2 = void 0 === t2 ? "" : t2;
    A.some(function(e5) {
      return !!~n2.indexOf(e5);
    }) && this.refresh();
  }, e3.getInstance = function() {
    return this.instance_ || (this.instance_ = new e3()), this.instance_;
  }, e3.instance_ = null, e3;
}();
var G = function(e3, t2) {
  for (var n2 = 0, i2 = Object.keys(t2); n2 < i2.length; n2++) {
    var r2 = i2[n2];
    Object.defineProperty(e3, r2, { value: t2[r2], enumerable: false, writable: false, configurable: true });
  }
  return e3;
};
var H = function(e3) {
  return e3 && e3.ownerDocument && e3.ownerDocument.defaultView || z;
};
var V = J(0, 0, 0, 0);
function K(e3) {
  return parseFloat(e3) || 0;
}
function X(e3) {
  for (var t2 = [], n2 = 1; n2 < arguments.length; n2++) t2[n2 - 1] = arguments[n2];
  return t2.reduce(function(t3, n3) {
    return t3 + K(e3["border-" + n3 + "-width"]);
  }, 0);
}
var Y = "undefined" != typeof SVGGraphicsElement ? function(e3) {
  return e3 instanceof H(e3).SVGGraphicsElement;
} : function(e3) {
  return e3 instanceof H(e3).SVGElement && "function" == typeof e3.getBBox;
};
function $(e3) {
  return F ? Y(e3) ? function(e4) {
    var t2 = e4.getBBox();
    return J(0, 0, t2.width, t2.height);
  }(e3) : function(e4) {
    var t2 = e4.clientWidth, n2 = e4.clientHeight;
    if (!t2 && !n2) return V;
    var i2 = H(e4).getComputedStyle(e4), r2 = function(e5) {
      for (var t3 = {}, n3 = 0, i3 = ["top", "right", "bottom", "left"]; n3 < i3.length; n3++) {
        var r3 = i3[n3], a3 = e5["padding-" + r3];
        t3[r3] = K(a3);
      }
      return t3;
    }(i2), a2 = r2.left + r2.right, o2 = r2.top + r2.bottom, s2 = K(i2.width), l2 = K(i2.height);
    if ("border-box" === i2.boxSizing && (Math.round(s2 + a2) !== t2 && (s2 -= X(i2, "left", "right") + a2), Math.round(l2 + o2) !== n2 && (l2 -= X(i2, "top", "bottom") + o2)), !function(e5) {
      return e5 === H(e5).document.documentElement;
    }(e4)) {
      var u2 = Math.round(s2 + a2) - t2, c2 = Math.round(l2 + o2) - n2;
      1 !== Math.abs(u2) && (s2 -= u2), 1 !== Math.abs(c2) && (l2 -= c2);
    }
    return J(r2.left, r2.top, s2, l2);
  }(e3) : V;
}
function J(e3, t2, n2, i2) {
  return { x: e3, y: t2, width: n2, height: i2 };
}
var Q = function() {
  function e3(e4) {
    this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = J(0, 0, 0, 0), this.target = e4;
  }
  return e3.prototype.isActive = function() {
    var e4 = $(this.target);
    return this.contentRect_ = e4, e4.width !== this.broadcastWidth || e4.height !== this.broadcastHeight;
  }, e3.prototype.broadcastRect = function() {
    var e4 = this.contentRect_;
    return this.broadcastWidth = e4.width, this.broadcastHeight = e4.height, e4;
  }, e3;
}();
var Z = function(e3, t2) {
  var n2 = function(e4) {
    var t3 = e4.x, n3 = e4.y, i2 = e4.width, r2 = e4.height, a2 = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object, o2 = Object.create(a2.prototype);
    return G(o2, { x: t3, y: n3, width: i2, height: r2, top: n3, right: t3 + i2, bottom: r2 + n3, left: t3 }), o2;
  }(t2);
  G(this, { target: e3, contentRect: n2 });
};
var ee = function() {
  function e3(e4, t2, n2) {
    if (this.activeObservations_ = [], this.observations_ = new N(), "function" != typeof e4) throw new TypeError("The callback provided as parameter 1 is not a function.");
    this.callback_ = e4, this.controller_ = t2, this.callbackCtx_ = n2;
  }
  return e3.prototype.observe = function(e4) {
    if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
    if ("undefined" != typeof Element && Element instanceof Object) {
      if (!(e4 instanceof H(e4).Element)) throw new TypeError('parameter 1 is not of type "Element".');
      var t2 = this.observations_;
      t2.has(e4) || (t2.set(e4, new Q(e4)), this.controller_.addObserver(this), this.controller_.refresh());
    }
  }, e3.prototype.unobserve = function(e4) {
    if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
    if ("undefined" != typeof Element && Element instanceof Object) {
      if (!(e4 instanceof H(e4).Element)) throw new TypeError('parameter 1 is not of type "Element".');
      var t2 = this.observations_;
      t2.has(e4) && (t2.delete(e4), t2.size || this.controller_.removeObserver(this));
    }
  }, e3.prototype.disconnect = function() {
    this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
  }, e3.prototype.gatherActive = function() {
    var e4 = this;
    this.clearActive(), this.observations_.forEach(function(t2) {
      t2.isActive() && e4.activeObservations_.push(t2);
    });
  }, e3.prototype.broadcastActive = function() {
    if (this.hasActive()) {
      var e4 = this.callbackCtx_, t2 = this.activeObservations_.map(function(e5) {
        return new Z(e5.target, e5.broadcastRect());
      });
      this.callback_.call(e4, t2, e4), this.clearActive();
    }
  }, e3.prototype.clearActive = function() {
    this.activeObservations_.splice(0);
  }, e3.prototype.hasActive = function() {
    return this.activeObservations_.length > 0;
  }, e3;
}();
var te = "undefined" != typeof WeakMap ? /* @__PURE__ */ new WeakMap() : new N();
var ne = function e2(t2) {
  if (!(this instanceof e2)) throw new TypeError("Cannot call a class as a function.");
  if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
  var n2 = q.getInstance(), i2 = new ee(t2, n2, this);
  te.set(this, i2);
};
["observe", "unobserve", "disconnect"].forEach(function(e3) {
  ne.prototype[e3] = function() {
    var t2;
    return (t2 = te.get(this))[e3].apply(t2, arguments);
  };
});
var ie = void 0 !== z.ResizeObserver ? z.ResizeObserver : ne;
var re = "Left";
var ae = "Right";
var oe = "Up";
var se = "Down";
var le = { delta: 10, preventScrollOnSwipe: false, rotationAngle: 0, trackMouse: false, trackTouch: true, swipeDuration: 1 / 0, touchEventOptions: { passive: true } };
var ue = { first: true, initial: [0, 0], start: 0, swiping: false, xy: [0, 0] };
var ce = "mousemove";
var he = "mouseup";
function de(e3, t2) {
  if (0 === t2) return e3;
  const n2 = Math.PI / 180 * t2;
  return [e3[0] * Math.cos(n2) + e3[1] * Math.sin(n2), e3[1] * Math.cos(n2) - e3[0] * Math.sin(n2)];
}
function fe(e3) {
  const { trackMouse: t2 } = e3, n2 = s.useRef(Object.assign({}, ue)), i2 = s.useRef(Object.assign({}, le)), r2 = s.useRef(Object.assign({}, i2.current));
  let a2;
  for (a2 in r2.current = Object.assign({}, i2.current), i2.current = Object.assign(Object.assign({}, le), e3), le) void 0 === i2.current[a2] && (i2.current[a2] = le[a2]);
  const [o2, l2] = s.useMemo(() => function(e4, t3) {
    const n3 = (t4) => {
      const n4 = "touches" in t4;
      n4 && t4.touches.length > 1 || e4((e5, r4) => {
        r4.trackMouse && !n4 && (document.addEventListener(ce, i3), document.addEventListener(he, a3));
        const { clientX: o4, clientY: s3 } = n4 ? t4.touches[0] : t4, l3 = de([o4, s3], r4.rotationAngle);
        return r4.onTouchStartOrOnMouseDown && r4.onTouchStartOrOnMouseDown({ event: t4 }), Object.assign(Object.assign(Object.assign({}, e5), ue), { initial: l3.slice(), xy: l3, start: t4.timeStamp || 0 });
      });
    }, i3 = (t4) => {
      e4((e5, n4) => {
        const i4 = "touches" in t4;
        if (i4 && t4.touches.length > 1) return e5;
        if (t4.timeStamp - e5.start > n4.swipeDuration) return e5.swiping ? Object.assign(Object.assign({}, e5), { swiping: false }) : e5;
        const { clientX: r4, clientY: a4 } = i4 ? t4.touches[0] : t4, [o4, s3] = de([r4, a4], n4.rotationAngle), l3 = o4 - e5.xy[0], u2 = s3 - e5.xy[1], c2 = Math.abs(l3), h2 = Math.abs(u2), d2 = (t4.timeStamp || 0) - e5.start, f2 = Math.sqrt(c2 * c2 + h2 * h2) / (d2 || 1), p2 = [l3 / (d2 || 1), u2 / (d2 || 1)], m2 = function(e6, t5, n5, i5) {
          return e6 > t5 ? n5 > 0 ? ae : re : i5 > 0 ? se : oe;
        }(c2, h2, l3, u2), b2 = "number" == typeof n4.delta ? n4.delta : n4.delta[m2.toLowerCase()] || le.delta;
        if (c2 < b2 && h2 < b2 && !e5.swiping) return e5;
        const g2 = { absX: c2, absY: h2, deltaX: l3, deltaY: u2, dir: m2, event: t4, first: e5.first, initial: e5.initial, velocity: f2, vxvy: p2 };
        g2.first && n4.onSwipeStart && n4.onSwipeStart(g2), n4.onSwiping && n4.onSwiping(g2);
        let v2 = false;
        return (n4.onSwiping || n4.onSwiped || n4[`onSwiped${m2}`]) && (v2 = true), v2 && n4.preventScrollOnSwipe && n4.trackTouch && t4.cancelable && t4.preventDefault(), Object.assign(Object.assign({}, e5), { first: false, eventData: g2, swiping: true });
      });
    }, r3 = (t4) => {
      e4((e5, n4) => {
        let i4;
        if (e5.swiping && e5.eventData) {
          if (t4.timeStamp - e5.start < n4.swipeDuration) {
            i4 = Object.assign(Object.assign({}, e5.eventData), { event: t4 }), n4.onSwiped && n4.onSwiped(i4);
            const r4 = n4[`onSwiped${i4.dir}`];
            r4 && r4(i4);
          }
        } else n4.onTap && n4.onTap({ event: t4 });
        return n4.onTouchEndOrOnMouseUp && n4.onTouchEndOrOnMouseUp({ event: t4 }), Object.assign(Object.assign(Object.assign({}, e5), ue), { eventData: i4 });
      });
    }, a3 = (e5) => {
      document.removeEventListener(ce, i3), document.removeEventListener(he, a3), r3(e5);
    }, o3 = (e5, t4) => {
      let a4 = () => {
      };
      if (e5 && e5.addEventListener) {
        const o4 = Object.assign(Object.assign({}, le.touchEventOptions), t4.touchEventOptions), s3 = [["touchstart", n3, o4], ["touchmove", i3, Object.assign(Object.assign({}, o4), t4.preventScrollOnSwipe ? { passive: false } : {})], ["touchend", r3, o4]];
        s3.forEach(([t5, n4, i4]) => e5.addEventListener(t5, n4, i4)), a4 = () => s3.forEach(([t5, n4]) => e5.removeEventListener(t5, n4));
      }
      return a4;
    }, s2 = { ref: (t4) => {
      null !== t4 && e4((e5, n4) => {
        if (e5.el === t4) return e5;
        const i4 = {};
        return e5.el && e5.el !== t4 && e5.cleanUpTouch && (e5.cleanUpTouch(), i4.cleanUpTouch = void 0), n4.trackTouch && t4 && (i4.cleanUpTouch = o3(t4, n4)), Object.assign(Object.assign(Object.assign({}, e5), { el: t4 }), i4);
      });
    } };
    return t3.trackMouse && (s2.onMouseDown = n3), [s2, o3];
  }((e4) => n2.current = e4(n2.current, i2.current), { trackMouse: t2 }), [t2]);
  return n2.current = function(e4, t3, n3, i3) {
    return t3.trackTouch && e4.el ? e4.cleanUpTouch ? t3.preventScrollOnSwipe !== n3.preventScrollOnSwipe || t3.touchEventOptions.passive !== n3.touchEventOptions.passive ? (e4.cleanUpTouch(), Object.assign(Object.assign({}, e4), { cleanUpTouch: i3(e4.el, t3) })) : e4 : Object.assign(Object.assign({}, e4), { cleanUpTouch: i3(e4.el, t3) }) : (e4.cleanUpTouch && e4.cleanUpTouch(), Object.assign(Object.assign({}, e4), { cleanUpTouch: void 0 }));
  }(n2.current, i2.current, r2.current, l2), o2;
}
var pe = i(556);
function me(e3) {
  return me = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
    return typeof e4;
  } : function(e4) {
    return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
  }, me(e3);
}
function be(e3, t2) {
  var n2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e3);
    t2 && (i2 = i2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
    })), n2.push.apply(n2, i2);
  }
  return n2;
}
function ge(e3) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? be(Object(n2), true).forEach(function(t3) {
      ve(e3, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : be(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e3;
}
function ve(e3, t2, n2) {
  return (t2 = function(e4) {
    var t3 = function(e5) {
      if ("object" != me(e5) || !e5) return e5;
      var t4 = e5[Symbol.toPrimitive];
      if (void 0 !== t4) {
        var n3 = t4.call(e5, "string");
        if ("object" != me(n3)) return n3;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e5);
    }(e4);
    return "symbol" == me(t3) ? t3 : t3 + "";
  }(t2)) in e3 ? Object.defineProperty(e3, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t2] = n2, e3;
}
var ye = { description: "", fullscreen: "", isFullscreen: false, originalAlt: "", originalHeight: "", originalWidth: "", originalTitle: "", sizes: "", srcSet: "", loading: "eager" };
var we = s.default.memo(function(e3) {
  var t2 = ge(ge({}, ye), e3), n2 = t2.description, i2 = t2.fullscreen, r2 = t2.handleImageLoaded, a2 = t2.isFullscreen, o2 = t2.onImageError, l2 = t2.original, u2 = t2.originalAlt, c2 = t2.originalHeight, h2 = t2.originalWidth, d2 = t2.originalTitle, f2 = t2.sizes, p2 = t2.srcSet, m2 = t2.loading, b2 = a2 && i2 || l2;
  return s.default.createElement(s.default.Fragment, null, s.default.createElement("img", { className: "image-gallery-image", src: b2, alt: u2, srcSet: p2, height: c2, width: h2, sizes: f2, title: d2, onLoad: function(e4) {
    return r2(e4, l2);
  }, onError: o2, loading: m2 }), n2 && s.default.createElement("span", { className: "image-gallery-description" }, n2));
});
we.displayName = "Item", we.propTypes = { description: pe.string, fullscreen: pe.string, handleImageLoaded: pe.func.isRequired, isFullscreen: pe.bool, onImageError: pe.func.isRequired, original: pe.string.isRequired, originalAlt: pe.string, originalHeight: pe.string, originalWidth: pe.string, originalTitle: pe.string, sizes: pe.string, srcSet: pe.string, loading: pe.string };
var Se = we;
function Te(e3) {
  return Te = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
    return typeof e4;
  } : function(e4) {
    return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
  }, Te(e3);
}
function Oe(e3, t2) {
  var n2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e3);
    t2 && (i2 = i2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
    })), n2.push.apply(n2, i2);
  }
  return n2;
}
function Ee(e3) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? Oe(Object(n2), true).forEach(function(t3) {
      ke(e3, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Oe(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e3;
}
function ke(e3, t2, n2) {
  return (t2 = function(e4) {
    var t3 = function(e5) {
      if ("object" != Te(e5) || !e5) return e5;
      var t4 = e5[Symbol.toPrimitive];
      if (void 0 !== t4) {
        var n3 = t4.call(e5, "string");
        if ("object" != Te(n3)) return n3;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e5);
    }(e4);
    return "symbol" == Te(t3) ? t3 : t3 + "";
  }(t2)) in e3 ? Object.defineProperty(e3, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t2] = n2, e3;
}
var Ie = { left: s.default.createElement("polyline", { points: "15 18 9 12 15 6" }), right: s.default.createElement("polyline", { points: "9 18 15 12 9 6" }), top: s.default.createElement("polyline", { points: "6 15 12 9 18 15" }), bottom: s.default.createElement("polyline", { points: "6 9 12 15 18 9" }), maximize: s.default.createElement("path", { d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" }), minimize: s.default.createElement("path", { d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" }), play: s.default.createElement("polygon", { points: "5 3 19 12 5 21 5 3" }), pause: s.default.createElement(s.default.Fragment, null, s.default.createElement("rect", { x: "6", y: "4", width: "4", height: "16" }), s.default.createElement("rect", { x: "14", y: "4", width: "4", height: "16" })) };
var xe = { strokeWidth: 1, viewBox: "0 0 24 24" };
var Pe = function(e3) {
  var t2 = Ee(Ee({}, xe), e3), n2 = t2.strokeWidth, i2 = t2.viewBox, r2 = t2.icon;
  return s.default.createElement("svg", { className: "image-gallery-svg", xmlns: "http://www.w3.org/2000/svg", viewBox: i2, fill: "none", stroke: "currentColor", strokeWidth: n2, strokeLinecap: "round", strokeLinejoin: "round" }, Ie[r2]);
};
Pe.propTypes = { strokeWidth: pe.number, viewBox: pe.string, icon: (0, pe.oneOf)(["left", "right", "top", "bottom", "maximize", "minimize", "play", "pause"]).isRequired };
var je = Pe;
var _e = s.default.memo(function(e3) {
  var t2 = e3.isFullscreen, n2 = e3.onClick;
  return s.default.createElement("button", { type: "button", className: "image-gallery-icon image-gallery-fullscreen-button", onClick: n2, "aria-label": "Open Fullscreen" }, s.default.createElement(je, { strokeWidth: 2, icon: t2 ? "minimize" : "maximize" }));
});
_e.displayName = "Fullscreen", _e.propTypes = { isFullscreen: pe.bool.isRequired, onClick: pe.func.isRequired };
var Re = _e;
var Le = s.default.memo(function(e3) {
  var t2 = e3.disabled, n2 = e3.onClick;
  return s.default.createElement("button", { type: "button", className: "image-gallery-icon image-gallery-left-nav", disabled: t2, onClick: n2, "aria-label": "Previous Slide" }, s.default.createElement(je, { icon: "left", viewBox: "6 0 12 24" }));
});
Le.displayName = "LeftNav", Le.propTypes = { disabled: pe.bool.isRequired, onClick: pe.func.isRequired };
var Me = Le;
var De = s.default.memo(function(e3) {
  var t2 = e3.disabled, n2 = e3.onClick;
  return s.default.createElement("button", { type: "button", className: "image-gallery-icon image-gallery-right-nav", disabled: t2, onClick: n2, "aria-label": "Next Slide" }, s.default.createElement(je, { icon: "right", viewBox: "6 0 12 24" }));
});
De.displayName = "RightNav", De.propTypes = { disabled: pe.bool.isRequired, onClick: pe.func.isRequired };
var Ce = De;
var We = s.default.memo(function(e3) {
  var t2 = e3.isPlaying, n2 = e3.onClick;
  return s.default.createElement("button", { type: "button", className: "image-gallery-icon image-gallery-play-button", onClick: n2, "aria-label": "Play or Pause Slideshow" }, s.default.createElement(je, { strokeWidth: 2, icon: t2 ? "pause" : "play" }));
});
We.displayName = "PlayPause", We.propTypes = { isPlaying: pe.bool.isRequired, onClick: pe.func.isRequired };
var Ne = We;
function Fe(e3) {
  return Fe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
    return typeof e4;
  } : function(e4) {
    return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
  }, Fe(e3);
}
function ze() {
  return ze = Object.assign ? Object.assign.bind() : function(e3) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var i2 in n2) ({}).hasOwnProperty.call(n2, i2) && (e3[i2] = n2[i2]);
    }
    return e3;
  }, ze.apply(null, arguments);
}
function Be(e3, t2) {
  var n2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e3);
    t2 && (i2 = i2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
    })), n2.push.apply(n2, i2);
  }
  return n2;
}
function Ae(e3) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? Be(Object(n2), true).forEach(function(t3) {
      Ue(e3, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Be(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e3;
}
function Ue(e3, t2, n2) {
  return (t2 = function(e4) {
    var t3 = function(e5) {
      if ("object" != Fe(e5) || !e5) return e5;
      var t4 = e5[Symbol.toPrimitive];
      if (void 0 !== t4) {
        var n3 = t4.call(e5, "string");
        if ("object" != Fe(n3)) return n3;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(e5);
    }(e4);
    return "symbol" == Fe(t3) ? t3 : t3 + "";
  }(t2)) in e3 ? Object.defineProperty(e3, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t2] = n2, e3;
}
var qe = { className: "", delta: 0, onSwiping: function() {
}, onSwiped: function() {
} };
var Ge = function(e3) {
  var t2 = Ae(Ae({}, qe), e3), n2 = t2.children, i2 = t2.className, r2 = fe({ delta: t2.delta, onSwiping: t2.onSwiping, onSwiped: t2.onSwiped });
  return s.default.createElement("div", ze({}, r2, { className: i2 }), n2);
};
Ge.propTypes = { children: pe.node.isRequired, className: pe.string, delta: pe.number, onSwiped: pe.func, onSwiping: pe.func };
var He = Ge;
var Ve = s.default.memo(function(e3) {
  var t2 = e3.disabled, n2 = e3.onClick;
  return s.default.createElement("button", { type: "button", className: "image-gallery-icon image-gallery-top-nav", disabled: t2, onClick: n2, "aria-label": "Previous Slide" }, s.default.createElement(je, { icon: "top", viewBox: "6 0 12 24" }));
});
Ve.displayName = "TopNav", Ve.propTypes = { disabled: pe.bool.isRequired, onClick: pe.func.isRequired };
var Ke = Ve;
var Xe = s.default.memo(function(e3) {
  var t2 = e3.disabled, n2 = e3.onClick;
  return s.default.createElement("button", { type: "button", className: "image-gallery-icon image-gallery-bottom-nav", disabled: t2, onClick: n2, "aria-label": "Next Slide" }, s.default.createElement(je, { icon: "bottom", viewBox: "6 0 12 24" }));
});
Xe.displayName = "BottomNav", Xe.propTypes = { disabled: pe.bool.isRequired, onClick: pe.func.isRequired };
var Ye = Xe;
function $e(e3) {
  return $e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
    return typeof e4;
  } : function(e4) {
    return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
  }, $e(e3);
}
function Je(e3, t2) {
  var n2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(e3);
    t2 && (i2 = i2.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e3, t3).enumerable;
    })), n2.push.apply(n2, i2);
  }
  return n2;
}
function Qe(e3) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var n2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? Je(Object(n2), true).forEach(function(t3) {
      it(e3, t3, n2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : Je(Object(n2)).forEach(function(t3) {
      Object.defineProperty(e3, t3, Object.getOwnPropertyDescriptor(n2, t3));
    });
  }
  return e3;
}
function Ze(e3, t2) {
  for (var n2 = 0; n2 < t2.length; n2++) {
    var i2 = t2[n2];
    i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(e3, rt(i2.key), i2);
  }
}
function et() {
  try {
    var e3 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (e4) {
  }
  return (et = function() {
    return !!e3;
  })();
}
function tt(e3) {
  return tt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e4) {
    return e4.__proto__ || Object.getPrototypeOf(e4);
  }, tt(e3);
}
function nt(e3, t2) {
  return nt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e4, t3) {
    return e4.__proto__ = t3, e4;
  }, nt(e3, t2);
}
function it(e3, t2, n2) {
  return (t2 = rt(t2)) in e3 ? Object.defineProperty(e3, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t2] = n2, e3;
}
function rt(e3) {
  var t2 = function(e4) {
    if ("object" != $e(e4) || !e4) return e4;
    var t3 = e4[Symbol.toPrimitive];
    if (void 0 !== t3) {
      var n2 = t3.call(e4, "string");
      if ("object" != $e(n2)) return n2;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return String(e4);
  }(e3);
  return "symbol" == $e(t2) ? t2 : t2 + "";
}
var at = ["fullscreenchange", "MSFullscreenChange", "mozfullscreenchange", "webkitfullscreenchange"];
var ot = (0, pe.arrayOf)((0, pe.shape)({ srcSet: pe.string, media: pe.string }));
function st(e3) {
  var t2 = parseInt(e3.keyCode || e3.which || 0, 10);
  return 66 === t2 || 62 === t2;
}
var lt = function() {
  function e3(t2) {
    var n2, i2, r2, a2;
    return function(e4, t3) {
      if (!(e4 instanceof t3)) throw new TypeError("Cannot call a class as a function");
    }(this, e3), it((i2 = this, a2 = [t2], r2 = tt(r2 = e3), n2 = function(e4, t3) {
      if (t3 && ("object" == $e(t3) || "function" == typeof t3)) return t3;
      if (void 0 !== t3) throw new TypeError("Derived constructors may only return object or undefined");
      return function(e5) {
        if (void 0 === e5) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e5;
      }(e4);
    }(i2, et() ? Reflect.construct(r2, a2 || [], tt(i2).constructor) : r2.apply(i2, a2))), "onBulletClick", function(e4, t3) {
      var i3 = n2.props, r3 = i3.onBulletClick, a3 = i3.items, o2 = n2.state.currentIndex;
      e4.target.blur(), o2 !== t3 && (2 === a3.length ? n2.slideToIndexWithStyleReset(t3, e4) : n2.slideToIndex(t3, e4)), r3 && r3(e4, t3);
    }), n2.state = { currentIndex: t2.startIndex, thumbsTranslate: 0, thumbsSwipedTranslate: 0, currentSlideOffset: 0, galleryWidth: 0, galleryHeight: 0, thumbnailsWrapperWidth: 0, thumbnailsWrapperHeight: 0, thumbsStyle: { transition: "all ".concat(t2.slideDuration, "ms ease-out") }, isFullscreen: false, isSwipingThumbnail: false, isPlaying: false }, n2.loadedImages = {}, n2.imageGallery = s.default.createRef(), n2.thumbnailsWrapper = s.default.createRef(), n2.thumbnails = s.default.createRef(), n2.imageGallerySlideWrapper = s.default.createRef(), n2.handleImageLoaded = n2.handleImageLoaded.bind(n2), n2.handleKeyDown = n2.handleKeyDown.bind(n2), n2.handleMouseDown = n2.handleMouseDown.bind(n2), n2.handleResize = n2.handleResize.bind(n2), n2.handleOnSwiped = n2.handleOnSwiped.bind(n2), n2.handleScreenChange = n2.handleScreenChange.bind(n2), n2.handleSwiping = n2.handleSwiping.bind(n2), n2.handleThumbnailSwiping = n2.handleThumbnailSwiping.bind(n2), n2.handleOnThumbnailSwiped = n2.handleOnThumbnailSwiped.bind(n2), n2.onThumbnailMouseLeave = n2.onThumbnailMouseLeave.bind(n2), n2.handleImageError = n2.handleImageError.bind(n2), n2.pauseOrPlay = n2.pauseOrPlay.bind(n2), n2.renderThumbInner = n2.renderThumbInner.bind(n2), n2.renderItem = n2.renderItem.bind(n2), n2.slideLeft = n2.slideLeft.bind(n2), n2.slideRight = n2.slideRight.bind(n2), n2.toggleFullScreen = n2.toggleFullScreen.bind(n2), n2.togglePlay = n2.togglePlay.bind(n2), n2.unthrottledSlideToIndex = n2.slideToIndex, n2.slideToIndex = D(n2.unthrottledSlideToIndex, t2.slideDuration, { trailing: false }), t2.lazyLoad && (n2.lazyLoaded = []), n2;
  }
  return function(e4, t2) {
    if ("function" != typeof t2 && null !== t2) throw new TypeError("Super expression must either be null or a function");
    e4.prototype = Object.create(t2 && t2.prototype, { constructor: { value: e4, writable: true, configurable: true } }), Object.defineProperty(e4, "prototype", { writable: false }), t2 && nt(e4, t2);
  }(e3, s.default.Component), function(e4, t2) {
    return t2 && Ze(e4.prototype, t2), Object.defineProperty(e4, "prototype", { writable: false }), e4;
  }(e3, [{ key: "componentDidMount", value: function() {
    var e4 = this.props, t2 = e4.autoPlay, n2 = e4.useWindowKeyDown;
    t2 && this.play(), n2 ? window.addEventListener("keydown", this.handleKeyDown) : this.imageGallery.current.addEventListener("keydown", this.handleKeyDown), window.addEventListener("mousedown", this.handleMouseDown), this.initSlideWrapperResizeObserver(this.imageGallerySlideWrapper), this.initThumbnailWrapperResizeObserver(this.thumbnailsWrapper), this.addScreenChangeEvent();
  } }, { key: "componentDidUpdate", value: function(e4, t2) {
    var n2 = this.props, i2 = n2.items, r2 = n2.lazyLoad, a2 = n2.slideDuration, o2 = n2.slideInterval, s2 = n2.startIndex, l2 = n2.thumbnailPosition, u2 = n2.showThumbnails, c2 = n2.useWindowKeyDown, h2 = this.state, d2 = h2.currentIndex, f2 = h2.isPlaying, p2 = e4.items.length !== i2.length, m2 = !W()(e4.items, i2), b2 = e4.startIndex !== s2, g2 = e4.thumbnailPosition !== l2, v2 = e4.showThumbnails !== u2;
    o2 === e4.slideInterval && a2 === e4.slideDuration || f2 && (this.pause(), this.play()), g2 && (this.removeResizeObserver(), this.initSlideWrapperResizeObserver(this.imageGallerySlideWrapper), this.initThumbnailWrapperResizeObserver(this.thumbnailsWrapper)), v2 && u2 && this.initThumbnailWrapperResizeObserver(this.thumbnailsWrapper), v2 && !u2 && this.removeThumbnailsResizeObserver(), (p2 || v2) && this.handleResize(), t2.currentIndex !== d2 && this.slideThumbnailBar(), e4.slideDuration !== a2 && (this.slideToIndex = D(this.unthrottledSlideToIndex, a2, { trailing: false })), !r2 || e4.lazyLoad && !m2 || (this.lazyLoaded = []), c2 !== e4.useWindowKeyDown && (c2 ? (this.imageGallery.current.removeEventListener("keydown", this.handleKeyDown), window.addEventListener("keydown", this.handleKeyDown)) : (window.removeEventListener("keydown", this.handleKeyDown), this.imageGallery.current.addEventListener("keydown", this.handleKeyDown))), (b2 || m2) && this.setState({ currentIndex: s2, slideStyle: { transition: "none" } });
  } }, { key: "componentWillUnmount", value: function() {
    var e4 = this.props.useWindowKeyDown;
    window.removeEventListener("mousedown", this.handleMouseDown), this.removeScreenChangeEvent(), this.removeResizeObserver(), this.playPauseIntervalId && (window.clearInterval(this.playPauseIntervalId), this.playPauseIntervalId = null), this.transitionTimer && window.clearTimeout(this.transitionTimer), e4 ? window.removeEventListener("keydown", this.handleKeyDown) : this.imageGallery.current.removeEventListener("keydown", this.handleKeyDown);
  } }, { key: "onSliding", value: function() {
    var e4 = this, t2 = this.state, n2 = t2.currentIndex, i2 = t2.isTransitioning, r2 = this.props, a2 = r2.onSlide, o2 = r2.slideDuration;
    this.transitionTimer = window.setTimeout(function() {
      i2 && (e4.setState({ isTransitioning: !i2, isSwipingThumbnail: false }), a2 && a2(n2));
    }, o2 + 50);
  } }, { key: "onThumbnailClick", value: function(e4, t2) {
    var n2 = this.props, i2 = n2.onThumbnailClick, r2 = n2.items, a2 = this.state.currentIndex;
    e4.target.parentNode.parentNode.blur(), a2 !== t2 && (2 === r2.length ? this.slideToIndexWithStyleReset(t2, e4) : this.slideToIndex(t2, e4)), i2 && i2(e4, t2);
  } }, { key: "onThumbnailMouseOver", value: function(e4, t2) {
    var n2 = this;
    this.thumbnailMouseOverTimer && (window.clearTimeout(this.thumbnailMouseOverTimer), this.thumbnailMouseOverTimer = null), this.thumbnailMouseOverTimer = window.setTimeout(function() {
      n2.slideToIndex(t2), n2.pause();
    }, 300);
  } }, { key: "onThumbnailMouseLeave", value: function() {
    if (this.thumbnailMouseOverTimer) {
      var e4 = this.props.autoPlay;
      window.clearTimeout(this.thumbnailMouseOverTimer), this.thumbnailMouseOverTimer = null, e4 && this.play();
    }
  } }, { key: "setThumbsTranslate", value: function(e4) {
    this.setState({ thumbsTranslate: e4 });
  } }, { key: "setModalFullscreen", value: function(e4) {
    var t2 = this.props.onScreenChange;
    this.setState({ modalFullscreen: e4 }), t2 && t2(e4);
  } }, { key: "getThumbsTranslate", value: function(e4) {
    var t2, n2 = this.props, i2 = n2.disableThumbnailScroll, r2 = n2.items, a2 = this.state, o2 = a2.thumbnailsWrapperWidth, s2 = a2.thumbnailsWrapperHeight, l2 = this.thumbnails && this.thumbnails.current;
    if (i2) return 0;
    if (l2) {
      if (this.isThumbnailVertical()) {
        if (l2.scrollHeight <= s2) return 0;
        t2 = l2.scrollHeight - s2;
      } else {
        if (l2.scrollWidth <= o2 || o2 <= 0) return 0;
        t2 = l2.scrollWidth - o2;
      }
      return e4 * (t2 / (r2.length - 1));
    }
    return 0;
  } }, { key: "getThumbnailPositionClassName", value: function(e4) {
    switch (e4) {
      case "left":
        e4 = " ".concat("image-gallery-thumbnails-left");
        break;
      case "right":
        e4 = " ".concat("image-gallery-thumbnails-right");
        break;
      case "bottom":
        e4 = " ".concat("image-gallery-thumbnails-bottom");
        break;
      case "top":
        e4 = " ".concat("image-gallery-thumbnails-top");
    }
    return e4;
  } }, { key: "getAlignmentClassName", value: function(e4) {
    var t2 = this.state.currentIndex, n2 = this.props, i2 = n2.infinite, r2 = n2.items, a2 = "", o2 = "image-gallery-left", s2 = "image-gallery-right";
    switch (e4) {
      case t2 - 1:
        a2 = " ".concat(o2);
        break;
      case t2:
        a2 = " ".concat("image-gallery-center");
        break;
      case t2 + 1:
        a2 = " ".concat(s2);
    }
    return r2.length >= 3 && i2 && (0 === e4 && t2 === r2.length - 1 ? a2 = " ".concat(s2) : e4 === r2.length - 1 && 0 === t2 && (a2 = " ".concat(o2))), a2;
  } }, { key: "getTranslateXForTwoSlide", value: function(e4) {
    var t2 = this.state, n2 = t2.currentIndex, i2 = t2.currentSlideOffset, r2 = t2.previousIndex, a2 = n2 !== r2, o2 = 0 === e4 && 0 === r2, s2 = 1 === e4 && 1 === r2, l2 = 0 === e4 && 1 === n2, u2 = 1 === e4 && 0 === n2, c2 = 0 === i2, h2 = -100 * n2 + 100 * e4 + i2;
    return i2 > 0 ? this.direction = "left" : i2 < 0 && (this.direction = "right"), u2 && i2 > 0 && (h2 = -100 + i2), l2 && i2 < 0 && (h2 = 100 + i2), a2 ? o2 && c2 && "left" === this.direction ? h2 = 100 : s2 && c2 && "right" === this.direction && (h2 = -100) : (u2 && c2 && "left" === this.direction && (h2 = -100), l2 && c2 && "right" === this.direction && (h2 = 100)), h2;
  } }, { key: "getThumbnailBarHeight", value: function() {
    return this.isThumbnailVertical() ? { height: this.state.gallerySlideWrapperHeight } : {};
  } }, { key: "getSlideStyle", value: function(e4) {
    var t2 = this.state, n2 = t2.currentIndex, i2 = t2.currentSlideOffset, r2 = t2.slideStyle, a2 = this.props, o2 = a2.infinite, s2 = a2.items, l2 = a2.useTranslate3D, u2 = a2.isRTL, c2 = a2.slideVertically, h2 = -100 * n2, d2 = s2.length - 1, f2 = (h2 + 100 * e4) * (u2 ? -1 : 1) + i2;
    o2 && s2.length > 2 && (0 === n2 && e4 === d2 ? f2 = -100 * (u2 ? -1 : 1) + i2 : n2 === d2 && 0 === e4 && (f2 = 100 * (u2 ? -1 : 1) + i2)), o2 && 2 === s2.length && (f2 = this.getTranslateXForTwoSlide(e4));
    var p2 = c2 ? "translate(0, ".concat(f2, "%)") : "translate(".concat(f2, "%, 0)");
    return l2 && (p2 = c2 ? "translate3d(0, ".concat(f2, "%, 0)") : "translate3d(".concat(f2, "%, 0, 0)")), Qe({ display: this.isSlideVisible(e4) ? "inherit" : "none", WebkitTransform: p2, MozTransform: p2, msTransform: p2, OTransform: p2, transform: p2 }, r2);
  } }, { key: "getCurrentIndex", value: function() {
    return this.state.currentIndex;
  } }, { key: "getThumbnailStyle", value: function() {
    var e4, t2 = this.props, n2 = t2.useTranslate3D, i2 = t2.isRTL, r2 = this.state, a2 = r2.thumbsTranslate, o2 = r2.thumbsStyle, s2 = i2 ? -1 * a2 : a2;
    return this.isThumbnailVertical() ? (e4 = "translate(0, ".concat(a2, "px)"), n2 && (e4 = "translate3d(0, ".concat(a2, "px, 0)"))) : (e4 = "translate(".concat(s2, "px, 0)"), n2 && (e4 = "translate3d(".concat(s2, "px, 0, 0)"))), Qe({ WebkitTransform: e4, MozTransform: e4, msTransform: e4, OTransform: e4, transform: e4 }, o2);
  } }, { key: "getSlideItems", value: function() {
    var e4 = this, t2 = this.state.currentIndex, n2 = this.props, i2 = n2.items, r2 = n2.slideOnThumbnailOver, a2 = n2.onClick, l2 = n2.lazyLoad, u2 = n2.onTouchMove, c2 = n2.onTouchEnd, h2 = n2.onTouchStart, d2 = n2.onMouseOver, f2 = n2.onMouseLeave, p2 = n2.renderItem, m2 = n2.renderThumbInner, b2 = n2.showThumbnails, g2 = n2.showBullets, v2 = [], y2 = [], w2 = [];
    return i2.forEach(function(n3, i3) {
      var S2 = e4.getAlignmentClassName(i3), T2 = n3.originalClass ? " ".concat(n3.originalClass) : "", O2 = n3.thumbnailClass ? " ".concat(n3.thumbnailClass) : "", E2 = n3.renderItem || p2 || e4.renderItem, k2 = n3.renderThumbInner || m2 || e4.renderThumbInner, I2 = !l2 || S2 || e4.lazyLoaded[i3];
      I2 && l2 && !e4.lazyLoaded[i3] && (e4.lazyLoaded[i3] = true);
      var x2 = e4.getSlideStyle(i3), P2 = s.default.createElement("div", { "aria-label": "Go to Slide ".concat(i3 + 1), key: "slide-".concat(i3), tabIndex: "-1", className: "image-gallery-slide ".concat(S2, " ").concat(T2), style: x2, onClick: a2, onKeyUp: e4.handleSlideKeyUp, onTouchMove: u2, onTouchEnd: c2, onTouchStart: h2, onMouseOver: d2, onFocus: d2, onMouseLeave: f2, role: "button" }, I2 ? E2(n3) : s.default.createElement("div", { style: { height: "100%" } }));
      if (v2.push(P2), b2 && n3.thumbnail) {
        var j2 = o("image-gallery-thumbnail", O2, { active: t2 === i3 });
        y2.push(s.default.createElement("button", { key: "thumbnail-".concat(i3), type: "button", tabIndex: "0", "aria-pressed": t2 === i3 ? "true" : "false", "aria-label": "Go to Slide ".concat(i3 + 1), className: j2, onMouseLeave: r2 ? e4.onThumbnailMouseLeave : null, onMouseOver: function(t3) {
          return e4.handleThumbnailMouseOver(t3, i3);
        }, onFocus: function(t3) {
          return e4.handleThumbnailMouseOver(t3, i3);
        }, onKeyUp: function(t3) {
          return e4.handleThumbnailKeyUp(t3, i3);
        }, onClick: function(t3) {
          return e4.onThumbnailClick(t3, i3);
        } }, k2(n3)));
      }
      if (g2) {
        var _2 = o("image-gallery-bullet", n3.bulletClass, { active: t2 === i3 });
        w2.push(s.default.createElement("button", { type: "button", key: "bullet-".concat(i3), className: _2, onClick: function(t3) {
          return e4.onBulletClick(t3, i3);
        }, "aria-pressed": t2 === i3 ? "true" : "false", "aria-label": "Go to Slide ".concat(i3 + 1) }));
      }
    }), { slides: v2, thumbnails: y2, bullets: w2 };
  } }, { key: "ignoreIsTransitioning", value: function() {
    var e4 = this.props.items, t2 = this.state, n2 = t2.previousIndex, i2 = t2.currentIndex, r2 = e4.length - 1;
    return Math.abs(n2 - i2) > 1 && !(0 === n2 && i2 === r2) && !(n2 === r2 && 0 === i2);
  } }, { key: "isFirstOrLastSlide", value: function(e4) {
    return e4 === this.props.items.length - 1 || 0 === e4;
  } }, { key: "slideIsTransitioning", value: function(e4) {
    var t2 = this.state, n2 = t2.isTransitioning, i2 = t2.previousIndex, r2 = t2.currentIndex;
    return n2 && !(e4 === i2 || e4 === r2);
  } }, { key: "isSlideVisible", value: function(e4) {
    return !this.slideIsTransitioning(e4) || this.ignoreIsTransitioning() && !this.isFirstOrLastSlide(e4);
  } }, { key: "slideThumbnailBar", value: function() {
    var e4 = this.state, t2 = e4.currentIndex, n2 = e4.isSwipingThumbnail, i2 = -this.getThumbsTranslate(t2);
    n2 || (0 === t2 ? this.setState({ thumbsTranslate: 0, thumbsSwipedTranslate: 0 }) : this.setState({ thumbsTranslate: i2, thumbsSwipedTranslate: i2 }));
  } }, { key: "canSlide", value: function() {
    return this.props.items.length >= 2;
  } }, { key: "canSlideLeft", value: function() {
    var e4 = this.props, t2 = e4.infinite, n2 = e4.isRTL;
    return t2 || (n2 ? this.canSlideNext() : this.canSlidePrevious());
  } }, { key: "canSlideRight", value: function() {
    var e4 = this.props, t2 = e4.infinite, n2 = e4.isRTL;
    return t2 || (n2 ? this.canSlidePrevious() : this.canSlideNext());
  } }, { key: "canSlidePrevious", value: function() {
    return this.state.currentIndex > 0;
  } }, { key: "canSlideNext", value: function() {
    return this.state.currentIndex < this.props.items.length - 1;
  } }, { key: "handleSwiping", value: function(e4) {
    var t2 = e4.event, n2 = e4.absX, i2 = e4.absY, r2 = e4.dir, a2 = this.props, o2 = a2.disableSwipe, s2 = a2.stopPropagation, l2 = a2.swipingTransitionDuration, u2 = this.state, c2 = u2.galleryWidth, h2 = u2.galleryHeight, d2 = u2.isTransitioning, f2 = u2.swipingUpDown, p2 = u2.swipingLeftRight, m2 = this.props.slideVertically;
    if ((r2 !== oe && r2 !== se && !f2 || p2 || (f2 || this.setState({ swipingUpDown: true }), m2)) && (r2 !== re && r2 !== ae || p2 || this.setState({ swipingLeftRight: true }), !o2)) if (s2 && t2.preventDefault(), d2) this.setState({ currentSlideOffset: 0 });
    else {
      if ((r2 === re || r2 === ae) && m2) return;
      if ((r2 === oe || r2 === se) && !m2) return;
      var b2 = it(it(it(it({}, re, -1), ae, 1), oe, -1), se, 1)[r2], g2 = n2 / c2 * 100;
      m2 && (g2 = i2 / h2 * 100), Math.abs(g2) >= 100 && (g2 = 100);
      var v2 = { transition: "transform ".concat(l2, "ms ease-out") };
      this.setState({ currentSlideOffset: b2 * g2, slideStyle: v2 });
    }
  } }, { key: "handleThumbnailSwiping", value: function(e4) {
    var t2 = e4.event, n2 = e4.absX, i2 = e4.absY, r2 = e4.dir, a2 = this.props, o2 = a2.stopPropagation, s2 = a2.swipingThumbnailTransitionDuration, l2 = this.state, u2 = l2.thumbsSwipedTranslate, c2 = l2.thumbnailsWrapperHeight, h2 = l2.thumbnailsWrapperWidth, d2 = l2.swipingUpDown, f2 = l2.swipingLeftRight;
    if (this.isThumbnailVertical()) {
      if ((r2 === re || r2 === ae || f2) && !d2) return void (f2 || this.setState({ swipingLeftRight: true }));
      r2 !== oe && r2 !== se || d2 || this.setState({ swipingUpDown: true });
    } else {
      if ((r2 === oe || r2 === se || d2) && !f2) return void (d2 || this.setState({ swipingUpDown: true }));
      r2 !== re && r2 !== ae || f2 || this.setState({ swipingLeftRight: true });
    }
    var p2, m2, b2, g2, v2, y2 = this.thumbnails && this.thumbnails.current;
    if (this.isThumbnailVertical() ? (p2 = u2 + (r2 === se ? i2 : -i2), m2 = y2.scrollHeight - c2 + 20, b2 = Math.abs(p2) > m2, g2 = p2 > 20, v2 = y2.scrollHeight <= c2) : (p2 = u2 + (r2 === ae ? n2 : -n2), m2 = y2.scrollWidth - h2 + 20, b2 = Math.abs(p2) > m2, g2 = p2 > 20, v2 = y2.scrollWidth <= h2), !v2 && (r2 !== re && r2 !== oe || !b2) && (r2 !== ae && r2 !== se || !g2)) {
      o2 && t2.stopPropagation();
      var w2 = { transition: "transform ".concat(s2, "ms ease-out") };
      this.setState({ thumbsTranslate: p2, thumbsStyle: w2 });
    }
  } }, { key: "handleOnThumbnailSwiped", value: function() {
    var e4 = this.state.thumbsTranslate, t2 = this.props.slideDuration;
    this.resetSwipingDirection(), this.setState({ isSwipingThumbnail: true, thumbsSwipedTranslate: e4, thumbsStyle: { transition: "all ".concat(t2, "ms ease-out") } });
  } }, { key: "sufficientSwipe", value: function() {
    var e4 = this.state.currentSlideOffset, t2 = this.props.swipeThreshold;
    return Math.abs(e4) > t2;
  } }, { key: "resetSwipingDirection", value: function() {
    var e4 = this.state, t2 = e4.swipingUpDown, n2 = e4.swipingLeftRight;
    t2 && this.setState({ swipingUpDown: false }), n2 && this.setState({ swipingLeftRight: false });
  } }, { key: "handleOnSwiped", value: function(e4) {
    var t2 = e4.event, n2 = e4.dir, i2 = e4.velocity, r2 = this.props, a2 = r2.disableSwipe, o2 = r2.stopPropagation, s2 = r2.flickThreshold, l2 = this.props.slideVertically;
    if (!a2) {
      var u2 = this.props.isRTL;
      o2 && t2.stopPropagation(), this.resetSwipingDirection();
      var c2 = (n2 === re ? 1 : -1) * (u2 ? -1 : 1);
      l2 && (c2 = n2 === oe ? 1 : -1);
      var h2 = l2 ? i2 > s2 && !(n2 === re || n2 === ae) : i2 > s2 && !(n2 === oe || n2 === se);
      this.handleOnSwipedTo(c2, h2);
    }
  } }, { key: "handleOnSwipedTo", value: function(e4, t2) {
    var n2 = this.state, i2 = n2.currentIndex, r2 = n2.isTransitioning, a2 = i2;
    !this.sufficientSwipe() && !t2 || r2 || (a2 += e4), (-1 === e4 && !this.canSlideLeft() || 1 === e4 && !this.canSlideRight()) && (a2 = i2), this.unthrottledSlideToIndex(a2);
  } }, { key: "handleMouseDown", value: function() {
    this.imageGallery.current.classList.add("image-gallery-using-mouse");
  } }, { key: "handleKeyDown", value: function(e4) {
    var t2 = this.props, n2 = t2.disableKeyDown, i2 = t2.useBrowserFullscreen, r2 = this.state.isFullscreen;
    if (this.imageGallery.current.classList.remove("image-gallery-using-mouse"), !n2) switch (parseInt(e4.keyCode || e4.which || 0, 10)) {
      case 37:
        this.canSlideLeft() && !this.playPauseIntervalId && this.slideLeft(e4);
        break;
      case 39:
        this.canSlideRight() && !this.playPauseIntervalId && this.slideRight(e4);
        break;
      case 27:
        r2 && !i2 && this.exitFullScreen();
    }
  } }, { key: "handleImageError", value: function(e4) {
    var t2 = this.props.onErrorImageURL;
    t2 && -1 === e4.target.src.indexOf(t2) && (e4.target.src = t2);
  } }, { key: "removeThumbnailsResizeObserver", value: function() {
    this.resizeThumbnailWrapperObserver && this.thumbnailsWrapper && this.thumbnailsWrapper.current && (this.resizeThumbnailWrapperObserver.unobserve(this.thumbnailsWrapper.current), this.resizeThumbnailWrapperObserver = null);
  } }, { key: "removeResizeObserver", value: function() {
    this.resizeSlideWrapperObserver && this.imageGallerySlideWrapper && this.imageGallerySlideWrapper.current && (this.resizeSlideWrapperObserver.unobserve(this.imageGallerySlideWrapper.current), this.resizeSlideWrapperObserver = null), this.removeThumbnailsResizeObserver();
  } }, { key: "handleResize", value: function() {
    var e4 = this.state.currentIndex;
    this.imageGallery && (this.imageGallery && this.imageGallery.current && this.setState({ galleryWidth: this.imageGallery.current.offsetWidth, galleryHeight: this.imageGallery.current.offsetHeight }), this.imageGallerySlideWrapper && this.imageGallerySlideWrapper.current && this.setState({ gallerySlideWrapperHeight: this.imageGallerySlideWrapper.current.offsetHeight }), this.setThumbsTranslate(-this.getThumbsTranslate(e4)));
  } }, { key: "initSlideWrapperResizeObserver", value: function(e4) {
    var t2 = this;
    e4 && !e4.current || (this.resizeSlideWrapperObserver = new ie(M(function(e5) {
      e5 && e5.forEach(function(e6) {
        t2.setState({ thumbnailsWrapperWidth: e6.contentRect.width }, t2.handleResize);
      });
    }, 50)), this.resizeSlideWrapperObserver.observe(e4.current));
  } }, { key: "initThumbnailWrapperResizeObserver", value: function(e4) {
    var t2 = this;
    e4 && !e4.current || (this.resizeThumbnailWrapperObserver = new ie(M(function(e5) {
      e5 && e5.forEach(function(e6) {
        t2.setState({ thumbnailsWrapperHeight: e6.contentRect.height }, t2.handleResize);
      });
    }, 50)), this.resizeThumbnailWrapperObserver.observe(e4.current));
  } }, { key: "toggleFullScreen", value: function() {
    this.state.isFullscreen ? this.exitFullScreen() : this.fullScreen();
  } }, { key: "togglePlay", value: function() {
    this.playPauseIntervalId ? this.pause() : this.play();
  } }, { key: "handleScreenChange", value: function() {
    var e4 = this.props, t2 = e4.onScreenChange, n2 = e4.useBrowserFullscreen, i2 = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement, r2 = this.imageGallery.current === i2;
    t2 && t2(r2), n2 && this.setState({ isFullscreen: r2 });
  } }, { key: "slideToIndex", value: function(e4, t2) {
    var n2 = this.state, i2 = n2.currentIndex, r2 = n2.isTransitioning, a2 = this.props, o2 = a2.items, s2 = a2.slideDuration, l2 = a2.onBeforeSlide;
    if (!r2) {
      t2 && this.playPauseIntervalId && (this.pause(false), this.play(false));
      var u2 = o2.length - 1, c2 = e4;
      e4 < 0 ? c2 = u2 : e4 > u2 && (c2 = 0), l2 && c2 !== i2 && l2(c2), this.setState({ previousIndex: i2, currentIndex: c2, isTransitioning: c2 !== i2, currentSlideOffset: 0, slideStyle: { transition: "all ".concat(s2, "ms ease-out") } }, this.onSliding);
    }
  } }, { key: "slideLeft", value: function(e4) {
    var t2 = this.props.isRTL;
    this.slideTo(e4, t2 ? "right" : "left");
  } }, { key: "slideRight", value: function(e4) {
    var t2 = this.props.isRTL;
    this.slideTo(e4, t2 ? "left" : "right");
  } }, { key: "slideTo", value: function(e4, t2) {
    var n2 = this.state, i2 = n2.currentIndex, r2 = n2.isTransitioning, a2 = this.props.items, o2 = i2 + ("left" === t2 ? -1 : 1);
    r2 || (2 === a2.length ? this.slideToIndexWithStyleReset(o2, e4) : this.slideToIndex(o2, e4));
  } }, { key: "slideToIndexWithStyleReset", value: function(e4, t2) {
    var n2 = this, i2 = this.state, r2 = i2.currentIndex, a2 = i2.currentSlideOffset;
    this.setState({ currentSlideOffset: a2 + (r2 > e4 ? 1e-3 : -1e-3), slideStyle: { transition: "none" } }, function() {
      window.setTimeout(function() {
        return n2.slideToIndex(e4, t2);
      }, 25);
    });
  } }, { key: "handleThumbnailMouseOver", value: function(e4, t2) {
    this.props.slideOnThumbnailOver && this.onThumbnailMouseOver(e4, t2);
  } }, { key: "handleThumbnailKeyUp", value: function(e4, t2) {
    st(e4) && this.onThumbnailClick(e4, t2);
  } }, { key: "handleSlideKeyUp", value: function(e4) {
    st(e4) && (0, this.props.onClick)(e4);
  } }, { key: "isThumbnailVertical", value: function() {
    var e4 = this.props.thumbnailPosition;
    return "left" === e4 || "right" === e4;
  } }, { key: "addScreenChangeEvent", value: function() {
    var e4 = this;
    at.forEach(function(t2) {
      document.addEventListener(t2, e4.handleScreenChange);
    });
  } }, { key: "removeScreenChangeEvent", value: function() {
    var e4 = this;
    at.forEach(function(t2) {
      document.removeEventListener(t2, e4.handleScreenChange);
    });
  } }, { key: "fullScreen", value: function() {
    var e4 = this.props.useBrowserFullscreen, t2 = this.imageGallery.current;
    e4 ? t2.requestFullscreen ? t2.requestFullscreen() : t2.msRequestFullscreen ? t2.msRequestFullscreen() : t2.mozRequestFullScreen ? t2.mozRequestFullScreen() : t2.webkitRequestFullscreen ? t2.webkitRequestFullscreen() : this.setModalFullscreen(true) : this.setModalFullscreen(true), this.setState({ isFullscreen: true });
  } }, { key: "exitFullScreen", value: function() {
    var e4 = this.state.isFullscreen, t2 = this.props.useBrowserFullscreen;
    e4 && (t2 ? document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : this.setModalFullscreen(false) : this.setModalFullscreen(false), this.setState({ isFullscreen: false }));
  } }, { key: "pauseOrPlay", value: function() {
    var e4 = this.props.infinite, t2 = this.state.currentIndex;
    e4 || this.canSlideRight() ? this.slideToIndex(t2 + 1) : this.pause();
  } }, { key: "play", value: function() {
    var e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t2 = this.props, n2 = t2.onPlay, i2 = t2.slideInterval, r2 = t2.slideDuration, a2 = this.state.currentIndex;
    this.playPauseIntervalId || (this.setState({ isPlaying: true }), this.playPauseIntervalId = window.setInterval(this.pauseOrPlay, Math.max(i2, r2)), n2 && e4 && n2(a2));
  } }, { key: "pause", value: function() {
    var e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t2 = this.props.onPause, n2 = this.state.currentIndex;
    this.playPauseIntervalId && (window.clearInterval(this.playPauseIntervalId), this.playPauseIntervalId = null, this.setState({ isPlaying: false }), t2 && e4 && t2(n2));
  } }, { key: "isImageLoaded", value: function(e4) {
    return !!this.loadedImages[e4.original] || (this.loadedImages[e4.original] = true, false);
  } }, { key: "handleImageLoaded", value: function(e4, t2) {
    var n2 = this.props.onImageLoad;
    !this.loadedImages[t2] && n2 && (this.loadedImages[t2] = true, n2(e4));
  } }, { key: "renderItem", value: function(e4) {
    var t2 = this.state.isFullscreen, n2 = this.props.onImageError || this.handleImageError;
    return s.default.createElement(Se, { description: e4.description, fullscreen: e4.fullscreen, handleImageLoaded: this.handleImageLoaded, isFullscreen: t2, onImageError: n2, original: e4.original, originalAlt: e4.originalAlt, originalHeight: e4.originalHeight, originalWidth: e4.originalWidth, originalTitle: e4.originalTitle, sizes: e4.sizes, loading: e4.loading, srcSet: e4.srcSet });
  } }, { key: "renderThumbInner", value: function(e4) {
    var t2 = this.props.onThumbnailError || this.handleImageError;
    return s.default.createElement("span", { className: "image-gallery-thumbnail-inner" }, s.default.createElement("img", { className: "image-gallery-thumbnail-image", src: e4.thumbnail, height: e4.thumbnailHeight, width: e4.thumbnailWidth, alt: e4.thumbnailAlt, title: e4.thumbnailTitle, loading: e4.thumbnailLoading, onError: t2 }), e4.thumbnailLabel && s.default.createElement("div", { className: "image-gallery-thumbnail-label" }, e4.thumbnailLabel));
  } }, { key: "render", value: function() {
    var e4 = this.state, t2 = e4.currentIndex, n2 = e4.isFullscreen, i2 = e4.modalFullscreen, r2 = e4.isPlaying, a2 = this.props, l2 = a2.additionalClass, u2 = a2.disableThumbnailSwipe, c2 = a2.indexSeparator, h2 = a2.isRTL, d2 = a2.items, f2 = a2.thumbnailPosition, p2 = a2.renderFullscreenButton, m2 = a2.renderCustomControls, b2 = a2.renderLeftNav, g2 = a2.renderRightNav, v2 = a2.renderTopNav, y2 = a2.renderBottomNav, w2 = a2.showBullets, S2 = a2.showFullscreenButton, T2 = a2.showIndex, O2 = a2.showThumbnails, E2 = a2.showNav, k2 = a2.showPlayButton, I2 = a2.slideVertically, x2 = a2.renderPlayPauseButton, P2 = this.getThumbnailStyle(), j2 = this.getSlideItems(), _2 = j2.slides, R2 = j2.thumbnails, L2 = j2.bullets, M2 = o("image-gallery-slide-wrapper", this.getThumbnailPositionClassName(f2), { "image-gallery-rtl": h2 }), D2 = o("image-gallery-bullets", { "image-gallery-bullets-vertical": I2 }), C2 = s.default.createElement("div", { ref: this.imageGallerySlideWrapper, className: M2 }, m2 && m2(), this.canSlide() ? s.default.createElement(s.default.Fragment, null, E2 && s.default.createElement(s.default.Fragment, null, I2 ? v2(this.slideLeft, !this.canSlideLeft()) : b2(this.slideLeft, !this.canSlideLeft()), I2 ? y2(this.slideRight, !this.canSlideRight()) : g2(this.slideRight, !this.canSlideRight())), s.default.createElement(He, { className: "image-gallery-swipe", delta: 0, onSwiping: this.handleSwiping, onSwiped: this.handleOnSwiped }, s.default.createElement("div", { className: "image-gallery-slides" }, _2))) : s.default.createElement("div", { className: "image-gallery-slides" }, _2), k2 && x2(this.togglePlay, r2), w2 && s.default.createElement("div", { className: D2 }, s.default.createElement("div", { className: "image-gallery-bullets-container", role: "navigation", "aria-label": "Bullet Navigation" }, L2)), S2 && p2(this.toggleFullScreen, n2), T2 && s.default.createElement("div", { className: "image-gallery-index" }, s.default.createElement("span", { className: "image-gallery-index-current" }, t2 + 1), s.default.createElement("span", { className: "image-gallery-index-separator" }, c2), s.default.createElement("span", { className: "image-gallery-index-total" }, d2.length))), W2 = o("image-gallery", l2, { "fullscreen-modal": i2 }), N2 = o("image-gallery-content", this.getThumbnailPositionClassName(f2), { fullscreen: n2 }), F2 = o("image-gallery-thumbnails-wrapper", this.getThumbnailPositionClassName(f2), { "thumbnails-wrapper-rtl": !this.isThumbnailVertical() && h2 }, { "thumbnails-swipe-horizontal": !this.isThumbnailVertical() && !u2 }, { "thumbnails-swipe-vertical": this.isThumbnailVertical() && !u2 });
    return s.default.createElement("div", { ref: this.imageGallery, className: W2, "aria-live": "polite" }, s.default.createElement("div", { className: N2 }, ("bottom" === f2 || "right" === f2) && C2, O2 && R2.length > 0 ? s.default.createElement(He, { className: F2, delta: 0, onSwiping: !u2 && this.handleThumbnailSwiping, onSwiped: !u2 && this.handleOnThumbnailSwiped }, s.default.createElement("div", { className: "image-gallery-thumbnails", ref: this.thumbnailsWrapper, style: this.getThumbnailBarHeight() }, s.default.createElement("nav", { ref: this.thumbnails, className: "image-gallery-thumbnails-container", style: P2, "aria-label": "Thumbnail Navigation" }, R2))) : null, ("top" === f2 || "left" === f2) && C2));
  } }]);
}();
lt.propTypes = { flickThreshold: pe.number, items: (0, pe.arrayOf)((0, pe.shape)({ bulletClass: pe.string, bulletOnClick: pe.func, description: pe.string, original: pe.string, originalHeight: pe.number, originalWidth: pe.number, loading: pe.string, thumbnailHeight: pe.number, thumbnailWidth: pe.number, thumbnailLoading: pe.string, fullscreen: pe.string, originalAlt: pe.string, originalTitle: pe.string, thumbnail: pe.string, thumbnailAlt: pe.string, thumbnailLabel: pe.string, thumbnailTitle: pe.string, originalClass: pe.string, thumbnailClass: pe.string, renderItem: pe.func, renderThumbInner: pe.func, imageSet: ot, srcSet: pe.string, sizes: pe.string })).isRequired, showNav: pe.bool, autoPlay: pe.bool, lazyLoad: pe.bool, infinite: pe.bool, showIndex: pe.bool, showBullets: pe.bool, showThumbnails: pe.bool, showPlayButton: pe.bool, showFullscreenButton: pe.bool, disableThumbnailScroll: pe.bool, disableKeyDown: pe.bool, disableSwipe: pe.bool, disableThumbnailSwipe: pe.bool, useBrowserFullscreen: pe.bool, onErrorImageURL: pe.string, indexSeparator: pe.string, thumbnailPosition: (0, pe.oneOf)(["top", "bottom", "left", "right"]), startIndex: pe.number, slideDuration: pe.number, slideInterval: pe.number, slideOnThumbnailOver: pe.bool, swipeThreshold: pe.number, swipingTransitionDuration: pe.number, swipingThumbnailTransitionDuration: pe.number, onSlide: pe.func, onBeforeSlide: pe.func, onScreenChange: pe.func, onPause: pe.func, onPlay: pe.func, onClick: pe.func, onImageLoad: pe.func, onImageError: pe.func, onTouchMove: pe.func, onTouchEnd: pe.func, onTouchStart: pe.func, onMouseOver: pe.func, onMouseLeave: pe.func, onBulletClick: pe.func, onThumbnailError: pe.func, onThumbnailClick: pe.func, renderCustomControls: pe.func, renderLeftNav: pe.func, renderRightNav: pe.func, renderTopNav: pe.func, renderBottomNav: pe.func, renderPlayPauseButton: pe.func, renderFullscreenButton: pe.func, renderItem: pe.func, renderThumbInner: pe.func, stopPropagation: pe.bool, additionalClass: pe.string, useTranslate3D: pe.bool, isRTL: pe.bool, useWindowKeyDown: pe.bool, slideVertically: pe.bool }, lt.defaultProps = { onErrorImageURL: "", additionalClass: "", showNav: true, autoPlay: false, lazyLoad: false, infinite: true, showIndex: false, showBullets: false, showThumbnails: true, showPlayButton: true, showFullscreenButton: true, disableThumbnailScroll: false, disableKeyDown: false, disableSwipe: false, disableThumbnailSwipe: false, useTranslate3D: true, isRTL: false, useBrowserFullscreen: true, flickThreshold: 0.4, stopPropagation: false, indexSeparator: " / ", thumbnailPosition: "bottom", startIndex: 0, slideDuration: 450, swipingTransitionDuration: 0, swipingThumbnailTransitionDuration: 0, onSlide: null, onBeforeSlide: null, onScreenChange: null, onPause: null, onPlay: null, onClick: null, onImageLoad: null, onImageError: null, onTouchMove: null, onTouchEnd: null, onTouchStart: null, onMouseOver: null, onMouseLeave: null, onBulletClick: null, onThumbnailError: null, onThumbnailClick: null, renderCustomControls: null, renderThumbInner: null, renderItem: null, slideInterval: 3e3, slideOnThumbnailOver: false, swipeThreshold: 30, slideVertically: false, renderLeftNav: function(e3, t2) {
  return s.default.createElement(Me, { onClick: e3, disabled: t2 });
}, renderRightNav: function(e3, t2) {
  return s.default.createElement(Ce, { onClick: e3, disabled: t2 });
}, renderTopNav: function(e3, t2) {
  return s.default.createElement(Ke, { onClick: e3, disabled: t2 });
}, renderBottomNav: function(e3, t2) {
  return s.default.createElement(Ye, { onClick: e3, disabled: t2 });
}, renderPlayPauseButton: function(e3, t2) {
  return s.default.createElement(Ne, { onClick: e3, isPlaying: t2 });
}, renderFullscreenButton: function(e3, t2) {
  return s.default.createElement(Re, { onClick: e3, isFullscreen: t2 });
}, useWindowKeyDown: true };
var ut = lt;
var ct = r.A;
export {
  ct as default
};
//# sourceMappingURL=react-image-gallery.js.map
