import "../../index.css";
import { jsxs as jo, jsx as Vo } from "react/jsx-runtime";
import { useState as fn, useEffect as qi } from "react";
var Us = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Rn(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function Ho(n) {
  if (n.__esModule)
    return n;
  var t = n.default;
  if (typeof t == "function") {
    var e = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else
    e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(n).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(n, r);
    Object.defineProperty(e, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return n[r];
      }
    });
  }), e;
}
var Pi = { exports: {} };
const Wo = {}, Ko = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wo
}, Symbol.toStringTag, { value: "Module" })), Jo = /* @__PURE__ */ Ho(Ko);
Pi.exports;
(function(n) {
  (function(t, e) {
    function r(x, a) {
      if (!x)
        throw new Error(a || "Assertion failed");
    }
    function i(x, a) {
      x.super_ = a;
      var h = function() {
      };
      h.prototype = a.prototype, x.prototype = new h(), x.prototype.constructor = x;
    }
    function s(x, a, h) {
      if (s.isBN(x))
        return x;
      this.negative = 0, this.words = null, this.length = 0, this.red = null, x !== null && ((a === "le" || a === "be") && (h = a, a = 10), this._init(x || 0, a || 10, h || "be"));
    }
    typeof t == "object" ? t.exports = s : e.BN = s, s.BN = s, s.wordSize = 26;
    var o;
    try {
      typeof window < "u" && typeof window.Buffer < "u" ? o = window.Buffer : o = Jo.Buffer;
    } catch {
    }
    s.isBN = function(a) {
      return a instanceof s ? !0 : a !== null && typeof a == "object" && a.constructor.wordSize === s.wordSize && Array.isArray(a.words);
    }, s.max = function(a, h) {
      return a.cmp(h) > 0 ? a : h;
    }, s.min = function(a, h) {
      return a.cmp(h) < 0 ? a : h;
    }, s.prototype._init = function(a, h, p) {
      if (typeof a == "number")
        return this._initNumber(a, h, p);
      if (typeof a == "object")
        return this._initArray(a, h, p);
      h === "hex" && (h = 16), r(h === (h | 0) && h >= 2 && h <= 36), a = a.toString().replace(/\s+/g, "");
      var m = 0;
      a[0] === "-" && (m++, this.negative = 1), m < a.length && (h === 16 ? this._parseHex(a, m, p) : (this._parseBase(a, h, m), p === "le" && this._initArray(this.toArray(), h, p)));
    }, s.prototype._initNumber = function(a, h, p) {
      a < 0 && (this.negative = 1, a = -a), a < 67108864 ? (this.words = [a & 67108863], this.length = 1) : a < 4503599627370496 ? (this.words = [
        a & 67108863,
        a / 67108864 & 67108863
      ], this.length = 2) : (r(a < 9007199254740992), this.words = [
        a & 67108863,
        a / 67108864 & 67108863,
        1
      ], this.length = 3), p === "le" && this._initArray(this.toArray(), h, p);
    }, s.prototype._initArray = function(a, h, p) {
      if (r(typeof a.length == "number"), a.length <= 0)
        return this.words = [0], this.length = 1, this;
      this.length = Math.ceil(a.length / 3), this.words = new Array(this.length);
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var y, _, E = 0;
      if (p === "be")
        for (m = a.length - 1, y = 0; m >= 0; m -= 3)
          _ = a[m] | a[m - 1] << 8 | a[m - 2] << 16, this.words[y] |= _ << E & 67108863, this.words[y + 1] = _ >>> 26 - E & 67108863, E += 24, E >= 26 && (E -= 26, y++);
      else if (p === "le")
        for (m = 0, y = 0; m < a.length; m += 3)
          _ = a[m] | a[m + 1] << 8 | a[m + 2] << 16, this.words[y] |= _ << E & 67108863, this.words[y + 1] = _ >>> 26 - E & 67108863, E += 24, E >= 26 && (E -= 26, y++);
      return this.strip();
    };
    function u(x, a) {
      var h = x.charCodeAt(a);
      return h >= 65 && h <= 70 ? h - 55 : h >= 97 && h <= 102 ? h - 87 : h - 48 & 15;
    }
    function l(x, a, h) {
      var p = u(x, h);
      return h - 1 >= a && (p |= u(x, h - 1) << 4), p;
    }
    s.prototype._parseHex = function(a, h, p) {
      this.length = Math.ceil((a.length - h) / 6), this.words = new Array(this.length);
      for (var m = 0; m < this.length; m++)
        this.words[m] = 0;
      var y = 0, _ = 0, E;
      if (p === "be")
        for (m = a.length - 1; m >= h; m -= 2)
          E = l(a, h, m) << y, this.words[_] |= E & 67108863, y >= 18 ? (y -= 18, _ += 1, this.words[_] |= E >>> 26) : y += 8;
      else {
        var v = a.length - h;
        for (m = v % 2 === 0 ? h + 1 : h; m < a.length; m += 2)
          E = l(a, h, m) << y, this.words[_] |= E & 67108863, y >= 18 ? (y -= 18, _ += 1, this.words[_] |= E >>> 26) : y += 8;
      }
      this.strip();
    };
    function d(x, a, h, p) {
      for (var m = 0, y = Math.min(x.length, h), _ = a; _ < y; _++) {
        var E = x.charCodeAt(_) - 48;
        m *= p, E >= 49 ? m += E - 49 + 10 : E >= 17 ? m += E - 17 + 10 : m += E;
      }
      return m;
    }
    s.prototype._parseBase = function(a, h, p) {
      this.words = [0], this.length = 1;
      for (var m = 0, y = 1; y <= 67108863; y *= h)
        m++;
      m--, y = y / h | 0;
      for (var _ = a.length - p, E = _ % m, v = Math.min(_, _ - E) + p, f = 0, b = p; b < v; b += m)
        f = d(a, b, b + m, h), this.imuln(y), this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
      if (E !== 0) {
        var O = 1;
        for (f = d(a, b, a.length, h), b = 0; b < E; b++)
          O *= h;
        this.imuln(O), this.words[0] + f < 67108864 ? this.words[0] += f : this._iaddn(f);
      }
      this.strip();
    }, s.prototype.copy = function(a) {
      a.words = new Array(this.length);
      for (var h = 0; h < this.length; h++)
        a.words[h] = this.words[h];
      a.length = this.length, a.negative = this.negative, a.red = this.red;
    }, s.prototype.clone = function() {
      var a = new s(null);
      return this.copy(a), a;
    }, s.prototype._expand = function(a) {
      for (; this.length < a; )
        this.words[this.length++] = 0;
      return this;
    }, s.prototype.strip = function() {
      for (; this.length > 1 && this.words[this.length - 1] === 0; )
        this.length--;
      return this._normSign();
    }, s.prototype._normSign = function() {
      return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
    }, s.prototype.inspect = function() {
      return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
    };
    var g = [
      "",
      "0",
      "00",
      "000",
      "0000",
      "00000",
      "000000",
      "0000000",
      "00000000",
      "000000000",
      "0000000000",
      "00000000000",
      "000000000000",
      "0000000000000",
      "00000000000000",
      "000000000000000",
      "0000000000000000",
      "00000000000000000",
      "000000000000000000",
      "0000000000000000000",
      "00000000000000000000",
      "000000000000000000000",
      "0000000000000000000000",
      "00000000000000000000000",
      "000000000000000000000000",
      "0000000000000000000000000"
    ], w = [
      0,
      0,
      25,
      16,
      12,
      11,
      10,
      9,
      8,
      8,
      7,
      7,
      7,
      7,
      6,
      6,
      6,
      6,
      6,
      6,
      6,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ], A = [
      0,
      0,
      33554432,
      43046721,
      16777216,
      48828125,
      60466176,
      40353607,
      16777216,
      43046721,
      1e7,
      19487171,
      35831808,
      62748517,
      7529536,
      11390625,
      16777216,
      24137569,
      34012224,
      47045881,
      64e6,
      4084101,
      5153632,
      6436343,
      7962624,
      9765625,
      11881376,
      14348907,
      17210368,
      20511149,
      243e5,
      28629151,
      33554432,
      39135393,
      45435424,
      52521875,
      60466176
    ];
    s.prototype.toString = function(a, h) {
      a = a || 10, h = h | 0 || 1;
      var p;
      if (a === 16 || a === "hex") {
        p = "";
        for (var m = 0, y = 0, _ = 0; _ < this.length; _++) {
          var E = this.words[_], v = ((E << m | y) & 16777215).toString(16);
          y = E >>> 24 - m & 16777215, y !== 0 || _ !== this.length - 1 ? p = g[6 - v.length] + v + p : p = v + p, m += 2, m >= 26 && (m -= 26, _--);
        }
        for (y !== 0 && (p = y.toString(16) + p); p.length % h !== 0; )
          p = "0" + p;
        return this.negative !== 0 && (p = "-" + p), p;
      }
      if (a === (a | 0) && a >= 2 && a <= 36) {
        var f = w[a], b = A[a];
        p = "";
        var O = this.clone();
        for (O.negative = 0; !O.isZero(); ) {
          var q = O.modn(b).toString(a);
          O = O.idivn(b), O.isZero() ? p = q + p : p = g[f - q.length] + q + p;
        }
        for (this.isZero() && (p = "0" + p); p.length % h !== 0; )
          p = "0" + p;
        return this.negative !== 0 && (p = "-" + p), p;
      }
      r(!1, "Base should be between 2 and 36");
    }, s.prototype.toNumber = function() {
      var a = this.words[0];
      return this.length === 2 ? a += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? a += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -a : a;
    }, s.prototype.toJSON = function() {
      return this.toString(16);
    }, s.prototype.toBuffer = function(a, h) {
      return r(typeof o < "u"), this.toArrayLike(o, a, h);
    }, s.prototype.toArray = function(a, h) {
      return this.toArrayLike(Array, a, h);
    }, s.prototype.toArrayLike = function(a, h, p) {
      var m = this.byteLength(), y = p || Math.max(1, m);
      r(m <= y, "byte array longer than desired length"), r(y > 0, "Requested array length <= 0"), this.strip();
      var _ = h === "le", E = new a(y), v, f, b = this.clone();
      if (_) {
        for (f = 0; !b.isZero(); f++)
          v = b.andln(255), b.iushrn(8), E[f] = v;
        for (; f < y; f++)
          E[f] = 0;
      } else {
        for (f = 0; f < y - m; f++)
          E[f] = 0;
        for (f = 0; !b.isZero(); f++)
          v = b.andln(255), b.iushrn(8), E[y - f - 1] = v;
      }
      return E;
    }, Math.clz32 ? s.prototype._countBits = function(a) {
      return 32 - Math.clz32(a);
    } : s.prototype._countBits = function(a) {
      var h = a, p = 0;
      return h >= 4096 && (p += 13, h >>>= 13), h >= 64 && (p += 7, h >>>= 7), h >= 8 && (p += 4, h >>>= 4), h >= 2 && (p += 2, h >>>= 2), p + h;
    }, s.prototype._zeroBits = function(a) {
      if (a === 0)
        return 26;
      var h = a, p = 0;
      return h & 8191 || (p += 13, h >>>= 13), h & 127 || (p += 7, h >>>= 7), h & 15 || (p += 4, h >>>= 4), h & 3 || (p += 2, h >>>= 2), h & 1 || p++, p;
    }, s.prototype.bitLength = function() {
      var a = this.words[this.length - 1], h = this._countBits(a);
      return (this.length - 1) * 26 + h;
    };
    function P(x) {
      for (var a = new Array(x.bitLength()), h = 0; h < a.length; h++) {
        var p = h / 26 | 0, m = h % 26;
        a[h] = (x.words[p] & 1 << m) >>> m;
      }
      return a;
    }
    s.prototype.zeroBits = function() {
      if (this.isZero())
        return 0;
      for (var a = 0, h = 0; h < this.length; h++) {
        var p = this._zeroBits(this.words[h]);
        if (a += p, p !== 26)
          break;
      }
      return a;
    }, s.prototype.byteLength = function() {
      return Math.ceil(this.bitLength() / 8);
    }, s.prototype.toTwos = function(a) {
      return this.negative !== 0 ? this.abs().inotn(a).iaddn(1) : this.clone();
    }, s.prototype.fromTwos = function(a) {
      return this.testn(a - 1) ? this.notn(a).iaddn(1).ineg() : this.clone();
    }, s.prototype.isNeg = function() {
      return this.negative !== 0;
    }, s.prototype.neg = function() {
      return this.clone().ineg();
    }, s.prototype.ineg = function() {
      return this.isZero() || (this.negative ^= 1), this;
    }, s.prototype.iuor = function(a) {
      for (; this.length < a.length; )
        this.words[this.length++] = 0;
      for (var h = 0; h < a.length; h++)
        this.words[h] = this.words[h] | a.words[h];
      return this.strip();
    }, s.prototype.ior = function(a) {
      return r((this.negative | a.negative) === 0), this.iuor(a);
    }, s.prototype.or = function(a) {
      return this.length > a.length ? this.clone().ior(a) : a.clone().ior(this);
    }, s.prototype.uor = function(a) {
      return this.length > a.length ? this.clone().iuor(a) : a.clone().iuor(this);
    }, s.prototype.iuand = function(a) {
      var h;
      this.length > a.length ? h = a : h = this;
      for (var p = 0; p < h.length; p++)
        this.words[p] = this.words[p] & a.words[p];
      return this.length = h.length, this.strip();
    }, s.prototype.iand = function(a) {
      return r((this.negative | a.negative) === 0), this.iuand(a);
    }, s.prototype.and = function(a) {
      return this.length > a.length ? this.clone().iand(a) : a.clone().iand(this);
    }, s.prototype.uand = function(a) {
      return this.length > a.length ? this.clone().iuand(a) : a.clone().iuand(this);
    }, s.prototype.iuxor = function(a) {
      var h, p;
      this.length > a.length ? (h = this, p = a) : (h = a, p = this);
      for (var m = 0; m < p.length; m++)
        this.words[m] = h.words[m] ^ p.words[m];
      if (this !== h)
        for (; m < h.length; m++)
          this.words[m] = h.words[m];
      return this.length = h.length, this.strip();
    }, s.prototype.ixor = function(a) {
      return r((this.negative | a.negative) === 0), this.iuxor(a);
    }, s.prototype.xor = function(a) {
      return this.length > a.length ? this.clone().ixor(a) : a.clone().ixor(this);
    }, s.prototype.uxor = function(a) {
      return this.length > a.length ? this.clone().iuxor(a) : a.clone().iuxor(this);
    }, s.prototype.inotn = function(a) {
      r(typeof a == "number" && a >= 0);
      var h = Math.ceil(a / 26) | 0, p = a % 26;
      this._expand(h), p > 0 && h--;
      for (var m = 0; m < h; m++)
        this.words[m] = ~this.words[m] & 67108863;
      return p > 0 && (this.words[m] = ~this.words[m] & 67108863 >> 26 - p), this.strip();
    }, s.prototype.notn = function(a) {
      return this.clone().inotn(a);
    }, s.prototype.setn = function(a, h) {
      r(typeof a == "number" && a >= 0);
      var p = a / 26 | 0, m = a % 26;
      return this._expand(p + 1), h ? this.words[p] = this.words[p] | 1 << m : this.words[p] = this.words[p] & ~(1 << m), this.strip();
    }, s.prototype.iadd = function(a) {
      var h;
      if (this.negative !== 0 && a.negative === 0)
        return this.negative = 0, h = this.isub(a), this.negative ^= 1, this._normSign();
      if (this.negative === 0 && a.negative !== 0)
        return a.negative = 0, h = this.isub(a), a.negative = 1, h._normSign();
      var p, m;
      this.length > a.length ? (p = this, m = a) : (p = a, m = this);
      for (var y = 0, _ = 0; _ < m.length; _++)
        h = (p.words[_] | 0) + (m.words[_] | 0) + y, this.words[_] = h & 67108863, y = h >>> 26;
      for (; y !== 0 && _ < p.length; _++)
        h = (p.words[_] | 0) + y, this.words[_] = h & 67108863, y = h >>> 26;
      if (this.length = p.length, y !== 0)
        this.words[this.length] = y, this.length++;
      else if (p !== this)
        for (; _ < p.length; _++)
          this.words[_] = p.words[_];
      return this;
    }, s.prototype.add = function(a) {
      var h;
      return a.negative !== 0 && this.negative === 0 ? (a.negative = 0, h = this.sub(a), a.negative ^= 1, h) : a.negative === 0 && this.negative !== 0 ? (this.negative = 0, h = a.sub(this), this.negative = 1, h) : this.length > a.length ? this.clone().iadd(a) : a.clone().iadd(this);
    }, s.prototype.isub = function(a) {
      if (a.negative !== 0) {
        a.negative = 0;
        var h = this.iadd(a);
        return a.negative = 1, h._normSign();
      } else if (this.negative !== 0)
        return this.negative = 0, this.iadd(a), this.negative = 1, this._normSign();
      var p = this.cmp(a);
      if (p === 0)
        return this.negative = 0, this.length = 1, this.words[0] = 0, this;
      var m, y;
      p > 0 ? (m = this, y = a) : (m = a, y = this);
      for (var _ = 0, E = 0; E < y.length; E++)
        h = (m.words[E] | 0) - (y.words[E] | 0) + _, _ = h >> 26, this.words[E] = h & 67108863;
      for (; _ !== 0 && E < m.length; E++)
        h = (m.words[E] | 0) + _, _ = h >> 26, this.words[E] = h & 67108863;
      if (_ === 0 && E < m.length && m !== this)
        for (; E < m.length; E++)
          this.words[E] = m.words[E];
      return this.length = Math.max(this.length, E), m !== this && (this.negative = 1), this.strip();
    }, s.prototype.sub = function(a) {
      return this.clone().isub(a);
    };
    function N(x, a, h) {
      h.negative = a.negative ^ x.negative;
      var p = x.length + a.length | 0;
      h.length = p, p = p - 1 | 0;
      var m = x.words[0] | 0, y = a.words[0] | 0, _ = m * y, E = _ & 67108863, v = _ / 67108864 | 0;
      h.words[0] = E;
      for (var f = 1; f < p; f++) {
        for (var b = v >>> 26, O = v & 67108863, q = Math.min(f, a.length - 1), z = Math.max(0, f - x.length + 1); z <= q; z++) {
          var c = f - z | 0;
          m = x.words[c] | 0, y = a.words[z] | 0, _ = m * y + O, b += _ / 67108864 | 0, O = _ & 67108863;
        }
        h.words[f] = O | 0, v = b | 0;
      }
      return v !== 0 ? h.words[f] = v | 0 : h.length--, h.strip();
    }
    var I = function(a, h, p) {
      var m = a.words, y = h.words, _ = p.words, E = 0, v, f, b, O = m[0] | 0, q = O & 8191, z = O >>> 13, c = m[1] | 0, S = c & 8191, k = c >>> 13, T = m[2] | 0, B = T & 8191, F = T >>> 13, W = m[3] | 0, D = W & 8191, tt = W >>> 13, K = m[4] | 0, Z = K & 8191, ut = K >>> 13, sr = m[5] | 0, ht = sr & 8191, lt = sr >>> 13, or = m[6] | 0, ct = or & 8191, dt = or >>> 13, ar = m[7] | 0, pt = ar & 8191, mt = ar >>> 13, fr = m[8] | 0, gt = fr & 8191, vt = fr >>> 13, ur = m[9] | 0, yt = ur & 8191, bt = ur >>> 13, hr = y[0] | 0, wt = hr & 8191, xt = hr >>> 13, lr = y[1] | 0, _t = lr & 8191, Et = lr >>> 13, cr = y[2] | 0, At = cr & 8191, Mt = cr >>> 13, dr = y[3] | 0, Nt = dr & 8191, Pt = dr >>> 13, pr = y[4] | 0, St = pr & 8191, kt = pr >>> 13, mr = y[5] | 0, Rt = mr & 8191, It = mr >>> 13, gr = y[6] | 0, Tt = gr & 8191, Ct = gr >>> 13, vr = y[7] | 0, Bt = vr & 8191, Ot = vr >>> 13, yr = y[8] | 0, Lt = yr & 8191, Ft = yr >>> 13, br = y[9] | 0, Ut = br & 8191, Dt = br >>> 13;
      p.negative = a.negative ^ h.negative, p.length = 19, v = Math.imul(q, wt), f = Math.imul(q, xt), f = f + Math.imul(z, wt) | 0, b = Math.imul(z, xt);
      var We = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (We >>> 26) | 0, We &= 67108863, v = Math.imul(S, wt), f = Math.imul(S, xt), f = f + Math.imul(k, wt) | 0, b = Math.imul(k, xt), v = v + Math.imul(q, _t) | 0, f = f + Math.imul(q, Et) | 0, f = f + Math.imul(z, _t) | 0, b = b + Math.imul(z, Et) | 0;
      var Ke = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Ke >>> 26) | 0, Ke &= 67108863, v = Math.imul(B, wt), f = Math.imul(B, xt), f = f + Math.imul(F, wt) | 0, b = Math.imul(F, xt), v = v + Math.imul(S, _t) | 0, f = f + Math.imul(S, Et) | 0, f = f + Math.imul(k, _t) | 0, b = b + Math.imul(k, Et) | 0, v = v + Math.imul(q, At) | 0, f = f + Math.imul(q, Mt) | 0, f = f + Math.imul(z, At) | 0, b = b + Math.imul(z, Mt) | 0;
      var Je = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Je >>> 26) | 0, Je &= 67108863, v = Math.imul(D, wt), f = Math.imul(D, xt), f = f + Math.imul(tt, wt) | 0, b = Math.imul(tt, xt), v = v + Math.imul(B, _t) | 0, f = f + Math.imul(B, Et) | 0, f = f + Math.imul(F, _t) | 0, b = b + Math.imul(F, Et) | 0, v = v + Math.imul(S, At) | 0, f = f + Math.imul(S, Mt) | 0, f = f + Math.imul(k, At) | 0, b = b + Math.imul(k, Mt) | 0, v = v + Math.imul(q, Nt) | 0, f = f + Math.imul(q, Pt) | 0, f = f + Math.imul(z, Nt) | 0, b = b + Math.imul(z, Pt) | 0;
      var Xe = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Xe >>> 26) | 0, Xe &= 67108863, v = Math.imul(Z, wt), f = Math.imul(Z, xt), f = f + Math.imul(ut, wt) | 0, b = Math.imul(ut, xt), v = v + Math.imul(D, _t) | 0, f = f + Math.imul(D, Et) | 0, f = f + Math.imul(tt, _t) | 0, b = b + Math.imul(tt, Et) | 0, v = v + Math.imul(B, At) | 0, f = f + Math.imul(B, Mt) | 0, f = f + Math.imul(F, At) | 0, b = b + Math.imul(F, Mt) | 0, v = v + Math.imul(S, Nt) | 0, f = f + Math.imul(S, Pt) | 0, f = f + Math.imul(k, Nt) | 0, b = b + Math.imul(k, Pt) | 0, v = v + Math.imul(q, St) | 0, f = f + Math.imul(q, kt) | 0, f = f + Math.imul(z, St) | 0, b = b + Math.imul(z, kt) | 0;
      var Ze = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Ze >>> 26) | 0, Ze &= 67108863, v = Math.imul(ht, wt), f = Math.imul(ht, xt), f = f + Math.imul(lt, wt) | 0, b = Math.imul(lt, xt), v = v + Math.imul(Z, _t) | 0, f = f + Math.imul(Z, Et) | 0, f = f + Math.imul(ut, _t) | 0, b = b + Math.imul(ut, Et) | 0, v = v + Math.imul(D, At) | 0, f = f + Math.imul(D, Mt) | 0, f = f + Math.imul(tt, At) | 0, b = b + Math.imul(tt, Mt) | 0, v = v + Math.imul(B, Nt) | 0, f = f + Math.imul(B, Pt) | 0, f = f + Math.imul(F, Nt) | 0, b = b + Math.imul(F, Pt) | 0, v = v + Math.imul(S, St) | 0, f = f + Math.imul(S, kt) | 0, f = f + Math.imul(k, St) | 0, b = b + Math.imul(k, kt) | 0, v = v + Math.imul(q, Rt) | 0, f = f + Math.imul(q, It) | 0, f = f + Math.imul(z, Rt) | 0, b = b + Math.imul(z, It) | 0;
      var Ye = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Ye >>> 26) | 0, Ye &= 67108863, v = Math.imul(ct, wt), f = Math.imul(ct, xt), f = f + Math.imul(dt, wt) | 0, b = Math.imul(dt, xt), v = v + Math.imul(ht, _t) | 0, f = f + Math.imul(ht, Et) | 0, f = f + Math.imul(lt, _t) | 0, b = b + Math.imul(lt, Et) | 0, v = v + Math.imul(Z, At) | 0, f = f + Math.imul(Z, Mt) | 0, f = f + Math.imul(ut, At) | 0, b = b + Math.imul(ut, Mt) | 0, v = v + Math.imul(D, Nt) | 0, f = f + Math.imul(D, Pt) | 0, f = f + Math.imul(tt, Nt) | 0, b = b + Math.imul(tt, Pt) | 0, v = v + Math.imul(B, St) | 0, f = f + Math.imul(B, kt) | 0, f = f + Math.imul(F, St) | 0, b = b + Math.imul(F, kt) | 0, v = v + Math.imul(S, Rt) | 0, f = f + Math.imul(S, It) | 0, f = f + Math.imul(k, Rt) | 0, b = b + Math.imul(k, It) | 0, v = v + Math.imul(q, Tt) | 0, f = f + Math.imul(q, Ct) | 0, f = f + Math.imul(z, Tt) | 0, b = b + Math.imul(z, Ct) | 0;
      var Qe = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Qe >>> 26) | 0, Qe &= 67108863, v = Math.imul(pt, wt), f = Math.imul(pt, xt), f = f + Math.imul(mt, wt) | 0, b = Math.imul(mt, xt), v = v + Math.imul(ct, _t) | 0, f = f + Math.imul(ct, Et) | 0, f = f + Math.imul(dt, _t) | 0, b = b + Math.imul(dt, Et) | 0, v = v + Math.imul(ht, At) | 0, f = f + Math.imul(ht, Mt) | 0, f = f + Math.imul(lt, At) | 0, b = b + Math.imul(lt, Mt) | 0, v = v + Math.imul(Z, Nt) | 0, f = f + Math.imul(Z, Pt) | 0, f = f + Math.imul(ut, Nt) | 0, b = b + Math.imul(ut, Pt) | 0, v = v + Math.imul(D, St) | 0, f = f + Math.imul(D, kt) | 0, f = f + Math.imul(tt, St) | 0, b = b + Math.imul(tt, kt) | 0, v = v + Math.imul(B, Rt) | 0, f = f + Math.imul(B, It) | 0, f = f + Math.imul(F, Rt) | 0, b = b + Math.imul(F, It) | 0, v = v + Math.imul(S, Tt) | 0, f = f + Math.imul(S, Ct) | 0, f = f + Math.imul(k, Tt) | 0, b = b + Math.imul(k, Ct) | 0, v = v + Math.imul(q, Bt) | 0, f = f + Math.imul(q, Ot) | 0, f = f + Math.imul(z, Bt) | 0, b = b + Math.imul(z, Ot) | 0;
      var qn = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (qn >>> 26) | 0, qn &= 67108863, v = Math.imul(gt, wt), f = Math.imul(gt, xt), f = f + Math.imul(vt, wt) | 0, b = Math.imul(vt, xt), v = v + Math.imul(pt, _t) | 0, f = f + Math.imul(pt, Et) | 0, f = f + Math.imul(mt, _t) | 0, b = b + Math.imul(mt, Et) | 0, v = v + Math.imul(ct, At) | 0, f = f + Math.imul(ct, Mt) | 0, f = f + Math.imul(dt, At) | 0, b = b + Math.imul(dt, Mt) | 0, v = v + Math.imul(ht, Nt) | 0, f = f + Math.imul(ht, Pt) | 0, f = f + Math.imul(lt, Nt) | 0, b = b + Math.imul(lt, Pt) | 0, v = v + Math.imul(Z, St) | 0, f = f + Math.imul(Z, kt) | 0, f = f + Math.imul(ut, St) | 0, b = b + Math.imul(ut, kt) | 0, v = v + Math.imul(D, Rt) | 0, f = f + Math.imul(D, It) | 0, f = f + Math.imul(tt, Rt) | 0, b = b + Math.imul(tt, It) | 0, v = v + Math.imul(B, Tt) | 0, f = f + Math.imul(B, Ct) | 0, f = f + Math.imul(F, Tt) | 0, b = b + Math.imul(F, Ct) | 0, v = v + Math.imul(S, Bt) | 0, f = f + Math.imul(S, Ot) | 0, f = f + Math.imul(k, Bt) | 0, b = b + Math.imul(k, Ot) | 0, v = v + Math.imul(q, Lt) | 0, f = f + Math.imul(q, Ft) | 0, f = f + Math.imul(z, Lt) | 0, b = b + Math.imul(z, Ft) | 0;
      var zn = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (zn >>> 26) | 0, zn &= 67108863, v = Math.imul(yt, wt), f = Math.imul(yt, xt), f = f + Math.imul(bt, wt) | 0, b = Math.imul(bt, xt), v = v + Math.imul(gt, _t) | 0, f = f + Math.imul(gt, Et) | 0, f = f + Math.imul(vt, _t) | 0, b = b + Math.imul(vt, Et) | 0, v = v + Math.imul(pt, At) | 0, f = f + Math.imul(pt, Mt) | 0, f = f + Math.imul(mt, At) | 0, b = b + Math.imul(mt, Mt) | 0, v = v + Math.imul(ct, Nt) | 0, f = f + Math.imul(ct, Pt) | 0, f = f + Math.imul(dt, Nt) | 0, b = b + Math.imul(dt, Pt) | 0, v = v + Math.imul(ht, St) | 0, f = f + Math.imul(ht, kt) | 0, f = f + Math.imul(lt, St) | 0, b = b + Math.imul(lt, kt) | 0, v = v + Math.imul(Z, Rt) | 0, f = f + Math.imul(Z, It) | 0, f = f + Math.imul(ut, Rt) | 0, b = b + Math.imul(ut, It) | 0, v = v + Math.imul(D, Tt) | 0, f = f + Math.imul(D, Ct) | 0, f = f + Math.imul(tt, Tt) | 0, b = b + Math.imul(tt, Ct) | 0, v = v + Math.imul(B, Bt) | 0, f = f + Math.imul(B, Ot) | 0, f = f + Math.imul(F, Bt) | 0, b = b + Math.imul(F, Ot) | 0, v = v + Math.imul(S, Lt) | 0, f = f + Math.imul(S, Ft) | 0, f = f + Math.imul(k, Lt) | 0, b = b + Math.imul(k, Ft) | 0, v = v + Math.imul(q, Ut) | 0, f = f + Math.imul(q, Dt) | 0, f = f + Math.imul(z, Ut) | 0, b = b + Math.imul(z, Dt) | 0;
      var Gn = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Gn >>> 26) | 0, Gn &= 67108863, v = Math.imul(yt, _t), f = Math.imul(yt, Et), f = f + Math.imul(bt, _t) | 0, b = Math.imul(bt, Et), v = v + Math.imul(gt, At) | 0, f = f + Math.imul(gt, Mt) | 0, f = f + Math.imul(vt, At) | 0, b = b + Math.imul(vt, Mt) | 0, v = v + Math.imul(pt, Nt) | 0, f = f + Math.imul(pt, Pt) | 0, f = f + Math.imul(mt, Nt) | 0, b = b + Math.imul(mt, Pt) | 0, v = v + Math.imul(ct, St) | 0, f = f + Math.imul(ct, kt) | 0, f = f + Math.imul(dt, St) | 0, b = b + Math.imul(dt, kt) | 0, v = v + Math.imul(ht, Rt) | 0, f = f + Math.imul(ht, It) | 0, f = f + Math.imul(lt, Rt) | 0, b = b + Math.imul(lt, It) | 0, v = v + Math.imul(Z, Tt) | 0, f = f + Math.imul(Z, Ct) | 0, f = f + Math.imul(ut, Tt) | 0, b = b + Math.imul(ut, Ct) | 0, v = v + Math.imul(D, Bt) | 0, f = f + Math.imul(D, Ot) | 0, f = f + Math.imul(tt, Bt) | 0, b = b + Math.imul(tt, Ot) | 0, v = v + Math.imul(B, Lt) | 0, f = f + Math.imul(B, Ft) | 0, f = f + Math.imul(F, Lt) | 0, b = b + Math.imul(F, Ft) | 0, v = v + Math.imul(S, Ut) | 0, f = f + Math.imul(S, Dt) | 0, f = f + Math.imul(k, Ut) | 0, b = b + Math.imul(k, Dt) | 0;
      var jn = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (jn >>> 26) | 0, jn &= 67108863, v = Math.imul(yt, At), f = Math.imul(yt, Mt), f = f + Math.imul(bt, At) | 0, b = Math.imul(bt, Mt), v = v + Math.imul(gt, Nt) | 0, f = f + Math.imul(gt, Pt) | 0, f = f + Math.imul(vt, Nt) | 0, b = b + Math.imul(vt, Pt) | 0, v = v + Math.imul(pt, St) | 0, f = f + Math.imul(pt, kt) | 0, f = f + Math.imul(mt, St) | 0, b = b + Math.imul(mt, kt) | 0, v = v + Math.imul(ct, Rt) | 0, f = f + Math.imul(ct, It) | 0, f = f + Math.imul(dt, Rt) | 0, b = b + Math.imul(dt, It) | 0, v = v + Math.imul(ht, Tt) | 0, f = f + Math.imul(ht, Ct) | 0, f = f + Math.imul(lt, Tt) | 0, b = b + Math.imul(lt, Ct) | 0, v = v + Math.imul(Z, Bt) | 0, f = f + Math.imul(Z, Ot) | 0, f = f + Math.imul(ut, Bt) | 0, b = b + Math.imul(ut, Ot) | 0, v = v + Math.imul(D, Lt) | 0, f = f + Math.imul(D, Ft) | 0, f = f + Math.imul(tt, Lt) | 0, b = b + Math.imul(tt, Ft) | 0, v = v + Math.imul(B, Ut) | 0, f = f + Math.imul(B, Dt) | 0, f = f + Math.imul(F, Ut) | 0, b = b + Math.imul(F, Dt) | 0;
      var Vn = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Vn >>> 26) | 0, Vn &= 67108863, v = Math.imul(yt, Nt), f = Math.imul(yt, Pt), f = f + Math.imul(bt, Nt) | 0, b = Math.imul(bt, Pt), v = v + Math.imul(gt, St) | 0, f = f + Math.imul(gt, kt) | 0, f = f + Math.imul(vt, St) | 0, b = b + Math.imul(vt, kt) | 0, v = v + Math.imul(pt, Rt) | 0, f = f + Math.imul(pt, It) | 0, f = f + Math.imul(mt, Rt) | 0, b = b + Math.imul(mt, It) | 0, v = v + Math.imul(ct, Tt) | 0, f = f + Math.imul(ct, Ct) | 0, f = f + Math.imul(dt, Tt) | 0, b = b + Math.imul(dt, Ct) | 0, v = v + Math.imul(ht, Bt) | 0, f = f + Math.imul(ht, Ot) | 0, f = f + Math.imul(lt, Bt) | 0, b = b + Math.imul(lt, Ot) | 0, v = v + Math.imul(Z, Lt) | 0, f = f + Math.imul(Z, Ft) | 0, f = f + Math.imul(ut, Lt) | 0, b = b + Math.imul(ut, Ft) | 0, v = v + Math.imul(D, Ut) | 0, f = f + Math.imul(D, Dt) | 0, f = f + Math.imul(tt, Ut) | 0, b = b + Math.imul(tt, Dt) | 0;
      var Hn = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Hn >>> 26) | 0, Hn &= 67108863, v = Math.imul(yt, St), f = Math.imul(yt, kt), f = f + Math.imul(bt, St) | 0, b = Math.imul(bt, kt), v = v + Math.imul(gt, Rt) | 0, f = f + Math.imul(gt, It) | 0, f = f + Math.imul(vt, Rt) | 0, b = b + Math.imul(vt, It) | 0, v = v + Math.imul(pt, Tt) | 0, f = f + Math.imul(pt, Ct) | 0, f = f + Math.imul(mt, Tt) | 0, b = b + Math.imul(mt, Ct) | 0, v = v + Math.imul(ct, Bt) | 0, f = f + Math.imul(ct, Ot) | 0, f = f + Math.imul(dt, Bt) | 0, b = b + Math.imul(dt, Ot) | 0, v = v + Math.imul(ht, Lt) | 0, f = f + Math.imul(ht, Ft) | 0, f = f + Math.imul(lt, Lt) | 0, b = b + Math.imul(lt, Ft) | 0, v = v + Math.imul(Z, Ut) | 0, f = f + Math.imul(Z, Dt) | 0, f = f + Math.imul(ut, Ut) | 0, b = b + Math.imul(ut, Dt) | 0;
      var Wn = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Wn >>> 26) | 0, Wn &= 67108863, v = Math.imul(yt, Rt), f = Math.imul(yt, It), f = f + Math.imul(bt, Rt) | 0, b = Math.imul(bt, It), v = v + Math.imul(gt, Tt) | 0, f = f + Math.imul(gt, Ct) | 0, f = f + Math.imul(vt, Tt) | 0, b = b + Math.imul(vt, Ct) | 0, v = v + Math.imul(pt, Bt) | 0, f = f + Math.imul(pt, Ot) | 0, f = f + Math.imul(mt, Bt) | 0, b = b + Math.imul(mt, Ot) | 0, v = v + Math.imul(ct, Lt) | 0, f = f + Math.imul(ct, Ft) | 0, f = f + Math.imul(dt, Lt) | 0, b = b + Math.imul(dt, Ft) | 0, v = v + Math.imul(ht, Ut) | 0, f = f + Math.imul(ht, Dt) | 0, f = f + Math.imul(lt, Ut) | 0, b = b + Math.imul(lt, Dt) | 0;
      var Kn = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Kn >>> 26) | 0, Kn &= 67108863, v = Math.imul(yt, Tt), f = Math.imul(yt, Ct), f = f + Math.imul(bt, Tt) | 0, b = Math.imul(bt, Ct), v = v + Math.imul(gt, Bt) | 0, f = f + Math.imul(gt, Ot) | 0, f = f + Math.imul(vt, Bt) | 0, b = b + Math.imul(vt, Ot) | 0, v = v + Math.imul(pt, Lt) | 0, f = f + Math.imul(pt, Ft) | 0, f = f + Math.imul(mt, Lt) | 0, b = b + Math.imul(mt, Ft) | 0, v = v + Math.imul(ct, Ut) | 0, f = f + Math.imul(ct, Dt) | 0, f = f + Math.imul(dt, Ut) | 0, b = b + Math.imul(dt, Dt) | 0;
      var Jn = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Jn >>> 26) | 0, Jn &= 67108863, v = Math.imul(yt, Bt), f = Math.imul(yt, Ot), f = f + Math.imul(bt, Bt) | 0, b = Math.imul(bt, Ot), v = v + Math.imul(gt, Lt) | 0, f = f + Math.imul(gt, Ft) | 0, f = f + Math.imul(vt, Lt) | 0, b = b + Math.imul(vt, Ft) | 0, v = v + Math.imul(pt, Ut) | 0, f = f + Math.imul(pt, Dt) | 0, f = f + Math.imul(mt, Ut) | 0, b = b + Math.imul(mt, Dt) | 0;
      var Xn = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Xn >>> 26) | 0, Xn &= 67108863, v = Math.imul(yt, Lt), f = Math.imul(yt, Ft), f = f + Math.imul(bt, Lt) | 0, b = Math.imul(bt, Ft), v = v + Math.imul(gt, Ut) | 0, f = f + Math.imul(gt, Dt) | 0, f = f + Math.imul(vt, Ut) | 0, b = b + Math.imul(vt, Dt) | 0;
      var Zn = (E + v | 0) + ((f & 8191) << 13) | 0;
      E = (b + (f >>> 13) | 0) + (Zn >>> 26) | 0, Zn &= 67108863, v = Math.imul(yt, Ut), f = Math.imul(yt, Dt), f = f + Math.imul(bt, Ut) | 0, b = Math.imul(bt, Dt);
      var Yn = (E + v | 0) + ((f & 8191) << 13) | 0;
      return E = (b + (f >>> 13) | 0) + (Yn >>> 26) | 0, Yn &= 67108863, _[0] = We, _[1] = Ke, _[2] = Je, _[3] = Xe, _[4] = Ze, _[5] = Ye, _[6] = Qe, _[7] = qn, _[8] = zn, _[9] = Gn, _[10] = jn, _[11] = Vn, _[12] = Hn, _[13] = Wn, _[14] = Kn, _[15] = Jn, _[16] = Xn, _[17] = Zn, _[18] = Yn, E !== 0 && (_[19] = E, p.length++), p;
    };
    Math.imul || (I = N);
    function H(x, a, h) {
      h.negative = a.negative ^ x.negative, h.length = x.length + a.length;
      for (var p = 0, m = 0, y = 0; y < h.length - 1; y++) {
        var _ = m;
        m = 0;
        for (var E = p & 67108863, v = Math.min(y, a.length - 1), f = Math.max(0, y - x.length + 1); f <= v; f++) {
          var b = y - f, O = x.words[b] | 0, q = a.words[f] | 0, z = O * q, c = z & 67108863;
          _ = _ + (z / 67108864 | 0) | 0, c = c + E | 0, E = c & 67108863, _ = _ + (c >>> 26) | 0, m += _ >>> 26, _ &= 67108863;
        }
        h.words[y] = E, p = _, _ = m;
      }
      return p !== 0 ? h.words[y] = p : h.length--, h.strip();
    }
    function R(x, a, h) {
      var p = new L();
      return p.mulp(x, a, h);
    }
    s.prototype.mulTo = function(a, h) {
      var p, m = this.length + a.length;
      return this.length === 10 && a.length === 10 ? p = I(this, a, h) : m < 63 ? p = N(this, a, h) : m < 1024 ? p = H(this, a, h) : p = R(this, a, h), p;
    };
    function L(x, a) {
      this.x = x, this.y = a;
    }
    L.prototype.makeRBT = function(a) {
      for (var h = new Array(a), p = s.prototype._countBits(a) - 1, m = 0; m < a; m++)
        h[m] = this.revBin(m, p, a);
      return h;
    }, L.prototype.revBin = function(a, h, p) {
      if (a === 0 || a === p - 1)
        return a;
      for (var m = 0, y = 0; y < h; y++)
        m |= (a & 1) << h - y - 1, a >>= 1;
      return m;
    }, L.prototype.permute = function(a, h, p, m, y, _) {
      for (var E = 0; E < _; E++)
        m[E] = h[a[E]], y[E] = p[a[E]];
    }, L.prototype.transform = function(a, h, p, m, y, _) {
      this.permute(_, a, h, p, m, y);
      for (var E = 1; E < y; E <<= 1)
        for (var v = E << 1, f = Math.cos(2 * Math.PI / v), b = Math.sin(2 * Math.PI / v), O = 0; O < y; O += v)
          for (var q = f, z = b, c = 0; c < E; c++) {
            var S = p[O + c], k = m[O + c], T = p[O + c + E], B = m[O + c + E], F = q * T - z * B;
            B = q * B + z * T, T = F, p[O + c] = S + T, m[O + c] = k + B, p[O + c + E] = S - T, m[O + c + E] = k - B, c !== v && (F = f * q - b * z, z = f * z + b * q, q = F);
          }
    }, L.prototype.guessLen13b = function(a, h) {
      var p = Math.max(h, a) | 1, m = p & 1, y = 0;
      for (p = p / 2 | 0; p; p = p >>> 1)
        y++;
      return 1 << y + 1 + m;
    }, L.prototype.conjugate = function(a, h, p) {
      if (!(p <= 1))
        for (var m = 0; m < p / 2; m++) {
          var y = a[m];
          a[m] = a[p - m - 1], a[p - m - 1] = y, y = h[m], h[m] = -h[p - m - 1], h[p - m - 1] = -y;
        }
    }, L.prototype.normalize13b = function(a, h) {
      for (var p = 0, m = 0; m < h / 2; m++) {
        var y = Math.round(a[2 * m + 1] / h) * 8192 + Math.round(a[2 * m] / h) + p;
        a[m] = y & 67108863, y < 67108864 ? p = 0 : p = y / 67108864 | 0;
      }
      return a;
    }, L.prototype.convert13b = function(a, h, p, m) {
      for (var y = 0, _ = 0; _ < h; _++)
        y = y + (a[_] | 0), p[2 * _] = y & 8191, y = y >>> 13, p[2 * _ + 1] = y & 8191, y = y >>> 13;
      for (_ = 2 * h; _ < m; ++_)
        p[_] = 0;
      r(y === 0), r((y & -8192) === 0);
    }, L.prototype.stub = function(a) {
      for (var h = new Array(a), p = 0; p < a; p++)
        h[p] = 0;
      return h;
    }, L.prototype.mulp = function(a, h, p) {
      var m = 2 * this.guessLen13b(a.length, h.length), y = this.makeRBT(m), _ = this.stub(m), E = new Array(m), v = new Array(m), f = new Array(m), b = new Array(m), O = new Array(m), q = new Array(m), z = p.words;
      z.length = m, this.convert13b(a.words, a.length, E, m), this.convert13b(h.words, h.length, b, m), this.transform(E, _, v, f, m, y), this.transform(b, _, O, q, m, y);
      for (var c = 0; c < m; c++) {
        var S = v[c] * O[c] - f[c] * q[c];
        f[c] = v[c] * q[c] + f[c] * O[c], v[c] = S;
      }
      return this.conjugate(v, f, m), this.transform(v, f, z, _, m, y), this.conjugate(z, _, m), this.normalize13b(z, m), p.negative = a.negative ^ h.negative, p.length = a.length + h.length, p.strip();
    }, s.prototype.mul = function(a) {
      var h = new s(null);
      return h.words = new Array(this.length + a.length), this.mulTo(a, h);
    }, s.prototype.mulf = function(a) {
      var h = new s(null);
      return h.words = new Array(this.length + a.length), R(this, a, h);
    }, s.prototype.imul = function(a) {
      return this.clone().mulTo(a, this);
    }, s.prototype.imuln = function(a) {
      r(typeof a == "number"), r(a < 67108864);
      for (var h = 0, p = 0; p < this.length; p++) {
        var m = (this.words[p] | 0) * a, y = (m & 67108863) + (h & 67108863);
        h >>= 26, h += m / 67108864 | 0, h += y >>> 26, this.words[p] = y & 67108863;
      }
      return h !== 0 && (this.words[p] = h, this.length++), this;
    }, s.prototype.muln = function(a) {
      return this.clone().imuln(a);
    }, s.prototype.sqr = function() {
      return this.mul(this);
    }, s.prototype.isqr = function() {
      return this.imul(this.clone());
    }, s.prototype.pow = function(a) {
      var h = P(a);
      if (h.length === 0)
        return new s(1);
      for (var p = this, m = 0; m < h.length && h[m] === 0; m++, p = p.sqr())
        ;
      if (++m < h.length)
        for (var y = p.sqr(); m < h.length; m++, y = y.sqr())
          h[m] !== 0 && (p = p.mul(y));
      return p;
    }, s.prototype.iushln = function(a) {
      r(typeof a == "number" && a >= 0);
      var h = a % 26, p = (a - h) / 26, m = 67108863 >>> 26 - h << 26 - h, y;
      if (h !== 0) {
        var _ = 0;
        for (y = 0; y < this.length; y++) {
          var E = this.words[y] & m, v = (this.words[y] | 0) - E << h;
          this.words[y] = v | _, _ = E >>> 26 - h;
        }
        _ && (this.words[y] = _, this.length++);
      }
      if (p !== 0) {
        for (y = this.length - 1; y >= 0; y--)
          this.words[y + p] = this.words[y];
        for (y = 0; y < p; y++)
          this.words[y] = 0;
        this.length += p;
      }
      return this.strip();
    }, s.prototype.ishln = function(a) {
      return r(this.negative === 0), this.iushln(a);
    }, s.prototype.iushrn = function(a, h, p) {
      r(typeof a == "number" && a >= 0);
      var m;
      h ? m = (h - h % 26) / 26 : m = 0;
      var y = a % 26, _ = Math.min((a - y) / 26, this.length), E = 67108863 ^ 67108863 >>> y << y, v = p;
      if (m -= _, m = Math.max(0, m), v) {
        for (var f = 0; f < _; f++)
          v.words[f] = this.words[f];
        v.length = _;
      }
      if (_ !== 0)
        if (this.length > _)
          for (this.length -= _, f = 0; f < this.length; f++)
            this.words[f] = this.words[f + _];
        else
          this.words[0] = 0, this.length = 1;
      var b = 0;
      for (f = this.length - 1; f >= 0 && (b !== 0 || f >= m); f--) {
        var O = this.words[f] | 0;
        this.words[f] = b << 26 - y | O >>> y, b = O & E;
      }
      return v && b !== 0 && (v.words[v.length++] = b), this.length === 0 && (this.words[0] = 0, this.length = 1), this.strip();
    }, s.prototype.ishrn = function(a, h, p) {
      return r(this.negative === 0), this.iushrn(a, h, p);
    }, s.prototype.shln = function(a) {
      return this.clone().ishln(a);
    }, s.prototype.ushln = function(a) {
      return this.clone().iushln(a);
    }, s.prototype.shrn = function(a) {
      return this.clone().ishrn(a);
    }, s.prototype.ushrn = function(a) {
      return this.clone().iushrn(a);
    }, s.prototype.testn = function(a) {
      r(typeof a == "number" && a >= 0);
      var h = a % 26, p = (a - h) / 26, m = 1 << h;
      if (this.length <= p)
        return !1;
      var y = this.words[p];
      return !!(y & m);
    }, s.prototype.imaskn = function(a) {
      r(typeof a == "number" && a >= 0);
      var h = a % 26, p = (a - h) / 26;
      if (r(this.negative === 0, "imaskn works only with positive numbers"), this.length <= p)
        return this;
      if (h !== 0 && p++, this.length = Math.min(p, this.length), h !== 0) {
        var m = 67108863 ^ 67108863 >>> h << h;
        this.words[this.length - 1] &= m;
      }
      return this.strip();
    }, s.prototype.maskn = function(a) {
      return this.clone().imaskn(a);
    }, s.prototype.iaddn = function(a) {
      return r(typeof a == "number"), r(a < 67108864), a < 0 ? this.isubn(-a) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) < a ? (this.words[0] = a - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(a), this.negative = 1, this) : this._iaddn(a);
    }, s.prototype._iaddn = function(a) {
      this.words[0] += a;
      for (var h = 0; h < this.length && this.words[h] >= 67108864; h++)
        this.words[h] -= 67108864, h === this.length - 1 ? this.words[h + 1] = 1 : this.words[h + 1]++;
      return this.length = Math.max(this.length, h + 1), this;
    }, s.prototype.isubn = function(a) {
      if (r(typeof a == "number"), r(a < 67108864), a < 0)
        return this.iaddn(-a);
      if (this.negative !== 0)
        return this.negative = 0, this.iaddn(a), this.negative = 1, this;
      if (this.words[0] -= a, this.length === 1 && this.words[0] < 0)
        this.words[0] = -this.words[0], this.negative = 1;
      else
        for (var h = 0; h < this.length && this.words[h] < 0; h++)
          this.words[h] += 67108864, this.words[h + 1] -= 1;
      return this.strip();
    }, s.prototype.addn = function(a) {
      return this.clone().iaddn(a);
    }, s.prototype.subn = function(a) {
      return this.clone().isubn(a);
    }, s.prototype.iabs = function() {
      return this.negative = 0, this;
    }, s.prototype.abs = function() {
      return this.clone().iabs();
    }, s.prototype._ishlnsubmul = function(a, h, p) {
      var m = a.length + p, y;
      this._expand(m);
      var _, E = 0;
      for (y = 0; y < a.length; y++) {
        _ = (this.words[y + p] | 0) + E;
        var v = (a.words[y] | 0) * h;
        _ -= v & 67108863, E = (_ >> 26) - (v / 67108864 | 0), this.words[y + p] = _ & 67108863;
      }
      for (; y < this.length - p; y++)
        _ = (this.words[y + p] | 0) + E, E = _ >> 26, this.words[y + p] = _ & 67108863;
      if (E === 0)
        return this.strip();
      for (r(E === -1), E = 0, y = 0; y < this.length; y++)
        _ = -(this.words[y] | 0) + E, E = _ >> 26, this.words[y] = _ & 67108863;
      return this.negative = 1, this.strip();
    }, s.prototype._wordDiv = function(a, h) {
      var p = this.length - a.length, m = this.clone(), y = a, _ = y.words[y.length - 1] | 0, E = this._countBits(_);
      p = 26 - E, p !== 0 && (y = y.ushln(p), m.iushln(p), _ = y.words[y.length - 1] | 0);
      var v = m.length - y.length, f;
      if (h !== "mod") {
        f = new s(null), f.length = v + 1, f.words = new Array(f.length);
        for (var b = 0; b < f.length; b++)
          f.words[b] = 0;
      }
      var O = m.clone()._ishlnsubmul(y, 1, v);
      O.negative === 0 && (m = O, f && (f.words[v] = 1));
      for (var q = v - 1; q >= 0; q--) {
        var z = (m.words[y.length + q] | 0) * 67108864 + (m.words[y.length + q - 1] | 0);
        for (z = Math.min(z / _ | 0, 67108863), m._ishlnsubmul(y, z, q); m.negative !== 0; )
          z--, m.negative = 0, m._ishlnsubmul(y, 1, q), m.isZero() || (m.negative ^= 1);
        f && (f.words[q] = z);
      }
      return f && f.strip(), m.strip(), h !== "div" && p !== 0 && m.iushrn(p), {
        div: f || null,
        mod: m
      };
    }, s.prototype.divmod = function(a, h, p) {
      if (r(!a.isZero()), this.isZero())
        return {
          div: new s(0),
          mod: new s(0)
        };
      var m, y, _;
      return this.negative !== 0 && a.negative === 0 ? (_ = this.neg().divmod(a, h), h !== "mod" && (m = _.div.neg()), h !== "div" && (y = _.mod.neg(), p && y.negative !== 0 && y.iadd(a)), {
        div: m,
        mod: y
      }) : this.negative === 0 && a.negative !== 0 ? (_ = this.divmod(a.neg(), h), h !== "mod" && (m = _.div.neg()), {
        div: m,
        mod: _.mod
      }) : this.negative & a.negative ? (_ = this.neg().divmod(a.neg(), h), h !== "div" && (y = _.mod.neg(), p && y.negative !== 0 && y.isub(a)), {
        div: _.div,
        mod: y
      }) : a.length > this.length || this.cmp(a) < 0 ? {
        div: new s(0),
        mod: this
      } : a.length === 1 ? h === "div" ? {
        div: this.divn(a.words[0]),
        mod: null
      } : h === "mod" ? {
        div: null,
        mod: new s(this.modn(a.words[0]))
      } : {
        div: this.divn(a.words[0]),
        mod: new s(this.modn(a.words[0]))
      } : this._wordDiv(a, h);
    }, s.prototype.div = function(a) {
      return this.divmod(a, "div", !1).div;
    }, s.prototype.mod = function(a) {
      return this.divmod(a, "mod", !1).mod;
    }, s.prototype.umod = function(a) {
      return this.divmod(a, "mod", !0).mod;
    }, s.prototype.divRound = function(a) {
      var h = this.divmod(a);
      if (h.mod.isZero())
        return h.div;
      var p = h.div.negative !== 0 ? h.mod.isub(a) : h.mod, m = a.ushrn(1), y = a.andln(1), _ = p.cmp(m);
      return _ < 0 || y === 1 && _ === 0 ? h.div : h.div.negative !== 0 ? h.div.isubn(1) : h.div.iaddn(1);
    }, s.prototype.modn = function(a) {
      r(a <= 67108863);
      for (var h = (1 << 26) % a, p = 0, m = this.length - 1; m >= 0; m--)
        p = (h * p + (this.words[m] | 0)) % a;
      return p;
    }, s.prototype.idivn = function(a) {
      r(a <= 67108863);
      for (var h = 0, p = this.length - 1; p >= 0; p--) {
        var m = (this.words[p] | 0) + h * 67108864;
        this.words[p] = m / a | 0, h = m % a;
      }
      return this.strip();
    }, s.prototype.divn = function(a) {
      return this.clone().idivn(a);
    }, s.prototype.egcd = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var h = this, p = a.clone();
      h.negative !== 0 ? h = h.umod(a) : h = h.clone();
      for (var m = new s(1), y = new s(0), _ = new s(0), E = new s(1), v = 0; h.isEven() && p.isEven(); )
        h.iushrn(1), p.iushrn(1), ++v;
      for (var f = p.clone(), b = h.clone(); !h.isZero(); ) {
        for (var O = 0, q = 1; !(h.words[0] & q) && O < 26; ++O, q <<= 1)
          ;
        if (O > 0)
          for (h.iushrn(O); O-- > 0; )
            (m.isOdd() || y.isOdd()) && (m.iadd(f), y.isub(b)), m.iushrn(1), y.iushrn(1);
        for (var z = 0, c = 1; !(p.words[0] & c) && z < 26; ++z, c <<= 1)
          ;
        if (z > 0)
          for (p.iushrn(z); z-- > 0; )
            (_.isOdd() || E.isOdd()) && (_.iadd(f), E.isub(b)), _.iushrn(1), E.iushrn(1);
        h.cmp(p) >= 0 ? (h.isub(p), m.isub(_), y.isub(E)) : (p.isub(h), _.isub(m), E.isub(y));
      }
      return {
        a: _,
        b: E,
        gcd: p.iushln(v)
      };
    }, s.prototype._invmp = function(a) {
      r(a.negative === 0), r(!a.isZero());
      var h = this, p = a.clone();
      h.negative !== 0 ? h = h.umod(a) : h = h.clone();
      for (var m = new s(1), y = new s(0), _ = p.clone(); h.cmpn(1) > 0 && p.cmpn(1) > 0; ) {
        for (var E = 0, v = 1; !(h.words[0] & v) && E < 26; ++E, v <<= 1)
          ;
        if (E > 0)
          for (h.iushrn(E); E-- > 0; )
            m.isOdd() && m.iadd(_), m.iushrn(1);
        for (var f = 0, b = 1; !(p.words[0] & b) && f < 26; ++f, b <<= 1)
          ;
        if (f > 0)
          for (p.iushrn(f); f-- > 0; )
            y.isOdd() && y.iadd(_), y.iushrn(1);
        h.cmp(p) >= 0 ? (h.isub(p), m.isub(y)) : (p.isub(h), y.isub(m));
      }
      var O;
      return h.cmpn(1) === 0 ? O = m : O = y, O.cmpn(0) < 0 && O.iadd(a), O;
    }, s.prototype.gcd = function(a) {
      if (this.isZero())
        return a.abs();
      if (a.isZero())
        return this.abs();
      var h = this.clone(), p = a.clone();
      h.negative = 0, p.negative = 0;
      for (var m = 0; h.isEven() && p.isEven(); m++)
        h.iushrn(1), p.iushrn(1);
      do {
        for (; h.isEven(); )
          h.iushrn(1);
        for (; p.isEven(); )
          p.iushrn(1);
        var y = h.cmp(p);
        if (y < 0) {
          var _ = h;
          h = p, p = _;
        } else if (y === 0 || p.cmpn(1) === 0)
          break;
        h.isub(p);
      } while (!0);
      return p.iushln(m);
    }, s.prototype.invm = function(a) {
      return this.egcd(a).a.umod(a);
    }, s.prototype.isEven = function() {
      return (this.words[0] & 1) === 0;
    }, s.prototype.isOdd = function() {
      return (this.words[0] & 1) === 1;
    }, s.prototype.andln = function(a) {
      return this.words[0] & a;
    }, s.prototype.bincn = function(a) {
      r(typeof a == "number");
      var h = a % 26, p = (a - h) / 26, m = 1 << h;
      if (this.length <= p)
        return this._expand(p + 1), this.words[p] |= m, this;
      for (var y = m, _ = p; y !== 0 && _ < this.length; _++) {
        var E = this.words[_] | 0;
        E += y, y = E >>> 26, E &= 67108863, this.words[_] = E;
      }
      return y !== 0 && (this.words[_] = y, this.length++), this;
    }, s.prototype.isZero = function() {
      return this.length === 1 && this.words[0] === 0;
    }, s.prototype.cmpn = function(a) {
      var h = a < 0;
      if (this.negative !== 0 && !h)
        return -1;
      if (this.negative === 0 && h)
        return 1;
      this.strip();
      var p;
      if (this.length > 1)
        p = 1;
      else {
        h && (a = -a), r(a <= 67108863, "Number is too big");
        var m = this.words[0] | 0;
        p = m === a ? 0 : m < a ? -1 : 1;
      }
      return this.negative !== 0 ? -p | 0 : p;
    }, s.prototype.cmp = function(a) {
      if (this.negative !== 0 && a.negative === 0)
        return -1;
      if (this.negative === 0 && a.negative !== 0)
        return 1;
      var h = this.ucmp(a);
      return this.negative !== 0 ? -h | 0 : h;
    }, s.prototype.ucmp = function(a) {
      if (this.length > a.length)
        return 1;
      if (this.length < a.length)
        return -1;
      for (var h = 0, p = this.length - 1; p >= 0; p--) {
        var m = this.words[p] | 0, y = a.words[p] | 0;
        if (m !== y) {
          m < y ? h = -1 : m > y && (h = 1);
          break;
        }
      }
      return h;
    }, s.prototype.gtn = function(a) {
      return this.cmpn(a) === 1;
    }, s.prototype.gt = function(a) {
      return this.cmp(a) === 1;
    }, s.prototype.gten = function(a) {
      return this.cmpn(a) >= 0;
    }, s.prototype.gte = function(a) {
      return this.cmp(a) >= 0;
    }, s.prototype.ltn = function(a) {
      return this.cmpn(a) === -1;
    }, s.prototype.lt = function(a) {
      return this.cmp(a) === -1;
    }, s.prototype.lten = function(a) {
      return this.cmpn(a) <= 0;
    }, s.prototype.lte = function(a) {
      return this.cmp(a) <= 0;
    }, s.prototype.eqn = function(a) {
      return this.cmpn(a) === 0;
    }, s.prototype.eq = function(a) {
      return this.cmp(a) === 0;
    }, s.red = function(a) {
      return new st(a);
    }, s.prototype.toRed = function(a) {
      return r(!this.red, "Already a number in reduction context"), r(this.negative === 0, "red works only with positives"), a.convertTo(this)._forceRed(a);
    }, s.prototype.fromRed = function() {
      return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
    }, s.prototype._forceRed = function(a) {
      return this.red = a, this;
    }, s.prototype.forceRed = function(a) {
      return r(!this.red, "Already a number in reduction context"), this._forceRed(a);
    }, s.prototype.redAdd = function(a) {
      return r(this.red, "redAdd works only with red numbers"), this.red.add(this, a);
    }, s.prototype.redIAdd = function(a) {
      return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, a);
    }, s.prototype.redSub = function(a) {
      return r(this.red, "redSub works only with red numbers"), this.red.sub(this, a);
    }, s.prototype.redISub = function(a) {
      return r(this.red, "redISub works only with red numbers"), this.red.isub(this, a);
    }, s.prototype.redShl = function(a) {
      return r(this.red, "redShl works only with red numbers"), this.red.shl(this, a);
    }, s.prototype.redMul = function(a) {
      return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, a), this.red.mul(this, a);
    }, s.prototype.redIMul = function(a) {
      return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, a), this.red.imul(this, a);
    }, s.prototype.redSqr = function() {
      return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
    }, s.prototype.redISqr = function() {
      return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
    }, s.prototype.redSqrt = function() {
      return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
    }, s.prototype.redInvm = function() {
      return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
    }, s.prototype.redNeg = function() {
      return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
    }, s.prototype.redPow = function(a) {
      return r(this.red && !a.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, a);
    };
    var j = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };
    function J(x, a) {
      this.name = x, this.p = new s(a, 16), this.n = this.p.bitLength(), this.k = new s(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
    }
    J.prototype._tmp = function() {
      var a = new s(null);
      return a.words = new Array(Math.ceil(this.n / 13)), a;
    }, J.prototype.ireduce = function(a) {
      var h = a, p;
      do
        this.split(h, this.tmp), h = this.imulK(h), h = h.iadd(this.tmp), p = h.bitLength();
      while (p > this.n);
      var m = p < this.n ? -1 : h.ucmp(this.p);
      return m === 0 ? (h.words[0] = 0, h.length = 1) : m > 0 ? h.isub(this.p) : h.strip !== void 0 ? h.strip() : h._strip(), h;
    }, J.prototype.split = function(a, h) {
      a.iushrn(this.n, 0, h);
    }, J.prototype.imulK = function(a) {
      return a.imul(this.k);
    };
    function Q() {
      J.call(
        this,
        "k256",
        "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
      );
    }
    i(Q, J), Q.prototype.split = function(a, h) {
      for (var p = 4194303, m = Math.min(a.length, 9), y = 0; y < m; y++)
        h.words[y] = a.words[y];
      if (h.length = m, a.length <= 9) {
        a.words[0] = 0, a.length = 1;
        return;
      }
      var _ = a.words[9];
      for (h.words[h.length++] = _ & p, y = 10; y < a.length; y++) {
        var E = a.words[y] | 0;
        a.words[y - 10] = (E & p) << 4 | _ >>> 22, _ = E;
      }
      _ >>>= 22, a.words[y - 10] = _, _ === 0 && a.length > 10 ? a.length -= 10 : a.length -= 9;
    }, Q.prototype.imulK = function(a) {
      a.words[a.length] = 0, a.words[a.length + 1] = 0, a.length += 2;
      for (var h = 0, p = 0; p < a.length; p++) {
        var m = a.words[p] | 0;
        h += m * 977, a.words[p] = h & 67108863, h = m * 64 + (h / 67108864 | 0);
      }
      return a.words[a.length - 1] === 0 && (a.length--, a.words[a.length - 1] === 0 && a.length--), a;
    };
    function ft() {
      J.call(
        this,
        "p224",
        "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
      );
    }
    i(ft, J);
    function Kt() {
      J.call(
        this,
        "p192",
        "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
      );
    }
    i(Kt, J);
    function Ht() {
      J.call(
        this,
        "25519",
        "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
      );
    }
    i(Ht, J), Ht.prototype.imulK = function(a) {
      for (var h = 0, p = 0; p < a.length; p++) {
        var m = (a.words[p] | 0) * 19 + h, y = m & 67108863;
        m >>>= 26, a.words[p] = y, h = m;
      }
      return h !== 0 && (a.words[a.length++] = h), a;
    }, s._prime = function(a) {
      if (j[a])
        return j[a];
      var h;
      if (a === "k256")
        h = new Q();
      else if (a === "p224")
        h = new ft();
      else if (a === "p192")
        h = new Kt();
      else if (a === "p25519")
        h = new Ht();
      else
        throw new Error("Unknown prime " + a);
      return j[a] = h, h;
    };
    function st(x) {
      if (typeof x == "string") {
        var a = s._prime(x);
        this.m = a.p, this.prime = a;
      } else
        r(x.gtn(1), "modulus must be greater than 1"), this.m = x, this.prime = null;
    }
    st.prototype._verify1 = function(a) {
      r(a.negative === 0, "red works only with positives"), r(a.red, "red works only with red numbers");
    }, st.prototype._verify2 = function(a, h) {
      r((a.negative | h.negative) === 0, "red works only with positives"), r(
        a.red && a.red === h.red,
        "red works only with red numbers"
      );
    }, st.prototype.imod = function(a) {
      return this.prime ? this.prime.ireduce(a)._forceRed(this) : a.umod(this.m)._forceRed(this);
    }, st.prototype.neg = function(a) {
      return a.isZero() ? a.clone() : this.m.sub(a)._forceRed(this);
    }, st.prototype.add = function(a, h) {
      this._verify2(a, h);
      var p = a.add(h);
      return p.cmp(this.m) >= 0 && p.isub(this.m), p._forceRed(this);
    }, st.prototype.iadd = function(a, h) {
      this._verify2(a, h);
      var p = a.iadd(h);
      return p.cmp(this.m) >= 0 && p.isub(this.m), p;
    }, st.prototype.sub = function(a, h) {
      this._verify2(a, h);
      var p = a.sub(h);
      return p.cmpn(0) < 0 && p.iadd(this.m), p._forceRed(this);
    }, st.prototype.isub = function(a, h) {
      this._verify2(a, h);
      var p = a.isub(h);
      return p.cmpn(0) < 0 && p.iadd(this.m), p;
    }, st.prototype.shl = function(a, h) {
      return this._verify1(a), this.imod(a.ushln(h));
    }, st.prototype.imul = function(a, h) {
      return this._verify2(a, h), this.imod(a.imul(h));
    }, st.prototype.mul = function(a, h) {
      return this._verify2(a, h), this.imod(a.mul(h));
    }, st.prototype.isqr = function(a) {
      return this.imul(a, a.clone());
    }, st.prototype.sqr = function(a) {
      return this.mul(a, a);
    }, st.prototype.sqrt = function(a) {
      if (a.isZero())
        return a.clone();
      var h = this.m.andln(3);
      if (r(h % 2 === 1), h === 3) {
        var p = this.m.add(new s(1)).iushrn(2);
        return this.pow(a, p);
      }
      for (var m = this.m.subn(1), y = 0; !m.isZero() && m.andln(1) === 0; )
        y++, m.iushrn(1);
      r(!m.isZero());
      var _ = new s(1).toRed(this), E = _.redNeg(), v = this.m.subn(1).iushrn(1), f = this.m.bitLength();
      for (f = new s(2 * f * f).toRed(this); this.pow(f, v).cmp(E) !== 0; )
        f.redIAdd(E);
      for (var b = this.pow(f, m), O = this.pow(a, m.addn(1).iushrn(1)), q = this.pow(a, m), z = y; q.cmp(_) !== 0; ) {
        for (var c = q, S = 0; c.cmp(_) !== 0; S++)
          c = c.redSqr();
        r(S < z);
        var k = this.pow(b, new s(1).iushln(z - S - 1));
        O = O.redMul(k), b = k.redSqr(), q = q.redMul(b), z = S;
      }
      return O;
    }, st.prototype.invm = function(a) {
      var h = a._invmp(this.m);
      return h.negative !== 0 ? (h.negative = 0, this.imod(h).redNeg()) : this.imod(h);
    }, st.prototype.pow = function(a, h) {
      if (h.isZero())
        return new s(1).toRed(this);
      if (h.cmpn(1) === 0)
        return a.clone();
      var p = 4, m = new Array(1 << p);
      m[0] = new s(1).toRed(this), m[1] = a;
      for (var y = 2; y < m.length; y++)
        m[y] = this.mul(m[y - 1], a);
      var _ = m[0], E = 0, v = 0, f = h.bitLength() % 26;
      for (f === 0 && (f = 26), y = h.length - 1; y >= 0; y--) {
        for (var b = h.words[y], O = f - 1; O >= 0; O--) {
          var q = b >> O & 1;
          if (_ !== m[0] && (_ = this.sqr(_)), q === 0 && E === 0) {
            v = 0;
            continue;
          }
          E <<= 1, E |= q, v++, !(v !== p && (y !== 0 || O !== 0)) && (_ = this.mul(_, m[E]), v = 0, E = 0);
        }
        f = 26;
      }
      return _;
    }, st.prototype.convertTo = function(a) {
      var h = a.umod(this.m);
      return h === a ? h.clone() : h;
    }, st.prototype.convertFrom = function(a) {
      var h = a.clone();
      return h.red = null, h;
    }, s.mont = function(a) {
      return new ce(a);
    };
    function ce(x) {
      st.call(this, x), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new s(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
    }
    i(ce, st), ce.prototype.convertTo = function(a) {
      return this.imod(a.ushln(this.shift));
    }, ce.prototype.convertFrom = function(a) {
      var h = this.imod(a.mul(this.rinv));
      return h.red = null, h;
    }, ce.prototype.imul = function(a, h) {
      if (a.isZero() || h.isZero())
        return a.words[0] = 0, a.length = 1, a;
      var p = a.imul(h), m = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = p.isub(m).iushrn(this.shift), _ = y;
      return y.cmp(this.m) >= 0 ? _ = y.isub(this.m) : y.cmpn(0) < 0 && (_ = y.iadd(this.m)), _._forceRed(this);
    }, ce.prototype.mul = function(a, h) {
      if (a.isZero() || h.isZero())
        return new s(0)._forceRed(this);
      var p = a.mul(h), m = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = p.isub(m).iushrn(this.shift), _ = y;
      return y.cmp(this.m) >= 0 ? _ = y.isub(this.m) : y.cmpn(0) < 0 && (_ = y.iadd(this.m)), _._forceRed(this);
    }, ce.prototype.invm = function(a) {
      var h = this.imod(a._invmp(this.m).mul(this.r2));
      return h._forceRed(this);
    };
  })(n, Us);
})(Pi);
var Xo = Pi.exports;
const Y = /* @__PURE__ */ Rn(Xo), Zo = "logger/5.6.0";
let zi = !1, Gi = !1;
const mn = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 };
let ji = mn.default, Qn = null;
function Yo() {
  try {
    const n = [];
    if (["NFD", "NFC", "NFKD", "NFKC"].forEach((t) => {
      try {
        if ("test".normalize(t) !== "test")
          throw new Error("bad normalize");
      } catch {
        n.push(t);
      }
    }), n.length)
      throw new Error("missing " + n.join(", "));
    if ("é".normalize("NFD") !== "é")
      throw new Error("broken implementation");
  } catch (n) {
    return n.message;
  }
  return null;
}
const Vi = Yo();
var mi;
(function(n) {
  n.DEBUG = "DEBUG", n.INFO = "INFO", n.WARNING = "WARNING", n.ERROR = "ERROR", n.OFF = "OFF";
})(mi || (mi = {}));
var xe;
(function(n) {
  n.UNKNOWN_ERROR = "UNKNOWN_ERROR", n.NOT_IMPLEMENTED = "NOT_IMPLEMENTED", n.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION", n.NETWORK_ERROR = "NETWORK_ERROR", n.SERVER_ERROR = "SERVER_ERROR", n.TIMEOUT = "TIMEOUT", n.BUFFER_OVERRUN = "BUFFER_OVERRUN", n.NUMERIC_FAULT = "NUMERIC_FAULT", n.MISSING_NEW = "MISSING_NEW", n.INVALID_ARGUMENT = "INVALID_ARGUMENT", n.MISSING_ARGUMENT = "MISSING_ARGUMENT", n.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT", n.CALL_EXCEPTION = "CALL_EXCEPTION", n.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS", n.NONCE_EXPIRED = "NONCE_EXPIRED", n.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED", n.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT", n.TRANSACTION_REPLACED = "TRANSACTION_REPLACED";
})(xe || (xe = {}));
const Hi = "0123456789abcdef";
class M {
  constructor(t) {
    Object.defineProperty(this, "version", {
      enumerable: !0,
      value: t,
      writable: !1
    });
  }
  _log(t, e) {
    const r = t.toLowerCase();
    mn[r] == null && this.throwArgumentError("invalid log level name", "logLevel", t), !(ji > mn[r]) && console.log.apply(console, e);
  }
  debug(...t) {
    this._log(M.levels.DEBUG, t);
  }
  info(...t) {
    this._log(M.levels.INFO, t);
  }
  warn(...t) {
    this._log(M.levels.WARNING, t);
  }
  makeError(t, e, r) {
    if (Gi)
      return this.makeError("censored error", e, {});
    e || (e = M.errors.UNKNOWN_ERROR), r || (r = {});
    const i = [];
    Object.keys(r).forEach((l) => {
      const d = r[l];
      try {
        if (d instanceof Uint8Array) {
          let g = "";
          for (let w = 0; w < d.length; w++)
            g += Hi[d[w] >> 4], g += Hi[d[w] & 15];
          i.push(l + "=Uint8Array(0x" + g + ")");
        } else
          i.push(l + "=" + JSON.stringify(d));
      } catch {
        i.push(l + "=" + JSON.stringify(r[l].toString()));
      }
    }), i.push(`code=${e}`), i.push(`version=${this.version}`);
    const s = t;
    let o = "";
    switch (e) {
      case xe.NUMERIC_FAULT: {
        o = "NUMERIC_FAULT";
        const l = t;
        switch (l) {
          case "overflow":
          case "underflow":
          case "division-by-zero":
            o += "-" + l;
            break;
          case "negative-power":
          case "negative-width":
            o += "-unsupported";
            break;
          case "unbound-bitwise-result":
            o += "-unbound-result";
            break;
        }
        break;
      }
      case xe.CALL_EXCEPTION:
      case xe.INSUFFICIENT_FUNDS:
      case xe.MISSING_NEW:
      case xe.NONCE_EXPIRED:
      case xe.REPLACEMENT_UNDERPRICED:
      case xe.TRANSACTION_REPLACED:
      case xe.UNPREDICTABLE_GAS_LIMIT:
        o = e;
        break;
    }
    o && (t += " [ See: https://links.ethers.org/v5-errors-" + o + " ]"), i.length && (t += " (" + i.join(", ") + ")");
    const u = new Error(t);
    return u.reason = s, u.code = e, Object.keys(r).forEach(function(l) {
      u[l] = r[l];
    }), u;
  }
  throwError(t, e, r) {
    throw this.makeError(t, e, r);
  }
  throwArgumentError(t, e, r) {
    return this.throwError(t, M.errors.INVALID_ARGUMENT, {
      argument: e,
      value: r
    });
  }
  assert(t, e, r, i) {
    t || this.throwError(e, r, i);
  }
  assertArgument(t, e, r, i) {
    t || this.throwArgumentError(e, r, i);
  }
  checkNormalize(t) {
    Vi && this.throwError("platform missing String.prototype.normalize", M.errors.UNSUPPORTED_OPERATION, {
      operation: "String.prototype.normalize",
      form: Vi
    });
  }
  checkSafeUint53(t, e) {
    typeof t == "number" && (e == null && (e = "value not safe"), (t < 0 || t >= 9007199254740991) && this.throwError(e, M.errors.NUMERIC_FAULT, {
      operation: "checkSafeInteger",
      fault: "out-of-safe-range",
      value: t
    }), t % 1 && this.throwError(e, M.errors.NUMERIC_FAULT, {
      operation: "checkSafeInteger",
      fault: "non-integer",
      value: t
    }));
  }
  checkArgumentCount(t, e, r) {
    r ? r = ": " + r : r = "", t < e && this.throwError("missing argument" + r, M.errors.MISSING_ARGUMENT, {
      count: t,
      expectedCount: e
    }), t > e && this.throwError("too many arguments" + r, M.errors.UNEXPECTED_ARGUMENT, {
      count: t,
      expectedCount: e
    });
  }
  checkNew(t, e) {
    (t === Object || t == null) && this.throwError("missing new", M.errors.MISSING_NEW, { name: e.name });
  }
  checkAbstract(t, e) {
    t === e ? this.throwError("cannot instantiate abstract class " + JSON.stringify(e.name) + " directly; use a sub-class", M.errors.UNSUPPORTED_OPERATION, { name: t.name, operation: "new" }) : (t === Object || t == null) && this.throwError("missing new", M.errors.MISSING_NEW, { name: e.name });
  }
  static globalLogger() {
    return Qn || (Qn = new M(Zo)), Qn;
  }
  static setCensorship(t, e) {
    if (!t && e && this.globalLogger().throwError("cannot permanently disable censorship", M.errors.UNSUPPORTED_OPERATION, {
      operation: "setCensorship"
    }), zi) {
      if (!t)
        return;
      this.globalLogger().throwError("error censorship permanent", M.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }
    Gi = !!t, zi = !!e;
  }
  static setLogLevel(t) {
    const e = mn[t.toLowerCase()];
    if (e == null) {
      M.globalLogger().warn("invalid log level - " + t);
      return;
    }
    ji = e;
  }
  static from(t) {
    return new M(t);
  }
}
M.errors = xe;
M.levels = mi;
const Qo = "bytes/5.6.1", zt = new M(Qo);
function Ds(n) {
  return !!n.toHexString;
}
function Rr(n) {
  return n.slice || (n.slice = function() {
    const t = Array.prototype.slice.call(arguments);
    return Rr(new Uint8Array(Array.prototype.slice.apply(n, t)));
  }), n;
}
function Si(n) {
  return at(n) && !(n.length % 2) || In(n);
}
function Wi(n) {
  return typeof n == "number" && n == n && n % 1 === 0;
}
function In(n) {
  if (n == null)
    return !1;
  if (n.constructor === Uint8Array)
    return !0;
  if (typeof n == "string" || !Wi(n.length) || n.length < 0)
    return !1;
  for (let t = 0; t < n.length; t++) {
    const e = n[t];
    if (!Wi(e) || e < 0 || e >= 256)
      return !1;
  }
  return !0;
}
function V(n, t) {
  if (t || (t = {}), typeof n == "number") {
    zt.checkSafeUint53(n, "invalid arrayify value");
    const e = [];
    for (; n; )
      e.unshift(n & 255), n = parseInt(String(n / 256));
    return e.length === 0 && e.push(0), Rr(new Uint8Array(e));
  }
  if (t.allowMissingPrefix && typeof n == "string" && n.substring(0, 2) !== "0x" && (n = "0x" + n), Ds(n) && (n = n.toHexString()), at(n)) {
    let e = n.substring(2);
    e.length % 2 && (t.hexPad === "left" ? e = "0" + e : t.hexPad === "right" ? e += "0" : zt.throwArgumentError("hex data is odd-length", "value", n));
    const r = [];
    for (let i = 0; i < e.length; i += 2)
      r.push(parseInt(e.substring(i, i + 2), 16));
    return Rr(new Uint8Array(r));
  }
  return In(n) ? Rr(new Uint8Array(n)) : zt.throwArgumentError("invalid arrayify value", "value", n);
}
function he(n) {
  const t = n.map((i) => V(i)), e = t.reduce((i, s) => i + s.length, 0), r = new Uint8Array(e);
  return t.reduce((i, s) => (r.set(s, i), i + s.length), 0), Rr(r);
}
function Cr(n) {
  let t = V(n);
  if (t.length === 0)
    return t;
  let e = 0;
  for (; e < t.length && t[e] === 0; )
    e++;
  return e && (t = t.slice(e)), t;
}
function ta(n, t) {
  n = V(n), n.length > t && zt.throwArgumentError("value out of range", "value", arguments[0]);
  const e = new Uint8Array(t);
  return e.set(n, t - n.length), Rr(e);
}
function at(n, t) {
  return !(typeof n != "string" || !n.match(/^0x[0-9A-Fa-f]*$/) || t && n.length !== 2 + 2 * t);
}
const ti = "0123456789abcdef";
function G(n, t) {
  if (t || (t = {}), typeof n == "number") {
    zt.checkSafeUint53(n, "invalid hexlify value");
    let e = "";
    for (; n; )
      e = ti[n & 15] + e, n = Math.floor(n / 16);
    return e.length ? (e.length % 2 && (e = "0" + e), "0x" + e) : "0x00";
  }
  if (typeof n == "bigint")
    return n = n.toString(16), n.length % 2 ? "0x0" + n : "0x" + n;
  if (t.allowMissingPrefix && typeof n == "string" && n.substring(0, 2) !== "0x" && (n = "0x" + n), Ds(n))
    return n.toHexString();
  if (at(n))
    return n.length % 2 && (t.hexPad === "left" ? n = "0x0" + n.substring(2) : t.hexPad === "right" ? n += "0" : zt.throwArgumentError("hex data is odd-length", "value", n)), n.toLowerCase();
  if (In(n)) {
    let e = "0x";
    for (let r = 0; r < n.length; r++) {
      let i = n[r];
      e += ti[(i & 240) >> 4] + ti[i & 15];
    }
    return e;
  }
  return zt.throwArgumentError("invalid hexlify value", "value", n);
}
function wr(n) {
  if (typeof n != "string")
    n = G(n);
  else if (!at(n) || n.length % 2)
    return null;
  return (n.length - 2) / 2;
}
function te(n, t, e) {
  return typeof n != "string" ? n = G(n) : (!at(n) || n.length % 2) && zt.throwArgumentError("invalid hexData", "value", n), t = 2 + 2 * t, e != null ? "0x" + n.substring(t, 2 + 2 * e) : "0x" + n.substring(t);
}
function se(n) {
  let t = "0x";
  return n.forEach((e) => {
    t += G(e).substring(2);
  }), t;
}
function ki(n) {
  const t = ea(G(n, { hexPad: "left" }));
  return t === "0x" ? "0x0" : t;
}
function ea(n) {
  typeof n != "string" && (n = G(n)), at(n) || zt.throwArgumentError("invalid hex string", "value", n), n = n.substring(2);
  let t = 0;
  for (; t < n.length && n[t] === "0"; )
    t++;
  return "0x" + n.substring(t);
}
function jt(n, t) {
  for (typeof n != "string" ? n = G(n) : at(n) || zt.throwArgumentError("invalid hex string", "value", n), n.length > 2 * t + 2 && zt.throwArgumentError("value out of range", "value", arguments[1]); n.length < 2 * t + 2; )
    n = "0x0" + n.substring(2);
  return n;
}
function Tn(n) {
  const t = {
    r: "0x",
    s: "0x",
    _vs: "0x",
    recoveryParam: 0,
    v: 0,
    yParityAndS: "0x",
    compact: "0x"
  };
  if (Si(n)) {
    let e = V(n);
    e.length === 64 ? (t.v = 27 + (e[32] >> 7), e[32] &= 127, t.r = G(e.slice(0, 32)), t.s = G(e.slice(32, 64))) : e.length === 65 ? (t.r = G(e.slice(0, 32)), t.s = G(e.slice(32, 64)), t.v = e[64]) : zt.throwArgumentError("invalid signature string", "signature", n), t.v < 27 && (t.v === 0 || t.v === 1 ? t.v += 27 : zt.throwArgumentError("signature invalid v byte", "signature", n)), t.recoveryParam = 1 - t.v % 2, t.recoveryParam && (e[32] |= 128), t._vs = G(e.slice(32, 64));
  } else {
    if (t.r = n.r, t.s = n.s, t.v = n.v, t.recoveryParam = n.recoveryParam, t._vs = n._vs, t._vs != null) {
      const i = ta(V(t._vs), 32);
      t._vs = G(i);
      const s = i[0] >= 128 ? 1 : 0;
      t.recoveryParam == null ? t.recoveryParam = s : t.recoveryParam !== s && zt.throwArgumentError("signature recoveryParam mismatch _vs", "signature", n), i[0] &= 127;
      const o = G(i);
      t.s == null ? t.s = o : t.s !== o && zt.throwArgumentError("signature v mismatch _vs", "signature", n);
    }
    if (t.recoveryParam == null)
      t.v == null ? zt.throwArgumentError("signature missing v and recoveryParam", "signature", n) : t.v === 0 || t.v === 1 ? t.recoveryParam = t.v : t.recoveryParam = 1 - t.v % 2;
    else if (t.v == null)
      t.v = 27 + t.recoveryParam;
    else {
      const i = t.v === 0 || t.v === 1 ? t.v : 1 - t.v % 2;
      t.recoveryParam !== i && zt.throwArgumentError("signature recoveryParam mismatch v", "signature", n);
    }
    t.r == null || !at(t.r) ? zt.throwArgumentError("signature missing or invalid r", "signature", n) : t.r = jt(t.r, 32), t.s == null || !at(t.s) ? zt.throwArgumentError("signature missing or invalid s", "signature", n) : t.s = jt(t.s, 32);
    const e = V(t.s);
    e[0] >= 128 && zt.throwArgumentError("signature s out of range", "signature", n), t.recoveryParam && (e[0] |= 128);
    const r = G(e);
    t._vs && (at(t._vs) || zt.throwArgumentError("signature invalid _vs", "signature", n), t._vs = jt(t._vs, 32)), t._vs == null ? t._vs = r : t._vs !== r && zt.throwArgumentError("signature _vs mismatch v and s", "signature", n);
  }
  return t.yParityAndS = t._vs, t.compact = t.r + t.yParityAndS.substring(2), t;
}
const ra = "bignumber/5.6.1";
var _n = Y.BN;
const Ue = new M(ra), ei = {}, Ki = 9007199254740991;
let Ji = !1;
class U {
  constructor(t, e) {
    t !== ei && Ue.throwError("cannot call constructor directly; use BigNumber.from", M.errors.UNSUPPORTED_OPERATION, {
      operation: "new (BigNumber)"
    }), this._hex = e, this._isBigNumber = !0, Object.freeze(this);
  }
  fromTwos(t) {
    return ie(rt(this).fromTwos(t));
  }
  toTwos(t) {
    return ie(rt(this).toTwos(t));
  }
  abs() {
    return this._hex[0] === "-" ? U.from(this._hex.substring(1)) : this;
  }
  add(t) {
    return ie(rt(this).add(rt(t)));
  }
  sub(t) {
    return ie(rt(this).sub(rt(t)));
  }
  div(t) {
    return U.from(t).isZero() && de("division-by-zero", "div"), ie(rt(this).div(rt(t)));
  }
  mul(t) {
    return ie(rt(this).mul(rt(t)));
  }
  mod(t) {
    const e = rt(t);
    return e.isNeg() && de("division-by-zero", "mod"), ie(rt(this).umod(e));
  }
  pow(t) {
    const e = rt(t);
    return e.isNeg() && de("negative-power", "pow"), ie(rt(this).pow(e));
  }
  and(t) {
    const e = rt(t);
    return (this.isNegative() || e.isNeg()) && de("unbound-bitwise-result", "and"), ie(rt(this).and(e));
  }
  or(t) {
    const e = rt(t);
    return (this.isNegative() || e.isNeg()) && de("unbound-bitwise-result", "or"), ie(rt(this).or(e));
  }
  xor(t) {
    const e = rt(t);
    return (this.isNegative() || e.isNeg()) && de("unbound-bitwise-result", "xor"), ie(rt(this).xor(e));
  }
  mask(t) {
    return (this.isNegative() || t < 0) && de("negative-width", "mask"), ie(rt(this).maskn(t));
  }
  shl(t) {
    return (this.isNegative() || t < 0) && de("negative-width", "shl"), ie(rt(this).shln(t));
  }
  shr(t) {
    return (this.isNegative() || t < 0) && de("negative-width", "shr"), ie(rt(this).shrn(t));
  }
  eq(t) {
    return rt(this).eq(rt(t));
  }
  lt(t) {
    return rt(this).lt(rt(t));
  }
  lte(t) {
    return rt(this).lte(rt(t));
  }
  gt(t) {
    return rt(this).gt(rt(t));
  }
  gte(t) {
    return rt(this).gte(rt(t));
  }
  isNegative() {
    return this._hex[0] === "-";
  }
  isZero() {
    return rt(this).isZero();
  }
  toNumber() {
    try {
      return rt(this).toNumber();
    } catch {
      de("overflow", "toNumber", this.toString());
    }
    return null;
  }
  toBigInt() {
    try {
      return BigInt(this.toString());
    } catch {
    }
    return Ue.throwError("this platform does not support BigInt", M.errors.UNSUPPORTED_OPERATION, {
      value: this.toString()
    });
  }
  toString() {
    return arguments.length > 0 && (arguments[0] === 10 ? Ji || (Ji = !0, Ue.warn("BigNumber.toString does not accept any parameters; base-10 is assumed")) : arguments[0] === 16 ? Ue.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", M.errors.UNEXPECTED_ARGUMENT, {}) : Ue.throwError("BigNumber.toString does not accept parameters", M.errors.UNEXPECTED_ARGUMENT, {})), rt(this).toString(10);
  }
  toHexString() {
    return this._hex;
  }
  toJSON(t) {
    return { type: "BigNumber", hex: this.toHexString() };
  }
  static from(t) {
    if (t instanceof U)
      return t;
    if (typeof t == "string")
      return t.match(/^-?0x[0-9a-f]+$/i) ? new U(ei, Xr(t)) : t.match(/^-?[0-9]+$/) ? new U(ei, Xr(new _n(t))) : Ue.throwArgumentError("invalid BigNumber string", "value", t);
    if (typeof t == "number")
      return t % 1 && de("underflow", "BigNumber.from", t), (t >= Ki || t <= -Ki) && de("overflow", "BigNumber.from", t), U.from(String(t));
    const e = t;
    if (typeof e == "bigint")
      return U.from(e.toString());
    if (In(e))
      return U.from(G(e));
    if (e)
      if (e.toHexString) {
        const r = e.toHexString();
        if (typeof r == "string")
          return U.from(r);
      } else {
        let r = e._hex;
        if (r == null && e.type === "BigNumber" && (r = e.hex), typeof r == "string" && (at(r) || r[0] === "-" && at(r.substring(1))))
          return U.from(r);
      }
    return Ue.throwArgumentError("invalid BigNumber value", "value", t);
  }
  static isBigNumber(t) {
    return !!(t && t._isBigNumber);
  }
}
function Xr(n) {
  if (typeof n != "string")
    return Xr(n.toString(16));
  if (n[0] === "-")
    return n = n.substring(1), n[0] === "-" && Ue.throwArgumentError("invalid hex", "value", n), n = Xr(n), n === "0x00" ? n : "-" + n;
  if (n.substring(0, 2) !== "0x" && (n = "0x" + n), n === "0x")
    return "0x00";
  for (n.length % 2 && (n = "0x0" + n.substring(2)); n.length > 4 && n.substring(0, 4) === "0x00"; )
    n = "0x" + n.substring(4);
  return n;
}
function ie(n) {
  return U.from(Xr(n));
}
function rt(n) {
  const t = U.from(n).toHexString();
  return t[0] === "-" ? new _n("-" + t.substring(3), 16) : new _n(t.substring(2), 16);
}
function de(n, t, e) {
  const r = { fault: n, operation: t };
  return e != null && (r.value = e), Ue.throwError(n, M.errors.NUMERIC_FAULT, r);
}
function na(n) {
  return new _n(n, 36).toString(16);
}
const ia = "properties/5.6.0";
var sa = function(n, t, e, r) {
  function i(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function u(g) {
      try {
        d(r.next(g));
      } catch (w) {
        o(w);
      }
    }
    function l(g) {
      try {
        d(r.throw(g));
      } catch (w) {
        o(w);
      }
    }
    function d(g) {
      g.done ? s(g.value) : i(g.value).then(u, l);
    }
    d((r = r.apply(n, t || [])).next());
  });
};
const En = new M(ia);
function C(n, t, e) {
  Object.defineProperty(n, t, {
    enumerable: !0,
    value: e,
    writable: !1
  });
}
function ke(n, t) {
  for (let e = 0; e < 32; e++) {
    if (n[t])
      return n[t];
    if (!n.prototype || typeof n.prototype != "object")
      break;
    n = Object.getPrototypeOf(n.prototype).constructor;
  }
  return null;
}
function Vt(n) {
  return sa(this, void 0, void 0, function* () {
    const t = Object.keys(n).map((r) => {
      const i = n[r];
      return Promise.resolve(i).then((s) => ({ key: r, value: s }));
    });
    return (yield Promise.all(t)).reduce((r, i) => (r[i.key] = i.value, r), {});
  });
}
function oa(n, t) {
  (!n || typeof n != "object") && En.throwArgumentError("invalid object", "object", n), Object.keys(n).forEach((e) => {
    t[e] || En.throwArgumentError("invalid object key - " + e, "transaction:" + e, n);
  });
}
function Xt(n) {
  const t = {};
  for (const e in n)
    t[e] = n[e];
  return t;
}
const aa = { bigint: !0, boolean: !0, function: !0, number: !0, string: !0 };
function $s(n) {
  if (n == null || aa[typeof n])
    return !0;
  if (Array.isArray(n) || typeof n == "object") {
    if (!Object.isFrozen(n))
      return !1;
    const t = Object.keys(n);
    for (let e = 0; e < t.length; e++) {
      let r = null;
      try {
        r = n[t[e]];
      } catch {
        continue;
      }
      if (!$s(r))
        return !1;
    }
    return !0;
  }
  return En.throwArgumentError(`Cannot deepCopy ${typeof n}`, "object", n);
}
function fa(n) {
  if ($s(n))
    return n;
  if (Array.isArray(n))
    return Object.freeze(n.map((t) => ze(t)));
  if (typeof n == "object") {
    const t = {};
    for (const e in n) {
      const r = n[e];
      r !== void 0 && C(t, e, ze(r));
    }
    return t;
  }
  return En.throwArgumentError(`Cannot deepCopy ${typeof n}`, "object", n);
}
function ze(n) {
  return fa(n);
}
class rn {
  constructor(t) {
    for (const e in t)
      this[e] = ze(t[e]);
  }
}
const nn = "abi/5.6.2", it = new M(nn), xr = {};
let Xi = { calldata: !0, memory: !0, storage: !0 }, ua = { calldata: !0, memory: !0 };
function un(n, t) {
  if (n === "bytes" || n === "string") {
    if (Xi[t])
      return !0;
  } else if (n === "address") {
    if (t === "payable")
      return !0;
  } else if ((n.indexOf("[") >= 0 || n === "tuple") && ua[t])
    return !0;
  return (Xi[t] || t === "payable") && it.throwArgumentError("invalid modifier", "name", t), !1;
}
function ha(n, t) {
  let e = n;
  function r(u) {
    it.throwArgumentError(`unexpected character at position ${u}`, "param", n);
  }
  n = n.replace(/\s/g, " ");
  function i(u) {
    let l = { type: "", name: "", parent: u, state: { allowType: !0 } };
    return t && (l.indexed = !1), l;
  }
  let s = { type: "", name: "", state: { allowType: !0 } }, o = s;
  for (let u = 0; u < n.length; u++) {
    let l = n[u];
    switch (l) {
      case "(":
        o.state.allowType && o.type === "" ? o.type = "tuple" : o.state.allowParams || r(u), o.state.allowType = !1, o.type = Nr(o.type), o.components = [i(o)], o = o.components[0];
        break;
      case ")":
        delete o.state, o.name === "indexed" && (t || r(u), o.indexed = !0, o.name = ""), un(o.type, o.name) && (o.name = ""), o.type = Nr(o.type);
        let d = o;
        o = o.parent, o || r(u), delete d.parent, o.state.allowParams = !1, o.state.allowName = !0, o.state.allowArray = !0;
        break;
      case ",":
        delete o.state, o.name === "indexed" && (t || r(u), o.indexed = !0, o.name = ""), un(o.type, o.name) && (o.name = ""), o.type = Nr(o.type);
        let g = i(o.parent);
        o.parent.components.push(g), delete o.parent, o = g;
        break;
      case " ":
        o.state.allowType && o.type !== "" && (o.type = Nr(o.type), delete o.state.allowType, o.state.allowName = !0, o.state.allowParams = !0), o.state.allowName && o.name !== "" && (o.name === "indexed" ? (t || r(u), o.indexed && r(u), o.indexed = !0, o.name = "") : un(o.type, o.name) ? o.name = "" : o.state.allowName = !1);
        break;
      case "[":
        o.state.allowArray || r(u), o.type += l, o.state.allowArray = !1, o.state.allowName = !1, o.state.readArray = !0;
        break;
      case "]":
        o.state.readArray || r(u), o.type += l, o.state.readArray = !1, o.state.allowArray = !0, o.state.allowName = !0;
        break;
      default:
        o.state.allowType ? (o.type += l, o.state.allowParams = !0, o.state.allowArray = !0) : o.state.allowName ? (o.name += l, delete o.state.allowArray) : o.state.readArray ? o.type += l : r(u);
    }
  }
  return o.parent && it.throwArgumentError("unexpected eof", "param", n), delete s.state, o.name === "indexed" ? (t || r(e.length - 7), o.indexed && r(e.length - 7), o.indexed = !0, o.name = "") : un(o.type, o.name) && (o.name = ""), s.type = Nr(s.type), s;
}
function gn(n, t) {
  for (let e in t)
    C(n, e, t[e]);
}
const ot = Object.freeze({
  // Bare formatting, as is needed for computing a sighash of an event or function
  sighash: "sighash",
  // Human-Readable with Minimal spacing and without names (compact human-readable)
  minimal: "minimal",
  // Human-Readable with nice spacing, including all names
  full: "full",
  // JSON-format a la Solidity
  json: "json"
}), la = new RegExp(/^(.*)\[([0-9]*)\]$/);
class Jt {
  constructor(t, e) {
    t !== xr && it.throwError("use fromString", M.errors.UNSUPPORTED_OPERATION, {
      operation: "new ParamType()"
    }), gn(this, e);
    let r = this.type.match(la);
    r ? gn(this, {
      arrayLength: parseInt(r[2] || "-1"),
      arrayChildren: Jt.fromObject({
        type: r[1],
        components: this.components
      }),
      baseType: "array"
    }) : gn(this, {
      arrayLength: null,
      arrayChildren: null,
      baseType: this.components != null ? "tuple" : this.type
    }), this._isParamType = !0, Object.freeze(this);
  }
  // Format the parameter fragment
  //   - sighash: "(uint256,address)"
  //   - minimal: "tuple(uint256,address) indexed"
  //   - full:    "tuple(uint256 foo, address bar) indexed baz"
  format(t) {
    if (t || (t = ot.sighash), ot[t] || it.throwArgumentError("invalid format type", "format", t), t === ot.json) {
      let r = {
        type: this.baseType === "tuple" ? "tuple" : this.type,
        name: this.name || void 0
      };
      return typeof this.indexed == "boolean" && (r.indexed = this.indexed), this.components && (r.components = this.components.map((i) => JSON.parse(i.format(t)))), JSON.stringify(r);
    }
    let e = "";
    return this.baseType === "array" ? (e += this.arrayChildren.format(t), e += "[" + (this.arrayLength < 0 ? "" : String(this.arrayLength)) + "]") : this.baseType === "tuple" ? (t !== ot.sighash && (e += this.type), e += "(" + this.components.map((r) => r.format(t)).join(t === ot.full ? ", " : ",") + ")") : e += this.type, t !== ot.sighash && (this.indexed === !0 && (e += " indexed"), t === ot.full && this.name && (e += " " + this.name)), e;
  }
  static from(t, e) {
    return typeof t == "string" ? Jt.fromString(t, e) : Jt.fromObject(t);
  }
  static fromObject(t) {
    return Jt.isParamType(t) ? t : new Jt(xr, {
      name: t.name || null,
      type: Nr(t.type),
      indexed: t.indexed == null ? null : !!t.indexed,
      components: t.components ? t.components.map(Jt.fromObject) : null
    });
  }
  static fromString(t, e) {
    function r(i) {
      return Jt.fromObject({
        name: i.name,
        type: i.type,
        indexed: i.indexed,
        components: i.components
      });
    }
    return r(ha(t, !!e));
  }
  static isParamType(t) {
    return !!(t != null && t._isParamType);
  }
}
function Zr(n, t) {
  return da(n).map((e) => Jt.fromString(e, t));
}
class qe {
  constructor(t, e) {
    t !== xr && it.throwError("use a static from method", M.errors.UNSUPPORTED_OPERATION, {
      operation: "new Fragment()"
    }), gn(this, e), this._isFragment = !0, Object.freeze(this);
  }
  static from(t) {
    return qe.isFragment(t) ? t : typeof t == "string" ? qe.fromString(t) : qe.fromObject(t);
  }
  static fromObject(t) {
    if (qe.isFragment(t))
      return t;
    switch (t.type) {
      case "function":
        return Se.fromObject(t);
      case "event":
        return $e.fromObject(t);
      case "constructor":
        return Pe.fromObject(t);
      case "error":
        return rr.fromObject(t);
      case "fallback":
      case "receive":
        return null;
    }
    return it.throwArgumentError("invalid fragment object", "value", t);
  }
  static fromString(t) {
    return t = t.replace(/\s/g, " "), t = t.replace(/\(/g, " (").replace(/\)/g, ") ").replace(/\s+/g, " "), t = t.trim(), t.split(" ")[0] === "event" ? $e.fromString(t.substring(5).trim()) : t.split(" ")[0] === "function" ? Se.fromString(t.substring(8).trim()) : t.split("(")[0].trim() === "constructor" ? Pe.fromString(t.trim()) : t.split(" ")[0] === "error" ? rr.fromString(t.substring(5).trim()) : it.throwArgumentError("unsupported fragment", "value", t);
  }
  static isFragment(t) {
    return !!(t && t._isFragment);
  }
}
class $e extends qe {
  format(t) {
    if (t || (t = ot.sighash), ot[t] || it.throwArgumentError("invalid format type", "format", t), t === ot.json)
      return JSON.stringify({
        type: "event",
        anonymous: this.anonymous,
        name: this.name,
        inputs: this.inputs.map((r) => JSON.parse(r.format(t)))
      });
    let e = "";
    return t !== ot.sighash && (e += "event "), e += this.name + "(" + this.inputs.map((r) => r.format(t)).join(t === ot.full ? ", " : ",") + ") ", t !== ot.sighash && this.anonymous && (e += "anonymous "), e.trim();
  }
  static from(t) {
    return typeof t == "string" ? $e.fromString(t) : $e.fromObject(t);
  }
  static fromObject(t) {
    if ($e.isEventFragment(t))
      return t;
    t.type !== "event" && it.throwArgumentError("invalid event object", "value", t);
    const e = {
      name: Yr(t.name),
      anonymous: t.anonymous,
      inputs: t.inputs ? t.inputs.map(Jt.fromObject) : [],
      type: "event"
    };
    return new $e(xr, e);
  }
  static fromString(t) {
    let e = t.match(Qr);
    e || it.throwArgumentError("invalid event string", "value", t);
    let r = !1;
    return e[3].split(" ").forEach((i) => {
      switch (i.trim()) {
        case "anonymous":
          r = !0;
          break;
        case "":
          break;
        default:
          it.warn("unknown modifier: " + i);
      }
    }), $e.fromObject({
      name: e[1].trim(),
      anonymous: r,
      inputs: Zr(e[2], !0),
      type: "event"
    });
  }
  static isEventFragment(t) {
    return t && t._isFragment && t.type === "event";
  }
}
function qs(n, t) {
  t.gas = null;
  let e = n.split("@");
  return e.length !== 1 ? (e.length > 2 && it.throwArgumentError("invalid human-readable ABI signature", "value", n), e[1].match(/^[0-9]+$/) || it.throwArgumentError("invalid human-readable ABI signature gas", "value", n), t.gas = U.from(e[1]), e[0]) : n;
}
function zs(n, t) {
  t.constant = !1, t.payable = !1, t.stateMutability = "nonpayable", n.split(" ").forEach((e) => {
    switch (e.trim()) {
      case "constant":
        t.constant = !0;
        break;
      case "payable":
        t.payable = !0, t.stateMutability = "payable";
        break;
      case "nonpayable":
        t.payable = !1, t.stateMutability = "nonpayable";
        break;
      case "pure":
        t.constant = !0, t.stateMutability = "pure";
        break;
      case "view":
        t.constant = !0, t.stateMutability = "view";
        break;
      case "external":
      case "public":
      case "":
        break;
      default:
        console.log("unknown modifier: " + e);
    }
  });
}
function Gs(n) {
  let t = {
    constant: !1,
    payable: !0,
    stateMutability: "payable"
  };
  return n.stateMutability != null ? (t.stateMutability = n.stateMutability, t.constant = t.stateMutability === "view" || t.stateMutability === "pure", n.constant != null && !!n.constant !== t.constant && it.throwArgumentError("cannot have constant function with mutability " + t.stateMutability, "value", n), t.payable = t.stateMutability === "payable", n.payable != null && !!n.payable !== t.payable && it.throwArgumentError("cannot have payable function with mutability " + t.stateMutability, "value", n)) : n.payable != null ? (t.payable = !!n.payable, n.constant == null && !t.payable && n.type !== "constructor" && it.throwArgumentError("unable to determine stateMutability", "value", n), t.constant = !!n.constant, t.constant ? t.stateMutability = "view" : t.stateMutability = t.payable ? "payable" : "nonpayable", t.payable && t.constant && it.throwArgumentError("cannot have constant payable function", "value", n)) : n.constant != null ? (t.constant = !!n.constant, t.payable = !t.constant, t.stateMutability = t.constant ? "view" : "payable") : n.type !== "constructor" && it.throwArgumentError("unable to determine stateMutability", "value", n), t;
}
class Pe extends qe {
  format(t) {
    if (t || (t = ot.sighash), ot[t] || it.throwArgumentError("invalid format type", "format", t), t === ot.json)
      return JSON.stringify({
        type: "constructor",
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas ? this.gas.toNumber() : void 0,
        inputs: this.inputs.map((r) => JSON.parse(r.format(t)))
      });
    t === ot.sighash && it.throwError("cannot format a constructor for sighash", M.errors.UNSUPPORTED_OPERATION, {
      operation: "format(sighash)"
    });
    let e = "constructor(" + this.inputs.map((r) => r.format(t)).join(t === ot.full ? ", " : ",") + ") ";
    return this.stateMutability && this.stateMutability !== "nonpayable" && (e += this.stateMutability + " "), e.trim();
  }
  static from(t) {
    return typeof t == "string" ? Pe.fromString(t) : Pe.fromObject(t);
  }
  static fromObject(t) {
    if (Pe.isConstructorFragment(t))
      return t;
    t.type !== "constructor" && it.throwArgumentError("invalid constructor object", "value", t);
    let e = Gs(t);
    e.constant && it.throwArgumentError("constructor cannot be constant", "value", t);
    const r = {
      name: null,
      type: t.type,
      inputs: t.inputs ? t.inputs.map(Jt.fromObject) : [],
      payable: e.payable,
      stateMutability: e.stateMutability,
      gas: t.gas ? U.from(t.gas) : null
    };
    return new Pe(xr, r);
  }
  static fromString(t) {
    let e = { type: "constructor" };
    t = qs(t, e);
    let r = t.match(Qr);
    return (!r || r[1].trim() !== "constructor") && it.throwArgumentError("invalid constructor string", "value", t), e.inputs = Zr(r[2].trim(), !1), zs(r[3].trim(), e), Pe.fromObject(e);
  }
  static isConstructorFragment(t) {
    return t && t._isFragment && t.type === "constructor";
  }
}
class Se extends Pe {
  format(t) {
    if (t || (t = ot.sighash), ot[t] || it.throwArgumentError("invalid format type", "format", t), t === ot.json)
      return JSON.stringify({
        type: "function",
        name: this.name,
        constant: this.constant,
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas ? this.gas.toNumber() : void 0,
        inputs: this.inputs.map((r) => JSON.parse(r.format(t))),
        outputs: this.outputs.map((r) => JSON.parse(r.format(t)))
      });
    let e = "";
    return t !== ot.sighash && (e += "function "), e += this.name + "(" + this.inputs.map((r) => r.format(t)).join(t === ot.full ? ", " : ",") + ") ", t !== ot.sighash && (this.stateMutability ? this.stateMutability !== "nonpayable" && (e += this.stateMutability + " ") : this.constant && (e += "view "), this.outputs && this.outputs.length && (e += "returns (" + this.outputs.map((r) => r.format(t)).join(", ") + ") "), this.gas != null && (e += "@" + this.gas.toString() + " ")), e.trim();
  }
  static from(t) {
    return typeof t == "string" ? Se.fromString(t) : Se.fromObject(t);
  }
  static fromObject(t) {
    if (Se.isFunctionFragment(t))
      return t;
    t.type !== "function" && it.throwArgumentError("invalid function object", "value", t);
    let e = Gs(t);
    const r = {
      type: t.type,
      name: Yr(t.name),
      constant: e.constant,
      inputs: t.inputs ? t.inputs.map(Jt.fromObject) : [],
      outputs: t.outputs ? t.outputs.map(Jt.fromObject) : [],
      payable: e.payable,
      stateMutability: e.stateMutability,
      gas: t.gas ? U.from(t.gas) : null
    };
    return new Se(xr, r);
  }
  static fromString(t) {
    let e = { type: "function" };
    t = qs(t, e);
    let r = t.split(" returns ");
    r.length > 2 && it.throwArgumentError("invalid function string", "value", t);
    let i = r[0].match(Qr);
    if (i || it.throwArgumentError("invalid function signature", "value", t), e.name = i[1].trim(), e.name && Yr(e.name), e.inputs = Zr(i[2], !1), zs(i[3].trim(), e), r.length > 1) {
      let s = r[1].match(Qr);
      (s[1].trim() != "" || s[3].trim() != "") && it.throwArgumentError("unexpected tokens", "value", t), e.outputs = Zr(s[2], !1);
    } else
      e.outputs = [];
    return Se.fromObject(e);
  }
  static isFunctionFragment(t) {
    return t && t._isFragment && t.type === "function";
  }
}
function Zi(n) {
  const t = n.format();
  return (t === "Error(string)" || t === "Panic(uint256)") && it.throwArgumentError(`cannot specify user defined ${t} error`, "fragment", n), n;
}
class rr extends qe {
  format(t) {
    if (t || (t = ot.sighash), ot[t] || it.throwArgumentError("invalid format type", "format", t), t === ot.json)
      return JSON.stringify({
        type: "error",
        name: this.name,
        inputs: this.inputs.map((r) => JSON.parse(r.format(t)))
      });
    let e = "";
    return t !== ot.sighash && (e += "error "), e += this.name + "(" + this.inputs.map((r) => r.format(t)).join(t === ot.full ? ", " : ",") + ") ", e.trim();
  }
  static from(t) {
    return typeof t == "string" ? rr.fromString(t) : rr.fromObject(t);
  }
  static fromObject(t) {
    if (rr.isErrorFragment(t))
      return t;
    t.type !== "error" && it.throwArgumentError("invalid error object", "value", t);
    const e = {
      type: t.type,
      name: Yr(t.name),
      inputs: t.inputs ? t.inputs.map(Jt.fromObject) : []
    };
    return Zi(new rr(xr, e));
  }
  static fromString(t) {
    let e = { type: "error" }, r = t.match(Qr);
    return r || it.throwArgumentError("invalid error signature", "value", t), e.name = r[1].trim(), e.name && Yr(e.name), e.inputs = Zr(r[2], !1), Zi(rr.fromObject(e));
  }
  static isErrorFragment(t) {
    return t && t._isFragment && t.type === "error";
  }
}
function Nr(n) {
  return n.match(/^uint($|[^1-9])/) ? n = "uint256" + n.substring(4) : n.match(/^int($|[^1-9])/) && (n = "int256" + n.substring(3)), n;
}
const ca = new RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$");
function Yr(n) {
  return (!n || !n.match(ca)) && it.throwArgumentError(`invalid identifier "${n}"`, "value", n), n;
}
const Qr = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
function da(n) {
  n = n.trim();
  let t = [], e = "", r = 0;
  for (let i = 0; i < n.length; i++) {
    let s = n[i];
    s === "," && r === 0 ? (t.push(e), e = "") : (e += s, s === "(" ? r++ : s === ")" && (r--, r === -1 && it.throwArgumentError("unbalanced parenthesis", "value", n)));
  }
  return e && t.push(e), t;
}
const Ri = new M(nn);
function pa(n) {
  const t = [], e = function(r, i) {
    if (Array.isArray(i))
      for (let s in i) {
        const o = r.slice();
        o.push(s);
        try {
          e(o, i[s]);
        } catch (u) {
          t.push({ path: o, error: u });
        }
      }
  };
  return e([], n), t;
}
class Ve {
  constructor(t, e, r, i) {
    this.name = t, this.type = e, this.localName = r, this.dynamic = i;
  }
  _throwError(t, e) {
    Ri.throwArgumentError(t, this.localName, e);
  }
}
class gi {
  constructor(t) {
    C(this, "wordSize", t || 32), this._data = [], this._dataLength = 0, this._padding = new Uint8Array(t);
  }
  get data() {
    return se(this._data);
  }
  get length() {
    return this._dataLength;
  }
  _writeData(t) {
    return this._data.push(t), this._dataLength += t.length, t.length;
  }
  appendWriter(t) {
    return this._writeData(he(t._data));
  }
  // Arrayish items; padded on the right to wordSize
  writeBytes(t) {
    let e = V(t);
    const r = e.length % this.wordSize;
    return r && (e = he([e, this._padding.slice(r)])), this._writeData(e);
  }
  _getValue(t) {
    let e = V(U.from(t));
    return e.length > this.wordSize && Ri.throwError("value out-of-bounds", M.errors.BUFFER_OVERRUN, {
      length: this.wordSize,
      offset: e.length
    }), e.length % this.wordSize && (e = he([this._padding.slice(e.length % this.wordSize), e])), e;
  }
  // BigNumberish items; padded on the left to wordSize
  writeValue(t) {
    return this._writeData(this._getValue(t));
  }
  writeUpdatableValue() {
    const t = this._data.length;
    return this._data.push(this._padding), this._dataLength += this.wordSize, (e) => {
      this._data[t] = this._getValue(e);
    };
  }
}
class An {
  constructor(t, e, r, i) {
    C(this, "_data", V(t)), C(this, "wordSize", e || 32), C(this, "_coerceFunc", r), C(this, "allowLoose", i), this._offset = 0;
  }
  get data() {
    return G(this._data);
  }
  get consumed() {
    return this._offset;
  }
  // The default Coerce function
  static coerce(t, e) {
    let r = t.match("^u?int([0-9]+)$");
    return r && parseInt(r[1]) <= 48 && (e = e.toNumber()), e;
  }
  coerce(t, e) {
    return this._coerceFunc ? this._coerceFunc(t, e) : An.coerce(t, e);
  }
  _peekBytes(t, e, r) {
    let i = Math.ceil(e / this.wordSize) * this.wordSize;
    return this._offset + i > this._data.length && (this.allowLoose && r && this._offset + e <= this._data.length ? i = e : Ri.throwError("data out-of-bounds", M.errors.BUFFER_OVERRUN, {
      length: this._data.length,
      offset: this._offset + i
    })), this._data.slice(this._offset, this._offset + i);
  }
  subReader(t) {
    return new An(this._data.slice(this._offset + t), this.wordSize, this._coerceFunc, this.allowLoose);
  }
  readBytes(t, e) {
    let r = this._peekBytes(0, t, !!e);
    return this._offset += r.length, r.slice(0, t);
  }
  readValue() {
    return U.from(this.readBytes(this.wordSize));
  }
}
var js = { exports: {} };
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
(function(n) {
  (function() {
    var t = "input is invalid type", e = "finalize already called", r = typeof window == "object", i = r ? window : {};
    i.JS_SHA3_NO_WINDOW && (r = !1);
    var s = !r && typeof self == "object", o = !i.JS_SHA3_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node;
    o ? i = Us : s && (i = self);
    var u = !i.JS_SHA3_NO_COMMON_JS && !0 && n.exports, l = !i.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", d = "0123456789abcdef".split(""), g = [31, 7936, 2031616, 520093696], w = [4, 1024, 262144, 67108864], A = [1, 256, 65536, 16777216], P = [6, 1536, 393216, 100663296], N = [0, 8, 16, 24], I = [
      1,
      0,
      32898,
      0,
      32906,
      2147483648,
      2147516416,
      2147483648,
      32907,
      0,
      2147483649,
      0,
      2147516545,
      2147483648,
      32777,
      2147483648,
      138,
      0,
      136,
      0,
      2147516425,
      0,
      2147483658,
      0,
      2147516555,
      0,
      139,
      2147483648,
      32905,
      2147483648,
      32771,
      2147483648,
      32770,
      2147483648,
      128,
      2147483648,
      32778,
      0,
      2147483658,
      2147483648,
      2147516545,
      2147483648,
      32896,
      2147483648,
      2147483649,
      0,
      2147516424,
      2147483648
    ], H = [224, 256, 384, 512], R = [128, 256], L = ["hex", "buffer", "arrayBuffer", "array", "digest"], j = {
      128: 168,
      256: 136
    };
    (i.JS_SHA3_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(c) {
      return Object.prototype.toString.call(c) === "[object Array]";
    }), l && (i.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(c) {
      return typeof c == "object" && c.buffer && c.buffer.constructor === ArrayBuffer;
    });
    for (var J = function(c, S, k) {
      return function(T) {
        return new O(c, S, c).update(T)[k]();
      };
    }, Q = function(c, S, k) {
      return function(T, B) {
        return new O(c, S, B).update(T)[k]();
      };
    }, ft = function(c, S, k) {
      return function(T, B, F, W) {
        return p["cshake" + c].update(T, B, F, W)[k]();
      };
    }, Kt = function(c, S, k) {
      return function(T, B, F, W) {
        return p["kmac" + c].update(T, B, F, W)[k]();
      };
    }, Ht = function(c, S, k, T) {
      for (var B = 0; B < L.length; ++B) {
        var F = L[B];
        c[F] = S(k, T, F);
      }
      return c;
    }, st = function(c, S) {
      var k = J(c, S, "hex");
      return k.create = function() {
        return new O(c, S, c);
      }, k.update = function(T) {
        return k.create().update(T);
      }, Ht(k, J, c, S);
    }, ce = function(c, S) {
      var k = Q(c, S, "hex");
      return k.create = function(T) {
        return new O(c, S, T);
      }, k.update = function(T, B) {
        return k.create(B).update(T);
      }, Ht(k, Q, c, S);
    }, x = function(c, S) {
      var k = j[c], T = ft(c, S, "hex");
      return T.create = function(B, F, W) {
        return !F && !W ? p["shake" + c].create(B) : new O(c, S, B).bytepad([F, W], k);
      }, T.update = function(B, F, W, D) {
        return T.create(F, W, D).update(B);
      }, Ht(T, ft, c, S);
    }, a = function(c, S) {
      var k = j[c], T = Kt(c, S, "hex");
      return T.create = function(B, F, W) {
        return new q(c, S, F).bytepad(["KMAC", W], k).bytepad([B], k);
      }, T.update = function(B, F, W, D) {
        return T.create(B, W, D).update(F);
      }, Ht(T, Kt, c, S);
    }, h = [
      { name: "keccak", padding: A, bits: H, createMethod: st },
      { name: "sha3", padding: P, bits: H, createMethod: st },
      { name: "shake", padding: g, bits: R, createMethod: ce },
      { name: "cshake", padding: w, bits: R, createMethod: x },
      { name: "kmac", padding: w, bits: R, createMethod: a }
    ], p = {}, m = [], y = 0; y < h.length; ++y)
      for (var _ = h[y], E = _.bits, v = 0; v < E.length; ++v) {
        var f = _.name + "_" + E[v];
        if (m.push(f), p[f] = _.createMethod(E[v], _.padding), _.name !== "sha3") {
          var b = _.name + E[v];
          m.push(b), p[b] = p[f];
        }
      }
    function O(c, S, k) {
      this.blocks = [], this.s = [], this.padding = S, this.outputBits = k, this.reset = !0, this.finalized = !1, this.block = 0, this.start = 0, this.blockCount = 1600 - (c << 1) >> 5, this.byteCount = this.blockCount << 2, this.outputBlocks = k >> 5, this.extraBytes = (k & 31) >> 3;
      for (var T = 0; T < 50; ++T)
        this.s[T] = 0;
    }
    O.prototype.update = function(c) {
      if (this.finalized)
        throw new Error(e);
      var S, k = typeof c;
      if (k !== "string") {
        if (k === "object") {
          if (c === null)
            throw new Error(t);
          if (l && c.constructor === ArrayBuffer)
            c = new Uint8Array(c);
          else if (!Array.isArray(c) && (!l || !ArrayBuffer.isView(c)))
            throw new Error(t);
        } else
          throw new Error(t);
        S = !0;
      }
      for (var T = this.blocks, B = this.byteCount, F = c.length, W = this.blockCount, D = 0, tt = this.s, K, Z; D < F; ) {
        if (this.reset)
          for (this.reset = !1, T[0] = this.block, K = 1; K < W + 1; ++K)
            T[K] = 0;
        if (S)
          for (K = this.start; D < F && K < B; ++D)
            T[K >> 2] |= c[D] << N[K++ & 3];
        else
          for (K = this.start; D < F && K < B; ++D)
            Z = c.charCodeAt(D), Z < 128 ? T[K >> 2] |= Z << N[K++ & 3] : Z < 2048 ? (T[K >> 2] |= (192 | Z >> 6) << N[K++ & 3], T[K >> 2] |= (128 | Z & 63) << N[K++ & 3]) : Z < 55296 || Z >= 57344 ? (T[K >> 2] |= (224 | Z >> 12) << N[K++ & 3], T[K >> 2] |= (128 | Z >> 6 & 63) << N[K++ & 3], T[K >> 2] |= (128 | Z & 63) << N[K++ & 3]) : (Z = 65536 + ((Z & 1023) << 10 | c.charCodeAt(++D) & 1023), T[K >> 2] |= (240 | Z >> 18) << N[K++ & 3], T[K >> 2] |= (128 | Z >> 12 & 63) << N[K++ & 3], T[K >> 2] |= (128 | Z >> 6 & 63) << N[K++ & 3], T[K >> 2] |= (128 | Z & 63) << N[K++ & 3]);
        if (this.lastByteIndex = K, K >= B) {
          for (this.start = K - B, this.block = T[W], K = 0; K < W; ++K)
            tt[K] ^= T[K];
          z(tt), this.reset = !0;
        } else
          this.start = K;
      }
      return this;
    }, O.prototype.encode = function(c, S) {
      var k = c & 255, T = 1, B = [k];
      for (c = c >> 8, k = c & 255; k > 0; )
        B.unshift(k), c = c >> 8, k = c & 255, ++T;
      return S ? B.push(T) : B.unshift(T), this.update(B), B.length;
    }, O.prototype.encodeString = function(c) {
      var S, k = typeof c;
      if (k !== "string") {
        if (k === "object") {
          if (c === null)
            throw new Error(t);
          if (l && c.constructor === ArrayBuffer)
            c = new Uint8Array(c);
          else if (!Array.isArray(c) && (!l || !ArrayBuffer.isView(c)))
            throw new Error(t);
        } else
          throw new Error(t);
        S = !0;
      }
      var T = 0, B = c.length;
      if (S)
        T = B;
      else
        for (var F = 0; F < c.length; ++F) {
          var W = c.charCodeAt(F);
          W < 128 ? T += 1 : W < 2048 ? T += 2 : W < 55296 || W >= 57344 ? T += 3 : (W = 65536 + ((W & 1023) << 10 | c.charCodeAt(++F) & 1023), T += 4);
        }
      return T += this.encode(T * 8), this.update(c), T;
    }, O.prototype.bytepad = function(c, S) {
      for (var k = this.encode(S), T = 0; T < c.length; ++T)
        k += this.encodeString(c[T]);
      var B = S - k % S, F = [];
      return F.length = B, this.update(F), this;
    }, O.prototype.finalize = function() {
      if (!this.finalized) {
        this.finalized = !0;
        var c = this.blocks, S = this.lastByteIndex, k = this.blockCount, T = this.s;
        if (c[S >> 2] |= this.padding[S & 3], this.lastByteIndex === this.byteCount)
          for (c[0] = c[k], S = 1; S < k + 1; ++S)
            c[S] = 0;
        for (c[k - 1] |= 2147483648, S = 0; S < k; ++S)
          T[S] ^= c[S];
        z(T);
      }
    }, O.prototype.toString = O.prototype.hex = function() {
      this.finalize();
      for (var c = this.blockCount, S = this.s, k = this.outputBlocks, T = this.extraBytes, B = 0, F = 0, W = "", D; F < k; ) {
        for (B = 0; B < c && F < k; ++B, ++F)
          D = S[B], W += d[D >> 4 & 15] + d[D & 15] + d[D >> 12 & 15] + d[D >> 8 & 15] + d[D >> 20 & 15] + d[D >> 16 & 15] + d[D >> 28 & 15] + d[D >> 24 & 15];
        F % c === 0 && (z(S), B = 0);
      }
      return T && (D = S[B], W += d[D >> 4 & 15] + d[D & 15], T > 1 && (W += d[D >> 12 & 15] + d[D >> 8 & 15]), T > 2 && (W += d[D >> 20 & 15] + d[D >> 16 & 15])), W;
    }, O.prototype.arrayBuffer = function() {
      this.finalize();
      var c = this.blockCount, S = this.s, k = this.outputBlocks, T = this.extraBytes, B = 0, F = 0, W = this.outputBits >> 3, D;
      T ? D = new ArrayBuffer(k + 1 << 2) : D = new ArrayBuffer(W);
      for (var tt = new Uint32Array(D); F < k; ) {
        for (B = 0; B < c && F < k; ++B, ++F)
          tt[F] = S[B];
        F % c === 0 && z(S);
      }
      return T && (tt[B] = S[B], D = D.slice(0, W)), D;
    }, O.prototype.buffer = O.prototype.arrayBuffer, O.prototype.digest = O.prototype.array = function() {
      this.finalize();
      for (var c = this.blockCount, S = this.s, k = this.outputBlocks, T = this.extraBytes, B = 0, F = 0, W = [], D, tt; F < k; ) {
        for (B = 0; B < c && F < k; ++B, ++F)
          D = F << 2, tt = S[B], W[D] = tt & 255, W[D + 1] = tt >> 8 & 255, W[D + 2] = tt >> 16 & 255, W[D + 3] = tt >> 24 & 255;
        F % c === 0 && z(S);
      }
      return T && (D = F << 2, tt = S[B], W[D] = tt & 255, T > 1 && (W[D + 1] = tt >> 8 & 255), T > 2 && (W[D + 2] = tt >> 16 & 255)), W;
    };
    function q(c, S, k) {
      O.call(this, c, S, k);
    }
    q.prototype = new O(), q.prototype.finalize = function() {
      return this.encode(this.outputBits, !0), O.prototype.finalize.call(this);
    };
    var z = function(c) {
      var S, k, T, B, F, W, D, tt, K, Z, ut, sr, ht, lt, or, ct, dt, ar, pt, mt, fr, gt, vt, ur, yt, bt, hr, wt, xt, lr, _t, Et, cr, At, Mt, dr, Nt, Pt, pr, St, kt, mr, Rt, It, gr, Tt, Ct, vr, Bt, Ot, yr, Lt, Ft, br, Ut, Dt, We, Ke, Je, Xe, Ze, Ye, Qe;
      for (T = 0; T < 48; T += 2)
        B = c[0] ^ c[10] ^ c[20] ^ c[30] ^ c[40], F = c[1] ^ c[11] ^ c[21] ^ c[31] ^ c[41], W = c[2] ^ c[12] ^ c[22] ^ c[32] ^ c[42], D = c[3] ^ c[13] ^ c[23] ^ c[33] ^ c[43], tt = c[4] ^ c[14] ^ c[24] ^ c[34] ^ c[44], K = c[5] ^ c[15] ^ c[25] ^ c[35] ^ c[45], Z = c[6] ^ c[16] ^ c[26] ^ c[36] ^ c[46], ut = c[7] ^ c[17] ^ c[27] ^ c[37] ^ c[47], sr = c[8] ^ c[18] ^ c[28] ^ c[38] ^ c[48], ht = c[9] ^ c[19] ^ c[29] ^ c[39] ^ c[49], S = sr ^ (W << 1 | D >>> 31), k = ht ^ (D << 1 | W >>> 31), c[0] ^= S, c[1] ^= k, c[10] ^= S, c[11] ^= k, c[20] ^= S, c[21] ^= k, c[30] ^= S, c[31] ^= k, c[40] ^= S, c[41] ^= k, S = B ^ (tt << 1 | K >>> 31), k = F ^ (K << 1 | tt >>> 31), c[2] ^= S, c[3] ^= k, c[12] ^= S, c[13] ^= k, c[22] ^= S, c[23] ^= k, c[32] ^= S, c[33] ^= k, c[42] ^= S, c[43] ^= k, S = W ^ (Z << 1 | ut >>> 31), k = D ^ (ut << 1 | Z >>> 31), c[4] ^= S, c[5] ^= k, c[14] ^= S, c[15] ^= k, c[24] ^= S, c[25] ^= k, c[34] ^= S, c[35] ^= k, c[44] ^= S, c[45] ^= k, S = tt ^ (sr << 1 | ht >>> 31), k = K ^ (ht << 1 | sr >>> 31), c[6] ^= S, c[7] ^= k, c[16] ^= S, c[17] ^= k, c[26] ^= S, c[27] ^= k, c[36] ^= S, c[37] ^= k, c[46] ^= S, c[47] ^= k, S = Z ^ (B << 1 | F >>> 31), k = ut ^ (F << 1 | B >>> 31), c[8] ^= S, c[9] ^= k, c[18] ^= S, c[19] ^= k, c[28] ^= S, c[29] ^= k, c[38] ^= S, c[39] ^= k, c[48] ^= S, c[49] ^= k, lt = c[0], or = c[1], Tt = c[11] << 4 | c[10] >>> 28, Ct = c[10] << 4 | c[11] >>> 28, wt = c[20] << 3 | c[21] >>> 29, xt = c[21] << 3 | c[20] >>> 29, Xe = c[31] << 9 | c[30] >>> 23, Ze = c[30] << 9 | c[31] >>> 23, mr = c[40] << 18 | c[41] >>> 14, Rt = c[41] << 18 | c[40] >>> 14, At = c[2] << 1 | c[3] >>> 31, Mt = c[3] << 1 | c[2] >>> 31, ct = c[13] << 12 | c[12] >>> 20, dt = c[12] << 12 | c[13] >>> 20, vr = c[22] << 10 | c[23] >>> 22, Bt = c[23] << 10 | c[22] >>> 22, lr = c[33] << 13 | c[32] >>> 19, _t = c[32] << 13 | c[33] >>> 19, Ye = c[42] << 2 | c[43] >>> 30, Qe = c[43] << 2 | c[42] >>> 30, br = c[5] << 30 | c[4] >>> 2, Ut = c[4] << 30 | c[5] >>> 2, dr = c[14] << 6 | c[15] >>> 26, Nt = c[15] << 6 | c[14] >>> 26, ar = c[25] << 11 | c[24] >>> 21, pt = c[24] << 11 | c[25] >>> 21, Ot = c[34] << 15 | c[35] >>> 17, yr = c[35] << 15 | c[34] >>> 17, Et = c[45] << 29 | c[44] >>> 3, cr = c[44] << 29 | c[45] >>> 3, ur = c[6] << 28 | c[7] >>> 4, yt = c[7] << 28 | c[6] >>> 4, Dt = c[17] << 23 | c[16] >>> 9, We = c[16] << 23 | c[17] >>> 9, Pt = c[26] << 25 | c[27] >>> 7, pr = c[27] << 25 | c[26] >>> 7, mt = c[36] << 21 | c[37] >>> 11, fr = c[37] << 21 | c[36] >>> 11, Lt = c[47] << 24 | c[46] >>> 8, Ft = c[46] << 24 | c[47] >>> 8, It = c[8] << 27 | c[9] >>> 5, gr = c[9] << 27 | c[8] >>> 5, bt = c[18] << 20 | c[19] >>> 12, hr = c[19] << 20 | c[18] >>> 12, Ke = c[29] << 7 | c[28] >>> 25, Je = c[28] << 7 | c[29] >>> 25, St = c[38] << 8 | c[39] >>> 24, kt = c[39] << 8 | c[38] >>> 24, gt = c[48] << 14 | c[49] >>> 18, vt = c[49] << 14 | c[48] >>> 18, c[0] = lt ^ ~ct & ar, c[1] = or ^ ~dt & pt, c[10] = ur ^ ~bt & wt, c[11] = yt ^ ~hr & xt, c[20] = At ^ ~dr & Pt, c[21] = Mt ^ ~Nt & pr, c[30] = It ^ ~Tt & vr, c[31] = gr ^ ~Ct & Bt, c[40] = br ^ ~Dt & Ke, c[41] = Ut ^ ~We & Je, c[2] = ct ^ ~ar & mt, c[3] = dt ^ ~pt & fr, c[12] = bt ^ ~wt & lr, c[13] = hr ^ ~xt & _t, c[22] = dr ^ ~Pt & St, c[23] = Nt ^ ~pr & kt, c[32] = Tt ^ ~vr & Ot, c[33] = Ct ^ ~Bt & yr, c[42] = Dt ^ ~Ke & Xe, c[43] = We ^ ~Je & Ze, c[4] = ar ^ ~mt & gt, c[5] = pt ^ ~fr & vt, c[14] = wt ^ ~lr & Et, c[15] = xt ^ ~_t & cr, c[24] = Pt ^ ~St & mr, c[25] = pr ^ ~kt & Rt, c[34] = vr ^ ~Ot & Lt, c[35] = Bt ^ ~yr & Ft, c[44] = Ke ^ ~Xe & Ye, c[45] = Je ^ ~Ze & Qe, c[6] = mt ^ ~gt & lt, c[7] = fr ^ ~vt & or, c[16] = lr ^ ~Et & ur, c[17] = _t ^ ~cr & yt, c[26] = St ^ ~mr & At, c[27] = kt ^ ~Rt & Mt, c[36] = Ot ^ ~Lt & It, c[37] = yr ^ ~Ft & gr, c[46] = Xe ^ ~Ye & br, c[47] = Ze ^ ~Qe & Ut, c[8] = gt ^ ~lt & ct, c[9] = vt ^ ~or & dt, c[18] = Et ^ ~ur & bt, c[19] = cr ^ ~yt & hr, c[28] = mr ^ ~At & dr, c[29] = Rt ^ ~Mt & Nt, c[38] = Lt ^ ~It & Tt, c[39] = Ft ^ ~gr & Ct, c[48] = Ye ^ ~br & Dt, c[49] = Qe ^ ~Ut & We, c[0] ^= I[T], c[1] ^= I[T + 1];
    };
    if (u)
      n.exports = p;
    else
      for (y = 0; y < m.length; ++y)
        i[m[y]] = p[m[y]];
  })();
})(js);
var ma = js.exports;
const ga = /* @__PURE__ */ Rn(ma);
function Wt(n) {
  return "0x" + ga.keccak_256(V(n));
}
const va = "rlp/5.6.0", Me = new M(va);
function Yi(n) {
  const t = [];
  for (; n; )
    t.unshift(n & 255), n >>= 8;
  return t;
}
function Qi(n, t, e) {
  let r = 0;
  for (let i = 0; i < e; i++)
    r = r * 256 + n[t + i];
  return r;
}
function Vs(n) {
  if (Array.isArray(n)) {
    let r = [];
    if (n.forEach(function(s) {
      r = r.concat(Vs(s));
    }), r.length <= 55)
      return r.unshift(192 + r.length), r;
    const i = Yi(r.length);
    return i.unshift(247 + i.length), i.concat(r);
  }
  Si(n) || Me.throwArgumentError("RLP object must be BytesLike", "object", n);
  const t = Array.prototype.slice.call(V(n));
  if (t.length === 1 && t[0] <= 127)
    return t;
  if (t.length <= 55)
    return t.unshift(128 + t.length), t;
  const e = Yi(t.length);
  return e.unshift(183 + e.length), e.concat(t);
}
function Cn(n) {
  return G(Vs(n));
}
function ts(n, t, e, r) {
  const i = [];
  for (; e < t + 1 + r; ) {
    const s = Hs(n, e);
    i.push(s.result), e += s.consumed, e > t + 1 + r && Me.throwError("child data too short", M.errors.BUFFER_OVERRUN, {});
  }
  return { consumed: 1 + r, result: i };
}
function Hs(n, t) {
  if (n.length === 0 && Me.throwError("data too short", M.errors.BUFFER_OVERRUN, {}), n[t] >= 248) {
    const e = n[t] - 247;
    t + 1 + e > n.length && Me.throwError("data short segment too short", M.errors.BUFFER_OVERRUN, {});
    const r = Qi(n, t + 1, e);
    return t + 1 + e + r > n.length && Me.throwError("data long segment too short", M.errors.BUFFER_OVERRUN, {}), ts(n, t, t + 1 + e, e + r);
  } else if (n[t] >= 192) {
    const e = n[t] - 192;
    return t + 1 + e > n.length && Me.throwError("data array too short", M.errors.BUFFER_OVERRUN, {}), ts(n, t, t + 1, e);
  } else if (n[t] >= 184) {
    const e = n[t] - 183;
    t + 1 + e > n.length && Me.throwError("data array too short", M.errors.BUFFER_OVERRUN, {});
    const r = Qi(n, t + 1, e);
    t + 1 + e + r > n.length && Me.throwError("data array too short", M.errors.BUFFER_OVERRUN, {});
    const i = G(n.slice(t + 1 + e, t + 1 + e + r));
    return { consumed: 1 + e + r, result: i };
  } else if (n[t] >= 128) {
    const e = n[t] - 128;
    t + 1 + e > n.length && Me.throwError("data too short", M.errors.BUFFER_OVERRUN, {});
    const r = G(n.slice(t + 1, t + 1 + e));
    return { consumed: 1 + e, result: r };
  }
  return { consumed: 1, result: G(n[t]) };
}
function Ii(n) {
  const t = V(n), e = Hs(t, 0);
  return e.consumed !== t.length && Me.throwArgumentError("invalid rlp data", "data", n), e.result;
}
const ya = "address/5.6.0", Pr = new M(ya);
function es(n) {
  at(n, 20) || Pr.throwArgumentError("invalid address", "address", n), n = n.toLowerCase();
  const t = n.substring(2).split(""), e = new Uint8Array(40);
  for (let i = 0; i < 40; i++)
    e[i] = t[i].charCodeAt(0);
  const r = V(Wt(e));
  for (let i = 0; i < 40; i += 2)
    r[i >> 1] >> 4 >= 8 && (t[i] = t[i].toUpperCase()), (r[i >> 1] & 15) >= 8 && (t[i + 1] = t[i + 1].toUpperCase());
  return "0x" + t.join("");
}
const ba = 9007199254740991;
function wa(n) {
  return Math.log10 ? Math.log10(n) : Math.log(n) / Math.LN10;
}
const Ti = {};
for (let n = 0; n < 10; n++)
  Ti[String(n)] = String(n);
for (let n = 0; n < 26; n++)
  Ti[String.fromCharCode(65 + n)] = String(10 + n);
const rs = Math.floor(wa(ba));
function xa(n) {
  n = n.toUpperCase(), n = n.substring(4) + n.substring(0, 2) + "00";
  let t = n.split("").map((r) => Ti[r]).join("");
  for (; t.length >= rs; ) {
    let r = t.substring(0, rs);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let e = String(98 - parseInt(t, 10) % 97);
  for (; e.length < 2; )
    e = "0" + e;
  return e;
}
function Yt(n) {
  let t = null;
  if (typeof n != "string" && Pr.throwArgumentError("invalid address", "address", n), n.match(/^(0x)?[0-9a-fA-F]{40}$/))
    n.substring(0, 2) !== "0x" && (n = "0x" + n), t = es(n), n.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && t !== n && Pr.throwArgumentError("bad address checksum", "address", n);
  else if (n.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    for (n.substring(2, 4) !== xa(n) && Pr.throwArgumentError("bad icap checksum", "address", n), t = na(n.substring(4)); t.length < 40; )
      t = "0" + t;
    t = es("0x" + t);
  } else
    Pr.throwArgumentError("invalid address", "address", n);
  return t;
}
function Ws(n) {
  let t = null;
  try {
    t = Yt(n.from);
  } catch {
    Pr.throwArgumentError("missing from address", "transaction", n);
  }
  const e = Cr(V(U.from(n.nonce).toHexString()));
  return Yt(te(Wt(Cn([t, e])), 12));
}
class _a extends Ve {
  constructor(t) {
    super("address", "address", t, !1);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(t, e) {
    try {
      e = Yt(e);
    } catch (r) {
      this._throwError(r.message, e);
    }
    return t.writeValue(e);
  }
  decode(t) {
    return Yt(jt(t.readValue().toHexString(), 20));
  }
}
class Ea extends Ve {
  constructor(t) {
    super(t.name, t.type, void 0, t.dynamic), this.coder = t;
  }
  defaultValue() {
    return this.coder.defaultValue();
  }
  encode(t, e) {
    return this.coder.encode(t, e);
  }
  decode(t) {
    return this.coder.decode(t);
  }
}
const Sr = new M(nn);
function Ks(n, t, e) {
  let r = null;
  if (Array.isArray(e))
    r = e;
  else if (e && typeof e == "object") {
    let l = {};
    r = t.map((d) => {
      const g = d.localName;
      return g || Sr.throwError("cannot encode object for signature with missing names", M.errors.INVALID_ARGUMENT, {
        argument: "values",
        coder: d,
        value: e
      }), l[g] && Sr.throwError("cannot encode object for signature with duplicate names", M.errors.INVALID_ARGUMENT, {
        argument: "values",
        coder: d,
        value: e
      }), l[g] = !0, e[g];
    });
  } else
    Sr.throwArgumentError("invalid tuple value", "tuple", e);
  t.length !== r.length && Sr.throwArgumentError("types/value length mismatch", "tuple", e);
  let i = new gi(n.wordSize), s = new gi(n.wordSize), o = [];
  t.forEach((l, d) => {
    let g = r[d];
    if (l.dynamic) {
      let w = s.length;
      l.encode(s, g);
      let A = i.writeUpdatableValue();
      o.push((P) => {
        A(P + w);
      });
    } else
      l.encode(i, g);
  }), o.forEach((l) => {
    l(i.length);
  });
  let u = n.appendWriter(i);
  return u += n.appendWriter(s), u;
}
function Js(n, t) {
  let e = [], r = n.subReader(0);
  t.forEach((s) => {
    let o = null;
    if (s.dynamic) {
      let u = n.readValue(), l = r.subReader(u.toNumber());
      try {
        o = s.decode(l);
      } catch (d) {
        if (d.code === M.errors.BUFFER_OVERRUN)
          throw d;
        o = d, o.baseType = s.name, o.name = s.localName, o.type = s.type;
      }
    } else
      try {
        o = s.decode(n);
      } catch (u) {
        if (u.code === M.errors.BUFFER_OVERRUN)
          throw u;
        o = u, o.baseType = s.name, o.name = s.localName, o.type = s.type;
      }
    o != null && e.push(o);
  });
  const i = t.reduce((s, o) => {
    const u = o.localName;
    return u && (s[u] || (s[u] = 0), s[u]++), s;
  }, {});
  t.forEach((s, o) => {
    let u = s.localName;
    if (!u || i[u] !== 1 || (u === "length" && (u = "_length"), e[u] != null))
      return;
    const l = e[o];
    l instanceof Error ? Object.defineProperty(e, u, {
      enumerable: !0,
      get: () => {
        throw l;
      }
    }) : e[u] = l;
  });
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    o instanceof Error && Object.defineProperty(e, s, {
      enumerable: !0,
      get: () => {
        throw o;
      }
    });
  }
  return Object.freeze(e);
}
class Aa extends Ve {
  constructor(t, e, r) {
    const i = t.type + "[" + (e >= 0 ? e : "") + "]", s = e === -1 || t.dynamic;
    super("array", i, r, s), this.coder = t, this.length = e;
  }
  defaultValue() {
    const t = this.coder.defaultValue(), e = [];
    for (let r = 0; r < this.length; r++)
      e.push(t);
    return e;
  }
  encode(t, e) {
    Array.isArray(e) || this._throwError("expected array value", e);
    let r = this.length;
    r === -1 && (r = e.length, t.writeValue(e.length)), Sr.checkArgumentCount(e.length, r, "coder array" + (this.localName ? " " + this.localName : ""));
    let i = [];
    for (let s = 0; s < e.length; s++)
      i.push(this.coder);
    return Ks(t, i, e);
  }
  decode(t) {
    let e = this.length;
    e === -1 && (e = t.readValue().toNumber(), e * 32 > t._data.length && Sr.throwError("insufficient data length", M.errors.BUFFER_OVERRUN, {
      length: t._data.length,
      count: e
    }));
    let r = [];
    for (let i = 0; i < e; i++)
      r.push(new Ea(this.coder));
    return t.coerce(this.name, Js(t, r));
  }
}
class Ma extends Ve {
  constructor(t) {
    super("bool", "bool", t, !1);
  }
  defaultValue() {
    return !1;
  }
  encode(t, e) {
    return t.writeValue(e ? 1 : 0);
  }
  decode(t) {
    return t.coerce(this.type, !t.readValue().isZero());
  }
}
class Xs extends Ve {
  constructor(t, e) {
    super(t, t, e, !0);
  }
  defaultValue() {
    return "0x";
  }
  encode(t, e) {
    e = V(e);
    let r = t.writeValue(e.length);
    return r += t.writeBytes(e), r;
  }
  decode(t) {
    return t.readBytes(t.readValue().toNumber(), !0);
  }
}
class Na extends Xs {
  constructor(t) {
    super("bytes", t);
  }
  decode(t) {
    return t.coerce(this.name, G(super.decode(t)));
  }
}
class Pa extends Ve {
  constructor(t, e) {
    let r = "bytes" + String(t);
    super(r, r, e, !1), this.size = t;
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }
  encode(t, e) {
    let r = V(e);
    return r.length !== this.size && this._throwError("incorrect data length", e), t.writeBytes(r);
  }
  decode(t) {
    return t.coerce(this.name, G(t.readBytes(this.size)));
  }
}
class Sa extends Ve {
  constructor(t) {
    super("null", "", t, !1);
  }
  defaultValue() {
    return null;
  }
  encode(t, e) {
    return e != null && this._throwError("not null", e), t.writeBytes([]);
  }
  decode(t) {
    return t.readBytes(0), t.coerce(this.name, null);
  }
}
const ka = "0x0000000000000000000000000000000000000000", Ra = /* @__PURE__ */ U.from(-1), Zs = /* @__PURE__ */ U.from(0), Ia = /* @__PURE__ */ U.from(1), Ta = /* @__PURE__ */ U.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), Ca = "0x0000000000000000000000000000000000000000000000000000000000000000";
class Ba extends Ve {
  constructor(t, e, r) {
    const i = (e ? "int" : "uint") + t * 8;
    super(i, i, r, !1), this.size = t, this.signed = e;
  }
  defaultValue() {
    return 0;
  }
  encode(t, e) {
    let r = U.from(e), i = Ta.mask(t.wordSize * 8);
    if (this.signed) {
      let s = i.mask(this.size * 8 - 1);
      (r.gt(s) || r.lt(s.add(Ia).mul(Ra))) && this._throwError("value out-of-bounds", e);
    } else
      (r.lt(Zs) || r.gt(i.mask(this.size * 8))) && this._throwError("value out-of-bounds", e);
    return r = r.toTwos(this.size * 8).mask(this.size * 8), this.signed && (r = r.fromTwos(this.size * 8).toTwos(8 * t.wordSize)), t.writeValue(r);
  }
  decode(t) {
    let e = t.readValue().mask(this.size * 8);
    return this.signed && (e = e.fromTwos(this.size * 8)), t.coerce(this.name, e);
  }
}
const Oa = "strings/5.6.0", Ys = new M(Oa);
var Br;
(function(n) {
  n.current = "", n.NFC = "NFC", n.NFD = "NFD", n.NFKC = "NFKC", n.NFKD = "NFKD";
})(Br || (Br = {}));
var fe;
(function(n) {
  n.UNEXPECTED_CONTINUE = "unexpected continuation byte", n.BAD_PREFIX = "bad codepoint prefix", n.OVERRUN = "string overrun", n.MISSING_CONTINUE = "missing continuation byte", n.OUT_OF_RANGE = "out of UTF-8 range", n.UTF16_SURROGATE = "UTF-16 surrogate", n.OVERLONG = "overlong representation";
})(fe || (fe = {}));
function La(n, t, e, r, i) {
  return Ys.throwArgumentError(`invalid codepoint at offset ${t}; ${n}`, "bytes", e);
}
function Qs(n, t, e, r, i) {
  if (n === fe.BAD_PREFIX || n === fe.UNEXPECTED_CONTINUE) {
    let s = 0;
    for (let o = t + 1; o < e.length && e[o] >> 6 === 2; o++)
      s++;
    return s;
  }
  return n === fe.OVERRUN ? e.length - t - 1 : 0;
}
function Fa(n, t, e, r, i) {
  return n === fe.OVERLONG ? (r.push(i), 0) : (r.push(65533), Qs(n, t, e));
}
const Ua = Object.freeze({
  error: La,
  ignore: Qs,
  replace: Fa
});
function to(n, t) {
  t == null && (t = Ua.error), n = V(n);
  const e = [];
  let r = 0;
  for (; r < n.length; ) {
    const i = n[r++];
    if (!(i >> 7)) {
      e.push(i);
      continue;
    }
    let s = null, o = null;
    if ((i & 224) === 192)
      s = 1, o = 127;
    else if ((i & 240) === 224)
      s = 2, o = 2047;
    else if ((i & 248) === 240)
      s = 3, o = 65535;
    else {
      (i & 192) === 128 ? r += t(fe.UNEXPECTED_CONTINUE, r - 1, n, e) : r += t(fe.BAD_PREFIX, r - 1, n, e);
      continue;
    }
    if (r - 1 + s >= n.length) {
      r += t(fe.OVERRUN, r - 1, n, e);
      continue;
    }
    let u = i & (1 << 8 - s - 1) - 1;
    for (let l = 0; l < s; l++) {
      let d = n[r];
      if ((d & 192) != 128) {
        r += t(fe.MISSING_CONTINUE, r, n, e), u = null;
        break;
      }
      u = u << 6 | d & 63, r++;
    }
    if (u !== null) {
      if (u > 1114111) {
        r += t(fe.OUT_OF_RANGE, r - 1 - s, n, e, u);
        continue;
      }
      if (u >= 55296 && u <= 57343) {
        r += t(fe.UTF16_SURROGATE, r - 1 - s, n, e, u);
        continue;
      }
      if (u <= o) {
        r += t(fe.OVERLONG, r - 1 - s, n, e, u);
        continue;
      }
      e.push(u);
    }
  }
  return e;
}
function Ce(n, t = Br.current) {
  t != Br.current && (Ys.checkNormalize(), n = n.normalize(t));
  let e = [];
  for (let r = 0; r < n.length; r++) {
    const i = n.charCodeAt(r);
    if (i < 128)
      e.push(i);
    else if (i < 2048)
      e.push(i >> 6 | 192), e.push(i & 63 | 128);
    else if ((i & 64512) == 55296) {
      r++;
      const s = n.charCodeAt(r);
      if (r >= n.length || (s & 64512) !== 56320)
        throw new Error("invalid utf-8 string");
      const o = 65536 + ((i & 1023) << 10) + (s & 1023);
      e.push(o >> 18 | 240), e.push(o >> 12 & 63 | 128), e.push(o >> 6 & 63 | 128), e.push(o & 63 | 128);
    } else
      e.push(i >> 12 | 224), e.push(i >> 6 & 63 | 128), e.push(i & 63 | 128);
  }
  return V(e);
}
function vi(n) {
  return n.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function sn(n, t) {
  return vi(to(n, t));
}
function ns(n, t = Br.current) {
  return to(Ce(n, t));
}
function Da(n) {
  if (n.length % 4 !== 0)
    throw new Error("bad data");
  let t = [];
  for (let e = 0; e < n.length; e += 4)
    t.push(parseInt(n.substring(e, e + 4), 16));
  return t;
}
function Ci(n, t) {
  t || (t = function(i) {
    return [parseInt(i, 16)];
  });
  let e = 0, r = {};
  return n.split(",").forEach((i) => {
    let s = i.split(":");
    e += parseInt(s[0], 16), r[e] = t(s[1]);
  }), r;
}
function eo(n) {
  let t = 0;
  return n.split(",").map((e) => {
    let r = e.split("-");
    r.length === 1 ? r[1] = "0" : r[1] === "" && (r[1] = "1");
    let i = t + parseInt(r[0], 16);
    return t = parseInt(r[1], 16), { l: i, h: t };
  });
}
function Bi(n, t) {
  let e = 0;
  for (let r = 0; r < t.length; r++) {
    let i = t[r];
    if (e += i.l, n >= e && n <= e + i.h && (n - e) % (i.d || 1) === 0) {
      if (i.e && i.e.indexOf(n - e) !== -1)
        continue;
      return i;
    }
  }
  return null;
}
const $a = eo("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d"), qa = "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map((n) => parseInt(n, 16)), za = [
  { h: 25, s: 32, l: 65 },
  { h: 30, s: 32, e: [23], l: 127 },
  { h: 54, s: 1, e: [48], l: 64, d: 2 },
  { h: 14, s: 1, l: 57, d: 2 },
  { h: 44, s: 1, l: 17, d: 2 },
  { h: 10, s: 1, e: [2, 6, 8], l: 61, d: 2 },
  { h: 16, s: 1, l: 68, d: 2 },
  { h: 84, s: 1, e: [18, 24, 66], l: 19, d: 2 },
  { h: 26, s: 32, e: [17], l: 435 },
  { h: 22, s: 1, l: 71, d: 2 },
  { h: 15, s: 80, l: 40 },
  { h: 31, s: 32, l: 16 },
  { h: 32, s: 1, l: 80, d: 2 },
  { h: 52, s: 1, l: 42, d: 2 },
  { h: 12, s: 1, l: 55, d: 2 },
  { h: 40, s: 1, e: [38], l: 15, d: 2 },
  { h: 14, s: 1, l: 48, d: 2 },
  { h: 37, s: 48, l: 49 },
  { h: 148, s: 1, l: 6351, d: 2 },
  { h: 88, s: 1, l: 160, d: 2 },
  { h: 15, s: 16, l: 704 },
  { h: 25, s: 26, l: 854 },
  { h: 25, s: 32, l: 55915 },
  { h: 37, s: 40, l: 1247 },
  { h: 25, s: -119711, l: 53248 },
  { h: 25, s: -119763, l: 52 },
  { h: 25, s: -119815, l: 52 },
  { h: 25, s: -119867, e: [1, 4, 5, 7, 8, 11, 12, 17], l: 52 },
  { h: 25, s: -119919, l: 52 },
  { h: 24, s: -119971, e: [2, 7, 8, 17], l: 52 },
  { h: 24, s: -120023, e: [2, 7, 13, 15, 16, 17], l: 52 },
  { h: 25, s: -120075, l: 52 },
  { h: 25, s: -120127, l: 52 },
  { h: 25, s: -120179, l: 52 },
  { h: 25, s: -120231, l: 52 },
  { h: 25, s: -120283, l: 52 },
  { h: 25, s: -120335, l: 52 },
  { h: 24, s: -119543, e: [17], l: 56 },
  { h: 24, s: -119601, e: [17], l: 58 },
  { h: 24, s: -119659, e: [17], l: 58 },
  { h: 24, s: -119717, e: [17], l: 58 },
  { h: 24, s: -119775, e: [17], l: 58 }
], Ga = Ci("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3"), ja = Ci("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7"), Va = Ci("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", Da), Ha = eo("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");
function Wa(n) {
  return n.reduce((t, e) => (e.forEach((r) => {
    t.push(r);
  }), t), []);
}
function Ka(n) {
  return !!Bi(n, $a);
}
function Ja(n) {
  let t = Bi(n, za);
  if (t)
    return [n + t.s];
  let e = Ga[n];
  if (e)
    return e;
  let r = ja[n];
  if (r)
    return [n + r[0]];
  let i = Va[n];
  return i || null;
}
function Xa(n) {
  return !!Bi(n, Ha);
}
function ro(n) {
  if (n.match(/^[a-z0-9-]*$/i) && n.length <= 59)
    return n.toLowerCase();
  let t = ns(n);
  t = Wa(t.map((r) => {
    if (qa.indexOf(r) >= 0)
      return [];
    if (r >= 65024 && r <= 65039)
      return [];
    let i = Ja(r);
    return i || [r];
  })), t = ns(vi(t), Br.NFKC), t.forEach((r) => {
    if (Xa(r))
      throw new Error("STRINGPREP_CONTAINS_PROHIBITED");
  }), t.forEach((r) => {
    if (Ka(r))
      throw new Error("STRINGPREP_CONTAINS_UNASSIGNED");
  });
  let e = vi(t);
  if (e.substring(0, 1) === "-" || e.substring(2, 4) === "--" || e.substring(e.length - 1) === "-")
    throw new Error("invalid hyphen");
  if (e.length > 63)
    throw new Error("too long");
  return e;
}
class Za extends Xs {
  constructor(t) {
    super("string", t);
  }
  defaultValue() {
    return "";
  }
  encode(t, e) {
    return super.encode(t, Ce(e));
  }
  decode(t) {
    return sn(super.decode(t));
  }
}
class hn extends Ve {
  constructor(t, e) {
    let r = !1;
    const i = [];
    t.forEach((o) => {
      o.dynamic && (r = !0), i.push(o.type);
    });
    const s = "tuple(" + i.join(",") + ")";
    super("tuple", s, e, r), this.coders = t;
  }
  defaultValue() {
    const t = [];
    this.coders.forEach((r) => {
      t.push(r.defaultValue());
    });
    const e = this.coders.reduce((r, i) => {
      const s = i.localName;
      return s && (r[s] || (r[s] = 0), r[s]++), r;
    }, {});
    return this.coders.forEach((r, i) => {
      let s = r.localName;
      !s || e[s] !== 1 || (s === "length" && (s = "_length"), t[s] == null && (t[s] = t[i]));
    }), Object.freeze(t);
  }
  encode(t, e) {
    return Ks(t, this.coders, e);
  }
  decode(t) {
    return t.coerce(this.name, Js(t, this.coders));
  }
}
const ln = new M(nn), Ya = new RegExp(/^bytes([0-9]*)$/), Qa = new RegExp(/^(u?int)([0-9]*)$/);
class tf {
  constructor(t) {
    C(this, "coerceFunc", t || null);
  }
  _getCoder(t) {
    switch (t.baseType) {
      case "address":
        return new _a(t.name);
      case "bool":
        return new Ma(t.name);
      case "string":
        return new Za(t.name);
      case "bytes":
        return new Na(t.name);
      case "array":
        return new Aa(this._getCoder(t.arrayChildren), t.arrayLength, t.name);
      case "tuple":
        return new hn((t.components || []).map((r) => this._getCoder(r)), t.name);
      case "":
        return new Sa(t.name);
    }
    let e = t.type.match(Qa);
    if (e) {
      let r = parseInt(e[2] || "256");
      return (r === 0 || r > 256 || r % 8 !== 0) && ln.throwArgumentError("invalid " + e[1] + " bit length", "param", t), new Ba(r / 8, e[1] === "int", t.name);
    }
    if (e = t.type.match(Ya), e) {
      let r = parseInt(e[1]);
      return (r === 0 || r > 32) && ln.throwArgumentError("invalid bytes length", "param", t), new Pa(r, t.name);
    }
    return ln.throwArgumentError("invalid type", "type", t.type);
  }
  _getWordSize() {
    return 32;
  }
  _getReader(t, e) {
    return new An(t, this._getWordSize(), this.coerceFunc, e);
  }
  _getWriter() {
    return new gi(this._getWordSize());
  }
  getDefaultValue(t) {
    const e = t.map((i) => this._getCoder(Jt.from(i)));
    return new hn(e, "_").defaultValue();
  }
  encode(t, e) {
    t.length !== e.length && ln.throwError("types/values length mismatch", M.errors.INVALID_ARGUMENT, {
      count: { types: t.length, values: e.length },
      value: { types: t, values: e }
    });
    const r = t.map((o) => this._getCoder(Jt.from(o))), i = new hn(r, "_"), s = this._getWriter();
    return i.encode(s, e), s.data;
  }
  decode(t, e, r) {
    const i = t.map((o) => this._getCoder(Jt.from(o)));
    return new hn(i, "_").decode(this._getReader(V(e), r));
  }
}
const ef = new tf();
function kr(n) {
  return Wt(Ce(n));
}
const no = "hash/5.6.0", is = new M(no), io = new Uint8Array(32);
io.fill(0);
const rf = new RegExp("^((.*)\\.)?([^.]+)$");
function vn(n) {
  typeof n != "string" && is.throwArgumentError("invalid ENS name; not a string", "name", n);
  let t = n, e = io;
  for (; t.length; ) {
    const r = t.match(rf);
    (r == null || r[2] === "") && is.throwArgumentError("invalid ENS address; missing component", "name", n);
    const i = Ce(ro(r[3]));
    e = Wt(he([e, Wt(i)])), t = r[2] || "";
  }
  return G(e);
}
function nf(n) {
  return G(he(n.split(".").map((t) => {
    const e = Ce("_" + ro(t));
    return e[0] = e.length - 1, e;
  }))) + "00";
}
var sf = function(n, t, e, r) {
  function i(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function u(g) {
      try {
        d(r.next(g));
      } catch (w) {
        o(w);
      }
    }
    function l(g) {
      try {
        d(r.throw(g));
      } catch (w) {
        o(w);
      }
    }
    function d(g) {
      g.done ? s(g.value) : i(g.value).then(u, l);
    }
    d((r = r.apply(n, t || [])).next());
  });
};
const qt = new M(no), so = new Uint8Array(32);
so.fill(0);
const of = U.from(-1), oo = U.from(0), ao = U.from(1), af = U.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
function ff(n) {
  const t = V(n), e = t.length % 32;
  return e ? se([t, so.slice(e)]) : G(t);
}
const uf = jt(ao.toHexString(), 32), hf = jt(oo.toHexString(), 32), ss = {
  name: "string",
  version: "string",
  chainId: "uint256",
  verifyingContract: "address",
  salt: "bytes32"
}, ri = [
  "name",
  "version",
  "chainId",
  "verifyingContract",
  "salt"
];
function os(n) {
  return function(t) {
    return typeof t != "string" && qt.throwArgumentError(`invalid domain value for ${JSON.stringify(n)}`, `domain.${n}`, t), t;
  };
}
const lf = {
  name: os("name"),
  version: os("version"),
  chainId: function(n) {
    try {
      return U.from(n).toString();
    } catch {
    }
    return qt.throwArgumentError('invalid domain value for "chainId"', "domain.chainId", n);
  },
  verifyingContract: function(n) {
    try {
      return Yt(n).toLowerCase();
    } catch {
    }
    return qt.throwArgumentError('invalid domain value "verifyingContract"', "domain.verifyingContract", n);
  },
  salt: function(n) {
    try {
      const t = V(n);
      if (t.length !== 32)
        throw new Error("bad length");
      return G(t);
    } catch {
    }
    return qt.throwArgumentError('invalid domain value "salt"', "domain.salt", n);
  }
};
function ni(n) {
  {
    const t = n.match(/^(u?)int(\d*)$/);
    if (t) {
      const e = t[1] === "", r = parseInt(t[2] || "256");
      (r % 8 !== 0 || r > 256 || t[2] && t[2] !== String(r)) && qt.throwArgumentError("invalid numeric width", "type", n);
      const i = af.mask(e ? r - 1 : r), s = e ? i.add(ao).mul(of) : oo;
      return function(o) {
        const u = U.from(o);
        return (u.lt(s) || u.gt(i)) && qt.throwArgumentError(`value out-of-bounds for ${n}`, "value", o), jt(u.toTwos(256).toHexString(), 32);
      };
    }
  }
  {
    const t = n.match(/^bytes(\d+)$/);
    if (t) {
      const e = parseInt(t[1]);
      return (e === 0 || e > 32 || t[1] !== String(e)) && qt.throwArgumentError("invalid bytes width", "type", n), function(r) {
        return V(r).length !== e && qt.throwArgumentError(`invalid length for ${n}`, "value", r), ff(r);
      };
    }
  }
  switch (n) {
    case "address":
      return function(t) {
        return jt(Yt(t), 32);
      };
    case "bool":
      return function(t) {
        return t ? uf : hf;
      };
    case "bytes":
      return function(t) {
        return Wt(t);
      };
    case "string":
      return function(t) {
        return kr(t);
      };
  }
  return null;
}
function as(n, t) {
  return `${n}(${t.map(({ name: e, type: r }) => r + " " + e).join(",")})`;
}
class ae {
  constructor(t) {
    C(this, "types", Object.freeze(ze(t))), C(this, "_encoderCache", {}), C(this, "_types", {});
    const e = {}, r = {}, i = {};
    Object.keys(t).forEach((u) => {
      e[u] = {}, r[u] = [], i[u] = {};
    });
    for (const u in t) {
      const l = {};
      t[u].forEach((d) => {
        l[d.name] && qt.throwArgumentError(`duplicate variable name ${JSON.stringify(d.name)} in ${JSON.stringify(u)}`, "types", t), l[d.name] = !0;
        const g = d.type.match(/^([^\x5b]*)(\x5b|$)/)[1];
        g === u && qt.throwArgumentError(`circular type reference to ${JSON.stringify(g)}`, "types", t), !ni(g) && (r[g] || qt.throwArgumentError(`unknown type ${JSON.stringify(g)}`, "types", t), r[g].push(u), e[u][g] = !0);
      });
    }
    const s = Object.keys(r).filter((u) => r[u].length === 0);
    s.length === 0 ? qt.throwArgumentError("missing primary type", "types", t) : s.length > 1 && qt.throwArgumentError(`ambiguous primary types or unused types: ${s.map((u) => JSON.stringify(u)).join(", ")}`, "types", t), C(this, "primaryType", s[0]);
    function o(u, l) {
      l[u] && qt.throwArgumentError(`circular type reference to ${JSON.stringify(u)}`, "types", t), l[u] = !0, Object.keys(e[u]).forEach((d) => {
        r[d] && (o(d, l), Object.keys(l).forEach((g) => {
          i[g][d] = !0;
        }));
      }), delete l[u];
    }
    o(this.primaryType, {});
    for (const u in i) {
      const l = Object.keys(i[u]);
      l.sort(), this._types[u] = as(u, t[u]) + l.map((d) => as(d, t[d])).join("");
    }
  }
  getEncoder(t) {
    let e = this._encoderCache[t];
    return e || (e = this._encoderCache[t] = this._getEncoder(t)), e;
  }
  _getEncoder(t) {
    {
      const i = ni(t);
      if (i)
        return i;
    }
    const e = t.match(/^(.*)(\x5b(\d*)\x5d)$/);
    if (e) {
      const i = e[1], s = this.getEncoder(i), o = parseInt(e[3]);
      return (u) => {
        o >= 0 && u.length !== o && qt.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", u);
        let l = u.map(s);
        return this._types[i] && (l = l.map(Wt)), Wt(se(l));
      };
    }
    const r = this.types[t];
    if (r) {
      const i = kr(this._types[t]);
      return (s) => {
        const o = r.map(({ name: u, type: l }) => {
          const d = this.getEncoder(l)(s[u]);
          return this._types[l] ? Wt(d) : d;
        });
        return o.unshift(i), se(o);
      };
    }
    return qt.throwArgumentError(`unknown type: ${t}`, "type", t);
  }
  encodeType(t) {
    const e = this._types[t];
    return e || qt.throwArgumentError(`unknown type: ${JSON.stringify(t)}`, "name", t), e;
  }
  encodeData(t, e) {
    return this.getEncoder(t)(e);
  }
  hashStruct(t, e) {
    return Wt(this.encodeData(t, e));
  }
  encode(t) {
    return this.encodeData(this.primaryType, t);
  }
  hash(t) {
    return this.hashStruct(this.primaryType, t);
  }
  _visit(t, e, r) {
    if (ni(t))
      return r(t, e);
    const i = t.match(/^(.*)(\x5b(\d*)\x5d)$/);
    if (i) {
      const o = i[1], u = parseInt(i[3]);
      return u >= 0 && e.length !== u && qt.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", e), e.map((l) => this._visit(o, l, r));
    }
    const s = this.types[t];
    return s ? s.reduce((o, { name: u, type: l }) => (o[u] = this._visit(l, e[u], r), o), {}) : qt.throwArgumentError(`unknown type: ${t}`, "type", t);
  }
  visit(t, e) {
    return this._visit(this.primaryType, t, e);
  }
  static from(t) {
    return new ae(t);
  }
  static getPrimaryType(t) {
    return ae.from(t).primaryType;
  }
  static hashStruct(t, e, r) {
    return ae.from(e).hashStruct(t, r);
  }
  static hashDomain(t) {
    const e = [];
    for (const r in t) {
      const i = ss[r];
      i || qt.throwArgumentError(`invalid typed-data domain key: ${JSON.stringify(r)}`, "domain", t), e.push({ name: r, type: i });
    }
    return e.sort((r, i) => ri.indexOf(r.name) - ri.indexOf(i.name)), ae.hashStruct("EIP712Domain", { EIP712Domain: e }, t);
  }
  static encode(t, e, r) {
    return se([
      "0x1901",
      ae.hashDomain(t),
      ae.from(e).hash(r)
    ]);
  }
  static hash(t, e, r) {
    return Wt(ae.encode(t, e, r));
  }
  // Replaces all address types with ENS names with their looked up address
  static resolveNames(t, e, r, i) {
    return sf(this, void 0, void 0, function* () {
      t = Xt(t);
      const s = {};
      t.verifyingContract && !at(t.verifyingContract, 20) && (s[t.verifyingContract] = "0x");
      const o = ae.from(e);
      o.visit(r, (u, l) => (u === "address" && !at(l, 20) && (s[l] = "0x"), l));
      for (const u in s)
        s[u] = yield i(u);
      return t.verifyingContract && s[t.verifyingContract] && (t.verifyingContract = s[t.verifyingContract]), r = o.visit(r, (u, l) => u === "address" && s[l] ? s[l] : l), { domain: t, value: r };
    });
  }
  static getPayload(t, e, r) {
    ae.hashDomain(t);
    const i = {}, s = [];
    ri.forEach((l) => {
      const d = t[l];
      d != null && (i[l] = lf[l](d), s.push({ name: l, type: ss[l] }));
    });
    const o = ae.from(e), u = Xt(e);
    return u.EIP712Domain ? qt.throwArgumentError("types must not contain EIP712Domain type", "types.EIP712Domain", e) : u.EIP712Domain = s, o.encode(r), {
      types: u,
      domain: i,
      primaryType: o.primaryType,
      message: o.visit(r, (l, d) => {
        if (l.match(/^bytes(\d*)/))
          return G(V(d));
        if (l.match(/^u?int/))
          return U.from(d).toString();
        switch (l) {
          case "address":
            return d.toLowerCase();
          case "bool":
            return !!d;
          case "string":
            return typeof d != "string" && qt.throwArgumentError("invalid string", "value", d), d;
        }
        return qt.throwArgumentError("unsupported type", "type", l);
      })
    };
  }
}
const $t = new M(nn);
class cf extends rn {
}
class df extends rn {
}
class pf extends rn {
}
class yi extends rn {
  static isIndexed(t) {
    return !!(t && t._isIndexed);
  }
}
const mf = {
  "0x08c379a0": { signature: "Error(string)", name: "Error", inputs: ["string"], reason: !0 },
  "0x4e487b71": { signature: "Panic(uint256)", name: "Panic", inputs: ["uint256"] }
};
function fs(n, t) {
  const e = new Error(`deferred error during ABI decoding triggered accessing ${n}`);
  return e.error = t, e;
}
class us {
  constructor(t) {
    let e = [];
    typeof t == "string" ? e = JSON.parse(t) : e = t, C(this, "fragments", e.map((r) => qe.from(r)).filter((r) => r != null)), C(this, "_abiCoder", ke(new.target, "getAbiCoder")()), C(this, "functions", {}), C(this, "errors", {}), C(this, "events", {}), C(this, "structs", {}), this.fragments.forEach((r) => {
      let i = null;
      switch (r.type) {
        case "constructor":
          if (this.deploy) {
            $t.warn("duplicate definition - constructor");
            return;
          }
          C(this, "deploy", r);
          return;
        case "function":
          i = this.functions;
          break;
        case "event":
          i = this.events;
          break;
        case "error":
          i = this.errors;
          break;
        default:
          return;
      }
      let s = r.format();
      if (i[s]) {
        $t.warn("duplicate definition - " + s);
        return;
      }
      i[s] = r;
    }), this.deploy || C(this, "deploy", Pe.from({
      payable: !1,
      type: "constructor"
    })), C(this, "_isInterface", !0);
  }
  format(t) {
    t || (t = ot.full), t === ot.sighash && $t.throwArgumentError("interface does not support formatting sighash", "format", t);
    const e = this.fragments.map((r) => r.format(t));
    return t === ot.json ? JSON.stringify(e.map((r) => JSON.parse(r))) : e;
  }
  // Sub-classes can override these to handle other blockchains
  static getAbiCoder() {
    return ef;
  }
  static getAddress(t) {
    return Yt(t);
  }
  static getSighash(t) {
    return te(kr(t.format()), 0, 4);
  }
  static getEventTopic(t) {
    return kr(t.format());
  }
  // Find a function definition by any means necessary (unless it is ambiguous)
  getFunction(t) {
    if (at(t)) {
      for (const r in this.functions)
        if (t === this.getSighash(r))
          return this.functions[r];
      $t.throwArgumentError("no matching function", "sighash", t);
    }
    if (t.indexOf("(") === -1) {
      const r = t.trim(), i = Object.keys(this.functions).filter((s) => s.split(
        "("
        /* fix:) */
      )[0] === r);
      return i.length === 0 ? $t.throwArgumentError("no matching function", "name", r) : i.length > 1 && $t.throwArgumentError("multiple matching functions", "name", r), this.functions[i[0]];
    }
    const e = this.functions[Se.fromString(t).format()];
    return e || $t.throwArgumentError("no matching function", "signature", t), e;
  }
  // Find an event definition by any means necessary (unless it is ambiguous)
  getEvent(t) {
    if (at(t)) {
      const r = t.toLowerCase();
      for (const i in this.events)
        if (r === this.getEventTopic(i))
          return this.events[i];
      $t.throwArgumentError("no matching event", "topichash", r);
    }
    if (t.indexOf("(") === -1) {
      const r = t.trim(), i = Object.keys(this.events).filter((s) => s.split(
        "("
        /* fix:) */
      )[0] === r);
      return i.length === 0 ? $t.throwArgumentError("no matching event", "name", r) : i.length > 1 && $t.throwArgumentError("multiple matching events", "name", r), this.events[i[0]];
    }
    const e = this.events[$e.fromString(t).format()];
    return e || $t.throwArgumentError("no matching event", "signature", t), e;
  }
  // Find a function definition by any means necessary (unless it is ambiguous)
  getError(t) {
    if (at(t)) {
      const r = ke(this.constructor, "getSighash");
      for (const i in this.errors) {
        const s = this.errors[i];
        if (t === r(s))
          return this.errors[i];
      }
      $t.throwArgumentError("no matching error", "sighash", t);
    }
    if (t.indexOf("(") === -1) {
      const r = t.trim(), i = Object.keys(this.errors).filter((s) => s.split(
        "("
        /* fix:) */
      )[0] === r);
      return i.length === 0 ? $t.throwArgumentError("no matching error", "name", r) : i.length > 1 && $t.throwArgumentError("multiple matching errors", "name", r), this.errors[i[0]];
    }
    const e = this.errors[Se.fromString(t).format()];
    return e || $t.throwArgumentError("no matching error", "signature", t), e;
  }
  // Get the sighash (the bytes4 selector) used by Solidity to identify a function
  getSighash(t) {
    if (typeof t == "string")
      try {
        t = this.getFunction(t);
      } catch (e) {
        try {
          t = this.getError(t);
        } catch {
          throw e;
        }
      }
    return ke(this.constructor, "getSighash")(t);
  }
  // Get the topic (the bytes32 hash) used by Solidity to identify an event
  getEventTopic(t) {
    return typeof t == "string" && (t = this.getEvent(t)), ke(this.constructor, "getEventTopic")(t);
  }
  _decodeParams(t, e) {
    return this._abiCoder.decode(t, e);
  }
  _encodeParams(t, e) {
    return this._abiCoder.encode(t, e);
  }
  encodeDeploy(t) {
    return this._encodeParams(this.deploy.inputs, t || []);
  }
  decodeErrorResult(t, e) {
    typeof t == "string" && (t = this.getError(t));
    const r = V(e);
    return G(r.slice(0, 4)) !== this.getSighash(t) && $t.throwArgumentError(`data signature does not match error ${t.name}.`, "data", G(r)), this._decodeParams(t.inputs, r.slice(4));
  }
  encodeErrorResult(t, e) {
    return typeof t == "string" && (t = this.getError(t)), G(he([
      this.getSighash(t),
      this._encodeParams(t.inputs, e || [])
    ]));
  }
  // Decode the data for a function call (e.g. tx.data)
  decodeFunctionData(t, e) {
    typeof t == "string" && (t = this.getFunction(t));
    const r = V(e);
    return G(r.slice(0, 4)) !== this.getSighash(t) && $t.throwArgumentError(`data signature does not match function ${t.name}.`, "data", G(r)), this._decodeParams(t.inputs, r.slice(4));
  }
  // Encode the data for a function call (e.g. tx.data)
  encodeFunctionData(t, e) {
    return typeof t == "string" && (t = this.getFunction(t)), G(he([
      this.getSighash(t),
      this._encodeParams(t.inputs, e || [])
    ]));
  }
  // Decode the result from a function call (e.g. from eth_call)
  decodeFunctionResult(t, e) {
    typeof t == "string" && (t = this.getFunction(t));
    let r = V(e), i = null, s = "", o = null, u = null, l = null;
    switch (r.length % this._abiCoder._getWordSize()) {
      case 0:
        try {
          return this._abiCoder.decode(t.outputs, r);
        } catch {
        }
        break;
      case 4: {
        const d = G(r.slice(0, 4)), g = mf[d];
        if (g)
          o = this._abiCoder.decode(g.inputs, r.slice(4)), u = g.name, l = g.signature, g.reason && (i = o[0]), u === "Error" ? s = `; VM Exception while processing transaction: reverted with reason string ${JSON.stringify(o[0])}` : u === "Panic" && (s = `; VM Exception while processing transaction: reverted with panic code ${o[0]}`);
        else
          try {
            const w = this.getError(d);
            o = this._abiCoder.decode(w.inputs, r.slice(4)), u = w.name, l = w.format();
          } catch {
          }
        break;
      }
    }
    return $t.throwError("call revert exception" + s, M.errors.CALL_EXCEPTION, {
      method: t.format(),
      data: G(e),
      errorArgs: o,
      errorName: u,
      errorSignature: l,
      reason: i
    });
  }
  // Encode the result for a function call (e.g. for eth_call)
  encodeFunctionResult(t, e) {
    return typeof t == "string" && (t = this.getFunction(t)), G(this._abiCoder.encode(t.outputs, e || []));
  }
  // Create the filter for the event with search criteria (e.g. for eth_filterLog)
  encodeFilterTopics(t, e) {
    typeof t == "string" && (t = this.getEvent(t)), e.length > t.inputs.length && $t.throwError("too many arguments for " + t.format(), M.errors.UNEXPECTED_ARGUMENT, {
      argument: "values",
      value: e
    });
    let r = [];
    t.anonymous || r.push(this.getEventTopic(t));
    const i = (s, o) => s.type === "string" ? kr(o) : s.type === "bytes" ? Wt(G(o)) : (s.type === "address" && this._abiCoder.encode(["address"], [o]), jt(G(o), 32));
    for (e.forEach((s, o) => {
      let u = t.inputs[o];
      if (!u.indexed) {
        s != null && $t.throwArgumentError("cannot filter non-indexed parameters; must be null", "contract." + u.name, s);
        return;
      }
      s == null ? r.push(null) : u.baseType === "array" || u.baseType === "tuple" ? $t.throwArgumentError("filtering with tuples or arrays not supported", "contract." + u.name, s) : Array.isArray(s) ? r.push(s.map((l) => i(u, l))) : r.push(i(u, s));
    }); r.length && r[r.length - 1] === null; )
      r.pop();
    return r;
  }
  encodeEventLog(t, e) {
    typeof t == "string" && (t = this.getEvent(t));
    const r = [], i = [], s = [];
    return t.anonymous || r.push(this.getEventTopic(t)), e.length !== t.inputs.length && $t.throwArgumentError("event arguments/values mismatch", "values", e), t.inputs.forEach((o, u) => {
      const l = e[u];
      if (o.indexed)
        if (o.type === "string")
          r.push(kr(l));
        else if (o.type === "bytes")
          r.push(Wt(l));
        else {
          if (o.baseType === "tuple" || o.baseType === "array")
            throw new Error("not implemented");
          r.push(this._abiCoder.encode([o.type], [l]));
        }
      else
        i.push(o), s.push(l);
    }), {
      data: this._abiCoder.encode(i, s),
      topics: r
    };
  }
  // Decode a filter for the event and the search criteria
  decodeEventLog(t, e, r) {
    if (typeof t == "string" && (t = this.getEvent(t)), r != null && !t.anonymous) {
      let A = this.getEventTopic(t);
      (!at(r[0], 32) || r[0].toLowerCase() !== A) && $t.throwError("fragment/topic mismatch", M.errors.INVALID_ARGUMENT, { argument: "topics[0]", expected: A, value: r[0] }), r = r.slice(1);
    }
    let i = [], s = [], o = [];
    t.inputs.forEach((A, P) => {
      A.indexed ? A.type === "string" || A.type === "bytes" || A.baseType === "tuple" || A.baseType === "array" ? (i.push(Jt.fromObject({ type: "bytes32", name: A.name })), o.push(!0)) : (i.push(A), o.push(!1)) : (s.push(A), o.push(!1));
    });
    let u = r != null ? this._abiCoder.decode(i, he(r)) : null, l = this._abiCoder.decode(s, e, !0), d = [], g = 0, w = 0;
    t.inputs.forEach((A, P) => {
      if (A.indexed)
        if (u == null)
          d[P] = new yi({ _isIndexed: !0, hash: null });
        else if (o[P])
          d[P] = new yi({ _isIndexed: !0, hash: u[w++] });
        else
          try {
            d[P] = u[w++];
          } catch (N) {
            d[P] = N;
          }
      else
        try {
          d[P] = l[g++];
        } catch (N) {
          d[P] = N;
        }
      if (A.name && d[A.name] == null) {
        const N = d[P];
        N instanceof Error ? Object.defineProperty(d, A.name, {
          enumerable: !0,
          get: () => {
            throw fs(`property ${JSON.stringify(A.name)}`, N);
          }
        }) : d[A.name] = N;
      }
    });
    for (let A = 0; A < d.length; A++) {
      const P = d[A];
      P instanceof Error && Object.defineProperty(d, A, {
        enumerable: !0,
        get: () => {
          throw fs(`index ${A}`, P);
        }
      });
    }
    return Object.freeze(d);
  }
  // Given a transaction, find the matching function fragment (if any) and
  // determine all its properties and call parameters
  parseTransaction(t) {
    let e = this.getFunction(t.data.substring(0, 10).toLowerCase());
    return e ? new df({
      args: this._abiCoder.decode(e.inputs, "0x" + t.data.substring(10)),
      functionFragment: e,
      name: e.name,
      signature: e.format(),
      sighash: this.getSighash(e),
      value: U.from(t.value || "0")
    }) : null;
  }
  // @TODO
  //parseCallResult(data: BytesLike): ??
  // Given an event log, find the matching event fragment (if any) and
  // determine all its properties and values
  parseLog(t) {
    let e = this.getEvent(t.topics[0]);
    return !e || e.anonymous ? null : new cf({
      eventFragment: e,
      name: e.name,
      signature: e.format(),
      topic: this.getEventTopic(e),
      args: this.decodeEventLog(e, t.data, t.topics)
    });
  }
  parseError(t) {
    const e = G(t);
    let r = this.getError(e.substring(0, 10).toLowerCase());
    return r ? new pf({
      args: this._abiCoder.decode(r.inputs, "0x" + e.substring(10)),
      errorFragment: r,
      name: r.name,
      signature: r.format(),
      sighash: this.getSighash(r)
    }) : null;
  }
  /*
  static from(value: Array<Fragment | string | JsonAbi> | string | Interface) {
      if (Interface.isInterface(value)) {
          return value;
      }
      if (typeof(value) === "string") {
          return new Interface(JSON.parse(value));
      }
      return new Interface(value);
  }
  */
  static isInterface(t) {
    return !!(t && t._isInterface);
  }
}
const gf = "abstract-provider/5.6.0";
var vf = function(n, t, e, r) {
  function i(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function u(g) {
      try {
        d(r.next(g));
      } catch (w) {
        o(w);
      }
    }
    function l(g) {
      try {
        d(r.throw(g));
      } catch (w) {
        o(w);
      }
    }
    function d(g) {
      g.done ? s(g.value) : i(g.value).then(u, l);
    }
    d((r = r.apply(n, t || [])).next());
  });
};
const yf = new M(gf);
class bf extends rn {
  static isForkEvent(t) {
    return !!(t && t._isForkEvent);
  }
}
class Bn {
  constructor() {
    yf.checkAbstract(new.target, Bn), C(this, "_isProvider", !0);
  }
  getFeeData() {
    return vf(this, void 0, void 0, function* () {
      const { block: t, gasPrice: e } = yield Vt({
        block: this.getBlock("latest"),
        gasPrice: this.getGasPrice().catch((s) => null)
      });
      let r = null, i = null;
      return t && t.baseFeePerGas && (i = U.from("1500000000"), r = t.baseFeePerGas.mul(2).add(i)), { maxFeePerGas: r, maxPriorityFeePerGas: i, gasPrice: e };
    });
  }
  // Alias for "on"
  addListener(t, e) {
    return this.on(t, e);
  }
  // Alias for "off"
  removeListener(t, e) {
    return this.off(t, e);
  }
  static isProvider(t) {
    return !!(t && t._isProvider);
  }
}
const wf = "abstract-signer/5.6.1";
var ye = function(n, t, e, r) {
  function i(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function u(g) {
      try {
        d(r.next(g));
      } catch (w) {
        o(w);
      }
    }
    function l(g) {
      try {
        d(r.throw(g));
      } catch (w) {
        o(w);
      }
    }
    function d(g) {
      g.done ? s(g.value) : i(g.value).then(u, l);
    }
    d((r = r.apply(n, t || [])).next());
  });
};
const pe = new M(wf), xf = [
  "accessList",
  "ccipReadEnabled",
  "chainId",
  "customData",
  "data",
  "from",
  "gasLimit",
  "gasPrice",
  "maxFeePerGas",
  "maxPriorityFeePerGas",
  "nonce",
  "to",
  "type",
  "value"
], _f = [
  M.errors.INSUFFICIENT_FUNDS,
  M.errors.NONCE_EXPIRED,
  M.errors.REPLACEMENT_UNDERPRICED
];
class on {
  ///////////////////
  // Sub-classes MUST call super
  constructor() {
    pe.checkAbstract(new.target, on), C(this, "_isSigner", !0);
  }
  ///////////////////
  // Sub-classes MAY override these
  getBalance(t) {
    return ye(this, void 0, void 0, function* () {
      return this._checkProvider("getBalance"), yield this.provider.getBalance(this.getAddress(), t);
    });
  }
  getTransactionCount(t) {
    return ye(this, void 0, void 0, function* () {
      return this._checkProvider("getTransactionCount"), yield this.provider.getTransactionCount(this.getAddress(), t);
    });
  }
  // Populates "from" if unspecified, and estimates the gas for the transaction
  estimateGas(t) {
    return ye(this, void 0, void 0, function* () {
      this._checkProvider("estimateGas");
      const e = yield Vt(this.checkTransaction(t));
      return yield this.provider.estimateGas(e);
    });
  }
  // Populates "from" if unspecified, and calls with the transaction
  call(t, e) {
    return ye(this, void 0, void 0, function* () {
      this._checkProvider("call");
      const r = yield Vt(this.checkTransaction(t));
      return yield this.provider.call(r, e);
    });
  }
  // Populates all fields in a transaction, signs it and sends it to the network
  sendTransaction(t) {
    return ye(this, void 0, void 0, function* () {
      this._checkProvider("sendTransaction");
      const e = yield this.populateTransaction(t), r = yield this.signTransaction(e);
      return yield this.provider.sendTransaction(r);
    });
  }
  getChainId() {
    return ye(this, void 0, void 0, function* () {
      return this._checkProvider("getChainId"), (yield this.provider.getNetwork()).chainId;
    });
  }
  getGasPrice() {
    return ye(this, void 0, void 0, function* () {
      return this._checkProvider("getGasPrice"), yield this.provider.getGasPrice();
    });
  }
  getFeeData() {
    return ye(this, void 0, void 0, function* () {
      return this._checkProvider("getFeeData"), yield this.provider.getFeeData();
    });
  }
  resolveName(t) {
    return ye(this, void 0, void 0, function* () {
      return this._checkProvider("resolveName"), yield this.provider.resolveName(t);
    });
  }
  // Checks a transaction does not contain invalid keys and if
  // no "from" is provided, populates it.
  // - does NOT require a provider
  // - adds "from" is not present
  // - returns a COPY (safe to mutate the result)
  // By default called from: (overriding these prevents it)
  //   - call
  //   - estimateGas
  //   - populateTransaction (and therefor sendTransaction)
  checkTransaction(t) {
    for (const r in t)
      xf.indexOf(r) === -1 && pe.throwArgumentError("invalid transaction key: " + r, "transaction", t);
    const e = Xt(t);
    return e.from == null ? e.from = this.getAddress() : e.from = Promise.all([
      Promise.resolve(e.from),
      this.getAddress()
    ]).then((r) => (r[0].toLowerCase() !== r[1].toLowerCase() && pe.throwArgumentError("from address mismatch", "transaction", t), r[0])), e;
  }
  // Populates ALL keys for a transaction and checks that "from" matches
  // this Signer. Should be used by sendTransaction but NOT by signTransaction.
  // By default called from: (overriding these prevents it)
  //   - sendTransaction
  //
  // Notes:
  //  - We allow gasPrice for EIP-1559 as long as it matches maxFeePerGas
  populateTransaction(t) {
    return ye(this, void 0, void 0, function* () {
      const e = yield Vt(this.checkTransaction(t));
      e.to != null && (e.to = Promise.resolve(e.to).then((i) => ye(this, void 0, void 0, function* () {
        if (i == null)
          return null;
        const s = yield this.resolveName(i);
        return s == null && pe.throwArgumentError("provided ENS name resolves to null", "tx.to", i), s;
      })), e.to.catch((i) => {
      }));
      const r = e.maxFeePerGas != null || e.maxPriorityFeePerGas != null;
      if (e.gasPrice != null && (e.type === 2 || r) ? pe.throwArgumentError("eip-1559 transaction do not support gasPrice", "transaction", t) : (e.type === 0 || e.type === 1) && r && pe.throwArgumentError("pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "transaction", t), (e.type === 2 || e.type == null) && e.maxFeePerGas != null && e.maxPriorityFeePerGas != null)
        e.type = 2;
      else if (e.type === 0 || e.type === 1)
        e.gasPrice == null && (e.gasPrice = this.getGasPrice());
      else {
        const i = yield this.getFeeData();
        if (e.type == null)
          if (i.maxFeePerGas != null && i.maxPriorityFeePerGas != null)
            if (e.type = 2, e.gasPrice != null) {
              const s = e.gasPrice;
              delete e.gasPrice, e.maxFeePerGas = s, e.maxPriorityFeePerGas = s;
            } else
              e.maxFeePerGas == null && (e.maxFeePerGas = i.maxFeePerGas), e.maxPriorityFeePerGas == null && (e.maxPriorityFeePerGas = i.maxPriorityFeePerGas);
          else
            i.gasPrice != null ? (r && pe.throwError("network does not support EIP-1559", M.errors.UNSUPPORTED_OPERATION, {
              operation: "populateTransaction"
            }), e.gasPrice == null && (e.gasPrice = i.gasPrice), e.type = 0) : pe.throwError("failed to get consistent fee data", M.errors.UNSUPPORTED_OPERATION, {
              operation: "signer.getFeeData"
            });
        else
          e.type === 2 && (e.maxFeePerGas == null && (e.maxFeePerGas = i.maxFeePerGas), e.maxPriorityFeePerGas == null && (e.maxPriorityFeePerGas = i.maxPriorityFeePerGas));
      }
      return e.nonce == null && (e.nonce = this.getTransactionCount("pending")), e.gasLimit == null && (e.gasLimit = this.estimateGas(e).catch((i) => {
        if (_f.indexOf(i.code) >= 0)
          throw i;
        return pe.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", M.errors.UNPREDICTABLE_GAS_LIMIT, {
          error: i,
          tx: e
        });
      })), e.chainId == null ? e.chainId = this.getChainId() : e.chainId = Promise.all([
        Promise.resolve(e.chainId),
        this.getChainId()
      ]).then((i) => (i[1] !== 0 && i[0] !== i[1] && pe.throwArgumentError("chainId address mismatch", "transaction", t), i[0])), yield Vt(e);
    });
  }
  ///////////////////
  // Sub-classes SHOULD leave these alone
  _checkProvider(t) {
    this.provider || pe.throwError("missing provider", M.errors.UNSUPPORTED_OPERATION, {
      operation: t || "_checkProvider"
    });
  }
  static isSigner(t) {
    return !!(t && t._isSigner);
  }
}
class Oi extends on {
  constructor(t, e) {
    super(), C(this, "address", t), C(this, "provider", e || null);
  }
  getAddress() {
    return Promise.resolve(this.address);
  }
  _fail(t, e) {
    return Promise.resolve().then(() => {
      pe.throwError(t, M.errors.UNSUPPORTED_OPERATION, { operation: e });
    });
  }
  signMessage(t) {
    return this._fail("VoidSigner cannot sign messages", "signMessage");
  }
  signTransaction(t) {
    return this._fail("VoidSigner cannot sign transactions", "signTransaction");
  }
  _signTypedData(t, e, r) {
    return this._fail("VoidSigner cannot sign typed data", "signTypedData");
  }
  connect(t) {
    return new Oi(this.address, t);
  }
}
var fo = {}, nt = {}, an = uo;
function uo(n, t) {
  if (!n)
    throw new Error(t || "Assertion failed");
}
uo.equal = function(t, e, r) {
  if (t != e)
    throw new Error(r || "Assertion failed: " + t + " != " + e);
};
var bi = { exports: {} };
typeof Object.create == "function" ? bi.exports = function(t, e) {
  e && (t.super_ = e, t.prototype = Object.create(e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : bi.exports = function(t, e) {
  if (e) {
    t.super_ = e;
    var r = function() {
    };
    r.prototype = e.prototype, t.prototype = new r(), t.prototype.constructor = t;
  }
};
var Ef = bi.exports, Af = an, Mf = Ef;
nt.inherits = Mf;
function Nf(n, t) {
  return (n.charCodeAt(t) & 64512) !== 55296 || t < 0 || t + 1 >= n.length ? !1 : (n.charCodeAt(t + 1) & 64512) === 56320;
}
function Pf(n, t) {
  if (Array.isArray(n))
    return n.slice();
  if (!n)
    return [];
  var e = [];
  if (typeof n == "string")
    if (t) {
      if (t === "hex")
        for (n = n.replace(/[^a-z0-9]+/ig, ""), n.length % 2 !== 0 && (n = "0" + n), i = 0; i < n.length; i += 2)
          e.push(parseInt(n[i] + n[i + 1], 16));
    } else
      for (var r = 0, i = 0; i < n.length; i++) {
        var s = n.charCodeAt(i);
        s < 128 ? e[r++] = s : s < 2048 ? (e[r++] = s >> 6 | 192, e[r++] = s & 63 | 128) : Nf(n, i) ? (s = 65536 + ((s & 1023) << 10) + (n.charCodeAt(++i) & 1023), e[r++] = s >> 18 | 240, e[r++] = s >> 12 & 63 | 128, e[r++] = s >> 6 & 63 | 128, e[r++] = s & 63 | 128) : (e[r++] = s >> 12 | 224, e[r++] = s >> 6 & 63 | 128, e[r++] = s & 63 | 128);
      }
  else
    for (i = 0; i < n.length; i++)
      e[i] = n[i] | 0;
  return e;
}
nt.toArray = Pf;
function Sf(n) {
  for (var t = "", e = 0; e < n.length; e++)
    t += lo(n[e].toString(16));
  return t;
}
nt.toHex = Sf;
function ho(n) {
  var t = n >>> 24 | n >>> 8 & 65280 | n << 8 & 16711680 | (n & 255) << 24;
  return t >>> 0;
}
nt.htonl = ho;
function kf(n, t) {
  for (var e = "", r = 0; r < n.length; r++) {
    var i = n[r];
    t === "little" && (i = ho(i)), e += co(i.toString(16));
  }
  return e;
}
nt.toHex32 = kf;
function lo(n) {
  return n.length === 1 ? "0" + n : n;
}
nt.zero2 = lo;
function co(n) {
  return n.length === 7 ? "0" + n : n.length === 6 ? "00" + n : n.length === 5 ? "000" + n : n.length === 4 ? "0000" + n : n.length === 3 ? "00000" + n : n.length === 2 ? "000000" + n : n.length === 1 ? "0000000" + n : n;
}
nt.zero8 = co;
function Rf(n, t, e, r) {
  var i = e - t;
  Af(i % 4 === 0);
  for (var s = new Array(i / 4), o = 0, u = t; o < s.length; o++, u += 4) {
    var l;
    r === "big" ? l = n[u] << 24 | n[u + 1] << 16 | n[u + 2] << 8 | n[u + 3] : l = n[u + 3] << 24 | n[u + 2] << 16 | n[u + 1] << 8 | n[u], s[o] = l >>> 0;
  }
  return s;
}
nt.join32 = Rf;
function If(n, t) {
  for (var e = new Array(n.length * 4), r = 0, i = 0; r < n.length; r++, i += 4) {
    var s = n[r];
    t === "big" ? (e[i] = s >>> 24, e[i + 1] = s >>> 16 & 255, e[i + 2] = s >>> 8 & 255, e[i + 3] = s & 255) : (e[i + 3] = s >>> 24, e[i + 2] = s >>> 16 & 255, e[i + 1] = s >>> 8 & 255, e[i] = s & 255);
  }
  return e;
}
nt.split32 = If;
function Tf(n, t) {
  return n >>> t | n << 32 - t;
}
nt.rotr32 = Tf;
function Cf(n, t) {
  return n << t | n >>> 32 - t;
}
nt.rotl32 = Cf;
function Bf(n, t) {
  return n + t >>> 0;
}
nt.sum32 = Bf;
function Of(n, t, e) {
  return n + t + e >>> 0;
}
nt.sum32_3 = Of;
function Lf(n, t, e, r) {
  return n + t + e + r >>> 0;
}
nt.sum32_4 = Lf;
function Ff(n, t, e, r, i) {
  return n + t + e + r + i >>> 0;
}
nt.sum32_5 = Ff;
function Uf(n, t, e, r) {
  var i = n[t], s = n[t + 1], o = r + s >>> 0, u = (o < r ? 1 : 0) + e + i;
  n[t] = u >>> 0, n[t + 1] = o;
}
nt.sum64 = Uf;
function Df(n, t, e, r) {
  var i = t + r >>> 0, s = (i < t ? 1 : 0) + n + e;
  return s >>> 0;
}
nt.sum64_hi = Df;
function $f(n, t, e, r) {
  var i = t + r;
  return i >>> 0;
}
nt.sum64_lo = $f;
function qf(n, t, e, r, i, s, o, u) {
  var l = 0, d = t;
  d = d + r >>> 0, l += d < t ? 1 : 0, d = d + s >>> 0, l += d < s ? 1 : 0, d = d + u >>> 0, l += d < u ? 1 : 0;
  var g = n + e + i + o + l;
  return g >>> 0;
}
nt.sum64_4_hi = qf;
function zf(n, t, e, r, i, s, o, u) {
  var l = t + r + s + u;
  return l >>> 0;
}
nt.sum64_4_lo = zf;
function Gf(n, t, e, r, i, s, o, u, l, d) {
  var g = 0, w = t;
  w = w + r >>> 0, g += w < t ? 1 : 0, w = w + s >>> 0, g += w < s ? 1 : 0, w = w + u >>> 0, g += w < u ? 1 : 0, w = w + d >>> 0, g += w < d ? 1 : 0;
  var A = n + e + i + o + l + g;
  return A >>> 0;
}
nt.sum64_5_hi = Gf;
function jf(n, t, e, r, i, s, o, u, l, d) {
  var g = t + r + s + u + d;
  return g >>> 0;
}
nt.sum64_5_lo = jf;
function Vf(n, t, e) {
  var r = t << 32 - e | n >>> e;
  return r >>> 0;
}
nt.rotr64_hi = Vf;
function Hf(n, t, e) {
  var r = n << 32 - e | t >>> e;
  return r >>> 0;
}
nt.rotr64_lo = Hf;
function Wf(n, t, e) {
  return n >>> e;
}
nt.shr64_hi = Wf;
function Kf(n, t, e) {
  var r = n << 32 - e | t >>> e;
  return r >>> 0;
}
nt.shr64_lo = Kf;
var Ur = {}, hs = nt, Jf = an;
function On() {
  this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
}
Ur.BlockHash = On;
On.prototype.update = function(t, e) {
  if (t = hs.toArray(t, e), this.pending ? this.pending = this.pending.concat(t) : this.pending = t, this.pendingTotal += t.length, this.pending.length >= this._delta8) {
    t = this.pending;
    var r = t.length % this._delta8;
    this.pending = t.slice(t.length - r, t.length), this.pending.length === 0 && (this.pending = null), t = hs.join32(t, 0, t.length - r, this.endian);
    for (var i = 0; i < t.length; i += this._delta32)
      this._update(t, i, i + this._delta32);
  }
  return this;
};
On.prototype.digest = function(t) {
  return this.update(this._pad()), Jf(this.pending === null), this._digest(t);
};
On.prototype._pad = function() {
  var t = this.pendingTotal, e = this._delta8, r = e - (t + this.padLength) % e, i = new Array(r + this.padLength);
  i[0] = 128;
  for (var s = 1; s < r; s++)
    i[s] = 0;
  if (t <<= 3, this.endian === "big") {
    for (var o = 8; o < this.padLength; o++)
      i[s++] = 0;
    i[s++] = 0, i[s++] = 0, i[s++] = 0, i[s++] = 0, i[s++] = t >>> 24 & 255, i[s++] = t >>> 16 & 255, i[s++] = t >>> 8 & 255, i[s++] = t & 255;
  } else
    for (i[s++] = t & 255, i[s++] = t >>> 8 & 255, i[s++] = t >>> 16 & 255, i[s++] = t >>> 24 & 255, i[s++] = 0, i[s++] = 0, i[s++] = 0, i[s++] = 0, o = 8; o < this.padLength; o++)
      i[s++] = 0;
  return i;
};
var Dr = {}, Fe = {}, Xf = nt, Re = Xf.rotr32;
function Zf(n, t, e, r) {
  if (n === 0)
    return po(t, e, r);
  if (n === 1 || n === 3)
    return go(t, e, r);
  if (n === 2)
    return mo(t, e, r);
}
Fe.ft_1 = Zf;
function po(n, t, e) {
  return n & t ^ ~n & e;
}
Fe.ch32 = po;
function mo(n, t, e) {
  return n & t ^ n & e ^ t & e;
}
Fe.maj32 = mo;
function go(n, t, e) {
  return n ^ t ^ e;
}
Fe.p32 = go;
function Yf(n) {
  return Re(n, 2) ^ Re(n, 13) ^ Re(n, 22);
}
Fe.s0_256 = Yf;
function Qf(n) {
  return Re(n, 6) ^ Re(n, 11) ^ Re(n, 25);
}
Fe.s1_256 = Qf;
function tu(n) {
  return Re(n, 7) ^ Re(n, 18) ^ n >>> 3;
}
Fe.g0_256 = tu;
function eu(n) {
  return Re(n, 17) ^ Re(n, 19) ^ n >>> 10;
}
Fe.g1_256 = eu;
var Or = nt, ru = Ur, nu = Fe, ii = Or.rotl32, Gr = Or.sum32, iu = Or.sum32_5, su = nu.ft_1, vo = ru.BlockHash, ou = [
  1518500249,
  1859775393,
  2400959708,
  3395469782
];
function Be() {
  if (!(this instanceof Be))
    return new Be();
  vo.call(this), this.h = [
    1732584193,
    4023233417,
    2562383102,
    271733878,
    3285377520
  ], this.W = new Array(80);
}
Or.inherits(Be, vo);
var au = Be;
Be.blockSize = 512;
Be.outSize = 160;
Be.hmacStrength = 80;
Be.padLength = 64;
Be.prototype._update = function(t, e) {
  for (var r = this.W, i = 0; i < 16; i++)
    r[i] = t[e + i];
  for (; i < r.length; i++)
    r[i] = ii(r[i - 3] ^ r[i - 8] ^ r[i - 14] ^ r[i - 16], 1);
  var s = this.h[0], o = this.h[1], u = this.h[2], l = this.h[3], d = this.h[4];
  for (i = 0; i < r.length; i++) {
    var g = ~~(i / 20), w = iu(ii(s, 5), su(g, o, u, l), d, r[i], ou[g]);
    d = l, l = u, u = ii(o, 30), o = s, s = w;
  }
  this.h[0] = Gr(this.h[0], s), this.h[1] = Gr(this.h[1], o), this.h[2] = Gr(this.h[2], u), this.h[3] = Gr(this.h[3], l), this.h[4] = Gr(this.h[4], d);
};
Be.prototype._digest = function(t) {
  return t === "hex" ? Or.toHex32(this.h, "big") : Or.split32(this.h, "big");
};
var Lr = nt, fu = Ur, $r = Fe, uu = an, be = Lr.sum32, hu = Lr.sum32_4, lu = Lr.sum32_5, cu = $r.ch32, du = $r.maj32, pu = $r.s0_256, mu = $r.s1_256, gu = $r.g0_256, vu = $r.g1_256, yo = fu.BlockHash, yu = [
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
];
function Oe() {
  if (!(this instanceof Oe))
    return new Oe();
  yo.call(this), this.h = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ], this.k = yu, this.W = new Array(64);
}
Lr.inherits(Oe, yo);
var bo = Oe;
Oe.blockSize = 512;
Oe.outSize = 256;
Oe.hmacStrength = 192;
Oe.padLength = 64;
Oe.prototype._update = function(t, e) {
  for (var r = this.W, i = 0; i < 16; i++)
    r[i] = t[e + i];
  for (; i < r.length; i++)
    r[i] = hu(vu(r[i - 2]), r[i - 7], gu(r[i - 15]), r[i - 16]);
  var s = this.h[0], o = this.h[1], u = this.h[2], l = this.h[3], d = this.h[4], g = this.h[5], w = this.h[6], A = this.h[7];
  for (uu(this.k.length === r.length), i = 0; i < r.length; i++) {
    var P = lu(A, mu(d), cu(d, g, w), this.k[i], r[i]), N = be(pu(s), du(s, o, u));
    A = w, w = g, g = d, d = be(l, P), l = u, u = o, o = s, s = be(P, N);
  }
  this.h[0] = be(this.h[0], s), this.h[1] = be(this.h[1], o), this.h[2] = be(this.h[2], u), this.h[3] = be(this.h[3], l), this.h[4] = be(this.h[4], d), this.h[5] = be(this.h[5], g), this.h[6] = be(this.h[6], w), this.h[7] = be(this.h[7], A);
};
Oe.prototype._digest = function(t) {
  return t === "hex" ? Lr.toHex32(this.h, "big") : Lr.split32(this.h, "big");
};
var wi = nt, wo = bo;
function Ge() {
  if (!(this instanceof Ge))
    return new Ge();
  wo.call(this), this.h = [
    3238371032,
    914150663,
    812702999,
    4144912697,
    4290775857,
    1750603025,
    1694076839,
    3204075428
  ];
}
wi.inherits(Ge, wo);
var bu = Ge;
Ge.blockSize = 512;
Ge.outSize = 224;
Ge.hmacStrength = 192;
Ge.padLength = 64;
Ge.prototype._digest = function(t) {
  return t === "hex" ? wi.toHex32(this.h.slice(0, 7), "big") : wi.split32(this.h.slice(0, 7), "big");
};
var oe = nt, wu = Ur, xu = an, Ie = oe.rotr64_hi, Te = oe.rotr64_lo, xo = oe.shr64_hi, _o = oe.shr64_lo, tr = oe.sum64, si = oe.sum64_hi, oi = oe.sum64_lo, _u = oe.sum64_4_hi, Eu = oe.sum64_4_lo, Au = oe.sum64_5_hi, Mu = oe.sum64_5_lo, Eo = wu.BlockHash, Nu = [
  1116352408,
  3609767458,
  1899447441,
  602891725,
  3049323471,
  3964484399,
  3921009573,
  2173295548,
  961987163,
  4081628472,
  1508970993,
  3053834265,
  2453635748,
  2937671579,
  2870763221,
  3664609560,
  3624381080,
  2734883394,
  310598401,
  1164996542,
  607225278,
  1323610764,
  1426881987,
  3590304994,
  1925078388,
  4068182383,
  2162078206,
  991336113,
  2614888103,
  633803317,
  3248222580,
  3479774868,
  3835390401,
  2666613458,
  4022224774,
  944711139,
  264347078,
  2341262773,
  604807628,
  2007800933,
  770255983,
  1495990901,
  1249150122,
  1856431235,
  1555081692,
  3175218132,
  1996064986,
  2198950837,
  2554220882,
  3999719339,
  2821834349,
  766784016,
  2952996808,
  2566594879,
  3210313671,
  3203337956,
  3336571891,
  1034457026,
  3584528711,
  2466948901,
  113926993,
  3758326383,
  338241895,
  168717936,
  666307205,
  1188179964,
  773529912,
  1546045734,
  1294757372,
  1522805485,
  1396182291,
  2643833823,
  1695183700,
  2343527390,
  1986661051,
  1014477480,
  2177026350,
  1206759142,
  2456956037,
  344077627,
  2730485921,
  1290863460,
  2820302411,
  3158454273,
  3259730800,
  3505952657,
  3345764771,
  106217008,
  3516065817,
  3606008344,
  3600352804,
  1432725776,
  4094571909,
  1467031594,
  275423344,
  851169720,
  430227734,
  3100823752,
  506948616,
  1363258195,
  659060556,
  3750685593,
  883997877,
  3785050280,
  958139571,
  3318307427,
  1322822218,
  3812723403,
  1537002063,
  2003034995,
  1747873779,
  3602036899,
  1955562222,
  1575990012,
  2024104815,
  1125592928,
  2227730452,
  2716904306,
  2361852424,
  442776044,
  2428436474,
  593698344,
  2756734187,
  3733110249,
  3204031479,
  2999351573,
  3329325298,
  3815920427,
  3391569614,
  3928383900,
  3515267271,
  566280711,
  3940187606,
  3454069534,
  4118630271,
  4000239992,
  116418474,
  1914138554,
  174292421,
  2731055270,
  289380356,
  3203993006,
  460393269,
  320620315,
  685471733,
  587496836,
  852142971,
  1086792851,
  1017036298,
  365543100,
  1126000580,
  2618297676,
  1288033470,
  3409855158,
  1501505948,
  4234509866,
  1607167915,
  987167468,
  1816402316,
  1246189591
];
function Ee() {
  if (!(this instanceof Ee))
    return new Ee();
  Eo.call(this), this.h = [
    1779033703,
    4089235720,
    3144134277,
    2227873595,
    1013904242,
    4271175723,
    2773480762,
    1595750129,
    1359893119,
    2917565137,
    2600822924,
    725511199,
    528734635,
    4215389547,
    1541459225,
    327033209
  ], this.k = Nu, this.W = new Array(160);
}
oe.inherits(Ee, Eo);
var Ao = Ee;
Ee.blockSize = 1024;
Ee.outSize = 512;
Ee.hmacStrength = 192;
Ee.padLength = 128;
Ee.prototype._prepareBlock = function(t, e) {
  for (var r = this.W, i = 0; i < 32; i++)
    r[i] = t[e + i];
  for (; i < r.length; i += 2) {
    var s = Fu(r[i - 4], r[i - 3]), o = Uu(r[i - 4], r[i - 3]), u = r[i - 14], l = r[i - 13], d = Ou(r[i - 30], r[i - 29]), g = Lu(r[i - 30], r[i - 29]), w = r[i - 32], A = r[i - 31];
    r[i] = _u(
      s,
      o,
      u,
      l,
      d,
      g,
      w,
      A
    ), r[i + 1] = Eu(
      s,
      o,
      u,
      l,
      d,
      g,
      w,
      A
    );
  }
};
Ee.prototype._update = function(t, e) {
  this._prepareBlock(t, e);
  var r = this.W, i = this.h[0], s = this.h[1], o = this.h[2], u = this.h[3], l = this.h[4], d = this.h[5], g = this.h[6], w = this.h[7], A = this.h[8], P = this.h[9], N = this.h[10], I = this.h[11], H = this.h[12], R = this.h[13], L = this.h[14], j = this.h[15];
  xu(this.k.length === r.length);
  for (var J = 0; J < r.length; J += 2) {
    var Q = L, ft = j, Kt = Cu(A, P), Ht = Bu(A, P), st = Pu(A, P, N, I, H), ce = Su(A, P, N, I, H, R), x = this.k[J], a = this.k[J + 1], h = r[J], p = r[J + 1], m = Au(
      Q,
      ft,
      Kt,
      Ht,
      st,
      ce,
      x,
      a,
      h,
      p
    ), y = Mu(
      Q,
      ft,
      Kt,
      Ht,
      st,
      ce,
      x,
      a,
      h,
      p
    );
    Q = Iu(i, s), ft = Tu(i, s), Kt = ku(i, s, o, u, l), Ht = Ru(i, s, o, u, l, d);
    var _ = si(Q, ft, Kt, Ht), E = oi(Q, ft, Kt, Ht);
    L = H, j = R, H = N, R = I, N = A, I = P, A = si(g, w, m, y), P = oi(w, w, m, y), g = l, w = d, l = o, d = u, o = i, u = s, i = si(m, y, _, E), s = oi(m, y, _, E);
  }
  tr(this.h, 0, i, s), tr(this.h, 2, o, u), tr(this.h, 4, l, d), tr(this.h, 6, g, w), tr(this.h, 8, A, P), tr(this.h, 10, N, I), tr(this.h, 12, H, R), tr(this.h, 14, L, j);
};
Ee.prototype._digest = function(t) {
  return t === "hex" ? oe.toHex32(this.h, "big") : oe.split32(this.h, "big");
};
function Pu(n, t, e, r, i) {
  var s = n & e ^ ~n & i;
  return s < 0 && (s += 4294967296), s;
}
function Su(n, t, e, r, i, s) {
  var o = t & r ^ ~t & s;
  return o < 0 && (o += 4294967296), o;
}
function ku(n, t, e, r, i) {
  var s = n & e ^ n & i ^ e & i;
  return s < 0 && (s += 4294967296), s;
}
function Ru(n, t, e, r, i, s) {
  var o = t & r ^ t & s ^ r & s;
  return o < 0 && (o += 4294967296), o;
}
function Iu(n, t) {
  var e = Ie(n, t, 28), r = Ie(t, n, 2), i = Ie(t, n, 7), s = e ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function Tu(n, t) {
  var e = Te(n, t, 28), r = Te(t, n, 2), i = Te(t, n, 7), s = e ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function Cu(n, t) {
  var e = Ie(n, t, 14), r = Ie(n, t, 18), i = Ie(t, n, 9), s = e ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function Bu(n, t) {
  var e = Te(n, t, 14), r = Te(n, t, 18), i = Te(t, n, 9), s = e ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function Ou(n, t) {
  var e = Ie(n, t, 1), r = Ie(n, t, 8), i = xo(n, t, 7), s = e ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function Lu(n, t) {
  var e = Te(n, t, 1), r = Te(n, t, 8), i = _o(n, t, 7), s = e ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function Fu(n, t) {
  var e = Ie(n, t, 19), r = Ie(t, n, 29), i = xo(n, t, 6), s = e ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
function Uu(n, t) {
  var e = Te(n, t, 19), r = Te(t, n, 29), i = _o(n, t, 6), s = e ^ r ^ i;
  return s < 0 && (s += 4294967296), s;
}
var xi = nt, Mo = Ao;
function je() {
  if (!(this instanceof je))
    return new je();
  Mo.call(this), this.h = [
    3418070365,
    3238371032,
    1654270250,
    914150663,
    2438529370,
    812702999,
    355462360,
    4144912697,
    1731405415,
    4290775857,
    2394180231,
    1750603025,
    3675008525,
    1694076839,
    1203062813,
    3204075428
  ];
}
xi.inherits(je, Mo);
var Du = je;
je.blockSize = 1024;
je.outSize = 384;
je.hmacStrength = 192;
je.padLength = 128;
je.prototype._digest = function(t) {
  return t === "hex" ? xi.toHex32(this.h.slice(0, 12), "big") : xi.split32(this.h.slice(0, 12), "big");
};
Dr.sha1 = au;
Dr.sha224 = bu;
Dr.sha256 = bo;
Dr.sha384 = Du;
Dr.sha512 = Ao;
var No = {}, _r = nt, $u = Ur, cn = _r.rotl32, ls = _r.sum32, jr = _r.sum32_3, cs = _r.sum32_4, Po = $u.BlockHash;
function Le() {
  if (!(this instanceof Le))
    return new Le();
  Po.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
}
_r.inherits(Le, Po);
No.ripemd160 = Le;
Le.blockSize = 512;
Le.outSize = 160;
Le.hmacStrength = 192;
Le.padLength = 64;
Le.prototype._update = function(t, e) {
  for (var r = this.h[0], i = this.h[1], s = this.h[2], o = this.h[3], u = this.h[4], l = r, d = i, g = s, w = o, A = u, P = 0; P < 80; P++) {
    var N = ls(
      cn(
        cs(r, ds(P, i, s, o), t[Gu[P] + e], qu(P)),
        Vu[P]
      ),
      u
    );
    r = u, u = o, o = cn(s, 10), s = i, i = N, N = ls(
      cn(
        cs(l, ds(79 - P, d, g, w), t[ju[P] + e], zu(P)),
        Hu[P]
      ),
      A
    ), l = A, A = w, w = cn(g, 10), g = d, d = N;
  }
  N = jr(this.h[1], s, w), this.h[1] = jr(this.h[2], o, A), this.h[2] = jr(this.h[3], u, l), this.h[3] = jr(this.h[4], r, d), this.h[4] = jr(this.h[0], i, g), this.h[0] = N;
};
Le.prototype._digest = function(t) {
  return t === "hex" ? _r.toHex32(this.h, "little") : _r.split32(this.h, "little");
};
function ds(n, t, e, r) {
  return n <= 15 ? t ^ e ^ r : n <= 31 ? t & e | ~t & r : n <= 47 ? (t | ~e) ^ r : n <= 63 ? t & r | e & ~r : t ^ (e | ~r);
}
function qu(n) {
  return n <= 15 ? 0 : n <= 31 ? 1518500249 : n <= 47 ? 1859775393 : n <= 63 ? 2400959708 : 2840853838;
}
function zu(n) {
  return n <= 15 ? 1352829926 : n <= 31 ? 1548603684 : n <= 47 ? 1836072691 : n <= 63 ? 2053994217 : 0;
}
var Gu = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  7,
  4,
  13,
  1,
  10,
  6,
  15,
  3,
  12,
  0,
  9,
  5,
  2,
  14,
  11,
  8,
  3,
  10,
  14,
  4,
  9,
  15,
  8,
  1,
  2,
  7,
  0,
  6,
  13,
  11,
  5,
  12,
  1,
  9,
  11,
  10,
  0,
  8,
  12,
  4,
  13,
  3,
  7,
  15,
  14,
  5,
  6,
  2,
  4,
  0,
  5,
  9,
  7,
  12,
  2,
  10,
  14,
  1,
  3,
  8,
  11,
  6,
  15,
  13
], ju = [
  5,
  14,
  7,
  0,
  9,
  2,
  11,
  4,
  13,
  6,
  15,
  8,
  1,
  10,
  3,
  12,
  6,
  11,
  3,
  7,
  0,
  13,
  5,
  10,
  14,
  15,
  8,
  12,
  4,
  9,
  1,
  2,
  15,
  5,
  1,
  3,
  7,
  14,
  6,
  9,
  11,
  8,
  12,
  2,
  10,
  0,
  4,
  13,
  8,
  6,
  4,
  1,
  3,
  11,
  15,
  0,
  5,
  12,
  2,
  13,
  9,
  7,
  10,
  14,
  12,
  15,
  10,
  4,
  1,
  5,
  8,
  7,
  6,
  2,
  13,
  14,
  0,
  3,
  9,
  11
], Vu = [
  11,
  14,
  15,
  12,
  5,
  8,
  7,
  9,
  11,
  13,
  14,
  15,
  6,
  7,
  9,
  8,
  7,
  6,
  8,
  13,
  11,
  9,
  7,
  15,
  7,
  12,
  15,
  9,
  11,
  7,
  13,
  12,
  11,
  13,
  6,
  7,
  14,
  9,
  13,
  15,
  14,
  8,
  13,
  6,
  5,
  12,
  7,
  5,
  11,
  12,
  14,
  15,
  14,
  15,
  9,
  8,
  9,
  14,
  5,
  6,
  8,
  6,
  5,
  12,
  9,
  15,
  5,
  11,
  6,
  8,
  13,
  12,
  5,
  12,
  13,
  14,
  11,
  8,
  5,
  6
], Hu = [
  8,
  9,
  9,
  11,
  13,
  15,
  15,
  5,
  7,
  7,
  8,
  11,
  14,
  14,
  12,
  6,
  9,
  13,
  15,
  7,
  12,
  8,
  9,
  11,
  7,
  7,
  12,
  7,
  6,
  15,
  13,
  11,
  9,
  7,
  15,
  11,
  8,
  6,
  6,
  14,
  12,
  13,
  5,
  14,
  13,
  13,
  7,
  5,
  15,
  5,
  8,
  11,
  14,
  14,
  6,
  14,
  6,
  9,
  12,
  9,
  12,
  5,
  15,
  8,
  8,
  5,
  12,
  9,
  12,
  5,
  14,
  6,
  8,
  13,
  6,
  5,
  15,
  13,
  11,
  11
], Wu = nt, Ku = an;
function Fr(n, t, e) {
  if (!(this instanceof Fr))
    return new Fr(n, t, e);
  this.Hash = n, this.blockSize = n.blockSize / 8, this.outSize = n.outSize / 8, this.inner = null, this.outer = null, this._init(Wu.toArray(t, e));
}
var Ju = Fr;
Fr.prototype._init = function(t) {
  t.length > this.blockSize && (t = new this.Hash().update(t).digest()), Ku(t.length <= this.blockSize);
  for (var e = t.length; e < this.blockSize; e++)
    t.push(0);
  for (e = 0; e < t.length; e++)
    t[e] ^= 54;
  for (this.inner = new this.Hash().update(t), e = 0; e < t.length; e++)
    t[e] ^= 106;
  this.outer = new this.Hash().update(t);
};
Fr.prototype.update = function(t, e) {
  return this.inner.update(t, e), this;
};
Fr.prototype.digest = function(t) {
  return this.outer.update(this.inner.digest()), this.outer.digest(t);
};
(function(n) {
  var t = n;
  t.utils = nt, t.common = Ur, t.sha = Dr, t.ripemd = No, t.hmac = Ju, t.sha1 = t.sha.sha1, t.sha256 = t.sha.sha256, t.sha224 = t.sha.sha224, t.sha384 = t.sha.sha384, t.sha512 = t.sha.sha512, t.ripemd160 = t.ripemd.ripemd160;
})(fo);
const Ae = /* @__PURE__ */ Rn(fo);
function qr(n, t, e) {
  return e = {
    path: t,
    exports: {},
    require: function(r, i) {
      return Xu(r, i ?? e.path);
    }
  }, n(e, e.exports), e.exports;
}
function Xu() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var Li = So;
function So(n, t) {
  if (!n)
    throw new Error(t || "Assertion failed");
}
So.equal = function(t, e, r) {
  if (t != e)
    throw new Error(r || "Assertion failed: " + t + " != " + e);
};
var _e = qr(function(n, t) {
  var e = t;
  function r(o, u) {
    if (Array.isArray(o))
      return o.slice();
    if (!o)
      return [];
    var l = [];
    if (typeof o != "string") {
      for (var d = 0; d < o.length; d++)
        l[d] = o[d] | 0;
      return l;
    }
    if (u === "hex") {
      o = o.replace(/[^a-z0-9]+/ig, ""), o.length % 2 !== 0 && (o = "0" + o);
      for (var d = 0; d < o.length; d += 2)
        l.push(parseInt(o[d] + o[d + 1], 16));
    } else
      for (var d = 0; d < o.length; d++) {
        var g = o.charCodeAt(d), w = g >> 8, A = g & 255;
        w ? l.push(w, A) : l.push(A);
      }
    return l;
  }
  e.toArray = r;
  function i(o) {
    return o.length === 1 ? "0" + o : o;
  }
  e.zero2 = i;
  function s(o) {
    for (var u = "", l = 0; l < o.length; l++)
      u += i(o[l].toString(16));
    return u;
  }
  e.toHex = s, e.encode = function(u, l) {
    return l === "hex" ? s(u) : u;
  };
}), le = qr(function(n, t) {
  var e = t;
  e.assert = Li, e.toArray = _e.toArray, e.zero2 = _e.zero2, e.toHex = _e.toHex, e.encode = _e.encode;
  function r(l, d, g) {
    var w = new Array(Math.max(l.bitLength(), g) + 1);
    w.fill(0);
    for (var A = 1 << d + 1, P = l.clone(), N = 0; N < w.length; N++) {
      var I, H = P.andln(A - 1);
      P.isOdd() ? (H > (A >> 1) - 1 ? I = (A >> 1) - H : I = H, P.isubn(I)) : I = 0, w[N] = I, P.iushrn(1);
    }
    return w;
  }
  e.getNAF = r;
  function i(l, d) {
    var g = [
      [],
      []
    ];
    l = l.clone(), d = d.clone();
    for (var w = 0, A = 0, P; l.cmpn(-w) > 0 || d.cmpn(-A) > 0; ) {
      var N = l.andln(3) + w & 3, I = d.andln(3) + A & 3;
      N === 3 && (N = -1), I === 3 && (I = -1);
      var H;
      N & 1 ? (P = l.andln(7) + w & 7, (P === 3 || P === 5) && I === 2 ? H = -N : H = N) : H = 0, g[0].push(H);
      var R;
      I & 1 ? (P = d.andln(7) + A & 7, (P === 3 || P === 5) && N === 2 ? R = -I : R = I) : R = 0, g[1].push(R), 2 * w === H + 1 && (w = 1 - w), 2 * A === R + 1 && (A = 1 - A), l.iushrn(1), d.iushrn(1);
    }
    return g;
  }
  e.getJSF = i;
  function s(l, d, g) {
    var w = "_" + d;
    l.prototype[d] = function() {
      return this[w] !== void 0 ? this[w] : this[w] = g.call(this);
    };
  }
  e.cachedProperty = s;
  function o(l) {
    return typeof l == "string" ? e.toArray(l, "hex") : l;
  }
  e.parseBytes = o;
  function u(l) {
    return new Y(l, "hex", "le");
  }
  e.intFromLE = u;
}), Mn = le.getNAF, Zu = le.getJSF, Nn = le.assert;
function ir(n, t) {
  this.type = n, this.p = new Y(t.p, 16), this.red = t.prime ? Y.red(t.prime) : Y.mont(this.p), this.zero = new Y(0).toRed(this.red), this.one = new Y(1).toRed(this.red), this.two = new Y(2).toRed(this.red), this.n = t.n && new Y(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
  var e = this.n && this.p.div(this.n);
  !e || e.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
}
var Ar = ir;
ir.prototype.point = function() {
  throw new Error("Not implemented");
};
ir.prototype.validate = function() {
  throw new Error("Not implemented");
};
ir.prototype._fixedNafMul = function(t, e) {
  Nn(t.precomputed);
  var r = t._getDoubles(), i = Mn(e, 1, this._bitLength), s = (1 << r.step + 1) - (r.step % 2 === 0 ? 2 : 1);
  s /= 3;
  var o = [], u, l;
  for (u = 0; u < i.length; u += r.step) {
    l = 0;
    for (var d = u + r.step - 1; d >= u; d--)
      l = (l << 1) + i[d];
    o.push(l);
  }
  for (var g = this.jpoint(null, null, null), w = this.jpoint(null, null, null), A = s; A > 0; A--) {
    for (u = 0; u < o.length; u++)
      l = o[u], l === A ? w = w.mixedAdd(r.points[u]) : l === -A && (w = w.mixedAdd(r.points[u].neg()));
    g = g.add(w);
  }
  return g.toP();
};
ir.prototype._wnafMul = function(t, e) {
  var r = 4, i = t._getNAFPoints(r);
  r = i.wnd;
  for (var s = i.points, o = Mn(e, r, this._bitLength), u = this.jpoint(null, null, null), l = o.length - 1; l >= 0; l--) {
    for (var d = 0; l >= 0 && o[l] === 0; l--)
      d++;
    if (l >= 0 && d++, u = u.dblp(d), l < 0)
      break;
    var g = o[l];
    Nn(g !== 0), t.type === "affine" ? g > 0 ? u = u.mixedAdd(s[g - 1 >> 1]) : u = u.mixedAdd(s[-g - 1 >> 1].neg()) : g > 0 ? u = u.add(s[g - 1 >> 1]) : u = u.add(s[-g - 1 >> 1].neg());
  }
  return t.type === "affine" ? u.toP() : u;
};
ir.prototype._wnafMulAdd = function(t, e, r, i, s) {
  var o = this._wnafT1, u = this._wnafT2, l = this._wnafT3, d = 0, g, w, A;
  for (g = 0; g < i; g++) {
    A = e[g];
    var P = A._getNAFPoints(t);
    o[g] = P.wnd, u[g] = P.points;
  }
  for (g = i - 1; g >= 1; g -= 2) {
    var N = g - 1, I = g;
    if (o[N] !== 1 || o[I] !== 1) {
      l[N] = Mn(r[N], o[N], this._bitLength), l[I] = Mn(r[I], o[I], this._bitLength), d = Math.max(l[N].length, d), d = Math.max(l[I].length, d);
      continue;
    }
    var H = [
      e[N],
      /* 1 */
      null,
      /* 3 */
      null,
      /* 5 */
      e[I]
      /* 7 */
    ];
    e[N].y.cmp(e[I].y) === 0 ? (H[1] = e[N].add(e[I]), H[2] = e[N].toJ().mixedAdd(e[I].neg())) : e[N].y.cmp(e[I].y.redNeg()) === 0 ? (H[1] = e[N].toJ().mixedAdd(e[I]), H[2] = e[N].add(e[I].neg())) : (H[1] = e[N].toJ().mixedAdd(e[I]), H[2] = e[N].toJ().mixedAdd(e[I].neg()));
    var R = [
      -3,
      /* -1 -1 */
      -1,
      /* -1 0 */
      -5,
      /* -1 1 */
      -7,
      /* 0 -1 */
      0,
      /* 0 0 */
      7,
      /* 0 1 */
      5,
      /* 1 -1 */
      1,
      /* 1 0 */
      3
      /* 1 1 */
    ], L = Zu(r[N], r[I]);
    for (d = Math.max(L[0].length, d), l[N] = new Array(d), l[I] = new Array(d), w = 0; w < d; w++) {
      var j = L[0][w] | 0, J = L[1][w] | 0;
      l[N][w] = R[(j + 1) * 3 + (J + 1)], l[I][w] = 0, u[N] = H;
    }
  }
  var Q = this.jpoint(null, null, null), ft = this._wnafT4;
  for (g = d; g >= 0; g--) {
    for (var Kt = 0; g >= 0; ) {
      var Ht = !0;
      for (w = 0; w < i; w++)
        ft[w] = l[w][g] | 0, ft[w] !== 0 && (Ht = !1);
      if (!Ht)
        break;
      Kt++, g--;
    }
    if (g >= 0 && Kt++, Q = Q.dblp(Kt), g < 0)
      break;
    for (w = 0; w < i; w++) {
      var st = ft[w];
      st !== 0 && (st > 0 ? A = u[w][st - 1 >> 1] : st < 0 && (A = u[w][-st - 1 >> 1].neg()), A.type === "affine" ? Q = Q.mixedAdd(A) : Q = Q.add(A));
    }
  }
  for (g = 0; g < i; g++)
    u[g] = null;
  return s ? Q : Q.toP();
};
function ge(n, t) {
  this.curve = n, this.type = t, this.precomputed = null;
}
ir.BasePoint = ge;
ge.prototype.eq = function() {
  throw new Error("Not implemented");
};
ge.prototype.validate = function() {
  return this.curve.validate(this);
};
ir.prototype.decodePoint = function(t, e) {
  t = le.toArray(t, e);
  var r = this.p.byteLength();
  if ((t[0] === 4 || t[0] === 6 || t[0] === 7) && t.length - 1 === 2 * r) {
    t[0] === 6 ? Nn(t[t.length - 1] % 2 === 0) : t[0] === 7 && Nn(t[t.length - 1] % 2 === 1);
    var i = this.point(
      t.slice(1, 1 + r),
      t.slice(1 + r, 1 + 2 * r)
    );
    return i;
  } else if ((t[0] === 2 || t[0] === 3) && t.length - 1 === r)
    return this.pointFromX(t.slice(1, 1 + r), t[0] === 3);
  throw new Error("Unknown point format");
};
ge.prototype.encodeCompressed = function(t) {
  return this.encode(t, !0);
};
ge.prototype._encode = function(t) {
  var e = this.curve.p.byteLength(), r = this.getX().toArray("be", e);
  return t ? [this.getY().isEven() ? 2 : 3].concat(r) : [4].concat(r, this.getY().toArray("be", e));
};
ge.prototype.encode = function(t, e) {
  return le.encode(this._encode(e), t);
};
ge.prototype.precompute = function(t) {
  if (this.precomputed)
    return this;
  var e = {
    doubles: null,
    naf: null,
    beta: null
  };
  return e.naf = this._getNAFPoints(8), e.doubles = this._getDoubles(4, t), e.beta = this._getBeta(), this.precomputed = e, this;
};
ge.prototype._hasDoubles = function(t) {
  if (!this.precomputed)
    return !1;
  var e = this.precomputed.doubles;
  return e ? e.points.length >= Math.ceil((t.bitLength() + 1) / e.step) : !1;
};
ge.prototype._getDoubles = function(t, e) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;
  for (var r = [this], i = this, s = 0; s < e; s += t) {
    for (var o = 0; o < t; o++)
      i = i.dbl();
    r.push(i);
  }
  return {
    step: t,
    points: r
  };
};
ge.prototype._getNAFPoints = function(t) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;
  for (var e = [this], r = (1 << t) - 1, i = r === 1 ? null : this.dbl(), s = 1; s < r; s++)
    e[s] = e[s - 1].add(i);
  return {
    wnd: t,
    points: e
  };
};
ge.prototype._getBeta = function() {
  return null;
};
ge.prototype.dblp = function(t) {
  for (var e = this, r = 0; r < t; r++)
    e = e.dbl();
  return e;
};
var Fi = qr(function(n) {
  typeof Object.create == "function" ? n.exports = function(e, r) {
    r && (e.super_ = r, e.prototype = Object.create(r.prototype, {
      constructor: {
        value: e,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : n.exports = function(e, r) {
    if (r) {
      e.super_ = r;
      var i = function() {
      };
      i.prototype = r.prototype, e.prototype = new i(), e.prototype.constructor = e;
    }
  };
}), Yu = le.assert;
function ve(n) {
  Ar.call(this, "short", n), this.a = new Y(n.a, 16).toRed(this.red), this.b = new Y(n.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(n), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
}
Fi(ve, Ar);
var Qu = ve;
ve.prototype._getEndomorphism = function(t) {
  if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
    var e, r;
    if (t.beta)
      e = new Y(t.beta, 16).toRed(this.red);
    else {
      var i = this._getEndoRoots(this.p);
      e = i[0].cmp(i[1]) < 0 ? i[0] : i[1], e = e.toRed(this.red);
    }
    if (t.lambda)
      r = new Y(t.lambda, 16);
    else {
      var s = this._getEndoRoots(this.n);
      this.g.mul(s[0]).x.cmp(this.g.x.redMul(e)) === 0 ? r = s[0] : (r = s[1], Yu(this.g.mul(r).x.cmp(this.g.x.redMul(e)) === 0));
    }
    var o;
    return t.basis ? o = t.basis.map(function(u) {
      return {
        a: new Y(u.a, 16),
        b: new Y(u.b, 16)
      };
    }) : o = this._getEndoBasis(r), {
      beta: e,
      lambda: r,
      basis: o
    };
  }
};
ve.prototype._getEndoRoots = function(t) {
  var e = t === this.p ? this.red : Y.mont(t), r = new Y(2).toRed(e).redInvm(), i = r.redNeg(), s = new Y(3).toRed(e).redNeg().redSqrt().redMul(r), o = i.redAdd(s).fromRed(), u = i.redSub(s).fromRed();
  return [o, u];
};
ve.prototype._getEndoBasis = function(t) {
  for (var e = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), r = t, i = this.n.clone(), s = new Y(1), o = new Y(0), u = new Y(0), l = new Y(1), d, g, w, A, P, N, I, H = 0, R, L; r.cmpn(0) !== 0; ) {
    var j = i.div(r);
    R = i.sub(j.mul(r)), L = u.sub(j.mul(s));
    var J = l.sub(j.mul(o));
    if (!w && R.cmp(e) < 0)
      d = I.neg(), g = s, w = R.neg(), A = L;
    else if (w && ++H === 2)
      break;
    I = R, i = r, r = R, u = s, s = L, l = o, o = J;
  }
  P = R.neg(), N = L;
  var Q = w.sqr().add(A.sqr()), ft = P.sqr().add(N.sqr());
  return ft.cmp(Q) >= 0 && (P = d, N = g), w.negative && (w = w.neg(), A = A.neg()), P.negative && (P = P.neg(), N = N.neg()), [
    { a: w, b: A },
    { a: P, b: N }
  ];
};
ve.prototype._endoSplit = function(t) {
  var e = this.endo.basis, r = e[0], i = e[1], s = i.b.mul(t).divRound(this.n), o = r.b.neg().mul(t).divRound(this.n), u = s.mul(r.a), l = o.mul(i.a), d = s.mul(r.b), g = o.mul(i.b), w = t.sub(u).sub(l), A = d.add(g).neg();
  return { k1: w, k2: A };
};
ve.prototype.pointFromX = function(t, e) {
  t = new Y(t, 16), t.red || (t = t.toRed(this.red));
  var r = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b), i = r.redSqrt();
  if (i.redSqr().redSub(r).cmp(this.zero) !== 0)
    throw new Error("invalid point");
  var s = i.fromRed().isOdd();
  return (e && !s || !e && s) && (i = i.redNeg()), this.point(t, i);
};
ve.prototype.validate = function(t) {
  if (t.inf)
    return !0;
  var e = t.x, r = t.y, i = this.a.redMul(e), s = e.redSqr().redMul(e).redIAdd(i).redIAdd(this.b);
  return r.redSqr().redISub(s).cmpn(0) === 0;
};
ve.prototype._endoWnafMulAdd = function(t, e, r) {
  for (var i = this._endoWnafT1, s = this._endoWnafT2, o = 0; o < t.length; o++) {
    var u = this._endoSplit(e[o]), l = t[o], d = l._getBeta();
    u.k1.negative && (u.k1.ineg(), l = l.neg(!0)), u.k2.negative && (u.k2.ineg(), d = d.neg(!0)), i[o * 2] = l, i[o * 2 + 1] = d, s[o * 2] = u.k1, s[o * 2 + 1] = u.k2;
  }
  for (var g = this._wnafMulAdd(1, i, s, o * 2, r), w = 0; w < o * 2; w++)
    i[w] = null, s[w] = null;
  return g;
};
function Zt(n, t, e, r) {
  Ar.BasePoint.call(this, n, "affine"), t === null && e === null ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new Y(t, 16), this.y = new Y(e, 16), r && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
}
Fi(Zt, Ar.BasePoint);
ve.prototype.point = function(t, e, r) {
  return new Zt(this, t, e, r);
};
ve.prototype.pointFromJSON = function(t, e) {
  return Zt.fromJSON(this, t, e);
};
Zt.prototype._getBeta = function() {
  if (this.curve.endo) {
    var t = this.precomputed;
    if (t && t.beta)
      return t.beta;
    var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (t) {
      var r = this.curve, i = function(s) {
        return r.point(s.x.redMul(r.endo.beta), s.y);
      };
      t.beta = e, e.precomputed = {
        beta: null,
        naf: t.naf && {
          wnd: t.naf.wnd,
          points: t.naf.points.map(i)
        },
        doubles: t.doubles && {
          step: t.doubles.step,
          points: t.doubles.points.map(i)
        }
      };
    }
    return e;
  }
};
Zt.prototype.toJSON = function() {
  return this.precomputed ? [this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  }] : [this.x, this.y];
};
Zt.fromJSON = function(t, e, r) {
  typeof e == "string" && (e = JSON.parse(e));
  var i = t.point(e[0], e[1], r);
  if (!e[2])
    return i;
  function s(u) {
    return t.point(u[0], u[1], r);
  }
  var o = e[2];
  return i.precomputed = {
    beta: null,
    doubles: o.doubles && {
      step: o.doubles.step,
      points: [i].concat(o.doubles.points.map(s))
    },
    naf: o.naf && {
      wnd: o.naf.wnd,
      points: [i].concat(o.naf.points.map(s))
    }
  }, i;
};
Zt.prototype.inspect = function() {
  return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
};
Zt.prototype.isInfinity = function() {
  return this.inf;
};
Zt.prototype.add = function(t) {
  if (this.inf)
    return t;
  if (t.inf)
    return this;
  if (this.eq(t))
    return this.dbl();
  if (this.neg().eq(t))
    return this.curve.point(null, null);
  if (this.x.cmp(t.x) === 0)
    return this.curve.point(null, null);
  var e = this.y.redSub(t.y);
  e.cmpn(0) !== 0 && (e = e.redMul(this.x.redSub(t.x).redInvm()));
  var r = e.redSqr().redISub(this.x).redISub(t.x), i = e.redMul(this.x.redSub(r)).redISub(this.y);
  return this.curve.point(r, i);
};
Zt.prototype.dbl = function() {
  if (this.inf)
    return this;
  var t = this.y.redAdd(this.y);
  if (t.cmpn(0) === 0)
    return this.curve.point(null, null);
  var e = this.curve.a, r = this.x.redSqr(), i = t.redInvm(), s = r.redAdd(r).redIAdd(r).redIAdd(e).redMul(i), o = s.redSqr().redISub(this.x.redAdd(this.x)), u = s.redMul(this.x.redSub(o)).redISub(this.y);
  return this.curve.point(o, u);
};
Zt.prototype.getX = function() {
  return this.x.fromRed();
};
Zt.prototype.getY = function() {
  return this.y.fromRed();
};
Zt.prototype.mul = function(t) {
  return t = new Y(t, 16), this.isInfinity() ? this : this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t]) : this.curve._wnafMul(this, t);
};
Zt.prototype.mulAdd = function(t, e, r) {
  var i = [this, e], s = [t, r];
  return this.curve.endo ? this.curve._endoWnafMulAdd(i, s) : this.curve._wnafMulAdd(1, i, s, 2);
};
Zt.prototype.jmulAdd = function(t, e, r) {
  var i = [this, e], s = [t, r];
  return this.curve.endo ? this.curve._endoWnafMulAdd(i, s, !0) : this.curve._wnafMulAdd(1, i, s, 2, !0);
};
Zt.prototype.eq = function(t) {
  return this === t || this.inf === t.inf && (this.inf || this.x.cmp(t.x) === 0 && this.y.cmp(t.y) === 0);
};
Zt.prototype.neg = function(t) {
  if (this.inf)
    return this;
  var e = this.curve.point(this.x, this.y.redNeg());
  if (t && this.precomputed) {
    var r = this.precomputed, i = function(s) {
      return s.neg();
    };
    e.precomputed = {
      naf: r.naf && {
        wnd: r.naf.wnd,
        points: r.naf.points.map(i)
      },
      doubles: r.doubles && {
        step: r.doubles.step,
        points: r.doubles.points.map(i)
      }
    };
  }
  return e;
};
Zt.prototype.toJ = function() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);
  var t = this.curve.jpoint(this.x, this.y, this.curve.one);
  return t;
};
function Qt(n, t, e, r) {
  Ar.BasePoint.call(this, n, "jacobian"), t === null && e === null && r === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new Y(0)) : (this.x = new Y(t, 16), this.y = new Y(e, 16), this.z = new Y(r, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
}
Fi(Qt, Ar.BasePoint);
ve.prototype.jpoint = function(t, e, r) {
  return new Qt(this, t, e, r);
};
Qt.prototype.toP = function() {
  if (this.isInfinity())
    return this.curve.point(null, null);
  var t = this.z.redInvm(), e = t.redSqr(), r = this.x.redMul(e), i = this.y.redMul(e).redMul(t);
  return this.curve.point(r, i);
};
Qt.prototype.neg = function() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};
Qt.prototype.add = function(t) {
  if (this.isInfinity())
    return t;
  if (t.isInfinity())
    return this;
  var e = t.z.redSqr(), r = this.z.redSqr(), i = this.x.redMul(e), s = t.x.redMul(r), o = this.y.redMul(e.redMul(t.z)), u = t.y.redMul(r.redMul(this.z)), l = i.redSub(s), d = o.redSub(u);
  if (l.cmpn(0) === 0)
    return d.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var g = l.redSqr(), w = g.redMul(l), A = i.redMul(g), P = d.redSqr().redIAdd(w).redISub(A).redISub(A), N = d.redMul(A.redISub(P)).redISub(o.redMul(w)), I = this.z.redMul(t.z).redMul(l);
  return this.curve.jpoint(P, N, I);
};
Qt.prototype.mixedAdd = function(t) {
  if (this.isInfinity())
    return t.toJ();
  if (t.isInfinity())
    return this;
  var e = this.z.redSqr(), r = this.x, i = t.x.redMul(e), s = this.y, o = t.y.redMul(e).redMul(this.z), u = r.redSub(i), l = s.redSub(o);
  if (u.cmpn(0) === 0)
    return l.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
  var d = u.redSqr(), g = d.redMul(u), w = r.redMul(d), A = l.redSqr().redIAdd(g).redISub(w).redISub(w), P = l.redMul(w.redISub(A)).redISub(s.redMul(g)), N = this.z.redMul(u);
  return this.curve.jpoint(A, P, N);
};
Qt.prototype.dblp = function(t) {
  if (t === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!t)
    return this.dbl();
  var e;
  if (this.curve.zeroA || this.curve.threeA) {
    var r = this;
    for (e = 0; e < t; e++)
      r = r.dbl();
    return r;
  }
  var i = this.curve.a, s = this.curve.tinv, o = this.x, u = this.y, l = this.z, d = l.redSqr().redSqr(), g = u.redAdd(u);
  for (e = 0; e < t; e++) {
    var w = o.redSqr(), A = g.redSqr(), P = A.redSqr(), N = w.redAdd(w).redIAdd(w).redIAdd(i.redMul(d)), I = o.redMul(A), H = N.redSqr().redISub(I.redAdd(I)), R = I.redISub(H), L = N.redMul(R);
    L = L.redIAdd(L).redISub(P);
    var j = g.redMul(l);
    e + 1 < t && (d = d.redMul(P)), o = H, l = j, g = L;
  }
  return this.curve.jpoint(o, g.redMul(s), l);
};
Qt.prototype.dbl = function() {
  return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
};
Qt.prototype._zeroDbl = function() {
  var t, e, r;
  if (this.zOne) {
    var i = this.x.redSqr(), s = this.y.redSqr(), o = s.redSqr(), u = this.x.redAdd(s).redSqr().redISub(i).redISub(o);
    u = u.redIAdd(u);
    var l = i.redAdd(i).redIAdd(i), d = l.redSqr().redISub(u).redISub(u), g = o.redIAdd(o);
    g = g.redIAdd(g), g = g.redIAdd(g), t = d, e = l.redMul(u.redISub(d)).redISub(g), r = this.y.redAdd(this.y);
  } else {
    var w = this.x.redSqr(), A = this.y.redSqr(), P = A.redSqr(), N = this.x.redAdd(A).redSqr().redISub(w).redISub(P);
    N = N.redIAdd(N);
    var I = w.redAdd(w).redIAdd(w), H = I.redSqr(), R = P.redIAdd(P);
    R = R.redIAdd(R), R = R.redIAdd(R), t = H.redISub(N).redISub(N), e = I.redMul(N.redISub(t)).redISub(R), r = this.y.redMul(this.z), r = r.redIAdd(r);
  }
  return this.curve.jpoint(t, e, r);
};
Qt.prototype._threeDbl = function() {
  var t, e, r;
  if (this.zOne) {
    var i = this.x.redSqr(), s = this.y.redSqr(), o = s.redSqr(), u = this.x.redAdd(s).redSqr().redISub(i).redISub(o);
    u = u.redIAdd(u);
    var l = i.redAdd(i).redIAdd(i).redIAdd(this.curve.a), d = l.redSqr().redISub(u).redISub(u);
    t = d;
    var g = o.redIAdd(o);
    g = g.redIAdd(g), g = g.redIAdd(g), e = l.redMul(u.redISub(d)).redISub(g), r = this.y.redAdd(this.y);
  } else {
    var w = this.z.redSqr(), A = this.y.redSqr(), P = this.x.redMul(A), N = this.x.redSub(w).redMul(this.x.redAdd(w));
    N = N.redAdd(N).redIAdd(N);
    var I = P.redIAdd(P);
    I = I.redIAdd(I);
    var H = I.redAdd(I);
    t = N.redSqr().redISub(H), r = this.y.redAdd(this.z).redSqr().redISub(A).redISub(w);
    var R = A.redSqr();
    R = R.redIAdd(R), R = R.redIAdd(R), R = R.redIAdd(R), e = N.redMul(I.redISub(t)).redISub(R);
  }
  return this.curve.jpoint(t, e, r);
};
Qt.prototype._dbl = function() {
  var t = this.curve.a, e = this.x, r = this.y, i = this.z, s = i.redSqr().redSqr(), o = e.redSqr(), u = r.redSqr(), l = o.redAdd(o).redIAdd(o).redIAdd(t.redMul(s)), d = e.redAdd(e);
  d = d.redIAdd(d);
  var g = d.redMul(u), w = l.redSqr().redISub(g.redAdd(g)), A = g.redISub(w), P = u.redSqr();
  P = P.redIAdd(P), P = P.redIAdd(P), P = P.redIAdd(P);
  var N = l.redMul(A).redISub(P), I = r.redAdd(r).redMul(i);
  return this.curve.jpoint(w, N, I);
};
Qt.prototype.trpl = function() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);
  var t = this.x.redSqr(), e = this.y.redSqr(), r = this.z.redSqr(), i = e.redSqr(), s = t.redAdd(t).redIAdd(t), o = s.redSqr(), u = this.x.redAdd(e).redSqr().redISub(t).redISub(i);
  u = u.redIAdd(u), u = u.redAdd(u).redIAdd(u), u = u.redISub(o);
  var l = u.redSqr(), d = i.redIAdd(i);
  d = d.redIAdd(d), d = d.redIAdd(d), d = d.redIAdd(d);
  var g = s.redIAdd(u).redSqr().redISub(o).redISub(l).redISub(d), w = e.redMul(g);
  w = w.redIAdd(w), w = w.redIAdd(w);
  var A = this.x.redMul(l).redISub(w);
  A = A.redIAdd(A), A = A.redIAdd(A);
  var P = this.y.redMul(g.redMul(d.redISub(g)).redISub(u.redMul(l)));
  P = P.redIAdd(P), P = P.redIAdd(P), P = P.redIAdd(P);
  var N = this.z.redAdd(u).redSqr().redISub(r).redISub(l);
  return this.curve.jpoint(A, P, N);
};
Qt.prototype.mul = function(t, e) {
  return t = new Y(t, e), this.curve._wnafMul(this, t);
};
Qt.prototype.eq = function(t) {
  if (t.type === "affine")
    return this.eq(t.toJ());
  if (this === t)
    return !0;
  var e = this.z.redSqr(), r = t.z.redSqr();
  if (this.x.redMul(r).redISub(t.x.redMul(e)).cmpn(0) !== 0)
    return !1;
  var i = e.redMul(this.z), s = r.redMul(t.z);
  return this.y.redMul(s).redISub(t.y.redMul(i)).cmpn(0) === 0;
};
Qt.prototype.eqXToP = function(t) {
  var e = this.z.redSqr(), r = t.toRed(this.curve.red).redMul(e);
  if (this.x.cmp(r) === 0)
    return !0;
  for (var i = t.clone(), s = this.curve.redN.redMul(e); ; ) {
    if (i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0)
      return !1;
    if (r.redIAdd(s), this.x.cmp(r) === 0)
      return !0;
  }
};
Qt.prototype.inspect = function() {
  return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
};
Qt.prototype.isInfinity = function() {
  return this.z.cmpn(0) === 0;
};
var yn = qr(function(n, t) {
  var e = t;
  e.base = Ar, e.short = Qu, e.mont = /*RicMoo:ethers:require(./mont)*/
  null, e.edwards = /*RicMoo:ethers:require(./edwards)*/
  null;
}), bn = qr(function(n, t) {
  var e = t, r = le.assert;
  function i(u) {
    u.type === "short" ? this.curve = new yn.short(u) : u.type === "edwards" ? this.curve = new yn.edwards(u) : this.curve = new yn.mont(u), this.g = this.curve.g, this.n = this.curve.n, this.hash = u.hash, r(this.g.validate(), "Invalid curve"), r(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
  }
  e.PresetCurve = i;
  function s(u, l) {
    Object.defineProperty(e, u, {
      configurable: !0,
      enumerable: !0,
      get: function() {
        var d = new i(l);
        return Object.defineProperty(e, u, {
          configurable: !0,
          enumerable: !0,
          value: d
        }), d;
      }
    });
  }
  s("p192", {
    type: "short",
    prime: "p192",
    p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
    b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
    n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
    hash: Ae.sha256,
    gRed: !1,
    g: [
      "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
      "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
    ]
  }), s("p224", {
    type: "short",
    prime: "p224",
    p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
    a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
    b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
    n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
    hash: Ae.sha256,
    gRed: !1,
    g: [
      "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
      "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
    ]
  }), s("p256", {
    type: "short",
    prime: null,
    p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
    a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
    b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
    n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
    hash: Ae.sha256,
    gRed: !1,
    g: [
      "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
      "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
    ]
  }), s("p384", {
    type: "short",
    prime: null,
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
    a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
    b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
    n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
    hash: Ae.sha384,
    gRed: !1,
    g: [
      "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
      "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
    ]
  }), s("p521", {
    type: "short",
    prime: null,
    p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
    a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
    b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
    n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
    hash: Ae.sha512,
    gRed: !1,
    g: [
      "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
      "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
    ]
  }), s("curve25519", {
    type: "mont",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "76d06",
    b: "1",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: Ae.sha256,
    gRed: !1,
    g: [
      "9"
    ]
  }), s("ed25519", {
    type: "edwards",
    prime: "p25519",
    p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
    a: "-1",
    c: "1",
    // -121665 * (121666^(-1)) (mod P)
    d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
    n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
    hash: Ae.sha256,
    gRed: !1,
    g: [
      "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
      // 4/5
      "6666666666666666666666666666666666666666666666666666666666666658"
    ]
  });
  var o;
  try {
    o = /*RicMoo:ethers:require(./precomputed/secp256k1)*/
    null.crash();
  } catch {
    o = void 0;
  }
  s("secp256k1", {
    type: "short",
    prime: "k256",
    p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
    a: "0",
    b: "7",
    n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
    h: "1",
    hash: Ae.sha256,
    // Precomputed endomorphism
    beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
    lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
    basis: [
      {
        a: "3086d221a7d46bcde86c90e49284eb15",
        b: "-e4437ed6010e88286f547fa90abfe4c3"
      },
      {
        a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
        b: "3086d221a7d46bcde86c90e49284eb15"
      }
    ],
    gRed: !1,
    g: [
      "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
      "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      o
    ]
  });
});
function nr(n) {
  if (!(this instanceof nr))
    return new nr(n);
  this.hash = n.hash, this.predResist = !!n.predResist, this.outLen = this.hash.outSize, this.minEntropy = n.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
  var t = _e.toArray(n.entropy, n.entropyEnc || "hex"), e = _e.toArray(n.nonce, n.nonceEnc || "hex"), r = _e.toArray(n.pers, n.persEnc || "hex");
  Li(
    t.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._init(t, e, r);
}
var ko = nr;
nr.prototype._init = function(t, e, r) {
  var i = t.concat(e).concat(r);
  this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
  for (var s = 0; s < this.V.length; s++)
    this.K[s] = 0, this.V[s] = 1;
  this._update(i), this._reseed = 1, this.reseedInterval = 281474976710656;
};
nr.prototype._hmac = function() {
  return new Ae.hmac(this.hash, this.K);
};
nr.prototype._update = function(t) {
  var e = this._hmac().update(this.V).update([0]);
  t && (e = e.update(t)), this.K = e.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest());
};
nr.prototype.reseed = function(t, e, r, i) {
  typeof e != "string" && (i = r, r = e, e = null), t = _e.toArray(t, e), r = _e.toArray(r, i), Li(
    t.length >= this.minEntropy / 8,
    "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
  ), this._update(t.concat(r || [])), this._reseed = 1;
};
nr.prototype.generate = function(t, e, r, i) {
  if (this._reseed > this.reseedInterval)
    throw new Error("Reseed is required");
  typeof e != "string" && (i = r, r = e, e = null), r && (r = _e.toArray(r, i || "hex"), this._update(r));
  for (var s = []; s.length < t; )
    this.V = this._hmac().update(this.V).digest(), s = s.concat(this.V);
  var o = s.slice(0, t);
  return this._update(r), this._reseed++, _e.encode(o, e);
};
var _i = le.assert;
function ne(n, t) {
  this.ec = n, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc);
}
var Ui = ne;
ne.fromPublic = function(t, e, r) {
  return e instanceof ne ? e : new ne(t, {
    pub: e,
    pubEnc: r
  });
};
ne.fromPrivate = function(t, e, r) {
  return e instanceof ne ? e : new ne(t, {
    priv: e,
    privEnc: r
  });
};
ne.prototype.validate = function() {
  var t = this.getPublic();
  return t.isInfinity() ? { result: !1, reason: "Invalid public key" } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" };
};
ne.prototype.getPublic = function(t, e) {
  return typeof t == "string" && (e = t, t = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), e ? this.pub.encode(e, t) : this.pub;
};
ne.prototype.getPrivate = function(t) {
  return t === "hex" ? this.priv.toString(16, 2) : this.priv;
};
ne.prototype._importPrivate = function(t, e) {
  this.priv = new Y(t, e || 16), this.priv = this.priv.umod(this.ec.curve.n);
};
ne.prototype._importPublic = function(t, e) {
  if (t.x || t.y) {
    this.ec.curve.type === "mont" ? _i(t.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && _i(t.x && t.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(t.x, t.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(t, e);
};
ne.prototype.derive = function(t) {
  return t.validate() || _i(t.validate(), "public point not validated"), t.mul(this.priv).getX();
};
ne.prototype.sign = function(t, e, r) {
  return this.ec.sign(t, this, e, r);
};
ne.prototype.verify = function(t, e) {
  return this.ec.verify(t, e, this);
};
ne.prototype.inspect = function() {
  return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
};
var th = le.assert;
function Ln(n, t) {
  if (n instanceof Ln)
    return n;
  this._importDER(n, t) || (th(n.r && n.s, "Signature without r or s"), this.r = new Y(n.r, 16), this.s = new Y(n.s, 16), n.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = n.recoveryParam);
}
var Fn = Ln;
function eh() {
  this.place = 0;
}
function ai(n, t) {
  var e = n[t.place++];
  if (!(e & 128))
    return e;
  var r = e & 15;
  if (r === 0 || r > 4)
    return !1;
  for (var i = 0, s = 0, o = t.place; s < r; s++, o++)
    i <<= 8, i |= n[o], i >>>= 0;
  return i <= 127 ? !1 : (t.place = o, i);
}
function ps(n) {
  for (var t = 0, e = n.length - 1; !n[t] && !(n[t + 1] & 128) && t < e; )
    t++;
  return t === 0 ? n : n.slice(t);
}
Ln.prototype._importDER = function(t, e) {
  t = le.toArray(t, e);
  var r = new eh();
  if (t[r.place++] !== 48)
    return !1;
  var i = ai(t, r);
  if (i === !1 || i + r.place !== t.length || t[r.place++] !== 2)
    return !1;
  var s = ai(t, r);
  if (s === !1)
    return !1;
  var o = t.slice(r.place, s + r.place);
  if (r.place += s, t[r.place++] !== 2)
    return !1;
  var u = ai(t, r);
  if (u === !1 || t.length !== u + r.place)
    return !1;
  var l = t.slice(r.place, u + r.place);
  if (o[0] === 0)
    if (o[1] & 128)
      o = o.slice(1);
    else
      return !1;
  if (l[0] === 0)
    if (l[1] & 128)
      l = l.slice(1);
    else
      return !1;
  return this.r = new Y(o), this.s = new Y(l), this.recoveryParam = null, !0;
};
function fi(n, t) {
  if (t < 128) {
    n.push(t);
    return;
  }
  var e = 1 + (Math.log(t) / Math.LN2 >>> 3);
  for (n.push(e | 128); --e; )
    n.push(t >>> (e << 3) & 255);
  n.push(t);
}
Ln.prototype.toDER = function(t) {
  var e = this.r.toArray(), r = this.s.toArray();
  for (e[0] & 128 && (e = [0].concat(e)), r[0] & 128 && (r = [0].concat(r)), e = ps(e), r = ps(r); !r[0] && !(r[1] & 128); )
    r = r.slice(1);
  var i = [2];
  fi(i, e.length), i = i.concat(e), i.push(2), fi(i, r.length);
  var s = i.concat(r), o = [48];
  return fi(o, s.length), o = o.concat(s), le.encode(o, t);
};
var rh = (
  /*RicMoo:ethers:require(brorand)*/
  function() {
    throw new Error("unsupported");
  }
), Ro = le.assert;
function me(n) {
  if (!(this instanceof me))
    return new me(n);
  typeof n == "string" && (Ro(
    Object.prototype.hasOwnProperty.call(bn, n),
    "Unknown curve " + n
  ), n = bn[n]), n instanceof bn.PresetCurve && (n = { curve: n }), this.curve = n.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = n.curve.g, this.g.precompute(n.curve.n.bitLength() + 1), this.hash = n.hash || n.curve.hash;
}
var nh = me;
me.prototype.keyPair = function(t) {
  return new Ui(this, t);
};
me.prototype.keyFromPrivate = function(t, e) {
  return Ui.fromPrivate(this, t, e);
};
me.prototype.keyFromPublic = function(t, e) {
  return Ui.fromPublic(this, t, e);
};
me.prototype.genKeyPair = function(t) {
  t || (t = {});
  for (var e = new ko({
    hash: this.hash,
    pers: t.pers,
    persEnc: t.persEnc || "utf8",
    entropy: t.entropy || rh(this.hash.hmacStrength),
    entropyEnc: t.entropy && t.entropyEnc || "utf8",
    nonce: this.n.toArray()
  }), r = this.n.byteLength(), i = this.n.sub(new Y(2)); ; ) {
    var s = new Y(e.generate(r));
    if (!(s.cmp(i) > 0))
      return s.iaddn(1), this.keyFromPrivate(s);
  }
};
me.prototype._truncateToN = function(t, e) {
  var r = t.byteLength() * 8 - this.n.bitLength();
  return r > 0 && (t = t.ushrn(r)), !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t;
};
me.prototype.sign = function(t, e, r, i) {
  typeof r == "object" && (i = r, r = null), i || (i = {}), e = this.keyFromPrivate(e, r), t = this._truncateToN(new Y(t, 16));
  for (var s = this.n.byteLength(), o = e.getPrivate().toArray("be", s), u = t.toArray("be", s), l = new ko({
    hash: this.hash,
    entropy: o,
    nonce: u,
    pers: i.pers,
    persEnc: i.persEnc || "utf8"
  }), d = this.n.sub(new Y(1)), g = 0; ; g++) {
    var w = i.k ? i.k(g) : new Y(l.generate(this.n.byteLength()));
    if (w = this._truncateToN(w, !0), !(w.cmpn(1) <= 0 || w.cmp(d) >= 0)) {
      var A = this.g.mul(w);
      if (!A.isInfinity()) {
        var P = A.getX(), N = P.umod(this.n);
        if (N.cmpn(0) !== 0) {
          var I = w.invm(this.n).mul(N.mul(e.getPrivate()).iadd(t));
          if (I = I.umod(this.n), I.cmpn(0) !== 0) {
            var H = (A.getY().isOdd() ? 1 : 0) | (P.cmp(N) !== 0 ? 2 : 0);
            return i.canonical && I.cmp(this.nh) > 0 && (I = this.n.sub(I), H ^= 1), new Fn({ r: N, s: I, recoveryParam: H });
          }
        }
      }
    }
  }
};
me.prototype.verify = function(t, e, r, i) {
  t = this._truncateToN(new Y(t, 16)), r = this.keyFromPublic(r, i), e = new Fn(e, "hex");
  var s = e.r, o = e.s;
  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0 || o.cmpn(1) < 0 || o.cmp(this.n) >= 0)
    return !1;
  var u = o.invm(this.n), l = u.mul(t).umod(this.n), d = u.mul(s).umod(this.n), g;
  return this.curve._maxwellTrick ? (g = this.g.jmulAdd(l, r.getPublic(), d), g.isInfinity() ? !1 : g.eqXToP(s)) : (g = this.g.mulAdd(l, r.getPublic(), d), g.isInfinity() ? !1 : g.getX().umod(this.n).cmp(s) === 0);
};
me.prototype.recoverPubKey = function(n, t, e, r) {
  Ro((3 & e) === e, "The recovery param is more than two bits"), t = new Fn(t, r);
  var i = this.n, s = new Y(n), o = t.r, u = t.s, l = e & 1, d = e >> 1;
  if (o.cmp(this.curve.p.umod(this.curve.n)) >= 0 && d)
    throw new Error("Unable to find sencond key candinate");
  d ? o = this.curve.pointFromX(o.add(this.curve.n), l) : o = this.curve.pointFromX(o, l);
  var g = t.r.invm(i), w = i.sub(s).mul(g).umod(i), A = u.mul(g).umod(i);
  return this.g.mulAdd(w, o, A);
};
me.prototype.getKeyRecoveryParam = function(n, t, e, r) {
  if (t = new Fn(t, r), t.recoveryParam !== null)
    return t.recoveryParam;
  for (var i = 0; i < 4; i++) {
    var s;
    try {
      s = this.recoverPubKey(n, t, i);
    } catch {
      continue;
    }
    if (s.eq(e))
      return i;
  }
  throw new Error("Unable to find valid recovery factor");
};
var ih = qr(function(n, t) {
  var e = t;
  e.version = "6.5.4", e.utils = le, e.rand = /*RicMoo:ethers:require(brorand)*/
  function() {
    throw new Error("unsupported");
  }, e.curve = yn, e.curves = bn, e.ec = nh, e.eddsa = /*RicMoo:ethers:require(./elliptic/eddsa)*/
  null;
}), sh = ih.ec;
const oh = "signing-key/5.6.1", Ei = new M(oh);
let ui = null;
function Ne() {
  return ui || (ui = new sh("secp256k1")), ui;
}
class ah {
  constructor(t) {
    C(this, "curve", "secp256k1"), C(this, "privateKey", G(t)), wr(this.privateKey) !== 32 && Ei.throwArgumentError("invalid private key", "privateKey", "[[ REDACTED ]]");
    const e = Ne().keyFromPrivate(V(this.privateKey));
    C(this, "publicKey", "0x" + e.getPublic(!1, "hex")), C(this, "compressedPublicKey", "0x" + e.getPublic(!0, "hex")), C(this, "_isSigningKey", !0);
  }
  _addPoint(t) {
    const e = Ne().keyFromPublic(V(this.publicKey)), r = Ne().keyFromPublic(V(t));
    return "0x" + e.pub.add(r.pub).encodeCompressed("hex");
  }
  signDigest(t) {
    const e = Ne().keyFromPrivate(V(this.privateKey)), r = V(t);
    r.length !== 32 && Ei.throwArgumentError("bad digest length", "digest", t);
    const i = e.sign(r, { canonical: !0 });
    return Tn({
      recoveryParam: i.recoveryParam,
      r: jt("0x" + i.r.toString(16), 32),
      s: jt("0x" + i.s.toString(16), 32)
    });
  }
  computeSharedSecret(t) {
    const e = Ne().keyFromPrivate(V(this.privateKey)), r = Ne().keyFromPublic(V(Io(t)));
    return jt("0x" + e.derive(r.getPublic()).toString(16), 32);
  }
  static isSigningKey(t) {
    return !!(t && t._isSigningKey);
  }
}
function fh(n, t) {
  const e = Tn(t), r = { r: V(e.r), s: V(e.s) };
  return "0x" + Ne().recoverPubKey(V(n), r, e.recoveryParam).encode("hex", !1);
}
function Io(n, t) {
  const e = V(n);
  if (e.length === 32) {
    const r = new ah(e);
    return t ? "0x" + Ne().keyFromPrivate(e).getPublic(!0, "hex") : r.publicKey;
  } else {
    if (e.length === 33)
      return t ? G(e) : "0x" + Ne().keyFromPublic(e).getPublic(!1, "hex");
    if (e.length === 65)
      return t ? "0x" + Ne().keyFromPublic(e).getPublic(!0, "hex") : G(e);
  }
  return Ei.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
}
const uh = "transactions/5.6.0", He = new M(uh);
var ms;
(function(n) {
  n[n.legacy = 0] = "legacy", n[n.eip2930 = 1] = "eip2930", n[n.eip1559 = 2] = "eip1559";
})(ms || (ms = {}));
function Di(n) {
  return n === "0x" ? null : Yt(n);
}
function re(n) {
  return n === "0x" ? Zs : U.from(n);
}
function hh(n) {
  const t = Io(n);
  return Yt(te(Wt(te(t, 1)), 12));
}
function To(n, t) {
  return hh(fh(V(n), t));
}
function ue(n, t) {
  const e = Cr(U.from(n).toHexString());
  return e.length > 32 && He.throwArgumentError("invalid length for " + t, "transaction:" + t, n), e;
}
function hi(n, t) {
  return {
    address: Yt(n),
    storageKeys: (t || []).map((e, r) => (wr(e) !== 32 && He.throwArgumentError("invalid access list storageKey", `accessList[${n}:${r}]`, e), e.toLowerCase()))
  };
}
function zr(n) {
  if (Array.isArray(n))
    return n.map((e, r) => Array.isArray(e) ? (e.length > 2 && He.throwArgumentError("access list expected to be [ address, storageKeys[] ]", `value[${r}]`, e), hi(e[0], e[1])) : hi(e.address, e.storageKeys));
  const t = Object.keys(n).map((e) => {
    const r = n[e].reduce((i, s) => (i[s] = !0, i), {});
    return hi(e, Object.keys(r).sort());
  });
  return t.sort((e, r) => e.address.localeCompare(r.address)), t;
}
function Co(n) {
  return zr(n).map((t) => [t.address, t.storageKeys]);
}
function lh(n, t) {
  if (n.gasPrice != null) {
    const r = U.from(n.gasPrice), i = U.from(n.maxFeePerGas || 0);
    r.eq(i) || He.throwArgumentError("mismatch EIP-1559 gasPrice != maxFeePerGas", "tx", {
      gasPrice: r,
      maxFeePerGas: i
    });
  }
  const e = [
    ue(n.chainId || 0, "chainId"),
    ue(n.nonce || 0, "nonce"),
    ue(n.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    ue(n.maxFeePerGas || 0, "maxFeePerGas"),
    ue(n.gasLimit || 0, "gasLimit"),
    n.to != null ? Yt(n.to) : "0x",
    ue(n.value || 0, "value"),
    n.data || "0x",
    Co(n.accessList || [])
  ];
  if (t) {
    const r = Tn(t);
    e.push(ue(r.recoveryParam, "recoveryParam")), e.push(Cr(r.r)), e.push(Cr(r.s));
  }
  return se(["0x02", Cn(e)]);
}
function ch(n, t) {
  const e = [
    ue(n.chainId || 0, "chainId"),
    ue(n.nonce || 0, "nonce"),
    ue(n.gasPrice || 0, "gasPrice"),
    ue(n.gasLimit || 0, "gasLimit"),
    n.to != null ? Yt(n.to) : "0x",
    ue(n.value || 0, "value"),
    n.data || "0x",
    Co(n.accessList || [])
  ];
  if (t) {
    const r = Tn(t);
    e.push(ue(r.recoveryParam, "recoveryParam")), e.push(Cr(r.r)), e.push(Cr(r.s));
  }
  return se(["0x01", Cn(e)]);
}
function Bo(n, t, e) {
  try {
    const r = re(t[0]).toNumber();
    if (r !== 0 && r !== 1)
      throw new Error("bad recid");
    n.v = r;
  } catch {
    He.throwArgumentError("invalid v for transaction type: 1", "v", t[0]);
  }
  n.r = jt(t[1], 32), n.s = jt(t[2], 32);
  try {
    const r = Wt(e(n));
    n.from = To(r, { r: n.r, s: n.s, recoveryParam: n.v });
  } catch (r) {
    console.log(r);
  }
}
function dh(n) {
  const t = Ii(n.slice(1));
  t.length !== 9 && t.length !== 12 && He.throwArgumentError("invalid component count for transaction type: 2", "payload", G(n));
  const e = re(t[2]), r = re(t[3]), i = {
    type: 2,
    chainId: re(t[0]).toNumber(),
    nonce: re(t[1]).toNumber(),
    maxPriorityFeePerGas: e,
    maxFeePerGas: r,
    gasPrice: null,
    gasLimit: re(t[4]),
    to: Di(t[5]),
    value: re(t[6]),
    data: t[7],
    accessList: zr(t[8])
  };
  return t.length === 9 || (i.hash = Wt(n), Bo(i, t.slice(9), lh)), i;
}
function ph(n) {
  const t = Ii(n.slice(1));
  t.length !== 8 && t.length !== 11 && He.throwArgumentError("invalid component count for transaction type: 1", "payload", G(n));
  const e = {
    type: 1,
    chainId: re(t[0]).toNumber(),
    nonce: re(t[1]).toNumber(),
    gasPrice: re(t[2]),
    gasLimit: re(t[3]),
    to: Di(t[4]),
    value: re(t[5]),
    data: t[6],
    accessList: zr(t[7])
  };
  return t.length === 8 || (e.hash = Wt(n), Bo(e, t.slice(8), ch)), e;
}
function mh(n) {
  const t = Ii(n);
  t.length !== 9 && t.length !== 6 && He.throwArgumentError("invalid raw transaction", "rawTransaction", n);
  const e = {
    nonce: re(t[0]).toNumber(),
    gasPrice: re(t[1]),
    gasLimit: re(t[2]),
    to: Di(t[3]),
    value: re(t[4]),
    data: t[5],
    chainId: 0
  };
  if (t.length === 6)
    return e;
  try {
    e.v = U.from(t[6]).toNumber();
  } catch (r) {
    return console.log(r), e;
  }
  if (e.r = jt(t[7], 32), e.s = jt(t[8], 32), U.from(e.r).isZero() && U.from(e.s).isZero())
    e.chainId = e.v, e.v = 0;
  else {
    e.chainId = Math.floor((e.v - 35) / 2), e.chainId < 0 && (e.chainId = 0);
    let r = e.v - 27;
    const i = t.slice(0, 6);
    e.chainId !== 0 && (i.push(G(e.chainId)), i.push("0x"), i.push("0x"), r -= e.chainId * 2 + 8);
    const s = Wt(Cn(i));
    try {
      e.from = To(s, { r: G(e.r), s: G(e.s), recoveryParam: r });
    } catch (o) {
      console.log(o);
    }
    e.hash = Wt(n);
  }
  return e.type = null, e;
}
function gh(n) {
  const t = V(n);
  if (t[0] > 127)
    return mh(t);
  switch (t[0]) {
    case 1:
      return ph(t);
    case 2:
      return dh(t);
  }
  return He.throwError(`unsupported transaction type: ${t[0]}`, M.errors.UNSUPPORTED_OPERATION, {
    operation: "parseTransaction",
    transactionType: t[0]
  });
}
const vh = "contracts/5.6.1";
var Er = function(n, t, e, r) {
  function i(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function u(g) {
      try {
        d(r.next(g));
      } catch (w) {
        o(w);
      }
    }
    function l(g) {
      try {
        d(r.throw(g));
      } catch (w) {
        o(w);
      }
    }
    function d(g) {
      g.done ? s(g.value) : i(g.value).then(u, l);
    }
    d((r = r.apply(n, t || [])).next());
  });
};
const Gt = new M(vh);
function Pn(n, t) {
  return Er(this, void 0, void 0, function* () {
    const e = yield t;
    typeof e != "string" && Gt.throwArgumentError("invalid address or ENS name", "name", e);
    try {
      return Yt(e);
    } catch {
    }
    n || Gt.throwError("a provider or signer is needed to resolve ENS names", M.errors.UNSUPPORTED_OPERATION, {
      operation: "resolveName"
    });
    const r = yield n.resolveName(e);
    return r == null && Gt.throwArgumentError("resolver or addr is not configured for ENS name", "name", e), r;
  });
}
function wn(n, t, e) {
  return Er(this, void 0, void 0, function* () {
    return Array.isArray(e) ? yield Promise.all(e.map((r, i) => wn(n, Array.isArray(t) ? t[i] : t[r.name], r))) : e.type === "address" ? yield Pn(n, t) : e.type === "tuple" ? yield wn(n, t, e.components) : e.baseType === "array" ? Array.isArray(t) ? yield Promise.all(t.map((r) => wn(n, r, e.arrayChildren))) : Promise.reject(Gt.makeError("invalid value for array", M.errors.INVALID_ARGUMENT, {
      argument: "value",
      value: t
    })) : t;
  });
}
function Un(n, t, e) {
  return Er(this, void 0, void 0, function* () {
    let r = {};
    e.length === t.inputs.length + 1 && typeof e[e.length - 1] == "object" && (r = Xt(e.pop())), Gt.checkArgumentCount(e.length, t.inputs.length, "passed to contract"), n.signer ? r.from ? r.from = Vt({
      override: Pn(n.signer, r.from),
      signer: n.signer.getAddress()
    }).then((d) => Er(this, void 0, void 0, function* () {
      return Yt(d.signer) !== d.override && Gt.throwError("Contract with a Signer cannot override from", M.errors.UNSUPPORTED_OPERATION, {
        operation: "overrides.from"
      }), d.override;
    })) : r.from = n.signer.getAddress() : r.from && (r.from = Pn(n.provider, r.from));
    const i = yield Vt({
      args: wn(n.signer || n.provider, e, t.inputs),
      address: n.resolvedAddress,
      overrides: Vt(r) || {}
    }), s = n.interface.encodeFunctionData(t, i.args), o = {
      data: s,
      to: i.address
    }, u = i.overrides;
    if (u.nonce != null && (o.nonce = U.from(u.nonce).toNumber()), u.gasLimit != null && (o.gasLimit = U.from(u.gasLimit)), u.gasPrice != null && (o.gasPrice = U.from(u.gasPrice)), u.maxFeePerGas != null && (o.maxFeePerGas = U.from(u.maxFeePerGas)), u.maxPriorityFeePerGas != null && (o.maxPriorityFeePerGas = U.from(u.maxPriorityFeePerGas)), u.from != null && (o.from = u.from), u.type != null && (o.type = u.type), u.accessList != null && (o.accessList = zr(u.accessList)), o.gasLimit == null && t.gas != null) {
      let d = 21e3;
      const g = V(s);
      for (let w = 0; w < g.length; w++)
        d += 4, g[w] && (d += 64);
      o.gasLimit = U.from(t.gas).add(d);
    }
    if (u.value) {
      const d = U.from(u.value);
      !d.isZero() && !t.payable && Gt.throwError("non-payable method cannot override value", M.errors.UNSUPPORTED_OPERATION, {
        operation: "overrides.value",
        value: r.value
      }), o.value = d;
    }
    u.customData && (o.customData = Xt(u.customData)), u.ccipReadEnabled && (o.ccipReadEnabled = !!u.ccipReadEnabled), delete r.nonce, delete r.gasLimit, delete r.gasPrice, delete r.from, delete r.value, delete r.type, delete r.accessList, delete r.maxFeePerGas, delete r.maxPriorityFeePerGas, delete r.customData, delete r.ccipReadEnabled;
    const l = Object.keys(r).filter((d) => r[d] != null);
    return l.length && Gt.throwError(`cannot override ${l.map((d) => JSON.stringify(d)).join(",")}`, M.errors.UNSUPPORTED_OPERATION, {
      operation: "overrides",
      overrides: l
    }), o;
  });
}
function yh(n, t) {
  return function(...e) {
    return Un(n, t, e);
  };
}
function bh(n, t) {
  const e = n.signer || n.provider;
  return function(...r) {
    return Er(this, void 0, void 0, function* () {
      e || Gt.throwError("estimate require a provider or signer", M.errors.UNSUPPORTED_OPERATION, {
        operation: "estimateGas"
      });
      const i = yield Un(n, t, r);
      return yield e.estimateGas(i);
    });
  };
}
function wh(n, t) {
  const e = t.wait.bind(t);
  t.wait = (r) => e(r).then((i) => (i.events = i.logs.map((s) => {
    let o = ze(s), u = null;
    try {
      u = n.interface.parseLog(s);
    } catch {
    }
    return u && (o.args = u.args, o.decode = (l, d) => n.interface.decodeEventLog(u.eventFragment, l, d), o.event = u.name, o.eventSignature = u.signature), o.removeListener = () => n.provider, o.getBlock = () => n.provider.getBlock(i.blockHash), o.getTransaction = () => n.provider.getTransaction(i.transactionHash), o.getTransactionReceipt = () => Promise.resolve(i), o;
  }), i));
}
function Oo(n, t, e) {
  const r = n.signer || n.provider;
  return function(...i) {
    return Er(this, void 0, void 0, function* () {
      let s;
      if (i.length === t.inputs.length + 1 && typeof i[i.length - 1] == "object") {
        const l = Xt(i.pop());
        l.blockTag != null && (s = yield l.blockTag), delete l.blockTag, i.push(l);
      }
      n.deployTransaction != null && (yield n._deployed(s));
      const o = yield Un(n, t, i), u = yield r.call(o, s);
      try {
        let l = n.interface.decodeFunctionResult(t, u);
        return e && t.outputs.length === 1 && (l = l[0]), l;
      } catch (l) {
        throw l.code === M.errors.CALL_EXCEPTION && (l.address = n.address, l.args = i, l.transaction = o), l;
      }
    });
  };
}
function xh(n, t) {
  return function(...e) {
    return Er(this, void 0, void 0, function* () {
      n.signer || Gt.throwError("sending a transaction requires a signer", M.errors.UNSUPPORTED_OPERATION, {
        operation: "sendTransaction"
      }), n.deployTransaction != null && (yield n._deployed());
      const r = yield Un(n, t, e), i = yield n.signer.sendTransaction(r);
      return wh(n, i), i;
    });
  };
}
function gs(n, t, e) {
  return t.constant ? Oo(n, t, e) : xh(n, t);
}
function Lo(n) {
  return n.address && (n.topics == null || n.topics.length === 0) ? "*" : (n.address || "*") + "@" + (n.topics ? n.topics.map((t) => Array.isArray(t) ? t.join("|") : t).join(":") : "");
}
class tn {
  constructor(t, e) {
    C(this, "tag", t), C(this, "filter", e), this._listeners = [];
  }
  addListener(t, e) {
    this._listeners.push({ listener: t, once: e });
  }
  removeListener(t) {
    let e = !1;
    this._listeners = this._listeners.filter((r) => e || r.listener !== t ? !0 : (e = !0, !1));
  }
  removeAllListeners() {
    this._listeners = [];
  }
  listeners() {
    return this._listeners.map((t) => t.listener);
  }
  listenerCount() {
    return this._listeners.length;
  }
  run(t) {
    const e = this.listenerCount();
    return this._listeners = this._listeners.filter((r) => {
      const i = t.slice();
      return setTimeout(() => {
        r.listener.apply(this, i);
      }, 0), !r.once;
    }), e;
  }
  prepareEvent(t) {
  }
  // Returns the array that will be applied to an emit
  getEmit(t) {
    return [t];
  }
}
class _h extends tn {
  constructor() {
    super("error", null);
  }
}
class vs extends tn {
  constructor(t, e, r, i) {
    const s = {
      address: t
    };
    let o = e.getEventTopic(r);
    i ? (o !== i[0] && Gt.throwArgumentError("topic mismatch", "topics", i), s.topics = i.slice()) : s.topics = [o], super(Lo(s), s), C(this, "address", t), C(this, "interface", e), C(this, "fragment", r);
  }
  prepareEvent(t) {
    super.prepareEvent(t), t.event = this.fragment.name, t.eventSignature = this.fragment.format(), t.decode = (e, r) => this.interface.decodeEventLog(this.fragment, e, r);
    try {
      t.args = this.interface.decodeEventLog(this.fragment, t.data, t.topics);
    } catch (e) {
      t.args = null, t.decodeError = e;
    }
  }
  getEmit(t) {
    const e = pa(t.args);
    if (e.length)
      throw e[0].error;
    const r = (t.args || []).slice();
    return r.push(t), r;
  }
}
class ys extends tn {
  constructor(t, e) {
    super("*", { address: t }), C(this, "address", t), C(this, "interface", e);
  }
  prepareEvent(t) {
    super.prepareEvent(t);
    try {
      const e = this.interface.parseLog(t);
      t.event = e.name, t.eventSignature = e.signature, t.decode = (r, i) => this.interface.decodeEventLog(e.eventFragment, r, i), t.args = e.args;
    } catch {
    }
  }
}
class Eh {
  constructor(t, e, r) {
    C(this, "interface", ke(new.target, "getInterface")(e)), r == null ? (C(this, "provider", null), C(this, "signer", null)) : on.isSigner(r) ? (C(this, "provider", r.provider || null), C(this, "signer", r)) : Bn.isProvider(r) ? (C(this, "provider", r), C(this, "signer", null)) : Gt.throwArgumentError("invalid signer or provider", "signerOrProvider", r), C(this, "callStatic", {}), C(this, "estimateGas", {}), C(this, "functions", {}), C(this, "populateTransaction", {}), C(this, "filters", {});
    {
      const o = {};
      Object.keys(this.interface.events).forEach((u) => {
        const l = this.interface.events[u];
        C(this.filters, u, (...d) => ({
          address: this.address,
          topics: this.interface.encodeFilterTopics(l, d)
        })), o[l.name] || (o[l.name] = []), o[l.name].push(u);
      }), Object.keys(o).forEach((u) => {
        const l = o[u];
        l.length === 1 ? C(this.filters, u, this.filters[l[0]]) : Gt.warn(`Duplicate definition of ${u} (${l.join(", ")})`);
      });
    }
    if (C(this, "_runningEvents", {}), C(this, "_wrappedEmits", {}), t == null && Gt.throwArgumentError("invalid contract address or ENS name", "addressOrName", t), C(this, "address", t), this.provider)
      C(this, "resolvedAddress", Pn(this.provider, t));
    else
      try {
        C(this, "resolvedAddress", Promise.resolve(Yt(t)));
      } catch {
        Gt.throwError("provider is required to use ENS name as contract address", M.errors.UNSUPPORTED_OPERATION, {
          operation: "new Contract"
        });
      }
    this.resolvedAddress.catch((o) => {
    });
    const i = {}, s = {};
    Object.keys(this.interface.functions).forEach((o) => {
      const u = this.interface.functions[o];
      if (s[o]) {
        Gt.warn(`Duplicate ABI entry for ${JSON.stringify(o)}`);
        return;
      }
      s[o] = !0;
      {
        const l = u.name;
        i[`%${l}`] || (i[`%${l}`] = []), i[`%${l}`].push(o);
      }
      this[o] == null && C(this, o, gs(this, u, !0)), this.functions[o] == null && C(this.functions, o, gs(this, u, !1)), this.callStatic[o] == null && C(this.callStatic, o, Oo(this, u, !0)), this.populateTransaction[o] == null && C(this.populateTransaction, o, yh(this, u)), this.estimateGas[o] == null && C(this.estimateGas, o, bh(this, u));
    }), Object.keys(i).forEach((o) => {
      const u = i[o];
      if (u.length > 1)
        return;
      o = o.substring(1);
      const l = u[0];
      try {
        this[o] == null && C(this, o, this[l]);
      } catch {
      }
      this.functions[o] == null && C(this.functions, o, this.functions[l]), this.callStatic[o] == null && C(this.callStatic, o, this.callStatic[l]), this.populateTransaction[o] == null && C(this.populateTransaction, o, this.populateTransaction[l]), this.estimateGas[o] == null && C(this.estimateGas, o, this.estimateGas[l]);
    });
  }
  static getContractAddress(t) {
    return Ws(t);
  }
  static getInterface(t) {
    return us.isInterface(t) ? t : new us(t);
  }
  // @TODO: Allow timeout?
  deployed() {
    return this._deployed();
  }
  _deployed(t) {
    return this._deployedPromise || (this.deployTransaction ? this._deployedPromise = this.deployTransaction.wait().then(() => this) : this._deployedPromise = this.provider.getCode(this.address, t).then((e) => (e === "0x" && Gt.throwError("contract not deployed", M.errors.UNSUPPORTED_OPERATION, {
      contractAddress: this.address,
      operation: "getDeployed"
    }), this))), this._deployedPromise;
  }
  // @TODO:
  // estimateFallback(overrides?: TransactionRequest): Promise<BigNumber>
  // @TODO:
  // estimateDeploy(bytecode: string, ...args): Promise<BigNumber>
  fallback(t) {
    this.signer || Gt.throwError("sending a transactions require a signer", M.errors.UNSUPPORTED_OPERATION, { operation: "sendTransaction(fallback)" });
    const e = Xt(t || {});
    return ["from", "to"].forEach(function(r) {
      e[r] != null && Gt.throwError("cannot override " + r, M.errors.UNSUPPORTED_OPERATION, { operation: r });
    }), e.to = this.resolvedAddress, this.deployed().then(() => this.signer.sendTransaction(e));
  }
  // Reconnect to a different signer or provider
  connect(t) {
    typeof t == "string" && (t = new Oi(t, this.provider));
    const e = new this.constructor(this.address, this.interface, t);
    return this.deployTransaction && C(e, "deployTransaction", this.deployTransaction), e;
  }
  // Re-attach to a different on-chain instance of this contract
  attach(t) {
    return new this.constructor(t, this.interface, this.signer || this.provider);
  }
  static isIndexed(t) {
    return yi.isIndexed(t);
  }
  _normalizeRunningEvent(t) {
    return this._runningEvents[t.tag] ? this._runningEvents[t.tag] : t;
  }
  _getRunningEvent(t) {
    if (typeof t == "string") {
      if (t === "error")
        return this._normalizeRunningEvent(new _h());
      if (t === "event")
        return this._normalizeRunningEvent(new tn("event", null));
      if (t === "*")
        return this._normalizeRunningEvent(new ys(this.address, this.interface));
      const e = this.interface.getEvent(t);
      return this._normalizeRunningEvent(new vs(this.address, this.interface, e));
    }
    if (t.topics && t.topics.length > 0) {
      try {
        const r = t.topics[0];
        if (typeof r != "string")
          throw new Error("invalid topic");
        const i = this.interface.getEvent(r);
        return this._normalizeRunningEvent(new vs(this.address, this.interface, i, t.topics));
      } catch {
      }
      const e = {
        address: this.address,
        topics: t.topics
      };
      return this._normalizeRunningEvent(new tn(Lo(e), e));
    }
    return this._normalizeRunningEvent(new ys(this.address, this.interface));
  }
  _checkRunningEvents(t) {
    if (t.listenerCount() === 0) {
      delete this._runningEvents[t.tag];
      const e = this._wrappedEmits[t.tag];
      e && t.filter && (this.provider.off(t.filter, e), delete this._wrappedEmits[t.tag]);
    }
  }
  // Subclasses can override this to gracefully recover
  // from parse errors if they wish
  _wrapEvent(t, e, r) {
    const i = ze(e);
    return i.removeListener = () => {
      r && (t.removeListener(r), this._checkRunningEvents(t));
    }, i.getBlock = () => this.provider.getBlock(e.blockHash), i.getTransaction = () => this.provider.getTransaction(e.transactionHash), i.getTransactionReceipt = () => this.provider.getTransactionReceipt(e.transactionHash), t.prepareEvent(i), i;
  }
  _addEventListener(t, e, r) {
    if (this.provider || Gt.throwError("events require a provider or a signer with a provider", M.errors.UNSUPPORTED_OPERATION, { operation: "once" }), t.addListener(e, r), this._runningEvents[t.tag] = t, !this._wrappedEmits[t.tag]) {
      const i = (s) => {
        let o = this._wrapEvent(t, s, e);
        if (o.decodeError == null)
          try {
            const u = t.getEmit(o);
            this.emit(t.filter, ...u);
          } catch (u) {
            o.decodeError = u.error;
          }
        t.filter != null && this.emit("event", o), o.decodeError != null && this.emit("error", o.decodeError, o);
      };
      this._wrappedEmits[t.tag] = i, t.filter != null && this.provider.on(t.filter, i);
    }
  }
  queryFilter(t, e, r) {
    const i = this._getRunningEvent(t), s = Xt(i.filter);
    return typeof e == "string" && at(e, 32) ? (r != null && Gt.throwArgumentError("cannot specify toBlock with blockhash", "toBlock", r), s.blockHash = e) : (s.fromBlock = e ?? 0, s.toBlock = r ?? "latest"), this.provider.getLogs(s).then((o) => o.map((u) => this._wrapEvent(i, u, null)));
  }
  on(t, e) {
    return this._addEventListener(this._getRunningEvent(t), e, !1), this;
  }
  once(t, e) {
    return this._addEventListener(this._getRunningEvent(t), e, !0), this;
  }
  emit(t, ...e) {
    if (!this.provider)
      return !1;
    const r = this._getRunningEvent(t), i = r.run(e) > 0;
    return this._checkRunningEvents(r), i;
  }
  listenerCount(t) {
    return this.provider ? t == null ? Object.keys(this._runningEvents).reduce((e, r) => e + this._runningEvents[r].listenerCount(), 0) : this._getRunningEvent(t).listenerCount() : 0;
  }
  listeners(t) {
    if (!this.provider)
      return [];
    if (t == null) {
      const e = [];
      for (let r in this._runningEvents)
        this._runningEvents[r].listeners().forEach((i) => {
          e.push(i);
        });
      return e;
    }
    return this._getRunningEvent(t).listeners();
  }
  removeAllListeners(t) {
    if (!this.provider)
      return this;
    if (t == null) {
      for (const r in this._runningEvents) {
        const i = this._runningEvents[r];
        i.removeAllListeners(), this._checkRunningEvents(i);
      }
      return this;
    }
    const e = this._getRunningEvent(t);
    return e.removeAllListeners(), this._checkRunningEvents(e), this;
  }
  off(t, e) {
    if (!this.provider)
      return this;
    const r = this._getRunningEvent(t);
    return r.removeListener(e), this._checkRunningEvents(r), this;
  }
  removeListener(t, e) {
    return this.off(t, e);
  }
}
class bs extends Eh {
}
class Fo {
  constructor(t) {
    C(this, "alphabet", t), C(this, "base", t.length), C(this, "_alphabetMap", {}), C(this, "_leader", t.charAt(0));
    for (let e = 0; e < t.length; e++)
      this._alphabetMap[t.charAt(e)] = e;
  }
  encode(t) {
    let e = V(t);
    if (e.length === 0)
      return "";
    let r = [0];
    for (let s = 0; s < e.length; ++s) {
      let o = e[s];
      for (let u = 0; u < r.length; ++u)
        o += r[u] << 8, r[u] = o % this.base, o = o / this.base | 0;
      for (; o > 0; )
        r.push(o % this.base), o = o / this.base | 0;
    }
    let i = "";
    for (let s = 0; e[s] === 0 && s < e.length - 1; ++s)
      i += this._leader;
    for (let s = r.length - 1; s >= 0; --s)
      i += this.alphabet[r[s]];
    return i;
  }
  decode(t) {
    if (typeof t != "string")
      throw new TypeError("Expected String");
    let e = [];
    if (t.length === 0)
      return new Uint8Array(e);
    e.push(0);
    for (let r = 0; r < t.length; r++) {
      let i = this._alphabetMap[t[r]];
      if (i === void 0)
        throw new Error("Non-base" + this.base + " character");
      let s = i;
      for (let o = 0; o < e.length; ++o)
        s += e[o] * this.base, e[o] = s & 255, s >>= 8;
      for (; s > 0; )
        e.push(s & 255), s >>= 8;
    }
    for (let r = 0; t[r] === this._leader && r < t.length - 1; ++r)
      e.push(0);
    return V(new Uint8Array(e.reverse()));
  }
}
new Fo("abcdefghijklmnopqrstuvwxyz234567");
const Ai = new Fo("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
function ws(n) {
  return "0x" + Ae.sha256().update(V(n)).digest("hex");
}
const Ah = "networks/5.6.2", xs = new M(Ah);
function Mh(n) {
  return n && typeof n.renetwork == "function";
}
function Ir(n) {
  const t = function(e, r) {
    r == null && (r = {});
    const i = [];
    if (e.InfuraProvider && r.infura !== "-")
      try {
        i.push(new e.InfuraProvider(n, r.infura));
      } catch {
      }
    if (e.EtherscanProvider && r.etherscan !== "-")
      try {
        i.push(new e.EtherscanProvider(n, r.etherscan));
      } catch {
      }
    if (e.AlchemyProvider && r.alchemy !== "-")
      try {
        i.push(new e.AlchemyProvider(n, r.alchemy));
      } catch {
      }
    if (e.PocketProvider && r.pocket !== "-") {
      const s = ["goerli", "ropsten", "rinkeby"];
      try {
        const o = new e.PocketProvider(n, r.pocket);
        o.network && s.indexOf(o.network.name) === -1 && i.push(o);
      } catch {
      }
    }
    if (e.CloudflareProvider && r.cloudflare !== "-")
      try {
        i.push(new e.CloudflareProvider(n));
      } catch {
      }
    if (e.AnkrProvider && r.ankr !== "-")
      try {
        i.push(new e.AnkrProvider(n, r.ankr));
      } catch {
      }
    if (i.length === 0)
      return null;
    if (e.FallbackProvider) {
      let s = 1;
      return r.quorum != null ? s = r.quorum : n === "homestead" && (s = 2), new e.FallbackProvider(i, s);
    }
    return i[0];
  };
  return t.renetwork = function(e) {
    return Ir(e);
  }, t;
}
function Sn(n, t) {
  const e = function(r, i) {
    return r.JsonRpcProvider ? new r.JsonRpcProvider(n, t) : null;
  };
  return e.renetwork = function(r) {
    return Sn(n, r);
  }, e;
}
const _s = {
  chainId: 1,
  ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  name: "homestead",
  _defaultProvider: Ir("homestead")
}, Es = {
  chainId: 3,
  ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  name: "ropsten",
  _defaultProvider: Ir("ropsten")
}, As = {
  chainId: 63,
  name: "classicMordor",
  _defaultProvider: Sn("https://www.ethercluster.com/mordor", "classicMordor")
}, dn = {
  unspecified: { chainId: 0, name: "unspecified" },
  homestead: _s,
  mainnet: _s,
  morden: { chainId: 2, name: "morden" },
  ropsten: Es,
  testnet: Es,
  rinkeby: {
    chainId: 4,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "rinkeby",
    _defaultProvider: Ir("rinkeby")
  },
  kovan: {
    chainId: 42,
    name: "kovan",
    _defaultProvider: Ir("kovan")
  },
  goerli: {
    chainId: 5,
    ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    name: "goerli",
    _defaultProvider: Ir("goerli")
  },
  kintsugi: { chainId: 1337702, name: "kintsugi" },
  // ETC (See: #351)
  classic: {
    chainId: 61,
    name: "classic",
    _defaultProvider: Sn("https://www.ethercluster.com/etc", "classic")
  },
  classicMorden: { chainId: 62, name: "classicMorden" },
  classicMordor: As,
  classicTestnet: As,
  classicKotti: {
    chainId: 6,
    name: "classicKotti",
    _defaultProvider: Sn("https://www.ethercluster.com/kotti", "classicKotti")
  },
  xdai: { chainId: 100, name: "xdai" },
  matic: { chainId: 137, name: "matic" },
  maticmum: { chainId: 80001, name: "maticmum" },
  optimism: { chainId: 10, name: "optimism" },
  "optimism-kovan": { chainId: 69, name: "optimism-kovan" },
  "optimism-goerli": { chainId: 420, name: "optimism-goerli" },
  arbitrum: { chainId: 42161, name: "arbitrum" },
  "arbitrum-rinkeby": { chainId: 421611, name: "arbitrum-rinkeby" },
  bnb: { chainId: 56, name: "bnb" },
  bnbt: { chainId: 97, name: "bnbt" }
};
function Nh(n) {
  if (n == null)
    return null;
  if (typeof n == "number") {
    for (const r in dn) {
      const i = dn[r];
      if (i.chainId === n)
        return {
          name: i.name,
          chainId: i.chainId,
          ensAddress: i.ensAddress || null,
          _defaultProvider: i._defaultProvider || null
        };
    }
    return {
      chainId: n,
      name: "unknown"
    };
  }
  if (typeof n == "string") {
    const r = dn[n];
    return r == null ? null : {
      name: r.name,
      chainId: r.chainId,
      ensAddress: r.ensAddress,
      _defaultProvider: r._defaultProvider || null
    };
  }
  const t = dn[n.name];
  if (!t)
    return typeof n.chainId != "number" && xs.throwArgumentError("invalid network chainId", "network", n), n;
  n.chainId !== 0 && n.chainId !== t.chainId && xs.throwArgumentError("network chainId mismatch", "network", n);
  let e = n._defaultProvider || null;
  return e == null && t._defaultProvider && (Mh(t._defaultProvider) ? e = t._defaultProvider.renetwork(n) : e = t._defaultProvider), {
    name: n.name,
    chainId: t.chainId,
    ensAddress: n.ensAddress || t.ensAddress || null,
    _defaultProvider: e
  };
}
function Ph(n) {
  n = atob(n);
  const t = [];
  for (let e = 0; e < n.length; e++)
    t.push(n.charCodeAt(e));
  return V(t);
}
function Sh(n) {
  n = V(n);
  let t = "";
  for (let e = 0; e < n.length; e++)
    t += String.fromCharCode(n[e]);
  return btoa(t);
}
const kh = "web/5.6.0";
var Rh = function(n, t, e, r) {
  function i(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function u(g) {
      try {
        d(r.next(g));
      } catch (w) {
        o(w);
      }
    }
    function l(g) {
      try {
        d(r.throw(g));
      } catch (w) {
        o(w);
      }
    }
    function d(g) {
      g.done ? s(g.value) : i(g.value).then(u, l);
    }
    d((r = r.apply(n, t || [])).next());
  });
};
function Ih(n, t) {
  return Rh(this, void 0, void 0, function* () {
    t == null && (t = {});
    const e = {
      method: t.method || "GET",
      headers: t.headers || {},
      body: t.body || void 0
    };
    t.skipFetchSetup !== !0 && (e.mode = "cors", e.cache = "no-cache", e.credentials = "same-origin", e.redirect = "follow", e.referrer = "client");
    const r = yield fetch(n, e), i = yield r.arrayBuffer(), s = {};
    return r.headers.forEach ? r.headers.forEach((o, u) => {
      s[u.toLowerCase()] = o;
    }) : r.headers.keys().forEach((o) => {
      s[o.toLowerCase()] = r.headers.get(o);
    }), {
      headers: s,
      statusCode: r.status,
      statusMessage: r.statusText,
      body: V(new Uint8Array(i))
    };
  });
}
var Th = function(n, t, e, r) {
  function i(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function u(g) {
      try {
        d(r.next(g));
      } catch (w) {
        o(w);
      }
    }
    function l(g) {
      try {
        d(r.throw(g));
      } catch (w) {
        o(w);
      }
    }
    function d(g) {
      g.done ? s(g.value) : i(g.value).then(u, l);
    }
    d((r = r.apply(n, t || [])).next());
  });
};
const we = new M(kh);
function Ms(n) {
  return new Promise((t) => {
    setTimeout(t, n);
  });
}
function er(n, t) {
  if (n == null)
    return null;
  if (typeof n == "string")
    return n;
  if (Si(n)) {
    if (t && (t.split("/")[0] === "text" || t.split(";")[0].trim() === "application/json"))
      try {
        return sn(n);
      } catch {
      }
    return G(n);
  }
  return n;
}
function Ch(n, t, e) {
  const r = typeof n == "object" && n.throttleLimit != null ? n.throttleLimit : 12;
  we.assertArgument(r > 0 && r % 1 === 0, "invalid connection throttle limit", "connection.throttleLimit", r);
  const i = typeof n == "object" ? n.throttleCallback : null, s = typeof n == "object" && typeof n.throttleSlotInterval == "number" ? n.throttleSlotInterval : 100;
  we.assertArgument(s > 0 && s % 1 === 0, "invalid connection throttle slot interval", "connection.throttleSlotInterval", s);
  const o = typeof n == "object" ? !!n.errorPassThrough : !1, u = {};
  let l = null;
  const d = {
    method: "GET"
  };
  let g = !1, w = 2 * 60 * 1e3;
  if (typeof n == "string")
    l = n;
  else if (typeof n == "object") {
    if ((n == null || n.url == null) && we.throwArgumentError("missing URL", "connection.url", n), l = n.url, typeof n.timeout == "number" && n.timeout > 0 && (w = n.timeout), n.headers)
      for (const R in n.headers)
        u[R.toLowerCase()] = { key: R, value: String(n.headers[R]) }, ["if-none-match", "if-modified-since"].indexOf(R.toLowerCase()) >= 0 && (g = !0);
    if (d.allowGzip = !!n.allowGzip, n.user != null && n.password != null) {
      l.substring(0, 6) !== "https:" && n.allowInsecureAuthentication !== !0 && we.throwError("basic authentication requires a secure https url", M.errors.INVALID_ARGUMENT, { argument: "url", url: l, user: n.user, password: "[REDACTED]" });
      const R = n.user + ":" + n.password;
      u.authorization = {
        key: "Authorization",
        value: "Basic " + Sh(Ce(R))
      };
    }
    n.skipFetchSetup != null && (d.skipFetchSetup = !!n.skipFetchSetup);
  }
  const A = new RegExp("^data:([a-z0-9-]+/[a-z0-9-]+);base64,(.*)$", "i"), P = l ? l.match(A) : null;
  if (P)
    try {
      const R = {
        statusCode: 200,
        statusMessage: "OK",
        headers: { "content-type": P[1] },
        body: Ph(P[2])
      };
      let L = R.body;
      return e && (L = e(R.body, R)), Promise.resolve(L);
    } catch (R) {
      we.throwError("processing response error", M.errors.SERVER_ERROR, {
        body: er(P[1], P[2]),
        error: R,
        requestBody: null,
        requestMethod: "GET",
        url: l
      });
    }
  t && (d.method = "POST", d.body = t, u["content-type"] == null && (u["content-type"] = { key: "Content-Type", value: "application/octet-stream" }), u["content-length"] == null && (u["content-length"] = { key: "Content-Length", value: String(t.length) }));
  const N = {};
  Object.keys(u).forEach((R) => {
    const L = u[R];
    N[L.key] = L.value;
  }), d.headers = N;
  const I = function() {
    let R = null;
    return { promise: new Promise(function(J, Q) {
      w && (R = setTimeout(() => {
        R != null && (R = null, Q(we.makeError("timeout", M.errors.TIMEOUT, {
          requestBody: er(d.body, N["content-type"]),
          requestMethod: d.method,
          timeout: w,
          url: l
        })));
      }, w));
    }), cancel: function() {
      R != null && (clearTimeout(R), R = null);
    } };
  }(), H = function() {
    return Th(this, void 0, void 0, function* () {
      for (let R = 0; R < r; R++) {
        let L = null;
        try {
          if (L = yield Ih(l, d), R < r) {
            if (L.statusCode === 301 || L.statusCode === 302) {
              const J = L.headers.location || "";
              if (d.method === "GET" && J.match(/^https:/)) {
                l = L.headers.location;
                continue;
              }
            } else if (L.statusCode === 429) {
              let J = !0;
              if (i && (J = yield i(R, l)), J) {
                let Q = 0;
                const ft = L.headers["retry-after"];
                typeof ft == "string" && ft.match(/^[1-9][0-9]*$/) ? Q = parseInt(ft) * 1e3 : Q = s * parseInt(String(Math.random() * Math.pow(2, R))), yield Ms(Q);
                continue;
              }
            }
          }
        } catch (J) {
          L = J.response, L == null && (I.cancel(), we.throwError("missing response", M.errors.SERVER_ERROR, {
            requestBody: er(d.body, N["content-type"]),
            requestMethod: d.method,
            serverError: J,
            url: l
          }));
        }
        let j = L.body;
        if (g && L.statusCode === 304 ? j = null : !o && (L.statusCode < 200 || L.statusCode >= 300) && (I.cancel(), we.throwError("bad response", M.errors.SERVER_ERROR, {
          status: L.statusCode,
          headers: L.headers,
          body: er(j, L.headers ? L.headers["content-type"] : null),
          requestBody: er(d.body, N["content-type"]),
          requestMethod: d.method,
          url: l
        })), e)
          try {
            const J = yield e(j, L);
            return I.cancel(), J;
          } catch (J) {
            if (J.throttleRetry && R < r) {
              let Q = !0;
              if (i && (Q = yield i(R, l)), Q) {
                const ft = s * parseInt(String(Math.random() * Math.pow(2, R)));
                yield Ms(ft);
                continue;
              }
            }
            I.cancel(), we.throwError("processing response error", M.errors.SERVER_ERROR, {
              body: er(j, L.headers ? L.headers["content-type"] : null),
              error: J,
              requestBody: er(d.body, N["content-type"]),
              requestMethod: d.method,
              url: l
            });
          }
        return I.cancel(), j;
      }
      return we.throwError("failed response", M.errors.SERVER_ERROR, {
        requestBody: er(d.body, N["content-type"]),
        requestMethod: d.method,
        url: l
      });
    });
  }();
  return Promise.race([I.promise, H]);
}
function $i(n, t, e) {
  let r = (s, o) => {
    let u = null;
    if (s != null)
      try {
        u = JSON.parse(sn(s));
      } catch (l) {
        we.throwError("invalid JSON", M.errors.SERVER_ERROR, {
          body: s,
          error: l
        });
      }
    return e && (u = e(u, o)), u;
  }, i = null;
  if (t != null) {
    i = Ce(t);
    const s = typeof n == "string" ? { url: n } : Xt(n);
    s.headers ? Object.keys(s.headers).filter((u) => u.toLowerCase() === "content-type").length !== 0 || (s.headers = Xt(s.headers), s.headers["content-type"] = "application/json") : s.headers = { "content-type": "application/json" }, n = s;
  }
  return Ch(n, i, r);
}
function Kr(n, t) {
  return t || (t = {}), t = Xt(t), t.floor == null && (t.floor = 0), t.ceiling == null && (t.ceiling = 1e4), t.interval == null && (t.interval = 250), new Promise(function(e, r) {
    let i = null, s = !1;
    const o = () => s ? !1 : (s = !0, i && clearTimeout(i), !0);
    t.timeout && (i = setTimeout(() => {
      o() && r(new Error("timeout"));
    }, t.timeout));
    const u = t.retryLimit;
    let l = 0;
    function d() {
      return n().then(function(g) {
        if (g !== void 0)
          o() && e(g);
        else if (t.oncePoll)
          t.oncePoll.once("poll", d);
        else if (t.onceBlock)
          t.onceBlock.once("block", d);
        else if (!s) {
          if (l++, l > u) {
            o() && r(new Error("retry limit reached"));
            return;
          }
          let w = t.interval * parseInt(String(Math.random() * Math.pow(2, l)));
          w < t.floor && (w = t.floor), w > t.ceiling && (w = t.ceiling), setTimeout(d, w);
        }
        return null;
      }, function(g) {
        o() && r(g);
      });
    }
    d();
  });
}
var kn = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", Mi = {};
for (var pn = 0; pn < kn.length; pn++) {
  var li = kn.charAt(pn);
  if (Mi[li] !== void 0)
    throw new TypeError(li + " is ambiguous");
  Mi[li] = pn;
}
function Tr(n) {
  var t = n >> 25;
  return (n & 33554431) << 5 ^ -(t >> 0 & 1) & 996825010 ^ -(t >> 1 & 1) & 642813549 ^ -(t >> 2 & 1) & 513874426 ^ -(t >> 3 & 1) & 1027748829 ^ -(t >> 4 & 1) & 705979059;
}
function Uo(n) {
  for (var t = 1, e = 0; e < n.length; ++e) {
    var r = n.charCodeAt(e);
    if (r < 33 || r > 126)
      return "Invalid prefix (" + n + ")";
    t = Tr(t) ^ r >> 5;
  }
  for (t = Tr(t), e = 0; e < n.length; ++e) {
    var i = n.charCodeAt(e);
    t = Tr(t) ^ i & 31;
  }
  return t;
}
function Bh(n, t, e) {
  if (e = e || 90, n.length + 7 + t.length > e)
    throw new TypeError("Exceeds length limit");
  n = n.toLowerCase();
  var r = Uo(n);
  if (typeof r == "string")
    throw new Error(r);
  for (var i = n + "1", s = 0; s < t.length; ++s) {
    var o = t[s];
    if (o >> 5)
      throw new Error("Non 5-bit word");
    r = Tr(r) ^ o, i += kn.charAt(o);
  }
  for (s = 0; s < 6; ++s)
    r = Tr(r);
  for (r ^= 1, s = 0; s < 6; ++s) {
    var u = r >> (5 - s) * 5 & 31;
    i += kn.charAt(u);
  }
  return i;
}
function Do(n, t) {
  if (t = t || 90, n.length < 8)
    return n + " too short";
  if (n.length > t)
    return "Exceeds length limit";
  var e = n.toLowerCase(), r = n.toUpperCase();
  if (n !== e && n !== r)
    return "Mixed-case string " + n;
  n = e;
  var i = n.lastIndexOf("1");
  if (i === -1)
    return "No separator character for " + n;
  if (i === 0)
    return "Missing prefix for " + n;
  var s = n.slice(0, i), o = n.slice(i + 1);
  if (o.length < 6)
    return "Data too short";
  var u = Uo(s);
  if (typeof u == "string")
    return u;
  for (var l = [], d = 0; d < o.length; ++d) {
    var g = o.charAt(d), w = Mi[g];
    if (w === void 0)
      return "Unknown character " + g;
    u = Tr(u) ^ w, !(d + 6 >= o.length) && l.push(w);
  }
  return u !== 1 ? "Invalid checksum for " + n : { prefix: s, words: l };
}
function Oh() {
  var n = Do.apply(null, arguments);
  if (typeof n == "object")
    return n;
}
function Lh(n) {
  var t = Do.apply(null, arguments);
  if (typeof t == "object")
    return t;
  throw new Error(t);
}
function Dn(n, t, e, r) {
  for (var i = 0, s = 0, o = (1 << e) - 1, u = [], l = 0; l < n.length; ++l)
    for (i = i << t | n[l], s += t; s >= e; )
      s -= e, u.push(i >> s & o);
  if (r)
    s > 0 && u.push(i << e - s & o);
  else {
    if (s >= t)
      return "Excess padding";
    if (i << e - s & o)
      return "Non-zero padding";
  }
  return u;
}
function Fh(n) {
  var t = Dn(n, 8, 5, !0);
  if (Array.isArray(t))
    return t;
}
function Uh(n) {
  var t = Dn(n, 8, 5, !0);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
function Dh(n) {
  var t = Dn(n, 5, 8, !1);
  if (Array.isArray(t))
    return t;
}
function $h(n) {
  var t = Dn(n, 5, 8, !1);
  if (Array.isArray(t))
    return t;
  throw new Error(t);
}
var qh = {
  decodeUnsafe: Oh,
  decode: Lh,
  encode: Bh,
  toWordsUnsafe: Fh,
  toWords: Uh,
  fromWordsUnsafe: Dh,
  fromWords: $h
};
const Ns = /* @__PURE__ */ Rn(qh), $n = "providers/5.6.6", Vr = new M($n);
class $ {
  constructor() {
    this.formats = this.getDefaultFormats();
  }
  getDefaultFormats() {
    const t = {}, e = this.address.bind(this), r = this.bigNumber.bind(this), i = this.blockTag.bind(this), s = this.data.bind(this), o = this.hash.bind(this), u = this.hex.bind(this), l = this.number.bind(this), d = this.type.bind(this), g = (w) => this.data(w, !0);
    return t.transaction = {
      hash: o,
      type: d,
      accessList: $.allowNull(this.accessList.bind(this), null),
      blockHash: $.allowNull(o, null),
      blockNumber: $.allowNull(l, null),
      transactionIndex: $.allowNull(l, null),
      confirmations: $.allowNull(l, null),
      from: e,
      // either (gasPrice) or (maxPriorityFeePerGas + maxFeePerGas)
      // must be set
      gasPrice: $.allowNull(r),
      maxPriorityFeePerGas: $.allowNull(r),
      maxFeePerGas: $.allowNull(r),
      gasLimit: r,
      to: $.allowNull(e, null),
      value: r,
      nonce: l,
      data: s,
      r: $.allowNull(this.uint256),
      s: $.allowNull(this.uint256),
      v: $.allowNull(l),
      creates: $.allowNull(e, null),
      raw: $.allowNull(s)
    }, t.transactionRequest = {
      from: $.allowNull(e),
      nonce: $.allowNull(l),
      gasLimit: $.allowNull(r),
      gasPrice: $.allowNull(r),
      maxPriorityFeePerGas: $.allowNull(r),
      maxFeePerGas: $.allowNull(r),
      to: $.allowNull(e),
      value: $.allowNull(r),
      data: $.allowNull(g),
      type: $.allowNull(l),
      accessList: $.allowNull(this.accessList.bind(this), null)
    }, t.receiptLog = {
      transactionIndex: l,
      blockNumber: l,
      transactionHash: o,
      address: e,
      topics: $.arrayOf(o),
      data: s,
      logIndex: l,
      blockHash: o
    }, t.receipt = {
      to: $.allowNull(this.address, null),
      from: $.allowNull(this.address, null),
      contractAddress: $.allowNull(e, null),
      transactionIndex: l,
      // should be allowNull(hash), but broken-EIP-658 support is handled in receipt
      root: $.allowNull(u),
      gasUsed: r,
      logsBloom: $.allowNull(s),
      blockHash: o,
      transactionHash: o,
      logs: $.arrayOf(this.receiptLog.bind(this)),
      blockNumber: l,
      confirmations: $.allowNull(l, null),
      cumulativeGasUsed: r,
      effectiveGasPrice: $.allowNull(r),
      status: $.allowNull(l),
      type: d
    }, t.block = {
      hash: $.allowNull(o),
      parentHash: o,
      number: l,
      timestamp: l,
      nonce: $.allowNull(u),
      difficulty: this.difficulty.bind(this),
      gasLimit: r,
      gasUsed: r,
      miner: $.allowNull(e),
      extraData: s,
      transactions: $.allowNull($.arrayOf(o)),
      baseFeePerGas: $.allowNull(r)
    }, t.blockWithTransactions = Xt(t.block), t.blockWithTransactions.transactions = $.allowNull($.arrayOf(this.transactionResponse.bind(this))), t.filter = {
      fromBlock: $.allowNull(i, void 0),
      toBlock: $.allowNull(i, void 0),
      blockHash: $.allowNull(o, void 0),
      address: $.allowNull(e, void 0),
      topics: $.allowNull(this.topics.bind(this), void 0)
    }, t.filterLog = {
      blockNumber: $.allowNull(l),
      blockHash: $.allowNull(o),
      transactionIndex: l,
      removed: $.allowNull(this.boolean.bind(this)),
      address: e,
      data: $.allowFalsish(s, "0x"),
      topics: $.arrayOf(o),
      transactionHash: o,
      logIndex: l
    }, t;
  }
  accessList(t) {
    return zr(t || []);
  }
  // Requires a BigNumberish that is within the IEEE754 safe integer range; returns a number
  // Strict! Used on input.
  number(t) {
    return t === "0x" ? 0 : U.from(t).toNumber();
  }
  type(t) {
    return t === "0x" || t == null ? 0 : U.from(t).toNumber();
  }
  // Strict! Used on input.
  bigNumber(t) {
    return U.from(t);
  }
  // Requires a boolean, "true" or  "false"; returns a boolean
  boolean(t) {
    if (typeof t == "boolean")
      return t;
    if (typeof t == "string") {
      if (t = t.toLowerCase(), t === "true")
        return !0;
      if (t === "false")
        return !1;
    }
    throw new Error("invalid boolean - " + t);
  }
  hex(t, e) {
    return typeof t == "string" && (!e && t.substring(0, 2) !== "0x" && (t = "0x" + t), at(t)) ? t.toLowerCase() : Vr.throwArgumentError("invalid hash", "value", t);
  }
  data(t, e) {
    const r = this.hex(t, e);
    if (r.length % 2 !== 0)
      throw new Error("invalid data; odd-length - " + t);
    return r;
  }
  // Requires an address
  // Strict! Used on input.
  address(t) {
    return Yt(t);
  }
  callAddress(t) {
    if (!at(t, 32))
      return null;
    const e = Yt(te(t, 12));
    return e === ka ? null : e;
  }
  contractAddress(t) {
    return Ws(t);
  }
  // Strict! Used on input.
  blockTag(t) {
    if (t == null)
      return "latest";
    if (t === "earliest")
      return "0x0";
    if (t === "latest" || t === "pending")
      return t;
    if (typeof t == "number" || at(t))
      return ki(t);
    throw new Error("invalid blockTag");
  }
  // Requires a hash, optionally requires 0x prefix; returns prefixed lowercase hash.
  hash(t, e) {
    const r = this.hex(t, e);
    return wr(r) !== 32 ? Vr.throwArgumentError("invalid hash", "value", t) : r;
  }
  // Returns the difficulty as a number, or if too large (i.e. PoA network) null
  difficulty(t) {
    if (t == null)
      return null;
    const e = U.from(t);
    try {
      return e.toNumber();
    } catch {
    }
    return null;
  }
  uint256(t) {
    if (!at(t))
      throw new Error("invalid uint256");
    return jt(t, 32);
  }
  _block(t, e) {
    t.author != null && t.miner == null && (t.miner = t.author);
    const r = t._difficulty != null ? t._difficulty : t.difficulty, i = $.check(e, t);
    return i._difficulty = r == null ? null : U.from(r), i;
  }
  block(t) {
    return this._block(t, this.formats.block);
  }
  blockWithTransactions(t) {
    return this._block(t, this.formats.blockWithTransactions);
  }
  // Strict! Used on input.
  transactionRequest(t) {
    return $.check(this.formats.transactionRequest, t);
  }
  transactionResponse(t) {
    t.gas != null && t.gasLimit == null && (t.gasLimit = t.gas), t.to && U.from(t.to).isZero() && (t.to = "0x0000000000000000000000000000000000000000"), t.input != null && t.data == null && (t.data = t.input), t.to == null && t.creates == null && (t.creates = this.contractAddress(t)), (t.type === 1 || t.type === 2) && t.accessList == null && (t.accessList = []);
    const e = $.check(this.formats.transaction, t);
    if (t.chainId != null) {
      let r = t.chainId;
      at(r) && (r = U.from(r).toNumber()), e.chainId = r;
    } else {
      let r = t.networkId;
      r == null && e.v == null && (r = t.chainId), at(r) && (r = U.from(r).toNumber()), typeof r != "number" && e.v != null && (r = (e.v - 35) / 2, r < 0 && (r = 0), r = parseInt(r)), typeof r != "number" && (r = 0), e.chainId = r;
    }
    return e.blockHash && e.blockHash.replace(/0/g, "") === "x" && (e.blockHash = null), e;
  }
  transaction(t) {
    return gh(t);
  }
  receiptLog(t) {
    return $.check(this.formats.receiptLog, t);
  }
  receipt(t) {
    const e = $.check(this.formats.receipt, t);
    if (e.root != null)
      if (e.root.length <= 4) {
        const r = U.from(e.root).toNumber();
        r === 0 || r === 1 ? (e.status != null && e.status !== r && Vr.throwArgumentError("alt-root-status/status mismatch", "value", { root: e.root, status: e.status }), e.status = r, delete e.root) : Vr.throwArgumentError("invalid alt-root-status", "value.root", e.root);
      } else
        e.root.length !== 66 && Vr.throwArgumentError("invalid root hash", "value.root", e.root);
    return e.status != null && (e.byzantium = !0), e;
  }
  topics(t) {
    return Array.isArray(t) ? t.map((e) => this.topics(e)) : t != null ? this.hash(t, !0) : null;
  }
  filter(t) {
    return $.check(this.formats.filter, t);
  }
  filterLog(t) {
    return $.check(this.formats.filterLog, t);
  }
  static check(t, e) {
    const r = {};
    for (const i in t)
      try {
        const s = t[i](e[i]);
        s !== void 0 && (r[i] = s);
      } catch (s) {
        throw s.checkKey = i, s.checkValue = e[i], s;
      }
    return r;
  }
  // if value is null-ish, nullValue is returned
  static allowNull(t, e) {
    return function(r) {
      return r == null ? e : t(r);
    };
  }
  // If value is false-ish, replaceValue is returned
  static allowFalsish(t, e) {
    return function(r) {
      return r ? t(r) : e;
    };
  }
  // Requires an Array satisfying check
  static arrayOf(t) {
    return function(e) {
      if (!Array.isArray(e))
        throw new Error("not an array");
      const r = [];
      return e.forEach(function(i) {
        r.push(t(i));
      }), r;
    };
  }
}
var X = function(n, t, e, r) {
  function i(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function u(g) {
      try {
        d(r.next(g));
      } catch (w) {
        o(w);
      }
    }
    function l(g) {
      try {
        d(r.throw(g));
      } catch (w) {
        o(w);
      }
    }
    function d(g) {
      g.done ? s(g.value) : i(g.value).then(u, l);
    }
    d((r = r.apply(n, t || [])).next());
  });
};
const et = new M($n), zh = 10;
function Ps(n) {
  return n == null ? "null" : (wr(n) !== 32 && et.throwArgumentError("invalid topic", "topic", n), n.toLowerCase());
}
function Ss(n) {
  for (n = n.slice(); n.length > 0 && n[n.length - 1] == null; )
    n.pop();
  return n.map((t) => {
    if (Array.isArray(t)) {
      const e = {};
      t.forEach((i) => {
        e[Ps(i)] = !0;
      });
      const r = Object.keys(e);
      return r.sort(), r.join("|");
    } else
      return Ps(t);
  }).join("&");
}
function Gh(n) {
  return n === "" ? [] : n.split(/&/g).map((t) => {
    if (t === "")
      return [];
    const e = t.split("|").map((r) => r === "null" ? null : r);
    return e.length === 1 ? e[0] : e;
  });
}
function Mr(n) {
  if (typeof n == "string") {
    if (n = n.toLowerCase(), wr(n) === 32)
      return "tx:" + n;
    if (n.indexOf(":") === -1)
      return n;
  } else {
    if (Array.isArray(n))
      return "filter:*:" + Ss(n);
    if (bf.isForkEvent(n))
      throw et.warn("not implemented"), new Error("not implemented");
    if (n && typeof n == "object")
      return "filter:" + (n.address || "*") + ":" + Ss(n.topics || []);
  }
  throw new Error("invalid event - " + n);
}
function Hr() {
  return (/* @__PURE__ */ new Date()).getTime();
}
function ks(n) {
  return new Promise((t) => {
    setTimeout(t, n);
  });
}
const jh = ["block", "network", "pending", "poll"];
class Vh {
  constructor(t, e, r) {
    C(this, "tag", t), C(this, "listener", e), C(this, "once", r), this._lastBlockNumber = -2, this._inflight = !1;
  }
  get event() {
    switch (this.type) {
      case "tx":
        return this.hash;
      case "filter":
        return this.filter;
    }
    return this.tag;
  }
  get type() {
    return this.tag.split(":")[0];
  }
  get hash() {
    const t = this.tag.split(":");
    return t[0] !== "tx" ? null : t[1];
  }
  get filter() {
    const t = this.tag.split(":");
    if (t[0] !== "filter")
      return null;
    const e = t[1], r = Gh(t[2]), i = {};
    return r.length > 0 && (i.topics = r), e && e !== "*" && (i.address = e), i;
  }
  pollable() {
    return this.tag.indexOf(":") >= 0 || jh.indexOf(this.tag) >= 0;
  }
}
const Hh = {
  0: { symbol: "btc", p2pkh: 0, p2sh: 5, prefix: "bc" },
  2: { symbol: "ltc", p2pkh: 48, p2sh: 50, prefix: "ltc" },
  3: { symbol: "doge", p2pkh: 30, p2sh: 22 },
  60: { symbol: "eth", ilk: "eth" },
  61: { symbol: "etc", ilk: "eth" },
  700: { symbol: "xdai", ilk: "eth" }
};
function ci(n) {
  return jt(U.from(n).toHexString(), 32);
}
function Rs(n) {
  return Ai.encode(he([n, te(ws(ws(n)), 0, 4)]));
}
const $o = new RegExp("^(ipfs)://(.*)$", "i"), Is = [
  new RegExp("^(https)://(.*)$", "i"),
  new RegExp("^(data):(.*)$", "i"),
  $o,
  new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i")
];
function xn(n, t) {
  try {
    return sn(en(n, t));
  } catch {
  }
  return null;
}
function en(n, t) {
  if (n === "0x")
    return null;
  const e = U.from(te(n, t, t + 32)).toNumber(), r = U.from(te(n, e, e + 32)).toNumber();
  return te(n, e + 32, e + 32 + r);
}
function di(n) {
  return n.match(/^ipfs:\/\/ipfs\//i) ? n = n.substring(12) : n.match(/^ipfs:\/\//i) ? n = n.substring(7) : et.throwArgumentError("unsupported IPFS format", "link", n), `https://gateway.ipfs.io/ipfs/${n}`;
}
function Ts(n) {
  const t = V(n);
  if (t.length > 32)
    throw new Error("internal; should not happen");
  const e = new Uint8Array(32);
  return e.set(t, 32 - t.length), e;
}
function Wh(n) {
  if (n.length % 32 === 0)
    return n;
  const t = new Uint8Array(Math.ceil(n.length / 32) * 32);
  return t.set(n), t;
}
function qo(n) {
  const t = [];
  let e = 0;
  for (let r = 0; r < n.length; r++)
    t.push(null), e += 32;
  for (let r = 0; r < n.length; r++) {
    const i = V(n[r]);
    t[r] = Ts(e), t.push(Ts(i.length)), t.push(Wh(i)), e += 32 + Math.ceil(i.length / 32) * 32;
  }
  return se(t);
}
class Cs {
  // The resolvedAddress is only for creating a ReverseLookup resolver
  constructor(t, e, r, i) {
    C(this, "provider", t), C(this, "name", r), C(this, "address", t.formatter.address(e)), C(this, "_resolvedAddress", i);
  }
  supportsWildcard() {
    return this._supportsEip2544 || (this._supportsEip2544 = this.provider.call({
      to: this.address,
      data: "0x01ffc9a79061b92300000000000000000000000000000000000000000000000000000000"
    }).then((t) => U.from(t).eq(1)).catch((t) => {
      if (t.code === M.errors.CALL_EXCEPTION)
        return !1;
      throw this._supportsEip2544 = null, t;
    })), this._supportsEip2544;
  }
  _fetch(t, e) {
    return X(this, void 0, void 0, function* () {
      const r = {
        to: this.address,
        ccipReadEnabled: !0,
        data: se([t, vn(this.name), e || "0x"])
      };
      let i = !1;
      (yield this.supportsWildcard()) && (i = !0, r.data = se(["0x9061b923", qo([nf(this.name), r.data])]));
      try {
        let s = yield this.provider.call(r);
        return V(s).length % 32 === 4 && et.throwError("resolver threw error", M.errors.CALL_EXCEPTION, {
          transaction: r,
          data: s
        }), i && (s = en(s, 0)), s;
      } catch (s) {
        if (s.code === M.errors.CALL_EXCEPTION)
          return null;
        throw s;
      }
    });
  }
  _fetchBytes(t, e) {
    return X(this, void 0, void 0, function* () {
      const r = yield this._fetch(t, e);
      return r != null ? en(r, 0) : null;
    });
  }
  _getAddress(t, e) {
    const r = Hh[String(t)];
    if (r == null && et.throwError(`unsupported coin type: ${t}`, M.errors.UNSUPPORTED_OPERATION, {
      operation: `getAddress(${t})`
    }), r.ilk === "eth")
      return this.provider.formatter.address(e);
    const i = V(e);
    if (r.p2pkh != null) {
      const s = e.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
      if (s) {
        const o = parseInt(s[1], 16);
        if (s[2].length === o * 2 && o >= 1 && o <= 75)
          return Rs(he([[r.p2pkh], "0x" + s[2]]));
      }
    }
    if (r.p2sh != null) {
      const s = e.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
      if (s) {
        const o = parseInt(s[1], 16);
        if (s[2].length === o * 2 && o >= 1 && o <= 75)
          return Rs(he([[r.p2sh], "0x" + s[2]]));
      }
    }
    if (r.prefix != null) {
      const s = i[1];
      let o = i[0];
      if (o === 0 ? s !== 20 && s !== 32 && (o = -1) : o = -1, o >= 0 && i.length === 2 + s && s >= 1 && s <= 75) {
        const u = Ns.toWords(i.slice(2));
        return u.unshift(o), Ns.encode(r.prefix, u);
      }
    }
    return null;
  }
  getAddress(t) {
    return X(this, void 0, void 0, function* () {
      if (t == null && (t = 60), t === 60)
        try {
          const i = yield this._fetch("0x3b3b57de");
          return i === "0x" || i === Ca ? null : this.provider.formatter.callAddress(i);
        } catch (i) {
          if (i.code === M.errors.CALL_EXCEPTION)
            return null;
          throw i;
        }
      const e = yield this._fetchBytes("0xf1cb7e06", ci(t));
      if (e == null || e === "0x")
        return null;
      const r = this._getAddress(t, e);
      return r == null && et.throwError("invalid or unsupported coin data", M.errors.UNSUPPORTED_OPERATION, {
        operation: `getAddress(${t})`,
        coinType: t,
        data: e
      }), r;
    });
  }
  getAvatar() {
    return X(this, void 0, void 0, function* () {
      const t = [{ type: "name", content: this.name }];
      try {
        const e = yield this.getText("avatar");
        if (e == null)
          return null;
        for (let r = 0; r < Is.length; r++) {
          const i = e.match(Is[r]);
          if (i == null)
            continue;
          const s = i[1].toLowerCase();
          switch (s) {
            case "https":
              return t.push({ type: "url", content: e }), { linkage: t, url: e };
            case "data":
              return t.push({ type: "data", content: e }), { linkage: t, url: e };
            case "ipfs":
              return t.push({ type: "ipfs", content: e }), { linkage: t, url: di(e) };
            case "erc721":
            case "erc1155": {
              const o = s === "erc721" ? "0xc87b56dd" : "0x0e89341c";
              t.push({ type: s, content: e });
              const u = this._resolvedAddress || (yield this.getAddress()), l = (i[2] || "").split("/");
              if (l.length !== 2)
                return null;
              const d = yield this.provider.formatter.address(l[0]), g = jt(U.from(l[1]).toHexString(), 32);
              if (s === "erc721") {
                const I = this.provider.formatter.callAddress(yield this.provider.call({
                  to: d,
                  data: se(["0x6352211e", g])
                }));
                if (u !== I)
                  return null;
                t.push({ type: "owner", content: I });
              } else if (s === "erc1155") {
                const I = U.from(yield this.provider.call({
                  to: d,
                  data: se(["0x00fdd58e", jt(u, 32), g])
                }));
                if (I.isZero())
                  return null;
                t.push({ type: "balance", content: I.toString() });
              }
              const w = {
                to: this.provider.formatter.address(l[0]),
                data: se([o, g])
              };
              let A = xn(yield this.provider.call(w), 0);
              if (A == null)
                return null;
              t.push({ type: "metadata-url-base", content: A }), s === "erc1155" && (A = A.replace("{id}", g.substring(2)), t.push({ type: "metadata-url-expanded", content: A })), A.match(/^ipfs:/i) && (A = di(A)), t.push({ type: "metadata-url", content: A });
              const P = yield $i(A);
              if (!P)
                return null;
              t.push({ type: "metadata", content: JSON.stringify(P) });
              let N = P.image;
              if (typeof N != "string")
                return null;
              if (!N.match(/^(https:\/\/|data:)/i)) {
                if (N.match($o) == null)
                  return null;
                t.push({ type: "url-ipfs", content: N }), N = di(N);
              }
              return t.push({ type: "url", content: N }), { linkage: t, url: N };
            }
          }
        }
      } catch {
      }
      return null;
    });
  }
  getContentHash() {
    return X(this, void 0, void 0, function* () {
      const t = yield this._fetchBytes("0xbc1c58d1");
      if (t == null || t === "0x")
        return null;
      const e = t.match(/^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
      if (e) {
        const s = parseInt(e[3], 16);
        if (e[4].length === s * 2)
          return "ipfs://" + Ai.encode("0x" + e[1]);
      }
      const r = t.match(/^0xe5010172(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
      if (r) {
        const s = parseInt(r[3], 16);
        if (r[4].length === s * 2)
          return "ipns://" + Ai.encode("0x" + r[1]);
      }
      const i = t.match(/^0xe40101fa011b20([0-9a-f]*)$/);
      return i && i[1].length === 32 * 2 ? "bzz://" + i[1] : et.throwError("invalid or unsupported content hash data", M.errors.UNSUPPORTED_OPERATION, {
        operation: "getContentHash()",
        data: t
      });
    });
  }
  getText(t) {
    return X(this, void 0, void 0, function* () {
      let e = Ce(t);
      e = he([ci(64), ci(e.length), e]), e.length % 32 !== 0 && (e = he([e, jt("0x", 32 - t.length % 32)]));
      const r = yield this._fetchBytes("0x59d1d43c", G(e));
      return r == null || r === "0x" ? null : sn(r);
    });
  }
}
let pi = null, Kh = 1;
class Jh extends Bn {
  /**
   *  ready
   *
   *  A Promise<Network> that resolves only once the provider is ready.
   *
   *  Sub-classes that call the super with a network without a chainId
   *  MUST set this. Standard named networks have a known chainId.
   *
   */
  constructor(t) {
    if (super(), this._events = [], this._emitted = { block: -2 }, this.disableCcipRead = !1, this.formatter = new.target.getFormatter(), C(this, "anyNetwork", t === "any"), this.anyNetwork && (t = this.detectNetwork()), t instanceof Promise)
      this._networkPromise = t, t.catch((e) => {
      }), this._ready().catch((e) => {
      });
    else {
      const e = ke(new.target, "getNetwork")(t);
      e ? (C(this, "_network", e), this.emit("network", e, null)) : et.throwArgumentError("invalid network", "network", t);
    }
    this._maxInternalBlockNumber = -1024, this._lastBlockNumber = -2, this._maxFilterBlockRange = 10, this._pollingInterval = 4e3, this._fastQueryDate = 0;
  }
  _ready() {
    return X(this, void 0, void 0, function* () {
      if (this._network == null) {
        let t = null;
        if (this._networkPromise)
          try {
            t = yield this._networkPromise;
          } catch {
          }
        t == null && (t = yield this.detectNetwork()), t || et.throwError("no network detected", M.errors.UNKNOWN_ERROR, {}), this._network == null && (this.anyNetwork ? this._network = t : C(this, "_network", t), this.emit("network", t, null));
      }
      return this._network;
    });
  }
  // This will always return the most recently established network.
  // For "any", this can change (a "network" event is emitted before
  // any change is reflected); otherwise this cannot change
  get ready() {
    return Kr(() => this._ready().then((t) => t, (t) => {
      if (!(t.code === M.errors.NETWORK_ERROR && t.event === "noNetwork"))
        throw t;
    }));
  }
  // @TODO: Remove this and just create a singleton formatter
  static getFormatter() {
    return pi == null && (pi = new $()), pi;
  }
  // @TODO: Remove this and just use getNetwork
  static getNetwork(t) {
    return Nh(t ?? "homestead");
  }
  ccipReadFetch(t, e, r) {
    return X(this, void 0, void 0, function* () {
      if (this.disableCcipRead || r.length === 0)
        return null;
      const i = t.to.toLowerCase(), s = e.toLowerCase(), o = [];
      for (let u = 0; u < r.length; u++) {
        const l = r[u], d = l.replace("{sender}", i).replace("{data}", s), g = l.indexOf("{data}") >= 0 ? null : JSON.stringify({ data: s, sender: i }), w = yield $i({ url: d, errorPassThrough: !0 }, g, (P, N) => (P.status = N.statusCode, P));
        if (w.data)
          return w.data;
        const A = w.message || "unknown error";
        if (w.status >= 400 && w.status < 500)
          return et.throwError(`response not found during CCIP fetch: ${A}`, M.errors.SERVER_ERROR, { url: l, errorMessage: A });
        o.push(A);
      }
      return et.throwError(`error encountered during CCIP fetch: ${o.map((u) => JSON.stringify(u)).join(", ")}`, M.errors.SERVER_ERROR, {
        urls: r,
        errorMessages: o
      });
    });
  }
  // Fetches the blockNumber, but will reuse any result that is less
  // than maxAge old or has been requested since the last request
  _getInternalBlockNumber(t) {
    return X(this, void 0, void 0, function* () {
      if (yield this._ready(), t > 0)
        for (; this._internalBlockNumber; ) {
          const i = this._internalBlockNumber;
          try {
            const s = yield i;
            if (Hr() - s.respTime <= t)
              return s.blockNumber;
            break;
          } catch {
            if (this._internalBlockNumber === i)
              break;
          }
        }
      const e = Hr(), r = Vt({
        blockNumber: this.perform("getBlockNumber", {}),
        networkError: this.getNetwork().then((i) => null, (i) => i)
      }).then(({ blockNumber: i, networkError: s }) => {
        if (s)
          throw this._internalBlockNumber === r && (this._internalBlockNumber = null), s;
        const o = Hr();
        return i = U.from(i).toNumber(), i < this._maxInternalBlockNumber && (i = this._maxInternalBlockNumber), this._maxInternalBlockNumber = i, this._setFastBlockNumber(i), { blockNumber: i, reqTime: e, respTime: o };
      });
      return this._internalBlockNumber = r, r.catch((i) => {
        this._internalBlockNumber === r && (this._internalBlockNumber = null);
      }), (yield r).blockNumber;
    });
  }
  poll() {
    return X(this, void 0, void 0, function* () {
      const t = Kh++, e = [];
      let r = null;
      try {
        r = yield this._getInternalBlockNumber(100 + this.pollingInterval / 2);
      } catch (i) {
        this.emit("error", i);
        return;
      }
      if (this._setFastBlockNumber(r), this.emit("poll", t, r), r === this._lastBlockNumber) {
        this.emit("didPoll", t);
        return;
      }
      if (this._emitted.block === -2 && (this._emitted.block = r - 1), Math.abs(this._emitted.block - r) > 1e3)
        et.warn(`network block skew detected; skipping block events (emitted=${this._emitted.block} blockNumber${r})`), this.emit("error", et.makeError("network block skew detected", M.errors.NETWORK_ERROR, {
          blockNumber: r,
          event: "blockSkew",
          previousBlockNumber: this._emitted.block
        })), this.emit("block", r);
      else
        for (let i = this._emitted.block + 1; i <= r; i++)
          this.emit("block", i);
      this._emitted.block !== r && (this._emitted.block = r, Object.keys(this._emitted).forEach((i) => {
        if (i === "block")
          return;
        const s = this._emitted[i];
        s !== "pending" && r - s > 12 && delete this._emitted[i];
      })), this._lastBlockNumber === -2 && (this._lastBlockNumber = r - 1), this._events.forEach((i) => {
        switch (i.type) {
          case "tx": {
            const s = i.hash;
            let o = this.getTransactionReceipt(s).then((u) => (!u || u.blockNumber == null || (this._emitted["t:" + s] = u.blockNumber, this.emit(s, u)), null)).catch((u) => {
              this.emit("error", u);
            });
            e.push(o);
            break;
          }
          case "filter": {
            if (!i._inflight) {
              i._inflight = !0;
              const s = i.filter;
              s.fromBlock = i._lastBlockNumber + 1, s.toBlock = r, s.toBlock - this._maxFilterBlockRange > s.fromBlock && (s.fromBlock = s.toBlock - this._maxFilterBlockRange);
              const o = this.getLogs(s).then((u) => {
                i._inflight = !1, u.length !== 0 && u.forEach((l) => {
                  l.blockNumber > i._lastBlockNumber && (i._lastBlockNumber = l.blockNumber), this._emitted["b:" + l.blockHash] = l.blockNumber, this._emitted["t:" + l.transactionHash] = l.blockNumber, this.emit(s, l);
                });
              }).catch((u) => {
                this.emit("error", u), i._inflight = !1;
              });
              e.push(o);
            }
            break;
          }
        }
      }), this._lastBlockNumber = r, Promise.all(e).then(() => {
        this.emit("didPoll", t);
      }).catch((i) => {
        this.emit("error", i);
      });
    });
  }
  // Deprecated; do not use this
  resetEventsBlock(t) {
    this._lastBlockNumber = t - 1, this.polling && this.poll();
  }
  get network() {
    return this._network;
  }
  // This method should query the network if the underlying network
  // can change, such as when connected to a JSON-RPC backend
  detectNetwork() {
    return X(this, void 0, void 0, function* () {
      return et.throwError("provider does not support network detection", M.errors.UNSUPPORTED_OPERATION, {
        operation: "provider.detectNetwork"
      });
    });
  }
  getNetwork() {
    return X(this, void 0, void 0, function* () {
      const t = yield this._ready(), e = yield this.detectNetwork();
      if (t.chainId !== e.chainId) {
        if (this.anyNetwork)
          return this._network = e, this._lastBlockNumber = -2, this._fastBlockNumber = null, this._fastBlockNumberPromise = null, this._fastQueryDate = 0, this._emitted.block = -2, this._maxInternalBlockNumber = -1024, this._internalBlockNumber = null, this.emit("network", e, t), yield ks(0), this._network;
        const r = et.makeError("underlying network changed", M.errors.NETWORK_ERROR, {
          event: "changed",
          network: t,
          detectedNetwork: e
        });
        throw this.emit("error", r), r;
      }
      return t;
    });
  }
  get blockNumber() {
    return this._getInternalBlockNumber(100 + this.pollingInterval / 2).then((t) => {
      this._setFastBlockNumber(t);
    }, (t) => {
    }), this._fastBlockNumber != null ? this._fastBlockNumber : -1;
  }
  get polling() {
    return this._poller != null;
  }
  set polling(t) {
    t && !this._poller ? (this._poller = setInterval(() => {
      this.poll();
    }, this.pollingInterval), this._bootstrapPoll || (this._bootstrapPoll = setTimeout(() => {
      this.poll(), this._bootstrapPoll = setTimeout(() => {
        this._poller || this.poll(), this._bootstrapPoll = null;
      }, this.pollingInterval);
    }, 0))) : !t && this._poller && (clearInterval(this._poller), this._poller = null);
  }
  get pollingInterval() {
    return this._pollingInterval;
  }
  set pollingInterval(t) {
    if (typeof t != "number" || t <= 0 || parseInt(String(t)) != t)
      throw new Error("invalid polling interval");
    this._pollingInterval = t, this._poller && (clearInterval(this._poller), this._poller = setInterval(() => {
      this.poll();
    }, this._pollingInterval));
  }
  _getFastBlockNumber() {
    const t = Hr();
    return t - this._fastQueryDate > 2 * this._pollingInterval && (this._fastQueryDate = t, this._fastBlockNumberPromise = this.getBlockNumber().then((e) => ((this._fastBlockNumber == null || e > this._fastBlockNumber) && (this._fastBlockNumber = e), this._fastBlockNumber))), this._fastBlockNumberPromise;
  }
  _setFastBlockNumber(t) {
    this._fastBlockNumber != null && t < this._fastBlockNumber || (this._fastQueryDate = Hr(), (this._fastBlockNumber == null || t > this._fastBlockNumber) && (this._fastBlockNumber = t, this._fastBlockNumberPromise = Promise.resolve(t)));
  }
  waitForTransaction(t, e, r) {
    return X(this, void 0, void 0, function* () {
      return this._waitForTransaction(t, e ?? 1, r || 0, null);
    });
  }
  _waitForTransaction(t, e, r, i) {
    return X(this, void 0, void 0, function* () {
      const s = yield this.getTransactionReceipt(t);
      return (s ? s.confirmations : 0) >= e ? s : new Promise((o, u) => {
        const l = [];
        let d = !1;
        const g = function() {
          return d ? !0 : (d = !0, l.forEach((A) => {
            A();
          }), !1);
        }, w = (A) => {
          A.confirmations < e || g() || o(A);
        };
        if (this.on(t, w), l.push(() => {
          this.removeListener(t, w);
        }), i) {
          let A = i.startBlock, P = null;
          const N = (I) => X(this, void 0, void 0, function* () {
            d || (yield ks(1e3), this.getTransactionCount(i.from).then((H) => X(this, void 0, void 0, function* () {
              if (!d) {
                if (H <= i.nonce)
                  A = I;
                else {
                  {
                    const R = yield this.getTransaction(t);
                    if (R && R.blockNumber != null)
                      return;
                  }
                  for (P == null && (P = A - 3, P < i.startBlock && (P = i.startBlock)); P <= I; ) {
                    if (d)
                      return;
                    const R = yield this.getBlockWithTransactions(P);
                    for (let L = 0; L < R.transactions.length; L++) {
                      const j = R.transactions[L];
                      if (j.hash === t)
                        return;
                      if (j.from === i.from && j.nonce === i.nonce) {
                        if (d)
                          return;
                        const J = yield this.waitForTransaction(j.hash, e);
                        if (g())
                          return;
                        let Q = "replaced";
                        j.data === i.data && j.to === i.to && j.value.eq(i.value) ? Q = "repriced" : j.data === "0x" && j.from === j.to && j.value.isZero() && (Q = "cancelled"), u(et.makeError("transaction was replaced", M.errors.TRANSACTION_REPLACED, {
                          cancelled: Q === "replaced" || Q === "cancelled",
                          reason: Q,
                          replacement: this._wrapTransaction(j),
                          hash: t,
                          receipt: J
                        }));
                        return;
                      }
                    }
                    P++;
                  }
                }
                d || this.once("block", N);
              }
            }), (H) => {
              d || this.once("block", N);
            }));
          });
          if (d)
            return;
          this.once("block", N), l.push(() => {
            this.removeListener("block", N);
          });
        }
        if (typeof r == "number" && r > 0) {
          const A = setTimeout(() => {
            g() || u(et.makeError("timeout exceeded", M.errors.TIMEOUT, { timeout: r }));
          }, r);
          A.unref && A.unref(), l.push(() => {
            clearTimeout(A);
          });
        }
      });
    });
  }
  getBlockNumber() {
    return X(this, void 0, void 0, function* () {
      return this._getInternalBlockNumber(0);
    });
  }
  getGasPrice() {
    return X(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const t = yield this.perform("getGasPrice", {});
      try {
        return U.from(t);
      } catch (e) {
        return et.throwError("bad result from backend", M.errors.SERVER_ERROR, {
          method: "getGasPrice",
          result: t,
          error: e
        });
      }
    });
  }
  getBalance(t, e) {
    return X(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const r = yield Vt({
        address: this._getAddress(t),
        blockTag: this._getBlockTag(e)
      }), i = yield this.perform("getBalance", r);
      try {
        return U.from(i);
      } catch (s) {
        return et.throwError("bad result from backend", M.errors.SERVER_ERROR, {
          method: "getBalance",
          params: r,
          result: i,
          error: s
        });
      }
    });
  }
  getTransactionCount(t, e) {
    return X(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const r = yield Vt({
        address: this._getAddress(t),
        blockTag: this._getBlockTag(e)
      }), i = yield this.perform("getTransactionCount", r);
      try {
        return U.from(i).toNumber();
      } catch (s) {
        return et.throwError("bad result from backend", M.errors.SERVER_ERROR, {
          method: "getTransactionCount",
          params: r,
          result: i,
          error: s
        });
      }
    });
  }
  getCode(t, e) {
    return X(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const r = yield Vt({
        address: this._getAddress(t),
        blockTag: this._getBlockTag(e)
      }), i = yield this.perform("getCode", r);
      try {
        return G(i);
      } catch (s) {
        return et.throwError("bad result from backend", M.errors.SERVER_ERROR, {
          method: "getCode",
          params: r,
          result: i,
          error: s
        });
      }
    });
  }
  getStorageAt(t, e, r) {
    return X(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const i = yield Vt({
        address: this._getAddress(t),
        blockTag: this._getBlockTag(r),
        position: Promise.resolve(e).then((o) => ki(o))
      }), s = yield this.perform("getStorageAt", i);
      try {
        return G(s);
      } catch (o) {
        return et.throwError("bad result from backend", M.errors.SERVER_ERROR, {
          method: "getStorageAt",
          params: i,
          result: s,
          error: o
        });
      }
    });
  }
  // This should be called by any subclass wrapping a TransactionResponse
  _wrapTransaction(t, e, r) {
    if (e != null && wr(e) !== 32)
      throw new Error("invalid response - sendTransaction");
    const i = t;
    return e != null && t.hash !== e && et.throwError("Transaction hash mismatch from Provider.sendTransaction.", M.errors.UNKNOWN_ERROR, { expectedHash: t.hash, returnedHash: e }), i.wait = (s, o) => X(this, void 0, void 0, function* () {
      s == null && (s = 1), o == null && (o = 0);
      let u;
      s !== 0 && r != null && (u = {
        data: t.data,
        from: t.from,
        nonce: t.nonce,
        to: t.to,
        value: t.value,
        startBlock: r
      });
      const l = yield this._waitForTransaction(t.hash, s, o, u);
      return l == null && s === 0 ? null : (this._emitted["t:" + t.hash] = l.blockNumber, l.status === 0 && et.throwError("transaction failed", M.errors.CALL_EXCEPTION, {
        transactionHash: t.hash,
        transaction: t,
        receipt: l
      }), l);
    }), i;
  }
  sendTransaction(t) {
    return X(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const e = yield Promise.resolve(t).then((s) => G(s)), r = this.formatter.transaction(t);
      r.confirmations == null && (r.confirmations = 0);
      const i = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
      try {
        const s = yield this.perform("sendTransaction", { signedTransaction: e });
        return this._wrapTransaction(r, s, i);
      } catch (s) {
        throw s.transaction = r, s.transactionHash = r.hash, s;
      }
    });
  }
  _getTransactionRequest(t) {
    return X(this, void 0, void 0, function* () {
      const e = yield t, r = {};
      return ["from", "to"].forEach((i) => {
        e[i] != null && (r[i] = Promise.resolve(e[i]).then((s) => s ? this._getAddress(s) : null));
      }), ["gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "value"].forEach((i) => {
        e[i] != null && (r[i] = Promise.resolve(e[i]).then((s) => s ? U.from(s) : null));
      }), ["type"].forEach((i) => {
        e[i] != null && (r[i] = Promise.resolve(e[i]).then((s) => s ?? null));
      }), e.accessList && (r.accessList = this.formatter.accessList(e.accessList)), ["data"].forEach((i) => {
        e[i] != null && (r[i] = Promise.resolve(e[i]).then((s) => s ? G(s) : null));
      }), this.formatter.transactionRequest(yield Vt(r));
    });
  }
  _getFilter(t) {
    return X(this, void 0, void 0, function* () {
      t = yield t;
      const e = {};
      return t.address != null && (e.address = this._getAddress(t.address)), ["blockHash", "topics"].forEach((r) => {
        t[r] != null && (e[r] = t[r]);
      }), ["fromBlock", "toBlock"].forEach((r) => {
        t[r] != null && (e[r] = this._getBlockTag(t[r]));
      }), this.formatter.filter(yield Vt(e));
    });
  }
  _call(t, e, r) {
    return X(this, void 0, void 0, function* () {
      r >= zh && et.throwError("CCIP read exceeded maximum redirections", M.errors.SERVER_ERROR, {
        redirects: r,
        transaction: t
      });
      const i = t.to, s = yield this.perform("call", { transaction: t, blockTag: e });
      if (r >= 0 && e === "latest" && i != null && s.substring(0, 10) === "0x556f1830" && wr(s) % 32 === 4)
        try {
          const o = te(s, 4), u = te(o, 0, 32);
          U.from(u).eq(i) || et.throwError("CCIP Read sender did not match", M.errors.CALL_EXCEPTION, {
            name: "OffchainLookup",
            signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
            transaction: t,
            data: s
          });
          const l = [], d = U.from(te(o, 32, 64)).toNumber(), g = U.from(te(o, d, d + 32)).toNumber(), w = te(o, d + 32);
          for (let R = 0; R < g; R++) {
            const L = xn(w, R * 32);
            L == null && et.throwError("CCIP Read contained corrupt URL string", M.errors.CALL_EXCEPTION, {
              name: "OffchainLookup",
              signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
              transaction: t,
              data: s
            }), l.push(L);
          }
          const A = en(o, 64);
          U.from(te(o, 100, 128)).isZero() || et.throwError("CCIP Read callback selector included junk", M.errors.CALL_EXCEPTION, {
            name: "OffchainLookup",
            signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
            transaction: t,
            data: s
          });
          const P = te(o, 96, 100), N = en(o, 128), I = yield this.ccipReadFetch(t, A, l);
          I == null && et.throwError("CCIP Read disabled or provided no URLs", M.errors.CALL_EXCEPTION, {
            name: "OffchainLookup",
            signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
            transaction: t,
            data: s
          });
          const H = {
            to: i,
            data: se([P, qo([I, N])])
          };
          return this._call(H, e, r + 1);
        } catch (o) {
          if (o.code === M.errors.SERVER_ERROR)
            throw o;
        }
      try {
        return G(s);
      } catch (o) {
        return et.throwError("bad result from backend", M.errors.SERVER_ERROR, {
          method: "call",
          params: { transaction: t, blockTag: e },
          result: s,
          error: o
        });
      }
    });
  }
  call(t, e) {
    return X(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const r = yield Vt({
        transaction: this._getTransactionRequest(t),
        blockTag: this._getBlockTag(e),
        ccipReadEnabled: Promise.resolve(t.ccipReadEnabled)
      });
      return this._call(r.transaction, r.blockTag, r.ccipReadEnabled ? 0 : -1);
    });
  }
  estimateGas(t) {
    return X(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const e = yield Vt({
        transaction: this._getTransactionRequest(t)
      }), r = yield this.perform("estimateGas", e);
      try {
        return U.from(r);
      } catch (i) {
        return et.throwError("bad result from backend", M.errors.SERVER_ERROR, {
          method: "estimateGas",
          params: e,
          result: r,
          error: i
        });
      }
    });
  }
  _getAddress(t) {
    return X(this, void 0, void 0, function* () {
      t = yield t, typeof t != "string" && et.throwArgumentError("invalid address or ENS name", "name", t);
      const e = yield this.resolveName(t);
      return e == null && et.throwError("ENS name not configured", M.errors.UNSUPPORTED_OPERATION, {
        operation: `resolveName(${JSON.stringify(t)})`
      }), e;
    });
  }
  _getBlock(t, e) {
    return X(this, void 0, void 0, function* () {
      yield this.getNetwork(), t = yield t;
      let r = -128;
      const i = {
        includeTransactions: !!e
      };
      if (at(t, 32))
        i.blockHash = t;
      else
        try {
          i.blockTag = yield this._getBlockTag(t), at(i.blockTag) && (r = parseInt(i.blockTag.substring(2), 16));
        } catch {
          et.throwArgumentError("invalid block hash or block tag", "blockHashOrBlockTag", t);
        }
      return Kr(() => X(this, void 0, void 0, function* () {
        const s = yield this.perform("getBlock", i);
        if (s == null)
          return i.blockHash != null && this._emitted["b:" + i.blockHash] == null || i.blockTag != null && r > this._emitted.block ? null : void 0;
        if (e) {
          let o = null;
          for (let l = 0; l < s.transactions.length; l++) {
            const d = s.transactions[l];
            if (d.blockNumber == null)
              d.confirmations = 0;
            else if (d.confirmations == null) {
              o == null && (o = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval));
              let g = o - d.blockNumber + 1;
              g <= 0 && (g = 1), d.confirmations = g;
            }
          }
          const u = this.formatter.blockWithTransactions(s);
          return u.transactions = u.transactions.map((l) => this._wrapTransaction(l)), u;
        }
        return this.formatter.block(s);
      }), { oncePoll: this });
    });
  }
  getBlock(t) {
    return this._getBlock(t, !1);
  }
  getBlockWithTransactions(t) {
    return this._getBlock(t, !0);
  }
  getTransaction(t) {
    return X(this, void 0, void 0, function* () {
      yield this.getNetwork(), t = yield t;
      const e = { transactionHash: this.formatter.hash(t, !0) };
      return Kr(() => X(this, void 0, void 0, function* () {
        const r = yield this.perform("getTransaction", e);
        if (r == null)
          return this._emitted["t:" + t] == null ? null : void 0;
        const i = this.formatter.transactionResponse(r);
        if (i.blockNumber == null)
          i.confirmations = 0;
        else if (i.confirmations == null) {
          let o = (yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval)) - i.blockNumber + 1;
          o <= 0 && (o = 1), i.confirmations = o;
        }
        return this._wrapTransaction(i);
      }), { oncePoll: this });
    });
  }
  getTransactionReceipt(t) {
    return X(this, void 0, void 0, function* () {
      yield this.getNetwork(), t = yield t;
      const e = { transactionHash: this.formatter.hash(t, !0) };
      return Kr(() => X(this, void 0, void 0, function* () {
        const r = yield this.perform("getTransactionReceipt", e);
        if (r == null)
          return this._emitted["t:" + t] == null ? null : void 0;
        if (r.blockHash == null)
          return;
        const i = this.formatter.receipt(r);
        if (i.blockNumber == null)
          i.confirmations = 0;
        else if (i.confirmations == null) {
          let o = (yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval)) - i.blockNumber + 1;
          o <= 0 && (o = 1), i.confirmations = o;
        }
        return i;
      }), { oncePoll: this });
    });
  }
  getLogs(t) {
    return X(this, void 0, void 0, function* () {
      yield this.getNetwork();
      const e = yield Vt({ filter: this._getFilter(t) }), r = yield this.perform("getLogs", e);
      return r.forEach((i) => {
        i.removed == null && (i.removed = !1);
      }), $.arrayOf(this.formatter.filterLog.bind(this.formatter))(r);
    });
  }
  getEtherPrice() {
    return X(this, void 0, void 0, function* () {
      return yield this.getNetwork(), this.perform("getEtherPrice", {});
    });
  }
  _getBlockTag(t) {
    return X(this, void 0, void 0, function* () {
      if (t = yield t, typeof t == "number" && t < 0) {
        t % 1 && et.throwArgumentError("invalid BlockTag", "blockTag", t);
        let e = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
        return e += t, e < 0 && (e = 0), this.formatter.blockTag(e);
      }
      return this.formatter.blockTag(t);
    });
  }
  getResolver(t) {
    return X(this, void 0, void 0, function* () {
      let e = t;
      for (; ; ) {
        if (e === "" || e === "." || t !== "eth" && e === "eth")
          return null;
        const r = yield this._getResolver(e, "getResolver");
        if (r != null) {
          const i = new Cs(this, r, t);
          return e !== t && !(yield i.supportsWildcard()) ? null : i;
        }
        e = e.split(".").slice(1).join(".");
      }
    });
  }
  _getResolver(t, e) {
    return X(this, void 0, void 0, function* () {
      e == null && (e = "ENS");
      const r = yield this.getNetwork();
      r.ensAddress || et.throwError("network does not support ENS", M.errors.UNSUPPORTED_OPERATION, { operation: e, network: r.name });
      try {
        const i = yield this.call({
          to: r.ensAddress,
          data: "0x0178b8bf" + vn(t).substring(2)
        });
        return this.formatter.callAddress(i);
      } catch {
      }
      return null;
    });
  }
  resolveName(t) {
    return X(this, void 0, void 0, function* () {
      t = yield t;
      try {
        return Promise.resolve(this.formatter.address(t));
      } catch (r) {
        if (at(t))
          throw r;
      }
      typeof t != "string" && et.throwArgumentError("invalid ENS name", "name", t);
      const e = yield this.getResolver(t);
      return e ? yield e.getAddress() : null;
    });
  }
  lookupAddress(t) {
    return X(this, void 0, void 0, function* () {
      t = yield t, t = this.formatter.address(t);
      const e = t.substring(2).toLowerCase() + ".addr.reverse", r = yield this._getResolver(e, "lookupAddress");
      if (r == null)
        return null;
      const i = xn(yield this.call({
        to: r,
        data: "0x691f3431" + vn(e).substring(2)
      }), 0);
      return (yield this.resolveName(i)) != t ? null : i;
    });
  }
  getAvatar(t) {
    return X(this, void 0, void 0, function* () {
      let e = null;
      if (at(t)) {
        const s = this.formatter.address(t).substring(2).toLowerCase() + ".addr.reverse", o = yield this._getResolver(s, "getAvatar");
        if (!o)
          return null;
        e = new Cs(this, o, s);
        try {
          const u = yield e.getAvatar();
          if (u)
            return u.url;
        } catch (u) {
          if (u.code !== M.errors.CALL_EXCEPTION)
            throw u;
        }
        try {
          const u = xn(yield this.call({
            to: o,
            data: "0x691f3431" + vn(s).substring(2)
          }), 0);
          e = yield this.getResolver(u);
        } catch (u) {
          if (u.code !== M.errors.CALL_EXCEPTION)
            throw u;
          return null;
        }
      } else if (e = yield this.getResolver(t), !e)
        return null;
      const r = yield e.getAvatar();
      return r == null ? null : r.url;
    });
  }
  perform(t, e) {
    return et.throwError(t + " not implemented", M.errors.NOT_IMPLEMENTED, { operation: t });
  }
  _startEvent(t) {
    this.polling = this._events.filter((e) => e.pollable()).length > 0;
  }
  _stopEvent(t) {
    this.polling = this._events.filter((e) => e.pollable()).length > 0;
  }
  _addEventListener(t, e, r) {
    const i = new Vh(Mr(t), e, r);
    return this._events.push(i), this._startEvent(i), this;
  }
  on(t, e) {
    return this._addEventListener(t, e, !1);
  }
  once(t, e) {
    return this._addEventListener(t, e, !0);
  }
  emit(t, ...e) {
    let r = !1, i = [], s = Mr(t);
    return this._events = this._events.filter((o) => o.tag !== s ? !0 : (setTimeout(() => {
      o.listener.apply(this, e);
    }, 0), r = !0, o.once ? (i.push(o), !1) : !0)), i.forEach((o) => {
      this._stopEvent(o);
    }), r;
  }
  listenerCount(t) {
    if (!t)
      return this._events.length;
    let e = Mr(t);
    return this._events.filter((r) => r.tag === e).length;
  }
  listeners(t) {
    if (t == null)
      return this._events.map((r) => r.listener);
    let e = Mr(t);
    return this._events.filter((r) => r.tag === e).map((r) => r.listener);
  }
  off(t, e) {
    if (e == null)
      return this.removeAllListeners(t);
    const r = [];
    let i = !1, s = Mr(t);
    return this._events = this._events.filter((o) => o.tag !== s || o.listener != e || i ? !0 : (i = !0, r.push(o), !1)), r.forEach((o) => {
      this._stopEvent(o);
    }), this;
  }
  removeAllListeners(t) {
    let e = [];
    if (t == null)
      e = this._events, this._events = [];
    else {
      const r = Mr(t);
      this._events = this._events.filter((i) => i.tag !== r ? !0 : (e.push(i), !1));
    }
    return e.forEach((r) => {
      this._stopEvent(r);
    }), this;
  }
}
var De = function(n, t, e, r) {
  function i(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function u(g) {
      try {
        d(r.next(g));
      } catch (w) {
        o(w);
      }
    }
    function l(g) {
      try {
        d(r.throw(g));
      } catch (w) {
        o(w);
      }
    }
    function d(g) {
      g.done ? s(g.value) : i(g.value).then(u, l);
    }
    d((r = r.apply(n, t || [])).next());
  });
};
const ee = new M($n), Xh = ["call", "estimateGas"];
function Jr(n, t) {
  if (n == null)
    return null;
  if (typeof n.message == "string" && n.message.match("reverted")) {
    const e = at(n.data) ? n.data : null;
    if (!t || e)
      return { message: n.message, data: e };
  }
  if (typeof n == "object") {
    for (const e in n) {
      const r = Jr(n[e], t);
      if (r)
        return r;
    }
    return null;
  }
  if (typeof n == "string")
    try {
      return Jr(JSON.parse(n), t);
    } catch {
    }
  return null;
}
function zo(n, t, e) {
  const r = e.transaction || e.signedTransaction;
  if (n === "call") {
    const s = Jr(t, !0);
    if (s)
      return s.data;
    ee.throwError("missing revert data in call exception; Transaction reverted without a reason string", M.errors.CALL_EXCEPTION, {
      data: "0x",
      transaction: r,
      error: t
    });
  }
  if (n === "estimateGas") {
    let s = Jr(t.body, !1);
    s == null && (s = Jr(t, !1)), s && ee.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", M.errors.UNPREDICTABLE_GAS_LIMIT, {
      reason: s.message,
      method: n,
      transaction: r,
      error: t
    });
  }
  let i = t.message;
  throw t.code === M.errors.SERVER_ERROR && t.error && typeof t.error.message == "string" ? i = t.error.message : typeof t.body == "string" ? i = t.body : typeof t.responseText == "string" && (i = t.responseText), i = (i || "").toLowerCase(), i.match(/insufficient funds|base fee exceeds gas limit/i) && ee.throwError("insufficient funds for intrinsic transaction cost", M.errors.INSUFFICIENT_FUNDS, {
    error: t,
    method: n,
    transaction: r
  }), i.match(/nonce (is )?too low/i) && ee.throwError("nonce has already been used", M.errors.NONCE_EXPIRED, {
    error: t,
    method: n,
    transaction: r
  }), i.match(/replacement transaction underpriced|transaction gas price.*too low/i) && ee.throwError("replacement fee too low", M.errors.REPLACEMENT_UNDERPRICED, {
    error: t,
    method: n,
    transaction: r
  }), i.match(/only replay-protected/i) && ee.throwError("legacy pre-eip-155 transactions not supported", M.errors.UNSUPPORTED_OPERATION, {
    error: t,
    method: n,
    transaction: r
  }), Xh.indexOf(n) >= 0 && i.match(/gas required exceeds allowance|always failing transaction|execution reverted/) && ee.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", M.errors.UNPREDICTABLE_GAS_LIMIT, {
    error: t,
    method: n,
    transaction: r
  }), t;
}
function Bs(n) {
  return new Promise(function(t) {
    setTimeout(t, n);
  });
}
function Zh(n) {
  if (n.error) {
    const t = new Error(n.error.message);
    throw t.code = n.error.code, t.data = n.error.data, t;
  }
  return n.result;
}
function Wr(n) {
  return n && n.toLowerCase();
}
const Ni = {};
class Go extends on {
  constructor(t, e, r) {
    if (super(), t !== Ni)
      throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner");
    C(this, "provider", e), r == null && (r = 0), typeof r == "string" ? (C(this, "_address", this.provider.formatter.address(r)), C(this, "_index", null)) : typeof r == "number" ? (C(this, "_index", r), C(this, "_address", null)) : ee.throwArgumentError("invalid address or index", "addressOrIndex", r);
  }
  connect(t) {
    return ee.throwError("cannot alter JSON-RPC Signer connection", M.errors.UNSUPPORTED_OPERATION, {
      operation: "connect"
    });
  }
  connectUnchecked() {
    return new Yh(Ni, this.provider, this._address || this._index);
  }
  getAddress() {
    return this._address ? Promise.resolve(this._address) : this.provider.send("eth_accounts", []).then((t) => (t.length <= this._index && ee.throwError("unknown account #" + this._index, M.errors.UNSUPPORTED_OPERATION, {
      operation: "getAddress"
    }), this.provider.formatter.address(t[this._index])));
  }
  sendUncheckedTransaction(t) {
    t = Xt(t);
    const e = this.getAddress().then((r) => (r && (r = r.toLowerCase()), r));
    if (t.gasLimit == null) {
      const r = Xt(t);
      r.from = e, t.gasLimit = this.provider.estimateGas(r);
    }
    return t.to != null && (t.to = Promise.resolve(t.to).then((r) => De(this, void 0, void 0, function* () {
      if (r == null)
        return null;
      const i = yield this.provider.resolveName(r);
      return i == null && ee.throwArgumentError("provided ENS name resolves to null", "tx.to", r), i;
    }))), Vt({
      tx: Vt(t),
      sender: e
    }).then(({ tx: r, sender: i }) => {
      r.from != null ? r.from.toLowerCase() !== i && ee.throwArgumentError("from address mismatch", "transaction", t) : r.from = i;
      const s = this.provider.constructor.hexlifyTransaction(r, { from: !0 });
      return this.provider.send("eth_sendTransaction", [s]).then((o) => o, (o) => zo("sendTransaction", o, s));
    });
  }
  signTransaction(t) {
    return ee.throwError("signing transactions is unsupported", M.errors.UNSUPPORTED_OPERATION, {
      operation: "signTransaction"
    });
  }
  sendTransaction(t) {
    return De(this, void 0, void 0, function* () {
      const e = yield this.provider._getInternalBlockNumber(100 + 2 * this.provider.pollingInterval), r = yield this.sendUncheckedTransaction(t);
      try {
        return yield Kr(() => De(this, void 0, void 0, function* () {
          const i = yield this.provider.getTransaction(r);
          if (i !== null)
            return this.provider._wrapTransaction(i, r, e);
        }), { oncePoll: this.provider });
      } catch (i) {
        throw i.transactionHash = r, i;
      }
    });
  }
  signMessage(t) {
    return De(this, void 0, void 0, function* () {
      const e = typeof t == "string" ? Ce(t) : t, r = yield this.getAddress();
      return yield this.provider.send("personal_sign", [G(e), r.toLowerCase()]);
    });
  }
  _legacySignMessage(t) {
    return De(this, void 0, void 0, function* () {
      const e = typeof t == "string" ? Ce(t) : t, r = yield this.getAddress();
      return yield this.provider.send("eth_sign", [r.toLowerCase(), G(e)]);
    });
  }
  _signTypedData(t, e, r) {
    return De(this, void 0, void 0, function* () {
      const i = yield ae.resolveNames(t, e, r, (o) => this.provider.resolveName(o)), s = yield this.getAddress();
      return yield this.provider.send("eth_signTypedData_v4", [
        s.toLowerCase(),
        JSON.stringify(ae.getPayload(i.domain, e, i.value))
      ]);
    });
  }
  unlock(t) {
    return De(this, void 0, void 0, function* () {
      const e = this.provider, r = yield this.getAddress();
      return e.send("personal_unlockAccount", [r.toLowerCase(), t, null]);
    });
  }
}
class Yh extends Go {
  sendTransaction(t) {
    return this.sendUncheckedTransaction(t).then((e) => ({
      hash: e,
      nonce: null,
      gasLimit: null,
      gasPrice: null,
      data: null,
      value: null,
      chainId: null,
      confirmations: 0,
      from: null,
      wait: (r) => this.provider.waitForTransaction(e, r)
    }));
  }
}
const Qh = {
  chainId: !0,
  data: !0,
  gasLimit: !0,
  gasPrice: !0,
  nonce: !0,
  to: !0,
  value: !0,
  type: !0,
  accessList: !0,
  maxFeePerGas: !0,
  maxPriorityFeePerGas: !0
};
class tl extends Jh {
  constructor(t, e) {
    let r = e;
    r == null && (r = new Promise((i, s) => {
      setTimeout(() => {
        this.detectNetwork().then((o) => {
          i(o);
        }, (o) => {
          s(o);
        });
      }, 0);
    })), super(r), t || (t = ke(this.constructor, "defaultUrl")()), typeof t == "string" ? C(this, "connection", Object.freeze({
      url: t
    })) : C(this, "connection", Object.freeze(Xt(t))), this._nextId = 42;
  }
  get _cache() {
    return this._eventLoopCache == null && (this._eventLoopCache = {}), this._eventLoopCache;
  }
  static defaultUrl() {
    return "http://localhost:8545";
  }
  detectNetwork() {
    return this._cache.detectNetwork || (this._cache.detectNetwork = this._uncachedDetectNetwork(), setTimeout(() => {
      this._cache.detectNetwork = null;
    }, 0)), this._cache.detectNetwork;
  }
  _uncachedDetectNetwork() {
    return De(this, void 0, void 0, function* () {
      yield Bs(0);
      let t = null;
      try {
        t = yield this.send("eth_chainId", []);
      } catch {
        try {
          t = yield this.send("net_version", []);
        } catch {
        }
      }
      if (t != null) {
        const e = ke(this.constructor, "getNetwork");
        try {
          return e(U.from(t).toNumber());
        } catch (r) {
          return ee.throwError("could not detect network", M.errors.NETWORK_ERROR, {
            chainId: t,
            event: "invalidNetwork",
            serverError: r
          });
        }
      }
      return ee.throwError("could not detect network", M.errors.NETWORK_ERROR, {
        event: "noNetwork"
      });
    });
  }
  getSigner(t) {
    return new Go(Ni, this, t);
  }
  getUncheckedSigner(t) {
    return this.getSigner(t).connectUnchecked();
  }
  listAccounts() {
    return this.send("eth_accounts", []).then((t) => t.map((e) => this.formatter.address(e)));
  }
  send(t, e) {
    const r = {
      method: t,
      params: e,
      id: this._nextId++,
      jsonrpc: "2.0"
    };
    this.emit("debug", {
      action: "request",
      request: ze(r),
      provider: this
    });
    const i = ["eth_chainId", "eth_blockNumber"].indexOf(t) >= 0;
    if (i && this._cache[t])
      return this._cache[t];
    const s = $i(this.connection, JSON.stringify(r), Zh).then((o) => (this.emit("debug", {
      action: "response",
      request: r,
      response: o,
      provider: this
    }), o), (o) => {
      throw this.emit("debug", {
        action: "response",
        error: o,
        request: r,
        provider: this
      }), o;
    });
    return i && (this._cache[t] = s, setTimeout(() => {
      this._cache[t] = null;
    }, 0)), s;
  }
  prepareRequest(t, e) {
    switch (t) {
      case "getBlockNumber":
        return ["eth_blockNumber", []];
      case "getGasPrice":
        return ["eth_gasPrice", []];
      case "getBalance":
        return ["eth_getBalance", [Wr(e.address), e.blockTag]];
      case "getTransactionCount":
        return ["eth_getTransactionCount", [Wr(e.address), e.blockTag]];
      case "getCode":
        return ["eth_getCode", [Wr(e.address), e.blockTag]];
      case "getStorageAt":
        return ["eth_getStorageAt", [Wr(e.address), e.position, e.blockTag]];
      case "sendTransaction":
        return ["eth_sendRawTransaction", [e.signedTransaction]];
      case "getBlock":
        return e.blockTag ? ["eth_getBlockByNumber", [e.blockTag, !!e.includeTransactions]] : e.blockHash ? ["eth_getBlockByHash", [e.blockHash, !!e.includeTransactions]] : null;
      case "getTransaction":
        return ["eth_getTransactionByHash", [e.transactionHash]];
      case "getTransactionReceipt":
        return ["eth_getTransactionReceipt", [e.transactionHash]];
      case "call":
        return ["eth_call", [ke(this.constructor, "hexlifyTransaction")(e.transaction, { from: !0 }), e.blockTag]];
      case "estimateGas":
        return ["eth_estimateGas", [ke(this.constructor, "hexlifyTransaction")(e.transaction, { from: !0 })]];
      case "getLogs":
        return e.filter && e.filter.address != null && (e.filter.address = Wr(e.filter.address)), ["eth_getLogs", [e.filter]];
    }
    return null;
  }
  perform(t, e) {
    return De(this, void 0, void 0, function* () {
      if (t === "call" || t === "estimateGas") {
        const i = e.transaction;
        if (i && i.type != null && U.from(i.type).isZero() && i.maxFeePerGas == null && i.maxPriorityFeePerGas == null) {
          const s = yield this.getFeeData();
          s.maxFeePerGas == null && s.maxPriorityFeePerGas == null && (e = Xt(e), e.transaction = Xt(i), delete e.transaction.type);
        }
      }
      const r = this.prepareRequest(t, e);
      r == null && ee.throwError(t + " not implemented", M.errors.NOT_IMPLEMENTED, { operation: t });
      try {
        return yield this.send(r[0], r[1]);
      } catch (i) {
        return zo(t, i, e);
      }
    });
  }
  _startEvent(t) {
    t.tag === "pending" && this._startPending(), super._startEvent(t);
  }
  _startPending() {
    if (this._pendingFilter != null)
      return;
    const t = this, e = this.send("eth_newPendingTransactionFilter", []);
    this._pendingFilter = e, e.then(function(r) {
      function i() {
        t.send("eth_getFilterChanges", [r]).then(function(s) {
          if (t._pendingFilter != e)
            return null;
          let o = Promise.resolve();
          return s.forEach(function(u) {
            t._emitted["t:" + u.toLowerCase()] = "pending", o = o.then(function() {
              return t.getTransaction(u).then(function(l) {
                return t.emit("pending", l), null;
              });
            });
          }), o.then(function() {
            return Bs(1e3);
          });
        }).then(function() {
          if (t._pendingFilter != e) {
            t.send("eth_uninstallFilter", [r]);
            return;
          }
          return setTimeout(function() {
            i();
          }, 0), null;
        }).catch((s) => {
        });
      }
      return i(), r;
    }).catch((r) => {
    });
  }
  _stopEvent(t) {
    t.tag === "pending" && this.listenerCount("pending") === 0 && (this._pendingFilter = null), super._stopEvent(t);
  }
  // Convert an ethers.js transaction into a JSON-RPC transaction
  //  - gasLimit => gas
  //  - All values hexlified
  //  - All numeric values zero-striped
  //  - All addresses are lowercased
  // NOTE: This allows a TransactionRequest, but all values should be resolved
  //       before this is called
  // @TODO: This will likely be removed in future versions and prepareRequest
  //        will be the preferred method for this.
  static hexlifyTransaction(t, e) {
    const r = Xt(Qh);
    if (e)
      for (const s in e)
        e[s] && (r[s] = !0);
    oa(t, r);
    const i = {};
    return ["chainId", "gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach(function(s) {
      if (t[s] == null)
        return;
      const o = ki(U.from(t[s]));
      s === "gasLimit" && (s = "gas"), i[s] = o;
    }), ["from", "to", "data"].forEach(function(s) {
      t[s] != null && (i[s] = G(t[s]));
    }), t.accessList && (i.accessList = zr(t.accessList)), i;
  }
}
const Os = new M($n);
let el = 1;
function Ls(n, t) {
  const e = "Web3LegacyFetcher";
  return function(r, i) {
    const s = {
      method: r,
      params: i,
      id: el++,
      jsonrpc: "2.0"
    };
    return new Promise((o, u) => {
      this.emit("debug", {
        action: "request",
        fetcher: e,
        request: ze(s),
        provider: this
      }), t(s, (l, d) => {
        if (l)
          return this.emit("debug", {
            action: "response",
            fetcher: e,
            error: l,
            request: s,
            provider: this
          }), u(l);
        if (this.emit("debug", {
          action: "response",
          fetcher: e,
          request: s,
          response: d,
          provider: this
        }), d.error) {
          const g = new Error(d.error.message);
          return g.code = d.error.code, g.data = d.error.data, u(g);
        }
        o(d.result);
      });
    });
  };
}
function rl(n) {
  return function(t, e) {
    e == null && (e = []);
    const r = { method: t, params: e };
    return this.emit("debug", {
      action: "request",
      fetcher: "Eip1193Fetcher",
      request: ze(r),
      provider: this
    }), n.request(r).then((i) => (this.emit("debug", {
      action: "response",
      fetcher: "Eip1193Fetcher",
      request: r,
      response: i,
      provider: this
    }), i), (i) => {
      throw this.emit("debug", {
        action: "response",
        fetcher: "Eip1193Fetcher",
        request: r,
        error: i,
        provider: this
      }), i;
    });
  };
}
class nl extends tl {
  constructor(t, e) {
    t == null && Os.throwArgumentError("missing provider", "provider", t);
    let r = null, i = null, s = null;
    typeof t == "function" ? (r = "unknown:", i = t) : (r = t.host || t.path || "", !r && t.isMetaMask && (r = "metamask"), s = t, t.request ? (r === "" && (r = "eip-1193:"), i = rl(t)) : t.sendAsync ? i = Ls(t, t.sendAsync.bind(t)) : t.send ? i = Ls(t, t.send.bind(t)) : Os.throwArgumentError("unsupported provider", "provider", t), r || (r = "unknown:")), super(r, e), C(this, "jsonRpcFetchFunc", i), C(this, "provider", s);
  }
  send(t, e) {
    return this.jsonRpcFetchFunc(t, e);
  }
}
const Fs = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "Paused",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: !1,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        indexed: !1,
        internalType: "bytes",
        name: "metadata",
        type: "bytes"
      }
    ],
    name: "TransferWithMetadata",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "Unpaused",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256"
      }
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256"
      }
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "metadata",
        type: "bytes"
      }
    ],
    name: "transferWithMetadata",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
], il = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "addressMap",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "Address",
        type: "string"
      },
      {
        internalType: "string",
        name: "id",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "allowWIRON",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "amtMap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "balanceOfWIRON",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "a",
        type: "string"
      },
      {
        internalType: "string",
        name: "b",
        type: "string"
      }
    ],
    name: "compareStrings",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_id",
        type: "string"
      }
    ],
    name: "getAddressById",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "_ironFishAddress",
        type: "string"
      },
      {
        internalType: "string",
        name: "id",
        type: "string"
      }
    ],
    name: "registerShop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "retrieveAllIntegrations",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "string",
            name: "Address",
            type: "string"
          },
          {
            internalType: "string",
            name: "id",
            type: "string"
          }
        ],
        internalType: "struct Merchant.Integration[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "sendWIRON",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "totalRevenue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "transactions",
    outputs: [
      {
        internalType: "string",
        name: "productId",
        type: "string"
      },
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "owner",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "metadata",
        type: "string"
      },
      {
        internalType: "string",
        name: "productId",
        type: "string"
      },
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256"
      }
    ],
    name: "transferWIRON",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "viewTransactions",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "productId",
            type: "string"
          },
          {
            internalType: "string",
            name: "name",
            type: "string"
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256"
          },
          {
            internalType: "string",
            name: "owner",
            type: "string"
          }
        ],
        internalType: "struct Merchant.Product[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "wContract",
    outputs: [
      {
        internalType: "contract wironContract",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "wironContractAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "withdrawWIRON",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
function fl({
  text: n,
  amount: t,
  id: e,
  product: r,
  ...i
}) {
  const [s, o] = fn(), [u, l] = fn(), [d, g] = fn(""), w = "0x3dE166740d64d522AbFDa77D9d878dfedfDEEEDE", [A, P] = fn("");
  qi(() => {
    (async () => {
      if (window.ethereum) {
        const L = "0x8f2806160077e9cd6532DBC6F1886082479290f6", j = window.ethereum, Q = new nl(j).getSigner(), ft = new bs(
          w,
          Fs,
          Q
        ), Kt = new bs(
          L,
          il,
          Q
        ), Ht = await Kt.getAddressById(e);
        l(Kt), g(Ht), o(ft);
      } else
        console.error("Ethereum provider not found");
    })();
  }, []), qi(() => {
    (async () => {
      try {
        if (window.ethereum) {
          const j = await window.ethereum.request({ method: "eth_accounts" });
          if (console.log(j, "accounts"), j && j.length !== 0) {
            const J = j[0];
            console.log("Found an authorized account:", J), P(J);
          } else
            P(""), console.log("No authorized accounts found!");
        }
      } catch (L) {
        console.log(L, "error");
      }
    })();
  }, [A, Fs]);
  const N = (R, L, j) => {
    console.log(R, L, "--testing"), window.ethereum && s && u && R && L && (u.transferWIRON(
      "0x664b8b9892b7560b356ef0f8d44cbd1f6628e388",
      R,
      L,
      j.productId,
      j.name,
      j.price,
      j.qty
    ), console.log("Amount sent"));
  }, { className: I, ...H } = i;
  return /* @__PURE__ */ jo(
    "button",
    {
      className: `${I}`,
      ...H,
      onClick: () => N(t, d, r),
      style: {
        display: "flex",
        alignItems: "center",
        border: "2px solid #000",
        borderRadius: "0.3rem",
        boxShadow: "2px 2px 0 0 #000",
        fontSize: "1.25rem",
        lineHeight: "1.75rem",
        cursor: "pointer",
        padding: "6px"
      },
      children: [
        /* @__PURE__ */ Vo(
          "img",
          {
            src: "https://ironfish.network/_next/static/media/hex-fish.ceace82e.svg",
            alt: "iron",
            style: {
              width: "31px",
              height: "20px",
              marginRight: "10px",
              color: "purple"
            }
          }
        ),
        n
      ]
    }
  );
}
export {
  fl as IronfishButton
};
