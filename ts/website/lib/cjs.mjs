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
}, dt = {
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
  format(r) {
    return r.replace(/&([0-9a-flnr])/gi, (t, e) => dt[e.toLowerCase()] ?? "") + m.None;
  }
}, N = "[CJS]";
_.format(`&e&n${N}&r `);
const ft = _.format(`&c&n${N}&r `), mt = _.format(`&c&a${N}&r `), pt = _.format(`&c&b${N}&r `), D = "cjs:render", K = "cjsroot", H = "cjs-style", gt = "cjs-style-keyframes", P = "cjsevent-", Y = "cjs_", G = "cjs-id", yt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", Ct = "abcdefghijklmnopqrstuvwxyz0123456789", x = {
  getRandom(r, t = !0) {
    let e = "";
    const s = t ? Ct : yt, n = s.length;
    let o = 0;
    for (; o < r; )
      e += s.charAt(Math.floor(Math.random() * n)), o += 1;
    if (t) {
      const l = (a) => !isNaN(Number(a.substring(0, 1)));
      for (; l(e); )
        e = this.getRandom(r, t);
    }
    return e;
  },
  /**
   * Provides similarity of two strings (float precision)
   * @author https://stackoverflow.com/users/6145207/overlord1234
   */
  getSimilarity(r, t) {
    function e(l, a) {
      l = l.toLowerCase(), a = a.toLowerCase();
      let i = new Array();
      for (let c = 0; c <= l.length; c++) {
        let u = c;
        for (let h = 0; h <= a.length; h++)
          if (c == 0)
            i[h] = h;
          else if (h > 0) {
            let d = i[h - 1];
            l.charAt(c - 1) != a.charAt(h - 1) && (d = Math.min(Math.min(d, u), i[h]) + 1), i[h - 1] = u, u = d;
          }
        c > 0 && (i[a.length] = u);
      }
      return i[a.length];
    }
    let s = r, n = t;
    r.length < t.length && (s = t, n = r);
    let o = s.length;
    return o == 0 ? 1 : (o - e(s, n)) / parseFloat(`${o}`);
  },
  /**
   * Creates a unique numeric ID from a string
   * (DJB2 hash)
   */
  getHash(r) {
    let t = 5381;
    for (let e = 0; e < r.length; e++) {
      const s = r.charCodeAt(e);
      t = t * 33 ^ s;
    }
    return t >>> 0;
  },
  /**
   * Remove HTML tags from the input, keeping inner content
   */
  removeHtmlTags(r) {
    return r.replace(/<[^>]*>/g, "");
  },
  /**
   * Capitalizes first letter of the string
   */
  capitalize(r) {
    return r && r.charAt(0).toUpperCase() + r.slice(1);
  },
  kebabCaseToCamelStyle(r) {
    return r.replace(/-([a-z])/g, (t, e) => e.toUpperCase());
  },
  snakeStyleToCamelCase(r) {
    return r.replace(/_([a-z])/g, (t, e) => e.toUpperCase());
  },
  camelStyleToKebabCase(r) {
    return r.replace(/([A-Z])/g, "-$1").toLowerCase();
  },
  camelStyleToSnakeStyle(r) {
    return r.replace(/([A-Z])/g, "_$1").toLowerCase();
  }
}, E = new class {
  #t = /* @__PURE__ */ new Map();
  #e = /* @__PURE__ */ new Map();
  #s = () => {
    let t = null;
    for (; t === null || this.#t.has(t); )
      t = x.getRandom(16);
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
    return this.#t.set(e, t), ` ${P}${e}`;
  }
  addOnAddElementCallback(t) {
    const e = this.#s();
    return this.#e.set(e, { callback: t }), ` ${P}${e}`;
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
function L(r) {
  return E.addOnAddElementCallback(r);
}
function Nt(r) {
  return L((t) => {
    document.addEventListener("keydown", (e) => {
      (e.key === "Escape" || e.key == "Esc") && r(t);
    });
  });
}
function Ht(r, t = 500) {
  return L((e) => {
    let s = 0;
    const n = () => {
      clearTimeout(s);
    }, o = () => {
      s = setTimeout(() => {
        r(e);
      }, t);
    };
    e.source.addEventListener("mousedown", o), e.source.addEventListener("touchstart", o), e.source.addEventListener("mouseup", n), e.source.addEventListener("mousemove", n), e.source.addEventListener("touchend", n), e.source.addEventListener("touchcancel", n), e.source.addEventListener("touchmove", n);
  });
}
function Bt(r) {
  return E.addCallback({
    eventName: "click",
    callback: (t) => {
      const { event: e, source: s } = t;
      document.body.contains(s) && s !== e.target && !s.contains(e.target) && r(t);
    },
    applyToWindow: !0
  });
}
function qt(r) {
  return L((t) => {
    t.source.addEventListener("scroll", () => {
      t.source.scrollTop + t.source.clientHeight >= t.source.scrollHeight && r(t);
    });
  });
}
function Dt(r, t = 10) {
  return L((e) => {
    let s = 0, n = 0;
    const o = (i) => {
      const c = i, u = "touches" in c ? c.touches[0].clientY : c.clientY;
      n = u, s = u;
    }, l = (i) => {
      const c = i, u = "touches" in c ? c.touches[0].clientY : c.clientY, h = u + 1 >= n, d = u - s;
      if (!h) {
        s = 0;
        return;
      }
      d > t && (r(e), s = 0), n = u;
    }, { source: a } = e;
    a.addEventListener("mousedown", o), a.addEventListener("touchstart", o), a.addEventListener("mousemove", l), a.addEventListener("touchmove", l);
  });
}
function Yt(r, t = 50, e = 50) {
  return L((s) => {
    let n = { startX: 0, startY: 0, lastX: 0, lastY: 0 };
    const o = (i) => {
      const c = i, u = "touches" in c ? c.touches[0].clientX : c.clientX, h = "touches" in c ? c.touches[0].clientY : c.clientY;
      n.lastX = u, n.startX = u, n.lastY = h, n.startY = h;
    }, l = (i) => {
      const c = i, u = "touches" in c ? c.touches[0].clientX : c.clientX, h = "touches" in c ? c.touches[0].clientY : c.clientY, d = u - 1 <= n.lastX, f = u - n.startX, p = h - n.startY;
      if (e !== -1 && e < Math.abs(p)) {
        n.startX = 0;
        return;
      }
      if (!d) {
        n.startX = 0;
        return;
      }
      f < -1 * t && (r(s), n.startX = 0), n.lastX = u;
    }, { source: a } = s;
    a.addEventListener("mousedown", o), a.addEventListener("touchstart", o), a.addEventListener("mousemove", l), a.addEventListener("touchmove", l);
  });
}
function Ft(r, t = 50, e = 50) {
  return L((s) => {
    let n = { startX: 0, startY: 0, lastX: 0, lastY: 0 };
    const o = (i) => {
      const c = i, u = "touches" in c ? c.touches[0].clientX : c.clientX, h = "touches" in c ? c.touches[0].clientY : c.clientY;
      n.lastX = u, n.startX = u, n.lastY = h, n.startY = h;
    }, l = (i) => {
      const c = i, u = "touches" in c ? c.touches[0].clientX : c.clientX, h = "touches" in c ? c.touches[0].clientY : c.clientY, d = u + 1 >= n.lastX, f = u - n.startX, p = h - n.startY;
      if (e !== -1 && e < Math.abs(p)) {
        n.startX = 0;
        return;
      }
      if (!d) {
        n.startX = 0;
        return;
      }
      f > t && (r(s), n.startX = 0), n.lastX = u;
    }, { source: a } = s;
    a.addEventListener("mousedown", o), a.addEventListener("touchstart", o), a.addEventListener("mousemove", l), a.addEventListener("touchmove", l);
  });
}
function Xt(r, t = 10) {
  return L((e) => {
    let s = 0, n = 0;
    const o = (i) => {
      const c = i, u = "touches" in c ? c.touches[0].clientY : c.clientY;
      n = u, s = u;
    }, l = (i) => {
      const c = i, u = "touches" in c ? c.touches[0].clientY : c.clientY, h = u - 1 <= n, d = u - s;
      if (!h) {
        s = 0;
        return;
      }
      d < -1 * t && (r(e), s = 0), n = u;
    }, { source: a } = e;
    a.addEventListener("mousedown", o), a.addEventListener("touchstart", o), a.addEventListener("mousemove", l), a.addEventListener("touchmove", l);
  });
}
const w = (r, t, e = !1) => E.addCallback({
  eventName: r,
  callback: t,
  applyToWindow: e
}), Vt = (r) => w("change", r), Ut = (r) => w("click", r), Wt = (r) => w("dblclick", r), zt = (r) => w("focus", r), Kt = (r) => w("focusout", r), Gt = (r) => w("input", r), Jt = (r) => w("mouseenter", r), Zt = (r) => w("mouseleave", r), Qt = (r) => w("mousemove", r), te = (r) => w("resize", r, !0), ee = (r) => w("scroll", r), se = (r) => w("touchmove", r);
class it {
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
    const n = t.split("");
    s && console.log(
      `Comparsion: "${t}" with "${e.slice(0, t.length).join("")}"`
    );
    const o = [], l = () => {
      s && console.log(
        "Char by char comparsion:",
        o.map(
          (a) => `"${a.matchChar}" ${a.matchChar === a.arrayChar ? "==" : "!="} "${a.arrayChar}"`
        ).join(", ")
      );
    };
    for (let a = 0; a < n.length; a++) {
      const i = n[a], c = a;
      if (this._isOutOfBounds(e, c))
        return l(), !1;
      const u = e[c];
      if (o.push({ matchChar: i, arrayChar: u }), u !== i)
        return l(), !1;
    }
    return l(), !0;
  }
  /**
   * Reads string ignoring the comments sections with checks if the comment is in string
   */
  _read(t = () => {
  }) {
    const { comment: e, loop: s } = this, n = this.source.split("");
    let o = "";
    for (let i = 0; i < n.length; i++) {
      if (s.char = n[i], s.skipChars > 0) {
        s.skipChars--;
        continue;
      }
      if (e.multipleLineEnabled && this._matchNextChars(e.closing, n.slice(i)) && s.comment.multipleLineOpened) {
        s.comment.multipleLineOpened = !1, s.skipChars = e.closing.length - 1;
        continue;
      }
      if (e.singleLineEnabled && s.comment.singleLineOpened && this._matchNextChars(`
`, n.slice(i))) {
        s.comment.singleLineOpened = !1, s.skipChars = 1;
        continue;
      }
      if (!(s.comment.multipleLineOpened || s.comment.singleLineOpened)) {
        if (s.string.opened && s.char === s.string.openingChar) {
          s.string.opened = !1, s.string.openingChar = "", o += s.char;
          continue;
        }
        if (this.stringChars.includes(s.char) && !s.string.opened && (s.string.opened = !0, s.string.openingChar = s.char), e.singleLineEnabled && this._matchNextChars(e.singleLine, n.slice(i)) && !s.string.opened) {
          s.comment.singleLineOpened = !0;
          continue;
        }
        if (e.multipleLineEnabled && this._matchNextChars(e.opening, n.slice(i))) {
          if (s.string.multipleLineOpened && e.ignoreInString) {
            o += s.char;
            continue;
          }
          s.comment.multipleLineOpened = !0;
          continue;
        }
        o += s.char;
      }
    }
    const l = o.split(""), a = (i, c) => {
      t(i, c, (u, h = !1) => u === void 0 ? !1 : this._matchNextChars(u, l.slice(c), h));
    };
    for (let i = 0; i < l.length; i++) {
      const c = l[i];
      if (s.string.opened && c === s.string.openingChar) {
        s.string.opened = !1, s.string.openingChar = "", a(c, i);
        continue;
      }
      if (this.stringChars.includes(c) && !s.string.opened) {
        s.string.opened = !0, s.string.openingChar = c, a(c, i);
        continue;
      }
      a(c, i);
    }
    return o;
  }
}
class J extends it {
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
    let e = !1, s = 0, n = "", o = "";
    const l = (a) => a.replaceAll(`
`, "");
    return this._read((a) => {
      const i = this.loop;
      if (a === "{" && !e && !i.string.opened) {
        e = !0, o = l(n), n = "", o in t || (t[o] = "");
        return;
      }
      if (!e) {
        n += a;
        return;
      }
      if (a === "{" && e && !i.string.opened && s++, a === "}" && s > 0 && !i.string.opened) {
        s--, n += a;
        return;
      }
      if (a === "}" && s === 0 && !i.string.opened) {
        const c = l(n);
        t[o] = t[o] ? `${t[o]};${c}` : c, o = "", n = "", e = !1;
        return;
      }
      n += a;
    }), t;
  }
}
class bt extends it {
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
    const t = (n) => n.replaceAll(`
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
    return this._read((n) => {
      const { loop: o } = this;
      if (n === ";" && !o.string.opened && s.reading === "value") {
        s._parse();
        const { name: u, value: h } = s;
        e[u] = h, s._reset();
        return;
      }
      if (n === ":" && !o.string.opened && s.reading === "name") {
        s.reading = "value";
        return;
      }
      if (s.reading === "value") {
        s.value += n;
        return;
      }
      s.reading === "name" && (s.name += n);
    }), e;
  }
}
const wt = {
  processSelector(r, t = "width") {
    const e = r.split(" "), s = e[1], n = e[2], o = {}, l = (() => {
      let c = "", u = "";
      for (const h of n.split(""))
        isNaN(Number(h)) ? u += h : c += h;
      return { number: parseInt(c), unit: u };
    })(), { number: a, unit: i } = l;
    return o["<"] = `max-${t}: ${a - 1}${i}`, o["<="] = `max-${t}: ${a}${i}`, o[">"] = `min-${t}: ${a + 1}${i}`, o[">="] = `min-${t}: ${a}${i}`, `@media only screen and (${o[s]})`;
  }
}, Z = {
  "backdrop-filter": ["-webkit-backdrop-filter"]
}, St = {
  processComponentStyle(r, t) {
    const e = new J(t).read();
    let s = [];
    const n = (l, a) => {
      l = l.trim();
      const i = `${l} { ${a} }`;
      return l.startsWith(":") ? [i] : l.split(",").map((c) => {
        const u = c.trim().substring(0, 1), h = u === "." || u === "#", d = [
          `${r}${h ? "" : " "}${c.trim()}`
        ];
        if (!h) {
          const f = c.split(" "), p = f[0], S = f.slice(1).join(" "), g = p.includes(":") ? p.slice(p.indexOf(":")) : "", C = p.replace(g, ""), k = `${g} ${S}`, j = k.split(",").map((O) => O.trim()).slice(1), R = k.includes(",") ? j.map((O) => {
            const b = [
              `${C}${r}`,
              `${O.replace(C, "")}`
            ], T = !b[1].startsWith(":");
            return b.join(T ? " " : "");
          }) : "";
          k.includes(",") ? d.push(
            `${C}${r}${k.replace(
              j,
              R
            )}`
          ) : d.push(`${C}${r}${k}`);
        }
        return d;
      }).map((c) => `${c.join(", ")} { ${a} }`).flat();
    }, o = (l, a) => {
      const i = new J(a).read(), c = [];
      for (const [u, h] of Object.entries(i)) {
        const d = new bt(h).read();
        for (const [p, S] of Object.entries(d))
          if (p in Z)
            for (const g of Z[p])
              g in d || (d[g] = S);
        const f = n(u, h);
        c.push(...f);
      }
      return c;
    };
    for (const [l, a] of Object.entries(e)) {
      if (a.trim() === "") continue;
      const i = l.trim(), c = i.startsWith("@media"), u = i.startsWith("@keyframes"), h = i.startsWith("@range"), d = i.startsWith("@width"), f = i.startsWith("@height");
      if (h || d || f) {
        const g = `${wt.processSelector(i, f ? "height" : "width")} { ${o(i, a).join(`
`)} }`;
        s.push(g);
        continue;
      }
      if (c) {
        const S = `${i} { ${o(
          i,
          a
        ).join(`
`)} }`;
        s.push(S);
        continue;
      }
      if (u) {
        s.push(`${i} { ${a} }`);
        continue;
      }
      const p = n(i, a);
      s.push(...p);
    }
    return s.join(" ").replaceAll(`
`, "");
  }
}, y = {
  info(r, ...t) {
    console.info(_.format(`${pt}${r}`), t);
  },
  success(r, ...t) {
    console.log(_.format(`${mt}${r}`), t);
  },
  error(r, ...t) {
    console.warn(_.format(`${ft}${r}`), t);
  }
}, $ = {
  HTMLToElement(r) {
    const t = document.createElement("template");
    t.innerHTML = r.trim();
    const e = t.content.firstElementChild;
    if (!e)
      throw new Error("htmlToElement: Provided HTML produced no element.");
    return e;
  },
  getAttributesStartingWith(r, t) {
    if (!r.attributes) return [];
    const e = [];
    for (const s of Array.from(r.attributes)) {
      const n = s.name;
      n.startsWith(t) && e.push(n);
    }
    return e;
  }
}, M = {
  injectAttribute(r, t, e) {
    const s = r.length;
    let n = 0;
    for (; n < s && r.charCodeAt(n) <= 32; ) n++;
    if (r[n] !== "<") return r;
    const o = n, l = r.indexOf(">", o);
    if (l === -1) return r;
    let a = r.slice(o, l);
    const i = new RegExp(
      `\\b${t}\\s*=\\s*(['"])(.*?)\\1`,
      "i"
    ), c = a.match(i);
    let u;
    if (c) {
      const h = c[0], d = c[1], f = c[2].trim(), p = f.length === 0 ? e : f.endsWith(";") ? f + e : t === "style" ? f + "; " + e : f + " " + e, S = `${t}=${d}${p}${d}`;
      u = a.replace(h, S);
    } else {
      const h = a.endsWith("/") ? a.length - 1 : a.length;
      u = a.slice(0, h) + ` ${t}="${e}"` + a.slice(h);
    }
    return r.slice(0, o) + u + r.slice(l);
  }
}, v = {
  /**
   * Returns values from keys if the value is not an object
   */
  getNonObjectValues(r) {
    const t = (e) => {
      if (!e || typeof e != "object") return [e];
      const s = [];
      for (const n of Object.keys(e)) {
        const o = e[n], l = typeof o == "object" && o !== null && !Array.isArray(o);
        s.push(...l ? t(o) : [o]);
      }
      return s;
    };
    return t(r);
  },
  /**
   * Deep merges two objects
   * object2 overwrites object1 by default
   */
  join(r, t, e = !0) {
    const s = (n, o) => {
      if (typeof n != "object" || n === null)
        return o ?? n;
      const l = Array.isArray(n) ? [...n] : {}, a = /* @__PURE__ */ new Set([
        ...Object.keys(n ?? {}),
        ...Object.keys(o ?? {})
      ]);
      for (const i of a) {
        if (!(i in o)) {
          l[i] = n?.[i];
          continue;
        }
        !e && i in n ? l[i] = n[i] : l[i] = s(n?.[i], o?.[i]);
      }
      return l;
    };
    return s(r, t);
  },
  /**
   * Deep copy of an object
   */
  copy(r) {
    const t = (e) => {
      if (e === null) return null;
      const s = typeof e != "object", n = typeof HTMLElement < "u" && (e instanceof HTMLElement || e instanceof Node);
      if (s || n) return e;
      if (Array.isArray(e))
        return e.map((l) => t(l));
      const o = {};
      for (const [l, a] of Object.entries(e))
        o[l] = t(a);
      return o;
    };
    return t(r);
  },
  /**
   * Removes keys that have nullable / empty values (mutates object)
   */
  filterOutNullableValues(r) {
    for (const [t, e] of Object.entries(r)) {
      const s = typeof e == "object" && e !== null && !Array.isArray(e) && Object.keys(e).length === 0;
      (e == null || Array.isArray(e) && e.length === 0 || typeof e == "string" && e.trim() === "" || s) && delete r[t];
    }
    return r;
  },
  isEmpty(r) {
    return !r || Object.keys(r).length === 0;
  }
}, ot = {
  withCredentials: !1
};
class F {
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
class kt {
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
    if (ot.withCredentials && (t.withCredentials = !0), e || s)
      if (e && !s)
        t.setRequestHeader("Content-Type", "application/json"), t.send(JSON.stringify(this.body));
      else {
        const n = new FormData();
        if (Object.entries(this.files).forEach(([o, l]) => {
          l instanceof FileList ? Array.from(l).forEach(
            (a) => n.append(o, a)
          ) : n.append(o, l);
        }), e && !this.bodyKey) {
          console.error("BodyKey required when sending files + body"), t.send(n);
          return;
        }
        e && this.bodyKey && n.append(this.bodyKey, JSON.stringify(this.body)), t.send(n);
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
        return new F(
          s.statusCode,
          s.data,
          !1
        );
    }
    this.cooldown > 0 && await new Promise((s) => setTimeout(s, this.cooldown));
    const t = new XMLHttpRequest();
    return t.open(this.method.toUpperCase(), this.buildUrl(), !0), this.responseType && (t.responseType = this.responseType), Object.entries(this.headers).forEach(([s, n]) => {
      t.setRequestHeader(s, String(n));
    }), this.onStartCallback(), await new Promise((s) => {
      t.onreadystatechange = () => {
        if (t.readyState !== 4) return;
        const n = new F(
          t.status,
          t.response,
          t.status === 0
        );
        this.onEndCallback(n), n.isError() ? this.onErrorCallback(n) : this.onSuccessCallback(n), this.cacheSeconds > 0 && this.setCached({
          data: t.response,
          statusCode: t.status
        }, this.cacheSeconds), s(n);
      }, t.upload.onprogress = (n) => {
        if (n.lengthComputable) {
          let o = n.loaded / n.total * 100;
          this.onProgressCallback(o, n.loaded, n.total, n);
        }
      }, t.onerror = () => {
        const n = new F(0, null, !0);
        this.onErrorCallback(n), s(null);
      }, this.sendBodyOrFiles(t);
    });
  }
}
const ne = {
  clearCache() {
    for (let r = 0; r < localStorage.length; r++) {
      const t = localStorage.key(r);
      t?.startsWith("cjsrequest-") && localStorage.removeItem(t);
    }
  },
  setIncludeCredentials(r) {
    ot.withCredentials = r;
  }
};
class vt {
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
class X {
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
    const e = Array.from(this.#t.querySelectorAll("select")), s = Array.from(this.#t.querySelectorAll("input")), n = Array.from(this.#t.querySelectorAll("textarea")), o = [...e, ...s, ...n], l = {};
    for (let a = 0; a < o.length; a++) {
      const i = o[a], c = i.getAttribute("name");
      if (!c && !t.includeNoNames) continue;
      const u = i.getAttribute("type") ?? "*", d = (this.#e[u] ?? this.#e["*"])(i), f = c ?? a;
      l[f] = d;
    }
    if (t.checkboxesReadType === "array") {
      const a = s.filter((i) => i.type === "checkbox");
      for (const i of a) {
        if (!i.name) {
          y.error("Checkbox doesn't have a name attribute, but it's required when options.checkboxesReadType === array", i);
          continue;
        }
        const c = i.name;
        (!(c in l) || !Array.isArray(l[c])) && (l[c] = []), i.checked && l[c].push(i.value);
      }
    }
    return l;
  }
}
const Q = [], z = class z {
  /**
   * / ⚪ ------------ CONSTRUCTOR SCOPE ------------ ⚪ /
   */
  constructor(t = null, e = null) {
    this.__events = {}, this._cssStyle = null, this._additionalStyle = {}, this._defaultData = {}, this._preSetData = {}, this._id = null, this._customId = null, this.element = null, t && (this._preSetData = v.copy(t)), e && (this._additionalStyle = v.copy(e)), this.createId();
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
        this._id = x.getRandom(6);
      t.set(this.constructor, { id: this._id });
    }
  }
  /** Passes processed component style to global root style */
  async injectRootStyle() {
    if (!this._cssStyle) return;
    const t = this._cssStyle.startsWith("./") ? this._cssStyle.slice(2) : this._cssStyle, e = await new kt(t, "get").doRequest();
    if (e.isError()) {
      y.error(`Error occurred while importing style (&e${t}&r)`);
      return;
    }
    const s = e.text(), n = document.head.querySelector(`[id="${H}"]`);
    n && (n.innerHTML += St.processComponentStyle(`[${Y}*="${this._id}"]`, s));
  }
  /** Provides the HTML string for the component */
  getHtml() {
    let t = this._template();
    const e = this.constructor._prototypesData.get(this.constructor), s = [];
    if (this._cssStyle && (Q.includes(this._cssStyle) || (this.injectRootStyle(), Q.push(this._cssStyle))), v.isEmpty(this._additionalStyle) || (t = M.injectAttribute(
      t,
      "style",
      Object.entries(this._additionalStyle).map((n) => `${x.camelStyleToKebabCase(n[0])}: ${n[1]}`).join("; ")
    )), e && "fillHeightData" in e) {
      const { maxHeight: n, offset: o } = e.fillHeightData, l = (a) => {
        const { source: i } = a;
        i.style.height = `${n !== void 0 && window.innerHeight > n ? n : window.innerHeight + o}px`;
      };
      s.push((a) => {
        window.addEventListener("resize", (i) => l(a)), l(a);
      });
    }
    return t = M.injectAttribute(t, L((n) => {
      s.forEach((o) => o(n)), this.element = n.source;
    }), ""), t = M.injectAttribute(t, Y, this._id), this._customId !== null && (t = M.injectAttribute(t, G, this._customId)), t;
  }
  getConstructorClass() {
    return this.constructor;
  }
  /** Builds the DOM selector used to target the component's rendered elements. */
  getSelector() {
    return this._customId !== null ? `[${G}="${this._customId}"]` : `[${Y}="${this._id}"]`;
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
      (e) => new X(e)
    ) : null;
  }
  getComponents() {
    return new vt(document.body.querySelectorAll(this.getSelector()));
  }
  /** Assigns a custom id to the component so it can be targeted later through {@link CjsComponent.getId} */
  withId(t) {
    return this._customId = t == null ? null : String(t), this;
  }
  /** Sets the data for the component */
  withData(t = null) {
    return t && (this._preSetData = v.copy(t)), this;
  }
  /** Sets additional style for the component */
  withStyle(t) {
    return this._additionalStyle = v.copy(t), this;
  }
  /** Example: render HTML string */
  render(t = null) {
    const e = new (this.getConstructorClass())(t);
    return e._customId = this._customId, e.getHtml();
  }
  /** Example: visualise component as element */
  visualise(t = null) {
    return t && (this._preSetData = v.copy(t)), $.HTMLToElement(this.getHtml());
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
    return t && (this._preSetData = v.copy(t)), this.getAll().forEach((s) => {
      const n = $.HTMLToElement(this.getHtml());
      s.replaceWith(n);
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
    return v.copy(
      v.join(this._defaultData, this._preSetData)
    );
  }
  /** Provides all form elements within the component as CjsForm instances */
  get forms() {
    return Array.from(
      $.HTMLToElement(this.getHtml()).querySelectorAll("form"),
      (t) => new X(t)
    );
  }
  /** Provides all event handlers for the component */
  get events() {
    const t = this;
    return new Proxy(this.__events, {
      get(e, s) {
        return s in e ? e[s] : (n) => {
          t._events()[s](n);
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
      (s) => new X(s)
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
z._prototypesData = /* @__PURE__ */ new Map();
let V = z;
class U {
  /**
   * @param elements Function returning layout structure
   */
  constructor(t) {
    this._onBeforeLoadCallback = null, this._onAfterLoadCallback = null, this._preSetData = null, this._additionalStyle = null, this._layoutObjects = [], this.elements = t;
  }
  withData(t) {
    return this._preSetData = t, this;
  }
  withStyle(t) {
    return this._additionalStyle = t, this;
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
    function e(l) {
      return typeof l == "function" && l.prototype?.constructor === l;
    }
    function s(l) {
      return l[Symbol.toStringTag] === "AsyncFunction";
    }
    const n = (l, a) => {
      if (!(l instanceof V))
        return y.error("The element should be CjsComponent, but passed", l), [this.createErrorElement()];
      const i = l.visualise();
      if (a.length === 2) {
        let u = i.getElementsByTagName(D)[0];
        const h = a[1];
        if (!Array.isArray(h))
          return y.error("Layout sub components at second argument have to be Array"), [i];
        h.forEach((d, f) => {
          if (d === null) return;
          const p = f === h.length - 1, S = d[0], g = o(d);
          if (S instanceof U) {
            for (const C of g)
              i.insertAdjacentElement("beforeend", C);
            return;
          }
          if (u = i.getElementsByTagName(D)[0], u) {
            p || u.insertAdjacentElement(
              "afterend",
              document.createElement(D)
            );
            for (const C of g)
              u.insertAdjacentElement("afterend", C);
            u.remove();
          } else
            for (const C of g)
              i.insertAdjacentElement("beforeend", C);
        });
      }
      return [i];
    }, o = (l) => {
      if (!Array.isArray(l))
        return y.error("Layout have wrong pattern, component should be in array"), [this.createErrorElement()];
      if (l.length === 0)
        return y.error("Layout have an empty component space"), [this.createErrorElement()];
      const a = l[0];
      if (a instanceof U)
        return a.visualise();
      if (s(a)) {
        const c = document.createElement("cjsasyncelement");
        return a().then((u) => {
          const h = o([u]);
          for (const d of h)
            c.insertAdjacentElement("beforebegin", d);
          c.remove();
        }), [c];
      }
      const i = e(a) ? new a() : a;
      return n(i, l);
    };
    if (this.elements(this._preSetData).forEach((l) => {
      if (!l) return;
      const a = o(l.filter((i) => i !== null));
      for (const i of a)
        t.insertAdjacentElement(
          "beforeend",
          i
        );
    }), this._layoutObjects = Array.from(t.children), this._additionalStyle) {
      for (const l of this._layoutObjects) {
        const a = Object.entries(this._additionalStyle).map((u) => `${u[0]}: ${u[1]}`).join("; ") + ";", i = l.hasAttribute("style") ? l.getAttribute("style") : null;
        if (!i) {
          l.setAttribute("style", a);
          continue;
        }
        const c = i.endsWith(";");
        l.setAttribute(
          "style",
          c ? `${i} ${a}` : `${i}; ${a}`
        );
      }
      this._additionalStyle = null;
    }
    if (this._onAfterLoadCallback) {
      const l = E.addOnAddElementCallback(this._onAfterLoadCallback).trim();
      this._layoutObjects[0].setAttribute(l, "");
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
    t.slice(1).forEach((n) => n.remove());
    for (const n of this.visualise())
      e.insertAdjacentElement("beforebegin", n);
    e.remove();
  }
}
let W = !1;
function tt() {
  if (W) return null;
  const r = document.head.appendChild(
    $.HTMLToElement(`<style id="${H}"></style>`)
  );
  return W = !0, r;
}
const at = {
  create() {
    tt();
  },
  appendStyle(r) {
    if (!W) {
      tt().innerHTML += r;
      return;
    }
    const t = document.getElementById(H);
    t.innerHTML += r;
  }
};
class B {
  /**
   * Adds CSS style rules to plugin style container
   */
  _addStyleRules(t) {
    for (const [e, s] of Object.entries(t)) {
      const n = `${e} { ${s.join(" ")} }`;
      at.appendStyle(`
${n}`);
    }
  }
}
class Et extends B {
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
      const s = e.touches ? e.touches[0] : e, n = t.getBoundingClientRect(), o = Math.sqrt(Math.pow(n.width, 2) + Math.pow(n.height, 2)) * 2;
      t.style.cssText = `--${this.cssVariables.s}: 0; --${this.cssVariables.o}: 1;`, t.offsetTop, t.style.cssText = `--${this.cssVariables.t}: 1;
                 --${this.cssVariables.o}: 0;
                 --${this.cssVariables.d}: ${o};
                 --${this.cssVariables.x}: ${s.clientX - n.left};
                 --${this.cssVariables.y}: ${s.clientY - n.top};`;
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
      const s = e.filter((n) => n.type === "childList").flatMap((n) => Array.from(n.addedNodes)).filter((n) => n instanceof HTMLElement).flatMap((n) => [
        n,
        ...Array.from(n.querySelectorAll("*"))
      ]).filter((n) => n.hasAttribute(this.attribute));
      for (const n of s)
        this.applyEffect(n);
    }).observe(document.documentElement, {
      childList: !0,
      subtree: !0
    });
  }
}
const et = [], st = [];
class I {
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
      `[id="${H}"]`
    );
    if (!s)
      throw new Error("Keyframes style element not found");
    const n = e ? [...this.entries].reverse() : this.entries, o = n.length === 1, l = 100 / Math.max(n.length - 1, 1), i = `{
${n.map((b, T) => {
      const ct = o ? 100 : T * l, lt = Object.entries(b).map(([ut, ht]) => `${ut}: ${ht};`).join(" ");
      return `    ${ct}% { ${lt} }`;
    }).join(`
`)}
}`, c = x.getHash(i), u = et.find((b) => b.hash === c);
    let h;
    if (u)
      h = u.animation;
    else {
      h = `${gt}${x.getRandom(16)}`;
      const b = `@keyframes ${h} ${i}`;
      s.innerHTML += `
${b}`, et.push({
        hash: c,
        animation: h
      });
    }
    const d = n[n.length - 1], f = this.isImportant ? " !important" : "", p = Object.entries(d).map(([b, T]) => `${b}: ${T};`).join(" "), g = [`animation: ${h} ${this.duration / 1e3}s ${this.timingFunction}${f}`];
    this.keepEndingEntryStyle && g.push(p);
    const C = `{ ${g.join("; ")} }`, k = x.getHash(`${this.selector}-${C}`), j = st.find((b) => b.hash === k);
    if (j)
      return j.class;
    const R = `${h}-${k}`, O = `.${R} ${this.selector} ${C}`;
    return s.innerHTML += `
${O}`, st.push({
      hash: k,
      class: R
    }), R;
  }
}
class $t extends B {
  constructor() {
    super(), this.attribute = "scale", this.animationTime = 350, this.scales = {
      start: 0.85,
      end: 1
    }, this.keyframe = new I().setDuration(this.animationTime).addEntry({ transform: `scale(${this.scales.start})` }).addEntry({ transform: `scale(${this.scales.end})` });
  }
  handleTouch(t, e) {
    if (t.hasAttribute("disabled")) return;
    const s = this.keyframe.getClass({
      reversed: e
    }), n = e ? this.scales.start : this.scales.end;
    t.classList.add(s), t.style.transform = `scale(${n})`, setTimeout(() => {
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
      const n = s.filter((o) => o.type === "childList").flatMap((o) => Array.from(o.addedNodes)).filter(
        (o) => o instanceof HTMLElement
      ).flatMap((o) => [
        o,
        ...Array.from(o.querySelectorAll("*"))
      ]).filter((o) => o.hasAttribute(this.attribute));
      for (const o of n)
        this.applyEvents(o);
    }).observe(document.documentElement, {
      childList: !0,
      subtree: !0
    });
  }
}
const Lt = {
  /**
   * Creates a delay (sleep)
   */
  sleep(r) {
    return new Promise((t) => {
      setTimeout(t, r);
    });
  }
};
class _t extends B {
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
    const s = document.getElementById(this.containerId) ?? this.createContainer(), n = {
      success: '<svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>checkmark1</title> <path d="M21.82 13.030l-1.002-1.002c-0.185-0.185-0.484-0.185-0.668 0l-6.014 6.013-2.859-2.882c-0.186-0.185-0.484-0.185-0.67 0l-1.002 1.003c-0.185 0.185-0.185 0.484 0 0.668l4.193 4.223c0.185 0.184 0.484 0.184 0.668 0l7.354-7.354c0.186-0.185 0.186-0.484 0-0.669zM16 3c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13-5.82-13-13-13zM16 26c-5.522 0-10-4.478-10-10 0-5.523 4.478-10 10-10 5.523 0 10 4.477 10 10 0 5.522-4.477 10-10 10z"></path> </g></svg>',
      error: '<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>error</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="add" fill="#ffffff" transform="translate(42.666667, 42.666667)"> <path d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,42.6666667 C119.232,42.6666667 42.6666667,119.232 42.6666667,213.333333 C42.6666667,307.434667 119.232,384 213.333333,384 C307.434667,384 384,307.434667 384,213.333333 C384,119.232 307.434667,42.6666667 213.333333,42.6666667 Z M262.250667,134.250667 L292.416,164.416 L243.498667,213.333333 L292.416,262.250667 L262.250667,292.416 L213.333333,243.498667 L164.416,292.416 L134.250667,262.250667 L183.168,213.333333 L134.250667,164.416 L164.416,134.250667 L213.333333,183.168 L262.250667,134.250667 Z" id="error"> </path> </g> </g> </g></svg>',
      info: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" fill-rule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8-4a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01 8a1 1 0 102 0V9a1 1 0 10-2 0v5z"></path> </g></svg>',
      warning: '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7.493 0.015 C 7.442 0.021,7.268 0.039,7.107 0.055 C 5.234 0.242,3.347 1.208,2.071 2.634 C 0.660 4.211,-0.057 6.168,0.009 8.253 C 0.124 11.854,2.599 14.903,6.110 15.771 C 8.169 16.280,10.433 15.917,12.227 14.791 C 14.017 13.666,15.270 11.933,15.771 9.887 C 15.943 9.186,15.983 8.829,15.983 8.000 C 15.983 7.171,15.943 6.814,15.771 6.113 C 14.979 2.878,12.315 0.498,9.000 0.064 C 8.716 0.027,7.683 -0.006,7.493 0.015 M8.853 1.563 C 9.967 1.707,11.010 2.136,11.944 2.834 C 12.273 3.080,12.920 3.727,13.166 4.056 C 13.727 4.807,14.142 5.690,14.330 6.535 C 14.544 7.500,14.544 8.500,14.330 9.465 C 13.916 11.326,12.605 12.978,10.867 13.828 C 10.239 14.135,9.591 14.336,8.880 14.444 C 8.456 14.509,7.544 14.509,7.120 14.444 C 5.172 14.148,3.528 13.085,2.493 11.451 C 2.279 11.114,1.999 10.526,1.859 10.119 C 1.618 9.422,1.514 8.781,1.514 8.000 C 1.514 6.961,1.715 6.075,2.160 5.160 C 2.500 4.462,2.846 3.980,3.413 3.413 C 3.980 2.846,4.462 2.500,5.160 2.160 C 6.313 1.599,7.567 1.397,8.853 1.563 M7.706 4.290 C 7.482 4.363,7.355 4.491,7.293 4.705 C 7.257 4.827,7.253 5.106,7.259 6.816 C 7.267 8.786,7.267 8.787,7.325 8.896 C 7.398 9.033,7.538 9.157,7.671 9.204 C 7.803 9.250,8.197 9.250,8.329 9.204 C 8.462 9.157,8.602 9.033,8.675 8.896 C 8.733 8.787,8.733 8.786,8.741 6.816 C 8.749 4.664,8.749 4.662,8.596 4.481 C 8.472 4.333,8.339 4.284,8.040 4.276 C 7.893 4.272,7.743 4.278,7.706 4.290 M7.786 10.530 C 7.597 10.592,7.410 10.753,7.319 10.932 C 7.249 11.072,7.237 11.325,7.294 11.495 C 7.388 11.780,7.697 12.000,8.000 12.000 C 8.303 12.000,8.612 11.780,8.706 11.495 C 8.763 11.325,8.751 11.072,8.681 10.932 C 8.616 10.804,8.460 10.646,8.333 10.580 C 8.217 10.520,7.904 10.491,7.786 10.530 " stroke="none" fill-rule="evenodd" fill="#ffffff"></path></g></svg>'
    }, o = $.HTMLToElement(`
            <div class="notification ${e}">
                <div class="icon">
                    ${n[e]}
                </div>
                <p>${t}</p>
            </div>
        `);
    s.appendChild(o), Lt.sleep(this.keyframe.duration).then(() => o.remove());
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
class xt extends B {
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
const At = new Et(), jt = new _t(), Rt = new $t(), Ot = new xt(), re = {
  /**
   * Enables selected plugins
   */
  enable(r = {}) {
    const t = {
      ripple: At,
      notification: jt,
      scaleClick: Rt,
      scaleHover: Ot
    };
    for (const e of Object.keys(t))
      r[e] && t[e].enable();
  }
};
class Tt {
  /**
   * Simple translateX animation
   */
  x(t, e = 500) {
    return new I().setDuration(e).addEntry({ transform: `translateX(${t}px)` }).addEntry({ transform: "translateX(0)" }).getClass();
  }
  /**
   * Simple translateY animation
   */
  y(t, e = 500) {
    return new I().setDuration(e).addEntry({ transform: `translateY(${t}px)` }).addEntry({ transform: "translateY(0)" }).getClass();
  }
  /**
   * Simple scale animation
   */
  scale(t, e = 500) {
    return new I().setDuration(e).addEntry({ transform: `scale(${t})` }).addEntry({ transform: "scale(1)" }).getClass();
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
const ie = new Tt(), Mt = {
  /**
   * Returns parsed path that does not start with `./` or `/`
   */
  toFixedPath(r) {
    return r.startsWith("./") ? r.slice(2) : r.startsWith("/") ? r.slice(1) : r;
  }
};
function q(r) {
  return `src/assets/${Mt.toFixedPath(r)}`;
}
function oe(r) {
  return q(`svg/${r}.svg`);
}
function ae(r) {
  return q(`images/${r}.png`);
}
function ce(r) {
  return q(`images/${r}.jpg`);
}
function le(r) {
  return q(`gif/${r}.gif`);
}
const ue = {
  async download(r, t = null) {
    try {
      const e = await fetch(r);
      if (!e.ok)
        return y.error(`Couldn't download file: ${e.statusText}`, e);
      const s = await e.blob();
      nt(s, t ?? r.split("/").pop());
    } catch (e) {
      return y.error("Couldn't fetch file", e);
    }
  },
  async downloadFile(r, t, e = null) {
    try {
      const s = new Blob([r], { type: t }), n = t.split("/").pop() ?? "file", o = e ?? `${n}.${n}`;
      nt(s, o);
    } catch (s) {
      y.error("Couldn't create download file", s);
    }
  }
};
function nt(r, t) {
  if (typeof document > "u") return;
  const e = document.createElement("a");
  e.href = URL.createObjectURL(r), e.download = t ?? "download", document.body.appendChild(e), e.click(), document.body.removeChild(e), URL.revokeObjectURL(e.href);
}
const A = {
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
  A.mouse.up = !1, A.mouse.down = !0, A.mouse.state = "down";
});
window.addEventListener("mouseup", () => {
  A.mouse.up = !0, A.mouse.down = !1, A.mouse.state = "up";
});
window.addEventListener("DOMContentLoaded", () => {
  A.window.DOMContentLoaded = !0;
});
function he(r) {
  return r;
}
const de = {
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
}, fe = new class {
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
      const o = (document.getElementById(this.#t) ?? this.#a()).querySelector("p:nth-child(2)");
      o && (o.innerHTML = `/${this.search}`);
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
    const s = this.search.split("/").filter((n) => n.trim() !== "");
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
    const n = e.slice(0, e.length - t);
    return this.search = n.join("/"), this.update(), this;
  }
}();
function pe(r, t) {
  return Array.isArray(r) ? r.map(t).join("") : (y.error("The provided argument in strmap is not an array", r), "");
}
function ge(r, t) {
  return r ? t : "";
}
function ye(r, t) {
  if (!r || r.length <= t) return r;
  const s = t - 3;
  return s <= 0 ? "..." : r.substring(0, s) + "...";
}
function Ce(r, t) {
  return r == null || r.trim() === "" ? t : r;
}
const be = {
  /**
   * Checks if provided string is a valid email
   */
  isEmail(r) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r);
  }
};
class we {
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
    const e = x.getRandom(16);
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
const Se = {
  /**
   * Opens a url within a new tab / target
   */
  open(r, t = "_blank") {
    if (typeof document > "u") return;
    const e = document.createElement("a");
    e.href = r, e.target = t, e.style.display = "none", document.body.appendChild(e), e.click(), e.remove();
  }
}, rt = new class {
  constructor() {
    this.callback = (t) => {
      this.processForms();
      const s = t.filter((n) => n.type === "childList").filter((n) => n.type === "childList").flatMap((n) => Array.from(n.addedNodes)).filter((n) => n.nodeType === 1).flatMap((n) => [
        n,
        ...Array.from(n.querySelectorAll("*"))
      ]);
      for (const n of s)
        this.processElementEvents(n);
    }, this.#t = new MutationObserver(this.callback);
  }
  #t;
  #e(t, e) {
    if (!E.hasCallback(t)) return;
    const s = E.getCallback(t);
    (s.applyToWindow ? window : e).addEventListener(
      s.eventName,
      (o) => s.callback({ event: o, source: e })
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
      P
    );
    if (e.length !== 0)
      for (const s of e) {
        const n = Array.from(document.body.querySelectorAll(`[${s}]`)), o = s.replace(P, "");
        for (const l of n)
          l.removeAttribute(s), this.#e(o, l), this.#s(o, l);
      }
  }
  observe() {
    this.#t.observe(document.body, {
      childList: !0,
      subtree: !0
    });
  }
}();
function It(r) {
  const t = document.body.querySelector(K);
  if (!t)
    return document.body.appendChild(document.createElement(K)), It(r);
  at.create(), t.innerHTML = "", rt.observe();
  for (const e of r.visualise())
    t.appendChild(e), Array.from(e.querySelectorAll("*")).forEach((s) => {
      rt.processElementEvents(s);
    });
}
export {
  ie as CjsAnimation,
  V as CjsComponent,
  ue as CjsDownload,
  A as CjsGlobals,
  I as CjsKeyFrame,
  U as CjsLayout,
  de as CjsMobile,
  jt as CjsNotification,
  v as CjsObjectUtil,
  re as CjsPluginManager,
  kt as CjsRequest,
  ne as CjsRequests,
  fe as CjsSearch,
  x as CjsStringUtil,
  Lt as CjsTimings,
  be as CjsValidator,
  we as CjsWebSocket,
  Se as CjsWindow,
  q as asset,
  he as createHandle,
  le as gif,
  It as init,
  ce as jpg,
  Vt as onChange,
  Ut as onClick,
  Wt as onDoubleClick,
  Nt as onEscape,
  zt as onFocus,
  Kt as onFocusOut,
  Ht as onHoldDown,
  Gt as onInput,
  L as onLoad,
  Jt as onMouseEnter,
  Zt as onMouseLeave,
  Qt as onMouseMove,
  Bt as onOuterclick,
  te as onResize,
  ee as onScroll,
  qt as onScrollBottom,
  Dt as onSlideDown,
  Yt as onSlideLeft,
  Ft as onSlideRight,
  Xt as onSlideUp,
  se as onTouchMove,
  ae as png,
  ge as strif,
  pe as strmap,
  ye as strmax,
  Ce as stror,
  oe as svg
};
//# sourceMappingURL=cjs.mjs.map
