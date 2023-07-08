const fs = require('fs');

class Min {
  constructor() {
    this.translations = {
      r: "require",
      c: "const",
      v: "var",
      cs: "console",
      f: "function",
      m: "module",
      ex: "exports",
      rf: "readFileSync",
      wfs: "writeFileSync",
      p: "process",
      a: "Array",
      o: "Object",
      prom: "Promise",
      se: "setInterval",
      si: "setTimeout",
      fe: "forEach",
      pr: "prototype",
      pu: "push",
      sl: "slice",
      jo: "join",
      st: "startsWith",
      en: "endsWith",
      su: "substring",
      co: "concat",
      in: "includes",
      ma: "map",
      fi: "filter",
      ev: "every",
      so: "sort",
      re: "reduce",
      pr: "print",
      rea: "read",
      wr: "write",
      len: "length",
      sp: "split",
      pa: "parse",
      str: "stringify",
      ch: "charAt",
      cod: "codePointAt",
      repl: "replace",
      mat: "match",
      tri: "trim",
      low: "toLowerCase",
      upp: "toUpperCase",
      def: "defineProperty",
      des: "descriptor",
      obj: "Object",
      gop: "getOwnPropertyNames",
      ca: "call",
      ap: "apply",
      new: "new",
      pro: "prototype",
      has: "hasOwnProperty",
      fun: "Function",
      ar: "arguments",
      iof: "indexOf",
      bof: "Buffer.from",
      bos: "Buffer.alloc",
      pi: "parseInt",
      ps: "parseFloat",
      ts: "toString",
      join: "join",
      ars: "Array.isArray",
      tasi: "Array.from",
      sl: "slice",
      arr: "Array",
      fl: "fill",
      co: "copyWithin",
      ent: "entries",
      so: "sort",
      pop: "pop",
      pus: "push",
      rev: "reverse",
      sh: "shift",
      un: "unshift",
      con: "concat",
      of: "indexOf",
      jo: "join",
      sp: "splice",
      ev: "every",
      fi: "filter",
      fin: "find",
      fiin: "findIndex",
      for: "forEach",
      inc: "includes",
      ind: "indexOf",
      las: "lastIndexOf",
      map: "map",
      re: "reduce",
      rem: "reduceRight",
      som: "some",
      fil: "fill",
      so: "sort",
      sl: "slice",
      tox: "toLocaleString",
      tos: "toString",
      val: "valueOf",
      ma: "Math",
      ra: "random",
      ab: "abs",
      ce: "ceil",
      fl: "floor",
      ma: "max",
      mi: "min",
      ro: "round",
      sq: "sqrt",
      po: "pow",
      ran: "random",
      ranf: "randomFillSync",
      rans: "randomFill",
      ranb: "randomBytes",
      si: "sign",
      siZ: "signbit",
      tr: "trunc",
      cl: "clearImmediate",
      sti: "setImmediate",
      cin: "clearInterval",
      ini: "setInterval",
      cota: "clearTimeout",
      iniT: "setTimeout",
      co: "console",
      ti: "time",
      tie: "timeEnd",
      clc: "clear",
      wa: "warn",
      er: "error",
      in: "info",
      de: "dir",
      di: "dirxml",
      co: "count",
      as: "assert",
      tr: "trace",
      trw: "traceWarnings",
      ta: "table",
      gr: "group",
      gre: "groupEnd",
      grc: "groupCollapsed",
      co: "console",
      de: "debug",
      lo: "log",
      in: "info",
      wa: "warn",
      er: "error",
    };
    this.filePaths = [];
  }

  translateCode(code) {
    for (const key in this.translations) {
      if (this.translations.hasOwnProperty(key)) {
        const regex = new RegExp(`\\b${key}\\b`, "g");
        code = code.replace(regex, this.translations[key]);
      }
    }
    return code;
  }

  file(filePath) {
    this.filePaths.push(filePath);
  }

  run() {
    for (const filePath of this.filePaths) {
      const code = fs.readFileSync(filePath, 'utf8');
      const translatedCode = this.translateCode(code);
      eval(translatedCode);
    }
  }
}

const min = new Min();

module.exports = {
  min
};
