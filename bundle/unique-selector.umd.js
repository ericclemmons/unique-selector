!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).uniqueSelector={})}(this,function(e){"use strict";function t(e){const t=e.getAttribute("id");return null!==t&&""!==t?t.match(/^\d/)?`[id="${t}"]`:"#"+t:null}function n(e){return function(e){if(!e.hasAttribute("class"))return[];try{return Array.prototype.slice.call(e.classList).filter(e=>/^[a-z_-][a-z\d_-]*$/i.test(e)?e:null)}catch(t){let n=e.getAttribute("class");return(n=n.trim().replace(/\s+/g," ")).split(" ")}}(e).filter(Boolean).map(e=>`.${e}`)}function r(e,t,n,o,l,u,s){if(u!==s)for(let i=o;i<=l&&l-i+1>=s-u;++i)n[u]=t[i],r(e,t,n,i+1,l,u+1,s);else e.push(n.slice(0,u).join(""))}function o(e){let t;return t="object"==typeof HTMLElement?e instanceof HTMLElement:!!e&&"object"==typeof e&&1===e.nodeType&&"string"==typeof e.nodeName}function l(e){let t,n,r=0;const{parentNode:l}=e;if(Boolean(l)){const{childNodes:u}=l,s=u.length;for(t=0;t<s;t++)if(o(n=u[t])&&(r++,n===e))return`:nth-child(${r})`}return null}function u(e){return e.tagName.toLowerCase().replace(/:/g,"\\:")}function s(e,t){if(!Boolean(t))return!1;const n=e.ownerDocument.querySelectorAll(t);return 1===n.length&&n[0]===e}function i(e,t){const{parentNode:n}=e,r=n.querySelectorAll(t);return 1===r.length&&r[0]===e}function c(e,t){return t.find(i.bind(null,e))}function f(e,t,n){let o=function(e,t){const n=[],o=e.length,l=[];for(var u=1;u<=t;++u)r(n,e,l,0,o-1,0,u);return n}(t,3),l=c(e,o);return l||(n&&(l=c(e,o=o.map(e=>n+e)))?l:null)}function a(e,r,o,s){let c;const a=function(e,r,o){const s={Tag:u,NthChild:l,Attributes:e=>(function(e,t=["id","class","length"]){const{attributes:n}=e;return[...n].reduce((e,n)=>(t.indexOf(n.nodeName)>-1||e.push(`[${n.nodeName}="${n.value}"]`),e),[])})(e,o),Class:n,ID:t};return r.reduce((t,n)=>(t[n]=s[n](e),t),{})}(e,r,o);s&&s instanceof RegExp&&(a.ID=s.test(a.ID)?null:a.ID,a.Class=a.Class.filter(e=>!s.test(e)));for(let t of r){const{ID:n,Tag:r,Class:o,Attributes:l,NthChild:u}=a;switch(t){case"ID":if(Boolean(n)&&i(e,n))return n;break;case"Tag":if(Boolean(r)&&i(e,r))return r;break;case"Class":if(Boolean(o)&&o.length&&(c=f(e,o,r)))return c;break;case"Attributes":if(Boolean(l)&&l.length&&(c=f(e,l,r)))return c;break;case"NthChild":if(u)return u}}return"*"}e.unique=function(e,t={}){const{selectorTypes:n=["ID","Class","Tag","NthChild"],attributesToIgnore:r=["id","class","length"],excludeRegex:l=null}=t,u=[],i=function(e){const t=[];let n=e;for(;o(n);)t.push(n),n=n.parentNode;return t}(e);for(let e of i){const t=a(e,n,r,l);t&&u.push(t)}const c=[];for(let t of u){c.unshift(t);const n=c.join(" > ");if(s(e,n))return n}return null},Object.defineProperty(e,"__esModule",{value:!0})});
