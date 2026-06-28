var hh=Object.defineProperty;var mh=(e,t,n)=>t in e?hh(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Qe=(e,t,n)=>mh(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();var Mg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Vr(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function _g(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function a(){return this instanceof a?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(a){var r=Object.getOwnPropertyDescriptor(e,a);Object.defineProperty(n,a,r.get?r:{enumerable:!0,get:function(){return e[a]}})}),n}var Au={exports:{}},Yr={},Ru={exports:{}},D={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ca=Symbol.for("react.element"),fh=Symbol.for("react.portal"),ph=Symbol.for("react.fragment"),yh=Symbol.for("react.strict_mode"),gh=Symbol.for("react.profiler"),xh=Symbol.for("react.provider"),vh=Symbol.for("react.context"),Th=Symbol.for("react.forward_ref"),wh=Symbol.for("react.suspense"),bh=Symbol.for("react.memo"),Sh=Symbol.for("react.lazy"),Zs=Symbol.iterator;function Nh(e){return e===null||typeof e!="object"?null:(e=Zs&&e[Zs]||e["@@iterator"],typeof e=="function"?e:null)}var Eu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ju=Object.assign,Iu={};function An(e,t,n){this.props=e,this.context=t,this.refs=Iu,this.updater=n||Eu}An.prototype.isReactComponent={};An.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};An.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Pu(){}Pu.prototype=An.prototype;function Qo(e,t,n){this.props=e,this.context=t,this.refs=Iu,this.updater=n||Eu}var Xo=Qo.prototype=new Pu;Xo.constructor=Qo;ju(Xo,An.prototype);Xo.isPureReactComponent=!0;var el=Array.isArray,Lu=Object.prototype.hasOwnProperty,Jo={current:null},Du={key:!0,ref:!0,__self:!0,__source:!0};function Fu(e,t,n){var a,r={},i=null,s=null;if(t!=null)for(a in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(i=""+t.key),t)Lu.call(t,a)&&!Du.hasOwnProperty(a)&&(r[a]=t[a]);var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];r.children=u}if(e&&e.defaultProps)for(a in l=e.defaultProps,l)r[a]===void 0&&(r[a]=l[a]);return{$$typeof:Ca,type:e,key:i,ref:s,props:r,_owner:Jo.current}}function kh(e,t){return{$$typeof:Ca,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Zo(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ca}function Ch(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var tl=/\/+/g;function fi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Ch(""+e.key):t.toString(36)}function nr(e,t,n,a,r){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(i){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Ca:case fh:s=!0}}if(s)return s=e,r=r(s),e=a===""?"."+fi(s,0):a,el(r)?(n="",e!=null&&(n=e.replace(tl,"$&/")+"/"),nr(r,t,n,"",function(c){return c})):r!=null&&(Zo(r)&&(r=kh(r,n+(!r.key||s&&s.key===r.key?"":(""+r.key).replace(tl,"$&/")+"/")+e)),t.push(r)),1;if(s=0,a=a===""?".":a+":",el(e))for(var l=0;l<e.length;l++){i=e[l];var u=a+fi(i,l);s+=nr(i,t,n,u,r)}else if(u=Nh(e),typeof u=="function")for(e=u.call(e),l=0;!(i=e.next()).done;)i=i.value,u=a+fi(i,l++),s+=nr(i,t,n,u,r);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function Fa(e,t,n){if(e==null)return e;var a=[],r=0;return nr(e,a,"","",function(i){return t.call(n,i,r++)}),a}function Ah(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var he={current:null},ar={transition:null},Rh={ReactCurrentDispatcher:he,ReactCurrentBatchConfig:ar,ReactCurrentOwner:Jo};function Ou(){throw Error("act(...) is not supported in production builds of React.")}D.Children={map:Fa,forEach:function(e,t,n){Fa(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Fa(e,function(){t++}),t},toArray:function(e){return Fa(e,function(t){return t})||[]},only:function(e){if(!Zo(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};D.Component=An;D.Fragment=ph;D.Profiler=gh;D.PureComponent=Qo;D.StrictMode=yh;D.Suspense=wh;D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rh;D.act=Ou;D.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=ju({},e.props),r=e.key,i=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,s=Jo.current),t.key!==void 0&&(r=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(u in t)Lu.call(t,u)&&!Du.hasOwnProperty(u)&&(a[u]=t[u]===void 0&&l!==void 0?l[u]:t[u])}var u=arguments.length-2;if(u===1)a.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];a.children=l}return{$$typeof:Ca,type:e.type,key:r,ref:i,props:a,_owner:s}};D.createContext=function(e){return e={$$typeof:vh,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:xh,_context:e},e.Consumer=e};D.createElement=Fu;D.createFactory=function(e){var t=Fu.bind(null,e);return t.type=e,t};D.createRef=function(){return{current:null}};D.forwardRef=function(e){return{$$typeof:Th,render:e}};D.isValidElement=Zo;D.lazy=function(e){return{$$typeof:Sh,_payload:{_status:-1,_result:e},_init:Ah}};D.memo=function(e,t){return{$$typeof:bh,type:e,compare:t===void 0?null:t}};D.startTransition=function(e){var t=ar.transition;ar.transition={};try{e()}finally{ar.transition=t}};D.unstable_act=Ou;D.useCallback=function(e,t){return he.current.useCallback(e,t)};D.useContext=function(e){return he.current.useContext(e)};D.useDebugValue=function(){};D.useDeferredValue=function(e){return he.current.useDeferredValue(e)};D.useEffect=function(e,t){return he.current.useEffect(e,t)};D.useId=function(){return he.current.useId()};D.useImperativeHandle=function(e,t,n){return he.current.useImperativeHandle(e,t,n)};D.useInsertionEffect=function(e,t){return he.current.useInsertionEffect(e,t)};D.useLayoutEffect=function(e,t){return he.current.useLayoutEffect(e,t)};D.useMemo=function(e,t){return he.current.useMemo(e,t)};D.useReducer=function(e,t,n){return he.current.useReducer(e,t,n)};D.useRef=function(e){return he.current.useRef(e)};D.useState=function(e){return he.current.useState(e)};D.useSyncExternalStore=function(e,t,n){return he.current.useSyncExternalStore(e,t,n)};D.useTransition=function(){return he.current.useTransition()};D.version="18.3.1";Ru.exports=D;var x=Ru.exports;const Ke=Vr(x);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Eh=x,jh=Symbol.for("react.element"),Ih=Symbol.for("react.fragment"),Ph=Object.prototype.hasOwnProperty,Lh=Eh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Dh={key:!0,ref:!0,__self:!0,__source:!0};function Mu(e,t,n){var a,r={},i=null,s=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(s=t.ref);for(a in t)Ph.call(t,a)&&!Dh.hasOwnProperty(a)&&(r[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)r[a]===void 0&&(r[a]=t[a]);return{$$typeof:jh,type:e,key:i,ref:s,props:r,_owner:Lh.current}}Yr.Fragment=Ih;Yr.jsx=Mu;Yr.jsxs=Mu;Au.exports=Yr;var o=Au.exports,xr={},_u={exports:{}},Se={},Uu={exports:{}},Hu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(R,P){var L=R.length;R.push(P);e:for(;0<L;){var q=L-1>>>1,Z=R[q];if(0<r(Z,P))R[q]=P,R[L]=Z,L=q;else break e}}function n(R){return R.length===0?null:R[0]}function a(R){if(R.length===0)return null;var P=R[0],L=R.pop();if(L!==P){R[0]=L;e:for(var q=0,Z=R.length,La=Z>>>1;q<La;){var It=2*(q+1)-1,mi=R[It],Pt=It+1,Da=R[Pt];if(0>r(mi,L))Pt<Z&&0>r(Da,mi)?(R[q]=Da,R[Pt]=L,q=Pt):(R[q]=mi,R[It]=L,q=It);else if(Pt<Z&&0>r(Da,L))R[q]=Da,R[Pt]=L,q=Pt;else break e}}return P}function r(R,P){var L=R.sortIndex-P.sortIndex;return L!==0?L:R.id-P.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var s=Date,l=s.now();e.unstable_now=function(){return s.now()-l}}var u=[],c=[],f=1,d=null,y=3,g=!1,v=!1,T=!1,b=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function p(R){for(var P=n(c);P!==null;){if(P.callback===null)a(c);else if(P.startTime<=R)a(c),P.sortIndex=P.expirationTime,t(u,P);else break;P=n(c)}}function w(R){if(T=!1,p(R),!v)if(n(u)!==null)v=!0,di(N);else{var P=n(c);P!==null&&hi(w,P.startTime-R)}}function N(R,P){v=!1,T&&(T=!1,m(E),E=-1),g=!0;var L=y;try{for(p(P),d=n(u);d!==null&&(!(d.expirationTime>P)||R&&!ie());){var q=d.callback;if(typeof q=="function"){d.callback=null,y=d.priorityLevel;var Z=q(d.expirationTime<=P);P=e.unstable_now(),typeof Z=="function"?d.callback=Z:d===n(u)&&a(u),p(P)}else a(u);d=n(u)}if(d!==null)var La=!0;else{var It=n(c);It!==null&&hi(w,It.startTime-P),La=!1}return La}finally{d=null,y=L,g=!1}}var k=!1,C=null,E=-1,O=5,I=-1;function ie(){return!(e.unstable_now()-I<O)}function Ln(){if(C!==null){var R=e.unstable_now();I=R;var P=!0;try{P=C(!0,R)}finally{P?Dn():(k=!1,C=null)}}else k=!1}var Dn;if(typeof h=="function")Dn=function(){h(Ln)};else if(typeof MessageChannel<"u"){var Js=new MessageChannel,dh=Js.port2;Js.port1.onmessage=Ln,Dn=function(){dh.postMessage(null)}}else Dn=function(){b(Ln,0)};function di(R){C=R,k||(k=!0,Dn())}function hi(R,P){E=b(function(){R(e.unstable_now())},P)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(R){R.callback=null},e.unstable_continueExecution=function(){v||g||(v=!0,di(N))},e.unstable_forceFrameRate=function(R){0>R||125<R?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):O=0<R?Math.floor(1e3/R):5},e.unstable_getCurrentPriorityLevel=function(){return y},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(R){switch(y){case 1:case 2:case 3:var P=3;break;default:P=y}var L=y;y=P;try{return R()}finally{y=L}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(R,P){switch(R){case 1:case 2:case 3:case 4:case 5:break;default:R=3}var L=y;y=R;try{return P()}finally{y=L}},e.unstable_scheduleCallback=function(R,P,L){var q=e.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?q+L:q):L=q,R){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=L+Z,R={id:f++,callback:P,priorityLevel:R,startTime:L,expirationTime:Z,sortIndex:-1},L>q?(R.sortIndex=L,t(c,R),n(u)===null&&R===n(c)&&(T?(m(E),E=-1):T=!0,hi(w,L-q))):(R.sortIndex=Z,t(u,R),v||g||(v=!0,di(N))),R},e.unstable_shouldYield=ie,e.unstable_wrapCallback=function(R){var P=y;return function(){var L=y;y=P;try{return R.apply(this,arguments)}finally{y=L}}}})(Hu);Uu.exports=Hu;var Fh=Uu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Oh=x,be=Fh;function S(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Bu=new Set,sa={};function Yt(e,t){xn(e,t),xn(e+"Capture",t)}function xn(e,t){for(sa[e]=t,e=0;e<t.length;e++)Bu.add(t[e])}var rt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Gi=Object.prototype.hasOwnProperty,Mh=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,nl={},al={};function _h(e){return Gi.call(al,e)?!0:Gi.call(nl,e)?!1:Mh.test(e)?al[e]=!0:(nl[e]=!0,!1)}function Uh(e,t,n,a){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return a?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Hh(e,t,n,a){if(t===null||typeof t>"u"||Uh(e,t,n,a))return!0;if(a)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function me(e,t,n,a,r,i,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=a,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=s}var re={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){re[e]=new me(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];re[t]=new me(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){re[e]=new me(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){re[e]=new me(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){re[e]=new me(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){re[e]=new me(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){re[e]=new me(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){re[e]=new me(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){re[e]=new me(e,5,!1,e.toLowerCase(),null,!1,!1)});var es=/[\-:]([a-z])/g;function ts(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(es,ts);re[t]=new me(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(es,ts);re[t]=new me(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(es,ts);re[t]=new me(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){re[e]=new me(e,1,!1,e.toLowerCase(),null,!1,!1)});re.xlinkHref=new me("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){re[e]=new me(e,1,!1,e.toLowerCase(),null,!0,!0)});function ns(e,t,n,a){var r=re.hasOwnProperty(t)?re[t]:null;(r!==null?r.type!==0:a||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Hh(t,n,r,a)&&(n=null),a||r===null?_h(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):r.mustUseProperty?e[r.propertyName]=n===null?r.type===3?!1:"":n:(t=r.attributeName,a=r.attributeNamespace,n===null?e.removeAttribute(t):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,a?e.setAttributeNS(a,t,n):e.setAttribute(t,n))))}var ut=Oh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Oa=Symbol.for("react.element"),Xt=Symbol.for("react.portal"),Jt=Symbol.for("react.fragment"),as=Symbol.for("react.strict_mode"),Qi=Symbol.for("react.profiler"),Wu=Symbol.for("react.provider"),zu=Symbol.for("react.context"),rs=Symbol.for("react.forward_ref"),Xi=Symbol.for("react.suspense"),Ji=Symbol.for("react.suspense_list"),is=Symbol.for("react.memo"),dt=Symbol.for("react.lazy"),$u=Symbol.for("react.offscreen"),rl=Symbol.iterator;function Fn(e){return e===null||typeof e!="object"?null:(e=rl&&e[rl]||e["@@iterator"],typeof e=="function"?e:null)}var Y=Object.assign,pi;function Kn(e){if(pi===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);pi=t&&t[1]||""}return`
`+pi+e}var yi=!1;function gi(e,t){if(!e||yi)return"";yi=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var a=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){a=c}e.call(t.prototype)}else{try{throw Error()}catch(c){a=c}e()}}catch(c){if(c&&a&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),i=a.stack.split(`
`),s=r.length-1,l=i.length-1;1<=s&&0<=l&&r[s]!==i[l];)l--;for(;1<=s&&0<=l;s--,l--)if(r[s]!==i[l]){if(s!==1||l!==1)do if(s--,l--,0>l||r[s]!==i[l]){var u=`
`+r[s].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=s&&0<=l);break}}}finally{yi=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Kn(e):""}function Bh(e){switch(e.tag){case 5:return Kn(e.type);case 16:return Kn("Lazy");case 13:return Kn("Suspense");case 19:return Kn("SuspenseList");case 0:case 2:case 15:return e=gi(e.type,!1),e;case 11:return e=gi(e.type.render,!1),e;case 1:return e=gi(e.type,!0),e;default:return""}}function Zi(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Jt:return"Fragment";case Xt:return"Portal";case Qi:return"Profiler";case as:return"StrictMode";case Xi:return"Suspense";case Ji:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case zu:return(e.displayName||"Context")+".Consumer";case Wu:return(e._context.displayName||"Context")+".Provider";case rs:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case is:return t=e.displayName||null,t!==null?t:Zi(e.type)||"Memo";case dt:t=e._payload,e=e._init;try{return Zi(e(t))}catch{}}return null}function Wh(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Zi(t);case 8:return t===as?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function kt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Vu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function zh(e){var t=Vu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),a=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(s){a=""+s,i.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return a},setValue:function(s){a=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ma(e){e._valueTracker||(e._valueTracker=zh(e))}function Yu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=Vu(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function vr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function eo(e,t){var n=t.checked;return Y({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function il(e,t){var n=t.defaultValue==null?"":t.defaultValue,a=t.checked!=null?t.checked:t.defaultChecked;n=kt(t.value!=null?t.value:n),e._wrapperState={initialChecked:a,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ku(e,t){t=t.checked,t!=null&&ns(e,"checked",t,!1)}function to(e,t){Ku(e,t);var n=kt(t.value),a=t.type;if(n!=null)a==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?no(e,t.type,n):t.hasOwnProperty("defaultValue")&&no(e,t.type,kt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ol(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var a=t.type;if(!(a!=="submit"&&a!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function no(e,t,n){(t!=="number"||vr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var qn=Array.isArray;function cn(e,t,n,a){if(e=e.options,t){t={};for(var r=0;r<n.length;r++)t["$"+n[r]]=!0;for(n=0;n<e.length;n++)r=t.hasOwnProperty("$"+e[n].value),e[n].selected!==r&&(e[n].selected=r),r&&a&&(e[n].defaultSelected=!0)}else{for(n=""+kt(n),t=null,r=0;r<e.length;r++){if(e[r].value===n){e[r].selected=!0,a&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function ao(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(S(91));return Y({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function sl(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(S(92));if(qn(n)){if(1<n.length)throw Error(S(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:kt(n)}}function qu(e,t){var n=kt(t.value),a=kt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),a!=null&&(e.defaultValue=""+a)}function ll(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Gu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ro(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Gu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var _a,Qu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,a,r){MSApp.execUnsafeLocalFunction(function(){return e(t,n,a,r)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(_a=_a||document.createElement("div"),_a.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=_a.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function la(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Jn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},$h=["Webkit","ms","Moz","O"];Object.keys(Jn).forEach(function(e){$h.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Jn[t]=Jn[e]})});function Xu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Jn.hasOwnProperty(e)&&Jn[e]?(""+t).trim():t+"px"}function Ju(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var a=n.indexOf("--")===0,r=Xu(n,t[n],a);n==="float"&&(n="cssFloat"),a?e.setProperty(n,r):e[n]=r}}var Vh=Y({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function io(e,t){if(t){if(Vh[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(S(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(S(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(S(61))}if(t.style!=null&&typeof t.style!="object")throw Error(S(62))}}function oo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var so=null;function os(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var lo=null,dn=null,hn=null;function ul(e){if(e=Ea(e)){if(typeof lo!="function")throw Error(S(280));var t=e.stateNode;t&&(t=Xr(t),lo(e.stateNode,e.type,t))}}function Zu(e){dn?hn?hn.push(e):hn=[e]:dn=e}function ec(){if(dn){var e=dn,t=hn;if(hn=dn=null,ul(e),t)for(e=0;e<t.length;e++)ul(t[e])}}function tc(e,t){return e(t)}function nc(){}var xi=!1;function ac(e,t,n){if(xi)return e(t,n);xi=!0;try{return tc(e,t,n)}finally{xi=!1,(dn!==null||hn!==null)&&(nc(),ec())}}function ua(e,t){var n=e.stateNode;if(n===null)return null;var a=Xr(n);if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(S(231,t,typeof n));return n}var uo=!1;if(rt)try{var On={};Object.defineProperty(On,"passive",{get:function(){uo=!0}}),window.addEventListener("test",On,On),window.removeEventListener("test",On,On)}catch{uo=!1}function Yh(e,t,n,a,r,i,s,l,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(f){this.onError(f)}}var Zn=!1,Tr=null,wr=!1,co=null,Kh={onError:function(e){Zn=!0,Tr=e}};function qh(e,t,n,a,r,i,s,l,u){Zn=!1,Tr=null,Yh.apply(Kh,arguments)}function Gh(e,t,n,a,r,i,s,l,u){if(qh.apply(this,arguments),Zn){if(Zn){var c=Tr;Zn=!1,Tr=null}else throw Error(S(198));wr||(wr=!0,co=c)}}function Kt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function rc(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function cl(e){if(Kt(e)!==e)throw Error(S(188))}function Qh(e){var t=e.alternate;if(!t){if(t=Kt(e),t===null)throw Error(S(188));return t!==e?null:e}for(var n=e,a=t;;){var r=n.return;if(r===null)break;var i=r.alternate;if(i===null){if(a=r.return,a!==null){n=a;continue}break}if(r.child===i.child){for(i=r.child;i;){if(i===n)return cl(r),e;if(i===a)return cl(r),t;i=i.sibling}throw Error(S(188))}if(n.return!==a.return)n=r,a=i;else{for(var s=!1,l=r.child;l;){if(l===n){s=!0,n=r,a=i;break}if(l===a){s=!0,a=r,n=i;break}l=l.sibling}if(!s){for(l=i.child;l;){if(l===n){s=!0,n=i,a=r;break}if(l===a){s=!0,a=i,n=r;break}l=l.sibling}if(!s)throw Error(S(189))}}if(n.alternate!==a)throw Error(S(190))}if(n.tag!==3)throw Error(S(188));return n.stateNode.current===n?e:t}function ic(e){return e=Qh(e),e!==null?oc(e):null}function oc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=oc(e);if(t!==null)return t;e=e.sibling}return null}var sc=be.unstable_scheduleCallback,dl=be.unstable_cancelCallback,Xh=be.unstable_shouldYield,Jh=be.unstable_requestPaint,G=be.unstable_now,Zh=be.unstable_getCurrentPriorityLevel,ss=be.unstable_ImmediatePriority,lc=be.unstable_UserBlockingPriority,br=be.unstable_NormalPriority,em=be.unstable_LowPriority,uc=be.unstable_IdlePriority,Kr=null,qe=null;function tm(e){if(qe&&typeof qe.onCommitFiberRoot=="function")try{qe.onCommitFiberRoot(Kr,e,void 0,(e.current.flags&128)===128)}catch{}}var Ue=Math.clz32?Math.clz32:rm,nm=Math.log,am=Math.LN2;function rm(e){return e>>>=0,e===0?32:31-(nm(e)/am|0)|0}var Ua=64,Ha=4194304;function Gn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Sr(e,t){var n=e.pendingLanes;if(n===0)return 0;var a=0,r=e.suspendedLanes,i=e.pingedLanes,s=n&268435455;if(s!==0){var l=s&~r;l!==0?a=Gn(l):(i&=s,i!==0&&(a=Gn(i)))}else s=n&~r,s!==0?a=Gn(s):i!==0&&(a=Gn(i));if(a===0)return 0;if(t!==0&&t!==a&&!(t&r)&&(r=a&-a,i=t&-t,r>=i||r===16&&(i&4194240)!==0))return t;if(a&4&&(a|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=a;0<t;)n=31-Ue(t),r=1<<n,a|=e[n],t&=~r;return a}function im(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function om(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,r=e.expirationTimes,i=e.pendingLanes;0<i;){var s=31-Ue(i),l=1<<s,u=r[s];u===-1?(!(l&n)||l&a)&&(r[s]=im(l,t)):u<=t&&(e.expiredLanes|=l),i&=~l}}function ho(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function cc(){var e=Ua;return Ua<<=1,!(Ua&4194240)&&(Ua=64),e}function vi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Aa(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ue(t),e[t]=n}function sm(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<n;){var r=31-Ue(n),i=1<<r;t[r]=0,a[r]=-1,e[r]=-1,n&=~i}}function ls(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-Ue(n),r=1<<a;r&t|e[a]&t&&(e[a]|=t),n&=~r}}var M=0;function dc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var hc,us,mc,fc,pc,mo=!1,Ba=[],gt=null,xt=null,vt=null,ca=new Map,da=new Map,mt=[],lm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function hl(e,t){switch(e){case"focusin":case"focusout":gt=null;break;case"dragenter":case"dragleave":xt=null;break;case"mouseover":case"mouseout":vt=null;break;case"pointerover":case"pointerout":ca.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":da.delete(t.pointerId)}}function Mn(e,t,n,a,r,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[r]},t!==null&&(t=Ea(t),t!==null&&us(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function um(e,t,n,a,r){switch(t){case"focusin":return gt=Mn(gt,e,t,n,a,r),!0;case"dragenter":return xt=Mn(xt,e,t,n,a,r),!0;case"mouseover":return vt=Mn(vt,e,t,n,a,r),!0;case"pointerover":var i=r.pointerId;return ca.set(i,Mn(ca.get(i)||null,e,t,n,a,r)),!0;case"gotpointercapture":return i=r.pointerId,da.set(i,Mn(da.get(i)||null,e,t,n,a,r)),!0}return!1}function yc(e){var t=Ft(e.target);if(t!==null){var n=Kt(t);if(n!==null){if(t=n.tag,t===13){if(t=rc(n),t!==null){e.blockedOn=t,pc(e.priority,function(){mc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function rr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=fo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);so=a,n.target.dispatchEvent(a),so=null}else return t=Ea(n),t!==null&&us(t),e.blockedOn=n,!1;t.shift()}return!0}function ml(e,t,n){rr(e)&&n.delete(t)}function cm(){mo=!1,gt!==null&&rr(gt)&&(gt=null),xt!==null&&rr(xt)&&(xt=null),vt!==null&&rr(vt)&&(vt=null),ca.forEach(ml),da.forEach(ml)}function _n(e,t){e.blockedOn===t&&(e.blockedOn=null,mo||(mo=!0,be.unstable_scheduleCallback(be.unstable_NormalPriority,cm)))}function ha(e){function t(r){return _n(r,e)}if(0<Ba.length){_n(Ba[0],e);for(var n=1;n<Ba.length;n++){var a=Ba[n];a.blockedOn===e&&(a.blockedOn=null)}}for(gt!==null&&_n(gt,e),xt!==null&&_n(xt,e),vt!==null&&_n(vt,e),ca.forEach(t),da.forEach(t),n=0;n<mt.length;n++)a=mt[n],a.blockedOn===e&&(a.blockedOn=null);for(;0<mt.length&&(n=mt[0],n.blockedOn===null);)yc(n),n.blockedOn===null&&mt.shift()}var mn=ut.ReactCurrentBatchConfig,Nr=!0;function dm(e,t,n,a){var r=M,i=mn.transition;mn.transition=null;try{M=1,cs(e,t,n,a)}finally{M=r,mn.transition=i}}function hm(e,t,n,a){var r=M,i=mn.transition;mn.transition=null;try{M=4,cs(e,t,n,a)}finally{M=r,mn.transition=i}}function cs(e,t,n,a){if(Nr){var r=fo(e,t,n,a);if(r===null)Ei(e,t,a,kr,n),hl(e,a);else if(um(r,e,t,n,a))a.stopPropagation();else if(hl(e,a),t&4&&-1<lm.indexOf(e)){for(;r!==null;){var i=Ea(r);if(i!==null&&hc(i),i=fo(e,t,n,a),i===null&&Ei(e,t,a,kr,n),i===r)break;r=i}r!==null&&a.stopPropagation()}else Ei(e,t,a,null,n)}}var kr=null;function fo(e,t,n,a){if(kr=null,e=os(a),e=Ft(e),e!==null)if(t=Kt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=rc(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return kr=e,null}function gc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Zh()){case ss:return 1;case lc:return 4;case br:case em:return 16;case uc:return 536870912;default:return 16}default:return 16}}var pt=null,ds=null,ir=null;function xc(){if(ir)return ir;var e,t=ds,n=t.length,a,r="value"in pt?pt.value:pt.textContent,i=r.length;for(e=0;e<n&&t[e]===r[e];e++);var s=n-e;for(a=1;a<=s&&t[n-a]===r[i-a];a++);return ir=r.slice(e,1<a?1-a:void 0)}function or(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Wa(){return!0}function fl(){return!1}function Ne(e){function t(n,a,r,i,s){this._reactName=n,this._targetInst=r,this.type=a,this.nativeEvent=i,this.target=s,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Wa:fl,this.isPropagationStopped=fl,this}return Y(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Wa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Wa)},persist:function(){},isPersistent:Wa}),t}var Rn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},hs=Ne(Rn),Ra=Y({},Rn,{view:0,detail:0}),mm=Ne(Ra),Ti,wi,Un,qr=Y({},Ra,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ms,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Un&&(Un&&e.type==="mousemove"?(Ti=e.screenX-Un.screenX,wi=e.screenY-Un.screenY):wi=Ti=0,Un=e),Ti)},movementY:function(e){return"movementY"in e?e.movementY:wi}}),pl=Ne(qr),fm=Y({},qr,{dataTransfer:0}),pm=Ne(fm),ym=Y({},Ra,{relatedTarget:0}),bi=Ne(ym),gm=Y({},Rn,{animationName:0,elapsedTime:0,pseudoElement:0}),xm=Ne(gm),vm=Y({},Rn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Tm=Ne(vm),wm=Y({},Rn,{data:0}),yl=Ne(wm),bm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Sm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Nm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function km(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Nm[e])?!!t[e]:!1}function ms(){return km}var Cm=Y({},Ra,{key:function(e){if(e.key){var t=bm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=or(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Sm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ms,charCode:function(e){return e.type==="keypress"?or(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?or(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Am=Ne(Cm),Rm=Y({},qr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gl=Ne(Rm),Em=Y({},Ra,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ms}),jm=Ne(Em),Im=Y({},Rn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Pm=Ne(Im),Lm=Y({},qr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Dm=Ne(Lm),Fm=[9,13,27,32],fs=rt&&"CompositionEvent"in window,ea=null;rt&&"documentMode"in document&&(ea=document.documentMode);var Om=rt&&"TextEvent"in window&&!ea,vc=rt&&(!fs||ea&&8<ea&&11>=ea),xl=" ",vl=!1;function Tc(e,t){switch(e){case"keyup":return Fm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function wc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Zt=!1;function Mm(e,t){switch(e){case"compositionend":return wc(t);case"keypress":return t.which!==32?null:(vl=!0,xl);case"textInput":return e=t.data,e===xl&&vl?null:e;default:return null}}function _m(e,t){if(Zt)return e==="compositionend"||!fs&&Tc(e,t)?(e=xc(),ir=ds=pt=null,Zt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return vc&&t.locale!=="ko"?null:t.data;default:return null}}var Um={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Tl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Um[e.type]:t==="textarea"}function bc(e,t,n,a){Zu(a),t=Cr(t,"onChange"),0<t.length&&(n=new hs("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var ta=null,ma=null;function Hm(e){Lc(e,0)}function Gr(e){var t=nn(e);if(Yu(t))return e}function Bm(e,t){if(e==="change")return t}var Sc=!1;if(rt){var Si;if(rt){var Ni="oninput"in document;if(!Ni){var wl=document.createElement("div");wl.setAttribute("oninput","return;"),Ni=typeof wl.oninput=="function"}Si=Ni}else Si=!1;Sc=Si&&(!document.documentMode||9<document.documentMode)}function bl(){ta&&(ta.detachEvent("onpropertychange",Nc),ma=ta=null)}function Nc(e){if(e.propertyName==="value"&&Gr(ma)){var t=[];bc(t,ma,e,os(e)),ac(Hm,t)}}function Wm(e,t,n){e==="focusin"?(bl(),ta=t,ma=n,ta.attachEvent("onpropertychange",Nc)):e==="focusout"&&bl()}function zm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Gr(ma)}function $m(e,t){if(e==="click")return Gr(t)}function Vm(e,t){if(e==="input"||e==="change")return Gr(t)}function Ym(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Be=typeof Object.is=="function"?Object.is:Ym;function fa(e,t){if(Be(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var r=n[a];if(!Gi.call(t,r)||!Be(e[r],t[r]))return!1}return!0}function Sl(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Nl(e,t){var n=Sl(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Sl(n)}}function kc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?kc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Cc(){for(var e=window,t=vr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=vr(e.document)}return t}function ps(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Km(e){var t=Cc(),n=e.focusedElem,a=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&kc(n.ownerDocument.documentElement,n)){if(a!==null&&ps(n)){if(t=a.start,e=a.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var r=n.textContent.length,i=Math.min(a.start,r);a=a.end===void 0?i:Math.min(a.end,r),!e.extend&&i>a&&(r=a,a=i,i=r),r=Nl(n,i);var s=Nl(n,a);r&&s&&(e.rangeCount!==1||e.anchorNode!==r.node||e.anchorOffset!==r.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(r.node,r.offset),e.removeAllRanges(),i>a?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var qm=rt&&"documentMode"in document&&11>=document.documentMode,en=null,po=null,na=null,yo=!1;function kl(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;yo||en==null||en!==vr(a)||(a=en,"selectionStart"in a&&ps(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),na&&fa(na,a)||(na=a,a=Cr(po,"onSelect"),0<a.length&&(t=new hs("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=en)))}function za(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var tn={animationend:za("Animation","AnimationEnd"),animationiteration:za("Animation","AnimationIteration"),animationstart:za("Animation","AnimationStart"),transitionend:za("Transition","TransitionEnd")},ki={},Ac={};rt&&(Ac=document.createElement("div").style,"AnimationEvent"in window||(delete tn.animationend.animation,delete tn.animationiteration.animation,delete tn.animationstart.animation),"TransitionEvent"in window||delete tn.transitionend.transition);function Qr(e){if(ki[e])return ki[e];if(!tn[e])return e;var t=tn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ac)return ki[e]=t[n];return e}var Rc=Qr("animationend"),Ec=Qr("animationiteration"),jc=Qr("animationstart"),Ic=Qr("transitionend"),Pc=new Map,Cl="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function At(e,t){Pc.set(e,t),Yt(t,[e])}for(var Ci=0;Ci<Cl.length;Ci++){var Ai=Cl[Ci],Gm=Ai.toLowerCase(),Qm=Ai[0].toUpperCase()+Ai.slice(1);At(Gm,"on"+Qm)}At(Rc,"onAnimationEnd");At(Ec,"onAnimationIteration");At(jc,"onAnimationStart");At("dblclick","onDoubleClick");At("focusin","onFocus");At("focusout","onBlur");At(Ic,"onTransitionEnd");xn("onMouseEnter",["mouseout","mouseover"]);xn("onMouseLeave",["mouseout","mouseover"]);xn("onPointerEnter",["pointerout","pointerover"]);xn("onPointerLeave",["pointerout","pointerover"]);Yt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Yt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Yt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Yt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Yt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Yt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Qn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Xm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Qn));function Al(e,t,n){var a=e.type||"unknown-event";e.currentTarget=n,Gh(a,t,void 0,e),e.currentTarget=null}function Lc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],r=a.event;a=a.listeners;e:{var i=void 0;if(t)for(var s=a.length-1;0<=s;s--){var l=a[s],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==i&&r.isPropagationStopped())break e;Al(r,l,c),i=u}else for(s=0;s<a.length;s++){if(l=a[s],u=l.instance,c=l.currentTarget,l=l.listener,u!==i&&r.isPropagationStopped())break e;Al(r,l,c),i=u}}}if(wr)throw e=co,wr=!1,co=null,e}function U(e,t){var n=t[wo];n===void 0&&(n=t[wo]=new Set);var a=e+"__bubble";n.has(a)||(Dc(t,e,2,!1),n.add(a))}function Ri(e,t,n){var a=0;t&&(a|=4),Dc(n,e,a,t)}var $a="_reactListening"+Math.random().toString(36).slice(2);function pa(e){if(!e[$a]){e[$a]=!0,Bu.forEach(function(n){n!=="selectionchange"&&(Xm.has(n)||Ri(n,!1,e),Ri(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[$a]||(t[$a]=!0,Ri("selectionchange",!1,t))}}function Dc(e,t,n,a){switch(gc(t)){case 1:var r=dm;break;case 4:r=hm;break;default:r=cs}n=r.bind(null,t,n,e),r=void 0,!uo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),a?r!==void 0?e.addEventListener(t,n,{capture:!0,passive:r}):e.addEventListener(t,n,!0):r!==void 0?e.addEventListener(t,n,{passive:r}):e.addEventListener(t,n,!1)}function Ei(e,t,n,a,r){var i=a;if(!(t&1)&&!(t&2)&&a!==null)e:for(;;){if(a===null)return;var s=a.tag;if(s===3||s===4){var l=a.stateNode.containerInfo;if(l===r||l.nodeType===8&&l.parentNode===r)break;if(s===4)for(s=a.return;s!==null;){var u=s.tag;if((u===3||u===4)&&(u=s.stateNode.containerInfo,u===r||u.nodeType===8&&u.parentNode===r))return;s=s.return}for(;l!==null;){if(s=Ft(l),s===null)return;if(u=s.tag,u===5||u===6){a=i=s;continue e}l=l.parentNode}}a=a.return}ac(function(){var c=i,f=os(n),d=[];e:{var y=Pc.get(e);if(y!==void 0){var g=hs,v=e;switch(e){case"keypress":if(or(n)===0)break e;case"keydown":case"keyup":g=Am;break;case"focusin":v="focus",g=bi;break;case"focusout":v="blur",g=bi;break;case"beforeblur":case"afterblur":g=bi;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=pl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=pm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=jm;break;case Rc:case Ec:case jc:g=xm;break;case Ic:g=Pm;break;case"scroll":g=mm;break;case"wheel":g=Dm;break;case"copy":case"cut":case"paste":g=Tm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=gl}var T=(t&4)!==0,b=!T&&e==="scroll",m=T?y!==null?y+"Capture":null:y;T=[];for(var h=c,p;h!==null;){p=h;var w=p.stateNode;if(p.tag===5&&w!==null&&(p=w,m!==null&&(w=ua(h,m),w!=null&&T.push(ya(h,w,p)))),b)break;h=h.return}0<T.length&&(y=new g(y,v,null,n,f),d.push({event:y,listeners:T}))}}if(!(t&7)){e:{if(y=e==="mouseover"||e==="pointerover",g=e==="mouseout"||e==="pointerout",y&&n!==so&&(v=n.relatedTarget||n.fromElement)&&(Ft(v)||v[it]))break e;if((g||y)&&(y=f.window===f?f:(y=f.ownerDocument)?y.defaultView||y.parentWindow:window,g?(v=n.relatedTarget||n.toElement,g=c,v=v?Ft(v):null,v!==null&&(b=Kt(v),v!==b||v.tag!==5&&v.tag!==6)&&(v=null)):(g=null,v=c),g!==v)){if(T=pl,w="onMouseLeave",m="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(T=gl,w="onPointerLeave",m="onPointerEnter",h="pointer"),b=g==null?y:nn(g),p=v==null?y:nn(v),y=new T(w,h+"leave",g,n,f),y.target=b,y.relatedTarget=p,w=null,Ft(f)===c&&(T=new T(m,h+"enter",v,n,f),T.target=p,T.relatedTarget=b,w=T),b=w,g&&v)t:{for(T=g,m=v,h=0,p=T;p;p=qt(p))h++;for(p=0,w=m;w;w=qt(w))p++;for(;0<h-p;)T=qt(T),h--;for(;0<p-h;)m=qt(m),p--;for(;h--;){if(T===m||m!==null&&T===m.alternate)break t;T=qt(T),m=qt(m)}T=null}else T=null;g!==null&&Rl(d,y,g,T,!1),v!==null&&b!==null&&Rl(d,b,v,T,!0)}}e:{if(y=c?nn(c):window,g=y.nodeName&&y.nodeName.toLowerCase(),g==="select"||g==="input"&&y.type==="file")var N=Bm;else if(Tl(y))if(Sc)N=Vm;else{N=zm;var k=Wm}else(g=y.nodeName)&&g.toLowerCase()==="input"&&(y.type==="checkbox"||y.type==="radio")&&(N=$m);if(N&&(N=N(e,c))){bc(d,N,n,f);break e}k&&k(e,y,c),e==="focusout"&&(k=y._wrapperState)&&k.controlled&&y.type==="number"&&no(y,"number",y.value)}switch(k=c?nn(c):window,e){case"focusin":(Tl(k)||k.contentEditable==="true")&&(en=k,po=c,na=null);break;case"focusout":na=po=en=null;break;case"mousedown":yo=!0;break;case"contextmenu":case"mouseup":case"dragend":yo=!1,kl(d,n,f);break;case"selectionchange":if(qm)break;case"keydown":case"keyup":kl(d,n,f)}var C;if(fs)e:{switch(e){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else Zt?Tc(e,n)&&(E="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&(vc&&n.locale!=="ko"&&(Zt||E!=="onCompositionStart"?E==="onCompositionEnd"&&Zt&&(C=xc()):(pt=f,ds="value"in pt?pt.value:pt.textContent,Zt=!0)),k=Cr(c,E),0<k.length&&(E=new yl(E,e,null,n,f),d.push({event:E,listeners:k}),C?E.data=C:(C=wc(n),C!==null&&(E.data=C)))),(C=Om?Mm(e,n):_m(e,n))&&(c=Cr(c,"onBeforeInput"),0<c.length&&(f=new yl("onBeforeInput","beforeinput",null,n,f),d.push({event:f,listeners:c}),f.data=C))}Lc(d,t)})}function ya(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Cr(e,t){for(var n=t+"Capture",a=[];e!==null;){var r=e,i=r.stateNode;r.tag===5&&i!==null&&(r=i,i=ua(e,n),i!=null&&a.unshift(ya(e,i,r)),i=ua(e,t),i!=null&&a.push(ya(e,i,r))),e=e.return}return a}function qt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Rl(e,t,n,a,r){for(var i=t._reactName,s=[];n!==null&&n!==a;){var l=n,u=l.alternate,c=l.stateNode;if(u!==null&&u===a)break;l.tag===5&&c!==null&&(l=c,r?(u=ua(n,i),u!=null&&s.unshift(ya(n,u,l))):r||(u=ua(n,i),u!=null&&s.push(ya(n,u,l)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var Jm=/\r\n?/g,Zm=/\u0000|\uFFFD/g;function El(e){return(typeof e=="string"?e:""+e).replace(Jm,`
`).replace(Zm,"")}function Va(e,t,n){if(t=El(t),El(e)!==t&&n)throw Error(S(425))}function Ar(){}var go=null,xo=null;function vo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var To=typeof setTimeout=="function"?setTimeout:void 0,ef=typeof clearTimeout=="function"?clearTimeout:void 0,jl=typeof Promise=="function"?Promise:void 0,tf=typeof queueMicrotask=="function"?queueMicrotask:typeof jl<"u"?function(e){return jl.resolve(null).then(e).catch(nf)}:To;function nf(e){setTimeout(function(){throw e})}function ji(e,t){var n=t,a=0;do{var r=n.nextSibling;if(e.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(a===0){e.removeChild(r),ha(t);return}a--}else n!=="$"&&n!=="$?"&&n!=="$!"||a++;n=r}while(n);ha(t)}function Tt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Il(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var En=Math.random().toString(36).slice(2),Ye="__reactFiber$"+En,ga="__reactProps$"+En,it="__reactContainer$"+En,wo="__reactEvents$"+En,af="__reactListeners$"+En,rf="__reactHandles$"+En;function Ft(e){var t=e[Ye];if(t)return t;for(var n=e.parentNode;n;){if(t=n[it]||n[Ye]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Il(e);e!==null;){if(n=e[Ye])return n;e=Il(e)}return t}e=n,n=e.parentNode}return null}function Ea(e){return e=e[Ye]||e[it],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function nn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(S(33))}function Xr(e){return e[ga]||null}var bo=[],an=-1;function Rt(e){return{current:e}}function H(e){0>an||(e.current=bo[an],bo[an]=null,an--)}function _(e,t){an++,bo[an]=e.current,e.current=t}var Ct={},ue=Rt(Ct),ye=Rt(!1),Bt=Ct;function vn(e,t){var n=e.type.contextTypes;if(!n)return Ct;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===t)return a.__reactInternalMemoizedMaskedChildContext;var r={},i;for(i in n)r[i]=t[i];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=r),r}function ge(e){return e=e.childContextTypes,e!=null}function Rr(){H(ye),H(ue)}function Pl(e,t,n){if(ue.current!==Ct)throw Error(S(168));_(ue,t),_(ye,n)}function Fc(e,t,n){var a=e.stateNode;if(t=t.childContextTypes,typeof a.getChildContext!="function")return n;a=a.getChildContext();for(var r in a)if(!(r in t))throw Error(S(108,Wh(e)||"Unknown",r));return Y({},n,a)}function Er(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ct,Bt=ue.current,_(ue,e),_(ye,ye.current),!0}function Ll(e,t,n){var a=e.stateNode;if(!a)throw Error(S(169));n?(e=Fc(e,t,Bt),a.__reactInternalMemoizedMergedChildContext=e,H(ye),H(ue),_(ue,e)):H(ye),_(ye,n)}var Ze=null,Jr=!1,Ii=!1;function Oc(e){Ze===null?Ze=[e]:Ze.push(e)}function of(e){Jr=!0,Oc(e)}function Et(){if(!Ii&&Ze!==null){Ii=!0;var e=0,t=M;try{var n=Ze;for(M=1;e<n.length;e++){var a=n[e];do a=a(!0);while(a!==null)}Ze=null,Jr=!1}catch(r){throw Ze!==null&&(Ze=Ze.slice(e+1)),sc(ss,Et),r}finally{M=t,Ii=!1}}return null}var rn=[],on=0,jr=null,Ir=0,Ae=[],Re=0,Wt=null,et=1,tt="";function Lt(e,t){rn[on++]=Ir,rn[on++]=jr,jr=e,Ir=t}function Mc(e,t,n){Ae[Re++]=et,Ae[Re++]=tt,Ae[Re++]=Wt,Wt=e;var a=et;e=tt;var r=32-Ue(a)-1;a&=~(1<<r),n+=1;var i=32-Ue(t)+r;if(30<i){var s=r-r%5;i=(a&(1<<s)-1).toString(32),a>>=s,r-=s,et=1<<32-Ue(t)+r|n<<r|a,tt=i+e}else et=1<<i|n<<r|a,tt=e}function ys(e){e.return!==null&&(Lt(e,1),Mc(e,1,0))}function gs(e){for(;e===jr;)jr=rn[--on],rn[on]=null,Ir=rn[--on],rn[on]=null;for(;e===Wt;)Wt=Ae[--Re],Ae[Re]=null,tt=Ae[--Re],Ae[Re]=null,et=Ae[--Re],Ae[Re]=null}var we=null,Te=null,B=!1,Me=null;function _c(e,t){var n=Ee(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Dl(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,we=e,Te=Tt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,we=e,Te=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Wt!==null?{id:et,overflow:tt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ee(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,we=e,Te=null,!0):!1;default:return!1}}function So(e){return(e.mode&1)!==0&&(e.flags&128)===0}function No(e){if(B){var t=Te;if(t){var n=t;if(!Dl(e,t)){if(So(e))throw Error(S(418));t=Tt(n.nextSibling);var a=we;t&&Dl(e,t)?_c(a,n):(e.flags=e.flags&-4097|2,B=!1,we=e)}}else{if(So(e))throw Error(S(418));e.flags=e.flags&-4097|2,B=!1,we=e}}}function Fl(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;we=e}function Ya(e){if(e!==we)return!1;if(!B)return Fl(e),B=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!vo(e.type,e.memoizedProps)),t&&(t=Te)){if(So(e))throw Uc(),Error(S(418));for(;t;)_c(e,t),t=Tt(t.nextSibling)}if(Fl(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(S(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Te=Tt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Te=null}}else Te=we?Tt(e.stateNode.nextSibling):null;return!0}function Uc(){for(var e=Te;e;)e=Tt(e.nextSibling)}function Tn(){Te=we=null,B=!1}function xs(e){Me===null?Me=[e]:Me.push(e)}var sf=ut.ReactCurrentBatchConfig;function Hn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(S(309));var a=n.stateNode}if(!a)throw Error(S(147,e));var r=a,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(s){var l=r.refs;s===null?delete l[i]:l[i]=s},t._stringRef=i,t)}if(typeof e!="string")throw Error(S(284));if(!n._owner)throw Error(S(290,e))}return e}function Ka(e,t){throw e=Object.prototype.toString.call(t),Error(S(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ol(e){var t=e._init;return t(e._payload)}function Hc(e){function t(m,h){if(e){var p=m.deletions;p===null?(m.deletions=[h],m.flags|=16):p.push(h)}}function n(m,h){if(!e)return null;for(;h!==null;)t(m,h),h=h.sibling;return null}function a(m,h){for(m=new Map;h!==null;)h.key!==null?m.set(h.key,h):m.set(h.index,h),h=h.sibling;return m}function r(m,h){return m=Nt(m,h),m.index=0,m.sibling=null,m}function i(m,h,p){return m.index=p,e?(p=m.alternate,p!==null?(p=p.index,p<h?(m.flags|=2,h):p):(m.flags|=2,h)):(m.flags|=1048576,h)}function s(m){return e&&m.alternate===null&&(m.flags|=2),m}function l(m,h,p,w){return h===null||h.tag!==6?(h=_i(p,m.mode,w),h.return=m,h):(h=r(h,p),h.return=m,h)}function u(m,h,p,w){var N=p.type;return N===Jt?f(m,h,p.props.children,w,p.key):h!==null&&(h.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===dt&&Ol(N)===h.type)?(w=r(h,p.props),w.ref=Hn(m,h,p),w.return=m,w):(w=mr(p.type,p.key,p.props,null,m.mode,w),w.ref=Hn(m,h,p),w.return=m,w)}function c(m,h,p,w){return h===null||h.tag!==4||h.stateNode.containerInfo!==p.containerInfo||h.stateNode.implementation!==p.implementation?(h=Ui(p,m.mode,w),h.return=m,h):(h=r(h,p.children||[]),h.return=m,h)}function f(m,h,p,w,N){return h===null||h.tag!==7?(h=Ht(p,m.mode,w,N),h.return=m,h):(h=r(h,p),h.return=m,h)}function d(m,h,p){if(typeof h=="string"&&h!==""||typeof h=="number")return h=_i(""+h,m.mode,p),h.return=m,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Oa:return p=mr(h.type,h.key,h.props,null,m.mode,p),p.ref=Hn(m,null,h),p.return=m,p;case Xt:return h=Ui(h,m.mode,p),h.return=m,h;case dt:var w=h._init;return d(m,w(h._payload),p)}if(qn(h)||Fn(h))return h=Ht(h,m.mode,p,null),h.return=m,h;Ka(m,h)}return null}function y(m,h,p,w){var N=h!==null?h.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return N!==null?null:l(m,h,""+p,w);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Oa:return p.key===N?u(m,h,p,w):null;case Xt:return p.key===N?c(m,h,p,w):null;case dt:return N=p._init,y(m,h,N(p._payload),w)}if(qn(p)||Fn(p))return N!==null?null:f(m,h,p,w,null);Ka(m,p)}return null}function g(m,h,p,w,N){if(typeof w=="string"&&w!==""||typeof w=="number")return m=m.get(p)||null,l(h,m,""+w,N);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Oa:return m=m.get(w.key===null?p:w.key)||null,u(h,m,w,N);case Xt:return m=m.get(w.key===null?p:w.key)||null,c(h,m,w,N);case dt:var k=w._init;return g(m,h,p,k(w._payload),N)}if(qn(w)||Fn(w))return m=m.get(p)||null,f(h,m,w,N,null);Ka(h,w)}return null}function v(m,h,p,w){for(var N=null,k=null,C=h,E=h=0,O=null;C!==null&&E<p.length;E++){C.index>E?(O=C,C=null):O=C.sibling;var I=y(m,C,p[E],w);if(I===null){C===null&&(C=O);break}e&&C&&I.alternate===null&&t(m,C),h=i(I,h,E),k===null?N=I:k.sibling=I,k=I,C=O}if(E===p.length)return n(m,C),B&&Lt(m,E),N;if(C===null){for(;E<p.length;E++)C=d(m,p[E],w),C!==null&&(h=i(C,h,E),k===null?N=C:k.sibling=C,k=C);return B&&Lt(m,E),N}for(C=a(m,C);E<p.length;E++)O=g(C,m,E,p[E],w),O!==null&&(e&&O.alternate!==null&&C.delete(O.key===null?E:O.key),h=i(O,h,E),k===null?N=O:k.sibling=O,k=O);return e&&C.forEach(function(ie){return t(m,ie)}),B&&Lt(m,E),N}function T(m,h,p,w){var N=Fn(p);if(typeof N!="function")throw Error(S(150));if(p=N.call(p),p==null)throw Error(S(151));for(var k=N=null,C=h,E=h=0,O=null,I=p.next();C!==null&&!I.done;E++,I=p.next()){C.index>E?(O=C,C=null):O=C.sibling;var ie=y(m,C,I.value,w);if(ie===null){C===null&&(C=O);break}e&&C&&ie.alternate===null&&t(m,C),h=i(ie,h,E),k===null?N=ie:k.sibling=ie,k=ie,C=O}if(I.done)return n(m,C),B&&Lt(m,E),N;if(C===null){for(;!I.done;E++,I=p.next())I=d(m,I.value,w),I!==null&&(h=i(I,h,E),k===null?N=I:k.sibling=I,k=I);return B&&Lt(m,E),N}for(C=a(m,C);!I.done;E++,I=p.next())I=g(C,m,E,I.value,w),I!==null&&(e&&I.alternate!==null&&C.delete(I.key===null?E:I.key),h=i(I,h,E),k===null?N=I:k.sibling=I,k=I);return e&&C.forEach(function(Ln){return t(m,Ln)}),B&&Lt(m,E),N}function b(m,h,p,w){if(typeof p=="object"&&p!==null&&p.type===Jt&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case Oa:e:{for(var N=p.key,k=h;k!==null;){if(k.key===N){if(N=p.type,N===Jt){if(k.tag===7){n(m,k.sibling),h=r(k,p.props.children),h.return=m,m=h;break e}}else if(k.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===dt&&Ol(N)===k.type){n(m,k.sibling),h=r(k,p.props),h.ref=Hn(m,k,p),h.return=m,m=h;break e}n(m,k);break}else t(m,k);k=k.sibling}p.type===Jt?(h=Ht(p.props.children,m.mode,w,p.key),h.return=m,m=h):(w=mr(p.type,p.key,p.props,null,m.mode,w),w.ref=Hn(m,h,p),w.return=m,m=w)}return s(m);case Xt:e:{for(k=p.key;h!==null;){if(h.key===k)if(h.tag===4&&h.stateNode.containerInfo===p.containerInfo&&h.stateNode.implementation===p.implementation){n(m,h.sibling),h=r(h,p.children||[]),h.return=m,m=h;break e}else{n(m,h);break}else t(m,h);h=h.sibling}h=Ui(p,m.mode,w),h.return=m,m=h}return s(m);case dt:return k=p._init,b(m,h,k(p._payload),w)}if(qn(p))return v(m,h,p,w);if(Fn(p))return T(m,h,p,w);Ka(m,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,h!==null&&h.tag===6?(n(m,h.sibling),h=r(h,p),h.return=m,m=h):(n(m,h),h=_i(p,m.mode,w),h.return=m,m=h),s(m)):n(m,h)}return b}var wn=Hc(!0),Bc=Hc(!1),Pr=Rt(null),Lr=null,sn=null,vs=null;function Ts(){vs=sn=Lr=null}function ws(e){var t=Pr.current;H(Pr),e._currentValue=t}function ko(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function fn(e,t){Lr=e,vs=sn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(pe=!0),e.firstContext=null)}function Ie(e){var t=e._currentValue;if(vs!==e)if(e={context:e,memoizedValue:t,next:null},sn===null){if(Lr===null)throw Error(S(308));sn=e,Lr.dependencies={lanes:0,firstContext:e}}else sn=sn.next=e;return t}var Ot=null;function bs(e){Ot===null?Ot=[e]:Ot.push(e)}function Wc(e,t,n,a){var r=t.interleaved;return r===null?(n.next=n,bs(t)):(n.next=r.next,r.next=n),t.interleaved=n,ot(e,a)}function ot(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ht=!1;function Ss(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function zc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function nt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function wt(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,F&2){var r=a.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),a.pending=t,ot(e,n)}return r=a.interleaved,r===null?(t.next=t,bs(a)):(t.next=r.next,r.next=t),a.interleaved=t,ot(e,n)}function sr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,ls(e,n)}}function Ml(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var r=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?r=i=s:i=i.next=s,n=n.next}while(n!==null);i===null?r=i=t:i=i.next=t}else r=i=t;n={baseState:a.baseState,firstBaseUpdate:r,lastBaseUpdate:i,shared:a.shared,effects:a.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Dr(e,t,n,a){var r=e.updateQueue;ht=!1;var i=r.firstBaseUpdate,s=r.lastBaseUpdate,l=r.shared.pending;if(l!==null){r.shared.pending=null;var u=l,c=u.next;u.next=null,s===null?i=c:s.next=c,s=u;var f=e.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==s&&(l===null?f.firstBaseUpdate=c:l.next=c,f.lastBaseUpdate=u))}if(i!==null){var d=r.baseState;s=0,f=c=u=null,l=i;do{var y=l.lane,g=l.eventTime;if((a&y)===y){f!==null&&(f=f.next={eventTime:g,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var v=e,T=l;switch(y=t,g=n,T.tag){case 1:if(v=T.payload,typeof v=="function"){d=v.call(g,d,y);break e}d=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=T.payload,y=typeof v=="function"?v.call(g,d,y):v,y==null)break e;d=Y({},d,y);break e;case 2:ht=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,y=r.effects,y===null?r.effects=[l]:y.push(l))}else g={eventTime:g,lane:y,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(c=f=g,u=d):f=f.next=g,s|=y;if(l=l.next,l===null){if(l=r.shared.pending,l===null)break;y=l,l=y.next,y.next=null,r.lastBaseUpdate=y,r.shared.pending=null}}while(!0);if(f===null&&(u=d),r.baseState=u,r.firstBaseUpdate=c,r.lastBaseUpdate=f,t=r.shared.interleaved,t!==null){r=t;do s|=r.lane,r=r.next;while(r!==t)}else i===null&&(r.shared.lanes=0);$t|=s,e.lanes=s,e.memoizedState=d}}function _l(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var a=e[t],r=a.callback;if(r!==null){if(a.callback=null,a=n,typeof r!="function")throw Error(S(191,r));r.call(a)}}}var ja={},Ge=Rt(ja),xa=Rt(ja),va=Rt(ja);function Mt(e){if(e===ja)throw Error(S(174));return e}function Ns(e,t){switch(_(va,t),_(xa,e),_(Ge,ja),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ro(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ro(t,e)}H(Ge),_(Ge,t)}function bn(){H(Ge),H(xa),H(va)}function $c(e){Mt(va.current);var t=Mt(Ge.current),n=ro(t,e.type);t!==n&&(_(xa,e),_(Ge,n))}function ks(e){xa.current===e&&(H(Ge),H(xa))}var $=Rt(0);function Fr(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Pi=[];function Cs(){for(var e=0;e<Pi.length;e++)Pi[e]._workInProgressVersionPrimary=null;Pi.length=0}var lr=ut.ReactCurrentDispatcher,Li=ut.ReactCurrentBatchConfig,zt=0,V=null,X=null,ee=null,Or=!1,aa=!1,Ta=0,lf=0;function oe(){throw Error(S(321))}function As(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Be(e[n],t[n]))return!1;return!0}function Rs(e,t,n,a,r,i){if(zt=i,V=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,lr.current=e===null||e.memoizedState===null?hf:mf,e=n(a,r),aa){i=0;do{if(aa=!1,Ta=0,25<=i)throw Error(S(301));i+=1,ee=X=null,t.updateQueue=null,lr.current=ff,e=n(a,r)}while(aa)}if(lr.current=Mr,t=X!==null&&X.next!==null,zt=0,ee=X=V=null,Or=!1,t)throw Error(S(300));return e}function Es(){var e=Ta!==0;return Ta=0,e}function Ve(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ee===null?V.memoizedState=ee=e:ee=ee.next=e,ee}function Pe(){if(X===null){var e=V.alternate;e=e!==null?e.memoizedState:null}else e=X.next;var t=ee===null?V.memoizedState:ee.next;if(t!==null)ee=t,X=e;else{if(e===null)throw Error(S(310));X=e,e={memoizedState:X.memoizedState,baseState:X.baseState,baseQueue:X.baseQueue,queue:X.queue,next:null},ee===null?V.memoizedState=ee=e:ee=ee.next=e}return ee}function wa(e,t){return typeof t=="function"?t(e):t}function Di(e){var t=Pe(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var a=X,r=a.baseQueue,i=n.pending;if(i!==null){if(r!==null){var s=r.next;r.next=i.next,i.next=s}a.baseQueue=r=i,n.pending=null}if(r!==null){i=r.next,a=a.baseState;var l=s=null,u=null,c=i;do{var f=c.lane;if((zt&f)===f)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),a=c.hasEagerState?c.eagerState:e(a,c.action);else{var d={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(l=u=d,s=a):u=u.next=d,V.lanes|=f,$t|=f}c=c.next}while(c!==null&&c!==i);u===null?s=a:u.next=l,Be(a,t.memoizedState)||(pe=!0),t.memoizedState=a,t.baseState=s,t.baseQueue=u,n.lastRenderedState=a}if(e=n.interleaved,e!==null){r=e;do i=r.lane,V.lanes|=i,$t|=i,r=r.next;while(r!==e)}else r===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Fi(e){var t=Pe(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var a=n.dispatch,r=n.pending,i=t.memoizedState;if(r!==null){n.pending=null;var s=r=r.next;do i=e(i,s.action),s=s.next;while(s!==r);Be(i,t.memoizedState)||(pe=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,a]}function Vc(){}function Yc(e,t){var n=V,a=Pe(),r=t(),i=!Be(a.memoizedState,r);if(i&&(a.memoizedState=r,pe=!0),a=a.queue,js(Gc.bind(null,n,a,e),[e]),a.getSnapshot!==t||i||ee!==null&&ee.memoizedState.tag&1){if(n.flags|=2048,ba(9,qc.bind(null,n,a,r,t),void 0,null),te===null)throw Error(S(349));zt&30||Kc(n,t,r)}return r}function Kc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=V.updateQueue,t===null?(t={lastEffect:null,stores:null},V.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function qc(e,t,n,a){t.value=n,t.getSnapshot=a,Qc(t)&&Xc(e)}function Gc(e,t,n){return n(function(){Qc(t)&&Xc(e)})}function Qc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Be(e,n)}catch{return!0}}function Xc(e){var t=ot(e,1);t!==null&&He(t,e,1,-1)}function Ul(e){var t=Ve();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:wa,lastRenderedState:e},t.queue=e,e=e.dispatch=df.bind(null,V,e),[t.memoizedState,e]}function ba(e,t,n,a){return e={tag:e,create:t,destroy:n,deps:a,next:null},t=V.updateQueue,t===null?(t={lastEffect:null,stores:null},V.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e)),e}function Jc(){return Pe().memoizedState}function ur(e,t,n,a){var r=Ve();V.flags|=e,r.memoizedState=ba(1|t,n,void 0,a===void 0?null:a)}function Zr(e,t,n,a){var r=Pe();a=a===void 0?null:a;var i=void 0;if(X!==null){var s=X.memoizedState;if(i=s.destroy,a!==null&&As(a,s.deps)){r.memoizedState=ba(t,n,i,a);return}}V.flags|=e,r.memoizedState=ba(1|t,n,i,a)}function Hl(e,t){return ur(8390656,8,e,t)}function js(e,t){return Zr(2048,8,e,t)}function Zc(e,t){return Zr(4,2,e,t)}function ed(e,t){return Zr(4,4,e,t)}function td(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function nd(e,t,n){return n=n!=null?n.concat([e]):null,Zr(4,4,td.bind(null,t,e),n)}function Is(){}function ad(e,t){var n=Pe();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&As(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function rd(e,t){var n=Pe();t=t===void 0?null:t;var a=n.memoizedState;return a!==null&&t!==null&&As(t,a[1])?a[0]:(e=e(),n.memoizedState=[e,t],e)}function id(e,t,n){return zt&21?(Be(n,t)||(n=cc(),V.lanes|=n,$t|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,pe=!0),e.memoizedState=n)}function uf(e,t){var n=M;M=n!==0&&4>n?n:4,e(!0);var a=Li.transition;Li.transition={};try{e(!1),t()}finally{M=n,Li.transition=a}}function od(){return Pe().memoizedState}function cf(e,t,n){var a=St(e);if(n={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null},sd(e))ld(t,n);else if(n=Wc(e,t,n,a),n!==null){var r=de();He(n,e,a,r),ud(n,t,a)}}function df(e,t,n){var a=St(e),r={lane:a,action:n,hasEagerState:!1,eagerState:null,next:null};if(sd(e))ld(t,r);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var s=t.lastRenderedState,l=i(s,n);if(r.hasEagerState=!0,r.eagerState=l,Be(l,s)){var u=t.interleaved;u===null?(r.next=r,bs(t)):(r.next=u.next,u.next=r),t.interleaved=r;return}}catch{}finally{}n=Wc(e,t,r,a),n!==null&&(r=de(),He(n,e,a,r),ud(n,t,a))}}function sd(e){var t=e.alternate;return e===V||t!==null&&t===V}function ld(e,t){aa=Or=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function ud(e,t,n){if(n&4194240){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,ls(e,n)}}var Mr={readContext:Ie,useCallback:oe,useContext:oe,useEffect:oe,useImperativeHandle:oe,useInsertionEffect:oe,useLayoutEffect:oe,useMemo:oe,useReducer:oe,useRef:oe,useState:oe,useDebugValue:oe,useDeferredValue:oe,useTransition:oe,useMutableSource:oe,useSyncExternalStore:oe,useId:oe,unstable_isNewReconciler:!1},hf={readContext:Ie,useCallback:function(e,t){return Ve().memoizedState=[e,t===void 0?null:t],e},useContext:Ie,useEffect:Hl,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,ur(4194308,4,td.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ur(4194308,4,e,t)},useInsertionEffect:function(e,t){return ur(4,2,e,t)},useMemo:function(e,t){var n=Ve();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var a=Ve();return t=n!==void 0?n(t):t,a.memoizedState=a.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},a.queue=e,e=e.dispatch=cf.bind(null,V,e),[a.memoizedState,e]},useRef:function(e){var t=Ve();return e={current:e},t.memoizedState=e},useState:Ul,useDebugValue:Is,useDeferredValue:function(e){return Ve().memoizedState=e},useTransition:function(){var e=Ul(!1),t=e[0];return e=uf.bind(null,e[1]),Ve().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var a=V,r=Ve();if(B){if(n===void 0)throw Error(S(407));n=n()}else{if(n=t(),te===null)throw Error(S(349));zt&30||Kc(a,t,n)}r.memoizedState=n;var i={value:n,getSnapshot:t};return r.queue=i,Hl(Gc.bind(null,a,i,e),[e]),a.flags|=2048,ba(9,qc.bind(null,a,i,n,t),void 0,null),n},useId:function(){var e=Ve(),t=te.identifierPrefix;if(B){var n=tt,a=et;n=(a&~(1<<32-Ue(a)-1)).toString(32)+n,t=":"+t+"R"+n,n=Ta++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=lf++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},mf={readContext:Ie,useCallback:ad,useContext:Ie,useEffect:js,useImperativeHandle:nd,useInsertionEffect:Zc,useLayoutEffect:ed,useMemo:rd,useReducer:Di,useRef:Jc,useState:function(){return Di(wa)},useDebugValue:Is,useDeferredValue:function(e){var t=Pe();return id(t,X.memoizedState,e)},useTransition:function(){var e=Di(wa)[0],t=Pe().memoizedState;return[e,t]},useMutableSource:Vc,useSyncExternalStore:Yc,useId:od,unstable_isNewReconciler:!1},ff={readContext:Ie,useCallback:ad,useContext:Ie,useEffect:js,useImperativeHandle:nd,useInsertionEffect:Zc,useLayoutEffect:ed,useMemo:rd,useReducer:Fi,useRef:Jc,useState:function(){return Fi(wa)},useDebugValue:Is,useDeferredValue:function(e){var t=Pe();return X===null?t.memoizedState=e:id(t,X.memoizedState,e)},useTransition:function(){var e=Fi(wa)[0],t=Pe().memoizedState;return[e,t]},useMutableSource:Vc,useSyncExternalStore:Yc,useId:od,unstable_isNewReconciler:!1};function Fe(e,t){if(e&&e.defaultProps){t=Y({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Co(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:Y({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ei={isMounted:function(e){return(e=e._reactInternals)?Kt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var a=de(),r=St(e),i=nt(a,r);i.payload=t,n!=null&&(i.callback=n),t=wt(e,i,r),t!==null&&(He(t,e,r,a),sr(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=de(),r=St(e),i=nt(a,r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=wt(e,i,r),t!==null&&(He(t,e,r,a),sr(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=de(),a=St(e),r=nt(n,a);r.tag=2,t!=null&&(r.callback=t),t=wt(e,r,a),t!==null&&(He(t,e,a,n),sr(t,e,a))}};function Bl(e,t,n,a,r,i,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,i,s):t.prototype&&t.prototype.isPureReactComponent?!fa(n,a)||!fa(r,i):!0}function cd(e,t,n){var a=!1,r=Ct,i=t.contextType;return typeof i=="object"&&i!==null?i=Ie(i):(r=ge(t)?Bt:ue.current,a=t.contextTypes,i=(a=a!=null)?vn(e,r):Ct),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ei,e.stateNode=t,t._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=i),t}function Wl(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&ei.enqueueReplaceState(t,t.state,null)}function Ao(e,t,n,a){var r=e.stateNode;r.props=n,r.state=e.memoizedState,r.refs={},Ss(e);var i=t.contextType;typeof i=="object"&&i!==null?r.context=Ie(i):(i=ge(t)?Bt:ue.current,r.context=vn(e,i)),r.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Co(e,t,i,n),r.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(t=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),t!==r.state&&ei.enqueueReplaceState(r,r.state,null),Dr(e,n,r,a),r.state=e.memoizedState),typeof r.componentDidMount=="function"&&(e.flags|=4194308)}function Sn(e,t){try{var n="",a=t;do n+=Bh(a),a=a.return;while(a);var r=n}catch(i){r=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:r,digest:null}}function Oi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ro(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var pf=typeof WeakMap=="function"?WeakMap:Map;function dd(e,t,n){n=nt(-1,n),n.tag=3,n.payload={element:null};var a=t.value;return n.callback=function(){Ur||(Ur=!0,_o=a),Ro(e,t)},n}function hd(e,t,n){n=nt(-1,n),n.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var r=t.value;n.payload=function(){return a(r)},n.callback=function(){Ro(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Ro(e,t),typeof a!="function"&&(bt===null?bt=new Set([this]):bt.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function zl(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new pf;var r=new Set;a.set(t,r)}else r=a.get(t),r===void 0&&(r=new Set,a.set(t,r));r.has(n)||(r.add(n),e=Ef.bind(null,e,t,n),t.then(e,e))}function $l(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Vl(e,t,n,a,r){return e.mode&1?(e.flags|=65536,e.lanes=r,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=nt(-1,1),t.tag=2,wt(n,t,1))),n.lanes|=1),e)}var yf=ut.ReactCurrentOwner,pe=!1;function ce(e,t,n,a){t.child=e===null?Bc(t,null,n,a):wn(t,e.child,n,a)}function Yl(e,t,n,a,r){n=n.render;var i=t.ref;return fn(t,r),a=Rs(e,t,n,a,i,r),n=Es(),e!==null&&!pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,st(e,t,r)):(B&&n&&ys(t),t.flags|=1,ce(e,t,a,r),t.child)}function Kl(e,t,n,a,r){if(e===null){var i=n.type;return typeof i=="function"&&!Us(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,md(e,t,i,a,r)):(e=mr(n.type,null,a,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&r)){var s=i.memoizedProps;if(n=n.compare,n=n!==null?n:fa,n(s,a)&&e.ref===t.ref)return st(e,t,r)}return t.flags|=1,e=Nt(i,a),e.ref=t.ref,e.return=t,t.child=e}function md(e,t,n,a,r){if(e!==null){var i=e.memoizedProps;if(fa(i,a)&&e.ref===t.ref)if(pe=!1,t.pendingProps=a=i,(e.lanes&r)!==0)e.flags&131072&&(pe=!0);else return t.lanes=e.lanes,st(e,t,r)}return Eo(e,t,n,a,r)}function fd(e,t,n){var a=t.pendingProps,r=a.children,i=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},_(un,ve),ve|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,_(un,ve),ve|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=i!==null?i.baseLanes:n,_(un,ve),ve|=a}else i!==null?(a=i.baseLanes|n,t.memoizedState=null):a=n,_(un,ve),ve|=a;return ce(e,t,r,n),t.child}function pd(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Eo(e,t,n,a,r){var i=ge(n)?Bt:ue.current;return i=vn(t,i),fn(t,r),n=Rs(e,t,n,a,i,r),a=Es(),e!==null&&!pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r,st(e,t,r)):(B&&a&&ys(t),t.flags|=1,ce(e,t,n,r),t.child)}function ql(e,t,n,a,r){if(ge(n)){var i=!0;Er(t)}else i=!1;if(fn(t,r),t.stateNode===null)cr(e,t),cd(t,n,a),Ao(t,n,a,r),a=!0;else if(e===null){var s=t.stateNode,l=t.memoizedProps;s.props=l;var u=s.context,c=n.contextType;typeof c=="object"&&c!==null?c=Ie(c):(c=ge(n)?Bt:ue.current,c=vn(t,c));var f=n.getDerivedStateFromProps,d=typeof f=="function"||typeof s.getSnapshotBeforeUpdate=="function";d||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==a||u!==c)&&Wl(t,s,a,c),ht=!1;var y=t.memoizedState;s.state=y,Dr(t,a,s,r),u=t.memoizedState,l!==a||y!==u||ye.current||ht?(typeof f=="function"&&(Co(t,n,f,a),u=t.memoizedState),(l=ht||Bl(t,n,l,a,y,u,c))?(d||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=u),s.props=a,s.state=u,s.context=c,a=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{s=t.stateNode,zc(e,t),l=t.memoizedProps,c=t.type===t.elementType?l:Fe(t.type,l),s.props=c,d=t.pendingProps,y=s.context,u=n.contextType,typeof u=="object"&&u!==null?u=Ie(u):(u=ge(n)?Bt:ue.current,u=vn(t,u));var g=n.getDerivedStateFromProps;(f=typeof g=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(l!==d||y!==u)&&Wl(t,s,a,u),ht=!1,y=t.memoizedState,s.state=y,Dr(t,a,s,r);var v=t.memoizedState;l!==d||y!==v||ye.current||ht?(typeof g=="function"&&(Co(t,n,g,a),v=t.memoizedState),(c=ht||Bl(t,n,c,a,y,v,u)||!1)?(f||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(a,v,u),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(a,v,u)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=v),s.props=a,s.state=v,s.context=u,a=c):(typeof s.componentDidUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),a=!1)}return jo(e,t,n,a,i,r)}function jo(e,t,n,a,r,i){pd(e,t);var s=(t.flags&128)!==0;if(!a&&!s)return r&&Ll(t,n,!1),st(e,t,i);a=t.stateNode,yf.current=t;var l=s&&typeof n.getDerivedStateFromError!="function"?null:a.render();return t.flags|=1,e!==null&&s?(t.child=wn(t,e.child,null,i),t.child=wn(t,null,l,i)):ce(e,t,l,i),t.memoizedState=a.state,r&&Ll(t,n,!0),t.child}function yd(e){var t=e.stateNode;t.pendingContext?Pl(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Pl(e,t.context,!1),Ns(e,t.containerInfo)}function Gl(e,t,n,a,r){return Tn(),xs(r),t.flags|=256,ce(e,t,n,a),t.child}var Io={dehydrated:null,treeContext:null,retryLane:0};function Po(e){return{baseLanes:e,cachePool:null,transitions:null}}function gd(e,t,n){var a=t.pendingProps,r=$.current,i=!1,s=(t.flags&128)!==0,l;if((l=s)||(l=e!==null&&e.memoizedState===null?!1:(r&2)!==0),l?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(r|=1),_($,r&1),e===null)return No(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=a.children,e=a.fallback,i?(a=t.mode,i=t.child,s={mode:"hidden",children:s},!(a&1)&&i!==null?(i.childLanes=0,i.pendingProps=s):i=ai(s,a,0,null),e=Ht(e,a,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Po(n),t.memoizedState=Io,e):Ps(t,s));if(r=e.memoizedState,r!==null&&(l=r.dehydrated,l!==null))return gf(e,t,s,a,l,r,n);if(i){i=a.fallback,s=t.mode,r=e.child,l=r.sibling;var u={mode:"hidden",children:a.children};return!(s&1)&&t.child!==r?(a=t.child,a.childLanes=0,a.pendingProps=u,t.deletions=null):(a=Nt(r,u),a.subtreeFlags=r.subtreeFlags&14680064),l!==null?i=Nt(l,i):(i=Ht(i,s,n,null),i.flags|=2),i.return=t,a.return=t,a.sibling=i,t.child=a,a=i,i=t.child,s=e.child.memoizedState,s=s===null?Po(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},i.memoizedState=s,i.childLanes=e.childLanes&~n,t.memoizedState=Io,a}return i=e.child,e=i.sibling,a=Nt(i,{mode:"visible",children:a.children}),!(t.mode&1)&&(a.lanes=n),a.return=t,a.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=a,t.memoizedState=null,a}function Ps(e,t){return t=ai({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function qa(e,t,n,a){return a!==null&&xs(a),wn(t,e.child,null,n),e=Ps(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function gf(e,t,n,a,r,i,s){if(n)return t.flags&256?(t.flags&=-257,a=Oi(Error(S(422))),qa(e,t,s,a)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=a.fallback,r=t.mode,a=ai({mode:"visible",children:a.children},r,0,null),i=Ht(i,r,s,null),i.flags|=2,a.return=t,i.return=t,a.sibling=i,t.child=a,t.mode&1&&wn(t,e.child,null,s),t.child.memoizedState=Po(s),t.memoizedState=Io,i);if(!(t.mode&1))return qa(e,t,s,null);if(r.data==="$!"){if(a=r.nextSibling&&r.nextSibling.dataset,a)var l=a.dgst;return a=l,i=Error(S(419)),a=Oi(i,a,void 0),qa(e,t,s,a)}if(l=(s&e.childLanes)!==0,pe||l){if(a=te,a!==null){switch(s&-s){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(a.suspendedLanes|s)?0:r,r!==0&&r!==i.retryLane&&(i.retryLane=r,ot(e,r),He(a,e,r,-1))}return _s(),a=Oi(Error(S(421))),qa(e,t,s,a)}return r.data==="$?"?(t.flags|=128,t.child=e.child,t=jf.bind(null,e),r._reactRetry=t,null):(e=i.treeContext,Te=Tt(r.nextSibling),we=t,B=!0,Me=null,e!==null&&(Ae[Re++]=et,Ae[Re++]=tt,Ae[Re++]=Wt,et=e.id,tt=e.overflow,Wt=t),t=Ps(t,a.children),t.flags|=4096,t)}function Ql(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),ko(e.return,t,n)}function Mi(e,t,n,a,r){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:r}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=a,i.tail=n,i.tailMode=r)}function xd(e,t,n){var a=t.pendingProps,r=a.revealOrder,i=a.tail;if(ce(e,t,a.children,n),a=$.current,a&2)a=a&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ql(e,n,t);else if(e.tag===19)Ql(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(_($,a),!(t.mode&1))t.memoizedState=null;else switch(r){case"forwards":for(n=t.child,r=null;n!==null;)e=n.alternate,e!==null&&Fr(e)===null&&(r=n),n=n.sibling;n=r,n===null?(r=t.child,t.child=null):(r=n.sibling,n.sibling=null),Mi(t,!1,r,n,i);break;case"backwards":for(n=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&Fr(e)===null){t.child=r;break}e=r.sibling,r.sibling=n,n=r,r=e}Mi(t,!0,n,null,i);break;case"together":Mi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function cr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function st(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),$t|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(S(153));if(t.child!==null){for(e=t.child,n=Nt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Nt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function xf(e,t,n){switch(t.tag){case 3:yd(t),Tn();break;case 5:$c(t);break;case 1:ge(t.type)&&Er(t);break;case 4:Ns(t,t.stateNode.containerInfo);break;case 10:var a=t.type._context,r=t.memoizedProps.value;_(Pr,a._currentValue),a._currentValue=r;break;case 13:if(a=t.memoizedState,a!==null)return a.dehydrated!==null?(_($,$.current&1),t.flags|=128,null):n&t.child.childLanes?gd(e,t,n):(_($,$.current&1),e=st(e,t,n),e!==null?e.sibling:null);_($,$.current&1);break;case 19:if(a=(n&t.childLanes)!==0,e.flags&128){if(a)return xd(e,t,n);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),_($,$.current),a)break;return null;case 22:case 23:return t.lanes=0,fd(e,t,n)}return st(e,t,n)}var vd,Lo,Td,wd;vd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Lo=function(){};Td=function(e,t,n,a){var r=e.memoizedProps;if(r!==a){e=t.stateNode,Mt(Ge.current);var i=null;switch(n){case"input":r=eo(e,r),a=eo(e,a),i=[];break;case"select":r=Y({},r,{value:void 0}),a=Y({},a,{value:void 0}),i=[];break;case"textarea":r=ao(e,r),a=ao(e,a),i=[];break;default:typeof r.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=Ar)}io(n,a);var s;n=null;for(c in r)if(!a.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var l=r[c];for(s in l)l.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(sa.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in a){var u=a[c];if(l=r!=null?r[c]:void 0,a.hasOwnProperty(c)&&u!==l&&(u!=null||l!=null))if(c==="style")if(l){for(s in l)!l.hasOwnProperty(s)||u&&u.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in u)u.hasOwnProperty(s)&&l[s]!==u[s]&&(n||(n={}),n[s]=u[s])}else n||(i||(i=[]),i.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(i=i||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(sa.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&U("scroll",e),i||l===u||(i=[])):(i=i||[]).push(c,u))}n&&(i=i||[]).push("style",n);var c=i;(t.updateQueue=c)&&(t.flags|=4)}};wd=function(e,t,n,a){n!==a&&(t.flags|=4)};function Bn(e,t){if(!B)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function se(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var r=e.child;r!==null;)n|=r.lanes|r.childLanes,a|=r.subtreeFlags&14680064,a|=r.flags&14680064,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)n|=r.lanes|r.childLanes,a|=r.subtreeFlags,a|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function vf(e,t,n){var a=t.pendingProps;switch(gs(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return se(t),null;case 1:return ge(t.type)&&Rr(),se(t),null;case 3:return a=t.stateNode,bn(),H(ye),H(ue),Cs(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Ya(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Me!==null&&(Bo(Me),Me=null))),Lo(e,t),se(t),null;case 5:ks(t);var r=Mt(va.current);if(n=t.type,e!==null&&t.stateNode!=null)Td(e,t,n,a,r),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!a){if(t.stateNode===null)throw Error(S(166));return se(t),null}if(e=Mt(Ge.current),Ya(t)){a=t.stateNode,n=t.type;var i=t.memoizedProps;switch(a[Ye]=t,a[ga]=i,e=(t.mode&1)!==0,n){case"dialog":U("cancel",a),U("close",a);break;case"iframe":case"object":case"embed":U("load",a);break;case"video":case"audio":for(r=0;r<Qn.length;r++)U(Qn[r],a);break;case"source":U("error",a);break;case"img":case"image":case"link":U("error",a),U("load",a);break;case"details":U("toggle",a);break;case"input":il(a,i),U("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!i.multiple},U("invalid",a);break;case"textarea":sl(a,i),U("invalid",a)}io(n,i),r=null;for(var s in i)if(i.hasOwnProperty(s)){var l=i[s];s==="children"?typeof l=="string"?a.textContent!==l&&(i.suppressHydrationWarning!==!0&&Va(a.textContent,l,e),r=["children",l]):typeof l=="number"&&a.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&Va(a.textContent,l,e),r=["children",""+l]):sa.hasOwnProperty(s)&&l!=null&&s==="onScroll"&&U("scroll",a)}switch(n){case"input":Ma(a),ol(a,i,!0);break;case"textarea":Ma(a),ll(a);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(a.onclick=Ar)}a=r,t.updateQueue=a,a!==null&&(t.flags|=4)}else{s=r.nodeType===9?r:r.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Gu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=s.createElement(n,{is:a.is}):(e=s.createElement(n),n==="select"&&(s=e,a.multiple?s.multiple=!0:a.size&&(s.size=a.size))):e=s.createElementNS(e,n),e[Ye]=t,e[ga]=a,vd(e,t,!1,!1),t.stateNode=e;e:{switch(s=oo(n,a),n){case"dialog":U("cancel",e),U("close",e),r=a;break;case"iframe":case"object":case"embed":U("load",e),r=a;break;case"video":case"audio":for(r=0;r<Qn.length;r++)U(Qn[r],e);r=a;break;case"source":U("error",e),r=a;break;case"img":case"image":case"link":U("error",e),U("load",e),r=a;break;case"details":U("toggle",e),r=a;break;case"input":il(e,a),r=eo(e,a),U("invalid",e);break;case"option":r=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},r=Y({},a,{value:void 0}),U("invalid",e);break;case"textarea":sl(e,a),r=ao(e,a),U("invalid",e);break;default:r=a}io(n,r),l=r;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?Ju(e,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Qu(e,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&la(e,u):typeof u=="number"&&la(e,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(sa.hasOwnProperty(i)?u!=null&&i==="onScroll"&&U("scroll",e):u!=null&&ns(e,i,u,s))}switch(n){case"input":Ma(e),ol(e,a,!1);break;case"textarea":Ma(e),ll(e);break;case"option":a.value!=null&&e.setAttribute("value",""+kt(a.value));break;case"select":e.multiple=!!a.multiple,i=a.value,i!=null?cn(e,!!a.multiple,i,!1):a.defaultValue!=null&&cn(e,!!a.multiple,a.defaultValue,!0);break;default:typeof r.onClick=="function"&&(e.onclick=Ar)}switch(n){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return se(t),null;case 6:if(e&&t.stateNode!=null)wd(e,t,e.memoizedProps,a);else{if(typeof a!="string"&&t.stateNode===null)throw Error(S(166));if(n=Mt(va.current),Mt(Ge.current),Ya(t)){if(a=t.stateNode,n=t.memoizedProps,a[Ye]=t,(i=a.nodeValue!==n)&&(e=we,e!==null))switch(e.tag){case 3:Va(a.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Va(a.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else a=(n.nodeType===9?n:n.ownerDocument).createTextNode(a),a[Ye]=t,t.stateNode=a}return se(t),null;case 13:if(H($),a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(B&&Te!==null&&t.mode&1&&!(t.flags&128))Uc(),Tn(),t.flags|=98560,i=!1;else if(i=Ya(t),a!==null&&a.dehydrated!==null){if(e===null){if(!i)throw Error(S(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(S(317));i[Ye]=t}else Tn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;se(t),i=!1}else Me!==null&&(Bo(Me),Me=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(t.child.flags|=8192,t.mode&1&&(e===null||$.current&1?J===0&&(J=3):_s())),t.updateQueue!==null&&(t.flags|=4),se(t),null);case 4:return bn(),Lo(e,t),e===null&&pa(t.stateNode.containerInfo),se(t),null;case 10:return ws(t.type._context),se(t),null;case 17:return ge(t.type)&&Rr(),se(t),null;case 19:if(H($),i=t.memoizedState,i===null)return se(t),null;if(a=(t.flags&128)!==0,s=i.rendering,s===null)if(a)Bn(i,!1);else{if(J!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=Fr(e),s!==null){for(t.flags|=128,Bn(i,!1),a=s.updateQueue,a!==null&&(t.updateQueue=a,t.flags|=4),t.subtreeFlags=0,a=n,n=t.child;n!==null;)i=n,e=a,i.flags&=14680066,s=i.alternate,s===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=s.childLanes,i.lanes=s.lanes,i.child=s.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=s.memoizedProps,i.memoizedState=s.memoizedState,i.updateQueue=s.updateQueue,i.type=s.type,e=s.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return _($,$.current&1|2),t.child}e=e.sibling}i.tail!==null&&G()>Nn&&(t.flags|=128,a=!0,Bn(i,!1),t.lanes=4194304)}else{if(!a)if(e=Fr(s),e!==null){if(t.flags|=128,a=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Bn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!B)return se(t),null}else 2*G()-i.renderingStartTime>Nn&&n!==1073741824&&(t.flags|=128,a=!0,Bn(i,!1),t.lanes=4194304);i.isBackwards?(s.sibling=t.child,t.child=s):(n=i.last,n!==null?n.sibling=s:t.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=G(),t.sibling=null,n=$.current,_($,a?n&1|2:n&1),t):(se(t),null);case 22:case 23:return Ms(),a=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(t.flags|=8192),a&&t.mode&1?ve&1073741824&&(se(t),t.subtreeFlags&6&&(t.flags|=8192)):se(t),null;case 24:return null;case 25:return null}throw Error(S(156,t.tag))}function Tf(e,t){switch(gs(t),t.tag){case 1:return ge(t.type)&&Rr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return bn(),H(ye),H(ue),Cs(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return ks(t),null;case 13:if(H($),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(S(340));Tn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return H($),null;case 4:return bn(),null;case 10:return ws(t.type._context),null;case 22:case 23:return Ms(),null;case 24:return null;default:return null}}var Ga=!1,le=!1,wf=typeof WeakSet=="function"?WeakSet:Set,A=null;function ln(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(a){K(e,t,a)}else n.current=null}function Do(e,t,n){try{n()}catch(a){K(e,t,a)}}var Xl=!1;function bf(e,t){if(go=Nr,e=Cc(),ps(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var r=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var s=0,l=-1,u=-1,c=0,f=0,d=e,y=null;t:for(;;){for(var g;d!==n||r!==0&&d.nodeType!==3||(l=s+r),d!==i||a!==0&&d.nodeType!==3||(u=s+a),d.nodeType===3&&(s+=d.nodeValue.length),(g=d.firstChild)!==null;)y=d,d=g;for(;;){if(d===e)break t;if(y===n&&++c===r&&(l=s),y===i&&++f===a&&(u=s),(g=d.nextSibling)!==null)break;d=y,y=d.parentNode}d=g}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(xo={focusedElem:e,selectionRange:n},Nr=!1,A=t;A!==null;)if(t=A,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,A=e;else for(;A!==null;){t=A;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var T=v.memoizedProps,b=v.memoizedState,m=t.stateNode,h=m.getSnapshotBeforeUpdate(t.elementType===t.type?T:Fe(t.type,T),b);m.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(S(163))}}catch(w){K(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,A=e;break}A=t.return}return v=Xl,Xl=!1,v}function ra(e,t,n){var a=t.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var r=a=a.next;do{if((r.tag&e)===e){var i=r.destroy;r.destroy=void 0,i!==void 0&&Do(t,n,i)}r=r.next}while(r!==a)}}function ti(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var a=n.create;n.destroy=a()}n=n.next}while(n!==t)}}function Fo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function bd(e){var t=e.alternate;t!==null&&(e.alternate=null,bd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ye],delete t[ga],delete t[wo],delete t[af],delete t[rf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Sd(e){return e.tag===5||e.tag===3||e.tag===4}function Jl(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Sd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Oo(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ar));else if(a!==4&&(e=e.child,e!==null))for(Oo(e,t,n),e=e.sibling;e!==null;)Oo(e,t,n),e=e.sibling}function Mo(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(Mo(e,t,n),e=e.sibling;e!==null;)Mo(e,t,n),e=e.sibling}var ne=null,Oe=!1;function ct(e,t,n){for(n=n.child;n!==null;)Nd(e,t,n),n=n.sibling}function Nd(e,t,n){if(qe&&typeof qe.onCommitFiberUnmount=="function")try{qe.onCommitFiberUnmount(Kr,n)}catch{}switch(n.tag){case 5:le||ln(n,t);case 6:var a=ne,r=Oe;ne=null,ct(e,t,n),ne=a,Oe=r,ne!==null&&(Oe?(e=ne,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ne.removeChild(n.stateNode));break;case 18:ne!==null&&(Oe?(e=ne,n=n.stateNode,e.nodeType===8?ji(e.parentNode,n):e.nodeType===1&&ji(e,n),ha(e)):ji(ne,n.stateNode));break;case 4:a=ne,r=Oe,ne=n.stateNode.containerInfo,Oe=!0,ct(e,t,n),ne=a,Oe=r;break;case 0:case 11:case 14:case 15:if(!le&&(a=n.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){r=a=a.next;do{var i=r,s=i.destroy;i=i.tag,s!==void 0&&(i&2||i&4)&&Do(n,t,s),r=r.next}while(r!==a)}ct(e,t,n);break;case 1:if(!le&&(ln(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=n.memoizedProps,a.state=n.memoizedState,a.componentWillUnmount()}catch(l){K(n,t,l)}ct(e,t,n);break;case 21:ct(e,t,n);break;case 22:n.mode&1?(le=(a=le)||n.memoizedState!==null,ct(e,t,n),le=a):ct(e,t,n);break;default:ct(e,t,n)}}function Zl(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new wf),t.forEach(function(a){var r=If.bind(null,e,a);n.has(a)||(n.add(a),a.then(r,r))})}}function De(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];try{var i=e,s=t,l=s;e:for(;l!==null;){switch(l.tag){case 5:ne=l.stateNode,Oe=!1;break e;case 3:ne=l.stateNode.containerInfo,Oe=!0;break e;case 4:ne=l.stateNode.containerInfo,Oe=!0;break e}l=l.return}if(ne===null)throw Error(S(160));Nd(i,s,r),ne=null,Oe=!1;var u=r.alternate;u!==null&&(u.return=null),r.return=null}catch(c){K(r,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)kd(t,e),t=t.sibling}function kd(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(De(t,e),$e(e),a&4){try{ra(3,e,e.return),ti(3,e)}catch(T){K(e,e.return,T)}try{ra(5,e,e.return)}catch(T){K(e,e.return,T)}}break;case 1:De(t,e),$e(e),a&512&&n!==null&&ln(n,n.return);break;case 5:if(De(t,e),$e(e),a&512&&n!==null&&ln(n,n.return),e.flags&32){var r=e.stateNode;try{la(r,"")}catch(T){K(e,e.return,T)}}if(a&4&&(r=e.stateNode,r!=null)){var i=e.memoizedProps,s=n!==null?n.memoizedProps:i,l=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&Ku(r,i),oo(l,s);var c=oo(l,i);for(s=0;s<u.length;s+=2){var f=u[s],d=u[s+1];f==="style"?Ju(r,d):f==="dangerouslySetInnerHTML"?Qu(r,d):f==="children"?la(r,d):ns(r,f,d,c)}switch(l){case"input":to(r,i);break;case"textarea":qu(r,i);break;case"select":var y=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!i.multiple;var g=i.value;g!=null?cn(r,!!i.multiple,g,!1):y!==!!i.multiple&&(i.defaultValue!=null?cn(r,!!i.multiple,i.defaultValue,!0):cn(r,!!i.multiple,i.multiple?[]:"",!1))}r[ga]=i}catch(T){K(e,e.return,T)}}break;case 6:if(De(t,e),$e(e),a&4){if(e.stateNode===null)throw Error(S(162));r=e.stateNode,i=e.memoizedProps;try{r.nodeValue=i}catch(T){K(e,e.return,T)}}break;case 3:if(De(t,e),$e(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{ha(t.containerInfo)}catch(T){K(e,e.return,T)}break;case 4:De(t,e),$e(e);break;case 13:De(t,e),$e(e),r=e.child,r.flags&8192&&(i=r.memoizedState!==null,r.stateNode.isHidden=i,!i||r.alternate!==null&&r.alternate.memoizedState!==null||(Fs=G())),a&4&&Zl(e);break;case 22:if(f=n!==null&&n.memoizedState!==null,e.mode&1?(le=(c=le)||f,De(t,e),le=c):De(t,e),$e(e),a&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!f&&e.mode&1)for(A=e,f=e.child;f!==null;){for(d=A=f;A!==null;){switch(y=A,g=y.child,y.tag){case 0:case 11:case 14:case 15:ra(4,y,y.return);break;case 1:ln(y,y.return);var v=y.stateNode;if(typeof v.componentWillUnmount=="function"){a=y,n=y.return;try{t=a,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(T){K(a,n,T)}}break;case 5:ln(y,y.return);break;case 22:if(y.memoizedState!==null){tu(d);continue}}g!==null?(g.return=y,A=g):tu(d)}f=f.sibling}e:for(f=null,d=e;;){if(d.tag===5){if(f===null){f=d;try{r=d.stateNode,c?(i=r.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=d.stateNode,u=d.memoizedProps.style,s=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=Xu("display",s))}catch(T){K(e,e.return,T)}}}else if(d.tag===6){if(f===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(T){K(e,e.return,T)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===e)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===e)break e;for(;d.sibling===null;){if(d.return===null||d.return===e)break e;f===d&&(f=null),d=d.return}f===d&&(f=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:De(t,e),$e(e),a&4&&Zl(e);break;case 21:break;default:De(t,e),$e(e)}}function $e(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Sd(n)){var a=n;break e}n=n.return}throw Error(S(160))}switch(a.tag){case 5:var r=a.stateNode;a.flags&32&&(la(r,""),a.flags&=-33);var i=Jl(e);Mo(e,i,r);break;case 3:case 4:var s=a.stateNode.containerInfo,l=Jl(e);Oo(e,l,s);break;default:throw Error(S(161))}}catch(u){K(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Sf(e,t,n){A=e,Cd(e)}function Cd(e,t,n){for(var a=(e.mode&1)!==0;A!==null;){var r=A,i=r.child;if(r.tag===22&&a){var s=r.memoizedState!==null||Ga;if(!s){var l=r.alternate,u=l!==null&&l.memoizedState!==null||le;l=Ga;var c=le;if(Ga=s,(le=u)&&!c)for(A=r;A!==null;)s=A,u=s.child,s.tag===22&&s.memoizedState!==null?nu(r):u!==null?(u.return=s,A=u):nu(r);for(;i!==null;)A=i,Cd(i),i=i.sibling;A=r,Ga=l,le=c}eu(e)}else r.subtreeFlags&8772&&i!==null?(i.return=r,A=i):eu(e)}}function eu(e){for(;A!==null;){var t=A;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:le||ti(5,t);break;case 1:var a=t.stateNode;if(t.flags&4&&!le)if(n===null)a.componentDidMount();else{var r=t.elementType===t.type?n.memoizedProps:Fe(t.type,n.memoizedProps);a.componentDidUpdate(r,n.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&_l(t,i,a);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}_l(t,s,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var d=f.dehydrated;d!==null&&ha(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(S(163))}le||t.flags&512&&Fo(t)}catch(y){K(t,t.return,y)}}if(t===e){A=null;break}if(n=t.sibling,n!==null){n.return=t.return,A=n;break}A=t.return}}function tu(e){for(;A!==null;){var t=A;if(t===e){A=null;break}var n=t.sibling;if(n!==null){n.return=t.return,A=n;break}A=t.return}}function nu(e){for(;A!==null;){var t=A;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ti(4,t)}catch(u){K(t,n,u)}break;case 1:var a=t.stateNode;if(typeof a.componentDidMount=="function"){var r=t.return;try{a.componentDidMount()}catch(u){K(t,r,u)}}var i=t.return;try{Fo(t)}catch(u){K(t,i,u)}break;case 5:var s=t.return;try{Fo(t)}catch(u){K(t,s,u)}}}catch(u){K(t,t.return,u)}if(t===e){A=null;break}var l=t.sibling;if(l!==null){l.return=t.return,A=l;break}A=t.return}}var Nf=Math.ceil,_r=ut.ReactCurrentDispatcher,Ls=ut.ReactCurrentOwner,je=ut.ReactCurrentBatchConfig,F=0,te=null,Q=null,ae=0,ve=0,un=Rt(0),J=0,Sa=null,$t=0,ni=0,Ds=0,ia=null,fe=null,Fs=0,Nn=1/0,Je=null,Ur=!1,_o=null,bt=null,Qa=!1,yt=null,Hr=0,oa=0,Uo=null,dr=-1,hr=0;function de(){return F&6?G():dr!==-1?dr:dr=G()}function St(e){return e.mode&1?F&2&&ae!==0?ae&-ae:sf.transition!==null?(hr===0&&(hr=cc()),hr):(e=M,e!==0||(e=window.event,e=e===void 0?16:gc(e.type)),e):1}function He(e,t,n,a){if(50<oa)throw oa=0,Uo=null,Error(S(185));Aa(e,n,a),(!(F&2)||e!==te)&&(e===te&&(!(F&2)&&(ni|=n),J===4&&ft(e,ae)),xe(e,a),n===1&&F===0&&!(t.mode&1)&&(Nn=G()+500,Jr&&Et()))}function xe(e,t){var n=e.callbackNode;om(e,t);var a=Sr(e,e===te?ae:0);if(a===0)n!==null&&dl(n),e.callbackNode=null,e.callbackPriority=0;else if(t=a&-a,e.callbackPriority!==t){if(n!=null&&dl(n),t===1)e.tag===0?of(au.bind(null,e)):Oc(au.bind(null,e)),tf(function(){!(F&6)&&Et()}),n=null;else{switch(dc(a)){case 1:n=ss;break;case 4:n=lc;break;case 16:n=br;break;case 536870912:n=uc;break;default:n=br}n=Dd(n,Ad.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Ad(e,t){if(dr=-1,hr=0,F&6)throw Error(S(327));var n=e.callbackNode;if(pn()&&e.callbackNode!==n)return null;var a=Sr(e,e===te?ae:0);if(a===0)return null;if(a&30||a&e.expiredLanes||t)t=Br(e,a);else{t=a;var r=F;F|=2;var i=Ed();(te!==e||ae!==t)&&(Je=null,Nn=G()+500,Ut(e,t));do try{Af();break}catch(l){Rd(e,l)}while(!0);Ts(),_r.current=i,F=r,Q!==null?t=0:(te=null,ae=0,t=J)}if(t!==0){if(t===2&&(r=ho(e),r!==0&&(a=r,t=Ho(e,r))),t===1)throw n=Sa,Ut(e,0),ft(e,a),xe(e,G()),n;if(t===6)ft(e,a);else{if(r=e.current.alternate,!(a&30)&&!kf(r)&&(t=Br(e,a),t===2&&(i=ho(e),i!==0&&(a=i,t=Ho(e,i))),t===1))throw n=Sa,Ut(e,0),ft(e,a),xe(e,G()),n;switch(e.finishedWork=r,e.finishedLanes=a,t){case 0:case 1:throw Error(S(345));case 2:Dt(e,fe,Je);break;case 3:if(ft(e,a),(a&130023424)===a&&(t=Fs+500-G(),10<t)){if(Sr(e,0)!==0)break;if(r=e.suspendedLanes,(r&a)!==a){de(),e.pingedLanes|=e.suspendedLanes&r;break}e.timeoutHandle=To(Dt.bind(null,e,fe,Je),t);break}Dt(e,fe,Je);break;case 4:if(ft(e,a),(a&4194240)===a)break;for(t=e.eventTimes,r=-1;0<a;){var s=31-Ue(a);i=1<<s,s=t[s],s>r&&(r=s),a&=~i}if(a=r,a=G()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*Nf(a/1960))-a,10<a){e.timeoutHandle=To(Dt.bind(null,e,fe,Je),a);break}Dt(e,fe,Je);break;case 5:Dt(e,fe,Je);break;default:throw Error(S(329))}}}return xe(e,G()),e.callbackNode===n?Ad.bind(null,e):null}function Ho(e,t){var n=ia;return e.current.memoizedState.isDehydrated&&(Ut(e,t).flags|=256),e=Br(e,t),e!==2&&(t=fe,fe=n,t!==null&&Bo(t)),e}function Bo(e){fe===null?fe=e:fe.push.apply(fe,e)}function kf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var a=0;a<n.length;a++){var r=n[a],i=r.getSnapshot;r=r.value;try{if(!Be(i(),r))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ft(e,t){for(t&=~Ds,t&=~ni,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ue(t),a=1<<n;e[n]=-1,t&=~a}}function au(e){if(F&6)throw Error(S(327));pn();var t=Sr(e,0);if(!(t&1))return xe(e,G()),null;var n=Br(e,t);if(e.tag!==0&&n===2){var a=ho(e);a!==0&&(t=a,n=Ho(e,a))}if(n===1)throw n=Sa,Ut(e,0),ft(e,t),xe(e,G()),n;if(n===6)throw Error(S(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Dt(e,fe,Je),xe(e,G()),null}function Os(e,t){var n=F;F|=1;try{return e(t)}finally{F=n,F===0&&(Nn=G()+500,Jr&&Et())}}function Vt(e){yt!==null&&yt.tag===0&&!(F&6)&&pn();var t=F;F|=1;var n=je.transition,a=M;try{if(je.transition=null,M=1,e)return e()}finally{M=a,je.transition=n,F=t,!(F&6)&&Et()}}function Ms(){ve=un.current,H(un)}function Ut(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,ef(n)),Q!==null)for(n=Q.return;n!==null;){var a=n;switch(gs(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&Rr();break;case 3:bn(),H(ye),H(ue),Cs();break;case 5:ks(a);break;case 4:bn();break;case 13:H($);break;case 19:H($);break;case 10:ws(a.type._context);break;case 22:case 23:Ms()}n=n.return}if(te=e,Q=e=Nt(e.current,null),ae=ve=t,J=0,Sa=null,Ds=ni=$t=0,fe=ia=null,Ot!==null){for(t=0;t<Ot.length;t++)if(n=Ot[t],a=n.interleaved,a!==null){n.interleaved=null;var r=a.next,i=n.pending;if(i!==null){var s=i.next;i.next=r,a.next=s}n.pending=a}Ot=null}return e}function Rd(e,t){do{var n=Q;try{if(Ts(),lr.current=Mr,Or){for(var a=V.memoizedState;a!==null;){var r=a.queue;r!==null&&(r.pending=null),a=a.next}Or=!1}if(zt=0,ee=X=V=null,aa=!1,Ta=0,Ls.current=null,n===null||n.return===null){J=1,Sa=t,Q=null;break}e:{var i=e,s=n.return,l=n,u=t;if(t=ae,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,f=l,d=f.tag;if(!(f.mode&1)&&(d===0||d===11||d===15)){var y=f.alternate;y?(f.updateQueue=y.updateQueue,f.memoizedState=y.memoizedState,f.lanes=y.lanes):(f.updateQueue=null,f.memoizedState=null)}var g=$l(s);if(g!==null){g.flags&=-257,Vl(g,s,l,i,t),g.mode&1&&zl(i,c,t),t=g,u=c;var v=t.updateQueue;if(v===null){var T=new Set;T.add(u),t.updateQueue=T}else v.add(u);break e}else{if(!(t&1)){zl(i,c,t),_s();break e}u=Error(S(426))}}else if(B&&l.mode&1){var b=$l(s);if(b!==null){!(b.flags&65536)&&(b.flags|=256),Vl(b,s,l,i,t),xs(Sn(u,l));break e}}i=u=Sn(u,l),J!==4&&(J=2),ia===null?ia=[i]:ia.push(i),i=s;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var m=dd(i,u,t);Ml(i,m);break e;case 1:l=u;var h=i.type,p=i.stateNode;if(!(i.flags&128)&&(typeof h.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(bt===null||!bt.has(p)))){i.flags|=65536,t&=-t,i.lanes|=t;var w=hd(i,l,t);Ml(i,w);break e}}i=i.return}while(i!==null)}Id(n)}catch(N){t=N,Q===n&&n!==null&&(Q=n=n.return);continue}break}while(!0)}function Ed(){var e=_r.current;return _r.current=Mr,e===null?Mr:e}function _s(){(J===0||J===3||J===2)&&(J=4),te===null||!($t&268435455)&&!(ni&268435455)||ft(te,ae)}function Br(e,t){var n=F;F|=2;var a=Ed();(te!==e||ae!==t)&&(Je=null,Ut(e,t));do try{Cf();break}catch(r){Rd(e,r)}while(!0);if(Ts(),F=n,_r.current=a,Q!==null)throw Error(S(261));return te=null,ae=0,J}function Cf(){for(;Q!==null;)jd(Q)}function Af(){for(;Q!==null&&!Xh();)jd(Q)}function jd(e){var t=Ld(e.alternate,e,ve);e.memoizedProps=e.pendingProps,t===null?Id(e):Q=t,Ls.current=null}function Id(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Tf(n,t),n!==null){n.flags&=32767,Q=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{J=6,Q=null;return}}else if(n=vf(n,t,ve),n!==null){Q=n;return}if(t=t.sibling,t!==null){Q=t;return}Q=t=e}while(t!==null);J===0&&(J=5)}function Dt(e,t,n){var a=M,r=je.transition;try{je.transition=null,M=1,Rf(e,t,n,a)}finally{je.transition=r,M=a}return null}function Rf(e,t,n,a){do pn();while(yt!==null);if(F&6)throw Error(S(327));n=e.finishedWork;var r=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(S(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(sm(e,i),e===te&&(Q=te=null,ae=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Qa||(Qa=!0,Dd(br,function(){return pn(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=je.transition,je.transition=null;var s=M;M=1;var l=F;F|=4,Ls.current=null,bf(e,n),kd(n,e),Km(xo),Nr=!!go,xo=go=null,e.current=n,Sf(n),Jh(),F=l,M=s,je.transition=i}else e.current=n;if(Qa&&(Qa=!1,yt=e,Hr=r),i=e.pendingLanes,i===0&&(bt=null),tm(n.stateNode),xe(e,G()),t!==null)for(a=e.onRecoverableError,n=0;n<t.length;n++)r=t[n],a(r.value,{componentStack:r.stack,digest:r.digest});if(Ur)throw Ur=!1,e=_o,_o=null,e;return Hr&1&&e.tag!==0&&pn(),i=e.pendingLanes,i&1?e===Uo?oa++:(oa=0,Uo=e):oa=0,Et(),null}function pn(){if(yt!==null){var e=dc(Hr),t=je.transition,n=M;try{if(je.transition=null,M=16>e?16:e,yt===null)var a=!1;else{if(e=yt,yt=null,Hr=0,F&6)throw Error(S(331));var r=F;for(F|=4,A=e.current;A!==null;){var i=A,s=i.child;if(A.flags&16){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var c=l[u];for(A=c;A!==null;){var f=A;switch(f.tag){case 0:case 11:case 15:ra(8,f,i)}var d=f.child;if(d!==null)d.return=f,A=d;else for(;A!==null;){f=A;var y=f.sibling,g=f.return;if(bd(f),f===c){A=null;break}if(y!==null){y.return=g,A=y;break}A=g}}}var v=i.alternate;if(v!==null){var T=v.child;if(T!==null){v.child=null;do{var b=T.sibling;T.sibling=null,T=b}while(T!==null)}}A=i}}if(i.subtreeFlags&2064&&s!==null)s.return=i,A=s;else e:for(;A!==null;){if(i=A,i.flags&2048)switch(i.tag){case 0:case 11:case 15:ra(9,i,i.return)}var m=i.sibling;if(m!==null){m.return=i.return,A=m;break e}A=i.return}}var h=e.current;for(A=h;A!==null;){s=A;var p=s.child;if(s.subtreeFlags&2064&&p!==null)p.return=s,A=p;else e:for(s=h;A!==null;){if(l=A,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:ti(9,l)}}catch(N){K(l,l.return,N)}if(l===s){A=null;break e}var w=l.sibling;if(w!==null){w.return=l.return,A=w;break e}A=l.return}}if(F=r,Et(),qe&&typeof qe.onPostCommitFiberRoot=="function")try{qe.onPostCommitFiberRoot(Kr,e)}catch{}a=!0}return a}finally{M=n,je.transition=t}}return!1}function ru(e,t,n){t=Sn(n,t),t=dd(e,t,1),e=wt(e,t,1),t=de(),e!==null&&(Aa(e,1,t),xe(e,t))}function K(e,t,n){if(e.tag===3)ru(e,e,n);else for(;t!==null;){if(t.tag===3){ru(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(bt===null||!bt.has(a))){e=Sn(n,e),e=hd(t,e,1),t=wt(t,e,1),e=de(),t!==null&&(Aa(t,1,e),xe(t,e));break}}t=t.return}}function Ef(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),t=de(),e.pingedLanes|=e.suspendedLanes&n,te===e&&(ae&n)===n&&(J===4||J===3&&(ae&130023424)===ae&&500>G()-Fs?Ut(e,0):Ds|=n),xe(e,t)}function Pd(e,t){t===0&&(e.mode&1?(t=Ha,Ha<<=1,!(Ha&130023424)&&(Ha=4194304)):t=1);var n=de();e=ot(e,t),e!==null&&(Aa(e,t,n),xe(e,n))}function jf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Pd(e,n)}function If(e,t){var n=0;switch(e.tag){case 13:var a=e.stateNode,r=e.memoizedState;r!==null&&(n=r.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(S(314))}a!==null&&a.delete(t),Pd(e,n)}var Ld;Ld=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ye.current)pe=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return pe=!1,xf(e,t,n);pe=!!(e.flags&131072)}else pe=!1,B&&t.flags&1048576&&Mc(t,Ir,t.index);switch(t.lanes=0,t.tag){case 2:var a=t.type;cr(e,t),e=t.pendingProps;var r=vn(t,ue.current);fn(t,n),r=Rs(null,t,a,e,r,n);var i=Es();return t.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ge(a)?(i=!0,Er(t)):i=!1,t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Ss(t),r.updater=ei,t.stateNode=r,r._reactInternals=t,Ao(t,a,e,n),t=jo(null,t,a,!0,i,n)):(t.tag=0,B&&i&&ys(t),ce(null,t,r,n),t=t.child),t;case 16:a=t.elementType;e:{switch(cr(e,t),e=t.pendingProps,r=a._init,a=r(a._payload),t.type=a,r=t.tag=Lf(a),e=Fe(a,e),r){case 0:t=Eo(null,t,a,e,n);break e;case 1:t=ql(null,t,a,e,n);break e;case 11:t=Yl(null,t,a,e,n);break e;case 14:t=Kl(null,t,a,Fe(a.type,e),n);break e}throw Error(S(306,a,""))}return t;case 0:return a=t.type,r=t.pendingProps,r=t.elementType===a?r:Fe(a,r),Eo(e,t,a,r,n);case 1:return a=t.type,r=t.pendingProps,r=t.elementType===a?r:Fe(a,r),ql(e,t,a,r,n);case 3:e:{if(yd(t),e===null)throw Error(S(387));a=t.pendingProps,i=t.memoizedState,r=i.element,zc(e,t),Dr(t,a,null,n);var s=t.memoizedState;if(a=s.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){r=Sn(Error(S(423)),t),t=Gl(e,t,a,n,r);break e}else if(a!==r){r=Sn(Error(S(424)),t),t=Gl(e,t,a,n,r);break e}else for(Te=Tt(t.stateNode.containerInfo.firstChild),we=t,B=!0,Me=null,n=Bc(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Tn(),a===r){t=st(e,t,n);break e}ce(e,t,a,n)}t=t.child}return t;case 5:return $c(t),e===null&&No(t),a=t.type,r=t.pendingProps,i=e!==null?e.memoizedProps:null,s=r.children,vo(a,r)?s=null:i!==null&&vo(a,i)&&(t.flags|=32),pd(e,t),ce(e,t,s,n),t.child;case 6:return e===null&&No(t),null;case 13:return gd(e,t,n);case 4:return Ns(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=wn(t,null,a,n):ce(e,t,a,n),t.child;case 11:return a=t.type,r=t.pendingProps,r=t.elementType===a?r:Fe(a,r),Yl(e,t,a,r,n);case 7:return ce(e,t,t.pendingProps,n),t.child;case 8:return ce(e,t,t.pendingProps.children,n),t.child;case 12:return ce(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(a=t.type._context,r=t.pendingProps,i=t.memoizedProps,s=r.value,_(Pr,a._currentValue),a._currentValue=s,i!==null)if(Be(i.value,s)){if(i.children===r.children&&!ye.current){t=st(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var l=i.dependencies;if(l!==null){s=i.child;for(var u=l.firstContext;u!==null;){if(u.context===a){if(i.tag===1){u=nt(-1,n&-n),u.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?u.next=u:(u.next=f.next,f.next=u),c.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),ko(i.return,n,t),l.lanes|=n;break}u=u.next}}else if(i.tag===10)s=i.type===t.type?null:i.child;else if(i.tag===18){if(s=i.return,s===null)throw Error(S(341));s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),ko(s,n,t),s=i.sibling}else s=i.child;if(s!==null)s.return=i;else for(s=i;s!==null;){if(s===t){s=null;break}if(i=s.sibling,i!==null){i.return=s.return,s=i;break}s=s.return}i=s}ce(e,t,r.children,n),t=t.child}return t;case 9:return r=t.type,a=t.pendingProps.children,fn(t,n),r=Ie(r),a=a(r),t.flags|=1,ce(e,t,a,n),t.child;case 14:return a=t.type,r=Fe(a,t.pendingProps),r=Fe(a.type,r),Kl(e,t,a,r,n);case 15:return md(e,t,t.type,t.pendingProps,n);case 17:return a=t.type,r=t.pendingProps,r=t.elementType===a?r:Fe(a,r),cr(e,t),t.tag=1,ge(a)?(e=!0,Er(t)):e=!1,fn(t,n),cd(t,a,r),Ao(t,a,r,n),jo(null,t,a,!0,e,n);case 19:return xd(e,t,n);case 22:return fd(e,t,n)}throw Error(S(156,t.tag))};function Dd(e,t){return sc(e,t)}function Pf(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ee(e,t,n,a){return new Pf(e,t,n,a)}function Us(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Lf(e){if(typeof e=="function")return Us(e)?1:0;if(e!=null){if(e=e.$$typeof,e===rs)return 11;if(e===is)return 14}return 2}function Nt(e,t){var n=e.alternate;return n===null?(n=Ee(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function mr(e,t,n,a,r,i){var s=2;if(a=e,typeof e=="function")Us(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case Jt:return Ht(n.children,r,i,t);case as:s=8,r|=8;break;case Qi:return e=Ee(12,n,t,r|2),e.elementType=Qi,e.lanes=i,e;case Xi:return e=Ee(13,n,t,r),e.elementType=Xi,e.lanes=i,e;case Ji:return e=Ee(19,n,t,r),e.elementType=Ji,e.lanes=i,e;case $u:return ai(n,r,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Wu:s=10;break e;case zu:s=9;break e;case rs:s=11;break e;case is:s=14;break e;case dt:s=16,a=null;break e}throw Error(S(130,e==null?e:typeof e,""))}return t=Ee(s,n,t,r),t.elementType=e,t.type=a,t.lanes=i,t}function Ht(e,t,n,a){return e=Ee(7,e,a,t),e.lanes=n,e}function ai(e,t,n,a){return e=Ee(22,e,a,t),e.elementType=$u,e.lanes=n,e.stateNode={isHidden:!1},e}function _i(e,t,n){return e=Ee(6,e,null,t),e.lanes=n,e}function Ui(e,t,n){return t=Ee(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Df(e,t,n,a,r){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=vi(0),this.expirationTimes=vi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=vi(0),this.identifierPrefix=a,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Hs(e,t,n,a,r,i,s,l,u){return e=new Df(e,t,n,l,u),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Ee(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:a,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ss(i),e}function Ff(e,t,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Xt,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}function Fd(e){if(!e)return Ct;e=e._reactInternals;e:{if(Kt(e)!==e||e.tag!==1)throw Error(S(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ge(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(S(171))}if(e.tag===1){var n=e.type;if(ge(n))return Fc(e,n,t)}return t}function Od(e,t,n,a,r,i,s,l,u){return e=Hs(n,a,!0,e,r,i,s,l,u),e.context=Fd(null),n=e.current,a=de(),r=St(n),i=nt(a,r),i.callback=t??null,wt(n,i,r),e.current.lanes=r,Aa(e,r,a),xe(e,a),e}function ri(e,t,n,a){var r=t.current,i=de(),s=St(r);return n=Fd(n),t.context===null?t.context=n:t.pendingContext=n,t=nt(i,s),t.payload={element:e},a=a===void 0?null:a,a!==null&&(t.callback=a),e=wt(r,t,s),e!==null&&(He(e,r,s,i),sr(e,r,s)),s}function Wr(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function iu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Bs(e,t){iu(e,t),(e=e.alternate)&&iu(e,t)}function Of(){return null}var Md=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ws(e){this._internalRoot=e}ii.prototype.render=Ws.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(S(409));ri(e,t,null,null)};ii.prototype.unmount=Ws.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Vt(function(){ri(null,e,null,null)}),t[it]=null}};function ii(e){this._internalRoot=e}ii.prototype.unstable_scheduleHydration=function(e){if(e){var t=fc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<mt.length&&t!==0&&t<mt[n].priority;n++);mt.splice(n,0,e),n===0&&yc(e)}};function zs(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function oi(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ou(){}function Mf(e,t,n,a,r){if(r){if(typeof a=="function"){var i=a;a=function(){var c=Wr(s);i.call(c)}}var s=Od(t,a,e,0,null,!1,!1,"",ou);return e._reactRootContainer=s,e[it]=s.current,pa(e.nodeType===8?e.parentNode:e),Vt(),s}for(;r=e.lastChild;)e.removeChild(r);if(typeof a=="function"){var l=a;a=function(){var c=Wr(u);l.call(c)}}var u=Hs(e,0,!1,null,null,!1,!1,"",ou);return e._reactRootContainer=u,e[it]=u.current,pa(e.nodeType===8?e.parentNode:e),Vt(function(){ri(t,u,n,a)}),u}function si(e,t,n,a,r){var i=n._reactRootContainer;if(i){var s=i;if(typeof r=="function"){var l=r;r=function(){var u=Wr(s);l.call(u)}}ri(t,s,e,r)}else s=Mf(n,t,e,r,a);return Wr(s)}hc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Gn(t.pendingLanes);n!==0&&(ls(t,n|1),xe(t,G()),!(F&6)&&(Nn=G()+500,Et()))}break;case 13:Vt(function(){var a=ot(e,1);if(a!==null){var r=de();He(a,e,1,r)}}),Bs(e,1)}};us=function(e){if(e.tag===13){var t=ot(e,134217728);if(t!==null){var n=de();He(t,e,134217728,n)}Bs(e,134217728)}};mc=function(e){if(e.tag===13){var t=St(e),n=ot(e,t);if(n!==null){var a=de();He(n,e,t,a)}Bs(e,t)}};fc=function(){return M};pc=function(e,t){var n=M;try{return M=e,t()}finally{M=n}};lo=function(e,t,n){switch(t){case"input":if(to(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var r=Xr(a);if(!r)throw Error(S(90));Yu(a),to(a,r)}}}break;case"textarea":qu(e,n);break;case"select":t=n.value,t!=null&&cn(e,!!n.multiple,t,!1)}};tc=Os;nc=Vt;var _f={usingClientEntryPoint:!1,Events:[Ea,nn,Xr,Zu,ec,Os]},Wn={findFiberByHostInstance:Ft,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Uf={bundleType:Wn.bundleType,version:Wn.version,rendererPackageName:Wn.rendererPackageName,rendererConfig:Wn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ut.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=ic(e),e===null?null:e.stateNode},findFiberByHostInstance:Wn.findFiberByHostInstance||Of,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Xa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Xa.isDisabled&&Xa.supportsFiber)try{Kr=Xa.inject(Uf),qe=Xa}catch{}}Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=_f;Se.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!zs(t))throw Error(S(200));return Ff(e,t,null,n)};Se.createRoot=function(e,t){if(!zs(e))throw Error(S(299));var n=!1,a="",r=Md;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=Hs(e,1,!1,null,null,n,!1,a,r),e[it]=t.current,pa(e.nodeType===8?e.parentNode:e),new Ws(t)};Se.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(S(188)):(e=Object.keys(e).join(","),Error(S(268,e)));return e=ic(t),e=e===null?null:e.stateNode,e};Se.flushSync=function(e){return Vt(e)};Se.hydrate=function(e,t,n){if(!oi(t))throw Error(S(200));return si(null,e,t,!0,n)};Se.hydrateRoot=function(e,t,n){if(!zs(e))throw Error(S(405));var a=n!=null&&n.hydratedSources||null,r=!1,i="",s=Md;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=Od(t,null,e,1,n??null,r,!1,i,s),e[it]=t.current,pa(e),a)for(e=0;e<a.length;e++)n=a[e],r=n._getVersion,r=r(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,r]:t.mutableSourceEagerHydrationData.push(n,r);return new ii(t)};Se.render=function(e,t,n){if(!oi(t))throw Error(S(200));return si(null,e,t,!1,n)};Se.unmountComponentAtNode=function(e){if(!oi(e))throw Error(S(40));return e._reactRootContainer?(Vt(function(){si(null,null,e,!1,function(){e._reactRootContainer=null,e[it]=null})}),!0):!1};Se.unstable_batchedUpdates=Os;Se.unstable_renderSubtreeIntoContainer=function(e,t,n,a){if(!oi(n))throw Error(S(200));if(e==null||e._reactInternals===void 0)throw Error(S(38));return si(e,t,n,!1,a)};Se.version="18.3.1-next-f1338f8080-20240426";function _d(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_d)}catch(e){console.error(e)}}_d(),_u.exports=Se;var Hf=_u.exports,su=Hf;xr.createRoot=su.createRoot,xr.hydrateRoot=su.hydrateRoot;/**
 * react-router v7.13.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var lu="popstate";function Bf(e={}){function t(a,r){let{pathname:i,search:s,hash:l}=a.location;return Wo("",{pathname:i,search:s,hash:l},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(a,r){return typeof r=="string"?r:Na(r)}return zf(t,n,null,e)}function z(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Le(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Wf(){return Math.random().toString(36).substring(2,10)}function uu(e,t){return{usr:e.state,key:e.key,idx:t}}function Wo(e,t,n=null,a){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?jn(t):t,state:n,key:t&&t.key||a||Wf()}}function Na({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function jn(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substring(a),e=e.substring(0,a)),e&&(t.pathname=e)}return t}function zf(e,t,n,a={}){let{window:r=document.defaultView,v5Compat:i=!1}=a,s=r.history,l="POP",u=null,c=f();c==null&&(c=0,s.replaceState({...s.state,idx:c},""));function f(){return(s.state||{idx:null}).idx}function d(){l="POP";let b=f(),m=b==null?null:b-c;c=b,u&&u({action:l,location:T.location,delta:m})}function y(b,m){l="PUSH";let h=Wo(T.location,b,m);c=f()+1;let p=uu(h,c),w=T.createHref(h);try{s.pushState(p,"",w)}catch(N){if(N instanceof DOMException&&N.name==="DataCloneError")throw N;r.location.assign(w)}i&&u&&u({action:l,location:T.location,delta:1})}function g(b,m){l="REPLACE";let h=Wo(T.location,b,m);c=f();let p=uu(h,c),w=T.createHref(h);s.replaceState(p,"",w),i&&u&&u({action:l,location:T.location,delta:0})}function v(b){return $f(b)}let T={get action(){return l},get location(){return e(r,s)},listen(b){if(u)throw new Error("A history only accepts one active listener");return r.addEventListener(lu,d),u=b,()=>{r.removeEventListener(lu,d),u=null}},createHref(b){return t(r,b)},createURL:v,encodeLocation(b){let m=v(b);return{pathname:m.pathname,search:m.search,hash:m.hash}},push:y,replace:g,go(b){return s.go(b)}};return T}function $f(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),z(n,"No window.location.(origin|href) available to create URL");let a=typeof e=="string"?e:Na(e);return a=a.replace(/ $/,"%20"),!t&&a.startsWith("//")&&(a=n+a),new URL(a,n)}function Ud(e,t,n="/"){return Vf(e,t,n,!1)}function Vf(e,t,n,a){let r=typeof t=="string"?jn(t):t,i=lt(r.pathname||"/",n);if(i==null)return null;let s=Hd(e);Yf(s);let l=null;for(let u=0;l==null&&u<s.length;++u){let c=ap(i);l=tp(s[u],c,a)}return l}function Hd(e,t=[],n=[],a="",r=!1){let i=(s,l,u=r,c)=>{let f={relativePath:c===void 0?s.path||"":c,caseSensitive:s.caseSensitive===!0,childrenIndex:l,route:s};if(f.relativePath.startsWith("/")){if(!f.relativePath.startsWith(a)&&u)return;z(f.relativePath.startsWith(a),`Absolute route path "${f.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),f.relativePath=f.relativePath.slice(a.length)}let d=at([a,f.relativePath]),y=n.concat(f);s.children&&s.children.length>0&&(z(s.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),Hd(s.children,t,y,d,u)),!(s.path==null&&!s.index)&&t.push({path:d,score:Zf(d,s.index),routesMeta:y})};return e.forEach((s,l)=>{var u;if(s.path===""||!((u=s.path)!=null&&u.includes("?")))i(s,l);else for(let c of Bd(s.path))i(s,l,!0,c)}),t}function Bd(e){let t=e.split("/");if(t.length===0)return[];let[n,...a]=t,r=n.endsWith("?"),i=n.replace(/\?$/,"");if(a.length===0)return r?[i,""]:[i];let s=Bd(a.join("/")),l=[];return l.push(...s.map(u=>u===""?i:[i,u].join("/"))),r&&l.push(...s),l.map(u=>e.startsWith("/")&&u===""?"/":u)}function Yf(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:ep(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}var Kf=/^:[\w-]+$/,qf=3,Gf=2,Qf=1,Xf=10,Jf=-2,cu=e=>e==="*";function Zf(e,t){let n=e.split("/"),a=n.length;return n.some(cu)&&(a+=Jf),t&&(a+=Gf),n.filter(r=>!cu(r)).reduce((r,i)=>r+(Kf.test(i)?qf:i===""?Qf:Xf),a)}function ep(e,t){return e.length===t.length&&e.slice(0,-1).every((a,r)=>a===t[r])?e[e.length-1]-t[t.length-1]:0}function tp(e,t,n=!1){let{routesMeta:a}=e,r={},i="/",s=[];for(let l=0;l<a.length;++l){let u=a[l],c=l===a.length-1,f=i==="/"?t:t.slice(i.length)||"/",d=zr({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},f),y=u.route;if(!d&&c&&n&&!a[a.length-1].route.index&&(d=zr({path:u.relativePath,caseSensitive:u.caseSensitive,end:!1},f)),!d)return null;Object.assign(r,d.params),s.push({params:r,pathname:at([i,d.pathname]),pathnameBase:sp(at([i,d.pathnameBase])),route:y}),d.pathnameBase!=="/"&&(i=at([i,d.pathnameBase]))}return s}function zr(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=np(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let i=r[0],s=i.replace(/(.)\/+$/,"$1"),l=r.slice(1);return{params:a.reduce((c,{paramName:f,isOptional:d},y)=>{if(f==="*"){let v=l[y]||"";s=i.slice(0,i.length-v.length).replace(/(.)\/+$/,"$1")}const g=l[y];return d&&!g?c[f]=void 0:c[f]=(g||"").replace(/%2F/g,"/"),c},{}),pathname:i,pathnameBase:s,pattern:e}}function np(e,t=!1,n=!0){Le(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let a=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(s,l,u)=>(a.push({paramName:l,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(a.push({paramName:"*"}),r+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":e!==""&&e!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,t?void 0:"i"),a]}function ap(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Le(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function lt(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&a!=="/"?null:e.slice(n)||"/"}var rp=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function ip(e,t="/"){let{pathname:n,search:a="",hash:r=""}=typeof e=="string"?jn(e):e,i;return n?(n=n.replace(/\/\/+/g,"/"),n.startsWith("/")?i=du(n.substring(1),"/"):i=du(n,t)):i=t,{pathname:i,search:lp(a),hash:up(r)}}function du(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function Hi(e,t,n,a){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function op(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function $s(e){let t=op(e);return t.map((n,a)=>a===t.length-1?n.pathname:n.pathnameBase)}function Vs(e,t,n,a=!1){let r;typeof e=="string"?r=jn(e):(r={...e},z(!r.pathname||!r.pathname.includes("?"),Hi("?","pathname","search",r)),z(!r.pathname||!r.pathname.includes("#"),Hi("#","pathname","hash",r)),z(!r.search||!r.search.includes("#"),Hi("#","search","hash",r)));let i=e===""||r.pathname==="",s=i?"/":r.pathname,l;if(s==null)l=n;else{let d=t.length-1;if(!a&&s.startsWith("..")){let y=s.split("/");for(;y[0]==="..";)y.shift(),d-=1;r.pathname=y.join("/")}l=d>=0?t[d]:"/"}let u=ip(r,l),c=s&&s!=="/"&&s.endsWith("/"),f=(i||s===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||f)&&(u.pathname+="/"),u}var at=e=>e.join("/").replace(/\/\/+/g,"/"),sp=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),lp=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,up=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,cp=class{constructor(e,t,n,a=!1){this.status=e,this.statusText=t||"",this.internal=a,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function dp(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function hp(e){return e.map(t=>t.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Wd=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function zd(e,t){let n=e;if(typeof n!="string"||!rp.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let a=n,r=!1;if(Wd)try{let i=new URL(window.location.href),s=n.startsWith("//")?new URL(i.protocol+n):new URL(n),l=lt(s.pathname,t);s.origin===i.origin&&l!=null?n=l+s.search+s.hash:r=!0}catch{Le(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:a,isExternal:r,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var $d=["POST","PUT","PATCH","DELETE"];new Set($d);var mp=["GET",...$d];new Set(mp);var In=x.createContext(null);In.displayName="DataRouter";var li=x.createContext(null);li.displayName="DataRouterState";var fp=x.createContext(!1),Vd=x.createContext({isTransitioning:!1});Vd.displayName="ViewTransition";var pp=x.createContext(new Map);pp.displayName="Fetchers";var yp=x.createContext(null);yp.displayName="Await";var ke=x.createContext(null);ke.displayName="Navigation";var Ia=x.createContext(null);Ia.displayName="Location";var We=x.createContext({outlet:null,matches:[],isDataRoute:!1});We.displayName="Route";var Ys=x.createContext(null);Ys.displayName="RouteError";var Yd="REACT_ROUTER_ERROR",gp="REDIRECT",xp="ROUTE_ERROR_RESPONSE";function vp(e){if(e.startsWith(`${Yd}:${gp}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function Tp(e){if(e.startsWith(`${Yd}:${xp}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new cp(t.status,t.statusText,t.data)}catch{}}function wp(e,{relative:t}={}){z(Pn(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:a}=x.useContext(ke),{hash:r,pathname:i,search:s}=Pa(e,{relative:t}),l=i;return n!=="/"&&(l=i==="/"?n:at([n,i])),a.createHref({pathname:l,search:s,hash:r})}function Pn(){return x.useContext(Ia)!=null}function ze(){return z(Pn(),"useLocation() may be used only in the context of a <Router> component."),x.useContext(Ia).location}var Kd="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function qd(e){x.useContext(ke).static||x.useLayoutEffect(e)}function ui(){let{isDataRoute:e}=x.useContext(We);return e?Fp():bp()}function bp(){z(Pn(),"useNavigate() may be used only in the context of a <Router> component.");let e=x.useContext(In),{basename:t,navigator:n}=x.useContext(ke),{matches:a}=x.useContext(We),{pathname:r}=ze(),i=JSON.stringify($s(a)),s=x.useRef(!1);return qd(()=>{s.current=!0}),x.useCallback((u,c={})=>{if(Le(s.current,Kd),!s.current)return;if(typeof u=="number"){n.go(u);return}let f=Vs(u,JSON.parse(i),r,c.relative==="path");e==null&&t!=="/"&&(f.pathname=f.pathname==="/"?t:at([t,f.pathname])),(c.replace?n.replace:n.push)(f,c.state,c)},[t,n,i,r,e])}x.createContext(null);function Sp(){let{matches:e}=x.useContext(We),t=e[e.length-1];return t?t.params:{}}function Pa(e,{relative:t}={}){let{matches:n}=x.useContext(We),{pathname:a}=ze(),r=JSON.stringify($s(n));return x.useMemo(()=>Vs(e,JSON.parse(r),a,t==="path"),[e,r,a,t])}function Np(e,t){return Gd(e,t)}function Gd(e,t,n,a,r){var h;z(Pn(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:i}=x.useContext(ke),{matches:s}=x.useContext(We),l=s[s.length-1],u=l?l.params:{},c=l?l.pathname:"/",f=l?l.pathnameBase:"/",d=l&&l.route;{let p=d&&d.path||"";Xd(c,!d||p.endsWith("*")||p.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${p}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${p}"> to <Route path="${p==="/"?"*":`${p}/*`}">.`)}let y=ze(),g;if(t){let p=typeof t=="string"?jn(t):t;z(f==="/"||((h=p.pathname)==null?void 0:h.startsWith(f)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${f}" but pathname "${p.pathname}" was given in the \`location\` prop.`),g=p}else g=y;let v=g.pathname||"/",T=v;if(f!=="/"){let p=f.replace(/^\//,"").split("/");T="/"+v.replace(/^\//,"").split("/").slice(p.length).join("/")}let b=Ud(e,{pathname:T});Le(d||b!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),Le(b==null||b[b.length-1].route.element!==void 0||b[b.length-1].route.Component!==void 0||b[b.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let m=Ep(b&&b.map(p=>Object.assign({},p,{params:Object.assign({},u,p.params),pathname:at([f,i.encodeLocation?i.encodeLocation(p.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:p.pathname]),pathnameBase:p.pathnameBase==="/"?f:at([f,i.encodeLocation?i.encodeLocation(p.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:p.pathnameBase])})),s,n,a,r);return t&&m?x.createElement(Ia.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},m):m}function kp(){let e=Dp(),t=dp(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",r={padding:"0.5rem",backgroundColor:a},i={padding:"2px 4px",backgroundColor:a},s=null;return console.error("Error handled by React Router default ErrorBoundary:",e),s=x.createElement(x.Fragment,null,x.createElement("p",null,"💿 Hey developer 👋"),x.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",x.createElement("code",{style:i},"ErrorBoundary")," or"," ",x.createElement("code",{style:i},"errorElement")," prop on your route.")),x.createElement(x.Fragment,null,x.createElement("h2",null,"Unexpected Application Error!"),x.createElement("h3",{style:{fontStyle:"italic"}},t),n?x.createElement("pre",{style:r},n):null,s)}var Cp=x.createElement(kp,null),Qd=class extends x.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=Tp(e.digest);n&&(e=n)}let t=e!==void 0?x.createElement(We.Provider,{value:this.props.routeContext},x.createElement(Ys.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?x.createElement(Ap,{error:e},t):t}};Qd.contextType=fp;var Bi=new WeakMap;function Ap({children:e,error:t}){let{basename:n}=x.useContext(ke);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let a=vp(t.digest);if(a){let r=Bi.get(t);if(r)throw r;let i=zd(a.location,n);if(Wd&&!Bi.get(t))if(i.isExternal||a.reloadDocument)window.location.href=i.absoluteURL||i.to;else{const s=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:a.replace}));throw Bi.set(t,s),s}return x.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return e}function Rp({routeContext:e,match:t,children:n}){let a=x.useContext(In);return a&&a.static&&a.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=t.route.id),x.createElement(We.Provider,{value:e},n)}function Ep(e,t=[],n=null,a=null,r=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let i=e,s=n==null?void 0:n.errors;if(s!=null){let f=i.findIndex(d=>d.route.id&&(s==null?void 0:s[d.route.id])!==void 0);z(f>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(s).join(",")}`),i=i.slice(0,Math.min(i.length,f+1))}let l=!1,u=-1;if(n)for(let f=0;f<i.length;f++){let d=i[f];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(u=f),d.route.id){let{loaderData:y,errors:g}=n,v=d.route.loader&&!y.hasOwnProperty(d.route.id)&&(!g||g[d.route.id]===void 0);if(d.route.lazy||v){l=!0,u>=0?i=i.slice(0,u+1):i=[i[0]];break}}}let c=n&&a?(f,d)=>{var y,g;a(f,{location:n.location,params:((g=(y=n.matches)==null?void 0:y[0])==null?void 0:g.params)??{},unstable_pattern:hp(n.matches),errorInfo:d})}:void 0;return i.reduceRight((f,d,y)=>{let g,v=!1,T=null,b=null;n&&(g=s&&d.route.id?s[d.route.id]:void 0,T=d.route.errorElement||Cp,l&&(u<0&&y===0?(Xd("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),v=!0,b=null):u===y&&(v=!0,b=d.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,y+1)),h=()=>{let p;return g?p=T:v?p=b:d.route.Component?p=x.createElement(d.route.Component,null):d.route.element?p=d.route.element:p=f,x.createElement(Rp,{match:d,routeContext:{outlet:f,matches:m,isDataRoute:n!=null},children:p})};return n&&(d.route.ErrorBoundary||d.route.errorElement||y===0)?x.createElement(Qd,{location:n.location,revalidation:n.revalidation,component:T,error:g,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:c}):h()},null)}function Ks(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function jp(e){let t=x.useContext(In);return z(t,Ks(e)),t}function Ip(e){let t=x.useContext(li);return z(t,Ks(e)),t}function Pp(e){let t=x.useContext(We);return z(t,Ks(e)),t}function qs(e){let t=Pp(e),n=t.matches[t.matches.length-1];return z(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Lp(){return qs("useRouteId")}function Dp(){var a;let e=x.useContext(Ys),t=Ip("useRouteError"),n=qs("useRouteError");return e!==void 0?e:(a=t.errors)==null?void 0:a[n]}function Fp(){let{router:e}=jp("useNavigate"),t=qs("useNavigate"),n=x.useRef(!1);return qd(()=>{n.current=!0}),x.useCallback(async(r,i={})=>{Le(n.current,Kd),n.current&&(typeof r=="number"?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var hu={};function Xd(e,t,n){!t&&!hu[e]&&(hu[e]=!0,Le(!1,n))}x.memo(Op);function Op({routes:e,future:t,state:n,onError:a}){return Gd(e,void 0,n,a,t)}function Mp({to:e,replace:t,state:n,relative:a}){z(Pn(),"<Navigate> may be used only in the context of a <Router> component.");let{static:r}=x.useContext(ke);Le(!r,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:i}=x.useContext(We),{pathname:s}=ze(),l=ui(),u=Vs(e,$s(i),s,a==="path"),c=JSON.stringify(u);return x.useEffect(()=>{l(JSON.parse(c),{replace:t,state:n,relative:a})},[l,c,a,t,n]),null}function Xe(e){z(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function _p({basename:e="/",children:t=null,location:n,navigationType:a="POP",navigator:r,static:i=!1,unstable_useTransitions:s}){z(!Pn(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let l=e.replace(/^\/*/,"/"),u=x.useMemo(()=>({basename:l,navigator:r,static:i,unstable_useTransitions:s,future:{}}),[l,r,i,s]);typeof n=="string"&&(n=jn(n));let{pathname:c="/",search:f="",hash:d="",state:y=null,key:g="default"}=n,v=x.useMemo(()=>{let T=lt(c,l);return T==null?null:{location:{pathname:T,search:f,hash:d,state:y,key:g},navigationType:a}},[l,c,f,d,y,g,a]);return Le(v!=null,`<Router basename="${l}"> is not able to match the URL "${c}${f}${d}" because it does not start with the basename, so the <Router> won't render anything.`),v==null?null:x.createElement(ke.Provider,{value:u},x.createElement(Ia.Provider,{children:t,value:v}))}function Up({children:e,location:t}){return Np(zo(e),t)}function zo(e,t=[]){let n=[];return x.Children.forEach(e,(a,r)=>{if(!x.isValidElement(a))return;let i=[...t,r];if(a.type===x.Fragment){n.push.apply(n,zo(a.props.children,i));return}z(a.type===Xe,`[${typeof a.type=="string"?a.type:a.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),z(!a.props.index||!a.props.children,"An index route cannot have child routes.");let s={id:a.props.id||i.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,middleware:a.props.middleware,loader:a.props.loader,action:a.props.action,hydrateFallbackElement:a.props.hydrateFallbackElement,HydrateFallback:a.props.HydrateFallback,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.hasErrorBoundary===!0||a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(s.children=zo(a.props.children,i)),n.push(s)}),n}var fr="get",pr="application/x-www-form-urlencoded";function ci(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function Hp(e){return ci(e)&&e.tagName.toLowerCase()==="button"}function Bp(e){return ci(e)&&e.tagName.toLowerCase()==="form"}function Wp(e){return ci(e)&&e.tagName.toLowerCase()==="input"}function zp(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function $p(e,t){return e.button===0&&(!t||t==="_self")&&!zp(e)}function $o(e=""){return new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let a=e[n];return t.concat(Array.isArray(a)?a.map(r=>[n,r]):[[n,a]])},[]))}function Vp(e,t){let n=$o(e);return t&&t.forEach((a,r)=>{n.has(r)||t.getAll(r).forEach(i=>{n.append(r,i)})}),n}var Ja=null;function Yp(){if(Ja===null)try{new FormData(document.createElement("form"),0),Ja=!1}catch{Ja=!0}return Ja}var Kp=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Wi(e){return e!=null&&!Kp.has(e)?(Le(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${pr}"`),null):e}function qp(e,t){let n,a,r,i,s;if(Bp(e)){let l=e.getAttribute("action");a=l?lt(l,t):null,n=e.getAttribute("method")||fr,r=Wi(e.getAttribute("enctype"))||pr,i=new FormData(e)}else if(Hp(e)||Wp(e)&&(e.type==="submit"||e.type==="image")){let l=e.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let u=e.getAttribute("formaction")||l.getAttribute("action");if(a=u?lt(u,t):null,n=e.getAttribute("formmethod")||l.getAttribute("method")||fr,r=Wi(e.getAttribute("formenctype"))||Wi(l.getAttribute("enctype"))||pr,i=new FormData(l,e),!Yp()){let{name:c,type:f,value:d}=e;if(f==="image"){let y=c?`${c}.`:"";i.append(`${y}x`,"0"),i.append(`${y}y`,"0")}else c&&i.append(c,d)}}else{if(ci(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=fr,a=null,r=pr,s=e}return i&&r==="text/plain"&&(s=i,i=void 0),{action:a,method:n.toLowerCase(),encType:r,formData:i,body:s}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Gs(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Gp(e,t,n,a){let r=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?r.pathname.endsWith("/")?r.pathname=`${r.pathname}_.${a}`:r.pathname=`${r.pathname}.${a}`:r.pathname==="/"?r.pathname=`_root.${a}`:t&&lt(r.pathname,t)==="/"?r.pathname=`${t.replace(/\/$/,"")}/_root.${a}`:r.pathname=`${r.pathname.replace(/\/$/,"")}.${a}`,r}async function Qp(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Xp(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function Jp(e,t,n){let a=await Promise.all(e.map(async r=>{let i=t.routes[r.route.id];if(i){let s=await Qp(i,n);return s.links?s.links():[]}return[]}));return ny(a.flat(1).filter(Xp).filter(r=>r.rel==="stylesheet"||r.rel==="preload").map(r=>r.rel==="stylesheet"?{...r,rel:"prefetch",as:"style"}:{...r,rel:"prefetch"}))}function mu(e,t,n,a,r,i){let s=(u,c)=>n[c]?u.route.id!==n[c].route.id:!0,l=(u,c)=>{var f;return n[c].pathname!==u.pathname||((f=n[c].route.path)==null?void 0:f.endsWith("*"))&&n[c].params["*"]!==u.params["*"]};return i==="assets"?t.filter((u,c)=>s(u,c)||l(u,c)):i==="data"?t.filter((u,c)=>{var d;let f=a.routes[u.route.id];if(!f||!f.hasLoader)return!1;if(s(u,c)||l(u,c))return!0;if(u.route.shouldRevalidate){let y=u.route.shouldRevalidate({currentUrl:new URL(r.pathname+r.search+r.hash,window.origin),currentParams:((d=n[0])==null?void 0:d.params)||{},nextUrl:new URL(e,window.origin),nextParams:u.params,defaultShouldRevalidate:!0});if(typeof y=="boolean")return y}return!0}):[]}function Zp(e,t,{includeHydrateFallback:n}={}){return ey(e.map(a=>{let r=t.routes[a.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function ey(e){return[...new Set(e)]}function ty(e){let t={},n=Object.keys(e).sort();for(let a of n)t[a]=e[a];return t}function ny(e,t){let n=new Set;return new Set(t),e.reduce((a,r)=>{let i=JSON.stringify(ty(r));return n.has(i)||(n.add(i),a.push({key:i,link:r})),a},[])}function Jd(){let e=x.useContext(In);return Gs(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function ay(){let e=x.useContext(li);return Gs(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Qs=x.createContext(void 0);Qs.displayName="FrameworkContext";function Zd(){let e=x.useContext(Qs);return Gs(e,"You must render this element inside a <HydratedRouter> element"),e}function ry(e,t){let n=x.useContext(Qs),[a,r]=x.useState(!1),[i,s]=x.useState(!1),{onFocus:l,onBlur:u,onMouseEnter:c,onMouseLeave:f,onTouchStart:d}=t,y=x.useRef(null);x.useEffect(()=>{if(e==="render"&&s(!0),e==="viewport"){let T=m=>{m.forEach(h=>{s(h.isIntersecting)})},b=new IntersectionObserver(T,{threshold:.5});return y.current&&b.observe(y.current),()=>{b.disconnect()}}},[e]),x.useEffect(()=>{if(a){let T=setTimeout(()=>{s(!0)},100);return()=>{clearTimeout(T)}}},[a]);let g=()=>{r(!0)},v=()=>{r(!1),s(!1)};return n?e!=="intent"?[i,y,{}]:[i,y,{onFocus:zn(l,g),onBlur:zn(u,v),onMouseEnter:zn(c,g),onMouseLeave:zn(f,v),onTouchStart:zn(d,g)}]:[!1,y,{}]}function zn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function iy({page:e,...t}){let{router:n}=Jd(),a=x.useMemo(()=>Ud(n.routes,e,n.basename),[n.routes,e,n.basename]);return a?x.createElement(sy,{page:e,matches:a,...t}):null}function oy(e){let{manifest:t,routeModules:n}=Zd(),[a,r]=x.useState([]);return x.useEffect(()=>{let i=!1;return Jp(e,t,n).then(s=>{i||r(s)}),()=>{i=!0}},[e,t,n]),a}function sy({page:e,matches:t,...n}){let a=ze(),{future:r,manifest:i,routeModules:s}=Zd(),{basename:l}=Jd(),{loaderData:u,matches:c}=ay(),f=x.useMemo(()=>mu(e,t,c,i,a,"data"),[e,t,c,i,a]),d=x.useMemo(()=>mu(e,t,c,i,a,"assets"),[e,t,c,i,a]),y=x.useMemo(()=>{if(e===a.pathname+a.search+a.hash)return[];let T=new Set,b=!1;if(t.forEach(h=>{var w;let p=i.routes[h.route.id];!p||!p.hasLoader||(!f.some(N=>N.route.id===h.route.id)&&h.route.id in u&&((w=s[h.route.id])!=null&&w.shouldRevalidate)||p.hasClientLoader?b=!0:T.add(h.route.id))}),T.size===0)return[];let m=Gp(e,l,r.unstable_trailingSlashAwareDataRequests,"data");return b&&T.size>0&&m.searchParams.set("_routes",t.filter(h=>T.has(h.route.id)).map(h=>h.route.id).join(",")),[m.pathname+m.search]},[l,r.unstable_trailingSlashAwareDataRequests,u,a,i,f,t,e,s]),g=x.useMemo(()=>Zp(d,i),[d,i]),v=oy(d);return x.createElement(x.Fragment,null,y.map(T=>x.createElement("link",{key:T,rel:"prefetch",as:"fetch",href:T,...n})),g.map(T=>x.createElement("link",{key:T,rel:"modulepreload",href:T,...n})),v.map(({key:T,link:b})=>x.createElement("link",{key:T,nonce:n.nonce,...b,crossOrigin:b.crossOrigin??n.crossOrigin})))}function ly(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var uy=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{uy&&(window.__reactRouterVersion="7.13.0")}catch{}function cy({basename:e,children:t,unstable_useTransitions:n,window:a}){let r=x.useRef();r.current==null&&(r.current=Bf({window:a,v5Compat:!0}));let i=r.current,[s,l]=x.useState({action:i.action,location:i.location}),u=x.useCallback(c=>{n===!1?l(c):x.startTransition(()=>l(c))},[n]);return x.useLayoutEffect(()=>i.listen(u),[i,u]),x.createElement(_p,{basename:e,children:t,location:s.location,navigationType:s.action,navigator:i,unstable_useTransitions:n})}var eh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,W=x.forwardRef(function({onClick:t,discover:n="render",prefetch:a="none",relative:r,reloadDocument:i,replace:s,state:l,target:u,to:c,preventScrollReset:f,viewTransition:d,unstable_defaultShouldRevalidate:y,...g},v){let{basename:T,unstable_useTransitions:b}=x.useContext(ke),m=typeof c=="string"&&eh.test(c),h=zd(c,T);c=h.to;let p=wp(c,{relative:r}),[w,N,k]=ry(a,g),C=fy(c,{replace:s,state:l,target:u,preventScrollReset:f,relative:r,viewTransition:d,unstable_defaultShouldRevalidate:y,unstable_useTransitions:b});function E(I){t&&t(I),I.defaultPrevented||C(I)}let O=x.createElement("a",{...g,...k,href:h.absoluteURL||p,onClick:h.isExternal||i?t:E,ref:ly(v,N),target:u,"data-discover":!m&&n==="render"?"true":void 0});return w&&!m?x.createElement(x.Fragment,null,O,x.createElement(iy,{page:p})):O});W.displayName="Link";var dy=x.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:a="",end:r=!1,style:i,to:s,viewTransition:l,children:u,...c},f){let d=Pa(s,{relative:c.relative}),y=ze(),g=x.useContext(li),{navigator:v,basename:T}=x.useContext(ke),b=g!=null&&Ty(d)&&l===!0,m=v.encodeLocation?v.encodeLocation(d).pathname:d.pathname,h=y.pathname,p=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;n||(h=h.toLowerCase(),p=p?p.toLowerCase():null,m=m.toLowerCase()),p&&T&&(p=lt(p,T)||p);const w=m!=="/"&&m.endsWith("/")?m.length-1:m.length;let N=h===m||!r&&h.startsWith(m)&&h.charAt(w)==="/",k=p!=null&&(p===m||!r&&p.startsWith(m)&&p.charAt(m.length)==="/"),C={isActive:N,isPending:k,isTransitioning:b},E=N?t:void 0,O;typeof a=="function"?O=a(C):O=[a,N?"active":null,k?"pending":null,b?"transitioning":null].filter(Boolean).join(" ");let I=typeof i=="function"?i(C):i;return x.createElement(W,{...c,"aria-current":E,className:O,ref:f,style:I,to:s,viewTransition:l},typeof u=="function"?u(C):u)});dy.displayName="NavLink";var hy=x.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:a,replace:r,state:i,method:s=fr,action:l,onSubmit:u,relative:c,preventScrollReset:f,viewTransition:d,unstable_defaultShouldRevalidate:y,...g},v)=>{let{unstable_useTransitions:T}=x.useContext(ke),b=xy(),m=vy(l,{relative:c}),h=s.toLowerCase()==="get"?"get":"post",p=typeof l=="string"&&eh.test(l),w=N=>{if(u&&u(N),N.defaultPrevented)return;N.preventDefault();let k=N.nativeEvent.submitter,C=(k==null?void 0:k.getAttribute("formmethod"))||s,E=()=>b(k||N.currentTarget,{fetcherKey:t,method:C,navigate:n,replace:r,state:i,relative:c,preventScrollReset:f,viewTransition:d,unstable_defaultShouldRevalidate:y});T&&n!==!1?x.startTransition(()=>E()):E()};return x.createElement("form",{ref:v,method:h,action:m,onSubmit:a?u:w,...g,"data-discover":!p&&e==="render"?"true":void 0})});hy.displayName="Form";function my(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function th(e){let t=x.useContext(In);return z(t,my(e)),t}function fy(e,{target:t,replace:n,state:a,preventScrollReset:r,relative:i,viewTransition:s,unstable_defaultShouldRevalidate:l,unstable_useTransitions:u}={}){let c=ui(),f=ze(),d=Pa(e,{relative:i});return x.useCallback(y=>{if($p(y,t)){y.preventDefault();let g=n!==void 0?n:Na(f)===Na(d),v=()=>c(e,{replace:g,state:a,preventScrollReset:r,relative:i,viewTransition:s,unstable_defaultShouldRevalidate:l});u?x.startTransition(()=>v()):v()}},[f,c,d,n,a,t,e,r,i,s,l,u])}function py(e){Le(typeof URLSearchParams<"u","You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=x.useRef($o(e)),n=x.useRef(!1),a=ze(),r=x.useMemo(()=>Vp(a.search,n.current?null:t.current),[a.search]),i=ui(),s=x.useCallback((l,u)=>{const c=$o(typeof l=="function"?l(new URLSearchParams(r)):l);n.current=!0,i("?"+c,u)},[i,r]);return[r,s]}var yy=0,gy=()=>`__${String(++yy)}__`;function xy(){let{router:e}=th("useSubmit"),{basename:t}=x.useContext(ke),n=Lp(),a=e.fetch,r=e.navigate;return x.useCallback(async(i,s={})=>{let{action:l,method:u,encType:c,formData:f,body:d}=qp(i,t);if(s.navigate===!1){let y=s.fetcherKey||gy();await a(y,n,s.action||l,{unstable_defaultShouldRevalidate:s.unstable_defaultShouldRevalidate,preventScrollReset:s.preventScrollReset,formData:f,body:d,formMethod:s.method||u,formEncType:s.encType||c,flushSync:s.flushSync})}else await r(s.action||l,{unstable_defaultShouldRevalidate:s.unstable_defaultShouldRevalidate,preventScrollReset:s.preventScrollReset,formData:f,body:d,formMethod:s.method||u,formEncType:s.encType||c,replace:s.replace,state:s.state,fromRouteId:n,flushSync:s.flushSync,viewTransition:s.viewTransition})},[a,r,t,n])}function vy(e,{relative:t}={}){let{basename:n}=x.useContext(ke),a=x.useContext(We);z(a,"useFormAction must be used inside a RouteContext");let[r]=a.matches.slice(-1),i={...Pa(e||".",{relative:t})},s=ze();if(e==null){i.search=s.search;let l=new URLSearchParams(i.search),u=l.getAll("index");if(u.some(f=>f==="")){l.delete("index"),u.filter(d=>d).forEach(d=>l.append("index",d));let f=l.toString();i.search=f?`?${f}`:""}}return(!e||e===".")&&r.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(i.pathname=i.pathname==="/"?n:at([n,i.pathname])),Na(i)}function Ty(e,{relative:t}={}){let n=x.useContext(Vd);z(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=th("useViewTransitionState"),r=Pa(e,{relative:t});if(!n.isTransitioning)return!1;let i=lt(n.currentLocation.pathname,a)||n.currentLocation.pathname,s=lt(n.nextLocation.pathname,a)||n.nextLocation.pathname;return zr(r.pathname,s)!=null||zr(r.pathname,i)!=null}var wy=typeof Element<"u",by=typeof Map=="function",Sy=typeof Set=="function",Ny=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function yr(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var n,a,r;if(Array.isArray(e)){if(n=e.length,n!=t.length)return!1;for(a=n;a--!==0;)if(!yr(e[a],t[a]))return!1;return!0}var i;if(by&&e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(i=e.entries();!(a=i.next()).done;)if(!t.has(a.value[0]))return!1;for(i=e.entries();!(a=i.next()).done;)if(!yr(a.value[1],t.get(a.value[0])))return!1;return!0}if(Sy&&e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(i=e.entries();!(a=i.next()).done;)if(!t.has(a.value[0]))return!1;return!0}if(Ny&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if(n=e.length,n!=t.length)return!1;for(a=n;a--!==0;)if(e[a]!==t[a])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf&&typeof e.valueOf=="function"&&typeof t.valueOf=="function")return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString&&typeof e.toString=="function"&&typeof t.toString=="function")return e.toString()===t.toString();if(r=Object.keys(e),n=r.length,n!==Object.keys(t).length)return!1;for(a=n;a--!==0;)if(!Object.prototype.hasOwnProperty.call(t,r[a]))return!1;if(wy&&e instanceof Element)return!1;for(a=n;a--!==0;)if(!((r[a]==="_owner"||r[a]==="__v"||r[a]==="__o")&&e.$$typeof)&&!yr(e[r[a]],t[r[a]]))return!1;return!0}return e!==e&&t!==t}var ky=function(t,n){try{return yr(t,n)}catch(a){if((a.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw a}};const Cy=Vr(ky);var Ay=function(e,t,n,a,r,i,s,l){if(!e){var u;if(t===void 0)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,a,r,i,s,l],f=0;u=new Error(t.replace(/%s/g,function(){return c[f++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}},Ry=Ay;const fu=Vr(Ry);var Ey=function(t,n,a,r){var i=a?a.call(r,t,n):void 0;if(i!==void 0)return!!i;if(t===n)return!0;if(typeof t!="object"||!t||typeof n!="object"||!n)return!1;var s=Object.keys(t),l=Object.keys(n);if(s.length!==l.length)return!1;for(var u=Object.prototype.hasOwnProperty.bind(n),c=0;c<s.length;c++){var f=s[c];if(!u(f))return!1;var d=t[f],y=n[f];if(i=a?a.call(r,d,y,f):void 0,i===!1||i===void 0&&d!==y)return!1}return!0};const jy=Vr(Ey);var nh=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(nh||{}),zi={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},pu=Object.values(nh),Xs={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},Iy=Object.entries(Xs).reduce((e,[t,n])=>(e[n]=t,e),{}),_e="data-rh",yn={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},gn=(e,t)=>{for(let n=e.length-1;n>=0;n-=1){const a=e[n];if(Object.prototype.hasOwnProperty.call(a,t))return a[t]}return null},Py=e=>{let t=gn(e,"title");const n=gn(e,yn.TITLE_TEMPLATE);if(Array.isArray(t)&&(t=t.join("")),n&&t)return n.replace(/%s/g,()=>t);const a=gn(e,yn.DEFAULT_TITLE);return t||a||void 0},Ly=e=>gn(e,yn.ON_CHANGE_CLIENT_STATE)||(()=>{}),$i=(e,t)=>t.filter(n=>typeof n[e]<"u").map(n=>n[e]).reduce((n,a)=>({...n,...a}),{}),Dy=(e,t)=>t.filter(n=>typeof n.base<"u").map(n=>n.base).reverse().reduce((n,a)=>{if(!n.length){const r=Object.keys(a);for(let i=0;i<r.length;i+=1){const l=r[i].toLowerCase();if(e.indexOf(l)!==-1&&a[l])return n.concat(a)}}return n},[]),Fy=e=>console&&typeof console.warn=="function"&&console.warn(e),$n=(e,t,n)=>{const a={};return n.filter(r=>Array.isArray(r[e])?!0:(typeof r[e]<"u"&&Fy(`Helmet: ${e} should be of type "Array". Instead found type "${typeof r[e]}"`),!1)).map(r=>r[e]).reverse().reduce((r,i)=>{const s={};i.filter(u=>{let c;const f=Object.keys(u);for(let y=0;y<f.length;y+=1){const g=f[y],v=g.toLowerCase();t.indexOf(v)!==-1&&!(c==="rel"&&u[c].toLowerCase()==="canonical")&&!(v==="rel"&&u[v].toLowerCase()==="stylesheet")&&(c=v),t.indexOf(g)!==-1&&(g==="innerHTML"||g==="cssText"||g==="itemprop")&&(c=g)}if(!c||!u[c])return!1;const d=u[c].toLowerCase();return a[c]||(a[c]={}),s[c]||(s[c]={}),a[c][d]?!1:(s[c][d]=!0,!0)}).reverse().forEach(u=>r.push(u));const l=Object.keys(s);for(let u=0;u<l.length;u+=1){const c=l[u],f={...a[c],...s[c]};a[c]=f}return r},[]).reverse()},Oy=(e,t)=>{if(Array.isArray(e)&&e.length){for(let n=0;n<e.length;n+=1)if(e[n][t])return!0}return!1},My=e=>({baseTag:Dy(["href"],e),bodyAttributes:$i("bodyAttributes",e),defer:gn(e,yn.DEFER),encode:gn(e,yn.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:$i("htmlAttributes",e),linkTags:$n("link",["rel","href"],e),metaTags:$n("meta",["name","charset","http-equiv","property","itemprop"],e),noscriptTags:$n("noscript",["innerHTML"],e),onChangeClientState:Ly(e),scriptTags:$n("script",["src","innerHTML"],e),styleTags:$n("style",["cssText"],e),title:Py(e),titleAttributes:$i("titleAttributes",e),prioritizeSeoTags:Oy(e,yn.PRIORITIZE_SEO_TAGS)}),ah=e=>Array.isArray(e)?e.join(""):e,_y=(e,t)=>{const n=Object.keys(e);for(let a=0;a<n.length;a+=1)if(t[n[a]]&&t[n[a]].includes(e[n[a]]))return!0;return!1},Vi=(e,t)=>Array.isArray(e)?e.reduce((n,a)=>(_y(a,t)?n.priority.push(a):n.default.push(a),n),{priority:[],default:[]}):{default:e,priority:[]},yu=(e,t)=>({...e,[t]:void 0}),Uy=["noscript","script","style"],Vo=(e,t=!0)=>t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),rh=e=>Object.keys(e).reduce((t,n)=>{const a=typeof e[n]<"u"?`${n}="${e[n]}"`:`${n}`;return t?`${t} ${a}`:a},""),Hy=(e,t,n,a)=>{const r=rh(n),i=ah(t);return r?`<${e} ${_e}="true" ${r}>${Vo(i,a)}</${e}>`:`<${e} ${_e}="true">${Vo(i,a)}</${e}>`},By=(e,t,n=!0)=>t.reduce((a,r)=>{const i=r,s=Object.keys(i).filter(c=>!(c==="innerHTML"||c==="cssText")).reduce((c,f)=>{const d=typeof i[f]>"u"?f:`${f}="${Vo(i[f],n)}"`;return c?`${c} ${d}`:d},""),l=i.innerHTML||i.cssText||"",u=Uy.indexOf(e)===-1;return`${a}<${e} ${_e}="true" ${s}${u?"/>":`>${l}</${e}>`}`},""),ih=(e,t={})=>Object.keys(e).reduce((n,a)=>{const r=Xs[a];return n[r||a]=e[a],n},t),Wy=(e,t,n)=>{const a={key:t,[_e]:!0},r=ih(n,a);return[Ke.createElement("title",r,t)]},gr=(e,t)=>t.map((n,a)=>{const r={key:a,[_e]:!0};return Object.keys(n).forEach(i=>{const l=Xs[i]||i;if(l==="innerHTML"||l==="cssText"){const u=n.innerHTML||n.cssText;r.dangerouslySetInnerHTML={__html:u}}else r[l]=n[i]}),Ke.createElement(e,r)}),Ce=(e,t,n=!0)=>{switch(e){case"title":return{toComponent:()=>Wy(e,t.title,t.titleAttributes),toString:()=>Hy(e,t.title,t.titleAttributes,n)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>ih(t),toString:()=>rh(t)};default:return{toComponent:()=>gr(e,t),toString:()=>By(e,t,n)}}},zy=({metaTags:e,linkTags:t,scriptTags:n,encode:a})=>{const r=Vi(e,zi.meta),i=Vi(t,zi.link),s=Vi(n,zi.script);return{priorityMethods:{toComponent:()=>[...gr("meta",r.priority),...gr("link",i.priority),...gr("script",s.priority)],toString:()=>`${Ce("meta",r.priority,a)} ${Ce("link",i.priority,a)} ${Ce("script",s.priority,a)}`},metaTags:r.default,linkTags:i.default,scriptTags:s.default}},$y=e=>{const{baseTag:t,bodyAttributes:n,encode:a=!0,htmlAttributes:r,noscriptTags:i,styleTags:s,title:l="",titleAttributes:u,prioritizeSeoTags:c}=e;let{linkTags:f,metaTags:d,scriptTags:y}=e,g={toComponent:()=>{},toString:()=>""};return c&&({priorityMethods:g,linkTags:f,metaTags:d,scriptTags:y}=zy(e)),{priority:g,base:Ce("base",t,a),bodyAttributes:Ce("bodyAttributes",n,a),htmlAttributes:Ce("htmlAttributes",r,a),link:Ce("link",f,a),meta:Ce("meta",d,a),noscript:Ce("noscript",i,a),script:Ce("script",y,a),style:Ce("style",s,a),title:Ce("title",{title:l,titleAttributes:u},a)}},Yo=$y,Za=[],oh=!!(typeof window<"u"&&window.document&&window.document.createElement),Ko=class{constructor(e,t){Qe(this,"instances",[]);Qe(this,"canUseDOM",oh);Qe(this,"context");Qe(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?Za:this.instances,add:e=>{(this.canUseDOM?Za:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?Za:this.instances).indexOf(e);(this.canUseDOM?Za:this.instances).splice(t,1)}}});this.context=e,this.canUseDOM=t||!1,t||(e.helmet=Yo({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},Vy={},sh=Ke.createContext(Vy),_t,lh=(_t=class extends x.Component{constructor(n){super(n);Qe(this,"helmetData");this.helmetData=new Ko(this.props.context||{},_t.canUseDOM)}render(){return Ke.createElement(sh.Provider,{value:this.helmetData.value},this.props.children)}},Qe(_t,"canUseDOM",oh),_t),Gt=(e,t)=>{const n=document.head||document.querySelector("head"),a=n.querySelectorAll(`${e}[${_e}]`),r=[].slice.call(a),i=[];let s;return t&&t.length&&t.forEach(l=>{const u=document.createElement(e);for(const c in l)if(Object.prototype.hasOwnProperty.call(l,c))if(c==="innerHTML")u.innerHTML=l.innerHTML;else if(c==="cssText")u.styleSheet?u.styleSheet.cssText=l.cssText:u.appendChild(document.createTextNode(l.cssText));else{const f=c,d=typeof l[f]>"u"?"":l[f];u.setAttribute(c,d)}u.setAttribute(_e,"true"),r.some((c,f)=>(s=f,u.isEqualNode(c)))?r.splice(s,1):i.push(u)}),r.forEach(l=>{var u;return(u=l.parentNode)==null?void 0:u.removeChild(l)}),i.forEach(l=>n.appendChild(l)),{oldTags:r,newTags:i}},qo=(e,t)=>{const n=document.getElementsByTagName(e)[0];if(!n)return;const a=n.getAttribute(_e),r=a?a.split(","):[],i=[...r],s=Object.keys(t);for(const l of s){const u=t[l]||"";n.getAttribute(l)!==u&&n.setAttribute(l,u),r.indexOf(l)===-1&&r.push(l);const c=i.indexOf(l);c!==-1&&i.splice(c,1)}for(let l=i.length-1;l>=0;l-=1)n.removeAttribute(i[l]);r.length===i.length?n.removeAttribute(_e):n.getAttribute(_e)!==s.join(",")&&n.setAttribute(_e,s.join(","))},Yy=(e,t)=>{typeof e<"u"&&document.title!==e&&(document.title=ah(e)),qo("title",t)},gu=(e,t)=>{const{baseTag:n,bodyAttributes:a,htmlAttributes:r,linkTags:i,metaTags:s,noscriptTags:l,onChangeClientState:u,scriptTags:c,styleTags:f,title:d,titleAttributes:y}=e;qo("body",a),qo("html",r),Yy(d,y);const g={baseTag:Gt("base",n),linkTags:Gt("link",i),metaTags:Gt("meta",s),noscriptTags:Gt("noscript",l),scriptTags:Gt("script",c),styleTags:Gt("style",f)},v={},T={};Object.keys(g).forEach(b=>{const{newTags:m,oldTags:h}=g[b];m.length&&(v[b]=m),h.length&&(T[b]=g[b].oldTags)}),t&&t(),u(e,v,T)},Vn=null,Ky=e=>{Vn&&cancelAnimationFrame(Vn),e.defer?Vn=requestAnimationFrame(()=>{gu(e,()=>{Vn=null})}):(gu(e),Vn=null)},qy=Ky,xu=class extends x.Component{constructor(){super(...arguments);Qe(this,"rendered",!1)}shouldComponentUpdate(t){return!jy(t,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:t}=this.props.context;t.remove(this),this.emitChange()}emitChange(){const{helmetInstances:t,setHelmet:n}=this.props.context;let a=null;const r=My(t.get().map(i=>{const s={...i.props};return delete s.context,s}));lh.canUseDOM?qy(r):Yo&&(a=Yo(r)),n(a)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:t}=this.props.context;t.add(this),this.emitChange()}render(){return this.init(),null}},qi,jt=(qi=class extends x.Component{shouldComponentUpdate(e){return!Cy(yu(this.props,"helmetData"),yu(e,"helmetData"))}mapNestedChildrenToProps(e,t){if(!t)return null;switch(e.type){case"script":case"noscript":return{innerHTML:t};case"style":return{cssText:t};default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,t,n,a){return{...t,[e.type]:[...t[e.type]||[],{...n,...this.mapNestedChildrenToProps(e,a)}]}}mapObjectTypeChildren(e,t,n,a){switch(e.type){case"title":return{...t,[e.type]:a,titleAttributes:{...n}};case"body":return{...t,bodyAttributes:{...n}};case"html":return{...t,htmlAttributes:{...n}};default:return{...t,[e.type]:{...n}}}}mapArrayTypeChildrenToProps(e,t){let n={...t};return Object.keys(e).forEach(a=>{n={...n,[a]:e[a]}}),n}warnOnInvalidChildren(e,t){return fu(pu.some(n=>e.type===n),typeof e.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${pu.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),fu(!t||typeof t=="string"||Array.isArray(t)&&!t.some(n=>typeof n!="string"),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,t){let n={};return Ke.Children.forEach(e,a=>{if(!a||!a.props)return;const{children:r,...i}=a.props,s=Object.keys(i).reduce((u,c)=>(u[Iy[c]||c]=i[c],u),{});let{type:l}=a;switch(typeof l=="symbol"?l=l.toString():this.warnOnInvalidChildren(a,r),l){case"Symbol(react.fragment)":t=this.mapChildrenToProps(r,t);break;case"link":case"meta":case"noscript":case"script":case"style":n=this.flattenArrayTypeChildren(a,n,s,r);break;default:t=this.mapObjectTypeChildren(a,t,s,r);break}}),this.mapArrayTypeChildrenToProps(n,t)}render(){const{children:e,...t}=this.props;let n={...t},{helmetData:a}=t;if(e&&(n=this.mapChildrenToProps(e,n)),a&&!(a instanceof Ko)){const r=a;a=new Ko(r.context,!0),delete n.helmetData}return a?Ke.createElement(xu,{...n,context:a.value}):Ke.createElement(sh.Consumer,null,r=>Ke.createElement(xu,{...n,context:r}))}},Qe(qi,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),qi);const Gy="modulepreload",Qy=function(e){return"/"+e},vu={},Xy=function(t,n,a){let r=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),l=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));r=Promise.allSettled(n.map(u=>{if(u=Qy(u),u in vu)return;vu[u]=!0;const c=u.endsWith(".css"),f=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${f}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":Gy,c||(d.as="script"),d.crossOrigin="",d.href=u,l&&d.setAttribute("nonce",l),document.head.appendChild(d),c)return new Promise((y,g)=>{d.addEventListener("load",y),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return r.then(s=>{for(const l of s||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})},Jy=()=>{const[e,t]=x.useState(!1),[n,a]=x.useState(!1),[r,i]=x.useState(""),s=ze(),l=ui(),u=x.useRef(null);if(x.useEffect(()=>{var g;n&&((g=u.current)==null||g.focus())},[n]),x.useEffect(()=>{if(!n)return;const g=v=>{v.key==="Escape"&&(a(!1),i(""))};return document.addEventListener("keydown",g),()=>document.removeEventListener("keydown",g)},[n]),s.pathname==="/annual-tax"||s.pathname==="/monthly-withholding")return null;const f=[{path:"/",label:"Calculator"},{path:"/articles/",label:"Articles"},{path:"/faq/",label:"FAQ"}],d=g=>g==="/"?s.pathname==="/":s.pathname.startsWith(g.replace(/\/$/,"")),y=g=>{g.preventDefault();const v=r.trim();v&&(l(`/search?q=${encodeURIComponent(v)}`),a(!1),i(""),t(!1))};return o.jsx("header",{className:"bg-white shadow-sm sticky top-0 z-50",children:o.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[o.jsxs("div",{className:"flex items-center justify-between h-16",children:[o.jsx(W,{to:"/",className:"flex items-center gap-2 shrink-0",children:o.jsx("span",{className:"text-xl font-bold text-blue-500",children:"Thai Tax Calculator"})}),o.jsx("div",{className:"hidden md:flex items-center gap-6",children:n?o.jsxs("form",{onSubmit:y,className:"flex items-center gap-2",children:[o.jsx("input",{ref:u,type:"text",value:r,onChange:g=>i(g.target.value),placeholder:"Search articles and FAQs...",className:"w-72 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors text-sm"}),o.jsx("button",{type:"submit",className:"text-blue-500 hover:text-blue-700 font-medium text-sm whitespace-nowrap",children:"Search"}),o.jsx("button",{type:"button",onClick:()=>{a(!1),i("")},"aria-label":"Close search",className:"text-gray-400 hover:text-gray-600",children:o.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]}):o.jsxs(o.Fragment,{children:[o.jsx("nav",{className:"flex items-center gap-6",children:f.map(g=>o.jsx(W,{to:g.path,className:`font-medium transition-colors ${d(g.path)?"text-blue-500":"text-gray-600 hover:text-blue-500"}`,children:g.label},g.path))}),o.jsx("button",{onClick:()=>a(!0),"aria-label":"Search",className:"text-gray-500 hover:text-blue-500 transition-colors",children:o.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})})]})}),o.jsx("button",{className:"md:hidden p-2 text-gray-600 hover:text-gray-900",onClick:()=>t(!e),"aria-label":e?"Close menu":"Open menu","aria-expanded":e,children:e?o.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}):o.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})})]}),e&&o.jsx("nav",{className:"md:hidden py-4 border-t border-gray-100",children:o.jsxs("div",{className:"flex flex-col gap-2",children:[o.jsx("form",{onSubmit:y,className:"px-4 mb-2",children:o.jsxs("div",{className:"relative",children:[o.jsx("input",{type:"text",value:r,onChange:g=>i(g.target.value),placeholder:"Search articles and FAQs...",className:"w-full px-4 py-2 pl-9 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"}),o.jsx("svg",{className:"absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})]})}),f.map(g=>o.jsx(W,{to:g.path,onClick:()=>t(!1),className:`py-2 px-4 rounded-lg font-medium transition-colors ${d(g.path)?"bg-blue-50 text-blue-500":"text-gray-600 hover:bg-gray-50"}`,children:g.label},g.path))]})})]})})},Zy=()=>{const e=ze();return e.pathname==="/annual-tax"||e.pathname==="/monthly-withholding"?null:o.jsx("footer",{className:"bg-gray-50 border-t border-gray-200",children:o.jsxs("div",{className:"max-w-6xl mx-auto px-4 py-8",children:[o.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center gap-4",children:[o.jsxs("div",{className:"text-gray-600 text-sm",children:[new Date().getFullYear()," Thai Tax Calculator. For informational purposes only."]}),o.jsxs("nav",{className:"flex gap-6 text-sm",children:[o.jsx(W,{to:"/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"Calculator"}),o.jsx(W,{to:"/articles/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"Articles"}),o.jsx(W,{to:"/faq/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"FAQ"}),o.jsx(W,{to:"/privacy/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"Privacy"})]})]}),o.jsx("div",{className:"mt-4 text-center text-xs text-gray-500",children:"This calculator provides estimates only. Consult a qualified tax professional for official advice."})]})})},eg=({children:e})=>o.jsxs("div",{className:"min-h-screen flex flex-col bg-gray-100",children:[o.jsx(Jy,{}),o.jsx("main",{className:"flex-grow",children:e}),o.jsx(Zy,{})]}),tg=[{value:"basic",label:"Basic Estimate",description:"Quick calculation without deductions",icon:"⚡"},{value:"detailed",label:"Detailed Estimate",description:"Include deductions for a more accurate result",icon:"📋"}],ng=({formData:e,setFormData:t,nextStep:n})=>{const a=r=>{t({...e,estimateType:r}),n()};return o.jsxs("div",{children:[o.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Choose your estimate type"}),o.jsx("p",{className:"text-gray-600 mb-6",children:"You can choose a quick estimate without deductions, or a more detailed estimate where deductions are included."}),o.jsx("div",{className:"space-y-4",children:tg.map(r=>o.jsx("button",{onClick:()=>a(r.value),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.estimateType===r.value?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.estimateType===r.value,children:o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsx("span",{className:"text-3xl",children:r.icon}),o.jsxs("div",{children:[o.jsx("h3",{className:"font-semibold text-gray-800",children:r.label}),o.jsx("p",{className:"text-sm text-gray-500",children:r.description})]})]})},r.value))})]})},ag=[{value:"fixed",label:"Fixed Monthly Income",description:"Same salary every month",icon:"📅"},{value:"variable",label:"Variable Monthly Income",description:"Different income each month (bonuses, allowances, etc.)",icon:"📊"}],rg=({formData:e,setFormData:t,nextStep:n})=>{const a=r=>{t({...e,incomeType:r}),n()};return o.jsxs("div",{children:[o.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"How do you receive your income?"}),o.jsx("p",{className:"text-gray-600 mb-6",children:"Choose based on whether your monthly income is consistent or varies throughout the year."}),o.jsx("div",{className:"space-y-4",children:ag.map(r=>o.jsx("button",{onClick:()=>a(r.value),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.incomeType===r.value?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.incomeType===r.value,children:o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsx("span",{className:"text-3xl",children:r.icon}),o.jsxs("div",{children:[o.jsx("h3",{className:"font-semibold text-gray-800",children:r.label}),o.jsx("p",{className:"text-sm text-gray-500",children:r.description})]})]})},r.value))})]})},j={STANDARD_DEDUCTION_RATE:.5,MAX_STANDARD_DEDUCTION:1e5,MAX_SOCIAL_SECURITY:10500,PERSONAL_ALLOWANCE:6e4,SPOUSE_ALLOWANCE:6e4,SENIOR_ALLOWANCE:19e4,CHILD_ALLOWANCE_BASE:3e4,CHILD_ALLOWANCE_BONUS:3e4,CHILD_BONUS_BIRTH_YEAR:2018,PARENT_ALLOWANCE:3e4,MAX_PARENTS:4,MAX_LIFE_INSURANCE:1e5,MAX_HEALTH_INSURANCE:25e3,MAX_PENSION_FUND:5e5,MAX_PROVIDENT_FUND:5e5,MAX_RMF:5e5,MAX_SSF:2e5,MAX_DONATION_PERCENT:.1},Xn={STANDARD_DEDUCTION_RATE:.5,MAX_STANDARD_DEDUCTION:1e5,MAX_SOCIAL_SECURITY:10500,PERSONAL_ALLOWANCE:6e4,SPOUSE_ALLOWANCE:6e4,SENIOR_ALLOWANCE:19e4,CHILD_ALLOWANCE_BASE:3e4,CHILD_ALLOWANCE_BONUS:3e4,PARENT_ALLOWANCE:3e4,MAX_PARENTS:4,MAX_LIFE_INSURANCE:1e5,MAX_HEALTH_INSURANCE:25e3,MAX_PENSION_FUND:5e5,MAX_PROVIDENT_FUND:5e5,MAX_RMF:5e5,MAX_SSF:2e5,MAX_DONATION_PERCENT:.1,CHILD_BONUS_BIRTH_YEAR:2018},ig=[{upTo:15e4,rate:0,label:"0-150k"},{upTo:3e5,rate:.05,label:"150k-300k"},{upTo:5e5,rate:.1,label:"300k-500k"},{upTo:75e4,rate:.15,label:"500k-750k"},{upTo:1e6,rate:.2,label:"750k-1M"},{upTo:2e6,rate:.25,label:"1M-2M"},{upTo:5e6,rate:.3,label:"2M-5M"},{upTo:1/0,rate:.35,label:"5M+"}],og=({formData:e,setFormData:t})=>{const[n,a]=x.useState(e.monthlySalary?e.monthlySalary.toString():""),[r,i]=x.useState(e.annualBonus?e.annualBonus.toString():""),[s,l]=x.useState(e.annualOtherIncome?e.annualOtherIncome.toString():""),[u,c]=x.useState(e.includeSocialSecurity||!1),[f,d]=x.useState(e.socialSecurityContribution?e.socialSecurityContribution.toString():"");x.useEffect(()=>{const m=parseFloat(n.replace(/,/g,""))||0,h=parseFloat(r.replace(/,/g,""))||0,p=parseFloat(s.replace(/,/g,""))||0,w=u?Math.min(parseFloat(f.replace(/,/g,""))||0,j.MAX_SOCIAL_SECURITY):0;t({...e,monthlySalary:m,annualBonus:h,annualOtherIncome:p,includeSocialSecurity:u,socialSecurityContribution:w})},[n,r,s,u,f]);const y=m=>{const h=m.target.value.replace(/[^0-9]/g,"");a(h)},g=m=>{const h=m.target.value.replace(/[^0-9]/g,"");i(h)},v=m=>{const h=m.target.value.replace(/[^0-9]/g,"");l(h)},T=m=>{const h=m.target.value.replace(/[^0-9]/g,"");(parseInt(h)||0)<=j.MAX_SOCIAL_SECURITY&&d(h)},b=m=>{const h=parseInt(m.replace(/,/g,""))||0;return h>0?h.toLocaleString():""};return o.jsxs("div",{children:[o.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-4",children:"Assessable Income"}),o.jsx("p",{className:"text-gray-600 mb-6",children:"Enter your income details below. Include your regular monthly salary, plus any bonus or other income you expect to receive this year."}),o.jsxs("div",{className:"mb-4",children:[o.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Salary per month (THB)"}),o.jsxs("div",{className:"relative",children:[o.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),o.jsx("input",{type:"text",value:b(n),onChange:y,className:"w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]})]}),o.jsxs("div",{className:"mb-4",children:[o.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Bonus per year (THB)"}),o.jsxs("div",{className:"relative",children:[o.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),o.jsx("input",{type:"text",value:b(r),onChange:g,className:"w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]}),o.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Expected annual bonus amount"})]}),o.jsxs("div",{className:"mb-6",children:[o.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Other income per year (THB)"}),o.jsxs("div",{className:"relative",children:[o.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),o.jsx("input",{type:"text",value:b(s),onChange:v,className:"w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]}),o.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Housing allowance, overtime, commissions, etc."})]}),o.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[o.jsxs("label",{className:"flex items-start gap-3 cursor-pointer",children:[o.jsx("input",{type:"checkbox",checked:u,onChange:m=>c(m.target.checked),className:"mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),o.jsxs("div",{children:[o.jsx("span",{className:"font-medium text-gray-800",children:"Include Social Security Contributions"}),o.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Social security contributions are tax-deductible up to ฿10,500 per year (2026 limit)."})]})]}),u&&o.jsxs("div",{className:"mt-4 ml-8",children:[o.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Estimated annual contribution (THB)"}),o.jsxs("div",{className:"relative",children:[o.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),o.jsx("input",{type:"text",value:b(f),onChange:T,className:"w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]}),o.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Maximum: ฿",j.MAX_SOCIAL_SECURITY.toLocaleString()," per year"]})]})]})]})},sg=["January","February","March","April","May","June","July","August","September","October","November","December"],lg=()=>({salary:0,bonus:0,housingAllowance:0,otherIncome:0}),ug=({formData:e,setFormData:t})=>{var T;const[n,a]=x.useState(((T=e.variableIncome)==null?void 0:T.length)===12?e.variableIncome:Array(12).fill(null).map(()=>lg())),[r,i]=x.useState(e.includeSocialSecurity||!1),[s,l]=x.useState(e.socialSecurityContribution?e.socialSecurityContribution.toString():""),[u,c]=x.useState(null);x.useEffect(()=>{const b=r?Math.min(parseFloat(s.replace(/,/g,""))||0,j.MAX_SOCIAL_SECURITY):0;t({...e,variableIncome:n,includeSocialSecurity:r,socialSecurityContribution:b})},[n,r,s]);const f=(b,m,h)=>{const p=parseFloat(h.replace(/[^0-9]/g,""))||0,w=[...n];w[b]={...w[b],[m]:p},a(w)},d=b=>{const m=b.target.value.replace(/[^0-9]/g,"");(parseInt(m)||0)<=j.MAX_SOCIAL_SECURITY&&l(m)},y=b=>b.salary+b.bonus+b.housingAllowance+b.otherIncome,g=()=>n.reduce((b,m)=>b+y(m),0),v=b=>b>0?b.toLocaleString():"";return o.jsxs("div",{children:[o.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Enter your monthly income"}),o.jsx("p",{className:"text-gray-600 mb-4",children:"Enter your income for each month. All taxable income including bonuses and housing allowances by the company should be included."}),o.jsx("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6",children:o.jsxs("div",{className:"flex justify-between items-center",children:[o.jsx("span",{className:"text-sm text-blue-700",children:"Total Annual Income"}),o.jsxs("span",{className:"text-xl font-bold text-blue-700",children:["฿",g().toLocaleString()]})]})}),o.jsx("div",{className:"space-y-2 mb-6 max-h-80 overflow-y-auto",children:sg.map((b,m)=>o.jsxs("div",{className:"border border-gray-200 rounded-lg overflow-hidden",children:[o.jsxs("button",{onClick:()=>c(u===m?null:m),className:"w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100",children:[o.jsx("span",{className:"font-medium text-gray-800",children:b}),o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsxs("span",{className:"text-gray-600",children:["฿",y(n[m]).toLocaleString()]}),o.jsx("span",{className:"text-gray-400",children:u===m?"▲":"▼"})]})]}),u===m&&o.jsxs("div",{className:"p-4 space-y-3 bg-white",children:[o.jsxs("div",{children:[o.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Salary"}),o.jsxs("div",{className:"relative",children:[o.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),o.jsx("input",{type:"text",value:v(n[m].salary),onChange:h=>f(m,"salary",h.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]}),o.jsxs("div",{children:[o.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Bonus"}),o.jsxs("div",{className:"relative",children:[o.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),o.jsx("input",{type:"text",value:v(n[m].bonus),onChange:h=>f(m,"bonus",h.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]}),o.jsxs("div",{children:[o.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Housing Allowance"}),o.jsxs("div",{className:"relative",children:[o.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),o.jsx("input",{type:"text",value:v(n[m].housingAllowance),onChange:h=>f(m,"housingAllowance",h.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]}),o.jsxs("div",{children:[o.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Other Taxable Income"}),o.jsxs("div",{className:"relative",children:[o.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),o.jsx("input",{type:"text",value:v(n[m].otherIncome),onChange:h=>f(m,"otherIncome",h.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]})]})]},b))}),o.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[o.jsxs("label",{className:"flex items-start gap-3 cursor-pointer",children:[o.jsx("input",{type:"checkbox",checked:r,onChange:b=>i(b.target.checked),className:"mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),o.jsxs("div",{children:[o.jsx("span",{className:"font-medium text-gray-800",children:"Include Social Security Contributions"}),o.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Social security contributions are tax-deductible up to ฿10,500 per year (2026 limit)."})]})]}),r&&o.jsxs("div",{className:"mt-4 ml-8",children:[o.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Estimated annual contribution (THB)"}),o.jsxs("div",{className:"relative",children:[o.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),o.jsx("input",{type:"text",value:s?parseInt(s).toLocaleString():"",onChange:d,className:"w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500",placeholder:"0"})]}),o.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Maximum: ฿",j.MAX_SOCIAL_SECURITY.toLocaleString()," per year"]})]})]})]})},cg=({formData:e,setFormData:t,nextStep:n})=>{const[a,r]=x.useState(e.maritalStatus==="married"),i=l=>{l==="single"?(t({...e,maritalStatus:l,spouseHasNoIncome:!1}),r(!1),n()):(t({...e,maritalStatus:l}),r(!0))},s=l=>{t({...e,spouseHasNoIncome:l})};return o.jsxs("div",{children:[o.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"What is your marital status?"}),o.jsx("p",{className:"text-gray-600 mb-6",children:"Your marital status affects your tax allowances."}),o.jsxs("div",{className:"space-y-4 mb-6",children:[o.jsx("button",{onClick:()=>i("single"),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.maritalStatus==="single"?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.maritalStatus==="single",children:o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsx("span",{className:"text-3xl",children:"👤"}),o.jsxs("div",{children:[o.jsx("h3",{className:"font-semibold text-gray-800",children:"Single"}),o.jsx("p",{className:"text-sm text-gray-500",children:"Not married or legally separated"})]})]})}),o.jsx("button",{onClick:()=>i("married"),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.maritalStatus==="married"?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.maritalStatus==="married",children:o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsx("span",{className:"text-3xl",children:"👫"}),o.jsxs("div",{children:[o.jsx("h3",{className:"font-semibold text-gray-800",children:"Married"}),o.jsx("p",{className:"text-sm text-gray-500",children:"Legally married"})]})]})})]}),a&&o.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4",children:[o.jsxs("div",{className:"flex items-start gap-3 mb-4",children:[o.jsx("div",{className:"flex-shrink-0 mt-0.5",children:o.jsx("svg",{className:"h-5 w-5 text-blue-500",viewBox:"0 0 20 20",fill:"currentColor",children:o.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})})}),o.jsxs("p",{className:"text-sm text-blue-700",children:["You can claim a ฿",j.SPOUSE_ALLOWANCE.toLocaleString()," spouse allowance only if your spouse has no income during the tax year."]})]}),o.jsxs("label",{className:"flex items-center gap-3 cursor-pointer",children:[o.jsx("input",{type:"checkbox",checked:e.spouseHasNoIncome,onChange:l=>s(l.target.checked),className:"w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),o.jsx("span",{className:"text-gray-800",children:"My spouse has no income"})]})]})]})},er=new Date().getFullYear(),dg=({formData:e,setFormData:t,showValidationErrors:n=!1})=>{const[a,r]=x.useState(e.childrenEligibilityConfirmed||e.children.length>0),[i,s]=x.useState(e.parentsEligibilityConfirmed||e.numberOfParents>0),l=m=>er-m,u=m=>{const h=l(m);return h>=20&&h<=25},c=(m,h)=>{let p=j.CHILD_ALLOWANCE_BASE;return h>=1&&m.birthYear>=j.CHILD_BONUS_BIRTH_YEAR&&(p+=j.CHILD_ALLOWANCE_BONUS),p},f=()=>e.children.reduce((m,h,p)=>m+c(h,p),0),d=()=>{const m=[...e.children,{birthYear:er-10,isStudent:!1}];t({...e,children:m})},y=()=>{if(e.children.length>0){const m=e.children.slice(0,-1);t({...e,children:m})}},g=(m,h)=>{const p=[...e.children];p[m]={...p[m],birthYear:h},u(h)||(p[m].isStudent=!1),t({...e,children:p})},v=(m,h)=>{const p=[...e.children];p[m]={...p[m],isStudent:h},t({...e,children:p})},T=m=>{const h=Math.max(0,Math.min(j.MAX_PARENTS,e.numberOfParents+m));t({...e,numberOfParents:h})},b=j.PERSONAL_ALLOWANCE+(e.maritalStatus==="married"&&e.spouseHasNoIncome?j.SPOUSE_ALLOWANCE:0)+(e.isAge65OrOlder?j.SENIOR_ALLOWANCE:0)+f()+e.numberOfParents*j.PARENT_ALLOWANCE;return o.jsxs("div",{children:[o.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Dependents & Allowances"}),o.jsx("p",{className:"text-gray-600 mb-6",children:"Tell us about your dependents to calculate your allowances."}),o.jsxs("div",{className:"mb-6",children:[o.jsx("h3",{className:"text-lg font-semibold text-gray-800 mb-3",children:"Children"}),o.jsxs("div",{className:"bg-gray-50 rounded-lg p-4",children:[o.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm",children:[o.jsx("p",{className:"font-medium text-blue-800 mb-1",children:"Eligibility Criteria:"}),o.jsxs("ul",{className:"text-blue-700 space-y-1",children:[o.jsx("li",{children:"• Under 20 years old, OR under 25 and studying, OR legally incompetent"}),o.jsx("li",{children:"• Earning less than ฿30,000 per year"})]})]}),o.jsxs("label",{className:`flex items-center gap-3 cursor-pointer p-3 border rounded-lg bg-white ${n&&a&&e.children.length===0?"border-red-500":"border-gray-200"}`,children:[o.jsx("input",{type:"checkbox",checked:a,onChange:m=>{r(m.target.checked),m.target.checked?t({...e,childrenEligibilityConfirmed:!0}):t({...e,children:[],childrenEligibilityConfirmed:!1})},className:"w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),o.jsx("span",{className:"text-gray-800",children:"I have children who meet these criteria"})]}),n&&a&&e.children.length===0&&o.jsx("p",{className:"mt-2 text-sm text-red-600",children:"Please add at least one child or uncheck the box above."}),a&&o.jsxs("div",{className:"mt-4",children:[o.jsxs("div",{className:"flex items-center gap-4 mb-4",children:[o.jsx("span",{className:"text-gray-700",children:"Number of children:"}),o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx("button",{onClick:y,disabled:e.children.length===0,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed","aria-label":"Remove child",children:"-"}),o.jsx("span",{className:"w-8 text-center font-medium",children:e.children.length}),o.jsx("button",{onClick:d,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100","aria-label":"Add child",children:"+"})]})]}),e.children.map((m,h)=>{const p=l(m.birthYear),w=u(m.birthYear),N=c(m,h),k=h>=1&&m.birthYear>=j.CHILD_BONUS_BIRTH_YEAR;return o.jsxs("div",{className:"bg-white border border-gray-200 rounded-lg p-3 mb-3",children:[o.jsxs("div",{className:"flex items-center justify-between mb-2",children:[o.jsxs("span",{className:"font-medium text-gray-700",children:["Child ",h+1]}),o.jsxs("span",{className:"text-sm text-green-600 font-medium",children:["฿",N.toLocaleString(),k&&o.jsx("span",{className:"text-xs text-green-500 ml-1",children:"(+฿30k bonus)"})]})]}),o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsx("label",{className:"text-sm text-gray-600",children:"Birth year:"}),o.jsx("input",{type:"number",value:m.birthYear,onChange:C=>g(h,parseInt(C.target.value)||er),min:1900,max:er,className:"w-24 px-2 py-1 border border-gray-300 rounded text-center"}),o.jsxs("span",{className:"text-sm text-gray-500",children:["Age: ",p]})]}),w&&o.jsxs("label",{className:"flex items-center gap-2 mt-2 cursor-pointer",children:[o.jsx("input",{type:"checkbox",checked:m.isStudent||!1,onChange:C=>v(h,C.target.checked),className:"w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),o.jsx("span",{className:"text-sm text-gray-600",children:"Currently studying (required for ages 20-25)"})]})]},h)}),e.children.length>0&&o.jsxs("div",{className:"text-right text-sm text-gray-600",children:["Total children allowance: ",o.jsxs("span",{className:"font-medium text-green-600",children:["฿",f().toLocaleString()]})]})]})]})]}),o.jsxs("div",{className:"mb-6",children:[o.jsx("h3",{className:"text-lg font-semibold text-gray-800 mb-3",children:"Parents"}),o.jsxs("div",{className:"bg-gray-50 rounded-lg p-4",children:[o.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm",children:[o.jsx("p",{className:"font-medium text-blue-800 mb-1",children:"Eligibility Criteria:"}),o.jsxs("ul",{className:"text-blue-700 space-y-1",children:[o.jsx("li",{children:"• Parent is 60 years or older"}),o.jsx("li",{children:"• Parent's annual income is less than ฿30,000"}),o.jsxs("li",{children:["• You can claim up to ",j.MAX_PARENTS," parents (yours and spouse's)"]})]}),o.jsxs("p",{className:"text-blue-600 mt-2",children:["Allowance: ฿",j.PARENT_ALLOWANCE.toLocaleString()," per eligible parent"]})]}),o.jsxs("label",{className:`flex items-center gap-3 cursor-pointer p-3 border rounded-lg bg-white ${n&&i&&e.numberOfParents===0?"border-red-500":"border-gray-200"}`,children:[o.jsx("input",{type:"checkbox",checked:i,onChange:m=>{s(m.target.checked),m.target.checked?t({...e,parentsEligibilityConfirmed:!0}):t({...e,numberOfParents:0,parentsEligibilityConfirmed:!1})},className:"w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),o.jsx("span",{className:"text-gray-800",children:"I have parents who meet these criteria"})]}),n&&i&&e.numberOfParents===0&&o.jsx("p",{className:"mt-2 text-sm text-red-600",children:"Please add at least one parent or uncheck the box above."}),i&&o.jsx("div",{className:"mt-4",children:o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsx("span",{className:"text-gray-700",children:"Number of parents:"}),o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx("button",{onClick:()=>T(-1),disabled:e.numberOfParents===0,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed","aria-label":"Remove parent",children:"-"}),o.jsx("span",{className:"w-8 text-center font-medium",children:e.numberOfParents}),o.jsx("button",{onClick:()=>T(1),disabled:e.numberOfParents>=j.MAX_PARENTS,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed","aria-label":"Add parent",children:"+"})]}),o.jsxs("span",{className:"text-sm text-green-600 font-medium",children:["฿",(e.numberOfParents*j.PARENT_ALLOWANCE).toLocaleString()]})]})})]})]}),o.jsxs("div",{className:"bg-green-50 border border-green-200 rounded-lg p-4",children:[o.jsx("h3",{className:"font-semibold text-green-800 mb-2",children:"Total Allowances"}),o.jsxs("div",{className:"text-sm text-green-700 space-y-1",children:[o.jsxs("div",{className:"flex justify-between",children:[o.jsx("span",{children:"Personal:"}),o.jsxs("span",{children:["฿",j.PERSONAL_ALLOWANCE.toLocaleString()]})]}),e.maritalStatus==="married"&&e.spouseHasNoIncome&&o.jsxs("div",{className:"flex justify-between",children:[o.jsx("span",{children:"Spouse:"}),o.jsxs("span",{children:["฿",j.SPOUSE_ALLOWANCE.toLocaleString()]})]}),e.isAge65OrOlder&&o.jsxs("div",{className:"flex justify-between",children:[o.jsx("span",{children:"Senior (65+):"}),o.jsxs("span",{children:["฿",j.SENIOR_ALLOWANCE.toLocaleString()]})]}),e.children.length>0&&o.jsxs("div",{className:"flex justify-between",children:[o.jsx("span",{children:"Children:"}),o.jsxs("span",{children:["฿",f().toLocaleString()]})]}),e.numberOfParents>0&&o.jsxs("div",{className:"flex justify-between",children:[o.jsx("span",{children:"Parents:"}),o.jsxs("span",{children:["฿",(e.numberOfParents*j.PARENT_ALLOWANCE).toLocaleString()]})]}),o.jsxs("div",{className:"flex justify-between font-semibold border-t border-green-300 pt-1 mt-2",children:[o.jsx("span",{children:"Total:"}),o.jsxs("span",{children:["฿",b.toLocaleString()]})]})]})]})]})},hg=({formData:e,setFormData:t,showValidationErrors:n=!1})=>{const r=(()=>{var d;return e.incomeType==="variable"&&((d=e.variableIncome)==null?void 0:d.length)===12?e.variableIncome.reduce((y,g)=>y+g.salary+g.bonus+g.housingAllowance+g.otherIncome,0):e.monthlySalary*12})(),i=x.useMemo(()=>[{key:"lifeInsurance",hasKey:"hasLifeInsurance",label:"Life Insurance",description:"Life insurance premiums paid during the year",maxValue:j.MAX_LIFE_INSURANCE},{key:"healthInsurance",hasKey:"hasHealthInsurance",label:"Health Insurance",description:"Health insurance premiums paid during the year",maxValue:j.MAX_HEALTH_INSURANCE},{key:"pensionFund",hasKey:"hasPensionFund",label:"Pension Fund",description:"Government pension fund contributions",maxValue:j.MAX_PENSION_FUND},{key:"providentFund",hasKey:"hasProvidentFund",label:"Provident Fund",description:"Private provident fund contributions",maxValue:j.MAX_PROVIDENT_FUND},{key:"rmf",hasKey:"hasRMF",label:"RMF (Retirement Mutual Fund)",description:"RMF investments for retirement",maxValue:j.MAX_RMF},{key:"ssf",hasKey:"hasSSF",label:"SSF (Super Savings Fund)",description:"SSF long-term investments",maxValue:j.MAX_SSF},{key:"donations",hasKey:"hasDonations",label:"Charitable Donations",description:"Donations to approved charities (limited to 10% of income)",maxValue:Math.floor(r*j.MAX_DONATION_PERCENT)}],[r]),[s,l]=x.useState({hasLifeInsurance:e.hasLifeInsurance||!1,lifeInsurance:e.lifeInsurance||0,hasHealthInsurance:e.hasHealthInsurance||!1,healthInsurance:e.healthInsurance||0,hasPensionFund:e.hasPensionFund||!1,pensionFund:e.pensionFund||0,hasProvidentFund:e.hasProvidentFund||!1,providentFund:e.providentFund||0,hasRMF:e.hasRMF||!1,rmf:e.rmf||0,hasSSF:e.hasSSF||!1,ssf:e.ssf||0,hasDonations:e.hasDonations||!1,donations:e.donations||0});x.useEffect(()=>{t({...e,...s})},[s]);const u=(d,y)=>{l({...s,[d]:y})},c=(d,y,g)=>{const v=Math.min(parseFloat(y.replace(/[^0-9]/g,""))||0,g);l({...s,[d]:v})},f=d=>d>0?d.toLocaleString():"";return o.jsxs("div",{children:[o.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Tax Deductions"}),o.jsx("p",{className:"text-gray-600 mb-6",children:"Select any deductions you qualify for. These will reduce your taxable income."}),o.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4",children:[o.jsxs("div",{className:"flex items-start gap-3 mb-3",children:[o.jsx("div",{className:"flex-shrink-0 mt-0.5",children:o.jsx("svg",{className:"h-5 w-5 text-amber-500",viewBox:"0 0 20 20",fill:"currentColor",children:o.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})})}),o.jsxs("p",{className:"text-sm text-amber-700",children:["Taxpayers aged 65 or older are entitled to an additional ฿",j.SENIOR_ALLOWANCE.toLocaleString()," allowance."]})]}),o.jsxs("label",{className:"flex items-center gap-3 cursor-pointer",children:[o.jsx("input",{type:"checkbox",checked:e.isAge65OrOlder,onChange:d=>t({...e,isAge65OrOlder:d.target.checked}),className:"w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"}),o.jsx("span",{className:"text-gray-800",children:"I am 65 years or older"})]})]}),o.jsx("div",{className:"space-y-4 mb-6",children:i.map(d=>{const y=s[d.hasKey],g=s[d.key],v=n&&y&&g===0;return o.jsxs("div",{className:`border rounded-lg p-4 ${v?"border-red-500":"border-gray-200"}`,children:[o.jsxs("label",{className:"flex items-start gap-3 cursor-pointer",children:[o.jsx("input",{type:"checkbox",checked:y,onChange:T=>u(d.hasKey,T.target.checked),className:"mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),o.jsxs("div",{className:"flex-1",children:[o.jsx("span",{className:"font-medium text-gray-800",children:d.label}),o.jsx("p",{className:"text-sm text-gray-500",children:d.description})]})]}),y&&o.jsxs("div",{className:"mt-3 ml-8",children:[o.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Amount (THB)"}),o.jsxs("div",{className:"relative",children:[o.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",children:"฿"}),o.jsx("input",{type:"text",value:f(g),onChange:T=>c(d.key,T.target.value,d.maxValue),className:`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 ${v?"border-red-500 focus:ring-red-200":"border-gray-300 focus:ring-blue-500"}`,placeholder:"0"})]}),v?o.jsx("p",{className:"text-sm text-red-600 mt-1",children:"Please enter an amount or uncheck this deduction."}):o.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Maximum: ฿",d.maxValue.toLocaleString()," per year"]})]})]},d.key)})})]})};function uh(e){if(e<=0)return 0;let t=0,n=e,a=0;for(const r of ig){if(n<=0)break;const i=r.upTo-a,s=Math.min(n,i);t+=s*r.rate,n-=s,a=r.upTo}return t}const Tu=e=>e.reduce((t,n,a)=>{let r=j.CHILD_ALLOWANCE_BASE;return a>=1&&n.birthYear>=j.CHILD_BONUS_BIRTH_YEAR&&(r+=j.CHILD_ALLOWANCE_BONUS),t+r},0),mg=({formData:e,setFormData:t,onStartOver:n})=>{const[a,r]=x.useState(!1),[i,s]=x.useState(null),l=()=>{var d;return e.incomeType==="variable"&&((d=e.variableIncome)==null?void 0:d.length)===12?e.variableIncome.reduce((y,g)=>y+g.salary+g.bonus+g.housingAllowance+g.otherIncome,0):e.monthlySalary*12+(e.annualBonus||0)+(e.annualOtherIncome||0)},u=x.useMemo(()=>{const d=l(),y=Math.min(d*j.STANDARD_DEDUCTION_RATE,j.MAX_STANDARD_DEDUCTION),g=j.PERSONAL_ALLOWANCE;let v=y+g;if(e.includeSocialSecurity&&e.socialSecurityContribution>0&&(v+=Math.min(e.socialSecurityContribution,j.MAX_SOCIAL_SECURITY)),e.estimateType==="detailed"){e.maritalStatus==="married"&&e.spouseHasNoIncome&&(v+=j.SPOUSE_ALLOWANCE);const h=Tu(e.children||[]);v+=h;const p=(e.numberOfParents||0)*j.PARENT_ALLOWANCE;if(v+=p,e.hasLifeInsurance&&(v+=Math.min(e.lifeInsurance||0,j.MAX_LIFE_INSURANCE)),e.hasHealthInsurance&&(v+=Math.min(e.healthInsurance||0,j.MAX_HEALTH_INSURANCE)),e.hasPensionFund&&(v+=Math.min(e.pensionFund||0,j.MAX_PENSION_FUND)),e.hasProvidentFund&&(v+=Math.min(e.providentFund||0,j.MAX_PROVIDENT_FUND)),e.hasRMF&&(v+=Math.min(e.rmf||0,j.MAX_RMF)),e.hasSSF&&(v+=Math.min(e.ssf||0,j.MAX_SSF)),e.hasDonations){const w=Math.floor(d*j.MAX_DONATION_PERCENT);v+=Math.min(e.donations||0,w)}}const T=Math.max(0,d-v),b=uh(T),m=b/12;return{annualIncome:d,standardDeduction:y,personalAllowance:g,socialSecurity:e.includeSocialSecurity?Math.min(e.socialSecurityContribution||0,j.MAX_SOCIAL_SECURITY):0,totalDeductions:v,taxableIncome:T,annualTax:b,monthlyWithholding:m,effectiveRate:d>0?b/d*100:0}},[e]),c=x.useMemo(()=>{const d=[];if(e.incomeType==="fixed"&&(d.push({key:"monthlySalary",label:"Monthly Salary",value:e.monthlySalary,editable:!0}),d.push({key:"annualBonus",label:"Annual Bonus",value:e.annualBonus||0,editable:!0}),d.push({key:"annualOtherIncome",label:"Other Annual Income",value:e.annualOtherIncome||0,editable:!0})),d.push({key:"standardDeduction",label:"Expense Deduction (50%)",value:u.standardDeduction,editable:!1}),d.push({key:"personalAllowance",label:"Personal Allowance",value:j.PERSONAL_ALLOWANCE,editable:!1}),e.includeSocialSecurity&&d.push({key:"socialSecurityContribution",label:"Social Security",value:e.socialSecurityContribution,editable:!0,maxValue:j.MAX_SOCIAL_SECURITY}),e.estimateType==="detailed"){if(e.maritalStatus==="married"&&e.spouseHasNoIncome&&d.push({key:"spouseAllowance",label:"Spouse Allowance",value:j.SPOUSE_ALLOWANCE,editable:!1}),e.children&&e.children.length>0){const y=Tu(e.children);d.push({key:"childAllowance",label:`Child Allowance (${e.children.length})`,value:y,editable:!1})}if(e.numberOfParents>0&&d.push({key:"parentAllowance",label:`Parent Allowance (${e.numberOfParents})`,value:e.numberOfParents*j.PARENT_ALLOWANCE,editable:!1}),e.hasLifeInsurance&&d.push({key:"lifeInsurance",label:"Life Insurance",value:e.lifeInsurance,editable:!0,maxValue:j.MAX_LIFE_INSURANCE}),e.hasHealthInsurance&&d.push({key:"healthInsurance",label:"Health Insurance",value:e.healthInsurance,editable:!0,maxValue:j.MAX_HEALTH_INSURANCE}),e.hasPensionFund&&d.push({key:"pensionFund",label:"Pension Fund",value:e.pensionFund,editable:!0,maxValue:j.MAX_PENSION_FUND}),e.hasProvidentFund&&d.push({key:"providentFund",label:"Provident Fund",value:e.providentFund,editable:!0,maxValue:j.MAX_PROVIDENT_FUND}),e.hasRMF&&d.push({key:"rmf",label:"RMF",value:e.rmf,editable:!0,maxValue:j.MAX_RMF}),e.hasSSF&&d.push({key:"ssf",label:"SSF",value:e.ssf,editable:!0,maxValue:j.MAX_SSF}),e.hasDonations){const y=l(),g=Math.floor(y*j.MAX_DONATION_PERCENT);d.push({key:"donations",label:"Donations",value:e.donations,editable:!0,maxValue:g})}}return d},[e,u.standardDeduction]),f=(d,y,g)=>{const v=parseFloat(y.replace(/[^0-9]/g,""))||0,T=g?Math.min(v,g):v;t({...e,[d]:T})};return o.jsxs("div",{children:[o.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-4 text-center",children:"Estimated Monthly Withholding"}),o.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-center",children:[o.jsx("p",{className:"text-sm text-gray-500 mb-1",children:"Monthly Tax Withholding"}),o.jsxs("p",{className:"text-4xl font-bold text-blue-600",children:["฿",u.monthlyWithholding.toLocaleString("en-US",{maximumFractionDigits:0})]}),o.jsxs("p",{className:"text-sm text-gray-500 mt-2",children:["Effective Rate: ",u.effectiveRate.toFixed(2),"%"]})]}),o.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 mb-6 space-y-2",children:[o.jsxs("div",{className:"flex justify-between text-sm",children:[o.jsx("span",{className:"text-gray-600",children:"Annual Income"}),o.jsxs("span",{className:"font-medium",children:["฿",u.annualIncome.toLocaleString()]})]}),o.jsxs("div",{className:"flex justify-between text-sm",children:[o.jsx("span",{className:"text-gray-600",children:"Total Deductions"}),o.jsxs("span",{className:"font-medium",children:["-฿",u.totalDeductions.toLocaleString()]})]}),o.jsxs("div",{className:"flex justify-between text-sm",children:[o.jsx("span",{className:"text-gray-600",children:"Taxable Income"}),o.jsxs("span",{className:"font-medium",children:["฿",u.taxableIncome.toLocaleString()]})]}),o.jsxs("div",{className:"flex justify-between text-sm border-t border-gray-200 pt-2",children:[o.jsx("span",{className:"text-gray-600",children:"Annual Tax"}),o.jsxs("span",{className:"font-medium",children:["฿",u.annualTax.toLocaleString("en-US",{maximumFractionDigits:0})]})]})]}),o.jsxs("button",{onClick:()=>r(!a),className:"w-full py-2 text-blue-600 font-medium flex items-center justify-center gap-2 hover:bg-blue-50 rounded-lg mb-4",children:[a?"Hide Details":"Show All Values & Edit",o.jsx("span",{children:a?"▲":"▼"})]}),a&&o.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 mb-6",children:[o.jsx("p",{className:"text-sm text-gray-500 mb-4",children:"Edit values below to see how changes affect your tax estimate. Changes update instantly."}),o.jsx("div",{className:"space-y-3",children:c.map(d=>o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsx("span",{className:"text-sm text-gray-700",children:d.label}),d.editable?o.jsxs("div",{className:"relative",children:[i===d.key?o.jsx("input",{type:"text",value:d.value.toLocaleString(),onChange:y=>f(d.key,y.target.value,d.maxValue),onBlur:()=>s(null),autoFocus:!0,className:"w-32 px-2 py-1 text-right border border-blue-500 rounded text-sm focus:ring-2 focus:ring-blue-500"}):o.jsxs("button",{onClick:()=>s(d.key),className:"w-32 px-2 py-1 text-right text-blue-600 hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 text-sm",children:["฿",d.value.toLocaleString(),o.jsx("span",{className:"ml-1 text-xs",children:"✎"})]}),d.maxValue&&o.jsxs("p",{className:"text-xs text-gray-400 text-right",children:["Max: ฿",d.maxValue.toLocaleString()]})]}):o.jsxs("span",{className:"text-sm text-gray-500 w-32 text-right",children:["฿",d.value.toLocaleString(),o.jsx("span",{className:"ml-1 text-xs text-gray-400",children:"(fixed)"})]})]},d.key))})]}),o.jsx("button",{onClick:n,className:"w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300",children:"Start Over"})]})},fg=()=>({salary:0,bonus:0,housingAllowance:0,otherIncome:0});function wu(){return{estimateType:"",incomeType:"",monthlySalary:0,annualBonus:0,annualOtherIncome:0,variableIncome:Array(12).fill(null).map(()=>fg()),includeSocialSecurity:!1,socialSecurityContribution:0,maritalStatus:"",spouseHasNoIncome:!1,isAge65OrOlder:!1,children:[],childrenEligibilityConfirmed:!1,numberOfParents:0,parentsEligibilityConfirmed:!1,hasLifeInsurance:!1,lifeInsurance:0,hasHealthInsurance:!1,healthInsurance:0,hasPensionFund:!1,pensionFund:0,hasProvidentFund:!1,providentFund:0,hasRMF:!1,rmf:0,hasSSF:!1,ssf:0,hasDonations:!1,donations:0}}const pg=()=>{var m,h;const[e,t]=x.useState(0),[n,a]=x.useState(wu),[r,i]=x.useState(!1),s=()=>{t(e+1)},l=()=>{c()?(i(!1),t(e+1)):i(!0)},u=()=>{e>0&&(i(!1),t(e-1))},c=()=>{var w,N;switch((w=y[e])==null?void 0:w.id){case"estimate-type":return n.estimateType!=="";case"income-type":return n.incomeType!=="";case"monthly-income":return n.monthlySalary>0;case"variable-income":return((N=n.variableIncome)==null?void 0:N.length)===12?n.variableIncome.reduce((I,ie)=>I+ie.salary+ie.bonus+ie.housingAllowance+ie.otherIncome,0)>0:!1;case"marital-status":return n.maritalStatus!=="";case"dependents":const k=!n.childrenEligibilityConfirmed||n.children.length>0,C=!n.parentsEligibilityConfirmed||n.numberOfParents>0;return k&&C;case"deductions":return[{has:n.hasLifeInsurance,amount:n.lifeInsurance},{has:n.hasHealthInsurance,amount:n.healthInsurance},{has:n.hasPensionFund,amount:n.pensionFund},{has:n.hasProvidentFund,amount:n.providentFund},{has:n.hasRMF,amount:n.rmf},{has:n.hasSSF,amount:n.ssf},{has:n.hasDonations,amount:n.donations}].every(O=>!O.has||O.amount>0);default:return!0}},f=()=>{a(wu()),t(0)},d=p=>{p>=0&&p<y.length&&t(p)},y=x.useMemo(()=>{const p=[];return p.push({id:"estimate-type",title:"Estimate Type",component:o.jsx(ng,{formData:n,setFormData:a,nextStep:s})}),p.push({id:"income-type",title:"Income Type",component:o.jsx(rg,{formData:n,setFormData:a,nextStep:s})}),n.incomeType==="variable"?p.push({id:"variable-income",title:"Monthly Income",component:o.jsx(ug,{formData:n,setFormData:a,nextStep:l,showValidationErrors:r})}):p.push({id:"monthly-income",title:"Assessable Income",component:o.jsx(og,{formData:n,setFormData:a,nextStep:l,showValidationErrors:r})}),n.estimateType==="detailed"&&(p.push({id:"marital-status",title:"Marital Status",component:o.jsx(cg,{formData:n,setFormData:a,nextStep:s,showValidationErrors:r})}),p.push({id:"dependents",title:"Dependents",component:o.jsx(dg,{formData:n,setFormData:a,nextStep:l,showValidationErrors:r})}),p.push({id:"deductions",title:"Deductions",component:o.jsx(hg,{formData:n,setFormData:a,nextStep:l,showValidationErrors:r})})),p.push({id:"results",title:"Results",component:o.jsx(mg,{formData:n,setFormData:a,onStartOver:f})}),p},[n,e]),g=y.length,v=e===g-1,T=e===0,b=(e+1)/g*100;return o.jsxs("div",{className:"bg-gray-100 min-h-screen flex items-center justify-center py-8 px-4",children:[o.jsxs(jt,{children:[o.jsx("title",{children:"Monthly Tax Withholding Estimator | Thai Tax Calculator"}),o.jsx("meta",{name:"description",content:"Estimate how much Thai income tax should be withheld from your monthly salary. Free calculator for salaried employees and freelancers in Thailand."}),o.jsx("link",{rel:"canonical",href:"https://mythaitaxes.com/monthly-withholding/"})]}),o.jsxs("div",{className:"bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-2xl w-full",children:[o.jsx("h1",{className:"sr-only",children:"Monthly Tax Withholding Estimator"}),o.jsxs("div",{className:"flex justify-between items-center mb-6",children:[o.jsxs(W,{to:"/",className:"text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm","aria-label":"Go to home page",children:[o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:o.jsx("path",{d:"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"})}),"Home"]}),!v&&o.jsx("button",{onClick:f,className:"text-red-500 hover:text-red-700 text-sm","aria-label":"Start over",children:"Start Over"})]}),o.jsxs("div",{className:"mb-8",children:[o.jsxs("div",{className:"flex justify-between items-center mb-2",children:[o.jsxs("span",{className:"text-sm font-medium text-gray-700",children:["Step ",e+1," of ",g,": ",(m=y[e])==null?void 0:m.title]}),o.jsxs("span",{className:"text-sm text-gray-500",children:[Math.round(b),"%"]})]}),o.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2.5",children:o.jsx("div",{className:"bg-blue-500 h-2.5 rounded-full transition-all duration-300",style:{width:`${b}%`},role:"progressbar","aria-valuenow":e+1,"aria-valuemin":1,"aria-valuemax":g})}),o.jsx("div",{className:"flex justify-between mt-3",children:y.map((p,w)=>o.jsxs("button",{onClick:()=>w<e&&d(w),disabled:w>=e,className:`flex flex-col items-center group ${w<e?"cursor-pointer":"cursor-default"}`,"aria-label":`${w<e?"Go to ":""}Step ${w+1}: ${p.title}`,children:[o.jsx("div",{className:`w-3 h-3 rounded-full transition-all ${w<e?"bg-blue-500 group-hover:bg-blue-600":w===e?"bg-blue-500 ring-2 ring-blue-200":"bg-gray-300"}`}),o.jsx("span",{className:`text-xs mt-1 hidden md:block ${w===e?"text-blue-600 font-medium":"text-gray-400"}`,children:p.title})]},p.id))})]}),o.jsx("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4",children:o.jsx("p",{className:"text-sm text-blue-700",children:"This estimate is based on Thai tax rules for Fiscal Year 2026."})}),o.jsx("div",{className:"min-h-[300px]",children:(h=y[e])==null?void 0:h.component}),!v&&!T&&o.jsxs("div",{className:"flex justify-between mt-8 pt-6 border-t border-gray-200",children:[o.jsxs("button",{onClick:u,className:"px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2","aria-label":"Go to previous step",children:[o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",viewBox:"0 0 20 20",fill:"currentColor",children:o.jsx("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})}),"Previous"]}),o.jsxs("button",{onClick:l,className:"px-6 py-2 rounded-lg transition-colors flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600","aria-label":"Go to next step",children:["Next",o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",viewBox:"0 0 20 20",fill:"currentColor",children:o.jsx("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})})]})]})]})]})},ka=({article:e})=>o.jsx(W,{to:`/articles/${e.slug}/`,className:"block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden",children:o.jsxs("div",{className:"p-5",children:[o.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[o.jsx("span",{className:"text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded",children:e.category}),o.jsxs("span",{className:"text-xs text-gray-500",children:[e.readTime," min read"]})]}),o.jsx("h3",{className:"font-semibold text-gray-900 mb-2 line-clamp-2",children:e.title}),o.jsx("p",{className:"text-gray-600 text-sm line-clamp-2",children:e.excerpt})]})}),yg="ca-pub-4471962643516217",gg={leaderboard:{width:728,height:90},rectangle:{width:300,height:250},"mobile-banner":{width:320,height:100}},kn=({size:e,adSlot:t,className:n=""})=>{const a=x.useRef(null),r=x.useRef(!1),i=gg[e];return x.useEffect(()=>{if(!r.current)try{a.current&&window.adsbygoogle&&(window.adsbygoogle.push({}),r.current=!0)}catch(s){console.error("AdSense error:",s)}},[]),o.jsx("div",{className:`flex items-center justify-center ${n}`,style:{maxWidth:i.width,minHeight:i.height,width:"100%"},"aria-label":"Advertisement",role:"complementary",children:o.jsx("ins",{ref:a,className:"adsbygoogle",style:{display:"block",width:i.width,height:i.height},"data-ad-client":yg,"data-ad-slot":t})})};function xg(e,t){return t==="monthly"?e*12:t==="weekly"?e*52:e}function vg(e,t){const n=Math.min(e*Xn.STANDARD_DEDUCTION_RATE,Xn.MAX_STANDARD_DEDUCTION),a=Xn.PERSONAL_ALLOWANCE,r=t?Xn.MAX_SOCIAL_SECURITY:0,i=Math.max(0,e-n-a-r),s=uh(i);return{annualTax:s,monthlyTax:s/12,taxableIncome:i}}function Yn(e){return Math.round(e).toLocaleString("en-US")}const bu={yearly:"Yearly",monthly:"Monthly",weekly:"Weekly"},Tg=()=>{const[e,t]=x.useState("monthly"),[n,a]=x.useState(""),[r,i]=x.useState(!0),s=parseFloat(n.replace(/,/g,""))||0,l=xg(s,e),c=s>0?vg(l,r):null,f=x.useCallback(d=>{const y=d.target.value.replace(/[^0-9.]/g,"");a(y)},[]);return o.jsx("div",{className:"max-w-2xl mx-auto px-4 mb-8",children:o.jsxs("div",{className:"bg-white rounded-2xl shadow-lg p-6 border border-gray-100",children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-1",children:"Quick Tax Estimate"}),o.jsx("p",{className:"text-sm text-gray-500 mb-5",children:"Salaried income — standard deductions and personal allowance applied automatically."}),o.jsx("div",{className:"flex gap-1 bg-gray-100 rounded-lg p-1 mb-4 w-fit",children:["yearly","monthly","weekly"].map(d=>o.jsx("button",{onClick:()=>t(d),className:`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${e===d?"bg-white text-blue-600 shadow-sm":"text-gray-500 hover:text-gray-700"}`,children:bu[d]},d))}),o.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[o.jsxs("div",{className:"relative flex-1",children:[o.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium select-none",children:"฿"}),o.jsx("input",{type:"text",inputMode:"numeric",value:n,onChange:f,placeholder:e==="yearly"?"600,000":e==="monthly"?"50,000":"12,500",className:"w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"})]}),o.jsxs("span",{className:"text-gray-400 text-sm whitespace-nowrap",children:[bu[e].toLowerCase()," income"]})]}),o.jsxs("label",{className:"flex items-center gap-2.5 mb-5 cursor-pointer select-none group w-fit",children:[o.jsx("input",{type:"checkbox",checked:r,onChange:d=>i(d.target.checked),className:"w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"}),o.jsxs("span",{className:"text-sm text-gray-600 group-hover:text-gray-800 transition-colors",children:["Include social security deduction",o.jsxs("span",{className:"text-gray-400 ml-1",children:["(฿",Yn(Xn.MAX_SOCIAL_SECURITY),"/yr)"]})]})]}),c?o.jsxs("div",{className:"bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-4",children:[o.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[o.jsxs("div",{children:[o.jsx("p",{className:"text-xs font-medium text-blue-500 uppercase tracking-wide mb-1",children:"Annual Tax"}),o.jsxs("p",{className:"text-2xl font-bold text-gray-900",children:["฿",Yn(c.annualTax)]})]}),o.jsxs("div",{children:[o.jsx("p",{className:"text-xs font-medium text-blue-500 uppercase tracking-wide mb-1",children:"Per Month"}),o.jsxs("p",{className:"text-2xl font-bold text-gray-900",children:["฿",Yn(c.monthlyTax)]})]})]}),o.jsx("div",{className:"mt-3 pt-3 border-t border-blue-100",children:o.jsxs("p",{className:"text-xs text-gray-500",children:["Based on ฿",Yn(l)," annual income · ฿",Yn(c.taxableIncome)," taxable"]})})]}):o.jsx("div",{className:"bg-gray-50 rounded-xl p-5 mb-4 text-center text-gray-400 text-sm",children:"Enter your income above to see your estimate"}),o.jsx("p",{className:"text-xs text-gray-400",children:"Need deductions for insurance, provident fund, dependents, or detailed withholding? Use the full calculators below."})]})})},Cn=[{slug:"how-to-use-the-thai-tax-calculator",title:"How to Use the Thai Tax Calculator",excerpt:"A complete guide to calculating your annual tax or monthly withholding, downloading a personal filing packet, and keeping records for future reference.",content:`
## What This Calculator Does

The Thai Tax Calculator is a free tool designed to help individuals living and working in Thailand estimate their personal income tax liability and understand what they owe — or may get back — at the end of the tax year.

It supports four employment types commonly found among expats, freelancers, and local residents:

- **Salaried employees** — employed full-time under a Thai employment contract
- **Freelancers and self-employed individuals** — earning income from multiple clients or sources
- **Sole proprietors** — running a registered business under their own name
- **Company owners and directors** — drawing a salary and/or dividends from a Thai company

---

## The Two Calculators

### Annual Tax Calculator

This is the main tool. It walks you through a step-by-step form to calculate your total tax liability for a full calendar year. The questions cover:

- Your employment type and total annual income
- Marital status and spouse income
- Dependents (children, parents, elderly relatives)
- Deductions you're entitled to claim — including life and health insurance premiums, social security contributions, provident fund or RMF/SSF contributions, and charitable donations
- Tax already withheld from your salary or invoices throughout the year
- For freelancers and non-residents: foreign income, tax residency, and any applicable double tax agreements

At the end, you'll see a full breakdown of your taxable income, applicable deductions, tax bracket calculations, total tax owed, and whether you're due a refund or have a remaining balance to pay.

### Monthly Withholding Estimator

This lighter tool helps you check whether the right amount of tax is being deducted from your monthly paycheck. It's useful for:

- Verifying your employer's withholding is correct
- Estimating the impact of a salary change or bonus on your monthly tax
- Planning your cash flow throughout the year

It supports both fixed monthly salaries and variable income, and accounts for bonuses and other payments.

---

## Deductions and Allowances Covered

Both calculators apply Thailand's standard personal income tax allowances:

| Allowance | Amount |
|---|---|
| Personal allowance | 60,000 THB |
| Spouse allowance (no income) | 60,000 THB |
| Child allowance | 30,000 THB per child |
| Child born from 2018 onward | Additional 30,000 THB |
| Parent allowance | 30,000 THB per parent |
| Life insurance premiums | Up to 100,000 THB |
| Health insurance premiums | Up to 25,000 THB |
| Social Security Fund (SSF) | Up to 30% of income, max 200,000 THB |
| Retirement Mutual Fund (RMF) | Up to 30% of income, max 500,000 THB |
| Charitable donations | Up to 10% of net income |

For salaried employees, a standard employment income deduction of 50% (up to 100,000 THB) is applied automatically.

---

## Downloading Your Filing Packet

After completing the Annual Tax Calculator, you can download a **personal filing packet** as a PDF.

This document is designed to support your annual tax filing — either when completing the PND 90 or PND 91 form yourself, or when working with an accountant or tax agent. It is not an official filing document, but a personal summary and reference tool.

### What the PDF Includes

The filing packet is organized into clearly labeled sections:

1. **Cover summary** — A one-page overview showing your employment type, total income, total tax owed or refund amount, and effective tax rate for the year.
2. **Income breakdown** — A detailed record of all income sources entered, including salary, freelance income, dividends, and any foreign income declared.
3. **Allowances and deductions** — Every allowance and deduction applied to your calculation, with amounts, so you can verify entries and reference them during filing.
4. **Tax calculation** — A step-by-step view of how your tax was calculated, including the progression through Thailand's tax brackets and total withholding already paid.
5. **Supporting documents checklist** — A personalized checklist of the documents you'll likely need to gather before filing — such as employer withholding certificates (50 tawi), insurance receipts, and fund statements. The checklist adjusts based on your specific situation.
6. **Preparer notes** *(freelancers and sole proprietors only)* — Notes on common considerations for self-employed filers, including expense deduction method choices and quarterly estimated tax obligations.

### How to Use the PDF for Record Keeping

The filing packet is useful beyond just the filing moment:

- **Keep a copy for your records.** Thailand's Revenue Department can audit returns for up to 5 years. Having a clear record of what you declared and why supports your position in the event of any queries.
- **Share with an accountant.** If you use a tax agent or accountant to file on your behalf, the packet gives them a clear picture of your situation before they prepare the official forms.
- **Track year-over-year changes.** Saving packets from each year makes it easy to compare your income, deductions, and tax position over time.
- **Reference during filing.** The checklist page tells you which physical documents to locate before you sit down to file, reducing last-minute scrambling.

---

## Who This Tool Is For

This calculator is intended for:

- **Expats and foreign nationals** living in Thailand who need to understand their filing obligations
- **Freelancers and digital nomads** who earn income from multiple sources and want to estimate what they owe
- **Salaried employees** who want to verify their employer's withholding or plan for year-end
- **Business owners** drawing income from a Thai company
- **Anyone new to the Thai tax system** who wants a clear, guided explanation of how it applies to their situation

---

## Important Notes

This tool provides estimates based on information you enter and standard Thai personal income tax rules. It is intended for general guidance only and does not constitute professional tax advice. For complex situations — particularly those involving foreign income, double tax agreements, or business structures — consider consulting a licensed Thai tax advisor or accountant.

Tax laws can change. Always verify current rates and thresholds with the Thai Revenue Department or a qualified professional before filing.
    `,publishedAt:"2026-02-22",readTime:7,category:"Guide",sources:[{label:"Thai Revenue Department (rd.go.th)",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"understanding-thai-tax-residency",title:"Thai Tax Residency: The 180-Day Rule Explained",excerpt:"Learn how Thailand determines your tax residency status, what the 180-day rule means in practice, and how it affects your income tax obligations as an expat.",content:`
## What is Tax Residency?

Tax residency determines which country has the right to tax your income. In Thailand, the rules are straightforward but important to understand.

## The 180-Day Rule

Thailand uses a simple test to determine tax residency: if you spend 180 days or more in Thailand during a calendar year, you are considered a Thai tax resident.

### Key Points:
- Days are counted per calendar year (January to December)
- Partial days typically count as full days
- The days don't need to be consecutive

## Tax Implications

**As a Thai Tax Resident:**
- You are taxed on income earned in Thailand
- You may be taxed on foreign-sourced income brought into Thailand
- You must file an annual tax return if your income exceeds the filing threshold

**As a Non-Resident:**
- You are only taxed on income earned within Thailand
- Different withholding rates may apply
- You may still need to file depending on your income type

## Planning Tips

1. Keep records of your travel in and out of Thailand
2. Understand the timing of your income remittances
3. Consider tax treaties between Thailand and your home country
4. Consult with a tax professional for complex situations
    `,publishedAt:"2024-01-15",readTime:5,category:"Tax Basics",sources:[{label:"Thai Revenue Department — Tax Residency & Personal Income Tax",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"maximizing-tax-deductions-thailand",title:"Maximizing Your Tax Deductions in Thailand",excerpt:"A comprehensive guide to the allowances, deductions, and personal tax credits available to legally reduce your Thai income tax liability each year.",content:`
## Personal Allowances

Thailand offers several personal allowances that reduce your taxable income:

### Standard Allowances:
- **Personal Allowance:** 60,000 THB
- **Spouse Allowance:** 60,000 THB (if spouse has no income)
- **Child Allowance:** 30,000 THB per child (legitimate children only)

## Common Deductions

### Social Security
Contributions to Thai social security are deductible up to the maximum contribution amount.

### Life Insurance
Life insurance premiums are deductible up to 100,000 THB annually.

### Health Insurance
Health insurance premiums are deductible up to 25,000 THB annually, increased from previous years.

### Retirement Funds
- **SSF (Super Savings Fund):** Up to 30% of income, max 200,000 THB
- **RMF (Retirement Mutual Fund):** Up to 30% of income, max 500,000 THB
- **Provident Fund:** Up to 15% of salary

### Housing Loan Interest
Interest on housing loans is deductible up to 100,000 THB annually.

## Tips for Maximizing Deductions

1. **Plan Early:** Many deductions require purchases before year-end
2. **Keep Documentation:** Maintain receipts and certificates
3. **Understand Limits:** Some deductions have combined caps
4. **Consider Timing:** Some investments have minimum holding periods
    `,publishedAt:"2024-02-01",readTime:7,category:"Deductions",sources:[{label:"Thai Revenue Department — Deductions & Allowances",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"thai-tax-brackets-explained",title:"Thai Income Tax Rates and Brackets 2025/2026",excerpt:"Understand how Thailand's progressive tax rates work, what each bracket means for your salary, and how to calculate your effective tax rate.",content:`
## Progressive Tax System

Thailand uses a progressive tax system where higher income is taxed at higher rates. Only the income within each bracket is taxed at that rate.

## 2024 Tax Brackets

| Taxable Income (THB) | Tax Rate |
|---------------------|----------|
| 0 - 150,000 | Exempt |
| 150,001 - 300,000 | 5% |
| 300,001 - 500,000 | 10% |
| 500,001 - 750,000 | 15% |
| 750,001 - 1,000,000 | 20% |
| 1,000,001 - 2,000,000 | 25% |
| 2,000,001 - 5,000,000 | 30% |
| Over 5,000,000 | 35% |

## How It Works

The first 150,000 THB of taxable income is always exempt. Then each subsequent bracket applies only to the income within that range.

### Example Calculation

For a taxable income of 600,000 THB:
- First 150,000: 0 THB (exempt)
- 150,001 - 300,000: 7,500 THB (150,000 × 5%)
- 300,001 - 500,000: 20,000 THB (200,000 × 10%)
- 500,001 - 600,000: 15,000 THB (100,000 × 15%)
- **Total Tax: 42,500 THB**
- **Effective Rate: 7.08%**

## Key Takeaways

1. Your marginal rate applies only to income in that bracket
2. The effective rate is always lower than your top bracket
3. Deductions reduce your taxable income before applying brackets
4. Use our calculator to see your exact breakdown
    `,publishedAt:"2024-02-15",readTime:4,category:"Tax Basics",sources:[{label:"Thai Revenue Department — Personal Income Tax Rates",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"expat-guide-filing-thai-taxes",title:"Thai Tax Return for Expats: PND 90/91 Guide",excerpt:"A step-by-step guide for expats on filing a Thai annual tax return using PND 90 or PND 91 — including deadlines, required documents, and how to file online.",content:`
## Who Must File?

You must file a Thai tax return if:
- You are a Thai tax resident (180+ days in Thailand)
- Your annual income exceeds 120,000 THB (single) or 220,000 THB (married)
- You have Thai-sourced income subject to tax

## Filing Deadline

The deadline for filing your annual tax return is **March 31** of the following year. For example, 2024 income must be filed by March 31, 2025.

Online filing via the RD Smart Tax app may extend this deadline by 8 days.

## Required Documents

1. **Tax Certificates (Withholding Tax Certificates)**
   - From your employer (Form 50 Tawi)
   - From banks (interest income)
   - From other payers
2. **Personal Documents**
   - Thai ID or passport
   - Tax ID number
3. **Supporting Documents**
   - Marriage certificate (for spouse allowance)
   - Birth certificates (for child allowance)
   - Insurance premium receipts
   - Donation receipts

## Filing Methods

### Online (Recommended)
- RD Smart Tax app
- E-filing via rd.go.th
- Faster processing and longer deadline

### In Person
- Visit your local Revenue Department office
- Bring all original documents
- Submit before March 31

## Common Mistakes to Avoid

1. Missing the deadline
2. Forgetting to claim allowances
3. Not reporting all income sources
4. Incorrect calculations
5. Missing required attachments
    `,publishedAt:"2024-03-01",readTime:6,category:"Filing",sources:[{label:"Thai Revenue Department — Filing & Forms (PND 90/91)",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"foreign-income-thailand-tax",title:"Foreign Income in Thailand: When Is It Taxable?",excerpt:"Learn when foreign-sourced income is taxable in Thailand under the 2024 remittance rule, and how to determine what you need to declare and pay tax on.",content:`
## The Remittance Rule

Thailand historically taxed foreign-sourced income only if:
1. You are a Thai tax resident
2. The income is remitted (brought) into Thailand
3. The income is remitted in the same year it was earned

## Recent Changes

The Revenue Department has announced changes to foreign income taxation. Starting from 2024, foreign-sourced income brought into Thailand may be taxable regardless of when it was earned.

### Key Changes:
- Income earned in prior years may now be taxable when remitted
- Stricter enforcement expected
- Some exemptions still apply

## Types of Foreign Income

### Employment Income
Income from work performed outside Thailand while employed by a foreign company.

### Investment Income
Dividends, interest, and capital gains from foreign investments.

### Rental Income
Income from properties located outside Thailand.

### Business Income
Profits from businesses operated outside Thailand.

## Tax Treaties

Thailand has tax treaties with many countries that may:
- Reduce withholding rates
- Provide exemptions for certain income types
- Allow foreign tax credits

### Common Treaty Partners:
- United States
- United Kingdom
- Australia
- Singapore
- Japan
- Germany

## Planning Strategies

1. **Timing:** Consider when to remit foreign income
2. **Documentation:** Keep records of income sources and dates
3. **Tax Credits:** Claim credits for taxes paid abroad
4. **Professional Advice:** Complex situations require expert guidance
    `,publishedAt:"2024-03-15",readTime:8,category:"International",sources:[{label:"Thai Revenue Department — Foreign Income & Tax Treaties",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"social-security-contributions-thailand",title:"Thai Social Security Contributions Explained",excerpt:"Everything you need to know about Thai social security contributions — how much you pay, what benefits you receive, and how it interacts with your income tax.",content:`
## Overview

Thailand's social security system provides coverage for employees in companies with one or more employees. Contributions are shared between employer and employee.

## Contribution Rates

| Party | Contribution Rate | Maximum Monthly Contribution |
|-------|------------------|------------------------------|
| Employee | 5% | 875 THB |
| Employer | 5% | 875 THB |
| Government | 2.75% | - |

The maximum wage base for contributions is 17,500 THB per month.

## 2026 Changes

Starting January 2026, the social security contribution ceiling increased significantly:

|  Max   | Before 2026 | From 2026 |
|--|-------------|-----------|
| Maximum wage base | 15,000 THB | 17,500 THB |
| Maximum employee contribution | 750 THB/month | 875 THB/month |
| Maximum annual deduction | 9,000 THB | 10,500 THB |

### What This Means for You

- **Higher earners pay more:** If you earn over 15,000 THB/month, your contributions increased
- **Better benefits:** Higher contributions support improved social security coverage
- **Tax deduction increased:** You can now deduct up to 10,500 THB annually instead of 9,000 THB

## Coverage Benefits

### Medical Care
- Outpatient and inpatient treatment
- Dental care (limited)
- Maternity benefits

### Disability
- Monthly payments for work-related disabilities
- Non-work related disability coverage

### Death Benefits
- Funeral grant
- Survivor benefits

### Unemployment
- 30-50% of salary for up to 6 months
- Requires minimum contribution period

### Retirement
- Monthly pension after age 55
- Requires minimum 180 months of contributions

## Tax Treatment

Social security contributions are:
- Deductible from your taxable income
- Limited to actual contributions (max 10,500 THB annually from 2025)

## For Expats

- Mandatory for employees of Thai companies
- Exemptions may apply under bilateral agreements
- Benefits continue after leaving employment (subject to conditions)
    `,publishedAt:"2025-01-15",readTime:6,category:"Employment",sources:[{label:"Social Security Office of Thailand (sso.go.th)",url:"https://www.sso.go.th/"},{label:"Thai Revenue Department — Social Security Deduction",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"freelancer-tax-guide-thailand",title:"Thai Tax Guide for Freelancers",excerpt:"Complete guide to Thai tax as a freelancer — income types, deductions, withholding tax, PND filing deadlines, and tips for staying compliant in Thailand.",content:`
## Freelancing in Thailand

Whether you're a digital nomad, consultant, or independent professional, understanding your tax obligations is essential for compliance and financial planning.

## Income Categories for Freelancers

Thai tax law classifies income into categories under Section 40 of the Revenue Code. As a freelancer, your income likely falls under one of these:

### Section 40(2) - Employment-like Services
- Contract work resembling employment
- Fees for services with specific deliverables

### Section 40(6) - Liberal Professions
- Doctors, lawyers, accountants, engineers
- Architects, artists, and performers
- Flat-rate deduction: 30% (up to 60% for certain professions)

### Section 40(7) - Contractors
- Construction and installation work
- Project-based technical services
- Flat-rate deduction: 40%

### Section 40(8) - Business Income
- Trading, selling goods
- General services and consulting
- Flat-rate deduction: 60%

## Expense Deductions

You have two options for expense deductions:

### Flat-Rate Method
- Simple, no documentation required
- Fixed percentage based on income type
- Best for those with low actual expenses

### Actual Expense Method
- Requires detailed records and receipts
- Better if actual expenses exceed flat rate
- Must maintain proper accounting

## Filing Requirements

### PND90 (Annual Return)
- Due by March 31 (or April 8 online)
- Required if income exceeds 60,000 THB (single) or 120,000 THB (married)

### PND94 (Mid-Year Return)
- Due by September 30
- Required for income received January-June exceeding thresholds
- Acts as prepayment toward annual tax

## Tips for Freelancers

1. **Track Everything:** Keep receipts and records for all business expenses
2. **Set Aside Tax Money:** Reserve 10-20% of income for taxes
3. **Understand Withholding:** Clients may withhold 3% tax at source
4. **Consider Registration:** Formal business registration may offer benefits
    `,publishedAt:"2024-04-15",readTime:8,category:"Freelance",sources:[{label:"Thai Revenue Department — Revenue Code Section 40",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"flat-rate-vs-actual-expenses",title:"Flat-Rate vs Actual Expenses: Which Is Better?",excerpt:"Learn how to choose between Thailand's flat-rate and actual expense deduction methods to legally minimise your tax bill as a freelancer or sole proprietor.",content:`
## Understanding Your Options

Thai tax law allows self-employed individuals and freelancers to choose between two expense deduction methods. Choosing wisely can significantly reduce your tax bill.

## Flat-Rate Deduction

### How It Works
The government allows a fixed percentage deduction based on your income type, no questions asked.

### Flat-Rate Percentages by Income Type

| Income Type | Section | Flat Rate |
|------------|---------|-----------|
| Liberal Professions (medical, legal) | 40(6) | 60% |
| Liberal Professions (other) | 40(6) | 30% |
| Contractors | 40(7) | 40% |
| Business/Trading | 40(8) | 60% |
| Rental Income | 40(5) | 30% |

### Pros:
- Simple, no documentation needed
- Guaranteed deduction percentage
- Less administrative burden

### Cons:
- May be lower than actual expenses
- One-size-fits-all approach
- Can't claim specific high expenses

## Actual Expense Deduction

### How It Works
Deduct your real business expenses with proper documentation.

### Eligible Expenses:
- Office rent and utilities
- Equipment and supplies
- Professional services (accounting, legal)
- Travel for business purposes
- Marketing and advertising
- Software and subscriptions
- Internet and phone (business portion)

### Pros:
- Potentially higher deductions
- Reflects true business costs
- Fair for high-expense businesses

### Cons:
- Requires meticulous record-keeping
- Subject to audit scrutiny
- More time-consuming

## How to Choose

### Use Flat-Rate When:
- Your actual expenses are below the flat rate
- You have poor expense documentation
- You want simplicity over optimization
- You're just starting out

### Use Actual Expenses When:
- Your expenses exceed the flat rate
- You have good accounting systems
- You have significant equipment costs
- You rent expensive office space

## Example Comparison

**Scenario:** Consultant earning 1,000,000 THB with 450,000 THB actual expenses

| Method | Deduction | Taxable Income |
|--------|-----------|----------------|
| Flat-Rate (40%) | 400,000 THB | 600,000 THB |
| Actual Expenses | 450,000 THB | 550,000 THB |

**Winner:** Actual expenses saves approximately 7,500 THB in tax.

## Our Calculator's Auto-Compare Feature

Our calculator automatically computes both methods and shows you which option results in lower taxes, taking the guesswork out of the decision.
    `,publishedAt:"2024-05-01",readTime:7,category:"Freelance",sources:[{label:"Thai Revenue Department — Expense Deductions for Self-Employed",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"pnd94-mid-year-tax-filing",title:"PND 94: Mid-Year Tax Filing for Thai Freelancers",excerpt:"Learn when and how to file your PND 94 mid-year return as a self-employed person in Thailand — deadlines, how to calculate your liability, and common mistakes.",content:`
## What is PND94?

PND94 is a mid-year tax return required for individuals with income from certain categories, primarily self-employed and business income (Sections 40(5) through 40(8)).

## Who Must File PND94?

You must file PND94 if:
- You received income under Sections 40(5), 40(6), 40(7), or 40(8)
- Your income from January to June exceeds:
  - **60,000 THB** if single
  - **120,000 THB** if married filing jointly

## Filing Deadline

**September 30** of the same tax year.

For income received January-June 2024, file by September 30, 2024.

Online filing via RD Smart Tax may extend this by 8 days.

## How PND94 Works

### Step 1: Calculate Mid-Year Income
Total all qualifying income received from January 1 to June 30.

### Step 2: Estimate Annual Income
Project your full-year income (you can estimate the July-December portion).

### Step 3: Calculate Tax on Annual Estimate
Apply standard deductions and tax brackets to estimated annual income.

### Step 4: Pay Half the Estimated Tax
PND94 requires payment of 50% of your estimated annual tax liability.

## Example Calculation

**Mid-year income:** 400,000 THB
**Estimated annual income:** 800,000 THB
**Estimated annual tax:** 52,500 THB
**PND94 payment due:** 26,250 THB

## What Happens at Year-End?

When you file PND90 (annual return):
- Your actual annual income is calculated
- PND94 payment is credited against your total tax
- You either pay the difference or receive a refund

## Common Mistakes to Avoid

1. **Missing the deadline:** Penalties apply for late filing
2. **Underestimating income:** May result in penalty for underpayment
3. **Forgetting to file:** PND94 is separate from your annual return
4. **Not claiming deductions:** You can estimate deductions for mid-year filing

## Tips for Freelancers

- Set calendar reminders for September 30
- Keep running totals of income throughout the year
- Save money monthly for tax payments
- Consider quarterly estimated taxes if income is irregular
    `,publishedAt:"2024-05-15",readTime:6,category:"Freelance",sources:[{label:"Thai Revenue Department — PND 94 Form & Mid-Year Filing",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"withholding-tax-freelancers-thailand",title:"Withholding Tax for Thai Freelancers",excerpt:"How to track, document, and claim credit for withholding tax deducted by your Thai clients, reducing what you owe when you file your annual return.",content:`
## Understanding Withholding Tax

When Thai companies pay freelancers, they're often required to withhold tax at source and remit it to the Revenue Department on your behalf.

## Standard Withholding Rates

| Income Type | Withholding Rate |
|-------------|------------------|
| Service fees (40(2)) | 3% |
| Professional fees (40(6)) | 3% |
| Contractor payments (40(7)) | 3% |
| Advertising services | 2% |
| Transport services | 1% |
| Rental payments | 5% |

## How It Works

### Example:
You invoice a Thai company 100,000 THB for consulting services.

| Item | Amount |
|------|--------|
| Invoice total | 100,000 THB |
| Withholding tax (3%) | 3,000 THB |
| Amount received | 97,000 THB |

The company sends the 3,000 THB to the Revenue Department under your tax ID.

## Withholding Tax Certificates

### What to Collect
Request a **Withholding Tax Certificate (50 Tawi)** from every client who withholds tax.

### Information on the Certificate:
- Your name and tax ID
- Payer's name and tax ID
- Income amount
- Tax withheld
- Date of payment

### Why It Matters
Without certificates, you cannot claim credit for tax already paid!

## Claiming Your Credit

When filing your annual return:

1. **Total all withholding certificates**
2. **Enter total on PND90** in the withholding tax section
3. **Attach certificates** to your filing (or keep for records if filing online)
4. **Receive credit** against your calculated tax liability

## Refund Scenarios

If withholding tax exceeds your actual tax liability, you're entitled to a refund.

### Example:
- Annual income: 500,000 THB
- Tax withheld: 15,000 THB
- Actual tax owed: 12,500 THB
- **Refund due: 2,500 THB**

## Best Practices

1. **Request certificates immediately** after payment
2. **Verify tax ID** is correct on certificates
3. **Keep copies** of all certificates
4. **Track monthly** in a spreadsheet
5. **Reconcile annually** before filing

## What If a Client Won't Withhold?

Some clients, especially individuals or small businesses, may not withhold tax. In these cases:
- You're responsible for reporting full income
- No withholding credit available
- You'll pay full tax at filing time

## International Clients

Foreign clients typically don't withhold Thai tax. You must:
- Report full income received
- Pay tax at filing time
- No withholding credit applies
    `,publishedAt:"2024-06-01",readTime:7,category:"Freelance",sources:[{label:"Thai Revenue Department — Withholding Tax",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"vat-registration-freelancers",title:"VAT Registration for Freelancers in Thailand",excerpt:"Understanding VAT registration requirements, thresholds, and implications for high-earning freelancers in Thailand.",content:`
## VAT Basics

Value Added Tax (VAT) in Thailand is 7% and applies to the sale of goods and services. Most freelancers start exempt but must register once they exceed certain thresholds.

## The 1.8 Million THB Threshold

You **must register for VAT** if your annual turnover exceeds **1,800,000 THB**.

### What Counts as Turnover?
- Gross income from services
- Sales of goods
- Before any expense deductions

### Timeline:
Register within 30 days of exceeding the threshold.

## Voluntary Registration

You can register for VAT even below the threshold if:
- Your clients prefer working with VAT-registered suppliers
- You want to claim input VAT credits
- You're building toward the threshold

## How VAT Works for Freelancers

### Collecting VAT (Output Tax)
Add 7% VAT to your invoices:
- Service fee: 100,000 THB
- VAT (7%): 7,000 THB
- **Invoice total: 107,000 THB**

### Claiming VAT (Input Tax)
Recover VAT paid on business expenses:
- Office supplies: 10,700 THB (including 700 THB VAT)
- You can claim back the 700 THB

### Net VAT Payment
| Item | Amount |
|------|--------|
| VAT collected | 7,000 THB |
| VAT paid on expenses | 700 THB |
| **Net VAT due** | **6,300 THB** |

## Filing Requirements

### PP30 Monthly Return
- Due by the 15th of the following month
- Report all sales and purchases
- Pay net VAT due

### Record Keeping
- Maintain purchase and sales journals
- Keep tax invoices for 5 years
- Issue proper tax invoices to clients

## Implications of VAT Registration

### Pros:
- Claim input VAT on business purchases
- Professional image with corporate clients
- Required for government contracts

### Cons:
- Administrative burden
- Monthly filing requirements
- Cash flow impact (collect then remit)
- Penalties for non-compliance

## Avoiding Common Pitfalls

1. **Monitor your income** monthly to anticipate threshold
2. **Register on time** - late registration has penalties
3. **Issue proper invoices** with all required information
4. **File monthly** even if no transactions
5. **Keep immaculate records** for audits

## When to Get Help

Consider hiring an accountant if:
- You're approaching the threshold
- VAT calculations confuse you
- You have complex expense claims
- You want to focus on your work, not paperwork
    `,publishedAt:"2024-06-15",readTime:8,category:"Freelance",sources:[{label:"Thai Revenue Department — VAT Registration",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"digital-nomad-taxes-thailand",title:"Thai Taxes for Digital Nomads and Remote Workers",excerpt:"Tax guide for digital nomads in Thailand — covering residency rules, what foreign income is taxable, and how remote workers can stay compliant.",content:`
## The Digital Nomad Reality

Many remote workers live in Thailand while earning from foreign clients or employers. The tax implications can be complex.

## Key Questions to Answer

1. Are you a Thai tax resident? (180+ days)
2. Where is your income sourced?
3. Do you bring money into Thailand?
4. Do you have a valid work permit?

## Tax Residency Impact

### If You're a Thai Tax Resident (180+ Days):

**Pre-2024 Rule:**
Foreign income was taxable only if:
- Earned abroad AND
- Remitted to Thailand in the same year

**2024 Onwards:**
Foreign income remitted to Thailand is taxable regardless of when earned.

### If You're a Non-Resident (<180 Days):
- Only Thai-sourced income is taxable
- Foreign income generally not taxable in Thailand

## Common Scenarios

### Scenario 1: Remote Employee of Foreign Company
- Working from Thailand for a US company
- Paid into a US bank account
- **Thai tax:** Potentially taxable if remitted to Thailand as a resident

### Scenario 2: Freelancer with International Clients
- Multiple clients from various countries
- Paid via PayPal/Wise to Thai account
- **Thai tax:** Likely taxable as income brought into Thailand

### Scenario 3: Digital Nomad, <180 Days
- Moves between countries
- Not a Thai tax resident
- **Thai tax:** Generally no obligation for foreign income

## Practical Considerations

### Banking and Remittances
- Money transferred to Thai accounts = remittance
- ATM withdrawals from foreign cards = remittance
- Credit card payments in Thailand = grey area

### Documentation
- Track days in Thailand carefully
- Keep records of income sources
- Document when income was earned vs. remitted

## Tax Planning Strategies

### Legal Approaches:
1. **Stay under 180 days** if your situation allows
2. **Time remittances** strategically (pre-2024 income may be exempt)
3. **Use tax treaties** if your home country has one with Thailand
4. **Claim foreign tax credits** for taxes paid elsewhere

### What NOT to Do:
- Don't assume "no one checks" - enforcement is increasing
- Don't ignore filing requirements
- Don't mix earned years if you can document separately

## Work Permit Considerations

Technically, working remotely in Thailand requires a work permit. This is a legal grey area that many digital nomads navigate, but it's separate from tax obligations.

Tax obligations exist regardless of work permit status.

## Getting Professional Help

Given the complexity, consider consulting:
- A Thai tax accountant familiar with expat issues
- An international tax advisor
- Your home country's tax authority for treaty benefits

## The Bottom Line

Digital nomad taxation is evolving. Thailand is increasing enforcement on foreign income. Plan carefully, document thoroughly, and consider professional advice for your specific situation.
    `,publishedAt:"2024-07-01",readTime:9,category:"Freelance",sources:[{label:"Thai Revenue Department — Foreign Income & Remittance Rules",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"freelancer-record-keeping-thailand",title:"Record Keeping for Thai Freelancers",excerpt:"Essential record-keeping for Thai freelancers — what to save, how long to keep it, and how good records help you claim more deductions and handle a tax audit.",content:`
## Why Records Matter

Good record keeping helps you:
- Claim maximum legitimate deductions
- File accurate tax returns
- Survive a Revenue Department audit
- Make informed business decisions

## What to Keep

### Income Records
- Invoices issued to all clients
- Payment receipts and bank statements
- Withholding tax certificates (50 Tawi)
- Contracts and agreements

### Expense Records
- Receipts for all business purchases
- Tax invoices (for VAT purposes)
- Bank and credit card statements
- Utility bills (business portion)

### Supporting Documents
- Travel records and itineraries
- Meeting notes and project records
- Time tracking logs
- Mileage logs for vehicle expenses

## How Long to Keep Records

| Record Type | Retention Period |
|-------------|------------------|
| General tax records | 5 years |
| VAT records | 5 years |
| Asset purchase records | Life of asset + 5 years |
| Contracts | Duration + 5 years |

## Organizing Your Records

### Digital System (Recommended)
1. **Cloud storage** - Google Drive, Dropbox, or similar
2. **Folder structure:**
   \`\`\`
   2024/
   ├── Income/
   │   ├── Invoices/
   │   └── Withholding_Certificates/
   ├── Expenses/
   │   ├── Office/
   │   ├── Equipment/
   │   ├── Travel/
   │   └── Services/
   └── Banking/
   \`\`\`
3. **Scan receipts** immediately (use phone apps)
4. **Name files consistently** (YYYY-MM-DD_Vendor_Amount)

### Physical Records
- Keep originals in labeled folders
- Store in a safe, dry location
- Consider a fireproof safe for critical documents

## Monthly Routine

### Week 1: Collect
- Gather all receipts from the previous month
- Download bank statements
- Collect withholding certificates

### Week 2: Organize
- Scan and file physical receipts
- Categorize expenses
- Update your tracking spreadsheet

### Week 3: Reconcile
- Match bank transactions to receipts
- Identify missing documentation
- Follow up on outstanding invoices

### Week 4: Review
- Check income vs. expenses
- Estimate tax liability
- Adjust pricing or spending if needed

## Tools for Freelancers

### Accounting Software
- Wave (free)
- QuickBooks
- Xero
- Zoho Books

### Receipt Scanning
- Expensify
- Receipt Bank
- Adobe Scan (free)

### Spreadsheets
A simple Google Sheet can work:
| Date | Description | Category | Amount | VAT | Receipt |
|------|-------------|----------|--------|-----|---------|
| 2024-01-15 | Office supplies | Office | 500 | 33 | Yes |

## Audit Survival Tips

If the Revenue Department requests documentation:
1. **Stay calm** - audits are routine
2. **Respond promptly** to requests
3. **Provide organized records** - good organization shows professionalism
4. **Be honest** - never fabricate or alter documents
5. **Get help** - consider hiring an accountant for audit support

## Common Record-Keeping Mistakes

1. **Mixing personal and business** expenses
2. **Throwing away receipts** too soon
3. **Not backing up** digital records
4. **Waiting until tax time** to organize
5. **Keeping incomplete records** (missing dates, amounts, or purposes)
    `,publishedAt:"2024-07-15",readTime:8,category:"Freelance",sources:[{label:"Thai Revenue Department — Record Keeping Requirements",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"double-tax-agreements-thailand",title:"Thai Double Tax Treaties: Protecting Expats",excerpt:"Understand how Thailand's 61 double tax agreements work, who can claim foreign tax credits, and how to avoid paying tax twice on the same income.",content:`
## What is a Double Tax Agreement (DTA)?

A Double Tax Agreement (DTA) — also called a tax treaty — is a bilateral agreement between two countries designed to prevent the same income from being taxed twice. Thailand has signed DTAs with 61 countries as of 2025, one of the largest treaty networks in Southeast Asia.

For expats, DTAs are the primary legal tool to reduce or eliminate the risk of paying tax on the same income in both Thailand and your home country.

## Why DTAs Matter More After 2024

Prior to January 1, 2024, Thailand only taxed foreign income remitted in the same year it was earned. You could legally defer bringing money in until the following year and pay no Thai tax. That loophole is now closed.

**Under the new rules (effective January 1, 2024):**
- Any foreign income brought into Thailand by a Thai tax resident is taxable
- This applies regardless of when the income was earned
- DTAs are now the primary tool to avoid double taxation

## How the Foreign Tax Credit Works

Most of Thailand's DTAs use the **credit method**, meaning:

1. You pay tax in the source country (where income was earned)
2. You declare the income in Thailand
3. You claim a credit for taxes already paid abroad
4. The credit reduces (or eliminates) your Thai tax on that income

**Important limits:**
- The credit cannot exceed the Thai tax on that specific income
- If foreign tax rate > Thai rate, the excess cannot be refunded
- Credit only applies to income-type taxes (not VAT, sales tax, etc.)

### Example Calculation

You earn $50,000 (approx. 1.75 million THB) from a US employer.

| Item | Amount |
|------|--------|
| US federal income tax paid | 170,000 THB |
| Thai tax on this income (calculated) | 240,000 THB |
| Foreign tax credit | 170,000 THB (capped at US tax paid) |
| **Additional Thai tax owed** | **70,000 THB** |

Without the DTA, you would owe the full 240,000 THB on top of US taxes.

## Thailand's 61 DTA Countries

Thailand has tax treaties with the following countries:

**Asia & Pacific:** Australia, Bangladesh, Cambodia, China, Hong Kong, India, Indonesia, Japan, Laos, Malaysia, Mauritius, Myanmar, Nepal, New Zealand, Pakistan, Philippines, Singapore, South Korea, Sri Lanka, Taiwan, Vietnam

**Europe:** Armenia, Austria, Belarus, Belgium, Bulgaria, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Hungary, Ireland, Israel, Italy, Luxembourg, Netherlands, Norway, Poland, Romania, Russia, Seychelles, Slovenia, South Africa, Spain, Sweden, Switzerland, Tajikistan, Turkey, Ukraine, United Kingdom, Uzbekistan

**Americas & Middle East:** Bahrain, Canada, Chile, Kuwait, Oman, United Arab Emirates, United States

## Countries WITHOUT a DTA with Thailand

Notable countries without a Thai tax treaty include:
- **Brazil, Mexico, Argentina** — Latin America
- **Saudi Arabia, Qatar** — Gulf states
- **Nigeria, Kenya, Egypt** — Africa

If you have income from these countries, you cannot claim a foreign tax credit in Thailand and risk true double taxation.

## How to Claim DTA Benefits

DTA relief is **not automatic** — you must actively claim it.

### Steps to Claim:
1. **Obtain a Certificate of Residence** from your home country's tax authority confirming you paid tax there
2. **Declare foreign income** on your Thai PND.90 return (Section for foreign income)
3. **Attach supporting documents:** foreign tax return, payment receipts, Certificate of Residence
4. **File by March 31** for the previous tax year

### Required Documentation:
- Certificate of Residence from source country
- Foreign tax assessment notice or tax return
- Proof of tax payment (receipt or clearance certificate)
- Bank statements showing remittance to Thailand

## Special Country Notes

### United States
The US has a DTA with Thailand, but US citizens face **citizenship-based taxation** — the US taxes its citizens on worldwide income regardless of where they live. US expats should consult a specialist about:
- Using the Foreign Earned Income Exclusion (FEIE)
- Using the Foreign Tax Credit (FTC) on their US return
- The interaction between US and Thai tax obligations

### United Kingdom
The UK-Thailand DTA is comprehensive, covering employment income, dividends, interest, royalties, and capital gains. UK expats who become Thai tax residents should inform HMRC of their status change.

### Australia
The Australia-Thailand DTA includes provisions for pensions, government service income, and students. The ATO may still require filing even for non-residents earning Australian income.

## Income Covered vs. Not Covered

**DTAs typically cover:**
- Employment income (salaries, wages)
- Business profits
- Dividends, interest, royalties
- Capital gains (varies by treaty)
- Pensions

**DTAs do NOT cover:**
- VAT / GST
- Sales taxes
- Specific Business Tax (Thailand)
- Property taxes
- Inheritance taxes

## Common Mistakes to Avoid

1. **Assuming DTA relief is automatic** — You must file the right forms
2. **Not obtaining a Certificate of Residence** — Required documentation
3. **Missing the filing deadline** — March 31 for the previous year
4. **Confusing the credit method with exemption** — You still declare the income
5. **Not tracking remittances** — The timing of transfers matters for taxability

## Key Takeaways

- **61 countries** have tax treaties with Thailand
- DTA relief **requires active claiming** with documentation
- Most treaties use the **credit method** — taxes paid abroad reduce Thai tax
- **No DTA = double taxation risk** — especially relevant post-2024
- The **LTR visa** provides a simpler alternative for qualifying expats (full exemption vs. credit method)

## Resources

- Thai Revenue Department DTA list: rd.go.th/english/766.html
- Certificate of Residence: your home country's tax authority
- Annual tax return: PND.90 form (rd.go.th)
    `,publishedAt:"2026-02-17",readTime:12,category:"International",sources:[{label:"Thai Revenue Department — Double Tax Agreements (full list)",url:"https://www.rd.go.th/english/766.html"},{label:"Thai Revenue Department — Foreign Tax Credits & Treaty Relief",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"pensioner-retiree-tax-guide-thailand",title:"Retiring in Thailand: Tax Guide for Pensioners",excerpt:"A complete tax guide for retirees in Thailand — the 65+ income exemption, how foreign pensions are treated, filing obligations, and how to reduce your tax bill.",content:`
## Introduction

Thailand is one of the world's most popular retirement destinations, drawing tens of thousands of retirees each year with its low cost of living, warm climate, and welcoming culture. But retiring here comes with tax obligations that many expat pensioners don't fully understand — including rules that changed significantly in 2024.

The good news: Thailand offers a generous tax exemption specifically for people aged 65 and over, and there are several legal ways to reduce your tax burden further.

---

## Do You Need to File a Thai Tax Return?

The first question most retirees have is whether they need to file at all. The answer depends on:

1. **Whether you are a Thai tax resident** — you become one after spending 180 days or more in Thailand in a calendar year
2. **Whether your income exceeds the filing thresholds**

If you are a Thai tax resident with assessable income above these thresholds, you must file:

| Filing Status | Income Threshold |
|---|---|
| Single, salary/pension income only | 120,000 THB |
| Single, other income (investments, rental, etc.) | 60,000 THB |
| Married | 220,000 THB (salary/pension) or 120,000 THB (other income) |

---

## The 65+ Income Exemption: A Major Benefit for Retirees

One of the most important — and most overlooked — tax benefits in Thailand is the **income exemption for taxpayers aged 65 and over**.

Under Section 42(17) of the Revenue Code, if you are **65 years of age or older at the end of the tax year**, the first **190,000 THB of your assessable income is completely exempt** from personal income tax.

This is in addition to the standard personal allowance and tax brackets.

### How the 65+ Exemption Works in Practice

For a single retiree aged 65+ with pension and investment income:

| Item | Amount |
|---|---|
| 65+ income exemption | −190,000 THB (not assessable) |
| Personal allowance | −60,000 THB |
| First tax bracket (0%) | −150,000 THB |
| **Total before paying any tax** | **400,000 THB** |

This means a retiree aged 65 or over can receive up to approximately **400,000 THB per year** (about 33,000 THB per month) before paying a single baht in Thai income tax.

For context, 400,000 THB is approximately £9,000, $11,000 USD, or AUD 17,000 at current exchange rates — meaning many pensioners with modest income will owe no Thai tax at all.

---

## What Income Do Retirees Need to Declare?

### Foreign Pension Income

As of **1 January 2024**, any foreign income (including pension income) that you bring into Thailand is taxable, regardless of when it was earned.

This applies to:
- **UK State Pension** — if you transfer it to Thailand, it's assessable income
- **US Social Security** — if remitted to Thailand, potentially taxable
- **Australian Superannuation payments** — if remitted to Thailand
- **Private or occupational pensions** — same rules apply
- **Annuity payments** — taxable if remitted

**Important:** If you leave pension money in an overseas account and live off Thai savings or other funds, the overseas pension is not assessable in Thailand. Many retirees structure their finances to minimise remittances.

### Thai Bank Interest

Interest earned on Thai bank accounts is subject to **15% withholding tax** deducted at source by the bank. You can either:
- Accept the withholding as your final tax on this income, or
- Declare it on your return and potentially receive a refund if your effective rate is lower (rare for most retirees)

### Thai Investment Income

- **Dividends from Thai companies:** 10% withholding tax at source (can be included in return for possible refund)
- **Capital gains on Thai shares:** Generally not taxable for individuals
- **Capital gains on property:** Subject to specific tax rules at point of sale

### Rental Income

If you own and rent out property in Thailand, rental income is assessable. You can deduct 30% as a flat-rate expense or claim actual expenses.

---

## Key Deductions and Allowances for Retirees

Beyond the 65+ exemption, retirees can claim all standard deductions:

| Deduction | Amount |
|---|---|
| Personal allowance | 60,000 THB |
| Spouse allowance (non-earning) | 60,000 THB |
| Parent allowance | 30,000 THB per parent (age 60+, income under 30,000 THB) |
| Life insurance premiums | Up to 100,000 THB |
| Health insurance premiums (own) | Up to 25,000 THB |
| Parent health insurance premiums | Up to 15,000 THB per parent |
| Housing loan interest | Up to 100,000 THB |
| SSF/RMF fund contributions | Up to 30% of income, within limits |

### The Parent Allowance and Health Insurance Deduction

Many retirees have elderly parents either living with them or in care. You can claim:
- **30,000 THB per qualifying parent** (must be Thai resident, aged 60+, with income under 30,000 THB)
- **15,000 THB per parent** for health insurance premiums you pay on their behalf

---

## Retirement Visa and Tax Obligations

The standard **Thai retirement visa (Non-Immigrant OA)** does not provide any special tax benefits. If you hold a Non-OA visa and spend 180+ days in Thailand, you have the same tax obligations as any other resident.

For retirees with significant overseas income, the **LTR Wealthy Pensioner visa** offers a much better alternative.

---

## LTR Wealthy Pensioner Visa: The Tax-Free Option

The **Long-Term Resident (LTR) Wealthy Pensioner visa** is specifically designed for retirees and provides complete exemption from Thai tax on all foreign-sourced income.

### Eligibility:
- Age 50 or older
- Annual income from pension/passive sources of **USD 80,000 or more** (or USD 40,000+ with USD 250,000 in Thai assets)
- Health insurance coverage

### Tax Benefit:
- **Zero Thai tax on foreign income** — pensions, investment returns, rental income from abroad
- This applies regardless of how much you remit to Thailand
- You still file a tax return, but your foreign income is exempt

For retirees who qualify, the LTR visa eliminates Thai tax on overseas pension income entirely, making it far superior to the standard retirement visa from a tax perspective.

---

## Filing Your Thai Tax Return as a Retiree

If required to file, retirees use **Form PND.90** (for those with multiple income types) or **Form PND.91** (for salary/pension income only).

### Steps:
1. Gather all income documentation (pension statements, bank interest certificates, withholding tax certificates)
2. Calculate assessable income (excluding the 190,000 THB if aged 65+)
3. Apply allowances and deductions
4. Calculate tax using progressive brackets
5. Deduct any withholding tax already paid (bank interest, dividends)
6. File online via RD Smart Tax or in person by **March 31**

### Online Filing
Filing through the Revenue Department's **RD Smart Tax** app or website (rd.go.th) extends the deadline by 8 days to approximately April 8. This is the recommended method.

---

## Practical Tax Planning for Retirees

### 1. Manage Your Remittances
Only transfer what you need to Thailand each month. Money left in an overseas account is not assessable. Consider maintaining a buffer account to limit transfers.

### 2. Use the 65+ Exemption Fully
If you're under 65, plan for the year you turn 65 — that year's first 190,000 THB becomes exempt, potentially eliminating most or all of your Thai tax.

### 3. Get a Tax Clearance Certificate
If you leave Thailand permanently, you'll need a tax clearance certificate (Tor Rong Khro) to show you have no outstanding tax liabilities.

### 4. Consider the LTR Visa
If you have substantial overseas income and qualify, the LTR Wealthy Pensioner visa pays for itself quickly through tax savings.

---

## Common Mistakes Retirees Make

1. **Assuming no filing is required** — even if you owe no tax, you may still need to file
2. **Forgetting the 65+ exemption** — it must be claimed, it doesn't apply automatically through withholding
3. **Not tracking remittances** — under 2024 rules, all transfers in matter
4. **Missing double tax treaty protections** — not claiming credits for tax paid in your home country
5. **Assuming the retirement visa provides tax benefits** — it does not

---

## Key Takeaways

- **180+ days in Thailand** = Thai tax resident with filing obligations
- **Age 65+:** First 190,000 THB of income is exempt from tax
- **Combined with standard allowances:** Up to ~400,000 THB before paying tax
- **Foreign pension remitted to Thailand:** Taxable since January 2024
- **LTR Wealthy Pensioner visa:** Eliminates Thai tax on foreign income entirely for those who qualify
- **Deadline:** File PND.90 or PND.91 by March 31 (or ~April 8 online)

For complex situations — particularly those involving multiple countries, government pensions, or large investment portfolios — consider consulting a Thai tax advisor with experience in expat and retirement matters.
    `,publishedAt:"2026-03-03",readTime:10,category:"Retirement",sources:[{label:"Thai Revenue Department — Personal Income Tax & Allowances",url:"https://www.rd.go.th/english/index-eng.html"},{label:"Thai Revenue Department — Revenue Code Section 42(17) (65+ Exemption)",url:"https://www.rd.go.th/english/index-eng.html"},{label:"BOI — LTR Wealthy Pensioner Visa",url:"https://ltr.boi.go.th/"}]},{slug:"foreign-pension-income-thailand-tax",title:"How Foreign Pensions Are Taxed in Thailand",excerpt:"How UK State Pension, US Social Security, Australian superannuation, and other foreign pensions are taxed when you retire in Thailand.",content:`
## The Core Question for Expat Retirees

If you receive a pension from your home country and live in Thailand, one of your biggest tax questions is: does Thailand tax my pension?

The answer depends on three things:
1. **Whether you are a Thai tax resident** (180+ days in the year)
2. **Whether you remit the pension money to Thailand** (transfer it or spend it here)
3. **What your home country's tax treaty with Thailand says** about pension taxation

---

## The 2024 Rule Change: Why It Matters for Pensioners

Before 2024, Thailand had a useful planning tool: foreign income was only taxable in Thailand if remitted in the same year it was earned. Many retirees used this to shift money from earlier-earned savings without Thai tax.

**From 1 January 2024, this loophole closed.** All foreign income — including pension payments — brought into Thailand by a Thai tax resident is taxable, regardless of when it was earned. This makes understanding your tax treaty much more important.

---

## UK State Pension and Occupational Pensions

### The UK-Thailand Double Tax Agreement

The UK and Thailand have a comprehensive Double Tax Agreement (DTA) that specifically addresses pension taxation.

### UK State Pension
The UK State Pension is a social security benefit. Under the UK-Thailand DTA:
- It is generally **taxable in the country where you are resident** — meaning Thailand if you live there 180+ days a year
- HMRC typically does not withhold tax on State Pension paid to Thai residents (you should apply to receive it gross)
- The income must be declared on your Thai PND.90 and is subject to Thai personal income tax rates

**Practical note:** For many UK pensioners, the combination of the 65+ exemption (190,000 THB) and personal allowance (60,000 THB) means little or no Thai tax is due on a standard State Pension, which is approximately £11,500 per year (roughly 500,000 THB at current rates) — though you would owe some Thai tax at low rates once allowances are exhausted.

### UK Government Pensions (Civil Service, Teachers, NHS, Military)
**Key exception:** Pensions paid by the UK government for government service (civil servants, teachers employed by local authorities, NHS employees in certain cases, military) are taxable **only in the UK**, not in Thailand.

If your pension falls into this category:
- It remains taxable in the UK at UK rates
- You **do not** pay Thai tax on it
- You do not need to include it in your Thai return (or include it and claim DTA exemption)
- Contact HMRC about your non-resident status to potentially reduce UK withholding

### UK Private/Occupational Pensions
Employer pension schemes (final salary, LGPS, NHS Pension where it's treated as a private scheme, SIPPs, etc.) are generally:
- **Taxable in Thailand** as your country of residence
- Any UK tax withheld can be claimed as a foreign tax credit on your Thai return
- Consider applying to HMRC for a PAYE code NT (no tax) if you can establish Thai tax residence — this prevents double withholding

---

## US Social Security and American Pensions

### The Complexity of US Citizenship
US citizens face a unique challenge: the United States taxes its citizens on worldwide income **regardless of where they live**. This creates a risk of genuine double taxation that requires careful management.

### US Social Security Benefits
Under the US-Thailand DTA (Article 20), Social Security benefits:
- May be taxable in Thailand as the country of residence
- **The US also taxes its own citizens on Social Security**, creating potential double taxation
- US citizens can use the **Foreign Tax Credit** on their US return to offset US tax by Thai tax paid, but the interaction is complex

### US 401(k), IRA, and Pension Distributions
Distributions from US retirement accounts:
- Are taxable in the US (as ordinary income for traditional accounts)
- When remitted to Thailand, are potentially also taxable in Thailand as a Thai tax resident
- The US-Thailand DTA's foreign tax credit provisions help mitigate — but not eliminate — double taxation
- **US citizens should work with a specialist** in both US expat tax and Thai tax

### Key Warning for US Citizens
US citizens in Thailand face the most complex pension tax situation of any nationality. The combination of US citizenship-based taxation and Thai residency-based taxation can result in genuine double taxation despite the treaty. Consult a specialist — this is not a DIY situation.

---

## Australian Superannuation and Pensions

### Australian Superannuation
Superannuation (super) is Australia's compulsory retirement savings system. When you access super as a retiree:

**If you are aged 60 or over:**
- Lump sum withdrawals from a taxed super fund are **tax-free in Australia**
- When remitted to Thailand, they may be **taxable in Thailand** as a Thai tax resident
- The ATO may not withhold tax, but Thailand may still assess it as income

**The Australia-Thailand DTA** — Australia and Thailand have a DTA that covers pensions. Private pensions (including super) are generally taxable in the country of residence (Thailand).

### Australian Age Pension
The Australian government Age Pension:
- Paid by the Australian Government's Department of Social Services
- Treated similarly to a social security payment
- Generally taxable in the country of residence (Thailand) under the DTA
- Australia may withhold some tax — this can be claimed as a credit in Thailand

### Practical Approach for Australian Retirees
Many Australian retirees in Thailand:
1. Withdraw super as tax-free lump sums in Australia before remitting
2. Structure ongoing remittances to stay within Thai tax-free thresholds (especially with the 65+ exemption)
3. Apply for a reduction in Australian withholding using the DTA

---

## European Pensions (Germany, France, Netherlands, Nordic Countries)

Thailand has DTAs with all major European nations. The pension taxation rules follow a general pattern:

### Private/Occupational Pensions from EU Countries
- Generally **taxable in Thailand** as country of residence
- Foreign tax credit available for any tax withheld in the source country

### Government Pensions from EU Countries
- Often taxable only in the **source country** (Germany, France, etc.)
- The specific treaty article varies — check your country's DTA with Thailand

### State Pensions (Old Age Pensions)
- The treatment varies by country and treaty
- Most are treated as taxable in the country of residence (Thailand)

---

## How to Claim Foreign Tax Credits

If your home country withholds tax on your pension, you can claim a credit in Thailand to avoid double taxation.

### Steps:
1. Obtain a **certificate or statement** showing tax withheld from your pension (e.g., a P60 from HMRC, Social Security tax statement from the SSA, etc.)
2. Include the gross pension amount in your Thai return
3. Claim the foreign tax credit in the "Tax Already Paid" section
4. Attach copies of foreign tax documentation to your return

### Limits on the Credit
- The credit cannot exceed the Thai tax due on that income
- If foreign tax paid exceeds Thai tax, you cannot get a refund of the excess
- Credits apply only to income taxes (not national insurance, Medicare levies, etc.)

---

## Government Pension Checklist by Country

| Country | State/Social Pension | Government Service Pension | Private/Occupational |
|---------|---------------------|--------------------------|---------------------|
| UK | Taxable in Thailand | Taxable in UK only | Taxable in Thailand |
| US | Potentially both (complex) | Taxable in US only | Potentially both |
| Australia | Taxable in Thailand | Taxable in Australia | Taxable in Thailand |
| Germany | Taxable in Thailand | Taxable in Germany | Taxable in Thailand |
| France | Taxable in Thailand | Taxable in France | Taxable in Thailand |
| Netherlands | Taxable in Thailand | Taxable in Netherlands | Taxable in Thailand |

*This is a general guide. Treaty provisions vary. Always verify the specific article in your country's DTA with Thailand.*

---

## Minimising Tax on Your Pension in Thailand

### Legal Strategies:
1. **Stay under 180 days** — if your income is high and you qualify, being a non-resident means only Thai-sourced income is taxable
2. **Claim the 65+ exemption** — first 190,000 THB is not assessable
3. **Limit remittances** — only transfer what you need; keep excess in your home country
4. **Consider the LTR Wealthy Pensioner visa** — complete exemption from Thai tax on foreign income if you meet the USD 80,000/year threshold
5. **Use foreign tax credits** — claim credit for tax already paid abroad
6. **Time large withdrawals** — if taking lump sums (e.g., from super), consider the year and your total Thai income

### The LTR Visa Shortcut
For pensioners with significant overseas income (USD 80,000+ per year from pensions/investments), the **LTR Wealthy Pensioner visa** eliminates all of the above complexity. Foreign income brought to Thailand is simply exempt. No credits to claim, no remittance tracking.

---

## Getting Professional Help

Pension taxation across borders is genuinely complex. For most nationalities, you should consider consulting:
- A Thai tax advisor experienced in expat matters
- A tax advisor in your home country who understands expatriate taxation
- For US citizens: a specialist in US expat tax law (there are firms specialising in exactly this combination)

The cost of advice is typically far less than the cost of errors or missed credits.
    `,publishedAt:"2026-03-03",readTime:11,category:"Retirement",sources:[{label:"Thai Revenue Department — Double Tax Agreements (full list)",url:"https://www.rd.go.th/english/766.html"},{label:"Thai Revenue Department — Foreign Income & Tax Treaty Relief",url:"https://www.rd.go.th/english/index-eng.html"},{label:"BOI — LTR Wealthy Pensioner Visa",url:"https://ltr.boi.go.th/"}]},{slug:"investment-income-retirees-thailand",title:"Investment Income Tax in Thailand: Retiree Guide",excerpt:"How Thai tax applies to bank interest, dividends, and capital gains from Thai and foreign sources — what retirees and investors need to know.",content:`
## Why Investment Income Matters for Retirees

For many retirees, investment income — interest, dividends, capital gains — makes up a significant portion of their income alongside pensions. Understanding how Thailand taxes each type is essential for effective retirement planning.

The good news is that some types of investment income carry lower tax rates than regular income, and in some cases the withholding tax paid at source is your only Thai tax obligation.

---

## Thai Bank Interest

### How It's Taxed

Interest earned on deposits in Thai banks is subject to **15% withholding tax**, deducted automatically by the bank before you receive the interest.

### Your Options

You have two choices for how this is treated for tax purposes:

**Option 1: Treat withholding as final tax**
- The 15% withheld is your complete tax obligation on this income
- You do not include bank interest on your tax return
- Simple, no further action required

**Option 2: Include in annual return**
- You can choose to include the bank interest in your PND.90 return
- The 15% already withheld becomes a tax credit
- If your effective marginal tax rate is lower than 15%, you may receive a refund
- For retirees with low taxable income, this can sometimes result in a partial refund

### When Option 2 Makes Sense
If your total taxable income (after allowances and the 65+ exemption) puts you in the 5% or 10% tax bracket, including bank interest in your return and claiming back excess withholding is worthwhile.

---

## Dividends from Thai Companies

### Standard Treatment

Dividends paid by Thai companies are subject to **10% withholding tax** deducted by the company paying the dividend.

As with bank interest, you can:
- Accept the 10% withholding as final tax (simpler)
- Include dividends in your annual return and claim the withholding as a credit

### The Dividend Tax Credit

Thai companies pay corporate income tax before distributing dividends. To avoid double taxation of the same profits, you may be eligible for a **dividend tax credit** — an additional credit that partially offsets the tax already paid at the corporate level.

The credit calculation is complex. For most small investors, accepting the 10% withholding as final tax is simpler and often equivalent or better.

### Thai Stock Exchange (SET) Capital Gains

Capital gains from selling shares listed on the **Stock Exchange of Thailand (SET)** are **exempt from personal income tax** for individuals.

This is a significant benefit for retirees who invest in Thai stocks — you can sell shares at a profit with no Thai capital gains tax obligation.

---

## Foreign Investment Income

The 2024 rule change has important implications for expats with foreign investment portfolios.

### Foreign Bank Interest

Interest earned in overseas bank accounts is **not taxable in Thailand unless remitted here**. If you leave foreign interest income in your overseas account, it is not assessed.

Once you transfer it to Thailand, it becomes assessable income (as a Thai tax resident) and is included in your progressive income tax calculation. You can claim a foreign tax credit for any withholding tax paid in the source country.

### Foreign Dividends

Dividends from overseas shares, ETFs, and funds:
- **Not taxable in Thailand until remitted**
- Once brought to Thailand, assessable as regular income
- Foreign withholding tax (e.g., 15% US dividend withholding) can be claimed as a credit
- Thailand taxes at progressive rates up to 35%; credit reduces the liability

### Example: UK ISA Income Remitted to Thailand

A UK retiree has £20,000 (approx. 900,000 THB) of dividend income from ISA investments. ISAs pay dividends without UK tax. When this money is transferred to Thailand:

| Item | Amount |
|---|---|
| Dividend income brought in | 900,000 THB |
| 65+ exemption | −190,000 THB |
| Personal allowance | −60,000 THB |
| Remaining taxable | 650,000 THB |
| Tax on 650,000 THB | ~67,500 THB |

No UK tax was paid, so no foreign credit is available. Total Thai tax: ~67,500 THB (about 10.4% effective rate).

By contrast, if the retiree only remits 250,000 THB, taxable income after allowances is zero — no Thai tax at all.

---

## Capital Gains on Foreign Assets

### Overseas Shares and Funds

Capital gains from selling foreign shares, funds, or ETFs:
- **Not taxable in Thailand unless the proceeds are remitted here**
- If brought into Thailand, the proceeds (entire amount, not just the gain) count as remitted income
- Thai law does not currently have a capital gains tax concept for individuals — foreign capital gains are treated as regular assessable income if remitted

**Practical note:** This creates an awkward situation where the entire sale proceeds, not just the gain, are assessable. Many financial advisors recommend keeping investment proceeds offshore or timing remittances carefully.

### Property in Thailand

Capital gains from selling property in Thailand are not subject to a separate capital gains tax. Instead, the sale is subject to:
- **Specific Business Tax (SBT):** 3.3% (including local tax) if owned for less than 5 years
- **Withholding tax:** Calculated based on appraised value and years of ownership
- **Stamp duty:** 0.5% (exempt if SBT applies)

The calculation is complex and handled at the time of transfer at the Land Department. For most retirees selling a retirement home, these taxes are modest relative to the property value.

### Overseas Property Sales

Proceeds from selling property abroad:
- Not taxable if left offshore
- If remitted to Thailand, assessable as regular income
- Foreign capital gains tax paid can be claimed as a credit under applicable DTA provisions

---

## Government and Corporate Bonds

### Thai Government Bonds

Interest from Thai government bonds is subject to **15% withholding tax**, same as bank interest. You can include it in your return or treat withholding as final.

### Corporate Bonds

Interest from corporate bonds issued in Thailand: 15% withholding tax.

### Foreign Bonds

Interest from overseas bonds: only taxable if remitted. Foreign withholding tax creditable.

---

## Provident Funds and Retirement Funds (SSF/RMF)

### Contributions
SSF (Super Savings Fund) and RMF (Retirement Mutual Fund) contributions are **deductible** from your taxable income — this can be a useful tool even in retirement if you continue to make contributions.

### Withdrawals
When you withdraw from these funds at retirement:
- Must hold RMF for at least 5 years and be aged 55+ for tax-exempt withdrawal
- SSF must be held for at least 10 years
- Withdrawals meeting conditions: **tax exempt**
- Early withdrawals: the tax deductions previously claimed are reversed and assessed as income

---

## Thai Savings Bonds (Government Savings Bank)

Special savings products from the Government Savings Bank (GSB) sometimes carry interest exemptions or preferential withholding rates. Check the terms of specific products — some are structured to be more tax-efficient than standard deposits.

---

## Tax Planning for Investment Income

### Strategy 1: Keep Foreign Income Offshore
Only transfer what you need to Thailand. Leave dividends, interest, and capital gains in your home country account.

### Strategy 2: Use Thai Accounts for Tax-Efficient Income
Thai bank interest at 15% withholding is often more tax-efficient than remitting foreign investment income at progressive rates.

### Strategy 3: Sequence Your Remittances
In years when your other income is low (e.g., if a pension payment is delayed), bring in more foreign investment income — it will be taxed at lower effective rates.

### Strategy 4: Consider the LTR Visa
If you have USD 80,000+ in pension/passive income annually, the **LTR Wealthy Pensioner or Wealthy Global Citizen visa** exempts all foreign investment income from Thai tax, regardless of how much you remit. This is the most powerful tool available for high-income retirees.

### Strategy 5: Claim All Withholding Credits
Don't leave money on the table. Keep records of all Thai withholding tax certificates (bank interest slips, dividend statements) and decide each year whether claiming them on your return is worthwhile.

---

## Summary Table: How Different Investment Income Is Taxed

| Income Type | Thai Source | Foreign Source (Remitted) |
|-------------|-------------|--------------------------|
| Bank/bond interest | 15% WHT at source (final or credit) | Progressive rates; credit for foreign WHT |
| Listed Thai shares (capital gain) | **Exempt** | N/A |
| Thai company dividends | 10% WHT at source (final or credit) | Progressive rates; credit for foreign WHT |
| Foreign dividends | N/A | Progressive rates; credit for foreign WHT |
| Foreign shares (capital gain) | N/A | Assessable if remitted; progressive rates |
| Thai property sale | SBT + transfer fees (not income tax) | N/A |
| Foreign property sale | N/A | Assessable if remitted; progressive rates |

WHT = withholding tax
    `,publishedAt:"2026-03-03",readTime:9,category:"Retirement",sources:[{label:"Thai Revenue Department — Personal Income Tax",url:"https://www.rd.go.th/english/index-eng.html"},{label:"Stock Exchange of Thailand (set.or.th)",url:"https://www.set.or.th/en/home"}]},{slug:"thailand-retirement-visa-tax-obligations",title:"Thai Retirement Visa and Tax Obligations",excerpt:"Holding a Thai retirement visa does not exempt you from tax. Here's what retirees need to know about Thai tax obligations and how the LTR visa differs.",content:`
## A Common Misconception

Many expats assume that holding a retirement visa — the Non-Immigrant OA — gives them some form of special tax status in Thailand. It does not.

**Your visa type has no bearing on your tax obligations.** Tax residency in Thailand is determined solely by how many days you spend in the country each year.

---

## The Non-Immigrant OA Visa (Retirement Visa)

The Non-OA visa is Thailand's standard long-term visa for retirees aged 50 and over. It is issued for one year and can be renewed annually. Requirements include:
- Age 50 or over
- Financial proof: 800,000 THB in a Thai bank account, or 65,000 THB monthly income, or a combination
- Health insurance
- No criminal record

### What the Non-OA Visa Does NOT Do

- Does **not** reduce your tax rate
- Does **not** exempt any income from Thai tax
- Does **not** change your tax residency status
- Does **not** waive any filing requirements

---

## Tax Residency is About Days, Not Visa Type

If you hold a Non-OA visa and live in Thailand for 180 or more days in a calendar year, you are a **Thai tax resident** with full filing obligations. This is true regardless of whether you have a Non-OA, tourist visa, Elite visa, or any other status.

### The 180-Day Rule in Practice

The 180 days are counted per calendar year (January 1 to December 31). They do not need to be consecutive. Most retirees living in Thailand full-time will comfortably exceed 180 days.

**If you exceed 180 days:**
- You are a Thai tax resident
- All Thai-sourced income is assessable
- Foreign income remitted to Thailand is assessable (since January 2024)
- You must file a PND.90 or PND.91 return if income exceeds filing thresholds

**If you stay under 180 days:**
- You are a non-resident
- Only Thai-sourced income is taxable
- Foreign income is not taxable in Thailand regardless of remittance
- Some retirees deliberately split time between Thailand and another country to remain non-resident

---

## What Income Is Taxable for Non-OA Visa Holders?

### Thai-Sourced Income (Always Taxable if Resident)

- Thai bank interest (though 15% withholding is often treated as final tax)
- Thai dividends (10% withholding, can be final)
- Rental income from Thai property
- Any employment or business income earned in Thailand

### Foreign Income (Taxable Since 2024 if Remitted to Thailand)

- Overseas pension payments transferred to Thailand
- Overseas investment income transferred to Thailand
- Overseas property rental income transferred to Thailand
- Any other overseas income brought into Thailand by any means (wire transfer, ATM withdrawal, credit card usage)

---

## The Financial Proof Requirement vs. Tax Obligations

Holding 800,000 THB in a Thai bank account (the common financial proof method for Non-OA renewal) means that money is in Thailand — but it only becomes assessable income if it was income remitted from overseas. Capital held offshore before you became a Thai resident is not income.

However, **interest earned on that 800,000 THB account** is assessable income in Thailand (subject to 15% withholding by the bank).

---

## Filing Requirements for Non-OA Retirees

If you are a Thai tax resident (180+ days), you must file if assessable income exceeds:

| Situation | Filing Threshold |
|---|---|
| Pension/salary income only | 120,000 THB (single), 220,000 THB (married) |
| Income from investments, rental, or other sources | 60,000 THB (single), 120,000 THB (married) |

### The 65+ Exemption Reduces Your Effective Threshold

If you are aged 65 or over, the first 190,000 THB of your assessable income is **exempt** from Thai personal income tax. This means your assessable income is reduced by 190,000 THB before applying filing thresholds and deductions.

---

## The Thailand Elite Visa and Tax

The **Thailand Privilege (Elite) visa** — previously called Thailand Elite — is a premium membership visa that provides long-term stays. Like the Non-OA, it provides **no tax benefits**. Holders are subject to the same 180-day residency rule and the same tax obligations as any other visa holder.

---

## The LTR Visa: The Only Visa with Real Tax Benefits

The only Thai visa that provides genuine, substantial tax benefits is the **Long-Term Resident (LTR) visa**, specifically the following three categories:

### LTR Wealthy Pensioner
- Age 50+
- USD 80,000+/year in pension/passive income (or USD 40,000+ with USD 250,000 in Thai assets)
- **Tax benefit:** Complete exemption from Thai tax on all foreign-sourced income

### LTR Wealthy Global Citizen
- USD 1 million+ in assets (including USD 500,000 in Thailand)
- **Tax benefit:** Complete exemption from Thai tax on all foreign-sourced income

### LTR Work-from-Thailand Professional
- USD 80,000+/year from a foreign employer (for past 2 years)
- **Tax benefit:** Complete exemption from Thai tax on all foreign-sourced income

For all three categories, there is no need to manage remittances, track which income was earned when, or claim foreign tax credits for overseas pension payments. Everything brought into Thailand from abroad is simply exempt.

---

## Non-OA vs. LTR: The Tax Comparison

| Feature | Non-OA Retirement Visa | LTR Wealthy Pensioner |
|---------|------------------------|----------------------|
| Foreign pension remitted to Thailand | **Taxable** (progressive up to 35%) | **Exempt** |
| Foreign investment income remitted | **Taxable** | **Exempt** |
| Thai bank interest | 15% withholding (standard) | 15% withholding (standard) |
| Need to track remittances | Yes | No |
| Filing requirement | Yes, if over threshold | Yes, but foreign income exempt |
| Cost | Free (renewal fees only) | 50,000 THB application fee |
| Visa validity | 1 year, renewable | 10 years, renewable |

---

## Practical Steps for Non-OA Visa Holders

### 1. Determine Your Tax Residency Status
Count your days in Thailand for the calendar year. If over 180, you are a tax resident.

### 2. Register for a Tax Identification Number (TIN)
If you don't already have one, register at your local Revenue Department office with your passport and Non-OA visa. This is required to file.

### 3. Apply the 65+ Exemption
If you are aged 65 or over, ensure this 190,000 THB exemption is applied when calculating your assessable income. It is not automatically captured by any employer withholding — you claim it on your annual return.

### 4. Track Your Remittances
Keep a record of every transfer into Thailand — bank wire, ATM, credit card usage. These are all potentially assessable income if sourced from overseas income.

### 5. File Annually
File PND.90 (or PND.91 for pension/salary income only) by March 31 each year (or approximately April 8 online). Even if you owe no tax, filing is good practice and may be required.

### 6. Evaluate the LTR Visa
If you have significant overseas income (pension + investments totalling USD 80,000+/year), run the numbers on whether the LTR Wealthy Pensioner visa makes financial sense. The 50,000 THB application fee may be recovered in tax savings very quickly.

---

## Leaving Thailand: Tax Clearance

If you decide to leave Thailand permanently, or if you leave for an extended period, you may need a **tax clearance certificate** (Tor Rong Kro) showing no outstanding Thai tax liabilities. This is typically required when cancelling a retirement visa. Your local Revenue Department office can advise on the process.

---

## Summary

| | Non-OA Visa | LTR Visa |
|---|---|---|
| Tax benefits | None | Significant |
| Foreign income exempt? | No | Yes (for qualifying LTR categories) |
| Tax driven by | Days in Thailand | Days in Thailand + visa category |
| Annual filing required? | Yes (if over threshold) | Yes (foreign income still declared, but exempt) |
| Best for | Simple situation, modest income | High income retirees with significant overseas pension/investments |
    `,publishedAt:"2026-03-03",readTime:8,category:"Retirement",sources:[{label:"Thai Revenue Department — Personal Income Tax",url:"https://www.rd.go.th/english/index-eng.html"},{label:"BOI — Long-Term Resident (LTR) Visa",url:"https://ltr.boi.go.th/"}]},{slug:"ltr-visa-tax-benefits",title:"LTR Visa Tax Benefits for Expats in Thailand",excerpt:"How Thailand's Long-Term Resident visa offers significant tax benefits — including foreign income exemptions and a reduced flat tax rate for qualifying expats.",content:`
## What is the LTR Visa?

The Long-Term Resident (LTR) visa is Thailand's premium residency program designed to attract wealthy individuals, skilled professionals, and remote workers. Launched by the Board of Investment (BOI), the LTR visa offers substantial tax benefits that can significantly reduce your tax burden compared to standard visa holders.

## The Four LTR Visa Categories

### 1. Wealthy Global Citizens
- **Requirements:** USD 1 million+ in assets (including USD 500,000 in Thai assets)
- **Tax Benefit:** Complete exemption from Thai tax on foreign income

### 2. Wealthy Pensioners
- **Requirements:** Age 50+, annual pension/passive income of USD 80,000+ (or USD 40,000+ with USD 250,000 in Thai assets)
- **Tax Benefit:** Complete exemption from Thai tax on foreign income

### 3. Work-from-Thailand Professionals
- **Requirements:** Work for established overseas company, USD 80,000+ annual income for past 2 years
- **Tax Benefit:** Complete exemption from Thai tax on foreign income

### 4. Highly Skilled Professionals
- **Requirements:** Work in BOI-targeted industries, 5+ years experience or PhD
- **Tax Benefit:** 17% flat tax rate on Thai employment income (vs. progressive rates up to 35%)

## How LTR Tax Benefits Compare

| Visa Type | Foreign Income | Thai Income | Effective Benefit |
|-----------|---------------|-------------|-------------------|
| Regular Visa | Taxable if remitted (up to 35%) | Progressive (up to 35%) | Standard treatment |
| Thailand Privilege | Taxable if remitted (up to 35%) | Progressive (up to 35%) | No tax benefit |
| LTR (3 categories) | **Tax Exempt** | Progressive (up to 35%) | Major savings on foreign income |
| LTR Highly Skilled | Taxable if remitted | **17% flat rate** | Lower tax on high Thai earnings |

## Understanding the 2024 Foreign Income Rule Change

Prior to 2024, foreign income was only taxable if remitted to Thailand in the same year it was earned. Starting January 1, 2024, all foreign income remitted to Thailand is taxable regardless of when earned.

**This makes the LTR visa exemption even more valuable.**

For regular visa holders, any money brought into Thailand from overseas is now potentially taxable. LTR visa holders (except Highly Skilled) are completely exempt from this rule.

## Example Tax Savings

**Scenario:** A remote worker earning USD 100,000 annually from a US company, living in Thailand

**Without LTR Visa:**
- If remitting full income: approximately 1.5-2.5 million THB in Thai tax
- Must carefully plan remittances to minimize tax exposure

**With LTR Work-from-Thailand Visa:**
- Thai tax on foreign income: 0 THB
- Complete freedom to remit funds without tax consequences

## Eligibility Requirements Overview

### Documentation Typically Required:
1. Proof of income/assets (bank statements, tax returns)
2. Health insurance coverage
3. Criminal background check
4. Passport validity

### Application Process:
1. Apply through BOI website (ltr.boi.go.th)
2. Pay application fee (50,000 THB)
3. Processing time: typically 20 working days
4. Visa valid for 10 years (renewable)

## Important Compliance Notes

To maintain LTR tax benefits:
- Must hold valid LTR visa throughout the tax year
- Must comply with BOI reporting requirements
- Benefits apply only while meeting category qualifications
- Must file Thai tax returns (even if tax-exempt income)

## LTR vs. Tax Treaties (DTAs)

Some expats wonder whether tax treaties provide similar benefits to the LTR visa. Here's the key difference:

- **Tax Treaties:** Prevent double taxation by allowing credits, but don't eliminate Thai tax
- **LTR Visa:** Actually exempts foreign income from Thai tax entirely (for qualifying categories)

## Who Should Consider LTR?

The LTR visa is particularly valuable for:
- Digital nomads and remote workers with substantial income
- Retirees with significant overseas pensions or investments
- Wealthy individuals planning to move assets to Thailand
- Skilled professionals offered positions in BOI-promoted industries

## Key Takeaways

1. **Three LTR categories offer complete foreign income tax exemption** - a unique benefit not available with any other Thai visa
2. **LTR Highly Skilled offers 17% flat rate** on Thai employment income - significant savings for high earners
3. **Post-2024 rules make LTR more valuable** - standard visa holders now face tax on all remitted foreign income
4. **Thailand Privilege/Elite visas don't offer tax benefits** - only LTR provides preferential tax treatment
5. **Proper compliance is essential** - maintain eligibility to keep your tax benefits

## Resources

- BOI LTR Visa Portal: ltr.boi.go.th
- Thai Revenue Department: rd.go.th
- Use our tax calculator to compare scenarios with and without LTR benefits
    `,publishedAt:"2026-02-17",readTime:10,category:"International",sources:[{label:"BOI — Long-Term Resident (LTR) Visa Portal",url:"https://ltr.boi.go.th/"},{label:"Thai Revenue Department — Personal Income Tax",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"thailand-tax-guide-for-expats",title:"Thailand Tax for Expats: Complete Guide (2025)",excerpt:"Everything foreigners need to know about Thai income tax — who pays, what income is taxed, how to file, and how to avoid double taxation.",content:`
## Do Foreigners Pay Tax in Thailand?

Yes — if you live in Thailand for 180 or more days in a calendar year, you are a Thai tax resident and are subject to Thai personal income tax. This applies regardless of your nationality, visa type, or where your employer is based.

If you spend fewer than 180 days in Thailand in a given year, you are a non-resident for tax purposes. Non-residents are only taxed on income earned within Thailand, not on foreign income.

---

## The 180-Day Rule Explained

Thailand uses a simple residency test: any person who spends 180 days or more in Thailand during a calendar year is considered a Thai tax resident.

Key points:
- Days are counted per calendar year (1 January to 31 December)
- Partial days generally count as full days
- The days do not need to be consecutive
- Your visa type has no effect on your residency status

If you are in Thailand from January through July — roughly 180 days — you are a Thai tax resident for that year. A single long stay and multiple short trips are treated the same way.

---

## What Income Is Taxed for Expats?

| Income Type | Non-resident (under 180 days) | Resident (180+ days) |
|---|---|---|
| Thai salary or wages | Taxable | Taxable |
| Thai freelance / business income | Taxable | Taxable |
| Foreign income remitted to Thailand | Not taxable | Taxable (since 2024) |
| Foreign income kept abroad | Not taxable | Not taxable |

The key change for residents is the 2024 rule: any foreign income you remit (transfer, withdraw, or spend) in Thailand is now assessable income, regardless of when it was originally earned. Income left in an overseas account and never brought into Thailand is not taxed here.

---

## Thailand's Tax Rates

Thailand uses a progressive tax system. After allowances and deductions, your income is taxed at the following rates:

| Taxable Income (THB) | Rate |
|---|---|
| 0 – 150,000 | 0% |
| 150,001 – 300,000 | 5% |
| 300,001 – 500,000 | 10% |
| 500,001 – 750,000 | 15% |
| 750,001 – 1,000,000 | 20% |
| 1,000,001 – 2,000,000 | 25% |
| 2,000,001 – 5,000,000 | 30% |
| Above 5,000,000 | 35% |

For most expats earning moderate incomes, the effective rate (total tax divided by gross income) is well below the top marginal rate. Use the calculator to see your specific effective rate.

---

## Key Deductions Available to Expats

Before tax rates are applied, several deductions reduce your assessable income:

- **Personal allowance:** 60,000 THB for every taxpayer
- **Employment income deduction:** 50% of salary, capped at 100,000 THB
- **Spouse allowance:** 60,000 THB if your spouse has no income
- **Life insurance premiums:** up to 100,000 THB
- **Health insurance premiums:** up to 25,000 THB
- **Social security contributions:** full amount deductible
- **Provident fund / RMF / SSF contributions:** up to 30% of income (caps apply)

For a full list of deductions, see our guide to maximising Thai tax deductions.

---

## How to File Your Tax Return as an Expat

### Step 1: Get a Thai Tax ID Number

Before you can file, you need a 13-digit Thai Tax Identification Number (TIN) issued by the Revenue Department. If you are employed by a Thai company, your employer may have registered one for you. Otherwise, you apply in person at your local Revenue Department district office with your passport, current visa, and proof of address.

### Step 2: Choose the Right Form

- **PND 91:** For individuals whose only income is salary or pension from a single employer
- **PND 90:** For everyone else — freelance, rental, investment, foreign income, or multiple income sources

Most expats should use PND 90.

### Step 3: File by the Deadline

The filing deadline is 31 March each year for the previous calendar year. Online filing via the RD Smart Tax app or rd.go.th provides an 8-day extension to approximately 8 April.

---

## Avoiding Double Taxation

If you pay tax in another country on the same income, Thailand's network of Double Tax Agreements (DTAs) with 61 countries allows you to claim a foreign tax credit — reducing your Thai liability by the tax already paid abroad.

Thailand has DTAs with the United Kingdom, United States, Australia, Germany, France, Singapore, Japan, and many others. The treaty with each country specifies how different income types are treated.

---

## Special Situations

### LTR Visa Holders

Holders of the Long-Term Resident (LTR) Wealthy Global Citizen, Wealthy Pensioner, and Work-from-Thailand Professional visa categories receive a complete exemption from Thai tax on all foreign-sourced income. This is a significant benefit compared to the standard remittance-based tax rules.

### Digital Nomads

Remote workers earning foreign income and living in Thailand are Thai tax residents if they stay 180+ days. Their foreign income remitted to Thailand is taxable. The digital nomad article covers this in detail, including strategies for minimising the tax burden.

### Retirees

Retirees aged 65 and over receive an additional 190,000 THB income exemption on top of the standard allowances. The retirement tax guide covers all relevant rules including pension taxation and the LTR Wealthy Pensioner option.

### UK Expats

UK nationals must also manage their UK tax residency position when moving to Thailand. The Thailand tax for UK expats article covers the UK Statutory Residence Test, HMRC notifications, UK-Thailand DTA details, and National Insurance contributions.

### US Expats

US citizens face the unique challenge of US citizenship-based taxation regardless of where they live. The Thailand tax for US expats article covers FBAR reporting, FATCA obligations, the Foreign Earned Income Exclusion, and the Foreign Tax Credit.

---

## Key Takeaways

| If you... | Then... |
|---|---|
| Spend 180+ days in Thailand | You are a Thai tax resident |
| Earn income in Thailand | Always taxable here |
| Remit foreign income to Thailand | Taxable (since 2024) |
| Keep income abroad | Not taxable in Thailand |
| Hold an LTR visa | Foreign income is fully exempt |
| Pay tax abroad on the same income | Claim a DTA foreign tax credit |
    `,publishedAt:"2026-03-05",readTime:8,category:"International",sources:[{label:"Thai Revenue Department — Personal Income Tax",url:"https://www.rd.go.th/english/6045.html"},{label:"Thai Revenue Code Section 41 — Tax Residency",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"how-to-get-thai-tax-id-number",title:"How to Get a Thai Tax ID Number (TIN)",excerpt:"A practical guide to obtaining your Thai Tax Identification Number — what it is, who needs one, what documents to bring, and what to do after you have it.",content:`
## What Is a Thai Tax Identification Number?

A Thai Tax Identification Number (TIN) is a 13-digit number issued by the Revenue Department of Thailand. It identifies you in the Thai tax system and is required to:

- File an annual personal income tax return (PND 90 or PND 91)
- Claim a refund of overpaid or withheld tax
- Issue invoices if you are self-employed or freelancing
- Register for VAT if your revenue exceeds the threshold

For foreigners, the TIN is different from a Thai national ID card number (which non-citizens do not have). Your TIN is specific to the tax system.

---

## Do You Need a TIN?

You need a TIN if any of the following applies:

- You are a Thai tax resident (180+ days in Thailand) and have assessable income above the filing threshold
- Your Thai employer withholds income tax from your salary (you need a TIN to claim refunds)
- You are freelancing or self-employed and issue invoices to Thai clients
- You receive rental income from Thai property
- You want to file a return to claim a refund of excess withholding

**You may already have one.** If you are employed by a Thai company, your employer may have registered a TIN on your behalf when setting up your payroll. Check any withholding tax certificate (Form 50 Tawi) you have received from your employer or a Thai bank — your TIN will appear on that document.

---

## How to Check If You Already Have a TIN

Before visiting the Revenue Department, check these sources:

1. **Form 50 Tawi (withholding certificate)** from your employer — your TIN will be listed in the taxpayer section
2. **Bank withholding certificates** — if a Thai bank has withheld tax on your interest or dividends, your TIN may appear on the certificate
3. **Ask your HR department** — many Thai employers register TINs for foreign employees as part of the work permit and payroll process
4. **Revenue Department website** — if you have access to rd.go.th with your details, you may be able to look up your TIN

---

## How to Register in Person (Step-by-Step)

TIN registration for foreigners is done in person at a Revenue Department district office. You cannot register online as a foreign national.

### Documents to Bring

- **Passport** (original and photocopy)
- **Current visa** (shown in your passport)
- **Proof of address** in Thailand — a lease agreement, utility bill, or bank statement showing your Thai address

Bring photocopies of everything alongside the originals. The officer will keep photocopies and return the originals to you.

### At the Office

1. Go to your local Revenue Department district office — not the central Bangkok head office. Find your nearest office at rd.go.th/english.
2. Tell the officer you need to register for a Personal Income Tax Identification Number (you can say "TIN registration" — most officers at district offices are familiar with the request).
3. Fill in Form PP09, the taxpayer registration form. The officer will usually help you complete it.
4. The process takes approximately 15–30 minutes.
5. Your TIN is issued the same day and will appear on the registration document you receive.

### Practical Tips

- Go early in the morning to avoid queues
- If your Thai is limited, bring a translation or printout of your address in Thai
- No work permit is required to obtain a TIN — you only need your passport, visa, and proof of address
- Some district offices have English-speaking staff; smaller offices may not

---

## After You Get Your TIN

Once you have your TIN, several things become available to you:

### File Tax Returns

Use your TIN to file PND 90 or PND 91 returns each year by 31 March. You can file online via the RD Smart Tax app (available on iOS and Android) or at the Revenue Department office.

### Claim Refunds

If your employer has over-withheld tax, or if you have had 5% or 15% withholding applied to rental or investment income at a rate higher than your effective rate, you can claim a refund only after filing a return using your TIN.

### Freelance Invoicing

If you are self-employed or freelance, Thai clients may require your TIN on invoices before they can process payment. Some clients also need your TIN to withhold tax on payments (3% withholding applies to many freelance payments).

### Register for the RD Smart Tax App

Download the Revenue Department's official mobile app and log in with your TIN. This app allows you to file returns, check tax records, and track refund status from your phone.

---

## Frequently Asked Questions

### Can a company register a TIN on my behalf?
Yes — Thai employers commonly register TINs for their foreign employees as part of the onboarding process. If your employer has done this, you may already have a TIN without being aware. Ask your HR or payroll team.

### Do I need a work permit to get a TIN?
No. A work permit is not required to register for a TIN. You only need your passport, visa, and proof of a Thai address.

### Is my TIN the same as my Thai ID number?
No. Thai nationals have a 13-digit national ID card number that also serves as their TIN. Foreign nationals are issued a separate 13-digit TIN that is not linked to a Thai national ID.

### What if I lose my TIN or forget the number?
Return to the Revenue Department district office with your passport. They can look up your TIN on the system and reissue the registration document.
    `,publishedAt:"2026-03-05",readTime:6,category:"Filing",sources:[{label:"Thai Revenue Department — TIN Registration",url:"https://www.rd.go.th/english/6044.html"},{label:"Thai Revenue Department — District Offices",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"transferring-money-to-thailand-tax-rules",title:"Transferring Money to Thailand: 2024 Tax Rules",excerpt:"The 2024 rule change affects expats remitting foreign income to Thailand. Learn what is taxable, what is not, and how to manage transfers to stay compliant.",content:`
## The Old Rule vs. the 2024 Change

For many years, Thailand operated on a convenient remittance principle: foreign income was only taxable if you brought it into Thailand in the same calendar year you earned it. Income earned in 2022 and transferred to Thailand in 2023 was not taxable. Many expats used this rule to time their transfers strategically.

**That loophole closed on 1 January 2024.**

Under Revenue Department Circular P.161/2566, Thai tax residents are now taxed on all foreign income remitted to Thailand, regardless of when that income was originally earned. Income earned in 2020 and transferred to Thailand in 2025 is now assessable income for 2025.

This change affects every Thai tax resident who receives money from abroad.

---

## What Counts as "Remitting" Money to Thailand?

A remittance is any movement of money from a foreign source into Thailand for your use. This includes:

- **International wire transfers** to a Thai bank account
- **ATM cash withdrawals** in Thailand using a foreign debit card
- **Credit or debit card purchases** in Thailand charged to a foreign account
- **Digital transfers** via Wise, Revolut, PayPal, or similar services to a Thai account or used for Thai purchases
- **Cash brought into Thailand** above the reporting threshold (currently USD 20,000 or equivalent)

---

## What Is NOT Taxable When Brought Into Thailand?

Not everything transferred to Thailand is income. The following are generally not assessable:

- **Capital accumulated before you became a Thai tax resident** — savings you held before your Thai residency began are capital, not income
- **Pre-2024 savings** — income earned and saved before 1 January 2024 may not be assessable under the new rule (this remains a grey area; keep documentation)
- **Gifts from non-residents** — money given to you by a person who is not a Thai tax resident is not assessable income in your hands
- **Loans** — borrowed money is not income
- **Inheritance** — money inherited is not assessable personal income

**The critical distinction is income vs. capital.** If you are transferring savings accumulated before your Thai residency, or pre-2024 savings, document this clearly. Bank statements, investment records, and a clear record of when funds were earned versus when they were saved will support your position if the Revenue Department queries a transfer.

---

## Who Is Affected?

| Situation | Affected by the 2024 change? |
|---|---|
| Thai tax resident (180+ days), remitting foreign income | Yes — taxable |
| Non-resident (under 180 days), remitting anything | No — non-residents pay Thai tax only on Thai-sourced income |
| Thai tax resident remitting pre-residency savings | No — capital, not income |
| Tourist using a foreign card in Thailand | No — not a tax resident |

---

## Practical Examples

| Scenario | Taxable? |
|---|---|
| UK expat wires monthly salary to Thai bank account | Yes |
| Retiree transfers savings accumulated over 10 years before moving to Thailand | No (capital) |
| Digital nomad sends Wise payment to Thai account for rent | Yes |
| Remote worker receives salary into foreign account; withdraws at Bangkok ATM | Yes |
| Investor transfers dividends earned offshore, kept in foreign account | No (not remitted) |
| Investor remits those same dividends to Thailand in a later year | Yes (once remitted) |

---

## How Much Tax Would You Pay?

Remitted foreign income is added to your total assessable income for the year and taxed at progressive rates after your personal allowances and deductions. There is no flat rate for remitted income.

At 60,000 THB personal allowance and 100,000 THB employment deduction, the first approximately 310,000 THB of total income is effectively tax-free for a salaried employee. Income above that is taxed from 5% upwards.

Use the calculator to estimate your total tax position including any remitted foreign income.

---

## How to Reduce the Tax on Remittances

### Transfer Only What You Need

The simplest approach: remit only what you need to cover your Thai living expenses. Money kept in an overseas account is not taxable. Keep foreign savings, investments, and income offshore until you actually need the funds in Thailand.

### Transfer Capital, Not Income

If you have both savings (capital) and current income in the same overseas account, consider opening a separate account for pre-residency savings or pre-2024 funds. Keeping them separate makes it easier to document which transfers are capital (not taxable) and which are income (taxable).

### Consider the LTR Visa

For higher-income earners, the Long-Term Resident (LTR) Wealthy Global Citizen, Wealthy Pensioner, and Work-from-Thailand Professional visa categories provide a complete exemption from Thai tax on all foreign-sourced income. If your annual foreign income exceeds the qualifying thresholds (USD 80,000 for most categories), the LTR visa eliminates the remittance tax problem entirely.

### Claim DTA Foreign Tax Credits

If you have already paid tax on the remitted income in your home country, the Double Tax Agreement between Thailand and that country may allow you to claim a foreign tax credit — reducing your Thai tax by the amount already paid abroad. You cannot pay tax twice on the same income under a DTA.

---

## Record Keeping

Good documentation protects you if the Revenue Department ever queries a transfer:

- **Bank statements** showing the source of funds and when they were deposited
- **Pay slips or employment records** showing when income was earned
- **Investment records** distinguishing capital gains from dividends and interest
- **A clear record of the date you became a Thai tax resident** — this is the baseline for the capital vs. income distinction

There is no formal registration process for declaring capital transfers. The documentation is for your own protection and must be produced if queried.
    `,publishedAt:"2026-03-05",readTime:7,category:"International",sources:[{label:"Revenue Department Circular P.161/2566",url:"https://www.rd.go.th/english/index-eng.html"},{label:"Thai Revenue Department — Personal Income Tax",url:"https://www.rd.go.th/english/6045.html"}]},{slug:"thailand-tax-for-uk-expats",title:"Thailand Tax for UK Expats: A Complete Guide",excerpt:"UK nationals in Thailand face tax in both countries — covering the UK-Thailand tax treaty, pensions, rental income, and residency rules for expats.",content:`
## The Dual Tax Position for UK Citizens

When you move to Thailand as a UK national, you do not automatically leave the UK tax system. Two things happen simultaneously:

1. **Thailand** taxes you on Thai income and — once you become a Thai tax resident (180+ days per year) — on foreign income you remit to Thailand
2. **The UK** continues to tax you on UK-sourced income until you have formally established non-residency under the UK Statutory Residence Test

The UK-Thailand Double Tax Agreement (DTA) prevents you from paying full tax twice on the same income, but it does not eliminate all obligations. Understanding both sides is essential.

---

## Leaving the UK for Tax Purposes

The UK Statutory Residence Test (SRT) determines whether you remain a UK tax resident after leaving. You do not automatically stop being a UK resident just by moving abroad — you must meet specific conditions.

**Automatic non-residence applies if:**
- You spend fewer than 16 days in the UK in the tax year, or
- You spend fewer than 46 days in the UK and were not UK-resident in any of the previous 3 tax years, or
- You work full-time overseas (averaging 35+ hours per week) with fewer than 91 days in the UK

Once you qualify as UK non-resident, you are no longer taxed by the UK on most foreign income. However, **the UK still taxes non-residents on UK-sourced income** — salary from UK employers, UK rental income, and UK pension income (with exceptions — see below).

### Notifying HMRC

Notify HMRC of your departure using **form P85** (available at gov.uk). This starts the process of adjusting your UK tax position. You should also apply for an NT (no tax) PAYE code if you receive a UK salary or private pension to stop UK withholding at source.

---

## What Income Does Thailand Tax for UK Expats?

Once you are a Thai tax resident (180+ days per year), Thailand taxes:

- **Thai employment income** — salary, bonuses, benefits from a Thai employer
- **UK salary or self-employment income** remitted to Thailand — taxable since the 2024 remittance rule change
- **UK private pension income** remitted to Thailand — taxable (credit available for any UK tax withheld)
- **UK rental income** remitted to Thailand — potentially taxable; DTA credit available
- **Investment income** (dividends, interest) remitted to Thailand from any source

Income left in a UK bank account and not remitted to Thailand is not taxed here.

---

## The UK-Thailand Double Tax Agreement

The UK and Thailand have a DTA that covers most income types. The key provisions:

- **Employment income:** taxable where the work is performed. Thai employment income is taxed in Thailand; UK employment income is taxed in the UK (and may also be assessed in Thailand if remitted, with a credit)
- **Dividends:** taxable in both countries, but withholding rates are capped; credits available
- **Interest:** taxable in both countries; withholding capped at 25% in source country
- **Pensions:** see below — the treatment depends heavily on the type of pension

**Government service pensions** — pensions paid by the UK government for service in a civil, military, or public capacity (NHS, military, teachers, local council) — are taxable **only in the UK**, not in Thailand. This is a significant exception for many UK expats.

**Private pensions, workplace pensions, and SIPPs** — taxable in Thailand as the country of residence. Claim a credit for any UK withholding tax that has been deducted.

---

## UK State Pension in Thailand

The UK State Pension is taxable in Thailand for Thai tax residents. It is treated as foreign pension income remitted to Thailand.

**Practical steps:**
1. Apply to HMRC for a **gross payment arrangement** (NT code) so the UK pays the State Pension without deducting UK income tax
2. Declare the full State Pension amount on your Thai PND 90 return each year
3. Apply personal allowances and the standard tax calculation — most retirees with only modest additional income will pay little or no Thai tax after allowances

For full details on UK and other foreign pension taxation, see the foreign pension income article.

---

## UK Rental Income While Living in Thailand

If you own rental property in the UK while living in Thailand:

- **UK tax:** Rental income is always taxable in the UK. You must file a UK Self Assessment return each year.
- **Thai tax:** If you remit rental income to Thailand, it is potentially assessable as foreign income. The DTA credit prevents double payment.
- **Non-Resident Landlord (NRL) scheme:** Register with HMRC as a non-resident landlord so your letting agent or tenant pays rent gross (without withholding). This avoids over-withholding that you then need to reclaim.

---

## What to Do Before You Leave the UK

### 1. File Form P85

Notify HMRC of your departure and estimated date of leaving. This triggers a review of your UK tax position.

### 2. Apply for NT (No Tax) Codes

If you receive a UK salary, pension, or investment income, apply for PAYE NT codes so payments are made gross. This avoids the need to reclaim UK withholding tax.

### 3. Register as a Non-Resident Landlord

If you own UK rental property, register with HMRC's NRL scheme before leaving. Without this, letting agents must withhold 20% of gross rent.

### 4. Review Your National Insurance Position

Once you leave the UK, you stop automatically building State Pension entitlement. You can make **voluntary Class 2 NICs** from abroad at approximately £3.45 per week (2024/25 rate) — one of the best-value investments available to most UK expats. Check your NI record and State Pension forecast at the Government Gateway.

---

## ISAs and UK Investments

UK ISAs remain tax-free for UK tax purposes after you leave — no UK tax on interest or gains. However, Thailand has no equivalent ISA concept:

- ISA income that you remit to Thailand is potentially assessable in Thailand
- ISA capital gains remitted to Thailand are assessable as foreign income

A practical strategy: hold ISA income offshore and transfer capital (original investment amounts) to Thailand instead, keeping income generating within the ISA wrapper overseas.

---

## Filing Summary

| Obligation | Country | Deadline | Form |
|---|---|---|---|
| Thai income tax (all income sources) | Thailand | 31 March | PND 90 or PND 91 |
| UK income tax (UK-sourced income) | UK | 31 January | Self Assessment SA100 |
| UK NRL quarterly return (if applicable) | UK | Quarterly | NRL1 |
| HMRC departure notification | UK | When leaving | P85 |
    `,publishedAt:"2026-03-05",readTime:9,category:"International",sources:[{label:"HMRC — Statutory Residence Test",url:"https://www.gov.uk/government/publications/rdr3-statutory-residence-test-srt/guidance-note-for-statutory-residence-test-srt-rdr3"},{label:"HMRC — Form P85 (Leave the UK)",url:"https://www.gov.uk/tell-hmrc-change-of-details"},{label:"UK-Thailand Double Tax Agreement",url:"https://www.gov.uk/government/publications/thailand-tax-treaties"},{label:"HMRC — Non-Resident Landlord Scheme",url:"https://www.gov.uk/government/publications/non-resident-landord-guidance-notes-for-letting-agents-and-tenants-non-resident-landlords-scheme-guidance-notes/what-the-non-resident-landlords-scheme-is"},{label:"Thai Revenue Department — Personal Income Tax",url:"https://www.rd.go.th/english/6045.html"}]},{slug:"rental-income-tax-thailand",title:"Rental Income Tax in Thailand: A Practical Guide",excerpt:"Rental income from Thai property is taxable for all owners. Learn how tax is calculated, the 30% expense deduction, and withholding rules for corporate tenants.",content:`
## Is Rental Income Taxable in Thailand?

Yes. Rental income from Thai property is assessable personal income under Section 40(5) of the Revenue Code. This applies whether you are:

- A Thai national
- A foreign national who owns Thai property (foreigners can legally own condominiums in Thailand on a freehold basis)
- A Thai tax resident or a non-resident earning rental income from a Thai property

Non-residents are taxed on Thai-sourced income even if they do not spend 180 days in Thailand. Rental income from Thai property is Thai-sourced income.

---

## How Rental Income Tax Is Calculated

### Step 1: Choose Your Expense Deduction Method

You have two options for deducting expenses from your gross rental income:

**Option A: 30% Flat-Rate Deduction (Most Common)**

Deduct 30% of gross rental income automatically, with no receipts or documentation required. Net assessable income = 70% of gross rent.

This is the standard approach for most individual landlords. It is simple, requires no paperwork, and is accepted by the Revenue Department without question.

**Option B: Actual Expense Deduction**

Deduct documented actual expenses including repairs, maintenance, management fees, insurance, and depreciation. This requires receipts and records.

Only worthwhile if your actual costs genuinely exceed 30% of gross rent — which is uncommon for residential lettings.

### Step 2: Apply Progressive Tax Rates

Your net rental income is added to your total assessable income for the year. Progressive income tax rates apply after all allowances and deductions (personal allowance, employment deduction, etc.).

### Step 3: Claim Withholding Credits (If Applicable)

If a company paid you rent and withheld 5%, claim this as a credit against your total tax liability.

---

## Worked Example

**Scenario:** A single expat earns 30,000 THB per month from renting a Bangkok condo. No other income.

| Item | Amount (THB) |
|---|---|
| Annual rental income | 360,000 |
| Less 30% flat-rate deduction | −108,000 |
| Net assessable rental income | 252,000 |
| Less personal allowance | −60,000 |
| Total assessable income | 192,000 |
| First 150,000 THB at 0% | 0 |
| Remaining 42,000 THB at 5% | 2,100 |
| Total tax due | 2,100 THB |

Effective tax rate on gross rental income: approximately 0.6%.

---

## Withholding Tax from Corporate Tenants

If your tenant is a company (not an individual), the company is legally required to withhold **5% of rent** at source before paying you. This is common when renting to businesses, multinational companies, or organisations.

What this means in practice:
- Your tenant pays you 95% of the agreed rent and remits 5% directly to the Revenue Department
- They issue you a withholding tax certificate showing the amount withheld
- You include the gross rent (100%) in your income on your PND 90 return and claim the 5% withholding as a tax credit

**Important:** Corporate tenants are supposed to provide this certificate automatically, but some do not. Actively request it — you need it to claim the credit.

Individual tenants (private renters) have no withholding obligation. They simply pay you the agreed rent in full.

---

## Filing Threshold for Rental Income

The filing threshold for rental and investment income is lower than for salary income:

- **Single individual:** 60,000 THB per year in rental income (gross) triggers a filing requirement
- **Married couple:** 120,000 THB per year combined

This means even modest rental income — such as renting a spare room — may require you to file a PND 90 return.

---

## Rental Income from Overseas Property

If you are a Thai tax resident and own rental property abroad:

- Income from overseas property is **not taxable in Thailand if it remains offshore** — only remitted income is taxable
- If you transfer overseas rental income to a Thai bank account, it becomes assessable income in Thailand
- The Double Tax Agreement between Thailand and the property's country may allow a foreign tax credit for tax already paid in the source country

**Practical approach:** Keep overseas rental income in a foreign account. Transfer capital or older savings (not the rental proceeds themselves) to cover your Thai living expenses.

---

## Tips for Property Owners in Thailand

1. **File PND 90** — rental income cannot be declared on PND 91 (which is for employment income only)
2. **Collect withholding certificates** from corporate tenants proactively — don't wait for them to offer
3. **Keep lease agreements** for at least 5 years (the Revenue Department audit window)
4. **Declare all rental income** — the Revenue Department has access to Land Department records of registered leases
5. **Consider the 30% flat deduction** unless your documented actual costs clearly exceed this
6. **Foreign rental income:** make a conscious decision about whether to remit it to Thailand, as once remitted it is taxable
    `,publishedAt:"2026-03-05",readTime:6,category:"Tax Basics",sources:[{label:"Thai Revenue Code Section 40(5) — Rental Income",url:"https://www.rd.go.th/english/6045.html"},{label:"Thai Revenue Department — Personal Income Tax Guide",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"dtv-visa-thailand-tax-guide",title:"DTV Visa and Thai Tax: What You Actually Owe",excerpt:"The Destination Thailand Visa creates real tax questions — especially around the 180-day rule. Here's what Soft Power and Digital Nomad DTV holders need to know about Thai income tax.",content:`
## What is the DTV?

The Destination Thailand Visa (DTV) is a long-stay visa launched in 2024 designed for people who want to spend extended time in Thailand without committing to permanent residency. It is valid for five years and allows stays of up to 180 days per entry.

There are two DTV subtypes:

### Soft Power DTV
For people participating in Thailand's approved cultural and lifestyle activities:
- Muay Thai training
- Thai cooking classes
- Traditional arts, crafts, or music
- Thai language study
- Wellness and yoga programs
- Certain sports and creative activities

Applicants must show evidence of enrollment in an approved program and demonstrate sufficient funds (generally 500,000 THB or equivalent).

### Digital Nomad DTV
For remote workers and freelancers employed by or contracting for **overseas companies**. The key requirement is that your work and income must originate outside Thailand — you are not employed by a Thai entity and not performing work *for* Thai clients or businesses.

## The Core Tax Question

A common misconception among DTV holders is that the visa itself resolves your tax obligations — that because you're on a "tourist-style" long-stay visa, Thai tax simply doesn't apply. This is incorrect.

**Your visa type does not determine your tax residency.** Your tax obligations in Thailand are determined by how many days you spend in the country in a given calendar year.

## The 180-Day Rule and What It Means for DTV Holders

Thailand's personal income tax system is based on one straightforward test:

> **If you spend 180 days or more in Thailand during a calendar year (January–December), you are a Thai tax resident for that year.**

Days do not need to be consecutive. Partial days typically count as full days. The 180-day threshold is per calendar year, not per visa period.

### The DTV and the 180-Day Overlap

The DTV allows up to **180 days per entry** — a number that is not a coincidence, and not a tax loophole. It is a visa duration limit, not a tax exemption.

This creates a practical tension:

| DTV Usage Pattern | Tax Residency Outcome |
|---|---|
| Enter once, stay fewer than 180 days, leave | **Non-resident** — no Thai tax obligation on foreign income |
| Enter twice in one year, total days in Thailand ≥ 180 | **Tax resident** — Thai tax obligations apply |
| Stay close to 180 days, exit and re-enter | Depends on **total days in the calendar year**, not per entry |

Many DTV holders are surprised to find they have crossed the 180-day threshold without realising it, particularly those who treat the DTV as a home base and make short trips abroad.

## Soft Power DTV: Tax Implications

If you hold a Soft Power DTV and are primarily participating in cultural activities, your situation depends on:

1. **Your income source** — Are you earning anything while in Thailand?
2. **Your residency status** — Have you crossed 180 days in the calendar year?

### If you earn no income while in Thailand
If you are funded by savings, a partner's income, or other passive sources and have no active income, your Thai tax obligation is minimal or nil. You would not typically need to file a Thai tax return unless you have taxable Thai-sourced income (e.g. interest from a Thai bank account above a small threshold).

### If you earn income and become tax resident
Once you cross 180 days and become a Thai tax resident, you are liable for tax on:

- **Thai-sourced income** (any income generated from work or services performed in Thailand)
- **Foreign income remitted to Thailand** (from January 2024, all foreign income you bring into Thailand is taxable regardless of when it was earned)

### A grey area: working while on Soft Power DTV
The Soft Power DTV does not include a work permit. Performing work services for Thai or foreign clients while on this visa is technically not authorised. However, **tax obligations exist independently of work permit status** — if you earn income and remit it to Thailand, it is assessable income under Thai law regardless of your visa category.

## Digital Nomad DTV: Tax Implications

The Digital Nomad DTV has a specific profile in mind: a person working remotely for a foreign employer or clients, earning in a foreign currency, and bringing some of that money into Thailand to cover living expenses.

### The key variable: days in Thailand

**Under 180 days in a calendar year (non-resident):**
- You are only taxed on income that is **sourced in Thailand**
- Foreign income — salary, freelance payments, dividends from overseas — is generally not taxable in Thailand
- Most Digital Nomad DTV holders who manage their stays carefully fall into this category

**180 days or more in a calendar year (tax resident):**
- Thai-sourced income is taxable
- **Foreign income remitted to Thailand becomes taxable** under the 2024 rule change
- This includes money transferred from a foreign bank account, ATM withdrawals in Thailand from a foreign card, and potentially credit card spend charged to a foreign account

### The 2024 Foreign Income Rule Change

Prior to 2024, the rule was that foreign income was only taxable if remitted to Thailand in the *same year* it was earned. This created a planning opportunity: you could keep savings offshore and bring them in the following year tax-free.

**From 1 January 2024, this exemption was removed.** All foreign income remitted to Thailand is now assessable income for Thai tax residents, regardless of when it was earned.

This change significantly affects long-stay Digital Nomad DTV holders who become Thai tax residents.

## What Counts as "Remittance"?

For tax residents, understanding what constitutes a taxable remittance matters:

| Action | Treated as Remittance? |
|---|---|
| Bank transfer from foreign account to Thai bank account | Yes |
| ATM withdrawal in Thailand using a foreign debit card | Yes |
| Receiving salary into a Thai bank account | Yes |
| Foreign credit card purchases made in Thailand | Generally yes (Revenue Department guidance treats this as remittance) |
| Paying for Thai accommodation directly from overseas | Generally no — payment did not enter Thailand |

The safer assumption is that **money you use or access in Thailand from foreign sources counts as remittance**.

## Do DTV Holders Have to File a Tax Return?

Filing obligations depend on:

1. **Whether you are tax resident** (180+ days)
2. **Whether your assessable income exceeds the filing threshold**

### Filing thresholds (2024):
- Single filer: assessable income exceeding **120,000 THB** per year
- Married filer: assessable income exceeding **220,000 THB** per year

If you are a tax resident and your remitted foreign income (plus any Thai-sourced income) exceeds these thresholds, you are required to file a **PND 90** return by **31 March** of the following year.

**Non-residents with no Thai-sourced income typically have no filing obligation.**

## What Happens if You Don't Pay or File?

Thailand's Revenue Department has historically focused enforcement on higher-income residents and those with clear Thai-sourced income. However, enforcement is increasing, particularly around foreign income remittance following the 2024 rule change.

Potential consequences of non-compliance:

| Situation | Consequence |
|---|---|
| Filed late | Surcharge of 1.5% per month on unpaid tax |
| Failed to file | Penalty of up to 200% of tax owed (in egregious cases) |
| Underpaid tax | Interest of 1.5% per month on the shortfall |
| Criminal non-compliance | Fines and, in extreme cases, prosecution |

For most DTV holders with modest foreign income and careful day counting, enforcement risk is low. But the obligations are real — and claiming ignorance of the rules is not a recognised defence under Thai tax law.

### Practical risk factors that raise enforcement probability:
- Holding a Thai bank account with large, regular foreign transfers
- Having a Thai Tax ID number (TIN) on file with the Revenue Department
- Owning Thai property (triggers Revenue Department attention)
- Running any Thai-registered business activity

## Does the DTV Offer Any Tax Exemptions?

**No.** The DTV provides no preferential tax treatment. It is not equivalent to the [LTR visa](/articles/ltr-visa-tax-benefits), which explicitly exempts qualifying holders from Thai tax on foreign income.

If you want a visa that comes with a built-in tax benefit for foreign income, the LTR Work-from-Thailand category is worth investigating — though it has significantly higher income and asset requirements.

## Comparison: DTV vs. LTR Tax Treatment

| Feature | DTV (Both Types) | LTR Work-from-Thailand |
|---|---|---|
| Foreign income tax exemption | No | Yes (full exemption) |
| Needs work permit for remote work | Not included | Included |
| Tax residency trigger | 180 days | 180 days (but moot — foreign income exempt) |
| Eligibility | Broad | USD 80,000+ income, 2-year history |
| Cost | ~10,000 THB | ~50,000 THB application fee |

## Practical Guidance for DTV Holders

### Track your days carefully
Keep a personal log of entry and exit dates. Immigration stamps are not always reliable for counting — carry a personal record. Apps like TravelSpend or a simple spreadsheet work well.

### Know your threshold
If you are approaching 180 days, you face a choice: either extend your stay and accept tax residency obligations, or exit Thailand and reset the count before the calendar year ends.

### Understand your income picture
If you are a non-resident for the full year, your foreign income is generally not taxable in Thailand. If you become a tax resident, total remittances to Thailand need to be tracked and reported.

### Get a Thai Tax ID if you plan to file
If you become tax resident and need to file, you will need a Thai Tax ID number. These are issued at the local Revenue Department office. [Learn how to get one here](/articles/how-to-get-thai-tax-id-number).

### Consider professional advice for complex situations
If you earn significant foreign income, have income from multiple countries, or are uncertain about your residency count, a Thai tax advisor familiar with expat situations is worth consulting. The cost is typically far less than a penalty assessment.

## Summary

| Situation | Tax Obligation |
|---|---|
| DTV holder, under 180 days in Thailand | No Thai tax on foreign income; only Thai-sourced income is taxable |
| DTV holder, 180+ days, no income remitted | Minimal — but file if assessable Thai income exceeds threshold |
| DTV holder, 180+ days, remitting foreign income | Tax resident — foreign remittances are assessable income |
| DTV holder, not paying despite obligations | Risk of penalties, surcharges, and (in serious cases) prosecution |

The DTV is an excellent long-stay option for many people — but it is not a tax shelter. Manage your day count and remittances carefully, and you can often minimise or eliminate Thai tax obligations legally. Cross 180 days without planning, and your tax position changes materially.
    `,publishedAt:"2026-04-15",readTime:12,category:"International",sources:[{label:"Thai Revenue Department — Personal Income Tax",url:"https://www.rd.go.th/english/6045.html"},{label:"Thai Revenue Department — Tax Residency Rules",url:"https://www.rd.go.th/english/index-eng.html"},{label:"Ministry of Foreign Affairs — Destination Thailand Visa",url:"https://www.mfa.go.th/en/page/destination-thailand-visa"},{label:"Thai Revenue Department — 2024 Foreign Income Rule (Departmental Instruction Paw 161/2566)",url:"https://www.rd.go.th/english/index-eng.html"}]},{slug:"thailand-tax-for-us-expats",title:"Thailand Tax for US Expats: A Complete Guide",excerpt:"US citizens in Thailand navigate two tax systems. This covers Thai obligations, FBAR, FATCA, the Foreign Earned Income Exclusion, and the Foreign Tax Credit.",content:`
## The Unique Challenge for US Citizens

Almost every country in the world taxes residents — if you leave, your home-country tax obligations largely disappear. The United States is a significant exception: the US taxes its citizens on their worldwide income regardless of where they live. Moving to Thailand does not remove your US tax obligations.

Living in Thailand therefore creates two simultaneous tax systems:

- **Thailand** taxes you on Thai income and, once you are a Thai tax resident (180+ days per year), on foreign income you remit to Thailand
- **The United States** taxes you on your worldwide income every year, including income earned and taxed in Thailand

The good news: the US-Thailand Double Tax Agreement (DTA) and US tax provisions like the Foreign Earned Income Exclusion and Foreign Tax Credit are specifically designed to prevent genuine double taxation. Most US expats in Thailand do not pay full tax twice — but they do have significant reporting obligations.

---

## US Tax Obligations That Follow You to Thailand

### Annual Form 1040

US citizens must file a federal income tax return every year, regardless of where they live. The deadline for Americans abroad is **15 June** (with an automatic 2-month extension from the standard April deadline). A further extension to 15 October can be requested.

Filing does not always mean paying — the Foreign Earned Income Exclusion and Foreign Tax Credit often reduce or eliminate US tax owed. But the filing obligation itself never goes away.

### FBAR — Foreign Bank Account Reporting

If the **aggregate value** of all your foreign financial accounts (bank accounts, investment accounts, certain insurance policies) exceeds **USD 10,000 at any point during the calendar year**, you must file a Foreign Bank Account Report (FBAR) via FinCEN Form 114.

Key details:
- Filed separately from your tax return, at fincen.gov (not the IRS)
- Deadline: 15 April, with an automatic extension to 15 October
- Penalties for non-filing are severe: up to USD 10,000 per year for non-willful violations; USD 100,000 or 50% of account value per year for willful violations
- A single Thai bank account with 350,000 THB (~USD 10,000) triggers the requirement

### Form 8938 — FATCA Reporting

Under FATCA (Foreign Account Tax Compliance Act), US taxpayers living abroad must file Form 8938 (attached to Form 1040) if foreign financial assets exceed:
- USD 200,000 on the last day of the tax year, **or**
- USD 300,000 at any point during the year

(Higher thresholds apply for joint filers.)

FBAR and Form 8938 can overlap — you may need to file both for the same accounts. When in doubt, file both.

---

## Thai Tax Obligations for US Citizens

Your Thai tax obligations are identical to those of any other expat:

- Become a Thai tax resident after 180+ days in Thailand in a calendar year
- Thai-sourced income is taxable (salary, freelance, Thai business income)
- Foreign income remitted to Thailand is taxable since the 2024 rule change
- File PND 90 or PND 91 by 31 March each year

The US does not have a presence in the Thai filing process — your Thai return is filed independently with the Thai Revenue Department.

---

## The US-Thailand Double Tax Agreement

The DTA between the US and Thailand covers the main income categories and uses a credit mechanism to prevent double taxation:

- **Employment income:** taxable where the work is performed
- **Dividends:** taxable in both countries with withholding limits
- **Interest:** taxable in both countries
- **US government service pensions:** taxable only in the US
- **Business profits:** generally taxable only in the country of the permanent establishment

The DTA does not eliminate all double taxation, but it provides the framework for claiming credits that reduce overlapping tax.

---

## Foreign Earned Income Exclusion (FEIE)

The FEIE allows eligible US citizens working abroad to exclude a significant amount of foreign earned income from US taxation:

- **2024 exclusion amount:** USD 126,500 (indexed annually)
- **Eligibility:** You must pass either the **Physical Presence Test** (330+ days outside the US in any 12-month period) or the **Bona Fide Residence Test** (established residence in a foreign country for a full tax year)
- **What it covers:** Earned income only — salary, wages, self-employment income from work performed outside the US
- **What it does NOT cover:** Passive income — dividends, interest, capital gains, rental income, Social Security

To claim the FEIE, file Form 2555 with your Form 1040. The exclusion can eliminate US tax entirely for moderate earners working in Thailand.

---

## Foreign Tax Credit (FTC)

Instead of (or in addition to) the FEIE, you can claim a Foreign Tax Credit for Thai income tax paid on the same income that would otherwise be taxed by the US.

- **How it works:** US tax on foreign income is reduced dollar-for-dollar by foreign tax paid on the same income
- **FTC is generally more valuable** than the FEIE for higher earners or those with significant passive income
- **You cannot claim both** FEIE and FTC on the same dollars of income — but you can use FEIE for earned income and FTC for passive income

---

## US Social Security in Thailand

US Social Security benefits can be complex for Americans living in Thailand:

- The US taxes up to **85% of Social Security** for higher-income recipients (regardless of where they live)
- Thailand may also tax Social Security remitted to Thailand under the DTA — the DTA provisions on Social Security are ambiguous
- The Foreign Tax Credit can generally offset US tax with Thai tax paid on the same benefits

Given the complexity, US retirees receiving Social Security in Thailand should consult a US expat tax specialist.

---

## Thai Bank Accounts and FBAR: Practical Impact

Many US expats in Thailand maintain Thai bank accounts for daily living expenses. A typical Bangkok Bank or Kasikorn Bank account used for rent, food, and daily spending can easily exceed USD 10,000 — triggering the FBAR requirement.

**Common mistake:** Many US expats in Thailand are unaware of FBAR or believe the threshold is much higher. The threshold is low by design — USD 10,000 is approximately 350,000 THB at current rates.

Keep a note of the peak balance across all your foreign accounts during the year. If it exceeds USD 10,000 at any single point, you must file FBAR for that year.

---

## Practical Recommendations

1. **File Form 1040 every year** — the obligation is automatic regardless of income level
2. **Check your FBAR obligation** — if Thai + other foreign accounts ever exceeded USD 10,000, file FinCEN 114
3. **Keep records of Thai tax paid** — you will need this to claim the Foreign Tax Credit
4. **Evaluate FEIE vs. FTC** for your income mix — a US expat tax advisor can run both scenarios
5. **Do not close US brokerage accounts without advice** — premature account closures can trigger unexpected tax events
6. **Consider using a US CPA or Enrolled Agent** specializing in expat taxation — the combination of FEIE, FTC, FBAR, and Thai filing is genuinely complex

---

## Summary: Who Files What

| Obligation | Filed Where | Deadline | Form |
|---|---|---|---|
| Thai income tax | Thai Revenue Department | 31 March | PND 90 or PND 91 |
| US federal income tax | IRS | 15 June (abroad) / 15 April (US) | Form 1040 |
| Foreign bank account reporting | FinCEN | 15 April (auto-extend to 15 Oct) | FinCEN 114 (FBAR) |
| FATCA financial asset reporting | IRS (attached to 1040) | Same as 1040 | Form 8938 |
    `,publishedAt:"2026-03-05",readTime:10,category:"International",sources:[{label:"IRS — Foreign Earned Income Exclusion",url:"https://www.irs.gov/individuals/international-taxpayers/foreign-earned-income-exclusion"},{label:"FinCEN — FBAR Filing",url:"https://bsaefiling.fincen.gov/file/fbar"},{label:"IRS — Form 8938 (FATCA)",url:"https://www.irs.gov/forms-pubs/about-form-8938"},{label:"US-Thailand Tax Treaty",url:"https://www.irs.gov/businesses/international-businesses/thailand-tax-treaty-documents"},{label:"Thai Revenue Department — Personal Income Tax",url:"https://www.rd.go.th/english/6045.html"}]}];function wg(e){return Cn.find(t=>t.slug===e)}const bg=["how-to-use-the-thai-tax-calculator","thai-tax-brackets-explained"],Sg={"how-to-use-the-thai-tax-calculator":["thai-tax-brackets-explained","understanding-thai-tax-residency"],"understanding-thai-tax-residency":["expat-guide-filing-thai-taxes","foreign-income-thailand-tax"],"maximizing-tax-deductions-thailand":["flat-rate-vs-actual-expenses","thai-tax-brackets-explained"],"thai-tax-brackets-explained":["maximizing-tax-deductions-thailand","how-to-use-the-thai-tax-calculator"],"expat-guide-filing-thai-taxes":["understanding-thai-tax-residency","how-to-get-thai-tax-id-number"],"foreign-income-thailand-tax":["transferring-money-to-thailand-tax-rules","double-tax-agreements-thailand"],"social-security-contributions-thailand":["freelancer-tax-guide-thailand","maximizing-tax-deductions-thailand"],"freelancer-tax-guide-thailand":["withholding-tax-freelancers-thailand","flat-rate-vs-actual-expenses"],"flat-rate-vs-actual-expenses":["freelancer-tax-guide-thailand","maximizing-tax-deductions-thailand"],"pnd94-mid-year-tax-filing":["freelancer-tax-guide-thailand","withholding-tax-freelancers-thailand"],"withholding-tax-freelancers-thailand":["pnd94-mid-year-tax-filing","freelancer-tax-guide-thailand"],"vat-registration-freelancers":["freelancer-tax-guide-thailand","freelancer-record-keeping-thailand"],"digital-nomad-taxes-thailand":["dtv-visa-thailand-tax-guide","foreign-income-thailand-tax"],"freelancer-record-keeping-thailand":["vat-registration-freelancers","freelancer-tax-guide-thailand"],"double-tax-agreements-thailand":["foreign-income-thailand-tax","transferring-money-to-thailand-tax-rules"],"pensioner-retiree-tax-guide-thailand":["foreign-pension-income-thailand-tax","thailand-retirement-visa-tax-obligations"],"foreign-pension-income-thailand-tax":["pensioner-retiree-tax-guide-thailand","double-tax-agreements-thailand"],"investment-income-retirees-thailand":["pensioner-retiree-tax-guide-thailand","foreign-pension-income-thailand-tax"],"thailand-retirement-visa-tax-obligations":["pensioner-retiree-tax-guide-thailand","ltr-visa-tax-benefits"],"ltr-visa-tax-benefits":["dtv-visa-thailand-tax-guide","foreign-income-thailand-tax"],"dtv-visa-thailand-tax-guide":["ltr-visa-tax-benefits","foreign-income-thailand-tax"],"thailand-tax-guide-for-expats":["understanding-thai-tax-residency","expat-guide-filing-thai-taxes"],"how-to-get-thai-tax-id-number":["expat-guide-filing-thai-taxes","understanding-thai-tax-residency"],"transferring-money-to-thailand-tax-rules":["foreign-income-thailand-tax","double-tax-agreements-thailand"],"thailand-tax-for-uk-expats":["double-tax-agreements-thailand","foreign-pension-income-thailand-tax"],"rental-income-tax-thailand":["thai-tax-brackets-explained","maximizing-tax-deductions-thailand"],"thailand-tax-for-us-expats":["double-tax-agreements-thailand","foreign-income-thailand-tax"]};function Ng(e,t=2){const n=Sg[e]??[],a=bg.filter(i=>i!==e);return[...n,...a].filter((i,s,l)=>i!==e&&l.indexOf(i)===s).slice(0,t).map(i=>Cn.find(s=>s.slug===i)).filter(i=>i!==void 0)}function kg(e){const t=e.toLowerCase();return Cn.filter(n=>n.title.toLowerCase().includes(t)||n.excerpt.toLowerCase().includes(t)||n.category.toLowerCase().includes(t))}const $r=[{name:"Expats Moving to Thailand",items:[{question:"Do I pay tax on money I bring to Thailand when I move here?",answer:"Whether money you bring into Thailand is taxable depends on whether it is income or capital. Capital — savings you accumulated before becoming a Thai tax resident — is generally not assessable income and is not taxed when brought in. Income — money you earned — that is remitted (transferred, withdrawn, or spent) in Thailand is taxable if you are a Thai tax resident (present in Thailand for 180 or more days in a year). Since January 2024, this applies regardless of when the income was earned. If you are moving to Thailand for the first time, document the source of any large transfers (bank statements, pay slips, investment records) to demonstrate that the funds are pre-residency savings rather than current income."},{question:"Do I need to notify my home country's tax authority when I move to Thailand?",answer:"Usually yes. In the UK, you notify HMRC of your departure using form P85 and must meet the conditions of the Statutory Residence Test to establish UK non-residency. In Australia, you notify the ATO and your residency status is assessed based on your intentions and connections. In the US, you remain a US taxpayer regardless of where you live — there is no process to leave US taxation, though the Foreign Earned Income Exclusion and Foreign Tax Credit reduce your US liability. For most other countries, there is a formal process to de-register or establish non-residency, and failure to notify can result in continued home-country tax obligations running alongside your Thai obligations."},{question:"Can I keep my money in a foreign bank account to avoid Thai tax?",answer:"Yes — if you are a Thai tax resident, income that remains in a foreign account and is never brought into Thailand is not assessable for Thai tax. Thailand's system is based on the remittance principle for foreign income: only income that is remitted (transferred, withdrawn, or used) in Thailand is taxable. A remittance includes wire transfers to a Thai bank account, ATM withdrawals in Thailand from a foreign account, and credit or debit card purchases in Thailand charged to a foreign account. Money sitting in a foreign account that you never access in Thailand is not remitted and is not taxed here."},{question:"What is the difference between Thai tax residency and having a Thai tax ID?",answer:"Tax residency and a Tax Identification Number (TIN) are two different things. Thai tax residency is a legal status — you become a Thai tax resident automatically once you have spent 180 or more days in Thailand in a given calendar year. A TIN is a practical tool: a 13-digit number issued by the Revenue Department that you use when filing tax returns, claiming refunds, or issuing invoices as a freelancer. You need to apply for a TIN in person at a Revenue Department district office (with your passport, visa, and proof of address). You can be a tax resident without yet having a TIN, and you can have a TIN without currently being a tax resident."}]},{name:"Pensioners & Retirees",items:[{question:"Do retirees get a special tax exemption in Thailand?",answer:"Yes. If you are aged 65 or over at the end of the tax year, the first 190,000 THB of your assessable income is completely exempt from personal income tax under Section 42(17) of the Revenue Code. Combined with the standard personal allowance (60,000 THB) and the 0% first tax bracket (150,000 THB), a retiree aged 65+ can receive up to approximately 400,000 THB before paying any Thai income tax."},{question:"Is my foreign pension taxable in Thailand?",answer:"If you are a Thai tax resident (180+ days in Thailand) and you transfer your foreign pension to Thailand, it is assessable income since the 2024 rule change. Tax treaties between Thailand and your home country may allow you to claim a credit for tax already paid abroad, reducing or eliminating double taxation. If you leave pension money in an overseas account without remitting it to Thailand, it is not taxable here."},{question:"Is UK State Pension taxable in Thailand?",answer:"For Thai tax residents, the UK State Pension is generally taxable in Thailand as your country of residence under the UK-Thailand Double Tax Agreement. UK private pensions are also taxable in Thailand. However, UK government service pensions (for civil servants, military, some teachers) are taxable only in the UK, not Thailand. You can claim a foreign tax credit for any UK tax withheld. Many retirees consider applying to HMRC for gross payment of their pension if they are Thai tax residents, to avoid UK withholding tax that then requires claiming back."},{question:"Is US Social Security taxable in Thailand?",answer:"This is complex. Under the US-Thailand DTA, Social Security may be taxable in Thailand as your country of residence. However, the US also taxes its own citizens on worldwide income regardless of where they live, creating a risk of double taxation. US citizens should use the Foreign Tax Credit on their US return to offset US tax with Thai tax paid, and vice versa. Given the complexity, US citizen retirees in Thailand should consult a specialist in US expat taxation."},{question:"Do retirees need to file a Thai tax return?",answer:"Yes, if you are a Thai tax resident (180+ days) and your assessable income exceeds the filing threshold. For pension or salary income, the threshold is 120,000 THB for single individuals or 220,000 THB for married couples. For investment or rental income, it is 60,000 THB (single) or 120,000 THB (married). Note that the 65+ exemption reduces your assessable income by 190,000 THB before the thresholds apply, meaning many retirees with modest income will owe no tax but may still need to file."},{question:"What is the LTR Wealthy Pensioner visa and how does it affect tax?",answer:"The Long-Term Resident (LTR) Wealthy Pensioner visa is a 10-year visa for retirees aged 50+ with USD 80,000 or more in annual pension/passive income (or USD 40,000+ with USD 250,000 in Thai assets). Unlike the standard Non-OA retirement visa, LTR Wealthy Pensioner holders receive a complete exemption from Thai tax on all foreign-sourced income — pensions, investments, rental income from abroad. There is no need to track remittances or claim foreign tax credits. The application fee is 50,000 THB."},{question:"Does holding a Thai retirement visa (Non-OA) reduce my tax?",answer:"No. The Non-Immigrant OA retirement visa provides no tax benefits whatsoever. Your tax obligations are based entirely on how many days you spend in Thailand (the 180-day rule), not on your visa type. If you spend 180+ days in Thailand on a Non-OA visa, you have the same tax obligations as any other Thai tax resident. Only the LTR visa categories provide genuine tax benefits."},{question:"How is Thai bank interest taxed for retirees?",answer:"Interest on Thai bank accounts is subject to 15% withholding tax deducted automatically by the bank. You can treat this withholding as your final tax on the interest (simpler), or include the interest on your annual return and claim the 15% as a credit — which may result in a partial refund if your effective tax rate is lower. For retirees aged 65+ with modest income, your effective rate on the first taxable income after allowances is 5%, making a refund possible if you include bank interest in your return."},{question:"Can I claim my parents as dependants on my Thai tax return?",answer:"Yes. You can claim a 30,000 THB allowance per parent who is aged 60 or over, is a Thai resident, and has their own income of no more than 30,000 THB per year. You can also claim up to 15,000 THB per parent for health insurance premiums you pay on their behalf. These deductions are in addition to your personal allowance and any other deductions you claim."},{question:"Are capital gains from selling shares in Thailand taxable for retirees?",answer:"Capital gains from selling shares listed on the Stock Exchange of Thailand (SET) are exempt from personal income tax for individuals — there is no capital gains tax on Thai listed shares. Capital gains on foreign shares, however, are assessable income if the proceeds are remitted to Thailand."}]},{name:"Tax Residency",items:[{question:"How is tax residency determined in Thailand?",answer:"You are considered a Thai tax resident if you spend 180 days or more in Thailand during a calendar year. The days do not need to be consecutive. Partial days are generally counted as full days."},{question:"What happens if I stay less than 180 days?",answer:"If you stay less than 180 days in a calendar year, you are a non-resident for tax purposes. Non-residents are only taxed on income earned within Thailand, typically at flat rates or through withholding tax."},{question:"Can I be a tax resident of both Thailand and another country?",answer:"Yes, dual tax residency is possible. In such cases, tax treaties between countries determine which country has primary taxing rights. You may need to claim foreign tax credits to avoid double taxation."},{question:"Does my visa type affect my tax residency status?",answer:"No. Tax residency is determined solely by the number of days you spend in Thailand, not by your visa type. Whether you hold a retirement visa (Non-OA), Thailand Privilege (Elite) visa, tourist visa, or work permit, you become a tax resident after 180 days in a calendar year. Only the LTR visa provides any tax benefit, and that is through a specific income exemption — not a change to residency rules."},{question:"Do I become a Thai tax resident automatically after 180 days, or do I need to register?",answer:"Tax residency is automatic — it is a factual status determined entirely by the number of days you are physically present in Thailand, with no registration required. Once you have spent 180 days or more in Thailand during a calendar year, you are a Thai tax resident for that year, whether or not any authority has been notified. However, you do need to obtain a Thai Tax Identification Number (TIN) before you can file a return or claim a refund of excess withholding tax. The TIN must be applied for in person at a Revenue Department district office."},{question:'What counts as a "day" in Thailand for the 180-day rule?',answer:'A partial day — any day on which you were physically present in Thailand, even briefly — generally counts as a full day. Both your arrival day and your departure day typically count. For example, arriving on January 15 and departing on July 15 would count 181 days. There is no precise statutory definition of a "day" in the Revenue Code, but Revenue Department practice is to count any calendar day on which you were present. To be conservative, count every day on which you were physically in Thailand at any point.'}]},{name:"Deductions & Allowances",items:[{question:"What is the personal allowance in Thailand?",answer:"Every taxpayer receives a personal allowance of 60,000 THB. This amount is deducted from your assessable income before calculating tax. If your spouse has no income, you can also claim an additional 60,000 THB spouse allowance."},{question:"Can I deduct insurance premiums?",answer:"Yes. Life insurance premiums are deductible up to 100,000 THB annually. Health insurance premiums are deductible up to 25,000 THB. Parent health insurance premiums have a separate limit of 15,000 THB."},{question:"What are SSF and RMF funds?",answer:"SSF (Super Savings Fund) and RMF (Retirement Mutual Fund) are tax-advantaged investment funds. SSF contributions are deductible up to 30% of income (max 200,000 THB). RMF contributions are deductible up to 30% of income (max 500,000 THB). Combined limits apply."},{question:"How much can I deduct for children?",answer:"You can deduct 30,000 THB per legitimate child. An additional 2,000 THB per child is available if the child is studying in Thailand. There is no limit on the number of children you can claim."}]},{name:"Filing & Deadlines",items:[{question:"When is the tax filing deadline in Thailand?",answer:"The annual tax return (PND 90/91) must be filed by March 31 of the following year. For example, income earned in 2024 must be filed by March 31, 2025. Online filing may extend this deadline by 8 days."},{question:"Do I need to file if my employer withholds tax?",answer:"Yes, you should still file an annual return even if your employer withholds tax. Filing allows you to claim additional deductions and potentially receive a refund. It also ensures compliance with Thai tax law."},{question:"How do I file my tax return?",answer:"You can file online through the RD Smart Tax app or the Revenue Department website (rd.go.th), or in person at your local Revenue Department office. Online filing is recommended for faster processing."},{question:"What documents do I need to file?",answer:"You need your withholding tax certificates (Form 50 Tawi) from employers and banks, personal identification (Thai ID or passport), Tax ID number, and supporting documents for any deductions you claim (receipts, certificates)."},{question:"What is the difference between PND 90 and PND 91?",answer:"PND 91 is for individuals whose only income is employment income — salary, wages, or pension from a single employer. PND 90 is for everyone else: if you have freelance income, business income, rental income, investment income, foreign income, or income from multiple sources, you use PND 90. In practice, most expats who have any income beyond a single Thai salary should use PND 90. If you are unsure which applies to you, PND 90 is the safe choice as it covers all income types."},{question:"Can I file my Thai tax return in English?",answer:"The official PND 90 and PND 91 forms are in Thai only. The Revenue Department's website (rd.go.th) has some English-language guidance, and the RD Smart Tax mobile app provides a guided filing experience with limited English support. In practice, most expats either use a Thai accountant or tax agent to prepare and file in Thai, or use the RD Smart Tax app which walks through fields step by step."},{question:"Do I need to file a Thai tax return even if I have no tax to pay?",answer:"If you are a Thai tax resident and your assessable income exceeds the filing threshold — 120,000 THB per year for single individuals with employment or pension income, or 60,000 THB for rental or investment income — you are technically required to file even if deductions and allowances reduce your final tax to zero. In practice, enforcement of filing-without-paying is limited, but it is legally required and best practice to file. If you have excess withholding tax deducted by your employer, you must file to claim a refund."}]},{name:"Income & Withholding",items:[{question:"How is monthly withholding tax calculated?",answer:"Employers estimate your annual income and calculate the annual tax liability. This amount is divided by 12 and withheld monthly. The calculation considers your allowances and deductions you have declared to your employer."},{question:"Is foreign income taxable in Thailand?",answer:"For Thai tax residents, foreign income brought into Thailand is taxable. Recent changes require foreign income remitted to Thailand to be declared regardless of when it was earned. Tax treaties may provide exemptions or credits."},{question:"What income is exempt from tax?",answer:"The first 150,000 THB of taxable income is exempt. Other exemptions include certain government payments, inheritance (subject to separate rules), and specific investment returns like those from certain government bonds."},{question:"How are dividends from Thai companies taxed?",answer:"Dividends from Thai companies are subject to 10% withholding tax deducted at source by the paying company. You can either treat this withholding as your final tax obligation (simpler), or include dividends in your annual return and claim the 10% withholding as a tax credit — which may result in a refund if your overall effective tax rate is lower."},{question:"Is rental income from property in Thailand taxable?",answer:"Yes. Rental income from Thai property is assessable income and must be declared on your annual return. You can deduct 30% of gross rental income as a flat-rate expense (no documentation needed), or claim actual rental-related expenses if they are higher and you can document them. Net rental income is then subject to progressive income tax rates."},{question:"How is rental income taxed in Thailand?",answer:"Rental income from Thai property is assessable income under Section 40(5) of the Revenue Code. You can deduct 30% of gross rental income as a standard flat-rate expense (no receipts needed), making 70% of your rent your net assessable income. This net income is added to your total income for the year and taxed at progressive rates after your personal allowances. If a company pays you rent, they are required to withhold 5% at source — collect a withholding tax certificate and claim this as a credit on your annual PND 90 return. Individual tenants have no withholding obligation."},{question:"Does Thailand have a capital gains tax?",answer:"Thailand does not have a separate capital gains tax in the traditional sense. Capital gains from selling shares listed on the Stock Exchange of Thailand (SET) are exempt from personal income tax for individual investors. For other assets — such as overseas shares, foreign property, or Thai real estate — the treatment is more complex. Proceeds from selling foreign assets that are remitted to Thailand are treated as assessable income subject to progressive rates. When you sell Thai property, Specific Business Tax (3.3% of sale price) applies if the property was held for fewer than 5 years, plus transfer fees — but there is no separate capital gains income tax on top of this."}]},{name:"Refunds & Payments",items:[{question:"How do I get a tax refund?",answer:"If you have overpaid tax (common if you have additional deductions not considered in withholding), you will receive a refund after filing your annual return. Refunds are typically processed within 3 months and deposited to your bank account."},{question:"What if I owe additional tax?",answer:"If your total tax liability exceeds the amount withheld, you must pay the difference when filing. Payment can be made at the Revenue Department office, through designated banks, or online through the RD Smart Tax app."},{question:"Are there penalties for late filing or payment?",answer:"Yes. Late filing incurs a penalty of up to 2,000 THB. Late payment incurs a surcharge of 1.5% per month on the outstanding amount. Interest also accrues on unpaid tax."}]},{name:"Working in Thailand as a Foreigner",items:[{question:"Do I need a work permit to have a Thai tax obligation?",answer:"No — tax obligations and work permit requirements are entirely separate. Your tax obligation is determined by your income and your residency status (days in Thailand), not whether you hold a work permit. If a Thai employer withholds income tax from your salary, you already have a tax obligation regardless of your work permit status. Legally working in Thailand as a foreign national requires a work permit issued by the Department of Employment, and working without one is a legal violation — but it does not remove your tax obligation or create one where none existed."},{question:"My employer is a foreign company with no presence in Thailand. Do I owe Thai tax?",answer:"If you work remotely in Thailand for a foreign employer that has no Thai entity and does not withhold Thai tax, and you spend 180 or more days in Thailand in a year, you are a Thai tax resident. Income that you remit (transfer or spend) in Thailand is taxable since the 2024 rule change. Even though your employer never interacts with the Thai Revenue Department, you personally are responsible for declaring and paying Thai tax on your remitted income by filing a PND 90 return by 31 March."}]}];function ch(e){const t=e.toLowerCase(),n=[];return $r.forEach(a=>{a.items.forEach(r=>{(r.question.toLowerCase().includes(t)||r.answer.toLowerCase().includes(t))&&n.push(r)})}),n}const Yi="https://mythaitaxes.com",Cg=()=>{const e=Cn.slice(0,3),t=["Pensioners & Retirees","Tax Residency","Filing & Deadlines"],n=$r.filter(i=>t.includes(i.name)).sort((i,s)=>t.indexOf(i.name)-t.indexOf(s.name)).map(i=>({name:i.name,items:i.items.slice(0,3)})),a="Thai Tax Calculator | Free Thai Income Tax Calculator",r="Calculate your Thai income tax quickly and accurately. Free tool for salaried employees, freelancers, sole proprietors, and company owners in Thailand.";return o.jsxs("div",{className:"py-8",children:[o.jsxs(jt,{children:[o.jsx("title",{children:a}),o.jsx("meta",{name:"description",content:r}),o.jsx("link",{rel:"canonical",href:Yi}),o.jsx("meta",{property:"og:title",content:a}),o.jsx("meta",{property:"og:description",content:r}),o.jsx("meta",{property:"og:url",content:Yi}),o.jsx("meta",{property:"og:type",content:"website"}),o.jsx("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"WebApplication",name:"Thai Tax Calculator",url:Yi,description:r,applicationCategory:"FinanceApplication",operatingSystem:"All",offers:{"@type":"Offer",price:"0",priceCurrency:"THB"}})})]}),o.jsxs("div",{className:"max-w-4xl mx-auto px-4 text-center mb-8",children:[o.jsx("h1",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-3",children:"Thai Tax Calculator"}),o.jsx("p",{className:"text-lg text-gray-600",children:"Calculate your Thai tax obligation quickly and accurately"})]}),o.jsx(Tg,{}),o.jsx("div",{className:"max-w-3xl mx-auto px-4 mb-8",children:o.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[o.jsx(W,{to:"/annual-tax/",className:"block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-transparent hover:border-blue-500",children:o.jsxs("div",{className:"flex items-start gap-4",children:[o.jsx("div",{className:"w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0",children:o.jsx("svg",{className:"w-6 h-6 text-blue-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"})})}),o.jsxs("div",{children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-1",children:"Annual Tax Calculator"}),o.jsx("p",{className:"text-gray-600 text-sm",children:"Get a detailed breakdown of your annual tax liability and potential refund."})]})]})}),o.jsx(W,{to:"/monthly-withholding/",className:"block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-transparent hover:border-blue-500",children:o.jsxs("div",{className:"flex items-start gap-4",children:[o.jsx("div",{className:"w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0",children:o.jsx("svg",{className:"w-6 h-6 text-green-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})})}),o.jsxs("div",{children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-1",children:"Monthly Withholding"}),o.jsx("p",{className:"text-gray-600 text-sm",children:"Estimate how much tax should be deducted from your monthly salary."})]})]})})]})}),o.jsxs("div",{className:"flex justify-center mb-8 px-4",children:[o.jsx("div",{className:"hidden md:block",children:o.jsx(kn,{size:"leaderboard",adSlot:"5959313072"})}),o.jsx("div",{className:"md:hidden",children:o.jsx(kn,{size:"mobile-banner",adSlot:"6916229573"})})]}),o.jsx("div",{className:"max-w-6xl mx-auto px-4",children:o.jsxs("div",{className:"grid md:grid-cols-2 gap-8",children:[o.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6",children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Popular Questions"}),o.jsx("div",{className:"space-y-5",children:n.map(i=>o.jsxs("div",{children:[o.jsx("p",{className:"text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2",children:i.name}),o.jsx("ul",{className:"space-y-2",children:i.items.map((s,l)=>o.jsx("li",{children:o.jsxs(W,{to:"/faq/",className:"flex items-start gap-2 text-sm text-gray-600 hover:text-blue-500 transition-colors",children:[o.jsx("span",{className:"text-blue-500 flex-shrink-0 mt-0.5",children:"Q:"}),o.jsx("span",{children:s.question})]})},l))})]},i.name))}),o.jsxs(W,{to:"/faq/",className:"inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 mt-4 text-sm font-medium",children:["View all FAQ",o.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]}),o.jsxs("div",{children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Latest Articles"}),o.jsx("div",{className:"space-y-4",children:e.map(i=>o.jsx(ka,{article:i},i.slug))}),o.jsxs(W,{to:"/articles/",className:"inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 mt-4 text-sm font-medium",children:["View all articles",o.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]})]})})]})},Su="https://mythaitaxes.com",Ag=()=>{const e=Cn.slice(0,3),t=Cn.slice(3),n="Thai Tax Articles & Guides | Thai Tax Calculator",a="Expert guides on Thai taxation covering freelancer tax, expat filing, deductions, tax residency, double tax agreements, and more.";return o.jsxs("div",{className:"py-8",children:[o.jsxs(jt,{children:[o.jsx("title",{children:n}),o.jsx("meta",{name:"description",content:a}),o.jsx("link",{rel:"canonical",href:`${Su}/articles/`}),o.jsx("meta",{property:"og:title",content:n}),o.jsx("meta",{property:"og:description",content:a}),o.jsx("meta",{property:"og:url",content:`${Su}/articles/`}),o.jsx("meta",{property:"og:type",content:"website"})]}),o.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[o.jsxs("div",{className:"mb-8",children:[o.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Thai Tax Guides for Expats"}),o.jsx("p",{className:"text-gray-600",children:"Comprehensive guides to help you understand and navigate Thai taxation."})]}),o.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",children:e.map(r=>o.jsx(ka,{article:r},r.slug))}),t.length>0&&o.jsxs("div",{className:"flex justify-center mb-8",children:[o.jsx("div",{className:"hidden md:block",children:o.jsx(kn,{size:"leaderboard",adSlot:"5959313072"})}),o.jsx("div",{className:"md:hidden",children:o.jsx(kn,{size:"rectangle",adSlot:"3447757856"})})]}),t.length>0&&o.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",children:t.map(r=>o.jsx(ka,{article:r},r.slug))}),o.jsxs("div",{className:"bg-blue-50 rounded-xl p-6 md:p-8 text-center",children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-2",children:"Ready to calculate your tax?"}),o.jsx("p",{className:"text-gray-600 mb-4",children:"Use our free calculator to estimate your Thai tax liability."}),o.jsxs(W,{to:"/",className:"inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors",children:["Start Calculator",o.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]})]})]})},tr="https://mythaitaxes.com",Rg=()=>{const{slug:e}=Sp(),t=e?wg(e):void 0,n=e?Ng(e):[];if(!t)return o.jsx(Mp,{to:"/articles/",replace:!0});const a=`${tr}/articles/${t.slug}/`,r={"@context":"https://schema.org","@type":"Article",headline:t.title,description:t.excerpt,url:a,datePublished:t.publishedAt,publisher:{"@type":"Organization",name:"Thai Tax Calculator",url:tr}},i={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${tr}/`},{"@type":"ListItem",position:2,name:"Articles",item:`${tr}/articles/`},{"@type":"ListItem",position:3,name:t.title,item:a}]},s=t.content.split(`

`),l=Math.floor(s.length/2),u=s.slice(0,l).join(`

`),c=s.slice(l).join(`

`);return o.jsxs("div",{className:"py-8",children:[o.jsxs(jt,{children:[o.jsxs("title",{children:[t.title," | Thai Tax Calculator"]}),o.jsx("meta",{name:"description",content:t.excerpt}),o.jsx("link",{rel:"canonical",href:a}),o.jsx("meta",{property:"og:title",content:t.title}),o.jsx("meta",{property:"og:description",content:t.excerpt}),o.jsx("meta",{property:"og:url",content:a}),o.jsx("meta",{property:"og:type",content:"article"}),o.jsx("meta",{property:"article:published_time",content:t.publishedAt}),o.jsx("script",{type:"application/ld+json",children:JSON.stringify(r)}),o.jsx("script",{type:"application/ld+json",children:JSON.stringify(i)})]}),o.jsxs("div",{className:"max-w-3xl mx-auto px-4",children:[o.jsx("nav",{className:"mb-6",children:o.jsx(W,{to:"/articles/",className:"text-blue-500 hover:text-blue-600 text-sm",children:"← Back to Articles"})}),o.jsxs("header",{className:"mb-8",children:[o.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[o.jsx("span",{className:"text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full",children:t.category}),o.jsxs("span",{className:"text-sm text-gray-500",children:[t.readTime," min read"]})]}),o.jsx("h1",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-3",children:t.title}),o.jsxs("p",{className:"text-gray-500 text-sm",children:["Published: ",new Date(t.publishedAt).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})]})]}),o.jsxs("div",{className:"flex gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-8 text-sm text-amber-800",children:[o.jsx("svg",{className:"w-4 h-4 mt-0.5 shrink-0",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),o.jsxs("span",{children:["This article is for informational purposes only and is based on publicly available Thai Revenue Department guidance and the Revenue Code. Tax rules change — verify current regulations at"," ",o.jsx("a",{href:"https://www.rd.go.th/english/",target:"_blank",rel:"noopener noreferrer",className:"underline hover:text-amber-900 font-medium",children:"rd.go.th"})," ","or consult a licensed Thai tax advisor before making financial decisions."]})]}),o.jsx("article",{className:"prose prose-gray max-w-none mb-8",children:o.jsx("div",{className:"article-content",dangerouslySetInnerHTML:{__html:Nu(u)}})}),o.jsx("div",{className:"flex justify-center my-8",children:o.jsx(kn,{size:"rectangle",adSlot:"3447757856"})}),o.jsx("article",{className:"prose prose-gray max-w-none mb-8",children:o.jsx("div",{className:"article-content",dangerouslySetInnerHTML:{__html:Nu(c)}})}),t.sources&&t.sources.length>0&&o.jsxs("div",{className:"border-t border-gray-200 pt-6 mb-8",children:[o.jsx("h2",{className:"text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3",children:"Sources & Official References"}),o.jsx("ul",{className:"space-y-1",children:t.sources.map((f,d)=>o.jsx("li",{className:"text-sm text-gray-600",children:o.jsx("a",{href:f.url,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600 hover:text-blue-700 hover:underline",children:f.label})},d))})]}),o.jsxs("div",{className:"bg-blue-50 rounded-xl p-6 text-center mb-8",children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-2",children:"Ready to calculate your tax?"}),o.jsx("p",{className:"text-gray-600 mb-4",children:"Put this knowledge to use with our free calculator."}),o.jsxs(W,{to:"/",className:"inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors",children:["Start Calculator",o.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]}),n.length>0&&o.jsxs("section",{children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Related Articles"}),o.jsx("div",{className:"grid md:grid-cols-2 gap-4",children:n.map(f=>o.jsx(ka,{article:f},f.slug))})]})]})]})};function Nu(e){let t=e.replace(/(^\|.+\|$\n?)+/gm,n=>{const a=n.trim().split(`
`);let r='<table class="w-full border-collapse mb-4">';return a.forEach((i,s)=>{const l=i.split("|").filter(y=>y.trim());if(l.every(y=>y.trim().match(/^[-:]+$/)))return;const u=s===0,c=u?"th":"td",f=u?"border border-gray-200 px-4 py-2 bg-gray-50 font-semibold text-left":"border border-gray-200 px-4 py-2",d=l.map(y=>`<${c} class="${f}">${y.trim()}</${c}>`).join("");r+=`<tr>${d}</tr>`}),r+="</table>",r});return t=t.replace(/^## (.+)$/gm,'<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>').replace(/^### (.+)$/gm,'<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>').replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),t=t.replace(/(^\d+\. .+$(\n(   - .+$|\d+\. .+$))*)+/gm,n=>{let a='<ol class="list-decimal list-outside ml-5 mb-4 text-gray-600 space-y-3">',r=[];return n.split(`
`).forEach((s,l)=>{const u=/^\d+\. /.test(s),c=/^   - /.test(s);if(u){r.length>0?(a+='<ul class="list-disc list-outside ml-5 mt-2 text-gray-500 space-y-1">',a+=r.join(""),a+="</ul>",r=[],a+="</li>"):l>0&&(a+="</li>");const f=s.replace(/^\d+\. /,"");a+=`<li>${f}`}else if(c){const f=s.replace(/^   - /,"");r.push(`<li>${f}</li>`)}}),r.length>0&&(a+='<ul class="list-disc list-outside ml-5 mt-2 text-gray-500 space-y-1">',a+=r.join(""),a+="</ul>"),a+="</li></ol>",a}),t=t.replace(/(^- .+$(\n- .+$)*)/gm,n=>`<ul class="list-disc list-outside ml-5 mb-4 text-gray-600 space-y-1">${n.split(`
`).map(r=>`<li>${r.replace(/^- /,"")}</li>`).join("")}</ul>`),t=t.replace(/\n\n/g,'</p><p class="mb-4 text-gray-600 leading-relaxed">').replace(/^/,'<p class="mb-4 text-gray-600 leading-relaxed">').replace(/$/,"</p>").replace(/<p class="mb-4 text-gray-600 leading-relaxed"><\/p>/g,""),t}const Go=({question:e,answer:t,defaultOpen:n=!1})=>{const[a,r]=x.useState(n);return o.jsxs("div",{className:"border-b border-gray-200 last:border-b-0",children:[o.jsxs("button",{className:"w-full py-4 flex items-center justify-between text-left hover:text-blue-500 transition-colors",onClick:()=>r(!a),"aria-expanded":a,children:[o.jsx("span",{className:"font-medium text-gray-900 pr-4",children:e}),o.jsx("svg",{className:`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${a?"rotate-180":""}`,fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})]}),a&&o.jsx("div",{className:"pb-4 text-gray-600 leading-relaxed",children:t})]})},ku="https://mythaitaxes.com",Eg=()=>{const[e,t]=x.useState(""),n=e.length>=2?ch(e):[],a=e.length>=2,r="Thai Tax FAQ | Frequently Asked Questions | Thai Tax Calculator",i="Answers to common questions about Thai income tax: tax residency, deductions, filing deadlines, withholding tax, refunds, and more.",s={"@context":"https://schema.org","@type":"FAQPage",mainEntity:$r.flatMap(l=>l.items.map(u=>({"@type":"Question",name:u.question,acceptedAnswer:{"@type":"Answer",text:u.answer}})))};return o.jsxs("div",{className:"py-8",children:[o.jsxs(jt,{children:[o.jsx("title",{children:r}),o.jsx("meta",{name:"description",content:i}),o.jsx("link",{rel:"canonical",href:`${ku}/faq/`}),o.jsx("meta",{property:"og:title",content:r}),o.jsx("meta",{property:"og:description",content:i}),o.jsx("meta",{property:"og:url",content:`${ku}/faq/`}),o.jsx("meta",{property:"og:type",content:"website"}),o.jsx("script",{type:"application/ld+json",children:JSON.stringify(s)})]}),o.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[o.jsxs("div",{className:"mb-8 text-center",children:[o.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Frequently Asked Questions"}),o.jsx("p",{className:"text-gray-600 mb-6",children:"Find answers to common questions about Thai taxation."}),o.jsx("div",{className:"max-w-md mx-auto",children:o.jsxs("div",{className:"relative",children:[o.jsx("input",{type:"text",placeholder:"Search FAQs...",value:e,onChange:l=>t(l.target.value),className:"w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"}),o.jsx("svg",{className:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})]})})]}),o.jsxs("div",{className:"grid lg:grid-cols-3 gap-8",children:[o.jsx("div",{className:"lg:col-span-2",children:a?o.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6",children:[o.jsxs("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:["Search Results (",n.length,")"]}),n.length>0?o.jsx("div",{className:"divide-y divide-gray-200",children:n.map((l,u)=>o.jsx(Go,{question:l.question,answer:l.answer,defaultOpen:u===0},u))}):o.jsxs("p",{className:"text-gray-500",children:['No results found for "',e,'". Try a different search term.']})]}):o.jsx("div",{className:"space-y-6",children:$r.map((l,u)=>o.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6",children:[o.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:l.name}),o.jsx("div",{className:"divide-y divide-gray-200",children:l.items.map((c,f)=>o.jsx(Go,{question:c.question,answer:c.answer},f))})]},u))})}),o.jsx("div",{className:"lg:col-span-1",children:o.jsxs("div",{className:"sticky top-24 space-y-6",children:[o.jsx("div",{className:"flex justify-center",children:o.jsx(kn,{size:"rectangle",adSlot:"3447757856"})}),o.jsxs("div",{className:"bg-blue-50 rounded-xl p-6",children:[o.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Calculate Your Tax"}),o.jsx("p",{className:"text-gray-600 text-sm mb-4",children:"Ready to estimate your Thai tax liability?"}),o.jsx(W,{to:"/",className:"block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors",children:"Start Calculator"})]}),o.jsxs("div",{className:"bg-gray-50 rounded-xl p-6",children:[o.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Need More Help?"}),o.jsx("p",{className:"text-gray-600 text-sm",children:"For complex tax situations, we recommend consulting with a qualified Thai tax professional."})]})]})})]})]})]})},jg="https://mythaitaxes.com",Ig=()=>{const[e,t]=py(),[n,a]=x.useState(e.get("q")??""),r=e.get("q")??"",i=r.length>=2?kg(r):[],s=r.length>=2?ch(r):[],l=i.length+s.length;x.useEffect(()=>{const c=setTimeout(()=>{const f=n.trim();f?t({q:f},{replace:!0}):t({},{replace:!0})},300);return()=>clearTimeout(c)},[n,t]);const u=r?`Results for "${r}" | Thai Tax Calculator`:"Search | Thai Tax Calculator";return o.jsxs("div",{className:"py-8",children:[o.jsxs(jt,{children:[o.jsx("title",{children:u}),o.jsx("meta",{name:"description",content:"Search Thai tax articles and frequently asked questions."}),o.jsx("link",{rel:"canonical",href:`${jg}/search/`}),o.jsx("meta",{name:"robots",content:"noindex"})]}),o.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[o.jsxs("div",{className:"mb-8",children:[o.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-6",children:"Search"}),o.jsxs("div",{className:"relative max-w-xl",children:[o.jsx("input",{type:"text",placeholder:"Search articles and FAQs...",value:n,onChange:c=>a(c.target.value),autoFocus:!0,className:"w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors text-base"}),o.jsx("svg",{className:"absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})]})]}),r.length>=2?o.jsxs("div",{className:"space-y-8",children:[o.jsx("p",{className:"text-gray-500 text-sm",children:l===0?`No results found for "${r}"`:`${l} result${l!==1?"s":""} for "${r}"`}),i.length>0&&o.jsxs("section",{children:[o.jsxs("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:["Articles (",i.length,")"]}),o.jsx("div",{className:"grid sm:grid-cols-2 lg:grid-cols-3 gap-4",children:i.map(c=>o.jsx(ka,{article:c},c.slug))})]}),s.length>0&&o.jsxs("section",{children:[o.jsxs("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:["FAQs (",s.length,")"]}),o.jsx("div",{className:"bg-white rounded-xl shadow-md p-6 divide-y divide-gray-200",children:s.map((c,f)=>o.jsx(Go,{question:c.question,answer:c.answer,defaultOpen:f===0},f))}),o.jsx("div",{className:"mt-3",children:o.jsx(W,{to:"/faq/",className:"text-blue-500 hover:underline text-sm",children:"Browse all FAQs →"})})]}),l===0&&o.jsxs("div",{className:"text-center py-12",children:[o.jsx("p",{className:"text-gray-500 mb-4",children:"Try a different keyword, or browse:"}),o.jsxs("div",{className:"flex justify-center gap-6",children:[o.jsx(W,{to:"/articles/",className:"text-blue-500 hover:underline",children:"All Articles"}),o.jsx(W,{to:"/faq/",className:"text-blue-500 hover:underline",children:"All FAQs"})]})]})]}):o.jsx("p",{className:"text-gray-400 text-center py-12",children:"Enter at least 2 characters to search articles and FAQs."})]})]})},Pg="https://www.mythaitaxes.com",Qt="hannwill999@gmail.com",Lg=()=>o.jsxs("div",{className:"max-w-3xl mx-auto px-4 py-12",children:[o.jsxs(jt,{children:[o.jsx("title",{children:"Privacy Policy | My Thai Taxes"}),o.jsx("meta",{name:"description",content:"Privacy policy for mythaitaxes.com — how we handle your data, the third-party services we use, and your rights."}),o.jsx("link",{rel:"canonical",href:`${Pg}/privacy/`}),o.jsx("meta",{name:"robots",content:"noindex"})]}),o.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Privacy Policy"}),o.jsx("p",{className:"text-sm text-gray-500 mb-8",children:"Last updated: 28 June 2026"}),o.jsxs("div",{className:"prose prose-gray max-w-none space-y-8 text-gray-700",children:[o.jsxs("section",{children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"1. Who we are"}),o.jsxs("p",{children:["This website (",o.jsx("strong",{children:"mythaitaxes.com"}),") provides free tools and informational articles to help individuals estimate their Thai personal income tax. It is operated as an independent personal project. For questions about this policy, contact"," ",o.jsx("a",{href:`mailto:${Qt}`,className:"text-blue-600 hover:underline",children:Qt}),"."]})]}),o.jsxs("section",{children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"2. Data you enter into the calculators"}),o.jsxs("p",{children:["When you use the Annual Tax Calculator or Monthly Withholding Estimator, the income figures, deduction amounts, and other financial details you enter are stored ",o.jsx("strong",{children:"only in your browser's session storage"}),' — a temporary area that is cleared automatically when you close the browser tab or click "Start Over." This data is ',o.jsx("strong",{children:"never transmitted to our servers"}),", never stored in a database, and never shared with anyone. We do not see it."]}),o.jsx("p",{className:"mt-2",children:"Because all calculation happens locally in your browser, you can use the calculators with complete confidence that your financial information stays on your device."})]}),o.jsxs("section",{children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"3. Cookies and tracking technologies"}),o.jsx("p",{children:"We do not set any first-party cookies ourselves. However, the third-party services listed below place their own cookies and collect usage data when you visit this site."}),o.jsx("h3",{className:"text-base font-semibold text-gray-800 mt-4 mb-2",children:"Google Analytics (GA4)"}),o.jsx("p",{children:"We use Google Analytics to understand how visitors use the site — which pages are visited, how long visitors stay, and where traffic comes from. Google Analytics sets cookies that identify your browser across sessions. The data is aggregated and does not personally identify you to us. Google may process this data on servers outside your country."}),o.jsxs("ul",{className:"list-disc pl-5 mt-2 space-y-1 text-sm",children:[o.jsxs("li",{children:["To opt out: install the ",o.jsx("a",{href:"https://tools.google.com/dlpage/gaoptout",className:"text-blue-600 hover:underline",target:"_blank",rel:"noopener noreferrer",children:"Google Analytics Opt-out Browser Add-on"})]}),o.jsx("li",{children:o.jsx("a",{href:"https://policies.google.com/privacy",className:"text-blue-600 hover:underline",target:"_blank",rel:"noopener noreferrer",children:"Google Privacy Policy"})})]}),o.jsx("h3",{className:"text-base font-semibold text-gray-800 mt-4 mb-2",children:"Google AdSense"}),o.jsx("p",{children:"We display advertisements served by Google AdSense. Google uses cookies to serve ads based on your prior visits to this site and other sites. These cookies allow Google and its partners to show you ads that may be relevant to your interests. You can opt out of personalised advertising at any time."}),o.jsxs("ul",{className:"list-disc pl-5 mt-2 space-y-1 text-sm",children:[o.jsxs("li",{children:["Opt out of personalised ads: ",o.jsx("a",{href:"https://www.google.com/settings/ads",className:"text-blue-600 hover:underline",target:"_blank",rel:"noopener noreferrer",children:"Google Ad Settings"})]}),o.jsxs("li",{children:["Opt out via industry tool: ",o.jsx("a",{href:"https://www.aboutads.info/choices/",className:"text-blue-600 hover:underline",target:"_blank",rel:"noopener noreferrer",children:"aboutads.info"})]}),o.jsx("li",{children:o.jsx("a",{href:"https://policies.google.com/technologies/ads",className:"text-blue-600 hover:underline",target:"_blank",rel:"noopener noreferrer",children:"How Google uses advertising cookies"})})]}),o.jsx("h3",{className:"text-base font-semibold text-gray-800 mt-4 mb-2",children:"Ahrefs Analytics"}),o.jsxs("p",{children:["We use Ahrefs Analytics to measure site traffic and search performance. Ahrefs collects anonymised page view data. See the"," ",o.jsx("a",{href:"https://ahrefs.com/privacy",className:"text-blue-600 hover:underline",target:"_blank",rel:"noopener noreferrer",children:"Ahrefs Privacy Policy"})," ","for details."]})]}),o.jsxs("section",{children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"4. Exchange rate lookups"}),o.jsxs("p",{children:["When you enter foreign income in the Annual Tax Calculator, the site may fetch the Bank of Thailand's published daily exchange rate for the currency and date you specify. This request is made through a proxy server to comply with browser security restrictions. ",o.jsx("strong",{children:"No personal or financial data from your form is included in this request"})," — only the currency code and date."]})]}),o.jsxs("section",{children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"5. Information this site does not collect"}),o.jsxs("ul",{className:"list-disc pl-5 space-y-1",children:[o.jsx("li",{children:"We do not collect your name, email address, or any contact details (unless you email us directly)"}),o.jsx("li",{children:"We do not have user accounts or logins"}),o.jsx("li",{children:"We do not store your calculator inputs on any server"}),o.jsx("li",{children:"We do not sell data to third parties"})]})]}),o.jsxs("section",{children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"6. Your rights"}),o.jsx("p",{children:"Depending on where you are located, you may have rights regarding your personal data under laws such as the EU General Data Protection Regulation (GDPR) or Thailand's Personal Data Protection Act (PDPA). Because we do not collect personally identifiable information through this site, most of these rights apply to data held by third-party services (Google, Ahrefs) rather than by us. To exercise rights against those providers, use the opt-out links above or contact them directly."}),o.jsxs("p",{className:"mt-2",children:["For any privacy enquiries, email"," ",o.jsx("a",{href:`mailto:${Qt}`,className:"text-blue-600 hover:underline",children:Qt}),"."]})]}),o.jsxs("section",{children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"7. Data retention"}),o.jsx("p",{children:"Calculator data in session storage is deleted when you close the browser tab. Google Analytics retains event data for 14 months by default (configurable in the GA4 console). AdSense cookies persist for up to 13 months. We do not control the retention policies of third-party services."})]}),o.jsxs("section",{children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"8. Changes to this policy"}),o.jsx("p",{children:'We may update this policy if we add new features or services. The "Last updated" date at the top of the page will reflect any changes.'})]}),o.jsxs("section",{children:[o.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"9. Contact"}),o.jsxs("p",{children:["Questions or concerns about this privacy policy can be sent to"," ",o.jsx("a",{href:`mailto:${Qt}`,className:"text-blue-600 hover:underline",children:Qt}),"."]})]})]})]}),Dg=Ke.lazy(()=>Xy(()=>import("./AnnualTaxWizard-BL5MTIUE.js"),[])),Fg=()=>o.jsx(eg,{children:o.jsxs(Up,{children:[o.jsx(Xe,{path:"/",element:o.jsx(Cg,{})}),o.jsx(Xe,{path:"/monthly-withholding",element:o.jsx(pg,{})}),o.jsx(Xe,{path:"/annual-tax",element:o.jsx(x.Suspense,{fallback:o.jsxs("div",{className:"bg-gray-100 min-h-screen flex items-center justify-center py-8 px-4",children:[o.jsxs(jt,{children:[o.jsx("title",{children:"Annual Tax Calculator | Thai Tax Calculator"}),o.jsx("meta",{name:"description",content:"Calculate your annual Thai income tax liability. Free calculator for salaried employees, freelancers, sole proprietors, and company owners in Thailand."}),o.jsx("link",{rel:"canonical",href:"https://mythaitaxes.com/annual-tax/"})]}),o.jsxs("div",{className:"bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-2xl w-full",children:[o.jsx("h1",{className:"sr-only",children:"Annual Tax Calculator"}),o.jsx("div",{className:"flex justify-between items-center mb-6",children:o.jsx(W,{to:"/",className:"text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm",children:"Home"})}),o.jsx("p",{className:"text-center text-gray-500",children:"Loading calculator…"})]})]}),children:o.jsx(Dg,{})})}),o.jsx(Xe,{path:"/articles",element:o.jsx(Ag,{})}),o.jsx(Xe,{path:"/articles/:slug",element:o.jsx(Rg,{})}),o.jsx(Xe,{path:"/faq",element:o.jsx(Eg,{})}),o.jsx(Xe,{path:"/search",element:o.jsx(Ig,{})}),o.jsx(Xe,{path:"/privacy",element:o.jsx(Lg,{})})]})}),Ki=document.getElementById("root"),Cu=o.jsx(Ke.StrictMode,{children:o.jsx(lh,{children:o.jsx(cy,{children:o.jsx(Fg,{})})})});Ki.hasChildNodes()?xr.hydrateRoot(Ki,Cu):xr.createRoot(Ki).render(Cu);export{Ke as R,ig as T,Xn as a,_g as b,uh as c,Mg as d,Vr as g,o as j,x as r,ui as u};
