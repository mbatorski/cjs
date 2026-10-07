const m = {
  None: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Black: "\x1B[30m",
  Red: "\x1B[31m",
  Green: "\x1B[32m",
  Yellow: "\x1B[33m",
  Blue: "\x1B[34m",
  Magenta: "\x1B[35m",
  Cyan: "\x1B[36m",
  White: "\x1B[37m"
}, mt = {
  0: m.Black,
  1: m.Blue,
  2: m.Green,
  3: m.Cyan,
  4: m.Red,
  5: m.Magenta,
  6: m.Yellow,
  7: m.White,
  8: m.Dim,
  9: m.Blue,
  a: m.Green,
  b: m.Cyan,
  c: m.Red,
  d: m.Magenta,
  e: m.Yellow,
  f: m.White,
  l: m.Bright,
  n: m.Underscore,
  r: m.None
}, _ = {
  /**
   * `&0` black
   * `&1` dark blue
   * `&2` dark green
   * `&3` dark aqua
   * `&4` dark red
   * `&5` dark purple
   * `&6` gold
   * `&7` gray
   * `&8` dark gray
   * `&9` blue
   * `&a` green (lime)
   * `&b` aqua
   * `&c` red
   * `&d` light purple
   * `&e` yellow
   * `&f` white
   * `&r` reset
   * `&l` bold
   * `&n` underline
   * @param text 
   * @returns 
   */
  format(n) {
    return n.replace(/&([0-9a-flnr])/gi, (t, e) => mt[e.toLowerCase()] ?? "") + m.None;
  }
}, Y = "lazy:", H = "[CJS]";
_.format(`&e&n${H}&r `);
const pt = _.format(`&c&n${H}&r `), gt = _.format(`&c&a${H}&r `), yt = _.format(`&c&b${H}&r `), F = "cjs:render", Z = "cjsroot", B = "cjs-style", bt = "cjs-style-keyframes", N = "cjsevent-", X = "cjs_", z = "cjs-id", Ct = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", wt = "abcdefghijklmnopqrstuvwxyz0123456789", A = {
  getRandom(n, t = !0) {
    let e = "";
    const s = t ? wt : Ct, r = s.length;
    let a = 0;
    for (; a < n; )
      e += s.charAt(Math.floor(Math.random() * r)), a += 1;
    if (t) {
      const i = (c) => !isNaN(Number(c.substring(0, 1)));
      for (; i(e); )
        e = this.getRandom(n, t);
    }
    return e;
  },
  /**
   * Provides similarity of two strings (float precision)
   * @author https://stackoverflow.com/users/6145207/overlord1234
   */
  getSimilarity(n, t) {
    function e(i, c) {
      i = i.toLowerCase(), c = c.toLowerCase();
      let o = new Array();
      for (let l = 0; l <= i.length; l++) {
        let u = l;
        for (let h = 0; h <= c.length; h++)
          if (l == 0)
            o[h] = h;
          else if (h > 0) {
            let d = o[h - 1];
            i.charAt(l - 1) != c.charAt(h - 1) && (d = Math.min(Math.min(d, u), o[h]) + 1), o[h - 1] = u, u = d;
          }
        l > 0 && (o[c.length] = u);
      }
      return o[c.length];
    }
    let s = n, r = t;
    n.length < t.length && (s = t, r = n);
    let a = s.length;
    return a == 0 ? 1 : (a - e(s, r)) / parseFloat(`${a}`);
  },
  /**
   * Creates a unique numeric ID from a string
   * (DJB2 hash)
   */
  getHash(n) {
    let t = 5381;
    for (let e = 0; e < n.length; e++) {
      const s = n.charCodeAt(e);
      t = t * 33 ^ s;
    }
    return t >>> 0;
  },
  /**
   * Remove HTML tags from the input, keeping inner content
   */
  removeHtmlTags(n) {
    return n.replace(/<[^>]*>/g, "");
  },
  /**
   * Capitalizes first letter of the string
   */
  capitalize(n) {
    return n && n.charAt(0).toUpperCase() + n.slice(1);
  },
  kebabCaseToCamelStyle(n) {
    return n.replace(/-([a-z])/g, (t, e) => e.toUpperCase());
  },
  snakeStyleToCamelCase(n) {
    return n.replace(/_([a-z])/g, (t, e) => e.toUpperCase());
  },
  camelStyleToKebabCase(n) {
    return n.replace(/([A-Z])/g, "-$1").toLowerCase();
  },
  camelStyleToSnakeStyle(n) {
    return n.replace(/([A-Z])/g, "_$1").toLowerCase();
  }
}, E = new class {
  #t = /* @__PURE__ */ new Map();
  #e = /* @__PURE__ */ new Map();
  #s = () => {
    let t = null;
    for (; t === null || this.#t.has(t); )
      t = A.getRandom(16);
    return t;
  };
  constructor() {
  }
  /**
   * @param eventCallback 
   * @returns attribute that have to applied to element, to properly detect element to add the click event
   */
  addCallback(t) {
    const e = this.#s();
    return this.#t.set(e, t), ` ${N}${e}`;
  }
  addOnAddElementCallback(t) {
    const e = this.#s();
    return this.#e.set(e, { callback: t }), ` ${N}${e}`;
  }
  hasCallback(t) {
    return this.#t.has(t);
  }
  getCallback(t) {
    return this.#t.get(t);
  }
  hasOnAddElementCallback(t) {
    return this.#e.has(t);
  }
  getOnAddElementCallback(t) {
    return this.#e.get(t);
  }
}();
function L(n) {
  return E.addOnAddElementCallback(n);
}
function Bt(n) {
  return L((t) => {
    document.addEventListener("keydown", (e) => {
      (e.key === "Escape" || e.key == "Esc") && n(t);
    });
  });
}
function qt(n, t = 500) {
  return L((e) => {
    let s = 0;
    const r = () => {
      clearTimeout(s);
    }, a = () => {
      s = setTimeout(() => {
        n(e);
      }, t);
    };
    e.source.addEventListener("mousedown", a), e.source.addEventListener("touchstart", a), e.source.addEventListener("mouseup", r), e.source.addEventListener("mousemove", r), e.source.addEventListener("touchend", r), e.source.addEventListener("touchcancel", r), e.source.addEventListener("touchmove", r);
  });
}
function Dt(n) {
  return E.addCallback({
    eventName: "click",
    callback: (t) => {
      const { event: e, source: s } = t;
      document.body.contains(s) && s !== e.target && !s.contains(e.target) && n(t);
    },
    applyToWindow: !0
  });
}
function Yt(n) {
  return L((t) => {
    t.source.addEventListener("scroll", () => {
      t.source.scrollTop + t.source.clientHeight >= t.source.scrollHeight && n(t);
    });
  });
}
function Ft(n, t = 10) {
  return L((e) => {
    let s = 0, r = 0;
    const a = (o) => {
      const l = o, u = "touches" in l ? l.touches[0].clientY : l.clientY;
      r = u, s = u;
    }, i = (o) => {
      const l = o, u = "touches" in l ? l.touches[0].clientY : l.clientY, h = u + 1 >= r, d = u - s;
      if (!h) {
        s = 0;
        return;
      }
      d > t && (n(e), s = 0), r = u;
    }, { source: c } = e;
    c.addEventListener("mousedown", a), c.addEventListener("touchstart", a), c.addEventListener("mousemove", i), c.addEventListener("touchmove", i);
  });
}
function Xt(n, t = 50, e = 50) {
  return L((s) => {
    let r = { startX: 0, startY: 0, lastX: 0, lastY: 0 };
    const a = (o) => {
      const l = o, u = "touches" in l ? l.touches[0].clientX : l.clientX, h = "touches" in l ? l.touches[0].clientY : l.clientY;
      r.lastX = u, r.startX = u, r.lastY = h, r.startY = h;
    }, i = (o) => {
      const l = o, u = "touches" in l ? l.touches[0].clientX : l.clientX, h = "touches" in l ? l.touches[0].clientY : l.clientY, d = u - 1 <= r.lastX, f = u - r.startX, p = h - r.startY;
      if (e !== -1 && e < Math.abs(p)) {
        r.startX = 0;
        return;
      }
      if (!d) {
        r.startX = 0;
        return;
      }
      f < -1 * t && (n(s), r.startX = 0), r.lastX = u;
    }, { source: c } = s;
    c.addEventListener("mousedown", a), c.addEventListener("touchstart", a), c.addEventListener("mousemove", i), c.addEventListener("touchmove", i);
  });
}
function Vt(n, t = 50, e = 50) {
  return L((s) => {
    let r = { startX: 0, startY: 0, lastX: 0, lastY: 0 };
    const a = (o) => {
      const l = o, u = "touches" in l ? l.touches[0].clientX : l.clientX, h = "touches" in l ? l.touches[0].clientY : l.clientY;
      r.lastX = u, r.startX = u, r.lastY = h, r.startY = h;
    }, i = (o) => {
      const l = o, u = "touches" in l ? l.touches[0].clientX : l.clientX, h = "touches" in l ? l.touches[0].clientY : l.clientY, d = u + 1 >= r.lastX, f = u - r.startX, p = h - r.startY;
      if (e !== -1 && e < Math.abs(p)) {
        r.startX = 0;
        return;
      }
      if (!d) {
        r.startX = 0;
        return;
      }
      f > t && (n(s), r.startX = 0), r.lastX = u;
    }, { source: c } = s;
    c.addEventListener("mousedown", a), c.addEventListener("touchstart", a), c.addEventListener("mousemove", i), c.addEventListener("touchmove", i);
  });
}
function Ut(n, t = 10) {
  return L((e) => {
    let s = 0, r = 0;
    const a = (o) => {
      const l = o, u = "touches" in l ? l.touches[0].clientY : l.clientY;
      r = u, s = u;
    }, i = (o) => {
      const l = o, u = "touches" in l ? l.touches[0].clientY : l.clientY, h = u - 1 <= r, d = u - s;
      if (!h) {
        s = 0;
        return;
      }
      d < -1 * t && (n(e), s = 0), r = u;
    }, { source: c } = e;
    c.addEventListener("mousedown", a), c.addEventListener("touchstart", a), c.addEventListener("mousemove", i), c.addEventListener("touchmove", i);
  });
}
const w = (n, t, e = !1) => E.addCallback({
  eventName: n,
  callback: t,
  applyToWindow: e
}), zt = (n) => w("change", n), Wt = (n) => w("click", n), Kt = (n) => w("dblclick", n), Gt = (n) => w("focus", n), Jt = (n) => w("focusout", n), Zt = (n) => w("input", n), Qt = (n) => w("mouseenter", n), te = (n) => w("mouseleave", n), ee = (n) => w("mousemove", n), se = (n) => w("resize", n, !0), ne = (n) => w("scroll", n), re = (n) => w("touchmove", n);
class at {
  /**
   * String to analyze input
   */
  constructor(t) {
    this.comment = {
      multipleLineEnabled: !0,
      opening: "<!--",
      closing: "-->",
      ignoreInString: !0,
      singleLineEnabled: !1,
      singleLine: "//"
    }, this.stringChars = ['"', "'"], this.loop = {
      comment: {
        multipleLineOpened: !1,
        singleLineOpened: !1
      },
      string: {
        openingChar: "",
        opened: !1
      },
      skipChars: 0,
      char: "",
      text: ""
    }, this.source = t;
  }
  _isOutOfBounds(t, e) {
    return t.length <= e + 1;
  }
  /**
   * Checks if string chars is one by one next chars in the array
   */
  _matchNextChars(t, e, s = !1) {
    if (t === void 0) return !1;
    const r = t.split("");
    s && console.log(
      `Comparsion: "${t}" with "${e.slice(0, t.length).join("")}"`
    );
    const a = [], i = () => {
      s && console.log(
        "Char by char comparsion:",
        a.map(
          (c) => `"${c.matchChar}" ${c.matchChar === c.arrayChar ? "==" : "!="} "${c.arrayChar}"`
        ).join(", ")
      );
    };
    for (let c = 0; c < r.length; c++) {
      const o = r[c], l = c;
      if (this._isOutOfBounds(e, l))
        return i(), !1;
      const u = e[l];
      if (a.push({ matchChar: o, arrayChar: u }), u !== o)
        return i(), !1;
    }
    return i(), !0;
  }
  /**
   * Reads string ignoring the comments sections with checks if the comment is in string
   */
  _read(t = () => {
  }) {
    const { comment: e, loop: s } = this, r = this.source.split("");
    let a = "";
    for (let o = 0; o < r.length; o++) {
      if (s.char = r[o], s.skipChars > 0) {
        s.skipChars--;
        continue;
      }
      if (e.multipleLineEnabled && this._matchNextChars(e.closing, r.slice(o)) && s.comment.multipleLineOpened) {
        s.comment.multipleLineOpened = !1, s.skipChars = e.closing.length - 1;
        continue;
      }
      if (e.singleLineEnabled && s.comment.singleLineOpened && this._matchNextChars(`
`, r.slice(o))) {
        s.comment.singleLineOpened = !1, s.skipChars = 1;
        continue;
      }
      if (!(s.comment.multipleLineOpened || s.comment.singleLineOpened)) {
        if (s.string.opened && s.char === s.string.openingChar) {
          s.string.opened = !1, s.string.openingChar = "", a += s.char;
          continue;
        }
        if (this.stringChars.includes(s.char) && !s.string.opened && (s.string.opened = !0, s.string.openingChar = s.char), e.singleLineEnabled && this._matchNextChars(e.singleLine, r.slice(o)) && !s.string.opened) {
          s.comment.singleLineOpened = !0;
          continue;
        }
        if (e.multipleLineEnabled && this._matchNextChars(e.opening, r.slice(o))) {
          if (s.string.multipleLineOpened && e.ignoreInString) {
            a += s.char;
            continue;
          }
          s.comment.multipleLineOpened = !0;
          continue;
        }
        a += s.char;
      }
    }
    const i = a.split(""), c = (o, l) => {
      t(o, l, (u, h = !1) => u === void 0 ? !1 : this._matchNextChars(u, i.slice(l), h));
    };
    for (let o = 0; o < i.length; o++) {
      const l = i[o];
      if (s.string.opened && l === s.string.openingChar) {
        s.string.opened = !1, s.string.openingChar = "", c(l, o);
        continue;
      }
      if (this.stringChars.includes(l) && !s.string.opened) {
        s.string.opened = !0, s.string.openingChar = l, c(l, o);
        continue;
      }
      c(l, o);
    }
    return a;
  }
}
class Q extends at {
  /**
   * Css text
   */
  constructor(t) {
    super(t), this.comment = {
      multipleLineEnabled: !0,
      opening: "/*",
      closing: "*/",
      ignoreInString: !0,
      singleLineEnabled: !1,
      singleLine: "//"
    };
  }
  /**
   * Provides selector with its contents
   */
  read() {
    const t = {};
    let e = !1, s = 0, r = "", a = "";
    const i = (c) => c.replaceAll(`
`, "");
    return this._read((c) => {
      const o = this.loop;
      if (c === "{" && !e && !o.string.opened) {
        e = !0, a = i(r), r = "", a in t || (t[a] = "");
        return;
      }
      if (!e) {
        r += c;
        return;
      }
      if (c === "{" && e && !o.string.opened && s++, c === "}" && s > 0 && !o.string.opened) {
        s--, r += c;
        return;
      }
      if (c === "}" && s === 0 && !o.string.opened) {
        const l = i(r);
        t[a] = t[a] ? `${t[a]};${l}` : l, a = "", r = "", e = !1;
        return;
      }
      r += c;
    }), t;
  }
}
class St extends at {
  /**
   * Css selector style
   */
  constructor(t) {
    super(t), this.comment = {
      multipleLineEnabled: !0,
      opening: "/*",
      closing: "*/",
      ignoreInString: !0,
      singleLineEnabled: !1,
      singleLine: "//"
    };
  }
  /**
   * Returns properties names and its values inside the css selector
   */
  read() {
    const t = (r) => r.replaceAll(`
`, "");
    this.source = t(this.source);
    const e = {}, s = {
      name: "",
      value: "",
      reading: "name",
      _parse: () => {
        s.name = s.name.replaceAll(" ", ""), s.value = s.value.trim();
      },
      _reset: () => {
        s.name = "", s.value = "", s.reading = "name";
      }
    };
    return this._read((r) => {
      const { loop: a } = this;
      if (r === ";" && !a.string.opened && s.reading === "value") {
        s._parse();
        const { name: u, value: h } = s;
        e[u] = h, s._reset();
        return;
      }
      if (r === ":" && !a.string.opened && s.reading === "name") {
        s.reading = "value";
        return;
      }
      if (s.reading === "value") {
        s.value += r;
        return;
      }
      s.reading === "name" && (s.name += r);
    }), e;
  }
}
const vt = {
  processSelector(n, t = "width") {
    const e = n.split(" "), s = e[1], r = e[2], a = {}, i = (() => {
      let l = "", u = "";
      for (const h of r.split(""))
        isNaN(Number(h)) ? u += h : l += h;
      return { number: parseInt(l), unit: u };
    })(), { number: c, unit: o } = i;
    return a["<"] = `max-${t}: ${c - 1}${o}`, a["<="] = `max-${t}: ${c}${o}`, a[">"] = `min-${t}: ${c + 1}${o}`, a[">="] = `min-${t}: ${c}${o}`, `@media only screen and (${a[s]})`;
  }
}, tt = {
  "backdrop-filter": ["-webkit-backdrop-filter"]
}, kt = {
  processComponentStyle(n, t) {
    const e = new Q(t).read();
    let s = [];
    const r = (i, c) => {
      i = i.trim();
      const o = `${i} { ${c} }`;
      return i.startsWith(":") ? [o] : i.split(",").map((l) => {
        const u = l.trim().substring(0, 1), h = u === "." || u === "#", d = [
          `${n}${h ? "" : " "}${l.trim()}`
        ];
        if (!h) {
          const f = l.split(" "), p = f[0], S = f.slice(1).join(" "), g = p.includes(":") ? p.slice(p.indexOf(":")) : "", b = p.replace(g, ""), v = `${g} ${S}`, j = v.split(",").map((O) => O.trim()).slice(1), R = v.includes(",") ? j.map((O) => {
            const C = [
              `${b}${n}`,
              `${O.replace(b, "")}`
            ], T = !C[1].startsWith(":");
            return C.join(T ? " " : "");
          }) : "";
          v.includes(",") ? d.push(
            `${b}${n}${v.replace(
              j,
              R
            )}`
          ) : d.push(`${b}${n}${v}`);
        }
        return d;
      }).map((l) => `${l.join(", ")} { ${c} }`).flat();
    }, a = (i, c) => {
      const o = new Q(c).read(), l = [];
      for (const [u, h] of Object.entries(o)) {
        const d = new St(h).read();
        for (const [p, S] of Object.entries(d))
          if (p in tt)
            for (const g of tt[p])
              g in d || (d[g] = S);
        const f = r(u, h);
        l.push(...f);
      }
      return l;
    };
    for (const [i, c] of Object.entries(e)) {
      if (c.trim() === "") continue;
      const o = i.trim(), l = o.startsWith("@media"), u = o.startsWith("@keyframes"), h = o.startsWith("@range"), d = o.startsWith("@width"), f = o.startsWith("@height");
      if (h || d || f) {
        const g = `${vt.processSelector(o, f ? "height" : "width")} { ${a(o, c).join(`
`)} }`;
        s.push(g);
        continue;
      }
      if (l) {
        const S = `${o} { ${a(
          o,
          c
        ).join(`
`)} }`;
        s.push(S);
        continue;
      }
      if (u) {
        s.push(`${o} { ${c} }`);
        continue;
      }
      const p = r(o, c);
      s.push(...p);
    }
    return s.join(" ").replaceAll(`
`, "");
  }
}, y = {
  info(n, ...t) {
    console.info(_.format(`${yt}${n}`), t);
  },
  success(n, ...t) {
    console.log(_.format(`${gt}${n}`), t);
  },
  error(n, ...t) {
    console.warn(_.format(`${pt}${n}`), t);
  }
}, $ = {
  HTMLToElement(n) {
    const t = document.createElement("template");
    t.innerHTML = n.trim();
    const e = t.content.firstElementChild;
    if (!e)
      throw new Error("htmlToElement: Provided HTML produced no element.");
    return e;
  },
  getAttributesStartingWith(n, t) {
    if (!n.attributes) return [];
    const e = [];
    for (const s of Array.from(n.attributes)) {
      const r = s.name;
      r.startsWith(t) && e.push(r);
    }
    return e;
  }
}, I = {
  injectAttribute(n, t, e) {
    const s = n.length;
    let r = 0;
    for (; r < s && n.charCodeAt(r) <= 32; ) r++;
    if (n[r] !== "<") return n;
    const a = r, i = n.indexOf(">", a);
    if (i === -1) return n;
    let c = n.slice(a, i);
    const o = new RegExp(
      `\\b${t}\\s*=\\s*(['"])(.*?)\\1`,
      "i"
    ), l = c.match(o);
    let u;
    if (l) {
      const h = l[0], d = l[1], f = l[2].trim(), p = f.length === 0 ? e : f.endsWith(";") ? f + e : t === "style" ? f + "; " + e : f + " " + e, S = `${t}=${d}${p}${d}`;
      u = c.replace(h, S);
    } else {
      const h = c.endsWith("/") ? c.length - 1 : c.length;
      u = c.slice(0, h) + ` ${t}="${e}"` + c.slice(h);
    }
    return n.slice(0, a) + u + n.slice(i);
  }
}, k = {
  /**
   * Returns values from keys if the value is not an object
   */
  getNonObjectValues(n) {
    const t = (e) => {
      if (!e || typeof e != "object") return [e];
      const s = [];
      for (const r of Object.keys(e)) {
        const a = e[r], i = typeof a == "object" && a !== null && !Array.isArray(a);
        s.push(...i ? t(a) : [a]);
      }
      return s;
    };
    return t(n);
  },
  /**
   * Deep merges two objects
   * object2 overwrites object1 by default
   */
  join(n, t, e = !0) {
    const s = (r, a) => {
      if (typeof r != "object" || r === null)
        return a ?? r;
      const i = Array.isArray(r) ? [...r] : {}, c = /* @__PURE__ */ new Set([
        ...Object.keys(r ?? {}),
        ...Object.keys(a ?? {})
      ]);
      for (const o of c) {
        if (!(o in a)) {
          i[o] = r?.[o];
          continue;
        }
        !e && o in r ? i[o] = r[o] : i[o] = s(r?.[o], a?.[o]);
      }
      return i;
    };
    return s(n, t);
  },
  /**
   * Deep copy of an object
   */
  copy(n) {
    const t = (e) => {
      if (e === null) return null;
      const s = typeof e != "object", r = typeof HTMLElement < "u" && (e instanceof HTMLElement || e instanceof Node);
      if (s || r) return e;
      if (Array.isArray(e))
        return e.map((i) => t(i));
      const a = {};
      for (const [i, c] of Object.entries(e))
        a[i] = t(c);
      return a;
    };
    return t(n);
  },
  /**
   * Removes keys that have nullable / empty values (mutates object)
   */
  filterOutNullableValues(n) {
    for (const [t, e] of Object.entries(n)) {
      const s = typeof e == "object" && e !== null && !Array.isArray(e) && Object.keys(e).length === 0;
      (e == null || Array.isArray(e) && e.length === 0 || typeof e == "string" && e.trim() === "" || s) && delete n[t];
    }
    return n;
  },
  isEmpty(n) {
    return !n || Object.keys(n).length === 0;
  }
}, ct = {
  withCredentials: !1
};
class V {
  constructor(t, e, s) {
    this.statusCode = t, this.response = e, this.networkError = s;
  }
  getStatusCode() {
    return this.statusCode;
  }
  isError() {
    return !String(this.statusCode).startsWith("2") || this.networkError;
  }
  isNetworkError() {
    return this.networkError;
  }
  text() {
    return this.response;
  }
  json() {
    return typeof this.response == "string" ? JSON.parse(this.response) : this.response;
  }
  blob() {
    return this.response;
  }
  toObjectURL() {
    return (window.URL || window.webkitURL).createObjectURL(this.response);
  }
  getTranslation() {
    return {
      200: "Pomyślnie wykonano operację",
      400: "Niepoprawne dane",
      401: "Brak autoryzacji",
      403: "Brak uprawnień",
      404: "Nie znaleziono",
      500: "Błąd serwera"
    }[this.statusCode] ?? (this.isError() ? "Błąd wykonania operacji" : "Pomyślnie wykonano operację");
  }
  onStatus(t, e) {
    this.statusCode === t && e();
  }
}
class Et {
  constructor(t, e) {
    this.url = t, this.method = e, this.onStartCallback = () => {
    }, this.onEndCallback = () => {
    }, this.onErrorCallback = () => {
    }, this.onSuccessCallback = () => {
    }, this.onProgressCallback = () => {
    }, this.cachedKeyPrefix = "cjsrequest-", this.query = {}, this.body = {}, this.headers = {}, this.files = {}, this.bodyKey = null, this.cooldown = 0, this.cacheSeconds = 0, this.responseType = null;
  }
  getCacheKey() {
    return this.cachedKeyPrefix + JSON.stringify(this.body) + this.bodyKey + JSON.stringify(this.query) + JSON.stringify(this.headers);
  }
  getCached() {
    if (typeof localStorage > "u") return null;
    const t = localStorage.getItem(this.getCacheKey());
    if (!t) return null;
    const e = JSON.parse(t);
    return Date.now() > e.expiryTimestamp ? null : e;
  }
  setCached(t, e) {
    const s = (/* @__PURE__ */ new Date()).getTime() + 1e3 * e;
    localStorage.setItem(this.getCacheKey(), JSON.stringify({ data: t, expiryTimestamp: s }));
  }
  buildUrl() {
    const t = Object.keys(this.query);
    if (t.length === 0) return this.url;
    const e = t.map((s) => `${encodeURIComponent(s)}=${encodeURIComponent(this.query[s])}`).join("&");
    return `${this.url}?${e}`;
  }
  sendBodyOrFiles(t) {
    const e = Object.keys(this.body).length > 0, s = Object.keys(this.files).length > 0;
    if (ct.withCredentials && (t.withCredentials = !0), e || s)
      if (e && !s)
        t.setRequestHeader("Content-Type", "application/json"), t.send(JSON.stringify(this.body));
      else {
        const r = new FormData();
        if (Object.entries(this.files).forEach(([a, i]) => {
          i instanceof FileList ? Array.from(i).forEach(
            (c) => r.append(a, c)
          ) : r.append(a, i);
        }), e && !this.bodyKey) {
          console.error("BodyKey required when sending files + body"), t.send(r);
          return;
        }
        e && this.bodyKey && r.append(this.bodyKey, JSON.stringify(this.body)), t.send(r);
      }
    else
      t.send();
  }
  setQuery(t) {
    return this.query = t, this;
  }
  setHeaders(t) {
    return this.headers = t, this;
  }
  setBody(t) {
    return this.body = t, this;
  }
  setFiles(t) {
    return this.files = t, this;
  }
  setBodyKey(t) {
    return this.bodyKey = t, this;
  }
  setCacheSeconds(t) {
    return this.cacheSeconds = t, this;
  }
  setCacheMinutes(t) {
    return this.cacheSeconds = t * 60, this;
  }
  setCacheHours(t) {
    return this.cacheSeconds = t * 60 * 60, this;
  }
  setResponseType(t) {
    return this.responseType = t, this;
  }
  onStart(t) {
    return this.onStartCallback = t, this;
  }
  onEnd(t) {
    return this.onEndCallback = t, this;
  }
  onError(t) {
    return this.onErrorCallback = t, this;
  }
  onSuccess(t) {
    return this.onStartCallback = t, this;
  }
  onProgress(t) {
    return this.onProgressCallback = t, this;
  }
  async doRequest() {
    if (this.cacheSeconds > 0) {
      const s = this.getCached();
      if (s)
        return new V(
          s.statusCode,
          s.data,
          !1
        );
    }
    this.cooldown > 0 && await new Promise((s) => setTimeout(s, this.cooldown));
    const t = new XMLHttpRequest();
    return t.open(this.method.toUpperCase(), this.buildUrl(), !0), this.responseType && (t.responseType = this.responseType), Object.entries(this.headers).forEach(([s, r]) => {
      t.setRequestHeader(s, String(r));
    }), this.onStartCallback(), await new Promise((s) => {
      t.onreadystatechange = () => {
        if (t.readyState !== 4) return;
        const r = new V(
          t.status,
          t.response,
          t.status === 0
        );
        this.onEndCallback(r), r.isError() ? this.onErrorCallback(r) : this.onSuccessCallback(r), this.cacheSeconds > 0 && this.setCached({
          data: t.response,
          statusCode: t.status
        }, this.cacheSeconds), s(r);
      }, t.upload.onprogress = (r) => {
        if (r.lengthComputable) {
          let a = r.loaded / r.total * 100;
          this.onProgressCallback(a, r.loaded, r.total, r);
        }
      }, t.onerror = () => {
        const r = new V(0, null, !0);
        this.onErrorCallback(r), s(null);
      }, this.sendBodyOrFiles(t);
    });
  }
}
const ie = {
  clearCache() {
    for (let n = 0; n < localStorage.length; n++) {
      const t = localStorage.key(n);
      t?.startsWith("cjsrequest-") && localStorage.removeItem(t);
    }
  },
  setIncludeCredentials(n) {
    ct.withCredentials = n;
  }
};
class $t {
  constructor(t) {
    this.components = Array.from(t);
  }
  call(t) {
    this.components.forEach((e) => t(e));
  }
  _add(t) {
    this.components.push(t);
  }
  /**
   * Sets the class name for all components
   */
  set className(t) {
    this.call((e) => e.className = t);
  }
  /**
   * Returns the value of first component className
   */
  get className() {
    return this.components.length === 0 ? null : this.components[0].className;
  }
  /**
   * classList wrapper for all components
   */
  get classList() {
    return {
      add: (...t) => {
        this.call((e) => e.classList.add(...t));
      },
      remove: (...t) => {
        this.call((e) => e.classList.remove(...t));
      },
      contains: (t) => this.components.every((e) => e.classList.contains(t)),
      toggle: (t, e) => {
        this.call((s) => s.classList.toggle(t, e));
      },
      addExcept: (t, e) => {
        this.call((s) => {
          s !== e && s.classList.add(t);
        });
      },
      removeExcept: (t, e) => {
        this.call((s) => {
          s !== e && s.classList.remove(t);
        });
      },
      addOnlyRemoveOthers: (t, e) => {
        this.call((s) => {
          s.classList[s === e ? "add" : "remove"](t);
        });
      },
      removeOnlyAddOthers: (t, e) => {
        this.call((s) => {
          s.classList[s === e ? "remove" : "add"](t);
        });
      }
    };
  }
}
class U {
  #t;
  constructor(t) {
    this.#t = t;
  }
  #e = {
    radio: (t) => t.checked ? t.value : null,
    checkbox: (t) => t.checked,
    file: (t) => t.files,
    number: (t) => t.value !== "" ? Number(t.value) : null,
    "*": (t) => t.value
  };
  serialize(t = {}) {
    const e = Array.from(this.#t.querySelectorAll("select")), s = Array.from(this.#t.querySelectorAll("input")), r = Array.from(this.#t.querySelectorAll("textarea")), a = [...e, ...s, ...r], i = {};
    for (let c = 0; c < a.length; c++) {
      const o = a[c], l = o.getAttribute("name");
      if (!l && !t.includeNoNames) continue;
      const u = o.getAttribute("type") ?? "*", d = (this.#e[u] ?? this.#e["*"])(o), f = l ?? c;
      i[f] = d;
    }
    if (t.checkboxesReadType === "array") {
      const c = s.filter((o) => o.type === "checkbox");
      for (const o of c) {
        if (!o.name) {
          y.error("Checkbox doesn't have a name attribute, but it's required when options.checkboxesReadType === array", o);
          continue;
        }
        const l = o.name;
        (!(l in i) || !Array.isArray(i[l])) && (i[l] = []), o.checked && i[l].push(o.value);
      }
    }
    return i;
  }
  /**
   * The **`checkValidity()`** method of the HTMLFormElement interface returns a boolean value which indicates if all associated controls meet any constraint validation rules applied to them. The method also fires an invalid event on each invalid element, but not on the form element itself. Because there's no default browser behavior for checkValidity(), canceling this invalid event has no effect.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/checkValidity)
   */
  checkValidity() {
    return this.#t.checkValidity();
  }
  /**
   * The **`reportValidity()`** method of the HTMLFormElement interface performs the same validity checking steps as the checkValidity() method. In addition, for each invalid event that was fired and not canceled, the browser displays the problem to the user.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/reportValidity)
   */
  reportValidity() {
    return this.#t.reportValidity();
  }
  /**
   * The **`HTMLFormElement.reset()`** method restores a form element's default values. This method does the same thing as clicking the form's <input type="reset"> control.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/reset)
   */
  reset() {
    return this.#t.reset();
  }
}
const et = /* @__PURE__ */ new Set(), P = class P {
  /**
   * / ⚪ ------------ CONSTRUCTOR SCOPE ------------ ⚪ /
   */
  constructor(t = null, e = null) {
    this.__events = {}, this._cssStyle = null, this._additionalStyle = {}, this._defaultData = {}, this._preSetData = {}, this._id = null, this._customId = null, this.element = null, t && (this._preSetData = k.copy(t)), e && (this._additionalStyle = k.copy(e)), this.createId();
  }
  /**
   * / 🔴 ------------ PRIVATE SCOPE ------------ 🔴 /
   */
  /** Creates id or pulls it from the map */
  createId() {
    const t = this.constructor._prototypesData, e = Array.from(t.values()).map((s) => s.id);
    if (t.has(this.constructor))
      this._id = t.get(this.constructor).id;
    else {
      for (this._id = null; this._id === null || e.includes(this._id); )
        this._id = A.getRandom(6);
      t.set(this.constructor, { id: this._id });
    }
  }
  /** Passes processed component style to global root style */
  injectRootStyle() {
    const t = this.constructor._bundledCss;
    if (t !== null) {
      this.appendRootStyle(t);
      return;
    }
    this._cssStyle && this.fetchRootStyle(this._cssStyle);
  }
  /** Fetches the component style from the path set in {@link _cssStyle} */
  async fetchRootStyle(t) {
    const e = t.startsWith("./") ? t.slice(2) : t, s = await new Et(e, "get").doRequest();
    if (s.isError()) {
      y.error(`Error occurred while importing style (&e${e}&r)`);
      return;
    }
    this.appendRootStyle(s.text());
  }
  /** Scopes the css to the component and appends it to the global root style */
  appendRootStyle(t) {
    const e = document.head.querySelector(`[id="${B}"]`);
    e && e.append(kt.processComponentStyle(`[${X}*="${this._id}"]`, t));
  }
  /** Provides the HTML string for the component */
  getHtml() {
    let t = this._template();
    const e = this.constructor._prototypesData.get(this.constructor), s = [];
    if (et.has(this._id) || (this.injectRootStyle(), et.add(this._id)), k.isEmpty(this._additionalStyle) || (t = I.injectAttribute(
      t,
      "style",
      Object.entries(this._additionalStyle).map((r) => `${A.camelStyleToKebabCase(r[0])}: ${r[1]}`).join("; ")
    )), e && "fillHeightData" in e) {
      const { maxHeight: r, offset: a } = e.fillHeightData, i = (c) => {
        const { source: o } = c;
        o.style.height = `${r !== void 0 && window.innerHeight > r ? r : window.innerHeight + a}px`;
      };
      s.push((c) => {
        window.addEventListener("resize", (o) => i(c)), i(c);
      });
    }
    return t = I.injectAttribute(t, L((r) => {
      s.forEach((a) => a(r)), this.element = r.source;
    }), ""), t = I.injectAttribute(t, X, this._id), this._customId !== null && (t = I.injectAttribute(t, z, this._customId)), t;
  }
  getConstructorClass() {
    return this.constructor;
  }
  /** Builds the DOM selector used to target the component's rendered elements. */
  getSelector() {
    return this._customId !== null ? `[${z}="${this._customId}"]` : `[${X}="${this._id}"]`;
  }
  /**
   * 
   * / 🟢 ------------ PUBLIC SCOPE ------------ 🟢 /
   * 
   */
  _addToPrototypeData(t) {
    const e = this.constructor._prototypesData;
    if (e.has(this.constructor)) {
      const s = e.get(this.constructor);
      e.set(this.constructor, { ...s, ...t });
      return;
    }
    e.set(this.constructor, t);
  }
  /** Function that provides template for base html structure */
  _template() {
    return "";
  }
  /** Function that provides actions for the component */
  _events() {
    return {};
  }
  /** Functions that creates an type for component events */
  _wrapEvents(t) {
    return t;
  }
  /** Provides auto fill height of the component to the actual screen height (with optional offsets) */
  fillHeight(t = 0, e = void 0) {
    this._addToPrototypeData({ fillHeightData: { offset: t, maxHeight: e } });
  }
  getForms() {
    const t = this.element;
    return t ? Array.from(
      t.querySelectorAll("form"),
      (e) => new U(e)
    ) : null;
  }
  getComponents() {
    return new $t(document.body.querySelectorAll(this.getSelector()));
  }
  /** Assigns a custom id to the component so it can be targeted later through {@link CjsComponent.getId} */
  withId(t) {
    return this._customId = t == null ? null : String(t), this;
  }
  /** Sets the data for the component */
  withData(t = null) {
    return t && (this._preSetData = k.copy(t)), this;
  }
  /** Sets additional style for the component */
  withStyle(t) {
    return this._additionalStyle = k.copy(t), this;
  }
  /** Example: render HTML string */
  render(t = null) {
    const e = new (this.getConstructorClass())(t);
    return e._customId = this._customId, e.getHtml();
  }
  /** Example: visualise component as element */
  visualise(t = null) {
    return t && (this._preSetData = k.copy(t)), $.HTMLToElement(this.getHtml());
  }
  /** Example: querySelector logic */
  querySelector(t) {
    return this.getFirst().querySelector(t);
  }
  /** Get first occurrence of the CjsComponent as HTMLElement */
  getFirst() {
    return document.body.querySelector(this.getSelector());
  }
  /** Get all occurrences of the CjsComponent as HTMLElement */
  getAll() {
    return document.body.querySelectorAll(this.getSelector());
  }
  /**
   * Re-renders every rendered occurrence of the component in the DOM.
   *
   * When a custom id was set through {@link withId} / {@link CjsComponent.getId} only the
   * matching occurrences are re-rendered, otherwise every occurrence of the class is updated.
   * If multiple components match, each one is looped through and replaced individually.
   */
  reRender(t = null) {
    return t && (this._preSetData = k.copy(t)), this.getAll().forEach((s) => {
      const r = $.HTMLToElement(this.getHtml());
      s.replaceWith(r);
    }), this;
  }
  /** Loads CjsLayout inside CjsComponent */
  loadLayout(t) {
    for (const e of this.getAll()) {
      e.innerHTML = "", t._onBeforeLoadCallback && t._onBeforeLoadCallback();
      for (const s of t.visualise())
        e.appendChild(s);
    }
  }
  /**
   * 
   * / 🔵 ------------ GETTERS SCOPE ------------ 🔵 /
   * 
   */
  /** Provides merged component data including default data and pre-set data */
  get data() {
    return k.copy(
      k.join(this._defaultData, this._preSetData)
    );
  }
  /** Provides all form elements within the component as CjsForm instances */
  get forms() {
    return Array.from(
      $.HTMLToElement(this.getHtml()).querySelectorAll("form"),
      (t) => new U(t)
    );
  }
  /** Provides all event handlers for the component */
  get events() {
    const t = this;
    return new Proxy(this.__events, {
      get(e, s) {
        return s in e ? e[s] : (r) => {
          t._events()[s](r);
        };
      }
    });
  }
  /**
   * 
   * / 🟡 ------------ STATIC SCOPE ------------ 🟡 /
   * 
   */
  /** Central helper to get or create _id for a class */
  static getClassId() {
    let t = this._prototypesData.get(this).id;
    return t || (t = new this()._id), t;
  }
  static getInstance(...t) {
    const e = this, s = new e(...t);
    return s._id = e.getClassId(), s;
  }
  static getForms() {
    const t = this.getInstance().getFirst();
    if (!t) return null;
    const e = Array.from(t.querySelectorAll("form"));
    return t.tagName === "FORM" && e.push(t), Array.from(
      e,
      (s) => new U(s)
    );
  }
  static getComponents() {
    return this.getInstance().getComponents();
  }
  /** Sets the data for the component */
  static withData(t = {}) {
    return this.getInstance(t);
  }
  /** Sets additional style for the component */
  static withStyle(t) {
    return this.getInstance(null, t);
  }
  /**
   * Assigns a custom id to a fresh instance of the component so it can be rendered
   * and later targeted through {@link CjsComponent.getId}.
   */
  static withId(t) {
    return this.getInstance().withId(t);
  }
  /**
   * Targets already rendered components of this class that share the given custom id.
   *
   * Returns a scoped instance whose chainable methods ({@link withData}, {@link withStyle},
   * {@link reRender}, {@link getAll}, ...) only affect occurrences matching that id.
   * When several components share the id, methods loop through each of them.
   */
  static getId(t) {
    return this.getInstance().withId(t);
  }
  /** Example: render HTML string */
  static render(t = {}) {
    return this.getInstance(t).getHtml();
  }
  /** Example: visualise component as element */
  static visualise(t = {}) {
    return this.getInstance().visualise(t);
  }
  /** Example: querySelector logic */
  static querySelector(t) {
    return this.getInstance().getFirst().querySelector(t);
  }
  /** Other static methods can do the same */
  static fillHeight(t = 0, e) {
    return this.getInstance().fillHeight(t, e);
  }
  /** Re-renders every rendered occurrence of the component in the DOM */
  static reRender(t = null) {
    return this.getInstance().reRender(t);
  }
  /** Loads CjsLayout inside CjsComponent */
  static loadLayout(t) {
    return this.getInstance().loadLayout(t);
  }
  /** Get first occurrence of the CjsComponent as HTMLElement */
  static getFirst() {
    return this.getInstance().getFirst();
  }
  /** Get all occurrences of the CjsComponent as HTMLElement */
  static getAll() {
    return this.getInstance().getAll();
  }
};
P._prototypesData = /* @__PURE__ */ new Map(), P._bundledCss = null;
let W = P;
class K {
  /**
   * @param elements Function returning layout structure
   */
  constructor(t) {
    this._onBeforeLoadCallback = null, this._onAfterLoadCallback = null, this._preSetData = null, this._additionalStyle = null, this._customId = null, this._layoutObjects = [], this.elements = t;
  }
  withData(t) {
    return this._preSetData = t, this;
  }
  withStyle(t) {
    return this._additionalStyle = t, this;
  }
  /** Assigns a custom id to the layout's root elements so they can be targeted later */
  withId(t) {
    return this._customId = t == null ? null : String(t), this;
  }
  createErrorElement() {
    return document.createElement("cjslayouterror");
  }
  /** 
   * Build DOM structure
   * 
   * Does not automatically call the `onBeforeLoad` and `onAfterLoad` callbacks.
   */
  visualise() {
    const t = document.createElement("div");
    function e(i) {
      return typeof i == "function" && i.prototype?.constructor === i;
    }
    function s(i) {
      return i[Symbol.toStringTag] === "AsyncFunction";
    }
    const r = (i, c) => {
      if (!(i instanceof W))
        return y.error("The element should be CjsComponent, but passed", i), [this.createErrorElement()];
      const o = i.visualise();
      if (c.length === 2) {
        let u = o.getElementsByTagName(F)[0];
        const h = c[1];
        if (!Array.isArray(h))
          return y.error("Layout sub components at second argument have to be Array"), [o];
        h.forEach((d, f) => {
          if (d === null) return;
          const p = f === h.length - 1, S = d[0], g = a(d);
          if (S instanceof K) {
            for (const b of g)
              o.insertAdjacentElement("beforeend", b);
            return;
          }
          if (u = o.getElementsByTagName(F)[0], u) {
            p || u.insertAdjacentElement(
              "afterend",
              document.createElement(F)
            );
            for (const b of g)
              u.insertAdjacentElement("afterend", b);
            u.remove();
          } else
            for (const b of g)
              o.insertAdjacentElement("beforeend", b);
        });
      }
      return [o];
    }, a = (i) => {
      if (!Array.isArray(i))
        return y.error("Layout have wrong pattern, component should be in array"), [this.createErrorElement()];
      if (i.length === 0)
        return y.error("Layout have an empty component space"), [this.createErrorElement()];
      const c = i[0];
      if (c instanceof K)
        return c.visualise();
      if (s(c)) {
        const l = document.createElement("cjsasyncelement");
        return c().then((u) => {
          const h = a([u]);
          for (const d of h)
            l.insertAdjacentElement("beforebegin", d);
          l.remove();
        }), [l];
      }
      const o = e(c) ? new c() : c;
      return r(o, i);
    };
    if (this.elements(this._preSetData).forEach((i) => {
      if (!i) return;
      const c = a(i.filter((o) => o !== null));
      for (const o of c)
        t.insertAdjacentElement(
          "beforeend",
          o
        );
    }), this._layoutObjects = Array.from(t.children), this._additionalStyle) {
      for (const i of this._layoutObjects) {
        const c = Object.entries(this._additionalStyle).map((u) => `${u[0]}: ${u[1]}`).join("; ") + ";", o = i.hasAttribute("style") ? i.getAttribute("style") : null;
        if (!o) {
          i.setAttribute("style", c);
          continue;
        }
        const l = o.endsWith(";");
        i.setAttribute(
          "style",
          l ? `${o} ${c}` : `${o}; ${c}`
        );
      }
      this._additionalStyle = null;
    }
    if (this._customId !== null)
      for (const i of this._layoutObjects)
        i.setAttribute(z, this._customId);
    if (this._onAfterLoadCallback) {
      const i = E.addOnAddElementCallback(this._onAfterLoadCallback).trim();
      this._layoutObjects[0].setAttribute(i, "");
    }
    return this._layoutObjects;
  }
  onBeforeLoad(t) {
    return this._onBeforeLoadCallback = t, this;
  }
  onAfterLoad(t) {
    return this._onAfterLoadCallback = t, this;
  }
  reRender() {
    const t = this._layoutObjects, e = t[0];
    t.slice(1).forEach((r) => r.remove());
    for (const r of this.visualise())
      e.insertAdjacentElement("beforebegin", r);
    e.remove();
  }
}
let G = !1;
function st() {
  if (G) return null;
  const n = document.head.appendChild(
    $.HTMLToElement(`<style id="${B}"></style>`)
  );
  return G = !0, n;
}
const lt = {
  create() {
    st();
  },
  appendStyle(n) {
    if (!G) {
      st().innerHTML += n;
      return;
    }
    const t = document.getElementById(B);
    t.innerHTML += n;
  }
};
class q {
  /**
   * Adds CSS style rules to plugin style container
   */
  _addStyleRules(t) {
    for (const [e, s] of Object.entries(t)) {
      const r = `${e} { ${s.join(" ")} }`;
      lt.appendStyle(`
${r}`);
    }
  }
}
class Lt extends q {
  constructor() {
    super(...arguments), this.attribute = "ripple", this.animationTime = 400, this.cssVariables = {
      s: "sx",
      t: "tx",
      o: "ox",
      d: "dx",
      x: "xx",
      y: "yx"
    };
  }
  applyEffect(t) {
    t.__rippleAttached || (t.addEventListener("click", (e) => {
      const s = e.touches ? e.touches[0] : e, r = t.getBoundingClientRect(), a = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
      t.style.cssText = `--${this.cssVariables.s}: 0; --${this.cssVariables.o}: 1;`, t.offsetTop, t.style.cssText = `--${this.cssVariables.t}: 1;
                 --${this.cssVariables.o}: 0;
                 --${this.cssVariables.d}: ${a};
                 --${this.cssVariables.x}: ${s.clientX - r.left};
                 --${this.cssVariables.y}: ${s.clientY - r.top};`;
    }), t.__rippleAttached = !0);
  }
  addStyles() {
    const t = `${this.animationTime}ms`;
    this._addStyleRules({
      [`[${this.attribute}]`]: [
        "cursor: pointer;",
        "overflow: hidden;",
        "position: relative;",
        "-webkit-user-select: none;",
        "-moz-user-select: none;",
        "-ms-user-select: none;",
        "user-select: none;",
        "-webkit-tap-highlight-color: rgba(0,0,0,0);"
      ],
      [`[${this.attribute}]::before`]: [
        "content: '';",
        "display: block;",
        "border-radius: 50%;",
        "position: absolute;",
        "pointer-events: none;",
        "transform-origin: center;",
        `top: calc(var(--${this.cssVariables.y}) * 1px);`,
        `left: calc(var(--${this.cssVariables.x}) * 1px);`,
        `width: calc(var(--${this.cssVariables.d}) * 1px);`,
        `height: calc(var(--${this.cssVariables.d}) * 1px);`,
        "background: var(--ripple-background, white);",
        `transform: translate(-50%, -50%) scale(var(--${this.cssVariables.s}, 1));`,
        `opacity: calc(var(--${this.cssVariables.o}, 1) * var(--ripple-opacity, 0.3));`,
        `transition: calc(var(--${this.cssVariables.t}, 0) * var(--ripple-duration, ${t})) var(--ripple-easing, linear);`
      ]
    });
  }
  enable() {
    this.addStyles(), document.querySelectorAll(`[${this.attribute}]`).forEach((e) => this.applyEffect(e)), new MutationObserver((e) => {
      const s = e.filter((r) => r.type === "childList").flatMap((r) => Array.from(r.addedNodes)).filter((r) => r instanceof HTMLElement).flatMap((r) => [
        r,
        ...Array.from(r.querySelectorAll("*"))
      ]).filter((r) => r.hasAttribute(this.attribute));
      for (const r of s)
        this.applyEffect(r);
    }).observe(document.documentElement, {
      childList: !0,
      subtree: !0
    });
  }
}
const nt = [], rt = [];
class M {
  constructor() {
    this.entries = [], this.duration = 1e3, this.timingFunction = "ease", this.keepEndingEntryStyle = !0, this.selector = "", this.isImportant = !1, this.fillMode = "";
  }
  // --------------------------------------------------
  // Configuration
  // --------------------------------------------------
  setSelector(t) {
    return this.selector = t, this;
  }
  setFillMode(t) {
    return this.fillMode = t, this;
  }
  setEndingEntryStyle(t) {
    return this.keepEndingEntryStyle = t, this;
  }
  addEntry(t) {
    return this.entries.push(t), this;
  }
  setDuration(t) {
    return isNaN(t) ? (y.error("Provided argument is not a number"), this) : (this.duration = t, this);
  }
  setTimingFunction(t) {
    return this.timingFunction = t, this;
  }
  setImportant(t) {
    return this.isImportant = t, this;
  }
  // --------------------------------------------------
  // Core Logic
  // --------------------------------------------------
  getClass(t = {}) {
    const e = t.reversed ?? !1;
    this.entries.length > 100 && y.error("CjsKeyFrame cannot have more than 100 entries");
    const s = document.head.querySelector(
      `[id="${B}"]`
    );
    if (!s)
      throw new Error("Keyframes style element not found");
    const r = e ? [...this.entries].reverse() : this.entries, a = r.length === 1, i = 100 / Math.max(r.length - 1, 1), o = `{
${r.map((C, T) => {
      const ut = a ? 100 : T * i, ht = Object.entries(C).map(([dt, ft]) => `${dt}: ${ft};`).join(" ");
      return `    ${ut}% { ${ht} }`;
    }).join(`
`)}
}`, l = A.getHash(o), u = nt.find((C) => C.hash === l);
    let h;
    if (u)
      h = u.animation;
    else {
      h = `${bt}${A.getRandom(16)}`;
      const C = `@keyframes ${h} ${o}`;
      s.innerHTML += `
${C}`, nt.push({
        hash: l,
        animation: h
      });
    }
    const d = r[r.length - 1], f = this.isImportant ? " !important" : "", p = Object.entries(d).map(([C, T]) => `${C}: ${T};`).join(" "), g = [`animation: ${h} ${this.duration / 1e3}s ${this.timingFunction}${f}`];
    this.keepEndingEntryStyle && g.push(p);
    const b = `{ ${g.join("; ")} }`, v = A.getHash(`${this.selector}-${b}`), j = rt.find((C) => C.hash === v);
    if (j)
      return j.class;
    const R = `${h}-${v}`, O = `.${R} ${this.selector} ${b}`;
    return s.innerHTML += `
${O}`, rt.push({
      hash: v,
      class: R
    }), R;
  }
}
class _t extends q {
  constructor() {
    super(), this.attribute = "scale", this.animationTime = 350, this.scales = {
      start: 0.85,
      end: 1
    }, this.keyframe = new M().setDuration(this.animationTime).addEntry({ transform: `scale(${this.scales.start})` }).addEntry({ transform: `scale(${this.scales.end})` });
  }
  handleTouch(t, e) {
    if (t.hasAttribute("disabled")) return;
    const s = this.keyframe.getClass({
      reversed: e
    }), r = e ? this.scales.start : this.scales.end;
    t.classList.add(s), t.style.transform = `scale(${r})`, setTimeout(() => {
      t.classList.remove(s), e || (t.style.transform = "");
    }, this.animationTime);
  }
  applyEvents(t) {
    t.__scaleAttached || (t.addEventListener("touchstart", () => {
      this.handleTouch(t, !0);
    }), t.addEventListener("touchend", () => {
      this.handleTouch(t, !1);
    }), t.__scaleAttached = !0);
  }
  enable() {
    document.querySelectorAll(`[${this.attribute}]`).forEach((s) => this.applyEvents(s)), new MutationObserver((s) => {
      const r = s.filter((a) => a.type === "childList").flatMap((a) => Array.from(a.addedNodes)).filter(
        (a) => a instanceof HTMLElement
      ).flatMap((a) => [
        a,
        ...Array.from(a.querySelectorAll("*"))
      ]).filter((a) => a.hasAttribute(this.attribute));
      for (const a of r)
        this.applyEvents(a);
    }).observe(document.documentElement, {
      childList: !0,
      subtree: !0
    });
  }
}
const At = {
  /**
   * Creates a delay (sleep)
   */
  sleep(n) {
    return new Promise((t) => {
      setTimeout(t, n);
    });
  }
};
class xt extends q {
  constructor() {
    super(...arguments), this.containerId = "cjs-notification-plugin-container", this.keyframe = {
      name: "cjs-notification-plugin",
      duration: 4e3,
      showHideOffset: 10,
      yDiff: 8
    }, this.themes = {
      dark: {
        backgroundColor: "#242323"
      },
      light: {
        backgroundColor: "#ffffff"
      }
    };
  }
  addStyles() {
    const t = "dark", e = "light";
    this._addStyleRules({
      [`#${this.containerId}.container`]: [
        "position: fixed;",
        "bottom: 0;",
        "z-index: 999999999999;",
        "left: 50%;",
        "transform: translateX(-50%);",
        "display: flex;",
        "align-items: center;",
        "flex-direction: column;",
        `gap: ${this.keyframe.yDiff}px;`
      ],
      [`#${this.containerId}.container > .notification`]: [
        `background: ${this.themes[t].backgroundColor};`,
        "border-radius: 14px;",
        "padding: 8px;",
        "width: fit-content;",
        "display: flex;",
        "align-items: center;",
        "gap: 5px;",
        "opacity: 0;",
        "transform: translateY(0px);",
        "filter: drop-shadow(1px 2px 3px black);",
        `animation: ${this.keyframe.name} ${this.keyframe.duration}ms`
      ],
      [`#${this.containerId}.container > .notification.warning`]: [
        "background: #c0bd00;"
      ],
      [`#${this.containerId}.container > .notification.error`]: [
        "background: #de1f1f;"
      ],
      [`#${this.containerId}.container > .notification.info`]: [
        "background: #0e73ff;"
      ],
      [`#${this.containerId}.container > .notification.success`]: [
        "background: #00b600;"
      ],
      [`#${this.containerId}.container > .notification > p`]: [
        `color: ${this.themes[e].backgroundColor};`,
        "margin: 0;",
        "font-size: 16px;",
        "display: -webkit-box;",
        "-webkit-line-clamp: 1;",
        "-webkit-box-orient: vertical;",
        "overflow: hidden;"
      ],
      [`#${this.containerId}.container > .notification > .icon`]: [
        "--size: 22px;",
        "width: var(--size);",
        "height: var(--size);"
      ],
      [`@keyframes ${this.keyframe.name}`]: [
        `0% { opacity: 0; transform: translateY(${this.keyframe.yDiff}px); }`,
        `${this.keyframe.showHideOffset}% { opacity: 1; transform: translateY(-${this.keyframe.yDiff}px); }`,
        `${100 - this.keyframe.showHideOffset}% { opacity: 1; transform: translateY(-${this.keyframe.yDiff}px); }`,
        `100% { opacity: 0; transform: translateY(${this.keyframe.yDiff}px); }`
      ]
    });
  }
  createContainer() {
    const t = $.HTMLToElement(`
            <div id="${this.containerId}" class="container"></div>
        `);
    return document.body.appendChild(t), t;
  }
  createNotification(t, e) {
    const s = document.getElementById(this.containerId) ?? this.createContainer(), r = {
      success: '<svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>checkmark1</title> <path d="M21.82 13.030l-1.002-1.002c-0.185-0.185-0.484-0.185-0.668 0l-6.014 6.013-2.859-2.882c-0.186-0.185-0.484-0.185-0.67 0l-1.002 1.003c-0.185 0.185-0.185 0.484 0 0.668l4.193 4.223c0.185 0.184 0.484 0.184 0.668 0l7.354-7.354c0.186-0.185 0.186-0.484 0-0.669zM16 3c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13-5.82-13-13-13zM16 26c-5.522 0-10-4.478-10-10 0-5.523 4.478-10 10-10 5.523 0 10 4.477 10 10 0 5.522-4.477 10-10 10z"></path> </g></svg>',
      error: '<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>error</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="add" fill="#ffffff" transform="translate(42.666667, 42.666667)"> <path d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,42.6666667 C119.232,42.6666667 42.6666667,119.232 42.6666667,213.333333 C42.6666667,307.434667 119.232,384 213.333333,384 C307.434667,384 384,307.434667 384,213.333333 C384,119.232 307.434667,42.6666667 213.333333,42.6666667 Z M262.250667,134.250667 L292.416,164.416 L243.498667,213.333333 L292.416,262.250667 L262.250667,292.416 L213.333333,243.498667 L164.416,292.416 L134.250667,262.250667 L183.168,213.333333 L134.250667,164.416 L164.416,134.250667 L213.333333,183.168 L262.250667,134.250667 Z" id="error"> </path> </g> </g> </g></svg>',
      info: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" fill-rule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z"></path> </g></svg>',
      warning: '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7.493 0.015 C 7.442 0.021,7.268 0.039,7.107 0.055 C 5.234 0.242,3.347 1.208,2.071 2.634 C 0.660 4.211,-0.057 6.168,0.009 8.253 C 0.124 11.854,2.599 14.903,6.110 15.771 C 8.169 16.280,10.433 15.917,12.227 14.791 C 14.017 13.666,15.270 11.933,15.771 9.887 C 15.943 9.186,15.983 8.829,15.983 8.000 C 15.983 7.171,15.943 6.814,15.771 6.113 C 14.979 2.878,12.315 0.498,9.000 0.064 C 8.716 0.027,7.683 -0.006,7.493 0.015 M8.853 1.563 C 9.967 1.707,11.010 2.136,11.944 2.834 C 12.273 3.080,12.920 3.727,13.166 4.056 C 13.727 4.807,14.142 5.690,14.330 6.535 C 14.544 7.500,14.544 8.500,14.330 9.465 C 13.916 11.326,12.605 12.978,10.867 13.828 C 10.239 14.135,9.591 14.336,8.880 14.444 C 8.456 14.509,7.544 14.509,7.120 14.444 C 5.172 14.148,3.528 13.085,2.493 11.451 C 2.279 11.114,1.999 10.526,1.859 10.119 C 1.618 9.422,1.514 8.781,1.514 8.000 C 1.514 6.961,1.715 6.075,2.160 5.160 C 2.500 4.462,2.846 3.980,3.413 3.413 C 3.980 2.846,4.462 2.500,5.160 2.160 C 6.313 1.599,7.567 1.397,8.853 1.563 M7.706 4.290 C 7.482 4.363,7.355 4.491,7.293 4.705 C 7.257 4.827,7.253 5.106,7.259 6.816 C 7.267 8.786,7.267 8.787,7.325 8.896 C 7.398 9.033,7.538 9.157,7.671 9.204 C 7.803 9.250,8.197 9.250,8.329 9.204 C 8.462 9.157,8.602 9.033,8.675 8.896 C 8.733 8.787,8.733 8.786,8.741 6.816 C 8.749 4.664,8.749 4.662,8.596 4.481 C 8.472 4.333,8.339 4.284,8.040 4.276 C 7.893 4.272,7.743 4.278,7.706 4.290 M7.786 10.530 C 7.597 10.592,7.410 10.753,7.319 10.932 C 7.249 11.072,7.237 11.325,7.294 11.495 C 7.388 11.780,7.697 12.000,8.000 12.000 C 8.303 12.000,8.612 11.780,8.706 11.495 C 8.763 11.325,8.751 11.072,8.681 10.932 C 8.616 10.804,8.460 10.646,8.333 10.580 C 8.217 10.520,7.904 10.491,7.786 10.530 " stroke="none" fill-rule="evenodd" fill="#ffffff"></path></g></svg>'
    }, a = $.HTMLToElement(`
            <div class="notification ${e}">
                <div class="icon">
                    ${r[e]}
                </div>
                <p>${t}</p>
            </div>
        `);
    s.appendChild(a), At.sleep(this.keyframe.duration).then(() => a.remove());
  }
  info(t) {
    this.createNotification(t, "info");
  }
  error(t) {
    this.createNotification(t, "error");
  }
  warning(t) {
    this.createNotification(t, "warning");
  }
  success(t) {
    this.createNotification(t, "success");
  }
  enable() {
    this.addStyles();
  }
}
class jt extends q {
  constructor() {
    super(...arguments), this.attribute = "hover", this.animationTime = 350, this.hoverScale = 0.95;
  }
  addStyles() {
    this._addStyleRules({
      [`[${this.attribute}]`]: [
        `transition: transform ${this.animationTime}ms !important;`
      ],
      [`[${this.attribute}]:hover`]: [
        `transform: scale(${this.hoverScale}) !important;`
      ]
    });
  }
  enable() {
    this.addStyles();
  }
}
const Rt = new Lt(), Ot = new xt(), Tt = new _t(), It = new jt(), oe = {
  /**
   * Enables selected plugins
   */
  enable(n = {}) {
    const t = {
      ripple: Rt,
      notification: Ot,
      scaleClick: Tt,
      scaleHover: It
    };
    for (const e of Object.keys(t))
      n[e] && t[e].enable();
  }
};
class Mt {
  /**
   * Simple translateX animation
   */
  x(t, e = 500) {
    return new M().setDuration(e).addEntry({ transform: `translateX(${t}px)` }).addEntry({ transform: "translateX(0)" }).getClass();
  }
  /**
   * Simple translateY animation
   */
  y(t, e = 500) {
    return new M().setDuration(e).addEntry({ transform: `translateY(${t}px)` }).addEntry({ transform: "translateY(0)" }).getClass();
  }
  /**
   * Simple scale animation
   */
  scale(t, e = 500) {
    return new M().setDuration(e).addEntry({ transform: `scale(${t})` }).addEntry({ transform: "scale(1)" }).getClass();
  }
  /**
   * Adds temporary class to element and removes it after timeout
   */
  tempClass(t, e, s = 500) {
    t && (t.classList.add(e), setTimeout(() => {
      t.classList.remove(e);
    }, s));
  }
}
const ae = new Mt(), Nt = {
  /**
   * Returns parsed path that does not start with `./` or `/`
   */
  toFixedPath(n) {
    return n.startsWith("./") ? n.slice(2) : n.startsWith("/") ? n.slice(1) : n;
  }
};
function D(n) {
  return `src/assets/${Nt.toFixedPath(n)}`;
}
function ce(n) {
  return D(`svg/${n}.svg`);
}
function le(n) {
  return D(`images/${n}.png`);
}
function ue(n) {
  return D(`images/${n}.jpg`);
}
function he(n) {
  return D(`gif/${n}.gif`);
}
const de = {
  async download(n, t = null) {
    try {
      const e = await fetch(n);
      if (!e.ok)
        return y.error(`Couldn't download file: ${e.statusText}`, e);
      const s = await e.blob();
      it(s, t ?? n.split("/").pop());
    } catch (e) {
      return y.error("Couldn't fetch file", e);
    }
  },
  async downloadFile(n, t, e = null) {
    try {
      const s = new Blob([n], { type: t }), r = t.split("/").pop() ?? "file", a = e ?? `${r}.${r}`;
      it(s, a);
    } catch (s) {
      y.error("Couldn't create download file", s);
    }
  }
};
function it(n, t) {
  if (typeof document > "u") return;
  const e = document.createElement("a");
  e.href = URL.createObjectURL(n), e.download = t ?? "download", document.body.appendChild(e), e.click(), document.body.removeChild(e), URL.revokeObjectURL(e.href);
}
const x = {
  mouse: {
    up: !0,
    down: !1,
    state: "up"
  },
  window: {
    DOMContentLoaded: !1
  }
};
window.addEventListener("mousedown", () => {
  x.mouse.up = !1, x.mouse.down = !0, x.mouse.state = "down";
});
window.addEventListener("mouseup", () => {
  x.mouse.up = !0, x.mouse.down = !1, x.mouse.state = "up";
});
window.addEventListener("DOMContentLoaded", () => {
  x.window.DOMContentLoaded = !0;
});
function fe(n) {
  return n;
}
const me = {
  /**
   * Basic mobile device detection
   */
  isMobile() {
    return typeof navigator > "u" ? !1 : /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  },
  /**
   * Checks if user is on iOS device
   */
  isIOS() {
    return typeof navigator > "u" ? !1 : /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
}, pe = new class {
  // ------------------------
  // Constructor
  // ------------------------
  constructor() {
    this.#t = "cjs-debug/Search", this.#e = !0, this.#s = !0, this.#i = "cjsSearch", this.#r = [], this._mode = "query", this.length = 0, this.search = "", this.search = "", window.addEventListener("popstate", () => {
      const t = new URL(window.location.href), e = this._mode === "query" ? t.searchParams.get("path") : t.pathname.replace(/^\/|\/$/g, "");
      e && this.set(e);
    });
  }
  #t;
  #e;
  #s;
  #i;
  #r;
  // ------------------------
  // Private Helpers
  // ------------------------
  #c(t) {
    return new URL(t).pathname.substring(1);
  }
  #n(t) {
    return t ? (t.charAt(0) === "/" && (t = t.slice(1)), t.charAt(t.length - 1) === "/" && (t = t.slice(0, -1)), t) : "";
  }
  #o() {
    ({
      query: () => {
        const e = new URL(window.location.href);
        e.searchParams.set("path", this.search), history.pushState({}, "", e);
      },
      path: () => {
        history.pushState(null, "", `/${this.search}`);
      }
    })[this._mode](), window.dispatchEvent(new Event("popstate"));
  }
  #a() {
    const t = $.HTMLToElement(`
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #000000;
                padding: 6px 12px;
                border: 2px solid #ffffff;
                border-radius: 6px;
            " id="${this.#t}">
                <p style="
                    font-family: Consolas, sans-serif;
                    margin: 0;
                    color: #acacac;
                    font-size: 10px;
                    user-select: none;
                ">Search url</p>
                <p style="
                    font-family: Consolas, sans-serif;
                    margin: 0;
                    color: #ffffff;
                    font-size: 15px;
                "></p>
            </div>
        `);
    return document.body && document.body.appendChild(t), t;
  }
  // ------------------------
  // Public API
  // ------------------------
  setMode(t) {
    this._mode = t;
  }
  setDisplayedOnScreen(t) {
    return this.#e = t, this;
  }
  onChange(t) {
    return this.#r.push(t), this;
  }
  set(t, e = !1) {
    const s = this.#n(t);
    return this.search === s && !e ? this : (this.search = s, this.update(), this);
  }
  setQuiet(t) {
    return this.search = this.#n(t), this.update(!0), this;
  }
  update(t = !1) {
    localStorage.setItem(this.#i, this.search);
    const e = this.search.split("/").filter((s) => s.trim() !== "");
    if (this.length = e.length, t || this.#r.forEach(
      (s) => s({
        search: this.search,
        parts: e,
        length: this.length
      })
    ), this.#e) {
      const a = (document.getElementById(this.#t) ?? this.#a()).querySelector("p:nth-child(2)");
      a && (a.innerHTML = `/${this.search}`);
    }
    this.#s && this.#o();
  }
  equals(t) {
    return t === this.search ? !0 : this.search === this.#n(t);
  }
  startsWith(t) {
    return this.search.startsWith(this.#n(t));
  }
  slice(t, e = null) {
    const s = this.search.split("/").filter((r) => r.trim() !== "");
    return e === null ? s.slice(t).join("/") : s.slice(t, e).join("/");
  }
  get(t) {
    const e = this.search.split("/");
    return t > e.length - 1 ? (y.error("Provided index is too high"), null) : e[t];
  }
  add(t) {
    const e = t.replace(/\//g, "");
    return this.search += this.search.trim().length === 0 ? e : `/${e}`, this.update(), this;
  }
  remove(t) {
    const e = this.search.split("/");
    if (t > e.length - 1)
      return y.error("Provided index is too high"), this;
    const r = e.slice(0, e.length - t);
    return this.search = r.join("/"), this.update(), this;
  }
}();
function ye(n, t) {
  return Array.isArray(n) ? n.map(t).join("") : (y.error("The provided argument in strmap is not an array", n), "");
}
function be(n, t) {
  return n ? t : "";
}
function Ce(n, t) {
  if (!n || n.length <= t) return n;
  const s = t - 3;
  return s <= 0 ? "..." : n.substring(0, s) + "...";
}
function we(n, t) {
  return n == null || n.trim() === "" ? t : n;
}
const Se = {
  /**
   * Checks if provided string is a valid email
   */
  isEmail(n) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n);
  }
};
class ve {
  constructor() {
    this.webSocket = null, this.captures = /* @__PURE__ */ new Map(), this.isOpened = !1, this.waitingSendRequests = [];
  }
  /**
   * Connects to WebSocket
   */
  connect(t) {
    return this.webSocket = new WebSocket(t), this.webSocket.onopen = () => {
      this.isOpened = !0, this.waitingSendRequests.forEach((e) => {
        this.webSocket?.send(e);
      }), this.waitingSendRequests = [];
    }, this.webSocket.onmessage = (e) => {
      for (const s of this.captures.values())
        s(e);
    }, this.webSocket.onclose = () => {
      this.isOpened = !1;
    }, this;
  }
  /**
   * Sends raw data to WebSocket
   */
  send(t) {
    return !this.isOpened || !this.webSocket ? (this.waitingSendRequests.push(t), this) : (this.webSocket.send(t), this);
  }
  /**
   * Sends JSON data (auto stringified)
   */
  sendJson(t) {
    return this.send(JSON.stringify(t));
  }
  /**
   * Creates a capture.
   * When any message is received — the callback executes.
   *
   * @returns capture id
   */
  createCapture(t) {
    const e = A.getRandom(16);
    return this.captures.set(e, t), e;
  }
  /**
   * Removes capture
   */
  removeCapture(t) {
    return this.captures.delete(t), this;
  }
  /**
   * Checks if capture exists
   */
  hasCapture(t) {
    return this.captures.has(t);
  }
  /**
   * Closes websocket safely
   */
  close(t, e) {
    this.webSocket?.close(t, e), this.webSocket = null, this.isOpened = !1;
  }
}
const ke = {
  /**
   * Opens a url within a new tab / target
   */
  open(n, t = "_blank") {
    if (typeof document > "u") return;
    const e = document.createElement("a");
    e.href = n, e.target = t, e.style.display = "none", document.body.appendChild(e), e.click(), e.remove();
  }
}, J = new class {
  constructor() {
    this.callback = (t) => {
      for (const e of t)
        e.isIntersecting && this.performLazy(e.target);
    }, this.#t = new IntersectionObserver(this.callback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    });
  }
  #t;
  #e(t) {
    const e = `[class*='${Y}']`, s = Array.from(t.querySelectorAll(e));
    return t.matches(e) && s.unshift(t), s;
  }
  /** Observes the node and all of its descendants that use lazy classes */
  observe(t) {
    for (const e of this.#e(t))
      this.#t.observe(e);
  }
  /** Stops observing the node and all of its descendants that use lazy classes */
  unobserve(t) {
    for (const e of this.#e(t))
      this.#t.unobserve(e);
  }
  /** Observes all lazy elements in the document */
  observeAll() {
    this.observe(document.body);
  }
  /** Replaces every `lazy:<class>` of the element with `<class>` */
  performLazy(t) {
    const e = Array.from(t.classList).filter((s) => s.startsWith(Y));
    for (const s of e)
      t.classList.remove(s), t.classList.add(s.slice(Y.length));
    this.#t.unobserve(t);
  }
}(), ot = new class {
  constructor() {
    this.callback = (t) => {
      this.processForms();
      const e = t.filter((i) => i.type === "childList"), s = e.flatMap((i) => Array.from(i.addedNodes)).filter((i) => i.nodeType === 1), r = e.flatMap((i) => Array.from(i.removedNodes)).filter((i) => i.nodeType === 1);
      for (const i of r)
        J.unobserve(i);
      for (const i of s)
        J.observe(i);
      const a = s.flatMap((i) => [
        i,
        ...Array.from(i.querySelectorAll("*"))
      ]);
      for (const i of a)
        this.processElementEvents(i);
    }, this.#t = new MutationObserver(this.callback);
  }
  #t;
  #e(t, e) {
    if (!E.hasCallback(t)) return;
    const s = E.getCallback(t);
    (s.applyToWindow ? window : e).addEventListener(
      s.eventName,
      (a) => s.callback({ event: a, source: e })
    );
  }
  #s(t, e) {
    if (!E.hasOnAddElementCallback(t)) return;
    E.getOnAddElementCallback(t).callback({ event: null, source: e });
  }
  processForms() {
    document.body.querySelectorAll("form").forEach((t) => {
      t.onsubmit = (e) => e.preventDefault();
    });
  }
  processElementEvents(t) {
    const e = $.getAttributesStartingWith(
      t,
      N
    );
    if (e.length !== 0)
      for (const s of e) {
        const r = Array.from(document.body.querySelectorAll(`[${s}]`)), a = s.replace(N, "");
        for (const i of r)
          i.removeAttribute(s), this.#e(a, i), this.#s(a, i);
      }
  }
  observe() {
    this.#t.observe(document.body, {
      childList: !0,
      subtree: !0
    });
  }
}();
function Pt(n) {
  const t = document.body.querySelector(Z);
  if (!t)
    return document.body.appendChild(document.createElement(Z)), Pt(n);
  lt.create(), t.innerHTML = "", ot.observe();
  for (const e of n.visualise())
    t.appendChild(e), Array.from(e.querySelectorAll("*")).forEach((s) => {
      ot.processElementEvents(s);
    });
  J.observeAll();
}
export {
  ae as CjsAnimation,
  W as CjsComponent,
  de as CjsDownload,
  x as CjsGlobals,
  M as CjsKeyFrame,
  K as CjsLayout,
  me as CjsMobile,
  Ot as CjsNotification,
  k as CjsObjectUtil,
  oe as CjsPluginManager,
  Et as CjsRequest,
  ie as CjsRequests,
  pe as CjsSearch,
  A as CjsStringUtil,
  At as CjsTimings,
  Se as CjsValidator,
  ve as CjsWebSocket,
  ke as CjsWindow,
  D as asset,
  fe as createHandle,
  he as gif,
  Pt as init,
  ue as jpg,
  zt as onChange,
  Wt as onClick,
  Kt as onDoubleClick,
  Bt as onEscape,
  Gt as onFocus,
  Jt as onFocusOut,
  qt as onHoldDown,
  Zt as onInput,
  L as onLoad,
  Qt as onMouseEnter,
  te as onMouseLeave,
  ee as onMouseMove,
  Dt as onOuterclick,
  se as onResize,
  ne as onScroll,
  Yt as onScrollBottom,
  Ft as onSlideDown,
  Xt as onSlideLeft,
  Vt as onSlideRight,
  Ut as onSlideUp,
  re as onTouchMove,
  le as png,
  be as strif,
  ye as strmap,
  Ce as strmax,
  we as stror,
  ce as svg
};
//# sourceMappingURL=cjs.mjs.map
