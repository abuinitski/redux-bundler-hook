import r,{useContext as e,useEffect as t,useState as n,useMemo as o,useRef as u}from"react";var c=r.createContext({store:null});function i(e){return r.createElement(c.Provider,{value:{store:e.store}},e.children)}function a(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function l(r){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},n=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),n.forEach(function(e){a(r,e,t[e])})}return r}function f(r,e){return function(r){if(Array.isArray(r))return r}(r)||function(r,e){var t=[],n=!0,o=!1,u=void 0;try{for(var c,i=r[Symbol.iterator]();!(n=(c=i.next()).done)&&(t.push(c.value),!e||t.length!==e);n=!0);}catch(r){o=!0,u=r}finally{try{n||null==i.return||i.return()}finally{if(o)throw u}}return t}(r,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(){for(var r=arguments,i=arguments.length,a=new Array(i),s=0;s<i;s++)a[s]=r[s];var y=e(c).store,b=f(o(function(){return function(r,e){var t=[],n={};return e.forEach(function(e){if("select"!==e.slice(0,6)){if("do"!==e.slice(0,2))throw Error("Can Not Connect: ".concat(e));n[e]=function(){for(var t=arguments,n=arguments.length,o=new Array(n),u=0;u<n;u++)o[u]=t[u];return r.action?r.action(e,o):r[e].apply(r,o)}}else t.push(e)}),[t,n]}(y,a)},a),2),v=b[0],p=b[1],h=f(n(function(){return y.select(v)}),2),d=h[0],w=h[1],m=u(v);return t(function(){return m.current!==v&&(m.current=v,w(y.select(v))),y.subscribeToSelectors(v,function(r){w(function(e){return l({},e,r)})})},[v]),l({},p,m.current!==v?y.select(v):d)}function y(){return e(c).store}export{c as ReduxBundlerContext,i as ReduxBundlerProvider,s as useConnect,y as useReduxBundlerStore};
//# sourceMappingURL=index.mjs.map
