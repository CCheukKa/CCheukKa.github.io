var e,r,t,n;r={},t={},null==(n=(e=globalThis).parcelRequire38c6)&&((n=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var o={id:e,exports:{}};return r[e]=o,n.call(o.exports,o,o.exports),o.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,r){t[e]=r},e.parcelRequire38c6=n),(0,n.register)("5SBNj",function(e,r){function t(e,r){function t(e){return e<=1?1:e*t(e-1)}return function(e,r){let n=Object.keys(e),o=n.length,l={};for(let e of n)l[e]=0;for(let i=0;i<1<<o;i++){let f=[];for(let e=0;e<o;e++)i&1<<e&&f.push(n[e]);for(let n of f){let i=f.filter(e=>e!==n),u=r(f,e)-r(i,e),c=f.length,a=t(i.length)*t(o-c)/t(o);l[n]+=u*a}}return l}(e,r)}Object.defineProperty(e.exports,"default",{get:()=>t,set:void 0,enumerable:!0,configurable:!0})}),n("5SBNj");
//# sourceMappingURL=Shapely.js.map