var of=Object.defineProperty;var lf=(e,t,n)=>t in e?of(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ge=(e,t,n)=>lf(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();var Tg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ua(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function wg(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function r(){return this instanceof r?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(r){var a=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(n,r,a.get?a:{enumerable:!0,get:function(){return e[r]}})}),n}var wu={exports:{}},za={},Su={exports:{}},_={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wr=Symbol.for("react.element"),sf=Symbol.for("react.portal"),uf=Symbol.for("react.fragment"),cf=Symbol.for("react.strict_mode"),df=Symbol.for("react.profiler"),ff=Symbol.for("react.provider"),hf=Symbol.for("react.context"),mf=Symbol.for("react.forward_ref"),pf=Symbol.for("react.suspense"),yf=Symbol.for("react.memo"),gf=Symbol.for("react.lazy"),Yl=Symbol.iterator;function xf(e){return e===null||typeof e!="object"?null:(e=Yl&&e[Yl]||e["@@iterator"],typeof e=="function"?e:null)}var bu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Nu=Object.assign,Cu={};function Nn(e,t,n){this.props=e,this.context=t,this.refs=Cu,this.updater=n||bu}Nn.prototype.isReactComponent={};Nn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Nn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ku(){}ku.prototype=Nn.prototype;function Wo(e,t,n){this.props=e,this.context=t,this.refs=Cu,this.updater=n||bu}var $o=Wo.prototype=new ku;$o.constructor=Wo;Nu($o,Nn.prototype);$o.isPureReactComponent=!0;var Kl=Array.isArray,Eu=Object.prototype.hasOwnProperty,Vo={current:null},Au={key:!0,ref:!0,__self:!0,__source:!0};function Ru(e,t,n){var r,a={},i=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(i=""+t.key),t)Eu.call(t,r)&&!Au.hasOwnProperty(r)&&(a[r]=t[r]);var s=arguments.length-2;if(s===1)a.children=n;else if(1<s){for(var u=Array(s),c=0;c<s;c++)u[c]=arguments[c+2];a.children=u}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)a[r]===void 0&&(a[r]=s[r]);return{$$typeof:wr,type:e,key:i,ref:o,props:a,_owner:Vo.current}}function vf(e,t){return{$$typeof:wr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Yo(e){return typeof e=="object"&&e!==null&&e.$$typeof===wr}function Tf(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var ql=/\/+/g;function ui(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Tf(""+e.key):t.toString(36)}function Xr(e,t,n,r,a){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case wr:case sf:o=!0}}if(o)return o=e,a=a(o),e=r===""?"."+ui(o,0):r,Kl(a)?(n="",e!=null&&(n=e.replace(ql,"$&/")+"/"),Xr(a,t,n,"",function(c){return c})):a!=null&&(Yo(a)&&(a=vf(a,n+(!a.key||o&&o.key===a.key?"":(""+a.key).replace(ql,"$&/")+"/")+e)),t.push(a)),1;if(o=0,r=r===""?".":r+":",Kl(e))for(var s=0;s<e.length;s++){i=e[s];var u=r+ui(i,s);o+=Xr(i,t,n,u,a)}else if(u=xf(e),typeof u=="function")for(e=u.call(e),s=0;!(i=e.next()).done;)i=i.value,u=r+ui(i,s++),o+=Xr(i,t,n,u,a);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function Pr(e,t,n){if(e==null)return e;var r=[],a=0;return Xr(e,r,"","",function(i){return t.call(n,i,a++)}),r}function wf(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var fe={current:null},Jr={transition:null},Sf={ReactCurrentDispatcher:fe,ReactCurrentBatchConfig:Jr,ReactCurrentOwner:Vo};function ju(){throw Error("act(...) is not supported in production builds of React.")}_.Children={map:Pr,forEach:function(e,t,n){Pr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Pr(e,function(){t++}),t},toArray:function(e){return Pr(e,function(t){return t})||[]},only:function(e){if(!Yo(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};_.Component=Nn;_.Fragment=uf;_.Profiler=df;_.PureComponent=Wo;_.StrictMode=cf;_.Suspense=pf;_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Sf;_.act=ju;_.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Nu({},e.props),a=e.key,i=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,o=Vo.current),t.key!==void 0&&(a=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(u in t)Eu.call(t,u)&&!Au.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&s!==void 0?s[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){s=Array(u);for(var c=0;c<u;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:wr,type:e.type,key:a,ref:i,props:r,_owner:o}};_.createContext=function(e){return e={$$typeof:hf,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:ff,_context:e},e.Consumer=e};_.createElement=Ru;_.createFactory=function(e){var t=Ru.bind(null,e);return t.type=e,t};_.createRef=function(){return{current:null}};_.forwardRef=function(e){return{$$typeof:mf,render:e}};_.isValidElement=Yo;_.lazy=function(e){return{$$typeof:gf,_payload:{_status:-1,_result:e},_init:wf}};_.memo=function(e,t){return{$$typeof:yf,type:e,compare:t===void 0?null:t}};_.startTransition=function(e){var t=Jr.transition;Jr.transition={};try{e()}finally{Jr.transition=t}};_.unstable_act=ju;_.useCallback=function(e,t){return fe.current.useCallback(e,t)};_.useContext=function(e){return fe.current.useContext(e)};_.useDebugValue=function(){};_.useDeferredValue=function(e){return fe.current.useDeferredValue(e)};_.useEffect=function(e,t){return fe.current.useEffect(e,t)};_.useId=function(){return fe.current.useId()};_.useImperativeHandle=function(e,t,n){return fe.current.useImperativeHandle(e,t,n)};_.useInsertionEffect=function(e,t){return fe.current.useInsertionEffect(e,t)};_.useLayoutEffect=function(e,t){return fe.current.useLayoutEffect(e,t)};_.useMemo=function(e,t){return fe.current.useMemo(e,t)};_.useReducer=function(e,t,n){return fe.current.useReducer(e,t,n)};_.useRef=function(e){return fe.current.useRef(e)};_.useState=function(e){return fe.current.useState(e)};_.useSyncExternalStore=function(e,t,n){return fe.current.useSyncExternalStore(e,t,n)};_.useTransition=function(){return fe.current.useTransition()};_.version="18.3.1";Su.exports=_;var x=Su.exports;const Ye=Ua(x);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bf=x,Nf=Symbol.for("react.element"),Cf=Symbol.for("react.fragment"),kf=Object.prototype.hasOwnProperty,Ef=bf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Af={key:!0,ref:!0,__self:!0,__source:!0};function Pu(e,t,n){var r,a={},i=null,o=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)kf.call(t,r)&&!Af.hasOwnProperty(r)&&(a[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)a[r]===void 0&&(a[r]=t[r]);return{$$typeof:Nf,type:e,key:i,ref:o,props:a,_owner:Ef.current}}za.Fragment=Cf;za.jsx=Pu;za.jsxs=Pu;wu.exports=za;var l=wu.exports,ha={},Iu={exports:{}},be={},Lu={exports:{}},_u={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(A,I){var L=A.length;A.push(I);e:for(;0<L;){var K=L-1>>>1,Z=A[K];if(0<a(Z,I))A[K]=I,A[L]=Z,L=K;else break e}}function n(A){return A.length===0?null:A[0]}function r(A){if(A.length===0)return null;var I=A[0],L=A.pop();if(L!==I){A[0]=L;e:for(var K=0,Z=A.length,Rr=Z>>>1;K<Rr;){var Rt=2*(K+1)-1,si=A[Rt],jt=Rt+1,jr=A[jt];if(0>a(si,L))jt<Z&&0>a(jr,si)?(A[K]=jr,A[jt]=L,K=jt):(A[K]=si,A[Rt]=L,K=Rt);else if(jt<Z&&0>a(jr,L))A[K]=jr,A[jt]=L,K=jt;else break e}}return I}function a(A,I){var L=A.sortIndex-I.sortIndex;return L!==0?L:A.id-I.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var u=[],c=[],p=1,d=null,y=3,g=!1,v=!1,T=!1,S=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(A){for(var I=n(c);I!==null;){if(I.callback===null)r(c);else if(I.startTime<=A)r(c),I.sortIndex=I.expirationTime,t(u,I);else break;I=n(c)}}function w(A){if(T=!1,m(A),!v)if(n(u)!==null)v=!0,oi(N);else{var I=n(c);I!==null&&li(w,I.startTime-A)}}function N(A,I){v=!1,T&&(T=!1,h(R),R=-1),g=!0;var L=y;try{for(m(I),d=n(u);d!==null&&(!(d.expirationTime>I)||A&&!ie());){var K=d.callback;if(typeof K=="function"){d.callback=null,y=d.priorityLevel;var Z=K(d.expirationTime<=I);I=e.unstable_now(),typeof Z=="function"?d.callback=Z:d===n(u)&&r(u),m(I)}else r(u);d=n(u)}if(d!==null)var Rr=!0;else{var Rt=n(c);Rt!==null&&li(w,Rt.startTime-I),Rr=!1}return Rr}finally{d=null,y=L,g=!1}}var C=!1,k=null,R=-1,M=5,P=-1;function ie(){return!(e.unstable_now()-P<M)}function jn(){if(k!==null){var A=e.unstable_now();P=A;var I=!0;try{I=k(!0,A)}finally{I?Pn():(C=!1,k=null)}}else C=!1}var Pn;if(typeof f=="function")Pn=function(){f(jn)};else if(typeof MessageChannel<"u"){var Vl=new MessageChannel,af=Vl.port2;Vl.port1.onmessage=jn,Pn=function(){af.postMessage(null)}}else Pn=function(){S(jn,0)};function oi(A){k=A,C||(C=!0,Pn())}function li(A,I){R=S(function(){A(e.unstable_now())},I)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(A){A.callback=null},e.unstable_continueExecution=function(){v||g||(v=!0,oi(N))},e.unstable_forceFrameRate=function(A){0>A||125<A?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<A?Math.floor(1e3/A):5},e.unstable_getCurrentPriorityLevel=function(){return y},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(A){switch(y){case 1:case 2:case 3:var I=3;break;default:I=y}var L=y;y=I;try{return A()}finally{y=L}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(A,I){switch(A){case 1:case 2:case 3:case 4:case 5:break;default:A=3}var L=y;y=A;try{return I()}finally{y=L}},e.unstable_scheduleCallback=function(A,I,L){var K=e.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?K+L:K):L=K,A){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=L+Z,A={id:p++,callback:I,priorityLevel:A,startTime:L,expirationTime:Z,sortIndex:-1},L>K?(A.sortIndex=L,t(c,A),n(u)===null&&A===n(c)&&(T?(h(R),R=-1):T=!0,li(w,L-K))):(A.sortIndex=Z,t(u,A),v||g||(v=!0,oi(N))),A},e.unstable_shouldYield=ie,e.unstable_wrapCallback=function(A){var I=y;return function(){var L=y;y=I;try{return A.apply(this,arguments)}finally{y=L}}}})(_u);Lu.exports=_u;var Rf=Lu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jf=x,Se=Rf;function b(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ou=new Set,nr={};function Vt(e,t){yn(e,t),yn(e+"Capture",t)}function yn(e,t){for(nr[e]=t,e=0;e<t.length;e++)Ou.add(t[e])}var rt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),$i=Object.prototype.hasOwnProperty,Pf=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ql={},Gl={};function If(e){return $i.call(Gl,e)?!0:$i.call(Ql,e)?!1:Pf.test(e)?Gl[e]=!0:(Ql[e]=!0,!1)}function Lf(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function _f(e,t,n,r){if(t===null||typeof t>"u"||Lf(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function he(e,t,n,r,a,i,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}var ae={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ae[e]=new he(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ae[t]=new he(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ae[e]=new he(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ae[e]=new he(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ae[e]=new he(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ae[e]=new he(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ae[e]=new he(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ae[e]=new he(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ae[e]=new he(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ko=/[\-:]([a-z])/g;function qo(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Ko,qo);ae[t]=new he(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Ko,qo);ae[t]=new he(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Ko,qo);ae[t]=new he(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ae[e]=new he(e,1,!1,e.toLowerCase(),null,!1,!1)});ae.xlinkHref=new he("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ae[e]=new he(e,1,!1,e.toLowerCase(),null,!0,!0)});function Qo(e,t,n,r){var a=ae.hasOwnProperty(t)?ae[t]:null;(a!==null?a.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(_f(t,n,a,r)&&(n=null),r||a===null?If(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,r=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var st=jf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ir=Symbol.for("react.element"),Qt=Symbol.for("react.portal"),Gt=Symbol.for("react.fragment"),Go=Symbol.for("react.strict_mode"),Vi=Symbol.for("react.profiler"),Mu=Symbol.for("react.provider"),Fu=Symbol.for("react.context"),Xo=Symbol.for("react.forward_ref"),Yi=Symbol.for("react.suspense"),Ki=Symbol.for("react.suspense_list"),Jo=Symbol.for("react.memo"),ct=Symbol.for("react.lazy"),Hu=Symbol.for("react.offscreen"),Xl=Symbol.iterator;function In(e){return e===null||typeof e!="object"?null:(e=Xl&&e[Xl]||e["@@iterator"],typeof e=="function"?e:null)}var V=Object.assign,ci;function Wn(e){if(ci===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);ci=t&&t[1]||""}return`
`+ci+e}var di=!1;function fi(e,t){if(!e||di)return"";di=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var a=c.stack.split(`
`),i=r.stack.split(`
`),o=a.length-1,s=i.length-1;1<=o&&0<=s&&a[o]!==i[s];)s--;for(;1<=o&&0<=s;o--,s--)if(a[o]!==i[s]){if(o!==1||s!==1)do if(o--,s--,0>s||a[o]!==i[s]){var u=`
`+a[o].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=o&&0<=s);break}}}finally{di=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Wn(e):""}function Of(e){switch(e.tag){case 5:return Wn(e.type);case 16:return Wn("Lazy");case 13:return Wn("Suspense");case 19:return Wn("SuspenseList");case 0:case 2:case 15:return e=fi(e.type,!1),e;case 11:return e=fi(e.type.render,!1),e;case 1:return e=fi(e.type,!0),e;default:return""}}function qi(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Gt:return"Fragment";case Qt:return"Portal";case Vi:return"Profiler";case Go:return"StrictMode";case Yi:return"Suspense";case Ki:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Fu:return(e.displayName||"Context")+".Consumer";case Mu:return(e._context.displayName||"Context")+".Provider";case Xo:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Jo:return t=e.displayName||null,t!==null?t:qi(e.type)||"Memo";case ct:t=e._payload,e=e._init;try{return qi(e(t))}catch{}}return null}function Mf(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return qi(t);case 8:return t===Go?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Nt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Du(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ff(e){var t=Du(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Lr(e){e._valueTracker||(e._valueTracker=Ff(e))}function Bu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Du(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function ma(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Qi(e,t){var n=t.checked;return V({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Jl(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Nt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Uu(e,t){t=t.checked,t!=null&&Qo(e,"checked",t,!1)}function Gi(e,t){Uu(e,t);var n=Nt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Xi(e,t.type,n):t.hasOwnProperty("defaultValue")&&Xi(e,t.type,Nt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Zl(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Xi(e,t,n){(t!=="number"||ma(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var $n=Array.isArray;function sn(e,t,n,r){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Nt(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,r&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Ji(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(b(91));return V({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function es(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(b(92));if($n(n)){if(1<n.length)throw Error(b(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Nt(n)}}function zu(e,t){var n=Nt(t.value),r=Nt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function ts(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Wu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Zi(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Wu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var _r,$u=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(_r=_r||document.createElement("div"),_r.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=_r.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function rr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Kn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Hf=["Webkit","ms","Moz","O"];Object.keys(Kn).forEach(function(e){Hf.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Kn[t]=Kn[e]})});function Vu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Kn.hasOwnProperty(e)&&Kn[e]?(""+t).trim():t+"px"}function Yu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,a=Vu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,a):e[n]=a}}var Df=V({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function eo(e,t){if(t){if(Df[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(b(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(b(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(b(61))}if(t.style!=null&&typeof t.style!="object")throw Error(b(62))}}function to(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var no=null;function Zo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ro=null,un=null,cn=null;function ns(e){if(e=Nr(e)){if(typeof ro!="function")throw Error(b(280));var t=e.stateNode;t&&(t=Ka(t),ro(e.stateNode,e.type,t))}}function Ku(e){un?cn?cn.push(e):cn=[e]:un=e}function qu(){if(un){var e=un,t=cn;if(cn=un=null,ns(e),t)for(e=0;e<t.length;e++)ns(t[e])}}function Qu(e,t){return e(t)}function Gu(){}var hi=!1;function Xu(e,t,n){if(hi)return e(t,n);hi=!0;try{return Qu(e,t,n)}finally{hi=!1,(un!==null||cn!==null)&&(Gu(),qu())}}function ar(e,t){var n=e.stateNode;if(n===null)return null;var r=Ka(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(b(231,t,typeof n));return n}var ao=!1;if(rt)try{var Ln={};Object.defineProperty(Ln,"passive",{get:function(){ao=!0}}),window.addEventListener("test",Ln,Ln),window.removeEventListener("test",Ln,Ln)}catch{ao=!1}function Bf(e,t,n,r,a,i,o,s,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(p){this.onError(p)}}var qn=!1,pa=null,ya=!1,io=null,Uf={onError:function(e){qn=!0,pa=e}};function zf(e,t,n,r,a,i,o,s,u){qn=!1,pa=null,Bf.apply(Uf,arguments)}function Wf(e,t,n,r,a,i,o,s,u){if(zf.apply(this,arguments),qn){if(qn){var c=pa;qn=!1,pa=null}else throw Error(b(198));ya||(ya=!0,io=c)}}function Yt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Ju(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function rs(e){if(Yt(e)!==e)throw Error(b(188))}function $f(e){var t=e.alternate;if(!t){if(t=Yt(e),t===null)throw Error(b(188));return t!==e?null:e}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var i=a.alternate;if(i===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===i.child){for(i=a.child;i;){if(i===n)return rs(a),e;if(i===r)return rs(a),t;i=i.sibling}throw Error(b(188))}if(n.return!==r.return)n=a,r=i;else{for(var o=!1,s=a.child;s;){if(s===n){o=!0,n=a,r=i;break}if(s===r){o=!0,r=a,n=i;break}s=s.sibling}if(!o){for(s=i.child;s;){if(s===n){o=!0,n=i,r=a;break}if(s===r){o=!0,r=i,n=a;break}s=s.sibling}if(!o)throw Error(b(189))}}if(n.alternate!==r)throw Error(b(190))}if(n.tag!==3)throw Error(b(188));return n.stateNode.current===n?e:t}function Zu(e){return e=$f(e),e!==null?ec(e):null}function ec(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=ec(e);if(t!==null)return t;e=e.sibling}return null}var tc=Se.unstable_scheduleCallback,as=Se.unstable_cancelCallback,Vf=Se.unstable_shouldYield,Yf=Se.unstable_requestPaint,q=Se.unstable_now,Kf=Se.unstable_getCurrentPriorityLevel,el=Se.unstable_ImmediatePriority,nc=Se.unstable_UserBlockingPriority,ga=Se.unstable_NormalPriority,qf=Se.unstable_LowPriority,rc=Se.unstable_IdlePriority,Wa=null,Ke=null;function Qf(e){if(Ke&&typeof Ke.onCommitFiberRoot=="function")try{Ke.onCommitFiberRoot(Wa,e,void 0,(e.current.flags&128)===128)}catch{}}var He=Math.clz32?Math.clz32:Jf,Gf=Math.log,Xf=Math.LN2;function Jf(e){return e>>>=0,e===0?32:31-(Gf(e)/Xf|0)|0}var Or=64,Mr=4194304;function Vn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function xa(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,a=e.suspendedLanes,i=e.pingedLanes,o=n&268435455;if(o!==0){var s=o&~a;s!==0?r=Vn(s):(i&=o,i!==0&&(r=Vn(i)))}else o=n&~a,o!==0?r=Vn(o):i!==0&&(r=Vn(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&a)&&(a=r&-r,i=t&-t,a>=i||a===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-He(t),a=1<<n,r|=e[n],t&=~a;return r}function Zf(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function eh(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,a=e.expirationTimes,i=e.pendingLanes;0<i;){var o=31-He(i),s=1<<o,u=a[o];u===-1?(!(s&n)||s&r)&&(a[o]=Zf(s,t)):u<=t&&(e.expiredLanes|=s),i&=~s}}function oo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ac(){var e=Or;return Or<<=1,!(Or&4194240)&&(Or=64),e}function mi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Sr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-He(t),e[t]=n}function th(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-He(n),i=1<<a;t[a]=0,r[a]=-1,e[a]=-1,n&=~i}}function tl(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-He(n),a=1<<r;a&t|e[r]&t&&(e[r]|=t),n&=~a}}var F=0;function ic(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var oc,nl,lc,sc,uc,lo=!1,Fr=[],yt=null,gt=null,xt=null,ir=new Map,or=new Map,ft=[],nh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function is(e,t){switch(e){case"focusin":case"focusout":yt=null;break;case"dragenter":case"dragleave":gt=null;break;case"mouseover":case"mouseout":xt=null;break;case"pointerover":case"pointerout":ir.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":or.delete(t.pointerId)}}function _n(e,t,n,r,a,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[a]},t!==null&&(t=Nr(t),t!==null&&nl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function rh(e,t,n,r,a){switch(t){case"focusin":return yt=_n(yt,e,t,n,r,a),!0;case"dragenter":return gt=_n(gt,e,t,n,r,a),!0;case"mouseover":return xt=_n(xt,e,t,n,r,a),!0;case"pointerover":var i=a.pointerId;return ir.set(i,_n(ir.get(i)||null,e,t,n,r,a)),!0;case"gotpointercapture":return i=a.pointerId,or.set(i,_n(or.get(i)||null,e,t,n,r,a)),!0}return!1}function cc(e){var t=_t(e.target);if(t!==null){var n=Yt(t);if(n!==null){if(t=n.tag,t===13){if(t=Ju(n),t!==null){e.blockedOn=t,uc(e.priority,function(){lc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Zr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=so(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);no=r,n.target.dispatchEvent(r),no=null}else return t=Nr(n),t!==null&&nl(t),e.blockedOn=n,!1;t.shift()}return!0}function os(e,t,n){Zr(e)&&n.delete(t)}function ah(){lo=!1,yt!==null&&Zr(yt)&&(yt=null),gt!==null&&Zr(gt)&&(gt=null),xt!==null&&Zr(xt)&&(xt=null),ir.forEach(os),or.forEach(os)}function On(e,t){e.blockedOn===t&&(e.blockedOn=null,lo||(lo=!0,Se.unstable_scheduleCallback(Se.unstable_NormalPriority,ah)))}function lr(e){function t(a){return On(a,e)}if(0<Fr.length){On(Fr[0],e);for(var n=1;n<Fr.length;n++){var r=Fr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(yt!==null&&On(yt,e),gt!==null&&On(gt,e),xt!==null&&On(xt,e),ir.forEach(t),or.forEach(t),n=0;n<ft.length;n++)r=ft[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<ft.length&&(n=ft[0],n.blockedOn===null);)cc(n),n.blockedOn===null&&ft.shift()}var dn=st.ReactCurrentBatchConfig,va=!0;function ih(e,t,n,r){var a=F,i=dn.transition;dn.transition=null;try{F=1,rl(e,t,n,r)}finally{F=a,dn.transition=i}}function oh(e,t,n,r){var a=F,i=dn.transition;dn.transition=null;try{F=4,rl(e,t,n,r)}finally{F=a,dn.transition=i}}function rl(e,t,n,r){if(va){var a=so(e,t,n,r);if(a===null)Ni(e,t,r,Ta,n),is(e,r);else if(rh(a,e,t,n,r))r.stopPropagation();else if(is(e,r),t&4&&-1<nh.indexOf(e)){for(;a!==null;){var i=Nr(a);if(i!==null&&oc(i),i=so(e,t,n,r),i===null&&Ni(e,t,r,Ta,n),i===a)break;a=i}a!==null&&r.stopPropagation()}else Ni(e,t,r,null,n)}}var Ta=null;function so(e,t,n,r){if(Ta=null,e=Zo(r),e=_t(e),e!==null)if(t=Yt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Ju(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ta=e,null}function dc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Kf()){case el:return 1;case nc:return 4;case ga:case qf:return 16;case rc:return 536870912;default:return 16}default:return 16}}var mt=null,al=null,ea=null;function fc(){if(ea)return ea;var e,t=al,n=t.length,r,a="value"in mt?mt.value:mt.textContent,i=a.length;for(e=0;e<n&&t[e]===a[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===a[i-r];r++);return ea=a.slice(e,1<r?1-r:void 0)}function ta(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Hr(){return!0}function ls(){return!1}function Ne(e){function t(n,r,a,i,o){this._reactName=n,this._targetInst=a,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Hr:ls,this.isPropagationStopped=ls,this}return V(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Hr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Hr)},persist:function(){},isPersistent:Hr}),t}var Cn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},il=Ne(Cn),br=V({},Cn,{view:0,detail:0}),lh=Ne(br),pi,yi,Mn,$a=V({},br,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ol,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Mn&&(Mn&&e.type==="mousemove"?(pi=e.screenX-Mn.screenX,yi=e.screenY-Mn.screenY):yi=pi=0,Mn=e),pi)},movementY:function(e){return"movementY"in e?e.movementY:yi}}),ss=Ne($a),sh=V({},$a,{dataTransfer:0}),uh=Ne(sh),ch=V({},br,{relatedTarget:0}),gi=Ne(ch),dh=V({},Cn,{animationName:0,elapsedTime:0,pseudoElement:0}),fh=Ne(dh),hh=V({},Cn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),mh=Ne(hh),ph=V({},Cn,{data:0}),us=Ne(ph),yh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},gh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},xh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function vh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=xh[e])?!!t[e]:!1}function ol(){return vh}var Th=V({},br,{key:function(e){if(e.key){var t=yh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ta(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?gh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ol,charCode:function(e){return e.type==="keypress"?ta(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ta(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),wh=Ne(Th),Sh=V({},$a,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),cs=Ne(Sh),bh=V({},br,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ol}),Nh=Ne(bh),Ch=V({},Cn,{propertyName:0,elapsedTime:0,pseudoElement:0}),kh=Ne(Ch),Eh=V({},$a,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ah=Ne(Eh),Rh=[9,13,27,32],ll=rt&&"CompositionEvent"in window,Qn=null;rt&&"documentMode"in document&&(Qn=document.documentMode);var jh=rt&&"TextEvent"in window&&!Qn,hc=rt&&(!ll||Qn&&8<Qn&&11>=Qn),ds=" ",fs=!1;function mc(e,t){switch(e){case"keyup":return Rh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function pc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Xt=!1;function Ph(e,t){switch(e){case"compositionend":return pc(t);case"keypress":return t.which!==32?null:(fs=!0,ds);case"textInput":return e=t.data,e===ds&&fs?null:e;default:return null}}function Ih(e,t){if(Xt)return e==="compositionend"||!ll&&mc(e,t)?(e=fc(),ea=al=mt=null,Xt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return hc&&t.locale!=="ko"?null:t.data;default:return null}}var Lh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function hs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Lh[e.type]:t==="textarea"}function yc(e,t,n,r){Ku(r),t=wa(t,"onChange"),0<t.length&&(n=new il("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Gn=null,sr=null;function _h(e){Ec(e,0)}function Va(e){var t=en(e);if(Bu(t))return e}function Oh(e,t){if(e==="change")return t}var gc=!1;if(rt){var xi;if(rt){var vi="oninput"in document;if(!vi){var ms=document.createElement("div");ms.setAttribute("oninput","return;"),vi=typeof ms.oninput=="function"}xi=vi}else xi=!1;gc=xi&&(!document.documentMode||9<document.documentMode)}function ps(){Gn&&(Gn.detachEvent("onpropertychange",xc),sr=Gn=null)}function xc(e){if(e.propertyName==="value"&&Va(sr)){var t=[];yc(t,sr,e,Zo(e)),Xu(_h,t)}}function Mh(e,t,n){e==="focusin"?(ps(),Gn=t,sr=n,Gn.attachEvent("onpropertychange",xc)):e==="focusout"&&ps()}function Fh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Va(sr)}function Hh(e,t){if(e==="click")return Va(t)}function Dh(e,t){if(e==="input"||e==="change")return Va(t)}function Bh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Be=typeof Object.is=="function"?Object.is:Bh;function ur(e,t){if(Be(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var a=n[r];if(!$i.call(t,a)||!Be(e[a],t[a]))return!1}return!0}function ys(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function gs(e,t){var n=ys(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ys(n)}}function vc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?vc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Tc(){for(var e=window,t=ma();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ma(e.document)}return t}function sl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Uh(e){var t=Tc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&vc(n.ownerDocument.documentElement,n)){if(r!==null&&sl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,i=Math.min(r.start,a);r=r.end===void 0?i:Math.min(r.end,a),!e.extend&&i>r&&(a=r,r=i,i=a),a=gs(n,i);var o=gs(n,r);a&&o&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var zh=rt&&"documentMode"in document&&11>=document.documentMode,Jt=null,uo=null,Xn=null,co=!1;function xs(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;co||Jt==null||Jt!==ma(r)||(r=Jt,"selectionStart"in r&&sl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Xn&&ur(Xn,r)||(Xn=r,r=wa(uo,"onSelect"),0<r.length&&(t=new il("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Jt)))}function Dr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Zt={animationend:Dr("Animation","AnimationEnd"),animationiteration:Dr("Animation","AnimationIteration"),animationstart:Dr("Animation","AnimationStart"),transitionend:Dr("Transition","TransitionEnd")},Ti={},wc={};rt&&(wc=document.createElement("div").style,"AnimationEvent"in window||(delete Zt.animationend.animation,delete Zt.animationiteration.animation,delete Zt.animationstart.animation),"TransitionEvent"in window||delete Zt.transitionend.transition);function Ya(e){if(Ti[e])return Ti[e];if(!Zt[e])return e;var t=Zt[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in wc)return Ti[e]=t[n];return e}var Sc=Ya("animationend"),bc=Ya("animationiteration"),Nc=Ya("animationstart"),Cc=Ya("transitionend"),kc=new Map,vs="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function kt(e,t){kc.set(e,t),Vt(t,[e])}for(var wi=0;wi<vs.length;wi++){var Si=vs[wi],Wh=Si.toLowerCase(),$h=Si[0].toUpperCase()+Si.slice(1);kt(Wh,"on"+$h)}kt(Sc,"onAnimationEnd");kt(bc,"onAnimationIteration");kt(Nc,"onAnimationStart");kt("dblclick","onDoubleClick");kt("focusin","onFocus");kt("focusout","onBlur");kt(Cc,"onTransitionEnd");yn("onMouseEnter",["mouseout","mouseover"]);yn("onMouseLeave",["mouseout","mouseover"]);yn("onPointerEnter",["pointerout","pointerover"]);yn("onPointerLeave",["pointerout","pointerover"]);Vt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Vt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Vt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Vt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Vt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Vt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Yn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Vh=new Set("cancel close invalid load scroll toggle".split(" ").concat(Yn));function Ts(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Wf(r,t,void 0,e),e.currentTarget=null}function Ec(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],a=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],u=s.instance,c=s.currentTarget;if(s=s.listener,u!==i&&a.isPropagationStopped())break e;Ts(a,s,c),i=u}else for(o=0;o<r.length;o++){if(s=r[o],u=s.instance,c=s.currentTarget,s=s.listener,u!==i&&a.isPropagationStopped())break e;Ts(a,s,c),i=u}}}if(ya)throw e=io,ya=!1,io=null,e}function D(e,t){var n=t[yo];n===void 0&&(n=t[yo]=new Set);var r=e+"__bubble";n.has(r)||(Ac(t,e,2,!1),n.add(r))}function bi(e,t,n){var r=0;t&&(r|=4),Ac(n,e,r,t)}var Br="_reactListening"+Math.random().toString(36).slice(2);function cr(e){if(!e[Br]){e[Br]=!0,Ou.forEach(function(n){n!=="selectionchange"&&(Vh.has(n)||bi(n,!1,e),bi(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Br]||(t[Br]=!0,bi("selectionchange",!1,t))}}function Ac(e,t,n,r){switch(dc(t)){case 1:var a=ih;break;case 4:a=oh;break;default:a=rl}n=a.bind(null,t,n,e),a=void 0,!ao||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),r?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Ni(e,t,n,r,a){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===a||s.nodeType===8&&s.parentNode===a)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===a||u.nodeType===8&&u.parentNode===a))return;o=o.return}for(;s!==null;){if(o=_t(s),o===null)return;if(u=o.tag,u===5||u===6){r=i=o;continue e}s=s.parentNode}}r=r.return}Xu(function(){var c=i,p=Zo(n),d=[];e:{var y=kc.get(e);if(y!==void 0){var g=il,v=e;switch(e){case"keypress":if(ta(n)===0)break e;case"keydown":case"keyup":g=wh;break;case"focusin":v="focus",g=gi;break;case"focusout":v="blur",g=gi;break;case"beforeblur":case"afterblur":g=gi;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=ss;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=uh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=Nh;break;case Sc:case bc:case Nc:g=fh;break;case Cc:g=kh;break;case"scroll":g=lh;break;case"wheel":g=Ah;break;case"copy":case"cut":case"paste":g=mh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=cs}var T=(t&4)!==0,S=!T&&e==="scroll",h=T?y!==null?y+"Capture":null:y;T=[];for(var f=c,m;f!==null;){m=f;var w=m.stateNode;if(m.tag===5&&w!==null&&(m=w,h!==null&&(w=ar(f,h),w!=null&&T.push(dr(f,w,m)))),S)break;f=f.return}0<T.length&&(y=new g(y,v,null,n,p),d.push({event:y,listeners:T}))}}if(!(t&7)){e:{if(y=e==="mouseover"||e==="pointerover",g=e==="mouseout"||e==="pointerout",y&&n!==no&&(v=n.relatedTarget||n.fromElement)&&(_t(v)||v[at]))break e;if((g||y)&&(y=p.window===p?p:(y=p.ownerDocument)?y.defaultView||y.parentWindow:window,g?(v=n.relatedTarget||n.toElement,g=c,v=v?_t(v):null,v!==null&&(S=Yt(v),v!==S||v.tag!==5&&v.tag!==6)&&(v=null)):(g=null,v=c),g!==v)){if(T=ss,w="onMouseLeave",h="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(T=cs,w="onPointerLeave",h="onPointerEnter",f="pointer"),S=g==null?y:en(g),m=v==null?y:en(v),y=new T(w,f+"leave",g,n,p),y.target=S,y.relatedTarget=m,w=null,_t(p)===c&&(T=new T(h,f+"enter",v,n,p),T.target=m,T.relatedTarget=S,w=T),S=w,g&&v)t:{for(T=g,h=v,f=0,m=T;m;m=Kt(m))f++;for(m=0,w=h;w;w=Kt(w))m++;for(;0<f-m;)T=Kt(T),f--;for(;0<m-f;)h=Kt(h),m--;for(;f--;){if(T===h||h!==null&&T===h.alternate)break t;T=Kt(T),h=Kt(h)}T=null}else T=null;g!==null&&ws(d,y,g,T,!1),v!==null&&S!==null&&ws(d,S,v,T,!0)}}e:{if(y=c?en(c):window,g=y.nodeName&&y.nodeName.toLowerCase(),g==="select"||g==="input"&&y.type==="file")var N=Oh;else if(hs(y))if(gc)N=Dh;else{N=Fh;var C=Mh}else(g=y.nodeName)&&g.toLowerCase()==="input"&&(y.type==="checkbox"||y.type==="radio")&&(N=Hh);if(N&&(N=N(e,c))){yc(d,N,n,p);break e}C&&C(e,y,c),e==="focusout"&&(C=y._wrapperState)&&C.controlled&&y.type==="number"&&Xi(y,"number",y.value)}switch(C=c?en(c):window,e){case"focusin":(hs(C)||C.contentEditable==="true")&&(Jt=C,uo=c,Xn=null);break;case"focusout":Xn=uo=Jt=null;break;case"mousedown":co=!0;break;case"contextmenu":case"mouseup":case"dragend":co=!1,xs(d,n,p);break;case"selectionchange":if(zh)break;case"keydown":case"keyup":xs(d,n,p)}var k;if(ll)e:{switch(e){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else Xt?mc(e,n)&&(R="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(hc&&n.locale!=="ko"&&(Xt||R!=="onCompositionStart"?R==="onCompositionEnd"&&Xt&&(k=fc()):(mt=p,al="value"in mt?mt.value:mt.textContent,Xt=!0)),C=wa(c,R),0<C.length&&(R=new us(R,e,null,n,p),d.push({event:R,listeners:C}),k?R.data=k:(k=pc(n),k!==null&&(R.data=k)))),(k=jh?Ph(e,n):Ih(e,n))&&(c=wa(c,"onBeforeInput"),0<c.length&&(p=new us("onBeforeInput","beforeinput",null,n,p),d.push({event:p,listeners:c}),p.data=k))}Ec(d,t)})}function dr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function wa(e,t){for(var n=t+"Capture",r=[];e!==null;){var a=e,i=a.stateNode;a.tag===5&&i!==null&&(a=i,i=ar(e,n),i!=null&&r.unshift(dr(e,i,a)),i=ar(e,t),i!=null&&r.push(dr(e,i,a))),e=e.return}return r}function Kt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ws(e,t,n,r,a){for(var i=t._reactName,o=[];n!==null&&n!==r;){var s=n,u=s.alternate,c=s.stateNode;if(u!==null&&u===r)break;s.tag===5&&c!==null&&(s=c,a?(u=ar(n,i),u!=null&&o.unshift(dr(n,u,s))):a||(u=ar(n,i),u!=null&&o.push(dr(n,u,s)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Yh=/\r\n?/g,Kh=/\u0000|\uFFFD/g;function Ss(e){return(typeof e=="string"?e:""+e).replace(Yh,`
`).replace(Kh,"")}function Ur(e,t,n){if(t=Ss(t),Ss(e)!==t&&n)throw Error(b(425))}function Sa(){}var fo=null,ho=null;function mo(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var po=typeof setTimeout=="function"?setTimeout:void 0,qh=typeof clearTimeout=="function"?clearTimeout:void 0,bs=typeof Promise=="function"?Promise:void 0,Qh=typeof queueMicrotask=="function"?queueMicrotask:typeof bs<"u"?function(e){return bs.resolve(null).then(e).catch(Gh)}:po;function Gh(e){setTimeout(function(){throw e})}function Ci(e,t){var n=t,r=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(r===0){e.removeChild(a),lr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=a}while(n);lr(t)}function vt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ns(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var kn=Math.random().toString(36).slice(2),Ve="__reactFiber$"+kn,fr="__reactProps$"+kn,at="__reactContainer$"+kn,yo="__reactEvents$"+kn,Xh="__reactListeners$"+kn,Jh="__reactHandles$"+kn;function _t(e){var t=e[Ve];if(t)return t;for(var n=e.parentNode;n;){if(t=n[at]||n[Ve]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ns(e);e!==null;){if(n=e[Ve])return n;e=Ns(e)}return t}e=n,n=e.parentNode}return null}function Nr(e){return e=e[Ve]||e[at],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function en(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(b(33))}function Ka(e){return e[fr]||null}var go=[],tn=-1;function Et(e){return{current:e}}function B(e){0>tn||(e.current=go[tn],go[tn]=null,tn--)}function H(e,t){tn++,go[tn]=e.current,e.current=t}var Ct={},ue=Et(Ct),ye=Et(!1),Bt=Ct;function gn(e,t){var n=e.type.contextTypes;if(!n)return Ct;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={},i;for(i in n)a[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function ge(e){return e=e.childContextTypes,e!=null}function ba(){B(ye),B(ue)}function Cs(e,t,n){if(ue.current!==Ct)throw Error(b(168));H(ue,t),H(ye,n)}function Rc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var a in r)if(!(a in t))throw Error(b(108,Mf(e)||"Unknown",a));return V({},n,r)}function Na(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ct,Bt=ue.current,H(ue,e),H(ye,ye.current),!0}function ks(e,t,n){var r=e.stateNode;if(!r)throw Error(b(169));n?(e=Rc(e,t,Bt),r.__reactInternalMemoizedMergedChildContext=e,B(ye),B(ue),H(ue,e)):B(ye),H(ye,n)}var Je=null,qa=!1,ki=!1;function jc(e){Je===null?Je=[e]:Je.push(e)}function Zh(e){qa=!0,jc(e)}function At(){if(!ki&&Je!==null){ki=!0;var e=0,t=F;try{var n=Je;for(F=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Je=null,qa=!1}catch(a){throw Je!==null&&(Je=Je.slice(e+1)),tc(el,At),a}finally{F=t,ki=!1}}return null}var nn=[],rn=0,Ca=null,ka=0,Ee=[],Ae=0,Ut=null,Ze=1,et="";function Pt(e,t){nn[rn++]=ka,nn[rn++]=Ca,Ca=e,ka=t}function Pc(e,t,n){Ee[Ae++]=Ze,Ee[Ae++]=et,Ee[Ae++]=Ut,Ut=e;var r=Ze;e=et;var a=32-He(r)-1;r&=~(1<<a),n+=1;var i=32-He(t)+a;if(30<i){var o=a-a%5;i=(r&(1<<o)-1).toString(32),r>>=o,a-=o,Ze=1<<32-He(t)+a|n<<a|r,et=i+e}else Ze=1<<i|n<<a|r,et=e}function ul(e){e.return!==null&&(Pt(e,1),Pc(e,1,0))}function cl(e){for(;e===Ca;)Ca=nn[--rn],nn[rn]=null,ka=nn[--rn],nn[rn]=null;for(;e===Ut;)Ut=Ee[--Ae],Ee[Ae]=null,et=Ee[--Ae],Ee[Ae]=null,Ze=Ee[--Ae],Ee[Ae]=null}var we=null,Te=null,U=!1,Me=null;function Ic(e,t){var n=Re(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Es(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,we=e,Te=vt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,we=e,Te=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Ut!==null?{id:Ze,overflow:et}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Re(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,we=e,Te=null,!0):!1;default:return!1}}function xo(e){return(e.mode&1)!==0&&(e.flags&128)===0}function vo(e){if(U){var t=Te;if(t){var n=t;if(!Es(e,t)){if(xo(e))throw Error(b(418));t=vt(n.nextSibling);var r=we;t&&Es(e,t)?Ic(r,n):(e.flags=e.flags&-4097|2,U=!1,we=e)}}else{if(xo(e))throw Error(b(418));e.flags=e.flags&-4097|2,U=!1,we=e}}}function As(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;we=e}function zr(e){if(e!==we)return!1;if(!U)return As(e),U=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!mo(e.type,e.memoizedProps)),t&&(t=Te)){if(xo(e))throw Lc(),Error(b(418));for(;t;)Ic(e,t),t=vt(t.nextSibling)}if(As(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(b(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Te=vt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Te=null}}else Te=we?vt(e.stateNode.nextSibling):null;return!0}function Lc(){for(var e=Te;e;)e=vt(e.nextSibling)}function xn(){Te=we=null,U=!1}function dl(e){Me===null?Me=[e]:Me.push(e)}var em=st.ReactCurrentBatchConfig;function Fn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(b(309));var r=n.stateNode}if(!r)throw Error(b(147,e));var a=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(o){var s=a.refs;o===null?delete s[i]:s[i]=o},t._stringRef=i,t)}if(typeof e!="string")throw Error(b(284));if(!n._owner)throw Error(b(290,e))}return e}function Wr(e,t){throw e=Object.prototype.toString.call(t),Error(b(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Rs(e){var t=e._init;return t(e._payload)}function _c(e){function t(h,f){if(e){var m=h.deletions;m===null?(h.deletions=[f],h.flags|=16):m.push(f)}}function n(h,f){if(!e)return null;for(;f!==null;)t(h,f),f=f.sibling;return null}function r(h,f){for(h=new Map;f!==null;)f.key!==null?h.set(f.key,f):h.set(f.index,f),f=f.sibling;return h}function a(h,f){return h=bt(h,f),h.index=0,h.sibling=null,h}function i(h,f,m){return h.index=m,e?(m=h.alternate,m!==null?(m=m.index,m<f?(h.flags|=2,f):m):(h.flags|=2,f)):(h.flags|=1048576,f)}function o(h){return e&&h.alternate===null&&(h.flags|=2),h}function s(h,f,m,w){return f===null||f.tag!==6?(f=Li(m,h.mode,w),f.return=h,f):(f=a(f,m),f.return=h,f)}function u(h,f,m,w){var N=m.type;return N===Gt?p(h,f,m.props.children,w,m.key):f!==null&&(f.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===ct&&Rs(N)===f.type)?(w=a(f,m.props),w.ref=Fn(h,f,m),w.return=h,w):(w=sa(m.type,m.key,m.props,null,h.mode,w),w.ref=Fn(h,f,m),w.return=h,w)}function c(h,f,m,w){return f===null||f.tag!==4||f.stateNode.containerInfo!==m.containerInfo||f.stateNode.implementation!==m.implementation?(f=_i(m,h.mode,w),f.return=h,f):(f=a(f,m.children||[]),f.return=h,f)}function p(h,f,m,w,N){return f===null||f.tag!==7?(f=Dt(m,h.mode,w,N),f.return=h,f):(f=a(f,m),f.return=h,f)}function d(h,f,m){if(typeof f=="string"&&f!==""||typeof f=="number")return f=Li(""+f,h.mode,m),f.return=h,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Ir:return m=sa(f.type,f.key,f.props,null,h.mode,m),m.ref=Fn(h,null,f),m.return=h,m;case Qt:return f=_i(f,h.mode,m),f.return=h,f;case ct:var w=f._init;return d(h,w(f._payload),m)}if($n(f)||In(f))return f=Dt(f,h.mode,m,null),f.return=h,f;Wr(h,f)}return null}function y(h,f,m,w){var N=f!==null?f.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return N!==null?null:s(h,f,""+m,w);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Ir:return m.key===N?u(h,f,m,w):null;case Qt:return m.key===N?c(h,f,m,w):null;case ct:return N=m._init,y(h,f,N(m._payload),w)}if($n(m)||In(m))return N!==null?null:p(h,f,m,w,null);Wr(h,m)}return null}function g(h,f,m,w,N){if(typeof w=="string"&&w!==""||typeof w=="number")return h=h.get(m)||null,s(f,h,""+w,N);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Ir:return h=h.get(w.key===null?m:w.key)||null,u(f,h,w,N);case Qt:return h=h.get(w.key===null?m:w.key)||null,c(f,h,w,N);case ct:var C=w._init;return g(h,f,m,C(w._payload),N)}if($n(w)||In(w))return h=h.get(m)||null,p(f,h,w,N,null);Wr(f,w)}return null}function v(h,f,m,w){for(var N=null,C=null,k=f,R=f=0,M=null;k!==null&&R<m.length;R++){k.index>R?(M=k,k=null):M=k.sibling;var P=y(h,k,m[R],w);if(P===null){k===null&&(k=M);break}e&&k&&P.alternate===null&&t(h,k),f=i(P,f,R),C===null?N=P:C.sibling=P,C=P,k=M}if(R===m.length)return n(h,k),U&&Pt(h,R),N;if(k===null){for(;R<m.length;R++)k=d(h,m[R],w),k!==null&&(f=i(k,f,R),C===null?N=k:C.sibling=k,C=k);return U&&Pt(h,R),N}for(k=r(h,k);R<m.length;R++)M=g(k,h,R,m[R],w),M!==null&&(e&&M.alternate!==null&&k.delete(M.key===null?R:M.key),f=i(M,f,R),C===null?N=M:C.sibling=M,C=M);return e&&k.forEach(function(ie){return t(h,ie)}),U&&Pt(h,R),N}function T(h,f,m,w){var N=In(m);if(typeof N!="function")throw Error(b(150));if(m=N.call(m),m==null)throw Error(b(151));for(var C=N=null,k=f,R=f=0,M=null,P=m.next();k!==null&&!P.done;R++,P=m.next()){k.index>R?(M=k,k=null):M=k.sibling;var ie=y(h,k,P.value,w);if(ie===null){k===null&&(k=M);break}e&&k&&ie.alternate===null&&t(h,k),f=i(ie,f,R),C===null?N=ie:C.sibling=ie,C=ie,k=M}if(P.done)return n(h,k),U&&Pt(h,R),N;if(k===null){for(;!P.done;R++,P=m.next())P=d(h,P.value,w),P!==null&&(f=i(P,f,R),C===null?N=P:C.sibling=P,C=P);return U&&Pt(h,R),N}for(k=r(h,k);!P.done;R++,P=m.next())P=g(k,h,R,P.value,w),P!==null&&(e&&P.alternate!==null&&k.delete(P.key===null?R:P.key),f=i(P,f,R),C===null?N=P:C.sibling=P,C=P);return e&&k.forEach(function(jn){return t(h,jn)}),U&&Pt(h,R),N}function S(h,f,m,w){if(typeof m=="object"&&m!==null&&m.type===Gt&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case Ir:e:{for(var N=m.key,C=f;C!==null;){if(C.key===N){if(N=m.type,N===Gt){if(C.tag===7){n(h,C.sibling),f=a(C,m.props.children),f.return=h,h=f;break e}}else if(C.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===ct&&Rs(N)===C.type){n(h,C.sibling),f=a(C,m.props),f.ref=Fn(h,C,m),f.return=h,h=f;break e}n(h,C);break}else t(h,C);C=C.sibling}m.type===Gt?(f=Dt(m.props.children,h.mode,w,m.key),f.return=h,h=f):(w=sa(m.type,m.key,m.props,null,h.mode,w),w.ref=Fn(h,f,m),w.return=h,h=w)}return o(h);case Qt:e:{for(C=m.key;f!==null;){if(f.key===C)if(f.tag===4&&f.stateNode.containerInfo===m.containerInfo&&f.stateNode.implementation===m.implementation){n(h,f.sibling),f=a(f,m.children||[]),f.return=h,h=f;break e}else{n(h,f);break}else t(h,f);f=f.sibling}f=_i(m,h.mode,w),f.return=h,h=f}return o(h);case ct:return C=m._init,S(h,f,C(m._payload),w)}if($n(m))return v(h,f,m,w);if(In(m))return T(h,f,m,w);Wr(h,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,f!==null&&f.tag===6?(n(h,f.sibling),f=a(f,m),f.return=h,h=f):(n(h,f),f=Li(m,h.mode,w),f.return=h,h=f),o(h)):n(h,f)}return S}var vn=_c(!0),Oc=_c(!1),Ea=Et(null),Aa=null,an=null,fl=null;function hl(){fl=an=Aa=null}function ml(e){var t=Ea.current;B(Ea),e._currentValue=t}function To(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function fn(e,t){Aa=e,fl=an=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(pe=!0),e.firstContext=null)}function Pe(e){var t=e._currentValue;if(fl!==e)if(e={context:e,memoizedValue:t,next:null},an===null){if(Aa===null)throw Error(b(308));an=e,Aa.dependencies={lanes:0,firstContext:e}}else an=an.next=e;return t}var Ot=null;function pl(e){Ot===null?Ot=[e]:Ot.push(e)}function Mc(e,t,n,r){var a=t.interleaved;return a===null?(n.next=n,pl(t)):(n.next=a.next,a.next=n),t.interleaved=n,it(e,r)}function it(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var dt=!1;function yl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function tt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Tt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,O&2){var a=r.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),r.pending=t,it(e,n)}return a=r.interleaved,a===null?(t.next=t,pl(r)):(t.next=a.next,a.next=t),r.interleaved=t,it(e,n)}function na(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,tl(e,n)}}function js(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var a=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?a=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?a=i=t:i=i.next=t}else a=i=t;n={baseState:r.baseState,firstBaseUpdate:a,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Ra(e,t,n,r){var a=e.updateQueue;dt=!1;var i=a.firstBaseUpdate,o=a.lastBaseUpdate,s=a.shared.pending;if(s!==null){a.shared.pending=null;var u=s,c=u.next;u.next=null,o===null?i=c:o.next=c,o=u;var p=e.alternate;p!==null&&(p=p.updateQueue,s=p.lastBaseUpdate,s!==o&&(s===null?p.firstBaseUpdate=c:s.next=c,p.lastBaseUpdate=u))}if(i!==null){var d=a.baseState;o=0,p=c=u=null,s=i;do{var y=s.lane,g=s.eventTime;if((r&y)===y){p!==null&&(p=p.next={eventTime:g,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var v=e,T=s;switch(y=t,g=n,T.tag){case 1:if(v=T.payload,typeof v=="function"){d=v.call(g,d,y);break e}d=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=T.payload,y=typeof v=="function"?v.call(g,d,y):v,y==null)break e;d=V({},d,y);break e;case 2:dt=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,y=a.effects,y===null?a.effects=[s]:y.push(s))}else g={eventTime:g,lane:y,tag:s.tag,payload:s.payload,callback:s.callback,next:null},p===null?(c=p=g,u=d):p=p.next=g,o|=y;if(s=s.next,s===null){if(s=a.shared.pending,s===null)break;y=s,s=y.next,y.next=null,a.lastBaseUpdate=y,a.shared.pending=null}}while(!0);if(p===null&&(u=d),a.baseState=u,a.firstBaseUpdate=c,a.lastBaseUpdate=p,t=a.shared.interleaved,t!==null){a=t;do o|=a.lane,a=a.next;while(a!==t)}else i===null&&(a.shared.lanes=0);Wt|=o,e.lanes=o,e.memoizedState=d}}function Ps(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],a=r.callback;if(a!==null){if(r.callback=null,r=n,typeof a!="function")throw Error(b(191,a));a.call(r)}}}var Cr={},qe=Et(Cr),hr=Et(Cr),mr=Et(Cr);function Mt(e){if(e===Cr)throw Error(b(174));return e}function gl(e,t){switch(H(mr,t),H(hr,e),H(qe,Cr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Zi(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Zi(t,e)}B(qe),H(qe,t)}function Tn(){B(qe),B(hr),B(mr)}function Hc(e){Mt(mr.current);var t=Mt(qe.current),n=Zi(t,e.type);t!==n&&(H(hr,e),H(qe,n))}function xl(e){hr.current===e&&(B(qe),B(hr))}var W=Et(0);function ja(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ei=[];function vl(){for(var e=0;e<Ei.length;e++)Ei[e]._workInProgressVersionPrimary=null;Ei.length=0}var ra=st.ReactCurrentDispatcher,Ai=st.ReactCurrentBatchConfig,zt=0,$=null,G=null,ee=null,Pa=!1,Jn=!1,pr=0,tm=0;function oe(){throw Error(b(321))}function Tl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Be(e[n],t[n]))return!1;return!0}function wl(e,t,n,r,a,i){if(zt=i,$=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ra.current=e===null||e.memoizedState===null?im:om,e=n(r,a),Jn){i=0;do{if(Jn=!1,pr=0,25<=i)throw Error(b(301));i+=1,ee=G=null,t.updateQueue=null,ra.current=lm,e=n(r,a)}while(Jn)}if(ra.current=Ia,t=G!==null&&G.next!==null,zt=0,ee=G=$=null,Pa=!1,t)throw Error(b(300));return e}function Sl(){var e=pr!==0;return pr=0,e}function $e(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ee===null?$.memoizedState=ee=e:ee=ee.next=e,ee}function Ie(){if(G===null){var e=$.alternate;e=e!==null?e.memoizedState:null}else e=G.next;var t=ee===null?$.memoizedState:ee.next;if(t!==null)ee=t,G=e;else{if(e===null)throw Error(b(310));G=e,e={memoizedState:G.memoizedState,baseState:G.baseState,baseQueue:G.baseQueue,queue:G.queue,next:null},ee===null?$.memoizedState=ee=e:ee=ee.next=e}return ee}function yr(e,t){return typeof t=="function"?t(e):t}function Ri(e){var t=Ie(),n=t.queue;if(n===null)throw Error(b(311));n.lastRenderedReducer=e;var r=G,a=r.baseQueue,i=n.pending;if(i!==null){if(a!==null){var o=a.next;a.next=i.next,i.next=o}r.baseQueue=a=i,n.pending=null}if(a!==null){i=a.next,r=r.baseState;var s=o=null,u=null,c=i;do{var p=c.lane;if((zt&p)===p)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var d={lane:p,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(s=u=d,o=r):u=u.next=d,$.lanes|=p,Wt|=p}c=c.next}while(c!==null&&c!==i);u===null?o=r:u.next=s,Be(r,t.memoizedState)||(pe=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){a=e;do i=a.lane,$.lanes|=i,Wt|=i,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ji(e){var t=Ie(),n=t.queue;if(n===null)throw Error(b(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,i=t.memoizedState;if(a!==null){n.pending=null;var o=a=a.next;do i=e(i,o.action),o=o.next;while(o!==a);Be(i,t.memoizedState)||(pe=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Dc(){}function Bc(e,t){var n=$,r=Ie(),a=t(),i=!Be(r.memoizedState,a);if(i&&(r.memoizedState=a,pe=!0),r=r.queue,bl(Wc.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||ee!==null&&ee.memoizedState.tag&1){if(n.flags|=2048,gr(9,zc.bind(null,n,r,a,t),void 0,null),te===null)throw Error(b(349));zt&30||Uc(n,t,a)}return a}function Uc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=$.updateQueue,t===null?(t={lastEffect:null,stores:null},$.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function zc(e,t,n,r){t.value=n,t.getSnapshot=r,$c(t)&&Vc(e)}function Wc(e,t,n){return n(function(){$c(t)&&Vc(e)})}function $c(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Be(e,n)}catch{return!0}}function Vc(e){var t=it(e,1);t!==null&&De(t,e,1,-1)}function Is(e){var t=$e();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:yr,lastRenderedState:e},t.queue=e,e=e.dispatch=am.bind(null,$,e),[t.memoizedState,e]}function gr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=$.updateQueue,t===null?(t={lastEffect:null,stores:null},$.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Yc(){return Ie().memoizedState}function aa(e,t,n,r){var a=$e();$.flags|=e,a.memoizedState=gr(1|t,n,void 0,r===void 0?null:r)}function Qa(e,t,n,r){var a=Ie();r=r===void 0?null:r;var i=void 0;if(G!==null){var o=G.memoizedState;if(i=o.destroy,r!==null&&Tl(r,o.deps)){a.memoizedState=gr(t,n,i,r);return}}$.flags|=e,a.memoizedState=gr(1|t,n,i,r)}function Ls(e,t){return aa(8390656,8,e,t)}function bl(e,t){return Qa(2048,8,e,t)}function Kc(e,t){return Qa(4,2,e,t)}function qc(e,t){return Qa(4,4,e,t)}function Qc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Gc(e,t,n){return n=n!=null?n.concat([e]):null,Qa(4,4,Qc.bind(null,t,e),n)}function Nl(){}function Xc(e,t){var n=Ie();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Tl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Jc(e,t){var n=Ie();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Tl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Zc(e,t,n){return zt&21?(Be(n,t)||(n=ac(),$.lanes|=n,Wt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,pe=!0),e.memoizedState=n)}function nm(e,t){var n=F;F=n!==0&&4>n?n:4,e(!0);var r=Ai.transition;Ai.transition={};try{e(!1),t()}finally{F=n,Ai.transition=r}}function ed(){return Ie().memoizedState}function rm(e,t,n){var r=St(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},td(e))nd(t,n);else if(n=Mc(e,t,n,r),n!==null){var a=de();De(n,e,r,a),rd(n,t,r)}}function am(e,t,n){var r=St(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(td(e))nd(t,a);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var o=t.lastRenderedState,s=i(o,n);if(a.hasEagerState=!0,a.eagerState=s,Be(s,o)){var u=t.interleaved;u===null?(a.next=a,pl(t)):(a.next=u.next,u.next=a),t.interleaved=a;return}}catch{}finally{}n=Mc(e,t,a,r),n!==null&&(a=de(),De(n,e,r,a),rd(n,t,r))}}function td(e){var t=e.alternate;return e===$||t!==null&&t===$}function nd(e,t){Jn=Pa=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function rd(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,tl(e,n)}}var Ia={readContext:Pe,useCallback:oe,useContext:oe,useEffect:oe,useImperativeHandle:oe,useInsertionEffect:oe,useLayoutEffect:oe,useMemo:oe,useReducer:oe,useRef:oe,useState:oe,useDebugValue:oe,useDeferredValue:oe,useTransition:oe,useMutableSource:oe,useSyncExternalStore:oe,useId:oe,unstable_isNewReconciler:!1},im={readContext:Pe,useCallback:function(e,t){return $e().memoizedState=[e,t===void 0?null:t],e},useContext:Pe,useEffect:Ls,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,aa(4194308,4,Qc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return aa(4194308,4,e,t)},useInsertionEffect:function(e,t){return aa(4,2,e,t)},useMemo:function(e,t){var n=$e();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=$e();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=rm.bind(null,$,e),[r.memoizedState,e]},useRef:function(e){var t=$e();return e={current:e},t.memoizedState=e},useState:Is,useDebugValue:Nl,useDeferredValue:function(e){return $e().memoizedState=e},useTransition:function(){var e=Is(!1),t=e[0];return e=nm.bind(null,e[1]),$e().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=$,a=$e();if(U){if(n===void 0)throw Error(b(407));n=n()}else{if(n=t(),te===null)throw Error(b(349));zt&30||Uc(r,t,n)}a.memoizedState=n;var i={value:n,getSnapshot:t};return a.queue=i,Ls(Wc.bind(null,r,i,e),[e]),r.flags|=2048,gr(9,zc.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=$e(),t=te.identifierPrefix;if(U){var n=et,r=Ze;n=(r&~(1<<32-He(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=pr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=tm++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},om={readContext:Pe,useCallback:Xc,useContext:Pe,useEffect:bl,useImperativeHandle:Gc,useInsertionEffect:Kc,useLayoutEffect:qc,useMemo:Jc,useReducer:Ri,useRef:Yc,useState:function(){return Ri(yr)},useDebugValue:Nl,useDeferredValue:function(e){var t=Ie();return Zc(t,G.memoizedState,e)},useTransition:function(){var e=Ri(yr)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:Dc,useSyncExternalStore:Bc,useId:ed,unstable_isNewReconciler:!1},lm={readContext:Pe,useCallback:Xc,useContext:Pe,useEffect:bl,useImperativeHandle:Gc,useInsertionEffect:Kc,useLayoutEffect:qc,useMemo:Jc,useReducer:ji,useRef:Yc,useState:function(){return ji(yr)},useDebugValue:Nl,useDeferredValue:function(e){var t=Ie();return G===null?t.memoizedState=e:Zc(t,G.memoizedState,e)},useTransition:function(){var e=ji(yr)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:Dc,useSyncExternalStore:Bc,useId:ed,unstable_isNewReconciler:!1};function _e(e,t){if(e&&e.defaultProps){t=V({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function wo(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:V({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ga={isMounted:function(e){return(e=e._reactInternals)?Yt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=de(),a=St(e),i=tt(r,a);i.payload=t,n!=null&&(i.callback=n),t=Tt(e,i,a),t!==null&&(De(t,e,a,r),na(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=de(),a=St(e),i=tt(r,a);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Tt(e,i,a),t!==null&&(De(t,e,a,r),na(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=de(),r=St(e),a=tt(n,r);a.tag=2,t!=null&&(a.callback=t),t=Tt(e,a,r),t!==null&&(De(t,e,r,n),na(t,e,r))}};function _s(e,t,n,r,a,i,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,o):t.prototype&&t.prototype.isPureReactComponent?!ur(n,r)||!ur(a,i):!0}function ad(e,t,n){var r=!1,a=Ct,i=t.contextType;return typeof i=="object"&&i!==null?i=Pe(i):(a=ge(t)?Bt:ue.current,r=t.contextTypes,i=(r=r!=null)?gn(e,a):Ct),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Ga,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=i),t}function Os(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ga.enqueueReplaceState(t,t.state,null)}function So(e,t,n,r){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},yl(e);var i=t.contextType;typeof i=="object"&&i!==null?a.context=Pe(i):(i=ge(t)?Bt:ue.current,a.context=gn(e,i)),a.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(wo(e,t,i,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&Ga.enqueueReplaceState(a,a.state,null),Ra(e,n,a,r),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function wn(e,t){try{var n="",r=t;do n+=Of(r),r=r.return;while(r);var a=n}catch(i){a=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:a,digest:null}}function Pi(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function bo(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var sm=typeof WeakMap=="function"?WeakMap:Map;function id(e,t,n){n=tt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){_a||(_a=!0,Lo=r),bo(e,t)},n}function od(e,t,n){n=tt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var a=t.value;n.payload=function(){return r(a)},n.callback=function(){bo(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){bo(e,t),typeof r!="function"&&(wt===null?wt=new Set([this]):wt.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Ms(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new sm;var a=new Set;r.set(t,a)}else a=r.get(t),a===void 0&&(a=new Set,r.set(t,a));a.has(n)||(a.add(n),e=Sm.bind(null,e,t,n),t.then(e,e))}function Fs(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Hs(e,t,n,r,a){return e.mode&1?(e.flags|=65536,e.lanes=a,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=tt(-1,1),t.tag=2,Tt(n,t,1))),n.lanes|=1),e)}var um=st.ReactCurrentOwner,pe=!1;function ce(e,t,n,r){t.child=e===null?Oc(t,null,n,r):vn(t,e.child,n,r)}function Ds(e,t,n,r,a){n=n.render;var i=t.ref;return fn(t,a),r=wl(e,t,n,r,i,a),n=Sl(),e!==null&&!pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,ot(e,t,a)):(U&&n&&ul(t),t.flags|=1,ce(e,t,r,a),t.child)}function Bs(e,t,n,r,a){if(e===null){var i=n.type;return typeof i=="function"&&!Il(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,ld(e,t,i,r,a)):(e=sa(n.type,null,r,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&a)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:ur,n(o,r)&&e.ref===t.ref)return ot(e,t,a)}return t.flags|=1,e=bt(i,r),e.ref=t.ref,e.return=t,t.child=e}function ld(e,t,n,r,a){if(e!==null){var i=e.memoizedProps;if(ur(i,r)&&e.ref===t.ref)if(pe=!1,t.pendingProps=r=i,(e.lanes&a)!==0)e.flags&131072&&(pe=!0);else return t.lanes=e.lanes,ot(e,t,a)}return No(e,t,n,r,a)}function sd(e,t,n){var r=t.pendingProps,a=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},H(ln,ve),ve|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,H(ln,ve),ve|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,H(ln,ve),ve|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,H(ln,ve),ve|=r;return ce(e,t,a,n),t.child}function ud(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function No(e,t,n,r,a){var i=ge(n)?Bt:ue.current;return i=gn(t,i),fn(t,a),n=wl(e,t,n,r,i,a),r=Sl(),e!==null&&!pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,ot(e,t,a)):(U&&r&&ul(t),t.flags|=1,ce(e,t,n,a),t.child)}function Us(e,t,n,r,a){if(ge(n)){var i=!0;Na(t)}else i=!1;if(fn(t,a),t.stateNode===null)ia(e,t),ad(t,n,r),So(t,n,r,a),r=!0;else if(e===null){var o=t.stateNode,s=t.memoizedProps;o.props=s;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Pe(c):(c=ge(n)?Bt:ue.current,c=gn(t,c));var p=n.getDerivedStateFromProps,d=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==r||u!==c)&&Os(t,o,r,c),dt=!1;var y=t.memoizedState;o.state=y,Ra(t,r,o,a),u=t.memoizedState,s!==r||y!==u||ye.current||dt?(typeof p=="function"&&(wo(t,n,p,r),u=t.memoizedState),(s=dt||_s(t,n,s,r,y,u,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),o.props=r,o.state=u,o.context=c,r=s):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,Fc(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:_e(t.type,s),o.props=c,d=t.pendingProps,y=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=Pe(u):(u=ge(n)?Bt:ue.current,u=gn(t,u));var g=n.getDerivedStateFromProps;(p=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==d||y!==u)&&Os(t,o,r,u),dt=!1,y=t.memoizedState,o.state=y,Ra(t,r,o,a);var v=t.memoizedState;s!==d||y!==v||ye.current||dt?(typeof g=="function"&&(wo(t,n,g,r),v=t.memoizedState),(c=dt||_s(t,n,c,r,y,v,u)||!1)?(p||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,v,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,v,u)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=v),o.props=r,o.state=v,o.context=u,r=c):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),r=!1)}return Co(e,t,n,r,i,a)}function Co(e,t,n,r,a,i){ud(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return a&&ks(t,n,!1),ot(e,t,i);r=t.stateNode,um.current=t;var s=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=vn(t,e.child,null,i),t.child=vn(t,null,s,i)):ce(e,t,s,i),t.memoizedState=r.state,a&&ks(t,n,!0),t.child}function cd(e){var t=e.stateNode;t.pendingContext?Cs(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Cs(e,t.context,!1),gl(e,t.containerInfo)}function zs(e,t,n,r,a){return xn(),dl(a),t.flags|=256,ce(e,t,n,r),t.child}var ko={dehydrated:null,treeContext:null,retryLane:0};function Eo(e){return{baseLanes:e,cachePool:null,transitions:null}}function dd(e,t,n){var r=t.pendingProps,a=W.current,i=!1,o=(t.flags&128)!==0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(a&2)!==0),s?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),H(W,a&1),e===null)return vo(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,i?(r=t.mode,i=t.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=Za(o,r,0,null),e=Dt(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Eo(n),t.memoizedState=ko,e):Cl(t,o));if(a=e.memoizedState,a!==null&&(s=a.dehydrated,s!==null))return cm(e,t,o,r,s,a,n);if(i){i=r.fallback,o=t.mode,a=e.child,s=a.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&t.child!==a?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=bt(a,u),r.subtreeFlags=a.subtreeFlags&14680064),s!==null?i=bt(s,i):(i=Dt(i,o,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,o=e.child.memoizedState,o=o===null?Eo(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=e.childLanes&~n,t.memoizedState=ko,r}return i=e.child,e=i.sibling,r=bt(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Cl(e,t){return t=Za({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function $r(e,t,n,r){return r!==null&&dl(r),vn(t,e.child,null,n),e=Cl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function cm(e,t,n,r,a,i,o){if(n)return t.flags&256?(t.flags&=-257,r=Pi(Error(b(422))),$r(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,a=t.mode,r=Za({mode:"visible",children:r.children},a,0,null),i=Dt(i,a,o,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&vn(t,e.child,null,o),t.child.memoizedState=Eo(o),t.memoizedState=ko,i);if(!(t.mode&1))return $r(e,t,o,null);if(a.data==="$!"){if(r=a.nextSibling&&a.nextSibling.dataset,r)var s=r.dgst;return r=s,i=Error(b(419)),r=Pi(i,r,void 0),$r(e,t,o,r)}if(s=(o&e.childLanes)!==0,pe||s){if(r=te,r!==null){switch(o&-o){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=a&(r.suspendedLanes|o)?0:a,a!==0&&a!==i.retryLane&&(i.retryLane=a,it(e,a),De(r,e,a,-1))}return Pl(),r=Pi(Error(b(421))),$r(e,t,o,r)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=bm.bind(null,e),a._reactRetry=t,null):(e=i.treeContext,Te=vt(a.nextSibling),we=t,U=!0,Me=null,e!==null&&(Ee[Ae++]=Ze,Ee[Ae++]=et,Ee[Ae++]=Ut,Ze=e.id,et=e.overflow,Ut=t),t=Cl(t,r.children),t.flags|=4096,t)}function Ws(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),To(e.return,t,n)}function Ii(e,t,n,r,a){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=a)}function fd(e,t,n){var r=t.pendingProps,a=r.revealOrder,i=r.tail;if(ce(e,t,r.children,n),r=W.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ws(e,n,t);else if(e.tag===19)Ws(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(H(W,r),!(t.mode&1))t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&ja(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Ii(t,!1,a,n,i);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&ja(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Ii(t,!0,n,null,i);break;case"together":Ii(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ia(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function ot(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Wt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(b(153));if(t.child!==null){for(e=t.child,n=bt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=bt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function dm(e,t,n){switch(t.tag){case 3:cd(t),xn();break;case 5:Hc(t);break;case 1:ge(t.type)&&Na(t);break;case 4:gl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,a=t.memoizedProps.value;H(Ea,r._currentValue),r._currentValue=a;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(H(W,W.current&1),t.flags|=128,null):n&t.child.childLanes?dd(e,t,n):(H(W,W.current&1),e=ot(e,t,n),e!==null?e.sibling:null);H(W,W.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return fd(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),H(W,W.current),r)break;return null;case 22:case 23:return t.lanes=0,sd(e,t,n)}return ot(e,t,n)}var hd,Ao,md,pd;hd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ao=function(){};md=function(e,t,n,r){var a=e.memoizedProps;if(a!==r){e=t.stateNode,Mt(qe.current);var i=null;switch(n){case"input":a=Qi(e,a),r=Qi(e,r),i=[];break;case"select":a=V({},a,{value:void 0}),r=V({},r,{value:void 0}),i=[];break;case"textarea":a=Ji(e,a),r=Ji(e,r),i=[];break;default:typeof a.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Sa)}eo(n,r);var o;n=null;for(c in a)if(!r.hasOwnProperty(c)&&a.hasOwnProperty(c)&&a[c]!=null)if(c==="style"){var s=a[c];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(nr.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var u=r[c];if(s=a!=null?a[c]:void 0,r.hasOwnProperty(c)&&u!==s&&(u!=null||s!=null))if(c==="style")if(s){for(o in s)!s.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&s[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(i||(i=[]),i.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,s=s?s.__html:void 0,u!=null&&s!==u&&(i=i||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(nr.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&D("scroll",e),i||s===u||(i=[])):(i=i||[]).push(c,u))}n&&(i=i||[]).push("style",n);var c=i;(t.updateQueue=c)&&(t.flags|=4)}};pd=function(e,t,n,r){n!==r&&(t.flags|=4)};function Hn(e,t){if(!U)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function le(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags&14680064,r|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,r|=a.subtreeFlags,r|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function fm(e,t,n){var r=t.pendingProps;switch(cl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return le(t),null;case 1:return ge(t.type)&&ba(),le(t),null;case 3:return r=t.stateNode,Tn(),B(ye),B(ue),vl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(zr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Me!==null&&(Mo(Me),Me=null))),Ao(e,t),le(t),null;case 5:xl(t);var a=Mt(mr.current);if(n=t.type,e!==null&&t.stateNode!=null)md(e,t,n,r,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(b(166));return le(t),null}if(e=Mt(qe.current),zr(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Ve]=t,r[fr]=i,e=(t.mode&1)!==0,n){case"dialog":D("cancel",r),D("close",r);break;case"iframe":case"object":case"embed":D("load",r);break;case"video":case"audio":for(a=0;a<Yn.length;a++)D(Yn[a],r);break;case"source":D("error",r);break;case"img":case"image":case"link":D("error",r),D("load",r);break;case"details":D("toggle",r);break;case"input":Jl(r,i),D("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},D("invalid",r);break;case"textarea":es(r,i),D("invalid",r)}eo(n,i),a=null;for(var o in i)if(i.hasOwnProperty(o)){var s=i[o];o==="children"?typeof s=="string"?r.textContent!==s&&(i.suppressHydrationWarning!==!0&&Ur(r.textContent,s,e),a=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&Ur(r.textContent,s,e),a=["children",""+s]):nr.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&D("scroll",r)}switch(n){case"input":Lr(r),Zl(r,i,!0);break;case"textarea":Lr(r),ts(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Sa)}r=a,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Wu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[Ve]=t,e[fr]=r,hd(e,t,!1,!1),t.stateNode=e;e:{switch(o=to(n,r),n){case"dialog":D("cancel",e),D("close",e),a=r;break;case"iframe":case"object":case"embed":D("load",e),a=r;break;case"video":case"audio":for(a=0;a<Yn.length;a++)D(Yn[a],e);a=r;break;case"source":D("error",e),a=r;break;case"img":case"image":case"link":D("error",e),D("load",e),a=r;break;case"details":D("toggle",e),a=r;break;case"input":Jl(e,r),a=Qi(e,r),D("invalid",e);break;case"option":a=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},a=V({},r,{value:void 0}),D("invalid",e);break;case"textarea":es(e,r),a=Ji(e,r),D("invalid",e);break;default:a=r}eo(n,a),s=a;for(i in s)if(s.hasOwnProperty(i)){var u=s[i];i==="style"?Yu(e,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&$u(e,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&rr(e,u):typeof u=="number"&&rr(e,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(nr.hasOwnProperty(i)?u!=null&&i==="onScroll"&&D("scroll",e):u!=null&&Qo(e,i,u,o))}switch(n){case"input":Lr(e),Zl(e,r,!1);break;case"textarea":Lr(e),ts(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Nt(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?sn(e,!!r.multiple,i,!1):r.defaultValue!=null&&sn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Sa)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return le(t),null;case 6:if(e&&t.stateNode!=null)pd(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(b(166));if(n=Mt(mr.current),Mt(qe.current),zr(t)){if(r=t.stateNode,n=t.memoizedProps,r[Ve]=t,(i=r.nodeValue!==n)&&(e=we,e!==null))switch(e.tag){case 3:Ur(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ur(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Ve]=t,t.stateNode=r}return le(t),null;case 13:if(B(W),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(U&&Te!==null&&t.mode&1&&!(t.flags&128))Lc(),xn(),t.flags|=98560,i=!1;else if(i=zr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(b(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(b(317));i[Ve]=t}else xn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;le(t),i=!1}else Me!==null&&(Mo(Me),Me=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||W.current&1?J===0&&(J=3):Pl())),t.updateQueue!==null&&(t.flags|=4),le(t),null);case 4:return Tn(),Ao(e,t),e===null&&cr(t.stateNode.containerInfo),le(t),null;case 10:return ml(t.type._context),le(t),null;case 17:return ge(t.type)&&ba(),le(t),null;case 19:if(B(W),i=t.memoizedState,i===null)return le(t),null;if(r=(t.flags&128)!==0,o=i.rendering,o===null)if(r)Hn(i,!1);else{if(J!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=ja(e),o!==null){for(t.flags|=128,Hn(i,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,e=o.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return H(W,W.current&1|2),t.child}e=e.sibling}i.tail!==null&&q()>Sn&&(t.flags|=128,r=!0,Hn(i,!1),t.lanes=4194304)}else{if(!r)if(e=ja(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Hn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!U)return le(t),null}else 2*q()-i.renderingStartTime>Sn&&n!==1073741824&&(t.flags|=128,r=!0,Hn(i,!1),t.lanes=4194304);i.isBackwards?(o.sibling=t.child,t.child=o):(n=i.last,n!==null?n.sibling=o:t.child=o,i.last=o)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=q(),t.sibling=null,n=W.current,H(W,r?n&1|2:n&1),t):(le(t),null);case 22:case 23:return jl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?ve&1073741824&&(le(t),t.subtreeFlags&6&&(t.flags|=8192)):le(t),null;case 24:return null;case 25:return null}throw Error(b(156,t.tag))}function hm(e,t){switch(cl(t),t.tag){case 1:return ge(t.type)&&ba(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Tn(),B(ye),B(ue),vl(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return xl(t),null;case 13:if(B(W),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(b(340));xn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return B(W),null;case 4:return Tn(),null;case 10:return ml(t.type._context),null;case 22:case 23:return jl(),null;case 24:return null;default:return null}}var Vr=!1,se=!1,mm=typeof WeakSet=="function"?WeakSet:Set,E=null;function on(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Y(e,t,r)}else n.current=null}function Ro(e,t,n){try{n()}catch(r){Y(e,t,r)}}var $s=!1;function pm(e,t){if(fo=va,e=Tc(),sl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,s=-1,u=-1,c=0,p=0,d=e,y=null;t:for(;;){for(var g;d!==n||a!==0&&d.nodeType!==3||(s=o+a),d!==i||r!==0&&d.nodeType!==3||(u=o+r),d.nodeType===3&&(o+=d.nodeValue.length),(g=d.firstChild)!==null;)y=d,d=g;for(;;){if(d===e)break t;if(y===n&&++c===a&&(s=o),y===i&&++p===r&&(u=o),(g=d.nextSibling)!==null)break;d=y,y=d.parentNode}d=g}n=s===-1||u===-1?null:{start:s,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(ho={focusedElem:e,selectionRange:n},va=!1,E=t;E!==null;)if(t=E,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,E=e;else for(;E!==null;){t=E;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var T=v.memoizedProps,S=v.memoizedState,h=t.stateNode,f=h.getSnapshotBeforeUpdate(t.elementType===t.type?T:_e(t.type,T),S);h.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(b(163))}}catch(w){Y(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,E=e;break}E=t.return}return v=$s,$s=!1,v}function Zn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var a=r=r.next;do{if((a.tag&e)===e){var i=a.destroy;a.destroy=void 0,i!==void 0&&Ro(t,n,i)}a=a.next}while(a!==r)}}function Xa(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function jo(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function yd(e){var t=e.alternate;t!==null&&(e.alternate=null,yd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Ve],delete t[fr],delete t[yo],delete t[Xh],delete t[Jh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function gd(e){return e.tag===5||e.tag===3||e.tag===4}function Vs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||gd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Po(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Sa));else if(r!==4&&(e=e.child,e!==null))for(Po(e,t,n),e=e.sibling;e!==null;)Po(e,t,n),e=e.sibling}function Io(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Io(e,t,n),e=e.sibling;e!==null;)Io(e,t,n),e=e.sibling}var ne=null,Oe=!1;function ut(e,t,n){for(n=n.child;n!==null;)xd(e,t,n),n=n.sibling}function xd(e,t,n){if(Ke&&typeof Ke.onCommitFiberUnmount=="function")try{Ke.onCommitFiberUnmount(Wa,n)}catch{}switch(n.tag){case 5:se||on(n,t);case 6:var r=ne,a=Oe;ne=null,ut(e,t,n),ne=r,Oe=a,ne!==null&&(Oe?(e=ne,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ne.removeChild(n.stateNode));break;case 18:ne!==null&&(Oe?(e=ne,n=n.stateNode,e.nodeType===8?Ci(e.parentNode,n):e.nodeType===1&&Ci(e,n),lr(e)):Ci(ne,n.stateNode));break;case 4:r=ne,a=Oe,ne=n.stateNode.containerInfo,Oe=!0,ut(e,t,n),ne=r,Oe=a;break;case 0:case 11:case 14:case 15:if(!se&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){a=r=r.next;do{var i=a,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Ro(n,t,o),a=a.next}while(a!==r)}ut(e,t,n);break;case 1:if(!se&&(on(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){Y(n,t,s)}ut(e,t,n);break;case 21:ut(e,t,n);break;case 22:n.mode&1?(se=(r=se)||n.memoizedState!==null,ut(e,t,n),se=r):ut(e,t,n);break;default:ut(e,t,n)}}function Ys(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new mm),t.forEach(function(r){var a=Nm.bind(null,e,r);n.has(r)||(n.add(r),r.then(a,a))})}}function Le(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r];try{var i=e,o=t,s=o;e:for(;s!==null;){switch(s.tag){case 5:ne=s.stateNode,Oe=!1;break e;case 3:ne=s.stateNode.containerInfo,Oe=!0;break e;case 4:ne=s.stateNode.containerInfo,Oe=!0;break e}s=s.return}if(ne===null)throw Error(b(160));xd(i,o,a),ne=null,Oe=!1;var u=a.alternate;u!==null&&(u.return=null),a.return=null}catch(c){Y(a,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)vd(t,e),t=t.sibling}function vd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Le(t,e),We(e),r&4){try{Zn(3,e,e.return),Xa(3,e)}catch(T){Y(e,e.return,T)}try{Zn(5,e,e.return)}catch(T){Y(e,e.return,T)}}break;case 1:Le(t,e),We(e),r&512&&n!==null&&on(n,n.return);break;case 5:if(Le(t,e),We(e),r&512&&n!==null&&on(n,n.return),e.flags&32){var a=e.stateNode;try{rr(a,"")}catch(T){Y(e,e.return,T)}}if(r&4&&(a=e.stateNode,a!=null)){var i=e.memoizedProps,o=n!==null?n.memoizedProps:i,s=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{s==="input"&&i.type==="radio"&&i.name!=null&&Uu(a,i),to(s,o);var c=to(s,i);for(o=0;o<u.length;o+=2){var p=u[o],d=u[o+1];p==="style"?Yu(a,d):p==="dangerouslySetInnerHTML"?$u(a,d):p==="children"?rr(a,d):Qo(a,p,d,c)}switch(s){case"input":Gi(a,i);break;case"textarea":zu(a,i);break;case"select":var y=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!i.multiple;var g=i.value;g!=null?sn(a,!!i.multiple,g,!1):y!==!!i.multiple&&(i.defaultValue!=null?sn(a,!!i.multiple,i.defaultValue,!0):sn(a,!!i.multiple,i.multiple?[]:"",!1))}a[fr]=i}catch(T){Y(e,e.return,T)}}break;case 6:if(Le(t,e),We(e),r&4){if(e.stateNode===null)throw Error(b(162));a=e.stateNode,i=e.memoizedProps;try{a.nodeValue=i}catch(T){Y(e,e.return,T)}}break;case 3:if(Le(t,e),We(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{lr(t.containerInfo)}catch(T){Y(e,e.return,T)}break;case 4:Le(t,e),We(e);break;case 13:Le(t,e),We(e),a=e.child,a.flags&8192&&(i=a.memoizedState!==null,a.stateNode.isHidden=i,!i||a.alternate!==null&&a.alternate.memoizedState!==null||(Al=q())),r&4&&Ys(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(se=(c=se)||p,Le(t,e),se=c):Le(t,e),We(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!p&&e.mode&1)for(E=e,p=e.child;p!==null;){for(d=E=p;E!==null;){switch(y=E,g=y.child,y.tag){case 0:case 11:case 14:case 15:Zn(4,y,y.return);break;case 1:on(y,y.return);var v=y.stateNode;if(typeof v.componentWillUnmount=="function"){r=y,n=y.return;try{t=r,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(T){Y(r,n,T)}}break;case 5:on(y,y.return);break;case 22:if(y.memoizedState!==null){qs(d);continue}}g!==null?(g.return=y,E=g):qs(d)}p=p.sibling}e:for(p=null,d=e;;){if(d.tag===5){if(p===null){p=d;try{a=d.stateNode,c?(i=a.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(s=d.stateNode,u=d.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,s.style.display=Vu("display",o))}catch(T){Y(e,e.return,T)}}}else if(d.tag===6){if(p===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(T){Y(e,e.return,T)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===e)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===e)break e;for(;d.sibling===null;){if(d.return===null||d.return===e)break e;p===d&&(p=null),d=d.return}p===d&&(p=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Le(t,e),We(e),r&4&&Ys(e);break;case 21:break;default:Le(t,e),We(e)}}function We(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(gd(n)){var r=n;break e}n=n.return}throw Error(b(160))}switch(r.tag){case 5:var a=r.stateNode;r.flags&32&&(rr(a,""),r.flags&=-33);var i=Vs(e);Io(e,i,a);break;case 3:case 4:var o=r.stateNode.containerInfo,s=Vs(e);Po(e,s,o);break;default:throw Error(b(161))}}catch(u){Y(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ym(e,t,n){E=e,Td(e)}function Td(e,t,n){for(var r=(e.mode&1)!==0;E!==null;){var a=E,i=a.child;if(a.tag===22&&r){var o=a.memoizedState!==null||Vr;if(!o){var s=a.alternate,u=s!==null&&s.memoizedState!==null||se;s=Vr;var c=se;if(Vr=o,(se=u)&&!c)for(E=a;E!==null;)o=E,u=o.child,o.tag===22&&o.memoizedState!==null?Qs(a):u!==null?(u.return=o,E=u):Qs(a);for(;i!==null;)E=i,Td(i),i=i.sibling;E=a,Vr=s,se=c}Ks(e)}else a.subtreeFlags&8772&&i!==null?(i.return=a,E=i):Ks(e)}}function Ks(e){for(;E!==null;){var t=E;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:se||Xa(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!se)if(n===null)r.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:_e(t.type,n.memoizedProps);r.componentDidUpdate(a,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Ps(t,i,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ps(t,o,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var p=c.memoizedState;if(p!==null){var d=p.dehydrated;d!==null&&lr(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(b(163))}se||t.flags&512&&jo(t)}catch(y){Y(t,t.return,y)}}if(t===e){E=null;break}if(n=t.sibling,n!==null){n.return=t.return,E=n;break}E=t.return}}function qs(e){for(;E!==null;){var t=E;if(t===e){E=null;break}var n=t.sibling;if(n!==null){n.return=t.return,E=n;break}E=t.return}}function Qs(e){for(;E!==null;){var t=E;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Xa(4,t)}catch(u){Y(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var a=t.return;try{r.componentDidMount()}catch(u){Y(t,a,u)}}var i=t.return;try{jo(t)}catch(u){Y(t,i,u)}break;case 5:var o=t.return;try{jo(t)}catch(u){Y(t,o,u)}}}catch(u){Y(t,t.return,u)}if(t===e){E=null;break}var s=t.sibling;if(s!==null){s.return=t.return,E=s;break}E=t.return}}var gm=Math.ceil,La=st.ReactCurrentDispatcher,kl=st.ReactCurrentOwner,je=st.ReactCurrentBatchConfig,O=0,te=null,Q=null,re=0,ve=0,ln=Et(0),J=0,xr=null,Wt=0,Ja=0,El=0,er=null,me=null,Al=0,Sn=1/0,Xe=null,_a=!1,Lo=null,wt=null,Yr=!1,pt=null,Oa=0,tr=0,_o=null,oa=-1,la=0;function de(){return O&6?q():oa!==-1?oa:oa=q()}function St(e){return e.mode&1?O&2&&re!==0?re&-re:em.transition!==null?(la===0&&(la=ac()),la):(e=F,e!==0||(e=window.event,e=e===void 0?16:dc(e.type)),e):1}function De(e,t,n,r){if(50<tr)throw tr=0,_o=null,Error(b(185));Sr(e,n,r),(!(O&2)||e!==te)&&(e===te&&(!(O&2)&&(Ja|=n),J===4&&ht(e,re)),xe(e,r),n===1&&O===0&&!(t.mode&1)&&(Sn=q()+500,qa&&At()))}function xe(e,t){var n=e.callbackNode;eh(e,t);var r=xa(e,e===te?re:0);if(r===0)n!==null&&as(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&as(n),t===1)e.tag===0?Zh(Gs.bind(null,e)):jc(Gs.bind(null,e)),Qh(function(){!(O&6)&&At()}),n=null;else{switch(ic(r)){case 1:n=el;break;case 4:n=nc;break;case 16:n=ga;break;case 536870912:n=rc;break;default:n=ga}n=Ad(n,wd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function wd(e,t){if(oa=-1,la=0,O&6)throw Error(b(327));var n=e.callbackNode;if(hn()&&e.callbackNode!==n)return null;var r=xa(e,e===te?re:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Ma(e,r);else{t=r;var a=O;O|=2;var i=bd();(te!==e||re!==t)&&(Xe=null,Sn=q()+500,Ht(e,t));do try{Tm();break}catch(s){Sd(e,s)}while(!0);hl(),La.current=i,O=a,Q!==null?t=0:(te=null,re=0,t=J)}if(t!==0){if(t===2&&(a=oo(e),a!==0&&(r=a,t=Oo(e,a))),t===1)throw n=xr,Ht(e,0),ht(e,r),xe(e,q()),n;if(t===6)ht(e,r);else{if(a=e.current.alternate,!(r&30)&&!xm(a)&&(t=Ma(e,r),t===2&&(i=oo(e),i!==0&&(r=i,t=Oo(e,i))),t===1))throw n=xr,Ht(e,0),ht(e,r),xe(e,q()),n;switch(e.finishedWork=a,e.finishedLanes=r,t){case 0:case 1:throw Error(b(345));case 2:It(e,me,Xe);break;case 3:if(ht(e,r),(r&130023424)===r&&(t=Al+500-q(),10<t)){if(xa(e,0)!==0)break;if(a=e.suspendedLanes,(a&r)!==r){de(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=po(It.bind(null,e,me,Xe),t);break}It(e,me,Xe);break;case 4:if(ht(e,r),(r&4194240)===r)break;for(t=e.eventTimes,a=-1;0<r;){var o=31-He(r);i=1<<o,o=t[o],o>a&&(a=o),r&=~i}if(r=a,r=q()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*gm(r/1960))-r,10<r){e.timeoutHandle=po(It.bind(null,e,me,Xe),r);break}It(e,me,Xe);break;case 5:It(e,me,Xe);break;default:throw Error(b(329))}}}return xe(e,q()),e.callbackNode===n?wd.bind(null,e):null}function Oo(e,t){var n=er;return e.current.memoizedState.isDehydrated&&(Ht(e,t).flags|=256),e=Ma(e,t),e!==2&&(t=me,me=n,t!==null&&Mo(t)),e}function Mo(e){me===null?me=e:me.push.apply(me,e)}function xm(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var a=n[r],i=a.getSnapshot;a=a.value;try{if(!Be(i(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ht(e,t){for(t&=~El,t&=~Ja,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-He(t),r=1<<n;e[n]=-1,t&=~r}}function Gs(e){if(O&6)throw Error(b(327));hn();var t=xa(e,0);if(!(t&1))return xe(e,q()),null;var n=Ma(e,t);if(e.tag!==0&&n===2){var r=oo(e);r!==0&&(t=r,n=Oo(e,r))}if(n===1)throw n=xr,Ht(e,0),ht(e,t),xe(e,q()),n;if(n===6)throw Error(b(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,It(e,me,Xe),xe(e,q()),null}function Rl(e,t){var n=O;O|=1;try{return e(t)}finally{O=n,O===0&&(Sn=q()+500,qa&&At())}}function $t(e){pt!==null&&pt.tag===0&&!(O&6)&&hn();var t=O;O|=1;var n=je.transition,r=F;try{if(je.transition=null,F=1,e)return e()}finally{F=r,je.transition=n,O=t,!(O&6)&&At()}}function jl(){ve=ln.current,B(ln)}function Ht(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,qh(n)),Q!==null)for(n=Q.return;n!==null;){var r=n;switch(cl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ba();break;case 3:Tn(),B(ye),B(ue),vl();break;case 5:xl(r);break;case 4:Tn();break;case 13:B(W);break;case 19:B(W);break;case 10:ml(r.type._context);break;case 22:case 23:jl()}n=n.return}if(te=e,Q=e=bt(e.current,null),re=ve=t,J=0,xr=null,El=Ja=Wt=0,me=er=null,Ot!==null){for(t=0;t<Ot.length;t++)if(n=Ot[t],r=n.interleaved,r!==null){n.interleaved=null;var a=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=a,r.next=o}n.pending=r}Ot=null}return e}function Sd(e,t){do{var n=Q;try{if(hl(),ra.current=Ia,Pa){for(var r=$.memoizedState;r!==null;){var a=r.queue;a!==null&&(a.pending=null),r=r.next}Pa=!1}if(zt=0,ee=G=$=null,Jn=!1,pr=0,kl.current=null,n===null||n.return===null){J=1,xr=t,Q=null;break}e:{var i=e,o=n.return,s=n,u=t;if(t=re,s.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,p=s,d=p.tag;if(!(p.mode&1)&&(d===0||d===11||d===15)){var y=p.alternate;y?(p.updateQueue=y.updateQueue,p.memoizedState=y.memoizedState,p.lanes=y.lanes):(p.updateQueue=null,p.memoizedState=null)}var g=Fs(o);if(g!==null){g.flags&=-257,Hs(g,o,s,i,t),g.mode&1&&Ms(i,c,t),t=g,u=c;var v=t.updateQueue;if(v===null){var T=new Set;T.add(u),t.updateQueue=T}else v.add(u);break e}else{if(!(t&1)){Ms(i,c,t),Pl();break e}u=Error(b(426))}}else if(U&&s.mode&1){var S=Fs(o);if(S!==null){!(S.flags&65536)&&(S.flags|=256),Hs(S,o,s,i,t),dl(wn(u,s));break e}}i=u=wn(u,s),J!==4&&(J=2),er===null?er=[i]:er.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var h=id(i,u,t);js(i,h);break e;case 1:s=u;var f=i.type,m=i.stateNode;if(!(i.flags&128)&&(typeof f.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(wt===null||!wt.has(m)))){i.flags|=65536,t&=-t,i.lanes|=t;var w=od(i,s,t);js(i,w);break e}}i=i.return}while(i!==null)}Cd(n)}catch(N){t=N,Q===n&&n!==null&&(Q=n=n.return);continue}break}while(!0)}function bd(){var e=La.current;return La.current=Ia,e===null?Ia:e}function Pl(){(J===0||J===3||J===2)&&(J=4),te===null||!(Wt&268435455)&&!(Ja&268435455)||ht(te,re)}function Ma(e,t){var n=O;O|=2;var r=bd();(te!==e||re!==t)&&(Xe=null,Ht(e,t));do try{vm();break}catch(a){Sd(e,a)}while(!0);if(hl(),O=n,La.current=r,Q!==null)throw Error(b(261));return te=null,re=0,J}function vm(){for(;Q!==null;)Nd(Q)}function Tm(){for(;Q!==null&&!Vf();)Nd(Q)}function Nd(e){var t=Ed(e.alternate,e,ve);e.memoizedProps=e.pendingProps,t===null?Cd(e):Q=t,kl.current=null}function Cd(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=hm(n,t),n!==null){n.flags&=32767,Q=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{J=6,Q=null;return}}else if(n=fm(n,t,ve),n!==null){Q=n;return}if(t=t.sibling,t!==null){Q=t;return}Q=t=e}while(t!==null);J===0&&(J=5)}function It(e,t,n){var r=F,a=je.transition;try{je.transition=null,F=1,wm(e,t,n,r)}finally{je.transition=a,F=r}return null}function wm(e,t,n,r){do hn();while(pt!==null);if(O&6)throw Error(b(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(b(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(th(e,i),e===te&&(Q=te=null,re=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Yr||(Yr=!0,Ad(ga,function(){return hn(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=je.transition,je.transition=null;var o=F;F=1;var s=O;O|=4,kl.current=null,pm(e,n),vd(n,e),Uh(ho),va=!!fo,ho=fo=null,e.current=n,ym(n),Yf(),O=s,F=o,je.transition=i}else e.current=n;if(Yr&&(Yr=!1,pt=e,Oa=a),i=e.pendingLanes,i===0&&(wt=null),Qf(n.stateNode),xe(e,q()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],r(a.value,{componentStack:a.stack,digest:a.digest});if(_a)throw _a=!1,e=Lo,Lo=null,e;return Oa&1&&e.tag!==0&&hn(),i=e.pendingLanes,i&1?e===_o?tr++:(tr=0,_o=e):tr=0,At(),null}function hn(){if(pt!==null){var e=ic(Oa),t=je.transition,n=F;try{if(je.transition=null,F=16>e?16:e,pt===null)var r=!1;else{if(e=pt,pt=null,Oa=0,O&6)throw Error(b(331));var a=O;for(O|=4,E=e.current;E!==null;){var i=E,o=i.child;if(E.flags&16){var s=i.deletions;if(s!==null){for(var u=0;u<s.length;u++){var c=s[u];for(E=c;E!==null;){var p=E;switch(p.tag){case 0:case 11:case 15:Zn(8,p,i)}var d=p.child;if(d!==null)d.return=p,E=d;else for(;E!==null;){p=E;var y=p.sibling,g=p.return;if(yd(p),p===c){E=null;break}if(y!==null){y.return=g,E=y;break}E=g}}}var v=i.alternate;if(v!==null){var T=v.child;if(T!==null){v.child=null;do{var S=T.sibling;T.sibling=null,T=S}while(T!==null)}}E=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,E=o;else e:for(;E!==null;){if(i=E,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Zn(9,i,i.return)}var h=i.sibling;if(h!==null){h.return=i.return,E=h;break e}E=i.return}}var f=e.current;for(E=f;E!==null;){o=E;var m=o.child;if(o.subtreeFlags&2064&&m!==null)m.return=o,E=m;else e:for(o=f;E!==null;){if(s=E,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Xa(9,s)}}catch(N){Y(s,s.return,N)}if(s===o){E=null;break e}var w=s.sibling;if(w!==null){w.return=s.return,E=w;break e}E=s.return}}if(O=a,At(),Ke&&typeof Ke.onPostCommitFiberRoot=="function")try{Ke.onPostCommitFiberRoot(Wa,e)}catch{}r=!0}return r}finally{F=n,je.transition=t}}return!1}function Xs(e,t,n){t=wn(n,t),t=id(e,t,1),e=Tt(e,t,1),t=de(),e!==null&&(Sr(e,1,t),xe(e,t))}function Y(e,t,n){if(e.tag===3)Xs(e,e,n);else for(;t!==null;){if(t.tag===3){Xs(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(wt===null||!wt.has(r))){e=wn(n,e),e=od(t,e,1),t=Tt(t,e,1),e=de(),t!==null&&(Sr(t,1,e),xe(t,e));break}}t=t.return}}function Sm(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=de(),e.pingedLanes|=e.suspendedLanes&n,te===e&&(re&n)===n&&(J===4||J===3&&(re&130023424)===re&&500>q()-Al?Ht(e,0):El|=n),xe(e,t)}function kd(e,t){t===0&&(e.mode&1?(t=Mr,Mr<<=1,!(Mr&130023424)&&(Mr=4194304)):t=1);var n=de();e=it(e,t),e!==null&&(Sr(e,t,n),xe(e,n))}function bm(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),kd(e,n)}function Nm(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(b(314))}r!==null&&r.delete(t),kd(e,n)}var Ed;Ed=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||ye.current)pe=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return pe=!1,dm(e,t,n);pe=!!(e.flags&131072)}else pe=!1,U&&t.flags&1048576&&Pc(t,ka,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;ia(e,t),e=t.pendingProps;var a=gn(t,ue.current);fn(t,n),a=wl(null,t,r,e,a,n);var i=Sl();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ge(r)?(i=!0,Na(t)):i=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,yl(t),a.updater=Ga,t.stateNode=a,a._reactInternals=t,So(t,r,e,n),t=Co(null,t,r,!0,i,n)):(t.tag=0,U&&i&&ul(t),ce(null,t,a,n),t=t.child),t;case 16:r=t.elementType;e:{switch(ia(e,t),e=t.pendingProps,a=r._init,r=a(r._payload),t.type=r,a=t.tag=km(r),e=_e(r,e),a){case 0:t=No(null,t,r,e,n);break e;case 1:t=Us(null,t,r,e,n);break e;case 11:t=Ds(null,t,r,e,n);break e;case 14:t=Bs(null,t,r,_e(r.type,e),n);break e}throw Error(b(306,r,""))}return t;case 0:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:_e(r,a),No(e,t,r,a,n);case 1:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:_e(r,a),Us(e,t,r,a,n);case 3:e:{if(cd(t),e===null)throw Error(b(387));r=t.pendingProps,i=t.memoizedState,a=i.element,Fc(e,t),Ra(t,r,null,n);var o=t.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){a=wn(Error(b(423)),t),t=zs(e,t,r,n,a);break e}else if(r!==a){a=wn(Error(b(424)),t),t=zs(e,t,r,n,a);break e}else for(Te=vt(t.stateNode.containerInfo.firstChild),we=t,U=!0,Me=null,n=Oc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(xn(),r===a){t=ot(e,t,n);break e}ce(e,t,r,n)}t=t.child}return t;case 5:return Hc(t),e===null&&vo(t),r=t.type,a=t.pendingProps,i=e!==null?e.memoizedProps:null,o=a.children,mo(r,a)?o=null:i!==null&&mo(r,i)&&(t.flags|=32),ud(e,t),ce(e,t,o,n),t.child;case 6:return e===null&&vo(t),null;case 13:return dd(e,t,n);case 4:return gl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=vn(t,null,r,n):ce(e,t,r,n),t.child;case 11:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:_e(r,a),Ds(e,t,r,a,n);case 7:return ce(e,t,t.pendingProps,n),t.child;case 8:return ce(e,t,t.pendingProps.children,n),t.child;case 12:return ce(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,a=t.pendingProps,i=t.memoizedProps,o=a.value,H(Ea,r._currentValue),r._currentValue=o,i!==null)if(Be(i.value,o)){if(i.children===a.children&&!ye.current){t=ot(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var s=i.dependencies;if(s!==null){o=i.child;for(var u=s.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=tt(-1,n&-n),u.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var p=c.pending;p===null?u.next=u:(u.next=p.next,p.next=u),c.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),To(i.return,n,t),s.lanes|=n;break}u=u.next}}else if(i.tag===10)o=i.type===t.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(b(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),To(o,n,t),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===t){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ce(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,r=t.pendingProps.children,fn(t,n),a=Pe(a),r=r(a),t.flags|=1,ce(e,t,r,n),t.child;case 14:return r=t.type,a=_e(r,t.pendingProps),a=_e(r.type,a),Bs(e,t,r,a,n);case 15:return ld(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,a=t.pendingProps,a=t.elementType===r?a:_e(r,a),ia(e,t),t.tag=1,ge(r)?(e=!0,Na(t)):e=!1,fn(t,n),ad(t,r,a),So(t,r,a,n),Co(null,t,r,!0,e,n);case 19:return fd(e,t,n);case 22:return sd(e,t,n)}throw Error(b(156,t.tag))};function Ad(e,t){return tc(e,t)}function Cm(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Re(e,t,n,r){return new Cm(e,t,n,r)}function Il(e){return e=e.prototype,!(!e||!e.isReactComponent)}function km(e){if(typeof e=="function")return Il(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Xo)return 11;if(e===Jo)return 14}return 2}function bt(e,t){var n=e.alternate;return n===null?(n=Re(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function sa(e,t,n,r,a,i){var o=2;if(r=e,typeof e=="function")Il(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Gt:return Dt(n.children,a,i,t);case Go:o=8,a|=8;break;case Vi:return e=Re(12,n,t,a|2),e.elementType=Vi,e.lanes=i,e;case Yi:return e=Re(13,n,t,a),e.elementType=Yi,e.lanes=i,e;case Ki:return e=Re(19,n,t,a),e.elementType=Ki,e.lanes=i,e;case Hu:return Za(n,a,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Mu:o=10;break e;case Fu:o=9;break e;case Xo:o=11;break e;case Jo:o=14;break e;case ct:o=16,r=null;break e}throw Error(b(130,e==null?e:typeof e,""))}return t=Re(o,n,t,a),t.elementType=e,t.type=r,t.lanes=i,t}function Dt(e,t,n,r){return e=Re(7,e,r,t),e.lanes=n,e}function Za(e,t,n,r){return e=Re(22,e,r,t),e.elementType=Hu,e.lanes=n,e.stateNode={isHidden:!1},e}function Li(e,t,n){return e=Re(6,e,null,t),e.lanes=n,e}function _i(e,t,n){return t=Re(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Em(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=mi(0),this.expirationTimes=mi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=mi(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Ll(e,t,n,r,a,i,o,s,u){return e=new Em(e,t,n,s,u),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Re(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},yl(i),e}function Am(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Qt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Rd(e){if(!e)return Ct;e=e._reactInternals;e:{if(Yt(e)!==e||e.tag!==1)throw Error(b(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ge(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(b(171))}if(e.tag===1){var n=e.type;if(ge(n))return Rc(e,n,t)}return t}function jd(e,t,n,r,a,i,o,s,u){return e=Ll(n,r,!0,e,a,i,o,s,u),e.context=Rd(null),n=e.current,r=de(),a=St(n),i=tt(r,a),i.callback=t??null,Tt(n,i,a),e.current.lanes=a,Sr(e,a,r),xe(e,r),e}function ei(e,t,n,r){var a=t.current,i=de(),o=St(a);return n=Rd(n),t.context===null?t.context=n:t.pendingContext=n,t=tt(i,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Tt(a,t,o),e!==null&&(De(e,a,o,i),na(e,a,o)),o}function Fa(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Js(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function _l(e,t){Js(e,t),(e=e.alternate)&&Js(e,t)}function Rm(){return null}var Pd=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ol(e){this._internalRoot=e}ti.prototype.render=Ol.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(b(409));ei(e,t,null,null)};ti.prototype.unmount=Ol.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;$t(function(){ei(null,e,null,null)}),t[at]=null}};function ti(e){this._internalRoot=e}ti.prototype.unstable_scheduleHydration=function(e){if(e){var t=sc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ft.length&&t!==0&&t<ft[n].priority;n++);ft.splice(n,0,e),n===0&&cc(e)}};function Ml(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ni(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Zs(){}function jm(e,t,n,r,a){if(a){if(typeof r=="function"){var i=r;r=function(){var c=Fa(o);i.call(c)}}var o=jd(t,r,e,0,null,!1,!1,"",Zs);return e._reactRootContainer=o,e[at]=o.current,cr(e.nodeType===8?e.parentNode:e),$t(),o}for(;a=e.lastChild;)e.removeChild(a);if(typeof r=="function"){var s=r;r=function(){var c=Fa(u);s.call(c)}}var u=Ll(e,0,!1,null,null,!1,!1,"",Zs);return e._reactRootContainer=u,e[at]=u.current,cr(e.nodeType===8?e.parentNode:e),$t(function(){ei(t,u,n,r)}),u}function ri(e,t,n,r,a){var i=n._reactRootContainer;if(i){var o=i;if(typeof a=="function"){var s=a;a=function(){var u=Fa(o);s.call(u)}}ei(t,o,e,a)}else o=jm(n,t,e,a,r);return Fa(o)}oc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Vn(t.pendingLanes);n!==0&&(tl(t,n|1),xe(t,q()),!(O&6)&&(Sn=q()+500,At()))}break;case 13:$t(function(){var r=it(e,1);if(r!==null){var a=de();De(r,e,1,a)}}),_l(e,1)}};nl=function(e){if(e.tag===13){var t=it(e,134217728);if(t!==null){var n=de();De(t,e,134217728,n)}_l(e,134217728)}};lc=function(e){if(e.tag===13){var t=St(e),n=it(e,t);if(n!==null){var r=de();De(n,e,t,r)}_l(e,t)}};sc=function(){return F};uc=function(e,t){var n=F;try{return F=e,t()}finally{F=n}};ro=function(e,t,n){switch(t){case"input":if(Gi(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=Ka(r);if(!a)throw Error(b(90));Bu(r),Gi(r,a)}}}break;case"textarea":zu(e,n);break;case"select":t=n.value,t!=null&&sn(e,!!n.multiple,t,!1)}};Qu=Rl;Gu=$t;var Pm={usingClientEntryPoint:!1,Events:[Nr,en,Ka,Ku,qu,Rl]},Dn={findFiberByHostInstance:_t,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Im={bundleType:Dn.bundleType,version:Dn.version,rendererPackageName:Dn.rendererPackageName,rendererConfig:Dn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:st.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Zu(e),e===null?null:e.stateNode},findFiberByHostInstance:Dn.findFiberByHostInstance||Rm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Kr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Kr.isDisabled&&Kr.supportsFiber)try{Wa=Kr.inject(Im),Ke=Kr}catch{}}be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Pm;be.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ml(t))throw Error(b(200));return Am(e,t,null,n)};be.createRoot=function(e,t){if(!Ml(e))throw Error(b(299));var n=!1,r="",a=Pd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=Ll(e,1,!1,null,null,n,!1,r,a),e[at]=t.current,cr(e.nodeType===8?e.parentNode:e),new Ol(t)};be.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(b(188)):(e=Object.keys(e).join(","),Error(b(268,e)));return e=Zu(t),e=e===null?null:e.stateNode,e};be.flushSync=function(e){return $t(e)};be.hydrate=function(e,t,n){if(!ni(t))throw Error(b(200));return ri(null,e,t,!0,n)};be.hydrateRoot=function(e,t,n){if(!Ml(e))throw Error(b(405));var r=n!=null&&n.hydratedSources||null,a=!1,i="",o=Pd;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=jd(t,null,e,1,n??null,a,!1,i,o),e[at]=t.current,cr(e),r)for(e=0;e<r.length;e++)n=r[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new ti(t)};be.render=function(e,t,n){if(!ni(t))throw Error(b(200));return ri(null,e,t,!1,n)};be.unmountComponentAtNode=function(e){if(!ni(e))throw Error(b(40));return e._reactRootContainer?($t(function(){ri(null,null,e,!1,function(){e._reactRootContainer=null,e[at]=null})}),!0):!1};be.unstable_batchedUpdates=Rl;be.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!ni(n))throw Error(b(200));if(e==null||e._reactInternals===void 0)throw Error(b(38));return ri(e,t,n,!1,r)};be.version="18.3.1-next-f1338f8080-20240426";function Id(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Id)}catch(e){console.error(e)}}Id(),Iu.exports=be;var Lm=Iu.exports,eu=Lm;ha.createRoot=eu.createRoot,ha.hydrateRoot=eu.hydrateRoot;/**
 * react-router v7.13.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var tu="popstate";function _m(e={}){function t(r,a){let{pathname:i,search:o,hash:s}=r.location;return Fo("",{pathname:i,search:o,hash:s},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(r,a){return typeof a=="string"?a:vr(a)}return Mm(t,n,null,e)}function z(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Ue(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Om(){return Math.random().toString(36).substring(2,10)}function nu(e,t){return{usr:e.state,key:e.key,idx:t}}function Fo(e,t,n=null,r){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?En(t):t,state:n,key:t&&t.key||r||Om()}}function vr({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function En(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function Mm(e,t,n,r={}){let{window:a=document.defaultView,v5Compat:i=!1}=r,o=a.history,s="POP",u=null,c=p();c==null&&(c=0,o.replaceState({...o.state,idx:c},""));function p(){return(o.state||{idx:null}).idx}function d(){s="POP";let S=p(),h=S==null?null:S-c;c=S,u&&u({action:s,location:T.location,delta:h})}function y(S,h){s="PUSH";let f=Fo(T.location,S,h);c=p()+1;let m=nu(f,c),w=T.createHref(f);try{o.pushState(m,"",w)}catch(N){if(N instanceof DOMException&&N.name==="DataCloneError")throw N;a.location.assign(w)}i&&u&&u({action:s,location:T.location,delta:1})}function g(S,h){s="REPLACE";let f=Fo(T.location,S,h);c=p();let m=nu(f,c),w=T.createHref(f);o.replaceState(m,"",w),i&&u&&u({action:s,location:T.location,delta:0})}function v(S){return Fm(S)}let T={get action(){return s},get location(){return e(a,o)},listen(S){if(u)throw new Error("A history only accepts one active listener");return a.addEventListener(tu,d),u=S,()=>{a.removeEventListener(tu,d),u=null}},createHref(S){return t(a,S)},createURL:v,encodeLocation(S){let h=v(S);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:y,replace:g,go(S){return o.go(S)}};return T}function Fm(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),z(n,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:vr(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}function Ld(e,t,n="/"){return Hm(e,t,n,!1)}function Hm(e,t,n,r){let a=typeof t=="string"?En(t):t,i=lt(a.pathname||"/",n);if(i==null)return null;let o=_d(e);Dm(o);let s=null;for(let u=0;s==null&&u<o.length;++u){let c=Gm(i);s=qm(o[u],c,r)}return s}function _d(e,t=[],n=[],r="",a=!1){let i=(o,s,u=a,c)=>{let p={relativePath:c===void 0?o.path||"":c,caseSensitive:o.caseSensitive===!0,childrenIndex:s,route:o};if(p.relativePath.startsWith("/")){if(!p.relativePath.startsWith(r)&&u)return;z(p.relativePath.startsWith(r),`Absolute route path "${p.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),p.relativePath=p.relativePath.slice(r.length)}let d=nt([r,p.relativePath]),y=n.concat(p);o.children&&o.children.length>0&&(z(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),_d(o.children,t,y,d,u)),!(o.path==null&&!o.index)&&t.push({path:d,score:Ym(d,o.index),routesMeta:y})};return e.forEach((o,s)=>{var u;if(o.path===""||!((u=o.path)!=null&&u.includes("?")))i(o,s);else for(let c of Od(o.path))i(o,s,!0,c)}),t}function Od(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return a?[i,""]:[i];let o=Od(r.join("/")),s=[];return s.push(...o.map(u=>u===""?i:[i,u].join("/"))),a&&s.push(...o),s.map(u=>e.startsWith("/")&&u===""?"/":u)}function Dm(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:Km(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var Bm=/^:[\w-]+$/,Um=3,zm=2,Wm=1,$m=10,Vm=-2,ru=e=>e==="*";function Ym(e,t){let n=e.split("/"),r=n.length;return n.some(ru)&&(r+=Vm),t&&(r+=zm),n.filter(a=>!ru(a)).reduce((a,i)=>a+(Bm.test(i)?Um:i===""?Wm:$m),r)}function Km(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function qm(e,t,n=!1){let{routesMeta:r}=e,a={},i="/",o=[];for(let s=0;s<r.length;++s){let u=r[s],c=s===r.length-1,p=i==="/"?t:t.slice(i.length)||"/",d=Ha({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},p),y=u.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=Ha({path:u.relativePath,caseSensitive:u.caseSensitive,end:!1},p)),!d)return null;Object.assign(a,d.params),o.push({params:a,pathname:nt([i,d.pathname]),pathnameBase:ep(nt([i,d.pathnameBase])),route:y}),d.pathnameBase!=="/"&&(i=nt([i,d.pathnameBase]))}return o}function Ha(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Qm(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),s=a.slice(1);return{params:r.reduce((c,{paramName:p,isOptional:d},y)=>{if(p==="*"){let v=s[y]||"";o=i.slice(0,i.length-v.length).replace(/(.)\/+$/,"$1")}const g=s[y];return d&&!g?c[p]=void 0:c[p]=(g||"").replace(/%2F/g,"/"),c},{}),pathname:i,pathnameBase:o,pattern:e}}function Qm(e,t=!1,n=!0){Ue(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,s,u)=>(r.push({paramName:s,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function Gm(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Ue(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function lt(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}var Xm=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Jm(e,t="/"){let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?En(e):e,i;return n?(n=n.replace(/\/\/+/g,"/"),n.startsWith("/")?i=au(n.substring(1),"/"):i=au(n,t)):i=t,{pathname:i,search:tp(r),hash:np(a)}}function au(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function Oi(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Zm(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Fl(e){let t=Zm(e);return t.map((n,r)=>r===t.length-1?n.pathname:n.pathnameBase)}function Hl(e,t,n,r=!1){let a;typeof e=="string"?a=En(e):(a={...e},z(!a.pathname||!a.pathname.includes("?"),Oi("?","pathname","search",a)),z(!a.pathname||!a.pathname.includes("#"),Oi("#","pathname","hash",a)),z(!a.search||!a.search.includes("#"),Oi("#","search","hash",a)));let i=e===""||a.pathname==="",o=i?"/":a.pathname,s;if(o==null)s=n;else{let d=t.length-1;if(!r&&o.startsWith("..")){let y=o.split("/");for(;y[0]==="..";)y.shift(),d-=1;a.pathname=y.join("/")}s=d>=0?t[d]:"/"}let u=Jm(a,s),c=o&&o!=="/"&&o.endsWith("/"),p=(i||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||p)&&(u.pathname+="/"),u}var nt=e=>e.join("/").replace(/\/\/+/g,"/"),ep=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),tp=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,np=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,rp=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||"",this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function ap(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function ip(e){return e.map(t=>t.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var Md=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function Fd(e,t){let n=e;if(typeof n!="string"||!Xm.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,a=!1;if(Md)try{let i=new URL(window.location.href),o=n.startsWith("//")?new URL(i.protocol+n):new URL(n),s=lt(o.pathname,t);o.origin===i.origin&&s!=null?n=s+o.search+o.hash:a=!0}catch{Ue(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:a,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Hd=["POST","PUT","PATCH","DELETE"];new Set(Hd);var op=["GET",...Hd];new Set(op);var An=x.createContext(null);An.displayName="DataRouter";var ai=x.createContext(null);ai.displayName="DataRouterState";var lp=x.createContext(!1),Dd=x.createContext({isTransitioning:!1});Dd.displayName="ViewTransition";var sp=x.createContext(new Map);sp.displayName="Fetchers";var up=x.createContext(null);up.displayName="Await";var Ce=x.createContext(null);Ce.displayName="Navigation";var kr=x.createContext(null);kr.displayName="Location";var ze=x.createContext({outlet:null,matches:[],isDataRoute:!1});ze.displayName="Route";var Dl=x.createContext(null);Dl.displayName="RouteError";var Bd="REACT_ROUTER_ERROR",cp="REDIRECT",dp="ROUTE_ERROR_RESPONSE";function fp(e){if(e.startsWith(`${Bd}:${cp}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function hp(e){if(e.startsWith(`${Bd}:${dp}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new rp(t.status,t.statusText,t.data)}catch{}}function mp(e,{relative:t}={}){z(Rn(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=x.useContext(Ce),{hash:a,pathname:i,search:o}=Er(e,{relative:t}),s=i;return n!=="/"&&(s=i==="/"?n:nt([n,i])),r.createHref({pathname:s,search:o,hash:a})}function Rn(){return x.useContext(kr)!=null}function Qe(){return z(Rn(),"useLocation() may be used only in the context of a <Router> component."),x.useContext(kr).location}var Ud="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function zd(e){x.useContext(Ce).static||x.useLayoutEffect(e)}function Wd(){let{isDataRoute:e}=x.useContext(ze);return e?Ap():pp()}function pp(){z(Rn(),"useNavigate() may be used only in the context of a <Router> component.");let e=x.useContext(An),{basename:t,navigator:n}=x.useContext(Ce),{matches:r}=x.useContext(ze),{pathname:a}=Qe(),i=JSON.stringify(Fl(r)),o=x.useRef(!1);return zd(()=>{o.current=!0}),x.useCallback((u,c={})=>{if(Ue(o.current,Ud),!o.current)return;if(typeof u=="number"){n.go(u);return}let p=Hl(u,JSON.parse(i),a,c.relative==="path");e==null&&t!=="/"&&(p.pathname=p.pathname==="/"?t:nt([t,p.pathname])),(c.replace?n.replace:n.push)(p,c.state,c)},[t,n,i,a,e])}x.createContext(null);function yp(){let{matches:e}=x.useContext(ze),t=e[e.length-1];return t?t.params:{}}function Er(e,{relative:t}={}){let{matches:n}=x.useContext(ze),{pathname:r}=Qe(),a=JSON.stringify(Fl(n));return x.useMemo(()=>Hl(e,JSON.parse(a),r,t==="path"),[e,a,r,t])}function gp(e,t){return $d(e,t)}function $d(e,t,n,r,a){var f;z(Rn(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:i}=x.useContext(Ce),{matches:o}=x.useContext(ze),s=o[o.length-1],u=s?s.params:{},c=s?s.pathname:"/",p=s?s.pathnameBase:"/",d=s&&s.route;{let m=d&&d.path||"";Yd(c,!d||m.endsWith("*")||m.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${m}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${m}"> to <Route path="${m==="/"?"*":`${m}/*`}">.`)}let y=Qe(),g;if(t){let m=typeof t=="string"?En(t):t;z(p==="/"||((f=m.pathname)==null?void 0:f.startsWith(p)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${p}" but pathname "${m.pathname}" was given in the \`location\` prop.`),g=m}else g=y;let v=g.pathname||"/",T=v;if(p!=="/"){let m=p.replace(/^\//,"").split("/");T="/"+v.replace(/^\//,"").split("/").slice(m.length).join("/")}let S=Ld(e,{pathname:T});Ue(d||S!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),Ue(S==null||S[S.length-1].route.element!==void 0||S[S.length-1].route.Component!==void 0||S[S.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=Sp(S&&S.map(m=>Object.assign({},m,{params:Object.assign({},u,m.params),pathname:nt([p,i.encodeLocation?i.encodeLocation(m.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:m.pathname]),pathnameBase:m.pathnameBase==="/"?p:nt([p,i.encodeLocation?i.encodeLocation(m.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:m.pathnameBase])})),o,n,r,a);return t&&h?x.createElement(kr.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},h):h}function xp(){let e=Ep(),t=ap(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",a={padding:"0.5rem",backgroundColor:r},i={padding:"2px 4px",backgroundColor:r},o=null;return console.error("Error handled by React Router default ErrorBoundary:",e),o=x.createElement(x.Fragment,null,x.createElement("p",null,"💿 Hey developer 👋"),x.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",x.createElement("code",{style:i},"ErrorBoundary")," or"," ",x.createElement("code",{style:i},"errorElement")," prop on your route.")),x.createElement(x.Fragment,null,x.createElement("h2",null,"Unexpected Application Error!"),x.createElement("h3",{style:{fontStyle:"italic"}},t),n?x.createElement("pre",{style:a},n):null,o)}var vp=x.createElement(xp,null),Vd=class extends x.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=hp(e.digest);n&&(e=n)}let t=e!==void 0?x.createElement(ze.Provider,{value:this.props.routeContext},x.createElement(Dl.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?x.createElement(Tp,{error:e},t):t}};Vd.contextType=lp;var Mi=new WeakMap;function Tp({children:e,error:t}){let{basename:n}=x.useContext(Ce);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let r=fp(t.digest);if(r){let a=Mi.get(t);if(a)throw a;let i=Fd(r.location,n);if(Md&&!Mi.get(t))if(i.isExternal||r.reloadDocument)window.location.href=i.absoluteURL||i.to;else{const o=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:r.replace}));throw Mi.set(t,o),o}return x.createElement("meta",{httpEquiv:"refresh",content:`0;url=${i.absoluteURL||i.to}`})}}return e}function wp({routeContext:e,match:t,children:n}){let r=x.useContext(An);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),x.createElement(ze.Provider,{value:e},n)}function Sp(e,t=[],n=null,r=null,a=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let i=e,o=n==null?void 0:n.errors;if(o!=null){let p=i.findIndex(d=>d.route.id&&(o==null?void 0:o[d.route.id])!==void 0);z(p>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),i=i.slice(0,Math.min(i.length,p+1))}let s=!1,u=-1;if(n)for(let p=0;p<i.length;p++){let d=i[p];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(u=p),d.route.id){let{loaderData:y,errors:g}=n,v=d.route.loader&&!y.hasOwnProperty(d.route.id)&&(!g||g[d.route.id]===void 0);if(d.route.lazy||v){s=!0,u>=0?i=i.slice(0,u+1):i=[i[0]];break}}}let c=n&&r?(p,d)=>{var y,g;r(p,{location:n.location,params:((g=(y=n.matches)==null?void 0:y[0])==null?void 0:g.params)??{},unstable_pattern:ip(n.matches),errorInfo:d})}:void 0;return i.reduceRight((p,d,y)=>{let g,v=!1,T=null,S=null;n&&(g=o&&d.route.id?o[d.route.id]:void 0,T=d.route.errorElement||vp,s&&(u<0&&y===0?(Yd("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),v=!0,S=null):u===y&&(v=!0,S=d.route.hydrateFallbackElement||null)));let h=t.concat(i.slice(0,y+1)),f=()=>{let m;return g?m=T:v?m=S:d.route.Component?m=x.createElement(d.route.Component,null):d.route.element?m=d.route.element:m=p,x.createElement(wp,{match:d,routeContext:{outlet:p,matches:h,isDataRoute:n!=null},children:m})};return n&&(d.route.ErrorBoundary||d.route.errorElement||y===0)?x.createElement(Vd,{location:n.location,revalidation:n.revalidation,component:T,error:g,children:f(),routeContext:{outlet:null,matches:h,isDataRoute:!0},onError:c}):f()},null)}function Bl(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function bp(e){let t=x.useContext(An);return z(t,Bl(e)),t}function Np(e){let t=x.useContext(ai);return z(t,Bl(e)),t}function Cp(e){let t=x.useContext(ze);return z(t,Bl(e)),t}function Ul(e){let t=Cp(e),n=t.matches[t.matches.length-1];return z(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function kp(){return Ul("useRouteId")}function Ep(){var r;let e=x.useContext(Dl),t=Np("useRouteError"),n=Ul("useRouteError");return e!==void 0?e:(r=t.errors)==null?void 0:r[n]}function Ap(){let{router:e}=bp("useNavigate"),t=Ul("useNavigate"),n=x.useRef(!1);return zd(()=>{n.current=!0}),x.useCallback(async(a,i={})=>{Ue(n.current,Ud),n.current&&(typeof a=="number"?await e.navigate(a):await e.navigate(a,{fromRouteId:t,...i}))},[e,t])}var iu={};function Yd(e,t,n){!t&&!iu[e]&&(iu[e]=!0,Ue(!1,n))}x.memo(Rp);function Rp({routes:e,future:t,state:n,onError:r}){return $d(e,void 0,n,r,t)}function jp({to:e,replace:t,state:n,relative:r}){z(Rn(),"<Navigate> may be used only in the context of a <Router> component.");let{static:a}=x.useContext(Ce);Ue(!a,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:i}=x.useContext(ze),{pathname:o}=Qe(),s=Wd(),u=Hl(e,Fl(i),o,r==="path"),c=JSON.stringify(u);return x.useEffect(()=>{s(JSON.parse(c),{replace:t,state:n,relative:r})},[s,c,r,t,n]),null}function Lt(e){z(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Pp({basename:e="/",children:t=null,location:n,navigationType:r="POP",navigator:a,static:i=!1,unstable_useTransitions:o}){z(!Rn(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let s=e.replace(/^\/*/,"/"),u=x.useMemo(()=>({basename:s,navigator:a,static:i,unstable_useTransitions:o,future:{}}),[s,a,i,o]);typeof n=="string"&&(n=En(n));let{pathname:c="/",search:p="",hash:d="",state:y=null,key:g="default"}=n,v=x.useMemo(()=>{let T=lt(c,s);return T==null?null:{location:{pathname:T,search:p,hash:d,state:y,key:g},navigationType:r}},[s,c,p,d,y,g,r]);return Ue(v!=null,`<Router basename="${s}"> is not able to match the URL "${c}${p}${d}" because it does not start with the basename, so the <Router> won't render anything.`),v==null?null:x.createElement(Ce.Provider,{value:u},x.createElement(kr.Provider,{children:t,value:v}))}function Ip({children:e,location:t}){return gp(Ho(e),t)}function Ho(e,t=[]){let n=[];return x.Children.forEach(e,(r,a)=>{if(!x.isValidElement(r))return;let i=[...t,a];if(r.type===x.Fragment){n.push.apply(n,Ho(r.props.children,i));return}z(r.type===Lt,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),z(!r.props.index||!r.props.children,"An index route cannot have child routes.");let o={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=Ho(r.props.children,i)),n.push(o)}),n}var ua="get",ca="application/x-www-form-urlencoded";function ii(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function Lp(e){return ii(e)&&e.tagName.toLowerCase()==="button"}function _p(e){return ii(e)&&e.tagName.toLowerCase()==="form"}function Op(e){return ii(e)&&e.tagName.toLowerCase()==="input"}function Mp(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Fp(e,t){return e.button===0&&(!t||t==="_self")&&!Mp(e)}var qr=null;function Hp(){if(qr===null)try{new FormData(document.createElement("form"),0),qr=!1}catch{qr=!0}return qr}var Dp=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Fi(e){return e!=null&&!Dp.has(e)?(Ue(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ca}"`),null):e}function Bp(e,t){let n,r,a,i,o;if(_p(e)){let s=e.getAttribute("action");r=s?lt(s,t):null,n=e.getAttribute("method")||ua,a=Fi(e.getAttribute("enctype"))||ca,i=new FormData(e)}else if(Lp(e)||Op(e)&&(e.type==="submit"||e.type==="image")){let s=e.form;if(s==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let u=e.getAttribute("formaction")||s.getAttribute("action");if(r=u?lt(u,t):null,n=e.getAttribute("formmethod")||s.getAttribute("method")||ua,a=Fi(e.getAttribute("formenctype"))||Fi(s.getAttribute("enctype"))||ca,i=new FormData(s,e),!Hp()){let{name:c,type:p,value:d}=e;if(p==="image"){let y=c?`${c}.`:"";i.append(`${y}x`,"0"),i.append(`${y}y`,"0")}else c&&i.append(c,d)}}else{if(ii(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=ua,r=null,a=ca,o=e}return i&&a==="text/plain"&&(o=i,i=void 0),{action:r,method:n.toLowerCase(),encType:a,formData:i,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function zl(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Up(e,t,n,r){let a=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?a.pathname.endsWith("/")?a.pathname=`${a.pathname}_.${r}`:a.pathname=`${a.pathname}.${r}`:a.pathname==="/"?a.pathname=`_root.${r}`:t&&lt(a.pathname,t)==="/"?a.pathname=`${t.replace(/\/$/,"")}/_root.${r}`:a.pathname=`${a.pathname.replace(/\/$/,"")}.${r}`,a}async function zp(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Wp(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function $p(e,t,n){let r=await Promise.all(e.map(async a=>{let i=t.routes[a.route.id];if(i){let o=await zp(i,n);return o.links?o.links():[]}return[]}));return qp(r.flat(1).filter(Wp).filter(a=>a.rel==="stylesheet"||a.rel==="preload").map(a=>a.rel==="stylesheet"?{...a,rel:"prefetch",as:"style"}:{...a,rel:"prefetch"}))}function ou(e,t,n,r,a,i){let o=(u,c)=>n[c]?u.route.id!==n[c].route.id:!0,s=(u,c)=>{var p;return n[c].pathname!==u.pathname||((p=n[c].route.path)==null?void 0:p.endsWith("*"))&&n[c].params["*"]!==u.params["*"]};return i==="assets"?t.filter((u,c)=>o(u,c)||s(u,c)):i==="data"?t.filter((u,c)=>{var d;let p=r.routes[u.route.id];if(!p||!p.hasLoader)return!1;if(o(u,c)||s(u,c))return!0;if(u.route.shouldRevalidate){let y=u.route.shouldRevalidate({currentUrl:new URL(a.pathname+a.search+a.hash,window.origin),currentParams:((d=n[0])==null?void 0:d.params)||{},nextUrl:new URL(e,window.origin),nextParams:u.params,defaultShouldRevalidate:!0});if(typeof y=="boolean")return y}return!0}):[]}function Vp(e,t,{includeHydrateFallback:n}={}){return Yp(e.map(r=>{let a=t.routes[r.route.id];if(!a)return[];let i=[a.module];return a.clientActionModule&&(i=i.concat(a.clientActionModule)),a.clientLoaderModule&&(i=i.concat(a.clientLoaderModule)),n&&a.hydrateFallbackModule&&(i=i.concat(a.hydrateFallbackModule)),a.imports&&(i=i.concat(a.imports)),i}).flat(1))}function Yp(e){return[...new Set(e)]}function Kp(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function qp(e,t){let n=new Set;return new Set(t),e.reduce((r,a)=>{let i=JSON.stringify(Kp(a));return n.has(i)||(n.add(i),r.push({key:i,link:a})),r},[])}function Kd(){let e=x.useContext(An);return zl(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function Qp(){let e=x.useContext(ai);return zl(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var Wl=x.createContext(void 0);Wl.displayName="FrameworkContext";function qd(){let e=x.useContext(Wl);return zl(e,"You must render this element inside a <HydratedRouter> element"),e}function Gp(e,t){let n=x.useContext(Wl),[r,a]=x.useState(!1),[i,o]=x.useState(!1),{onFocus:s,onBlur:u,onMouseEnter:c,onMouseLeave:p,onTouchStart:d}=t,y=x.useRef(null);x.useEffect(()=>{if(e==="render"&&o(!0),e==="viewport"){let T=h=>{h.forEach(f=>{o(f.isIntersecting)})},S=new IntersectionObserver(T,{threshold:.5});return y.current&&S.observe(y.current),()=>{S.disconnect()}}},[e]),x.useEffect(()=>{if(r){let T=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(T)}}},[r]);let g=()=>{a(!0)},v=()=>{a(!1),o(!1)};return n?e!=="intent"?[i,y,{}]:[i,y,{onFocus:Bn(s,g),onBlur:Bn(u,v),onMouseEnter:Bn(c,g),onMouseLeave:Bn(p,v),onTouchStart:Bn(d,g)}]:[!1,y,{}]}function Bn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function Xp({page:e,...t}){let{router:n}=Kd(),r=x.useMemo(()=>Ld(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?x.createElement(Zp,{page:e,matches:r,...t}):null}function Jp(e){let{manifest:t,routeModules:n}=qd(),[r,a]=x.useState([]);return x.useEffect(()=>{let i=!1;return $p(e,t,n).then(o=>{i||a(o)}),()=>{i=!0}},[e,t,n]),r}function Zp({page:e,matches:t,...n}){let r=Qe(),{future:a,manifest:i,routeModules:o}=qd(),{basename:s}=Kd(),{loaderData:u,matches:c}=Qp(),p=x.useMemo(()=>ou(e,t,c,i,r,"data"),[e,t,c,i,r]),d=x.useMemo(()=>ou(e,t,c,i,r,"assets"),[e,t,c,i,r]),y=x.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let T=new Set,S=!1;if(t.forEach(f=>{var w;let m=i.routes[f.route.id];!m||!m.hasLoader||(!p.some(N=>N.route.id===f.route.id)&&f.route.id in u&&((w=o[f.route.id])!=null&&w.shouldRevalidate)||m.hasClientLoader?S=!0:T.add(f.route.id))}),T.size===0)return[];let h=Up(e,s,a.unstable_trailingSlashAwareDataRequests,"data");return S&&T.size>0&&h.searchParams.set("_routes",t.filter(f=>T.has(f.route.id)).map(f=>f.route.id).join(",")),[h.pathname+h.search]},[s,a.unstable_trailingSlashAwareDataRequests,u,r,i,p,t,e,o]),g=x.useMemo(()=>Vp(d,i),[d,i]),v=Jp(d);return x.createElement(x.Fragment,null,y.map(T=>x.createElement("link",{key:T,rel:"prefetch",as:"fetch",href:T,...n})),g.map(T=>x.createElement("link",{key:T,rel:"modulepreload",href:T,...n})),v.map(({key:T,link:S})=>x.createElement("link",{key:T,nonce:n.nonce,...S,crossOrigin:S.crossOrigin??n.crossOrigin})))}function ey(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var ty=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{ty&&(window.__reactRouterVersion="7.13.0")}catch{}function ny({basename:e,children:t,unstable_useTransitions:n,window:r}){let a=x.useRef();a.current==null&&(a.current=_m({window:r,v5Compat:!0}));let i=a.current,[o,s]=x.useState({action:i.action,location:i.location}),u=x.useCallback(c=>{n===!1?s(c):x.startTransition(()=>s(c))},[n]);return x.useLayoutEffect(()=>i.listen(u),[i,u]),x.createElement(Pp,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:i,unstable_useTransitions:n})}var Qd=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,X=x.forwardRef(function({onClick:t,discover:n="render",prefetch:r="none",relative:a,reloadDocument:i,replace:o,state:s,target:u,to:c,preventScrollReset:p,viewTransition:d,unstable_defaultShouldRevalidate:y,...g},v){let{basename:T,unstable_useTransitions:S}=x.useContext(Ce),h=typeof c=="string"&&Qd.test(c),f=Fd(c,T);c=f.to;let m=mp(c,{relative:a}),[w,N,C]=Gp(r,g),k=oy(c,{replace:o,state:s,target:u,preventScrollReset:p,relative:a,viewTransition:d,unstable_defaultShouldRevalidate:y,unstable_useTransitions:S});function R(P){t&&t(P),P.defaultPrevented||k(P)}let M=x.createElement("a",{...g,...C,href:f.absoluteURL||m,onClick:f.isExternal||i?t:R,ref:ey(v,N),target:u,"data-discover":!h&&n==="render"?"true":void 0});return w&&!h?x.createElement(x.Fragment,null,M,x.createElement(Xp,{page:m})):M});X.displayName="Link";var ry=x.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:r="",end:a=!1,style:i,to:o,viewTransition:s,children:u,...c},p){let d=Er(o,{relative:c.relative}),y=Qe(),g=x.useContext(ai),{navigator:v,basename:T}=x.useContext(Ce),S=g!=null&&dy(d)&&s===!0,h=v.encodeLocation?v.encodeLocation(d).pathname:d.pathname,f=y.pathname,m=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;n||(f=f.toLowerCase(),m=m?m.toLowerCase():null,h=h.toLowerCase()),m&&T&&(m=lt(m,T)||m);const w=h!=="/"&&h.endsWith("/")?h.length-1:h.length;let N=f===h||!a&&f.startsWith(h)&&f.charAt(w)==="/",C=m!=null&&(m===h||!a&&m.startsWith(h)&&m.charAt(h.length)==="/"),k={isActive:N,isPending:C,isTransitioning:S},R=N?t:void 0,M;typeof r=="function"?M=r(k):M=[r,N?"active":null,C?"pending":null,S?"transitioning":null].filter(Boolean).join(" ");let P=typeof i=="function"?i(k):i;return x.createElement(X,{...c,"aria-current":R,className:M,ref:p,style:P,to:o,viewTransition:s},typeof u=="function"?u(k):u)});ry.displayName="NavLink";var ay=x.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:r,replace:a,state:i,method:o=ua,action:s,onSubmit:u,relative:c,preventScrollReset:p,viewTransition:d,unstable_defaultShouldRevalidate:y,...g},v)=>{let{unstable_useTransitions:T}=x.useContext(Ce),S=uy(),h=cy(s,{relative:c}),f=o.toLowerCase()==="get"?"get":"post",m=typeof s=="string"&&Qd.test(s),w=N=>{if(u&&u(N),N.defaultPrevented)return;N.preventDefault();let C=N.nativeEvent.submitter,k=(C==null?void 0:C.getAttribute("formmethod"))||o,R=()=>S(C||N.currentTarget,{fetcherKey:t,method:k,navigate:n,replace:a,state:i,relative:c,preventScrollReset:p,viewTransition:d,unstable_defaultShouldRevalidate:y});T&&n!==!1?x.startTransition(()=>R()):R()};return x.createElement("form",{ref:v,method:f,action:h,onSubmit:r?u:w,...g,"data-discover":!m&&e==="render"?"true":void 0})});ay.displayName="Form";function iy(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Gd(e){let t=x.useContext(An);return z(t,iy(e)),t}function oy(e,{target:t,replace:n,state:r,preventScrollReset:a,relative:i,viewTransition:o,unstable_defaultShouldRevalidate:s,unstable_useTransitions:u}={}){let c=Wd(),p=Qe(),d=Er(e,{relative:i});return x.useCallback(y=>{if(Fp(y,t)){y.preventDefault();let g=n!==void 0?n:vr(p)===vr(d),v=()=>c(e,{replace:g,state:r,preventScrollReset:a,relative:i,viewTransition:o,unstable_defaultShouldRevalidate:s});u?x.startTransition(()=>v()):v()}},[p,c,d,n,r,t,e,a,i,o,s,u])}var ly=0,sy=()=>`__${String(++ly)}__`;function uy(){let{router:e}=Gd("useSubmit"),{basename:t}=x.useContext(Ce),n=kp(),r=e.fetch,a=e.navigate;return x.useCallback(async(i,o={})=>{let{action:s,method:u,encType:c,formData:p,body:d}=Bp(i,t);if(o.navigate===!1){let y=o.fetcherKey||sy();await r(y,n,o.action||s,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:p,body:d,formMethod:o.method||u,formEncType:o.encType||c,flushSync:o.flushSync})}else await a(o.action||s,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:p,body:d,formMethod:o.method||u,formEncType:o.encType||c,replace:o.replace,state:o.state,fromRouteId:n,flushSync:o.flushSync,viewTransition:o.viewTransition})},[r,a,t,n])}function cy(e,{relative:t}={}){let{basename:n}=x.useContext(Ce),r=x.useContext(ze);z(r,"useFormAction must be used inside a RouteContext");let[a]=r.matches.slice(-1),i={...Er(e||".",{relative:t})},o=Qe();if(e==null){i.search=o.search;let s=new URLSearchParams(i.search),u=s.getAll("index");if(u.some(p=>p==="")){s.delete("index"),u.filter(d=>d).forEach(d=>s.append("index",d));let p=s.toString();i.search=p?`?${p}`:""}}return(!e||e===".")&&a.route.index&&(i.search=i.search?i.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(i.pathname=i.pathname==="/"?n:nt([n,i.pathname])),vr(i)}function dy(e,{relative:t}={}){let n=x.useContext(Dd);z(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Gd("useViewTransitionState"),a=Er(e,{relative:t});if(!n.isTransitioning)return!1;let i=lt(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=lt(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Ha(a.pathname,o)!=null||Ha(a.pathname,i)!=null}var fy=typeof Element<"u",hy=typeof Map=="function",my=typeof Set=="function",py=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function da(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var n,r,a;if(Array.isArray(e)){if(n=e.length,n!=t.length)return!1;for(r=n;r--!==0;)if(!da(e[r],t[r]))return!1;return!0}var i;if(hy&&e instanceof Map&&t instanceof Map){if(e.size!==t.size)return!1;for(i=e.entries();!(r=i.next()).done;)if(!t.has(r.value[0]))return!1;for(i=e.entries();!(r=i.next()).done;)if(!da(r.value[1],t.get(r.value[0])))return!1;return!0}if(my&&e instanceof Set&&t instanceof Set){if(e.size!==t.size)return!1;for(i=e.entries();!(r=i.next()).done;)if(!t.has(r.value[0]))return!1;return!0}if(py&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(t)){if(n=e.length,n!=t.length)return!1;for(r=n;r--!==0;)if(e[r]!==t[r])return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf&&typeof e.valueOf=="function"&&typeof t.valueOf=="function")return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString&&typeof e.toString=="function"&&typeof t.toString=="function")return e.toString()===t.toString();if(a=Object.keys(e),n=a.length,n!==Object.keys(t).length)return!1;for(r=n;r--!==0;)if(!Object.prototype.hasOwnProperty.call(t,a[r]))return!1;if(fy&&e instanceof Element)return!1;for(r=n;r--!==0;)if(!((a[r]==="_owner"||a[r]==="__v"||a[r]==="__o")&&e.$$typeof)&&!da(e[a[r]],t[a[r]]))return!1;return!0}return e!==e&&t!==t}var yy=function(t,n){try{return da(t,n)}catch(r){if((r.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw r}};const gy=Ua(yy);var xy=function(e,t,n,r,a,i,o,s){if(!e){var u;if(t===void 0)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,r,a,i,o,s],p=0;u=new Error(t.replace(/%s/g,function(){return c[p++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}},vy=xy;const lu=Ua(vy);var Ty=function(t,n,r,a){var i=r?r.call(a,t,n):void 0;if(i!==void 0)return!!i;if(t===n)return!0;if(typeof t!="object"||!t||typeof n!="object"||!n)return!1;var o=Object.keys(t),s=Object.keys(n);if(o.length!==s.length)return!1;for(var u=Object.prototype.hasOwnProperty.bind(n),c=0;c<o.length;c++){var p=o[c];if(!u(p))return!1;var d=t[p],y=n[p];if(i=r?r.call(a,d,y,p):void 0,i===!1||i===void 0&&d!==y)return!1}return!0};const wy=Ua(Ty);var Xd=(e=>(e.BASE="base",e.BODY="body",e.HEAD="head",e.HTML="html",e.LINK="link",e.META="meta",e.NOSCRIPT="noscript",e.SCRIPT="script",e.STYLE="style",e.TITLE="title",e.FRAGMENT="Symbol(react.fragment)",e))(Xd||{}),Hi={link:{rel:["amphtml","canonical","alternate"]},script:{type:["application/ld+json"]},meta:{charset:"",name:["generator","robots","description"],property:["og:type","og:title","og:url","og:image","og:image:alt","og:description","twitter:url","twitter:title","twitter:description","twitter:image","twitter:image:alt","twitter:card","twitter:site"]}},su=Object.values(Xd),$l={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},Sy=Object.entries($l).reduce((e,[t,n])=>(e[n]=t,e),{}),Fe="data-rh",mn={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate",PRIORITIZE_SEO_TAGS:"prioritizeSeoTags"},pn=(e,t)=>{for(let n=e.length-1;n>=0;n-=1){const r=e[n];if(Object.prototype.hasOwnProperty.call(r,t))return r[t]}return null},by=e=>{let t=pn(e,"title");const n=pn(e,mn.TITLE_TEMPLATE);if(Array.isArray(t)&&(t=t.join("")),n&&t)return n.replace(/%s/g,()=>t);const r=pn(e,mn.DEFAULT_TITLE);return t||r||void 0},Ny=e=>pn(e,mn.ON_CHANGE_CLIENT_STATE)||(()=>{}),Di=(e,t)=>t.filter(n=>typeof n[e]<"u").map(n=>n[e]).reduce((n,r)=>({...n,...r}),{}),Cy=(e,t)=>t.filter(n=>typeof n.base<"u").map(n=>n.base).reverse().reduce((n,r)=>{if(!n.length){const a=Object.keys(r);for(let i=0;i<a.length;i+=1){const s=a[i].toLowerCase();if(e.indexOf(s)!==-1&&r[s])return n.concat(r)}}return n},[]),ky=e=>console&&typeof console.warn=="function"&&console.warn(e),Un=(e,t,n)=>{const r={};return n.filter(a=>Array.isArray(a[e])?!0:(typeof a[e]<"u"&&ky(`Helmet: ${e} should be of type "Array". Instead found type "${typeof a[e]}"`),!1)).map(a=>a[e]).reverse().reduce((a,i)=>{const o={};i.filter(u=>{let c;const p=Object.keys(u);for(let y=0;y<p.length;y+=1){const g=p[y],v=g.toLowerCase();t.indexOf(v)!==-1&&!(c==="rel"&&u[c].toLowerCase()==="canonical")&&!(v==="rel"&&u[v].toLowerCase()==="stylesheet")&&(c=v),t.indexOf(g)!==-1&&(g==="innerHTML"||g==="cssText"||g==="itemprop")&&(c=g)}if(!c||!u[c])return!1;const d=u[c].toLowerCase();return r[c]||(r[c]={}),o[c]||(o[c]={}),r[c][d]?!1:(o[c][d]=!0,!0)}).reverse().forEach(u=>a.push(u));const s=Object.keys(o);for(let u=0;u<s.length;u+=1){const c=s[u],p={...r[c],...o[c]};r[c]=p}return a},[]).reverse()},Ey=(e,t)=>{if(Array.isArray(e)&&e.length){for(let n=0;n<e.length;n+=1)if(e[n][t])return!0}return!1},Ay=e=>({baseTag:Cy(["href"],e),bodyAttributes:Di("bodyAttributes",e),defer:pn(e,mn.DEFER),encode:pn(e,mn.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:Di("htmlAttributes",e),linkTags:Un("link",["rel","href"],e),metaTags:Un("meta",["name","charset","http-equiv","property","itemprop"],e),noscriptTags:Un("noscript",["innerHTML"],e),onChangeClientState:Ny(e),scriptTags:Un("script",["src","innerHTML"],e),styleTags:Un("style",["cssText"],e),title:by(e),titleAttributes:Di("titleAttributes",e),prioritizeSeoTags:Ey(e,mn.PRIORITIZE_SEO_TAGS)}),Jd=e=>Array.isArray(e)?e.join(""):e,Ry=(e,t)=>{const n=Object.keys(e);for(let r=0;r<n.length;r+=1)if(t[n[r]]&&t[n[r]].includes(e[n[r]]))return!0;return!1},Bi=(e,t)=>Array.isArray(e)?e.reduce((n,r)=>(Ry(r,t)?n.priority.push(r):n.default.push(r),n),{priority:[],default:[]}):{default:e,priority:[]},uu=(e,t)=>({...e,[t]:void 0}),jy=["noscript","script","style"],Do=(e,t=!0)=>t===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;"),Zd=e=>Object.keys(e).reduce((t,n)=>{const r=typeof e[n]<"u"?`${n}="${e[n]}"`:`${n}`;return t?`${t} ${r}`:r},""),Py=(e,t,n,r)=>{const a=Zd(n),i=Jd(t);return a?`<${e} ${Fe}="true" ${a}>${Do(i,r)}</${e}>`:`<${e} ${Fe}="true">${Do(i,r)}</${e}>`},Iy=(e,t,n=!0)=>t.reduce((r,a)=>{const i=a,o=Object.keys(i).filter(c=>!(c==="innerHTML"||c==="cssText")).reduce((c,p)=>{const d=typeof i[p]>"u"?p:`${p}="${Do(i[p],n)}"`;return c?`${c} ${d}`:d},""),s=i.innerHTML||i.cssText||"",u=jy.indexOf(e)===-1;return`${r}<${e} ${Fe}="true" ${o}${u?"/>":`>${s}</${e}>`}`},""),ef=(e,t={})=>Object.keys(e).reduce((n,r)=>{const a=$l[r];return n[a||r]=e[r],n},t),Ly=(e,t,n)=>{const r={key:t,[Fe]:!0},a=ef(n,r);return[Ye.createElement("title",a,t)]},fa=(e,t)=>t.map((n,r)=>{const a={key:r,[Fe]:!0};return Object.keys(n).forEach(i=>{const s=$l[i]||i;if(s==="innerHTML"||s==="cssText"){const u=n.innerHTML||n.cssText;a.dangerouslySetInnerHTML={__html:u}}else a[s]=n[i]}),Ye.createElement(e,a)}),ke=(e,t,n=!0)=>{switch(e){case"title":return{toComponent:()=>Ly(e,t.title,t.titleAttributes),toString:()=>Py(e,t.title,t.titleAttributes,n)};case"bodyAttributes":case"htmlAttributes":return{toComponent:()=>ef(t),toString:()=>Zd(t)};default:return{toComponent:()=>fa(e,t),toString:()=>Iy(e,t,n)}}},_y=({metaTags:e,linkTags:t,scriptTags:n,encode:r})=>{const a=Bi(e,Hi.meta),i=Bi(t,Hi.link),o=Bi(n,Hi.script);return{priorityMethods:{toComponent:()=>[...fa("meta",a.priority),...fa("link",i.priority),...fa("script",o.priority)],toString:()=>`${ke("meta",a.priority,r)} ${ke("link",i.priority,r)} ${ke("script",o.priority,r)}`},metaTags:a.default,linkTags:i.default,scriptTags:o.default}},Oy=e=>{const{baseTag:t,bodyAttributes:n,encode:r=!0,htmlAttributes:a,noscriptTags:i,styleTags:o,title:s="",titleAttributes:u,prioritizeSeoTags:c}=e;let{linkTags:p,metaTags:d,scriptTags:y}=e,g={toComponent:()=>{},toString:()=>""};return c&&({priorityMethods:g,linkTags:p,metaTags:d,scriptTags:y}=_y(e)),{priority:g,base:ke("base",t,r),bodyAttributes:ke("bodyAttributes",n,r),htmlAttributes:ke("htmlAttributes",a,r),link:ke("link",p,r),meta:ke("meta",d,r),noscript:ke("noscript",i,r),script:ke("script",y,r),style:ke("style",o,r),title:ke("title",{title:s,titleAttributes:u},r)}},Bo=Oy,Qr=[],tf=!!(typeof window<"u"&&window.document&&window.document.createElement),Uo=class{constructor(e,t){Ge(this,"instances",[]);Ge(this,"canUseDOM",tf);Ge(this,"context");Ge(this,"value",{setHelmet:e=>{this.context.helmet=e},helmetInstances:{get:()=>this.canUseDOM?Qr:this.instances,add:e=>{(this.canUseDOM?Qr:this.instances).push(e)},remove:e=>{const t=(this.canUseDOM?Qr:this.instances).indexOf(e);(this.canUseDOM?Qr:this.instances).splice(t,1)}}});this.context=e,this.canUseDOM=t||!1,t||(e.helmet=Bo({baseTag:[],bodyAttributes:{},htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}}))}},My={},nf=Ye.createContext(My),Ft,rf=(Ft=class extends x.Component{constructor(n){super(n);Ge(this,"helmetData");this.helmetData=new Uo(this.props.context||{},Ft.canUseDOM)}render(){return Ye.createElement(nf.Provider,{value:this.helmetData.value},this.props.children)}},Ge(Ft,"canUseDOM",tf),Ft),qt=(e,t)=>{const n=document.head||document.querySelector("head"),r=n.querySelectorAll(`${e}[${Fe}]`),a=[].slice.call(r),i=[];let o;return t&&t.length&&t.forEach(s=>{const u=document.createElement(e);for(const c in s)if(Object.prototype.hasOwnProperty.call(s,c))if(c==="innerHTML")u.innerHTML=s.innerHTML;else if(c==="cssText")u.styleSheet?u.styleSheet.cssText=s.cssText:u.appendChild(document.createTextNode(s.cssText));else{const p=c,d=typeof s[p]>"u"?"":s[p];u.setAttribute(c,d)}u.setAttribute(Fe,"true"),a.some((c,p)=>(o=p,u.isEqualNode(c)))?a.splice(o,1):i.push(u)}),a.forEach(s=>{var u;return(u=s.parentNode)==null?void 0:u.removeChild(s)}),i.forEach(s=>n.appendChild(s)),{oldTags:a,newTags:i}},zo=(e,t)=>{const n=document.getElementsByTagName(e)[0];if(!n)return;const r=n.getAttribute(Fe),a=r?r.split(","):[],i=[...a],o=Object.keys(t);for(const s of o){const u=t[s]||"";n.getAttribute(s)!==u&&n.setAttribute(s,u),a.indexOf(s)===-1&&a.push(s);const c=i.indexOf(s);c!==-1&&i.splice(c,1)}for(let s=i.length-1;s>=0;s-=1)n.removeAttribute(i[s]);a.length===i.length?n.removeAttribute(Fe):n.getAttribute(Fe)!==o.join(",")&&n.setAttribute(Fe,o.join(","))},Fy=(e,t)=>{typeof e<"u"&&document.title!==e&&(document.title=Jd(e)),zo("title",t)},cu=(e,t)=>{const{baseTag:n,bodyAttributes:r,htmlAttributes:a,linkTags:i,metaTags:o,noscriptTags:s,onChangeClientState:u,scriptTags:c,styleTags:p,title:d,titleAttributes:y}=e;zo("body",r),zo("html",a),Fy(d,y);const g={baseTag:qt("base",n),linkTags:qt("link",i),metaTags:qt("meta",o),noscriptTags:qt("noscript",s),scriptTags:qt("script",c),styleTags:qt("style",p)},v={},T={};Object.keys(g).forEach(S=>{const{newTags:h,oldTags:f}=g[S];h.length&&(v[S]=h),f.length&&(T[S]=g[S].oldTags)}),t&&t(),u(e,v,T)},zn=null,Hy=e=>{zn&&cancelAnimationFrame(zn),e.defer?zn=requestAnimationFrame(()=>{cu(e,()=>{zn=null})}):(cu(e),zn=null)},Dy=Hy,du=class extends x.Component{constructor(){super(...arguments);Ge(this,"rendered",!1)}shouldComponentUpdate(t){return!wy(t,this.props)}componentDidUpdate(){this.emitChange()}componentWillUnmount(){const{helmetInstances:t}=this.props.context;t.remove(this),this.emitChange()}emitChange(){const{helmetInstances:t,setHelmet:n}=this.props.context;let r=null;const a=Ay(t.get().map(i=>{const o={...i.props};return delete o.context,o}));rf.canUseDOM?Dy(a):Bo&&(r=Bo(a)),n(r)}init(){if(this.rendered)return;this.rendered=!0;const{helmetInstances:t}=this.props.context;t.add(this),this.emitChange()}render(){return this.init(),null}},Wi,Ar=(Wi=class extends x.Component{shouldComponentUpdate(e){return!gy(uu(this.props,"helmetData"),uu(e,"helmetData"))}mapNestedChildrenToProps(e,t){if(!t)return null;switch(e.type){case"script":case"noscript":return{innerHTML:t};case"style":return{cssText:t};default:throw new Error(`<${e.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`)}}flattenArrayTypeChildren(e,t,n,r){return{...t,[e.type]:[...t[e.type]||[],{...n,...this.mapNestedChildrenToProps(e,r)}]}}mapObjectTypeChildren(e,t,n,r){switch(e.type){case"title":return{...t,[e.type]:r,titleAttributes:{...n}};case"body":return{...t,bodyAttributes:{...n}};case"html":return{...t,htmlAttributes:{...n}};default:return{...t,[e.type]:{...n}}}}mapArrayTypeChildrenToProps(e,t){let n={...t};return Object.keys(e).forEach(r=>{n={...n,[r]:e[r]}}),n}warnOnInvalidChildren(e,t){return lu(su.some(n=>e.type===n),typeof e.type=="function"?"You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.":`Only elements types ${su.join(", ")} are allowed. Helmet does not support rendering <${e.type}> elements. Refer to our API for more information.`),lu(!t||typeof t=="string"||Array.isArray(t)&&!t.some(n=>typeof n!="string"),`Helmet expects a string as a child of <${e.type}>. Did you forget to wrap your children in braces? ( <${e.type}>{\`\`}</${e.type}> ) Refer to our API for more information.`),!0}mapChildrenToProps(e,t){let n={};return Ye.Children.forEach(e,r=>{if(!r||!r.props)return;const{children:a,...i}=r.props,o=Object.keys(i).reduce((u,c)=>(u[Sy[c]||c]=i[c],u),{});let{type:s}=r;switch(typeof s=="symbol"?s=s.toString():this.warnOnInvalidChildren(r,a),s){case"Symbol(react.fragment)":t=this.mapChildrenToProps(a,t);break;case"link":case"meta":case"noscript":case"script":case"style":n=this.flattenArrayTypeChildren(r,n,o,a);break;default:t=this.mapObjectTypeChildren(r,t,o,a);break}}),this.mapArrayTypeChildrenToProps(n,t)}render(){const{children:e,...t}=this.props;let n={...t},{helmetData:r}=t;if(e&&(n=this.mapChildrenToProps(e,n)),r&&!(r instanceof Uo)){const a=r;r=new Uo(a.context,!0),delete n.helmetData}return r?Ye.createElement(du,{...n,context:r.value}):Ye.createElement(nf.Consumer,null,a=>Ye.createElement(du,{...n,context:a}))}},Ge(Wi,"defaultProps",{defer:!0,encodeSpecialCharacters:!0,prioritizeSeoTags:!1}),Wi);const By="modulepreload",Uy=function(e){return"/"+e},fu={},zy=function(t,n,r){let a=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),s=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));a=Promise.allSettled(n.map(u=>{if(u=Uy(u),u in fu)return;fu[u]=!0;const c=u.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":By,c||(d.as="script"),d.crossOrigin="",d.href=u,s&&d.setAttribute("nonce",s),document.head.appendChild(d),c)return new Promise((y,g)=>{d.addEventListener("load",y),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(o){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=o,window.dispatchEvent(s),!s.defaultPrevented)throw o}return a.then(o=>{for(const s of o||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})},Wy=()=>{const[e,t]=x.useState(!1),n=Qe();if(n.pathname==="/annual-tax"||n.pathname==="/monthly-withholding")return null;const a=[{path:"/",label:"Calculator"},{path:"/articles",label:"Articles"},{path:"/faq",label:"FAQ"}],i=o=>o==="/"?n.pathname==="/":n.pathname.startsWith(o);return l.jsx("header",{className:"bg-white shadow-sm sticky top-0 z-50",children:l.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[l.jsxs("div",{className:"flex items-center justify-between h-16",children:[l.jsx(X,{to:"/",className:"flex items-center gap-2",children:l.jsx("span",{className:"text-xl font-bold text-blue-500",children:"Thai Tax Calculator"})}),l.jsx("nav",{className:"hidden md:flex items-center gap-6",children:a.map(o=>l.jsx(X,{to:o.path,className:`font-medium transition-colors ${i(o.path)?"text-blue-500":"text-gray-600 hover:text-blue-500"}`,children:o.label},o.path))}),l.jsx("button",{className:"md:hidden p-2 text-gray-600 hover:text-gray-900",onClick:()=>t(!e),"aria-label":e?"Close menu":"Open menu","aria-expanded":e,children:e?l.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}):l.jsx("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})})]}),e&&l.jsx("nav",{className:"md:hidden py-4 border-t border-gray-100",children:l.jsx("div",{className:"flex flex-col gap-2",children:a.map(o=>l.jsx(X,{to:o.path,onClick:()=>t(!1),className:`py-2 px-4 rounded-lg font-medium transition-colors ${i(o.path)?"bg-blue-50 text-blue-500":"text-gray-600 hover:bg-gray-50"}`,children:o.label},o.path))})})]})})},$y=()=>{const e=Qe();return e.pathname==="/annual-tax"||e.pathname==="/monthly-withholding"?null:l.jsx("footer",{className:"bg-gray-50 border-t border-gray-200",children:l.jsxs("div",{className:"max-w-6xl mx-auto px-4 py-8",children:[l.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-center gap-4",children:[l.jsxs("div",{className:"text-gray-600 text-sm",children:[new Date().getFullYear()," Thai Tax Calculator. For informational purposes only."]}),l.jsxs("nav",{className:"flex gap-6 text-sm",children:[l.jsx(X,{to:"/",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"Calculator"}),l.jsx(X,{to:"/articles",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"Articles"}),l.jsx(X,{to:"/faq",className:"text-gray-600 hover:text-blue-500 transition-colors",children:"FAQ"})]})]}),l.jsx("div",{className:"mt-4 text-center text-xs text-gray-500",children:"This calculator provides estimates only. Consult a qualified tax professional for official advice."})]})})},Vy=({children:e})=>l.jsxs("div",{className:"min-h-screen flex flex-col bg-gray-100",children:[l.jsx(Wy,{}),l.jsx("main",{className:"flex-grow",children:e}),l.jsx($y,{})]}),Yy=[{value:"basic",label:"Basic Estimate",description:"Quick calculation without deductions",icon:"⚡"},{value:"detailed",label:"Detailed Estimate",description:"Include deductions for a more accurate result",icon:"📋"}],Ky=({formData:e,setFormData:t,nextStep:n})=>{const r=a=>{t({...e,estimateType:a}),n()};return l.jsxs("div",{children:[l.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Choose your estimate type"}),l.jsx("p",{className:"text-gray-600 mb-6",children:"You can choose a quick estimate without deductions, or a more detailed estimate where deductions are included."}),l.jsx("div",{className:"space-y-4",children:Yy.map(a=>l.jsx("button",{onClick:()=>r(a.value),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.estimateType===a.value?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.estimateType===a.value,children:l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("span",{className:"text-3xl",children:a.icon}),l.jsxs("div",{children:[l.jsx("h3",{className:"font-semibold text-gray-800",children:a.label}),l.jsx("p",{className:"text-sm text-gray-500",children:a.description})]})]})},a.value))})]})},qy=[{value:"fixed",label:"Fixed Monthly Income",description:"Same salary every month",icon:"📅"},{value:"variable",label:"Variable Monthly Income",description:"Different income each month (bonuses, allowances, etc.)",icon:"📊"}],Qy=({formData:e,setFormData:t,nextStep:n})=>{const r=a=>{t({...e,incomeType:a}),n()};return l.jsxs("div",{children:[l.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"How do you receive your income?"}),l.jsx("p",{className:"text-gray-600 mb-6",children:"Choose based on whether your monthly income is consistent or varies throughout the year."}),l.jsx("div",{className:"space-y-4",children:qy.map(a=>l.jsx("button",{onClick:()=>r(a.value),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.incomeType===a.value?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.incomeType===a.value,children:l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("span",{className:"text-3xl",children:a.icon}),l.jsxs("div",{children:[l.jsx("h3",{className:"font-semibold text-gray-800",children:a.label}),l.jsx("p",{className:"text-sm text-gray-500",children:a.description})]})]})},a.value))})]})},j={STANDARD_DEDUCTION_RATE:.5,MAX_STANDARD_DEDUCTION:1e5,MAX_SOCIAL_SECURITY:10500,PERSONAL_ALLOWANCE:6e4,SPOUSE_ALLOWANCE:6e4,SENIOR_ALLOWANCE:19e4,CHILD_ALLOWANCE_BASE:3e4,CHILD_ALLOWANCE_BONUS:3e4,CHILD_BONUS_BIRTH_YEAR:2018,PARENT_ALLOWANCE:3e4,MAX_PARENTS:4,MAX_LIFE_INSURANCE:1e5,MAX_HEALTH_INSURANCE:25e3,MAX_PENSION_FUND:5e5,MAX_PROVIDENT_FUND:5e5,MAX_RMF:5e5,MAX_SSF:2e5,MAX_DONATION_PERCENT:.1},Sg={STANDARD_DEDUCTION_RATE:.5,MAX_STANDARD_DEDUCTION:1e5,MAX_SOCIAL_SECURITY:9e3,PERSONAL_ALLOWANCE:6e4,SPOUSE_ALLOWANCE:6e4,SENIOR_ALLOWANCE:19e4,CHILD_ALLOWANCE_BASE:3e4,CHILD_ALLOWANCE_BONUS:3e4,PARENT_ALLOWANCE:3e4,MAX_PARENTS:4,MAX_LIFE_INSURANCE:1e5,MAX_HEALTH_INSURANCE:25e3,MAX_PENSION_FUND:5e5,MAX_PROVIDENT_FUND:5e5,MAX_RMF:5e5,MAX_SSF:2e5,MAX_DONATION_PERCENT:.1,CHILD_BONUS_BIRTH_YEAR:2018},Gy=[{upTo:15e4,rate:0,label:"0-150k"},{upTo:3e5,rate:.05,label:"150k-300k"},{upTo:5e5,rate:.1,label:"300k-500k"},{upTo:75e4,rate:.15,label:"500k-750k"},{upTo:1e6,rate:.2,label:"750k-1M"},{upTo:2e6,rate:.25,label:"1M-2M"},{upTo:5e6,rate:.3,label:"2M-5M"},{upTo:1/0,rate:.35,label:"5M+"}],Xy=({formData:e,setFormData:t})=>{const[n,r]=x.useState(e.monthlySalary?e.monthlySalary.toString():""),[a,i]=x.useState(e.annualBonus?e.annualBonus.toString():""),[o,s]=x.useState(e.annualOtherIncome?e.annualOtherIncome.toString():""),[u,c]=x.useState(e.includeSocialSecurity||!1),[p,d]=x.useState(e.socialSecurityContribution?e.socialSecurityContribution.toString():"");x.useEffect(()=>{const h=parseFloat(n.replace(/,/g,""))||0,f=parseFloat(a.replace(/,/g,""))||0,m=parseFloat(o.replace(/,/g,""))||0,w=u?Math.min(parseFloat(p.replace(/,/g,""))||0,j.MAX_SOCIAL_SECURITY):0;t({...e,monthlySalary:h,annualBonus:f,annualOtherIncome:m,includeSocialSecurity:u,socialSecurityContribution:w})},[n,a,o,u,p]);const y=h=>{const f=h.target.value.replace(/[^0-9]/g,"");r(f)},g=h=>{const f=h.target.value.replace(/[^0-9]/g,"");i(f)},v=h=>{const f=h.target.value.replace(/[^0-9]/g,"");s(f)},T=h=>{const f=h.target.value.replace(/[^0-9]/g,"");(parseInt(f)||0)<=j.MAX_SOCIAL_SECURITY&&d(f)},S=h=>{const f=parseInt(h.replace(/,/g,""))||0;return f>0?f.toLocaleString():""};return l.jsxs("div",{children:[l.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-4",children:"Assessable Income"}),l.jsx("p",{className:"text-gray-600 mb-6",children:"Enter your income details below. Include your regular monthly salary, plus any bonus or other income you expect to receive this year."}),l.jsxs("div",{className:"mb-4",children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Salary per month (THB)"}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),l.jsx("input",{type:"text",value:S(n),onChange:y,className:"w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]})]}),l.jsxs("div",{className:"mb-4",children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Bonus per year (THB)"}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),l.jsx("input",{type:"text",value:S(a),onChange:g,className:"w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]}),l.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Expected annual bonus amount"})]}),l.jsxs("div",{className:"mb-6",children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Other income per year (THB)"}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),l.jsx("input",{type:"text",value:S(o),onChange:v,className:"w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]}),l.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Housing allowance, overtime, commissions, etc."})]}),l.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[l.jsxs("label",{className:"flex items-start gap-3 cursor-pointer",children:[l.jsx("input",{type:"checkbox",checked:u,onChange:h=>c(h.target.checked),className:"mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),l.jsxs("div",{children:[l.jsx("span",{className:"font-medium text-gray-800",children:"Include Social Security Contributions"}),l.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Social security contributions are tax-deductible up to ฿10,500 per year (2026 limit)."})]})]}),u&&l.jsxs("div",{className:"mt-4 ml-8",children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Estimated annual contribution (THB)"}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),l.jsx("input",{type:"text",value:S(p),onChange:T,className:"w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",placeholder:"0"})]}),l.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Maximum: ฿",j.MAX_SOCIAL_SECURITY.toLocaleString()," per year"]})]})]})]})},Jy=["January","February","March","April","May","June","July","August","September","October","November","December"],Zy=()=>({salary:0,bonus:0,housingAllowance:0,otherIncome:0}),eg=({formData:e,setFormData:t})=>{var T;const[n,r]=x.useState(((T=e.variableIncome)==null?void 0:T.length)===12?e.variableIncome:Array(12).fill(null).map(()=>Zy())),[a,i]=x.useState(e.includeSocialSecurity||!1),[o,s]=x.useState(e.socialSecurityContribution?e.socialSecurityContribution.toString():""),[u,c]=x.useState(null);x.useEffect(()=>{const S=a?Math.min(parseFloat(o.replace(/,/g,""))||0,j.MAX_SOCIAL_SECURITY):0;t({...e,variableIncome:n,includeSocialSecurity:a,socialSecurityContribution:S})},[n,a,o]);const p=(S,h,f)=>{const m=parseFloat(f.replace(/[^0-9]/g,""))||0,w=[...n];w[S]={...w[S],[h]:m},r(w)},d=S=>{const h=S.target.value.replace(/[^0-9]/g,"");(parseInt(h)||0)<=j.MAX_SOCIAL_SECURITY&&s(h)},y=S=>S.salary+S.bonus+S.housingAllowance+S.otherIncome,g=()=>n.reduce((S,h)=>S+y(h),0),v=S=>S>0?S.toLocaleString():"";return l.jsxs("div",{children:[l.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Enter your monthly income"}),l.jsx("p",{className:"text-gray-600 mb-4",children:"Enter your income for each month. All taxable income including bonuses and housing allowances by the company should be included."}),l.jsx("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6",children:l.jsxs("div",{className:"flex justify-between items-center",children:[l.jsx("span",{className:"text-sm text-blue-700",children:"Total Annual Income"}),l.jsxs("span",{className:"text-xl font-bold text-blue-700",children:["฿",g().toLocaleString()]})]})}),l.jsx("div",{className:"space-y-2 mb-6 max-h-80 overflow-y-auto",children:Jy.map((S,h)=>l.jsxs("div",{className:"border border-gray-200 rounded-lg overflow-hidden",children:[l.jsxs("button",{onClick:()=>c(u===h?null:h),className:"w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100",children:[l.jsx("span",{className:"font-medium text-gray-800",children:S}),l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsxs("span",{className:"text-gray-600",children:["฿",y(n[h]).toLocaleString()]}),l.jsx("span",{className:"text-gray-400",children:u===h?"▲":"▼"})]})]}),u===h&&l.jsxs("div",{className:"p-4 space-y-3 bg-white",children:[l.jsxs("div",{children:[l.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Salary"}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),l.jsx("input",{type:"text",value:v(n[h].salary),onChange:f=>p(h,"salary",f.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]}),l.jsxs("div",{children:[l.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Bonus"}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),l.jsx("input",{type:"text",value:v(n[h].bonus),onChange:f=>p(h,"bonus",f.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]}),l.jsxs("div",{children:[l.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Housing Allowance"}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),l.jsx("input",{type:"text",value:v(n[h].housingAllowance),onChange:f=>p(h,"housingAllowance",f.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]}),l.jsxs("div",{children:[l.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Other Taxable Income"}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm",children:"฿"}),l.jsx("input",{type:"text",value:v(n[h].otherIncome),onChange:f=>p(h,"otherIncome",f.target.value),className:"w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500",placeholder:"0"})]})]})]})]},S))}),l.jsxs("div",{className:"border border-gray-200 rounded-lg p-4",children:[l.jsxs("label",{className:"flex items-start gap-3 cursor-pointer",children:[l.jsx("input",{type:"checkbox",checked:a,onChange:S=>i(S.target.checked),className:"mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),l.jsxs("div",{children:[l.jsx("span",{className:"font-medium text-gray-800",children:"Include Social Security Contributions"}),l.jsx("p",{className:"text-sm text-gray-500 mt-1",children:"Social security contributions are tax-deductible up to ฿10,500 per year (2026 limit)."})]})]}),a&&l.jsxs("div",{className:"mt-4 ml-8",children:[l.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Estimated annual contribution (THB)"}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",children:"฿"}),l.jsx("input",{type:"text",value:o?parseInt(o).toLocaleString():"",onChange:d,className:"w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500",placeholder:"0"})]}),l.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Maximum: ฿",j.MAX_SOCIAL_SECURITY.toLocaleString()," per year"]})]})]})]})},tg=({formData:e,setFormData:t,nextStep:n})=>{const[r,a]=x.useState(e.maritalStatus==="married"),i=s=>{s==="single"?(t({...e,maritalStatus:s,spouseHasNoIncome:!1}),a(!1),n()):(t({...e,maritalStatus:s}),a(!0))},o=s=>{t({...e,spouseHasNoIncome:s})};return l.jsxs("div",{children:[l.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"What is your marital status?"}),l.jsx("p",{className:"text-gray-600 mb-6",children:"Your marital status affects your tax allowances."}),l.jsxs("div",{className:"space-y-4 mb-6",children:[l.jsx("button",{onClick:()=>i("single"),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.maritalStatus==="single"?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.maritalStatus==="single",children:l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("span",{className:"text-3xl",children:"👤"}),l.jsxs("div",{children:[l.jsx("h3",{className:"font-semibold text-gray-800",children:"Single"}),l.jsx("p",{className:"text-sm text-gray-500",children:"Not married or legally separated"})]})]})}),l.jsx("button",{onClick:()=>i("married"),className:`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${e.maritalStatus==="married"?"border-blue-500 bg-blue-50":"border-gray-200"}`,"aria-pressed":e.maritalStatus==="married",children:l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("span",{className:"text-3xl",children:"👫"}),l.jsxs("div",{children:[l.jsx("h3",{className:"font-semibold text-gray-800",children:"Married"}),l.jsx("p",{className:"text-sm text-gray-500",children:"Legally married"})]})]})})]}),r&&l.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-4",children:[l.jsxs("div",{className:"flex items-start gap-3 mb-4",children:[l.jsx("div",{className:"flex-shrink-0 mt-0.5",children:l.jsx("svg",{className:"h-5 w-5 text-blue-500",viewBox:"0 0 20 20",fill:"currentColor",children:l.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})})}),l.jsxs("p",{className:"text-sm text-blue-700",children:["You can claim a ฿",j.SPOUSE_ALLOWANCE.toLocaleString()," spouse allowance only if your spouse has no income during the tax year."]})]}),l.jsxs("label",{className:"flex items-center gap-3 cursor-pointer",children:[l.jsx("input",{type:"checkbox",checked:e.spouseHasNoIncome,onChange:s=>o(s.target.checked),className:"w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),l.jsx("span",{className:"text-gray-800",children:"My spouse has no income"})]})]})]})},Gr=new Date().getFullYear(),ng=({formData:e,setFormData:t,showValidationErrors:n=!1})=>{const[r,a]=x.useState(e.childrenEligibilityConfirmed||e.children.length>0),[i,o]=x.useState(e.parentsEligibilityConfirmed||e.numberOfParents>0),s=h=>Gr-h,u=h=>{const f=s(h);return f>=20&&f<=25},c=(h,f)=>{let m=j.CHILD_ALLOWANCE_BASE;return f>=1&&h.birthYear>=j.CHILD_BONUS_BIRTH_YEAR&&(m+=j.CHILD_ALLOWANCE_BONUS),m},p=()=>e.children.reduce((h,f,m)=>h+c(f,m),0),d=()=>{const h=[...e.children,{birthYear:Gr-10,isStudent:!1}];t({...e,children:h})},y=()=>{if(e.children.length>0){const h=e.children.slice(0,-1);t({...e,children:h})}},g=(h,f)=>{const m=[...e.children];m[h]={...m[h],birthYear:f},u(f)||(m[h].isStudent=!1),t({...e,children:m})},v=(h,f)=>{const m=[...e.children];m[h]={...m[h],isStudent:f},t({...e,children:m})},T=h=>{const f=Math.max(0,Math.min(j.MAX_PARENTS,e.numberOfParents+h));t({...e,numberOfParents:f})},S=j.PERSONAL_ALLOWANCE+(e.maritalStatus==="married"&&e.spouseHasNoIncome?j.SPOUSE_ALLOWANCE:0)+(e.isAge65OrOlder?j.SENIOR_ALLOWANCE:0)+p()+e.numberOfParents*j.PARENT_ALLOWANCE;return l.jsxs("div",{children:[l.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Dependents & Allowances"}),l.jsx("p",{className:"text-gray-600 mb-6",children:"Tell us about your dependents to calculate your allowances."}),l.jsxs("div",{className:"mb-6",children:[l.jsx("h3",{className:"text-lg font-semibold text-gray-800 mb-3",children:"Children"}),l.jsxs("div",{className:"bg-gray-50 rounded-lg p-4",children:[l.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm",children:[l.jsx("p",{className:"font-medium text-blue-800 mb-1",children:"Eligibility Criteria:"}),l.jsxs("ul",{className:"text-blue-700 space-y-1",children:[l.jsx("li",{children:"• Under 20 years old, OR under 25 and studying, OR legally incompetent"}),l.jsx("li",{children:"• Earning less than ฿30,000 per year"})]})]}),l.jsxs("label",{className:`flex items-center gap-3 cursor-pointer p-3 border rounded-lg bg-white ${n&&r&&e.children.length===0?"border-red-500":"border-gray-200"}`,children:[l.jsx("input",{type:"checkbox",checked:r,onChange:h=>{a(h.target.checked),h.target.checked?t({...e,childrenEligibilityConfirmed:!0}):t({...e,children:[],childrenEligibilityConfirmed:!1})},className:"w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),l.jsx("span",{className:"text-gray-800",children:"I have children who meet these criteria"})]}),n&&r&&e.children.length===0&&l.jsx("p",{className:"mt-2 text-sm text-red-600",children:"Please add at least one child or uncheck the box above."}),r&&l.jsxs("div",{className:"mt-4",children:[l.jsxs("div",{className:"flex items-center gap-4 mb-4",children:[l.jsx("span",{className:"text-gray-700",children:"Number of children:"}),l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx("button",{onClick:y,disabled:e.children.length===0,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed","aria-label":"Remove child",children:"-"}),l.jsx("span",{className:"w-8 text-center font-medium",children:e.children.length}),l.jsx("button",{onClick:d,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100","aria-label":"Add child",children:"+"})]})]}),e.children.map((h,f)=>{const m=s(h.birthYear),w=u(h.birthYear),N=c(h,f),C=f>=1&&h.birthYear>=j.CHILD_BONUS_BIRTH_YEAR;return l.jsxs("div",{className:"bg-white border border-gray-200 rounded-lg p-3 mb-3",children:[l.jsxs("div",{className:"flex items-center justify-between mb-2",children:[l.jsxs("span",{className:"font-medium text-gray-700",children:["Child ",f+1]}),l.jsxs("span",{className:"text-sm text-green-600 font-medium",children:["฿",N.toLocaleString(),C&&l.jsx("span",{className:"text-xs text-green-500 ml-1",children:"(+฿30k bonus)"})]})]}),l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("label",{className:"text-sm text-gray-600",children:"Birth year:"}),l.jsx("input",{type:"number",value:h.birthYear,onChange:k=>g(f,parseInt(k.target.value)||Gr),min:1900,max:Gr,className:"w-24 px-2 py-1 border border-gray-300 rounded text-center"}),l.jsxs("span",{className:"text-sm text-gray-500",children:["Age: ",m]})]}),w&&l.jsxs("label",{className:"flex items-center gap-2 mt-2 cursor-pointer",children:[l.jsx("input",{type:"checkbox",checked:h.isStudent||!1,onChange:k=>v(f,k.target.checked),className:"w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),l.jsx("span",{className:"text-sm text-gray-600",children:"Currently studying (required for ages 20-25)"})]})]},f)}),e.children.length>0&&l.jsxs("div",{className:"text-right text-sm text-gray-600",children:["Total children allowance: ",l.jsxs("span",{className:"font-medium text-green-600",children:["฿",p().toLocaleString()]})]})]})]})]}),l.jsxs("div",{className:"mb-6",children:[l.jsx("h3",{className:"text-lg font-semibold text-gray-800 mb-3",children:"Parents"}),l.jsxs("div",{className:"bg-gray-50 rounded-lg p-4",children:[l.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm",children:[l.jsx("p",{className:"font-medium text-blue-800 mb-1",children:"Eligibility Criteria:"}),l.jsxs("ul",{className:"text-blue-700 space-y-1",children:[l.jsx("li",{children:"• Parent is 60 years or older"}),l.jsx("li",{children:"• Parent's annual income is less than ฿30,000"}),l.jsxs("li",{children:["• You can claim up to ",j.MAX_PARENTS," parents (yours and spouse's)"]})]}),l.jsxs("p",{className:"text-blue-600 mt-2",children:["Allowance: ฿",j.PARENT_ALLOWANCE.toLocaleString()," per eligible parent"]})]}),l.jsxs("label",{className:`flex items-center gap-3 cursor-pointer p-3 border rounded-lg bg-white ${n&&i&&e.numberOfParents===0?"border-red-500":"border-gray-200"}`,children:[l.jsx("input",{type:"checkbox",checked:i,onChange:h=>{o(h.target.checked),h.target.checked?t({...e,parentsEligibilityConfirmed:!0}):t({...e,numberOfParents:0,parentsEligibilityConfirmed:!1})},className:"w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"}),l.jsx("span",{className:"text-gray-800",children:"I have parents who meet these criteria"})]}),n&&i&&e.numberOfParents===0&&l.jsx("p",{className:"mt-2 text-sm text-red-600",children:"Please add at least one parent or uncheck the box above."}),i&&l.jsx("div",{className:"mt-4",children:l.jsxs("div",{className:"flex items-center gap-4",children:[l.jsx("span",{className:"text-gray-700",children:"Number of parents:"}),l.jsxs("div",{className:"flex items-center gap-2",children:[l.jsx("button",{onClick:()=>T(-1),disabled:e.numberOfParents===0,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed","aria-label":"Remove parent",children:"-"}),l.jsx("span",{className:"w-8 text-center font-medium",children:e.numberOfParents}),l.jsx("button",{onClick:()=>T(1),disabled:e.numberOfParents>=j.MAX_PARENTS,className:"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed","aria-label":"Add parent",children:"+"})]}),l.jsxs("span",{className:"text-sm text-green-600 font-medium",children:["฿",(e.numberOfParents*j.PARENT_ALLOWANCE).toLocaleString()]})]})})]})]}),l.jsxs("div",{className:"bg-green-50 border border-green-200 rounded-lg p-4",children:[l.jsx("h3",{className:"font-semibold text-green-800 mb-2",children:"Total Allowances"}),l.jsxs("div",{className:"text-sm text-green-700 space-y-1",children:[l.jsxs("div",{className:"flex justify-between",children:[l.jsx("span",{children:"Personal:"}),l.jsxs("span",{children:["฿",j.PERSONAL_ALLOWANCE.toLocaleString()]})]}),e.maritalStatus==="married"&&e.spouseHasNoIncome&&l.jsxs("div",{className:"flex justify-between",children:[l.jsx("span",{children:"Spouse:"}),l.jsxs("span",{children:["฿",j.SPOUSE_ALLOWANCE.toLocaleString()]})]}),e.isAge65OrOlder&&l.jsxs("div",{className:"flex justify-between",children:[l.jsx("span",{children:"Senior (65+):"}),l.jsxs("span",{children:["฿",j.SENIOR_ALLOWANCE.toLocaleString()]})]}),e.children.length>0&&l.jsxs("div",{className:"flex justify-between",children:[l.jsx("span",{children:"Children:"}),l.jsxs("span",{children:["฿",p().toLocaleString()]})]}),e.numberOfParents>0&&l.jsxs("div",{className:"flex justify-between",children:[l.jsx("span",{children:"Parents:"}),l.jsxs("span",{children:["฿",(e.numberOfParents*j.PARENT_ALLOWANCE).toLocaleString()]})]}),l.jsxs("div",{className:"flex justify-between font-semibold border-t border-green-300 pt-1 mt-2",children:[l.jsx("span",{children:"Total:"}),l.jsxs("span",{children:["฿",S.toLocaleString()]})]})]})]})]})},rg=({formData:e,setFormData:t,showValidationErrors:n=!1})=>{const a=(()=>{var d;return e.incomeType==="variable"&&((d=e.variableIncome)==null?void 0:d.length)===12?e.variableIncome.reduce((y,g)=>y+g.salary+g.bonus+g.housingAllowance+g.otherIncome,0):e.monthlySalary*12})(),i=x.useMemo(()=>[{key:"lifeInsurance",hasKey:"hasLifeInsurance",label:"Life Insurance",description:"Life insurance premiums paid during the year",maxValue:j.MAX_LIFE_INSURANCE},{key:"healthInsurance",hasKey:"hasHealthInsurance",label:"Health Insurance",description:"Health insurance premiums paid during the year",maxValue:j.MAX_HEALTH_INSURANCE},{key:"pensionFund",hasKey:"hasPensionFund",label:"Pension Fund",description:"Government pension fund contributions",maxValue:j.MAX_PENSION_FUND},{key:"providentFund",hasKey:"hasProvidentFund",label:"Provident Fund",description:"Private provident fund contributions",maxValue:j.MAX_PROVIDENT_FUND},{key:"rmf",hasKey:"hasRMF",label:"RMF (Retirement Mutual Fund)",description:"RMF investments for retirement",maxValue:j.MAX_RMF},{key:"ssf",hasKey:"hasSSF",label:"SSF (Super Savings Fund)",description:"SSF long-term investments",maxValue:j.MAX_SSF},{key:"donations",hasKey:"hasDonations",label:"Charitable Donations",description:"Donations to approved charities (limited to 10% of income)",maxValue:Math.floor(a*j.MAX_DONATION_PERCENT)}],[a]),[o,s]=x.useState({hasLifeInsurance:e.hasLifeInsurance||!1,lifeInsurance:e.lifeInsurance||0,hasHealthInsurance:e.hasHealthInsurance||!1,healthInsurance:e.healthInsurance||0,hasPensionFund:e.hasPensionFund||!1,pensionFund:e.pensionFund||0,hasProvidentFund:e.hasProvidentFund||!1,providentFund:e.providentFund||0,hasRMF:e.hasRMF||!1,rmf:e.rmf||0,hasSSF:e.hasSSF||!1,ssf:e.ssf||0,hasDonations:e.hasDonations||!1,donations:e.donations||0});x.useEffect(()=>{t({...e,...o})},[o]);const u=(d,y)=>{s({...o,[d]:y})},c=(d,y,g)=>{const v=Math.min(parseFloat(y.replace(/[^0-9]/g,""))||0,g);s({...o,[d]:v})},p=d=>d>0?d.toLocaleString():"";return l.jsxs("div",{children:[l.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:"Tax Deductions"}),l.jsx("p",{className:"text-gray-600 mb-6",children:"Select any deductions you qualify for. These will reduce your taxable income."}),l.jsxs("div",{className:"bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4",children:[l.jsxs("div",{className:"flex items-start gap-3 mb-3",children:[l.jsx("div",{className:"flex-shrink-0 mt-0.5",children:l.jsx("svg",{className:"h-5 w-5 text-amber-500",viewBox:"0 0 20 20",fill:"currentColor",children:l.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",clipRule:"evenodd"})})}),l.jsxs("p",{className:"text-sm text-amber-700",children:["Taxpayers aged 65 or older are entitled to an additional ฿",j.SENIOR_ALLOWANCE.toLocaleString()," allowance."]})]}),l.jsxs("label",{className:"flex items-center gap-3 cursor-pointer",children:[l.jsx("input",{type:"checkbox",checked:e.isAge65OrOlder,onChange:d=>t({...e,isAge65OrOlder:d.target.checked}),className:"w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"}),l.jsx("span",{className:"text-gray-800",children:"I am 65 years or older"})]})]}),l.jsx("div",{className:"space-y-4 mb-6",children:i.map(d=>{const y=o[d.hasKey],g=o[d.key],v=n&&y&&g===0;return l.jsxs("div",{className:`border rounded-lg p-4 ${v?"border-red-500":"border-gray-200"}`,children:[l.jsxs("label",{className:"flex items-start gap-3 cursor-pointer",children:[l.jsx("input",{type:"checkbox",checked:y,onChange:T=>u(d.hasKey,T.target.checked),className:"mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"}),l.jsxs("div",{className:"flex-1",children:[l.jsx("span",{className:"font-medium text-gray-800",children:d.label}),l.jsx("p",{className:"text-sm text-gray-500",children:d.description})]})]}),y&&l.jsxs("div",{className:"mt-3 ml-8",children:[l.jsx("label",{className:"block text-sm text-gray-600 mb-1",children:"Amount (THB)"}),l.jsxs("div",{className:"relative",children:[l.jsx("span",{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",children:"฿"}),l.jsx("input",{type:"text",value:p(g),onChange:T=>c(d.key,T.target.value,d.maxValue),className:`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 ${v?"border-red-500 focus:ring-red-200":"border-gray-300 focus:ring-blue-500"}`,placeholder:"0"})]}),v?l.jsx("p",{className:"text-sm text-red-600 mt-1",children:"Please enter an amount or uncheck this deduction."}):l.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Maximum: ฿",d.maxValue.toLocaleString()," per year"]})]})]},d.key)})})]})};function ag(e){if(e<=0)return 0;let t=0,n=e,r=0;for(const a of Gy){if(n<=0)break;const i=a.upTo-r,o=Math.min(n,i);t+=o*a.rate,n-=o,r=a.upTo}return t}const hu=e=>e.reduce((t,n,r)=>{let a=j.CHILD_ALLOWANCE_BASE;return r>=1&&n.birthYear>=j.CHILD_BONUS_BIRTH_YEAR&&(a+=j.CHILD_ALLOWANCE_BONUS),t+a},0),ig=({formData:e,setFormData:t,onStartOver:n})=>{const[r,a]=x.useState(!1),[i,o]=x.useState(null),s=()=>{var d;return e.incomeType==="variable"&&((d=e.variableIncome)==null?void 0:d.length)===12?e.variableIncome.reduce((y,g)=>y+g.salary+g.bonus+g.housingAllowance+g.otherIncome,0):e.monthlySalary*12+(e.annualBonus||0)+(e.annualOtherIncome||0)},u=x.useMemo(()=>{const d=s(),y=Math.min(d*j.STANDARD_DEDUCTION_RATE,j.MAX_STANDARD_DEDUCTION),g=j.PERSONAL_ALLOWANCE;let v=y+g;if(e.includeSocialSecurity&&e.socialSecurityContribution>0&&(v+=Math.min(e.socialSecurityContribution,j.MAX_SOCIAL_SECURITY)),e.estimateType==="detailed"){e.maritalStatus==="married"&&e.spouseHasNoIncome&&(v+=j.SPOUSE_ALLOWANCE);const f=hu(e.children||[]);v+=f;const m=(e.numberOfParents||0)*j.PARENT_ALLOWANCE;if(v+=m,e.hasLifeInsurance&&(v+=Math.min(e.lifeInsurance||0,j.MAX_LIFE_INSURANCE)),e.hasHealthInsurance&&(v+=Math.min(e.healthInsurance||0,j.MAX_HEALTH_INSURANCE)),e.hasPensionFund&&(v+=Math.min(e.pensionFund||0,j.MAX_PENSION_FUND)),e.hasProvidentFund&&(v+=Math.min(e.providentFund||0,j.MAX_PROVIDENT_FUND)),e.hasRMF&&(v+=Math.min(e.rmf||0,j.MAX_RMF)),e.hasSSF&&(v+=Math.min(e.ssf||0,j.MAX_SSF)),e.hasDonations){const w=Math.floor(d*j.MAX_DONATION_PERCENT);v+=Math.min(e.donations||0,w)}}const T=Math.max(0,d-v),S=ag(T),h=S/12;return{annualIncome:d,standardDeduction:y,personalAllowance:g,socialSecurity:e.includeSocialSecurity?Math.min(e.socialSecurityContribution||0,j.MAX_SOCIAL_SECURITY):0,totalDeductions:v,taxableIncome:T,annualTax:S,monthlyWithholding:h,effectiveRate:d>0?S/d*100:0}},[e]),c=x.useMemo(()=>{const d=[];if(e.incomeType==="fixed"&&(d.push({key:"monthlySalary",label:"Monthly Salary",value:e.monthlySalary,editable:!0}),d.push({key:"annualBonus",label:"Annual Bonus",value:e.annualBonus||0,editable:!0}),d.push({key:"annualOtherIncome",label:"Other Annual Income",value:e.annualOtherIncome||0,editable:!0})),d.push({key:"standardDeduction",label:"Expense Deduction (50%)",value:u.standardDeduction,editable:!1}),d.push({key:"personalAllowance",label:"Personal Allowance",value:j.PERSONAL_ALLOWANCE,editable:!1}),e.includeSocialSecurity&&d.push({key:"socialSecurityContribution",label:"Social Security",value:e.socialSecurityContribution,editable:!0,maxValue:j.MAX_SOCIAL_SECURITY}),e.estimateType==="detailed"){if(e.maritalStatus==="married"&&e.spouseHasNoIncome&&d.push({key:"spouseAllowance",label:"Spouse Allowance",value:j.SPOUSE_ALLOWANCE,editable:!1}),e.children&&e.children.length>0){const y=hu(e.children);d.push({key:"childAllowance",label:`Child Allowance (${e.children.length})`,value:y,editable:!1})}if(e.numberOfParents>0&&d.push({key:"parentAllowance",label:`Parent Allowance (${e.numberOfParents})`,value:e.numberOfParents*j.PARENT_ALLOWANCE,editable:!1}),e.hasLifeInsurance&&d.push({key:"lifeInsurance",label:"Life Insurance",value:e.lifeInsurance,editable:!0,maxValue:j.MAX_LIFE_INSURANCE}),e.hasHealthInsurance&&d.push({key:"healthInsurance",label:"Health Insurance",value:e.healthInsurance,editable:!0,maxValue:j.MAX_HEALTH_INSURANCE}),e.hasPensionFund&&d.push({key:"pensionFund",label:"Pension Fund",value:e.pensionFund,editable:!0,maxValue:j.MAX_PENSION_FUND}),e.hasProvidentFund&&d.push({key:"providentFund",label:"Provident Fund",value:e.providentFund,editable:!0,maxValue:j.MAX_PROVIDENT_FUND}),e.hasRMF&&d.push({key:"rmf",label:"RMF",value:e.rmf,editable:!0,maxValue:j.MAX_RMF}),e.hasSSF&&d.push({key:"ssf",label:"SSF",value:e.ssf,editable:!0,maxValue:j.MAX_SSF}),e.hasDonations){const y=s(),g=Math.floor(y*j.MAX_DONATION_PERCENT);d.push({key:"donations",label:"Donations",value:e.donations,editable:!0,maxValue:g})}}return d},[e,u.standardDeduction]),p=(d,y,g)=>{const v=parseFloat(y.replace(/[^0-9]/g,""))||0,T=g?Math.min(v,g):v;t({...e,[d]:T})};return l.jsxs("div",{children:[l.jsx("h2",{className:"text-xl font-bold text-gray-800 mb-4 text-center",children:"Estimated Monthly Withholding"}),l.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-center",children:[l.jsx("p",{className:"text-sm text-gray-500 mb-1",children:"Monthly Tax Withholding"}),l.jsxs("p",{className:"text-4xl font-bold text-blue-600",children:["฿",u.monthlyWithholding.toLocaleString("en-US",{maximumFractionDigits:0})]}),l.jsxs("p",{className:"text-sm text-gray-500 mt-2",children:["Effective Rate: ",u.effectiveRate.toFixed(2),"%"]})]}),l.jsxs("div",{className:"bg-gray-50 rounded-lg p-4 mb-6 space-y-2",children:[l.jsxs("div",{className:"flex justify-between text-sm",children:[l.jsx("span",{className:"text-gray-600",children:"Annual Income"}),l.jsxs("span",{className:"font-medium",children:["฿",u.annualIncome.toLocaleString()]})]}),l.jsxs("div",{className:"flex justify-between text-sm",children:[l.jsx("span",{className:"text-gray-600",children:"Total Deductions"}),l.jsxs("span",{className:"font-medium",children:["-฿",u.totalDeductions.toLocaleString()]})]}),l.jsxs("div",{className:"flex justify-between text-sm",children:[l.jsx("span",{className:"text-gray-600",children:"Taxable Income"}),l.jsxs("span",{className:"font-medium",children:["฿",u.taxableIncome.toLocaleString()]})]}),l.jsxs("div",{className:"flex justify-between text-sm border-t border-gray-200 pt-2",children:[l.jsx("span",{className:"text-gray-600",children:"Annual Tax"}),l.jsxs("span",{className:"font-medium",children:["฿",u.annualTax.toLocaleString("en-US",{maximumFractionDigits:0})]})]})]}),l.jsxs("button",{onClick:()=>a(!r),className:"w-full py-2 text-blue-600 font-medium flex items-center justify-center gap-2 hover:bg-blue-50 rounded-lg mb-4",children:[r?"Hide Details":"Show All Values & Edit",l.jsx("span",{children:r?"▲":"▼"})]}),r&&l.jsxs("div",{className:"border border-gray-200 rounded-lg p-4 mb-6",children:[l.jsx("p",{className:"text-sm text-gray-500 mb-4",children:"Edit values below to see how changes affect your tax estimate. Changes update instantly."}),l.jsx("div",{className:"space-y-3",children:c.map(d=>l.jsxs("div",{className:"flex items-center justify-between",children:[l.jsx("span",{className:"text-sm text-gray-700",children:d.label}),d.editable?l.jsxs("div",{className:"relative",children:[i===d.key?l.jsx("input",{type:"text",value:d.value.toLocaleString(),onChange:y=>p(d.key,y.target.value,d.maxValue),onBlur:()=>o(null),autoFocus:!0,className:"w-32 px-2 py-1 text-right border border-blue-500 rounded text-sm focus:ring-2 focus:ring-blue-500"}):l.jsxs("button",{onClick:()=>o(d.key),className:"w-32 px-2 py-1 text-right text-blue-600 hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 text-sm",children:["฿",d.value.toLocaleString(),l.jsx("span",{className:"ml-1 text-xs",children:"✎"})]}),d.maxValue&&l.jsxs("p",{className:"text-xs text-gray-400 text-right",children:["Max: ฿",d.maxValue.toLocaleString()]})]}):l.jsxs("span",{className:"text-sm text-gray-500 w-32 text-right",children:["฿",d.value.toLocaleString(),l.jsx("span",{className:"ml-1 text-xs text-gray-400",children:"(fixed)"})]})]},d.key))})]}),l.jsx("button",{onClick:n,className:"w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300",children:"Start Over"})]})},og=()=>({salary:0,bonus:0,housingAllowance:0,otherIncome:0});function mu(){return{estimateType:"",incomeType:"",monthlySalary:0,annualBonus:0,annualOtherIncome:0,variableIncome:Array(12).fill(null).map(()=>og()),includeSocialSecurity:!1,socialSecurityContribution:0,maritalStatus:"",spouseHasNoIncome:!1,isAge65OrOlder:!1,children:[],childrenEligibilityConfirmed:!1,numberOfParents:0,parentsEligibilityConfirmed:!1,hasLifeInsurance:!1,lifeInsurance:0,hasHealthInsurance:!1,healthInsurance:0,hasPensionFund:!1,pensionFund:0,hasProvidentFund:!1,providentFund:0,hasRMF:!1,rmf:0,hasSSF:!1,ssf:0,hasDonations:!1,donations:0}}const lg=()=>{var h,f;const[e,t]=x.useState(0),[n,r]=x.useState(mu),[a,i]=x.useState(!1),o=()=>{t(e+1)},s=()=>{c()?(i(!1),t(e+1)):i(!0)},u=()=>{e>0&&(i(!1),t(e-1))},c=()=>{var w,N;switch((w=y[e])==null?void 0:w.id){case"estimate-type":return n.estimateType!=="";case"income-type":return n.incomeType!=="";case"monthly-income":return n.monthlySalary>0;case"variable-income":return((N=n.variableIncome)==null?void 0:N.length)===12?n.variableIncome.reduce((P,ie)=>P+ie.salary+ie.bonus+ie.housingAllowance+ie.otherIncome,0)>0:!1;case"marital-status":return n.maritalStatus!=="";case"dependents":const C=!n.childrenEligibilityConfirmed||n.children.length>0,k=!n.parentsEligibilityConfirmed||n.numberOfParents>0;return C&&k;case"deductions":return[{has:n.hasLifeInsurance,amount:n.lifeInsurance},{has:n.hasHealthInsurance,amount:n.healthInsurance},{has:n.hasPensionFund,amount:n.pensionFund},{has:n.hasProvidentFund,amount:n.providentFund},{has:n.hasRMF,amount:n.rmf},{has:n.hasSSF,amount:n.ssf},{has:n.hasDonations,amount:n.donations}].every(M=>!M.has||M.amount>0);default:return!0}},p=()=>{r(mu()),t(0)},d=m=>{m>=0&&m<y.length&&t(m)},y=x.useMemo(()=>{const m=[];return m.push({id:"estimate-type",title:"Estimate Type",component:l.jsx(Ky,{formData:n,setFormData:r,nextStep:o})}),m.push({id:"income-type",title:"Income Type",component:l.jsx(Qy,{formData:n,setFormData:r,nextStep:o})}),n.incomeType==="variable"?m.push({id:"variable-income",title:"Monthly Income",component:l.jsx(eg,{formData:n,setFormData:r,nextStep:s,showValidationErrors:a})}):m.push({id:"monthly-income",title:"Assessable Income",component:l.jsx(Xy,{formData:n,setFormData:r,nextStep:s,showValidationErrors:a})}),n.estimateType==="detailed"&&(m.push({id:"marital-status",title:"Marital Status",component:l.jsx(tg,{formData:n,setFormData:r,nextStep:o,showValidationErrors:a})}),m.push({id:"dependents",title:"Dependents",component:l.jsx(ng,{formData:n,setFormData:r,nextStep:s,showValidationErrors:a})}),m.push({id:"deductions",title:"Deductions",component:l.jsx(rg,{formData:n,setFormData:r,nextStep:s,showValidationErrors:a})})),m.push({id:"results",title:"Results",component:l.jsx(ig,{formData:n,setFormData:r,onStartOver:p})}),m},[n,e]),g=y.length,v=e===g-1,T=e===0,S=(e+1)/g*100;return l.jsxs("div",{className:"bg-gray-100 min-h-screen flex items-center justify-center py-8 px-4",children:[l.jsxs(Ar,{children:[l.jsx("title",{children:"Monthly Tax Withholding Estimator | Thai Tax Calculator"}),l.jsx("meta",{name:"description",content:"Estimate how much Thai income tax should be withheld from your monthly salary. Free calculator for salaried employees and freelancers in Thailand."})]}),l.jsxs("div",{className:"bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-2xl w-full",children:[l.jsxs("div",{className:"flex justify-between items-center mb-6",children:[l.jsxs(X,{to:"/",className:"text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm","aria-label":"Go to home page",children:[l.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:l.jsx("path",{d:"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"})}),"Home"]}),!v&&l.jsx("button",{onClick:p,className:"text-red-500 hover:text-red-700 text-sm","aria-label":"Start over",children:"Start Over"})]}),l.jsxs("div",{className:"mb-8",children:[l.jsxs("div",{className:"flex justify-between items-center mb-2",children:[l.jsxs("span",{className:"text-sm font-medium text-gray-700",children:["Step ",e+1," of ",g,": ",(h=y[e])==null?void 0:h.title]}),l.jsxs("span",{className:"text-sm text-gray-500",children:[Math.round(S),"%"]})]}),l.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2.5",children:l.jsx("div",{className:"bg-blue-500 h-2.5 rounded-full transition-all duration-300",style:{width:`${S}%`},role:"progressbar","aria-valuenow":e+1,"aria-valuemin":1,"aria-valuemax":g})}),l.jsx("div",{className:"flex justify-between mt-3",children:y.map((m,w)=>l.jsxs("button",{onClick:()=>w<e&&d(w),disabled:w>=e,className:`flex flex-col items-center group ${w<e?"cursor-pointer":"cursor-default"}`,"aria-label":`${w<e?"Go to ":""}Step ${w+1}: ${m.title}`,children:[l.jsx("div",{className:`w-3 h-3 rounded-full transition-all ${w<e?"bg-blue-500 group-hover:bg-blue-600":w===e?"bg-blue-500 ring-2 ring-blue-200":"bg-gray-300"}`}),l.jsx("span",{className:`text-xs mt-1 hidden md:block ${w===e?"text-blue-600 font-medium":"text-gray-400"}`,children:m.title})]},m.id))})]}),l.jsx("div",{className:"bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4",children:l.jsx("p",{className:"text-sm text-blue-700",children:"This estimate is based on Thai tax rules for Fiscal Year 2026."})}),l.jsx("div",{className:"min-h-[300px]",children:(f=y[e])==null?void 0:f.component}),!v&&!T&&l.jsxs("div",{className:"flex justify-between mt-8 pt-6 border-t border-gray-200",children:[l.jsxs("button",{onClick:u,className:"px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2","aria-label":"Go to previous step",children:[l.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",viewBox:"0 0 20 20",fill:"currentColor",children:l.jsx("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})}),"Previous"]}),l.jsxs("button",{onClick:s,className:"px-6 py-2 rounded-lg transition-colors flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600","aria-label":"Go to next step",children:["Next",l.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",viewBox:"0 0 20 20",fill:"currentColor",children:l.jsx("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})})]})]})]})]})},Da=({article:e})=>l.jsx(X,{to:`/articles/${e.slug}`,className:"block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden",children:l.jsxs("div",{className:"p-5",children:[l.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[l.jsx("span",{className:"text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded",children:e.category}),l.jsxs("span",{className:"text-xs text-gray-500",children:[e.readTime," min read"]})]}),l.jsx("h3",{className:"font-semibold text-gray-900 mb-2 line-clamp-2",children:e.title}),l.jsx("p",{className:"text-gray-600 text-sm line-clamp-2",children:e.excerpt})]})}),sg="ca-pub-4471962643516217",ug={leaderboard:{width:728,height:90},rectangle:{width:300,height:250},"mobile-banner":{width:320,height:100}},bn=({size:e,adSlot:t,className:n=""})=>{const r=x.useRef(null),a=x.useRef(!1),i=ug[e];return x.useEffect(()=>{if(!a.current)try{r.current&&window.adsbygoogle&&(window.adsbygoogle.push({}),a.current=!0)}catch(o){console.error("AdSense error:",o)}},[]),l.jsx("div",{className:`flex items-center justify-center ${n}`,style:{maxWidth:i.width,minHeight:i.height,width:"100%"},"aria-label":"Advertisement",role:"complementary",children:l.jsx("ins",{ref:r,className:"adsbygoogle",style:{display:"block",width:i.width,height:i.height},"data-ad-client":sg,"data-ad-slot":t})})},Tr=[{slug:"how-to-use-the-thai-tax-calculator",title:"How to Use the Thai Tax Calculator: Features, Downloads, and Filing Records",excerpt:"A complete guide to using this tool — from calculating your annual tax or monthly withholding, to downloading a personal filing packet you can keep for your records.",content:`
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
    `,publishedAt:"2026-02-22",readTime:7,category:"Guide"},{slug:"understanding-thai-tax-residency",title:"Understanding Thai Tax Residency: The 180-Day Rule",excerpt:"Learn how Thailand determines your tax residency status and what it means for your tax obligations.",content:`
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
    `,publishedAt:"2024-01-15",readTime:5,category:"Tax Basics"},{slug:"maximizing-tax-deductions-thailand",title:"Maximizing Your Tax Deductions in Thailand",excerpt:"A comprehensive guide to the allowances and deductions available to reduce your Thai tax liability.",content:`
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
    `,publishedAt:"2024-02-01",readTime:7,category:"Deductions"},{slug:"thai-tax-brackets-explained",title:"Thai Tax Brackets Explained: 2024 Guide",excerpt:"Understand how progressive tax rates work in Thailand and calculate your effective tax rate.",content:`
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
    `,publishedAt:"2024-02-15",readTime:4,category:"Tax Basics"},{slug:"expat-guide-filing-thai-taxes",title:"Expat Guide: Filing Your Thai Tax Return",excerpt:"Step-by-step guide for expats on how to file annual tax returns in Thailand.",content:`
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
    `,publishedAt:"2024-03-01",readTime:6,category:"Filing"},{slug:"foreign-income-thailand-tax",title:"Foreign Income and Thailand Tax: What You Need to Know",excerpt:"Understanding when and how foreign-sourced income is taxed in Thailand.",content:`
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
    `,publishedAt:"2024-03-15",readTime:8,category:"International"},{slug:"social-security-contributions-thailand",title:"Social Security Contributions in Thailand Explained",excerpt:"Everything you need to know about Thai social security contributions and benefits.",content:`
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
    `,publishedAt:"2025-01-15",readTime:6,category:"Employment"},{slug:"freelancer-tax-guide-thailand",title:"Freelancer Tax Guide: Navigating Thai Taxes as a Self-Employed Professional",excerpt:"Complete guide to understanding your tax obligations as a freelancer or independent contractor in Thailand.",content:`
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
    `,publishedAt:"2024-04-15",readTime:8,category:"Freelance"},{slug:"flat-rate-vs-actual-expenses",title:"Flat-Rate vs Actual Expenses: Which Deduction Method is Right for You?",excerpt:"Learn how to choose between flat-rate and actual expense deductions to minimize your Thai tax liability.",content:`
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
    `,publishedAt:"2024-05-01",readTime:7,category:"Freelance"},{slug:"pnd94-mid-year-tax-filing",title:"PND94 Explained: Mid-Year Tax Filing for Freelancers",excerpt:"Understanding when and how to file your PND94 mid-year tax return as a self-employed individual in Thailand.",content:`
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
    `,publishedAt:"2024-05-15",readTime:6,category:"Freelance"},{slug:"withholding-tax-freelancers-thailand",title:"Withholding Tax for Freelancers: Getting Credit for Tax Already Paid",excerpt:"How to track, document, and claim credit for withholding tax deducted by your Thai clients.",content:`
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
    `,publishedAt:"2024-06-01",readTime:7,category:"Freelance"},{slug:"vat-registration-freelancers",title:"VAT Registration for Freelancers: When 1.8 Million THB Changes Everything",excerpt:"Understanding VAT registration requirements, thresholds, and implications for high-earning freelancers in Thailand.",content:`
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
    `,publishedAt:"2024-06-15",readTime:8,category:"Freelance"},{slug:"digital-nomad-taxes-thailand",title:"Digital Nomad Taxes in Thailand: Working Remotely for Foreign Clients",excerpt:"Tax considerations for digital nomads and remote workers earning foreign income while living in Thailand.",content:`
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
    `,publishedAt:"2024-07-01",readTime:9,category:"Freelance"},{slug:"freelancer-record-keeping-thailand",title:"Record Keeping for Thai Freelancers: Stay Organized, Stay Compliant",excerpt:"Essential record-keeping practices for freelancers to maximize deductions and survive a tax audit.",content:`
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
    `,publishedAt:"2024-07-15",readTime:8,category:"Freelance"},{slug:"double-tax-agreements-thailand",title:"Double Tax Agreements: How Tax Treaties Protect Expats in Thailand",excerpt:"Understand how Thailand's 61 double tax agreements work, who can claim foreign tax credits, and how to avoid paying tax twice on the same income.",content:`
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
    `,publishedAt:"2026-02-17",readTime:12,category:"International"},{slug:"pensioner-retiree-tax-guide-thailand",title:"Retiring in Thailand: A Complete Tax Guide for Pensioners and Retirees",excerpt:"A comprehensive guide to Thai tax obligations for retirees — including the valuable 65+ income exemption, how foreign pensions are treated, what you must file, and how to legally minimise your tax.",content:`
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
    `,publishedAt:"2026-03-03",readTime:10,category:"Retirement"},{slug:"foreign-pension-income-thailand-tax",title:"How Foreign Pensions Are Taxed in Thailand: UK, US, and Australian Pensions Explained",excerpt:"A country-by-country guide to how UK State Pension, US Social Security, Australian superannuation, and other overseas pensions are treated when you retire in Thailand.",content:`
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
    `,publishedAt:"2026-03-03",readTime:11,category:"Retirement"},{slug:"investment-income-retirees-thailand",title:"Investment Income in Thailand: Tax on Dividends, Interest, and Capital Gains",excerpt:"How Thai tax applies to bank interest, dividends, and capital gains — from Thai and foreign sources — and what retirees and investors need to know to plan effectively.",content:`
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
    `,publishedAt:"2026-03-03",readTime:9,category:"Retirement"},{slug:"thailand-retirement-visa-tax-obligations",title:"Thai Retirement Visa and Tax: What Non-OA Visa Holders Must Know",excerpt:"Holding a Thai retirement visa (Non-OA) does not exempt you from tax. Here's what retirees on any visa type need to know about their Thai tax obligations — and how the LTR visa is different.",content:`
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
    `,publishedAt:"2026-03-03",readTime:8,category:"Retirement"},{slug:"ltr-visa-tax-benefits",title:"LTR Visa Tax Benefits: Thailand's Tax-Advantaged Residency for Expats",excerpt:"Discover how Thailand's Long-Term Resident visa offers significant tax benefits including foreign income exemptions and reduced tax rates.",content:`
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
    `,publishedAt:"2026-02-17",readTime:10,category:"International"}];function cg(e){return Tr.find(t=>t.slug===e)}function dg(e,t=3){return Tr.filter(n=>n.slug!==e).slice(0,t)}const Ba=[{name:"Pensioners & Retirees",items:[{question:"Do retirees get a special tax exemption in Thailand?",answer:"Yes. If you are aged 65 or over at the end of the tax year, the first 190,000 THB of your assessable income is completely exempt from personal income tax under Section 42(17) of the Revenue Code. Combined with the standard personal allowance (60,000 THB) and the 0% first tax bracket (150,000 THB), a retiree aged 65+ can receive up to approximately 400,000 THB before paying any Thai income tax."},{question:"Is my foreign pension taxable in Thailand?",answer:"If you are a Thai tax resident (180+ days in Thailand) and you transfer your foreign pension to Thailand, it is assessable income since the 2024 rule change. Tax treaties between Thailand and your home country may allow you to claim a credit for tax already paid abroad, reducing or eliminating double taxation. If you leave pension money in an overseas account without remitting it to Thailand, it is not taxable here."},{question:"Is UK State Pension taxable in Thailand?",answer:"For Thai tax residents, the UK State Pension is generally taxable in Thailand as your country of residence under the UK-Thailand Double Tax Agreement. UK private pensions are also taxable in Thailand. However, UK government service pensions (for civil servants, military, some teachers) are taxable only in the UK, not Thailand. You can claim a foreign tax credit for any UK tax withheld. Many retirees consider applying to HMRC for gross payment of their pension if they are Thai tax residents, to avoid UK withholding tax that then requires claiming back."},{question:"Is US Social Security taxable in Thailand?",answer:"This is complex. Under the US-Thailand DTA, Social Security may be taxable in Thailand as your country of residence. However, the US also taxes its own citizens on worldwide income regardless of where they live, creating a risk of double taxation. US citizens should use the Foreign Tax Credit on their US return to offset US tax with Thai tax paid, and vice versa. Given the complexity, US citizen retirees in Thailand should consult a specialist in US expat taxation."},{question:"Do retirees need to file a Thai tax return?",answer:"Yes, if you are a Thai tax resident (180+ days) and your assessable income exceeds the filing threshold. For pension or salary income, the threshold is 120,000 THB for single individuals or 220,000 THB for married couples. For investment or rental income, it is 60,000 THB (single) or 120,000 THB (married). Note that the 65+ exemption reduces your assessable income by 190,000 THB before the thresholds apply, meaning many retirees with modest income will owe no tax but may still need to file."},{question:"What is the LTR Wealthy Pensioner visa and how does it affect tax?",answer:"The Long-Term Resident (LTR) Wealthy Pensioner visa is a 10-year visa for retirees aged 50+ with USD 80,000 or more in annual pension/passive income (or USD 40,000+ with USD 250,000 in Thai assets). Unlike the standard Non-OA retirement visa, LTR Wealthy Pensioner holders receive a complete exemption from Thai tax on all foreign-sourced income — pensions, investments, rental income from abroad. There is no need to track remittances or claim foreign tax credits. The application fee is 50,000 THB."},{question:"Does holding a Thai retirement visa (Non-OA) reduce my tax?",answer:"No. The Non-Immigrant OA retirement visa provides no tax benefits whatsoever. Your tax obligations are based entirely on how many days you spend in Thailand (the 180-day rule), not on your visa type. If you spend 180+ days in Thailand on a Non-OA visa, you have the same tax obligations as any other Thai tax resident. Only the LTR visa categories provide genuine tax benefits."},{question:"How is Thai bank interest taxed for retirees?",answer:"Interest on Thai bank accounts is subject to 15% withholding tax deducted automatically by the bank. You can treat this withholding as your final tax on the interest (simpler), or include the interest on your annual return and claim the 15% as a credit — which may result in a partial refund if your effective tax rate is lower. For retirees aged 65+ with modest income, your effective rate on the first taxable income after allowances is 5%, making a refund possible if you include bank interest in your return."},{question:"Can I claim my parents as dependants on my Thai tax return?",answer:"Yes. You can claim a 30,000 THB allowance per parent who is aged 60 or over, is a Thai resident, and has their own income of no more than 30,000 THB per year. You can also claim up to 15,000 THB per parent for health insurance premiums you pay on their behalf. These deductions are in addition to your personal allowance and any other deductions you claim."},{question:"Are capital gains from selling shares in Thailand taxable for retirees?",answer:"Capital gains from selling shares listed on the Stock Exchange of Thailand (SET) are exempt from personal income tax for individuals — there is no capital gains tax on Thai listed shares. Capital gains on foreign shares, however, are assessable income if the proceeds are remitted to Thailand."}]},{name:"Tax Residency",items:[{question:"How is tax residency determined in Thailand?",answer:"You are considered a Thai tax resident if you spend 180 days or more in Thailand during a calendar year. The days do not need to be consecutive. Partial days are generally counted as full days."},{question:"What happens if I stay less than 180 days?",answer:"If you stay less than 180 days in a calendar year, you are a non-resident for tax purposes. Non-residents are only taxed on income earned within Thailand, typically at flat rates or through withholding tax."},{question:"Can I be a tax resident of both Thailand and another country?",answer:"Yes, dual tax residency is possible. In such cases, tax treaties between countries determine which country has primary taxing rights. You may need to claim foreign tax credits to avoid double taxation."},{question:"Does my visa type affect my tax residency status?",answer:"No. Tax residency is determined solely by the number of days you spend in Thailand, not by your visa type. Whether you hold a retirement visa (Non-OA), Thailand Privilege (Elite) visa, tourist visa, or work permit, you become a tax resident after 180 days in a calendar year. Only the LTR visa provides any tax benefit, and that is through a specific income exemption — not a change to residency rules."}]},{name:"Deductions & Allowances",items:[{question:"What is the personal allowance in Thailand?",answer:"Every taxpayer receives a personal allowance of 60,000 THB. This amount is deducted from your assessable income before calculating tax. If your spouse has no income, you can also claim an additional 60,000 THB spouse allowance."},{question:"Can I deduct insurance premiums?",answer:"Yes. Life insurance premiums are deductible up to 100,000 THB annually. Health insurance premiums are deductible up to 25,000 THB. Parent health insurance premiums have a separate limit of 15,000 THB."},{question:"What are SSF and RMF funds?",answer:"SSF (Super Savings Fund) and RMF (Retirement Mutual Fund) are tax-advantaged investment funds. SSF contributions are deductible up to 30% of income (max 200,000 THB). RMF contributions are deductible up to 30% of income (max 500,000 THB). Combined limits apply."},{question:"How much can I deduct for children?",answer:"You can deduct 30,000 THB per legitimate child. An additional 2,000 THB per child is available if the child is studying in Thailand. There is no limit on the number of children you can claim."}]},{name:"Filing & Deadlines",items:[{question:"When is the tax filing deadline in Thailand?",answer:"The annual tax return (PND 90/91) must be filed by March 31 of the following year. For example, income earned in 2024 must be filed by March 31, 2025. Online filing may extend this deadline by 8 days."},{question:"Do I need to file if my employer withholds tax?",answer:"Yes, you should still file an annual return even if your employer withholds tax. Filing allows you to claim additional deductions and potentially receive a refund. It also ensures compliance with Thai tax law."},{question:"How do I file my tax return?",answer:"You can file online through the RD Smart Tax app or the Revenue Department website (rd.go.th), or in person at your local Revenue Department office. Online filing is recommended for faster processing."},{question:"What documents do I need to file?",answer:"You need your withholding tax certificates (Form 50 Tawi) from employers and banks, personal identification (Thai ID or passport), Tax ID number, and supporting documents for any deductions you claim (receipts, certificates)."}]},{name:"Income & Withholding",items:[{question:"How is monthly withholding tax calculated?",answer:"Employers estimate your annual income and calculate the annual tax liability. This amount is divided by 12 and withheld monthly. The calculation considers your allowances and deductions you have declared to your employer."},{question:"Is foreign income taxable in Thailand?",answer:"For Thai tax residents, foreign income brought into Thailand is taxable. Recent changes require foreign income remitted to Thailand to be declared regardless of when it was earned. Tax treaties may provide exemptions or credits."},{question:"What income is exempt from tax?",answer:"The first 150,000 THB of taxable income is exempt. Other exemptions include certain government payments, inheritance (subject to separate rules), and specific investment returns like those from certain government bonds."},{question:"How are dividends from Thai companies taxed?",answer:"Dividends from Thai companies are subject to 10% withholding tax deducted at source by the paying company. You can either treat this withholding as your final tax obligation (simpler), or include dividends in your annual return and claim the 10% withholding as a tax credit — which may result in a refund if your overall effective tax rate is lower."},{question:"Is rental income from property in Thailand taxable?",answer:"Yes. Rental income from Thai property is assessable income and must be declared on your annual return. You can deduct 30% of gross rental income as a flat-rate expense (no documentation needed), or claim actual rental-related expenses if they are higher and you can document them. Net rental income is then subject to progressive income tax rates."}]},{name:"Refunds & Payments",items:[{question:"How do I get a tax refund?",answer:"If you have overpaid tax (common if you have additional deductions not considered in withholding), you will receive a refund after filing your annual return. Refunds are typically processed within 3 months and deposited to your bank account."},{question:"What if I owe additional tax?",answer:"If your total tax liability exceeds the amount withheld, you must pay the difference when filing. Payment can be made at the Revenue Department office, through designated banks, or online through the RD Smart Tax app."},{question:"Are there penalties for late filing or payment?",answer:"Yes. Late filing incurs a penalty of up to 2,000 THB. Late payment incurs a surcharge of 1.5% per month on the outstanding amount. Interest also accrues on unpaid tax."}]}];function fg(e){const t=e.toLowerCase(),n=[];return Ba.forEach(r=>{r.items.forEach(a=>{(a.question.toLowerCase().includes(t)||a.answer.toLowerCase().includes(t))&&n.push(a)})}),n}const Ui="https://www.mythaitaxes.com",hg=()=>{const e=Tr.slice(0,3),t=Ba.flatMap(a=>a.items).slice(0,5),n="Thai Tax Calculator | Free Thai Income Tax Calculator",r="Calculate your Thai income tax quickly and accurately. Free tool for salaried employees, freelancers, sole proprietors, and company owners in Thailand.";return l.jsxs("div",{className:"py-8",children:[l.jsxs(Ar,{children:[l.jsx("title",{children:n}),l.jsx("meta",{name:"description",content:r}),l.jsx("link",{rel:"canonical",href:Ui}),l.jsx("meta",{property:"og:title",content:n}),l.jsx("meta",{property:"og:description",content:r}),l.jsx("meta",{property:"og:url",content:Ui}),l.jsx("meta",{property:"og:type",content:"website"}),l.jsx("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"WebApplication",name:"Thai Tax Calculator",url:Ui,description:r,applicationCategory:"FinanceApplication",operatingSystem:"All",offers:{"@type":"Offer",price:"0",priceCurrency:"THB"}})})]}),l.jsxs("div",{className:"max-w-4xl mx-auto px-4 text-center mb-8",children:[l.jsx("h1",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-3",children:"Thai Tax Calculator"}),l.jsx("p",{className:"text-lg text-gray-600",children:"Calculate your Thai tax obligation quickly and accurately"})]}),l.jsx("div",{className:"max-w-3xl mx-auto px-4 mb-8",children:l.jsxs("div",{className:"grid md:grid-cols-2 gap-4",children:[l.jsx(X,{to:"/annual-tax",className:"block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-transparent hover:border-blue-500",children:l.jsxs("div",{className:"flex items-start gap-4",children:[l.jsx("div",{className:"w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0",children:l.jsx("svg",{className:"w-6 h-6 text-blue-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"})})}),l.jsxs("div",{children:[l.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-1",children:"Annual Tax Calculator"}),l.jsx("p",{className:"text-gray-600 text-sm",children:"Get a detailed breakdown of your annual tax liability and potential refund."})]})]})}),l.jsx(X,{to:"/monthly-withholding",className:"block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-transparent hover:border-blue-500",children:l.jsxs("div",{className:"flex items-start gap-4",children:[l.jsx("div",{className:"w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0",children:l.jsx("svg",{className:"w-6 h-6 text-green-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})})}),l.jsxs("div",{children:[l.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-1",children:"Monthly Withholding"}),l.jsx("p",{className:"text-gray-600 text-sm",children:"Estimate how much tax should be deducted from your monthly salary."})]})]})})]})}),l.jsxs("div",{className:"flex justify-center mb-8 px-4",children:[l.jsx("div",{className:"hidden md:block",children:l.jsx(bn,{size:"leaderboard",adSlot:"5959313072"})}),l.jsx("div",{className:"md:hidden",children:l.jsx(bn,{size:"mobile-banner",adSlot:"6916229573"})})]}),l.jsx("div",{className:"max-w-6xl mx-auto px-4",children:l.jsxs("div",{className:"grid md:grid-cols-2 gap-8",children:[l.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6",children:[l.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Popular Questions"}),l.jsx("ul",{className:"space-y-3",children:t.map((a,i)=>l.jsx("li",{children:l.jsxs(X,{to:"/faq",className:"flex items-start gap-2 text-sm text-gray-600 hover:text-blue-500 transition-colors",children:[l.jsx("span",{className:"text-blue-500 flex-shrink-0",children:"Q:"}),l.jsx("span",{children:a.question})]})},i))}),l.jsxs(X,{to:"/faq",className:"inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 mt-4 text-sm font-medium",children:["View all FAQ",l.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]}),l.jsxs("div",{children:[l.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Latest Articles"}),l.jsx("div",{className:"space-y-4",children:e.map(a=>l.jsx(Da,{article:a},a.slug))}),l.jsxs(X,{to:"/articles",className:"inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 mt-4 text-sm font-medium",children:["View all articles",l.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]})]})})]})},pu="https://www.mythaitaxes.com",mg=()=>{const e=Tr.slice(0,3),t=Tr.slice(3),n="Thai Tax Articles & Guides | Thai Tax Calculator",r="Expert guides on Thai taxation covering freelancer tax, expat filing, deductions, tax residency, double tax agreements, and more.";return l.jsxs("div",{className:"py-8",children:[l.jsxs(Ar,{children:[l.jsx("title",{children:n}),l.jsx("meta",{name:"description",content:r}),l.jsx("link",{rel:"canonical",href:`${pu}/articles`}),l.jsx("meta",{property:"og:title",content:n}),l.jsx("meta",{property:"og:description",content:r}),l.jsx("meta",{property:"og:url",content:`${pu}/articles`}),l.jsx("meta",{property:"og:type",content:"website"})]}),l.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[l.jsxs("div",{className:"mb-8",children:[l.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Thai Tax Guides for Expats"}),l.jsx("p",{className:"text-gray-600",children:"Comprehensive guides to help you understand and navigate Thai taxation."})]}),l.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",children:e.map(a=>l.jsx(Da,{article:a},a.slug))}),t.length>0&&l.jsxs("div",{className:"flex justify-center mb-8",children:[l.jsx("div",{className:"hidden md:block",children:l.jsx(bn,{size:"leaderboard",adSlot:"5959313072"})}),l.jsx("div",{className:"md:hidden",children:l.jsx(bn,{size:"rectangle",adSlot:"3447757856"})})]}),t.length>0&&l.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",children:t.map(a=>l.jsx(Da,{article:a},a.slug))}),l.jsxs("div",{className:"bg-blue-50 rounded-xl p-6 md:p-8 text-center",children:[l.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-2",children:"Ready to calculate your tax?"}),l.jsx("p",{className:"text-gray-600 mb-4",children:"Use our free calculator to estimate your Thai tax liability."}),l.jsxs(X,{to:"/",className:"inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors",children:["Start Calculator",l.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]})]})]})},yu="https://www.mythaitaxes.com",pg=()=>{const{slug:e}=yp(),t=e?cg(e):void 0,n=e?dg(e,3):[];if(!t)return l.jsx(jp,{to:"/articles",replace:!0});const r=`${yu}/articles/${t.slug}`,a={"@context":"https://schema.org","@type":"Article",headline:t.title,description:t.excerpt,url:r,datePublished:t.publishedAt,publisher:{"@type":"Organization",name:"Thai Tax Calculator",url:yu}},i=t.content.split(`

`),o=Math.floor(i.length/2),s=i.slice(0,o).join(`

`),u=i.slice(o).join(`

`);return l.jsxs("div",{className:"py-8",children:[l.jsxs(Ar,{children:[l.jsxs("title",{children:[t.title," | Thai Tax Calculator"]}),l.jsx("meta",{name:"description",content:t.excerpt}),l.jsx("link",{rel:"canonical",href:r}),l.jsx("meta",{property:"og:title",content:t.title}),l.jsx("meta",{property:"og:description",content:t.excerpt}),l.jsx("meta",{property:"og:url",content:r}),l.jsx("meta",{property:"og:type",content:"article"}),l.jsx("meta",{property:"article:published_time",content:t.publishedAt}),l.jsx("script",{type:"application/ld+json",children:JSON.stringify(a)})]}),l.jsxs("div",{className:"max-w-3xl mx-auto px-4",children:[l.jsx("nav",{className:"mb-6",children:l.jsx(X,{to:"/articles",className:"text-blue-500 hover:text-blue-600 text-sm",children:"← Back to Articles"})}),l.jsxs("header",{className:"mb-8",children:[l.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[l.jsx("span",{className:"text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full",children:t.category}),l.jsxs("span",{className:"text-sm text-gray-500",children:[t.readTime," min read"]})]}),l.jsx("h1",{className:"text-3xl md:text-4xl font-bold text-gray-900 mb-3",children:t.title}),l.jsxs("p",{className:"text-gray-500 text-sm",children:["Published: ",new Date(t.publishedAt).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})]})]}),l.jsx("article",{className:"prose prose-gray max-w-none mb-8",children:l.jsx("div",{className:"article-content",dangerouslySetInnerHTML:{__html:gu(s)}})}),l.jsx("div",{className:"flex justify-center my-8",children:l.jsx(bn,{size:"rectangle",adSlot:"3447757856"})}),l.jsx("article",{className:"prose prose-gray max-w-none mb-8",children:l.jsx("div",{className:"article-content",dangerouslySetInnerHTML:{__html:gu(u)}})}),l.jsxs("div",{className:"bg-blue-50 rounded-xl p-6 text-center mb-8",children:[l.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-2",children:"Ready to calculate your tax?"}),l.jsx("p",{className:"text-gray-600 mb-4",children:"Put this knowledge to use with our free calculator."}),l.jsxs(X,{to:"/",className:"inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors",children:["Start Calculator",l.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]}),n.length>0&&l.jsxs("section",{children:[l.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-4",children:"Related Articles"}),l.jsx("div",{className:"grid md:grid-cols-3 gap-4",children:n.map(c=>l.jsx(Da,{article:c},c.slug))})]})]})]})};function gu(e){let t=e.replace(/(^\|.+\|$\n?)+/gm,n=>{const r=n.trim().split(`
`);let a='<table class="w-full border-collapse mb-4">';return r.forEach((i,o)=>{const s=i.split("|").filter(y=>y.trim());if(s.every(y=>y.trim().match(/^[-:]+$/)))return;const u=o===0,c=u?"th":"td",p=u?"border border-gray-200 px-4 py-2 bg-gray-50 font-semibold text-left":"border border-gray-200 px-4 py-2",d=s.map(y=>`<${c} class="${p}">${y.trim()}</${c}>`).join("");a+=`<tr>${d}</tr>`}),a+="</table>",a});return t=t.replace(/^## (.+)$/gm,'<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>').replace(/^### (.+)$/gm,'<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>').replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),t=t.replace(/(^\d+\. .+$(\n(   - .+$|\d+\. .+$))*)+/gm,n=>{let r='<ol class="list-decimal list-outside ml-5 mb-4 text-gray-600 space-y-3">',a=[];return n.split(`
`).forEach((o,s)=>{const u=/^\d+\. /.test(o),c=/^   - /.test(o);if(u){a.length>0?(r+='<ul class="list-disc list-outside ml-5 mt-2 text-gray-500 space-y-1">',r+=a.join(""),r+="</ul>",a=[],r+="</li>"):s>0&&(r+="</li>");const p=o.replace(/^\d+\. /,"");r+=`<li>${p}`}else if(c){const p=o.replace(/^   - /,"");a.push(`<li>${p}</li>`)}}),a.length>0&&(r+='<ul class="list-disc list-outside ml-5 mt-2 text-gray-500 space-y-1">',r+=a.join(""),r+="</ul>"),r+="</li></ol>",r}),t=t.replace(/(^- .+$(\n- .+$)*)/gm,n=>`<ul class="list-disc list-outside ml-5 mb-4 text-gray-600 space-y-1">${n.split(`
`).map(a=>`<li>${a.replace(/^- /,"")}</li>`).join("")}</ul>`),t=t.replace(/\n\n/g,'</p><p class="mb-4 text-gray-600 leading-relaxed">').replace(/^/,'<p class="mb-4 text-gray-600 leading-relaxed">').replace(/$/,"</p>").replace(/<p class="mb-4 text-gray-600 leading-relaxed"><\/p>/g,""),t}const xu=({question:e,answer:t,defaultOpen:n=!1})=>{const[r,a]=x.useState(n);return l.jsxs("div",{className:"border-b border-gray-200 last:border-b-0",children:[l.jsxs("button",{className:"w-full py-4 flex items-center justify-between text-left hover:text-blue-500 transition-colors",onClick:()=>a(!r),"aria-expanded":r,children:[l.jsx("span",{className:"font-medium text-gray-900 pr-4",children:e}),l.jsx("svg",{className:`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${r?"rotate-180":""}`,fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 9l-7 7-7-7"})})]}),r&&l.jsx("div",{className:"pb-4 text-gray-600 leading-relaxed",children:t})]})},vu="https://www.mythaitaxes.com",yg=()=>{const[e,t]=x.useState(""),n=e.length>=2?fg(e):[],r=e.length>=2,a="Thai Tax FAQ | Frequently Asked Questions | Thai Tax Calculator",i="Answers to common questions about Thai income tax: tax residency, deductions, filing deadlines, withholding tax, refunds, and more.",o={"@context":"https://schema.org","@type":"FAQPage",mainEntity:Ba.flatMap(s=>s.items.map(u=>({"@type":"Question",name:u.question,acceptedAnswer:{"@type":"Answer",text:u.answer}})))};return l.jsxs("div",{className:"py-8",children:[l.jsxs(Ar,{children:[l.jsx("title",{children:a}),l.jsx("meta",{name:"description",content:i}),l.jsx("link",{rel:"canonical",href:`${vu}/faq`}),l.jsx("meta",{property:"og:title",content:a}),l.jsx("meta",{property:"og:description",content:i}),l.jsx("meta",{property:"og:url",content:`${vu}/faq`}),l.jsx("meta",{property:"og:type",content:"website"}),l.jsx("script",{type:"application/ld+json",children:JSON.stringify(o)})]}),l.jsxs("div",{className:"max-w-6xl mx-auto px-4",children:[l.jsxs("div",{className:"mb-8 text-center",children:[l.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"Frequently Asked Questions"}),l.jsx("p",{className:"text-gray-600 mb-6",children:"Find answers to common questions about Thai taxation."}),l.jsx("div",{className:"max-w-md mx-auto",children:l.jsxs("div",{className:"relative",children:[l.jsx("input",{type:"text",placeholder:"Search FAQs...",value:e,onChange:s=>t(s.target.value),className:"w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"}),l.jsx("svg",{className:"absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})]})})]}),l.jsxs("div",{className:"grid lg:grid-cols-3 gap-8",children:[l.jsx("div",{className:"lg:col-span-2",children:r?l.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6",children:[l.jsxs("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:["Search Results (",n.length,")"]}),n.length>0?l.jsx("div",{className:"divide-y divide-gray-200",children:n.map((s,u)=>l.jsx(xu,{question:s.question,answer:s.answer,defaultOpen:u===0},u))}):l.jsxs("p",{className:"text-gray-500",children:['No results found for "',e,'". Try a different search term.']})]}):l.jsx("div",{className:"space-y-6",children:Ba.map((s,u)=>l.jsxs("div",{className:"bg-white rounded-xl shadow-md p-6",children:[l.jsx("h2",{className:"text-lg font-semibold text-gray-900 mb-4",children:s.name}),l.jsx("div",{className:"divide-y divide-gray-200",children:s.items.map((c,p)=>l.jsx(xu,{question:c.question,answer:c.answer},p))})]},u))})}),l.jsx("div",{className:"lg:col-span-1",children:l.jsxs("div",{className:"sticky top-24 space-y-6",children:[l.jsx("div",{className:"flex justify-center",children:l.jsx(bn,{size:"rectangle",adSlot:"3447757856"})}),l.jsxs("div",{className:"bg-blue-50 rounded-xl p-6",children:[l.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Calculate Your Tax"}),l.jsx("p",{className:"text-gray-600 text-sm mb-4",children:"Ready to estimate your Thai tax liability?"}),l.jsx(X,{to:"/",className:"block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors",children:"Start Calculator"})]}),l.jsxs("div",{className:"bg-gray-50 rounded-xl p-6",children:[l.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Need More Help?"}),l.jsx("p",{className:"text-gray-600 text-sm",children:"For complex tax situations, we recommend consulting with a qualified Thai tax professional."})]})]})})]})]})]})},gg=Ye.lazy(()=>zy(()=>import("./AnnualTaxWizard-mi9ylVtC.js"),[])),xg=()=>l.jsx(Vy,{children:l.jsxs(Ip,{children:[l.jsx(Lt,{path:"/",element:l.jsx(hg,{})}),l.jsx(Lt,{path:"/monthly-withholding",element:l.jsx(lg,{})}),l.jsx(Lt,{path:"/annual-tax",element:l.jsx(x.Suspense,{fallback:l.jsx("div",{className:"py-16 text-center text-gray-500",children:"Loading calculator…"}),children:l.jsx(gg,{})})}),l.jsx(Lt,{path:"/articles",element:l.jsx(mg,{})}),l.jsx(Lt,{path:"/articles/:slug",element:l.jsx(pg,{})}),l.jsx(Lt,{path:"/faq",element:l.jsx(yg,{})})]})}),zi=document.getElementById("root"),Tu=l.jsx(Ye.StrictMode,{children:l.jsx(rf,{children:l.jsx(ny,{children:l.jsx(xg,{})})})});zi.hasChildNodes()?ha.hydrateRoot(zi,Tu):ha.createRoot(zi).render(Tu);export{Ye as R,Sg as T,Gy as a,wg as b,ag as c,Tg as d,Ua as g,l as j,x as r,Wd as u};
